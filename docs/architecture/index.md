# Architecture Index

These documents describe **what currently exists**, not what should exist.
Improvement proposals live in `docs/suggestions/`.

| ID | Title | Status | Summary | File |
| --- | --- | --- | --- | --- |
| ARCH-01 | Application shell, routing & locale | Current | SPA shell, dual-registered routes, path-prefix i18n, lazy pages | `architecture_01.md` |
| ARCH-02 | Content & data model | Current | Typed TS modules: dictionaries, case studies (block-model bodies), playground | `architecture_02.md` |
| ARCH-03 | Styling architecture | Current | Tailwind token override + `index.css` layers + inline styles | `architecture_03.md` |
| ARCH-04 | Animation & motion | Current | GSAP reveals, rAF process canvas, CSS marquees, reduced-motion | `architecture_04.md` |
| ARCH-05 | Image & asset handling | Current | Custom `Image`, `PlaceholderImage`, `Figure`, `public/images`, no pipeline | `architecture_05.md` |
| ARCH-06 | Build, tooling & deployment | Current | Vite, project-reference tsconfigs, ESLint flat config, static host | `architecture_06.md` |

## Reading order for a newcomer

`ARCH-01` → `ARCH-02` covers 80% of what you need to change content or add a page.
Add `ARCH-04` before touching anything that moves, and `ARCH-05` before touching images.
