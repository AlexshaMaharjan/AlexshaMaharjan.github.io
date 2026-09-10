import type { CSSProperties } from "react";

/**
 * The playground's paper: a 32px grid with an 8px grid faint inside it.
 *
 * It is shared rather than repeated because it is now painted twice — once by
 * `PlaygroundLayout` behind the whole section, and once by every card in the
 * stack, which has to carry its own copy because a card slides over the page
 * and would otherwise show through as a blank panel.
 */
export const gridBackground: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(78,96,135,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(78,96,135,0.055) 1px, transparent 1px), linear-gradient(rgba(78,96,135,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(78,96,135,0.025) 1px, transparent 1px)",
  backgroundSize: "32px 32px, 32px 32px, 8px 8px, 8px 8px",
};
