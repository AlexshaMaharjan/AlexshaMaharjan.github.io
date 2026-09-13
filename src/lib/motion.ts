
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
 * Between the lines of a text block (`MILESTONE-023` task 5).
 *
 * Longer than the grid's, and that is the whole difference between the two.
 * Cards in a row are one object arriving, so 60ms reads as a single gesture
 * with a little depth in it; a heading and the sentence under it are **two
 * things said in order**, and the pause between them is what makes the second
 * one read as following the first rather than as arriving with it. 110ms is
 * about the length of a breath between clauses.
 */
export const staggerText = 0.11;

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
 * - `text` — the same, for **words rather than objects**: a shorter rise, a
 *   longer gap between children, and a slower settle, so an eyebrow, a heading
 *   and the sentence under it arrive in the order they are read
 *   (`MILESTONE-023` task 5). The owner's reference is Apple's, and what that
 *   is made of is restraint: 12px of travel, nothing scaled, nothing that
 *   arrives from the side.
 */
export type RevealVariant = "up" | "fade" | "scale" | "stagger" | "text";

export function revealVariant(value: string | undefined): RevealVariant {
  return value === "fade" || value === "scale" || value === "stagger" || value === "text"
    ? value
    : "up";
}

/** Where a reveal starts from. Opacity, never `visibility` — see `useScrollReveals`. */
export function atRest(variant: RevealVariant): Record<string, number> {
  if (variant === "fade") return { opacity: 0 };
  if (variant === "scale") return { opacity: 0, scale: 0.97 };
  if (variant === "text") return { opacity: 0, y: distance.sm + 2 };
  return { opacity: 0, y: distance.md };
}

/** Where it lands, and how long it takes to get there. */
export function revealed(variant: RevealVariant): Record<string, number | string> {
  const base = { duration: duration.slow, ease: ease.out };
  if (variant === "fade") return { ...base, opacity: 1 };
  if (variant === "scale") return { ...base, opacity: 1, scale: 1 };
  /*
   * Slower than the rest and on a deeper deceleration: a line of type that
   * coasts to a stop reads as settling, and the same line stopped by
   * `power2.out` in 0.7s reads as being placed. `power3.out` is the only place
   * on the site an ease other than the two in `ease` is used, and it is here
   * because this is the only thing on the site that animates *reading*.
   */
  if (variant === "text") return { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" };
  return { ...base, opacity: 1, y: 0 };
}

/** Where a reveal fires, as a ScrollTrigger start string. */
export const TRIGGER_START = "top 88%";
