# Previous Session

**SESSION-014** — 2026-08-25 — `MILESTONE-007` / `MILESTONE-008` — Complete
Full record: `docs/sessions/session_014.md`. Commit `a1f4370`.

## What changed

**`ISSUE-027` is fixed** — an anchor on the page you are already on now lands exactly.
Two changes in `useScrollBehavior`:

- A hash that changed while the pathname did not is an explicit request for that anchor,
  whichever direction history is moving, so the `POP` restore branch yields to it. That
  sidesteps the question SESSION-005 could not answer — where the stale offset came from —
  by making it irrelevant. Genuine back/forward still restores.
- The smooth landing waits for the page to **stop moving** and then corrects a near miss,
  rather than declaring success on arrival. A fragment navigation makes the browser scroll
  to the element too; both animate, and ours passed through the right offset while the
  browser's was still running.

**`ISSUE-029` is fixed** — the About annotation is positioned proportionally (`left-[30%]`)
instead of at a fixed `150px`, so it stays inside its column. Desktop placement is unchanged
to within two pixels; the collision band was 768–~870px, not just 768.

**A deploy pre-flight exists and is written down** — `docs/reference/publishing.md`. It runs
against a server that behaves like GitHub Pages (real file → directory index → `404.html`
**with a 404 status**). All clean: assets served and absolutely-pathed, `404.html` rescues
unknown deep links with a real 404, nested routes load only their own chunk, no source or
sourcemaps ship.

**One thing it caught:** `public/images/MANIFEST.md` was being served at
`/images/MANIFEST.md` — an internal note about which images are placeholders, published on
the portfolio. Everything under `public/` ships; that is what `public/` means. Moved to
`docs/reference/image_files.md`.

## What this constrains

- **`useScrollBehavior` has two more rules to keep.** An explicit anchor beats a stored
  offset; a smooth landing is judged by stillness, not arrival. Both are load-bearing and
  both are cheap to break — the journey suite is the only thing that catches it.
- The previous hand-off's one-line paraphrase of `ISSUE-027` ("a URL-bar hash change
  bypasses the router, needs a `hashchange` path") was wrong; `issue_027.md`'s own
  SESSION-005 diagnosis was right. Trust the issue file over a summary of it.
- `docs/reference/image_files.md` is the manifest's path now. `scripts/image-manifest.mjs`
  writes there.

## What did not change

Nothing pushed, nothing deployed — still the owner's call. No prose, no photographs.
`ISSUE-010` and `ISSUE-006` still wait on the owner's images.
