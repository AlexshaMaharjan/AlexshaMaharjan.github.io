import type { ReactNode } from "react";
import type { Block, CaseStudySection } from "@/lib/caseStudies/types";
import type { Dictionary } from "@/lib/dictionaries";
import Figure from "./Figure";
import SectionMedia from "./SectionMedia";
import HandArrow from "@/components/HandArrow";

/**
 * The reading measure.
 *
 * It used to be 680px against media that ran to the column edge — a deliberate
 * editorial rhythm (`SUGGESTION-003`, `DECISION-014`). Inside the narrower
 * reading column that `DECISION-017` introduced it stopped reading as rhythm
 * and started reading as unfinished: four different widths down one column
 * (media 960, section heading 900, the design-question band 840, body 680), so
 * every paragraph ended in mid-air with 280px of empty page beside it.
 *
 * Everything in the column now shares the column's width. The line is longer
 * than the classic 66-character ideal, which is why the body size and leading
 * went up with it — long lines are hurt most by tight leading (owner,
 * 2026-08-25; `DECISION-014` amendment 2).
 */
const MEASURE = "max-w-full";

/**
 * The player's URL with its own chrome turned off (owner, SESSION-049).
 *
 * A Figma embed draws a toolbar inside the iframe, and it is charged to the
 * design: on a 600px-tall player it is around 8% of the height, which on a
 * height-bound prototype comes straight off the scale the screens are drawn at.
 * The "open in Figma" pill under the frame is the escape hatch it removes.
 *
 * Added here rather than in the five data files so that the five URLs stay what
 * the owner pasted out of Figma's share dialog — they are a record of what was
 * shared, and a display parameter is not part of that record. `URL` rather than
 * string concatenation because two of the five already carry a query string and
 * two do not.
 */
function embedSrc(embed: string): string {
  try {
    const url = new URL(embed);
    url.searchParams.set("hide-ui", "1");
    return url.toString();
  } catch {
    return embed;
  }
}

/** A bare string in `body[]` is shorthand for a paragraph (ISSUE-024). */
function normalize(block: Block): Exclude<Block, string> {
  return typeof block === "string" ? { kind: "p", text: block } : block;
}

/**
 * Renders one `body[]` block. `first` only affects the top margin — the block
 * opening a section sits closer to its heading than blocks that follow one
 * another.
 *
 * `dictionary` is here for one block: the `prototype` frame carries three UI
 * labels of its own (`MILESTONE-020` task 2), which are chrome rather than
 * content and so live in the dictionary rather than in the case-study data.
 */
