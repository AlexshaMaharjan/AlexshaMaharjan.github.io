import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "@/components/ui/Image";
import Lightbox from "@/components/ui/Lightbox";
import LoopVideo from "@/components/ui/LoopVideo";
import Scribble, { ScribbleArrow } from "@/components/playground/Scribble";
import type { Locale } from "@/lib/i18n";
import { FRAME_H, FRAME_W, type CollageScribble, type CollageSlot } from "@/lib/playground/collage";
import { notePx, placeScribbles, stageUnits, UNITS_PER_PX_AT_1280 } from "@/lib/playground/placeScribbles";

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
 * **The card arrives in black and white** (SESSION-037). Every slot carries a
 * `--pg-order` — its place in an order shuffled once per card, per visit — and
 * the card's scroll runway drives `--pg-reveal` against it, so the pictures get
 * their colour back one at a time and in a different sequence each time anyone
 * comes. The arithmetic is all in `index.css`; the only thing this file decides
 * is who is next.
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
 * under it, and plays the clips with their controls. `ui/Lightbox` already owned
 * the dialog — the scroll lock, the focus trap, the z-index that clears the
 * fixed header — so it learned about video rather than being duplicated.
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
 * The order the card's pictures come back in — a Fisher-Yates shuffle, indexed
 * by slot, so `order[i]` is slot `i`'s place in the sequence.
 *
 * Shuffled per card and per visit rather than written into the data, because a
 * fixed sequence is a choreography somebody has to author forty-eight times and
 * a reader only ever sees once. Both layouts read the same array, so a picture
 * keeps its place in the sequence whichever one is showing.
 */
function revealOrder(count: number): number[] {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const held = order[i] ?? i;
    order[i] = order[j] ?? j;
    order[j] = held;
  }
  return order;
}

function Picture({ slot, locale, paused }: { slot: CollageSlot; locale: Locale; paused: boolean }) {
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
    return <LoopVideo src={clip} poster={slot.src} alt={alt} sizes={sizes} paused={paused} />;
  }
  /*
   * The crop is steered by a custom property rather than by a generated class:
   * `focus` is data, and Tailwind can only emit utilities it can read in the
   * source. The utility here is static; only the value moves.
   */
  return <Image src={slot.src} alt={alt} sizes={sizes} className="object-cover [object-position:var(--focus,50%_50%)]" />;
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
  order,
  locale,
  paused,
  className,
  onOpen,
  onPoint,
  onUnpoint,
}: {
  slot: CollageSlot;
  /** This slot's place in its card's reveal sequence (`revealOrder`). */
  order: number;
  locale: Locale;
  paused: boolean;
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
      style={{ "--pg-order": order } as CSSProperties}
      /* `cursor-pointer`, not `cursor-zoom-in`: the owner does not want the
          magnifying glass, and the viewer this opens no longer zooms
          (`MILESTONE-010` tasks 14d and 14e). */
      className={`pg-piece block cursor-pointer outline-offset-4 ${className}`}
    >
      <Picture slot={slot} locale={locale} paused={paused} />
    </button>
  );
}

