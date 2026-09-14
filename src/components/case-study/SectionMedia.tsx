import type { CSSProperties } from "react";
import type { SectionImage } from "@/lib/caseStudies/types";
import { justifyCells, ratioOf as ratioOfAspect, rowsOf, sizesFor } from "@/lib/justify";
import Figure from "./Figure";

/**
 * Wide enough to carry a section on its own? `wide` in the data wins; otherwise
 * the aspect ratio decides, so existing content gets sensible treatment without
 * every slot having to be annotated.
 *
 * This only decides **grouping** — whether a figure shares its row. How big it
 * renders is decided further down, by height, for everything alike.
 */
function isWide(image: SectionImage): boolean {
  if (image.wide !== undefined) return image.wide;
  const [w, h] = image.aspect.split("/").map(Number);
  if (!w || !h) return false;
  return w / h >= 1.5;
}

/** The declared aspect as a number. 4/3 is the fallback so a malformed string cannot divide by zero. */
const ratioOf = (image: SectionImage): number => ratioOfAspect(image.aspect);

/*
 * ---------------------------------------------------------------------------
 * Figures are sized by HEIGHT, not width (SESSION-027).
 * ---------------------------------------------------------------------------
 *
 * Every figure keeps its own true aspect — nothing is ever cropped to fit, and
 * `SESSION-022` onwards depends on that. But a row of equal-width figures with
 * different aspects has wildly different heights: AFONO's collection row held
 * a 0.375 cart drawer, a 0.545 product page and a 4/3 checkout, which at 307px
 * wide render 819px, 563px and 230px tall. Three figures, one row, and no two
 * bottoms within 300px of each other.
 *
 * So a row is justified instead, the way a photo gallery is: every figure in it
 * gets the **same height**, and its width follows from its own aspect.
 *
 * The whole layout is two CSS lines and no arithmetic in the markup. Give each
 * item `flex-grow: <its ratio>` against `flex-basis: 0`, and the widths come out
 * proportional to the ratios; because each figure's box is `aspect-ratio: ratio`,
 * width ∝ ratio means every height is identical. The browser does the
 * justification.
 *
 * What is computed here is only what CSS cannot know: the row's height, so the
 * row can be capped and centred, and the `sizes` string for each figure.
 */

/** The reading column, in px (`DECISION-017`). */
const COLUMN_PX = 960;

/** `gap-5`, in px — needed because the gaps come out of the row's width. */
const GAP = 20;

/**
 * The tallest any figure gets.
 *
 * This is the single number that makes the page consistent. A lone portrait, a
 * lone near-square and a lone landscape all render exactly this tall, so they
 * differ in width rather than in presence — and it replaces `SUGGESTION-017`'s
 * width ceiling, which produced a different bespoke width for every aspect.
 *
 * A figure only comes out shorter when the column is the binding constraint:
 * anything 1.5 or wider fits its full 960px inside this height, which is why
 * wide figures still take the whole column and nothing about them changed.
 */
const MAX_FIGURE_HEIGHT = 640;

/*
 * Rows of at most three, justified. Both live in `@/lib/justify`, which the
 * homepage work grid uses too (`DECISION-021`) — the two must not drift, since
 * a reader moving from the homepage into a case study should meet one layout.
 *
 * A row turns horizontal at 768px rather than 640px: at 640 a three-figure row
 * put the narrowest figure at 140px, which is a thumbnail of a thumbnail.
 */

/**
 * A section's figures, grouped into runs and then justified into rows.
 *
 * Runs preserve the order the figures are written in, so where a figure sits in
 * the data is where it sits on the page.
 */
export default function SectionMedia({ images }: { images: SectionImage[] }) {
  if (images.length === 0) return null;

  /*
   * Figures first collapse into cells, so a stack counts as one item in
   * everything that follows: the wide/narrow grouping, the three-per-row
   * chunking and the justification.
   */
  const cells: SectionImage[][] = [];
  for (const image of images) {
    const previous = cells[cells.length - 1];
    if (previous && previous[previous.length - 1]!.stackWithNext) previous.push(image);
    else cells.push([image]);
  }

  const runs: { wide: boolean; items: SectionImage[][] }[] = [];
  for (const cell of cells) {
    const wide = cell.length === 1 && isWide(cell[0]!);
    const last = runs[runs.length - 1];
    if (last && !last.wide && !wide) last.items.push(cell);
    else runs.push({ wide, items: [cell] });
  }

  const rows = runs.flatMap((run) => (run.wide ? [run.items] : rowsOf(run.items)));

  return (
    <div className="mt-12 flex flex-col gap-12">
      {/*
        These sit inside a section that already reveals, which makes them
        nested reveals — allowed, and coherent, because a child is always lower
        in the flow than its section, so its trigger never fires before the
        section's. While the section is at rest the figures are invisible with
        it; once it has arrived they wait for their own turn (DECISION-008).
      */}
      {rows.map((row, i) => {
        const isExplicitWide = row.length === 1 && row[0]?.length === 1 && row[0][0]?.wide === true;
        const rowMaxHeight = isExplicitWide ? 1400 : MAX_FIGURE_HEIGHT;
        const { widths, width } = justifyCells(
          row.map((cell) => ({ ratios: cell.map(ratioOf) })),
          COLUMN_PX,
          GAP,
          rowMaxHeight,
        );
        return (
          <div
            key={i}
            data-inview={row.length === 1 ? "scale" : "stagger"}
            className="mx-auto flex w-full flex-col gap-5 md:flex-row"
            style={{ maxWidth: width }}
          >
            {row.map((cell, n) => (
              <div key={n} className="flex flex-col gap-5" style={{ flex: `${widths[n]} 1 0%` } as CSSProperties}>
                {cell.map((image, m) => (
                  <Figure key={m} {...image} sizes={sizesFor(Math.round(widths[n]!))} />
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
