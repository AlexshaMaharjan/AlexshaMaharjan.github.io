# MILESTONE-001 — Stabilize the current implementation

Status: Proposed (recommended first)
Priority: Critical
Goal: Fix the navigation defects that make parts of the site unusable, and put the
uncommitted work on a safe footing — before any redesign begins.

## Why This Milestone Exists

Three navigation bugs currently break real journeys: clicking "Next project" on a case
study leaves the new page's content invisible; every `#work` / `#about` / `#contact` link
from another page lands at the top of the homepage; and new pages open at whatever scroll
position the previous one had. None of the redesign work is worth doing on top of that,
and the fixes are small and low-risk.

At the same time, roughly a session's worth of work exists only in the working tree with
no commit to fall back to.

## Scope

Navigation correctness, repository hygiene. **No visual redesign, no content edits.**

## Tasks

- [ ] Re-check `git status` — the snapshot in `ISSUE-017` is dated 2026-08-22
- [ ] Add `.next/` to `.gitignore`; delete `.next/`, `tsconfig.tsbuildinfo`, empty `NewHomePage/`
- [ ] Commit the existing work in coherent pieces (GSAP reveals / bento experiment / the two guides)
- [ ] **ISSUE-001** — make `useScrollReveals` re-run on pathname change; make the
      `[data-inview]` at-rest state fail safe
- [ ] **ISSUE-002** — implement hash scrolling in `RootLayout`, honouring reduced motion
      and the header offset, and tolerating the Suspense boundary
- [ ] **ISSUE-003** — add scroll reset / restoration, cooperating with the hash handling
- [ ] **ISSUE-022** — verify `/contact` and `/de/contact` now land on the contact section
- [ ] Manually walk: `/work/wikimind → next project → next project`;
      `/about → header "Projects"`; `/work/qis-portal → /playground`; all at desktop and
      mobile widths, with and without `prefers-reduced-motion`
- [ ] `npm run lint && npm run build` green

## Relevant Issues

`ISSUE-001` (Critical), `ISSUE-002`, `ISSUE-003`, `ISSUE-017`, `ISSUE-018`, `ISSUE-022`

## Relevant Suggestions

None — this milestone is repair only. The `ISSUE-001` fix should anticipate
`SUGGESTION-006` but must not wait for it.

## Relevant Decisions

`DECISION-001` (the migration that caused 002/003), `DECISION-008` (the reveal design that
caused 001)

## Relevant Code

- `src/lib/useScrollReveals.ts`, `src/index.css`
- `src/components/RootLayout.tsx`, `src/routes.tsx`, `src/main.tsx`
- `src/pages/Contact.tsx`
- `.gitignore`

## Dependencies

None. This is the entry point.

## Completion Criteria

- Navigating between two case studies shows fully visible, animated content.
- Every hash link scrolls to its target from any starting route.
- Every route change starts at the top; browser back restores position.
- Build and lint green; work committed; no Next.js artefacts remain.

## Out of Scope

The bento grid, imagery, copy, the motion system, design tokens.

## Notes

`ISSUE-001` was found by code reading, not in a browser. **Reproduce it first** — confirm
the sections really are invisible — so the fix can be verified rather than assumed.
