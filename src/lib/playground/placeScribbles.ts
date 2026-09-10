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
const RINGS = [1, 2.4, 4.2];
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
 * One arrow, drawn as a cubic that leans out of the straight line and comes
 * back — the bend is stronger at the note's end than at the picture's, which is
 * what makes a curve read as a stroke somebody made rather than as an arc.
 *
 * `loop` adds the curl some of them start with (`MILESTONE-010` task 14i): a
 * near-closed circle at the note's end before the line sets off, drawn as a
 * single elliptical arc whose end is nudged along the line of travel, because
 * an arc that finishes exactly where it began is dropped by the renderer rather
 * than drawn. Whether a note gets one is decided by its own seed, so a third of
 * them loop and the same third loop on every visit.
 */
function arrowBetween(from: Rect, to: Rect, bend: number, loop: boolean) {
  const origin = edgePoint(from, { x: to.x + to.w / 2, y: to.y + to.h / 2 }, 0.1);
  const end = edgePoint(to, { x: from.x + from.w / 2, y: from.y + from.h / 2 }, 0.04);

  const runX = end.x - origin.x;
  const runY = end.y - origin.y;
  const run = Math.hypot(runX, runY) || 1;
  /*
   * The curl is a fraction of the journey, capped so a short arrow does not
   * become mostly loop, and the line then starts from where the curl ends.
   *
   * A short arrow gets none at all: at `run * 0.13` a 970-unit arrow was drawn
   * a 126-unit loop, which is about ten CSS pixels — a blob on the end of a
   * line rather than a curl. Below the threshold there is no room to make the
   * gesture, so it is not made.
   */
  const curly = loop && run > 1800;
  const radius = curly ? Math.min(Math.max(run * 0.13, 240), 460) : 0;
  const start = curly
    ? { x: origin.x + (runX / run) * radius, y: origin.y + (runY / run) * radius }
    : origin;
  const curl = curly
    ? `M${Math.round(origin.x)} ${Math.round(origin.y)} A ${Math.round(radius)} ${Math.round(radius)} 0 1 1 ${Math.round(start.x)} ${Math.round(start.y)} `
    : "";

  const vx = end.x - start.x;
  const vy = end.y - start.y;
  const length = Math.hypot(vx, vy) || 1;
  const nx = -vy / length;
  const ny = vx / length;
  const c1x = start.x + vx * 0.2 + nx * length * bend;
  const c1y = start.y + vy * 0.2 + ny * length * bend;
  const c2x = start.x + vx * 0.72 + nx * length * bend * 0.55;
  const c2y = start.y + vy * 0.72 + ny * length * bend * 0.55;

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
  };
}

/**
 * The whole card, at a coarse step, for the nearest clear ground to a picture.
 *
 * Only reached when all twenty-four seats around the picture are occupied. It
 * is 1,500-odd rectangle tests against twenty obstacles, once per note when the
 * card mounts, which is nothing next to writing a note over a photograph.
 */
function sweepForGap(
  size: { w: number; h: number },
  obstacles: Rect[],
  cx: number,
  cy: number,
): Rect | undefined {
  const STEP = 320;
  let found: { box: Rect; reach: number } | undefined;
  for (let x = MARGIN; x + size.w <= FRAME_W - MARGIN; x += STEP) {
    for (let y = MARGIN; y + size.h <= FRAME_H - MARGIN; y += STEP) {
      const box = { x, y, w: size.w, h: size.h };
      if (penaltyOf(box, obstacles) !== 0) continue;
      const reach = Math.hypot(x + size.w / 2 - cx, y + size.h / 2 - cy);
      if (!found || reach < found.reach) found = { box, reach };
    }
  }
  return found?.box;
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
    const target = slots.find((slot) => slot.src === scribble.target);
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

    let free: { box: Rect; score: number } | undefined;
    let best: { box: Rect; cost: number } | undefined;
    for (const { box: candidate, bias } of candidates) {
      const cost = penaltyOf(candidate, obstacles);
      if (cost === 0) {
        const score = reach(candidate) + bias;
        if (!free || score < free.score) free = { box: candidate, score };
      } else if (!best || cost < best.cost) {
        best = { box: candidate, cost };
      }
    }

    // Every seat taken. Card 1 is dense enough for this to happen, and the
    // answer is not to write over a picture — it is to look at the rest of the
    // card and take the closest clear ground to the one being talked about.
    const box = clampToFrame(free?.box ?? sweepForGap(size, obstacles, cx, cy) ?? best?.box ?? anchor);
    placed.push(box);

    // Anchored on the side away from the picture, so the note grows outwards
    // and the arrow leaves from the edge nearest what it points at.
    const align: "left" | "right" = box.x + box.w / 2 > anchor.x + anchor.w / 2 ? "left" : "right";
    const bend = (0.2 + next() * 0.26) * (next() < 0.5 ? -1 : 1);

    return {
      key: scribble.text.en,
      text: scribble.text,
      tone: scribble.tone ?? "ink",
      x: align === "right" ? box.x + box.w : box.x,
      y: box.y,
      align,
      // Never square: a note at true horizontal is a caption.
      rotate: Math.round((next() * 11 - 7) * 10) / 10 || -3,
      // Half of them ask for the curl; the short ones do not get it, so what
      // reaches the card is fewer than half. Taken from the seed rather than
      // from `next()` so adding it did not reshuffle every bend and angle
      // already on the cards.
      arrow: arrowBetween(box, anchor, bend, (seed >>> 7) % 2 === 0),
    };
  });
}
