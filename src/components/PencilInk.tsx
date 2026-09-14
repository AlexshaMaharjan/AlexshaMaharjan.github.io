/**
 * The pencil.
 *
 * Every hand-drawn thing on this site — the two notes beside the About
 * portrait, the nine over the playground collages, the one beside the
 * playground's call to action, the one pointing at each case study's Figma
 * prototype — was drawn with a perfectly smooth vector stroke. The
 * owner's instruction (`MILESTONE-020` task 3) is that they should look
 * "written with pencil/crayon, the rough type", and a Bezier is the one thing
 * a pencil never draws: it has no grain, its edges are exactly parallel, and
 * its ends stop dead.
 *
 * **The roughness is a displacement map, not a jittered path.** Both were
 * tried. Jittering the geometry — walking the curve and nudging each sample —
 * produces a line that is *shaky*, which is what a bad hand looks like rather
 * than what a soft pencil looks like: the wobble is at the scale of the whole
 * stroke and the edges stay parallel. `feTurbulence` into `feDisplacementMap`
 * moves the rendered ink instead, so the two edges of a stroke wander
 * independently and the line thins and thickens the way graphite does on
 * paper. It also costs nothing per frame: nothing here animates, so the filter
 * rasterises once.
 *
 * **The two parameters are in CSS pixels and are converted per drawing, which
 * is the whole reason this is a component and not a constant.**
 * `feTurbulence`'s `baseFrequency` and `feDisplacementMap`'s `scale` are in the
 * *user space of the element being filtered*, and this site's hand-drawn things
 * live in four wildly different user spaces:
 *
 * | | viewBox | drawn at | units per px |
 * | --- | --- | --- | --- |
 * | `HandArrow` `sweep` | 713 x 972 | 52px | ~13.7 |
 * | `HandArrow` `tick` | 120 x 54 | 62px | ~1.9 |
 * | collage arrows | 16000 x 10000 | ~1260px | ~12.7 |
 * | note text (CSS px) | — | — | 1 |
 *
 * One hard-coded `baseFrequency` across that range is not a compromise, it is
 * four different drawings: at the collage's scale a frequency tuned for the
 * `tick` is a wavelength of about nine design units, which is noise far finer
 * than a pixel and renders as nothing at all — and the same frequency the
 * collage needs would leave the `tick` visibly unroughened. Stating the grain
 * in pixels and dividing by the caller's own `unitsPerPx` makes one pencil out
 * of four.
 *
 * **`primitiveUnits` is left at `userSpaceOnUse`** — that is what the
 * conversion above assumes — while `filterUnits` stays at its default
 * `objectBoundingBox`, so the region is a percentage of whatever is being
 * filtered. That is what lets several arrows of different sizes share one
 * `<filter>`: the region is resolved per referencing element, and only the
 * noise field is common to them, which is correct. They are on one sheet of
 * paper.
 */

/**
 * **Two passes, not one** (owner, this session, with a photograph of a crayon
 * drawing: *"i want more, like pencil type — right now the edges are rough"*).
 *
 * One displacement pass can only do one of the two things a crayon does. The
 * first cut used a single 13px wavelength, which is the scale of the whole
 * stroke: it bent the line convincingly and left the **edges** almost parallel,
 * because noise that slow moves both sides of a stroke together. What the
 * owner's reference actually shows is the opposite scale — the centreline is
 * fairly steady and the *edges* break up into fibres, the way wax does when it
 * drags over paper tooth.
 *
 * So the pencil is a chain:
 *
 * 1. **`WOBBLE`** — a slow pass, wavelength about four stroke-widths, which
 *    bends the line the way a hand does. This is roughly what was there before.
 * 2. **`FIBRE`** — a fast pass at a wavelength *smaller than the stroke is
 *    wide*. Because it is finer than the pen, the two edges are displaced
 *    independently, so the stroke frays instead of bending. This is the pass
 *    that was missing, and it is the one doing the work.
 *
 * The fibre pass gets four octaves against the wobble's two: octaves are what
 * put grain inside the grain, and it is the fine pass that wants it.
 */

/** The slow pass: how long one bend is, and how far it carries the line. */
const WOBBLE_WAVELENGTH_PX = 16;
const WOBBLE_JITTER_PX = 2.2;

/**
 * The fast pass: finer than the pen is wide, which is the whole trick.
 *
 * 2.0px against a 3px arrow stroke. Above about 3 — once the wavelength passes
 * the stroke width — the two edges start moving together again and the effect
 * collapses back into more wobble.
 *
 * 1.35px of stray is safe: `placeScribbles` prices arrow clearance to the pixel,
 * and `content-audit` already tolerates 40 CSS px of graze over a picture.
 */
