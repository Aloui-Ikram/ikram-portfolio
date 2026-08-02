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
import { projects, type Project } from "@/content/data";

/** GitHub URLs point at source; everything else here is a written report PDF. */
function linkLabel(url: string): string {
  return url.includes("github.com") ? "View repository" : "Read the report";
}

const securityProjects: Project[] = projects
  .filter((project) => project.era === "security")
  // Featured first, original data order preserved within each group.
  .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

const webProjects: Project[] = projects.filter((project) => project.era === "web");

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M8 1.2l2.02 4.09 4.51.66-3.27 3.18.78 4.5L8 11.5l-4.04 2.13.78-4.5L1.47 5.95l4.51-.66L8 1.2z" />
    </svg>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Built From Scratch"
        description="Tooling and lab work outside the upstream repositories, including scanner adapters, bridges, and the platforms I built to prove a security design actually holds."
        count={`${securityProjects.length} projects`}
      />

      <RevealGroup className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {securityProjects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.06} className="flex">
            <Card as="article" className="flex w-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 font-mono text-base font-semibold tracking-tight break-words">
                  {project.name}
                </h3>

                {typeof project.stars === "number" && project.stars > 0 ? (
                  <p className="flex shrink-0 items-center gap-1 font-mono text-xs text-[var(--fg-muted)] tabular-nums">
                    <StarIcon />
                    {project.stars}
                    <span className="sr-only"> GitHub stars</span>
                  </p>
                ) : null}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">
                {project.description}
              </p>

              <ul className="mt-4 flex list-none flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>

              {/* mt-auto keeps the link on the card's baseline across a grid row. */}
              <ExternalLink
                href={project.url}
                label={`${linkLabel(project.url)}: ${project.name} (opens in a new tab)`}
                className="mt-auto self-start pt-5 text-sm font-medium sm:pt-6"
              >
                {linkLabel(project.url)}
                <ArrowIcon />
              </ExternalLink>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>

      {webProjects.length > 0 ? (
        <Reveal className="mt-14 sm:mt-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]">
            Earlier work
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">
            Full-stack projects from my B.Sc. years, before I moved into security (kept here as
            context, not as current work).
          </p>

          <ul className="mt-5 list-none divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {webProjects.map((project) => (
              <li
                key={project.name}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <div className="min-w-0 sm:flex-1">
                  <h4 className="font-mono text-sm font-medium break-words">{project.name}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">
                    {project.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--fg-muted)]">
                    {project.tech.join(" · ")}
                  </p>
                </div>

                <ExternalLink
                  href={project.url}
                  label={`${linkLabel(project.url)}: ${project.name} (opens in a new tab)`}
                  className="shrink-0 text-sm"
                >
                  {linkLabel(project.url)}
                  <ArrowIcon />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </Section>
  );
}
