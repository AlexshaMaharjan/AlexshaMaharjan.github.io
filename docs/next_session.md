# Next Session

## Status

`MILESTONE-007`'s accessibility block is done (SESSION-009): axe-core reports 0 violations
across 8 pages × 2 locales, and three keyboard defects that made parts of the site unusable
without a mouse are fixed. No decision is outstanding — the owner answered all three on
2026-08-24.

Work sits on branch `milestone-003-content-model`, **thirteen commits ahead of `main` and
unpushed**. **Check `git` before trusting any status in these files.**

### Nothing is deployed

The live site is served from `gh-pages` and published only by `npm run deploy` — there is
no CI. Seven sessions of work are visible only locally (`npm run build && npx vite
preview`, then `http://localhost:4173`). Publishing means merging to `main` and running
that, which is the owner's call.

### What wants the owner

1. **Images — 129 empty slots.** `docs/reference/image_manifest.md` has every one with its
   aspect ratio, export width and data path. The eleven homepage bento tiles matter most.
2. **The copy pass** (`MILESTONE-004`) — `DECISION-011` forbids inventing anything to fill
   a gap, so it needs them in the room.
3. **A custom domain**, if one is wanted (`DECISION-012`).

## Objective

**Make a shared link show the right thing** — `ISSUE-014` and `ISSUE-013`, the SEO and
link-preview half of `MILESTONE-008`.

This matters the moment the site is published, which is close: every URL currently serves
the same `index.html` with the same hard-coded English title, description and Open Graph
tags, copied from the homepage. Paste a case-study link into LinkedIn or Slack today and
the preview says "Alexsha Maharjan — Designing intuitive digital experiences" with a
solid-colour placeholder image, whichever page it points at. For a portfolio that is shared
by link, that is the difference between the work being seen and not.

Two parts, in order:

1. **`ISSUE-014` — stop the meta leaking** (small, self-contained). `Seo` restores only
   `document.title` on unmount, so `description`, `og:title`, `og:description` and
   `og:image` persist into the next route. Visit `/work/wikimind` then `/resume` and the
   résumé still carries WikiMind's description and image.
2. **`ISSUE-013` — prerendering** (the substantial part). Decide and implement how each
   route gets real HTML: a build-time prerender of the 19 × 2 routes is the obvious fit for
   a static host, and the route list already exists in `src/routes.tsx`. **Assess before
   committing to a tool** — if the answer is "this needs a dependency and a build step",
   say what it costs in the session record rather than adding it silently.

While there: `index.html`'s `og:image` points at a solid-colour placeholder
(`ISSUE-006`), and there is no `sitemap.xml`. Both are cheap once the above is settled.

`MILESTONE-006` (motion) is the alternative if this looks wrong-headed — it is the owner's
own stated priority and needs nobody either.

## Required Context

Read **only** these:

1. `docs/previous_session.md` — what just changed and what it constrains
2. `docs/issues/issue_013.md`, `issue_014.md` — the two defects
3. `docs/milestones/milestone_008.md` — the milestone these belong to
4. `docs/architecture/architecture_01.md` — routing, and how `Seo` writes metadata
5. `docs/decisions/decision_001.md` (why this is a Vite SPA and not Next.js) and
   `decision_012.md` (GitHub Pages, manual deploy)
6. `docs/codebase/configuration.md` — the build, and the one dev dependency that exists

Do not read the whole `docs/` folder, and do not re-read the repository.

## Relevant Code

- `src/components/Seo.tsx` — writes and half-restores the metadata
- `index.html` — the static English meta every route currently serves
- `src/routes.tsx` — `dual()` builds both locale branches; the route list a prerender needs
- `vite.config.ts`, `package.json` — where a prerender step would live
- `src/lib/dictionaries/{en,de}.ts` → `meta.*`, and each case study's `name`/`summary` —
  the per-route text a prerender would inline

## Constraints

- **The repository is the source of truth.** Re-check `git status` and the branch first.
- **`DECISION-001` chose a client-rendered SPA deliberately.** Prerendering must not turn
  this into a framework migration; if the honest answer is "that is the only way", write it
  down as a recommendation rather than doing it.
- The build must stay green and fast (`npm run build`, ~0.8s today) — say so in the record
  if a prerender step changes that materially.
- **Do not break the two scroll hooks** (`DECISION-008`, `DECISION-013`), and remember the
  reveal at-rest state is now `opacity` alone (SESSION-009) — prerendered HTML must not
  ship content stuck at `opacity: 0` for a visitor whose JavaScript fails.
- Numbers that clear the fixed header belong in a `calc()` off `--header-h` /
  `--anchor-offset` / `--page-top`, never in a class.
- Use the token scale and `.container-page`; never name a font size after a colour token.
- Do not rewrite prose (`MILESTONE-004`) or supply photographs (`MILESTONE-005`).

## Verification

Against the **production build** (`npm run build && npx vite preview`, then
`http://localhost:4173` — not `127.0.0.1`), in headless Chrome over the DevTools Protocol.

**The scratchpad does not survive between sessions.** Rebuild the ~50-line driver with:

- `coldGoto` via `about:blank` — `Page.navigate` to a URL differing only by its fragment
  does **not** reload the document.
- Overflow as `scrollWidth - clientWidth`, never `window.innerWidth`.
- Settle ~1.4s before measuring.
- When testing focus, read `document.activeElement.tagName` — its `textContent` is the
  whole page when focus is on `body`, which will lie to you.

For this objective specifically:

- **Test the metadata the way a scraper sees it**: `curl` the URL and read the HTML, with
  no JavaScript. That is the only test that proves `ISSUE-013` is fixed. Doing it in a
  browser will pass whether or not anything was achieved.
- Check every route's `<title>`, `description`, `og:title`, `og:description`, `og:image`
  and `canonical`, in both locales.
- For `ISSUE-014`, navigate `/work/wikimind` → `/resume` in the browser and assert the
  résumé's metadata is the résumé's.
- Leave passing: the 38-route sweep, axe (0 violations), the case-study ring, reduced
  motion, anchor clearance, and the overflow sweep.

## Completion Criteria

- A scraper fetching any route gets that route's title, description and image — or a
  recorded decision explaining why not, with what it would cost.
- No metadata leaks between routes.
- `sitemap.xml` exists and lists both locales, or is recorded as deliberately absent.
- `npm run lint && npm run build` green; work committed.

## Required End-of-Session Updates

1. Update the documentation whose information actually changed.
2. Update the status of any issue you touched, plus `docs/issues/index.md`.
3. Update `docs/milestones/milestone_008.md` and `docs/milestones/index.md`.
4. Record newly discovered issues / suggestions / decisions **only where genuinely
   needed** — a prerender approach is a `DECISION`, not a footnote.
5. Create `docs/sessions/session_010.md` and add it to `docs/sessions/index.md`.
6. Rewrite `docs/previous_session.md` to summarize this session.
7. Rewrite `docs/next_session.md` for the next logical objective.
8. Update `docs/current_state.md` only if the overall project state materially moved.
9. Update any index whose rows changed. If images have landed, rerun
   `node scripts/image-manifest.mjs --write`.
