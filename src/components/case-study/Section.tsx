import type { Block, CaseStudySection } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";
import Figure from "./Figure";

/** A bare string in `body[]` is shorthand for a paragraph (ISSUE-024). */
function normalize(block: Block): Exclude<Block, string> {
  return typeof block === "string" ? { kind: "p", text: block } : block;
}

/**
 * Renders one `body[]` block. `first` only affects the top margin — the block
 * opening a section sits closer to its heading than blocks that follow one
 * another.
 */
function BodyBlock({ block, first }: { block: Block; first: boolean }) {
  const b = normalize(block);

  switch (b.kind) {
    case "p":
      return (
        <p className={`text-[18px] leading-[1.65] text-ink-body ${first ? "mt-6" : "mt-4.5"}`}>
          {b.text}
        </p>
      );

    case "h3":
      return (
        <h3
          className={`text-[21px] font-semibold leading-[1.3] tracking-[-0.01em] ${first ? "mt-8" : "mt-11"}`}
        >
          {b.text}
        </h3>
      );

    case "list": {
      const List = b.ordered ? "ol" : "ul";
      return (
        <List
          className={`flex list-outside flex-col gap-2.5 pl-5 text-[18px] leading-[1.6] text-ink-body marker:text-accent ${
            b.ordered ? "list-decimal" : "list-disc"
          } ${first ? "mt-6" : "mt-5"}`}
        >
          {b.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </List>
      );
    }

    case "quote":
      return (
        <blockquote className={first ? "mt-6" : "mt-9"}>
          <p className="border-l-2 border-accent pl-6 text-[22px] font-medium leading-[1.4] tracking-[-0.01em]">
            {b.text}
          </p>
          {b.attribution && (
            <cite className="mt-3 block pl-6 not-italic text-[14px] text-ink-secondary">
              {b.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "note":
      return (
        <p
          className={`rounded-[10px] border border-border bg-surface px-5 py-4 text-[15px] leading-[1.6] text-ink-secondary ${
            first ? "mt-6" : "mt-7"
          }`}
        >
          {b.text}
        </p>
      );

    case "figure":
      return <Figure {...b} className={first ? "mt-6" : "mt-10"} />;
  }
}

/**
 * One case-study section. Every section takes the same render path — number,
 * nav label, heading, body, then its optional blocks — and `first` varies only
 * the top margin. Splitting the first section out is what cost it its eyebrow
 * and its scroll reveal (ISSUE-008).
 */
export default function Section({
  section,
  dictionary,
  first = false,
}: {
  section: CaseStudySection;
  dictionary: Dictionary;
  first?: boolean;
}) {
  return (
    <section id={section.id} data-inview className={first ? undefined : "mt-24"}>
      <div className="mb-7">
        <span className="font-mono text-[13px] text-accent">{section.number}</span>
        <span className="mt-1.5 block text-[14px] text-accent">{section.navLabel}</span>
      </div>

      <div className="max-w-[960px]">
        <h2 className="m-0 text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
          {section.heading}
        </h2>

        {section.body?.map((block, i) => <BodyBlock key={i} block={block} first={i === 0} />)}

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
              <Figure key={i} {...img} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
