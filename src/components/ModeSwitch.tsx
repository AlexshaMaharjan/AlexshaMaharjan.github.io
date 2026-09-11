import { Link } from "react-router-dom";
import clsx from "clsx";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * Portfolio or playground, at two sizes.
 *
 * ## Two controls above `md`, one below it (`MILESTONE-013` task 4)
 *
 * The wide switch is a segmented control: both destinations are on screen, the
 * one you are on is filled, and each half is its own link. It is the right
 * control when there is room for it, because it shows you the choice rather
 * than describing it.
 *
 * There is not room for it on a phone. It wanted about 200 x 46 in a header bar
 * that is 360 wide, which is why the switch spent `MILESTONE-011` living on a
 * **second row of its own** — 53px of header on every page, for one control.
 * The owner's instruction is a switch "with only a circle, and beside the
 * circle the toggled status", which is the on/off switch every phone already
 * has: a track, a knob, and the current state written next to it. That fits in
 * about 115 x 40 and goes back in the first row, and the second row is gone.
 *
 * ## Why the compact one is a single link
 *
 * A switch shows one state, so it cannot be two links: there is only one thing
 * on screen to click. It is therefore **one link to the other mode**, drawn
 * showing the mode you are in. That split is the whole reason it needs its own
 * accessible name: a screen reader must be told where the link goes, and what
 * the link *says* is where you already are.
 *
 * `role="switch"` would be the wrong repair. It is for a control that toggles
 * state in place, and this one navigates; announcing "switch, off" for a thing
 * that loads a different page is a worse lie than the one it fixes.
 *
 * The knob changes side with `order` rather than sliding across an absolutely
 * positioned track. A slide would never be seen — the knob only moves because
 * the route changed, and the page changes under it in the same frame — and a
 * fixed-width track has to be wide enough for the longest label in every
 * locale, which is a number that goes stale the first time somebody translates
 * the word "Playground".
 */
export default function ModeSwitch({
  locale,
  isPlayground,
  dictionary,
  compact = false,
}: {
  locale: Locale;
  isPlayground: boolean;
  dictionary: Dictionary;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <Link
        to={localeHref(locale, isPlayground ? "/" : "/playground")}
        aria-label={isPlayground ? dictionary.nav.switchToPortfolio : dictionary.nav.switchToPlayground}
        className={clsx(
          "inline-flex h-10 items-center rounded-full border p-[3px] transition-colors focus-visible:outline-2 focus-visible:outline-accent-focus",
          isPlayground ? "border-transparent bg-accent" : "border-[#E3E6EB] bg-surface",
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            "h-8 w-8 shrink-0 rounded-full",
            isPlayground ? "order-2 bg-white" : "order-1 bg-[#111114]",
          )}
        />
        <span
          className={clsx(
            "px-[11px] text-[12.5px] font-medium leading-none",
            isPlayground ? "order-1 text-white" : "order-2 text-ink-secondary",
          )}
        >
          {isPlayground ? dictionary.nav.playground : dictionary.nav.portfolio}
        </span>
      </Link>
    );
  }

  return (
    <div
      role="group"
      aria-label={dictionary.nav.modeSwitchLabel}
      className={clsx(
        "inline-flex items-center rounded-full border p-[3px] text-[14px]",
        isPlayground ? "border-[rgba(78,96,135,0.18)] bg-white/70" : "border-[#E3E6EB] bg-surface",
      )}
    >
      <Link
        to={localeHref(locale, "/")}
        aria-current={!isPlayground ? "page" : undefined}
        className={clsx(
          "flex min-h-[44px] items-center rounded-full px-[22px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent-focus",
          !isPlayground ? "bg-[#111114] text-white" : "text-ink-secondary hover:text-ink",
        )}
      >
        {dictionary.nav.portfolio}
      </Link>
      <Link
        to={localeHref(locale, "/playground")}
        aria-current={isPlayground ? "page" : undefined}
        className={clsx(
          "flex min-h-[44px] items-center rounded-full px-[22px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent-focus",
          isPlayground ? "bg-accent text-white" : "text-ink-secondary hover:text-ink",
        )}
      >
        {dictionary.nav.playground}
      </Link>
    </div>
  );
}
