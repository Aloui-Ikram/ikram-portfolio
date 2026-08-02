import type { ReactNode } from "react";

/**
 * Scroll reveal: a server component on purpose.
 *
 * It only emits the `data-reveal="out"` marker; a single <RevealObserver />
 * flips them all to "in". That keeps ~60 revealed blocks out of the client
 * bundle entirely. The hidden state itself lives behind the `.js` class that
 * the inline head script adds before first paint, so with JavaScript disabled
 * nothing is ever hidden.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  return (
    <Tag
      data-reveal="out"
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Layout container for a set of <Reveal> children; each child animates itself. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  count,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  count?: string;
}) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3">
        <span className="section-rule h-px w-12 bg-[var(--accent)]" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </span>
        {count ? (
          <span className="ml-auto font-mono text-xs text-[var(--fg-muted)]">{count}</span>
        ) : null}
      </div>
      <h2 className="font-display mt-4 text-[2.1rem] leading-[1.12] font-semibold text-balance sm:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="font-display mt-4 max-w-2xl text-lg leading-snug text-[var(--fg-muted)] text-pretty sm:text-xl">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="sticker inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--fg-muted)]">
      {children}
    </span>
  );
}

export function AccentTag({ children }: { children: ReactNode }) {
  return (
    <span className="sticker inline-flex items-center rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--accent)]">
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={`card-surface rounded-xl transition-colors duration-200 hover:border-[var(--border-strong)] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center gap-1.5 text-[var(--accent)] transition-opacity hover:opacity-75 ${className}`}
    >
      {children}
    </a>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-3.5 w-3.5 ${className}`}
    >
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
