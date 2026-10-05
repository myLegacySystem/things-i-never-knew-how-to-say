// Renders the front and back covers with headless Chromium.
// Size: 5.5 x 8.5 in trim + 0.125 in bleed on every side, at 300 DPI (1725 x 2625 px).
// Usage: node covers.js <fonts_dir> <out_dir> [author name]
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const [, , fontsDir, outDir, authorArg] = process.argv;
const AUTHOR = (authorArg || "").trim();
const W = 1725, H = 2625, BLEED = 38; // 0.125in at 300dpi ≈ 38px

// ---------- deterministic randomness ----------
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// ---------- shared pieces ----------
const fontFace = (family, file, weight, style) => `@font-face{font-family:'${family}';src:url('file://${path.resolve(fontsDir, file)}') format('truetype');font-weight:${weight};font-style:${style};}`;
const FONTS = [
  fontFace("Cormorant Garamond", "CormorantGaramond-300.ttf", 300, "normal"),
  fontFace("Cormorant Garamond", "CormorantGaramond-400.ttf", 400, "normal"),
  fontFace("Cormorant Garamond", "CormorantGaramond-300i.ttf", 300, "italic"),
  fontFace("Cormorant Garamond", "CormorantGaramond-400i.ttf", 400, "italic"),
  fontFace("EB Garamond", "EBGaramond-400.ttf", 400, "normal"),
  fontFace("EB Garamond", "EBGaramond-400i.ttf", 400, "italic"),
].join("\n");

const C = {
  skyTop: "#4a5662", skyMid: "#3a4550", skyBottom: "#2a3139",
  ink: "#ede6da", inkSoft: "rgba(237,230,218,0.78)", inkFaint: "rgba(237,230,218,0.5)",
};

// Faint rain on glass: thin slanted streaks, a few longer runs.
function rain(seed, count) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = r() * (W + 200) - 100, y = r() * H;
    const len = 30 + Math.pow(r(), 2.2) * 260;
    const ang = (8 + r() * 3) * Math.PI / 180;
    const x2 = x + Math.sin(ang) * len, y2 = y + Math.cos(ang) * len;
    const op = 0.035 + r() * 0.075, sw = 1 + r() * 1.6;
    out += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#d6dee6" stroke-opacity="${op.toFixed(3)}" stroke-width="${sw.toFixed(2)}" stroke-linecap="round"/>`;
  }
  return out;
}

// Plumeria: five long, overlapping petals in a spiral (each one's left edge over the next one's
// right side), yellow at the heart fading to cream, a faint crease down each petal.
function plumeria(id, R) {
  const n = (v) => (v * R).toFixed(1);
  const petal = `M0,0 C${n(-0.17)},${n(-0.17)} ${n(-0.45)},${n(-0.47)} ${n(-0.39)},${n(-0.80)}
    C${n(-0.34)},${n(-1.03)} ${n(-0.04)},${n(-1.10)} ${n(0.16)},${n(-1.04)}
    C${n(0.42)},${n(-0.96)} ${n(0.53)},${n(-0.68)} ${n(0.41)},${n(-0.45)}
    C${n(0.29)},${n(-0.25)} ${n(0.12)},${n(-0.09)} 0,0 Z`;
  const crease = `M${n(0.01)},${n(-0.12)} C${n(0.0)},${n(-0.4)} ${n(0.03)},${n(-0.66)} ${n(0.09)},${n(-0.88)}`;
  const place = (i) => `rotate(${i * 72}) translate(${n(0.06)},0) rotate(18)`;
  const one = (i) => `<g transform="${place(i)}"><g filter="url(#${id}-sep)">
      <path d="${petal}" fill="url(#${id}-petal)"/>
      <path d="${petal}" fill="url(#${id}-shade)"/>
      <path d="${crease}" fill="none" stroke="#b9ad98" stroke-opacity="0.2" stroke-width="${(R * 0.007).toFixed(2)}" stroke-linecap="round"/>
    </g></g>`;
  let petals = "";
  for (let i = 0; i < 5; i++) petals += one(i);
  // close the spiral: the first petal's left half goes back on top of the last petal
  const tuck = `<g transform="${place(0)}"><g clip-path="url(#${id}-left)"><g filter="url(#${id}-sep)">
      <path d="${petal}" fill="url(#${id}-petal)"/>
      <path d="${petal}" fill="url(#${id}-shade)"/>
      <path d="${crease}" fill="none" stroke="#b9ad98" stroke-opacity="0.2" stroke-width="${(R * 0.007).toFixed(2)}" stroke-linecap="round"/>
    </g></g></g>`;
  const defs = `
    <radialGradient id="${id}-petal" cx="0" cy="0" r="${R * 1.05}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#e3a935"/>
      <stop offset="0.10" stop-color="#eebd4f"/>
      <stop offset="0.22" stop-color="#f5d98c"/>
      <stop offset="0.36" stop-color="#faf0d4"/>
      <stop offset="0.52" stop-color="#fcf8ef"/>
      <stop offset="0.86" stop-color="#f8f3ea"/>
      <stop offset="1" stop-color="#ebe3d4"/>
    </radialGradient>
    <linearGradient id="${id}-shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="0.55" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#5d574c" stop-opacity="0.18"/>
    </linearGradient>
    <clipPath id="${id}-left"><rect x="${n(-1.2)}" y="${n(-1.3)}" width="${n(1.16)}" height="${n(1.3)}"/></clipPath>
    <filter id="${id}-sep" x="-40%" y="-30%" width="180%" height="160%">
      <feDropShadow dx="${n(-0.025)}" dy="${n(0.01)}" stdDeviation="${n(0.022)}" flood-color="#4a4438" flood-opacity="0.14"/>
    </filter>
    <filter id="${id}-shadow" x="-60%" y="-60%" width="220%" height="220%">
      <feDropShadow dx="0" dy="${n(0.07)}" stdDeviation="${n(0.11)}" flood-color="#0b0f13" flood-opacity="0.32"/>
    </filter>`;
  const body = `<g filter="url(#${id}-shadow)"><circle r="${n(0.24)}" fill="url(#${id}-petal)"/>${petals}${tuck}</g>`;
  return { defs, body };
}

