import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { branchLayout, HUB_W, HUB_Y } from "./branchData";
import BranchGroup from "./BranchGroup";
import PageHero from "@/components/PageHero";

const EASE_LO = 0;
const EASE_HI = 1;

/**
 * **The five steps arrive strictly one at a time** (`MILESTONE-022` task 1,
 * owner: *"each step should finish its animation completely before the next
 * step begins (also the connection line). There should not be overlapping step
 * animations."*).
 *
 * Every previous version of this overlapped on purpose. `STEP_STAGGER` was
 * 0.0425 of the track against a `STEP_DUR` of 0.13, so three clusters were
 * fading in at once at the middle of the runway — which is why `litUntil` had
 * to exist, a whole constant whose job was to hand the blue on early because
 * the steps themselves could not be told apart. That machinery is gone. What
 * replaces it is a **turn**: each step owns a slice of the runway and nothing
 * else moves inside it.
 *
 * ## One turn, and the line arrives *with* its step
 *
 * The order the owner asked for first is still here — *"the square closer to
 * the question, then the line animated from the question to the step, and
 * finally the other square"* — and the geometry already agreed with it: every
 * `line` in `branchData` is written starting at `capA`, the end just inside the
 * question, so a `stroke-dashoffset` unwinding from 1 draws *away* from the
 * question.
 *
 * What changed in `MILESTONE-023` task 4 is what the line is timed against.
 * The stroke used to draw in a window of its own and the cluster began only
 * after it had finished, which is a sequence of two events where the owner
 * wanted one gesture: *"the animation of the connecting lines should begin at
 * the same time as the animation of the corresponding step… so both feel like
 * one continuous animation."*
 *
 * So a turn is three phases, not five:
 *
 * | phase | what moves | weight |
 * | --- | --- | --- |
 * | `capA` | the square at the question, on its own | 0.8 |
 * | `draw` | **the stroke and the cluster together** | 5.0 |
 * | `rest` | nothing, and the connector cooling to a hairline | 0.9 |
 *
 * Inside `draw` the two are not identical, and that is the part worth keeping:
 * the stroke finishes at `LINE_SHARE` of the window — four fifths of it — and
 * the cluster takes the whole of it. The line therefore *reaches* the step
 * while the step is still arriving, which reads as the connector delivering it
 * rather than as two things fading up in parallel. `capB`, the square at the
 * far end, lands exactly where the stroke stops, which is what it did before.
 *
 * **Weights, not fractions.** The five turns share whatever is left of the
 * runway after `SEQ_START`, so lengthening the intro or the track re-times the
 * sequence without anybody rebalancing the numbers — and the last step is
 * guaranteed to finish exactly at the end of the animation rather than at 1.02
 * of it, which is the arithmetic bug `MILESTONE-011` found the hard way.
 */
/**
 * Where the five steps sit when there is no map to hang them on
 * (`MILESTONE-023` task 7).
 *
 * Below 880px the canvas is a column of cards rather than a 1440 x 900 map
 * (`ISSUE-049`), and until this session that column was five identical cards on
 * one centre line — a timeline, which is the one thing the owner asked it not
 * to be. This is the same five steps *placed*: alternating sides, four widths,
 * and a centre for each one that the connectors are drawn between.
 *
 * `centre` is a percentage of the column, and it is the card's own middle, not
 * its edge — a stroke that runs centre to centre lands under the step it comes
 * from however wide that step happens to be. 01 and 05 are the widest and the
 * closest to the middle, which is where the map puts them too: the first step
 * and the last one are the only two that are not part of a pair.
 *
 * Read with `branchLayout`, which is the same idea for the map: geometry as
 * data, in one table, so re-cutting it is five lines rather than five branches
 * in a JSX tree.
 */
const STACK_LAYOUT = [
  { justify: "justify-start", width: "w-[94%]", centre: 47 },
  { justify: "justify-end", width: "w-[88%]", centre: 56 },
  { justify: "justify-start", width: "w-[90%]", centre: 45 },
  { justify: "justify-end", width: "w-[86%]", centre: 57 },
  { justify: "justify-center", width: "w-[96%]", centre: 50 },
] as const;

const SEQ_START = 0.18;
const PHASES = { capA: 0.4, draw: 6.0, rest: 0.6 } as const;
const PHASE_SUM = PHASES.capA + PHASES.draw + PHASES.rest;
const STEPS = 5;

