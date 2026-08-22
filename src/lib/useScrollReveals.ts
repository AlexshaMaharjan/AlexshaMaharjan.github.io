import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The at-rest state a [data-inview] element is held in until it scrolls into view. */
const AT_REST: gsap.TweenVars = { autoAlpha: 0, y: 18 };

/** The reveal itself. Lift this out with AT_REST if a shared motion module lands (SUGGESTION-006). */
const REVEALED: gsap.TweenVars = { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" };

const TRIGGER_START = "top 88%";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealTargets(): HTMLElement[] {
  return gsap.utils.toArray<HTMLElement>("[data-inview]");
}

/**
 * Fades/lifts every [data-inview] element within the calling page into view as
 * it scrolls into the viewport. Call this once per page component (not globally
 * in the layout) — pages are lazy-loaded, so a layout-level effect keyed on the
 * route would fire before the page's own [data-inview] markup has mounted and
 * find nothing.
 *
 * Both effects are keyed on the pathname rather than on mount. React Router
 * reuses one component instance when only a route param changes
 * (/work/a -> /work/b, ARCH-01), so a mount-only effect left the incoming
 * page's sections stuck at whatever inline state the outgoing page happened to
 * leave behind — in practice one or two whole sections invisible for good
 * (ISSUE-001).
 *
 * The at-rest state is applied here rather than from CSS so it fails safe: if
 * this module never runs, content is simply visible instead of invisible.
 * Under prefers-reduced-motion nothing is hidden and nothing animates.
 */
export function useScrollReveals(): void {
  const { pathname } = useLocation();

  // Hide before the browser paints, so an incoming page never flashes fully
  // visible. That requires a layout effect, and this one deliberately runs
  // before RootLayout's — a child's layout effect runs before its parent's — so
  // the elements are already at rest when the scroll offset is reset.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.set(revealTargets(), AT_REST);
  }, [pathname]);

  // Build the triggers after paint, by which point RootLayout has put the
  // visitor at the top of the new page, so each trigger is measured against the
  // offset they are actually at.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const elements = revealTargets();
    if (elements.length === 0) return;

    // A trigger's position is evaluated against wherever GSAP believes the page
    // is scrolled to, and GSAP only re-reads that when it processes a scroll
    // event. RootLayout has just moved the page synchronously, so bump its
    // cache rather than depend on that event having been dispatched first — if
    // it has not, every section counts as already passed and the whole page
    // reveals at once instead of on scroll.
    ScrollTrigger.update();

    const tweens = elements.map((el) =>
      gsap.fromTo(el, AT_REST, {
        ...REVEALED,
        scrollTrigger: { trigger: el, start: TRIGGER_START },
      }),
    );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [pathname]);
}
