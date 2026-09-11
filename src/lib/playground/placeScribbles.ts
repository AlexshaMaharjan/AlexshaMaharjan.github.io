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
  return {
    w: Math.max(widestIn(text.en), widestIn(text.de)) * CHAR_PX * unitsPerPx,
    h: Math.max(rowsIn(text.en), rowsIn(text.de)) * LINE_PX * unitsPerPx,
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

/**
 * How bad a position is: nought is free space.
 *
 * Leaving the card is weighted heavily enough to be a rule rather than a
 * preference — a note that runs off the edge is cut in half, where one brushing
 * a picture is just close. It is still a cost and not a hard constraint,
 * because a card with no free space at all has to put the note somewhere, and
 * `clampToFrame` catches whatever this lets through.
 */
function penaltyOf(box: Rect, obstacles: Rect[]): number {
  let cost =
    (Math.max(0, MARGIN - box.x) +
      Math.max(0, box.x + box.w - (FRAME_W - MARGIN)) +
      Math.max(0, MARGIN - box.y) +
      Math.max(0, box.y + box.h - (FRAME_H - MARGIN))) *
    40;
  for (const other of obstacles) {
    const over =
      Math.max(0, Math.min(box.x + box.w + CLEAR, other.x + other.w) - Math.max(box.x - CLEAR, other.x)) *
      Math.max(0, Math.min(box.y + box.h + CLEAR, other.y + other.h) - Math.max(box.y - CLEAR, other.y));
    cost += over / 1000;
  }
  return cost;
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
 * Where on a picture an arrow lands: **its nearest point to the note**, pulled
 * a little way inside so the head sits on the picture rather than balanced on
 * its edge.
 *
 * This was the point on the ray from the picture's centre through the note,
 * which on a wide picture is a different thing entirely: a note above the left
 * end of a 4,000-unit-wide slot was sent to a landing point near its middle,
 * so the arrow travelled sideways across the card to reach a picture that was
 * directly below where it started. The owner's word for the result was
 * "across". The nearest point is the short way in, and a shorter arrow is one
 * with less to cross.
 */
function aimPoint(box: Rect, from: { x: number; y: number }) {
  const x = Math.min(Math.max(from.x, box.x), box.x + box.w);
  const y = Math.min(Math.max(from.y, box.y), box.y + box.h);
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const dx = cx - x;
  const dy = cy - y;
  const away = Math.hypot(dx, dy);
  if (away === 0) return { x: cx, y: cy };
  const inside = Math.min(Math.max(Math.min(box.w, box.h) * 0.09, 140), 420, away);
  return { x: x + (dx / away) * inside, y: y + (dy / away) * inside };
}

interface Point {
  x: number;
  y: number;
}

/**
 * The centre and the swept angles of the circle an SVG elliptical arc rides,
 * so the curl can be sampled for the clearance test like any other stroke.
 * Circular only, which is all `arrowBetween` draws.
 */
function arcOf(a: Point, b: Point, r: number, sweep: 0 | 1) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const half = Math.hypot(b.x - a.x, b.y - a.y) / 2;
  // A chord longer than the diameter has no circle; SVG grows the radius to
  // the smallest one that fits, and so does this.
  const radius = Math.max(r, half);
  const offset = Math.sqrt(Math.max(0, radius * radius - half * half));
  // The centre sits on the chord's perpendicular bisector. Which side depends
  // on the sweep and on whether the long way round was asked for, and the two
  // flags being equal is the case that puts it on the left of the chord.
  const ux = (b.x - a.x) / (half * 2 || 1);
  const uy = (b.y - a.y) / (half * 2 || 1);
  const side = sweep === 1 ? -1 : 1;
  const cx = mx + side * -uy * offset;
  const cy = my + side * ux * offset;
  const from = Math.atan2(a.y - cy, a.x - cx);
  let to = Math.atan2(b.y - cy, b.x - cx);
  if (sweep === 1 && to < from) to += Math.PI * 2;
  if (sweep === 0 && to > from) to -= Math.PI * 2;
  return { cx, cy, radius, from, to };
}

/**
 * The curl at the note's end: none, or which way round and how tight. The sign
 * is the direction the pen goes; `2` is the smaller circle, for where the full
 * one does not fit.
 */
type Curl = 0 | 1 | -1 | 2 | -2;

/**
 * One arrow, drawn as a cubic that leans out of the straight line and comes
 * back — the bend is stronger at the note's end than at the picture's, which is
 * what makes a curve read as a stroke somebody made rather than as an arc.
 *
 * `loop` adds the curl some of them start with (`MILESTONE-010` task 14i),
 * redrawn in SESSION-040 because the first one did not read as a loop. It was
 * an arc whose chord was its own radius, which is 300 degrees: a C with a
 * quarter of it missing, joined to the line at an angle the pen would have had
 * to lift to make. The chord is a third of the radius now, so the curl closes
 * to within 20 degrees of a full circle, and both its ends run along the line
 * of travel — the stroke goes round and carries on, which is the gesture.
 *
 * `points` is the stroke flattened, for the clearance test. It is the reason
 * the geometry is worked out here and not in the renderer: whether an arrow
 * crosses a picture is decided before a seat is chosen, not after.
 */
function arrowBetween(from: Rect, to: Rect, lean: number, follow: number, loop: Curl) {
  const end = aimPoint(to, { x: from.x + from.w / 2, y: from.y + from.h / 2 });
  const origin = edgePoint(from, end, 0);

  const runX = end.x - origin.x;
  const runY = end.y - origin.y;
  const run = Math.hypot(runX, runY) || 1;
  const points: Point[] = [];

  /*
   * A short arrow gets no curl at all: at a proportional radius a 970-unit
   * arrow was drawn a 126-unit loop, which is about ten CSS pixels — a blob on
   * the end of a line rather than a curl. Below the threshold there is no room
   * to make the gesture, so it is not made.
   */
  const curly = loop !== 0 && run > 1800;
  // A tight curl as well as a full one: half the reason a loop was dropped was
  // that at a proportional radius it had nowhere to sit, and a smaller circle
  // is a better answer there than no circle.
  const scale = Math.abs(loop) === 2 ? 0.6 : 1;
  const radius = curly ? Math.min(Math.max(run * 0.14, 260), 520) * scale : 0;
  /*
   * The curl stands a radius off the note before it begins. A loop drawn from
   * the note's own edge is a circle centred a radius away from it, and a
   * circle centred a radius from an edge covers what is behind that edge: the
   * first one of these was drawn straight through the words it belonged to.
   */
  const mouth = curly
    ? { x: origin.x + (runX / run) * radius * 1.15, y: origin.y + (runY / run) * radius * 1.15 }
    : origin;
  const start = curly
    ? { x: mouth.x + (runX / run) * radius * 0.35, y: mouth.y + (runY / run) * radius * 0.35 }
    : origin;
  let curl = "";
  if (curly) {
    const sweep: 0 | 1 = loop > 0 ? 1 : 0;
    curl = `M${Math.round(origin.x)} ${Math.round(origin.y)} L${Math.round(mouth.x)} ${Math.round(mouth.y)} A ${Math.round(radius)} ${Math.round(radius)} 0 1 ${sweep} ${Math.round(start.x)} ${Math.round(start.y)} `;
    points.push(origin);
    const arc = arcOf(mouth, start, radius, sweep);
    for (let i = 0; i <= 24; i += 1) {
      const angle = arc.from + ((arc.to - arc.from) * i) / 24;
      points.push({ x: arc.cx + Math.cos(angle) * arc.radius, y: arc.cy + Math.sin(angle) * arc.radius });
    }
  }

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

  // The head sits on the curve's own tangent, not on the straight line, or it
  // points somewhere the pen never went.
  const angle = Math.atan2(end.y - c2y, end.x - c2x);
  const head = 300;
  const spread = 0.46;
  const hx1 = end.x - head * Math.cos(angle - spread);
  const hy1 = end.y - head * Math.sin(angle - spread);
  const hx2 = end.x - head * Math.cos(angle + spread);
  const hy2 = end.y - head * Math.sin(angle + spread);

  const round = (n: number) => Math.round(n);
  return {
    path: `${curl}M${round(start.x)} ${round(start.y)} C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(end.x)} ${round(end.y)}`,
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

const LEANS = [0, 0.15, -0.15, 0.3, -0.3, 0.5, -0.5, 0.75, -0.75, 1, -1];

/**
 * `follow` is the second control point's offset. It was always `lean * 0.55`,
 * which is a family of arcs that all bow the same way: it can go round one
 * thing. Letting the two move independently adds the S, which is what gets an
 * arrow **between** two pictures rather than over one of them, and it is the
 * difference between the card-1 calendar note crossing three pictures and
 * crossing none.
 */
const FOLLOWS = [0, 0.15, -0.15, 0.3, -0.3, 0.5, -0.5, 0.75, -0.75];

function scoreArrow(
  arrow: ReturnType<typeof arrowBetween>,
  obstacles: Rect[],
  lean: number,
  follow: number,
  bend: number,
  loop: boolean,
  curl: Curl,
) {
  /*
   * Distance from the gesture the note asked for is a cost, not a constraint:
   * a clear run wins, and among equally clear runs the seeded bend wins, so an
   * arrow with nothing in its way is still drawn the way it was before and the
   * cards keep their variety.
   *
   * The last two terms are what stops a clear route being a bad drawing. A big
   * offset is a big detour, and two offsets of opposite sign are an S — both
   * are worth paying for and neither is worth taking for nothing.
   */
  return (
    crossingOf(arrow.points, obstacles) * 6 +
    outsideOf(arrow.points) * 6 +
    (Math.abs(lean - bend) + Math.abs(follow - bend * 0.55)) * 700 +
    (Math.abs(lean) + Math.abs(follow)) * 260 +
    (lean * follow < 0 ? 420 : 0) +
    (loop && curl === 0 ? 2200 : 0) +
    (curl < 0 ? 200 : 0) +
    (Math.abs(curl) === 2 ? 300 : 0)
  );
}

/**
 * The arrow that gets from this note to this picture over the least other
 * ground (`ISSUE-043` cause 1, the last one standing).
 *
 * The bend used to be one seeded number and the arrow went wherever that put
 * it. It is a *search* now, over both control points and the three curl states,
 * scored on how much picture the stroke lies across. A hard bend is a pen going
 * round something, which is what somebody annotating a page actually does.
 *
 * Two passes, because the search is also used to choose the seat. `coarse` is
 * eleven leans on the old fixed relationship and is cheap enough to run for
 * every seat in the running; the full grid runs once, on the seat that won.
 */
function routeArrow(box: Rect, anchor: Rect, bend: number, loop: boolean, obstacles: Rect[], coarse = false) {
  const leans = coarse ? LEANS : [bend, ...LEANS];
  /*
   * The coarse pass is choosing a seat, and which way a curl turns has never
   * been what decides that. Trying all five there costs two and a half times
   * the work for an answer that does not move, and the coarse pass is the one
   * that runs for every seat.
   */
  const loops: Curl[] = loop ? (coarse ? [1, 0] : [1, -1, 2, -2, 0]) : [0];
  let best: { arrow: ReturnType<typeof arrowBetween>; score: number } | undefined;
  for (const lean of leans) {
    const follows = coarse ? [lean * 0.55] : [lean * 0.55, ...FOLLOWS];
    for (const follow of follows) {
      for (const curl of loops) {
        const arrow = arrowBetween(box, anchor, lean, follow, curl);
        const score = scoreArrow(arrow, obstacles, lean, follow, bend, loop, curl);
        if (!best || score < best.score) best = { arrow, score };
      }
    }
  }
  return best!;
}

/**
 * The whole card, at a coarse step, for clear ground near a picture.
 *
 * Only reached when all forty seats around the picture are occupied, which on
 * cards 1, 3 and 4 is most of the time. It is 1,500-odd rectangle tests against
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
      if (penaltyOf(box, obstacles) !== 0) continue;
      found.push({ box, score: farness(Math.hypot(x + size.w / 2 - cx, y + size.h / 2 - cy)) });
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
 */
const NEAR = 2600;
const FAR_SLOPE = 2;

function farness(reach: number): number {
  return reach + Math.max(0, reach - NEAR) * FAR_SLOPE;
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
    const targetRect = index > -1 ? rects[index] : undefined;
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
        if (dir) candidates.push({ box: boxAt(anchor, size, dir, ring), bias: i * 250 });
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

    const bend = (0.2 + next() * 0.26) * (next() < 0.5 ? -1 : 1);
    const wantsLoop = (seed >>> 7) % 2 === 0;
    /*
     * What the arrow must not cross: every other picture on the card, the two
     * pieces of furniture, and the notes already placed. Not the picture it is
     * pointing at, which it is supposed to end inside.
     */
    const crossable = [
      ...rects.filter((rect) => rect !== targetRect),
      ...furniture,
      ...placed,
    ];

    const free: Array<{ box: Rect; score: number }> = [];
    let best: { box: Rect; cost: number } | undefined;
    for (const { box: candidate, bias } of candidates) {
      const cost = penaltyOf(candidate, obstacles);
      if (cost === 0) free.push({ box: candidate, score: farness(reach(candidate)) + bias });
      else if (!best || cost < best.cost) best = { box: candidate, cost };
    }
    free.sort((a, b) => a.score - b.score);

    /*
     * Now the part `ISSUE-043` cause 1 was waiting for. A seat being free says
     * the *note* clears every picture; it says nothing about the stroke that
     * has to get from it to the one it is about, and on a crowded card the
     * nearest free seat is often the one on the far side of two photographs.
     *
     * So the five nearest free seats are each given their best available arrow
     * and re-scored on what that arrow lies across. Five, because routing is
     * eleven bends against three curl states against every obstacle on the
     * card and doing that for all twenty-four seats is work spent on seats no
     * scoring would ever have picked.
     */
    /*
     * The ring rarely offers much on a dense card, so the sweep is not a
     * fallback for when it offers nothing — it runs whenever the ring has left
     * the router fewer than four seats to choose between. One seat is not a
     * choice, and one seat is what cards 1, 3 and 4 mostly gave: raising and
     * lowering the crossing weight over a factor of six moved nothing at all,
     * which is what a search with no alternatives looks like from the outside.
     */
    const seats =
      [...free, ...sweepForGaps(size, obstacles, cx, cy)];

    let seat: Rect | undefined;
    let seatScore = Infinity;
    for (const option of seats) {
      const routed = routeArrow(option.box, anchor, bend, wantsLoop, [...crossable, option.box], true);
      const total = option.score + routed.score;
      if (total < seatScore) {
        seatScore = total;
        seat = option.box;
      }
    }

    const box = clampToFrame(seat ?? best?.box ?? anchor);
    placed.push(box);

    // Anchored on the side away from the picture, so the note grows outwards
    // and the arrow leaves from the edge nearest what it points at.
    const align: "left" | "right" = box.x + box.w / 2 > anchor.x + anchor.w / 2 ? "left" : "right";
    // A clamped or swept box is not the one that was routed, so that arrow is
    // re-drawn from where the note actually ended up.
    const arrow = routeArrow(box, anchor, bend, wantsLoop, [...crossable, box]).arrow;

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
