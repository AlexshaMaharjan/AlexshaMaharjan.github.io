import type { CSSProperties } from "react";
import Image from "@/components/ui/Image";
import LoopVideo from "@/components/ui/LoopVideo";
import type { Locale } from "@/lib/i18n";
import { FRAME_H, FRAME_W, type CollageSlot } from "@/lib/playground/collage";

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

export default function Collage({
  slots,
  locale,
  paused,
}: {
  slots: CollageSlot[];
  locale: Locale;
  paused: boolean;
}) {
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
                    <Picture slot={slot} locale={locale} paused={paused} />
                  </div>
                ) : (
                  <Picture slot={slot} locale={locale} paused={paused} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/*
        The same pieces as a masonry, when it is not. A card holds about a dozen
        of them at phone width and the longest frame holds fourteen, so the last
        row can run past the bottom edge — the fade turns that overflow into an
        ending rather than a cut.
      */}
      <div className="collage-masonry relative h-full overflow-hidden px-3 pt-12">
        <div className="collage-columns gap-1.5 [column-fill:balance]">
          {slots.map((slot) => {
            const style = { "--focus": slot.focus } as CSSProperties;
            return (
              <div
                key={slot.src}
                className="relative mb-1.5 w-full break-inside-avoid overflow-hidden rounded-[3px]"
                style={{ aspectRatio: `${slot.w} / ${slot.h}`, ...style }}
              >
                <Picture slot={slot} locale={locale} paused={paused} />
              </div>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-page to-transparent"
        />
      </div>
    </>
  );
}
