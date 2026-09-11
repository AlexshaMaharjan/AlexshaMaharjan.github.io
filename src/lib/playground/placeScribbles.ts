import type { Locale } from "@/lib/i18n";
import { FRAME_H, FRAME_W, type CollageScribble, type CollageSlot } from "./collage";

/**
 * Where each hand-written note goes, and the arrow that gets it to its picture
 * (`SESSION-038`).
 *
 * The notes used to carry their own `x`/`y`, placed by looking at the card, and
 * three sessions of that produced a pattern nobody chose: every card had a note
 * in the top-left and another anchored at x=15700 in the top-right, and the
 * arrows were a fixed 62x50 stub that pointed in the general direction of
 * nothing. A note is supposed to be somebody leaning over the page — that read
 * as a template.
 *
 * So a note now names the **picture** it is about and this works out where it
 * can go: eight positions around that picture, scored against every slot on the
 * card, the corners the index and the motion control sit in, and the notes
 * already placed. The first direction each note tries is derived from its own
 * text, so two notes on one card start looking in different places and the
 * scatter differs from card to card without anyone placing a pixel.
 *
 * **Deterministic, not random.** The order the pictures come back in is
 * shuffled per visit because that is a surprise worth having twice; a note that
 * moved every reload — or every resize — would just look unstable. The seed is
 * the note's own text, so the placement is stable for as long as the words are.
 *
 * **Everything here is design units** — the 16000 x 10000 Figma frame — because
 * that is what the slots are in and what the arrow SVG is drawn in. The note
 * itself is fixed CSS pixels, so its size here is an estimate; it is used for
 * collision and for where the arrow leaves the ink, and both are gestures with
 * a few hundred units of slack in them.
 */

/**
 * A line of 22px Caveat, and a character of it, **in CSS pixels**.
 *
 * These were design units until `MILESTONE-010` task 14h, which meant they were
 * only right at one card width. A note is drawn at a fixed CSS size over a
 * stage that is not, so a fixed number of design units is a different number of
 * pixels on every card: the estimates were taken on a 1280px stage and every
 * narrower card collision-tested a box smaller than the note it drew
 * (`ISSUE-043`). In pixels they are a property of the type, and
 * `unitsPerPixel` converts them for whatever stage the card actually has.
 *
 * `MAX_CH` is the note's own `max-w-[15ch]`, and it is why a row is not the
 * same thing as a line: "holographic watch," is eighteen characters and comes
 * out as two rows however it was typed.
 */
const LINE_PX = 26;
const CHAR_PX = 9.3;

/**
 * The note's type size, in CSS pixels, for a stage this wide
 * (`MILESTONE-012` task 2).
 *
 * **A note is fixed-size type over a card that is not, and that is what made
 * the narrow cards unsolvable.** Three lines of 22px Caveat are the same three
 * lines whatever the card measures, so on a 900px stage they cover nearly
 * twice the *share* of the collage that they cover on a 1,300px one. Sweeping
 * the widths showed exactly that shape: eight of the eleven notes draw a clean
 * 80–120px arrow at every width, and the three that fail fail **only below
 * about 1,100px** — cards 1, 3 and 4, where the note had grown until no seat
 * was both in the corner the owner asked for and far enough from the picture
 * to draw an arrow. Card 1's calendar note drew three pixels of ink.
 *
 * Shrinking the note is what gives the seat search its room back. 18px at the
 * 900px stage where notes first appear, rising to the full 22 by 1,180 — and
 * 18 rather than 15 because this is handwriting and there is a size below
 * which handwriting stops reading as handwriting. It takes the worst arrow on
 * the deck from 3px to 17px and leaves nine of the eleven notes in their
 * corner at every width.
 *
 * **`Collage` sets the type size from this same function**, as
 * `--pg-note-px` on the stage. That is not tidiness: the sizes here are what
 * the placement collision-tests against, and a note drawn at a size this file
 * did not predict is `ISSUE-043` again — a box tested smaller than the ink
 * that lands on the page.
 */
export const NOTE_PX = 22;
const NOTE_PX_NARROW = 18;
const NOTE_FULL_STAGE = 1180;
const NOTE_NARROW_STAGE = 900;

export function notePx(unitsPerPx: number): number {
  const stage = FRAME_W / unitsPerPx;
  const t = Math.min(1, Math.max(0, (stage - NOTE_NARROW_STAGE) / (NOTE_FULL_STAGE - NOTE_NARROW_STAGE)));
  return NOTE_PX_NARROW + (NOTE_PX - NOTE_PX_NARROW) * t;
}
/**
 * The note's own wrap, from `max-w-[15ch]` on the span in `Scribble`.
 *
 * **A line longer than this wraps, in both locales, and the note gets taller**
 * — which `sizeOf` models correctly and an author reading the data does not.
 * "event flyer, / pink on black" is two lines in English and was four once
 * `Veranstaltungsflyer,` wrapped, so the placement was solving for a note half
 * as tall again as the one anybody had written. Keep both locales' lines inside
 * 15 characters unless the extra row is the intention.
 */
const MAX_CH = 15;

/**
 * Design units to one CSS pixel on a 1280px stage — the width these estimates
 * were originally taken at, and the default when nothing has been measured yet.
 */
export const UNITS_PER_PX_AT_1280 = FRAME_W / 1280;

