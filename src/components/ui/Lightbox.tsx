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
 * **`zoomable={false}` drops the second state** (`MILESTONE-010` task 14d). On
 * the playground the owner wants a piece to open large and centred and to close
 * on a click anywhere outside it, with no zoom-and-pan behind it: the collage
 * pieces are photographs of things rather than dense artefacts, and the reason
 * the toggle exists does not apply to them. It stays the default everywhere
 * else, because on a case study it is the whole point on a phone
 * (`DECISION-018`).
 *
 * **A clip opens here too** (SESSION-036), for the playground's collages: pass
 * `video` and the poster as `src`. It plays with controls, from the start, and
 * the fit/actual-size toggle does not apply — a film has one size, and taking a
 * pannable zoom over a `<video>` would only take the controls away from the
 * pointer. The description below the caption is the same in both cases: the
 * pictures are small in a collage, and being told what one *is* is half of what
 * opening it is for.
 *
 * **Since SESSION-040 that is the whole film**, not the collage's excerpt of it
 * (`DECISION-030`), which is why `loopVideo` exists: an eight-second loop that
 * stops looks broken, and a two-and-a-half-minute one that starts over unasked
 * is a different kind of wrong.
 *
 * **`onPrev`/`onNext` step through a set without closing** (`MILESTONE-014`
 * task 3). Opening a collage piece used to be a round trip: open, look, close,
 * find the next one on a card of a dozen, open that. Pass either handler and
 * the dialog grows a pair of edge buttons, a position counter beside the
 * caption, and the two arrow keys. Pass neither and none of it renders, which
 * is what the case studies do — a figure there belongs to a section, not to a
 * gallery, and there is no obvious "next" for it to mean.
 *
 * The caller owns the wrapping. This only ever says "the reader asked for the
 * one after this"; whether that is the first one again is a fact about the set,
 * which the caller has and this does not.
 */
export default function Lightbox({
  src,
  alt,
  caption,
  description,
  video,
  loopVideo = true,
  zoomable = true,
  onPrev,
  onNext,
  position,
  onClose,
}: {
  src: string;
  alt: string;
  caption: string;
  /** A sentence under the caption. Optional — case-study figures do not use it. */
  description?: string;
  /** When set, `src` is its poster and the dialog plays the film instead. */
  video?: string;
  /**
   * Whether that film repeats. On for the collage's eight-second loops, which
   * are excerpts and read as broken if they stop; off for a whole film, which
   * has an ending and should be allowed to reach it (`DECISION-030`).
   */
  loopVideo?: boolean;
  /**
   * Whether tapping the image switches to its natural width in a pannable
   * container. Off, the image is not a control at all and a click anywhere
   * outside it closes the dialog.
   */
  zoomable?: boolean;
  /** Step to the previous item. Omit for a figure that is not part of a set. */
  onPrev?: () => void;
  onNext?: () => void;
  /** `[current, total]`, 1-based, shown beside the caption. */
  position?: [number, number];
  onClose: () => void;
}) {
  const hasNav = Boolean(onPrev || onNext);
  const [actualSize, setActualSize] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  /*
   * Stepping to another item resets the zoom. Carrying "actual size" across a
   * step means the next picture opens scrolled into the middle of itself at a
   * magnification chosen for a different image — which reads as the dialog
   * being broken rather than as a setting being remembered.
   */
  useEffect(() => {
    setActualSize(false);
  }, [src]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      /*
       * The arrow keys step, when there is something to step to. Guarded on the
       * handler rather than on `hasNav` so that the first and last items of a
       * set that does not wrap simply do nothing, without the caller having to
       * describe that in two places.
       */
      if (event.key === "ArrowLeft" && onPrev) {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight" && onNext) {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key !== "Tab") return;
      /*
       * The trap, in DOM order: Close, then the two steppers, then whichever of
       * the image toggle or the film is present. It was two elements when there
       * were only ever two; the shape is the same, the list is just built from
       * what actually rendered.
       *
       * The `<video>` carries a `tabIndex` so it can be in this list at all.
       * Without it Tab reached the film's own controls by falling out of a trap
       * that was too short to engage, which happened to work and was not a
       * design.
       */
      const focusable = [
        closeRef.current,
        prevRef.current,
        nextRef.current,
        imageRef.current,
        videoRef.current,
      ].filter(Boolean) as HTMLElement[];
      if (focusable.length < 2) {
        if (closeRef.current) {
          event.preventDefault();
          closeRef.current.focus();
        }
        return;
      }
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
    [onClose, onPrev, onNext],
  );

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onKeyDown={onKeyDown}
      /*
       * Click-to-close on the backdrop, and only where there is no zoom to
       * confuse it with: with `zoomable` on, a click that misses the image is
       * as likely to be a mis-aimed zoom as a dismissal. `event.target` rather
       * than a wrapper, so only the padding around the picture closes it and a
       * click on the picture itself does nothing.
       */
      onClick={zoomable ? undefined : (event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 z-[210] flex flex-col bg-ink"
      style={prefersReducedMotion() ? undefined : { animation: "figure-zoom-in 160ms ease-out" }}
    >
      <div className="flex shrink-0 items-start justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="max-w-[70ch]">
          <p className="font-mono text-[12px] leading-[1.5] text-white/70">
            {caption}
            {position ? (
              <span className="ml-3 text-white/45 [font-variant-numeric:tabular-nums]">
                {position[0]} / {position[1]}
              </span>
            ) : null}
          </p>
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
      <div
        onClick={zoomable ? undefined : (event) => { if (event.target === event.currentTarget) onClose(); }}
        className={`flex-1 overscroll-contain px-5 pb-6 sm:px-8 ${!video && zoomable && actualSize ? "overflow-auto" : "overflow-hidden"}`}
      >
        {video ? (
          <div className="flex h-full w-full items-center justify-center">
            {/* Silent by construction: these clips have no audio track at all
                (`video-clip.mjs` drops it), so there is nothing to caption. */}
            <video
              ref={videoRef}
              tabIndex={0}
              src={video}
              poster={src}
              controls
              autoPlay
              loop={loopVideo}
              muted
              playsInline
              aria-label={alt}
              className="max-h-full max-w-full rounded-[6px]"
            />
          </div>
        ) : zoomable ? (
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
        ) : (
          <div
            onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
            className="flex h-full w-full items-center justify-center"
          >
            <img src={src} alt={alt} className="max-h-full max-w-full rounded-[6px] object-contain" />
          </div>
        )}
      </div>

      {/*
        The steppers (`MILESTONE-014` task 3).

        They sit on the dialog rather than inside the scroll container, so that
        at actual size they stay put while the picture pans under them, and so a
        click on one is never mistaken for a click on the backdrop — which, with
        `zoomable={false}`, would close the dialog instead of stepping.

        `pointer-events-none` on the rail and `auto` on the buttons: the rail
        spans the full height so the buttons can be centred against the picture,
        and a full-height transparent strip down each edge would otherwise eat
        the backdrop clicks that close the dialog.

        A button that has nowhere to go is not rendered rather than disabled: a
        disabled control still occupies the tab order and still invites a click,
        and at the end of a set the honest statement is that there is no next
        one, not that there is one you may not have.
      */}
      {hasNav ? (
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4">
          {onPrev ? (
            <button
              ref={prevRef}
              type="button"
              onClick={onPrev}
              aria-label="Previous"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white outline-offset-2 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
          ) : (
            <span />
          )}
          {onNext ? (
            <button
              ref={nextRef}
              type="button"
              onClick={onNext}
              aria-label="Next"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white outline-offset-2 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <span />
          )}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
