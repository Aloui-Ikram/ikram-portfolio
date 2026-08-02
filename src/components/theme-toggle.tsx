"use client";

/**
 * Runs before paint (injected into <head> in the root layout) so the correct
 * theme is on <html> before the first frame, so there is no flash of the wrong colours.
 * It also adds the `.js` class that gates every entrance animation, so with
 * scripting disabled all content renders plainly visible instead of hidden.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.setAttribute("data-theme",t)}catch(e){d.setAttribute("data-theme","dark")}})()`;

export function ThemeToggle() {
  // No React state: the theme lives on <html data-theme>, and the icons swap
  // via CSS. Keeping it out of state avoids any server/client mismatch.
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable; the toggle still works for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between dark and light theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
        {/* Sun while dark (click for light); moon while light. */}
        <g className="hidden dark:block">
          <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 2.2v1.6M10 16.2v1.6M17.8 10h-1.6M3.8 10H2.2M15.5 4.5l-1.1 1.1M5.6 14.4l-1.1 1.1M15.5 15.5l-1.1-1.1M5.6 5.6L4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
        <g className="block dark:hidden">
          <path
            d="M16.5 12.3A7 7 0 0 1 7.7 3.5a7 7 0 1 0 8.8 8.8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </button>
  );
}
