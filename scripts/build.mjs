// build.mjs: bouwt de volledige site als statische HTML in het design van Webstudio K.
//
// Gebruik:  node scripts/build.mjs --mode test   -> dist-test/  (noindex,nofollow op elke pagina, robots.txt: Disallow /)
//           node scripts/build.mjs --mode live   -> dist-live/  (index,follow volgens config/live-config.json, canonicals naar
//                                                                https://www.kempenwebstudio.be, sitemap.xml + robots.txt)
// Hoe:
//  - de designcomponenten (src/design/*.tsx, overgenomen uit het design) worden met React gerenderd naar HTML, alleen
//    tijdens de build; de CSS maakt Tailwind uit dezelfde klassen (src/css/site.css = index.css van het design);
//  - de inhoud komt uit content/ (de bestaande site): src/site/model.mjs leest teksten, links en blokken per pagina;
//  - per pagina blijven URL, title, description, canonical, hreflang, Open Graph en JSON-LD letterlijk behouden;
//  - controle: elke tekst van de oude pagina moet op de nieuwe pagina staan; nieuwe designteksten worden gelijst;
//  - voorbeeldsites van klanten (fictief) worden ongewijzigd overgenomen, met de juiste robots-waarde (zoals maak-live).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseHTML } from 'linkedom';
import sharp from 'sharp';
import subsetFont from 'subset-font';
import * as esbuild from 'esbuild';
import { parse, shellModel, formModel, heroModel, blocksModel, homeModel } from '../src/site/model.mjs';
import DD from '../src/site/design-data.json' with { type: 'json' };

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

if (!OUT.startsWith(ROOT + path.sep) || !/dist-(test|live)$/.test(OUT)) throw new Error('Onveilige doelmap: ' + OUT);
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });
const write = (rel, data) => { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
const urlOf = rel => '/' + rel.split(path.sep).join('/').replace(/index\.html$/, '');
const { baseOf, FR_SLUGS } = await import(pathToFileURL(path.join(ROOT, 'src', 'site', 'slugs.mjs')).href);
const langOf = u => (u.match(/^\/(fr|en)\//) || [, 'nl'])[1];
const hash = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 10);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const norm = s => (s || '').replace(/\s+/g, ' ').trim();
async function cached(key, make) { const f = path.join(CACHE, key); if (fs.existsSync(f)) return fs.readFileSync(f); const b = await make(); fs.writeFileSync(f, b); return b; }

// ---------- 1. bestanden uit content kopiëren (behalve de pagina's die we herbouwen) ----------
const pages = [], demoPages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(path.join(SRC, dir), { withFileTypes: true })) {
    const rel = dir ? path.join(dir, e.name) : e.name;
    if (!dir && (e.name.startsWith('_') || ['robots.txt', 'sitemap.xml', 'site.webmanifest', 'favicon.ico'].includes(e.name))) continue;
    if (e.isDirectory()) { if (!dir && e.name === 'icons') continue; walk(rel); continue; }
    const top = rel.split(path.sep)[0];
    if (e.name.endsWith('.html') && !DEMO.has(top)) { pages.push(rel); continue; }
    if (e.name.endsWith('.html')) demoPages.push(rel); else write(rel, fs.readFileSync(path.join(SRC, rel)));
  }
})('');

// ---------- 2. beelden: AVIF naast elke WebP/JPG in /assets/img; hero-portret ----------
const AVIF = new Set();
{
  const dir = path.join(SRC, 'assets', 'img'); const list = fs.readdirSync(dir).filter(n => /\.(webp|jpe?g|png)$/i.test(n)); const have = new Set(fs.readdirSync(dir)); let i = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (i < list.length) {
      const n = list[i++]; const avif = n.replace(/\.(webp|jpe?g|png)$/i, '.avif');
      if (have.has(avif)) { AVIF.add('/assets/img/' + avif); continue; }
      const src = fs.readFileSync(path.join(dir, n));
      const buf = await cached('img-' + hash(src) + '.avif', () => sharp(src).avif({ quality: 58, effort: 5 }).toBuffer());
      if (buf.length < src.length * 0.98) { write(path.join('assets', 'img', avif), buf); AVIF.add('/assets/img/' + avif); }
    }
  }));
}
// Het design toont het portret in een 3:4-kader met object-position 50% 10%. We snijden precies dat zichtbare deel
// uit (zelfde beeld, kleiner bestand): bron 928x2128 -> 928x1237 vanaf y = 10% van (2128-1237).
{
  const src = fs.readFileSync(path.join(ROOT, 'design-bron', 'hero-portret.jpg'));
  const W0 = 928, H0 = 2128, H = Math.round(W0 * 4 / 3), top = Math.round(0.1 * (H0 - H));
  for (const w of [360, 560, 760, 928]) for (const [ext, opt] of [['avif', { quality: 60, effort: 5 }], ['webp', { quality: 80, effort: 5 }]]) {
    const buf = await cached(`por3-${hash(src)}-${w}.${ext}`, () => sharp(src).extract({ left: 0, top, width: W0, height: H }).resize({ width: w }).toFormat(ext, opt).toBuffer());
    write(`assets/img/hero-portret-${w}.${ext}`, buf);
  }
}

