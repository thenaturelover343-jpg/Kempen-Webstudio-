// apply-corrections.mjs: past config/tekstcorrecties.json toe op content/ (wordt ook door import-content.mjs aangeroepen).
// Gebruik: node scripts/apply-corrections.mjs   -> meldt per correctie hoeveel keer ze is toegepast.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function applyCorrections(log = console.log) {
  const { corrections } = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'tekstcorrecties.json'), 'utf8'));
  const counts = corrections.map(() => 0);
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) { walk(f); continue; }
      if (!e.name.endsWith('.html')) continue;
      const rel = path.relative(path.join(ROOT, 'content'), f).split(path.sep).join('/');
      let s = fs.readFileSync(f, 'utf8'), changed = false;
      corrections.forEach((c, i) => {
        if (!rel.startsWith(c.lang + '/')) return;
        const n = s.split(c.from).length - 1; if (!n) return;
        s = s.split(c.from).join(c.to); counts[i] += n; changed = true;
      });
      if (changed) fs.writeFileSync(f, s);
    }
  })(path.join(ROOT, 'content'));
  corrections.forEach((c, i) => log(`  correctie ${c.lang}: "${c.from.replace(/<[^>]+>/g, '')}" -> "${c.to.replace(/<[^>]+>/g, '')}": ${counts[i]}x`));
  return counts;
}
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}` || process.argv[1].endsWith('apply-corrections.mjs')) applyCorrections();
