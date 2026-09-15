import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "@/components/ui/Image";
import { useCursorTag } from "@/lib/useCursorTag";
import LoopVideo from "@/components/ui/LoopVideo";
import Scribble, { ScribbleArrow } from "@/components/playground/Scribble";
import type { Locale } from "@/lib/i18n";
import { FRAME_H, FRAME_W, type CollageScribble, type CollageSlot } from "@/lib/playground/collage";
import { notePx, placeScribbles, stageUnits, UNITS_PER_PX_AT_1280 } from "@/lib/playground/placeScribbles";
import { MOBILE_CARD_LAYOUTS } from "@/lib/playground/mobileLayout";

/**
 * One card's worth of the playground collage (`SESSION-035`).
 *
 * **Two layouts, one set of pictures.** On a landscape card this is the Figma
 * frame: every slot absolutely positioned as a percentage of the 16000 × 10000
 * design canvas, so the arrangement is the designed one at any size. On a
 * portrait one that arrangement cannot survive — the design would shrink to a
 * 350 × 219 postage stamp in the middle of a very tall card — so the same slots
 * run down a masonry instead, in the same order, at a size worth having. The
 * card's own proportions choose between them, in `index.css`.
 *
 * **The stage is contained, not stretched.** `min(100cqw, 160cqh)` is `object-fit:
 * contain` written in container-query units: the collage takes the card's full
 * width until the card is too short for it, and its height after that. A card
 * is a viewport tall, so its proportions move with the window; letting the
 * design letterbox inside it keeps every piece the shape it was drawn, where
 * stretching would silently re-crop forty-eight pictures. The card sets
 * `container-type: size`, which is what those units are measured against.
 *
 * **The card's pieces pin themselves up** (`MILESTONE-020` task 6). Every slot
 * carries a `--pg-order` — its place in an order shuffled once per card, per
 * visit — and a `--pg-tilt`, and `index.css` turns the pair into a staggered
 * entrance: each picture fades in from a little low, a little small and a few
 * degrees off square as the card comes into view. The only thing this file
 * decides is who is next.
 *
 * That shuffle used to drive a **colour reveal** — the card arrived in black
 * and white and the scroll put the colour back one picture at a time — and the
 * pictures are simply in colour now. See `index.css` for why: a tester did not
 * notice the mechanic, did not know to scroll for it, and therefore looked at
 * a grey version of the work. Same machinery, pointed at something that cannot
 * hide the content.
 *
 * **Hovering holds one up to the light.** A collage shows a piece at a few
 * hundred pixels and the viewer shows it at full size, but between those two
 * there was nothing — so a pointer over a slot grows it in place and names it
 * beside the cursor. The tag is portalled to `body`: every ancestor inside the
 * deck is either transformed by the stacking tween or clipped by the card's own
 * `overflow: hidden`, and a `position: fixed` box under either of those is not
 * fixed to the viewport at all.
 *
 * **Every slot opens** (SESSION-036). A collage shows a piece at a few hundred
 * pixels; the viewer shows it at the size it was made, with what it is written
 * beside or under it, and plays the clips with their controls.
 *
 * **The viewer itself is not here** (`DECISION-062`, `MILESTONE-022` task 10).
 * It was — an index into this card's slots — which is exactly why it could only
 * ever step through this card. `CardStack` owns what is open now, because it is
 * the only thing that knows there are four cards; this component reports a
 * click through `onOpenPiece` and goes back to its own job, which is where the
 * pictures are and which one the pointer is over.
 */
const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * The width a slot actually renders at, for `srcset` selection. The stage is
 * never wider than the 1280px content column, so a slot is never wider than its
 * share of that — and the masonry's columns are smaller again, which is why one
 * number serves both layouts.
 */
function slotSizes(slot: CollageSlot): string {
  return `${Math.max(120, Math.round((slot.w / FRAME_W) * 1280))}px`;
}

