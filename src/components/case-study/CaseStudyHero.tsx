import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import Image from "@/components/ui/Image";
import type { CaseStudyContent } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import PlaceholderImage from "@/components/PlaceholderImage";

// Idempotent, and stated here rather than assumed from whichever module
// happened to be imported first.
gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyHero({
  content,
  dictionary,
  locale,
}: {
  content: CaseStudyContent;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);

  /*
   * The hero image drifts a little slower than the page as it leaves
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
    <section className="pt-[var(--page-top)]">
      <div className="container-page">
        <Link
          to={localeHref(locale, "/#work")}
          className="tap-target text-[14px] text-ink-secondary transition-colors hover:text-accent"
        >
          {dictionary.caseStudy.backToProjects}
        </Link>
        <p className="mt-10 font-mono text-[13px] text-accent">
          {content.name} · {content.year || content.type}
        </p>
        <h1 className="mt-4 max-w-[1080px] text-hero font-semibold leading-[1] tracking-[-0.028em] text-ink">
          {content.headline}
        </h1>
        <p className="mt-7 max-w-[1080px] text-[19px] leading-[1.6] text-ink-secondary">{content.summary}</p>
        {content.heroDisclosure && (
          <p className="mt-4 max-w-[1080px] font-mono text-[13px] text-ink-muted">{content.heroDisclosure}</p>
        )}
        <div className="mt-7 flex flex-wrap gap-2">
          {content.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-3 py-[6px] text-[13px] text-ink-secondary">
              {tag}
            </span>
          ))}
        </div>

        <div ref={mediaRef} className="mt-14 will-change-transform" style={{ aspectRatio: content.heroImage.aspect }}>
          {content.heroImage.src ? (
            <div className="relative h-full w-full overflow-hidden rounded-[10px] border border-card-border bg-surface">
              <Image src={content.heroImage.src} alt={content.heroImage.alt} fill sizes="100vw" className="object-cover" />
            </div>
          ) : (
            <PlaceholderImage aspect={content.heroImage.aspect} caption={content.heroImage.alt} className="h-full w-full" />
          )}
        </div>
      </div>
    </section>
  );
}
