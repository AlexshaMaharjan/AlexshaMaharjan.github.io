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
  fit = "cover",
  focus,
}: {
  src: string;
  poster: string;
  alt: string;
  sizes?: string;
  /** The page's motion control (WCAG 2.2.2) stops every clip. */
  paused?: boolean;
  fit?: "cover" | "contain";
  focus?: string;
}) {
  const [enabled, setEnabled] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [inActiveZone, setInActiveZone] = useState(false);
  const [ready, setReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Read the media query on the client only — the prerender has no window, and
  // baking "motion is fine" into the HTML would be wrong for half of readers.
  useEffect(() => setEnabled(!prefersReducedMotion()), []);

  // Pre-load video element once element is near the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasLoaded(true);
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  // Check if video is in the active playback zone (middle ~70% on mobile, viewport on desktop)
  useEffect(() => {
    if (!enabled) return;

    let rafId: number | null = null;
    const checkActiveZone = () => {
      const el = wrapRef.current;
      if (!el) return;

      const isMobile = window.innerWidth <= 768;
      const H = window.innerHeight;
      const rect = el.getBoundingClientRect();

      // Outside basic viewport bounds
      if (rect.bottom <= 0 || rect.top >= H) {
        setInActiveZone(false);
        return;
      }

      if (!isMobile) {
        // Desktop: plays whenever visible on screen
        setInActiveZone(true);
        return;
      }

      // Mobile: only plays in the middle ~70% of viewport height (between 15% and 85%)
      const topCutoff = 0.15 * H;
      const bottomCutoff = 0.85 * H;
      const midY = rect.top + rect.height / 2;
      const inMiddle70 =
        (midY >= topCutoff && midY <= bottomCutoff) ||
        (rect.bottom > topCutoff && rect.top < bottomCutoff && rect.height >= 0.5 * H);

      if (!inMiddle70) {
        setInActiveZone(false);
        return;
      }

      // Check if occluded by another card in the card stack
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let occluded = false;
      if (cx >= 0 && cx <= window.innerWidth && cy >= 0 && cy <= H) {
        const topEl = document.elementFromPoint(cx, cy);
        if (topEl && topEl !== el && !el.contains(topEl) && !topEl.contains(el)) {
          const currentCard = el.closest("[data-stack-card]");
          const topCard = topEl.closest("[data-stack-card]");
          if (topCard && currentCard && topCard !== currentCard) {
            occluded = true;
          }
        }
      }

      setInActiveZone(!occluded);
    };

    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkActiveZone();
      });
    };

    checkActiveZone();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [enabled]);

  const shouldPlay = enabled && inActiveZone && !paused;

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
      <Image
        src={poster}
        alt={alt}
        sizes={sizes}
        className={fit === "contain" ? "object-contain" : "object-cover"}
        style={focus ? { objectPosition: focus } : undefined}
      />
      {enabled && (hasLoaded || inActiveZone) && (
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
          className={`absolute inset-0 h-full w-full ${
            fit === "contain" ? "object-contain" : "object-cover"
          } transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={focus ? { objectPosition: focus } : undefined}
        />
      )}
    </div>
  );
}
