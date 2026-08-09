"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import LanguageSwitch from "@/components/LanguageSwitch";

function stripLocale(pathname: string, locale: Locale): string {
  if (locale === "de" && pathname.startsWith("/de")) {
    return pathname.slice(3) || "/";
  }
  return pathname;
}

export default function Footer({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const pathname = usePathname() ?? "/";
  const bare = stripLocale(pathname, locale);
  const isPlayground = bare.startsWith("/playground");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <footer className={clsx("print:hidden", isPlayground ? "border-t border-[rgba(78,96,135,0.18)] bg-page" : "border-t border-surface-2 bg-white")}>
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[16px] font-semibold text-ink">Alexsha Maharjan</p>
            <p className="mt-2 text-[14px] text-ink-secondary">{dictionary.footer.tagline}</p>
          </div>
          <div className="flex gap-16 md:col-span-5">
            <nav aria-label="Footer" className="flex flex-col gap-3 text-[14px] text-ink">
              <Link href={localeHref(locale, "/#about")} className="hover:text-accent transition-colors">
                {dictionary.nav.about}
              </Link>
              <Link href={localeHref(locale, "/playground")} className="hover:text-accent transition-colors">
                {dictionary.nav.playground}
              </Link>
              <Link href={localeHref(locale, "/resume")} className="hover:text-accent transition-colors">
                {dictionary.footer.resume}
              </Link>
            </nav>
            <div className="flex flex-col gap-3 font-mono text-[12px] text-ink-muted">
              <a href={`mailto:${dictionary.footer.email}`} className="transition-colors hover:text-accent">
                {dictionary.footer.email}
              </a>
              <a href={dictionary.footer.linkedinHref} className="transition-colors hover:text-accent">
                {dictionary.footer.linkedin}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-surface pt-6">
          <LanguageSwitch locale={locale} pathname={bare} dictionary={dictionary} />
          <button
            type="button"
            onClick={scrollToTop}
            className="rounded px-1.5 py-2.5 text-[13px] text-ink-secondary transition-colors hover:text-accent"
          >
            {dictionary.footer.backToTop}
          </button>
          <span className="text-[13px] text-ink-muted">{dictionary.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
