import type { CaseStudyContent } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";
import FactsStrip from "./FactsStrip";

/**
 * The case study's title, description and facts.
 *
 * These used to be a full-width hero above the article: `text-hero` headline,
 * summary, tags and facts strip, all before the reading column began. The owner
 * asked for them smaller and inside the Overview section (2026-08-25), which is
 * also what lets the contents rail be on screen when the page opens — the rail
 * can only be visible from the start if the two-column grid starts at the top,
 * and it can only start at the top if this block is no longer sitting above it.
 *
 * `Section` renders it between the section's eyebrow and its heading, so the
 * page reads: 01 Overview → title → description → facts → the section's own
 * heading and prose.
 *
 * This carries the page's `h1`. It is `text-feature` rather than `text-hero`:
 * still the largest thing on the page, no longer the only thing on the screen.
 */
export default function CaseStudyIntro({
  content,
  dictionary,
}: {
  content: CaseStudyContent;
  dictionary: Dictionary;
}) {
  return (
    /* The page's first words arrive in the order they are read
       (`MILESTONE-023` task 5): the headline, then the summary, then the tags
       and the facts. `text` is the typographic stagger in `lib/motion`. */
    <div data-inview="text" className="mb-12">
      <h1 className="m-0 text-feature font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
        {content.headline}
      </h1>
      <p className="mt-5 text-[19px] leading-[1.7] text-ink-secondary">{content.summary}</p>
      {content.heroDisclosure && (
        <p className="mt-3 font-mono text-[13px] leading-[1.5] text-ink-muted">
          {content.heroDisclosure}
        </p>
      )}
      {content.tags.length > 0 && (
        <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
          {content.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-[5px] text-[13px] leading-[1.4] text-ink-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      <FactsStrip content={content} dictionary={dictionary} />
    </div>
  );
}
