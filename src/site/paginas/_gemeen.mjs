// Gedeelde teksten en paden voor de nieuwe pagina's (alleen feiten die ook elders op de site staan).
export const P = {
  hub: { nl: '/website-laten-maken-belgie/', fr: '/fr/creation-site-internet/', en: '/en/website-design-belgium/' },
  over: { nl: '/over-ons/', fr: '/fr/a-propos/', en: '/en/about-us/' },
  contact: { nl: '/contact/', fr: '/fr/contact/', en: '/en/contact/' },
  seo: { nl: '/seo-laten-doen/', fr: '/fr/referencement-seo/', en: '/en/seo-services/' },
  demos: { nl: '/voorbeeldontwerpen/', fr: '/fr/exemples-de-sites/', en: '/en/voorbeeldontwerpen/' },
  prijs: { nl: '/wat-kost-een-website/', fr: '/fr/prix-site-internet/', en: '/en/wat-kost-een-website/' },
  webshop: { nl: '/webshop-laten-maken/', fr: '/fr/creation-boutique-en-ligne/', en: '/en/webshop-laten-maken/' },
  vernieuwen: { nl: '/website-laten-vernieuwen/', fr: '/fr/refonte-site-internet/', en: '/en/website-laten-vernieuwen/' },
  logo: { nl: '/logo-en-huisstijl/', fr: '/fr/creation-logo-identite-visuelle/', en: '/en/logo-en-huisstijl/' },
  wcag: { nl: '/toegankelijke-website/', fr: '/fr/site-internet-accessible/', en: '/en/toegankelijke-website/' },
  kennis: { nl: '/kennis/', fr: '/fr/conseils/', en: '/en/kennis/' },
  fiscaal: { nl: '/kennis/website-fiscaal-aftrekbaar/', fr: '/fr/conseils/site-internet-deductible-fiscalement/', en: '/en/kennis/website-fiscaal-aftrekbaar/' },
  zelf: { nl: '/kennis/website-laten-maken-of-zelf-bouwen/', fr: '/fr/conseils/faire-creer-ou-creer-soi-meme/', en: '/en/kennis/website-laten-maken-of-zelf-bouwen/' },
  kosten: { nl: '/kennis/terugkerende-kosten-website/', fr: '/fr/conseils/couts-recurrents-site-internet/', en: '/en/kennis/terugkerende-kosten-website/' },
  duur: { nl: '/kennis/hoe-lang-duurt-website-laten-maken/', fr: '/fr/conseils/delai-creation-site-internet/', en: '/en/kennis/hoe-lang-duurt-website-laten-maken/' },
  wp: { nl: '/kennis/wordpress-of-maatwerk/', fr: '/fr/conseils/wordpress-ou-sur-mesure/', en: '/en/kennis/wordpress-of-maatwerk/' },
  gbp: { nl: '/kennis/google-bedrijfsprofiel-aanmaken/', fr: '/fr/conseils/creer-fiche-google-business/', en: '/en/kennis/google-bedrijfsprofiel-aanmaken/' },
  inhoud: { nl: '/kennis/wat-moet-er-op-een-website-staan/', fr: '/fr/conseils/contenu-site-internet/', en: '/en/kennis/wat-moet-er-op-een-website-staan/' },
  wettelijk: { nl: '/kennis/wettelijke-vermeldingen-website/', fr: '/fr/conseils/mentions-legales-site-internet/', en: '/en/kennis/wettelijke-vermeldingen-website/' },
  horeca: { nl: '/website-horeca/', fr: '/fr/site-internet-horeca/', en: '/en/website-horeca/' },
  winkel: { nl: '/website-winkel/', fr: '/fr/site-internet-commerce/', en: '/en/website-winkel/' },
  vrij: { nl: '/website-vrij-beroep/', fr: '/fr/site-internet-profession-liberale/', en: '/en/website-vrij-beroep/' },
  vereniging: { nl: '/website-vereniging/', fr: '/fr/site-internet-association/', en: '/en/website-vereniging/' },
  vakmensen: { nl: '/website-vakmensen/', fr: '/fr/site-internet-artisans/', en: '/en/website-vakmensen/' },
  schilder: { nl: '/website-schilder/', fr: '/fr/site-internet-peintre/', en: '/en/website-schilder/' },
  tuin: { nl: '/website-tuinaannemer/', fr: '/fr/site-internet-jardinier/', en: '/en/website-tuinaannemer/' },
  kapsalon: { nl: '/website-kapsalon/', fr: '/fr/site-internet-salon-de-coiffure/', en: '/en/website-kapsalon/' },
  zorg: { nl: '/website-zorg/', fr: '/fr/site-internet-soins-bien-etre/', en: '/en/website-zorg/' },
  starters: { nl: '/website-starters/', fr: '/fr/site-internet-jeunes-entreprises/', en: '/en/website-starters/' },
  home: { nl: '/', fr: '/fr/', en: '/en/' },
};
export const demo = (lang, slug) => P.demos[lang] + slug + '/';
export const CTA = { nl: '/#contact', fr: '/fr/#contact', en: '/en/#contact' };
export const TRUST = {
  nl: ['Prijzen vanaf €490 excl. btw', 'Vrijblijvend voorstel, prijs vooraf', 'Eén aanspreekpunt'],
  fr: ['Prix à partir de €490 HTVA', 'Proposition sans engagement, prix connu d’avance', 'Un seul interlocuteur'],
  en: ['Prices from €490 excl. VAT', 'No-obligation proposal, price up front', 'A single point of contact'],
};
export const ASK = { nl: 'Vraag uw vrijblijvend voorstel aan', fr: 'Demandez votre proposition sans engagement', en: 'Request your no-obligation proposal' };
export const ALT = {
  nl: 'Of mail naar <a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a> of bel <a class="nw" href="tel:+3214718080">+32 14 71 80 80</a>.',
  fr: 'Ou écrivez à <a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a> ou appelez le <a class="nw" href="tel:+3214718080">+32 14 71 80 80</a>.',
  en: 'Or email <a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a> or call <a class="nw" href="tel:+3214718080">+32 14 71 80 80</a>.',
};
export const REPLY = { nl: 'Op een bericht antwoorden wij doorgaans binnen 1 werkdag.', fr: 'Nous répondons généralement à un message dans un délai d’un jour ouvrable.', en: 'We usually reply to a message within 1 working day.' };
export const DELIVERY = {
  nl: 'Start staat binnen 5 werkdagen online, Vakman binnen 10 werkdagen en een Webshop in 3 tot 4 weken. Die termijn loopt vanaf uw goedkeuring van het voorstel en het moment dat wij alles hebben wat nodig is, zoals uw logo en eventueel uw foto\'s.',
  fr: 'La formule Start est en ligne en 5 jours ouvrables, Vakman en 10 jours ouvrables et une Webshop en 3 à 4 semaines. Ce délai court à partir de votre accord sur la proposition et du moment où nous avons tout ce qu’il faut, comme votre logo et éventuellement vos photos.',
  en: 'Start goes live within 5 working days, Vakman within 10 working days and a Webshop in 3 to 4 weeks. That period runs from your approval of the proposal and the moment we have everything we need, such as your logo and any photos.',
};
export const HOME_LABEL = { nl: 'Home', fr: 'Accueil', en: 'Home' };
export const HUB_LABEL = { nl: 'Regio\'s', fr: 'Régions', en: 'Regions' };
/** standaard slot: CTA met mail/telefoon en buursteden */
export const cta = (lang, h2, also) => ({ t: 'cta', h2, p: { nl: 'Vraag een vrijblijvend voorstel aan voor uw eigen zaak. U zit nergens aan vast. ', fr: 'Demandez une proposition sans engagement pour votre propre entreprise. Vous n’êtes engagé à rien. ', en: 'Ask for a no-obligation proposal for your own business. You are not committed to anything. ' }[lang] + REPLY[lang], btn: [CTA[lang], ASK[lang]], alt: ALT[lang], also });
