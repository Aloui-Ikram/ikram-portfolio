"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useReducedMotion,
} from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigation, site } from "@/content/data";

const MOBILE_PANEL_ID = "site-nav-mobile-panel";

/** Same easing curve as the shared primitives, so the site animates as one system. */
const EASE = [0.16, 1, 0.3, 1] as const;

/** Height of the sticky bar; the panel hangs off the bottom of it. */
const BAR = "h-16";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
      {open ? (
        <path
          d="M5 5l10 10M15 5L5 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M3 6h14M3 10h14M3 14h9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        d="M8 3v7m0 0L5 7m3 3l3-3M3.5 12.5h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the panel and hands focus back to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Lock background scrolling only while the panel is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Growing past the lg breakpoint reveals the full nav, so drop the panel.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-[var(--accent-border)] focus:bg-[var(--bg-elevated)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--accent)]"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
          solid
            ? "border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-5xl items-center gap-3 px-5 sm:px-8 ${BAR}`}
        >
          <a
            href="#top"
            className="group flex shrink-0 items-baseline gap-1.5 rounded-md"
            aria-label={`${site.name}, back to top`}
          >
            <span className="wiggle-on-hover inline-block text-[15px] font-semibold tracking-tight text-[var(--fg)]">
              {site.name}
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-xs text-[var(--accent)] transition-opacity group-hover:opacity-60"
            >
              /
            </span>
          </a>

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="nav-link rounded-md px-2.5 py-1.5 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-4">
            <a
              href={site.resumePath}
              download
              className="hidden items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90 sm:inline-flex"
            >
              <DownloadIcon />
              Resume
            </a>

            <ThemeToggle />

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={MOBILE_PANEL_ID}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)] lg:hidden"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        {/* `m` + LazyMotion ships only the DOM animation features this panel
            actually uses, not the whole motion bundle. `strict` makes any stray
            `motion.*` inside throw at dev time rather than silently re-adding it. */}
        <LazyMotion features={domAnimation} strict>
          <AnimatePresence initial={false}>
            {open ? (
              <m.div
                key="mobile-panel"
                id={MOBILE_PANEL_ID}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--border)] bg-[var(--bg)] lg:hidden"
              >
                <nav
                  aria-label="Mobile"
                  className="mx-auto w-full max-w-5xl px-5 pb-6 pt-3 sm:px-8"
                >
                  <ul className="flex flex-col">
                    {navigation.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between rounded-lg px-2 py-3 text-base text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]"
                        >
                          {item.label}
                          <span
                            aria-hidden="true"
                            className="font-mono text-[11px] text-[var(--fg-muted)]"
                          >
                            {item.href}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={site.resumePath}
                    download
                    onClick={() => setOpen(false)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition-opacity hover:opacity-90 sm:hidden"
                  >
                    <DownloadIcon />
                    Resume
                  </a>
                </nav>
              </m.div>
            ) : null}
          </AnimatePresence>
        </LazyMotion>
      </header>
    </>
  );
}

const footerLinks: { label: string; href: string }[] = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="space-y-1.5">
          <p className="text-sm text-[var(--fg-muted)]">&copy; 2026 {site.name}</p>
          <p className="text-sm text-[var(--fg-muted)]">
            Built with Next.js and Tailwind CSS.
          </p>
          <p className="font-mono text-[11px] text-[var(--fg-muted)]">
            source on github: {site.githubHandle}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLinks.map((link) => {
              const isMail = link.href.startsWith("mailto:");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="rounded-md text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
