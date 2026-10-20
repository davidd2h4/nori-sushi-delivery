"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface ProductImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * next/image with a branded placeholder: a shimmer while loading and a calm
 * NORI tile if the file is missing, so a broken image never shows.
 */
export function ProductImage({ src, alt, sizes, priority, className, imgClassName }: ProductImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {status === "loading" && <div aria-hidden="true" className="shimmer absolute inset-0" />}
      {status === "error" ? (
        <ImagePlaceholder label={alt} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "object-cover transition-opacity duration-500",
            status === "loaded" ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}

export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="absolute inset-0 grid place-items-center bg-surface">
      <div aria-hidden="true" className="bg-seigaiha absolute inset-0 opacity-[0.06]" />
      <div className="relative flex flex-col items-center gap-2 text-mute">
        <span className="grid size-12 place-items-center rounded-full border border-line font-display text-2xl text-red-bright">
          海
        </span>
        <span className="font-display text-sm tracking-[0.3em]">NORI</span>
      </div>
    </div>
  );
}
