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
