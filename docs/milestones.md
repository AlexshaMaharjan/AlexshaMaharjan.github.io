# Milestones

The roadmap. One section per milestone.

**`MILESTONE-014` is the live one** (SESSION-044). It is the owner's fifth pass and the
first one that is mostly *undoing*: the playground's category data, which had outlived two
redesigns, is gone, and `MILESTONE-013`'s big-type footer lasted exactly one session.

**`MILESTONE-013`** (SESSION-043). `MILESTONE-010` to `MILESTONE-012` are
the owner's first three passes over the whole site and are complete; this is the fourth, and
the largest — ten numbered requests, of which one arrived as a **redesigned Figma frame**
(`Process`, node `310:736`) that had to be read and implemented rather than described.

One of the ten is finished but not *applied*: the caption review is a published page the
owner is filling in, and their wording comes back into the repository in the next session.

`MILESTONE-001` (SESSION-002) and `MILESTONE-003` (SESSION-003 content model, SESSION-004
layout) are complete. The rest of the older roadmap remains as proposed.

Ordering rationale: repair what is broken → fix the two worst-reading surfaces (homepage
work section, case studies) → content and imagery → motion → consistency → ship.

| ID | Title | Status | Priority | Depends on | Addresses | File |
| --- | --- | --- | --- | --- | --- | --- |
| MILESTONE-001 | Stabilize the current implementation | **Complete** | Critical | — | ISSUE-001/002/003/017/018/022 — all resolved | [#milestone-001](#milestone-001) |
| MILESTONE-002 | Rebuild homepage "Selected Work" | **Complete** (SESSION-025) — eleven tiles with real images, `!important` gone, verified at six widths; two tasks superseded by `DECISION-010` | High | M-001, ~~DECISION-010~~ answered | ISSUE-005 ✅, ISSUE-004 ✅, ISSUE-010 ✅ | [#milestone-002](#milestone-002) |
| MILESTONE-003 | Case-study layout and content model | **Complete** | High | M-001 | ISSUE-024 ✅, ISSUE-008 ✅, ISSUE-007 (case studies ✅) | [#milestone-003](#milestone-003) |
| MILESTONE-004 | English content pass | Proposed — **unblocked** | High | M-003 model ✅, owner | ISSUE-024 ✅ | [#milestone-004](#milestone-004) |
| MILESTONE-005 | Real imagery | **In progress** — 48 of 136 slots filled; WikiMind, AFONO and Sync FM done end to end | High | owner's time, not owner's assets | ISSUE-007 ✅, ISSUE-006 mostly | [#milestone-005](#milestone-005) |
| MILESTONE-006 | Motion system and interaction polish | **Complete** | Medium | M-001, M-002/003 | ISSUE-012/020 ✅, ISSUE-019 (deliberately not done) | [#milestone-006](#milestone-006) |
| MILESTONE-007 | Consistency, responsive, accessibility | **Complete** bar `ISSUE-010`, which waits on the owner's images | Medium | M-002/003/006 | ISSUE-011/015/016/021/023/026/027/028/029/030 ✅, ISSUE-010 | [#milestone-007](#milestone-007) |
| MILESTONE-008 | Performance, SEO, deployment | **Complete** bar the owner's `og:image` | Medium | content near-final, owner | ISSUE-013/014/019/025 ✅ | [#milestone-008](#milestone-008) |
| MILESTONE-009 | German parity | Proposed | Medium | M-004 | ISSUE-009 | [#milestone-009](#milestone-009) |
| MILESTONE-010 | The owner's pass over the whole site | **Complete** | High | all 15; the four gates answered 2026-09-11 | ISSUE-041…046, DECISION-028…031, 033, 034 | [#milestone-010](#milestone-010) |
| MILESTONE-011 | The owner's second pass: process, playground, responsive | **Complete** bar one still-life asset | High | M-010 | ISSUE-048…051 ✅, ISSUE-052, DECISION-035…038 | [#milestone-011](#milestone-011) |
| MILESTONE-014 | The owner's fifth pass: the captions applied, the categories deleted, a stepping viewer | **Complete** | High | M-013 | ISSUE-057 ✅, ISSUE-058, DECISION-047…050 | [#milestone-014](#milestone-014) |
| MILESTONE-013 | The owner's fourth pass: the Figma process redesign, the mobile header, the footer, the legal pages | **Complete** bar the captions the owner is reviewing | High | M-012 | ISSUE-054 ✅, ISSUE-055, ISSUE-056, DECISION-042…046 | [#milestone-013](#milestone-013) |
| MILESTONE-012 | The owner's third pass: the Figma annotations, the map's bottom row, the hero's two calls to action | **Complete** | High | M-011 | ISSUE-053, DECISION-039…041 | [#milestone-012](#milestone-012) |

### Completed

**MILESTONE-006** (SESSION-011 + SESSION-012) — the motion work. One vocabulary in
`src/lib/motion.ts` that the reveals, the page transition and the CSS transitions all read
from; reveal variants including staggered grids; a 350ms fade on route change; a loading
state for lazy pages; the process canvas idling when off screen; and three scroll-linked
effects — hero drift, figure reveals, velocity-linked marquees. Every one of them is a
no-op under `prefers-reduced-motion`, verified rather than assumed.

**MILESTONE-003** (SESSION-003 + SESSION-004) — the case studies. Part one replaced
`body: string[]` with a block model and migrated all six studies in both locales
(`ISSUE-024`, `ISSUE-008`, and the case-study half of `ISSUE-007`). Part two laid them
out: a 680px text measure against three media widths, three distinct set pieces, a
contents rail that tracks the reading position, and a closing band. Both halves verified
in a browser against the production build.

**MILESTONE-001** (SESSION-002). All six issues resolved and verified in a browser against
the production build. Navigation is now correct: reveals re-run on same-route navigation,
every hash link lands on its section from any starting route, route changes start at the
top, and back/forward restores position. See [#milestone-001](#milestone-001) for the before/after
measurements.

### The owner's decisions, answered 2026-08-24

`DECISION-010` (keep the bento), `DECISION-006` (almost every placeholder becomes a real
image) and `DECISION-012` (point the résumé here, not at Adobe Portfolio) are all settled.
Nothing on the roadmap is blocked on a decision any more — only on **images** and on the
owner's **participation in the copy pass**.

### Recommended next milestone

**`MILESTONE-010` is done, and with it the last defect on the tracker.** SESSION-039 finished
the eleven tasks that needed nobody; SESSION-040 closed the four gates the day the owner
answered them, along with `ISSUE-043`, `ISSUE-044` and `ISSUE-045`.

**What is left is the imagery, and it always was.** See the older recommendation below, which
is now simply the recommendation: the designed `og:image` (`ISSUE-006`), and `ISSUE-033`'s
untried experiment on the variant ladder's quality for `/work/afono`, which is 2141 KB on a
3x phone.

## The older recommendation, still true underneath

**`MILESTONE-005` and `MILESTONE-002` together — the images.** SESSION-015 changed the
picture here: this work was recorded for months as "blocked on owner-supplied assets", and it
was not. The six case studies were written from six project documentations, and those
documents hold most of the 129 missing images. `docs/reference/image_sources.md` maps
document to project to slot, and `scripts/pdf-page.js` gets a page out without adding a
dependency.

Start with the eleven bento tiles: the homepage is where a visitor decides to stay, and it is
eleven grey rectangles. Then the six case-study heroes, then `og:image` — one file that
currently makes every shared link a blank rectangle.

`MILESTONE-004` (the English content pass) is the alternative and still needs the owner in
the room, since `DECISION-011` forbids inventing anything to fill a gap. Every engineering
milestone that needs nobody is finished.

### How the owner's stated priorities map

| Owner's words | Milestone |
| --- | --- |
| "case study description pages layout should be improved" | M-003 |
| "in all the placeholder, the images must be correct" | M-005 (model work starts in M-003) |
| "content of the text must be humanized … redundant text removed" | M-004 |
| "interactive animations, scroll animations, gsap animation" | M-006 |
| "design should be consistent overall" | M-007 (and M-002 for the homepage) |

### Blocked on the owner

- `DECISION-010` — keep the bento grid direction? (blocks M-002)
- `DECISION-006` — which placeholders stay stylised? (affects M-005)
- `DECISION-012` — which host and domain? (blocks M-008)
- Real image exports (blocks M-005)
- Participation in the content pass (blocks M-004)


---

<a id="milestone-001"></a>

## MILESTONE-001 — Stabilize the current implementation

Status: **Complete** (SESSION-002, 2026-08-22)
Priority: Critical
Goal: Fix the navigation defects that make parts of the site unusable, and put the
uncommitted work on a safe footing — before any redesign begins.

### Why This Milestone Exists

Three navigation bugs currently break real journeys: clicking "Next project" on a case
study leaves the new page's content invisible; every `#work` / `#about` / `#contact` link
from another page lands at the top of the homepage; and new pages open at whatever scroll
position the previous one had. None of the redesign work is worth doing on top of that,
and the fixes are small and low-risk.

At the same time, roughly a session's worth of work exists only in the working tree with
no commit to fall back to.

### Scope

Navigation correctness, repository hygiene. **No visual redesign, no content edits.**

### Tasks

- [x] Re-check `git status` — the snapshot in `ISSUE-017` is dated 2026-08-22
      → **stale**: the tree was clean, the work was already committed in `cc6e1c8`
- [x] Add `.next/` to `.gitignore` → already present as `/.next`; deleted `.next/`,
      `tsconfig.tsbuildinfo` and the empty, never-tracked `NewHomePage/`
- [x] Commit the existing work in coherent pieces → already done in `cc6e1c8`
- [x] **ISSUE-001** — `useScrollReveals` re-runs on pathname change; the `[data-inview]`
      at-rest state moved from CSS into a layout effect and now fails safe
- [x] **ISSUE-002** — hash scrolling in `RootLayout` via `useScrollBehavior`, honouring
      reduced motion, the header offset, and the Suspense boundary
- [x] **ISSUE-003** — scroll reset and back/forward restoration in the same hook, so the
      two cannot fight
- [x] **ISSUE-022** — verified: `/contact` and `/de/contact` land on the contact section
- [x] Manually walk the journeys — done in headless Chrome over CDP rather than by hand,
      so the results are numbers rather than impressions (see Outcome)
- [x] `npm run lint && npm run build` green — 0 errors, the same 3 pre-existing warnings

### Relevant Issues

`ISSUE-001` (Critical), `ISSUE-002`, `ISSUE-003`, `ISSUE-017`, `ISSUE-018`, `ISSUE-022`

### Relevant Suggestions

None — this milestone is repair only. The `ISSUE-001` fix should anticipate
`SUGGESTION-006` but must not wait for it.

### Relevant Decisions

`DECISION-001` (the migration that caused 002/003), `DECISION-008` (the reveal design that
caused 001)

### Relevant Code

- `src/lib/useScrollReveals.ts`, `src/index.css`
- `src/components/RootLayout.tsx`, `src/routes.tsx`, `src/main.tsx`
- `src/pages/Contact.tsx`
- `.gitignore`

### Dependencies

None. This is the entry point.

### Completion Criteria

- Navigating between two case studies shows fully visible, animated content.
- Every hash link scrolls to its target from any starting route.
- Every route change starts at the top; browser back restores position.
- Build and lint green; work committed; no Next.js artefacts remain.

### Out of Scope

The bento grid, imagery, copy, the motion system, design tokens.

### Notes

`ISSUE-001` was found by code reading, not in a browser. **Reproduce it first** — confirm
the sections really are invisible — so the fix can be verified rather than assumed.

### Outcome

Two commits on `milestone-001-stabilize`: `65f2b2d` (navigation) and `92b63f4` (reveals).
Both new hooks live in `src/lib/`; `RootLayout` gained one call; `index.css` lost the
`[data-inview]` rules.

Everything was verified in headless Chrome driven over the DevTools Protocol, against the
**production build**, at 1440px and 390px, in both locales, with and without
`prefers-reduced-motion`.

| Journey | Before | After |
| --- | --- | --- |
| Six `Next project` hops around the ring | 1–2 whole sections permanently invisible per hop; arrived 8000–9500px down | every hop arrives at `scrollY 0`, 0 sections invisible after a full scroll |
| `/about` → header "Projects" | stayed at 1200px, `#work` 1320px away | `#work` at 104px |
| Homepage → header "Contact" | nothing happened | `#contact` at 104px |
| `/work/qis-portal` (6000px) → `/playground` | landed at 4466px | `scrollY 0` |
| `/about` (1500px) → `/resume` → back | never moved | `/resume` at 0; back restores 1500px |
| Cold load `/#work`, `/#contact`, `/de/#about` | no scroll at all | target at 104px |
| `/contact` | top of the homepage | `#contact` at 104px |
| `prefers-reduced-motion` | — | nothing ever hidden; every landing still correct |

Three things the issue documents had wrong or did not anticipate, all found by testing
rather than reading:

1. `ISSUE-001`'s reach was different from the prediction — reused DOM nodes kept the
   outgoing page's revealed state, so the damage was 1–2 orphaned sections per hop rather
   than a blank page, and it accumulated as you walked the ring.
2. `ISSUE-002` claimed same-page hash clicks still worked natively. They did not: the
   header uses `<Link>`, so a same-page click is a `pushState`.
3. `scrollTo`'s `"auto"` means *defer to the CSS*, not "instant". With
   `html { scroll-behavior: smooth }` in `index.css` this silently broke the fix for
   `ISSUE-001` as well, by leaving the scroll in flight while GSAP measured the page.

`ISSUE-015` was measured while verifying `ISSUE-002` and is now confirmed with numbers
(146px mobile header vs a 104px offset — 42px of overlap). It was deliberately **not**
fixed here: this milestone excluded the design system. It stays with `MILESTONE-007`.

`DECISION-013` records why react-router's `<ScrollRestoration />` was rejected.


---

<a id="milestone-002"></a>

## MILESTONE-002 — Rebuild the homepage "Selected Work" section

Status: **Complete** (SESSION-025). `DECISION-010` answered 2026-08-24 (keep the bento);
`ISSUE-005` fixed SESSION-008; all eleven tiles carry real images since SESSION-016; the
`!important` override removed and the grid verified at six widths in SESSION-025.
**Two of the original tasks were superseded by `DECISION-010` rather than done** — see below.
Priority: High
Goal: Make the homepage's central section present six projects, once each, with real
imagery and enough copy to earn a click — in both languages.

### Why This Milestone Exists

This section is where a visitor decides whether to read further. Today it is eleven flat
grey tiles, five projects listed twice, no images, no descriptions, and English text on
the German site. It is also unfinished, uncommitted work whose direction the owner has not
confirmed.

### Scope

`SelectedWork` / `BentoGrid` and the `ProjectCopy` data behind them. Homepage only.

### Tasks

- [x] **Get the owner's decision on `DECISION-010`** — answered 2026-08-24: keep the bento
- [~] ~~Rebuild the section from `dictionary.projects`: one entry per project~~ —
      **superseded by `DECISION-010`**, which kept the eleven-tile wall on purpose: "five of
      six projects appear twice under different category labels. With images that reads as a
      portfolio of work rather than a duplicate list, so it stays"
- [x] **Wire real tile imagery** — all eleven done in SESSION-016 from the six project
      documentations. Each is cropped, darkened, desaturated and tinted with its own
      project's colour, and each is *measured* against the contrast ceiling by
      `scripts/image-treat.mjs`, which fails the run if a tile is too bright
- [~] ~~Restore visible headline / description / tags / role / year at an appropriate
      density~~ — **superseded by `DECISION-010`**, which specifies a category label and a
      title over the image and nothing else. Adding four more fields to eleven tiles would
      undo the composition the owner approved. The copy is kept in the data for a future
      `/work` index (`SUGGESTION-014`); see `ISSUE-010`
- [x] **ISSUE-005** — every string from the dictionary; `/de` verified in Chrome
- [x] Give tiles a hover/focus treatment consistent with the rest of the site — hover moves
      the background and scales the image 1.03; focus uses the site-wide `:focus-visible`
      ring from `index.css`, which the tile inherits rather than redefining
- [x] Responsive check at 375 / 768 / 1024 / 1440 **and at the 880/881 boundary itself**;
      the `!important` override is gone (SESSION-025)
- [x] Confirm which `ProjectCopy` fields are live again and update `ISSUE-010` — five are
      live, four were removed, four are kept for `SUGGESTION-014`. `ISSUE-010` is resolved

### Relevant Issues

`ISSUE-004`, `ISSUE-005`, `ISSUE-006` (dependency), `ISSUE-010`

### Relevant Suggestions

`SUGGESTION-001`

### Relevant Decisions

`DECISION-010` (must be resolved first), `DECISION-009`, `DECISION-002`

### Relevant Code

- `src/components/SelectedWork.tsx`, `src/components/BentoGrid.tsx`
- `git show HEAD:src/components/ProjectEntry.tsx`
- `src/lib/dictionaries/{en,de}.ts` → `projects[]`, `selectedWork`
- `src/index.css` (`[data-el="bento"]`), `design-reference/SPEC.md` §4, §6

### Dependencies

`MILESTONE-001` (a stable base). Real hero images (`ISSUE-006`) for the section to look
finished — the work can proceed with stand-ins.

### Completion Criteria

- ~~Six projects, each appearing exactly once, each with an image.~~ **Superseded** — eleven
  tiles, all with images, five projects appearing twice by the owner's decision.
- [x] German homepage fully German — `ISSUE-005`, verified in Chrome.
- [x] No dead `ProjectCopy` fields left unaccounted for — `ISSUE-010`.
- [x] Owner has seen and approved the direction — `DECISION-010`, 2026-08-24.

### How the `!important` came out (SESSION-025)

The override existed because the grid was defined as inline `style` on the component, and no
stylesheet rule can outrank a `style` attribute. Both the container styles and the per-tile
placement moved into `index.css`; the placement, which is per-tile data, arrives as a custom
property (`--bento-area`) that a stylesheet rule then consumes. **A variable set inline can be
used by a rule, and that rule can be overridden by a later one** — which is what lets the
phone layout win on ordinary cascade order.

Verified at 375 / 768 / **880 / 881** / 1024 / 1440 against the production build. The
boundary is the part worth checking, and it behaves exactly as before: 1 column capped at
520px below it, 10 columns capped at 1120px above it, 11 tiles and no horizontal overflow at
any width.

### Out of Scope

Case-study pages, a `/work` index page (`SUGGESTION-014`), the wider design-system sweep.

### Notes

Tile 8 (AFONO — Graphic) renders at 224×322 and exports at 400px: it needs a detail crop, not
a page screenshot. Several projects appear on two tiles under different categories — those
two images have to be visibly different work, or the wall reads as padding.


Do not delete `BentoGrid` before the owner has decided — the asymmetric composition may be
exactly what they want, just with images in it.


---

<a id="milestone-003"></a>

## MILESTONE-003 — Case-study layout and content model

Status: **Complete** — content model (SESSION-003) and layout (SESSION-004)
Priority: High
Goal: Turn the six case studies from uniform columns of paragraphs into readable
editorial pieces — the owner's first-named priority.

### Why This Milestone Exists

Six long-form case studies are the substance of this portfolio, and they are currently the
weakest-reading part of it: a 960px column of identical 18px paragraphs, punctuated by
hatched boxes, running eight or nine sections. The root cause is structural, not
cosmetic — `body: string[]` cannot express a sub-heading or a list, so sub-headings are
being stored as paragraphs and rendered as body text.

### Scope

The case-study template and the section content model. Layout and structure — **not** the
prose itself (that is `MILESTONE-004`).

### Tasks

Part one — content model (SESSION-003, `e844ad9`):

- [x] **ISSUE-024 / SUGGESTION-004** — block union, bare strings still accepted as
      paragraph shorthand. Shipped as `p` | `h3` | `list` | `quote` | `note` | `figure`;
      `note` was added for the disclosure and stats lines (`DECISION-014`)
- [x] Update `Section.tsx` to render each block kind distinctly
- [x] **SUGGESTION-002** — optional `src`/`alt` on `SectionImage`, plus a `<Figure>` that
      falls back to the hatched placeholder
- [x] Migrate the six data files — done in one pass, both locales together, since only the
      shape changed and no wording did
- [x] **ISSUE-008** — one render path for all sections; the first keeps its number, label,
      reveal and its own anchor id
- [x] Regenerate `CONTENT_GUIDE.md` §5 — now generated from the data by
      `scripts/content-guide-case-studies.mjs`, and complete for all six studies rather
      than only WikiMind
- [x] Verify at 375 / 768 / 1024 / 1440, both locales, reduced motion on and off

Part two — layout (SESSION-004, `4e4b5f7`):

- [x] **SUGGESTION-003** — varied media widths: text at a 680px measure, wide images at
      the full 960px column, narrower ones in a 2- or 3-up grid. Viewport-wide full-bleed
      was rejected — it collides with the sticky rail (`DECISION-014`)
- [x] Differentiated treatments: tinted accent panel for the design question, numbered
      white cards for insights, a numbered row under accent rules for testing steps
- [x] A stronger ending — the closing section leaves the reading column for its own
      tinted band, heading beside text
- [x] Active-section tracking and progress in `ContentsNav`
- [x] Fix the squeezed reading column — the rail now appears at 1280px rather than 768px;
      below that the collapsible list takes over and names the current section
- [x] Re-verify at 375 / 768 / 1024 / 1280 / 1440, both locales, reduced motion on and off

### Relevant Issues

`ISSUE-024`, `ISSUE-008`, `ISSUE-007`

### Relevant Suggestions

`SUGGESTION-003`, `SUGGESTION-004`, `SUGGESTION-002`

### Relevant Decisions

`DECISION-003`, `DECISION-006`, `DECISION-009` (a knowing departure from SPEC §9 — record
it as a new decision)

### Relevant Code

- `src/components/case-study/*` (all six files)
- `src/lib/caseStudies/types.ts` + the six data files
- `src/components/PlaceholderImage.tsx`, `src/components/ui/Image.tsx`
- `CONTENT_GUIDE.md` §5

### Dependencies

`MILESTONE-001`. Independent of `MILESTONE-002` — could run in parallel if preferred.

### Completion Criteria

- ✅ A case study reads with visible rhythm and hierarchy at every viewport. Three media
  scales against one text measure, three distinct set pieces, and a closing spread.
- ✅ Sub-headings and lists render as sub-headings and lists in all six studies, both
  locales. Measured in the browser: 38 sub-headings, 22 lists, 8 notes, both locales
  structurally identical.
- ✅ Figures can carry real images; captions read as captions, not `[ bracketed labels ]`
  — where a real image exists. Placeholders deliberately keep the bracketed label and no
  caption (`DECISION-014`).
- ✅ `CONTENT_GUIDE.md` matches the new structure, and is now generated from it.

### Out of Scope

Rewriting the prose (`MILESTONE-004`); supplying photographs (`MILESTONE-005`);
scroll-linked animation (`MILESTONE-006`).

### Notes

The German blocks must migrate alongside the English ones or the build breaks — the union
type applies to both. This is the largest structural change in the roadmap; consider
splitting it across two sessions (model first, layout second).

**Split as suggested.** SESSION-003 took the content model, SESSION-004 the layout.

What SESSION-004 found on the way: aiming a hash landing at an element's *rendered* box
races the scroll reveal, which translates sections down 18px until they play. The landing
came up short by whatever was left of the tween — invisible until this layout shifted the
timing. `useScrollBehavior` now aims at the layout position instead, which removed the
whole class of error (`DECISION-014`, `ISSUE-027` for the one path that still bypasses the
hook).

What remains for the case studies, and belongs to other milestones: real photographs
(`MILESTONE-005` — the mechanism is ready, the files are not), the copy pass
(`MILESTONE-004`), and scroll-linked motion (`MILESTONE-006`).


---

<a id="milestone-004"></a>

## MILESTONE-004 — English content pass

Status: Proposed — **unblocked** since SESSION-003 (the block model landed)
Priority: High
Goal: Make the writing sound like a person talking about their work — and remove what does
not earn its place.

### Why This Milestone Exists

The owner's third stated priority: humanised, well-written text with redundancy removed.
The current copy is honest and thorough but uniformly formal and passive, with real
duplication — WikiMind's `overview` and `challenge` sections make the same argument twice
in a row. Sentence length barely varies, which flattens emphasis across nine sections.

`ROADMAP.md` Phase 1 already sets the right process and order.

### Scope

English prose across case studies, About, Playground and homepage. German follows in
`MILESTONE-009`.

### Tasks

Per `ROADMAP.md` Phase 1 order, one at a time, asking the owner what actually happened and
drafting from their answers:

- [ ] Home — hero heading + intro
- [ ] About — biography, focus, tools, AI blurb
- [ ] Case study: WikiMind
- [ ] Case study: AFONO
- [ ] Case study: Sync FM
- [ ] Case study: Barrier-Free Kitchen
- [ ] Case study: Surugami
- [ ] Case study: QIS Portal
- [ ] Playground — home intro + six category blurbs

For each: cut duplicated argument across sections; vary sentence length; lead with
something concrete; move from "an analysis was conducted" to "I compared eleven sites and
found…"; restructure into the block model from `MILESTONE-003`.

- [ ] **SUGGESTION-014** — add a real outcome line to each case study, state what she is
      looking for in the contact section
- [ ] Update `CONTENT_GUIDE.md` to match

### Relevant Issues

`ISSUE-024`

### Relevant Suggestions

`SUGGESTION-005`, `SUGGESTION-014`

### Relevant Decisions

`DECISION-011` — **the honesty constraint is absolute.** Every factual claim must survive
the pass unchanged. "More compelling" must never become "less true".

### Relevant Code

- All six `src/lib/caseStudies/*.ts` (EN blocks)
- `src/lib/dictionaries/en.ts`, `src/lib/playground/home.ts`, `categories/*.ts`
- `CONTENT_GUIDE.md`

### Dependencies

`MILESTONE-003` should land first so the writing can use sub-headings and lists.
Requires the owner's participation — this cannot be done alone.

### Completion Criteria

- No two sections make the same point.
- Each case study opens with something concrete and specific.
- Every factual claim traceable to what actually happened; collaborators still credited.
- Owner has read and accepted each page.

### Out of Scope

German (`MILESTONE-009`); résumé copy (already real, per `ROADMAP.md`).

### Notes

Résumé content was completed in an earlier session and should not be rewritten.


---

<a id="milestone-005"></a>

## MILESTONE-005 — Real imagery

Status: **In progress** (2026-08-25) — 42 of 136 slots filled, up from 7 before SESSION-016.
The mechanism was finished on 2026-08-24; SESSION-015 found that most of the missing images
already exist inside the owner's six project documentations, and two of the six have now been
imported end to end. See `docs/reference/image_sources.md`.
Priority: High
Goal: Replace stand-ins and placeholders with the owner's actual work.

### Why This Milestone Exists

The owner's second stated priority: "in all the placeholders, the images must be correct".
Two problems sat behind it — five wired-up files are flat colour blocks, and ~115 further
slots had no way to hold an image at all. The second is fixed; every slot can hold one now.

**This milestone was described for months as "blocked on owner-supplied assets". That was
wrong.** The six case studies were written *from* six project documentations — 330 pages
totalling 673 MB, in `../../ProjectsDokus/` — and those documents contain the personas,
sitemaps, wireframes, logo sheets and final screens the slots are asking for. The blocker was
never the assets. It was that nobody had looked in the documents.

### Scope

The image data model, the asset pipeline, and importing the owner's exports.

### Tasks

Order matters here: the pipeline comes before the import, and the provenance check comes
before every export.

- [x] **SUGGESTION-002 / ISSUE-007** — optional `src`/`alt` on `SectionImage`,
      `PlaygroundItem` and `carouselItems`, with a shared `<Figure>` falling back to
      `PlaceholderImage`. Done in `MILESTONE-003`
- [x] **Locate the source material** — six documentations mapped to six projects, with a
      renderer that needs no dependency (`scripts/pdf-page.js`). SESSION-015
- [ ] **`DECISION-016` on every export** — read the document's sources page first. Surugami's
      cites Freepik and Pinterest for five pages; those may not ship. AFONO's turned out to
      name three borrowed mockup templates the summary in `image_sources.md` had compressed
      away (`DECISION-016` Amendment 1) — **re-read the page, not the row**
- [x] **SUGGESTION-012** — the responsive pipeline is in (SESSION-019), and **without**
      moving anything out of `public/images/`: `scripts/image-variants.mjs` writes width
      variants beside the originals and `ui/Image` builds the `srcset` from a generated map.
      No new dependency. `predeploy` refuses to build on a stale map
- [x] **The eleven bento tiles and the six case-study heroes** — filled from the
      documentations in SESSION-016, plus six `projects[].image` prev/next cards that turned
      out to be live. 18 of 136 slots, up from 7
- [ ] **ISSUE-006** — a real `og:image`. **Not a crop**: a designed 1200×630 card. Highest visible return of
      anything in this milestone: every shared link is a blank rectangle until it exists
- [ ] **The eleven bento tiles** (`MILESTONE-002`) — covers, not evidence, and the only slots
      needing the darken-and-tint treatment. The contrast ceiling is measured and recorded in
      `image_sources.md`: `#80` or darker behind the label and title, or white text fails
      WCAG 1.4.3 on the owner's own homepage
- [ ] **Decide whether Hibi becomes a seventh case study** — two documentations exist for a
      project that has no page. Owner's call; not a gap to fill quietly
- [ ] **Decide whether AFONO's AI-generated product imagery may be shown.** Its sources page
      calls it a placeholder for later real photography, and the case study already discloses
      it in two places. Until it is answered, `[ product page ]` stays hatched — every
      product screen in the prototype is carried by it
- [x] Fix the three alt strings that literally say "Placeholder: …" in the case studies —
      gone (SESSION-016). **134 images across 36 routes carry real alt text in both locales**,
      verified at 1x, 2x and 3x (SESSION-020)
- [ ] Eight `about.carouselItems` alt strings still begin "Placeholder: " in both
      dictionaries. Harmless today because those slots have no `src` and render as the
      hatched placeholder — but they must not gain one while the string says that
- [ ] About portrait — a real photograph
- [ ] Case-study section figures — **24 of 71 done**: WikiMind (SESSION-019) and AFONO
      (SESSION-020), 12 slots each. Five of those 30 are deliberate placeholders rather than
      gaps — WikiMind's competitor analysis and wireframes do not exist in its documentation
      and its moodboard is stock; AFONO's market analysis is competitors' photography, and
      its product page waits on the owner's AI decision. **Sync FM, Surugami, the
      barrier-free kitchen and QIS Portal remain** — 47 slots
- [ ] About carousel — 8 photos
- [ ] **DECISION-006** — decide with the owner which Playground slots (36) keep the
      stylised placeholder permanently and which become photographs
- [ ] Resolve the **15** now-unused files in `public/images/` — 817 KB that would ship. The
      count keeps going up, not down: each replaced file orphans its predecessor, and
      SESSION-020 added the Sync FM colour stand-in to the pile. Generated *variants* are no
      longer part of this — `image-variants.mjs` reaps its own output now; these fifteen are
      the owner's hand-made originals and need their yes
- [x] Give `CaseStudyHero` `priority` so the LCP image is not lazy-loaded (2026-08-25)
- [x] **Sync FM's German hero** — was still the 6.9 KB colour stand-in four sessions after
      the English one was fixed. `scripts/image-manifest.mjs` now diffs `en` against `de` and
      exits non-zero, which is the only check that can see this class of defect (SESSION-020)
- [x] **WikiMind, AFONO and Sync FM's section figures** — 30 of the 71, done one project at a
      time (SESSION-019, 020, 021). Roughly one session per project
- [ ] **The last three case studies' figures** — the barrier-free kitchen (10), QIS Portal
      (11), Surugami (10). Surugami is the hard one: 407 MB, no text layer, and its sources
      page puts the moodboards and personas out of reach
- [ ] A real `og:image`

### Relevant Issues

`ISSUE-006`, `ISSUE-007`

### Relevant Suggestions

`SUGGESTION-002`, `SUGGESTION-012`

### Relevant Decisions

`DECISION-005`, `DECISION-006`

### Relevant Code

- `src/lib/caseStudies/types.ts`, `src/lib/playground/types.ts`, `src/lib/dictionaries/types.ts`
- `src/components/ui/Image.tsx`, `src/components/PlaceholderImage.tsx`
- `public/images/` + `MANIFEST.md`, `vite.config.ts`
- `CONTENT_GUIDE.md` §10

### Dependencies

**No longer blocked on the owner producing assets.** The dependency is now the owner's time
and judgement — which figure best represents a section, what may be shown, and whether Hibi
joins the site — rather than material that does not exist. `ROADMAP.md` Phase 2 describes
the hand-off as it was understood before the documentations were found.

`SUGGESTION-012` (the responsive image pipeline) is a genuine ordering dependency: it should
land **before** the bulk import, not after 129 full-size PNGs are already in `public/images/`.

### Completion Criteria

- Every wired-up slot shows real work, and every shipped image is the owner's own
  (`DECISION-016`).
- Every remaining placeholder is a deliberate, recorded choice.
- Images are served in modern formats at sensible sizes; no layout shift.
- `MANIFEST.md` updated to reflect reality.

### Out of Scope

Copy, layout, motion.

### Notes

Can proceed incrementally — each delivered image is an immediate visible improvement, and the
hatched placeholder is a designed state (`DECISION-006`), so a half-filled page is
presentable rather than broken.

Work **one project end to end**, not one figure type across six. The documentation is open in
front of you either way, and 673 MB of PDF is slow to reopen.

Two of the six have no text layer or are too large for text extraction; `FInalDesmeth.pdf`
is 407 MB of flat page images. `scripts/pdf-page.js` handles both, because it renders rather
than extracts.


---

<a id="milestone-006"></a>

## MILESTONE-006 — Motion system and interaction polish

Status: **Complete** (SESSION-011 for the system, SESSION-012 for the scroll-linked
effects). One task deliberately not done — lazy GSAP — with the reason recorded below.
Priority: Medium
Goal: Give the site a coherent, restrained motion vocabulary — and add the scroll and
interaction animation the owner asked for.

### Why This Milestone Exists

The owner's fourth stated priority: interactive animations, scroll animations, GSAP.
Today there is one effect (a 0.7s fade + 18px lift) plus three unrelated ad-hoc systems.
Anything added now without a shared vocabulary will drift.

### Scope

The motion system, scroll-linked effects, page transitions. Cross-cutting but additive.

### Tasks

- [x] **SUGGESTION-006** — `src/lib/motion.ts` holds duration / ease / distance / stagger
      and the one reduced-motion guard; `index.css` mirrors the numbers for CSS transitions
- [x] Rebuild `useScrollReveals` on those tokens, with `refresh()` after fonts and images
      settle and opt-in variants via `data-inview="up|fade|scale|stagger"`. Stagger is one
      trigger animating the element's children, which is what `ScrollTrigger.batch` was for
- [ ] ~~Lazy-import GSAP inside the effect (`ISSUE-019`)~~ — **not done, deliberately.**
      The at-rest state is applied in a layout effect *before paint* so an incoming page
      never flashes visible; awaiting an import there puts the hide after the first paint
      and reintroduces the flash. See `SUGGESTION-006`
- [x] **ISSUE-012** — the canvas loop is gated by an `IntersectionObserver`: 120 fps on
      screen, 0 off screen, measured by instrumenting the loop
- [x] **SUGGESTION-007** — a 350ms fade on arrival, plus `ISSUE-020`'s loading state
- [x] **SUGGESTION-008** — case-study hero drift, figure scale-ins and staggered grids,
      velocity-linked marquees (SESSION-012). Sticky facts were left: merging `FactsStrip`
      into the rail is a layout change and `MILESTONE-003` is closed. Active-section
      tracking was already done there
- [x] Verify every effect is a no-op under `prefers-reduced-motion` — 38 routes, nothing
      hidden, no running animations
- [x] Check for jank: the reveals animate opacity and transform only; the page transition
      is opacity only

### Relevant Issues

`ISSUE-012`, `ISSUE-019`, `ISSUE-020` (and `ISSUE-001` if `MILESTONE-001` left anything)

### Relevant Suggestions

`SUGGESTION-006`, `SUGGESTION-007`, `SUGGESTION-008`

### Relevant Decisions

`DECISION-007` (the canvas stays rAF unless deliberately rewritten — record a new decision
if it moves to ScrollTrigger), `DECISION-008`

### Relevant Code

- `src/lib/useScrollReveals.ts` → new `src/lib/motion.ts`
- `src/components/process/HeroProcess.tsx`
- `src/components/RootLayout.tsx`, `src/components/case-study/*`,
  `src/components/playground/CategoryMarquee.tsx`
- `src/index.css`

### Dependencies

`MILESTONE-001` (the reveal bug), and layout should be settled (`MILESTONE-002`/`003`) —
animating a layout that is about to change is wasted work.

### Outcome

Met, with one exception recorded rather than quietly dropped: GSAP is still eagerly
imported (`ISSUE-019`), because the reveals' at-rest state is applied before the first
paint and an awaited import would put it after.

### Completion Criteria

- One motion module; no bare durations or eases at call sites.
- Reduced motion produces a fully static, fully visible site.
- No dropped frames on a mid-range laptop while scrolling the homepage or a case study.
- The owner recognises the site as more alive without it feeling busy.

### Out of Scope

Rewriting the process canvas from scratch. If that becomes desirable, make it its own
milestone — it is a rewrite, not a refactor.

### Notes

The restraint matters. Both `design-reference/SPEC.md` §11 and the site's own WikiMind
copy say the same thing: motion should guide, not distract.


---

<a id="milestone-007"></a>

## MILESTONE-007 — Design-system consistency, responsive and accessibility

Status: **Complete bar one issue that waits on the owner.** `ISSUE-015`/`ISSUE-026`
(SESSION-005), `ISSUE-023`/`ISSUE-011`/`ISSUE-021` (SESSION-006),
`ISSUE-016`/`ISSUE-028` (SESSION-007), the accessibility block (SESSION-009) and
`ISSUE-027`/`ISSUE-029` (SESSION-014) are done. Only `ISSUE-010`'s dead fields remain, and
they need the owner's real images — `MILESTONE-002`, not this one.
Priority: Medium
Goal: Make six differently-built pages read as one designed site, at every viewport, for
every visitor.

### Why This Milestone Exists

The owner's fifth stated priority: "design should be consistent overall". The tokens for
that already exist in `tailwind.config.ts` and are almost entirely unused — components
hand-write near-identical clamps and raw hex values instead. There are five different
"page h1" sizes across five pages. Meanwhile responsive behaviour has never been
systematically checked, and the accessibility target stated in the design spec has never
been verified.

### Scope

A deliberate sweep across the whole codebase. Deliberately scheduled **after** the layout
milestones so pages are not swept twice.

### Tasks

**Consistency (`SUGGESTION-009`)**
- [ ] Reconcile five h1 clamps into 2–3 named roles; apply the existing `text-hero` /
      `text-section` / `text-case-title` scale
- [ ] Promote recurring raw hexes to tokens (`#E4E7EE`, `#C9CEDB`, `#4E6087`, `#8FA6FF`,
      `#A7ACB4`, `#6C7078`)
- [ ] Adopt `.container-page` (or a `<Container>`); remove ~20 hand-written repetitions
- [ ] Extract the tag-pill and CTA-pill primitives
- [ ] **ISSUE-010** — remove whatever content fields are still dead after `MILESTONE-002`
- [x] **ISSUE-021** — `stripLocale` lives in `src/lib/i18n.ts` (SESSION-006)

**Responsive (`SUGGESTION-010`)**
- [x] **ISSUE-011** — `theme.screens` is in ascending order (SESSION-006)
- [ ] Settle one breakpoint story; document it in `ARCH-03`
- [ ] Move `BentoGrid` off inline styles; delete the `!important` override
- [x] **ISSUE-016** — measured (a real 34px overlap at 480px) and fixed: the mode switch
      appears from `md`, the second row carries it below that (SESSION-007)
- [x] **ISSUE-015** — the header measures itself into `--header-h`, and both
      `scroll-margin-top` and the sticky rail derive from it (SESSION-005)
- [x] **ISSUE-026** — the footer's link columns wrap (SESSION-005). The shared padding
      scale is still the more general fix and is still untouched, deliberately
- [x] **ISSUE-027** — a hash navigation after a client-side route change restored a stale
      scroll offset. Diagnosed in SESSION-005, fixed in SESSION-014: the restore branch
      yields to an explicit anchor, and the smooth landing waits for stillness rather than
      for arrival, because the browser's own fragment jump is animating alongside ours
- [x] **ISSUE-028** — not the header: German compound words in display headings. Fixed
      with hyphenation scoped to German below `md` (SESSION-007)
- [x] **ISSUE-029** — the About page's hand annotation sat on the Biography heading
      between 768px and ~870px. Positioned proportionally instead of at a fixed offset
      (SESSION-014)
- [ ] Walk every page at 375 / 480 / 768 / 1024 / 1160 / 1440 / 1920

`ISSUE-015` and `ISSUE-026` were taken first, in SESSION-005, being page-independent and
needing nothing from the owner. `ISSUE-027` turned out to be a scroll-position-bookkeeping
bug rather than an anchor bug, and was left diagnosed rather than half-fixed — SESSION-014
then closed it from those measurements without re-deriving them, which is the case for
writing a diagnosis down when you decline to guess at the fix.

The width walk is the one item still open, and it is a sweep rather than a defect: the
routes have been measured for overflow at 320/375/768/840/1024/1440 in English and German,
but not every page examined at every width by eye.

**Accessibility (`SUGGESTION-011`)** — done in SESSION-009, see `ISSUE-030`
- [x] Keyboard-reachable pause for the playground marquees (WCAG 2.2.2)
- [x] Contrast audit — `ink-muted` and the near-black greys were both below 4.5:1 and are
      fixed; the canvas illustration labels too
- [x] Heading-order check on every page — clean, no changes needed
- [x] Touch targets — the two suspected here were **fine**; a dozen standalone links were
      not, and use a `.tap-target` utility now
- [x] Keyboard access to the process-canvas branches — they were focusable while invisible
      and inert; the map is `inert` until interactive
- [x] axe/Lighthouse on every route — axe-core, 8 pages × 2 locales, 0 violations

### Relevant Issues

`ISSUE-010`, `ISSUE-011` ✅, `ISSUE-015` ✅, `ISSUE-016` ✅, `ISSUE-021` ✅, `ISSUE-023` ✅,
`ISSUE-026` ✅, `ISSUE-027` ✅, `ISSUE-028` ✅, `ISSUE-029` ✅

### Relevant Suggestions

`SUGGESTION-009`, `SUGGESTION-010`, `SUGGESTION-011`

### Relevant Decisions

`DECISION-004`, `DECISION-009`

### Relevant Code

`tailwind.config.ts`, `src/index.css`, and essentially every file under
`src/components/**` and `src/pages/**`

### Dependencies

After `MILESTONE-002`, `003` and ideally `006` — otherwise the sweep happens twice.

### Completion Criteria

- No arbitrary `clamp()` font sizes left in components.
- No raw hex outside `tailwind.config.ts`, except genuinely one-off decorative values.
- Every page verified at seven widths, both locales.
- axe reports no violations; contrast documented where a token was deliberately kept.

### Out of Scope

New features, new content, new animation.

### Notes

Do the consistency sweep in one focused session with before/after screenshots — spreading
it across sessions guarantees a half-migrated codebase, which is worse than either end
state.


---

<a id="milestone-008"></a>

## MILESTONE-008 — Performance, SEO and deployment readiness

Status: Proposed
Priority: Medium
Goal: Make the finished site fast, findable, shareable, and actually deployed.

### Why This Milestone Exists

Nothing in the roadmap matters if the site is not reachable, and a portfolio that unfurls
on LinkedIn as a generic title over a grey square loses most of its reach. Both problems
are structural consequences of the SPA migration and both are fixed at build time.

### Scope

Build output, metadata, hosting, and a minimal safety net.

### Tasks

**Deployment (`SUGGESTION-016`)**
- [x] **Ask the owner** — answered 2026-08-24: GitHub Pages, and the résumé points here
      rather than at Adobe Portfolio (`DECISION-012`)
- [x] Remove the unused fallback — `public/_redirects` deleted (SESSION-013)
- [x] Update `resume.portfolio` / `portfolioHref` in both dictionaries (SESSION-008)
- [x] Document the deploy command in `docs/project_overview.md`
- [ ] A custom domain, if the owner wants one — still open, and blocks nothing

**SEO (`SUGGESTION-013`)**
- [x] Prerender all 36 routes with baked per-locale metadata (SESSION-010) — the **head**
      only, and `ISSUE-013` records what prerendering the body would cost
- [x] `hreflang` alternates for every `/x` ↔ `/de/x` pair (SESSION-013) — `en`, `de` and
      `x-default`, in the static HTML and from the client, verified over plain HTTP
- [x] `sitemap.xml` generated from the same route list (SESSION-010)
- [x] **ISSUE-014** — the meta leak is fixed and the client path agrees with the baked HTML
- [ ] **A real `og:image`** — every preview is still a solid-colour placeholder. The owner's
      to supply; it is the single highest-value image on the manifest
- [x] Verify the pinned canvas prerenders without a flash — moot for a head-only prerender,
      and measured either way in SESSION-010

**Performance (`SUGGESTION-012`)**
- [x] **ISSUE-019** — the case-study chunk is split per slug (126 KB → 13 KB + one study).
      GSAP stays eager, recorded as `DECISION-015` with the alternative it forecloses
- [ ] Confirm the image pipeline from `MILESTONE-005` is producing modern formats
- [ ] Lighthouse pass on homepage + one case study; set a budget

**Safety net (`SUGGESTION-015`)**
- [ ] CI running `npm ci && npm run lint && npm run build`
- [ ] Playwright smoke test over all routes, including a same-route navigation
      (the `ISSUE-001` regression guard)
- [ ] Link/asset checker: every `<Link to>` resolves; every image `src` exists

### Relevant Issues

`ISSUE-013`, `ISSUE-014`, `ISSUE-019`, `ISSUE-025`

### Relevant Suggestions

`SUGGESTION-012`, `SUGGESTION-013`, `SUGGESTION-015`, `SUGGESTION-016`

### Relevant Decisions

`DECISION-001`, `DECISION-005`, `DECISION-012`

### Relevant Code

`vite.config.ts`, `index.html`, `src/components/Seo.tsx`, `src/routes.tsx`,
`package.json`, `public/`

### Dependencies

Content and imagery should be close to final — prerendering stale copy just means
prerendering twice. The host decision is an owner blocker.

### Completion Criteria

- The site is live at a known URL, deployed by a documented command.
- Sharing any case-study URL shows that project's title, description and image.
- Lighthouse ≥ 90 on performance and ≥ 95 on accessibility for the homepage and a case study.
- CI green on every push.

### Out of Scope

Analytics, a contact form backend, a CMS.


---

<a id="milestone-009"></a>

## MILESTONE-009 — German parity

Status: Proposed
Priority: Medium
Goal: Bring the German site fully level with the English one, once English is final.

### Why This Milestone Exists

`ROADMAP.md` Phase 4 puts German last for a good reason — translating copy that is still
being rewritten doubles the work. But the German site is a first-class part of this
portfolio (the owner lives and is job-hunting in Germany), and it currently has visible
English text on it.

### Scope

Every German string, plus the structural questions the German site raises.

### Tasks

- [ ] **ISSUE-009** — `de.about.handNoteOrigin`, `de.about.handNoteMaking`,
      `de.nav.switchToGerman`, and the missing `afono.de.heroDisclosure`
- [ ] Translate every English change made in `MILESTONE-004`
- [ ] Migrate the German case-study blocks to the new block model if `MILESTONE-003` left
      any behind (the build should have forced this already)
- [ ] Decide whether the decorative labels in `src/components/process/clusters.tsx` should
      be translated at all — record the answer as a decision either way
- [ ] Decide whether structural `aria-label`s ("Primary", "Footer", "Project navigation")
      should be localised
- [ ] Consider a language preference hint: a German visitor landing on `/` currently gets
      English with no signal that `/de` exists
- [ ] Read every German page end to end at both desktop and mobile — German runs longer
      than English and will break tight layouts, especially large headlines
- [ ] Verify `hreflang` from `MILESTONE-008` is correct

### Relevant Issues

`ISSUE-009`

### Relevant Suggestions

`SUGGESTION-005` (the German half)

### Relevant Decisions

`DECISION-002`, `DECISION-011` (the honesty constraint applies to German too)

### Relevant Code

- `src/lib/dictionaries/de.ts`
- The `de` block of all six `src/lib/caseStudies/*.ts`
- `src/lib/playground/**` German blocks
- `src/components/process/clusters.tsx`, `CONTENT_GUIDE.md`

### Dependencies

`MILESTONE-004` must be complete and accepted. Translating before then wastes effort.

### Completion Criteria

- No English text visible anywhere on `/de/*`.
- German copy reads naturally, not as a literal translation.
- No layout breaks from longer German words.
- `CONTENT_GUIDE.md` DE entries match the code.

### Out of Scope

Additional languages.

### Notes

`ROADMAP.md` notes the owner may want a native-speaker sanity check — worth offering, not
strictly required.

---
<a id="milestone-010"></a>

## MILESTONE-010 — The owner's pass over the whole site

Status: **Complete** — all fifteen (SESSION-040). The owner answered the four gates.
Priority: High
Date raised: 2026-09-10 (SESSION-038)
Worked: 2026-09-10 (SESSION-039), 2026-09-11 (SESSION-040)
Depends on: nothing. The four **OWNER** gates below were answered on 2026-09-11.
Addresses: `ISSUE-041` … `ISSUE-046`, `DECISION-028` … `DECISION-031`, `DECISION-033`,
`DECISION-034`

Fifteen changes the owner asked for in one go, covering the homepage, the About page, three
case studies, the résumé, the navigation and the playground. They are unrelated to each
other, so they are numbered as the owner numbered them and can be done in any order.

**Read the site writing rules in `README.md` before touching any string.** No em dashes.
Both locales or `content-audit` fails.

### What the owner answered, and what it cost (SESSION-040)

| Gate | The answer | Where it landed |
| --- | --- | --- |
| 1. Hero title | **Candidate D, their name.** "i dont like this title, i would preder my name instead" | One string per locale. `DECISION-028` |
| 2. `[ N ]` km | **6,570** | `about.biography[2]`, both locales. Not a gate, a blank |
| 3b / 3c. Process spacing | **"i didnt see the new cluster positions but you cannow continue"** — both parts authorised without a review round | `DECISION-034`, and it cost the question some size |
| 13. Figure hover | **"remove the hover in the case studies"** — no border, no shadow, no lift | `DECISION-029` |
| 15. Clip length | **"figure out ways to make them play"** — measured first, then the whole films on demand | `DECISION-030`, `ISSUE-044` |

**Two of the five answers changed what the recommendation had been.** The hero title went to
the candidate the paper argued against, and the figure hover went further than the quietest of
the three options offered. Both are recorded in their decisions with the reasoning revisited
rather than the recommendation quietly deleted.

### Where it stood after SESSION-039

| Task | State |
| --- | --- |
| 1. Hero title and description | **Done.** Candidate A shipped for the owner to look at; they chose D, their name, in SESSION-040 |
| 2. Hero tags blue | **Done** |
| 3a. Remove "My process" | **Done**, with `labelRef` and its timeline line |
| 3b / 3c. Question spacing, connectors | **Done** in SESSION-040, both parts, on the owner's word. `DECISION-034` |
| 4. Real photograph on About | **Done.** It was never a missing asset: the file was a solid-black stand-in and the photograph was in `Images/Alexsha_Photo.png` at the same dimensions |
| 5. Landing About section | **Done** |
| 6. About page rewrite (a-g) | **Done.** `[ N ]` was 6,570 kilometres, filled in SESSION-040 |
| 7. Move the "I love ..." line | **Done** |
| 8. WikiMind bento | **Done** — needed `DECISION-032`. It does not come out square; see that decision |
| 9. Kitchen crop and deletions | **Done.** The legible word was "Abbildung 26 Verschiedene Haken", not "Abblendung" |
| 10. Sync FM placeholders | **Done**, prose kept |
| 11. Nav "About" link | **Done**, all three call sites |
| 12. Résumé air | **Done.** Still prints to three pages |
| 13. Case-study figure hover | **Done** in SESSION-040: removed entirely, cursor only. `DECISION-029` |
| 14. The playground (a-i) | **Done**, all nine |
| 15. Clip length | **Done** in SESSION-040. Measured (no playback bug), then whole films on demand. `DECISION-030` |

**Nothing is left.** The four owner gates were answered on 2026-09-11 and closed the same
day, along with `ISSUE-043`, `ISSUE-044` and `ISSUE-045`.

### How to work this milestone

Group A is copy and data, and can be done in one sitting. Group B is layout and needs a
browser. Group C is the playground and is the largest piece. Group D needs the owner in the
room before the work starts.

| Group | Tasks | Needs |
| --- | --- | --- |
| A — copy and data | 1, 2, 4, 5, 6, 7, 8, 9, 10, 11 | `dictionaries/`, `caseStudies/`, one crop |
| B — layout | 12, 13 | a browser, `npm run verify` |
| C — playground | 14, 15 | a browser, CDP screenshots, an encoder |
| D — owner gate | 1 (title), 3 (spacing), 13 (affordance), 15 (weight) | the owner |

---

### 1. Split the hero headline into a short title and a description **OWNER**

`src/lib/dictionaries/en.ts` + `de.ts`, `hero.headlineLines` and `hero.intro`.
Rendered twice in `src/components/process/HeroProcess.tsx` (lines ~251 and ~333: a static
fallback and the animated hero, both read the same strings).

The owner's description, verbatim in intent:

> I design intuitive digital experiences and create meaningful and unique brands

As shipping copy, no em dashes:

```
intro: "I design intuitive digital experiences, and I create brands that mean something and look like nobody else's."
```

The title above it should be **short**. Four candidates, and see `DECISION-028`:

| | Title | Why |
| --- | --- | --- |
| **A** | **Design that listens.** | **Recommended.** Three words, and it says the thing the About page is actually about: starting from the other person's point of view. Reads as a claim, not a label. |
| B | Made for people. | Warmer, plainer, slightly more generic. |
| C | Curious by craft. | Picks up "I love to explore new things", which is the other half of the About story. |
| D | Alexsha Maharjan | The name as the hero, letting the description do all the work. Clean, but the header already carries the name two centimetres above it. |

`headlineLines` is an array because the hero sets its own line breaks. A three-word title
is one line: `headlineLines: ["Design that listens."]`. **Check the German**, which will not
break the same way.

### 2. The hero tags go blue

`HeroProcess.tsx` lines ~259 and ~341: `className="mt-5 font-mono text-[13px] text-ink-muted"`.
Change `text-ink-muted` to `text-accent` in both. One word, two places, and the second is
the one that is easy to miss.

### 3. The process canvas: drop the label, unbreak the question **OWNER**

Three parts, and the third does not start until the owner has seen the second.

**3a. Remove "My process" from the black card.** `dictionary.process.label`, rendered at
`HeroProcess.tsx` ~266 (static) and ~357 (animated, via `labelRef`). The animated one is
faded in by the scroll timeline at line ~134, so removing the element means removing that
line too. Leave `process.srSummary`, which is the screen-reader description and is the only
thing telling a non-visual reader what the canvas is.

**3b. "How do I bring a project to life?" must stay on one line.** It currently wraps into
two because `HeroProcess.tsx` ~362 sets `w-[min(90vw,1000px)]` with `textWrap: "balance"`,
and at the heading's clamped size the sentence does not fit 1000px. Widen the box, drop the
size a step, or both. The five process clusters around it then have to move; the owner has
said **the space above the text is usable**, so clusters may sit above the question as well
as below it.

**3c. Redraw the connectors, after the owner approves 3b.** The lines joining the question
to the five clusters live in `src/components/process/BranchGroup.tsx` and
`src/components/process/clusters.tsx` (630 lines, the largest component on the site). They
are drawn to the current cluster positions. **Do not touch them until the owner has seen and
approved the new spacing** — that is the owner's own instruction, and redrawing them twice
is the expensive way to do this.

Aim for uniformity: equal gaps between clusters, equal connector lengths where the geometry
allows, one curve idiom rather than five.

### 4. Use the real photograph in the About placeholders

`public/images/alexsha_photo-mrx9hbwx-nif2.png` already exists, with 400/640/960/1280
variants generated, and is already used in three places: `Seo.tsx` (the `og:image` default),
`AboutPreview.tsx` and `About.tsx` line ~38.

Task: find the remaining About-page placeholders that should be this photograph and wire it
in. Run `node scripts/image-manifest.mjs` afterwards and check the slot count moved.

### 5. Rewrite the landing page's About section

`src/components/AboutPreview.tsx` and `aboutPreview` in both dictionaries.

**Remove the tags under the photo.** `aboutPreview.annotations` and the `<div>` that renders
them, `AboutPreview.tsx` lines 22 to 32. Delete the strings from both dictionaries.

**Two blocks of copy, not one.** The first is who he is and sends the reader to `/about`;
the second is the playground and sends them to `/playground`. Drafted:

```
heading:    "How I started designing, and who I am"

copy:       "I grew up in Nepal making things for other people. Cards, gifts,
             small handmade objects, always designed around whoever was going
             to open them. Starting from someone else's point of view is the
             habit that turned into a career, and it is still how I work."

copyDim:    "There is more of it on the about page."      ← dimmed, text-ink-muted
linkAbout:  "Read the whole story →"

playgroundHeading: "The playground"
playgroundCopy:    "Everything I make when nobody has asked for it. Personal
                    projects, crafts, experiments, and whatever I happen to be
                    learning at the moment."
linkPlayground:    "Open the playground →"
```

The owner's raw second sentence was "here are the collections of all my personal projects,
hobbies and new things I have learned and discovered that I have done till now". The draft
above is that, said once.

**"Dim some text and make the user go to the about page"** is the `copyDim` line:
`text-ink-muted`, immediately above the link, so the paragraph trails off into the invitation
rather than stopping dead.

### 6. Rewrite the About page

`src/pages/About.tsx` (227 lines) and `about` in both dictionaries. The largest single task
in group A. Seven changes:

**6a. New heading.** `about.heading` is "Designing with curiosity, clarity and care." Make it
match the landing section: **"How I started designing, and who I am"**.

**6b. New biography.** The owner supplied the substance. Refined, no em dashes:

```
biography: [
  "I grew up in Nepal, around design and making things, and I have been drawn
   to both for as long as I can remember. I loved crafts, and I especially
   loved designing for other people. I was always making something to give
   away, and I designed each one around the person who was going to open it.",

  "That is where the career came from. I like thinking from the other person's
   point of view and shaping something until it fits them. Usability and user
   experience were things I was practising long before I knew they had names.",

  "It is also what brought me [ N ] kilometres from home to Germany, to learn a
   language, live inside a different culture and collect a completely different
   set of experiences. I like exploring. It keeps my head open to ideas I would
   not have had otherwise.",

  "I am a student now, taking the bachelor's in the field I always wanted, and
   I am glad to be doing it. I have taught myself to work across UI/UX, web
   design, branding and visual communication, and I enjoy turning complicated
   ideas into something clear and good to look at.",
]
```

**`[ N ]` is a gap the owner left open** and it stays a gap: they wrote "fly () km away"
with the number blank. See "What needs the owner" in `next_session.md`. Do not fill it in.

**6c. Tools.** `about.toolsHeading` "Tools" becomes **"Tools I have learned"**. Add
**"Artificial Intelligence"** to `about.tools` and render that one chip in the accent blue
while the rest stay as they are. `About.tsx` renders the array uniformly today, so this
needs either a marked entry in the data or an index check in the component. Prefer the data:
a `{ name, accent?: true }` shape reads better than a magic index.

**6d. Delete `about.aiLabel`.** That is the "and AI — as a tool to explore, not to replace"
line under the tools, and it is also the one em dash on the page.

**6e. `about.aiBody` and `about.aiTags` go blue.** The paragraph and the four chips below it,
in the accent.

**6f. Delete the résumé link under the tools.** `about.resumeLink` and `about.resumeCaption`
("education and background live in the CV") and the markup that renders them. The résumé
block at the bottom of the page (`resumeHeading` / `resumeCopy` / `resumeCta`) **stays**.

**6g. Replace "Outside the work" with a playground section.** Delete `about.carouselHeading`
and all eight `about.carouselItems`, which are placeholders and have never been filled.
In its place, a short centred block pointing at `/playground`. Reuse the copy from task 5 so
the two pages agree, and **centre every line in the section** — that is explicit.

### 7. Move the "I love …" line

`src/components/about/LoveLine.tsx` (65 lines), fed by `about.loveIntro` and
`about.loveWords`. It moves to **directly below the biography paragraphs**, before the focus
and tools blocks. Only its position in `About.tsx` changes.

### 8. WikiMind: the three sketch figures become a bento

`src/lib/caseStudies/wikimind.ts`, English at lines 127 to 129 and German at 321 to 323.

The three:

| Slot | Aspect | Asset |
| --- | --- | --- |
| `[ initial sketches ]` | 1200/1805 (tall) | `wikimind-initial-sketches.webp` |
| `[ logo sketches ]` | 1420/516 (wide) | `wikimind-logo-sketch.webp` |
| `[ logo variants ]` | 1600/460 (wide) | `wikimind-logo-variants.webp` |

The owner wants **initial sketches on the right, the other two stacked beside it, reading as
a square.** The tall figure is 1200×1805 and the two wide ones stack to roughly 1500×1000,
so a two-column grid with the tall one in the right column and the two wide ones stacked in
the left comes out close to square. `DECISION-019` sizes figures by height and justifies
rows, so this needs a genuine grid rather than a row of three; check whether
`SectionMedia.tsx` can express it before adding a block kind.

**Also delete the `[ competitor analysis ]` placeholder**, `wikimind.ts` line 55 (en) and 249
(de). It has no asset and never will.

### 9. Barrier-free kitchen: crop one figure, delete two things

`src/lib/caseStudies/barrier-free-kitchen.ts`.

**9a. Re-crop `kitchen-paper-details.webp`.** The frame currently includes a second image
above it and the word "Abblendung" is legible in the shot. Crop so that neither survives.
Use `scripts/image-treat.mjs`, and **record the crop in `docs/reference/image_crops.json`**
so the export stays reproducible. Note that the figure's `aspect` (`1600/495`) has to be
updated to the new crop or the layout will letterbox it.

**9b. Delete the materials placeholder.** Search for the slot with no `src`; there is one in
the prototype run.

**9c. Delete the EEVEE paragraph.** Line 194 (en) and its German counterpart: "EEVEE was used
for the final animation because a Cycles render was estimated to require approximately 26
days…". The owner wants it gone.

### 10. Sync FM: delete two placeholders

`src/lib/caseStudies/sync-fm.ts`. `[ competitor comparison ]` at lines 55 (en) and 218 (de),
`[ ethical-risk diagram ]` at 150 (en) and 313 (de). Delete the slots. **Leave the prose**
about ethical risk at lines 99 and 162; the owner asked to remove the placeholder images, not
the argument.

### 11. The nav "About" link goes to the About page

`src/components/Header.tsx` line 96: `to={localeHref(locale, "/#about")}`. It should be
`"/about"`. Check `src/components/MobileMenu.tsx` and `src/components/Footer.tsx` for the
same link before declaring it done. `ISSUE-041`.

### 12. Résumé: air under the section rules

`src/pages/Resume.tsx`. Each section heading is
`<h2 className="border-b border-accent pb-2 …">` (lines 119, 130, 141, 152 and on) and the
first row beneath is `<div className="border-t border-surface-2 py-6 first:border-t-0 first:pt-0">`
(lines 29, 39, 49, 59). So the rule sits 8px under the heading and the first row starts
immediately: no gap at all.

Fix on the container, not on the row: give the wrapping `<div>` a `pt-5` rather than removing
`first:pt-0`, which exists so the first row has no doubled border. Check the **print**
stylesheet after, since this page is designed to be printed. `ISSUE-042`.

### 13. The case-study figure hover **OWNER**

`src/components/case-study/Figure.tsx` line 76:
`className="rounded-[10px] border border-card-border transition-colors group-hover:border-accent"`.
That accent border is the blue line the owner does not want.

The owner also asks whether making the image bigger is a good idea. **It is not, here.** A
case-study figure sits in a justified row (`DECISION-019`); scaling one on hover pushes
against its neighbours and breaks the row the layout works to keep. It is fine on the
playground collage, where pieces are absolutely positioned and have room to grow.

So the figure needs a hover affordance that is neither a coloured border nor a scale. Three
options, in `DECISION-029`:

| | Option | Notes |
| --- | --- | --- |
| **A** | **A soft shadow lift, no movement.** | **Recommended.** `box-shadow` only. Says "this is a surface you can pick up" without moving anything or introducing a colour. |
| B | A small "expand" chip in the corner on hover | Most explicit about what the click does. Adds a element to every figure. |
| C | Cursor change only | Quietest. Also the least discoverable, and invisible on touch. |

Whichever wins, the `cursor-zoom-in` on the button changes too. See task 14e: the owner has
already said they dislike the magnifying glass.

### 14. The playground

The largest task. Everything here is in `src/components/playground/` and
`src/lib/playground/`. Read `next_session.md`'s playground section first: the deck's geometry
has four traps and the reveal is arithmetic in `index.css`, not a tween per picture.

**14a. The deck starts where the homepage's process card starts.** The homepage canvas is
pinned at `top: 70svh` (`HeroProcess.tsx` ~350). The playground hero is `min-h-[56svh]`
(`PlaygroundIndex.tsx`), chosen in SESSION-036 so half a card shows at rest. The owner wants
the two to agree. **Changing the hero height changes what "half a card" means**, and that
arithmetic is written down in `PlaygroundIndex.tsx`; recompute it rather than nudging.

**14b. The first card grows as it arrives.** Like the process card, which scales up as it
pins. It must not reach full width: the owner said "not take up the whole page". The deck
already shrinks cards as they are covered (`SHRINK`, `CardStack.tsx`), so this is the same
tween run the other way on card 1 only.

**14c. Hover makes an image much bigger.** `.pg-piece:hover` in `index.css` is
`transform: scale(1.16)`. The owner wants more. Watch two things: a large scale on a slot
near the card's edge will clip on `overflow-hidden`, and the hovered slot must still be
raised over its neighbours (`.pg-slot:hover { z-index: 30 }`).

**14d. Click opens it very large, centred, and clicking outside closes it.** Today
`ui/Lightbox` opens fitted, and a further click zooms to natural size and pans, which the
owner does not want on this page. It needs: open large and centred, click the backdrop to
close, no second zoom. `Lightbox` is shared with the case studies, where the zoom is the
whole point on mobile (`DECISION-018`), so **this is a prop, not a rewrite** — something like
`zoomable={false}` defaulting to true.

**14e. Change the cursor.** `cursor-zoom-in` gives the magnifying glass. `cursor-pointer` is
the plain answer; a custom cursor is possible and is a design decision, not a technical one.

**14f. Lighten the card grid.** `gridBackground` in
`src/components/playground/gridBackground.ts`: `rgba(43,74,191,0.075)` and `0.032`. The owner
says too dark. Lighten both, and note that at full reveal a second grid in the card's own
colour is painted over it at `0.15` / `0.05` (`accentGridBackground`) — the two add up, so
check the lit state, not just the resting one.

**14g. The colour turn starts with the card, not at the end of it.** `index.css` currently
splits the runway: `--pg-sweep` is the first 82% (the pictures lighting up one at a time) and
`--pg-full` is the last 18% (the notes, the index and the ruling turning the card's colour).
The owner wants the notes, arrows and grid to **start** moving as soon as the card lands.
Change `--pg-full` to run across the whole runway, or to start at 0 and finish around 0.6,
so the colour arrives gradually alongside the pictures rather than snapping at the end.
One line in `index.css`; check all four cards.

**14h. Notes, arrows and pictures still overlap.** `ISSUE-043`. SESSION-038 stopped the note
*boxes* overlapping slot rectangles, but two things still cross:

- **The arrows do**, deliberately. A curve from a note to a picture on the far side of the
  card crosses whatever is in between. The fix is either to route around obstacles or to
  place notes closer, which fights task 14g's other constraint.
- **The note boxes are estimates.** `placeScribbles.ts` sizes a note in design units at
  ~12.7 to the CSS pixel, which is right on a 1280px stage and wrong on a narrower one. At
  smaller card widths the real note is bigger than the box that was collision-tested.
  Measuring the rendered note and re-placing after layout would remove the guess entirely.

**14i. Some arrows should loop.** `arrowBetween` in `placeScribbles.ts` draws one cubic with a
seeded bend. A loop is a different path: a small circle or a curl before the line sets off.
Add it as a second arrow style chosen by the same seed, so some notes loop and others do not.

### 15. The playground clips are excerpts, not the films **OWNER**

`ISSUE-044`. The five clips in `public/videos/` are 6 to 9 seconds:

| Clip | Now | Source | Source length |
| --- | --- | --- | --- |
| `pg-gift-explosion.mp4` | 8.00s | `Images/Playground/craftgift3.mp4` | 23.5s |
| `pg-gift-popup.mp4` | 8.01s | `craftworkgift1.mp4` | not read |
| `pg-gift-riona.mp4` | 6.02s | `craftgift2.mp4` | not read |
| `pg-hibi.mp4` | 9.01s | `HibiVideo/2026-09-10 13-16-11.mov` | not read |
| `pg-motorbike.mp4` | 8.00s | `motorbikeVideoAnimation.mp4` | 63.0s |

They are that length because `scripts/video-clip.mjs` was run with `--seconds 8`. Re-cutting
at full length is one command per clip.

**The gate is weight.** `/playground` is already the heaviest page on the site at 2.6 MB
(1440px) and 3.5 MB (390px, 3x). The motorbike animation at full length is roughly eight
times its current 443 KB. `DECISION-030` is the trade: full films and a much heavier page, or
longer excerpts as a middle. The clips do not autoplay until they are on screen and never
download under `prefers-reduced-motion` (`ui/LoopVideo`), which limits the damage but does
not remove it.

Also check the **viewer**: `ui/Lightbox` plays the same file. If the owner's "only 2 3
seconds" is about the viewer rather than the collage, the cause is a different one and the
re-cut will not fix it. **Measure before re-encoding.**

### Definition of done

- `npm run build`, `npm run lint`, `node scripts/content-audit.mjs`, `npm run verify` all green.
- No em dash anywhere in `src/lib/dictionaries/` or `src/lib/caseStudies/`.
- Both locales for every string touched.
- `node scripts/image-manifest.mjs` re-run if any slot was added or deleted.
- The four **OWNER** gates answered, or the tasks behind them left undone and listed in
  `next_session.md`.

---

<a id="milestone-011"></a>

## MILESTONE-011 — The owner's second pass: process, playground, responsive

Status: **Complete**, bar one part that needs an asset the repository does not have
Date: 2026-09-11 (SESSION-041)
Depends on: `MILESTONE-010`

### What it was

Fourteen numbered requests from the owner, covering the process canvas, the playground
collages, the two modes' first screens, the footer, the résumé's print layout and a full
responsive review.

| # | Ask | Outcome |
| --- | --- | --- |
| 1 | Step 2: drop "Effort Focus"; steps 1 and 2 in one row; diagonal connectors | Done — `DECISION-035` |
| 2 | Slow the step reveal, especially step 5 | Done — `ISSUE-048`; it was a clipping bug, not a pacing preference |
| 3 | The two modes' headers in the same place; playground tags | Done — `DECISION-037`; pixel-identical at 1440 in both locales |
| 4 | No looped arrows; one style; a gap from the pictures | Done — `DECISION-036` |
| 5 | Card 1: no acrylic arrow, event-flyer note bottom-left, calendar points at March | Done |
| 6 | Card 2: the callout points at the finished perfume box | Done |
| 7 | Card 3: Desmark replaces the line-art note, bottom-right; **add a still life** | Note done; **still life not done** — see below |
| 8 | Card 4: the VTRI banner replaces the character note | Done |
| 9 | A complete footer navigation check | Done — `ISSUE-050`; two links were missing |
| 10 | Full responsive review, fix what it finds | Done — `ISSUE-049` was the find |
| 11 | Portfolio/Playground too large on phones | Done — header 146px → 116px, hero 70svh → 58svh |
| 12 | Résumé prints on at most two pages | Done — 3 pages → 2, in both locales |
| 13 | The About link becomes a real button | Done |
| 14 | The playground videos autoplay the whole film, looping | Done — `DECISION-038` |

### The one thing not done

**Task 7's extra still-life photograph.** The asset library has exactly one still life,
`Images/Playground/photographystilllife.jpg`, and it is already on card 3 as
`pg-photo-stilllife.webp`. The other photograph in the library, `PhotographyLowkey.jpg`, is a
portrait and is also already on that card.

The owner was asked and chose to leave it out rather than reuse a picture or ship a slot
pointing at a file that does not exist (`DECISION-011`: never invent a fact to fill a gap).
**To finish it: drop a still-life photograph into `Images/Playground/`, run `npm run images`,
and add a slot to card 3 in `src/lib/playground/collage.ts`.**

### What the milestone cost that it did not predict

Three of the fourteen turned out to be sitting on defects rather than on preferences, and each
took longer than the ask:

- **Task 2 was a bug.** Cluster 05 was revealed over `0.90 → 1.02` on a track that stops at 1,
  and the interactive threshold fired at 0.90 and wrote it to full opacity in one frame.
- **Task 4 exposed a cliff in the seat search.** Thirty units of note width moved a note 8,900
  units across the card, because seats were filtered rather than priced.
- **Task 10's find was the mobile process map**, drawn at half size and clipped to the phone.

And one piece of tooling was wrong in a way that had hidden a real defect for a session:
`content-audit.mjs` sampled a stage width the site cannot produce (`ISSUE-051`).


---

<a id="milestone-012"></a>

## MILESTONE-012 — The owner's third pass: the Figma annotations, the map's bottom row, the hero's two calls to action

Status: **Complete**
Date: 2026-09-11 (SESSION-042)
Depends on: `MILESTONE-011`

### What it was

Three asks, one of which arrived as a drawing:

> "GO TO portfolio figma file, page 2, there i have added arrows and texts to the frames,
> try to see what i did there, the type of arrows i used, placements and all. ignore the
> style or size of the figma arrows and text… i just want you to see the positions and type
> of arrow and make it like that.
> in the process card, i want the step 2 and 4 to be right aligned. also, the 3 and 4 steps
> should be L shaped…
> in the hero page, i also want button for playground and not for about. for about, you can
> fade the text out in the end so that user wants to click to more to go to about page."

| # | Ask | Outcome |
| --- | --- | --- |
| 1 | Steps 02 and 04 right-aligned; the bottom row's connectors L-shaped | Done — `DECISION-040` |
| 2 | The playground's notes and arrows to match page 2 of `Portfolio.fig` | Done — `DECISION-039`; one limitation left open as `ISSUE-053` |
| 3 | The playground gets the button; About's copy fades out instead | Done — `DECISION-041` |

### Reading a brief that was drawn

Page 2 of `Portfolio.fig` is the four collage frames, and the owner had added **ten blue
arrows and ten "example text" boxes** to them — three on frames 1, 3 and 4, two on frame 2.
They are consistent enough to be read as a specification:

- **One shape.** A single smooth arc of about a quarter-turn, round caps, with an open
  two-stroke V for a head. No loops, no S-curves, no curl. The shallowest measures 1,672
  design units long and stands 492 off its own chord, which is a sagitta of 0.29.
- **Always in the margin.** Every annotation sits in the card's outer band, in white space,
  never over a picture — and the *text* is always the outermost of the two.
- **Corners, not sides.** Nine of the ten are in a corner of the frame. The tenth (frame 4's
  right-hand one) is level with its picture and a shade below its middle, which is
  `bottom-right` of the four values `prefer` can take and emphatically not `top-right`.

**Two questions could not be answered by reading**, and the owner answered both before any
code was written:

1. The first ask said "the 3 and 4 steps should be L shaped" and then "2 should be l shaped
   and 4 should mirror L". The owner chose **the bottom row, 3 and 4**.
2. **Every arrow in the Figma points at the text**, tail on the picture — the exact opposite
   of what the site draws. The owner confirmed those arrows are **guides addressed to the
   reader of the file** — "put a note here, about that piece" — and that the site keeps its
   arrowhead on the picture. Only the shape and the placements were being specified.

Had either been guessed, the work would have been wrong in a way no test would have caught.

### What the milestone cost that it did not predict

**The arrows were too short to be arrows, and had been for three sessions.** Sweeping every
stage width the deck produces found **127 of 264 placements drawing an arrow under 34 CSS
px**, seven notes whose worst case was under 7px, and one at 0.3px — a speck of ink beside a
note. Nothing had ever measured it: `content-audit` checks that an arrow does not cross a
picture and does not leave the card, and a two-pixel arrow does neither.

It is fixed — median arrow length 36px → 88px, sub-34px cases 127 → 41 — and the fix needed
four separate things, each of which is documented where it lives in
`lib/playground/placeScribbles.ts`:

- `shortRun` replaces `crampedBy`: the seat is priced on **the arrow it actually draws**
  rather than on the gap between two rectangles, which for a diagonal seat is a different
  number entirely.
- Ring seats that fall off the card are **slid back onto it** instead of being priced out by
  the off-frame term at 40 a unit. Card 4's pyramid is 1,146 units from the top, so every one
  of its "above and right" seats was outside the frame.
- The `farness` knee moved 2,600 → 4,200 and its slope halved, so a note can stand back far
  enough to draw a visible arrow — which is what the Figma annotations do.
- **The note's type size now follows the card** (`notePx`): 18px at the 900px stage where
  notes first appear, rising to the full 22 by 1,180. Fixed-size type over a card that is not
  is what made the narrow cards unsolvable, and it is why every failure was below ~1,100px.

`content-audit.mjs` gained a sixth check for it, and its stage sweep now starts at 900 rather
than 860 — below 900 the `.collage-scribble` container query hides notes and arrows both, so
the two narrowest widths were testing a layout nobody can see.

### What is left

`ISSUE-053` — nine placements, all on cards 1 and 3 at stage widths between 900 and 1,080,
still draw an arrow between 13 and 24 CSS px. Those cards are genuinely crowded at that size
and the seat search is choosing between a short arrow and one lying across a photograph. The
audit's floor is set at 12px as a ratchet so it cannot get worse by accident.


---

## MILESTONE-013

**The owner's fourth pass: the Figma process redesign, the mobile header, the footer, the
legal pages**

| | |
| --- | --- |
| Status | **Complete** bar task 6, which is with the owner |
| Priority | High |
| Session | SESSION-043 (2026-09-11) |
| Depends on | `MILESTONE-012` |

Ten numbered requests. Unlike the last three passes, most of them are not repairs: the site
is structurally finished and this is the pass where it stops looking like a build.

### The tasks

| # | Asked for | Done |
| --- | --- | --- |
| 1 | Fix the playground arrowheads: the line is rotated, the head is not | ✅ `ISSUE-054` |
| 2 | Reorder and fix the process map from the redesigned Figma `Process` frame | ✅ |
| 3 | The footer is too tall and too plain | ✅ `DECISION-044` |
| 4 | A small circular on/off toggle centred in the mobile navbar, `AM` at the left, a hamburger and a side drawer at the right; and the process vertical on phones | ✅ `DECISION-042`, `DECISION-043`, `DECISION-045` |
| 5 | Drop the playground arrows and their notes on phones | ✅ |
| 6 | Review every photograph's caption | **Published for the owner**, not yet applied |
| 7 | "Hello, I am …" in the hero; a new About heading and biography | ✅ |
| 8 | Take in the new and edited images | ✅ three of four; `ISSUE-056` for the fourth |
| 9 | Impressum and Datenschutz in the footer | ✅ `DECISION-046`, and it opened `ISSUE-055` |
| 10 | Make the "I love …" words actually fit | ✅ |

### Task 2, in detail, because it is the largest

The owner redesigned the whole process board in Figma. The frame is `Process`, node
`310:736` on page 2, **1512 x 868** — a MacBook viewport, where the map in code is 1440 x
900. Everything taken from it was read as a **fraction of the frame** and laid onto the map,
which is the only conversion that survives the aspect difference.

What the redesign changes:

- **The bottom row's connectors stop being elbows.** `MILESTONE-012` routed 03 and 04 as
  L-shapes; the redesign draws four diagonals radiating from the question, so the elbow is
  gone. The elbow was only ever a waypoint between two points that were already a diagonal.
- **The question moves to the middle of the canvas.** `HUB_Y` 430 → 450, which is 50.06% of
  the owner's frame.
- **Steps 03 and 04 come up level with the question**, 56% → 46.4%, and 05 drops into the
  room they leave, 61.78% → 68.7%. This is the change you actually see: the map used to read
  as two rows with a sentence wedged between them and now reads as one sentence with four
  steps around it.
- **The four outer strokes are short and nowhere near their clusters.** Easy to get wrong by
  reasoning instead of measuring: a stroke from the question to the thing it connects to is
  the obvious drawing and it is not the one in the file.
- **01** puts the frustration rating before the SWOT, and draws **three** interview figures
  where there was one. Three people over a quote is research; one is an opinion.
- **02** is reordered and rewritten: "Define problems / What is the problem? What needs to be
  solved?", then the opportunity statement, then a **cobalt-filled** panel, "Defining Goals /
  What needs to be achieved?". The old labels named the artefact ("Problem framed", "Success
  looks like") where the rest of the map asks questions.
- **03** leads with the wireframe and its "Simplify navigation" note, and drops the sitemap
  to the bottom. The sitemap is the biggest object in the cluster and it was reading as the
  beginning of the step.
- **04** leads with the tokens — spacing, states, colour, the three icon studies — and closes
  on the two things made out of them, a screen and a typeface. It used to open on the
  typeface, which is the end of the work standing at the front of it. The Focus card now says
  "Designing frames in Figma".
- **05** is unchanged, in the file and in the code.

The widths and the 65-unit outer inset were **not** taken from the file. Its clusters are
inset further, 8.2% against 4.5%, but that is a consequence of its contents being drawn
smaller relative to a wider frame, not an instruction about where a cluster's outer edge
belongs.

### What was not done, and why

- **Task 6 is with the owner.** Forty-seven pieces, ninety-four captions. The captions were
  written from the pictures, so they describe what is visible and cannot know what a thing is
  called, who it was for, or when it was made. A published page shows every photograph beside
  its four strings and saves what the owner types; their wording comes back into
  `src/lib/playground/categories/` next session.
- **The AFONO market analysis is still an empty slot** (`ISSUE-056`). The owner exported a
  blank file.
- **The typefaces are still Google's** (`ISSUE-055`). Self-hosting them adds binary assets
  and changes what ships on every route, which is a decision rather than a repair — and the
  new privacy notice discloses the transfer in the meantime.
- **The Impressum's postal address is a placeholder** (`DECISION-046`). It is a fact only the
  owner has.

### Verification

`npm run build` green. `npm run lint` clean (three pre-existing `react-refresh` warnings, one
pre-existing `exhaustive-deps`). `node scripts/content-audit.mjs` green — six case studies,
five playground categories, 88 card layouts. `node scripts/verify/run.mjs images` green: 420
images across 26 routes at device pixel ratios 1, 2 and 3, nothing broken, nothing missing
alt text. Chrome checks at 1440 x 900 and 390 x 844, both modes.


---

## MILESTONE-014

**The owner's fifth pass: the captions applied, the categories deleted, a stepping viewer**

| | |
| --- | --- |
| Status | **Complete** |
| Priority | High |
| Session | SESSION-044 (2026-09-11) |
| Depends on | `MILESTONE-013` |

Six requests, and two of them are corrections of `MILESTONE-013`.

| # | Asked for | Done |
| --- | --- | --- |
| 1 | Improve the reviewed captions, translate them, and **delete the categories** | ✅ `DECISION-047` |
| 2 | Take in the photos that were cropped and edited | ✅ `ISSUE-057` — six of them |
| 3 | Next and previous buttons in the image viewer | ✅ `DECISION-048` |
| 4 | The AFONO market analysis is uploaded | ❌ `ISSUE-058` — the file is blank again |
| 5 | The hover tag takes its card's arrow colour | ✅ `DECISION-049` |
| 6 | The footer looks bad; make it normal, no big email | ✅ |

### Task 1, which was two tasks

The owner reviewed 47 captions in the page `MILESTONE-013` published, and then said something
more important than the edits: *"categories is not needed anymore, right now its categorized
based on cards"*.

They were right, and the review had been built against the wrong file. The playground's
pictures are slots on four collage cards, and **each slot already carried its own caption and
alt in both locales**. `lib/playground/categories/` was a parallel set of 47 items that
nothing had rendered since `DECISION-027` — so of the 47 strings reviewed, 31 corresponded to
a picture on a card and 16 did not, while **17 live pictures were not in the review at all**.

So the work was: map the 34 edited rows onto the slots they actually describe by `src`, write
them up, translate them, write the 17 the review had missed, and delete the categories.
`DECISION-047` has what went and why it had survived.

The captions themselves needed the owner's substance and not their grammar — the site's rule
is that the owner supplies the fact and the writing is made human (`README.md`). "Crafted a
suncatcher beaded crystal hanging plant" became "A beaded crystal suncatcher hung with a
trailing plant, lit at night"; "Digital portrait illlustration" became "Digital portrait",
with "drawn in Illustrator" moved into the alt text where it belongs. **What was kept is
every fact the owner added**: the tools (Procreate, Illustrator), the subjects (Spider-Man,
unicorn, Christmas market, horror, smart watch), and the corrections to what a thing
*is* — `pg-frame-detail` is a paper flower frame, not a detail shot of the frame above it.

### Task 2, and why the last session's check was wrong

`MILESTONE-013` added a staleness check comparing source and export modification times, ran
it, re-exported ten images, and reported everything current. The owner said it was not.

The check was wrong. It answers "was this written after that?" and is used to answer "does
this still represent that?". `ISSUE-057` has the detail and `DECISION-050` has the
replacement: re-export everything and diff the bytes, which works because `image-treat.mjs`
is deterministic. 114 of 131 came out byte-identical; the 17 that did not were exactly the
sources that had changed, six of which had never been picked up.

### Task 6, and what `MILESTONE-013` got wrong

The big-type email footer was the owner's own pick from three options a session ago, and it
was a bad recommendation to have put in front of them. A 27-character Gmail address set at
44px is not a wordmark: it is a long lowercase string with a dot and an `@` in it, it wraps on
a phone, and it makes the loudest thing on the page a piece of plumbing. The footer is
conventional again and still about 240px against the original 380 — the height that went is
air, not content.

### Verification

`npm run build` green. `npm run lint` clean (two pre-existing `react-refresh` warnings, one
pre-existing `exhaustive-deps`; two more disappeared with `Scrapbook` and `Tile`).
`node scripts/content-audit.mjs` green, now auditing 48 collage slots instead of 47 phantom
category items. `node scripts/verify/run.mjs images` green across 26 routes at device pixel
ratios 1, 2 and 3. Chrome checks of the hover tag, the stepping viewer and the footer at
1440 x 900.
