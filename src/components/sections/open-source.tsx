"use client";

import { useState } from "react";
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
import {
  contributions,
  type PullRequest,
  type RepoGroup,
} from "@/content/data";

// Deliberately no tallies here: the work speaks for itself, and a scoreboard
// invites the reader to judge the number rather than read the contributions.
const description =
  "Merged pull requests in Harbor, the CNCF-graduated container registry, and across its " +
  "ecosystem, including security fixes backported to the v2.15.0 release branch. Reviewed by " +
  "maintainers and running in production, not side projects. The public ones are listed below.";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
    >
      <path
        d="M4 6.5L8 10.5L12 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The "money line" of every contribution: what it actually changed. */
function ImpactNote({ children }: { children: string }) {
  return (
    <div className="mt-3 rounded-lg bg-[var(--accent-soft)] px-3 py-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent)]">
        Impact
      </span>
      <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">{children}</p>
    </div>
  );
}

function PullRequestCard({
  pr,
  delay,
  className,
}: {
  pr: PullRequest;
  delay: number;
  className?: string;
}) {
  const featured = pr.featured === true;

  return (
    <Reveal as="li" delay={delay} className={className}>
      <Card className="relative overflow-hidden p-5 pl-6 sm:p-6 sm:pl-7">
        {/* Left rail instead of a tinted border: the global `*` border-color rule wins over utilities. */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-[3px] ${
            featured ? "bg-[var(--accent)]" : "bg-[var(--border-strong)]"
          }`}
        />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <ExternalLink
            href={pr.url}
            label={`Pull request #${pr.number}: ${pr.title}`}
            className="font-mono text-sm font-medium"
          >
            #{pr.number}
            <ArrowIcon />
          </ExternalLink>
          {featured ? <AccentTag>Highlighted</AccentTag> : null}
        </div>

        <h4 className="mt-2.5 text-base font-medium leading-snug text-[var(--fg)] break-words text-pretty">
          {pr.title}
        </h4>

        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">{pr.what}</p>

        <ImpactNote>{pr.impact}</ImpactNote>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {pr.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </Card>
    </Reveal>
  );
}

function RepoGroupBlock({ group, isFirst }: { group: RepoGroup; isFirst: boolean }) {
  const [expanded, setExpanded] = useState(false);

  const featured = group.prs.filter((pr) => pr.featured);
  const rest = group.prs.filter((pr) => !pr.featured);
  // Every PR is always rendered so crawlers and no-JS visitors see the full
  // list; collapsing only hides them with CSS that is itself gated on `.js`.
  const all = [...featured, ...rest];

  const listId = `open-source-${group.repo.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  return (
    <div className={isFirst ? "" : "border-t border-[var(--border)] pt-12 sm:pt-14"}>
      <Reveal>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="min-w-0 font-mono text-sm font-medium break-words sm:text-base">
            <ExternalLink href={group.url} label={`${group.repo} on GitHub`}>
              {group.repo}
              <ArrowIcon />
            </ExternalLink>
          </h3>
          {group.badge ? <AccentTag>{group.badge}</AccentTag> : null}
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--fg-muted)] text-pretty">
          {group.blurb}
        </p>
      </Reveal>

      <ul id={listId} className="mt-6 space-y-3 sm:mt-7 sm:space-y-4">
        {all.map((pr, index) => (
          <PullRequestCard
            key={pr.number}
            pr={pr}
            delay={Math.min(index, 4) * 0.05}
            className={!expanded && index >= featured.length ? "pr-collapsed" : undefined}
          />
        ))}
      </ul>

      {rest.length > 0 ? (
        <Reveal>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={listId}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3.5 py-2 font-mono text-xs text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]"
          >
            {expanded ? "Show fewer" : "Show more pull requests"}
            <ChevronIcon open={expanded} />
          </button>
        </Reveal>
      ) : null}
    </div>
  );
}

export function OpenSource() {
  return (
    <Section id="open-source">
      <SectionHeading
        eyebrow="Open Source"
        title="Merged contributions"
        description={description}
      />

      <div className="space-y-12 sm:space-y-14">
        {contributions.map((group, index) => (
          <RepoGroupBlock key={group.repo} group={group} isFirst={index === 0} />
        ))}
      </div>

    </Section>
  );
}
