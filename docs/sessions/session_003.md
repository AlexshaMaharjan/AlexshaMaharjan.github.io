# SESSION-003 — Case-study content model

Date: 2026-08-23
Milestone: `MILESTONE-003` — Case-study layout and content model (part one of two)
Objective: Replace `body: string[]` with a block model, migrate all six case studies in
both locales, and regenerate `CONTENT_GUIDE.md` §5. Layout deliberately left for the next
session.
Outcome: **Complete for the content model.** `ISSUE-024` and `ISSUE-008` resolved,
`ISSUE-007` half resolved. Committed as `e844ad9` (code) plus a
documentation commit, on branch `milestone-003-content-model`.

## Starting state — one document was stale

`docs/next_session.md` said the `MILESTONE-001` work sat unmerged on
`milestone-001-stabilize` and asked the owner where it should go. It is already on
`main`: `65f2b2d` and `92b63f4` are in `main`'s history, along with three later commits
the docs had never seen (`f8df707`, `7332ad8`, `11930a6` — GitHub Pages deployment, then
`413130b` removing a phone number from the résumé). `master` and
`milestone-001-stabilize` both still exist and are behind. Checked before acting, as the
constraints require.

The second open question, `DECISION-010`, remains unanswered and remains the blocker on
`MILESTONE-002`.

## What Changed

Case-study sections can now express their own structure.

| Before | After |
| --- | --- |
| `body: string[]`, every entry an 18px paragraph | `body: Block[]` — paragraph, `h3`, `list`, `quote`, `note`, `figure` |
| 38 sub-headings rendered as body text | rendered at 21px/600 with their own spacing |
| 22 lists written as consecutive one-line paragraphs | real `<ul>`/`<ol>` with accent markers |
| 8 disclosures and stats lines indistinguishable from prose | bordered `note` boxes |
| 71 figure slots that could never hold an image | optional `src`/`alt`; a real `<img>` and a caption when set |
| first section rendered without number, nav label or reveal | one render path; `first` varies only the top margin |
| `CONTENT_GUIDE.md` §5: WikiMind in full, the other five summarised | all six generated from the data, block by block |

No wording changed anywhere. This was re-cutting existing strings into structure; the
copy pass is `MILESTONE-004`.

## Files Changed

| File | Change |
| --- | --- |
| `src/lib/caseStudies/types.ts` | `Block` union; `SectionImage` takes optional `src`/`alt` |
| `src/components/case-study/Section.tsx` | `BodyBlock` switch on kind; one render path for every section |
| `src/components/case-study/Figure.tsx` | new — real image + caption, or the hatched placeholder |
| `src/components/case-study/CaseStudyPage.tsx` | maps all sections through `Section`; the compensating wrapper `id` is gone |
| `src/lib/caseStudies/{wikimind,afono,sync-fm,barrier-free-kitchen,surugami,qis-portal}.ts` | migrated, both locales |
| `scripts/content-guide-case-studies.mjs` | new — generates `CONTENT_GUIDE.md` §5 |
| `CONTENT_GUIDE.md` | §5 regenerated (648–1495); §10.4 and the summary corrected |

## Decisions Made

- **`DECISION-014`** — the block model, the `note` kind beyond what `SUGGESTION-004`
  proposed, the knowing departure from `SPEC` §9 that `DECISION-009` asked to have
  recorded, and the rule that a caption appears only where a real image exists.

## Validation

- `npm run lint` — 0 errors, the same 3 pre-existing warnings (a fourth, from exporting a
  helper beside a component in `Figure.tsx`, was removed rather than accepted).
- `npm run build` — green, ~0.8s.
- Headless Chrome over the DevTools Protocol against the **production build**:
  - Both locales × all six studies: block counts match between `en` and `de` exactly,
    no duplicate element ids, every section carries its eyebrow and `data-inview`.
  - Computed styles: sub-headings 21px/600 against 18px/400 body; `list-style: disc` with
    the accent marker colour; the one numbered list `decimal`.
  - 375 / 768 / 1024 / 1440: no horizontal overflow inside the article at any width.
  - The full prev/next ring, all six studies, scrolled end to end at each stop: no section
    left hidden, every hop landing at `scrollY` 0 — the `ISSUE-001` check re-run because
    the first section joined the reveal set.
  - Cold hash loads of `#overview`, `#research`, `#reflection`: all land at exactly 104px,
    with and without `prefers-reduced-motion`. `#overview` previously anchored to the
    outer wrapper and landed 76px higher.
  - Under reduced motion, no `[data-inview]` element is hidden.
  - The `Figure` `src` branch was verified by wiring a real file into WikiMind's
    `direction` section temporarily: the image loaded (5000×3750), the caption read
    "moodboard" with the brackets stripped, the other four slots stayed placeholders. The
    edit was reverted — every unused file in `public/images/` is a solid-colour stand-in,
    and shipping one as a case-study figure would look worse than the placeholder.

A measurement worth recording: an early hash-landing reading of 88px looked like a 16px
regression and was not one. The reveal tween was still in flight at 1800ms after
navigation; measured at 2500ms, and again 1.2s later, it is 104px and stable. Reveal
animation moves an element under a landing that has already been aimed — time the
measurement accordingly.

## Remaining Concerns

- **The layout itself is untouched.** Sections have hierarchy now; the page around them is
  the same 240px rail plus 960px column. That is the other half of `MILESTONE-003`.
- **Between 768px and 1024px the reading column is ~313–569px wide.** The grid reserves
  240px for the contents rail at `md`, but the rail's `nav` is hidden below `md` in a way
  that leaves the column squeezed. Pre-existing, unrelated to this change, and worth
  fixing in the layout half.
- **Nothing enforces that `en` and `de` stay structurally identical.** They are today,
  block for block. The types catch a missing field, not a mismatched structure.
- **`quote` and `figure` blocks are implemented and unused.** They are in the union
  because `SUGGESTION-004` specified them; if the layout session finds no use for
  `quote`, deleting it is cheap.
- `ISSUE-007` is half done: 44 Playground and About slots still have no source field, and
  that half needs `DECISION-006` answered first.
- `MILESTONE-004` (copy pass) is now unblocked, but doing it before the layout means
  restructuring text against a layout that is about to change.
