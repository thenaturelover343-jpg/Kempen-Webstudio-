// slotcheck.mjs: zoekt op elke pagina (NL/FR/EN, 1440 + 390) plekken waar een beeld hoort maar er geen staat:
//  - een embleem (de vier blokjes) in een vak van 56 px of groter (logo's in header/footer zijn kleiner),
//  - initialen (twee hoofdletters) als vervanging van een beeld,
//  - een zichtbaar <img> dat niet geladen is,
//  - een effen vlak van minstens 90 x 90 px zonder tekst, beeld, svg of achtergrondbeeld,
//  - een leeg kader: een vlak met achtergrond (min. 200 x 150) waarvan de beelden niet geladen zijn of minder dan 15% van het vlak vullen,
//  - pixelcontrole op de echte schermafbeelding (na het laden en decoderen van elk beeld): een effen, donker of gekleurd
//    vlak van minstens 400 x 240 px (bv. een zwart blok of een koperen kader zonder inhoud).
// env TEST_HIDE=1 verbergt alle beelden (om te bewijzen dat de controle lege vlakken vindt).
// Gebruik: node scripts/slotcheck.mjs [poort=4101]   env W=1440,390  JSON=pad (schrijft de lijst als JSON)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = +(process.argv[2] || 4101), BASE = `http://localhost:${PORT}`;
let urls = [...fs.readFileSync(path.join(ROOT, 'dist-live', 'sitemap.xml'), 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]).concat(['/bedankt/', '/bestaat-niet/']);
// effen vlakken in een schermafbeelding: tegels van 40 px die (bijna) één kleur hebben, niet licht (achtergrond/wit is normaal),
// samengevoegd per kleur; een groep van minstens 400 x 240 px die voor 75% gevuld is, telt als leeg vlak.
async function effenVlakken(png) {
  const S = 4, T = 10; // 4x verkleind, tegel = 10 px = 40 px echt
  const { data, info } = await sharp(png).resize({ width: Math.round((await sharp(png).metadata()).width / S) }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, cols = Math.floor(W / T), rows = Math.floor(H / T);
  const tile = new Array(cols * rows).fill(null);
  for (let ty = 0; ty < rows; ty++) for (let tx = 0; tx < cols; tx++) {
    let mn = [255, 255, 255], mx = [0, 0, 0], sum = [0, 0, 0];
    for (let y = ty * T; y < ty * T + T; y++) for (let x = tx * T; x < tx * T + T; x++) { const o = (y * W + x) * 3; for (let c = 0; c < 3; c++) { const v = data[o + c]; if (v < mn[c]) mn[c] = v; if (v > mx[c]) mx[c] = v; sum[c] += v; } }
    if (mx.some((v, c) => v - mn[c] > 6)) continue;
    const avg = sum.map(v => v / (T * T)); const lum = 0.2126 * avg[0] + 0.7152 * avg[1] + 0.0722 * avg[2];
    if (lum > 200) continue; // licht: pagina-achtergrond, wit, lichtgrijze panelen
    tile[ty * cols + tx] = avg;
  }
  const seen = new Uint8Array(cols * rows), out = [];
  for (let i = 0; i < tile.length; i++) {
    if (!tile[i] || seen[i]) continue;
    const col = tile[i]; const stack = [i]; seen[i] = 1; let n = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    while (stack.length) { const j = stack.pop(); n++; const x = j % cols, y = (j / cols) | 0; x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      for (const k of [j - 1, j + 1, j - cols, j + cols]) { if (k < 0 || k >= tile.length || seen[k] || !tile[k]) continue; if ((k === j - 1 && x === 0) || (k === j + 1 && x === cols - 1)) continue; if (tile[k].some((v, c) => Math.abs(v - col[c]) > 10)) continue; seen[k] = 1; stack.push(k); } }
    const w = (x1 - x0 + 1) * T * S, h = (y1 - y0 + 1) * T * S;
    if (w >= 400 && h >= 240 && n / ((x1 - x0 + 1) * (y1 - y0 + 1)) >= 0.75) out.push({ x: x0 * T * S, y: y0 * T * S, w, h, t: 'rgb(' + col.map(Math.round).join(',') + ')' });
  }
  return out;
}
if (process.env.ONLY) urls = process.env.ONLY.split(',').map(u => { const p = u.split('/').filter(Boolean).join('/'); return p && p !== 'home' ? '/' + p + '/' : '/'; });
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
        if (process.env.TEST_HIDE) await page.addStyleTag({ content: 'img{visibility:hidden!important}' });
        await page.evaluate(() => document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg').forEach(e => e.classList.add('kw-in')));
        // alle verborgen slider-panelen even tonen, zodat ook de andere slides gecontroleerd worden
        await page.evaluate(() => document.querySelectorAll('[data-sel-panel][hidden]').forEach(e => e.setAttribute('data-was-hidden', '') || e.removeAttribute('hidden')));
        await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); } });
        const r = await page.evaluate(async () => {
          document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
          await Promise.all([...document.images].map(i => i.complete && i.naturalWidth ? 0 : new Promise(res => { i.addEventListener('load', res); i.addEventListener('error', res); setTimeout(res, 8000); })));
          await Promise.all([...document.images].map(i => i.decode ? i.decode().catch(() => 0) : 0));
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
          // lege kaders: vlak met achtergrond waarin de beelden niet (genoeg) te zien zijn
          for (const e of document.querySelectorAll('div,figure,a')) {
            const b = e.getBoundingClientRect(); if (b.width < 200 || b.height < 150 || !vis(e)) continue;
            const s = getComputedStyle(e); if ((s.backgroundColor === 'rgba(0, 0, 0, 0)' || !s.backgroundColor) && s.backgroundImage === 'none') continue;
            const imgs = [...e.querySelectorAll('img')].filter(vis); if (!imgs.length || e.textContent.trim().length > 20) continue;
            const area = imgs.reduce((a, i) => { const q = i.getBoundingClientRect(); return a + (i.complete && i.naturalWidth > 0 && getComputedStyle(i).visibility !== 'hidden' ? Math.max(0, Math.min(q.right, b.right) - Math.max(q.left, b.left)) * Math.max(0, Math.min(q.bottom, b.bottom) - Math.max(q.top, b.top)) : 0); }, 0);
            if (area < 0.15 * b.width * b.height) out.push({ k: 'leeg-kader', w: Math.round(b.width), h: Math.round(b.height), at: where(e) });
          }
          return out;
        });
        // pixelcontrole op de echte schermafbeelding (slider-panelen weer verborgen, zoals een bezoeker ze ziet; lange pagina's in stukken)
        await page.evaluate(() => { document.querySelectorAll('[data-was-hidden]').forEach(e => e.setAttribute('hidden', '')); scrollTo(0, 0); });
        const H = await page.evaluate(() => document.documentElement.scrollHeight), STEP = 6000, regs = [];
        for (let y = 0; y < H; y += STEP) {
          const h = Math.min(STEP + 400, H - y); // overlap, zodat een vlak op de grens niet verdwijnt
          const png = await page.screenshot({ type: 'png', fullPage: true, clip: { x: 0, y, width, height: h } });
          for (const v of await effenVlakken(png)) if (!regs.some(r => Math.abs(r.y - (v.y + y)) < 80 && Math.abs(r.x - v.x) < 80)) regs.push({ ...v, y: v.y + y });
        }
        // per vlak kijken wat er staat: een kaart of paneel met tekst en zonder beeld is gewoon witruimte, geen leeg beeldvak
        const echte = await page.evaluate(async regs => {
          const out = [];
          for (const r of regs) {
            const top = Math.max(0, Math.min(r.y + r.h / 2 - innerHeight / 2, document.documentElement.scrollHeight - innerHeight));
            document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo({ top, behavior: 'instant' });
            for (let k = 0; k < 20 && Math.abs(scrollY - top) > 2; k++) await new Promise(z => setTimeout(z, 50));
            let c = document.elementFromPoint(r.x + r.w / 2, r.y + r.h / 2 - scrollY);
            while (c && c.parentElement && c.parentElement !== document.body) { const q = c.getBoundingClientRect(); if (q.width >= r.w * 0.9 && q.height >= r.h * 0.9) break; c = c.parentElement; }
            const txt = c ? (c.innerText || '').trim().length : 0, media = c && c.querySelector('img,picture,video,iframe,canvas');
            if (!(txt > 30 && !media)) out.push({ ...r, el: c ? c.tagName + '.' + String(c.className).slice(0, 40) : '?' });
          }
          return out;
        }, regs);
        for (const v of echte) found.push({ width, u, k: 'effen-vlak', w: v.w, h: v.h, t: v.t + ' ' + v.el, at: 'y=' + v.y });
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
