// en-slugs.mjs (eenmalig, herhaalbaar): zet de EN-pagina's in content/ op hun Engelse slug (src/site/slugs.mjs, EN_SLUGS)
// en herschrijft elke verwijzing naar een oud EN-pad: content-pagina's, paginabronnen (src), shell, config.
import fs from 'node:fs';
import path from 'node:path';
import { EN_SLUGS, rewriteEn } from '../src/site/slugs.mjs';
const C = path.resolve('content');
let moved = 0, changed = 0;
for (const [from, to] of Object.entries(EN_SLUGS).sort((a, b) => b[0].length - a[0].length)) {
  const a = path.join(C, from, 'index.html'), b = path.join(C, to, 'index.html');
  if (!fs.existsSync(a)) continue;
  fs.mkdirSync(path.dirname(b), { recursive: true }); fs.renameSync(a, b); moved++;
}
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) { if (!['img', 'assets', 'fonts', 'node_modules'].includes(e.name)) walk(f); } else if (/\.(html|mjs|json|tsx|xml)$/.test(e.name)) files.push(f); } })(C);
for (const d of ['src', 'config']) (function walk(x) { for (const e of fs.readdirSync(x, { withFileTypes: true })) { const f = path.join(x, e.name); if (e.isDirectory()) walk(f); else if (/\.(mjs|json|tsx|xml|js)$/.test(e.name) && !f.endsWith('slugs.mjs')) files.push(f); } })(path.resolve(d));
files.push(path.resolve('scripts/shell.mjs'));
for (const f of files) { const s = fs.readFileSync(f, 'utf8'), t = rewriteEn(s); if (t !== s) { fs.writeFileSync(f, t); changed++; } }
// lege oude mappen opruimen
for (const from of Object.keys(EN_SLUGS).sort((a, b) => b.length - a.length)) { const d = path.join(C, from); try { if (fs.existsSync(d) && !fs.readdirSync(d).length) fs.rmdirSync(d); } catch {} }
console.log(`${moved} EN-pagina's verplaatst, ${changed} bestanden herschreven`);