// ---------- 3. iconen, OG-beeld, manifest ----------
const MARK = (s = 28) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="${s}" height="${s}"><rect width="28" height="28" rx="8" fill="#141416"/><rect x="6.5" y="6.5" width="6.5" height="6.5" rx="2" fill="#FB4D27"/><rect x="15" y="6.5" width="6.5" height="6.5" rx="2" fill="#fff"/><rect x="6.5" y="15" width="6.5" height="6.5" rx="2" fill="#fff"/><rect x="15" y="15" width="6.5" height="6.5" rx="2" fill="#fff"/></svg>`;
{
  write('icons/kw.svg', MARK()); write('assets/brand/kw-logo.svg', MARK());
  const png = {};
  for (const s of [16, 32, 48, 96, 180, 192, 512]) {
    const pad = s >= 180 ? Math.round(s * 0.1) : 0, inner = s - 2 * pad;
    png[s] = await sharp(Buffer.from(MARK(inner))).resize(inner, inner).extend({ top: pad, bottom: pad, left: pad, right: pad, background: s >= 180 ? '#e2e3e6' : { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    if (s >= 48) write(`icons/kw-${s}.png`, png[s]);
  }
  const imgs = [16, 32, 48].map(s => png[s]); const head = Buffer.alloc(6 + 16 * imgs.length); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(imgs.length, 4); let off = head.length;
  imgs.forEach((b, i) => { const s = [16, 32, 48][i], o = 6 + 16 * i; head.writeUInt8(s, o); head.writeUInt8(s, o + 1); head.writeUInt16LE(1, o + 4); head.writeUInt16LE(32, o + 6); head.writeUInt32LE(b.length, o + 8); head.writeUInt32LE(off, o + 12); off += b.length; });
  write('favicon.ico', Buffer.concat([head, ...imgs]));
  write('site.webmanifest', JSON.stringify({ name: 'Kempen Webstudio', short_name: 'Kempen Webstudio', icons: [{ src: '/icons/kw-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icons/kw-512.png', sizes: '512x512', type: 'image/png' }, { src: '/icons/kw.svg', sizes: 'any', type: 'image/svg+xml' }], theme_color: '#dcdde0', background_color: '#dcdde0', display: 'browser' }));
}
const OG_IMAGE = '/assets/og-v4.jpg';

// ---------- gestructureerde gegevens aanvullen (SEO-ronde 15-11-2026) ----------
// Home: Organization + ProfessionalService (LocalBusiness) met areaServed België + de steden met een eigen pagina, talen en contactpunt.
// Dienstpagina's zonder Service krijgen er een; pagina's met veelgestelde vragen zonder FAQPage krijgen er een; Article krijgt het eigen deelbeeld.
// sameAs blijft zoals het is (Facebook) tot er andere profielen zijn. Openingsuren ma-za 09:00-20:00 (Karim, 16-11-2026); geen geo.
const LD_CITIES = ['Antwerpen', 'Brussel', 'Gent', 'Leuven', 'Mechelen', 'Hasselt', 'Brugge', 'Kortrijk', 'Turnhout', 'Geel', 'Herentals', 'Mol', 'Kasterlee', 'Liège', 'Namur', 'Charleroi'];
const LD_SERVICE = {
  '/logo-en-huisstijl/': { nl: 'Logo en huisstijl laten maken', fr: 'Création de logo et d’identité visuelle', en: 'Logo and visual identity design' },
  '/toegankelijke-website/': { nl: 'Toegankelijke website laten maken', fr: 'Création de site internet accessible', en: 'Accessible website design' },
  '/website-laten-maken-belgie/': { nl: 'Website laten maken in België', fr: 'Création de site internet en Belgique', en: 'Website design in Belgium' },
  '/website-laten-vernieuwen/': { nl: 'Website laten vernieuwen', fr: 'Refonte de site internet', en: 'Website redesign' },
  '/webshop-laten-maken/': { nl: 'Webshop laten maken', fr: 'Création de boutique en ligne', en: 'Online shop design' },
};
const ldTypes = o => [].concat(o['@type'] || []);
function enrichLd(arr, { url, lang, isHome, ogImg, doc }) {
  const ORG = ORIGIN + '/#organisatie';
  const country = { '@type': 'Country', name: { nl: 'België', fr: 'Belgique', en: 'Belgium' }[lang], identifier: 'BE' };
  for (const o of arr) {
    if (isHome && o['@id'] === ORG) {
      o['@type'] = ['Organization', 'ProfessionalService'];
      o.areaServed = [country, ...LD_CITIES.map(name => ({ '@type': 'City', name }))];
      o.knowsLanguage = ['nl', 'fr', 'en'];
      o.contactPoint = { '@type': 'ContactPoint', contactType: 'customer service', telephone: '+32 14 71 80 80', email: 'info@kempenwebstudio.be', availableLanguage: ['nl', 'fr', 'en'], areaServed: 'BE' };
      o.openingHoursSpecification = [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '20:00' }];
      o.image = ORIGIN + ogImg;
    }
    if (ldTypes(o).includes('Article')) { o.image = ORIGIN + ogImg; if (!o.author) o.author = { '@id': ORG }; }
  }
  const sv = LD_SERVICE[baseOf(url)];
  if (sv && !arr.some(o => ldTypes(o).includes('Service'))) arr.push({ '@context': 'https://schema.org', '@type': 'Service', '@id': ORIGIN + url + '#dienst', name: sv[lang], serviceType: sv[lang], provider: { '@id': ORG }, url: ORIGIN + url, areaServed: country });
  if (!arr.some(o => ldTypes(o).includes('FAQPage'))) {
    const qs = [...doc.querySelectorAll('main .fq6 details.fq')].map(d => [norm(d.querySelector('.fq-qt')?.textContent), norm(d.querySelector('.fq-a')?.textContent)]).filter(([q, a]) => q && a);
    if (qs.length) arr.push({ '@context': 'https://schema.org', '@type': 'FAQPage', '@id': ORIGIN + url + '#faq', mainEntity: qs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  }
  return arr;
}
write('assets/og-v4.jpg', fs.readFileSync(path.join(ROOT, 'src', 'img', 'og-v4.jpg')));

// ---------- 4. renderer (TSX -> Node-module), CSS (Tailwind), JS ----------
const RENDER = path.join(CACHE, 'render.mjs');
await esbuild.build({ entryPoints: [path.join(ROOT, 'src', 'design', 'render.tsx')], bundle: true, platform: 'node', format: 'esm', outfile: RENDER, jsx: 'automatic', packages: 'external', logLevel: 'error' });
const { renderHome, renderPage } = await import(pathToFileURL(RENDER).href + '?t=' + Date.now());
const TW = path.join(CACHE, 'tw.css');
execFileSync(process.execPath, [path.join(ROOT, 'node_modules', '@tailwindcss', 'cli', 'dist', 'index.mjs'), '-i', path.join(ROOT, 'src', 'css', 'site.css'), '-o', TW, '--minify'], { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] });
const CSS = fs.readFileSync(TW, 'utf8').replace(/\/\*![\s\S]*?\*\//g, '').trim();
const JS = (await esbuild.transform(fs.readFileSync(path.join(ROOT, 'src', 'js', 'site.js'), 'utf8'), { loader: 'js', minify: true, target: ['es2017'] })).code;
const JS_FILE = `/assets/site.${hash(JS)}.js`;
write(JS_FILE.slice(1), JS);

// ---------- 5. gedeelde gegevens per taal (formulier, extra's voor de home) ----------
const readDoc = rel => parse(fs.readFileSync(path.join(SRC, rel), 'utf8'));
/** content-bestand van een pagina in een taal, vanaf het NL-pad (FR heeft eigen slugs) */
const relFor = (lang, base) => { let u = (lang === 'nl' ? '' : '/' + lang) + base; if (lang === 'fr') u = FR_SLUGS[u] || u; return u.slice(1) + 'index.html'; };
const PER_LANG = {};
for (const lang of ['nl', 'fr', 'en']) {
  const p = lang === 'nl' ? '' : lang + '/';
  const homeDoc = readDoc(p + 'index.html');
  const f = formModel(homeDoc);
  const hm = homeModel(homeDoc);
  const s0 = shellModel(homeDoc, lang === 'nl' ? '/' : `/${lang}/`);
  const cities = s0.footer.cols.find(c => /Website laten maken in|Faire créer un site web à|Création de site internet à|Have a website built in/i.test(c.title));
  const cityBy = href => cities.links.find(l => baseOf(l.href) === href);
  const kosten = blocksModel(readDoc(relFor(lang, '/wat-kost-een-website/'))).find(b => b.kind === 'pricing');
  const delivery = kosten ? kosten.tiers.map(t => norm((t.list.find(l => l.lt) || {}).html || '').replace(/<[^>]+>/g, '')) : [];
  const kennisDoc = readDoc(relFor(lang, '/kennis/'));
  const kennisHero = heroModel(kennisDoc);
  const articles = [...kennisDoc.querySelectorAll('.kw31g .svc')].slice(0, 3).map(a => ({ title: norm(a.querySelector('h3').textContent), href: a.querySelector('h3 a').getAttribute('href'), excerpt: a.querySelector('.svc-d').innerHTML.trim() }));
  const uitleg = s0.navTop.find(l => baseOf(l.href) === '/kennis/');
  const werkwijze = s0.navTop.find(l => /#werkwijze/.test(l.href));
  const dd = DD[lang];
  const placeLinks = { kasterlee: ['/website-laten-maken-kasterlee/', '/website-laten-maken-kempen/'], 'turnhout-geel': ['/website-laten-maken-turnhout/', '/website-laten-maken-geel/', '/website-laten-maken-herentals/', '/website-laten-maken-mol/'], 'leuven-gent': ['/website-laten-maken-gent/', '/website-laten-maken-leuven/'], kortrijk: ['/website-laten-maken-kortrijk/'] };
  const addr = s0.footer.bottom[2] || '';
  const trust = hm.hero.trust;
  const last2 = t => { const w = t.trim().split(' '); return [w.slice(0, -2).join(' '), w.slice(-2).join(' ')]; };
  const [a1, a2] = trust[1].split(/,\s*/);
  const pr = last2(trust[0]);
  const d0 = delivery[0] ? last2(delivery[0]) : ['', ''];
  const wcagSub = (hm.diensten.items[3]?.chips || []).map(c => c.replace(/<[^>]+>/g, '')).find(c => /ontwerp|conception|design/i.test(c)) || '';
  const award = id => dd.awards.find(a => a.id === id);
  PER_LANG[lang] = {
    f, chatTitle: hm.contact ? hm.contact.h2 : '',
    sectors: { title: hm.band.h2, chips: hm.band.chips },
    x: {
      metaDesc: homeDoc.querySelector('meta[name=description]').getAttribute('content'),
      replyNote: hm.steps.ctaNote.replace(/<[^>]+>/g, ''),
      werkwijzeHref: '#werkwijze', werkwijzeLabel: werkwijze ? werkwijze.label : '',
      address: addr.split(',').slice(0, 2).join(','), regionLine: s0.ui.areaTitle, cityPrefix: cities.title,
      places: dd.places.slice(0, 4).map(p => ({ ...p, label: p.city, links: (placeLinks[p.id] || []).map(cityBy).filter(Boolean) })),
      partners: [
        ...hm.cases.items.map(c => ({ name: c.hText, note: c.p })),
        ...hm.werk.items.slice(0, 2).map(w => ({ name: w.h, note: w.p })),
        { name: s0.ui.region, note: addr, globe: true },
      ],
      awards: [
        { ...award('voorstel'), title: a1, subtitle: a2 || '' },
        { ...award('prijzen'), title: pr[0], subtitle: pr[1] },
        { ...award('wcag'), title: 'WCAG 2.2 AA', subtitle: wcagSub },
        { ...award('mobiel') },
        { ...award('belgie'), title: s0.ui.region, subtitle: award('belgie').subtitle },
        { ...award('snel'), title: d0[1] || award('snel').title, subtitle: award('snel').subtitle },
      ],
      articles, articlesLabel: uitleg ? uitleg.label : '', articlesCta: kennisHero && kennisHero.ctas[1] ? kennisHero.ctas[1].label : '',
      delivery,
    },
  };
}

// ---------- 6. pagina's ----------
const ROBOTS = url => { if (MODE === 'test') return 'noindex,nofollow'; const base = baseOf(url), top = base.split('/')[1]; return CFG.noindex[base] || (DEMO.has(top) ? CFG.demoRobots : 'index,follow'); };
function avifFor(srcset) {
  const parts = srcset.split(',').map(s => s.trim()).filter(Boolean).map(p => { const [u, d] = p.split(/\s+/); return { u, d, a: u.replace(/\.(webp|jpe?g|png)$/i, '.avif') }; });
  if (!parts.length || !parts.every(p => AVIF.has(p.a))) return null;
  return parts.map(p => p.a + (p.d ? ' ' + p.d : '')).join(', ');
}
const made = new Map();
async function smallVariants(doc) { // kleine beelden (cirkels): extra variant van data-small px breed, als webp + avif
  for (const img of doc.querySelectorAll('img[data-small]')) {
    const w = +img.getAttribute('data-small'); img.removeAttribute('data-small');
    const ss = img.getAttribute('srcset') || img.getAttribute('src'); const c = ss.split(',').map(x => x.trim().split(/\s+/)).map(([u, d]) => ({ u, w: parseInt(d) || 9999 })).sort((a, b) => a.w - b.w)[0];
    if (!c || !c.u.startsWith('/assets/img/') || c.w <= w * 1.2) continue;
    const key = c.u + '@' + w; let v = made.get(key);
    if (!v) {
      const src = fs.readFileSync(path.join(SRC, c.u)); const base = c.u.replace(/\.(webp|jpe?g|png)$/i, '') + '-w' + w;
      for (const [ext, opt] of [['webp', { quality: 80, effort: 5 }], ['avif', { quality: 58, effort: 5 }]]) write(base.slice(1) + '.' + ext, await cached(`sm-${hash(src)}-${w}.${ext}`, () => sharp(src).resize({ width: w }).toFormat(ext, opt).toBuffer()));
      AVIF.add(base + '.avif'); v = base + '.webp'; made.set(key, v);
    }
    img.setAttribute('srcset', `${v} ${w}w` + (img.getAttribute('srcset') ? ', ' + img.getAttribute('srcset') : ''));
  }
}
// beelden uit src/site/fotos.mjs: elk bestand /assets/img/f/<id>.<vorm>.<breedte>.<avif|webp> dat een pagina opvraagt, wordt hier gemaakt
const FOTO_DONE = new Set();
async function fotoFiles(doc) {
  const { FOTOS, VORMEN } = await import(pathToFileURL(path.join(ROOT, 'src', 'site', 'fotos.mjs')).href);
  const urls = new Set();
  for (const e of doc.querySelectorAll('img[src], source[srcset], img[srcset]')) for (const a of ['src', 'srcset']) for (const m of (e.getAttribute(a) || '').matchAll(/\/assets\/img\/f\/[^\s,]+/g)) urls.add(m[0]);
  for (const u of urls) {
    if (FOTO_DONE.has(u)) continue; FOTO_DONE.add(u);
    const m = u.match(/^\/assets\/img\/f\/(.+)\.(\w+)\.(\d+)\.(avif|webp)$/); if (!m) throw new Error('foto-url ' + u);
    const [, id, vorm, w, ext] = m; const F = FOTOS[id], V = VORMEN[vorm]; if (!F || !V) throw new Error('foto onbekend ' + u);
    const src = fs.readFileSync(path.join(ROOT, 'src', 'img', 'foto', 'bron', F.src));
    const h = Math.round(+w * V.r[1] / V.r[0]);
    const buf = await cached(`foto-${hash(src)}-${hash(JSON.stringify(F.crop || 0) + (F.pos || ''))}-${w}x${h}.${ext}`, () => {
      let p = sharp(src); if (F.crop) p = p.extract(F.crop);
      return p.resize({ width: +w, height: h, fit: 'cover', position: F.pos || 'centre' }).toFormat(ext, ext === 'avif' ? { quality: 55, effort: 5 } : { quality: 78, effort: 5 }).toBuffer();
    });
    write(u.slice(1), buf);
  }
}
function upgradeImages(doc) {
  for (const img of doc.querySelectorAll('img')) {
    const src = img.getAttribute('src') || '';
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    if (!img.closest('[data-hero]') && !img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
    if (!img.closest('[data-hero]')) img.removeAttribute('fetchpriority');
    const pic = img.parentElement && img.parentElement.tagName === 'PICTURE' ? img.parentElement : null;
    if (pic) {
      if (pic.querySelector('source[type="image/avif"]')) continue;
      for (const s of [...pic.querySelectorAll('source')]) { const t = s.getAttribute('type'); if (t && t !== 'image/webp') continue; const a = avifFor(s.getAttribute('srcset') || ''); if (!a) continue; const n = s.cloneNode(false); n.setAttribute('type', 'image/avif'); n.setAttribute('srcset', a); pic.insertBefore(n, s); }
      const a = avifFor(img.getAttribute('srcset') || src);
      if (a) { const n = doc.createElement('source'); n.setAttribute('type', 'image/avif'); n.setAttribute('srcset', a); if (img.getAttribute('sizes')) n.setAttribute('sizes', img.getAttribute('sizes')); pic.insertBefore(n, img); }
      continue;
    }
    if (!src.startsWith('/assets/img/')) continue;
    const a = avifFor(img.getAttribute('srcset') || src); if (!a) continue;
    const p = doc.createElement('picture'); const n = doc.createElement('source'); n.setAttribute('type', 'image/avif'); n.setAttribute('srcset', a);
    if (img.getAttribute('sizes')) n.setAttribute('sizes', img.getAttribute('sizes'));
    img.parentNode.insertBefore(p, img); p.appendChild(n); p.appendChild(img);
  }
}
// teksten van de oude pagina (per blok) -> moeten allemaal op de nieuwe pagina staan
function segments(root, skip = '') {
  const r = root.cloneNode(true);
  r.querySelectorAll('script,style,svg,noscript,.kw-sr,[aria-hidden="true"]' + (skip ? ',' + skip : '')).forEach(e => e.remove());
  const out = new Set();
  for (const el of r.querySelectorAll('p,li,h1,h2,h3,h4,h5,summary,a,button,b,small,td,th,span,label,option,dt,dd')) {
    if ([...el.children].some(c => /^(P|LI|H\d|DIV|UL|OL|SECTION|ARTICLE|NAV)$/.test(c.tagName))) continue;
    const t = norm(el.textContent); if (t.length > 1) out.add(t);
  }
  return out;
}
const flat = s => norm(s).replace(/\s*([,.;:!?])/g, '$1');
function textSpaced(root) { const out = []; (function w(n) { for (const c of n.childNodes) { if (c.nodeType === 3) out.push(c.textContent); else if (c.nodeType === 1 && !['SCRIPT', 'STYLE', 'svg'].includes(c.tagName)) w(c); } })(root); return out.join(' '); }

const report = { pages: 0, missing: [], extra: new Map(), h1: [], perPage: [] };
const OLD_ALL = { nl: '', fr: '', en: '' };
for (const rel of pages) { const u = urlOf(rel); const dd0 = parse(fs.readFileSync(path.join(SRC, rel), 'utf8')); OLD_ALL[langOf(u)] += ' ' + flat(textSpaced(dd0.body)) + ' ' + flat(dd0.body.textContent); }
const indexable = []; const fontText = new Set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,;:!?\'"()[]/-–—&@€%+*#·•’“”‘…→|_=<>éèëêàâäçïîôöûüùÉÈÀÇ'.split(''));
const HEAD_JS = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.kwReady)document.documentElement.classList.remove('js')},2500)`;

