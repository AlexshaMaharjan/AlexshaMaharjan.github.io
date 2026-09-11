import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";

/**
 * A label that follows the cursor while it is over something.
 *
 * The playground invented this: hovering a picture in a collage grows it and
 * names it beside the pointer, because a piece in a collage is small and there
 * is nowhere to put a caption that is not on top of another picture. The owner
 * asked for the same gesture on the homepage's project cards, so it is a hook
 * rather than a thing `Collage` owns (`MILESTONE-016` task 1).
 *
 * **Two pieces of state with different costs, which is the whole design.** The
 * text changes once per element and is React state. The *position* changes on
 * every pointer event and is written straight onto the node — re-rendering a
 * dozen pictures to move a label two pixels is not a trade worth making. The
 * node is always mounted so the first `pointerenter` has somewhere to put the
 * coordinates; rendering it with the label would place it at 0,0 for one frame
 * before the first move.
 *
 * **Mouse only.** A touch "hover" is a tap on its way to opening something, and
 * a pen is no better placed to read a label under its own nib. `.pg-cursor-tag`
 * also hides itself under `@media (hover: none)`, so this is belt and braces.
 *
 * `aria-hidden`: every caller's element already has an accessible name that says
 * the same thing. This is that promise repeated visually, not new information.
 */
export function useCursorTag({ background }: { background?: string } = {}) {
  const [label, setLabel] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const onPoint = (next: string, event: ReactPointerEvent<Element>) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (el) {
      // Kept inside the window: an element at the right edge would otherwise
      // hang its own label off the side of the screen.
      const x = Math.max(12, Math.min(event.clientX + 18, window.innerWidth - el.offsetWidth - 12));
      const y = Math.max(12, Math.min(event.clientY + 20, window.innerHeight - el.offsetHeight - 12));
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    setLabel((current) => (current === next ? current : next));
  };

  const onUnpoint = () => setLabel(null);

  const tag = createPortal(
    <div
      ref={ref}
      aria-hidden="true"
      className="pg-cursor-tag whitespace-nowrap rounded-full px-3.5 py-2 text-[12.5px] font-medium leading-none text-white shadow-[0_8px_24px_rgba(10,16,36,0.34)] transition-opacity duration-150"
      style={{
        opacity: label ? 1 : 0,
        backgroundColor: background ?? "#1B3FE0",
        // A flat 12% of ink over the colour, so a light accent still carries
        // white text. Written as a gradient rather than as `color-mix` so the
        // two declarations cannot be reordered into the shorthand resetting it.
        backgroundImage: "linear-gradient(rgba(10,10,12,0.12), rgba(10,10,12,0.12))",
      } as CSSProperties}
    >
      {label}
    </div>,
    document.body,
  );

  return { tag, onPoint, onUnpoint };
}
