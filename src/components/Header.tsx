import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import type { Locale } from "@/lib/i18n";
import { localeHref, stripLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import ModeSwitch from "@/components/ModeSwitch";
import LanguageSwitch from "@/components/LanguageSwitch";
import MobileMenu from "@/components/MobileMenu";
import { ARCHIVE_PATH } from "@/lib/site";

export default function Header({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const pathname = useLocation().pathname ?? "/";
  const bare = stripLocale(pathname, locale);
  const isPlayground = bare.startsWith(ARCHIVE_PATH);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Publish the header's real height as --header-h, which index.css turns into
  // the offset anchored sections and the case-study rail sit below. It is one
  // row at every width since `MILESTONE-013` — 61px below md and 73px above —
  // but it was 113px below md for as long as the mode switch had a row of its
  // own, and a single hard-coded offset hid 42px of every anchored section
  // (ISSUE-015).
  //
  // Measured rather than written down twice: this is the number that drifted
  // from the markup in the first place. Not keyed on the route on purpose — the
  // header does not remount between routes and its height does not depend on
  // one (ARCH-01 is about effects that do).
  useLayoutEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const publish = () => {
      const height = Math.round(element.getBoundingClientRect().height);
      if (height > 0) document.documentElement.style.setProperty("--header-h", `${height}px`);
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(element);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-h");
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={clsx(
        "fixed inset-x-0 top-0 z-[200] border-b transition-[background-color,border-color,backdrop-filter] duration-[250ms] ease-out print:hidden",
        scrolled
          ? isPlayground
            ? "border-[rgba(78,96,135,0.18)] bg-[rgba(248,249,251,0.92)] backdrop-blur-[10px] backdrop-saturate-[1.8]"
            : "border-[#EAECF0] bg-[rgba(255,255,255,0.92)] backdrop-blur-[10px] backdrop-saturate-[1.8]"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="relative flex h-[60px] items-center justify-between px-4 md:h-[72px] md:px-12">
        {/*
          The wordmark is the monogram below `md` (`MILESTONE-013` task 4).
          "Alexsha Maharjan" is 148 pixels of a 360-pixel bar, and it is the one
          thing in the header that a visitor already knows — they are on the
          site. The full name is back from `md`, where there is room for it.
          Both spellings are in the accessible name, so what the link announces
          does not change with the viewport.
        */}
        <Link
          to={localeHref(locale, "/")}
          aria-label="Alexsha Maharjan"
          className="shrink-0 text-[16px] font-semibold tracking-[-0.01em] text-ink"
        >
          <span aria-hidden="true" className="md:hidden">
            AM
          </span>
          <span aria-hidden="true" className="hidden md:inline">
            Alexsha Maharjan
          </span>
        </Link>

        {/*
          Absolutely centred on the viewport, so it collides with whichever side
          is wider — and since `MILESTONE-013` it fits at every width, because
          below `md` it is the compact switch rather than the segmented one.
          That is what retired the header's second row: the two rows measured 60
          and 53, which was 113 pixels of a phone screen before a word of the
          page, and the bar is one 60-pixel row again.

          `ISSUE-016` is what the second row was for — at 480px the wide switch
          overlapped the wordmark by 34 pixels and at 520px by 14. The numbers
          now are a 115-pixel switch between a 28-pixel monogram and a 44-pixel
          hamburger: 187 of 360, with the switch's own edges 86 pixels clear of
          both sides.
        */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center md:hidden">
          <div className="pointer-events-auto">
            <ModeSwitch locale={locale} isPlayground={isPlayground} dictionary={dictionary} compact />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center md:flex">
          <div className="pointer-events-auto">
            <ModeSwitch locale={locale} isPlayground={isPlayground} dictionary={dictionary} />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <nav aria-label={dictionary.landmarks.primaryNav} className="hidden items-center gap-7 text-[15px] text-ink nav:flex">
            <Link
              to={localeHref(locale, "/#work")}
              className="tap-target transition-colors hover:text-accent"
            >
              {dictionary.nav.projects}
            </Link>
            <Link to={localeHref(locale, "/about")} className="tap-target transition-colors hover:text-accent">
              {dictionary.nav.about}
            </Link>
            <Link
              to={localeHref(locale, "/#contact")}
              className="tap-target transition-colors hover:text-accent"
            >
              {dictionary.nav.contact}
            </Link>
            <LanguageSwitch locale={locale} pathname={bare} dictionary={dictionary} />
          </nav>

          <div className="-mr-2 nav:hidden">
            <MobileMenu
              locale={locale}
              dictionary={dictionary}
              pathname={bare}
              isPlayground={isPlayground}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
