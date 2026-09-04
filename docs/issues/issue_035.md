# ISSUE-035 — AFONO's supplied folder: three files not used, and why

Status: Open
Priority: Low
Category: Content / Provenance
Discovered: 2026-09-04 (SESSION-026)
Owner decision: yes for two of the three; the third is a broken file

## What

`Images/Afono/` arrived with 30 files. **Seventeen were used.** Three were excluded for
reasons the owner should know about, and ten were left aside as redundant (listed at the end).

## 1. `Wireframe.png` — the file is empty

14,299 × 8,794 pixels, 496 KB, and **entirely white**. `scripts/ink-box.mjs` reports
`no ink found` scanning the whole canvas.

Nothing was placed, because there is nothing in it. Presumably an export that captured an empty
frame or a hidden layer. AFONO has no wireframe slot today; if a real wireframe board exists,
re-export it and a slot goes in beside Sync FM's.

## 2. `InstaInspiration.png` — cropped out, not shipped

The left two thirds is a dense collage of **other brands' Instagram feeds** — streetwear
campaign imagery, product shots, fashion posts. The right third is the owner's own red-and-blue
grid system for laying out the AFONO feed.

`DECISION-016` covers this shape exactly:

> Where a page mixes the owner's diagram with borrowed imagery, **crop to the owner's part**.
> Competitor screenshots and market analyses stay out, even where a case study discusses them.

`ink-box` puts the owner's panel at `crop: [0.6196, 0.1694, 0.3673, 0.8124]` — 476 × 801px — so
cropping it is one line in `image_crops.json` if it is wanted. It was **not** placed this
session, because `[ social media ]` now shows `InstaPosts.png`: the finished posts are a better
figure than the grid that laid them out, and the previous occupant of that slot was the grid.

**`[ market analysis ]` therefore stays hatched.** It is the last empty slot in AFONO, and the
only thing supplied for it was other brands' content, which `DECISION-016` puts out of bounds.
A market-analysis figure would have to be the owner's own comparison — a chart or an annotated
table — not the material being compared.

## 3. `Moodboard.png` — shipped, and flagged

Photographs of Nepal, people, garments and packaging, composed by the owner into a board. Same
shape as WikiMind's moodboard: **the composition is theirs, roughly half the tiles are not.**

Shipped for consistency with `ISSUE-032`, which made the same call for WikiMind and left the
decision with the owner. If the answer there is "drop it", the answer here is the same.

## The AI question, which the folder may have answered

`docs/next_session.md` has carried an open owner decision since SESSION-016: *"May AFONO's
AI-generated product imagery be shown?"* Its sources page says the AI-generated mockups cover
**every product visual in the prototype**, and the case study discloses this in both locales.

The folder supplied `AI Fit 5.png` (an AI try-on preview), the product page, the shop page and
the tee mockups — all of which contain that imagery, and all of which are now placed. **This
session read supplying them as the answer.** That is an inference from a file drop rather than a
stated decision, so it is written here and is trivially reversible: the slots are named in
`image_crops.json`.

## Files left aside as redundant

Not excluded on principle — simply not needed once a better file covered the same slot.
`Button.png` (363 × 142, a single pair of wishlist buttons), `Components1.png`,
`COmponents2.png`, `Landing Page.png` (2845 × 12972 — at its true proportions a figure would
render 175px wide, which is unusable), `City Series Page.png`, `Register Page.png`,
`TshirtMockup2.png`, `Printsketch1.png`, `print1.png`, `print2.png`, `print3.png`.

Say the word and any of them gets a slot.

## Related

- `DECISION-016` and Amendment 1 — AFONO's sources page in full
- `ISSUE-032` — the same moodboard question on WikiMind
