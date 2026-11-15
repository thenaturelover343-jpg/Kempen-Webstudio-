// paginas.mjs: maakt de nieuwe pagina's (SEO-ronde 15-11-2026) als content-HTML in de markup van de bestaande site,
// zodat de build ze met dezelfde home-componenten rendert. Bron: src/site/paginas/*.mjs. Herhaalbaar: overschrijft alleen
// pagina's met <meta name="kw-gegenereerd">, of bestaande pagina's die expliciet `vervang: true` hebben.
// Gebruik: node scripts/paginas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseHTML } from 'linkedom';
import { FR_SLUGS } from '../src/site/slugs.mjs';

const ROOT = path.resolve('.');
const C = path.join(ROOT, 'content');
const ORIGIN = 'https://www.kempenwebstudio.be';
const LOC = { nl: 'nl-BE', fr: 'fr-BE', en: 'en' };
const OGL = { nl: 'nl_BE', fr: 'fr_BE', en: 'en_GB' };
const HOME = { nl: '/', fr: '/fr/', en: '/en/' };
export const fileOf = u => path.join(C, ...u.split('/').filter(Boolean), 'index.html');
/** pad van een bestaande pagina in een taal vanaf het NL-pad */
export const pathIn = (lang, nl) => { let u = (lang === 'nl' ? '' : '/' + lang) + nl; if (lang === 'fr') u = FR_SLUGS[u] || u; return u; };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const slug = s => strip(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);