/**
 * Which cell a piece takes in the phone bento, and whether it is cropped to it
 * (`MILESTONE-023` task 6).
 *
 * The grid's rows are a fixed unit (`index.css`, `.collage-bento`), so a cell
 * is a whole number of rows and there are only three shapes a piece can have:
 * one row is about 2:1, two rows is square, three rows is 2:3. The piece takes
 * whichever of those is **closest to its own shape**, measured in log ratio so
 * that "twice as wide as it should be" and "half as wide" count the same.
 *
 * `contain` is the other half, and it is what keeps this honest. The owner's
 * instruction is *"do not simply crop away important content to make it fit"*,
 * and a cell that is 25% off a piece's real shape crops a quarter of it. Rather
 * than hand-pick the pieces that can take it, anything further than that from
 * its cell is **contained** instead — it sits inside the cell whole, with the
 * card's white paper around it. A bento of mixed full-bleed and inset pieces is
 * what a well-made one looks like anyway; a bento where the logo has lost its
 * ascender is not.
 *
 * 0.22 in log terms is about 25%. Below it the crop is a trim; above it, it is
 * an edit.
 */
const BENTO_CELLS: { rows: number; ratio: number }[] = [
  { rows: 1, ratio: 2.05 },
  { rows: 2, ratio: 1.0 },
  { rows: 3, ratio: 0.67 },
];
const BENTO_DRIFT = 0.22;

function bentoRows(slot: CollageSlot): number {
  const ratio = slot.w / slot.h;
  let best = BENTO_CELLS[1]!;
  let drift = Infinity;
  for (const cell of BENTO_CELLS) {
    const d = Math.abs(Math.log(ratio / cell.ratio));
    if (d < drift) {
      drift = d;
      best = cell;
    }
  }
  return best.rows;
}

/** How far a piece's own shape is from the cell it has ended up in. */
function driftOf(slot: CollageSlot, rows: number): number {
  const cell = BENTO_CELLS.find((c) => c.rows === rows);
  // A padded cell is taller than any of the three; measure against what it is.
  const ratio = cell ? cell.ratio : BENTO_CELLS[2]!.ratio * (3 / rows);
  return Math.abs(Math.log(slot.w / slot.h / ratio));
}

export interface BentoCell {
  /** 1-based, both of them: CSS grid lines, not array indices. */
  column: number;
  colSpan?: number;
  row: number;
  rows: number;
  contain: boolean;
  fit?: "cover" | "contain";
  focus?: string;
  hidden?: boolean;
}

/**
 * Where every piece goes in the phone bento, placed rather than flowed
 * (`MILESTONE-023` task 6).
 *
 * **CSS cannot give a straight bottom edge here and this can.** `dense`
 * auto-flow fills holes in the middle of a grid, which is most of what a bento
 * needs, but the three columns still end wherever their contents end — measured
 * on card 01 at 390px, three columns finishing 55px apart, which is exactly the
 * ragged edge the owner reported. Nothing in CSS grid balances columns.
 *
 * So the placement is arithmetic, and it is the same two lines any masonry
 * uses: each piece goes in the column that is currently **shortest**, and then
 * the last piece in every short column is **grown to the common bottom**. The
 * first line keeps the columns within one cell of each other; the second closes
 * that last cell exactly. Every column ends on the same row line, which is a
 * rectangle by construction rather than by luck.
 *
 * Growing a piece changes its cell's shape, so `contain` is decided *after* the
 * padding rather than before: a piece stretched two rows past its own aspect is
 * shown whole inside its cell instead of being cropped to it.
 *
 * The DOM order is untouched — this writes `grid-column` and `grid-row`, so
 * reading order, focus order and the pin-up sequence are all still the order
 * the card is written in.
 */
function bentoPlan(slots: CollageSlot[], columns: number): BentoCell[] {
  const heights = new Array<number>(columns).fill(0);
  const plan = slots.map((slot) => {
    const rows = bentoRows(slot);
    // Find column with minimal height; if heights are close, allow organic variation
    let column = 0;
    for (let c = 1; c < columns; c += 1) {
      if (heights[c]! < heights[column]!) column = c;
    }
    const row = heights[column]!;
    heights[column] = row + rows;
    return { column: column + 1, row: row + 1, rows, contain: false };
  });

  // Natural organic bottom edge: do not artificially stretch bottom items to force a stiff rectangle
  plan.forEach((cell, i) => {
    const slot = slots[i]!;
    cell.contain = slot.fit === "contain" || driftOf(slot, cell.rows) > BENTO_DRIFT;
  });
  return plan;
}

