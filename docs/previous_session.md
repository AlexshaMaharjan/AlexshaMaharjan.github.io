# Previous Session

**SESSION-027** — 2026-09-04. Full record: `docs/sessions/session_027.md`.

## What it did

The owner said the figure sizes were bugging them and asked for consistency, plus figures placed
after the paragraphs they belong to.

**`DECISION-019`: figures are now sized by height.** Every figure renders 640px tall unless the
column binds first, and a row is justified — one height, widths proportional to each figure's own
aspect. **`SUGGESTION-017` is superseded.** AFONO's 22 figures moved out of end-of-section
galleries and into the prose.

## The thing worth carrying forward

**The fix that was asked for and the fix that was needed were different, and measuring separated
them in a minute.**

The obvious reading was "lone figures render at too many bespoke widths". A script that walked
every case study and reproduced `SectionMedia`'s grouping said otherwise:

```
distinct rendered widths today: 5
307, 470, 502, 532, 960
2 figures at 2 different bespoke widths
```

Widths were nearly uniform already. **Heights were the problem** — a row gives each figure an
equal share of the column, so heights come out at whatever the aspects make them. AFONO's
collection row: 819px, 563px and 230px tall, three captions at three levels.

Tidying nine bespoke widths would have been real work that fixed nothing visible.

## How the constraint shaped the answer

Two rules could not move: **a declared aspect must equal the file's true aspect** (`object-cover`
makes any mismatch a silent crop) and the column is 960px. So for heights to match, **widths have
to absorb the difference** — which is the justified-gallery layout, and it falls out of two CSS
declarations: `flex-grow: <ratio>` on `flex-basis: 0` gives widths proportional to ratios, and
since each box is `aspect-ratio: <ratio>`, every height in the row is then identical.

**Wide figures did not change.** Anything 1.5 or wider fits its full 960px inside 640px of height,
so the rule turned out uniform rather than special-cased — usually the sign it is the right rule.

## Two things caught by looking rather than by the harness

- **AFONO's collection figures landed before the list that names them** — Himal, City, Mythic,
  Logo Essentials. Fixed by a rule, not by hand: a `figures` block immediately followed by a
  `list` block gets the two swapped.
- **At the 640px breakpoint a three-figure row put the narrowest figure at 140px.** Rows now turn
  horizontal at 768px, so between 640 and 768 figures stack at 660px instead.

## Verified

Production build: routes 36/36; 196 images across 36 routes at dpr 1, 2 and 3, 0 broken, 0 missing
`alt`, 0 failed requests, counts identical at all densities; axe 0 violations; 0 overflow; reduced
motion static; `tsc` clean; lint 0 errors; `image-manifest.mjs` exits 0 and AFONO still reports 23
slots with 1 empty after every figure moved. Figure widths read off the built page at 390 / 700 /
1024 / 1440; heights read off all four figure-dense case studies.

## What it left for the owner

Nothing new. The kitchen, QIS and playground folders; `ISSUE-031` through `ISSUE-035` and
`ISSUE-006`. **Nothing pushed — 44 commits ahead of `main` before this one, and the live site
still shows none of it.**