/**
 * Design units to one CSS pixel for a stage this wide, **quantised**.
 *
 * A quarter of a unit, which is about twenty pixels of card width around the
 * 1280 mark. Placement is a search over forty seats and a routing pass over
 * every arrow (`ISSUE-043`), and it costs a few milliseconds a card: re-running
 * it on every sub-pixel reflow of a window drag is the one way this gets
 * expensive. Nothing here is accurate to a quarter unit anyway — the note's
 * size is an estimate from the type's metrics and `MARGIN` alone carries 340
 * units of slack.
 *
 * The audit measures what ships, so it rounds through here too.
 */
export function stageUnits(width: number): number {
  return Math.round((FRAME_W / width) * 4) / 4;
}
/**
 * Air between a note and the picture it is about.
 *
 * It is set by the arrow rather than by the note: at 380 the two boxes were
 * almost touching and the arrow came out a 40px stub with nowhere to bend. This
 * is roughly the length the old hand-drawn arrow was, which is the length a
 * curve needs to read as one.
 */
const GAP = 850;

/**
 * How far out to stand off, when the ring at `GAP` is full.
 *
 * The first cut tried eight positions at one distance and took the least bad,
 * and on a dense card that meant writing over a picture: every seat at the
 * table was taken, so it sat on one. A note about a picture in a crowd has to
 * be allowed to stand back from it — the arrow is what keeps the connection, and
 * a longer arrow is a better outcome than a note nobody can read.
 */
const RINGS = [1, 1.6, 2.4, 3.2, 4.2];
/** Extra clearance when testing a note against something it must not touch. */
const CLEAR = 260;
/**
 * How close to the card's edge a note may sit.
 *
 * Generous, because the note is fixed CSS pixels and this is design units: the
 * same three lines are 660 units tall on a 1280px stage and 890 on a 900px one,
 * so a margin that only just clears at the wide end clips at the narrow one.
 */
const MARGIN = 340;

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PlacedScribble {
  key: string;
  text: Record<Locale, string>;
  tone: "ink" | "accent";
  /** The anchored edge, in design units — `align` says which edge it is. */
  x: number;
  /** The top of the note, in design units. */
  y: number;
  /**
   * Which edge `x` anchors. The note is anchored on the side *away* from its
   * picture so it grows outwards into the space it was given, and an absolutely
   * positioned box only has room to wrap between its anchored edge and the far
   * side of the stage — anchoring the wrong one gives a right-hand note two
   * percent of the card to wrap in and one word per line.
   */
  align: "left" | "right";
  rotate: number;
  /** The arrow, in design units: one flowing curve and a two-stroke head. */
  arrow: { path: string; head: string };
  /** The stroke flattened, in design units. Exported for the arc-fidelity check. */
  samples: Point[];
}

/** FNV-1a. The seed is the note's own words, so a note keeps its place. */
function seedOf(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** A stable stream of 0..1 from one seed. */
function streamOf(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 100000) / 100000;
  };
}

/**
 * Diagonals first: a note tucked into the corner of a picture reads as
 * somebody's hand, where one squared off directly above it reads as a caption.
 */
const DIRS: ReadonlyArray<readonly [number, number]> = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function sizeOf(text: Record<Locale, string>, unitsPerPx: number): { w: number; h: number } {
  // Both locales, because a note keeps its place when the page changes language
  // and German is reliably the longer of the two.
  const rowsIn = (value: string) =>
    value.split("\n").reduce((rows, line) => rows + Math.max(1, Math.ceil(line.length / MAX_CH)), 0);
  const widestIn = (value: string) =>
    value.split("\n").reduce((most, line) => Math.max(most, Math.min(line.length, MAX_CH)), 0);
  // `LINE_PX` and `CHAR_PX` are the metrics of 22px Caveat, so a note set at
  // any other size is those metrics scaled — see `notePx`.
  const k = notePx(unitsPerPx) / NOTE_PX;
  return {
    w: Math.max(widestIn(text.en), widestIn(text.de)) * CHAR_PX * k * unitsPerPx,
    h: Math.max(rowsIn(text.en), rowsIn(text.de)) * LINE_PX * k * unitsPerPx,
  };
}

function boxAt(
  target: Rect,
  size: { w: number; h: number },
  [dx, dy]: readonly [number, number],
  ring: number,
): Rect {
  const gap = GAP * ring;
  const x = dx < 0 ? target.x - gap - size.w : dx > 0 ? target.x + target.w + gap : target.x + target.w / 2 - size.w / 2;
  const y = dy < 0 ? target.y - gap - size.h : dy > 0 ? target.y + target.h + gap : target.y + target.h / 2 - size.h / 2;
  return { x, y, w: size.w, h: size.h };
}


/** The point on a box's edge facing `toward`, pulled `inset` back inside it. */
function edgePoint(box: Rect, toward: { x: number; y: number }, inset: number) {
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const dx = toward.x - cx;
  const dy = toward.y - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const scale =
    Math.min(dx === 0 ? Infinity : box.w / 2 / Math.abs(dx), dy === 0 ? Infinity : box.h / 2 / Math.abs(dy)) *
    (1 - inset);
  return { x: cx + dx * scale, y: cy + dy * scale };
}

/**
 * How far short of the picture the arrowhead stops, in **CSS pixels**
 * (`MILESTONE-011` task 4).
 *
 * The tip used to be pulled *inside* the picture, so every head sat on top of
 * the thing it was pointing at and the arrow read as attached to it. A note
 * points at a picture; it does not touch it. Pixels rather than design units
 * because the gap is a thing the eye measures against the note's own type,
 * which is also fixed pixels — in units it would have been 24px of air on a
 * wide card and 17px on a narrow one.
 */
