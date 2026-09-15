import { Link } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { localeHref } from "@/lib/i18n";
import type { ResumeEducationEntry, ResumeExperienceEntry, ResumeProjectEntry, ResumeFurtherEntry } from "@/lib/dictionaries";
import PrintButton from "@/components/resume/PrintButton";
import Seo from "@/components/Seo";

function EntryHeader({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <p className="text-[15.5px] font-semibold text-ink print:text-[10.5pt]">{title}</p>
      <p className="whitespace-nowrap font-mono text-[12px] text-ink-muted print:text-[9pt]">{period}</p>
    </div>
  );
}

function EntryBullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1 pl-[18px] text-[14px] leading-[1.5] text-ink-body print:mt-1 print:space-y-0.5 print:text-[9.5pt] print:leading-[1.45]">
      {bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

function EducationRow({ entry }: { entry: ResumeEducationEntry }) {
  return (
    <div className="resume-entry border-t border-surface-2 py-5 first:border-t-0 first:pt-0 print:py-2">
      <EntryHeader title={entry.degree} period={entry.period} />
      <p className="mt-1 text-[13.5px] text-ink-secondary print:mt-0.5 print:text-[9.5pt]">{entry.place}</p>
      {entry.detail && (
        <p className="mt-1 text-[13px] leading-[1.45] text-ink-muted print:mt-0.5 print:text-[9pt] print:leading-[1.4]">
          {entry.detail}
        </p>
      )}
    </div>
  );
}

function ProjectRow({ entry, breakAfter }: { entry: ResumeProjectEntry; breakAfter?: boolean }) {
  return (
    <div
      className={`resume-entry border-t border-surface-2 py-5 first:border-t-0 first:pt-0 print:py-2 ${
        breakAfter ? "print-break-after" : ""
      }`}
    >
      <EntryHeader title={entry.name} period={entry.period} />
      <p className="mt-1 text-[13.5px] text-ink-secondary print:mt-0.5 print:text-[9.5pt]">{entry.place}</p>
      <EntryBullets bullets={entry.bullets} />
    </div>
  );
}

function ExperienceRow({ entry }: { entry: ResumeExperienceEntry }) {
  return (
    <div className="resume-entry border-t border-surface-2 py-5 first:border-t-0 first:pt-0 print:py-2">
      <EntryHeader title={entry.role} period={entry.period} />
      <p className="mt-1 text-[13.5px] text-ink-secondary print:mt-0.5 print:text-[9.5pt]">{entry.place}</p>
      <EntryBullets bullets={entry.bullets} />
    </div>
  );
}

function FurtherRow({ entry }: { entry: ResumeFurtherEntry }) {
  return (
    <div className="resume-entry border-t border-surface-2 py-5 first:border-t-0 first:pt-0 print:py-2">
      <EntryHeader title={entry.title} period={entry.period} />
      {entry.place && <p className="mt-1 text-[13.5px] text-ink-secondary print:mt-0.5 print:text-[9.5pt]">{entry.place}</p>}
      {entry.bullets && <EntryBullets bullets={entry.bullets} />}
      {!entry.bullets && entry.description && (
        <p className="mt-1 text-[13.5px] text-ink-secondary print:mt-0.5 print:text-[9.5pt]">{entry.description}</p>
      )}
    </div>
  );
}

export default function Resume() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const r = dictionary.resume;

  return (
    <section className="resume-sheet pt-[var(--page-top)] pb-14 sm:pb-16 md:pb-20 print:pt-0 print:pb-0">
      <Seo title={r.metaTitle} />
      <div className="mx-auto max-w-[760px] px-5 md:px-0">
        <div className="flex items-center justify-between gap-4 print:hidden">
          <Link
            to={localeHref(locale, "/about")}
            className="tap-target text-[14px] text-ink-secondary transition-colors hover:text-accent"
          >
            {r.backToAbout}
          </Link>
          <PrintButton label={r.printCta} className="hidden md:flex" />
        </div>

        <div className="resume-head mt-8 flex items-start justify-between gap-6 border-b border-surface-2 pb-8 print:mt-0 print:border-surface-2 print:pb-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-heading font-semibold leading-[1.05] tracking-[-0.02em] text-ink print:text-[22pt]">
              {r.name}
            </h1>
            <p className="mt-2 text-[15px] font-medium text-accent print:mt-1 print:text-[11pt]">
              {r.tagline}
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-[13.5px] leading-[1.5] text-ink-secondary print:mt-2 print:gap-0.5 print:text-[9.5pt]">
              <span>{r.location}</span>
              <span>
                <a
                  href={`mailto:${r.email}`}
                  className="tap-target text-ink underline decoration-border underline-offset-2 hover:text-accent print:no-underline"
                >
                  {r.email}
                </a>
              </span>
              <span>
                <a
                  href={r.portfolioHref}
                  className="tap-target text-ink underline decoration-border underline-offset-2 hover:text-accent print:no-underline"
                >
                  {r.portfolio}
                </a>{" "}
                ·{" "}
                <a
                  href={r.linkedinHref}
                  className="tap-target text-ink underline decoration-border underline-offset-2 hover:text-accent print:no-underline"
                >
                  {r.linkedin}
                </a>
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/images/alexsha-portrait.webp"
              alt={r.name}
              className="h-[125px] w-[98px] rounded-md border border-surface-2 object-cover sm:h-[140px] sm:w-[110px] print:h-[45mm] print:w-[35mm] print:rounded-[3px] print:border print:border-[#dce1eb]"
            />
          </div>
        </div>

        <div className="resume-block mt-8 print:mt-4">
          <h2 className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent print:text-[10pt]">
            {r.profileHeading}
          </h2>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-body print:mt-1.5 print:text-[9.5pt] print:leading-[1.5]">
            {r.profileBody}
          </p>
        </div>

        <div className="resume-block mt-10 print:mt-4">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent print:pb-1 print:text-[10pt]">
            {r.educationHeading}
          </h2>
          <div className="resume-body pt-5 print:pt-2">
            {r.education.map((entry) => (
              <EducationRow key={entry.degree} entry={entry} />
            ))}
          </div>
        </div>

        <div className="resume-block mt-10 print:mt-4">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent print:pb-1 print:text-[10pt]">
            {r.projectsHeading}
          </h2>
          <div className="resume-body pt-5 print:pt-2">
            {r.projects.map((entry, idx) => (
              <ProjectRow key={entry.name} entry={entry} breakAfter={idx === 1} />
            ))}
          </div>
        </div>

        <div className="resume-block mt-10 print:mt-4">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent print:pb-1 print:text-[10pt]">
            {r.experienceHeading}
          </h2>
          <div className="resume-body pt-5 print:pt-2">
            {r.experience.map((entry) => (
              <ExperienceRow key={entry.role} entry={entry} />
            ))}
          </div>
        </div>

        <div className="resume-block mt-10 print:mt-4">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent print:pb-1 print:text-[10pt]">
            {r.furtherHeading}
          </h2>
          <div className="resume-body pt-5 print:pt-2">
            {r.further.map((entry) => (
              <FurtherRow key={entry.title} entry={entry} />
            ))}
          </div>
        </div>

        <div className="resume-block mt-10 print:mt-4">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent print:pb-1 print:text-[10pt]">
            {r.skillsHeading}
          </h2>
          <div className="resume-skills mt-4 grid grid-cols-1 gap-x-6 gap-y-3 text-[14px] leading-[1.5] sm:grid-cols-[140px_1fr] print:mt-2 print:grid-cols-[140px_1fr] print:gap-y-1.5 print:text-[9.5pt] print:leading-[1.45]">
            {r.skills.map((skill) => (
              <div key={skill.label} className="contents">
                <p className="font-semibold text-ink">{skill.label}</p>
                <p className="text-ink-body">{skill.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center md:hidden print:hidden">
          <PrintButton label={r.printCta} className="w-full justify-center text-center sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
