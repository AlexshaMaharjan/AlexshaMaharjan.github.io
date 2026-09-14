import clsx from "clsx";
import type { ComponentType, ReactNode, SVGProps } from "react";
import type { Locale } from "@/lib/i18n";
import {
  EyeIcon,
  ResearchIcon,
  TargetIcon,
  SparkleIcon,
  ContrastIcon,
  RadiusIcon,
  GridDotsIcon,
  ValidatedIcon,
  LoopIcon,
} from "./icons";

const CLIP_A =
  "polygon(0.8% 1.4%,32% 0,66% 1.8%,100% 0.6%,99% 40%,100% 98%,64% 100%,28% 98.2%,0 99.6%,1.2% 48%)";
const CLIP_B =
  "polygon(0 1%,28% 0.4%,72% 0,100% 1.4%,99.2% 44%,100% 99.2%,58% 98%,22% 100%,0.8% 98.6%,0 52%)";

function Polaroid({
  variant,
  rotate,
  padding = "13px",
  width,
  children,
}: {
  variant: "a" | "b";
  rotate: number;
  padding?: string;
  width?: number;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width,
        boxSizing: "border-box",
        padding,
        transform: `rotate(${rotate}deg)`,
        background: variant === "a" ? "#E9E5DC" : "#EDEAE3",
        boxShadow: "0 16px 36px rgba(0,0,0,0.55)",
        clipPath: variant === "a" ? CLIP_A : CLIP_B,
      }}
    >
      {children}
    </div>
  );
}

function Pin({ tone = "gray", left = "50%" }: { tone?: "gray" | "blue"; left?: string }) {
  return (
    <span
      aria-hidden="true"
      /*
       * `process-pin` is not decoration, it is an exemption
       * (`MILESTONE-023` task 7). On the phone card, `.process-bento .pb-col >
       * *` forces every child of a column to the card's full width — which is
       * right for the panels stacked inside it and catastrophic for this,
       * because a 15px absolutely positioned dot became a 287px blue bar
       * lying across step 01 and out over the card's edge. The class is what
       * that rule tests for.
       */
      className="process-pin"
      style={{
        position: "absolute",
        left,
        top: -7,
        width: 15,
        height: 15,
        borderRadius: 999,
        background:
          tone === "blue"
            ? "radial-gradient(circle at 34% 28%,#7C93FF,#1233C4 68%)"
            : "radial-gradient(circle at 34% 28%,#5B5F69,#14151A 68%)",
        boxShadow: "0 5px 11px rgba(0,0,0,0.6)",
        transform: "translateX(-50%)",
        zIndex: 2,
      }}
    />
  );
}

function IconBadge({
  icon: Icon,
  label,
  active,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={clsx(
        // `pb-fixed`: a 40px square with a glyph in it is not improved by
        // being stretched across half a phone card. See `index.css`.
        "pb-fixed flex h-10 w-10 items-center justify-center rounded-lg border",
        active ? "border-white/[0.18] bg-[#1B3FE0]" : "border-white/10 bg-[#101116]",
      )}
    >
      <Icon className={clsx("h-5 w-5", active ? "text-white" : "text-[#A9B1FF]")} />
    </div>
  );
}

/**
 * The map's ordinary panel: a near-black card with a hairline edge.
 *
 * `tone="accent"` fills it with the site's cobalt instead (`MILESTONE-013`
 * task 2). One panel in step 02 is drawn that way in the owner's redesign, and
 * it is the one that asks what needs to be *achieved* — the end of the step,
 * marked by colour rather than by position. The border goes when the fill
 * arrives: a hairline exists to give a black card an edge against a black
 * canvas, and a cobalt card has one already.
 */
function DarkPanel({
  width,
  tone = "dark",
  children,
}: {
  width?: number;
  tone?: "dark" | "accent";
  children: ReactNode;
}) {
  return (
    <div
      style={{ width, boxSizing: "border-box" }}
      className={clsx(
        "rounded-lg p-3",
        tone === "accent" ? "bg-[#1B3FE0]" : "border border-white/[0.12] bg-[#0A0A0C]",
      )}
    >
      {children}
    </div>
  );
}

