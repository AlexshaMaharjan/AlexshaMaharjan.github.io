import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { prefersReducedMotion } from "@/lib/motion";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { FRAME_H, FRAME_W, type CollageCard } from "@/lib/playground/collage";

/**
 * One piece of the archive, opened.
 *
 * ## What it is
 *
 * A white panel on the deck's own footprint over the blurred page, holding the
 * picture, what the piece is, and the four groupings the archive is arranged in
 * (`DECISION-058` for the panel, `DECISION-062` for the four). It is rendered
 * once, by `CardStack`, for all four cards — **not** per collage: what is open
 * is a `{ card, slot }` pair, which is what lets a reader cross from one colour
 * to another without closing anything.
 *
 * Three things it decides for itself, and each has its own note below:
 * `layout()` (beside the picture, or under it), `ARCHIVE_VOLUME` (how loud the
 * one film with a soundtrack opens), and which file to play — `filmHd`, the
 * viewer's own encode, never the tile's (`DECISION-060`).
 *
 * ## Why this is not `ui/Lightbox`
 *
 * It was, until `SESSION-049`. `ui/Lightbox` is a **full-screen viewer for a
 * dense artefact**: it fills the window with opaque ink, because a persona
 * sheet at 350px on a phone has to be pannable at its natural width and
 * anything behind it is a distraction from reading six labelled fields. That is
 * the right object for a case-study figure and it is the wrong one here, and
 * the owner's description of what they wanted is a precise list of the
 * differences:
 *
 * > *"right now there is black background and the images are of various length
 * > and all but what I want is a white overlay container instead of fill black.
 * > Also the background is still visible but blurry. I want this container
 * > position and size to be like the card in the playground, and on the left and
 * > right icons for next and previous. Also for each photo I want a title,
 * > description, when it was made, tools used and also type of art tags."*
 *
 * Four things follow from that, and each one is a reason the two could not stay
 * one component:
 *
 * 1. **It is a card, not a screen.** The panel takes the deck's own geometry —
 *    `CARD_MAX_W`'s 16:10 cap, the same 28px radius, the same top offset under
 *    the header — so opening a piece reads as the card you were looking at
 *    lifting off the page, rather than as the site being replaced.
 * 2. **The page stays.** A translucent ink wash with a blur behind it, so the
 *    deck is still there and still recognisable, out of focus. Opaque black
 *    would have made the card's shape meaningless: a card floating in a void is
 *    just a box.
 * 3. **The picture is one half of the layout**, not all of it. The other half is
 *    what the piece *is* — see `layout()`.
 * 4. **The steppers are on the two long edges**, which is where the owner asked
 *    for them and is also the only place they can go once the panel has a right
 *    column: `ui/Lightbox` centres its steppers against the window, and against
 *    a card that is 60% picture and 40% text, "centred" is over the text.
 *
 * `ui/Lightbox` keeps the case studies and is untouched. The two share the two
 * things a dialog owes a keyboard — Escape, and a trap — and that is about
 * fifteen lines of agreement, which is cheaper than one component with a mode
 * switch through every branch of its render.
 */

/**
 * The panel's widest, and it is deliberately the same expression as the deck's.
 *
 * Duplicated as a string rather than imported from `CardStack` because the two
 * mean different things that happen to agree: the card's cap is about not
 * claiming width it cannot fill (`SESSION-049` task 7), and this one is about
 * landing on the card's own footprint. If the deck's shape ever changes, this
 * should be looked at and *decided*, not silently dragged along.
 */
const PANEL_MAX_W = `calc(${FRAME_W / FRAME_H} * (100svh - var(--header-h) - 40px))`;

/**
 * The right-hand column, and the height the same content needs when it runs
 * full width under the picture instead.
 *
 * 230 is measured rather than guessed: a description at the panel's full width
 * is one or two lines, and `Made`, `Tools` and `Type` are three label-and-value
 * pairs at a fixed size. It is the only estimate in `layout` — everything else
 * it works with is a real measurement — and it only has to be close, because it
 * decides a layout rather than sets one.
 */
