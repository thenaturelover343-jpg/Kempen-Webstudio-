// compare-sections.mjs: originele design (8cc9567) en de site sectie per sectie naast elkaar (links design, rechts site).
// Gebruik: node scripts/compare-sections.mjs [design-url] [site-url]   -> .cache/cmp/<breedte>-<nr>.jpg + .cache/cmp/info.json
// Secties = de directe <section>/<footer>-blokken in volgorde (header en vaste elementen apart als 00).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [DESIGN = 'http://localhost:3001/', SITE = 'http://localhost:4100/'] = process.argv.slice(2);
const OUT = path.join(ROOT, '.cache', 'cmp'); fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT, { recursive: true });
const WIDTHS = (process.env.W || '1440,390').split(',').map(Number);

async function grab(b, url, w) {
  const p = await b.newPage({ viewport: { width: w, height: w > 500 ? 900 : 844 }, deviceScaleFactor: 1, isMobile: w < 500, hasTouch: w < 500 });
  await p.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) { } });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 }); await p.waitForTimeout(1500);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 350) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(90); }
  await p.evaluate(() => { scrollTo(0, 0); document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg').forEach(e => e.classList.add('kw-in')); });
  await p.waitForTimeout(1500); await p.mouse.move(-10, -10);
  // vaste elementen (header, zwevende knoppen, voortgangsbalk) tijdelijk statisch/verborgen, zodat ze niet over secties liggen
  const secs = await p.evaluate(() => {
    const list = [...document.querySelectorAll('main section, body > div section, footer')].filter(s => !s.parentElement.closest('section') && s.getBoundingClientRect().height > 40);
    return list.map(s => { const r = s.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), h: Math.round(r.height), id: s.id || '', label: (s.querySelector('h1,h2,h3') || {}).textContent?.trim().slice(0, 60) || s.tagName }; });
  });
  const buf = await p.screenshot({ fullPage: true }); await p.close();
  return { buf, secs };
}
const b = await chromium.launch({ channel: 'chrome' });
const info = {};
for (const w of WIDTHS) {
  const [D, S] = [await grab(b, DESIGN, w), await grab(b, SITE, w)];
  info[w] = { design: D.secs, site: S.secs };
  const n = Math.max(D.secs.length, S.secs.length);
  for (let i = 0; i < n; i++) {
    const crop = async (X, s) => {
      if (!s) return sharp({ create: { width: w, height: 60, channels: 3, background: '#eeeeee' } }).png().toBuffer();
      const meta = await sharp(X.buf).metadata(); const h = Math.min(s.h, meta.height - s.top, 2400);
      return sharp(X.buf).extract({ left: 0, top: s.top, width: w, height: Math.max(1, h) }).png().toBuffer();
    };
    const [a, c] = [await crop(D, D.secs[i]), await crop(S, S.secs[i])];
    const [ma, mc] = [await sharp(a).metadata(), await sharp(c).metadata()];
    const scale = w > 500 ? 0.55 : 1, gap = 20;
    const A = await sharp(a).resize({ width: Math.round(w * scale) }).toBuffer(), C = await sharp(c).resize({ width: Math.round(w * scale) }).toBuffer();
    const ha = Math.round(ma.height * scale), hc = Math.round(mc.height * scale), Wd = Math.round(w * scale);
    await sharp({ create: { width: Wd * 2 + gap, height: Math.max(ha, hc), channels: 3, background: '#ff00ff' } })
      .composite([{ input: A, left: 0, top: 0 }, { input: C, left: Wd + gap, top: 0 }]).jpeg({ quality: 78 })
      .toFile(path.join(OUT, `${w}-${String(i + 1).padStart(2, '0')}.jpg`));
  }
}
fs.writeFileSync(path.join(OUT, 'info.json'), JSON.stringify(info, null, 1));
await b.close();
for (const w of WIDTHS) { console.log(`== ${w}`); const { design, site } = info[w]; for (let i = 0; i < Math.max(design.length, site.length); i++) console.log(String(i + 1).padStart(2), (design[i] ? `${design[i].h}px ${design[i].label}` : '-').padEnd(52), '|', site[i] ? `${site[i].h}px ${site[i].label}` : '-'); }
