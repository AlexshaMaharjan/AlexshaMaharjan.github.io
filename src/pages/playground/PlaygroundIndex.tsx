import { useState } from "react";
import { useLocale } from "@/lib/useLocale";
import home from "@/lib/playground/home";
import collageCards from "@/lib/playground/collage";
import CardStack from "@/components/playground/CardStack";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";

/**
 * The playground — a title, and a deck of four collages that stack as you
 * scroll.
 *
 * It has been two other things: an index of five category pages, then one long
 * scrapbook with every picture on it. This is the third shape and the smallest:
 * the owner asked for "the title and description in the middle and rest gone",
 * with the work below it behaving like the stacked cards on
 * tanujashastri.com — and then filled the four cards in Figma
 * (`Portfolio.fig`, page 2), which is where `@/lib/playground/collage` is
 * traced from.
 *
 * **`@/lib/playground/collage` is the only place the pictures live**
 * (`DECISION-047`). There used to be a parallel set of category files here, and
 * this comment used to say they were kept because they were "the only place the
 * captions are written down". That was wrong and stayed wrong for three
 * sessions: a `CollageSlot` carries its own `caption` and `alt` in both locales,
 * next to its own coordinates. The categories were deleted in `MILESTONE-014`,
 * along with everything else that had outlived `DECISION-027`.
 */
export default function PlaygroundIndex() {
  const locale = useLocale();
  const content = home[locale];

  /*
   * One control for every moving thing on the page (WCAG 2.2.2). Five clips
   * autoplay across the deck, so there has to be a way to stop them that does
   * not depend on hovering — and under `prefers-reduced-motion` none of them
   * start at all, which makes this control redundant rather than wrong.
   */
  const [paused, setPaused] = useState(false);

  return (
    <>
      <Seo title={`${content.heading} — Alexsha Maharjan`} description={content.intro} />

      <PageHero
        eyebrow={content.eyebrow}
        headingLines={[content.heading]}
        intro={content.intro}
        tags={content.tags}
      />

      <CardStack
        cards={collageCards}
        locale={locale}
        paused={paused}
        motionLabel={paused ? content.playMotion : content.pauseMotion}
        onToggleMotion={() => setPaused((p) => !p)}
      />
    </>
  );
}
