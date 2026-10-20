"use client";

import { useT } from "@/i18n";
import { LanguageSwitch } from "./LanguageSwitch";

/** Thin utility strip above the header; scrolls away with the page. */
export function TopBar() {
  const t = useT();
  return (
    <div className="relative z-50 hidden border-b border-white/[0.06] bg-ink md:block">
      <div className="container-nori flex h-10 items-center justify-between gap-6 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-mute">
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-6 bg-red-bright" />
          {t.hero.eyebrow}
        </p>
        <p className="hidden items-center gap-2 lg:flex">
          <span aria-hidden="true" className="size-1 rounded-full bg-red-bright" />
          {t.nav.topNote}
        </p>
        <LanguageSwitch size="sm" />
      </div>
    </div>
  );
}
