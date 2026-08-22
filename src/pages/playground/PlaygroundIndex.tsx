import { Link } from "react-router-dom";
import { useLocale } from "@/lib/useLocale";
import { useScrollReveals } from "@/lib/useScrollReveals";
import { localeHref } from "@/lib/i18n";
import home from "@/lib/playground/home";
import { getCategory } from "@/lib/playground/categories";
import CategoryMarquee from "@/components/playground/CategoryMarquee";
import PlaceholderImage from "@/components/PlaceholderImage";
import Seo from "@/components/Seo";

export default function PlaygroundIndex() {
  const locale = useLocale();
  const content = home[locale];
  useScrollReveals();

  return (
    <>
      <Seo title={`${content.heading} — Alexsha Maharjan`} description={content.intro} />
      <section className="pb-24 pt-[168px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-[14px] text-ink-secondary">{content.eyebrow}</p>
              <h1 className="mt-0 max-w-[900px] text-[clamp(2.5rem,5.4vw,5rem)] font-semibold leading-[1] tracking-[-0.028em] text-ink">
                {content.heading}
              </h1>
              <p className="mt-7 max-w-[520px] text-[19px] leading-[1.6] text-ink-secondary">{content.intro}</p>
              <span className="mt-7 inline-block font-hand text-[24px] text-[#4E6087] [transform:rotate(-2deg)]">
                {content.handNote}
              </span>
            </div>

            <div className="relative mt-10 hidden h-[440px] md:col-span-5 md:col-start-8 md:mt-0 md:block">
              <div
                className="absolute right-[36%] top-4 w-[56%] max-w-[300px] rounded-md border border-[#E4E7EE] bg-white p-3 shadow-[0_2px_10px_rgba(20,30,60,0.06)] [transform:rotate(-2.5deg)]"
              >
                <PlaceholderImage aspect="4/5" caption="[ digital portrait ]" className="rounded-[3px]" />
                <p className="mt-2.5 px-0.5 font-mono text-[11px] text-ink-muted">digital drawing</p>
              </div>
              <div className="absolute right-0 top-[110px] w-[52%] max-w-[280px] rounded-md border border-[#E4E7EE] bg-white p-3 shadow-[0_2px_10px_rgba(20,30,60,0.06)] [transform:rotate(1.5deg)]">
                <span
                  aria-hidden="true"
                  className="absolute -top-2.5 left-[34px] h-5 w-[68px] rotate-[-4deg] rounded-sm bg-[rgba(120,134,168,0.16)]"
                />
                <PlaceholderImage aspect="4/3" caption="[ beadwork object ]" className="rounded-[3px]" />
                <p className="mt-2.5 px-0.5 font-mono text-[11px] text-ink-muted">beads &amp; wire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-[110px]">
        <div data-inview className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="mb-10 text-[clamp(1.625rem,2.6vw,2.25rem)] font-semibold tracking-[-0.02em]">
            {content.featuredHeading}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {content.featured.map((item, i) => (
              <article
                key={i}
                className="rounded-md border border-[#E4E7EE] bg-white p-3.5 shadow-[0_1px_4px_rgba(20,30,60,0.05)]"
                style={item.rotated ? { transform: "rotate(-1deg)", position: "relative" } : undefined}
              >
                {item.rotated && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-2.5 right-10 h-5 w-[68px] rotate-[3deg] rounded-sm bg-[rgba(120,134,168,0.16)]"
                  />
                )}
                <PlaceholderImage aspect="16/10" caption={`[ ${item.caption.toLowerCase()} ]`} className="rounded-[3px]" />
                <h3 className="mt-4 px-0.5 text-[19px] font-semibold tracking-[-0.01em] text-ink">
                  {item.slug ? (
                    <Link
                      to={localeHref(locale, `/playground/3d-motion/${item.slug}`)}
                      className="border-b border-[#C9CEDB] hover:text-accent"
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
        <div data-inview className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="mb-3 text-[clamp(1.625rem,2.6vw,2.25rem)] font-semibold tracking-[-0.02em]">
            {content.categoriesHeading}
          </h2>
          <p className="font-mono text-[12px] text-ink-muted">{content.categoriesCaption}</p>
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
            />
          );
        })}
      </div>

      <section className="pt-8 pb-[110px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <span className="font-mono text-[13px] text-ink-secondary">
            {content.exploringHeading} {content.exploringItems.join(", ")}
          </span>
        </div>
      </section>

      <section className="pb-[130px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <p className="max-w-[560px] text-[18px] leading-[1.65] text-ink">{content.noteBody}</p>
        </div>
      </section>

      <section className="pb-[130px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <Link
            to={localeHref(locale, "/")}
            className="flex items-center justify-between gap-6 border-y border-[rgba(78,96,135,0.2)] py-9 transition-colors hover:text-accent"
          >
            <span className="text-[clamp(1.5rem,2.8vw,2.375rem)] font-semibold tracking-[-0.02em] text-ink">
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
