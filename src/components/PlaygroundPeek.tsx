import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Image from "@/components/ui/Image";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import { ARCHIVE_PATH } from "@/lib/site";

/**
 * A look inside the playground, and the door into it.
 *
 * ## Why a picture and not another paragraph
 *
 * Both places that offer the playground — the homepage's About section and the
 * About page's closing band — described it in words and then put a link under
 * the description. The owner's note was that it should "look like the user
 * wants to click it", which is a fair reading of the problem: the playground is
 * forty-eight pieces of colour and craft, and the invitation to it was two lines
 * of grey text. Nothing on screen was the thing being offered.
 *
 * So the offer is now **four of the actual pieces**, one from each collage card,
 * overlapped and tipped the way they sit on the cards themselves. It is the
 * smallest honest sample: a painted poster, a digital portrait, a photograph and
 * something handmade, which is the range the playground covers.
 *
 * ## The whole stack is the link
 *
 * Pictures that are not clickable but look like they should be are worse than no
 * pictures, so the stack is a `<Link>` and the button below it goes to the same
 * place. On hover the pieces **fan out and straighten** rather than growing: a
 * scale is a card getting bigger, and a fan is a deck being opened, which is
 * what the playground's own deck does when you scroll it.
 *
 * The two are one control for a screen reader. The stack carries the
 * `aria-label` and its images are `alt=""`, because four decorative thumbnails
 * announcing themselves in front of a button that says "Open the playground" is
 * three more announcements than the link needs.
 *
 * ## The arrow
 *
 * The owner asked for one, pointing at the button, and the site already has this
 * gesture: Caveat at a bold weight with a hand-drawn SVG curve, which is what
 * `About` puts beside the portrait and what the collage notes are made of. It is
 * the same pen here.
 *
 * **`md:` and up only.** Below that the button sits directly under the stack
 * with nothing beside it, and an arrow that has to point *down* at a control
 * eighteen pixels away is a decoration in the way rather than a direction.
 */
/*
 * One piece from each collage card, in card order — **the owner's four**
 * (`MILESTONE-018` task 4). The first set was chosen for range; these were
 * chosen by the person whose work it is, which is the better reason.
 *
 * **Their angles are in `index.css`, not here.** They started as inline
 * `style={{ transform }}` and the fan silently never worked: an inline style
 * outranks a stylesheet rule, so `.pg-peek:hover` was being written and then
 * overruled on every frame. The resting angle and the fanned angle are two
 * states of one property and they belong in the same place.
 *
 * `focus` is the same `--focus` idiom `Collage` uses. A 94x124 window is a
 * hard crop, and three of these four have their subject somewhere other than
 * the middle: the calendar page is a landscape sheet whose *flower* is the
 * half the owner asked for, and it sits on the right.
 */
const PIECES: { src: string; focus: string }[] = [
  { src: "/images/pg-sunset.webp", focus: "50% 38%" },
  { src: "/images/pg-kalender-mai.webp", focus: "78% 50%" },
  { src: "/images/pg-group-portrait.webp", focus: "50% 56%" },
  { src: "/images/pg-vtri-store.webp", focus: "50% 42%" },
];

export default function PlaygroundPeek({
  locale,
  dictionary,
  align = "left",
  showNote = true,
}: {
  locale: Locale;
  dictionary: Dictionary;
  /** The About page centres this band; the homepage runs it down a column. */
  align?: "left" | "center";
  showNote?: boolean;
}) {
  const peek = dictionary.playgroundPeek;
  const href = localeHref(locale, ARCHIVE_PATH);

  return (
    <div className={clsx("mt-8 flex flex-col", align === "center" ? "items-center" : "items-start")}>
      <Link
        to={href}
        aria-label={peek.openLabel}
        className="pg-peek block rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-focus"
      >
        <span className="flex items-end">
          {PIECES.map((piece, i) => (
            <span
              key={piece.src}
              aria-hidden="true"
              className={clsx(
                "relative block h-[124px] w-[94px] shrink-0 overflow-hidden rounded-[8px] border border-card-border bg-surface",
                "shadow-[0_10px_26px_rgba(17,23,45,0.13)]",
                i > 0 && "-ml-5",
              )}
              style={{ zIndex: i + 1, "--focus": piece.focus } as CSSProperties}
            >
              <Image
                src={piece.src}
                alt=""
                fill
                sizes="94px"
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
            className="pointer-events-none absolute right-[calc(50%+88px)] top-1/2 hidden -translate-y-1/2 items-center gap-2 text-accent whitespace-nowrap sm:flex xl:gap-3"
          >
            <span className="pencil-ink font-hand text-[19px] font-bold leading-none sm:text-[21px]">
              {peek.note}
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
          className="inline-flex h-10 items-center rounded-full bg-ink px-6 text-[13.5px] font-medium text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus"
        >
          {peek.cta}
        </Link>
      </div>
    </div>
  );
}
