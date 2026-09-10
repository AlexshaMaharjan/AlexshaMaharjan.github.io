import type { CollageScribble } from "@/lib/playground/collage";
import type { Locale } from "@/lib/i18n";
import { FRAME_H, FRAME_W } from "@/lib/playground/collage";

/**
 * A hand-written note with an arrow, over a collage card.
 *
 * The idiom is the site's own — `pages/About.tsx` has two of these beside the
 * portrait — and this is that gesture lifted out rather than copied a third
 * time: Caveat at a bold weight, tipped a couple of degrees, and an arrow drawn
 * as one cubic curve with two short strokes for the head. It is deliberately
 * *drawn*, not a glyph: an arrow character sits on the text baseline and reads
 * as punctuation, where this reads as somebody's pen.
 *
 * **Decorative, and `aria-hidden`.** The pictures carry their own alt text and
 * their own captions in the viewer; a note pointing at one of them adds the
 * owner's voice, not information a screen reader is missing. The About page's
 * two notes are hidden for the same reason.
 *
 * **Positioned in the design's coordinates, sized in CSS pixels.** The anchor
 * travels with the collage, so a note keeps its relationship to the picture it
 * points at as the stage is contained at different scales; the handwriting does
 * not shrink with it, because handwriting at 14px is not handwriting. That is
 * also why notes appear only on a card wide enough to spare the room for them —
 * a container query in `index.css`, measured on the card, like everything else
 * about this layout.
 */
export default function Scribble({ scribble, locale }: { scribble: CollageScribble; locale: Locale }) {
  const { x, y, point, align = "left", rotate = -3, tone = "ink" } = scribble;
  const colour = tone === "accent" ? "#1B3FE0" : "#2B2D31";
  const flip = point === "down-right";

  return (
    <div
      aria-hidden="true"
      className="collage-scribble pointer-events-none absolute z-[5]"
      /*
       * A right-hung note is anchored with `right`, not with `left` plus a
       * translate. An absolutely positioned box shrinks to fit the space from
       * its `left` edge to its container's right edge, so anchoring one at 98%
       * and sliding it back left gave it 2% of the stage to wrap in — the note
       * came out one word per line. Anchoring the correct edge in the first
       * place leaves the whole stage to wrap in, and the explicit line breaks
       * in the text decide where it actually breaks.
       */
      style={{
        [align === "right" ? "right" : "left"]:
          align === "right" ? `${100 - (x / FRAME_W) * 100}%` : `${(x / FRAME_W) * 100}%`,
        top: `${(y / FRAME_H) * 100}%`,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: align === "right" ? "100% 0" : "0 0",
      }}
    >
      <span
        className="block max-w-[15ch] whitespace-pre-line font-hand text-[22px] font-bold leading-[1.1]"
        style={{ color: colour, textAlign: align }}
      >
        {scribble.text[locale]}
      </span>
      {/*
        The arrow leaves the note from the side it points towards, and the
        `down-right` variant is the same curve mirrored — one path, so both
        directions are drawn by the same hand.
      */}
      <svg
        width="62"
        height="50"
        viewBox="0 0 62 50"
        fill="none"
        className="absolute top-[calc(100%-4px)]"
        style={
          flip
            ? { right: "-30px", transform: "scaleX(-1)" }
            : { left: "-30px" }
        }
      >
        <path d="M54 6 C 32 6 13 18 7 42" stroke={colour} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 42 l 14 -3" stroke={colour} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M7 42 l 3 -14" stroke={colour} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
