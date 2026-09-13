import { useLocation } from "react-router-dom";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeFromPathname(pathname);
}

export function useDictionary(): Dictionary {
  return getDictionary(useLocale());
}
