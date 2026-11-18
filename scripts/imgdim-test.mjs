// imgdim-test.mjs: voor afbeeldingen zonder width/height op de voorbeeldsites: test of de echte pixelmaten als attribuut
// de layout ongemoeid laten (1440 en 390 px). Schrijft JSON {src: [w,h]} van de veilige gevallen.
import { chromium } from 'playwright-core'; import fs from 'node:fs'; import path from 'node:path';
const P = 4101, D = 'dist-live', DEMOS = ['barbier-voorbeeld','dakwerken-hoogland','horeca-voorbeeld','houtatelier-nethe','kapsalon-voorbeeld','kleurwerk-voorbeeld','schoonheidssalon-voorbeeld','tuin-voorbeeld'];
const pages = []; for (const d of DEMOS) (function w(x){ for (const e of fs.readdirSync(x,{withFileTypes:true})) { const f = path.join(x,e.name); if (e.isDirectory()) w(f); else if (e.name.endsWith('.html')) pages.push('/' + path.relative(D,f).split(path.sep).join('/').replace(/index\.html$/,'')); } })(path.join(D,d));
const b = await chromium.launch({ channel: 'chrome' }); const ok = {}, bad = {};
for (const W of [1440, 390]) { const pg = await (await b.newContext({ viewport: { width: W, height: 900 } })).newPage();
  for (const u of pages) { await pg.goto(`http://localhost:${P}${u}`, { waitUntil: 'load' });
    const r = await pg.evaluate(async () => { const out = []; const imgs = [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('width') || !i.hasAttribute('height'));
      for (const i of imgs) { if (!i.complete) await new Promise(res => { i.onload = i.onerror = res; setTimeout(res, 3000); });
        const a = i.getBoundingClientRect(); const s = i.getAttribute('src'); const w = i.naturalWidth, h = i.naturalHeight; if (!w) { out.push([s, 0, 0, false]); continue; }
        i.setAttribute('width', w); i.setAttribute('height', h); const c = i.getBoundingClientRect(); i.removeAttribute('width'); i.removeAttribute('height');
        out.push([s, w, h, Math.abs(a.width - c.width) < 0.5 && Math.abs(a.height - c.height) < 0.5]); } return out; });
    for (const [s, w, h, same] of r) { const k = u + '|' + s; if (same && !bad[k]) ok[k] = [w, h]; else { bad[k] = 1; delete ok[k]; } } } }
await b.close(); fs.writeFileSync(process.argv[2], JSON.stringify({ ok, bad: Object.keys(bad) }, null, 1));
console.log('veilig:', Object.keys(ok).length, 'niet veilig:', Object.keys(bad).length);
