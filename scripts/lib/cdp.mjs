export async function connect(port = 9333) {
  const res = await fetch(`http://127.0.0.1:${port}/json/list`);
  const targets = await res.json();
  const page = targets.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pending = new Map();
  ws.onmessage = (m) => { const msg = JSON.parse(m.data); if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); } };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const myId = ++id;
    pending.set(myId, (msg) => (msg.error ? reject(new Error(method + ": " + JSON.stringify(msg.error))) : resolve(msg.result)));
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  return { send, close: () => ws.close() };
}
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export async function evaluate(cdp, expression) {
  const r = await cdp.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception?.description ?? r.exceptionDetails));
  return r.result.value;
}
export async function coldGoto(cdp, url, settle = 1600) {
  await cdp.send("Page.navigate", { url: "about:blank" }); await sleep(150);
  await cdp.send("Page.navigate", { url }); await sleep(settle);
}
export async function setViewport(cdp, width, height, mobile = false) {
  await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
}
export async function setReducedMotion(cdp, on) {
  await cdp.send("Emulation.setEmulatedMedia", { features: on ? [{ name: "prefers-reduced-motion", value: "reduce" }] : [] });
}
/** Scroll without the smooth-behaviour animation that has produced two false alarms. */
export async function scrollTo(cdp, y) {
  await evaluate(cdp, `window.scrollTo({ top: ${y}, behavior: "instant" })`);
  await sleep(250);
}
export const OVERFLOW = `(document.documentElement.scrollWidth - document.documentElement.clientWidth)`;
