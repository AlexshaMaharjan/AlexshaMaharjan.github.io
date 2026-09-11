import { Link } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { useScrollReveals } from "@/lib/useScrollReveals";
import { localeHref } from "@/lib/i18n";
import Image from "@/components/ui/Image";
import LoveLine from "@/components/about/LoveLine";
import Seo from "@/components/Seo";

export default function About() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const about = dictionary.about;
  useScrollReveals();

  return (
    <>
      <Seo title={`${about.heading} — Alexsha Maharjan`} description={dictionary.meta.description} />
      <section className="pt-[var(--page-top)]">
        <div className="container-page">
          {/*
              The back link is desktop-only, and it sits on the eyebrow's line
              rather than on one of its own (`MILESTONE-016` tasks 2 and 5).

              It was a line to itself above the eyebrow, which cost every inner
              page a whole row of vertical space before a word of content. On a
              phone that was the difference between the heading and the picture
              both fitting the first screen and neither of them doing so — and a
              phone already has the drawer, which reaches everywhere this link
              goes. It is kept above `md` because a pointer user with no back
              gesture has further to travel to the header.
            */}
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <p className="font-mono text-[13px] text-accent">{about.eyebrow}</p>
            <Link
              to={localeHref(locale, "/")}
              className="tap-target hidden text-[14px] text-ink-secondary transition-colors hover:text-accent md:inline-flex"
            >
              {about.backToHome}
            </Link>
          </div>
          <h1 className="mt-4 max-w-[1080px] text-page-title font-semibold leading-[1] tracking-[-0.028em] text-ink">
            {about.heading}
          </h1>
        </div>
      </section>

      <section className="pt-12 md:pt-[72px]">
        <div className="container-page">
          <div data-inview className="grid grid-cols-1 items-start gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              {/*
                  The 58px is headroom for the "Nepal → Germany" note, which is
                  `hidden md:block`. Below `md` there is no note, so the padding
                  was 58px of nothing between the heading and the portrait
                  (`MILESTONE-015` task 3).
                */}
              <div className="relative max-w-[460px] md:pt-[58px]">
                <div className="relative z-[1] aspect-[3/4] overflow-hidden rounded-[10px] border border-card-border bg-surface">
                  <Image
                    src="/images/alexsha-portrait.webp"
                    alt={about.portraitAlt}
                    fill
                    sizes="(min-width: 1180px) 460px, (min-width: 768px) 40vw, calc(100vw - 40px)"
                    className="object-cover"
                  />
                </div>

                {/*
                  Positioned as a fraction of the portrait column rather than at
                  a fixed 150px: at the `md` layout the column is less than half
                  its desktop width, and a fixed offset pushed this note out of
                  the column and on top of the Biography heading between 768px
                  and about 870px (ISSUE-029). 30% reproduces the desktop
                  placement it had.
                */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[30%] top-1 z-[3] hidden [transform:rotate(-4deg)] md:block"
                >
                  <span className="whitespace-nowrap font-hand text-[28px] font-bold leading-none text-[#2B2D31]">
                    {about.handNoteOrigin}
                  </span>
                  <svg width="66" height="58" viewBox="0 0 66 58" fill="none" className="absolute -left-0.5 top-[26px]">
                    <path d="M56 8 C 34 10 15 24 9 48" stroke="#2B2D31" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 48 l 14 -3" stroke="#2B2D31" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M9 48 l 3 -14" stroke="#2B2D31" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[88px] right-[-14px] z-[3] hidden text-right [transform:rotate(3deg)] md:block"
                >
                  <span className="block font-hand text-[25px] font-bold leading-[1.05] text-accent">
                    {about.handNoteMaking}
                  </span>
                  <svg width="60" height="44" viewBox="0 0 60 44" fill="none" className="absolute left-[-46px] top-3">
                    <path d="M52 6 C 30 4 12 14 6 34" stroke="#1B3FE0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 34 l 14 -3" stroke="#1B3FE0" strokeWidth="2.2" strokeLinecap="round" />
                    <path d="M6 34 l 2 -14" stroke="#1B3FE0" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {about.portraitTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border px-3.5 py-[6px] text-[13px] text-ink-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-[640px]">
              <h2 className="mt-2.5 text-heading font-semibold tracking-[-0.025em]">
                {about.biographyHeading}
              </h2>
              {about.biography.map((p, i) => (
                <p key={i} className={`text-[18px] leading-[1.65] text-ink-body ${i === 0 ? "mt-6" : "mt-4.5"}`}>
                  {p}
                </p>
              ))}
              {/* MILESTONE-010 task 7: the "I love …" line sits directly below
                  the biography, before the focus and tools blocks. */}
              <div className="mt-11">
                <LoveLine intro={about.loveIntro} words={about.loveWords} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[110px]">
        <div className="container-page">
          <div data-inview className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2">
            <div>
              <h2 className="mt-2.5 text-subheading font-semibold tracking-[-0.02em]">
                {about.focusHeading}
              </h2>
              <ul className="mt-7 flex max-w-[520px] flex-col text-[17px]">
                {about.focusItems.map((item, i) => (
                  <li
                    key={item}
                    className={`border-t border-surface-2 px-0.5 py-3.5 ${i === about.focusItems.length - 1 ? "border-b" : ""}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mt-2.5 text-subheading font-semibold tracking-[-0.02em]">
                {about.toolsHeading}
              </h2>
              <div className="mt-7 flex max-w-[520px] flex-wrap gap-2.5">
                {about.tools.map((tool) => (
                  <span
                    key={tool.name}
                    className={`rounded-full border px-4 py-2 text-[14px] ${
                      tool.accent ? "border-accent text-accent" : "border-border text-ink-body"
                    }`}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>

              <div className="mt-8.5 max-w-[520px] border-t border-surface-2 pt-6.5">
                <p className="text-[16px] leading-[1.65] text-accent">{about.aiBody}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {about.aiTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-dashed border-accent px-4 py-2 text-[14px] text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[110px]">
        <div data-inview className="container-page">
          <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
            <h2 className="mt-2.5 text-subheading font-semibold tracking-[-0.02em]">
              {about.playgroundHeading}
            </h2>
            <p className="mt-6 text-[18px] leading-[1.65] text-ink-body">{about.playgroundCopy}</p>
            <Link
              to={localeHref(locale, "/playground")}
              className="tap-target mt-7 text-[15px] font-medium text-accent hover:underline"
            >
              {about.linkPlayground}
            </Link>
          </div>
        </div>
      </section>

      <section id="resume" className="bg-near-black py-[120px]">
        <div className="container-page">
          <div data-inview className="mx-auto flex flex-col items-center text-center">
          <h2 className="mx-auto mt-2.5 max-w-[760px] text-feature font-semibold leading-[1.05] tracking-[-0.025em] text-white">
            {about.resumeHeading}
          </h2>
          <p className="mx-auto mt-5.5 max-w-[600px] text-[18px] leading-[1.6] text-ink-on-dark">{about.resumeCopy}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to={localeHref(locale, "/resume")}
              className="flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              {about.resumeCta}
            </Link>
            <a
              href={`mailto:${dictionary.resume.email}`}
              className="flex h-12 items-center rounded-full border border-white/35 px-7 text-[15px] font-medium text-white transition-colors hover:border-accent"
            >
              {about.contactCta}
            </a>
          </div>
          <p className="mt-6 font-mono text-[12px] text-ink-on-dark-muted">{dictionary.resume.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}
