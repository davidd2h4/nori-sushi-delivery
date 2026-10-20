import { findPromoCode } from "@/data/promo-codes";
import { getProductById } from "@/data/products";
import type { CartLine, Product, PromoCode } from "@/types";

export interface ResolvedLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export type PromoStatus =
  | { state: "none" }
  | { state: "applied"; promo: PromoCode }
  | { state: "below-min"; promo: PromoCode; missing: number }
  | { state: "unknown"; code: string };

export interface Totals {
  lines: ResolvedLine[];
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  promo: PromoStatus;
}

/** Drops lines whose product no longer exists in the catalogue. */
export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((line) => {
    const product = getProductById(line.productId);
    if (!product) return [];
    return [{ product, quantity: line.quantity, lineTotal: product.price * line.quantity }];
  });
}

export function calculateDiscount(promo: PromoCode, subtotal: number): number {
  const raw = promo.kind === "percent" ? Math.round((subtotal * promo.value) / 100) : promo.value;
  const capped = promo.maxDiscount ? Math.min(raw, promo.maxDiscount) : raw;
  // A discount can never exceed what is being paid for.
  return Math.max(0, Math.min(capped, subtotal));
}

export function getPromoStatus(code: string | null, subtotal: number): PromoStatus {
  if (!code) return { state: "none" };
  const promo = findPromoCode(code);
  if (!promo) return { state: "unknown", code };
  if (subtotal < promo.minSubtotal) {
    return { state: "below-min", promo, missing: promo.minSubtotal - subtotal };
  }
  return { state: "applied", promo };
}

export function calculateTotals(lines: CartLine[], promoCode: string | null): Totals {
  const resolved = resolveLines(lines);
  const subtotal = resolved.reduce((sum, l) => sum + l.lineTotal, 0);
  const itemCount = resolved.reduce((sum, l) => sum + l.quantity, 0);
  const promo = getPromoStatus(promoCode, subtotal);
  const discount = promo.state === "applied" ? calculateDiscount(promo.promo, subtotal) : 0;
  return {
    lines: resolved,
    itemCount,
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
    promo,
  };
}
