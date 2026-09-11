import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { CaseStudySection } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * Which section is being read.
 *
 * The observer is rebuilt on every pathname change rather than on mount: React
 * Router reuses one component instance when only the `:slug` param changes
 * (`ARCH-01`), and a mount-only effect would keep watching the previous case
 * study's elements — the same shape of bug as `ISSUE-001`.
 *
 * The band is the top of the viewport under the header down to just below the
 * middle, so a section counts as current once its start has passed the header
 * and stops counting well before it leaves the screen.
 */
function useActiveSection(sections: CaseStudySection[]): number {
  const { pathname } = useLocation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const onScreen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target.id);
          else onScreen.delete(entry.target.id);
        }
        const index = sections.findIndex((section) => onScreen.has(section.id));
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-120px 0px -45% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname, sections]);

  return active;
}

export default function ContentsNav({
  sections,
  dictionary,
}: {
  sections: CaseStudySection[];
  dictionary: Dictionary;
}) {
  const active = useActiveSection(sections);

  return (
    <>
      {/* The rail needs a reading column beside it that is still worth reading;
          below 1280px it would leave the text about 300px wide, so the
          collapsible list below takes over instead. */}
      <nav
        aria-label={dictionary.caseStudy.onThisPage}
        className="sticky top-[var(--anchor-offset)] hidden max-w-[240px] flex-col self-start xl:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
          {dictionary.caseStudy.onThisPage}
        </span>
        <ol className="mt-5">
          {sections.map((section, i) => (
            <li key={section.id} className="relative pl-4">
              <span
                aria-hidden
                className={`absolute left-0 top-0 h-full w-[2px] ${i <= active ? "bg-accent" : "bg-surface-2"}`}
              />
              <a
                href={`#${section.id}`}
                aria-current={i === active ? "location" : undefined}
                className={`flex gap-2 py-2 font-mono text-[12px] leading-[1.4] transition-colors ${
                  i === active ? "text-accent" : "text-ink-secondary hover:text-accent"
                }`}
              >
                <span className={i === active ? "text-accent" : "text-ink-muted"}>{section.number}</span>
                <span className="font-sans">{section.navLabel}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/*
        Sticky under the header below `xl` (`MILESTONE-016` task 2).

        The desktop rail is a sticky column beside the article; below `xl` there
        is no column to put it in, so it was a `<details>` at the top of the page
        that scrolled away with the first section. On a case study that is nine
        sections and several thousand words long, "on this page" is worth having
        *while* you are on the page, which is the whole reason the desktop rail
        is sticky too.

        `z-[100]` clears the article and stays under the header (`z-[200]`), and
        the background is opaque because sections scroll underneath it.
      */}
      <details className="sticky top-[var(--header-h)] z-[100] mb-10 rounded-lg border border-border bg-white p-3.5 shadow-[0_2px_10px_rgba(20,30,60,0.06)] xl:hidden">
        <summary className="cursor-pointer text-[14px] font-medium">
          {dictionary.caseStudy.onThisPage}
          <span className="ml-2 font-normal text-ink-secondary">
            · {sections[active]?.navLabel}
          </span>
        </summary>
        <nav aria-label={dictionary.caseStudy.onThisPage} className="flex flex-col gap-2.5 pt-3.5">
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={i === active ? "location" : undefined}
              className={`text-[14px] ${i === active ? "text-accent" : "text-ink-secondary hover:text-accent"}`}
            >
              <span className="mr-2 font-mono text-[12px] text-ink-muted">{section.number}</span>
              {section.navLabel}
            </a>
          ))}
        </nav>
      </details>
    </>
  );
}
