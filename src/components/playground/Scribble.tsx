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
 * here is how a note is drawn: the text in CSS pixels over a collage measured
 * in design units, and the arrow in the design's own coordinates so that it
 * lands where the picture actually is at any scale.
 *
 * **The size comes from `--pg-note-px`, which `Collage` sets from
 * `placeScribbles.notePx`.** It is 22px on a normal desktop card and eases
 * down to 18 on the narrowest card that shows notes at all — see `notePx` for
 * why a fixed size made the narrow cards unplaceable. The floor is 18 because
 * handwriting at 14px is not handwriting, which is also why notes appear only
 * on a card wide enough to spare the room (a container query in `index.css`).
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
          top: `${((note.y + (note.textOffsetY ?? 0)) / FRAME_H) * 100}%`,
          transform: `rotate(${note.rotate}deg)`,
          transformOrigin: note.align === "right" ? "100% 0" : "0 0",
        } as CSSProperties
      }
    >
      <span
        className="pencil-ink block max-w-[24ch] whitespace-pre-line font-hand text-[length:var(--pg-note-px,22px)] font-bold leading-[1.1]"
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
 * end on the picture when the two are measured in different units.
 *
 * **The pen is 4 CSS px, converted into design units rather than declared with
 * `vector-effect: non-scaling-stroke`** (`MILESTONE-020` task 3). It was the
 * latter, which is the right answer when nothing knows the scale — and since
 * `MILESTONE-010` task 14h something does: `Collage` measures the stage and
 * feeds `unitsPerPx` to the placement, so the same number can size the stroke.
 *
 * The reason to change it is the pencil. `non-scaling-stroke` takes the stroke
 * out of user space and draws it at device resolution, while a filter's
 * `feDisplacementMap` moves ink *in* user space — so the roughening had nothing
 * predictable to act on and came out invisible at the collage's scale. Written
 * as real geometry, the pen is 4px wide for the same reason it was before and
 * the filter displaces it by the 1.6px it is asked for.
 *
 * **Drawn with the pencil** (`MILESTONE-020` task 3). The filter comes from the
 * card rather than from here, and has to: `feTurbulence`'s grain is stated in
 * the *user space* of what it filters, and this SVG's user space is the
 * 16000 x 10000 design frame, so the conversion needs the card's own
 * `unitsPerPx` — which `Collage` has and a single note does not. One filter
 * serves every arrow on a card, which is right rather than merely cheap: they
 * are drawn on one sheet of paper and share its grain.
 *
 * **4px, not 2.2** (`MILESTONE-019` task 5). The owner's own annotations are
 * drawn at a stroke width of 60 units in a frame where the whole arrow is
 * 700–1,300 units across — between 4.6% and 8.4% of the arrow's own width. At
 * 2.2px on a shaft that runs 80–125px, this pen was about 2%, which is the
 * difference between somebody's marker and a hairline callout, and it is most
 * of why these did not look like the file they came from.
 */
/** The pen, in CSS pixels. See the note above on why this is not `vector-effect`. */
const PEN_PX = 3;

export function ScribbleArrow({
  note,
  unitsPerPx,
}: {
  note: PlacedScribble;
  pencil?: string;
  /** Design units to one CSS pixel on this card's stage, from `Collage`. */
  unitsPerPx: number;
}) {
  return (
    <g
      className="pg-tint"
      style={{ "--pg-tint-base": base(note.tone) } as CSSProperties}
      stroke="currentColor"
      strokeWidth={PEN_PX * unitsPerPx}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d={note.arrow.path} />
      <path d={note.arrow.head} />
    </g>
  );
}
