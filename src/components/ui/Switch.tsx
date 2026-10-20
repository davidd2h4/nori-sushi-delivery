"use client";

import { cn } from "@/lib/cn";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
}

export function Switch({ checked, onChange, label, id }: SwitchProps) {
  return (
    <div className="inline-flex items-center gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-200",
          checked ? "border-red bg-red" : "border-line-strong bg-surface",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-0.5 top-1/2 size-5.5 -translate-y-1/2 rounded-full bg-paper shadow transition-transform duration-200",
            checked && "translate-x-5",
          )}
        />
      </button>
      <label htmlFor={id} className="select-none text-sm font-semibold text-paper/90">
        {label}
      </label>
    </div>
  );
}
