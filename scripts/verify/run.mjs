/**
 * The checks this project's hand-off has asked for every session, as a command
 * rather than as prose.
 *
 *   node scripts/verify/run.mjs [routes|images|a11y|weight|all] [--base URL] [--port N]
 *
 * Run against the **production build** through `scripts/verify/serve.mjs`, not
 * the dev server. Exits non-zero if anything fails.
 *
 * Each check encodes a trap this project has already paid a debugging round for:
 *
 * - **Lazy images do not load off-screen, and a scroll step with no pause never
 *   lets `IntersectionObserver` fire.** A sweep that scrolls in one jump reports
 *   images broken that were simply never fetched. `settle()` steps and waits.
 * - **`img.complete` cannot tell a lazy image mid-load from a broken one.** The
 *   signal to trust is a *failed network request*, so the image check listens on
 *   `Network.loadingFailed` as well as reading the DOM.
 * - **Case-study routes are a lazy chunk behind Suspense.** axe run against the
 *   fallback reports `landmark-one-main` and `page-has-heading-one`, which look
 *   exactly like real defects. Wait for the page, not for a duration.
 * - **A `srcset` candidate that 404s is invisible in a browser**, so images are
 *   swept at device pixel ratios 1, 2 and 3 — a 1x-only run hid a real bug.
 * - **`Page.addScriptToEvaluateOnNewDocument` accumulates across runs**, so this
 *   never uses it.
 *
 * Two of these cannot share one browser: they both drive the same page target,
 * so concurrent runs interleave navigations and produce nonsense. Run them one
 * after another, or give each its own Chrome and `--port`.
 */
import { readFileSync } from "node:fs";
import { connect, evaluate, sleep, setReducedMotion } from "../lib/cdp.mjs";

const what = process.argv[2] ?? "all";
const baseFlag = process.argv.indexOf("--base");
const BASE = baseFlag > -1 ? process.argv[baseFlag + 1] : "http://127.0.0.1:8099";
const portFlag = process.argv.indexOf("--port");
const PORT = portFlag > -1 ? +process.argv[portFlag + 1] : 9333;

const cdp = await connect(PORT);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await cdp.send("Network.enable");

let failures = 0;
const fail = (msg) => { console.log(`  ✗ ${msg}`); failures++; };

/** Routes come from the generated sitemap, never a hand-written list. */
function routes() {
  const xml = readFileSync("dist/sitemap.xml", "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .sort();
}

async function viewport(width, height, dpr = 1, mobile = false) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: dpr, mobile });
}

/** Navigate, then wait for the page rather than for a duration. */
async function goto(url, { forPage = true } = {}) {
  await cdp.send("Page.navigate", { url: "about:blank" }); await sleep(120);
  await cdp.send("Page.navigate", { url }); await sleep(700);
  if (!forPage) return;
  for (let i = 0; i < 50; i++) {
    const ready = await evaluate(cdp,
      `document.querySelectorAll("main").length > 0 && document.querySelectorAll("h1,h2").length > 0`);
    if (ready) return;
    await sleep(150);
  }
}

/**
 * Walk the page in steps, pausing at each one, then wait for the number of
 * images to stop changing.
 *
 * Both halves are load-bearing. The pause during scrolling is what lets an
 * IntersectionObserver fire, so a single jump to the bottom leaves every lazy
 * image below the first viewport unfetched.
 *
 * The wait afterwards is defensive: `main` and an `h1` exist before a case
 * study's figures are in the DOM, so a fixed delay makes the coverage of this
 * check depend on how loaded the machine is. Counting until the number stops
 * moving makes it depend on the page instead. A sweep that finds no images
 * reports "0 broken" and looks identical to a clean one, which is the failure
 * mode worth engineering against.
 */
async function settle() {
  const h = await evaluate(cdp, "document.documentElement.scrollHeight");
  const vh = await evaluate(cdp, "window.innerHeight");
  for (let y = 0; y < h; y += Math.round(vh * 0.8)) {
    await evaluate(cdp, `window.scrollTo({ top: ${y}, behavior: "instant" })`);
    await sleep(130);
  }
  await evaluate(cdp, `window.scrollTo({ top: 0, behavior: "instant" })`);

  let last = -1, stable = 0;
  for (let i = 0; i < 60 && stable < 4; i++) {
    await sleep(150);
    const n = await evaluate(cdp, "document.images.length");
    stable = n === last ? stable + 1 : 0;
    last = n;
  }
  return last;
}

