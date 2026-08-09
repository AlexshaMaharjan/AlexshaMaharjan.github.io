import type { CaseStudySection } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";

export default function ContentsNav({
  sections,
  dictionary,
}: {
  sections: CaseStudySection[];
  dictionary: Dictionary;
}) {
  return (
    <>
      <nav
        aria-label={dictionary.caseStudy.onThisPage}
        className="sticky top-[104px] hidden max-w-[240px] flex-col gap-2.5 self-start md:flex"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="font-mono text-[12px] text-ink-secondary transition-colors hover:text-accent"
          >
            {s.navLabel}
          </a>
        ))}
      </nav>

      <details className="mb-10 rounded-lg border border-border p-3.5 md:hidden">
        <summary className="cursor-pointer text-[14px] font-medium">{dictionary.caseStudy.onThisPage}</summary>
        <nav className="flex flex-col gap-2.5 pt-3.5">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="text-[14px] text-ink-secondary hover:text-accent">
              {s.navLabel}
            </a>
          ))}
        </nav>
      </details>
    </>
  );
}
