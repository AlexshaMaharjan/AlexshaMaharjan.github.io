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
  /**
   * Share a column with the figure that follows, as a single cell in the
   * justified row (`MILESTONE-010` task 8). Two wide figures stacked beside a
   * tall one is a bento the row machinery cannot otherwise express: on their
   * own aspects the wide pair would each claim a row and the tall one a third.
   *
   * A stacked cell is never treated as `wide` — it is already a composite.
   */
  stackWithNext?: boolean;
  /**
   * A film rather than a still. `src` stays the **poster** — it is what the
   * page loads, what `srcset` serves and what `aspect` must match — and this is
   * the file fetched only when someone presses play (`ui/Video`).
   */
  video?: string;
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
  | ({ kind: "figure" } & SectionImage)
  /**
   * A run of figures placed *inside* the prose rather than in `images[]`.
   *
   * `images[]` renders after everything else in a section, which is right when
   * the figures are a gallery of outcomes and wrong when each one illustrates a
   * particular passage — a section with four sub-headings and six figures ends
   * up explaining things hundreds of pixels above the picture of them. This
   * carries the same array and hands it to the same `SectionMedia`, so grouping,
   * the lone-figure ceiling and `sizes` all behave identically; only the
   * position on the page changes.
   */
  | { kind: "figures"; items: SectionImage[] }
  /**
   * A short run of cards inside the prose — two to four of them, side by side
   * (`MILESTONE-019` task 6).
   *
   * It exists because of the WikiMind personas, which were three full-width
   * screenshots of persona sheets: 1600 x 1131 each, stacked, so the section
   * spent three screenfuls on documents whose type is unreadable at the width
   * they render at and whose content the paragraph above them already
   * summarises in one sentence. The owner asked for cards instead.
   *
   * It is not `CaseStudySection.insights`. Those close a section and are
   * numbered as findings; this sits mid-prose and is a *set* — the three people
   * a study was built around, the two routes a flow can take — so it carries a
   * free `label` rather than an index, and sits three-up rather than two.
   */
  | {
      kind: "cards";
      items: {
        label?: string;
        heading: string;
        body: string;
        /**
         * The closing line of a persona card: what this person needs, as a
         * middot-separated run (owner, second pass).
         *
         * It is a field rather than another sentence in `body` because it is
         * set apart on the card — a small label over a dotted list — and
         * because it is a *list* that happens to be written on one line. Every
         * persona in the owner's deck ends on one; nothing else does, so it is
         * optional.
         */
        needs?: string;
      }[];
    }
  /**
   * Prose and one figure, side by side (owner, second pass: "the image is too
   * big").
   *
   * A lone figure in a `figures` group takes the full 960px reading column and
   * up to 640px of height, which is right for a board that has to be read and
   * wrong for a mascot, a colour chip sheet or a bar chart with two rows in it.
   * Those are illustrations of the paragraph beside them, so this puts them
   * beside it: the text in one column, the figure in the other, stacking to one
   * column below `md`.
   *
   * `heading` is rendered as the same `h3` a bare `h3` block would produce, so
   * a sub-section that becomes a split does not change its heading level.
   */
  | {
      kind: "split";
      heading?: string;
      body: string[];
      figure: SectionImage;
      /** Figure first on wide screens. Below `md` the text always leads. */
      figureFirst?: boolean;
    }
  /**
   * A sequence, written across the page with arrows between the steps, rather
   * than down it as a numbered list (owner, second pass).
   *
   * The kitchen's cooking journey is the case it was built for: five words that
   * are a *path* — fridge, sink, worktop, hob, table — and an `ol` renders a
   * path as an inventory. Wraps to as many rows as it needs; the arrows are
   * `aria-hidden` and the list stays an `ol`, so a screen reader still hears
   * five ordered items.
   */
  | { kind: "steps"; items: string[] }
  /**
   * The project's own Figma prototype, playable in the page.
   *
   * It was a band under the article for one session and is a **block inside a
   * section** now (owner, SESSION-046): five of the six studies carry a
   * "Try it yourself" section of their own, numbered and in the contents rail
   * with everything else, placed just before the closing reflection. A case
   * study is an account of a project and this is the project — it belongs in
   * the argument, not in a footer after it.
   *
   * The barrier-free kitchen has no such section. It is a 3D environment and a
   * set of physical tests, and the owner confirmed there is nothing to link.
   *
   * Two URLs for one prototype, because they are used at different moments:
   * `embed` is the `embed.figma.com` player that runs in the page, `href` the
   * `figma.com` address for opening it full-screen in its own tab. Both carry
   * the same `node-id` and `starting-point-node-id`, so they land on the same
   * first screen.
   *
   * **A prototype only works for a visitor if its file is shared** as "Anyone
   * with the link — can view". Otherwise a visitor gets a sign-in wall with the
   * owner's file name on it, and nothing in the code can check that. All five
   * were verified in a signed-out browser when they were added.
   */
  | {
      kind: "prototype";
      /** `embed.figma.com/proto/…` — the in-page player. */
      embed: string;
      /** `figma.com/proto/…` — opened in a new tab. */
      href: string;
      /** What this prototype is, in this locale. Also the iframe's title. */
      label: string;
      /**
       * The player's box, as a CSS `aspect-ratio`. Defaults to `"16/10"`, which
       * is the shape of a desktop Figma frame.
       *
       * **It was `"16/9"` until SESSION-049**, and that was the reason the
       * owner found the prototypes small: Figma's desktop frames are 900 to
       * 1024 tall against 1440 wide, all of them taller than 16/9, so the box's
       * height rather than its width decided the scale and the extra width went
       * unused. See the `prototype` case in `case-study/Section`.
       *
       * Sync FM is the reason this field exists at all: a 9:19.5 phone inside a
       * landscape box is letterboxed down to about 360px tall on a 960px
       * column, which is a picture of a prototype rather than one that can be
       * used.
       *
       * **All five carry a measured one now** (`SESSION-049`). The default was
       * never going to be right for any of them, because a Figma prototype is
       * fitted to its box and its box was a guess: measured off the rendered
       * player at a 980px width, every one of the five was **wasting 31-35% of
       * its box on empty margin** because the design was taller than the box
       * and Figma was fitting it by height.
       *
       * | | frame | was | now |
       * | --- | --- | --- | --- |
       * | afono | 1.252 | `16/9` | `5/4` |
       * | surugami | 1.270 | `16/9` | `5/4` |
       * | qis-portal | 1.214 | `16/9` | `6/5` |
       * | wikimind | 1.196 | `16/9` | `6/5` |
       * | sync-fm | 0.431 | `4/3` | `1/1` |
       *
       * The AFONO prototype went from 610 to 883 CSS px of drawn width across
       * the two changes — the box, and its shape — which is 45% wider and more
       * than twice the area.
       *
       * Sync FM is the exception and is not set to its own 0.431: a portrait
       * box that shape would be 2,275px tall on a 980px column. `1/1` lets the
       * section take whatever the `82svh` ceiling allows on any window, and the
       * white either side of a phone is not waste — it is what a phone looks
       * like in a reading column.
       *
       * **These were read off screenshots of the running players**, by finding
       * the letterbox bars, because a cross-origin iframe cannot be measured
       * any other way. If a prototype's start frame is ever changed in Figma,
       * this number is stale and nothing in the build will say so.
       */
      aspect?: string;
    };

