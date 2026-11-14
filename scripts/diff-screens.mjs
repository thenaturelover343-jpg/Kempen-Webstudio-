// diff-screens.mjs: vergelijkt _screens/<map-voor>/*.jpg met _screens/*.jpg pixel voor pixel.
// Gebruik: node scripts/diff-screens.mjs voor-motion   -> per beeld: hoogte gelijk?, % afwijkende pixels; verschilbeelden in _screens/diff/
// Een pixel telt als afwijkend bij een kleurverschil > 24 (op 255) in een kanaal (jpeg-ruis valt daaronder).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const A = path.join(ROOT, '_screens', process.argv[2] || 'voor-motion'), B = path.join(ROOT, '_screens'), D = path.join(ROOT, '_screens', 'diff');
fs.mkdirSync(D, { recursive: true });
const rows = [];
for (const f of fs.readdirSync(A).filter(f => f.endsWith('.jpg'))) {
  if (!fs.existsSync(path.join(B, f))) { rows.push([f, 'ontbreekt']); continue; }
  const [a, b] = await Promise.all([sharp(path.join(A, f)), sharp(path.join(B, f))].map(s => s.raw().toBuffer({ resolveWithObject: true })));
  if (a.info.width !== b.info.width || a.info.height !== b.info.height) { rows.push([f, `andere maat ${a.info.width}x${a.info.height} -> ${b.info.width}x${b.info.height}`]); continue; }
  const { width: w, height: h, channels: c } = a.info, out = Buffer.alloc(w * h * 3, 255);
  let n = 0;
  for (let i = 0, j = 0; i < a.data.length; i += c, j += 3) {
    const dif = Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2]));
    if (dif > 24) { n++; out[j] = 230; out[j + 1] = 0; out[j + 2] = 0; } else { const g = 200 + (a.data[i] >> 3); out[j] = out[j + 1] = out[j + 2] = g; }
  }
  const pct = n / (w * h) * 100;
  if (n) await sharp(out, { raw: { width: w, height: h, channels: 3 } }).jpeg({ quality: 70 }).toFile(path.join(D, f));
  rows.push([f, `${w}x${h}, afwijkend: ${pct.toFixed(3)}% (${n} px)`]);
}
for (const [f, t] of rows) console.log(f.padEnd(34), t);
