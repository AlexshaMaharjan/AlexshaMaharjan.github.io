import { Link, useLocation } from "react-router-dom";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export default function LanguageSwitch({
  locale,
  pathname,
  dictionary,
  className = "",
}: {
  locale: Locale;
  pathname: string;
  dictionary: Dictionary;
  className?: string;
}) {
  const location = useLocation();
  const target: Locale = locale === "en" ? "de" : "en";
  const label = target.toUpperCase();
  const ariaLabel = locale === "en" ? dictionary.nav.switchToGerman : dictionary.nav.switchToEnglish;
  const hash = location.hash || "";
  const to = `${localeHref(target, pathname)}${hash}`;

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={`inline-flex items-center rounded-full border border-border px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-accent-focus ${className}`}
    >
      {label}
    </Link>
  );
}