function BodyBlock({
  block,
  first,
  dictionary,
}: {
  block: Block;
  first: boolean;
  dictionary: Dictionary;
}) {
  const b = normalize(block);

  switch (b.kind) {
    case "p":
      return (
        <p className={`${MEASURE} text-[16px] sm:text-[17px] leading-[1.65] text-ink-body ${first ? "mt-7" : "mt-5"}`}>
          {b.text}
        </p>
      );

    case "h3":
      return (
        <h3
          className={`${MEASURE} text-[22px] font-semibold leading-[1.3] tracking-[-0.015em] ${first ? "mt-8" : "mt-12"}`}
        >
          {b.text}
        </h3>
      );

    case "list": {
      const List = b.ordered ? "ol" : "ul";
      return (
        <List
          className={`${MEASURE} flex list-outside flex-col gap-3 pl-5 text-[16px] sm:text-[17px] leading-[1.65] text-ink-body marker:text-accent ${
            b.ordered ? "list-decimal" : "list-disc"
          } ${first ? "mt-7" : "mt-6"}`}
        >
          {b.items.map((item, i) => (
            <li key={i} className="pl-1.5">
              {item}
            </li>
          ))}
        </List>
      );
    }

    case "quote":
      return (
        <blockquote className={`max-w-full ${first ? "mt-8" : "mt-12"}`}>
          <p className="border-l-2 border-accent pl-7 text-[24px] font-medium leading-[1.4] tracking-[-0.015em]">
            {b.text}
          </p>
          {b.attribution && (
            <cite className="mt-3 block pl-7 text-[14px] not-italic text-ink-secondary">{b.attribution}</cite>
          )}
        </blockquote>
      );

    case "note":
      return (
        <p
          className={`${MEASURE} border-l-2 border-ink-muted bg-surface py-4 pl-5 pr-5 text-[15px] leading-[1.6] text-ink-secondary ${
            first ? "mt-7" : "mt-8"
          }`}
        >
          {b.text}
        </p>
      );

    case "figure":
      return <Figure {...b} className={first ? "mt-8" : "mt-12"} />;

    case "figures":
      // `SectionMedia` already carries its own top margin, so this only has to
      // hand over the array.
      return <SectionMedia images={b.items} />;

    case "prototype":
      return (
        /*
          **Wider than the reading column, and taller than a figure**
          (owner, SESSION-049: "the prototype is embedded but looks so small").

          It was a 16/9 box at the column's own 960px, and the arithmetic says
          the complaint was exact. A 1440-wide Figma frame in a 940px player
          (960 less the 2px border and 8px mount either side) is drawn at
          940/1440 = 65% — except the box was 529px tall and those frames are
          900 or more, so the binding constraint was the *height*: 529/900 =
          **58.8%**, and the width it was given went unused. Three changes, in
          the order of how much each is worth:

          - **The default box is 16/10 rather than 16/9.** Figma's own desktop
            frames are 900 to 1024 tall against 1440 wide; a 16/9 box is
            narrower than any of them, so every one of them was height-bound.
            At 16/10 the two constraints meet and nothing is wasted. `aspect`
            still overrides it per prototype — Sync FM is a phone and stays 4/3.
          - **`hide-ui=1` on the embed** hands the player's own toolbar back to
            the design. It is applied in `embedSrc` rather than typed into five
            data files, so a sixth prototype gets it by existing.
          - **40px of breakout to the right**, which is exactly the distance
            between this column's 960px cap and the container's edge, and only
            from 1440px up — below that the grid's `1fr` is under 1000px and the
            column is not capped, so the same rule would push the page sideways
            (`ISSUE-026` is what that looks like).

          Together: 58.8% \u2192 about 69% before the toolbar is counted.
        */
        <div className={`${first ? "mt-8" : "mt-10"} min-[1440px]:w-[calc(100%+40px)]`}>
          {/*
            **A note in the owner's hand, pointing at the player**
            (`MILESTONE-020` task 2).

            A tester read this block as one more screenshot and scrolled past
            it. That is not a failure of attention: the player was in the same
            10px-radius, hairline-bordered, grey-filled box as every `Figure` on
            the page, with a caption under it in the same type as every other
            caption. Nothing about it said *interactive* — the only thing
            distinguishing an embedded prototype from a picture of one was that
            this one happened to respond if you clicked it.

            So three things now say it, in the order somebody notices them: a
            hand-written note with an arrow into the frame, the frame's own
            accent border, and a label strip naming it. Three, because each
            works for a different reader — the note catches the eye that is
            skimming, the border catches the eye that is scanning shapes, and
            the strip answers the reader who has stopped and is deciding whether
            to bother.

            The note is `md:` and up. Below that the arrow has nowhere to point
            from, and the strip is carrying the message on its own — which is the
            same reason the playground's collages drop their notes on a phone
            (`MILESTONE-013` task 5).

            `-mb-7` puts the arrowhead through the frame's top edge rather than
            stopping above it, which is the whole difference between an arrow
            that points at something and one that points near it
            (`MILESTONE-020` task 4 made the same fix on the About portrait).
          */}
          <div
            aria-hidden="true"
            className="relative z-[2] -mb-11 ml-auto mr-3 flex flex-col items-end sm:mr-6 sm:-mb-13 md:mb-0 md:ml-[25%] md:mr-0 md:items-start"
          >
            <span className="pencil-ink font-hand text-[13.5px] font-bold leading-none text-accent [transform:rotate(-2deg)] sm:text-[15.5px] md:text-[21px] md:[transform:rotate(-3deg)]">
              {dictionary.caseStudy.prototypeNote}
            </span>
            <HandArrow direction="down-left" width={42} className="mt-1 shrink-0 text-accent md:hidden" />
            <HandArrow direction="down-right" width={68} className="-mb-16 mt-1.5 hidden shrink-0 text-accent md:block" />
          </div>

          {/*
            The frame. A subtle, site-matching card with live status strip and embedded player.
          */}
          <div className="overflow-hidden rounded-[14px] border border-card-border bg-[#F8F9FB] p-2 sm:p-2.5 shadow-[0_2px_14px_rgba(0,0,0,0.03)]">
            {/*
              The label strip above the player: live badge on left, click hint on right.
            */}
            <div className="flex items-center justify-between gap-x-4 px-2.5 pb-2.5 pt-1.5">
              <span className="flex items-center gap-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-accent">
                <span aria-hidden="true" className="cs-live-dot" />
                {dictionary.caseStudy.prototypeLive}
              </span>
              <span className="hidden text-[12.5px] font-medium text-ink-secondary lg:inline-block">
                {dictionary.caseStudy.prototypeHint}
              </span>
            </div>
            <div
              className="relative w-full overflow-hidden rounded-[10px] border border-card-border/60 bg-surface"
              style={{ aspectRatio: b.aspect ?? "16/10", maxHeight: "82svh" }}
            >
              <iframe
                title={b.label}
                src={embedSrc(b.embed)}
                loading="lazy"
                allowFullScreen
                allow="fullscreen"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            {/*
              Under the interactive screen: desktop view recommendation for best interaction.
            */}
            <div className="flex items-center justify-center px-2 pt-2.5 pb-1 sm:justify-start">
              <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted">
                <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>{dictionary.caseStudy.prototypeDesktopHint}</span>
              </span>
            </div>
          </div>
          {/*
            Out to Figma in its own tab. Sleek pill button matching the site style.
          */}
          <p className="mt-3.5">
            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex h-10 items-center gap-2 rounded-full border border-card-border bg-white px-5 text-[13.5px] font-medium text-ink-secondary shadow-xs transition-all hover:border-accent hover:text-accent hover:shadow-sm"
            >
              {b.label}
              <span aria-hidden="true" className="text-[12px]">↗</span>
            </a>
          </p>
        </div>
      );

    case "split":
      /*
        Text and figure side by side. When `b.heading` is present, it sits above
        both columns so the figure's top edge starts right alongside the body text.
      */
      return (
        <div className={first ? "mt-8" : "mt-12"}>
          {b.heading && (
            <h3 className="mb-4 text-[22px] font-semibold leading-[1.3] tracking-[-0.015em]">{b.heading}</h3>
          )}
          <div className="grid grid-cols-1 items-start gap-x-8 gap-y-6 md:grid-cols-2">
            <div className={`min-w-0 ${b.figureFirst ? "md:order-2" : ""}`}>
              {b.body.map((text, i) => (
                <p
                  key={i}
                  className={`text-[16px] sm:text-[17px] leading-[1.65] text-ink-body ${i === 0 ? "" : "mt-4"}`}
                >
                  {text}
                </p>
              ))}
            </div>
            <div className={`min-w-0 ${b.figureFirst ? "md:order-1" : ""}`}>
              {/* Half the column, so the candidate widths halve with it. */}
              <Figure {...b.figure} sizes="(min-width: 768px) min(460px, 46vw), calc(100vw - 40px)" />
            </div>
          </div>
        </div>
      );

    case "steps":
      /*
        A path, not an inventory. The arrows are decorative and hidden from
        assistive technology; the `ol` keeps the steps ordered for anyone who
        is not looking at them.
      */
      return (
        <ol className={`flex list-none flex-wrap items-center gap-x-3 gap-y-3 p-0 ${first ? "mt-7" : "mt-8"}`}>
          {b.items.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="rounded-full border border-surface-2 bg-white px-4 py-2 text-[15px] leading-[1.4] text-ink-body">
                {item}
              </span>
              {i < b.items.length - 1 && (
                <span aria-hidden="true" className="text-[16px] text-accent">
                  &rarr;
                </span>
              )}
            </li>
          ))}
        </ol>
      );

    case "cards":
      return (
        <ul
          data-inview="stagger"
          className={`grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 ${first ? "mt-8" : "mt-10"}`}
        >
          {b.items.map((card, i) => (
            // The same card the section's own `insights` are set in — border,
            // 14px radius, white on the reading column — so a set in the middle
            // of a section and a set at the end of one are recognisably the
            // same object. The eyebrow is the difference: written, not counted.
            <li key={i} className="flex flex-col rounded-[14px] border border-surface-2 bg-white p-6">
              {/*
                Name above role, not the other way round (owner, second pass):
                the deck heads each persona with the person and puts the job
                title under it, and a card that leads with "CEO, logistics"
                reads as a segment rather than as somebody.
              */}
              <h4 className="text-[18px] font-semibold leading-[1.3] tracking-[-0.01em]">{card.heading}</h4>
              {card.label && (
                <span className="mt-1.5 text-[13px] leading-[1.45] text-ink-muted">{card.label}</span>
              )}
              <p className="mt-3.5 text-[15px] leading-[1.6] text-ink-secondary">{card.body}</p>
              {/*
                The needs line is pushed to the bottom of the card (`mt-auto`)
                so that in a row of three cards with bodies of different
                lengths the three rules still align.
              */}
              {card.needs && (
                <div className="mt-auto pt-5">
                  <span className="block border-t border-surface-2 pt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                    {dictionary.caseStudy.needs}
                  </span>
                  <p className="mt-2 text-[14px] leading-[1.5] text-ink-secondary">{card.needs}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      );
  }
}

/**
 * One case-study section. Every section takes the same render path — number,
 * nav label, heading, body, then its optional set pieces and media — and the
 * two flags vary only spacing and scale. Splitting the first section out is
 * what cost it its eyebrow and its scroll reveal (ISSUE-008).
 *
 * `outro` is the closing section, which `CaseStudyPage` lifts out of the
 * reading column onto its own band so the case study ends deliberately instead
 * of running into the prev/next cards (`SUGGESTION-003`).
 *
 * `intro` is rendered between the eyebrow and the heading, and is how the first
 * section carries the page's title, description and facts (`CaseStudyIntro`).
 * It sits inside the section rather than above it so that the reading order is
 * "01 Overview, then what this project is" — and so the contents rail can start
 * at the top of the page instead of below a hero.
 */
export default function Section({
  section,
  dictionary,
  first = false,
  outro = false,
  intro,
}: {
  section: CaseStudySection;
  dictionary: Dictionary;
  first?: boolean;
  outro?: boolean;
  intro?: ReactNode;
}) {
  const header = (
    <>
      {outro && <div className="mb-9 h-[3px] w-14 bg-accent" />}
      <div className="mb-7">
        <span className="font-mono text-[13px] text-accent">{section.number}</span>
        <span className="mt-1.5 block text-[14px] text-accent">{section.navLabel}</span>
      </div>
      {intro}
      {/* The first section's heading sits directly under the page's `h1` and is
          an introduction rather than a chapter title, so it steps down a size —
          otherwise the two compete and the hierarchy reads flat. */}
      <h2
        className={`m-0 font-semibold tracking-[-0.025em] ${
          outro
            ? "text-feature leading-[1.05]"
            : first
              ? "text-subheading leading-[1.15]"
              : "text-heading leading-[1.1]"
        }`}
      >
        {section.heading}
      </h2>
    </>
  );

  const body = (
    <>
      {section.body?.map((block, i) => (
        <BodyBlock key={i} block={block} first={i === 0} dictionary={dictionary} />
      ))}

      {section.designQuestion && (
        // Centred (owner, second pass). The band is the one thing on the page
        // that is a question rather than an account of one, and centring is
        // what stops it reading as another paragraph with a tint behind it.
        <div className="mt-14 rounded-[14px] bg-accent-soft px-7 py-8 text-center sm:px-9 sm:py-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-accent">
            {dictionary.caseStudy.designQuestion}
          </span>
          <p className="mx-auto mt-4 max-w-[720px] text-lead font-medium leading-[1.3] tracking-[-0.015em] text-ink">
            {section.designQuestion}
          </p>
        </div>
      )}

      {section.insights && (
        <div
          data-inview="stagger"
          className={`mt-12 grid grid-cols-1 gap-5 ${
            section.insightColumns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {section.insights.map((insight, i) => (
            <div key={i} className="rounded-[14px] border border-surface-2 bg-white p-6">
              <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3.5 text-[19px] font-semibold leading-[1.3] tracking-[-0.01em]">{insight.heading}</h3>
              <p className="mt-2.5 text-[16px] leading-[1.6] text-ink-secondary">{insight.body}</p>
            </div>
          ))}
        </div>
      )}

      {section.testing && (
        <ol data-inview="stagger" className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-3">
          {section.testing.map((step, i) => (
            <li key={i} className="border-t-2 border-accent pt-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-accent">{step.label}</span>
              <p className="mt-2.5 text-[16px] leading-[1.6] text-ink-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      )}

      {section.images && <SectionMedia images={section.images} />}
    </>
  );

  return (
    <section id={section.id} data-inview className={first || outro ? undefined : "mt-16 sm:mt-20 md:mt-24"}>
      {outro ? (
        // The closing section runs heading beside text, so the ending reads as a
        // spread rather than as one more column of the article.
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,680px)] xl:gap-16">
          <div className="xl:sticky xl:top-[calc(var(--anchor-offset)+24px)] xl:self-start">{header}</div>
          <div>{body}</div>
        </div>
      ) : (
        <>
          {header}
          {body}
        </>
      )}
    </section>
  );
}
