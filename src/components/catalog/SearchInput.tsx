"use client";

import { Search, X } from "lucide-react";
import { useT } from "@/i18n";

export function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const t = useT();
  return (
    <div className="relative">
      <label htmlFor="catalog-search" className="sr-only">
        {t.catalog.searchLabel}
      </label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mute"
        aria-hidden="true"
      />
      <input
        id="catalog-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) {
            e.preventDefault();
            onChange("");
          }
        }}
        placeholder={t.catalog.searchPlaceholder}
        autoComplete="off"
        enterKeyHint="search"
        className="h-13 w-full rounded-full border border-line bg-ink-2 pl-12 pr-12 text-base text-paper placeholder:text-mute/75 transition-colors hover:border-line-strong focus:border-red-bright focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-red/30"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={t.catalog.clearSearch}
          className="absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-mute hover:bg-white/10 hover:text-paper"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
