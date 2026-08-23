import type { CaseStudyContent } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";

export default function FactsStrip({
  content,
  dictionary,
}: {
  content: CaseStudyContent;
  dictionary: Dictionary;
}) {
  const facts: { label: string; value: string; wide?: boolean }[] = [
    { label: dictionary.caseStudy.role, value: content.role },
    { label: dictionary.caseStudy.contribution, value: content.contribution },
    { label: dictionary.caseStudy.type, value: content.type },
    { label: dictionary.caseStudy.year, value: content.year },
    { label: dictionary.caseStudy.tools, value: content.tools },
    { label: dictionary.caseStudy.deliverables, value: content.deliverables, wide: true },
  ].filter((f) => f.value);

  return (
    <section className="pt-16">
      <div className="container-page">
        <dl className="grid grid-cols-1 gap-x-10 gap-y-[30px] border-t border-surface-2 pt-[30px] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
          {facts.map((fact) => (
            <div key={fact.label} className={fact.wide ? "sm:col-span-2" : undefined}>
              <dt className="font-mono text-[12px] text-ink-muted">{fact.label}</dt>
              <dd className="mt-1.5 text-[15px] leading-[1.6] text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
