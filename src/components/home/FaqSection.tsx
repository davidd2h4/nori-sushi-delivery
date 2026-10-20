"use client";

import { Accordion } from "@/components/ui/Accordion";
import { useT } from "@/i18n";

export function FaqSection({ id = "faq" }: { id?: string }) {
  const t = useT();
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-nori scroll-mt-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-5">{t.home.faqEyebrow}</p>
          <h2 id={`${id}-title`} className="font-display text-h2 font-semibold text-balance">
            {t.home.faqTitle}
          </h2>
        </div>
        <Accordion items={t.faq.items} />
      </div>
    </section>
  );
}
