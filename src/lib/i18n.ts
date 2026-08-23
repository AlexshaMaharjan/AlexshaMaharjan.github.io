export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The inverse of `localeHref`: the path with any locale prefix removed. */
export function stripLocale(pathname: string, locale: Locale): string {
  if (locale === defaultLocale) return pathname;
  const prefix = `/${locale}`;
  return pathname.startsWith(prefix) ? pathname.slice(prefix.length) || "/" : pathname;
}

/** Builds an href for `path` under `locale`, omitting the prefix for the default locale. */
export function localeHref(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}
