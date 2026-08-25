# SESSION-014 — The last two defects, and publishing made boring

Date: 2026-08-25
Milestone: MILESTONE-007 (defects), MILESTONE-008 (publishing)
Status: Complete
Commit: `a1f4370`

---

## Objective

Close `ISSUE-027` and `ISSUE-029` — the last two open defects on the tracker that do not
wait on the owner — and write down what a deploy pre-flight checks, so that publishing is a
decision rather than an experiment.

---

## ISSUE-027 — an anchor on the page you are already on

`SESSION-005` measured this one and deliberately left it alone rather than guess. The
measurement it left behind was the whole fix: clicking a hash link for the current page
arrives as a `POP` with a stored scroll position, which is the *same shape* as pressing
Back, so the restore branch answered it with an offset nobody chose.

The rule that separates them turned out to be simple. **A hash that changed while the
pathname did not is an explicit request for that anchor** — whichever direction history is
moving. The restore branch now yields in that case. This sidesteps the question
`SESSION-005` could not answer (where the bogus 4267 came from); the rule makes it
irrelevant, and a genuine Back still restores.

That fix landed the first anchor and left the second 18px out — the kind of half-fix worth
recording. An instrumented build showed why: a fragment navigation makes the *browser*
scroll to the element as well, aimed at its rendered box, which sits 18px low while the
section is still at rest under the reveal. Two animations, ours and the browser's. Ours
passed through the correct offset on its way while the browser's was still running, so
declaring success **on arrival** declared it too early.

The landing now waits for the position to stop changing, then corrects a near miss —
near being within 200px. Further than that is the visitor having scrolled somewhere else
while the animation ran, and their position is theirs to keep.

Two earlier attempts are in the issue file, because both looked right in a screenshot.

## ISSUE-029 — a hand annotation on a heading

The About page's decorative note sat at a fixed `left-[150px]` inside a column that is less
than half its desktop width at `md`, so it left the column and landed on the Biography
heading. Positioned proportionally — `left-[30%]` reproduces the desktop placement to within
two pixels — it measures clear at every width from 768 to 1440.

The collision band was 768–~870px, narrower than the issue's "at `md`" implied. Worth
knowing, because the obvious alternative (hide it below `lg`) would have thrown the note
away between 880 and 1023 where nothing was ever wrong.

## The pre-flight

Written up in `reference/publishing.md`. It runs against a server that behaves the way
GitHub Pages does — real file, then directory index, then `404.html` **with a 404 status** —
because that last detail is what a plain static server gets wrong and what search engines
notice.

What it found, all clean: 78 files / 1.57 MB, every referenced asset served, asset paths
inside a nested route absolute rather than relative, `404.html` carrying no heading of its
own, sitemap and robots and favicon all served, no source or sourcemaps shipping. End to
end: `/work/wikimind/` and `/de/work/afono/` render at 200 loading only their own chunk;
`/work/nonsense/` and `/totally/made/up` return a real 404.

**One thing it caught.** `public/images/MANIFEST.md` was being served at
`/images/MANIFEST.md` — an internal note listing which of the owner's images are
placeholders, published on the owner's portfolio. Everything under `public/` ships; that is
what `public/` means. Moved to `docs/reference/image_files.md`, and the seven files that
referenced it updated.

---

## Verification

Against the production build, in Chrome, through CDP:

- **Journeys** — 1440px and 390px, motion on and off: five cold hash loads, cross-route and
  same-page hash clicks, a contents-rail click, route change lands at the top, back/forward
  restores. Exact in all four combinations.
- **Annotation** — measured against every text box on About at 768/800/840/880/900/1024/1160/1440. Two notes, zero hits.
- **Routes** — 38 route/locale pairs: heading present, nothing left invisible under reduced
  motion, no horizontal overflow.
- **axe-core** — 0 violations across five routes.
- **Reveals** — full scroll of a case study with motion on: no section left below full opacity.
- **Overflow sweep** — 320/375/768/840/1024/1440 across English and German: clean.
- **hreflang** — 8/8 routes declare their alternates in static HTML.
- `npm run lint` (0 errors, 3 pre-existing warnings) and `npm run build` green.

---

## What this did not touch

Nothing was pushed and nothing was deployed. `ISSUE-010` (the bento's real images) and
`ISSUE-006` (`og:image`) still wait on the owner. Prose is still `MILESTONE-004`'s.
