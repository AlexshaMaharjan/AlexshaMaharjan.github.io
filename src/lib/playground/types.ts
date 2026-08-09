export interface PlaygroundItem {
  slug?: string;
  caption: string;
  aspect: string;
  rotated?: boolean;
  subtitle?: string;
  description?: string;
}

export interface PlaygroundCategoryContent {
  slug: string;
  title: string;
  intro: string;
  items: PlaygroundItem[];
  moreComingNote: string;
  nextCategorySlug: string;
  nextCategoryTitle: string;
}

export interface PlaygroundCategorySummary {
  slug: string;
  title: string;
  caption: string;
}

export interface PlaygroundHomeContent {
  eyebrow: string;
  heading: string;
  intro: string;
  handNote: string;
  featuredHeading: string;
  featured: PlaygroundItem[];
  categoriesHeading: string;
  categoriesCaption: string;
  categories: PlaygroundCategorySummary[];
  galleryHeading: string;
  gallery: PlaygroundItem[];
  exploringHeading: string;
  exploringItems: string[];
  noteHeading: string;
  noteBody: string;
  returnHeading: string;
  returnCta: string;
}

export interface PlaygroundProjectContent {
  slug: string;
  categorySlug: string;
  categoryTitle: string;
  eyebrow: string;
  title: string;
  intro: string;
  mainCaption: string;
  mainAspect: string;
  processHeading: string;
  processItems: PlaygroundItem[];
  toolsHeading: string;
  tools: string[];
  reflectionHeading: string;
  reflection: string;
  nextLabel: string;
  nextSlug: string;
  nextCategorySlug: string;
  nextTitle: string;
}

export type PlaygroundCategoryLocaleContent = Record<"en" | "de", PlaygroundCategoryContent>;
export type PlaygroundHomeLocaleContent = Record<"en" | "de", PlaygroundHomeContent>;
export type PlaygroundProjectLocaleContent = Record<"en" | "de", PlaygroundProjectContent>;
