"use client";

import { CreditCard, Info, Truck } from "lucide-react";
import { FaqSection } from "@/components/home/FaqSection";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/i18n";

export function DeliveryView() {
  const t = useT();
  const blocks = [
    { icon: Truck, title: t.delivery.deliveryTitle, items: t.delivery.deliveryItems },
    { icon: CreditCard, title: t.delivery.paymentTitle, items: t.delivery.paymentItems },
  ];

  return (
    <>
      <PageHero eyebrow={t.delivery.eyebrow} title={t.delivery.title} kanji="配達">
        <p className="mt-6 flex max-w-2xl items-start gap-3 rounded-lg border border-warm/30 bg-warm/[0.06] p-4 text-paper/85">
          <Info className="mt-0.5 size-5 shrink-0 text-warm" aria-hidden="true" />
          {t.delivery.intro}
        </p>
      </PageHero>

      <div className="container-nori">
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.delivery.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 70} className="relative bg-ink-2 p-7">
              <span aria-hidden="true" className="font-display text-5xl text-red-bright/80">
                0{i + 1}
              </span>
              <h2 className="mt-4 text-lg font-semibold">{step.title}</h2>
              <p className="mt-2 text-mute">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {blocks.map(({ icon: Icon, title, items }) => (
            <Reveal key={title} as="section" className="rounded-xl border border-line bg-ink-2 p-7 md:p-10">
              <span className="grid size-12 place-items-center rounded-full bg-red/15 text-red-bright">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-h3 font-semibold">{title}</h2>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-paper/80">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-red-bright" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <FaqSection />
      </div>
    </>
  );
}
