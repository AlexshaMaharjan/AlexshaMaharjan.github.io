import type { Locale } from "@/lib/i18n";
import type { CaseStudyContent } from "./types";
import wikimind from "./wikimind";
import afono from "./afono";
import syncFm from "./sync-fm";
import barrierFreeKitchen from "./barrier-free-kitchen";
import surugami from "./surugami";
import qisPortal from "./qis-portal";

const registry = {
  wikimind,
  afono,
  "sync-fm": syncFm,
  "barrier-free-kitchen": barrierFreeKitchen,
  surugami,
  "qis-portal": qisPortal,
} as const;

export const caseStudySlugs = Object.keys(registry);

export function getCaseStudy(slug: string, locale: Locale): CaseStudyContent | null {
  const entry = registry[slug as keyof typeof registry];
  if (!entry) return null;
  return entry[locale];
}
