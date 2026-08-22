# Next Session

## Status

**Awaiting owner review and approval of the proposed roadmap.**

Do **not** begin implementing `MILESTONE-001` or any other milestone until the owner has
reviewed the roadmap and said to proceed. SESSION-001 was initialization only; no
application code has been changed.

## Objective

There are two possible next sessions. Pick based on what the owner says.

### A — Owner has not yet reviewed (default)

Nothing to implement. If asked questions about the project, answer from the documents
below. If the owner wants changes to the roadmap, edit the milestone documents and their
index, then rewrite this file for the approved plan.

### B — Owner has approved the roadmap

Begin `MILESTONE-001 — Stabilize the current implementation`.
Read `docs/milestones/milestone_001.md` and follow it.

## Recommended First Milestone

**MILESTONE-001 — Stabilize the current implementation.**
Small, purely repair, unblocks everything else, and fixes a Critical bug where case-study
content is invisible after clicking "Next project". It also commits a session's worth of
work that currently exists only in the working tree.

Read: `docs/milestones/milestone_001.md`

## Required Context

Read **only** these before doing anything:

1. `docs/current_state.md` — where the project stands
2. `docs/milestones/index.md` — the proposed roadmap and what is blocked on the owner
3. `docs/issues/index.md` — the 25 open issues, ranked

If starting MILESTONE-001, additionally:

4. `docs/milestones/milestone_001.md`
5. `docs/issues/issue_001.md`, `issue_002.md`, `issue_003.md`, `issue_017.md`
6. `docs/architecture/architecture_01.md` (routing and shell)
7. `docs/architecture/architecture_04.md` (motion — explains why the reveal hook is
   per-page)

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

For MILESTONE-001 only:

- `src/lib/useScrollReveals.ts` — the `[]`-deps effect at the heart of ISSUE-001
- `src/index.css` — the `[data-inview] { opacity: 0 }` rule that makes it fatal
- `src/components/RootLayout.tsx` — where hash scrolling and scroll restoration belong
- `src/routes.tsx`, `src/main.tsx` — route registration; no keys on elements today
- `src/pages/Contact.tsx` — the `/contact` redirect that depends on ISSUE-002
- `.gitignore` — `.next/` is missing from it

## Relevant Issues

- ISSUE-001 (Critical) → `docs/issues/issue_001.md`
- ISSUE-002 → `docs/issues/issue_002.md`
- ISSUE-003 → `docs/issues/issue_003.md`
- ISSUE-017 → `docs/issues/issue_017.md`
- ISSUE-018 → `docs/issues/issue_018.md`
- ISSUE-022 → `docs/issues/issue_022.md`

## Relevant Suggestions

None for MILESTONE-001 — it is repair only. The ISSUE-001 fix should anticipate
`SUGGESTION-006` (a shared motion module) but must not wait for it.

## Constraints

- **The repository is the source of truth.** The `git status` snapshot in `ISSUE-017` is
  dated 2026-08-22 — re-check it before acting.
- **ISSUE-001 has not been observed in a browser**, only derived from code. Reproduce it
  first so the fix can be verified.
- `prefers-reduced-motion` must keep producing a fully static, fully visible site
  (`DECISION-008`, `docs/reference/design_tokens.md`).
- `design-reference/` is gitignored and may not exist. Fall back to
  `docs/reference/design_tokens.md` and say so if it is missing.
- Do not touch copy, imagery, layout or the design system during MILESTONE-001.

## Tasks

If the owner has **not** approved: none. Report state, answer questions, adjust the
roadmap if asked.

If the owner **has** approved, follow the task list in
`docs/milestones/milestone_001.md`.

## Completion Criteria

Per `docs/milestones/milestone_001.md`:

- Navigating between two case studies shows fully visible, animated content.
- Every hash link scrolls to its target from any starting route.
- Every route change starts at the top; browser back restores position.
- `npm run lint && npm run build` green; work committed; Next.js artefacts gone.

## Required End-of-Session Updates

Before ending the session:

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update the milestone document and `docs/milestones/index.md`.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_002.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed.
