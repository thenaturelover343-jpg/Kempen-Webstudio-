// scrollcheck.mjs: zoekt een tweede scrollbalk. Opent elke pagina in een echte (headed) Chrome en meldt elk zichtbaar element
// dat zelf scrollt (overflow auto/scroll en inhoud groter dan het vak), behalve het document zelf. Maakt ook een schermafbeelding
// van het venster met scrollbalken (headed). Gebruik: node scripts/scrollcheck.mjs [poort=4101] [uitmap]   env ONLY=pad,pad
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';
const PORT = +(process.argv[2] || 4101), OUT = process.argv[3];
let urls = [...fs.readFileSync('dist-live/sitemap.xml', 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]).concat(['/bedankt/', '/bestaat-niet/']);
if (process.env.ONLY) urls = process.env.ONLY.split(',').map(u => { const p = u.split('/').filter(Boolean).join('/'); return p && p !== 'home' ? '/' + p + '/' : '/'; });
const b = await chromium.launch({ channel: 'chrome', headless: false, args: ['--window-size=1440,900'] });
const ctx = await b.newContext({ viewport: null });
await ctx.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
const p = await ctx.newPage(); const bad = [];
for (const u of urls) {
  await p.goto(`http://localhost:${PORT}${u}`, { waitUntil: 'load', timeout: 30000 });
  await p.waitForTimeout(300);
  const r = await p.evaluate(() => {
    const out = [];
    for (const e of document.querySelectorAll('*')) {
      if (e === document.documentElement) continue;
      const s = getComputedStyle(e); if (!/(auto|scroll)/.test(s.overflowY) && !/(auto|scroll)/.test(s.overflow)) continue;
      if (e.scrollHeight <= e.clientHeight + 1) continue;
      const q = e.getBoundingClientRect(); if (q.width < 5 || q.height < 5 || s.visibility === 'hidden' || s.display === 'none') continue;
      if (q.right <= 0 || q.left >= innerWidth || q.bottom <= 0 || q.top >= innerHeight) continue;
      if (e.closest('[aria-hidden="true"], [hidden]')) continue;
      out.push(`${e.tagName.toLowerCase()}.${String(e.className).slice(0, 60)} ${Math.round(q.width)}x${Math.round(q.height)} scrollH=${e.scrollHeight}`);
    }
    return { out, doc: document.documentElement.scrollHeight > innerHeight, bodyOv: getComputedStyle(document.body).overflowY, htmlOv: getComputedStyle(document.documentElement).overflowY };
  });
  if (r.out.length) bad.push(`${u}: ${r.out.join(' | ')} (html ${r.htmlOv}, body ${r.bodyOv})`);
  if (OUT && urls.indexOf(u) === 0) await p.screenshot({ path: path.join(OUT, 'scroll-headed.png') });
}
await b.close();
console.log(`${urls.length} pagina's in headed Chrome`);
console.log(bad.length ? bad.join('\n') : 'geen tweede scrollbalk: alleen het document scrollt');
process.exitCode = bad.length ? 1 : 0;
