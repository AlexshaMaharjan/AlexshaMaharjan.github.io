# Next Session

## Status

`MILESTONE-006` is mostly complete (SESSION-011): the site has one motion vocabulary, the
reveals have variants, route changes fade in, lazy pages announce themselves, and the
process canvas finally idles when it is off screen.

Work sits on branch `milestone-003-content-model`, **seventeen commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

### Nothing is deployed

Published only by `npm run deploy` — there is no CI, and `predeploy` now runs the prerender,
which needs Chrome on the machine that deploys. Nine sessions are visible locally only
(`npm run build && npx vite preview`, then `http://localhost:4173`).

### What wants the owner

1. **Images — 129 empty slots**, listed with sizes and data paths in
   `docs/reference/image_manifest.md`. The eleven bento tiles first, and **`og:image`**:
   every link preview is currently a solid-colour placeholder, so a shared link reads as
   broken even though its title and description are right.
2. **The copy pass** (`MILESTONE-004`) — `DECISION-011` forbids inventing anything.
3. **A custom domain**, if one is wanted (`DECISION-012`).

## Objective

**Finish `MILESTONE-006` — `SUGGESTION-008`, the scroll-linked half.** It is the part a
visitor would call "scroll animation", and the vocabulary it needs now exists.

Read `docs/suggestions/suggestion_008.md` and follow it. What it proposes:

- case-study hero parallax;
- figure scale-ins as media enters (the `scale` reveal variant already exists — the
  question is where it belongs, see the constraint about nesting below);
- velocity-linked playground marquees — the rows respond to scroll speed;
- ~~active-section tracking~~ — already done in `MILESTONE-003`.

**Restraint is the brief**, from two directions: `SPEC` §11 says motion should guide, not
distract, and the site's own WikiMind case study argues the same thing in its copy. Three
well-judged effects will read better than six.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/suggestions/suggestion_008.md`
3. `docs/milestones/milestone_006.md` — what is ticked, and the one task deliberately not
   done (lazy GSAP, with the reason)
4. `docs/decisions/decision_008.md` — the reveal contract, amended three times now; read
   the amendments before touching `useScrollReveals`
5. `docs/architecture/architecture_04.md` — the process canvas, and `DECISION-007`, which
   says it stays hand-written rAF unless a decision says otherwise
6. `docs/codebase/styling.md` § Motion — the vocabulary as built

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/lib/motion.ts` — the tokens. **Add to these rather than writing new numbers.**
- `src/lib/useScrollReveals.ts` — variants, the focus handler, the refresh-after-fonts
- `src/components/case-study/CaseStudyHero.tsx`, `SectionMedia.tsx`, `Figure.tsx`
- `src/components/playground/CategoryMarquee.tsx` — the rows, and the pause control that
  must keep working (WCAG 2.2.2)
- `src/components/process/HeroProcess.tsx` — how scroll-driven animation is already done
  here, including the visibility gate added in SESSION-011

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **`prefers-reduced-motion` must produce a completely static, fully visible site.** This
  is the milestone most likely to break that: parallax and scrubbed animation have to be
  no-ops, not slower versions.
- **The marquee pause control must keep stopping the rows.** If they become
  velocity-linked, "paused" has to mean paused, not "moving differently".
- **Nested reveals are undecided.** Case-study media grids sit inside sections that already
  carry `data-inview`; adding a second reveal inside means deciding what nesting should do
  before writing it.
- **Do not put a transform on an ancestor of the case-study contents rail** — it becomes the
  containing block and the rail stops sticking. That is why the page transition is opacity
  only.
- **Scrubbed animation must not animate layout properties.** Transform and opacity only, or
  it will jank.
- Numbers that clear the fixed header belong in a `calc()` off `--header-h` /
  `--anchor-offset` / `--page-top`.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Against the **production build** (`npm run build && npx vite preview`, then
`http://localhost:4173`), in headless Chrome over the DevTools Protocol. Rebuild the
~50-line driver: `coldGoto` via `about:blank`, overflow as `scrollWidth - clientWidth`, a
~1.4s settle.

Four traps this project has already paid for:

- `document.activeElement.textContent` is the whole page when focus is on `body` — test
  `tagName`.
- `[].every()` is `true`; an empty selection passes any "all of them" check.
- `Page.addScriptToEvaluateOnNewDocument` accumulates across runs — instrumentation that
  survives navigation needs a freshly launched browser per experiment.
- **A `MutationObserver` cannot see a style write that does not change the value.** To
  measure a rAF loop, instrument it, build, measure, revert (SESSION-011 did exactly this).
- For anything cache-sensitive — a lazy chunk, a loading state — disable the cache, or a
  warm chunk will make the test pass without testing anything.

Leave passing: the 38-route sweep, axe (0 violations), the reveal ring, the scroll journeys
(cold hash at 104px, route change to 0, back restores), reduced motion, the overflow sweep,
and the no-JavaScript metadata fetch.

## Completion Criteria

- The scroll-linked effects exist and are restrained enough that the owner would not call
  them busy.
- `prefers-reduced-motion` still produces a completely static, fully visible site.
- The marquee pause control still stops the rows dead.
- No dropped frames while scrolling a case study or the homepage.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_006.md` and `docs/milestones/index.md` — this may
   close the milestone.
4. Record newly discovered issues / suggestions / decisions **only where genuinely
   needed**.
5. Create `docs/sessions/session_012.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed. If images have landed, rerun
   `node scripts/image-manifest.mjs --write`.
