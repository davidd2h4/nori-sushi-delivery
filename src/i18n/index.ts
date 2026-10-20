"use client";

import { useLocaleStore } from "@/store/locale";
import type { Locale, Localized } from "@/types";
import { en } from "./en";
import { uk, type Dictionary } from "./uk";

export const dictionaries: Record<Locale, Dictionary> = { uk, en };

export function useLocale(): Locale {
  return useLocaleStore((s) => s.locale);
}

export function useT(): Dictionary {
  return dictionaries[useLocale()];
}

/** Picks the active-locale value from a Localized record. */
export function useTr(): (value: Localized) => string {
  const locale = useLocale();
  return (value) => value[locale];
}

export type { Dictionary };
