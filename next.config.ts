import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * Pages serves this repo from https://<user>.github.io/<repo>, so `basePath`
 * has to match the repo name. Every route in this site is prerendered, so
 * `output: "export"` loses nothing.
 *
 * Moving to a root domain (a custom domain, or back to Vercel) means deleting
 * `basePath` here and updating BASE_PATH and `url` in src/content/data.ts.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ikram-portfolio",
  // Emit `about/index.html` rather than `about.html`, which is what static
  // hosts expect when resolving a directory URL.
  trailingSlash: true,
};

export default nextConfig;
