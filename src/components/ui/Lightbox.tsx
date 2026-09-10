import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Full-screen view of one figure.
 *
 * This exists because of mobile. A case-study figure renders at
 * `calc(100vw - 40px)` — 350px on a 390px phone — and several of them are
 * information-dense artefacts rather than pictures: a persona card carries a
 * name, a quote, six labelled fields and four lists. At 350px wide that is
 * roughly 3px type. The figure is on the page, and none of it can be read.
 *
 * Widening the figure is not available: the column is the column. So the fix is
 * to let a reader open one at the size it was drawn at. That helps desktop too —
 * a component sheet at 960px is legible but not comfortable — but mobile is the
 * reason it is not optional.
 *
 * Two states, because "fit to screen" and "read the small print" are different
 * jobs: it opens fitted to the viewport, and tapping the image switches to the
 * image's natural width inside a scroll container, so a phone can pan around a
 * 1600px-wide card. Tapping again fits it back.
 *
 * No dependency, no focus-trap library: the dialog holds exactly two focusable
 * things, so a two-element trap is a few lines and correct.
 *
 * `z-[210]` clears the fixed header (`z-[200]`) and the mobile menu (`z-[190]`).
 * At anything lower the header paints straight through the scrim and covers this
 * dialog's own Close button, which is exactly what happened first time. The
 * backdrop is opaque for the same reason: at 95% the header's own wordmark still
 * ghosted through and landed on top of this dialog's caption.
 *
 * **A clip opens here too** (SESSION-036), for the playground's collages: pass
 * `video` and the poster as `src`. It plays with controls, from the start, and
 * the fit/actual-size toggle does not apply — a film has one size, and taking a
 * pannable zoom over a `<video>` would only take the controls away from the
 * pointer. The description below the caption is the same in both cases: the
 * pictures are small in a collage, and being told what one *is* is half of what
 * opening it is for.
 */
export default function Lightbox({
  src,
  alt,
  caption,
  description,
  video,
  onClose,
}: {
  src: string;
  alt: string;
  caption: string;
  /** A sentence under the caption. Optional — case-study figures do not use it. */
  description?: string;
  /** When set, `src` is its poster and the dialog plays the film instead. */
  video?: string;
  onClose: () => void;
}) {
  const [actualSize, setActualSize] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLButtonElement>(null);

  /*
   * Hold the page still behind the overlay. Nothing else in this project
   * touches `body` overflow, and the scroll hooks read `scrollHeight` rather
   * than `overflow`, so this cannot disturb them — but the scrollbar it removes
   * would shift the layout underneath, hence the padding compensation.
   */
  useEffect(() => {
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const overflow = body.style.overflow;
    const padding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = overflow;
      body.style.paddingRight = padding;
    };
  }, []);

  /* Focus starts on Close, and Escape closes — the two things a dialog owes a
     keyboard. Returning focus to the trigger is the caller's job, since only it
     knows which figure was opened. */
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      // A two-element trap: Close and the image itself. A clip has no
      // fit toggle, so `imageRef` is empty and the guard below lets Tab fall
      // through to the video's own controls.
      const focusable = [closeRef.current, imageRef.current].filter(Boolean) as HTMLElement[];
      if (focusable.length < 2) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[210] flex flex-col bg-ink"
      style={prefersReducedMotion() ? undefined : { animation: "figure-zoom-in 160ms ease-out" }}
    >
      <div className="flex shrink-0 items-start justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="max-w-[70ch]">
          <p className="font-mono text-[12px] leading-[1.5] text-white/70">{caption}</p>
          {description ? (
            <p className="mt-1.5 text-[15px] leading-[1.55] text-white/85">{description}</p>
          ) : null}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="tap-target -mt-1 shrink-0 rounded-md px-3 py-1.5 font-mono text-[13px] text-white/80 outline-offset-2 hover:bg-white/10 hover:text-white"
        >
          Close
        </button>
      </div>

      {/*
        The scroll container. Fitted, it centres the image and nothing scrolls;
        at actual size the image overflows and this pans. `overscroll-contain`
        stops a pan at the edge from scrolling the page behind it.
      */}
      <div className={`flex-1 overscroll-contain px-5 pb-6 sm:px-8 ${!video && actualSize ? "overflow-auto" : "overflow-hidden"}`}>
        {video ? (
          <div className="flex h-full w-full items-center justify-center">
            {/* Silent by construction: these clips have no audio track at all
                (`video-clip.mjs` drops it), so there is nothing to caption. */}
            <video
              src={video}
              poster={src}
              controls
              autoPlay
              loop
              muted
              playsInline
              aria-label={alt}
              className="max-h-full max-w-full rounded-[6px]"
            />
          </div>
        ) : (
          <button
            ref={imageRef}
            type="button"
            onClick={() => setActualSize((v) => !v)}
            aria-label={actualSize ? "Fit image to screen" : "View image at full size"}
            className={`block outline-offset-4 ${actualSize ? "cursor-zoom-out" : "mx-auto flex h-full w-full cursor-zoom-in items-center justify-center"}`}
          >
            <img
              src={src}
              alt={alt}
              className={actualSize ? "max-w-none rounded-[6px]" : "max-h-full max-w-full rounded-[6px] object-contain"}
            />
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}
