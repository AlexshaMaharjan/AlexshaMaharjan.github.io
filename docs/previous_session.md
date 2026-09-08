# Previous Session

**SESSION-029** — 2026-09-08. Full record: `docs/sessions/session_029.md`.

## What it did

The owner asked for every image in the folders to be used, the old photos removed, placeholders
added where images had no slot, Surugami's two "by alexsha" placeholders dropped, and AFONO's
prints 1–3 placed together. All done.

**148 slots, 75 filled.** AFONO went 23 → **30 slots**. **25 orphaned originals and 22 variants
deleted — 1.4 MB off what ships.** Every figure on the four case studies with folders now comes
from the owner's own exports.

## The thing worth carrying forward

**I found a bug of my own, shipped two commits earlier, while screenshotting something else.**

`/work/afono` was rendering a **German list on the English page**, and the English list it
displaced was sitting in §03 Research — three sections above the collection it names. The German
§06 had lost its list entirely.

I put it there in SESSION-027, "by a rule rather than by hand": a regex swapping a `figures` block
with a `list` block that followed it. **The rule matched on shape and had no idea where it was** —
not the section, not the locale, not the case study. It reported two substitutions, exactly the
number expected, and I took that agreement as confirmation.

**Every check was green across both commits.** `tsc`, ESLint, axe, the image sweep, overflow,
reveals, and the en/de figure diff — which compares `src` only, because prose is *supposed* to
differ between locales. **Nothing in the harness reads words.**

`scripts/content-audit.mjs` now does, and `predeploy` runs it: wrong-language body blocks, and
`en`/`de` structural parity. Both proved by re-injecting each fault before confirming clean —
and the first version of the language check was **discarded because it failed to catch the very
fault it was written for**: it joined list items, so a German line hid among three English ones.

**A transformation matched only by shape will eventually match the wrong instance, and a
substitution count is not verification.** Written up as `ISSUE-036`.

## What else changed

- `InstaInspiration.png` is used, **cropped to the owner's own panel** — the left two thirds is
  other brands' Instagram feeds, which `DECISION-016` keeps out. The rule working as written.
- Prints 1, 2 and 3 are consecutive, each full-column. In one justified row they would have been
  140px tall.
- Five figures went with the old photos, and one loss is worth knowing: **Sync FM's three control
  close-ups had a paragraph each**, and no supplied file replaces them — the components board
  covers the same controls smaller. The crops are still in git if they should come back.
- `Afono/Wireframe.png` remains the only unplaced file: 14,299 × 8,794 and entirely white.

## Verified

Production build: routes 36/36; 200 images across 36 routes at dpr 1, 2 and 3, 0 broken, 0 missing
`alt`, 0 failed requests, counts identical at all densities; axe 0 violations; 0 overflow; reduced
motion static; `tsc` clean; lint 0 errors; `content-audit.mjs` clean and proved to fail on both
faults it exists for.

## What it left for the owner

The kitchen, QIS and playground folders; `ISSUE-031` through `ISSUE-035` and `ISSUE-006`.
**Nothing pushed — 46 commits ahead of `main` before this one.**
