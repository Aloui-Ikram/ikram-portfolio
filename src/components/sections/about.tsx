import {
  ArrowIcon,
  Card,
  ExternalLink,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { about, timeline, type TimelineEntry } from "@/content/data";

/**
 * The two timeline entries that describe where Ikram is right now.
 * Resolved by id so the copy below never drifts from data.ts.
 */
const CURRENT_IDS = ["8gears", "lfx"] as const;

const currentEntries: TimelineEntry[] = CURRENT_IDS.map((id) =>
  timeline.find((entry) => entry.id === id),
).filter((entry): entry is TimelineEntry => entry !== undefined);

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title={about.headline} />

      <div className="max-w-3xl">
        {about.paragraphs.map((paragraph, index) => (
          <Reveal key={index} delay={index * 0.06}>
            <p
              className={
                index === 0
                  ? "text-lg leading-8 text-balance text-[var(--fg)] sm:text-xl sm:leading-9"
                  : "mt-6 text-base leading-8 text-pretty text-[var(--fg-muted)] sm:text-[17px] sm:leading-9"
              }
            >
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 max-w-3xl sm:mt-14">
        <Card className="p-6 sm:p-7">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Currently
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
            Where my time goes right now, and what just wrapped.
          </p>

          <ul className="mt-5 divide-y divide-[var(--border)]">
            {currentEntries.map((entry) => (
              <li key={entry.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="text-sm font-medium text-[var(--fg)]">{entry.role}</h4>
                  <span className="font-mono text-xs whitespace-nowrap text-[var(--fg-muted)]">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {entry.orgUrl ? (
                    <ExternalLink href={entry.orgUrl} className="align-baseline">
                      {entry.org}
                      <ArrowIcon />
                    </ExternalLink>
                  ) : (
                    entry.org
                  )}
                  <span aria-hidden="true"> · </span>
                  {entry.location}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </Section>
  );
}
