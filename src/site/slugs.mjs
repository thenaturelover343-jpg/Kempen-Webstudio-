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
const FR_BACK = Object.fromEntries(Object.entries(FR_SLUGS).map(([a, b]) => [b, a]));

/** pad zonder taalprefix, gelijk voor de drie talen (de Nederlandse slug): /fr/creation-site-internet-gand/ -> /website-laten-maken-gent/ */
export function baseOf(u) {
  const p = u.split('#')[0];
  const old = FR_BACK[p] || p;
  return old.replace(/^\/(fr|en)(?=\/)/, '');
}
/** vervangt elk oud FR-pad in een tekst door het nieuwe (ook absolute URL's), langste eerst */
export function rewriteFr(s) {
  const keys = Object.keys(FR_SLUGS).sort((a, b) => b.length - a.length);
  for (const k of keys) s = s.replace(new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + `(?=["'#?<\\s)\\]]|$)`, 'g'), FR_SLUGS[k]);
  return s;
}
