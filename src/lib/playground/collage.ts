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
        /*
         * Down 7% from 2201 x 3267, about its own centre (`MILESTONE-023` task
         * 9: *"make the acrylic wanted poster slightly smaller"*). Centred
         * rather than corner-anchored because nothing was said about which way
         * it should shrink, and its neighbours are on both sides of it — the
         * gift box to the left and the autumn path to the right.
         */
        x: 2800, y: 2158, w: 2047, h: 3038, src: "/images/pg-painting-luffy.webp",
        // The design pulls the crop to the picture's right edge.
        focus: "100% 50%",
      },
      {
        x: 7525, y: 3678, w: 2543, h: 3596, src: "/images/pg-sunset.webp",
      },
      {
        x: 5280, y: 2912, w: 1798, h: 2399, src: "/images/pg-autumn.webp",
      },
      {
        x: 4443, y: 5816, w: 2629, h: 2722, src: "/images/pg-flyer.webp",
      },
      {
        x: 2604, y: 5677, w: 1660, h: 1999, src: "/images/pg-packaging-crisps.webp",
      },
      {
        x: 13187, y: 4111, w: 2109, h: 2812, src: "/images/pg-painting-framed.webp",
      },
      {
        x: 10342, y: 6013, w: 2571, h: 1820, src: "/images/pg-kalender-maerz.webp", viewer: "beside",
      },
      {
        x: 7192, y: 7676, w: 2882, h: 2037, src: "/images/pg-kalender-oktober.webp", viewer: "beside",
      },
      {
        /*
         * Up 8%, and then moved (`MILESTONE-023` task 9).
         *
         * The owner asked for this and the Hibi clip to grow **from the
         * top-left, with the bottom-right corner fixed**, and for the gap
         * between the two to stay exactly as it was. Those two instructions
         * cannot both be taken literally: December sits to the *left* of the
         * clip, so a clip that grows leftwards closes the gap — at +8% it went
         * from 356 units to 88, which at a 1280px stage is 28px down to 7.
         *
         * So the resize is the literal one — 1563 x 1106 becomes 1688 x 1194
         * about the bottom-right corner at (7525, 2597) — and then the whole
         * box is translated left by 268, exactly as far as the clip's left edge
         * moved. The gap is 356 before and 356 after, and the pair grows
         * together instead of one closing on the other.
         */
        x: 5569, y: 1403, w: 1688, h: 1194, src: "/images/pg-kalender-dezember.webp", viewer: "beside",
      },
      {
        x: 10342, y: 3952, w: 2438, h: 1725, src: "/images/pg-kalender-juni.webp", viewer: "beside",
      },
      {
        x: 681, y: 4348, w: 1595, h: 2128, src: "/images/pg-gift-popup.webp",
      },
      {
        /*
         * Up 8% about its bottom-right corner at (11228, 3342), which is the
         * literal reading of the owner's "resize from the top-left, keep the
         * bottom-right where it is". See the December calendar above for the
         * half of the instruction that had to be resolved.
         */
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
        text: { en: "my own\ntask app", de: "meine eigene\nAufgaben-App" },
        prefer: "top-right",
      },
      {
        target: "/images/pg-flyer.webp",
        text: { en: "event flyer,\npink on black", de: "Flyer, Rosa\nauf Schwarz" },
        prefer: "bottom-left",
      },
      {
        /*
         * The note names the March page, not the cover (`MILESTONE-011` task
         * 5). It said "a whole year, one flower a month" and pointed at the
         * 2027 cover, which is the one picture on the card that shows no month
         * at all — the sentence is about the series and it now points at a page
         * of it, which is what makes the idea legible.
         */
        target: "/images/pg-kalender-maerz.webp",
        text: { en: "a whole year,\none flower\na month", de: "ein ganzes\nJahr, eine\nBlüte je Monat" },
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
        text: { en: "light is the\nwhole subject", de: "das Licht ist\ndas Motiv" },
        prefer: "bottom-left",
      },
      {
        /*
         * "flat, then folded" pointing at the flat one was the sentence ending
         * where it started. It points at the folded one now (`MILESTONE-011`
         * task 6), so the arrow lands on the finished box and the words carry
         * the eye from the template to the result.
         */
        target: "/images/pg-packaging-perfume.webp",
        text: { en: "perfume: flat,\nthen folded", de: "Parfüm: flach,\ndann gefaltet" },
        tone: "accent",
        // Above the box and a little to its left, which is where frame 2's
        // annotation sits and not the top-right corner it looks like on a
        // first read of the frame.
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
        text: { en: "holographic watch,\nall concept", de: "Holo-Uhr,\nreines Konzept" },
        prefer: "top-left",
      },
      {
        /*
         * Card 3's third note (`MILESTONE-012` task 2). The owner's Figma
         * frame 3 carries three annotations and this card shipped two: the
         * missing one is the top right, where the arrow springs off the top
         * corner of the group portrait.
         */
        target: "/images/pg-group-portrait.webp",
        text: { en: "drawn from\none photo", de: "nach einem\neinzigen Foto" },
        prefer: "top-right",
      },
      {
        target: "/images/pg-desmark-logo.webp",
        text: { en: "Desmark,\na brand agency", de: "Desmark,\nMarkenagentur" },
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
        x: 9993, y: 4489, w: 1457, h: 1942, src: "/images/pg-frame.webp",
      },
      {
        x: 2483, y: 2739, w: 1677, h: 2235, src: "/images/pg-frame-detail.webp",
      },
      {
        x: 10096, y: 1146, w: 2700, h: 2701, src: "/images/pg-gift-cube.webp",
      },
      {
        x: 10096, y: 6977, w: 1354, h: 2407,
        src: "/images/pg-clip-riona.webp", video: "/videos/pg-gift-riona.mp4", film: "/videos/pg-gift-riona-full.mp4",
        filmHd: "/videos/pg-gift-riona-hd.mp4",
      },
      {
        x: 2713, y: 5460, w: 1475, h: 2621,
        src: "/images/pg-clip-popup.webp", video: "/videos/pg-gift-popup.mp4", film: "/videos/pg-gift-popup-full.mp4",
        filmHd: "/videos/pg-gift-popup-hd.mp4",
      },
      {
        x: 4401, y: 1650, w: 1918, h: 2557,
        src: "/images/pg-clip-explosion.webp", video: "/videos/pg-gift-explosion.mp4", film: "/videos/pg-gift-explosion-full.mp4",
        filmHd: "/videos/pg-gift-explosion-hd.mp4",
      },
      {
        x: 6592, y: 3733, w: 3127, h: 3947, src: "/images/pg-vtri-store.webp",
      },
      {
        x: 570, y: 5165, w: 1930, h: 1287, src: "/images/pg-double-portrait.webp",
      },
      {
        x: 11723, y: 6771, w: 1564, h: 2086, src: "/images/pg-scooter.webp",
      },
      {
        x: 6746, y: 8181, w: 2973, h: 849, src: "/images/pg-vtri-banner.webp",
      },
      {
        x: 11663, y: 3967, w: 3671, h: 2597, src: "/images/pg-kalender-februar.webp", viewer: "beside",
      },
      {
        x: 4401, y: 7503, w: 1918, h: 1356, src: "/images/pg-kalender-september.webp", viewer: "beside",
      },
      {
        x: 4401, y: 4560, w: 1836, h: 2597, src: "/images/pg-character.webp",
      },
      {
        /*
         * **Contained, not cropped** (`MILESTONE-023` task 10). The slot is
         * 2192 x 2686 — 0.816 — and the artwork is 803 x 1115 — 0.720 — so
         * `object-cover` scaled it to the slot's width and took 12% of its
         * height off the top and bottom, which on a monogram is the ascender
         * and the baseline. `fit: "contain"` keeps the box exactly where the
         * design puts it and shows the whole mark inside it; the card is white,
         * so the letterbox is invisible.
         */
        x: 6904, y: 836, w: 2192, h: 2686, src: "/images/pg-logo.webp", fit: "contain",
        // The design sits the mark high in its box, not centred.
        focus: "50% 34%",
      },
    ],
    scribbles: [
      {
        target: "/images/pg-frame-detail.webp",
        text: { en: "beads, ribbon,\nfairy lights", de: "Perlen, Band,\nLichterkette" },
        prefer: "top-left",
      },
      {
        /*
         * The banner artwork, saying where it ended up (`MILESTONE-011` task
         * 8). The card carries both halves — `pg-vtri-banner` is the flat
         * design, `pg-vtri-store` the photograph of it installed above the
         * shop window — and the note goes on the design, because that is the
         * one whose point is not obvious from looking at it.
         *
         * It is also the only one of the two a note can reach: `pg-vtri-store`
         * has a picture hard against all four of its sides, and every seat near
         * it puts 79px of arrow across a photograph.
         */
        target: "/images/pg-vtri-banner.webp",
        text: { en: "up on a real\nstorefront", de: "an einer echten\nLadenfront" },
        prefer: "bottom-left",
      },
      {
        target: "/images/pg-gift-cube.webp",
        text: { en: "photo cubes,\nstacked into\na pyramid", de: "Fotowürfel, zur\nPyramide\ngestapelt" },
        tone: "accent",
        /*
         * Frame 4 puts this one *beside* the pyramid, a shade below its middle
         * — 1.7 widths across and 0.4 heights down — which is `bottom-right`
         * of the four this can say, not the `top-right` the corner of the
         * frame suggests. It matters: the pyramid's top edge is already near
         * the top of the card, so "above and to the right" is a strip with no
         * room in it, and the note ends up jammed against the picture with an
         * arrow too short to see.
         */
        prefer: "bottom-right",
      },
    ],
  },
];

export default withContent(cards);
