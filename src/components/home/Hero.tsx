"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { getProductBySlug } from "@/data/products";
import { useT, useTr } from "@/i18n";

const featured = getProductBySlug("set-nori");

export function Hero() {
  const t = useT();
  const tr = useTr();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Ambient background: red sun glow, wave pattern, fine grid lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/3 size-[32rem] rounded-full bg-red/[0.07] blur-3xl" />
        <div className="bg-seigaiha absolute inset-x-0 bottom-0 h-56 opacity-[0.045] [mask-image:linear-gradient(to_top,#000,transparent)]" />
      </div>

      <div className="container-nori grid items-center gap-12 pb-16 pt-8 md:pt-12 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-20 lg:pt-6">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow mb-6 animate-fade-up md:mb-8">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="font-display text-display font-semibold tracking-[-0.01em]">
            <span className="block animate-fade-up [animation-delay:90ms]">{t.hero.titleLine1}</span>
            <span className="block animate-fade-up italic text-red-bright [animation-delay:180ms]">
              {t.hero.titleLine2}
            </span>
          </h1>
          <p className="mt-7 max-w-lg animate-fade-up text-base leading-relaxed text-paper/75 [animation-delay:270ms] md:mt-9 md:text-lg">
            {t.hero.text}
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] min-[420px]:flex-row md:mt-11">
            <ButtonLink href="/menu" size="lg" className="group">
              {t.hero.ctaMenu}
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </ButtonLink>
            <ButtonLink href="/menu?category=sets" size="lg" variant="secondary">
              {t.hero.ctaSets}
            </ButtonLink>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[34rem] animate-fade-in [animation-delay:150ms] lg:max-w-none">
          {/* Red sun behind the arch */}
          <div
            aria-hidden="true"
            className="absolute right-[2%] top-[-3%] aspect-square w-[46%] rounded-full bg-[radial-gradient(circle_at_40%_40%,#f04438_0%,#d71920_45%,#8f0f14_100%)] opacity-95"
          />
          <div
            aria-hidden="true"
            className="absolute right-[2%] top-[-3%] aspect-square w-[46%] rounded-full shadow-[0_0_120px_30px_rgb(215_25_32/0.4)]"
          />
          {/* Enso-like rings */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[2%] aspect-square w-[96%] -translate-x-1/2 rounded-full border border-paper/10"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[-4%] hidden aspect-square w-[112%] -translate-x-1/2 rounded-full border border-dashed border-paper/[0.06] sm:block"
          />

          {/* Arch-framed photo */}
          <div className="relative mx-auto aspect-[11/14] w-[82%] overflow-hidden rounded-t-full rounded-b-[2rem] border border-white/10 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
            <Image
              src="/images/hero/hero-set.webp"
              alt={t.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 80vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
            <div aria-hidden="true" className="absolute inset-0 rounded-t-full rounded-b-[2rem] ring-1 ring-inset ring-white/10" />
          </div>

          {/* Vertical Japanese lettering */}
          <p
            aria-hidden="true"
            className="absolute right-0 top-[12%] font-display text-xl tracking-[0.5em] text-paper/45 [writing-mode:vertical-rl] sm:text-2xl"
          >
            海苔 · 鮨 · 和
          </p>

          {/* Hanko stamp */}
          <div
            role="img"
            aria-label={t.hero.stampLabel}
            className="absolute left-0 top-[18%] grid size-16 rotate-[-8deg] place-items-center rounded-lg border-2 border-red bg-ink/60 font-display text-xl text-red-bright backdrop-blur-sm sm:size-20 sm:text-2xl"
          >
            <span className="leading-none [writing-mode:vertical-rl]">{t.hero.stamp}</span>
          </div>

          {/* Featured set card */}
          {featured && (
            <Link
              href={`/menu/${featured.slug}`}
              className="group absolute bottom-[6%] left-0 flex max-w-[16.5rem] animate-float items-center gap-3 rounded-[1.4rem] border border-white/10 bg-ink/75 p-3 pr-5 shadow-lift backdrop-blur-xl transition-colors hover:border-red/60 sm:left-[-2%]"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                <Image src={featured.image} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-paper group-hover:text-red-bright">
                  {tr(featured.name)}
                </span>
                <span className="mt-0.5 block text-sm text-mute">
                  {featured.pieces && `${t.common.pieces(featured.pieces)} · `}
                  <Price value={featured.price} className="font-semibold text-paper" />
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
