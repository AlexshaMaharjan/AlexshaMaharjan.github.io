import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Media from "@/components/ui/Media";
import { prefersReducedMotion } from "@/lib/motion";
import type { PlaygroundItem } from "@/lib/playground/types";
import { localeHref, type Locale } from "@/lib/i18n";

export default function CategoryMarquee({
  index,
  number,
  title,
  caption,
  slug,
  items,
  locale,
  paused = false,
}: {
  index: number;
  number: string;
  title: string;
  caption: string;
  slug: string;
  items: PlaygroundItem[];
  locale: Locale;
  /** Driven by the pause control on the playground index (WCAG 2.2.2). */
  paused?: boolean;
}) {
  const direction = index % 2 === 0 ? -1 : 1;
  const duration = 47 + index * 3;
  const looped = [...items, ...items, ...items];
  const trackRef = useRef<HTMLDivElement>(null);

  const tweenRef = useRef<gsap.core.Tween | null>(null);

  /*
   * The row scrolls on its own, and speeds up with the page (SUGGESTION-008):
   * scroll faster and the rows run faster, which suits the playground's
   * register without asking anything of the visitor.
   *
   * GSAP rather than the CSS animation this used to be, because `timeScale`
   * can be nudged and eased back without restarting the loop — changing
   * `animation-duration` mid-flight jumps the row instead. Under reduced
   * motion no tween is created at all and the row simply sits still.
   */
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    // The items are tripled, so a third of the width is one seamless loop.
    const from = direction < 0 ? 0 : -33.3333;
    const to = direction < 0 ? -33.3333 : 0;
    const tween = gsap.fromTo(track, { xPercent: from }, { xPercent: to, duration, ease: "none", repeat: -1 });
    tweenRef.current = tween;

    let lastY = window.scrollY;
    let settle = 0;

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;

      // Set `timeScale` outright rather than tweening to it: the row should
      // track the wheel, not chase it, and there are six of these on the
      // playground index — a tween per row per scroll event would allocate
      // hundreds of objects a second for a speed change. 1 is the resting
      // speed and the cap stops a flick turning the row into a blur.
      gsap.killTweensOf(tween);
      tween.timeScale(Math.min(3, 1 + delta / 90));

      // Easing back is the one place a tween is worth it, so the row slows
      // down rather than dropping.
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        gsap.to(tween, { timeScale: 1, duration: 0.9, ease: "power2.out", overwrite: true });
      }, 140);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
      gsap.killTweensOf(tween);
      tween.kill();
      tweenRef.current = null;
      gsap.set(track, { clearProps: "transform" });
    };
  }, [direction, duration]);

  /*
   * The pause control stops the row dead rather than slowing it — "paused" has
   * to mean paused for WCAG 2.2.2, whatever the scroll velocity is doing.
   */
  useLayoutEffect(() => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (paused) tween.pause();
    else tween.resume();
  }, [paused]);

  return (
    <section className="pb-24">
      <div className="container-page">
        <span aria-hidden="true" className="mb-2 block font-mono text-[12px] text-accent">
          {number}
        </span>
        <Link to={localeHref(locale, `/playground/${slug}`)} className="inline-block">
          <h3 className="text-lead font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-accent">
            {title}
          </h3>
        </Link>
        <p className="mt-3 max-w-[560px] text-[15px] leading-[1.6] text-ink-secondary">{caption}</p>
      </div>

      <div
        className="mt-[34px] overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)",
          maskImage: "linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)",
        }}
      >
        <div ref={trackRef} data-marquee className="flex w-max gap-4 px-1 py-0.5">
          {looped.map((item, i) => (
            <figure
              key={i}
              className="m-0 shrink-0 basis-[280px] rounded-md border border-card-border bg-white p-3 shadow-[0_1px_4px_rgba(20,30,60,0.05)] transition-colors hover:border-border-muted"
            >
              <Media src={item.src} alt={item.alt} aspect="4/3" caption={`[ ${item.caption} ]`} className="rounded-[3px]" />
              <figcaption className="mt-2.5 px-0.5 font-mono text-[11px] text-ink-muted">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