const META_W = 320;
const META_STACKED_H = 80;
const GUTTER = 28;

/**
 * A landscape picture takes the whole width and puts its text underneath
 * (`MILESTONE-022` task 8).
 *
 * **This was an area calculation and it was answering the wrong question.** It
 * worked out how big the picture would be laid out both ways and took the
 * larger, which is correct arithmetic and the wrong rule: a 16:9 film beside a
 * 320px column *is* bigger than the same film above two lines of text, and it
 * still reads badly, because the panel then holds a wide strip of picture with
 * a tall narrow column of type beside it and a third of the card empty under
 * the type. The owner's report is about exactly the two pieces the area rule
 * sent the wrong way — Hibi and the motorbike, both landscape films — and about
 * the piece it sent the right way, the Denmark logo, which is wide enough that
 * even the arithmetic agreed.
 *
 * So the rule is the shape of the work, which is the thing anybody can predict
 * by looking at it: **wider than 1.25:1 goes under.** Every landscape piece in
 * the archive behaves the same way, and there is no case to special-case,
 * which is the other half of the request. Portrait and square pieces — most of
 * the deck — sit beside their text exactly as they did.
 *
 * 1.25 rather than 1.5 because the crossover is not about the picture, it is
 * about the *text*: under a landscape picture the description and the three
 * metadata rows run as two columns (see the body below), so stacking costs far
 * less height than it used to and is worth taking sooner.
 *
 * Below `sm` nothing is computed: there is no room for two columns at any
 * ratio, and the panel scrolls.
 */
const LANDSCAPE = 1.25;

function layout(
  boxW: number,
  boxH: number,
  ratio: number,
  override?: "beside" | "under",
): "beside" | "under" {
  /*
   * A piece may overrule the shape rule (`CollageSlot.viewer`), and the
   * calendar pages do: they are landscape, and they are also mostly white paper
   * with a drawn flower on it, so they read perfectly well in half a panel
   * (`MILESTONE-023` task 2). The override is checked first and unconditionally
   * — a rule with an exception nobody can find is worse than no rule.
   */
  if (override) return override;
  if (boxW <= 0 || boxH <= 0) return "beside";
  if (ratio >= LANDSCAPE) return "under";
  /*
   * Below the landscape threshold the old question is still the right one: a
   * picture that would come out *smaller* beside its text than under it has
   * nothing to gain from the two columns. It almost never fires — a portrait
   * piece is width-bound in neither layout — and it costs two multiplications.
   */
  const beside = Math.min(boxW - META_W - GUTTER, boxH * ratio);
  const under = Math.min(boxW, Math.max(0, boxH - META_STACKED_H - GUTTER) * ratio);
  return under > beside ? "under" : "beside";
}

/**
 * How loud the archive plays (`MILESTONE-022` task 7).
 *
 * The motorbike film was recorded at the level the render came out at, which is
 * loud — the owner's words are *"naturally quite loud… the user should not
 * experience a sudden, excessively loud sound when enabling audio"*. Nothing is
 * done to the file: attenuating it at encode time would fix it at one level for
 * ever and make the player's own volume control a lie. The element opens muted,
 * and the first thing the sound button does before unmuting is set this.
 *
 * 0.35 is about a third of the way up a linear volume control, which on a
 * laptop at a normal system level is conversation rather than engine. The
 * reader can take it anywhere from there with the player's own slider.
 */
const ARCHIVE_VOLUME = 0.35;

function Row({
  label,
  inline,
  children,
}: {
  label: string;
  /**
   * Laid beside its siblings rather than under them.
   *
   * Under a landscape picture the three metadata rows are a *row*, not a
   * column: stacked they cost about 150px of panel height, which is height the
   * picture has just been given the full width in order to use. Inline they
   * cost one line and a label.
   */
  inline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={inline ? "" : "mt-5 first:mt-0"}>
      <dt className="font-mono text-[11px] uppercase tracking-[0.09em] text-ink-muted">{label}</dt>
      <dd className="mt-1.5 text-[14px] leading-[1.5] text-ink-secondary">{children}</dd>
    </div>
  );
}

