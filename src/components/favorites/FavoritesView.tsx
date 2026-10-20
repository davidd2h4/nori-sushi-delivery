"use client";

import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ProductCard } from "@/components/product/ProductCard";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProductById } from "@/data/products";
import { useT } from "@/i18n";
import { useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { useHydrated } from "@/store/hydration";
import { useUi } from "@/store/ui";
import type { Product } from "@/types";

export function FavoritesView() {
  const t = useT();
  const hydrated = useHydrated();
  const ids = useFavorites((s) => s.ids);
  const clear = useFavorites((s) => s.clear);
  const add = useCart((s) => s.add);
  const notify = useUi((s) => s.notify);

  const items = ids.map(getProductById).filter((p): p is Product => !!p);
  const available = items.filter((p) => p.available);

  const addAll = () => {
    available.forEach((p) => add(p.id));
    notify(t.favorites.addedAll);
  };

  return (
    <>
      <PageHero eyebrow={t.favorites.eyebrow} title={t.favorites.title} intro={t.favorites.intro} kanji="好" />
      <div className="container-nori">
        {!hydrated ? (
          <div aria-hidden="true" className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="shimmer aspect-[3/4] rounded-lg" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line">
            <EmptyState
              icon={<Heart className="size-10" strokeWidth={1.4} aria-hidden="true" />}
              title={t.favorites.empty}
              text={t.favorites.emptyText}
              action={<ButtonLink href="/menu">{t.common.viewMenu}</ButtonLink>}
            />
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-mute">{t.common.items(items.length)}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" onClick={clear}>
                  <Trash2 className="size-4" aria-hidden="true" />
                  {t.favorites.clear}
                </Button>
                <Button size="sm" onClick={addAll} disabled={available.length === 0}>
                  <ShoppingBag className="size-4" aria-hidden="true" />
                  {t.favorites.addAll}
                </Button>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} headingLevel="h2" />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
