# Next Session

## Status

`MILESTONE-003` is complete. `MILESTONE-007` is most of the way through its consistency and
responsive work: `ISSUE-015`, `ISSUE-026` (SESSION-005), `ISSUE-023`, `ISSUE-011`,
`ISSUE-021` (SESSION-006), `ISSUE-016`, `ISSUE-028` (SESSION-007).

Work sits on branch `milestone-003-content-model`, **nine commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

### Nothing is deployed

The live site is served from the `gh-pages` branch and published only by `npm run deploy`
— there is no CI workflow. Five sessions of work are visible only locally
(`npm run build && npx vite preview`, then `http://localhost:4173`). Publishing means
merging to `main` and running that, which is the owner's call.

### What wants the owner

1. **Look at a case study, the homepage, and a phone-width page.** The case studies answer
   their first-named complaint; the homepage's three section headings are now one size; and
   the header is 146px tall below 768px, which is a lot of a small screen — deliberate, but
   worth their eye.
2. **`DECISION-010`** — keep the bento direction? Blocks `MILESTONE-002`.
3. **`DECISION-006`** — which placeholder slots stay stylised? Blocks the last 44 image
   slots and `MILESTONE-005`.
4. **Real image exports**, and participation in the copy pass (`MILESTONE-004`).

## Objective

**The accessibility block of `MILESTONE-007`** (`SUGGESTION-011`). It is the largest
unblocked piece left, it needs nothing from the owner, and `design-reference/SPEC.md` §11
states WCAG 2.2 AA as non-negotiable.

Six items, from `docs/milestones/milestone_007.md`:

- Keyboard-reachable pause for the playground marquees (WCAG 2.2.2 — moving content that
  runs longer than five seconds needs a control).
- Contrast audit — `ink-muted` on `page`, `#6C7078` on `near-black` are the two suspected
  failures; check the whole palette rather than only those.
- Heading-order check on every page (no skipped levels, one `h1`).
- Touch targets: the language pill and back-to-top are the two suspected misses; 24×24 CSS
  px is the 2.2 AA floor, 44×44 the comfortable target.
- Keyboard access to the process-canvas branches — the homepage's signature interaction is
  mouse-driven today.
- An axe or Lighthouse run on every route, with the results recorded.

`MILESTONE-004` (the copy pass) remains the higher priority the moment the owner is
available.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/milestones/milestone_007.md` — the accessibility block, and what is already ticked
3. `docs/suggestions/suggestion_011.md` — the accessibility brief
4. `docs/reference/design_tokens.md` §"Accessibility rules" — SPEC §11, stated
   non-negotiable, and the palette to check contrast against
5. `docs/codebase/styling.md` — the token palette and the header variables
6. `docs/architecture/architecture_04.md` — how the process canvas works, before making it
   keyboard-operable

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/components/playground/CategoryMarquee.tsx` and the `mqA`/`mqB` keyframes in
  `src/index.css` — the marquees needing a pause control
- `src/components/process/HeroProcess.tsx`, `BranchGroup.tsx`, `clusters.tsx` — the canvas
- `src/components/LanguageSwitch.tsx`, `src/components/Footer.tsx` — the two suspected
  touch-target misses
- `tailwind.config.ts` — the palette, for the contrast audit

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **`prefers-reduced-motion` must keep producing a fully static, fully visible site**
  (`DECISION-008`) — and a pause control must not fight it. The marquees are already
  disabled under reduced motion; the control is for people who have not set it.
- **Do not break the two scroll hooks** (`DECISION-008`, `DECISION-013`).
- Numbers that clear the fixed header belong in a `calc()` off `--header-h` /
  `--anchor-offset` / `--page-top`, never in a class (`styling.md`).
- Use the token scale and `.container-page`; never name a font size after a colour token.
- Contrast fixes change colours, which is a design decision as much as a compliance one —
  if a token has to move, record the old and new values in
  `docs/reference/design_tokens.md`, which is the only copy in version control.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Against the **production build** (`npm run build && npx vite preview`, then
`http://localhost:4173` — not `127.0.0.1`), in headless Chrome over the DevTools Protocol.

**The scratchpad does not survive between sessions.** The CDP driver is ~50 lines; rebuild
it with these already in place:

- `coldGoto` via `about:blank` — `Page.navigate` to a URL differing only by its fragment
  does **not** reload the document, and you will measure the previous page.
- Overflow as `scrollWidth - clientWidth`, never against `window.innerWidth`.
- Settle ~1.4s before measuring; at 200ms a page can measure clean and at 600ms not.

For this objective specifically:

- Contrast is computable — read the resolved colours out of the page and compute the WCAG
  ratio rather than eyeballing; record every pair that fails 4.5:1 (or 3:1 for large text).
- Keyboard paths are testable by dispatching real key events over the protocol
  (`Input.dispatchKeyEvent`) and reading `document.activeElement` — tab through each page
  and record the order, then check every interactive element is reachable and has a visible
  focus style.
- axe-core can be injected into the page from `node_modules` if you add it as a dev
  dependency, or fetched once and inlined. Adding a dependency is a judgment call: say so
  in the session record either way.
- Leave passing: the overflow sweep, anchor clearance, the case-study ring, and reduced
  motion.

## Completion Criteria

- Every moving thing has a control, or does not need one.
- Every interactive element is keyboard-reachable, in a sensible order, with a visible
  focus style.
- No contrast pair below AA, or a recorded decision for any that stays.
- Heading order is clean on every route.
- Results recorded, per route, so the next session does not have to re-run everything.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_007.md` and `docs/milestones/index.md` — this may
   close the milestone.
4. Record newly discovered issues / suggestions / decisions **only where genuinely
   needed** — and if a token's value changes, say so in `docs/reference/design_tokens.md`.
5. Create `docs/sessions/session_008.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed.
