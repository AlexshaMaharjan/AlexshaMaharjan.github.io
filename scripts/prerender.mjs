/**
 * Writes each route's real metadata into its own HTML file, so scrapers see the
 * page they asked for rather than the homepage's English tags (`ISSUE-013`).
 *
 *   npm run prerender          # after npm run build
 *
 * **No new dependency.** It serves `dist/` from a ~20-line static server, drives
 * the same headless Chrome the project already verifies with, reads the head the
 * app produced for each route, and writes it into a copy of the built shell.
 *
 * **Head only, deliberately.** Capturing the rendered *body* as well works and
 * gives a non-JS crawler the whole page — measured at 1,279 words on a case
 * study — but pages are lazy (`ARCH-01`), so React hydrates into a null
 * Suspense fallback and empties the markup that was already on screen until the
 * route's chunk arrives: content at ~110ms, blank from ~150ms, back at ~400ms.
 * That is a visible flicker for every human visitor, paid to serve crawlers that
 * do not execute JavaScript. Search engines that matter here do execute it, and
 * social scrapers only ever read the head. The body option is written up in
 * `docs/issues/issue_013.md` with what it would take to make it safe.
 */
import { spawn } from "node:child_process";
import { build } from "esbuild";
import { createServer } from "node:http";
import { createReadStream, existsSync, mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4179;
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE_ORIGIN = "https://alexshamaharjan.github.io";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- routes
async function loadRoutes() {
  const dir = mkdtempSync(path.join(tmpdir(), "prerender-"));
  const out = path.join(dir, "data.mjs");
  await build({
    stdin: {
      contents: `
        export { caseStudySlugs } from "${path.join(ROOT, "src/lib/caseStudies/index.ts")}";
        import { getAllCategories } from "${path.join(ROOT, "src/lib/playground/categories/index.ts")}";
        import { getProject } from "${path.join(ROOT, "src/lib/playground/projects/index.ts")}";
        export const categories = getAllCategories("en").map((c) => c.slug);
        export const projects = getAllCategories("en").flatMap((c) =>
          c.items.filter((i) => i.slug && getProject(i.slug, "en")).map((i) => c.slug + "/" + i.slug));
      `,
      resolveDir: ROOT,
      loader: "ts",
    },
    bundle: true, format: "esm", outfile: out, logLevel: "error",
  });
  const { caseStudySlugs, categories, projects } = await import(pathToFileURL(out).href);
  const paths = [
    "/", "/about", "/resume", "/contact",
    ...caseStudySlugs.map((s) => `/work/${s}`),
    "/playground",
    ...categories.map((c) => `/playground/${c}`),
    ...[...new Set(projects)].map((p) => `/playground/${p}`),
  ];
  return paths.flatMap((p) => [p, p === "/" ? "/de/" : `/de${p}`]);
}

// ---------------------------------------------------------------- server
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml" };
function serve() {
  const server = createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let file = path.join(DIST, url);
    if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!existsSync(file)) file = path.join(DIST, "index.html"); // SPA fallback, as the host does
    res.setHeader("Content-Type", TYPES[path.extname(file)] ?? "application/octet-stream");
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

// ---------------------------------------------------------------- chrome
async function connect(port) {
  for (let i = 0; i < 40; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find((t) => t.type === "page");
      if (page) {
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
        let id = 0;
        const pending = new Map();
        ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); } };
        const send = (method, params = {}) => new Promise((resolve, reject) => {
          const myId = ++id;
          pending.set(myId, (msg) => (msg.error ? reject(new Error(method + ": " + JSON.stringify(msg.error))) : resolve(msg.result)));
          ws.send(JSON.stringify({ id: myId, method, params }));
        });
        return { send, close: () => ws.close() };
      }
    } catch { /* not up yet */ }
    await sleep(250);
  }
  throw new Error("could not reach Chrome — set CHROME to its binary if this is not macOS");
}

// ---------------------------------------------------------------- shell
const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/** The built shell, before anything is written into it. */
const SHELL = readFileSync(path.join(DIST, "index.html"), "utf8");

