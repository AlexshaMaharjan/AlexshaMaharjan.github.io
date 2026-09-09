# SESSION-031 — The bento becomes six cards, and the kitchen gets a cover

Date: 2026-09-09
Branch: `milestone-003-content-model`
Asked for: *"i still dot like the benti boxes design, it looks really bad. what dio you suggest?"*
— then, of the replacement: *"I like this look but i dont like the text below the images/cards.
i think title is not needed because it is already there in the title image, for 3d kitchen, for
now make similar title image with the existing images."*

## Two sessions were spent on the wrong axis

SESSION-030 answered the first rejection by re-colouring the tiles: dark project tints out, pale
washes in. The second rejection came straight back. That is the point at which the treatment
stops being the thing to adjust.

Read close up at 1440px, the faults had nothing to do with colour:

1. **The category label sits centred at the top of every tile regardless of what is underneath.**
   "Interaction Design" across the Sync FM screens, "Brand & Print" across the paper crane.
2. **Titles compete with the thing they name** — "WikiMind" over the WikiMind logo.
3. **`object-cover` crops each image to whatever shape its `gridArea` happens to be.** Tiles read
   as broken screenshots: `gami is much / nore fun together / nity`, a cut figure caption
   `…bildung 5: Auswertung der Fragen…`, half-letters.

**Washing the tiles pale did not cause that — it revealed it.** The dark tint had been hiding the
mess. Which is why the first fix made things look worse rather than better, and why re-colouring
again would have failed too.

## `DECISION-021` — nothing on an image, nothing cropped

Six project cards, one per project. The cover is shown **whole at its own aspect** in a rounded
bordered box, and — after the owner's second note — **the card carries no text at all.** Five of
the six covers are designed title cards from the owner's folders; they already name their project,
so a name underneath said it twice. The same fault as the bento, in miniature.

The link still needs a name for anyone not looking at it. Without one the accessible name falls
back to the cover's `alt`, which describes the picture rather than the destination, so the `<a>`
carries `aria-label="{name} — {tags}"`. A screen reader hears "AFONO — Branding, E-commerce,
Graphic Design" rather than "the AFONO shop and size finder in two browser windows".

Rows are justified by `@/lib/justify`, **extracted from `SectionMedia`** so the homepage and the
case studies cannot drift apart — a row of covers with different aspects still shares one height.

`imageAspect` came back to `ProjectCopy`, removed in SESSION-025 as dead. The whole point of these
cards is that a cover renders at its own proportions, so it is now the field the layout depends
on. Worth noting rather than quietly re-adding: "dead" meant "dead for the design we had".

## The kitchen cover

Five projects had designed covers and the kitchen did not, so its card was visibly the odd one
out — a 16/7.5 PDF crop against five 16/9 title cards.

`scripts/cover.mjs` composes one to match: pale ground, project name, one-line subtitle, the work
bleeding off the right edge. It **copies a layout rather than inventing one**, and it should be
replaced if the owner makes a real one.

The render inside it needed picking rather than taking. The old hero was **two Blender viewport
screenshots side by side, one with the axis gizmo still in frame.** The cover uses
*"Rollstuhlfahrerin sitzt an Arbeitsplatte"* from page 22, re-rendered at scale 5 and cropped to
exclude the gizmo — checked by eye at full size, because the gizmo survived the first crop.

## The bento is gone

Once the cards were approved: `BentoGrid.tsx`, `selectedWork.bento[]`, the `BentoTile` type and
**all eleven tile images** — 247 KB of originals plus 22 variants. `image-manifest.mjs` reports
the homepage from `projects[]` now, so a card's image is the same file its case study opens with
and there is no second copy to keep in step.

`check: "bento"` survives in `image-treat.mjs` with nothing using it. Left in place: it is nine
lines, and the two sessions of measurement behind its threshold are the kind of thing that is
cheap to keep and expensive to rediscover.

**150 slots, 89 filled** — the homepage went from 11 slots to 6, so the totals fall while nothing
was lost.

## Verified against the production build

- routes 36/36, four negative paths correctly 404
- images at dpr 1, 2 and 3 — 0 broken, 0 missing `alt`, 0 failed requests, counts identical
- axe 0 violations — including the cards, which now have no visible text
- 0 overflow at 390px; reduced motion static and visible
- `tsc` clean; lint 0 errors, the same 3 pre-existing warnings
- `content-audit.mjs` clean; `image-manifest.mjs` exits 0 on en/de parity
- The grid read at 1440px after each of the three iterations

## Still open

- **The playground — 39 slots, and the only surface with no supplied imagery at all.**
- Kitchen's textured render and animation; QIS's seven remaining figures
- `ISSUE-037`, `ISSUE-035`, `ISSUE-034`, `ISSUE-033`, `ISSUE-032`, `ISSUE-031`, `ISSUE-006`
- **Nothing pushed.** 49 commits ahead of `main` before this one.
