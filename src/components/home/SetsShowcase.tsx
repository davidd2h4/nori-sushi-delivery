"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { useT } from "@/i18n";

const sets = products
  .filter((p) => p.category === "sets")
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 3);

export function SetsShowcase() {
  const t = useT();
  return (
    <section aria-labelledby="sets-title" className="container-nori">
      <div className="relative isolate overflow-hidden rounded-2xl border border-line">
        <Image
          src="/images/promo/promo-platter.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="max-w-xl px-6 py-14 sm:px-10 md:py-20 lg:px-16 lg:py-24">
          <p className="eyebrow mb-5">{t.home.setsEyebrow}</p>
          <h2 id="sets-title" className="font-display text-h2 font-semibold text-balance">
            {t.home.setsTitle}
          </h2>
          <p className="mt-5 text-paper/75 md:text-lg">{t.home.setsText}</p>
          <ButtonLink href="/menu?category=sets" size="lg" className="group mt-8">
            {t.home.setsCta}
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {sets.map((product, i) => (
          <Reveal as="li" key={product.id} delay={i * 80} className={i === 2 ? "hidden lg:block" : undefined}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
