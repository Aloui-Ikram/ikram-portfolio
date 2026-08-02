import { skills } from "@/content/data";

/**
 * Decorative scrolling strip of the tech stack. Server component, no JS: the
 * motion is one CSS keyframe on a single transform.
 *
 * Marked aria-hidden because the list is rendered twice for the loop and every
 * item already appears, properly structured, in the Skills section.
 */
const ITEMS = Array.from(new Set(skills.flatMap((group) => group.skills)));

/**
 * Trailing margin rather than flex `gap`: with a gap, the last item has no
 * space after it, so the track is one gap short of twice a single pass and the
 * -50% translate jumps. A uniform margin-right makes each item exactly
 * (width + gap), so half the track is a whole number of items.
 */
function Item({ label }: { label: string }) {
  return (
    <li className="mr-3 inline-flex shrink-0 items-center gap-2 font-mono text-xs text-[var(--fg-muted)]">
      <span className="text-[var(--accent)]">✦</span>
      {label}
    </li>
  );
}

export function Ticker() {
  return (
    <div
      className="marquee relative overflow-hidden border-y border-[var(--border)] bg-[var(--bg-subtle)] py-3"
      aria-hidden="true"
    >
      <ul className="marquee-track flex w-max items-center">
        {/* Two passes so the loop point is invisible. */}
        {[0, 1].map((pass) =>
          ITEMS.map((label) => <Item key={`${pass}-${label}`} label={label} />),
        )}
      </ul>

      {/* Soft edges so items enter and leave instead of popping at the border. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--bg-subtle)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--bg-subtle)] to-transparent" />
    </div>
  );
}
