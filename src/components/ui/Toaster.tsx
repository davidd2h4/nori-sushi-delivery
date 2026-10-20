"use client";

import { Check } from "lucide-react";
import { useUi } from "@/store/ui";

export function Toaster() {
  const toasts = useUi((s) => s.toasts);
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex max-w-md animate-toast-in items-center gap-3 rounded-full border border-line bg-surface/95 py-2.5 pl-2.5 pr-5 text-sm font-medium text-paper shadow-lift backdrop-blur"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-red text-white">
            <Check className="size-4" aria-hidden="true" />
          </span>
          <span className="line-clamp-2">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
