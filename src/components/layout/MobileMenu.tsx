"use client";

import { ArrowUpRight, Heart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Sheet } from "@/components/ui/Sheet";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import { useFavorites } from "@/store/favorites";
import { useUi } from "@/store/ui";
import { LanguageSwitch } from "./LanguageSwitch";
import { isActivePath, navLinks } from "./nav-links";

export function MobileMenu() {
  const t = useT();
  const pathname = usePathname();
  const open = useUi((s) => s.menuOpen);
  const close = useUi((s) => s.closeMenu);
  const favCount = useFavorites((s) => s.ids.length);

  return (
    <Sheet
      open={open}
      onClose={close}
      labelledBy="mobile-menu-title"
      className="h-dvh w-screen animate-menu-in bg-ink"
    >
      <div className="relative flex h-full flex-col overflow-y-auto">
        <div aria-hidden="true" className="bg-seigaiha pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-[0.05]" />
        <div className="container-nori flex h-[4.5rem] shrink-0 items-center justify-between">
          <Logo compact />
          <h2 id="mobile-menu-title" className="sr-only">
            {t.nav.mainNav}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t.nav.closeMenu}
            className="grid size-11 place-items-center rounded-full border border-line text-paper hover:bg-white/5"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={t.nav.mainNav} className="container-nori mt-6 flex-1">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-center justify-between py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="w-6 font-display text-sm text-mute tabular-nums">0{i + 1}</span>
                      <span
                        className={cn(
                          "font-display text-[2rem] font-semibold leading-none",
                          active ? "text-red-bright" : "text-paper",
                        )}
                      >
                        {t.nav[link.key]}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
            <li className="border-b border-line">
              <Link href="/favorites" onClick={close} className="flex items-center justify-between py-5">
                <span className="flex items-center gap-4">
                  <Heart className="size-5 text-red-bright" aria-hidden="true" />
                  <span className="text-lg font-semibold">{t.nav.favorites}</span>
                </span>
                {favCount > 0 && (
                  <span className="rounded-full bg-surface px-3 py-1 text-sm font-semibold">{favCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="container-nori relative flex shrink-0 flex-col gap-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8">
          <div className="flex items-center justify-between">
            <span className="text-sm text-mute">{t.nav.language}</span>
            <LanguageSwitch />
          </div>
          <ButtonLink href="/menu" onClick={close} size="lg" className="w-full">
            {t.nav.order}
          </ButtonLink>
        </div>
      </div>
    </Sheet>
  );
}
