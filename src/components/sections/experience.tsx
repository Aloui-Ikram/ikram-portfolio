import {
  AccentTag,
  ArrowIcon,
  Card,
  ExternalLink,
  Reveal,
  Section,
  SectionHeading,
  Tag,
} from "@/components/ui";
import { timeline, type TimelineEntry } from "@/content/data";

const KIND_LABEL: Record<TimelineEntry["kind"], string> = {
  work: "Work",
  education: "Education",
  research: "Research",
  mentorship: "CNCF Mentorship",
};

/** Roles worth accenting on the rail: paid/professional engagements. */
function isAccentKind(kind: TimelineEntry["kind"]): boolean {
  return kind === "work" || kind === "mentorship";
}

function TimelineNode({
  kind,
  isMostRecent,
}: {
  kind: TimelineEntry["kind"];
  isMostRecent: boolean;
}) {
  const accent = isAccentKind(kind);

  return (
    <span
      aria-hidden="true"
      className={[
        "absolute left-0 top-6 h-[11px] w-[11px] rounded-full border sm:top-7",
        accent
          ? "border-[var(--accent)] bg-[var(--accent)]"
          : "border-[var(--border-strong)] bg-[var(--bg)]",
        // Ring marks the current, most recent entry without adding motion.
        isMostRecent ? "shadow-[0_0_0_4px_var(--accent-soft)]" : "",
      ].join(" ")}
    />
  );
}

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const accent = isAccentKind(entry.kind);
  const KindBadge = accent ? AccentTag : Tag;

  return (
    // Only the first few entries can share a viewport, so cap the stagger there.
    <Reveal as="li" className="relative pl-7 sm:pl-10" delay={Math.min(index, 2) * 0.06}>
      <TimelineNode kind={entry.kind} isMostRecent={index === 0} />

      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-sm text-[var(--fg-subtle)]">{entry.period}</span>
          <KindBadge>{KIND_LABEL[entry.kind]}</KindBadge>
        </div>

        <h3 className="font-display mt-3 text-xl leading-snug font-semibold text-balance sm:text-2xl">
          {entry.role}
        </h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {entry.orgUrl ? (
            <ExternalLink href={entry.orgUrl} className="font-medium [overflow-wrap:anywhere]">
              {entry.org}
              <ArrowIcon className="shrink-0" />
            </ExternalLink>
          ) : (
            <span className="font-medium text-[var(--fg)] [overflow-wrap:anywhere]">
              {entry.org}
            </span>
          )}
          <span aria-hidden="true" className="text-[var(--border-strong)]">
            /
          </span>
          <span className="text-[var(--fg-muted)] [overflow-wrap:anywhere]">{entry.location}</span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">
          {entry.summary}
        </p>

        {entry.highlights.length > 0 ? (
          <ul role="list" className="mt-4 space-y-2.5">
            {entry.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.7rem] h-px w-3 shrink-0 bg-[var(--accent)]"
                />
                <span className="text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Card>
    </Reveal>
  );
}

/**
 * Server component on purpose. Every entry animates through <Reveal>, which is
 * its own client boundary, so this section ships no JavaScript of its own.
 */
export function Experience() {
  // Reverse a copy: `timeline` is chronological, recruiters read newest first.
  const entries = [...timeline].reverse();

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Experience & education"
        description="From a computer science degree in Algiers to cloud-native security work on Harbor. Listed most recent first."
        count="2020 – Present"
      />

      <div className="relative">
        {/* Static rail. The accent lives on the nodes, so the line itself needs
            no motion, and no scroll listener on the main thread. */}
        <div
          aria-hidden="true"
          className="absolute left-[5px] top-6 bottom-6 w-px bg-[var(--border)] sm:top-7"
        />

        <ol role="list" className="space-y-8 sm:space-y-10">
          {entries.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} index={index} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
