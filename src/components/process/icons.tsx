/**
 * The nine line icons the process map's clusters draw with
 * (`components/process/clusters`).
 *
 * **It held twenty-three** until `MILESTONE-020` task 7. Twelve of them, plus
 * two arrays collecting them — `branchIcons` and `tileIcons` — were left over
 * from earlier shapes of the map: one icon per branch when a branch had a
 * badge, one per tile when the clusters were a grid of them. Both ideas are
 * gone from `clusters.tsx` and the drawings had stayed, exported, rendered by
 * nothing, and passing every check the harness runs — `tsc` and ESLint have no
 * opinion about an export nobody imports.
 *
 * That is over half the file, and the cost of keeping it was not the bytes: it
 * was that a reader looking for the map's icon vocabulary found twenty-three
 * candidates for nine slots, with nothing to say which nine.
 *
 * All nine share `base`, which is the actual reason this file exists — one
 * stroke weight, one cap style, one 24-unit box, so the map's icons are a set
 * rather than a collection.
 */
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

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="12" rx="8" ry="5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
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
