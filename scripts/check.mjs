// check.mjs: controles over een volledige build. Gebruik: node scripts/check.mjs dist-live   (of dist-test)
//  1. linkcontrole: elke interne href/src/srcset/poster/url() verwijst naar een bestaand bestand; #ankers bestaan op de doelpagina
//  2. URL-lijst: elke URL uit de online sitemap (config/sitemap-online.xml) en uit de site-sitemap bestaat (status 200-bestand);
//     voor live: de nieuwe sitemap bevat exact dezelfde URL's als online
//  3. SEO per pagina: title, description, canonical (live: https://www.kempenwebstudio.be + eigen URL), robots, één H1, alt-teksten,
//     hreflang nl-BE/fr-BE/en/x-default wederkerig, JSON-LD geldig (parse + @context/@type), og:title/og:description/og:image
//  4. geen template-restanten (Zenrixa, aistudio, webstudiok.be, Gemini) en geen "Bijgewerkt op"
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { FR_SLUGS, baseOf } from '../src/site/slugs.mjs';
const STUBS = new Set(Object.keys(FR_SLUGS));

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.resolve(ROOT, process.argv[2] || 'dist-live');
const LIVE = /dist-live$/.test(DIR);
const ORIGIN = 'https://www.kempenwebstudio.be';
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'live-config.json'), 'utf8'));
const DEMO = new Set(CFG.demoFolders);
const errors = [], notes = [];
const err = (k, m) => errors.push(`[${k}] ${m}`);

