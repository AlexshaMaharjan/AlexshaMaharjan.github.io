# SESSION-002

Date: 2026-08-22
Milestone: MILESTONE-001 — Stabilize the current implementation
Status: Complete

## Objective

The owner approved the roadmap and said to implement, so this was path B of
`next_session.md`: fix the three navigation defects that made real journeys unusable, and
put the repository on a clean footing. **Repair only** — no redesign, copy, imagery or
design-system work.

## Context Read

Only what `next_session.md` listed, as instructed:

- `docs/current_state.md`, `docs/milestones/index.md`, `docs/issues/index.md`
- `docs/milestones/milestone_001.md`
- `docs/issues/issue_001.md`, `002`, `003`, `015`, `017`, `018`, `022`
- `docs/architecture/architecture_01.md` (routing and shell), `architecture_04.md` (motion)
- Source: `src/lib/useScrollReveals.ts`, `src/components/RootLayout.tsx`, `src/routes.tsx`,
  `src/main.tsx`, `src/pages/Contact.tsx`, `src/index.css`, `src/components/Footer.tsx`,
  `ContentsNav.tsx`, `.gitignore`
- `node_modules/react-router/…/useScrollRestoration` and `node_modules/gsap/ScrollTrigger.js`,
  read to settle two design questions rather than guess at them

The repository was **not** re-read in full.

## Work Performed

### Repository state — the snapshot was stale

`ISSUE-017` warned its `git status` was dated. It was: the tree was clean and the GSAP
system, `BentoGrid.tsx` and both guides were already committed in `cc6e1c8`. `/.next` was
already in `.gitignore`. So `ISSUE-017` needed no work, and `ISSUE-018` needed only the
deletions.

### Reproducing before fixing

`MILESTONE-001` insisted `ISSUE-001` be reproduced in a browser first, as it had only been
derived from code. No browser automation was installed, so headless Chrome was driven
directly over the DevTools Protocol using Node 24's built-in `WebSocket` — no new
dependency, nothing added to `package.json`. The scripts live in the session scratchpad,
not in the repository.

That paid for itself immediately: **the predicted failure and the real one differ.**
Sections are reused DOM nodes, so the ones the outgoing page had already revealed stayed
visible; only sections the incoming case study had beyond the outgoing one's count were
never tweened. Walking the six-project ring left 1–2 whole sections permanently invisible
per hop, accumulating as you went — not the blank page the issue predicted, but worse in
one way: it is silent.

### The fixes

- **`src/lib/useScrollBehavior.ts` (new)** — one hook, called from `RootLayout`, owning
  every scroll side effect of a navigation (`ISSUE-002`, `ISSUE-003`, `ISSUE-022`).
- **`src/lib/useScrollReveals.ts` (rewritten)** — effects keyed on the pathname; the
  at-rest state moved out of CSS into a layout effect so it fails safe (`ISSUE-001`).
- **`src/index.css`** — the `[data-inview]` rules removed.
- **`src/components/RootLayout.tsx`** — one hook call.

Three findings drove the shape of the fix, and none were in the issue documents:

1. **`scrollTo({ behavior: "auto" })` does not mean "instant"** — it means *defer to the
   CSS*, and `index.css` sets `html { scroll-behavior: smooth }`. The scroll was therefore
   still in flight on return, which silently broke `ISSUE-001`'s fix too: GSAP built every
   ScrollTrigger against the outgoing page's offset, so whole pages revealed at once.
2. **Landing on a hash once is not enough.** The homepage grows ~735px a frame or two after
   the target appears, when its hero swaps to the pinned track. The hook re-aims each frame
   until the page stops moving.
3. **A mutable "have I run yet?" ref is not idempotent.** React re-invokes mount effects in
   development, and the second invocation took the back-navigation branch — so a cold
   `/#contact` never scrolled at all. Comparing history keys fixed it, and made dev and
   production agree.

## Files Changed

| File | Change |
| --- | --- |
| `src/lib/useScrollBehavior.ts` | new, 203 lines |
| `src/lib/useScrollReveals.ts` | rewritten, 46 → 85 lines |
| `src/components/RootLayout.tsx` | `useScrollBehavior()` call |
| `src/index.css` | `[data-inview]` at-rest rules removed |
| `.next/`, `tsconfig.tsbuildinfo`, `NewHomePage/` | deleted (all ignored/untracked — no commit) |

Two commits on branch `milestone-001-stabilize`: `65f2b2d` (navigation), `92b63f4`
(reveals). Branched rather than committing to `master` because `master` is the default
branch — the owner may merge or ask for a different arrangement.

## Decisions Made

- **`DECISION-013`** — hand-rolled scroll behaviour instead of react-router's
  `<ScrollRestoration />`. Its source was read first: its hash branch runs in a layout
  effect that cannot see a lazy page's target, and it scrolls with the two-argument
  `window.scrollTo(0, 0)`, which inherits the CSS smooth behaviour.
- **`DECISION-008` amended** — the CSS `opacity: 0` guard it described is gone, and the
  effect-ordering contract between the two hooks is now recorded there.

## Issues Resolved

`ISSUE-001` (Critical), `ISSUE-002`, `ISSUE-003`, `ISSUE-017`, `ISSUE-018`, `ISSUE-022`.
All verified in Chrome against the production build.

## Issues Discovered

No new issues. Two existing ones were corrected:

- **`ISSUE-002`** claimed same-page hash clicks still worked natively. They did not — the
  header uses react-router `<Link>`, so a same-page click is a `pushState`. Clicking
  "Contact" *on the homepage* did nothing either.
- **`ISSUE-015`** was `Needs verification`. It is now measured: the mobile header is 146px
  (not the ~117px estimated from class values) against a 104px `scroll-margin-top`, so
  42px of an anchored section hides behind it. It affects every width below 480px.
  Deliberately not fixed — this milestone excluded the design system; it stays with
  `MILESTONE-007`.

## Suggestions Added

None. `SUGGESTION-006` (a shared motion module) was anticipated but not implemented: the
reveal's motion values are now named constants at the top of `useScrollReveals.ts`, which
is where a future extraction would start.

## Validation Performed

- `npm run lint` — 0 errors, 3 warnings (the same three that pre-date this session)
- `npm run build` — green, ~0.9s
- Headless Chrome against the **production build** (`vite preview`), at 1440px and 390px,
  both locales, with and without `--force-prefers-reduced-motion`:
  - all six `Next project` hops around the ring
  - four playground category-to-category hops
  - `/about → "Projects"`, `/de/about → /de/#work`, homepage → "Contact"
  - `/work/qis-portal` at 6000px → `/playground`
  - `/about` at 1500px → `/resume` → browser back
  - cold loads of `/#work`, `/#contact`, `/de/#about`, `/contact`
- Before/after numbers are tabulated in `docs/milestones/milestone_001.md`.

One deliberate check: `ScrollTrigger.update()` was removed and re-tested to see whether it
was load-bearing. Behaviour was identical, but GSAP's source shows its scroll cache is only
invalidated when it processes a scroll event, which is not ordered against React's passive
effect flush. It was kept as an explicit guard with a comment saying exactly that, rather
than left in with a comment claiming to fix an observed bug.

## Remaining Work

None for `MILESTONE-001`. `ISSUE-015` is measured and left for `MILESTONE-007`.

## Recommended Next Action

`MILESTONE-003` — case-study layout and content model. `MILESTONE-002` ranks higher but is
blocked on `DECISION-010`, which only the owner can answer. See `docs/next_session.md`.
