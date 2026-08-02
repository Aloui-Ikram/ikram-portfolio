"use client";

import { useEffect } from "react";

/**
 * Drives every scroll reveal on the page from a single observer.
 *
 * `Reveal` itself is a server component that just emits `data-reveal="out"`,
 * so none of the ~60 revealed blocks ship or hydrate any JavaScript. This one
 * small client component finds them all and flips the attribute as they come
 * into view. React never re-renders those static nodes, so mutating the
 * attribute directly is safe.
 */
export function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal="out"]'),
    );
    if (nodes.length === 0) return;

    const show = (el: Element) => el.setAttribute("data-reveal", "in");
    const supported = typeof IntersectionObserver !== "undefined";

    // Content must never stay hidden: covers a missing observer, an element
    // that never intersects (e.g. inside a collapsed list), or a stalled frame.
    const failsafe = window.setTimeout(() => nodes.forEach(show), supported ? 1500 : 0);

    if (!supported) {
      return () => window.clearTimeout(failsafe);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
