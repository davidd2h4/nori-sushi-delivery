import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  compact?: boolean;
  /** Adds a hairline divider and 日本料理 next to the wordmark (wide screens only). */
  withTagline?: boolean;
}

/** NORI wordmark: a red double-bordered hanko seal followed by the name and descriptor. */
export function Logo({ className, compact = false, withTagline = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className="relative grid size-10 shrink-0 place-items-center rounded-[11px] bg-gradient-to-br from-red-bright to-red-deep text-white shadow-[0_8px_24px_-6px_rgb(215_25_32/0.7),inset_0_1px_0_rgb(255_255_255/0.3)]"
      >
        <span className="font-display text-[1.2rem] font-semibold leading-none">海</span>
        <span className="absolute inset-[3px] rounded-[8px] border border-white/40" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.7rem] font-semibold tracking-[0.22em] text-paper">NORI</span>
        {!compact && (
          <span className="mt-1 text-[0.55rem] font-semibold tracking-[0.46em] text-mute">SUSHI DELIVERY</span>
        )}
      </span>
      {withTagline && (
        <span aria-hidden="true" className="ml-1 hidden items-center gap-3 xl:flex">
          <span className="h-7 w-px bg-gradient-to-b from-transparent via-line-strong to-transparent" />
          <span lang="ja" className="font-display text-[0.95rem] leading-none tracking-[0.3em] text-paper/40">
            日本料理
          </span>
        </span>
      )}
    </span>
  );
}
