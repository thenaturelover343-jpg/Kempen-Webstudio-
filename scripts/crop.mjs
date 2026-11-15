// crop.mjs: uitsnede van een screenshot. Gebruik: node scripts/crop.mjs bestand.jpg top hoogte uit.jpg
import sharp from 'sharp';
const [f, top, h, out] = process.argv.slice(2);
const m = await sharp(f).metadata();
const H = Math.min(+h, m.height - +top);
await sharp(f).extract({ left: 0, top: +top, width: m.width, height: H }).jpeg({ quality: 80 }).toFile(out);
console.log(m.width + 'x' + m.height);
