"use client";

import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Price } from "@/components/ui/Price";
import { useScrolled } from "@/hooks/useScrolled";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import { calculateTotals } from "@/lib/pricing";
import { selectItemCount, useCart } from "@/store/cart";
import { useFavorites } from "@/store/favorites";
import { useUi } from "@/store/ui";
import { isActivePath, navLinks } from "./nav-links";

function CountBadge({ count, className }: { count: number; className?: string }) {
  if (count <= 0) return null;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full bg-red px-1 text-[0.65rem] font-bold leading-none text-white",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

const ringBtn =
  "relative grid size-11 place-items-center rounded-full border border-white/10 text-paper/90 transition-[border-color,background-color,color] duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-paper";

export function Header() {
  const t = useT();
  const pathname = usePathname();
  const itemCount = useCart(selectItemCount);
  const subtotal = useCart((s) => calculateTotals(s.lines, null).subtotal);
  const favCount = useFavorites((s) => s.ids.length);
  const openCart = useUi((s) => s.openCart);
  const openMenu = useUi((s) => s.openMenu);
  const scrolled = useScrolled(24);

  return (
    <header className="sticky top-0 z-40 h-[4.5rem] lg:h-20">
      {/* Soft fade behind the floating bar so content never collides with it */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink via-ink/70 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="container-nori relative flex h-full items-center">
        <div
          className={cn(
            "relative flex w-full items-center gap-3 transition-[height,padding,background-color,border-color,box-shadow,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "h-14 rounded-full border border-white/[0.09] bg-ink-2/75 pl-4 pr-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_24px_60px_-24px_rgb(0_0_0/0.95)] backdrop-blur-2xl lg:h-[3.75rem] lg:pl-5 lg:pr-2"
              : "h-full border border-transparent px-0",
          )}
        >
          {/* Red light leak along the bottom edge of the capsule */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-16 -bottom-px h-px bg-gradient-to-r from-transparent via-red-bright/80 to-transparent transition-opacity duration-500",
              scrolled ? "opacity-100" : "opacity-0",
            )}
          />

          <Link href="/" aria-label={t.nav.home} className="mr-auto shrink-0 rounded-lg lg:mr-0">
            <Logo className="hidden sm:inline-flex" withTagline />
            <Logo className="sm:hidden" compact />
          </Link>

          <nav aria-label={t.nav.mainNav} className="mx-auto hidden lg:block">
            <ul className="flex items-center">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-2 whitespace-nowrap px-2.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 xl:px-4 xl:text-[0.78rem]",
                        active ? "text-paper" : "text-paper/55 hover:text-paper",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1.5 rounded-full bg-red-bright shadow-[0_0_10px_2px_rgb(240_68_56/0.6)] transition-all duration-300",
                          active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                        )}
                      />
                      {t.nav[link.key]}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-paper/70 to-transparent transition-transform duration-500 group-hover:scale-x-100 xl:inset-x-4"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/favorites"
              className={cn(ringBtn, "max-[359px]:hidden")}
              aria-label={`${t.nav.favorites}${favCount ? `, ${favCount}` : ""}`}
              aria-current={pathname === "/favorites" ? "page" : undefined}
            >
              <Heart className="size-[1.1rem]" aria-hidden="true" />
              <CountBadge count={favCount} className="absolute -right-1 -top-1 ring-2 ring-ink" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={t.cart.open(itemCount)}
              className="group relative flex h-11 items-center gap-2.5 rounded-full border border-white/10 pl-3.5 pr-3.5 text-paper transition-[border-color,background-color] duration-300 hover:border-white/30 hover:bg-white/[0.05] sm:pr-4 lg:pr-3.5 xl:pr-4"
            >
              <span className="relative">
                <ShoppingBag className="size-[1.1rem]" aria-hidden="true" />
                <CountBadge count={itemCount} className="absolute -right-2.5 -top-2 ring-2 ring-ink sm:hidden lg:grid xl:hidden" />
              </span>
              <span aria-hidden="true" className="hidden items-center gap-2 sm:flex lg:hidden xl:flex">
                {itemCount > 0 ? (
                  <>
                    <Price value={subtotal} className="text-sm font-semibold" />
                    <CountBadge count={itemCount} />
                  </>
                ) : (
                  <span className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-paper/80">
                    {t.nav.cart}
                  </span>
                )}
              </span>
            </button>

            <Link
              href="/menu"
              className="group ml-1 hidden h-11 items-center gap-2 rounded-full bg-red pl-5 pr-1.5 text-[0.74rem] font-bold uppercase tracking-[0.16em] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] transition-[background-color,box-shadow] duration-300 hover:bg-red-bright hover:shadow-glow md:flex lg:hidden xl:flex"
            >
              {t.nav.order}
              <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </Link>

            <button
              type="button"
              onClick={openMenu}
              className={cn(ringBtn, "group lg:hidden")}
              aria-label={t.nav.openMenu}
              aria-haspopup="dialog"
            >
              <span aria-hidden="true" className="flex w-[1.1rem] flex-col items-end gap-[5px]">
                <span className="h-[1.5px] w-full rounded-full bg-current" />
                <span className="h-[1.5px] w-2/3 rounded-full bg-current transition-[width] duration-300 group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
