/**
 * Justified rows — the layout `DECISION-019` established for case-study
 * figures, extracted so the homepage work grid can use the same one.
 *
 * Every item in a row gets the **same height**; its width follows from its own
 * aspect, so nothing is ever cropped to fit. The browser does the justification:
 * each item is given `flex-grow: <its ratio>` against `flex-basis: 0`, which
 * makes widths proportional to ratios — and because each item's box carries
 * `aspect-ratio: <ratio>`, width proportional to ratio means every height in the
 * row comes out identical.
 *
 * What cannot be left to CSS is the row's height, because the row has to be
 * capped and then centred at exactly the width that height implies, and the
 * `sizes` string each image needs. That is all this module computes.
 */

/** A ratio parsed from an `"1600/900"` aspect string. 4/3 if it is malformed. */
export function ratioOf(aspect: string): number {
  const [w, h] = aspect.split("/").map(Number);
  return w && h ? w / h : 4 / 3;
}

/** Chunk items into rows. Four splits two-and-two rather than going four across. */
export function rowsOf<T>(items: T[], perRow = 3): T[][] {
  if (items.length === 4 && perRow === 3) return [items.slice(0, 2), items.slice(2)];
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));
  return rows;
}

export interface RowMetrics {
  ratios: number[];
  /** The height every item in the row renders at. */
  height: number;
  /** The row's own width at that height — what it should be centred within. */
  width: number;
}

export function rowMetrics(ratios: number[], columnPx: number, gap: number, maxHeight: number): RowMetrics {
  const sum = ratios.reduce((a, b) => a + b, 0);
  const gaps = gap * (ratios.length - 1);
  const height = Math.min(maxHeight, (columnPx - gaps) / sum);
  return { ratios, height, width: Math.round(height * sum + gaps) };
}

/**
 * What an item actually renders at, for `srcset` (`SUGGESTION-012`).
 *
 * Below `md` a row stacks and every item is the full viewport column whatever
 * its aspect — that branch is the one a 3x phone uses, so it is the one that
 * matters most. `gutter` is the page padding either side at that breakpoint.
 */
export function sizesFor(px: number, gutter = 160): string {
  return [
    `(min-width: 1280px) ${px}px`,
    `(min-width: 768px) min(${px}px, calc(100vw - ${gutter}px))`,
    `calc(100vw - 40px)`,
  ].join(", ");
}


/**
 * A cell in a justified row: one figure, or several stacked in a column.
 *
 * `ratios` is the aspect of each figure in the cell, top to bottom.
 */
export interface Cell {
  ratios: number[];
}

export interface CellMetrics {
  /** Each cell's width at the row's common height — also its `flex-grow`. */
  widths: number[];
  /** The height a single-figure cell's picture renders at, as `rowMetrics` means it. */
  height: number;
  /** The row's own width at that height. */
  width: number;
}

/**
 * The vertical cost of a `figcaption` under a figure: `mt-2.5` plus one line of
 * 13px at `leading-[1.5]`. It only matters when the cells in a row hold
 * different numbers of figures, and then it matters a lot — a stack of two
 * carries two captions against a single figure's one, and without this the
 * bento's two columns end a caption apart.
 */
const CAPTION_PX = 30;

/**
 * Justify a row whose cells may be stacked columns (`MILESTONE-010` task 8).
 *
 * `height` keeps `rowMetrics`' meaning: the height of the picture in a cell
 * that holds one figure. A stack of `n` figures sharing a width has `n - 1`
 * extra captions and `n - 1` inner gaps to find room for, so its pictures get
 * that much less height between them and its width is
 * `(height - overhead) * k`, where `k = 1 / Σ(1 / rᵢ)` — the ratio the stack
 * would have if nothing sat between its figures. Every cell then finishes at
 * exactly `height + CAPTION_PX`, so the row's bottoms line up.
 *
 * A row whose cells all hold one figure has zero overhead everywhere and comes
 * out identical to `rowMetrics`, which is what keeps every existing page still.
 *
 * The one approximation: the widths are exact at `columnPx`, and as the row
 * narrows the fixed gap and caption do not shrink with it, so a stack runs at
 * most `overhead` taller than its neighbour. At 768px, the narrowest width at
 * which rows are still horizontal, that is under 25px; below it every row
 * stacks and the question does not arise.
 */
export function justifyCells(
  cells: Cell[],
  columnPx: number,
  gap: number,
  maxHeight: number,
  innerGap = gap,
): CellMetrics {
  const k = cells.map((c) => 1 / c.ratios.reduce((a, r) => a + 1 / r, 0));
  const overhead = cells.map((c) => (c.ratios.length - 1) * (innerGap + CAPTION_PX));

  const gaps = gap * (cells.length - 1);
  const sum = k.reduce((a, b) => a + b, 0);
  const slack = k.reduce((a, ki, i) => a + ki * overhead[i]!, 0);
  const height = Math.min(maxHeight, (columnPx - gaps + slack) / sum);

  const widths = k.map((ki, i) => (height - overhead[i]!) * ki);
  return { widths, height, width: Math.round(widths.reduce((a, b) => a + b, 0) + gaps) };
}
