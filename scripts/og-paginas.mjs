// og-paginas.mjs: een eigen deelbeeld (1200x630) per pagina, in het design van src/img/og-v4.jpg, met de H1 van de pagina.
// Resultaat: src/img/og/<sleutel>.jpg (sleutel = hash van taal + H1); bestaande bestanden worden overgeslagen.
// De build gebruikt het beeld als het bestaat, anders og-v4.jpg. Gebruik: node scripts/og-paginas.mjs (vóór npm run build)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseHTML } from 'linkedom';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'img', 'og'); fs.mkdirSync(OUT, { recursive: true });
const DEMO = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'live-config.json'), 'utf8')).demoFolders);
export const ogKey = (lang, h1) => crypto.createHash('sha1').update(lang + '|' + h1).digest('hex').slice(0, 12);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const font = pathToFileURL(path.join(ROOT, 'src/fonts/bron/Switzer-Variable.woff2')).href;
const img = pathToFileURL(path.join(ROOT, 'design-bron/hero-portret.jpg')).href;
const html = (h1, lang) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:D;src:url(${font}) format("woff2");font-weight:100 900}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;overflow:hidden;font-family:D;background:radial-gradient(ellipse 80% 70% at 60% 40%,#e9eaec 0%,#e2e3e6 50%,#d6d7da 100%);color:#18181b;position:relative}
.l{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600;letter-spacing:-.03em}
h1{position:absolute;left:72px;top:160px;width:700px;font-size:${h1.length > 60 ? 50 : h1.length > 38 ? 60 : 72}px;font-weight:500;letter-spacing:-.04em;line-height:1.04;padding-bottom:.16em;background:linear-gradient(90deg,#18181b 40%,#5e2a11 80%,#b85d28);-webkit-background-clip:text;color:transparent}
.p{position:absolute;right:20px;top:-40px;width:400px;height:760px;background:url(${img}) 50% 6%/cover;-webkit-mask-image:linear-gradient(to bottom,#000 60%,transparent 95%),linear-gradient(to right,transparent,#000 25%,#000 75%,transparent);-webkit-mask-composite:source-in;opacity:.95}
.w{position:absolute;left:0;right:0;bottom:-58px;text-align:center;font-size:214px;font-weight:600;letter-spacing:-.065em;line-height:1;background:linear-gradient(180deg,rgba(24,24,27,.9),rgba(94,42,17,.75));-webkit-background-clip:text;color:transparent}
.u{position:absolute;left:72px;top:520px;font-size:24px;color:#3f3f46}
</style><div class="p"></div><div class="l"><svg width="44" height="44" viewBox="0 0 28 28"><rect width="28" height="28" rx="8" fill="#141416"/><rect x="6.5" y="6.5" width="6.5" height="6.5" rx="2" fill="#FB4D27"/><rect x="15" y="6.5" width="6.5" height="6.5" rx="2" fill="#fff"/><rect x="6.5" y="15" width="6.5" height="6.5" rx="2" fill="#fff"/><rect x="15" y="15" width="6.5" height="6.5" rx="2" fill="#fff"/></svg>Kempen Webstudio</div>
<h1>${esc(h1)}</h1><div class="u">www.kempenwebstudio.be</div>`;

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const todo = new Map();
  (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) { if (d === path.join(ROOT, 'content') && (DEMO.has(e.name) || ['assets', 'icons'].includes(e.name))) continue; walk(f); } else if (e.name.endsWith('.html')) {
    const rel = path.relative(path.join(ROOT, 'content'), f).split(path.sep).join('/'); const lang = rel.startsWith('fr/') ? 'fr' : rel.startsWith('en/') ? 'en' : 'nl';
    const doc = parseHTML(fs.readFileSync(f, 'utf8')).document; const h = doc.querySelector('main h1'); if (!h) continue;
    const h1 = h.textContent.replace(/\s+/g, ' ').replace(/­/g, '').trim(); const k = ogKey(lang, h1);
    if (!fs.existsSync(path.join(OUT, k + '.jpg'))) todo.set(k, { h1, lang });
  } } })(path.join(ROOT, 'content'));
  if (!todo.size) { console.log('alle deelbeelden bestaan al'); process.exit(0); }
  const b = await chromium.launch({ channel: 'chrome' }); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const tmp = path.join(ROOT, '.cache', 'og-pagina.html'); fs.mkdirSync(path.dirname(tmp), { recursive: true });
  for (const [k, { h1, lang }] of todo) {
    fs.writeFileSync(tmp, html(h1, lang)); await p.goto(pathToFileURL(tmp).href); await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(OUT, k + '.jpg'), type: 'jpeg', quality: 80 });
  }
  await b.close(); console.log(`${todo.size} deelbeelden gemaakt in src/img/og/`);
}
