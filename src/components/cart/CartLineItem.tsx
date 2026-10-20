"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Price } from "@/components/ui/Price";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useT, useTr } from "@/i18n";
import type { ResolvedLine } from "@/lib/pricing";
import { useCart } from "@/store/cart";

export function CartLineItem({ line, onNavigate }: { line: ResolvedLine; onNavigate?: () => void }) {
  const t = useT();
  const tr = useTr();
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const remove = useCart((s) => s.remove);
  const { product, quantity, lineTotal } = line;
  const name = tr(product.name);

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/menu/${product.slug}`}
        onClick={onNavigate}
        className="shrink-0 overflow-hidden rounded-md"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProductImage src={product.image} alt="" sizes="96px" className="size-22 rounded-md sm:size-24" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/menu/${product.slug}`}
              onClick={onNavigate}
              className="line-clamp-2 font-semibold leading-snug text-paper hover:text-red-bright"
            >
              {name}
            </Link>
            <p className="mt-1 text-sm text-mute">
              <Price value={product.price} />
              {product.pieces ? ` · ${t.common.pieces(product.pieces)}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(product.id)}
            aria-label={t.cart.remove(name)}
            className="-mr-2 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-mute transition-colors hover:bg-white/10 hover:text-red-bright"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <QuantityStepper
            size="sm"
            value={quantity}
            label={`${t.product.quantity}: ${name}`}
            onDecrement={() => decrement(product.id)}
            onIncrement={() => increment(product.id)}
          />
          <Price value={lineTotal} className="text-base font-bold text-paper" />
        </div>
      </div>
    </li>
  );
}
