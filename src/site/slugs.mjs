// slugs.mjs: Franse URL's (SEO-ronde 15-11-2026). Oud FR-pad (met Nederlandse slug) -> nieuw FR-pad.
// Elk oud pad krijgt een 301 in _redirects en een HTML-vangnet (meta refresh + canonical) in de build.
export const FR_SLUGS = {
  '/fr/bedankt/': '/fr/merci/',
  '/fr/cookiebeleid/': '/fr/politique-cookies/',
  '/fr/privacyverklaring/': '/fr/politique-confidentialite/',
  '/fr/kennis/': '/fr/conseils/',
  '/fr/kennis/google-bedrijfsprofiel-aanmaken/': '/fr/conseils/creer-fiche-google-business/',
  '/fr/kennis/hoe-lang-duurt-website-laten-maken/': '/fr/conseils/delai-creation-site-internet/',
  '/fr/kennis/terugkerende-kosten-website/': '/fr/conseils/couts-recurrents-site-internet/',
  '/fr/kennis/wat-moet-er-op-een-website-staan/': '/fr/conseils/contenu-site-internet/',
  '/fr/kennis/website-fiscaal-aftrekbaar/': '/fr/conseils/site-internet-deductible-fiscalement/',
  '/fr/kennis/website-laten-maken-of-zelf-bouwen/': '/fr/conseils/faire-creer-ou-creer-soi-meme/',
  '/fr/kennis/wettelijke-vermeldingen-website/': '/fr/conseils/mentions-legales-site-internet/',
  '/fr/kennis/wordpress-of-maatwerk/': '/fr/conseils/wordpress-ou-sur-mesure/',
  '/fr/logo-en-huisstijl/': '/fr/creation-logo-identite-visuelle/',
  '/fr/toegankelijke-website/': '/fr/site-internet-accessible/',
  '/fr/voorbeeldontwerpen/': '/fr/exemples-de-sites/',
  '/fr/wat-kost-een-website/': '/fr/prix-site-internet/',
  '/fr/webshop-laten-maken/': '/fr/creation-boutique-en-ligne/',
  '/fr/website-horeca/': '/fr/site-internet-horeca/',
  '/fr/website-kapsalon/': '/fr/site-internet-salon-de-coiffure/',
  '/fr/website-laten-maken-geel/': '/fr/creation-site-internet-geel/',
  '/fr/website-laten-maken-gent/': '/fr/creation-site-internet-gand/',
  '/fr/website-laten-maken-herentals/': '/fr/creation-site-internet-herentals/',
  '/fr/website-laten-maken-kasterlee/': '/fr/creation-site-internet-kasterlee/',
  '/fr/website-laten-maken-kempen/': '/fr/creation-site-internet-campine/',
  '/fr/website-laten-maken-kortrijk/': '/fr/creation-site-internet-courtrai/',
  '/fr/website-laten-maken-leuven/': '/fr/creation-site-internet-louvain/',
  '/fr/website-laten-maken-mol/': '/fr/creation-site-internet-mol/',
  '/fr/website-laten-maken-turnhout/': '/fr/creation-site-internet-turnhout/',
  '/fr/website-laten-vernieuwen/': '/fr/refonte-site-internet/',
  '/fr/website-schilder/': '/fr/site-internet-peintre/',
  '/fr/website-starters/': '/fr/site-internet-jeunes-entreprises/',
  '/fr/website-tuinaannemer/': '/fr/site-internet-jardinier/',
  '/fr/website-vakmensen/': '/fr/site-internet-artisans/',
  '/fr/website-vereniging/': '/fr/site-internet-association/',
  '/fr/website-vrij-beroep/': '/fr/site-internet-profession-liberale/',
  '/fr/website-winkel/': '/fr/site-internet-commerce/',
  '/fr/website-zorg/': '/fr/site-internet-soins-bien-etre/',
};
// paden die al een Franse slug hadden maar ook nog met de Nederlandse slug opgevraagd worden (Gusje 18-11: /fr/over-ons/ gaf 404)
Object.assign(FR_SLUGS, { '/fr/over-ons/': '/fr/a-propos/', '/fr/seo-laten-doen/': '/fr/referencement-seo/', '/fr/website-laten-maken-belgie/': '/fr/creation-site-internet/', '/fr/website-laten-maken-brussel/': '/fr/creation-site-internet-bruxelles/' });
for (const d of ['atelier-kleurwerk', 'barbier-kolvaard', 'bistro-tilvaar', 'dakwerken-hoogland', 'houtatelier-nethe', 'kapsalon-ivelien', 'tuinzorg-varelinde', 'velours', 'vennebrand']) FR_SLUGS[`/fr/voorbeeldontwerpen/${d}/`] = `/fr/exemples-de-sites/${d}/`;
const FR_BACK = Object.fromEntries(Object.entries(FR_SLUGS).map(([a, b]) => [b, a]));

