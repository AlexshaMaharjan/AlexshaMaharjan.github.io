export interface MobileSlotLayout {
  /** 1-based CSS grid column start (1, 2, or 3). */
  col: number;
  /** Number of columns to span (default 1). */
  colSpan?: number;
  /** 1-based CSS grid row start. */
  row: number;
  /** Number of row units to span. In the 12-unit grid: 4 = square (1:1), 6 = portrait (2:3), 3 = landscape (4:3), 2 = wide banner (2:1). */
  rows: number;
  /** How the image sits in the container: "cover" (default, fills box) or "contain". */
  fit?: "cover" | "contain";
  /** Custom crop / object-position on mobile (e.g. "50% 15%"), overriding desktop focus. */
  focus?: string;
  /** Whether this slot is omitted on mobile (e.g. desktop-only abstract art). */
  hidden?: boolean;
}

/**
 * Mobile bento grid layouts for the Archive's 4 cards, matched to the
 * Figma mobile artboards exported in `Images/Playground/Article - Collage 1..4`.
 * All images fit their containers directly with custom crop positions.
 */
export const MOBILE_CARD_LAYOUTS: Record<string, MobileSlotLayout>[] = [
  // Card 01: Warm Work (Article - Collage 1 von 4_ warme Arbeiten.png)
  {
    "/images/pg-kalender-dezember.webp": { col: 2, row: 1, rows: 3, fit: "cover", focus: "50% 50%" },
    "/images/pg-painting-framed.webp": { col: 1, row: 2, rows: 6, fit: "cover", focus: "50% 50%" },
    "/images/pg-kalender-cover.webp": { col: 3, row: 3, rows: 3, fit: "cover", focus: "50% 50%" },
    "/images/pg-sunset.webp": { col: 2, row: 4, rows: 6, fit: "cover", focus: "50% 35%" },
    "/images/pg-kalender-oktober.webp": { col: 3, row: 6, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-painting-luffy.webp": { col: 1, row: 8, rows: 7, fit: "cover", focus: "50% 50%" },
    "/images/pg-clip-hibi.webp": { col: 2, colSpan: 2, row: 10, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-kalender-juni.webp": { col: 1, row: 15, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-autumn.webp": { col: 2, row: 15, rows: 6, fit: "cover", focus: "50% 50%" },
    "/images/pg-gift-popup.webp": { col: 3, row: 15, rows: 6, fit: "cover", focus: "50% 50%" },
    "/images/pg-flyer.webp": { col: 1, row: 19, rows: 5, fit: "cover", focus: "50% 50%" },
    "/images/pg-packaging-crisps.webp": { col: 2, row: 21, rows: 3, fit: "contain", focus: "50% 50%" },
    "/images/pg-kalender-maerz.webp": { col: 3, row: 21, rows: 3, fit: "cover", focus: "50% 50%" },
  },

  // Card 02: Blue Work (Article - Collage 2 von 4_ blaue Arbeiten.png)
  {
    "/images/pg-bead.webp": { col: 1, row: 1, rows: 6, fit: "cover", focus: "50% 45%" },
    "/images/pg-portrait.webp": { col: 3, row: 1, rows: 6, fit: "cover", focus: "50% 25%" },
    "/images/pg-mindruhe.webp": { col: 2, row: 1, rows: 3, fit: "contain", focus: "50% 50%" },
    "/images/pg-forest.webp": { col: 2, row: 4, rows: 7, fit: "cover", focus: "50% 50%" },
    "/images/pg-kalender-juli.webp": { col: 1, row: 7, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-packaging-perfume-flat.webp": { col: 3, row: 7, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-poster-museum.webp": { col: 1, row: 11, rows: 7, fit: "cover", focus: "50% 50%" },
    "/images/pg-packaging-perfume.webp": { col: 2, row: 11, rows: 4, fit: "contain", focus: "50% 50%" },
    "/images/pg-painting-blossom.webp": { col: 3, row: 11, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-kalender-mai.webp": { col: 2, row: 15, rows: 3, fit: "cover", focus: "50% 50%" },
  },

  // Card 03: Dark Work (Article - Collage 3 von 4_ dunkle Arbeiten.png)
  {
    "/images/pg-group-portrait.webp": { col: 2, row: 1, rows: 4, fit: "contain", focus: "50% 8%" },
    "/images/pg-photo-stilllife.webp": { col: 3, row: 1, rows: 3, fit: "cover", focus: "50% 50%" },
    "/images/pg-poster-hologram.webp": { col: 1, row: 1, rows: 7, fit: "cover", focus: "50% 50%" },
    "/images/pg-line-study.webp": { col: 3, row: 4, rows: 6, fit: "cover", focus: "50% 10%" },
    "/images/pg-postcard-1.webp": { col: 2, row: 5, rows: 3, fit: "contain", focus: "50% 50%" },
    "/images/pg-clip-motorbike.webp": { col: 1, colSpan: 2, row: 8, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-photo-lowkey.webp": { col: 3, row: 10, rows: 8, fit: "cover", focus: "50% 15%" },
    "/images/pg-typography-posters.webp": { col: 1, row: 12, rows: 6, fit: "cover", focus: "50% 50%" },
    "/images/pg-desmark-logo.webp": { col: 2, row: 12, rows: 2, fit: "contain", focus: "50% 50%" },
    "/images/pg-bookcover.webp": { col: 2, row: 14, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-abstract.webp": { col: 1, row: 1, rows: 1, hidden: true },
  },

  // Card 04: Pink and Lilac Work (Article - Collage 4 von 4_ rosa und lila Arbeiten.png)
  {
    "/images/pg-vtri-banner.webp": { col: 2, row: 1, rows: 2, fit: "contain", focus: "50% 50%" },
    "/images/pg-logo.webp": { col: 3, row: 1, rows: 4, fit: "contain", focus: "50% 50%" },
    "/images/pg-double-portrait.webp": { col: 1, row: 2, rows: 3, fit: "cover", focus: "50% 50%" },
    "/images/pg-clip-popup.webp": { col: 2, row: 3, rows: 6, fit: "cover", focus: "50% 50%" },
    "/images/pg-frame-detail.webp": { col: 1, row: 5, rows: 6, fit: "cover", focus: "50% 50%" },
    "/images/pg-vtri-store.webp": { col: 3, row: 5, rows: 6, fit: "cover", focus: "50% 50%" },
    "/images/pg-kalender-september.webp": { col: 2, row: 9, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-gift-popupbox.webp": { col: 1, row: 11, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-clip-riona.webp": { col: 3, row: 11, rows: 5, fit: "cover", focus: "50% 50%" },
    "/images/pg-scooter.webp": { col: 2, row: 13, rows: 4, fit: "cover", focus: "50% 50%" },
    "/images/pg-character.webp": { col: 1, row: 15, rows: 7, fit: "cover", focus: "50% 20%" },
    "/images/pg-kalender-februar.webp": { col: 3, row: 16, rows: 3, fit: "cover", focus: "50% 50%" },
    "/images/pg-clip-unboxing.webp": { col: 2, row: 17, rows: 6, fit: "cover", focus: "50% 50%" },
  },
];
