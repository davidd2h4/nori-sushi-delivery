export type Locale = "uk" | "en";

/** A string translated into every supported locale. */
export type Localized = Record<Locale, string>;

export type CategoryId =
  | "all"
  | "rolls"
  | "philadelphia"
  | "california"
  | "baked"
  | "tempura"
  | "maki"
  | "nigiri"
  | "gunkan"
  | "sashimi"
  | "sets"
  | "soups"
  | "salads"
  | "snacks"
  | "desserts"
  | "drinks"
  | "sauces";

export type ProductTag = "hit" | "new" | "spicy" | "vegetarian";

export interface Category {
  id: CategoryId;
  name: Localized;
  /** Representative dish photo used as the category icon. */
  image: string;
  /** Categories that also appear when this one is selected (e.g. "Роли" includes Philadelphia). */
  includes?: CategoryId[];
}

export interface Product {
  id: string;
  slug: string;
  category: Exclude<CategoryId, "all">;
  name: Localized;
  description: Localized;
  ingredients: Localized[];
  /** Weight in grams, or volume in ml for drinks. */
  weight: number;
  unit: "g" | "ml";
  pieces?: number;
  price: number;
  /** Demo popularity score used only for sorting. */
  popularity: number;
  tags: ProductTag[];
  available: boolean;
  image: string;
  imageAlt: Localized;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export type PromoKind = "percent" | "fixed";

export interface PromoCode {
  code: string;
  kind: PromoKind;
  value: number;
  minSubtotal: number;
  /** Upper bound for percent discounts. */
  maxDiscount?: number;
  description: Localized;
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "name";
