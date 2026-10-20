"use client";

import { useSyncExternalStore } from "react";
import { useCart } from "./cart";
import { useFavorites } from "./favorites";
import { useLocaleStore } from "./locale";

/*
 * Persisted stores skip automatic hydration so the first client render matches
 * the server HTML. Providers calls hydrateStores() after mount, and components
 * that would otherwise flash an empty state wait for useHydrated().
 */
let hydrated = false;
const listeners = new Set<() => void>();

export async function hydrateStores() {
  if (hydrated) return;
  await Promise.all([
    useLocaleStore.persist.rehydrate(),
    useCart.persist.rehydrate(),
    useFavorites.persist.rehydrate(),
  ]);
  hydrated = true;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => hydrated,
    () => false,
  );
}
