# Next Session

## Status

`MILESTONE-006` is complete (SESSION-011 + SESSION-012): one motion vocabulary, reveal
variants, page transitions, a loading state, the process canvas idling off screen, and
three scroll-linked effects — every one of them absent rather than slowed under
`prefers-reduced-motion`.

Work sits on branch `milestone-003-content-model`, **nineteen commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

### Nothing is deployed

Published only by `npm run deploy` — no CI, and `predeploy` runs the prerender, which needs
Chrome on the machine that deploys. Ten sessions are visible locally only
(`npm run build && npx vite preview`, then `http://localhost:4173`).

### What wants the owner

1. **A real `og:image`.** Every link preview is a solid-colour placeholder — the title and
   description are right, the picture is not. It is the highest-value single image on the
   manifest, because it is what people see *before* they click.
2. **The other 128 image slots**, listed with sizes and data paths in
   `docs/reference/image_manifest.md`. The eleven bento tiles first.
3. **The copy pass** (`MILESTONE-004`) — `DECISION-011` forbids inventing anything.
4. **A custom domain**, if one is wanted (`DECISION-012`).

## Objective

**Finish `MILESTONE-008`** — what is left is small, unblocked, and none of it needs the
owner:

1. **`hreflang` alternates** for every `/x` ↔ `/de/x` pair. The two locales are currently
   invisible to each other: a search engine has no way to know the German page is the same
   page. The prerender already walks both, so this is one more pair of tags per file plus
   the same in `Seo`.
2. **`ISSUE-019` — the bundle.** GSAP is 46 KB gzip and the case-study chunk is 126 KB
   because all six studies are statically imported into one registry. Splitting the
   registry per slug is the tractable half. **Lazy-importing GSAP is the trap**: the
   reveals apply their at-rest state before the first paint, and an awaited import puts it
   after — that is the flash SESSION-010 spent its time removing. If the honest answer is
   "GSAP stays eager", write that down as a decision instead: it now drives five things,
   not one, which is a different calculation than when `ISSUE-019` was filed.
3. **Delete `public/_redirects`** — the Netlify convention, dead since `DECISION-012`
   settled on GitHub Pages.

If that runs short, `ISSUE-010` (dead content fields, waiting on `MILESTONE-002`) and
`ISSUE-029` (the About annotation at 768px) are the two loose ends left in the tracker.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/milestones/milestone_008.md` — the task list, now marked up with what is done
3. `docs/issues/issue_019.md` — the bundle numbers as filed
4. `docs/issues/issue_013.md` — how the prerender works, and what it deliberately does not do
5. `docs/suggestions/suggestion_013.md` (SEO) and `suggestion_012.md` (performance)
6. `docs/decisions/decision_002.md` — path-prefix i18n, which is what `hreflang` describes

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `scripts/prerender.mjs` — walks all 36 routes; where `hreflang` tags belong
- `src/components/Seo.tsx` — the client half, which must agree with the baked HTML
- `src/lib/caseStudies/index.ts` — the registry that pulls all six studies into one chunk
- `src/lib/useScrollReveals.ts` — the layout effect that makes lazy GSAP awkward
- `vite.config.ts` — where a manual chunk strategy would go
- `public/_redirects` — delete

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **The client and the baked HTML must agree.** `Seo` writes every field on every route
  precisely so nothing leaks; anything added to the prerender needs adding there too, or a
  client-side navigation will disagree with the file a scraper read.
- **Do not break the reveals' before-paint contract** (`DECISION-008`, amended three times
  — read the amendments). If GSAP moves behind an await, the at-rest state lands after the
  first paint.
- Splitting the case-study registry must not break `getCaseStudy(slug, locale)`'s contract
  of returning `null` for an unknown slug — that is what renders the 404.
- `prefers-reduced-motion` must keep producing a completely static, fully visible site.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Against the **production build** (`npm run build && npx vite preview`, then
`http://localhost:4173`), in headless Chrome over the DevTools Protocol. Rebuild the
~50-line driver: `coldGoto` via `about:blank`, overflow as `scrollWidth - clientWidth`, a
~1.4s settle.

Five traps this project has already paid for, in the order they cost the most time:

- **`html { scroll-behavior: smooth }` applies to programmatic scrolls.** `window.scrollBy`
  in a loop moves the page about a pixel a frame. Drive
  `document.documentElement.scrollTop` directly, or measure velocity as zero and conclude
  the wrong thing (SESSION-012).
- **Measure where the thing actually happens.** A trigger 737px down the page does nothing
  at 600px of scroll; media inside a section is not on screen when the section's top is.
- `Page.addScriptToEvaluateOnNewDocument` accumulates across runs — instrumentation that
  survives navigation needs a freshly launched browser per experiment.
- A `MutationObserver` cannot see a style write that does not change the value; to measure
  a rAF loop, instrument it, build, measure, revert.
- `document.activeElement.textContent` is the whole page when focus is on `body`, and
  `[].every()` is `true`.

For this objective specifically: **`hreflang` has to be checked in the served HTML with no
JavaScript** (`curl`), and bundle claims have to come from the build output, not from
intent.

Leave passing: the 38-route sweep, axe (0 violations), the reveal ring, the scroll journeys,
reduced motion, the overflow sweep, and the no-JavaScript metadata fetch.

## Completion Criteria

- Every route declares its `hreflang` alternates, in the static HTML and from the client.
- `ISSUE-019` is either fixed or answered with a recorded decision and measurements.
- `public/_redirects` is gone.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_008.md` and `docs/milestones/index.md` — this may
   close the milestone.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_013.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed. If images have landed, rerun
   `node scripts/image-manifest.mjs --write`.
