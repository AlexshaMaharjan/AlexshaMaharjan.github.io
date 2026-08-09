"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import ModeSwitch from "@/components/ModeSwitch";
import LanguageSwitch from "@/components/LanguageSwitch";
import MobileMenu from "@/components/MobileMenu";

function stripLocale(pathname: string, locale: Locale): string {
  if (locale === "de" && pathname.startsWith("/de")) {
    return pathname.slice(3) || "/";
  }
  return pathname;
}

export default function Header({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const pathname = usePathname() ?? "/";
  const bare = stripLocale(pathname, locale);
  const isPlayground = bare.startsWith("/playground");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[200] border-b transition-[background-color,border-color,backdrop-filter] duration-[250ms] ease-out print:hidden",
        scrolled
          ? isPlayground
            ? "border-[rgba(78,96,135,0.18)] bg-[rgba(248,249,251,0.92)] backdrop-blur-[10px] backdrop-saturate-[1.8]"
            : "border-[#EAECF0] bg-[rgba(255,255,255,0.92)] backdrop-blur-[10px] backdrop-saturate-[1.8]"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="relative flex h-[72px] items-center justify-between px-6 md:px-12">
        <Link
          href={localeHref(locale, "/")}
          className="shrink-0 text-[16px] font-semibold tracking-[-0.01em] text-ink"
        >
          Alexsha Maharjan
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center sm:flex">
          <div className="pointer-events-auto">
            <ModeSwitch locale={locale} isPlayground={isPlayground} dictionary={dictionary} />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <nav aria-label="Primary" className="hidden items-center gap-7 text-[15px] text-ink nav:flex">
            <Link
              href={localeHref(locale, "/#work")}
              className="transition-colors hover:text-accent"
            >
              {dictionary.nav.projects}
            </Link>
            <Link href={localeHref(locale, "/#about")} className="transition-colors hover:text-accent">
              {dictionary.nav.about}
            </Link>
            <Link
              href={localeHref(locale, "/#contact")}
              className="transition-colors hover:text-accent"
            >
              {dictionary.nav.contact}
            </Link>
            <LanguageSwitch locale={locale} pathname={bare} dictionary={dictionary} />
          </nav>

          <div className="nav:hidden">
            <MobileMenu locale={locale} dictionary={dictionary} pathname={bare} />
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-border/70 py-2.5 sm:hidden">
        <ModeSwitch locale={locale} isPlayground={isPlayground} dictionary={dictionary} />
      </div>
    </header>
  );
}
