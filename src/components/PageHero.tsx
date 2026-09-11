import type { Ref } from "react";

/**
 * The first screen of the two modes, written once (`MILESTONE-011` task 3).
 *
 * Portfolio and Playground are two views of one site, and the mode switch in
 * the header invites somebody to flip between them. They were built as two
 * separate blocks of JSX and had drifted into two different first screens: the
 * homepage set its eyebrow at 14px and top-anchored the whole thing 59px under
 * the header, the playground set a 12px mono eyebrow and centred the block in
 * 70svh, and the two headings used different size tokens. Flipping modes moved
 * every line on the page.
 *
 * So this is not a tidy-up. **It is the fix**: one component, two sets of copy,
 * and the eyebrow, the heading, the subheading and the tag line land on the
 * same pixel in both modes because there is only one description of where they
 * go. Two blocks of JSX that "match" are two blocks of JSX that will stop
 * matching the next time one of them is edited.
 *
 * **70svh is the mode switch's own contract.** The homepage pins its process
 * canvas at `top: 70svh` and the playground's deck starts where this section
 * ends, so both big scrolling objects begin at the same place — and `svh`
 * rather than `vh` because the mobile toolbar must not move it (`SESSION-036`).
 *
 * **58svh below `sm`** (`MILESTONE-011` task 11). On a 844px phone, 70svh under
 * a 146px header left the next section 7px of screen: the hero was the whole
 * viewport and nothing said there was more. The contract is untouched, because
 * the only thing that depends on 70svh is the homepage's *pinned* canvas, and
 * that layout does not exist below 880px — `HeroProcess` switches to its static
 * flow there. Above `sm` both modes are 70svh and agree, as before.
 *
 * **The subheading carries a floor, not a height.** The two intros are
 * different lengths, and without it the tag line sat three lines up in one mode
 * and two in the other — the exact vertical jump this component exists to
 * remove. It is a `min-height` of three lines, so a longer intro, a narrower
 * window or the German copy all still grow it normally.
 */
export default function PageHero({
  eyebrow,
  headingLines,
  intro,
  tags,
  innerRef,
}: {
  eyebrow: string;
  headingLines: string[];
  intro: string;
  tags: string;
  /** `HeroProcess` writes opacity and a transform here as the canvas rises. */
  innerRef?: Ref<HTMLElement>;
}) {
  return (
    <section
      ref={innerRef}
      className="flex min-h-[58svh] flex-col items-center justify-center pt-[var(--header-h)] sm:min-h-[70svh]"
    >
      {/*
        `w-full`, because the section is a centred flex column and a flex item
        sizes to its content in the cross axis: without it `container-page`
        shrink-wrapped the longest line, and the two modes measured 798px and
        1060px for the same container.

        `container-page` is also the only horizontal padding here. The section
        carried a `px-5` of its own, which below `md` doubled the gutter to 40px
        a side and left a 390px phone 310px to set in — eleven pixels less than
        the German eyebrow needs, so "DEUTSCHLAND" fell to a line by itself.
      */}
      <div className="container-page w-full text-center">
        {/*
          Tighter below `sm`: at 12px with 0.16em of tracking the portfolio
          eyebrow is 337px wide and the phone gutter leaves it 310, so
          "GERMANY" fell to a second line on its own.
        */}
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted sm:text-[12px] sm:tracking-[0.16em]">
          {eyebrow}
        </p>
        {/*
          Two lines tall whether or not the copy fills them. The portfolio
          heading is one line and the playground heading is two, and centring
          a block that changes height moves everything below AND above it: this
          is the 40px jump the mode switch used to make. `2.04em` is two of the
          `1.02` line-height, so it tracks the size token rather than a pixel
          guess, and `justify-center` splits the spare line between the air
          above the heading and the air below it rather than dumping all of it
          underneath.
        */}
        <h1 className="mx-auto mt-5 flex min-h-[2.04em] max-w-[900px] flex-col justify-center text-page-title font-semibold leading-[1.02] tracking-[-0.028em] text-ink">
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-7 min-h-[91px] max-w-[560px] text-[19px] leading-[1.6] text-ink-secondary">
          {intro}
        </p>
        <p className="mt-6 font-mono text-[13px] text-accent">{tags}</p>
      </div>
    </section>
  );
}
