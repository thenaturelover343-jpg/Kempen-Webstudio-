// Interne links (SEO-ronde, premium 16-11): op elke dienst-, sector- en kennispagina
//  - "Website laten maken in uw regio" als capsules naar de grootste steden (beeldend, niet alleen tekst),
//  - op kennisartikels "Lees ook": drie andere artikels als beeldkaarten.
// Wordt vóór de veelgestelde vragen (of de slot-CTA) ingevoegd.
import fs from 'node:fs';
import path from 'node:path';
import { FR_SLUGS } from '../slugs.mjs';
import { PAGINA_FOTO } from '../fotos.mjs';
import { P } from './_gemeen.mjs';

const pathIn = (lang, nl) => { let u = (lang === 'nl' ? '' : '/' + lang) + nl; if (lang === 'fr') u = FR_SLUGS[u] || u; return u; };
const DIENST = ['/webshop-laten-maken/', '/website-laten-vernieuwen/', '/logo-en-huisstijl/', '/toegankelijke-website/',
  '/website-horeca/', '/website-kapsalon/', '/website-schilder/', '/website-starters/', '/website-tuinaannemer/', '/website-vakmensen/', '/website-vereniging/', '/website-vrij-beroep/', '/website-winkel/', '/website-zorg/', '/kennis/'];
const ART = ['/kennis/google-bedrijfsprofiel-aanmaken/', '/kennis/hoe-lang-duurt-website-laten-maken/', '/kennis/terugkerende-kosten-website/', '/kennis/wat-moet-er-op-een-website-staan/', '/kennis/website-fiscaal-aftrekbaar/', '/kennis/website-laten-maken-of-zelf-bouwen/', '/kennis/wettelijke-vermeldingen-website/', '/kennis/wordpress-of-maatwerk/'];
const REGIO = {
  nl: { id: 'in-uw-regio', h2: 'Website laten maken in uw regio', lead: `Kempen Webstudio maakt websites voor zaken in heel België. Kies uw stad, of lees meer over <a href="/">een website laten maken</a> en <a href="${P.prijs.nl}">wat een website kost</a>.`, chips: [['/website-laten-maken-antwerpen/', 'Antwerpen'], ['/website-laten-maken-brussel/', 'Brussel'], ['/website-laten-maken-gent/', 'Gent'], ['/website-laten-maken-leuven/', 'Leuven'], ['/website-laten-maken-kempen/', 'De Kempen'], [P.hub.nl, 'Alle regio\'s']], aria: 'Steden' },
  fr: { id: 'dans-votre-region', h2: 'Création de site internet dans votre région', lead: `Kempen Webstudio crée des sites pour des entreprises dans toute la Belgique. Choisissez votre ville, ou découvrez la <a href="/fr/">création de site internet</a> et le <a href="${P.prijs.fr}">prix d’un site internet</a>.`, chips: [['/fr/creation-site-internet-bruxelles/', 'Bruxelles'], ['/fr/creation-site-internet-liege/', 'Liège'], ['/fr/creation-site-internet-namur/', 'Namur'], ['/fr/creation-site-internet-charleroi/', 'Charleroi'], ['/fr/creation-site-internet-gand/', 'Gand'], [P.hub.fr, 'Toutes les régions']], aria: 'Villes' },
  en: { id: 'in-your-region', h2: 'Website design in your region', lead: `Kempen Webstudio builds websites for businesses across Belgium. Choose your city, or read more about <a href="/en/">having a website built</a>, <a href="${P.prijs.en}">what a website costs</a> and <a href="${P.over.en}">who we are</a>.`, chips: [['/en/web-design-brussels/', 'Brussels'], ['/en/website-laten-maken-gent/', 'Ghent'], ['/en/website-laten-maken-leuven/', 'Leuven'], ['/en/website-laten-maken-kempen/', 'The Kempen'], ['/en/website-laten-maken-kortrijk/', 'Kortrijk'], [P.hub.en, 'All regions']], aria: 'Cities' },
};
const LEES = { nl: ['Lees ook', 'Meer uitleg in gewone taal over uw website.', 'Uitleg'], fr: ['À lire aussi', 'D’autres explications claires sur votre site.', 'Conseils'], en: ['Read more', 'More plain-language guides about your website.', 'Guide'] };
const h1Of = p => { const f = path.join('content', ...p.split('/').filter(Boolean), 'index.html'); const m = fs.existsSync(f) && fs.readFileSync(f, 'utf8').match(/<h1[^>]*>([\s\S]*?)<\/h1>/); return m ? m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : ''; };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

