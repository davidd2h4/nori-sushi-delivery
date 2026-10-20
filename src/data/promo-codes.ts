import type { PromoCode } from "@/types";

/** Demo promo codes. They only change totals locally and are never sent anywhere. */
export const promoCodes: PromoCode[] = [
  {
    code: "NORI10",
    kind: "percent",
    value: 10,
    minSubtotal: 500,
    description: {
      uk: "−10% на замовлення від 500 ₴",
      en: "−10% on orders from ₴500",
    },
  },
  {
    code: "WELCOME15",
    kind: "percent",
    value: 15,
    minSubtotal: 800,
    maxDiscount: 300,
    description: {
      uk: "−15% від 800 ₴, але не більше 300 ₴",
      en: "−15% from ₴800, up to ₴300 off",
    },
  },
  {
    code: "ROLL100",
    kind: "fixed",
    value: 100,
    minSubtotal: 700,
    description: {
      uk: "−100 ₴ на замовлення від 700 ₴",
      en: "₴100 off orders from ₴700",
    },
  },
];

export function findPromoCode(code: string): PromoCode | undefined {
  const normalized = code.trim().toUpperCase();
  return promoCodes.find((p) => p.code === normalized);
}
