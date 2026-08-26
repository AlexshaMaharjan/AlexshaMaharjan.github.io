/**
 * A static server that behaves like GitHub Pages, so a measurement taken
 * against it means something.
 *
 *   node scripts/verify/serve.mjs [dir] [port]
 *
 * Two details this project has been caught by:
 *
 * - **It gzips.** Without that the JS bundle roughly doubles every page total
 *   and drowns the imagery number, which is the one being watched.
 * - **Pages resolution order**: exact file, then `dir/index.html`, then
 *   `404.html` with a real 404 status. `/work` must 404 — there is no work
 *   index route — and a server that silently falls back to the SPA shell hides
 *   that.
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const dir = process.argv[2] ?? "dist";
const port = +(process.argv[3] ?? 8099);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".xml": "application/xml", ".json": "application/json", ".txt": "text/plain", ".ico": "image/x-icon",
};
const COMPRESS = new Set([".html", ".js", ".css", ".svg", ".xml", ".json", ".txt"]);

createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const safe = normalize(url).replace(/^(\.\.[/\\])+/, "");
  let file = join(dir, safe);
  let status = 200;

  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file) || statSync(file).isDirectory()) {
    file = join(dir, "404.html");
    status = 404;
  }
  const ext = extname(file).toLowerCase();
  const type = TYPES[ext] ?? "application/octet-stream";

  if (COMPRESS.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    const body = gzipSync(readFileSync(file));
    res.writeHead(status, { "content-type": type, "content-encoding": "gzip", "content-length": body.length });
    res.end(body);
    return;
  }
  res.writeHead(status, { "content-type": type, "content-length": statSync(file).size });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving ${dir} on http://127.0.0.1:${port} (gzip, Pages semantics)`));
