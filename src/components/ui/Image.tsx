import clsx from "clsx";

/**
 * Lightweight next/image replacement. Every call site in this project uses the
 * `fill` pattern (absolutely positioned inside a `position: relative` box), so
 * that's the only layout mode implemented. `sizes` is accepted for API
 * compatibility but unused — there's no build-time responsive image pipeline here.
 */
export default function Image({
  src,
  alt,
  className,
  fill = true,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={clsx(fill && "absolute inset-0 h-full w-full", className)}
    />
  );
}
