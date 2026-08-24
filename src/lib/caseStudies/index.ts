import type { Locale } from "@/lib/i18n";
import type { CaseStudyContent, CaseStudyLocaleContent } from "./types";

/**
 * One loader per case study, so a visitor downloads the study they asked for
 * rather than all six (`ISSUE-019`). Statically importing the registry put both
 * locales of every study — about 2,000 lines — into a single chunk that had to
 * arrive before any one of them could be read.
 *
 * `import()` is cached by the module system, so the second visit to a study
 * resolves from memory and `caseStudyPromise` hands back the same promise it
 * did the first time.
 */
const loaders = {
  wikimind: () => import("./wikimind"),
  afono: () => import("./afono"),
  "sync-fm": () => import("./sync-fm"),
  "barrier-free-kitchen": () => import("./barrier-free-kitchen"),
  surugami: () => import("./surugami"),
  "qis-portal": () => import("./qis-portal"),
} as const;

export const caseStudySlugs = Object.keys(loaders);

const promises = new Map<string, Promise<CaseStudyLocaleContent | null>>();

/**
 * The promise for a study's content, stable per slug.
 *
 * Stability is the whole point: this is meant to be read with React's `use()`,
 * which re-runs the component when the promise resolves — a new promise on each
 * render would suspend forever.
 */
export function caseStudyPromise(slug: string): Promise<CaseStudyLocaleContent | null> {
  const existing = promises.get(slug);
  if (existing) return existing;

  const loader = loaders[slug as keyof typeof loaders];
  // An unknown slug is answered immediately rather than after a round trip:
  // that is what renders the 404.
  const promise = loader
    ? loader().then((module) => module.default)
    : Promise.resolve(null);

  promises.set(slug, promise);
  return promise;
}

/** Picks the locale out of a loaded study. */
export function localeContent(
  content: CaseStudyLocaleContent | null,
  locale: Locale,
): CaseStudyContent | null {
  return content ? content[locale] : null;
}
