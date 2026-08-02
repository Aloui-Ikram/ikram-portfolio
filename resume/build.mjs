#!/usr/bin/env node
/**
 * Renders each resume variant to PDF with headless Chrome, then copies the
 * public-facing variant into public/ so the site's "Download CV" button serves it.
 *
 *   node resume/build.mjs
 *
 * Edit resume-*.html or resume.css and re-run; nothing else needs to change.
 */

import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");

const CHROME =
  process.env.CHROME_BIN ??
  ["google-chrome", "chromium", "chromium-browser", "google-chrome-stable"].find((bin) => {
    try {
      execFileSync("which", [bin], { stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  });

if (!CHROME) {
  console.error("No Chrome/Chromium binary found. Set CHROME_BIN to one.");
  process.exit(1);
}

const VARIANTS = [
  {
    src: "resume-security.html",
    out: "Ikram_Aloui_Resume.pdf",
    label: "Cloud-native / security engineering roles",
    public: true,
  },
  {
    src: "resume-ai.html",
    out: "Ikram_Aloui_Resume_SoftwareEngineer.pdf",
    label: "AI-training platforms (Mercor, Shipd) and general SWE roles",
    public: false,
  },
];

for (const variant of VARIANTS) {
  const input = join(here, variant.src);
  const output = join(here, variant.out);
  // Chrome writes crash dumps and profile data into its user-data-dir; keep it
  // out of the repo and delete it afterwards.
  const profile = mkdtempSync(join(tmpdir(), "resume-chrome-"));

  try {
    execFileSync(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=4000",
        `--user-data-dir=${profile}`,
        `--print-to-pdf=${output}`,
        `file://${input}`,
      ],
      { stdio: "pipe" },
    );
  } finally {
    rmSync(profile, { recursive: true, force: true });
  }

  const kb = (statSync(output).size / 1024).toFixed(0);
  console.log(`✓ ${variant.out}  (${kb} KB) · ${variant.label}`);

  if (variant.public) {
    const dest = join(projectRoot, "public", variant.out);
    copyFileSync(output, dest);
    console.log(`  → copied to public/${variant.out}`);
  }
}
