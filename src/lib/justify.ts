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
