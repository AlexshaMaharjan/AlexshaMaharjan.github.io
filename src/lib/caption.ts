/**
 * `[ moodboard ]` → `moodboard`.
 *
 * Image captions are written bracketed in the data, because that is how they
 * read inside the hatched placeholder (`DECISION-006`). Where a real image
 * exists the brackets come off.
 */
export function captionText(caption: string): string {
  return caption.replace(/^\[\s*|\s*\]$/g, "").trim();
}
