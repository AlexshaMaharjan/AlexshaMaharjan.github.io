import type { Locale } from "@/lib/i18n";
import pieces from "./pieces.json";

/**
 * The playground's four collages, traced from `Portfolio.fig`, page 2, frames
 * 1–4 (`SESSION-035`).
 *
 * **The geometry is the design's own, unconverted.** `x/y/w/h` are pixels in
 * each frame's 16000 × 10000 canvas, exactly as Figma reports them, and
 * `Collage.tsx` is the only thing that turns them into percentages. Keeping the
 * raw numbers means a slot can be checked against the Figma inspector by
 * reading it, and re-tracing a frame is a copy rather than a conversion.
 *
 * **Order is paint order.** The frames have a few deliberate overlaps, so the
 * slots are listed bottom-to-top in the same order Figma lists them.
 *
 * **Both locales sit on the same slot.** The pictures, positions and crops are
 * one set of facts; only the alt text has two versions, and putting them side
 * by side is what keeps them from drifting the way the category files had to be
 * audited for (`scripts/content-audit.mjs`).
 */
export interface CollageSlot extends PieceContent {
  /** Left edge, in design px on the 16000-wide frame. */
  x: number;
  /** Top edge, in design px on the 10000-tall frame. */
  y: number;
  w: number;
  h: number;
  /** The picture, or the poster when this slot is a clip. */
  src: string;
  /** A short silent loop, played in place of the poster once it is on screen. */
  video?: string;
  /**
   * The whole film, fetched only when somebody opens the slot (`DECISION-030`).
   *
   * The collage plays `video`, which is eight seconds and a few hundred
   * kilobytes, because forty-eight pieces on a page that already weighs 2.6 MB
   * cannot each carry a minute of footage. The owner asked for the whole thing,
   * and the whole thing is what the viewer plays: this is the same trade
   * `ui/Video` makes for the 12 MB kitchen walkthrough (`DECISION-022`), and it
   * costs the page nothing, because a `<video>` for it is only created once the
   * dialog is open.
   */
  film?: string;
  /**
   * The same film at viewer quality, fetched only when the piece is opened
   * (`MILESTONE-022` task 6).
   *
   * **Two files, because the two places have nothing in common.** A collage tile
   * is about 360 CSS px wide and plays by itself as the card scrolls past, five
   * of them across the deck; the viewer's panel is up to 1,300 and plays
   * because somebody asked. One file cannot be right for both, and the one file
   * this used to be was cut for the tile: 640 x 360 at 340 kbps, which is what
   * the owner reported as *"blurry… important content/details are no longer
   * clear"*. At that bitrate a rain-lit city and a screen recording of an
   * interface are both mud.
   *
   * So `film` stays the tile's — full length, no cuts, cheap enough that five
   * of them autoplaying is the page weight it always was — and `filmHd` is the
   * same footage at 1280 wide (810 or 720 for the portrait ones) and four to
   * five times the bitrate. The page never fetches it: no `<video>` for it
   * exists until the dialog is open, which is the trade `ui/Video` already
   * makes for the 12 MB kitchen walkthrough (`DECISION-022`).
   *
   * Measured, motorbike: 640 x 360 at 340 kbps became 1280 x 720 at 1,735.
   */
  filmHd?: string;
  /**
   * Whether `filmHd` carries a soundtrack (`MILESTONE-022` task 7).
   *
   * **Only the viewer's file ever has one.** The tile plays unasked and a page
   * that makes noise unasked is indefensible, so `video-clip.mjs` strips audio
   * from everything except an explicit `--audio` run — there is no track on a
   * card's film to unmute by accident. This flag is what puts the sound control
   * in the viewer's title bar, and it is off by default there too: the reader
   * asks for the sound, and gets it at `ARCHIVE_VOLUME` rather than at the
   * level the original was recorded at.
   */
  audio?: boolean;
  /**
   * @see {@link PieceContent} — the caption, the alt text and the four
   * metadata fields are merged in from `pieces.json` and are not written here.
   */
  /**
   * How the picture sits in its slot. `cover` — fill the box and crop — is the
   * default and is right for a photograph or a painting, where the frame is a
   * crop of a larger scene.
   *
   * `contain` is for artwork whose **edges are part of it**: a logo, a mark, a
   * layout with a margin the designer chose. Cropping one of those is not a
   * tighter composition, it is a mistake (`MILESTONE-023` task 10).
   */
  fit?: "cover" | "contain";
  /**
   * Which way the viewer lays this piece out, when the shape rule gets it wrong
   * (`MILESTONE-023` task 2).
   *
   * `PieceViewer.layout()` decides by shape: wider than 1.25:1 puts the text
   * under the picture, because a landscape picture beside a narrow column reads
   * badly. The **calendar pages are the exception the owner asked for**, and
   * the reason is in the artwork rather than in the ratio: a calendar page is
   * mostly white paper with a drawn flower and a grid on it, so it carries its
   * own margins and does not need the panel's full width to be legible. Beside
   * the text it stays comfortably readable and the panel stops being two thirds
   * empty.
   *
   * Set it on a slot only when the shape rule is wrong about that *piece*.
   * Anything set here is a small, argued exception, not a preference — the rule
   * is what keeps forty-eight pieces from being forty-eight decisions.
   */
  viewer?: "beside" | "under";
  /**
   * `object-position`, for the slots where the design's own crop is not the
   * centre of the picture. Figma expresses these as an oversized child with a
   * negative offset; the fraction of the overflow it hides on the leading edge
   * is what this records.
   */
  focus?: string;
  /** Degrees, for the one piece the design turns on its side. */
  rotate?: number;
}

