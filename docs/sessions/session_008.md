# SESSION-008 — The owner's three decisions, acted on

Date: 2026-08-24
Milestone: `MILESTONE-002` (homepage work section) and `MILESTONE-005` (imagery), both
unblocked by the answers
Objective: Record the owner's answers to `DECISION-010`, `DECISION-006` and `DECISION-012`,
and build what each of them unblocks.
Outcome: **Three issues resolved** (`ISSUE-005`, `ISSUE-007`, and the mechanism half of
`ISSUE-004`), and an image manifest produced — the owner is making the images.

## The answers

| Decision | The owner's answer | What it unblocked |
| --- | --- | --- |
| `DECISION-010` | "i want bento grid. i need to make images." | `MILESTONE-002` — parked since SESSION-002 |
| `DECISION-006` | "almost all placeholders are images" | the last 44 slots of `ISSUE-007` |
| `DECISION-012` | "dont point at the adobe one. point at this website." | the résumé's portfolio link |

**No decision is outstanding now.** What the roadmap waits on is material: images, and the
owner's participation in the copy pass.

## What Changed

**The bento grid is content, and image-ready.** Its eleven tiles moved from a hard-coded
array in `BentoGrid.tsx` into `dictionaries/{en,de}.ts`, which fixed `ISSUE-005` — the
German homepage was showing English labels — and means giving a tile an image is a data
edit (`ISSUE-004`). A tile with a `src` renders it under a gradient scrim so its label and
title stay legible; a tile without one stays the flat grey card. The two states mix
cleanly, which matters while eleven images are being made one at a time.

**Every image slot on the site can now be filled from data.** `DECISION-006`'s answer
means the hatched box is a fallback, not a destination, so the 44 slots that had no source
field got one: `PlaygroundItem` (36 cards plus the project's main image),
`about.carouselItems[]` (8), and the playground hero collage's two cards — which were
hard-coded in the page and are content now. `ISSUE-007` is closed.

One component decides: `src/components/ui/Media.tsx` renders the image when a `src` exists
and the placeholder when it does not. `case-study/Figure.tsx` builds its caption on top of
it instead of repeating the logic.

**The résumé points here**, not at `alexshamaharjan.myportfolio.com`.

## The manifest

`scripts/image-manifest.mjs` generates `docs/reference/image_manifest.md` from the content
data: **136 slots, 7 filled**, each with its aspect ratio, the export width that suits it
at 2× on a 1440px screen, and the exact data path that fills it. Generated rather than
written, so the counts cannot drift from the code.

Worth knowing when filling them in: `src` lives in both the `en` and `de` objects of the
same file, so a slot is two edits — same path, translated `alt`.

## Files Changed

`BentoGrid.tsx` (data-driven, image-aware), `SelectedWork.tsx`, `ui/Media.tsx` (new),
`lib/caption.ts` (new), `case-study/Figure.tsx`, the four playground call sites,
`About.tsx`, the dictionary and playground types, both dictionaries, `playground/home.ts`,
`scripts/image-manifest.mjs` (new), `CONTENT_GUIDE.md`.

Committed as `ee3857f`.

## Validation

- `npm run lint` — 0 errors, the same 3 pre-existing warnings. `npm run build` — green.
- Headless Chrome against the **production build**: all 38 routes in both locales render
  with an `h1` and real content, **no console errors, no broken images, no horizontal
  overflow**; the bento is bilingual across all eleven tiles with locale-correct links.
- An image-bearing tile was wired temporarily, measured (a 3314×4080 file loading into the
  Kitchen tile, scrim and title legible over it), screenshotted, and reverted.

## Remaining Concerns

- **The images are the owner's to make** — 129 empty slots. The site is presentable
  meanwhile; that is what the placeholder is for.
- **`ISSUE-004` is only half done.** The mechanism is there; eleven images are not. It
  stays open for that reason.
- The bento's duplication — five of six projects appear twice — is now deliberate
  (`DECISION-010`). With images it reads as a wall of work; with grey tiles it reads as a
  list with repeats. That will not look right until several images exist.
- A custom domain is still undecided (`DECISION-012`), and deployment is still manual.
