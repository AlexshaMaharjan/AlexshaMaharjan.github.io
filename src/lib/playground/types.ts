/**
 * What the playground page needs, and nothing else.
 *
 * **The categories are gone** (`MILESTONE-014` task 1). The playground has been
 * three things: an index of five category pages, then one long scrapbook, then
 * the deck of four collage cards it is now (`DECISION-027`). The category data
 * survived the second change and then survived the third one too, on the
 * argument that it was "the only place the captions are written down" — but the
 * collages carry their own captions on their own slots, so it was not that
 * either. What it actually was, for two sessions, was 47 items of content that
 * nothing rendered, that `content-audit` still checked, and that a caption
 * review was built against by mistake.
 *
 * `PlaygroundItem`, `PlaygroundCategoryContent` and the five category files went
 * with it, along with `Scrapbook.tsx` and `Tile.tsx`, which had had no importer
 * since `DECISION-027`.
 *
 * **The pictures now live in exactly one place**, `lib/playground/collage.ts`,
 * as slots on the card they are on.
 */
export interface PlaygroundHomeContent {
  eyebrow: string;
  heading: string;
  intro: string;
  /** The tag line under the intro, in `PageHero`'s shared slot. */
  tags: string;
  /** Labels for the page's motion control — it stops every clip (WCAG 2.2.2). */
  pauseMotion: string;
  playMotion: string;
}

export type PlaygroundHomeLocaleContent = Record<"en" | "de", PlaygroundHomeContent>;
