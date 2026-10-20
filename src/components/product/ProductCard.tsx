"use client";

import Link from "next/link";
import { Price } from "@/components/ui/Price";
import { ProductImage } from "@/components/ui/ProductImage";
import { TagBadge } from "@/components/ui/TagBadge";
import { useT, useTr } from "@/i18n";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";
import { AddToCart } from "./AddToCart";
import { FavoriteButton } from "./FavoriteButton";
import { ProductMeta } from "./ProductMeta";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}

export function ProductCard({ product, priority, headingLevel: Heading = "h3" }: ProductCardProps) {
  const t = useT();
  const tr = useTr();
  const name = tr(product.name);
  const href = `/menu/${product.slug}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-ink-2 shadow-card transition-[border-color,transform,box-shadow] duration-300",
        "hover:-translate-y-1 hover:border-line-strong hover:shadow-lift motion-reduce:hover:translate-y-0",
      )}
    >
      <div className="relative">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <ProductImage
            src={product.image}
            alt={tr(product.imageAlt)}
            priority={priority}
            sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
            className="aspect-[4/3]"
            imgClassName={cn(
              "transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100",
              !product.available && "grayscale-[0.7] opacity-60",
            )}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-2/80 to-transparent"
          />
        </Link>
        {product.tags.length > 0 && (
          <div className="pointer-events-none absolute left-2.5 top-2.5 flex max-w-[70%] flex-wrap gap-1.5 sm:left-3 sm:top-3">
            {product.tags.slice(0, 2).map((tag) => (
              <TagBadge key={tag} tag={tag} compact />
            ))}
          </div>
        )}
        <FavoriteButton
          productId={product.id}
          productName={name}
          className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3"
        />
        {!product.available && (
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-ink/85 px-3 py-1.5 text-center text-xs font-semibold text-paper backdrop-blur">
            {t.product.unavailable}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <ProductMeta product={product} className="mb-1.5 text-xs sm:text-[0.8rem]" />
        <Heading className="text-[0.98rem] font-semibold leading-snug text-paper sm:text-lg">
          <Link href={href} className="transition-colors hover:text-red-bright">
            {name}
          </Link>
        </Heading>
        <p className="mt-1.5 line-clamp-2 text-[0.8rem] leading-relaxed text-mute sm:text-sm">
          {product.ingredients.map((i) => tr(i)).join(", ")}
        </p>
        <div className="mt-auto flex min-h-12 items-center justify-between gap-2 pt-4">
          <Price value={product.price} className="text-lg font-bold text-paper sm:text-xl" />
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}
