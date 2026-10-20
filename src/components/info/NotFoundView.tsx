"use client";

import { ButtonLink } from "@/components/ui/Button";
import { useT } from "@/i18n";

export function NotFoundView() {
  const t = useT();
  return (
    <section className="container-nori relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span aria-hidden="true" className="font-display text-[9rem] leading-none text-red/30 md:text-[12rem]">
        404
      </span>
      <h1 className="-mt-6 font-display text-h2 font-semibold">{t.notFound.title}</h1>
      <p className="mt-4 max-w-md text-mute">{t.notFound.text}</p>
      <ButtonLink href="/menu" size="lg" className="mt-10">
        {t.common.toMenu}
      </ButtonLink>
    </section>
  );
}
