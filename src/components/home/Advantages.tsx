"use client";

import { Fish, LayoutGrid, MousePointerClick } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/i18n";

const icons = [MousePointerClick, LayoutGrid, Fish];

export function Advantages() {
  const t = useT();
  return (
    <section aria-labelledby="advantages-title" className="container-nori">
      <h2 id="advantages-title" className="sr-only">
        {t.advantages.title}
      </h2>
      <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        {t.advantages.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <Reveal as="li" key={item.title} delay={i * 90} className="group relative bg-ink-2 p-7 md:p-9">
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-full border border-line text-red-bright transition-colors group-hover:border-red group-hover:bg-red group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span aria-hidden="true" className="font-display text-4xl text-paper/10">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2.5 text-mute">{item.text}</p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
