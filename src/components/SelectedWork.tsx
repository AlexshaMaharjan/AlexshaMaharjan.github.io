import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import BentoGrid from "@/components/BentoGrid";

export default function SelectedWork({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section id="work" className="bg-white pb-10 pt-[160px]">
      <div className="container-page">
        <div data-inview className="mb-[110px] flex flex-col items-center gap-4 text-center">
          <span className="block text-[14px] text-accent">{dictionary.selectedWork.eyebrow}</span>
          <div className="max-w-[1120px]">
            <h2 className="text-section font-semibold leading-[1.04] tracking-[-0.025em] text-ink">
              {dictionary.selectedWork.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-[880px] text-[18px] leading-[1.65] text-ink-secondary">
              {dictionary.selectedWork.copy}
            </p>
          </div>
        </div>

        <BentoGrid locale={locale} dictionary={dictionary} />
      </div>
    </section>
  );
}
