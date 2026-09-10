import PlaceholderImage from "@/components/PlaceholderImage";
import Image from "@/components/ui/Image";
import { captionText } from "@/lib/caption";

/**
 * One image slot, anywhere on the site: the real image when a `src` exists, the
 * hatched placeholder when it does not (`DECISION-006`, `ISSUE-007`).
 *
 * The caption is not rendered here — call sites put their own below the box,
 * and the placeholder shows the bracketed label inside itself. `className`
 * reaches the box in both branches, so rounding and width survive the swap.
 *
 * **`aspect` must be the image's own ratio.** The box is painted with
 * `object-cover`, so a declared aspect that disagrees with the file is a silent
 * crop — the fault that cost the playground 36% of every picture before
 * `DECISION-025` measured it. Every call site on the site now passes the true
 * ratio, which is why there is no "contain" mode here: nothing needs one.
 */
export default function Media({
  src,
  alt,
  aspect,
  caption,
  className = "",
  priority = false,
  sizes,
}: {
  src?: string;
  alt?: string;
  aspect: string;
  caption: string;
  className?: string;
  priority?: boolean;
  /** The width this slot actually renders at — see `ui/Image`. */
  sizes?: string;
}) {
  if (!src) {
    return <PlaceholderImage aspect={aspect} caption={caption} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden bg-surface ${className}`} style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt ?? captionText(caption)} sizes={sizes} className="object-cover" priority={priority} />
    </div>
  );
}
