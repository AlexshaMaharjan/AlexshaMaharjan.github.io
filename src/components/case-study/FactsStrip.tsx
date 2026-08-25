import { Fragment } from "react";
import type { CaseStudyContent } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * The project's facts, as a label/value list rather than the card grid this
 * used to be.
 *
 * Two reasons for the change. The grid was `auto-fit` across the full page
 * width, so a study with three facts spread them across the whole strip while
 * one with five wrapped — six case studies, six different shapes. And the facts
 * now sit inside the Overview section, in the reading column, where a wide grid
 * has nowhere to go.
 *
 * `year` is gone (owner, 2026-08-25). `type` carries "Semester project" for
 * every study, because every one of them is coursework, and says solo or team
 * beside it — `DECISION-011` does not allow collaborative work to read as
 * independent.
 */
export default function FactsStrip({
  content,
  dictionary,
}: {
  content: CaseStudyContent;
  dictionary: Dictionary;
}) {
  const facts = [
    { label: dictionary.caseStudy.type, value: content.type },
    { label: dictionary.caseStudy.role, value: content.role },
    { label: dictionary.caseStudy.contribution, value: content.contribution },
    { label: dictionary.caseStudy.tools, value: content.tools },
    { label: dictionary.caseStudy.deliverables, value: content.deliverables },
  ].filter((fact) => fact.value);

  if (facts.length === 0) return null;

  return (
    <dl className="mt-9 grid max-w-[680px] grid-cols-1 gap-y-3 border-y border-surface-2 py-5 sm:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] sm:gap-x-7 sm:gap-y-3.5">
      {facts.map((fact) => (
        <Fragment key={fact.label}>
          <dt className="font-mono text-[11px] uppercase leading-[1.5] tracking-[0.08em] text-ink-muted sm:pt-[3px]">
            {fact.label}
          </dt>
          <dd className="text-[15px] leading-[1.55] text-ink-body">{fact.value}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
