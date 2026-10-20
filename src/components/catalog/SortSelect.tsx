"use client";

import { ChevronDown } from "lucide-react";
import { useT } from "@/i18n";
import { isSortOption } from "@/lib/catalog";
import type { SortOption } from "@/types";

const options: SortOption[] = ["popular", "price-asc", "price-desc", "name"];

export function SortSelect({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  const t = useT();
  return (
    <div className="relative">
      <label htmlFor="catalog-sort" className="sr-only">
        {t.catalog.sortLabel}
      </label>
      <select
        id="catalog-sort"
        value={value}
        onChange={(e) => isSortOption(e.target.value) && onChange(e.target.value)}
        className="h-13 w-full appearance-none rounded-full border border-line bg-ink-2 pl-5 pr-11 text-[0.95rem] font-semibold text-paper transition-colors hover:border-line-strong focus:border-red-bright focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-red/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {t.catalog.sort[o]}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-mute"
        aria-hidden="true"
      />
    </div>
  );
}
