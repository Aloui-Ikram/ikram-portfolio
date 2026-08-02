import type { MetadataRoute } from "next";
import { site } from "@/content/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
