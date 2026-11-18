// golive.mjs: browsertest voor de livegang op dist-live (lokaal). Zet de CSP uit dist-live/_headers op elke response,
// vangt console-errors en CSP-schendingen op, test het contactformulier (web3forms onderschept: er gaat geen echte mail weg)
// en controleert dat statistiek (Cloudflare Insights) pas na toestemming laadt. Gebruik: node scripts/golive.mjs [poort=4101]
import { chromium } from 'playwright-core'; import fs from 'node:fs';
const P = +(process.argv[2] || 4101), U = `http://localhost:${P}`;
const H = fs.readFileSync('dist-live/_headers', 'utf8'); const CSP = (H.match(/Content-Security-Policy: (.+)/) || [])[1];
if (!CSP) { console.log('FOUT geen CSP in _headers'); process.exit(1); }
const PAGES = ['/', '/website-laten-maken-antwerpen/', '/wat-kost-een-website/', '/kennis/website-fiscaal-aftrekbaar/', '/fr/', '/en/website-cost/', '/contact/', '/voorbeeldontwerpen/', '/horeca-voorbeeld/', '/houtatelier-nethe/'];
const b = await chromium.launch({ channel: 'chrome' }); const bad = [], ok = [];
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let beacon = 0; let w3f = 0;
await ctx.route('**/*', async r => {
  const u = r.request().url();
  if (u.includes('cloudflareinsights.com')) { beacon++; return r.abort(); }
  if (u.includes('api.web3forms.com')) { w3f++; return r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true,"message":"test"}' }); }
  if (!u.startsWith(U)) return r.abort();
  const res = await r.fetch(); const hdr = { ...res.headers() }; if ((hdr['content-type'] || '').includes('text/html')) hdr['content-security-policy'] = CSP;
  return r.fulfill({ response: res, headers: hdr });
});
for (const p of PAGES) {
  const pg = await ctx.newPage(); const errs = [];
  pg.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 140)); });
  pg.on('pageerror', e => errs.push('JS: ' + e.message.slice(0, 140)));
  await pg.addInitScript(() => { window.__csp = []; document.addEventListener('securitypolicyviolation', e => window.__csp.push(e.violatedDirective + ' ' + (e.blockedURI || ''))); });
  await pg.goto(U + p, { waitUntil: 'load' }); await pg.waitForTimeout(1200);
  await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await pg.waitForTimeout(600);
  const csp = await pg.evaluate(() => window.__csp);
  const real = errs.filter(e => !/cloudflareinsights|ERR_FAILED|net::ERR_ABORTED|Failed to load resource/.test(e));
  (csp.length || real.length ? bad : ok).push(`${p}: CSP-schendingen ${csp.length}${csp.length ? ' (' + csp.slice(0, 3).join('; ') + ')' : ''}, console-errors ${real.length}${real.length ? ' (' + real.slice(0, 2).join('; ') + ')' : ''}`);
  await pg.close();
}
// cookiekeuze en statistiek
{ const pg = await ctx.newPage(); beacon = 0; await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false })); await pg.goto(U + '/', { waitUntil: 'load' }); await pg.waitForTimeout(1500);
  const banner = await pg.evaluate(() => { const c = document.getElementById('ck'); return !!c && !c.hidden; });
  const before = beacon; await pg.click('#ck [data-ck="all"]'); await pg.waitForTimeout(1500); const after = beacon;
  (banner && before === 0 && after > 0 ? ok : bad).push(`cookiebanner zichtbaar: ${banner}; statistiek vóór toestemming: ${before} verzoeken, na "alles accepteren": ${after}`);
  await pg.close(); }
// contactformulier: geldige sleutel, verzending, doorverwijzing naar de bedanktpagina
{ const pg = await ctx.newPage(); w3f = 0; await pg.goto(U + '/contact/', { waitUntil: 'load' });
  const f = await pg.$('form[data-kw-form]'); const key = await f.evaluate(x => (x.elements.access_key || {}).value || '');
  await f.evaluate(x => { x.elements.naam.value = 'Test'; x.elements.email.value = 'test@example.com'; x.elements.bericht.value = 'Testbericht golive'; });
  await Promise.all([pg.waitForURL(/bedankt/, { timeout: 8000 }).catch(() => {}), f.evaluate(x => x.requestSubmit())]);
  const url = pg.url();
  (/^[0-9a-f-]{36}$/i.test(key) && w3f === 1 && /\/bedankt\//.test(url) ? ok : bad).push(`formulier: sleutel ${/^[0-9a-f-]{36}$/i.test(key) ? 'geldig formaat' : 'ONGELDIG'}, verzending naar web3forms ${w3f}x (onderschept), daarna op ${url.replace(U, '')}`);
  await pg.close(); }
await b.close();
for (const m of ok) console.log('  ok   ' + m); for (const m of bad) console.log('  FOUT ' + m);
console.log(bad.length ? `golive: ${bad.length} fout(en)` : `golive in orde: ${ok.length} controles`); process.exitCode = bad.length ? 1 : 0;
