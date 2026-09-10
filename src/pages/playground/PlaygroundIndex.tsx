import { useState } from "react";
import { useLocale } from "@/lib/useLocale";
import home from "@/lib/playground/home";
import collageCards from "@/lib/playground/collage";
import CardStack from "@/components/playground/CardStack";
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
 * The category content in `@/lib/playground/categories` is untouched and still
 * audited. It is no longer rendered — the collages carry the pictures now — but
 * it is the only place the captions and the still-empty slots are written down,
 * so it stays until something replaces it.
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

      {/*
        The title sits high on the first screen rather than in the middle of it,
        so the top of the first card is already on screen before anyone scrolls
        — the owner asked for about half of it. That is arithmetic, not taste:
        the deck starts at this section's height, a card is
        `100svh - header - 40`, so half a card showing at rest wants a hero of
        `100svh - card/2`, which is 56svh. In `svh` the ratio holds at any
        window height.
      */}
      <section className="flex min-h-[56svh] items-center justify-center px-5 pt-[var(--header-h)]">
        <div className="container-page text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink-muted">{content.eyebrow}</p>
          <h1 className="mx-auto mt-5 max-w-[900px] text-page-title font-semibold leading-[1.02] tracking-[-0.028em] text-ink">
            {content.heading}
          </h1>
          <p className="mx-auto mt-7 max-w-[560px] text-[19px] leading-[1.6] text-ink-secondary">{content.intro}</p>
        </div>
      </section>

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
