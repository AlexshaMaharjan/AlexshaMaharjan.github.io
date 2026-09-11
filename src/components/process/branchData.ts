/**
 * Where the five process clusters sit on the canvas, and the connector that
 * joins each to the question (`MILESTONE-010` task 3).
 *
 * **The map is 1440 x 900 and these are its own units.** `left`/`top` are
 * percentages of it, `width` is a pixel width inside it, and `line` is a path
 * in a `viewBox="0 0 1440 900"` — so a percentage and a path coordinate refer
 * to the same grid and can be compared by reading them. `HeroProcess` scales
 * the whole thing by one number.
 *
 * ## What the map has room for
 *
 * Two numbers decide everything here, and both were found by measuring rather
 * than by choosing:
 *
 * **The top row cannot start above 99.** The fixed header covers the canvas
 * down to about there once the canvas is full-bleed, and a row at 30 had its
 * numbers and titles behind the header.
 *
 * **The bottom row cannot start below about 504.** The tallest cluster in it
 * runs 340 units, and the map ends at 900. Moving that row down to 566 to open
 * a band across the middle cut the bottom off both illustrations.
 *
 * So the two rows own 99–473 and 504–844, and **there is no clear horizontal
 * band between them** — 31 units, and the question is 36 tall. The question
 * therefore sits where it always sat, in the gap *between* clusters 1 and 2,
 * and that gap is what limits its width.
 *
 * ## The question, and the width it needs
 *
 * It has to stay on **one line** (task 3b), and the German sentence is a
 * quarter longer than the English one, so German sets the width. At 480 units
 * it reads at about 26px against the map's own scale, and 480 is what fits:
 * cluster 1 ends at 409 and cluster 2 now begins at 1031, which leaves 71
 * units of air on each side for the connectors to live in.
 *
 * **Cluster 2 moved right to make that symmetric.** It and cluster 4 were
 * placed at a fixed `left`, so their differing widths left right-hand margins
 * of 86 and 32 against 65 on the left, and the gaps beside the question were
 * uneven. They are placed by their **inner** edge now, mirroring clusters 1 and
 * 3 about x = 720, because the inner edge is the one the eye reads against the
 * question.
 *
 * ## The connectors
 *
 * Five strokes, each **72 units long**: four leaning 16 degrees out of the
 * question's corners and one dropping from its foot. They were 82, 134, 141,
 * 180 and 197 units long at five unrelated angles, anchored to nothing in
 * particular — one ended at a cluster's title, another halfway up its side, a
 * third in open space.
 *
 * Seventy-two is what the air affords, not a preference. A longer connector
 * means a narrower question, and the question is what the canvas is about.
 */

/** The question's own box, in map units: `HeroProcess` positions it from these. */
export const HUB_W = 480;
export const HUB_Y = 460;

export interface BranchLayout {
  left: number;
  top: number;
  width: number;
  line: string;
  capA: { x: number; y: number };
  capB: { x: number; y: number };
}

export const branchLayout: BranchLayout[] = [
  {
    // 01 Understand — top left, 374 tall, so the top row ends at 473.
    left: 4.5,
    top: 11,
    width: 344,
    line: "M474 438 L402 438",
    capA: { x: 474, y: 438 },
    capB: { x: 402, y: 438 },
  },
  {
    // 02 Define — top right, its inner edge at 1031 mirroring cluster 01's 409.
    left: 71.61,
    top: 11,
    width: 382,
    line: "M966 438 L1038 438",
    capA: { x: 966, y: 438 },
    capB: { x: 1038, y: 438 },
  },
  {
    // 03 Explore — bottom left. The row starts at 504 and the tallest of it
    // runs 340 units, which is the map's floor.
    left: 4.5,
    top: 56,
    width: 444,
    line: "M474 482 L402 482",
    capA: { x: 474, y: 482 },
    capB: { x: 402, y: 482 },
  },
  {
    // 04 Design — bottom right, inner edge at 931 mirroring cluster 03's 509.
    left: 64.67,
    top: 56,
    width: 436,
    line: "M966 482 L1038 482",
    capA: { x: 966, y: 482 },
    capB: { x: 1038, y: 482 },
  },
  {
    // 05 Refine — centred under the question, and low enough that the stroke
    // dropping out of its foot is as long as the other four.
    left: 37.78,
    top: 61.78,
    width: 352,
    line: "M720 478 L720 550",
    capA: { x: 720, y: 478 },
    capB: { x: 720, y: 550 },
  },
];
