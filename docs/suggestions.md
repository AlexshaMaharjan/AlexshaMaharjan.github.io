# Suggestions

Improvements that are not defects.

Improvements that are not defects. Three are implemented and one partially, in
SESSION-003 and SESSION-004; the rest await owner approval.

Items marked ★ map directly to priorities the owner stated at initialization: case-study
layout, correct images, humanised copy, richer animation, design consistency.

| ID | Title | Status | Priority | Impact | Effort | Milestone | File |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SUGGESTION-001 | ★ Rebuild "Selected Work" image-led, one tile per project | Proposed | High | High | Medium | M-002 | [#suggestion-001](#suggestion-001) |
| SUGGESTION-002 | ★ Give every image slot an optional real source | **Partial** | High | High | Small | M-003/M-005 | [#suggestion-002](#suggestion-002) |
| SUGGESTION-003 | ★ Redesign the case-study reading experience | **Implemented** | High | High | Large | M-003 | [#suggestion-003](#suggestion-003) |
| SUGGESTION-004 | ★ Replace `body: string[]` with a typed block model | **Implemented** | High | High | Medium | M-003 | [#suggestion-004](#suggestion-004) |
| SUGGESTION-005 | ★ Editorial pass — humanise copy, cut redundancy | Proposed | High | High | Large | M-004 | [#suggestion-005](#suggestion-005) |
| SUGGESTION-006 | ★ Establish a shared GSAP motion system | Proposed | High | High | Medium | M-006 | [#suggestion-006](#suggestion-006) |
| SUGGESTION-007 | ★ Page transitions between routes | Proposed | Medium | Medium | Medium | M-006 | [#suggestion-007](#suggestion-007) |
| SUGGESTION-008 | ★ Scroll-linked interactions on case studies and media | Partly **withdrawn** (`DECISION-025`) | Medium | Medium | Medium | M-006 | [#suggestion-008](#suggestion-008) |
| SUGGESTION-009 | ★ Consolidate the design system | Proposed | Medium | High | Medium | M-007 | [#suggestion-009](#suggestion-009) |
| SUGGESTION-010 | Responsive audit and one layout vocabulary | Proposed | Medium | Medium | Medium | M-007 | [#suggestion-010](#suggestion-010) |
| SUGGESTION-011 | Accessibility pass to WCAG 2.2 AA | Proposed | Medium | Medium | Medium | M-007 | [#suggestion-011](#suggestion-011) |
| SUGGESTION-012 | Image pipeline and bundle budget | Proposed | Medium | Medium | Medium | M-008 | [#suggestion-012](#suggestion-012) |
| SUGGESTION-013 | Prerender routes, complete the SEO story | Proposed | Medium | Medium | Medium | M-008 | [#suggestion-013](#suggestion-013) |
| SUGGESTION-014 | Strengthen the portfolio narrative | Proposed | Medium | High | Medium | M-004 | [#suggestion-014](#suggestion-014) |
| SUGGESTION-015 | Add a validation harness (CI + smoke tests) | Proposed | Low | Medium | Small | M-008 | [#suggestion-015](#suggestion-015) |
| SUGGESTION-016 | Decide and configure deployment | Proposed | Low | Medium | Small | M-008 | [#suggestion-016](#suggestion-016) |
| SUGGESTION-017 | A lone narrow figure should not take the full reading column | **Superseded** by `DECISION-019` (SESSION-027) | **Medium** — hit twice, worked around twice | Medium | Small | M-005 | [#suggestion-017](#suggestion-017) |

### If you only do three things

1. `SUGGESTION-005` — the copy pass. The block model makes restructuring possible, not
   just rewording, and the layout it will be written into is now settled.
2. `SUGGESTION-001` — the homepage "Selected Work" rebuild, once `DECISION-010` is
   answered. It is the last surface that still reads as unfinished on arrival.
3. `SUGGESTION-010` — the responsive audit. Three measured findings are already waiting
   for it (`ISSUE-015`, `ISSUE-026`, `ISSUE-027`) and it needs nothing from the owner.


---

<a id="suggestion-001"></a>

## SUGGESTION-001 — Rebuild "Selected Work" as an image-led, single-entry-per-project section

Status: Proposed
Priority: High
Impact: High
Effort: Medium

### Problem / Opportunity

The homepage's work section is the deciding moment for a visiting recruiter or client. It
currently shows eleven grey rectangles with a title and a category, five projects listed
twice, and no imagery or description (`ISSUE-004`, `ISSUE-005`).

### Recommendation

One tile per project, image-backed, driven entirely by `dictionary.projects`. Two viable
directions:

- **A — Editorial (matches the design reference).** WikiMind and AFONO as full-width
  features with large imagery, headline, description, tags, role and year; the other four
  in a two-column grid. This is what `design-reference/SPEC.md` §4/§6 specifies and what
  the deleted `ProjectEntry.tsx` implemented.
- **B — Image-backed bento.** Keep the asymmetric grid the owner started, but make each
  tile a real image with an overlaid title/category, six tiles instead of eleven, sized
  to express hierarchy.

B is more distinctive and closer to the owner's current intent; A is safer and already
has a working implementation in git history. Either way: read from the dictionary, one
entry per project, real imagery, and a visible affordance to open the case study.

### Why

An image-led grid is the difference between "six links" and "six pieces of work". It also
reactivates `ProjectCopy` fields that are currently dead (`ISSUE-010`).

### Relevant Files

- `src/components/SelectedWork.tsx`, `src/components/BentoGrid.tsx`
- `git show HEAD:src/components/ProjectEntry.tsx`
- `src/lib/dictionaries/{en,de}.ts` → `projects[]`, `selectedWork`
- `design-reference/SPEC.md` §4, §6

### Dependencies

Real hero images (`ISSUE-006`) — a bento of stand-in colour blocks will look no better
than grey boxes.

### Risks

Reverting to A discards the owner's in-progress bento direction; confirm before choosing.

### Related Issues

`ISSUE-004`, `ISSUE-005`, `ISSUE-006`, `ISSUE-010`.

### Possible Milestone

`MILESTONE-002`.


---

<a id="suggestion-002"></a>

## SUGGESTION-002 — Give every image slot an optional real source

Status: **Implemented** (SESSION-003 `e844ad9`, completed SESSION-008 `ee3857f`)
Priority: High
Impact: High
Effort: Small

### Problem / Opportunity

~115 image slots can only ever render as hatched placeholders because their types carry no
source field (`ISSUE-007`). No amount of content editing can fix that.

### Recommendation

Add optional fields — `src?: string`, `alt?: string` — to `SectionImage`,
`PlaygroundItem` and `about.carouselItems[]`, and introduce one shared component:

```
<Figure src? alt? aspect caption />
  → <Image> when src is set, <PlaceholderImage> otherwise
```

Replace the direct `PlaceholderImage` calls in `Section.tsx`, `PlaygroundCard.tsx`,
`CategoryMarquee.tsx`, `ProjectPage.tsx`, `PlaygroundIndex.tsx` and `About.tsx`.

Because the fields are optional, no existing data changes and the build stays green — the
placeholder stays the default, which preserves `DECISION-006`.

### Why

Small, low-risk, and it unblocks every future image task: after this, adding a photo is a
one-line data edit.

### Relevant Files

- `src/lib/caseStudies/types.ts`, `src/lib/playground/types.ts`, `src/lib/dictionaries/types.ts`
- `src/components/PlaceholderImage.tsx`, `src/components/ui/Image.tsx`
- The six call sites listed above

### Dependencies

None. Should land before any bulk image work.

### Risks

Minimal. Watch that the Playground keeps its intentional placeholder aesthetic where it
is a design choice rather than a gap.

### What was actually built

`SectionImage` took the `src?` / `alt?` fields and `src/components/case-study/Figure.tsx`
is the shared component, used by both `section.images[]` and the (as yet unused) `figure`
block kind. `PlaygroundItem` and `about.carouselItems[]` were left alone: they are
outside `MILESTONE-003`, and the Playground is exactly where the placeholder may be a
deliberate choice rather than a gap, which is still `DECISION-006`'s open question for
the owner.

SESSION-008 finished the rest, once `DECISION-006` was answered: `PlaygroundItem`, the
About carousel, the playground project image and the two hero collage cards all take a
`src`/`alt`, and `src/components/ui/Media.tsx` is the one component that chooses between
the image and the placeholder. `Figure` builds on it.

One departure: `Figure` shows a caption **only** when a real `src` exists. A placeholder
keeps its `[ bracketed label ]` inside the hatched box, and repeating it underneath as a
caption would say the same thing twice — the bracket is the site's signal that no asset
exists yet (`DECISION-014`).

### Related Issues

`ISSUE-007`, `ISSUE-006`.

### Possible Milestone

`MILESTONE-005` (or pull forward into `MILESTONE-003`, since case-study figures need it).


---

<a id="suggestion-003"></a>

## SUGGESTION-003 — Redesign the case-study reading experience

Status: **Implemented** (SESSION-003: 4 and 6; SESSION-004: 1, 2, 3, 5)
Priority: High
Impact: High
Effort: Large

### Problem / Opportunity

The owner's first named priority. Each case study is currently a 240px sticky rail plus a
960px column of uniform 18px paragraphs, punctuated only by hatched placeholder grids.
Sections run 300–390 source lines. There is no visual rhythm, no scale variation, and
nothing that makes a reader want to reach section 09.

### Recommendation

Treat it as an editorial layout, not a document:

1. **Vary media width.** Let figures break out of the 960px column — full-bleed hero
   moments, wide two-ups, and small inline figures with real captions instead of bracketed
   placeholder labels.
2. **Give sections shape.** Alternate a wide intro paragraph with narrower supporting
   text; give the "Design question" callout, the insights grid and the testing 3-up
   distinct visual weights rather than the near-identical bordered blocks they use today.
3. **Add a reading-progress affordance.** The sticky rail is present but passive — mark
   the active section and show progress.
4. **Fix the first-section inconsistency** (`ISSUE-008`).
5. **Strengthen the ending.** The current final section flows straight into prev/next
   cards; a deliberate outcome/reflection treatment would land the work better.
6. **Establish a figure component** with caption, credit and optional full-bleed mode.

This depended on `ISSUE-024` — the layout could not improve much while sub-headings and
lists were stored as plain paragraphs. That dependency was met in SESSION-003 (point 4,
`ISSUE-008`, and point 6, the `Figure` component), and SESSION-004 did the rest.

### What was actually built

1. **Varied media width** — text sits at a 680px measure (~70 characters, down from ~110
   at the old 960px), wide images take the full 960px column, narrower ones pack into a 2-
   or 3-up grid at roughly a third of it. Three media scales against one text measure.
   *Not* built: viewport-wide full-bleed. It collides with the sticky contents rail, which
   shares the same horizontal band — recorded under `DECISION-014`.
2. **Sections have shape** — the design question is a tinted accent panel, the insights
   are numbered white cards, the testing steps a numbered row under accent rules.
3. **Reading progress** — the rail marks the section being read and fills its left edge as
   a progress track. It also moved to 1280px, having been squeezing the reading column to
   ~313px at 768px; below that the collapsible list names the current section.
4. `ISSUE-008` — done in SESSION-003.
5. **A stronger ending** — the closing section leaves the reading column for its own
   tinted band, heading beside text, before the prev/next cards.
6. **A figure component** — done in SESSION-003. Full-bleed mode was not added, per 1.

### Why

Six well-told case studies are the substance of this portfolio. Layout is what determines
whether they are read.

### Relevant Files

- `src/components/case-study/CaseStudyPage.tsx`, `Section.tsx`, `CaseStudyHero.tsx`,
  `FactsStrip.tsx`, `ContentsNav.tsx`, `NextProjectNav.tsx`
- `src/lib/caseStudies/types.ts`
- `design-reference/SPEC.md` §9 (the shell the current version ports)

### Dependencies

`ISSUE-024` / `SUGGESTION-004` (block model) first. `SUGGESTION-002` for real figures.

### Risks

Diverging from `design-reference/SPEC.md` §9. That is probably correct here — the
reference is a static mockup and the owner has explicitly asked for better — but record it
as a decision.

### Related Issues

`ISSUE-024`, `ISSUE-008`, `ISSUE-007`.

### Possible Milestone

`MILESTONE-003`.


---

<a id="suggestion-004"></a>

## SUGGESTION-004 — Replace `body: string[]` with a typed block model

Status: **Implemented** (SESSION-003, `e844ad9`)
Priority: High
Impact: High
Effort: Medium — actual: about half a session, migration included

### Problem / Opportunity

Sub-headings, lists and paragraphs are all stored as bare strings in one array and render
identically (`ISSUE-024`). The content model, not the CSS, is what limits the case-study
layout.

### Recommendation

A discriminated union, with the current shape kept as shorthand so migration is
incremental:

```ts
type Block =
  | string                                   // shorthand: paragraph
  | { kind: "h3";    text: string }
  | { kind: "list";  items: string[]; ordered?: boolean }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "figure"; src?: string; alt?: string; aspect: string; caption: string; wide?: boolean };

interface CaseStudySection { …; body?: Block[] }
```

`Section.tsx` switches on `kind`. Migrate one case study at a time; `wikimind.ts`'s
`direction` section is the natural first (it contains a list *and* three sub-headings
currently rendered as paragraphs).

### Why

Unlocks `SUGGESTION-003` and makes the copy pass (`SUGGESTION-005`) far easier — a writer
can restructure rather than only reword.

### Relevant Files

- `src/lib/caseStudies/types.ts`, `src/components/case-study/Section.tsx`
- All six `src/lib/caseStudies/*.ts`
- `CONTENT_GUIDE.md` §5 — mirrors these arrays by index and must be regenerated after

### Dependencies

None technically; do it before the copy pass.

### Risks

`CONTENT_GUIDE.md` indexes every entry as `body[0]`, `body[1]`… Restructuring invalidates
those labels, so the guide needs regenerating in the same pass or it will mislead.

### What was actually built

As recommended, plus a `note` kind (`{ kind: "note", text }`) for the disclosure and
stats lines that were also being carried as paragraphs — the AI-persona label in
`sync-fm`, the simulation caveat in `barrier-free-kitchen`, and QIS's stats and
"2026 iteration" lines. `quote` and `figure` are implemented but unused so far.

Migration did not need to be incremental: because only the shape changed and no wording
did, all six studies moved in both locales in one pass. The `CONTENT_GUIDE.md` risk
below was handled by generating §5 from the data
(`scripts/content-guide-case-studies.mjs`) instead of maintaining it by hand.

### Related Issues

`ISSUE-024`.

### Possible Milestone

`MILESTONE-003`.


---

<a id="suggestion-005"></a>

## SUGGESTION-005 — Editorial pass: humanise the copy and cut redundancy

Status: Proposed
Priority: High
Impact: High
Effort: Large

### Problem / Opportunity

The owner's stated concern: the writing should read as a person talking about their work,
not as a coursework report — and repetitive or unnecessary passages should go.

The current copy is honest and detailed but written in a uniformly formal, passive,
academic register. Examples from `src/lib/caseStudies/wikimind.ts`:

- "I conducted a qualitative visual and structural analysis of existing AI and technology
  websites."
- "The analysis revealed a common tension."
- Section `overview` and section `challenge` both explain that AI websites feel technical
  and inaccessible — the same point made twice in consecutive sections.

Sentence length is very even, which flattens emphasis. There is little first-person
narrative and almost no concrete detail (what was actually said in an interview, what
specifically broke).

### Recommendation

A per-case-study editing pass, in this order: WikiMind → AFONO → Sync FM →
Barrier-Free Kitchen → Surugami → QIS Portal (highest-visibility first, matching
`ROADMAP.md` Phase 1). For each:

1. Cut duplicated argument across `overview` / `challenge` / `research`.
2. Vary sentence length; lead sections with a short, concrete sentence.
3. Move from "an analysis was conducted" to "I compared eleven AI websites and found…".
4. Keep the honesty constraint absolutely (`DECISION-011`): no invented metrics, no
   inflated claims, collaborators still credited.
5. Restructure into the new block model as you go (`SUGGESTION-004`).

Then the same treatment for the About page and Playground blurbs.

### Why

Copy quality is what separates a portfolio that gets read from one that gets skimmed —
and the owner has asked for it directly.

### Relevant Files

- All six `src/lib/caseStudies/*.ts` (EN blocks first)
- `src/lib/dictionaries/en.ts` (`about`, `hero`, `selectedWork`, `contact`)
- `src/lib/playground/home.ts`, `categories/*.ts`
- `CONTENT_GUIDE.md` — the field-by-field map; regenerate afterwards

### Dependencies

`SUGGESTION-004` ideally lands first. German follows in `MILESTONE-009`.

### Risks

Editing can quietly change claims. Every factual statement must survive the pass intact —
`ROADMAP.md` Phase 1 sets the right process: ask the owner what actually happened, draft
from real answers, let them react.

### Related Issues

`ISSUE-024`, `ISSUE-009`.

### Possible Milestone

`MILESTONE-004`.


---

<a id="suggestion-006"></a>

## SUGGESTION-006 — Establish a shared GSAP motion system

Status: **Implemented** (SESSION-011, `06afc41`)
Priority: High
Impact: High
Effort: Medium

### Problem / Opportunity

The owner wants richer scroll and interaction animation. Today there is exactly one
effect — a 0.7s fade + 18px lift on `[data-inview]` — plus three unrelated ad-hoc systems
(the rAF process canvas, CSS marquees, the `LoveLine` width transition). Durations, eases
and distances are hard-coded per call site, so anything added now will drift.

### Recommendation

A single `src/lib/motion.ts` exporting the vocabulary, then build on it:

- **Tokens:** `duration.fast/base/slow`, `ease.out/inOut`, `distance.sm/md/lg`, one
  `STAGGER`. Every animation uses these.
- ~~**`useScrollReveals` v2:** re-run on route change (fixes `ISSUE-001`)~~ — **done in
  SESSION-002**, independently of this suggestion. The motion values are now named
  constants (`AT_REST`, `REVEALED`, `TRIGGER_START`) at the top of the file, which is
  where this extraction should start. What remains here: use
  `ScrollTrigger.batch` for grids so items stagger as a group, call
  `ScrollTrigger.refresh()` after fonts and images settle, and support opt-in variants via
  `data-inview="up|fade|scale|stagger"`.
- **Reduced motion:** one guard, in one place, that all of the above consult.
- **Lazy GSAP:** `await import("gsap")` inside the effect so the 46 KB gzip is not on the
  critical path (`ISSUE-019`).

Once the vocabulary exists, add the effects the owner asked for: staggered card entrances,
heading line reveals, image scale-ins, and the parallax/pinning in `SUGGESTION-008`.

### What was actually built

`src/lib/motion.ts` holds `duration`, `ease`, `distance`, `stagger` and the single
`prefersReducedMotion` guard; `index.css` mirrors the same numbers as `--duration-*` and
`--ease-out` for the transitions written in Tailwind. `useScrollReveals` is rebuilt on
them, with `data-inview="up|fade|scale|stagger"` variants — `stagger` animates the
element's children under one trigger, which is what the bento and the playground category
grid use. `ScrollTrigger.refresh()` now runs once webfonts and images have settled.

**Not done: lazy-importing GSAP** (`ISSUE-019`). The at-rest state is applied in a *layout
effect*, before the browser paints, precisely so an incoming page never flashes fully
visible. Awaiting `import("gsap")` there would put the hide after the first paint and
reintroduce the flash — the same trap `ISSUE-013` hit from the other direction. Worth
revisiting only alongside a decision about whether GSAP earns its 46 KB at all.

### Why

A motion *system* reads as intentional; a pile of one-off tweens reads as noise. It also
gives every future session a clear place to add animation.

### Relevant Files

- `src/lib/useScrollReveals.ts` (new: `src/lib/motion.ts`)
- `src/index.css` (`[data-inview]` at-rest rule, reduced-motion block)
- Every component carrying `data-inview` (15 call sites)

### Dependencies

~~Resolve `ISSUE-001` as part of this — same file, same fix.~~ `ISSUE-001` was resolved
in `MILESTONE-001` and no longer gates this.

### Risks

Over-animating. The design is restrained and editorial; motion should support reading, not
compete with it (`design-reference/SPEC.md` §11 and the WikiMind copy both say exactly
this — "Motion should guide, not distract").

### Related Issues

`ISSUE-001` (resolved), `ISSUE-012`, `ISSUE-019`.

### Possible Milestone

`MILESTONE-006` (with the `ISSUE-001` fix pulled forward into `MILESTONE-001`).


---

<a id="suggestion-007"></a>

## SUGGESTION-007 — Page transitions between routes

Status: **Implemented** (SESSION-011, `06afc41`) — enter only, and the file says why
Priority: Medium
Impact: Medium
Effort: Medium

### Problem / Opportunity

Navigation is an instant, hard swap. Combined with `fallback={null}` (`ISSUE-020`) and no
scroll reset (`ISSUE-003`), moving between pages feels abrupt and occasionally broken.
`ROADMAP.md` Phase 3 already lists this.

### Recommendation

A short, restrained crossfade-and-lift on route change (~250–350 ms), driven by the motion
tokens from `SUGGESTION-006`:

- Exit: fade current `<main>` slightly, hold.
- Swap + scroll reset.
- Enter: fade/lift in, then let scroll reveals take over below the fold.

The prev/next case-study links are the strongest candidate for something more expressive
later (a shared-element move from the next-project card into the new hero), but that
should wait until the base transition is solid.

### What was actually built

A 350ms opacity fade on arrival, in `src/components/PageTransition.tsx`, driven by
`duration.base` from the motion module. **Three deliberate departures from the sketch
above:**

- **No exit.** Holding the outgoing tree while the incoming one mounts puts the transition
  in a fight with the scroll reset and the reveals over the same frame (`DECISION-013`,
  `DECISION-008`).
- **Opacity only, no lift.** A transform on the wrapper would make it the containing block
  for the case-study contents rail and break its stickiness.
- **No `key` on the subtree.** Keying by pathname would remount every page — the exact
  behaviour the scroll hooks are written around (`ARCH-01`). Animating the wrapper leaves
  the tree, and the hooks, alone.

The shared-element idea for prev/next case studies is still unbuilt, and still the right
next thing if more expression is wanted.

### Why

Removes the two most jarring moments in the site and makes the lazy-chunk wait feel
deliberate rather than broken.

### Relevant Files

- `src/components/RootLayout.tsx`, `src/routes.tsx`, `src/lib/motion.ts` (new)

### Dependencies

~~`ISSUE-002` + `ISSUE-003` must land first~~ — **both landed in SESSION-002**, so this is
unblocked. The original reasoning: a transition over a page that opens
mid-scroll makes things worse, not better.

### Risks

Transitions that delay content hurt perceived performance. Keep under ~350 ms and skip
entirely under `prefers-reduced-motion`.

### Related Issues

`ISSUE-003`, `ISSUE-020`.

### Possible Milestone

`MILESTONE-006`.


---

<a id="suggestion-008"></a>

## SUGGESTION-008 — Scroll-linked interactions on case studies and media

Status: **Implemented** (SESSION-012, `1f59f04`) — three of the five, and the file says
which two were left
Priority: Medium
Impact: Medium
Effort: Medium

### Problem / Opportunity

The homepage has one genuinely memorable interaction — the process canvas. Everything
after it is static. Case studies in particular are long scrolls with no scroll-linked
behaviour at all.

### Recommendation

Add a small, consistent set — not one effect per page:

- **Case-study hero:** subtle image scale/parallax as the hero leaves the viewport.
- **Sticky facts:** keep `FactsStrip` values visible while reading the first sections, or
  merge them into the sticky rail.
- **Active section tracking:** highlight the current section in `ContentsNav` via
  ScrollTrigger, with a thin progress indicator.
- **Figure reveals:** scale-and-fade for full-bleed figures, staggered for grids.
- **Playground marquees:** velocity-linked speed (scroll faster → marquee accelerates)
  is a natural fit for that section's playful register.

Every one of these must be a no-op under `prefers-reduced-motion`.

### What was actually built

Three effects, not five. `SPEC` §11 and the site's own WikiMind copy both argue that motion
should guide rather than distract, so the ones that earned their place:

- **Case-study hero drift** — the image moves 6% and grows 4% as the hero leaves, scrubbed
  to the scroll position. Transform only, so it cannot cause layout. Keyed on the slug
  rather than on mount (`ARCH-01`): React Router reuses the component when only `:slug`
  changes, and a mount-only effect would leave the next hero attached to the previous
  trigger.
- **Figure reveals** — wide figures scale in, grids stagger, both through the existing
  `data-inview` variants.
- **Velocity-linked marquees** — the playground rows speed up with the page, capped at 3×.

**Not built, and why:**

- **Sticky facts.** Merging `FactsStrip` into the contents rail is a layout change, and
  `MILESTONE-003` closed the case-study layout. It would want its own decision.
- **Active-section tracking** — already done in `MILESTONE-003`; the rail has marked the
  current section and shown progress since then.

#### Two things worth knowing about the marquee

It moved from CSS keyframes to a GSAP tween. `timeScale` can be nudged and eased without
restarting, where changing `animation-duration` mid-flight jumps the row instead.

`timeScale` is **set outright** on each scroll event rather than tweened to: the row should
track the wheel rather than chase it, and there are six rows on the playground index — a
tween per row per scroll event would allocate hundreds of objects a second to change a
number. The ease is kept for slowing back down, where it is worth it.

The pause control still stops the rows dead — verified by pausing with the keyboard and
then scrolling hard: 0.0px of movement. "Paused" has to mean paused for WCAG 2.2.2, whatever
the velocity is doing.

### Why

Directly addresses the owner's request for interactive and scroll animation, in the places
where the site is currently most static.

### Relevant Files

- `src/components/case-study/*`, `src/components/playground/CategoryMarquee.tsx`
- `src/lib/motion.ts` (new)

### Dependencies

`SUGGESTION-006` (the motion system) and `SUGGESTION-003` (the layout it animates).

### Risks

Scroll-linked effects on long pages are the easiest way to introduce jank. Use GSAP's
`scrub` rather than per-frame handlers, and avoid layout-triggering properties.

### Related Issues

`ISSUE-012`.

### Possible Milestone

`MILESTONE-006`.


### Amendment — the playground half is withdrawn (2026-09-10, SESSION-034)

This suggestion's marquee idea — rows that speed up as the page scrolls — shipped
in SESSION-012 and was **removed in SESSION-034**. The owner's words were "the
moving animation is also abit too busy".

The coupling itself was not the problem. **Five rows drifting in alternating
directions was**, and velocity-linking all five made a busy thing busier. Two of
the five were sliding hatched placeholders past, so a share of the movement had
nothing to show.

What replaced it keeps the spirit — motion that responds to where the reader is —
with one moving thing instead of five: a row runs only while the viewport's
centre line is inside its section (`DECISION-025`).

The rest of this suggestion, the case-study scroll-linked media, is untouched.


---

<a id="suggestion-009"></a>

## SUGGESTION-009 — Consolidate the design system

Status: **Mostly implemented** (SESSION-006, `2880697`) — points 1–3 done, point 4 open
Priority: Medium
Impact: High
Effort: Medium

### Problem / Opportunity

The owner wants the design to feel consistent. The tokens for that already exist in
`tailwind.config.ts` but are almost entirely unused; components hand-write near-identical
clamps and raw hex values instead (`ISSUE-023`).

### Recommendation

1. **Type scale.** Reconcile the five page-h1 clamps into 2–3 named roles
   (`text-hero`, `text-case-title`, `text-section`) and apply them. Same for section
   headings and body sizes.
2. **Colour.** Promote the recurring raw hexes that deserve a name — `#E4E7EE` (card
   border, ~15 uses), `#C9CEDB` (dashed border), `#4E6087` (playground ink), `#8FA6FF`
   (on-dark accent), `#A7ACB4` / `#6C7078` (on-dark text) — and replace the literals.
3. **Container.** Adopt the already-defined `.container-page`, or replace it with a
   `<Container>` component; remove the ~20 hand-written repetitions.
4. **Card and pill primitives.** `rounded-full border border-border px-3 py-[6px]` (tag
   pill) and the CTA pill recur in 6+ files — extract them.

Do this as one deliberate sweep, after the layout milestones, so pages are not swept twice.

### What was actually built

Points 1–3, in one sweep as advised, with a before/after screenshot and computed-style
comparison (`ISSUE-023` carries the detail):

1. **Type** — seven named display sizes, derived from the clamps in use rather than from
   the config's unused proposal, applied at 24 call sites. Sizes only; line-height and
   letter-spacing stay on the components for now.
2. **Colour** — `card-border`, `border-muted` and `accent-on-dark` are tokens. The process
   canvas's dark sub-palette was left as it is.
3. **Container** — `.container-page` redefined to what the site actually uses, and adopted
   at all 31 call sites.

**Point 4 — the card and pill primitives — was not done.** `rounded-full border
border-border px-3 py-[6px]` and the CTA pill still recur across six or more files. That is
a component-extraction job rather than a token job, and it wants doing when someone is
already editing those components.

### Why

Consistency here is not cosmetic — it is what makes six differently-built pages read as
one designed site.

### Relevant Files

- `tailwind.config.ts`, `src/index.css`, and most of `src/components/**` + `src/pages/**`

### Dependencies

Sequence after `MILESTONE-002` and `MILESTONE-003`.

### Risks

A large diff touching nearly every file. Do it in one focused session with a screenshot
comparison before and after, not incrementally across several.

### Related Issues

`ISSUE-023`, `ISSUE-011`.

### Possible Milestone

`MILESTONE-007`.


---

<a id="suggestion-010"></a>

## SUGGESTION-010 — Responsive audit and a single layout vocabulary

Status: Proposed
Priority: Medium
Impact: Medium
Effort: Medium

### Problem / Opportunity

Responsive behaviour is expressed three different ways: Tailwind breakpoint variants, a
raw `@media (max-width: 880px)` `!important` block in `index.css` for the bento grid, and
JavaScript `matchMedia` listeners in `HeroProcess`. Breakpoints are declared out of order
(`ISSUE-011`), and the header may collide at intermediate widths (`ISSUE-016`).

### Recommendation

1. Fix the `theme.screens` ordering.
2. Settle on one breakpoint story and document it in [`architecture.md#arch-03`](architecture.md#arch-03)
   — currently `880px` (JS + the bento CSS), `1160px` (`nav`) and Tailwind's `md`/`lg` all
   act as "the mobile breakpoint" in different files.
3. Convert `BentoGrid`'s inline `style` grid to classes so its `!important` override can
   be deleted.
4. Walk every page at 375 / 480 / 768 / 1024 / 1160 / 1440 / 1920 and record what breaks.
   Known suspects: the header (`ISSUE-016`), the case-study rail at the md boundary, the
   `1440×900` process map on very wide screens, and the About page's absolutely-positioned
   hand-drawn annotations.
5. Publish header height as a CSS variable and use it for `scroll-margin-top` and the
   sticky rail (`ISSUE-015`).

### Why

Recruiters open portfolios on phones. Right now the mobile experience has never been
systematically checked.

### Relevant Files

- `tailwind.config.ts`, `src/index.css`, `src/components/BentoGrid.tsx`,
  `src/components/Header.tsx`, `src/components/process/HeroProcess.tsx`, `src/pages/About.tsx`

### Dependencies

After `MILESTONE-002`/`003`, since those change the layouts being audited.

### Risks

None significant; mostly verification work.

### Related Issues

`ISSUE-011`, `ISSUE-015`, `ISSUE-016`, `ISSUE-023`.

### Possible Milestone

`MILESTONE-007`.


---

<a id="suggestion-011"></a>

## SUGGESTION-011 — Accessibility pass to WCAG 2.2 AA

Status: **Implemented** (SESSION-009, `d9bb612`) — see `ISSUE-030` for what measuring
found, including two of this file's predictions being wrong
Priority: Medium
Impact: Medium
Effort: Medium

### Problem / Opportunity

`design-reference/SPEC.md` §11 names WCAG 2.2 AA as non-negotiable, and the foundations
are genuinely good: global `:focus-visible`, `aria-current` on the mode switch,
`aria-expanded` on the menu, `role="img"` + label on every placeholder, an `sr-only`
process summary, and a thorough reduced-motion story. What is missing is verification and
a handful of specific gaps.

### Recommendation

1. **Marquee control.** `CategoryMarquee` auto-scrolls indefinitely and pauses only on
   hover — WCAG 2.2.2 requires a pause mechanism reachable by keyboard.
2. **Alt text.** Three heroes announce "Placeholder: …" today (`ISSUE-006`); the ~115
   caption-only slots announce "Placeholder: <caption>" by design — reasonable while assets
   are missing, but revisit as real images land.
3. **Heading order.** Verify no page skips a level, especially `PlaygroundIndex` (h1 → h2
   → h3 across marquees) and case studies (`Section` emits h2, insights emit h3).
4. **Contrast.** Check `ink-muted #858A92` on `page #F8F9FB` (likely below 4.5:1 for the
   monospace captions used throughout) and `#6C7078` on `near-black #0A0A0A` in
   `ContactSection`.
5. **Touch targets.** Mode switch and menu are 44px; the language pill (`py-2`, ~34px) and
   the footer back-to-top button are smaller.
6. **Keyboard path through the process canvas.** The branch buttons are focusable but the
   canvas only becomes interactive past 90% scroll progress — verify a keyboard user can
   reach and operate them at all.
7. Run axe/Lighthouse on every route and record results.

### Why

It is stated as a project requirement, and for a design portfolio it is also part of the
work being demonstrated.

### Relevant Files

- `src/components/playground/CategoryMarquee.tsx`, `src/components/LanguageSwitch.tsx`,
  `src/components/Footer.tsx`, `src/components/process/HeroProcess.tsx`,
  `src/components/PlaceholderImage.tsx`, `tailwind.config.ts`

### Dependencies

Best after the layout milestones; contrast decisions may change tokens
(`SUGGESTION-009`).

### Risks

Contrast fixes can alter the intended restraint of the palette — resolve with the owner
rather than unilaterally darkening greys.

### Related Issues

`ISSUE-006`, `ISSUE-016`, `ISSUE-023`.

### Possible Milestone

`MILESTONE-007`.


---

<a id="suggestion-012"></a>

## SUGGESTION-012 — Image pipeline and bundle budget

Status: **Done for images** (SESSION-019); the bundle half still stands
Priority: Medium
Impact: Medium
Effort: Medium

### Problem / Opportunity

`src/components/ui/Image.tsx` is a plain `<img>`; `sizes` is accepted and ignored. Today
that costs nothing because the real images are colour blocks — but the originals are
5000×3750 (`MANIFEST.md`). Dropping them in unprocessed would make the site very heavy.
Separately, GSAP and the case-study bundle are oversized (`ISSUE-019`).

### Recommendation

**Before real assets land:**

1. ~~Add a build-time image step~~ — done SESSION-019, but **not** with a plugin.
   `vite-imagetools` only sees files through the module graph, so it would have forced the
   move to `src/assets/` this file lists under Risks, and it pulls in `sharp`.
   `scripts/image-variants.mjs` generates the widths in the Chrome this project already
   drives, so `axe-core` is still the only devDependency. `ui/Image` builds the `srcset`
   from the generated `src/lib/imageVariants.ts`, and `predeploy` runs `--check` so a stale
   map cannot ship — a missing variant is a 404 inside a `srcset`, which is invisible.
2. ~~Add explicit `width`/`height` (or keep the existing aspect-ratio wrappers)~~ — the
   aspect-ratio wrappers were kept, which this point allows.
3. ~~Keep `loading="lazy"` everywhere except the LCP hero, which should be `priority`~~ —
   done 2026-08-25: `CaseStudyHero` passes `priority`. The rest of point 3 still stands.

**Bundle:**

4. Lazy-import GSAP inside the effect.
5. Split case studies per slug, or configure `manualChunks`.
6. Set a Lighthouse/bundle budget so regressions are visible.

### Why

Image weight is the one thing most likely to make a finished, image-rich portfolio slow.

### Relevant Files

- `src/components/ui/Image.tsx`, `vite.config.ts`, `src/lib/useScrollReveals.ts`,
  `src/lib/caseStudies/index.ts`, `src/components/case-study/CaseStudyHero.tsx`

### Dependencies

Do the pipeline before `MILESTONE-005` bulk-imports real photos.

### Risks

An image plugin changes how `src` strings resolve — files currently live in `public/` and
are referenced by absolute path, which most plugins do **not** process. Moving them into
`src/assets/` is likely required; that touches every `src` string in `src/lib/**`.

**This risk is what decided the implementation** (SESSION-019): the generator writes variants
beside the originals in `public/`, so not one `src` string moved.

### Related Issues

`ISSUE-019`, `ISSUE-006`, `ISSUE-007`.

### Possible Milestone

`MILESTONE-008` (pipeline pulled forward to just before `MILESTONE-005`).


---

<a id="suggestion-013"></a>

## SUGGESTION-013 — Prerender routes and complete the SEO story

Status: **Mostly implemented** (SESSION-013 / SESSION-017) — 5 of 6; the `og:image` remains
Priority: Medium
Impact: Medium
Effort: Medium

### Problem / Opportunity

Every URL serves the same English `index.html`; per-route meta is written by JS that no
scraper runs (`ISSUE-013`). Sharing a case study on LinkedIn — the single most likely way
this portfolio gets seen — shows a generic title and a grey square.

### Recommendation

1. **Prerender at build time.** The route set is finite and enumerable in code
   (`caseStudySlugs`, `categorySlugs`, `projectSlugs`, plus the static pages, × 2 locales
   ≈ 36 URLs). Use `vite-react-ssg` or a small Puppeteer post-build step to emit one HTML
   file per route with baked title/description/OG.
2. **Per-locale meta**, including `<html lang>` in the emitted HTML.
3. **`hreflang` alternates** linking each `/x` ↔ `/de/x` pair.
4. **`sitemap.xml`**, generated from the same route list.
5. **A real `og:image`** — currently the stand-in portrait (`ISSUE-006`).
6. Fix the meta leak in `Seo` (`ISSUE-014`) so the client-side path agrees with the baked
   HTML.

### Why

A portfolio that cannot be shared attractively loses most of its reach.

### Relevant Files

- `vite.config.ts`, `index.html`, `src/components/Seo.tsx`, `src/routes.tsx`,
  `src/lib/caseStudies/index.ts`, `src/lib/playground/categories/index.ts`

### Dependencies

Host choice (`ISSUE-025`) affects how prerendered files are served.

### Risks

Prerendering a page whose hero is a scroll-pinned rAF animation needs care — verify the
homepage renders sensibly with JS disabled and hydrates without a flash.

### Related Issues

`ISSUE-013`, `ISSUE-014`, `ISSUE-006`, `ISSUE-025`.

### Possible Milestone

`MILESTONE-008`.

### Where it stands (reviewed SESSION-025)

1. **Prerender at build time** — done. `scripts/prerender.mjs` emits the head of all 36 routes
   plus the SPA fallback, driving the same headless Chrome the verification uses. No
   `vite-react-ssg`, no Puppeteer, no new dependency.
2. **Per-locale meta, including `<html lang>`** — done, and asserted by `verify routes`.
3. **`hreflang` alternates** — done, and asserted by `verify routes` on every one of the 36.
4. **`sitemap.xml`** — done, generated from the same route list the prerender walks. The
   verification harness reads its route list *from* the sitemap, so the two cannot drift.
5. **A real `og:image`** — **still open** (`ISSUE-006`). It is a designed 1200×630 card, not a
   crop, and it needs the owner.
6. **The `Seo` meta leak** — done (`ISSUE-014`).

The one item left is the one that needs a person, so this stays open rather than closing.


---

<a id="suggestion-014"></a>

## SUGGESTION-014 — Strengthen the portfolio narrative

Status: Proposed
Priority: Medium
Impact: High
Effort: Medium

### Problem / Opportunity

Judged as a portfolio rather than as code, the site answers some questions well and others
not at all.

**Answered well:** who she is and where she's from (hero, About, the hand-drawn
annotations); how she works (the process canvas is genuinely distinctive); breadth
(Playground); background (a real, detailed résumé); honesty (explicit collaborator credits
and an unusually candid AI-use statement).

**Answered weakly:**

- **What happened as a result.** Every case study ends in reflection and limitation. The
  honesty constraint (`DECISION-011`) rightly forbids invented metrics — but qualitative
  outcomes ("the tutor group chose this direction", "the prototype was tested with six
  people") are both true and currently absent.
- **What she wants next.** "Available for design opportunities" is the only signal. No
  statement of the kind of role, no availability date, no location preference.
- **The contact path.** One `mailto:` and a LinkedIn link. No form, no PDF résumé
  download (only `window.print()`), no scheduling link.
- **There is no `/work` index.** "Projects" points at a homepage anchor; there is no page
  listing all six with filtering.
- **Playground vs Portfolio.** The mode switch is distinctive but a first-time visitor is
  not told what "Playground" means before clicking.

### Recommendation

Add an outcome line to each case study; make the contact section state what she is looking
for; offer a downloadable PDF résumé; build a real `/work` index page; add one sentence
of orientation to the mode switch or hero.

### Why

The site currently presents work. It does not quite ask for anything.

### Relevant Files

- `src/components/ContactSection.tsx`, `src/pages/Resume.tsx`, `src/routes.tsx`,
  all six `src/lib/caseStudies/*.ts` (an `outcome` section already exists in most)

### Dependencies

Needs owner input for every factual claim — this is content, not code.

### Risks

The honesty constraint is a real asset; do not let "stronger outcomes" become invented
ones.

### Related Issues

`ISSUE-024`.

### Possible Milestone

`MILESTONE-004`.


---

<a id="suggestion-015"></a>

## SUGGESTION-015 — Add a validation harness

Status: **Partially implemented** (SESSION-021 moved the harness into the repo) — 2 of 4
Priority: Low
Impact: Medium
Effort: Small

### Problem / Opportunity

There are no tests, no CI, and no automated check of any kind beyond `tsc` and ESLint run
by hand. `ISSUE-001` — content invisible on a common navigation path — is exactly the
class of bug a smoke test would have caught.

### Recommendation

Proportionate to a portfolio site, in priority order:

1. **CI:** a GitHub Actions workflow running `npm ci && npm run lint && npm run build` on
   push.
2. **Route smoke test:** visiting all ~36 routes, asserting a 200, an `<h1>`, no console
   errors, and — critically — that content is visible after a same-route navigation
   (`ISSUE-001`).

   SESSION-002 built exactly this check throwaway, driving headless Chrome over the
   DevTools Protocol with Node's built-in `WebSocket` — no dependency, ~90 lines. It
   caught three defects that code reading had missed. Playwright is still the better
   long-term answer, but the cheap version is worth knowing about: this suggestion does
   not have to wait for a dependency decision.
3. **Link check:** assert every internal `<Link to>` resolves to a registered route, and
   every `image` / `heroImage.src` string points at a file that exists in `public/images/`.
4. **Lighthouse budget** on the homepage and one case study.

Skip unit tests — this codebase is presentational and they would not pay for themselves.

### Why

Cheap insurance for a site that will be edited by many short sessions.

### Relevant Files

- `package.json`, new `.github/workflows/ci.yml`, new `tests/`

### Dependencies

The link checker is most useful once real images land (`MILESTONE-005`).

### Risks

None; keep it small enough that it never becomes the thing being maintained.

### Related Issues

`ISSUE-001`, `ISSUE-006`.

### Possible Milestone

`MILESTONE-008`.

### Where it stands (reviewed SESSION-025)

2. **Route smoke test** — done, and then some. `npm run verify` is `scripts/verify/run.mjs`
   plus a static server with GitHub Pages semantics: 36 routes asserted for 200, title and
   `hreflang`; every image on every route at dpr 1, 2 and 3 checked for broken, missing `alt`
   and **failed requests**; axe across all routes; horizontal overflow; stuck reveals; reduced
   motion; and page weight. It is the CDP-over-`WebSocket` approach this file predicted, with
   no dependency — and SESSION-021 moved it into the repository so it stops being rebuilt from
   prose every session (`docs/reference/handbook.md`).
3. **Link check** — partly. Image sources are covered from two directions:
   `image-variants.mjs --check` fails the build on a stale variant map, and the image sweep
   catches a `srcset` candidate that 404s. What is *not* checked statically is that every
   internal `<Link to>` resolves to a registered route.

**Still open:**

1. **CI** — there is no GitHub Actions workflow. Everything is run by hand.
4. **Lighthouse budget** — not run. The weight check covers the imagery half of what it would
   have told us, and nothing else.

Both remaining items assume the repository is pushed, and it is not: the branch is forty-odd
commits ahead of `main` and unpushed by the owner's choice. CI on a branch nobody fetches
would be theatre.


---

<a id="suggestion-016"></a>

## SUGGESTION-016 — Decide and configure deployment

Status: **Mostly implemented** — the owner configured GitHub Pages (`ISSUE-025`); the domain and preview items remain
Priority: Low
Impact: Medium
Effort: Small

### Problem / Opportunity

The repository hints at two hosts and configures neither (`ISSUE-025`), and the résumé
still points visitors to a separate Adobe Portfolio site
(`alexshamaharjan.myportfolio.com`).

### Recommendation

1. Ask the owner: which host, which domain, and does this replace the Adobe Portfolio site?
2. Configure that host (`netlify.toml` **or** a Pages workflow — not both), remove the
   unused fallback, and add the deploy step to CI.
3. Update `resume.portfolio` / `portfolioHref` in both dictionaries once a domain exists.
4. Add a preview-deploy per branch if the host supports it — useful for showing the owner
   design changes before merging.
5. Document the deploy command in `docs/project_overview.md`.

Netlify is the better fit: `_redirects` already exists, SPA rewrites are native, and
preview deploys come free. GitHub Pages needs the `404.html` hack the build script
already performs and has no rewrite support.

### Why

Nothing else in the roadmap matters if the site is not reachable.

### Relevant Files

- `package.json`, `public/_redirects`, `src/lib/dictionaries/{en,de}.ts`

### Dependencies

Owner decision required.

### Risks

Prerendering (`SUGGESTION-013`) changes what gets deployed — settle the host first.

### Related Issues

`ISSUE-025`, `ISSUE-013`.

### Possible Milestone

`MILESTONE-008`.

### Where it stands (reviewed SESSION-025)

1. **Which host** — decided by the owner, and **not** the recommendation below. This file
   argued for Netlify; the owner chose **GitHub Pages** and configured it themselves
   (`ISSUE-025`, commits `f8df707`/`7332ad8`/`11930a6`). `npm run deploy` publishes via
   `gh-pages`, and `predeploy` gates it behind the variant-map check, the build and the
   prerender.
2. **Configure that host** — done. The `404.html` copy this file called a "hack" is one line in
   the build script, and `scripts/verify/serve.mjs` reproduces the same resolution order
   locally so the fallback is actually tested rather than assumed.
3. **Update `resume.portfolio` / `portfolioHref`** — **still open**; there is no domain yet.
4. **Preview deploys per branch** — **still open**, and it needs CI (`SUGGESTION-015`).
5. **Document the deploy command** — done: `docs/reference/handbook.md`.

Recorded here rather than silently closed because the file recommends Netlify and the project
went the other way. The reasoning above was not wrong, it was outvoted by the person who has
to run it.


---

<a id="suggestion-017"></a>

## SUGGESTION-017 — A lone narrow figure should not take the full reading column

Status: **Implemented** (SESSION-023), then **superseded by `DECISION-019`** (SESSION-027)
Priority: Low
Impact: Medium
Effort: Small

### Problem / Opportunity

`SectionMedia` groups a section's figures into runs. A figure whose aspect is 1.5 or wider is
"wide" and gets the full 960px reading column on its own; narrower figures pack two, three or
four across. There is no third case, so **a narrow figure that happens to sit alone in its
run also gets the full column** — `columnsFor(1)` returns no grid classes and the single
child fills the row.

For a 4/3 that is 720px tall and unremarkable. The taller the figure, the worse it gets, and
it is silent: nothing errors, the page just grows.

Measured on the real pages:

| Figure | Aspect | Rendered at 960px |
| --- | --- | --- |
| `wikimind-colour-type` | 6/5 | 800px tall |
| `wikimind-logo-variants` | 4/3 | 720px tall |
| AFONO's social layout system, at its true proportions | 3/5 | **1700px tall** |

SESSION-020 hit the last one and worked around it in the content: it cropped four of the
grid's five rows so the figure is 3/4 rather than 3/5, which brings it to 1280px. That is a
real crop decision, not a fudge — but it was *forced by the layout*, and the next portrait
figure will force another one.

### Recommendation

Give a run of one narrow figure a width ceiling derived from its aspect, so no figure exceeds
a sensible height — something like 720–800px, which is what the existing narrow figures
already land at.

```
lone narrow figure  →  width = min(columnWidth, maxHeight × aspectRatio), centred
```

A 4/3 and a 6/5 are unaffected at a 800px ceiling; a 3/4 renders at 600px wide instead of
960; a 3/5 at 480. Then update the `sizes` string for that case, or the browser will keep
downloading the column-width variant for a figure that is displayed at half of it.

### Why

Three reasons, in order of how much they matter:

1. **It removes a constraint from the content.** Right now the crop has to be chosen partly
   to work around the layout, which is backwards — 47 section figures are still to be
   imported and some of them will be portrait.
2. **It is a weight bug as much as a layout one.** `COLUMN` tells the browser the figure is
   960px wide; a tall figure served at 960 when it should be 600 is roughly 2.5x the pixels.
3. A 1700px-tall figure in a column of 700px-tall ones does not read as emphasis, it reads
   as a mistake.

### Risks

It changes the appearance of two WikiMind figures that are currently full-column. Both are
close to square, so a ceiling around 800px leaves them alone — but the number should be
chosen by looking at the pages, not picked here.

`DECISION-017` settled case-study layout deliberately and recently. This is a refinement
inside it, not a reopening of it, and it should be verified the same way: the 1440/390 ×
motion-on/off journeys, and the reveal ring.

### Hit again, SESSION-021

Sync FM's `[ components ]` figure — four navigation cards, naturally 778×877 in the source —
was cut at 1/1 and rendered **960×960**, blowing the cards up to roughly three times their
size in the app. Same cause, same workaround: crop to a wider aspect (back to the declared
4/3, 960×720) until the height is reasonable.

That is twice in two sessions, and the workaround is getting less honest each time. The crop
is now being chosen by what the layout will do with it rather than by what the figure is,
which is backwards. Two of Sync FM's five figures in that section had their aspect decided
this way.

**The remaining three case studies will hit it too** — the kitchen and QIS both have portrait
figures in their manifests. Worth fixing before them rather than after.


### Implemented, SESSION-023

`SectionMedia` now gives a run of one narrow figure a width of
`min(960, 800 × aspect)`, centred, with a `sizes` string that follows the cap.
`MAX_FIGURE_HEIGHT` is 800px, the number this file proposed.

What it changed on the pages, measured:

| Figure | Was | Now |
| --- | --- | --- |
| `wikimind-initial-sketches` (1200/1805) | 960×1444, fetching the 960 variant | **532×800**, fetching the 640 |
| `wikimind-wireframes` (1400/1311) | — (new figure) | 854×800 |
| `wikimind-components` (1400/1369) | 960×939 | 818×800 |
| `wikimind-mascot` (1600/1317), `wikimind-moodboard` (1400/1153) | 960 | unchanged — a 1.2 aspect wants 972px and the ceiling never bites |

The prediction that near-square figures would be untouched held exactly. The
`sizes` warning in this file was worth heeding: the capped figures were verified
by reading `currentSrc` off the built page rather than by assuming, and the
sketch page does drop a rung.

**The constraint it removes is the point.** Two crops in SESSION-020 and
SESSION-021 were chosen to work around this rather than to suit the artwork. The
kitchen and QIS both have portrait figures still to import, and they can now be
cut at their own proportions.

### Superseded, SESSION-027

The ceiling was the right instinct on the wrong axis.

Capping a lone figure's *width* at `800 × aspect` gave a different bespoke width to every aspect
— nine of them across the site — and did nothing at all for rows, which is where the raggedness
actually lived. AFONO's collection row held a 0.375 cart drawer, a 0.545 product page and a 4/3
checkout: at equal widths those are 819px, 563px and 230px tall.

`DECISION-019` inverts it. **Height is the governing dimension** — 640px for everything — and
width follows from each figure's own aspect, so a row can be justified and every figure in it
shares one height. Wide figures are unaffected: anything 1.5 or wider fits its full 960px inside
640px of height, so the rule turns out to be uniform rather than special-cased.

The constraint this file was written to remove is still removed, and now for rows too.

