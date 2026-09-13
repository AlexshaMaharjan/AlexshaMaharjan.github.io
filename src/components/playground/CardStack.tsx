import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Collage from "@/components/playground/Collage";
import PieceViewer from "@/components/playground/PieceViewer";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { prefersReducedMotion } from "@/lib/motion";
import { FRAME_H, FRAME_W, type CollageCard } from "@/lib/playground/collage";
import { accentGridBackground, gridBackground } from "./gridBackground";

gsap.registerPlugin(ScrollTrigger);

/** How much of each card underneath stays visible above the one covering it. */
const PEEK = 16;
/** Air between the header and the top card. */
const GAP = 20;
/** How much narrower each card gets for every card stacked on top of it. */
/**
 * The widest a card may be: the shape of the collage printed on it.
 *
 * **A 14-inch laptop is the reason** (owner, SESSION-049, task 7: *"the
 * playground section was shown for small screens whereas there was enough space
 * in the sides"*). Measured at her 1366 x 768 display, across the viewport
 * heights the browser chrome of a maximised window actually leaves:
 *
 * | viewport | card | the collage on it | blank paper, each side |
 * | --- | --- | --- | --- |
 * | 1366 x 560 | 1191 x 447 | **712** x 445 | **240px** |
 * | 1366 x 625 | 1191 x 512 | **816** x 510 | **188px** |
 * | 1366 x 650 | 1191 x 537 | **856** x 535 | **168px** |
 * | 1366 x 768 | 1191 x 655 | 1045 x 653 | 73px |
 *
 * The masonry — the small-screen layout — was never what she saw; it needs a
 * card narrower than 5:4 and these are 2.2:1. What she saw was a collage drawn
 * at two thirds of the card it is printed on, with a hand's width of empty
 * white down either side of it, which reads as the same failure.
 *
 * The cause is arithmetic rather than a bug. A card is `100svh` less the header
 * and the gaps, so a short window makes a *long* card; the collage is a 16:10
 * Figma frame fitted inside it by `min(100cqw, 160cqh)`, so on any card wider
 * than 16:10 the height binds and the spare width is simply not used.
 *
 * So the card stops claiming width it has nothing to put in. It is capped at
 * 16:10 of its own height, centred, and the blue page shows either side instead
 * of blank card — a proof sheet on a desk rather than a sheet with a small
 * picture in the middle of it. At 1366 x 650 the card becomes 859 x 537 and the
 * 336px of dead white goes entirely.
 *
 * **It binds only where it should.** Below 16:10 — every phone, every portrait
 * tablet, a half-width window — `1.6 x height` is far wider than the container
 * allows, so the cap does nothing and the masonry still takes over under 5:4
 * exactly as before. What the collage is *drawn* at does not change: it was
 * already height-bound and still is. This removes the white, not the ceiling.
 *
 * One height for the whole deck (card 0's), not each card's own. The cards step
 * down by `PEEK`, so a per-card cap would step their widths down by 26px each,
 * and a deck of four different widths fanned over one another is a worse answer
 * than up to 77px of letterbox on the card at the back.
 */
const CARD_MAX_W = `calc(${FRAME_W / FRAME_H} * (100svh - var(--header-h) - ${GAP * 2}px))`;

const SHRINK = 0.03;
/**
 * How much smaller the first card starts, before it has landed.
 *
 * The homepage's process canvas grows as it pins, and the owner wants the deck
 * to arrive the same way. This is `SHRINK` run the other way and only on card
 * one: the rest of the deck already arrives at full size and is shrunk as it is
 * covered, so giving them all an entrance would be two tweens fighting over one
 * property. It stops at 1, which is the container's width and not the page's —
 * the owner asked that it not take up the whole page.
 */
