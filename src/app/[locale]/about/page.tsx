import Image from "next/image";
import Link from "next/link";
import { isLocale, defaultLocale, localeHref } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import PlaceholderImage from "@/components/PlaceholderImage";
import LoveLine from "@/components/about/LoveLine";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);
  const about = dictionary.about;

  return (
    <>
      <section className="pt-[150px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <Link href={localeHref(locale, "/")} className="text-[14px] text-ink-secondary transition-colors hover:text-accent">
            {about.backToHome}
          </Link>
          <p className="mt-10 font-mono text-[13px] text-accent">{about.eyebrow}</p>
          <h1 className="mt-4 max-w-[1080px] text-[clamp(2.5rem,5.4vw,5.25rem)] font-semibold leading-[1] tracking-[-0.028em] text-ink">
            {about.heading}
          </h1>
        </div>
      </section>

      <section className="pt-[90px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <div className="relative max-w-[460px] pt-[58px]">
                <div className="relative z-[1] aspect-[3/4] overflow-hidden rounded-[10px] border border-[#E4E7EE] bg-surface">
                  <Image
                    src="/images/alexsha_photo-mrx9hbwx-nif2.png"
                    alt={about.portraitAlt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[150px] top-1 z-[3] hidden [transform:rotate(-4deg)] md:block"
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
              <h2 className="mt-2.5 text-[clamp(1.875rem,3vw,2.5rem)] font-semibold tracking-[-0.025em]">
                {about.biographyHeading}
              </h2>
              {about.biography.map((p, i) => (
                <p key={i} className={`text-[18px] leading-[1.65] text-ink-body ${i === 0 ? "mt-6" : "mt-4.5"}`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[110px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2">
            <div>
              <h2 className="mt-2.5 text-[clamp(1.625rem,2.6vw,2.125rem)] font-semibold tracking-[-0.02em]">
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
              <h2 className="mt-2.5 text-[clamp(1.625rem,2.6vw,2.125rem)] font-semibold tracking-[-0.02em]">
                {about.toolsHeading}
              </h2>
              <div className="mt-7 flex max-w-[520px] flex-wrap gap-2.5">
                {about.tools.map((tool) => (
                  <span key={tool} className="rounded-full border border-border px-4 py-2 text-[14px] text-ink-body">
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-8.5 max-w-[520px] border-t border-surface-2 pt-6.5">
                <p className="font-mono text-[12px] text-accent">{about.aiLabel}</p>
                <p className="mt-3.5 text-[16px] leading-[1.65] text-ink-body">{about.aiBody}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {about.aiTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-dashed border-[#C9CEDB] px-4 py-2 text-[14px] text-ink-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link
                  href={localeHref(locale, "/resume")}
                  className="flex h-12 items-center rounded-full bg-ink px-7 text-[15px] font-medium text-white transition-colors hover:bg-accent"
                >
                  {about.resumeLink}
                </Link>
                <span className="font-mono text-[12px] text-ink-muted">{about.resumeCaption}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[110px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <h2 className="mt-2.5 text-[clamp(1.625rem,2.6vw,2.125rem)] font-semibold tracking-[-0.02em]">
            {about.carouselHeading}
          </h2>
        </div>
        <div className="mt-8 overflow-x-auto pb-2" style={{ scrollSnapType: "x proximity" }}>
          <div className="flex w-max gap-4 px-5 md:px-20">
            {about.carouselItems.map((item) => (
              <figure key={item.caption} className="m-0" style={{ scrollSnapAlign: "start" }}>
                <PlaceholderImage aspect="4/5" caption={`[ ${item.caption} ]`} className="w-60" />
                <figcaption className="mt-2.5 font-mono text-[11px] text-ink-muted">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[100px] pb-[130px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <LoveLine intro={about.loveIntro} words={about.loveWords} />
        </div>
      </section>

      <section id="resume" className="bg-near-black py-[120px]">
        <div className="mx-auto max-w-[1440px] px-5 md:px-20">
          <div className="mx-auto flex flex-col items-center text-center">
          <h2 className="mx-auto mt-2.5 max-w-[760px] text-[clamp(1.875rem,3.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
            {about.resumeHeading}
          </h2>
          <p className="mx-auto mt-5.5 max-w-[600px] text-[18px] leading-[1.6] text-[#A7ACB4]">{about.resumeCopy}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={localeHref(locale, "/resume")}
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
          <p className="mt-6 font-mono text-[12px] text-[#6C7078]">{dictionary.resume.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}
