import { Link } from "react-router-dom";
import clsx from "clsx";
import PlaceholderImage from "@/components/PlaceholderImage";
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
      <PlaceholderImage aspect={item.aspect} caption={`[ ${item.caption} ]`} />
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
