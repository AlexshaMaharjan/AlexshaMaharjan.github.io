import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { localeHref } from "@/lib/i18n";
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
  const dictionary = useDictionary();
  const content = home[locale];
  const outro = dictionary.playgroundOutro;

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

      {/*
        The way back (`MILESTONE-016` task 4).

        The fourth card used to hand straight over to the footer, which made the
        playground a corridor with no door at the end of it: the only way back
        to the work was the switch in the header, three screens up. The deck is
        a scroll you commit to, so the end of it is exactly where someone is
        most likely to want the other half of the site.

        It is the mode switch's counterpart, not a repeat of the footer's link:
        the footer offers every destination equally and this offers one, because
        after four cards of personal work there is only one obvious next thing.
      */}
      <section className="container-page py-[104px] text-center sm:py-[128px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-ink-muted">
          {outro.eyebrow}
        </p>
        <h2 className="mx-auto mt-5 max-w-[18ch] text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
          {outro.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-ink-secondary">
          {outro.copy}
        </p>
        <Link
          to={localeHref(locale, "/")}
          className="mt-9 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-7 text-[15px] font-medium text-white transition-colors hover:bg-[#1233c4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus"
        >
          {outro.cta}
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
