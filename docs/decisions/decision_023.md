# DECISION-023 — The playground carries five categories, in the owner's order

Status: Active
Date: 2026-09-10 (SESSION-033)
Scope: `src/lib/playground/`

## Context

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

## Decision

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

## The order leads with two empty categories, deliberately

Positions 1 and 2 are the only categories with no supplied imagery: Games and
Applications has none at all, and Photography, Animation and 3D has two of seven.
A visitor's first two category cards therefore lead to mostly hatched pages.

**This was put to the owner and confirmed.** It is a statement about what the
playground is going to be rather than a summary of what it currently holds, and
the hatched card is an existing, deliberate device (`DECISION-006`) rather than a
broken image. It stops being a cost the moment source material arrives — which is
the only thing either category is waiting on.

## The real cost: five files that had to agree, and nothing checking them

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

## Related

- `DECISION-006` — the hatched placeholder, and why an empty slot is shown rather than hidden
- `DECISION-021` — the same "nothing sits on an image" reasoning, applied to the homepage
- `ISSUE-038` — the unplaced files; part 2 closes here
