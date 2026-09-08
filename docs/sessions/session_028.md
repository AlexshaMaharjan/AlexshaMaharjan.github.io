# SESSION-028 — Five bento tiles re-cut, and one premise disproved

Date: 2026-09-08
Branch: `milestone-003-content-model`
Asked for: `docs/next_session.md`.

## No new folders

`Images/` still holds only `wikimind`, `Surugami`, `SyncFM` and `Afono`. The barrier-free
kitchen, QIS Portal and the playground have not arrived, so **no case-study figure work was
possible** and none was invented — the hand-off is explicit about that.

What it also named was the one thing that could be done without anyone: **re-cut the bento
tiles**, since the homepage was the last surface still running entirely on PDF page crops while
four case studies had moved to the owner's own exports.

## The premise the hand-off carried was wrong, and measuring showed it

`next_session.md` said to re-cut **the two Surugami tiles**, because `Images/Surugami/` "now holds
sharper sources for both". It does not, and the reason generalises.

A bento tile needs a crop **at the tile's aspect and at least as wide as its export**:
`tile-surugami-brand` is 448/322 at 900px, so it needs a source region of at least 900 × 647.
A decile grid over `Poster.png` (2518 × 1824) measures what is actually available:

| Element | Region | Pixels |
| --- | --- | --- |
| Stairwell photo, three posters | x 0.50–0.875, y 0.03–0.285 | 944 × 465 — **too short** |
| Corridor poster with the crane | x 0.245–0.44, y 0.28–0.655 | 491 × 684 — **too narrow** |
| Outdoor banner | x 0.495–0.878, y 0.695–0.845 | 964 × 274 — **too short** |

**A supplied board is a composite.** Its total resolution is high, but each element inside it is
only 400–1000px, and a tile needs one element at full size. A PDF page rendered at scale 4–6
gives *more* pixels per element than a board that packs eight of them into 2518px.

So re-cutting Surugami's tiles from the supplied folder would have **upscaled** them — a visible
downgrade, done in the name of an upgrade. The same test ruled out `tile-afono-graphic`:
`print3.png` is three thin vertical marks on white, and any crop at the tile's 224/322 is mostly
empty page.

Worth keeping as a rule: **a supplied export beats a page render for a figure, and often loses to
it for a tile.** A figure shows the whole board; a tile shows one thing inside it.

## What was re-cut — five tiles

Five sources do fill their tile at full size, and all five were measured before cutting:

| Tile | Source | Crop | Contrast (ceiling 128 / 138) |
| --- | --- | --- | --- |
| `tile-wikimind-brand` | `LogoVarients.png` | `[0, 0, 0.600, 1.0]` | top 88, middle 60 |
| `tile-wikimind-web` | `Visualle Baukasten.png` | `[0, 0, 1.0, 0.890]` | top 80, middle 77 |
| `tile-afono-brand` | `LogoVariationsColor.png` | `[0, 0, 1.0, 0.571]` | top 65, middle 76 |
| `tile-syncfm-interaction` | `Screens.png` | `[0.0, 0.045, 0.525, 0.237]` | top 88, middle 130 |
| `tile-syncfm-mobile` | `Screens.png` | `[0.50, 0.045, 0.39, 0.235]` | top 62, middle 64 |

Every one passes `image-treat.mjs`'s bento contrast check on the first or second attempt, which
is what keeps the white tile text legible (`SESSION-014` measured that ceiling).

**Two crops were wrong and were caught by looking at the rendered grid, not the numbers.** Sync
FM's first crop clipped the phones top and bottom; widening the window to the row's full height
fixed it. AFONO's *second* crop was worse than its first — narrowing `x` to isolate the red block
clipped the lockups horizontally, because the lockups span the full width of the source. Reverted.
A crop can pass the contrast check and still be badly composed; the check does not look at
composition and was never meant to.

`tile-syncfm-interaction`'s alt now says **two** screens rather than three, in both locales,
because that is what the new crop shows.

## Six tiles still come from PDFs

`tile-afono-graphic`, both Surugami tiles, both QIS tiles and `tile-kitchen-inclusive`. Two of
those are ruled out above; three wait on folders that have not arrived. Recorded in
`image_sources.md` so the next session does not re-test what this one already measured.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- 196 images across 36 routes at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests,
  per-route counts identical at all three densities
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- The bento grid read at 1440px after every re-cut, which is how both bad crops were found

## Still open

- The kitchen (10 slots), QIS Portal (11) and the playground (39)
- `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 45 commits ahead of `main` before this one, and the live site still shows
  none of it.
