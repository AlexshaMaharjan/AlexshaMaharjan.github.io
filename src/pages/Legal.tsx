import { Link } from "react-router-dom";
import { useDictionary, useLocale } from "@/lib/useLocale";
import { localeHref } from "@/lib/i18n";
import type { LegalPageCopy } from "@/lib/dictionaries";
import Seo from "@/components/Seo";

/**
 * The Impressum and the privacy notice, from one component
 * (`MILESTONE-013` task 9).
 *
 * They are the same page: a title, a line of orientation, a date, and a run of
 * headed sections. Two components would be two places to fix a measure or a
 * heading level, for no difference a reader could name.
 *
 * The measure is 680px, the same one the case studies set body text at
 * (`DECISION-014`). Legal prose is the longest unbroken reading on the site and
 * it is the text most likely to be read by somebody who has to, so it gets the
 * site's reading width rather than the full container.
 *
 * **These pages are not lazy-loaded.** Every other route in `routes.tsx` is,
 * and these two are 4KB of strings that the footer links from every page: a
 * separate chunk and a Suspense fallback would cost more than they save.
 */
export default function Legal({ page }: { page: "impressum" | "privacy" }) {
  const locale = useLocale();
  const dictionary = useDictionary();
  const legal = dictionary.legal;
  const copy: LegalPageCopy = page === "impressum" ? legal.impressum : legal.privacy;

  return (
    <>
      <Seo title={`${copy.title} — Alexsha Maharjan`} description={copy.intro} />
      <section className="pt-[var(--page-top)]">
        <div className="container-page">
          <Link
            to={localeHref(locale, "/")}
            className="tap-target text-[14px] text-ink-secondary transition-colors hover:text-accent"
          >
            {dictionary.about.backToHome}
          </Link>
          <div className="max-w-[680px]">
            <h1 className="mt-10 text-page-title font-semibold leading-[1.04] tracking-[-0.028em] text-ink">
              {copy.title}
            </h1>
            <p className="mt-5 text-[19px] leading-[1.6] text-ink-secondary">{copy.intro}</p>
            <p className="mt-4 font-mono text-[12px] text-ink-muted">{copy.updated}</p>

            {copy.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-[19px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
                  {section.heading}
                </h2>
                {section.address && (
                  <address className="mt-4 not-italic text-[16px] leading-[1.7] text-ink-secondary">
                    {legal.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                )}
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-[16px] leading-[1.7] text-ink-secondary">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
      <div className="h-[120px]" />
    </>
  );
}
