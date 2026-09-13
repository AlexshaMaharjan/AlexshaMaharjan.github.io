export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

/** The inverse of `localeHref`: the path with any locale prefix removed. */
export function stripLocale(pathname: string, locale?: Locale): string {
  if (locale && (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    return pathname.slice(locale.length + 1) || "/";
  }
  if (pathname.startsWith("/en/") || pathname === "/en") {
    return pathname.slice(3) || "/";
  }
  if (pathname.startsWith("/de/") || pathname === "/de") {
    return pathname.slice(3) || "/";
  }
  return pathname;
}

/** Builds an href for `path` under `locale`, omitting the prefix for the default locale. */
export function localeHref(locale: Locale, path: string): string {
  const clean = stripLocale(path);
  const pathClean = clean === "/" ? "" : clean;
  return locale === defaultLocale ? clean || "/" : `/${locale}${pathClean}`;
}
