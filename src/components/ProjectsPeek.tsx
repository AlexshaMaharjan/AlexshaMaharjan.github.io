import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Image from "@/components/ui/Image";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";

/**
 * An interactive peek into the portfolio's selected work.
 *
 * Mirrors the playful deck feel of PlaygroundPeek, showcasing four project
 * title covers that fan out and elevate on hover.
 */
const PROJECT_COVERS: { src: string; alt: string; focus: string }[] = [
  { src: "/images/hero-afono.webp", alt: "AFONO", focus: "50% 50%" },
  { src: "/images/hero-surugami.webp", alt: "Surugami", focus: "50% 50%" },
  { src: "/images/hero-wikimind.webp", alt: "WikiMind", focus: "50% 50%" },
  { src: "/images/hero-sync-fm.webp", alt: "Sync FM", focus: "50% 50%" },
];

export default function ProjectsPeek({
  locale,
  dictionary,
  align = "center",
  cta,
  note,
  showNote = false,
}: {
  locale: Locale;
  dictionary: Dictionary;
  align?: "left" | "center";
  cta?: string;
  note?: string;
  showNote?: boolean;
}) {
  const href = localeHref(locale, "/#work");
  const ctaText = cta ?? dictionary.about.linkProjects;
  const noteText = note ?? dictionary.about.projectsNote;
  const ariaLabel = locale === "de" ? "Zu den Projekten" : "View projects";

  return (
    <div className={clsx("mt-8 flex flex-col", align === "center" ? "items-center" : "items-start")}>
      <Link
        to={href}
        aria-label={ariaLabel}
        className="project-peek block rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-focus"
      >
        <span className="flex items-end">
          {PROJECT_COVERS.map((project, i) => (
            <span
              key={project.src}
              aria-hidden="true"
              className={clsx(
                "relative block h-[80px] w-[114px] shrink-0 overflow-hidden rounded-[8px] border border-card-border bg-surface",
                "shadow-[0_10px_26px_rgba(17,23,45,0.13)]",
                i > 0 && "-ml-6 sm:-ml-7",
              )}
              style={{ zIndex: i + 1, "--focus": project.focus } as CSSProperties}
            >
              <Image
                src={project.src}
                alt=""
                fill
                sizes="114px"
                className="object-cover [object-position:var(--focus,50%_50%)]"
              />
            </span>
          ))}
        </span>
      </Link>

      <div className="relative mt-7 flex w-full justify-center">
        {showNote && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[calc(50%+94px)] top-1/2 hidden -translate-y-1/2 items-center gap-2 text-accent whitespace-nowrap sm:flex xl:gap-3"
          >
            <span className="pencil-ink font-hand text-[19px] font-bold leading-none sm:text-[21px]">
              {noteText}
            </span>
            <svg
              viewBox="0 0 56 28"
              fill="none"
              className="h-[22px] w-[46px] shrink-0 [transform:scaleX(-1)] sm:h-[24px] sm:w-[50px]"
              aria-hidden="true"
            >
              <path
                d="M52 14C38 9 20 9 6 14"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M17 7L6 14L17 21"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}

        <Link
          to={href}
          className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
