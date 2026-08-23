import type { CaseStudyContent } from "@/lib/caseStudies/types";
import type { Dictionary, ProjectCopy } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import CaseStudyHero from "./CaseStudyHero";
import FactsStrip from "./FactsStrip";
import ContentsNav from "./ContentsNav";
import Section from "./Section";
import NextProjectNav from "./NextProjectNav";

export default function CaseStudyPage({
  content,
  dictionary,
  locale,
  prev,
  next,
}: {
  content: CaseStudyContent;
  dictionary: Dictionary;
  locale: Locale;
  prev: ProjectCopy;
  next: ProjectCopy;
}) {
  // The closing section leaves the reading column and gets its own band, so the
  // case study ends on something deliberate rather than running straight into
  // the prev/next cards (SUGGESTION-003).
  const outro = content.sections.length > 1 ? content.sections[content.sections.length - 1] : undefined;
  const reading = outro ? content.sections.slice(0, -1) : content.sections;

  return (
    <article>
      <CaseStudyHero content={content} dictionary={dictionary} locale={locale} />
      <FactsStrip content={content} dictionary={dictionary} />

      <section className="pt-[76px] pb-[120px]">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[240px_minmax(0,1fr)]">
            <ContentsNav sections={content.sections} dictionary={dictionary} />
            <div className="min-w-0 max-w-[960px]">
              {reading.map((section, i) => (
                <Section key={section.id} section={section} dictionary={dictionary} first={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {outro && (
        <section className="border-t border-surface-2 bg-surface py-[104px]">
          <div className="container-page">
            <div className="max-w-[1200px]">
              <Section section={outro} dictionary={dictionary} outro />
            </div>
          </div>
        </section>
      )}

      <NextProjectNav prev={prev} next={next} dictionary={dictionary} locale={locale} />
    </article>
  );
}