/** pad zonder taalprefix, gelijk voor de drie talen (de Nederlandse slug): /fr/creation-site-internet-gand/ -> /website-laten-maken-gent/ */
export function baseOf(u) {
  const p = u.split('#')[0];
  const old = FR_BACK[p] || (typeof EN_BACK !== 'undefined' && EN_BACK[p]) || p;
  return old.replace(/^\/(fr|en)(?=\/)/, '');
}
/** vervangt elk oud FR-pad in een tekst door het nieuwe (ook absolute URL's), langste eerst */
export function rewriteFr(s) {
  const keys = Object.keys(FR_SLUGS).sort((a, b) => b.length - a.length);
  for (const k of keys) s = s.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + `(?=["'#?<\\s)\\]]|$)`, 'g'), FR_SLUGS[k]);
  return s;
}

// Engelse URL's (PDF Karim 18-11, punt 13). Oud EN-pad (met Nederlandse slug) -> nieuw EN-pad; 301 + HTML-vangnet zoals bij FR.
const EN_TOP = {
  '/en/bedankt/': '/en/thank-you/', '/en/cookiebeleid/': '/en/cookie-policy/', '/en/privacyverklaring/': '/en/privacy-policy/',
  '/en/kennis/': '/en/guides/', '/en/logo-en-huisstijl/': '/en/logo-and-brand-identity/', '/en/toegankelijke-website/': '/en/accessible-website/',
  '/en/voorbeeldontwerpen/': '/en/sample-designs/', '/en/wat-kost-een-website/': '/en/website-cost/', '/en/webshop-laten-maken/': '/en/online-shop-design/',
  '/en/website-horeca/': '/en/website-hospitality/', '/en/website-kapsalon/': '/en/website-hair-salon/', '/en/website-laten-vernieuwen/': '/en/website-redesign/',
  '/en/website-schilder/': '/en/website-painter/', '/en/website-starters/': '/en/website-startups/', '/en/website-tuinaannemer/': '/en/website-landscaper/',
  '/en/website-vakmensen/': '/en/website-tradespeople/', '/en/website-vereniging/': '/en/website-association/', '/en/website-vrij-beroep/': '/en/website-liberal-professions/',
  '/en/website-winkel/': '/en/website-shop/', '/en/website-zorg/': '/en/website-care-wellbeing/',
  '/en/website-laten-maken-gent/': '/en/web-design-ghent/', '/en/website-laten-maken-geel/': '/en/web-design-geel/', '/en/website-laten-maken-herentals/': '/en/web-design-herentals/',
  '/en/website-laten-maken-kasterlee/': '/en/web-design-kasterlee/', '/en/website-laten-maken-kempen/': '/en/web-design-kempen/', '/en/website-laten-maken-kortrijk/': '/en/web-design-kortrijk/',
  '/en/website-laten-maken-leuven/': '/en/web-design-leuven/', '/en/website-laten-maken-mol/': '/en/web-design-mol/', '/en/website-laten-maken-turnhout/': '/en/web-design-turnhout/',
};
const EN_SUB = {
  '/en/kennis/google-bedrijfsprofiel-aanmaken/': '/en/guides/create-google-business-profile/', '/en/kennis/hoe-lang-duurt-website-laten-maken/': '/en/guides/how-long-does-a-website-take/',
  '/en/kennis/terugkerende-kosten-website/': '/en/guides/recurring-website-costs/', '/en/kennis/wat-moet-er-op-een-website-staan/': '/en/guides/what-to-put-on-a-website/',
  '/en/kennis/website-fiscaal-aftrekbaar/': '/en/guides/website-tax-deductible-belgium/', '/en/kennis/website-laten-maken-of-zelf-bouwen/': '/en/guides/website-built-or-diy/',
  '/en/kennis/wettelijke-vermeldingen-website/': '/en/guides/legal-information-website-belgium/', '/en/kennis/wordpress-of-maatwerk/': '/en/guides/wordpress-or-custom-website/',
};
for (const d of ['atelier-kleurwerk', 'barbier-kolvaard', 'bistro-tilvaar', 'dakwerken-hoogland', 'houtatelier-nethe', 'kapsalon-ivelien', 'tuinzorg-varelinde', 'velours', 'vennebrand']) EN_SUB[`/en/voorbeeldontwerpen/${d}/`] = `/en/sample-designs/${d}/`;
Object.assign(EN_TOP, { '/en/over-ons/': '/en/about-us/', '/en/seo-laten-doen/': '/en/seo-services/', '/en/website-laten-maken-belgie/': '/en/website-design-belgium/', '/en/website-laten-maken-brussel/': '/en/web-design-brussels/' });
export const EN_SLUGS = { ...EN_SUB, ...EN_TOP };
const EN_BACK = Object.fromEntries(Object.entries(EN_SLUGS).map(([a, b]) => [b, a]));
/** baseOf met ook de Engelse slugs */
export function baseOfAll(u) { const p = u.split('#')[0]; return baseOf(EN_BACK[p] || p); }
/** vervangt elk oud EN-pad door het nieuwe (ook absolute URL's), langste eerst */
export function rewriteEn(s) {
  const keys = Object.keys(EN_SLUGS).sort((a, b) => b.length - a.length);
  for (const k of keys) s = s.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=["\'`#?<\\s)\\]}$]|$)', 'g'), EN_SLUGS[k]);
  return s;
}
