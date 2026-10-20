"use client";

import { Minus, Plus } from "lucide-react";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";
import { MAX_QUANTITY } from "@/store/cart";

interface QuantityStepperProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  size?: "sm" | "md";
  label?: string;
  className?: string;
  /** Allow going below 1 (the parent then removes the line). */
  allowZero?: boolean;
}

export function QuantityStepper({
  value,
  onDecrement,
  onIncrement,
  size = "md",
  label,
  className,
  allowZero = true,
}: QuantityStepperProps) {
  const t = useT();
  const btn = cn(
    "grid place-items-center rounded-full text-paper transition-colors hover:bg-white/10 disabled:opacity-35 disabled:hover:bg-transparent",
    size === "sm" ? "size-9" : "size-11",
  );
  return (
    <div
      role="group"
      aria-label={label ?? t.product.quantity}
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-ink-2 p-0.5",
        className,
      )}
    >
      <button
        type="button"
        className={btn}
        onClick={onDecrement}
        disabled={!allowZero && value <= 1}
        aria-label={t.product.decrease}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <output
        aria-live="polite"
        className={cn("min-w-8 text-center font-semibold tabular-nums", size === "sm" ? "text-sm" : "text-base")}
      >
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={onIncrement}
        disabled={value >= MAX_QUANTITY}
        aria-label={t.product.increase}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