/**
 * The order the card's pictures pin up in — a Fisher-Yates shuffle, indexed by
 * slot, so `order[i]` is slot `i`'s place in the sequence.
 *
 * Shuffled per card and per visit rather than written into the data, because a
 * fixed sequence is a choreography somebody has to author forty-eight times and
 * a reader only ever sees once. Both layouts read the same array, so a picture
 * keeps its place in the sequence whichever one is showing.
 */
function pinUpOrder(count: number): number[] {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const held = order[i] ?? i;
    order[i] = order[j] ?? j;
    order[j] = held;
  }
  return order;
}

function Picture({
  slot,
  locale,
  paused,
  contain,
  fit,
  focus,
}: {
  slot: CollageSlot;
  locale: Locale;
  paused: boolean;
  /** The bento's own verdict, which can contain a piece the design crops. */
  contain?: boolean;
  fit?: "cover" | "contain";
  focus?: string;
}) {
  const alt = slot.alt[locale];
  const sizes = slotSizes(slot);
  /*
   * The card plays the **whole film**, first frame to last, on a loop
   * (`MILESTONE-011` task 14).
   *
   * It played `video` — an eight-second cut — and the whole thing was behind a
   * click, in the viewer. The owner asked for the complete piece playing in
   * place, with no cuts and no click, so `film` is what the card gets and
   * `video` is the fallback for a slot that has no film.
   *
   * **This is a deliberate reversal of `DECISION-030` and it is not free**: the
   * five clips weigh 1.7 MB as cuts and 15.5 MB as films, and
   * `pg-gift-riona-full.mp4` is 9.1 MB of that on its own. What keeps it from
   * being 15.5 MB of page load is `LoopVideo` itself — no `<video>` element
   * exists until the card is on screen, and none of them are fetched at all
   * under `prefers-reduced-motion`. The cuts are kept in `public/videos` and in
   * the data precisely so this can be reverted in one word if the weight turns
   * out to matter more than the whole film does.
   */
  const clip = slot.film ?? slot.video;
  if (clip) {
    return <LoopVideo src={clip} poster={slot.src} alt={alt} sizes={sizes} paused={paused} fit={fit} focus={focus} />;
  }
  /*
   * The crop is steered by a custom property rather than by a generated class:
   * `focus` is data, and Tailwind can only emit utilities it can read in the
   * source. The utility here is static; only the value moves.
   */
  const isContain = fit ? fit === "contain" : (contain || slot.fit === "contain");
  return (
    <Image
      src={slot.src}
      alt={alt}
      sizes={sizes}
      className={`[object-position:var(--focus,50%_50%)] ${
        isContain ? "object-contain" : "object-cover"
      }`}
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}

/**
 * One slot, as the button that opens it.
 *
 * Module scope, deliberately. Declared inside `Collage` this is a new component
 * type on every render, so opening the viewer remounted all forty-eight
 * buttons — and the node the viewer had been told to return focus to was
 * detached by the time it tried. Focus landed on `body` instead, which is the
 * one thing a dialog must not do.
 */
function Opener({
  slot,
  locale,
  paused,
  contain,
  fit,
  focus,
  className,
  onOpen,
  onPoint,
  onUnpoint,
}: {
  slot: CollageSlot;
  locale: Locale;
  paused: boolean;
  contain?: boolean;
  fit?: "cover" | "contain";
  focus?: string;
  className: string;
  onOpen: (slot: CollageSlot, trigger: HTMLButtonElement) => void;
  onPoint: (slot: CollageSlot, event: ReactPointerEvent<HTMLButtonElement>) => void;
  onUnpoint: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        onUnpoint();
        onOpen(slot, event.currentTarget);
      }}
      onPointerEnter={(event) => onPoint(slot, event)}
      onPointerMove={(event) => onPoint(slot, event)}
      onPointerLeave={onUnpoint}
      /* `cursor-pointer`, not `cursor-zoom-in`: the owner does not want the
          magnifying glass, and the viewer this opens no longer zooms
          (`MILESTONE-010` tasks 14d and 14e). */
      className={`pg-piece block cursor-pointer outline-offset-4 ${className}`}
      style={focus ? ({ "--focus": focus } as CSSProperties) : undefined}
    >
      <Picture slot={slot} locale={locale} paused={paused} contain={contain} fit={fit} focus={focus} />
    </button>
  );
}

