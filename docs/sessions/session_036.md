# SESSION-036 — The deck gets its own hand: a raised hero, scribbles, and a viewer

Date: 2026-09-10
Objective: three changes to `/playground`, asked for immediately after SESSION-035 was
deployed.
Decisions: none new — this works inside `DECISION-027`, and extends `DECISION-018`'s
lightbox rather than adding a second one.

## What the owner asked

> "1. the title and description in playground should be bit higher so that the half of the
> card can be visible in the hero page already. 2. in each of the cards, i want scribbles
> like in other pages of the website, for example pointing toways something, some note or
> something relatzed to those pictures. 3. when each of the image is clicked, the image or
> video needs to be expanded with a little description"

## 1. The hero is 56svh, and that is arithmetic

The deck starts at the hero's height `H`; a card is `100svh − header − 40`. Half a card
showing before anyone scrolls wants `H = 100svh − card/2`, which is **56svh**. Measured at
1440 × 900: hero 504px, card 787px, 396px of it on screen — **50%**. In `svh` the ratio
holds at any window height, which is why it is not a pixel value.

## 2. Scribbles

The idiom already existed twice, beside the About portrait: Caveat at a bold weight, tipped
a couple of degrees, and an arrow drawn as one cubic curve with two short strokes for the
head. `components/playground/Scribble.tsx` is that gesture lifted out rather than copied a
third time, and `down-right` is the same path mirrored — so both directions are drawn by
the same hand.

**Ten notes, two or three per card**, written next to the slots they belong with in
`collage.ts`. They are **`aria-hidden`**, like the About pair: the pictures carry their own
alt text and their own captions in the viewer, so a note adds the owner's voice, not
information a screen reader is missing.

**Anchored in the design's coordinates, sized in CSS pixels.** A note travels with the
collage, so it keeps its relationship to what it points at however the stage is contained;
the handwriting does not shrink with it, because handwriting at 14px is not handwriting.
That is also why a card narrower than 900px gets no notes — another container query on the
card, like everything else in this layout — and why the masonry shows the card's first note
in the strip beside its index, without an arrow. There is no clear space to point across a
contact sheet.

**The notes say only what is visible.** Technique and subject, not biography: "acrylic on
canvas", "one weight, no fill", "a whole year, one flower a month". The repository cannot
invent the owner's life and did not try.

### One fault worth keeping

The right-hung notes came out **one word per line**. An absolutely positioned box shrinks to
fit the space between its `left` edge and its container's right edge, so anchoring one at
98% and sliding it back with `translateX(-100%)` gave it 2% of the stage to wrap in. Anchor
the edge you actually mean — `right: 2%` — and the explicit line breaks decide.

## 3. Every slot opens

`ui/Lightbox` already owned the dialog: the scroll lock, the two-element focus trap, the
`z-[210]` that clears the fixed header. It learned two optional props — `video` and
`description` — rather than being duplicated. A clip plays with its controls and skips the
fit/actual-size toggle, because a film has one size and a pannable zoom would only take the
controls away from the pointer.

The description is the slot's own `alt`, and the heading its `caption`; **48 captions were
added to `collage.ts`**, 32 of them lifted from the category data that already held them in
both locales. No prose was invented.

### The fault this one hid

`Opener` — the button wrapping each slot — was first declared **inside** `Collage`. That
makes it a new component type on every render, so opening the viewer remounted all
forty-eight buttons and the node the dialog had been told to return focus to was detached
by the time it tried. Focus landed on `body`: the one thing a dialog must not do, and
invisible unless you go looking. Hoisting `Opener` to module scope fixes it. Verified by
reading `document.activeElement` after close, for an image and for a clip.

## Verification

`npm run verify all`: 22/22 routes, 414 images at DPR 1/2/3 with 0 broken and 0 missing
alt, **axe 0 violations**, 0 overflow, reduced motion clean. Opening, closing and focus
return probed for an image and a clip, in both layouts, in both locales.

**One flake worth recording.** The first `verify all` after the viewer landed reported
`landmark-one-main` and `page-has-heading-one` on `/playground`. Both are the signature the
harness's own header warns about — axe running against the Suspense fallback — and neither
reproduced: 0 violations from a direct probe, from `verify a11y` alone, and from two
subsequent full runs. `goto()` accepts `main` plus any `h1,h2` as proof a page has
rendered, and the layout supplies those before the route's chunk arrives. **On the heaviest
page on the site that window is now wide enough to lose a race.** Tightening `goto()` to
wait for an `h1` specifically is the fix, and it was left undone.

## State at the end

22 routes, `tsc` clean, lint 0 errors, content audit clean. `/playground` **2633 KB** at
1440/1x. Merged to `main`, pushed and deployed.
