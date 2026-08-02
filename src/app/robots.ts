import type { MetadataRoute } from "next";
import { site } from "@/content/data";

/** Required by `output: "export"`: metadata routes must opt in to being static. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
