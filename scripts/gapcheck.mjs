// gapcheck.mjs: zoekt op elke pagina (sitemap + 404 + bedankt) naar gaten in rasters en lege kolommen.
// - raster (CSS grid met 2+ kolommen): een rij die niet over de volle breedte gevuld is (lege plek)
// - 12-kolommen-indeling: een kolom die (bijna) leeg is terwijl de andere kolom hoog is
// Gebruik: node scripts/gapcheck.mjs [poort=5050] [breedte=1440]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = +(process.argv[2] || 5050), W = +(process.argv[3] || 1440), BASE = `http://localhost:${PORT}`;
const urls = [...fs.readFileSync(path.join(ROOT, 'dist-live', 'sitemap.xml'), 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]).concat(['/bedankt/', '/bestaat-niet/']);
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: W, height: 900 } });
await ctx.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
const page = await ctx.newPage(); page.setDefaultTimeout(20000);
const bad = [];
for (const u of urls) {
  try {
    await page.goto(BASE + u, { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg, .kw-load').forEach(e => e.classList.add('kw-in')));
    const r = await page.evaluate(() => {
      const out = [];
      const label = el => { const s = el.closest('section'); const h = s && s.querySelector('h1,h2,h3'); return (h ? h.textContent.trim().slice(0, 50) : '?'); };
      for (const g of document.querySelectorAll('main *')) {
        const cs = getComputedStyle(g); if (cs.display !== 'grid') continue;
        const cols = cs.gridTemplateColumns.split(' ').length; if (cols < 2) continue;
        if (g.closest('header,footer,[aria-hidden="true"],.kw-modal')) continue;
        const kids = [...g.children].filter(k => { const c = getComputedStyle(k); return c.position !== 'absolute' && c.display !== 'none' && k.getClientRects().length; });
        if (kids.length < 2) continue;
        const gr = g.getBoundingClientRect(); if (gr.width < 300) continue;
        // 12-kolommen-indeling: lege kolom?
        if (cols === 12 && kids.length === 2) {
          const [a, c] = kids.map(k => k.getBoundingClientRect());
          const fill = k => k.innerText.trim().length + k.querySelectorAll('img,svg,picture').length;
          kids.forEach((k, i) => { const o = i ? a : c; const me = i ? c : a; if (o.height > 160 && (fill(k) === 0 || me.height < 30)) out.push(`lege kolom naast "${label(g)}"`); });
          continue;
        }
        // rijen vullen de volle breedte?
        const rows = {};
        for (const k of kids) { const rr = k.getBoundingClientRect(); const key = Math.round(rr.top / 4); (rows[key] = rows[key] || []).push(rr); }
        const gap = parseFloat(cs.columnGap) || 0;
        for (const rr of Object.values(rows)) {
          const colW = (gr.width - gap * (cols - 1)) / cols; const slots = rr.reduce((s, x) => s + Math.max(1, Math.round((x.width + gap) / (colW + gap))), 0); const used = slots >= cols ? gr.width : slots * colW + gap * (slots - 1);
          // rijen waar een rij-overspannend item naast staat, tellen mee via de bovenste rij; alleen duidelijke gaten melden
          const covered = kids.some(k => { const x = k.getBoundingClientRect(); return x.top < rr[0].top - 4 && x.bottom > rr[0].top + 10; });
          if (!covered && used < gr.width - 60) out.push(`raster met lege plek (${Math.round(used)}/${Math.round(gr.width)} px, ${cols} kol.) in "${label(g)}"`);
        }
      }
      return [...new Set(out)];
    });
    r.forEach(x => bad.push(`${u}: ${x}`));
  } catch (e) { bad.push(`${u}: controle mislukt (${String(e.message).split('\n')[0]})`); }
}
await b.close();
console.log(`${urls.length} pagina's op ${W} px`);
console.log(bad.length ? bad.join('\n') : 'geen gaten of lege kolommen gevonden');
process.exit(bad.length ? 1 : 0);
