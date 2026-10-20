import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartLine } from "@/types";

export const MAX_QUANTITY = 99;

interface CartState {
  lines: CartLine[];
  promoCode: string | null;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  applyPromo: (code: string) => void;
  removePromo: () => void;
}

const clamp = (n: number) => Math.max(1, Math.min(MAX_QUANTITY, Math.round(n)));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      promoCode: null,
      add: (productId, quantity = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.productId === productId);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.productId === productId ? { ...l, quantity: clamp(l.quantity + quantity) } : l,
              ),
            };
          }
          return { lines: [...s.lines, { productId, quantity: clamp(quantity) }] };
        }),
      setQuantity: (productId, quantity) =>
        set((s) => ({
          lines: s.lines.map((l) => (l.productId === productId ? { ...l, quantity: clamp(quantity) } : l)),
        })),
      increment: (productId) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.productId === productId ? { ...l, quantity: clamp(l.quantity + 1) } : l,
          ),
        })),
      decrement: (productId) =>
        set((s) => ({
          lines: s.lines.flatMap((l) => {
            if (l.productId !== productId) return [l];
            return l.quantity <= 1 ? [] : [{ ...l, quantity: l.quantity - 1 }];
          }),
        })),
      remove: (productId) => set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),
      clear: () => set({ lines: [], promoCode: null }),
      applyPromo: (code) => set({ promoCode: code.trim().toUpperCase() }),
      removePromo: () => set({ promoCode: null }),
    }),
    {
      name: "nori-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);

export const selectItemCount = (s: CartState) => s.lines.reduce((sum, l) => sum + l.quantity, 0);
