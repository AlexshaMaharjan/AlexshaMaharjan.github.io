# Next Session

## Status

`MILESTONE-003` is **half complete** (SESSION-003). The case-study content model is in
place and all six studies are migrated in both locales. The layout around that content is
unchanged and is the other half.

Two things want the owner, neither blocking:

1. **`DECISION-010` — is the bento direction for the homepage being kept?** Still the
   only thing blocking `MILESTONE-002`, and still unanswered since SESSION-002.
2. **`DECISION-006` — which placeholder slots stay stylised?** Now the blocker on the
   remaining 44 image slots (`ISSUE-007`), and on `MILESTONE-005` generally.

Work sits on branch `milestone-003-content-model`, branched from `main`. `main` already
carries everything through `413130b`, including the `MILESTONE-001` commits an earlier
document wrongly described as unmerged — **check `git` before trusting any status in
these files.**

## Objective

Finish **`MILESTONE-003` — the case-study layout** (`SUGGESTION-003`, points 1, 2, 3
and 5).

The content model was its blocker and is done: sections now carry sub-headings, lists,
notes and figures as distinct things, so there is real hierarchy to lay out. This is the
owner's first-named complaint and it is now unobstructed.

Read `docs/milestones/milestone_003.md` — its task list is split into the part that is
done and the part that is not.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/milestones/milestone_003.md` — part two of the task list
3. `docs/suggestions/suggestion_003.md` (the layout brief) — points 1, 2, 3 and 5 remain
4. `docs/decisions/decision_014.md` (the block model and the departure from `SPEC` §9),
   `decision_008.md` (the two coupled scroll hooks)
5. `docs/architecture/architecture_02.md` — the block union, as built
6. `docs/codebase/components.md` § Case study — the six components and their sizes

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/components/case-study/Section.tsx` — `BodyBlock` (per-kind treatment) and the
  single section render path
- `src/components/case-study/Figure.tsx` — the media component to build on; a `wide` or
  full-bleed mode belongs here
- `src/components/case-study/CaseStudyPage.tsx` — the rail + column grid, and where a
  full-bleed figure has to escape `max-w-[960px]`
- `src/components/case-study/ContentsNav.tsx` — active-section tracking and progress
- `src/lib/caseStudies/types.ts` — `Block`, `SectionImage`

## What To Do

- **Vary media width.** `Figure` supports one width today. Full-bleed and wide-two-up
  treatments need the figure to break the 960px column, which means deciding where that
  escape happens — inside `Figure`, or by moving `images[]` rendering outside the column.
- **Differentiate the three set pieces.** The design-question callout, the insights 2-up
  and the testing 3-up are near-identical bordered blocks today.
- **Mark the active section in `ContentsNav`** and show progress. The rail is present but
  passive.
- **Strengthen the ending** before the prev/next cards.
- **Fix the mid-width column.** At 768px the reading column is ~313px wide and at 1024px
  ~569px, because the grid reserves 240px for a rail that is not visible there.
- Consider whether `quote` earns its place in the union or should be deleted unused.

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the current branch
  before acting.
- **Do not rewrite prose** (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).
- **Both locales must stay structurally identical, block for block.** Nothing enforces
  this; the types catch a missing field, not a mismatched structure.
- **Do not break the two scroll hooks.** `useScrollReveals` and `useScrollBehavior` are
  coupled by effect ordering (`DECISION-008`, `DECISION-013`). Every case-study section
  now carries `data-inview`, including the first — if a change moves which elements do,
  re-run the ring check.
- **Any new `:param` route effect must not be mount-only** (`ARCH-01`, `ISSUE-001`).
- `prefers-reduced-motion` must keep producing a fully static, fully visible site
  (`DECISION-008`).
- If the layout diverges further from `design-reference/SPEC.md` §9, that is expected —
  extend `DECISION-014` rather than opening a new decision.
- If any case-study content or shape changes, rerun
  `node scripts/content-guide-case-studies.mjs --write`.

## Verification

Verify in a browser against the **production build**, not by inspection and not only in
dev — SESSION-002 found a bug that StrictMode's double-invoked effects hid.

There is no browser automation in `package.json` and none is needed: launch
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new
--remote-debugging-port=…`, read `/json/list`, and drive `Page.navigate` /
`Runtime.evaluate` over Node's built-in `WebSocket`. About 40 lines. Serve the build with
`npm run build && npx vite preview` and use `http://localhost:4173` (not `127.0.0.1`).

Two things SESSION-003 learned the slow way:

- **Give reveals time to settle before measuring position.** A landing measured at 1800ms
  after navigation read 16px off; at 2500ms it was exact. The tween moves the element
  under a landing that has already been aimed.
- **Screenshot as well as measure.** The block rendering was confirmed by numbers first,
  but only a screenshot showed whether the result actually reads better.

## Completion Criteria

- A case study reads with visible rhythm and hierarchy at 375 / 768 / 1024 / 1440 — media
  that varies in width, set pieces that look different from one another, an ending that
  lands.
- The contents rail shows where the reader is.
- Both locales verified; reduced motion still fully static and fully visible.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_003.md` and `docs/milestones/index.md` — closing the
   milestone if the layout half is genuinely done.
4. Record newly discovered issues / suggestions / decisions **only where genuinely
   needed**.
5. Create `docs/sessions/session_004.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed.
