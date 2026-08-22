# Decisions Index

Lightweight decision records. Most were reconstructed from the code and the design
reference during SESSION-001; where no rationale could be inferred, the file says so
explicitly rather than inventing one.

| ID | Title | Status | Scope | Summary | File |
| --- | --- | --- | --- | --- | --- |
| DECISION-001 | Vite + React SPA instead of Next.js | Active | Whole project | Migrated in `7fb7755`; lost SSR metadata and router scroll behaviour | `decision_001.md` |
| DECISION-002 | Path-prefix i18n with typed dictionaries | Active | Routing, content | `/de/...` prefix, no i18n library, locale derived from pathname | `decision_002.md` |
| DECISION-003 | Content in typed TypeScript modules | Active | Content | No CMS/MDX; slug registries; both locales mandatory | `decision_003.md` |
| DECISION-004 | Replace Tailwind palette and breakpoints | Active | Styling | Closed 17-colour palette; custom `nav` breakpoint | `decision_004.md` |
| DECISION-005 | Hand-rolled `Image` and `Seo` | Active | Components | ~70 lines replacing `next/image` and the metadata API | `decision_005.md` |
| DECISION-006 | Hatched placeholder is a design element | Active | Visual language | Intentional, per SPEC §13 — but blocks real images today | `decision_006.md` |
| DECISION-007 | Process canvas is hand-written rAF | Active | Homepage animation | Direct port of the reference script, not ScrollTrigger | `decision_007.md` |
| DECISION-008 | GSAP scroll reveals, called per page | Active | Animation | Hook per page, CSS `opacity: 0` guard — source of ISSUE-001 | `decision_008.md` |
| DECISION-009 | `.dc.html` designs beat the prose brief | Active | Design fidelity | Accent is `#1B3FE0`; reference dir is gitignored | `decision_009.md` |
| DECISION-010 | Homepage work section → bento grid | **Under review** | Homepage | Uncommitted, unexplained; removed all project imagery and copy | `decision_010.md` |
| DECISION-011 | Copy honesty constraint | Active | Content | No invented metrics/clients; collaborators credited | `decision_011.md` |
| DECISION-012 | Static hosting with SPA rewrite | Active (host TBD) | Deployment | Both Netlify and GH-Pages fallbacks present, neither configured | `decision_012.md` |

## Needing an owner decision

- `DECISION-010` — is the bento direction being kept? Blocks `MILESTONE-002`.
- `DECISION-006` — which placeholder slots stay stylised, which become real photographs?
- `DECISION-012` — which host and domain?
