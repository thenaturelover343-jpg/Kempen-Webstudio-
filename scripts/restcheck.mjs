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
  // evaluatie 2 (18-11): Kasterlee/Kempen als werkplek, dubbele naam in de kruimel, NAP-varianten, FR-zinnen
  ['Kasterlee/Kempen als werkplek', /vanuit Kasterlee|webstudio uit Kasterlee|webdesigner uit Kasterlee|(?:zit|zitten)(?: zelf)? in Kasterlee|gevestigd in Kasterlee|naar Kasterlee (?:te )?komen|wij in Kasterlee|webstudio uit (?:de Kempen|uw gemeente)|from Kasterlee|based in Kasterlee|In Kasterlee, for|to Kasterlee|web studio (?:from the Kempen|in Kasterlee)|depuis Kasterlee|établi à Kasterlee|nous à Kasterlee|rendre à Kasterlee|À Kasterlee, pour|studio web (?:de|à) (?:Kasterlee|Campine|votre commune)|agence web de Kasterlee|Campine anversoise|Kempen region|Kasterlee, BE · CET|Waarom Kasterlee|Why Kasterlee|Pourquoi Kasterlee/],
  ['dubbele naam (KempenKempen)', /KempenKempen|CampineCampine/],
  ['NAP niet identiek', /2460 Kasterlee, (?:werkt|works|actif|intervient|Belgium|België|Belgique)/],
  ['FR-zin na vervanging', /\bce que un\b|vous lisez (?:dans|sur notre page sur) un site web/],
  ['kleine letter na zinseinde',/(?<!(?:o\.a|bv|bijv|incl|excl|ca|nr|vb|ex|e\.g|i\.e|etc|min|max|p|c|art|z\.?o))(?<![A-Za-z0-9]\.[A-Za-z0-9]+)[.!?][\s ]+(?=[a-zà-ÿ])(?!www\b|e-mail\b|https?)/],
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
  // werkplekregel alleen voor lopende tekst: title, meta en JSON-LD mogen het zoekwoord Kasterlee/Kempen houden (regel Karim: geen SEO-verlies)
  for (const [bron, s] of strs) for (const [naam, re] of tests) if (re.test(s) && !(naam.startsWith('Kasterlee/Kempen') && bron !== 'tekst')) add(f, naam + ' (' + bron + ')', norm(s));

  // ---- evaluatie 18-11 ----
  const pad = '/' + path.relative(DIR, f).replace(/\\/g, '/');
  const demo = /-voorbeeld\/|voorbeeldontwerpen\/|exemples-de-design\/|sample-designs\//.test(pad);
  for (const [bron, s] of strs) {
    // demo-rest "Vous la consultez" (la ≠ le devis)
    if (/Vous la consultez/i.test(s)) add(f, 'Vous la consultez (' + bron + ')', norm(s));
    // proposal / proposition / voorstel in de betekenis van offerte (logo-voorstellen en demo-sites zijn in orde)
    if (!demo) {
      const z = s.replace(/\d+ (?:ontwerp)?(?:voorstellen|proposals|propositions)|ontwerpvoorstel(?:len)?|design proposals?|propositions? de design|(?:elk|each|chaque) (?:voorstel|proposal|proposition)|het voorstel dat u kiest|the proposal you choose|la proposition que vous|(?:de|the|les) (?:voorstellen|proposals|propositions)(?: uit)?\b|work out the proposals|élaborons les propositions/gi, '');
      if (/\b(?:voorstel(?:len)?|proposals?|propositions?)\b/i.test(z)) add(f, 'voorstel/proposal/proposition als offerte (' + bron + ')', norm(s));
    }
  }
  // EN: "the Kempen", nooit "Campine"
  if (pad.startsWith('/en/')) for (const [bron, s] of strs) if (/Campine/.test(s.replace(/Kempen \(Campine\)/g, ''))) add(f, 'EN: Campine in plaats van the Kempen (' + bron + ')', norm(s));
  // "Kies uw stad": alfabetisch
  for (const p of d.querySelectorAll('p')) if (/^(Kies uw stad|Choisissez votre ville|Choose your city)$/.test(norm(p.textContent))) {
    const ul = p.nextElementSibling; if (!ul || ul.tagName !== 'UL') continue;
    const n = [...ul.querySelectorAll('li')].map(li => norm(li.textContent)); const lg = (d.documentElement.getAttribute('lang') || 'nl').slice(0, 2);
    if (n.join('|') !== [...n].sort((a, b) => a.localeCompare(b, lg)).join('|')) add(f, 'Kies uw stad niet alfabetisch', n.join(', '));
  }
  // "altijd vrijblijvend" direct na een vrijblijvende offerte (ook over twee alinea's heen)
  const blokken = []; for (const el of d.querySelectorAll(BLOCK)) { if (el.querySelector(INNER)) continue; const tx = norm(el.textContent); if (tx) blokken.push({ tx, el }); }
  const vol = blokken.map(b => b.tx).join(' ');
  const naOfferte = /(vrijblijvende offerte|no-obligation quote|devis sans engagement)[^.?!]*[.?!]\s+[^.?!]*(altijd vrijblijvend|always without obligation|toujours sans engagement)/gi;
  for (const m of vol.matchAll(naOfferte)) add(f, 'altijd vrijblijvend na een vrijblijvende offerte', m[0]);
  for (const [bron, s] of strs) if (bron !== 'tekst') for (const m of s.matchAll(naOfferte)) add(f, 'altijd vrijblijvend na een vrijblijvende offerte (' + bron + ')', m[0]);
  // dezelfde offertezin twee keer op één pagina (ook als de ene zin het begin van de andere is, of alleen het onderwerp verschilt)
  const main = d.querySelector('main') || d.body;
  const OFF = /offerte|quote|devis/i;
  const kern = z => z.toLowerCase().replace(/[.!?]$/, '').replace(/^(wij maken|kempen webstudio maakt|we prepare|kempen webstudio prepares|nous établissons|nous préparons|kempen webstudio établit|kempen webstudio prépare)( eerst| first| d’abord)? /, 'X ').trim();
  const zinnen = [];
  [...main.querySelectorAll('p,li,summary,div.fq-a,td,dd')].filter(e => !e.querySelector(INNER) && !e.closest('.kw-sr')).forEach((b, bi) => {
    const t = norm(b.textContent);
    if (/aanspreekpunt|interlocuteur|point of contact/.test(t) && /(excl\.( btw| VAT)?|HTVA)\.?$/.test(t)) return; // trust-strip
    for (const z of t.split(/(?<=[.?!])\s+/)) if (OFF.test(z) && z.split(' ').length > 4) zinnen.push({ z, k: kern(z), bi });
  });
  const gezien = new Set();
  for (let i = 0; i < zinnen.length; i++) for (let j = i + 1; j < zinnen.length; j++) {
    const a = zinnen[i], b = zinnen[j]; if (a.bi === b.bi) continue;
    // ook: twee offertezinnen die met dezelfde 7 woorden beginnen (bv. "Na een kennismaking krijgt u een vrijblijvende offerte ...")
    // (de gedeelde slot-CTA "Na een kennismaking krijgt u een vrijblijvende offerte." is een goedgekeurd blok en telt hier niet)
    const CTA = /^(na een kennismaking krijgt u een vrijblijvende offerte|after an introductory conversation you receive a no-obligation quote|après une prise de contact, vous recevez un devis sans engagement)$/;
    const w7 = x => x.split(' ').slice(0, 7).join(' '), zelfdeBegin = !CTA.test(a.k) && !CTA.test(b.k) && a.k.split(' ').length > 7 && b.k.split(' ').length > 7 && w7(a.k) === w7(b.k);
    if (a.k === b.k || b.k.startsWith(a.k + ',') || a.k.startsWith(b.k + ',') || zelfdeBegin) { const key = a.z + '|' + b.z; if (!gezien.has(key)) { gezien.add(key); add(f, 'dubbele offertezin op de pagina', a.z + '  <=>  ' + b.z); } }
  }
}
const uniek = [...new Map(hits.map(h => [h.pagina + h.soort + h.tekst, h])).values()];
const per = {}; for (const h of uniek) per[h.soort] = (per[h.soort] || 0) + 1;
console.log(JSON.stringify(per));
if (process.env.JSON) fs.writeFileSync(process.env.JSON, JSON.stringify(uniek, null, 1));
for (const h of uniek.slice(0, +(process.env.N || 60))) console.log(h.soort, '|', h.pagina, '|', h.tekst);
console.log(uniek.length ? `restcheck: ${uniek.length} treffers op ${files.length} pagina's` : `restcheck: geen restanten op ${files.length} pagina's`);
process.exitCode = uniek.length ? 1 : 0;
