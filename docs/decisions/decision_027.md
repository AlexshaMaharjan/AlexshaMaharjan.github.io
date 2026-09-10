# DECISION-027 — The playground is a deck of four collages that stack as you scroll

Status: Active
Date: 2026-09-10 (SESSION-035)
Scope: `/playground`
Supersedes: `DECISION-026`'s page shape — the five category sections, the in-page contents
nav, the tinted section washes and `@/lib/tint` on this page. It keeps everything
`DECISION-026` decided about *pictures*: true aspect ratios, autoplaying muted clips with
posters, nothing cropped that need not be.

## Context

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

## Decision

### The page is a title and a deck

The hero is the eyebrow, the heading and the intro, centred. The contents nav, the taped
hero collage, the "currently exploring" line, the closing note and the return link are all
gone.

Below it, four cards, each roughly a viewport tall, stacking as you scroll.

### The stack is CSS, not script

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

### The card contents are traced from Figma, not re-designed

`src/lib/playground/collage.ts` holds each slot's `x/y/w/h` **in the design's own pixels on
its 16000 × 10000 frame**, unconverted, in the design's own paint order. `Collage.tsx` is
the only thing that turns those into percentages. A slot can therefore be checked against
the Figma inspector by reading it, and re-tracing a frame is a copy rather than a
conversion.

Where the design crops a picture off-centre, the slot records the equivalent
`object-position` as `focus`; one piece is turned on its side and records `rotate`.

### Two layouts, chosen by the card's shape

The design is 16:10. A card is a whole viewport tall, so its proportions move with the
window — 1.61 at 1440 × 900, 1.32 at 1920 × 1080, **0.62 on an upright tablet**. Stretching
the collage to fit would silently re-crop forty-eight pictures, so it is *contained*:
`min(100cqw, 160cqh)`, which is `object-fit: contain` written in container-query units.

Below an aspect of 5/4 that leaves the design stranded — measured at 820 × 1180, a
643 × 402 collage inside a 645 × 1067 card — so the same slots run down a masonry instead,
in the same order, three columns narrow and four from 560px of card width. **The switch is a
container query on the card, not a viewport breakpoint**, because it is the card's shape
that decides, not the window's.

### Consequences

- `Scrapbook.tsx` and `Tile.tsx` are no longer rendered. The category data in
  `src/lib/playground/categories/` is **kept and still audited** — it is the only written
  record of the captions and of the slots that are still empty.
- `@/lib/tint` is no longer used by this page.
- `/playground` weighs **2630 KB** at 1440/1x, of which ~1.7 MB is five video clips that
  load only as each comes on screen. That is the page's cost and it is deliberate.
- Range requests were added to `scripts/video-clip.mjs`. Chrome will only seek within what
  it has buffered, and it does not buffer a 151 MB film to oblige: every `--from` past the
  start silently recorded the opening frames instead.
