/**
 * Cut a short, small, silent loop out of a large video — with no encoder
 * installed, by recording a canvas inside the Chrome this project already
 * drives (`DECISION-026`).
 *
 *   node scripts/video-clip.mjs <src> <out> [--from 4] [--seconds 8]
 *                              [--width 540] [--fps 24] [--kbps 900] [--port 9333]
 *                              [--audio] [--akbps 96]
 *
 * `DECISION-022` established that this machine has no way to make a video
 * smaller: `ffmpeg` is not installed and `avconvert` grew two of four test
 * files. That conclusion was right about *transcoding whole films* and wrong as
 * a general rule, because it never asked the question a gallery asks:
 *
 *   **a tile does not need the film. It needs eight seconds of it, 540px wide.**
 *
 * Chrome ships an encoder — `MediaRecorder`. Play the source, draw it to a
 * canvas at the size actually wanted, record `canvas.captureStream()`, and the
 * result is a few hundred kilobytes. The source is 720x1280 at 3.5 Mbps; a tile
 * renders at ~380px.
 *
 * Recording is real time: eight seconds of output takes eight seconds. That is
 * the whole cost, and it is paid once per clip at build time.
 *
 * **Audio is dropped unless `--audio` is passed**, and the default is the
 * important half of that: the card tier loops by itself on a page, and a page
 * that makes noise unasked is indefensible, so those files carry no audio track
 * to accidentally unmute.
 *
 * `--audio` exists for the **viewer tier** (`MILESTONE-022` task 7). The owner
 * asked for a sound control on the motorbike film, and a control needs
 * something to switch on: the track is carried in the file the *viewer* fetches
 * on open, never in the one the card autoplays. It is captured from the
 * element's own `captureStream()` and added to the canvas stream, so the video
 * is still the downscaled canvas and only the audio comes from the source.
 *
 * Two things it needs that the silent path does not, and both are why it is a
 * flag rather than the default:
 *
 * - **the element cannot be muted**, because a muted element captures silence.
 *   So the Chrome this drives has to be started with
 *   `--autoplay-policy=no-user-gesture-required`, or `play()` is refused and
 *   the recording is a still frame.
 * - **it is recorded at the source's own level.** Nothing here normalises or
 *   attenuates; the motorbike film is loud, and what makes it comfortable is
 *   `ARCHIVE_VOLUME` in `PieceViewer`, which is a number a reader can also
 *   override with the player's own control.
 *
 * The file is served over HTTP from this script rather than read as `file://`:
 * a canvas drawn from a cross-origin or file-scheme video is tainted, and
 * `captureStream` on a tainted canvas throws.
 *
 * **`--from 0` hangs. Use `--from 0.04`.** The recording waits on a `seeked`
 * event, and assigning `currentTime = 0` to a video already at zero is not a
 * seek, so the event never comes and the script waits for ever. Any value the
 * browser has to move to works; the first frames are identical anyway.
 *
 * **Pass the source's real length to `--seconds`, not more.** Recording is a
 * wall clock, and the canvas keeps being drawn after the video ends — ask for
 * longer than the film and the surplus is recorded as its frozen last frame.
 *
 * **What comes out is a fragmented MP4** — `moov` at the front, then `moof`
 * and `mdat` per fragment. It carries its duration and seeks correctly, but
 * only from a server that sends `video/mp4` and answers `Range`. Against one
 * that does neither, a 25-second film reports a duration of 4.77 and grows:
 * that is the server, not the file (SESSION-040, and `scripts/verify/serve.mjs`
 * does both now).
 */
import { createServer } from "node:http";
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { connect, evaluate, sleep } from "./lib/cdp.mjs";

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error("usage: node scripts/video-clip.mjs <src> <out> [--from s] [--seconds s] [--width px]");
  process.exit(1);
}
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : fallback;
};
const from = arg("from", 4);
const seconds = arg("seconds", 8);
const width = arg("width", 540);
const fps = arg("fps", 24);
const kbps = arg("kbps", 900);
const audio = process.argv.includes("--audio");
const akbps = arg("akbps", 96);
const port = arg("port", 9333);

const bytes = readFileSync(src);
/*
 * Range requests are not an optimisation here, they are the difference between
 * `--from 38` meaning 38 seconds and meaning zero. Chrome will only seek within
 * what it has buffered unless the server advertises `accept-ranges`, and it
 * does not buffer a whole 151 MB film to oblige: every seek past the start
 * silently snapped back to frame zero and recorded the opening titles instead
 * (SESSION-036, the motorbike animation). `currentTime` reads back as 0.02
 * when this happens, which is the thing to check if a clip comes out wrong.
 */
