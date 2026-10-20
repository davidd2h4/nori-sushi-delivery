"use client";

import { Price } from "@/components/ui/Price";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import type { Totals } from "@/lib/pricing";

export function CartTotals({ totals, className }: { totals: Totals; className?: string }) {
  const t = useT();
  return (
    <dl className={cn("space-y-2.5 text-[0.95rem]", className)}>
      <div className="flex justify-between gap-4 text-mute">
        <dt>
          {t.cart.subtotal} · {t.common.items(totals.itemCount)}
        </dt>
        <dd>
          <Price value={totals.subtotal} className="text-paper" />
        </dd>
      </div>
      {totals.discount > 0 && (
        <div className="flex justify-between gap-4 text-mute">
          <dt>
            {t.cart.discount}
            {totals.promo.state === "applied" && (
              <span className="ml-2 rounded-full bg-red/15 px-2 py-0.5 text-xs font-bold text-red-bright">
                {totals.promo.promo.code}
              </span>
            )}
          </dt>
          <dd className="font-semibold text-red-bright">
            −<Price value={totals.discount} />
          </dd>
        </div>
      )}
      <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3.5">
        <dt className="text-base font-semibold text-paper">{t.cart.total}</dt>
        <dd>
          <Price value={totals.total} className="font-display text-[2rem] font-semibold leading-none text-paper" />
        </dd>
      </div>
    </dl>
  );
}
