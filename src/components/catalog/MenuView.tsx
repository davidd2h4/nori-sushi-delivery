"use client";

import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { useT } from "@/i18n";
import { Catalog } from "./Catalog";

function CatalogFallback() {
  return (
    <div aria-hidden="true">
      <div className="shimmer h-13 rounded-full" />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="shimmer aspect-[3/4] rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function MenuView() {
  const t = useT();
  return (
    <>
      <PageHero eyebrow={t.catalog.eyebrow} title={t.catalog.title} intro={t.catalog.intro} kanji="献立" />
      <div className="container-nori">
        <Suspense fallback={<CatalogFallback />}>
          <Catalog />
        </Suspense>
      </div>
    </>
  );
}
