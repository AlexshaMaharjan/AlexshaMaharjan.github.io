# SESSION-026 — AFONO and Sync FM, re-shot from supplied folders

Date: 2026-09-04
Branch: `milestone-003-content-model`
Asked for: `docs/next_session.md`, whose first instruction is **check `Images/` first**.

## Two folders, not the two that were expected

`Images/Afono/` (30 files) and `Images/SyncFM/` (8). The hand-off was waiting on the barrier-free
kitchen and QIS Portal; what arrived instead was a re-shoot of the two case studies that already
had PDF-derived figures.

That is a better trade than it sounds. **Four of the six case studies now run entirely on the
owner's own exports**, and twelve PDF crops were superseded in one session.

**148 slots, 73 filled.** AFONO went 15 → **23 slots with 1 empty**; Sync FM went 12 → **13 with
2**.

## Sync FM — the slots the documentation could not fill

SESSION-021 left three persona slots hatched because *"pages 9–11 of the documentation are
running text, so those three slots stay hatched"* (`DECISION-016` Amendment 2). **`Persona.png`
is the card that text describes** — Leo 19, Sarah 42, Walter 73, side by side on one board.

So the three slots became **one**. A single board is one figure, and pretending otherwise by
cropping it into thirds would invent a layout the owner did not make. The site total moves with
it: three slots out, one in.

Three more slots are new, because the folder held figures the documentation never separated out:
`[ colour palette ]`, `[ typography ]` and `[ wireframes ]`. The old `[ logo + visual system ]`
became **`[ logo iterations ]`** — the supplied board is four iterations beside the final mark,
which is a narrower and more accurate claim than "visual system".

`[ competitor comparison ]` and `[ ethical-risk diagram ]` stay hatched. Nothing was supplied for
either, and neither exists in the documentation.

## AFONO — thirty files, seventeen used

The contact sheet (`scripts/contact-sheet.mjs`) was worth its existence here: thirty files
reviewed in one image rather than thirty.

`[ product page ]` is filled — it had been hatched since the manifest was written. Six slots are
new: `[ moodboard ]`, `[ wordmark studies ]`, `[ logo lockups ]`, `[ colour palette ]`,
`[ typography ]`, `[ print artwork ]`, `[ tee mockups ]` and `[ components ]`.

**Three files were not used, and `ISSUE-035` says why.** Two are worth stating here:

- **`Wireframe.png` is empty.** 14,299 × 8,794 pixels, 496 KB, and entirely white — `ink-box`
  reports `no ink found` across the whole canvas. Not a judgement call; the file has nothing in
  it. Worth re-exporting if a real wireframe board exists.
- **`InstaInspiration.png` is two thirds other brands' Instagram feeds**, one third the owner's
  own grid system. `DECISION-016` says to crop to the owner's part, and `ink-box` puts that panel
  at `[0.6196, 0.1694, 0.3673, 0.8124]` if it is ever wanted. It was not placed, because
  `[ social media ]` now shows `InstaPosts.png` — the finished posts are a better figure than the
  grid that laid them out.

**`[ market analysis ]` therefore stays hatched, and is AFONO's last empty slot.** The only thing
supplied for it was the material being compared rather than the owner's comparison of it, which
is precisely what `DECISION-016` puts out of bounds.

## The AI question may have been answered by the folder

An owner decision has been open since SESSION-016: *may AFONO's AI-generated product imagery be
shown?* Its sources page says the AI mockups cover **every product visual in the prototype**.

The folder supplied the AI try-on preview, the product page, the shop page and the tee mockups,
all of which contain that imagery — and all of which are now placed. **Supplying them was read as
the answer.** That is an inference from a file drop rather than a stated decision, so it is
written down in `ISSUE-035` and is one line to reverse. The disclosure the case study already
carries in both locales is what makes shipping them defensible either way.

## Aspects, and the ceiling doing its job

Every declared aspect is the exported file's exact pixel ratio. Several of the supplied files are
tall — a cart drawer at 0.375, a product page at 0.545, Sync FM's prototype board at 0.628 — and
`SUGGESTION-017`'s ceiling holds each to 800px rather than letting it stretch the column:

| Figure | True ratio | Renders |
| --- | --- | --- |
| `[ cart ]` | 0.375 | 300 × 800 |
| `[ size finder ]` | 0.535 | 428 × 800 |
| `[ product page ]` | 0.545 | 436 × 800 |
| `[ final mobile screens ]` | 0.628 | 502 × 800 |

Small on the page, and every one of them opens full screen (`DECISION-018`). **That combination
is why no crop this session was chosen to suit the layout** — which is exactly what those two
changes were built to stop.

`Images/Afono/Landing Page.png` is the one file the ceiling could not rescue: 2845 × 12972, a
0.219 ratio, which renders 175px wide. Left aside rather than cropped into something it is not.

**Nothing was upscaled.** Export width is `min(target, source width)`, so `[ wireframes ]` ships
at its native 820px and the small logo boards at 1042–1228px. The pipeline cannot catch upscaling,
so it is enforced at the spec.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed image requests, per-route counts
  identical at all three densities
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `image-manifest.mjs` exits 0 — `en` and `de` name an identical set of sources across both
  rewritten case studies
- AFONO's identity section read at 1440px: five boards three-across, then typography full width

## Weight — `ISSUE-033` widened

`/work/afono` went from 13 figures to 22 and is now the heaviest page on the site: **694 KB at
1440/1x, and 1544 KB at 390/3x.** WikiMind, the previous holder, is 710 KB / 1007 KB.

The mobile figure has a structural cause worth writing down. Grid runs are `sm:grid-cols-3`, so
**below 640px every figure collapses to full width** — a phone renders 22 figures at 350px each
and at DPR 3 asks for roughly 1050px of each, landing on the 1280 variant. `SUGGESTION-017`'s
ceiling cannot help: it is a `max-width`, and at 350px nothing is capped.

Nothing is malfunctioning. The largest available lever is the variant ladder's fixed 0.82
quality, which is site-wide and would need looking at before adopting. `ISSUE-033` was
WikiMind-specific and is now widened to cover all four figure-dense case studies, with the
numbers.

## Still open

- **The barrier-free kitchen (10 slots) and QIS Portal (11)** — still the only case studies on
  PDF-only figures. The playground's 39 slots are untouched.
- `ISSUE-035` — the empty `Wireframe.png`, the cropped-out inspiration board, the AI inference
- `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006` — all owner decisions
- **Nothing pushed.** 43 commits ahead of `main` before this one, and the live site still shows
  none of it.
