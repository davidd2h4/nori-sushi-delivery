"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useT } from "@/i18n";
import { navLinks } from "./nav-links";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-ink-2 md:mt-32">
      <div aria-hidden="true" className="bg-seigaiha pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-red/10 blur-3xl"
      />
      <div className="container-nori relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <Link href="/" aria-label={t.nav.home} className="inline-block rounded-lg">
            <Logo />
          </Link>
          <p className="mt-6 text-mute">{t.footer.about}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-mute">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-red-bright" />
            {t.common.demoSite}
          </p>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-mute">{t.footer.navTitle}</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-paper/85 transition-colors hover:text-red-bright">
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-mute">{t.footer.infoTitle}</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <Link href="/favorites" className="text-paper/85 transition-colors hover:text-red-bright">
                {t.nav.favorites}
              </Link>
            </li>
            <li>
              <Link href="/delivery#faq" className="text-paper/85 transition-colors hover:text-red-bright">
                {t.footer.faq}
              </Link>
            </li>
            <li>
              <Link href="/credits" className="text-paper/85 transition-colors hover:text-red-bright">
                {t.footer.credits}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-line">
        <div className="container-nori flex flex-col gap-3 py-6 text-sm text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {t.footer.rights}
          </p>
          <p>{t.footer.disclaimer}</p>
          <p>{t.footer.photos}</p>
        </div>
      </div>
    </footer>
  );
}
