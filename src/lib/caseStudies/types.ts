export interface InsightItem {
  heading: string;
  body: string;
}

export interface TestingStep {
  label: string;
  body: string;
}

export interface SectionImage {
  aspect: string;
  caption: string;
  /**
   * Optional real asset. Without it the slot renders as the hatched
   * `PlaceholderImage` (DECISION-006); with it, a real `<img>` plus a readable
   * caption. Optional so no existing data had to change (ISSUE-007).
   */
  src?: string;
  alt?: string;
  /**
   * Forces the full-column treatment instead of the grid. Left unset, the
   * aspect ratio decides — anything 3:2 or wider carries a row on its own.
   */
  wide?: boolean;
}

/**
 * One piece of section body content.
 *
 * A bare string is shorthand for a paragraph, so the pre-block-model data stays
 * valid and migration can happen one case study at a time (ISSUE-024).
 */
export type Block =
  | string
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "note"; text: string }
  | ({ kind: "figure" } & SectionImage);

export interface CaseStudySection {
  id: string;
  navLabel: string;
  number: string;
  heading: string;
  body?: Block[];
  designQuestion?: string;
  insights?: InsightItem[];
  testing?: TestingStep[];
  images?: SectionImage[];
}

export interface CaseStudyContent {
  slug: string;
  name: string;
  projectTag: string;
  headline: string;
  summary: string;
  heroDisclosure?: string;
  tags: string[];
  role: string;
  contribution: string;
  type: string;
  year: string;
  tools: string;
  deliverables: string;
  heroImage: { src: string; alt: string; aspect: string };
  sections: CaseStudySection[];
}

export type CaseStudyLocaleContent = Record<"en" | "de", CaseStudyContent>;
