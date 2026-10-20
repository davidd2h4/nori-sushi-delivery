"use client";

import { useEffect, type ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "@/components/ui/Toaster";
import { hydrateStores } from "@/store/hydration";
import { useLocaleStore } from "@/store/locale";
import { MobileMenu } from "./MobileMenu";

/** Restores persisted state after mount and keeps <html lang> in sync. */
export function Providers({ children }: { children: ReactNode }) {
  const locale = useLocaleStore((s) => s.locale);

  useEffect(() => {
    void hydrateStores();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      {children}
      <CartDrawer />
      <MobileMenu />
      <Toaster />
    </>
  );
}
