// fotos.mjs: alle beelden die de lege beeldvakken invullen (zie FOTOS-TODO.md en FOTO-BRONNEN.md).
// Bronbestanden staan in src/img/foto/bron/. De build maakt per gebruikte combinatie (beeld x vorm x breedte)
// een AVIF en een WebP in /assets/img/f/ ; de componenten verwijzen ernaar via foto(id, vorm, lang).

/** vormen: verhouding (b x h) en de breedtes die gemaakt worden */
export const VORMEN = {
  kaart: { r: [160, 168], w: [180, 360] },   // zwevende hero-kaart (126-172 px breed)
  cirkel: { r: [1, 1], w: [120, 240] },      // cirkel op de kaart van België (96-112 px)
  mini: { r: [1, 1], w: [64, 128] },         // casekaart (56 px)
  breed: { r: [305, 132], w: [320, 640] },   // beeldvak onderaan een prijskaart
  kaart169: { r: [16, 9], w: [640, 1280] },
  tegel: { r: [16, 10], w: [480, 800] },     // beeld bovenaan een artikel- of galerijkaart  // statische kaart (contactpagina)
};

const vb = naam => ({ alt: { nl: `Voorbeeldontwerp ${naam} op een smartphone`, fr: `Exemple de design ${naam} sur un smartphone`, en: `Sample design ${naam} on a smartphone` } });

