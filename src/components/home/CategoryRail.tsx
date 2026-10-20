"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { useT, useTr } from "@/i18n";

/** Horizontal, swipeable category navigation with round dish photos. */
export function CategoryRail() {
  const t = useT();
  const tr = useTr();

  return (
    <nav aria-label={t.catalog.categoriesLabel} className="-mx-4 sm:-mx-6 lg:mx-0">
      <ul className="no-scrollbar fade-x flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 pt-1 sm:scroll-px-6 sm:px-6 lg:gap-4 lg:px-0">
        {categories
          .filter((c) => c.id !== "all")
          .map((c) => (
            <li key={c.id} className="shrink-0 snap-start">
              <Link
                href={`/menu?category=${c.id}`}
                className="group flex w-[5.25rem] flex-col items-center gap-2.5 rounded-2xl py-1 text-center sm:w-24"
              >
                <span className="relative block size-[4.5rem] rounded-full p-[3px] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 sm:size-20">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,#d71920,#f04438,#e2b07a,#303035,#d71920)] opacity-70 transition-opacity group-hover:opacity-100"
                  />
                  <span className="relative block size-full overflow-hidden rounded-full border-2 border-ink">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                    />
                  </span>
                </span>
                <span className="text-[0.82rem] font-semibold leading-tight text-paper/85 group-hover:text-paper">
                  {tr(c.name)}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
