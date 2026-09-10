import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Media from "@/components/ui/Media";
import { prefersReducedMotion } from "@/lib/motion";
import type { PlaygroundItem } from "@/lib/playground/types";
import { localeHref, type Locale } from "@/lib/i18n";

/**
 * The uniform card box (`DECISION-025`).
 *
 * `3/4` is not a taste choice: the median aspect of the 33 real playground
 * images is 0.762, so a 3/4 box leaves an average of 19% of the card as mat.
 * A square would leave 25% and the 4/3 this used to declare left 34% — except
 * that 34% was not mat, it was **cropped away**, because the box was `cover`.
 */
const BOX = "3/4";

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
  /** The pause control on the playground index (WCAG 2.2.2) stops every row. */
  paused?: boolean;
}) {
  const direction = index % 2 === 0 ? -1 : 1;
  const duration = 74 + index * 4;
  const looped = [...items, ...items, ...items];

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [centred, setCentred] = useState(false);
  const [hovered, setHovered] = useState(false);

  /*
   * ONE ROW MOVES AT A TIME (SESSION-034).
   *
   * Five rows drifting in alternating directions — and accelerating with the
   * wheel, which is what `SUGGESTION-008` asked for — made the page unreadable:
   * the owner's words were "the moving animation is also abit too busy". Worse,
   * the first two categories have no images yet, so two of the five rows were
   * sliding hatched placeholders past.
   *
   * A row now runs only while **the horizontal centre line of the viewport
   * falls inside its own section**, or while the pointer is on it. No parent
   * state and no shared scroll handler are needed for that: the sections are
   * contiguous, so that line is inside exactly one of them, and the rows
   * coordinate themselves. Scrolling reveals the movement one row at a time,
   * and it works on touch, where there is no hover to depend on.
   *
   * The margin describes a line rather than a band on purpose. A band of any
   * real height straddles the boundary between two sections for part of the
   * scroll, and both start moving — measured at 20%, which put two rows in
   * motion at once and was the whole fault being fixed.
   *
   * `SUGGESTION-008`'s scroll-velocity coupling is gone with it. It was a good
   * idea attached to the wrong number of moving things.
   */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion()) return;
    const observer = new IntersectionObserver(([entry]) => setCentred(entry?.isIntersecting ?? false), {
      rootMargin: "-50% 0px -49.9% 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /*
   * The tween is built once and starts paused. GSAP rather than a CSS
   * animation because a paused-and-resumed tween keeps its position, where
   * restarting a CSS animation jumps the row back to the start.
   */
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    // The items are tripled, so a third of the width is one seamless loop.
    const from = direction < 0 ? 0 : -33.3333;
    const to = direction < 0 ? -33.3333 : 0;
    const tween = gsap.fromTo(track, { xPercent: from }, { xPercent: to, duration, ease: "none", repeat: -1 });
    tween.pause();
    tweenRef.current = tween;

    return () => {
      tween.kill();
      tweenRef.current = null;
      gsap.set(track, { clearProps: "transform" });
    };
  }, [direction, duration]);

  const running = !paused && (hovered || centred);
  useLayoutEffect(() => {
    const tween = tweenRef.current;
    if (!tween) return;
    if (running) tween.resume();
    else tween.pause();
  }, [running]);

  return (
    <section ref={sectionRef} className="pb-24">
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
              {/*
                One box, every shape, nothing cropped. The card is
                `basis-[280px]` with `p-3`, so the image is 256px wide at every
                viewport — a constant, not a fraction of one. Without `sizes`,
                `ui/Image` falls back to `100vw` and a 1440px window fetches the
                1600px variant for a 256px card (SESSION-033).
              */}
              <Media
                src={item.src}
                alt={item.alt}
                aspect={BOX}
                fit="contain"
                sizes="256px"
                caption={`[ ${item.caption} ]`}
                className="rounded-[3px]"
              />
              <figcaption className="mt-2.5 px-0.5 font-mono text-[11px] text-ink-muted">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
