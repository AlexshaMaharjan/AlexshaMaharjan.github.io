import type { CSSProperties } from "react";
import clsx from "clsx";
import { imageVariants } from "@/lib/imageVariants";

/**
 * Lightweight next/image replacement. Every call site in this project uses the
 * `fill` pattern (absolutely positioned inside a `position: relative` box), so
 * that's the only layout mode implemented.
 *
 * `sizes` used to be accepted and ignored. It is not any more: when
 * `scripts/image-variants.mjs` has generated width variants for a file, this
 * builds the `srcset` from them and `sizes` decides which one the browser
 * fetches (`SUGGESTION-012`). A file with no variants renders as a plain
 * `<img>`, so an image dropped in by hand still works — it just downloads at
 * full size until the script runs.
 *
 * Give `sizes` the width the image actually renders at, not the viewport:
 * a bento tile is a fraction of a 1120px grid, and a case-study hero lives in
 * a ~960px reading column (`DECISION-017`), not the full page.
 */
export default function Image({
  src,
  alt,
  className,
  fill = true,
  sizes,
  priority = false,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  const entry = imageVariants[src];
  const srcSet = entry
    ? [
        ...entry.v.map((w) => `${src.replace(/\.(webp|png|jpe?g)$/i, "")}-${w}.webp ${w}w`),
        `${src} ${entry.w}w`,
      ].join(", ")
    : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? (sizes ?? "100vw") : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={clsx(fill && "absolute inset-0 h-full w-full", className)}
      style={style}
    />
  );
}
