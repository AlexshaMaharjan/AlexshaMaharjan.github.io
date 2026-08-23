# Codebase — Components

`src/components/` — 27 files. Grouped by area.

## Shell / navigation

| File | Lines | Controls |
| --- | --- | --- |
| `Header.tsx` | 93 | fixed 72px bar, wordmark, absolutely-centred `ModeSwitch`, nav links (`nav:` ≥1160px), `MobileMenu`, scroll-state blur/background, a second `sm:hidden` row holding the mode switch |
| `Footer.tsx` | 77 | two-column footer, playground vs portfolio border/bg variant, language switch, back-to-top, copyright |
| `ModeSwitch.tsx` | 47 | Portfolio ⇄ Playground segmented pill, `aria-current`, 44px min height |
| `LanguageSwitch.tsx` | 29 | EN/DE pill; links to `localeHref(target, pathname)` |
| `MobileMenu.tsx` | 80 | full-screen panel below `nav:`, Escape to close, body scroll lock |
| `Seo.tsx` | 41 | imperative `document.title` + meta writes |

`Header` and `Footer` each contain a private duplicate of `stripLocale()` (`ISSUE-021`).

## Homepage

| File | Lines | Controls |
| --- | --- | --- |
| `SelectedWork.tsx` | 25 | `#work` section heading block + `<BentoGrid>` |
| `BentoGrid.tsx` | 61 | **NEW, uncommitted.** 11 grey link tiles on a 10-column CSS grid, `gridArea` per card. No images. Card titles/categories are hard-coded English and several projects appear twice — `ISSUE-004`, `ISSUE-005` |
| `AboutPreview.tsx` | 57 | portrait + annotation pills + copy + two links |
| `ContactSection.tsx` | 34 | `#contact`, near-black band, two CTAs, email |

`src/components/ProjectEntry.tsx` (`FeaturedProject` / `GridProject`) was **deleted** in
the uncommitted working tree; recover it with `git show HEAD:src/components/ProjectEntry.tsx`.

## Process canvas (`src/components/process/`)

| File | Lines | Controls |
| --- | --- | --- |
| `HeroProcess.tsx` | 408 | the whole hero + canvas; two complete renders (static / pinned) and the rAF scroll choreography |
| `clusters.tsx` | 630 | five illustrated collages (`Cluster1`–`Cluster5`) — polaroids with `clip-path` torn edges, pins, dark panels, sketches. Hard-coded English labels |
| `icons.tsx` | 209 | 20 inline SVG icons + `branchIcons` / `tileIcons` arrays |
| `BranchGroup.tsx` | 89 | one branch: number, title button, question, cluster, close button |
| `branchData.ts` | 51 | five `BranchLayout` records — `left`/`top` %, SVG path, endpoint caps |

This is the most intricate area of the codebase. Read `ARCH-04` before changing it.

## Case study (`src/components/case-study/`)

| File | Lines | Controls |
| --- | --- | --- |
| `CaseStudyPage.tsx` | 60 | assembles hero → facts → rail + reading column → closing band → next-project nav. The rail column exists from `xl` (1280px) only; the last section is lifted out of the grid onto its own tinted band (`outro`) |
| `CaseStudyHero.tsx` | 56 | back link, eyebrow, h1, summary, optional disclosure, tags, hero image or placeholder |
| `FactsStrip.tsx` | 34 | `<dl>` of Role/Contribution/Type/Year/Tools/Deliverables, empties filtered out |
| `ContentsNav.tsx` | 116 | sticky rail from `xl` + collapsible `<details>` below it, both marking the section being read. `useActiveSection` runs an `IntersectionObserver` rebuilt on every pathname change (never mount-only — `ARCH-01`); the rail's left edge fills as a progress track |
| `Section.tsx` | 187 | one section: number + nav label, heading, `body[]` blocks, then its set pieces and media. One render path; `first` and `outro` vary only spacing, scale and (for `outro`) heading-beside-text. Text sits at a 680px measure, everything else runs wider. `BodyBlock` switches on the block kind — paragraph / `h3` / `list` / `quote` / `note` / `figure` (`DECISION-014`) |
| `SectionMedia.tsx` | 55 | groups a section's `images[]` into runs: wide ones (3:2 or wider, or `wide: true`) take the full column, narrower ones pack into a 2- or 3-up grid |
| `Figure.tsx` | 43 | one image slot: real `<img>` + `<figcaption>` when `src` is set, hatched `PlaceholderImage` with its `[ bracketed label ]` when it is not |
| `NextProjectNav.tsx` | 52 | prev/next preview cards + "View all work" |

## Playground (`src/components/playground/`)

| File | Lines | Controls |
| --- | --- | --- |
| `PlaygroundLayout.tsx` | 16 | dotted paper grid background |
| `CategoryPage.tsx` | 69 | category hero, 3-col card grid, dashed "more coming" cell, ring nav |
| `PlaygroundCard.tsx` | 43 | white card, optional `-rotate-2` + tape strip, placeholder, caption |
| `CategoryMarquee.tsx` | 66 | infinite CSS marquee of tripled items with edge mask + hover pause |
| `ProjectPage.tsx` | 95 | experiment detail: hero, main media, 3-up process, tools + reflection, next link |

## Shared

| File | Lines | Controls |
| --- | --- | --- |
| `ui/Image.tsx` | 32 | `<img>` wrapper, `fill` only, `sizes` ignored |
| `PlaceholderImage.tsx` | 23 | hatched `role="img"` box with bracketed caption |
| `about/LoveLine.tsx` | 65 | cycling word with measured width transition |
| `resume/PrintButton.tsx` | 11 | `window.print()` |

## Related

`ARCH-03`, `ARCH-04`, `ARCH-05`.
