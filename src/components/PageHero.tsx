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
      className="flex min-h-[75svh] flex-col items-center justify-center pt-[calc(var(--header-h)+16px)] pb-4 sm:min-h-[75svh] sm:pt-[var(--header-h)] sm:pb-0"
    >
      <div ref={contentRef} className="container-page w-full text-center">
        {/*
          Eyebrow: on mobile displays title in line 1 and location in line 2;
          on sm: and above sits on one line with a centered dot.
        */}
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted sm:text-[12px] sm:tracking-[0.16em]">
          {eyebrow.includes("·") ? (
            <>
              <span className="block sm:inline">{eyebrow.split("·")[0]?.trim()}</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">{eyebrow.split("·")[1]?.trim()}</span>
            </>
          ) : (
            eyebrow
          )}
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
        <h1 className="mx-auto mt-5 flex min-h-[2.04em] max-w-[900px] flex-col justify-center text-page-title font-semibold leading-[1.04] tracking-[-0.028em] text-ink sm:mt-6">
          {headingLines.map((line) => (
            <span key={line} className="block [hyphens:none]">
              {line}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-5 max-w-[640px] text-[15.5px] leading-[1.6] text-ink-secondary sm:mt-6 sm:min-h-[84px] sm:text-[17px] sm:leading-[1.6]">
          {intro}
        </p>
        <p className="mt-5 font-mono text-[12px] text-accent sm:mt-6 sm:text-[12.5px]">{tags}</p>
      </div>
    </section>
  );
}
