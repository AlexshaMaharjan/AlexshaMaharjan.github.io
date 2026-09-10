import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Collage from "@/components/playground/Collage";
import type { Locale } from "@/lib/i18n";
import { prefersReducedMotion } from "@/lib/motion";
import type { CollageCard } from "@/lib/playground/collage";
import { gridBackground } from "./gridBackground";

gsap.registerPlugin(ScrollTrigger);

/** How much of each card underneath stays visible above the one covering it. */
const PEEK = 16;
/** Air between the header and the top card. */
const GAP = 20;
/** How much narrower each card gets for every card stacked on top of it. */
const SHRINK = 0.03;

function headerHeight(): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  return Number.parseFloat(value) || 0;
}

/**
 * The playground's collages, as a deck that stacks up as you scroll.
 *
 * Every card is a `position: sticky` sibling inside one container, so each one
 * stops below the header and the next scrolls up over it — by the end of the
 * container all of them are stacked, held apart by `PEEK` so a sliver of each
 * card underneath stays visible. Those offsets are the whole mechanism; no JS
 * is involved in the stacking itself, which is why it survives a resize, a
 * reload halfway down the page, and reduced motion.
 *
 * Two details the offsets depend on:
 *
 * - the cards must be siblings of one parent, because a sticky element is
 *   confined to its own container — one wrapper each and every card would
 *   unstick the moment its wrapper scrolled past, and nothing would stack;
 * - the trailing spacer is what lets the finished deck sit still for a moment.
 *   Without it the parent ends at the last card and the whole stack starts
 *   scrolling away the instant it is complete.
 *
 * What GSAP adds is only depth: as a card is covered it narrows slightly from
 * its top edge, so the visible slivers step inwards and the deck reads as
 * receding. That part is decoration, and under `prefers-reduced-motion` it
 * does not run at all.
 */
export default function CardStack({
  cards,
  locale,
  paused,
  motionLabel,
  onToggleMotion,
}: {
  cards: CollageCard[];
  locale: Locale;
  /** The page's motion control (WCAG 2.2.2) — it stops every clip in the deck. */
  paused: boolean;
  motionLabel: string;
  onToggleMotion: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const slots = gsap.utils.toArray<HTMLElement>("[data-stack-slot]", root);
    const panels = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);
    if (panels.length < 2) return;

    const tweens = panels.slice(0, -1).map((panel, i) =>
      gsap.fromTo(
        panel,
        { scale: 1 },
        {
          scale: 1 - (panels.length - 1 - i) * SHRINK,
          ease: "none",
          // From its own top edge, so the sliver that stays visible above the
          // covering card holds its place and only narrows.
          transformOrigin: "50% 0%",
          scrollTrigger: {
            // Measured against the card that covers it: the shrink runs over
            // the travel from "the next card has appeared at the bottom of the
            // viewport" to "the next card has landed on top of this one".
            trigger: slots[i + 1],
            start: "top bottom",
            end: () => `top ${headerHeight() + GAP + (i + 1) * PEEK}px`,
            scrub: true,
          },
        },
      ),
    );

    // The deck is measured in viewport units against a header that publishes
    // its real height only after paint, so re-measure once things have settled.
    let done = false;
    const refresh = () => {
      if (!done) ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);

    return () => {
      done = true;
      window.removeEventListener("load", refresh);
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [cards.length]);

  return (
    <div ref={rootRef} className="container-page">
      {/*
        The motion control, parked at the bottom of the screen for as long as
        the deck is on it (WCAG 2.2.2). It has no height of its own, so it
        floats over the cards instead of pushing the deck around; below the
        clips' own rule that nothing plays under `prefers-reduced-motion`, this
        is the way to stop them by hand.
      */}
      <div
        className="pointer-events-none sticky z-[60] h-0"
        /*
         * Pinned near the foot of the screen with `top`, not `bottom`: a
         * bottom-stuck element is held as you scroll *up* towards it, so one
         * sitting at the head of the container — which is where this has to
         * live to cover the whole deck — simply scrolls away. `top` measured
         * from the far edge of the viewport pins it for the container's whole
         * length instead.
         */
        style={{ top: "calc(100svh - 84px)" }}
      >
        <button
          type="button"
          onClick={onToggleMotion}
          aria-pressed={paused}
          className="tap-target pointer-events-auto absolute bottom-0 right-0 gap-2 rounded-full border border-card-border bg-white/90 px-4 py-2 text-[13px] text-ink-secondary shadow-[0_2px_10px_rgba(20,30,60,0.10)] backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <span aria-hidden="true" className="text-[10px] leading-none">
            {paused ? "▶" : "❚❚"}
          </span>
          {motionLabel}
        </button>
      </div>

      {cards.map((card, i) => (
        <div
          key={card.index}
          data-stack-slot
          className="sticky"
          style={{
            top: `calc(var(--header-h) + ${GAP + i * PEEK}px)`,
            // Each card is exactly as much shorter as its `top` is lower, so
            // every card in the deck ends on the same bottom edge — the deck
            // fans downwards from the top rather than off the bottom of the
            // screen.
            //
            // That is also what keeps the fan from collapsing at the end. A
            // sticky element cannot be pushed past `parent.bottom -
            // element.height`, and with one shared parent that limit is one
            // document position for all of them: equal heights meant equal
            // clamped tops, so the four cards slid into a single flush pile as
            // the deck scrolled out. Stepping the heights makes each card's
            // limit differ by exactly its own offset, and the fan survives.
            height: `calc(100svh - var(--header-h) - ${GAP * 2 + i * PEEK}px)`,
            zIndex: i + 1,
          }}
        >
          <article
            data-stack-card
            aria-label={card.label[locale]}
            /*
             * `container-type: size` is what `Collage`'s stage is measured
             * against — without it the collage has nothing to be contained by
             * and collapses.
             */
            className="relative h-full w-full overflow-hidden rounded-[28px] border border-card-border bg-page shadow-[0_-6px_44px_rgba(20,30,60,0.10)] [container-type:size]"
            style={gridBackground}
          >
            <Collage slots={card.slots} locale={locale} paused={paused} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 block p-7 font-mono text-[12px] text-accent md:p-9"
            >
              {card.index}
            </span>
          </article>
        </div>
      ))}
      {/* Holds the finished deck still for a beat before it scrolls away. */}
      <div aria-hidden="true" className="h-[40svh]" />
    </div>
  );
}
