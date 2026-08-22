import { Link } from "react-router-dom";
import { localeHref, type Locale } from "@/lib/i18n";

interface BentoCard {
  slug: string;
  category: string;
  title: string;
  gridArea: string;
  fontSize: string;
}

const cards: BentoCard[] = [
  { slug: "wikimind", category: "Brand & UI/UX", title: "WikiMind", gridArea: "1 / 1 / 2 / 7", fontSize: "clamp(26px,3.6vw,60px)" },
  { slug: "afono", category: "Brand & E-commerce", title: "AFONO", gridArea: "1 / 7 / 2 / 11", fontSize: "clamp(22px,2.8vw,44px)" },
  { slug: "sync-fm", category: "Interaction Design", title: "Sync FM", gridArea: "2 / 1 / 3 / 5", fontSize: "clamp(20px,2.3vw,34px)" },
  { slug: "surugami", category: "Brand & Print", title: "Surugami", gridArea: "3 / 1 / 4 / 5", fontSize: "clamp(20px,2.3vw,34px)" },
  { slug: "qis-portal", category: "UX Research", title: "QIS Portal", gridArea: "2 / 5 / 4 / 11", fontSize: "clamp(26px,3.4vw,56px)" },
  { slug: "barrier-free-kitchen", category: "Inclusive Design", title: "Kitchen", gridArea: "4 / 1 / 6 / 6", fontSize: "clamp(24px,3.1vw,50px)" },
  { slug: "wikimind", category: "Web Design", title: "WikiMind", gridArea: "4 / 6 / 5 / 11", fontSize: "clamp(20px,2.3vw,36px)" },
  { slug: "afono", category: "Graphic", title: "AFONO", gridArea: "5 / 6 / 6 / 8", fontSize: "clamp(16px,1.6vw,24px)" },
  { slug: "sync-fm", category: "Mobile UI", title: "Sync FM", gridArea: "5 / 8 / 6 / 11", fontSize: "clamp(18px,1.9vw,26px)" },
  { slug: "surugami", category: "Poster & Print", title: "Surugami", gridArea: "6 / 1 / 7 / 8", fontSize: "clamp(20px,2.5vw,38px)" },
  { slug: "qis-portal", category: "Product Design", title: "QIS Portal", gridArea: "6 / 8 / 7 / 11", fontSize: "clamp(18px,1.9vw,26px)" },
];

export default function BentoGrid({ locale }: { locale: Locale }) {
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
      {cards.map((card, i) => (
        <Link
          key={i}
          to={localeHref(locale, `/work/${card.slug}`)}
          aria-label={`${card.title} — ${card.category}`}
          className="relative flex items-center justify-center overflow-hidden rounded-[14px] bg-[#E6E7E9] transition-colors duration-[250ms] ease-out hover:bg-[#DCDEE1]"
          style={{ gridArea: card.gridArea, padding: "38px 18px 18px" }}
        >
          <span className="absolute left-3.5 right-3.5 top-3.5 text-center text-[12px] leading-[1.2] text-[#62666D]">
            {card.category}
          </span>
          <h3
            className="m-0 text-center font-normal tracking-[-0.03em] leading-[0.98] text-[#111111]"
            style={{ fontSize: card.fontSize, textWrap: "balance" }}
          >
            {card.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
