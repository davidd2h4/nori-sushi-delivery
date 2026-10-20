"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PromoCard, promoVisuals } from "@/components/promo/PromoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useT } from "@/i18n";

export function PromoTeaser() {
  const t = useT();
  return (
    <section aria-labelledby="promo-title" className="container-nori">
      <SectionHeading
        id="promo-title"
        eyebrow={t.home.promoEyebrow}
        title={t.home.promoTitle}
        text={t.promotions.intro}
        action={
          <Link href="/promotions" className="group inline-flex items-center gap-2 font-semibold text-paper hover:text-red-bright">
            {t.home.promoCta}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        }
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.promotions.items.map((item, i) => (
          <Reveal as="li" key={item.code} delay={i * 80} className={i === 2 ? "md:col-span-2 lg:col-span-1" : undefined}>
            <PromoCard {...item} {...promoVisuals[i]} className="h-full" />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