export interface CaseStudySection {
  id: string;
  navLabel: string;
  number: string;
  heading: string;
  body?: Block[];
  designQuestion?: string;
  insights?: InsightItem[];
  /**
   * How many columns the `insights` grid takes at `sm` and up. Two by default,
   * which is right for four or six cards; three is for a set of exactly three,
   * where two columns leave one card alone on a second row (the kitchen's
   * sight/action/touch framework, owner's second pass).
   */
  insightColumns?: 2 | 3;
  testing?: TestingStep[];
  images?: SectionImage[];
}

export interface CaseStudyContent {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  heroDisclosure?: string;
  tags: string[];
  /**
   * The four facts the owner's deck gives every project, in its order:
   * context, role, team, tools. `contribution` is a fifth that only the
   * barrier-free kitchen carries, where the deck lists what inside a
   * collaborative project was actually this designer's work.
   *
   * This replaces `type` and `deliverables`. `type` packed context and team
   * into one string ("Semester project · team"); the deck states them
   * separately, and "Collaborative university project" was never a semester
   * project at all. `deliverables` is not a fact the deck reports for any of
   * the six.
   */
  context: string;
  role: string;
  team: string;
  contribution: string;
  tools: string;
  heroImage: { src: string; alt: string; aspect: string };
  sections: CaseStudySection[];
}

export type CaseStudyLocaleContent = Record<"en" | "de", CaseStudyContent>;
