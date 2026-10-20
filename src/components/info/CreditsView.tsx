"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import credits from "@/data/credits.json";
import { useT } from "@/i18n";

export function CreditsView() {
  const t = useT();
  return (
    <>
      <PageHero eyebrow={t.credits.eyebrow} title={t.credits.title} intro={t.credits.intro} />
      <div className="container-nori">
        <p className="mb-6 text-sm text-mute">
          Unsplash License:{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-paper underline underline-offset-4 hover:text-red-bright"
          >
            unsplash.com/license
          </a>
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {credits.map((c) => (
            <li key={c.file} className="flex min-w-0 items-center gap-4 rounded-lg border border-line bg-ink-2 p-3">
              <span className="relative size-16 shrink-0 overflow-hidden rounded-md bg-surface">
                <Image src={c.file} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-mute">{c.file.split("/").pop()}</span>
                <span className="block truncate font-semibold">{c.author}</span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-mute hover:text-red-bright"
                >
                  {c.source} <ExternalLink className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">({c.author})</span>
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
