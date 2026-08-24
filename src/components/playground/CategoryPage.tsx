import { Link } from "react-router-dom";
import type { PlaygroundCategoryContent } from "@/lib/playground/types";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import PlaygroundCard from "./PlaygroundCard";

export default function CategoryPage({
  content,
  dictionary,
  locale,
}: {
  content: PlaygroundCategoryContent;
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <>
      <section className="pt-[var(--page-top)]">
        <div className="container-page">
          <Link
            to={localeHref(locale, "/playground")}
            className="tap-target text-[14px] text-ink-secondary transition-colors hover:text-accent"
          >
            {dictionary.playgroundNav.backToPlayground}
          </Link>
          <h1 className="mt-9 max-w-[900px] text-section font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
            {content.title}
          </h1>
          <p className="mt-6 max-w-[640px] text-[18px] leading-[1.6] text-ink-secondary">{content.intro}</p>
        </div>
      </section>

      <section className="pb-10 pt-16">
        <div data-inview className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item, i) => (
              <PlaygroundCard key={i} item={item} locale={locale} categorySlug={content.slug} />
            ))}
            <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-border-muted p-6">
              <p className="max-w-[240px] text-center font-hand text-[22px] leading-[1.3] text-[#4E6087] [transform:rotate(-1.5deg)]">
                {content.moreComingNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Category navigation" className="border-t border-[rgba(78,96,135,0.18)] py-16">
        <div className="container-page flex items-center justify-between">
          <Link
            to={localeHref(locale, "/playground")}
            className="text-[16px] font-medium text-ink transition-colors hover:text-accent"
          >
            {dictionary.playgroundNav.allCategories}
          </Link>
          <Link
            to={localeHref(locale, `/playground/${content.nextCategorySlug}`)}
            className="flex items-center gap-2.5 text-right text-[16px] font-medium text-ink transition-colors hover:text-accent"
          >
            {content.nextCategoryTitle}
            <span aria-hidden="true" className="text-accent">
              →
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
