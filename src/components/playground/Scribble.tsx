import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";
import { FRAME_H, FRAME_W } from "@/lib/playground/collage";
import type { PlacedScribble } from "@/lib/playground/placeScribbles";

/**
 * A hand-written note over a collage card, and the arrow that gets it to its
 * picture.
 *
 * The idiom is the site's own — `pages/About.tsx` has two of these beside the
 * portrait — and this is that gesture lifted out rather than copied a third
 * time: Caveat at a bold weight, tipped a few degrees, and an arrow drawn as
 * one curve with two short strokes for the head. It is deliberately *drawn*,
 * not a glyph: an arrow character sits on the text baseline and reads as
 * punctuation, where this reads as somebody's pen.
 *
 * **Decorative, and `aria-hidden`.** The pictures carry their own alt text and
 * their own captions in the viewer; a note pointing at one of them adds the
 * owner's voice, not information a screen reader is missing. The About page's
 * two notes are hidden for the same reason.
 *
 * **Neither of these decides where it goes.** `lib/playground/placeScribbles`
 * does, from the picture the note names — see that file for why. What is left
 * here is how a note is drawn: the text at a fixed CSS size over a collage that
 * is not (handwriting at 14px is not handwriting, which is also why notes
 * appear only on a card wide enough to spare the room, a container query in
 * `index.css`), and the arrow in the design's own coordinates so that it lands
 * where the picture actually is at any scale.
 *
 * **The note answers to the card's reveal** (SESSION-037). It is written in
 * blue while the card's pictures are still black and white, and turns to that
 * card's own colour — orange, green, black or purple — once they all have their
 * colour back. One `color` on the wrapper, with the arrow drawn in
 * `currentColor` so the pen never changes hand halfway.
 */
const base = (tone: "ink" | "accent") => (tone === "accent" ? "#1B3FE0" : "#3A54C4");

export default function Scribble({ note, locale }: { note: PlacedScribble; locale: Locale }) {
  return (
    <div
      aria-hidden="true"
      className="collage-scribble pg-tint pointer-events-none absolute z-[6]"
      /*
       * A right-hung note is anchored with `right`, not with `left` plus a
       * translate. An absolutely positioned box shrinks to fit the space from
       * its `left` edge to its container's right edge, so anchoring one at 98%
       * and sliding it back left gave it 2% of the stage to wrap in — the note
       * came out one word per line. Anchoring the correct edge in the first
       * place leaves the whole stage to wrap in, and the explicit line breaks
       * in the text decide where it actually breaks.
       */
      style={
        {
          "--pg-tint-base": base(note.tone),
          [note.align === "right" ? "right" : "left"]:
            note.align === "right" ? `${100 - (note.x / FRAME_W) * 100}%` : `${(note.x / FRAME_W) * 100}%`,
          top: `${(note.y / FRAME_H) * 100}%`,
          transform: `rotate(${note.rotate}deg)`,
          transformOrigin: note.align === "right" ? "100% 0" : "0 0",
        } as CSSProperties
      }
    >
      <span
        className="block max-w-[15ch] whitespace-pre-line font-hand text-[22px] font-bold leading-[1.1]"
        style={{ textAlign: note.align }}
      >
        {note.text[locale]}
      </span>
    </div>
  );
}

/**
 * One note's arrow, as a `<g>` for the stage-wide SVG in `Collage`.
 *
 * It lives in that SVG rather than beside its note because it is drawn in the
 * frame's coordinates — that is the only way a line can start at the note and
 * end on the picture when the two are measured in different units. The stroke
 * is `non-scaling-stroke`, so a 2.2px pen stays a 2.2px pen however far the
 * collage is scaled down.
 */
export function ScribbleArrow({ note }: { note: PlacedScribble }) {
  return (
    <g
      className="pg-tint"
      style={{ "--pg-tint-base": base(note.tone) } as CSSProperties}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d={note.arrow.path} vectorEffect="non-scaling-stroke" />
      <path d={note.arrow.head} vectorEffect="non-scaling-stroke" />
    </g>
  );
}
