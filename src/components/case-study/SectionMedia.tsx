import type { CSSProperties } from "react";
import type { SectionImage } from "@/lib/caseStudies/types";
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
function ratioOf(image: SectionImage): number {
  const [w, h] = image.aspect.split("/").map(Number);
  return w && h ? w / h : 4 / 3;
}

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

/**
 * How many figures share a row.
 *
 * Three across is the busiest that stays legible in a 960px column. Four splits
 * two-and-two rather than going four across, which is the pairing the grid used
 * to produce and the reason a run of four reads as two comparisons.
 */
function rowsOf(items: SectionImage[]): SectionImage[][] {
  if (items.length === 4) return [items.slice(0, 2), items.slice(2)];
  const rows: SectionImage[][] = [];
  for (let i = 0; i < items.length; i += 3) rows.push(items.slice(i, i + 3));
  return rows;
}

/** The height a row lands at, and therefore how wide the row is allowed to be. */
function rowMetrics(items: SectionImage[]) {
  const ratios = items.map(ratioOf);
  const sum = ratios.reduce((a, b) => a + b, 0);
  const gaps = GAP * (items.length - 1);
  const height = Math.min(MAX_FIGURE_HEIGHT, (COLUMN_PX - gaps) / sum);
  return { ratios, sum, gaps, height, width: Math.round(height * sum + gaps) };
}

/**
 * What a figure actually renders at, for `srcset` (`SUGGESTION-012`).
 *
 * Below `md` a row stacks, so every figure is the full viewport column whatever
 * its aspect — that branch is the one that matters most, because it is the one
 * a 3x phone uses.
 *
 * The row turns horizontal at 768px rather than 640px: at 640 a three-figure row
 * put the narrowest figure at 140px, which is a thumbnail of a thumbnail.
 */
function sizesFor(px: number): string {
  return [
    `(min-width: 1280px) ${px}px`,
    `(min-width: 768px) min(${px}px, calc(100vw - 160px))`,
    `calc(100vw - 40px)`,
  ].join(", ");
}

/**
 * A section's figures, grouped into runs and then justified into rows.
 *
 * Runs preserve the order the figures are written in, so where a figure sits in
 * the data is where it sits on the page.
 */
export default function SectionMedia({ images }: { images: SectionImage[] }) {
  if (images.length === 0) return null;

  const runs: { wide: boolean; items: SectionImage[] }[] = [];
  for (const image of images) {
    const wide = isWide(image);
    const last = runs[runs.length - 1];
    if (last && !last.wide && !wide) last.items.push(image);
    else runs.push({ wide, items: [image] });
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
      {rows.map((items, i) => {
        const { ratios, height, width } = rowMetrics(items);
        return (
          <div
            key={i}
            data-inview={items.length === 1 ? "scale" : "stagger"}
            className="mx-auto flex w-full flex-col gap-5 md:flex-row"
            style={{ maxWidth: width }}
          >
            {items.map((image, n) => (
              <div key={n} style={{ flex: `${ratios[n]} 1 0%` } as CSSProperties}>
                <Figure {...image} sizes={sizesFor(Math.round(height * ratios[n]!))} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
