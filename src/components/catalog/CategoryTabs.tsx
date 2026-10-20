"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { useT, useTr } from "@/i18n";
import { matchesCategory } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import type { CategoryId } from "@/types";

const counts = Object.fromEntries(
  categories.map((c) => [c.id, products.filter((p) => matchesCategory(p, c.id)).length]),
) as Record<CategoryId, number>;

interface CategoryTabsProps {
  value: CategoryId;
  onChange: (id: CategoryId) => void;
}

/**
 * Category chips with dish photos. Scrolls horizontally (with snap) on phones
 * and tablets, wraps into rows on desktop.
 */
export function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  const t = useT();
  const tr = useTr();
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the active chip visible when the row is scrolled horizontally.
  useEffect(() => {
    const list = listRef.current;
    const active = list?.querySelector<HTMLElement>("[aria-pressed='true']");
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: active.offsetLeft - list.clientWidth / 2 + active.offsetWidth / 2, behavior: "smooth" });
  }, [value]);

  return (
    <div
      ref={listRef}
      role="group"
      aria-label={t.catalog.categoriesLabel}
      className="no-scrollbar fade-x relative flex snap-x snap-mandatory scroll-px-1 gap-2 overflow-x-auto py-1 lg:snap-none lg:flex-wrap lg:overflow-visible lg:[mask-image:none]"
    >
      {categories.map((c) => {
        const active = c.id === value;
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(c.id)}
            className={cn(
              "group inline-flex h-12 shrink-0 snap-start items-center gap-2.5 rounded-full border py-1 pl-1 pr-3.5 text-sm font-semibold transition-colors",
              active
                ? "border-red bg-red text-white shadow-glow"
                : "border-line bg-ink-2 text-paper/85 hover:border-line-strong hover:text-paper",
            )}
          >
            <span
              className={cn(
                "relative size-9 shrink-0 overflow-hidden rounded-full ring-2 transition-[box-shadow]",
                active ? "ring-white/70" : "ring-line group-hover:ring-line-strong",
              )}
            >
              <Image src={c.image} alt="" fill sizes="40px" className="object-cover" />
            </span>
            {tr(c.name)}
            <span
              className={cn(
                "rounded-full px-1.5 text-[0.7rem] tabular-nums",
                active ? "bg-white/20 text-white" : "bg-surface-2 text-mute",
              )}
            >
              {counts[c.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
