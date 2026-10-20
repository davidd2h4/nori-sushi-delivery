"use client";

import { useLocale } from "@/i18n";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Price({ value, className }: { value: number; className?: string }) {
  const locale = useLocale();
  return <span className={cn("whitespace-nowrap tabular-nums lining-nums", className)}>{formatPrice(value, locale)}</span>;
}
