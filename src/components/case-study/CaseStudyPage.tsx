import { Link } from "react-router-dom";
import type { CaseStudyContent } from "@/lib/caseStudies/types";
import type { Dictionary, ProjectCopy } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyIntro from "./CaseStudyIntro";
import ContentsNav from "./ContentsNav";
import Section from "./Section";
import MoreProjectsNav from "./MoreProjectsNav";

export default function CaseStudyPage({
  content,
  dictionary,
  locale,
  others,
}: {
  content: CaseStudyContent;
  dictionary: Dictionary;
  locale: Locale;
  others: ProjectCopy[];
}) {
  // The closing section leaves the reading column and gets its own band, so the
  // case study ends on something deliberate rather than running straight into
  // the other projects (SUGGESTION-003).
  const outro = content.sections.length > 1 ? content.sections[content.sections.length - 1] : undefined;
  const reading = outro ? content.sections.slice(0, -1) : content.sections;

  return (
    <article>
      {/*
       * The two-column grid starts at the top of the page, not below a hero.
       * That is the whole point of the 2026-08-25 layout change: a sticky rail
       * can only be visible when the page opens if there is nothing above it,
       * so the hero image and the title block moved inside the right column and
       * the title block moved inside the Overview section with them.
       */}
      <section className="pt-[var(--page-top)] pb-[120px]">
        <div className="container-page">
          <Link
            to={localeHref(locale, "/#work")}
            className="tap-target hidden text-[14px] text-ink-secondary transition-colors hover:text-accent md:inline-block"
          >
            {dictionary.caseStudy.backToProjects}
          </Link>

          <div className="grid md:mt-8 grid-cols-1 gap-10 xl:grid-cols-[240px_minmax(0,1fr)]">
            <ContentsNav sections={content.sections} dictionary={dictionary} />
            <div className="min-w-0 max-w-[960px]">
              <CaseStudyHero content={content} />
              {reading.map((section, i) => (
                <Section
                  key={section.id}
                  section={section}
                  dictionary={dictionary}
                  first={i === 0}
                  intro={i === 0 ? <CaseStudyIntro content={content} dictionary={dictionary} /> : undefined}
                />
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

      <MoreProjectsNav others={others} slug={content.slug} dictionary={dictionary} locale={locale} />
    </article>
  );
}
