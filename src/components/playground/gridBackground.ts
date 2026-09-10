import type { CSSProperties } from "react";

/**
 * The playground's paper: a 32px grid with an 8px grid faint inside it.
 *
 * It is shared rather than repeated because it is now painted three times —
 * once by `PlaygroundLayout` behind the whole section, once by every card in
 * the stack, which has to carry its own copy because a card slides over the
 * page and would otherwise show through as a blank panel, and once more per
 * card in that card's own colour (`accentGridBackground`).
 *
 * **The lines are blue, not graphite** (SESSION-037). The page's ground has to
 * stay light enough to carry the hero's small print, so the blue tone the owner
 * asked for is drawn rather than filled: the same ruling as before at the
 * accent's hue, which reads as blue paper without touching any contrast ratio.
 */
function grid(strong: string, faint: string): CSSProperties {
  return {
    backgroundImage: `linear-gradient(${strong} 1px, transparent 1px), linear-gradient(90deg, ${strong} 1px, transparent 1px), linear-gradient(${faint} 1px, transparent 1px), linear-gradient(90deg, ${faint} 1px, transparent 1px)`,
    backgroundSize: "32px 32px, 32px 32px, 8px 8px, 8px 8px",
  };
}

/** `#rgb` or `#rrggbb` at an alpha, because a grid line is four gradients. */
function rgba(hex: string, alpha: number): string {
  const digits = hex.replace("#", "");
  const full = digits.length === 3 ? digits.replace(/./g, (c) => c + c) : digits;
  const value = Number.parseInt(full, 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

/*
 * Lightened from 0.075/0.032 (`MILESTONE-010` task 14f): the owner found the
 * card ruling too dark. Read this together with `accentGridBackground`, which
 * paints a second grid over it at full reveal — the two add up, so the state to
 * judge is the lit card, not the resting one.
 */
export const gridBackground = grid("rgba(43,74,191,0.045)", "rgba(43,74,191,0.018)");

/**
 * The page behind the deck: a notebook's dot grid, not a ruled one
 * (`SESSION-038`).
 *
 * The cards keep the grid, and the two being different is the point — the page
 * is the desk the deck is lying on, and a dotted ground reads as paper without
 * competing with twelve ruled panels sliding over it. 24px is a notebook's own
 * 5mm; the dot is drawn a shade under the transparent stop so the edge is
 * antialiased rather than stepped.
 */
export const dotBackground: CSSProperties = {
  backgroundImage: "radial-gradient(circle at center, rgba(43,74,191,0.26) 1.3px, transparent 1.6px)",
  backgroundSize: "24px 24px",
};

/**
 * The same ruling in one card's own colour, painted as a second layer over that
 * card and faded in by `--pg-full` once every picture on it has its colour back
 * (`CardStack.tsx`).
 *
 * Two stacked layers rather than one interpolated colour: a grid is four
 * gradients, and cross-fading two opacities is both cheaper and exactly as
 * controllable. It takes the colour rather than owning one because each card
 * turns a different way — orange, green, black, purple (`collage.ts`).
 */
export function accentGridBackground(accent: string): CSSProperties {
  return grid(rgba(accent, 0.15), rgba(accent, 0.05));
}