const files = [];
(function walk(d) { for (const e of fs.readdirSync(path.join(DIR, d), { withFileTypes: true })) { const r = d ? `${d}/${e.name}` : e.name; e.isDirectory() ? walk(r) : files.push(r); } })('');
const htmlFiles = files.filter(f => f.endsWith('.html'));
const urlOf = f => '/' + f.replace(/index\.html$/, '');
const fileFor = u => { // URL-pad -> bestand (zoals een statische host)
  let p = decodeURIComponent(u.split('#')[0].split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(DIR, p);
  if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  if (fs.existsSync(path.join(f, 'index.html'))) return path.join(f, 'index.html'); // /map -> 301 /map/
  return null;
};
const docs = new Map();
const docOf = f => { if (!docs.has(f)) docs.set(f, parseHTML(fs.readFileSync(f, 'utf8')).document); return docs.get(f); };

// ---------- 1. links ----------
let nLinks = 0; const checkedAnchors = new Set();
for (const rel of htmlFiles) {
  const file = path.join(DIR, rel), doc = docOf(file), here = urlOf(rel);
  const refs = [];
  for (const el of doc.querySelectorAll('[href],[src],[srcset],[imagesrcset],[poster],[data-src]')) {
    for (const a of ['href', 'src', 'poster', 'data-src']) if (el.hasAttribute(a)) refs.push([el.getAttribute(a), a, el]);
    for (const a of ['srcset', 'imagesrcset']) if (el.hasAttribute(a)) for (const part of el.getAttribute(a).split(',')) { const u = part.trim().split(/\s+/)[0]; if (u) refs.push([u, a, el]); }
  }
  for (const s of doc.querySelectorAll('style')) for (const m of s.textContent.matchAll(/url\(["']?([^"')]+)/g)) if (!m[1].startsWith('data:')) refs.push([m[1], 'css', null]);
  for (const [raw, attr, el] of refs) {
    if (!raw || /^(mailto:|tel:|javascript:|data:|sms:)/i.test(raw)) continue;
    let u = raw;
    if (u.startsWith(ORIGIN)) u = u.slice(ORIGIN.length) || '/';
    if (/^(https?:)?\/\//i.test(u)) continue; // extern
    if (el && el.tagName === 'LINK' && el.getAttribute('rel') === 'canonical') continue;
    if (el && el.tagName === 'LINK' && el.getAttribute('rel') === 'alternate') continue; // apart gecontroleerd
    nLinks++;
    const abs = u.startsWith('#') ? here + u : new URL(u, 'http://x' + here).pathname + (u.includes('#') ? '#' + u.split('#')[1] : '');
    const [p, anchor] = abs.split('#');
    const target = fileFor(p);
    if (!target) { err('link', `${here} -> ${raw} (${attr}) bestaat niet`); continue; }
    if (anchor && target.endsWith('.html')) {
      const key = target + '#' + anchor; if (checkedAnchors.has(key)) continue; checkedAnchors.add(key);
      const td = docOf(target);
      if (!td.getElementById(decodeURIComponent(anchor)) && !td.querySelector(`[name="${anchor}"]`)) err('anker', `${here} -> ${raw}: #${anchor} ontbreekt op ${urlOf(path.relative(DIR, target).split(path.sep).join('/'))}`);
    }
  }
}

// ---------- 2. URL-lijsten ----------
const locs = xml => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const online = locs(fs.readFileSync(path.join(ROOT, 'config', 'sitemap-online.xml'), 'utf8'));
const siteMapSrc = path.join(ROOT, '..', 'site', 'sitemap.xml');
const siteLive = path.join(ROOT, '..', 'site-live', 'sitemap.xml');
const lists = { online };
if (fs.existsSync(siteMapSrc)) lists.site = locs(fs.readFileSync(siteMapSrc, 'utf8'));
if (fs.existsSync(siteLive)) lists['site-live'] = locs(fs.readFileSync(siteLive, 'utf8'));
const urlReport = {};
for (const [name, list] of Object.entries(lists)) {
  const missing = list.filter(u => !fileFor(u.replace(ORIGIN, '') || '/'));
  urlReport[name] = { totaal: list.length, ok: list.length - missing.length, ontbreekt: missing };
  for (const m of missing) err('url', `${name}: ${m} bestaat niet in de build`);
}
// ook elke HTML-pagina uit content/ (incl. voorbeeldsites, 404, bedankt) moet op hetzelfde pad staan
const contentHtml = []; (function walk(d) { for (const e of fs.readdirSync(path.join(ROOT, 'content', d), { withFileTypes: true })) { const r = d ? `${d}/${e.name}` : e.name; if (e.isDirectory()) walk(r); else if (r.endsWith('.html')) contentHtml.push(r); } })('');
const lostContent = contentHtml.filter(r => !fs.existsSync(path.join(DIR, r)));
urlReport.content = { totaal: contentHtml.length, ok: contentHtml.length - lostContent.length, ontbreekt: lostContent };
for (const m of lostContent) err('url', 'content: /' + m + ' ontbreekt');
let newSitemap = null;
if (LIVE) {
  newSitemap = locs(fs.readFileSync(path.join(DIR, 'sitemap.xml'), 'utf8'));
  const a = new Set(online), b = new Set(newSitemap);
  const gone = online.filter(u => !b.has(u)), extra = newSitemap.filter(u => !a.has(u));
  urlReport.sitemap = { nieuw: newSitemap.length, online: online.length, weg: gone, extra };
  for (const u of gone) { const p = u.replace(ORIGIN, ''); if (STUBS.has(p)) notes.push('verhuisd met 301: ' + p + ' -> ' + FR_SLUGS[p]); else err('sitemap', 'staat online in de sitemap maar niet in de nieuwe: ' + u); }
  for (const u of extra) notes.push('nieuw in de sitemap (niet in de online sitemap): ' + u);
  const sm = fs.readFileSync(path.join(DIR, 'sitemap.xml'), 'utf8');
  if (!/^<\?xml/.test(sm) || (sm.match(/<url>/g) || []).length !== newSitemap.length) err('sitemap', 'sitemap.xml niet goed gevormd');
  const rb = fs.readFileSync(path.join(DIR, 'robots.txt'), 'utf8');
  if (!rb.includes('Sitemap: ' + ORIGIN + '/sitemap.xml') || /Disallow:\s*\/\s*$/m.test(rb)) err('robots.txt', 'live robots.txt niet zoals verwacht');
} else {
  const rb = fs.readFileSync(path.join(DIR, 'robots.txt'), 'utf8'); if (!/Disallow:\s*\/\s*$/m.test(rb)) err('robots.txt', 'test robots.txt moet alles blokkeren');
}

// ---------- 3. SEO per pagina ----------
const LANG = { 'nl-BE': 'nl', 'fr-BE': 'fr', en: 'en' };
const hreflangMap = {};
let nLd = 0, nPages = 0;
for (const rel of htmlFiles) {
  const url = urlOf(rel), top = url.split('/')[1], isDemo = DEMO.has(top) || DEMO.has(url.replace(/^\/(fr|en)\//, '/').split('/')[1]);
  const doc = docOf(path.join(DIR, rel)); const H = doc.head;
  const robots = H.querySelector('meta[name="robots"]')?.getAttribute('content');
  if (!LIVE && !/noindex/.test(robots || '')) err('robots', `${url}: test-build zonder noindex`);
  if (isDemo) continue; // voorbeeldsites: ongewijzigd overgenomen
  if (STUBS.has(url)) { // vangnet op een oud FR-pad: noindex, canonical en refresh naar het nieuwe pad
    const c = H.querySelector('link[rel="canonical"]')?.getAttribute('href'); if (c !== ORIGIN + FR_SLUGS[url] || !/noindex/.test(robots || '')) err('redirect', `${url}: vangnet klopt niet`); continue; }
  nPages++;
  const base = baseOf(url);
  const want = LIVE ? (CFG.noindex[base] || 'index,follow') : 'noindex,nofollow';
  if (robots !== want) err('robots', `${url}: ${robots} (verwacht ${want})`);
  const title = doc.title?.trim(); if (!title || title.length < 10) err('title', `${url}: ontbreekt of te kort`);
  const desc = H.querySelector('meta[name="description"]')?.getAttribute('content'); if (!desc) err('description', url);
  const canon = H.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const noindexPage = !!CFG.noindex[base] && /^noindex(,nofollow)?$/.test(CFG.noindex[base]); // 404 en bedankt: zoals op de huidige site zonder canonical/OG
  if (!noindexPage && canon !== ORIGIN + url) err('canonical', `${url}: ${canon}`);
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:locale']) if (!noindexPage && !H.querySelector(`meta[property="${p}"]`)) err('og', `${url}: ${p} ontbreekt`);
  const ogImg = H.querySelector('meta[property="og:image"]')?.getAttribute('content'); if (ogImg && !fileFor(ogImg.replace(ORIGIN, ''))) err('og', `${url}: og:image bestaat niet (${ogImg})`);
  const h1 = doc.querySelectorAll('h1'); if (h1.length !== 1) err('h1', `${url}: ${h1.length}x`);
  for (const im of doc.querySelectorAll('img')) {
    if (!im.hasAttribute('alt')) err('alt', `${url}: ${im.getAttribute('src')}`);
    if (!im.getAttribute('width') || !im.getAttribute('height')) err('img', `${url}: width/height ontbreekt op ${im.getAttribute('src')}`);
  }
  const ids = new Set(); for (const el of doc.querySelectorAll('[id]')) { if (ids.has(el.id)) err('id', `${url}: dubbel id #${el.id}`); ids.add(el.id); }
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    nLd++;
    try { const j = JSON.parse(s.textContent); const arr = Array.isArray(j) ? j : (j['@graph'] || [j]); for (const o of arr) { if (!o['@type']) err('json-ld', `${url}: @type ontbreekt`); } if (!j['@context'] && !Array.isArray(j)) err('json-ld', `${url}: @context ontbreekt`);
    }
    catch (e) { err('json-ld', `${url}: ongeldige JSON (${e.message})`); }
  }
  const alts = [...H.querySelectorAll('link[rel="alternate"][hreflang]')].map(l => [l.getAttribute('hreflang'), l.getAttribute('href')]);
  if (alts.length) hreflangMap[ORIGIN + url] = Object.fromEntries(alts);
  const body = doc.body.textContent;
  if (/Bijgewerkt op|Mis à jour le|Updated on/i.test(body)) err('tekst', `${url}: "Bijgewerkt op"`);
  const raw = fs.readFileSync(path.join(DIR, rel), 'utf8');
  if (/zenrixa|aistudio|webstudiok\.be|gemini|surge\.sh/i.test(raw)) err('template', `${url}: restant van het template of testdomein`);
  if (/Webstudio K\b/.test(doc.title)) err('naam', `${url}: titel gebruikt "Webstudio K" in plaats van Kempen Webstudio`);
}
// hreflang wederkerig + x-default
let nPairs = 0;
for (const [page, m] of Object.entries(hreflangMap)) {
  if (!m['x-default']) err('hreflang', `${page}: x-default ontbreekt`);
  if (Object.keys(m).filter(k => k !== 'x-default').length < 2) err('hreflang', `${page}: hreflang met maar één taal`);
  if (!Object.values(m).includes(page)) err('hreflang', `${page}: verwijst niet naar zichzelf`);
  for (const [l, u] of Object.entries(m)) {
    if (l === 'x-default') { if (u !== (m['nl-BE'] || m['fr-BE'] || m.en)) err('hreflang', `${page}: x-default is niet de NL-versie`); continue; }
    const other = hreflangMap[u];
    if (!fileFor(u.replace(ORIGIN, ''))) { err('hreflang', `${page} -> ${l} ${u} bestaat niet`); continue; }
    if (!other) { err('hreflang', `${u} (doel van ${page}) heeft geen hreflang`); continue; }
    if (!Object.values(other).includes(page)) err('hreflang', `${u} verwijst niet terug naar ${page}`);
    nPairs++;
  }
}

// ---------- verslag ----------
const out = { build: path.basename(DIR), paginas: nPages, html: htmlFiles.length, links: nLinks, jsonLd: nLd, hreflangParen: nPairs, urls: urlReport, fouten: errors, opmerkingen: notes };
fs.writeFileSync(path.join(ROOT, `.check-${path.basename(DIR)}.json`), JSON.stringify(out, null, 1));
console.log(`controle ${path.basename(DIR)}: ${htmlFiles.length} html-bestanden (${nPages} eigen pagina's), ${nLinks} interne verwijzingen, ${nLd} JSON-LD-blokken, ${nPairs} hreflang-paren`);
for (const [k, v] of Object.entries(urlReport)) console.log(`  URL's ${k}: ${v.ok ?? v.nieuw}/${v.totaal ?? v.online}${v.ontbreekt?.length ? ' ONTBREKEND: ' + v.ontbreekt.join(', ') : ''}${v.weg ? ` (weg: ${v.weg.length}, extra: ${v.extra.length})` : ''}`);
if (notes.length) console.log('  opmerkingen:\n   - ' + notes.slice(0, 20).join('\n   - '));
console.log(errors.length ? `  FOUTEN (${errors.length}):\n   - ` + errors.slice(0, 60).join('\n   - ') : '  0 fouten');
process.exitCode = errors.length ? 1 : 0;
