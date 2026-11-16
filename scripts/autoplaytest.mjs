// autoplaytest.mjs: controleert dat de carrousels met [data-sel-auto] vanzelf doorschuiven, pauzeren bij hover en stilstaan bij
// "minder beweging". Gebruik: node scripts/autoplaytest.mjs [poort=4101]
import { chromium } from 'playwright-core';
const BASE = `http://localhost:${process.argv[2] || 4101}`;
const b = await chromium.launch({ channel: 'chrome' }); const bad = [];
const cur = (p, i) => p.evaluate(i => { const g = document.querySelectorAll('[data-sel-auto]')[i]; const own = [...g.querySelectorAll('[data-sel-panel]')].filter(e => e.closest('[data-sel]') === g); const v = own.find(e => !e.hidden); return v ? v.getAttribute('data-sel-panel') : null; }, i);
for (const reduced of [false, true]) {
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  await c.addInitScript(() => { try { localStorage.setItem('kw_consent', JSON.stringify({ v: 1, t: Date.now(), s: false, m: false })); } catch (e) {} });
  const p = await c.newPage(); await p.goto(BASE + '/', { waitUntil: 'load' });
  const n = await p.evaluate(() => document.querySelectorAll('[data-sel-auto]').length);
  for (let i = 0; i < n; i++) {
    const info = await p.evaluate(i => { const g = document.querySelectorAll('[data-sel-auto]')[i]; g.scrollIntoView({ block: 'center', behavior: 'instant' }); return { ms: +g.getAttribute('data-sel-auto'), cls: g.className.slice(0, 40) }; }, i);
    await p.mouse.move(2, 2); await p.waitForTimeout(300);
    const a = await cur(p, i); await p.waitForTimeout(info.ms + 900); const z = await cur(p, i);
    if (!reduced && a === z) bad.push(`carrousel ${i} (${info.cls}) schoof niet vanzelf door`);
    if (reduced && a !== z) bad.push(`carrousel ${i} schoof door ondanks "minder beweging"`);
    if (!reduced) { // hover: blijft staan
      // een punt in de carrousel dat niet op een knop of link ligt (tabs wisselen bewust bij hover)
      const box = await p.evaluate(i => {
        const g = document.querySelectorAll('[data-sel-auto]')[i], r = g.getBoundingClientRect();
        for (let fy = 0.05; fy < 1; fy += 0.05) for (let fx = 0.05; fx < 1; fx += 0.1) {
          const x = r.left + r.width * fx, y = r.top + r.height * fy; if (y < 5 || y > innerHeight - 5) continue;
          const e = document.elementFromPoint(x, y); if (e && g.contains(e) && !e.closest('a,button,[role=tab],[role=button]')) return { x, y };
        }
        return { x: r.left + 4, y: Math.max(r.top + 4, 5) };
      }, i);
      await p.mouse.move(box.x, box.y); const h1 = await cur(p, i); await p.waitForTimeout(info.ms + 900); const h2 = await cur(p, i);
      if (h1 !== h2) bad.push(`carrousel ${i} pauzeerde niet bij hover`);
    }
  }
  console.log(`${reduced ? 'minder beweging' : 'normaal'}: ${n} carrousels getest`);
  await c.close();
}
await b.close();
console.log(bad.length ? bad.join('\n') : 'autoplay in orde: schuift vanzelf door, pauzeert bij hover, staat stil bij minder beweging');
process.exitCode = bad.length ? 1 : 0;