// ---------------------------------------------------------------- routes
async function checkRoutes() {
  const paths = routes();
  let ok = 0;
  for (const p of paths) {
    const res = await fetch(BASE + p);
    const html = await res.text();
    const titled = /<title>[^<]{3,}<\/title>/.test(html);
    const alt = (html.match(/rel="alternate"[^>]*hreflang=/g) ?? []).length;
    if (res.status === 200 && titled && alt >= 2) ok++;
    else fail(`${p} — status ${res.status}, titled ${titled}, hreflang ${alt}`);
  }
  console.log(`routes: ${ok}/${paths.length} fine (200, titled, hreflang)`);

  // These must 404: there is no work index route, and nothing links to one.
  for (const p of ["/work", "/de/work", "/work/nonsense", "/totally/made/up"]) {
    const res = await fetch(BASE + p);
    if (res.status === 404) console.log(`  ${p} → 404 ✓`);
    else fail(`${p} should 404, got ${res.status}`);
  }
}

// ---------------------------------------------------------------- images
async function checkImages(dpr) {
  const paths = routes();
  let seen = 0, broken = 0, noAlt = 0, decorative = 0, placeholder = 0, failedReqs = 0;
  const perRoute = new Map();   // route → how many <img> it ended up with

  // A `srcset` candidate that 404s is invisible in the page — the browser just
  // uses another one — so it has to be read off the network rather than the DOM.
  const urlOf = new Map();
  const failed = new Map();
  cdp.on("Network.requestWillBeSent", ({ requestId, request, type }) => {
    if (type === "Image" || /\.(webp|png|jpe?g|svg|gif)(\?|$)/i.test(request.url)) urlOf.set(requestId, request.url);
  });
  cdp.on("Network.loadingFailed", ({ requestId, errorText }) => {
    if (urlOf.has(requestId)) failed.set(urlOf.get(requestId), errorText);
  });
  cdp.on("Network.responseReceived", ({ requestId, response }) => {
    if (urlOf.has(requestId) && response.status >= 400) failed.set(urlOf.get(requestId), `HTTP ${response.status}`);
  });
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });

  for (const p of paths) {
    failed.clear(); urlOf.clear();
    await viewport(dpr === 1 ? 1440 : 390, 900, dpr, dpr !== 1);
    await goto(BASE + p);
    const n = await settle();
    perRoute.set(p, n);
    if (process.env.VERBOSE) process.stderr.write(`    ${p} → ${n}\n`);
    /*
     * `hidden` is whether the image sits inside an `aria-hidden` subtree, and it
     * is the difference between a missing alt and a correct one.
     *
     * `alt=""` on a decorative image is the right answer, not a defect: it is
     * how you tell a screen reader there is nothing here worth announcing. The
     * check used to fail every one of them, which was fine while the site had
     * none — and then `PlaygroundPeek` put four thumbnails inside a labelled
     * link, where four descriptions in front of a button that already says
     * "Open the playground" would be three announcements too many.
     *
     * An image inside `aria-hidden="true"` is not in the accessibility tree at
     * all, so "missing alt" is not a question that applies to it. An `alt=""`
     * that is *not* inside one is still a failure, because that is the case
     * where a real picture has been left undescribed.
     */
    const stats = JSON.parse(await evaluate(cdp, `JSON.stringify(
      [...document.images].map((i) => ({
        src: i.currentSrc || i.src,
        broken: i.complete && i.naturalWidth === 0,
        alt: i.getAttribute("alt"),
        hidden: Boolean(i.closest('[aria-hidden="true"]')),
      })))`));
    for (const im of stats) {
      seen++;
      if (im.broken) { broken++; fail(`${p} dpr${dpr}: broken ${im.src}`); }
      if (im.hidden) { decorative++; }
      else if (im.alt === null || im.alt.trim() === "") { noAlt++; fail(`${p}: missing alt ${im.src}`); }
      else if (/^Placeholder:/i.test(im.alt)) { placeholder++; fail(`${p}: "Placeholder:" alt — ${im.src}`); }
    }
    for (const [url, why] of failed) { failedReqs++; fail(`${p} dpr${dpr}: image request failed (${why}) — ${url}`); }
  }
  console.log(`dpr ${dpr}: ${seen} images across ${paths.length} routes — ${broken} broken, ${decorative} decorative (aria-hidden), ${noAlt} missing alt, ${placeholder} "Placeholder:" alt, ${failedReqs} failed image requests`);
  return perRoute;
}

