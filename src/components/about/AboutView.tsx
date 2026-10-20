"use client";

import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/i18n";
import { cn } from "@/lib/cn";

const sectionImages = [
  { src: "/images/about/about-nigiri-hands.webp", kanji: "心" },
  { src: "/images/about/about-lanterns.webp", kanji: "美" },
  { src: "/images/about/about-rolling.webp", kanji: "技" },
  { src: "/images/about/about-matcha.webp", kanji: "細" },
];

export function AboutView() {
  const t = useT();
  return (
    <>
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} intro={t.about.lead} kanji="海苔" />

      <div className="container-nori">
        <Reveal className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line sm:aspect-[21/9]">
          <Image
            src="/images/about/about-brush.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <ul className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-5 md:p-8">
            {t.about.values.map((v) => (
              <li key={v} className="rounded-full border border-paper/25 bg-ink/50 px-4 py-2 text-sm backdrop-blur">
                {v}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-24 flex flex-col gap-24 md:gap-32">
          {t.about.sections.map((section, i) => (
            <section
              key={section.title}
              aria-labelledby={`about-section-${i}`}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <Reveal className={cn("relative", i % 2 === 1 && "md:order-2")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                  <Image
                    src={sectionImages[i].src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-10 font-display text-[7rem] leading-none text-red/25 md:text-[9rem]",
                    i % 2 === 1 ? "-left-2 md:-left-10" : "-right-2 md:-right-10",
                  )}
                >
                  {sectionImages[i].kanji}
                </span>
              </Reveal>
              <Reveal delay={100}>
                <p className="font-display text-xl text-red-bright">0{i + 1}</p>
                <h2 id={`about-section-${i}`} className="mt-3 font-display text-h2 font-semibold">
                  {section.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-paper/75">{section.text}</p>
              </Reveal>
            </section>
          ))}
        </div>

        <Reveal className="relative mt-28 overflow-hidden rounded-2xl border border-line bg-ink-2 px-6 py-16 text-center md:px-16 md:py-24">
          <div aria-hidden="true" className="bg-seigaiha absolute inset-0 opacity-[0.05]" />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/15 blur-3xl" />
          <figure className="relative">
            <blockquote className="mx-auto max-w-3xl font-display text-h2 font-semibold italic text-balance">
              «{t.about.quote}»
            </blockquote>
            <figcaption className="mt-6 text-sm uppercase tracking-[0.25em] text-mute">{t.about.quoteNote}</figcaption>
          </figure>
          <ButtonLink href="/menu" size="lg" className="relative mt-10">
            {t.common.viewMenu}
          </ButtonLink>
        </Reveal>

        <p className="mt-8 text-center text-sm text-mute">{t.about.demoNote}</p>
      </div>
    </>
  );
}
