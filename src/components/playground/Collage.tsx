import { useRef, useState, type CSSProperties } from "react";
import Image from "@/components/ui/Image";
import Lightbox from "@/components/ui/Lightbox";
import LoopVideo from "@/components/ui/LoopVideo";
import Scribble from "@/components/playground/Scribble";
import type { Locale } from "@/lib/i18n";
import { FRAME_H, FRAME_W, type CollageScribble, type CollageSlot } from "@/lib/playground/collage";

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

function Picture({ slot, locale, paused }: { slot: CollageSlot; locale: Locale; paused: boolean }) {
  const alt = slot.alt[locale];
  const sizes = slotSizes(slot);
  if (slot.video) {
    return <LoopVideo src={slot.video} poster={slot.src} alt={alt} sizes={sizes} paused={paused} />;
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
  locale,
  paused,
  className,
  onOpen,
}: {
  slot: CollageSlot;
  locale: Locale;
  paused: boolean;
  className: string;
  onOpen: (slot: CollageSlot, trigger: HTMLButtonElement) => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => onOpen(slot, event.currentTarget)}
      className={`block cursor-zoom-in outline-offset-4 ${className}`}
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
}: {
  slots: CollageSlot[];
  scribbles: CollageScribble[];
  locale: Locale;
  paused: boolean;
}) {
  const [open, setOpen] = useState<CollageSlot | null>(null);
  /*
   * `Lightbox` returns focus to whatever opened it only if the caller says
   * where that was — it cannot know, and each slot appears in both layouts.
   */
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openSlot = (slot: CollageSlot, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpen(slot);
  };

  const close = () => {
    setOpen(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  };

  return (
    <>
      {/* The design, whenever the card is wide enough to hold it. */}
      <div className="collage-design absolute inset-0 place-items-center">
        <div
          className="relative w-full"
          style={{ width: `min(100cqw, ${(FRAME_W / FRAME_H) * 100}cqh)`, aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
        >
          {slots.map((slot) => {
            const style = { "--focus": slot.focus } as CSSProperties;
            return (
              <div
                key={slot.src}
                className="absolute"
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
                    <Opener slot={slot} locale={locale} paused={paused} className="absolute inset-0" onOpen={openSlot} />
                  </div>
                ) : (
                  <Opener slot={slot} locale={locale} paused={paused} className="absolute inset-0" onOpen={openSlot} />
                )}
              </div>
            );
          })}

          {/*
            The notes live on the stage, not on the card, so one keeps its
            relationship to the picture it points at however the collage is
            contained.
          */}
          {scribbles.map((scribble) => (
            <Scribble key={scribble.text.en} scribble={scribble} locale={locale} />
          ))}
        </div>
      </div>

      {/*
        The same pieces as a masonry, when it is not. A card holds about a dozen
        of them at phone width and the longest frame holds fourteen, so the last
        row can run past the bottom edge — the fade turns that overflow into an
        ending rather than a cut.
      */}
      <div className="collage-masonry relative h-full overflow-hidden px-3 pt-[68px]">
        {/*
          A note reaches a phone too, but without its arrow. The masonry is a
          dense contact sheet with no clear space to point across, so the card's
          first note sits in the strip beside the index instead — the owner's
          voice survives the layout change, the leader line does not.
        */}
        {scribbles[0] ? (
          <span
            aria-hidden="true"
            className="absolute left-16 top-4 z-[5] whitespace-pre-line font-hand text-[19px] font-bold leading-[1.05] text-[#2B2D31] [transform:rotate(-3deg)]"
          >
            {scribbles[0].text[locale]}
          </span>
        ) : null}
        <div className="collage-columns gap-1.5 [column-fill:balance]">
          {slots.map((slot) => {
            const style = { "--focus": slot.focus } as CSSProperties;
            return (
              <div
                key={slot.src}
                className="relative mb-1.5 w-full break-inside-avoid overflow-hidden rounded-[3px]"
                style={{ aspectRatio: `${slot.w} / ${slot.h}`, ...style }}
              >
                <Opener slot={slot} locale={locale} paused={paused} className="absolute inset-0" onOpen={openSlot} />
              </div>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-page to-transparent"
        />
      </div>

      {open ? (
        <Lightbox
          src={open.src}
          video={open.video}
          alt={open.alt[locale]}
          caption={open.caption[locale]}
          description={open.alt[locale]}
          onClose={close}
        />
      ) : null}
    </>
  );
}
