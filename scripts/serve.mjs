// serve.mjs: kleine statische server om een build lokaal te bekijken (zoals een statische host: map/ -> map/index.html,
// /map zonder slash -> 301 naar /map/, onbekend -> 404.html met status 404). Gebruik: node scripts/serve.mjs dist-test 4100
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const DIR = path.resolve(process.argv[2] || 'dist-test'), PORT = +(process.argv[3] || 4100);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.mp4': 'video/mp4', '.gif': 'image/gif' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = path.join(DIR, p);
  if (!f.startsWith(DIR)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
    if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' }); return res.end(); }
    f = path.join(f, 'index.html');
  }
  let status = 200;
  if (!fs.existsSync(f)) { status = 404; f = path.join(DIR, '404.html'); }
  const ext = path.extname(f).toLowerCase(); let body = fs.readFileSync(f);
  const h = { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': /\/assets\/(fonts|img)\/|\/assets\/site\.[0-9a-f]+\.js$/.test(f.split(path.sep).join('/')) ? 'public, max-age=31536000, immutable' : 'no-cache' };
  if (/\.(html|css|js|json|xml|txt|svg|webmanifest)$/.test(ext) && /\bbr\b/.test(req.headers['accept-encoding'] || '')) { body = zlib.brotliCompressSync(body); h['Content-Encoding'] = 'br'; }
  res.writeHead(status, h); res.end(body);
}).listen(PORT, () => console.log(`${DIR} op http://localhost:${PORT}`));
