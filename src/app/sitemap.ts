import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/menu", "/promotions", "/about", "/delivery", "/contacts", "/favorites", "/credits"];
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "weekly" as const })),
    ...products.map((p) => ({ url: `${siteUrl}/menu/${p.slug}`, changeFrequency: "monthly" as const })),
  ];
}
