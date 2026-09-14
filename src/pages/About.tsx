import { Link } from "react-router-dom";
import { useLocale, useDictionary } from "@/lib/useLocale";
import { useScrollReveals } from "@/lib/useScrollReveals";
import { localeHref } from "@/lib/i18n";
import Image from "@/components/ui/Image";
import LoveLine from "@/components/about/LoveLine";
import HandArrow from "@/components/HandArrow";
import PlaygroundBand from "@/components/PlaygroundBand";
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
        <div data-inview="text" className="container-page">
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
          <div data-inview className="grid grid-cols-1 items-center gap-10 md:grid-cols-[320px_minmax(0,1fr)] md:gap-16 xl:gap-20">
            <div>
              <div className="relative max-w-[320px] pt-[44px] md:pt-[58px]">
                <div className="relative z-[1] aspect-[3/4] overflow-hidden rounded-[10px] border border-card-border bg-surface">
                  <Image
                    src="/images/alexsha-portrait.webp"
                    alt={about.portraitAlt}
                    fill
                    sizes="(min-width: 768px) 320px, min(320px, calc(100vw - 40px))"
                    className="object-cover"
                  />
                </div>

                {/*
                  Top annotation: arrow curves up-right from the top-left of the portrait,
                  pointing directly to the handwritten origin note ("Nepal → Germany").
                  Matches Images/Container (How did I start designing_ — Alexsha Maharjan).png.
                */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[16%] top-5 z-[3] flex items-start gap-1 md:left-[19%] md:top-6"
                >
                  <HandArrow direction="up-right" width={48} className="pencil-arrow shrink-0 text-accent md:w-[52px]" />
                  <span className="pencil-ink -ml-1 mt-0.5 whitespace-nowrap font-hand text-[17px] font-bold leading-none text-accent [transform:rotate(-3deg)] md:text-[19px]">
                    {about.handNoteOrigin}
                  </span>
                </div>

                {/*
                  Bottom annotation: text on left, arrow on right pointing down-left towards
                  the text ("always making something!"), matching the user's container mockup.
                */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none relative z-[3] -mt-3 flex items-center justify-start pl-2 [transform:rotate(1deg)]"
                >
                  <span className="pencil-ink mt-6 whitespace-nowrap font-hand text-[15px] font-bold leading-[1.05] text-accent md:text-[17px]">
                    {about.handNoteMaking}
                  </span>
                  <HandArrow direction="down-left" width={48} className="pencil-arrow shrink-0 text-accent md:w-[52px]" />
                </div>
              </div>
            </div>

            <div className="max-w-[880px]">
              <h2 className="mt-2.5 text-heading font-semibold tracking-[-0.025em]">
                {about.biographyHeading}
              </h2>
              {about.biography.map((p, i) => (
                <p key={i} className={`text-[19px] leading-[1.7] text-ink-body ${i === 0 ? "mt-6" : "mt-4.5"}`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
        The "I love ___" line, on a band of its own (`MILESTONE-019` task 4).

        `MILESTONE-010` task 7 put it at the foot of the biography, inside the
        right-hand column, where it was set `text-center` — so it was centred on
        a 640px column that itself sat to the right of a 280px picture, and its
        middle landed roughly three-quarters of the way across the page. That is
        the owner's "it's not in the middle": the line was centred, just not on
        anything the eye reads as a centre.

        Out here it is centred on the page, which is the only centre a line this
        size has. See `LoveLine` for why the sentence no longer shifts around as
        the word changes.
      */}
      <section className="pt-[104px]">
        <div data-inview className="container-page">
          <div className="mx-auto max-w-[900px]">
            {/*
              No note under this one. It had one for a session — an arrow turned
              back up at the word that keeps changing — and the owner took it
              off: the line is already the largest thing on its own band, with
              nothing beside it to be distinguished from, so an arrow pointing
              at it was pointing at the only thing there.
            */}
            <LoveLine intro={about.loveIntro} words={about.loveWords} />
          </div>
        </div>
      </section>

      <section className="pt-[96px]">
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
                {/*
                  The note is *in* the chip row, as its last item, and it has no
                  arrow (owner, SESSION-046). It only ever pointed at the chip
                  immediately before it — the accent-coloured "Artificial
                  Intelligence" one, the newest thing on a list called "Tools I
                  have learned" — and a drawn arrow spanning the 10px between
                  two things that are already touching is a gesture with nothing
                  to cross. Sitting next to it says the same thing.

                  A flex item rather than a line underneath, so it wraps with
                  the chips: on a narrow column it follows whichever row the
                  last chip lands on instead of stranding itself below an empty
                  half-row.
                */}
                <span
                  aria-hidden="true"
                  className="pencil-ink self-center pl-1 font-hand text-[15px] font-bold leading-[1.05] text-accent [transform:rotate(-2deg)] md:text-[17px]"
                >
                  {about.handNoteTools}
                </span>
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
        {/*
          The same offer the homepage makes, and now literally the same
          component (`MILESTONE-018` task 4). The arrangement here was already
          the centred one; what is new is the light-blue grid paper under it,
          which is the playground's own ruling — see `PlaygroundBand`.
        */}
        <div className="container-page">
          <PlaygroundBand
            locale={locale}
            dictionary={dictionary}
            heading={about.playgroundHeading}
            copy={about.playgroundCopy}
          />
        </div>
      </section>

      <section id="resume" className="bg-near-black py-[120px]">
        <div className="container-page">
          <div data-inview="text" className="mx-auto flex flex-col items-center text-center">
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
