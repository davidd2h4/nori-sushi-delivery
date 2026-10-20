"use client";

import { Flame, Leaf, Sparkles, Star } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import type { ProductTag } from "@/types";

const styles: Record<ProductTag, string> = {
  hit: "bg-red text-white",
  new: "bg-paper text-ink",
  spicy: "bg-ink/80 text-red-bright border border-red/40",
  vegetarian: "bg-ink/80 text-success border border-success/35",
};

const icons = { hit: Star, new: Sparkles, spicy: Flame, vegetarian: Leaf } as const;

interface TagBadgeProps {
  tag: ProductTag;
  className?: string;
  /** Icon-only on small screens; the label stays available to screen readers. */
  compact?: boolean;
}

export function TagBadge({ tag, className, compact = false }: TagBadgeProps) {
  const t = useT();
  const Icon = icons[tag];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full py-1 text-[0.7rem] font-bold uppercase tracking-wider backdrop-blur",
        compact ? "px-1.5 sm:px-2.5" : "px-2.5",
        styles[tag],
        className,
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      <span className={compact ? "sr-only sm:not-sr-only" : undefined}>{t.product.tags[tag]}</span>
    </span>
  );
}
