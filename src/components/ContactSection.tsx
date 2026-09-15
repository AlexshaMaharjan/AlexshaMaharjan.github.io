import { Link } from "react-router-dom";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export default function ContactSection({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section
      id="contact"
      data-anchor-center
      className="bg-near-black py-14 sm:py-16 md:py-20"
    >
      <div className="container-page">
        <div data-inview="text" className="mx-auto flex flex-col items-center text-center">
          <span className="block text-[14px] text-accent-on-dark">{dictionary.contact.eyebrow}</span>
          <h2
            className="mx-auto mt-5 max-w-[20ch] text-[clamp(1.5rem,5.2vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white [hyphens:none] sm:mt-6 sm:max-w-2xl sm:text-section sm:leading-[1.05]"
            style={{ textWrap: "balance" }}
          >
            {dictionary.contact.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.6] text-ink-on-dark">{dictionary.contact.copy}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              to={localeHref(locale, "/resume")}
              className="flex h-10 items-center rounded-full bg-white px-6 text-[13.5px] font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              {dictionary.contact.resumeCta}
            </Link>
            <a
              href={`mailto:${dictionary.resume.email}`}
              className="flex h-10 items-center rounded-full border border-white/35 px-6 text-[13.5px] font-medium text-white transition-colors hover:border-accent"
            >
              {dictionary.contact.contactCta}
            </a>
          </div>
          <p className="mt-7 font-mono text-[12px] text-ink-on-dark-muted">{dictionary.resume.email}</p>
        </div>
      </div>
    </section>
  );
}
