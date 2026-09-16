import { Link } from "react-router-dom";
import { useCursorTag } from "@/lib/useCursorTag";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import Image from "@/components/ui/Image";

export default function WorkGrid({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const { tag, onPoint, onUnpoint } = useCursorTag();

  return (
    <div className="w-full">
      {tag}
      <div className="grid w-full grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-3">
        {dictionary.projects.map((project, index) => (
          <Link
            key={project.slug}
            to={localeHref(locale, `/work/${project.slug}`)}
            data-inview="up"
            data-inview-delay={index % 3 > 0 ? String((index % 3) * 0.12) : undefined}
            /*
              The card does not repeat the project's name — every cover is a
              designed title card that already carries it. The link still
              needs one for anyone not looking at it: without this the
              accessible name falls back to the cover's `alt`, which
              describes the picture rather than where the link goes.

              The tags are joined the same way here as in the visible line
              below, so the visible text is a substring of the accessible
              name. WCAG 2.5.3 asks for exactly that, and axe checks it —
              joining with ", " here and " · " there would fail
              `label-content-name-mismatch`.
            */
            aria-label={`${project.name} — ${project.tags.join(" · ")}`}
            onPointerEnter={(event) => onPoint(dictionary.caseStudy.viewCaseStudy, event, project.accent)}
            onPointerMove={(event) => onPoint(dictionary.caseStudy.viewCaseStudy, event, project.accent)}
            onPointerLeave={onUnpoint}
            className="group block min-w-0"
          >
            <div
              className="relative overflow-hidden rounded-[10px] border border-card-border bg-surface transition-colors duration-[250ms] ease-out group-hover:border-accent"
              style={{ aspectRatio: project.imageAspect }}
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                sizes="(min-width: 1440px) 411px, (min-width: 768px) 33vw, calc(100vw - 40px)"
                className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
              />
            </div>
            {/*
              The tags, and only the tags. The project's *name* is already
              inside every cover — repeating it underneath was the fault the
              owner caught, and the bento's fault in miniature. The
              disciplines appear nowhere else, so without this line the card
              says what the project is called and never what it is.
            */}
            <p className="mt-3 truncate font-mono text-[12px] leading-[1.4] text-ink-secondary">
              {project.tags.join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
