/**
 * Draw the four QIS survey charts, in both locales, into `public/images/`.
 *
 *   node scripts/qis-charts.mjs [--port 9333]
 *
 * The owner supplied these as matplotlib exports
 * (`Images/qis/qis_portfolio_charts/{en,de}/*.{svg,png}`) and asked for them to
 * be re-rendered in the site's own typography and the QIS red, because the
 * exports carried two things a figure on this page cannot: **matplotlib's
 * default `#1f77b4` blue**, which appears nowhere in this site or in the QIS
 * design system, and **the chart title baked into the bitmap**, which is the
 * same sentence the case study already prints as the heading above it.
 *
 * So these are drawn from the numbers instead. The numbers and the labels are
 * read off the owner's SVGs — each one carries them as XML comments next to the
 * paths, which is the only machine-readable text in a matplotlib SVG, since the
 * glyphs themselves are outlined — and are written out in `CHARTS` below. The
 * owner's files stay untouched; they are the source, this is the rendering.
 *
 * Why a browser and not a charting library: the same reason as
 * `image-treat.mjs`. This project has had one devDependency for its whole life
 * and draws in the Chrome it already uses for verification (`DECISION-012`).
 * Chrome is also the only thing here that can set Inter — the real webfont out
 * of `public/fonts`, so the chart's type matches the page it sits on rather
 * than approximating it.
 *
 * Needs a Chrome listening on the debug port, the same as the other scripts:
 *
 *   /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome \\
 *     --headless --remote-debugging-port=9333 about:blank
 *
 * Run `npm run images` afterwards to emit the responsive variants.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { connect, evaluate, setViewport, sleep } from "./lib/cdp.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/images");

/** The site's own tokens, so a chart is the same ink as the paragraph above it. */
const INK = "#111111";
const INK_SECONDARY = "#62666D";
/**
 * The QIS project's own red — `dictionaries/{en,de}.ts → projects[].accent` for
 * this slug, which is the red read off the project's cover, and the red the
 * redesign itself is built in. Not the site `accent` blue: these charts belong
 * to one project, and every other figure on the page is in this colour.
 */
const RED = "#A80D26";
/** The unfilled remainder of a percentage bar. Red at 12%, flattened onto white. */
const TRACK = "#F6E7EA";

/**
 * Four charts, each in two locales.
 *
 * `kind` is the shape rather than the subject:
 * - `share` — one bar per statement, as a percentage of all respondents, drawn
 *   on a track so the unanswered remainder is visible. Charts 1, 2 and 4.
 * - `count` — a ranked tally of mentions, which has no denominator to draw, so
 *   the bars are scaled to the largest and the label sits beside each one.
 *   Chart 3.
 */
const CHARTS = [
  {
    out: "qis-chart-content-vs-interface",
    kind: "share",
    rows: {
      en: [
        { label: "Rated the content relevant or very relevant", value: 73 },
        { label: "Found the current layout intuitive and user-friendly", value: 6 },
      ],
      de: [
        { label: "Bewerteten die Inhalte als relevant oder sehr relevant", value: 73 },
        { label: "Empfanden das aktuelle Layout als intuitiv und benutzerfreundlich", value: 6 },
      ],
    },
  },
  {
    out: "qis-chart-low-use-sections",
    kind: "share",
    rows: {
      en: [
        { label: "Rarely or never used “Studentisches Leben”", value: 85 },
        { label: "Never used “Amtliche Statistik”", value: 88 },
      ],
      de: [
        { label: "Nutzten „Studentisches Leben“ selten oder gar nicht", value: 85 },
        { label: "Hatten „Amtliche Statistik“ noch nie genutzt", value: 88 },
      ],
    },
  },
  {
    out: "qis-chart-requested-features",
    kind: "count",
    rows: {
      en: [
        { label: "Exam schedules", value: 92 },
        { label: "Upload sick note", value: 67 },
        { label: "Lecturer contacts", value: 45 },
        { label: "Student email", value: 29 },
      ],
      de: [
        { label: "Prüfungspläne", value: 92 },
        { label: "Krankmeldung hochladen", value: 67 },
        { label: "Kontaktdaten der Lehrenden", value: 45 },
        { label: "Studentenmail", value: 29 },
      ],
    },
  },
  {
    out: "qis-chart-occasional-use",
    kind: "share",
    rows: {
      en: [{ label: "Used QIS monthly or only 1–3 times per semester", value: 79 }],
      de: [{ label: "Nutzten QIS monatlich oder nur 1–3 Mal pro Semester", value: 79 }],
    },
  },
];

/**
 * The canvas, sized for **half** the reading column (owner, second pass).
 *
 * The charts sit in a `split` block now, beside their paragraph rather than
 * under it, which renders them about 460 CSS px wide instead of 960. They were
 * drawn at 1600 for the full column, and a 26px label on a 1600px canvas is
 * 7.5px on screen at half that width, which is a picture of a chart rather than
 * a readable one. At 860 the same label lands at about 14px, which is the size
 * the captions around it are set in.
 */
const WIDTH = 860;
const PAD = 40;

/** A `share` chart: stacked label-over-bar rows with the value at the bar's end. */
function shareMarkup(rows) {
  const height = PAD * 2 + rows.length * 104 + (rows.length - 1) * 44;
  const body = rows
    .map(
      (row) => `
      <div class="row">
        <div class="label">${row.label}</div>
        <div class="bar">
          <div class="track"><div class="fill" style="width:${row.value}%"></div></div>
          <div class="value">${row.value}%</div>
        </div>
      </div>`
    )
    .join("");
  return { height, body: `<div class="rows share">${body}</div>` };
}