export default function Collage({
  slots,
  scribbles,
  locale,
  paused,
  accent,
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
}) {
  /*
   * **An index, not a slot** (`MILESTONE-014` task 3). The viewer steps through
   * the card now, so what is open has to be a position in a sequence rather
   * than the object at it. Both layouts map over this same `slots` array, so
   * one index means the same picture in the design and in the masonry.
   */
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : slots[openIndex] ?? null;
  /*
   * `Lightbox` returns focus to whatever opened it only if the caller says
   * where that was — it cannot know, and each slot appears in both layouts.
   */
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const sequence = useMemo(() => revealOrder(slots.length), [slots]);
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
  /* The shuffle is a permutation of the slot list, so the fallback is dead —
     it is here because the index signature says it might not be. */
  const orderOf = (index: number) => sequence[index] ?? index;

  /*
   * The cursor tag. Its text is state because it changes once per slot; its
   * position is written straight onto the node, because that changes on every
   * pointer event and re-rendering a dozen pictures to move a label two pixels
   * is not a trade worth making. The node is always mounted so that the first
   * `pointerenter` has somewhere to put the coordinates — rendering it with the
   * label would place it at 0,0 for one frame before the first move.
   */
  const [tag, setTag] = useState<string | null>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  const onPoint = (slot: CollageSlot, event: ReactPointerEvent<HTMLButtonElement>) => {
    // A touch "hover" is a tap on its way to opening the viewer, and a pen is
    // no better placed to read a label under its own nib.
    if (event.pointerType !== "mouse") return;
    const el = tagRef.current;
    if (el) {
      // Kept inside the window: a slot at the right edge would otherwise hang
      // its own name off the side of the screen.
      const x = Math.max(12, Math.min(event.clientX + 18, window.innerWidth - el.offsetWidth - 12));
      const y = Math.max(12, Math.min(event.clientY + 20, window.innerHeight - el.offsetHeight - 12));
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    const name = slot.caption[locale];
    setTag((current) => (current === name ? current : name));
  };

  const onUnpoint = () => setTag(null);

  const openSlot = (slot: CollageSlot, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenIndex(slots.indexOf(slot));
  };

  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  };

  /*
   * Stepping wraps, because a collage is a loop and not a list: there is no
   * first or last picture on a card, only the one you started at. The cursor
   * tag is dismissed on the way, since the pointer has not moved and the tag
   * would otherwise still be naming the piece you just stepped away from.
   */
  const step = (delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + slots.length) % slots.length;
    });
    setTag(null);
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
            const style = { "--focus": slot.focus } as CSSProperties;
            return (
              <div
                key={slot.src}
                className="pg-slot absolute"
                style={{
                  left: pct(slot.x, FRAME_W),
                  top: pct(slot.y, FRAME_H),
                  width: pct(slot.w, FRAME_W),
                  height: pct(slot.h, FRAME_H),
                  ...style,
                }}
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
                      order={orderOf(i)}
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
                    order={orderOf(i)}
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
              <ScribbleArrow key={note.key} note={note} />
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
      <div className="collage-masonry relative h-full overflow-hidden px-3 pt-[68px]">
        <div className="collage-columns gap-1.5 [column-fill:balance]">
          {slots.map((slot, i) => {
            const style = { "--focus": slot.focus } as CSSProperties;
            return (
              <div
                key={slot.src}
                className="pg-slot relative mb-1.5 w-full break-inside-avoid overflow-hidden rounded-[3px]"
                style={{ aspectRatio: `${slot.w} / ${slot.h}`, ...style }}
              >
                <Opener
                  slot={slot}
                  order={orderOf(i)}
                  locale={locale}
                  paused={paused}
                  className="absolute inset-0"
                  onOpen={openSlot}
                  onPoint={onPoint}
                  onUnpoint={onUnpoint}
                />
              </div>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="pg-fade pointer-events-none absolute inset-x-0 bottom-0 h-16"
        />
      </div>

      {createPortal(
        <div
          ref={tagRef}
          aria-hidden="true"
          /*
           * The card's own colour, not the site's ink (`MILESTONE-014` task 5).
           * The tag names a picture on a particular card, and every other mark
           * that belongs to a card — its arrows, its notes, its index, its
           * ruling — arrives at that card's accent. The tag was the one thing
           * left in the site's near-black.
           *
           * Mixed 12% towards the ink rather than used neat, for one card:
           * card 1's orange is 3.9:1 against white, which is under AA for
           * 12.5px text, and 88% of it is 4.8:1. The other three are 5.3:1 or
           * better neat and lose nothing they can be seen to lose. One rule
           * rather than a per-card exception, so a fifth card cannot arrive
           * with an illegible tag.
           */
          className="pg-cursor-tag whitespace-nowrap rounded-full px-3.5 py-2 text-[12.5px] font-medium leading-none text-white shadow-[0_8px_24px_rgba(10,16,36,0.34)] transition-opacity duration-150"
          style={{
            opacity: tag ? 1 : 0,
            backgroundColor: accent,
            // A flat 12% of ink over the colour. Written as a gradient rather
            // than as `color-mix` so the two declarations cannot be reordered
            // into the shorthand resetting the overlay.
            backgroundImage: "linear-gradient(rgba(10,10,12,0.12), rgba(10,10,12,0.12))",
          }}
        >
          {tag}
        </div>,
        document.body,
      )}

      {open && openIndex !== null ? (
        <Lightbox
          src={open.src}
          video={open.film ?? open.video}
          loopVideo={!open.film}
          alt={open.alt[locale]}
          caption={open.caption[locale]}
          description={open.alt[locale]}
          zoomable={false}
          position={[openIndex + 1, slots.length]}
          onPrev={slots.length > 1 ? () => step(-1) : undefined}
          onNext={slots.length > 1 ? () => step(1) : undefined}
          onClose={close}
        />
      ) : null}
    </>
  );
}
