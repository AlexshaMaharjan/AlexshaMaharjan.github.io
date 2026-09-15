import { Link } from "react-router-dom";
import Image from "@/components/ui/Image";
import PlaygroundBand from "@/components/PlaygroundBand";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";

export default function AboutPreview({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section id="about" className="bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[280px_1fr] md:gap-16">
          <div data-inview="up" className="flex justify-center md:block">
            {/*
              280px, not 460 (`MILESTONE-018` task 3). The owner's note was that
              the portrait reads too big in both about sections; this is ~60% of
              the width it had. The column is sized to the picture rather than to
              a fraction of the grid, because a 5fr column around a 280px picture
              is 200px of white pretending to be a gutter.
            */}
            <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-[10px] border border-card-border bg-surface-2">
              <Image
                src="/images/alexsha-portrait.webp"
                alt={dictionary.aboutPreview.portraitAlt}
                fill
                sizes="(min-width: 768px) 280px, min(280px, calc(100vw - 40px))"
                className="object-cover"
              />
            </div>
          </div>

          <div data-inview="text">
            <span className="block text-[14px] text-accent">{dictionary.aboutPreview.eyebrow}</span>
            <h2
              className="mt-4 text-section font-semibold leading-[1.08] tracking-[-0.025em] text-ink [hyphens:none] sm:mt-6"
              style={{ textWrap: "balance" }}
            >
              {dictionary.aboutPreview.heading}
            </h2>
            <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-ink-secondary">
              {dictionary.aboutPreview.copy}
            </p>
            {/*
              The biography runs on and fades out (`MILESTONE-012` task 3).
              The pill that used to stand here has gone to the playground below.

              This paragraph used to be one line of signposting — "There is
              more of it on the about page" — which is the page telling you
              there is more instead of showing you. It is now the about page's
              own second paragraph, cut off by a mask: the story keeps going,
              the last line dissolves into the white, and the link underneath
              is the way to finish it. Nothing is hidden from anybody who is
              not looking at it — the whole paragraph is in the DOM and a
              screen reader reads every word of it, because a `mask-image` is
              paint and nothing else.

              **Both paragraphs are shorter than they were**
              (`MILESTONE-016` task 6). The preview used to run the biography's
              whole first paragraph and then most of its second — around ninety
              words before the fade — which is not a preview, it is the about
              page with the end missing. The owner's note was that too much is
              shown before it fades.

              It is one paragraph's worth now, split at its own full stop: a
              complete thought you finish, and then the sentence that follows
              it dissolving. That is the shape the gesture wanted all along.

              The clamp is what makes the fade land in the same place in both
              locales. `3.3em` is two lines at this line-height, and the mask
              reaches full transparency at exactly that point, so German's
              third line is cut where it is already invisible rather than
              hanging half-lit below the fade.
            */}
            <p
              className="mt-4 max-h-[3.3em] max-w-[600px] overflow-hidden text-[18px] leading-[1.6] text-ink-muted"
              style={{
                maskImage: "linear-gradient(to bottom, #000 38%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, #000 38%, transparent 100%)",
              }}
            >
              {dictionary.aboutPreview.copyDim}
            </p>
            {/*
              A quiet link under the fade, where the pill was. The fade is the
              invitation and this is the door; a filled black pill under a
              paragraph that is dissolving would have been two invitations
              arguing, and the section already has its one strong control —
              the playground's, below.
            */}
            <Link
              to={localeHref(locale, "/about")}
              className="tap-target mt-5 inline-block text-[15px] font-medium text-accent hover:underline"
            >
              {dictionary.aboutPreview.linkAbout}
            </Link>

          </div>
        </div>

        {/*
          The playground offer, centred across the page (`MILESTONE-018` task
          4). It used to run down this section's right-hand column under the
          biography, which put a stack of four bright pictures in a text column
          and left it competing with the paragraph above it for the same
          measure. The owner liked the About page's centred band and asked for
          that one here, so both pages render the same component now — see
          `PlaygroundBand`, which also carries the light-blue grid paper.
        */}
        <PlaygroundBand
          locale={locale}
          dictionary={dictionary}
          as="h3"
          heading={dictionary.aboutPreview.playgroundHeading}
          copy={dictionary.aboutPreview.playgroundCopy}
          className="mt-14 sm:mt-18 md:mt-20"
        />
      </div>
    </section>
  );
}
