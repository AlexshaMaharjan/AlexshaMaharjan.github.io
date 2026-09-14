import { useEffect, useRef, type Ref } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = contentRef.current;
    if (!el) return;
    const children = Array.from(el.children);
    gsap.fromTo(
      children,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        clearProps: "transform,opacity",
      },
    );
  }, []);

  return (
    <section
      ref={innerRef}
      className="flex min-h-[58svh] flex-col items-center justify-center pt-[var(--header-h)] sm:min-h-[70svh]"
    >
      <div ref={contentRef} className="container-page w-full text-center">
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
        <p className="mx-auto mt-7 min-h-[91px] max-w-[640px] text-[19px] leading-[1.6] text-ink-secondary">
          {intro}
        </p>
        <p className="mt-6 font-mono text-[13px] text-accent">{tags}</p>
      </div>
    </section>
  );
}
