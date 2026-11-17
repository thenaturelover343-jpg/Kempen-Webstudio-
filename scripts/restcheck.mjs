// restcheck.mjs: zoekt op elke pagina naar restanten van tekstvervangingen (Karim 17-11):
// losse komma's na een bolletje of komma, dubbele spaties, zinnen die met een kleine letter beginnen,
// "eén", lege lijst-items en dubbele leestekens. Kijkt naar zichtbare tekst, schermlezertekst (.kw-sr),
// title, meta-beschrijvingen, alt-teksten en JSON-LD.
// Gebruik: node scripts/restcheck.mjs [map]   (standaard dist-test)
import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const DIR = path.resolve(process.argv[2] || 'dist-test');
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) files.push(p); } })(DIR);

const BLOCK = 'p,li,h1,h2,h3,h4,h5,h6,td,th,dt,dd,summary,figcaption,blockquote,label,button,a,span,div';
const INNER = 'p,li,h1,h2,h3,h4,h5,h6,td,th,dt,dd,summary,figcaption,blockquote,div';
const SP = '[\\s\\u00a0\\u202f]*';
const tests = [
  ['komma na bolletje of komma', /·[\s  ]*,|,[\s  ]*,/],
  ['dubbele leestekens', new RegExp(`([.;:!?])${SP}\\1(?!\\1)|[,;:]${SP}[.!?]|\\.${SP}[,;:]`)],
  ['eén', /(^|[^\p{L}])eén(?!\p{L})|[a-zà-ÿ,] Eén(?!\p{L})/u],
  ['kleine letter na zinseinde', /(?<!(?:o\.a|bv|bijv|incl|excl|ca|nr|vb|ex|e\.g|i\.e|etc|min|max|p|c|art|z\.?o))(?<![A-Za-z0-9]\.[A-Za-z0-9]+)[.!?][\s ]+(?=[a-zà-ÿ])(?!www\b|e-mail\b|https?)/],
];
const hits = [];
const add = (f, soort, tekst) => hits.push({ pagina: '/' + path.relative(DIR, f).replace(/\\/g, '/').replace(/index\.html$/, ''), soort, tekst: tekst.slice(0, 180) });
const norm = s => s.replace(/\s+/g, ' ').trim();
const isLink = tx => /^\S*(@|\.(be|com|eu|nl|fr)\b)/.test(tx) || /^(kw_|e-mail|https?:)/.test(tx);

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  if (/http-equiv="refresh"/i.test(html) && html.length < 3000) continue;
  const { document: d } = parseHTML(html);
  const strs = [];
  const t = d.querySelector('title'); if (t) strs.push(['title', t.textContent]);
  for (const m of d.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"],meta[property="og:title"],meta[name="twitter:title"]')) strs.push(['meta', m.getAttribute('content') || '']);
  for (const i of d.querySelectorAll('img[alt]')) strs.push(['alt', i.getAttribute('alt')]);
  for (const s of d.querySelectorAll('script[type="application/ld+json"]')) {
    try { (function w(o) { if (typeof o === 'string') { if (/\s/.test(o) && !/^https?:/.test(o)) strs.push(['json-ld', o]); } else if (o && typeof o === 'object') Object.values(o).forEach(w); })(JSON.parse(s.textContent)); } catch { add(f, 'json-ld ongeldig', ''); }
  }
  for (const s of d.querySelectorAll('script,style,noscript,svg')) s.remove();
  // dubbele spaties binnen één tekstnode (zonder regelovergang)
  const walker = n => { for (const c of n.childNodes) { if (c.nodeType === 3) { const v = c.textContent; if (/\S[  ]{2,}\S/.test(v)) add(f, 'dubbele spatie', norm(c.parentNode?.textContent || v)); } else if (c.nodeType === 1) walker(c); } };
  walker(d.body);
  // lege lijst-items
  for (const li of d.querySelectorAll('li')) if (!norm(li.textContent) && !li.querySelector('img,svg,a[aria-label],input,button')) add(f, 'leeg lijst-item', li.outerHTML);
  // tekstblokken: kleinste blok dat nog tekst heeft, in documentvolgorde
  let vorige = '';
  for (const el of d.querySelectorAll(BLOCK)) {
    if (el.querySelector(INNER)) continue;
    const tx = norm(el.textContent); if (!tx) continue;
    strs.push(['tekst', tx]);
    // met een kleine letter beginnen is alleen fout als het vorige blok een afgeronde zin was;
    // lijstjes na een dubbele punt, labels onder een kop en doorlopende zinnen zijn in orde
    const tag = el.tagName.toLowerCase();
    if (/^(p|li|h[1-6]|td|th|summary|figcaption|blockquote|dd)$/.test(tag) && /^[a-zà-ÿ]/.test(tx) && !isLink(tx) && /[.!?]$/.test(vorige) && !/^\d+\.$/.test(vorige) && !(tag === 'li' && el.previousElementSibling))
      add(f, 'begint met kleine letter', `<${tag}> na "…${vorige.slice(-50)}": ${tx}`);
    vorige = tx;
  }
  for (const [bron, s] of strs) for (const [naam, re] of tests) if (re.test(s)) add(f, naam + ' (' + bron + ')', norm(s));
}
const uniek = [...new Map(hits.map(h => [h.pagina + h.soort + h.tekst, h])).values()];
const per = {}; for (const h of uniek) per[h.soort] = (per[h.soort] || 0) + 1;
console.log(JSON.stringify(per));
if (process.env.JSON) fs.writeFileSync(process.env.JSON, JSON.stringify(uniek, null, 1));
for (const h of uniek.slice(0, +(process.env.N || 60))) console.log(h.soort, '|', h.pagina, '|', h.tekst);
console.log(uniek.length ? `restcheck: ${uniek.length} treffers op ${files.length} pagina's` : `restcheck: geen restanten op ${files.length} pagina's`);
process.exitCode = uniek.length ? 1 : 0;