/**
 * A hand-written note with an arrow, over a card (`Scribble.tsx`).
 *
 * **A note names its picture, not its position** (`SESSION-038`). These carried
 * their own `x`/`y` until then, placed by looking at the card, and what three
 * sessions of that produced was a pattern nobody had chosen: a note in the
 * top-left of every card and another anchored at x=15700 in the top-right of
 * every card, with arrows that pointed at roughly nothing.
 *
 * `target` is the `src` of the slot the note is about, and
 * `lib/playground/placeScribbles` works out where it can sit and draws the
 * arrow from there to the picture. So writing one is a matter of deciding what
 * to say and about which piece — which is the part only the owner can do.
 *
 * `scripts/content-audit.mjs` checks that every `target` is a slot on its own
 * card: a typo here is not a type error and does not throw, it is a note in the
 * middle of the frame pointing at nothing.
 */
export interface CollageScribble {
  /** The `src` of the slot this note is about. Must be a slot on this card. */
  target: string;
  text: Record<Locale, string>;
  tone?: "ink" | "accent";
  /**
   * Which side of its picture the note should sit on.
   *
   * **Every note carries one now** (`MILESTONE-012` task 2). It was two of
   * nine, added where the owner had a view; then the owner drew all ten
   * annotations onto page 2 of `Portfolio.fig` and every one of them is in a
   * corner of its frame. So this stopped being an exception and became the
   * data: the four cards take their corners from those frames, and the three
   * notes that had no `prefer` were not left alone because nobody minded where
   * they went — they were left alone because nobody had said.
   *
   * A **preference, not a position.** `placeScribbles` still decides where the
   * note actually goes, still refuses to write it over a picture, and still
   * picks the seat whose arrow has the clearest run — this only breaks the tie,
   * which on a crowded card is most of the decision. Asking for a corner the
   * card has nothing free in gets the nearest clear seat to it rather than a
   * note in the wrong place or no note at all.
   */
  prefer?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Optional explicit position for the note box in 16000x10000 frame units. */
  position?: { x: number; y: number };
  align?: "left" | "right";
  arrowStart?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export interface CollageCard {
  /** `01`–`04`, shown in the card's corner. */
  index: string;
  /** Names the card for screen readers. */
  label: Record<Locale, string>;
  /**
   * The card's own short name, for the viewer's filter (`MILESTONE-022` task
   * 10, renamed in `MILESTONE-023` task 3).
   *
   * It was the card's palette — "Warm", "Cool", "Dark", "Pink and lilac" —
   * taken from `label`, and the owner's verdict is that those *"feel
   * unnecessary/weird"*. They were: a colour word is a label for the ink the
   * card turns, and the reader is choosing between **decks**, not between
   * hues. So the chips say which card they are, and the dot beside each one
   * still carries the colour — which is the part that was doing real work,
   * because it is the same colour that card's notes and ruling arrive at.
   *
   * `label` stays what it is: a screen-reader name, a sentence about a position
   * in a deck.
   */
  name: Record<Locale, string>;
  /**
   * The colour this card turns once every picture on it has its colour back
   * (`SESSION-037`).
   *
   * The deck arrives in black and white on blue paper, and the scroll runway
   * behind each card puts the colour back one picture at a time; at the end of
   * that runway the card's notes, its index and its ruling all leave the blue
   * and land here. One per card, so the four cards are four different arrivals
   * rather than the same one four times — and deliberately not the site's
   * accent, which is the blue they are leaving.
   *
   * Read as data, not as a token: `Scribble` and `.pg-tint` mix towards it, and
   * `accentGridBackground` draws the ruling in it.
   */
  accent: string;
  slots: CollageSlot[];
  scribbles: CollageScribble[];
}

/** The design canvas every slot is measured against. */
export const FRAME_W = 16000;
export const FRAME_H = 10000;

/**
 * Everything about a piece that is **words** (`MILESTONE-022` task 11).
 *
 * These six fields used to sit on the slot, in this file, between the
 * coordinates and the crop — which meant that correcting a description was
 * editing a TypeScript literal in a 1,100-line layout file, and the owner had
 * to ask for every change. They live in `pieces.json` now, keyed by the slot's
 * `src`, and `/archive/edit` is a form over that file (dev only; see
 * `pages/playground/ArchiveEditor`).
 *
 * **The split is along the seam that was already there.** What stays in this
 * file is the design: where a piece sits on the 16000 x 10000 frame, how it is
 * cropped, which film it plays. What moves out is everything a person writes
 * and rewrites. Nothing needs to know about both, which is why the merge below
 * is four lines and why `content-audit.mjs`, `image-manifest.mjs` and
 * `copy-export.mjs` did not have to change: they read the merged export, as
 * they always did.
 */
export interface PieceContent {
  /** What the piece is. Shown as the viewer's heading when a slot is opened. */
  caption: Record<Locale, string>;
  /** What a screen reader is told. A description of the *image*, not of the work. */
  alt: Record<Locale, string>;
  /**
   * The four fields the viewer shows beside a picture, and the only things here
   * that are about the *work* rather than about the card it is arranged on.
   *
   * Opening a piece used to give you the picture, its caption and its alt text
   * doing duty as a description. That is enough for a photograph and nothing
   * like enough for the rest: the archive is fourteen calendar pages, five
   * pop-up boxes, a 3D film and a logo, and what a reader wants of any of them
   * is what it is, when it was made, what it was made with, and what kind of
   * thing it is. `alt` cannot carry that — it is a different sentence with a
   * different job, and using it twice is why the viewer read as thin.
   *
   * All four are optional and the viewer renders only what is filled, so a new
   * picture can go on a card with nothing but a caption and an alt.
   *
   * **`made` is the owner's to fill** and most of them still say `[ year ]`:
   * the medium of a piece is visible in it, the year it was made is not in the
   * picture, not in the repository and not inferable. `[ … ]` is this project's
   * own convention for a marked blank (`DECISION-011`).
   */
  description?: Record<Locale, string>;
  /**
   * A Figma prototype for this piece, shown as a link under the description.
   * Not localised — a share URL is the same for both readers.
   */
  prototypeUrl?: string;
  /** When it was made. `[ year ]` wherever the owner has not said. */
  made?: string;
  /** What it was made with — an app, a material, a camera. */
  tools?: Record<Locale, string[]>;
  /** What kind of work it is: painting, graphic design, photography, 3D. */
  tags?: Record<Locale, string[]>;
  /**
   * Set by the editor when the owner has rewritten the English and the German
   * has not caught up.
   *
   * The owner writes English (*"I will provide/write the English content
   * only"*); the German is written for them, in the tone the rest of the
   * archive is in, and it cannot be produced by the form itself. So the form
   * marks it instead: this flag is how the next session finds the twelve
   * pieces that need a German pass rather than re-reading all forty-eight.
   */
  deStale?: boolean;
}

/** A slot as it is written below: the design, with no words in it. */
type SlotFrame = Omit<CollageSlot, keyof PieceContent>;
/** A card as it is written below. */
type CardFrame = Omit<CollageCard, "slots"> & { slots: SlotFrame[] };

const BLANK: Record<Locale, string> = { en: "", de: "" };
const content = pieces as Record<string, Partial<PieceContent> | undefined>;

/**
 * The design, with the words put back.
 *
 * A missing entry is a blank caption rather than a crash, and
 * `content-audit.mjs` fails the build on exactly that — a slot whose caption or
 * alt text is empty in either locale. So a picture added to a card without a
 * line written for it is caught by the gate that already exists, not by a type
 * error in a file the owner does not open.
 */
function withContent(cards: CardFrame[]): CollageCard[] {
  return cards.map((card) => ({
    ...card,
    slots: card.slots.map((slot) => ({
      caption: BLANK,
      alt: BLANK,
      ...content[slot.src],
      ...slot,
    })),
  }));
}

const cards: CardFrame[] = [
  {
    index: "01",
    label: { en: "Collage 1 of 4: warm work", de: "Collage 1 von 4: warme Arbeiten" },
    name: { en: "Card 1", de: "Karte 1" },
    /* orange */
    accent: "#D65A18",
    slots: [
      {
        x: 2604, y: 2158, w: 1798, h: 2399, src: "/images/pg-autumn.webp",
      },
      {
        x: 7525, y: 3678, w: 2543, h: 3596, src: "/images/pg-sunset.webp",
      },
      {
        x: 4800, y: 3200, w: 2047, h: 2800, src: "/images/pg-painting-luffy.webp",
        // The design pulls the crop to the picture's right edge.
        focus: "100% 50%",
      },
      {
        x: 4443, y: 6200, w: 2629, h: 2722, src: "/images/pg-flyer.webp",
      },
      {
        x: 2604, y: 5677, w: 1660, h: 1999, src: "/images/pg-packaging-crisps.webp",
      },
      {
        x: 13187, y: 4111, w: 2109, h: 2812, src: "/images/pg-painting-framed.webp",
      },
      {
        x: 10342, y: 3952, w: 2438, h: 1725, src: "/images/pg-kalender-maerz.webp", viewer: "beside",
      },
      {
        x: 7192, y: 7676, w: 2882, h: 2037, src: "/images/pg-kalender-oktober.webp", viewer: "beside",
      },
      {
        x: 4800, y: 1500, w: 2047, h: 1448, src: "/images/pg-kalender-dezember.webp", viewer: "beside",
      },
      {
        x: 10400, y: 5880, w: 2438, h: 1725, src: "/images/pg-kalender-juni.webp", viewer: "beside",
      },
      {
        x: 681, y: 4348, w: 1595, h: 2128, src: "/images/pg-gift-popup.webp",
      },
      {
        x: 7613, y: 1308, w: 3615, h: 2034,
        src: "/images/pg-clip-hibi.webp", video: "/videos/pg-hibi.mp4", film: "/videos/pg-hibi-full.mp4",
        filmHd: "/videos/pg-hibi-hd.mp4",
      },
      {
        x: 11561, y: 1887, w: 2530, h: 1791, src: "/images/pg-kalender-cover.webp", viewer: "beside",
      },
    ],
    scribbles: [
      {
        target: "/images/pg-clip-hibi.webp",
        text: { en: "I developed an\nend-to-end web app", de: "Ich habe eine End-to-End-\nWeb-App entwickelt" },
        prefer: "top-right",
      },
      {
        target: "/images/pg-flyer.webp",
        text: { en: "I design posters too", de: "Ich gestalte auch Plakate" },
        prefer: "bottom-left",
      },
      {
        target: "/images/pg-kalender-juni.webp",
        text: { en: "calendar design for 2027", de: "Kalenderdesign für 2027" },
        tone: "accent",
        prefer: "bottom-right",
      },
    ],
  },
  {
    index: "02",
    label: { en: "Collage 2 of 4: blue work", de: "Collage 2 von 4: blaue Arbeiten" },
    name: { en: "Card 2", de: "Karte 2" },
    /* green */
    accent: "#1B7A4E",
    slots: [
      {
        x: 9473, y: 775, w: 1888, h: 2612, src: "/images/pg-bead.webp",
        // A tall picture in a shorter box: the design keeps the planter, not the ceiling.
        focus: "50% 59%",
      },
      {
        x: 5748, y: 7099, w: 3157, h: 2368, src: "/images/pg-painting-blossom.webp",
      },
      {
        x: 10499, y: 3787, w: 2048, h: 2732, src: "/images/pg-portrait.webp",
      },
      {
        x: 3069, y: 3489, w: 2480, h: 3508, src: "/images/pg-forest.webp",
      },
      {
        x: 1045, y: 3961, w: 1685, h: 2384, src: "/images/pg-poster-museum.webp",
      },
      {
        x: 5981, y: 534, w: 2924, h: 2714, src: "/images/pg-packaging-perfume-flat.webp",
      },
      {
        x: 12676, y: 3845, w: 2278, h: 2674, src: "/images/pg-packaging-perfume.webp",
      },
      {
        x: 5888, y: 3701, w: 4272, h: 2552, src: "/images/pg-mindruhe.webp",
      },
      {
        x: 2858, y: 1114, w: 2784, h: 1970, src: "/images/pg-kalender-mai.webp", viewer: "beside",
      },
      {
        x: 9248, y: 7099, w: 2969, h: 2102, src: "/images/pg-kalender-juli.webp", viewer: "beside",
      },
    ],
    scribbles: [
      {
        target: "/images/pg-forest.webp",
        text: { en: "digital painting on iPad", de: "Digitales Malen auf dem iPad" },
        prefer: "bottom-left",
      },
      {
        target: "/images/pg-packaging-perfume.webp",
        text: { en: "packaging design", de: "Verpackungsdesign" },
        tone: "accent",
        prefer: "top-left",
      },
    ],
  },
  {
    index: "03",
    label: { en: "Collage 3 of 4: dark work", de: "Collage 3 von 4: dunkle Arbeiten" },
    name: { en: "Card 3", de: "Karte 3" },
    /* black */
    accent: "#141414",
    slots: [
      {
        x: 9265, y: 7852, w: 1669, h: 1230, src: "/images/pg-abstract.webp", rotate: -90,
      },
      {
        x: 1046, y: 3969, w: 2412, h: 1781, src: "/images/pg-postcard-1.webp",
      },
      {
        x: 6678, y: 838, w: 3154, h: 2280, src: "/images/pg-bookcover.webp",
      },
      {
        x: 3580, y: 2129, w: 2109, h: 2811, src: "/images/pg-poster-hologram.webp",
      },
      {
        x: 6029, y: 3479, w: 4452, h: 2505,
        src: "/images/pg-clip-motorbike.webp", video: "/videos/pg-motorbike.mp4", film: "/videos/pg-motorbike-full.mp4",
        filmHd: "/videos/pg-motorbike-hd.mp4", audio: true,
      },
      {
        x: 10830, y: 1018.5, w: 1463, h: 2194, src: "/images/pg-line-study.webp",
      },
      {
        x: 12859, y: 4050, w: 2091, h: 2485, src: "/images/pg-group-portrait.webp",
        // A tall drawing in a shorter box: the design keeps the figures, not the sky.
        focus: "50% 100%",
      },
      {
        x: 10830, y: 3332.5, w: 1884, h: 2825, src: "/images/pg-photo-lowkey.webp",
      },
      {
        x: 3580, y: 5291, w: 2259, h: 3348, src: "/images/pg-typography-posters.webp",
      },
      {
        x: 9155, y: 6535, w: 3559, h: 1075, src: "/images/pg-desmark-logo.webp",
      },
      {
        x: 6029, y: 6692, w: 2940, h: 2270, src: "/images/pg-photo-stilllife.webp",
      },
    ],
    scribbles: [
      {
        target: "/images/pg-poster-hologram.webp",
        text: { en: "advertisement poster", de: "Werbeplakat" },
        prefer: "top-left",
      },
      {
        target: "/images/pg-group-portrait.webp",
        text: { en: "digital illustration", de: "Digitale Illustration" },
        prefer: "top-right",
      },
      {
        target: "/images/pg-desmark-logo.webp",
        text: { en: "logo for a\ndesign agency", de: "Logo für eine\nDesignagentur" },
        tone: "accent",
        prefer: "bottom-right",
      },
    ],
  },
  {
    index: "04",
    label: { en: "Collage 4 of 4: pink and lilac work", de: "Collage 4 von 4: rosa und lila Arbeiten" },
    name: { en: "Card 4", de: "Karte 4" },
    /* purple */
    accent: "#6A34B0",
    slots: [
      {
        x: 3392, y: 1225, w: 1796, h: 1282, src: "/images/pg-double-portrait.webp",
      },
      {
        x: 5493, y: 1026, w: 4003, h: 1211, src: "/images/pg-vtri-banner.webp",
      },
      {
        x: 9882, y: 1225, w: 2035, h: 2920,
        src: "/images/pg-clip-unboxing.webp", video: "/videos/pg-gift-unboxing.mp4", film: "/videos/pg-gift-unboxing-full.mp4",
      },
      {
        x: 1104, y: 4245, w: 1357, h: 2350,
        src: "/images/pg-clip-popup.webp", video: "/videos/pg-gift-popup.mp4", film: "/videos/pg-gift-popup-full.mp4",
      },
      {
        x: 2740, y: 3006, w: 1556, h: 2236, src: "/images/pg-frame-detail.webp",
      },
      {
        x: 4482, y: 2806, w: 1623, h: 3105,
        src: "/images/pg-clip-riona.webp", video: "/videos/pg-gift-riona.mp4", film: "/videos/pg-gift-riona-full.mp4",
      },
      {
        x: 6570, y: 2664, w: 2926, h: 2208, src: "/images/pg-kalender-februar.webp", viewer: "beside",
      },
      {
        x: 9776, y: 4387, w: 2274, h: 1609, src: "/images/pg-kalender-september.webp", viewer: "beside",
      },
      {
        x: 12422, y: 4131, w: 1556, h: 2236, src: "/images/pg-scooter.webp",
      },
      {
        x: 2740, y: 5700, w: 1400, h: 1800, src: "/images/pg-logo.webp", fit: "contain",
        focus: "50% 34%",
      },
      {
        x: 4482, y: 6239, w: 1702, h: 2593, src: "/images/pg-character.webp",
      },
      {
        x: 6570, y: 5214, w: 2913, h: 3946, src: "/images/pg-vtri-store.webp",
      },
      {
        x: 9762, y: 6382, w: 2274, h: 2274, src: "/images/pg-gift-popupbox.webp",
      },
    ],
    scribbles: [
      {
        target: "/images/pg-frame-detail.webp",
        text: { en: "I do crafts too", de: "Ich mache auch\nHandwerk" },
        position: { x: 340, y: 1750 },
        align: "left",
        arrowStart: "bottom-right",
      },
      {
        target: "/images/pg-vtri-store.webp",
        text: { en: "my design in a real store", de: "Mein Design in einem echten Laden" },
        prefer: "bottom-left",
      },
      {
        target: "/images/pg-clip-unboxing.webp",
        text: { en: "I love making custom gifts.", de: "Ich liebe individuelle Geschenke." },
        tone: "accent",
        prefer: "bottom-right",
      },
    ],
  },
];

export default withContent(cards);