// ---------- secties in de markup van de bestaande site ----------
function sectionHtml(s, ctx) {
  const id = (s.id || slug(s.h2 || s.t)) + '-t';
  if (ctx.ids.has(id)) throw new Error(`dubbel id ${id} op ${ctx.path}`); ctx.ids.add(id);
  const sh = (h2, side, split = true) => `<header class="sh rv ${split && side ? 'sh-split' : 'pr-h'}"><div>${s.badge ? `<p class="lbl">${s.badge}</p>` : ''}<h2 class="d2" id="${id}">${h2}</h2></div>${side ? `<div class="sh-side"><p class="lead">${side}</p></div>` : ''}</header>`;
  switch (s.t) {
    case 'band':
      return `<section aria-labelledby="${id}" class="sec band sb kw-band-sync"><div class="wrap"><div class="kw-band-intro">${(s.intro || []).map(p => `<p>${p}</p>`).join('')}</div><h2 class="mega rv" id="${id}">${s.h2}</h2><div class="band-r rv"><div class="b-txt">${s.lead.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}</div>${s.chips ? `<nav class="chips" aria-label="${esc(s.chips.aria)}">${s.chips.links.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}</nav>` : ''}${s.fig ? `<div class="b-fig"><figure class="pcard${s.figPhone ? ' pcard-ph' : ''}">${s.fig}</figure></div>` : ''}</div></div></section>`;
    case 'cards':
      return `<section aria-labelledby="${id}" class="sec diensten xr${s.dark ? ' xr-d' : ''}"><div class="wrap">${sh(s.h2, s.side)}${s.pre ? `<p class="pr-b">${s.pre}</p>` : ''}<div class="sv-g${s.links ? '' : ''}">${s.items.map(([h, body]) => `<article class="svc rv rvd"><div class="svc-h"><h3>${h}</h3></div>${/^\s*<(p|ul|ol)\b/.test(body) ? body.replace(/^\s*<p>/, '<p class="svc-d">') : `<p class="svc-d">${body}</p>`}</article>`).join('')}</div>${s.after ? `<p class="pr-b">${s.after}</p>` : ''}</div></section>`;
    case 'prose':
      return `<section aria-labelledby="${id}" class="sec${s.spd ? ' spd' : ''}"><div class="wrap">${sh(s.h2, '', false)}<div class="kw-home-prose">${s.html}</div></div></section>`;
    case 'table':
      return `<section aria-labelledby="${id}" class="sec"><div class="wrap">${sh(s.h2, '', false)}<div class="kw-home-prose">${s.before || ''}<div class="kw-table" role="region" aria-labelledby="${id}" tabindex="0"><table><caption>${s.caption}</caption><thead><tr>${s.head.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${s.rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${s.after || ''}</div></div></section>`;
    case 'pricing': {
      const src = parseHTML(fs.readFileSync(fileOf(pathIn(ctx.lang, '/website-laten-maken-gent/')), 'utf8')).document;
      const g = src.querySelector('.prijzen .pk-g');
      return `<section aria-labelledby="${id}" class="sec prijzen xr"><div class="wrap">${sh(s.h2, s.side)}${g.outerHTML}<p class="pk-term rv">${s.term}</p></div></section>`;
    }
    case 'faq':
      return `<section aria-labelledby="${id}" class="s6 fq6"><div class="wrap fq6-in"><div class="fq6-h"><h2 id="${id}">${s.h2}</h2></div><div class="fq6-l"><div class="fq-g">${s.items.map(([q, a]) => `<details class="fq" name="fq6"><summary class="fq-btn"><h3 class="fq-q"><span class="fq-qt">${q}</span></h3><span aria-hidden="true" class="fq-i"></span></summary><div class="fq-a">${/^\s*<p/.test(a) ? a : `<p>${a}</p>`}</div></details>`).join('')}</div></div></div></section>`;
    case 'cta':
      return `<section aria-labelledby="${id}" class="s6 ct6 cte"><div class="wrap ct6-in"><div class="ct6-l"><h2 id="${id}">${s.h2}</h2></div><div class="ct6-r"><p class="ct6-p">${s.p}</p><a class="btn btn-white mag" href="${s.btn[0]}">${s.btn[1]}</a><p class="ct6-alt">${s.alt}</p>${s.also ? `<nav class="also-in" aria-label="${esc(s.also[0])}"><p class="also-lbl">${s.also[0]}</p><ul class="chips">${s.also[1].map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></nav>` : ''}</div></div></section>`;
    case 'contact': {
      const src = parseHTML(fs.readFileSync(fileOf(HOME[ctx.lang]), 'utf8')).document;
      const sec = src.querySelector('section.ct6 #cform').closest('section');
      return sec.outerHTML;
    }
    case 'raw': return s.html;
    default: throw new Error('onbekend sectietype ' + s.t);
  }
}

// ---------- JSON-LD ----------
function ldFor(p, faq) {
  const url = ORIGIN + p.path;
  const out = [];
  out.push({ '@context': 'https://schema.org', '@type': p.pageType || 'WebPage', '@id': url, url, name: strip(p.h1), description: p.desc, inLanguage: LOC[p.lang], isPartOf: { '@id': ORIGIN + '/#website' }, publisher: { '@id': ORIGIN + '/#organisatie' }, ...(p.service ? { mainEntity: { '@id': url + '#dienst' } } : {}), dateModified: p.date || '2026-11-15' });
  if (p.service) out.push({ '@context': 'https://schema.org', '@type': 'Service', '@id': url + '#dienst', name: p.service.name, serviceType: p.service.type || p.service.name, description: p.service.desc || p.desc, provider: { '@id': ORIGIN + '/#organisatie' }, url, areaServed: p.service.area || { '@type': 'Country', name: { nl: 'België', fr: 'Belgique', en: 'Belgium' }[p.lang] }, ...(p.service.offers === false ? {} : { offers: [['Start', 490], ['Vakman', 990], ['Webshop', 1890]].map(([n, v]) => ({ '@type': 'Offer', name: `${p.lang === 'fr' ? 'Formule' : p.lang === 'en' ? 'Package' : 'Pakket'} ${n}`, url, priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: String(v), priceCurrency: 'EUR', valueAddedTaxIncluded: false } })) }) });
  out.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [...p.crumbs, [p.path, strip(p.crumbCur || p.h1)]].map(([h, n], i) => ({ '@type': 'ListItem', position: i + 1, name: strip(n), item: ORIGIN + h })) });
  if (faq) out.push({ '@context': 'https://schema.org', '@type': 'FAQPage', '@id': url + '#faq', mainEntity: faq.items.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
  for (const x of p.ld || []) out.push({ '@context': 'https://schema.org', ...x });
  return out;
}

// ---------- pagina ----------
function build(p) {
  if (p.aanvul) return aanvul(p);
  const tplPath = pathIn(p.lang, p.tpl || '/website-laten-maken-gent/');
  const html = fs.readFileSync(fileOf(tplPath), 'utf8');
  const { document: d } = parseHTML(html);
  const H = d.head;
  // head: alles wat paginaspecifiek is weg, daarna opnieuw
  for (const sel of ['title', 'meta[name="description"]', 'link[rel="canonical"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]', 'meta[name="twitter:description"]', 'meta[name="twitter:title"]', 'script[type="application/ld+json"]', 'link[rel="alternate"]', 'meta[property="og:locale:alternate"]', 'meta[name="kw-gegenereerd"]']) H.querySelectorAll(sel).forEach(e => e.remove());
  const url = ORIGIN + p.path;
  const faq = p.sections.find(s => s.t === 'faq');
  const alts = p.alt ? Object.entries(p.alt).filter(([, u]) => u) : [];
  const head = [
    `<meta name="kw-gegenereerd" content="scripts/paginas.mjs">`,
    `<title>${esc(p.title)}</title>`, `<meta name="description" content="${esc(p.desc)}">`, `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${esc(p.title)}">`, `<meta property="og:description" content="${esc(p.desc)}">`, `<meta name="twitter:description" content="${esc(p.desc)}">`, `<meta property="og:url" content="${url}">`,
    ...ldFor(p, faq).map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`),
    alts.length > 1 ? `<!--kw-hreflang-->${alts.map(([l, u]) => `<link rel="alternate" hreflang="${LOC[l]}" href="${ORIGIN + u}">`).join('')}<link rel="alternate" hreflang="x-default" href="${ORIGIN + (p.alt.nl || p.alt.fr || p.alt.en)}">${alts.filter(([l]) => l !== p.lang).map(([l]) => `<meta property="og:locale:alternate" content="${OGL[l]}">`).join('')}<!--/kw-hreflang-->` : '',
  ].filter(Boolean).join('\n');
  const ogLoc = H.querySelector('meta[property="og:locale"]'); if (ogLoc) ogLoc.setAttribute('content', OGL[p.lang]);
  H.insertAdjacentHTML('beforeend', head);
  // taalkeuze in de header: naar de vertaling of de startpagina van die taal
  for (const nav of d.querySelectorAll('nav.lang')) for (const a of nav.querySelectorAll('a')) {
    const l = { 'nl-BE': 'nl', 'fr-BE': 'fr', en: 'en' }[a.getAttribute('hreflang')];
    a.setAttribute('href', (p.alt && p.alt[l]) || HOME[l]);
    if (l === p.lang) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  }
  // main
  const ctx = { ids: new Set(['h1', 'cta-t']), lang: p.lang, path: p.path };
  const crumbs = `<nav aria-label="${{ nl: 'Kruimelpad', fr: 'Fil d’Ariane', en: 'Breadcrumb' }[p.lang]}" class="hero-tag hero-crumb"><ol>${p.crumbs.map(([h, l], i) => `<li${i > 0 && i < p.crumbs.length ? ' class="hero-crumb-mid"' : ''}><a href="${h}">${l}</a></li>`).join('')}<li aria-current="page">${p.crumbCur || strip(p.h1)}</li></ol></nav>`;
  const hero = `<section aria-labelledby="h1" class="hero"><div class="hero-card"><div class="hero-t">${crumbs}<h1 id="h1">${p.h1}</h1><div class="hero-row"><p class="hero-slogan">${p.slogan}</p><div class="hero-ctas">${p.ctas.map(([h, l], i) => `<a class="btn ${i === 0 ? 'btn-white' : 'btn-glass'} mag" href="${h}">${l}</a>`).join('')}</div></div></div></div><ul class="hero-trust">${p.trust.map(t => `<li>${t}</li>`).join('')}</ul></section>`;
  const main = d.querySelector('main');
  main.innerHTML = '\n' + hero + '\n' + p.sections.map(s => sectionHtml(s, ctx)).join('\n') + '\n';
  d.documentElement.setAttribute('lang', LOC[p.lang]);
  return '<!doctype html>\n' + d.documentElement.outerHTML + '\n';
}

// ---------- aanvullen: bestaande pagina behouden, secties en vragen toevoegen (herhaalbaar) ----------
function aanvul(p) {
  const { document: d } = parseHTML(fs.readFileSync(fileOf(p.path), 'utf8'));
  const H = d.head;
  d.querySelectorAll('[data-kw-extra]').forEach(e => e.remove());
  if (!H.querySelector('meta[name="kw-gegenereerd"]')) H.insertAdjacentHTML('afterbegin', '<meta name="kw-gegenereerd" content="scripts/paginas.mjs (aangevuld)">');
  const set = (sel, attr, v) => { const e = H.querySelector(sel); if (e) attr ? e.setAttribute(attr, v) : (e.textContent = v); };
  if (p.title) { set('title', null, p.title); set('meta[property="og:title"]', 'content', p.title); }
  if (p.desc) { set('meta[name="description"]', 'content', p.desc); set('meta[property="og:description"]', 'content', p.desc); set('meta[name="twitter:description"]', 'content', p.desc); }
  if (p.h1) d.querySelector('main h1').innerHTML = p.h1;
  if (p.slogan) d.querySelector('main .hero-slogan').innerHTML = p.slogan;
  const ctx = { ids: new Set([...d.querySelectorAll('[id]')].map(e => e.id)), lang: p.lang, path: p.path };
  for (const ins of p.insert || []) {
    const ref = typeof ins.after === 'number' ? d.querySelector('main').children[ins.after] : d.querySelector(ins.after);
    if (!ref) throw new Error('aanvul: anker niet gevonden ' + ins.after + ' op ' + p.path);
    const html = ins.sections.map(x => sectionHtml(x, ctx)).join('\n').replace(/<section /g, '<section data-kw-extra="" ');
    ref.insertAdjacentHTML('afterend', html);
  }
  if (p.faqExtra && p.faqExtra.length) {
    const g = d.querySelector('main .fq6 .fq-g');
    g.insertAdjacentHTML('beforeend', p.faqExtra.map(([q, a]) => `<details class="fq" name="fq6" data-kw-extra=""><summary class="fq-btn"><h3 class="fq-q"><span class="fq-qt">${q}</span></h3><span aria-hidden="true" class="fq-i"></span></summary><div class="fq-a">${/^\s*<p/.test(a) ? a : `<p>${a}</p>`}</div></details>`).join(''));
    for (const sc of H.querySelectorAll('script[type="application/ld+json"]')) {
      const j = JSON.parse(sc.textContent); if (j['@type'] !== 'FAQPage') continue;
      j.mainEntity = j.mainEntity.filter(q => !q.kwExtra && !p.faqExtra.some(([fq]) => strip(fq) === q.name));
      for (const [q, a] of p.faqExtra) j.mainEntity.push({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } });
      sc.textContent = JSON.stringify(j);
    }
  }
  return '<!doctype html>\n' + d.documentElement.outerHTML + '\n';
}

// ---------- alles ----------
const dir = path.join(ROOT, 'src', 'site', 'paginas');
const pages = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.mjs') && !f.startsWith('_')).sort()) {
  const m = await import(pathToFileURL(path.join(dir, f)).href + '?t=' + Date.now());
  pages.push(...m.default);
}
const seen = new Set(); let n = 0, skipped = [];
for (const p of pages) {
  if (seen.has(p.path)) throw new Error('dubbel pad ' + p.path); seen.add(p.path);
  if (strip(p.title).length > 60) console.warn(`title > 60 (${strip(p.title).length}): ${p.path} ${p.title}`);
  if (p.desc.length > 155) console.warn(`description > 155 (${p.desc.length}): ${p.path}`);
  const f = fileOf(p.path);
  if (fs.existsSync(f) && !p.vervang && !p.aanvul && !fs.readFileSync(f, 'utf8').includes('name="kw-gegenereerd"')) { skipped.push(p.path); continue; }
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, build(p)); n++;
}
console.log(`${n} pagina's gemaakt${skipped.length ? `, overgeslagen (bestaat al, niet gegenereerd): ${skipped.join(', ')}` : ''}`);
