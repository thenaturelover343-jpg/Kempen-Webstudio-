// shots-fb.mjs: schermafbeeldingen van de secties uit Karims feedback (16-11). Gebruik: node scripts/shots-fb.mjs uitmap [poort]
import path from 'node:path';
import { chromium } from 'playwright-core';
const OUT = process.argv[2], BASE = `http://localhost:${process.argv[3] || 4101}`;
const b = await chromium.launch({ channel: 'chrome' });
async function page(width) {
  const c = await b.newContext({ viewport: { width, height: width > 500 ? 900 : 844 }, deviceScaleFactor: width > 500 ? 1 : 2, isMobile: width < 500, hasTouch: width < 500 });
  await c.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
  const p = await c.newPage(); await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  await p.evaluate(async () => {
    document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg').forEach(e => e.classList.add('kw-in'));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); }
    document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    await Promise.all([...document.images].map(i => i.complete && i.naturalWidth ? 0 : new Promise(r => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, 10000); })));
    await Promise.all([...document.images].map(i => i.decode ? i.decode().catch(() => 0) : 0));
    scrollTo(0, 0);
  });
  return p;
}
const el = async (p, js, n) => { const h = await p.evaluateHandle(js); const e = h.asElement(); await e.scrollIntoViewIfNeeded(); await p.mouse.move(1, 1); await p.waitForTimeout(1800); await e.screenshot({ path: path.join(OUT, n), type: 'jpeg', quality: 84 }); };
const p = await page(1440);
await el(p, `document.getElementById('werk')`, 'wk-fb-voorbeelden-1440.jpg');
await el(p, `document.querySelector('.kw-marquee').closest('.max-w-\\\\[1440px\\\\]')`, 'wk-fb-sectoren-1440.jpg');
await el(p, `document.getElementById('voor-na')`, 'wk-fb-voorna-1440.jpg');
await el(p, `document.querySelector('.kw-map').closest('.max-w-\\\\[1440px\\\\]')`, 'wk-fb-belgie-1440.jpg');
await el(p, `document.getElementById('werkwijze')`, 'wk-fb-voorstel-1440.jpg');
await el(p, `[...document.querySelectorAll('h2')].find(h => /Voorbeeldontwerpen in beeld|exemples de sites en images|sample designs at a glance/i.test(h.textContent)).closest('.max-w-\\\\[1440px\\\\]')`, 'wk-fb-realisaties-1440.jpg');
const m = await page(390);
await m.screenshot({ path: path.join(OUT, 'wk-fb-home-390.jpg'), type: 'jpeg', quality: 78, fullPage: true });
await b.close(); console.log('klaar');
