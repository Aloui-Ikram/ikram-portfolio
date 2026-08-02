import type { ReactElement } from "react";

import { EnvelopeMascot } from "@/components/decor";
import { ArrowIcon, Card, Reveal, Section, SectionHeading } from "@/components/ui";
import { site } from "@/content/data";

type IconProps = { className?: string };

function MailIcon({ className = "" }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4 8l7.06 4.7a1.75 1.75 0 001.88 0L20 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.94 5.5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.98h3.14V21H3.4V8.98zm5.62 0h3.01v1.64h.04c.42-.79 1.44-1.63 2.97-1.63 3.18 0 3.77 2.09 3.77 4.81V21h-3.14v-5.53c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V21H9.02V8.98z" />
    </svg>
  );
}

function GitHubIcon({ className = "" }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0012 2z" />
    </svg>
  );
}

function DownloadIcon({ className = "" }: IconProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 3.5v11m0 0l-4-4m4 4l4-4M4.5 17.5v1a2 2 0 002 2h11a2 2 0 002-2v-1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Channel = {
  id: string;
  label: string;
  value: string;
  href: string;
  /** mailto: must open in place; profile links open in a new tab. */
  external: boolean;
  Icon: (props: IconProps) => ReactElement;
};

/**
 * Email sits in the middle deliberately: it is the primary contact channel, it
 * takes the centre of the three-column row, and the envelope mascot peeks over
 * that middle card.
 */
const channels: Channel[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    value: site.linkedinHandle,
    href: site.linkedin,
    external: true,
    Icon: LinkedInIcon,
  },
  {
    id: "email",
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    Icon: MailIcon,
  },
  {
    id: "github",
    label: "GitHub",
    value: `@${site.githubHandle}`,
    href: site.github,
    external: true,
    Icon: GitHubIcon,
  },
];

/**
 * Gmail's compose window rather than a `mailto:`. A `mailto:` is a silent no-op
 * for any visitor whose machine has no default mail client registered, which is
 * common on Linux desktops and locked-down work laptops. This always opens a
 * composer addressed to me.
 */
const composeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  site.email,
)}&su=${encodeURIComponent("Hello Ikram, reaching out from your portfolio")}`;

export function Contact() {
  return (
    <Section id="contact">
      {/* SectionHeading is left-aligned by default; this section centres it. */}
      <div className="text-center [&>div>div]:justify-center [&_p]:mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          description="I'm open to cloud-native security and open-source engineering work, and always happy to talk supply-chain security, Harbor, or anything at the edge of cryptography and operations. My inbox is genuinely open."
        />
      </div>

      <div className="mascot-host relative mx-auto max-w-3xl">
        {/* Sits behind the cards: their surface is opaque, so it clips her lower
            half and the hands land on the top edge. */}
        <span className="pointer-events-none absolute -top-[60px] left-1/2 z-0 hidden -translate-x-1/2 sm:block">
          <EnvelopeMascot size={74} />
        </span>

        <ul className="relative z-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {channels.map((channel, index) => (
            <Reveal as="li" key={channel.id} delay={index * 0.06} className="h-full">
              <Card className="group h-full">
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-full min-h-[44px] flex-col items-center justify-center gap-2 rounded-xl px-4 py-6 text-center"
                >
                  <channel.Icon className="h-5 w-5 text-[var(--fg-muted)] transition-colors duration-200 group-hover:text-[var(--accent)]" />
                  <span className="text-sm font-medium text-[var(--fg)]">
                    {channel.label}
                  </span>
                  <span className="font-mono text-[13px] break-words text-[var(--fg-muted)]">
                    {channel.value}
                  </span>
                </a>
              </Card>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.18} className="mt-8 sm:mt-10">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={composeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-fg)] transition-opacity duration-200 hover:opacity-90 sm:w-auto"
            >
              <MailIcon className="h-4 w-4" />
              Email me
            </a>
            <a
              href={site.resumePath}
              download
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-6 py-3 text-sm font-medium text-[var(--fg)] transition-colors duration-200 hover:bg-[var(--bg-subtle)] sm:w-auto"
            >
              <DownloadIcon className="h-4 w-4 text-[var(--fg-muted)]" />
              Download CV
            </a>
          </div>

          <p className="mt-8 text-center text-sm leading-relaxed text-[var(--fg-muted)]">
            Based in {site.location}
            <span aria-hidden="true"> · </span>
            Working remotely.
          </p>

          <p className="mt-2 text-center text-sm text-[var(--fg-muted)]">
            Or browse the code first:{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--accent)] transition-opacity hover:opacity-75"
            >
              github.com/{site.githubHandle}
              <ArrowIcon />
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
