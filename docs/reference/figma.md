# The Figma file

The owner's design file. **Two sessions have now had to go looking for this key**, so it is
written down.

| | |
| --- | --- |
| File | `Portfolio` |
| Key | `XbDJCMe6BplwiwcfbVqxSn` |
| URL | `https://figma.com/design/XbDJCMe6BplwiwcfbVqxSn/Portfolio` |

## The pages

| Page | Node id | What is on it |
| --- | --- | --- |
| Page 1 | `0:1` | Everything else — a very large working canvas: hero drafts, three case-study boards, inspiration frames, slide decks |
| Page 2 | `1:3` | **The four playground collage frames** with the owner's annotations on them, and **the `Process` frame** |

## The `Process` frame (SESSION-043)

| | |
| --- | --- |
| Node id | `310:736` (its one child, `310:737`, is named "My design process") |
| Size | **1512 × 868** |
| Implemented by | `MILESTONE-013` task 2 |

The owner's redesign of the whole process board. It is what `components/process/` draws.

**It is 1512 × 868 and the map in code is 1440 × 900**, so nothing in it can be copied as a
coordinate. Read every position as a **fraction of the frame** and lay it onto the map:
`x / 1512 × 1440`, `y / 868 × 900`. The frame is a MacBook viewport, which is what the owner
sees the pinned map at; the map's own 1440 × 900 is letterboxed inside it by
`max(0.5, min(W/1440, H/900))`.

Its own structure, so the geometry can be re-derived without reopening the file:

| Child | Node id | x, y, w, h (frame-local) |
| --- | --- | --- |
| Question text | `310:739` | `536, 417, 440, 35` |
| Connector group | `310:742` | `61.6, 0, 1388.8, 868` |
| Step 1 · Understand | `310:763` | `124.3, 95.7, 563.2, 201.8` |
| Step 2 · Define | `310:862` | `824.5, 95.7, 563.2, 186.8` |
| Step 3 · Explore | `310:913` | `59.4, 403, 451, 429` *(inside `310:742`, so add 61.6 to x)* |
| Step 4 · Design | `310:1042` | `871.4, 403, 451, 416` *(same)* |
| Step 5 · Refine | `310:1139` | `586, 596, 339.5, 236` |

The five connectors, also inside `310:742` (add 61.6 to every x):

| Vector | x, y, w, h |
| --- | --- |
| Top left `310:743` | `386.8, 329.4, 119.6, 59.8` |
| Top right `310:744` | `883.1, 329.4, 119.6, 59.8` |
| Bottom left `310:1373` | `386.8, 540.2, 119.6, 59.8` |
| Bottom right `310:1378` | `883.1, 540.2, 119.6, 59.8` |
| To step 05 `310:747` | `694.4, 483.4, 0.36, 77.6` |

**The trap in these**: the four outer strokes are 120 × 60 and they stop in open black. They
do **not** reach the clusters they point at. A stroke that reaches the thing it connects to
is the obvious drawing and it is not the one in the file.

Widths and insets were deliberately *not* taken from the frame — see `MILESTONE-013` task 2
for why. Its clusters are inset 8.2% where the map's are 4.5%, because its contents are drawn
smaller relative to a wider frame.

### Page 2's frames

The four collages the playground deck is traced from (`DECISION-027`), each 16000 × 10000 in
the design's own units — which is exactly what `lib/playground/collage.ts` stores, unconverted.

| Frame | Node id | Card |
| --- | --- | --- |
| Frame 1 | `250:599` | `01` — warm work |
| Frame 2 | `250:600` | `02` — blue work |
| Frame 3 | `250:601` | `03` — dark work |
| Frame 4 | `250:602` | `04` — pink and lilac work |

## The annotations (SESSION-042)

The owner added **ten blue arrows and ten "example text" boxes** to those frames — three each
on frames 1, 3 and 4, two on frame 2 — as a brief for `MILESTONE-012`. They are the source of
every `prefer` in `collage.ts` and of `BOW` in `placeScribbles.ts`. See `DECISION-039` for what
was taken from them and, just as importantly, what was not.

The text boxes, in frame-local design units, so the corners can be re-derived without
reopening the file:

| Frame | Text boxes (`x, y, w, h`) |
| --- | --- |
| 1 | `1665, 8752, 1493, 483` · `12585, 8695, 1506, 483` · `12540, 1210, 2315, 483` |
| 2 | `1746, 8380, 1676, 483` · `11992, 2353, 1506, 483` |
| 3 | `1046, 1887, 1661, 483` · `13152, 8156, 1505, 483` · `13904, 1965, 1505, 483` |
| 4 | `1354, 1613, 1583, 483` · `1622, 8901, 2203, 483` · `13339, 2687, 1680, 483` |

## Two traps in the MCP tools

- **`get_metadata` with no `nodeId` lists "Page 1" only.** It looks like a single-page file and
  is not. Pass the page id directly.
- **`get_metadata` on page 1 is ~890,000 characters** and will be written to a file rather than
  returned. Query a frame, not the page, unless you mean it.
