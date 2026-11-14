// imgcheck.mjs: elke pagina (sitemap + 404 + bedankt) op 1440 en 390 px door-scrollen zoals een bezoeker.
// Controleert: (1) elke afbeelding is geladen (ook lazy), (2) op 390 px vallen de zwevende knoppen nooit over de hero.
// Gebruik: node scripts/imgcheck.mjs [poort=4101]  (serveert dist-live zelf als de poort vrij is)
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = +(process.argv[2] || 4101), BASE = `http://localhost:${PORT}`;
const urls = [...fs.readFileSync(path.join(ROOT, 'dist-live', 'sitemap.xml'), 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]).concat(['/bedankt/', '/bestaat-niet/']);
let server = null;
try { await fetch(BASE + '/'); } catch { server = spawn(process.execPath, [path.join(ROOT, 'scripts', 'serve.mjs'), path.join(ROOT, 'dist-live'), String(PORT)], { stdio: 'ignore' }); await new Promise(r => setTimeout(r, 800)); }
const browser = await chromium.launch({ channel: 'chrome' });
const bad = [];
let nImg = 0;
for (const width of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width, height: width > 500 ? 900 : 844 }, isMobile: width < 500, hasTouch: width < 500 });
  await ctx.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
  const page = await ctx.newPage();
  for (const u of urls) {
    await page.goto(BASE + u, { waitUntil: 'load' });
    if (width < 500) {
      // bovenaan: zwevende knoppen onzichtbaar zolang de hero in beeld is
      await page.waitForTimeout(150);
      const top = await page.evaluate(() => { const f = document.querySelector('[data-floating]'); return f ? getComputedStyle(f).visibility : 'none'; });
      if (top === 'visible') bad.push(`${width} ${u}: zwevende knoppen zichtbaar over de hero`);
    }
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 420) {
      await page.evaluate(v => scrollTo(0, v), y); await page.waitForTimeout(40);
      if (width < 500) {
        // zodra de knoppen zichtbaar zijn, mag geen enkel deel van de hero eronder liggen
        const o = await page.evaluate(() => {
          const f = document.querySelector('[data-floating]'), h = document.querySelector('[data-fl-hide]');
          if (!f || !h || getComputedStyle(f).visibility !== 'visible') return '';
          const a = f.getBoundingClientRect(), b = h.getBoundingClientRect();
          return a.top < b.bottom && a.bottom > b.top ? `hero tot ${Math.round(b.bottom)}, knoppen vanaf ${Math.round(a.top)}` : '';
        });
        if (o) { bad.push(`${width} ${u} (scroll ${y}): knoppen over hero, ${o}`); break; }
      }
    }
    const r = await page.evaluate(async () => {
      await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(res => { i.onload = i.onerror = res; setTimeout(res, 4000); })));
      return [...document.images].map(i => ({ s: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0, vis: i.getClientRects().length > 0 }));
    });
    nImg += r.length;
    r.filter(i => !i.ok && i.vis).forEach(i => bad.push(`${width} ${u}: afbeelding niet geladen: ${i.s}`));
  }
  await ctx.close();
}
await browser.close();
if (server) server.kill();
console.log(`${urls.length} pagina's x 2 breedtes, ${nImg} afbeeldingen gecontroleerd`);
console.log(bad.length ? bad.join('\n') : 'geen problemen: alle afbeeldingen geladen, zwevende knoppen nooit over de hero');
process.exit(bad.length ? 1 : 0);
