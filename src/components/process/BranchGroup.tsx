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
}) {
  const Cluster = processClusters[index];
  return (
    <div
      ref={groupRef}
      role="group"
      aria-label={branch.ariaLabel}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute"
      style={{
        left: `${layout.left}%`,
        top: `${layout.top}%`,
        width: layout.width,
        pointerEvents: pointerEvents ? "auto" : "none",
      }}
      data-branch-group
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[12px] text-[#8FA6FF]">{branch.number}</span>
        <h3 className="m-0">
          <button
            type="button"
            onClick={onClick}
            onFocus={onEnter}
            onBlur={onLeave}
            aria-pressed={locked}
            className="cursor-pointer border-0 bg-transparent p-0 text-left text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-white"
          >
            {branch.title}
          </button>
        </h3>
      </div>
      <p className="mt-[7px] text-[13px] leading-[1.4] text-[#9AA0A8]">{branch.question}</p>
      <div
        className={clsx(
          "mt-[18px] flex origin-top-left flex-wrap items-start gap-2.5 transition-transform duration-[350ms] ease-out",
          active && "scale-105",
        )}
      >
        {Cluster && <Cluster />}
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
