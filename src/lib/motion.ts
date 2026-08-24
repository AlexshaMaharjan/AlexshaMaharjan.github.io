
/**
 * The site's motion vocabulary (`SUGGESTION-006`).
 *
 * Everything that animates reads its timing from here, so the site moves in one
 * voice rather than in per-component guesses. `SPEC` §11 and the site's own
 * WikiMind copy say the same thing about motion: it should guide, not distract —
 * which is why the scale is short and the eases are all deceleration.
 *
 * The same numbers are published to CSS in `index.css` as `--duration-*` and
 * `--ease-*`, for the transitions that are written in Tailwind rather than GSAP.
 * Change them here and there together.
 */
export const duration = {
  /** Hovers, colour changes, anything the pointer is waiting on. */
  fast: 0.25,
  /** Page transitions and UI state changes. */
  base: 0.35,
  /** Entrances — long enough to read as arriving rather than appearing. */
  slow: 0.7,
} as const;

export const ease = {
  /** Deceleration. The default for anything entering. */
  out: "power2.out",
  /** For movement that starts and ends on screen. */
  inOut: "power2.inOut",
} as const;

/** How far an element travels while it arrives. */
export const distance = {
  sm: 10,
  md: 18,
  lg: 32,
} as const;

/** Between items in a group, so a grid arrives as a group and not as a wave. */
export const stagger = 0.06;

/**
 * The one reduced-motion guard. Every animation on the site consults this, and
 * the answer is checked at call time rather than cached: the setting can change
 * while the page is open (`DECISION-008`).
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * How an element arrives, chosen per element with `data-inview="…"`.
 *
 * - `up` (the default, and what a bare `data-inview` means) — fade and lift.
 * - `fade` — opacity only, for things where movement would be noise.
 * - `scale` — for media, which reads better growing slightly into place.
 * - `stagger` — the element's *children* arrive one after another; the element
 *   itself does not move.
 */
export type RevealVariant = "up" | "fade" | "scale" | "stagger";

export function revealVariant(value: string | undefined): RevealVariant {
  return value === "fade" || value === "scale" || value === "stagger" ? value : "up";
}

/** Where a reveal starts from. Opacity, never `visibility` — see `useScrollReveals`. */
export function atRest(variant: RevealVariant): Record<string, number> {
  if (variant === "fade") return { opacity: 0 };
  if (variant === "scale") return { opacity: 0, scale: 0.97 };
  return { opacity: 0, y: distance.md };
}

/** Where it lands, and how long it takes to get there. */
export function revealed(variant: RevealVariant): Record<string, number | string> {
  const base = { duration: duration.slow, ease: ease.out };
  if (variant === "fade") return { ...base, opacity: 1 };
  if (variant === "scale") return { ...base, opacity: 1, scale: 1 };
  return { ...base, opacity: 1, y: 0 };
}

/** Where a reveal fires, as a ScrollTrigger start string. */
export const TRIGGER_START = "top 88%";
