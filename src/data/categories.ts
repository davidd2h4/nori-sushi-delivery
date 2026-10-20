import type { Category, CategoryId } from "@/types";

const img = (name: string) => `/images/products/${name}.webp`;

export const categories: Category[] = [
  { id: "all", name: { uk: "Усі страви", en: "All dishes" }, image: img("set-party") },
  {
    id: "rolls",
    name: { uk: "Роли", en: "Rolls" },
    image: img("roll-dragon-eel"),
    includes: ["philadelphia", "california", "baked"],
  },
  { id: "philadelphia", name: { uk: "Філадельфія", en: "Philadelphia" }, image: img("philadelphia-classic") },
  { id: "california", name: { uk: "Каліфорнія", en: "California" }, image: img("california-masago") },
  { id: "baked", name: { uk: "Запечені", en: "Baked" }, image: img("baked-salmon") },
  { id: "tempura", name: { uk: "Темпура", en: "Tempura" }, image: img("tempura-ebi") },
  { id: "sets", name: { uk: "Сети", en: "Sets" }, image: img("set-nori") },
  { id: "nigiri", name: { uk: "Нігірі", en: "Nigiri" }, image: img("nigiri-salmon") },
  { id: "gunkan", name: { uk: "Гункани", en: "Gunkan" }, image: img("gunkan-ikura") },
  { id: "sashimi", name: { uk: "Сашимі", en: "Sashimi" }, image: img("sashimi-assorted") },
  { id: "maki", name: { uk: "Макі", en: "Maki" }, image: img("maki-salmon") },
  { id: "snacks", name: { uk: "Закуски", en: "Starters" }, image: img("snack-gyoza") },
  { id: "soups", name: { uk: "Супи", en: "Soups" }, image: img("soup-miso") },
  { id: "salads", name: { uk: "Салати", en: "Salads" }, image: img("salad-chuka-avocado-crab") },
  { id: "desserts", name: { uk: "Десерти", en: "Desserts" }, image: img("dessert-mochi-assorted") },
  { id: "drinks", name: { uk: "Напої", en: "Drinks" }, image: img("drink-matcha-latte") },
  { id: "sauces", name: { uk: "Соуси", en: "Sauces" }, image: img("sauce-soy") },
];

export const categoryIds = categories.map((c) => c.id);

export function isCategoryId(value: string | null | undefined): value is CategoryId {
  return !!value && (categoryIds as string[]).includes(value);
}

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id) ?? categories[0];
}