/**
 * How much of the shared `draw` window the stroke takes. The cluster takes all
 * of it, so at 0.8 the line has arrived while the step is still settling — one
 * gesture that ends on the step rather than two that end together.
 */
const LINE_SHARE = 0.8;

/** One step's share of the runway, and one unit of weight inside it. */
const TURN = (1 - SEQ_START) / STEPS;
const UNIT = TURN / PHASE_SUM;

/** The start of step `i`'s turn, and of each phase inside it. */
const turnAt = (i: number) => SEQ_START + i * TURN;
const capAFrom = (i: number) => turnAt(i);
/** The stroke and the cluster start here, together. */
const stepFrom = (i: number) => capAFrom(i) + PHASES.capA * UNIT;
const stepDone = (i: number) => stepFrom(i) + PHASES.draw * UNIT;
/** Where the stroke stops, and therefore where its far square appears. */
const lineDone = (i: number) => stepFrom(i) + PHASES.draw * LINE_SHARE * UNIT;

/**
 * How tall the pinned runway is, and how much of it the finished map holds
 * still for.
 *
 * **400svh until `MILESTONE-022` task 1** (owner: *"the black process card
 * currently requires slightly too much scrolling"*), and the two halves of that
 * complaint pull in opposite directions, which is why this is 330 and not 250:
 * the *sequence* got longer this session, because five steps that no longer
 * overlap need more room than five that did, and the *intro* got much shorter.
 * At a 900px window the section is 2,070px of scroll against 2,700 — a fifth
 * less — and the five steps have 1,065px of it rather than 862.
 *
 * The hold is the stillness after the last step lands. It was a viewport when
 * the map was something you could hover and click, and it is a beat now that it
 * is a diagram: long enough that cluster 05 is not snatched away, short enough
 * that the next wheel notch is already moving the page. It is expressed in
 * `svh` and converted against the measured track at run time rather than
 * written as a fraction, because a fraction is only correct at one window
 * height.
 */
const TRACK_SVH = 330;
const HOLD_SVH = 26;

/**
 * The most of the track the hold may take, however short the window is.
 *
 * A ceiling rather than a tuning knob: `HOLD_SVH / range` grows without limit
 * as the window gets shorter, and at the point where the hold claimed most of
 * the runway the five clusters would be crammed into what was left. It binds
 * below about a 560px-tall window, where the deck has bigger problems anyway.
 */
const HOLD_MAX = 0.45;

/**
 * The last thing the section does: **it lets the page move** (`MILESTONE-022`
 * task 1, owner: *"near the end of Step 5, allow the overall page to scroll
 * slightly downward so the user gets a subtle indication that there is more
 * content below… however, don't scroll so far that the user loses the
 * opportunity to comfortably read Step 5"*).
 *
 * Both halves of that are in two numbers. The canvas lifts by `PEEK_SVH` — 8%
 * of the window, about 72px at a 900px one — which is enough that a strip of
 * the white page appears under a canvas that has been edge-to-edge black for
 * two thousand pixels, and far too little to take step 05 anywhere: the cluster
 * sits at 68.7% of a map that is centred in the canvas, so it rises by those
 * same 72px and stays comfortably on screen.
 *
 * It is driven by the **raw** track progress rather than by the animation's,
 * and that is the whole trick. `p` saturates at 1 with `HOLD_SVH` still to
 * scroll, so anything keyed to it is frozen through the hold; the lift keeps
 * going through it, and the stillness the hold promises becomes the *map*
 * standing still while the page underneath it is visibly on the move.
 *
 * Where it starts is written in *animation* progress and converted, though.
 * `PEEK_FROM` is 0.975 of the sequence — three quarters of the way through
 * cluster 05's own fade, so the lift begins under a step that is all but
 * arrived rather than under one that is still arriving. Written as a raw
 * fraction instead it would drift with the window, because the hold's share of
 * the track is a function of the viewport height.
 */
const PEEK_SVH = 8;
const PEEK_FROM = 0.975;

/**
 * How long a connector stays lit, and how long it takes to cool.
 *
 * The blue means "this is the step arriving": a connector lights the instant
 * its own square appears at the question, stays lit while its stroke draws and
 * while its cluster fades up, and returns to the resting hairline over the beat
 * that follows. Exactly one is ever lit, which is what the owner asked for in
 * `SESSION-049` and what the schedule above can finally deliver literally —
 * `litUntil`, the constant that used to hand the blue on early because three
 * steps were arriving at once, is gone with the overlap that made it necessary.
 *
 * The rise is instant and the fall is not: a connector coming on is an event
 * and should read as a switch, while five switches going *off* in sequence
 * would flicker.
 */

