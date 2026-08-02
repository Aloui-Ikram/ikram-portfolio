import { Mascot, Sticker } from "@/components/decor";
import { about, site } from "@/content/data";

/**
 * Server component on purpose. The entrance animation is pure CSS (see the
 * `[data-hero-item]` keyframes in app/globals.css) so the hero, including the
 * <h1> that is the LCP element, paints in the very first frame with no JS at all.
 */

const buttonBase =
  "squish inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-[background-color,border-color,color,opacity] duration-200";

/** Decorative twinkles. Offsets and delays are hand-placed so they read as
 *  scattered rather than evenly spaced. */
const SPARKLES = [
  { top: "12%", left: "6%", size: 13, delay: "0s" },
  { top: "26%", left: "58%", size: 9, delay: "1.1s" },
  { top: "68%", left: "44%", size: 11, delay: "2.2s" },
  { top: "40%", left: "88%", size: 15, delay: "0.6s" },
  { top: "80%", left: "14%", size: 8, delay: "1.7s" },
];

function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SPARKLES.map((s) => (
        <svg
          key={`${s.top}-${s.left}`}
          viewBox="0 0 24 24"
          className="sparkle absolute text-[var(--accent)]"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        >
          <path
            d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12C7 10.8 11.4 6.4 12 0Z"
            fill="currentColor"
          />
        </svg>
      ))}

      {/* Stickers, kept to the outer margins so they never crowd the headline.
          Hidden below lg, where there simply is not room beside the text. */}
      <div className="hidden lg:block">
        <span className="absolute top-[18%] right-[8%] text-[var(--accent)] opacity-70">
          <Sticker name="heart" size={26} tilt={-14} delay="0.4s" />
        </span>
        {/* Left side on purpose: at right-[16%] this sat on top of the mascot. */}
        <span className="absolute top-[34%] left-[3%] text-[var(--accent-2)] opacity-60">
          <Sticker name="flower" size={30} tilt={10} delay="1.6s" />
        </span>
        <span className="absolute bottom-[16%] left-[4%] text-[var(--accent)] opacity-55">
          <Sticker name="bow" size={28} tilt={-8} delay="2.4s" />
        </span>
        <span className="absolute top-[8%] left-[46%] text-[var(--accent-2)] opacity-50">
          <Sticker name="cloud" size={26} tilt={6} delay="3.1s" />
        </span>
      </div>
    </div>
  );
}

const primaryButton = `${buttonBase} bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90`;

const outlineButton = `${buttonBase} border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--fg)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-subtle)]`;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M3.6 1.6a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM2.2 6.1h2.8v8.3H2.2V6.1Zm4.6 0h2.7v1.14h.04c.38-.68 1.3-1.4 2.67-1.4 2.85 0 3.38 1.79 3.38 4.12v4.44h-2.82v-3.94c0-.94-.02-2.15-1.35-2.15-1.36 0-1.57 1.02-1.57 2.08v4.01H6.8V6.1Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M8 2.5v7.5m0 0L5 7m3 3 3-3M2.75 12.5v.75a1 1 0 0 0 1 1h8.5a1 1 0 0 0 1-1v-.75" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
    >
      <path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 1 0-9 0C3.5 9.8 8 14 8 14Z" />
      <circle cx="8" cy="6.5" r="1.6" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[85svh] w-full items-center overflow-hidden py-20 sm:min-h-[88svh] sm:py-28"
    >
      {/* Decorative background layers: static, GPU-cheap, never interactive. */}
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="accent-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <Sparkles />

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div data-hero-item className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="h-px w-8 bg-[var(--accent)]" aria-hidden="true" />
          <span className="font-mono text-xs tracking-[0.2em] text-[var(--accent)] uppercase">
            {site.title}
          </span>
          <span className="hidden h-3 w-px bg-[var(--border-strong)] sm:block" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-muted)]">
            <PinIcon />
            {site.location}
          </span>
        </div>

        <h1
          data-hero-item
          className="font-display text-gradient mt-5 text-[3.25rem] leading-[1.04] font-medium text-balance sm:text-[5rem] lg:text-[6rem]"
        >
          {site.name}
        </h1>

        <p
          data-hero-item
          className="font-display mt-5 max-w-2xl text-xl leading-snug text-pretty text-[var(--fg-muted)] sm:mt-6 sm:text-[1.45rem]"
        >
          {site.tagline}
        </p>

        <div data-hero-item className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          <a href="#open-source" className={primaryButton}>
            View open source
          </a>
          <a href={site.resumePath} download className={outlineButton}>
            <DownloadIcon />
            Download CV
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={outlineButton}
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={outlineButton}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>

        <div data-hero-item className="mascot-host relative mt-12 sm:mt-16">
          {/* Mascot perches on the top edge of the stat strip. Hidden on small
              screens, where it would overlap the cards rather than sit on them. */}
          <span className="pointer-events-none absolute -top-[72px] right-6 hidden sm:block">
            <Mascot size={78} />
          </span>

          {/* gap-px over a border-coloured surface draws the hairline separators. */}
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] shadow-[var(--shadow)] sm:grid-cols-3">
            {about.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col bg-[var(--bg-elevated)] bg-[image:linear-gradient(180deg,var(--sheen),transparent_45%)] px-4 py-5 sm:px-5 sm:py-6"
              >
                <dd className="font-display order-first text-3xl text-[var(--accent)] sm:text-4xl">
                  {fact.value}
                </dd>
                <dt className="mt-1.5 font-mono text-[11px] tracking-[0.14em] text-[var(--fg-muted)] uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-xs leading-relaxed text-[var(--fg-muted)]">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
