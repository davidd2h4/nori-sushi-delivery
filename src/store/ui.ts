import { create } from "zustand";

export interface Toast {
  id: number;
  message: string;
}

interface UiState {
  cartOpen: boolean;
  menuOpen: boolean;
  toasts: Toast[];
  openCart: () => void;
  closeCart: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  notify: (message: string) => void;
  dismiss: (id: number) => void;
}

let toastId = 0;

export const useUi = create<UiState>()((set, get) => ({
  cartOpen: false,
  menuOpen: false,
  toasts: [],
  openCart: () => set({ cartOpen: true, menuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  openMenu: () => set({ menuOpen: true, cartOpen: false }),
  closeMenu: () => set({ menuOpen: false }),
  notify: (message) => {
    const id = ++toastId;
    // Keep at most three toasts on screen.
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, message }] }));
    window.setTimeout(() => get().dismiss(id), 2600);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
