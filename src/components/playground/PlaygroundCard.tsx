import { Link } from "react-router-dom";
import clsx from "clsx";
import Media from "@/components/ui/Media";
import type { PlaygroundItem } from "@/lib/playground/types";
import { localeHref, type Locale } from "@/lib/i18n";

export default function PlaygroundCard({
  item,
  locale,
  categorySlug,
}: {
  item: PlaygroundItem;
  locale: Locale;
  categorySlug: string;
}) {
  const card = (
    <div
      className={clsx(
        "relative rounded-lg border border-card-border bg-white p-2.5 shadow-[0_1px_3px_rgba(20,24,40,0.05)] transition-transform",
        item.rotated && "-rotate-2",
      )}
    >
      {item.rotated && (
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-3deg] bg-[rgba(228,231,238,0.85)]"
        />
      )}
      <Media
        src={item.src}
        alt={item.alt}
        /*
          The same 3/4 box as the index (`DECISION-025`). Passing each item's
          own aspect here was not a crop — the images were whole — but it made
          the grid ragged: a landscape book cover next to a tall poster left
          rows that did not line up and a column of white voids underneath.
          One box, contained, matted in the image's own colour, and the grid
          reads as a grid again.
        */
        aspect="3/4"
        fit="contain"
        /*
          `container-page` is 1440px capped with 80px of padding either side at
          md, so 1280px of content; three columns with `gap-6` and the card's
          own `p-2.5` leave ~392px. The category grid drops to two columns
          below lg, and the project page's process grid stays at three — the
          two-column figure is the larger of the pair, so it is the safe one.
        */
        sizes="(min-width: 1440px) 392px, (min-width: 1024px) calc(33.33vw - 62px), (min-width: 640px) calc(50vw - 112px), calc(100vw - 60px)"
        caption={`[ ${item.caption} ]`}
      />
      <p className="mt-2.5 px-0.5 font-mono text-[11px] text-ink-muted">{item.caption}</p>
    </div>
  );

  if (item.slug) {
    return (
      <Link to={localeHref(locale, `/playground/${categorySlug}/${item.slug}`)} className="block">
        {card}
      </Link>
    );
  }

  return card;
}
