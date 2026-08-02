/**
 * Original hand-drawn decoration: a mascot and a small sticker set.
 *
 * All of it is inline SVG rather than image files, so it costs no extra network
 * request, stays crisp at any size, and picks up the theme through
 * currentColor and the accent variables. Everything here is decorative and
 * aria-hidden; none of it carries meaning a screen reader needs.
 *
 * Drawn from scratch on purpose: shipping a recognisable character from an
 * existing series on a public portfolio would be someone else's copyright.
 */

type StickerName = "heart" | "bow" | "flower" | "cloud" | "shield" | "star";

const PATHS: Record<StickerName, React.ReactNode> = {
  heart: <path d="M12 21s-8-5.4-8-11a5 5 0 0 1 8-3.6A5 5 0 0 1 20 10c0 5.6-8 11-8 11Z" />,
  bow: (
    <>
      <path d="M11 12 3 7v10l8-5Zm2 0 8-5v10l-8-5Z" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="6.4" r="3.4" />
      <circle cx="17.3" cy="10.2" r="3.4" />
      <circle cx="15.3" cy="16.4" r="3.4" />
      <circle cx="8.7" cy="16.4" r="3.4" />
      <circle cx="6.7" cy="10.2" r="3.4" />
      <circle cx="12" cy="12" r="2.6" opacity="0.55" />
    </>
  ),
  cloud: <path d="M6.5 18a4.5 4.5 0 0 1-.3-9 6 6 0 0 1 11.4 1.4A3.8 3.8 0 0 1 17.5 18h-11Z" />,
  shield: <path d="M12 2.6 20 5.4v6.1c0 5-3.4 8.6-8 9.9-4.6-1.3-8-4.9-8-9.9V5.4l8-2.8Z" />,
  star: <path d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12C7 10.8 11.4 6.4 12 0Z" />,
};

/** A single sticker. `tilt` and `delay` are what stop a group looking placed by a machine. */
export function Sticker({
  name,
  className = "",
  size = 22,
  tilt = 0,
  delay = "0s",
}: {
  name: StickerName;
  className?: string;
  size?: number;
  tilt?: number;
  delay?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`float-slow ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${tilt}deg)`,
        animationDelay: delay,
      }}
    >
      {PATHS[name]}
    </svg>
  );
}

/**
 * The mascot: a padlock with a face. Body and shackle use the accent, while the
 * face uses --accent-fg, which is the colour guaranteed to be legible on the
 * accent in both themes.
 */
export function Mascot({ className = "", size = 84 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 64 76"
      aria-hidden="true"
      className={`bob ${className}`}
      style={{ width: size, height: (size * 76) / 64 }}
    >
      {/* Shackle */}
      <path
        d="M20 30v-9a12 12 0 0 1 24 0v9"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Body */}
      <rect x="7" y="30" width="50" height="40" rx="11" fill="var(--accent)" />
      {/* Eyes */}
      <circle cx="24" cy="46" r="3.2" fill="var(--accent-fg)" />
      <circle cx="40" cy="46" r="3.2" fill="var(--accent-fg)" />
      {/* Blush */}
      <ellipse cx="16.5" cy="52.5" rx="4.2" ry="2.6" fill="var(--accent-fg)" opacity="0.42" />
      <ellipse cx="47.5" cy="52.5" rx="4.2" ry="2.6" fill="var(--accent-fg)" opacity="0.42" />
      {/* Smile */}
      <path
        d="M27 53.5q5 4.2 10 0"
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Keyhole glint, so the body is not a flat slab */}
      <circle cx="32" cy="62.5" r="2" fill="var(--accent-fg)" opacity="0.3" />
    </svg>
  );
}

/**
 * Second mascot: an envelope for the contact section, drawn to peek over an
 * edge. The little hands sit at the very bottom of the viewBox so that when the
 * bottom is aligned to a card's top edge, they read as gripping it.
 *
 * Give the element a lower stacking order than the cards it peeks over; the
 * card surface is opaque, so it clips the lower half for free.
 */
export function EnvelopeMascot({
  className = "",
  size = 76,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 72 64"
      aria-hidden="true"
      className={`peek ${className}`}
      style={{ width: size, height: (size * 64) / 72 }}
    >
      {/* Body */}
      <rect x="4" y="6" width="64" height="46" rx="9" fill="var(--accent)" />
      {/* Flap, drawn as a soft V rather than a hard fold */}
      <path
        d="M8 13 36 33 64 13"
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      {/* Face */}
      <circle cx="27" cy="38" r="3" fill="var(--accent-fg)" />
      <circle cx="45" cy="38" r="3" fill="var(--accent-fg)" />
      <ellipse cx="19.5" cy="44" rx="4" ry="2.4" fill="var(--accent-fg)" opacity="0.42" />
      <ellipse cx="52.5" cy="44" rx="4" ry="2.4" fill="var(--accent-fg)" opacity="0.42" />
      <path
        d="M31 44.5q5 4 10 0"
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      {/* Hands gripping the edge below */}
      <rect x="10" y="49" width="13" height="8" rx="4" fill="var(--accent)" />
      <rect x="49" y="49" width="13" height="8" rx="4" fill="var(--accent)" />
    </svg>
  );
}
