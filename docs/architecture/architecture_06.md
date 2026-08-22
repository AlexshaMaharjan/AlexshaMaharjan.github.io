# ARCH-06 — Build, tooling & deployment

Status: Current

## Purpose

How the project is compiled, checked and (intended to be) shipped.

## Relevant files

- `package.json` — scripts and dependencies
- `vite.config.ts` — React plugin, `@` → `./src` alias, `outDir: dist`, no sourcemaps
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — project references
- `eslint.config.mjs` — flat config
- `postcss.config.js`, `tailwind.config.ts`
- `index.html` — the single HTML entry
- `public/_redirects`, and the `cp dist/index.html dist/404.html` build step

## How it currently works

```
npm run dev     vite
npm run build   tsc -b && vite build && cp dist/index.html dist/404.html
npm run preview vite preview
npm run lint    eslint .
```

`tsc -b` type-checks via project references; `tsconfig.app.json` covers `src` with
`strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`,
`noFallthroughCasesInSwitch` and `noEmit`. `tsconfig.node.json` covers `vite.config.ts`.
The `@/*` alias is declared in both `tsconfig.app.json` and `vite.config.ts`.

ESLint flat config extends `js.configs.recommended` + `tseslint.configs.recommended` plus
react-hooks and react-refresh, ignoring `dist/`, `design-reference/`, `node_modules/`.

### Current build output (verified)

```
dist/assets/index-*.js            327.58 kB │ gzip 104.82 kB   React + router + shell
dist/assets/CaseStudy-*.js        121.00 kB │ gzip  38.36 kB   all 6 studies, both locales
dist/assets/useScrollReveals-*.js 115.35 kB │ gzip  45.69 kB   GSAP + ScrollTrigger
dist/assets/Home-*.js              37.94 kB │ gzip  10.23 kB
dist/assets/index-*.css            34.54 kB │ gzip   7.46 kB
```

Build succeeds. Lint: **0 errors, 3 warnings** (`react-refresh/only-export-components` in
`process/clusters.tsx` and `process/icons.tsx`, where component files also export arrays).

## Constraints

- Client-side routing requires an SPA rewrite on the host.
- `design-reference/` is **gitignored** — the authoritative `.dc.html` design files and
  the 5095-line brief exist only on this machine. Losing them loses the design source of
  truth. Key values are captured in `docs/reference/design_tokens.md` as insurance.

## Known weaknesses

- **No deployment configuration.** `_redirects` implies Netlify; `404.html` implies GitHub
  Pages. Neither host is configured and there is no CI — `ISSUE-025`, **Needs verification**.
- No test suite, no CI, no Lighthouse/bundle budget — nothing prevents a regression.
- Next.js leftovers still in the tree: an untracked `.next/` cache directory (not in
  `.gitignore`, so it can be committed by accident), a stale 114 KB
  `tsconfig.tsbuildinfo`, and an empty `NewHomePage/` folder — `ISSUE-018`.
- Substantial work is uncommitted: 13 modified files, one deletion
  (`src/components/ProjectEntry.tsx`), and four untracked files including two new source
  modules — `ISSUE-017`.
- GSAP lands in a chunk fetched by every page that reveals content, and all six case
  studies share one 121 KB chunk — `ISSUE-019`.

## Related decisions

`DECISION-001`, `DECISION-012`.

## Related issues

`ISSUE-017`, `ISSUE-018`, `ISSUE-019`, `ISSUE-025`.