const TIP_GAP_PX = 22;

/** The arrowhead's two strokes, also in CSS pixels. */
const HEAD_PX = 26;

/**
 * The shortest shaft that still reads as an arrow, in CSS pixels.
 *
 * 34 when this was only defending against a negative run — `CLEAR` lets a seat
 * sit 20px from a picture and `TIP_GAP_PX` stops the head 22px short of it,
 * which is a run of minus two, and on card 2 the forest note was seated
 * directly under its picture with its arrowhead drawn backwards across the
 * word "the".
 *
 * **80 because not being negative turned out not to be the bar**
 * (`MILESTONE-012` task 2). Sweeping all 24 stage widths found 127 of 264
 * placements drawing an arrow shorter than 34px and seven notes whose worst
 * case was under 7px — a speck of ink with a head too small to see, which is
 * the same thing as a note with no arrow at all. It never showed up because
 * nothing measured it: `content-audit` checks that an arrow does not cross a
 * picture and does not leave the card, and a two-pixel arrow does neither.
 *
 * 80 is roughly what the owner drew. The Figma annotations run about 1,600
 * design units, which is 125px on a 1,256px stage; asking for 125 and settling
 * for what the card allows put notes in the wrong corners, and 80 is the point
 * where the arrows are unmistakably arrows and the corners still hold.
 */
const MIN_RUN_PX = 80;

interface Point {
  x: number;
  y: number;
}

/**
 * Where an arrow stops: a fixed gap short of **the picture's nearest point to
 * the note**.
 *
 * The nearest point was already the right target. It was the point on the ray
 * from the picture's centre through the note, which on a wide picture is a
 * different thing entirely: a note above the left end of a 4,000-unit-wide slot
 * was sent to a landing point near its middle, so the arrow travelled sideways
 * across the card to reach a picture that was directly below where it started.
 * The owner's word for the result was "across". The nearest point is the short
 * way in, and a shorter arrow is one with less to cross.
 *
 * What changed is the last step: `+ gap` outward along the approach where it
 * used to be `- inside`.
 */
function aimPoint(box: Rect, from: { x: number; y: number }, unitsPerPx: number) {
  const x = Math.min(Math.max(from.x, box.x), box.x + box.w);
  const y = Math.min(Math.max(from.y, box.y), box.y + box.h);
  let dx = from.x - x;
  let dy = from.y - y;
  let away = Math.hypot(dx, dy);
  if (away === 0) {
    // The note is over its own picture, which `GAP` normally prevents. Leave
    // along the line from the picture's centre rather than dividing by zero.
    dx = from.x - (box.x + box.w / 2);
    dy = from.y - (box.y + box.h / 2);
    away = Math.hypot(dx, dy) || 1;
  }
  const gap = TIP_GAP_PX * unitsPerPx;
  return { x: x + (dx / away) * gap, y: y + (dy / away) * gap };
}

/**
 * One arrow: a single smooth arc from the note to the picture, with a
 * two-stroke head (`MILESTONE-011` task 4, re-shaped in `MILESTONE-012`).
 *
 * It was a curve with a curl on the end of it, then it was a straight line.
 * It is an arc now, because that is the one the owner drew on the Figma frames
 * — see `BOW`. The curl is still gone: with it went `arcOf`, the five `Curl`
 * states and the three scoring terms that chose between them, and none of that
 * came back. An arc and a curl are not the same drawing.
 *
 * **The arc is the default, not one option among ninety.** `scoreArrow`
 * charges for the distance from `BOW`, and the seat search is run before the
 * bend search, so the pressure is to *move the note* until the arc has a clear
 * run rather than to reshape the line around what is in the way. Flattening,
 * over-bending and the S are all what happens when no seat on the card offers
 * one.
 *
 * `points` is the stroke flattened, for the clearance test. It is the reason
 * the geometry is worked out here and not in the renderer: whether an arrow
 * crosses a picture is decided before a seat is chosen, not after.
 */
