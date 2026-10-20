"use client";

import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

/** "8 шт · 290 г" style line. */
export function ProductMeta({ product, className }: { product: Product; className?: string }) {
  const t = useT();
  const parts = [
    product.pieces ? t.common.pieces(product.pieces) : null,
    product.unit === "ml" ? t.common.ml(product.weight) : t.common.grams(product.weight),
  ].filter(Boolean);
  return <p className={cn("font-medium tracking-wide text-mute", className)}>{parts.join(" · ")}</p>;
}
