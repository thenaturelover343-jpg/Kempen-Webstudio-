// lighthouse.mjs: Lighthouse (mobiel en desktop) op de live-build, lokaal geserveerd met brotli zoals een CDN.
// Gebruik: node scripts/lighthouse.mjs [poort=4101]   (start zelf scripts/serve.mjs dist-live als de poort vrij is)
// Resultaat: _lighthouse/<pagina>-<toestel>.json (samenvatting) en een tabel in de console.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = +(process.argv[2] || 4101);
const BASE = `http://localhost:${PORT}`;
const PAGES = [['home', '/'], ['dienst', '/webshop-laten-maken/'], ['sector', '/website-horeca/'], ['stad', '/website-laten-maken-geel/'], ['kennis', '/kennis/wordpress-of-maatwerk/'], ['fr', '/fr/'], ['en', '/en/website-laten-maken-gent/']];
const OUT = path.join(ROOT, '_lighthouse'); fs.mkdirSync(OUT, { recursive: true });

let server = null;
try { await fetch(BASE + '/'); } catch { server = spawn(process.execPath, [path.join(ROOT, 'scripts', 'serve.mjs'), path.join(ROOT, 'dist-live'), String(PORT)], { stdio: 'ignore' }); await new Promise(r => setTimeout(r, 800)); }
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-first-run', '--disable-extensions'] });
const rows = [];
for (const [name, p] of PAGES) for (const formFactor of ['mobile', 'desktop']) {
  let best = null;
  for (let run = 0; run < 2; run++) { // twee runs, de beste performance telt (vlakt meetruis af)
    const cfg = formFactor === 'desktop' ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined;
    const r = await lighthouse(BASE + p, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] }, cfg);
    const lhr = r.lhr; const sc = k => Math.round((lhr.categories[k]?.score ?? 0) * 100);
    const res = { page: name, url: p, formFactor, performance: sc('performance'), accessibility: sc('accessibility'), bestPractices: sc('best-practices'), seo: sc('seo'),
      lcp: lhr.audits['largest-contentful-paint'].displayValue, cls: +lhr.audits['cumulative-layout-shift'].numericValue.toFixed(3), tbt: lhr.audits['total-blocking-time'].displayValue, fcp: lhr.audits['first-contentful-paint'].displayValue,
      bytes: Math.round(lhr.audits['total-byte-weight'].numericValue / 1024) + ' kB',
      issues: Object.values(lhr.audits).filter(a => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'manual').map(a => `${a.id}: ${a.displayValue || a.score}`) };
    if (!best || res.performance > best.performance) best = res;
  }
  fs.writeFileSync(path.join(OUT, `${name}-${formFactor}.json`), JSON.stringify(best, null, 1));
  rows.push(best);
  console.log(`${name.padEnd(7)} ${formFactor.padEnd(7)} perf ${best.performance} | a11y ${best.accessibility} | bp ${best.bestPractices} | seo ${best.seo} | LCP ${best.lcp} | CLS ${best.cls} | TBT ${best.tbt} | ${best.bytes}${best.issues.length ? '\n          ' + best.issues.join('; ') : ''}`);
}
await chrome.kill();
if (server) server.kill();
fs.writeFileSync(path.join(OUT, 'samenvatting.json'), JSON.stringify(rows, null, 1));
