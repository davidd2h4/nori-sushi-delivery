"use client";

import { ShoppingBag, X } from "lucide-react";
import { useMemo } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Price } from "@/components/ui/Price";
import { Sheet } from "@/components/ui/Sheet";
import { useT } from "@/i18n";
import { calculateTotals } from "@/lib/pricing";
import { useCart } from "@/store/cart";
import { useUi } from "@/store/ui";
import { CartLineItem } from "./CartLineItem";
import { CartTotals } from "./CartTotals";
import { PromoCodeForm } from "./PromoCodeForm";

export function CartDrawer() {
  const t = useT();
  const open = useUi((s) => s.cartOpen);
  const close = useUi((s) => s.closeCart);
  const lines = useCart((s) => s.lines);
  const promoCode = useCart((s) => s.promoCode);
  const clear = useCart((s) => s.clear);
  const totals = useMemo(() => calculateTotals(lines, promoCode), [lines, promoCode]);
  const isEmpty = totals.lines.length === 0;

  return (
    <Sheet
      open={open}
      onClose={close}
      labelledBy="cart-title"
      className="left-auto right-0 h-dvh w-full animate-drawer-in border-l border-line bg-ink-2 shadow-drawer sm:max-w-[30rem]"
    >
      <div className="flex h-full flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 sm:px-7">
          <div className="flex items-baseline gap-3">
            <h2 id="cart-title" className="font-display text-[2rem] font-semibold leading-none">
              {t.cart.title}
            </h2>
            {!isEmpty && <span className="text-sm text-mute">{t.common.items(totals.itemCount)}</span>}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t.common.close}
            className="grid size-11 place-items-center rounded-full border border-line text-paper transition-colors hover:bg-white/5"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center overflow-y-auto">
            <EmptyState
              icon={<ShoppingBag className="size-10" strokeWidth={1.4} aria-hidden="true" />}
              title={t.cart.empty}
              text={t.cart.emptyText}
              titleAs="h3"
              action={
                <ButtonLink href="/menu" onClick={close}>
                  {t.common.viewMenu}
                </ButtonLink>
              }
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7">
              <ul className="divide-y divide-line">
                {totals.lines.map((line) => (
                  <CartLineItem key={line.product.id} line={line} onNavigate={close} />
                ))}
              </ul>
              <div className="pb-6 pt-1">
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-mute underline decoration-line-strong underline-offset-4 hover:text-red-bright"
                >
                  {t.cart.clear}
                </button>
              </div>
              <div className="space-y-5 border-t border-line py-6">
                <PromoCodeForm status={totals.promo} />
                <CartTotals totals={totals} />
                <p className="text-xs text-mute">{t.cart.deliveryNote}</p>
              </div>
            </div>
            <footer className="shrink-0 border-t border-line bg-ink px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-7">
              <ButtonLink href="/checkout" onClick={close} size="lg" className="w-full justify-between">
                <span>{t.cart.checkout}</span>
                <Price value={totals.total} className="font-bold" />
              </ButtonLink>
            </footer>
          </>
        )}
      </div>
    </Sheet>
  );
}
