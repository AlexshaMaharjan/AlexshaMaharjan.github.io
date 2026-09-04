# SESSION-025 — Closing MILESTONE-002, and the German the harness could not see

Date: 2026-09-04
Branch: `milestone-003-content-model`
Asked for: the images are not ready; continue with other work. Read the docs and proceed.

## What was available to do

`next_session.md` said to check `Images/` first and, if no folders had arrived, **not to invent
work**. None had. So this session took the non-image queue instead, and it turned out to hold
one real user-facing defect and a milestone that was closer to finished than its own file said.

## `ISSUE-009` — the German half nobody had measured

The issue listed four fields and mentioned the structural `aria-label`s as an afterthought.
**The afterthought was the larger problem.**

Six landmark names were hard-coded English, and unlike the decorative labels they **are
announced**. A German visitor jumping between regions heard "Primary", "Footer", "Menu",
"Category navigation", "Project navigation" and "My design process" wrapped around German
content. They now come from a `landmarks` group in the dictionary — Hauptnavigation, Fußzeile,
Menü, Kategorie-Navigation, Projekt-Navigation, Mein Designprozess — read off the built German
pages to confirm.

**axe cannot see this.** It checks that a landmark *has* an accessible name, never that the name
is in the page's language. Nothing in the harness would ever have reported it, and nothing was
broken enough to notice by looking.

The four listed fields are fixed too: both hand-written About annotations, the dead
`switchToGerman` label, and AFONO's `heroDisclosure`, which existed only in English so the German
page silently dropped a disclosure the English one makes.

**The one question this issue asked has already been answered elsewhere.** It wanted a decision
on whether the process collage's decorative labels should be translated. They are inside an
`aria-hidden="true"` subtree with `dictionary.process.srSummary` as the canvas's text
alternative — `ISSUE-030`'s fix, which landed after this issue was written. No screen reader
reads them in either language. The issue was stale rather than open.

The German wording is mine, not the owner's. Translations of copy they already approved in
English, not new prose, which is why it was not held under `MILESTONE-004` — but
"immer am Gestalten!" is a hand-written annotation with more than one idiomatic reading and is
worth a glance.

## `MILESTONE-002` — complete, and two tasks superseded rather than done

The milestone's task list predates `DECISION-010`. Auditing it against that decision, two tasks
should never be ticked:

- **"one entry per project"** — `DECISION-010` deliberately kept the eleven-tile wall: *"five of
  six projects appear twice under different category labels. With images that reads as a
  portfolio of work rather than a duplicate list, so it stays."*
- **"restore visible headline / description / tags / role / year"** — the same decision specifies
  a category label and a title over the image and nothing else. Adding four more fields to eleven
  tiles would undo the composition the owner approved.

Marked superseded with the quote, not quietly ticked and not silently dropped.

**The `!important` came out.** The override existed because the grid was inline `style` on the
component, and no stylesheet rule outranks a `style` attribute. The container styles moved to
`index.css`; the per-tile placement, which is data, now arrives as a custom property that a
stylesheet rule consumes — **a variable set inline can be used by a rule, and that rule can be
overridden by a later one.** That is the whole trick, and it is why the phone layout now wins on
ordinary cascade order.

Verified at 375 / 768 / **880 / 881** / 1024 / 1440. The boundary is the part worth checking, and
it behaves exactly as before: one column capped at 520px below, ten columns capped at 1120px
above, eleven tiles, no horizontal overflow anywhere.

## `ISSUE-010` — the premise had expired

This issue said **do not delete yet**, because most of the dead `ProjectCopy` fields "become live
again the moment `ISSUE-004` is resolved with an image-led work section". `DECISION-010` resolved
it the other way: category label, title, nothing else. They are not coming back.

Confirmed by tracing readers rather than grepping names — `ProjectCopy` reaches exactly one
component, `NextProjectNav`, which uses five of its nine fields.

Removed: `ProjectCopy.projectTag` / `.placeholderLabel` / `.imageAspect` / `.featured`,
`selectedWork.viewCaseStudy` / `.projectLabel`, four already-empty `PlaygroundHomeContent`
fields, `PlaygroundProjectContent.eyebrow`, and `CaseStudyContent.projectTag` (12 lines across
six case studies). **The bundle dropped 1.4 KB.**

**Kept on purpose: `headline`, `description`, `role`, `year`.** Nothing renders them and they
stay anyway — 48 authored strings across two locales, and exactly what a `/work` index would need
(`SUGGESTION-014`). Deleting the owner's copy to tidy a type is the wrong trade. The type now
says so, so nobody re-derives it.

One field on the issue's list was **live**: `PlaygroundHomeContent.eyebrow`, rendered by
`PlaygroundIndex`. Only the project-level `eyebrow` was dead. Checking each one individually was
worth the minutes.

## Doc accuracy

The issues index claimed **"30 issues, 27 resolved, 10 open"** and described `ISSUE-027` as open
when it was resolved in SESSION-005. Four issues had also been appended into a table headed
"resolved by the owner". Rebuilt: 34 issues, 28 resolved, **6 open — and five of the six need the
owner rather than work.**

Three suggestions were still marked `Proposed` while largely built:

- **`SUGGESTION-013`** (prerender / SEO) → mostly implemented, 5 of 6; only the `og:image` remains.
- **`SUGGESTION-015`** (validation harness) → partially, 2 of 4. The harness exists and exceeds
  what was asked; CI and a Lighthouse budget do not, and both assume a repository that is pushed.
- **`SUGGESTION-016`** (deployment) → mostly. Worth recording that this file recommended Netlify
  and **the owner chose GitHub Pages and configured it themselves.** The reasoning was not wrong,
  it was outvoted by the person who has to run it.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- 170 images across 36 routes at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests,
  counts identical at all three densities
- axe 0 violations, 0 overflow, 0 stuck reveals; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `image-manifest.mjs` exits 0; `image-variants.mjs --check` reports the map up to date
- German fixes read off the built pages: `/de/about` shows both annotations in German,
  `/de/work/afono` shows the disclosure, `/de` announces Hauptnavigation / Mein Designprozess /
  Fußzeile
- The bento measured at six widths including both sides of the 880px boundary

## Still open

- **The image folders** — the kitchen (10 slots), QIS Portal (11), the playground (39)
- Five owner decisions: `ISSUE-006`, `ISSUE-031`, `ISSUE-032`, `ISSUE-033`, `ISSUE-034`
- CI and a Lighthouse budget (`SUGGESTION-015`), both waiting on the repository being pushed
- Nothing pushed. 42 commits ahead of `main` before this one.