const background = (seed) => `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.skyTop}"/><stop offset="0.55" stop-color="${C.skyMid}"/><stop offset="1" stop-color="${C.skyBottom}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.32" r="0.75">
      <stop offset="0" stop-color="#7f8b96" stop-opacity="0.22"/><stop offset="1" stop-color="#7f8b96" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.09 0"/>
    </filter>
    <filter id="soft"><feGaussianBlur stdDeviation="0.6"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g filter="url(#soft)">${rain(seed, 230)}</g>
  <rect width="${W}" height="${H}" filter="url(#grain)"/>`;

function page(svgInner, overlayHtml) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  ${FONTS}
  html,body{margin:0;padding:0;background:#2a3139;}
  .wrap{position:relative;width:${W}px;height:${H}px;overflow:hidden;}
  svg{position:absolute;inset:0;}
  .ov{position:absolute;inset:0;color:${C.ink};}
  </style></head><body><div class="wrap">
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${svgInner}</svg>
  <div class="ov">${overlayHtml}</div></div></body></html>`;
}

// ---------- front ----------
function front() {
  const f = plumeria("pf", 215);
  const svg = `${background(7)}<defs>${f.defs}</defs>
    <g transform="translate(${W * 0.6},${H * 0.67}) rotate(-28) scale(1,0.84) rotate(12)">${f.body}</g>`;
  const author = AUTHOR
    ? `<div style="position:absolute;left:0;right:0;bottom:${BLEED + 210}px;text-align:center;font-family:'EB Garamond';font-size:46px;letter-spacing:0.28em;text-transform:uppercase;color:${C.inkSoft};">${AUTHOR}</div>`
    : "";
  const overlay = `
    <div style="position:absolute;left:0;right:0;top:${BLEED + 470}px;text-align:center;font-family:'Cormorant Garamond';font-weight:300;font-size:150px;line-height:1.08;letter-spacing:0.005em;color:${C.ink};">
      Things I Never<br>Knew How to Say
    </div>
    <div style="position:absolute;left:50%;top:${BLEED + 870}px;width:120px;margin-left:-60px;border-top:2px solid ${C.inkFaint};"></div>
    ${author}`;
  return page(svg, overlay);
}

// ---------- back ----------
function back() {
  const f = plumeria("pb", 74);
  const svg = `${background(11)}<defs>${f.defs}</defs>
    <g transform="translate(${W * 0.5},${H - BLEED - 340}) rotate(40) scale(1,0.86)">${f.body}</g>`;
  const p = (t, extra = "") => `<p style="margin:0 0 34px 0;${extra}">${t}</p>`;
  const overlay = `
    <div style="position:absolute;left:${BLEED + 225}px;right:${BLEED + 225}px;top:${BLEED + 300}px;text-align:center;font-family:'Cormorant Garamond';font-style:italic;font-weight:400;font-size:66px;line-height:1.32;color:${C.ink};">
      And if that day never comes…<br>I hope the flower still blooms.<br>Even if it isn’t in my garden.
    </div>
    <div style="position:absolute;left:50%;top:${BLEED + 700}px;width:120px;margin-left:-60px;border-top:2px solid ${C.inkFaint};"></div>
    <div style="position:absolute;left:${BLEED + 250}px;right:${BLEED + 250}px;top:${BLEED + 830}px;font-family:'EB Garamond';font-size:45px;line-height:1.55;color:${C.inkSoft};text-align:left;">
      ${p("Most of this was written at a desk by a window, in the middle of an ordinary working day.")}
      ${p("By someone who replies within milliseconds and then waits. Who checks the phone each morning before even putting on glasses. Who reached the station fifteen minutes early. Who still has one picture from a trip saved in a Drive folder.")}
      ${p("It is about a girl, and a plumeria, and the rain. About overthinking every message. About family, responsibility, and wanting to be good to the people closest to you. About loving someone enough to let them bloom.")}
      ${p("It is not a story with an ending.", "margin-bottom:0;")}
      ${p("It is the things he never knew how to say.", `color:${C.ink};`)}
    </div>`;
  return page(svg, overlay);
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  for (const [name, html] of [["front", front()], ["back", back()]]) {
    const htmlPath = path.join(outDir, `${name}.html`);
    fs.writeFileSync(htmlPath, html);
    await pg.goto("file://" + htmlPath);
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(300);
    await pg.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: false });
    console.log(`rendered ${name}.png`);
  }
  await browser.close();
})();
