// leesbaar.mjs (eenmalig, herhaalbaar): Karim 16-11 "zeer moeilijk leesbaar omdat ze zo klein zijn".
// Trekt alle tekstgroottes in de componenten op: lopende tekst (p, li, dd, blockquote, td, figcaption, of een vak met
// leading-relaxed/kw-prose) minstens 16px; tussenkoppen (h3/h4) minstens 17px; labels, knoppen, captions minstens 14px.
// Werkt op de Tailwind-klassen text-[Npx] (ook met sm:/md:/lg:/xl:-prefix). Grote titels blijven zoals ze zijn.
import fs from 'node:fs';
const FILES = ['Home', 'Blocks', 'Header', 'Footer', 'Contact', 'Chrome', 'primitives'].map(f => `src/design/${f}.tsx`).filter(f => fs.existsSync(f));
const BODY = new Set(['p', 'li', 'dd', 'blockquote', 'td', 'figcaption', 'label']);
let total = 0;
for (const f of FILES) {
  const s = fs.readFileSync(f, 'utf8'); let out = '', last = 0, n = 0;
  for (const m of s.matchAll(/((?:sm|md|lg|xl|2xl):)?text-\[(\d+(?:\.\d+)?)px\]/g)) {
    const px = +m[2]; if (px >= 16) continue;
    const before = s.slice(Math.max(0, m.index - 1500), m.index);
    const tagM = [...before.matchAll(/<([a-zA-Z][\w.]*)[\s>]/g)].pop(); const tag = tagM ? tagM[1] : '';
    const lineStart = s.lastIndexOf('\n', m.index), lineEnd = s.indexOf('\n', m.index); const line = s.slice(lineStart, lineEnd);
    const body = BODY.has(tag) || /leading-relaxed|kw-prose|leading-snug/.test(line) && /<(p|div|li|Prose)\b/.test(line);
    const head = tag === 'h3' || tag === 'h4';
    const want = body ? 16 : head ? 17 : 14;
    if (px >= want) continue;
    out += s.slice(last, m.index) + (m[1] || '') + `text-[${want}px]`; last = m.index + m[0].length; n++;
  }
  out += s.slice(last);
  if (n) { fs.writeFileSync(f, out); total += n; console.log(`${f}: ${n} groottes opgetrokken`); }
}
console.log(`totaal ${total}`);
