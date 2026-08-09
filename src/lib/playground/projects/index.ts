import type { Locale } from "@/lib/i18n";
import type { PlaygroundProjectContent } from "../types";
import motorbikeStudy from "./motorbike-study";

const registry = {
  "motorbike-study": motorbikeStudy,
} as const;

export const projectSlugs = Object.keys(registry);

export function getProject(slug: string, locale: Locale): PlaygroundProjectContent | null {
  const entry = registry[slug as keyof typeof registry];
  if (!entry) return null;
  return entry[locale];
}
