// overflow.mjs: controleert elke pagina van een build op horizontaal scrollen (390 en 1440 px). Gebruik: node scripts/overflow.mjs [poort=4101]
import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process'; import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const PORT = +(process.argv[2] || 4101), BASE = `http://localhost:${PORT}`;
let server = null; try { await fetch(BASE + '/'); } catch { server = spawn(process.execPath, [path.join(ROOT, 'scripts', 'serve.mjs'), path.join(ROOT, 'dist-live'), String(PORT)], { stdio: 'ignore' }); await new Promise(r => setTimeout(r, 800)); }
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'live-config.json'), 'utf8')); const DEMO = new Set(CFG.demoFolders);
const urls = []; (function w(d) { for (const e of fs.readdirSync(path.join(ROOT, 'dist-live', d), { withFileTypes: true })) { const r = d ? `${d}/${e.name}` : e.name; if (e.isDirectory()) { if (!DEMO.has(r) && r !== 'assets' && r !== 'icons') w(r); } else if (r.endsWith('.html')) urls.push('/' + r.replace(/index\.html$/, '')); } })('');
const b = await chromium.launch({ channel: 'chrome' }); const bad = [];
for (const width of [390, 1440]) {
  const ctx = await b.newContext({ viewport: { width, height: 844 }, isMobile: width < 500 }); const p = await ctx.newPage();
  for (const u of urls) { await p.goto(BASE + u, { waitUntil: 'load' }); const sw = await p.evaluate(() => document.documentElement.scrollWidth); if (sw > width) bad.push(`${u} @${width}: ${sw}px`); }
  await ctx.close();
}
await b.close(); if (server) server.kill();
console.log(`${urls.length} pagina's x 2 breedtes: ${bad.length ? 'HORIZONTAAL SCROLLEN op:\n - ' + bad.join('\n - ') : 'nergens horizontaal scrollen'}`);
process.exitCode = bad.length ? 1 : 0;
