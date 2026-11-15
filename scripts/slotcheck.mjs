// slotcheck.mjs: zoekt op elke pagina (NL/FR/EN, 1440 + 390) plekken waar een beeld hoort maar er geen staat:
//  - een embleem (de vier blokjes) in een vak van 56 px of groter (logo's in header/footer zijn kleiner),
//  - initialen (twee hoofdletters) als vervanging van een beeld,
//  - een zichtbaar <img> dat niet geladen is,
//  - een effen vlak van minstens 90 x 90 px zonder tekst, beeld, svg of achtergrondbeeld.
// Gebruik: node scripts/slotcheck.mjs [poort=4101]   env W=1440,390  JSON=pad (schrijft de lijst als JSON)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = +(process.argv[2] || 4101), BASE = `http://localhost:${PORT}`;
const urls = [...fs.readFileSync(path.join(ROOT, 'dist-live', 'sitemap.xml'), 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]).concat(['/bedankt/', '/bestaat-niet/']);
const browser = await chromium.launch({ channel: 'chrome' });
const found = [];
for (const width of (process.env.W || '1440,390').split(',').map(Number)) {
  const ctx = await browser.newContext({ viewport: { width, height: width > 500 ? 900 : 844 }, isMobile: width < 500, hasTouch: width < 500 });
  await ctx.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
  const queue = [...urls];
  await Promise.all(Array.from({ length: 4 }, async () => {
    const page = await ctx.newPage(); page.setDefaultTimeout(20000);
    while (queue.length) {
      const u = queue.shift();
      try {
        await page.goto(BASE + u, { waitUntil: 'load', timeout: 30000 });
        // alle verborgen slider-panelen even tonen, zodat ook de andere slides gecontroleerd worden
        await page.evaluate(() => document.querySelectorAll('[data-sel-panel][hidden]').forEach(e => e.setAttribute('data-was-hidden', '') || e.removeAttribute('hidden')));
        await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); } });
        const r = await page.evaluate(async () => {
          document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
          await Promise.all([...document.images].map(i => i.complete && i.naturalWidth ? 0 : new Promise(res => { i.addEventListener('load', res); i.addEventListener('error', res); setTimeout(res, 8000); })));
          const out = [];
          const vis = e => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !e.closest('[hidden],[aria-hidden="true"][style*="display: none"]'); };
          const where = e => { const sec = e.closest('section,header,footer,[id]'); const h = sec && sec.querySelector('h1,h2'); return (h ? h.textContent.trim().slice(0, 50) : (sec && sec.id) || '?'); };
          for (const r of document.querySelectorAll('svg rect[fill="#FB4D27"]')) {
            const svg = r.closest('svg'); const box = svg.parentElement; if (!vis(svg)) continue;
            const b = box.getBoundingClientRect();
            if (b.width >= 56 && b.height >= 56 && !box.closest('header,footer')) out.push({ k: 'embleem', w: Math.round(b.width), h: Math.round(b.height), at: where(box) });
          }
          for (const e of document.querySelectorAll('span,div,p')) {
            if (e.children.length || !/^[A-Z]{2}$/.test(e.textContent.trim()) || !vis(e)) continue;
            if (parseFloat(getComputedStyle(e).fontSize) >= 22) out.push({ k: 'initialen', t: e.textContent.trim(), at: where(e) });
          }
          for (const i of document.images) if (vis(i) && !(i.complete && i.naturalWidth > 0)) out.push({ k: 'niet-geladen', t: i.currentSrc || i.src, at: where(i) });
          for (const e of document.querySelectorAll('div,span,a,figure')) {
            const b = e.getBoundingClientRect(); if (b.width < 90 || b.height < 90 || b.width > 900 || !vis(e)) continue;
            const s = getComputedStyle(e); const bg = s.backgroundColor;
            if (!bg || bg === 'rgba(0, 0, 0, 0)' || s.backgroundImage !== 'none') continue;
            if (e.textContent.trim() || e.querySelector('img,svg,picture,video,canvas,iframe,input,textarea,button')) continue;
            if (/absolute|fixed/.test(s.position) && parseFloat(s.opacity) < 0.5) continue;
            out.push({ k: 'leeg-vlak', w: Math.round(b.width), h: Math.round(b.height), t: bg, at: where(e) });
          }
          return out;
        });
        for (const x of r) found.push({ width, u, ...x });
      } catch (e) { found.push({ width, u, k: 'fout', t: String(e.message).split('\n')[0] }); }
    }
    await page.close();
  }));
  await ctx.close();
}
await browser.close();
if (process.env.JSON) fs.writeFileSync(process.env.JSON, JSON.stringify(found, null, 1));
const groups = new Map();
for (const f of found) { const key = `${f.k} | ${f.at}`; const g = groups.get(key) || { n: 0, pages: new Set(), ex: f }; g.n++; g.pages.add(f.u); groups.set(key, g); }
for (const [k, g] of [...groups].sort((a, b) => b[1].n - a[1].n)) console.log(`${String(g.n).padStart(4)} x  ${k}  (${g.pages.size} pagina's, bv. ${[...g.pages][0]}${g.ex.w ? `, ${g.ex.w}x${g.ex.h}` : ''}${g.ex.t ? `, ${g.ex.t}` : ''})`);
console.log(found.length ? `${found.length} lege beeldvakken gevonden op ${urls.length} pagina's` : `0 lege beeldvakken op ${urls.length} pagina's`);
process.exit(found.length ? 1 : 0);
