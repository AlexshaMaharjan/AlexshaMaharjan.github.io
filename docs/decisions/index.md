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
| DECISION-006 | Hatched placeholder is a design element | **Answered** | Visual language | Owner, 2026-08-24: almost every placeholder is meant to be a real image — the hatch is a fallback | `decision_006.md` |
| DECISION-007 | Process canvas is hand-written rAF | Active | Homepage animation | Direct port of the reference script, not ScrollTrigger | `decision_007.md` |
| DECISION-008 | GSAP scroll reveals, called per page | Active (amended) | Animation | Hook per page; the CSS `opacity: 0` guard that caused ISSUE-001 is gone | `decision_008.md` |
| DECISION-009 | `.dc.html` designs beat the prose brief | Active | Design fidelity | Accent is `#1B3FE0`; reference dir is gitignored | `decision_009.md` |
| DECISION-010 | Homepage work section → bento grid | **Active** | Homepage | Owner, 2026-08-24: keep the bento; it needs images and bilingual copy | `decision_010.md` |
| DECISION-011 | Copy honesty constraint | Active | Content | No invented metrics/clients; collaborators credited | `decision_011.md` |
| DECISION-012 | Static hosting with SPA rewrite | **Decided** | Deployment | GitHub Pages, manual `npm run deploy`; the résumé links here now, not to Adobe. Custom domain still open | `decision_012.md` |
| DECISION-013 | Hand-rolled scroll behaviour, not `<ScrollRestoration />` | Active | Routing, navigation | Built-in cannot see a lazy page's hash target and inherits CSS smooth scrolling | `decision_013.md` |
| DECISION-014 | Case-study body is a block model; reading column departs from the reference | Active | Content, case studies | Blocks instead of `string[]`; 680px measure against wider media; no viewport full-bleed while the rail is sticky | `decision_014.md` |
| DECISION-015 | GSAP stays eager; the case-study registry is split per slug | Active | Performance, motion | 126 KB chunk became 13 KB + one study; deferring GSAP hides content rather than saving time | `decision_015.md` |

## Needing an owner decision

**All three were answered on 2026-08-24.** What is left is not a decision but material:

- **Images.** The owner is making them. Every slot, with its aspect ratio and where it
  appears, is listed in `docs/reference/image_manifest.md`.
- **A custom domain**, if one is wanted (`DECISION-012`) — the site works without it.
- **Participation in the copy pass** (`MILESTONE-004`), which `DECISION-011` requires:
  nothing may be invented to fill a gap.
