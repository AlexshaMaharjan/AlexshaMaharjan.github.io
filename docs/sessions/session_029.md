# SESSION-029 — Every supplied image placed, and a bug of my own found

Date: 2026-09-08
Branch: `milestone-003-content-model`
Asked for: use every image in the folders; remove the old photos; add placeholders where images
have no slot; drop Surugami's two "by alexsha" placeholders; put AFONO's prints 1, 2 and 3
together.

## The bug found on the way

Screenshotting AFONO to check the new figures showed a **German list on the English page**. It
had shipped in two commits, and I put it there — `37f6b3a`, SESSION-027, where I moved a figure
group that had landed before the list naming the four collections and fixed it "by a rule rather
than by hand".

The rule matched a `figures` block immediately followed by a `list` block, **anywhere in the
file**. It knew the shape and not the position: not the section, not the locale, not the case
study. It reported two substitutions — exactly the number expected — and that agreement was taken
as confirmation. The English list ended up in **§03 Research**, three sections above the
collection it names; the German one ended up in the **English** §06; the German §06 lost its list
entirely.

**Every check was green throughout.** `tsc`, ESLint, axe, the 196-image sweep, overflow, reveals,
and `image-manifest.mjs`'s en/de diff — which compares figure `src` only, because prose is
*supposed* to differ between locales. Nothing in the harness reads words.

`scripts/content-audit.mjs` now does, and `predeploy` runs it: wrong-language body blocks
(function words only, and **list items tested individually** — the first version joined them and
passed a German line hidden among three English ones, so it was discarded), plus `en`/`de`
structural parity, which catches a list that exists in one locale and not the other. Both proved
by re-injecting each fault, confirming exit 1, then confirming clean. Written up as `ISSUE-036`.

The lesson: **a transformation matched only by shape will eventually match the wrong instance, and
a substitution count is not verification.** Two were expected and two were reported; the number
agreed while the positions did not.

## Every supplied image is now placed

| Folder | Files | Used |
| --- | --- | --- |
| `wikimind` | 16 | 16 (`InitialSketches.jpg` is the original of the `.png` the pipeline converted) |
| `Surugami` | 9 | 9 |
| `SyncFM` | 8 | 8 |
| `Afono` | 30 | **29** — `Wireframe.png` is 14,299 × 8,794 and entirely white |

**148 slots, 75 filled.** AFONO went 23 → **30 slots**, taking twelve images that had no slot:
print sketches, the HIMAL / mask / wordmark prints, the dark tee mockups, the landing, City
Series and register pages, two more component sheets, the wishlist buttons, and the social grid.

`InstaInspiration.png` is now used, **cropped to the owner's own panel** at
`[0.6196, 0.1694, 0.3673, 0.8124]` — the left two thirds is other brands' Instagram feeds, which
`DECISION-016` keeps out. That is the rule working as written: crop to the owner's part rather
than drop the file.

Prints 1, 2 and 3 sit **together and consecutive**, each taking the full column. Side by side in
one justified row they would have been 140px tall; three full-width rows is what "together" can
mean at this column width and still be legible.

## The old photos are gone

Every figure on the four case studies with folders now comes from the owner's own exports. The
PDF-derived ones were unwired and **deleted**, along with fifteen long-orphaned PNGs that had been
shipping unreferenced since before SESSION-016:

- AFONO — interview findings, tee front, tee back, checkout, final brand system
- Sync FM — sync dial, mood bar, opinion filter
- WikiMind — prototype, interface detail

**25 originals and 22 variants removed, 1.4 MB off what ships.** Nothing referenced them: checked
across every `src`, `scripts`, `public` and `index.html` file before deleting, not just the case
studies.

Five figures are gone with them, and it is worth being explicit: Sync FM's three control
close-ups had a paragraph each, and no supplied file replaces them — the components board covers
the same controls at a smaller size. If those should come back, the crops are still in git.

Surugami's `[ illustration — by alexsha ]` and `[ poster — by alexsha ]` placeholders are
removed as asked. `[ market analysis ]` remains AFONO's one empty slot, for the reason
`DECISION-016` gives.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests, per-route counts
  identical at all three densities
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `content-audit.mjs` clean, and proved to fail on both faults it exists for
- `image-manifest.mjs` exits 0 on en/de parity

## Weight — `ISSUE-033` raised to High

Twenty-nine figures on one page has a cost: `/work/afono` is now **910 KB at 1440/1x and 2141 KB
at 390/3x**, up from 1544 KB. Deleting 1.4 MB of orphans took weight off what *ships* but nothing
off what a page *loads* — none of it was referenced.

**2.1 MB is past the point where this is only a number in a table.** The cause is structural and
unchanged: below 640px every figure is full width, so a 3x phone fetches 29 images at the 1280
rung. What changed is that lowering the variant ladder's fixed 0.82 quality — site-wide, and the
one lever that costs nothing but a judgement about image quality — is now clearly worth an
experiment rather than a note. Raised to High and left with the owner, because it trades quality
across every page.

## Still open

- The kitchen (10 slots), QIS Portal (11) and the playground (39)
- `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 46 commits ahead of `main` before this one.
