// shoot-sites.mjs: screenshots van de klantsites (cases) als bronbeeld in src/img/foto/
import { chromium } from 'playwright-core';
const sites = { 'case-koelaanhangwagen': 'https://koelaanhangwagenverhuur.be/', 'case-taponderhoud': 'https://taponderhoud.be/', 'case-barlicious': 'https://barlicious.be/' };
const b = await chromium.launch({ channel: 'chrome' });
for (const [n, u] of Object.entries(sites)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  try { await p.goto(u, { waitUntil: 'networkidle', timeout: 30000 }); await p.waitForTimeout(1500);
    await p.screenshot({ path: `src/img/foto/${n}-d.png` }); console.log('ok', n);
  } catch (e) { console.log('fout', n, e.message.split('\n')[0]); }
  await p.close();
}
await b.close();
