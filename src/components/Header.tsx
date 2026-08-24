import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import type { Locale } from "@/lib/i18n";
import { localeHref, stripLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import ModeSwitch from "@/components/ModeSwitch";
import LanguageSwitch from "@/components/LanguageSwitch";
import MobileMenu from "@/components/MobileMenu";

export default function Header({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const pathname = useLocation().pathname ?? "/";
  const bare = stripLocale(pathname, locale);
  const isPlayground = bare.startsWith("/playground");
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Publish the header's real height as --header-h, which index.css turns into
  // the offset anchored sections and the case-study rail sit below. The header
  // is 73px tall on desktop and 146px below 480px, where it gains a second row;
  // a single hard-coded offset hid 42px of every anchored section (ISSUE-015).
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
      <div className="relative flex h-[72px] items-center justify-between px-6 md:px-12">
        <Link
          to={localeHref(locale, "/")}
          className="shrink-0 text-[16px] font-semibold tracking-[-0.01em] text-ink"
        >
          Alexsha Maharjan
        </Link>

        {/* Absolutely centred on the viewport, so it collides with whichever side
            is wider. It only has room from md up: at 480px it overlapped the
            wordmark by 34px, at 520px by 14px (ISSUE-016). Below that it lives
            in the second row instead — one switch at every width. */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center md:flex">
          <div className="pointer-events-auto">
            <ModeSwitch locale={locale} isPlayground={isPlayground} dictionary={dictionary} />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <nav aria-label="Primary" className="hidden items-center gap-7 text-[15px] text-ink nav:flex">
            <Link
              to={localeHref(locale, "/#work")}
              className="tap-target transition-colors hover:text-accent"
            >
              {dictionary.nav.projects}
            </Link>
            <Link to={localeHref(locale, "/#about")} className="tap-target transition-colors hover:text-accent">
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

          <div className="nav:hidden">
            <MobileMenu locale={locale} dictionary={dictionary} pathname={bare} />
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-border/70 py-2.5 md:hidden">
        <ModeSwitch locale={locale} isPlayground={isPlayground} dictionary={dictionary} />
      </div>
    </header>
  );
}