/** id -> bron (in src/img/foto/bron), optionele uitsnede {left, top, width, height}, focus voor 'cover', alt per taal */
export const FOTOS = {
  // foto's uit de bestaande site (assets/img) en de voorbeeldsites
  horeca: { src: 'sec-horeca-1400.webp', alt: { nl: 'Gedekte tafels in een restaurant met warm licht', fr: 'Tables dressées dans un restaurant à la lumière chaleureuse', en: 'Laid tables in a restaurant with warm light' } },
  starters: { src: 'sec-starters-1400.webp', alt: { nl: 'Laptop, notitieboek en koffie op een houten tafel', fr: 'Ordinateur portable, carnet et café sur une table en bois', en: 'Laptop, notebook and coffee on a wooden table' } },
  vereniging: { src: 'sec-vereniging2-d1280.webp', alt: { nl: 'Gezellig clublokaal met tafels en een toog', fr: 'Local de club convivial avec tables et comptoir', en: 'Cosy clubhouse with tables and a bar' } },
  vrij: { src: 'sec-vrij2-d1280.webp', alt: { nl: 'Lichte praktijkruimte met tafel, stoelen en boekenkast', fr: 'Cabinet lumineux avec table, chaises et bibliothèque', en: 'Bright practice room with table, chairs and bookcase' } },
  winkel: { src: 'sec-winkel2-d1280.webp', alt: { nl: 'Winkelinterieur met houten rekken vol producten', fr: 'Intérieur de magasin avec étagères en bois remplies de produits', en: 'Shop interior with wooden shelves full of products' } },
  zorg: { src: 'sec-zorg2-d1280.webp', alt: { nl: 'Rustige behandelruimte met behandeltafel en handdoeken', fr: 'Salle de soins calme avec table de soin et serviettes', en: 'Calm treatment room with treatment table and towels' } },
  gereedschap: { src: 'vakf-vakman2-d1280.webp', alt: { nl: 'Gereedschap netjes uitgestald op een werkbank', fr: 'Outils soigneusement disposés sur un établi', en: 'Tools neatly laid out on a workbench' } },
  vakman: { src: 'vakf2-vakman-1000.webp', alt: { nl: 'Vakman meet een houten stuk op met een schuifmaat', fr: 'Artisan mesurant une pièce en bois avec un pied à coulisse', en: 'Craftsman measuring a wooden piece with a calliper' } },
  kapsalon: { src: 'kapsalon-foto-2.webp', alt: { nl: 'Kapper knipt haar met een schaar', fr: 'Coiffeur coupant des cheveux aux ciseaux', en: 'Hairdresser cutting hair with scissors' } },
  schilder: { src: 'kleurwerk-foto-4.webp', alt: { nl: 'Schilderskwasten op een werktafel', fr: 'Pinceaux de peintre sur une table de travail', en: 'Paintbrushes on a work table' } },
  tuin: { src: 'tuin-foto-2.webp', alt: { nl: 'Tuinpad tussen bloeiende borders', fr: 'Allée de jardin entre des massifs fleuris', en: 'Garden path between flowering borders' } },
  schrijnwerk: { src: 'houtatelier-foto-3.webp', alt: { nl: 'Schaaf en houtkrullen op een werkbank', fr: 'Rabot et copeaux de bois sur un établi', en: 'Plane and wood shavings on a workbench' } },
  branderij: { src: 'webshop-foto-branderij.webp', alt: { nl: 'Koffiebrander in een branderij', fr: 'Torréfacteur de café dans une brûlerie', en: 'Coffee roaster in a roastery' } },
  terras: { src: 'horeca-foto-terras.webp', alt: { nl: 'Zonnig terras met tafels en parasols', fr: 'Terrasse ensoleillée avec tables et parasols', en: 'Sunny terrace with tables and parasols' } },
  gent: { src: 'stad-gent-inh-1280.webp', alt: { nl: 'Gevels aan het water in Gent bij avond', fr: 'Façades au bord de l’eau à Gand le soir', en: 'Waterside façades in Ghent in the evening' } },
  kortrijk: { src: 'stad-kortrijk-inh-1280.webp', alt: { nl: 'Toren van de Sint-Maartenskerk in Kortrijk', fr: 'Tour de l’église Saint-Martin à Courtrai', en: 'Tower of St Martin’s Church in Kortrijk' } },
  leuven: { src: 'stad-leuven-inh-1280.webp', alt: { nl: 'Historische gebouwen in Leuven', fr: 'Bâtiments historiques à Louvain', en: 'Historic buildings in Leuven' } },
  planner: { src: 'pl-ivelien-m-700.webp', crop: { left: 0, top: 0, width: 700, height: 735 }, alt: { nl: 'Afsprakenplanner in het voorbeeldontwerp Kapsalon Ivelien', fr: 'Agenda de rendez-vous dans l’exemple de design Kapsalon Ivelien', en: 'Appointment planner in the sample design Kapsalon Ivelien' } },
  portret: { src: 'hero-portret.jpg', crop: { left: 64, top: 300, width: 800, height: 800 }, alt: { nl: 'Webstudio K, uw vaste aanspreekpunt', fr: 'Webstudio K, votre interlocuteur fixe', en: 'Webstudio K, your fixed point of contact' } },
  // screenshots van de 9 voorbeeldsites (gsm, bovenste deel)
  'vb-houtatelier': { src: 'houtatelier-nethe-m600.webp', crop: { left: 0, top: 40, width: 600, height: 630 }, ...vb('Houtatelier Nethe') },
  'vb-horeca': { src: 'horeca-voorbeeld-m600.webp', crop: { left: 0, top: 40, width: 600, height: 630 }, ...vb('Bistro Tilvaar') },
  'vb-webshop': { src: 'webshop-voorbeeld-m600.webp', crop: { left: 0, top: 300, width: 600, height: 630 }, ...vb('Vennebrand') },
  'vb-dakwerken': { src: 'dakwerken-hoogland-m600.webp', crop: { left: 0, top: 340, width: 600, height: 630 }, ...vb('Dakwerken Hoogland') },
  'vb-kleurwerk': { src: 'kleurwerk-voorbeeld-m600.webp', crop: { left: 0, top: 40, width: 600, height: 630 }, ...vb('Atelier Kleurwerk') },
  'vb-tuin': { src: 'tuin-voorbeeld-m600.webp', crop: { left: 0, top: 300, width: 600, height: 630 }, ...vb('Tuinzorg Varelinde') },
  'vb-schoonheid': { src: 'schoonheidssalon-voorbeeld-m600.webp', crop: { left: 0, top: 60, width: 600, height: 630 }, ...vb('Velours') },
  'vb-kapsalon': { src: 'kapsalon-voorbeeld-m600.webp', crop: { left: 0, top: 340, width: 600, height: 630 }, ...vb('Kapsalon Ivelien') },
  'vb-barbier': { src: 'barbier-voorbeeld-m600.webp', crop: { left: 0, top: 270, width: 600, height: 630 }, ...vb('Barbier Kolvaard') },
  'vb-webshop-breed': { src: 'webshop-voorbeeld-d1000.webp', crop: { left: 0, top: 120, width: 1000, height: 433 }, alt: { nl: 'Voorbeeldontwerp Vennebrand, een webshop', fr: 'Exemple de design Vennebrand, une boutique en ligne', en: 'Sample design Vennebrand, an online shop' } },
  kaart: { src: 'kaart-kasterlee.png', alt: { nl: 'Kaart van Kasterlee en omgeving, met Turnhout, Geel, Herentals en Mol', fr: 'Carte de Kasterlee et environs, avec Turnhout, Geel, Herentals et Mol', en: 'Map of Kasterlee and surroundings, with Turnhout, Geel, Herentals and Mol' } },
  // de drie cases: fragment van de echte site (zonder logo of cookiebanner), screenshot 15-11-2026
  'case-koelaanhangwagen': { src: 'case-koelaanhangwagen-d.png', crop: { left: 40, top: 70, width: 760, height: 760 }, alt: { nl: 'Fragment van koelaanhangwagenverhuur.be', fr: 'Extrait de koelaanhangwagenverhuur.be', en: 'Excerpt from koelaanhangwagenverhuur.be' } },
  'case-taponderhoud': { src: 'case-taponderhoud-d.png', crop: { left: 1000, top: 90, width: 440, height: 440 }, alt: { nl: 'Fragment van taponderhoud.be', fr: 'Extrait de taponderhoud.be', en: 'Excerpt from taponderhoud.be' } },
  'case-barlicious': { src: 'case-barlicious-d.png', crop: { left: 160, top: 140, width: 620, height: 620 }, alt: { nl: 'Fragment van barlicious.be', fr: 'Extrait de barlicious.be', en: 'Excerpt from barlicious.be' } },
};