export default function Collage({
  slots,
  scribbles,
  locale,
  paused,
  accent,
  cardIndex,
  onOpenPiece,
}: {
  slots: CollageSlot[];
  scribbles: CollageScribble[];
  locale: Locale;
  paused: boolean;
  /**
   * The card's own colour, the one its arrows and its ruling arrive at
   * (`CollageCard.accent`). The cursor tag is painted in it
   * (`MILESTONE-014` task 5).
   */
  accent: string;
  /**
   * Which card this collage is, and what to do when one of its pieces is
   * opened (`MILESTONE-022` task 10).
   *
   * **The viewer is not here any more.** It used to be this component's state —
   * an index into *this* card's slots — which is exactly why it could only ever
   * step through this card. The owner asked to keep going into the other cards
   * from inside it, grouped by their colour, so the open piece is now
   * `CardStack`'s business: it is the only thing that knows there are four
   * cards, and it is also the thing that can scroll to one when the viewer
   * closes on a different card from the one it opened on.
   *
   * What is left here is what a collage genuinely owns: where its pieces are,
   * which one the pointer is over, and which one was clicked.
   */
  cardIndex: number;
  onOpenPiece: (card: number, slot: number, trigger: HTMLButtonElement) => void;
}) {
  const sequence = useMemo(() => pinUpOrder(slots.length), [slots]);
  /*
   * Where the notes go and how their arrows run. Worked out from the pictures
   * they name rather than written down beside them — `placeScribbles` says why.
   */
  /*
   * How many design units one CSS pixel of this card is worth. A note is drawn
   * at a fixed CSS size over a stage that is not, so `placeScribbles` cannot
   * know how big its boxes are until the stage has one: measured here and fed
   * back in, rather than assumed to be the 1280px card the type estimates were
   * taken on (`ISSUE-043`, `MILESTONE-010` task 14h).
   *
   * The first pass runs at the default, and the measurement re-places on the
   * frame after layout. That is one extra render per card on mount and one per
   * resize, and it is the difference between a note that was collision-tested
   * at its real size and one that was not.
   */
  const stageRef = useRef<HTMLDivElement>(null);
  const [unitsPerPx, setUnitsPerPx] = useState(UNITS_PER_PX_AT_1280);

  /*
   * How many columns the phone bento has. It mirrors the container query in
   * `index.css` exactly — three below a 560px card, four at or above it —
   * because the two have to agree: the query draws the columns and
   * `bentoPlan` decides what goes in them.
   *
   * Measured off the **card**, not the window, for the same reason everything
   * else on this deck is: a card is a viewport tall and its width follows the
   * deck's 16:10 cap, so a portrait tablet's card is not a phone's.
   */
  const bentoRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const el = bentoRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? 0;
      // Zero while the design layout is the one showing: keep what we had.
      if (width <= 0) return;
      setColumns(width >= 560 ? 4 : 3);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const plan = useMemo(() => {
    const mobilePlan = MOBILE_CARD_LAYOUTS[cardIndex];
    if (columns === 3 && mobilePlan) {
      return slots.map((slot) => {
        const custom = mobilePlan[slot.src];
        if (custom) {
          return {
            column: custom.col,
            colSpan: custom.colSpan ?? 1,
            row: custom.row,
            rows: custom.rows,
            contain: custom.fit ? custom.fit === "contain" : slot.fit === "contain",
            fit: custom.fit,
            focus: custom.focus,
            hidden: custom.hidden,
          };
        }
        return {
          column: 1,
          row: 1,
          rows: 4,
          contain: slot.fit === "contain",
          fit: slot.fit,
          focus: slot.focus,
        };
      });
    }
    return bentoPlan(slots, columns);
  }, [slots, columns, cardIndex]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry?.contentRect.width ?? 0;
      if (width <= 0) return;
      // Rounded, or a sub-pixel reflow re-places every note for nothing, and
      // placing a note is a seat search and an arrow routed (`ISSUE-043`).
      const next = stageUnits(width);
      setUnitsPerPx((current) => (current === next ? current : next));
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const notes = useMemo(
    () => placeScribbles(slots, scribbles, unitsPerPx),
    [slots, scribbles, unitsPerPx],
  );
  /*
   * What a slot needs for its entrance: its place in the shuffle and the angle
   * it arrives at.
   *
   * The tilt is derived from the order rather than drawn from the shuffle's own
   * stream, because it has to be *stable* — a `--pg-tilt` that changed between
   * renders would re-run the animation from a different angle — and because a
   * spread of five whole degrees over the sequence is all the variety a
   * half-second entrance can show. It settles to 0 regardless: the design's
   * positions are exact, and the tilt is how a picture arrives, not where it
   * ends up.
   *
   * The shuffle is a permutation of the slot list, so the `?? index` fallback
   * is dead — it is here because the index signature says it might not be.
   */
  const entranceOf = (index: number) => {
    const order = sequence[index] ?? index;
    return { "--pg-order": order, "--pg-tilt": `${(order % 5) - 2}deg` } as CSSProperties;
  };

  /*
   * The cursor tag, from `lib/useCursorTag` — the homepage's project cards use
   * the same one (`MILESTONE-016` task 1). It is painted in this card's own
   * colour, which is the colour its arrows and its ruling arrive at
   * (`DECISION-049`).
   */
  const { tag, onPoint: pointAt, onUnpoint } = useCursorTag({ background: accent });
  const onPoint = (slot: CollageSlot, event: ReactPointerEvent<HTMLButtonElement>) =>
    pointAt(slot.caption[locale], event);

  /*
   * A slot is still identified by its **index**, not by the object: both
   * layouts map over this same array, so one index means the same picture in
   * the design and in the masonry — and `CardStack` can address any piece on
   * any card with a pair of numbers.
   *
   * The cursor tag is dismissed on the way out, since the pointer is about to
   * be under a dialog and the tag would otherwise be left naming the piece
   * behind it.
   */
  const openSlot = (slot: CollageSlot, trigger: HTMLButtonElement) => {
    onUnpoint();
    onOpenPiece(cardIndex, slots.indexOf(slot), trigger);
  };

  return (
    <>
      {/* The design, whenever the card is wide enough to hold it. */}
      <div className="collage-design absolute inset-0 place-items-center">
        <div
          ref={stageRef}
          className="relative w-full"
          /*
            `--pg-note-px` is the note's type size, and it comes from the same
            `notePx` the placement sized its collision boxes with. `Scribble`
            reads it. Two sources for one number is how `ISSUE-043` happened:
            the notes were measured at one size and drawn at another, so every
            narrow card collision-tested a box smaller than its own ink.
          */
          style={
            {
              width: `min(100cqw, ${(FRAME_W / FRAME_H) * 100}cqh)`,
              aspectRatio: `${FRAME_W} / ${FRAME_H}`,
              "--pg-note-px": `${notePx(unitsPerPx).toFixed(2)}px`,
            } as CSSProperties
          }
        >
          {slots.map((slot, i) => {
            return (
              <div
                key={slot.src}
                className="pg-slot absolute"
                style={{
                  left: pct(slot.x, FRAME_W),
                  top: pct(slot.y, FRAME_H),
                  width: pct(slot.w, FRAME_W),
                  height: pct(slot.h, FRAME_H),
                  "--focus": slot.focus,
                  ...entranceOf(i),
                } as CSSProperties}
              >
                {slot.rotate ? (
                  /*
                   * Turned on its side, the way the design has it. The inner box
                   * swaps the outer one's sides — expressed as percentages of
                   * the outer box, which is what makes it survive any scale —
                   * and then rotates about its own centre.
                   */
                  <div
                    className="absolute left-1/2 top-1/2"
                    style={{
                      width: pct(slot.h, slot.w),
                      height: pct(slot.w, slot.h),
                      transform: `translate(-50%, -50%) rotate(${slot.rotate}deg)`,
                    }}
                  >
                    <Opener
                      slot={slot}
                      locale={locale}
                      paused={paused}
                      className="absolute inset-0"
                      onOpen={openSlot}
                      onPoint={onPoint}
                      onUnpoint={onUnpoint}
                    />
                  </div>
                ) : (
                  <Opener
                    slot={slot}
                    locale={locale}
                    paused={paused}
                    className="absolute inset-0"
                    onOpen={openSlot}
                    onPoint={onPoint}
                    onUnpoint={onUnpoint}
                  />
                )}
              </div>
            );
          })}

          {/*
            The notes live on the stage, not on the card, so one keeps its
            relationship to the picture it points at however the collage is
            contained.

            The arrows share one SVG over the whole stage, in the frame's own
            coordinates: an arrow has to start at a note measured in CSS pixels
            and end on a picture measured in design units, and drawing it in the
            design's units is what lets the far end land where the picture
            actually is. The viewBox matches the stage's aspect ratio exactly,
            so nothing is distorted by the fit.
          */}
          <svg
            aria-hidden="true"
            className="collage-scribble pointer-events-none absolute inset-0 z-[5] h-full w-full"
            viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
            fill="none"
          >
            {notes.map((note) => (
              <ScribbleArrow key={note.key} note={note} unitsPerPx={unitsPerPx} />
            ))}
          </svg>
          {notes.map((note) => (
            <Scribble key={note.key} note={note} locale={locale} />
          ))}
        </div>
      </div>

      {/*
        The same pieces as a masonry, when it is not. A card holds about a dozen
        of them at phone width and the longest frame holds fourteen, so the last
        row can run past the bottom edge — the fade turns that overflow into an
        ending rather than a cut.
      */}
      {/*
        **No notes and no arrows on a phone** (`MILESTONE-013` task 5).

        The card used to keep its first note here, in the strip beside the
        index, on the argument that the owner's voice should survive the layout
        change even when the leader line could not. The owner's instruction is
        that neither should: the masonry is a dense contact sheet of about a
        dozen pieces at phone width, and a line of handwriting laid over the top
        of it is one more thing in a frame that has no clear space left in it.
        The arrows were already gone — the SVG is inside `.collage-design`,
        which the container query switches off below 5/4 — so this is the half
        that was left.
      */}
      <div ref={bentoRef} className="collage-masonry relative h-full">
        {/*
          **The bento scrolls** (`MILESTONE-023` task 6, owner: *"some cards
          become too small on mobile, causing the image to be partially
          hidden… make the card content scrollable where appropriate, so the
          complete visual can still be viewed"*).

          Fourteen pieces at a size worth looking at do not fit a phone-height
          card, and the two ways out of that are to shrink them until they do or
          to let the card be read. The card is pinned under the header while it
          is on screen, so scrolling its contents is a natural gesture rather
          than a trap: the deck holds still, the proof sheet moves, and the page
          carries on at either end because nothing here blocks scroll chaining.

          The fade is a **sibling** of the scroller rather than a child of it.
          Inside, `bottom-0` is the bottom of the *content* — it would have sat
          under the last row and scrolled with it; outside, it stays on the
          card's own edge, where it says there is more below.
        */}
        <div className="px-3 pb-6 pt-[56px] sm:px-4 sm:pt-[68px] sm:pb-8">
          <div className="collage-bento">
            {slots.map((slot, i) => {
              const cell = plan[i]!;
              if (cell.hidden) return null;
              return (
                <div
                  key={slot.src}
                  className="pg-slot relative overflow-hidden rounded-[3px]"
                  style={{
                    gridColumn:
                      cell.colSpan && cell.colSpan > 1
                        ? `${cell.column} / span ${cell.colSpan}`
                        : cell.column,
                    gridRow: `${cell.row} / span ${cell.rows}`,
                    "--focus": cell.focus ?? slot.focus,
                    ...entranceOf(i),
                  } as CSSProperties}
                >
                  <Opener
                    slot={slot}
                    locale={locale}
                    paused={paused}
                    contain={cell.contain}
                    fit={cell.fit}
                    focus={cell.focus}
                    className="absolute inset-0"
                    onOpen={openSlot}
                    onPoint={onPoint}
                    onUnpoint={onUnpoint}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {tag}
    </>
  );
}
