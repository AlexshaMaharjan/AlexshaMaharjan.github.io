import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { duration, prefersReducedMotion } from "@/lib/motion";

/**
 * Fades a page in on arrival (`SUGGESTION-007`).
 *
 * **Enter only.** An exit animation has to hold the outgoing tree on screen
 * while the incoming one mounts, which puts it in a fight with the scroll reset
 * and the reveals over the same frame (`DECISION-013`, `DECISION-008`) — and
 * this site changes routes into a scroll position, not into a blank slate.
 *
 * **Opacity only, and no key on the subtree.** A transform would make this the
 * containing block for the case-study contents rail and break its stickiness,
 * and keying the subtree by pathname would remount every page — which is
 * exactly the behaviour the scroll hooks are written *around* (`ARCH-01`).
 * Animating the wrapper leaves the tree, and the hooks, alone.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const animation = element.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: duration.base * 1000, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" },
    );
    return () => animation.cancel();
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
