import type { PlaygroundHomeLocaleContent } from "./types";

/**
 * The playground's first screen, and the label on its motion control.
 *
 * Everything else this file used to hold — a hero collage, a hand note, a
 * "still to come" label, an "exploring" list, a closing note and a return
 * link — belonged to layouts the playground has not had since `DECISION-027`,
 * and nothing read any of it. It was removed with the categories in
 * `MILESTONE-014`.
 */
const home: PlaygroundHomeLocaleContent = {
  en: {
    eyebrow: "Personal work collection",
    heading: "Personal work and experiments.",
    intro: "Projects, crafts and experiments collected over time, from things I make for fun to ideas I use to learn something new.",
    /*
     * The kinds of making that are actually on the four collages, in the
     * homepage's own tag idiom so the two first screens read as one site
     * (`MILESTONE-011` task 3). Nothing here names something the cards do not
     * show.
     */
    tags: "Crafts · Digital Art · Graphic Design · Apps · Photography & 3D",
    pauseMotion: "Pause the clips",
    playMotion: "Play the clips",
  },
  de: {
    eyebrow: "Sammlung persönlicher Arbeiten",
    heading: "Persönliche Arbeiten und Experimente.",
    intro: "Projekte, Handarbeit und Experimente im Laufe der Zeit, von Dingen aus Freude bis zu Ideen, mit denen ich Neues lerne.",
    tags: "Handarbeit · Digitale Kunst · Grafikdesign · Apps · Fotografie & 3D",
    pauseMotion: "Clips anhalten",
    playMotion: "Clips abspielen",
  },
};

export default home;