function arrowBetween(from: Rect, to: Rect, lean: number, follow: number, unitsPerPx: number) {
  const end = aimPoint(to, { x: from.x + from.w / 2, y: from.y + from.h / 2 }, unitsPerPx);
  const start = edgePoint(from, end, 0);
  const points: Point[] = [];

  const vx = end.x - start.x;
  const vy = end.y - start.y;
  const length = Math.hypot(vx, vy) || 1;
  const nx = -vy / length;
  const ny = vx / length;
  const c1x = start.x + vx * 0.2 + nx * length * lean;
  const c1y = start.y + vy * 0.2 + ny * length * lean;
  const c2x = start.x + vx * 0.72 + nx * length * follow;
  const c2y = start.y + vy * 0.72 + ny * length * follow;

  for (let i = 0; i <= 28; i += 1) {
    const t = i / 28;
    const m = 1 - t;
    points.push({
      x: m * m * m * start.x + 3 * m * m * t * c1x + 3 * m * t * t * c2x + t * t * t * end.x,
      y: m * m * m * start.y + 3 * m * m * t * c1y + 3 * m * t * t * c2y + t * t * t * end.y,
    });
  }

  // Never longer than half the stroke it belongs to: a full-size head on a
  // short run is drawn back over the note's own first line, which is what the
  // card-2 forest note looked like.
  const head = Math.min(HEAD_PX * unitsPerPx, length * 0.5);
  const spread = 0.42;

  /*
   * Which way the head points: **the chord the ink actually draws over the
   * head's own length**, not the curve's tangent at `t = 1` (`MILESTONE-013`
   * task 1).
   *
   * The tangent is the mathematically correct direction *at the tip* and it is
   * the wrong one to hang a 26-pixel head on. The stroke is a bowed arc, so
   * over its last 26 pixels the ink has already turned away from that tangent
   * — measured on card 1's "my own task app" arrow, by 17 degrees. The head was
   * drawn symmetric about the tangent and therefore **17 degrees off the line
   * it belongs to**: its upper arm stood too steep and its lower arm, at 8
   * degrees to the shaft, lay along the shaft. The owner's description was that
   * the line was rotated and the head was not, which is exactly what a head
   * built on a direction the visible ink does not have looks like.
   *
   * `points` is the stroke already flattened for the clearance test, so the
   * chord is a lookup rather than more geometry: walk back from the tip to the
   * first sample at least a head-length away and aim at it. Both arms then sit
   * at `spread` either side of the ink at every bend the search can choose,
   * which a single tangent cannot promise.
   */
  let back = points[0]!;
  for (let i = points.length - 1; i >= 0; i -= 1) {
    back = points[i]!;
    if (Math.hypot(end.x - back.x, end.y - back.y) >= head) break;
  }
  const angle = Math.atan2(end.y - back.y, end.x - back.x);
  const hx1 = end.x - head * Math.cos(angle - spread);
  const hy1 = end.y - head * Math.sin(angle - spread);
  const hx2 = end.x - head * Math.cos(angle + spread);
  const hy2 = end.y - head * Math.sin(angle + spread);

  const round = (n: number) => Math.round(n);
  return {
    path: `M${round(start.x)} ${round(start.y)} C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(end.x)} ${round(end.y)}`,
    head: `M${round(end.x)} ${round(end.y)} L${round(hx1)} ${round(hy1)} M${round(end.x)} ${round(end.y)} L${round(hx2)} ${round(hy2)}`,
    points,
  };
}

/**
 * How much of a stroke is drawn outside the card.
 *
 * The card is `overflow: hidden`, so this is not a matter of taste: a bend big
 * enough to clear three pictures took the card-1 calendar arrow up over the top
 * edge of the frame, where the middle of it was simply not drawn and what
 * reached the page was two strokes with a gap between them. Measured the same
 * way as a crossing, and paid for at the same rate, so the router treats
 * leaving the card as exactly what it is: another thing in the way.
 */
function outsideOf(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1]!;
    const b = points[i]!;
    const out = (p: Point) => p.x < 0 || p.x > FRAME_W || p.y < 0 || p.y > FRAME_H;
    // Half a step each for an endpoint outside, which is close enough at this
    // sampling and costs nothing to compute.
    const step = Math.hypot(b.x - a.x, b.y - a.y) / 2;
    if (out(a)) total += step;
    if (out(b)) total += step;
  }
  return total;
}

/**
 * How much of a stroke runs over something it is not pointing at.
 *
 * Segment by segment, clipped against each rectangle, rather than by asking
 * whether the sample points land inside one. The difference is not pedantry:
 * with twenty-nine samples over a 4,000-unit curve the steps are 140 units
 * long, and the card-3 watch arrow clipped the corner of the typography
 * posters between two of them — the test said clear, the eye said otherwise,
 * and adding samples only moves the width of the crossing it can miss. Clipping
 * has no such width.
 *
 * The worst rectangle wins per segment rather than the sum, so a stroke over
 * two pictures that overlap is not charged twice for one crossing.
 */
export function crossingOf(points: Point[], obstacles: Rect[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1]!;
    const b = points[i]!;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy);
    if (length === 0) continue;
    let worst = 0;
    for (const box of obstacles) {
      // Liang-Barsky: the parameter window the segment spends inside the box.
      const edge = [-dx, dx, -dy, dy];
      const room = [a.x - box.x, box.x + box.w - a.x, a.y - box.y, box.y + box.h - a.y];
      let enter = 0;
      let leave = 1;
      let hits = true;
      for (let k = 0; k < 4; k += 1) {
        const p = edge[k]!;
        const q = room[k]!;
        if (p === 0) {
          if (q < 0) {
            hits = false;
            break;
          }
          continue;
        }
        const t = q / p;
        if (p < 0) {
          if (t > leave) {
            hits = false;
            break;
          }
          if (t > enter) enter = t;
        } else {
          if (t < enter) {
            hits = false;
            break;
          }
          if (t < leave) leave = t;
        }
      }
      if (hits && leave > enter) worst = Math.max(worst, (leave - enter) * length);
    }
    total += worst;
  }
  return total;
}

/**
 * How much bow an arrow wants, as a fraction of its own length
 * (`MILESTONE-012` task 2).
 *
 * **This is the shape the owner drew.** Page 2 of `Portfolio.fig` carries ten
 * annotation arrows pencilled onto the four collage frames, and every one of
 * them is the same object: a single smooth arc, a quarter-turn or so, with an
 * open two-stroke head. Not a straight line, not an S, not the curl that
 * `MILESTONE-011` task 4 removed — one clean sweep.
 *
 * `MILESTONE-011` had made *straight* the preferred shape and charged for
 * every unit of offset, which is the opposite instruction, and it is worth
 * being clear that it was not wrong: what the owner asked for then was the end
 * of the loops and the variety, and straightening was how that was delivered.
 * The arc is what they wanted instead of the loop, and it took drawing it to
 * say so.
 *
 * 0.28 both ends: with `c1` offset at 0.2 along the chord and `c2` at 0.72, a
 * pair of 0.28s bows the middle of the stroke out by roughly a fifth of its
 * length — which is the sagitta measured off the Figma arrows (their shallow
 * one is 1,672 units long and stands 492 off its chord).
 */