const LIT_FADE = PHASES.rest * UNIT;

/**
 * The connector's own weight, resting and drawing (owner: remove the blue
 * line and the end squares, animate the normal line itself instead).
 *
 * What used to read as "arriving now" through a colour swap and two endpoint
 * markers now reads through the stroke's own opacity and width: a connector
 * lifts off its resting hairline while it draws and while its cluster settles,
 * then eases back — one property, no second colour, no markers to place.
 */
const REST_OPACITY = 0.22;
const ACTIVE_OPACITY = 0.55;
const REST_WIDTH = 1;
const ACTIVE_WIDTH = 1.6;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(p: number, a: number, b: number) {
  let t = (p - a) / (b - a);
  t = t < EASE_LO ? EASE_LO : t > EASE_HI ? EASE_HI : t;
  return t * t * (3 - 2 * t);
}

/**
 * **The map is a diagram, not a control** (owner, SESSION-049, task 6:
 * "remove the hover state from the process card").
 *
 * Every cluster used to answer to a pointer: hovering one dimmed the other four
 * to 35%, grew it to 105%, lit its connector blue and showed the two endpoint
 * caps, and clicking locked that state until an ✕ released it. `MILESTONE-020`
 * had just finished adding a second scroll cue to tell people the thing was
 * live, which is the tell — a decoration that needs a caption explaining it is
 * a decoration that is doing the wrong job. Four of the five steps dimmed is
 * also, read plainly, four fifths of the diagram hidden to emphasise one fifth
 * that was already legible.
 *
 * What is gone with it: `hovered`, `locked`, `active`, `applyBranchState`,
 * `interactiveOn`, `INTERACTIVE_ON`/`OFF`, the `inert` toggle, the ✕ button,
 * the `process.exploreCue` and `process.closeSelection` strings, and the
 * `<button>` that carried each step's title — which is now the `h3` it always
 * read as.
 */
