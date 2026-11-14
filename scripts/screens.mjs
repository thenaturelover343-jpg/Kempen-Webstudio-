// screens.mjs: volledige schermafbeeldingen per paginatype op 1440 px en 390 px breed, in _screens/.
// Gebruik: node scripts/screens.mjs [poort=4101]  (serveert dist-live zelf als de poort vrij is; gebruikt de geïnstalleerde Chrome)
// De cookiemelding wordt vooraf beantwoord (anders staat die op elke afbeelding); verschijn-animaties staan meteen op 'klaar'.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = +(process.argv[2] || 4101), BASE = `http://localhost:${PORT}`;
const OUT = path.join(ROOT, '_screens'); fs.mkdirSync(OUT, { recursive: true });
export const TYPES = [
  ['home', '/'], ['dienst-webshop', '/webshop-laten-maken/'], ['sector-horeca', '/website-horeca/'], ['stad-geel', '/website-laten-maken-geel/'],
  ['kempen', '/website-laten-maken-kempen/'], ['kennis-index', '/kennis/'], ['kennis-artikel', '/kennis/wordpress-of-maatwerk/'], ['kosten', '/wat-kost-een-website/'],
  ['voorbeeldontwerpen', '/voorbeeldontwerpen/'], ['toegankelijkheid', '/toegankelijke-website/'], ['privacy', '/privacyverklaring/'], ['bedankt', '/bedankt/'], ['404', '/bestaat-niet/'],
  ['fr-home', '/fr/'], ['en-stad-gent', '/en/website-laten-maken-gent/'],
];
let server = null;
try { await fetch(BASE + '/'); } catch { server = spawn(process.execPath, [path.join(ROOT, 'scripts', 'serve.mjs'), path.join(ROOT, 'dist-live'), String(PORT)], { stdio: 'ignore' }); await new Promise(r => setTimeout(r, 800)); }
const browser = await chromium.launch({ channel: 'chrome' });
for (const width of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width, height: width > 500 ? 900 : 844 }, deviceScaleFactor: 1, isMobile: width < 500, hasTouch: width < 500 });
  await ctx.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
  const page = await ctx.newPage();
  for (const [name, p] of (process.env.ONLY ? TYPES.filter(t => process.env.ONLY.split(',').includes(t[0])) : TYPES)) {
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg').forEach(e => e.classList.add('kw-in'));
      document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
      await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    });
    await page.waitForTimeout(1200);
    const file = path.join(OUT, `${name}-${width}.jpg`);
    await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 78 });
    console.log(file);
  }
  await ctx.close();
}
await browser.close();
if (server) server.kill();
