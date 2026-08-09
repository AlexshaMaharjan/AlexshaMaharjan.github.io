import { Link } from "react-router-dom";
import Image from "@/components/ui/Image";
import { localeHref, type Locale } from "@/lib/i18n";
import type { ProjectCopy, Dictionary } from "@/lib/dictionaries";

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-border px-3 py-[6px] text-[13px] text-ink-secondary">
          {tag}
        </span>
      ))}
    </div>
  );
}

function RoleYear({ role, year }: { role: string; year: string }) {
  return (
    <p className="font-mono text-[13px] text-ink-muted">
      {role}
      {year ? ` · ${year}` : ""}
    </p>
  );
}

export function FeaturedProject({
  project,
  locale,
  dictionary,
}: {
  project: ProjectCopy;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const href = localeHref(locale, `/work/${project.slug}`);
  return (
    <article className="mb-32">
      <p className="mb-3.5 font-mono text-[13px] text-accent">{project.projectTag}</p>
      <Link to={href} aria-label={`${project.name} case study`} className="block">
        <div
          className="relative w-full overflow-hidden rounded-[10px] border border-[#E4E7EE] bg-surface"
          style={{ aspectRatio: project.imageAspect }}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-ink">{project.name}</h3>
          <div className="mt-2.5">
            <RoleYear role={project.role} year={project.year} />
          </div>
          <div className="mt-4">
            <Tags tags={project.tags} />
          </div>
        </div>
        <div className="md:col-span-8">
          <h4 className="text-[clamp(1.625rem,2.6vw,2.375rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
            {project.headline}
          </h4>
          <p className="mt-4.5 max-w-[640px] text-[17px] leading-[1.6] text-ink-secondary">{project.description}</p>
          <Link
            to={href}
            className="mt-5.5 inline-block border-b border-ink text-[15px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {dictionary.selectedWork.viewCaseStudy}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function GridProject({
  project,
  locale,
  dictionary,
}: {
  project: ProjectCopy;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const href = localeHref(locale, `/work/${project.slug}`);
  return (
    <article>
      <p className="mb-3.5 font-mono text-[13px] text-accent">{project.projectTag}</p>
      <Link to={href} aria-label={`${project.name} case study`} className="block">
        <div
          className="relative w-full overflow-hidden rounded-[10px] border border-[#E4E7EE] bg-surface"
          style={{ aspectRatio: project.imageAspect }}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <h3 className="mt-7 text-[24px] font-semibold tracking-[-0.02em] text-ink">{project.name}</h3>
      <h4 className="mt-3 text-[20px] font-medium leading-[1.3] tracking-[-0.01em] text-ink">{project.headline}</h4>
      <p className="mt-3.5 text-[16px] leading-[1.6] text-ink-secondary">{project.description}</p>
      <div className="mt-3.5">
        <RoleYear role={project.role} year={project.year} />
      </div>
      <div className="mt-3.5">
        <Tags tags={project.tags} />
      </div>
      <Link
        to={href}
        className="mt-4.5 inline-block border-b border-ink text-[15px] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
      >
        {dictionary.selectedWork.viewCaseStudy}
      </Link>
    </article>
  );
}
