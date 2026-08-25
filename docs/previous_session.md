# Previous Session

**SESSION-016** — 2026-08-25 — `MILESTONE-005` / `MILESTONE-002` — Complete
Full record: `docs/sessions/session_016.md`. Commits `b83c49a` (images) and the docs commit
after it.

## What changed

**18 of 136 image slots are filled, up from 7.** The eleven bento tiles, the six case-study
heroes, and six prev/next cards. The homepage is a wall of work rather than eleven grey
rectangles.

**`projects[].image` is live, not dead.** It had been lumped in with `ISSUE-010`'s dead
fields; `NextProjectNav` renders it at the foot of every case study. Six real slots were
sitting there showing old placeholder PNGs.

**`scripts/image-treat.mjs` is new** — crops, resizes, grades and **measures**, in the Chrome
this project already drives. It reports the luminance of the two bands where `BentoGrid` puts
white text and **fails the run if a tile is too bright**, so SESSION-014's measured ceiling is
now enforced rather than remembered. No dependency; `axe-core` is still the only one.

**The provenance gate did real work.** `DECISION-016` said read each documentation's sources
page first, and doing so changed what could be used in **all six**. Full table in
`docs/reference/image_sources.md` and `decision_016.md`. Nothing borrowed shipped.

## What this constrains

- **`DECISION-016` is not a formality — it bites on every document.** Read the sources page.
- **AFONO's mockups are AI-generated and the owner's own document says so**, calling them
  placeholders for later real photography. That is a judgement about how they present their
  work, so it was left to them. AFONO is represented by its logo system and print designs.
- **Export WebP.** With no responsive pipeline, format is the only lever: eighteen slots came
  to 475 KB, and the homepage transfers 203 KB of imagery for eleven tiles.
- **Build `SUGGESTION-012` before the remaining 118.** Eighteen files were hand-sizable; 118
  are not.
- **14 legacy PNGs are now orphaned** — 811 KB that would ship. Left in place; they are the
  owner's files and may be source material.
- Working method that turned a day into an hour: contact-sheet a whole document and look
  once; overlay a decile grid to read crop boxes off rather than guess. Expect two or three
  rounds — the first pass usually leads with a German figure caption.

## What did not change

`og:image` is still missing (`ISSUE-006`) and is **not a crop** — it is a designed 1200×630
card. No prose was touched. Nothing pushed, nothing deployed.
