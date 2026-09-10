import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "@/lib/useLocale";
import { useScrollReveals } from "@/lib/useScrollReveals";
import { localeHref } from "@/lib/i18n";
import home from "@/lib/playground/home";
import { getAllCategories } from "@/lib/playground/categories";
import Scrapbook from "@/components/playground/Scrapbook";
import Media from "@/components/ui/Media";
import Seo from "@/components/Seo";
import { tintOf } from "@/lib/tint";

/**
 * The playground — one page, everything on it (`DECISION-026`).
 *
 * It used to be an index that sent you somewhere: five auto-scrolling marquees,
 * each a teaser for a category page, plus a project page under that. Three
 * levels, twelve routes, and the pictures were smallest on the page that was
 * supposed to show them off.
 *
 * The owner asked for the opposite — "i dont want the user to click and land on
 * other pages but everything needs to be here" — so the categories are sections
 * of this page and the tiles are the real thing at full size. Clicking a picture
 * opens it larger in place; nothing navigates.
 */
export default function PlaygroundIndex() {
  const locale = useLocale();
  const content = home[locale];
  const categories = getAllCategories(locale);
  useScrollReveals();

  /*
   * One control for every moving thing on the page (WCAG 2.2.2). The clips
   * autoplay, so there has to be a way to stop them that does not depend on
   * hovering — and under `prefers-reduced-motion` none of them start at all,
   * which makes this control redundant rather than wrong.
   */
  const [paused, setPaused] = useState(false);

  return (
    <>
      <Seo title={`${content.heading} — Alexsha Maharjan`} description={content.intro} />

      <section className="pb-16 pt-[var(--page-top)]">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-[14px] text-ink-secondary">{content.eyebrow}</p>
              <h1 className="mt-0 max-w-[900px] text-page-title font-semibold leading-[1] tracking-[-0.028em] text-ink">
                {content.heading}
              </h1>
              <p className="mt-7 max-w-[520px] text-[19px] leading-[1.6] text-ink-secondary">{content.intro}</p>
              <span className="mt-7 inline-block font-hand text-[24px] text-[#4E6087] [transform:rotate(-2deg)]">
                {content.handNote}
              </span>
            </div>

            <div className="relative mt-10 hidden h-[440px] md:col-span-5 md:col-start-8 md:mt-0 md:block">
              <div className="absolute right-[36%] top-4 w-[56%] max-w-[300px] rounded-md border border-card-border bg-white p-3 shadow-[0_2px_10px_rgba(20,30,60,0.06)] [transform:rotate(-2.5deg)]">
                <Media
                  src={content.heroCards[0]?.src}
                  alt={content.heroCards[0]?.alt}
                  aspect={content.heroCards[0]?.aspect ?? "4/5"}
                  /* max-w-[300px] with p-3, and the collage is hidden below md. */
                  sizes="276px"
                  caption={`[ ${content.heroCards[0]?.caption ?? ""} ]`}
                  className="rounded-[3px]"
                />
                <p className="mt-2.5 px-0.5 font-mono text-[11px] text-ink-muted">{content.heroCards[0]?.subtitle}</p>
              </div>
              <div className="absolute right-0 top-[110px] w-[52%] max-w-[280px] rounded-md border border-card-border bg-white p-3 shadow-[0_2px_10px_rgba(20,30,60,0.06)] [transform:rotate(1.5deg)]">
                <span
                  aria-hidden="true"
                  className="absolute -top-2.5 left-[34px] h-5 w-[68px] rotate-[-4deg] rounded-sm bg-[rgba(120,134,168,0.16)]"
                />
                <Media
                  src={content.heroCards[1]?.src}
                  alt={content.heroCards[1]?.alt}
                  aspect={content.heroCards[1]?.aspect ?? "4/3"}
                  /* max-w-[280px] with p-3. */
                  sizes="256px"
                  caption={`[ ${content.heroCards[1]?.caption ?? ""} ]`}
                  className="rounded-[3px]"
                />
                <p className="mt-2.5 px-0.5 font-mono text-[11px] text-ink-muted">{content.heroCards[1]?.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        The contents. These are in-page jumps, not links to anywhere — the whole
        point of the rewrite — but a gallery this long still needs a way to get
        to the crafts without scrolling past everything else.
      */}
      <section className="pb-14">
        <div data-inview className="container-page">
          <p className="font-mono text-[12px] text-ink-muted">{content.categoriesCaption}</p>
          <nav aria-label={content.categoriesHeading} className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {categories.map((category, i) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="text-[15px] text-ink-secondary transition-colors hover:text-accent"
              >
                <span aria-hidden="true" className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {category.title}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="tap-target ml-auto gap-2 rounded-full border border-border px-4 text-[13px] text-ink-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <span aria-hidden="true" className="text-[10px] leading-none">
                {paused ? "▶" : "❚❚"}
              </span>
              {paused ? content.playMotion : content.pauseMotion}
            </button>
          </nav>
        </div>
      </section>

      {categories.map((category, i) => {
        /*
          Each section stands on a wash of its own contents' colour
          (`@/lib/tint`) — a gradient rather than a band, so the sections do not
          read as stripes. It never touches a tile and never sits under text.
        */
        const tint = tintOf(category.items.map((item) => item.src));
        return (
          <section
            key={category.slug}
            id={category.slug}
            className="scroll-mt-28 py-16"
            style={
              tint === "transparent"
                ? undefined
                : { background: `linear-gradient(180deg, transparent 0%, ${tint} 14%, ${tint} 86%, transparent 100%)` }
            }
          >
            <div data-inview className="container-page">
              <span aria-hidden="true" className="mb-2 block font-mono text-[12px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-subheading font-semibold tracking-[-0.02em] text-ink">{category.title}</h2>
              <p className="mt-3 max-w-[560px] text-[15px] leading-[1.6] text-ink-secondary">{category.intro}</p>
            </div>
            <div className="container-page mt-10">
              <Scrapbook items={category.items} paused={paused} pendingLabel={content.pendingLabel} />
              {/* The owner's own "more to come" line, in their hand. */}
              <p className="mt-7 font-hand text-[20px] leading-[1.3] text-[#4E6087] [transform:rotate(-1deg)]">
                {category.moreComingNote}
              </p>
            </div>
          </section>
        );
      })}

      <section className="pt-8 pb-[110px]">
        <div className="container-page">
          <span className="font-mono text-[13px] text-ink-secondary">
            {content.exploringHeading} {content.exploringItems.join(", ")}
          </span>
        </div>
      </section>

      <section className="pb-[130px]">
        <div className="container-page">
          <p className="max-w-[560px] text-[18px] leading-[1.65] text-ink">{content.noteBody}</p>
          <Link
            to={localeHref(locale, "/")}
            className="mt-8 inline-block text-[16px] font-medium text-ink transition-colors hover:text-accent"
          >
            {content.returnCta} <span aria-hidden="true" className="text-accent">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
