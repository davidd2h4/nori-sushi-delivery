"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, Bike, Clock, CreditCard, Globe, Store, Zap } from "lucide-react";
import { useMemo, type ReactNode } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea, describedBy, inputClasses } from "@/components/ui/Field";
import { Price } from "@/components/ui/Price";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import type { Totals } from "@/lib/pricing";
import { useCart } from "@/store/cart";
import type { PlacedOrder } from "./CheckoutView";
import { ChoiceCard } from "./ChoiceCard";
import { checkoutDefaults, checkoutSchema, demoOrderNumber, type CheckoutValues } from "./schema";

function FormSection({ title, children, index }: { title: string; children: ReactNode; index: number }) {
  return (
    <fieldset className="rounded-xl border border-line bg-ink-2 p-5 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <div aria-hidden="true" className="mb-6 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-red/15 font-display text-lg font-semibold text-red-bright">
          {index}
        </span>
        <span className="font-display text-2xl font-semibold">{title}</span>
      </div>
      {children}
    </fieldset>
  );
}

interface CheckoutFormProps {
  totals: Totals;
  onPlaced: (order: PlacedOrder) => void;
}

export function CheckoutForm({ totals, onPlaced }: CheckoutFormProps) {
  const t = useT();
  const c = t.checkout;
  const clearCart = useCart((s) => s.clear);
  const schema = useMemo(() => checkoutSchema(t), [t]);

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
    defaultValues: checkoutDefaults,
    mode: "onTouched",
  });

  const method = useWatch({ control, name: "method" });
  const timeMode = useWatch({ control, name: "timeMode" });

  const onValid = async (values: CheckoutValues) => {
    // Demo only: simulate a short round-trip. Nothing is sent anywhere.
    await new Promise((r) => setTimeout(r, 700));
    onPlaced({ number: demoOrderNumber(), totals, values });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onInvalid = (errs: FieldErrors<CheckoutValues>) => {
    const first = (Object.keys(checkoutDefaults) as (keyof CheckoutValues)[]).find((k) => errs[k]);
    if (first) setFocus(first);
  };

  const err = (key: keyof CheckoutValues) => errors[key]?.message;
  const a11y = (id: string, key: keyof CheckoutValues, hint?: string) => ({
    "aria-invalid": !!errors[key],
    "aria-describedby": describedBy(id, err(key), hint),
  });

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate className="flex flex-col gap-5">
      <FormSection index={1} title={c.contacts}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="co-name" label={c.name} error={err("name")} className="sm:col-span-2">
            <Input id="co-name" autoComplete="name" {...a11y("co-name", "name")} {...register("name")} />
          </Field>
          <Field id="co-phone" label={c.phone} error={err("phone")} hint={c.phoneHint}>
            <Input
              id="co-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+380"
              {...a11y("co-phone", "phone", c.phoneHint)}
              {...register("phone")}
            />
          </Field>
          <Field id="co-email" label={c.email} optional={c.optional} error={err("email")}>
            <Input
              id="co-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              {...a11y("co-email", "email")}
              {...register("email")}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection index={2} title={c.method}>
        <div role="radiogroup" aria-label={c.method} className="grid gap-3 sm:grid-cols-2">
          <ChoiceCard
            id="co-method-delivery"
            value="delivery"
            label={c.delivery}
            icon={<Bike className="size-5" aria-hidden="true" />}
            {...register("method")}
          />
          <ChoiceCard
            id="co-method-pickup"
            value="pickup"
            label={c.pickup}
            description={t.common.demo}
            icon={<Store className="size-5" aria-hidden="true" />}
            {...register("method")}
          />
        </div>

        {method === "delivery" ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mute sm:col-span-6">{c.address}</p>
            <Field id="co-city" label={c.city} error={err("city")} className="sm:col-span-6">
              <Input id="co-city" autoComplete="address-level2" {...a11y("co-city", "city")} {...register("city")} />
            </Field>
            <Field id="co-street" label={c.street} error={err("street")} className="sm:col-span-6">
              <Input
                id="co-street"
                autoComplete="address-line1"
                {...a11y("co-street", "street")}
                {...register("street")}
              />
            </Field>
            <Field id="co-house" label={c.house} error={err("house")} className="sm:col-span-3">
              <Input id="co-house" {...a11y("co-house", "house")} {...register("house")} />
            </Field>
            <Field id="co-apartment" label={c.apartment} optional={c.optional} className="sm:col-span-3">
              <Input id="co-apartment" autoComplete="address-line2" {...register("apartment")} />
            </Field>
          </div>
        ) : (
          <p className="mt-5 rounded-md border border-warm/30 bg-warm/[0.06] p-4 text-sm text-paper/85">
            {c.pickupNote}
          </p>
        )}
      </FormSection>

      <FormSection index={3} title={c.time}>
        <div role="radiogroup" aria-label={c.time} className="grid gap-3 sm:grid-cols-2">
          <ChoiceCard
            id="co-time-asap"
            value="asap"
            label={c.timeAsap}
            icon={<Zap className="size-5" aria-hidden="true" />}
            {...register("timeMode")}
          />
          <ChoiceCard
            id="co-time-scheduled"
            value="scheduled"
            label={c.timeScheduled}
            icon={<Clock className="size-5" aria-hidden="true" />}
            {...register("timeMode")}
          />
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {timeMode === "scheduled" && (
            <Field id="co-time" label={c.timeLabel} error={err("time")}>
              <Input id="co-time" type="time" step={900} {...a11y("co-time", "time")} {...register("time")} />
            </Field>
          )}
          <Field id="co-persons" label={c.persons}>
            <select id="co-persons" className={cn(inputClasses, "h-13 appearance-none")} {...register("persons")}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </FormSection>

      <FormSection index={4} title={c.payment}>
        <div role="radiogroup" aria-label={c.payment} className="grid gap-3 sm:grid-cols-3">
          <ChoiceCard
            id="co-pay-cash"
            value="cash"
            label={c.paymentCash}
            icon={<Banknote className="size-5" aria-hidden="true" />}
            {...register("payment")}
          />
          <ChoiceCard
            id="co-pay-card"
            value="card"
            label={c.paymentCard}
            icon={<CreditCard className="size-5" aria-hidden="true" />}
            {...register("payment")}
          />
          <ChoiceCard
            id="co-pay-online"
            name="payment-online"
            value="online"
            disabled
            label={c.paymentOnline}
            description={c.paymentOnlineNote}
            icon={<Globe className="size-5" aria-hidden="true" />}
          />
        </div>
      </FormSection>

      <FormSection index={5} title={c.comment}>
        <Field id="co-comment" label={c.comment} optional={c.optional} error={err("comment")}>
          <Textarea
            id="co-comment"
            rows={3}
            placeholder={c.commentPlaceholder}
            {...a11y("co-comment", "comment")}
            {...register("comment")}
          />
        </Field>
      </FormSection>

      <div className="rounded-xl border border-line bg-ink-2 p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <input
            id="co-agree"
            type="checkbox"
            className="mt-1 size-5 shrink-0 cursor-pointer accent-red"
            aria-invalid={!!errors.agree}
            aria-describedby={errors.agree ? "co-agree-error" : undefined}
            {...register("agree")}
          />
          <label htmlFor="co-agree" className="cursor-pointer text-paper/85">
            {c.agree}
          </label>
        </div>
        {errors.agree && (
          <p id="co-agree-error" className="mt-2 pl-8 text-sm font-medium text-red-bright">
            {errors.agree.message}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-baseline gap-3">
            <span className="text-mute">{t.cart.total}</span>
            <Price value={totals.total} className="font-display text-[2rem] font-semibold leading-none" />
          </p>
          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? c.submitting : c.submit}
          </Button>
        </div>
      </div>
    </form>
  );
}
