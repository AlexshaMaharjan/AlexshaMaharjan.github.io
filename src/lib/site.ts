/**
 * Where this site lives, and the routes it has.
 *
 * The origin is needed for absolute URLs — canonical links and Open Graph
 * images have to be absolute or scrapers ignore them. `DECISION-012`: GitHub
 * Pages, published by `npm run deploy`. If a custom domain lands, this is the
 * one line to change.
 */
export const SITE_ORIGIN = "https://alexshamaharjan.github.io";

/** Absolute URL for a path, for canonical / og:url / og:image. */
export function absoluteUrl(path: string): string {
  return SITE_ORIGIN + (path.startsWith("/") ? path : `/${path}`);
}

/**
 * The archive's route, in one place (`MILESTONE-022` task 4).
 *
 * The page was called the playground until the owner renamed it, and the old
 * name was written out as a path literal in eight files — the header's and the
 * footer's "is this the archive" tests, the mode switch's two links, the mobile
 * menu, the homepage's peek, the router, and the prerender list. Renaming it
 * meant finding all eight, and missing one is a link that 404s rather than a
 * compile error.
 *
 * **The code keeps the old word and the site does not.** `components/playground/`,
 * `lib/playground/` and the `playground*` dictionary keys are untouched
 * (`DECISION-059`): they are internal names, the owner still calls the page the
 * playground in conversation, and renaming them would rewrite several hundred
 * lines of documentation that cite them by path for no reader-visible gain.
 * What a visitor sees — the navigation, the headings, the URL, the metadata —
 * says Archive.
 */
export const ARCHIVE_PATH = "/archive";

/**
 * Where the archive used to live. Kept so a link somebody already has still
 * lands: `routes.tsx` answers it with a redirect rather than a 404.
 */
export const ARCHIVE_LEGACY_PATH = "/playground";
