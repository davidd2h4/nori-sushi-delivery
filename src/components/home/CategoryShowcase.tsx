"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryRail } from "./CategoryRail";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { useT, useTr } from "@/i18n";
import { matchesCategory } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import type { CategoryId } from "@/types";

const tiles: { id: CategoryId; image: string; kanji: string; className: string }[] = [
  { id: "rolls", image: "/images/products/philadelphia-classic.webp", kanji: "巻", className: "col-span-2 row-span-2 lg:col-span-2" },
  { id: "sets", image: "/images/products/set-nori.webp", kanji: "盛", className: "col-span-2 lg:col-span-2" },
  { id: "nigiri", image: "/images/products/nigiri-salmon.webp", kanji: "握", className: "" },
  { id: "gunkan", image: "/images/products/gunkan-ikura.webp", kanji: "軍", className: "" },
  { id: "soups", image: "/images/products/soup-miso.webp", kanji: "汁", className: "lg:col-span-2" },
  { id: "desserts", image: "/images/products/dessert-mochi-assorted.webp", kanji: "甘", className: "lg:col-span-2" },
];

export function CategoryShowcase() {
  const t = useT();
  const tr = useTr();
  return (
    <section aria-labelledby="categories-title" className="container-nori">
      <SectionHeading
        id="categories-title"
        eyebrow={t.home.categoriesEyebrow}
        title={t.home.categoriesTitle}
        action={
          <Link href="/menu" className="group inline-flex items-center gap-2 font-semibold text-paper hover:text-red-bright">
            {t.home.popularLink}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        }
      />
      <div className="mt-8 md:mt-10">
        <CategoryRail />
      </div>
      <ul className="mt-8 hidden auto-rows-[13rem] grid-cols-2 gap-4 md:grid lg:grid-cols-4 lg:auto-rows-[15rem]">
        {tiles.map((tile, i) => {
          const category = getCategory(tile.id);
          const count = products.filter((p) => matchesCategory(p, tile.id)).length;
          return (
            <Reveal as="li" key={tile.id} delay={i * 60} className={cn("min-h-0", tile.className)}>
              <Link
                href={`/menu?category=${tile.id}`}
                className="group relative block h-full overflow-hidden rounded-lg border border-line"
              >
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/0" />
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-2 font-display text-5xl text-paper/25 transition-colors group-hover:text-red-bright/70 sm:text-6xl"
                >
                  {tile.kanji}
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                  <span>
                    <span className="block font-display text-2xl font-semibold leading-tight sm:text-3xl">
                      {tr(category.name)}
                    </span>
                    <span className="mt-0.5 block text-sm text-paper/70">{t.common.items(count)}</span>
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper/10 backdrop-blur transition-colors group-hover:bg-red">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
