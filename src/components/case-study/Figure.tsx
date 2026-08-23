import type { SectionImage } from "@/lib/caseStudies/types";
import PlaceholderImage from "@/components/PlaceholderImage";
import Image from "@/components/ui/Image";

/** `[ moodboard ]` → `moodboard`. Captions are still written bracketed in the data. */
function captionText(caption: string): string {
  return caption.replace(/^\[\s*|\s*\]$/g, "").trim();
}

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
}: SectionImage & { className?: string }) {
  if (!src) {
    return <PlaceholderImage aspect={aspect} caption={caption} className={className} />;
  }

  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden rounded-[10px] border border-[#E4E7EE]"
        style={{ aspectRatio: aspect }}
      >
        <Image src={src} alt={alt ?? captionText(caption)} className="object-cover" />
      </div>
      <figcaption className="mt-2.5 text-[13px] leading-[1.5] text-ink-secondary">
        {captionText(caption)}
      </figcaption>
    </figure>
  );
}