const GROW = 0.08;
/**
 * The empty scroll behind each card, in `svh`.
 *
 * It is a real gap in the document between one card and the next, not a pinned
 * scroll: a card lands on the stack, and the next card's top edge is this much
 * further down, so for the whole of it the deck is motionless.
 *
 * **75svh until `MILESTONE-020` task 6, and that number belonged to the colour
 * reveal.** It was sized so that a card's forty-odd pictures got their colour
 * back at roughly half a wheel notch each, which is why it was as long as it
 * was. The pictures pin themselves up as the card *arrives* now, and are
 * finished about a second later, so 75svh of runway behind a landed card is no
 * longer a reveal happening slowly — it is three quarters of a screen of scroll
 * during which nothing whatsoever happens, four times over.
 *
 * 45svh is what the runway is still *for*: a beat between one card landing and
 * the next starting to climb over it, so the deck reads as a stack being built
 * rather than as a continuous slide, and enough scroll for `--pg-full` to bring
 * the card's accent in over the first 60% of it.
 */
const RUNWAY = 45;

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
 * **What the runways are for.** Every card is followed by `RUNWAY` of empty
 * scroll, so once a card has landed on the stack there is a stretch during
 * which nothing in the deck moves at all — the next card's top edge is still
 * below the fold, and this one is stuck under the header. It is a beat between
 * one card landing and the next climbing over it, and since `MILESTONE-022`
 * task 9 that is all it is: `--pg-reveal` used to be scrubbed across it, which
 * meant the card's colour was still arriving for most of a screen after the
 * card itself had stopped. The colour runs over the card's *arrival* now and is
 * finished before it lands.
 *
 * A runway is a sibling of the cards, not a wrapper around one, for the same
 * reason the cards share a parent: it lengthens the container the sticky cards
 * are confined to, which is what keeps every card pinned for longer, and it
 * leaves the stepped heights doing their job untouched.
 *
 * What GSAP adds is only depth: as a card is covered it narrows slightly from
 * its top edge, so the visible slivers step inwards and the deck reads as
 * receding. That part is decoration, and under `prefers-reduced-motion` it
 * does not run at all.
 */
