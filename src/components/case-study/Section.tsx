import type { CaseStudySection } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function Section({
  section,
  dictionary,
  first = false,
}: {
  section: CaseStudySection;
  dictionary: Dictionary;
  first?: boolean;
}) {
  const body = (
    <>
      {section.body?.map((p, i) => (
        <p
          key={i}
          className={`text-[18px] leading-[1.65] text-ink-body ${i === 0 ? "mt-6" : "mt-4.5"}`}
        >
          {p}
        </p>
      ))}
    </>
  );

  const content = (
    <div className={first ? undefined : "max-w-[960px]"}>
      <h2 className="m-0 text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
        {section.heading}
      </h2>
      {body}

      {section.designQuestion && (
        <div className="mt-12 rounded-[10px] border border-[#E4E7EE] p-7">
          <span className="font-mono text-[12px] text-accent">{dictionary.caseStudy.designQuestion}</span>
          <p className="mt-3.5 text-[24px] font-medium leading-[1.35] tracking-[-0.01em]">{section.designQuestion}</p>
        </div>
      )}

      {section.insights && (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
          {section.insights.map((insight, i) => (
            <div key={i} className="border-t border-border pt-5">
              <h3 className="text-[20px] font-semibold leading-[1.3] tracking-[-0.01em]">{insight.heading}</h3>
              <p className="mt-3 text-[16px] leading-[1.6] text-ink-secondary">{insight.body}</p>
            </div>
          ))}
        </div>
      )}

      {section.testing && (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {section.testing.map((step, i) => (
            <div key={i} className="border-t border-border pt-5">
              <span className="font-mono text-[12px] text-accent">{step.label}</span>
              <p className="mt-2 text-[16px] leading-[1.6] text-ink-secondary">{step.body}</p>
            </div>
          ))}
        </div>
      )}

      {section.images && section.images.length > 0 && (
        <div
          className={`mt-10 grid gap-4 ${section.images.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
        >
          {section.images.map((img, i) => (
            <PlaceholderImage key={i} aspect={img.aspect} caption={img.caption} />
          ))}
        </div>
      )}
    </div>
  );

  if (first) {
    return content;
  }

  return (
    <section id={section.id} data-inview className="mt-24">
      <div className="mb-7">
        <span className="font-mono text-[13px] text-accent">{section.number}</span>
        <span className="mt-1.5 block text-[14px] text-accent">{section.navLabel}</span>
      </div>
      {content}
    </section>
  );
}
