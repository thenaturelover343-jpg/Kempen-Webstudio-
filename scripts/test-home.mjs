// test-home.mjs: klikt alles op een pagina (standaard de home) op 1440 en 390 en meldt wat niet werkt.
// Gebruik: node scripts/test-home.mjs [url=http://localhost:4100/]
import { chromium } from 'playwright-core';
const URL = process.argv[2] || 'http://localhost:4100/';
const b = await chromium.launch({ channel: 'chrome' });
const fails = [], oks = [];
const ok = (c, m) => (c ? oks : fails).push(m);
for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, isMobile: w < 500, hasTouch: w < 500 });
  const p = await ctx.newPage(); p.setDefaultTimeout(15000);
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const bad = []; p.on('response', r => { if (r.status() >= 400 && r.url().startsWith(new globalThis.URL(URL).origin)) bad.push(r.status() + ' ' + r.url()); });
  await p.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  const T = `[${w}]`;
  // cookiebanner (nieuwe bezoeker)
  ok(await p.locator('#ck').isVisible(), `${T} cookiebanner zichtbaar bij eerste bezoek`);
  await p.click('#ck [data-ck="none"]').catch(() => {}); await p.waitForTimeout(300);
  ok(!(await p.locator('#ck').isVisible()), `${T} cookiebanner sluit na keuze`);
  ok(await p.evaluate(() => !!localStorage.getItem('kw_consent')), `${T} cookiekeuze bewaard`);
  // menu
  const menuBtn = p.locator('button[aria-controls]', { hasText: /MENU/i }).first();
  if (await menuBtn.count()) {
    await menuBtn.click(); await p.waitForTimeout(450);
    ok(await p.evaluate(() => !!document.querySelector('.kw-drawer.kw-open')), `${T} menupaneel opent`);
    await p.keyboard.press('Escape'); await p.waitForTimeout(450);
    ok(await p.evaluate(() => !document.querySelector('.kw-drawer.kw-open')), `${T} menupaneel sluit met Escape`);
  } else fails.push(`${T} geen MENU-knop gevonden`);
  // submenu Diensten (alleen desktop)
  if (w > 500) {
    const dd = p.locator('[data-dd] [data-dd-btn]').first();
    if (await dd.count()) { await dd.click(); await p.waitForTimeout(300); ok(await p.evaluate(() => [...document.querySelectorAll('[data-dd]')].some(d => d.classList.contains('kw-dd-open'))), `${T} Diensten-submenu opent`); await p.keyboard.press('Escape'); }
    else fails.push(`${T} geen Diensten-submenu gevonden`);
  }
  // taalkeuze
  const langs = await p.evaluate(() => [...document.querySelectorAll('header a[hreflang], header a[lang]')].map(a => a.getAttribute('href')));
  ok(langs.length >= 2, `${T} taalkeuze heeft links (${langs.join(', ')})`);
  // sliders / keuzes
  const sels = await p.evaluate(async () => {
    const out = [];
    for (const g of document.querySelectorAll('[data-sel]')) {
      const own = s => [...g.querySelectorAll(s)].filter(e => e.closest('[data-sel]') === g);
      const panels = own('[data-sel-panel]'), items = own('[data-sel-item]');
      const btn = own('[data-sel-next]')[0] || own('[data-sel-to]').find(x => +x.getAttribute('data-sel-to') === 1);
      if (!btn || (!panels.length && !items.length)) continue;
      const before = panels.length ? panels.findIndex(x => !x.hidden) : items.findIndex(x => x.className.includes((x.getAttribute('data-on') || '').split(' ')[0]));
      btn.click(); await new Promise(r => setTimeout(r, 120));
      const after = panels.length ? panels.findIndex(x => !x.hidden) : items.findIndex(x => x.className.includes((x.getAttribute('data-on') || '').split(' ')[0]));
      out.push({ name: (g.getAttribute('aria-label') || g.className).slice(0, 40), before, after });
    }
    return out;
  });
  for (const s of sels) ok(s.before !== s.after, `${T} keuze/slider wisselt: ${s.name} (${s.before} -> ${s.after})`);
  // FAQ
  const faq = await p.evaluate(async () => {
    const r = {}; const q = document.querySelector('[data-faq-item] button[aria-expanded]'); if (!q) return null;
    const a = q.getAttribute('aria-expanded'); q.click(); await new Promise(r => setTimeout(r, 100)); r.acc = a !== q.getAttribute('aria-expanded'); q.click();
    const tabs = [...document.querySelectorAll('[data-faq] [role=tab]')]; if (tabs[1]) { tabs[1].click(); await new Promise(r => setTimeout(r, 100)); r.tab = [...document.querySelectorAll('[data-faq-item]')].filter(x => !x.hidden).length; r.all = document.querySelectorAll('[data-faq-item]').length; tabs[0].click(); }
    return r;
  });
  ok(faq && faq.acc, `${T} FAQ klapt open/dicht`); ok(faq && faq.tab > 0 && faq.tab < faq.all, `${T} FAQ-filter werkt (${faq && faq.tab}/${faq && faq.all})`);
  // contactvenster
  await p.evaluate(() => scrollTo(0, 0));
  const chat = p.locator('[data-chat]:visible').first();
  await chat.click(); await p.waitForTimeout(400);
  ok(await p.evaluate(() => !!document.querySelector('.kw-modal.kw-open')), `${T} contactvenster opent`);
  const v = await p.evaluate(async () => { const f = document.querySelector('.kw-modal form'); if (!f) return null; f.querySelector('button[type=submit]').click(); await new Promise(r => setTimeout(r, 150)); const e = f.querySelector('[data-err]'); return e && !e.hidden && e.textContent.length > 3; });
  ok(v, `${T} formulier toont foutmelding bij lege velden`);
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => !document.querySelector('.kw-modal.kw-open')), `${T} contactvenster sluit met Escape`);
  // zwevende knoppen: bovenaan onzichtbaar, na de hero zichtbaar, bij contact weer weg
  const fl = async () => p.evaluate(() => { const f = document.querySelector('[data-floating]'); return f ? getComputedStyle(f).visibility : 'none'; });
  ok(await fl() !== 'visible', `${T} zwevende knoppen verborgen in de hero`);
  await p.evaluate(() => scrollTo(0, innerHeight * 2.4)); await p.waitForTimeout(400);
  // op gsm verdwijnt de knop bij naar beneden scrollen (Karim 18-11) en komt hij terug bij omhoog scrollen
  await p.evaluate(() => scrollTo(0, innerHeight * 2.2)); await p.waitForTimeout(500);
  ok(await fl() === 'visible', `${T} zwevende knoppen zichtbaar na de hero (bij omhoog scrollen)`);
  // hele pagina scrollen: alles verschenen, niets horizontaal
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 400) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(50); }
  await p.waitForTimeout(900);
  const vis = await p.evaluate(() => [...document.querySelectorAll('.kw-fade, .kw-sec, .kw-sg > .kw-si')].filter(e => e.getClientRects().length && +getComputedStyle(e).opacity < 0.99).length);
  ok(vis === 0, `${T} alle verschijn-animaties gestart (${vis} blijven verborgen)`);
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${T} geen horizontaal scrollen`);
  // lege of kapotte beelden
  const imgs = await p.evaluate(() => [...document.images].filter(i => i.getClientRects().length && !(i.complete && i.naturalWidth)).map(i => i.currentSrc || i.src));
  ok(imgs.length === 0, `${T} alle beelden geladen ${imgs.join(' ')}`);
  // alle links: href aanwezig, ankers bestaan
  const links = await p.evaluate(() => [...document.querySelectorAll('a')].map(a => ({ h: a.getAttribute('href'), t: (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 30) })));
  const noHref = links.filter(l => !l.h || l.h === '#'); ok(noHref.length === 0, `${T} alle links hebben een doel ${noHref.map(l => l.t).join(', ')}`);
  const anchors = await p.evaluate(() => [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1)))));
  ok(anchors.length === 0, `${T} alle ankers bestaan ${anchors.join(' ')}`);
  ok(bad.length === 0, `${T} geen 404/500-verzoeken ${bad.slice(0, 5).join(' ')}`);
  ok(errs.length === 0, `${T} geen JS-fouten ${errs.slice(0, 3).join(' | ')}`);
  await ctx.close();
}
await b.close();
console.log(`OK: ${oks.length}, FOUT: ${fails.length}`);
fails.forEach(f => console.log('FOUT ' + f));
process.exit(fails.length ? 1 : 0);
