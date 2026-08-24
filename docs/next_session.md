# Next Session

## Status

`MILESTONE-008` is complete (SESSION-013), and with it **every milestone that does not need
the owner**. `MILESTONE-001`, `003`, `006`, `007` and `008` are done; what remains of the
roadmap is content the repository cannot supply for itself.

Work sits on branch `milestone-003-content-model`, **twenty-one commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

### Nothing is deployed — and that is now the biggest single fact about this project

Eleven sessions of work exist only on a local branch. Publishing is two commands the owner
has to authorise: merge into `main`, then `npm run deploy` (which runs `predeploy` → build
+ prerender, and needs Chrome on the machine that deploys).

### What wants the owner

1. **A real `og:image`.** Every link preview is a solid-colour placeholder. Titles,
   descriptions, canonicals and `hreflang` are all correct — the picture is the only thing
   wrong, and it is the thing people see before they click.
2. **The other 128 image slots** (`docs/reference/image_manifest.md`), the eleven bento
   tiles first.
3. **The copy pass** (`MILESTONE-004`) and then German parity (`MILESTONE-009`).
4. **A custom domain**, if one is wanted.

## Objective

**Close the last two defects, then make publishing boring** — there is no engineering
milestone left to advance, so the useful work is removing the last surprises.

1. **`ISSUE-029`** — the About page's hand annotation sits on the "Biography" heading at
   exactly 768px. Measured, pre-existing, and the only visual collision left in the tracker.
2. **`ISSUE-027`** — a URL-bar hash change on the current page bypasses the router, so the
   browser's own jump lands on the scroll reveal's at-rest position. `useScrollBehavior`
   already has the layout-based maths; this needs a `hashchange` path into it that does not
   fight the router.
3. **A deploy pre-flight on the built artifact.** Everything is verified against
   `vite preview` and a local static server; nothing has verified what GitHub Pages will
   actually serve. Check the `dist/` that `predeploy` produces: that `404.html` really
   rescues an unknown deep link, that every asset path resolves from a subdirectory route,
   that `sitemap.xml` and `robots.txt` ship, that the per-slug case-study chunks load from a
   nested path, and that nothing references a file that is not in `dist/`.

`ISSUE-010` (dead content fields) is the remaining tracker item after those, and it waits on
`MILESTONE-002` finishing — which waits on images.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/issues/issue_029.md`, `issue_027.md` — the two defects, both measured
3. `docs/decisions/decision_012.md` — GitHub Pages, manual deploy, no CI
4. `docs/issues/issue_013.md` — what the prerender writes, and what it deliberately does not
5. `docs/decisions/decision_013.md` and `decision_008.md` — the scroll hooks and the reveal
   contract, before touching `useScrollBehavior`
6. `docs/codebase/configuration.md` — the build, the scripts, the one dev dependency

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/pages/About.tsx` and `src/components/about/*` — the annotation and the two-column
  layout that squeezes it at `md`
- `src/lib/useScrollBehavior.ts` — `scrollTopFor` is the maths `ISSUE-027` needs
- `scripts/prerender.mjs` — what lands in `dist/`
- `package.json` — `predeploy` / `deploy`

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **Do not break the two scroll hooks** (`DECISION-008`, `DECISION-013`, four amendments
  between them). A `hashchange` listener must not double-scroll with the router, and must
  not fire on history traversal, where the router is already restoring a position.
- The client and the baked HTML must keep agreeing — anything added to `Seo` needs adding
  to the prerender, and vice versa.
- `prefers-reduced-motion` must keep producing a completely static, fully visible site.
- **Do not publish anything.** Merging to `main` and running `npm run deploy` are the
  owner's calls; a pre-flight inspects the artifact, it does not push it.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Against the **production build**. For the pre-flight, serve `dist/` with a plain static
server (`python3 -m http.server --directory dist`) rather than `vite preview` — the point is
to see what a dumb host does, including the `404.html` fallback path.

Five traps this project has already paid for, in the order they cost the most time:

- **`html { scroll-behavior: smooth }` applies to programmatic scrolls.** A test that sets
  `scrollTop` and acts immediately is acting on a page still in motion — that has now
  produced two separate false alarms (SESSION-012, SESSION-013). Let it settle, or assert
  on where the page actually is.
- **Measure where the thing happens.** A trigger 737px down does nothing at 600px of scroll.
- `Page.addScriptToEvaluateOnNewDocument` accumulates across runs — instrumentation that
  survives navigation needs a freshly launched browser per experiment.
- A `MutationObserver` cannot see a style write that does not change the value.
- `document.activeElement.textContent` is the whole page when focus is on `body`, and
  `[].every()` is `true`.

Leave passing: the 38-route sweep, axe (0 violations), the reveal ring, the scroll journeys,
reduced motion, the overflow sweep, the no-JavaScript metadata fetch, and `hreflang` on both
locales.

## Completion Criteria

- `ISSUE-029` and `ISSUE-027` are fixed, or recorded as deliberately left with reasons.
- The pre-flight is written down: what was checked, what it found, and the exact commands
  the owner runs to publish.
- `npm run lint && npm run build` green; work committed; **nothing pushed**.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/index.md` if a milestone moved.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_014.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed. If images have landed, rerun
   `node scripts/image-manifest.mjs --write`.
