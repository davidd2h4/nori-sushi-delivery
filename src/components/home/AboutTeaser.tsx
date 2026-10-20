"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/i18n";

export function AboutTeaser() {
  const t = useT();
  return (
    <section aria-labelledby="about-teaser-title" className="container-nori">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/about/about-brush.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
          <div className="absolute -bottom-6 right-4 hidden w-44 overflow-hidden rounded-lg border-4 border-ink shadow-lift sm:block lg:-right-10 lg:w-56">
            <div className="relative aspect-square">
              <Image src="/images/about/about-matcha.webp" alt="" fill sizes="14rem" className="object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow mb-5">{t.home.aboutEyebrow}</p>
          <h2 id="about-teaser-title" className="font-display text-h2 font-semibold text-balance">
            {t.home.aboutTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper/75">{t.home.aboutText}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {t.about.values.map((value) => (
              <li key={value} className="rounded-full border border-line px-4 py-2 text-sm text-paper/85">
                {value}
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" variant="secondary" size="lg" className="mt-10">
            {t.home.aboutCta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
