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
| Muted text (mono captions) | `#858A92` | `ink-muted` |
| Long-form body text | `#3A3D42` | `ink-body` |
| Border (tag pills) | `#D7DAE0` | `border` |
| Near-black (dark bands) | `#0A0A0A` | `near-black` |
| Process canvas black | `#050505` | `canvas-black` |
| Header pill / selected segment | `#111114` | — (arbitrary) |
| **Accent** | `#1B3FE0` | `accent` |
| Focus outline | `#1233C4` | `accent-focus` |
| Soft accent / selection | `#E1E7FF` | `accent-soft` |
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

## Spacing, width, radius

- Vertical rhythm in round numbers: 56, 64, 72, 76, 90, 96, 100, 110, 120, 130, 140, 150 px.
- Max widths: 1440px outer, 1280px content, ~960px case-study reading column, 240px rail.
- Side padding: 80px desktop → 20px mobile.
- Radii: 3px (small thumbs), 6/8px (cards), 10px (portrait/hero images), 40–44px (process
  canvas at rest), 999px (pills).

## Breakpoints as coded in the reference

- `1160px` — nav links collapse to a hamburger
- `880px` — the main mobile breakpoint (padding drops, grids collapse, headings shrink),
  and the cutover between the process canvas's pinned and static flows
- `640px` — secondary mobile adjustments

## Accessibility rules (SPEC §11, stated non-negotiable)

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