/**
 * A `count` chart: bars scaled to the largest value, with the tally at the end.
 *
 * The label sits **above** its bar rather than in a column beside it. A fixed
 * label column was right at 1600px wide and is not at 860: "Kontaktdaten der
 * Lehrenden" needs most of 300px at a readable size, which is a third of the
 * canvas spent on a gutter the bars then have to share.
 */
function countMarkup(rows) {
  const height = PAD * 2 + rows.length * 78 + (rows.length - 1) * 22;
  const max = Math.max(...rows.map((r) => r.value));
  const body = rows
    .map(
      (row) => `
      <div class="row">
        <div class="label">${row.label}</div>
        <div class="bar">
          <div class="scale"><div class="fill" style="width:${(row.value / max) * 100}%"></div></div>
          <div class="value">${row.value}</div>
        </div>
      </div>`
    )
    .join("");
  return { height, body: `<div class="rows count">${body}</div>` };
}

const fontFace = (weight, file) => `
  @font-face {
    font-family: Inter;
    font-weight: ${weight};
    font-display: block;
    src: url("data:font/woff2;base64,${readFileSync(path.join(ROOT, "public/fonts", file)).toString("base64")}") format("woff2");
  }`;

const FONTS = [
  fontFace(400, "inter-400-latin.woff2"),
  fontFace(500, "inter-500-latin.woff2"),
  fontFace(600, "inter-600-latin.woff2"),
].join("");

function page({ kind, rows }) {
  const { height, body } = kind === "share" ? shareMarkup(rows) : countMarkup(rows);
  return {
    height,
    html: `<!doctype html><html><head><meta charset="utf-8"><style>
      ${FONTS}
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { background: #FFFFFF; }
      body {
        width: ${WIDTH}px; height: ${height}px; padding: ${PAD}px;
        font-family: Inter, sans-serif; color: ${INK};
        -webkit-font-smoothing: antialiased;
      }
      .rows { display: flex; flex-direction: column; height: 100%; }
      .share { gap: 36px; }
      .count { gap: 22px; }
      .label { color: ${INK_SECONDARY}; letter-spacing: -0.01em; }
      /*
        The bar is a flex row of [measured area][value], so a percentage width
        on the fill is a percentage of the area the bar is actually drawn in.
        It was an absolutely positioned track with the fill as its sibling for
        one draft, and that is wrong by exactly the width of the value column:
        a 73% fill measured 73% of the row while the track measured the row
        less 112px, so every bar overhung its own track by about 8%.
      */
      .bar { display: flex; align-items: center; gap: 20px; }
      .fill { background: ${RED}; border-radius: 4px; height: 100%; }
      .value { font-weight: 600; letter-spacing: -0.02em; white-space: nowrap; }

      /* A share row: the statement over a full-width track, value at the end. */
      .share .row { display: flex; flex-direction: column; gap: 10px; }
      .share .label { font-size: 26px; line-height: 1.35; }
      .share .bar { height: 46px; }
      .share .track {
        flex: 1 1 auto; height: 100%;
        background: ${TRACK}; border-radius: 4px;
      }
      .share .value { flex: 0 0 92px; font-size: 32px; }

      /* A count row: the same stacked shape, with the tally rather than a share. */
      .count .row { display: flex; flex-direction: column; gap: 8px; }
      .count .label { font-size: 24px; line-height: 1.3; }
      .count .bar { height: 40px; }
      .count .scale { flex: 1 1 auto; height: 100%; }
      .count .value { flex: 0 0 62px; font-size: 28px; }
    </style></head><body>${body}</body></html>`,
  };
}

const portFlag = process.argv.indexOf("--port");
const port = portFlag > -1 ? +process.argv[portFlag + 1] : 9333;
const cdp = await connect(port);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");

for (const chart of CHARTS) {
  for (const locale of ["en", "de"]) {
    const { html, height } = page({ kind: chart.kind, rows: chart.rows[locale] });
    /*
     * `deviceScaleFactor: 2` so the output is a 3200px-wide retina asset that
     * `image-variants.mjs` can ladder down from, the same as every hand-exported
     * board in `public/images/`.
     */
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: WIDTH, height, deviceScaleFactor: 2, mobile: false,
    });
    await cdp.send("Page.navigate", {
      url: `data:text/html;charset=utf-8;base64,${Buffer.from(html, "utf8").toString("base64")}`,
    });
    // The fonts are inlined, so this is layout settling rather than a network
    // wait — but `document.fonts.ready` is still the only signal that the text
    // has been measured in Inter and not in the fallback.
    await evaluate(cdp, "document.fonts.ready.then(() => true)");
    await sleep(120);

    const { data } = await cdp.send("Page.captureScreenshot", {
      format: "webp", quality: 92, captureBeyondViewport: false,
    });
    const file = path.join(OUT, `${chart.out}-${locale}.webp`);
    writeFileSync(file, Buffer.from(data, "base64"));
    console.log(
      `${path.relative(ROOT, file)}  ${WIDTH}x${height} @2x  ` +
        `${(Buffer.from(data, "base64").length / 1024).toFixed(0)} KB  ` +
        `aspect ${WIDTH}/${height}`
    );
  }
}

await setViewport(cdp, 1440, 900);
cdp.close();
