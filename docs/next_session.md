# Next Session

## Status

**Every engineering milestone that does not need the owner is finished.** `MILESTONE-001`,
`003`, `006`, `007` and `008` are complete — `007` closed in SESSION-014 with `ISSUE-027`
and `ISSUE-029`, leaving only `ISSUE-010`, which waits on images. The tracker has no open
defect a session can fix on its own.

Work sits on branch `milestone-003-content-model`, **twenty-two commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

### Nothing is deployed, and there is now no engineering reason left for that

Twelve sessions of work exist only on a local branch. The pre-flight has been run and
written down (`docs/reference/publishing.md`): the built artifact is sound, unknown deep
links 404 properly, nested routes load correctly. The two commands are:

```bash
git checkout main && git merge milestone-003-content-model
npm run deploy
```

They are the owner's to run. The one thing that will look wrong once live is the link
preview image (`ISSUE-006`).

### What wants the owner

1. **A real `og:image`.** Every link preview is a solid-colour placeholder. Everything else
   in the head is correct.
2. **The 128 image slots** (`docs/reference/image_manifest.md`), the eleven bento tiles first
   — that is `ISSUE-010`, and `MILESTONE-002` with it.
3. **The copy pass** (`MILESTONE-004`), then German parity (`MILESTONE-009`).
4. **A custom domain**, if one is wanted.

## Objective

There is no defect left to fix and no milestone left to advance without the owner, so the
next session should **pick one and say so plainly at the start**:

**A. If the owner has supplied images** — take `ISSUE-010` and `MILESTONE-002`. Run
`node scripts/image-manifest.mjs --write` first; it reports which slots are filled. The
bento tiles are the eleven that matter most, and `DECISION-014` (bent grid) already fixes
their shape. Then the dead content fields disappear on their own.

**B. If the owner has not** — the honest work is **hardening what exists**, and the
highest-value piece is a regression net. Every session so far has verified by hand through
CDP, and the scripts are thrown away each time. The journey suite, the 38-route sweep, the
axe pass and the overflow sweep have each caught a real defect; they should live in the
repository as one runnable command against the production build, not be rebuilt from
scratch every session. That is worth more than any remaining polish, because the two scroll
hooks now carry six amendments between them and nothing in the repository defends them.

Do not do both. Option B is the default if the images are not there.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. For **A**: `docs/issues/issue_010.md`, `docs/decisions/decision_014.md`,
   `docs/reference/image_manifest.md`, `docs/milestones/milestone_002.md`
3. For **B**: `docs/decisions/decision_008.md` and `decision_013.md` — the two scroll hooks
   and every amendment, which are what the suite must defend; `docs/sessions/session_014.md`
   for the journey suite's shape
4. `docs/codebase/configuration.md` — the build, the scripts, the one dev dependency

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/lib/useScrollBehavior.ts`, `src/lib/useScrollReveals.ts` — the two hooks under test
- `scripts/prerender.mjs`, `scripts/image-manifest.mjs` — the existing script conventions,
  worth matching if a check script is added
- `package.json` — where a `verify` script would go, next to `predeploy`

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **Do not break the two scroll hooks.** Beyond `DECISION-008`/`DECISION-013`: an explicit
  anchor beats a stored offset, and a smooth landing is judged by stillness, not arrival.
- `prefers-reduced-motion` must keep producing a completely static, fully visible site.
- The client and the baked HTML must keep agreeing — anything added to `Seo` needs adding to
  the prerender, and vice versa.
- **Do not publish anything.** Merging to `main` and `npm run deploy` are the owner's calls.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).
- **Nothing internal may land under `public/`** — it ships. SESSION-014 found a manifest
  being served publicly.
- If a check script is added it must not add a runtime dependency; `axe-core` stays the only
  dev dependency, and CDP is driven from Node's built-in `WebSocket`.

## Verification

Against the **production build** (`npm run build && npm run preview`), in a real browser.
For anything about what a host serves, use a plain static server over `dist/`, not
`vite preview`.

Five traps this project has already paid for, in the order they cost the most time:

- **`html { scroll-behavior: smooth }` applies to programmatic scrolls.** A test that sets
  `scrollTop` and acts immediately is acting on a page still in motion — two separate false
  alarms already (SESSION-012, SESSION-013), and the same physics is why `ISSUE-027` took
  three attempts.
- **Measure where the thing happens.** A trigger 737px down does nothing at 600px of scroll.
- `Page.addScriptToEvaluateOnNewDocument` accumulates across runs — instrumentation that
  survives navigation needs a freshly launched browser per experiment.
- A `MutationObserver` cannot see a style write that does not change the value.
- `document.activeElement.textContent` is the whole page when focus is on `body`, and
  `[].every()` is `true`.

Leave passing: the 38-route sweep, axe (0 violations), the reveal ring, the scroll journeys
(1440/390 × motion on/off), reduced motion, the overflow sweep, the no-JavaScript metadata
fetch, and `hreflang` on both locales.

## Completion Criteria

- The chosen option is stated at the start and finished, not half of each.
- For **B**: one command runs the suite against the production build, it fails loudly on a
  real regression, and a session that changes a scroll hook has an obvious way to prove it
  did not break anything.
- `npm run lint && npm run build` green; work committed; **nothing pushed**.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/index.md` if a milestone moved.
4. Record newly discovered issues / suggestions / decisions **only where genuinely needed**.
5. Create `docs/sessions/session_015.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed. If images have landed, rerun
   `node scripts/image-manifest.mjs --write`.
