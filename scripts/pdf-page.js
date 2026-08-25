#!/usr/bin/env osascript -l JavaScript
/**
 * Render pages of a PDF to PNG, using macOS PDFKit through the ObjC bridge.
 *
 * Written for MILESTONE-005: the owner's six project documentations
 * (`docs/reference/image_sources.md`) are the source for most of the site's
 * 129 empty image slots, and two of them are too large for any text-based
 * extraction — one is 407 MB of page images with no text layer at all.
 *
 * PDFKit ships with macOS, so this adds no dependency. `axe-core` stays the
 * only entry in devDependencies.
 *
 *   osascript -l JavaScript scripts/pdf-page.js <pdf> <pages> <outDir> [scale]
 *
 *   pages   "12" | "4-9" | "1,5,20-24"   (1-based position in the file)
 *   scale   multiplier on the PDF's own point size; default 2.
 *           A 612×792pt page at scale 4 gives 2448×3168px, which is enough
 *           to crop a 1900px-wide figure out of. Check the printed number in
 *           the corner: position in the file is not the page number.
 *
 * Renders the whole page. Cropping to the figure is a manual step, on purpose
 * — see the provenance gate in `docs/decisions/decision_016.md` before
 * exporting anything.
 */
ObjC.import("Foundation");
ObjC.import("Quartz");
ObjC.import("AppKit");

function run(argv) {
  if (argv.length < 3) {
    return "usage: pdf-page.js <pdf> <pages> <outDir> [scale]";
  }
  const [src, pagesSpec, outDir] = argv;
  const scale = parseFloat(argv[3] || "2");

  const doc = $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath(src));
  if (!doc || doc.isNil()) return `ERROR: cannot read ${src}`;
  const total = doc.pageCount;

  const wanted = [];
  for (const part of pagesSpec.split(",")) {
    if (part.includes("-")) {
      const [from, to] = part.split("-").map(Number);
      for (let p = from; p <= to; p++) wanted.push(p);
    } else {
      wanted.push(Number(part));
    }
  }

  $.NSFileManager.defaultManager
    .createDirectoryAtPathWithIntermediateDirectoriesAttributesError(outDir, true, $(), null);

  const written = [];
  for (const p of wanted) {
    if (p < 1 || p > total) {
      written.push(`skipped ${p}: file has ${total} pages`);
      continue;
    }
    const page = doc.pageAtIndex(p - 1);
    const box = page.boundsForBox($.kPDFDisplayBoxMediaBox);
    const w = Math.round(box.size.width * scale);
    const h = Math.round(box.size.height * scale);
    const image = page.thumbnailOfSizeForBox($.NSMakeSize(w, h), $.kPDFDisplayBoxMediaBox);
    const rep = $.NSBitmapImageRep.imageRepWithData(image.TIFFRepresentation);
    const png = rep.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $({}));
    const path = `${outDir}/p${String(p).padStart(3, "0")}.png`;
    png.writeToFileAtomically($(path), true);
    written.push(`${path}  ${w}x${h}`);
  }
  return written.join("\n");
}
