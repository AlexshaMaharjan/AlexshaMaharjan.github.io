import { Link } from "react-router-dom";
import clsx from "clsx";
import Image from "@/components/ui/Image";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";

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
 * One piece from each collage card, in card order.
 *
 * **Their angles are in `index.css`, not here.** They started as inline
 * `style={{ transform }}` and the fan silently never worked: an inline style
 * outranks a stylesheet rule, so `.pg-peek:hover` was being written and then
 * overruled on every frame. The resting angle and the fanned angle are two
 * states of one property and they belong in the same place.
 */
const PIECES = [
  "/images/pg-painting-luffy.webp",
  "/images/pg-portrait.webp",
  "/images/pg-photo-lowkey.webp",
  "/images/pg-frame.webp",
];

export default function PlaygroundPeek({
  locale,
  dictionary,
  align = "left",
}: {
  locale: Locale;
  dictionary: Dictionary;
  /** The About page centres this band; the homepage runs it down a column. */
  align?: "left" | "center";
}) {
  const peek = dictionary.playgroundPeek;
  const href = localeHref(locale, "/playground");

  return (
    <div className={clsx("mt-8 flex flex-col", align === "center" ? "items-center" : "items-start")}>
      <Link
        to={href}
        aria-label={peek.openLabel}
        className="pg-peek block rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-focus"
      >
        <span className="flex items-end">
          {PIECES.map((src, i) => (
            <span
              key={src}
              aria-hidden="true"
              className={clsx(
                "relative block h-[124px] w-[94px] shrink-0 overflow-hidden rounded-[8px] border border-card-border bg-surface",
                "shadow-[0_10px_26px_rgba(17,23,45,0.13)]",
                i > 0 && "-ml-5",
              )}
              style={{ zIndex: i + 1 }}
            >
              <Image src={src} alt="" fill sizes="94px" className="object-cover" />
            </span>
          ))}
        </span>
      </Link>


      <div className={clsx("relative mt-7", align === "center" && "flex flex-col items-center")}>
        <Link
          to={href}
          className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus"
        >
          {peek.cta}
        </Link>

        {/* The hand note, pointing back down into the button. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-full top-1/2 hidden -translate-y-1/2 pl-3 md:block"
        >
          <span className="relative block whitespace-nowrap pl-[62px] font-hand text-[23px] font-bold leading-none text-accent [transform:rotate(-4deg)]">
            {peek.note}
            <svg
              viewBox="0 0 62 40"
              fill="none"
              className="absolute left-0 top-1/2 h-[30px] w-[52px] -translate-y-1/2"
            >
              <path
                d="M56 20C42 20 24 15 8 21"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path d="M17 13 L7 21 L18 27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}
