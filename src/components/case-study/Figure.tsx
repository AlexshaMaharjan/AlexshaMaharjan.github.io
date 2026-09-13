import { useRef, useState } from "react";
import type { SectionImage } from "@/lib/caseStudies/types";
import Media from "@/components/ui/Media";
import Lightbox from "@/components/ui/Lightbox";
import Video from "@/components/ui/Video";
import { captionText } from "@/lib/caption";

/**
 * One case-study image slot.
 *
 * With a `src` it is a real figure: the image plus a readable caption below it.
 * Without one it stays the hatched placeholder with its `[ bracketed label ]`,
 * which is a deliberate part of the visual language (DECISION-006) — and the
 * bracket is the signal that no asset exists yet, so it is not repeated as a
 * caption underneath.
 *
 * A real figure is also a button that opens it full screen (`Lightbox`). That
 * is a mobile fix before it is a nicety: at 390px a figure renders 350px wide,
 * and several of them — persona cards, component sheets, UI kits — carry type
 * that is simply not readable at that size. Placeholders are not clickable,
 * because there is nothing to enlarge.
 */
export default function Figure({
  src,
  alt,
  aspect,
  caption,
  video,
  className = "",
  sizes,
}: SectionImage & { className?: string; sizes?: string }) {
  const [zoomed, setZoomed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (!src) {
    return <Media aspect={aspect} caption={caption} className={className} />;
  }

  const label = alt ?? captionText(caption);

  /*
   * A film is not zoomable — the lightbox exists so a dense still can be read
   * at full size, and a video has its own full-screen control. So this branch
   * skips the zoom button entirely rather than nesting one interactive element
   * inside another.
   */
  if (video) {
    return (
      <figure className={className}>
        <div
          className="relative overflow-hidden rounded-[10px] border border-card-border bg-surface"
          style={{ aspectRatio: aspect }}
        >
          <Video src={video} poster={src} alt={label} label={label} sizes={sizes} />
        </div>
        <figcaption className="mt-2.5 text-[13px] leading-[1.5] text-ink-secondary">{captionText(caption)}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={className}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setZoomed(true)}
        aria-label={`${label} — view full size`}
        className="block w-full cursor-zoom-in rounded-[10px] outline-offset-4"
      >
        <Media
          src={src}
          alt={alt}
          aspect={aspect}
          caption={caption}
          sizes={sizes}
          className="rounded-[10px] border border-card-border"
        />
      </button>
      <figcaption className="mt-2.5 text-[13px] leading-[1.5] text-ink-secondary">{captionText(caption)}</figcaption>

      {zoomed && (
        <Lightbox
          src={src}
          alt={label}
          caption={captionText(caption)}
          onClose={() => {
            setZoomed(false);
            // Focus belongs back on the figure that opened it, not at the top
            // of the document — otherwise closing loses the reader's place.
            triggerRef.current?.focus();
          }}
        />
      )}
    </figure>
  );
}
