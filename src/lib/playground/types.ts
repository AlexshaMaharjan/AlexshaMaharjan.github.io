export interface PlaygroundItem {
  caption: string;
  aspect: string;
  /**
   * Optional real asset. Without it the slot renders as the hatched
   * placeholder; with it, the image. Optional so no existing data had to
   * change (ISSUE-007, DECISION-006).
   */
  src?: string;
  alt?: string;
  /** Tilts the card a degree or two, the way a taped-in photograph sits. */
  rotated?: boolean;
  subtitle?: string;
  /**
   * A short muted clip that loops on its own (`DECISION-026`). `src` stays the
   * poster, so a tile with no `video` and a tile whose clip has not loaded look
   * the same, and `prefers-reduced-motion` simply keeps the poster.
   */
  video?: string;
  /**
   * A written card instead of a picture. The scrapbook carries the owner's own
   * words between the images — it is how the motorbike study's reflection
   * survived losing its own page (`DECISION-026`), rather than being deleted.
   */
  note?: string;
}

export interface PlaygroundCategoryContent {
  slug: string;
  title: string;
  intro: string;
  items: PlaygroundItem[];
  moreComingNote: string;
}

export interface PlaygroundHomeContent {
  /** Labels for the page's motion control — it stops every clip (WCAG 2.2.2). */
  pauseMotion: string;
  playMotion: string;
  /** The two tilted cards in the hero collage. */
  heroCards: PlaygroundItem[];
  eyebrow: string;
  heading: string;
  intro: string;
  handNote: string;
  /** Names the in-page contents nav for screen readers. */
  categoriesHeading: string;
  categoriesCaption: string;
  /** Prefixes the list of things a category is still waiting for. */
  pendingLabel: string;
  exploringHeading: string;
  exploringItems: string[];
  noteBody: string;
  returnCta: string;
}

export type PlaygroundCategoryLocaleContent = Record<"en" | "de", PlaygroundCategoryContent>;
export type PlaygroundHomeLocaleContent = Record<"en" | "de", PlaygroundHomeContent>;
