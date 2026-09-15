import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { localeHref, stripLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import LanguageSwitch from "@/components/LanguageSwitch";
import { ARCHIVE_PATH } from "@/lib/site";

/**
 * An ordinary footer: who this is, where else to go, how to get in touch, and
 * the legal line.
 *
 * ## It was briefly the email address
 *
 * `MILESTONE-013` rebuilt it around a 44px `mailto:` link, on the reasoning
 * that the one thing a visitor at the bottom of a portfolio wants is the way to
 * get in touch. The owner's verdict was that it looked bad, and they are right
 * about why: a 27-character Gmail address is not a wordmark. Set at display
 * size it is a long string of lowercase with a dot and an `@` in it, it wraps on
 * a phone, and it makes the loudest thing on the page a piece of plumbing.
 * "Big type as the finish" works when the thing being set is short and is a
 * name.
 *
 * So the shape is conventional again, and deliberately: a footer is the one
 * part of a site where surprising the reader has no upside. Identity on the
 * left, two short columns of links on the right, a rule, and a utility strip.
 *
 * ## It is still not the footer `MILESTONE-013` was asked to shrink
 *
 * The original ran about 380px on a desktop and roughly 520 stacked. This one
 * is about 240, and the difference is air rather than content: `py-12` against
 * `py-16`, a 40px gap above the utility strip against 56, and the two link
 * columns sharing one row with the identity block instead of sitting below it
 * on a twelve-column grid that collapsed at `md`.
 *
 * Nothing has been dropped. Every destination the header reaches is here
 * (`ISSUE-050`), plus the résumé, the playground, and the two legal pages
 * German law asks for (`DECISION-046`).
 */
export default function Footer({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const pathname = useLocation().pathname ?? "/";
  const bare = stripLocale(pathname, locale);
  const isPlayground = bare.startsWith(ARCHIVE_PATH);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  /*
    Two columns, each written out as its own list rather than six links poured
    into a two-column grid (`MILESTONE-019` task 7).

    The grid filled *across* the rows, so the reading order down each column was
    Portfolio / About / Contact and Projects / Playground / Résumé — the three
    whole places the site has, split across both columns and interleaved with
    the three sections inside the portfolio. That is the "jumbled" the owner
    saw, and no amount of ordering fixes it while the flow is row-major.

    Column one is the three destinations that are their own place; column two is
    the three parts of the portfolio itself.

    Portfolio is first and is not a duplicate of the wordmark above it
    (`MILESTONE-015` task 4). The footer listed Playground and not its
    counterpart, so the two modes the header toggles between were one link and
    one wordmark down here — which reads as the playground being a place and
    the portfolio being a logo.
  */
  const linkColumns = [
    [
      { href: localeHref(locale, "/"), label: dictionary.nav.portfolio },
      { href: localeHref(locale, ARCHIVE_PATH), label: dictionary.nav.playground },
      { href: localeHref(locale, "/resume"), label: dictionary.footer.resume },
    ],
    [
      { href: localeHref(locale, "/#work"), label: dictionary.nav.projects },
      { href: localeHref(locale, "/about"), label: dictionary.nav.about },
      { href: localeHref(locale, "/#contact"), label: dictionary.nav.contact },
    ],
  ];

  return (
    <footer
      className={clsx(
        "print:hidden",
        isPlayground
          ? "border-t border-[rgba(78,96,135,0.18)] bg-page"
          : "border-t border-surface-2 bg-white",
      )}
    >
      <div className="container-page py-8 sm:py-12">
        <div className="flex flex-col gap-7 sm:flex-row sm:justify-between sm:gap-10">
          <div>
            {/* The name is the way home, which is the one destination the footer
                had no link to at all (`ISSUE-050`). */}
            <Link
              to={localeHref(locale, "/")}
              className="group inline-block text-[16px] font-semibold text-ink transition-colors hover:text-accent"
            >
              Alexsha Maharjan
              {/* The site's hand-drawn underline, in the accent, drawn on hover.
                  It is the same gesture `About` puts under a word. */}
              <span
                aria-hidden="true"
                className="mt-1 block h-[2px] w-0 rounded-full bg-accent transition-[width] duration-300 ease-out group-hover:w-full"
              />
            </Link>
            <p className="mt-1.5 text-[13.5px] text-ink-secondary sm:text-[14px]">{dictionary.footer.tagline}</p>
            {/*
              A small blue mark tying the footer to the accent the rest of the
              page uses, and the one piece of information a visitor at the
              bottom of a portfolio is actually looking for.

              **It is a link to the contact section** (owner, SESSION-049). A
              line that says the owner is open to work, sitting in the one place
              a reader reaches when they have finished looking, is an offer — and
              an offer with nothing to click is a dead end. The three footer
              links a few centimetres to the right include Contact, so the
              destination was always there; what was missing was that the
              sentence itself went anywhere.

              `/#contact` rather than a separate page: the contact form is a
              section of the homepage, and `useScrollBehavior` resolves the hash
              after the route settles.
            */}
            <Link
              to={localeHref(locale, "/#contact")}
              className="group mt-3.5 inline-flex items-center gap-2 text-[13px] font-medium text-accent sm:mt-5"
            >
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span className="border-b border-transparent transition-colors group-hover:border-accent">
                {dictionary.footer.availability}
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>

          {/* Wraps rather than overflows: between 768px and 839px two columns
              plus a fixed gap were wider than the space `md:px-20` leaves them,
              and every page scrolled sideways (`ISSUE-026`). */}
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-14 sm:gap-y-8">
            {/*
              Two columns, split by what the links are for
              (`MILESTONE-016` task 3, re-cut in `MILESTONE-019` task 7). One
              column of six read as a list of everything; these are two kinds of
              destination — the whole places the site has, and the pages inside
              the portfolio — and saying so in the layout costs nothing and
              halves the height.

              Each column is its own `ul`, so the order down a column is the
              order in the markup. A `grid-cols-2` over one flat list is the
              same picture and the wrong reading order.
            */}
            <nav
              aria-label={dictionary.landmarks.footerNav}
              className="grid grid-cols-2 gap-x-8 text-[14px] text-ink sm:flex sm:gap-x-12"
            >
              {linkColumns.map((column) => (
                <ul key={column[0]!.label} className="flex list-none flex-col gap-y-2.5 p-0 sm:gap-y-3">
                  {column.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="tap-target block w-fit border-b border-transparent transition-colors hover:border-accent hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </nav>
            <div className="flex flex-col gap-2 border-t border-surface-2/60 pt-3.5 font-mono text-[12px] text-ink-muted sm:border-t-0 sm:pt-0 sm:gap-3">
              <a
                href={`mailto:${dictionary.footer.email}`}
                className="tap-target text-ink-secondary transition-colors hover:text-accent"
              >
                {dictionary.footer.email}
              </a>
              <a
                href={dictionary.footer.linkedinHref}
                className="tap-target transition-colors hover:text-accent"
              >
                {dictionary.footer.linkedin}
              </a>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "mt-7 border-t pt-5 text-[12.5px] text-ink-muted sm:mt-10 sm:pt-6 sm:text-[13px]",
            isPlayground ? "border-[rgba(78,96,135,0.18)]" : "border-surface",
          )}
        >
          {/* Mobile layout: balanced two-row layout with navigation & back-to-top on top, copyright centered below */}
          <div className="flex flex-col gap-3.5 sm:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[12.5px]">
                <LanguageSwitch locale={locale} pathname={bare} dictionary={dictionary} />
                <span className="text-border">·</span>
                <Link
                  to={localeHref(locale, "/impressum")}
                  className="tap-target transition-colors hover:text-accent"
                >
                  {dictionary.legal.impressumNav}
                </Link>
                <span className="text-border">·</span>
                <Link
                  to={localeHref(locale, "/datenschutz")}
                  className="tap-target transition-colors hover:text-accent"
                >
                  {dictionary.legal.privacyNav}
                </Link>
              </div>
              <button
                type="button"
                onClick={scrollToTop}
                className="tap-target font-medium text-ink-secondary transition-colors hover:text-accent"
              >
                {dictionary.footer.backToTop}
              </button>
            </div>
            <p className="text-center text-[12px] leading-relaxed text-ink-muted">
              <span>© 2026 · Designed and built by</span>
              <br />
              <span>Alexsha Maharjan</span>
            </p>
          </div>

          {/* Desktop layout: single unified flex row */}
          <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
            <LanguageSwitch locale={locale} pathname={bare} dictionary={dictionary} />
            <Link
              to={localeHref(locale, "/impressum")}
              className="tap-target transition-colors hover:text-accent"
            >
              {dictionary.legal.impressumNav}
            </Link>
            <Link
              to={localeHref(locale, "/datenschutz")}
              className="tap-target transition-colors hover:text-accent"
            >
              {dictionary.legal.privacyNav}
            </Link>
            <span>{dictionary.footer.copyright}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="ml-auto rounded py-2 transition-colors hover:text-accent"
            >
              {dictionary.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
