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
 * `year` is gone (owner, 2026-08-25). The five that remain are the owner's own
 * deck: **context, role, team, contribution, tools**, in that order.
 *
 * `type` and `deliverables` were the previous shape and are gone with the
 * second pass. `type` packed context and team into one string
 * ("Semester project · team") which the deck states as two facts, and got the
 * barrier-free kitchen wrong either way, since that one is a collaborative
 * university project rather than a semester project. `contribution` stays and
 * is what keeps `DECISION-011` honest: on a team project it says which part of
 * it was this designer's, so a collaboration cannot read as solo work.
 */
export default function FactsStrip({
  content,
  dictionary,
}: {
  content: CaseStudyContent;
  dictionary: Dictionary;
}) {
  const facts = [
    { label: dictionary.caseStudy.context, value: content.context },
    { label: dictionary.caseStudy.role, value: content.role },
    { label: dictionary.caseStudy.team, value: content.team },
    { label: dictionary.caseStudy.contribution, value: content.contribution },
    { label: dictionary.caseStudy.tools, value: content.tools },
  ].filter((fact) => fact.value);

  if (facts.length === 0) return null;

  return (
    <dl className="mt-9 grid grid-cols-1 gap-y-3 border-y border-surface-2 py-5 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-x-8 sm:gap-y-3.5">
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
