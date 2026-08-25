import type { SectionImage } from "@/lib/caseStudies/types";
import Media from "@/components/ui/Media";
import { captionText } from "@/lib/caption";

/**
 * One case-study image slot.
 *
 * With a `src` it is a real figure: the image plus a readable caption below it.
 * Without one it stays the hatched placeholder with its `[ bracketed label ]`,
 * which is a deliberate part of the visual language (DECISION-006) — and the
 * bracket is the signal that no asset exists yet, so it is not repeated as a
 * caption underneath.
 */
export default function Figure({
  src,
  alt,
  aspect,
  caption,
  className = "",
  sizes,
}: SectionImage & { className?: string; sizes?: string }) {
  if (!src) {
    return <Media aspect={aspect} caption={caption} className={className} />;
  }

  return (
    <figure className={className}>
      <Media
        src={src}
        alt={alt}
        aspect={aspect}
        caption={caption}
        sizes={sizes}
        className="rounded-[10px] border border-card-border"
      />
      <figcaption className="mt-2.5 text-[13px] leading-[1.5] text-ink-secondary">
        {captionText(caption)}
      </figcaption>
    </figure>
  );
}