// ---------------------------------------------------------------- a11y
async function checkA11y() {
  const AXE = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
  const paths = routes();
  let violations = 0, overflow = 0, stuck = 0;
  for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
    for (const p of paths) {
      await viewport(w, h, 1, mobile);
      await goto(BASE + p);
      await settle();
      const over = await evaluate(cdp,
        `document.documentElement.scrollWidth - document.documentElement.clientWidth`);
      if (over > 0) { overflow++; fail(`${p} @${w}: ${over}px horizontal overflow`); }
      const hidden = await evaluate(cdp, `[...document.querySelectorAll("[data-reveal]")]
        .filter((e) => getComputedStyle(e).opacity === "0").length`);
      if (hidden > 0) { stuck++; fail(`${p} @${w}: ${hidden} element(s) stuck invisible`); }
      if (w !== 1440) continue;              // axe once per route is enough
      await evaluate(cdp, AXE + "; 1");
      const v = JSON.parse(await evaluate(cdp,
        `axe.run(document, { resultTypes: ["violations"] }).then(r => JSON.stringify(
           r.violations.map((x) => ({ id: x.id, impact: x.impact, n: x.nodes.length }))))`));
      for (const x of v) { violations++; fail(`axe ${p}: ${x.id} (${x.impact}, ${x.n})`); }
    }
  }
  console.log(`axe: ${violations} violations | overflow: ${overflow} pages | reveal stuck: ${stuck} pages`);

  // Reduced motion must leave a completely static, fully visible page.
  await setReducedMotion(cdp, true);
  await viewport(1440, 900);
  await goto(BASE + "/");
  await settle();
  const invisible = await evaluate(cdp, `[...document.querySelectorAll("[data-reveal]")]
    .filter((e) => { const s = getComputedStyle(e);
      return s.opacity !== "1" || (s.transform !== "none" && s.transform !== "matrix(1, 0, 0, 1, 0, 0)"); }).length`);
  if (invisible > 0) fail(`reduced motion: ${invisible} element(s) not static and visible`);
  else console.log("reduced motion: every revealed element visible and untransformed");
  await setReducedMotion(cdp, false);
}

// ---------------------------------------------------------------- weight
async function checkWeight() {
  /*
    The playground was never sampled here before SESSION-033, and it is the
    heaviest page on the site: one scrapbook page carrying every category's
    pictures at full size plus three autoplaying clips (`DECISION-026`). A
    weight check that only looks at case studies cannot see it.

    `/playground/graphic-design` was sampled here too until SESSION-034 retired
    that route — and the check happily reported it at "0 KB img, 113 KB total",
    which is the weight of the 404 page. **A route that stops existing does not
    fail this check, it flatters it.**
  */
  const pages = ["/", "/work/sync-fm", "/work/afono", "/work/surugami", "/work/wikimind", "/playground"];
  console.log("whole page, uncached, gzipped:");
  for (const p of pages) {
    for (const [w, dpr, mobile] of [[1440, 1, false], [390, 3, true]]) {
      let img = 0, total = 0;
      const sizes = new Map();
      const onFinish = ({ requestId, encodedDataLength }) => sizes.set(requestId, encodedDataLength);
      const types = new Map();
      cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      const handler = (m) => {};
      await viewport(w, 900, dpr, mobile);
      await goto(BASE + p);
      await settle();
      const res = JSON.parse(await evaluate(cdp, `JSON.stringify(
        performance.getEntriesByType("resource").map((r) => ({ n: r.name, t: r.initiatorType, s: r.encodedBodySize })))`));
      const doc = JSON.parse(await evaluate(cdp, `String(performance.getEntriesByType("navigation")[0].encodedBodySize)`));
      total = Number(doc) || 0;
      for (const r of res) {
        total += r.s;
        if (/\.(webp|png|jpe?g|svg|gif)(\?|$)/i.test(r.n) || r.t === "img") img += r.s;
      }
      console.log(`  ${p.padEnd(16)} ${w}px/${dpr}x  ${String(Math.round(img / 1024)).padStart(4)} KB img  ${String(Math.round(total / 1024)).padStart(4)} KB total`);
    }
  }
}

if (what === "routes" || what === "all") await checkRoutes();
if (what === "images" || what === "all") {
  const dprFlag = process.argv.indexOf("--dpr");
  const dprs = dprFlag > -1 ? [+process.argv[dprFlag + 1]] : [1, 2, 3];
  const byDpr = new Map();
  for (const d of dprs) byDpr.set(d, await checkImages(d));
  /*
   * The same route should contain the same number of <img> elements whatever
   * the device pixel ratio — only the chosen `srcset` candidate changes. A
   * route whose count moves between passes was measured before it had settled,
   * which means that pass under-covered it. This is the check that would have
   * caught the unstable counts of SESSION-021 rather than leaving them to be
   * noticed by eye. (Counting zero is not itself suspicious: Playground's
   * slots are all still unfilled, and `/resume` is text.)
   */
  if (byDpr.size > 1) {
    const routesSeen = [...byDpr.values()][0].keys();
    let wobbly = 0;
    for (const r of routesSeen) {
      const counts = [...byDpr].map(([d, m]) => `${d}x:${m.get(r)}`);
      const distinct = new Set([...byDpr.values()].map((m) => m.get(r)));
      if (distinct.size > 1) { wobbly++; fail(`${r}: image count differs between passes — ${counts.join(", ")}`); }
    }
    if (!wobbly) console.log(`image counts identical across ${[...byDpr.keys()].join("x, ")}x for all routes`);
  }
}
if (what === "a11y" || what === "all") await checkA11y();
if (what === "weight" || what === "all") await checkWeight();

cdp.close();
if (failures) { console.log(`\n${failures} failure(s)`); process.exit(1); }
console.log("\nall green");
