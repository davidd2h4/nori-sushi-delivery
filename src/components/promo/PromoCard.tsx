"use client";

import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";

interface PromoCardProps {
  title: string;
  text: string;
  code: string;
  image: string;
  kanji: string;
  className?: string;
  large?: boolean;
}

export function PromoCard({ title, text, code, image, kanji, className, large = false }: PromoCardProps) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); the code stays visible to copy manually.
    }
  };

  return (
    <article
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-xl border border-line",
        large ? "min-h-[26rem] md:min-h-[30rem]" : "min-h-[22rem]",
        className,
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/10" />
      <span
        aria-hidden="true"
        className="absolute right-5 top-3 font-display text-7xl text-paper/20 transition-colors group-hover:text-red-bright/60"
      >
        {kanji}
      </span>
      <span className="absolute left-5 top-5 rounded-full border border-paper/25 bg-ink/60 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-paper backdrop-blur">
        {t.promotions.badge}
      </span>

      <div className="p-6 md:p-8">
        <h3 className={cn("font-display font-semibold leading-tight", large ? "text-h2" : "text-h3")}>{title}</h3>
        <p className="mt-3 max-w-md text-paper/75">{text}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="sr-only">{t.promotions.useCode}:</span>
          <code className="rounded-full border border-dashed border-red-bright/70 bg-red/10 px-4 py-2 font-sans text-sm font-bold tracking-[0.2em] text-paper">
            {code}
          </code>
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-paper/85 transition-colors hover:bg-white/10 hover:text-paper"
          >
            {copied ? (
              <Check className="size-4 text-success" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            <span aria-live="polite">{copied ? t.promotions.copied : t.promotions.copy}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export const promoVisuals = [
  { image: "/images/promo/promo-salmon.webp", kanji: "割" },
  { image: "/images/promo/promo-nigiri.webp", kanji: "宴" },
  { image: "/images/promo/promo-stack.webp", kanji: "百" },
];
