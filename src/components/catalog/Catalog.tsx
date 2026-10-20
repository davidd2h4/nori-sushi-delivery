"use client";

import { RotateCcw, SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Switch } from "@/components/ui/Switch";
import { isCategoryId } from "@/data/categories";
import { products } from "@/data/products";
import { useLocale, useT } from "@/i18n";
import { defaultFilters, filterProducts, isSortOption, type CatalogFilters } from "@/lib/catalog";
import { CategoryTabs } from "./CategoryTabs";
import { SearchInput } from "./SearchInput";
import { SortSelect } from "./SortSelect";

function filtersFromParams(params: URLSearchParams): CatalogFilters {
  const category = params.get("category");
  const sort = params.get("sort");
  return {
    category: isCategoryId(category) ? category : defaultFilters.category,
    query: params.get("q") ?? "",
    sort: isSortOption(sort) ? sort : defaultFilters.sort,
    onlyAvailable: params.get("available") === "1",
  };
}

function filtersToQuery(f: CatalogFilters): string {
  const params = new URLSearchParams();
  if (f.category !== defaultFilters.category) params.set("category", f.category);
  if (f.query.trim()) params.set("q", f.query.trim());
  if (f.sort !== defaultFilters.sort) params.set("sort", f.sort);
  if (f.onlyAvailable) params.set("available", "1");
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function Catalog() {
  const t = useT();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<CatalogFilters>(() => filtersFromParams(searchParams));

  // Links such as /menu?category=sets can change the URL while this component
  // stays mounted. Adopt those external changes (adjusting state during render).
  const paramsString = searchParams.toString();
  const [syncedParams, setSyncedParams] = useState(paramsString);
  if (paramsString !== syncedParams) {
    setSyncedParams(paramsString);
    const fromUrl = filtersFromParams(searchParams);
    if (filtersToQuery(fromUrl) !== filtersToQuery(filters)) setFilters(fromUrl);
  }
  const deferredQuery = useDeferredValue(filters.query);

  // Reflect filters in the URL so results can be shared and survive reloads.
  useEffect(() => {
    const next = `${window.location.pathname}${filtersToQuery(filters)}`;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, "", next);
    }
  }, [filters]);

  const results = useMemo(
    () => filterProducts(products, { ...filters, query: deferredQuery }, locale),
    [filters, deferredQuery, locale],
  );

  const update = (patch: Partial<CatalogFilters>) => setFilters((f) => ({ ...f, ...patch }));
  const isDirty =
    filters.category !== defaultFilters.category ||
    filters.query !== defaultFilters.query ||
    filters.sort !== defaultFilters.sort ||
    filters.onlyAvailable !== defaultFilters.onlyAvailable;
  const reset = () => setFilters(defaultFilters);

  return (
    <div>
      <div className="sticky top-[4.5rem] z-30 -mx-4 border-b border-line/70 bg-ink/90 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:rounded-xl lg:border lg:px-4">
        <CategoryTabs value={filters.category} onChange={(category) => update({ category })} />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_15rem] lg:grid-cols-[1fr_16rem_auto] lg:items-center">
        <SearchInput value={filters.query} onChange={(query) => update({ query })} />
        <SortSelect value={filters.sort} onChange={(sort) => update({ sort })} />
        <div className="flex items-center justify-between gap-4 md:col-span-2 lg:col-span-1 lg:justify-end lg:pl-3">
          <Switch
            id="only-available"
            checked={filters.onlyAvailable}
            onChange={(onlyAvailable) => update({ onlyAvailable })}
            label={t.catalog.onlyAvailable}
          />
        </div>
      </div>

      <div className="mt-6 flex min-h-11 flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm font-medium text-mute">
          {t.catalog.found(results.length)}
        </p>
        {isDirty && (
          <Button variant="ghost" size="sm" onClick={reset} className="-mr-2">
            <RotateCcw className="size-4" aria-hidden="true" />
            {t.catalog.reset}
          </Button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product, i) => (
            <li key={product.id}>
              <ProductCard product={product} priority={i < 4} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-line">
          <EmptyState
            icon={<SearchX className="size-10" strokeWidth={1.4} aria-hidden="true" />}
            title={t.catalog.emptyTitle}
            text={t.catalog.emptyText}
            action={
              <Button onClick={reset}>
                <RotateCcw className="size-4" aria-hidden="true" />
                {t.catalog.reset}
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
