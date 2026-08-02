import type { MetadataRoute } from "next";
import { site } from "@/content/data";

/** Required by `output: "export"`: metadata routes must opt in to being static. */
export const dynamic = "force-static";

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
