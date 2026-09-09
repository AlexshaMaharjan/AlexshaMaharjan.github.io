import type { PlaygroundCategoryLocaleContent } from "../types";

const graphicExperiments: PlaygroundCategoryLocaleContent = {
  en: {
    slug: "graphic-experiments",
    title: "Graphic and Logo Experiments",
    intro: "Posters, logo studies and directions that never shipped — kept because they taught me something.",
    items: [
      { caption: "Logo study", aspect: "803/1115", src: "/images/pg-logo.webp", alt: "A monogram mark for Infrastruktur Technologie und Design" },
      { caption: "Abstract shape poster", aspect: "1035/1359", rotated: true, src: "/images/pg-abstract.webp", alt: "A black and white burst of radiating shapes" },
      { caption: "Hologram poster", aspect: "1200/1553", src: "/images/pg-poster-hologram.webp", alt: "A product poster for a holographic watch" },
      { caption: "Museum poster", aspect: "1200/1658", src: "/images/pg-poster-museum.webp", alt: "An illustrated children's poster for a museum exhibition" },
      { caption: "Crisp packet", aspect: "794/956", src: "/images/pg-packaging-crisps.webp", alt: "Packaging for a hot and spicy crisp brand" },
      { caption: "Perfume box", aspect: "656/770", src: "/images/pg-packaging-perfume.webp", alt: "A navy perfume box with a floral pattern" },
      { caption: "Perfume box — unfolded", aspect: "1185/1100", rotated: true, src: "/images/pg-packaging-perfume-flat.webp", alt: "The same perfume packaging laid out flat" },
      { caption: "VTRI banner", aspect: "1200/343", src: "/images/pg-vtri-banner.webp", alt: "A shopfront banner for the VTRI lingerie store" },
      { caption: "VTRI storefront", aspect: "1200/1515", src: "/images/pg-vtri-store.webp", alt: "The VTRI banner installed above the shop window" },
    ],
    moreComingNote: "More to come — this space grows with every experiment.",
    nextCategorySlug: "3d-motion",
    nextCategoryTitle: "3D and Motion",
  },
  de: {
    slug: "graphic-experiments",
    title: "Grafik- und Logoexperimente",
    intro:
      "Poster, Logostudien und nie umgesetzte Richtungen — aufbewahrt, weil sie mir etwas beigebracht haben.",
    items: [
      { caption: "Logostudie", aspect: "803/1115", src: "/images/pg-logo.webp", alt: "Eine Wortbildmarke für Infrastruktur Technologie und Design" },
      { caption: "Abstraktes Formplakat", aspect: "1035/1359", rotated: true, src: "/images/pg-abstract.webp", alt: "Ein schwarz-weißer Strahlenkranz aus Formen" },
      { caption: "Hologramm-Plakat", aspect: "1200/1553", src: "/images/pg-poster-hologram.webp", alt: "Ein Produktplakat für eine holografische Uhr" },
      { caption: "Museumsplakat", aspect: "1200/1658", src: "/images/pg-poster-museum.webp", alt: "Ein illustriertes Kinderplakat für eine Museumsausstellung" },
      { caption: "Chips-Verpackung", aspect: "794/956", src: "/images/pg-packaging-crisps.webp", alt: "Verpackung für eine scharfe Chips-Marke" },
      { caption: "Parfüm-Verpackung", aspect: "656/770", src: "/images/pg-packaging-perfume.webp", alt: "Eine dunkelblaue Parfümschachtel mit Blütenmuster" },
      { caption: "Parfüm-Verpackung — abgewickelt", aspect: "1185/1100", rotated: true, src: "/images/pg-packaging-perfume-flat.webp", alt: "Dieselbe Parfümverpackung flach ausgelegt" },
      { caption: "VTRI-Banner", aspect: "1200/343", src: "/images/pg-vtri-banner.webp", alt: "Ein Ladenbanner für den VTRI-Wäschestore" },
      { caption: "VTRI-Ladenfront", aspect: "1200/1515", src: "/images/pg-vtri-store.webp", alt: "Das VTRI-Banner über dem Schaufenster montiert" },
    ],
    moreComingNote: "Weitere Arbeiten folgen — dieser Bereich wächst mit jedem Experiment.",
    nextCategorySlug: "3d-motion",
    nextCategoryTitle: "3D und Motion",
  },
};

export default graphicExperiments;
