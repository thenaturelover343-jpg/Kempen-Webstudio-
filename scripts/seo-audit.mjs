// seo-audit.mjs: strenge on-site SEO-audit van een build (standaard dist-live), alle pagina's.
// Controleert per indexeerbare pagina: title/description (lengte, zoekwoord vooraan), één H1, kopstructuur (geen sprongen),
// woordenaantal in <main>, inkomende interne links + ankers, weespagina's, JSON-LD (parse, types, verplichte velden, @id-verwijzingen),
// hreflang (wederkerig, self, x-default), canonical, sitemap + image-sitemap, robots/llms, alt, OG/Twitter, kruimelpad (zichtbaar + schema),
// 404, kannibalisatie (zelfde title-kern), dubbele content tussen stadspagina's (shingles), doelpagina per zoekwoord uit seo-data/volumes.csv.
// Gebruik: node scripts/seo-audit.mjs [dist-live] [--json uit.json]
import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';

const DIR = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'dist-live');
const JSON_OUT = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;
const ORIGIN = 'https://www.kempenwebstudio.be';
const err = [], warn = [], info = [];
const E = (k, m) => err.push(`[${k}] ${m}`), W = (k, m) => warn.push(`[${k}] ${m}`);

// ---------- alle html-pagina's ----------
const pages = new Map(); // url-pad -> {file, doc, html}
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (!['assets', 'icons'].includes(e.name)) walk(f); continue; }
    if (e.name !== 'index.html') continue;
    const rel = '/' + path.relative(DIR, path.dirname(f)).split(path.sep).filter(Boolean).join('/');
    const u = rel === '/' ? '/' : rel + '/';
    const html = fs.readFileSync(f, 'utf8');
    if (/http-equiv="refresh"/i.test(html) && html.length < 3000) continue; // redirect-stub
    pages.set(u, { file: f, html, doc: parseHTML(html).document });
  }
})(DIR);

const sm = fs.readFileSync(path.join(DIR, 'sitemap.xml'), 'utf8');
const smUrls = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => ({ loc: m[1].match(/<loc>([^<]+)/)[1].replace(ORIGIN, ''), imgs: [...m[1].matchAll(/<image:loc>([^<]+)/g)].map(x => x[1]), alts: [...m[1].matchAll(/xhtml:link[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g)].map(x => [x[1], x[2]]), lastmod: (m[1].match(/<lastmod>([^<]+)/) || [])[1] }));
const smSet = new Set(smUrls.map(s => s.loc));

const robotsOf = d => (d.querySelector('meta[name=robots]')?.getAttribute('content') || 'index,follow');
const indexable = [...pages].filter(([u, p]) => !/noindex/.test(robotsOf(p.doc))).map(([u]) => u);
const langOf = u => u.startsWith('/fr/') ? 'fr' : u.startsWith('/en/') ? 'en' : 'nl';

// ---------- robots, llms, 404 ----------
const robots = fs.readFileSync(path.join(DIR, 'robots.txt'), 'utf8');
if (!/Sitemap:\s*https:\/\/www\.kempenwebstudio\.be\/sitemap\.xml/.test(robots)) E('robots', 'geen Sitemap-regel');
if (/Disallow:\s*\/\s*$/m.test(robots)) E('robots', 'Disallow: / blokkeert alles');
const llms = fs.existsSync(path.join(DIR, 'llms.txt')) ? fs.readFileSync(path.join(DIR, 'llms.txt'), 'utf8') : '';
if (!llms) E('llms', 'geen llms.txt'); else {
  for (const u of indexable) if (!llms.includes(ORIGIN + u + ')') && !llms.includes(ORIGIN + u + ' ')) W('llms', `ontbreekt in llms.txt: ${u}`);
}
const p404 = fs.existsSync(path.join(DIR, '404.html')) ? parseHTML(fs.readFileSync(path.join(DIR, '404.html'), 'utf8')).document : null;
if (!p404) E('404', 'geen 404.html'); else {
  if (!/noindex/.test(robotsOf(p404))) E('404', '404 niet op noindex');
  if (p404.querySelectorAll('main a[href]').length < 3) W('404', '404 heeft weinig links verder');
}

