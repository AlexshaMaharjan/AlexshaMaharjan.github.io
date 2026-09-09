/**
 * Grab a still from a video, for use as its poster.
 *
 *   node scripts/video-frame.mjs <video> <out.png> [--at 4.0] [--port 9333]
 *
 * There is no encoder on this machine — no ffmpeg, and `avconvert`'s presets
 * target quality rather than size, so they are as likely to *grow* a file as
 * shrink it (measured: 12 MB → 31 MB on the kitchen animation). But a poster
 * frame needs no encoder: Chrome already decodes the video, so seek it and draw
 * one frame to a canvas.
 *
 * The poster is what makes video affordable here. `ui/Video` loads the film
 * only when someone asks for it (`preload="none"`), so a page carrying a 12 MB
 * animation costs the poster — about 50 KB — until it is played.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { connect, evaluate, sleep } from "./lib/cdp.mjs";

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error("usage: node scripts/video-frame.mjs <video> <out.png> [--at seconds]");
  process.exit(1);
}
const atFlag = process.argv.indexOf("--at");
const at = atFlag > -1 ? Number(process.argv[atFlag + 1]) : 2;
const portFlag = process.argv.indexOf("--port");
const port = portFlag > -1 ? +process.argv[portFlag + 1] : 9333;

const cdp = await connect(port);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await cdp.send("Page.navigate", { url: "about:blank" });
await sleep(300);

const b64 = readFileSync(src).toString("base64");
const result = await evaluate(
  cdp,
  `(async () => {
     const v = document.createElement("video");
     v.muted = true; v.playsInline = true;
     v.src = "data:video/mp4;base64,${b64}";
     await new Promise((res, rej) => {
       v.onloadeddata = res; v.onerror = () => rej(new Error("cannot decode"));
     });
     // Seeking is asynchronous and separate from loading — drawing before
     // 'seeked' fires gives you frame zero, whatever you asked for.
     v.currentTime = Math.min(${at}, (v.duration || 1) - 0.1);
     await new Promise((res) => (v.onseeked = res));
     const c = document.createElement("canvas");
     c.width = v.videoWidth; c.height = v.videoHeight;
     c.getContext("2d").drawImage(v, 0, 0);
     return JSON.stringify({ data: c.toDataURL("image/png"), w: v.videoWidth, h: v.videoHeight, dur: v.duration });
   })()`,
);
const { data, w, h, dur } = JSON.parse(result);
writeFileSync(out, Buffer.from(data.split(",")[1], "base64"));
console.log(`${out}  ${w}x${h}  from a ${dur.toFixed(1)}s video`);
cdp.close();
