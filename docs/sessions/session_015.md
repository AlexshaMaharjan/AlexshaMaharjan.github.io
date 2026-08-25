# SESSION-015 — The images were never missing

Date: 2026-08-25
Milestone: MILESTONE-005 / MILESTONE-002 (planning)
Status: Complete — documentation only, no code behaviour changed

---

## Objective

The owner asked how to design the bento images and what to make them from, then pointed at
their project documentations and asked for a plan to extract images from them into the slots
that fit.

## What was found

**`MILESTONE-005` has been mis-recorded since it was written.** Its status line said
"blocked on owner-supplied assets — the largest external dependency in the roadmap", and
`current_state.md` repeated it. The assets exist. They have existed the whole time, in
`../../ProjectsDokus/` next to the repository: six university project documentations, 330
pages, 673 MB, containing the personas, sitemaps, wireframes, logo sheets and final screens
the manifest's slots are asking for — because these are the documents the six case studies
were written from.

The mapping, established by reading each document rather than guessing from filenames:

| Document | Pages | Project |
| --- | --- | --- |
| `DesPr1_Alexsha_Maharjan_Doku.pdf` | 24 | `wikimind` — confirmed by 21 in-text mentions |
| `DesignProjekt_Dokumentation_Maharjan.pdf` | 52 | `afono` |
| `Enddokumentation.pdf` | 43 | `sync-fm` |
| `FInalDesmeth.pdf` | 100 | `surugami` — confirmed by rendering pages |
| `Dokumentation_Kueche_…` | 26 | `barrier-free-kitchen` |
| `Usability_SoSe24_…` | 85 | `qis-portal` |

Two filenames resisted identification. `DesPr1` yielded to a full-text search (21 hits for
"WikiMind", 9 for "Maskottchen"). `FInalDesmeth.pdf` has **no text layer at all** — 100 pages
of flat images at 407 MB — so it was identified by rendering pages and looking at them: an
origami community project in coral, mint and teal, exactly matching Surugami's stated palette.

**A seventh project surfaced.** `HIBI.pdf` and `C3 Zusammenfassung Projektarbeit.pdf`
document Hibi, a mindfulness web application built with four collaborators. It has two full
documentations and no page on the site. Recorded as an owner decision rather than filled in
quietly.

## The provenance problem

`FInalDesmeth.pdf`'s sources page credits Freepik photographs by URL and states that
*"P4, P5, P6, P7, P8: All references were taken from Pinterest"*. Five pages of that
documentation are other people's images.

An academic submission may quote references inside itself. A portfolio that shows the same
image next to "I designed this" is making a different claim. `DECISION-016` records the rule
— **only work the owner made ships** — and the reasoning, which is `DECISION-011`'s copy
honesty constraint applied to images, where the claim is made more forcefully than any
sentence makes it.

This is why `scripts/pdf-page.js` renders whole pages instead of bulk-extracting embedded
images. A bulk extractor is faster and would pull the borrowed images out along with the
owner's, losing the only distinction that matters — and it would put them in
`public/images/`, which ships. SESSION-014 caught exactly that mistake with an internal
manifest being served publicly.

## What was written

- **`docs/reference/image_sources.md`** — the plan. Document-to-project mapping, the render
  command, what may not be taken, the order to work in, and the bento treatment.
- **`docs/decisions/decision_016.md`** — image provenance.
- **`scripts/pdf-page.js`** — renders PDF pages to PNG through macOS PDFKit via the ObjC
  bridge. No install, no dependency; `axe-core` stays the only entry in `devDependencies`.
  Verified against the 407 MB text-less document, which defeats text-based tooling entirely.
- `MILESTONE-005` rewritten: no longer blocked on assets, blocked on the owner's time and
  judgement. `MILESTONE-002` given its tile sources. Both indexes, `current_state.md` and the
  decisions index updated to stop repeating the wrong blocker.

## The bento measurement this builds on

SESSION-014's contrast measurement is carried into `image_sources.md` because it constrains
what the eleven tile images can be: the label and title sit **on** the image in white, and
the scrim is transparent at the top where the 12px label is. Anything brighter than about
`#B4` behind the title fails WCAG 1.4.3. Most of this documentation is light-background
interface design, so the risk is real, and the treatment — darken to the ceiling, desaturate,
tint with the project's own colour — is what lets eleven tiles from six palettes read as one
wall.

---

## Verification

Documentation and one new script; no application code touched, so the battery was not re-run.
`scripts/pdf-page.js` was exercised against two documents, including the 407 MB one, at two
scales, and its usage output checked. The renderer's one operational trap is recorded in both
the script header and the plan: **position in the file is not the printed page number** —
`FInalDesmeth.pdf` puts its Sources page at position 1, and position 60 carries the printed
number 58.

## What this did not do

No images were extracted, cropped or committed. Nothing was pushed or deployed. The plan is
written; executing it needs the owner to choose which figures represent their work.