export default function PieceViewer({
  cards,
  card,
  index,
  locale,
  dictionary,
  onPrev,
  onNext,
  onSelectCard,
  onClose,
}: {
  /**
   * Every card in the deck, because the viewer is no longer confined to one
   * (`MILESTONE-022` task 10).
   *
   * The owner asked to be able to keep looking once a card runs out, *"grouped
   * / filtered according to their colour / category as currently defined by the
   * design"* — and the design already defines four groupings, because each card
   * has its own colour and its own kind of work. So the four cards are the
   * filter: the viewer shows which colour it is in, offers the other three, and
   * steps within whichever is selected.
   *
   * What it deliberately does not do is run `next` off the end of one card and
   * into the next. Four colours that silently become one 48-piece reel are four
   * groupings nobody can see.
   */
  cards: CollageCard[];
  /** Which card is open, and which of its slots. */
  card: number;
  index: number;
  locale: Locale;
  dictionary: Dictionary;
  onPrev: () => void;
  onNext: () => void;
  onSelectCard: (card: number) => void;
  onClose: () => void;
}) {
  const copy = dictionary.playgroundViewer;
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = cards[card]!;
  const slots = current.slots;
  const slot = slots[index]!;
  const accent = current.accent;
  /*
   * The viewer's film is the high-quality one (`MILESTONE-022` task 6). It is
   * the whole reason there are two: the card autoplays `film` because five of
   * them are on a scrolling page, and this is a deliberate act, so it gets the
   * file that was cut for looking at. `video` remains the fallback for a slot
   * that has neither.
   */
  const clip = slot.filmHd ?? slot.film ?? slot.video;

  /**
   * Sound, off until it is asked for (`MILESTONE-022` task 7).
   *
   * Only the motorbike film carries a track today (`CollageSlot.audio`), and
   * the rule this follows is the one the whole archive follows: nothing makes
   * noise unless somebody asks it to. The control sits in the title bar beside
   * Close, where it is legible as part of the viewer's chrome rather than
   * hidden in the player, and it survives stepping from piece to piece — a
   * reader who turned the sound on has said something about how they want to
   * browse, not about one file.
   */
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Order matters: the level is set before the element is unmuted, so the
    // first audible frame is already at `ARCHIVE_VOLUME` rather than at the
    // level the film was rendered at.
    video.volume = ARCHIVE_VOLUME;
    video.muted = !(sound && slot.audio);
  }, [sound, slot.audio, clip]);

  /*
   * The media's true shape, which is not `slot.w / slot.h`: those are the
   * *crop* the collage lays the picture out in, and a slot cropped square out
   * of a panorama would put the panel in the wrong layout and then letterbox
   * the picture inside it. The crop is the first guess, because it is known
   * before the file arrives and is usually close; the real one replaces it on
   * load, which is one reflow of a dialog that has just opened.
   */
  const [ratio, setRatio] = useState(slot.w / slot.h);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => setRatio(slot.w / slot.h), [slot.w, slot.h]);

  /*
   * `bodyRef`, not `panelRef`. The panel's box includes the title bar and the
   * padding — about 136px the picture never gets — and the first cut of
   * `layout` compared against it and chose wrong on exactly the pictures it
   * exists for: the Hibi walkthrough went *under* its text at 935px wide when
   * beside it would have been 1,312.
   *
   * The row's own box is the same whichever way it lays its children out, so
   * measuring it cannot feed back into the decision it informs.
   */
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const r = entry?.contentRect;
      if (r) setBox({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    observer.observe(body);
    return () => observer.disconnect();
  }, []);

  /* Hold the page still behind the dialog, compensating for the scrollbar it
     removes so the blurred deck underneath does not jump sideways. */
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
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key !== "Tab") return;
      /*
       * The trap, queried rather than held as a list of refs. The panel's
       * controls change with the piece — a film has controls of its own and a
       * still does not — and a query cannot fall out of step with the render
       * the way a fixed list can.
       */
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('button, [href], video[tabindex], [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null || el.tagName === "VIDEO");
      if (focusable.length < 2) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose, onPrev, onNext],
  );

  const stacked = layout(box.w, box.h, ratio, slot.viewer) === "under";
  const position = copy.position
    .replace("{n}", String(index + 1))
    .replace("{total}", String(slots.length));

  const isBead = slot.src === "/images/pg-bead.webp";

  const media = clip ? (
    /*
     * `muted` is the *initial* attribute and the sound button owns the property
     * from then on (see the effect above): React would otherwise re-assert
     * `muted` on every render and switch the sound back off under the reader.
     * Every film but the motorbike has no audio track at all — `video-clip.mjs`
     * drops it unless asked — so there is nothing to caption on those.
     */
    <video
      key={clip}
      ref={videoRef}
      tabIndex={0}
      src={clip}
      poster={slot.src}
      controls
      autoPlay
      loop={!slot.film}
      muted
      playsInline
      aria-label={slot.alt[locale]}
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
      }}
      className="max-h-full max-w-full rounded-[10px] object-contain"
    />
  ) : (
    <img
      key={slot.src}
      src={slot.src}
      alt={slot.alt[locale]}
      style={
        isBead
          ? {
              aspectRatio: `${slot.w} / ${slot.h}`,
              objectPosition: slot.focus ?? "50% 59%",
            }
          : undefined
      }
      onLoad={(e) => {
        const img = e.currentTarget;
        if (!isBead && img.naturalWidth && img.naturalHeight) {
          setRatio(img.naturalWidth / img.naturalHeight);
        }
      }}
      className={`max-h-full max-w-full rounded-[10px] ${
        isBead ? "object-cover" : "object-contain"
      }`}
    />
  );

  const step = (direction: "prev" | "next") => (
    <button
      type="button"
      onClick={direction === "prev" ? onPrev : onNext}
      aria-label={direction === "prev" ? copy.previous : copy.next}
      className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-card-border bg-white text-ink shadow-[0_6px_22px_rgba(20,30,60,0.18)] outline-offset-2 transition-colors hover:border-accent hover:text-accent"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={direction === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slot.caption[locale]}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[210]"
      style={prefersReducedMotion() ? undefined : { animation: "figure-zoom-in 160ms ease-out" }}
    >
      {/*
        The page, still there and out of focus. `backdrop-blur` over a wash
        rather than an opaque fill: the owner asked for the background to stay
        visible, and the blur is what keeps it from competing — a legible deck
        behind a white card is two things to read at once.

        It carries the dismissal, so a click anywhere off the card closes. It is
        a sibling of the panel rather than its parent, which is what makes that
        a plain handler instead of an `event.target === event.currentTarget`
        test that a click on the steppers would have to be exempted from.
      */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[6px]"
      />

      {/*
        The card's own footprint: the container's gutters, the header's height,
        `GAP` above and below, and the 16:10 cap. Laid out as a centred row so
        the two steppers sit against the panel's long edges at every width and
        shrink out of the way before the panel does.
      */}
      <div
        className="container-page pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ paddingTop: "calc(var(--header-h) + 20px)", paddingBottom: "20px" }}
      >
        <div
          className="relative h-full w-full"
          style={{ maxWidth: PANEL_MAX_W }}
        >
          {/*
            The steppers straddle the panel's two long edges rather than sitting
            in a row beside it. A row was the first cut and it cost the panel
            120px of width — which is the one thing the owner specified exactly
            ("like the card in the playground"), so the panel keeps the card's
            footprint and the buttons hang half over its edge into the
            container's own 80px gutter.

            Hidden below `sm`, where there is no gutter to hang into; the panel
            carries a pair in its foot at those widths instead.
          */}
          <div className="pointer-events-none absolute inset-y-0 -left-[22px] hidden items-center sm:flex">
            {step("prev")}
          </div>
          <div className="pointer-events-none absolute inset-y-0 -right-[22px] z-[1] hidden items-center sm:flex">
            {step("next")}
          </div>

        <div
          ref={panelRef}
          className="pointer-events-auto flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[28px] border border-card-border bg-white shadow-[0_24px_80px_rgba(16,26,54,0.28)]"
          style={{ "--pg-accent": accent } as CSSProperties}
        >
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-surface px-6 py-3 sm:px-8">
            <div className="min-w-0 flex-1">
              {/* Two lines, not an ellipsis. "Autumn path, painted in Procreate"
                  came out as "Autumn path, painted i…" on a 390px phone, which
                  loses the half of the caption that says what it is. */}
              <h2 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink sm:text-[21px]">
                {slot.caption[locale]}
              </h2>
              {/* On the caption's own line from `sm` up: two stacked lines of
                  chrome cost the picture 20px of height for one short string. */}
              <p className="mt-0.5 font-mono text-[11px] tracking-[0.06em]" style={{ color: accent }}>
                {position}
              </p>
            </div>
            {/*
              The four cards, as a filter, **on the title's own line**
              (`MILESTONE-022` task 10, tightened in `MILESTONE-023` task 3).

              It was a band of its own under the title — a bordered row 44px
              tall — and the owner's objection is the one that matters in a
              viewer: *"the category/navigation area currently takes too much
              vertical space and makes the viewed image smaller."* It did, and
              the arithmetic is unforgiving: at a 720px window the panel's body
              is about 450px, so 44px of chrome is a tenth of the picture.

              So the chips moved into the row that was already there, between
              the caption and the close button, and lost their border with it.
              They are the same control — a dot in each card's own accent, a
              fill when it is the one you are in, `aria-current` because this is
              one position in a set of four rather than four toggles — drawn at
              the size a header row can carry.

              Below `sm` they are the one thing that wraps: the caption keeps
              the first line and the chips take the second, which is still one
              row of chrome rather than two.
            */}
            <div
              role="group"
              aria-label={copy.collections}
              className="order-3 -ml-1 flex w-full shrink-0 flex-wrap items-center gap-1 sm:landscape:order-none sm:landscape:ml-0 sm:landscape:w-auto"
            >
              {cards.map((entry, i) => {
                const here = i === card;
                return (
                  <button
                    key={entry.index}
                    type="button"
                    onClick={() => onSelectCard(i)}
                    aria-current={here ? "true" : undefined}
                    className={`tap-target gap-1.5 whitespace-nowrap rounded-full px-2 py-1 text-[12px] font-medium outline-offset-2 transition-colors ${
                      here ? "text-white" : "text-ink-secondary hover:bg-surface hover:text-ink"
                    }`}
                    style={here ? { backgroundColor: entry.accent } : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: here ? "#FFFFFF" : entry.accent }}
                    />
                    {entry.name[locale]}
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {/*
                Sound, and only where there is any (`MILESTONE-022` task 7). It
                is a button rather than a note telling the reader to use the
                player's own control: the player's is a hover-revealed slider
                inside a video that is already playing, and what the owner asked
                for is *"a clear sound on / sound off control"*. `aria-pressed`
                is what makes it a toggle rather than two buttons wearing one
                label.
              */}
              {slot.audio ? (
                <button
                  type="button"
                  onClick={() => setSound((on) => !on)}
                  aria-pressed={sound}
                  className="tap-target shrink-0 gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-ink-secondary outline-offset-2 transition-colors hover:bg-surface hover:text-ink"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
                    {sound ? (
                      <>
                        <path d="M16 9.2a4 4 0 0 1 0 5.6" />
                        <path d="M18.4 6.6a7.5 7.5 0 0 1 0 10.8" />
                      </>
                    ) : (
                      <path d="M16.5 9.5l4 5m0-5l-4 5" />
                    )}
                  </svg>
                  {sound ? copy.soundOn : copy.soundOff}
                </button>
              ) : null}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="tap-target -mr-2 shrink-0 rounded-full px-3 py-1.5 text-[13px] text-ink-secondary outline-offset-2 transition-colors hover:bg-surface hover:text-ink"
              >
                {copy.close}
              </button>
            </div>
          </div>

          {/*
            The picture and what it is. One column on a phone and when the
            picture is wide enough to want the whole panel (`layout`), two
            otherwise. `min-h-0` on both the row and the media cell is what lets
            `max-h-full` on the picture mean anything — without it a flex child
            takes its content's height and the picture overflows the card it is
            supposed to be inside.
          */}
          <div
            ref={bodyRef}
            className={`flex min-h-0 flex-1 overflow-y-auto ${
              stacked
                ? "flex-col gap-3 p-4 sm:gap-4 sm:px-8 sm:py-4"
                : "flex-col gap-6 p-6 sm:flex-row sm:p-8"
            }`}
          >
            {/*
              `min-h-0` is what lets `max-h-full` on the picture mean anything
              in a flex column — without it the cell takes its content's height.
              Below `sm` it is the other way round: the body is a scroll
              container there, so `flex-1` resolves against the visible height
              and the three metadata rows squeezed the picture to about 185px on
              a 390 x 780 phone. A floor of 46svh gives it a real share and lets
              the text scroll under it, which is what a phone does anyway.
            */}
            <div className="flex min-h-[46svh] flex-1 items-center justify-center sm:min-h-0">
              {media}
            </div>

            {/*
              Under a landscape picture the text runs as a space-efficient
              flex layout prioritizing media display size while keeping
              descriptions and metadata cleanly arranged and readable.
            */}
            <div
              className={
                stacked
                  ? "flex w-full shrink-0 flex-col gap-x-8 gap-y-3 sm:flex-row sm:items-start sm:justify-between"
                  : "shrink-0 sm:w-[260px] lg:w-[320px]"
              }
            >
              <div className={stacked ? "min-w-0 sm:max-w-[58%]" : undefined}>
                {slot.description ? (
                  <p className="text-[14px] leading-[1.55] text-ink-body sm:text-[15px] sm:leading-[1.6]">
                    {slot.description[locale]}
                  </p>
                ) : null}
                {slot.prototypeUrl ? (
                  <a
                    href={slot.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target mt-2 inline-flex items-center gap-1.5 text-[14px] font-medium hover:underline"
                    style={{ color: accent }}
                  >
                    {copy.prototypeLink}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>

              <dl
                className={
                  stacked
                    ? "flex shrink-0 flex-wrap gap-x-6 gap-y-2 text-[13px] sm:max-w-[40%]"
                    : slot.description
                      ? "mt-6"
                      : ""
                }
              >
                {slot.made ? (
                  <Row label={copy.made} inline={stacked}>
                    {slot.made}
                  </Row>
                ) : null}
                {slot.tools ? (
                  <Row label={copy.tools} inline={stacked}>
                    {slot.tools[locale].join(" · ")}
                  </Row>
                ) : null}
                {slot.tags ? (
                  <Row label={copy.type} inline={stacked}>
                    <span className="flex flex-wrap gap-1.5">
                      {slot.tags[locale].map((tag) => (
                        /* The card's colour at 10%, so a tag belongs to the
                           card it came off rather than to the viewer. */
                        <span
                          key={tag}
                          className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                          style={{ backgroundColor: `${accent}1A`, color: accent }}
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </Row>
                ) : null}
              </dl>
            </div>
          </div>

          {/* The steppers again, inside the card, for the widths where there is
              no room beside it. */}
          <div className="flex shrink-0 items-center justify-between border-t border-surface px-6 py-3 sm:hidden">
            {step("prev")}
            {step("next")}
          </div>
        </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
