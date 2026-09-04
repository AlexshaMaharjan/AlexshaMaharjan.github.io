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

| `PageTransition.tsx` | 40 | fades a page in on arrival — opacity only, no key on the subtree, and the file says why (`SUGGESTION-007`) |
| `RouteLoading.tsx` | 18 | the Suspense fallback: a 2px bar and an announced "Loading page…" (`ISSUE-020`) |

## Case study (`src/components/case-study/`)

| File | Lines | Controls |
| --- | --- | --- |
| `CaseStudyPage.tsx` | 78 | back link, then **the rail + reading column grid starting at the top of the page**, then the closing band and next-project nav. Nothing sits above the grid, which is what lets the rail be on screen when the page opens (`DECISION-017`). The rail column exists from `xl` (1280px) only; the last section is lifted out onto its own tinted band (`outro`) |
| `CaseStudyHero.tsx` | 62 | the hero image and nothing else, with the scrubbed drift and `priority` so it is not lazy-loaded. Renders inside the reading column (~960px), not across the container |
| `CaseStudyIntro.tsx` | 57 | the page's `h1` at `text-feature`, summary, optional disclosure, tags and `FactsStrip`. Rendered *inside* the first section via `Section`'s `intro` slot, so the page reads 01 Overview → title → description → facts → the section's own heading (`DECISION-017`) |
| `FactsStrip.tsx` | 52 | label/value `<dl>` of Type/Role/Contribution/Tools/Deliverables at the 680px measure, empties filtered out. `year` is gone; `type` carries "Semester project · solo/team" |
| `ContentsNav.tsx` | 116 | sticky rail from `xl` + collapsible `<details>` below it, both marking the section being read. `useActiveSection` runs an `IntersectionObserver` rebuilt on every pathname change (never mount-only — `ARCH-01`); the rail's left edge fills as a progress track |
| `Section.tsx` | 195 | one section: number + nav label, optional `intro` slot, heading, `body[]` blocks, then its set pieces and media. One render path; `first` and `outro` vary only spacing, scale and (for `outro`) heading-beside-text. Text sits at a 680px measure, everything else runs wider. `BodyBlock` switches on the block kind — paragraph / `h3` / `list` / `quote` / `note` / `figure` (`DECISION-014`) |
| `SectionMedia.tsx` | 159 | groups figures into runs, then justifies each run into rows of at most three. **Every figure in a row shares one height** (`MAX_FIGURE_HEIGHT`, 640px, or less when the 960px column binds) and its width follows from its own aspect — `flex-grow: <ratio>` against `flex-basis: 0`, so the browser does the justification and nothing is cropped (`DECISION-019`). Stacks below 768px. A nested reveal, deliberately (`DECISION-008`) |
| `Figure.tsx` | 72 | a case-study image slot: `Media` plus a `<figcaption>` when `src` is set. A real figure is also the button that opens `ui/Lightbox`; a placeholder is not |
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
| `ui/Image.tsx` | 32 | `<img>` wrapper, `fill` only, builds a `srcset` from `imageVariants` |
| `ui/Lightbox.tsx` | 141 | full-screen view of one figure, portalled to `body` at `z-[210]` (over the header's `z-[200]`). Opens fitted, tap toggles the image's natural size inside a pannable scroller. Escape closes, focus starts on Close and returns to the figure. Exists because a dense figure is unreadable at 350px on a phone |
| `PlaceholderImage.tsx` | 23 | hatched `role="img"` box with bracketed caption |
| `about/LoveLine.tsx` | 65 | cycling word with measured width transition |
| `resume/PrintButton.tsx` | 11 | `window.print()` |

## Related

`ARCH-03`, `ARCH-04`, `ARCH-05`.