const server = createServer((req, res) => {
  if (req.url === "/clip.mp4") {
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? "");
    if (range) {
      const start = range[1] ? +range[1] : 0;
      const end = range[2] ? +range[2] : bytes.length - 1;
      res.writeHead(206, {
        "content-type": "video/mp4",
        "accept-ranges": "bytes",
        "content-range": `bytes ${start}-${end}/${bytes.length}`,
        "content-length": end - start + 1,
      });
      res.end(bytes.subarray(start, end + 1));
      return;
    }
    res.writeHead(200, { "content-type": "video/mp4", "accept-ranges": "bytes", "content-length": bytes.length });
    res.end(bytes);
  } else {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<!doctype html><meta charset=utf-8><title>clip</title>");
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

const cdp = await connect(port);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");
await cdp.send("Page.navigate", { url: origin });
await sleep(400);

/*
 * Prefer MP4/H.264. Chrome has been able to record it since 130 and every
 * browser plays it; WebM/VP9 is smaller but Safari's support for it is
 * inconsistent, and a clip that silently fails to play on an iPhone is worse
 * than a slightly larger one that plays everywhere. `ui/LoopVideo` falls back
 * to the poster either way, so this decides how often that fallback is all a
 * visitor gets.
 */
/*
 * **The audio path must not name a `codecs=` string at all**, and both halves
 * of that were measured on the same six seconds of the motorbike film:
 * `video/mp4;codecs=avc1.42E01E` — the silent path's first choice — accepts the
 * stream, reports no error and writes **32 KB** where 790 was expected, because
 * the type names a video codec and no audio one; adding `,mp4a.40.2` is
 * reported as supported and then records **nothing at all**. Bare `video/mp4`
 * lets Chrome pick both and produces the file. So the two paths ask different
 * questions, and the silent one keeps the list it always had.
 */
const codec = await evaluate(
  cdp,
  `${JSON.stringify(
    audio
      ? ["video/mp4", "video/webm;codecs=vp9,opus", "video/webm"]
      : ["video/mp4;codecs=avc1.42E01E", "video/mp4", "video/webm;codecs=vp9", "video/webm"],
  )}
     .find((t) => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) ?? ""`,
);
if (!codec) {
  console.error("this Chrome cannot record video (no MediaRecorder type supported)");
  process.exit(1);
}

const dataUrl = await evaluate(
  cdp,
  `(async () => {
    const v = document.createElement("video");
    v.src = "/clip.mp4"; v.muted = ${audio ? "false" : "true"}; v.volume = 1; v.playsInline = true;
    await new Promise((ok, no) => { v.onloadedmetadata = ok; v.onerror = () => no(new Error("load")); });

    const w = ${width}, h = Math.round(${width} * v.videoHeight / v.videoWidth / 2) * 2;
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const x = c.getContext("2d");
    x.imageSmoothingQuality = "high";

    v.currentTime = ${from};
    await new Promise((ok) => { v.onseeked = ok; });

    const stream = c.captureStream(${fps});
    /*
     * The picture is the canvas and the sound is the source. Adding the
     * element's own audio track to the canvas stream is what keeps those two
     * separable: the video is recorded at the width asked for, and the audio is
     * whatever the file carries.
     */
    let audioTrack = null;
    if (${audio}) {
      const from = v.captureStream ? v.captureStream() : v.mozCaptureStream?.();
      audioTrack = from?.getAudioTracks?.()[0] ?? null;
      if (!audioTrack) throw new Error("no audio track on the source");
      stream.addTrack(audioTrack);
    }
    const rec = new MediaRecorder(stream, {
      mimeType: ${JSON.stringify(codec)},
      videoBitsPerSecond: ${kbps * 1000},
      ...(${audio} ? { audioBitsPerSecond: ${akbps * 1000} } : {}),
    });
    const chunks = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };

    let stop = false;
    const draw = () => { if (stop) return; x.drawImage(v, 0, 0, w, h); requestAnimationFrame(draw); };

    await v.play();
    draw();
    rec.start();
    await new Promise((ok) => setTimeout(ok, ${seconds * 1000}));
    stop = true;
    v.pause();
    await new Promise((ok) => { rec.onstop = ok; rec.stop(); });

    const blob = new Blob(chunks, { type: ${JSON.stringify(codec)} });
    const fr = new FileReader();
    const url = await new Promise((ok) => { fr.onload = () => ok(fr.result); fr.readAsDataURL(blob); });
    return JSON.stringify({ url, w, h, duration: v.duration, audio: Boolean(audioTrack) });
  })()`,
);

const { url, w, h, audio: gotAudio } = JSON.parse(dataUrl);
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
server.close();

const kb = Math.round(statSync(out).size / 1024);
const wasKb = Math.round(statSync(src).size / 1024);
console.log(`${out}  ${w}x${h}  ${seconds}s  ${kb} KB   (from ${wasKb} KB, ${codec.split(";")[0]}${gotAudio ? ", with audio" : ""})`);
process.exit(0);
