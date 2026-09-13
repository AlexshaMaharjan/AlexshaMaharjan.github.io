import { Link } from "react-router-dom";
import Image from "@/components/ui/Image";
import type { ProjectCopy, Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";

/**
 * The rest of the work, at the foot of a case study (`MILESTONE-019` task 6,
 * revised per the owner's request to make the order between projects legible).
 *
 * ## Previous / next, and still all five
 *
 * The full grid used to stand alone, on the argument that the homepage's
 * running order is editorial rather than a sequence — there is no sense in
 * which AFONO comes *after* WikiMind. That is still true, and the fix is not
 * to pretend otherwise: `prev`/`next` step through `dictionary.projects` in
 * the same fixed order the grid below already uses, wrapping at both ends, so
 * there is always something to click next without claiming it is *the* next
 * chapter. It is a way to keep moving forward through the six, not a plot.
 *
 * The full grid stays underneath, unchanged, so a reader can still jump
 * anywhere rather than only step one at a time.
 *
 * ## Why these cards carry the project's name and the homepage's do not
 *
 * `WorkGrid` deliberately prints only the tags under each cover, because every
 * cover is a designed title card with the project's name set at 76px on it —
 * repeating it underneath was the fault the owner caught in the bento.
 *
 * That argument is about a 550px card. These are five across a 1280px row, so a
 * cover lands at about 230px wide and the name on it renders at roughly eleven
 * pixels. A title card that cannot be read is a picture, so the name goes back
 * underneath, where at 15px it can be. Same reasoning, different size, opposite
 * answer.
 */
function StepCard({
  project,
  direction,
  label,
  locale,
}: {
  project: ProjectCopy;
  direction: "prev" | "next";
  label: string;
  locale: Locale;
}) {
  return (
    <Link
      to={localeHref(locale, `/work/${project.slug}`)}
      className={`group flex items-center gap-4 ${direction === "next" ? "sm:flex-row-reverse sm:text-right" : ""}`}
    >
      <div
        className="relative w-[96px] shrink-0 overflow-hidden rounded-[10px] border border-card-border bg-surface transition-colors duration-[250ms] ease-out group-hover:border-accent sm:w-[120px]"
        style={{ aspectRatio: project.imageAspect }}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="120px"
          className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="min-w-0">
        <span className="flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-accent">
          {direction === "next" && <span aria-hidden="true">→</span>}
          {direction === "prev" && <span aria-hidden="true">←</span>}
          {label}
        </span>
        <h3 className="mt-1.5 truncate text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
          {project.name}
        </h3>
      </div>
    </Link>
  );
}

export default function MoreProjectsNav({
  others,
  slug,
  dictionary,
  locale,
}: {
  /** Every project except the one being read, in the homepage's order. */
  others: ProjectCopy[];
  /** The project being read, so `prev`/`next` can be found in the full order. */
  slug: string;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const projects = dictionary.projects;
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <nav aria-label={dictionary.landmarks.projectNav} className="border-t border-surface-2 py-[72px] pb-[110px]">
      <div className="container-page">
        {index !== -1 && prev && next && (
          <div className="mb-14 grid grid-cols-1 gap-6 border-b border-surface-2 pb-14 sm:grid-cols-2">
            <StepCard project={prev} direction="prev" label={dictionary.caseStudy.previousProject} locale={locale} />
            <StepCard project={next} direction="next" label={dictionary.caseStudy.nextProject} locale={locale} />
          </div>
        )}

        <h2 className="text-subheading font-semibold tracking-[-0.02em] text-ink">
          {dictionary.caseStudy.moreProjects}
        </h2>

        {/*
          Five across only at `xl`, where the row is wide enough for a 16:9
          cover to still be a picture. Below that it steps 3 / 2 / 1 — five in a
          three-column grid leaves two on the last row, which is a gap rather
          than a fault, and is better than five covers 140px wide.
        */}
        <ul className="mt-8 grid list-none grid-cols-1 gap-x-6 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {others.map((project) => (
            <li key={project.slug}>
              <Link to={localeHref(locale, `/work/${project.slug}`)} className="group block">
                <div
                  className="relative overflow-hidden rounded-[10px] border border-card-border bg-surface transition-colors duration-[250ms] ease-out group-hover:border-accent"
                  style={{ aspectRatio: project.imageAspect }}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 230px, (min-width: 1024px) calc(33vw - 80px), (min-width: 480px) calc(50vw - 96px), calc(100vw - 40px)"
                    className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="mt-3 text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
                  {project.name}
                </h3>
                <p className="mt-1 font-mono text-[12px] leading-[1.4] text-ink-secondary">
                  {project.tags.join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link to={localeHref(locale, "/#work")} className="tap-target text-[15px] font-medium text-accent hover:underline">
            {dictionary.caseStudy.viewAllWork}
          </Link>
        </div>
      </div>
    </nav>
  );
}
