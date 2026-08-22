# MILESTONE-001 — Stabilize the current implementation

Status: **Complete** (SESSION-002, 2026-08-22)
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

- [x] Re-check `git status` — the snapshot in `ISSUE-017` is dated 2026-08-22
      → **stale**: the tree was clean, the work was already committed in `cc6e1c8`
- [x] Add `.next/` to `.gitignore` → already present as `/.next`; deleted `.next/`,
      `tsconfig.tsbuildinfo` and the empty, never-tracked `NewHomePage/`
- [x] Commit the existing work in coherent pieces → already done in `cc6e1c8`
- [x] **ISSUE-001** — `useScrollReveals` re-runs on pathname change; the `[data-inview]`
      at-rest state moved from CSS into a layout effect and now fails safe
- [x] **ISSUE-002** — hash scrolling in `RootLayout` via `useScrollBehavior`, honouring
      reduced motion, the header offset, and the Suspense boundary
- [x] **ISSUE-003** — scroll reset and back/forward restoration in the same hook, so the
      two cannot fight
- [x] **ISSUE-022** — verified: `/contact` and `/de/contact` land on the contact section
- [x] Manually walk the journeys — done in headless Chrome over CDP rather than by hand,
      so the results are numbers rather than impressions (see Outcome)
- [x] `npm run lint && npm run build` green — 0 errors, the same 3 pre-existing warnings

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

## Outcome

Two commits on `milestone-001-stabilize`: `65f2b2d` (navigation) and `92b63f4` (reveals).
Both new hooks live in `src/lib/`; `RootLayout` gained one call; `index.css` lost the
`[data-inview]` rules.

Everything was verified in headless Chrome driven over the DevTools Protocol, against the
**production build**, at 1440px and 390px, in both locales, with and without
`prefers-reduced-motion`.

| Journey | Before | After |
| --- | --- | --- |
| Six `Next project` hops around the ring | 1–2 whole sections permanently invisible per hop; arrived 8000–9500px down | every hop arrives at `scrollY 0`, 0 sections invisible after a full scroll |
| `/about` → header "Projects" | stayed at 1200px, `#work` 1320px away | `#work` at 104px |
| Homepage → header "Contact" | nothing happened | `#contact` at 104px |
| `/work/qis-portal` (6000px) → `/playground` | landed at 4466px | `scrollY 0` |
| `/about` (1500px) → `/resume` → back | never moved | `/resume` at 0; back restores 1500px |
| Cold load `/#work`, `/#contact`, `/de/#about` | no scroll at all | target at 104px |
| `/contact` | top of the homepage | `#contact` at 104px |
| `prefers-reduced-motion` | — | nothing ever hidden; every landing still correct |

Three things the issue documents had wrong or did not anticipate, all found by testing
rather than reading:

1. `ISSUE-001`'s reach was different from the prediction — reused DOM nodes kept the
   outgoing page's revealed state, so the damage was 1–2 orphaned sections per hop rather
   than a blank page, and it accumulated as you walked the ring.
2. `ISSUE-002` claimed same-page hash clicks still worked natively. They did not: the
   header uses `<Link>`, so a same-page click is a `pushState`.
3. `scrollTo`'s `"auto"` means *defer to the CSS*, not "instant". With
   `html { scroll-behavior: smooth }` in `index.css` this silently broke the fix for
   `ISSUE-001` as well, by leaving the scroll in flight while GSAP measured the page.

`ISSUE-015` was measured while verifying `ISSUE-002` and is now confirmed with numbers
(146px mobile header vs a 104px offset — 42px of overlap). It was deliberately **not**
fixed here: this milestone excluded the design system. It stays with `MILESTONE-007`.

`DECISION-013` records why react-router's `<ScrollRestoration />` was rejected.
