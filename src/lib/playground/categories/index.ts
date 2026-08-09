import type { Locale } from "@/lib/i18n";
import type { PlaygroundCategoryContent } from "../types";
import digitalArt from "./digital-art";
import crafts from "./crafts";
import editorial from "./editorial";
import graphicExperiments from "./graphic-experiments";
import threeDMotion from "./3d-motion";
import interactive from "./interactive";

const registry = {
  "digital-art": digitalArt,
  crafts,
  editorial,
  "graphic-experiments": graphicExperiments,
  "3d-motion": threeDMotion,
  interactive,
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
