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
/**
 * **The order is the owner's running order** (`MILESTONE-022` task 3), and it
 * is the same one `dictionary.projects` lists the six in: AFONO, Surugami,
 * WikiMind, Sync FM, Barrier-Free Kitchen, QIS.
 *
 * It matters here and not only in the dictionary because `caseStudySlugs` is
 * read by `scripts/prerender.mjs`, so this object decides the order the six
 * studies appear in `sitemap.xml`. Two lists, one order: if one of them is
 * re-cut and the other is not, the site says one thing and its sitemap says
 * another.
 */
const loaders = {
  afono: () => import("./afono"),
  surugami: () => import("./surugami"),
  wikimind: () => import("./wikimind"),
  "sync-fm": () => import("./sync-fm"),
  "barrier-free-kitchen": () => import("./barrier-free-kitchen"),
  "qis-portal": () => import("./qis-portal"),
} as const;

export const caseStudySlugs = Object.keys(loaders);

const promises = new Map<string, Promise<CaseStudyLocaleContent | null>>();

function isChunkLoadError(err: unknown): boolean {
  if (!err) return false;
  const msg = (
    err instanceof Error
      ? err.message
      : typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err)
  ).toLowerCase();

  return (
    msg.includes("failed to fetch dynamically imported module") ||
    msg.includes("importing a module script failed") ||
    msg.includes("error loading dynamically imported module") ||
    msg.includes("failed to load module script") ||
    msg.includes("loading chunk")
  );
}

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
    ? loader()
        .then((module) => module.default)
        .catch((error) => {
          promises.delete(slug);
          if (typeof window !== "undefined" && isChunkLoadError(error)) {
            const reloadKey = `chunk_reload_${slug}`;
            const last = sessionStorage.getItem(reloadKey);
            const now = Date.now();
            if (!last || now - Number(last) > 10000) {
              sessionStorage.setItem(reloadKey, String(now));
              window.location.reload();
              return new Promise<never>(() => {});
            }
          }
          throw error;
        })
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
