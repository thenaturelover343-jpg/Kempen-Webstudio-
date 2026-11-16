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
  en: { id: 'in-your-region', h2: 'Website design in your region', lead: `Kempen Webstudio builds websites for businesses across Belgium. Choose your city, or read more about <a href="/en/">having a website built</a> and <a href="${P.prijs.en}">what a website costs</a>.`, chips: [['/en/web-design-brussels/', 'Brussels'], ['/en/website-laten-maken-gent/', 'Ghent'], ['/en/website-laten-maken-leuven/', 'Leuven'], ['/en/website-laten-maken-kempen/', 'The Kempen'], ['/en/website-laten-maken-kortrijk/', 'Kortrijk'], [P.hub.en, 'All regions']], aria: 'Cities' },
};
const LEES = { nl: ['Lees ook', 'Meer uitleg in gewone taal over uw website.', 'Uitleg'], fr: ['À lire aussi', 'D’autres explications claires sur votre site.', 'Conseils'], en: ['Read more', 'More plain-language guides about your website.', 'Guide'] };
const h1Of = p => { const f = path.join('content', ...p.split('/').filter(Boolean), 'index.html'); const m = fs.existsSync(f) && fs.readFileSync(f, 'utf8').match(/<h1[^>]*>([\s\S]*?)<\/h1>/); return m ? m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : ''; };
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const regio = lang => { const r = REGIO[lang]; return { t: 'band', id: r.id, intro: [], h2: r.h2, lead: [r.lead], chips: { aria: r.aria, links: r.chips } }; };
function leesOok(lang, base) {
  const i = ART.indexOf(base); const pick = [1, 2, 3].map(k => ART[(i + k) % ART.length]);
  const [h2, lead, label] = LEES[lang];
  const items = pick.map(b => `<li><a href="${pathIn(lang, b)}" data-foto="${PAGINA_FOTO[b] || 'starters'}"><span class="l">${label}</span><span class="t">${esc(h1Of(pathIn(lang, b)))}</span></a></li>`).join('');
  return { t: 'raw', html: `<section aria-labelledby="lees-ook-t" class="sec kw-gallery"><div class="wrap"><h2 id="lees-ook-t">${h2}</h2><p class="kw-gallery-lead">${lead}</p><ul>${items}</ul></div></section>` };
}
export default ['nl', 'fr', 'en'].flatMap(lang => [
  ...DIENST.map(b => ({ path: pathIn(lang, b), lang, aanvul: true, insert: [{ before: 'main section.fq6, main section.ct6', sections: [regio(lang)] }] })),
  ...ART.map(b => ({ path: pathIn(lang, b), lang, aanvul: true, insert: [{ before: 'main section.fq6, main section.ct6', sections: [leesOok(lang, b), regio(lang)] }] })),
]);
