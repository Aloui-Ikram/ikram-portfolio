import {
  ArrowIcon,
  Card,
  ExternalLink,
  Reveal,
  RevealGroup,
  Section,
  SectionHeading,
  Tag,
} from "@/components/ui";
import { research } from "@/content/data";

export function Research() {
  return (
    <Section id="research">
      <SectionHeading
        eyebrow="Research"
        title="Technical Reports & Applied Research"
        description="Solo-authored technical reports. Every lab was built from scratch on self-managed Kubernetes clusters, then validated adversarially rather than merely deployed."
        count={`${research.length} reports`}
      />

      <RevealGroup className="flex flex-col gap-6 sm:gap-8">
        {research.map((report, index) => (
          <Reveal key={report.id} delay={index * 0.08}>
            <Card as="article" className="p-6 sm:p-8">
              <div className="flex gap-4 sm:gap-6">
                {/* Decorative index; announced content lives in the heading below. */}
                <span
                  aria-hidden="true"
                  className="w-8 shrink-0 pt-0.5 font-mono text-2xl font-semibold leading-none tabular-nums text-[var(--fg-subtle)] sm:w-12 sm:text-3xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-[var(--fg-subtle)]">
                    <span className="font-medium">{report.context}</span>
                    <span aria-hidden="true">/</span>
                    <span>{report.date}</span>
                  </p>

                  <h3 className="font-display mt-3 text-xl leading-snug font-semibold text-balance sm:text-2xl">
                    {report.title}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-[var(--fg-muted)] text-pretty">
                    {report.summary}
                  </p>

                  <div className="mt-6">
                    <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg-muted)]">
                      Key findings
                    </h4>
                    <ul className="mt-3 flex list-none flex-col gap-2.5">
                      {report.findings.map((finding) => (
                        <li key={finding} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]"
                          />
                          <span className="text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">
                            {finding}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ul className="mt-6 flex list-none flex-wrap gap-2">
                    {report.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>

                  <ExternalLink
                    href={report.url}
                    label={`Read the report: ${report.title} (opens in a new tab)`}
                    className="mt-6 text-sm font-medium"
                  >
                    Read the report
                    <ArrowIcon />
                  </ExternalLink>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
