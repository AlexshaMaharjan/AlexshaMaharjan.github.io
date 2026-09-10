import { Link } from "react-router-dom";
import Image from "@/components/ui/Image";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";

export default function AboutPreview({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section id="about" className="bg-white py-[120px] pb-[160px]">
      <div className="container-page">
        <div data-inview className="grid grid-cols-1 items-start gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <div className="relative aspect-[3/4] w-full max-w-[460px] overflow-hidden rounded-[10px] border border-card-border bg-surface-2">
              <Image
                src="/images/alexsha-portrait.webp"
                alt={dictionary.aboutPreview.portraitAlt}
                fill
                sizes="(min-width: 1180px) 460px, (min-width: 768px) 40vw, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <span className="block text-[14px] text-accent">{dictionary.aboutPreview.eyebrow}</span>
            <h2 className="mt-6 text-section font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
              {dictionary.aboutPreview.heading}
            </h2>
            <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-ink-secondary">
              {dictionary.aboutPreview.copy}
            </p>
            <p className="mt-4 max-w-[600px] text-[18px] leading-[1.6] text-ink-muted">
              {dictionary.aboutPreview.copyDim}
            </p>
            <Link
              to={localeHref(locale, "/about")}
              className="tap-target mt-5 inline-block text-[15px] font-medium text-accent hover:underline"
            >
              {dictionary.aboutPreview.linkAbout}
            </Link>

            <h3 className="mt-12 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
              {dictionary.aboutPreview.playgroundHeading}
            </h3>
            <p className="mt-4 max-w-[600px] text-[18px] leading-[1.6] text-ink-secondary">
              {dictionary.aboutPreview.playgroundCopy}
            </p>
            <Link
              to={localeHref(locale, "/playground")}
              className="tap-target mt-5 inline-block text-[15px] font-medium text-accent hover:underline"
            >
              {dictionary.aboutPreview.linkPlayground}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
