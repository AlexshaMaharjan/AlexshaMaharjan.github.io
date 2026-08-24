# Design tokens and rules (captured)

Mirrored from `design-reference/SPEC.md` §1 and §11 because that directory is gitignored
and exists only on this machine. Where the prose brief and the coded `.dc.html` files
disagreed, the coded value is recorded — see `DECISION-009`.

## Colour

| Role | Value | In `tailwind.config.ts` |
| --- | --- | --- |
| White | `#FFFFFF` | `white` |
| Portfolio page bg | `#FFFFFF` | — (`body` uses `bg-white`) |
| Playground page bg | `#F8F9FB` | `page` |
| Soft neutral surface | `#F2F3F5` | `surface` |
| Secondary surface | `#EAECF0` | `surface-2` |
| Primary text | `#111111` | `ink` |
| Secondary text | `#62666D` | `ink-secondary` |
| Muted text (mono captions) | `#6A6F78` | `ink-muted` — was `#858A92` until SESSION-009, which is 3.13:1 on the page background and fails WCAG AA |
| Long-form body text | `#3A3D42` | `ink-body` |
| Border (tag pills) | `#D7DAE0` | `border` |
| Near-black (dark bands) | `#0A0A0A` | `near-black` |
| Process canvas black | `#050505` | `canvas-black` |
| Header pill / selected segment | `#111114` | — (arbitrary) |
| **Accent** | `#1B3FE0` | `accent` |
| Focus outline | `#1233C4` | `accent-focus` |
| Soft accent / selection | `#E1E7FF` | `accent-soft` |
| Card / figure border | `#E4E7EE` | `card-border` (named in SESSION-006) |
| Text on the near-black bands | `#A7ACB4` | `ink-on-dark` (named in SESSION-009) |
| Muted text on the near-black bands | `#8A8F98` | `ink-on-dark-muted` — replaced a `#6C7078` literal at 3.98:1 (SESSION-009) |
| Dashed rules | `#C9CEDB` | `border-muted` (named in SESSION-006) |
| Accent on the dark canvases | `#8FA6FF` | `accent-on-dark` (named in SESSION-006) |
| Playground grid major (32px) | `rgba(78,96,135,0.055)` | — |
| Playground grid minor (8px) | `rgba(78,96,135,0.025)` | — |
| Playground border tint | `rgba(78,96,135,0.18–0.35)` | — |
| Placeholder fill | `repeating-linear-gradient(45deg,#F2F3F5 0 10px,#EDEFF3 10px 20px)` | — |

> The prose brief names `#5C6CFF` / `#4055FF` as accent/focus. **Ignore those** — every
> coded design uses `#1B3FE0` / `#1233C4`.

## Type

- Body: **Inter** 400/500/600, Google Fonts, with the system stack behind it.
- Hand annotations: **Caveat** 500/600/700 (`font-hand`).
- Metadata / eyebrows / captions: `ui-monospace, Menlo, Consolas, monospace`.

Sizes as coded in the reference:

| Role | Value |
| --- | --- |
| Case-study / About h1 | `clamp(40px,5.4vw,84px)`, or `clamp(44px,5.8vw,86px)`, or `clamp(40px,5vw,76px)` for longer headlines (Sync FM, QIS); mobile 38–44px |
| Section heading | `clamp(30px,3.2vw,44px)` case studies; `clamp(26px,2.6vw,34px)`–`clamp(30px,3vw,40px)` About; mobile 30px |
| Playground category h1 | `clamp(38px,4.6vw,68px)`; mobile 38px |
| Long-form body | 18px / 1.65 |
| Hero intro | 19px / 1.6 |
| Metadata | 12–13px mono |
| Large-heading letter-spacing | −0.025em to −0.028em |

### As implemented

The reference's sizes were ported as per-component `clamp()` values and drifted into ~20
near-duplicates. SESSION-006 reconciled them into seven named sizes in
`tailwind.config.ts` (`ISSUE-023`) — these are the implementation's scale, and the closest
thing the project has to a canonical one:

| Token | Value |
| --- | --- |
| `hero` | `clamp(2.75rem, 5.8vw, 5.5rem)` |
| `page-title` | `clamp(2.5rem, 5.4vw, 5.25rem)` |
| `section` | `clamp(2.125rem, 4.6vw, 4.25rem)` |
| `feature` | `clamp(1.875rem, 3.6vw, 3.25rem)` |
| `heading` | `clamp(1.875rem, 3.2vw, 2.75rem)` |
| `subheading` | `clamp(1.625rem, 2.6vw, 2.25rem)` |
| `lead` | `clamp(1.375rem, 2.2vw, 1.875rem)` |

Sizes only — line-height and letter-spacing are still per component. A font-size token must
never share a name with a colour token: `text-page` resolved to the *colour* `page` and
rendered two h1s near-white on white before it was renamed `page-title`.

## Spacing, width, radius

- Vertical rhythm in round numbers: 56, 64, 72, 76, 90, 96, 100, 110, 120, 130, 140, 150 px.
- Max widths: 1440px outer, 1280px content, ~960px case-study reading column, 240px rail.
  As implemented: `.container-page` is `mx-auto max-w-[1440px] px-5 md:px-20`, i.e. the
  1280px content width falls out of the outer width minus the padding. The case-study
  column is 960px for media and 680px for text (`DECISION-014`).
- Side padding: 80px desktop → 20px mobile. The 80px starts at 768px, which is what makes
  tablet widths tight (`ISSUE-026`, `ISSUE-028`).
- Radii: 3px (small thumbs), 6/8px (cards), 10px (portrait/hero images), 40–44px (process
  canvas at rest), 999px (pills).

## Breakpoints as coded in the reference

- `1160px` — nav links collapse to a hamburger
- `880px` — the main mobile breakpoint (padding drops, grids collapse, headings shrink),
  and the cutover between the process canvas's pinned and static flows
- `640px` — secondary mobile adjustments

## Accessibility rules (SPEC §11, stated non-negotiable)

**Verified in SESSION-009** — axe-core over 8 pages × 2 locales against `wcag2a`/`2aa`/
`21a`/`21aa`/`22aa` plus best-practice: 0 violations. What it took, and what measuring
disproved, is in `docs/issues/issue_030.md`.

- WCAG 2.2 AA.
- `:focus-visible { outline: 2px solid #1233C4; outline-offset: 3px; border-radius: 2px }`
  globally.
- `aria-current="page"` on the active mode segment; `aria-label` on the language toggle;
  `aria-expanded` on the mobile menu button.
- Every `[data-inview]` element fully visible with no transition under
  `prefers-reduced-motion: reduce`. The same guard gates the pinned canvas, the
  "I love ___" cycle, and smooth scrolling.
- Every process-section image and icon needs a real non-empty `aria-label`/alt even though
  no caption is shown.
- 44×44px minimum touch targets.

## Content rules (SPEC §12)

See `DECISION-011` — no invented metrics, clients, employers, awards or testimonials;
never present collaborative work as independent; no generic portfolio-speak; no lorem ipsum.
