import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Demo project: keep it out of search engines.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
