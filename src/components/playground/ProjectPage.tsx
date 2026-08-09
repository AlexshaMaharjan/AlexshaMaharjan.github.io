import Link from "next/link";
import type { PlaygroundProjectContent } from "@/lib/playground/types";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import PlaceholderImage from "@/components/PlaceholderImage";
import PlaygroundCard from "./PlaygroundCard";

export default function ProjectPage({
  content,
  dictionary,
  locale,
}: {
  content: PlaygroundProjectContent;
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <>
      <section className="pt-[150px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <Link
            href={localeHref(locale, `/playground/${content.categorySlug}`)}
            className="text-[14px] text-ink-secondary transition-colors hover:text-accent"
          >
            ← {content.categoryTitle}
          </Link>
          <p className="mt-10 font-mono text-[13px] text-accent">{dictionary.playgroundNav.experimentEyebrow}</p>
          <h1 className="mt-4 max-w-[900px] text-[clamp(2.375rem,4.6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
            {content.title}
          </h1>
          <p className="mt-6 max-w-[640px] text-[18px] leading-[1.6] text-ink-secondary">{content.intro}</p>
        </div>
      </section>

      <section className="pt-14">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="rounded-lg border border-[#E4E7EE] bg-white p-3">
            <PlaceholderImage aspect={content.mainAspect} caption={`[ ${content.mainCaption} ]`} />
          </div>
        </div>
      </section>

      <section className="pt-[72px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="mb-6 text-[24px] font-semibold tracking-[-0.015em]">{content.processHeading}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {content.processItems.map((item, i) => (
              <PlaygroundCard key={i} item={item} locale={locale} categorySlug={content.categorySlug} />
            ))}
          </div>
        </div>
      </section>

      <section className="pt-[72px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h2 className="mb-4 text-[24px] font-semibold tracking-[-0.015em]">{content.toolsHeading}</h2>
              <div className="flex flex-wrap gap-2.5">
                {content.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-border px-4 py-2 text-[14px] text-ink-body">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-[24px] font-semibold tracking-[-0.015em]">{content.reflectionHeading}</h2>
              <p className="text-[16px] leading-[1.65] text-ink-body">{content.reflection}</p>
            </div>
          </div>
        </div>
      </section>

      {content.nextCategorySlug && (
        <section className="pt-[90px] pb-[130px]">
          <div className="mx-auto max-w-[1440px] px-5 md:px-20">
            <Link
              href={localeHref(
                locale,
                content.nextSlug
                  ? `/playground/${content.nextCategorySlug}/${content.nextSlug}`
                  : `/playground/${content.nextCategorySlug}`,
              )}
              className="block rounded-[10px] border border-[#E4E7EE] p-6 transition-colors hover:border-accent"
            >
              <span className="block font-mono text-[12px] text-ink-secondary">{content.nextLabel}</span>
              <span className="mt-2.5 block text-[20px] font-medium text-ink">{content.nextTitle}</span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
