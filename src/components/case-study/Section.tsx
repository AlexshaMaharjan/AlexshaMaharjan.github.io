import type { ReactNode } from "react";
import type { Block, CaseStudySection } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";
import Figure from "./Figure";
import SectionMedia from "./SectionMedia";

/**
 * The reading measure. Body text sits at ~70 characters a line; media and the
 * set pieces run wider, which is where the page gets its rhythm
 * (`SUGGESTION-003`, `DECISION-014`).
 */
const MEASURE = "max-w-[680px]";

/** A bare string in `body[]` is shorthand for a paragraph (ISSUE-024). */
function normalize(block: Block): Exclude<Block, string> {
  return typeof block === "string" ? { kind: "p", text: block } : block;
}

/**
 * Renders one `body[]` block. `first` only affects the top margin — the block
 * opening a section sits closer to its heading than blocks that follow one
 * another.
 */
function BodyBlock({ block, first }: { block: Block; first: boolean }) {
  const b = normalize(block);

  switch (b.kind) {
    case "p":
      return (
        <p className={`${MEASURE} text-[18px] leading-[1.7] text-ink-body ${first ? "mt-7" : "mt-5"}`}>
          {b.text}
        </p>
      );

    case "h3":
      return (
        <h3
          className={`${MEASURE} text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] ${first ? "mt-8" : "mt-12"}`}
        >
          {b.text}
        </h3>
      );

    case "list": {
      const List = b.ordered ? "ol" : "ul";
      return (
        <List
          className={`${MEASURE} flex list-outside flex-col gap-3 pl-5 text-[18px] leading-[1.6] text-ink-body marker:text-accent ${
            b.ordered ? "list-decimal" : "list-disc"
          } ${first ? "mt-7" : "mt-6"}`}
        >
          {b.items.map((item, i) => (
            <li key={i} className="pl-1.5">
              {item}
            </li>
          ))}
        </List>
      );
    }

    case "quote":
      return (
        <blockquote className={`max-w-[760px] ${first ? "mt-8" : "mt-12"}`}>
          <p className="border-l-2 border-accent pl-7 text-[24px] font-medium leading-[1.4] tracking-[-0.015em]">
            {b.text}
          </p>
          {b.attribution && (
            <cite className="mt-3 block pl-7 text-[14px] not-italic text-ink-secondary">{b.attribution}</cite>
          )}
        </blockquote>
      );

    case "note":
      return (
        <p
          className={`${MEASURE} border-l-2 border-ink-muted bg-surface py-4 pl-5 pr-5 text-[15px] leading-[1.6] text-ink-secondary ${
            first ? "mt-7" : "mt-8"
          }`}
        >
          {b.text}
        </p>
      );

    case "figure":
      return <Figure {...b} className={first ? "mt-8" : "mt-12"} />;
  }
}

/**
 * One case-study section. Every section takes the same render path — number,
 * nav label, heading, body, then its optional set pieces and media — and the
 * two flags vary only spacing and scale. Splitting the first section out is
 * what cost it its eyebrow and its scroll reveal (ISSUE-008).
 *
 * `outro` is the closing section, which `CaseStudyPage` lifts out of the
 * reading column onto its own band so the case study ends deliberately instead
 * of running into the prev/next cards (`SUGGESTION-003`).
 *
 * `intro` is rendered between the eyebrow and the heading, and is how the first
 * section carries the page's title, description and facts (`CaseStudyIntro`).
 * It sits inside the section rather than above it so that the reading order is
 * "01 Overview, then what this project is" — and so the contents rail can start
 * at the top of the page instead of below a hero.
 */
export default function Section({
  section,
  dictionary,
  first = false,
  outro = false,
  intro,
}: {
  section: CaseStudySection;
  dictionary: Dictionary;
  first?: boolean;
  outro?: boolean;
  intro?: ReactNode;
}) {
  const header = (
    <>
      {outro && <div className="mb-9 h-[3px] w-14 bg-accent" />}
      <div className="mb-7">
        <span className="font-mono text-[13px] text-accent">{section.number}</span>
        <span className="mt-1.5 block text-[14px] text-accent">{section.navLabel}</span>
      </div>
      {intro}
      {/* The first section's heading sits directly under the page's `h1` and is
          an introduction rather than a chapter title, so it steps down a size —
          otherwise the two compete and the hierarchy reads flat. */}
      <h2
        className={`m-0 max-w-[900px] font-semibold tracking-[-0.025em] ${
          outro
            ? "text-feature leading-[1.05]"
            : first
              ? "text-subheading leading-[1.15]"
              : "text-heading leading-[1.1]"
        }`}
      >
        {section.heading}
      </h2>
    </>
  );

  const body = (
    <>
      {section.body?.map((block, i) => <BodyBlock key={i} block={block} first={i === 0} />)}

      {section.designQuestion && (
        <div className="mt-14 max-w-[840px] rounded-[14px] bg-accent-soft px-7 py-8 sm:px-9 sm:py-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-accent">
            {dictionary.caseStudy.designQuestion}
          </span>
          <p className="mt-4 text-lead font-medium leading-[1.3] tracking-[-0.015em] text-ink">
            {section.designQuestion}
          </p>
        </div>
      )}

      {section.insights && (
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {section.insights.map((insight, i) => (
            <div key={i} className="rounded-[14px] border border-surface-2 bg-white p-6">
              <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3.5 text-[19px] font-semibold leading-[1.3] tracking-[-0.01em]">{insight.heading}</h3>
              <p className="mt-2.5 text-[16px] leading-[1.6] text-ink-secondary">{insight.body}</p>
            </div>
          ))}
        </div>
      )}

      {section.testing && (
        <ol className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-3">
          {section.testing.map((step, i) => (
            <li key={i} className="border-t-2 border-accent pt-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-accent">{step.label}</span>
              <p className="mt-2.5 text-[16px] leading-[1.6] text-ink-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      )}

      {section.images && <SectionMedia images={section.images} />}
    </>
  );

  return (
    <section id={section.id} data-inview className={first || outro ? undefined : "mt-30"}>
      {outro ? (
        // The closing section runs heading beside text, so the ending reads as a
        // spread rather than as one more column of the article.
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,680px)] xl:gap-16">
          <div className="xl:sticky xl:top-[calc(var(--anchor-offset)+24px)] xl:self-start">{header}</div>
          <div>{body}</div>
        </div>
      ) : (
        <>
          {header}
          {body}
        </>
      )}
    </section>
  );
}
