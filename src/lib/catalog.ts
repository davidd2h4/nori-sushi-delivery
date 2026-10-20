import { getCategory } from "@/data/categories";
import type { CategoryId, Locale, Product, SortOption } from "@/types";

export interface CatalogFilters {
  category: CategoryId;
  query: string;
  sort: SortOption;
  onlyAvailable: boolean;
}

export const defaultFilters: CatalogFilters = {
  category: "all",
  query: "",
  sort: "popular",
  onlyAvailable: false,
};

const sortOptions: SortOption[] = ["popular", "price-asc", "price-desc", "name"];

export function isSortOption(value: string | null | undefined): value is SortOption {
  return !!value && (sortOptions as string[]).includes(value);
}

/** Case- and apostrophe-insensitive normalisation for search. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'`ʼ]/g, "")
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesCategory(product: Product, category: CategoryId): boolean {
  if (category === "all") return true;
  if (product.category === category) return true;
  return getCategory(category).includes?.includes(product.category) ?? false;
}

/**
 * Matches a query against names and ingredients in every locale,
 * so "лосось" and "salmon" both work whichever language is active.
 */
export function matchesQuery(product: Product, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  const haystack = normalize(
    [
      product.name.uk,
      product.name.en,
      ...product.ingredients.flatMap((i) => [i.uk, i.en]),
    ].join(" | "),
  );
  return q.split(" ").every((word) => haystack.includes(word) || haystack.includes(stem(word)));
}

/**
 * Very light stemming for Ukrainian inflection: "лосось" should also find
 * "лосося" and "лососем", "креветка" — "креветкою".
 */
function stem(word: string): string {
  return word.length >= 5 ? word.slice(0, -1) : word;
}

export function filterProducts(list: Product[], filters: CatalogFilters, locale: Locale): Product[] {
  const result = list.filter(
    (p) =>
      matchesCategory(p, filters.category) &&
      matchesQuery(p, filters.query) &&
      (!filters.onlyAvailable || p.available),
  );
  const collator = new Intl.Collator(locale === "uk" ? "uk" : "en");
  return result.sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return collator.compare(a.name[locale], b.name[locale]);
      case "popular":
      default:
        return b.popularity - a.popularity;
    }
  });
}