/** beeld per onderpagina (pad zonder taalprefix) voor de zwevende hero-kaart */
export const PAGINA_FOTO = {
  // nieuwe pagina's (SEO-ronde 15-11-2026); sleutel = pad zonder taal (FR/EN zonder NL-tegenhanger: eigen pad zonder prefix)
  '/website-laten-maken-antwerpen/': 'vb-horeca', '/website-laten-maken-brussel/': 'vb-schoonheid', '/website-laten-maken-mechelen/': 'vb-kleurwerk',
  '/website-laten-maken-hasselt/': 'vb-webshop', '/website-laten-maken-brugge/': 'terras',
  '/creation-site-internet-bruxelles/': 'vb-schoonheid', '/creation-site-internet-liege/': 'vb-dakwerken', '/creation-site-internet-namur/': 'vb-kapsalon',
  '/creation-site-internet-charleroi/': 'vb-tuin', '/web-design-brussels/': 'vb-schoonheid',
  '/website-laten-maken-belgie/': 'vb-houtatelier', '/creation-site-internet/': 'vb-houtatelier', '/website-design-belgium/': 'vb-houtatelier',
  '/over-ons/': 'portret', '/a-propos/': 'portret', '/about-us/': 'portret', '/contact/': 'kaart',
  '/voorbeeldontwerpen/houtatelier-nethe/': 'vb-houtatelier', '/exemples-de-sites/houtatelier-nethe/': 'vb-houtatelier',
  '/voorbeeldontwerpen/bistro-tilvaar/': 'vb-horeca', '/exemples-de-sites/bistro-tilvaar/': 'vb-horeca',
  '/voorbeeldontwerpen/vennebrand/': 'vb-webshop', '/exemples-de-sites/vennebrand/': 'vb-webshop',
  '/voorbeeldontwerpen/dakwerken-hoogland/': 'vb-dakwerken', '/exemples-de-sites/dakwerken-hoogland/': 'vb-dakwerken',
  '/voorbeeldontwerpen/atelier-kleurwerk/': 'vb-kleurwerk', '/exemples-de-sites/atelier-kleurwerk/': 'vb-kleurwerk',
  '/voorbeeldontwerpen/tuinzorg-varelinde/': 'vb-tuin', '/exemples-de-sites/tuinzorg-varelinde/': 'vb-tuin',
  '/voorbeeldontwerpen/velours/': 'vb-schoonheid', '/exemples-de-sites/velours/': 'vb-schoonheid',
  '/voorbeeldontwerpen/kapsalon-ivelien/': 'vb-kapsalon', '/exemples-de-sites/kapsalon-ivelien/': 'vb-kapsalon',
  '/voorbeeldontwerpen/barbier-kolvaard/': 'vb-barbier', '/exemples-de-sites/barbier-kolvaard/': 'vb-barbier',
  '/seo-laten-doen/': 'starters', '/referencement-seo/': 'starters', '/seo-services/': 'starters',
  '/webshop-laten-maken/': 'vb-webshop', '/website-laten-vernieuwen/': 'vb-houtatelier', '/logo-en-huisstijl/': 'vb-barbier',
  '/toegankelijke-website/': 'vb-kapsalon', '/wat-kost-een-website/': 'vb-schoonheid', '/voorbeeldontwerpen/': 'vb-horeca',
  '/website-horeca/': 'horeca', '/website-kapsalon/': 'kapsalon', '/website-schilder/': 'schilder', '/website-starters/': 'starters',
  '/website-tuinaannemer/': 'tuin', '/website-vakmensen/': 'vakman', '/website-vereniging/': 'vereniging', '/website-vrij-beroep/': 'vrij',
  '/website-winkel/': 'winkel', '/website-zorg/': 'zorg',
  '/website-laten-maken-gent/': 'gent', '/website-laten-maken-kortrijk/': 'kortrijk', '/website-laten-maken-leuven/': 'leuven',
  '/website-laten-maken-geel/': 'vb-tuin', '/website-laten-maken-herentals/': 'vb-dakwerken', '/website-laten-maken-kasterlee/': 'vb-houtatelier',
  '/website-laten-maken-kempen/': 'vb-kleurwerk', '/website-laten-maken-mol/': 'vb-webshop', '/website-laten-maken-turnhout/': 'vb-kapsalon',
  '/kennis/': 'starters', '/kennis/google-bedrijfsprofiel-aanmaken/': 'terras', '/kennis/hoe-lang-duurt-website-laten-maken/': 'planner',
  '/kennis/terugkerende-kosten-website/': 'vb-kleurwerk', '/kennis/wat-moet-er-op-een-website-staan/': 'vb-dakwerken',
  '/kennis/website-fiscaal-aftrekbaar/': 'vrij', '/kennis/website-laten-maken-of-zelf-bouwen/': 'gereedschap',
  '/kennis/wettelijke-vermeldingen-website/': 'vb-tuin', '/kennis/wordpress-of-maatwerk/': 'schrijnwerk',
  '/privacyverklaring/': 'vb-schoonheid', '/cookiebeleid/': 'vb-webshop', '/bedankt/': 'vb-houtatelier', '/404.html': 'vb-barbier',
};

/** beeld per plaats op de kaart van België (id uit design-data) */
export const PLAATS_FOTO = { kasterlee: 'portret', 'turnhout-geel': 'portret', 'leuven-gent': 'gent', kortrijk: 'kortrijk' };
/** beeld per case (volgorde op de home) */
export const CASE_FOTO = ['case-koelaanhangwagen', 'case-taponderhoud', 'case-barlicious'];

/** srcset/sizes/maten voor een beeld in een vorm; de build maakt de bestanden die zo worden opgevraagd */
export function foto(id, vorm, lang = 'nl') {
  const f = FOTOS[id], v = VORMEN[vorm];
  if (!f || !v) throw new Error(`onbekend beeld ${id} / ${vorm}`);
  const url = (w, ext) => `/assets/img/f/${id}.${vorm}.${w}.${ext}`;
  const set = ext => v.w.map(w => `${url(w, ext)} ${w}w`).join(', ');
  const w0 = v.w[v.w.length - 1];
  return { avif: set('avif'), webp: set('webp'), src: url(v.w[0], 'webp'), width: w0, height: Math.round(w0 * v.r[1] / v.r[0]), alt: (f.alt && (f.alt[lang] || f.alt.nl)) || '' };
}
