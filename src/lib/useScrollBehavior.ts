import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const STORAGE_KEY = "am:scroll-positions";

/** How long to keep waiting for a lazy page to paint before giving up on a scroll target. */
const SETTLE_TIMEOUT_MS = 2000;

/** Consecutive unchanged frames that count as "the incoming page has stopped moving". */
const SETTLE_FRAMES = 5;

function readStoredPositions(): Record<string, number> {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    // sessionStorage throws in private mode. Restoring after a reload is a
    // nicety, so an empty map is a perfectly good answer.
    return {};
  }
}

/** Scroll offset per history entry, keyed by `location.key`. */
const positions: Record<string, number> = readStoredPositions();

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scrolls to `top` and reports whether it landed there.
 *
 * "instant" is load-bearing, and is not the same as the default "auto": "auto"
 * means *defer to the CSS*, and index.css sets `html { scroll-behavior:
 * smooth }`. Under "auto" a route change animates as a long sweep back up the
 * page the visitor just left, the scroll is still in flight when this returns,
 * and anything measuring the page afterwards — the scroll reveals, notably —
 * reads the outgoing offset.
 */
function jumpTo(top: number): boolean {
  window.scrollTo({ top, left: 0, behavior: "instant" });
  return Math.abs(window.scrollY - top) <= 1;
}

/**
 * The scroll offset that puts `target` under the fixed header, taken from
 * layout rather than from the element's rendered box.
 *
 * That distinction matters: a section that has not revealed yet is translated
 * down by the scroll-reveal at-rest state (`DECISION-008`), so `scrollIntoView`
 * and `getBoundingClientRect` aim at wherever the reveal animation happens to
 * be at that instant. The landing then ends up short by however much of the
 * tween was left — up to 18px, and differently on each load. `offsetTop` is
 * unaffected by the element's own transform, so this is stable while the
 * reveal runs.
 *
 * The header offset is `section { scroll-margin-top }` in index.css, read back
 * off the element so the value lives in one place.
 */