const BOW = 0.28;

/**
 * The offsets the router may try.
 *
 * They ran to ±1 before `MILESTONE-011`, which is a half-circle of a detour;
 * that narrowed them to ±0.32 around a preferred 0. The range is about the
 * same and the *centre* of it has moved: these are nine offsets arranged
 * around `BOW` rather than around zero, with 0 kept at the end of the list so
 * a straight line is still reachable when a card leaves no room to curve.
 */
const LEANS = [0.28, -0.28, 0.18, -0.18, 0.38, -0.38, 0.5, -0.5, 0];

/**
 * `follow` is the second control point's offset. It was always `lean * 0.55`,
 * which is a family of arcs that all bow the same way: it can go round one
 * thing. Letting the two move independently adds the S, which is what gets an
 * arrow **between** two pictures rather than over one of them, and it is the
 * difference between the card-1 calendar note crossing three pictures and
 * crossing none.
 *
 * The tie to `lean` is 1:1 now rather than 0.55. Two equal offsets of the same
 * sign are a *circular* arc; 0.55 is an arc that straightens as it arrives,
 * which was the right default when the destination was straight and is the
 * wrong one when it is a sweep.
 */
const FOLLOWS = [0.28, -0.28, 0.18, -0.18, 0.38, -0.38, 0.5, -0.5, 0];

function scoreArrow(
  arrow: ReturnType<typeof arrowBetween>,
  obstacles: Rect[],
  lean: number,
  follow: number,
) {
  /*
   * `BOW` is the preference and clearance is the reason to give it up.
   *
   * The middle term used to be `(|lean| + |follow|) * 960` — distance from
   * *straight*. It is distance from the arc the owner drew now (`BOW`), which
   * is the same arithmetic with its origin moved: a straight line is no longer
   * free, and a stroke that bows the wrong amount pays whether it bowed too
   * little or too much. Which way it bows is not charged for at all, because a
   * mirrored arc is the same arc — the sign is left entirely to clearance, and
   * that is what stops the four cards drawing one gesture four times.
   *
   * Crossing still dwarfs it. A stroke lying 500 units over a photograph pays
   * 3,000 where the whole of the shape term tops out near 540, so a card with
   * no room to curve gets a straight arrow rather than a curved one over a
   * picture — the shape is a preference and the clearance is a rule.
   *
   * The last term is what stops a clear route being a bad drawing: two offsets
   * of opposite sign are an S, which is worth paying for when it threads
   * between two pictures and is never worth taking for nothing.
   */
  return (
    crossingOf(arrow.points, obstacles) * 6 +
    outsideOf(arrow.points) * 6 +
    (Math.abs(Math.abs(lean) - BOW) + Math.abs(Math.abs(follow) - BOW)) * 960 +
    (lean * follow < 0 ? 420 : 0)
  );
}

/**
 * The arrow that gets from this note to this picture over the least other
 * ground (`ISSUE-043` cause 1, the last one standing).
 *
 * The bend used to be one seeded number and the arrow went wherever that put
 * it. It is a *search* now, over both control points, scored on how much
 * picture the stroke lies across — and since `MILESTONE-011` task 4 it starts
 * from straight and pays to leave it, rather than starting from a seeded curve.
 *
 * Two passes, because the search is also used to choose the seat. `coarse` is
 * eleven leans on the old fixed relationship and is cheap enough to run for
 * every seat in the running; the full grid runs once, on the seat that won.
 */
function routeArrow(
  box: Rect,
  anchor: Rect,
  obstacles: Rect[],
  unitsPerPx: number,
  coarse = false,
) {
  let best: { arrow: ReturnType<typeof arrowBetween>; score: number } | undefined;
  for (const lean of LEANS) {
    // The circular arc first, then the whole grid — see `FOLLOWS` on why the
    // tie is 1:1 and no longer 0.55.
    const follows = coarse ? [lean] : [lean, ...FOLLOWS];
    for (const follow of follows) {
      const arrow = arrowBetween(box, anchor, lean, follow, unitsPerPx);
      const score = scoreArrow(arrow, obstacles, lean, follow);
      if (!best || score < best.score) best = { arrow, score };
    }
  }
  return best!;
}

/**
 * What one seat costs, before its arrow is considered: how far it is from the
 * picture, plus what it is sitting on.
 *
 * **The second half is the whole point** (`MILESTONE-011` task 4). Both seat
 * sources used to be all-or-nothing — a seat with `penaltyOf(...) === 0` was a
 * candidate and every other seat was discarded — and the note fell back to
 * whatever was left. That is a cliff, and the cards fell off it: at a 1,278px
 * stage the card-1 calendar note sat beside its picture with a 1,579-unit
 * arrow, and at 1,256px, where the note is thirty units wider, not one seat on
 * the card was perfectly clear and the same note was thrown 8,900 units to the
 * opposite corner with 234px of arrow across other photographs.
 *
 * The two kinds of crowding are priced apart, which the first cut of this did
 * not do and could not have: it reused `penaltyOf`, whose return value is an
 * **area divided by a thousand** plus an off-frame term. Dividing that by the
 * note's area gave shares around 0.001 where the arithmetic wanted 0.4, so the
 * overlap term evaluated to roughly nothing and every note was placed on top of
 * the picture it was about. Overlap is measured here, in units the rest of this
 * function shares.
 */
