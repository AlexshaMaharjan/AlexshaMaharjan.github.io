import { Link } from "react-router-dom";
import PlaceholderImage from "@/components/PlaceholderImage";
import type { PlaygroundItem } from "@/lib/playground/types";
import { localeHref, type Locale } from "@/lib/i18n";

export default function CategoryMarquee({
  index,
  number,
  title,
  caption,
  slug,
  items,
  locale,
}: {
  index: number;
  number: string;
  title: string;
  caption: string;
  slug: string;
  items: PlaygroundItem[];
  locale: Locale;
}) {
  const direction = index % 2 === 0 ? "mqA" : "mqB";
  const duration = 47 + index * 3;
  const looped = [...items, ...items, ...items];

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20">
        <span aria-hidden="true" className="mb-2 block font-mono text-[12px] text-accent">
          {number}
        </span>
        <Link to={localeHref(locale, `/playground/${slug}`)} className="inline-block">
          <h3 className="text-[clamp(1.375rem,2.2vw,1.875rem)] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-accent">
            {title}
          </h3>
        </Link>
        <p className="mt-3 max-w-[560px] text-[15px] leading-[1.6] text-ink-secondary">{caption}</p>
      </div>

      <div
        className="mt-[34px] overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)",
          maskImage: "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)",
        }}
      >
        <div
          data-marquee
          className="flex w-max gap-4 px-1 py-0.5 hover:[animation-play-state:paused]"
          style={{ animation: `${direction} ${duration}s linear infinite` }}
        >
          {looped.map((item, i) => (
            <figure
              key={i}
              className="m-0 shrink-0 basis-[280px] rounded-md border border-[#E4E7EE] bg-white p-3 shadow-[0_1px_4px_rgba(20,30,60,0.05)] transition-colors hover:border-[#C9CEDB]"
            >
              <PlaceholderImage aspect="4/3" caption={`[ ${item.caption} ]`} className="rounded-[3px]" />
              <figcaption className="mt-2.5 px-0.5 font-mono text-[11px] text-ink-muted">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
