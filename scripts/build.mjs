// build.mjs: bouwt de volledige site als statische HTML in het nieuwe design.
//
// Gebruik:  node scripts/build.mjs --mode test   -> dist-test/  (noindex,nofollow op elke pagina, robots.txt: Disallow /)
//           node scripts/build.mjs --mode live   -> dist-live/  (index,follow volgens config/live-config.json, canonicals naar
//                                                                https://www.kempenwebstudio.be, sitemap.xml + robots.txt)
// Invoer: content/ (zie import-content.mjs). Elke pagina behoudt haar URL, teksten, title, description, canonical, hreflang,
// Open Graph en structured data (JSON-LD) letterlijk; header, footer, opmaak en script komen uit het nieuwe design.
// Voorbeeldsites van klanten (fictief) worden ongewijzigd overgenomen, met de juiste robots-waarde.
// Logica voor robots, sitemap en controles is overgenomen uit site/_build/maak-live.mjs.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import sharp from 'sharp';
import * as esbuild from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARGS = process.argv.slice(2);
const MODE = (ARGS[ARGS.indexOf('--mode') + 1] || 'test');
if (!['test', 'live'].includes(MODE)) throw new Error('--mode test|live');
const SRC = path.join(ROOT, 'content');
const OUT = path.join(ROOT, MODE === 'live' ? 'dist-live' : 'dist-test');
const CACHE = path.join(ROOT, '.cache');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'live-config.json'), 'utf8'));
const ORIGIN = CFG.origin.replace(/\/$/, '');
const DEMO = new Set(CFG.demoFolders);
const LANGS = { nl: 'nl-BE', fr: 'fr-BE', en: 'en' };
const today = new Date().toISOString().slice(0, 10);
const warn = [];
const t0 = Date.now();

// ---------- voorbereiden ----------
if (!OUT.startsWith(ROOT + path.sep) || !/dist-(test|live)$/.test(OUT)) throw new Error('Onveilige doelmap: ' + OUT);
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
const urlOf = rel => '/' + rel.split(path.sep).join('/').replace(/index\.html$/, '');
const baseOf = u => u.replace(/^\/(fr|en)(?=\/)/, '');
const langOf = u => (u.match(/^\/(fr|en)\//) || [, 'nl'])[1];
const hash = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 10);

// ---------- 1. bestanden uit content kopiëren (behalve de pagina's die we herbouwen) ----------
const pages = [], demoPages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(path.join(SRC, dir), { withFileTypes: true })) {
    const rel = dir ? path.join(dir, e.name) : e.name;
    if (!dir && (e.name.startsWith('_') || e.name === 'robots.txt' || e.name === 'sitemap.xml' || e.name === 'site.webmanifest' || e.name === 'favicon.ico')) continue;
    if (e.isDirectory()) { if (!dir && e.name === 'icons') continue; walk(rel); continue; }
    const top = rel.split(path.sep)[0];
    if (e.name.endsWith('.html') && !DEMO.has(top)) { pages.push(rel); continue; }
    if (e.name.endsWith('.html')) demoPages.push(rel);
    else write(rel, fs.readFileSync(path.join(SRC, rel)));
  }
})('');

// ---------- 2. beelden: AVIF naast elke WebP/JPG in /assets/img (zelfde afmetingen), met cache ----------
async function cached(key, make) {
  const f = path.join(CACHE, key);
  if (fs.existsSync(f)) return fs.readFileSync(f);
  const buf = await make(); fs.writeFileSync(f, buf); return buf;
}
const AVIF = new Set();
{
  const dir = path.join(SRC, 'assets', 'img');
  const list = fs.readdirSync(dir).filter(n => /\.(webp|jpe?g|png)$/i.test(n));
  const have = new Set(fs.readdirSync(dir));
  let i = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (i < list.length) {
      const n = list[i++]; const avif = n.replace(/\.(webp|jpe?g|png)$/i, '.avif');
      if (have.has(avif)) { AVIF.add('/assets/img/' + avif); continue; }
      const src = fs.readFileSync(path.join(dir, n));
      const buf = await cached('img-' + hash(src) + '.avif', () => sharp(src).avif({ quality: 58, effort: 5, chromaSubsampling: '4:2:0' }).toBuffer());
      if (buf.length < src.length * 0.98) { write(path.join('assets', 'img', avif), buf); AVIF.add('/assets/img/' + avif); }
    }
  }));
}
// hero-portret (home): AVIF + WebP in vier breedtes
const PORTRAIT = { widths: [360, 560, 760, 928], w: 928, h: 2128 };
{
  const src = fs.readFileSync(path.join(ROOT, 'design-bron', 'hero-portret.jpg'));
  for (const w of PORTRAIT.widths) {
    for (const [ext, opt] of [['avif', { quality: 55, effort: 5 }], ['webp', { quality: 78, effort: 5 }]]) {
      const buf = await cached(`hero-${hash(src)}-${w}.${ext}`, () => sharp(src).resize({ width: w }).toFormat(ext, opt).toBuffer());
      write(`assets/img/hero-portret-${w}.${ext}`, buf);
    }
  }
}
const portraitSet = ext => PORTRAIT.widths.map(w => `/assets/img/hero-portret-${w}.${ext} ${w}w`).join(', ');
const PORTRAIT_SIZES = '(min-width: 1024px) 480px, 100vw';

