// textaudit.mjs: meet op elke pagina (of ONLY=...) alle zichtbare niet-titeltekst: berekende grootte, kleur, achtergrond, contrast.
// Normen (Karim 16-11): lopende tekst ≥17px desktop/≥16px gsm, kaarttekst ≥15px, labels/captions ≥13px, footer ≥15px,
// contrast ≥4,5:1; op donker minstens rgba(255,255,255,.75)-helderheid.
// Gebruik: node scripts/textaudit.mjs [poort] [json-uit]   env W=1440,390 ONLY=pad,pad
import fs from 'node:fs';
import { chromium } from 'playwright-core';
const PORT = +(process.argv[2] || 4101), OUT = process.argv[3];
let urls = [...fs.readFileSync('dist-live/sitemap.xml', 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]).concat(['/bedankt/', '/bestaat-niet/']);
if (process.env.ONLY) urls = process.env.ONLY.split(',').map(u => { const p = u.split('/').filter(Boolean).join('/'); return p && p !== 'home' ? '/' + p + '/' : '/'; });
const b = await chromium.launch({ channel: 'chrome' });
const rows = [];
for (const width of (process.env.W || '1440,390').split(',').map(Number)) {
  const ctx = await b.newContext({ viewport: { width, height: 900 }, isMobile: width < 500 });
  await ctx.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
  const queue = [...urls];
  await Promise.all(Array.from({ length: 4 }, async () => {
    const p = await ctx.newPage();
    while (queue.length) {
      const u = queue.shift();
      try {
        await p.goto(`http://localhost:${PORT}${u}`, { waitUntil: 'load', timeout: 30000 });
        await p.evaluate(() => document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg').forEach(e => e.classList.add('kw-in')));
        const r = await p.evaluate(() => {
          const cv = document.createElement('canvas').getContext('2d');
          const parse = c0 => { let c = c0; if (!/^rgba?\(/.test(c)) { if (c === 'transparent' || /none/.test(c)) return null; cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 }; } const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: v[0], g: v[1], b: v[2], a: v.length > 3 ? v[3] : 1 }; };
          const lum = ({ r, g, b }) => { const f = x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
          const bgOf = el => { // eerste niet-transparante achtergrond (verloop/beeld = 'beeld', gebruik dan de donkerste kleur van het verloop als benadering)
            for (let e = el; e; e = e.parentElement) {
              const s = getComputedStyle(e);
              const c = parse(s.backgroundColor); if (c && c.a > 0.5) return c;
              if (s.backgroundImage && s.backgroundImage !== 'none') { const cs = [...s.backgroundImage.matchAll(/rgba?\([^)]+\)/g)].map(m => parse(m[0])).filter(Boolean); if (cs.length && cs.every(c => c.a > 0.9)) { const m = k => cs.reduce((s, c) => s + c[k], 0) / cs.length; return { r: m('r'), g: m('g'), b: m('b'), a: 1, grad: true }; } }
            }
            return { r: 220, g: 221, b: 224, a: 1 };
          };
          const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a) });
          const out = [];
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          const seen = new Set();
          for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            if (!n.textContent.trim() || n.textContent.trim().length < 2) continue;
            const el = n.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
            if (el.closest('h1,h2,svg,[aria-hidden="true"],script,style,noscript,.kw-sr,.sr,[hidden],dialog,[data-drawer]')) continue;
            const q = el.getBoundingClientRect(); if (q.width < 2 || q.height < 2) continue;
            const s = getComputedStyle(el); if (s.visibility === 'hidden' || +s.opacity < 0.2) continue;
            const fs = parseFloat(s.fontSize); const fg = parse(s.color); if (!fg) continue;
            const bg = bgOf(el); const col = blend(fg, bg); const L1 = lum(col), L2 = lum(bg);
            const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
            const dark = L2 < 0.2;
            const type = el.closest('footer') ? 'footer' : el.closest('nav') && !el.closest('footer') ? 'label/caption' : el.closest('footer') ? 'footer' : el.closest('h3,h4') ? 'tussenkop' : el.closest('a.rounded-full, button, [class*="rounded-full"]') && fs < 17 ? 'pill/knop' : /^(P|LI|DD|TD|BLOCKQUOTE)$/.test(el.tagName) || el.closest('p,li,dd,.kw-prose') ? (el.closest('article,[class*="rounded-[2"]') ? 'kaarttekst' : 'lopende tekst') : 'label/caption';
            out.push({ type, tag: el.tagName.toLowerCase(), fs, color: s.color, bg: `rgb(${bg.r},${bg.g},${bg.b})${bg.grad ? ' (verloop)' : ''}`, ratio: +ratio.toFixed(2), dark, white: dark ? +((fg.r + fg.g + fg.b) / 3 / 255 * fg.a).toFixed(2) : null, cls: String(el.className).slice(0, 80), txt: n.textContent.trim().slice(0, 40) });
          }
          return out;
        });
        for (const x of r) rows.push({ width, u, ...x });
      } catch (e) { console.error(u, e.message.split('\n')[0]); }
    }
    await p.close();
  }));
  await ctx.close();
}
await b.close();
const min = { 'lopende tekst': w => (w > 500 ? 17 : 16), kaarttekst: () => 15, 'label/caption': () => 13, 'pill/knop': () => 13, footer: () => 15, tussenkop: () => 15 };
const bad = rows.filter(x => x.fs < min[x.type](x.width) - 0.01 || x.ratio < (x.fs >= 24 ? 3 : 4.5) || (x.fs < 24 && x.dark && x.white !== null && x.white < 0.74 && x.ratio < 7));
const sum = {}; for (const x of rows) { const k = x.type; sum[k] = sum[k] || { n: 0, klein: 0, contrast: 0, sizes: {} }; sum[k].n++; if (x.fs < min[k](x.width) - 0.01) sum[k].klein++; if (x.ratio < 4.5) sum[k].contrast++; sum[k].sizes[x.fs] = (sum[k].sizes[x.fs] || 0) + 1; }
if (OUT) fs.writeFileSync(OUT, JSON.stringify({ rows, bad, sum }, null, 1));
for (const [k, v] of Object.entries(sum)) console.log(`${k.padEnd(14)} ${String(v.n).padStart(6)} teksten | te klein ${v.klein} | contrast < 4,5 ${v.contrast} | groottes ${Object.entries(v.sizes).sort((a, b) => +a[0] - +b[0]).map(([s, n]) => s + 'px:' + n).join(' ')}`);
const groups = {}; for (const x of bad) { const k = `${x.type} | ${x.fs}px | ${x.color} op ${x.bg} | ${x.cls.slice(0, 50)}`; groups[k] = (groups[k] || 0) + 1; }
console.log(`\n${bad.length} teksten onder de norm, in ${Object.keys(groups).length} groepen:`);
for (const [k, n] of Object.entries(groups).sort((a, b) => b[1] - a[1]).slice(0, +(process.env.TOP || 40))) console.log(String(n).padStart(5) + '  ' + k);
process.exitCode = bad.length ? 1 : 0;
