import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "node:fs";
import path from "node:path";

/**
 * The archive editor's save endpoint (`MILESTONE-022` task 11).
 *
 * `src/lib/playground/pieces.json` holds every caption, description and tag in
 * the archive, and `/archive/edit` is a form over it. This is the four lines
 * that let the form write the file back.
 *
 * **`apply: "serve"`, and that is the security model.** There is no server in
 * production — the site is a static build on GitHub Pages — so this middleware
 * exists only while `npm run dev` is running on the owner's own machine, where
 * writing a file in the repository is the same privilege the editor already
 * has. It is deliberately not a general file writer: one path, one shape, and
 * the payload has to be an object of objects or it is refused.
 *
 * The write triggers Vite's own HMR for the JSON module, so the archive in the
 * next tab updates without a reload.
 */
function archiveContent(): Plugin {
  const file = path.resolve(__dirname, "src/lib/playground/pieces.json");
  return {
    name: "archive-content",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/__archive-content", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", () => {
          res.setHeader("content-type", "application/json");
          try {
            const data: unknown = JSON.parse(body);
            if (!data || typeof data !== "object" || Array.isArray(data)) {
              throw new Error("expected an object keyed by image path");
            }
            const entries = Object.entries(data as Record<string, unknown>);
            if (!entries.length) throw new Error("refusing to write an empty file");
            for (const [key, value] of entries) {
              if (!key.startsWith("/images/")) throw new Error(`not an image path: ${key}`);
              if (!value || typeof value !== "object") throw new Error(`not a piece: ${key}`);
            }
            writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
            res.end(JSON.stringify({ ok: true, pieces: entries.length }));
          } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: String(error) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), archiveContent()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