/**
 * What lying on a picture costs, against what merely sitting close to one
 * costs. The gap between them is three orders of magnitude, and it is
 * deliberate: a note with less than its full breathing room is a crowded card,
 * and a note written across a photograph is a bug.
 */
const COVER_COST = 400000;
const NEAR_COST = 9000;

/** The area two rectangles share, with `pad` added around the first. */
function overlapArea(box: Rect, other: Rect, pad: number): number {
  return (
    Math.max(0, Math.min(box.x + box.w + pad, other.x + other.w) - Math.max(box.x - pad, other.x)) *
    Math.max(0, Math.min(box.y + box.h + pad, other.y + other.h) - Math.max(box.y - pad, other.y))
  );
}

function seatCost(box: Rect, obstacles: Rect[], reach: number): number {
  const area = box.w * box.h;
  let cover = 0;
  let near = 0;
  for (const other of obstacles) {
    const padded = overlapArea(box, other, CLEAR);
    if (padded === 0) continue;
    const raw = overlapArea(box, other, 0);
    cover += raw;
    near += padded - raw;
  }
  const offFrame =
    Math.max(0, MARGIN - box.x) +
    Math.max(0, box.x + box.w - (FRAME_W - MARGIN)) +
    Math.max(0, MARGIN - box.y) +
    Math.max(0, box.y + box.h - (FRAME_H - MARGIN));
  /*
   * `cover` is linear and brutal; `near` is squared and mild. A note covering a
   * tenth of a picture pays 40,000, which no amount of being close can buy
   * back, while a note with a third of its margin eaten pays 1,000 and is a
   * perfectly good seat on a crowded card.
   */
  return (
    farness(reach) +
    (cover / area) * COVER_COST +
    (near / area) * (near / area) * NEAR_COST +
    offFrame * 40
  );
}

/**
 * The whole card, at a coarse step, for the best ground near a picture.
 *
 * Runs whenever the ring around the picture has left the router fewer than four
 * seats to choose between, which on cards 1, 3 and 4 is most of the time. It is 1,500-odd rectangle tests against
 * twenty obstacles, once per note when the card mounts, which is nothing next
 * to writing a note over a photograph.
 *
 * It used to return the single nearest clear box, and that was where the last
 * of `ISSUE-043` was hiding: the notes that reach this function are exactly the
 * ones with the longest arrows, and handing back one box left the arrow no say
 * in the matter. It returns a **shortlist** now, nearest first and spread at
 * least a note's width apart so the twelve are twelve different places rather
 * than twelve neighbouring cells, and the caller picks the one whose arrow has
 * the clearest run.
 */
function sweepForGaps(
  size: { w: number; h: number },
  obstacles: Rect[],
  cx: number,
  cy: number,
): Array<{ box: Rect; score: number }> {
  const STEP = 320;
  const found: Array<{ box: Rect; score: number }> = [];
  for (let x = MARGIN; x + size.w <= FRAME_W - MARGIN; x += STEP) {
    for (let y = MARGIN; y + size.h <= FRAME_H - MARGIN; y += STEP) {
      const box = { x, y, w: size.w, h: size.h };
      const reach = Math.hypot(x + size.w / 2 - cx, y + size.h / 2 - cy);
      found.push({ box, score: seatCost(box, obstacles, reach) });
    }
  }
  found.sort((a, b) => a.score - b.score);
  const spread: Array<{ box: Rect; score: number }> = [];
  for (const candidate of found) {
    if (spread.length >= 12) break;
    const apart = spread.every(
      (kept) =>
        Math.abs(kept.box.x - candidate.box.x) > size.w * 0.8 ||
        Math.abs(kept.box.y - candidate.box.y) > size.h * 0.8,
    );
    if (apart) spread.push(candidate);
  }
  return spread;
}

/**
 * What a seat's distance from its picture costs.
 *
 * Linear up to `NEAR`, and steeper past it. The owner's word for the arrows was
 * "across", and an arrow that travels two thirds of the card is that word even
 * when it is drawn over nothing: a note is somebody leaning over the page and
 * pointing, and a straight-line-of-sight from the other side of the desk is a
 * different gesture. Past the knee a seat has to be much clearer to be worth
 * being much further, and the crossing weight is what "much clearer" means.
 *
 * **The knee moved out and the slope halved** (`MILESTONE-012` task 2). 2,600
 * units is a fifth of the card, and it was tight enough that a note could not
 * stand back far enough to draw a visible arrow without the standing-back
 * costing more than the arrow was worth — which is how a seat pressed against
 * its own picture kept winning. The owner's Figma annotations sit out at the
 * card's margin with 1,600 units of air behind them, so 2,600 was not the
 * gesture being described. 4,200 and a slope of 1 still make the far corner
 * expensive; they stop making the *near* margin expensive.
 */
const NEAR = 4200;
const FAR_SLOPE = 1;

function farness(reach: number): number {
  return reach + Math.max(0, reach - NEAR) * FAR_SLOPE;
}

