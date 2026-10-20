import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  text: string;
  action?: ReactNode;
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
}

export function EmptyState({ icon, title, text, action, className, titleAs: Title = "h2" }: EmptyStateProps) {
  return (
    <div className={cn("relative flex flex-col items-center px-6 py-14 text-center", className)}>
      <div className="relative mb-7 grid size-28 place-items-center">
        <span aria-hidden="true" className="absolute inset-0 rounded-full border border-line" />
        <span aria-hidden="true" className="absolute inset-3 rounded-full border border-dashed border-red/40" />
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-red/10 blur-2xl" />
        <span className="relative text-red-bright">{icon}</span>
      </div>
      <Title className="font-display text-h3 font-semibold text-paper">{title}</Title>
      <p className="mt-3 max-w-sm text-mute">{text}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
