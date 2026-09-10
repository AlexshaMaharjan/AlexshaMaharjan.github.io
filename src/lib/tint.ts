import { imageVariants } from "@/lib/imageVariants";

/**
 * The colour a group of pictures is, washed almost all the way to paper.
 *
 * `image-variants.mjs` already samples every image's border colour at build
 * time for `DECISION-025`'s mats. Averaging those across one category gives
 * that category a colour **taken from its own contents** rather than invented:
 * the digital portraits come out warm pink, the crafts come out green, the
 * photography section comes out near-black and therefore stays grey.
 *
 * **`DECISION-020` did this and was rejected, so the difference matters.** That
 * attempt tinted the tiles themselves and put white text on them; the result was
 * eight murky colour washes under a restrained page, and the owner's objection
 * was exactly the treatment. Here the colour never touches a tile and never sits
 * under text — it is a ground behind the section, mixed 94% into white, which is
 * the difference between a tinted photograph and a coloured page.
 */
export function tintOf(srcs: (string | undefined)[], mix = 0.94): string {
  const rgb = srcs
    .filter((s): s is string => Boolean(s))
    .map((s) => imageVariants[s]?.bg)
    .filter((hex): hex is string => Boolean(hex))
    .map((hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number]);

  if (rgb.length === 0) return "transparent";

  const mean = [0, 1, 2].map((c) => rgb.reduce((sum, px) => sum + px[c]!, 0) / rgb.length);
  // Toward paper white. A category of dark photographs stays grey rather than
  // becoming a dark band, which is the behaviour we want from a wash.
  const washed = mean.map((v) => Math.round(v + (255 - v) * mix));
  return `rgb(${washed.join(" ")})`;
}
