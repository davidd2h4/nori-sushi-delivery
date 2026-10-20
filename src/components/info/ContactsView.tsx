"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea, describedBy } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { useT, type Dictionary } from "@/i18n";

function contactSchema(t: Dictionary) {
  return z.object({
    name: z.string().trim().min(2, t.contacts.errors.name),
    email: z.string().trim().email(t.contacts.errors.contact),
    message: z.string().trim().min(10, t.contacts.errors.message).max(1000, t.contacts.errors.message),
  });
}

type ContactValues = z.infer<ReturnType<typeof contactSchema>>;

export function ContactsView() {
  const t = useT();
  const schema = useMemo(() => contactSchema(t), [t]);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async () => {
    // Demo only: pretend to send, nothing leaves the browser.
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
    reset();
  };

  const cards = [
    { icon: Phone, label: t.contacts.phone, value: "+380 XX XXX XX XX" },
    { icon: Mail, label: t.contacts.email, value: "hello@…" },
    { icon: MapPin, label: t.contacts.address, value: t.contacts.placeholder },
    { icon: Clock, label: t.contacts.hours, value: t.contacts.placeholder },
  ];

  return (
    <>
      <PageHero eyebrow={t.contacts.eyebrow} title={t.contacts.title} intro={t.contacts.intro} kanji="連絡">
        <a
          href="#contact-form"
          className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-red px-8 font-semibold text-white transition-[background-color,box-shadow] hover:bg-red-bright hover:shadow-glow"
        >
          <MessageSquare className="size-5" aria-hidden="true" />
          {t.contacts.formTitle}
        </a>
      </PageHero>

      <div className="container-nori grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col gap-4">
          <ul className="grid gap-4 sm:grid-cols-2">
            {cards.map(({ icon: Icon, label, value }, i) => (
              <Reveal as="li" key={label} delay={i * 60} className="rounded-xl border border-line bg-ink-2 p-6">
                <Icon className="size-5 text-red-bright" aria-hidden="true" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-mute">{label}</p>
                <p className="mt-1.5 text-lg font-semibold text-paper/90">{value}</p>
              </Reveal>
            ))}
          </ul>
          <div className="relative grid min-h-64 flex-1 place-items-center overflow-hidden rounded-xl border border-dashed border-line bg-ink-2">
            <div aria-hidden="true" className="bg-seigaiha absolute inset-0 opacity-[0.06]" />
            <div className="relative flex flex-col items-center gap-3 text-mute">
              <MapPin className="size-8 text-red-bright" aria-hidden="true" />
              <p>{t.contacts.mapPlaceholder}</p>
            </div>
          </div>
        </div>

        <section
          id="contact-form"
          aria-labelledby="contact-form-title"
          className="scroll-mt-28 rounded-xl border border-line bg-ink-2 p-6 sm:p-8 md:p-10"
        >
          <h2 id="contact-form-title" className="font-display text-h3 font-semibold">
            {t.contacts.formTitle}
          </h2>
          <p className="mt-2 text-mute">{t.contacts.formText}</p>

          {sent ? (
            <div role="status" className="mt-8 flex items-start gap-3 rounded-lg border border-success/35 bg-success/[0.07] p-5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              <div>
                <p className="text-paper/90">{t.contacts.sent}</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-3 text-sm font-semibold text-paper underline underline-offset-4 hover:text-red-bright"
                >
                  {t.contacts.formTitle}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex flex-col gap-5">
              <Field id="contact-name" label={t.contacts.name} error={errors.name?.message}>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("contact-name", errors.name?.message)}
                  {...register("name")}
                />
              </Field>
              <Field id="contact-email" label={t.contacts.email} error={errors.email?.message}>
                <Input
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("contact-email", errors.email?.message)}
                  {...register("email")}
                />
              </Field>
              <Field id="contact-message" label={t.contacts.message} error={errors.message?.message}>
                <Textarea
                  id="contact-message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("contact-message", errors.message?.message)}
                  {...register("message")}
                />
              </Field>
              <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 self-start">
                {isSubmitting ? t.common.loading : t.contacts.send}
              </Button>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
