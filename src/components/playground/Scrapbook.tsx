import type { CSSProperties } from "react";
import type { PlaygroundItem } from "@/lib/playground/types";
import { bentoRows, ratioOf, rowMetrics, sizesFor } from "@/lib/justify";
import Tile from "./Tile";

/**
 * One category's wall of things (`DECISION-026`).
 *
 * Rows are justified by height, the mechanism `DECISION-019` built for
 * case-study figures: every tile in a row shares one height and takes its width
 * from its own aspect, so **nothing is ever cropped and nothing is boxed.**
 * `bentoRows` then varies how many tiles go in a row — two, three, four, three —
 * which is what turns an even grid into a bento.
 *
 * Below `sm` a row stacks and every tile is full width at its true shape. That
 * is the correct mobile answer for a gallery and needs no special case.
 */

/** `container-page` is 1440px capped with 80px either side at md. */
const COLUMN_PX = 1280;
const GAP = 20;
/** Tall enough for a pair to feel like a feature, short enough that four fit. */
const MAX_ROW_HEIGHT = 430;

export default function Scrapbook({
  items,
  paused,
  pendingLabel,
}: {
  items: PlaygroundItem[];
  paused: boolean;
  pendingLabel: string;
}) {
  /*
   * A GALLERY SHOWS WHAT EXISTS (SESSION-034).
   *
   * `DECISION-006` renders an unfilled slot as a hatched placeholder, and that
   * was right for a page of small even cards: it showed the shape of the work
   * to come at the cost of a thumbnail. At this size it is not. A row height of
   * 430px turned the two categories with no pictures yet into **ten enormous
   * hatched rectangles spanning two screens**, which is the first thing a
   * visitor met and said nothing at all.
   *
   * So the placeholders become one line of text. The information — what is
   * planned, and that it is planned — survives; the acreage does not.
   */
  const shown = items.filter((item) => item.src || item.note);
  const pending = items.filter((item) => !item.src && !item.note);
  if (shown.length === 0 && pending.length === 0) return null;
  const rows = bentoRows(shown);

  return (
    <div className="flex flex-col gap-5">
      {rows.map((row, i) => {
        const { ratios, height, width } = rowMetrics(
          row.map((item) => ratioOf(item.aspect)),
          COLUMN_PX,
          GAP,
          MAX_ROW_HEIGHT,
        );
        return (
          <div
            key={i}
            data-inview="stagger"
            className="mx-auto flex w-full flex-col gap-5 sm:flex-row sm:flex-wrap"
            style={{ maxWidth: width }}
          >
            {row.map((item, n) => (
              <div
                key={n}
                /*
                  `minWidth` is what stops a bento row becoming a contact sheet
                  between the breakpoints. A row of four justified at 768px put
                  its narrowest tiles at **82px wide** — measured — because the
                  row count is fixed at render and the viewport is not.
                  `flex-wrap` plus a floor lets a too-tight row break itself into
                  two, at any width, without the layout having to know the
                  viewport. `SectionMedia` learned the same lesson at 640px and
                  fixed it by raising a breakpoint; a floor is the general form
                  of that fix.
                */
                style={{ flex: `${ratios[n]} 1 0%`, minWidth: "min(190px, 100%)" } as CSSProperties}
              >
                <Tile
                  item={item}
                  paused={paused}
                  sizes={sizesFor(Math.round(height * ratios[n]!))}
                  /*
                    Tilt only what the data already marks as tilted. Rotating
                    every card would be costume rather than character, and a
                    rotation at a row's edge eats into the page's gutter — at
                    1.3 degrees on a 500px card that is about 6px, inside the
                    20px the narrowest breakpoint has to give.
                  */
                  tilt={item.rotated ? (n % 2 === 0 ? -1.3 : 1.1) : 0}
                />
              </div>
            ))}
          </div>
        );
      })}
      {pending.length > 0 && (
        <p className="mt-1 font-mono text-[12px] leading-[1.6] text-ink-muted">
          {pendingLabel} {pending.map((item) => item.caption).join(" · ")}
        </p>
      )}
    </div>
  );
}
