# Decisions

Lightweight ADRs. **IDs are permanent and referenced from code comments** — `DECISION-016`, `DECISION-027` and others are cited in `src/` and `scripts/`, so a decision is never renumbered and never deleted.

Lightweight decision records. Most were reconstructed from the code and the design
reference during SESSION-001; where no rationale could be inferred, the file says so
explicitly rather than inventing one.

| ID | Title | Status | Scope | Summary | File |
| --- | --- | --- | --- | --- | --- |
| DECISION-001 | Vite + React SPA instead of Next.js | Active | Whole project | Migrated in `7fb7755`; lost SSR metadata and router scroll behaviour | [#decision-001](#decision-001) |
| DECISION-002 | Path-prefix i18n with typed dictionaries | Active | Routing, content | `/de/...` prefix, no i18n library, locale derived from pathname | [#decision-002](#decision-002) |
| DECISION-003 | Content in typed TypeScript modules | Active | Content | No CMS/MDX; slug registries; both locales mandatory | [#decision-003](#decision-003) |
| DECISION-004 | Replace Tailwind palette and breakpoints | Active | Styling | Closed 17-colour palette; custom `nav` breakpoint | [#decision-004](#decision-004) |
| DECISION-005 | Hand-rolled `Image` and `Seo` | Active | Components | ~70 lines replacing `next/image` and the metadata API | [#decision-005](#decision-005) |
| DECISION-006 | Hatched placeholder is a design element | **Answered** | Visual language | Owner, 2026-08-24: almost every placeholder is meant to be a real image — the hatch is a fallback | [#decision-006](#decision-006) |
| DECISION-007 | Process canvas is hand-written rAF | Active | Homepage animation | Direct port of the reference script, not ScrollTrigger | [#decision-007](#decision-007) |
| DECISION-008 | GSAP scroll reveals, called per page | Active (amended) | Animation | Hook per page; the CSS `opacity: 0` guard that caused ISSUE-001 is gone | [#decision-008](#decision-008) |
| DECISION-009 | `.dc.html` designs beat the prose brief | Active | Design fidelity | Accent is `#1B3FE0`; reference dir is gitignored | [#decision-009](#decision-009) |
| DECISION-010 | Homepage work section → bento grid | **Active** | Homepage | Owner, 2026-08-24: keep the bento; it needs images and bilingual copy | [#decision-010](#decision-010) |
| DECISION-011 | Copy honesty constraint | Active | Content | No invented metrics/clients; collaborators credited | [#decision-011](#decision-011) |
| DECISION-012 | Static hosting with SPA rewrite | **Decided** | Deployment | GitHub Pages, manual `npm run deploy`; the résumé links here now, not to Adobe. Custom domain still open | [#decision-012](#decision-012) |
| DECISION-013 | Hand-rolled scroll behaviour, not `<ScrollRestoration />` | Active | Routing, navigation | Built-in cannot see a lazy page's hash target and inherits CSS smooth scrolling | [#decision-013](#decision-013) |
| DECISION-014 | Case-study body is a block model; reading column departs from the reference | Active (amended ×2) | Content, case studies | Blocks instead of `string[]`; 680px measure against wider media; no viewport full-bleed while the rail is sticky | [#decision-014](#decision-014) |
| DECISION-015 | GSAP stays eager; the case-study registry is split per slug | Active | Performance, motion | 126 KB chunk became 13 KB + one study; deferring GSAP hides content rather than saving time | [#decision-015](#decision-015) |
| DECISION-016 | Image provenance: only the owner's own work ships | Active | Content, images | The project documentations mix the owner's diagrams with Freepik and Pinterest reference material; read each document's sources page before exporting | [#decision-016](#decision-016) |
| DECISION-017 | Case study opens with the contents rail; title inside Overview | **Active** | Case studies, layout | Owner, 2026-08-25: rail visible on load, smaller title under Overview, no year, every project says "Semester project" | [#decision-017](#decision-017) |
| DECISION-018 | A figure opens full screen | **Active** | Case-study figures | A dense figure is unreadable at 350px on a phone, and the column cannot widen — so the figure opens instead | [#decision-018](#decision-018) |
| DECISION-019 | Figures are sized by height, and rows are justified | **Active** | Case-study figures | Aspects must stay true, so widths absorb the difference and every figure in a row shares one height | [#decision-019](#decision-019) |
| DECISION-020 | The bento tiles are washed pale, not darkened | **Superseded** by `DECISION-021` | Homepage work grid | Eleven dark project-tinted tiles clashed with a white, restrained site; the colour now comes from each image itself and the text is ink | [#decision-020](#decision-020) |
| DECISION-026 | The playground is one page: a scrapbook that moves | **Amended** (page shape superseded by `DECISION-027`; its picture rules stand) | `/playground` | Twelve routes become one page of true-aspect bento rows; clips autoplay muted; section colour is averaged from the pictures themselves. Chrome's MediaRecorder turned 121 MB of video into 1035 KB | [#decision-026](#decision-026) |
| DECISION-025 | One uniform card, nothing cropped, matted in the image's own colour | **Superseded** by `DECISION-026` (the mat sampling lives on in `@/lib/tint`) | Playground index and category grids | 36% of every image was being discarded by a hard-coded `object-cover` aspect; a 3/4 box (median aspect 0.762) with a build-time sampled mat leaves 19% and crops nothing. One row moves at a time | [#decision-025](#decision-025) |
| DECISION-023 | The playground carries five categories, in the owner's order | **Active** | `src/lib/playground/` | Editorial folded into Graphic Design, photography joined 3D and Motion (closing `ISSUE-038` part 2), slugs renamed to match; the two empty categories lead, deliberately and on the record | [#decision-023](#decision-023) |
| DECISION-024 | Every image call site declares the width it actually renders at | **Active** | `ui/Image` call sites | `sizes` defaults to `100vw`, so a 256px card was taking the 1600px variant; `/playground` went 1692 KB → 378 KB at 1440/1x with mobile unchanged | [#decision-024](#decision-024) |
| DECISION-022 | Video ships at full size and loads only on demand | **Active** | Case-study and playground films | No encoder exists on this machine, so the answer is a 34 KB poster and `preload="none"` rather than a smaller file | [#decision-022](#decision-022) |
| DECISION-021 | The homepage work section is project cards, not a bento grid | **Active** | Homepage work section | Rejected twice; the fault was text on images and `object-cover` crops, not colour. Six cards, covers shown whole, no repeated title, one mono line of tags | [#decision-021](#decision-021) |
| DECISION-027 | The playground is a deck of four collages that stack as you scroll | **Active** | `/playground` | Four `position: sticky` siblings in one container; slots traced from Figma in the design's own 16000×10000 pixels; two layouts chosen by a container query on the card's aspect, not a breakpoint | [#decision-027](#decision-027) |
| DECISION-028 | The hero is a short title over a description | **Under review** | homepage hero | Candidate A, "Design that listens.", is live so the owner can see it. One string per locale to change | [#decision-028](#decision-028) |
| DECISION-029 | A case-study figure signals openable without a colour or a scale | **Under review** | case studies | No accent border and no hover scale: a figure in a justified row cannot grow without breaking the row. Shadow lift recommended | [#decision-029](#decision-029) |
| DECISION-030 | Full-length playground clips, or a lighter page | **Under review** | `/playground` | The clips are 6-9s excerpts of 20-63s sources; `/playground` is already 2.6 MB. Full film in the viewer, excerpt in the collage, recommended | [#decision-030](#decision-030) |
| DECISION-032 | A justified row can hold a column of figures | **Active** | case studies | `stackWithNext` joins figures into a cell; `justifyCells` reduces exactly to `rowMetrics` when every cell holds one | [#decision-032](#decision-032) |
| DECISION-031 | The playground's colour turn runs with the card | **Active** | `/playground` | `--pg-full` starts at 0, not at 0.82: notes, arrows and ruling change from the first pixel of scroll rather than snapping at the end | [#decision-031](#decision-031) |
| DECISION-033 | `placeScribbles` is a search, not a placement | **Active** | `/playground` | A seat is scored partly on what its arrow would lie across; both control points chosen by that search | [#decision-033](#decision-033) |
| DECISION-034 | The process question's size is solved from its own measurement | **Active** | process canvas | `measure()` reads the heading at 1px and solves the end size; German sets the width | [#decision-034](#decision-034) |
| DECISION-035 | Three bands, so clusters 01 and 02 get one row | **Active** | process canvas | One-row clusters are short clusters; that opens a real band for the question and makes the connectors diagonal | [#decision-035](#decision-035) |
| DECISION-047 | The playground's pictures live on the collage cards, and nowhere else | **Active** | `/playground` | The five category files, `PlaygroundItem`, `Scrapbook` and `Tile` are deleted. `content-audit` now audits the slots that render instead of the items that did not | [#decision-047](#decision-047) |
| DECISION-048 | The viewer steps through a card | **Active** | `/playground`, `ui/Lightbox` | `onPrev`/`onNext`/`position` on `Lightbox`; the collage holds an index rather than a slot, and wraps. Case-study figures pass none of it and render no nav | [#decision-048](#decision-048) |
| DECISION-049 | The cursor tag is painted in its card's colour | **Active** | `/playground` | Every other mark belonging to a card arrives at that card's accent; the tag was the last thing in the site's ink. Mixed 12% to ink so card 1's orange clears AA | [#decision-049](#decision-049) |
| DECISION-050 | An export is checked by re-deriving it, not by its timestamp | **Active** | image pipeline | `image-treat` is deterministic, so re-exporting everything and diffing the bytes is the reliable check. Reverses the mtime comparison `MILESTONE-013` used. See `ISSUE-057` | [#decision-050](#decision-050) |
| DECISION-042 | Below `md` the mode switch is one on/off toggle, and the header is one row | **Active** | header | A track, a knob and the mode you are in; one link to the other mode, with its own accessible name. Retires the second header row and `MILESTONE-011` task 11 | [#decision-042](#decision-042) |
| DECISION-043 | The narrow-viewport menu is a drawer, dismissed by the page | **Active** | header | A hamburger and a right-hand drawer over a real backdrop element, not a document click listener. Replaces the full-screen takeover | [#decision-043](#decision-043) |
| DECISION-044 | The footer is the email address | **Active** | every page | Big type, one row of links, one utility strip. ~380px to ~200px, and the thing a visitor at the bottom of a portfolio wants is the largest thing on it | [#decision-044](#decision-044) |
| DECISION-045 | The phone gets the five process steps as cards, not as a column | **Active** | homepage | A bordered box per step with its number in a chip, and a dashed tick between them. Extends the static fallback `MILESTONE-011` task 10 built | [#decision-045](#decision-045) |
| DECISION-046 | `/impressum` and `/datenschutz` keep German paths in both locales | **Active** | legal pages | The words a German visitor and a German authority both look for. The address ships as a visible placeholder rather than as an invention | [#decision-046](#decision-046) |
| DECISION-039 | The collage arrows are arcs, and the Figma frames say where the notes go | **Active** | `/playground` | `scoreArrow` prices distance from a 0.28 bow instead of distance from straight; all eleven notes carry the corner the owner drew. Amends `DECISION-036` | [#decision-039](#decision-039) |
| DECISION-040 | The process map's bottom row turns a corner, and its right column hangs from the right | **Active** | process canvas | 03 and 04 become L-shaped elbows lying in the band the one-row top opened; 02 and 04 align their contents to the edge the strokes already reached for. Extends `DECISION-035` | [#decision-040](#decision-040) |
| DECISION-041 | The homepage's one pill belongs to the playground; About trails off instead | **Active** | homepage About section | A story you can keep reading is invited by a fade, not by a button; a place needs a door. Reverses `MILESTONE-011` task 13 | [#decision-041](#decision-041) |
| DECISION-036 | Playground arrows are straight, and stop short of the picture | **Active** | `/playground` | No curl, no seeded bend, a 22px tip gap — and seats priced rather than filtered | [#decision-036](#decision-036) |
| DECISION-037 | Portfolio and Playground share one hero component | **Active** | both modes | `PageHero`: one description of where the first screen goes, so the mode switch stops moving the page | [#decision-037](#decision-037) |
| DECISION-038 | The collage cards play the whole film | **Active** | `/playground` | Reverses the card half of `DECISION-030`; 1.7 MB of cuts becomes 15.5 MB of films, fetched only on screen | [#decision-038](#decision-038) |

### Needing an owner decision

**All three were answered on 2026-08-24.** What is left is not a decision but material:

- **Images.** Most of them already exist, inside the six project documentations —
  `docs/reference/image_sources.md` maps each document to its project and its slots. What
  the owner still has to decide is **whether Hibi becomes a seventh case study**: it has two
  full documentations behind it and no page on the site.
  Every slot, with its aspect ratio and where it appears, is in `docs/reference/image_manifest.md`.
- **A custom domain**, if one is wanted (`DECISION-012`) — the site works without it.
- **Participation in the copy pass** (`MILESTONE-004`), which `DECISION-011` requires:
  nothing may be invented to fill a gap.


---

<a id="decision-001"></a>

## DECISION-001 — Vite + React SPA instead of Next.js App Router

Status: Active
Date: Commit `7fb7755` (before 2026-08-22)
Scope: Whole project

### Context

The project was originally built on Next.js (App Router) — commit `aa527f9` is a
checkpoint of that implementation. Commit `7fb7755` migrated the whole codebase to
Vite + React + TypeScript as a static SPA.

### Decision

Ship as a client-rendered static SPA built by Vite, deployed as plain files with an SPA
rewrite.

### Reasoning

Not recorded in the repository. Inferable from what the migration produced: a portfolio
with no server-side data needs, no API routes and no authentication gains little from
Next, while Vite gives a much faster dev loop and simpler hosting.
**Partly Unknown / inherited from the migration commit.**

### Alternatives

Staying on Next.js (static export would have kept per-route metadata); Astro (better fit
for a content site of this shape).

### Consequences

- Dev and build are fast (a full production build takes ~1s).
- Deployment is any static host with a catch-all rewrite.
- **Lost:** per-route server-rendered metadata (`ISSUE-013`, still open), automatic
  hash-anchor scrolling (`ISSUE-002`) and automatic scroll restoration (`ISSUE-003`) —
  both rebuilt by hand in SESSION-002 (`DECISION-013`) — and `next/image` (replaced by a
  stub, `DECISION-005`).
- ~~Next.js artefacts remain in the tree (`ISSUE-018`).~~ Removed in SESSION-002.

### Relevant Files

`vite.config.ts`, `package.json`, `src/main.tsx`, `src/routes.tsx`, `index.html`

### Related Issues / Milestones

`ISSUE-002`, `ISSUE-003`, `ISSUE-013`, `ISSUE-018`, `MILESTONE-001`, `MILESTONE-008`


---

<a id="decision-002"></a>

## DECISION-002 — Path-prefix i18n with hand-written dictionaries

Status: Active
Date: Inherited from the original implementation
Scope: Routing, content

### Context

The site is bilingual (English default, German). The `.dc.html` design reference achieved
this with `data-de` attributes swapped by JavaScript and a `localStorage['am-lang']` key;
`design-reference/SPEC.md` §3 explicitly recommends porting it as "data held in a
translation dict per string key" rather than DOM text swapping.

### Decision

Locale lives in the URL path (`/about` vs `/de/about`). Every route is registered twice via
`dual()`. Locale is derived from `pathname` on every render; nothing is persisted. Copy
lives in two fully-typed dictionary objects plus per-locale content modules. No i18n
library.

### Reasoning

The SPEC recommended the dictionary approach. Path prefixes make every page linkable and
shareable per language, which `localStorage` would not. Typing the dictionary means a
missing translation is a compile error rather than a runtime fallback.

### Alternatives

`react-i18next` (heavier, and its runtime interpolation is unnecessary here);
`localStorage` + a single URL set (would break shareable German links).

### Consequences

- Adding a route means editing both branches — `dual()` makes this one line.
- Adding a field means editing `types.ts` plus both locale objects, or the build fails.
- No language preference is remembered across visits; a German speaker landing on `/`
  gets English until they toggle.
- Optional fields escape the compile-time guarantee — `afono.heroDisclosure` is missing in
  German and TypeScript does not complain (`ISSUE-009`).

### Relevant Files

`src/routes.tsx`, `src/lib/i18n.ts`, `src/lib/useLocale.ts`, `src/lib/dictionaries/*`

### Related Issues / Milestones

`ISSUE-005`, `ISSUE-009`, `MILESTONE-009`


---

<a id="decision-003"></a>

## DECISION-003 — Content lives in typed TypeScript modules

Status: Active
Date: Inherited from the original implementation
Scope: Content architecture

### Context

~975 discrete text fields across six case studies, six playground categories, an About
page, a résumé and shared UI labels — each needing an English and a German version.

### Decision

Everything is a typed TypeScript module under `src/lib/`. No CMS, no MDX, no JSON. Slug
registries (`as const` objects) map URL segments to content, with getters returning `null`
for unknown slugs.

### Reasoning

The owner is the only author, and the content is highly structured (a case study is not
free-form prose — it has facts, insights, testing steps, image slots). A typed model makes
the structure explicit and both locales mandatory. Editing happens through
`CONTENT_GUIDE.md`, which mirrors every field with its exact source path.

### Alternatives

MDX (better for free-form writing, worse for structured fields and bilingual pairing);
a headless CMS (overhead unjustified for a single author).

### Consequences

- Every copy edit is a code edit and a rebuild.
- Content structure is constrained by the types — which is exactly the limitation behind
  `ISSUE-024`: `body: string[]` could not express sub-headings or lists. Fixed in
  SESSION-003 by making it a `Block[]` union (`DECISION-014`) — within the typed-module
  approach, not by abandoning it.
- All six case studies are statically imported into one registry, so they cannot be
  code-split (`ISSUE-019`).
- `CONTENT_GUIDE.md` must be regenerated whenever the shape changes, or it misleads.

### Relevant Files

`src/lib/dictionaries/*`, `src/lib/caseStudies/*`, `src/lib/playground/*`, `CONTENT_GUIDE.md`

### Related Issues / Milestones

`ISSUE-007`, `ISSUE-010`, `ISSUE-019`, `ISSUE-024`, `MILESTONE-003`


---

<a id="decision-004"></a>

## DECISION-004 — Replace, rather than extend, Tailwind's palette and breakpoints

Status: Active
Date: Inherited from the original implementation
Scope: Styling

### Context

The design has a tight, specific palette taken from the coded reference designs, and a
custom `1160px` breakpoint where the header's nav links collapse.

### Decision

`theme.colors` and `theme.screens` are set directly on `theme` (not `theme.extend`),
replacing Tailwind's defaults. 17 named colours; six breakpoints including a custom `nav`.
Type scale, spacing and fonts go in `theme.extend`.

### Reasoning

Replacing the palette makes off-palette colours impossible to write accidentally —
`text-gray-500` simply does not compile. For a design portfolio that discipline is
appropriate.

### Alternatives

Extending (keeps defaults available, weakens the constraint).

### Consequences

- Any new colour must be added to the config — good discipline, but in practice it has
  been circumvented by arbitrary values (`bg-[#E6E7E9]`, `border-[#E4E7EE]`) rather than
  by extending the palette (`ISSUE-023`).
- `theme.screens` is order-sensitive and `nav: 1160px` sits before `lg: 1024px`
  (`ISSUE-011`).

### Relevant Files

`tailwind.config.ts`, `src/index.css`

### Related Issues / Milestones

`ISSUE-011`, `ISSUE-023`, `MILESTONE-007`


---

<a id="decision-005"></a>

## DECISION-005 — Hand-rolled `Image` and `Seo` replacing the Next.js equivalents

Status: Active
Date: Commit `7fb7755`
Scope: Components

### Context

The migration off Next.js removed `next/image` and the metadata API, both of which the
implementation depended on.

### Decision

Two minimal stand-ins:

- `src/components/ui/Image.tsx` — an `<img>` with `loading`/`decoding` and the `fill`
  layout mode only. `sizes` is accepted for API compatibility and **ignored**; the
  docstring says so explicitly.
- `src/components/Seo.tsx` — imperative `document.title` and `<meta>` writes in an effect.

### Reasoning

Stated in the `Image` docstring: every call site uses the `fill` pattern, and there is no
build-time responsive-image pipeline, so implementing more would be speculative. Keeping
the same prop names made the migration a near-mechanical find-and-replace.

### Alternatives

`vite-imagetools` (a real pipeline — deferred, see `SUGGESTION-012`); `react-helmet-async`
(a dependency for what is ~40 lines).

### Consequences

- No `srcset`, no modern formats, no width/height — fine while images are colour blocks,
  a problem once 5000×3750 originals arrive (`SUGGESTION-012`).
- `Seo` runs after hydration, so crawlers never see it (`ISSUE-013`), and it only restores
  `title` on unmount (`ISSUE-014`).
- The ignored `sizes` prop is a small trap: call sites pass it and it does nothing.

### Relevant Files

`src/components/ui/Image.tsx`, `src/components/Seo.tsx`

### Related Issues / Milestones

`ISSUE-013`, `ISSUE-014`, `MILESTONE-008`


---

<a id="decision-006"></a>

## DECISION-006 — The hatched placeholder is a design element, not just a missing asset

Status: **Superseded in practice** — the owner's answer, 2026-08-24: almost every
placeholder is meant to become a real image
Date: Inherited from the design reference; answered 2026-08-24 (SESSION-008)
Scope: Visual language

### Owner's answer (2026-08-24)

> "almost all placeholders are images"

So the hatched box is a **fallback**, not a destination. It stays in the code because it is
what renders until a file exists — and it is still the right treatment for a slot with no
asset — but no slot is planned to keep it permanently. The open question below is
answered: every image slot on the site should end up carrying a real image.

The consequence for the code is that the remaining 44 slots need a source field, which is
the rest of `ISSUE-007` and was blocked on exactly this.

### Context

Over 115 image slots have no photo. Rather than leaving gaps or grey rectangles, every one
renders a 45° hatched box with the correct aspect ratio and a monospace
`[ bracketed caption ]`.

### Decision

Keep `PlaceholderImage` as an intentional part of the visual language, particularly in the
Playground where the taped, rotated, hand-labelled cards read as a working sketchbook.

### Reasoning

`design-reference/SPEC.md` §13 states this directly: "Reuse this as a
`<PlaceholderImage>` component — it's already the intended fallback treatment, not just a
design-tool artifact." `CONTENT_GUIDE.md` §10.4 repeats it for the Playground: "This is a
deliberate visual style choice on this site … as much as it is 'images not supplied yet' —
worth deciding intentionally rather than assuming all 36 need real photos."

### Alternatives

Blur-up placeholders; hiding empty slots entirely (would collapse the layouts and hide the
intended structure).

### Consequences

- The site is presentable even with almost no real imagery.
- But the boundary between "styled choice" and "unfinished" is invisible to a visitor —
  on case studies, 71 hatched boxes read unambiguously as unfinished.
- ~~The types were built around it and carry no `src` field at all~~ — **fixed for case
  studies in SESSION-003**: `SectionImage` takes an optional `src`/`alt` and the hatched
  box is now the *fallback* rather than the only option (`ISSUE-007`). `PlaygroundItem`
  and `about.carouselItems[]` still carry no source field.
- `DECISION-014` adds one rule on top: a caption is rendered only where a real image
  exists. A placeholder keeps its `[ bracketed label ]` inside the box and gets no
  caption underneath, so the bracket stays the visible signal that no asset exists yet.

### ~~Open question for the owner~~ — answered

~~Which slots keep the placeholder aesthetic permanently and which must become real
photographs?~~ **Answered 2026-08-24: almost all of them are images.** The 44 remaining
slots got their source fields in SESSION-008, which closes `ISSUE-007`.

### Relevant Files

`src/components/PlaceholderImage.tsx`, `src/components/case-study/Section.tsx`,
`src/components/playground/*`

### Related Issues / Milestones

`ISSUE-007`, `MILESTONE-005`, `SUGGESTION-002`


---

<a id="decision-007"></a>

## DECISION-007 — The process canvas is hand-written rAF, not GSAP ScrollTrigger

Status: Active
Date: Inherited from the original implementation
Scope: Homepage animation

### Context

The signature homepage interaction — a rounded black card that grows to full-bleed while
a question shrinks into place and five branches reveal — was specified in
`design-reference/SPEC.md` §5 as "a pinned scroll-driven transition" with per-stage
opacity curves, and implemented in the reference `.dc.html` as a plain `<script>`.

### Decision

Port it as a `requestAnimationFrame` loop reading `window.scrollY` and writing inline
styles, with a local `smoothstep()` easing helper. Provide an entirely separate static
render for `max-width: 880px` and `prefers-reduced-motion`.

### Reasoning

The reference implementation was itself a rAF loop; porting the maths directly preserved
the exact choreography. GSAP was not yet a dependency when this was written — it arrived
later for scroll reveals (`DECISION-008`).

### Alternatives

GSAP ScrollTrigger with `pin` + `scrub` (would express the same choreography declaratively
and idle when off-screen); CSS scroll-driven animations (insufficient browser support at
the time).

### Consequences

- The choreography matches the reference closely.
- 408 lines of imperative style-writing in one component — the hardest area to modify.
- The loop never idles (`ISSUE-012`).
- Two motion systems now coexist on the homepage; anything that touches the canvas must
  not fight GSAP.

### Revisit when

`MILESTONE-006` — if the motion system consolidates on GSAP, re-expressing this with
`scrub` becomes attractive. It is a rewrite, not a refactor; do not attempt it casually.

### Relevant Files

`src/components/process/HeroProcess.tsx`, `branchData.ts`, `BranchGroup.tsx`,
`clusters.tsx`, `icons.tsx`

### Related Issues / Milestones

`ISSUE-012`, `MILESTONE-006`


---

<a id="decision-008"></a>

## DECISION-008 — GSAP for scroll reveals, called per page

Status: Active — amended in SESSION-002
Date: Uncommitted working tree, 2026-08 (added after `7fb7755`)
Scope: Animation

### Context

The `.dc.html` reference used an `IntersectionObserver` to fade `[data-inview]` elements
in. The Vite port needed an equivalent.

### Decision

Add `gsap` + `ScrollTrigger` and a `useScrollReveals()` hook, **called by each page
component** rather than once in the layout. ~~`index.css` sets `[data-inview] { opacity: 0 }`
so nothing flashes before the first tween, with a reduced-motion override restoring
visibility.~~

**Amended, SESSION-002:** the CSS guard is gone. The hook now applies the at-rest state
itself from a `useLayoutEffect` — before the first paint, so it still does not flash — and
its effects are keyed on the pathname rather than on mount. See the Consequences below.

**Amended, SESSION-012:** nested reveals are allowed, and coherent. A `[data-inview]`
element inside a section that also carries one is always lower in the flow than its
section, so its trigger never fires first: while the section is at rest the child is
invisible with it, and once the section has arrived the child waits for its own turn.
Case-study media uses this — wide figures `scale`, grids `stagger`.

**Amended, SESSION-011:** the timings moved to `src/lib/motion.ts` (`SUGGESTION-006`) and
the hook gained `data-inview` variants — `up` (the default), `fade`, `scale` and `stagger`,
where one trigger animates the element's children. The contract below is unchanged: the
at-rest state is still applied in a layout effect before paint, still `opacity` rather than
`autoAlpha`, and still consults one reduced-motion guard — which now lives in the motion
module rather than in this file.

**Amended, SESSION-009:** the at-rest state is `opacity: 0`, not GSAP's `autoAlpha`.
`autoAlpha` also sets `visibility: hidden`, and a hidden subtree is removed from the tab
order — so any control inside a section that had not been revealed yet was unreachable by
keyboard, which is how the playground's new pause control turned out to be unusable
(`ISSUE-030`). At-rest elements are below the fold by definition, so being nominally
clickable while invisible costs nothing. Focus entering a `[data-inview]` section now
**completes that section's reveal tween** — not `gsap.set`, which would leave the trigger
armed to replay the reveal and flash the control the visitor is focused on.

### Reasoning

Recorded in the hook's own docstring: pages are lazy-loaded, so a layout-level effect keyed
on the route would fire before the page's `[data-inview]` markup mounted and find nothing.

### Alternatives

`IntersectionObserver` (what the reference used — zero bytes, no dependency, sufficient
for a fade); a layout-level GSAP context with `ScrollTrigger.refresh()` on navigation.

### Consequences

- ~46 KB gzip of GSAP for a fade and an 18px lift (`ISSUE-019`) — justified only if the
  motion work in `MILESTONE-006` actually uses GSAP's range.
- Every new page must remember to call the hook.
- ~~The mount-only effect combined with the CSS `opacity: 0` guard produces `ISSUE-001`, a
  critical bug: content stays invisible when only a route param changes.~~ Fixed in
  SESSION-002 (`92b63f4`).
- ~~The CSS guard is a single point of failure — if the hook does not run, content is gone.~~
  Removed: the at-rest state is now owned by the hook, so a page whose script never runs is
  readable rather than blank.
- A `focusin` listener lives alongside the triggers and is torn down with them. It is a
  passive listener, so it does not touch the effect-ordering contract below.
- The hook is now coupled to `useScrollBehavior` by effect ordering: the at-rest state is
  applied in a layout effect (child, so it runs first), the ScrollTriggers are built in a
  passive effect (after `RootLayout` has finalised the scroll offset), and
  `ScrollTrigger.update()` is called first so GSAP does not measure against the outgoing
  page's offset. Changing either hook's effect *kind* will break the other.

### Relevant Files

`src/lib/useScrollReveals.ts`, `src/index.css`, `package.json`, all page components

### Related Issues / Milestones

`ISSUE-001` (resolved), `ISSUE-019`, `MILESTONE-001`, `MILESTONE-006`, `SUGGESTION-006`, `DECISION-013`


---

<a id="decision-009"></a>

## DECISION-009 — The coded `.dc.html` designs are authoritative over the prose brief

Status: Active
Date: Recorded in `design-reference/SPEC.md`
Scope: Design fidelity

### Context

Two design sources exist: `design-reference/master-prompt.md` (5095 lines of prose brief)
and 16 `.dc.html` coded reference designs. They disagree in places — most visibly on the
accent colour, where the brief names `#5C6CFF` and every coded file uses `#1B3FE0`.

### Decision

The `.dc.html` files win. `design-reference/SPEC.md` states it in its opening lines:
"treat these as the authoritative visual source; the prose brief is background/intent
only."

### Reasoning

The coded files are what was actually designed against and reviewed; the brief describes
intent that was revised during design.

### Alternatives

Following the brief (would have produced a different accent colour, a persistent mobile
second row, a standalone `/contact` page and a fuller About outline).

### Consequences

- Accent is `#1B3FE0`, focus `#1233C4`.
- `/contact` is a redirect to a homepage anchor rather than a page (`ISSUE-022`).
- The About page has four sections, not the brief's seven.
- **`design-reference/` is gitignored** — the authoritative source exists only on this
  machine and is not backed up by the repository. Key values are mirrored into
  `docs/reference/handbook.md` as insurance.

### Deliberate departures so far

- **`DECISION-014`** (SESSION-003, extended SESSION-004) — the case-study reading
  column. Sub-headings, bullet lists and bordered notes render as themselves rather than
  as the reference's uniform paragraph column; body text sits at a 680px measure with
  media running wider; the design question, insights and testing steps get three distinct
  treatments; and the closing section moves onto its own band. The reference's
  case-study page is no longer a useful comparison for anything below the facts strip.

### Relevant Files

`design-reference/SPEC.md`, `design-reference/master-prompt.md`,
`design-reference/pages/*.dc.html`, `.gitignore`, `docs/reference/handbook.md`

### Related Issues / Milestones

`ISSUE-022`, `MILESTONE-003`


---

<a id="decision-010"></a>

## DECISION-010 — Homepage work section replaced with a bento grid

Status: **Active** — confirmed by the owner, 2026-08-24
Superseded: **by `DECISION-021`, 2026-09-09** — the owner rejected the bento twice and approved project cards in its place
Date: Uncommitted working tree, 2026-08; confirmed 2026-08-24 (SESSION-008)
Scope: Homepage

### Context

The homepage originally rendered `dictionary.projects` through `ProjectEntry.tsx` as two
large editorial features plus a four-item grid, matching `design-reference/SPEC.md` §4/§6.

### Owner's answer (2026-08-24)

**Keep the bento grid**, and the owner will produce the images for it. That settles the
direction `MILESTONE-002` was blocked on since SESSION-002: the work is no longer "should
this exist" but "make it carry images, in both languages".

What that leaves to do, in `MILESTONE-002`:

- the eleven tiles need images (`ISSUE-004`) — the owner is making them; the slots and the
  manifest are in `docs/reference/image_manifest.md`
- the tile copy has to come from the dictionaries rather than being hard-coded English
  (`ISSUE-005`)
- five of six projects appear twice under different category labels. With images that
  reads as a portfolio of work rather than a duplicate list, so it stays — but it means
  eleven images, not six.

### Decision (as implemented, not yet approved)

Replace it with `BentoGrid` — eleven tiles on a 10-column CSS grid with explicit
`gridArea` placement, each showing a category label and a title on a flat grey background.
`ProjectEntry.tsx` was deleted.

### Reasoning

**Unknown / inherited from an in-progress experiment.** No rationale is recorded in the
code or commit history — the change is uncommitted. The likely intent is a more
distinctive, asymmetric composition than the reference's editorial stack.

### Alternatives

Keeping the editorial layout; an image-backed bento with one tile per project.

### Consequences

- All project imagery, headlines, descriptions, tags, roles and years disappeared from the
  homepage (`ISSUE-004`).
- Tile copy is hard-coded English, breaking `/de` (`ISSUE-005`).
- Five of six projects appear twice under different category labels.
- Several `ProjectCopy` fields became dead (`ISSUE-010`).
- Diverges from `DECISION-009`.

### Status note

Marked **Under review** rather than Active: this is unfinished work, not a settled choice.
The owner should confirm the direction before `MILESTONE-002` proceeds. Recover the
previous implementation with `git show HEAD:src/components/ProjectEntry.tsx`.

### Relevant Files

`src/components/BentoGrid.tsx`, `src/components/SelectedWork.tsx`, `src/index.css`
(the `[data-el="bento"]` override)

### Related Issues / Milestones

`ISSUE-004`, `ISSUE-005`, `ISSUE-010`, `MILESTONE-002`, `SUGGESTION-001`


---

<a id="decision-011"></a>

## DECISION-011 — Copy honesty constraint

Status: Active
Date: Recorded in `design-reference/SPEC.md` §12 (brief Part AP)
Scope: All written content

### Context

Design-portfolio copy conventionally inflates: invented metrics ("increased engagement by
40%"), implied clients, sole credit for team work, and generic craft language.

### Decision

None of that. Specifically, from `SPEC.md` §12 and visible throughout the case studies:

- No invented employers, clients, awards, testimonials, metrics or dates.
- Never describe collaborative work as independent — Role/Contribution/Type facts encode
  who worked alone (WikiMind, AFONO) versus with others (Sync FM, Kitchen, Surugami, QIS).
- Collaborators are credited explicitly ("Final rendering by a team member").
- Claims are hedged where evidence is absent ("does not claim a measured improvement").
- No portfolio-speak — no "pixel perfect", no "crafting delightful experiences".
- No lorem ipsum.

### Reasoning

The work is student and personal work presented honestly. The candour is a differentiator,
not a weakness — and inflated claims are easy for an interviewer to puncture.

### Alternatives

Conventional portfolio marketing language. Rejected in the brief.

### Consequences

- Case studies end in reflection and limitation rather than triumph — honest, but it does
  leave the "what happened as a result" question weakly answered (`SUGGESTION-014`).
- Any copy pass (`MILESTONE-004`) must preserve every factual claim exactly. "Make it more
  compelling" must never become "make it less true".
- The AI-use disclosure on the About page follows the same principle.

### Relevant Files

All six `src/lib/caseStudies/*.ts`, `src/lib/dictionaries/{en,de}.ts` (`about.aiBody`),
`design-reference/SPEC.md` §12

### Related Issues / Milestones

`MILESTONE-004`, `SUGGESTION-005`, `SUGGESTION-014`


---

<a id="decision-012"></a>

## DECISION-012 — Static hosting with a catch-all SPA rewrite

Status: Decided (GitHub Pages) — and the résumé now links here, not to Adobe Portfolio
Date: 2026-08-22; the link answered by the owner 2026-08-24 (SESSION-008)
Scope: Deployment

### Owner's answer (2026-08-24)

> "dont point at the adobe one. point at this website."

The résumé's portfolio link pointed at `alexshamaharjan.myportfolio.com`, an Adobe
Portfolio site — i.e. the page that presents this designer's work pointed visitors at a
different portfolio. It now points at this one, `https://alexshamaharjan.github.io`.

Still open, and smaller: whether a custom domain is wanted. If one is added,
`dictionaries/{en,de}.ts` (`resume.portfolio` / `resume.portfolioHref`) is the one place to
change it. Note also that deployment is manual — `npm run deploy` — because the Actions
workflow was removed for lack of a token scope; nothing publishes on push.

### Context

Client-side routing means a request for `/work/wikimind` must be answered with
`index.html`, or the host returns 404.

### Decision

Ship `dist/` to a static host, providing the rewrite two ways: `public/_redirects`
(Netlify) and `cp dist/index.html dist/404.html` in the build script (GitHub Pages).

### Reasoning

**Unknown / inherited.** Both fallbacks appear to have been added speculatively so the
build would work on either host without a further decision.

### Alternatives

A Node server (unnecessary); Next.js static export (superseded by `DECISION-001`).

### Consequences

- The build output works on either host without further configuration.
- But neither host is actually configured, and there is no CI (`ISSUE-025`).
- Carrying both conventions is mildly confusing — a reader cannot tell which is intended.
- Deep links only work if the chosen host honours one of the two mechanisms.

### Open question for the owner

Which host, which domain, and does this replace `alexshamaharjan.myportfolio.com` (the
Adobe Portfolio URL still cited on the résumé page)?

### Relevant Files

`package.json`, `public/_redirects`, `src/lib/dictionaries/{en,de}.ts` (`portfolioHref`)

### Related Issues / Milestones

`ISSUE-025`, `MILESTONE-008`, `SUGGESTION-016`


---

<a id="decision-013"></a>

## DECISION-013 — Hand-rolled scroll behaviour instead of `<ScrollRestoration />`

Status: Active
Date: 2026-08-22 (SESSION-002)
Scope: Routing, navigation

### Context

`ISSUE-002` and `ISSUE-003` both needed fixing, and their own notes offered the obvious
option: render react-router's `<ScrollRestoration />`, which already does top-reset,
back/forward restore, and a hash scroll, backed by `sessionStorage`.

### Decision

Write `src/lib/useScrollBehavior.ts` instead, called once from `RootLayout`, and do not use
`<ScrollRestoration />`.

### Reasoning

Its source (`node_modules/react-router/dist/development/chunk-*.mjs`, `useScrollRestoration`)
was read before deciding. Three things make it the wrong fit here:

1. **Its hash branch cannot see a lazy page.** It runs `document.getElementById(...)` in a
   `useLayoutEffect` that fires on the same commit as the navigation. Every page in this app
   is `React.lazy` behind a `Suspense` boundary (`ARCH-01`), so on a cold navigation the
   target does not exist yet; it falls through to `window.scrollTo(0, 0)` and never retries.
   That is precisely `ISSUE-002`.
2. **It scrolls with the two-argument `window.scrollTo(0, 0)`**, which inherits
   `html { scroll-behavior: smooth }` from `index.css`. Every route change would animate as
   a long sweep back up the outgoing page.
3. **Its hash scroll and its restore cannot be sequenced with the reveals.** `ISSUE-001`'s
   fix depends on the scroll offset being final and synchronous before `useScrollReveals`
   builds its ScrollTriggers.

Combining it with a separate hash hook was considered and rejected: the two would each
scroll on the same commit, and the built-in one would win or lose depending on effect
ordering.

### Alternatives

- `<ScrollRestoration />` alone — fails 1 and 2 above.
- `<ScrollRestoration />` plus a `useHashScroll()` — two components racing for the scroll
  position on every navigation.
- Removing `html { scroll-behavior: smooth }` so the built-in behaves — would silently
  change the case-study contents rail, whose `ContentsNav` uses native `<a href="#…">`
  anchors and relies on that rule.

### Consequences

- ~200 lines to own and keep working, against a maintained upstream component.
- In exchange: the hash scroll survives Suspense, the smooth/instant choice is explicit per
  navigation, reduced motion is honoured, and the ordering that `ISSUE-001` depends on is
  guaranteed.
- `history.scrollRestoration` is set to `"manual"`, so the browser's own restoration is off
  and this hook is now solely responsible for it.
- Scroll offsets live in `sessionStorage` under `am:scroll-positions`, keyed by
  `location.key`; failures there are swallowed (private mode) and degrade to "no restore".

### Relevant Files

`src/lib/useScrollBehavior.ts`, `src/components/RootLayout.tsx`, `src/index.css`

### Related Issues / Milestones

`ISSUE-002`, `ISSUE-003`, `ISSUE-022`, `ISSUE-001`, `MILESTONE-001`, `DECISION-001`


---

<a id="decision-014"></a>

## DECISION-014 — Case-study body content is a block model, and the reading column departs from the reference

Status: Active
Date: 2026-08-23 (SESSION-003; extended SESSION-004 with the layout half)
Scope: Content architecture, case-study layout

### Context

`CaseStudySection.body` was `string[]`, rendered as a column of identical paragraphs.
Sub-headings, list items, disclosure notes and stats lines were all being written as
ordinary strings, so they read as body text (`ISSUE-024`). The `.dc.html` reference
designs — authoritative per `DECISION-009` — show exactly that uniform column, because
the reference expressed the distinctions with per-element inline styles that the port
flattened away.

### Decision

Three things, taken together:

1. **`body[]` holds blocks, not strings.** A bare string is still accepted as shorthand
   for a paragraph, so nothing had to change at once and a writer can keep typing plain
   strings. Beyond that: `h3`, `list` (optionally `ordered`), `quote`, `note`, `figure`.
2. **`note` is a kind, beyond what `SUGGESTION-004` proposed.** Four case studies carry
   editorial disclosures ("Label: AI-assisted hypothesis persona"; "Research note:
   simulation … does not reproduce the lived experience of disability") and two carry
   stats or version lines. These are neither paragraphs nor headings, and rendering them
   as body text is precisely what `DECISION-011` (copy honesty) is undermined by — a
   disclosure that looks like prose is easy to skim past.
3. **This is a knowing departure from `SPEC` §9**, the departure `DECISION-009` asked to
   have recorded. Sub-headings, bullet lists and bordered notes do not appear in the
   reference's case-study column. The owner asked for the case-study pages to read
   better, and the reference is a static mockup of the pre-existing text.

A fourth, smaller rule falls out of the `Figure` component: **a caption is shown only
when a real image exists.** With a `src`, the image renders with its caption underneath,
brackets stripped. Without one, the slot stays the hatched box with its
`[ bracketed label ]` inside and no caption below — the bracket is this site's signal
that no asset exists yet (`DECISION-006`), and repeating it as a caption would state the
same thing twice.

### Reasoning

The content model, not the CSS, was the ceiling on the case-study layout — no amount of
styling can distinguish a sub-heading from a paragraph when both are the same string in
the same array. Keeping bare strings valid meant the migration could not break the
build, and in the end both locales moved together in one pass because only the shape
changed, not the words.

### Alternatives

- Keeping `string[]` and inferring structure from the text (length, trailing
  punctuation) — brittle, and silently wrong on any sentence that happens to be short.
- MDX or a rich-text field per section — abandons the typed-both-locales guarantee that
  `DECISION-003` exists for.
- Following the reference exactly — leaves the owner's first-named complaint unaddressed.

### Consequences

- `CONTENT_GUIDE.md` §5's `body[n]` indices moved, and will move again on any
  restructuring. §5 is now generated by `scripts/content-guide-case-studies.mjs`, which
  is the first script this repository has.
- German blocks must keep matching English ones structurally. They do today, block for
  block; nothing enforces it beyond the types, so a restructure that touches only one
  locale would pass the build and read wrong.
- `quote` and `figure` are implemented and currently unused. SESSION-004 kept both
  deliberately: `quote` now has a designed pull-quote treatment and the copy pass
  (`MILESTONE-004`) is the natural place for one to appear. Delete them if that pass ends
  without using them.
- The case-study column no longer matches `design-reference/pages/*.dc.html`. Anyone
  comparing the two should expect the difference.

### The layout half (SESSION-004)

Four further choices, all departures from the reference's single-width column:

1. **~~Text sits at a 680px measure; media does not.~~ — reversed 2026-08-25, see
   amendment 2 below.** The reference column ran body text the full 960px — about 110
   characters a line, well past comfortable. Text was capped at ~70 characters while
   media, set pieces and section headings ran wider, and that width difference was the
   page's rhythm: text-only sections deliberately left the right of the column empty.
2. **No viewport-wide full-bleed.** `SUGGESTION-003` asked for full-bleed media moments.
   They were not built: the contents rail is `position: sticky` in the left grid column,
   and anything breaking out leftwards shares its horizontal band and collides with it.
   The three scales that exist — grid figure, full column, hero image — carry the
   variation instead. Reopening this means moving the rail out of the flow first.
3. **The rail appears at 1280px, not 768px.** It was reserving 240px plus a 40px gap from
   `md` up, which left the reading column ~313px wide at 768px and ~569px at 1024px.
   Below 1280px the collapsible list takes over and names the current section.
4. **The closing section leaves the reading column.** It renders on its own tinted band
   below the grid, heading beside text. It keeps its number, nav label, anchor id and
   reveal, so the rail, the anchors and `ISSUE-008`'s "one render path" all still hold —
   `first` and `outro` vary spacing and scale, nothing else.

And one correctness change that came out of building it: **hash landings are aimed at the
target's layout position, not its rendered box.** A section that has not revealed yet is
translated down 18px by the at-rest state (`DECISION-008`), so aiming at the rendered box
left the landing short by whatever remained of the tween. That was latent before; this
layout's timing made it show up on ordinary cold loads. `useScrollBehavior` now sums
`offsetTop` and subtracts the element's own `scroll-margin-top`, which is stable while the
reveal runs. `ISSUE-027` covers the one path that never reaches the hook.

### Amendment 2 — one column width (2026-08-25, owner)

The owner, looking at a case study: *"the size of the images are perfect but why does the
text end in the middle, and not upto the images?"*

The measure above is reversed. Everything in the reading column — body, lists, quotes, the
design-question band, section headings, the `h1`, the summary and the facts list — now runs
the full column width.

**Point 1's reasoning was not wrong; its setting changed.** 680px was chosen in SESSION-004
when the reading column sat below a full-width hero and beside full-width media, where the
difference in width read as rhythm. `DECISION-017` moved the hero and the title into the
column and made it narrower, and in that setting the same gap reads as unfinished — four
widths down one column (media 960, heading 900, design-question band 840, body 680), every
paragraph ending with 280px of empty page next to a figure that ran to the edge.

**The cost is real and was accepted knowingly.** The line is now ~101 characters at 1440px,
against ~76 before and the ~66 that is ideal. Body type went from 18px/1.7 to 19px/1.75,
because a long line suffers most from tight leading. The alternative — narrowing the column
so text and media meet at a comfortable measure — costs the image size the owner said was
right, so it was not taken.

Point 2 (no viewport-wide full-bleed) and point 4 (the closing section leaves the column)
are unaffected. The closing band's 680px text column is one half of a heading-beside-text
spread, not a measure cap, and already fills its side.

### Relevant Files

`src/lib/caseStudies/types.ts`, `src/components/case-study/Section.tsx`,
`src/components/case-study/Figure.tsx`, `src/components/case-study/SectionMedia.tsx`,
`src/components/case-study/ContentsNav.tsx`, `src/components/case-study/CaseStudyPage.tsx`,
`src/lib/useScrollBehavior.ts`, `scripts/content-guide-case-studies.mjs`,
`CONTENT_GUIDE.md` §5

### Related Issues / Milestones

`ISSUE-024`, `ISSUE-008`, `ISSUE-007`, `SUGGESTION-004`, `SUGGESTION-002`,
`SUGGESTION-003`, `MILESTONE-003`, `MILESTONE-004`, `DECISION-003`, `DECISION-006`,
`DECISION-009`, `DECISION-011`


---

<a id="decision-015"></a>

## DECISION-015 — GSAP stays eagerly loaded; the case-study registry does not

Status: Active
Date: 2026-08-25 (SESSION-013)
Scope: Performance, motion

### Context

`ISSUE-019` filed two bundle complaints together, and they turned out to have different
answers.

Measured on the production build, uncompressed transfer, cache disabled:

| Chunk | Before | After |
| --- | --- | --- |
| Case study (all six studies, both locales) | 126 KB / 40 KB gzip | 13 KB shell + 15–22 KB per study |
| GSAP + ScrollTrigger | 114 KB / 46 KB gzip | unchanged |
| Total JS on a case-study page | ~480 KB | ~474 KB, of which a quarter is GSAP |

First contentful paint: 152ms on the homepage, 168ms on a case study.

### Decision

**Split the case-study registry per slug.** Each study is a dynamic `import()` behind a
cached promise, read with React's `use()` so the page suspends into the loading bar rather
than rendering empty. A visitor reading one case study downloads that one.

**Leave GSAP eagerly imported**, and stop treating that as a defect to be fixed later.

### Reasoning

The registry split is free: nobody needs the other five studies, the loading state already
existed (`ISSUE-020`), and suspending keeps the content present before `useScrollReveals`
builds its triggers — an effect-based load would render the page empty first and rebuild
the `ISSUE-001` bug from parts.

GSAP is a different case:

- **It is already code-split.** It is not in the main bundle; it is its own chunk.
- **Deferring it hides content rather than saving time.** The reveals apply their at-rest
  state in a layout effect *before the first paint*, deliberately, so an incoming page never
  flashes fully visible. Behind an `await`, that hide lands after the paint — which is the
  flicker SESSION-010 spent its session removing, in the other direction.
- **The alternative is to stop hiding what is already on screen**, which SESSION-011 built,
  measured, and reverted: it removed the entrance animation the site was designed with.
- **It earns more than it did when `ISSUE-019` was filed.** Then it drove one fade. It now
  drives the reveals and their four variants, the case-study hero drift, the velocity-linked
  playground rows, and the trigger refresh after fonts settle.

### Alternatives

**Drop GSAP entirely.** Everything it does here could be rebuilt on `IntersectionObserver`,
a scroll listener and the Web Animations API in perhaps a hundred lines — the reveals were
originally an `IntersectionObserver` in the design reference (`DECISION-008`). That would
save 46 KB gzip on every page.

It is a rewrite of five working features, not a refactor, and it should be its own decision
with its own session — the same line `MILESTONE-006` drew around the process canvas. Worth
revisiting if the site ever needs to be fast on a slow connection more than it needs to be
what it is.

### Consequences

- A case-study visit is ~100 KB lighter, and the six studies no longer grow one chunk
  together as content is added.
- `getCaseStudy` is gone; the registry exposes `caseStudyPromise` and `localeContent`. The
  two generator scripts await it.
- GSAP remains a quarter of the JavaScript on every page. That is now a recorded choice
  rather than an open ticket.
- `ISSUE-019` is closed by this decision, not by fixing everything it listed.

### Relevant Files

`src/lib/caseStudies/index.ts`, `src/pages/CaseStudy.tsx`, `src/lib/useScrollReveals.ts`,
`scripts/content-guide-case-studies.mjs`, `scripts/image-manifest.mjs`

### Related Issues / Milestones

`ISSUE-019`, `ISSUE-020`, `ISSUE-001`, `DECISION-008`, `MILESTONE-006`, `MILESTONE-008`


---

<a id="decision-016"></a>

## DECISION-016 — Image provenance: only the owner's own work ships

Status: Active
Date: 2026-08-25 (SESSION-015)
Scope: Every image on the site

### Context

`docs/reference/image_sources.md` establishes that most of the site's 129 empty image slots
can be filled from six university project documentations. Those documents are academic work,
and academic work cites its references *inside itself*: mood boards, competitor screenshots,
inspiration pages and stock photography sit on the same pages as the owner's own diagrams,
wireframes and screens.

This is not hypothetical. `FInalDesmeth.pdf` (Surugami) carries a sources page crediting
Freepik photographs by URL and stating that *"P4, P5, P6, P7, P8: All references were taken
from Pinterest"*. Five pages of that document are other people's images.

A documentation submitted for a grade may quote freely under academic fair use. A public
portfolio that shows the same image, uncredited, next to the sentence "I designed this" is a
different act with different consequences — both a licensing exposure and a
misrepresentation.

### Decision

**Only work the owner made ships.**

- **Read the sources / references section of a documentation before exporting from it.**
  Every one of the six has one. It is the fastest way to learn which pages are borrowed.
- Where a page mixes the owner's diagram with borrowed imagery, **crop to the owner's part**.
- Competitor screenshots and market analyses stay out, even where a case study discusses
  them. `[ competitor analysis ]` in the manifest means *the owner's analysis* — the
  comparison chart, the annotated table — not the competitor's interface.
- Stock photography used inside a mockup is acceptable where it is incidental to a design the
  owner made (a placeholder face inside their own UI), and only if the licence permits it.
  A stock photograph shown as the work is not.
- Collaborative work may be shown. Four of the six projects were team projects; `DECISION-011`
  already requires the copy to credit collaborators, and the case studies do.

### Reasoning

`DECISION-011` forbids inventing copy — no fabricated metrics, no implied clients, no sole
credit for team work. The same standard has to hold for images, and images make the claim
more forcefully than a sentence does. A portfolio's entire argument is "this is my work";
the one thing it cannot survive is that claim being false.

There is a practical reason too. This portfolio is for job applications. A reviewer who
recognises a Freepik photograph or a competitor's screenshot presented as original work does
not raise a query — they stop reading.

### What it found when applied (SESSION-016)

All six documentations cite borrowed material inside themselves — the rule was not
hypothetical in a single case:

- **Surugami** — Freepik by URL, and five pages from Pinterest.
- **AFONO** — pages 25–27 are headed *"KI-generierte Modemodelle und Mockups"*, and the
  document itself calls them placeholders for later real photography. **This one is the
  owner's call, not a licensing question**, and was left to them. **Its sources page turns
  out to say more than this** — see the amendment below.
- **QIS Portal** — flaticon icons, Freepik illustrations, a login background from a Google
  image search; and its "Originale" screenshots are the university's live portal.
- **Kitchen** — three Sketchfab models: the wheelchair figure, a jar, a decor pack.
- **WikiMind** — no sources page, but unattributed stock portraits in its personas.
- **Sync FM** — no sources page, but page 38 states three images were AI-made.

Nothing borrowed shipped.

### Consequences

- Extraction is a **manual, page-by-page** step. `scripts/pdf-page.js` deliberately renders
  whole pages rather than bulk-extracting embedded images, because a bulk extractor would
  strip the borrowed images out along with the owner's and lose the distinction.
- Some manifest slots will not be fillable from the documentations and will need new work or
  a deliberate empty. The hatched placeholder is a designed state (`DECISION-006`), so an
  unfillable slot is not a broken page.
- Surugami is the most affected project: five of its pages are reference material.

### Alternatives Rejected

**Extract everything, filter later.** Faster to start, and it puts the borrowed images into
`public/images/`, which ships — the exact mistake SESSION-014 caught with the image manifest
being served publicly. Filtering something out of a deploy is harder than never adding it.

**Credit borrowed images in the caption instead of excluding them.** Honest, but it fills a
portfolio's finite space with other people's work, and it does not resolve the licence.


### Amendment 1 — a summary of a sources page is not the sources page (2026-08-25, SESSION-020)

The table above compresses each document's sources page to a line. For AFONO that line said
"pages 25–27 are AI-generated". Reading the page itself, before exporting, found three more
entries that the summary had dropped:

| Entry on AFONO's sources page | What it means for the site |
| --- | --- |
| *KI-generierte Mockups (ChatGPT)* — "Mode- **und Produkt**mockups … Platzhalter für spätere echte Fotografie" | Not only the model shots. Every product visual in the prototype is a placeholder |
| *Screen Mockup* — `graphicgata.com/3d-imac-screen-mock-up` | The iMac in the "Screen Mockup" figure is a downloaded template |
| *T-shirt Mockup* — `pixelbuddha.net/…/streetwear-t-shirt-mockup-with-rear-view` | The blank garment render is someone else's asset |
| *T-shirt Oversized Vorne und Hinten* — `behance.net/asset/325227/Oversized_Tee_MockUp_PSD` | So is the second one |
| *Visuelle Referenzen* — Zara, Mango, H&M, Noah NYC, Awake NY | The market-analysis page's photography |

None of this changes the decision. It changes what the decision *excludes*, and it would
have been missed by anyone working from the summary rather than the document.

**So: read the sources page of the document you are exporting from, every time, even when
this file already has a row for it.** The row is an index, not a substitute. The cost of
re-reading one page is a minute; the cost of the alternative is shipping someone else's
asset under the sentence "I designed this".

#### What "crop to the owner's part" meant here

A mockup PSD sits in an awkward middle: it is licensed for exactly this use, and the design
applied to it is the owner's. It is still not the owner's photograph. Rather than decide
that question site-wide, SESSION-020 sidestepped it — AFONO's `[ tee — front ]` and
`[ tee — back print ]` slots are filled with **the print artwork itself** rather than with a
render of a tee wearing it.

That is the stricter reading, and it also turned out to be the better figure: the case study
says "a small front mark keeps the garments easy to wear, larger back prints carry the main
visual narrative", and the artwork shows exactly that, at a size where it is legible.

An incidental thumbnail *inside* a screenshot of the owner's own interface — the ~10px
product image in AFONO's order summary — is not covered by this. It is illegible, it is part
of a UI the owner built, and the existing clause about stock inside a mockup already allows
it.
### Amendment 2 — Sync FM, and the case where the figure does not exist (SESSION-021)

`Enddokumentation.pdf` has no page headed *Quellen*. It has one headed **"Tools und KI"**,
which is the same thing under a different name, and re-reading it moved four slots rather
than one:

| What page 43 says | What it costs |
| --- | --- |
| *"Mit **ChatGPT** haben wir **Personas** für die App erstellt"* | The three persona slots are AI-authored content |
| *"**Gemini 3 (Nano Banana)** wurde für die **erste Logo-Ideen** verwendet"* | The three logo drafts on page 12 are generated |
| *"Gemini … um **Perspektivansichten** unserer selbst gestalteten Illustrationen zu generieren"* | The 3D "Geons" renders on pages 36–38 are generated views of the team's own flat artwork |
| *ElevenLabs as KI-Audio-Generator* | Audio only — no visual consequence |

The row in `image_sources.md` said "page 38 states three perspective images were made with
AI". That was true and it was not enough: the personas were the bigger exclusion, and they
are named on a different line of the same page.

#### The refined-from-generated case

Page 12 is the clearest example so far of a page that has to be cropped rather than taken or
rejected whole. Its top half is an uploaded reference photograph of a vintage radio plus
three Gemini drafts. Its bottom half is the sentence **"Wir haben die KI-generierten Entwürfe
eigenständig angepasst und verfeinert, um einen klaren flachen Vektorstil mit schwarzem
Umriss zu erreichen"** — and the two refined marks that resulted.

**The refined vectors ship; the drafts and the reference photo do not.** Redrawing something
as your own artwork is authorship, and the documentation states it plainly. What ships is
the part the owner drew.

#### When there is no figure at all

Four Sync FM slots were left hatched, and only one of them for a provenance reason:

- `[ competitor comparison ]` — page 5 analyses bigGPT, RadioGPT and Spotify's AI DJ **in
  prose**. There is no comparison figure to crop.
- `[ persona 01–03 ]` — pages 9–11 are running text. There is no persona card, no portrait,
  no layout. Even setting the ChatGPT authorship aside, **there is nothing to export.**
- `[ ethical-risk diagram ]` — the case study's ethics section is the strongest writing in
  it, and the documentation has no diagram behind it.

This is worth stating because it is a different failure mode from the ones above, and the
honest response is the same: leave the hatch, say why. `DECISION-006` already establishes
that a placeholder is a designed state rather than a defect. **A slot is a question the
manifest asks, not a promise the documentation made.**


---

<a id="decision-017"></a>

## DECISION-017 — A case study opens with its contents rail, and the title lives inside Overview

Status: Active
Date: 2026-08-25 (owner, SESSION-017)
Scope: All six case-study pages, both locales

### Context

The owner's words: *"when a case study is opened, the title, description and all is shown,
when scrolled, the sidebar comes and sticks. what i want is, the sidebar should always be
visible. the title and all is too large right now, they should be smaller and should come
under overview itself."*

The rail was already `position: sticky`. What it was not was *present*: it lived inside a
grid that only began after `CaseStudyHero` (back link, headline at `text-hero` — up to 88px —
summary, disclosure, tags, hero image) and `FactsStrip` (a full-width six-cell grid). That is
close to two screenfuls. The rail could not stick to anything until the reader had scrolled
past all of it.

### Decision

**Nothing sits above the two-column grid.** The grid starts directly under the back link, so
the rail is on screen when the page opens. The hero image and every section moved into the
right-hand column with it.

**The title, description, tags and facts moved inside the first section**, rendered through a
new optional `intro` slot on `Section` between the section's eyebrow and its heading. The page
reads: `01 Overview` → title → description → tags → facts → the section's own heading → prose.

**The headline steps down** from `text-hero` (clamp 44–88px) to `text-feature` (30–52px), and
**the first section's heading steps down** from `text-heading` to `text-subheading`. Under an
`h1` at 52px, a 44px `h2` competed rather than subordinated.

**The facts became a label/value list** at the 680px measure instead of a full-width auto-fit
card grid, and lost a field:

- **`year` is removed** — the owner's call, and removed from the data, the type and the
  dictionary rather than left as another dead field (`ISSUE-010`).
- **`type` reads "Semester project · solo" or "Semester project · team"**, replacing
  "Independent project" / "Collaborative university project". Every one of the six is
  coursework; the documentations behind them are module submissions. The solo/team half is
  not decoration — `DECISION-011` forbids collaborative work reading as independent.

### Reasoning

The three requests are one change. A sticky rail is only visible on load if nothing precedes
it; nothing can precede it unless the title block moves down; the title block only fits in the
column if it gets smaller. Doing any one of them alone would have left the other two odd.

The facts list also fixes something the owner did not name. The old `auto-fit` grid ran the
full page width, so a study with three facts spread them across the whole strip while one with
five wrapped — six case studies, six different shapes. As a label/value list the sparse studies
simply have fewer rows.

### Consequences

- **The hero image is smaller**: it renders in the reading column, about 960px at desktop
  instead of the container's ~1280px. This is the price of the rail being visible, and it was
  paid knowingly.
- **QIS Portal's "2024 · 2026 visual iteration" is gone with the year.** That the project was
  revisited is no longer stated anywhere on the page. Flagged to the owner; if it matters it
  belongs in prose, which is `MILESTONE-004`.
- `CaseStudyHero` is now the image and nothing else, and passes `priority`, closing part of
  `SUGGESTION-012` point 3.
- **`SUGGESTION-008`'s "sticky facts" idea is largely answered.** The facts are no longer a
  band the reader scrolls past and loses; they sit inside Overview, one rail-click away.

### Follow-up, same day

Once the column was narrower, the 680px reading measure inside it read as unfinished rather
than as rhythm. The owner asked for the text to run to the images, and it now does —
recorded as `DECISION-014` amendment 2, since that is where the measure was set.

### Alternatives Rejected

**Leave the hero full-width and start the grid below it.** Keeps the image at 1280px, but at
1440×900 the rail's first item lands around y≈700 — technically on screen, and gone on any
shorter laptop. "Always visible" then depends on the reader's viewport, which is exactly the
complaint.

**Move the rail into the header as a horizontal progress bar.** Visible everywhere, but it
stops being a table of contents, and the section list is the thing worth having.

**Keep `year` in the data and only stop rendering it.** Less work, and it creates precisely
the dead-field problem `ISSUE-010` exists to clean up.


---

<a id="decision-018"></a>

## DECISION-018 — A figure opens full screen

Status: Active
Date: 2026-09-04 (SESSION-023)
Scope: Every case-study figure

### Context

A case-study figure renders at the reading column: 960px on a desktop, and
`calc(100vw - 40px)` — **350px** — on a 390px phone.

That is fine for a picture and wrong for an artefact. Several of the figures this
portfolio exists to show are dense documents rather than images: a persona card
carries a name, a pull quote, six labelled fields and four bulleted lists; a
component sheet carries nine labelled component groups; a UI kit carries a type
scale and a footer. At 350px wide, the type inside a persona card is roughly 3px.

The figure is on the page. None of it can be read. **On the largest share of
traffic a portfolio gets, the work is not actually visible.**

Widening the figure is not available — the column is the column, and
`DECISION-017` settled it deliberately. Cropping to a legible detail throws away
the artefact. Shipping it unreadable is what was happening.

### Decision

**A figure with a `src` is a button that opens it full screen.** A placeholder is
not, because there is nothing to enlarge.

The viewer opens fitted to the viewport and toggles, on tap or click, to the
image's natural width inside a pannable scroller — "see the whole thing" and
"read the small print" are different jobs and neither substitutes for the other.

- Portalled to `body` at `z-[210]`, above the header's `z-[200]`.
- Escape closes; focus starts on Close and returns to the figure that opened it.
- The backdrop is opaque: at 95% the header's own wordmark ghosted through and
  landed on top of the dialog's caption.
- No dependency, and no focus-trap library — the dialog holds exactly two
  focusable elements, so the trap is a few lines.

### Consequences

**It changes what `wide: true` is for.** The three WikiMind personas carry it
because a persona card at a third of the column is 217px tall and illegible; that
argument is weaker now that any figure can be opened. It is kept because a
thumbnail row of key artefacts reads as an afterthought, not because legibility
depends on it any more. **Dropping it would save roughly 120 KB on
`/work/wikimind`** and is a live option (`ISSUE-033`).

**It does not reduce page weight, and it is not meant to.** The inline figure is
still fetched at the size it displays; the viewer reuses the same file.

**Every figure gains a control**, so every figure is in the tab order. Verified:
axe reports 0 violations across all 36 routes, and the button takes its
accessible name from the figure's `alt`.

### Alternatives rejected

- **A lightbox library.** `axe-core` has been the only devDependency for the
  project's life (`DECISION-012`), and this is ~140 lines.
- **Linking the figure to the raw file.** It leaves the site, has no caption, and
  on a phone hands the reader a 1600px image in a browser tab with no way back.
- **Cropping dense figures to a legible detail.** Throws away the artefact, and
  makes the crop a workaround for the layout — the same mistake `SUGGESTION-017`
  was written to stop.

### Related

- `SUGGESTION-017` — the lone-figure ceiling, implemented in the same session
- `DECISION-017` — the reading column this works within
- `DECISION-006` — placeholders are a designed state, and stay unclickable


---

<a id="decision-019"></a>

## DECISION-019 — Figures are sized by height, and rows are justified

Status: Active
Date: 2026-09-04 (SESSION-027)
Scope: Every case-study figure

### Context

Two rules were already fixed and neither was going to move:

- **A figure's declared aspect must equal its file's true aspect** (SESSION-022). `ui/Media`
  paints with `object-cover`, so any mismatch is a silent crop. Four sessions of work depend on
  this, and it is why nothing on the site is cropped to fit a layout any more.
- **The reading column is 960px** (`DECISION-017`).

Together they meant figures were laid out by *width* — a row gave each figure an equal share of
the column — and therefore their heights were whatever their aspects made them. AFONO's
collection row held a 0.375 cart drawer, a 0.545 product page and a 4/3 checkout. At 307px wide
that is **819px, 563px and 230px tall**: three figures, one row, no two bottoms within 300px of
each other, and three captions at three different levels.

`SUGGESTION-017` had already capped the height of a *lone* figure, but by deriving a width from
it — `min(960, 800 × aspect)` — which produced a different bespoke width for every aspect and did
nothing at all for rows.

### Decision

**A figure's size is decided by its height. Its width follows from its own aspect.**

- **`MAX_FIGURE_HEIGHT` is 640px.** Every figure renders at that height unless the column is the
  binding constraint.
- **A row is justified**: all figures in it share one height, and each one's width is
  proportional to its ratio. Nothing is cropped; the widths absorb the difference.
- A row's height is `min(640, (960 − gaps) ÷ Σ ratios)`, and the row is centred at exactly the
  width that height implies.
- Rows hold at most three figures; a run of four splits two-and-two.
- Below 768px a row stacks and every figure is the full viewport column.

### How it is implemented

Almost entirely by CSS, which is why it is worth writing down. Each figure gets
`flex-grow: <its ratio>` against `flex-basis: 0`, so widths come out proportional to ratios —
and because each figure's box is `aspect-ratio: <ratio>`, width ∝ ratio means **every height in
the row is identical**. The browser justifies the row; no arithmetic reaches the markup.

What is computed in JS is only what CSS cannot know: the row's height, so the row can be capped
and centred, and each figure's `sizes` string.

### Consequences

**Wide figures did not change.** Anything 1.5 or wider fits its full 960px inside 640px of
height, so it still takes the whole column. The rule is uniform rather than special-cased.

**`SUGGESTION-017` is superseded.** Its ceiling was the right instinct applied to the wrong axis;
this replaces it and covers rows as well as lone figures.

**A very narrow figure is genuinely narrow.** A 0.375 cart drawer at 640px tall is 240px wide.
That is what it is — a narrow drawer — and `DECISION-018` lets anyone open it full screen.

**The row breakpoint moved from 640px to 768px.** At 640 a three-figure row put the narrowest
figure at 140px.

### Alternatives rejected

- **Uniform aspect per row** — the only way to get equal widths *and* equal heights, and it means
  cropping. That is the thing four sessions of work exists to prevent.
- **`object-contain` in a fixed box** — no crop and perfectly even rows, but every non-matching
  figure gets letterboxed onto a neutral ground, which reads as a slideshow rather than a page.
- **Leaving it ragged** — defensible for two figures, indefensible for AFONO's nine.

### Related

- `SUGGESTION-017` — superseded by this
- `DECISION-018` — the full-screen viewer that makes a narrow figure acceptable
- `DECISION-017` — the 960px reading column this works inside


---

<a id="decision-020"></a>

## DECISION-020 — The bento tiles are washed pale, not darkened

Status: Active
Superseded: **by `DECISION-021`, 2026-09-09** — the owner rejected the bento twice and approved project cards in its place
Date: 2026-09-09 (SESSION-030)
Scope: The homepage work grid
Supersedes: the tile treatment established in SESSION-014/SESSION-016

### Context

Each of the eleven tiles carried an image that was darkened to roughly 40–80%
brightness, desaturated, and tinted with its project's colour — navy for
WikiMind, maroon for AFONO, purple for Sync FM, teal for Surugami — so that
white text could sit on top of it. `image-treat.mjs` measured two bands and
failed the export if a tile was too *light* to hold white text.

Seen on the page, eleven of those together read as a patchwork of murky colour
washes under a white, restrained layout. The owner's words: **"i donnot like the
bento grid backgrounds, it does not fit the whole aesthetic of this website."**

They are right, and the reason is structural rather than a matter of taste. The
rest of the site is white surfaces, thin `card-border` rules, mono labels, ink
text and one blue accent. The tiles were the only place doing the opposite, and
they were doing it eight different times.

### Decision

**Wash the tiles pale and set the text in ink.**

- A tile's image is brightened, kept near its own saturation, and covered with a
  white overlay at ~50% — so it survives as a **faint tint of its own colour**
  rather than as a project-coloured stain. Asked what he wanted instead, the
  owner said *"maybe subtle colour backgrounds? maybe from title images?"* — the
  colour comes from the work itself, not from a palette entry.
- The category and title are `text-ink-secondary` and `text-ink`. **The dark
  gradient scrim is deleted**, not lightened: the contrast now comes from the
  image being pale, so there is no second layer to maintain.
- The tile gains `border-card-border` and `hover:border-accent`, which is what
  every case-study figure already does.

### The check flipped with it

`check: "bento"` measured the same two bands before and after; it asserted
`<= 128/138` and now asserts `>= 190`. **Same measurement, opposite direction** —
a ceiling for white text became a floor for ink.

190 puts the darkest tile at roughly 8:1 against the ink, past WCAG 1.4.3's
4.5:1 with room for the image's own darker passages.

**It earned its keep immediately.** At a 50% wash, `tile-syncfm-mobile` came out
at 176/178 and failed — its source is Sync FM's *dark mode* screens, and no wash
that suits ten light sources suits that one. It gets a stronger wash of its own.

### What it does not check

The bands are means. **Nothing measures the contrast directly behind the
glyphs**, so a title crossing a dark passage of an otherwise-pale image would
pass. The tiles were read at 1440px after every export for that reason, and axe
covers the rendered result.

### Consequences

The per-project tint colours are gone from `image_crops.json` — eleven `grade`
blocks now differ only in the one tile that needed a stronger wash. The homepage
reads as one surface with the rest of the site, and each project still has a hue.

### Related

- `DECISION-010` — the bento grid itself, which this does not reopen
- `SESSION-014` — where the original contrast ceiling was measured


---

<a id="decision-021"></a>

## DECISION-021 — The homepage work section is project cards, not a bento grid

Status: **Active** — approved by the owner, 2026-09-09
Date: 2026-09-09 (SESSION-031)
Scope: The homepage work section
Supersedes: `DECISION-010` (the bento) and `DECISION-020` (its pale wash)

### Context

The owner rejected the bento twice. `DECISION-020` had already answered the first
rejection by washing the tiles pale instead of darkening them — and the second
rejection came straight back: *"i still dot like the benti boxes design, it looks
really bad."*

That is the signal to stop adjusting the treatment and look at the construction.

### What was actually wrong

Read at 1440px, three faults, none of them about colour:

1. **Labels land on image content.** The category sits centred at the top of the
   tile whatever is underneath it — "Interaction Design" across the Sync FM
   screens, "Brand & Print" across the paper crane, "Poster & Print" across pink
   lettering.
2. **Titles compete with the thing they name.** "WikiMind" over the WikiMind
   logo; "QIS Portal" over bar charts.
3. **`object-cover` crops each image to whatever shape its `gridArea` is.** The
   results read as broken screenshots: one tile showed `gami is much / nore fun
   together / nity`, another a cut figure caption `…bildung 5: Auswertung der
   Fragen…`, another half-letters.

**Washing the tiles pale did not cause any of this. It revealed it** — the dark
tint had been hiding the mess rather than solving it, which is why the first fix
made things look worse rather than better.

### Decision

**Nothing sits on an image, and nothing is cropped.**

- One card per project, six rather than eleven.
- The project's **cover shown whole at its own aspect** in a rounded, bordered
  box. Five of the six covers are designed title cards the owner made; they are
  meant to be seen whole.
- Name and tags in ink **underneath** the image — the arrangement the
  case-study figures and the prev/next ring already use.
- Rows justified by `@/lib/justify`, extracted from `SectionMedia` so the
  homepage and the case studies cannot drift apart. A row of covers with
  different aspects still shares one height.

### Consequences

**`imageAspect` comes back to `ProjectCopy`.** It was removed in SESSION-025 as
dead; the whole point of this grid is that a cover renders at its own
proportions, so it is now the field the layout depends on. Recorded here rather
than quietly re-added.

**Five of six covers are designed; the kitchen's is not.** Its card uses the
SESSION-016 PDF crop at 16/7.5 — wider, shorter and visibly softer than the
other five. It is the one obvious gap.

**Five projects lose their second appearance.** `DECISION-010` kept eleven tiles
so the grid read as a wall of work. Six cards do not read as a wall, so the
duplication would read as repetition instead.

**The bento is gone.** `BentoGrid.tsx`, `selectedWork.bento[]`, the `BentoTile`
type and all eleven tile images were deleted once the owner approved the cards —
247 KB of originals plus 22 variants. `image-manifest.mjs` now reports the
homepage from `projects[]` instead of from tiles, so a card's image is the same
file its case study opens with and there is no second copy to keep in step.

### Related

- `DECISION-010` — the bento, approved 2026-08-24 and superseded here by the same owner
- `DECISION-020` — the pale wash, which fixed the colour and exposed the construction
- `DECISION-019` — the justified rows this reuses


### Approved, with two changes (2026-09-09)

**"I like this look but i dont like the text below the images/cards. i think
title is not needed because it is already there in the title image."**

Right, and it is the same fault as the bento in miniature: the name was being
said twice, once inside the cover and once underneath it. The cards now carry
**no visible text at all**.

The link still needs a name for anyone not looking at it. Without one the
accessible name falls back to the cover's `alt`, which describes the picture
rather than where the link goes — so the `<a>` carries
`aria-label="{name} — {tags}"`. axe passes, and a screen reader hears the
project and its disciplines rather than "the AFONO shop and size finder in two
browser windows".

**The kitchen got a cover.** It was the one project without a designed title
card, and its card was visibly the odd one out. `scripts/cover.mjs` composes one
to match the other five — pale ground, name, one-line subtitle, the work
bleeding off the right edge — from the cleanest render in the documentation.

That render needed picking rather than taking: the existing hero was two Blender
*viewport screenshots* side by side, one of them with the axis gizmo still in
frame. The new cover uses "Rollstuhlfahrerin sitzt an Arbeitsplatte" from page
22, cropped to exclude the gizmo.

**It copies a layout rather than inventing one**, and it should be replaced if
the owner ever makes a real one. It is what makes six cards read as a set
instead of five plus an exception.


### The tags came back (2026-09-09)

**"i se ehat you removed the tags also, like the type of project."**

Removing the caption block had taken the disciplines with the name, and they are
not the same thing. **The name is repeated — every cover carries it. The
disciplines appear nowhere else on the page**, so without them a card says what
a project is called and never what it is.

So the card carries **one line: the tags**, in mono at 12px, and still no title.

The owner asked for it "in the photos". Compositing it into the covers was
tested and put aside: five of the six are the owner's own artwork with five
different type systems, positions and grounds, so a line added on top would be
impersonating five designs rather than matching one — and it would be *text on
an image*, which is the fault this decision exists to remove. A measurement pass
confirmed the practical half: the left-hand text block cannot be bounded
reliably, because product imagery bleeds into the left 46% on four of the six.

It is also brittle in a way the page is not: burn the tags in, and they are
wrong the moment a cover is redrawn. The line reads from `projects[].tags`, so
it cannot drift.

**One accessibility detail worth keeping.** The link's `aria-label` joins the
tags with `" · "` — the same separator as the visible line — so the visible text
is a substring of the accessible name. WCAG 2.5.3 asks for that and axe checks
it; joining with `", "` in one place and `" · "` in the other fails
`label-content-name-mismatch`. Caught before the sweep rather than by it.


---

<a id="decision-022"></a>

## DECISION-022 — Video ships at full size and loads only on demand

Status: Active
Date: 2026-09-10 (SESSION-032)
Scope: Case-study and playground figures that are films

### Context

The owner supplied four videos. The barrier-free kitchen's case study has always
described an animated Blender walkthrough and carried a hatched slot where it
should have been.

The obvious move — compress them to something a web page can carry — is not
available. **There is no encoder on this machine.** `ffmpeg` is not installed,
and macOS's own `avconvert` optimises for quality rather than size, so its
presets are as likely to grow a file as shrink it. Measured, on the four:

| File | Source | `Preset960x540` |
| --- | --- | --- |
| `kitchen/Video.mp4` | 11.9 MB | **31.3 MB** |
| `craftworkgift1.mp4` | 15.4 MB | 15.4 MB |
| `craftgift2.mp4` | 60.1 MB | **77.2 MB** |
| `craftgift3.mp4` | 45.9 MB | 13.2 MB |

One of four usefully compresses. That is not a pipeline.

### Decision

**Do not shrink the video. Do not fetch it.**

A film is a figure whose `src` is a **poster still**, with the film itself in a
separate `video` field. `ui/Video` renders the poster, and swaps in a
`<video controls autoPlay>` only when the play button is pressed —
`preload="none"` until then.

So the page carries the poster: **34 KB against a 12 MB film.** The 12 MB
arrives on a click, or never.

**Verified rather than assumed.** Driving the built page through CDP with a
network listener: after a full scroll of `/work/barrier-free-kitchen`, mp4
requests were `NONE`; after clicking play, exactly one — `kitchen-animation.mp4`
— and a `<video>` element with controls at 1024×576.

### What follows from it

**There is no `prefers-reduced-motion` branch, and there should not be.** Nothing
plays unless a person presses play, and `DECISION-008`'s rule is about
*unsolicited* movement. A click is a request.

**The controls are the browser's.** They are keyboard-operable, localised, and
carry the full-screen affordance for free — which is also why a film skips the
`Lightbox`: `DECISION-018` exists so a dense *still* can be read at full size,
and nesting a zoom button inside a video would put one interactive element
inside another.

**The poster carries the aspect.** `aspect` must match the poster exactly, as for
any other figure, so a film sits in the justified rows of `DECISION-019` with no
special case.

### What was not shipped, and why

**The three craft videos — 121 MB between them.** Click-to-play makes a page
cheap, but it does not make a repository small, and this project has been
careful about that: `ProjectsDokus/` is git-ignored for exactly this reason.
One 12 MB film that fills a gap the case study describes is a reasonable cost;
121 MB of phone footage that duplicates eight craft stills already on the page
is not.

They become shippable the moment they are compressed — `ffmpeg -crf 28 -vf
scale=-2:720` or a HandBrake pass would put all three inside 15 MB. Recorded in
`ISSUE-038`.

### Related

- `DECISION-018` — the lightbox, which a film deliberately does not use
- `DECISION-019` — the justified rows a film sits in unchanged
- `ISSUE-038` — the unplaced videos and photographs


---

<a id="decision-023"></a>

## DECISION-023 — The playground carries five categories, in the owner's order

Status: Active
Date: 2026-09-10 (SESSION-033)
Scope: `src/lib/playground/`

### Context

The playground had six categories, in an order nothing had ever chosen — it was
the order they were written in during SESSION-013, when all six were empty and
the order could not matter. By SESSION-032 four of them held 34 real figures and
two held none, and the owner asked for a different grouping.

Two of the six were also thinner than the work in them justified.
`Calendars and Editorial Experiments` held five items — a book cover, a flyer and
three typographic postcards — all of which are print design. Splitting them from
`Graphic and Logo Experiments` left two half-categories where the site had one
good one.

Separately, `ISSUE-038` had two photographs it could not place: the playground had
no photography category, and filing a low-key portrait under Handmade or Digital
Drawings would have been a lie about what it is.

### Decision

**Five categories, in this order:**

| # | Slug | Title | Items |
| --- | --- | --- | --- |
| 1 | `games-and-apps` | Games and Applications | 5 (0 filled) |
| 2 | `photography-3d-motion` | Photography, Animation and 3D | 7 (2 filled) |
| 3 | `graphic-design` | Graphic Design | 14 (all filled) |
| 4 | `digital-art` | Digital Drawings and Portraits | 9 (all filled) |
| 5 | `crafts` | Handmade and Bead Crafts | 8 (all filled) |

Three consequences worth naming:

**Editorial folded into Graphic Design.** Its five items sit in the middle of the
run, between the posters and the packaging, so the page reads logo → poster →
print → package → storefront. `/playground/editorial` no longer exists.

**Photography joined 3D and Motion** rather than becoming a seventh category.
Two photographs do not make a section, and the three share a subject: light, and
what it does to a surface over time. This closes part 2 of `ISSUE-038`.

**The slugs were renamed to match the titles.** `interactive` → `games-and-apps`,
`3d-motion` → `photography-3d-motion`, `graphic-experiments` → `graphic-design`.
Nothing is published yet, so no URL that anyone holds is broken by this; doing it
later would mean either a redirect table or a URL that disagrees with the page.

### The order leads with two empty categories, deliberately

Positions 1 and 2 are the only categories with no supplied imagery: Games and
Applications has none at all, and Photography, Animation and 3D has two of seven.
A visitor's first two category cards therefore lead to mostly hatched pages.

**This was put to the owner and confirmed.** It is a statement about what the
playground is going to be rather than a summary of what it currently holds, and
the hatched card is an existing, deliberate device (`DECISION-006`) rather than a
broken image. It stops being a cost the moment source material arrives — which is
the only thing either category is waiting on.

### The real cost: five files that had to agree, and nothing checking them

The order lives in `categories/index.ts`. But `home.ts` lists all five again for
the marquee, each category names the next one in the ring, and each project names
the category it belongs to. **Every one of those links is a bare string, and every
one of them fails silently:**

- `PlaygroundIndex` does `if (!category) return null`, so a stale slug in `home.ts`
  **deletes a whole marquee row** and renumbers the ones after it. No error.
- A stale `nextCategorySlug` 404s the "next category" link at the foot of a page.
- A stale `categorySlug` on a project 404s the project.

That last one was not hypothetical. `PlaygroundIndex.tsx` linked its featured
project through the literal string `` `/playground/3d-motion/${item.slug}` ``,
which this rename would have broken with no type error and no failing check.

So `content-audit.mjs` gained a playground section: it asserts
that `home.ts` and the registry list the same categories in the same order, that
every title agrees across both files, that `nextCategorySlug` forms one complete
ring, that every project's category resolves, and that `en` and `de` carry the
same `src` at every index — which `image-manifest.mjs` does **not** check for
categories, because it reads only `en` there.

**All five checks were proved by injecting the fault**, including the
`3d-motion` project link that was actually present. A check that has only ever
been seen to pass is not evidence (`SESSION-027`).

### Related

- `DECISION-006` — the hatched placeholder, and why an empty slot is shown rather than hidden
- `DECISION-021` — the same "nothing sits on an image" reasoning, applied to the homepage
- `ISSUE-038` — the unplaced files; part 2 closes here


---

<a id="decision-024"></a>

## DECISION-024 — Every image call site declares the width it actually renders at

Status: Active
Date: 2026-09-10 (SESSION-033)
Scope: `ui/Image` call sites

### Context

`SUGGESTION-012` gave the site responsive images: `image-variants.mjs` writes a
400/640/960/1280/1600 ladder beside every export, and `ui/Image` turns that into
a `srcset`. Which rung the browser takes is decided entirely by `sizes`.

`ui/Image` falls back to `sizes="100vw"` when a call site passes none. That
fallback is not neutral — **it is a claim that the image fills the window**, and
the browser believes it. A card 256px wide that declares `100vw` at a 1440px
viewport asks for the 1600px variant.

Every call site on the playground and the About carousel passed no `sizes`. The
case studies and the work grid always had, so the fault was invisible in the one
place anybody was measuring: `verify weight` sampled the homepage and four case
studies and no playground route at all.

Adding `/playground` to that sample is what surfaced it — 1692 KB of images at
1440/1x, making it comfortably the heaviest page on the site, and heavier at
desktop than at 390px/3x, which is backwards for every other page and was the
tell.

### Decision

**A call site that renders an image at a known width must say so.** Where the
width is a constant — a `basis-[280px]` marquee card, a `w-60` carousel card —
`sizes` is that constant in px, not a viewport fraction.

Measured on the built site, uncached and gzipped:

| Route | Before | After |
| --- | --- | --- |
| `/playground` 1440px/1x | 1692 KB | **378 KB** |
| `/playground/graphic-design` 1440px/1x | 804 KB | **225 KB** |
| `/playground` 390px/3x | 830 KB | 808 KB |
| `/playground/graphic-design` 390px/3x | 804 KB | 804 KB |

**The mobile figures barely move, and that is the point.** At 390px/3x a 256px
card genuinely needs ~768px of image, so the large variant was already the right
choice there. Only the desktop waste disappeared. A change that had improved
both numbers would have meant the images had simply got worse.

`case-study/Figure.tsx` still has one `<Media>` with no `sizes`: it is the
`!src` branch, which renders the hatched placeholder and fetches nothing.

### `verify weight` now samples the playground

The sample list was five case-study-shaped routes. It gained `/playground` and
`/playground/graphic-design` — the index renders every category's items into its
marquees, and Graphic Design is the largest single category at 14 items. **A
weight check that only looks at case studies cannot see the heaviest page on the
site**, which is exactly what happened here.

### Related

- `SUGGESTION-012` — the variant ladder and `srcset`
- `DECISION-023` — the playground restructure that put a 14-item category on one page


---

<a id="decision-025"></a>

## DECISION-025 — One uniform card, nothing cropped, matted in the image's own colour

Status: Active
Date: 2026-09-10 (SESSION-034)
Scope: The playground — index marquees, featured cards, category grids
Supersedes: `SUGGESTION-008` (scroll-velocity coupling)
Closes: `ISSUE-039`

### Context

The owner: *"most of the images are cut and is not visible… everything is
looking too colourful right now and the moving animation is also abit too busy."*

Three separate faults, measured rather than guessed:

**1. The cropping was a bug, not a taste.** `CategoryMarquee` declared
`aspect="4/3"` and the featured cards `16/10`, hard-coded, whatever the image
actually was. `ui/Media` paints with `object-cover`, so the rest was discarded:

```
71% of its height lost   1200/2604   Bead & Plant Objects
65%                      1200/2604   Beaded hanging planter
62% of its width         1200/343    VTRI banner
46%                      803/1115    Logo study     ← lockup sliced mid-word
46%                      1200/1658   Museum poster  ← title cut off

average loss across all 34 images: 36%   ·   23 lost ≥30%   ·   6 lost ≥50%
```

The ITD logo card read "Infrastruktur Technologie **und D—**".

**2. "Too colourful" was density, not palette.** The page chrome is restrained —
white, grey grid, black type, one blue. What was loud was 34 saturated images at
identical size, five across, 12px apart, with no hierarchy: nothing told the eye
where to land, so every image competed. **This is the same diagnosis as the
bento grid** (`DECISION-021`): the fault was never the colour.

**3. Five rows moved at once**, in alternating directions, accelerating with the
wheel — and two of the five were entirely hatched placeholders.

### Decision

#### One box, contained, matted in the image's own colour

Every playground card is a **3/4 box** with the image `object-contain` inside
it, and the leftover space painted the image's own border colour.

**3/4 is measured, not chosen.** The median aspect of the 33 real playground
images is 0.762. Mat left over, by box:

| Box | Average mat | Worst card |
| --- | --- | --- |
| 4/3 (what it was) | 34% | 65% |
| 1/1 | 25% | 71% |
| **3/4** | **19%** | 79% |
| 2/3 | 24% | 81% |

And 34% as mat is not the same as 34% destroyed. The worst case is the 3.50
VTRI banner, which no uniform box can flatter.

**The mat colour is sampled at build time**, by `image-variants.mjs`, into the
same generated map that already carries the `srcset` widths. It is the
**median** of a two-pixel border ring — not the mean, which any bright object
touching an edge drags into a muddy average of subject and background. On a
flat-background illustration every ring pixel is identical, so the median is
exact and the image appears to run to the card's edges:

```
#ffffff  pg-line-study        (white ground — mat invisible)
#ead8ff  pg-character         (lilac)
#063938  pg-forest            (dark green)
#484e31  pg-bead              (foliage)
```

Sampling in the browser instead would paint 33 cards white for a frame and then
repaint them — a visible flash. Doing it in the loop that already decodes each
image to read its natural size costs nothing.

**Category grids got the same box.** Passing each item's own aspect there was
never a crop — those images were whole — but it made the grid ragged, with rows
that did not line up and white voids under the short cards.

#### One row moves at a time

A row runs only while **the horizontal centre line of the viewport falls inside
its own section**, or while the pointer is on it. The sections are contiguous,
so that line is inside exactly one of them; the rows need no parent state and no
shared scroll handler to coordinate.

**The margin describes a line, not a band, deliberately.** The first attempt used
the middle 20% of the viewport, and a band of any real height straddles the
boundary between two sections for part of the scroll — measured, that put two
rows in motion at once, which is the fault being fixed.

`SUGGESTION-008`'s scroll-velocity coupling is **removed**. It was a good idea
attached to the wrong number of moving things.

Verified across six scroll positions: exactly one row moving at each, none at the
top of the page, none with the pause control pressed, none under
`prefers-reduced-motion`.

### Still open

**The colour question is deliberately unanswered.** The owner asked to be shown
the crop and motion fixes first and asked again after. Fixing the crop already
changes the colour impression a great deal — a matted card reads as one object
rather than a bright rectangle in a white frame — so the right time to judge
density and saturation is now, not before.

### Related

- `ISSUE-039` — the crop, as first written up
- `DECISION-021` — "the fault was arrangement, not colour", the first time
- `DECISION-024` — `sizes` at every call site; the same components


---

<a id="decision-026"></a>

## DECISION-026 — The playground is one page: a scrapbook that moves

Status: **Amended by `DECISION-027`** (SESSION-035) — the five-section page shape below is
gone; everything this decision says about *pictures* (true aspect ratios, clips with posters,
nothing cropped that need not be) still holds.
Date: 2026-09-10 (SESSION-034)
Scope: `/playground` and everything under it
Supersedes: `DECISION-025` (the uniform 3/4 box), and the twelve playground routes
Amends: `DECISION-022` ("there is no encoder on this machine")
Closes: `ISSUE-038` part 1

### Context

The owner, after seeing `DECISION-025` land:

> "i want this whole playground page to be a gally type page with bento grid type
> layout, more like journal or scrapbooking style. i dont want the user to click
> and land on other pages but everything needs to be here… try to work with
> original aspect ratos and sizes and make the bento box work. maybe even try to
> work with colours, so that it is pleasing to the eye to watch"

The old shape was an index that sent you elsewhere: five auto-scrolling marquees,
each a teaser for a category page, with a project page beneath that. Three levels
and twelve routes, and **the pictures were smallest on the page whose whole job
was to show them.**

### Decision

#### One page

`/playground/:category` and `/playground/:category/:slug` are gone. The five
categories are sections of one page; the tiles are the real thing at full size.
Routes drop from 34 to 22.

Clicking a picture opens it larger **in place**, using the lightbox
`DECISION-018` built for dense case-study figures. Nothing navigates.

Two pieces of content would have died with those pages, and neither was allowed
to:

- **The motorbike study's reflection** is the owner's prose (`MILESTONE-004`:
  do not rewrite it, and by extension do not bin it). A tile can now be a
  **written card** — `note` — so it sits among the pictures in the owner's hand.
- **Each category's "more to come" line** is rendered under its run.

#### Original aspect ratios, in justified rows

`DECISION-025` put every card in one 3/4 box because the page was a row of even
cards and a uniform box was the honest way to hold mixed shapes without cropping.
**A scrapbook has no such constraint** — the shapes are the layout. So the box is
the picture's own shape, and `bentoRows` varies the run — two, three, four,
three — which is what turns an even grid into a bento. Row heights are justified
by `@/lib/justify`, the same maths the case studies use.

**Nothing is cropped and nothing is matted.** The build-time mat colours from
`DECISION-025` are still sampled, and still used — by `@/lib/tint`, below. But
`ui/Media`'s `contain` mode went with the uniform box: no call site needed one
any more, and an unused branch documented against a superseded decision is worse
than no branch. `Media` is back to one rule — **`aspect` is the image's own
ratio**, and anything else is a silent crop.

#### A gallery shows what exists

`DECISION-006` renders an unfilled slot as a hatched placeholder. That was right
for small even cards. At a 430px row height it was **ten enormous hatched
rectangles across two screens** — the first thing a visitor met, saying nothing.
Those become one line of text: *"still to come — Unity game · Hibi application ·
…"*. The information survives; the acreage does not.

#### Colour taken from the pictures, not invented

Each section stands on a wash of its own contents' colour: the mats
`image-variants.mjs` already samples, averaged and mixed 94% into white
(`@/lib/tint`). Digital drawings come out faintly lilac, crafts faintly green,
photography grey because its pictures are nearly black.

**`DECISION-020` did this and was rejected, so the difference matters.** That
tinted the tiles themselves and put white text on them — eight murky washes under
a restrained page. Here the colour never touches a tile and never sits under
text. It is a ground behind a section, and a gradient rather than a band so the
page does not read as stripes.

#### Clips that play themselves

Three of the craft videos now autoplay, muted and looping, in the crafts run.
`ui/LoopVideo` holds three rules that are not negotiable:

- **Muted, always**, and the clips are encoded with no audio track at all —
  measured: zero audio bytes decoded.
- **Nothing plays under `prefers-reduced-motion`**: no `<video>` is created, so
  the clip is never even fetched. Verified — a full scroll of the page under
  reduced motion makes **zero mp4 requests**.
- **Nothing plays off screen**, and it stops when it leaves.

The page's motion control stops all of them (WCAG 2.2.2). Verified: three
playing, all muted, all looping; after pressing pause, none.

### `DECISION-022` was right about films and wrong as a rule

That decision concluded there is **no encoder on this machine**. `ffmpeg` is not
installed, `avconvert` grew two of four test files, and so the 121 MB of craft
video was unplaceable — `ISSUE-038` part 1.

The conclusion was correct about *transcoding whole films* and wrong as a general
statement, because it never asked the question a gallery asks: **a tile does not
need the film. It needs eight seconds of it, 460 pixels wide.**

Chrome ships an encoder — `MediaRecorder`. `scripts/video-clip.mjs` plays the
source, draws it to a canvas at the size actually wanted, and records
`canvas.captureStream()`:

| Source | | Clip |
| --- | --- | --- |
| `craftworkgift1.mp4` 15.4 MB, 48s | → | `pg-gift-explosion.mp4` **312 KB**, 8s, 520×694 |
| `craftgift2.mp4` 60.1 MB, 142s | → | `pg-gift-popup.mp4` **335 KB**, 8s, 460×818 |
| `craftgift3.mp4` 45.9 MB, 23s | → | `pg-gift-riona.mp4` **138 KB**, 6s, 460×818 |

**121 MB became 785 KB**, and `DECISION-012`'s thin toolchain is intact — it is
the same Chrome that already resizes every image.

Two details that are not obvious:

- **It records MP4/H.264**, not WebM, because Chrome 130+ can and Safari's WebM
  support is inconsistent. Confirmed readable by AVFoundation, which is the best
  proxy for Safari available here. (`mdls` reports nothing for these files —
  that is Spotlight's metadata extractor, not a playback test, and it misled me
  for a minute.)
- **The source is served over HTTP by the script**, not read as `file://`: a
  canvas drawn from a file-scheme video is tainted and `captureStream` throws.

**The in-points were chosen by looking.** `craftgift3` is a static box for its
first fifteen seconds and only pops open at the very end; a clip taken from the
start would have been six seconds of a cardboard box not moving.

### Related

- `DECISION-025` — the uniform box, and the crop measurements that motivated it
- `DECISION-022` — click-to-play for a 12 MB film; still correct for that case
- `DECISION-018` — the lightbox, now doing the job the category pages did
- `DECISION-006` — the hatched placeholder, narrowed here


---

<a id="decision-027"></a>

## DECISION-027 — The playground is a deck of four collages that stack as you scroll

Status: Active
Date: 2026-09-10 (SESSION-035)
Scope: `/playground`
Supersedes: `DECISION-026`'s page shape — the five category sections, the in-page contents
nav, the tinted section washes and `@/lib/tint` on this page. It keeps everything
`DECISION-026` decided about *pictures*: true aspect ratios, autoplaying muted clips with
posters, nothing cropped that need not be.

### Context

The owner, one day after `DECISION-026` shipped:

> "i want to change the playground page completely. the background and all stay same, i
> want the title nand description in the middle and rest gone.
> https://www.tanujashastri.com/#f1 this is the inspiration website. from here, the
> project section is what i like. i want a card scroll animation like in this website,
> where a user scrolls and 4 cards stack on top of each other. each card eshould be the
> full length of the viewport."

Then, having seen the empty deck working, they filled the four cards themselves in
`Portfolio.fig`, page 2 — four 16000 × 10000 frames of scattered pictures, sorted by
colour — and asked for those to be placed into the cards.

`DECISION-026`'s scrapbook was **five sections down one long page**. It was a good gallery
and the wrong shape for this owner: the playground is the personal half of the portfolio,
and they wanted it to behave like one considered object rather than like an archive.

### Decision

#### The page is a title and a deck

The hero is the eyebrow, the heading and the intro, centred. The contents nav, the taped
hero collage, the "currently exploring" line, the closing note and the return link are all
gone.

Below it, four cards, each roughly a viewport tall, stacking as you scroll.

#### The stack is CSS, not script

Every card is a `position: sticky` sibling **inside one container**. Each stops below the
header and the next scrolls up over it. That is the whole mechanism: no scroll listener, no
measured offsets, nothing to re-run on resize, and it works identically under
`prefers-reduced-motion`.

Three things it depends on, each of which was got wrong first:

1. **One shared parent.** A sticky element is confined to its own container. Giving each
   card its own wrapper unsticks it the moment that wrapper scrolls past, and nothing
   stacks.
2. **Stepped heights.** A sticky element cannot be pushed past
   `parent.bottom - element.height`. With equal heights that limit is one document position
   for all four, so the fan collapsed into a single flush pile as the deck scrolled out.
   Card *i* is now `i × PEEK` shorter as well as `i × PEEK` lower, which gives each card its
   own limit — and, incidentally, one shared bottom edge, so the deck fans downward from the
   top rather than off the bottom of the screen.
3. **A trailing spacer.** Without it the container ends at the last card and the completed
   deck starts scrolling away the instant it arrives.

GSAP does one thing only: as a card is covered it narrows a little from its top edge, so
the visible slivers step inwards and the deck reads as receding. That is decoration and it
does not run under reduced motion — the stacking still does.

#### The card contents are traced from Figma, not re-designed

`src/lib/playground/collage.ts` holds each slot's `x/y/w/h` **in the design's own pixels on
its 16000 × 10000 frame**, unconverted, in the design's own paint order. `Collage.tsx` is
the only thing that turns those into percentages. A slot can therefore be checked against
the Figma inspector by reading it, and re-tracing a frame is a copy rather than a
conversion.

Where the design crops a picture off-centre, the slot records the equivalent
`object-position` as `focus`; one piece is turned on its side and records `rotate`.

#### Two layouts, chosen by the card's shape

The design is 16:10. A card is a whole viewport tall, so its proportions move with the
window — 1.61 at 1440 × 900, 1.32 at 1920 × 1080, **0.62 on an upright tablet**. Stretching
the collage to fit would silently re-crop forty-eight pictures, so it is *contained*:
`min(100cqw, 160cqh)`, which is `object-fit: contain` written in container-query units.

Below an aspect of 5/4 that leaves the design stranded — measured at 820 × 1180, a
643 × 402 collage inside a 645 × 1067 card — so the same slots run down a masonry instead,
in the same order, three columns narrow and four from 560px of card width. **The switch is a
container query on the card, not a viewport breakpoint**, because it is the card's shape
that decides, not the window's.

#### Consequences

- `Scrapbook.tsx` and `Tile.tsx` are no longer rendered. The category data in
  `src/lib/playground/categories/` is **kept and still audited** — it is the only written
  record of the captions and of the slots that are still empty.
- `@/lib/tint` is no longer used by this page.
- `/playground` weighs **2630 KB** at 1440/1x, of which ~1.7 MB is five video clips that
  load only as each comes on screen. That is the page's cost and it is deliberate.
- Range requests were added to `scripts/video-clip.mjs`. Chrome will only seek within what
  it has buffered, and it does not buffer a 151 MB film to oblige: every `--from` past the
  start silently recorded the opening frames instead.


---
<a id="decision-028"></a>

## DECISION-028 — The hero is a short title over a description, and the title is the owner's name

Status: **Active** — settled by the owner 2026-09-11 (SESSION-040)
Date: 2026-09-10 (SESSION-038), shipped provisionally 2026-09-10 (SESSION-039), settled 2026-09-11 (SESSION-040)
Scope: `hero.headlineLines`, `hero.intro` in both dictionaries; `process/HeroProcess.tsx`

### Context

The hero has carried a three-line headline since the site was built:

> Designing intuitive / digital experiences and / unique brands

followed by a long paragraph. The owner wants that headline demoted to the description and a
**short** title above it, and asked for help choosing one.

### The decision

Two strings, not one. `hero.intro` becomes the sentence the owner dictated, and
`headlineLines` becomes a short claim. The four candidates are set out in
[`MILESTONE-010` task 1](milestones.md#milestone-010).

**Recommended: "Design that listens."** It is the only one of the four that says what the
About page spends four paragraphs saying, which is that this designer starts from the other
person's point of view. A hero that repeats the name (candidate D) competes with the header;
a hero that describes the discipline repeats the description underneath it.

### What the owner chose

**Candidate D: their own name.** Having looked at candidate A on the site, they asked for
"my name instead", and `headlineLines` is `["Alexsha Maharjan"]` in both locales as of
SESSION-040.

The recommendation was A, and it was wrong about one thing. The argument against D was that
"the header already carries the name two centimetres above it" — and it does, at 15px in the
top-left corner, as a wordmark. A wordmark and a hero are not the same statement, and a
portfolio whose first line is the person's name is stating who this is rather than making a
claim about the work. The claim now lives where the owner put it: in the description
underneath, which is the sentence they wrote.

One consequence worth naming: **the name is the same string in both locales**, which is the
only hero line that has ever been. `content-audit` compares shape rather than content, so
this passes, and it should.

### Consequences

- `headlineLines` stays an array. The hero controls its own line breaks and German will not
  break where English does. Candidate A is one line in both.
- The description is now the only place the disciplines are named, so the tags line under it
  carries more weight. It goes accent blue in the same pass (task 2).

---
<a id="decision-029"></a>

## DECISION-029 — A case-study figure signals "openable" with the cursor and nothing else

Status: **Active** — settled by the owner 2026-09-11 (SESSION-040)
Date: 2026-09-10 (SESSION-038), settled 2026-09-11 (SESSION-040)
Scope: `components/case-study/Figure.tsx`

### Context

Every case-study figure is a button that opens `ui/Lightbox` (`DECISION-018`), and it says so
by turning its border accent blue on hover. The owner does not want the blue line, and asked
whether growing the image instead would be better.

### The decision

**Not a scale, on this surface.** Case-study figures sit in justified rows sized by height
(`DECISION-019`); growing one on hover pushes its neighbours and breaks the row the layout
exists to keep. The playground collage is the opposite case, where pieces are absolutely
positioned with room around them, and a hover scale is right there and already shipped.

So the affordance is one of the three options in
[`MILESTONE-010` task 13](milestones.md#milestone-010), recommended **A, a soft shadow lift
with no movement**.

### What the owner chose

**Option C, and further than C: "remove the hover in the case studies."** No border, no
shadow, no movement. `Figure.tsx` keeps `cursor-pointer` and the focus ring, and that is the
whole affordance.

This is a smaller signal than any of the three options offered, and it is defensible on this
surface for a reason the options paper undersold: a case-study figure sits in a justified row
of figures that are **all** openable, so a hover state distinguishes nothing — it only says
"the pointer is here", which the pointer already says. The rows are dense; a lift on every
one of twenty-nine figures on `/work/afono` is twenty-nine things twitching.

What is lost is discoverability on touch, where there is no cursor and now no hint. That was
already true of option C and the owner has the same information; it is recorded here so the
next session does not read the bare figure as an oversight.

### Consequences

- The two surfaces deliberately behave differently. That is a considered inconsistency, not
  drift, and it is recorded here so the next session does not "fix" it.
- Whatever wins, `cursor-zoom-in` goes with the blue border. The owner dislikes the
  magnifying glass on the playground too (task 14e), so both surfaces change cursor together.

---
<a id="decision-030"></a>

## DECISION-030 — The collage loops an excerpt, the viewer plays the whole film

Status: **Active** — settled by the owner 2026-09-11 (SESSION-040)
Date: 2026-09-10 (SESSION-038), settled and implemented 2026-09-11 (SESSION-040)
Scope: `public/videos/pg-*.mp4`, `public/videos/pg-*-full.mp4`, `CollageSlot.film`,
`ui/Lightbox`

### Context

The five playground clips are 6 to 9 second excerpts, cut with `--seconds 8` in SESSION-034
and SESSION-035 when the constraint was that 121 MB of source video had to become something
shippable at all (`DECISION-022`, amended in SESSION-034). The owner now wants the whole film
in each case.

`/playground` is already the heaviest page on the site: **2.6 MB at 1440px, 3.5 MB at 390px
at 3x**. The motorbike source is 63 seconds against an 8 second cut, so that clip alone would
grow roughly eightfold.

### The options

1. **Full length.** What the owner asked for. `/playground` becomes several times heavier.
2. **Longer excerpts**, 15 to 20 seconds. Most of the motion, a fraction of the bytes.
3. **Full length, fetched on demand.** The collage keeps a short looping excerpt; the viewer
   loads the full film when a slot is opened. This is what `ui/Video` already does for the
   12 MB kitchen animation (`DECISION-022`), so the pattern exists.

**Recommended: 3.** It gives the owner the whole film where somebody has asked to watch it,
and costs the page nothing, at the price of two files per clip.

### The measurement, taken before anything was re-encoded

`ISSUE-044` insisted on this and it was right to. Driving the built `/playground` in Chrome
and reading every `<video>` the page makes, scrolling the whole deck:

| Clip | File | Played | Loops |
| --- | --- | --- | --- |
| `pg-hibi.mp4` | 8.97s | 8.92s | yes |
| `pg-motorbike.mp4` | 7.96s | 7.93s | yes |
| `pg-gift-explosion.mp4` | 7.97s | 7.96s | yes |
| `pg-gift-riona.mp4` | 5.99s | 5.99s | yes |
| `pg-gift-popup.mp4` | 7.98s | 7.98s | yes |

**Every clip plays its whole file and repeats. There is no playback bug**, and the
`IntersectionObserver` in `ui/LoopVideo` is not cutting anything short. The clips are short
because `video-clip.mjs` was run with `--seconds 8`, and that is the entire cause. The
owner's "2 3 seconds" was an impression of an eight-second loop, not a fault.

### What shipped

**Option 3.** Each clip slot now carries a second file: `video` is the eight-second loop the
collage plays, `film` is the whole thing and only the viewer asks for it.

| Slot | Loop | Whole film | Source |
| --- | --- | --- | --- |
| Hibi | 8.97s, 189 KB | 25.3s, 451 KB | 25.4s |
| Motorbike | 7.96s, 443 KB | 62.9s, 2691 KB | 63.0s |
| Gift, explosion | 7.97s, 358 KB | 23.4s, 989 KB | 23.5s |
| Gift, pop-up | 7.98s, 487 KB | 47.7s, 2128 KB | 47.8s |
| Gift, Riona | 5.99s, 215 KB | 141.9s, 8913 KB | 142.0s |

15.2 MB of film, and **`/playground` weighs exactly what it weighed before**: a `<video>` for
the full film is only created once the dialog is open, which is the same trade `ui/Video`
makes for the 12 MB kitchen walkthrough (`DECISION-022`).

`Lightbox` gained `loopVideo`, off wherever a `film` is playing. An eight-second excerpt that
stops looks broken; a two-and-a-half-minute film that starts over unasked is a different kind
of wrong.

**They were cut at 640px and 900 kbps**, which is a smaller frame than the sources and much
smaller than the estimate: the longest is 8.9 MB rather than the ~20 MB a linear estimate from
the excerpts gave, because these are handheld shots of small still objects and the encoder has
little to do. Recording is real time — five minutes for the five of them, paid once.

---
<a id="decision-031"></a>

## DECISION-031 — The playground's colour turn runs with the card, not at the end of it

Status: **Active** (supersedes the split in `DECISION-027`'s SESSION-037 implementation)
Date: 2026-09-10 (SESSION-038)
Scope: `.pg-card` in `src/index.css`

### Context

SESSION-037 split each card's scroll runway in two: `--pg-sweep` over the first 82%, which
lights the pictures one at a time, and `--pg-full` over the last 18%, which turns the notes,
the card index and the ruling into the card's own colour. The reasoning was that the colour
should arrive as a finish once every picture is back.

The owner watched it and wants the opposite: the notes, arrows and grid should **start**
changing as soon as the card lands.

### The decision

`--pg-full` starts at 0 rather than at 0.82. The pictures still arrive one at a time; the
surrounding colour now moves with them from the first pixel of scroll instead of waiting.

**Implemented in SESSION-039** as `clamp(0, calc(var(--pg-reveal) / 0.6), 1)`: it starts with
the card and is finished at 60% of the runway, so the colour is complete while the last few
pictures are still arriving rather than chasing them.

### Consequences

- The two states stop being "before" and "after" and become one continuous change. The
  black-and-white resting state is still the resting state.
- Card 03's colour is black, which means its ruling darkens from the first scroll. **Checked
  in SESSION-039 and it is fine** — because the same session lightened the base ruling for
  `MILESTONE-010` task 14f, from `0.075`/`0.032` to `0.045`/`0.018`. The two changes had to
  land together; the earlier turn over the darker grid would have been the problem this
  predicted.

---
<a id="decision-032"></a>

## DECISION-032 — A justified row can hold a column of figures

Status: **Active**
Date: 2026-09-10 (SESSION-039)
Scope: `src/lib/justify.ts`, `src/components/case-study/SectionMedia.tsx`

### Context

`MILESTONE-010` task 8 asks for WikiMind's three sketch figures as a bento: the tall page of
sketches on the right, the two wide ones stacked beside it. `DECISION-019` sizes every figure
in a row by **height** and lets the browser justify the widths, which is what keeps a row of
mixed aspects from having three different bottoms. It cannot express a bento at all: on their
own aspects the two wide figures each claim a row and the tall one takes a third.

### The decision

A row is made of **cells**, and a cell is one figure or a column of them. A figure marked
`stackWithNext` in the data joins the next one into a cell. Everything downstream — the
wide/narrow grouping, the three-per-row chunking, the justification — counts a cell as one
item, so nothing else had to learn about stacks.

`justifyCells` in `lib/justify.ts` does the arithmetic. A single figure's width is
`height * ratio`. A stack of `n` sharing one width has `n - 1` extra captions and `n - 1`
inner gaps to find room for, so its width is `(height - overhead) * k`, where
`k = 1 / Σ(1 / rᵢ)` is the ratio the stack would have with nothing between its figures.
Every cell then finishes at exactly `height + one caption`, and the row's bottoms line up.

### Why it is safe

**A row whose cells all hold one figure has zero overhead everywhere and reduces exactly to
`rowMetrics`.** That is not a claim about the code being careful, it is the arithmetic:
`height = (columnPx - gaps + 0) / Σk` with `k = ratio`. Every existing page renders
identically, which is what let this replace `rowMetrics` at the call site rather than sit
beside it.

### The approximation, stated

The widths are exact at the reading column's 960px. As the row narrows the fixed gap and the
fixed caption do not shrink with it, so a stack runs slightly taller than its neighbour.
Measured on `/work/wikimind`: 1px at 1440px, 5px at 1024px, 17px at 800px. Below 768px every
row stacks to one column and the question does not arise.

### What it does not do

**The bento is not square.** The milestone estimated it would come out "close to square"; it
does not, and it cannot. Both columns scale linearly with the row's height, so the block's
aspect is fixed at roughly 2.2:1 whatever size it is drawn at — the tall figure at 0.665 and
the two wide ones at 2.75 and 3.48 do not admit a square arrangement. What the owner asked
for is the *arrangement*, and that is what shipped.

---
<a id="decision-033"></a>

## DECISION-033 — A note's seat is chosen by the arrow it would need

Status: **Active**
Date: 2026-09-11 (SESSION-040)
Scope: `src/lib/playground/placeScribbles.ts`, check 5 in `scripts/content-audit.mjs`
Closes: `ISSUE-043` cause 1, the last one standing

### Context

The owner, on the playground's notes:

> "for the issue with the arrows, i want you to point at the nearest image not across
> anything because it is causing overlapping and the loops in the arrows do not look good
> too make the loops rounder and better."

`SESSION-038` made note placement geometric and `SESSION-039` made it measured, and both
worked on the **note**. Neither looked at the stroke. A seat being free says the note box
clears every picture; it says nothing about the arrow that has to get from it to the one it
is about, and on a crowded card the nearest free seat is regularly on the far side of two
photographs. Measured across five stage widths, fifty arrows: the worst lay **394 CSS px**
across other pictures, and 2,773 px of stroke was over a picture in total.

### The decision

**Placement and routing are one search, and crossing is what it minimises.**

1. **An arrow ends at the picture's nearest point to the note**, not at the point on the ray
   from the picture's centre. On a 4,000-unit-wide slot those are different places: a note
   above the left end was sent to a landing point near the middle, so the stroke travelled
   sideways across the card to reach a picture directly below where it started. The owner's
   word for that was "across".

2. **A seat is scored on the arrow it would need.** Every free seat around the picture, plus
   a shortlist of twelve clear places found by sweeping the whole card, is given its best
   available arrow and re-scored on what that arrow lies across.

3. **The bend is a search, not a seeded number.** Both control points move independently over
   a grid, which is what lets a stroke go **between** two pictures rather than over one. The
   seeded bend is still preferred on anything close, so an arrow with a clear run is drawn the
   way it always was and the cards keep their variety.

4. **Leaving the card counts as crossing.** The card is `overflow: hidden`, and a bend wide
   enough to clear three pictures took one arrow up over the frame's top edge, where the
   middle of it simply was not drawn.

**Result: the worst crossing is 16 CSS px and the total is about 60.** From 394 and 2,773.

### The loop, redrawn

The curl was an arc whose chord was its own radius — 300 degrees, so a C with a quarter
missing, joined to the line at an angle the pen would have had to lift to make. The chord is
a third of the radius now, which closes it to within 20 degrees of a full circle, and both
its ends run along the line of travel.

It also **stands a radius off the note before it begins**. A loop drawn from the note's own
edge is a circle centred a radius away from that edge, and a circle centred a radius from an
edge covers what is behind it: the first one was drawn straight through the words it belonged
to.

Two radii and two directions are offered to the search, so a curl that will not fit one way
is drawn tighter or the other way round rather than dropped. Seven of fifty arrows curl.

### Why it is checked rather than looked at

`content-audit.mjs` measures every arrow on every card at five stage widths and fails the
build over 40 CSS px, and over any stroke drawn outside the card. **The check was proved by
re-injecting the fault**: with the single-bend arrow restored it reports 14 findings.

This is the project's third session on `ISSUE-043` and the second time a fix has been judged
by looking at one card at one width. A number that the build enforces is what stops there
being a fourth.

### Cost

Placement runs about 4 ms a card, up from under 1. It runs on mount and on resize, so
`stageUnits` quantises the stage measurement to a quarter of a design unit — about twenty
pixels of card width — which cuts the re-runs during a window drag by a factor of twenty-five.
Nothing here is accurate to a quarter unit anyway: the note's size is an estimate from the
type's metrics, and `MARGIN` alone carries 340 units of slack.

---
<a id="decision-034"></a>

## DECISION-034 — The process question's size is solved from its own measurement

Status: **Active**
Date: 2026-09-11 (SESSION-040)
Scope: `src/components/process/HeroProcess.tsx`, `src/components/process/branchData.ts`
Closes: `ISSUE-045`, `MILESTONE-010` tasks 3b and 3c

### Context

"How do I bring a project to life?" wrapped to two lines once the process map arrived, and the
owner wants it on one. The hub it sits in was 340 units wide at 32px, and the sentence is 457
units in English and **567 in German** — German is the one that sets the width, and neither
fitted.

### The decision

**The element measures itself and the size follows.** `measure()` reads the question's width
at a font size of one pixel, once per resize, and the end-state size is
`min(32 × scale, (hub − 24) / that)` with a floor of 18. `white-space: nowrap` is on the whole
way through, and the box is never allowed narrower than the words, so nothing spills during
the transition either.

A hard-coded `clamp()` cannot keep this promise. The German sentence is a quarter wider than
the English one, the hub is a fraction of a map that scales with the window, and the sentence
is a string in a dictionary that somebody will rewrite. Measured, it holds in all three cases.
Verified at five widths from 1920 to 960 in both locales: **one line in every one**.

### The map has less room than it looks

Two numbers, both found by measuring rather than choosing:

- **The top row cannot start above 99.** The fixed header covers the canvas down to about
  there once it is full-bleed, and a row at 30 had its numbers and titles behind the header.
- **The bottom row cannot start below about 504.** The tallest cluster in it runs 340 units
  and the map ends at 900. Moving that row to 566 to open a band across the middle cut the
  bottom off both illustrations.

So the two rows own 99–473 and 504–844 and **there is no clear horizontal band between them**
— 31 units, against a question 36 tall. The question therefore stays where it always was, in
the gap between clusters 1 and 2, and that gap is what limits it: 480 units, which reads at
about 26px against the map's own scale.

**This is the trade, stated plainly: a wider question means shorter connectors.** 480 leaves
71 units of air on each side and the connectors are 72. The owner asked for the question on
one line and the question is what the canvas is about.

### The connectors (task 3c)

Five strokes, each **72 units**: four level rules flanking the question, two above its centre
line and two below, and one dropping from its foot to cluster 5. They were 82, 134, 141, 180
and 197 units at five unrelated angles, anchored to nothing in particular — one ended at a
cluster's title, another halfway up its side, a third in open space.

**Diagonals were tried first and are wrong here.** Radiating them out of the hub's corners
puts two strokes 16 units apart at a shared vertex, and what that draws is a chevron on each
end of the sentence rather than two connectors. Level rules at different heights separate the
pair without any splay.

**Clusters 2 and 4 moved right.** They were placed at a fixed `left`, so their differing
widths left right-hand margins of 86 and 32 against 65 on the left, and the gaps beside the
question were uneven. They are placed by their **inner** edge now, mirroring clusters 1 and 3
about x = 720, because the inner edge is the one the eye reads against the question.

### What this does not fix

**In the reduced-motion and mobile layout the connectors point at nothing.** There, the
question is a separate heading above the map, so the five strokes converge on an empty centre.
That was equally true before — the old lines converged on the same hole — and it is left
alone rather than quietly redesigned, because the owner has not seen that view either.

---

<a id="decision-035"></a>

## DECISION-035 — Three bands, so clusters 01 and 02 get one row

Status: **Active**
Date: 2026-09-11 (SESSION-041)
Scope: `src/components/process/branchData.ts`, `src/components/process/clusters.tsx`
Supersedes the geometry half of `DECISION-034`; `MILESTONE-011` task 1

### Context

The owner asked for step 02's "Impact × Effort" panel removed, and for steps 01 and 02 to lay
their contents out **in one row each**.

Measured, that is impossible on the old map. Cluster 01's five panels are 580 units side by
side and cluster 02's three are 578, and each cluster had **415 units** before it reached the
centred question. `DECISION-034` explains why: the two rows owned 99–473 and 504–844, leaving
31 units of clear band against a question 36 tall, so the question had to live in the *gap
between clusters 01 and 02* — and that gap is what capped both.

The owner was shown the trade and chose to re-band the map.

### The decision

**A one-row cluster is a short cluster, and that is what pays for it.** Cluster 01 ran 374
units tall as two rows and runs 252 as one; cluster 02 ran 352 and runs 192. The top row now
ends near 350 instead of 473, which opens a genuine horizontal band across the middle — about
350 to 504 — and the question moved into it.

Three things follow, and all three were the point:

- **The clusters got their width back.** 01 and 02 are 584 units, 03 and 04 are 468. They are
  paired by width because the owner asked for 01 and 02 to match each other and 03 and 04 to
  match each other.
- **They are placed by their outer edge**, 65 units in from each side, so the four are
  symmetric about x = 720 by construction rather than by arithmetic that has to be redone
  whenever a width changes. `DECISION-034` had to move cluster 02 by hand to get that.
- **The connectors are diagonal**, which is task 1's other half and which was not available
  before: with the question wedged between two clusters, horizontal was the only direction
  with any room in it. That is why five strokes documented as "leaning 16 degrees" were in
  fact flat.

### The connectors

Four strokes leave the question's corners 124 units across and 62 down — 26.6 degrees, the
same stroke reflected about both axes — and a fifth drops from its foot to cluster 05.

**The two upper strokes end on one horizontal line** rather than each on its own cluster's
foot. Cluster 01 is 60 units taller than 02, so matching each cluster's own edge would have
made a mirrored pair visibly unequal, where ending them level reads as deliberate.

### What this costs

The question keeps `HUB_W = 480`, so nothing was given up there. What changed is that the
middle of the canvas is a band rather than a corridor, and the map has more air in it: the
regions left and right of the question, between the rows, are empty. On a 1920 window that
reads as composition. It is the honest consequence of steps 01 and 02 being one row each, and
it is what the owner asked for.

---

<a id="decision-036"></a>

## DECISION-036 — Playground arrows are straight, and stop short of the picture

Status: **Active**
Date: 2026-09-11 (SESSION-041)
Scope: `src/lib/playground/placeScribbles.ts`, `scripts/content-audit.mjs`
Closes: `ISSUE-051`; `MILESTONE-011` task 4

### Context

The owner asked for the looped arrows gone, one arrow style throughout, and a clear gap
between an arrow and the picture it points at.

### The decision

Three changes, and the third is the one that mattered.

**1. The curl is gone.** With it went `arcOf`, the five `Curl` states and the three scoring
terms that chose between them (`MILESTONE-010` task 14i, reversed). `lean` and `follow`
survive for one reason: they are how the router gets an arrow *between* two pictures instead
of over one. They are capped at ±0.32 now, from ±1.

**2. Straight is the default, not one option among eleven.** Every note carried a seeded
`bend`, so an arrow with nothing in its way was still drawn as a curve "so the cards keep
their variety". `scoreArrow` charges for the whole of the offset now and there is no seeded
gesture to be near, so the pressure is to **move the note** until the straight line is clear
rather than to bow the line around what is in the way.

**3. The tip stops 22 CSS px short**, where it used to be pulled *inside* the picture. In
pixels rather than design units, because the gap is measured by the eye against the note's own
type, which is also fixed pixels.

### The part that was not in the brief

Straightening the arrows exposed a cliff that had been there all along.

Both seat sources were **all-or-nothing**: a seat with `penaltyOf(...) === 0` was a candidate
and every other seat was discarded, with a single least-bad `best` behind them chosen on
overlap alone — with no regard for distance or for what its arrow would cross. On a crowded
card that is no choice at all, and at some widths it meant *no seats*:

| stage | card-1 calendar note | reach | arrow over other pictures |
| --- | --- | --- | --- |
| 1278px | beside its picture | 1,579 | 0px |
| 1256px | opposite corner of the card | 8,900 | **234px** |

Thirty units of note width was the whole difference. `seatCost` prices a seat instead of
filtering it: `farness`, plus a **linear and brutal** charge for lying on a picture, plus a
**squared and mild** one for merely being inside its `CLEAR` margin. A note 7px from its
neighbour beside the picture it is about is a better drawing than a clear one on the far side
of the card, and it is now reachable.

The first cut of this got it wrong in a way worth recording: it reused `penaltyOf`, whose
return value is **an area divided by a thousand** plus an off-frame term. Dividing that by the
note's area gave shares around 0.001 where the arithmetic wanted 0.4, the overlap term
evaluated to roughly nothing, and every note was placed on top of the picture it was about.

### And a minimum run

`CLEAR` lets a seat sit 20px from a picture and the tip gap stops the head 22px short of it,
which is a run of **minus two**: card 2's forest note was seated directly under its picture
and its arrowhead was drawn backwards across its own first line. A seat pays for leaving less
than 34px of shaft, and the head is capped at half the stroke it belongs to.

---

<a id="decision-037"></a>

## DECISION-037 — Portfolio and Playground share one hero component

Status: **Active**
Date: 2026-09-11 (SESSION-041)
Scope: `src/components/PageHero.tsx`, `src/components/process/HeroProcess.tsx`, `src/pages/playground/PlaygroundIndex.tsx`
`MILESTONE-011` task 3

### Context

The two modes are two views of one site and the header invites flipping between them. They
were two separate blocks of JSX and had drifted into two different first screens: the homepage
set a 14px eyebrow and top-anchored the block 59px under the header, the playground set a 12px
mono eyebrow and centred it in 70svh, and the two headings used different size tokens.
**Flipping modes moved every line on the page.**

### The decision

One component, two sets of copy. Not a tidy-up — it is the fix. Two blocks of JSX that "match"
are two blocks of JSX that will stop matching the next time one of them is edited; one
description of where things go cannot drift from itself.

Measured after: at 1440 in **both locales** the section, the container, the eyebrow, the
heading, the subheading and the tag line are identical to the pixel in both modes.

Four details are load-bearing:

- **`w-full` on the inner container.** The section is a centred flex column and a flex item
  sizes to its content in the cross axis, so `container-page` shrink-wrapped the longest line:
  the same container measured 798px in one mode and 1060px in the other.
- **The heading has a two-line floor** (`min-h-[2.04em]`, two of its own 1.02 line-height).
  One heading is one line and the other is two, and centring a block that changes height moves
  everything below *and* above it — a 40px jump on every mode switch. `justify-center` splits
  the spare line rather than dumping it underneath.
- **The subheading has a three-line floor**, for the same reason one step down: the two intros
  are different lengths and the tag line sat three lines up in one mode and two in the other.
- **`container-page` is the only horizontal padding.** The section carried a `px-5` of its
  own, which below `md` doubled the gutter to 40px a side — eleven pixels less than the German
  eyebrow needs, so "DEUTSCHLAND" fell to a line by itself on a phone.

The playground gained the tag line it needed to have the same four slots. Its tags are the
five titles from `playground/categories`, shortened to a line: nothing there names something
the cards do not show.

---

<a id="decision-038"></a>

## DECISION-038 — The collage cards play the whole film

Status: **Active**
Date: 2026-09-11 (SESSION-041)
Scope: `src/components/playground/Collage.tsx`
Reverses the card half of `DECISION-030`; `MILESTONE-011` task 14

### Context

The owner asked for the playground videos to play the complete original, first frame to last,
looping, with no click and no cuts. The card played `video` — an eight-second cut — and the
whole thing was behind a click, in the viewer.

### The decision

The card plays `film`, falling back to `video` for a slot that has no film. The owner was
shown the cost and chose it.

| clip | cut | full | duration |
| --- | --- | --- | --- |
| hibi | 189 KB | 462 KB | 25s |
| explosion | 358 KB | 1.0 MB | 23s |
| popup | 487 KB | 2.2 MB | 48s |
| motorbike | 443 KB | 2.8 MB | 63s |
| riona | 215 KB | 9.1 MB | 142s |
| | **1.7 MB** | **15.5 MB** | |

`/playground` measures 7,518 KB gzipped over a scroll of the whole deck, against about 800 KB
before.

**What keeps that from being 15.5 MB of page load is `LoopVideo` itself**: no `<video>`
element exists until the card is on screen, none are created at all under
`prefers-reduced-motion`, and each is `preload="metadata"` and streams. The cuts are kept in
`public/videos` and in the data precisely so this is revertible in one word.

`pg-gift-riona-full.mp4` at 9.1 MB for 142 seconds is the outlier — 64 kB/s where the
motorbike film is 44 — and is worth a narrower re-encode. `ISSUE-052` has the command and the
two reasons it was not simply run.


---

<a id="decision-039"></a>

## DECISION-039 — The collage arrows are arcs, and the Figma frames say where the notes go

Status: **Active**
Date: 2026-09-11 (SESSION-042)
Scope: `src/lib/playground/placeScribbles.ts`, `src/lib/playground/collage.ts`
Amends `DECISION-036` (the arrow's shape) and `DECISION-033` (which still stands)
`MILESTONE-012` task 2

### Context

`MILESTONE-011` task 4 asked for "normal" arrows and one style throughout. The curl went, and
with it `arcOf`, the five `Curl` states and three scoring terms — and **straight** became the
preferred shape, with `scoreArrow` charging 960 for every unit of offset away from it.

Then the owner drew what they meant. Page 2 of `Portfolio.fig` came back with ten annotation
arrows on the four collage frames, and not one of them is straight: they are single smooth
arcs of about a quarter-turn, with an open two-stroke head.

**Both instructions are the same instruction.** What the owner wanted gone was the loop, and
straightening was how that was delivered when the only description available was the word
"normal". The arc is what they wanted *instead* of the loop, and it took a drawing to say so.

### The decision

**One: the arc is the default shape.** `BOW = 0.28`, and `scoreArrow`'s middle term becomes
the distance from it — `(||lean| − BOW| + ||follow| − BOW|) × 960` — which is the same
arithmetic with its origin moved. A straight line is no longer free; a stroke that bows the
wrong amount pays whether it bowed too little or too much.

0.28 is measured, not chosen: with `c1` at 0.2 along the chord and `c2` at 0.72, a pair of
0.28s bows the middle of the stroke out by about a fifth of its length, which is the sagitta
of the owner's own arrows (the shallowest is 1,672 units long and stands 492 off its chord).

**Which way it bows is not charged for at all.** A mirrored arc is the same arc, so the sign
is left entirely to clearance — and that is what keeps the four cards from drawing one
gesture eleven times.

**Two: every note carries a corner.** `prefer` was two of nine, added where the owner had a
view. It is eleven of eleven now, read off the frames. It stopped being an exception and
became the data: the three notes that had no `prefer` were not left free because nobody
minded where they went, but because nobody had said.

`PREFER_MISS` went 2,400 → 9,000 to survive the new `shortRun` term. At 2,400 the notes
simply bought arrow length by leaving the corner they had been given.

**Three: a third note on card 3.** Frame 3 carries three annotations and the card shipped
two. The missing one is the top right, where the arrow springs off the group portrait —
"drawn from / one photo", in both locales.

### What was deliberately not copied

**The direction.** Every arrow on page 2 points *at* the text, tail on the picture. The site
draws the opposite and keeps doing so: the owner confirmed those arrows are notes to the
reader of the Figma file — "put a note here, about that piece" — not a specification of which
end the head goes on. An arrow pointing at its own caption is not an annotation.

**The style and the size**, which the owner excluded in the ask itself. The pen, the
handwriting, the colour and the tint behaviour are all unchanged.

### Consequences

- The arrows read as one deliberate gesture rather than as eleven straight lines, and the
  notes sit where the owner put them — ten of the eleven hold their corner at 22 or more of
  the 22 stage widths swept.
- Measuring the deck to make this change found that the arrows had been **too short to be
  arrows** at 127 of 264 placements. That is not part of this decision; it is `ISSUE-053` and
  the `MILESTONE-012` write-up.
- `LEANS` and `FOLLOWS` are nine offsets arranged around `BOW` rather than seven around zero,
  with `0` kept at the end of each list so a straight line stays reachable on a card that
  leaves no room to curve.

---

<a id="decision-040"></a>

## DECISION-040 — The process map's bottom row turns a corner, and its right column hangs from the right

Status: **Active**
Date: 2026-09-11 (SESSION-042)
Scope: `src/components/process/branchData.ts`, `src/components/process/BranchGroup.tsx`
Extends `DECISION-035`; `MILESTONE-012` task 1

### Context

The owner asked for two things at once: steps 02 and 04 right-aligned, and the bottom row's
connectors L-shaped — "so that they go a bit up to compensate the space after 1 and 2".

The second half of that sentence is the reason for the first. `DECISION-035` put clusters 01
and 02 on one row each, which made them short: the top row now ends near y = 350 and the
bottom row starts at 504, leaving a real horizontal band across the middle with the question
in it and nothing else.

### The decision

**The bottom row's connectors are right-angled elbows.** 03 runs out along the question's
foot and turns down; 04 is the same stroke reflected, so the pair opens away from the middle.

```
  [01]                    [02]
      ＼                  ／
       ＼                ／
        ( the question )
   ┌─────┘              └─────┐
   │                          │
  [03]                    [04]
```

The diagonals they replace ran 446 → 508 with their midpoints at 477. The elbow's horizontal
leg runs its whole 124 units at **446**, thirty-one units higher — so the stroke lies *in*
the band the short top row opened rather than cutting across the corner of it. That is what
"go a bit up" asks for, and it is why the top row keeps its diagonals: the map has two kinds
of stroke because it has two kinds of space.

**02 and 04 hang their contents from their right edge.** The four boxes were already
symmetric about x = 720 — placed by their outer edge, 65 units in from each side — and
everything *inside* the two right-hand boxes was left-aligned, so they read as left-hand
clusters that happened to start further across. The number, the title, the question and the
wrapped panels now all align right, and the hover zoom grows from `origin-top-right` so a
cluster already 65 units from the edge does not scale over it.

### The thing that needed no new coordinates

**All four upper landing points were already 287 units in from their own cluster's outer
edge** — 352 is 287 from the left-hand boxes' left edge at 65, and 1088 is 287 from the
right-hand boxes' right edge at 1375. Right-aligning 02 and 04 moved their contents *onto*
the points the strokes had been reaching for all along. The alignment made the existing
geometry correct rather than requiring new geometry.

### Consequences

- `BranchLayout` gains `align`, and it is read **only on the pinned map**. The phone lays the
  five steps out as one column, and a column with two of its five steps right-aligned is not
  a mirror of anything.
- The map now has two connector idioms. That is deliberate and it is the owner's call; if it
  ever reads as inconsistent, the fix is to elbow all four, not to un-elbow these two.

---

<a id="decision-041"></a>

## DECISION-041 — The homepage's one pill belongs to the playground; About trails off instead

Status: **Active**
Date: 2026-09-11 (SESSION-042)
Scope: `src/components/AboutPreview.tsx`, both dictionaries
Reverses `MILESTONE-011` task 13; `MILESTONE-012` task 3

### Context

`MILESTONE-011` task 13 turned the About link into a filled pill, on the argument that it was
the section's one real call to action and was the weakest control on a page whose contact
section, mode switch and language switch are all pills. The playground link below it stayed a
text link, so the two read as a primary and a secondary.

The owner now wants the pill on the playground, and About to "fade the text out in the end so
that user wants to click to more to go to about page".

### The decision

The two halves of that column are not the same kind of offer, and that is the whole
justification for the swap:

- **About is a story you can keep reading.** It is invited by a fade — the paragraph runs on
  and dissolves into the white — and closed by a quiet accent link, "Read the whole story →".
- **The playground is a place.** A place needs a door, so it takes the `h-12 rounded-full
  px-7` pill, inverted for a white ground, with the `focus-visible` ring the rest of the
  site's controls carry.

There is still exactly one primary control in the section. It has changed which half it
belongs to.

### The copy had to change with it

`copyDim` was one line of signposting — "There is more of it on the about page" — which is
the page telling you there is more instead of showing you, and there is nothing in it worth
fading. It is now the **about page's own third paragraph**, so the text that dissolves is
real biography.

The third rather than the second: the second paragraph says the career came from the other
person's point of view, which is what the paragraph directly above it has just said. The
third opens "It is also what brought me 6,570 kilometres from home to Germany", which picks
up `copy`'s closing "it is still how I work" instead of restating it.

`linkPlayground` lost its "→" — a pill does not carry an arrow glued to the end of a string,
which is the `MILESTONE-011` task 13 argument applied in the other direction — and
`linkAbout` gained one.

### Accessibility

The fade is a `mask-image`, which is paint and nothing else: the whole paragraph is in the
DOM and a screen reader reads every word of it. The gradient starts at 55%, so two of the
three English lines stay at full strength and the third is what dissolves — the paragraph
reads as interrupted rather than as a rendering fault. German sets four lines and the same
fraction still leaves three of them whole.


---

## DECISION-042

**Below `md` the mode switch is one on/off toggle, and the header is one row**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-043 |
| Area | `components/ModeSwitch.tsx`, `components/Header.tsx` |
| Supersedes | `MILESTONE-011` task 11, which gave the switch a second row |

### The problem this has now been solved twice

The wide switch is a segmented control: both destinations on screen, the current one filled.
It wants about 200 x 46. A 360-pixel header bar holding a 148-pixel wordmark and a menu
control has nowhere to put it, which is `ISSUE-016`: at 480px it overlapped the wordmark by
34 pixels and at 520px by 14.

`MILESTONE-011` solved that by **giving it a row of its own** and tightening both rows to 60
and 53. That is 113 pixels of an 844-pixel phone spent before a word of the page, for one
control, on every route.

### What the owner asked for

"A toggle with only a circle and, inside, at the side of the circle, the toggled status.
Example would be those toggle buttons with on and off." Which is the switch every phone
already has, and it fits in 115 x 40 — so the switch goes back into the first row, between
an `AM` monogram (28px) and a hamburger (44px), with 86 pixels clear on each side. The
second row is gone and the header is 61px below `md`.

### Why it is one link and not two

A switch shows one state, so there is only one thing on screen to click. The compact form is
therefore **one link to the other mode, drawn showing the mode you are in**. That split is
why it carries its own `aria-label` (`nav.switchToPlayground` / `nav.switchToPortfolio`): a
link must announce where it goes, and what this link *says* is where you already are.

`role="switch"` was considered and rejected. It describes a control that toggles state in
place; this one navigates, and announcing "switch, off" for something that loads a different
page is a worse lie than the one it repairs.

The knob changes side with flex `order` rather than sliding along an absolute track. A slide
would never be seen — the knob only moves because the route changed, and the page changes
under it in the same frame — and a fixed-width track has to be wide enough for the longest
label in every locale, a number that goes stale the first time somebody translates the word
"Playground".

### The wordmark

`AM` below `md`, the full name from `md` up, both inside one `aria-label="Alexsha Maharjan"`
so the link announces the same thing at every width. The full name is 148 of 360 pixels and
it is the one piece of information on the page that the visitor already has: they are on the
site.

---

## DECISION-043

**The narrow-viewport menu is a drawer, dismissed by the page**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-043 |
| Area | `components/MobileMenu.tsx` |

Three changes, all the owner's, and all of them worth having:

**A hamburger, not the word "Menu".** 44 pixels of a 360-pixel bar spent labelling a control
that has had a universally understood glyph for fifteen years, and a string to translate. The
button keeps its `aria-label`, so the word is still there for anyone who needs it.

**A drawer, not a full-screen takeover.** The overlay covered the page and centred five links
in the middle of it. There was then nothing to aim at to get back, which is why the only exit
was the word "Close" where the hamburger had been. A drawer leaves the page beside it, and
**the page becomes the way out**.

**Clicking outside closes it**, and that is written as a real backdrop element rather than a
`document` click listener. The listener version is the one that goes wrong: it fires on the
same click that opened the drawer unless the handler is delayed or the event stopped, and it
closes on a scrollbar click or a drag-selection that happens to end outside the panel. A
backdrop can do neither. It is `aria-hidden`; the drawer is a `dialog` with Escape and a
close button, so nobody is offered the backdrop as a control.

Focus moves into the panel on open and back to the hamburger on close. It is **not trapped**:
the drawer is a five-item list with a close button at the top, and a hand-maintained focus
trap is a bigger liability than tabbing past the end of a list that Escape dismisses.

The drawer also carries the two destinations the header bar cannot: the other mode, and the
résumé.

---

## DECISION-044

**The footer is the email address**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-043 |
| Area | `components/Footer.tsx` |

The old footer was a twelve-column grid — wordmark and tagline in seven, two stacks of links
in five, a utility strip fourteen units below — which came to about 380 pixels on a desktop
and roughly 520 stacked on a phone. The owner's two complaints, "too big" and "too plain",
are one complaint: **a block with nothing in it that wants looking at has no reason to be
tall.**

So the height that went is the height that was empty, and the thing that fills what is left
is the one thing a visitor at the bottom of a portfolio might actually want. The email
address was set at 12px in a mono stack beside a LinkedIn URL; it is the largest type on the
page now, on its own line, under one line of invitation. Everything else is navigation and is
sized as navigation: one wrapped row, one rule, one utility strip carrying the language
switch, Impressum, Datenschutz, the copyright and back-to-top.

About 200 pixels, and nothing was cut: every destination the old footer reached is still
there and two more have been added.

The underline under the address is drawn, not declared. `text-decoration` under 44px type
sits too close and too heavy, and a hand-drawn line is the site's own gesture anyway — it is
what `About` puts under a word and what the playground's notes are made of. It grows to the
full width of the address on hover, so the link still announces itself as one.

The owner chose this over a compact single band and over a minimal one-line footer.

---

## DECISION-045

**The phone gets the five process steps as cards, not as a column**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-043 |
| Area | `components/process/BranchGroup.tsx`, `HeroProcess.tsx` |
| Extends | `MILESTONE-011` task 10 |

Below 880px there is no pinned map — `ISSUE-049` established that scaling a 1440 x 900 map
onto a 390px phone draws 9px labels at four and a half — so the five steps are laid out the
way a phone lays things out. `MILESTONE-011` made that a column with 48 pixels between the
steps.

On a black canvas 48 pixels of black is not a separation. The bottom of 02 ran into the top
of 03 and the five steps read as one very long list of small pictures.

Each step is a bordered card now, with its number in a chip and its own illustration
wrapping inside it, and a dashed stroke between cards: what the map says with five
connectors, the phone says with four ticks down the middle. The owner chose this over a
playground-style scroll-revealed deck (which makes the homepage much longer on a phone and
reads as five separate pages rather than one sequence) and over a tap-to-expand accordion
(which hides the illustrations, and the illustrations are the point).

Steps 03 and 04 lay their contents out as explicit rows for this, taking a `stacked` prop so
a row pinned to its right edge inside the map starts at its left edge inside a card. See the
note above `Cluster3`: a `w-full` child takes a line of its own by construction, where widths
that happen to add up stop adding up the first time a German label gets longer.

---

## DECISION-046

**`/impressum` and `/datenschutz` keep German paths in both locales**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-043 |
| Area | `routes.tsx`, `pages/Legal.tsx`, `dictionaries/*.legal` |

A portfolio published from Germany that solicits work needs an Impressum (§ 5 DDG) and a
privacy notice (DSGVO), and the place both are looked for is the footer.

**The paths are not translated.** "Impressum" and "Datenschutz" are the words a German
visitor scans a footer for and the words an authority looks for in a URL; translating them on
the English side would make the site harder to check compliance on, not easier. The headings
and the prose are translated; the addresses are not.

**One component renders both.** They are the same page — a title, a line of orientation, a
date and a run of headed sections — and two components would be two places to fix a measure
for no difference a reader could name. Neither is lazy-loaded: 4KB of strings linked from the
footer of every page would cost more as a separate chunk behind a Suspense fallback than it
saves.

**The postal address ships as a visible placeholder.** `[ Street and number ]` /
`[ Straße und Hausnummer ]`, stated once in `LegalCopy.address` and rendered into both pages.
An Impressum with no address is not an Impressum, and the address is a fact only the owner
has: it is not in the repository, it cannot be derived, and `DECISION-011` says never invent
one to fill a gap. The brackets are deliberately conspicuous. **The site must not be deployed
before they are replaced.**

Writing the privacy notice honestly is what opened `ISSUE-055`: the site loads its typefaces
from Google's CDN, so the notice has a "Typefaces" section disclosing an IP transfer that
self-hosting would remove outright.


---

## DECISION-047

**The playground's pictures live on the collage cards, and nowhere else**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-044 |
| Area | `lib/playground/`, `components/playground/`, `scripts/` |
| Supersedes | the data half of `DECISION-026` |

### What was deleted

`lib/playground/categories/` (five files and a registry), `PlaygroundItem`,
`PlaygroundCategoryContent`, `PlaygroundCategoryLocaleContent`,
`components/playground/Scrapbook.tsx`, `components/playground/Tile.tsx`, the
`playgroundNav` dictionary block, `landmarks.categoryNav`, and seven fields of
`playground/home.ts` that described layouts the page has not had for two sessions.

### Why it had survived

`DECISION-027` replaced the scrapbook with the deck of four collages. The category data was
kept, and `PlaygroundIndex`'s own doc comment said why: *"It is no longer rendered ... but it
is the only place the captions and the still-empty slots are written down, so it stays until
something replaces it."*

**That was not true**, and it was checkable in one file: `CollageSlot` carries
`caption: Record<Locale, string>` and `alt: Record<Locale, string>`, so every picture on
every card already had both, in both languages, next to its own coordinates. The categories
were not the record of anything. They were 47 items of content that nothing rendered, that
`content-audit.mjs` still spent a check on, and that `image-manifest.mjs` still counted as
unfilled slots — which is why the playground read as 88% complete when it was finished.

Worse, it was actively misleading: `MILESTONE-013`'s caption review was built against the
category files, so the owner reviewed 47 strings of which only 31 corresponded to anything on
screen, and 17 live pictures were not in the review at all.

### What replaced the audit

The check that went with the categories was `en`/`de` parity across their items. A collage
slot holds both locales on one object and cannot drift apart, so parity-by-comparison is no
longer a thing that can fail. What can fail is a locale being **empty** — the key is present
and the string is `""`, which `tsc` accepts and which reaches the page as a blank heading
over a picture, or a blank `alt`. That is what is checked now, along with the poster rule
(kept, unchanged) and two new ones: a `film` with no `video` loop, and the same picture
placed on two cards.

### The consequence nobody asked for

Three exports stopped being referenced by anything: `pg-gift-explosion.webp`,
`pg-postcard-2.webp` and `pg-postcard-3.webp`, 148 KB of pictures that were only ever on
category pages. They were removed from `public/images/` and from `image_crops.json`. **Their
sources are untouched in `Images/`** — putting one back on a card is a slot and an
`npm run images`, not a recovery.

---

## DECISION-048

**The viewer steps through a card**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-044 |
| Area | `components/ui/Lightbox.tsx`, `components/playground/Collage.tsx` |

Opening a collage piece was a round trip: open, look, close, find the next one on a card of
a dozen or fourteen, open that. The owner asked for next and previous.

**`Lightbox` grows three optional props** — `onPrev`, `onNext`, `position` — and renders the
edge buttons, the counter and the two arrow keys only when a handler is passed. The case
studies pass none of them and get exactly what they had: a figure there belongs to a section,
not to a gallery, and there is no obvious "next" for it to mean.

**The caller owns the wrapping.** The dialog only ever says "the reader asked for the one
after this"; whether that is the first one again is a fact about the set. `Collage` wraps,
because a collage is a loop rather than a list — there is no first or last picture on a card,
only the one you started at.

**`Collage` holds an index now, not a slot.** Both of its layouts map over the same `slots`
array, so one index means the same picture in the design and in the masonry.

Three details that are not obvious:

- **The zoom resets on a step.** Carrying "actual size" across means the next picture opens
  scrolled into the middle of itself at a magnification chosen for a different image.
- **The steppers sit on the dialog, not in the scroll container**, so they stay put while a
  picture pans under them — and so that a click on one is never read as a backdrop click,
  which with `zoomable={false}` would close the dialog instead of stepping.
- **A button with nowhere to go is not rendered**, rather than disabled. A disabled control
  still takes a tab stop and still invites a click.

The focus trap was two elements and is now built from whatever rendered. The `<video>` had to
be given a `tabIndex` to be in that list at all: Tab used to reach a film's controls by
falling out of a trap that was too short to engage, which happened to work and was not a
design.

---

## DECISION-049

**The cursor tag is painted in its card's colour**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-044 |
| Area | `components/playground/Collage.tsx` |

Hovering a picture names it beside the cursor. That tag was `bg-ink`, the site's near-black,
on all four cards — and it was the last mark belonging to a card that was not in the card's
own colour. The arrows, the notes, the index and the ruling all arrive at `card.accent` as
the card takes its colour back; the owner asked for the tag to do the same.

`Collage` takes `accent` as a prop rather than reading a CSS variable, because the tag is
portalled to `document.body` and inherits nothing from the card.

**Mixed 12% towards the ink rather than used neat**, for one card: card 1's orange
(`#D65A18`) is 3.9:1 against white, under AA for 12.5px text; 88% of it is 4.8:1. The other
three are 5.3:1 or better neat and lose nothing visible. One rule rather than a per-card
exception, so that a fifth card cannot arrive with an illegible tag.

Written as a flat `linear-gradient` over `backgroundColor` rather than as `color-mix`, so the
two declarations cannot be reordered into the `background` shorthand resetting the overlay.

---

## DECISION-050

**An export is checked by re-deriving it, not by its timestamp**

| | |
| --- | --- |
| Status | **Active** |
| Date | SESSION-044 |
| Area | image pipeline |
| Supersedes | the mtime comparison `MILESTONE-013` used |

`MILESTONE-013` checked whether an export was current by comparing the modification time of
its source against the modification time of the export. `ISSUE-057` is what that misses: six
sources had been re-cropped and carried timestamps older than exports made from their earlier
contents, so the check reported everything current while the site shipped the old pictures.

The check is now: **re-export every entry in `image_crops.json` and diff the bytes.**

It works because `image-treat.mjs` is deterministic — same source, same crop, same Chrome,
same bytes. Of 131 entries re-exported, 114 came out byte-identical and 17 did not, and the
seventeen were exactly the sources that had changed. There are no false positives to sift.

Do **not** use the sampled mat colour as the detector. It moved materially on four of the six
and imperceptibly on the other two: it is a symptom of a changed picture, not the evidence.

The cost is a couple of minutes of Chrome and a working tree full of identical files, so it
is a thing to run when an export is in question rather than on every build — and after
running it, keep only the files that actually differ.
