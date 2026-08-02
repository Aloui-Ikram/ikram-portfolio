import type { ReactNode } from "react";

import {
  ArrowIcon,
  Card,
  ExternalLink,
  Reveal,
  RevealGroup,
  Section,
  SectionHeading,
} from "@/components/ui";
import { certifications, languages, skills } from "@/content/data";

/**
 * Slightly larger than the shared <Tag> so a dense list of ~55 items stays
 * comfortably readable rather than reading as decoration.
 */
function SkillChip({ children }: { children: ReactNode }) {
  return (
    <li className="sticker inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-1 font-mono text-xs leading-5 text-[var(--fg-muted)] hover:border-[var(--accent-border)] hover:text-[var(--accent)]">
      {children}
    </li>
  );
}

function BlockHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg)]">
      {children}
    </h3>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Tools and technologies"
        description="What I actually work in: the supply-chain, cloud-native, and security tooling behind the contributions above."
        count={`${skills.length} areas`}
      />

      {/* CSS multi-column balances the groups by height, so no column is left
          with a single orphaned block the way a fixed grid would. */}
      <RevealGroup className="columns-1 gap-x-8 sm:columns-2 lg:columns-3">
        {skills.map((group) => (
          <Reveal key={group.name} className="mb-8 break-inside-avoid">
            <h3 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg)]">
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
              />
              {group.name}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </ul>
          </Reveal>
        ))}
      </RevealGroup>

      <RevealGroup className="mt-6 grid gap-6 md:mt-10 md:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <Card className="h-full p-5 sm:p-6">
            <BlockHeading>Certifications &amp; training</BlockHeading>
            <ul className="mt-4 space-y-4">
              {certifications.map((cert) => (
                <li key={cert.url}>
                  <ExternalLink
                    href={cert.url}
                    className="items-start gap-1.5 text-sm font-medium leading-snug"
                  >
                    <span className="text-pretty">{cert.name}</span>
                    <ArrowIcon className="mt-0.5 shrink-0" />
                  </ExternalLink>
                  <p className="mt-1 text-xs text-[var(--fg-muted)]">
                    {cert.issuer} · {cert.date}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="h-full p-5 sm:p-6">
            <BlockHeading>Languages</BlockHeading>
            <dl className="mt-4 space-y-3">
              {languages.map((language) => (
                <div
                  key={language.name}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt className="text-sm text-[var(--fg)]">{language.name}</dt>
                  <dd className="font-mono text-xs text-[var(--fg-muted)]">
                    {language.level}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </RevealGroup>
    </Section>
  );
}
