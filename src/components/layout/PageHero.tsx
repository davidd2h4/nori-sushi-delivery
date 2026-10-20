import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  kanji?: string;
  children?: ReactNode;
  className?: string;
}

/** Editorial page header shared by inner pages. */
export function PageHero({ eyebrow, title, intro, kanji, children, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pb-10 pt-10 md:pb-14 md:pt-16", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 size-[28rem] rounded-full bg-red/[0.09] blur-3xl"
      />
      {kanji && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-6 hidden select-none font-display text-[11rem] leading-none text-paper/[0.035] md:block lg:right-10 lg:text-[14rem]"
        >
          {kanji}
        </span>
      )}
      <div className="container-nori relative">
        <p className="eyebrow mb-5 animate-fade-up">{eyebrow}</p>
        <h1 className="max-w-4xl animate-fade-up font-display text-h1 font-semibold text-balance [animation-delay:80ms]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl animate-fade-up text-base text-mute [animation-delay:160ms] md:text-lg">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
