import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useCursorTag } from "@/lib/useCursorTag";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import Image from "@/components/ui/Image";
import { ratioOf, rowMetrics, rowsOf, sizesFor } from "@/lib/justify";

/**
 * The homepage work section (`DECISION-021`).
 *
 * This replaces the bento grid, which the owner rejected twice. The tint was
 * not the problem: eleven tiles put a centred category label and a large title
 * *on top of* an image, and `object-cover` cropped each image to whatever shape
 * its `gridArea` happened to be. So labels landed across UI screenshots, titles
 * sat on the logos they named, and the crops read as broken screenshots — one
 * tile showed "gami is much / nore fun together", another a cut figure caption.
 * Washing the tiles pale did not cause any of that; it revealed it.
 *
 * A card fixes it by removing both causes at once. **Nothing sits on an image
 * and nothing is cropped**: the project's cover is shown whole at its own
 * aspect, and the name and tags go underneath in ink — the same arrangement the
 * case-study figures and the prev/next ring already use. Five of the six covers
 * are designed title cards the owner made; they are meant to be seen whole.
 *
 * Rows are justified by `@/lib/justify`, the module `DECISION-019` built for
 * figures, so a row of covers with different aspects still shares one height.
 */

/** The work grid sits in `container-page`, which is 1120px at its widest. */
const COLUMN_PX = 1120;
const GAP = 24;
const MAX_CARD_HEIGHT = 420;

export default function WorkGrid({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const rows = rowsOf(dictionary.projects, 2);
  /*
    The same gesture the playground uses on a collage piece (`MILESTONE-016`
    task 1). It was a pill centred on the cover for one session; the owner asked
    for the one that follows the cursor, which is also the better of the two
    here — a label pinned to the middle of a designed title card lands on the
    title, and this one never does.
  */
  const { tag, onPoint, onUnpoint } = useCursorTag();

  return (
    <div data-inview="stagger" className="flex flex-col gap-10 md:gap-10">
      {tag}
      {rows.map((row, i) => {
        const { ratios, height, width } = rowMetrics(
          row.map((p) => ratioOf(p.imageAspect)),
          COLUMN_PX,
          GAP,
          MAX_CARD_HEIGHT,
        );
        return (
          <div key={i} className="mx-auto flex w-full flex-col gap-8 md:flex-row md:gap-6" style={{ maxWidth: width }}>
            {row.map((project, n) => (
              <Link
                key={project.slug}
                to={localeHref(locale, `/work/${project.slug}`)}
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
                onPointerEnter={(event) => onPoint(dictionary.caseStudy.viewCaseStudy, event)}
                onPointerMove={(event) => onPoint(dictionary.caseStudy.viewCaseStudy, event)}
                onPointerLeave={onUnpoint}
                className="group block"
                style={{ flex: `${ratios[n]} 1 0%` } as CSSProperties}
              >
                <div
                  className="relative overflow-hidden rounded-[10px] border border-card-border bg-surface transition-colors duration-[250ms] ease-out group-hover:border-accent"
                  style={{ aspectRatio: project.imageAspect }}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    sizes={sizesFor(Math.round(height * ratios[n]!))}
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
                <p className="mt-3 font-mono text-[12px] leading-[1.4] text-ink-secondary">
                  {project.tags.join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}