function MobileStepItem({
  branch,
  layout,
  index,
  locale,
  isLast,
  here,
  next,
}: {
  branch: Dictionary["process"]["branches"][number];
  layout: (typeof branchLayout)[number];
  index: number;
  locale: Locale;
  isLast: boolean;
  here: (typeof STACK_LAYOUT)[number];
  next?: (typeof STACK_LAYOUT)[number];
}) {
  const [inView, setInView] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rmq.matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={itemRef}
      className={clsx(
        "flex flex-col transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className={`flex ${here.justify}`}>
        <div className={here.width}>
          <BranchGroup
            stacked
            branch={branch}
            layout={layout}
            index={index}
            locale={locale}
          />
        </div>
      </div>
      {!isLast && next && (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 24"
          preserveAspectRatio="none"
          className="pointer-events-none block h-9 w-full shrink-0"
        >
          <path
            d={`M${here.centre} 0 L${next.centre} 24`}
            fill="none"
            stroke={inView ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"}
            strokeWidth={1.2}
            strokeDasharray="3 4"
            className="transition-colors duration-500"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </li>
  );
}

export default function HeroProcess({ dictionary, locale }: { dictionary: Dictionary; locale?: Locale }) {
  const activeLocale: Locale = locale || (dictionary.nav.projects === "Projekte" ? "de" : "en");
  const [staticFlow, setStaticFlow] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLSpanElement>(null);
  const qRef = useRef<HTMLHeadingElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const trackTopRef = useRef(0);
  const trackHRef = useRef(0);
  const cTop0Ref = useRef(0);
  const qhRef = useRef(90);
  /**
   * The question's width at a font size of one pixel, measured from the element
   * itself (`MILESTONE-010` task 3b).
   *
   * The question has to stay on one line, and "pick a size that fits" is a
   * promise nobody can keep by hand: the German sentence is a quarter wider
   * than the English one, the hub is a fraction of a map that scales with the
   * window, and the sentence is a string in a dictionary that somebody will
   * rewrite. Measuring the text and solving for the size that fits holds in all
   * three cases; a hard-coded `clamp()` holds in none of them.
   */
  const qEmRef = useRef(0.5);

  // Decide static vs pinned flow based on viewport width + reduced motion, matching the
  // coded reference's own breakpoints (max-width:880px, prefers-reduced-motion).
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 880px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStaticFlow(mql.matches || rmq.matches);
    update();
    mql.addEventListener("change", update);
    rmq.addEventListener("change", update);
    return () => {
      mql.removeEventListener("change", update);
      rmq.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (staticFlow) return;

    const track = trackRef.current;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const cue = cueRef.current;
    const q = qRef.current;
    const map = mapRef.current;
    if (!track || !hero || !canvas || !cue || !q || !map) return;

    let rafId = 0;

    const measure = () => {
      const H = window.innerHeight;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      trackTopRef.current = track.getBoundingClientRect().top + window.scrollY;
      trackHRef.current = track.offsetHeight;
      /*
       * The canvas starts where the hero ends, and `PageHero` is `min-h-[75svh]`
       * — the same 75svh the playground's deck starts at, so cards on both
       * landing pages take about 25 percent of the screen. `heroBottom` is only
       * larger than that when the copy has outgrown the box, and then it still wins.
       */
      cTop0Ref.current = Math.max(0.75 * H, heroBottom);
      qhRef.current = q.offsetHeight || 90;
      // One forced layout per resize, which is where `measure` already is.
      const width = q.style.width;
      const size = q.style.fontSize;
      const wrap = q.style.whiteSpace;
      q.style.whiteSpace = "nowrap";
      q.style.width = "auto";
      q.style.fontSize = "100px";
      qEmRef.current = q.scrollWidth / 100 || 0.5;
      q.style.width = width;
      q.style.fontSize = size;
      q.style.whiteSpace = wrap;
    };

    const frame = () => {
      const H = window.innerHeight;
      const W = window.innerWidth;
      /*
       * `p` is progress through the **animation**, not through the track, and
       * the difference between those two is the hold (see `HOLD_SVH`). It
       * reaches 1 with `HOLD_SVH` of runway still to go and stays there, so
       * every line below this — the canvas, the hero, the question, the map,
       * the connectors, the clusters — finishes early and then simply keeps
       * being told the same thing while the reader scrolls the rest.
       *
       * Written here rather than by shortening the schedule because the
       * schedule divides whatever runway it is given into five equal turns
       * (`TURN`); rescaling the input leaves every phase boundary in the same
       * place relative to the others and still buys the stillness.
       *
       * `raw` is the other one — progress through the **track**, hold included.
       * Only the peek reads it, and only because the peek is the one thing that
       * must still be moving after the animation has finished.
       */
      const range = Math.max(1, trackHRef.current - H);
      const hold = Math.min(HOLD_MAX, ((HOLD_SVH / 100) * H) / range);
      const raw = Math.min(1, Math.max(0, (window.scrollY - trackTopRef.current) / range));
      const p = Math.min(1, raw / (1 - hold));

      /*
       * The page moving under the finished map (see `PEEK_SVH`). Off `raw`
       * rather than `p`, so it is still running while everything else has
       * stopped: it begins inside step 05's own fade and carries on through the
       * hold, which is what turns a stretch of dead scroll into a promise that
       * there is something below.
       */
      const peek = (PEEK_SVH / 100) * H * smoothstep(raw, PEEK_FROM * (1 - hold), 1);

      const top = lerp(cTop0Ref.current || 0.75 * H, 0, smoothstep(p, 0, 0.3));
      canvas.style.top = top - peek + "px";
      const cw = lerp(Math.min(0.92 * W, 1320), W, smoothstep(p, 0.1, 0.32));
      canvas.style.width = cw + "px";
      canvas.style.height = lerp(0.78 * H, H, smoothstep(p, 0.1, 0.32)) + "px";
      canvas.style.borderRadius = lerp(44, 0, smoothstep(p, 0.18, 0.34)) + "px";

      hero.style.opacity = String(1 - smoothstep(p, 0.05, 0.24));
      hero.style.transform = "translateY(" + -140 * smoothstep(p, 0, 0.3) + "px)";
      cue.style.opacity = String(1 - smoothstep(p, 0.02, 0.12));

      const s = Math.max(0.5, Math.min(W / 1440, H / 900));
      const st = (H - 900 * s) / 2;
      const m = smoothstep(p, 0.3, 0.4);
      const qwBase = Math.min(1040, 0.9 * W);
      const visCenter = (H - top) / 2;

      /*
       * The hub, once the map is up: `HUB_W` wide at the map's own scale, and
       * whatever size keeps the sentence on one line inside it, never above 32
       * and never below 18. `nowrap` the whole way through, so the promise is
       * kept by construction rather than by the size happening to be small
       * enough — and the box is never narrower than the words, so nothing
       * spills during the transition either.
       */
      const hubW = Math.min(HUB_W * s, 0.86 * cw);
      const qEndSize = Math.max(18, Math.min(32 * s, (hubW - 24) / qEmRef.current));
      const qSize = lerp(Math.min(44, 0.032 * W + 14, qwBase / 18), qEndSize, m);
      const qw = Math.max(lerp(qwBase, hubW, m), qEmRef.current * qSize + 24);
      q.style.whiteSpace = "nowrap";
      q.style.width = qw + "px";
      q.style.left = (cw - qw) / 2 + "px";
      // `HUB_Y` is the sentence's centre line, so its top moves with its size.
      q.style.top =
        lerp(Math.max(96, visCenter - qhRef.current / 2), st + HUB_Y * s - qSize * 0.56, m) + "px";
      q.style.fontSize = qSize + "px";

      map.style.transform = "translate(-50%,-50%) scale(" + s + ")";
      map.style.opacity = String(smoothstep(p, 0.32, 0.4));

      /*
       * **One connector, one turn** (`MILESTONE-022` task 1, re-timed in
       * `MILESTONE-023` task 4 — see the schedule at the top of this file).
       *
       * The square at the question opens the turn on its own; then the stroke
       * and the cluster run **in the same window**, the stroke finishing first
       * so it reaches the step while the step is still arriving. Nothing here
       * overlaps with step `i + 1`, because `stepDone(i)` plus the beat *is*
       * `capAFrom(i + 1)`.
       */
      lineRefs.current.forEach((l, i) => {
        if (!l) return;
        /*
         * The stroke, drawn from the question outwards. `pathLength` is 100 on
         * every connector, so one dash offset serves five paths of five
         * different lengths, and `branchData` writes each `d` starting at the
         * end nearest the question — which is what makes "away from the
         * question" the natural direction rather than something to reverse.
         */
        l.style.strokeDashoffset = String(100 * (1 - smoothstep(p, stepFrom(i), lineDone(i))));

        /*
         * Lifted from the moment its own turn opens until its cluster has
         * finished arriving, then easing back over the beat that follows —
         * the same window the blue used to own, expressed now as the line's
         * own opacity and width rather than a second colour.
         */
        const lit =
          p < capAFrom(i) ? 0 : 1 - smoothstep(p, stepDone(i), stepDone(i) + LIT_FADE);
        l.style.opacity = String(lerp(REST_OPACITY, ACTIVE_OPACITY, lit));
        l.style.strokeWidth = String(lerp(REST_WIDTH, ACTIVE_WIDTH, lit));
      });

      groupRefs.current.forEach((g, i) => {
        if (!g) return;
        const b = smoothstep(p, stepFrom(i), stepDone(i));
        g.style.opacity = String(b);
        g.style.transform = "translateY(" + 26 * (1 - b) + "px)";
      });

      if (running) rafId = requestAnimationFrame(frame);
    };

    measure();
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.transform = "translateX(-50%)";
    canvas.style.minHeight = "0";
    canvas.style.padding = "0";
    map.style.position = "absolute";
    map.style.left = "50%";
    map.style.top = "50%";
    map.style.width = "1440px";
    map.style.height = "900px";
    q.style.position = "absolute";
    q.style.transform = "none";
    groupRefs.current.forEach((g) => {
      if (!g) return;
      g.style.opacity = "0";
      g.style.transform = "translateY(26px)";
    });

    /*
     * The loop only has anything to say while the track is on screen, but it
     * used to run for as long as the homepage was mounted — a per-frame style
     * write behind the whole page, forever (ISSUE-012). An observer starts and
     * stops it instead. The margin is generous so the first frame is computed
     * before the track scrolls into view rather than on the way in.
     */
    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      measure();
      rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    };

    const visibility = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { rootMargin: "300px 0px 300px 0px" },
    );
    visibility.observe(track);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    return () => {
      visibility.disconnect();
      stop();
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [staticFlow]);

  const branches = dictionary.process.branches;

  if (staticFlow) {
    return (
      <>
        <PageHero
          eyebrow={dictionary.hero.eyebrow}
          headingLines={dictionary.hero.headlineLines}
          intro={dictionary.hero.intro}
          tags={dictionary.hero.tags}
        />

        {/*
          Mobile Process Section:
          Starts peeking at the bottom of the hero screen so only the question
          and the scroll cue are visible on initial load. Swiping up brings
          the black canvas into full view, and steps animate in sequentially on scroll.
        */}
        <section className="relative w-full overflow-hidden bg-canvas-black rounded-t-[32px] pb-16 pt-2 shadow-[0_-12px_44px_rgba(0,0,0,0.22)] sm:rounded-t-[44px] sm:pb-24">
          <p className="sr-only">{dictionary.process.srSummary}</p>

          {/* Peeking Question Area: takes the bottom 25% portion of the hero screen */}
          <div className="flex min-h-[25svh] flex-col items-center justify-center px-5 pt-7 pb-6 text-center">
            <h2
              className="mx-auto max-w-[88vw] text-center text-[clamp(1.45rem,4.8vw,2.15rem)] font-semibold leading-[1.14] tracking-[-0.02em] text-white [hyphens:none]"
              style={{ textWrap: "balance" }}
            >
              {dictionary.process.question}
            </h2>
            <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] text-white/50">
              <span aria-hidden="true" className="animate-bounce">↓</span>
              <span>{dictionary.process.scrollCue}</span>
            </span>
          </div>

          {/* Staggered animated steps on scroll */}
          <ol className="mx-auto flex w-full max-w-[680px] list-none flex-col px-5">
            {branches.map((branch, i) => {
              const here = STACK_LAYOUT[i]!;
              const next = STACK_LAYOUT[i + 1];
              return (
                <MobileStepItem
                  key={branch.number}
                  branch={branch}
                  layout={branchLayout[i]!}
                  index={i}
                  locale={activeLocale}
                  isLast={!next}
                  here={here}
                  next={next}
                />
              );
            })}
          </ol>
        </section>
      </>
    );
  }

  return (
    <div ref={trackRef} className="relative" style={{ height: `${TRACK_SVH}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-white">
        <PageHero
          innerRef={heroRef}
          eyebrow={dictionary.hero.eyebrow}
          headingLines={dictionary.hero.headlineLines}
          intro={dictionary.hero.intro}
          tags={dictionary.hero.tags}
        />

        <div
          ref={canvasRef}
          role="region"
          aria-label={dictionary.landmarks.processCanvas}
          className="absolute left-1/2 -translate-x-1/2 overflow-hidden bg-canvas-black"
          style={{ top: "75svh", width: "min(92vw,1320px)", height: "78svh", borderRadius: 44 }}
        >
          <p className="sr-only">{dictionary.process.srSummary}</p>
          <h2
            ref={qRef}
            className="absolute left-1/2 top-[14svh] m-0 w-[min(90vw,1000px)] -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(1.625rem,3vw,2.625rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-white"
            style={{ textWrap: "balance" }}
          >
            {dictionary.process.question}
          </h2>
          <span
            ref={cueRef}
            className="absolute left-1/2 top-[calc(14svh+64px)] -translate-x-1/2 whitespace-nowrap font-mono text-[12px] text-white/50"
          >
            {dictionary.process.scrollCue}
          </span>


          {/*
            The map holds no controls any more (task 6), so it holds no `inert`
            either. `ISSUE-031` was a keyboard user tabbing into five buttons
            they could neither see nor use; there are no buttons, and what is
            left is five headings and five questions — real content, which a
            screen reader should reach rather than be walled out of. It stays
            `pointer-events-none` because nothing in it answers to a pointer.
          */}
          <div
            ref={mapRef}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[1440px] -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            <svg
              viewBox="0 0 1440 900"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {branchLayout.map((b, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  d={b.line}
                  pathLength={100}
                  style={{
                    stroke: "#FFFFFF",
                    strokeWidth: REST_WIDTH,
                    fill: "none",
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                    opacity: REST_OPACITY,
                    vectorEffect: "non-scaling-stroke",
                  }}
                />
              ))}
            </svg>
            {branches.map((branch, i) => (
              <BranchGroup
                key={branch.number}
                branch={branch}
                layout={branchLayout[i]!}
                index={i}
                locale={activeLocale}
                groupRef={(el) => {
                  groupRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
