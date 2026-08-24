# Codebase — Configuration and repo-root files

| File | Purpose | Notes |
| --- | --- | --- |
| `package.json` | scripts + deps | `type: module`, private, v0.1.0. One dev dependency exists purely for verification: **`axe-core`**, injected into the page by a scratch script during accessibility runs (SESSION-009). It ships in nothing |
| `vite.config.ts` | React plugin, `@` → `./src`, `outDir: dist`, `sourcemap: false` | |
| `tsconfig.json` | project references only | |
| `tsconfig.app.json` | `src` — strict + `noUncheckedIndexedAccess` + `noUnusedLocals`/`Parameters`, `noEmit`, `@/*` paths | |
| `tsconfig.node.json` | `vite.config.ts` only | |
| `eslint.config.mjs` | flat config; ignores `dist/`, `design-reference/`, `node_modules/` | 3 warnings, 0 errors |
| `postcss.config.js` | tailwindcss + autoprefixer | |
| `tailwind.config.ts` | design tokens — see `styling.md` | |
| `index.html` | single entry; **static EN meta + OG tags live here** | not per-locale, `ISSUE-013` |
| `.gitignore` | node_modules, dist, `/.next`, .DS_Store, `*.tsbuildinfo`, `design-reference/` | complete; `ISSUE-018` resolved |
| `scripts/content-guide-case-studies.mjs` | regenerates `CONTENT_GUIDE.md` §5 from the case-study data | `node scripts/content-guide-case-studies.mjs --write`; bundles the TS with esbuild (a vite dependency), not wired into `npm run` |
| `scripts/image-manifest.mjs` | regenerates `docs/reference/image_manifest.md` | `node scripts/image-manifest.mjs --write` |
| `scripts/prerender.mjs` | writes each route's own `<head>` into `dist/`, plus `sitemap.xml` (`ISSUE-013`) | `npm run prerender`, and `predeploy` runs it. Serves `dist` itself and drives headless Chrome — macOS path built in, override with `CHROME=…` |

## Repo-root documents (not code)

| File | Role |
| --- | --- |
| `CONTENT_GUIDE.md` (~1855 lines) | every editable text field and image slot with its exact source path; the intended copy-editing surface. §5 is generated — see `scripts/` above |
| `ROADMAP.md` (2.9 KB) | the owner's content/asset roadmap — phases: EN content → images → animation → German |
| `design-reference/` | **gitignored.** `SPEC.md` (439 lines, condensed implementation spec), `master-prompt.md` (5095 lines, the design brief), and 16 `.dc.html` coded reference designs — the authoritative visual source |
| `public/images/MANIFEST.md` | real vs stand-in image status |

See `docs/reference/index.md` for how to use these without duplicating them.

## Leftovers to clean (`ISSUE-018`) — resolved

`.next/`, `tsconfig.tsbuildinfo` and the empty `NewHomePage/` were deleted in SESSION-002
after checking each was disposable. `/.next` is in `.gitignore`. Nothing remains from the
Next.js era.

## Uncommitted working tree (`ISSUE-017`) — resolved

The tree is clean. The work this section described was committed in `cc6e1c8` before
SESSION-002 started. **Always re-check with `git status` at session start** rather than
trusting a snapshot in these documents — that is exactly how this one went stale.

## Related

`ARCH-06`.
