import type { Locale } from "@/lib/i18n";
import type { PlaygroundCategoryContent } from "../types";
import gamesAndApps from "./games-and-apps";
import photography3dMotion from "./photography-3d-motion";
import graphicDesign from "./graphic-design";
import digitalArt from "./digital-art";
import crafts from "./crafts";

/*
 * Insertion order is the site's order (SESSION-033). `getAllCategories` maps
 * over `Object.values`, the playground index renders that array, and
 * `prerender.mjs` derives its routes from `categorySlugs` — so this object is
 * the single place the running order is decided, and `home.ts` only has to
 * agree with it.
 */
const registry = {
  "games-and-apps": gamesAndApps,
  "photography-3d-motion": photography3dMotion,
  "graphic-design": graphicDesign,
  "digital-art": digitalArt,
  crafts,
} as const;

export const categorySlugs = Object.keys(registry);

export function getCategory(slug: string, locale: Locale): PlaygroundCategoryContent | null {
  const entry = registry[slug as keyof typeof registry];
  if (!entry) return null;
  return entry[locale];
}

export function getAllCategories(locale: Locale): PlaygroundCategoryContent[] {
  return Object.values(registry).map((entry) => entry[locale]);
}