export default function CardStack({
  cards,
  locale,
  dictionary,
  paused,
  motionLabel,
  onToggleMotion,
}: {
  cards: CollageCard[];
  locale: Locale;
  /** Passed through to `Collage` for the piece viewer's chrome. */
  dictionary: Dictionary;
  /** The page's motion control (WCAG 2.2.2) — it stops every clip in the deck. */
  paused: boolean;
  motionLabel: string;
  onToggleMotion: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  /**
   * The piece that is open, as a card and a slot (`MILESTONE-022` task 10).
   *
   * **It lives here because the viewer crosses cards now.** It was `Collage`'s
   * own state, one index into one card's slots, and that is precisely what
   * stopped the reader at the edge of the card they opened: the owner asked to
   * be able to carry on into the other cards from inside the viewer, grouped by
   * the colour each card already has. A deck-level pair of numbers is what that
   * needs, and it is also what lets this component do the other half of the
   * request — put the reader back on the *right* card when the viewer closes.
   *
   * `openedOn` is where the reader was when they opened it: the card, and the
   * button focus has to go back to. Closing on the same card returns focus to
   * that button, which is the dialog contract; closing on a different one is a
   * navigation, and `returnToCard` scrolls the deck there instead.
   */
  const [open, setOpen] = useState<{ card: number; slot: number } | null>(null);
  const openedOn = useRef<{ card: number; trigger: HTMLButtonElement | null }>({
    card: 0,
    trigger: null,
  });

  const openPiece = useCallback((card: number, slot: number, trigger: HTMLButtonElement) => {
    openedOn.current = { card, trigger };
    setOpen({ card, slot });
  }, []);

  /*
   * Stepping wraps inside the card's own colour, because a collage is a loop
   * and not a list: there is no first or last picture on a card, only the one
   * you started at. Crossing to another colour is the `onSelectCard` below, and
   * is deliberately a different gesture — running next off the end of one card
   * and into another would make the four groupings invisible.
   */
  const step = useCallback(
    (delta: number) =>
      setOpen((current) => {
        if (!current) return current;
        const count = cards[current.card]?.slots.length ?? 0;
        if (!count) return current;
        return { card: current.card, slot: (current.slot + delta + count) % count };
      }),
    [cards],
  );

  const selectCard = useCallback(
    (card: number) => setOpen((current) => (current ? { card, slot: 0 } : current)),
    [],
  );

  /**
   * Where card `card` sits when it has landed on the stack, in document pixels.
   *
   * Measured off the card's **runway** rather than off the card, and that is
   * not fussiness: a card is `position: sticky`, so once it is stuck its
   * `getBoundingClientRect()` reports where it is being *held*, not where it
   * belongs in the flow, and a scroll computed from that walks the page to the
   * wrong place. The runway is a plain static sibling that immediately follows
   * its own card, so its top edge minus the card's height is the card's flow
   * position, and it is the same number whatever the deck is doing.
   */
  const cardTop = useCallback((card: number) => {
    const root = rootRef.current;
    if (!root) return null;
    const runway = root.querySelectorAll<HTMLElement>("[data-stack-runway]")[card];
    const panel = root.querySelectorAll<HTMLElement>("[data-stack-slot]")[card];
    if (!runway || !panel) return null;
    const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
    const flowTop = runwayTop - panel.offsetHeight;
    return Math.max(0, flowTop - (headerHeight() + GAP + card * PEEK));
  }, []);

  /** Put the reader on the card the viewer left them on, and on the piece. */
  const returnToCard = useCallback(
    (card: number, slot: number) => {
      const top = cardTop(card);
      if (top === null) return;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      /*
       * Focus follows the scroll, on the next frame and without scrolling
       * again: a dialog that closes has to leave the keyboard somewhere real,
       * and the piece the reader was last looking at is the honest answer. Each
       * slot is rendered twice — the design and the masonry — so the visible
       * one is the one with a layout box.
       */
      requestAnimationFrame(() => {
        const panel = rootRef.current?.querySelectorAll<HTMLElement>("[data-stack-card]")[card];
        const pieces = Array.from(panel?.querySelectorAll<HTMLElement>(".pg-piece") ?? []).filter(
          (piece) => piece.offsetParent !== null,
        );
        pieces[slot]?.focus({ preventScroll: true });
      });
    },
    [cardTop],
  );

  /*
   * Closing is two different things, and which one it is depends on where the
   * reader ended up. Written outside the state updater deliberately: an updater
   * is called twice under StrictMode, and scrolling the page is not something to
   * do twice.
   */
  const closeViewer = useCallback(() => {
    const current = open;
    setOpen(null);
    if (current && current.card !== openedOn.current.card) {
      returnToCard(current.card, current.slot);
    } else {
      openedOn.current.trigger?.focus();
    }
  }, [open, returnToCard]);

  /**
   * The pin-up entrance (`MILESTONE-020` task 6).
   *
   * Deliberately not a scrubbed tween, which is what the colour reveal it
   * replaces was. A scrub ties the entrance to *how far* the visitor has
   * scrolled, so a picture can sit half-arrived for as long as somebody holds
   * still — and half-arrived, for an entrance made of opacity and a tilt, looks
   * like a rendering fault rather than like a choreography. This fires once,
   * plays for its own half second and is done, which is what an entrance is.
   *
   * A **layout** effect, so the at-rest state is written before the browser
   * paints: set after paint, every card would flash its pictures at full
   * strength and then hide them to animate in.
   *
   * `0.3` of the card, rather than any visibility at all: a card is nearly a
   * viewport tall, so the first sliver of it appears a long way before there is
   * anything to look at, and a pin-up that had already finished by the time the
   * card was on screen would never be seen. The observer releases each card as
   * it fires — the entrance happens once per visit, not once per scroll past.
   *
   * Nothing is hidden under `prefers-reduced-motion`, and nothing is hidden if
   * this never runs at all: the CSS rule is gated on `data-pinup`, which only
   * exists because this wrote it (`ISSUE-001`).
   */
  /*
   * The pin-up: each card's pictures fly onto the board as the card comes into
   * view. `data-pinup` is the only thing this writes; the animation itself is
   * `@keyframes pg-pin-up` in `index.css`, keyed off the attribute, so a card
   * whose JavaScript never runs is a card with every picture visible.
   *
   * Two rules, both from the owner (SESSION-049, task 2), and both about the
   * *first* card, which is the one this was getting wrong:
   *
   * **It waits for a scroll.** Card 1 is 30% on screen the moment the page
   * paints, so the observer fired during the first frame and fourteen pictures
   * pinned themselves up while the reader was still reading the page title
   * three hundred pixels above them — the one card whose entrance nobody ever
   * saw. `armed` holds every card at `idle` until the first scroll event,
   * whatever it is: a wheel notch, a swipe, an arrow key, a jump to an anchor.
   *
   * Re-observing on arming is the part that is easy to get wrong. A card that
   * was already intersecting when the observer was gated has no *new*
   * intersection to report, so waiting for one would leave card 1 invisible for
   * good; `unobserve` then `observe` makes the observer re-deliver each
   * element's current state on the next frame, which is exactly the missing
   * callback.
   *
   * `scrollY > 0` arms immediately, because a reload halfway down the deck, a
   * restored scroll position or a `#` link are all cases where the reader has
   * scrolled — just not in this document's lifetime.
   *
   * **It reverses.** The old observer unobserved on first sight, so the pin-up
   * was a once-per-page-load event: scroll back up over the deck and the cards
   * were simply already there. Leaving the observer attached and writing `idle`
   * on the way out means a card that has left the screen is reset, and pins
   * itself up again the next time it is scrolled to — which is what the owner
   * asked for and is also the honest behaviour, since every other animation on
   * this page is scrubbed and therefore reversible already.
   */
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-card]"));
    panels.forEach((panel) => {
      panel.dataset.pinup = "idle";
    });

    let armed = window.scrollY > 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const panel = entry.target as HTMLElement;
          panel.dataset.pinup = armed && entry.isIntersecting ? "in" : "idle";
        }
      },
      /*
       * **0.55, and it was 0.3** (`MILESTONE-022` task 9, owner: *"the image
       * animation begins too early… delay the image appearance animation
       * slightly so that the card is more fully revealed before the image
       * starts appearing"*).
       *
       * A card is nearly a viewport tall, so a third of it is on screen while
       * its top edge is still most of a screen below where it lands: the
       * pictures were pinning up during the card's *arrival*, over the top of
       * the one thing the reader is actually watching. Just over half of it is
       * about the point where the card has stopped reading as something coming
       * in and starts reading as something to look at.
       *
       * The colour turn is scheduled against the same moment from the other
       * side — it is finished as the card lands (see the reveal trigger below)
       * — so the two no longer fight: the card arrives and settles into its own
       * colour, and *then* its pieces go up on it.
       */
      { threshold: 0.55 },
    );
    panels.forEach((panel) => observer.observe(panel));

    const arm = () => {
      if (armed) return;
      armed = true;
      panels.forEach((panel) => {
        observer.unobserve(panel);
        observer.observe(panel);
      });
    };
    window.addEventListener("scroll", arm, { passive: true, once: true });

    return () => {
      window.removeEventListener("scroll", arm);
      observer.disconnect();
      panels.forEach((panel) => {
        delete panel.dataset.pinup;
      });
    };
  }, [cards.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const slots = gsap.utils.toArray<HTMLElement>("[data-stack-slot]", root);
    const panels = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);

    /*
     * Under reduced motion nothing is scrubbed, so a card would sit in the
     * muted blue for ever. They arrive finished instead — the accent is a
     * flourish, and the pictures are the content.
     */
    if (prefersReducedMotion()) {
      panels.forEach((panel) => panel.style.setProperty("--pg-reveal", "1"));
      return;
    }

    /*
     * One scrubbed value per card, written straight onto the card as a custom
     * property. A tween over a plain object rather than over the element's own
     * `--pg-reveal`, because GSAP's unit inference on custom properties is a
     * thing to trust or to sidestep, and this sidesteps it.
     */
    const reveals = panels.map((panel, i) => {
      const state = { at: 0 };
      const write = () => panel.style.setProperty("--pg-reveal", state.at.toFixed(4));
      return gsap.to(state, {
        at: 1,
        ease: "none",
        onUpdate: write,
        scrollTrigger: {
          trigger: slots[i],
          /*
           * **The card's colour arrives with the card** (`MILESTONE-022` task
           * 9, owner: *"by the time the card reaches its main/centre position,
           * the arrow/colour transition and related UI animation should already
           * be completed"*).
           *
           * This used to run over the card's **runway** — the empty scroll
           * *after* it had landed — so the notes, the arrows and the ruling
           * were still turning from blue to the card's own colour for most of a
           * screen after the card had stopped moving. That is what reads as
           * lag: the thing has arrived and is still catching up with itself.
           *
           * It runs over the card's *arrival* instead, from the moment its top
           * edge is 85% of the way down the viewport to the moment it lands
           * under the header. `--pg-full` is `--pg-reveal / 0.6`, so the colour
           * is actually finished at 60% of that travel, comfortably before the
           * card is home.
           *
           * The runway is still there and still does its job — a beat between
           * one card landing and the next climbing over it — it simply is not
           * carrying an animation any more.
           */
          start: "top 85%",
          end: () => `top ${headerHeight() + GAP + i * PEEK}px`,
          scrub: true,
        },
      });
    });

    /*
     * Card one grows into place as it arrives, the way the homepage's process
     * canvas does. It runs over the travel from "this card has appeared at the
     * bottom of the viewport" to "this card has landed under the header", which
     * is finished long before the shrink below can start on it: the next card's
     * top edge is still a RUNWAY plus a card height further down.
     */
    const entrance = panels[0]
      ? gsap.fromTo(
          panels[0],
          { scale: 1 - GROW },
          {
            scale: 1,
            ease: "none",
            transformOrigin: "50% 50%",
            scrollTrigger: {
              trigger: slots[0],
              start: "top bottom",
              end: () => `top ${headerHeight() + GAP}px`,
              scrub: true,
            },
          },
        )
      : null;

    // Only the stacking needs two cards to have anything to say; the reveal
    // above is per-card and runs on however many there are.
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
      [...tweens, ...reveals, ...(entrance ? [entrance] : [])].forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [cards.length]);

  return (
    <div ref={rootRef} className="mx-auto max-w-[1440px] px-2.5 sm:px-5 md:px-20">
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
        <Fragment key={card.index}>
          <div
            data-stack-slot
            className="sticky mx-auto"
            style={{
              maxWidth: CARD_MAX_W,
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
              className="pg-card relative h-full w-full overflow-hidden rounded-[28px] border border-card-border shadow-[0_-6px_44px_rgba(20,30,60,0.10)] [container-type:size]"
              /*
               * `--pg-accent` is the colour this card leaves the blue for, and
               * it is inherited rather than passed: the notes, the index and the
               * ruling all read it without being told which card they are on.
               *
               * `--pg-steps` used to be here too — the card's slot count plus
               * one, which turned the scrubbed reveal into a queue. The pin-up
               * stagger is a fixed delay per `--pg-order`, so it needs no total.
               */
              style={{ ...gridBackground, "--pg-accent": card.accent } as CSSProperties}
            >
              {/*
                The ruling in this card's own colour, over the card's blue. First
                in the card so it paints under the pictures, and faded in by
                `--pg-full` across the card's runway.
              */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ ...accentGridBackground(card.accent), opacity: "var(--pg-full)" }}
              />
              <Collage
                slots={card.slots}
                scribbles={card.scribbles}
                locale={locale}
                paused={paused}
                accent={card.accent}
                cardIndex={i}
                onOpenPiece={openPiece}
              />
              <span
                aria-hidden="true"
                className="pg-tint pointer-events-none absolute left-0 top-0 z-10 block p-7 font-mono text-[12px] md:p-9"
              >
                {card.index}
              </span>
            </article>
          </div>
          {/*
            The card's reveal runway: empty scroll between this card and the
            next, during which the deck is still and the colour comes back.
          */}
          <div aria-hidden="true" data-stack-runway style={{ height: `${RUNWAY}svh` }} />
        </Fragment>
      ))}
      {/* Holds the finished deck still for a beat before it scrolls away. */}
      <div aria-hidden="true" className="h-[40svh]" />

      {/*
        One viewer for the whole deck, not one per card. It is given every card
        so it can offer the four colours as a filter, and a card-and-slot pair
        for what is open (`MILESTONE-022` task 10).
      */}
      {open && cards[open.card] ? (
        <PieceViewer
          cards={cards}
          card={open.card}
          index={open.slot}
          locale={locale}
          dictionary={dictionary}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onSelectCard={selectCard}
          onClose={closeViewer}
        />
      ) : null}
    </div>
  );
}