// tweede zin: contextuele links naar de diensten (niet naar de pagina zelf), als gewone zin (audit 17-11):
// "Kempen Webstudio maakt ook webshops, een logo en huisstijl, doet SEO en vernieuwt bestaande websites."
// [href, groep ('maak' deelt het werkwoord), tekst met link]
const DIENSTEN = {
  nl: { ook: 'maakt ook', items: [[P.webshop.nl, 'maak', 'webshops'], [P.logo.nl, 'maak', 'een logo en huisstijl'], [P.seo.nl, 'doet', 'SEO'], [P.vernieuwen.nl, 'vernieuwt', 'bestaande websites']] },
  fr: { ook: 'crée aussi', items: [[P.webshop.fr, 'maak', 'des boutiques en ligne'], [P.logo.fr, 'maak', 'un logo et une identité visuelle'], [P.seo.fr, 'fait du', 'référencement SEO'], [P.vernieuwen.fr, 'refait', 'des sites existants']] },
  en: { ook: 'also builds', items: [[P.webshop.en, 'maak', 'online shops'], [P.logo.en, 'maak', 'a logo and visual identity'], [P.seo.en, 'does', 'SEO'], [P.vernieuwen.en, 'redesigns', 'existing websites']] },
};
const lijst = (lang, xs) => xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + { nl: ' en ', fr: ' et ', en: ' and ' }[lang] + xs.at(-1);
const dienstZin = (lang, self) => {
  const D = DIENSTEN[lang]; let eerste = true;
  const parts = D.items.filter(([h]) => h !== self).map(([h, g, t]) => { const l = `<a href="${h}">${t}</a>`; if (g === 'maak') { const r = eerste ? `${D.ook} ${l}` : l; eerste = false; return r; } return `${g} ${l}`; });
  return `Kempen Webstudio ${lijst(lang, parts)}.`;
};
const regio = (lang, self) => { const r = REGIO[lang]; return { t: 'band', id: r.id, intro: [], h2: r.h2, lead: [r.lead, dienstZin(lang, self)], chips: { aria: r.aria, links: r.chips } }; };
function leesOok(lang, base) {
  const i = ART.indexOf(base); const pick = [1, 2, 3].map(k => ART[(i + k) % ART.length]);
  const [h2, lead, label] = LEES[lang];
  const items = pick.map(b => `<li><a href="${pathIn(lang, b)}" data-foto="${PAGINA_FOTO[b] || 'starters'}"><span class="l">${label}</span><span class="t">${esc(h1Of(pathIn(lang, b)))}</span></a></li>`).join('');
  return { t: 'raw', html: `<section aria-labelledby="lees-ook-t" class="sec kw-gallery"><div class="wrap"><h2 id="lees-ook-t">${h2}</h2><p class="kw-gallery-lead">${lead}</p><ul>${items}</ul></div></section>` };
}
export default ['nl', 'fr', 'en'].flatMap(lang => [
  ...DIENST.map(b => ({ path: pathIn(lang, b), lang, aanvul: true, insert: [{ before: 'main section.fq6, main section.ct6', sections: [regio(lang, pathIn(lang, b))] }] })),
  ...ART.map(b => ({ path: pathIn(lang, b), lang, aanvul: true, insert: [{ before: 'main section.fq6, main section.ct6', sections: [leesOok(lang, b), regio(lang, pathIn(lang, b))] }] })),
]);
