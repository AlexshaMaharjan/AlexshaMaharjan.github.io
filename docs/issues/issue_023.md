# ISSUE-023 — Type scale and colour tokens are bypassed, producing visual drift

Status: **Resolved** (SESSION-006, `2880697`)
Priority: Medium
Category: UI/UX / Consistency
Discovered: 2026-08-22 (SESSION-001)
Resolved: 2026-08-23 (SESSION-006)
Last reviewed: 2026-08-23

## Summary

`tailwind.config.ts` defines a considered type scale and colour palette, but components
almost never use them — headings are written as ad-hoc inline `clamp()` values and card
borders as raw hex. The result is many near-but-not-quite-identical sizes across pages,
which reads as inconsistency rather than intent.

## Evidence / Current Behavior

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

## Resolution

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

### What changed visually, deliberately

The homepage's three section headings were three different sizes (66 / 48 / 58px at
1440px) and are now one (66px). About's sub-headings move 34→36px and its biography
heading 40→44px. The résumé, 404 and playground category/project h1s move by 2–8px in the
middle of their range. **Everything else is unchanged to the pixel, including all six case
studies** — verified by diffing computed styles for every h1/h2 on five pages at four
widths, before and after.

### One bug this caught

Naming a font size `page` collides with the `page` **colour** token — `text-page` resolves
to the colour, and About's and Playground's h1 rendered near-white on white. The token is
`page-title`. Anything added to `theme.fontSize` must not share a name with a colour.

## Expected Behavior

One scale, one palette, one container — differences between pages should be deliberate.

## Relevant Files

- `tailwind.config.ts`, `src/index.css`, and essentially every component

## Possible Cause

The port followed the `.dc.html` reference literally, transcribing each file's inline CSS
rather than reconciling them into a system afterwards.

## Possible Solution

Reconcile the five clamps into 2–3 named roles, extend `theme.colors` with the raw hexes
that earn a name, adopt `.container-page` everywhere, then sweep components. Best done as
one deliberate pass rather than opportunistically — see `SUGGESTION-009`.

## Dependencies

Do it after the layout work in `MILESTONE-002`/`003`, or those pages will need sweeping
twice.

## Related

`ARCH-03`, `MILESTONE-007`, `SUGGESTION-009`.
