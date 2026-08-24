import clsx from "clsx";
import type { ComponentType, ReactNode, SVGProps } from "react";
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
        "flex h-10 w-10 items-center justify-center rounded-lg border",
        active ? "border-white/[0.18] bg-[#1B3FE0]" : "border-white/10 bg-[#101116]",
      )}
    >
      <Icon className={clsx("h-5 w-5", active ? "text-white" : "text-[#A9B1FF]")} />
    </div>
  );
}

function DarkPanel({ width, children }: { width?: number; children: ReactNode }) {
  return (
    <div
      style={{ width, boxSizing: "border-box" }}
      className="rounded-lg border border-white/[0.12] bg-[#0A0A0C] p-3"
    >
      {children}
    </div>
  );
}

const monoLabel = "font-mono text-[9px] text-ink-on-dark-muted";

/* ---------- 01 · Understand ---------- */

function InterviewSketch() {
  return (
    <svg
      viewBox="0 0 74 76"
      aria-hidden="true"
      style={{ width: 66, height: 68, fill: "none", stroke: "#4A4B47", strokeWidth: 1.6, strokeLinecap: "round" }}
    >
      <path d="M37 6c7 0 11 4.4 11 10.2 0 5.6-4.4 9.8-11 9.8s-11-4.2-10.8-9.8C26.4 10.2 30.4 6 37 6Z" />
      <path d="M37 26.5c0 7.5.4 17.5.2 24.5" />
      <path d="M37.2 32c-5.6 2.4-11.4 4.2-16.8 3.6" />
      <path d="M37 32.4c5.4 2.6 11.2 4.6 16.6 4.2" />
      <path d="M37.2 51c-3.4 5.6-6.6 11.4-9.2 17.4" />
      <path d="M37.2 51.2c3.2 5.8 6.4 11.6 8.6 17.6" />
      <path d="M14 71.5c14.8-1.4 32-1.6 47-.6" style={{ opacity: 0.45 }} />
    </svg>
  );
}

