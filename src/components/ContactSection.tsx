import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export default function ContactSection({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section
      id="contact"
      data-anchor-pad
      style={{ "--anchor-pad": "140px" } as CSSProperties}
      className="bg-near-black py-[140px]"
    >
      <div className="container-page">
        <div data-inview className="mx-auto flex flex-col items-center text-center">
          <span className="block text-[14px] text-accent-on-dark">{dictionary.contact.eyebrow}</span>
          <h2 className="mx-auto mt-6 max-w-3xl text-section font-semibold leading-[1.05] tracking-[-0.025em] text-white">
            {dictionary.contact.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[18px] leading-[1.6] text-ink-on-dark">{dictionary.contact.copy}</p>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <Link
              to={localeHref(locale, "/resume")}
              className="flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              {dictionary.contact.resumeCta}
            </Link>
            <a
              href={`mailto:${dictionary.resume.email}`}
              className="flex h-12 items-center rounded-full border border-white/35 px-7 text-[15px] font-medium text-white transition-colors hover:border-accent"
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
