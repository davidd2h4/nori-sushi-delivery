"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";

const popular = products
  .filter((p) => p.available && p.category !== "sets")
  .sort((a, b) => b.popularity - a.popularity)
  .slice(0, 8);

export function PopularProducts() {
  const t = useT();
  return (
    <section aria-labelledby="popular-title" className="container-nori">
      <SectionHeading
        id="popular-title"
        eyebrow={t.home.popularEyebrow}
        title={t.home.popularTitle}
        action={
          <Link href="/menu" className="group inline-flex items-center gap-2 font-semibold text-paper hover:text-red-bright">
            {t.home.popularLink}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        }
      />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {popular.map((product, i) => (
          <Reveal as="li" key={product.id} delay={(i % 4) * 70} className={cn(i >= 6 && "hidden lg:block")}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
