# Next Session

## Status

`MILESTONE-001` is **complete** (SESSION-002). Navigation works, the repository is clean,
and the roadmap is approved and under way.

Two things need the owner before the next session can be fully planned — neither blocks
starting:

1. **The work sits on branch `milestone-001-stabilize`, not `master`.** Two commits,
   `65f2b2d` and `92b63f4`. Merge it, or say where it should go.
2. **`DECISION-010` — is the bento direction for the homepage being kept?** This is what
   pushes `MILESTONE-002` behind `MILESTONE-003`; answering it reopens the choice.

## Objective

Begin **`MILESTONE-003` — Case-study layout and content model.**

`MILESTONE-002` (homepage "Selected Work") ranks higher on the roadmap but is blocked on
`DECISION-010`, which only the owner can settle. `MILESTONE-003` has no blocker, is the
owner's own first-named complaint ("case study description pages layout should be
improved"), and unblocks `MILESTONE-004`.

Read `docs/milestones/milestone_003.md` and follow it.

**Its own note says to consider splitting it across two sessions — do.** Take the content
model first and the layout second; that keeps a green build at the end of each.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/milestones/milestone_003.md`
3. `docs/issues/issue_024.md` (the block union), `issue_008.md`
4. `docs/suggestions/suggestion_004.md` (model), `suggestion_003.md` (layout),
   `suggestion_002.md` (figure sources)
5. `docs/architecture/architecture_02.md` and `architecture_05.md` — content model and
   images
6. `docs/codebase/content_data.md` — where the six data files live

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/lib/caseStudies/types.ts` — where the block union goes
- `src/lib/caseStudies/*.ts` — the six data files, **both locales in each**
- `src/components/case-study/Section.tsx` — the single render path (`ISSUE-008`)
- `src/components/case-study/ContentsNav.tsx` — active-section tracking
- `CONTENT_GUIDE.md` §5 — its `body[n]` indices become invalid

## Relevant Issues

- `ISSUE-024` (High) — the section model cannot express sub-headings or lists
- `ISSUE-008` (Medium) — first section lacks number, label and reveal
- `ISSUE-007` (High) — figures have no source field

## Relevant Suggestions

`SUGGESTION-004`, `SUGGESTION-003`, `SUGGESTION-002`.

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the current branch
  before acting — a stale snapshot in these documents is exactly what tripped SESSION-002.
- **Do not break the two scroll hooks.** `useScrollReveals` and `useScrollBehavior` are
  coupled by effect ordering (`DECISION-008`, `DECISION-013`). Case-study sections carry
  `data-inview`, so if `Section.tsx` changes which elements do, re-run the ring check.
- **Any new `:param` route effect must not be mount-only** — route elements are still not
  keyed by param (`ARCH-01`). That is what caused `ISSUE-001`.
- German blocks must migrate alongside the English ones or the build breaks.
- `prefers-reduced-motion` must keep producing a fully static, fully visible site
  (`DECISION-008`).
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

SESSION-002 established that this project's defects hide from code reading. Verify in a
browser, not by inspection.

There is no browser automation in `package.json` and none is needed: headless Chrome can be
driven over the DevTools Protocol with Node's built-in `WebSocket`. SESSION-002's scripts
were scratch files and are gone, but the approach is a few dozen lines — launch
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --headless=new
--remote-debugging-port=…`, read `/json/list`, and drive `Page.navigate` /
`Runtime.evaluate`. Test against the **production build** (`npm run build && npx vite
preview`), not only the dev server: StrictMode's double-invoked effects hid a real bug in
SESSION-002 and can equally hide one from dev-only testing.

## Completion Criteria

Per `docs/milestones/milestone_003.md`:

- Sub-headings and lists render as sub-headings and lists in all six studies, both locales.
- Figures can carry real images; captions read as captions.
- A case study reads with visible rhythm and hierarchy at 375 / 768 / 1024 / 1440.
- `CONTENT_GUIDE.md` §5 matches the new structure.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update the milestone document and `docs/milestones/index.md`.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_003.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed.
