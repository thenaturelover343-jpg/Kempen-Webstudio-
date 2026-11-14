// compare-design.mjs: legt het originele design (React-app uit commit 8cc9567) en de statische site naast elkaar,
// op 1440 en 390 px, als controle dat het design visueel gelijk is gebleven.
// Gebruik: node scripts/compare-design.mjs <design-url> <site-url>
//   bv. node scripts/compare-design.mjs http://localhost:3001 http://localhost:4100
// Het design draai je zo:  git worktree add .cache/design-app 8cc9567 && cd .cache/design-app && npm i --legacy-peer-deps && npx vite --port 3001
// Resultaat: _screens/vergelijking-<pagina>-<breedte>.jpg (links design, rechts site).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [DESIGN = 'http://localhost:3001', SITE = 'http://localhost:4100'] = process.argv.slice(2);
const OUT = path.join(ROOT, '_screens'); fs.mkdirSync(OUT, { recursive: true });
const PAIRS = [['home', DESIGN + '/', SITE + '/'], ['onderpagina', DESIGN + '/#services', SITE + '/webshop-laten-maken/']];

async function shot(b, url, w) {
  const p = await b.newPage({ viewport: { width: w, height: w > 500 ? 900 : 844 }, deviceScaleFactor: 1, isMobile: w < 500, hasTouch: w < 500 });
  await p.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) { } });
  await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 300) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(110); }
  await p.evaluate(() => { scrollTo(0, 0); document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg').forEach(e => e.classList.add('kw-in')); });
  await p.waitForTimeout(1400); await p.mouse.move(-10, -10);
  const buf = await p.screenshot({ fullPage: true }); await p.close(); return buf;
}
const b = await chromium.launch({ channel: 'chrome' });
for (const [name, a, c] of PAIRS) for (const w of [1440, 390]) {
  const [A, C] = [await shot(b, a, w), await shot(b, c, w)];
  const scale = w > 500 ? 0.5 : 1, gap = 24;
  const imgs = await Promise.all([A, C].map(async x => { const m = await sharp(x).metadata(); return { buf: await sharp(x).resize({ width: Math.round(m.width * scale) }).toBuffer(), w: Math.round(m.width * scale), h: Math.round(m.height * scale) }; }));
  const H = Math.max(...imgs.map(i => i.h)), Wt = imgs[0].w + imgs[1].w + gap;
  const file = path.join(OUT, `vergelijking-${name}-${w}.jpg`);
  await sharp({ create: { width: Wt, height: H, channels: 3, background: '#ffffff' } }).composite([{ input: imgs[0].buf, left: 0, top: 0 }, { input: imgs[1].buf, left: imgs[0].w + gap, top: 0 }]).jpeg({ quality: 72 }).toFile(file);
  console.log(file);
}
await b.close();
