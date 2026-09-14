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
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
        Floating pill with 12px clearance under navbar, compact height,
        and auto-closing drawer on item selection.
      */}
      <details
        open={isOpen}
        onToggle={(e) => setIsOpen((e.currentTarget as HTMLDetailsElement).open)}
        className="sticky top-[calc(var(--header-h)+12px)] z-[100] mb-3 sm:mb-4 rounded-lg border border-border bg-white/95 px-3.5 py-2 shadow-[0_4px_16px_rgba(20,30,60,0.08)] backdrop-blur-md transition-all xl:hidden"
      >
        <summary
          onClick={(e) => {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }}
          className="flex cursor-pointer list-none items-center justify-between text-[13px] font-medium select-none [&::-webkit-details-marker]:hidden"
        >
          <span className="flex items-center gap-1.5 truncate">
            <span>{dictionary.caseStudy.onThisPage}</span>
            <span className="truncate font-normal text-ink-secondary">
              · {sections[active]?.navLabel}
            </span>
          </span>
          <svg
            className={`ml-2 h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <nav
          aria-label={dictionary.caseStudy.onThisPage}
          className="mt-2 flex max-h-[48vh] flex-col gap-0.5 overflow-y-auto border-t border-border/60 pt-2 text-[13px]"
        >
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setIsOpen(false)}
              aria-current={i === active ? "location" : undefined}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                i === active
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-ink-secondary hover:bg-surface hover:text-accent"
              }`}
            >
              <span className={`font-mono text-[11px] ${i === active ? "text-accent" : "text-ink-muted"}`}>
                {section.number}
              </span>
              <span className="truncate">{section.navLabel}</span>
            </a>
          ))}
        </nav>
      </details>
    </>
  );
}
