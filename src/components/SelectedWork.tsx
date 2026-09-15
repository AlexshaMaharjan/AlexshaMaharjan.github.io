import type { CSSProperties } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import WorkGrid from "@/components/WorkGrid";

export default function SelectedWork({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section
      id="work"
      data-anchor-pad
      style={{ "--anchor-pad": "140px" } as CSSProperties}
      className="bg-white pb-12 pt-14 sm:pb-16 sm:pt-16 md:pb-20 md:pt-24"
    >
      <div className="container-page">
        <div data-inview="text" className="mb-8 flex flex-col items-center gap-4 text-center sm:mb-12 md:mb-16">
          <span className="block text-[14px] text-accent">{dictionary.selectedWork.eyebrow}</span>
          <h2
            className="max-w-[1120px] text-section font-semibold leading-[1.1] tracking-[-0.025em] text-ink"
            style={{ textWrap: "balance" }}
          >
            {dictionary.selectedWork.heading}
          </h2>
          <p className="mx-auto mt-3.5 max-w-[840px] text-[15.5px] leading-[1.6] text-ink-secondary sm:mt-4 sm:text-[16.5px] sm:leading-[1.65]">
            {dictionary.selectedWork.copy}
          </p>
        </div>

        <WorkGrid locale={locale} dictionary={dictionary} />
      </div>
    </section>
  );
}
