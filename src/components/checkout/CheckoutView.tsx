"use client";

import { AlertTriangle, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useT } from "@/i18n";
import { calculateTotals, type Totals } from "@/lib/pricing";
import { useCart } from "@/store/cart";
import { useHydrated } from "@/store/hydration";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";
import { OrderSuccess } from "./OrderSuccess";
import type { CheckoutValues } from "./schema";

export interface PlacedOrder {
  number: string;
  totals: Totals;
  values: CheckoutValues;
}

export function CheckoutView() {
  const t = useT();
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const promoCode = useCart((s) => s.promoCode);
  const totals = useMemo(() => calculateTotals(lines, promoCode), [lines, promoCode]);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  if (placed) return <OrderSuccess order={placed} />;

  return (
    <>
      <PageHero eyebrow={t.checkout.eyebrow} title={t.checkout.title} kanji="注文">
        <p
          role="note"
          className="mt-6 flex max-w-2xl items-start gap-3 rounded-lg border border-red/40 bg-red/[0.08] p-4 font-medium text-paper"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-bright" aria-hidden="true" />
          {t.checkout.demoBanner}
        </p>
      </PageHero>

      <div className="container-nori">
        {!hydrated ? (
          <div aria-hidden="true" className="grid gap-6 lg:grid-cols-[1fr_24rem]">
            <div className="shimmer h-[36rem] rounded-xl" />
            <div className="shimmer h-80 rounded-xl" />
          </div>
        ) : totals.lines.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line">
            <EmptyState
              icon={<ShoppingBag className="size-10" strokeWidth={1.4} aria-hidden="true" />}
              title={t.checkout.emptyTitle}
              text={t.checkout.emptyText}
              action={<ButtonLink href="/menu">{t.common.viewMenu}</ButtonLink>}
            />
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[1fr_25rem] lg:gap-10">
            <CheckoutForm totals={totals} onPlaced={setPlaced} />
            <OrderSummary totals={totals} />
          </div>
        )}
      </div>
    </>
  );
}
