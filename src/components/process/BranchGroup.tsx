import clsx from "clsx";
import type { ProcessBranchCopy } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { BranchLayout } from "./branchData";
import { processClusters } from "./clusters";

/**
 * One step of the process map.
 *
 * **It is read, not operated** (owner, SESSION-049, task 6). It used to carry
 * `active`, `locked` and four handlers: hover dimmed its four neighbours and
 * grew this one to 105%, a click locked that until an ✕ released it. All of it
 * is gone, and with it the one thing that was genuinely wrong in the markup —
 * the step's title was a `<button>` whose entire behaviour was "make the other
 * four steps fainter", which is a control that announces itself to a screen
 * reader as an action and performs a visual effect that screen reader cannot
 * see. It is an `h3` now, which is what it looks like and what it is.
 */
export default function BranchGroup({
  branch,
  layout,
  index,
  groupRef,
  stacked = false,
  locale = "de",
}: {
  branch: ProcessBranchCopy;
  layout: BranchLayout;
  index: number;
  groupRef?: (el: HTMLDivElement | null) => void;
  /**
   * Laid out in the normal flow rather than pinned to the map
   * (`MILESTONE-011` task 10). The phone has no map to be pinned to.
   *
   * Since `MILESTONE-013` task 4 it is also a **card**: a bordered box with the
   * number in a chip, the step's question under its title, and the cluster's
   * own pieces wrapping inside it. The column before it was the same five
   * groups with 48 pixels of black between them, and on a black canvas that is
   * not a separation — the eye ran the bottom of 02 into the top of 03 and the
   * five steps read as one very long list of small pictures. `HeroProcess`
   * draws a dashed stroke between the cards, so what the map says with five
   * connectors the phone says with four ticks down the middle.
   */
  stacked?: boolean;
  locale?: Locale;
}) {
  const Cluster = processClusters[index];
  /*
   * The two right-hand steps hang from their own right edge
   * (`MILESTONE-012` task 1). See `branchData.BranchLayout.align`: the boxes
   * were already symmetric and only their contents were not.
   *
   * Not in the stacked layout, where the five steps are one column on a phone
   * and there is nothing to mirror — `layout.align` is read only when the map
   * is the map.
   */
  const alignRight = !stacked && layout.align === "right";
  return (
    <div
      ref={groupRef}
      role="group"
      aria-label={branch.ariaLabel}
      className={clsx(
        stacked ? "relative rounded-2xl border border-white/[0.09] bg-[#0C0D10] p-5" : "absolute",
      )}
      style={
        stacked
          ? undefined
          : { left: `${layout.left}%`, top: `${layout.top}%`, width: layout.width }
      }
      data-branch-group
    >
      <div className={clsx("flex items-baseline gap-3", alignRight && "justify-end")}>
        <span
          className={clsx(
            "font-mono text-[12px] text-accent-on-dark",
            // A chip on the card, so the number reads as the step's label and
            // not as a stray figure beside a heading.
            stacked && "rounded-md bg-accent-on-dark/10 px-2 py-1 leading-none",
          )}
        >
          {branch.number}
        </span>
        <h3
          className={clsx(
            "m-0 text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-white",
            alignRight ? "text-right" : "text-left",
          )}
        >
          {branch.title}
        </h3>
      </div>
      <p className={clsx("mt-[7px] text-[13px] leading-[1.4] text-[#9AA0A8]", alignRight && "text-right")}>
        {branch.question}
      </p>
      {/*
        The clusters are illustrations — miniature mock interfaces drawn in DOM
        rather than exported as images. Their labels ("Mono labels",
        "Disabled", "— Interview participant") are texture, they are hard-coded
        English on both locales, and a screen reader was reading them out as
        content. `dictionary.process.srSummary` is the text alternative for
        this whole canvas (ISSUE-030).
      */}
      <div
        aria-hidden="true"
        className={clsx(
          "mt-[18px] transition-transform duration-[350ms] ease-out",
          // The pinned map wraps its pieces at their own widths; the phone card
          // grows them to fill its rows. See `.process-bento` in `index.css`.
          stacked ? "process-bento" : "flex flex-wrap items-start gap-2.5",
          /*
           * The transform origin is kept though the hover zoom that needed it
           * is gone: it is the edge each cluster hangs from, which is also the
           * edge the arrival animation should settle towards.
           */
          alignRight ? "origin-top-right justify-end" : "origin-top-left",
        )}
      >
        {Cluster && <Cluster stacked={stacked} locale={locale} />}
      </div>
    </div>
  );
}
