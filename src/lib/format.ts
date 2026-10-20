import type { Locale } from "@/types";

export function formatPrice(value: number, locale: Locale): string {
  const n = new Intl.NumberFormat(locale === "uk" ? "uk-UA" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
  return locale === "uk" ? `${n} ₴` : `₴${n}`;
}

/** Ukrainian plural form: 1 товар, 2 товари, 5 товарів. */
export function pluralUk(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

export function pluralEn(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}
