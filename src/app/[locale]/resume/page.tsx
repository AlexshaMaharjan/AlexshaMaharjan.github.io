import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, defaultLocale, localeHref } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import type { ResumeEducationEntry, ResumeExperienceEntry, ResumeProjectEntry, ResumeFurtherEntry } from "@/lib/dictionaries";
import PrintButton from "@/components/resume/PrintButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);
  return { title: dictionary.resume.metaTitle };
}

function EntryHeader({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <p className="text-[16px] font-semibold text-ink">{title}</p>
      <p className="whitespace-nowrap font-mono text-[12px] text-ink-muted">{period}</p>
    </div>
  );
}

function EntryBullets({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1 pl-[18px] text-[14px] leading-[1.5] text-ink-body">
      {bullets.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

function EducationRow({ entry }: { entry: ResumeEducationEntry }) {
  return (
    <div className="border-t border-surface-2 py-6 first:border-t-0 first:pt-0">
      <EntryHeader title={entry.degree} period={entry.period} />
      <p className="mt-1.5 text-[14px] text-ink-secondary">{entry.place}</p>
      {entry.detail && <p className="mt-1.5 text-[13.5px] leading-[1.5] text-ink-muted">{entry.detail}</p>}
    </div>
  );
}

function ProjectRow({ entry }: { entry: ResumeProjectEntry }) {
  return (
    <div className="border-t border-surface-2 py-6 first:border-t-0 first:pt-0">
      <EntryHeader title={entry.name} period={entry.period} />
      <p className="mt-1.5 text-[14px] text-ink-secondary">{entry.place}</p>
      <EntryBullets bullets={entry.bullets} />
    </div>
  );
}

function ExperienceRow({ entry }: { entry: ResumeExperienceEntry }) {
  return (
    <div className="border-t border-surface-2 py-6 first:border-t-0 first:pt-0">
      <EntryHeader title={entry.role} period={entry.period} />
      <p className="mt-1.5 text-[14px] text-ink-secondary">{entry.place}</p>
      <EntryBullets bullets={entry.bullets} />
    </div>
  );
}

function FurtherRow({ entry }: { entry: ResumeFurtherEntry }) {
  return (
    <div className="border-t border-surface-2 py-6 first:border-t-0 first:pt-0">
      <EntryHeader title={entry.title} period={entry.period} />
      <p className="mt-1.5 text-[14px] text-ink-secondary">
        {entry.place} · {entry.description}
      </p>
    </div>
  );
}

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);
  const r = dictionary.resume;

  return (
    <section className="pt-[150px] pb-[140px] print:pt-10">
      <div className="mx-auto max-w-[760px] px-5 md:px-0">
        <Link
          href={localeHref(locale, "/about")}
          className="text-[14px] text-ink-secondary transition-colors hover:text-accent print:hidden"
        >
          {r.backToAbout}
        </Link>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-6 border-b border-surface-2 pb-8">
          <div>
            <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
              {r.name}
            </h1>
            <p className="mt-2 text-[15px] font-medium text-accent">{r.tagline}</p>
            <div className="mt-4 flex flex-col gap-1.5 text-[13.5px] leading-[1.5] text-ink-secondary">
              <span>{r.location}</span>
              <span>
                {r.phone} ·{" "}
                <a href={`mailto:${r.email}`} className="text-ink underline decoration-border underline-offset-2 hover:text-accent">
                  {r.email}
                </a>
              </span>
              <span>
                <a href={r.portfolioHref} className="text-ink underline decoration-border underline-offset-2 hover:text-accent">
                  {r.portfolio}
                </a>{" "}
                ·{" "}
                <a href={r.linkedinHref} className="text-ink underline decoration-border underline-offset-2 hover:text-accent">
                  {r.linkedin}
                </a>
              </span>
            </div>
          </div>
          <PrintButton label={r.printCta} />
        </div>

        <div className="mt-8">
          <h2 className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent">
            {r.profileHeading}
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-ink-body">{r.profileBody}</p>
        </div>

        <div className="mt-10">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent">
            {r.educationHeading}
          </h2>
          <div>
            {r.education.map((entry) => (
              <EducationRow key={entry.degree} entry={entry} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent">
            {r.projectsHeading}
          </h2>
          <div>
            {r.projects.map((entry) => (
              <ProjectRow key={entry.name} entry={entry} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent">
            {r.experienceHeading}
          </h2>
          <div>
            {r.experience.map((entry) => (
              <ExperienceRow key={entry.role} entry={entry} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent">
            {r.furtherHeading}
          </h2>
          <div>
            {r.further.map((entry) => (
              <FurtherRow key={entry.title} entry={entry} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="border-b border-accent pb-2 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-accent">
            {r.skillsHeading}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 text-[14px] leading-[1.5] sm:grid-cols-[130px_1fr]">
            {r.skills.map((skill) => (
              <div key={skill.label} className="contents">
                <p className="font-semibold text-ink">{skill.label}</p>
                <p className="text-ink-body">{skill.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
