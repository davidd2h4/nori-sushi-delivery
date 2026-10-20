"use client";

import { ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Reveal } from "@/components/ui/Reveal";
import { TagBadge } from "@/components/ui/TagBadge";
import { getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { useT, useTr } from "@/i18n";
import { matchesCategory } from "@/lib/catalog";
import { MAX_QUANTITY, useCart } from "@/store/cart";
import { useUi } from "@/store/ui";
import type { Product } from "@/types";
import { FavoriteButton } from "./FavoriteButton";
import { ProductCard } from "./ProductCard";

function relatedTo(product: Product): Product[] {
  const sameCategory = products.filter((p) => p.id !== product.id && p.category === product.category);
  const sameGroup = products.filter(
    (p) => p.id !== product.id && p.category !== product.category && matchesCategory(p, "rolls") && matchesCategory(product, "rolls"),
  );
  const popular = [...products].sort((a, b) => b.popularity - a.popularity);
  const seen = new Set<string>();
  return [...sameCategory, ...sameGroup, ...popular]
    .filter((p) => p.id !== product.id && !seen.has(p.id) && seen.add(p.id))
    .slice(0, 4);
}

export function ProductView({ product }: { product: Product }) {
  const t = useT();
  const tr = useTr();
  const add = useCart((s) => s.add);
  const inCart = useCart((s) => s.lines.find((l) => l.productId === product.id)?.quantity ?? 0);
  const openCart = useUi((s) => s.openCart);
  const notify = useUi((s) => s.notify);
  const [quantity, setQuantity] = useState(1);
  const name = tr(product.name);
  const category = getCategory(product.category);
  const related = relatedTo(product);

  const handleAdd = () => {
    add(product.id, quantity);
    notify(t.toast.added(name));
    setQuantity(1);
  };

  return (
    <>
      <div className="container-nori pt-6 md:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-mute">
            <li>
              <Link href="/menu" className="hover:text-paper">
                {t.nav.menu}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href={`/menu?category=${category.id}`} className="hover:text-paper">
                {tr(category.name)}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-paper/90">
              {name}
            </li>
          </ol>
        </nav>

        <article className="mt-6 grid gap-8 md:mt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -inset-y-6 -z-10 rounded-full bg-red/[0.12] blur-3xl"
            />
            <ProductImage
              src={product.image}
              alt={tr(product.imageAlt)}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] rounded-xl border border-line shadow-lift"
            />
            <FavoriteButton
              productId={product.id}
              productName={name}
              size="md"
              className="absolute right-4 top-4"
            />
          </div>

          <div className="flex flex-col">
            <p className="eyebrow">{tr(category.name)}</p>
            {product.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            )}
            <h1 className="mt-4 font-display text-h1 font-semibold text-balance">{name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-paper/80">{tr(product.description)}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
              <div className="bg-ink-2 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-mute">
                  {product.unit === "ml" ? t.product.volume : t.product.weight}
                </dt>
                <dd className="mt-1 text-lg font-semibold">
                  {product.unit === "ml" ? t.common.ml(product.weight) : t.common.grams(product.weight)}
                </dd>
              </div>
              {product.pieces && (
                <div className="bg-ink-2 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-mute">{t.product.pieces}</dt>
                  <dd className="mt-1 text-lg font-semibold">{t.common.pieces(product.pieces)}</dd>
                </div>
              )}
              <div className="col-span-2 bg-ink-2 p-4 sm:col-span-1">
                <dt className="text-xs font-semibold uppercase tracking-wider text-mute">{t.product.category}</dt>
                <dd className="mt-1 text-lg font-semibold">{tr(category.name)}</dd>
              </div>
            </dl>

            <div className="mt-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-mute">{t.product.ingredients}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <li
                    key={ing.en}
                    className="rounded-full border border-line bg-ink-2 px-3.5 py-1.5 text-sm text-paper/90"
                  >
                    {tr(ing)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 rounded-xl border border-line bg-ink-2 p-5 sm:p-6">
              {product.available ? (
                <>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-mute">{t.product.total}</p>
                      <Price
                        value={product.price * quantity}
                        className="font-display text-[2.6rem] font-semibold leading-none"
                      />
                    </div>
                    <QuantityStepper
                      value={quantity}
                      allowZero={false}
                      onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                      onIncrement={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
                    />
                  </div>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Button size="lg" onClick={handleAdd} className="flex-1">
                      <ShoppingBag className="size-5" aria-hidden="true" />
                      {t.product.addToCart}
                    </Button>
                    {inCart > 0 && (
                      <Button size="lg" variant="secondary" onClick={openCart}>
                        {t.product.inCart(inCart)}
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Price value={product.price} className="font-display text-[2.6rem] font-semibold leading-none text-mute" />
                  <p className="rounded-full border border-line px-4 py-2 font-semibold text-paper/90">
                    {t.product.unavailable}
                  </p>
                </div>
              )}
              <p className="mt-4 text-xs text-mute">{t.product.demoNote}</p>
            </div>
          </div>
        </article>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-nori mt-24">
          <h2 id="related-title" className="font-display text-h2 font-semibold">
            {t.product.related}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
