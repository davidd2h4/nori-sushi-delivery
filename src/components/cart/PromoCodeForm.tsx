"use client";

import { Check, Tag, X } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { promoCodes } from "@/data/promo-codes";
import { useLocale, useT } from "@/i18n";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { PromoStatus } from "@/lib/pricing";
import { useCart } from "@/store/cart";

export function PromoCodeForm({ status, compact = false }: { status: PromoStatus; compact?: boolean }) {
  const t = useT();
  const locale = useLocale();
  const applyPromo = useCart((s) => s.applyPromo);
  const removePromo = useCart((s) => s.removePromo);
  const [value, setValue] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const id = useId();
  const inputId = `${id}-promo`;
  const messageId = `${id}-promo-msg`;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      setEmptyError(true);
      return;
    }
    setEmptyError(false);
    applyPromo(value);
    setValue("");
  };

  if (status.state === "applied" || status.state === "below-min") {
    const ok = status.state === "applied";
    return (
      <div
        className={cn(
          "flex items-start justify-between gap-3 rounded-md border px-4 py-3",
          ok ? "border-success/35 bg-success/[0.07]" : "border-warm/35 bg-warm/[0.07]",
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
              ok ? "bg-success/20 text-success" : "bg-warm/20 text-warm",
            )}
          >
            {ok ? <Check className="size-3.5" aria-hidden="true" /> : <Tag className="size-3.5" aria-hidden="true" />}
          </span>
          <div role="status">
            <p className="text-sm font-semibold text-paper">
              {ok ? t.promo.applied(status.promo.code) : status.promo.code}
            </p>
            <p className="text-sm text-mute">
              {ok
                ? status.promo.description[locale]
                : t.promo.belowMin(
                    formatPrice(status.promo.minSubtotal, locale),
                    formatPrice(status.missing, locale),
                  )}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={removePromo}
          aria-label={t.promo.remove}
          className="grid size-9 shrink-0 place-items-center rounded-full text-mute hover:bg-white/10 hover:text-paper"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  const error = emptyError ? t.promo.empty : status.state === "unknown" ? t.promo.unknown : null;

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-paper/90">
        {t.promo.label}
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setEmptyError(false);
          }}
          placeholder={t.promo.placeholder}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-invalid={!!error}
          aria-describedby={messageId}
          className="h-12 min-w-0 flex-1 rounded-full border border-line bg-ink-2 px-5 text-base uppercase text-paper placeholder:normal-case placeholder:text-mute/70 focus:border-red-bright focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-red/30 aria-[invalid=true]:border-red-bright"
        />
        <button
          type="submit"
          className="h-12 shrink-0 rounded-full border border-line-strong px-5 text-sm font-semibold text-paper transition-colors hover:border-paper/70 hover:bg-white/5"
        >
          {t.promo.apply}
        </button>
      </div>
      <div id={messageId} className="mt-2 min-h-5 text-sm">
        {error ? (
          <p role="alert" className="font-medium text-red-bright">
            {error}
          </p>
        ) : (
          !compact && (
            <p className="text-mute">
              {t.promo.demoNote}{" "}
              {promoCodes.map((p, i) => (
                <span key={p.code}>
                  <button
                    type="button"
                    onClick={() => setValue(p.code)}
                    className="font-semibold text-paper/90 underline decoration-line-strong underline-offset-4 hover:text-red-bright hover:decoration-red-bright"
                  >
                    {p.code}
                  </button>
                  {i < promoCodes.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )
        )}
      </div>
    </form>
  );
}