export function Cluster1() {
  return (
    <>
      <Polaroid variant="a" rotate={-1.4} padding="9px 9px 12px" width={146}>
        <div className="flex items-center justify-center bg-[#E1DCD2] px-0 py-1.5">
          <InterviewSketch />
        </div>
        <p
          style={{ fontFamily: "Caveat,'Segoe Script','Bradley Hand',cursive" }}
          className="mt-[11px] text-[15px] leading-[1.15] text-[#1B1C1E]"
        >
          &ldquo;I just want something that actually works for me.&rdquo;
        </p>
        <p className="mt-[7px] font-mono text-[8px] text-[#696559]">— Interview participant</p>
      </Polaroid>

      <div className="relative" style={{ width: 178 }}>
        <Pin tone="blue" left="72%" />
        <Polaroid variant="b" rotate={1.4} padding="14px 13px 15px" width={178}>
          <div className="flex items-baseline justify-between gap-1.5">
            <p className="m-0 text-xs font-semibold tracking-[-0.01em] text-[#17181A]">SWOT</p>
            <span className="font-mono text-[8px] text-[#696559]">market view</span>
          </div>
          <div className="mt-[9px] grid grid-cols-2 border border-[#B9B4A8]">
            {["Strengths", "Weaknesses", "Opportunities", "Threats"].map((label, i) => (
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

      <DarkPanel width={132}>
        <span className={monoLabel}>Frustration rating</span>
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

      <IconBadge icon={EyeIcon} label="Icon: observation" active />
      <IconBadge icon={ResearchIcon} label="Icon: research" />
    </>
  );
}

/* ---------- 02 · Define ---------- */

export function Cluster2() {
  return (
    <>
      <div className="relative" style={{ width: 178 }}>
        <Pin tone="gray" />
        <div
          className="relative overflow-hidden rounded-lg border border-white/[0.12] box-border"
          style={{
            width: 178,
            height: 178,
            transform: "rotate(-1deg)",
            background:
              "#0C0D10 linear-gradient(rgba(255,255,255,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.055) 1px,transparent 1px)",
            backgroundSize: "22px 22px,22px 22px",
          }}
        >
          <span
            style={{ fontFamily: "Caveat,'Segoe Script','Bradley Hand',cursive", transform: "rotate(-2deg)" }}
            className="absolute left-3.5 top-11 rounded-full border-[1.5px] border-[#2F55F0] px-2.5 py-0.5 text-base text-[#E7E9ED]"
          >
            Impact
          </span>
          <span
            style={{ fontFamily: "Caveat,'Segoe Script','Bradley Hand',cursive" }}
            className="absolute left-[104px] top-12 text-base text-[#E7E9ED]"
          >
            × Effort
          </span>
          <svg
            viewBox="0 0 60 44"
            aria-hidden="true"
            style={{ position: "absolute", left: 96, top: 76, width: 52, height: 38, fill: "none", stroke: "#E7E9ED", strokeWidth: 1.4 }}
          >
            <path d="M6 38 L46 8" />
            <path d="M34 8 L47 7 L46 20" />
          </svg>
          <span
            style={{ fontFamily: "Caveat,'Segoe Script','Bradley Hand',cursive" }}
            className="absolute left-[26px] top-[120px] text-base text-[#E7E9ED]"
          >
            Focus here
          </span>
          <span aria-hidden="true" className="absolute bottom-5 right-5 block h-5 w-5 rounded-full bg-[#1B3FE0]" />
        </div>
      </div>

      <Polaroid variant="a" rotate={1.3} padding="14px 13px 17px" width={184}>
        <p className="m-0 text-xs font-semibold tracking-[-0.01em] text-[#17181A]">Opportunity statement</p>
        <p className="mt-2.5 text-[11.5px] leading-[1.5] text-[#33342E]">
          Help users move from scattered inputs to clear, confident action.
        </p>
        <span aria-hidden="true" className="mt-2 block h-0.5 w-[78%] bg-[#1B3FE0]" />
        <span aria-hidden="true" className="mt-[3px] block h-px w-[54%] bg-[#1B3FE0] opacity-55" />
      </Polaroid>

      <DarkPanel width={178}>
        <div className="flex items-start justify-between gap-2">
          <span className={monoLabel}>Problem framed</span>
          <TargetIcon className="h-3.5 w-3.5 shrink-0 text-[#A9B1FF]" />
        </div>
        <p className="mt-[9px] text-[10.5px] leading-[1.45] text-[#C4C9D0]">Reduce friction in decision making.</p>
      </DarkPanel>

      <DarkPanel width={178}>
        <div className="flex items-start justify-between gap-2">
          <span className={monoLabel}>Success looks like</span>
          <SparkleIcon className="h-3.5 w-3.5 shrink-0 text-[#A9B1FF]" />
        </div>
        <p className="mt-[9px] text-[10.5px] leading-[1.45] text-[#C4C9D0]">
          Users feel in control and complete tasks with confidence.
        </p>
      </DarkPanel>
    </>
  );
}

/* ---------- 03 · Explore ---------- */

function SitemapSketch() {
  const node = (key: string, x: number, y: number, w: number, h: number, rot: number, label: string, fs = 11) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={2} transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        style={{ fontFamily: "Caveat,'Segoe Script','Bradley Hand',cursive", fontSize: fs, fill: "#3A3B37", stroke: "none", textAnchor: "middle" }}
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
      {node("home", 74, 3, 60, 23, -0.6, "Home", 12)}
      <path d="M104 26.5 L104 46 M22 46 L186 46 M22 46 L22 58 M104 46 L104 58 M186 46 L186 58" />
      {node("work", 0, 58, 48, 22, 0.8, "Work")}
      {node("about", 80, 58, 48, 22, -0.7, "About")}
      {node("contact", 160, 58, 48, 22, 0.6, "Contact")}
      <path d="M24 80 L24 96 M6 96 L44 96 M6 96 L6 106 M44 96 L44 106" />
      {node("case-1", -1, 106, 30, 19, -1, "Case", 10)}
      {node("case-2", 33, 106, 30, 19, 0.9, "Case", 10)}
      <path d="M186 80 L186 92 M170 92 h32" style={{ opacity: 0.5 }} />
      {node("form", 158, 96, 56, 19, 0, "form", 10)}
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

export function Cluster3() {
  return (
    <>
      <div style={{ width: 236 }}>
        <div className="relative">
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
              <SitemapSketch />
            </div>
          </Polaroid>
        </div>
        <div
          style={{ margin: "-6px 0 0 14px", transform: "rotate(1.8deg)" }}
          className="flex items-start gap-2"
        >
          <Polaroid variant="b" rotate={0} padding="10px 11px 12px">
            <div className="flex items-start gap-2">
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
                  style={{ fontFamily: "Caveat,'Segoe Script','Bradley Hand',cursive" }}
                  className="mt-0.5 text-[15px] leading-[1.1] text-[#1B3FE0]"
                >
                  Simplify navigation
                </p>
              </div>
            </div>
          </Polaroid>
        </div>
      </div>

      <div className="flex flex-col gap-2.5" style={{ width: 188 }}>
        <DarkPanel>
          <p className="m-0 text-xs font-semibold tracking-[-0.01em] text-white">Concept direction</p>
          <div className="mt-3 flex flex-col gap-[9px]">
            <CheckItem label="One clear path" checked />
            <CheckItem label="Grouped by task" checked />
            <CheckItem label="Everything at once" checked={false} />
          </div>
        </DarkPanel>
        <div className="grid gap-2" style={{ gridTemplateColumns: "104px 76px", gridAutoRows: 62 }}>
          <DarkPanel>
            <p className="m-0 text-[10px] leading-[1.4] text-[#C4C9D0]">Exploring structure and flow.</p>
          </DarkPanel>
          <div className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-[#101116] p-2 box-border">
            <span className={monoLabel}>flow</span>
            <svg viewBox="0 0 60 14" aria-hidden="true" style={{ display: "block", width: "100%", height: "auto", fill: "none", stroke: "#8FA6FF", strokeWidth: 1.3, strokeLinecap: "round" }}>
              <circle cx="6" cy="7" r="4" />
              <path d="M11 7h11" />
              <circle cx="27" cy="7" r="4" />
              <path d="M32 7h11" />
              <circle cx="48" cy="7" r="4" style={{ fill: "#1B3FE0", stroke: "#2F55F0" }} />
            </svg>
          </div>
          <div className="flex h-full flex-col gap-1.5 rounded-lg border border-white/10 bg-[#101116] p-2 box-border">
            <span className={monoLabel}>variants</span>
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
          <div
            role="img"
            aria-label="Wireframe sketch: header block and text lines"
            className="flex h-full flex-col gap-1 rounded-lg bg-[#EDEAE3] box-border"
            style={{ padding: "9px 10px" }}
          >
            <span className="block h-[9px] rounded-sm bg-[#CFC9BC]" />
            <span className="mt-0.5 block h-0.5 bg-[#B9B4A8]" />
            <span className="block h-0.5 bg-[#B9B4A8]" />
            <span className="block h-0.5 w-3/5 bg-[#B9B4A8]" />
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- 04 · Design ---------- */

export function Cluster4() {
  return (
    <>
      <div
        style={{ width: 118, height: 156 }}
        className="box-border flex flex-col justify-between rounded-lg bg-[#F1EFE9] p-3"
      >
        <span aria-hidden="true" className="text-[62px] font-semibold leading-none tracking-[-0.04em] text-[#17181A]">
          Aa
        </span>
        <div>
          <span className="block text-[9.5px] text-[#5C5E62]">Inter Display</span>
          <span className="block font-mono text-[9px] text-[#6C6C6C]">Mono labels</span>
        </div>
      </div>

      <div style={{ width: 198 }} className="box-border rounded-lg bg-[#F1EFE9] p-[13px]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-[#6C6C6C]">Focus</span>
          <span aria-hidden="true" className="flex flex-col gap-[3px]">
            <span className="block h-[1.4px] w-[13px] bg-[#5C5E62]" />
            <span className="block h-[1.4px] w-[13px] bg-[#5C5E62]" />
            <span className="block h-[1.4px] w-[13px] bg-[#5C5E62]" />
          </span>
        </div>
        <p style={{ textWrap: "balance" }} className="mt-3 text-[15px] font-semibold leading-[1.25] tracking-[-0.015em] text-[#17181A]">
          All your work, clear and calm.
        </p>
        <span className="mt-3.5 inline-block rounded-full bg-[#1B3FE0] px-3 py-[7px] text-[10px] font-medium text-white">
          Get started →
        </span>
      </div>

      <div className="flex flex-col gap-4" style={{ width: 88 }}>
        <div className="relative" style={{ width: 88 }}>
          <Pin />
          <div
            style={{ height: 104, transform: "rotate(1.2deg)" }}
            className="box-border flex flex-col gap-[5px] border border-white/10 bg-[#101116] p-2"
          >
            <span className={monoLabel}>states</span>
            <span className="block rounded-full bg-[#1B3FE0] py-[3px] text-center text-[8px] text-white">Default</span>
            <span className="block rounded-full bg-[#2F55F0] py-[3px] text-center text-[8px] text-white">Hover</span>
            <span className="block rounded-full border border-white/[0.18] py-[3px] text-center text-[8px] text-[#7B7E84]">
              Disabled
            </span>
          </div>
        </div>
        <div className="relative" style={{ width: 88 }}>
          <Pin left="54%" />
          <div style={{ height: 76, transform: "rotate(-2deg)", boxShadow: "0 14px 30px rgba(0,0,0,0.5)" }} className="box-border flex flex-col justify-between bg-[#EDEAE3] p-[9px_10px]">
            <span className="font-mono text-[8px] text-[#696559]">spacing</span>
            <div className="flex flex-col gap-1">
              <span className="block h-[3px] w-[30%] bg-[#B9B4A8]" />
              <span className="block h-[3px] w-[58%] bg-[#B9B4A8]" />
              <span className="block h-[3px] w-full bg-[#1B3FE0]" />
            </div>
            <span className="font-mono text-[8px] text-[#696559]">4 · 8 · 16</span>
          </div>
        </div>
      </div>

      <div
        role="img"
        aria-label="Colour palette: ink, paper, black, cobalt"
        className="flex h-10 items-center gap-[5px] rounded-lg border border-white/10 bg-[#101116] p-[9px] box-border"
      >
        {["#33353B", "#F1EFE9", "#0A0A0C", "#1B3FE0"].map((c) => (
          <span key={c} className="block h-5 w-5 rounded" style={{ background: c }} />
        ))}
      </div>

      <IconBadge icon={ContrastIcon} label="Icon: contrast" />
      <IconBadge icon={RadiusIcon} label="Icon: radius" />
      <IconBadge icon={GridDotsIcon} label="Icon: grid" />
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

export function Cluster5() {
  return (
    <>
      <div
        style={{ width: 104, height: 120 }}
        className="box-border flex flex-col gap-[9px] rounded-lg border border-white/10 bg-[#141519] p-2.5"
      >
        <span className={monoLabel}>Before</span>
        <div
          role="img"
          aria-label="Earlier interface: dense, crowded layout"
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
            After
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
          <span className="font-mono text-[9px] text-[#696559]">User testing</span>
          <div className="mt-2.5 flex">
            <Avatar bg="#DAD4C8" offset={false} />
            <Avatar bg="#CFC9BC" offset />
            <Avatar bg="#DAD4C8" offset />
          </div>
          <p className="mt-2.5 text-[11px] leading-[1.45] text-[#33342E]">&ldquo;This just makes sense.&rdquo;</p>
        </Polaroid>
      </div>

      <div
        style={{ width: 158 }}
        className="box-border flex items-center justify-between rounded-lg border border-white/[0.12] bg-[#0A0A0C] p-[10px_12px]"
      >
        <span className="text-[11px] text-[#DDE1E6]">Validated</span>
        <ValidatedIcon className="h-[17px] w-[17px] text-accent-on-dark" strokeWidth={1.6} />
      </div>
      <div
        style={{ width: 158 }}
        className="box-border flex items-center justify-between rounded-lg border border-white/[0.12] bg-[#0A0A0C] p-[10px_12px]"
      >
        <span className="text-[11px] text-[#DDE1E6]">Iterate</span>
        <LoopIcon className="h-[17px] w-[17px] text-accent-on-dark" strokeWidth={1.6} />
      </div>
    </>
  );
}

export const processClusters: ComponentType[] = [Cluster1, Cluster2, Cluster3, Cluster4, Cluster5];
