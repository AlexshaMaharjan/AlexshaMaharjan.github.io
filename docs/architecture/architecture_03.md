# ARCH-03 — Styling architecture

Status: Current

## Purpose

How visual design is expressed: Tailwind token overrides, a small global stylesheet, and
a large amount of arbitrary-value utility classes written directly in components.

## Relevant files

- `tailwind.config.ts` — the design tokens
- `postcss.config.js` — tailwindcss + autoprefixer
- `src/index.css` — `@layer base` resets, `.container-page`, marquee keyframes, the
  bento mobile override, the `[data-inview]` pre-reveal state
- `index.html` — Google Fonts link (Inter 400/500/600, Caveat 500/600/700)

## How it currently works

`tailwind.config.ts` **replaces** rather than extends two theme keys:

- `theme.colors` — a closed 17-colour palette (`page`, `surface`, `surface-2`, `ink`,
  `ink-secondary`, `ink-muted`, `ink-body`, `border`, `near-black`, `canvas-black`,
  `accent` `#1B3FE0`, `accent-focus`, `accent-soft`, …). Tailwind's default palette is
  gone, so `text-gray-500` etc. simply do not exist.
- `theme.screens` — `sm:480 md:768 nav:1160 lg:1024 xl:1280 2xl:1440`. `nav` is a custom
  breakpoint for the header's link/hamburger switch.

`theme.extend` adds font families driven by CSS variables (`--font-inter`,
`--font-caveat`, declared in `index.css`), a `content: 1280px` max-width, a `canvas: 40px`
radius, half-step spacing (`4.5`, `13`, `18`, `30`, `38`, `48`) and a named clamp-based
type scale (`hero`, `section`, `case-title`, `case-heading`, `project-title`,
`subheading`, `body-lg`, `body`, `meta`, `caption`).

`src/index.css` sets `color-scheme: light`, `scroll-behavior: smooth`, a global
reduced-motion kill-switch, `body` base classes, `::selection`, `section {
scroll-margin-top: 104px }`, and the global `:focus-visible` outline (`2px solid #1233c4`,
3px offset) required by the accessibility spec.

## Important dependencies

Tailwind 3.4 JIT scanning `./src/**/*.{js,ts,jsx,tsx,mdx}`.

## Constraints

- Because the palette is closed, any new colour must be added to the config or written as
  an arbitrary value.
- Fonts come from a render-blocking Google Fonts `<link>` in `index.html` — there is no
  self-hosting or `next/font` equivalent.

## Known weaknesses

- **The named type scale is barely used.** Almost every heading is written as an inline
  arbitrary clamp, e.g. `text-[clamp(2.125rem,4.6vw,4.25rem)]` in `SelectedWork.tsx`,
  `text-[clamp(2.375rem,4.6vw,4.25rem)]` in `CategoryPage.tsx`,
  `text-[clamp(2.5rem,5.4vw,5.25rem)]` in `About.tsx`. Near-identical but not identical
  values are scattered across files — the main source of visual inconsistency (`ISSUE-023`).
- Raw hex values bypass the token layer in many components: `#E4E7EE` (card borders,
  ~15 sites), `#8FA6FF`, `#A7ACB4`, `#6C7078`, `#C9CEDB`, `#4E6087`, `#E6E7E9`,
  `rgba(78,96,135,0.18)`.
- `.container-page` exists in `index.css` but **no component uses it** — every page
  re-writes `mx-auto max-w-[1440px] px-5 md:px-20` by hand.
- `theme.screens` declares `nav: 1160px` *before* `lg: 1024px`; Tailwind emits media
  queries in key order, so `lg:` rules come after `nav:` rules in the stylesheet and win
  at ≥1160px — `ISSUE-011`.
- `BentoGrid` and `HeroProcess` set layout through inline `style` objects rather than
  classes, so the responsive behaviour needs an `!important` override block in
  `index.css` (`[data-el="bento"]`).

## Related decisions

`DECISION-004` (replaced palette), `DECISION-009` (`.dc.html` reference is authoritative).

## Related issues

`ISSUE-011`, `ISSUE-023`.

## Related suggestions

`SUGGESTION-009` (design-system consolidation), `SUGGESTION-010` (responsive audit).
