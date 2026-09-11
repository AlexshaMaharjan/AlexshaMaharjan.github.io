import { Link } from "react-router-dom";
import Image from "@/components/ui/Image";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";

export default function AboutPreview({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  return (
    <section id="about" className="bg-white py-[120px] pb-[160px]">
      <div className="container-page">
        <div data-inview className="grid grid-cols-1 items-start gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <div className="relative aspect-[3/4] w-full max-w-[460px] overflow-hidden rounded-[10px] border border-card-border bg-surface-2">
              <Image
                src="/images/alexsha-portrait.webp"
                alt={dictionary.aboutPreview.portraitAlt}
                fill
                sizes="(min-width: 1180px) 460px, (min-width: 768px) 40vw, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <span className="block text-[14px] text-accent">{dictionary.aboutPreview.eyebrow}</span>
            <h2 className="mt-6 text-section font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
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

            <h3 className="mt-12 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
              {dictionary.aboutPreview.playgroundHeading}
            </h3>
            <p className="mt-4 max-w-[600px] text-[18px] leading-[1.6] text-ink-secondary">
              {dictionary.aboutPreview.playgroundCopy}
            </p>
            {/*
              The pill, moved here from About (`MILESTONE-012` task 3).

              The two halves of this column are not the same kind of offer.
              About is a story you can keep reading, and the fade above is
              already asking for that click; the playground is a *place*, and a
              place needs a door. So the strong control — the `h-12
              rounded-full px-7` of `ContactSection`'s primary, inverted for a
              white ground, with the `focus-visible` ring the rest of the
              site's controls carry — sits on the playground now, and About
              keeps the text link the playground used to have. One primary in
              the section either way; it has changed which half it belongs to.
            */}
            <Link
              to={localeHref(locale, "/playground")}
              className="mt-6 inline-flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus"
            >
              {dictionary.aboutPreview.linkPlayground}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
