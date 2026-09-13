import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import HandArrow from "@/components/HandArrow";
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
}: {
  locale: Locale;
  dictionary: Dictionary;
  /** The About page centres this band; the homepage runs it down a column. */
  align?: "left" | "center";
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


      <div className={clsx("relative mt-7", align === "center" && "flex flex-col items-center")}>
        <Link
          to={href}
          className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus"
        >
          {peek.cta}
        </Link>

        {/*
          The hand note, pointing back into the button.

          **This used to draw its own arrow** — a 52 x 30 SVG at a 2.2px stroke,
          inline, right here. It was the third arrow implementation on the site
          and by some distance the faintest: about 4% of the weight of the pen
          the owner's own annotations are drawn with, which is what "some of the
          arrows are so small" was pointing at (`MILESTONE-020` task 3). It is
          `HandArrow`'s `tick` now, at the site's own weight and through the
          same pencil, so there is one arrow on this site rather than three.

          A flex row rather than the old `padding-left` and an absolutely
          positioned SVG inside the text: the arrow is a sibling of the words
          with a gap between them, which is the arrangement `MILESTONE-019`
          task 5 settled for the About notes and the reason a drawing can change
          size here without anybody re-measuring an offset.
        */}
        {/*
          Beside the button where there is room, under it where there is not
          (`MILESTONE-023` task 8).

          It was `md:block` — gone on a phone — and `left-full` is why: the note
          hangs in the margin to the *right* of the button, and a phone has no
          margin to hang it in. So below `md` it is a row in the flow under the
          button instead, with the arrow mirrored to point back up at it. Same
          drawing, same pen, same words; the only thing that changes is which
          side of the button the hand was standing on.
        */}
        <span
          aria-hidden="true"
          className="pointer-events-none relative mt-2 block md:absolute md:left-full md:top-1/2 md:mt-0 md:-translate-y-1/2 md:pl-5"
        >
          <span className="hidden items-center gap-4 whitespace-nowrap text-accent [transform:rotate(-2deg)] md:flex">
            <HandArrow direction="down-left" shape="tick" width={56} className="shrink-0 -mb-0.5" />
            <span className="pencil-ink font-hand text-[23px] font-bold leading-none">{peek.note}</span>
          </span>
          <span className="flex items-start justify-center gap-2 whitespace-nowrap text-accent [transform:rotate(-3deg)] md:hidden">
            <HandArrow direction="up-right" shape="tick" width={60} className="shrink-0" />
            <span className="pencil-ink mt-1 font-hand text-[19px] font-bold leading-none">{peek.note}</span>
          </span>
        </span>
      </div>
    </div>
  );
}
