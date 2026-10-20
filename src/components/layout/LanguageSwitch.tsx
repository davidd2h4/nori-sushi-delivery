"use client";

import { useLocale, useT } from "@/i18n";
import { cn } from "@/lib/cn";
import { useLocaleStore } from "@/store/locale";
import type { Locale } from "@/types";

const options: { value: Locale; label: string; full: string }[] = [
  { value: "uk", label: "UA", full: "Українська" },
  { value: "en", label: "EN", full: "English" },
];

export function LanguageSwitch({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const locale = useLocale();
  const t = useT();
  const setLocale = useLocaleStore((s) => s.setLocale);

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn("inline-flex rounded-full border border-line p-0.5 text-xs font-bold", className)}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          aria-pressed={locale === o.value}
          aria-label={o.full}
          onClick={() => setLocale(o.value)}
          className={cn(
            "rounded-full tracking-wider transition-colors",
            size === "sm" ? "h-6 min-w-9 px-2 text-[0.65rem]" : "h-8 min-w-10 px-2.5",
            locale === o.value ? "bg-paper text-ink" : "text-mute hover:text-paper",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