/** The built shell with this route's head values substituted in. */
function renderShell(head) {
  const tags = [
    `<title>${escape(head.title)}</title>`,
    `<meta name="description" content="${escape(head.description)}" />`,
    `<link rel="canonical" href="${escape(head.canonical)}" />`,
    `<meta property="og:title" content="${escape(head.ogTitle)}" />`,
    `<meta property="og:description" content="${escape(head.ogDescription)}" />`,
    `<meta property="og:image" content="${escape(head.ogImage)}" />`,
    `<meta property="og:url" content="${escape(head.ogUrl)}" />`,
    `<meta property="og:locale" content="${escape(head.ogLocale)}" />`,
    `<meta name="twitter:title" content="${escape(head.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escape(head.ogDescription)}" />`,
    `<meta name="twitter:image" content="${escape(head.ogImage)}" />`,
  ].join("\n    ");

  return SHELL
    .replace(/<html lang="[^"]*"/, `<html lang="${escape(head.lang)}"`)
    .replace(/<title>[\s\S]*?<\/title>/, "@@TAGS@@")
    .replace(/\n\s*<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace(/\n\s*<meta\s+property="og:title"[\s\S]*?\/>/, "")
    .replace(/\n\s*<meta\s+property="og:description"[\s\S]*?\/>/, "")
    .replace(/\n\s*<meta\s+property="og:image"[\s\S]*?\/>/, "")
    .replace("@@TAGS@@", tags);
}

// ---------------------------------------------------------------- run
const routes = await loadRoutes();
const server = await serve();
const profile = mkdtempSync(path.join(tmpdir(), "prerender-chrome-"));
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=9444", `--user-data-dir=${profile}`, "--no-first-run", "--disable-gpu", "about:blank"], { stdio: "ignore" });

try {
  const cdp = await connect(9444);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  let written = 0;
  for (const route of routes) {
    await cdp.send("Page.navigate", { url: "about:blank" });
    await sleep(80);
    await cdp.send("Page.navigate", { url: `http://127.0.0.1:${PORT}${route}` });
    await sleep(900);

    const result = await cdp.send("Runtime.evaluate", {
      expression: `(() => {
        if (!document.querySelector("h1")) return null;   // never write a page that did not render
        const meta = (sel) => (document.head.querySelector(sel) || {}).content || "";
        const link = (rel) => (document.head.querySelector('link[rel="' + rel + '"]') || {}).href || "";
        return JSON.stringify({
          lang: document.documentElement.lang || "en",
          title: document.title,
          description: meta('meta[name="description"]'),
          ogTitle: meta('meta[property="og:title"]'),
          ogDescription: meta('meta[property="og:description"]'),
          ogImage: meta('meta[property="og:image"]'),
          ogUrl: meta('meta[property="og:url"]'),
          ogLocale: meta('meta[property="og:locale"]'),
          canonical: link("canonical"),
        });
      })()`,
      returnByValue: true,
    });
    if (!result.result.value) { console.error(`  ! ${route} did not render — skipped`); continue; }
    const head = JSON.parse(result.result.value);
    const html = renderShell(head);

    const target = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, html);
    written++;
  }

  // A sitemap costs nothing once the route list exists.
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.w3.org/1999/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${SITE_ORIGIN}${r}</loc></url>`)
    .join("\n")}\n</urlset>\n`.replace("http://www.w3.org/1999/sitemap/0.9", "http://www.sitemaps.org/schemas/sitemap/0.9");
  writeFileSync(path.join(DIST, "sitemap.xml"), sitemap);

  // The SPA fallback keeps the unmodified shell: an unknown URL should not
  // claim to be the homepage.
  writeFileSync(path.join(DIST, "404.html"), SHELL);

  console.error(`prerendered the head of ${written}/${routes.length} routes, plus sitemap.xml and the SPA fallback`);
} finally {
  chrome.kill();
  server.close();
}
