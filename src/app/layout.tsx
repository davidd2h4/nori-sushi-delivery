import "@fontsource-variable/manrope";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopBar } from "@/components/layout/TopBar";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NORI — Sushi Delivery | Японська кухня",
    template: "%s — NORI Sushi Delivery",
  },
  description:
    "NORI — демонстраційний сайт преміальної доставки японської кухні: роли, нігірі, гункани, сети, супи та десерти.",
  applicationName: "NORI Sushi Delivery",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    alternateLocale: ["en_US"],
    siteName: "NORI Sushi Delivery",
    title: "NORI — Sushi Delivery",
    description: "Японський смак. Новий рівень. Демонстраційний сайт доставки суші.",
    images: [{ url: "/images/promo/promo-stack.webp", width: 1400, height: 900, alt: "NORI" }],
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          <SkipLink />
          <TopBar />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
