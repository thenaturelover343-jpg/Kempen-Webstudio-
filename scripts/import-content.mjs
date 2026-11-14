// import-content.mjs: haalt de inhoud (teksten, URL's, SEO, voorbeeldsites, beelden) uit de bronsite naar content/.
//
// Gebruik:  node scripts/import-content.mjs [--src ../site] [--live]
//   --src   de bronmap (standaard ../site, de master met NL + /fr/ + /en/). Er wordt NIETS in de bron gewijzigd.
//   --live  vergelijkt daarna elke URL uit de online sitemap met de bron. Is de hoofdtekst van een FR/EN-pagina online
//           anders (online staan verbeterde vertalingen die nog niet in ../site zitten), dan wordt de online versie
//           van die pagina gebruikt. NL-pagina's komen altijd uit de bron. Ontbrekende bestanden die online wel
//           bestaan (bv. /assets/og-v2.jpg) worden opgehaald. Alles komt in content/_import-verslag.json.
//
// content/ is daarna de enige invoer voor scripts/build.mjs (de repo bouwt zelfstandig, zonder ../site).
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARGS = process.argv.slice(2);
const val = (f, d) => { const i = ARGS.indexOf(f); return i >= 0 ? ARGS[i + 1] : d; };
const SRC = path.resolve(ROOT, val('--src', '../site'));
const DST = path.join(ROOT, 'content');
const ORIGIN = 'https://www.kempenwebstudio.be';
const EXCLUDE = new Set(['.git', '.gitignore', '.claude', '_build', '_gusje-live', 'CNAME', 'node_modules']);
const EXCLUDE_EXT = ['.patch', '.zip', '.tar', '.md'];
// niet meer nodig in het nieuwe design (WebGL-hero, smooth scroll, oude micro-interacties en lettertypes)
const DROP = ['assets/lab4', 'assets/kw-fx.js', 'assets/kw-gedeeld.css'];

if (!fs.existsSync(path.join(SRC, 'index.html'))) throw new Error('Geen bronsite gevonden in ' + SRC);
fs.rmSync(DST, { recursive: true, force: true });

let n = 0;
(function copy(dir) {
  for (const e of fs.readdirSync(path.join(SRC, dir), { withFileTypes: true })) {
    const rel = dir ? `${dir}/${e.name}` : e.name;
    if (!dir && EXCLUDE.has(e.name)) continue;
    if (DROP.includes(rel)) continue;
    if (e.isDirectory()) { copy(rel); continue; }
    if (EXCLUDE_EXT.some(x => e.name.toLowerCase().endsWith(x))) continue;
    fs.mkdirSync(path.join(DST, dir), { recursive: true });
    fs.copyFileSync(path.join(SRC, rel), path.join(DST, rel)); n++;
  }
})('');
// instellingen van maak-live (welke pagina's noindex blijven, voorbeeldsites ...)
fs.copyFileSync(path.join(SRC, '_build', 'live-config.json'), path.join(ROOT, 'config', 'live-config.json'));

let commit = '';
try { commit = execSync('git rev-parse --short HEAD', { cwd: SRC }).toString().trim(); } catch { /* geen git */ }
const report = { bron: SRC, bronCommit: commit, datum: new Date().toISOString().slice(0, 10), bestanden: n, onlineVervangen: [], onlineOpgehaald: [], verschillenNL: [] };

if (ARGS.includes('--live')) {
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const info = html => {
    const { document } = parseHTML(html);
    document.querySelectorAll('script,style,svg,noscript').forEach(e => e.remove());
    return { main: norm((document.querySelector('main') || document.body).textContent), title: norm(document.title),
      desc: document.querySelector('meta[name=description]')?.getAttribute('content') || '' };
  };
  const sm = await (await fetch(ORIGIN + '/sitemap.xml')).text();
  fs.writeFileSync(path.join(ROOT, 'config', 'sitemap-online.xml'), sm); // volgorde + lastmod voor de nieuwe sitemap, en URL-controle
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(ORIGIN, ''));
  for (const u of urls) {
    const file = path.join(DST, u.endsWith('/') ? u + 'index.html' : u);
    const res = await fetch(ORIGIN + u); const html = await res.text();
    if (!fs.existsSync(file)) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, html); report.onlineOpgehaald.push(u); continue; }
    const a = info(html), b = info(fs.readFileSync(file, 'utf8'));
    if (a.main === b.main && a.title === b.title && a.desc === b.desc) continue;
    if (/^\/(fr|en)\//.test(u)) { fs.writeFileSync(file, html); report.onlineVervangen.push(u); }
    else report.verschillenNL.push({ url: u, title: a.title === b.title ? null : { online: a.title, bron: b.title }, desc: a.desc === b.desc ? null : { online: a.desc, bron: b.desc }, tekst: a.main === b.main ? null : 'hoofdtekst verschilt' });
  }
  for (const f of ['/assets/og-v2.jpg', '/icons/kw-192.png', '/icons/kw-512.png']) {
    const file = path.join(DST, f);
    if (fs.existsSync(file)) continue;
    const res = await fetch(ORIGIN + f); if (!res.ok) continue;
    fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, Buffer.from(await res.arrayBuffer())); report.onlineOpgehaald.push(f);
  }
}
report.correcties = (await import('./apply-corrections.mjs')).applyCorrections(() => {});
report.demoWeg = (await import('./apply-demo-weg.mjs')).applyDemoWeg(() => {});  // beslissing Karim 14-11-2026: geen gratis demo meer
fs.writeFileSync(path.join(DST, '_import-verslag.json'), JSON.stringify(report, null, 1));
console.log(`content/ klaar: ${n} bestanden uit ${SRC}${commit ? ' (commit ' + commit + ')' : ''}`);
if (ARGS.includes('--live')) console.log(`  online vervangen (FR/EN): ${report.onlineVervangen.length}, opgehaald: ${report.onlineOpgehaald.join(', ') || 'geen'}, NL-verschillen (bron behouden): ${report.verschillenNL.length}`);
