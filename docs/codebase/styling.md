# Codebase — Styling

## `tailwind.config.ts` (2.4 KB)

- `content`: `./src/**/*.{js,ts,jsx,tsx,mdx}`
- `theme.screens` (**replaced**): `sm:480 md:768 lg:1024 nav:1160 xl:1280 2xl:1440`
  — ascending since SESSION-006, so a breakpoint can no longer lose to a smaller one
  declared after it (`ISSUE-011`, resolved).
- `theme.colors` (**replaced**, 17 tokens): `page #F8F9FB`, `surface #F2F3F5`,
  `surface-2 #EAECF0`, `ink #111111`, `ink-secondary #62666D`, `ink-muted #858A92`,
  `ink-body #3A3D42`, `border #D7DAE0`, `near-black #0A0A0A`, `canvas-black #050505`,
  `accent #1B3FE0`, `accent-focus #1233C4`, `accent-soft #E1E7FF`,
  `card-border #E4E7EE`, `border-muted #C9CEDB`, `accent-on-dark #8FA6FF`, plus
  white/black/transparent/current. Tailwind's default palette is unavailable.
- `theme.extend`: `fontFamily.sans/mono/hand`, `borderRadius.canvas 40px`, spacing
  `4.5 13 18 30 38 48`, and the display type scale — `hero`, `page-title`, `section`,
  `feature`, `heading`, `subheading`, `lead` — **in use at 24 call sites** since
  SESSION-006 (`ISSUE-023`). Sizes only: line-height and letter-spacing are still written
  per component.
  - **A font-size token must not share a name with a colour token.** `text-*` serves both
    and the colour wins: a size called `page` made two h1s render in `#F8F9FB` on white.

## `src/index.css` (113 lines)

| Block | Contents |
| --- | --- |
| `@layer base` | `--font-inter` / `--font-caveat` vars, **`--header-h` / `--anchor-offset`** (see below), `box-sizing`, `scroll-behavior: smooth` (note: this is why `useScrollBehavior` must pass `"instant"` explicitly — `"auto"` defers to it), global reduced-motion kill-switch, `body` classes, `::selection`, `a { color: inherit }`, `section { scroll-margin-top: var(--anchor-offset) }`, `:focus-visible` outline |
| `@layer components` | `.container-page` — `mx-auto max-w-[1440px] px-5 md:px-20`, used at all 31 page-container call sites since SESSION-006. The one place to change the gutters |
| keyframes | `mqA` / `mqB` marquee translations + reduced-motion disable |
| `@media (max-width: 880px)` | `!important` overrides collapsing `[data-el="bento"]` to a single column |
| `[data-inview]` | **no rule** — removed in SESSION-002. The at-rest state is applied by `useScrollReveals` from a layout effect so it fails safe (`ISSUE-001`) |

## Header height (`--header-h`, `--anchor-offset`, `--page-top`)

`Header.tsx` measures its own height in a layout effect and a `ResizeObserver`, and writes
`--header-h` onto the document element. `index.css` derives everything that has to clear
the header from it:

| Variable | Value | Read by |
| --- | --- | --- |
| `--header-h` | measured; CSS falls back to 146px, or 73px from **768px** up | the two below |
| `--anchor-offset` | `calc(var(--header-h) + 31px)` | `section { scroll-margin-top }`, the case-study rail's sticky offset |
| `--page-top` | `calc(var(--header-h) + var(--page-air))` — air is 40px, and 77px from `md` up, which is the 150px pages used to hard-code | the first section of every page |

The header is 73px tall from 768px up, and 146px below that, where it carries a second row
for the mode switch (`ISSUE-016` moved that boundary from 480px). Numbers tuned to the
desktop header hid 42px of every anchored section on a phone (`ISSUE-015`) and started the
homepage hero 28px *underneath* the header (`ISSUE-016`). **A number that has to clear the
header belongs in a `calc()` off these variables, not in a class.**

Two things that deliberately do *not* use them: `SelectedWork`'s `pt-[160px]` and About's
`pt-[110px]` are rhythm between sections, not header clearance.

The CSS fallbacks apply only until the measurement runs, and are the one part still written
by hand — re-check them if the header's markup changes.

## Accessibility rules baked into the CSS

- `.tap-target` (`inline-flex min-h-[24px] items-center`) is the 24×24 floor from WCAG
  2.5.8. Standalone links were 17–23px — the height of their line box (`ISSUE-030`). Links
  inline in a sentence are exempt and do not need it.
- The palette clears 4.5:1 on the grounds each colour is used on. `ink-muted` was `#858A92`
  (3.13:1) until SESSION-009; `ink-on-dark-muted` replaced a `#6C7078` literal at 3.98:1.
  **Any new colour needs its contrast computed against the ground it sits on**, not
  eyeballed — `docs/issues/issue_030.md` records the method.

## Motion

`src/lib/motion.ts` is the vocabulary: `duration.fast/base/slow`, `ease.out/inOut`,
`distance.sm/md/lg`, `stagger`, and the single `prefersReducedMotion()` guard everything
consults. `index.css` mirrors the same numbers as `--duration-fast/base/slow` and
`--ease-out`, for transitions written in Tailwind rather than GSAP — **change them
together**.

Reveals are opt-in per element: `data-inview` alone means `up`; `data-inview="fade"`,
`"scale"` or `"stagger"` pick the others. `stagger` animates the element's *children* under
one trigger — the homepage bento, the playground category grid and case-study media grids
use it. Nesting a reveal inside a section that already has one is fine (`DECISION-008`).

Three things are tied to the scroll position rather than to a trigger: the case-study hero
drifts as it leaves, and the playground marquee rows speed up with the page. Both are
transform-only, both are absent entirely under `prefers-reduced-motion` — **not slowed, not
present**, which is the rule for anything scroll-linked here.

The marquee rows are a GSAP tween rather than a CSS animation, because `timeScale` can be
nudged without the jump that changing `animation-duration` mid-flight causes. Their pause
control calls `pause()` on the tween, so paused means stopped whatever the velocity is
doing (WCAG 2.2.2).

## Heading hyphenation

`h1`/`h2`/`h3` carry `overflow-wrap: break-word` at every width — a guard that does nothing
until a word cannot fit — plus `hyphens: auto` scoped to `:root:lang(de)` **below `md`**.
German compounds are long enough to overflow the page at narrow widths (`ISSUE-028`);
English is not, and `hyphens: auto` changes line breaking wherever it applies, so it is kept
off English and off the large display sizes, where a hyphen in an 84px headline reads worse
than the wrap it replaces.

## Fonts

Loaded render-blocking from Google Fonts in `index.html`: Inter 400/500/600, Caveat
500/600/700, `display=swap`. Referenced via the CSS variables above.

## Conventions actually in use

- Page container: `.container-page`. The 80px padding from 768px up is what made
  `ISSUE-026` possible and what `ISSUE-028` runs into at 320px.
- Headings: the named scale above. Only two `clamp()` literals remain — the process
  canvas's question heading.
- Case studies: text at a 680px measure, media to 960px, rail 240px from `xl` up
  (`DECISION-014`).
- Card border: `border border-card-border`.
- Section rhythm: large round paddings — `pt-[150px]`, `py-[120px]`, `pb-[130px]`, etc.
- CTA pill: `flex h-12 items-center rounded-full px-7 text-[15px] font-medium`.

## Inspect when

Changing tokens, adding a breakpoint, or fixing responsive behaviour. Related: `ARCH-03`,
`SUGGESTION-009` (point 4, the card and pill primitives, is still open), `SUGGESTION-010`,
`ISSUE-028`.
