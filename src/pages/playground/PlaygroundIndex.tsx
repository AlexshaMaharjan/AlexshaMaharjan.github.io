import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "@/lib/useLocale";
import { useScrollReveals } from "@/lib/useScrollReveals";
import { localeHref } from "@/lib/i18n";
import home from "@/lib/playground/home";
import { getCategory } from "@/lib/playground/categories";
import { getProject } from "@/lib/playground/projects";
import CategoryMarquee from "@/components/playground/CategoryMarquee";
import Media from "@/components/ui/Media";
import Seo from "@/components/Seo";

export default function PlaygroundIndex() {
  const locale = useLocale();
  // The five rows scroll indefinitely, so WCAG 2.2.2 needs a way to stop them
  // that does not depend on hovering. Under prefers-reduced-motion the CSS has
  // already stopped them and this control is beside the point — it is harmless
  // there, and the rows stay still either way.
  const [paused, setPaused] = useState(false);
  const content = home[locale];
  useScrollReveals();

  /*
    A featured card that names a project links into that project's own
    category. This used to be the literal string `/playground/3d-motion/`,
    which meant renaming a category slug broke the link with no type error and
    no failing check — the route simply 404ed (SESSION-033). Asking the project
    where it lives cannot go stale.
  */
  const projectHref = (slug: string) => {
    const project = getProject(slug, locale);
    return localeHref(locale, project ? `/playground/${project.categorySlug}/${slug}` : "/playground");
  };

  return (
    <>
      <Seo title={`${content.heading} — Alexsha Maharjan`} description={content.intro} />
      <section className="pb-24 pt-[var(--page-top)]">
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
              <div
                className="absolute right-[36%] top-4 w-[56%] max-w-[300px] rounded-md border border-card-border bg-white p-3 shadow-[0_2px_10px_rgba(20,30,60,0.06)] [transform:rotate(-2.5deg)]"
              >
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

      <section className="pb-[110px]">
        <div data-inview className="container-page">
          <h2 className="mb-10 text-subheading font-semibold tracking-[-0.02em]">
            {content.featuredHeading}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {content.featured.map((item, i) => (
              <article
                key={i}
                className="rounded-md border border-card-border bg-white p-3.5 shadow-[0_1px_4px_rgba(20,30,60,0.05)]"
                style={item.rotated ? { transform: "rotate(-1deg)", position: "relative" } : undefined}
              >
                {item.rotated && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-2.5 right-10 h-5 w-[68px] rotate-[3deg] rounded-sm bg-[rgba(120,134,168,0.16)]"
                  />
                )}
                <Media
                  src={item.src}
                  alt={item.alt}
                  aspect="16/10"
                  /* Three across container-page's 1280px of content, less gap-6 and the card's p-3.5. */
                  sizes="(min-width: 1440px) 384px, (min-width: 640px) calc(33.33vw - 70px), calc(100vw - 68px)"
                  caption={`[ ${item.caption.toLowerCase()} ]`}
                  className="rounded-[3px]"
                />
                <h3 className="mt-4 px-0.5 text-[19px] font-semibold tracking-[-0.01em] text-ink">
                  {item.slug ? (
                    <Link
                      to={projectHref(item.slug)}
                      className="border-b border-border-muted hover:text-accent"
                    >
                      {item.caption}
                    </Link>
                  ) : (
                    item.caption
                  )}
                </h3>
                {item.subtitle && (
                  <p className="mt-1.5 px-0.5 font-mono text-[12px] text-ink-muted">{item.subtitle}</p>
                )}
                {item.description && (
                  <p className="mt-3 px-0.5 text-[15px] leading-[1.55] text-ink-secondary">{item.description}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[72px]">
        <div data-inview className="container-page">
          <h2 className="mb-3 text-subheading font-semibold tracking-[-0.02em]">
            {content.categoriesHeading}
          </h2>
          <p className="font-mono text-[12px] text-ink-muted">{content.categoriesCaption}</p>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="tap-target mt-5 gap-2 rounded-full border border-border px-4 text-[13px] text-ink-secondary transition-colors hover:border-accent hover:text-accent"
          >
            <span aria-hidden="true" className="text-[10px] leading-none">
              {paused ? "▶" : "❚❚"}
            </span>
            {paused ? content.playMotion : content.pauseMotion}
          </button>
        </div>
      </section>

      <div>
        {content.categories.map((cat, i) => {
          const category = getCategory(cat.slug, locale);
          if (!category) return null;
          return (
            <CategoryMarquee
              key={cat.slug}
              index={i}
              number={String(i + 1).padStart(2, "0")}
              title={cat.title}
              caption={cat.caption}
              slug={cat.slug}
              items={category.items}
              locale={locale}
              paused={paused}
            />
          );
        })}
      </div>

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
        </div>
      </section>

      <section className="pb-[130px]">
        <div className="container-page">
          <Link
            to={localeHref(locale, "/")}
            className="flex items-center justify-between gap-6 border-y border-[rgba(78,96,135,0.2)] py-9 transition-colors hover:text-accent"
          >
            <span className="text-subheading font-semibold tracking-[-0.02em] text-ink">
              {content.returnCta}
            </span>
            <span aria-hidden="true" className="text-[28px] text-accent">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
