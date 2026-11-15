// kaart.mjs: statische kaart van Kasterlee en omgeving uit OpenStreetMap-tegels (© OpenStreetMap-bijdragers, ODbL),
// voor de contactpagina. Eenmalig; resultaat: src/img/foto/bron/kaart-kasterlee.png. Speld op het centrum van Kasterlee
// (Nominatim: 51.2407915, 4.9678120), niet op een huisadres.
import sharp from 'sharp';
const LAT = 51.2407915, LON = 4.967812, Z = 11, W = 1280, H = 720;
const n = 2 ** Z, xt = (LON + 180) / 360 * n, yt = (1 - Math.log(Math.tan(LAT * Math.PI / 180) + 1 / Math.cos(LAT * Math.PI / 180)) / Math.PI) / 2 * n;
const px = xt * 256, py = yt * 256, x0 = px - W / 2, y0 = py - H / 2;
const tiles = [];
for (let tx = Math.floor(x0 / 256); tx <= Math.floor((x0 + W) / 256); tx++) for (let ty = Math.floor(y0 / 256); ty <= Math.floor((y0 + H) / 256); ty++) {
  const r = await fetch(`https://tile.openstreetmap.org/${Z}/${tx}/${ty}.png`, { headers: { 'User-Agent': 'kw-static-site-build/1.0 (one-off static map)' } });
  if (!r.ok) throw new Error('tegel ' + r.status);
  tiles.push({ input: Buffer.from(await r.arrayBuffer()), left: Math.round(tx * 256 - x0), top: Math.round(ty * 256 - y0) });
  await new Promise(r => setTimeout(r, 300));
}
const pin = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><g transform="translate(${W / 2},${H / 2})"><circle r="34" fill="#B85D28" fill-opacity=".18"/><path d="M0 0 C-14 -18 -20 -28 -20 -38 A20 20 0 1 1 20 -38 C20 -28 14 -18 0 0Z" fill="#B85D28" stroke="#fff" stroke-width="3"/><circle cy="-38" r="7" fill="#fff"/></g><rect x="${W - 250}" y="${H - 30}" width="250" height="30" fill="#fff" fill-opacity=".85"/><text x="${W - 10}" y="${H - 10}" font-family="Arial" font-size="15" text-anchor="end" fill="#333">© OpenStreetMap-bijdragers</text></svg>`);
const base = await sharp({ create: { width: W, height: H, channels: 3, background: '#eee' } }).composite(tiles).png().toBuffer();
await sharp(base).modulate({ saturation: 0.35 }).composite([{ input: pin }]).png().toFile('src/img/foto/bron/kaart-kasterlee.png');
console.log('kaart klaar', tiles.length, 'tegels');
