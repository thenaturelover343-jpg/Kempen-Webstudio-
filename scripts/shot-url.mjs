// shot-url.mjs: volledige schermafbeelding van één of meer pagina's (verkleind). Gebruik: node scripts/shot-url.mjs uitmap breedte /pad1/ /pad2/ ...
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright-core';
const [out, width, ...urls] = process.argv.slice(2); const W = +width;
const b = await chromium.launch({ channel: 'chrome' });
const c = await b.newContext({ viewport: { width: W, height: 900 }, isMobile: W < 500, hasTouch: W < 500 });
await c.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
const p = await c.newPage();
for (let u of urls) {
  u = '/' + u.split('/').filter(Boolean).join('/') + '/'; if (u === '//') u = '/'; await p.goto('http://localhost:4101' + u, { waitUntil: 'networkidle', timeout: 30000 });
  await p.evaluate(async () => { document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg').forEach(e => e.classList.add('kw-in')); for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
  // pas fotograferen als elk beeld geladen en gedecodeerd is (anders staan lazy beelden als lege vlakken op de foto)
  await p.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    await Promise.all([...document.images].map(i => i.complete && i.naturalWidth ? 0 : new Promise(r => { i.addEventListener('load', r); i.addEventListener('error', r); setTimeout(r, 10000); })));
    await Promise.all([...document.images].map(i => i.decode ? i.decode().catch(() => 0) : 0));
  });
  await p.waitForTimeout(600);
  const buf = await p.screenshot({ fullPage: true, type: 'png' });
  const n = path.join(out, (u.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home') + '-' + W + '.jpg');
  const m = await sharp(buf).metadata();
  await sharp(buf).resize({ width: Math.round(W * 0.5) }).jpeg({ quality: 70 }).toFile(n);
  console.log(n, m.height);
}
await b.close();
