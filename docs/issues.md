# Issues

Defects and genuine deficiencies, including UI/UX ones. Resolved issues stay: they explain why the code looks as it does.

47 issues. **37 resolved.** **Seven remain open** — `ISSUE-031` to `ISSUE-035`, `ISSUE-037`,
`ISSUE-038`, `ISSUE-040` — and two are partial: `ISSUE-004`, `ISSUE-006`. None
`Investigating`, none `Critical`. **Every open one is a provenance or judgement call for the
owner, not a defect.**

**SESSION-040 closed `ISSUE-043`, `ISSUE-044` and `ISSUE-045`**, which were the last three the
owner raised in SESSION-038. `ISSUE-043` took three sessions and ends with the build measuring
what it was about; `ISSUE-044` turned out to have no bug in it at all, which is what the
measurement it insisted on was for.

`ISSUE-041` to `ISSUE-046` were all raised by the owner in SESSION-038 and are worked as
[`MILESTONE-010`](milestones.md#milestone-010).

Of those, **four need the owner and cannot be closed by work**: two are provenance judgements
(`ISSUE-032`, `ISSUE-034`), one is a weight trade-off (`ISSUE-033`) and one is a word of copy
(`ISSUE-031`). Only `ISSUE-004` waits on images that are coming.

`ISSUE-041`, `ISSUE-042` and `ISSUE-046` closed in SESSION-039, and `ISSUE-043` lost two of
its three causes. `ISSUE-006` lost one of its two: the About portrait had been a solid-black
stand-in since it was wired, and the real photograph was sitting in
`Images/Alexsha_Photo.png` at exactly the same dimensions the whole time. What it still wants
is the designed `og:image` card, which a photograph is a stopgap for and not an answer to.

`ISSUE-009` and `ISSUE-010` closed in SESSION-025 — the German landmark labels and the dead
content fields.

Read the summary column first; open a file only when you are going to act on it.

### Active — Critical

_None._

### Active — High

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |
| ISSUE-004 | Homepage work grid has no imagery | **Partially resolved** | High | Tiles take images now; the images are being made | [#issue-004](#issue-004) |
| ISSUE-006 | Wired images that are colour stand-ins | Mostly resolved | High | Portrait real since SESSION-039. Left: a **designed** `og:image` card, which the portrait is only standing in for | [#issue-006](#issue-006) |

### Active — Medium

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |
| ISSUE-032 | WikiMind's personas and moodboard ship third-party imagery | Open | Medium | The persona portraits and half the moodboard tiles are not the owner's; `DECISION-016` makes this their call | [#issue-032](#issue-032) |
| ISSUE-033 | The figure-dense case studies are heavy on mobile | Open | **High** | `/work/afono` is **2141 KB** at 390/3x across 29 figures; lowering the variant ladder's quality is now worth an experiment | [#issue-033](#issue-033) |
| ISSUE-034 | Which Surugami poster is the owner's? | Open | Medium | The supplied board carries the whole team's campaign; `[ poster — by alexsha ]` stays hatched rather than over-claim | [#issue-034](#issue-034) |

### Active — Low

| ID | Title | Status | Priority | Summary | File |
| --- | --- | --- | --- | --- | --- |
| ISSUE-031 | Sync FM's copy credits the wrong AI tool | Open | Low | Says Gemini made the personas; the documentation says ChatGPT did | [#issue-031](#issue-031) |
| ISSUE-035 | AFONO's supplied folder: three files not used | Open | Low | One is an empty export; one is competitor imagery `DECISION-016` excludes; one is a moodboard flagged like `ISSUE-032` | [#issue-035](#issue-035) |
| ISSUE-047 | Three spacing classes produced no CSS at all | **Resolved** | Low | `mt-8.5`, `pt-6.5` and `mt-5.5` are not on Tailwind's scale and were silently dropped | [#issue-047](#issue-047) |
| ISSUE-042 | Résumé section rules sit flush against the first row | **Resolved** | Low | `pt-5` on the wrapping container, SESSION-039. Still prints to three pages | [#issue-042](#issue-042) |
| ISSUE-045 | The process question wraps to two lines | **Resolved** | Low | The size is solved from the element's own measurement now; one line at five widths in both locales | [#issue-045](#issue-045) |
| ISSUE-046 | Placeholder slots with no assets are still shipping | **Resolved** | Low | All four deleted in SESSION-039, plus the eight About carousel slots. 159 slots to 147 | [#issue-046](#issue-046) |
| ISSUE-040 | Scrolling the whole playground costs 4 MB on a phone | Open | Medium | Landing is 492 KB and everything is lazy; the 4 MB is paid only by scrolling all 33 pictures. Every remaining lever trades picture quality | [#issue-040](#issue-040) |
| ISSUE-039 | The playground index crops every card to a fixed aspect | **Resolved** | Medium | The marquee declares `4/3` and the featured cards `16/10` whatever the item is; `object-cover` then crops ~65% off a beaded planter. A redesign, not a defect fix | [#issue-039](#issue-039) |
| ISSUE-038 | Five supplied files are still unplaced: three videos and two photographs | Open — 2 of 3 closed | Medium | Photographs placed in SESSION-033; SESSION-034 found Chrome's MediaRecorder is an encoder and turned 121 MB of craft video into 1035 KB. Only the blank `Afono/Wireframe.png` remains | [#issue-038](#issue-038) |
| ISSUE-037 | QIS ships three screenshots of the university's own portal | Open | Medium | The subject of a redesign, captioned as such — but one shows a grade record that was not checked field by field | [#issue-037](#issue-037) |
| ISSUE-041 | Nav "About" goes to a homepage section, not the About page | **Resolved** | Medium | All three links point at `/about`, SESSION-039 | [#issue-041](#issue-041) |
| ISSUE-043 | Playground notes and arrows still cross the pictures | **Resolved** | Medium | Seats are scored on the arrow they would need. Worst crossing 394 → 16 CSS px, and the build measures it | [#issue-043](#issue-043) |
| ISSUE-044 | The playground clips are 6-9 second excerpts | **Resolved** | Medium | Measured: no playback bug, they were cut at 8s. The whole films now play in the viewer, on demand | [#issue-044](#issue-044) |

And in SESSION-029:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-036 | A regex rearranged content into the wrong section and the wrong locale | Both lists restored; `scripts/content-audit.mjs` added and gated in `predeploy`, proved by re-injecting each fault | [#issue-036](#issue-036) |

### Resolved

All in SESSION-002 under `MILESTONE-001`, and all verified in Chrome against the
production build rather than by code reading.

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-001 | Scroll reveals never re-run on same-route navigation | `92b63f4` — effects keyed on pathname; at-rest state moved from CSS into JS so it fails safe | [#issue-001](#issue-001) |
| ISSUE-002 | Hash links don't scroll cross-route | `65f2b2d` — `useScrollBehavior` in `RootLayout` | [#issue-002](#issue-002) |
| ISSUE-003 | No scroll reset on route change | `65f2b2d` — same hook; back/forward restores position | [#issue-003](#issue-003) |
| ISSUE-017 | Substantial work uncommitted | Already committed in `cc6e1c8` before the session; snapshot was stale | [#issue-017](#issue-017) |
| ISSUE-018 | Next.js leftovers | `.next/`, `tsconfig.tsbuildinfo`, `NewHomePage/` deleted after inspection | [#issue-018](#issue-018) |
| ISSUE-022 | `/contact` redirects to a hash that doesn't scroll | Resolved automatically by `ISSUE-002`, then verified | [#issue-022](#issue-022) |

And in SESSION-003 under `MILESTONE-003`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-024 | Section model can't express sub-headings or lists | `e844ad9` — `Block` union in `caseStudies/types.ts`; all six studies migrated in both locales | [#issue-024](#issue-024) |
| ISSUE-008 | First case-study section lacks number, label, reveal | `e844ad9` — one render path in `Section.tsx`; `first` varies only the top margin | [#issue-008](#issue-008) |

And in SESSION-014, closing the tracker's last two defects:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-027 | Hash navigation after a route change restores an offset nobody chose | `a1f4370` — the restore branch yields to an explicit anchor, and the smooth landing waits for stillness before correcting | [#issue-027](#issue-027) |
| ISSUE-029 | About annotation overlaps the Biography heading at 768px | `a1f4370` — the note is positioned proportionally, not at a fixed offset | [#issue-029](#issue-029) |

And in SESSION-013 under `MILESTONE-008`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-019 | Oversized GSAP and case-study chunks | `93aa40b` — the registry is split per slug (126 KB → 13 KB + one study); GSAP staying eager is `DECISION-015` | [#issue-019](#issue-019) |

And in SESSION-011 under `MILESTONE-006`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-012 | Process canvas rAF loop never idles | `06afc41` — an IntersectionObserver starts and stops it: 120 fps on screen, 0 off | [#issue-012](#issue-012) |
| ISSUE-020 | Lazy routes render a blank frame | `06afc41` — a 2px bar and an announced "Loading page…" | [#issue-020](#issue-020) |

And in SESSION-010 under `MILESTONE-008`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-013 | No prerendering — crawlers see one English page | `c7bca1d` — `npm run prerender` writes each route's head; verified with JavaScript off. The body is deliberately not prerendered, and the file says why | [#issue-013](#issue-013) |
| ISSUE-014 | `Seo` leaks description/OG between routes | `c7bca1d` — every field written on every route | [#issue-014](#issue-014) |

And in SESSION-009 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-030 | Accessibility gaps found by the WCAG 2.2 AA audit | `d9bb612` — contrast, three keyboard defects, a marquee pause control, touch targets; axe-core clean on 16 route loads | [#issue-030](#issue-030) |

And in SESSION-008, once the owner answered the decisions that blocked them:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-005 | Work grid is hard-coded English | `ee3857f` — tiles come from the dictionary | [#issue-005](#issue-005) |
| ISSUE-007 | ~115 image slots have no source field | `ee3857f` — the last 44 slots got `src`/`alt`; every slot on the site is fillable from data | [#issue-007](#issue-007) |

And in SESSION-007 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-016 | Header centre control collides between 480 and 560px | `53e212e` — the switch appears from `md`; the second row carries it below that | [#issue-016](#issue-016) |
| ISSUE-028 | German compound words in headings overflow at narrow widths | `53e212e` — hyphenation scoped to German below `md`; the original diagnosis was wrong and is corrected in the file | [#issue-028](#issue-028) |

And in SESSION-006 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-023 | Type scale and colour tokens bypassed | `2880697` — seven named display sizes, three colour tokens, one container, all adopted | [#issue-023](#issue-023) |
| ISSUE-011 | `lg:` overrides `nav:` due to screens order | `2880697` — `theme.screens` in ascending order | [#issue-011](#issue-011) |
| ISSUE-021 | `stripLocale` duplicated in Header and Footer | `2880697` — one definition in `lib/i18n.ts` | [#issue-021](#issue-021) |

And in SESSION-005 under `MILESTONE-007`:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-015 | Anchor offset wrong under the taller mobile header | `f32a45e` — the header measures itself into `--header-h`; `--anchor-offset` derives from it | [#issue-015](#issue-015) |
| ISSUE-026 | Footer columns overflow the viewport at 768–839px | `f32a45e` — the footer's link columns wrap | [#issue-026](#issue-026) |

And by the owner, outside a recorded session:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-025 | No deployment configuration | `f8df707`/`7332ad8`/`11930a6` — GitHub Pages via `npm run deploy` (`gh-pages`) | [#issue-025](#issue-025) |

And in SESSION-025, closing `MILESTONE-002`'s last two dependencies:

| ID | Title | Resolved by | File |
| --- | --- | --- | --- |
| ISSUE-009 | German gaps: untranslated and missing fields | The four listed fields, **plus six landmark `aria-label`s** that were the larger half and are actually announced. A new `landmarks` dictionary group; verified on the built German pages | [#issue-009](#issue-009) |
| ISSUE-010 | Dead fields across the content types | `DECISION-010` ended the "they'll come back" premise. Eleven structural fields removed; `headline`/`description`/`role`/`year` kept for `SUGGESTION-014` and the type now says why | [#issue-010](#issue-010) |

### Grouped by milestone

- **MILESTONE-001** (stabilize): 001, 002, 003, 017, 018, 022 — **all resolved**
- **MILESTONE-002** (work section): 004 (mechanism ✅, images pending), 005 ✅, 010 ✅ — **milestone complete**, SESSION-025
- **MILESTONE-003** (case-study redesign): 008 ✅, 024 ✅, 007 (case-study half ✅)
- **MILESTONE-004** (copy pass): —
- **MILESTONE-005** (imagery): 006, 007 ✅ — what remains is the images themselves, listed
  in `docs/reference/image_manifest.md`
- **MILESTONE-006** (motion): 012 ✅, 020 ✅
- **MILESTONE-007** (design system / responsive): 010 ✅, 011 ✅, 015 ✅, 016 ✅, 021 ✅, 023 ✅, 026 ✅, 027 ✅, 028 ✅, 029 ✅, 030 ✅ — **all resolved**
- **MILESTONE-008** (perf / SEO / deploy): 013 ✅, 014 ✅, 019 ✅, 025 ✅
- **MILESTONE-009** (German): 009 ✅ — the dictionary gaps and the landmark labels are closed; what remains is a copy pass, not a bug


---

<a id="issue-001"></a>

## ISSUE-001 — Scroll reveals never re-run on same-route navigation

Status: Resolved
Priority: Critical
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

### Summary

Navigating between two URLs that match the *same* route (e.g. `/work/wikimind` →
`/work/afono`, or `/playground/crafts` → `/playground/editorial`) leaves every
`[data-inview]` element on the new page permanently invisible.

### Evidence / Current Behavior

- `src/routes.tsx` registers `{ path: "/work/:slug", element: <CaseStudy /> }` with no
  `key`. React Router reuses the same component instance when only a param changes, so
  the component does not remount.
- `src/lib/useScrollReveals.ts:16` runs its effect with `[]` dependencies — it fires once
  per mount and never again.
- `src/index.css:105` sets `[data-inview] { opacity: 0 }` at rest, on the assumption GSAP
  will always take over.
- Result: the new page's sections keep `opacity: 0`. On a case study that is
  `src/components/case-study/Section.tsx:80` — every section after the first.

The affected navigation paths are ones a visitor will actually take:
`NextProjectNav` prev/next links, and the `CategoryPage` next-category link.

Derived from code reading; **runtime confirmation in a browser is recommended** before
and after the fix.

### Expected Behavior

Content is visible and animates in on every navigation, including param-only changes.

### Relevant Files

- `src/lib/useScrollReveals.ts`
- `src/routes.tsx`
- `src/index.css` (the `[data-inview]` at-rest rule)
- `src/components/case-study/NextProjectNav.tsx`, `src/components/playground/CategoryPage.tsx`

### Possible Cause

A mount-only effect combined with a CSS rule that hides content until that effect runs.

### Possible Solution

Any one of:
1. Key the page element by param so it remounts (`<CaseStudy key={slug} />` pattern — needs
   a wrapper since `routes.tsx` builds elements statically).
2. Add `useLocation().pathname` to the hook's dependency array and re-create the tweens.
3. Have the hook run `ScrollTrigger.refresh()` and re-scan on pathname change.

Option 2 is the smallest change and keeps the "call once per page" contract.
Whichever is chosen, also make the at-rest CSS fail safe (e.g. reveal after a timeout, or
set `opacity: 0` from JS rather than CSS) so a future regression cannot blank the page.

### Dependencies

None.

### Related

`ARCH-01`, `ARCH-04`, `MILESTONE-001`. Sibling navigation bugs: `ISSUE-002`, `ISSUE-003`.

### Resolution

Fixed in SESSION-002 (`92b63f4`), `MILESTONE-001`.

**Reproduced in Chrome first**, and the real behaviour was narrower but nastier than the
code reading predicted. Sections are reused DOM nodes, so those the outgoing page had
already revealed stayed visible with their inline `opacity: 1`; only sections the incoming
case study had *beyond* the outgoing one's count fell back to the CSS `opacity: 0` and
were never tweened. Walking the full six-project prev/next ring left **1–2 whole sections
permanently invisible on every hop** (`insights` and `testing` accumulated), and no section
on any incoming page animated at all.

Two changes in `src/lib/useScrollReveals.ts`:

1. Both effects are keyed on `useLocation().pathname` instead of `[]`, so they re-run when
   only a route param changes. This is Possible Solution 2 above; no change to
   `routes.tsx` was needed.
2. The at-rest state moved out of `src/index.css` into a `useLayoutEffect` calling
   `gsap.set(..., { autoAlpha: 0, y: 18 })`. It runs before the first paint, so nothing
   flashes, and it **fails safe**: if the script never runs, content is visible rather than
   blank. The `[data-inview] { opacity: 0 }` rule and its reduced-motion override are gone.

A third change was needed that the issue did not anticipate: the tweens are built in a
passive effect that runs *after* `RootLayout` has reset the scroll offset, and
`ScrollTrigger.update()` is called first so GSAP re-reads the scroll position rather than
measuring every trigger against the offset of the page the visitor came from.

Verified against the production build, walking the whole ring: every hop arrives at
`scrollY 0` with every section at rest, and after scrolling the full page **0 sections
remain invisible** — identical to a fresh load. Under `prefers-reduced-motion` nothing is
ever hidden.


---

<a id="issue-002"></a>

## ISSUE-002 — Hash links do not scroll when arriving from another route

Status: Resolved
Priority: High
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

### Summary

`/#work`, `/#about` and `/#contact` are the site's primary navigation targets, but React
Router does not scroll to a hash on navigation and nothing in the app implements it.
Clicking "Projects" from `/about` lands at the top of the homepage instead of the work
section.

### Evidence / Current Behavior

- `src/components/Header.tsx:64-79` and `src/components/MobileMenu.tsx:33-35` link to
  `localeHref(locale, "/#work" | "/#about" | "/#contact")`.
- `src/components/Footer.tsx:44` links to `/#about`.
- `src/components/case-study/CaseStudyHero.tsx:26` and `NextProjectNav.tsx:49` link to `/#work`.
- `src/pages/Contact.tsx` redirects the whole `/contact` route to `/#contact`.
- No `ScrollRestoration`, `scrollIntoView`, or hash-handling effect exists anywhere in
  `src/` (verified by grep).

~~Same-page hash clicks still work because the browser handles them natively.~~ **Wrong** — corrected in SESSION-002 by browser testing. The header links are
react-router `<Link>`s, so a same-page click is a `pushState`, which the browser does
not scroll for either. Clicking "Contact" *on the homepage* also did nothing.

### Expected Behavior

Navigating to a URL with a hash scrolls that element into view, honouring
`prefers-reduced-motion` and the fixed header offset.

### Relevant Files

- `src/components/RootLayout.tsx` (natural home for the fix)
- `src/routes.tsx`
- `src/components/Header.tsx`, `MobileMenu.tsx`, `Footer.tsx`, `case-study/*`
- `src/index.css` (`section { scroll-margin-top: 104px }`)

### Possible Cause

Behaviour lost in the Next.js → Vite migration; Next's router scrolled to hashes
automatically, React Router does not.

### Possible Solution

Add a small `useHashScroll()` effect in `RootLayout` that, on `location.hash` change,
finds the element and scrolls it into view after the lazy page has painted (a `Suspense`
boundary means the target may not exist on the first frame — retry on the next frame or
after the page resolves). Reuse the reduced-motion `behavior` pattern already in
`Footer.tsx:26-30`.

### Dependencies

Interacts with `ISSUE-003` — implement both in one pass so they do not fight each other.

### Related

`ARCH-01`, `MILESTONE-001`, `ISSUE-003`, `ISSUE-022`, `ISSUE-015`.

### Resolution

Fixed in SESSION-002 (`65f2b2d`), `MILESTONE-001`, by `src/lib/useScrollBehavior.ts`
called from `RootLayout` — the `useHashScroll()` shape suggested above, with two additions
found by testing in Chrome:

- **Scroll behaviour must be `"instant"`, not `"auto"`.** `"auto"` means *defer to the CSS*,
  and `index.css` sets `html { scroll-behavior: smooth }`. Passing `"auto"` left the scroll
  still in flight on return, which also broke `ISSUE-001`'s fix.
- **Landing once is not enough.** The target usually does not exist on the first frame
  (lazy pages), and the page keeps growing after it appears — the homepage gains ~735px a
  frame or two later, when its hero swaps to the pinned track. The hook re-aims every frame
  until the target stops moving.

The jump is smooth within a page the visitor can already see, and instant across a route
change (and always instant under reduced motion).

Verified against the production build at 1440px and 390px, both locales, with and without
`prefers-reduced-motion`: `/about → "Projects"`, `/de/about → /de/#work`, homepage →
"Contact", and cold loads of `/#work`, `/#contact`, `/de/#about` all land with the target
at exactly its 104px `scroll-margin-top`.


---

<a id="issue-003"></a>

## ISSUE-003 — Scroll position is not reset on route change

Status: Resolved
Priority: High
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

### Summary

Navigating from deep inside a long page (a case study is several thousand pixels tall) to
another route keeps the previous scroll offset, dropping the visitor into the middle of
the new page.

### Evidence / Current Behavior

`createBrowserRouter` in `src/main.tsx` is used without rendering `<ScrollRestoration />`,
and no manual scroll reset exists (verified by grep for `ScrollRestoration` /
`scrollIntoView` / `window.scrollTo` — the only `scrollTo` is `Footer`'s back-to-top
button).

Worst case: `/work/qis-portal` (long) → `/playground` via the mode switch.

### Expected Behavior

A new route starts at the top, unless the URL carries a hash (`ISSUE-002`) or the visitor
used the browser back button, in which case the previous position is restored.

### Relevant Files

- `src/main.tsx`, `src/routes.tsx`, `src/components/RootLayout.tsx`

### Possible Cause

Same migration gap as `ISSUE-002`.

### Possible Solution

Render `<ScrollRestoration />` inside `RootLayout` (supported by the data router), or a
manual `useEffect` on `pathname`. Must cooperate with the hash handling from `ISSUE-002`
and must not fight the pinned scroll track on the homepage.

### Dependencies

Implement together with `ISSUE-002`.

### Related

`ARCH-01`, `MILESTONE-001`.

### Resolution

Fixed in SESSION-002 (`65f2b2d`), `MILESTONE-001`, in the same
`src/lib/useScrollBehavior.ts` as `ISSUE-002` so the two cannot fight.

`<ScrollRestoration />` was evaluated and rejected — see `DECISION-013`. The hook records
`window.scrollY` per `location.key` (persisted to `sessionStorage` on `pagehide`), sets
`history.scrollRestoration = "manual"`, and on navigation either restores that offset
(back/forward), lands on the hash (`ISSUE-002`), or jumps to the top.

Measured before the fix: `/work/qis-portal` at 6000px → `/playground` landed at 4466px,
and every case-study hop arrived ~8000–9500px down the incoming page. After: every route
change arrives at `scrollY 0`, and back from `/resume` returns to `/about` at 1500px.
Verified against the production build at 1440px and 390px.


---

<a id="issue-004"></a>

## ISSUE-004 — Homepage "Selected Work" shows no project imagery and duplicates projects

Status: **Partially resolved** (SESSION-008, `ee3857f`) — the mechanism is there, the
images are not
Priority: High
Category: UI/UX / Regression
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-24

### Resolution so far

The owner confirmed the bento direction (`DECISION-010`, 2026-08-24) and is making the
images. SESSION-008 built what that needs:

- each of the eleven tiles takes an optional `src`/`alt`, so an image is a data edit
- a tile with an image renders it under a gradient scrim, so its label and title stay
  legible; tiles without one stay the flat grey card, and the two states mix cleanly
- the tiles moved into the dictionary, which also fixed `ISSUE-005`

**What is left is the images themselves** — eleven of them, listed with sizes in
`docs/reference/image_manifest.md`. The duplication this issue also raised (five of six
projects appear twice) is now deliberate: with images the grid reads as a wall of work
rather than a list of six, and `DECISION-010` records that.

### Summary

The homepage's central section — the one that has to sell six projects — currently
renders eleven flat grey rectangles containing only a category label and a title. No
images, no headline, no description, no tags, no role, no year. Six projects are spread
across eleven tiles, so five of them appear twice under different category labels.

### Evidence / Current Behavior

- `src/components/BentoGrid.tsx:14-26` — 11 hard-coded cards. `wikimind`, `afono`,
  `sync-fm`, `surugami` and `qis-portal` each appear twice (e.g. "WikiMind — Brand &
  UI/UX" and "WikiMind — Web Design" both link to `/work/wikimind`).
- `src/components/BentoGrid.tsx:44` — tile background is a flat `bg-[#E6E7E9]`.
- `src/components/SelectedWork.tsx` no longer reads `dictionary.projects` at all
  (`git diff src/components/SelectedWork.tsx`).
- `src/components/ProjectEntry.tsx` — which rendered image + headline + description +
  tags + role/year per project — is **deleted** in the working tree.
- `barrier-free-kitchen` appears once, labelled only "Kitchen".

This is uncommitted in-progress work, not shipped state.

### Expected Behavior

The section should present each project once, image-led, with enough copy for a visitor
to decide whether to open the case study — per `design-reference/SPEC.md` §4 item 7 and
§6 (a 2 + 4 hierarchy: WikiMind and AFONO as large editorial features, the other four in
a two-column grid).

### Relevant Files

- `src/components/BentoGrid.tsx`, `src/components/SelectedWork.tsx`
- `git show HEAD:src/components/ProjectEntry.tsx` (the deleted previous implementation)
- `src/lib/dictionaries/{en,de}.ts` → `projects[]`
- `design-reference/SPEC.md` §4, §6

### Possible Cause

A layout experiment (bento grid) that was started but never given imagery or content, and
which the prior implementation was deleted for.

### Possible Solution

Decide with the owner between (a) restoring the editorial `ProjectEntry` layout, (b)
keeping a bento but making each tile image-backed, one tile per project, driven by
`dictionary.projects`. Either way the tiles must read from the dictionary so German works
(`ISSUE-005`) and the imagery problem (`ISSUE-006`) is on the critical path.

### Dependencies

`ISSUE-006` (real images) determines how good any version can look.

### Related

`ARCH-05`, `DECISION-010`, `MILESTONE-002`, `SUGGESTION-001`, `ISSUE-005`.


---

<a id="issue-005"></a>

## ISSUE-005 — Homepage work grid is hard-coded English, breaking the German site

Status: **Resolved** (SESSION-008, `ee3857f`)
Priority: High
Category: Bug / i18n
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-24

### Resolution

The tile copy moved from a hard-coded array in `BentoGrid.tsx` into
`dictionaries/{en,de}.ts` → `selectedWork.bento[]`, so the German homepage shows German
labels. Measured: all eleven tiles, both locales, with locale-correct `/de/work/...` links.

### Summary

`BentoGrid` holds its card titles and category labels as English string literals, so
`/de` renders an English work section on the German homepage.

### Evidence / Current Behavior

`src/components/BentoGrid.tsx:14-26` — `category: "Brand & UI/UX"`, `"UX Research"`,
`"Inclusive Design"`, `"Poster & Print"` etc. are literals in the component. Only
`locale` is threaded through, and only to build hrefs.

Every other section of the site correctly reads from `dictionary` (`ARCH-02`).
Additionally the `aria-label` on each tile is built from these English literals.

### Expected Behavior

All visible strings come from `src/lib/dictionaries/{en,de}.ts`, as everywhere else.

### Relevant Files

- `src/components/BentoGrid.tsx`
- `src/lib/dictionaries/types.ts`, `en.ts`, `de.ts`

### Possible Cause

Rapid prototyping of the new grid without wiring the dictionary.

### Possible Solution

Fold the tile data into `ProjectCopy` (or a new `selectedWork.tiles[]` field typed in
`types.ts`) so TypeScript forces both locales to be filled in. Resolve alongside
`ISSUE-004` — the same rewrite.

### Dependencies

Blocked by the `ISSUE-004` design decision.

### Related

`ARCH-02`, `MILESTONE-002`, `SUGGESTION-001`.


---

<a id="issue-006"></a>

## ISSUE-006 — Wired-up images that are solid-colour stand-ins

Status: **Mostly resolved** — the portrait is real (SESSION-039); the designed `og:image` card is not made
Priority: High
Category: Content / Assets
Discovered: 2026-08-22 (documented earlier in `docs/reference/image_files.md`)
Last reviewed: 2026-09-10 (SESSION-039)

### Where this stands (2026-08-25)

The body below describes 2026-08-22 and is kept as the record of what was found. Four
sessions have changed most of it:

| Then | Now |
| --- | --- |
| 4 of 6 case-study heroes were colour blocks | **All six are real**, from the owner's documentations (SESSION-016) |
| 3 alt strings began "Placeholder: " | Gone from the case studies (SESSION-016). The eight in `about.carouselItems` went with the carousel itself in SESSION-039 (`MILESTONE-010` task 6g) |
| The Sync FM hero | English was fixed in SESSION-016; **German was missed and still pointed at the 6.9 KB stand-in until SESSION-020**. `scripts/image-manifest.mjs` now diffs `en` against `de` and exits non-zero, because no browser-side check can see this |
| 9 unused PNGs | **15**, 817 KB, still shipping — the count keeps rising as replaced files are orphaned. Needs the owner's yes to delete |
| The About portrait | **Real since SESSION-039.** The photograph was in the repo the whole time, at `Images/Alexsha_Photo.png` and at exactly the stand-in's 1720×2150. Now `alexsha-portrait.webp`, 242 KB, on `/about` and the homepage |
| `og:image` | **A real photograph rather than a blank rectangle** since SESSION-039 (`alexsha-portrait-og.jpg`, 1200×1500). It is still **not the designed 1200×630 card** `MILESTONE-005` asks for, and a portrait crops badly to a landscape social card |

What is left is the part that needs a design rather than an asset: **an approved 1200×630
`og:image`.** The portrait is holding that place, not filling it.

The JPEG is deliberate. Every other image on the site is WebP, but the social card is the one
image with no `srcset` and no fallback, and crawler support for WebP is good rather than
universal.

---

### Summary

Of the seven image slots that have a working `<img>` tag, only two contain a real
picture. The other five — including the portrait of the site's owner and four of the six
case-study heroes — are flat colour blocks at the correct dimensions.

### Evidence / Current Behavior

Per `docs/reference/image_files.md`, cross-checked against `src/`:

| File | Status | Used by |
| --- | --- | --- |
| `frame-6-mrtp0czu-dh8i.png` | real, 62.7 KB | Barrier-Free Kitchen hero |
| `screenshot-2026-07-07-…-d1vc.png` | real, 143.5 KB | QIS Portal hero |
| `alexsha_photo-mrx9hbwx-nif2.png` | **stand-in**, 14 KB / 1720×2150 | About + homepage portrait |
| `wikimind-mrx9dhfo-12ys.png` | **stand-in**, 63 KB / 5000×3750 | WikiMind hero |
| `shop-page-1-mrtp117j-zqqp.png` | **stand-in**, 36 KB / 2845×3446 | AFONO hero |
| `1-ms52o75m-suju.png` | **stand-in**, 11.6 KB / 2000×1414 | Surugami hero |
| `chatgpt-image-…-ms50alwm-za74.png` | **stand-in**, 6.9 KB / 1586×992 | Sync FM hero |

Three of the stand-ins also carry alt text that literally begins "Placeholder: "
(`wikimind.ts:20`, `afono.ts:22`, `sync-fm.ts:20`) — that string is read aloud by screen
readers today.

Nine further PNGs sit unused in `public/images/`.

### Expected Behavior

Every wired-up slot shows the real exported artwork, with descriptive alt text.

### Relevant Files

- `public/images/` + `docs/reference/image_files.md`
- `src/lib/caseStudies/{wikimind,afono,sync-fm,surugami}.ts` → `heroImage`
- `src/lib/dictionaries/{en,de}.ts` → `projects[].image` / `imageAlt`
- `src/pages/About.tsx:39`, `src/components/AboutPreview.tsx:18`

### Possible Cause

Assets were pulled from a design tool whose single-file read cap truncated large exports;
same-size colour placeholders were generated so layouts stayed correct.

### Possible Solution

Owner exports the five real files and drops them in under the **same filenames** — no
code change needed. Then fix the three "Placeholder: …" alt strings, and decide what to do
with the nine unused files (`ROADMAP.md` Phase 2 already asks this).

### Dependencies

Requires owner-supplied assets. Blocks `ISSUE-004` from looking finished.

### Related

`ARCH-05`, `MILESTONE-005`, `ISSUE-007`, `ROADMAP.md` Phase 2.


---

<a id="issue-007"></a>

## ISSUE-007 — ~115 image slots have no image mechanism in the data model

Status: **Resolved** (SESSION-003 `e844ad9` for case studies, SESSION-008 `ee3857f` for
the rest)
Priority: High
Category: Architecture / Content
Discovered: 2026-08-22 (documented earlier in `CONTENT_GUIDE.md` §10.4)
Last reviewed: 2026-08-23

### Summary

Most images on the site cannot be supplied at all, because the types describing them
carry only a caption and an aspect ratio — no source field. Attaching a real photo needs a
code change, not a content edit.

### Evidence / Current Behavior

- `src/lib/caseStudies/types.ts:11-14` — `SectionImage { aspect, caption }`. Consumed by
  `src/components/case-study/Section.tsx:66-72`, which unconditionally renders
  `<PlaceholderImage>`. **71 slots** across the six case studies.
- `src/lib/playground/types.ts:1-8` — `PlaygroundItem { caption, aspect, … }`. Consumed
  by `PlaygroundCard.tsx:31`, `CategoryMarquee.tsx:57`, `ProjectPage.tsx:38`,
  `PlaygroundIndex.tsx`. **36 slots**.
- `src/lib/dictionaries/types.ts` → `about.carouselItems: { alt, caption }[]`. Consumed by
  `src/pages/About.tsx:164`. **8 slots**.

### Progress

**The 71 case-study slots are done.** `SectionImage` now carries optional `src` and
`alt`, and a new `src/components/case-study/Figure.tsx` renders a real `<img>` with a
readable caption when `src` is set, falling back to `PlaceholderImage` when it is not.
Attaching a photo to a case-study figure is now a one-line data edit; verified in the
browser with a real file wired temporarily into WikiMind's `direction` section (image
loaded, caption read "moodboard", the other four slots stayed placeholders) and then
reverted, since none of the spare files in `public/images/` is a real export.

**The remaining 44 are done too** (SESSION-008). The owner answered `DECISION-006` —
"almost all placeholders are images" — so the hatched box is a fallback, not a
destination, and every slot got a source:

- `PlaygroundItem` — 36 card slots, plus the project's main image
- `about.carouselItems[]` — 8 slots
- the playground hero collage's two cards, which were hard-coded in the page and are
  content now

One shared component decides: `src/components/ui/Media.tsx` renders the image when a `src`
exists and `PlaceholderImage` when it does not. `case-study/Figure.tsx` builds its caption
on top of it rather than repeating the logic.

**Every image slot on the site can now be filled by editing data.** What each one needs —
aspect ratio, export width, exact data path — is in `docs/reference/image_manifest.md`:
136 slots, 7 filled.

### Expected Behavior

Any of these slots can be given a real image by editing data alone, falling back to
`PlaceholderImage` when no source is set.

### Relevant Files

- `src/lib/caseStudies/types.ts`, `src/lib/playground/types.ts`, `src/lib/dictionaries/types.ts`
- `src/components/case-study/Section.tsx`, `src/components/playground/PlaygroundCard.tsx`,
  `src/components/playground/CategoryMarquee.tsx`, `src/components/playground/ProjectPage.tsx`,
  `src/pages/About.tsx`, `src/pages/playground/PlaygroundIndex.tsx`
- `src/components/ui/Image.tsx`, `src/components/PlaceholderImage.tsx`

### Possible Cause

The design reference models every image slot as a placeholder, and the port implemented
the placeholder faithfully without adding the eventual real-asset path.

### Possible Solution

Add optional `src?: string` and `alt?: string` to the three item types, then introduce one
shared `<Figure>` that renders `<Image>` when `src` is present and `PlaceholderImage`
otherwise. TypeScript optionality means no existing data has to change. See
`SUGGESTION-002`.

**Note:** for the Playground, the hatched placeholder is a deliberate part of the visual
language (`DECISION-006`) — decide per slot, not wholesale.

### Dependencies

Prerequisite for `MILESTONE-005`. Owner needs to supply photos afterwards.

### Related

`ARCH-02`, `ARCH-05`, `SUGGESTION-002`, `MILESTONE-005`, `ISSUE-006`.


---

<a id="issue-008"></a>

## ISSUE-008 — First case-study section renders without its number, label and reveal

Status: **Resolved** (SESSION-003, `e844ad9`)
Priority: Medium
Category: UI/UX / Consistency
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-003)
Last reviewed: 2026-08-23

### Summary

Every case-study section is introduced by a monospace number and a blue nav label
("01 / Overview"). The first one is not — it silently loses both, and also never fades in,
because it takes a different render branch.

### Evidence / Current Behavior

`src/components/case-study/Section.tsx:76-87`: when `first` is true the component returns
the bare content `<div>`. The `<section id … data-inview>` wrapper — which carries the
`section.number` + `section.navLabel` header block **and** the `data-inview` reveal hook —
is only rendered for non-first sections.

The `id` is compensated for in `CaseStudyPage.tsx:31` (`<section id={firstSection?.id}>`),
so anchor navigation still works, but the visual eyebrow is gone. The data is present and
unused: every case study's `sections[0]` has `number: "01"` and a `navLabel`.

Consequence: the reading column starts with a bare `<h2>` while sections 02–09 all have a
two-line eyebrow, and the first section has no entrance animation while the rest do.

### Expected Behavior

Consistent treatment for every section, or an intentional, documented difference.

### Relevant Files

- `src/components/case-study/Section.tsx`
- `src/components/case-study/CaseStudyPage.tsx`
- `src/components/case-study/ContentsNav.tsx`

### Possible Cause

The `first` branch exists to avoid a top margin (`mt-24`) and a duplicate `id`; it removed
more than intended.

### Possible Solution

Keep one render path and vary only the top margin, moving the `id` responsibility fully
into `Section`. Folds naturally into the case-study layout rework.

### Resolution

`Section.tsx` has one render path. `first` now varies only the top margin (`mt-24` on
every section but the first), so section 01 keeps its number, its nav label and its
`data-inview` reveal. The `id` moved into `Section` entirely and the compensating
wrapper `id` in `CaseStudyPage.tsx` is gone — measured in the browser: no duplicate ids
on any case study, and `#overview` now lands at exactly 104px like every other section
(it previously anchored to the outer wrapper, which starts 76px higher).

Adding the first section to the reveal set touches the two coupled scroll hooks
(`DECISION-008`), so the ring check from SESSION-002 was re-run: the whole prev/next ring
across all six studies, scrolled end to end at each stop — no section left hidden, every
hop landing at scrollY 0.

### Dependencies

None.

### Related

`MILESTONE-003`, `SUGGESTION-003`.


---

<a id="issue-009"></a>

## ISSUE-009 — German dictionary has untranslated and missing fields

Status: **Resolved** (SESSION-025)
Priority: Medium
Category: Content / i18n
Discovered: 2026-08-22 (partly flagged in `ROADMAP.md`)
Last reviewed: 2026-09-04 (SESSION-025)

### Summary

Four known gaps in the German content: two visible hand-written annotations on the About
page are still English, one aria-label is untranslated, and AFONO's hero disclosure line
exists only in English.

### Evidence / Current Behavior

| Field | Current DE value | Visible? |
| --- | --- | --- |
| `de.about.handNoteOrigin` (`de.ts:320`) | `"Nepal → Germany"` | **Yes** — Caveat annotation over the portrait |
| `de.about.handNoteMaking` (`de.ts:321`) | `"always making something!"` | **Yes** — second annotation |
| `de.nav.switchToGerman` (`de.ts:18`) | `"Switch to German"` | No — dead in the DE branch, `LanguageSwitch` only reads `switchToEnglish` when locale is `de` |
| `afono.de.heroDisclosure` | **absent** (only `afono.ts:11`, the EN block, defines it) | Yes — the EN page shows a disclosure line the DE page silently drops |

Also, per `CONTENT_GUIDE.md` §11, the decorative labels inside
`src/components/process/clusters.tsx` are hard-coded English on both locales, and all
structural `aria-label`s ("Primary", "Footer", "Project navigation", …) are English-only.

### Expected Behavior

German visitors see German text everywhere visible text appears.

### Relevant Files

- `src/lib/dictionaries/de.ts`
- `src/lib/caseStudies/afono.ts`
- `src/components/process/clusters.tsx`
- `src/components/about/LoveLine.tsx` call site in `src/pages/About.tsx`

### Possible Cause

Incremental translation; `heroDisclosure` is optional in the type so its absence is not a
compile error.

### Possible Solution

Fix the four fields directly. For `clusters.tsx`, decide whether the decorative collage
labels should be translated at all (they are tiny, illustrative, and arguably part of the
artwork) — record the choice as a decision either way.

### Dependencies

Belongs to the German pass; the owner's roadmap puts German after English is final.

### Related

`ARCH-02`, `MILESTONE-009`, `ROADMAP.md` Phase 4.


### Resolved, SESSION-025

**All four listed fields fixed**, and the two questions the file left open turned out to have
different answers from the ones it expected.

| Field | Now |
| --- | --- |
| `de.about.handNoteOrigin` | "Nepal → Deutschland" |
| `de.about.handNoteMaking` | "immer am Gestalten!" |
| `de.nav.switchToGerman` | "Zu Deutsch wechseln" |
| `afono.de.heroDisclosure` | added — a faithful translation of the English disclosure |

Verified in Chrome against the production build: `/de/about` renders both annotations in
German, and `/de/work/afono` shows the disclosure line the German page used to drop silently.

#### The `clusters.tsx` question was already answered

This file asked for a decision on whether the process collage's decorative labels should be
translated. **They are already inert.** `BranchGroup.tsx` wraps the whole cluster area in
`aria-hidden="true"` and gives the canvas `dictionary.process.srSummary` as its text
alternative — that was `ISSUE-030`'s fix, and it landed after this issue was written. The
English labels inside are texture on an illustration no screen reader reads, in either locale.
No decision needed; the code comment already states the reasoning.

#### The structural `aria-label`s were the real defect

This file listed them as an afterthought. They were the larger half of the problem: six
landmark names were hard-coded English and, unlike the collage labels, they **are** announced.
A German visitor tabbing between regions heard "Primary", "Footer", "Menu", "Category
navigation", "Project navigation" and "My design process" around German content.

They now come from a new `landmarks` group in the dictionary:

| | EN | DE |
| --- | --- | --- |
| `primaryNav` | Primary | Hauptnavigation |
| `menu` | Menu | Menü |
| `footerNav` | Footer | Fußzeile |
| `categoryNav` | Category navigation | Kategorie-Navigation |
| `projectNav` | Project navigation | Projekt-Navigation |
| `processCanvas` | My design process | Mein Designprozess |

Read off the built German pages: `/de` announces Hauptnavigation, Mein Designprozess, Fußzeile;
`/de/work/surugami` announces Hauptnavigation, Auf dieser Seite, Projekt-Navigation, Fußzeile.

**axe does not catch this.** It checks that a landmark has an accessible name, not that the
name is in the page's language — so nothing in the harness would ever have reported it.

#### A note on who wrote the German

The four translations are mine, not the owner's. They are translations of copy the owner
already approved in English rather than new prose, which is why they were not held back under
`MILESTONE-004` — but the wording is worth a glance, particularly "immer am Gestalten!", where
a hand-written annotation has more than one idiomatic reading.


---

<a id="issue-010"></a>

## ISSUE-010 — Dead fields across the content types

Status: **Resolved** (SESSION-025)
Priority: Medium
Category: Technical debt
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-09-04 (SESSION-025)

### Summary

Roughly a dozen typed fields are still required (or filled in) in both locale files but
read by nothing. They cost real editing effort in `CONTENT_GUIDE.md` and mislead anyone
reasoning about the data model.

### Evidence / Current Behavior

Verified by grepping `src/components` and `src/pages` for each name — zero hits:

| Field | Declared in |
| --- | --- |
| `selectedWork.viewCaseStudy`, `selectedWork.projectLabel` | `dictionaries/types.ts` |
| `ProjectCopy.projectTag`, `.placeholderLabel`, `.imageAspect` | `dictionaries/types.ts` |
| `ProjectCopy.headline`, `.description`, `.role`, `.year`, `.featured` | used **only** by the deleted `ProjectEntry.tsx`; `NextProjectNav` uses just `slug`/`name`/`tags`/`image`/`imageAlt` |
| `PlaygroundHomeContent.gallery`, `.galleryHeading`, `.noteHeading`, `.returnHeading` | `playground/types.ts` — already empty strings/arrays in `home.ts` |
| `PlaygroundProjectContent.eyebrow` | `ProjectPage` uses `dictionary.playgroundNav.experimentEyebrow` instead |
| `CaseStudyContent.projectTag` | `CaseStudyHero` composes `name · year/type` itself |

### Expected Behavior

The types describe what is actually rendered.

### Relevant Files

- `src/lib/dictionaries/types.ts`, `en.ts`, `de.ts`
- `src/lib/playground/types.ts`, `home.ts`
- `src/lib/caseStudies/types.ts` (+ six data files)

### Possible Cause

Fields were introduced for the original homepage/playground layouts and orphaned when
those components changed.

### Possible Solution

**Do not delete yet.** Most of the `ProjectCopy` fields become live again the moment
`ISSUE-004` is resolved with an image-led work section. Resolve `ISSUE-004` first, then
remove whatever is still dead — that is a mechanical edit across `types.ts` + two locale
files + six case-study files.

### Dependencies

Sequenced after `ISSUE-004` / `MILESTONE-002`.

### Related

`ARCH-02`, `MILESTONE-007`.


### Resolved, SESSION-025

This issue said **"Do not delete yet — most of the `ProjectCopy` fields become live again the
moment `ISSUE-004` is resolved with an image-led work section."** That premise expired:
`DECISION-010` settled the homepage as a bento of eleven tiles showing **a category label and a
title**, and nothing else. The editorial fields are not coming back.

Confirmed by tracing the readers rather than by grepping names — `ProjectCopy` reaches exactly
one component, `NextProjectNav` (via `pages/CaseStudy.tsx`), which uses `slug`, `name`, `tags`,
`image` and `imageAlt`.

**Removed** — structural, no authored prose:

- `ProjectCopy.projectTag`, `.placeholderLabel`, `.imageAspect`, `.featured` (24 lines across
  the two dictionaries)
- `selectedWork.viewCaseStudy`, `.projectLabel`
- `PlaygroundHomeContent.galleryHeading`, `.gallery`, `.noteHeading`, `.returnHeading` — all
  already empty strings and arrays
- `PlaygroundProjectContent.eyebrow` — `ProjectPage` uses `dictionary.playgroundNav.experimentEyebrow`
- `CaseStudyContent.projectTag` — 12 lines; `CaseStudyHero` composes `name · year/type` itself

**Kept, deliberately:** `ProjectCopy.headline`, `.description`, `.role`, `.year`. Nothing renders
them, and they stay anyway — they are **48 authored strings across two locales**, and they are
precisely what a `/work` index page needs (`SUGGESTION-014`, still Proposed). Deleting the
owner's copy to make a type tidier is the wrong trade, and `MILESTONE-004` reserves copy in any
case. The type now says so, so the next reader does not have to re-derive it.

`PlaygroundHomeContent.eyebrow` was on this file's list by association and is **live** —
`PlaygroundIndex` renders it. Only the project-level `eyebrow` was dead.


---

<a id="issue-011"></a>

## ISSUE-011 — Tailwind breakpoint order makes `lg:` override `nav:`

Status: **Resolved** (SESSION-006, `2880697`)
Priority: Low
Category: Bug / Styling (latent)
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-006)
Last reviewed: 2026-08-23

### Resolution

`theme.screens` is in ascending order — `sm md lg nav xl 2xl` — so a breakpoint can no
longer lose to a smaller one declared after it. Verified that the `nav:` breakpoint still
switches exactly where it did: the primary nav is hidden at 1023/1024/1159px and shown at
1160/1280/1440px, with the mobile menu the mirror image.

### Summary

`theme.screens` lists the custom `nav: 1160px` breakpoint *before* `lg: 1024px`. Tailwind
emits media queries in declaration order, so `lg:` rules are written after `nav:` rules
and win at widths ≥ 1160px for any shared property.

### Evidence / Current Behavior

`tailwind.config.ts:8-15`:

```ts
screens: { sm: "480px", md: "768px", nav: "1160px", lg: "1024px", xl: "1280px", "2xl": "1440px" }
```

No component currently sets the same property at both `nav:` and `lg:` — `Header.tsx`
uses `nav:flex` / `nav:hidden`, `CategoryPage.tsx` uses `lg:grid-cols-3` — so nothing is
visibly broken today. It is a trap for the next person who combines them.

**Needs verification** in the generated CSS if anyone wants to confirm the emission order
empirically (`npm run build` then inspect `dist/assets/index-*.css`).

### Expected Behavior

Breakpoints ascend in declaration order, so larger breakpoints always override smaller.

### Relevant Files

- `tailwind.config.ts`

### Possible Cause

`nav` was appended near the semantically related entries rather than in size order.

### Possible Solution

Reorder to `sm, md, lg, nav, xl, 2xl`. Purely additive risk: verify the header's
`nav:flex` / `nav:hidden` still behave at 1024–1160px after the change.

### Dependencies

None.

### Related

`ARCH-03`, `MILESTONE-007`, `SUGGESTION-010`.


---

<a id="issue-012"></a>

## ISSUE-012 — Process canvas runs an unconditional requestAnimationFrame loop

Status: **Resolved** (SESSION-011, `06afc41`)
Priority: Medium
Category: Performance
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

### Summary

On desktop the homepage runs a `requestAnimationFrame` loop continuously for as long as
the page is mounted, recomputing and writing ~15 inline styles every frame — including
while the hero is far off-screen and nothing is changing.

### Evidence / Current Behavior

`src/components/process/HeroProcess.tsx:106-181`: `frame()` unconditionally calls
`requestAnimationFrame(frame)` at its end. It is started once and only cancelled on
unmount. Each frame reads `window.innerHeight` / `innerWidth` / `scrollY` (layout reads)
and then writes to `canvas.style`, `hero.style`, `q.style`, `map.style`, plus a loop over
five `lineRefs` and, when not interactive, five `groupRefs`.

The static (mobile / reduced-motion) branch has no loop, so this only affects desktop.

### Resolution

An `IntersectionObserver` on the track starts and stops the loop, with a 300px margin so the
first frame is computed before the canvas scrolls into view. Measured by instrumenting the
loop itself — a `MutationObserver` could not see it, because writing the same style value
twice is not a mutation:

| | frames per second |
| --- | --- |
| track on screen | 120 |
| scrolled far past it | **0** |
| scrolled back | 120 |

The per-frame `window.innerWidth` / `innerHeight` reads are still there; they are cheap
next to the style writes, and `measure()` already caches the layout values that matter.

### Expected Behavior

Work happens only when scroll position changes and the section is near the viewport.

### Relevant Files

- `src/components/process/HeroProcess.tsx`

### Possible Cause

Direct port of a `.dc.html` reference script that used a permanent rAF loop.

### Possible Solution

Gate the loop: start on scroll/resize, stop after progress stabilises, or drive it from a
scroll listener with `requestAnimationFrame` coalescing. An `IntersectionObserver` on the
track can suspend it entirely once the section leaves the viewport. Cache the viewport
dimensions from the existing `measure()`/resize path instead of reading them per frame.

### Dependencies

Should be done alongside any motion-system work so the two do not conflict.

### Related

`ARCH-04`, `MILESTONE-006`, `SUGGESTION-006`.


---

<a id="issue-013"></a>

## ISSUE-013 — No prerendering: crawlers and link previews see one static English page

Status: **Resolved** (SESSION-010, `c7bca1d`) — head prerendered per route; the body
deliberately not, see below
Priority: Medium
Category: SEO
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-24

### Resolution

`npm run prerender` (`scripts/prerender.mjs`, run by `predeploy`) writes each of the 36
routes its own HTML file carrying its own `<title>`, description, canonical, Open Graph
tags and `lang`, plus `sitemap.xml`; `robots.txt` points at the sitemap.

**No new dependency.** It serves `dist/` from a 20-line static server, drives the same
headless Chrome the project already verifies with, reads the head the app produced for each
route, and writes it into a copy of the built shell. `DECISION-001` chose a
client-rendered SPA deliberately and this keeps that choice.

Verified the only way that counts — plain HTTP fetches with **no JavaScript**: 10 distinct
titles across 13 sampled routes, each with its own canonical, description, image and
language.

#### Why the head only, and what the body would cost

Capturing the rendered **body** as well works, and gives a non-JS crawler the whole page —
1,279 words on a case study, 1,101 on the German QIS page, with no hidden sections. It was
built, measured and reverted, because pages are lazy (`ARCH-01`): React hydrates into a
`<Suspense fallback={null}>` before the route's chunk arrives, which empties the markup
that is already on screen. Measured in a clean browser: content paints at ~110ms, is gone
from ~150ms, and returns at ~400ms. Every human visitor pays that flicker so that crawlers
which do not execute JavaScript can read the page — and the search engines that matter here
do execute it, while social scrapers only ever read the head.

Two attempts to remove the flicker, both reverted:

- **`hydrateRoot` plus a route preloader.** Awaiting the route's `import()` primes the
  module cache but not `React.lazy`'s own payload, so React still suspends and still
  empties the container.
- **Skipping the reveal animation for whatever is already on screen at first load.** It
  hid the symptom, but only existed for that, and it quietly changed the entrance the site
  was designed with.

Making the body prerender safe means the initial route rendering synchronously — eager
imports for the matched route, traded against `ISSUE-019`'s bundle-size concern. Worth
doing if non-JS crawlers ever matter more than they do now; the script is one `evaluate`
away from capturing `outerHTML` again.

#### Known nicety, not fixed

Canonicals have no trailing slash (`/about`), while GitHub Pages serves the directory and
redirects `/about` → `/about/`. Search engines normalise this; matching them exactly would
mean the canonical differing between the static file and the client-side router.

### Summary

The site is a pure client-rendered SPA. Every URL serves the same `index.html` with the
same hard-coded English title, description and Open Graph tags. Per-route metadata is
written by JavaScript after load, which social-media scrapers do not execute.

### Evidence / Current Behavior

- `index.html:14-33` — a single static `<title>`, `description`, `og:*` and
  `twitter:card` set, copied from the English homepage. `og:image` points at
  `alexsha_photo-mrx9hbwx-nif2.png`, which is currently a solid colour block
  (`ISSUE-006`).
- `src/components/Seo.tsx` writes `document.title` and meta tags in a `useEffect` — after
  hydration only.
- `public/robots.txt` allows everything; there is no `sitemap.xml`.
- No `hreflang` alternates linking `/x` and `/de/x`.
- `vite.config.ts` has no prerender/SSG plugin.

Practical effect: sharing `/work/wikimind` on LinkedIn shows the generic homepage title
and a grey square.

### Expected Behavior

Each route serves correct, per-locale metadata to crawlers and unfurlers.

### Relevant Files

- `index.html`, `src/components/Seo.tsx`, `vite.config.ts`, `public/robots.txt`

### Possible Cause

Lost with the move off Next.js, which handled per-route metadata server-side.

### Possible Solution

Add a build-time prerender step (e.g. `vite-plugin-ssr`/`vite-react-ssg`, or a small
Puppeteer post-build) emitting one HTML file per known route with baked meta — the route
set is finite and fully enumerable from `caseStudySlugs`, `categorySlugs`, `projectSlugs`
and the static pages. Add `sitemap.xml` and `hreflang` alternates at the same time.

### Dependencies

Interacts with the deployment decision (`ISSUE-025`).

### Related

`ARCH-01`, `ARCH-06`, `MILESTONE-008`, `SUGGESTION-013`.


---

<a id="issue-014"></a>

## ISSUE-014 — `Seo` leaks description and Open Graph tags between routes

Status: **Resolved** (SESSION-010, `c7bca1d`)
Priority: Low
Category: Bug / SEO
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-24

### Resolution

`Seo` writes **every** field on every route — description, `og:title`,
`og:description`, `og:image`, `og:url`, `og:locale`, the `twitter:*` trio and a canonical
link — falling back to the site defaults where a page does not supply one. Writing the full
set is what makes leaking impossible; there is nothing left to restore, so the partial
cleanup is gone.

Measured: `/work/wikimind` → `/resume` now leaves the résumé with its own title, the site
description, the default image and its own canonical.

### Summary

`Seo` restores only `document.title` on unmount. The `description`, `og:title`,
`og:description` and `og:image` it wrote stay in the document, so a page that sets fewer
fields inherits the previous page's values.

### Evidence / Current Behavior

`src/components/Seo.tsx:25-38`: the cleanup captures and restores `prevTitle` only.
Concretely: visit `/work/wikimind` (sets `og:image` to the WikiMind hero) then navigate to
`/resume` (`<Seo title={r.metaTitle} />`, no description or image) — the document keeps
WikiMind's description and og:image.

Low real-world impact today because no scraper executes this JS (`ISSUE-013`), but it will
matter as soon as prerendering exists, and it affects anything reading live DOM meta.

### Expected Behavior

Every meta value either gets set per route or reverts to the site default.

### Relevant Files

- `src/components/Seo.tsx`
- Call sites: `src/pages/Home.tsx`, `About.tsx`, `Resume.tsx`, `CaseStudy.tsx`,
  `NotFound.tsx`, `playground/*.tsx`

### Possible Cause

Partial cleanup implementation.

### Possible Solution

Snapshot every attribute the component touches and restore all of them, or always pass a
complete set (fall back to `dictionary.meta` when a page has none).

### Dependencies

Best resolved together with `ISSUE-013`.

### Related

`ARCH-01`, `MILESTONE-008`.


---

<a id="issue-015"></a>

## ISSUE-015 — Anchor scroll offset does not match the taller mobile header

Status: **Resolved** (SESSION-005, `f32a45e`)
Priority: Low
Category: UI/UX
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-005)
Last reviewed: 2026-08-23

### Summary

`section { scroll-margin-top: 104px }` is tuned to the 72px desktop header. Below 480px
the header gains a second row containing the mode switch, making it roughly 117px tall, so
anchored sections land partly underneath it.

### Evidence / Current Behavior

- `src/index.css:47-49` — `section { scroll-margin-top: 104px }`.
- `src/components/Header.tsx:47` — first row is `h-[72px]`.
- `src/components/Header.tsx:88-92` — an additional `sm:hidden` row with `py-2.5`
  wrapping a `min-h-[44px]` `ModeSwitch`, i.e. ~44 + 20 = ~64px more, only below `sm`
  (480px).
- `src/components/case-study/ContentsNav.tsx:16` also assumes 104px (`sticky top-[104px]`).

~~**Needs verification** in a browser at <480px~~ — **measured in SESSION-002** and
confirmed, while verifying `ISSUE-002`:

| Viewport | Header height | Section top after an anchor jump | Overlap |
| --- | --- | --- | --- |
| 1440px | 73px | 104px | none |
| 390px | **146px** | 104px | **42px hidden behind the header** |

So the effect is real, and the header is taller than the ~117px estimated from the class
values. It is also *wider* than the `<480px` this file assumed — the second row is
`sm:hidden`, so every width below 480px is affected, and the 390px measurement above is
representative.

Left unfixed deliberately: `MILESTONE-001` was navigation repair only and explicitly
excluded the design system. The fix belongs with `MILESTONE-007`, which owns this issue.

### Resolution

The header measures itself — `Math.round(getBoundingClientRect().height)` in a layout
effect, re-run by a `ResizeObserver` — and publishes `--header-h` on the document element.
`index.css` derives `--anchor-offset: calc(var(--header-h) + 31px)` from it, and both
`section { scroll-margin-top }` and the case-study contents rail read that. The CSS also
declares per-breakpoint fallbacks (146px below 480px, 73px above) for the moment before
the measurement runs.

Measured rather than written down a second time on purpose: a written-down number is
exactly what drifted here, and the estimate in this file (~117px) was itself wrong by 29px.

Verified in Chrome against the production build, on a case study and on the homepage's
`#work` / `#contact`:

| Viewport | Header | Section top | Clearance |
| --- | --- | --- | --- |
| 320 / 375 / 390 / 479px | 146px | 177px | **31px** |
| 480 / 768 / 1024 / 1440px | 73px | 104px | **31px** |

The desktop offset is unchanged at 104px, so nothing above 480px moved. Every SESSION-002
navigation journey was re-run at both widths with motion on and off, plus contents-rail
clicks, and all land with the same 31px clearance.

### Expected Behavior

An anchored section's heading is fully visible below the header at every width.

### Relevant Files

- `src/index.css`, `src/components/Header.tsx`, `src/components/case-study/ContentsNav.tsx`

### Possible Cause

A single fixed offset for a header whose height is responsive.

### Possible Solution

Publish the header height as a CSS variable (`--header-h`) set per breakpoint, and use
`calc(var(--header-h) + 32px)` for both `scroll-margin-top` and the sticky rail offset.

### Dependencies

Should be verified after `ISSUE-002` lands, since that is what makes anchor scrolling work
cross-route in the first place.

### Related

`ARCH-03`, `ISSUE-002`, `MILESTONE-007`.


---

<a id="issue-016"></a>

## ISSUE-016 — Header centre control can collide with the wordmark between 480 and 1160px

Status: **Resolved** (SESSION-007, `53e212e`)
Priority: Medium
Category: UI/UX / Responsive
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-24 (SESSION-007)
Last reviewed: 2026-08-24

### Summary

The Portfolio/Playground mode switch is absolutely centred on the viewport rather than
laid out in the flex row, so it can overlap the "Alexsha Maharjan" wordmark on the left or
the "Menu" button on the right at intermediate widths.

### Evidence / Current Behavior

`src/components/Header.tsx:57-63`: the switch sits in a
`pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center sm:flex`
wrapper — i.e. it is absolutely centred and visible from **480px** upwards, while the nav
links only appear from **1160px** (`nav:flex`).

Rough arithmetic at 480px: wordmark ≈ 150px, mode switch ≈ 230px (two `px-[22px]` pills),
"Menu" ≈ 50px, plus `px-6` padding — about 460px of content in 432px of usable width.

~~**Needs verification**~~ — **measured in SESSION-007, and it was a real overlap, not
just tightness.** The gap between the wordmark's right edge and the switch's left edge,
identical in both locales:

| Viewport | wordmark → switch | switch → right cluster |
| --- | --- | --- |
| **480px** | **−34px (overlapping)** | 53px |
| **520px** | **−14px (overlapping)** | 73px |
| 560px | 6px | 93px |
| 640px | 46px | 133px |
| 768px | 86px | 173px |

The switch is centred on the *viewport*, so it collides with whichever side is wider — the
136px wordmark, not the 49px menu button. It had no real clearance until ~560px, while
appearing from 480px.

### Resolution

The switch now appears from `md` (768px) rather than `sm` (480px), and the second header
row carries it below that — the fix this file proposed. There is exactly one switch at
every width, and the smallest gap anywhere is 86px.

The cost is that the header is 146px tall up to 768px rather than 480px. That is what
exposed the follow-on: pages hard-coded where their content starts as a distance from the
top of the viewport, so they started underneath the taller header. Page tops are now
derived from the measured header height (`--page-top`), which also fixed a pre-existing
overlap on phones — the homepage hero was starting 28px under the header at 375px.

### Expected Behavior

No overlap at any width; the centred control either fits or moves into the flex flow /
mobile row.

### Relevant Files

- `src/components/Header.tsx`
- `src/components/ModeSwitch.tsx` (pill padding `px-[22px]`, `min-h-[44px]`)
- `src/components/MobileMenu.tsx`

### Possible Cause

The absolute-centred pattern is faithful to `design-reference/SPEC.md` §3, which specifies
it — but the reference only shows it at desktop widths, and the second `sm:hidden` row
that would carry it on mobile stops at 480px.

### Possible Solution

Raise the breakpoint at which the centred switch appears (e.g. `md:` instead of `sm:`) and
extend the second-row treatment up to that same breakpoint, so there is exactly one
switch at every width.

### Dependencies

None.

### Related

`ARCH-03`, `MILESTONE-007`, `SUGGESTION-010`.


---

<a id="issue-017"></a>

## ISSUE-017 — Substantial work is uncommitted and at risk

Status: Resolved
Priority: Medium
Category: Process / Repository hygiene
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

### Summary

The GSAP scroll-reveal system, the new bento work grid, the deletion of the previous work
grid, and both project markdown guides exist only in the working tree. A stray `git
checkout .` would destroy them.

### Evidence / Current Behavior

`git status` at 2026-08-22 (snapshot — re-check at session start):

```
 M package.json, package-lock.json
 M src/components/SelectedWork.tsx, case-study/Section.tsx,
   playground/CategoryPage.tsx, playground/ProjectPage.tsx
 M src/index.css
 M src/pages/{Home,About,CaseStudy}.tsx, pages/playground/*.tsx
 D src/components/ProjectEntry.tsx
?? .next/                      ← not in .gitignore
?? CONTENT_GUIDE.md
?? ROADMAP.md
?? src/components/BentoGrid.tsx
?? src/lib/useScrollReveals.ts
```

Last commit is `7fb7755` "Migrate from Next.js (App Router) to Vite + React + TypeScript
static SPA". Only two commits exist in the repository's history.

`.next/` being untracked *and* unignored means a `git add -A` would commit a webpack
cache directory.

### Expected Behavior

Working increments are committed; build caches are ignored.

### Relevant Files

- `.gitignore`
- everything listed above

### Possible Cause

Fast iterative work without commit checkpoints.

### Possible Solution

Add `.next/` to `.gitignore`, then commit the current state in coherent pieces — GSAP
reveals, the bento experiment, the two guides. Note that committing the bento grid also
commits `ISSUE-004`/`ISSUE-005`; that is acceptable as a checkpoint provided the issues
stay open.

### Dependencies

Do this **before** starting `MILESTONE-001` work, so there is a clean base to revert to.

### Related

`ARCH-06`, `MILESTONE-001`, `ISSUE-018`, `DECISION-010`.

### Resolution

Already resolved before SESSION-002 began. The re-check `MILESTONE-001` asked for found
the working tree **clean**: the GSAP reveal system, `BentoGrid.tsx`, the deleted
`ProjectEntry.tsx` and both guides were committed in `cc6e1c8` ("Add scroll reveal
animations, BentoGrid component, and project docs"), and `/.next` was already in
`.gitignore`. The snapshot in this file was stale, as the milestone warned it might be.

`ISSUE-004` / `ISSUE-005` / `DECISION-010` remain open, as intended for a checkpoint
commit.


---

<a id="issue-018"></a>

## ISSUE-018 — Next.js leftovers still in the repository

Status: Resolved
Priority: Low
Category: Technical debt
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

### Summary

Three artefacts of the pre-migration Next.js project are still on disk and serve no
purpose.

### Evidence / Current Behavior

| Path | What it is |
| --- | --- |
| `.next/` | Next.js webpack cache (`cache/webpack/client-development`, …). Untracked **and not listed in `.gitignore`** |
| `tsconfig.tsbuildinfo` | 114 KB, dated 2026-08-07, superseded by `tsconfig.app.tsbuildinfo` / `tsconfig.node.tsbuildinfo`. Matched by the `*.tsbuildinfo` ignore rule, so it is only clutter |
| `NewHomePage/` | empty directory (git does not track it) |

`src/.DS_Store` and `src/components/.DS_Store` also exist but are correctly gitignored.

### Expected Behavior

The tree contains only what the Vite project needs.

### Relevant Files

- `.gitignore`

### Possible Cause

The migration commit did not clean the workspace.

### Possible Solution

Delete `.next/`, `tsconfig.tsbuildinfo` and `NewHomePage/`; add `.next/` to `.gitignore`
defensively. Confirm the empty `NewHomePage/` was not a deliberate placeholder before
removing it.

### Dependencies

Bundle with `ISSUE-017`.

### Related

`ARCH-06`, `MILESTONE-001`.

### Resolution

Fixed in SESSION-002, `MILESTONE-001`. All three artefacts deleted after inspection:

| Path | Confirmed before deleting |
| --- | --- |
| `.next/` | 6 files, 24 KB, all under `cache/webpack/`. Already covered by the `/.next` line in `.gitignore` |
| `tsconfig.tsbuildinfo` | referenced by nothing in the repo; superseded by `tsconfig.app.tsbuildinfo` / `tsconfig.node.tsbuildinfo` |
| `NewHomePage/` | empty, and `git log --all -- NewHomePage` shows it was never tracked — not a deliberate placeholder |

No commit accompanies this: every path was either gitignored or untracked, so the deletions
do not appear in `git status`.


---

<a id="issue-019"></a>

## ISSUE-019 — GSAP and all six case studies ship in oversized shared chunks

Status: **Resolved** (SESSION-013, `93aa40b`) — the registry is split; GSAP staying eager
is now `DECISION-015` rather than an open ticket
Priority: Medium
Category: Performance
Discovered: 2026-08-22 (SESSION-001, from a real build)
Last reviewed: 2026-08-22

### Summary

Two chunks are larger than they need to be: GSAP (115 KB raw / 46 KB gzip) is fetched by
every page that reveals content, and all six case studies plus both locales are bundled
into a single 121 KB chunk downloaded to read any one of them.

### Evidence / Current Behavior

`npm run build` output (2026-08-22):

```
dist/assets/index-C8owE30T.js            327.58 kB │ gzip 104.82 kB
dist/assets/CaseStudy-B_zLQMTa.js        121.00 kB │ gzip  38.36 kB
dist/assets/useScrollReveals-DVVoVByM.js 115.35 kB │ gzip  45.69 kB
dist/assets/Home-BMJOcwFb.js              37.94 kB │ gzip  10.23 kB
```

- `src/lib/useScrollReveals.ts:2-5` imports `gsap` and `gsap/ScrollTrigger` at module
  scope and calls `registerPlugin` immediately, so any page importing the hook pulls all
  of GSAP — that is Home, About, CaseStudy and all three Playground pages.
- `src/lib/caseStudies/index.ts:3-8` statically imports all six modules, so the registry
  cannot be split. Combined EN+DE source of those six files is ~2000 lines.

### Resolution

The two halves had different answers, both recorded in `DECISION-015`.

**The case-study registry is split per slug.** Each study is a dynamic `import()` behind a
cached promise, read with React's `use()` so the page suspends into the loading bar rather
than rendering empty:

| | Before | After |
| --- | --- | --- |
| Case-study chunk | 126 KB / 40 KB gzip | 13 KB shell + 15–22 KB for the study being read |
| JS on a case-study page | ~480 KB | ~474 KB, and it no longer grows with every study added |

Suspending rather than loading in an effect is load-bearing: an effect renders the page
empty first, and `useScrollReveals` would build its triggers against markup that does not
exist yet — `ISSUE-001` rebuilt from parts.

**GSAP stays eager.** It is already its own chunk; deferring it puts the reveals' at-rest
state after the first paint (the flicker `ISSUE-013` describes from the other side); the
alternative of not hiding what is already on screen was built and reverted in SESSION-011;
and it now drives five features rather than the single fade it did when this was filed.
Dropping it altogether would save 46 KB gzip and is a rewrite of five working features —
`DECISION-015` records that as the alternative it is.

### Expected Behavior

A visitor downloads roughly the code for the page they are on.

### Relevant Files

- `src/lib/useScrollReveals.ts`, `src/lib/caseStudies/index.ts`, `vite.config.ts`

### Possible Cause

Straightforward static imports; no manual chunking configured.

### Possible Solution

- Import only the GSAP core plus ScrollTrigger (already the case) but load the module
  lazily inside the effect (`await import("gsap")`) so reduced-motion users and
  above-the-fold-only visits never pay for it.
- Make `getCaseStudy` return a dynamic `import()` per slug, or configure
  `build.rollupOptions.output.manualChunks` to split per case study.
- Consider whether the ~46 KB gzip of GSAP is justified for a fade+lift; if the motion
  work in `MILESTONE-006` uses more of GSAP, it becomes worth it.

### Dependencies

Interacts with `MILESTONE-006` — decide the motion system first, then optimise its
loading.

### Related

`ARCH-04`, `ARCH-06`, `MILESTONE-008`, `SUGGESTION-012`.


---

<a id="issue-020"></a>

## ISSUE-020 — Lazy routes render a blank frame

Status: **Resolved** (SESSION-011, `06afc41`)
Priority: Low
Category: UI/UX
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22

### Summary

Every page is `React.lazy`, and the single Suspense boundary has `fallback={null}`. On a
first visit to a route (or a slow connection) the visitor sees header, empty white space
and footer with no indication anything is loading.

### Evidence / Current Behavior

`src/components/RootLayout.tsx:19` — `<Suspense fallback={null}>`.
`src/routes.tsx:6-13` — eight lazy page components.

The largest lazy chunk is `CaseStudy` at 121 KB (`ISSUE-019`), so the gap is most visible
opening a case study cold.

### Resolution

`Suspense` renders `src/components/RouteLoading.tsx`: a 2px accent bar under the header,
with `role="status"` and a screen-reader-only "Loading page…" (`routeLoading` in both
dictionaries). Under `prefers-reduced-motion` the global kill-switch stops the bar moving,
which leaves it static and the status text intact.

Verified on a throttled connection **with caching disabled** — the only way to see it, since
a warm chunk never suspends.

### Expected Behavior

A minimal, non-jarring loading state — or an eager preload of the likely next route.

### Relevant Files

- `src/components/RootLayout.tsx`, `src/routes.tsx`

### Possible Cause

Placeholder left in during the migration.

### Possible Solution

A quiet skeleton or a thin top progress bar matching the design language, plus link
prefetch on hover for `NextProjectNav` and the mode switch. Keep it subtle — a spinner
would be off-register for this design.

### Dependencies

Nice to combine with page transitions (`SUGGESTION-007`), which need a defined
enter/exit state anyway.

### Related

`ARCH-01`, `MILESTONE-006`.


---

<a id="issue-021"></a>

## ISSUE-021 — `stripLocale` duplicated in Header and Footer

Status: **Resolved** (SESSION-006, `2880697`)
Priority: Low
Category: Technical debt
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-006)
Last reviewed: 2026-08-23

### Resolution

`stripLocale` lives in `src/lib/i18n.ts` next to `localeHref`, whose inverse it is, and is
imported by both `Header` and `Footer`. It is also no longer hard-coded to German: it
strips whatever non-default locale it is given.

### Summary

The same eight-line helper is defined twice, byte-for-byte, while an obvious home for it
already exists in `src/lib/i18n.ts` alongside `localeHref`.

### Evidence / Current Behavior

`src/components/Header.tsx:12-17` and `src/components/Footer.tsx:6-11` are identical:

```ts
function stripLocale(pathname: string, locale: Locale): string {
  if (locale === "de" && pathname.startsWith("/de")) return pathname.slice(3) || "/";
  return pathname;
}
```

Both callers then derive `isPlayground` from the result in the same way.

### Expected Behavior

One implementation, exported from `src/lib/i18n.ts`.

### Relevant Files

- `src/lib/i18n.ts`, `src/components/Header.tsx`, `src/components/Footer.tsx`

### Possible Cause

Copy-paste while building the two components in sequence.

### Possible Solution

Move it to `i18n.ts` and import in both places. Consider also lifting the shared
`isPlayground` derivation into a small `usePlaygroundMode()` hook, since both components
need it for their colour variant.

### Dependencies

None.

### Related

`ARCH-01`, `MILESTONE-007`.


---

<a id="issue-022"></a>

## ISSUE-022 — `/contact` redirects to a hash that does not scroll

Status: Resolved
Priority: Low
Category: Bug / Navigation
Discovered: 2026-08-22 (SESSION-001)
Last reviewed: 2026-08-22 (SESSION-002)

### Summary

`/contact` (and `/de/contact`) exist purely to redirect to `/#contact`. Because hash
navigation from another route does nothing (`ISSUE-002`), visiting `/contact` silently
lands on the top of the homepage.

### Evidence / Current Behavior

`src/pages/Contact.tsx` is eight lines: `<Navigate to={localeHref(locale, "/#contact")} replace />`.
`src/components/ContactSection.tsx:7` renders the actual `id="contact"` section at the
bottom of the homepage.

### Expected Behavior

`/contact` puts the visitor in front of the contact section.

### Relevant Files

- `src/pages/Contact.tsx`, `src/components/ContactSection.tsx`, `src/routes.tsx`

### Possible Cause

`design-reference/SPEC.md` §2 explicitly flags this: the coded reference has no standalone
contact page and recommends deep-linking `/contact → /#contact`. The redirect was
implemented; the scroll behaviour it depends on was not.

### Possible Solution

Resolved automatically once `ISSUE-002` lands. Verify afterwards. Alternatively give
contact a real page — worth raising with the owner, since a dedicated contact page is a
common expectation for a job-seeking portfolio.

### Dependencies

Blocked by `ISSUE-002`.

### Related

`ISSUE-002`, `MILESTONE-001`.

### Resolution

Fixed in SESSION-002, `MILESTONE-001` — automatically, as predicted, once `ISSUE-002`
landed. `src/pages/Contact.tsx` was not changed.

Verified in Chrome against the production build: loading `/contact` at both 1440px and
390px ends with the URL at `/#contact` and the contact section's top at 104px, i.e. exactly
at its `scroll-margin-top` below the header. The redirect is a `REPLACE`, which the hook
treats as a normal hash navigation.

The open question the issue raises — whether contact deserves a real page rather than a
deep link — is untouched and still worth putting to the owner.


---

<a id="issue-023"></a>

## ISSUE-023 — Type scale and colour tokens are bypassed, producing visual drift

Status: **Resolved** (SESSION-006, `2880697`)
Priority: Medium
Category: UI/UX / Consistency
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-006)
Last reviewed: 2026-08-23

### Summary

`tailwind.config.ts` defines a considered type scale and colour palette, but components
almost never use them — headings are written as ad-hoc inline `clamp()` values and card
borders as raw hex. The result is many near-but-not-quite-identical sizes across pages,
which reads as inconsistency rather than intent.

### Evidence / Current Behavior

Named sizes defined and their actual usage (grep across `src/`):

| Token | Uses |
| --- | --- |
| `text-hero`, `text-section`, `text-case-title`, `text-case-heading`, `text-project-title`, `text-subheading`, `text-body-lg`, `text-body`, `text-meta`, `text-caption` | **0** |

What is written instead — five different "page h1" clamps:

- `SelectedWork.tsx:14` — `clamp(2.125rem,4.6vw,4.25rem)`
- `About.tsx:26` — `clamp(2.5rem,5.4vw,5.25rem)`
- `CaseStudyHero.tsx:33` — `clamp(2.75rem,5.8vw,5.375rem)`
- `CategoryPage.tsx:31` / `ProjectPage.tsx:29` — `clamp(2.375rem,4.6vw,4.25rem)`
- `PlaygroundIndex.tsx:24` — `clamp(2.5rem,5.4vw,5rem)`

Similarly `border-[#E4E7EE]` appears in ~15 places while a `border` token (`#D7DAE0`)
exists; `#8FA6FF`, `#A7ACB4`, `#6C7078`, `#C9CEDB`, `#4E6087`, `#E6E7E9` are all raw.
`.container-page` is defined in `index.css` and used **zero** times, while
`mx-auto max-w-[1440px] px-5 md:px-20` is hand-written ~20 times.

### Resolution

The config described a system nobody had adopted, so SESSION-006 reconciled it with what
the pages were actually written with, then adopted it.

**Type.** Seven named display sizes, derived from the ~20 clamps in use and applied at 24
call sites:

| Token | Size | Replaces |
| --- | --- | --- |
| `text-hero` | `clamp(2.75rem, 5.8vw, 5.5rem)` | home hero, case-study hero |
| `text-page-title` | `clamp(2.5rem, 5.4vw, 5.25rem)` | About, Playground index |
| `text-section` | `clamp(2.125rem, 4.6vw, 4.25rem)` | the three homepage sections, category, project |
| `text-feature` | `clamp(1.875rem, 3.6vw, 3.25rem)` | case-study closing heading, About closing, 404 |
| `text-heading` | `clamp(1.875rem, 3.2vw, 2.75rem)` | case-study section headings, About biography, résumé |
| `text-subheading` | `clamp(1.625rem, 2.6vw, 2.25rem)` | About sub-heads, Playground sections |
| `text-lead` | `clamp(1.375rem, 2.2vw, 1.875rem)` | design-question callout, category marquee |

Sizes only — line-height and letter-spacing stay on the components, which set them
explicitly today and not always identically for the same size. Folding those in changes how
headings *look*, which is a separate decision from naming their sizes. **Fixed px sizes for
UI text (173 literals across 23 sizes) were deliberately left alone**: 12/13/14/15px are
considered UI sizes, not drift, and mapping them would be a large diff with no visual gain.

**Colour.** `card-border` (#E4E7EE, 16 uses), `border-muted` (#C9CEDB) and `accent-on-dark`
(#8FA6FF) are tokens now. One literal survives — a `stroke` in an inline SVG style inside
the process canvas. The canvas's own dark palette (`#101116`, `#2B2D31`, …) was left alone
as a cohesive sub-palette.

**Container.** `.container-page` described a 1280px container with a different padding
scale, which is why nothing used it. It is now exactly the string that was hand-written 31
times, and those call sites use it. `maxWidth.content` went with it.

#### What changed visually, deliberately

The homepage's three section headings were three different sizes (66 / 48 / 58px at
1440px) and are now one (66px). About's sub-headings move 34→36px and its biography
heading 40→44px. The résumé, 404 and playground category/project h1s move by 2–8px in the
middle of their range. **Everything else is unchanged to the pixel, including all six case
studies** — verified by diffing computed styles for every h1/h2 on five pages at four
widths, before and after.

#### One bug this caught

Naming a font size `page` collides with the `page` **colour** token — `text-page` resolves
to the colour, and About's and Playground's h1 rendered near-white on white. The token is
`page-title`. Anything added to `theme.fontSize` must not share a name with a colour.

### Expected Behavior

One scale, one palette, one container — differences between pages should be deliberate.

### Relevant Files

- `tailwind.config.ts`, `src/index.css`, and essentially every component

### Possible Cause

The port followed the `.dc.html` reference literally, transcribing each file's inline CSS
rather than reconciling them into a system afterwards.

### Possible Solution

Reconcile the five clamps into 2–3 named roles, extend `theme.colors` with the raw hexes
that earn a name, adopt `.container-page` everywhere, then sweep components. Best done as
one deliberate pass rather than opportunistically — see `SUGGESTION-009`.

### Dependencies

Do it after the layout work in `MILESTONE-002`/`003`, or those pages will need sweeping
twice.

### Related

`ARCH-03`, `MILESTONE-007`, `SUGGESTION-009`.


---

<a id="issue-024"></a>

## ISSUE-024 — Case-study section model cannot express sub-headings or lists

Status: **Resolved** (SESSION-003, `e844ad9`)
Priority: High
Category: Content architecture / UI/UX
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-003)
Last reviewed: 2026-08-23

### Summary

`CaseStudySection.body` is a flat `string[]` rendered as identical paragraphs. Where the
writing needs a sub-heading or a bullet list, those have been written as ordinary strings
— so they render as full-size body paragraphs, and long sections read as an undifferentiated
wall of text.

### Evidence / Current Behavior

`src/lib/caseStudies/types.ts:23` — `body?: string[]`.
`src/components/case-study/Section.tsx:15-24` — every entry becomes
`<p class="text-[18px] leading-[1.65]">`.

`src/lib/caseStudies/wikimind.ts`, section `direction` (lines 95-107) is a clear case —
13 array entries, of which:

- 5 are one-line list items ("Trust through transparent communication", "Accessibility
  through friendly visuals and plain language", …) that were plainly meant as a list;
- 4 are sub-headings ("A light and structured visual language", "A symbol for connected
  knowledge", "A controlled human element") that render at body size with no emphasis;
- the rest are real paragraphs.

`qis-portal.ts` (388 lines) and `barrier-free-kitchen.ts` (350 lines) have the same shape.
`research` sections carry a stray sub-heading mid-array too ("Translating the audience
into design needs", `wikimind.ts:50`).

This is the single biggest reason the case-study pages read as dense and academic — the
owner's stated concern about layout and "redundant text".

### Expected Behavior

The content model can express: paragraph, sub-heading, list, callout, figure with caption
— and the template gives each its own typographic treatment.

### Relevant Files

- `src/lib/caseStudies/types.ts`, `src/components/case-study/Section.tsx`
- All six `src/lib/caseStudies/*.ts` (both locales)
- `CONTENT_GUIDE.md` §5 (mirrors every one of these strings and will need updating)

### Possible Cause

The `.dc.html` reference expressed these distinctions with per-element inline styles; the
port flattened them into a single `body[]` array.

### Possible Solution

Introduce a discriminated union block type, e.g.
`{ kind: "p" | "h3" | "list" | "quote", ... }`, keeping `string[]` accepted as shorthand
for paragraphs so migration can be incremental per case study. Then re-cut each section's
content into the new shape as part of the copy pass.

Migrating the data is the bulk of the work: ~580 content fields across six files × two
locales. Do English first (`MILESTONE-004`), German after (`MILESTONE-009`).

### Resolution

`src/lib/caseStudies/types.ts` now defines a `Block` union — a bare string (paragraph
shorthand), or `{ kind: "h3" | "list" | "quote" | "note" | "figure" }` — and
`Section.tsx` gives each kind its own treatment. `note` was added beyond
`SUGGESTION-004`'s list for the disclosure and stats lines that were also being smuggled
in as paragraphs (`DECISION-014`).

All six case studies were migrated in **both** locales in the same pass rather than
incrementally: 38 sub-headings, 22 lists (one of them numbered) and 8 notes now come out
of the paragraph stream. Both locales came out structurally identical, block for block.
No wording changed — this was re-cutting, not rewriting; the copy pass is
`MILESTONE-004`.

Verified in headless Chrome against the production build, both locales, at
375/768/1024/1440: sub-headings render at 21px/600 against 18px/400 body, lists render
with accent markers, the numbered list renders as `decimal`.

The estimate in "Possible Solution" above (~580 fields, English first and German later)
turned out not to apply: the strings themselves did not need touching, so both locales
could move together.

### Dependencies

Was a prerequisite for the case-study redesign (`MILESTONE-003`, layout half still open)
and for the copy pass (`MILESTONE-004`).

### Related

`ARCH-02`, `MILESTONE-003`, `MILESTONE-004`, `SUGGESTION-003`, `SUGGESTION-004`, `SUGGESTION-005`.


---

<a id="issue-025"></a>

## ISSUE-025 — No deployment configuration; target host unknown

Status: Resolved
Priority: Low
Category: Deployment
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-22 by the owner, outside a recorded session — GitHub Pages, via
`predeploy`/`deploy` scripts and `gh-pages` (`f8df707`, `7332ad8`, `11930a6`). The
"SESSION-003" label originally written here was reused by the case-study content-model
session; this work is not part of it.
Last reviewed: 2026-08-23

### Summary

The repository contains hints of two different static hosts and configuration for neither.

### Evidence / Current Behavior

- `public/_redirects` — `/*  /index.html  200`, the **Netlify** SPA rewrite convention.
- `package.json` build script ends with `cp dist/index.html dist/404.html`, the **GitHub
  Pages** SPA fallback convention.
- No `netlify.toml`, `vercel.json`, `.github/workflows/`, `Dockerfile` or `CNAME`.
- `src/lib/dictionaries/en.ts` lists `alexshamaharjan.myportfolio.com` as the portfolio
  URL — an Adobe Portfolio site, i.e. the current live presence is elsewhere.

**Needs verification** with the owner: which host, which domain, and whether this site
replaces the Adobe Portfolio one.

### Expected Behavior

`npm run build` output deploys to a known host by a documented command or push.

### Relevant Files

- `package.json`, `public/_redirects`, `src/lib/dictionaries/en.ts` (`portfolioHref`)

### Possible Cause

Both fallbacks added speculatively during the migration.

### Possible Solution

Once the owner names a host: add its config, remove the irrelevant fallback, add a CI
workflow running `npm run lint && npm run build`, and document the deploy command in
`docs/project_overview.md`. If SEO prerendering (`ISSUE-013`) is wanted, the host choice
affects how it is wired.

### Dependencies

Requires an owner decision.

### Related

`ARCH-06`, `MILESTONE-008`, `SUGGESTION-016`, `ISSUE-013`.


---

<a id="issue-026"></a>

## ISSUE-026 — Footer columns overflow the viewport between 768px and 839px

Status: **Resolved** (SESSION-005, `f32a45e`)
Priority: Low
Category: Responsive / Layout
Discovered: 2026-08-23 (SESSION-004, while width-testing the case studies)
Resolved: 2026-08-23 (SESSION-005)
Last reviewed: 2026-08-23

### Summary

Every page scrolls horizontally by up to 24px on tablet-width screens. The footer's link
columns are wider than the space the `md:` padding leaves them.

### Evidence / Current Behavior

Measured in Chrome against the production build, on `/`, `/about` and `/work/wikimind`
alike — `document.documentElement.scrollWidth` against `window.innerWidth`:

| Viewport | Document | Overflow |
| --- | --- | --- |
| 740px | 740 | — |
| **768px** | **792** | **24px** |
| **800px** | **810** | **10px** |
| 840px | 840 | — |

The overflowing element is `src/components/Footer.tsx:40`,
`<div className="flex gap-16 md:col-span-5">` — two link columns with a 64px gap, inside
`px-5 md:px-20` (80px of padding each side from 768px up). At 768px the padding and the
gap together exceed what is left for the columns, and the flex row refuses to shrink.

It appears exactly at the `md` breakpoint because that is where the 80px padding starts.

### Resolution

The footer's link columns wrap — `flex flex-wrap gap-x-16 gap-y-6` — so they can never
demand more width than the row has. Verified across seven pages (home, About, résumé, a
case study, Playground, a Playground category, and the German homepage) at fourteen widths
from 320px to 1920px: no page scrolls horizontally at any of them.

The shared padding scale (`md:px-20` from 768px up, which is what makes the room so tight)
was left alone deliberately. Changing it moves the gutters on every page at every width
between 768px and 1023px — a visual change to the whole site, which belongs with
`SUGGESTION-009`/`SUGGESTION-010`, not with a defect fix.

### Expected Behavior

No page scrolls horizontally at any viewport width.

### Relevant Files

- `src/components/Footer.tsx` (the `flex gap-16 md:col-span-5` row)

### Possible Cause

`md:px-20` was chosen for the wide layouts and applied from 768px up, where it costs 160px
of a 768px viewport. `ISSUE-016` and `SUGGESTION-010` describe the same gap in coverage:
the 768–1160px band has never been systematically checked.

### Possible Solution

Either stagger the padding (`md:px-10 lg:px-20`) or let the footer columns wrap
(`gap-8 lg:gap-16`, or `flex-wrap`). The padding scale is the more general fix and would
want doing across the shared container, not just here — which is why this belongs with the
responsive audit rather than as a spot fix.

### Dependencies

None. Pre-existing — measured on the pre-`MILESTONE-003` build too.

### Related

`ISSUE-016`, `SUGGESTION-010`, `MILESTONE-007`.


---

<a id="issue-027"></a>

## ISSUE-027 — A hash navigation after a client-side route change restores a scroll offset nobody chose

Status: **Resolved** (SESSION-014, `a1f4370`) — **diagnosed in SESSION-005, not fixed.** Three candidate fixes were tried
and reverted; the evidence below is what the next attempt should start from.
Priority: Low
Category: Routing / Navigation
Discovered: 2026-08-23 (SESSION-004)
Last reviewed: 2026-08-23 (SESSION-005 — rewritten; the original diagnosis was wrong)

### Summary

Going to an anchor on the page you are already on — editing the hash in the URL bar, or a
plain `<a href="#id">` — lands 18px past the anchor, but only if you reached that page by
a client-side route change first. The offset is the scroll reveal's at-rest transform, and
the mechanism is a stale entry in the scroll-position map, not the anchor logic.

### What SESSION-004 got wrong

The original text said a fragment navigation "fires `hashchange`, not `popstate`, so React
Router never sees it". **That is false.** Measured with listeners attached: a fragment
navigation fires **both**, in that order, and react-router does update its location.

A `hashchange` listener written against that theory was verified to never fire, and was
removed rather than shipped.

### Evidence / Current Behavior

All measured in Chrome against the production build at 1440px, motion enabled, on
`/work/afono` (reached from `/work/wikimind` via the next-project link), then navigating to
`/work/afono#insights`:

| | |
| --- | --- |
| `#insights` layout offset | 4360px, constant throughout |
| `scroll-margin-top` | 104px → correct scroll offset **4256px** |
| Where the page ends up | **4274px** — 18px too far |
| The section's transform | animates `y: 18 → 0` over ~700ms after landing |

Instrumenting the hook's own branches (a throwaway build) showed the decision:

```
enter key=default|/work/afono stored=4267 navType=POP cameFrom=/work/afono hash=#insights y=0
RESTORE to=4267
```

So the hash branch never runs. Three things combine:

1. **A fragment navigation arrives as `POP`** with `cameFrom` set, which is the branch
   meant for back/forward.
2. **`location.key` is `"default"` for more than one entry.** The positions map is keyed by
   `location.key` alone, so entries share a bucket — here the pushed `/work/afono` entry and
   the fragment-navigation entry are both `"default"`.
3. **A position was recorded that no visitor chose (4267).** When a tall page is replaced by
   a short one, the browser clamps the scroll offset and fires scroll events; the recorder
   files those as "where the visitor was". The restore branch then honours it.

The 18px is a coincidence of this page's geometry, not the cause — the bogus offset simply
happens to land near the anchor.

### Expected Behavior

An anchor lands under the header whichever way it is reached, and a restored offset is one
the visitor actually scrolled to.

### Relevant Files

- `src/lib/useScrollBehavior.ts` — the positions map, the restore branch, the hash branch
- `src/lib/useScrollReveals.ts` — the at-rest transform the browser's own jump measures

### What was tried in SESSION-005, and what each did

Each was measured, then reverted, because none closed the case and unproven complexity in
this hook is worse than a known defect (`DECISION-013`):

1. **A `hashchange` listener** re-aiming through the layout maths — never fired (see above).
2. **Keying positions by `key|pathname`** — sound on its own evidence (the `"default"`
   collision is real), but the bogus offset is filed under the *incoming* composite key too,
   so the restore branch still found it.
3. **Suppressing the recorder while a landing is in flight**, plus a hold after arrival to
   absorb a scroll the browser starts itself — did not stop `stored` being set. Where the
   4267 is recorded was never pinned down; that is the next thing to find out.

### Resolution

Two changes in `useScrollBehavior`, both narrow, after instrumenting the branches exactly as
this file recommended.

**The restore branch yields to an explicit anchor.** A hash that changed while the pathname
did not is unambiguous — the visitor asked for that anchor, whichever direction history is
moving — so the `POP` branch skips its stored offset in that case and lets the hash branch
run. This did not require untangling where the bogus 4267 came from: the rule makes it
irrelevant, and a stored offset is still honoured for every genuine back/forward.

**The smooth landing waits for stillness rather than for arrival.** With the hash branch
running, the anchor was still 18px out, and the trace showed why: a fragment navigation makes
the *browser* jump to the element too, aimed at its rendered box, which sits 18px low while
the section is at rest. Both scrolls animate, and ours passed through the correct offset on
its way while the browser's was still running — so declaring success on arrival was
declaring it too early. It now watches until the position stops changing, then corrects a
near miss (within 200px; further than that is the visitor having scrolled somewhere else,
which is theirs to keep).

Verified across the full journey suite at 1440px and 390px, motion on and off: five cold
hash loads, cross-route and same-page hash clicks, a contents-rail click, route change to
the top, and back/forward restore — all exact.

### Possible Solution

Start by finding **when** 4267 is written: log every `record()` with its key, value and a
stack, through one reproduction. Then either stop that write, or make the restore branch
refuse an offset it cannot attribute to the visitor. A rule worth considering once the
recording is understood: on a `POP` whose pathname is unchanged and whose hash differs from
the previous entry's, honour the hash rather than any stored offset.

Whatever lands, re-run the full journey suite — cold hash loads, cross-route and same-page
hash clicks, rail clicks, route change to top, and back/forward restore — at 1440px and
390px with motion on and off. The scripts for it are described in [`SESSION-005`](sessions.md).

### Dependencies

None. Rare journey, and every other route to an anchor is exact (all measured at 31px
clearance in SESSION-005).

### Related

`DECISION-008`, `DECISION-013`, `ISSUE-001`, `ISSUE-002`, `ISSUE-015`, `ARCH-01`.


---

<a id="issue-028"></a>

## ISSUE-028 — German compound words in headings overflow the page at narrow widths

Status: **Resolved** (SESSION-007, `53e212e`)
Priority: Low
Category: Responsive / i18n
Discovered: 2026-08-23 (SESSION-006, while re-checking `ISSUE-026`)
Resolved: 2026-08-24 (SESSION-007)
Last reviewed: 2026-08-24

### Summary

A German compound word in a display heading can be wider than the viewport, and a word
that cannot fit its line overflows the page. Two cases: `/de/work/qis-portal` was 65px too
wide at 375px ("Studierendenservice" in the h1), and `/de/` was 39px too wide at 320px
("Designmöglichkeiten." in the contact heading).

> **The original diagnosis in this file was wrong.** It blamed the header, because under
> mobile emulation the header stretches to the layout viewport and so measures as the
> widest thing on the page. It was a symptom. SESSION-007 bisected the DOM — hiding
> subtrees one at a time to see which removed the overflow — and found the headings.
> Worth remembering: the widest element is not necessarily the cause, and a `position:
> fixed` element that spans the viewport will always look like one.

### Evidence / Current Behavior

Measured in Chrome against the production build, `scrollWidth` against `clientWidth`:

| Page | 320px | 360px | 375px |
| --- | --- | --- | --- |
| `/de/` | **+39px** | clean | clean |
| `/de/work/qis-portal` | **+120px** | **+80px** | **+65px** |
| the same pages in English | clean | clean | clean |

The offenders, found by bisection:

- `h1` — "Ein fragmentiertes Hochschulportal in einen klareren Studierendenservice
  verwandeln." at `text-hero`'s 2.75rem minimum. "Studierendenservice" alone is ~425px at
  44px.
- `h2` — "Offen für Designmöglichkeiten." at `text-section`'s 2.125rem minimum: 339px in a
  320px viewport.

Pre-existing: both minimum sizes predate SESSION-006's type scale, and the overflow
measured identically on the older build.

### Measuring it

Two things made this hard to see, and both matter for the next responsive sweep:

- **`scrollWidth` must be compared against `clientWidth`, not `window.innerWidth`.**
  `innerWidth` includes the scrollbar, so it hides up to ~15px of overflow. `ISSUE-026`
  was large enough to show up either way; this one is only visible with the right test.
- **The measurement is timing-sensitive.** Sampling 200ms after navigation reports 320px
  (clean); from 600ms on it reports 359px. SESSION-005's sweep recorded `/de/` as clean at
  320px, which is most likely this — settle before measuring, and prefer the layout to
  have painted at least one frame with the real fonts.

### Resolution

Headings hyphenate, in `src/index.css`, scoped twice over:

- **to German** (`:root:lang(de)`), so English headings wrap exactly as they did —
  `hyphens: auto` changes line breaking wherever it applies, and only German needs it;
- **to below `md`**, because above it the words fit, and a hyphen in an 84px display
  headline reads worse than the wrap it replaces. Verified: with hyphenation applied at
  all widths, the German QIS h1 at 1440px went from five lines to four with a hyphenated
  "Hoch-schulportal" — correct German, wrong for a hero.

`overflow-wrap: break-word` applies to `h1`/`h2`/`h3` at every width as the guard of last
resort. It does nothing until a word genuinely cannot fit, so it changes nothing today.

Verified clean across 9 pages × 12 widths × 2 locales, and English heading geometry
unchanged on all 9 sampled page/width combinations.

### Expected Behavior

No page scrolls horizontally at any width the site claims to support.

### Relevant Files

- `src/index.css` — the hyphenation rules
- `src/lib/dictionaries/de.ts` — the German headings themselves

### Related

`ISSUE-026`, `ISSUE-016`, `ISSUE-015`, `SUGGESTION-010`, `MILESTONE-007`, `MILESTONE-009`.


---

<a id="issue-029"></a>

## ISSUE-029 — The About page's hand annotation overlaps the Biography heading at 768px

Status: **Resolved** (SESSION-014, `a1f4370`)
Priority: Low
Category: UI/UX / Responsive
Discovered: 2026-08-24 (SESSION-007, while checking the header at 768px)
Last reviewed: 2026-08-24

### Summary

At exactly 768px the "Nepal → Germany" hand-written annotation sits on top of the
"Biography" heading. It is clear at 700px, 900px and 1024px — only the `md` layout, where
the portrait column and the text column first sit side by side, is too tight.

### Evidence / Current Behavior

Bounding boxes on `/about`, measured against the production build:

| Viewport | Biography heading | Annotation | |
| --- | --- | --- | --- |
| 700px | (20, 1230)–(660, 1275) | not rendered | clear (stacked layout) |
| **768px** | **(371, 432)–(688, 477)** | **(229, 416)–(411, 464)** | **overlaps by 40×32px** |
| 900px | (426, 447)–(820, 492) | (229, 430)–(411, 478) | clear |
| 1024px | (477, 460)–(944, 509) | (229, 444)–(411, 491) | clear |

Pre-existing: identical coordinates on the build before SESSION-007.

### Resolution

The annotation was positioned at a fixed `left-[150px]` inside a column that is less than
half its desktop width at `md`, so it left the column and landed on the heading. It is
positioned proportionally now — `left-[30%]`, which reproduces the desktop placement to
within two pixels — and measures clear at 768, 800, 840, 880, 900, 1024, 1160 and 1440.

The collision band was 768–~870px, narrower than "at `md`" suggested; the fix covers all of
it without hiding the note at any width, which the alternative (`lg:block`) would have done
between 880 and 1023.

### Expected Behavior

Decorative annotations never sit on top of text.

### Relevant Files

- `src/pages/About.tsx` — the portrait block and the biography section
- `src/components/about/*` — the annotation components

### Possible Cause

The annotation is absolutely positioned relative to the portrait, and at `md` the text
column starts closer to the portrait than the annotation's right edge.

### Possible Solution

Either hold the annotation inside the portrait's own width, or delay the two-column layout
to `lg`. Worth checking the other hand annotations on the page at the same width while
there.

### Related

`ISSUE-016`, `SUGGESTION-010`, `MILESTONE-007`.


---

<a id="issue-030"></a>

## ISSUE-030 — Accessibility gaps found by the WCAG 2.2 AA audit

Status: **Resolved** (SESSION-009, `d9bb612`)
Priority: Medium
Category: Accessibility
Discovered: 2026-08-24 (SESSION-009, auditing against `SUGGESTION-011`)
Resolved: 2026-08-24 (SESSION-009)
Last reviewed: 2026-08-24

### Summary

`design-reference/SPEC.md` §11 names WCAG 2.2 AA as non-negotiable and it had never been
verified. Measuring found seven defects — three of them keyboard defects that made parts of
the site unusable without a mouse, and none of them visible from reading the code.

### What measuring changed

`SUGGESTION-011` predicted the two touch-target misses. **Both were wrong**: the language
pill and the back-to-top button are 34px and fine. The real misses were a dozen standalone
links sitting at the height of their line box — 17–23px against the 24×24 floor (WCAG
2.5.8). Worth remembering before fixing anything on suspicion.

### The defects, and what was done

**Contrast** (1.4.3), computed rather than eyeballed:

| What | Was | Now |
| --- | --- | --- |
| `ink-muted` on page/white/surface — dates, captions, footer, facts labels | `#858A92`, 3.13:1 | `#6A6F78`, 4.55–5.05:1 |
| The grey on the near-black bands | `#6C7078`, 3.98:1 | token `ink-on-dark-muted` `#8A8F98`, 6.09:1 |
| Process-canvas illustration labels (7–9px) | 3.0–4.49:1 | nudged to ≥4.55:1 |

The canvas labels are decorative and arguably exempt under 1.4.3's "pure decoration"
clause, but they are cheap to fix and an automated audit of a *designer's* portfolio should
come back clean. They are also `aria-hidden` now — they are pictures of interfaces, and a
screen reader was reading their fake UI text out as content, in English, on the German site.

**Keyboard** (2.1.1, 2.4.3, 2.4.7):

- **The process canvas trapped focus in invisible controls.** Its five branch buttons stayed
  in the tab order while the map was at `opacity: 0` and `pointer-events: none`, so a
  keyboard user tabbed into five controls they could neither see nor operate. The map is
  `inert` until the scroll track says it is interactive; measured before and after.
- **Scroll reveals removed content from the tab order.** GSAP's `autoAlpha` sets
  `visibility: hidden`, and a hidden subtree is unreachable by keyboard — which is how the
  new pause control turned out to be unreachable. At rest is `opacity` alone now, and focus
  entering a section **completes its reveal tween** (rather than setting properties, which
  would leave the trigger armed to replay the reveal and flash the focused control).
- **The About carousel could not be scrolled by keyboard** (axe:
  `scrollable-region-focusable`). It is a focusable, labelled region now.

**Moving content** (2.2.2): the six playground marquees ran indefinitely and paused only on
hover. There is a bilingual pause control now — reachable in 9 tabs, operable with Enter and
Space, and it stops all six rows.

**Touch targets** (2.5.8): a `.tap-target` utility (`inline-flex min-h-[24px] items-center`)
on the standalone links that were under the floor. Inline links inside a sentence are exempt
and keep their natural size.

### Verification

- **axe-core**, 8 pages × 2 locales, against `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`,
  `wcag22aa` and `best-practice`: **0 violations**.
- A hand-rolled probe over the same pages: contrast computed per text node against its real
  background, heading order, accessible names, landmarks, and target sizes — all clean.
- Keyboard paths driven with `Input.dispatchKeyEvent` and read back from
  `document.activeElement`.
- Regressions: the case-study ring, reduced motion on four pages, anchor clearance at three
  widths, horizontal overflow in both locales.

### A note on the harness

Two false positives cost time and are worth knowing about:

- `document.activeElement.textContent` is the **whole page** when focus is on `body`, so
  "did focus land on the button?" must test `tagName`, not text.
- `[].every()` is `true`, so "are all marquees paused?" answered yes on a page that had
  navigated away and had none.

### Relevant Files

`tailwind.config.ts`, `src/index.css`, `src/lib/useScrollReveals.ts`,
`src/components/process/HeroProcess.tsx`, `BranchGroup.tsx`, `clusters.tsx`,
`src/components/playground/CategoryMarquee.tsx`, `src/pages/playground/PlaygroundIndex.tsx`,
`src/pages/About.tsx`, and the dozen link call sites now using `.tap-target`.

### Related

`SUGGESTION-011`, `DECISION-008` (the reveal contract this changed), `MILESTONE-007`.


---

<a id="issue-031"></a>

## ISSUE-031 — Sync FM's copy credits the wrong AI tool for its personas

Status: Open
Priority: Low
Category: Content / Accuracy
Discovered: 2026-08-26 (SESSION-021)
Owner decision: yes — this is copy, and `MILESTONE-004` reserves copy for the owner

### What

`caseStudies/sync-fm.ts`, section 03, says in both locales:

> "These personas were generated with **Gemini** and then used as concept-development tools.
> They are therefore labelled as hypothesis personas, not as direct evidence from primary
> user research."

The project documentation's own "Tools und KI" page (`Enddokumentation.pdf`, page 43) says:

> "Wir haben **ChatGPT** und **Gemini** genutzt. Mit **ChatGPT** haben wir **Personas** für
> die App erstellt. […] **Gemini 3 (Nano Banana)** wurde für die erste Logo-Ideen verwendet."

Both tools were used on the project, but for different things: **ChatGPT made the personas,
Gemini made the first logo ideas.** The case study has them the wrong way round.

### Why it is worth fixing rather than ignoring

The sentence exists to *disclose* AI assistance, which is the right instinct and is why the
disclosure is there at all. A disclosure that names the wrong tool is a small thing, but it
is the kind of small thing that undermines the larger claim it is making — and this case
study's strongest section is the one about being honest with users.

The same paragraph is also the only place the site describes the personas, and there is no
persona figure to correct the impression: pages 9–11 of the documentation are running text,
so those three slots stay hatched (`DECISION-016` Amendment 2).

### Fix

One word in each locale, in `src/lib/caseStudies/sync-fm.ts`:

- `en`: "generated with Gemini" → "generated with ChatGPT"
- `de`: the matching phrase in the German object

Left for the owner because `MILESTONE-004` reserves the copy pass, and because they may
prefer to name both tools and what each did.

### Related

- `DECISION-016` Amendment 2 — what the Tools und KI page changed about Sync FM's slots
- `MILESTONE-004` — the copy pass


---

<a id="issue-032"></a>

## ISSUE-032 — WikiMind's personas and moodboard ship third-party imagery

Status: Open
Priority: Medium
Category: Content / Provenance
Discovered: 2026-09-03 (SESSION-022)
Owner decision: yes — `DECISION-016` makes borrowed imagery the owner's call, not a rule I can apply for them

### What

SESSION-022 replaced WikiMind's figures with originals the owner supplied in `Images/wikimind/`,
at each image's true aspect ratio. Two of them contain material the owner did not make.

**The three persona cards** (`wikimind-persona-01..03.webp`). Each card devotes its left third
to a full-bleed portrait photograph — Markus Weber, Prof. Dr. Elena Schmidt, Sabine Richter.
The layout, the type, the colour blocks and every word on the card are the owner's. The faces
are not: they are unattributed stock or AI-generated, and `docs/reference/image_sources.md`
has said so since SESSION-016 — *"its persona photographs (9–11) are unattributed stock"*.

**The moodboard** (`wikimind-moodboard.webp`). A moodboard is by definition a collection of
references, and this one is: a dolphin photograph, a macOS screenshot, a healthcare website,
an AI robot illustration. The board is the owner's composition; roughly half the tiles in it
are not.

### Why this is not simply a rule violation

`DECISION-016` does not ban borrowed imagery outright. It says:

> Stock photography used inside a mockup is acceptable where it is incidental to a design the
> owner made (a placeholder face inside their own UI), and only if the licence permits it.
> A stock photograph shown as the work is not.

A persona card reads as the first case rather than the second — the artefact on display is the
card, and the portrait is a component inside it, exactly like a placeholder face in a UI. The
moodboard is a genuinely harder call: showing references *as references* is standard design
practice and the figure is captioned `[ moodboard ]`, but the tiles are still other people's
images, reproduced whole.

Neither is the clear-cut case the decision was written for, and both turn on a licence
question I cannot answer: **where the portraits came from**. If they were generated rather
than licensed, the question changes shape entirely and becomes the same one AFONO's AI product
imagery raises.

### What changed, and what did not

SESSION-019 exported the personas as a 3:4 crop that cut most of the portrait away. That crop
also cut the card's left edge mid-word and spilled into the next section — it was a poor
figure, and the aspect it was forced into is exactly what this session was asked to fix.
Shipping the card whole is the better figure and the more honest one; it is also the reason
this issue exists, because the portrait is now fully visible.

### Options for the owner

1. **Ship as-is** — treat the portraits as incidental components of the owner's card design.
   Nothing to do; close this issue.
2. **Say where the faces came from** — one line of caption or a `heroDisclosure`-style note.
   Cheapest option that removes the ambiguity entirely.
3. **Replace the faces** in the source file and re-export. The record in
   `docs/reference/image_crops.json` makes that one command.
4. **Drop the moodboard**, keep the personas. The slot returns to hatched, which
   `DECISION-006` already treats as a valid state.

### Related

- `DECISION-016` — only the owner's own work ships, and its stock-photography carve-out
- `docs/reference/image_sources.md` — the WikiMind row, which has flagged the portraits since SESSION-016
- AFONO's AI product imagery — the same "owner's call, not a licensing question" shape


---

<a id="issue-033"></a>

## ISSUE-033 — The figure-dense case studies are heavy on mobile

Status: Open
Priority: Medium
Category: Performance
Discovered: 2026-09-04 (SESSION-023)
Owner decision: yes — the remaining lever is a design trade, not a defect

### What

Measured against the production build, gzipped, whole page, scrolled:

| Page | 1440/1x | 390/3x |
| --- | --- | --- |
| `/` | 255 KB (85 img) | 354 KB (184) |
| `/work/sync-fm` | 308 KB (134) | 407 KB (233) |
| `/work/afono` | 482 KB (307) | 547 KB (372) |
| **`/work/wikimind`** | **706 KB (532)** | **995 KB (821)** |

It was 438 KB / 595 KB two sessions ago, when it had 10 PDF-cropped figures.

### Why it grew, in order of size

1. **Three persona cards render at the full column** (`wide: true`), not at a
   third of it. Roughly 158 KB of the desktop total. They carry the flag because
   a persona card at 307px is a thumbnail of a document.
2. **Seventeen figures**, up from thirteen. `[ moodboard ]`, `[ initial sketches ]`,
   `[ component library ]` and `[ wireframes ]` were all hatched or absent before.
3. **Two figures got larger on purpose** when the figures moved inline
   (SESSION-023): `[ moodboard ]` and `[ component library ]` are lone runs now
   rather than half-width pairs, so each fetches a 960 variant instead of a 640.

None of these is a bug. The page is the most figure-dense on the site and every
figure is legible, correctly proportioned and correctly sized for its slot —
verified by reading `currentSrc` off the built page.

### What has already been done

- The photographic figures were re-encoded at WebP q0.78–0.82 rather than 0.9,
  checked by eye at full size first. That took 390/3x from 904 KB to 796 KB.
- `SUGGESTION-017`'s ceiling moved `[ initial sketches ]` down a rung.
- Variants are re-encoded at a fixed 0.82 by `image-variants.mjs`, so the natural
  file's quality only affects bytes served above the top of the ladder. This is
  why re-encoding the naturals moved 3x and left 1x untouched.

### The levers left, and what each costs

1. **Drop `wide: true` from the three personas** — saves ~120 KB on desktop and
   more on mobile. Costs: they become 307px thumbnails. Less damaging than it was
   before `DECISION-018`, since any figure can now be opened full screen.
2. **Lower the variant ladder's quality** from 0.82. Site-wide, so it would also
   lighten AFONO and Sync FM. Needs a look at the result before adopting.
3. **Accept it.** 706 KB gzipped for a seventeen-figure case study is not
   unreasonable, and there is no documented weight budget to test it against.

### Why it is not simply fixed

Every option trades image quality or figure size for bytes, and the whole point
of SESSION-022 and SESSION-023 was to stop the layout deciding what the images
look like. Picking one silently would repeat that mistake in the other direction.

### Related

- `DECISION-018` — the full-screen viewer, which weakens the case for `wide: true`
- `SUGGESTION-017` — the lone-figure ceiling
- `SUGGESTION-012` — the responsive pipeline this all runs through


### Widened after SESSION-026 — AFONO now leads

Re-shooting AFONO from its supplied folder took it from 13 figures to 22, and it is now the
heaviest page on the site by a clear margin:

| Page | 1440/1x | 390/3x | Figures |
| --- | --- | --- | --- |
| `/work/afono` | **694 KB** (518 img) | **1544 KB** (1368 img) | 22 |
| `/work/wikimind` | 710 KB (535) | 1007 KB (832) | 17 |
| `/work/surugami` | 440 KB (267) | 713 KB (540) | 8 |
| `/work/sync-fm` | 421 KB (247) | 654 KB (479) | 10 |

**The mobile number is the one that matters, and it has a structural cause.** Grid runs are
`sm:grid-cols-3` — below 640px every figure collapses to full width. So a phone renders 22
figures at 350px each, and at DPR 3 asks for ~1050px of each, landing on the 1280 variant. The
lone-figure ceiling (`SUGGESTION-017`) does not help here: it is a `max-width`, and at 350px
nothing is capped.

Nothing is malfunctioning. `sizes` is correct, the right variant is being chosen, and the images
genuinely need that many pixels to be sharp at 3x. The page is simply large because the case
study is thorough.

#### What would actually move it

1. **Lower the variant ladder's quality.** `image-variants.mjs` re-encodes every variant at a
   fixed 0.82. Dropping it affects every page at once and is the single biggest lever. Needs a
   look at the result before adopting — it should be judged on the 960 and 1280 rungs, which are
   what phones and laptops actually fetch.
2. **Serve fewer figures on small screens.** A real option and a real cost: it means deciding
   which of the owner's work a phone visitor does not get to see.
3. **Accept it.** There is still no documented weight budget. 694 KB gzipped on desktop for a
   22-figure case study is defensible; 1.5 MB on a 3x phone is the number worth a second opinion.

Option 1 is the only one that costs nothing but a judgement about image quality, which is why it
is listed first — and why it is still the owner's call rather than a change made quietly.

### Re-measured after SESSION-029 — AFONO is now 2.1 MB on a 3x phone

Placing every supplied image took AFONO from 22 figures to 29, and the mobile number moved with
it. Deleting 25 orphaned originals took 1.4 MB off what *ships* but nothing off what any single
page *loads*, because none of them was referenced.

| Page | 1440/1x | 390/3x | Figures |
| --- | --- | --- | --- |
| `/work/afono` | **910 KB** (734 img) | **2141 KB** (1964 img) | 29 |
| `/work/wikimind` | 671 KB (497) | 953 KB (778) | 15 |
| `/work/surugami` | 468 KB (295) | 713 KB (540) | 8 |
| `/work/sync-fm` | 379 KB (205) | 600 KB (426) | 7 |

**2.1 MB is past the point where this is only a number in a table.** On a slow connection that is
a page that visibly takes its time, and AFONO is one of the two strongest case studies.

The cause is unchanged and structural: below 640px every figure is full width, so a 3x phone
fetches 29 images at the 1280 rung. The levers are also unchanged — lower the variant ladder's
fixed 0.82 quality (site-wide, biggest single lever, needs a look at the 960 and 1280 rungs
first), or show fewer figures on small screens.

**What changed is that the first lever is now clearly worth trying.** At 22 figures accepting the
weight was defensible; at 29 it is worth spending an experiment on. Still the owner's call,
because it trades image quality across the whole site.


---

<a id="issue-034"></a>

## ISSUE-034 — Which Surugami poster is the owner's?

Status: Open
Priority: Medium
Category: Content / Credit
Discovered: 2026-09-04 (SESSION-024)
Owner decision: yes — only the owner knows which poster they designed

### What

Surugami's manifest has always carried **two** poster slots, and the split is deliberate:

- `[ poster — by alexsha ]`
- `[ posters — team credit ]`

It exists because the case study's own credit line is specific:

> `contribution`: "Created illustrations, **one poster**, mock-ups and co-designed the website."

`DECISION-011` requires that copy credit collaborators, and this is the image half of the same
rule: one poster is the owner's, the rest are teammates'.

`Images/Surugami/Poster.png` is a **single board** carrying the whole campaign — first sketches,
three posters mounted in a stairwell, one large poster in a corridor, an outdoor sign and a
banner. Nothing on it says which poster is whose.

### What was done, and why

The board went into **`[ posters — team credit ]`**, and `[ poster — by alexsha ]` was left
hatched.

That is the conservative direction. Putting a board containing teammates' posters under a
caption reading "by alexsha" would claim authorship of other people's work — the exact failure
`DECISION-011` and `DECISION-016` exist to prevent. Leaving the owner's own poster uncredited is
the smaller error, and it is reversible in a minute.

Guessing was available and was not taken: the corridor poster is the only one shown alone and at
scale, which *suggests* it is the owner's. That is a hunch about authorship, and asserting a
hunch about who made what is not a thing this repository should do.

### Fix

The owner names their poster. Then either:

1. **Export it on its own** into `Images/Surugami/` — best outcome, since the slot then shows the
   owner's poster at full size rather than as one tile on a board; or
2. **Say which one it is** and it gets cropped out of `Poster.png` into the slot.

Either way the caption pair finally means what it says.

### A second question on the same board

The poster mock-ups sit in photographed environments — a school corridor, a stairwell, an
outdoor sign frame. The deliverables line says the owner made the **mock-ups**, so the
compositing is theirs; the underlying photographs are very likely licensed mockup templates.

`DECISION-016` has met this exact shape before: AFONO's sources page named a graphicgata iMac
template and a pixelbuddha tee mockup, and SESSION-020 moved two slots from "crop the mockup" to
"crop the print artwork". Surugami's documentation cites Freepik photographs by URL.

**This is not a reason to pull the figure** — a mockup template used to present your own artwork
is standard practice and the artwork is the subject. It is worth knowing before the site is
published, which is why it is written down rather than left as an assumption.

### Related

- `DECISION-011` — copy must credit collaborators
- `DECISION-016` — only the owner's own work ships, and its mockup-template precedent
- `ISSUE-032` — the same shape of question on WikiMind's personas and moodboard


---

<a id="issue-035"></a>

## ISSUE-035 — AFONO's supplied folder: three files not used, and why

Status: Open
Priority: Low
Category: Content / Provenance
Discovered: 2026-09-04 (SESSION-026)
Owner decision: yes for two of the three; the third is a broken file

### What

`Images/Afono/` arrived with 30 files. **Seventeen were used.** Three were excluded for
reasons the owner should know about, and ten were left aside as redundant (listed at the end).

### 1. `Wireframe.png` — the file is empty

14,299 × 8,794 pixels, 496 KB, and **entirely white**. `scripts/ink-box.mjs` reports
`no ink found` scanning the whole canvas.

Nothing was placed, because there is nothing in it. Presumably an export that captured an empty
frame or a hidden layer. AFONO has no wireframe slot today; if a real wireframe board exists,
re-export it and a slot goes in beside Sync FM's.

### 2. `InstaInspiration.png` — cropped out, not shipped

The left two thirds is a dense collage of **other brands' Instagram feeds** — streetwear
campaign imagery, product shots, fashion posts. The right third is the owner's own red-and-blue
grid system for laying out the AFONO feed.

`DECISION-016` covers this shape exactly:

> Where a page mixes the owner's diagram with borrowed imagery, **crop to the owner's part**.
> Competitor screenshots and market analyses stay out, even where a case study discusses them.

`ink-box` puts the owner's panel at `crop: [0.6196, 0.1694, 0.3673, 0.8124]` — 476 × 801px — so
cropping it is one line in `image_crops.json` if it is wanted. It was **not** placed this
session, because `[ social media ]` now shows `InstaPosts.png`: the finished posts are a better
figure than the grid that laid them out, and the previous occupant of that slot was the grid.

**`[ market analysis ]` therefore stays hatched.** It is the last empty slot in AFONO, and the
only thing supplied for it was other brands' content, which `DECISION-016` puts out of bounds.
A market-analysis figure would have to be the owner's own comparison — a chart or an annotated
table — not the material being compared.

### 3. `Moodboard.png` — shipped, and flagged

Photographs of Nepal, people, garments and packaging, composed by the owner into a board. Same
shape as WikiMind's moodboard: **the composition is theirs, roughly half the tiles are not.**

Shipped for consistency with `ISSUE-032`, which made the same call for WikiMind and left the
decision with the owner. If the answer there is "drop it", the answer here is the same.

### The AI question, which the folder may have answered

`docs/next_session.md` has carried an open owner decision since SESSION-016: *"May AFONO's
AI-generated product imagery be shown?"* Its sources page says the AI-generated mockups cover
**every product visual in the prototype**, and the case study discloses this in both locales.

The folder supplied `AI Fit 5.png` (an AI try-on preview), the product page, the shop page and
the tee mockups — all of which contain that imagery, and all of which are now placed. **This
session read supplying them as the answer.** That is an inference from a file drop rather than a
stated decision, so it is written here and is trivially reversible: the slots are named in
`image_crops.json`.

### Files left aside as redundant

Not excluded on principle — simply not needed once a better file covered the same slot.
`Button.png` (363 × 142, a single pair of wishlist buttons), `Components1.png`,
`COmponents2.png`, `Landing Page.png` (2845 × 12972 — at its true proportions a figure would
render 175px wide, which is unusable), `City Series Page.png`, `Register Page.png`,
`TshirtMockup2.png`, `Printsketch1.png`, `print1.png`, `print2.png`, `print3.png`.

Say the word and any of them gets a slot.

### Related

- `DECISION-016` and Amendment 1 — AFONO's sources page in full
- `ISSUE-032` — the same moodboard question on WikiMind


---

<a id="issue-036"></a>

## ISSUE-036 — A regex rearranged content into the wrong section and the wrong locale

Status: **Resolved** (SESSION-029)
Priority: High
Category: Content / Correctness
Discovered: 2026-09-08 (SESSION-029)
Introduced: 2026-09-04, commit `37f6b3a` (SESSION-027)

### What shipped

For two commits, `/work/afono` rendered a **German list on the English page**:

> Himal — inspiriert von Nepals Berglandschaft
> City — basierend auf zeitgenössischem urbanem Leben

And the English list it displaced — Himal / City / Mythic / Logo Essentials, the four collections
— sat in **§03 Research**, three sections above the collection it names, between the interview
paragraph and the market-analysis paragraph. The German §06 had no list at all.

### How

SESSION-027 moved AFONO's figures into the prose and noticed one group had landed *before* the
list naming the four collections. It was fixed "by a rule rather than by hand", which the session
record presented as the careful choice:

```python
FIG  = r"(          \{\n            kind: \"figures\",\n(?:.*\n)+?          \},\n)"
LIST = r"(          \{\n            kind: \"list\",\n(?:.*\n)+?          \},\n)"
re.compile(FIG + LIST).subn(lambda m: m.group(2) + m.group(1), s)
```

**The rule matched on shape and had no idea where it was.** It knew what a `figures` block and a
`list` block look like; it did not know which section, which locale, or which case study it was
standing in. It reported two substitutions, which looked exactly like the two intended ones, and
that number was taken as confirmation.

### Why nothing caught it

Every check was green across both commits:

| Check | Why it missed this |
| --- | --- |
| `tsc`, ESLint | Valid TypeScript. Strings moved; types did not change |
| axe, 196-image sweep, overflow, reveals | All structural. A paragraph in the wrong language renders perfectly |
| `image-manifest.mjs` en/de diff | Compares figure `src` only — and the figures were fine. **Prose is never compared, because prose is supposed to differ between locales** |
| Reading the page | The section was screenshotted. The German list is four short lines in a 6,000px screenshot, and I was looking at the figures I had just placed |

The gap is precise: **the harness verifies that images match across locales and that markup is
sound. Nothing verified that the words are in the right language or in the right section.**

### Fix

Both lists restored to §06 of their own locale, verified by dumping the block sequence of every
section in both locales rather than by reading the diff.

**`scripts/content-audit.mjs` is new, and `predeploy` now runs it.** Two checks:

1. **Wrong-language body blocks** — function words only, since content words are cognates far too
   often in a German design context. List items are tested **individually**: the first version
   joined them, and a German line re-injected among three English ones passed. That version was
   discarded after it failed to catch the very fault it was written for.
2. **`en`/`de` structural parity** — same sections in the same order, and the same sequence of
   block kinds within each. This is what catches a list that exists in one locale and not the
   other, which is the other half of what happened here.

Both were proved by re-injecting each fault and confirming a non-zero exit, then confirming clean.

### The lesson worth keeping

**A transformation matched only by shape will eventually match the wrong instance, and a
substitution count is not verification.** Two replacements were expected and two were reported —
the number agreed while the positions did not. Anchoring to surrounding content, or operating on
one section at a time, would have made the mistake impossible instead of merely unlikely.

### Related

- `SESSION-027` — where it was introduced, and where the rule was described as the careful choice
- `scripts/content-audit.mjs`, `docs/reference/handbook.md`


---

<a id="issue-037"></a>

## ISSUE-037 — QIS ships three screenshots of the university's own portal

Status: Open
Priority: Medium
Category: Content / Provenance
Discovered: 2026-09-09 (SESSION-030)
Owner decision: yes — `DECISION-016` is written against exactly this, and this is the one case where it may be wrong

### What

`Images/qis/` supplied three screenshots of the **existing** QIS portal —
`oldinfo.jpg`, `oldlogin.jpg`, `oldprufunganabmeldung.jpg` — and all three are now placed in
§01 Overview as `[ original portal — overview / login / exam registration ]`.

They are TH Lübeck's software, not the team's design. `image_sources.md` has said so since
SESSION-016: *"its 'Originale' screenshots are the university's existing portal, not the team's
design."*

### Why they were placed anyway

`DECISION-016` says competitor screenshots and market analyses stay out. It was written for
AFONO's market analysis and Surugami's Pinterest moodboards — **material used as inspiration,
where showing it borrows someone else's work to make yours look considered.**

This is the opposite case. A redesign case study's subject *is* the existing system. The
screenshots are the evidence for the problem, they are captioned as the original portal in both
locales, and their alt text names them as the existing portal. Nobody reading the page could
take them for the owner's design — the whole section is about why they needed replacing.

Removing them would leave a redesign case study that never shows what was redesigned.

### What is actually at risk

Not misrepresentation — the captions handle that. Two smaller things:

1. **The screenshots contain a real student record.** `oldinfo.jpg` shows a grade overview with
   a name, a matriculation number and module results. It looks like test or demo data
   ("Max Mustermann" appears in the redesigned screens), but **the original screenshots were
   not checked field by field**, and they are the highest-resolution of the three at 1194×834.
   Worth one look before publishing.
2. **Institutional screenshots are the university's.** Reproducing them for critique in a
   student portfolio is ordinary practice; it is still their interface.

### Options

1. **Ship as placed** — captioned as the original portal, which is what they are.
2. **Blur or redact the personal fields** in `oldinfo.jpg` and re-export. One `crop` and a
   `grade` away in `image_crops.json`.
3. **Drop them** and let §01 describe the old portal in prose. The section already does.

Option 2 is the cheapest way to remove the only real risk while keeping the evidence.

### Related

- `DECISION-016` — the rule this tests
- `docs/reference/image_sources.md` — the QIS row, which flagged these screenshots in SESSION-016


---

<a id="issue-038"></a>

## ISSUE-038 — Five supplied files are still unplaced: three videos and two photographs

Status: Open — parts 1 and 2 closed (SESSION-034, SESSION-033). **Part 3 stands: `Afono/Wireframe.png` is still blank.**
Priority: Medium
Category: Content
Discovered: 2026-09-10 (SESSION-032)
Owner decision: yes for all three groups

### 1. ~~Three craft videos — 121 MB, and no encoder here~~ — CLOSED

**Resolved in SESSION-034** (`DECISION-026`). The premise was wrong, and it was my own:
this issue said there is no encoder on this machine, because `ffmpeg` is absent and
`avconvert` grew two of four files.

**Chrome is an encoder.** `scripts/video-clip.mjs` plays the source, draws it to a canvas
at the size actually wanted, and records `canvas.captureStream()` through `MediaRecorder`.
The question this issue never asked was the one that mattered: a gallery tile does not need
the film, it needs eight seconds of it at 640px.

| Source | | Clip |
| --- | --- | --- |
| `craftworkgift1.mp4` 15.4 MB, 48s | → | `pg-gift-explosion.mp4` **349 KB**, 8s |
| `craftgift2.mp4` 60.1 MB, 142s | → | `pg-gift-popup.mp4` **476 KB**, 8s |
| `craftgift3.mp4` 45.9 MB, 23s | → | `pg-gift-riona.mp4` **210 KB**, 6s |

**121 MB → 1035 KB.** All three autoplay muted and looping in Handmade and Bead Crafts,
and none of them is fetched at all under `prefers-reduced-motion`.

### 2. ~~Two photographs — the playground has no category for them~~ — CLOSED

**Resolved in SESSION-033 by option 2, as part of the owner's category restructure**
(`DECISION-023`). `3D and Motion` became **Photography, Animation and 3D**, and both
photographs lead it:

| Source | Decoded | Export | Aspect |
| --- | --- | --- | --- |
| `photographystilllife.jpg` | 8000 × 6176 | `pg-photo-stilllife.webp` 1250 × 965, 35 KB | `250/193` |
| `PhotographyLowkey.jpg` | 3840 × 5760 | `pg-photo-lowkey.webp` 1200 × 1800, 165 KB | `2/3` |

Both decode as they are stored — no EXIF rotation this time — and both reduce to an exact
ratio (8000/6176 is 250/193; 3840/5760 is 2/3), so neither is cropped by `object-cover`.

A seventh category was not needed: two photographs do not make a section, and the three
subjects share one — light, and what it does to a surface over time.

### 3. `Afono/Wireframe.png` — still blank

14,299 × 8,794 and entirely white; `ink-box` finds nothing anywhere on the canvas. Flagged since
`ISSUE-035` and unchanged. Re-export it if a real wireframe board exists.

### Related

- `DECISION-022` — how video is handled, and the compression measurements
- `ISSUE-035` — where the blank wireframe was first recorded


---

<a id="issue-039"></a>

## ISSUE-039 — The playground index crops every card to a fixed aspect

Status: **Resolved** 2026-09-10 (SESSION-034) — see `DECISION-025`
Priority: Medium
Category: Design
Discovered: 2026-09-10 (SESSION-033)
Owner decision: given. The owner chose a uniform box with the leftover space
filled to match the image, and 'one row at a time' for the motion.

### What

Two components on `/playground` render an item's image at a **hard-coded aspect
ratio** rather than the item's own:

- `CategoryMarquee.tsx` — `<Media ... aspect="4/3" />` for every card in every row.
- `PlaygroundIndex.tsx` — `<Media ... aspect="16/10" />` for the three featured cards.

`ui/Media` paints with `object-cover`, so **a declared aspect that disagrees with
the file is a silent crop.** The items are not close to 4/3:

| Item | True aspect | Shown at | Lost |
| --- | --- | --- | --- |
| Beaded hanging planter | `1200/2604` (0.46) | 4/3 (1.33) | ~65% of its height |
| Low-key portrait | `2/3` (0.67) | 4/3 | ~50% |
| VTRI banner | `1200/343` (3.50) | 4/3 | ~62% of its width |
| Perfume box | `656/770` (0.85) | 4/3 | ~36% |

The category pages themselves are fine — `PlaygroundCard` passes `item.aspect`
straight through, so the same images are uncropped one click away. The index is
the only surface that crops.

### Why it was not fixed in SESSION-033

This is the same `object-cover` fault the case studies spent `SESSION-022`
through `SESSION-030` removing, and the reasoning in `DECISION-021` — nothing
sits on an image and nothing is cropped — applies to it word for word.

But a marquee is a **fixed-height scrolling row**, and that is the whole reason
the aspect is hard-coded: variable aspects at a fixed height mean variable
widths, which is fine, but the row's loop distance is currently `33.3333%` of a
tripled track and the reveal maths assumes uniform cards. `@/lib/justify` already
solves exactly this for figures and the work grid, and would solve it here.

That is a redesign of the playground index. SESSION-033 was asked to reorder
categories, and it stopped at the edge of that.

### Options

1. **Justify the rows by height** the way `DECISION-019` does — every card the
   same height, width from its own aspect. Consistent with the rest of the site
   and reuses `@/lib/justify`. The most work.
2. **Keep a fixed aspect but `object-contain` on a neutral ground** — nothing is
   lost, but tall items become small items with wide margins.
3. **Leave it.** The index is a teaser and the uncropped image is one click away.

### Related

- `DECISION-021` — nothing sits on an image, nothing is cropped (the work grid)
- `DECISION-019` — height-governed justified rows, and `@/lib/justify`
- `DECISION-023` — the restructure that put these items in this order


### Resolution

`DECISION-025`. Every playground card is a 3/4 box with the image contained
rather than cropped, and the leftover space painted the image's own border
colour, sampled at build time. Average mat 19%, against 36% of every image
previously discarded. The ITD logo lockup and the museum poster's title are
back inside the frame.

The motion is settled with it: one row moves at a time, chosen by which section
the viewport's centre line is in.


---

<a id="issue-040"></a>

## ISSUE-040 — Scrolling the whole playground costs 4 MB on a phone

Status: Open
Priority: Medium
Category: Performance
Discovered: 2026-09-10 (SESSION-034)
Owner decision: yes — every remaining lever trades picture quality

### Measured

`/playground`, uncached, gzipped, at 390px and device pixel ratio 3:

| | images | clips | code | total |
| --- | --- | --- | --- | --- |
| **Landing, before scrolling** | 200 KB | 0 KB | 292 KB | **492 KB** |
| **After scrolling the whole gallery** | 2755 KB | 1036 KB | 292 KB | **4082 KB** |

At 1440px/1x, landing is 368 KB and the full page is 2004 KB.

**The landing number is the good news and it is not an accident.** Every tile is
lazy, and no clip is fetched until it is near the viewport — so arriving at the
page costs 492 KB whatever the gallery holds behind it. The 4 MB is paid only by
someone who scrolls all 9,100 pixels of it, and it arrives in pieces as they go.

### Why it is big

It is a **gallery of 33 pictures shown at full size**, which is what the page was
asked to be (`DECISION-026`). On a 3x phone a tile 350 CSS px wide legitimately
asks for a ~1050px image, so ~83 KB per picture is correct behaviour, not waste.
`DECISION-024` already removed the actual waste — every call site declares the
width it renders at.

The clips are 1036 KB of the total and they are the cheapest thing on the page
per second of interest: 121 MB of source became that.

### Options, all of which are the owner's

1. **Accept it.** Landing is 492 KB, it loads as you scroll, and it is a
   portfolio gallery. This is the honest default.
2. **Cap the largest variant a tile may request.** Tiles are at most ~350 CSS px
   on a phone; offering them the 1280 rung rather than 960 is close to
   invisible on that screen and would cut a large share of the 2755 KB. One
   line in `sizesFor`.
3. **Re-encode the playground images at a lower quality.** They are currently
   WebP 0.8–0.9. Dropping the photographic ones to ~0.72 would cut perhaps a
   third. This trades visible quality on the biggest tiles.
4. **Show fewer pictures at once**, with a "show the rest" per category. This
   fights the instruction the page was built to — "everything needs to be here" —
   so it is listed for completeness, not recommended.

### A note on measuring this

The first three attempts to measure it were wrong, in both directions, because
`scripts/lib/cdp.mjs`'s `setViewport` **hardcodes `deviceScaleFactor: 1`**. A run
labelled "390/3x" was really 390/1x and reported 662 KB against the truth of
2755 KB. `verify weight` sets device metrics itself and was right all along.

**When a hand-rolled measurement disagrees with the harness, suspect the
measurement.** The numbers above were re-taken with the pixel ratio set
explicitly and now agree with `npm run verify weight` to within 5 KB.

### Related

- `DECISION-026` — the gallery, and why the pictures are shown at full size
- `DECISION-024` — `sizes` at every call site; the waste that was already removed
- `ISSUE-033` — the same shape of decision for `/work/wikimind`


---
<a id="issue-041"></a>

## ISSUE-041 — The nav "About" link goes to a homepage section, not the About page

Status: **Resolved** (SESSION-039)
Priority: Medium
Category: Navigation
Discovered: 2026-09-10 (SESSION-038), reported by the owner

`src/components/Header.tsx` line 96 links to `localeHref(locale, "/#about")`, which scrolls
to the `AboutPreview` section on the homepage. There is a real `/about` page, reached only
from the two links inside that preview.

The About page is a full page with the biography, the focus list, the tools and the résumé
block. Sending "About" in the primary navigation to a three-paragraph teaser instead buries
it, and it also means the nav item behaves differently depending on which page you are on:
from `/work/afono` it navigates home and then scrolls.

**Fixed** in SESSION-039 as [`MILESTONE-010` task 11](milestones.md#milestone-010).
`Header.tsx`, `MobileMenu.tsx` and `Footer.tsx` all carried the same `/#about` link and all
three now point at `/about`.

---
<a id="issue-042"></a>

## ISSUE-042 — Résumé section rules sit flush against the first row

Status: **Resolved** (SESSION-039)
Priority: Low
Category: Layout
Discovered: 2026-09-10 (SESSION-038), reported by the owner

Every résumé section heading is `border-b border-accent pb-2` (`src/pages/Resume.tsx` lines
119, 130, 141, 152 and on), so the rule sits 8px under the heading text. The first row below
it is `border-t border-surface-2 py-6 first:border-t-0 first:pt-0` (lines 29, 39, 49, 59) —
`first:pt-0` removes the top padding so the first row does not carry a doubled border.

The two combine into no gap at all between the rule and the first entry, where every
subsequent entry has 24px above it. The heading reads as attached to the first project
rather than to the section.

**Fix:** put the space on the wrapping `<div>` (`pt-5`) rather than removing `first:pt-0`,
which is there for a reason. **Check the print stylesheet afterwards** — this page is
designed to be printed and the rule spacing changes the page breaks.

---
<a id="issue-043"></a>

## ISSUE-043 — Playground notes and arrows still cross the pictures

Status: **Resolved** (SESSION-040) — all three causes, and the build now measures it
Priority: Medium
Category: Layout
Discovered: 2026-09-10 (SESSION-038), reported by the owner

SESSION-038 replaced the notes' hand-written coordinates with geometric placement
(`lib/playground/placeScribbles.ts`) and verified that no note *box* overlaps a slot
rectangle on any of the four cards. The owner still sees overlap. Two distinct causes:

**1. The arrows cross pictures by design.** A curve from a note to a picture on the far side
of a crowded card goes over whatever is between them. On card 01 the calendar-cover note is
4,877 design units from its target because everything nearer is occupied. Routing arrows
around obstacles, or accepting shorter arrows and worse note placement, is a real trade and
has not been made.

**2. The note boxes are estimates, and the estimate is scale-dependent.** `placeScribbles`
sizes a note in design units at roughly 12.7 to the CSS pixel, which is correct on the 1280px
stage a full-width card gives and wrong on anything narrower. Notes render at a fixed CSS
size while the stage scales, so on a smaller card the real note is larger than the rectangle
that was collision-tested, and it can reach a picture the test said it cleared.

**Cause 2 is fixed** (SESSION-039, `MILESTONE-010` task 14h). The line-height and character
width estimates are CSS pixels now rather than design units, and `Collage` measures the stage
with a `ResizeObserver` and hands `placeScribbles` the conversion, so a note is
collision-tested at the size it is actually drawn.

**And a third cause nobody had named.** The last overlaps to survive that were not placement
at all. Notes are hidden below a 900px card, but they are drawn on the *stage*, which is
`min(100cqw, 160cqh)` — so a card that is wide and short is height-bound and its stage is far
narrower than the card that passed the query. At a 1180x700 window the cards were over 1100px
wide with an 859px stage. The container query asks for `min-height: 563px` as well now
(900 / 1.6), and the case simply does not arise.

Measured across five window sizes, the worst note-on-picture overlap goes from 78% of a note
to 14% of one note's *rotated bounding box*, which is a corner brush rather than a collision.

**Cause 1 is fixed** (SESSION-040, `DECISION-033`). Placement and routing became one search:
an arrow ends at its picture's *nearest* point rather than on the ray from its centre, a seat
is scored on what the arrow it would need lies across, and both of the curve's control points
move independently so a stroke can go **between** two pictures instead of over one.

Measured the same way across five stage widths and fifty arrows:

| | Worst arrow over a picture | Total over pictures |
| --- | --- | --- |
| Before | 394 CSS px | 2,773 px |
| After | 16 CSS px | ~60 px |

Sixteen pixels is a stroke clipping a corner. The fault this was raised for — a line lying
across a photograph — is gone.

**It is checked rather than looked at now.** `content-audit.mjs` measures every arrow on
every card at five stage widths and fails the build over 40 CSS px, or over any stroke drawn
outside the card at all. The check was proved by re-injecting the fault: with the old
single-bend arrow restored it reports 14 findings. This was the third session on this issue
and the second time a fix was judged by looking at one card at one width.

---
<a id="issue-044"></a>

## ISSUE-044 — The playground clips are 6 to 9 second excerpts

Status: **Resolved** (SESSION-040) — measured first, then the whole films shipped on demand
Priority: Medium
Category: Content / performance
Discovered: 2026-09-10 (SESSION-038), reported by the owner

The five clips in `public/videos/pg-*.mp4` run 6.02s to 9.01s. They were cut with
`scripts/video-clip.mjs --seconds 8` in SESSION-034 and SESSION-035, when the problem being
solved was that 121 MB of source video had to become something shippable at all. The sources
are 20 to 63 seconds.

The owner reports "only 2 3 seconds", which **does not match the file lengths**. Something
else may be stopping playback early: `ui/LoopVideo` starts a clip on `IntersectionObserver`
and pauses it when it leaves, and the playground's new scroll runways change how long a card
is on screen. Measure the actual playback before re-encoding anything.

The weight trade is `DECISION-030`. `/playground` is already 2.6 MB at 1440px and 3.5 MB at
390px/3x.

### The measurement (SESSION-040)

Taken by driving the built `/playground` in Chrome and reading every `<video>` the page makes
while scrolling the whole deck. **Every clip plays its entire file and repeats**:
8.92 of 8.97s, 7.93 of 7.96, 7.96 of 7.97, 5.99 of 5.99, 7.98 of 7.98, all with `loop` set and
none paused. The `IntersectionObserver` in `ui/LoopVideo` is not cutting anything short.

**There was no playback bug.** The clips are short because `video-clip.mjs` was run with
`--seconds 8`, and that is the whole cause. The owner's "2 3 seconds" was an impression of an
eight-second loop rather than a fault — which is exactly why this issue insisted the
measurement come first, and it was right to.

### What shipped

`DECISION-030` option 3. Every clip slot carries a second file: the eight-second loop the
collage plays, and the **whole film**, which only the viewer asks for. Sources run 23.5s to
142s and all five are now shippable in full — 15.2 MB across the five, fetched one at a time
and only on a click, so `/playground` weighs what it weighed before.

---
<a id="issue-045"></a>

## ISSUE-045 — The process question wraps to two lines

Status: **Resolved** (SESSION-040)
Priority: Low
Category: Layout
Discovered: 2026-09-10 (SESSION-038), reported by the owner

"How do I bring a project to life?" breaks into two lines on the pinned process canvas.
`src/components/process/HeroProcess.tsx` line ~362 constrains the heading to
`w-[min(90vw,1000px)]` with `textWrap: "balance"`, and at
`text-[clamp(1.625rem,3vw,2.625rem)]` the sentence does not fit 1000px on a wide screen, so
`balance` splits it evenly rather than letting it run.

The owner wants it on one line, with the five process clusters moved to suit, including into
the space above the question. The connectors are then redrawn — **but only after the owner
has approved the new spacing.** See [`MILESTONE-010` task 3](milestones.md#milestone-010).

**The diagnosis above is about the wrong state.** `w-[min(90vw,1000px)]` and
`textWrap: balance` are the CSS class, and the scroll timeline overrides all of it: at the top
of the track the question is already `nowrap` on one line, and the two-line break happens in
the **end** state, where the timeline sets the hub to `340 × scale` wide at `32 × scale`. The
sentence is 457 units in English and 567 in German. Neither fits 340.

**Resolved in SESSION-040** (`DECISION-034`). The element measures its own width at a font
size of one pixel, once per resize, and the end size is solved from that against the hub's
width — so the promise holds in both locales and for whatever the sentence becomes. `nowrap`
is on throughout and the box is never narrower than the words. Checked at 1920, 1440, 1280,
1100 and 960 in both locales: one line in all ten.

The clusters and connectors moved with it (task 3c). `DECISION-034` records what the map had
room for and what had to be given up to get the question on one line.

---
<a id="issue-046"></a>

## ISSUE-046 — Placeholder slots with no assets are still shipping

Status: **Resolved** (SESSION-039)
Priority: Low
Category: Content
Discovered: 2026-09-10 (SESSION-038), reported by the owner

Four hatched slots that the owner has now said should simply go, rather than wait for an
asset that is not coming:

| Slot | File | Lines (en / de) |
| --- | --- | --- |
| `[ competitor analysis ]` | `caseStudies/wikimind.ts` | 55 / 249 |
| `[ competitor comparison ]` | `caseStudies/sync-fm.ts` | 55 / 218 |
| `[ ethical-risk diagram ]` | `caseStudies/sync-fm.ts` | 150 / 313 |
| materials placeholder | `caseStudies/barrier-free-kitchen.ts` | in the prototype run |

`DECISION-006` said almost every placeholder becomes a real image; these four are the
exception the owner has named. **The Sync FM prose about ethical risk stays** (lines 99 and
162): the owner asked to remove the diagrams, not the argument.

Re-run `node scripts/image-manifest.mjs` after deleting them so the slot count is honest.

**Done** in SESSION-039. All four are gone, and so are the eight `about.carouselItems` slots
that `MILESTONE-010` task 6g retired with the "Outside the work" carousel — they had never
been filled either. The manifest went from 159 slots with 30 empty to 147 with 18.

---
<a id="issue-047"></a>

## ISSUE-047 — Three spacing classes produced no CSS at all

Status: **Resolved** (SESSION-039)
Priority: Low
Category: Styling
Discovered: 2026-09-10 (SESSION-039)

`About.tsx` was written with `mt-8.5`, `pt-6.5` and `mt-5.5`. Tailwind's default spacing
scale stops offering half steps above `3.5`, and this project's `tailwind.config.ts` had
added only `4.5`. The other three matched no utility, so **no rule was generated and no
margin or padding was applied** — and nothing anywhere reports it: an unknown class is
indistinguishable from a class you meant to put on the element.

It was invisible while `about.aiLabel` sat between the rule and the paragraph. Deleting that
label (`MILESTONE-010` task 6d) left the AI paragraph flush against its own `border-t`, which
is what surfaced it.

**Fixed** by adding `5.5`, `6.5` and `8.5` to the spacing scale at the values the classes
were evidently written for (22px, 26px, 34px), rather than by rewriting three call sites to
classes that happen to exist.

**Worth knowing:** `grep -roE '\b[mp][tblrxy]?-[0-9]+\.5\b' src/` lists every fractional
spacing class in use, and anything not in Tailwind's default set (`0.5`, `1.5`, `2.5`, `3.5`)
or in `tailwind.config.ts` is doing nothing.
