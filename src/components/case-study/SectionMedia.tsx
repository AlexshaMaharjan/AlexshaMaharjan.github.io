import type { SectionImage } from "@/lib/caseStudies/types";
import Figure from "./Figure";

/**
 * Wide enough to carry a section on its own? `wide` in the data wins; otherwise
 * the aspect ratio decides, so existing content gets sensible treatment without
 * every slot having to be annotated.
 */
function isWide(image: SectionImage): boolean {
  if (image.wide !== undefined) return image.wide;
  const [w, h] = image.aspect.split("/").map(Number);
  if (!w || !h) return false;
  return w / h >= 1.5;
}

/** 2 or 4 images read better paired; anything else goes three across. */
function columnsFor(count: number): string {
  if (count === 1) return "";
  if (count === 2 || count === 4) return "sm:grid-cols-2";
  return "sm:grid-cols-3";
}

/**
 * A section's image slots, grouped into runs so the page has more than one
 * media width: a wide image gets the full column, while narrower ones pack into
 * a grid at roughly a third of it (`SUGGESTION-003`). Runs preserve the order
 * the images are written in.
 */
export default function SectionMedia({ images }: { images: SectionImage[] }) {
  if (images.length === 0) return null;

  const runs: { wide: boolean; items: SectionImage[] }[] = [];
  for (const image of images) {
    const wide = isWide(image);
    const last = runs[runs.length - 1];
    if (last && !last.wide && !wide) last.items.push(image);
    else runs.push({ wide, items: [image] });
  }

  return (
    <div className="mt-12 flex flex-col gap-12">
      {/*
        These sit inside a section that already reveals, which makes them
        nested reveals — allowed, and coherent, because a child is always lower
        in the flow than its section, so its trigger never fires before the
        section's. While the section is at rest the figures are invisible with
        it; once it has arrived they wait for their own turn (DECISION-008).
      */}
      {runs.map((run, i) =>
        run.wide ? (
          <div key={i} data-inview="scale">
            <Figure {...run.items[0]!} />
          </div>
        ) : (
          <div key={i} data-inview="stagger" className={`grid gap-5 ${columnsFor(run.items.length)}`}>
            {run.items.map((image, n) => (
              <Figure key={n} {...image} />
            ))}
          </div>
        ),
      )}
    </div>
  );
}
