"use client";

import { Check, Info } from "lucide-react";
import { useEffect, useRef } from "react";
import { CartTotals } from "@/components/cart/CartTotals";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { useT, useTr } from "@/i18n";
import type { PlacedOrder } from "./CheckoutView";

export function OrderSuccess({ order }: { order: PlacedOrder }) {
  const t = useT();
  const tr = useTr();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const c = t.checkout;
  const v = order.values;

  // Move focus to the confirmation so screen readers announce it.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const details = [
    { label: c.name, value: v.name },
    { label: c.phone, value: v.phone },
    { label: c.method, value: v.method === "delivery" ? c.delivery : `${c.pickup} (${t.common.demo})` },
    ...(v.method === "delivery"
      ? [{ label: c.address, value: [v.city, v.street, v.house, v.apartment].filter(Boolean).join(", ") }]
      : []),
    { label: c.time, value: v.timeMode === "asap" ? c.timeAsap : `${c.timeScheduled}: ${v.time}` },
    { label: c.payment, value: v.payment === "cash" ? c.paymentCash : c.paymentCard },
    { label: c.persons, value: v.persons },
  ];

  return (
    <section className="container-nori pt-10 md:pt-16">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line bg-ink-2 px-5 py-12 text-center sm:px-12 md:py-16">
        <div aria-hidden="true" className="bg-seigaiha absolute inset-x-0 top-0 h-40 opacity-[0.05] [mask-image:linear-gradient(#000,transparent)]" />
        <div aria-hidden="true" className="absolute left-1/2 top-0 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/20 blur-3xl" />

        <div className="relative mx-auto grid size-20 animate-fade-up place-items-center rounded-full bg-red text-white shadow-glow">
          <Check className="size-9" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="relative mt-8 font-display text-h2 font-semibold text-balance outline-none"
        >
          {c.successTitle}
        </h1>
        <p className="relative mt-5 text-mute">{c.successText}</p>
        <p className="relative mt-2 font-display text-[2.6rem] font-semibold tracking-[0.08em] text-red-bright">
          {order.number}
        </p>
        <p className="relative mx-auto mt-6 flex max-w-md items-start justify-center gap-2 rounded-lg border border-warm/30 bg-warm/[0.06] p-4 text-left text-sm font-medium text-paper/90">
          <Info className="mt-0.5 size-4 shrink-0 text-warm" aria-hidden="true" />
          {c.successNote}
        </p>

        <div className="relative mt-10 grid gap-6 text-left md:grid-cols-2">
          <dl className="space-y-3 rounded-xl border border-line p-5">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-mute">{d.label}</dt>
                <dd className="mt-0.5 break-words text-paper/90">{d.value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-xl border border-line p-5">
            <ul className="space-y-2.5">
              {order.totals.lines.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="flex justify-between gap-3 text-sm">
                  <span className="text-paper/85">
                    {tr(product.name)} <span className="text-mute">× {quantity}</span>
                  </span>
                  <Price value={lineTotal} className="shrink-0 font-semibold" />
                </li>
              ))}
            </ul>
            <CartTotals totals={order.totals} className="mt-5 border-t border-line pt-5" />
          </div>
        </div>

        <ButtonLink href="/menu" size="lg" className="relative mt-10">
          {c.successCta}
        </ButtonLink>
      </div>
    </section>
  );
}
