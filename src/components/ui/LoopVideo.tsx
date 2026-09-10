import { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/Image";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A short clip that plays itself, quietly (`DECISION-026`).
 *
 * This is the opposite end of `ui/Video`, which exists for a 12 MB Blender
 * walkthrough that must not be fetched until someone asks (`DECISION-022`).
 * A scrapbook clip is a few hundred kilobytes and its whole job is to move on
 * its own, so the rules are inverted — but three of them are not negotiable:
 *
 * **Muted, always.** A page that makes noise on its own is indefensible, and
 * every browser blocks unmuted autoplay anyway.
 *
 * **Nothing plays under `prefers-reduced-motion`.** The poster stays, and no
 * `<video>` element is ever created — so the clip is not even downloaded.
 * `DECISION-008`'s rule is about unsolicited movement, and this is exactly
 * that.
 *
 * **Nothing plays until it is on screen**, and it stops again when it leaves.
 * Eleven clips decoding at once on a gallery page is a real cost, and a clip
 * playing where nobody can see it is pure waste.
 *
 * The poster carries the tile until the first frame is ready, so a slow clip
 * degrades to a still image rather than to a black rectangle.
 */
export default function LoopVideo({
  src,
  poster,
  alt,
  sizes,
  paused = false,
}: {
  src: string;
  poster: string;
  alt: string;
  sizes?: string;
  /** The page's motion control (WCAG 2.2.2) stops every clip. */
  paused?: boolean;
}) {
  const [enabled, setEnabled] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [ready, setReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Read the media query on the client only — the prerender has no window, and
  // baking "motion is fine" into the HTML would be wrong for half of readers.
  useEffect(() => setEnabled(!prefersReducedMotion()), []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry?.isIntersecting ?? false), {
      rootMargin: "200px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  const shouldPlay = enabled && onScreen && !paused;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      // A muted autoplay can still be refused; there is nothing to recover, so
      // swallow it and leave the poster showing.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldPlay]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {/* Always present, so the tile is never empty and never black. */}
      <Image src={poster} alt={alt} sizes={sizes} className="object-cover" />
      {enabled && onScreen && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
