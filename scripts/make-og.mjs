// make-og.mjs: maakt src/img/og-v3.jpg (1200x630, deelbeeld voor sociale media) in het nieuwe design, met Chrome.
// Eenmalig of na een designwijziging: node scripts/make-og.mjs  (daarna npm run build)
// Tekst: de merknaam en de bestaande titel van de startpagina (geen nieuwe tekst).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = pathToFileURL(path.join(ROOT, 'node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2')).href;
const img = pathToFileURL(path.join(ROOT, 'design-bron/hero-portret.jpg')).href;
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:D;src:url(${font}) format("woff2");font-weight:300 700}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;overflow:hidden;font-family:D;background:radial-gradient(ellipse 80% 70% at 60% 40%,#e9eaec 0%,#e2e3e6 50%,#d6d7da 100%);color:#18181b;position:relative}
.l{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600;letter-spacing:-.03em}
h1{position:absolute;left:72px;top:180px;width:640px;font-size:76px;font-weight:500;letter-spacing:-.045em;line-height:1}
h1 span{background:linear-gradient(90deg,#18181b,#5e2a11 55%,#b85d28);-webkit-background-clip:text;color:transparent}
.p{position:absolute;right:40px;top:-40px;width:420px;height:760px;background:url(${img}) 50% 6%/cover;-webkit-mask-image:linear-gradient(to bottom,#000 60%,transparent 95%),linear-gradient(to right,transparent,#000 25%,#000 75%,transparent);-webkit-mask-composite:source-in}
.w{position:absolute;left:0;right:0;bottom:-58px;text-align:center;font-size:214px;font-weight:600;letter-spacing:-.065em;line-height:1;background:linear-gradient(180deg,rgba(24,24,27,.9),rgba(94,42,17,.75));-webkit-background-clip:text;color:transparent}
.u{position:absolute;left:72px;top:500px;font-size:24px;color:#3f3f46}
</style><div class="p"></div><div class="l"><svg width="44" height="44" viewBox="0 0 28 28"><rect width="28" height="28" rx="8" fill="#141416"/><rect x="6.5" y="6.5" width="6.5" height="6.5" rx="2" fill="#FB4D27"/><rect x="15" y="6.5" width="6.5" height="6.5" rx="2" fill="#fff"/><rect x="6.5" y="15" width="6.5" height="6.5" rx="2" fill="#fff"/><rect x="15" y="15" width="6.5" height="6.5" rx="2" fill="#fff"/></svg>Kempen Webstudio</div>
<h1>Website laten maken, met eerst een <span>gratis demo</span></h1><div class="u">www.kempenwebstudio.be</div>`;
const tmp = path.join(ROOT, '.cache', 'og.html'); fs.mkdirSync(path.dirname(tmp), { recursive: true }); fs.writeFileSync(tmp, html);
const b = await chromium.launch({ channel: 'chrome' }); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto(pathToFileURL(tmp).href); await p.waitForTimeout(500);
fs.mkdirSync(path.join(ROOT, 'src', 'img'), { recursive: true });
await p.screenshot({ path: path.join(ROOT, 'src', 'img', 'og-v3.jpg'), type: 'jpeg', quality: 86 });
await b.close(); console.log('src/img/og-v3.jpg');
