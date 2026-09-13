import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import PlaygroundPeek from "@/components/PlaygroundPeek";
import { gridBackground } from "@/components/playground/gridBackground";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/**
 * The offer of the playground, wherever it is made (`MILESTONE-018` task 4).
 *
 * Both places that make it — the homepage's about section and the About page's
 * closing band — had the same heading, the same paragraph and the same
 * `PlaygroundPeek` under them, arranged two different ways: the homepage ran
 * them down the right-hand column beside the portrait, the About page centred
 * them. The owner liked the centred one and asked for it in both, so the
 * arrangement is a component now rather than a thing each caller re-types.
 *
 * ## The blue paper
 *
 * The owner asked for "the grid background container, but very light blue"
 * behind it, and the site already owns that ruling: `playground/gridBackground`
 * draws the 32px grid with an 8px grid faint inside it, in the accent's hue,
 * and it is what the playground's own cards are made of. Using it here is the
 * point — this band is a window into that page, so it is painted on that
 * page's paper.
 *
 * Two layers, not one: a flat wash (`PAPER`) with the ruling on top
 * of it. The wash is the "very light blue" and the ruling is what makes it read
 * as paper rather than as a tinted box. Keeping them separate also keeps the
 * ruling at exactly the alpha the playground uses — the two are meant to be the
 * same grid, and mixing the blue into the lines instead would have made it a
 * different one.
 *
 * The ruling is drawn on its own child rather than on the container itself so
 * `background-image` is free for it alone; a box carrying both a wash and four
 * gradients has to order them by hand, and the shorthand that sets one resets
 * the other. The child is *not* given a negative z-index — this container is
 * `position: relative` with `z-index: auto`, so it opens no stacking context
 * and a `-z-10` layer would paint behind its own parent's wash and disappear.
 * Painting order does the job: the ruling comes first in the DOM, the content
 * after it is positioned, so the content is already on top.
 */
const PAPER = "#F2F6FE";

export default function PlaygroundBand({
  locale,
  dictionary,
  heading,
  copy,
  /** `h2` on the About page, which has no heading above it; `h3` inside the
      homepage's about section, which does. */
  as: Heading = "h2",
  className,
}: {
  locale: Locale;
  dictionary: Dictionary;
  heading: ReactNode;
  copy: ReactNode;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[20px] border border-card-border px-6 py-14 md:px-12 md:py-16",
        className,
      )}
      style={{ backgroundColor: PAPER }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={gridBackground as CSSProperties} />

      <div className="relative mx-auto flex max-w-[640px] flex-col items-center text-center">
        <Heading className="text-subheading font-semibold tracking-[-0.02em] text-ink">{heading}</Heading>
        <p className="mt-5 text-[18px] leading-[1.65] text-ink-body">{copy}</p>
        <PlaygroundPeek locale={locale} dictionary={dictionary} align="center" />
      </div>
    </div>
  );
}
