// apply-demo-weg.mjs: past config/demo-weg.json toe op content/ (beslissing Karim 14-11-2026: geen gratis demo meer).
// Werkt in tekst, attributen (title, meta, alt, aria-label, value) en JSON-LD. Wordt ook door import-content.mjs aangeroepen.
// Schrijft TEKST-WIJZIGINGEN-DEMO.md (oud -> nieuw per URL) wanneer er iets gewijzigd is.
// Gebruik: node scripts/apply-demo-weg.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function rx(from, mode) {
  let body = '';
  for (const ch of from) {
    if (ch === ' ') body += '\\s+';
    else if (mode === 'html' && ch === "'") body += "(?:'|&#x27;|&#39;)";
    else if (mode === 'html' && ch === '"') body += '(?:"|&quot;)';
    else if (mode === 'html' && ch === '&') body += '(?:&|&amp;)';
    else body += esc(ch);
  }
  return body;
}
const L_ = '(?<![\\p{L}\\p{N}])', R_ = '(?![\\p{L}\\p{N}])';

function rulesFor(cfg, lang) {
  const c = cfg[lang]; if (!c) return [];
  const byLen = a => [...a].sort((x, y) => y[0].length - x[0].length);
  // korte sleutels (max. 4 woorden, geen leesteken) alleen als volledige tekst (knoop, attribuut of JSON-string), nooit midden in een zin
  const short = f => f.split(' ').length <= 4 && !/[.,:;?!]/.test(f);
  return [...byLen(c.zinnen).map(([f, t]) => [f, t, short(f)]), ...byLen(c.frasen).map(([f, t]) => [f, t, false]), ...(c.regex || []).map(([f, t]) => [f, t, 're'])];
}

function applyText(s, rules, mode, log) {
  for (const [from, to, kind] of rules) {
    if (kind === 're') { s = s.replace(new RegExp(from, 'gu'), (...m) => { const t = to.replace(/\$(\d)/g, (_, i) => m[+i] || ''); log.push([m[0], t]); return t; }); continue; }
    const f = mode === 'json' ? JSON.stringify(from).slice(1, -1) : from;
    const t = mode === 'json' ? JSON.stringify(to).slice(1, -1) : to.replace(/&/g, '&amp;');
    const pre = kind ? '(?<=(?:>|")\\s*)' : (to === '' ? '\\s*' : '') + L_, post = kind ? '(?=\\s*(?:<|"))' : R_;
    const re = new RegExp(pre + rx(f, mode) + post, 'gu');
    s = s.replace(re, () => { log.push([from, to]); return t; });
  }
  return s;
}

function applyFile(html, rules, log) {
  // JSON-LD apart (JSON-escaping), andere scripts/stijlen ongemoeid, de rest als HTML
  const parts = html.split(/(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>)/);
  return parts.map((p, i) => {
    if (i % 2 === 0) return applyText(p, rules, 'html', log);
    if (/^<script[^>]*ld\+json/.test(p)) return applyText(p, rules, 'json', log);
    return p;
  }).join('');
}

const META = html => {
  const g = re => { const m = html.match(re); return m ? m[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : ''; };
  return {
    title: g(/<title>([\s\S]*?)<\/title>/),
    description: g(/<meta name="description" content="([^"]*)"/),
    'og:title': g(/<meta property="og:title" content="([^"]*)"/),
    'og:description': g(/<meta property="og:description" content="([^"]*)"/),
    h1: g(/<h1\b[^>]*>([\s\S]*?)<\/h1>/),
  };
};

export function applyDemoWeg(say = console.log) {
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'demo-weg.json'), 'utf8'));
  const R = { nl: rulesFor(cfg, 'nl'), fr: rulesFor(cfg, 'fr'), en: rulesFor(cfg, 'en') };
  const demo = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'live-config.json'), 'utf8')).demoFolders || []);
  const report = []; let total = 0;
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      const rel = path.relative(CONTENT, f).split(path.sep).join('/');
      if (e.isDirectory()) { if (!demo.has(rel)) walk(f); continue; }  // fictieve voorbeeldsites blijven ongewijzigd
      if (!e.name.endsWith('.html')) continue;
      const lang = rel.startsWith('fr/') ? 'fr' : rel.startsWith('en/') ? 'en' : 'nl';
      const old = fs.readFileSync(f, 'utf8'), log = [];
      const neu = applyFile(old, R[lang], log);
      if (neu === old) continue;
      fs.writeFileSync(f, neu); total += log.length;
      const url = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
      report.push({ url, lang, meta: [META(old), META(neu)], log });
    }
  })(CONTENT);
  say(`  demo weg: ${total} vervangingen op ${report.length} pagina's`);
  if (report.length) writeReport(report);
  return { total, pages: report.length };
}

function writeReport(report) {
  report.sort((a, b) => a.url.localeCompare(b.url));
  const out = ['# Tekstwijzigingen: geen gratis demo meer', '',
    `Automatisch gemaakt door \`scripts/apply-demo-weg.mjs\` (${new Date().toISOString().slice(0, 10)}). Beslissing Karim: "We stoppen met de gratis demo dat moet er overal uit en de tekst moet seo geoptimaliseerd blijven".`, '',
    'Nieuwe CTA: **Vrijblijvend voorstel aanvragen** (FR: *Demander une proposition sans engagement*, EN: *Request a no-obligation proposal*). De regels staan in `config/demo-weg.json` en worden bij elke import opnieuw toegepast. Wil Karim een tekst anders, pas dan die regel aan en draai `node scripts/apply-demo-weg.mjs` + `npm run build`.', '',
    '**Ter controle door Karim:** "U betaalt pas als u tevreden bent" en "U zit nergens aan vast" zijn blijven staan waar ze niet over de demo gingen. Klopt dat nog zonder demo?', '',
    '**Lengtes:** elke NL-title ≤ 60 en elke NL-description ≤ 155 tekens. Geen enkele title of description is door deze wijziging boven die grens gegaan. ⚠ = langer dan 155/60, maar dat was die FR/EN-tekst op de huidige site al, en ze is niet langer geworden.', '',
    '## 1. Titels, descriptions en H1 (met lengte)', '',
    '| URL | veld | oud | nieuw | lengte |', '|---|---|---|---|---|'];
  for (const r of report) for (const k of ['title', 'description', 'og:title', 'og:description', 'h1']) {
    const [o, n] = [r.meta[0][k], r.meta[1][k]];
    if (o !== n) out.push(`| ${r.url} | ${k} | ${o.replace(/\|/g, '\\|')} | ${n.replace(/\|/g, '\\|')} | ${n.length}${(k.includes('title') && n.length > 60) || (k.includes('description') && n.length > 155) ? ' ⚠' : ''} |`);
  }
  out.push('', '## 2. Alle gewijzigde zinnen per URL', '', 'Zinnen die op meerdere plaatsen van een pagina staan (tekst, meta, JSON-LD), staan één keer, met het aantal.', '');
  for (const r of report) {
    out.push(`### ${r.url}`, '');
    const m = new Map(); for (const [f, t] of r.log) { const k = f + '\u0000' + t; m.set(k, (m.get(k) || 0) + 1); }
    for (const [k, n] of m) { const [f, t] = k.split('\u0000'); out.push(`- ~~${f}~~ → ${t || '*(weggelaten)*'}${n > 1 ? ` (${n}x)` : ''}`); }
    out.push('');
  }
  fs.writeFileSync(path.join(ROOT, 'TEKST-WIJZIGINGEN-DEMO.md'), out.join('\n'));
}

if ((process.argv[1] || '').endsWith('apply-demo-weg.mjs')) applyDemoWeg();
