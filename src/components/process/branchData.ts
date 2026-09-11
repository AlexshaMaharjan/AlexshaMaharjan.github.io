/**
 * Where the five process clusters sit on the canvas, and the connector that
 * joins each to the question (`MILESTONE-010` task 3, re-banded in
 * `MILESTONE-011` task 1).
 *
 * **The map is 1440 x 900 and these are its own units.** `left`/`top` are
 * percentages of it, `width` is a pixel width inside it, and `line` is a path
 * in a `viewBox="0 0 1440 900"` — so a percentage and a path coordinate refer
 * to the same grid and can be compared by reading them. `HeroProcess` scales
 * the whole thing by one number.
 *
 * ## Three bands, not two
 *
 * Clusters 01 and 02 lay their contents out in **one row** each. That is the
 * owner's instruction and it is also what made the rest of this map possible,
 * because a one-row cluster is a **short** cluster: 01 ran 374 units tall as
 * two rows and runs about 250 as one.
 *
 * The old map had no room between its rows. The two rows owned 99–473 and
 * 504–844, which left 31 units of clear band and the question is 36 tall — so
 * the question had to sit in the *gap between clusters 01 and 02*, and that
 * gap is what capped it at 480 units wide with 71 units of air each side.
 *
 * With the top row ending near 350 there is a real horizontal band across the
 * middle, roughly 350–504. The question moved into it. Three consequences, and
 * all three are the point:
 *
 * - **The clusters got their width back.** 01 and 02 are 584 units, which is
 *   what their contents need side by side; 03 and 04 are 468. They are paired
 *   by width because the owner asked for 01 and 02 to match each other and 03
 *   and 04 to match each other.
 * - **The clusters are placed by their outer edge**, 65 units in from each
 *   side of the map, so the four of them are symmetric about x = 720 by
 *   construction rather than by arithmetic that has to be redone whenever a
 *   width changes.
 * - **The connectors are diagonal.** They could not be before: with the
 *   question wedged between two clusters the only direction with any room in
 *   it was horizontal, which is why five strokes documented as "leaning 16
 *   degrees" were in fact flat. In a band there is vertical room, so they lean.
 *
 * ## The connectors
 *
 * Five strokes, and since `MILESTONE-013` all four of the outer ones are the
 * same kind again: **a diagonal out of the question's corner**, mirrored left
 * to right and top to bottom, plus the one that drops to 05.
 *
 * The bottom row spent `MILESTONE-012` as L-shaped elbows, out along the
 * question's foot and then down. The owner's Figma redesign draws four
 * diagonals radiating from the question, so the elbows are gone: the elbow was
 * only ever a waypoint between two points that were already a diagonal.
 *
 * All four leave at **26.6 degrees** — 114 units across and 62 up or down — and
 * all four are **short, and nowhere near their cluster**. That is the part that
 * is easy to get wrong by reasoning instead of measuring. A stroke from the
 * question to the thing it connects to is the obvious drawing and it is not the
 * one in the file: the owner's four run from just inside the question's corner
 * out to a point in the open black, and stop. They are a gesture towards a
 * cluster, not a wire to it, which is why they can be identical to each other
 * while the four clusters they point at are four different sizes.
 *
 * The inner ends (541 and 899) come straight from the file, scaled. The outer
 * ends are placed by **reflection rather than by measurement**: the redesign's
 * own top and bottom strokes sit 46 and 106 units from the question's centre
 * line, an asymmetry that comes from where a hand dropped two vectors and not
 * from anything the map means. Reflecting the top pair about `HUB_Y` gives the
 * bottom pair, and the four then read as one shape drawn four ways.
 *
 * ## The bands, restruck (`MILESTONE-013`)
 *
 * The redesign also moves three horizontal lines, and it moves them by putting
 * the question in the **middle of the canvas** rather than slightly above it.
 * Read as fractions of the frame, so that a design drawn at 1512 x 868 can be
 * laid on a map that is 1440 x 900:
 *
 * - `HUB_Y` 430 → **450**, which is 50.06% of the frame. Dead centre.
 * - The bottom row's top 56% → **46.4%**, so steps 03 and 04 open *level with
 *   the question* instead of below it. This is the change that is actually
 *   visible: the map used to read as two rows with a sentence wedged between
 *   them, and now it reads as one sentence with four steps around it.
 * - Step 05's top 61.78% → **68.7%**, down into the room the bottom row left.
 *
 * The widths and the 65-unit outer inset stay as they were. The Figma insets
 * its clusters further — 8.2% against 4.5% — but that is a consequence of its
 * contents being drawn smaller relative to a wider frame, not an instruction
 * about where a cluster's outer edge belongs, and these clusters are DOM at
 * fixed pixel sizes inside a map that scales as one.
 *
 * Change a cluster's width or a row's `top` and all of this moves with it —
 * the five `line` paths, the three bands and the two alignments are one piece
 * of geometry, which is why they are in one file.
 */

/** The question's own box, in map units: `HeroProcess` positions it from these. */
export const HUB_W = 480;
/**
 * The question's centre line. The middle of the canvas since `MILESTONE-013`
 * — see "The bands, restruck" above.
 */
export const HUB_Y = 450;

export interface BranchLayout {
  left: number;
  top: number;
  width: number;
  line: string;
  capA: { x: number; y: number };
  capB: { x: number; y: number };
  /**
   * Which edge of its own box the cluster's contents hang from
   * (`MILESTONE-012` task 1).
   *
   * The four boxes were already symmetric about x = 720 — placed by their
   * outer edge, 65 units in from each side — but everything *inside* the two
   * right-hand boxes was left-aligned, so 02 and 04 read as left-hand clusters
   * that happened to start further across. The number, the title, the question
   * and the wrapped panels all hang from the right edge now, and the map is
   * mirrored rather than repeated.
   *
   * Only on the pinned map. The phone lays the five steps out as one column
   * and a column with two of its five steps right-aligned is not a mirror of
   * anything.
   */
  align?: "left" | "right";
}

export const branchLayout: BranchLayout[] = [
  {
    // 01 Understand — top left, one row, outer edge 65 units in.
    left: 4.514,
    top: 11,
    width: 584,
    line: "M541 404 L427 342",
    capA: { x: 541, y: 404 },
    capB: { x: 427, y: 342 },
  },
  {
    // 02 Define — top right, mirroring 01 about x = 720.
    left: 54.931,
    top: 11,
    width: 584,
    align: "right",
    line: "M899 404 L1013 342",
    capA: { x: 899, y: 404 },
    capB: { x: 1013, y: 342 },
  },
  {
    // 03 Explore — now level with the question rather than below it, and
    // reached by the reflection of 01's stroke rather than by an elbow.
    left: 4.514,
    top: 46.4,
    width: 468,
    line: "M541 496 L427 558",
    capA: { x: 541, y: 496 },
    capB: { x: 427, y: 558 },
  },
  {
    // 04 Design — the reflection of 03 about x = 720, so the four outer
    // strokes are one shape drawn four ways.
    left: 62.986,
    top: 46.4,
    width: 468,
    align: "right",
    line: "M899 496 L1013 558",
    capA: { x: 899, y: 496 },
    capB: { x: 1013, y: 558 },
  },
  {
    // 05 Refine — centred under the question, down in the room the bottom row
    // left when it moved up, and reached by the one stroke that drops.
    left: 37.78,
    top: 68.7,
    width: 352,
    line: "M720 501 L720 582",
    capA: { x: 720, y: 501 },
    capB: { x: 720, y: 582 },
  },
];
