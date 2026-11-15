// shots-foto.mjs: schermafbeeldingen van plekken waar nu foto's staan. Gebruik: node scripts/shots-foto.mjs uitmap [poort=4101]
import path from 'node:path';
import { chromium } from 'playwright-core';
const OUT = process.argv[2], BASE = `http://localhost:${process.argv[3] || 4101}`;
const b = await chromium.launch({ channel: 'chrome' });
async function ctx(width) {
  const c = await b.newContext({ viewport: { width, height: width > 500 ? 900 : 844 }, deviceScaleFactor: width > 500 ? 1 : 2, isMobile: width < 500, hasTouch: width < 500 });
  await c.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
  return c.newPage();
}
async function open(p, u) {
  await p.goto(BASE + u, { waitUntil: 'networkidle', timeout: 30000 });
  await p.evaluate(async () => { document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg').forEach(e => e.classList.add('kw-in')); for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 30)); } scrollTo(0, 0); });
  await p.evaluate(() => Promise.all([...document.images].filter(i => i.getClientRects().length).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); }))));
  await p.evaluate(async () => { document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; }); await Promise.all([...document.images].map(i => i.complete && i.naturalWidth ? 0 : new Promise(r => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, 10000); }))); await Promise.all([...document.images].map(i => i.decode ? i.decode().catch(() => 0) : 0)); });
  await p.waitForTimeout(700);
}
const shot = (p, n, opt = {}) => p.screenshot({ path: path.join(OUT, n), type: 'jpeg', quality: 82, ...opt });
const el = async (p, sel, n) => { const h = await p.evaluateHandle(sel); await h.asElement().scrollIntoViewIfNeeded(); await p.waitForTimeout(500); await h.asElement().screenshot({ path: path.join(OUT, n), type: 'jpeg', quality: 82 }); };
let p = await ctx(1440);
await open(p, '/'); await shot(p, 'wk-foto-home-hero-1440.jpg');
await el(p, `document.getElementById('werk')`, 'wk-foto-home-voorbeeldontwerpen-1440.jpg');
await el(p, `[...document.querySelectorAll('[data-sel]')].find(e => e.textContent.includes('Kasterlee & Kempen'))`, 'wk-foto-home-kaart-1440.jpg');
await el(p, `document.getElementById('cases')`, 'wk-foto-home-cases-1440.jpg');
await open(p, '/website-horeca/'); await shot(p, 'wk-foto-sector-horeca-1440.jpg');
await open(p, '/website-laten-maken-gent/'); await shot(p, 'wk-foto-stad-gent-1440.jpg');
await open(p, '/kennis/wordpress-of-maatwerk/'); await shot(p, 'wk-foto-kennis-1440.jpg');
await open(p, '/webshop-laten-maken/'); await el(p, `document.querySelector('[class*="h-[132px]"]').closest('article,li,div.grid > *')`, 'wk-foto-webshop-prijs-1440.jpg');
p = await ctx(390);
await open(p, '/website-laten-maken-geel/'); await shot(p, 'wk-foto-stad-geel-390.jpg', { fullPage: false, clip: { x: 0, y: 0, width: 390, height: 1300 } });
await open(p, '/'); await el(p, `document.getElementById('werk')`, 'wk-foto-home-voorbeeldontwerpen-390.jpg');
await b.close(); console.log('klaar');
