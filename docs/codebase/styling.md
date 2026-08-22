# Codebase — Styling

## `tailwind.config.ts` (2.4 KB)

- `content`: `./src/**/*.{js,ts,jsx,tsx,mdx}`
- `theme.screens` (**replaced**): `sm:480 md:768 nav:1160 lg:1024 xl:1280 2xl:1440`
  — note `nav` is declared before `lg` despite being larger (`ISSUE-011`).
- `theme.colors` (**replaced**, 17 tokens): `page #F8F9FB`, `surface #F2F3F5`,
  `surface-2 #EAECF0`, `ink #111111`, `ink-secondary #62666D`, `ink-muted #858A92`,
  `ink-body #3A3D42`, `border #D7DAE0`, `near-black #0A0A0A`, `canvas-black #050505`,
  `accent #1B3FE0`, `accent-focus #1233C4`, `accent-soft #E1E7FF`, plus
  white/black/transparent/current. Tailwind's default palette is unavailable.
- `theme.extend`: `fontFamily.sans/mono/hand`, `maxWidth.content 1280px`,
  `borderRadius.canvas 40px`, spacing `4.5 13 18 30 38 48`, and a named clamp type scale
  (`hero`, `section`, `case-title`, `case-heading`, `project-title`, `subheading`,
  `body-lg`, `body`, `meta`, `caption`) — **currently almost unused**, see `ISSUE-023`.

## `src/index.css` (113 lines)

| Block | Contents |
| --- | --- |
| `@layer base` | `--font-inter` / `--font-caveat` vars, `box-sizing`, `scroll-behavior: smooth` (note: this is why `useScrollBehavior` must pass `"instant"` explicitly — `"auto"` defers to it), global reduced-motion kill-switch, `body` classes, `::selection`, `a { color: inherit }`, `section { scroll-margin-top: 104px }`, `:focus-visible` outline |
| `@layer components` | `.container-page` — **defined but never used**; pages hand-write `mx-auto max-w-[1440px] px-5 md:px-20` |
| keyframes | `mqA` / `mqB` marquee translations + reduced-motion disable |
| `@media (max-width: 880px)` | `!important` overrides collapsing `[data-el="bento"]` to a single column |
| `[data-inview]` | **no rule** — removed in SESSION-002. The at-rest state is applied by `useScrollReveals` from a layout effect so it fails safe (`ISSUE-001`) |

## Fonts

Loaded render-blocking from Google Fonts in `index.html`: Inter 400/500/600, Caveat
500/600/700, `display=swap`. Referenced via the CSS variables above.

## Conventions actually in use

- Page container: `mx-auto max-w-[1440px] px-5 md:px-20` (repeated ~20 times).
- Reading column in case studies: `max-w-[960px]`; rail `240px`.
- Card border: `border border-[#E4E7EE]` (a raw hex, not the `border` token).
- Section rhythm: large round paddings — `pt-[150px]`, `py-[120px]`, `pb-[130px]`, etc.
- CTA pill: `flex h-12 items-center rounded-full px-7 text-[15px] font-medium`.

## Inspect when

Changing tokens, adding a breakpoint, fixing responsive behaviour, or unifying the type
scale. Related: `ARCH-03`, `ISSUE-011`, `ISSUE-023`, `SUGGESTION-009`, `SUGGESTION-010`.
