export interface BranchLayout {
  left: number;
  top: number;
  width: number;
  line: string;
  capA: { x: number; y: number };
  capB: { x: number; y: number };
}

export const branchLayout: BranchLayout[] = [
  {
    left: 4.5,
    top: 11,
    width: 344,
    line: "M536 400 L395 400",
    capA: { x: 536, y: 400 },
    capB: { x: 395, y: 400 },
  },
  {
    left: 67.5,
    top: 11,
    width: 382,
    line: "M904 400 L986 400",
    capA: { x: 904, y: 400 },
    capB: { x: 986, y: 400 },
  },
  {
    left: 4.5,
    top: 56,
    width: 444,
    line: "M650 443 L497 537",
    capA: { x: 650, y: 443 },
    capB: { x: 497, y: 537 },
  },
  {
    left: 67.5,
    top: 55,
    width: 436,
    line: "M807 442 L985 527",
    capA: { x: 807, y: 442 },
    capB: { x: 985, y: 527 },
  },
  {
    left: 40.5,
    top: 60.5,
    width: 352,
    line: "M720 450 L720 584",
    capA: { x: 720, y: 450 },
    capB: { x: 720, y: 584 },
  },
];
