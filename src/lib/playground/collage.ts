import type { Locale } from "@/lib/i18n";

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
export interface CollageSlot {
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
  alt: Record<Locale, string>;
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

export interface CollageCard {
  /** `01`–`04`, shown in the card's corner. */
  index: string;
  /** Names the card for screen readers. */
  label: Record<Locale, string>;
  slots: CollageSlot[];
}

/** The design canvas every slot is measured against. */
export const FRAME_W = 16000;
export const FRAME_H = 10000;

const cards: CollageCard[] = [
  {
    index: "01",
    label: { en: "Collage 1 of 4 — warm work", de: "Collage 1 von 4 — warme Arbeiten" },
    slots: [
      {
        x: 2723, y: 2044, w: 2201, h: 3267, src: "/images/pg-painting-luffy.webp",
        // The design pulls the crop to the picture's right edge.
        focus: "100% 50%",
        alt: {
          en: "A hand-painted wanted poster in the style of a manga bounty notice",
          de: "Ein handgemaltes Fahndungsplakat im Stil eines Manga-Steckbriefs",
        },
      },
      {
        x: 7525, y: 3678, w: 2543, h: 3596, src: "/images/pg-sunset.webp",
        alt: { en: "The sun setting over a bank of cloud", de: "Die Sonne geht über einer Wolkendecke unter" },
      },
      {
        x: 5280, y: 2912, w: 1798, h: 2399, src: "/images/pg-autumn.webp",
        alt: { en: "A path through autumn trees in orange and red", de: "Ein Weg durch herbstliche Bäume in Orange und Rot" },
      },
      {
        x: 4443, y: 5816, w: 2629, h: 2722, src: "/images/pg-flyer.webp",
        alt: {
          en: "A set of event cards in pink and black, laid out as a grid",
          de: "Eine Reihe von Veranstaltungskarten in Rosa und Schwarz als Raster",
        },
      },
      {
        x: 2604, y: 5677, w: 1660, h: 1999, src: "/images/pg-packaging-crisps.webp",
        alt: { en: "Packaging for a hot and spicy crisp brand", de: "Verpackung für eine scharfe Chips-Marke" },
      },
      {
        x: 13187, y: 4111, w: 2109, h: 2812, src: "/images/pg-painting-framed.webp",
        alt: {
          en: "A painted sky held up against a wall of red bows and fairy lights",
          de: "Ein gemalter Himmel, hochgehalten vor einer Wand aus roten Schleifen und Lichterketten",
        },
      },
      {
        x: 10342, y: 6013, w: 2571, h: 1820, src: "/images/pg-kalender-maerz.webp",
        alt: {
          en: "The March page of a typographic calendar, its flower drawn from the month's name",
          de: "Das März-Blatt eines typografischen Kalenders, die Blüte aus dem Monatsnamen gezeichnet",
        },
      },
      {
        x: 7192, y: 7676, w: 2882, h: 2037, src: "/images/pg-kalender-oktober.webp",
        alt: {
          en: "The October page of a typographic calendar, its flower drawn from the month's name",
          de: "Das Oktober-Blatt eines typografischen Kalenders, die Blüte aus dem Monatsnamen gezeichnet",
        },
      },
      {
        x: 5962, y: 1491, w: 1563, h: 1106, src: "/images/pg-kalender-dezember.webp",
        alt: {
          en: "The December page of a typographic calendar, its flower drawn from the month's name",
          de: "Das Dezember-Blatt eines typografischen Kalenders, die Blüte aus dem Monatsnamen gezeichnet",
        },
      },
      {
        x: 10342, y: 3952, w: 2438, h: 1725, src: "/images/pg-kalender-juni.webp",
        alt: {
          en: "The June page of a typographic calendar, its flower drawn from the month's name",
          de: "Das Juni-Blatt eines typografischen Kalenders, die Blüte aus dem Monatsnamen gezeichnet",
        },
      },
      {
        x: 681, y: 4348, w: 1595, h: 2128, src: "/images/pg-gift-popup.webp",
        alt: { en: "A pop-up birthday box with balloons and lettering", de: "Eine Pop-up-Geburtstagsbox mit Ballons und Schriftzug" },
      },
      {
        x: 7881, y: 1459, w: 3347, h: 1883,
        src: "/images/pg-clip-hibi.webp", video: "/videos/pg-hibi.mp4",
        alt: {
          en: "The Hibi task app, its to-do list and upcoming tasks on screen",
          de: "Die Aufgaben-App Hibi mit To-do-Liste und anstehenden Aufgaben",
        },
      },
      {
        x: 11561, y: 1887, w: 2530, h: 1791, src: "/images/pg-kalender-cover.webp",
        alt: {
          en: "The cover of a 2027 typographic calendar, its title over an outlined floral pattern",
          de: "Das Cover eines typografischen Kalenders 2027, Titel über einem Blütenmuster in Konturlinien",
        },
      },
    ],
  },
  {
    index: "02",
    label: { en: "Collage 2 of 4 — blue work", de: "Collage 2 von 4 — blaue Arbeiten" },
    slots: [
      {
        x: 9473, y: 775, w: 1888, h: 2612, src: "/images/pg-bead.webp",
        // A tall picture in a shorter box: the design keeps the planter, not the ceiling.
        focus: "50% 59%",
        alt: {
          en: "A beaded hanging planter among leaves, lit at night",
          de: "Eine Hängeampel aus Perlen zwischen Blättern, nachts beleuchtet",
        },
      },
      {
        x: 5748, y: 7099, w: 3157, h: 2368, src: "/images/pg-painting-blossom.webp",
        alt: { en: "Blue blossom branches painted in acrylic", de: "Blaue Blütenzweige in Acryl gemalt" },
      },
      {
        x: 10499, y: 3787, w: 2048, h: 2732, src: "/images/pg-portrait.webp",
        alt: {
          en: "A digital portrait of a woman in a green patterned dress",
          de: "Digitales Porträt einer Frau in grün gemustertem Kleid",
        },
      },
      {
        x: 3069, y: 3489, w: 2480, h: 3508, src: "/images/pg-forest.webp",
        alt: { en: "Light falling through a dense green forest", de: "Licht, das durch einen dichten grünen Wald fällt" },
      },
      {
        x: 1045, y: 3961, w: 1685, h: 2384, src: "/images/pg-poster-museum.webp",
        alt: {
          en: "An illustrated children's poster for a museum exhibition",
          de: "Ein illustriertes Kinderplakat für eine Museumsausstellung",
        },
      },
      {
        x: 5981, y: 534, w: 2924, h: 2714, src: "/images/pg-packaging-perfume-flat.webp",
        alt: { en: "Perfume packaging laid out flat", de: "Parfümverpackung flach ausgelegt" },
      },
      {
        x: 12676, y: 3845, w: 2278, h: 2674, src: "/images/pg-packaging-perfume.webp",
        alt: { en: "A navy perfume box with a floral pattern", de: "Eine dunkelblaue Parfümschachtel mit Blütenmuster" },
      },
      {
        x: 5888, y: 3701, w: 4272, h: 2552, src: "/images/pg-mindruhe.webp",
        alt: {
          en: "The MindRuhe landing page on a laptop, its calming methods arranged in a fan",
          de: "Die MindRuhe-Startseite auf einem Laptop, die Beruhigungsmethoden fächerförmig angeordnet",
        },
      },
      {
        x: 2858, y: 1114, w: 2784, h: 1970, src: "/images/pg-kalender-mai.webp",
        alt: {
          en: "The May page of a typographic calendar, its flower drawn from the month's name",
          de: "Das Mai-Blatt eines typografischen Kalenders, die Blüte aus dem Monatsnamen gezeichnet",
        },
      },
      {
        x: 9248, y: 7099, w: 2969, h: 2102, src: "/images/pg-kalender-juli.webp",
        alt: {
          en: "The July page of a typographic calendar, its flower drawn from the month's name",
          de: "Das Juli-Blatt eines typografischen Kalenders, die Blüte aus dem Monatsnamen gezeichnet",
        },
      },
    ],
  },
  {
    index: "03",
    label: { en: "Collage 3 of 4 — dark work", de: "Collage 3 von 4 — dunkle Arbeiten" },
    slots: [
      {
        x: 9265, y: 7852, w: 1669, h: 1230, src: "/images/pg-abstract.webp", rotate: -90,
        alt: { en: "A black and white burst of radiating shapes", de: "Ein schwarz-weißer Strahlenkranz aus Formen" },
      },
      {
        x: 1046, y: 3969, w: 2412, h: 1781, src: "/images/pg-postcard-1.webp",
        alt: { en: "A Schiller quote set around a circular path", de: "Ein Schiller-Zitat entlang einer Kreisbahn gesetzt" },
      },
      {
        x: 6678, y: 838, w: 3154, h: 2280, src: "/images/pg-bookcover.webp",
        alt: {
          en: "A book cover for “Glow in the Fog”, front and spine",
          de: "Ein Buchcover für „Glow in the Fog“, Vorderseite und Rücken",
        },
      },
      {
        x: 3580, y: 2129, w: 2109, h: 2811, src: "/images/pg-poster-hologram.webp",
        alt: { en: "A product poster for a holographic watch", de: "Ein Produktplakat für eine holografische Uhr" },
      },
      {
        x: 6029, y: 3479, w: 4452, h: 2505,
        src: "/images/pg-clip-motorbike.webp", video: "/videos/pg-motorbike.mp4",
        alt: {
          en: "A motorbike riding through a rain-lit city, seen from above",
          de: "Ein Motorrad fährt durch eine regennasse Stadt, von oben gesehen",
        },
      },
      {
        x: 10830, y: 1018.5, w: 1463, h: 2194, src: "/images/pg-line-study.webp",
        alt: {
          en: "A couple drawn in single-weight outline, no fill",
          de: "Ein Paar in gleichmäßiger Linie gezeichnet, ohne Füllung",
        },
      },
      {
        x: 12859, y: 4050, w: 2091, h: 2485, src: "/images/pg-group-portrait.webp",
        // A tall drawing in a shorter box: the design keeps the figures, not the sky.
        focus: "50% 100%",
        alt: { en: "Three women in saris, drawn as a group portrait", de: "Drei Frauen in Saris als Gruppenporträt gezeichnet" },
      },
      {
        x: 10830, y: 3332.5, w: 1884, h: 2825, src: "/images/pg-photo-lowkey.webp",
        alt: {
          en: "A singer lit by red and blue gels against black, mid-phrase with a microphone",
          de: "Eine singende Person in rotem und blauem Licht vor Schwarz, mit Mikrofon",
        },
      },
      {
        x: 3580, y: 5291, w: 2259, h: 3348, src: "/images/pg-typography-posters.webp",
        alt: {
          en: "Six typographic posters, each setting a word to act out its own meaning",
          de: "Sechs typografische Plakate, jedes setzt ein Wort so, dass es seine Bedeutung vorführt",
        },
      },
      {
        x: 9155, y: 6535, w: 3559, h: 1075, src: "/images/pg-desmark-logo.webp",
        alt: { en: "A logo lockup for the Desmark brand agency", de: "Eine Wort-Bild-Marke für die Markenagentur Desmark" },
      },
      {
        x: 6029, y: 6692, w: 2940, h: 2270, src: "/images/pg-photo-stilllife.webp",
        alt: {
          en: "Forks and grapes mirrored on black glass, arranged to read as a pair of eyes",
          de: "Gabeln und Weintrauben auf schwarzem Glas gespiegelt, angeordnet wie ein Augenpaar",
        },
      },
    ],
  },
  {
    index: "04",
    label: { en: "Collage 4 of 4 — pink and lilac work", de: "Collage 4 von 4 — rosa und lila Arbeiten" },
    slots: [
      {
        x: 9993, y: 4489, w: 1457, h: 1942, src: "/images/pg-frame.webp",
        alt: {
          en: "A hand-decorated photo frame held up against fairy lights",
          de: "Ein handverzierter Bilderrahmen vor einer Lichterkette",
        },
      },
      {
        x: 2483, y: 2739, w: 1677, h: 2235, src: "/images/pg-frame-detail.webp",
        alt: { en: "The same frame with beadwork and pressed flowers", de: "Derselbe Rahmen mit Perlen und gepressten Blüten" },
      },
      {
        x: 10096, y: 1146, w: 2700, h: 2701, src: "/images/pg-gift-cube.webp",
        alt: { en: "A stack of photo cubes forming a pyramid", de: "Ein Stapel Fotowürfel, zu einer Pyramide gesetzt" },
      },
      {
        x: 10096, y: 6977, w: 1354, h: 2407,
        src: "/images/pg-clip-riona.webp", video: "/videos/pg-gift-riona.mp4",
        alt: {
          en: "A pink marble keepsake box opening to reveal folded paper inside",
          de: "Eine rosa Marmorbox öffnet sich und gibt gefaltetes Papier frei",
        },
      },
      {
        x: 2713, y: 5460, w: 1475, h: 2621,
        src: "/images/pg-clip-popup.webp", video: "/videos/pg-gift-popup.mp4",
        alt: {
          en: "A pink and lilac pop-up box being opened, its photo panels standing up",
          de: "Eine rosa-lila Pop-up-Box wird geöffnet, die Fotoelemente stellen sich auf",
        },
      },
      {
        x: 4401, y: 1650, w: 1918, h: 2557,
        src: "/images/pg-clip-explosion.webp", video: "/videos/pg-gift-explosion.mp4",
        alt: {
          en: "Hands unfolding the layers of a black and pink explosion gift box",
          de: "Hände, die die Ebenen einer schwarz-rosa Explosionsbox auffalten",
        },
      },
      {
        x: 6592, y: 3733, w: 3127, h: 3947, src: "/images/pg-vtri-store.webp",
        alt: { en: "The VTRI banner installed above the shop window", de: "Das VTRI-Banner über dem Schaufenster montiert" },
      },
      {
        x: 570, y: 5165, w: 1930, h: 1287, src: "/images/pg-double-portrait.webp",
        alt: { en: "Two friends drawn side by side on a pink ground", de: "Zwei Freundinnen nebeneinander auf rosa Grund gezeichnet" },
      },
      {
        x: 11723, y: 6771, w: 1564, h: 2086, src: "/images/pg-scooter.webp",
        alt: { en: "A child on a scooter, drawn in flat colour", de: "Ein Kind auf einem Roller, in flachen Farben gezeichnet" },
      },
      {
        x: 6746, y: 8181, w: 2973, h: 849, src: "/images/pg-vtri-banner.webp",
        alt: { en: "A shopfront banner for the VTRI lingerie store", de: "Ein Ladenbanner für den VTRI-Wäschestore" },
      },
      {
        x: 11663, y: 3967, w: 3671, h: 2597, src: "/images/pg-kalender-februar.webp",
        alt: {
          en: "The February page of a typographic calendar, its flower drawn from the month's name",
          de: "Das Februar-Blatt eines typografischen Kalenders, die Blüte aus dem Monatsnamen gezeichnet",
        },
      },
      {
        x: 4401, y: 7503, w: 1918, h: 1356, src: "/images/pg-kalender-september.webp",
        alt: {
          en: "The September page of a typographic calendar, its flower drawn from the month's name",
          de: "Das September-Blatt eines typografischen Kalenders, die Blüte aus dem Monatsnamen gezeichnet",
        },
      },
      {
        x: 4401, y: 4560, w: 1836, h: 2597, src: "/images/pg-character.webp",
        alt: { en: "A figure holding an oversized red heart", de: "Eine Figur mit einem übergroßen roten Herz" },
      },
      {
        x: 6904, y: 836, w: 2192, h: 2686, src: "/images/pg-logo.webp",
        // The design sits the mark high in its box, not centred.
        focus: "50% 34%",
        alt: {
          en: "A monogram mark for Infrastruktur Technologie und Design",
          de: "Eine Wortbildmarke für Infrastruktur Technologie und Design",
        },
      },
    ],
  },
];

export default cards;
