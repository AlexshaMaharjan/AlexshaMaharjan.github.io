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
}

export interface CaseStudySection {
  id: string;
  navLabel: string;
  number: string;
  heading: string;
  body?: string[];
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
