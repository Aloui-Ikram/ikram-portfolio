import {
  ArrowIcon,
  Card,
  Reveal,
  RevealGroup,
  Section,
  SectionHeading,
  Tag,
} from "@/components/ui";
import { blog } from "@/content/data";

export function Writing() {
  return (
    <Section id="writing">
      <SectionHeading
        eyebrow="Writing"
        title="Technical writing"
        description="Long-form engineering posts published on the container-registry.com company blog and the Harbor Satellite project blog. Deployment architectures and hardening work written up as guides other engineers can follow."
        count={`${blog.length} posts`}
      />

      <RevealGroup className="flex flex-col gap-6 sm:gap-8">
        {blog.map((post, index) => (
          <Reveal key={post.url} delay={index * 0.08}>
            {/*
              Link-overlay pattern: the anchor's ::after covers the whole card, so
              the card is entirely clickable while the accessible name stays the
              title. `has-[a:focus-visible]` moves the focus ring onto the card.
            */}
            <Card
              as="article"
              className="group relative p-6 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-[3px] has-[a:focus-visible]:outline-[var(--accent)] sm:p-8"
            >
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-[var(--fg-subtle)]">
                <span className="[overflow-wrap:anywhere]">{post.publication}</span>
                <span aria-hidden="true">/</span>
                <span>{post.date}</span>
              </p>

              <h3 className="font-display mt-3 text-xl leading-snug font-semibold text-balance sm:text-2xl">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none group-hover:text-[var(--accent)] group-focus-within:text-[var(--accent)]"
                >
                  {post.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[var(--fg-muted)] text-pretty">
                {post.summary}
              </p>

              <ul className="mt-6 flex list-none flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>

              {/* Visual affordance only; the real link is the title above. */}
              <span
                aria-hidden="true"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]"
              >
                Read post
                <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-within:translate-x-0.5 group-focus-within:-translate-y-0.5" />
              </span>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