/**
 * What sitting on the wrong side of the picture costs, when the note asked for
 * a side (`CollageScribble.prefer`).
 *
 * Priced in the same currency as `farness`, which is design units of reach:
 * enough that the asked-for corner wins every time the card has anything free
 * there, and not so much that a note is dragged into a corner whose only seat
 * puts its arrow across two photographs. The owner's instruction is about where
 * a note reads best; it is not a reason to draw a bad arrow.
 *
 * It was 2,400 — about one old `NEAR` per wrong axis — when two notes of nine
 * carried a `prefer` and the rest were free to go where the arithmetic liked.
 * All eleven carry one now (see `CollageScribble.prefer`), and at 2,400 the new
 * `shortRun` simply outbid it: notes bought their arrow length by leaving the
 * corner they had been given. 9,000 is where a corner survives `shortRun`
 * without surviving a crossing — swept over all 24 stage widths, ten of the
 * eleven notes now hold their corner at 22 or more of them, and none of the
 * arrows crosses a picture.
 */
const PREFER_MISS = 9000;

function preferMiss(box: Rect, anchor: Rect, prefer: CollageScribble["prefer"]): number {
  if (!prefer) return 0;
  const [vertical, horizontal] = prefer.split("-");
  const onLeft = box.x + box.w / 2 < anchor.x + anchor.w / 2;
  const above = box.y + box.h / 2 < anchor.y + anchor.h / 2;
  return (
    (onLeft === (horizontal === "left") ? 0 : PREFER_MISS) +
    (above === (vertical === "top") ? 0 : PREFER_MISS)
  );
}

/**
 * What a seat too close to its own picture costs — measured on **the arrow it
 * actually draws**, not on the gap between the two boxes (`MILESTONE-012`
 * task 2).
 *
 * The box gap was the wrong ruler and it is worth being precise about why,
 * because it looked right for three sessions. It is the straight-line distance
 * between two *rectangles*, and for a note sitting diagonally off a picture's
 * corner that is the corner-to-corner distance — while the stroke is drawn
 * from `edgePoint`, somewhere along the note's edge facing the picture, to
 * `aimPoint`, the nearest point on the picture pushed `TIP_GAP_PX` back out.
 * Those two points can be a small fraction of the corner-to-corner distance
 * apart. So a seat could clear the old test by a comfortable margin and still
 * draw four pixels of ink, which is exactly what seven of the eleven notes
 * were doing at their worst stage width.
 *
 * The routed arrow is already in hand at the only place this is called — the
 * seat loop routes one per candidate to score what it crosses — so measuring
 * the real thing costs nothing but the hypotenuse.
 *
 * Weight 12, from the same sweep as `MIN_RUN_PX`: 8 left a third of the
 * placements short, and 16 began buying length with corners the owner had
 * asked for.
 */
function shortRun(points: Point[], unitsPerPx: number): number {
  const start = points[0]!;
  const end = points[points.length - 1]!;
  const run = Math.hypot(end.x - start.x, end.y - start.y);
  const want = MIN_RUN_PX * unitsPerPx;
  return run >= want ? 0 : (want - run) * 12;
}

/** The last word on staying on the card, whatever the scoring settled for. */
function clampToFrame(box: Rect): Rect {
  return {
    ...box,
    x: Math.min(Math.max(box.x, MARGIN), FRAME_W - MARGIN - box.w),
    y: Math.min(Math.max(box.y, MARGIN), FRAME_H - MARGIN - box.h),
  };
}

/**
 * @param unitsPerPx design units to one CSS pixel on the stage these notes will
 * be drawn on — `FRAME_W / stageWidthInPixels`. Measured by `Collage`; the
 * default is the 1280px stage the type estimates were taken against.
 */