for (const rel of pages) {
  const html = fs.readFileSync(path.join(SRC, rel), 'utf8');
  const doc = parse(html);
  const url = urlOf(rel), lang = langOf(url), isHome = baseOf(url) === '/';
  const robots = ROBOTS(url);
  const L = PER_LANG[lang];
  const s = shellModel(doc, url);
  let body;
  if (isHome) body = renderHome({ s, f: L.f, chatTitle: L.chatTitle, h: homeModel(doc), x: L.x });
  else body = renderPage({ s, f: L.f, chatTitle: L.chatTitle, hero: (() => { const hh = heroModel(doc); return hh && { ...hh, sectors: L.sectors, path: baseOf(url), lang }; })(), blocks: blocksModel(doc) });

  // ---- head (letterlijk uit de bron, behalve robots, iconen, stijl en script)
  const H = doc.head, get = q => H.querySelector(q);
  const title = doc.title, desc = get('meta[name="description"]')?.getAttribute('content') || '', canon = get('link[rel="canonical"]')?.getAttribute('href') || '';
  // deelbeeld per pagina (scripts/og-paginas.mjs), anders het algemene
  const h1txt = norm(doc.querySelector('main h1')?.textContent || '').replace(/­/g, '');
  const ogk = crypto.createHash('sha1').update(lang + '|' + h1txt).digest('hex').slice(0, 12);
  const ogSrc = path.join(ROOT, 'src', 'img', 'og', ogk + '.jpg');
  let ogImg = OG_IMAGE; if (h1txt && fs.existsSync(ogSrc)) { ogImg = `/assets/og/${ogk}.jpg`; write(ogImg.slice(1), fs.readFileSync(ogSrc)); }
  const metas = [...H.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')].map(m => { const k = m.getAttribute('property') ? 'property' : 'name', key = m.getAttribute(k); let v = m.getAttribute('content') || ''; if (key === 'og:image' || key === 'twitter:image') v = ORIGIN + ogImg; if (key === 'og:image:alt' && ogImg !== OG_IMAGE) v = `${h1txt}, Kempen Webstudio`; return `<meta ${k}="${esc(key)}" content="${esc(v)}">`; });
  if (metas.length && !metas.some(m => m.includes('twitter:title'))) metas.push(`<meta name="twitter:title" content="${esc(title)}">`);
  const alts = [...H.querySelectorAll('link[rel="alternate"][hreflang]')].map(l => `<link rel="alternate" hreflang="${esc(l.getAttribute('hreflang'))}" href="${esc(l.getAttribute('href'))}">`);
  const ld = enrichLd([...doc.querySelectorAll('script[type="application/ld+json"]')].map(x => JSON.parse(x.textContent)), { url, lang, isHome, ogImg, doc }).map(o => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`);
  const por = w => `/assets/img/hero-portret-${w}.avif ${w}w`;
  const head = [
    '<meta charset="utf-8">', '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
    `<title>${esc(title)}</title>`, desc ? `<meta name="description" content="${esc(desc)}">` : '', `<meta name="robots" content="${robots}">`,
    canon ? `<link rel="canonical" href="${esc(canon)}">` : '', ...alts,
    '<meta name="theme-color" content="#dcdde0">', '<meta name="color-scheme" content="light">', ...metas,
    '<link rel="icon" href="/favicon.ico?v=3" sizes="any">', '<link rel="icon" href="/icons/kw.svg?v=3" type="image/svg+xml">', '<link rel="apple-touch-icon" href="/icons/kw-180.png?v=3">', '<link rel="manifest" href="/site.webmanifest?v=3">',
    '<link rel="preload" href="/assets/fonts/switzer.woff2" as="font" type="font/woff2" crossorigin>', '<link rel="preload" href="/assets/fonts/inter-tight.woff2" as="font" type="font/woff2" crossorigin>',
    isHome ? `<link rel="preload" as="image" type="image/avif" imagesrcset="${[360, 560, 760, 928].map(por).join(', ')}" imagesizes="(min-width: 1536px) 420px, (min-width: 1280px) 370px, (min-width: 1024px) 310px, (min-width: 640px) 400px, 360px" fetchpriority="high">` : '',
    `<script>${HEAD_JS}</script>`, `<style>${CSS}</style>`, `<script src="${JS_FILE}" defer></script>`, ...ld,
  ].filter(Boolean).join('\n');

  // ---- body nabewerken: beelden (AVIF), controles
  body = body.replace(/ srcSet=/g, ' srcset=').replace(/ fetchPriority=/g, ' fetchpriority=').replace(/ hrefLang=/g, ' hreflang=').replace(/ tabIndex=/g, ' tabindex=').replace(/ autoComplete=/g, ' autocomplete=');
  const { document: nd } = parseHTML(`<!doctype html><html><head></head><body>${body}</body></html>`);
  await smallVariants(nd);
  upgradeImages(nd);
  await fotoFiles(nd);
  const B = nd.body;
  // teksten: alles van de oude pagina moet er staan
  const oldB = doc.body;
  const oldSeg = segments(oldB, '.mcta6, .reel, .hero-fb, .pre, #ck .ck-sw, .hp, #fok, #fmail');
  const attrs = [...B.querySelectorAll('[aria-label],[title],[placeholder]')].map(e => (e.getAttribute('aria-label') || '') + ' ' + (e.getAttribute('title') || '') + ' ' + (e.getAttribute('placeholder') || '')).join(' ');
  const Bv = B.cloneNode(true); Bv.querySelectorAll('[aria-hidden="true"]').forEach(e => e.parentNode.removeChild(e));
  const newFlat = flat(Bv.textContent + ' ' + attrs), newSpaced = flat(textSpaced(Bv) + ' ' + attrs);
  const missing = [...oldSeg].filter(t => !newFlat.includes(flat(t)) && !newSpaced.includes(flat(t)));
  if (missing.length) report.missing.push({ url, missing });
  const oldFlat = flat(oldB.textContent + ' ' + [...oldB.querySelectorAll('[aria-label],[title],[placeholder],[alt]')].map(e => ['aria-label', 'title', 'placeholder', 'alt'].map(a => e.getAttribute(a) || '').join(' ')).join(' '));
  { // echt nieuwe tekst: tekstknopen (zichtbaar) die nergens in de oude pagina voorkomen, zonder cijfers/leestekens alleen
    const nodes = []; (function w(n) { for (const c of n.childNodes) { if (c.nodeType === 3) nodes.push(norm(c.textContent)); else if (c.nodeType === 1 && !['SCRIPT', 'STYLE', 'svg'].includes(c.tagName) && c.getAttribute('aria-hidden') !== 'true' && !c.classList.contains('kw-sr')) w(c); } })(B);
    const oldSp = flat(textSpaced(oldB));
    for (const t of nodes) if (t.length > 1 && /[A-Za-zÀ-ÿ]{2}/.test(t) && !oldFlat.includes(flat(t)) && !oldSp.includes(flat(t))) { const k = `${lang}: ${t}`; report.extra.set(k, (report.extra.get(k) || 0) + 1); }
  }
  for (const ch of B.textContent) fontText.add(ch);
  for (const e of B.querySelectorAll('[placeholder]')) for (const ch of e.getAttribute('placeholder')) fontText.add(ch);
  const h1s = B.querySelectorAll('h1').length; if (h1s !== 1) report.h1.push(`${url}: ${h1s}x h1`);
  for (const im of B.querySelectorAll('img')) if (!im.hasAttribute('alt')) warn.push(`img zonder alt op ${url}: ${im.getAttribute('src')}`);
  if (/Bijgewerkt op|Mis à jour le|Updated on/i.test(B.textContent)) warn.push('"Bijgewerkt op" op ' + url);
  if (/zenrixa|aistudio|webstudiok\.be/i.test(B.innerHTML)) warn.push('template-restant in ' + url);
  if (robots === 'index,follow' && url !== '/404.html') { if (canon !== ORIGIN + url) warn.push(`canonical ${url}: ${canon || 'ontbreekt'}`); indexable.push({ url, base: baseOf(url), lang, title, desc, hl: [...H.querySelectorAll('link[rel="alternate"][hreflang]')].map(l => [l.getAttribute('hreflang'), l.getAttribute('href')]), imgs: [...new Set([...B.querySelectorAll('img[src^="/assets/img/"]')].map(i => i.getAttribute('src')))].slice(0, 12) }); }
  const out = `<!doctype html>\n<html lang="${esc(doc.documentElement.getAttribute('lang') || LANGS[lang])}">\n<head>\n${head}\n</head>\n<body class="bg-[#dcdde0]">\n${B.innerHTML.trim()}\n</body>\n</html>\n`;
  write(rel, out); report.pages++; report.perPage.push({ url, bytes: Buffer.byteLength(out) });
}

// ---------- 7. lettertypes: subset met precies de tekens die op de site staan (latin + latin-ext) ----------
{
  const chars = [...fontText].join('');
  const sw = fs.readFileSync(path.join(ROOT, 'src', 'fonts', 'bron', 'Switzer-Variable.woff2'));
  const itBase = path.join(ROOT, 'node_modules', '@fontsource-variable', 'inter-tight', 'files');
  write('assets/fonts/switzer.woff2', await cached(`sw-${hash(chars)}.woff2`, () => subsetFont(sw, chars, { targetFormat: 'woff2' })));
  // Inter Tight: latin en latin-ext zijn aparte bestanden bij fontsource; we voegen ze samen via subset op het latin-bestand
  // aangevuld met latin-ext waar nodig (tekens buiten latin komen alleen in FR voor: œ Œ ’ …).
  const itLatin = fs.readFileSync(path.join(itBase, 'inter-tight-latin-wght-normal.woff2'));
  write('assets/fonts/inter-tight.woff2', await cached(`it-${hash(chars)}.woff2`, () => subsetFont(itLatin, chars, { targetFormat: 'woff2' })));
}

// ---------- 8. voorbeeldsites: ongewijzigd, met juiste robots ----------
for (const rel of demoPages) {
  let s = fs.readFileSync(path.join(SRC, rel), 'utf8'); const want = ROBOTS(urlOf(rel)); const re = /<meta name="robots" content="[^"]*">/;
  if (re.test(s)) s = s.replace(re, `<meta name="robots" content="${want}">`); else if (want !== 'index,follow') s = s.replace('</head>', `<meta name="robots" content="${want}">\n</head>`);
  write(rel, s);
}

// ---------- 8b. oude FR-paden: 301 in _redirects (Cloudflare Pages/Workers, Netlify) + HTML-vangnet op het oude pad ----------
{
  const lines = ['# Oude FR-URL\'s (Nederlandse slug) -> Franse slug, permanent. Gegenereerd door scripts/build.mjs uit src/site/slugs.mjs'];
  for (const [from, to] of Object.entries(FR_SLUGS)) {
    lines.push(`${from} ${to} 301`, `${from.replace(/\/$/, '')} ${to} 301`);
    const abs = ORIGIN + to;
    write(path.join(...from.split('/').filter(Boolean), 'index.html'), `<!doctype html>\n<html lang="fr-BE">\n<head>\n<meta charset="utf-8">\n<title>Page déplacée</title>\n<meta name="robots" content="noindex,follow">\n<link rel="canonical" href="${abs}">\n<meta http-equiv="refresh" content="0; url=${to}">\n</head>\n<body>\n<p>Cette page a déménagé : <a href="${to}">${abs}</a></p>\n</body>\n</html>\n`);
  }
  write('_redirects', lines.join('\n') + '\n');
}

// ---------- 9. robots.txt en sitemap.xml ----------
if (MODE === 'live') {
  write('robots.txt', CFG.robotsTxt);
  // llms.txt: korte, feitelijke samenvatting voor AI-zoekmachines, met alle indexeerbare pagina's (titel + URL) per taal
  {
    const sec = (l, h) => ['', '## ' + h, ...indexable.filter(p => p.lang === l).sort((a, b) => a.url.localeCompare(b.url)).map(p => `- [${p.title}](${ORIGIN + p.url}): ${p.desc}`)];
    write('llms.txt', [
      '# Kempen Webstudio',
      '',
      '> Webstudio uit Kasterlee (België) die websites, webshops, SEO, logo en huisstijl en webtoegankelijkheid (WCAG 2.2 AA) maakt voor ondernemers, verenigingen en zelfstandigen in heel België. Werkt in het Nederlands, Frans en Engels.',
      '',
      '- Naam: Kempen Webstudio',
      '- Adres: Kemelbeekstraat 16, 2460 Kasterlee, België',
      '- Telefoon: +32 14 71 80 80',
      '- E-mail: info@kempenwebstudio.be',
      '- Ondernemingsnummer: BE 0897.577.919',
      '- Openingsuren: maandag tot en met zaterdag 09:00-20:00, zondag gesloten',
      '- Werkwijze: eerst een vrijblijvend voorstel, daarna een schriftelijke offerte; één vast aanspreekpunt; overleg online, per e-mail of telefoon.',
      '- Pakketten (excl. btw): Start vanaf €490 + vanaf €29/maand; Vakman vanaf €990 + vanaf €49/maand; Webshop vanaf €1.890 + vanaf €79/maand. Minimaal 12 maanden, daarna maandelijks opzegbaar.',
      '- Losse diensten (excl. btw): SEO-optimalisatie vanaf €59 per pagina, SEO-audit vanaf €190, lokale SEO vanaf €149/maand, logo vanaf €190, huisstijl vanaf €490, toegankelijkheidscontrole vanaf €149.',
      '- De voorbeeldontwerpen op de site hebben fictieve namen en gegevens; het zijn geen klanten.',
      ...sec('nl', "Pagina's (Nederlands)"), ...sec('fr', 'Pages (français)'), ...sec('en', 'Pages (English)'), '',
    ].join('\n'));
  }
  // Cloudflare Pages / Netlify: lange cache voor bestanden met vaste of gehashte naam, basis-beveiligingsheaders
  write('_headers', ['/assets/fonts/*', '  Cache-Control: public, max-age=31536000, immutable', '/assets/site.*', '  Cache-Control: public, max-age=31536000, immutable',
    '/assets/img/*', '  Cache-Control: public, max-age=2592000', '/*', '  X-Content-Type-Options: nosniff', '  Referrer-Policy: strict-origin-when-cross-origin', ''].join(String.fromCharCode(10)));
  const online = fs.readFileSync(path.join(ROOT, 'config', 'sitemap-online.xml'), 'utf8');
  const order = [...online.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]); const rank = u => { const i = order.indexOf(u); return i < 0 ? 1e4 + u.length : i; };
  const byBase = {}; for (const p of indexable) (byBase[p.base] = byBase[p.base] || {})[p.lang] = ORIGIN + p.url;
  const items = indexable.map(p => { const alts = byBase[p.base]; return { loc: ORIGIN + p.url, alts: Object.keys(alts).length > 1 ? alts : null, nl: alts.nl, imgs: p.imgs, hl: p.hl }; }).sort((a, b) => rank(a.nl || a.loc) - rank(b.nl || b.loc) || a.loc.localeCompare(b.loc));
  const altXml = i => i.hl && i.hl.length ? i.hl.map(([l, u]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${u}"/>`).join('') : i.alts ? Object.entries(i.alts).map(([l, u]) => `<xhtml:link rel="alternate" hreflang="${LANGS[l]}" href="${u}"/>`).join('') + (i.alts.nl ? `<xhtml:link rel="alternate" hreflang="x-default" href="${i.alts.nl}"/>` : '') : '';
  const imgXml = i => (i.imgs || []).map(s => `<image:image><image:loc>${ORIGIN}${s}</image:loc></image:image>`).join('');
  write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' + items.map(i => `  <url><loc>${i.loc}</loc><lastmod>${today}</lastmod>${altXml(i)}${imgXml(i)}</url>`).join('\n') + '\n</urlset>\n');
  report.sitemap = items.length;
} else write('robots.txt', 'User-agent: *\nDisallow: /\n');

// ---------- verslag ----------
const kb = n => (n / 1024).toFixed(0) + ' kB';
const sizes = report.perPage.map(p => p.bytes).sort((a, b) => a - b);
console.log(`${OUT} (${MODE}) klaar in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
console.log(`  ${report.pages} pagina's in het design + ${demoPages.length} voorbeeldsite-pagina's ongewijzigd${report.sitemap ? `, ${report.sitemap} URL's in sitemap.xml` : ''}`);
console.log(`  HTML per pagina: ${kb(sizes[0])} – ${kb(sizes[sizes.length - 1])} (inline CSS ${kb(CSS.length)}), JS ${kb(JS.length)}, AVIF: ${AVIF.size}, lettertekens: ${fontText.size}`);
if (report.missing.length) {
  console.log(`  TEKST ONTBREEKT op ${report.missing.length} pagina's:`);
  for (const m of report.missing.slice(0, 12)) console.log(`   - ${m.url}: ${m.missing.slice(0, 6).map(t => JSON.stringify(t.slice(0, 70))).join(' | ')}${m.missing.length > 6 ? ` (+${m.missing.length - 6})` : ''}`);
} else console.log('  teksten: alle teksten van elke oude pagina staan op de nieuwe pagina');
if (report.h1.length) warn.push('h1: ' + report.h1.join(', '));
const extra = [...report.extra.entries()].filter(([k]) => { const L0 = k.slice(0, 2), t = k.slice(4); return !OLD_ALL[L0].includes(flat(t)); }).sort();
{ // lijst voor Karim: tekst die alleen uit het design komt (staat nergens op de huidige site)
  const by = { nl: [], fr: [], en: [] }; for (const [k, n] of extra) by[k.slice(0, 2)].push(`- ${k.slice(4)}  _(op ${n} pagina${n > 1 ? "'s" : ''})_`);
  fs.writeFileSync(path.join(ROOT, 'TEKSTEN-UIT-HET-DESIGN.md'), `# Teksten die alleen uit het design komen (ter goedkeuring)\n\nAutomatisch gemaakt door scripts/build.mjs (${today}). Alle andere teksten op de site komen woord voor woord uit de huidige site; de build controleert dat per pagina.\n\n` + ['nl', 'fr', 'en'].map(l => `## ${l.toUpperCase()}\n\n${by[l].join('\n')}\n`).join('\n'));
}
console.log(`  nieuwe teksten (uit het design): ${extra.length} unieke`);
fs.writeFileSync(path.join(ROOT, `.build-${MODE}.json`), JSON.stringify({ ...report, extra: Object.fromEntries(extra), warn }, null, 1));
console.log(warn.length ? '  LET OP:\n   - ' + warn.slice(0, 30).join('\n   - ') : '  controles: geen problemen');
process.exitCode = warn.length || report.missing.length ? 1 : 0;
