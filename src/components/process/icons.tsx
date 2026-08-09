import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ResearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </svg>
  );
}

export function ChallengeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ExploreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20 18 6" />
      <path d="M9.5 6H18v8.5" />
    </svg>
  );
}

export function DesignIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function RefineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5 9.5 17 19 6" />
    </svg>
  );
}

export const branchIcons = [ResearchIcon, ChallengeIcon, ExploreIcon, DesignIcon, RefineIcon];

export function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V10" />
      <path d="M10.5 20V4" />
      <path d="M17 20v-7" />
    </svg>
  );
}

export function PersonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.8 4.6-6 7.5-6s6.1 2.2 7.5 6" />
    </svg>
  );
}

export function SketchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5 5 15l11-11 3.5 3.5-11 11z" />
      <path d="M14 6.5 17.5 10" />
    </svg>
  );
}

export function PaletteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="7.5" cy="9" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="9" r="1.4" fill="currentColor" stroke="none" />
      <path d="M4 13c0-5 3.6-9 8.5-9C17.7 4 21 7.3 21 11.5c0 3-2 4.5-4.5 4.5H15c-1 0-1.5.7-1 1.6.6 1.1-.2 2.4-1.6 2.4C7.3 20 4 17.2 4 13Z" />
    </svg>
  );
}

export function CompareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3v18" />
      <path d="M16 3v18" />
      <path d="M3 8h4M3 16h4" />
      <path d="M17 8h4M17 16h4" />
    </svg>
  );
}

export const tileIcons = [ChartIcon, PersonIcon, SketchIcon, PaletteIcon, CompareIcon];

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="12" rx="8" ry="5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DiamondIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="8.5" y="8.5" width="7" height="7" transform="rotate(45 12 12)" />
    </svg>
  );
}

export function FlowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <line x1="4" y1="12" x2="17" y2="12" />
      <path d="M13 8l4 4-4 4" />
    </svg>
  );
}

export function ComponentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <rect x="9" y="9" width="6" height="6" />
    </svg>
  );
}

export function LoopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="7" strokeDasharray="30 8" />
      <path d="M16 5l3 1-1 3" />
    </svg>
  );
}

export function ContrastIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
    </svg>
  );
}

export function RadiusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="5" width="14" height="14" rx="4" />
    </svg>
  );
}

export function GridDotsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props} strokeWidth={0} fill="currentColor">
      {[8, 12, 16].flatMap((cx) => [8, 12, 16].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" />))}
    </svg>
  );
}

export function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7" />
    </svg>
  );
}

export function ValidatedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </svg>
  );
}
