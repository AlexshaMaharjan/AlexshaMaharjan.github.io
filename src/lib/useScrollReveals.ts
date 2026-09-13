import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  atRest,
  prefersReducedMotion,
  revealVariant,
  revealed,
  stagger,
  staggerText,
  TRIGGER_START,
  type RevealVariant,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The timings live in `@/lib/motion` (`SUGGESTION-006`). What stays here is the
 * one thing specific to reveals: they hold elements at `opacity`, never at
 * GSAP's `autoAlpha`, which also sets `visibility: hidden`. A hidden subtree is
 * removed from the tab order, so a control inside a section that had not been
 * revealed yet was unreachable by keyboard — the playground's pause button was
 * (`ISSUE-030`). At-rest elements are below the fold by definition, so being
 * nominally clickable while invisible costs nothing, and the `focusin` handler
 * below covers the case where focus reaches one anyway.
 */
function revealTargets(): HTMLElement[] {
  return gsap.utils.toArray<HTMLElement>("[data-inview]");
}

/** What a reveal animates: the element itself, or its children for `stagger`. */
function subjectsOf(el: HTMLElement, variant: RevealVariant): HTMLElement[] {
  return variant === "stagger" || variant === "text"
    ? (Array.from(el.children) as HTMLElement[])
    : [el];
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
    for (const el of revealTargets()) {
      const variant = revealVariant(el.dataset.inview);
      gsap.set(subjectsOf(el, variant), atRest(variant));
    }
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

    // Triggers are measured against a layout that is still settling: webfonts
    // reflow the text under them, and an image without width/height (ARCH-05)
    // resizes its section when it decodes. Re-measure once both have.
    let refreshed = false;
    const refresh = () => {
      if (!refreshed) ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);

    const tweens = elements.map((el) => {
      const variant = revealVariant(el.dataset.inview);
      return gsap.fromTo(subjectsOf(el, variant), atRest(variant), {
        ...revealed(variant),
        /*
         * A group arrives as a group: one trigger on the container, its
         * children following each other in. Text waits longer between its
         * children than a grid does — see `staggerText`.
         */
        stagger: variant === "text" ? staggerText : variant === "stagger" ? stagger : 0,
        scrollTrigger: { trigger: el, start: TRIGGER_START },
      });
    });

    /** element → the tween holding it at rest, so focus can complete it. */
    const tweenFor = new Map(elements.map((el, i) => [el, tweens[i]!]));

    // Keyboard focus can outrun the scroll position — tabbing moves focus into
    // a section before the trigger for it has fired. Reveal it there and then,
    // so focus never lands on something invisible (WCAG 2.4.7).
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      const section = target?.closest?.("[data-inview]") as HTMLElement | null;
      if (!section) return;
      // Completing the tween rather than setting the properties: the trigger
      // would otherwise still be armed and would replay the reveal from
      // opacity 0 the moment the section scrolls past its start, flashing the
      // control the visitor is focused on.
      tweenFor.get(section)?.progress(1);
    };
    document.addEventListener("focusin", onFocusIn);

    return () => {
      refreshed = true;
      window.removeEventListener("load", refresh);
      document.removeEventListener("focusin", onFocusIn);
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [pathname]);
}
