// belgie-kaart.mjs (eenmalig): maakt src/site/belgie-kaart.json uit de NUTS-2-grenzen van Eurostat/GISCO
// (© EuroGeographics voor de administratieve grenzen; NUTS_RG_10M_2021_4326_LEVL_2). NUTS-2 in België = de provincies + Brussel.
// Projectie: equirectangulair met cos(breedte) als schaal, vereenvoudigd (Douglas-Peucker). Steden met hun coördinaten.
// Gebruik: node scripts/belgie-kaart.mjs pad/naar/nuts2.geojson
import fs from 'node:fs';
const src = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const be = src.features.filter(f => f.properties.CNTR_CODE === 'BE');
const W = 600, LAT0 = 50.6, K = Math.cos(LAT0 * Math.PI / 180);
let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
const raw = ([lon, lat]) => [lon * K, -lat];
for (const f of be) for (const poly of (f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates)) for (const ring of poly) for (const c of ring) { const [x, y] = raw(c); minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
const S = (W - 20) / (maxX - minX), H = Math.round((maxY - minY) * S + 20);
const proj = c => { const [x, y] = raw(c); return [+((x - minX) * S + 10).toFixed(1), +((y - minY) * S + 10).toFixed(1)]; };
function dp(pts, tol) { // Douglas-Peucker
  if (pts.length < 3) return pts;
  let idx = 0, dmax = 0; const [a, b] = [pts[0], pts[pts.length - 1]];
  for (let i = 1; i < pts.length - 1; i++) { const p = pts[i]; const num = Math.abs((b[1] - a[1]) * p[0] - (b[0] - a[0]) * p[1] + b[0] * a[1] - b[1] * a[0]); const den = Math.hypot(b[1] - a[1], b[0] - a[0]) || 1; const d = num / den; if (d > dmax) { dmax = d; idx = i; } }
  if (dmax > tol) return [...dp(pts.slice(0, idx + 1), tol).slice(0, -1), ...dp(pts.slice(idx), tol)];
  return [a, b];
}
const NAMES = { BE10: 'Brussel', BE21: 'Antwerpen', BE22: 'Limburg', BE23: 'Oost-Vlaanderen', BE24: 'Vlaams-Brabant', BE25: 'West-Vlaanderen', BE31: 'Waals-Brabant', BE32: 'Henegouwen', BE33: 'Luik', BE34: 'Luxemburg', BE35: 'Namen' };
const provinces = be.map(f => {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polys.map(poly => poly.map(ring => { const r = ring.map(proj), m = Math.floor(r.length / 2); const p = [...dp(r.slice(0, m + 1), 0.6).slice(0, -1), ...dp(r.slice(m), 0.6)]; return p.length > 2 ? 'M' + p.map(q => q.join(',')).join('L') + 'Z' : ''; }).join('')).join('');
  return { id: f.properties.NUTS_ID, name: NAMES[f.properties.NUTS_ID] || f.properties.NAME_LATN, d };
}).sort((a, b) => a.id.localeCompare(b.id));
const CITIES = [ // [sleutel, naam, breedte, lengte]
  ['kasterlee', 'Kasterlee', 51.2408, 4.9678], ['turnhout', 'Turnhout', 51.3227, 4.9447], ['geel', 'Geel', 51.1615, 4.9907], ['mol', 'Mol', 51.191, 5.116], ['herentals', 'Herentals', 51.1766, 4.8368],
  ['antwerpen', 'Antwerpen', 51.2194, 4.4025], ['mechelen', 'Mechelen', 51.0259, 4.4776], ['gent', 'Gent', 51.0543, 3.7174], ['leuven', 'Leuven', 50.8798, 4.7005], ['brussel', 'Brussel', 50.8503, 4.3517],
  ['kortrijk', 'Kortrijk', 50.828, 3.2649], ['brugge', 'Brugge', 51.2093, 3.2247], ['hasselt', 'Hasselt', 50.9307, 5.3378], ['liege', 'Luik', 50.6326, 5.5797], ['namur', 'Namen', 50.4674, 4.872], ['charleroi', 'Charleroi', 50.4108, 4.4446],
];
const cities = CITIES.map(([k, n, lat, lon]) => { const [x, y] = proj([lon, lat]); return { k, n, x, y }; });
const out = { bron: '© EuroGeographics voor de administratieve grenzen (Eurostat GISCO, NUTS 2021, 1:10M)', w: W, h: H, provinces, cities };
fs.writeFileSync('src/site/belgie-kaart.json', JSON.stringify(out));
console.log(`viewBox 0 0 ${W} ${H}, ${provinces.length} gebieden, ${(JSON.stringify(provinces).length / 1024).toFixed(1)} kB paden`);
