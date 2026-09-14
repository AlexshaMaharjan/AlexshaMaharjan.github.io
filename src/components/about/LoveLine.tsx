import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * "I love ___", with the blank changing.
 *
 * ## Centred means the words are centred
 *
 * This line has two things it can hold still and it cannot hold both: the
 * position of "I love", or the centre of the sentence. The words are different
 * widths, so whichever one is pinned, the other moves.
 *
 * An earlier pass tried pinning "I love" — the blank was measured once against
 * the longest word and then never resized, so the sentence had one width and
 * nothing shifted. It is stable and it looks wrong: "learning new things" is
 * nearly twice the width of "crafting", so four words out of five sat with a
 * slab of reserved emptiness after them and the ink landed visibly left of the
 * page's centre. Stable, and not centred, which is the half the owner asked
 * for.
 *
 * So the blank is the width of the word actually in it, and that width is
 * **transitioned** rather than set. The line re-centres over 400ms on an ease
 * that starts fast and settles, which reads as the sentence breathing rather
 * than as "I love" being dragged sideways — the thing that made the original
 * version, which cut the width with no transition at all, feel like a glitch.
 *
 * The measurement is re-taken on resize and once the webfont has loaded:
 * `text-feature` is a `clamp()`, so a word is a different number of pixels wide
 * on a phone than on a desktop, and the fallback's metrics are not Inter's.
 *
 * ## The switch
 *
 * The word rises about a third of its own height and fades as it goes; the next
 * comes up from the same distance below, while the blank is still widening
 * underneath it. Both halves are transform and opacity, so the only thing that
 * touches layout is the one width, deliberately.
 *
 * Under `prefers-reduced-motion` the global rule in `index.css` flattens every
 * duration here, so the word is replaced and the width simply changes.
 *
 * ## What a screen reader gets
 *
 * The whole list, once, as one sentence — and the animated half is
 * `aria-hidden`. A live region announcing "designing… creating… painting…" on a
 * four-second loop would be reading a decoration out loud forever.
 */

/** How long each word is held, how long the swap takes, how long the line takes to re-centre. */
const HOLD_MS = 2600;
const SWAP_MS = 260;
const WIDTH_MS = 400;

export default function LoveLine({ intro, words }: { intro: string; words: string[] }) {
  const [index, setIndex] = useState(0);
  /*
   * Which word's width the blank is currently holding.
   *
   * It is not `index`, and the difference is the whole reason the two states
   * exist: the blank starts moving to the *next* word's width at the moment the
   * current one begins to fade, a quarter of a second before that word arrives.
   * Tying the width to `index` instead meant the new word mounted at full size
   * into a blank that had not started widening yet, and its tail was clipped
   * for the first half of the transition — "learning new thing".
   *
   * The word that is on its way out gets clipped instead, which is free: it is
   * already at a third of an em up and most of the way to transparent.
   */
  const [slot, setSlot] = useState(0);
  const [shown, setShown] = useState(true);
  const [widths, setWidths] = useState<number[]>([]);
  const indexRef = useRef(0);
  const slotRef = useRef<HTMLSpanElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const key = words.join("|");

  /*
   * Every word's width, with its full stop, measured in the font it is drawn
   * in.
   *
   * A mirror span rather than a canvas measurement: the word is styled by the
   * cascade — the size is a `clamp()` on the paragraph, the tracking is
   * `-0.025em` — and copying the computed font properties onto a span is the
   * only way to be sure the thing measured is the thing drawn.
   */
  useLayoutEffect(() => {
    const measure = () => {
      const mirror = mirrorRef.current;
      const slot = slotRef.current;
      if (!mirror || !slot) return;
      const style = getComputedStyle(slot);
      mirror.style.fontSize = style.fontSize;
      mirror.style.fontFamily = style.fontFamily;
      mirror.style.fontWeight = style.fontWeight;
      mirror.style.letterSpacing = style.letterSpacing;

      const next = words.map((word) => {
        mirror.textContent = `${word}.`;
        // One pixel of slack: a sub-pixel advance rounded down is the
        // difference between a word fitting and its full stop being clipped.
        return Math.ceil(mirror.getBoundingClientRect().width) + 1;
      });
      if (next.every((w) => w > 1)) setWidths(next);
    };

    measure();
    window.addEventListener("resize", measure);
    // Inter arrives after first paint on a cold load, and it is not the same
    // width as the system fallback it replaces.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let swap: ReturnType<typeof setTimeout> | undefined;

    const tick = setInterval(() => {
      const next = (indexRef.current + 1) % words.length;
      indexRef.current = next;

      if (reduced.matches) {
        setSlot(next);
        setIndex(next);
        return;
      }

      // The blank leads; the word follows a swap later.
      setSlot(next);
      setShown(false);
      swap = setTimeout(() => {
        setIndex(next);
        setShown(true);
      }, SWAP_MS);
    }, HOLD_MS);

    return () => {
      clearInterval(tick);
      if (swap) clearTimeout(swap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <p className="m-0 text-center text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold tracking-[-0.025em] [hyphens:none]">
      {/* The sentence, whole, for anyone not watching it. */}
      <span className="sr-only">{`${intro} ${words.join(", ")}.`}</span>

      <span aria-hidden="true" className="flex flex-col items-center justify-center sm:inline-flex sm:flex-row sm:items-baseline whitespace-nowrap px-1">
        <span className="block text-ink">{intro}</span>
        <span
          ref={slotRef}
          /*
           * `overflow-hidden` only matters for the 400ms the width is moving:
           * the incoming word is already at its full width while the blank is
           * still catching up, and without this its last letter would hang past
           * the end of the line. `pb`/`-mb` give the clip somewhere to put the
           * descenders of `designing` and `painting`, which a box exactly one
           * line tall would cut off.
           */
          className="relative mt-1 -mb-[0.3em] inline-block overflow-hidden pb-[0.3em] text-center align-baseline text-accent sm:mt-0 sm:ml-[0.28em] sm:text-left"
          style={{
            // Before the first measurement there is no width to animate to;
            // `auto` lets the line render correctly on the very first paint and
            // on any browser where the measurement fails.
            width: widths[slot] ?? "auto",
            transition: `width ${WIDTH_MS}ms cubic-bezier(.2,.75,.2,1)`,
          }}
        >
          {/*
            Keyed on the index, so the word that arrives is a new element and
            `love-word-in` runs it up from below. Flipping `shown` swaps the
            animation for `love-word-out`, which takes the same element up and
            away — and then the key changes and the next one mounts under it.
          */}
          <span
            key={index}
            className="inline-block"
            style={{
              borderBottom: "3px solid #E1E7FF",
              animation: `${shown ? "love-word-in" : "love-word-out"} ${SWAP_MS}ms cubic-bezier(.2,.75,.2,1) both`,
            }}
          >
            {words[index]}.
          </span>
        </span>
      </span>

      <span
        ref={mirrorRef}
        aria-hidden="true"
        className="invisible absolute left-[-9999px] top-0 whitespace-pre"
      />
    </p>
  );
}