/**
 * Every cluster takes the same one prop, and only 03 and 04 read it
 * (`MILESTONE-013` task 4).
 *
 * Those two are the ones laid out as explicit rows rather than as a single
 * wrapping run, and a row that is pinned to its right edge inside a map is a
 * row that should start at its left edge inside a phone's card. `BranchGroup`
 * already knows which it is drawing; this hands that down the one level it has
 * to travel.
 */
interface ClusterProps {
  stacked?: boolean;
  locale?: Locale;
}

const monoLabel = "font-mono text-[9px] text-ink-on-dark-muted";

/* ---------- 01 · Understand ---------- */

/**
 * One of the three people in the interview sketch. Drawn once and placed three
 * times rather than written out three times, which is also what lets each of
 * them lean by a degree or two — the tilt is the only thing that stops three
 * copies of the same pen stroke reading as a repeat.
 */
function Person({ x, tilt }: { x: number; tilt: number }) {
  return (
    <g transform={`translate(${x} 0) rotate(${tilt} 37 38)`}>
      <path d="M37 6c7 0 11 4.4 11 10.2 0 5.6-4.4 9.8-11 9.8s-11-4.2-10.8-9.8C26.4 10.2 30.4 6 37 6Z" />
      <path d="M37 26.5c0 7.5.4 17.5.2 24.5" />
      <path d="M37.2 32c-5.6 2.4-11.4 4.2-16.8 3.6" />
      <path d="M37 32.4c5.4 2.6 11.2 4.6 16.6 4.2" />
      <path d="M37.2 51c-3.4 5.6-6.6 11.4-9.2 17.4" />
      <path d="M37.2 51.2c3.2 5.8 6.4 11.6 8.6 17.6" />
    </g>
  );
}

/**
 * Three people, not one (`MILESTONE-013` task 2).
 *
 * The sketch sat over the words "I just want something that actually works for
 * me", which is one participant talking, and drew one figure. The owner's
 * redesign draws three. It is a better picture of the step: 01 is where you go
 * and *talk to people*, and a single figure over a single quote reads as one
 * person's opinion rather than as research.
 *
 * The ground line went with the change. It was there to give one figure
 * something to stand on; three standing in a row hold the band on their own.
 */
function InterviewSketch() {
  return (
    <svg
      viewBox="0 0 190 76"
      aria-hidden="true"
      style={{ width: 124, height: 50, fill: "none", stroke: "#4A4B47", strokeWidth: 1.6, strokeLinecap: "round" }}
    >
      <Person x={0} tilt={-2.2} />
      <Person x={58} tilt={1.4} />
      <Person x={116} tilt={-1.1} />
    </svg>
  );
}

