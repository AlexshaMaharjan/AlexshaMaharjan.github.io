# Previous Session

**SESSION-026** — 2026-09-04. Full record: `docs/sessions/session_026.md`.

## What it did

`Images/Afono/` (30 files) and `Images/SyncFM/` (8) had arrived — not the kitchen and QIS the
hand-off was waiting for, but a re-shoot of the two case studies that still ran on PDF crops.

**148 slots, 73 filled.** AFONO went 15 → **23 slots with 1 empty**; Sync FM 12 → **13 with 2**.
**Four of the six case studies are now complete and all four run on the owner's own exports.**
Twelve PDF crops were superseded in one session.

## The thing worth carrying forward

**A supplied folder can answer a question the documentation could not.** SESSION-021 left three
Sync FM persona slots hatched on the grounds that pages 9–11 of the documentation are running
text with no card to export (`DECISION-016` Amendment 2). `Persona.png` **is** that card — Leo,
Sarah and Walter on one board.

So the three slots became **one**. A single board is one figure; cropping it into thirds to match
a manifest written before the file existed would invent a layout the owner never made. **When the
artefact disagrees with the slot count, the artefact wins** — the same call as Surugami's
`[ sitemap + wireframes ]` splitting in two, run in the opposite direction.

## Two files that were not used, and why

- **`Wireframe.png` is empty.** 14,299 × 8,794, 496 KB, entirely white; `ink-box` finds no ink
  anywhere on the canvas. Not a judgement — the export captured nothing. Re-export it if a real
  wireframe board exists.
- **`InstaInspiration.png` is two thirds other brands' Instagram feeds.** `DECISION-016` says
  crop to the owner's part; `ink-box` puts their grid panel at `[0.6196, 0.1694, 0.3673, 0.8124]`
  if it is ever wanted. It was not placed because `[ social media ]` now shows the finished posts,
  which are a better figure than the grid that laid them out.

**`[ market analysis ]` is AFONO's last empty slot** and stays that way: the only thing supplied
for it was the material being compared, not the owner's comparison of it.

## One inference the owner should check

The open decision *"may AFONO's AI-generated product imagery be shown?"* was **read as answered by
the folder** — the AI try-on preview, product page, shop page and tee mockups were all supplied
and are all now placed. That is an inference from a file drop, not a stated decision. It is
recorded in `ISSUE-035` and is one line to reverse.

## What the layout work bought

Several supplied files are very tall — a cart drawer at 0.375, a product page at 0.545, Sync FM's
prototype board at 0.628. `SUGGESTION-017`'s ceiling holds each to 800px and `DECISION-018` lets
any of them open full screen, so **not one crop this session was chosen to suit the layout.** That
is precisely what those two changes existed to stop, and this is the first session where it was
load-bearing.

`Landing Page.png` (2845 × 12972, a 0.219 ratio → 175px wide) is the one the ceiling could not
rescue; left aside rather than forced into a shape it is not.

## Verified

Production build: routes 36/36; **196 images across 36 routes at dpr 1, 2 and 3** — exactly the
expected 170 + 13 new filled slots × 2 locales — 0 broken, 0 missing `alt`, 0 failed requests,
counts identical at all densities; axe 0 violations; reduced motion static; `tsc` clean; lint 0
errors; `image-manifest.mjs` exits 0 on en/de parity across both rewritten case studies.

## What it left for the owner

- **The kitchen and QIS folders** (21 slots) and the playground's 39.
- `ISSUE-035`, plus the five standing decisions.
- **Nothing pushed.** 43 commits ahead of `main` before this one, and the live site still shows
  none of it.
