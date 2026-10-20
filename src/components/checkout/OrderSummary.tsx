"use client";

import { PromoCodeForm } from "@/components/cart/PromoCodeForm";
import { CartTotals } from "@/components/cart/CartTotals";
import { Price } from "@/components/ui/Price";
import { ProductImage } from "@/components/ui/ProductImage";
import { useT, useTr } from "@/i18n";
import type { Totals } from "@/lib/pricing";
import { useUi } from "@/store/ui";

export function OrderSummary({ totals }: { totals: Totals }) {
  const t = useT();
  const tr = useTr();
  const openCart = useUi((s) => s.openCart);

  return (
    <aside
      aria-labelledby="summary-title"
      className="rounded-xl border border-line bg-ink-2 p-5 sm:p-7 lg:sticky lg:top-28"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="summary-title" className="font-display text-2xl font-semibold">
          {t.checkout.summary}
        </h2>
        <button
          type="button"
          onClick={openCart}
          className="text-sm font-semibold text-mute underline decoration-line-strong underline-offset-4 hover:text-red-bright"
        >
          {t.checkout.edit}
        </button>
      </div>

      <ul className="mt-5 max-h-80 divide-y divide-line overflow-y-auto pr-1">
        {totals.lines.map(({ product, quantity, lineTotal }) => (
          <li key={product.id} className="flex items-center gap-3 py-3">
            <ProductImage src={product.image} alt="" sizes="56px" className="size-14 shrink-0 rounded-md" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{tr(product.name)}</p>
              <p className="text-sm text-mute">
                {quantity} × <Price value={product.price} />
              </p>
            </div>
            <Price value={lineTotal} className="font-semibold" />
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-5 border-t border-line pt-5">
        <PromoCodeForm status={totals.promo} />
        <CartTotals totals={totals} />
        <p className="text-xs text-mute">{t.cart.deliveryNote}</p>
      </div>
    </aside>
  );
}