export function Cluster1({ locale = "de" }: ClusterProps) {
  const isDe = locale === "de";
  return (
    <>
      <Polaroid variant="a" rotate={-1.4} padding="9px 9px 12px" width={146}>
        <div className="flex items-center justify-center bg-[#E1DCD2] px-0 py-1.5">
          <InterviewSketch />
        </div>
        <p
          style={{ fontFamily: "var(--font-hand, 'Caveat', 'Segoe Script', 'Bradley Hand', cursive)" }}
          className="mt-[11px] text-[15px] leading-[1.15] text-[#1B1C1E]"
        >
          {isDe ? "„Ich will einfach etwas, das wirklich für mich funktioniert.“" : "“I just want something that actually works for me.”"}
        </p>
        <p className="mt-[7px] font-mono text-[8px] text-[#696559]">
          {isDe ? "— Interviewteilnehmer" : "— Interview participant"}
        </p>
      </Polaroid>

      {/*
        The rating comes before the SWOT (`MILESTONE-013` task 2). The order is
        the owner's and it is the order of the work: you hear the frustration
        first and you go looking at the market second. It also puts the two
        paper cards at the two ends of the row with the dark one between them,
        where the old order stacked both papers together and left the dark panel
        stranded beside the badges.
      */}
      <DarkPanel width={132}>
        <span className={monoLabel}>{isDe ? "Frustrationsgrad" : "Frustration rating"}</span>
        <div className="mt-2.5 flex h-[34px] items-end gap-[5px]">
          {[9, 15, 22, 34, 18].map((h, i) => (
            <span
              key={i}
              className="block w-3"
              style={{ height: h, background: i === 3 ? "#1B3FE0" : "rgba(255,255,255,0.16)" }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex gap-[5px] font-mono text-[8px] text-[#7B7E84]">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="w-3 text-center">
              {n}
            </span>
          ))}
        </div>
      </DarkPanel>

      <div className="pb-col relative" style={{ width: 178 }}>
        <Pin tone="blue" left="72%" />
        <Polaroid variant="b" rotate={1.4} padding="14px 13px 15px" width={178}>
          <div className="flex items-baseline justify-between gap-1.5">
            <p className="m-0 text-xs font-semibold tracking-[-0.01em] text-[#17181A]">SWOT</p>
            <span className="font-mono text-[8px] text-[#696559]">{isDe ? "Marktüberblick" : "market view"}</span>
          </div>
          <div className="mt-[9px] grid grid-cols-2 border border-[#B9B4A8]">
            {(isDe ? ["Stärken", "Schwächen", "Chancen", "Risiken"] : ["Strengths", "Weaknesses", "Opportunities", "Threats"]).map((label, i) => (
              <div
                key={label}
                className={clsx(
                  "min-w-0 p-[11px_6px]",
                  i < 2 && "border-b border-[#B9B4A8]",
                  i % 2 === 0 && "border-r border-[#B9B4A8]",
                )}
              >
                <span className="block overflow-wrap-anywhere text-[9.5px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1B3FE0]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Polaroid>
      </div>

      <IconBadge icon={EyeIcon} label={isDe ? "Icon: Beobachtung" : "Icon: observation"} active />
      <IconBadge icon={ResearchIcon} label={isDe ? "Icon: Recherche" : "Icon: research"} />
    </>
  );
}

/* ---------- 02 · Define ---------- */

export function Cluster2({ locale = "de" }: ClusterProps) {
  const isDe = locale === "de";
  return (
    <>
      {/*
        The step told in its own order (`MILESTONE-013` task 2): the problem is
        named, the opportunity is written down, the goal is set. The cards used
        to open on the opportunity statement, which is the middle of that
        sentence, and the two dark panels behind it said "Problem framed" and
        "Success looks like" — labels about the *artefact* rather than about the
        work. They ask questions now, the way 01, 03, 04 and 05 already do in
        their headings.
      */}
      <DarkPanel width={186}>
        <div className="flex items-start justify-between gap-2">
          <span className={monoLabel}>{isDe ? "Probleme definieren" : "Define problems"}</span>
          <TargetIcon className="h-3.5 w-3.5 shrink-0 text-[#A9B1FF]" />
        </div>
        <p className="mt-[9px] text-[10.5px] leading-[1.45] text-[#C4C9D0]">
          {isDe ? "Was ist das Problem? Was muss gelöst werden?" : "What is the problem? What needs to be solved?"}
        </p>
      </DarkPanel>

      <Polaroid variant="a" rotate={1.3} padding="14px 13px 17px" width={186}>
        <p className="m-0 text-xs font-semibold tracking-[-0.01em] text-[#17181A]">
          {isDe ? "Chancenaussage" : "Opportunity statement"}
        </p>
        <p className="mt-2.5 text-[11.5px] leading-[1.5] text-[#33342E]">
          {isDe
            ? "Nutzern helfen, von verstreuten Eingaben zu klaren, sicheren Handlungen zu gelangen."
            : "Help users move from scattered inputs to clear, confident action."}
        </p>
        <span aria-hidden="true" className="mt-2 block h-0.5 w-[78%] bg-[#1B3FE0]" />
        <span aria-hidden="true" className="mt-[3px] block h-px w-[54%] bg-[#1B3FE0] opacity-55" />
      </Polaroid>

      <DarkPanel width={186} tone="accent">
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-[9px] text-white/60">{isDe ? "Ziele definieren" : "Defining Goals"}</span>
          <SparkleIcon className="h-3.5 w-3.5 shrink-0 text-white" />
        </div>
        <p className="mt-[9px] text-[10.5px] leading-[1.45] text-white">
          {isDe ? "Was soll erreicht werden?" : "What needs to be achieved?"}
        </p>
      </DarkPanel>
    </>
  );
}

/* ---------- 03 · Explore ---------- */

function SitemapSketch({ locale }: { locale?: Locale }) {
  const isDe = locale === "de";
  const node = (key: string, x: number, y: number, w: number, h: number, rot: number, label: string, fs = 11) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={2} transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        style={{ fontFamily: "var(--font-hand, 'Caveat', 'Segoe Script', 'Bradley Hand', cursive)", fontSize: fs, fill: "#3A3B37", stroke: "none", textAnchor: "middle" }}
      >
        {label}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 208 138"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "auto", fill: "none", stroke: "#4A4B47", strokeWidth: 1.3, strokeLinecap: "round" }}
    >
      {node("home", 74, 3, 60, 23, -0.6, isDe ? "Start" : "Home", 12)}
      <path d="M104 26.5 L104 46 M22 46 L186 46 M22 46 L22 58 M104 46 L104 58 M186 46 L186 58" />
      {node("work", 0, 58, 48, 22, 0.8, isDe ? "Projekte" : "Work")}
      {node("about", 80, 58, 48, 22, -0.7, isDe ? "Über mich" : "About")}
      {node("contact", 160, 58, 48, 22, 0.6, isDe ? "Kontakt" : "Contact")}
      <path d="M24 80 L24 96 M6 96 L44 96 M6 96 L6 106 M44 96 L44 106" />
      {node("case-1", -1, 106, 30, 19, -1, isDe ? "Fall" : "Case", 10)}
      {node("case-2", 33, 106, 30, 19, 0.9, isDe ? "Fall" : "Case", 10)}
      <path d="M186 80 L186 92 M170 92 h32" style={{ opacity: 0.5 }} />
      {node("form", 158, 96, 56, 19, 0, isDe ? "Formular" : "form", 10)}
    </svg>
  );
}

function StructureFlowSketch() {
  return (
    <svg
      viewBox="0 0 88 58"
      aria-hidden="true"
      style={{ width: 88, height: 58, flex: "0 0 auto", fill: "none", stroke: "#4A4B47", strokeWidth: 1.3, strokeLinecap: "round" }}
    >
      <rect x="1" y="1" width="86" height="56" rx="2" />
      <path d="M8 10h28M8 15h18" />
      <rect x="8" y="22" width="30" height="26" rx="2" />
      <path d="M8 22 L38 48 M38 22 L8 48" style={{ opacity: 0.45 }} />
      <path d="M46 22h34M46 30h27M46 38h34M46 46h20" />
    </svg>
  );
}

function CheckItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className={clsx(
          "flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-sm",
          checked ? "bg-[#1B3FE0]" : "border border-white/30",
        )}
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 24 24" style={{ fill: "none", stroke: "#FFFFFF", strokeWidth: 3.4 }}>
            <path d="M5 13l4 4 10-10" />
          </svg>
        )}
      </span>
      <span className={clsx("text-[11px] leading-[1.3]", checked ? "text-[#DDE1E6]" : "text-ink-on-dark-muted")}>{label}</span>
    </div>
  );
}

