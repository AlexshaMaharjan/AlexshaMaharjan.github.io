import { useEffect, useRef, useState } from "react";

export default function LoveLine({ intro, words }: { intro: string; words: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const wordRef = useRef<HTMLSpanElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = (word: string) => {
      if (!mirrorRef.current || !wordRef.current) return 0;
      const cs = getComputedStyle(wordRef.current);
      mirrorRef.current.style.font = cs.font;
      mirrorRef.current.style.letterSpacing = cs.letterSpacing;
      mirrorRef.current.textContent = word;
      return Math.ceil(mirrorRef.current.getBoundingClientRect().width) + 1;
    };

    if (wordRef.current) {
      wordRef.current.style.width = measure(words[0] ?? "") + "px";
    }

    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % words.length;
        const word = words[next] ?? "";
        if (rmq.matches) {
          if (wordRef.current) wordRef.current.style.width = measure(word) + "px";
          setVisible(true);
        } else {
          setVisible(false);
          setTimeout(() => {
            if (wordRef.current) wordRef.current.style.width = measure(word) + "px";
            setVisible(true);
          }, 250);
        }
        return next;
      });
    }, 2400);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.join("|")]);

  return (
    <p className="m-0 text-center text-[clamp(1.875rem,3.6vw,3.25rem)] font-semibold tracking-[-0.025em]">
      {intro}{" "}
      <span
        ref={wordRef}
        className="inline-block overflow-hidden whitespace-nowrap align-bottom text-accent transition-[width] duration-[400ms] ease-out"
        style={{
          borderBottom: "3px solid #E1E7FF",
          opacity: visible ? 1 : 0,
          transition: "width .4s cubic-bezier(.2,.75,.2,1), opacity .25s ease",
        }}
      >
        {words[index]}
      </span>
      <span>.</span>
      <span ref={mirrorRef} aria-hidden="true" className="invisible absolute left-[-9999px] top-0 whitespace-pre" />
    </p>
  );
}
