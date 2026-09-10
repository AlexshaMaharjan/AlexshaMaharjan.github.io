import { useState } from "react";
import type { PlaygroundItem } from "@/lib/playground/types";
import Media from "@/components/ui/Media";
import LoopVideo from "@/components/ui/LoopVideo";
import Lightbox from "@/components/ui/Lightbox";

/**
 * One thing on the scrapbook page: a picture, a clip, or a written card
 * (`DECISION-026`).
 *
 * Every tile keeps its **own aspect ratio**. That is the whole point of the
 * rewrite — `DECISION-025` put everything in one 3/4 box because the page was
 * a row of equal cards and a uniform box was the honest way to hold mixed
 * shapes without cropping. A scrapbook has no such constraint: the shapes
 * themselves are the layout, so `object-cover` never crops anything here,
 * because the box it is filling is the picture's own shape.
 */
export default function Tile({
  item,
  sizes,
  paused,
  tilt = 0,
}: {
  item: PlaygroundItem;
  sizes: string;
  paused: boolean;
  /** Degrees. The scrapbook tilts some cards; 0 leaves the card square. */
  tilt?: number;
}) {
  const [open, setOpen] = useState(false);
  const label = item.alt ?? item.caption;

  const card =
    "relative rounded-[6px] border border-card-border bg-white p-2.5 shadow-[0_2px_10px_rgba(20,30,60,0.07)]";
  const style = tilt ? { transform: `rotate(${tilt}deg)` } : undefined;

  /* ---------------------------------------------------------------- a note */
  if (item.note) {
    return (
      <div className={`${card} flex items-center justify-center`} style={style}>
        <p className="px-3 py-4 text-center font-hand text-[21px] leading-[1.45] text-[#3C4A66]">{item.note}</p>
      </div>
    );
  }

  /* --------------------------------------------------------------- a clip */
  if (item.video && item.src) {
    return (
      <figure className={`m-0 ${card}`} style={style}>
        <div
          className="relative overflow-hidden rounded-[3px] bg-surface"
          style={{ aspectRatio: item.aspect }}
        >
          <LoopVideo src={item.video} poster={item.src} alt={label} sizes={sizes} paused={paused} />
        </div>
        <figcaption className="mt-2 px-0.5 font-mono text-[11px] text-ink-muted">
          {item.caption} <span aria-hidden="true">· clip</span>
        </figcaption>
      </figure>
    );
  }

  /* ------------------------------------------------------------- a picture */
  const media = (
    <Media
      src={item.src}
      alt={item.alt}
      aspect={item.aspect}
      sizes={sizes}
      caption={`[ ${item.caption} ]`}
      className="rounded-[3px]"
    />
  );

  if (!item.src) {
    return (
      <figure className={`m-0 ${card}`} style={style}>
        {media}
        <figcaption className="mt-2 px-0.5 font-mono text-[11px] text-ink-muted">{item.caption}</figcaption>
      </figure>
    );
  }

  return (
    <>
      <figure className={`m-0 ${card}`} style={style}>
        {/*
          Click to see it big, rather than click to go somewhere. The owner
          asked for one page with everything on it, so the lightbox
          `DECISION-018` built for dense case-study figures does the job the
          category pages used to.
        */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View larger: ${label}`}
          className="block w-full cursor-zoom-in"
        >
          {media}
        </button>
        <figcaption className="mt-2 px-0.5 font-mono text-[11px] text-ink-muted">{item.caption}</figcaption>
      </figure>
      {open && (
        <Lightbox src={item.src} alt={label} caption={item.caption} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
