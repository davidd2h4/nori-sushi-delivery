"use client";

import { Plus } from "lucide-react";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useT, useTr } from "@/i18n";
import { cn } from "@/lib/cn";
import { useCart } from "@/store/cart";
import { useUi } from "@/store/ui";
import type { Product } from "@/types";

/**
 * Compact add-to-cart control for product cards: a button that turns into a
 * quantity stepper once the dish is in the cart.
 */
export function AddToCart({ product, className }: { product: Product; className?: string }) {
  const t = useT();
  const tr = useTr();
  const quantity = useCart((s) => s.lines.find((l) => l.productId === product.id)?.quantity ?? 0);
  const add = useCart((s) => s.add);
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const notify = useUi((s) => s.notify);
  const name = tr(product.name);

  if (!product.available) {
    return (
      <span className={cn("text-sm font-semibold text-mute", className)}>{t.product.unavailableShort}</span>
    );
  }

  if (quantity > 0) {
    return (
      <QuantityStepper
        size="sm"
        value={quantity}
        label={`${t.product.quantity}: ${name}`}
        onDecrement={() => decrement(product.id)}
        onIncrement={() => increment(product.id)}
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add(product.id);
        notify(t.toast.added(name));
      }}
      aria-label={`${t.product.addToCart}: ${name}`}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-red px-3 text-sm font-semibold text-white transition-[background-color,box-shadow,transform] hover:bg-red-bright hover:shadow-glow active:scale-95 sm:px-4",
        className,
      )}
    >
      <Plus className="size-4" aria-hidden="true" />
      <span className="hidden min-[400px]:inline">{t.product.add}</span>
    </button>
  );
}