export function placeScribbles(
  slots: CollageSlot[],
  scribbles: CollageScribble[],
  unitsPerPx: number = UNITS_PER_PX_AT_1280,
): PlacedScribble[] {
  const rects: Rect[] = slots.map((slot) => ({ x: slot.x, y: slot.y, w: slot.w, h: slot.h }));
  /*
   * Two things on the card that are not pictures and still cannot be written
   * over: the card's index in the top-left corner, and the motion control,
   * which is pinned to the foot of the window and lands in the bottom-right of
   * whichever card is on screen.
   */
  const furniture: Rect[] = [
    { x: 0, y: 0, w: 1500, h: 1000 },
    { x: FRAME_W - 3200, y: FRAME_H - 1300, w: 3200, h: 1300 },
  ];
  const placed: Rect[] = [];

  return scribbles.map((scribble) => {
    const index = slots.findIndex((slot) => slot.src === scribble.target);
    const target = index > -1 ? slots[index] : undefined;
    const size = sizeOf(scribble.text, unitsPerPx);
    const seed = seedOf(scribble.text.en);
    const next = streamOf(seed);

    /*
     * The picture this note is about. A note whose target has been retired from
     * the card still has to go somewhere, so it falls back to the middle and
     * the scoring finds it a gap — a missing note is worse than a stray one,
     * and `content-audit` is where a broken target should be caught.
     */
    const anchor: Rect = target
      ? { x: target.x, y: target.y, w: target.w, h: target.h }
      : { x: FRAME_W / 2, y: FRAME_H / 2, w: 1, h: 1 };

    /*
     * Every seat around the picture, near ring to far. `bias` is where the note
     * starts looking, derived from its own words: two notes on one card almost
     * never begin at the same corner, which is the whole point of not placing
     * these by hand.
     */
    /*
     * The picture the note is about is an obstacle like every other one. It was
     * excluded here at first — on the theory that a note wants to sit close to
     * its own subject — and once free seats were scored by nearness the nearest
     * free seat was, of course, directly on top of it. `GAP` is what keeps a
     * note close; nothing has to be written over.
     */
    const obstacles = [...rects, ...furniture, ...placed];
    const offset = seed % DIRS.length;
    const candidates: Array<{ box: Rect; bias: number }> = [];
    for (const ring of RINGS) {
      for (let i = 0; i < DIRS.length; i += 1) {
        const dir = DIRS[(offset + i) % DIRS.length];
        /*
         * Slid back onto the card rather than left hanging off it
         * (`MILESTONE-012` task 2). A ring seat is placed by stepping out from
         * the picture, so for a picture already near an edge the seats on that
         * side land outside the frame — where `seatCost`'s `offFrame` term,
         * at 40 a unit, prices them out of the running entirely. Card 4's
         * pyramid is 1,146 units from the top, every one of its five
         * "above and right" seats was off the top of the card, and the note
         * fell back to a seat 24 units from the picture with an arrow too
         * short to see.
         *
         * Clamping turns those into the seat somebody would actually use:
         * hard against the card's top margin, out to the right. They are
         * still scored like any other seat and still lose to a better one.
         */
        if (dir) candidates.push({ box: clampToFrame(boxAt(anchor, size, dir, ring)), bias: i * 250 });
      }
    }

    /*
     * A free seat always beats an occupied one, and among free seats the
     * nearest to the picture wins — `bias` only breaks what is nearly a tie.
     *
     * That ordering is the whole lesson of the first cut. Taking the first free
     * seat in the note's own preference order sent one note on card 2 to the
     * far corner of the card with a 5,600-unit arrow behind it, because the
     * corner happened to come earlier in its rotation than the gap two
     * centimetres to the left.
     */
    const cx = anchor.x + anchor.w / 2;
    const cy = anchor.y + anchor.h / 2;
    const reach = (box: Rect) => Math.hypot(box.x + box.w / 2 - cx, box.y + box.h / 2 - cy);

    /*
     * What the arrow must not cross: every picture on the card, the two pieces
     * of furniture, and the notes already placed.
     *
     * The picture it points at used to be excluded, because the arrow was
     * supposed to end *inside* it. It stops `TIP_GAP_PX` short of it now, so
     * it has no business over that one either — and including it is what stops
     * an arrow reaching round a wide slot to land on its far edge.
     */
    const crossable = [...rects, ...furniture, ...placed];

    /*
     * Every seat on the ring is a candidate now, priced by `seatCost`, where
     * only the perfectly clear ones used to be and the rest collapsed into a
     * single `best` that was chosen on overlap alone — with no regard for how
     * far it was or what its arrow would cross. `bias` still breaks what is
     * nearly a tie, which is all it was ever meant to do.
     */
    const free = candidates.map(({ box: candidate, bias }) => ({
      box: candidate,
      score: seatCost(candidate, obstacles, reach(candidate)) + bias,
    }));
    free.sort((a, b) => a.score - b.score);

    /*
     * Now the part `ISSUE-043` cause 1 was waiting for. A seat being free says
     * the *note* clears every picture; it says nothing about the stroke that
     * has to get from it to the one it is about, and on a crowded card the
     * nearest free seat is often the one on the far side of two photographs.
     *
     * So the five nearest free seats are each given their best available arrow
     * and re-scored on what that arrow lies across. Five, because routing is
     * seven bends against every obstacle on the card, and doing that for all
     * twenty-four seats is work spent on seats no scoring would ever have
     * picked.
     */
    /*
     * The ring is the seats a note would choose by hand; the sweep is the whole
     * card on a coarse grid. Both always run, and both are priced by
     * `seatCost`, so they can be sorted into one list and compared.
     */
    const seats =
      [...free, ...sweepForGaps(size, obstacles, cx, cy)];

    let seat: Rect | undefined;
    let seatScore = Infinity;
    for (const option of seats) {
      const routed = routeArrow(option.box, anchor, [...crossable, option.box], unitsPerPx, true);
      const total =
        option.score +
        routed.score +
        preferMiss(option.box, anchor, scribble.prefer) +
        shortRun(routed.arrow.points, unitsPerPx);
      if (total < seatScore) {
        seatScore = total;
        seat = option.box;
      }
    }

    // `seats` is never empty — the ring always contributes — so the fallbacks
    // that used to stand behind this are gone with the all-or-nothing filter.
    const box = clampToFrame(seat ?? anchor);
    placed.push(box);

    // Anchored on the side away from the picture, so the note grows outwards
    // and the arrow leaves from the edge nearest what it points at.
    const align: "left" | "right" = box.x + box.w / 2 > anchor.x + anchor.w / 2 ? "left" : "right";
    // A clamped or swept box is not the one that was routed, so that arrow is
    // re-drawn from where the note actually ended up.
    const arrow = routeArrow(box, anchor, [...crossable, box], unitsPerPx).arrow;

    return {
      key: scribble.text.en,
      text: scribble.text,
      tone: scribble.tone ?? "ink",
      x: align === "right" ? box.x + box.w : box.x,
      y: box.y,
      align,
      // Never square: a note at true horizontal is a caption.
      rotate: Math.round((next() * 11 - 7) * 10) / 10 || -3,
      arrow: { path: arrow.path, head: arrow.head },
      samples: arrow.points,
    };
  });
}
