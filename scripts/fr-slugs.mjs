// fr-slugs.mjs (eenmalig, herhaalbaar): zet de FR-pagina's in content/ op hun Franse slug (src/site/slugs.mjs)
// en herschrijft elke verwijzing naar een oud FR-pad in alle content-pagina's (links, canonical, hreflang, og:url, JSON-LD).
import fs from 'node:fs';
import path from 'node:path';
import { FR_SLUGS, rewriteFr } from '../src/site/slugs.mjs';
const C = path.resolve('content');
let moved = 0, changed = 0;
for (const [from, to] of Object.entries(FR_SLUGS).sort((a, b) => b[0].length - a[0].length)) {
  const a = path.join(C, from, 'index.html'), b = path.join(C, to, 'index.html');
  if (!fs.existsSync(a)) continue;
  fs.mkdirSync(path.dirname(b), { recursive: true }); fs.renameSync(a, b); moved++;
  try { fs.rmdirSync(path.join(C, from)); } catch {}
}
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) { const s = fs.readFileSync(f, 'utf8'), t = rewriteFr(s); if (t !== s) { fs.writeFileSync(f, t); changed++; } } } })(C);
// lege oude mappen opruimen (bv. fr/kennis)
for (const from of Object.keys(FR_SLUGS)) { const d = path.join(C, from); try { if (fs.existsSync(d) && !fs.readdirSync(d).length) fs.rmdirSync(d); } catch {} }
console.log(`${moved} FR-pagina's verplaatst, ${changed} bestanden herschreven`);
