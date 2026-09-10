import PlaceholderImage from "@/components/PlaceholderImage";
import Image from "@/components/ui/Image";
import { imageVariants } from "@/lib/imageVariants";
import { captionText } from "@/lib/caption";

/**
 * One image slot, anywhere on the site: the real image when a `src` exists, the
 * hatched placeholder when it does not (`DECISION-006`, `ISSUE-007`).
 *
 * The caption is not rendered here — call sites put their own below the box,
 * and the placeholder shows the bracketed label inside itself. `className`
 * reaches the box in both branches, so rounding and width survive the swap.
 */
export default function Media({
  src,
  alt,
  aspect,
  caption,
  className = "",
  priority = false,
  sizes,
  fit = "cover",
}: {
  src?: string;
  alt?: string;
  aspect: string;
  caption: string;
  className?: string;
  priority?: boolean;
  /** The width this slot actually renders at — see `ui/Image`. */
  sizes?: string;
  /**
   * `cover` fills the box and crops whatever does not fit — correct only when
   * `aspect` is the image's own ratio.
   *
   * `contain` fits the whole image inside the box and paints the leftover
   * space in the image's own border colour (`DECISION-025`). Use it wherever
   * one box has to hold images of many shapes.
   */
  fit?: "cover" | "contain";
}) {
  if (!src) {
    return <PlaceholderImage aspect={aspect} caption={caption} className={className} />;
  }

  /*
   * The mat, sampled at build time by `image-variants.mjs`. Doing it here in
   * the browser would mean every card painted white for a frame and then
   * repainted — on a page of 33 cards that is a visible flash. `bg-surface` is
   * the fallback for an image with no generated variants, which is the same
   * case in which `ui/Image` emits no `srcset`.
   */
  const mat = fit === "contain" ? imageVariants[src]?.bg : undefined;

  return (
    <div
      className={`relative overflow-hidden ${mat ? "" : "bg-surface"} ${className}`}
      style={{ aspectRatio: aspect, backgroundColor: mat }}
    >
      <Image
        src={src}
        alt={alt ?? captionText(caption)}
        sizes={sizes}
        className={fit === "contain" ? "object-contain" : "object-cover"}
        priority={priority}
      />
    </div>
  );
}
