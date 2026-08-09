import { Link } from "react-router-dom";
import clsx from "clsx";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export default function ModeSwitch({
  locale,
  isPlayground,
  dictionary,
}: {
  locale: Locale;
  isPlayground: boolean;
  dictionary: Dictionary;
}) {
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
