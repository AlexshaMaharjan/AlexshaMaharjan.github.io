# SESSION-027 — One height for every figure, and each figure beside its paragraph

Date: 2026-09-04
Branch: `milestone-003-content-model`
Asked for: *"the sizes of the images are bugging me, i want consistency and also reorder where
each images should go, after which paragraph"* — plus the docs.

## The complaint was right, and it was not about widths

The first instinct was that lone figures rendered at too many bespoke widths. **Measuring said
otherwise.** A script walked every case study, reproduced `SectionMedia`'s grouping and reported
what actually renders:

```
distinct rendered widths today: 5
307, 470, 502, 532, 960
2 figures at 2 different bespoke widths
```

Five widths, and only two of them one-offs. Widths were not the problem.

**Heights were.** Figures are laid out by width, so a row gives each an equal share of the column
and their heights come out at whatever their aspects make them. AFONO's collection row held a
0.375 cart drawer, a 0.545 product page and a 4/3 checkout — **819px, 563px and 230px tall**,
three captions at three levels, no two bottoms within 300px of each other.

Worth recording as method: the fix that was asked for and the fix that was needed were different,
and one script separated them in a minute. Nine bespoke widths would have been the wrong thing to
tidy.

## `DECISION-019` — height is the governing dimension

Two rules could not move: **a figure's declared aspect must equal its file's true aspect**
(`ui/Media` paints with `object-cover`, so a mismatch is a silent crop), and the column is 960px.
So if heights are to match, **widths must absorb the difference.**

- `MAX_FIGURE_HEIGHT` is **640px**. Everything renders that tall unless the column binds first.
- A row is **justified**: one height, widths proportional to each figure's ratio, centred at
  exactly the width that height implies.
- Rows hold at most three; a run of four splits two-and-two.

Almost all of it is CSS. Each figure gets `flex-grow: <its ratio>` against `flex-basis: 0`, so
widths come out proportional to ratios — and because each figure's box is
`aspect-ratio: <ratio>`, width ∝ ratio means **every height in the row is identical.** The
browser justifies the row. JS computes only what CSS cannot know: the row height, so the row can
be capped and centred, and each figure's `sizes`.

**Wide figures did not change at all.** Anything 1.5 or wider fits its full 960px inside 640px of
height, so it still takes the whole column — the rule turned out to be uniform rather than
special-cased, which is the sign it is the right rule.

`SUGGESTION-017` is **superseded**. Its ceiling was the right instinct on the wrong axis: it
capped a lone figure's width, produced a bespoke width per aspect, and did nothing for rows.

Measured after, on the built pages:

| Page | figure heights before | after |
| --- | --- | --- |
| `/work/afono` | 230–819, ragged within rows | capped at 640, **identical within every row** |
| `/work/wikimind` | up to 960 | capped at 640 |

## Reordering — AFONO was the only one left

WikiMind, Surugami and Sync FM already place their figures in the prose with `{ kind: "figures" }`.
AFONO still dumped all 22 at the end of each section. All of them moved:

- **§03** — the interview figure after the interview paragraph; the market-analysis hatch and the
  moodboard after the market-analysis paragraph.
- **§05** — sketches, wordmark studies and lockups after *"The logo was developed from the letters
  A and F…"*; the colour lockups, palette and typography after *"The colour system uses red,
  blue, black and white…"*.
- **§06** — prints and tees after the four-collection list; the shop figures after *"The prototype
  includes homepage, shop and collection pages…"*.
- **§08** — the three outcome figures after the closing paragraph.

**One placement was wrong and was caught by looking.** The collection figures landed *between* the
intro paragraph and the list naming Himal / City / Mythic / Logo Essentials — so the figures
arrived before the words that name them. Swapped, by a rule rather than by hand: a `figures` block
immediately followed by a `list` block gets the two exchanged.

## A second thing measuring caught

At the old `sm` breakpoint (640px) a three-figure row put the narrowest figure at **140px**. The
row now turns horizontal at **768px** instead, so between 640 and 768 figures stack at 660px
rather than shrinking to a thumbnail of a thumbnail. Verified at 390 / 700 / 1024 / 1440.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- 196 images across 36 routes at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests,
  per-route counts identical at all three densities
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `image-manifest.mjs` exits 0; AFONO still reports 23 slots with 1 empty after every figure moved
- Figure widths read off the built page at four viewports; heights read off all four case studies

## Still open

- The kitchen (10 slots), QIS Portal (11) and the playground (39)
- `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 44 commits ahead of `main` before this one.
