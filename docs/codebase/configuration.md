# Codebase — Configuration and repo-root files

| File | Purpose | Notes |
| --- | --- | --- |
| `package.json` | scripts + deps | `type: module`, private, v0.1.0 |
| `vite.config.ts` | React plugin, `@` → `./src`, `outDir: dist`, `sourcemap: false` | |
| `tsconfig.json` | project references only | |
| `tsconfig.app.json` | `src` — strict + `noUncheckedIndexedAccess` + `noUnusedLocals`/`Parameters`, `noEmit`, `@/*` paths | |
| `tsconfig.node.json` | `vite.config.ts` only | |
| `eslint.config.mjs` | flat config; ignores `dist/`, `design-reference/`, `node_modules/` | 3 warnings, 0 errors |
| `postcss.config.js` | tailwindcss + autoprefixer | |
| `tailwind.config.ts` | design tokens — see `styling.md` | |
| `index.html` | single entry; **static EN meta + OG tags live here** | not per-locale, `ISSUE-013` |
| `.gitignore` | node_modules, dist, .DS_Store, `*.tsbuildinfo`, `design-reference/` | does **not** ignore `.next/` — `ISSUE-018` |

## Repo-root documents (not code)

| File | Role |
| --- | --- |
| `CONTENT_GUIDE.md` (93 KB, 1355 lines) | every editable text field and image slot with its exact source path; the intended copy-editing surface |
| `ROADMAP.md` (2.9 KB) | the owner's content/asset roadmap — phases: EN content → images → animation → German |
| `design-reference/` | **gitignored.** `SPEC.md` (439 lines, condensed implementation spec), `master-prompt.md` (5095 lines, the design brief), and 16 `.dc.html` coded reference designs — the authoritative visual source |
| `public/images/MANIFEST.md` | real vs stand-in image status |

See `docs/reference/index.md` for how to use these without duplicating them.

## Leftovers to clean (`ISSUE-018`)

`.next/` (untracked Next.js webpack cache, not gitignored), `tsconfig.tsbuildinfo`
(114 KB, stale from the Next era), `NewHomePage/` (empty directory).

## Uncommitted working tree (`ISSUE-017`)

13 modified files, 1 deletion (`src/components/ProjectEntry.tsx`), 4 untracked
(`CONTENT_GUIDE.md`, `ROADMAP.md`, `src/components/BentoGrid.tsx`,
`src/lib/useScrollReveals.ts`) — plus `.next/`. Verify with `git status` at session start;
this snapshot is dated 2026-08-22.

## Related

`ARCH-06`.
