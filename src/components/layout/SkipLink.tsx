"use client";

import { useT } from "@/i18n";

export function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only z-[70] rounded-full bg-paper px-5 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t.common.skipToContent}
    </a>
  );
}
