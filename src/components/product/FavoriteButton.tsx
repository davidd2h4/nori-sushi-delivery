"use client";

import { Heart } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import { useFavorites } from "@/store/favorites";
import { useUi } from "@/store/ui";

interface FavoriteButtonProps {
  productId: string;
  productName: string;
  className?: string;
  size?: "sm" | "md";
}

export function FavoriteButton({ productId, productName, className, size = "sm" }: FavoriteButtonProps) {
  const t = useT();
  const isFavorite = useFavorites((s) => s.ids.includes(productId));
  const toggle = useFavorites((s) => s.toggle);
  const notify = useUi((s) => s.notify);

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? t.product.removeFavorite : t.product.addFavorite}: ${productName}`}
      onClick={() => {
        toggle(productId);
        notify(isFavorite ? t.product.removedFavorite : t.product.addedFavorite);
      }}
      className={cn(
        "group/fav grid place-items-center rounded-full border backdrop-blur-md transition-all duration-200 active:scale-90",
        size === "sm" ? "size-10" : "size-12",
        isFavorite
          ? "border-red bg-red text-white"
          : "border-white/15 bg-ink/55 text-paper hover:border-white/40 hover:bg-ink/75",
        className,
      )}
    >
      <Heart
        className={cn("transition-transform group-hover/fav:scale-110", size === "sm" ? "size-[1.1rem]" : "size-5")}
        fill={isFavorite ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