// ---------- interne links ----------
const inbound = new Map(indexable.map(u => [u, []]));
const norm = (href, from) => {
  if (!href || /^(mailto|tel|javascript|data):/.test(href) || href.startsWith('#')) return null;
  let x; try { x = new URL(href, ORIGIN + from); } catch { return null; }
  if (x.origin !== ORIGIN) return null;
  let p = x.pathname; if (!p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p += '/';
  return p;
};
for (const [u, p] of pages) {
  const main = p.doc.querySelector('main') || p.doc.body;
  const seen = new Set();
  for (const a of p.doc.querySelectorAll('a[href]')) {
    const t = norm(a.getAttribute('href'), u); if (!t || t === u) continue;
    if (!pages.has(t) && !/\.[a-z0-9]+$/i.test(t)) E('link', `kapotte interne link ${u} -> ${t}`);
    if (!inbound.has(t)) continue;
    const inMain = main.contains(a);
    const anchor = (a.textContent || a.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
    if (!seen.has(t + inMain)) { inbound.get(t).push({ from: u, anchor, inMain }); seen.add(t + inMain); }
  }
}
const ZWAK_ANKER = /^(lees meer|meer|klik hier|hier|bekijk|lire la suite|en savoir plus|read more|more|ici|here)$/i;
const linkStats = [];
for (const [t, l] of inbound) {
  const ctx = l.filter(x => x.inMain), uniq = new Set(ctx.map(x => x.from));
  linkStats.push({ url: t, totaal: new Set(l.map(x => x.from)).size, inhoud: uniq.size, ankers: [...new Set(ctx.map(x => x.anchor))].slice(0, 8) });
  if (t !== '/' && l.length === 0) E('wees', `weespagina zonder inkomende link: ${t}`);
  else if (t !== '/' && uniq.size === 0) W('links', `alleen menu/footer-links, geen contextuele link: ${t}`);
  else if (t !== '/' && uniq.size < 2 && !/privacy|cookie|bedankt|confidentialite|politique|privacy-policy|cookie-policy|merci|thank/.test(t)) W('links', `slechts ${uniq.size} contextuele inkomende link: ${t}`);
  for (const x of ctx) if (ZWAK_ANKER.test(x.anchor)) W('anker', `zwak anker "${x.anchor}" ${x.from} -> ${t}`);
}

// ---------- per pagina ----------
const rows = [];
const textOf = el => (el?.textContent || '').replace(/\s+/g, ' ').trim();
const words = s => (s.match(/[\p{L}\p{N}€][\p{L}\p{N}'’.,€-]*/gu) || []).length;
const ldAll = new Map();
const ldIds = new Set();
for (const u of indexable) {
  const { doc: d, html } = pages.get(u);
  const lang = langOf(u);
  const t = d.title.trim(), desc = d.querySelector('meta[name=description]')?.getAttribute('content') || '';
  const h1s = [...d.querySelectorAll('h1')].map(textOf);
  const main = d.querySelector('main');
  // woorden in main zonder aria-hidden-duplicaten (marquee e.d.)
  const clone = main.cloneNode(true); for (const x of clone.querySelectorAll('[aria-hidden="true"],script,style,template,svg')) x.remove();
  const wc = words(textOf(clone));
  if ([...t].length > 60) E('title', `${[...t].length} tekens: ${u}`);
  if ([...t].length < 30) W('title', `kort (${[...t].length}): ${u} "${t}"`);
  if ([...desc].length > 155 || [...desc].length < 110) W('desc', `${[...desc].length} tekens: ${u}`);
  if (h1s.length !== 1) E('h1', `${h1s.length}x H1: ${u}`);
  // kopstructuur
  let prev = 1; const heads = [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')];
  for (const h of heads) { const lv = +h.tagName[1]; if (lv > prev + 1) { W('koppen', `sprong h${prev}→h${lv} op ${u}: "${textOf(h).slice(0, 50)}"`); } prev = lv; }
  if (!heads.some(h => h.tagName === 'H2')) W('koppen', `geen H2: ${u}`);
  for (const h of heads) if (!textOf(h)) E('koppen', `lege ${h.tagName}: ${u}`);
  // canonical, hreflang
  const can = d.querySelector('link[rel=canonical]')?.getAttribute('href');
  if (can !== ORIGIN + u) E('canonical', `${u} -> ${can}`);
  const hl = [...d.querySelectorAll('link[rel=alternate][hreflang]')].map(l => [l.getAttribute('hreflang'), l.getAttribute('href')]);
  const htmlLang = d.documentElement.getAttribute('lang');
  if (!htmlLang || !htmlLang.toLowerCase().startsWith(lang)) E('lang', `html lang="${htmlLang}" op ${u}`);
  if (hl.length) {
    if (!hl.some(([l, h]) => h === ORIGIN + u)) E('hreflang', `geen self-referentie: ${u}`);
    if (!hl.some(([l]) => l === 'x-default')) E('hreflang', `geen x-default: ${u}`);
    for (const [l, h] of hl) {
      const tu = h.replace(ORIGIN, ''); if (tu === u) continue;
      const tp = pages.get(tu);
      if (!tp) { E('hreflang', `${u} -> ${l} ${tu} bestaat niet`); continue; }
      if (/noindex/.test(robotsOf(tp.doc))) E('hreflang', `${u} -> ${l} ${tu} is noindex`);
      const back = [...tp.doc.querySelectorAll('link[rel=alternate][hreflang]')].map(x => x.getAttribute('href'));
      if (!back.includes(ORIGIN + u) && l !== 'x-default') E('hreflang', `niet wederkerig: ${u} -> ${tu}`);
    }
    const smE = smUrls.find(s => s.loc === u);
    if (smE && smE.alts.length && smE.alts.length !== hl.length) W('sitemap', `hreflang in sitemap (${smE.alts.length}) ≠ head (${hl.length}): ${u}`);
  } else info.push(`geen vertaling (geen hreflang nodig): ${u}`);
  if (!smSet.has(u)) E('sitemap', `indexeerbare pagina niet in sitemap: ${u}`);
  // OG / Twitter
  for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'og:locale', 'og:image:alt']) if (!d.querySelector(`meta[property="${k}"]`)) E('og', `${k} ontbreekt: ${u}`);
  for (const k of ['twitter:card', 'twitter:title', 'twitter:description']) if (!d.querySelector(`meta[name="${k}"]`)) E('og', `${k} ontbreekt: ${u}`);
  if (d.querySelector('meta[property="og:url"]')?.getAttribute('content') !== ORIGIN + u) E('og', `og:url ≠ canonical: ${u}`);
  const ogImg = d.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  if (ogImg && !fs.existsSync(path.join(DIR, ogImg.replace(ORIGIN, '')))) E('og', `og:image bestand ontbreekt: ${u}`);
  // alt
  for (const i of d.querySelectorAll('img')) {
    if (!i.hasAttribute('alt')) E('alt', `img zonder alt: ${u} ${i.getAttribute('src')}`);
    else if (!i.getAttribute('alt').trim() && !i.closest('[aria-hidden="true"]') && i.getAttribute('role') !== 'presentation') {
      const inLink = i.closest('a'); if (inLink && !textOf(inLink) && !inLink.getAttribute('aria-label')) E('alt', `link met enkel leeg-alt beeld: ${u}`);
    }
    if (/\.(png|jpe?g)$/i.test(i.getAttribute('src') || '') && !i.closest('picture')) W('beeld', `geen modern formaat: ${u} ${i.getAttribute('src')}`);
    if (!i.getAttribute('width') || !i.getAttribute('height')) W('cls', `img zonder width/height: ${u} ${i.getAttribute('src')}`);
  }
  // kruimelpad
  const crumbVis = !!d.querySelector('[aria-label="Kruimelpad"],[aria-label="Fil d’Ariane"],[aria-label="Fil d\'Ariane"],[aria-label="Breadcrumb"],nav[aria-label*="ruimel"],nav[aria-label*="riane"],nav[aria-label*="readcrumb"]');
  // JSON-LD
  const types = [];
  for (const s of d.querySelectorAll('script[type="application/ld+json"]')) {
    let j; try { j = JSON.parse(s.textContent); } catch (e) { E('schema', `ongeldige JSON-LD op ${u}: ${e.message}`); continue; }
    const items = j['@graph'] || (Array.isArray(j) ? j : [j]);
    for (const it of items) {
      const ty = [].concat(it['@type'] || '?'); types.push(...ty);
      if (it['@id']) ldIds.add(it['@id']);
      checkSchema(u, it, ty);
    }
    ldAll.set(u, (ldAll.get(u) || []).concat(items));
  }
  if (u !== '/' && u !== '/fr/' && u !== '/en/' && !types.includes('BreadcrumbList')) W('schema', `geen BreadcrumbList: ${u}`);
  if (u !== '/' && u !== '/fr/' && u !== '/en/' && !crumbVis) W('kruimel', `geen zichtbaar kruimelpad: ${u}`);
  if (/\/(kennis|conseils|guides)\/./.test(u) && !types.some(x => /Article/.test(x))) E('schema', `kennisartikel zonder Article: ${u}`);
  const faqQ = [...d.querySelectorAll('main details summary, main .fq6 h3, main [data-faq] h3')].length;
  const h2txt = heads.filter(h => h.tagName === 'H2').map(textOf).join(' ');
  // E-E-A-T: NAP en ondernemingsnummer in de footer van elke indexeerbare pagina
  const foot = textOf(d.querySelector('footer'));
  if (!/Kemelbeekstraat 16/.test(foot) || !/2460 Kasterlee/.test(foot) || !/\+32 14 71 80 80/.test(foot)) E('nap', `NAP niet volledig in footer: ${u}`);
  if (!/0897\.577\.919/.test(foot)) E('eeat', `ondernemingsnummer niet in footer: ${u}`);
  rows.push({ url: u, lang, h2txt, title: t, tlen: [...t].length, desc, dlen: [...desc].length, h1: h1s[0] || '', woorden: wc, h2: heads.filter(h => h.tagName === 'H2').length, h3: heads.filter(h => h.tagName === 'H3').length, faq: faqQ, types: [...new Set(types)], kruimel: crumbVis });
}

function checkSchema(u, it, ty) {
  const need = {
    Organization: ['name', 'url'], ProfessionalService: ['name', 'address', 'telephone'], LocalBusiness: ['name', 'address'],
    WebSite: ['name', 'url'], WebPage: ['name', 'url'], Service: ['name', 'provider'], FAQPage: ['mainEntity'],
    BreadcrumbList: ['itemListElement'], Article: ['headline', 'datePublished', 'author', 'publisher'], BlogPosting: ['headline', 'datePublished', 'author'],
    Offer: ['priceCurrency'], ContactPage: ['name'], AboutPage: ['name'], CollectionPage: ['name'], ItemList: ['itemListElement'], HowTo: ['name', 'step'],
  };
  for (const t of ty) for (const k of need[t] || []) if (it[k] == null || (Array.isArray(it[k]) && !it[k].length)) E('schema', `${t} mist ${k}: ${u}`);
  if (ty.includes('FAQPage')) for (const q of it.mainEntity || []) { if (q['@type'] !== 'Question' || !q.name || !q.acceptedAnswer?.text) E('schema', `FAQ-vraag onvolledig: ${u}`); }
  if (ty.includes('BreadcrumbList')) (it.itemListElement || []).forEach((li, i) => {
    if (li.position !== i + 1 || !li.name || !li.item) E('schema', `Breadcrumb item ${i + 1} onvolledig: ${u}`);
    else if (!pages.has(li.item.replace(ORIGIN, ''))) E('schema', `Breadcrumb naar onbekende pagina ${li.item}: ${u}`);
  });
  if (it.aggregateRating || it.review) E('schema', `rating/review in schema zonder echte reviews: ${u}`);
  for (const k of ['datePublished', 'dateModified']) if (it[k] && !/^\d{4}-\d{2}-\d{2}/.test(it[k])) E('schema', `${k} geen ISO-datum: ${u}`);
  for (const [k, v] of Object.entries(it)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && v['@type']) checkSchema(u, v, [].concat(v['@type']));
    if (Array.isArray(v)) for (const x of v) if (x && typeof x === 'object' && x['@type'] && k !== 'mainEntity' && k !== 'itemListElement') checkSchema(u, x, [].concat(x['@type']));
  }
}
// @id-verwijzingen die nergens gedefinieerd zijn
for (const [u, items] of ldAll) {
  const refs = JSON.stringify(items).match(/\{"@id":"[^"]+"\}/g) || [];
  for (const r of refs) { const id = JSON.parse(r)['@id']; if (!ldIds.has(id)) W('schema', `@id-verwijzing zonder definitie ${id} op ${u}`); }
}

// sitemap-entries die niet indexeerbaar zijn
for (const s of smUrls) {
  const p = pages.get(s.loc);
  if (!p) E('sitemap', `sitemap-URL bestaat niet: ${s.loc}`);
  else if (/noindex/.test(robotsOf(p.doc))) E('sitemap', `noindex-pagina in sitemap: ${s.loc}`);
  for (const im of s.imgs) if (!fs.existsSync(path.join(DIR, im.replace(ORIGIN, '')))) E('sitemap', `image-sitemap bestand ontbreekt: ${im}`);
  if (!s.lastmod) W('sitemap', `geen lastmod: ${s.loc}`);
}
const imgCount = smUrls.reduce((a, s) => a + s.imgs.length, 0);

// ---------- kannibalisatie: zelfde title-kern binnen een taal ----------
const kern = t => t.split('|')[0].toLowerCase().replace(/[^\p{L}\p{N} ]/gu, ' ').replace(/\s+/g, ' ').trim();
const kmap = new Map();
for (const r of rows) { const k = r.lang + ':' + kern(r.title); (kmap.get(k) || kmap.set(k, []).get(k)).push(r.url); }
for (const [k, us] of kmap) if (us.length > 1) E('kannibalisatie', `zelfde title-kern "${k}": ${us.join(', ')}`);
const h1map = new Map();
for (const r of rows) { const k = r.lang + ':' + r.h1.toLowerCase(); (h1map.get(k) || h1map.set(k, []).get(k)).push(r.url); }
for (const [k, us] of h1map) if (us.length > 1) E('kannibalisatie', `zelfde H1 "${k}": ${us.join(', ')}`);

// ---------- dubbele content tussen stadspagina's ----------
const STAD = /\/(website-laten-maken-(?!belgie)[a-z-]+|creation-site-internet-[a-z-]+|web-design-[a-z-]+)\/$/;
const shingles = u => {
  const main = pages.get(u).doc.querySelector('main').cloneNode(true);
  for (const x of main.querySelectorAll('[aria-hidden="true"],script,style,svg,nav,.kw-gallery,#in-uw-regio,#dans-votre-region,#in-your-region')) x.remove();
  const w = textOf(main).toLowerCase().replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean);
  const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s;
};
const steden = rows.filter(r => STAD.test(r.url));
const sh = new Map(steden.map(r => [r.url, shingles(r.url)]));
const dup = [];
for (let i = 0; i < steden.length; i++) for (let j = i + 1; j < steden.length; j++) {
  const a = sh.get(steden[i].url), b = sh.get(steden[j].url); if (steden[i].lang !== steden[j].lang) continue;
  let n = 0; for (const x of a) if (b.has(x)) n++;
  const sim = n / Math.min(a.size, b.size);
  dup.push({ a: steden[i].url, b: steden[j].url, sim: +sim.toFixed(2) });
  if (sim > 0.5) E('duplicaat', `${Math.round(sim * 100)}% overlap: ${steden[i].url} ~ ${steden[j].url}`);
  else if (sim > 0.35) W('duplicaat', `${Math.round(sim * 100)}% overlap: ${steden[i].url} ~ ${steden[j].url}`);
}

// ---------- dunne content ----------
// overzichtspagina's (kennisbank, voorbeelden) zijn lijsten met links: lagere drempel
const MIN = u => /\/(contact|bedankt|merci|thank-you|privacy|cookie|confidentialite|politique|over-ons|a-propos|about)/.test(u) ? 150 : /^\/((fr|en)\/)?(kennis|conseils)\/$/.test(u) ? 300 : u.match(/voorbeeldontwerpen|exemples|examples/) ? 200 : 600;
for (const r of rows) if (r.woorden < MIN(r.url)) W('dun', `${r.woorden} woorden: ${r.url}`);

// ---------- zoekwoorden uit volumes.csv -> doelpagina ----------
const vol = (() => {
  const f = path.resolve('..', 'seo-data', 'volumes.csv'); if (!fs.existsSync(f)) return [];
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/).filter(Boolean); lines.shift();
  return lines.map(l => { const c = l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map(x => x.replace(/,$/, '').replace(/^"|"$/g, '')); return { kw: c[0], taal: c[2], vol: c[4] }; });
})();
const fold = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const STOP = new Set(['de', 'het', 'een', 'van', 'in', 'un', 'une', 'le', 'la', 'site', 'laten']);
const kwRows = [];
for (const k of vol) {
  const toks = fold(k.kw).split(' ').filter(x => !STOP.has(x));
  const lang = k.taal === 'fr' ? 'fr' : 'nl';
  let best = null, bs = -1;
  for (const r of rows.filter(r => r.lang === lang)) {
    const hay = fold(r.title + ' ' + r.h1 + ' ' + r.h2txt + ' ' + r.url.replace(/[-/]/g, ' '));
    const tt = fold(r.title + ' ' + r.h1);
    const sc = toks.filter(x => hay.includes(x)).length + (tt.includes(fold(k.kw)) ? 2 : 0) + toks.filter(x => tt.includes(x)).length * 0.1;
    if (sc > bs) { bs = sc; best = r; }
  }
  const ok = best && toks.every(x => fold(best.title + ' ' + best.h1 + ' ' + best.h2txt + ' ' + best.url.replace(/[-/]/g, ' ')).includes(x));
  kwRows.push({ zoekwoord: k.kw, taal: k.taal, volume: k.vol, doel: best?.url, title: best?.title, dekt: ok });
  if (ok) info.push(`zoekwoord "${k.kw}" (${k.vol}) -> ${best.url}`);
  if (!ok && !/gratuit|gratis|shopify|wordpress/.test(k.kw)) W('zoekwoord', `geen sterke doelpagina voor "${k.kw}" (${k.vol}); beste: ${best?.url}`);
}

// ---------- uitvoer ----------
console.log(`${pages.size} pagina's, ${indexable.length} indexeerbaar, sitemap ${smUrls.length} URL's + ${imgCount} beelden`);
console.log(`\nFOUTEN (${err.length})`); err.forEach(x => console.log('  ' + x));
console.log(`\nWAARSCHUWINGEN (${warn.length})`); warn.forEach(x => console.log('  ' + x));
if (process.argv.includes('--info')) { console.log(`\nINFO (${info.length})`); info.forEach(x => console.log('  ' + x)); }
if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify({ rows, linkStats, dup, kwRows, err, warn }, null, 1));
process.exitCode = err.length ? 1 : 0;
