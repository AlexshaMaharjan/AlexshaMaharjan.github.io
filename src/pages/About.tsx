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
          {/*
              The text column runs to the page margin (`MILESTONE-019` task 3).

              It was `max-w-[640px]` inside a column that is about 936px wide at
              1440, so the biography stopped a third of the way short of the
              right-hand margin and the page looked like a 280px picture beside
              a 640px slab with 300px of nothing after it. The owner's reading —
              "why does the text always end in the middle" — is exactly what
              that is.

              The picture is deliberately left at 280 (`MILESTONE-018` task 3
              settled that) and the balance is found on the other side instead:
              the measure goes up with the type, 19px on 1.7 rather than 18 on
              1.65, so a full line is about 90 characters rather than the 105 a
              936px column of 18px would have given. Longer than a book column
              and shorter than the wall of text the cap was there to prevent.
            */}
          <div data-inview className="grid grid-cols-1 items-center gap-10 md:grid-cols-[320px_minmax(0,1fr)] md:gap-16 xl:gap-20">
            <div>
              {/*
                  The 58px is headroom for the "Nepal → Germany" note, which is
                  `hidden md:block`. Below `md` there is no note, so the padding
                  was 58px of nothing between the heading and the portrait
                  (`MILESTONE-015` task 3).
                */}
              {/*
                  280px, not 460 (`MILESTONE-018` task 3) — the same ~60% the
                  homepage's about section took, so the two portraits still
                  agree. The column is sized to the picture, and the two hand
                  notes below are scaled with it: they were drawn against a
                  460px picture and a 28px hand on a 280px picture is a note
                  wider than the thing it points at.
                */}
              {/* The top padding is the room the "Nepal to Germany" note sits
                  in. It was `md:` only, which is why that note could not be
                  shown below `md` without landing on the photograph
                  (`MILESTONE-023` task 8). */}
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
                  Positioned as a fraction of the portrait column rather than at
                  a fixed 150px: at the `md` layout the column is less than half
                  its desktop width, and a fixed offset pushed this note out of
                  the column and on top of the Biography heading between 768px
                  and about 870px (ISSUE-029). 30% reproduces the desktop
                  placement it had.

                  The arrow is a sibling of the words with a margin between
                  them, not a child overlapping them at `top-[18px]`
                  (`MILESTONE-019` task 5) — see `HandArrow` for the rest.
                */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[26%] top-0 z-[3] flex flex-col items-start [transform:rotate(-4deg)] md:left-[30%]"
                >
                  <span className="pencil-ink whitespace-nowrap font-hand text-[17px] font-bold leading-none text-accent md:text-[19px]">
                    {about.handNoteOrigin}
                  </span>
                  {/* The arrow is drawn at its own floor on a phone — 48px, the
                      size below which `HandArrow`'s head stops being an
                      arrowhead — and at the desktop 52 from `md` up. */}
                  <HandArrow direction="down-left" width={48} className="pencil-arrow mt-1.5 text-accent md:hidden" />
                  <HandArrow direction="down-left" width={52} className="pencil-arrow mt-2 hidden text-accent md:block" />
                </div>

                {/*
                  Under the portrait, in the flow (`MILESTONE-018` task 3), and
                  now directly under it: the three tag pills that used to sit
                  between them are gone (`MILESTONE-019` task 3).

                  The tags said "UI/UX Design · Branding · Visual Design", which
                  is word for word the first three entries of the Professional
                  focus list further down the same page. A caption under a
                  portrait is worth having when it says something the page does
                  not; this one was a second copy of a list in a better place
                  for it, wrapped onto two rows in a 280px column.
                */}
                {/*
                  The arrow is mirrored (`up-right`, not `up-left`) on the
                  owner's note that it looked wrong. It did, and the reason is
                  where it was aimed rather than how it was drawn: it sat at the
                  left of a 280px column and pointed up and further left, so its
                  head left the picture it is about at the picture's own corner.
                  The same curve flipped on its vertical axis sends the head up
                  and to the right, into the middle of the portrait.

                  **It still looked wrong, and this is the rest of it**
                  (`MILESTONE-020` task 4). Mirroring fixed the direction and
                  left the arrow *ending in mid-air*: the row sits `mt-5` under
                  the portrait, so the head stopped 20px below the picture's
                  bottom edge, pointing up at a gap. An arrow that stops short
                  of its subject does not read as pointing at it — it reads as
                  an ornament beside the words, which is exactly what a tester
                  sees.

                  The note above does not have this problem and never did,
                  because its head is drawn *over* the picture. So this one is
                  too: `-mt-11` lifts the drawing 44px, which puts the head
                  about 11px inside the portrait's lower edge, while the words
                  stay in the flow below it. `z-[3]` is what lets it be seen
                  there — the picture is `z-[1]` in the same stacking context,
                  and a later sibling at `auto` paints underneath it.

                  **The words come first and the arrow second**, which is the
                  other half of making this read like an annotation. The traced
                  arrow runs tail to head, and under `up-right` its tail is at
                  the bottom left of its box and its head at the top right — so
                  with the arrow written first, the note was hanging off the
                  *head*, 16px past the point of the thing, while the tail
                  trailed away from it. Somebody annotating a page writes the
                  note and draws away from it. Swapped, the tail sits beside the
                  last word and the head is the far end, where it belongs.

                  `justify-start`, for the same reason the direction was
                  mirrored in the first place: hung from the right of a 280px
                  column the head lands at x≈280, which is the portrait's own
                  right corner — the exact failure this note has already had
                  once. From the left it lands at x≈217, inside the picture.

                  Both notes are the accent blue now, also by instruction. The
                  near-black on the upper one was the last survivor of a palette
                  the rest of the page left behind.
                */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none relative z-[3] mt-5 flex items-start gap-3 [transform:rotate(3deg)] md:gap-4"
                >
                  <span className="pencil-ink mt-3 whitespace-nowrap font-hand text-[15px] font-bold leading-[1.05] text-accent md:text-[17px]">
                    {about.handNoteMaking}
                  </span>
                  <HandArrow direction="down-right" width={48} className="pencil-arrow -mt-10 shrink-0 text-accent md:hidden" />
                  <HandArrow direction="down-right" width={52} className="pencil-arrow -mt-11 hidden shrink-0 text-accent md:block" />
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
        <div data-inview className="container-page">
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
