# Publishing — the two commands, and what has been checked

The site is **not published automatically**. There is no CI; nothing happens on push
(`DECISION-012`). Publishing is a deliberate act on a developer machine.

## The two commands

```bash
git checkout main
git merge milestone-003-content-model     # or whatever branch the work is on
npm run deploy
```

`npm run deploy` runs `predeploy` first, which is `npm run build && npm run prerender`, and
then pushes `dist/` to the `gh-pages` branch with the `gh-pages` package. The live site is
`https://alexshamaharjan.github.io`.

**The machine that deploys needs Chrome**, because the prerender drives it to read each
route's metadata. Override the path with `CHROME=/path/to/chrome npm run deploy` if it is
not at the macOS default.

Expect the whole thing to take about a minute: the build is under a second, the prerender
about 38 seconds for 36 routes, the push a few seconds.

## What a pre-flight on the built artifact found (SESSION-014)

Checked against a server that behaves the way GitHub Pages does — real file, then directory
index, then `404.html` with a 404 status:

| | |
| --- | --- |
| `dist/` | 78 files, 37 HTML, 1.57 MB |
| Assets referenced by any HTML | all served, none missing |
| Asset paths inside `/work/wikimind/` | absolute — a relative one would 404 a level down |
| `404.html` | boots the app, carries no `<h1>` of its own, keeps the site's default title |
| `sitemap.xml`, `robots.txt`, `favicon.svg` | all served; robots points at the sitemap |
| Files that should not ship | none — no source, no sourcemaps, no `.DS_Store` |

And end to end, through that server:

| URL | Status | What renders |
| --- | --- | --- |
| `/work/wikimind/` | 200 | the case study, loading only the `wikimind` chunk |
| `/de/work/afono/` | 200 | the German case study, only the `afono` chunk |
| `/work/nonsense/` | **404** | the 404 page — a real 404 status, not a soft 200 |
| `/totally/made/up` | **404** | the 404 page |

The 404 status matters: a SPA that answers every URL with 200 teaches search engines that
its missing pages are real ones.

## What to check after publishing

- Open `https://alexshamaharjan.github.io/work/wikimind` directly, not through the
  homepage — that is the path that depends on the prerendered directories.
- Paste a case-study link into Slack or LinkedIn and look at the preview card. The title
  and description will be right; **the image will be a solid-colour placeholder** until a
  real `og:image` exists (`ISSUE-006`).
- Check `https://alexshamaharjan.github.io/de/` shows German.

## If something is wrong

`gh-pages` overwrites the `gh-pages` branch each time, so publishing again after a fix is
the rollback. Nothing on `main` is touched by deployment.
