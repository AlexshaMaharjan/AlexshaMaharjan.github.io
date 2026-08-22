import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades/lifts every [data-inview] element within the calling page into view
 * as it scrolls into the viewport. Call this once per page component (not
 * globally in the layout) — pages are lazy-loaded, so a layout-level effect
 * keyed on the route would fire before the page's own [data-inview] markup
 * has actually mounted and find nothing. Respects prefers-reduced-motion by
 * skipping the animation (index.css already shows [data-inview] content at
 * rest under that media query).
 */
export function useScrollReveals() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const elements = gsap.utils.toArray<HTMLElement>("[data-inview]");
    if (elements.length === 0) return;

    const tweens = elements.map((el) =>
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        },
      ),
    );

    return () => {
      tweens.forEach((t) => t.scrollTrigger?.kill());
      tweens.forEach((t) => t.kill());
    };
  }, []);
}