/**
 * 03 and 04 are laid out as **rows inside the wrap** (`MILESTONE-013` task 2).
 *
 * `BranchGroup` gives every cluster one `flex flex-wrap` box and the other
 * three clusters are happy in it: their pieces are a single run that wraps
 * where it runs out of width. These two are not. The owner's redesign puts a
 * full-width card over a row of three over a row of two, and "wraps into that
 * shape by itself" is a thing a flex box can be *coaxed* into with widths that
 * happen to add up and cannot be relied on to keep once a label gets longer in
 * German. A child with `w-full` takes a line of its own, by construction, in
 * both locales and at every scale the map is drawn at.
 */
export function Cluster3({ stacked = false, locale = "de" }: ClusterProps) {
  const isDe = locale === "de";
  return (
    <>
      {/*
        The wireframe and the note about it lead the step now. It is the first
        thing you make when you start exploring, and the sitemap — which is the
        biggest object in the cluster — used to sit on top of it and read as the
        beginning.
      */}
      <div style={{ width: 236 }}>
        <Polaroid variant="b" rotate={-1.1} padding="10px 11px 12px">
          <div className="flex items-start gap-2.5">
            <StructureFlowSketch />
            <div>
              <svg
                viewBox="0 0 34 26"
                aria-hidden="true"
                style={{ width: 28, height: 22, fill: "none", stroke: "#1B3FE0", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }}
              >
                <path d="M30 20C22 20 10 15 5 7" />
                <path d="M11 3 L5 7 L11 12" />
              </svg>
              <p
                style={{ fontFamily: "var(--font-hand, 'Caveat', 'Segoe Script', 'Bradley Hand', cursive)" }}
                className="mt-0.5 text-[15px] leading-[1.1] text-[#1B3FE0]"
              >
                {isDe ? "Navigation vereinfachen" : "Simplify navigation"}
              </p>
            </div>
          </div>
        </Polaroid>
      </div>

      <div className="pb-row flex w-full flex-wrap items-start gap-2.5">
        <DarkPanel width={150}>
          <p className="m-0 text-xs font-semibold tracking-[-0.01em] text-white">
            {isDe ? "Konzeptrichtung" : "Concept direction"}
          </p>
          <div className="mt-3 flex flex-col gap-[9px]">
            <CheckItem label={isDe ? "Ein klarer Pfad" : "One clear path"} checked />
            <CheckItem label={isDe ? "Nach Aufgaben gruppiert" : "Grouped by task"} checked />
            <CheckItem label={isDe ? "Alles auf einmal" : "Everything at once"} checked={false} />
          </div>
        </DarkPanel>
        <div
          style={{ width: 78, height: 84 }}
          className="box-border flex flex-col justify-between rounded-lg border border-white/10 bg-[#101116] p-2"
        >
          <span className={monoLabel}>{isDe ? "Ablauf" : "flow"}</span>
          <svg viewBox="0 0 60 14" aria-hidden="true" style={{ display: "block", width: "100%", height: "auto", fill: "none", stroke: "#8FA6FF", strokeWidth: 1.3, strokeLinecap: "round" }}>
            <circle cx="6" cy="7" r="4" />
            <path d="M11 7h11" />
            <circle cx="27" cy="7" r="4" />
            <path d="M32 7h11" />
            <circle cx="48" cy="7" r="4" style={{ fill: "#1B3FE0", stroke: "#2F55F0" }} />
          </svg>
        </div>
        <div
          role="img"
          aria-label={isDe ? "Wireframe-Skizze: Kopfbereich und Textzeilen" : "Wireframe sketch: header block and text lines"}
          className="box-border flex flex-col gap-1 rounded-lg bg-[#EDEAE3]"
          style={{ width: 58, height: 64, padding: "9px 10px" }}
        >
          <span className="block h-[9px] rounded-sm bg-[#CFC9BC]" />
          <span className="mt-0.5 block h-0.5 bg-[#B9B4A8]" />
          <span className="block h-0.5 bg-[#B9B4A8]" />
          <span className="block h-0.5 w-3/5 bg-[#B9B4A8]" />
        </div>
      </div>

      <div className="pb-row flex w-full flex-wrap items-start gap-2.5">
        <div className={clsx("relative", stacked && "pb-fixed")} style={{ width: stacked ? 138 : 222 }}>
          {/* The strip of tape. It belongs to the sitemap and moves with it. */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "36%",
              top: -8,
              width: 58,
              height: 19,
              background: "linear-gradient(180deg,#1E1F23,#121317)",
              border: "1px solid rgba(255,255,255,0.09)",
              transform: "translateX(-50%) rotate(-2deg)",
              zIndex: 2,
            }}
          />
          <Polaroid variant="a" rotate={-0.7}>
            <div className="p-2.5" style={{ backgroundImage: "radial-gradient(rgba(23,24,26,0.16) 1px,transparent 1px)", backgroundSize: "9px 9px" }}>
              <SitemapSketch locale={locale} />
            </div>
          </Polaroid>
        </div>
        <div className={clsx("flex flex-col gap-2.5", !stacked && "pb-col")} style={{ width: stacked ? undefined : 104, flex: stacked ? "1 1 0%" : undefined }}>
          <DarkPanel>
            <p className="m-0 text-[10px] leading-[1.4] text-[#C4C9D0]">
              {isDe ? "Struktur und Ablauf erkunden." : "Exploring structure and flow."}
            </p>
          </DarkPanel>
          <div className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-[#101116] p-2 box-border" style={{ height: 62 }}>
            <span className={monoLabel}>{isDe ? "Varianten" : "variants"}</span>
            <div className="grid flex-1 grid-cols-3 gap-[5px]">
              <div className="flex items-end justify-center rounded-[3px] border border-[#2F55F0] bg-[#15192B] pb-0.5">
                <span className="font-mono text-[7px] text-accent-on-dark">A</span>
              </div>
              <div className="flex items-end justify-center rounded-[3px] border border-white/[0.14] pb-0.5">
                <span className="font-mono text-[7px] text-[#7B7E84]">B</span>
              </div>
              <div className="flex items-end justify-center rounded-[3px] border border-white/[0.14] pb-0.5">
                <span className="font-mono text-[7px] text-[#7B7E84]">C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 04 · Design ---------- */

export function Cluster4({ stacked = false, locale = "de" }: ClusterProps) {
  const isDe = locale === "de";
  return (
    <>
      {/*
        Two rows, for the reason given above `Cluster3`. The tokens come first
        — spacing, states, colour, the three icon studies — and the two things
        made *out of* them, a screen and a typeface, close the step underneath.
        The cluster used to open on the typeface, which is the end of the work
        standing at the front of it.

        The left-hand column is dropped by the height of the spacing card so
        that the swatches sit level with the states panel rather than level with
        the pin above it, which is how the owner's file has it.
      */}
      <div className={clsx("pb-row flex w-full flex-wrap items-start gap-2.5", stacked ? "justify-start" : "justify-end")}>
        <div className={clsx("flex flex-col gap-3.5", stacked ? "items-start" : "mt-[92px] items-end")}>
          <div
            role="img"
            aria-label={isDe ? "Farbpalette: Tinte, Papier, Schwarz, Kobalt" : "Colour palette: ink, paper, black, cobalt"}
            className="flex h-10 items-center gap-[5px] rounded-lg border border-white/10 bg-[#101116] p-[9px] box-border"
          >
            {["#33353B", "#F1EFE9", "#0A0A0C", "#1B3FE0"].map((c) => (
              <span key={c} className="block h-5 w-5 rounded" style={{ background: c }} />
            ))}
          </div>
          <div className="flex gap-2.5">
            <IconBadge icon={ContrastIcon} label={isDe ? "Icon: Kontrast" : "Icon: contrast"} />
            <IconBadge icon={RadiusIcon} label={isDe ? "Icon: Radius" : "Icon: radius"} />
            <IconBadge icon={GridDotsIcon} label={isDe ? "Icon: Raster" : "Icon: grid"} />
          </div>
        </div>

        <div
          className={clsx("flex flex-col gap-4", !stacked && "pb-col")}
          style={{ width: stacked ? undefined : 88, flex: stacked ? "0 0 auto" : undefined }}
        >
          <div className="relative" style={{ width: 88 }}>
            <Pin left="54%" />
            {/*
                The pinned cards sit straight in the bento (`MILESTONE-015`
                task 1). A 2-degree tilt lifts an 88px card's corner by three
                pixels and reads as paper; the same two degrees across a
                615px phone card lift it by twenty-one and read as a mistake.
              */}
              <div
                style={{
                  height: 76,
                  transform: stacked ? "none" : "rotate(-2deg)",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.5)",
                }}
                className="box-border flex flex-col justify-between bg-[#EDEAE3] p-[9px_10px]"
              >
              <span className="font-mono text-[8px] text-[#696559]">{isDe ? "Abstände" : "spacing"}</span>
              <div className="flex flex-col gap-1">
                <span className="block h-[3px] w-[30%] bg-[#B9B4A8]" />
                <span className="block h-[3px] w-[58%] bg-[#B9B4A8]" />
                <span className="block h-[3px] w-full bg-[#1B3FE0]" />
              </div>
              <span className="font-mono text-[8px] text-[#696559]">4 · 8 · 16</span>
            </div>
          </div>
          <div className="relative" style={{ width: 88 }}>
            <Pin />
            {/*
              On the phone card the states panel sits beside the palette and
              icon row rather than below it, and its height is set to match
              that combination exactly — 40px palette + 14px gap + 40px icons
              — so the two blocks read as one aligned unit.
            */}
            <div
              style={{ height: stacked ? 94 : 104, transform: stacked ? "none" : "rotate(1.2deg)" }}
              className="box-border flex flex-col gap-[5px] border border-white/10 bg-[#101116] p-2"
            >
              <span className={monoLabel}>{isDe ? "Zustände" : "states"}</span>
              <span className="block rounded-full bg-[#1B3FE0] py-[3px] text-center text-[8px] text-white">
                {isDe ? "Standard" : "Default"}
              </span>
              <span className="block rounded-full bg-[#2F55F0] py-[3px] text-center text-[8px] text-white">Hover</span>
              <span className="block rounded-full border border-white/[0.18] py-[3px] text-center text-[8px] text-[#7B7E84]">
                {isDe ? "Inaktiv" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx("pb-row flex w-full flex-wrap items-start gap-2.5", stacked ? "justify-start" : "justify-end")}>
        <div style={{ width: 198 }} className="box-border rounded-lg bg-[#F1EFE9] p-[13px]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#6C6C6C]">{isDe ? "Fokus" : "Focus"}</span>
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block h-[1.4px] w-[13px] bg-[#5C5E62]" />
              <span className="block h-[1.4px] w-[13px] bg-[#5C5E62]" />
              <span className="block h-[1.4px] w-[13px] bg-[#5C5E62]" />
            </span>
          </div>
          <p style={{ textWrap: "balance" }} className="mt-3 text-[15px] font-semibold leading-[1.25] tracking-[-0.015em] text-[#17181A]">
            {isDe ? "Frames in Figma gestalten" : "Designing frames in Figma"}
          </p>
          <span className="mt-3.5 inline-block rounded-full bg-[#1B3FE0] px-3 py-[7px] text-[10px] font-medium text-white">
            {isDe ? "Loslegen →" : "Get started →"}
          </span>
        </div>

        <div
          style={{ width: 118, height: 156 }}
          className="box-border flex flex-col justify-between rounded-lg bg-[#F1EFE9] p-3"
        >
          <span aria-hidden="true" className="text-[62px] font-semibold leading-none tracking-[-0.04em] text-[#17181A]">
            Aa
          </span>
          <div>
            <span className="block text-[9.5px] text-[#5C5E62]">Inter Display</span>
            <span className="block font-mono text-[9px] text-[#6C6C6C]">{isDe ? "Mono-Labels" : "Mono labels"}</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 05 · Refine ---------- */

function Avatar({ bg, offset }: { bg: string; offset: boolean }) {
  return (
    <span
      role="img"
      aria-label="Test participant"
      style={{ marginLeft: offset ? -5 : 0 }}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: bg }}>
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 15, height: 15, fill: "none", stroke: "#6E6A60", strokeWidth: 1.7, strokeLinecap: "round" }}>
          <circle cx="12" cy="9" r="3.3" />
          <path d="M5.8 20c1.1-3.9 3.5-5.8 6.2-5.8s5.1 1.9 6.2 5.8" />
        </svg>
      </span>
    </span>
  );
}

