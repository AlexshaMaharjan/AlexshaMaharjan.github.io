import clsx from "clsx";
import type { ProcessBranchCopy } from "@/lib/dictionaries";
import type { BranchLayout } from "./branchData";
import { processClusters } from "./clusters";

export default function BranchGroup({
  branch,
  layout,
  index,
  active,
  locked,
  closeLabel,
  onEnter,
  onLeave,
  onClick,
  onClose,
  groupRef,
  pointerEvents = true,
  stacked = false,
}: {
  branch: ProcessBranchCopy;
  layout: BranchLayout;
  index: number;
  active: boolean;
  locked: boolean;
  closeLabel: string;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
  onClose: () => void;
  groupRef?: (el: HTMLDivElement | null) => void;
  pointerEvents?: boolean;
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
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={clsx(
        stacked ? "relative rounded-2xl border border-white/[0.09] bg-[#0C0D10] p-5" : "absolute",
      )}
      style={
        stacked
          ? { pointerEvents: pointerEvents ? "auto" : "none" }
          : {
              left: `${layout.left}%`,
              top: `${layout.top}%`,
              width: layout.width,
              pointerEvents: pointerEvents ? "auto" : "none",
            }
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
        <h3 className="m-0">
          <button
            type="button"
            onClick={onClick}
            onFocus={onEnter}
            onBlur={onLeave}
            aria-pressed={locked}
            className={clsx(
              "cursor-pointer border-0 bg-transparent p-0 text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-white",
              alignRight ? "text-right" : "text-left",
            )}
          >
            {branch.title}
          </button>
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
           * The hover zoom grows out of the edge the cluster hangs from. A
           * right-aligned cluster scaled from its top-LEFT corner grows
           * rightwards, and 105% of a box whose right edge is already 65 units
           * from the map's is 105% over the edge of a canvas that clips.
           */
          alignRight ? "origin-top-right justify-end" : "origin-top-left",
          // No zoom in the stacked layout: it is already at full size there,
          // and 105% of a column that fills the phone is 105% off the edge.
          active && !stacked && "scale-105",
        )}
      >
        {Cluster && <Cluster stacked={stacked} />}
      </div>
      {locked && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label={closeLabel}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[#16171C] text-[13px] text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
}
