import { useEffect, useRef, useState, useCallback } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { branchLayout, HUB_W, HUB_Y } from "./branchData";
import BranchGroup from "./BranchGroup";

const EASE_LO = 0;
const EASE_HI = 1;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(p: number, a: number, b: number) {
  let t = (p - a) / (b - a);
  t = t < EASE_LO ? EASE_LO : t > EASE_HI ? EASE_HI : t;
  return t * t * (3 - 2 * t);
}

export default function HeroProcess({ dictionary }: { dictionary: Dictionary }) {
  const [staticFlow, setStaticFlow] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);
  const [interactiveOn, setInteractiveOn] = useState(false);
  const [staticScale, setStaticScale] = useState(1);

  const trackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLSpanElement>(null);
  const qRef = useRef<HTMLHeadingElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const interactiveOnRef = useRef(false);
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

  const active = locked ?? hovered;

  const applyBranchState = useCallback(() => {
    groupRefs.current.forEach((g, i) => {
      if (!g) return;
      const isActive = active === null || active === i;
      g.style.opacity = active === null ? "1" : isActive ? "1" : "0.35";
    });
    lineRefs.current.forEach((l, i) => {
      if (!l) return;
      const on = active === i;
      l.style.stroke = on ? "#1B3FE0" : active === null ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)";
      l.style.strokeWidth = on ? "1.5" : "1";
    });
  }, [active]);

  useEffect(() => {
    if (interactiveOn) applyBranchState();
  }, [interactiveOn, applyBranchState]);

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

  // Static (mobile / reduced-motion) desktop scale: fit the 1440x900 map to the viewport.
  useEffect(() => {
    if (!staticFlow) return;
    const onResize = () => {
      const s = Math.max(0.5, Math.min(window.innerWidth / 1440, window.innerHeight / 900));
      setStaticScale(s);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [staticFlow]);

  useEffect(() => {
    if (staticFlow) {
      setInteractiveOn(true);
      return;
    }
    setInteractiveOn(false);
    interactiveOnRef.current = false;

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
      cTop0Ref.current = Math.max(0.7 * H, heroBottom + 24);
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
      const p = Math.min(
        1,
        Math.max(0, (window.scrollY - trackTopRef.current) / Math.max(1, trackHRef.current - H)),
      );

      const top = lerp(cTop0Ref.current || 0.7 * H, 0, smoothstep(p, 0, 0.55));
      canvas.style.top = top + "px";
      const cw = lerp(Math.min(0.92 * W, 1320), W, smoothstep(p, 0.22, 0.6));
      canvas.style.width = cw + "px";
      canvas.style.height = lerp(0.78 * H, H, smoothstep(p, 0.22, 0.6)) + "px";
      canvas.style.borderRadius = lerp(44, 0, smoothstep(p, 0.35, 0.62)) + "px";

      hero.style.opacity = String(1 - smoothstep(p, 0.12, 0.45));
      hero.style.transform = "translateY(" + -140 * smoothstep(p, 0, 0.55) + "px)";
      cue.style.opacity = String(1 - smoothstep(p, 0.04, 0.18));

      const s = Math.max(0.5, Math.min(W / 1440, H / 900));
      const st = (H - 900 * s) / 2;
      const m = smoothstep(p, 0.6, 0.78);
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
      const mo = smoothstep(p, 0.62, 0.72);
      map.style.opacity = String(mo);
      map.style.pointerEvents = p > 0.985 ? "auto" : "none";

      lineRefs.current.forEach((l, i) => {
        if (!l) return;
        l.style.strokeDashoffset = String(100 * (1 - smoothstep(p, 0.64 + i * 0.02, 0.78 + i * 0.02)));
      });

      if (p >= 0.9 && !interactiveOnRef.current) {
        interactiveOnRef.current = true;
        setInteractiveOn(true);
      } else if (p < 0.85 && interactiveOnRef.current) {
        interactiveOnRef.current = false;
        setInteractiveOn(false);
        setLocked(null);
        setHovered(null);
        lineRefs.current.forEach((l) => {
          if (!l) return;
          l.style.stroke = "rgba(255,255,255,0.22)";
          l.style.strokeWidth = "1";
        });
      }

      if (!interactiveOnRef.current) {
        groupRefs.current.forEach((g, i) => {
          if (!g) return;
          const b = smoothstep(p, 0.68 + i * 0.055, 0.8 + i * 0.055);
          g.style.opacity = String(b);
          g.style.transform = "translateY(" + 26 * (1 - b) + "px)";
        });
      }

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
        <section className="flex min-h-[70svh] flex-col items-center justify-center px-5 pt-[calc(var(--header-h)+31px)] pb-10 text-center sm:pt-[calc(var(--header-h)+45px)]">
          <p className="mb-5 text-[13px] text-ink-muted sm:mb-6 sm:text-[14px]">{dictionary.hero.eyebrow}</p>
          <h1 className="text-[42px] font-semibold leading-[1.02] tracking-[-0.028em] text-ink sm:text-[54px]">
            {dictionary.hero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <div className="mt-7 max-w-[560px]">
            <p className="text-[17px] leading-[1.6] text-ink-secondary">{dictionary.hero.intro}</p>
            <p className="mt-5 font-mono text-[13px] text-accent">{dictionary.hero.tags}</p>
          </div>
        </section>

        <section className="relative w-full overflow-hidden bg-canvas-black py-[72px]">
          <p className="sr-only">{dictionary.process.srSummary}</p>
          <h2 className="mx-auto max-w-[88vw] px-4 text-center text-[26px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
            {dictionary.process.question}
          </h2>

          <div
            className="relative mx-auto mt-10"
            style={{ width: 1440 * staticScale, height: 900 * staticScale }}
          >
            <div
              className="absolute left-0 top-0"
              style={{ width: 1440, height: 900, transform: `scale(${staticScale})`, transformOrigin: "top left" }}
            >
              <svg viewBox="0 0 1440 900" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                {branchLayout.map((b, i) => (
                  <path
                    key={i}
                    d={b.line}
                    style={{
                      stroke: active === i ? "#1B3FE0" : "rgba(255,255,255,0.22)",
                      strokeWidth: active === i ? 1.5 : 1,
                      fill: "none",
                    }}
                  />
                ))}
                {branchLayout.map((b, i) => (
                  <g key={i} style={{ opacity: active === i ? 1 : 0, transition: "opacity .18s ease" }}>
                    <rect x={b.capA.x - 3.5} y={b.capA.y - 3.5} width={7} height={7} style={{ fill: "#FFFFFF", stroke: "#1B3FE0", strokeWidth: 1.5 }} />
                    <rect x={b.capB.x - 3.5} y={b.capB.y - 3.5} width={7} height={7} style={{ fill: "#FFFFFF", stroke: "#1B3FE0", strokeWidth: 1.5 }} />
                  </g>
                ))}
              </svg>
              {branches.map((branch, i) => (
                <BranchGroup
                  key={branch.number}
                  branch={branch}
                  layout={branchLayout[i]!}
                  index={i}
                  active={active === i}
                  locked={locked === i}
                  closeLabel={dictionary.process.closeSelection}
                  onEnter={() => setHovered(i)}
                  onLeave={() => setHovered(null)}
                  onClick={() => setLocked((cur) => (cur === i ? null : i))}
                  onClose={() => setLocked(null)}
                  groupRef={(el) => {
                    groupRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <div ref={trackRef} className="relative" style={{ height: "280svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden bg-white">
        <div
          ref={heroRef}
          className="container-page pt-[calc(var(--header-h)+59px)] text-center sm:px-10 md:px-20"
        >
          <p className="mb-5 text-[14px] text-ink-muted">{dictionary.hero.eyebrow}</p>
          <h1 className="mx-auto text-hero font-semibold leading-[0.98] tracking-[-0.028em] text-ink">
            {dictionary.hero.headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <div className="mx-auto mt-8 max-w-[660px]">
            <p className="text-[19px] leading-[1.6] text-ink-secondary">{dictionary.hero.intro}</p>
            <p className="mt-6 font-mono text-[13px] text-accent">{dictionary.hero.tags}</p>
          </div>
        </div>

        <div
          ref={canvasRef}
          role="region"
          aria-label={dictionary.landmarks.processCanvas}
          className="absolute left-1/2 -translate-x-1/2 overflow-hidden bg-canvas-black"
          style={{ top: "70svh", width: "min(92vw,1320px)", height: "78svh", borderRadius: 44 }}
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
            `inert` until the track says the map is interactive. Without it the
            five branch buttons stay in the tab order while the map is
            invisible (ancestor opacity 0) and inert to activation
            (pointer-events: none) — a keyboard user tabbed into five controls
            they could neither see nor use (ISSUE-031).
          */}
          <div
            ref={mapRef}
            inert={!interactiveOn}
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
                    stroke: "rgba(255,255,255,0.22)",
                    strokeWidth: 1,
                    fill: "none",
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                    vectorEffect: "non-scaling-stroke",
                  }}
                />
              ))}
              {branchLayout.map((b, i) => (
                <g
                  key={i}
                  style={{ opacity: interactiveOn && active === i ? 1 : 0, transition: "opacity .18s ease" }}
                >
                  <rect x={b.capA.x - 3.5} y={b.capA.y - 3.5} width={7} height={7} style={{ fill: "#FFFFFF", stroke: "#1B3FE0", strokeWidth: 1.5 }} />
                  <rect x={b.capB.x - 3.5} y={b.capB.y - 3.5} width={7} height={7} style={{ fill: "#FFFFFF", stroke: "#1B3FE0", strokeWidth: 1.5 }} />
                </g>
              ))}
            </svg>
            {branches.map((branch, i) => (
              <BranchGroup
                key={branch.number}
                branch={branch}
                layout={branchLayout[i]!}
                index={i}
                active={interactiveOn && active === i}
                locked={interactiveOn && locked === i}
                closeLabel={dictionary.process.closeSelection}
                onEnter={() => interactiveOn && setHovered(i)}
                onLeave={() => interactiveOn && setHovered(null)}
                onClick={() => interactiveOn && setLocked((cur) => (cur === i ? null : i))}
                onClose={() => setLocked(null)}
                groupRef={(el) => {
                  groupRefs.current[i] = el;
                }}
                pointerEvents={interactiveOn}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
