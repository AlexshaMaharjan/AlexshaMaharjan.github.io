# Next Session

## Status

`MILESTONE-008`'s SEO half is done (SESSION-010): every route now carries its own title,
description, canonical, Open Graph tags and language in static HTML, verified by fetching
it with JavaScript switched off. `MILESTONE-007` is nearly closed, and no decision is
outstanding.

Work sits on branch `milestone-003-content-model`, **fifteen commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

### Nothing is deployed

Published only by `npm run deploy` — there is no CI. Eight sessions are visible locally
only (`npm run build && npx vite preview`, then `http://localhost:4173`). Note that
`predeploy` now runs the prerender, which needs Chrome on the machine that deploys.

### What wants the owner

1. **Images — 129 empty slots**, listed with sizes and data paths in
   `docs/reference/image_manifest.md`. Two of them now matter more than the rest: the
   eleven bento tiles, and **`og:image`** — every link preview currently shows a
   solid-colour placeholder, so a shared link looks broken in substance even though its
   title and description are right.
2. **The copy pass** (`MILESTONE-004`) — `DECISION-011` forbids inventing anything.
3. **A custom domain**, if one is wanted (`DECISION-012`).

## Objective

**`MILESTONE-006` — motion and interaction polish.** It is the owner's own fourth stated
priority ("interactive animations, scroll animations, gsap animation"), it is unblocked,
and it is the largest remaining piece that needs nobody.

Read `docs/milestones/milestone_006.md` and follow it. The three suggestions under it:

- **`SUGGESTION-006` — a shared motion system.** Duration, easing and distance live in
  `useScrollReveals` as two object literals today, and every other animation on the site
  hard-codes its own. One vocabulary, used everywhere.
- **`SUGGESTION-007` — page transitions.** Route changes cut hard, and
  `Suspense fallback={null}` shows a blank frame on first visit to a lazy page
  (`ISSUE-020`).
- **`SUGGESTION-008` — scroll-linked interaction** on case studies and media.

Start by reading what is already there rather than adding: the process canvas
(`ARCH-04`) is a substantial hand-written scroll animation, and the reveals are the
site's one shared effect. The work is to make the rest coherent with them, not to add a
second system beside them.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/milestones/milestone_006.md`
3. `docs/suggestions/suggestion_006.md`, `suggestion_007.md`, `suggestion_008.md`
4. `docs/architecture/architecture_04.md` — the process canvas, in detail
5. `docs/decisions/decision_008.md` — the reveal contract, amended twice; read the
   amendments before touching `useScrollReveals`
6. `docs/issues/issue_020.md` (blank frame on lazy routes), `issue_012.md` (the canvas rAF
   loop never idles), `issue_019.md` (GSAP is 46 KB gzip for a fade — this milestone is
   what justifies it or does not)

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/lib/useScrollReveals.ts` — `AT_REST` / `REVEALED`, the two literals a motion system
  would lift out; the `focusin` reveal added in SESSION-009
- `src/components/process/HeroProcess.tsx`, `BranchGroup.tsx` — the pinned canvas
- `src/components/RootLayout.tsx` — where a page transition would live, next to
  `useScrollBehavior`
- `src/routes.tsx` — `Suspense fallback={null}`, the blank frame in `ISSUE-020`
- `tailwind.config.ts`, `src/index.css` — where durations and easings would become tokens

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **`prefers-reduced-motion` must keep producing a fully static, fully visible site**
  (`DECISION-008`) — this milestone is the one most likely to break that, so check it on
  every change, not at the end.
- **The two scroll hooks are coupled by effect ordering** (`DECISION-008`,
  `DECISION-013`). `useScrollReveals` holds sections at `opacity` — not `visibility` —
  because hiding them removes their contents from the tab order (`ISSUE-030`). Any change
  there needs the ring check and a keyboard check.
- A page transition must not delay or override the scroll behaviour: route changes start
  at the top, hash links land under the header, back/forward restores position.
- Numbers that clear the fixed header belong in a `calc()` off `--header-h` /
  `--anchor-offset` / `--page-top`.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Against the **production build** (`npm run build && npx vite preview`, then
`http://localhost:4173`), in headless Chrome over the DevTools Protocol.

**The scratchpad does not survive between sessions.** Rebuild the ~50-line driver with
`coldGoto` (via `about:blank` — a fragment-only navigation does not reload), overflow as
`scrollWidth - clientWidth`, and a ~1.4s settle.

Three traps this project has already paid for:

- `document.activeElement.textContent` is the whole page when focus is on `body`. Test
  `tagName`.
- `[].every()` is `true` — an empty selection passes any "all of them are…" check.
- **`Page.addScriptToEvaluateOnNewDocument` accumulates across runs in the same browser.**
  Instrumentation that survives navigation needs a freshly launched browser per experiment,
  or earlier observers will write to the same globals and give confident wrong answers.

Leave passing: the 38-route sweep, axe (0 violations), the reveal ring, anchor clearance,
reduced motion, the overflow sweep, and the no-JavaScript metadata fetch.

## Completion Criteria

- One motion vocabulary, used by the reveals and by whatever else animates.
- Route changes no longer cut hard, and a first visit to a lazy page does not flash blank.
- `prefers-reduced-motion` still produces a completely static, fully visible site.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_006.md` and `docs/milestones/index.md`.
4. Record newly discovered issues / suggestions / decisions **only where genuinely
   needed** — a motion vocabulary is a `DECISION`.
5. Create `docs/sessions/session_011.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed. If images have landed, rerun
   `node scripts/image-manifest.mjs --write`.
