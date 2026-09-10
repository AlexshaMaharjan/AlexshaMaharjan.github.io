import type { PlaygroundHomeLocaleContent } from "./types";

const home: PlaygroundHomeLocaleContent = {
  en: {
    eyebrow: "Playground — personal work",
    heading: "Things I make without a brief.",
    intro: "Drawings, objects, experiments and ideas created through curiosity.",
    handNote: "made out of curiosity ↗",
    heroCards: [
      { caption: "digital portrait", subtitle: "digital drawing", aspect: "1200/1601", src: "/images/pg-portrait.webp", alt: "A digital portrait of a woman in a red patterned dress" },
      { caption: "handmade frame", subtitle: "paper & beads", aspect: "1200/1600", src: "/images/pg-frame.webp", alt: "A hand-decorated photo frame held up against fairy lights" },
    ],
    pauseMotion: "Pause the clips",
    playMotion: "Play the clips",
    categoriesHeading: "Categories",
    categoriesCaption: "five kinds of making — all of it is on this page",
    pendingLabel: "still to come —",
    exploringHeading: "Currently exploring —",
    exploringItems: ["Unreal animation", "beadwork", "motion studies"],
    noteBody:
      "Not every idea needs to become a case study. This is where I collect experiments, unfinished directions and things I make simply because I enjoy making them.",
    returnCta: "Back to Portfolio",
  },
  de: {
    eyebrow: "Playground — persönliche Arbeiten",
    heading: "Dinge, die ich ohne Briefing gestalte.",
    intro: "Zeichnungen, Objekte, Experimente und Ideen, die aus Neugier entstehen.",
    handNote: "aus Neugier gemacht ↗",
    heroCards: [
      { caption: "digitales Porträt", subtitle: "digitale Zeichnung", aspect: "1200/1601", src: "/images/pg-portrait.webp", alt: "Digitales Porträt einer Frau in rot gemustertem Kleid" },
      { caption: "handgemachter Rahmen", subtitle: "Papier & Perlen", aspect: "1200/1600", src: "/images/pg-frame.webp", alt: "Ein handverzierter Bilderrahmen vor einer Lichterkette" },
    ],
    pauseMotion: "Clips anhalten",
    playMotion: "Clips abspielen",
    categoriesHeading: "Kategorien",
    categoriesCaption: "Fünf Arten des Machens — alles auf dieser Seite",
    pendingLabel: "kommt noch —",
    exploringHeading: "Aktuell am Entdecken —",
    exploringItems: ["Unreal animation", "Perlenkunst", "Motion-Studien"],
    noteBody:
      "Nicht jede Idee muss zu einer Fallstudie werden. Hier sammle ich Experimente, unfertige Richtungen und Dinge, die ich einfach gestalte, weil mir das Gestalten Freude macht.",
    returnCta: "Zurück zum Portfolio",
  },
};

export default home;
