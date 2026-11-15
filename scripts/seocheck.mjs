// seocheck.mjs: title ≤60, description ≤155, geen dubbele titles/descriptions, één H1, eigen og:image, alt op elk beeld (indexeerbare pagina's).
import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';
const DIR = path.resolve(process.argv[2] || 'dist-live');
const sm = fs.readFileSync(path.join(DIR, 'sitemap.xml'), 'utf8');
const urls = [...sm.matchAll(/<loc>https:\/\/www\.kempenwebstudio\.be(\/[^<]*)<\/loc>/g)].map(m => m[1]);
const bad = [], titles = new Map(), descs = new Map(); let ogOwn = 0;
for (const u of urls) {
  const f = path.join(DIR, u, 'index.html'); const d = parseHTML(fs.readFileSync(f, 'utf8')).document;
  const t = d.title.trim(), desc = d.querySelector('meta[name=description]')?.getAttribute('content') || '';
  if ([...t].length > 60) bad.push(`title ${[...t].length} > 60: ${u} "${t}"`);
  if ([...desc].length > 155 || [...desc].length < 70) bad.push(`description ${[...desc].length}: ${u}`);
  if (d.querySelectorAll('h1').length !== 1) bad.push(`h1 ${d.querySelectorAll('h1').length}x: ${u}`);
  for (const i of d.querySelectorAll('img')) if (!i.hasAttribute('alt')) bad.push(`img zonder alt: ${u}`);
  if (/\/assets\/og\//.test(d.querySelector('meta[property="og:image"]')?.getAttribute('content') || '')) ogOwn++; else bad.push(`geen eigen og:image: ${u}`);
  (titles.get(t) || titles.set(t, []).get(t)).push(u); (descs.get(desc) || descs.set(desc, []).get(desc)).push(u);
}
for (const [t, us] of titles) if (us.length > 1) bad.push(`dubbele title "${t}": ${us.join(', ')}`);
for (const [t, us] of descs) if (us.length > 1) bad.push(`dubbele description: ${us.join(', ')}`);
console.log(`${urls.length} indexeerbare pagina's, ${ogOwn} met eigen deelbeeld`);
console.log(bad.length ? bad.join('\n') : '0 SEO-fouten (title, description, H1, alt, og:image, dubbels)');
process.exitCode = bad.length ? 1 : 0;