function scrollTopFor(target: HTMLElement): number {
  let top = 0;
  for (let node: HTMLElement | null = target; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  const headerOffset = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
  return Math.max(0, top - headerOffset);
}

/**
 * Runs `attempt` now, then once per frame until it succeeds or the budget runs
 * out. Pages are lazy (`ARCH-01`), so the element a hash names — or the page
 * height a restored offset needs — often does not exist on the first frame.
 */
function untilReady(attempt: () => boolean, onTimeout?: () => void): () => void {
  if (attempt()) return () => {};

  const deadline = performance.now() + SETTLE_TIMEOUT_MS;
  let frame = requestAnimationFrame(function tick(now) {
    if (attempt()) return;
    if (now < deadline) {
      frame = requestAnimationFrame(tick);
      return;
    }
    onTimeout?.();
  });

  return () => cancelAnimationFrame(frame);
}

/**
 * Owns every scroll side effect of a client-side navigation. React Router does
 * none of this on its own, and the Next.js router this app migrated away from
 * used to (`DECISION-001`):
 *
 * - a new route starts at the top (`ISSUE-003`)
 * - a URL carrying a hash lands on that section, offset for the fixed header by
 *   `section { scroll-margin-top }` in index.css (`ISSUE-002`, `ISSUE-022`)
 * - back and forward return the visitor to where they were (`ISSUE-003`)
 *
 * Positioning runs in a layout effect, so it happens before the browser paints
 * and — because a parent's layout effect runs after its children's — after the
 * incoming page has put its scroll reveals into their at-rest state.
 */
export function useScrollBehavior(): void {
  const location = useLocation();
  const navigationType = useNavigationType();
  const currentKey = useRef(location.key);
  const previousEntry = useRef<{ key: string; pathname: string; hash: string } | null>(null);

  // Take scroll restoration off the browser; the effects below own it.
  useEffect(() => {
    const browserDefault = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = browserDefault;
    };
  }, []);

  // Keep the recorder below pointed at the entry being navigated *to*, so the
  // programmatic scroll further down is filed against the incoming entry rather
  // than overwriting the outgoing one's saved offset.
  useLayoutEffect(() => {
    currentKey.current = location.key;
  }, [location.key]);

  // Remember where the visitor is, so a later back or forward can return them.
  useEffect(() => {
    const record = () => {
      positions[currentKey.current] = window.scrollY;
    };
    const persist = () => {
      record();
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
      } catch {
        // Best effort — see readStoredPositions.
      }
    };

    window.addEventListener("scroll", record, { passive: true });
    window.addEventListener("pagehide", persist);
    return () => {
      window.removeEventListener("scroll", record);
      window.removeEventListener("pagehide", persist);
    };
  }, []);

  useLayoutEffect(() => {
    // Which page the visitor is arriving *from*, or null if there isn't one.
    // Comparing history keys rather than keeping a bare "have I run yet?" flag
    // keeps this idempotent: React re-invokes mount effects in development, and
    // a second invocation for the same entry has to reach the same conclusion
    // as the first, or a freshly loaded /#contact gets treated as a back
    // navigation and never scrolls anywhere.
    const entry = previousEntry.current;
    const cameFrom = entry && entry.key !== location.key ? entry.pathname : null;

    /*
     * Going to an anchor on the page you are already on arrives here as a POP
     * with `cameFrom` set — the same shape as back/forward — so the restore
     * branch below would answer it with a stored offset instead of the anchor
     * (`ISSUE-027`). The offset it finds is not even the visitor's: entries can
     * share a `location.key` of "default", and a scroll the browser starts
     * itself when a tall page is replaced by a short one gets recorded as
     * though someone chose it.
     *
     * A hash that changed while the path did not is unambiguous: the visitor
     * asked for that anchor, whichever direction history is moving. Honour it
     * and let the hash branch do the work.
     */
    const askedForAnAnchor =
      entry !== null &&
      entry.pathname === location.pathname &&
      entry.hash !== location.hash &&
      location.hash !== "";

    previousEntry.current = { key: location.key, pathname: location.pathname, hash: location.hash };

    // Back / forward: put the visitor back where they were. A first load is
    // reported as a POP too, but has no page to have come from.
    if (navigationType === "POP" && cameFrom !== null && !askedForAnAnchor) {
      const restoreTo = positions[location.key] ?? 0;
      let lastHeight = -1;
      return untilReady(() => {
        if (jumpTo(restoreTo)) return true;
        // The page can still be growing as its lazy chunk paints. Once the
        // height stops changing, this is as far as the document goes — stop,
        // rather than fighting the visitor for the rest of the budget.
        const height = document.documentElement.scrollHeight;
        const settled = height === lastHeight;
        lastHeight = height;
        return settled;
      });
    }

    const navState = location.state as { preserveScroll?: boolean; scrollY?: number } | null;
    if (navState?.preserveScroll && typeof navState.scrollY === "number" && !location.hash) {
      const restoreTo = navState.scrollY;
      let lastHeight = -1;
      return untilReady(() => {
        if (jumpTo(restoreTo)) return true;
        const height = document.documentElement.scrollHeight;
        const settled = height === lastHeight;
        lastHeight = height;
        return settled;
      });
    }

    if (!location.hash) {
      jumpTo(0);
      return;
    }

    const id = decodeURIComponent(location.hash.slice(1));
    // Animate the jump only when the visitor can see where it started from.
    // Across a route change the page underneath is entirely new, so a sweep
    // through it reads as a glitch rather than as movement.
    const smooth = cameFrom === location.pathname && !prefersReducedMotion();

    let found = false;
    let lastTop: number | null = null;
    let lastHeight = -1;
    let stillFrames = 0;
    let smoothIssued = false;
    let lastY = -1;

    return untilReady(
      () => {
        const target = document.getElementById(id);
        if (!target) return false;
        found = true;

        const top = Math.round(scrollTopFor(target));

        // A smooth scroll is still running when this returns, so re-issuing it
        // every frame would restart it forever — issue it once, then watch.
        //
        // Watching matters because this is not the only thing scrolling: a
        // fragment navigation makes the browser jump to the element itself,
        // aimed at its *rendered* box, which sits 18px low while the section is
        // still at rest (DECISION-008, ISSUE-027). Whichever of the two lands
        // last, correct it — but only once everything has stopped moving, so
        // this never fights the glide or the visitor.
        if (smooth) {
          if (!smoothIssued) {
            smoothIssued = true;
            window.scrollTo({ top, left: 0, behavior: "smooth" });
          }

          // Wait for stillness rather than for arrival: both scrolls are
          // animated, and ours passes through the right offset on its way while
          // the browser's is still running. Reaching the target is not evidence
          // of having finished there.
          const y = Math.round(window.scrollY);
          stillFrames = y === lastY ? stillFrames + 1 : 0;
          lastY = y;
          if (stillFrames < SETTLE_FRAMES) return false;

          // Everything has stopped. Correct only a near miss — if the visitor
          // scrolled somewhere else entirely in the meantime, that is their
          // position, not ours to take back.
          if (Math.abs(y - top) > 1 && Math.abs(y - top) < 200) jumpTo(top);
          return true;
        }

        jumpTo(top);

        // An instant landing lands short surprisingly often, because the
        // incoming page is usually still growing underneath it — the homepage
        // alone gains ~700px a frame or two later, when its hero swaps to the
        // pinned track (ARCH-04) — which pushes the target further down the
        // document. So re-aim every frame and only stop once neither the
        // target's position nor the page height has moved for several frames
        // running.
        const height = document.documentElement.scrollHeight;
        stillFrames = top === lastTop && height === lastHeight ? stillFrames + 1 : 0;
        lastTop = top;
        lastHeight = height;
        return stillFrames >= SETTLE_FRAMES;
      },
      // A hash naming nothing should still behave like a normal navigation.
      // Running out of frames while tracking a target we did find is fine: the
      // visitor is already on it.
      () => {
        if (!found) jumpTo(0);
      },
    );
  }, [location.key, location.pathname, location.hash, location.state, navigationType]);
}
