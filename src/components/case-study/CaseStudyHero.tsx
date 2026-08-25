import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import Image from "@/components/ui/Image";
import type { CaseStudyContent } from "@/lib/caseStudies/types";
import PlaceholderImage from "@/components/PlaceholderImage";

// Idempotent, and stated here rather than assumed from whichever module
// happened to be imported first.
gsap.registerPlugin(ScrollTrigger);

/**
 * The hero image, and only the image. The title, description and facts moved
 * into the Overview section (`CaseStudyIntro`) on 2026-08-25, so that the
 * contents rail could be on screen when a case study opens rather than
 * arriving after a screenful of scrolling.
 *
 * It now renders inside the reading column rather than across the container,
 * which is the cost of that: ~960px instead of ~1280px at desktop.
 */
export default function CaseStudyHero({ content }: { content: CaseStudyContent }) {
  const mediaRef = useRef<HTMLDivElement>(null);

  /*
   * It drifts a little slower than the page as it leaves
   * (SUGGESTION-008). Scrubbed, so it is tied to the scroll position rather
   * than playing on its own, and transform-only so it cannot cause layout.
   *
   * Keyed on the slug, not on mount: React Router reuses this component when
   * only the `:slug` param changes (ARCH-01), and a mount-only effect would
   * leave the next case study's hero attached to the previous one's trigger.
   */
  useLayoutEffect(() => {
    const media = mediaRef.current;
    if (!media || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      media,
      { yPercent: 0, scale: 1 },
      {
        yPercent: 6,
        scale: 1.04,
        ease: "none",
        scrollTrigger: { trigger: media, start: "top top", end: "bottom top", scrub: 0.4 },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(media, { clearProps: "transform" });
    };
  }, [content.slug]);

  return (
    <div ref={mediaRef} className="mb-16 will-change-transform" style={{ aspectRatio: content.heroImage.aspect }}>
      {content.heroImage.src ? (
        <div className="relative h-full w-full overflow-hidden rounded-[10px] border border-card-border bg-surface">
          <Image src={content.heroImage.src} alt={content.heroImage.alt} fill sizes="100vw" priority className="object-cover" />
        </div>
      ) : (
        <PlaceholderImage aspect={content.heroImage.aspect} caption={content.heroImage.alt} className="h-full w-full" />
      )}
    </div>
  );
}
