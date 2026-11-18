// hovertest.mjs: controleert de hover- en micro-interacties (Karim 18-11) in een echte browser:
// kaart-lift, foto-zoom, pijl, onderlijn, submenu, FAQ, teller (vaste breedte), hero-parallax, minder beweging en touch.
// Gebruik: node scripts/hovertest.mjs [poort=4101]
import { chromium } from 'playwright-core';
const P = +(process.argv[2] || 4101), U = `http://localhost:${P}`;
const b = await chromium.launch({ channel: 'chrome' }); const bad = [], ok = [];
const chk = (c, m) => (c ? ok : bad).push(m);
const pg = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await pg.goto(U + '/', { waitUntil: 'load' }); await pg.evaluate(() => { const c = document.getElementById('ck'); if (c) c.hidden = true; }); await pg.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
// kaart-lift + foto-zoom (cases)
const card = pg.locator('#cases article').first(); await card.scrollIntoViewIfNeeded(); await pg.waitForTimeout(900); await card.hover(); await pg.waitForTimeout(600);
chk(await card.evaluate(e => getComputedStyle(e).transform.endsWith('-4)') && getComputedStyle(e, '::after').opacity === '1'), 'kaart: lift en schaduw bij hover');
chk(await card.evaluate(e => +(getComputedStyle(e.querySelector('.kw-zoom img')).transform.match(/matrix\(([\d.]+)/) || [0, 1])[1] > 1.02), 'foto: zoom bij hover');
// pijl in een knop
const arrowBtn = pg.locator('main a:has(.lucide-arrow-right)').first(); await arrowBtn.scrollIntoViewIfNeeded(); await arrowBtn.hover(); await pg.waitForTimeout(500);
chk(await arrowBtn.evaluate(e => getComputedStyle(e.querySelector('.lucide-arrow-right')).transform.includes('3, 0)')), 'knop: pijl schuift mee');
// footer-onderlijn
const fl = pg.locator('footer .kw-ul').first(); await fl.evaluate(e => e.scrollIntoView({ block: 'center' })); await pg.waitForTimeout(200); await fl.hover(); await pg.waitForTimeout(600);
const ft = await fl.evaluate(e => getComputedStyle(e, '::after').transform + ' ' + e.matches(':hover') + ' ' + e.textContent.trim().slice(0, 20)); chk(ft.startsWith('matrix(1, 0, 0, 1, 0, 0)'), 'footer: onderlijn bij hover (' + ft + ')');
// teller: vaste breedte, telt op, eindwaarde klopt
const cnt = pg.locator('[data-count]').first(); const txt = await cnt.evaluate(e => e.querySelector('span') ? e.querySelector('span').textContent : e.textContent);
const w0 = await cnt.evaluate(e => e.getBoundingClientRect().width); await cnt.scrollIntoViewIfNeeded(); await pg.waitForTimeout(300);
const mid = await cnt.evaluate(e => ({ t: e.textContent, w: e.getBoundingClientRect().width })); await pg.waitForTimeout(1500);
const end = await cnt.evaluate(e => ({ t: e.textContent, w: e.getBoundingClientRect().width }));
chk(Math.abs(mid.w - w0) < 0.5 && Math.abs(end.w - w0) < 0.5 && end.t === txt, `teller: telt op (${mid.t.replace(txt, '')} -> ${end.t}) met vaste breedte`);
// FAQ: inhoud schuift vloeiend binnen
const it = await pg.$('[data-faq-item]:not(.kw-open)'); await it.scrollIntoViewIfNeeded(); await (await it.$('button')).click(); await pg.waitForTimeout(40);
const o1 = await it.evaluate(e => +getComputedStyle(e.querySelector('.kw-acc > div > *')).opacity); await pg.waitForTimeout(600);
const o2 = await it.evaluate(e => +getComputedStyle(e.querySelector('.kw-acc > div > *')).opacity);
chk(o1 < 0.9 && o2 === 1, `FAQ: antwoord vloeit open (${o1} -> ${o2})`);
// submenu: items schuiven na elkaar binnen
await pg.evaluate(() => scrollTo(0, 0)); await pg.locator('[data-dd-btn]').first().click(); await pg.waitForTimeout(30);
chk(await pg.evaluate(() => getComputedStyle(document.querySelectorAll('.kw-dd a')[2]).animationName === 'kw-up'), 'submenu: items schuiven binnen');
await pg.mouse.click(5, 5);
// menulink: onderlijn
const nl = pg.locator('header nav .kw-ul').first(); await nl.hover(); await pg.waitForTimeout(600);
chk(await nl.evaluate(e => getComputedStyle(e, '::after').transform === 'matrix(1, 0, 0, 1, 0, 0)'), 'menu: onderlijn bij hover');
// hero-parallax op een subpagina
await pg.goto(U + '/website-winkel/', { waitUntil: 'load' }); await pg.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
await pg.evaluate(() => scrollTo(0, 300)); await pg.waitForTimeout(300);
chk(await pg.evaluate(() => /translate3d\(0px, 18/.test(document.querySelector('.kw-portrait img').style.transform)), 'hero: zachte parallax bij scrollen');
// minder beweging: geen lift, geen teller, geen parallax
const red = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
await red.goto(U + '/', { waitUntil: 'load' }); const c2 = red.locator('#cases article').first(); await c2.scrollIntoViewIfNeeded(); await c2.hover(); await red.waitForTimeout(300);
chk(await c2.evaluate(e => getComputedStyle(e).transform === 'none'), 'minder beweging: geen lift');
chk(await red.evaluate(() => !document.querySelector('[data-count] span')), 'minder beweging: geen teller');
// touch (gsm): geen hover-effecten
const tp = await (await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })).newPage();
await tp.goto(U + '/', { waitUntil: 'load' });
chk(await tp.evaluate(() => !matchMedia('(hover:hover) and (pointer:fine)').matches), 'touch: hover-regels gelden niet');
await b.close();
for (const m of ok) console.log('  ok   ' + m); for (const m of bad) console.log('  FOUT ' + m);
console.log(bad.length ? `hover: ${bad.length} fout(en)` : `hover in orde: ${ok.length} controles`); process.exitCode = bad.length ? 1 : 0;