export function Cluster5({ locale = "de" }: ClusterProps) {
  const isDe = locale === "de";
  return (
    <>
      <div
        style={{ width: 104, height: 120 }}
        className="box-border flex flex-col gap-[9px] rounded-lg border border-white/10 bg-[#141519] p-2.5"
      >
        <span className={monoLabel}>{isDe ? "Vorher" : "Before"}</span>
        <div
          role="img"
          aria-label={isDe ? "Frühere Oberfläche: dichtes, überladenes Layout" : "Earlier interface: dense, crowded layout"}
          className="box-border flex flex-1 flex-col gap-[3px] rounded-sm bg-[#1B1C21] p-[7px]"
        >
          <span className="block h-[3px]" style={{ background: "rgba(255,255,255,0.24)" }} />
          <span className="block h-[3px]" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div className="my-0.5 grid grid-cols-3 gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-[14px]" style={{ background: "rgba(255,255,255,0.1)" }} />
            ))}
          </div>
          <span className="block h-[3px]" style={{ background: "rgba(255,255,255,0.15)" }} />
          <span className="block h-[3px]" style={{ background: "rgba(255,255,255,0.15)" }} />
          <span className="block h-[3px] w-[64%]" style={{ background: "rgba(255,255,255,0.15)" }} />
        </div>
      </div>

      <div className="relative" style={{ width: 104 }}>
        <Pin />
        <div style={{ height: 120 }} className="box-border flex flex-col items-center rounded-lg bg-[#1B3FE0] p-2.5">
          <span style={{ color: "rgba(255,255,255,0.85)" }} className="self-start font-mono text-[9px]">
            {isDe ? "Nachher" : "After"}
          </span>
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            style={{ width: 52, height: 52, marginTop: 14, fill: "none", stroke: "#FFFFFF", strokeWidth: 2, strokeLinecap: "round" }}
          >
            <circle cx="24" cy="24" r="21" />
            <circle cx="17" cy="19" r="1.6" style={{ fill: "#FFFFFF", stroke: "none" }} />
            <circle cx="31" cy="19" r="1.6" style={{ fill: "#FFFFFF", stroke: "none" }} />
            <path d="M15 29c2.6 3.2 5.6 4.8 9 4.8s6.4-1.6 9-4.8" />
          </svg>
        </div>
      </div>

      <div style={{ width: 120 }}>
        <Polaroid variant="b" rotate={1.6} padding="11px 11px 14px">
          <span className="font-mono text-[9px] text-[#696559]">{isDe ? "Nutzertests" : "User testing"}</span>
          <div className="mt-2.5 flex">
            <Avatar bg="#DAD4C8" offset={false} />
            <Avatar bg="#CFC9BC" offset />
            <Avatar bg="#DAD4C8" offset />
          </div>
          <p className="mt-2.5 text-[11px] leading-[1.45] text-[#33342E]">
            {isDe ? "„Das ergibt einfach Sinn.“" : "“This just makes sense.”"}
          </p>
        </Polaroid>
      </div>

      <div
        style={{ width: 158 }}
        className="box-border flex items-center justify-between rounded-lg border border-white/[0.12] bg-[#0A0A0C] p-[10px_12px]"
      >
        <span className="text-[11px] text-[#DDE1E6]">{isDe ? "Validiert" : "Validated"}</span>
        <ValidatedIcon className="h-[17px] w-[17px] text-accent-on-dark" strokeWidth={1.6} />
      </div>
      <div
        style={{ width: 158 }}
        className="box-border flex items-center justify-between rounded-lg border border-white/[0.12] bg-[#0A0A0C] p-[10px_12px]"
      >
        <span className="text-[11px] text-[#DDE1E6]">{isDe ? "Iterieren" : "Iterate"}</span>
        <LoopIcon className="h-[17px] w-[17px] text-accent-on-dark" strokeWidth={1.6} />
      </div>
    </>
  );
}

export const processClusters: ComponentType<ClusterProps>[] = [Cluster1, Cluster2, Cluster3, Cluster4, Cluster5];
