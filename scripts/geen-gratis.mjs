// geen-gratis.mjs (herhaalbaar): Karim 16-11-2026 "GEEN GRATIS DEMOS". Haalt uit alle eigen content-pagina's (NL/FR/EN) elke
// formulering die suggereert dat u eerst iets gratis krijgt of pas betaalt als u tevreden bent, ook in meta en JSON-LD.
// Nieuwe lijn: eerst een vrijblijvend voorstel met de prijs vooraf, daarna beslist u. Verborgen ankers 'gratis-demo' krijgen een neutrale naam.
import fs from 'node:fs';
import path from 'node:path';
const DEMO = new Set(JSON.parse(fs.readFileSync('config/live-config.json', 'utf8')).demoFolders);
const REP = [
  // NL
  [/Pas betalen als u tevreden bent\./g, 'Daarna beslist u.'],
  [/U betaalt pas als u tevreden bent\./g, 'U kent de prijs vooraf en beslist daarna zelf.'],
  [/,? en u betaalt pas als u tevreden bent/g, ' en daarna beslist u'],
  [/,? (?:en )?betaalt pas als u tevreden bent/g, ' en beslist daarna, met de prijs vooraf'],
  [/u betaalt pas als u tevreden bent/gi, 'u kent de prijs vooraf en beslist daarna'],
  [/eerst gratis een demo van uw (eigen )?zaak/g, 'eerst een vrijblijvend voorstel voor uw zaak'],
  [/eerst bouwen wij gratis een demo van uw zaak/g, 'eerst maken wij een vrijblijvend voorstel voor uw zaak'],
  [/een eigen ontwerp en eerst gratis een demo van uw zaak/g, 'een eigen ontwerp en eerst een vrijblijvend voorstel'],
  // FR
  [/Payer seulement si vous êtes satisfait\./g, 'Ensuite, vous décidez.'],
  [/Vous ne payez que si vous êtes satisfait\./g, 'Vous connaissez le prix d’avance et décidez ensuite.'],
  [/,? et vous ne payez que si vous êtes satisfait/g, ' et vous décidez ensuite, avec le prix connu d’avance'],
  [/vous ne payez que si vous êtes satisfait/gi, 'vous connaissez le prix d’avance et décidez ensuite'],
  [/Vous ne payez que lorsque vous êtes satisfait./g, 'Vous connaissez le prix d’avance et décidez ensuite.'],
  // EN
  [/Pay only once you are satisfied\./g, 'Then you decide.'],
  [/You only pay once you are satisfied\./g, 'You know the price up front and then decide.'],
  [/,? and you only pay once you are satisfied/g, ' and then you decide, with the price known up front'],
  [/you only pay once you are satisfied/gi, 'you know the price up front and then decide'],
  // verborgen ankers
  [/van-gratis-demo-tot-prijs-t/g, 'van-voorstel-tot-prijs-t'],
  [/van-demo-tot-webshop/g, 'van-voorstel-tot-webshop'],
  [/eerst-de-demo/g, 'eerst-het-voorstel'],
  [/(["#])gratis-demo"/g, '$1vrijblijvend-voorstel"'],
];
let n = 0;
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (d === 'content' && (DEMO.has(e.name) || ['assets', 'icons'].includes(e.name))) continue; walk(f); continue; }
    if (!e.name.endsWith('.html')) continue;
    let s = fs.readFileSync(f, 'utf8'); const o = s;
    for (const [a, b] of REP) s = s.replace(a, b);
    if (s !== o) { fs.writeFileSync(f, s); n++; }
  }
})('content');
console.log(n + ' pagina\'s aangepast');