// ---------- 3. lettertype, iconen, OG-beeld, manifest ----------
write('assets/fonts/dm-sans-latin-wght.woff2', fs.readFileSync(path.join(ROOT, 'node_modules', '@fontsource-variable', 'dm-sans', 'files', 'dm-sans-latin-wght-normal.woff2')));
const MARK = (s = 30, bg = '#141416', sq = '#fff') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="${s}" height="${s}"><rect width="28" height="28" rx="8" fill="${bg}"/><rect x="6.5" y="6.5" width="6.5" height="6.5" rx="2" fill="#FB4D27"/><rect x="15" y="6.5" width="6.5" height="6.5" rx="2" fill="${sq}"/><rect x="6.5" y="15" width="6.5" height="6.5" rx="2" fill="${sq}"/><rect x="15" y="15" width="6.5" height="6.5" rx="2" fill="${sq}"/></svg>`;
const MARK_INLINE = '<svg class="lg-m" viewBox="0 0 28 28" aria-hidden="true" focusable="false"><rect width="28" height="28" rx="8" fill="#141416"/><rect x="6.5" y="6.5" width="6.5" height="6.5" rx="2" fill="#FB4D27"/><rect x="15" y="6.5" width="6.5" height="6.5" rx="2" fill="#fff"/><rect x="6.5" y="15" width="6.5" height="6.5" rx="2" fill="#fff"/><rect x="15" y="15" width="6.5" height="6.5" rx="2" fill="#fff"/></svg>';
{
  const svg = MARK(28);
  write('icons/kw.svg', svg);
  write('assets/brand/kw-logo.svg', svg); // zelfde pad als vroeger (o.a. gebruikt door oude verwijzingen)
  const png = {};
  for (const s of [16, 32, 48, 96, 180, 192, 512]) {
    const pad = s >= 180 ? Math.round(s * 0.1) : 0; // apple/maskable: wat ademruimte
    const inner = s - 2 * pad;
    png[s] = await sharp(Buffer.from(MARK(inner))).resize(inner, inner).extend({ top: pad, bottom: pad, left: pad, right: pad, background: s >= 180 ? '#e2e3e6' : { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    if (s >= 48) write(`icons/kw-${s}.png`, png[s]);
  }
  // favicon.ico met PNG-inhoud (16, 32, 48)
  const imgs = [16, 32, 48].map(s => png[s]);
  const head = Buffer.alloc(6 + 16 * imgs.length); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4);
  let off = head.length;
  imgs.forEach((b, i) => { const s = [16, 32, 48][i], o = 6 + 16 * i; head.writeUInt8(s, o); head.writeUInt8(s, o + 1); head.writeUInt8(0, o + 2); head.writeUInt8(0, o + 3); head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6); head.writeUInt32LE(b.length, o + 8); head.writeUInt32LE(off, o + 12); off += b.length; });
  write('favicon.ico', Buffer.concat([head, ...imgs]));
  write('site.webmanifest', JSON.stringify({ name: 'Kempen Webstudio', short_name: 'Kempen Webstudio', icons: [{ src: '/icons/kw-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icons/kw-512.png', sizes: '512x512', type: 'image/png' }, { src: '/icons/kw.svg', sizes: 'any', type: 'image/svg+xml' }], theme_color: '#e2e3e6', background_color: '#e2e3e6', display: 'browser' }));
}
const OG_IMAGE = fs.existsSync(path.join(ROOT, 'src', 'img', 'og-v3.jpg')) ? '/assets/og-v3.jpg' : '/assets/og-v2.jpg';
if (OG_IMAGE.endsWith('v3.jpg')) write('assets/og-v3.jpg', fs.readFileSync(path.join(ROOT, 'src', 'img', 'og-v3.jpg')));

// ---------- 4. CSS (inline) en JS (één klein bestand, defer) ----------
const CSS = (await esbuild.transform(fs.readFileSync(path.join(ROOT, 'src', 'css', 'site.css'), 'utf8'), { loader: 'css', minify: true, target: ['chrome109', 'safari15.4', 'firefox115'] })).code.trim();
const JS = (await esbuild.transform(fs.readFileSync(path.join(ROOT, 'src', 'js', 'site.js'), 'utf8'), { loader: 'js', minify: true, target: ['es2017'] })).code;
const JS_FILE = `/assets/site.${hash(JS)}.js`;
write(JS_FILE.slice(1), JS);

// ---------- 5. pagina's ----------
const ROBOTS = (url) => {
  if (MODE === 'test') return 'noindex,nofollow';
  const base = baseOf(url), top = base.split('/')[1];
  return CFG.noindex[base] || (DEMO.has(top) ? CFG.demoRobots : 'index,follow');
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const norm = s => s.replace(/\s+/g, ' ').trim();
const mainText = (doc, drop = '') => { const m = doc.querySelector('main').cloneNode(true); m.querySelectorAll('script,style,svg,noscript' + (drop ? ',' + drop : '')).forEach(e => e.remove()); return norm(m.textContent); };

function avifFor(srcset) { // "/assets/img/a-640.webp 640w, ..." -> avif-variant als alle bestanden bestaan
  const parts = srcset.split(',').map(s => s.trim()).filter(Boolean).map(p => { const [u, d] = p.split(/\s+/); return { u, d, a: u.replace(/\.(webp|jpe?g|png)$/i, '.avif') }; });
  if (!parts.length || !parts.every(p => AVIF.has(p.a))) return null;
  return parts.map(p => p.a + (p.d ? ' ' + p.d : '')).join(', ');
}
function upgradeImages(doc, scope) {
  for (const img of scope.querySelectorAll('img')) {
    const src = img.getAttribute('src') || '';
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    const pic = img.parentElement && img.parentElement.tagName === 'PICTURE' ? img.parentElement : null;
    if (pic) {
      if (pic.querySelector('source[type="image/avif"]')) continue;
      // elke bestaande bron (met of zonder media-query) krijgt een AVIF-tegenhanger vlak ervoor; daarna één voor het img zelf
      for (const s of [...pic.querySelectorAll('source')]) {
        const t = s.getAttribute('type'); if (t && t !== 'image/webp') continue;
        const a = avifFor(s.getAttribute('srcset') || ''); if (!a) continue;
        const n = s.cloneNode(false); n.setAttribute('type', 'image/avif'); n.setAttribute('srcset', a); pic.insertBefore(n, s);
      }
      const a = avifFor(img.getAttribute('srcset') || src);
      if (a) { const n = doc.createElement('source'); n.setAttribute('type', 'image/avif'); n.setAttribute('srcset', a); if (img.getAttribute('sizes')) n.setAttribute('sizes', img.getAttribute('sizes')); pic.insertBefore(n, img); }
      continue;
    }
    if (!src.startsWith('/assets/img/')) continue;
    const a = avifFor(img.getAttribute('srcset') || src);
    if (!a) continue;
    const p = doc.createElement('picture');
    const n = doc.createElement('source'); n.setAttribute('type', 'image/avif'); n.setAttribute('srcset', a);
    if (img.getAttribute('sizes')) n.setAttribute('sizes', img.getAttribute('sizes'));
    img.parentNode.insertBefore(p, img); p.appendChild(n); p.appendChild(img);
  }
}
const HL = { nl: /gratis demo/i, fr: /démo gratuite/i, en: /free demo/i };

const report = { pages: 0, textDiff: [], h1: [], perPage: [] };
const indexable = [];

for (const rel of pages) {
  const html = fs.readFileSync(path.join(SRC, rel), 'utf8');
  const { document: doc } = parseHTML(html);
  const url = urlOf(rel); const lang = langOf(url); const isHome = baseOf(url) === '/' ;
  const robots = ROBOTS(url);
  const before = mainText(doc, '.mcta6');

  // ---- head ----
  const H = doc.head; const get = s => H.querySelector(s);
  const title = doc.title;
  const desc = get('meta[name="description"]')?.getAttribute('content') || '';
  const canon = get('link[rel="canonical"]')?.getAttribute('href') || '';
  const metas = [...H.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')].map(m => {
    const k = m.getAttribute('property') ? 'property' : 'name', key = m.getAttribute(k); let v = m.getAttribute('content') || '';
    if (key === 'og:image' || key === 'twitter:image') v = ORIGIN + OG_IMAGE;
    return `<meta ${k}="${esc(key)}" content="${esc(v)}">`;
  });
  if (!metas.some(m => m.includes('twitter:title'))) metas.push(`<meta name="twitter:title" content="${esc(title)}">`);
  const alts = [...H.querySelectorAll('link[rel="alternate"][hreflang]')].map(l => `<link rel="alternate" hreflang="${esc(l.getAttribute('hreflang'))}" href="${esc(l.getAttribute('href'))}">`);
  const ld = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(s => `<script type="application/ld+json">${s.textContent.trim()}</script>`);
  const preloadImg = isHome ? `<link rel="preload" as="image" type="image/avif" imagesrcset="${portraitSet('avif')}" imagesizes="${PORTRAIT_SIZES}" fetchpriority="high">` : '';
  const head = [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
    `<title>${esc(title)}</title>`,
    desc ? `<meta name="description" content="${esc(desc)}">` : '',
    `<meta name="robots" content="${robots}">`,
    canon ? `<link rel="canonical" href="${esc(canon)}">` : '',
    ...alts,
    '<meta name="theme-color" content="#e2e3e6">', '<meta name="color-scheme" content="light">',
    ...metas,
    '<link rel="icon" href="/favicon.ico?v=3" sizes="any">', '<link rel="icon" href="/icons/kw.svg?v=3" type="image/svg+xml">',
    '<link rel="apple-touch-icon" href="/icons/kw-180.png?v=3">', '<link rel="manifest" href="/site.webmanifest?v=3">',
    '<link rel="preload" href="/assets/fonts/dm-sans-latin-wght.woff2" as="font" type="font/woff2" crossorigin>',
    preloadImg,
    `<style>${CSS}</style>`,
    `<script src="${JS_FILE}" defer></script>`,
    ...ld,
  ].filter(Boolean).join('\n');

  // ---- body: oude scripts/stijlen/effecten weg ----
  const B = doc.body;
  B.querySelectorAll('script:not([type="application/ld+json"]), style, link[rel="stylesheet"], .pre, .cur, .cur-dot, noscript').forEach(e => e.remove());
  B.querySelectorAll('script[type="application/ld+json"]').forEach(e => e.remove()); // staan al in de head
  B.querySelectorAll('.hero-fb, canvas.hero-gl, .hero-shade, svg.ribbon, aside.mcta6, a.case-mob').forEach(e => e.remove());
  B.querySelectorAll('[data-cursor]').forEach(e => e.removeAttribute('data-cursor'));
  B.querySelectorAll('.mag').forEach(e => e.classList.remove('mag'));
  B.querySelectorAll('.hero .rv, .hero.rv').forEach(e => { e.classList.remove('rv', 'rvd'); });
  B.removeAttribute('class');

  // ---- header ----
  const hdr = B.querySelector('header.hdr');
  if (hdr) {
    const lg = hdr.querySelector('.logo .lg'); if (lg) lg.outerHTML = MARK_INLINE;
    const burger = hdr.querySelector('.burger');
    if (burger) { burger.classList.remove('pill', 'pill-light'); burger.innerHTML = '<span class="bg-i" aria-hidden="true"><i></i><i></i></span>Menu'; }
    hdr.querySelector('.hdr-cta')?.classList.remove('pill', 'pill-dark');
    hdr.querySelector('.hdr-cta')?.classList.add('btn');
    const mnav = hdr.querySelector('.mnav-in');
    if (mnav) { const x = doc.createElement('button'); x.className = 'mnav-x'; x.type = 'button'; x.setAttribute('aria-label', { nl: 'Menu sluiten', fr: 'Fermer le menu', en: 'Close menu' }[lang]); mnav.insertBefore(x, mnav.firstChild); }
    // actief menu-item
    const here = baseOf(url);
    for (const a of hdr.querySelectorAll('.nav > a, .m-main > li > a')) {
      const t = baseOf(a.getAttribute('href') || '');
      if (t !== '/' && !t.includes('#') && (here === t || (t === '/kennis/' && here.startsWith('/kennis/')))) a.setAttribute('aria-current', 'page');
    }
  } else warn.push('geen header in ' + url);

  // ---- hero ----
  const hero = B.querySelector('main > section.hero');
  if (hero) {
    const card = hero.querySelector('.hero-card');
    if (isHome && card) {
      hero.classList.add('hero-home');
      const h1 = card.querySelector('h1');
      if (h1) { const re = HL[lang]; const m = h1.innerHTML.match(re); if (m) h1.innerHTML = h1.innerHTML.replace(re, `<span class="hl">${m[0]}</span>`); }
      const por = doc.createElement('div'); por.className = 'hero-por';
      por.innerHTML = `<picture><source type="image/avif" srcset="${portraitSet('avif')}" sizes="${PORTRAIT_SIZES}"><img src="/assets/img/hero-portret-760.webp" srcset="${portraitSet('webp')}" sizes="${PORTRAIT_SIZES}" width="${PORTRAIT.w}" height="${PORTRAIT.h}" alt="" fetchpriority="high" decoding="async"></picture>`;
      card.appendChild(por);
      const word = doc.createElement('div'); word.className = 'hero-word'; word.setAttribute('aria-hidden', 'true'); word.textContent = 'WEBSTUDIO K';
      card.appendChild(word);
      const side = doc.createElement('div'); side.className = 'hero-side';
      const trust = hero.querySelector('.hero-trust'); if (trust) side.appendChild(trust);
      card.appendChild(side);
    }
  } else warn.push('geen hero in ' + url);

  // ---- beelden ----
  upgradeImages(doc, B);
  for (const img of B.querySelectorAll('main img')) {
    if (img.closest('.hero')) { img.removeAttribute('loading'); continue; }
    img.removeAttribute('fetchpriority'); // alleen het hero-beeld krijgt voorrang
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  }

  // ---- footer ----
  const ftr = B.querySelector('footer.ftr');
  if (ftr) {
    const li = ftr.querySelector('.ftr-logo img'); if (li) li.outerHTML = MARK_INLINE;
    ftr.querySelector('.ftr-big')?.parentElement?.remove();
  }
  // ---- zwevende knop: tweede link (bellen) als icoon met verborgen label ----
  const mbar = B.querySelector('.mbar');
  if (mbar) {
    const call = mbar.querySelector('a[href^="tel:"]');
    if (call) { call.innerHTML = `<span class="ml">${esc(call.textContent.trim())}</span>`; }
    mbar.setAttribute('aria-label', 'Contact'); mbar.setAttribute('role', 'complementary');
    mbar.classList.add('hide');
  }

  // ---- controles per pagina ----
  const after = mainText(doc, '.hero-word');
  if (before !== after) {
    const a = before.split(' '), b = after.split(' '); let i = 0; while (i < a.length && a[i] === b[i]) i++;
    report.textDiff.push({ url, at: i, voor: a.slice(Math.max(0, i - 5), i + 12).join(' '), na: b.slice(Math.max(0, i - 5), i + 12).join(' ') });
  }
  const h1s = B.querySelectorAll('h1').length; if (h1s !== 1) report.h1.push(`${url}: ${h1s}x h1`);
  for (const im of B.querySelectorAll('img')) if (!im.hasAttribute('alt')) warn.push(`img zonder alt op ${url}: ${im.getAttribute('src')}`);
  if (/Bijgewerkt op|Mis à jour le|Updated on/i.test(B.textContent)) warn.push('"Bijgewerkt op" op ' + url);
  if (/zenrixa|aistudio|webstudiok\.be/i.test(html)) warn.push('template-restant in ' + url);
  if (robots === 'index,follow' && url !== '/404.html') {
    if (canon !== ORIGIN + url) warn.push(`canonical ${url}: ${canon || 'ontbreekt'}`);
    indexable.push({ url, base: baseOf(url), lang, ld: ld.join('') });
  }

  const out = `<!doctype html>\n<html lang="${esc(doc.documentElement.getAttribute('lang') || LANGS[lang])}">\n<head>\n${head}\n</head>\n<body>\n${B.innerHTML.trim()}\n</body>\n</html>\n`;
  write(rel, out);
  report.pages++;
  report.perPage.push({ url, bytes: Buffer.byteLength(out) });
}

// ---------- 6. voorbeeldsites: ongewijzigd, met juiste robots ----------
for (const rel of demoPages) {
  let s = fs.readFileSync(path.join(SRC, rel), 'utf8'); const url = urlOf(rel); const want = ROBOTS(url);
  const re = /<meta name="robots" content="[^"]*">/;
  if (re.test(s)) s = s.replace(re, `<meta name="robots" content="${want}">`);
  else if (want !== 'index,follow') s = s.replace('</head>', `<meta name="robots" content="${want}">\n</head>`);
  write(rel, s);
}

// ---------- 7. robots.txt en sitemap.xml ----------
if (MODE === 'live') {
  write('robots.txt', CFG.robotsTxt);
  const online = fs.readFileSync(path.join(ROOT, 'config', 'sitemap-online.xml'), 'utf8');
  const order = [...online.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const oldMod = Object.fromEntries([...online.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map(m => [m[1], m[2]]));
  const rank = u => { const i = order.indexOf(u); return i < 0 ? 1e4 + u.length : i; };
  const byBase = {};
  for (const p of indexable) (byBase[p.base] = byBase[p.base] || {})[p.lang] = ORIGIN + p.url;
  const items = indexable.map(p => {
    const loc = ORIGIN + p.url, alts = byBase[p.base];
    // het design is overal nieuw: lastmod = vandaag (de inhoud zelf is gelijk gebleven; dateModified in de JSON-LD blijft ongewijzigd)
    return { loc, lastmod: today, alts: Object.keys(alts).length > 1 ? alts : null, nl: alts.nl, old: oldMod[loc] };
  }).sort((a, b) => rank(a.nl || a.loc) - rank(b.nl || b.loc) || a.loc.localeCompare(b.loc));
  const altXml = i => i.alts ? Object.entries(i.alts).map(([l, u]) => `<xhtml:link rel="alternate" hreflang="${LANGS[l]}" href="${u}"/>`).join('') + (i.alts.nl ? `<xhtml:link rel="alternate" hreflang="x-default" href="${i.alts.nl}"/>` : '') : '';
  write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    items.map(i => `  <url><loc>${i.loc}</loc><lastmod>${i.lastmod}</lastmod>${altXml(i)}</url>`).join('\n') + '\n</urlset>\n');
  report.sitemap = items.length;
} else {
  write('robots.txt', 'User-agent: *\nDisallow: /\n');
}

// ---------- verslag ----------
const kb = n => (n / 1024).toFixed(0) + ' kB';
const sizes = report.perPage.map(p => p.bytes).sort((a, b) => a - b);
console.log(`${OUT} (${MODE}) klaar in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
console.log(`  ${report.pages} pagina's in het nieuwe design + ${demoPages.length} voorbeeldsite-pagina's ongewijzigd${report.sitemap ? `, ${report.sitemap} URL's in sitemap.xml` : ''}`);
console.log(`  HTML per pagina: ${kb(sizes[0])} – ${kb(sizes[sizes.length - 1])} (inline CSS ${kb(CSS.length)}), JS ${kb(JS.length)}, AVIF-varianten: ${AVIF.size}`);
if (report.textDiff.length) { console.log(`  TEKSTVERSCHIL op ${report.textDiff.length} pagina's:`); for (const d of report.textDiff.slice(0, 10)) console.log(`   - ${d.url} @${d.at}\n       voor: ${d.voor}\n       na:   ${d.na}`); }
else console.log('  teksten: op elke pagina woord voor woord gelijk aan de bron');
if (report.h1.length) warn.push('h1: ' + report.h1.join(', '));
console.log(warn.length ? '  LET OP:\n   - ' + warn.join('\n   - ') : '  controles: geen problemen');
fs.writeFileSync(path.join(OUT, '..', `.build-${MODE}.json`), JSON.stringify({ ...report, warn }, null, 1));
process.exitCode = warn.length || report.textDiff.length ? 1 : 0;