const FIBRE_WAVELENGTH_PX = 2.0;
const FIBRE_JITTER_PX = 1.35;

/**
 * Text takes a lighter hand than a 4px pen.
 *
 * The fibre pass is tuned under the thinnest stroke the hand draws — 1.9px
 * wavelength and 0.9px of stray. Any louder and the fray starts closing the
 * counters of `e` and `a`, which is the point at which texture costs
 * legibility rather than adding character.
 *
 * **These numbers survived the hand going back to Caveat** (SESSION-049). They
 * were set against Caveat Brush, which is an even brush stroke; Caveat is a
 * modulated script whose thins are finer, so this was the one thing worth
 * re-checking. Rendered at 23, 22, 21, 18 and 17px — every size the site sets
 * handwriting at — the counters stay open and the strokes stay joined at all
 * five. Caveat is also *why* the filter reads as a pencil rather than as
 * noise: a script that already varies from thick to thin gives the fray
 * something to vary.
 */
const TEXT_WOBBLE_WAVELENGTH_PX = 11;
const TEXT_WOBBLE_JITTER_PX = 1.1;
const TEXT_FIBRE_WAVELENGTH_PX = 1.9;
const TEXT_FIBRE_JITTER_PX = 0.9;

/**
 * The id every note's text reads, via `filter: url(#…)` in `index.css`.
 *
 * Text is laid out in CSS pixels, so its conversion is the identity and it
 * needs no per-caller instance — one definition mounted once in `RootLayout`
 * serves every note on the site.
 */
const PENCIL_TEXT_FILTER = "pencil-ink-text";

/**
 * One pencil, for one user space.
 *
 * Render it inside the `<defs>` of the SVG whose strokes it roughens, and hand
 * the stroke `filter={`url(#${id})`}`. `unitsPerPx` is how many of that SVG's
 * own user units make one CSS pixel — `viewBox width / rendered width`.
 *
 * `seed` is exposed so that two drawings in one document do not share a grain
 * pattern where that would be visible; it is never random, because a note that
 * re-roughened itself on every render would shimmer. The two passes are given
 * different seeds off that one number, so the fray is not correlated with the
 * bend — two independent accidents rather than one accident twice.
 *
 * The region is generous (`-35%`/`170%`): a filter clips at its own edges, and
 * between them the two passes can carry ink about 4px past where the path was.
 * On a short arrow that is a measurable fraction of the drawing.
 */
export function PencilFilter({
  id,
  unitsPerPx = 1,
  seed = 4,
  text = false,
}: {
  id: string;
  unitsPerPx?: number;
  seed?: number;
  /** Use the lighter parameters tuned for type rather than for a 4px pen. */
  text?: boolean;
}) {
  const units = unitsPerPx > 0 ? unitsPerPx : 1;
  const wobbleWave = text ? TEXT_WOBBLE_WAVELENGTH_PX : WOBBLE_WAVELENGTH_PX;
  const wobbleJitter = text ? TEXT_WOBBLE_JITTER_PX : WOBBLE_JITTER_PX;
  const fibreWave = text ? TEXT_FIBRE_WAVELENGTH_PX : FIBRE_WAVELENGTH_PX;
  const fibreJitter = text ? TEXT_FIBRE_JITTER_PX : FIBRE_JITTER_PX;
  return (
    <filter id={id} x="-35%" y="-35%" width="170%" height="170%" primitiveUnits="userSpaceOnUse">
      {/* 1. The hand: a slow bend across the whole stroke. */}
      <feTurbulence
        type="fractalNoise"
        baseFrequency={1 / (wobbleWave * units)}
        numOctaves={2}
        seed={seed}
        result="wobble"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="wobble"
        scale={wobbleJitter * units}
        xChannelSelector="R"
        yChannelSelector="G"
        result="bent"
      />
      {/* 2. The paper: noise finer than the pen, so the two edges fray apart. */}
      <feTurbulence
        type="fractalNoise"
        baseFrequency={1 / (fibreWave * units)}
        numOctaves={4}
        seed={seed + 5}
        result="fibre"
      />
      <feDisplacementMap
        in="bent"
        in2="fibre"
        scale={fibreJitter * units}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  );
}

/**
 * The document-level pencil, mounted once by `RootLayout`.
 *
 * It holds only the text filter. The stroke filters are per-drawing because
 * their parameters are, and a drawing that carries its own `<defs>` cannot get
 * separated from them — which a single shared sheet of definitions, mounted in
 * a layout three components away, very much can.
 */
export default function PencilInk() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute" focusable="false">
      <defs>
        <PencilFilter id={PENCIL_TEXT_FILTER} seed={9} text />
      </defs>
    </svg>
  );
}
