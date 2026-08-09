export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Builds an href for `path` under `locale`, omitting the prefix for the default locale. */
export function localeHref(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}
