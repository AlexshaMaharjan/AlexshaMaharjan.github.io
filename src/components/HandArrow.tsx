
/**
 * The owner's own arrow, traced from the Figma file rather than drawn to
 * resemble it (`MILESTONE-019` task 5).
 *
 * The site had two different hand-drawn arrows — one pair beside the About
 * portrait, one generated per note over the playground collages — and neither
 * matched the ten the owner annotated their own frames with. The difference was
 * never the curve. It was the pen:
 *
 * | | the owner's | what the site drew |
 * | --- | --- | --- |
 * | Stroke | 60 units on a 713-unit box — **8.4%** | 2.2px on a 66-unit box scaled to 45 — **3.3%** |
 * | Reach | a long sweeping C, most of a quadrant | a 40px tick with one shallow bend |
 * | Head | two arms about **25%** of the whole arrow | two 14-unit arms, ~21% of a much smaller arrow |
 *
 * At those weights one reads as somebody's marker and the other as a hairline
 * callout on a technical drawing, which is what the owner was looking at when
 * they said the arrows looked different from the file.
 *
 * So this is `305:101` on page 2 of the Figma file, verbatim: its own 713 x 972
 * box, its own control points, its own 60-unit stroke, its own round caps. The
 * box already carries the ~30 units of padding the caps need, so nothing clips.
 * Everything a caller changes is outside the drawing — how wide it is, which
 * way it faces, and what colour of ink it is in.
 *
 * **It never sets its own position.** Where an arrow goes, and — the other half
 * of task 5 — how much air there is between it and the words it belongs to, is
 * the caller's business: `About` uses flex gaps, the playground works it out in
 * design units (`placeScribbles`). An arrow that positioned itself would have
 * to guess at the one measurement the owner was most specific about.
 */

/**
 * Which way the head points.
 *
 * The traced arrow runs tail-top-right to head-bottom-left, so `down-left` is
 * the drawing as it is in the file and the other three are it mirrored. A
 * mirrored hand-drawn line still reads as hand-drawn — the tell is the varying
 * curvature, which mirroring keeps — where a rotated one does not, because the
 * thick-to-thin of the sweep ends up running against gravity.
 */
export type ArrowDirection = "down-left" | "down-right" | "up-left" | "up-right";

const FLIP: Record<ArrowDirection, string | undefined> = {
  "down-left": undefined,
  "down-right": "scaleX(-1)",
  "up-left": "scaleY(-1)",
  "up-right": "scale(-1, -1)",
};

/**
 * Which drawing.
 *
 * **`sweep`** is `305:101` from the Figma file, verbatim — a long C across most
 * of a quadrant, for a note that stands well back from its subject. It is what
 * the About portrait's two notes use.
 *
 * **`tick`** is the short one, and it exists because the site had a third arrow
 * hidden in `PlaygroundPeek`: a 52 x 30 drawing at a **2.2px** stroke, which is
 * about 4% of the weight the owner's own annotations carry and was easily the
 * thinnest line on the site. It was there for a good reason — a note sitting
 * beside a button 60px away has nowhere to put a 71px-tall C — and the fix is
 * to draw that reason properly rather than to keep a hairline for it.
 *
 * So `tick` is the same pen at the same proportion (7 units on 120, about 6%,
 * inside the 4.6-8.4% the traced arrows measure) over a shallow, mostly
 * horizontal run with a head about a quarter of its length. Same hand, shorter
 * sentence.
 */
export type ArrowShape = "sweep" | "tick";

interface Drawing {
  /** `viewBox` width and height. */
  w: number;
  h: number;
  /** The shaft and the head, as one `d`. */
  d: string;
  stroke: number;
}

/**
 * Both drawings run **tail-first to a head at the bottom left**, which is what
 * lets one `FLIP` table serve both: `down-left` is the drawing as it is, and
 * the other three are it mirrored.
 */
const SHAPES: Record<ArrowShape, Drawing> = {
  sweep: {
    w: 713,
    h: 972,
    d: "M673.6 30C713.1 283 641.8 789 40.6 789M233.9 942L40.6 789L196.5 561",
    stroke: 60,
  },
  tick: {
    w: 120,
    h: 54,
    d: "M112 11C86 5 40 16 12 39M12 39L37 32M12 39L24 16",
    stroke: 7,
  },
};

/**
 * The smallest this arrow may be drawn, in CSS pixels
 * (`MILESTONE-020` task 3: *"i want the arrow to not be so small at times"*).
 *
 * The traced drawing is a long sweeping C whose head is about a quarter of it.
 * At the 34px the About page asked for, that head is **8px of ink across two
 * arms** — under a fifth of the note it belongs to — and the sweep is
 * compressed into something the eye reads as a hook or a fishing line rather
 * than as an arrow. That is most of what "the arrow below my photo looks
 * weird" was.
 *
 * 48 is where the `sweep` head passes 12px, which is roughly the height of a
 * lowercase letter in the note beside it: an annotation and its arrow drawn at
 * the same weight, which is how somebody actually annotates a page.
 *
 * `tick` floors higher, at 60, and that is not inconsistent — it is the same
 * promise stated for a flatter drawing. Its head is a quarter of a run that is
 * *mostly horizontal*, so a given width buys it less ink than the same width
 * buys the C; 60 is where its arms reach the same 12px.
 *
 * Both are floors rather than sizes, so a caller that wants a bigger one still
 * gets it and a caller that forgets simply cannot get a speck.
 */
const MIN_WIDTH: Record<ArrowShape, number> = { sweep: 48, tick: 60 };

export default function HandArrow({
  direction = "down-left",
  shape = "sweep",
  width,
  className,
}: {
  direction?: ArrowDirection;
  shape?: ArrowShape;
  /**
   * In CSS pixels. The stroke is a fixed proportion of it — 8.4% for `sweep`,
   * 6% for `tick` — so an arrow is never a different weight from itself.
   * Clamped up to this shape's `MIN_WIDTH`; see there.
   */
  width: number;
  className?: string;
}) {
  const drawing = SHAPES[shape];
  const w = Math.max(MIN_WIDTH[shape], width);
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={Math.round((w * drawing.h) / drawing.w)}
      viewBox={`0 0 ${drawing.w} ${drawing.h}`}
      fill="none"
      className={className}
      style={{ transform: FLIP[direction] }}
    >
      <path
        d={drawing.d}
        stroke="currentColor"
        strokeWidth={drawing.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
