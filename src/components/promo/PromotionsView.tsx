"use client";

import { ArrowRight, Info } from "lucide-react";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import { PromoCard, promoVisuals } from "./PromoCard";

export function PromotionsView() {
  const t = useT();
  return (
    <>
      <PageHero eyebrow={t.promotions.eyebrow} title={t.promotions.title} kanji="特典">
        <p className="mt-6 flex max-w-2xl items-start gap-3 rounded-lg border border-warm/30 bg-warm/[0.06] p-4 text-paper/85">
          <Info className="mt-0.5 size-5 shrink-0 text-warm" aria-hidden="true" />
          {t.promotions.intro}
        </p>
      </PageHero>

      <div className="container-nori">
        <ul className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {t.promotions.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.code}
              delay={i * 80}
              className={cn(i === 0 && "lg:col-span-2 lg:row-span-2")}
            >
              <PromoCard {...item} {...promoVisuals[i]} large={i === 0} className="h-full" />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-4">
          <section
            aria-labelledby="promo-sets-title"
            className="relative isolate grid overflow-hidden rounded-xl border border-line bg-ink-2 md:grid-cols-2"
          >
            <div className="relative min-h-64 md:order-2">
              <Image src="/images/products/set-party.webp" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-2 to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-12">
              <h2 id="promo-sets-title" className="font-display text-h2 font-semibold">
                {t.promotions.setsTitle}
              </h2>
              <p className="mt-4 text-paper/75 md:text-lg">{t.promotions.setsText}</p>
              <ButtonLink href="/menu?category=sets" size="lg" className="group mt-8 self-start">
                {t.promotions.setsCta}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </ButtonLink>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
