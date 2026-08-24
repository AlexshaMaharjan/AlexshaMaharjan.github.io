import { Link } from "react-router-dom";
import type { Dictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import Image from "@/components/ui/Image";

/**
 * The homepage work section (`DECISION-010`, confirmed by the owner 2026-08-24).
 *
 * Tiles come from the dictionary, so the German homepage is German
 * (`ISSUE-005`) and giving a tile an image is a data edit (`ISSUE-004`). Until
 * one has a `src` the tile is the flat grey card it is today — the composition
 * is designed to work either way, and the two states can mix while the images
 * are being made.
 *
 * Several projects appear on more than one tile, deliberately: the grid reads
 * as a wall of work rather than a list of six.
 */
export default function BentoGrid({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <div
      data-el="bento"
      className="mx-auto"
      style={{
        maxWidth: 1120,
        aspectRatio: "0.58",
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gridTemplateRows: "1.05fr 1fr 0.95fr 1fr 0.97fr 1fr",
        gap: 14,
      }}
    >
      {dictionary.selectedWork.bento.map((tile, i) => (
        <Link
          key={i}
          to={localeHref(locale, `/work/${tile.slug}`)}
          aria-label={`${tile.title} — ${tile.category}`}
          className="group relative flex items-center justify-center overflow-hidden rounded-[14px] bg-[#E6E7E9] transition-colors duration-[250ms] ease-out hover:bg-[#DCDEE1]"
          style={{ gridArea: tile.gridArea, padding: "38px 18px 18px" }}
        >
          {tile.src && (
            <>
              <Image
                src={tile.src}
                alt={tile.alt ?? ""}
                className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
              />
              {/* The label and title sit on the image, so they need their own ground. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.55)] via-[rgba(10,10,10,0.15)] to-transparent"
              />
            </>
          )}
          <span
            className={`absolute left-3.5 right-3.5 top-3.5 text-center text-[12px] leading-[1.2] ${
              tile.src ? "text-white/85" : "text-ink-secondary"
            }`}
          >
            {tile.category}
          </span>
          <h3
            className={`relative m-0 text-center font-normal leading-[0.98] tracking-[-0.03em] ${
              tile.src ? "text-white" : "text-ink"
            }`}
            style={{ fontSize: tile.fontSize, textWrap: "balance" }}
          >
            {tile.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
