// shell.mjs: werkt menu en footer bij in alle eigen content-pagina's (herhaalbaar, chirurgisch met tekstvervanging):
//  - Contact in het menu en de footer naar de contactpagina; "Over ons" in het gsm-menu en de footer
//  - SEO en zichtbaarheid naar de SEO-pagina
//  - footerkolom met steden: nieuwe steden + regio-hub (FR: titel "Création de site internet à")
// De knoppen "Vraag een vrijblijvende offerte aan" blijven het contactvenster openen (/#contact).
import fs from 'node:fs';
import path from 'node:path';

const C = path.resolve('content');
const DEMO = new Set(JSON.parse(fs.readFileSync('config/live-config.json', 'utf8')).demoFolders);
const UREN = { nl: 'Open van maandag tot zaterdag, van 9 tot 20 uur. Op zondag gesloten.', fr: 'Ouvert du lundi au samedi de 9 h à 20 h, fermé le dimanche.', en: 'Open Monday to Saturday from 9:00 to 20:00, closed on Sunday.' };
const L = {
  nl: { pre: '', contact: '/contact/', over: '/over-ons/', overL: 'Over ons', seo: '/seo-laten-doen/', colOld: 'Website laten maken in', col: 'Website laten maken in', hub: ['/website-laten-maken-belgie/', 'Alle regio\'s'],
    cities: [['/website-laten-maken-antwerpen/', 'Antwerpen'], ['/website-laten-maken-brussel/', 'Brussel'], ['/website-laten-maken-gent/', 'Gent'], ['/website-laten-maken-leuven/', 'Leuven'], ['/website-laten-maken-mechelen/', 'Mechelen'], ['/website-laten-maken-hasselt/', 'Hasselt'], ['/website-laten-maken-brugge/', 'Brugge'], ['/website-laten-maken-kortrijk/', 'Kortrijk'], ['/website-laten-maken-kempen/', 'de Kempen'], ['/website-laten-maken-turnhout/', 'Turnhout'], ['/website-laten-maken-geel/', 'Geel'], ['/website-laten-maken-herentals/', 'Herentals'], ['/website-laten-maken-mol/', 'Mol'], ['/website-laten-maken-kasterlee/', 'Kasterlee']],
    contactCol: 'Contactformulier', pages: 'Pagina\'s' },
  fr: { pre: '/fr', contact: '/fr/contact/', over: '/fr/a-propos/', overL: 'À propos', seo: '/fr/referencement-seo/', colOld: 'Faire créer un site web à', col: 'Création de site internet à', hub: ['/fr/creation-site-internet/', 'Toute la Belgique'],
    cities: [['/fr/creation-site-internet-bruxelles/', 'Bruxelles'], ['/fr/creation-site-internet-liege/', 'Liège'], ['/fr/creation-site-internet-namur/', 'Namur'], ['/fr/creation-site-internet-charleroi/', 'Charleroi'], ['/fr/creation-site-internet-gand/', 'Gand'], ['/fr/creation-site-internet-louvain/', 'Louvain'], ['/fr/creation-site-internet-courtrai/', 'Courtrai'], ['/fr/creation-site-internet-campine/', 'la Campine'], ['/fr/creation-site-internet-turnhout/', 'Turnhout'], ['/fr/creation-site-internet-geel/', 'Geel'], ['/fr/creation-site-internet-herentals/', 'Herentals'], ['/fr/creation-site-internet-mol/', 'Mol'], ['/fr/creation-site-internet-kasterlee/', 'Kasterlee']],
    contactCol: 'Formulaire de contact', pages: 'Pages' },
  en: { pre: '/en', contact: '/en/contact/', over: '/en/about-us/', overL: 'About us', seo: '/en/seo-services/', colOld: 'Have a website built in', col: 'Have a website built in', hub: ['/en/website-design-belgium/', 'All regions'],
    cities: [['/en/web-design-brussels/', 'Brussels'], ['/en/website-laten-maken-gent/', 'Ghent'], ['/en/website-laten-maken-leuven/', 'Leuven'], ['/en/website-laten-maken-kortrijk/', 'Kortrijk'], ['/en/website-laten-maken-kempen/', 'the Kempen'], ['/en/website-laten-maken-turnhout/', 'Turnhout'], ['/en/website-laten-maken-geel/', 'Geel'], ['/en/website-laten-maken-herentals/', 'Herentals'], ['/en/website-laten-maken-mol/', 'Mol'], ['/en/website-laten-maken-kasterlee/', 'Kasterlee']],
    contactCol: 'Contact form', pages: 'Pages' },
};
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) { if (d === C && (DEMO.has(e.name) || ['assets', 'icons'].includes(e.name))) continue; walk(f); } else if (e.name.endsWith('.html')) files.push(f); } })(C);
let n = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8'); const o = s;
  if (!s.includes('<footer class="ftr"')) continue;
  const rel = '/' + path.relative(C, f).split(path.sep).join('/');
  const lang = rel.startsWith('/fr/') ? 'fr' : rel.startsWith('/en/') ? 'en' : 'nl'; const t = L[lang];
  // Contact in hoofdmenu (desktop) en gsm-menu
  s = s.replace(`<a href="${t.pre}/#contact">Contact</a>\n    </nav>`, `<a href="${t.contact}">Contact</a>\n    </nav>`);
  s = s.replace(`<li><a href="${t.pre}/#contact">Contact</a></li>`, `<li><a href="${t.over}">${t.overL}</a></li>\n        <li><a href="${t.contact}">Contact</a></li>`);
  // SEO-pagina
  s = s.split(`href="${t.pre}/#seo"`).join(`href="${t.seo}"`);
  // footer: contactformulier
  s = s.replace(`<a href="${t.pre}/#contact">${t.contactCol}</a>`, `<a href="${t.contact}">${t.contactCol}</a>`);
  // footer: openingsuren (vierde span in de onderste regel, na het adres), één keer
  s = s.replace(/<span class="kw-uren">[^<]*<\/span>/g, '');
  s = s.replace(/(<div class="ftr-bot">(?:<span>[^<]*<\/span>){3})/, `$1<span class="kw-uren">${UREN[lang]}</span>`);
  // footer: steden
  s = s.replace(new RegExp(`<nav class="ftr-n" aria-label="(${t.colOld}|${t.col})">[\\s\\S]*?</nav>`), `<nav class="ftr-n" aria-label="${t.col}">\n      <h2>${t.col}</h2>\n      ${t.cities.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}<a href="${t.hub[0]}">${t.hub[1]}</a>\n    </nav>`);
  // footer: pagina's (Over ons en Contact vooraan, één keer)
  const extra = `<a href="${t.over}">${t.overL}</a><a href="${t.contact}">Contact</a>`;
  s = s.replace(new RegExp(`(<nav class="ftr-n" aria-label="${t.pages}">\\s*<h2>[^<]*</h2>)([\\s\\S]*?)(</nav>)`), (m, a, body, z) => `${a}\n      ${extra}${body.split(extra).join('').replace(/^\s+/, '')}${z}`);
  if (s !== o) { fs.writeFileSync(f, s); n++; }
}
console.log(`${n} pagina's bijgewerkt (menu en footer)`);
