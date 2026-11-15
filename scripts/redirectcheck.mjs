// redirectcheck.mjs: test _redirects (formaat, doel bestaat, geen ketens) en het HTML-vangnet op elk oud pad, ook via HTTP.
// Gebruik: node scripts/redirectcheck.mjs [poort=4101]
import fs from 'node:fs';
import path from 'node:path';
const DIR = path.resolve('dist-live'), PORT = +(process.argv[2] || 4101);
const lines = fs.readFileSync(path.join(DIR, '_redirects'), 'utf8').split('\n').filter(l => l && !l.startsWith('#'));
const bad = []; const from = new Set();
for (const l of lines) {
  const p = l.trim().split(/\s+/); if (p.length !== 3 || p[2] !== '301' || !p[0].startsWith('/') || !p[1].startsWith('/')) { bad.push('formaat: ' + l); continue; }
  const [a, b] = p; from.add(a);
  if (!fs.existsSync(path.join(DIR, b, 'index.html'))) bad.push(`doel bestaat niet: ${l}`);
  if (lines.some(x => x.split(/\s+/)[0] === b)) bad.push(`keten: ${l}`);
  if (a.endsWith('/')) {
    const stub = fs.readFileSync(path.join(DIR, a, 'index.html'), 'utf8');
    if (!stub.includes(`content="0; url=${b}"`) || !stub.includes(`rel="canonical" href="https://www.kempenwebstudio.be${b}"`) || !stub.includes('noindex')) bad.push('vangnet klopt niet: ' + a);
    try { const r = await fetch(`http://localhost:${PORT}${a}`); const t = await r.text(); if (r.status !== 200 || !t.includes(`url=${b}`)) bad.push(`HTTP ${a}: ${r.status}`); } catch (e) { bad.push(`HTTP ${a}: ${e.message}`); }
  }
}
// geen interne link meer naar een oud pad
let oldLinks = 0;
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) { const s = fs.readFileSync(f, 'utf8'); if (s.includes('http-equiv="refresh"')) continue; for (const a of from) if (a.endsWith('/') && s.includes(`href="${a}"`)) { oldLinks++; if (oldLinks < 5) bad.push(`interne link naar oud pad ${a} in ${path.relative(DIR, f)}`); } } } })(DIR);
console.log(`${lines.length} redirectregels (${from.size / 2} oude FR-paden, met en zonder slash), ${oldLinks} interne links naar oude paden`);
console.log(bad.length ? bad.join('\n') : 'redirects in orde: formaat, doelen, geen ketens, vangnet en HTTP 200 met refresh op elk oud pad');
process.exitCode = bad.length ? 1 : 0;
