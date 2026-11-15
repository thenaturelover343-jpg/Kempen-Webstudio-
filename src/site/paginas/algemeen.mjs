// Nieuwe algemene pagina's: regio-hub, Over ons, Contact, SEO laten doen (NL/FR/EN) en EN Brussels.
// Alleen feiten die ook elders op de site staan (prijzen, werkwijze, NAP). Geen naam of gezicht, geen klanten of cijfers.
import { P, TRUST, ASK, CTA, DELIVERY, HOME_LABEL, HUB_LABEL, REPLY, ALT, cta, demo } from './_gemeen.mjs';
import { foto } from '../fotos.mjs';

const pic = (id, vorm, lang, sizes) => { const f = foto(id, vorm, lang); return `<picture><source type="image/avif" srcset="${f.avif}" sizes="${sizes}"><img src="${f.src}" srcset="${f.webp}" sizes="${sizes}" width="${f.width}" height="${f.height}" alt="${f.alt}" loading="lazy" decoding="async"></picture>`; };
const alt3 = k => ({ nl: P[k].nl, fr: P[k].fr, en: P[k].en });
const NAP = {
  nl: `<ul><li><strong>Kempen Webstudio</strong></li><li>Kemelbeekstraat 16, 2460 Kasterlee</li><li>Telefoon: <a class="nw" href="tel:+3214718080">+32 14 71 80 80</a></li><li>E-mail: <a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a></li><li>Ondernemingsnummer: BE 0897.577.919</li></ul>`,
  fr: `<ul><li><strong>Kempen Webstudio</strong></li><li>Kemelbeekstraat 16, 2460 Kasterlee</li><li>Téléphone : <a class="nw" href="tel:+3214718080">+32 14 71 80 80</a></li><li>E-mail : <a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a></li><li>Numéro d’entreprise : BE 0897.577.919</li></ul>`,
  en: `<ul><li><strong>Kempen Webstudio</strong></li><li>Kemelbeekstraat 16, 2460 Kasterlee, Belgium</li><li>Phone: <a class="nw" href="tel:+3214718080">+32 14 71 80 80</a></li><li>Email: <a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a></li><li>Company number: BE 0897.577.919</li></ul>`,
};

// ------------------------------------------------------------------------------------------------ REGIO-HUB
const hub = {
  nl: {
    path: P.hub.nl, title: 'Website laten maken in België | Alle steden en regio\'s', desc: 'Website laten maken in heel België: kies uw provincie of stad, van Antwerpen en Gent tot Brussel en Hasselt. Webdesign vanaf €490 excl. btw, prijs vooraf.',
    h1: 'Website laten maken in heel België', crumbCur: 'Regio\'s',
    slogan: 'Kempen Webstudio werkt vanuit Kasterlee voor zaken in heel België. Kies hieronder uw stad of regio.',
    sections: [
      { t: 'band', id: 'heel-belgie', intro: ['Eén webstudio, voor heel België.', 'Online overleg, één vast aanspreekpunt.'], h2: 'Webdesign voor elke provincie', lead: [`Waar uw zaak ook staat, u krijgt dezelfde aanpak en dezelfde prijzen: eerst een vrijblijvend voorstel, daarna een eigen ontwerp dat snel laadt en toegankelijk is voor iedereen. Op elke stadspagina leest u wat dat concreet betekent voor zaken in die stad. Algemene info over <a href="/">een website laten maken</a> vindt u op onze startpagina.`, 'Kennismaking en overleg verlopen online, per e-mail of telefoon. U hoeft dus niet naar Kasterlee te komen.'] },
      { t: 'cards', id: 'provincies', h2: 'Kies uw provincie of stad', items: [
        ['Provincie Antwerpen', `<a href="/website-laten-maken-antwerpen/">Antwerpen</a>, <a href="/website-laten-maken-mechelen/">Mechelen</a>, <a href="/website-laten-maken-turnhout/">Turnhout</a>, <a href="/website-laten-maken-geel/">Geel</a>, <a href="/website-laten-maken-herentals/">Herentals</a>, <a href="/website-laten-maken-mol/">Mol</a>, <a href="/website-laten-maken-kasterlee/">Kasterlee</a> en <a href="/website-laten-maken-kempen/">de Kempen</a>.`],
        ['Brussel en Vlaams-Brabant', `<a href="/website-laten-maken-brussel/">Brussel</a> en <a href="/website-laten-maken-leuven/">Leuven</a>.`],
        ['Oost- en West-Vlaanderen', `<a href="/website-laten-maken-gent/">Gent</a>, <a href="/website-laten-maken-brugge/">Brugge</a> en <a href="/website-laten-maken-kortrijk/">Kortrijk</a>.`],
        ['Limburg', `<a href="/website-laten-maken-hasselt/">Hasselt</a>. Ook voor zaken in de Limburgse Kempen, zoals rond Lommel en Beringen, werken wij graag.`],
        ['Wallonië (in het Frans)', `<a href="/fr/creation-site-internet-liege/" hreflang="fr-BE" lang="fr-BE">Liège</a>, <a href="/fr/creation-site-internet-namur/" hreflang="fr-BE" lang="fr-BE">Namur</a> en <a href="/fr/creation-site-internet-charleroi/" hreflang="fr-BE" lang="fr-BE">Charleroi</a>.`],
        ['Uw stad staat er niet bij?', `Geen probleem. Wij maken websites voor zaken in heel België, ook in kleinere gemeenten. <a href="${P.contact.nl}">Neem contact op</a> of vraag meteen een vrijblijvend voorstel aan.`],
      ] },
      { t: 'cards', id: 'diensten-hub', h2: 'Wat wij voor uw zaak maken', items: [
        ['Een nieuwe website', `Een eigen ontwerp, teksten door ons geschreven en een site die werkt op gsm en computer. Zie <a href="/">website laten maken</a>.`],
        ['Een webshop', `Tot 50 producten met veilig online betalen. Zie <a href="${P.webshop.nl}">webshop laten maken</a>.`],
        ['Gevonden worden', `SEO, lokale SEO en uw Google Bedrijfsprofiel. Zie <a href="${P.seo.nl}">SEO laten doen</a>.`],
      ] },
      { t: 'pricing', id: 'prijs-hub', h2: 'Overal in België dezelfde prijzen', side: 'Uw stad bepaalt de prijs niet. U kiest een pakket en kent het bedrag vooraf.', term: `Na een kort gesprek krijgt u een schriftelijke offerte. Alle prijzen staan in onze prijsgids <a href="${P.prijs.nl}">wat kost een website laten maken in 2026</a>.` },
      { t: 'faq', id: 'faq-hub', h2: 'Veelgestelde vragen over een website laten maken in België', items: [
        ['Werken jullie echt in heel België?', 'Ja. Wij werken online, dus de afstand speelt geen rol. Op de stadspagina\'s leest u hoe wij rekening houden met de klanten en de buurt van uw zaak.'],
        ['Is een website in een grote stad duurder?', 'Nee. Wij rekenen overal dezelfde prijzen: Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, plus een maandprijs.'],
        ['Maken jullie ook Franstalige websites?', 'Ja. Wij werken in het Nederlands, het Frans en het Engels. Welke talen uw site nodig heeft, bespreken wij vooraf.'],
        ['Hoe lang duurt het voor mijn website online staat?', DELIVERY.nl],
      ] },
      cta('nl', 'Een website voor uw zaak, waar in België ook?', ['Populaire steden', [['/website-laten-maken-antwerpen/', 'Antwerpen'], ['/website-laten-maken-gent/', 'Gent'], ['/website-laten-maken-brussel/', 'Brussel'], ['/website-laten-maken-leuven/', 'Leuven'], ['/website-laten-maken-kempen/', 'de Kempen']]]),
    ],
  },
  fr: {
    path: P.hub.fr, title: 'Création site internet en Belgique : villes et régions', desc: 'Création de site internet dans toute la Belgique : choisissez votre ville, de Bruxelles et Liège à Namur et Charleroi. Dès €490 HTVA, prix connu d’avance.',
    h1: 'Création de site internet dans toute la Belgique', crumbCur: 'Régions',
    slogan: 'Kempen Webstudio travaille depuis Kasterlee pour des entreprises dans toute la Belgique. Choisissez votre ville ou votre région.',
    sections: [
      { t: 'band', id: 'toute-la-belgique', intro: ['Un studio web pour toute la Belgique.', 'Suivi en ligne, un seul interlocuteur.'], h2: 'Créer un site web, quelle que soit votre région', lead: [`Où que se trouve votre entreprise, vous bénéficiez de la même approche et des mêmes prix : d’abord une proposition sans engagement, ensuite un design propre, rapide et accessible à tous. Sur chaque page de ville, vous découvrez ce que cela veut dire concrètement. Pour l’essentiel sur la <a href="/fr/">création de site internet</a>, rendez-vous sur notre page d’accueil.`, 'La prise de contact et le suivi se font en ligne, par e-mail ou par téléphone. Vous n’avez donc pas besoin de vous déplacer.'] },
      { t: 'cards', id: 'regions', h2: 'Choisissez votre région ou votre ville', items: [
        ['Bruxelles', `<a href="/fr/creation-site-internet-bruxelles/">Création de site internet à Bruxelles</a>, dans les 19 communes.`],
        ['Wallonie', `<a href="/fr/creation-site-internet-liege/">Liège</a>, <a href="/fr/creation-site-internet-namur/">Namur</a> et <a href="/fr/creation-site-internet-charleroi/">Charleroi</a>.`],
        ['Flandre', `<a href="/fr/creation-site-internet-gand/">Gand</a>, <a href="/fr/creation-site-internet-louvain/">Louvain</a>, <a href="/fr/creation-site-internet-courtrai/">Courtrai</a> et <a href="/fr/creation-site-internet-campine/">la Campine</a>.`],
        ['Votre ville n’y figure pas ?', `Aucun problème. Nous créons des sites pour des entreprises dans toute la Belgique, y compris dans les petites communes. <a href="${P.contact.fr}">Contactez-nous</a> ou demandez directement une proposition.`],
      ] },
      { t: 'cards', id: 'services-hub', h2: 'Ce que nous créons pour votre entreprise', items: [
        ['Un nouveau site internet', `Un design propre, des textes rédigés par nous et un site qui fonctionne sur smartphone et ordinateur. Voir <a href="/fr/">création de site internet</a>.`],
        ['Une boutique en ligne', `Jusqu’à 50 produits avec paiement sécurisé. Voir <a href="${P.webshop.fr}">création de boutique en ligne</a>.`],
        ['Être trouvé', `SEO, SEO local et fiche Google Business. Voir <a href="${P.seo.fr}">référencement SEO</a>.`],
      ] },
      { t: 'pricing', id: 'prix-hub', h2: 'Les mêmes prix partout en Belgique', side: 'Votre ville ne change pas le prix. Vous choisissez une formule et connaissez le montant d’avance.', term: `Après un court entretien, vous recevez une offre écrite. Tous les prix figurent dans notre guide <a href="${P.prijs.fr}">prix d’un site internet en Belgique en 2026</a>.` },
      { t: 'faq', id: 'faq-hub', h2: 'Questions fréquentes sur la création de site internet en Belgique', items: [
        ['Travaillez-vous vraiment dans toute la Belgique ?', 'Oui. Nous travaillons en ligne, la distance ne joue donc aucun rôle. Sur les pages de ville, vous voyez comment nous tenons compte des clients et du quartier de votre entreprise.'],
        ['Un site dans une grande ville coûte-t-il plus cher ?', 'Non. Nos prix sont les mêmes partout : Start à partir de €490, Vakman à partir de €990 et Webshop à partir de €1.890, montant unique HTVA, plus un abonnement mensuel.'],
        ['Créez-vous des sites en français ?', 'Oui. Nous travaillons en français, en néerlandais et en anglais. Les langues nécessaires sont discutées d’avance.'],
        ['En combien de temps mon site est-il en ligne ?', DELIVERY.fr],
      ] },
      cta('fr', 'Un site internet pour votre entreprise, partout en Belgique ?', ['Villes populaires', [['/fr/creation-site-internet-bruxelles/', 'Bruxelles'], ['/fr/creation-site-internet-liege/', 'Liège'], ['/fr/creation-site-internet-namur/', 'Namur'], ['/fr/creation-site-internet-charleroi/', 'Charleroi']]]),
    ],
  },
  en: {
    path: P.hub.en, title: 'Website design in Belgium | All cities and regions', desc: 'Website design across Belgium: choose your city, from Brussels and Antwerp to Ghent and Leuven. Websites from €490 excl. VAT, price agreed up front.',
    h1: 'Website design across Belgium', crumbCur: 'Regions',
    slogan: 'Kempen Webstudio works from Kasterlee for businesses all over Belgium. Choose your city or region below.',
    sections: [
      { t: 'band', id: 'all-belgium', intro: ['One web studio, for all of Belgium.', 'Online meetings, one point of contact.'], h2: 'Website design for every region', lead: [`Wherever your business is, you get the same approach and the same prices: a no-obligation proposal first, then a custom design that loads fast and is accessible to everyone. Each city page explains what that means for businesses there. For the essentials on <a href="/en/">having a website built</a>, see our home page.`, 'Introductions and meetings take place online, by email or phone, so you never need to travel to Kasterlee.'] },
      { t: 'cards', id: 'regions-en', h2: 'Choose your city', items: [
        ['Brussels', `<a href="/en/web-design-brussels/">Web design in Brussels</a>, in all 19 municipalities.`],
        ['Flanders', `<a href="/en/website-laten-maken-gent/">Ghent</a>, <a href="/en/website-laten-maken-leuven/">Leuven</a>, <a href="/en/website-laten-maken-kortrijk/">Kortrijk</a> and <a href="/en/website-laten-maken-kempen/">the Kempen</a>.`],
        ['Other cities', `We also build websites for businesses in Antwerp, Mechelen, Hasselt, Bruges, Liège, Namur and Charleroi. Those pages are available in Dutch or French; <a href="${P.contact.en}">contact us</a> in English any time.`],
      ] },
      { t: 'pricing', id: 'prices-hub', h2: 'The same prices everywhere in Belgium', side: 'Your city does not change the price. You choose a package and know the amount in advance.', term: `After a short conversation you receive a written quote. All prices are in our guide <a href="${P.prijs.en}">what does a website cost in 2026</a>.` },
      { t: 'faq', id: 'faq-hub', h2: 'Frequently asked questions about website design in Belgium', items: [
        ['Do you really work across Belgium?', 'Yes. We work online, so distance does not matter.'],
        ['Is a website in a big city more expensive?', 'No. Our prices are the same everywhere: Start from €490, Vakman from €990 and Webshop from €1,890, one-off and excl. VAT, plus a monthly fee.'],
        ['Can you build a website in English?', 'Yes. We work in English, Dutch and French. Which languages your site needs is agreed in advance.'],
        ['How long until my website is live?', DELIVERY.en],
      ] },
      cta('en', 'A website for your business, anywhere in Belgium?'),
    ],
  },
};

// ------------------------------------------------------------------------------------------------ OVER ONS
const over = {
  nl: {
    path: P.over.nl, pageType: 'AboutPage', title: 'Over Kempen Webstudio | Webstudio uit Kasterlee', desc: 'Kempen Webstudio is een webstudio uit Kasterlee. Wij maken snelle, toegankelijke websites voor kmo\'s, verenigingen en zelfstandigen in heel België.',
    h1: 'Over Kempen Webstudio', crumbCur: 'Over ons',
    slogan: 'Een webstudio uit Kasterlee die websites maakt voor zaken in heel België, met prijzen vooraf en één vast aanspreekpunt.',
    sections: [
      { t: 'band', id: 'wie-wij-zijn', intro: ['Websites die werken voor uw zaak.', 'Duidelijk, snel en eerlijk.'], h2: 'Wie wij zijn', lead: [`Kempen Webstudio is een jonge webstudio uit Kasterlee, in de Kempen. Wij maken websites en webshops, zorgen dat uw zaak gevonden wordt in Google en ontwerpen logo's en huisstijlen, voor ondernemers, verenigingen en zelfstandigen in heel België.`, `Wij vinden dat een goede website geen luxe hoeft te zijn. Daarom staan al onze prijzen openbaar op de site, maken wij eerst een vrijblijvend voorstel en bouwen wij elke site met een eigen ontwerp in plaats van een sjabloon.`] },
      { t: 'cards', id: 'waarden', h2: 'Waar wij voor staan', items: [
        ['Eén vast aanspreekpunt', 'U praat altijd met dezelfde persoon, van het eerste gesprek tot de wijzigingen jaren later. Geen doorschakelen, geen ticketsysteem.'],
        ['Prijzen vooraf', `Alle pakketten en losse diensten hebben een vanaf-prijs op de site. U krijgt een schriftelijke offerte en beslist pas als u de prijs kent. Zie <a href="${P.prijs.nl}">onze prijzen</a>.`],
        ['Snel en toegankelijk', `Wij bouwen volgens de richtlijnen voor webtoegankelijkheid (WCAG 2.2 AA), zodat iedereen uw site kan gebruiken, en houden de pagina's licht zodat ze snel laden op een gsm. Zie <a href="${P.wcag.nl}">toegankelijke website</a>.`],
        ['Uw domein op uw naam', 'Uw domeinnaam staat altijd op uw eigen naam. Een pakket loopt minimaal 12 maanden en is daarna maandelijks opzegbaar.'],
        ['Eerlijk over voorbeelden', `Onze <a href="${P.demos.nl}">voorbeeldontwerpen</a> hebben fictieve namen en gegevens, en dat zeggen wij er ook bij. Wij tonen geen verzonnen klanten, reviews of cijfers.`],
        ['Gewone taal', 'De teksten op uw site schrijven wij na een gesprek, in gewone taal, zodat uw klanten meteen begrijpen wat u doet en voor wie.'],
      ] },
      { t: 'prose', id: 'werkwijze-over', h2: 'Hoe wij werken', html: `<p>Het begint met een kennismaking, per e-mail, telefonisch of online. Daarna maken wij een vrijblijvend voorstel voor uw eigen zaak: u ziet wat uw website bevat en wat ze kost. Wilt u verder, dan leggen wij het pakket vast in een schriftelijke offerte.</p><p>${DELIVERY.nl} Na de lancering houden wij uw site bij: updates, back-ups en kleine aanpassingen zitten in de maandprijs. Meer over de stappen leest u bij <a href="/#werkwijze">onze werkwijze</a>.</p>` },
      { t: 'prose', id: 'waarom-kasterlee', h2: 'Waarom Kasterlee, en heel België', html: `<p>Kempen Webstudio is gevestigd in Kasterlee, tussen Turnhout, Geel en Herentals. Daar kennen wij de zaken, de verenigingen en de vakmensen van dichtbij. Omdat kennismaking en overleg online verlopen, werken wij net zo goed voor een bistro in <a href="/website-laten-maken-gent/">Gent</a>, een advocaat in <a href="/website-laten-maken-brussel/">Brussel</a> of een kapsalon in <a href="/website-laten-maken-hasselt/">Hasselt</a>. Een overzicht vindt u bij <a href="${P.hub.nl}">website laten maken in heel België</a>.</p>` },
      { t: 'cards', id: 'gegevens', h2: 'Onze gegevens', items: [
        ['Adres en contact', NAP.nl],
        ['Talen', 'Wij werken in het Nederlands, het Frans en het Engels.'],
        ['Contact opnemen', `Via het formulier op de <a href="${P.contact.nl}">contactpagina</a>, per e-mail of telefonisch. ${REPLY.nl}`],
      ] },
      { t: 'faq', id: 'faq-over', h2: 'Veelgestelde vragen over Kempen Webstudio', items: [
        ['Waar is Kempen Webstudio gevestigd?', 'In Kasterlee, op de Kemelbeekstraat 16. Wij werken voor zaken in heel België.'],
        ['Werken jullie met sjablonen?', 'Nee. Elke website krijgt een eigen ontwerp, vertrekkend van uw vak, uw klanten en de sfeer van uw zaak.'],
        ['Zijn de voorbeeldontwerpen echte klanten?', 'Nee. Het zijn ontwerpen met fictieve namen en gegevens, die tonen wat wij voor verschillende sectoren kunnen maken.'],
        ['Kan ik eerst kennismaken?', `Ja. Stuur een bericht via de <a href="${P.contact.nl}">contactpagina</a> of bel ons. Kennismaking verloopt online, per e-mail of telefoon.`],
      ] },
      cta('nl', 'Kennismaken met Kempen Webstudio?'),
    ],
  },
  fr: {
    path: P.over.fr, pageType: 'AboutPage', title: 'À propos de Kempen Webstudio | Studio web à Kasterlee', desc: 'Kempen Webstudio est un studio web établi à Kasterlee. Nous créons des sites rapides et accessibles pour les PME, associations et indépendants en Belgique.',
    h1: 'À propos de Kempen Webstudio', crumbCur: 'À propos',
    slogan: 'Un studio web établi à Kasterlee qui crée des sites pour des entreprises dans toute la Belgique, avec des prix connus d’avance et un seul interlocuteur.',
    sections: [
      { t: 'band', id: 'qui-sommes-nous', intro: ['Des sites qui travaillent pour votre entreprise.', 'Clairs, rapides et honnêtes.'], h2: 'Qui sommes-nous', lead: [`Kempen Webstudio est un jeune studio web établi à Kasterlee, en Campine anversoise. Nous créons des sites internet et des boutiques en ligne, nous aidons votre entreprise à être trouvée dans Google et nous concevons logos et identités visuelles, pour des entrepreneurs, des associations et des indépendants dans toute la Belgique.`, `Pour nous, un bon site ne doit pas être un luxe. C’est pourquoi tous nos prix sont publics, que nous préparons d’abord une proposition sans engagement et que chaque site reçoit un design propre plutôt qu’un modèle tout fait.`] },
      { t: 'cards', id: 'valeurs', h2: 'Nos valeurs', items: [
        ['Un seul interlocuteur', 'Vous parlez toujours à la même personne, du premier entretien aux modifications des années plus tard.'],
        ['Des prix connus d’avance', `Chaque formule et chaque service a un prix de départ sur le site. Vous recevez une offre écrite et décidez seulement quand vous connaissez le prix. Voir <a href="${P.prijs.fr}">nos prix</a>.`],
        ['Rapide et accessible', `Nous suivons les règles d’accessibilité numérique (WCAG 2.2 AA) et gardons des pages légères pour qu’elles se chargent vite sur smartphone. Voir <a href="${P.wcag.fr}">site internet accessible</a>.`],
        ['Votre nom de domaine à votre nom', 'Votre nom de domaine est toujours à votre nom. Une formule dure au minimum 12 mois, ensuite elle est résiliable chaque mois.'],
        ['Honnêtes sur nos exemples', `Nos <a href="${P.demos.fr}">exemples de sites</a> portent des noms et des données fictifs, et nous le disons. Nous ne montrons ni clients, ni avis, ni chiffres inventés.`],
        ['Un langage clair', 'Nous rédigeons les textes de votre site après un entretien, dans un langage simple, pour que vos clients comprennent tout de suite ce que vous faites.'],
      ] },
      { t: 'prose', id: 'methode', h2: 'Notre façon de travailler', html: `<p>Tout commence par une prise de contact, par e-mail, par téléphone ou en ligne. Ensuite, nous préparons une proposition sans engagement pour votre entreprise : vous voyez ce que contient votre site et ce qu’il coûte. Si vous souhaitez continuer, nous fixons la formule dans une offre écrite.</p><p>${DELIVERY.fr} Après la mise en ligne, nous entretenons votre site : mises à jour, sauvegardes et petites modifications sont comprises dans l’abonnement mensuel.</p>` },
      { t: 'prose', id: 'pourquoi-kasterlee', h2: 'Pourquoi Kasterlee, et toute la Belgique', html: `<p>Kempen Webstudio est établi à Kasterlee, entre Turnhout, Geel et Herentals. Comme la prise de contact et le suivi se font en ligne, nous travaillons tout aussi bien pour un commerce à <a href="/fr/creation-site-internet-bruxelles/">Bruxelles</a>, un artisan à <a href="/fr/creation-site-internet-liege/">Liège</a> ou un cabinet à <a href="/fr/creation-site-internet-namur/">Namur</a>. Vue d’ensemble : <a href="${P.hub.fr}">création de site internet dans toute la Belgique</a>.</p>` },
      { t: 'cards', id: 'coordonnees', h2: 'Nos coordonnées', items: [
        ['Adresse et contact', NAP.fr],
        ['Langues', 'Nous travaillons en français, en néerlandais et en anglais.'],
        ['Nous contacter', `Par le formulaire de la <a href="${P.contact.fr}">page de contact</a>, par e-mail ou par téléphone. ${REPLY.fr}`],
      ] },
      { t: 'faq', id: 'faq-apropos', h2: 'Questions fréquentes sur Kempen Webstudio', items: [
        ['Où est établi Kempen Webstudio ?', 'À Kasterlee, Kemelbeekstraat 16. Nous travaillons pour des entreprises dans toute la Belgique.'],
        ['Utilisez-vous des modèles tout faits ?', 'Non. Chaque site reçoit un design propre, à partir de votre métier, de vos clients et de l’ambiance de votre entreprise.'],
        ['Les exemples de sites sont-ils de vrais clients ?', 'Non. Ce sont des designs avec des noms et des données fictifs, qui montrent ce que nous pouvons créer pour différents secteurs.'],
        ['Puis-je d’abord faire connaissance ?', `Oui. Envoyez un message via la <a href="${P.contact.fr}">page de contact</a> ou appelez-nous. La prise de contact se fait en ligne, par e-mail ou par téléphone.`],
      ] },
      cta('fr', 'Faire connaissance avec Kempen Webstudio ?'),
    ],
  },
  en: {
    path: P.over.en, pageType: 'AboutPage', title: 'About Kempen Webstudio | Web studio in Kasterlee', desc: 'Kempen Webstudio is a web studio based in Kasterlee, Belgium. We build fast, accessible websites for SMEs, associations and freelancers across Belgium.',
    h1: 'About Kempen Webstudio', crumbCur: 'About us',
    slogan: 'A web studio based in Kasterlee that builds websites for businesses across Belgium, with prices up front and one point of contact.',
    sections: [
      { t: 'band', id: 'who-we-are', intro: ['Websites that work for your business.', 'Clear, fast and honest.'], h2: 'Who we are', lead: [`Kempen Webstudio is a young web studio based in Kasterlee, in the Kempen region of Belgium. We build websites and online shops, help your business get found on Google, and design logos and visual identities for entrepreneurs, associations and freelancers across Belgium.`, `We believe a good website should not be a luxury. That is why all our prices are public, why we start with a no-obligation proposal, and why every site gets its own design instead of a template.`] },
      { t: 'cards', id: 'values', h2: 'What we stand for', items: [
        ['One point of contact', 'You always talk to the same person, from the first conversation to changes years later.'],
        ['Prices up front', `Every package and service has a starting price on the site. You get a written quote and only decide once you know the price. See <a href="${P.prijs.en}">our prices</a>.`],
        ['Fast and accessible', `We follow the web accessibility guidelines (WCAG 2.2 AA) and keep pages light so they load quickly on a phone. See <a href="${P.wcag.en}">accessible website</a>.`],
        ['Your domain in your name', 'Your domain name is always registered in your own name. A package runs for at least 12 months and can then be cancelled monthly.'],
        ['Honest about examples', `Our <a href="${P.demos.en}">sample designs</a> use fictional names and details, and we say so. We never show invented clients, reviews or figures.`],
        ['Plain language', 'We write your website copy after a conversation, in plain language, so your customers understand straight away what you do.'],
      ] },
      { t: 'prose', id: 'how-we-work', h2: 'How we work', html: `<p>It starts with an introduction by email, phone or online. We then prepare a no-obligation proposal for your business, showing what your website will contain and what it costs. If you want to go ahead, we confirm the package in a written quote.</p><p>${DELIVERY.en} After launch we maintain your site: updates, backups and small changes are included in the monthly fee.</p>` },
      { t: 'prose', id: 'why-kasterlee', h2: 'Why Kasterlee, and all of Belgium', html: `<p>Kempen Webstudio is based in Kasterlee, between Turnhout, Geel and Herentals. Because introductions and meetings take place online, we work just as well for a business in <a href="/en/web-design-brussels/">Brussels</a> or <a href="/en/website-laten-maken-gent/">Ghent</a>. Overview: <a href="${P.hub.en}">website design across Belgium</a>.</p>` },
      { t: 'cards', id: 'details', h2: 'Our details', items: [
        ['Address and contact', NAP.en],
        ['Languages', 'We work in English, Dutch and French.'],
        ['Get in touch', `Use the form on the <a href="${P.contact.en}">contact page</a>, email or call us. ${REPLY.en}`],
      ] },
      { t: 'faq', id: 'faq-about', h2: 'Frequently asked questions about Kempen Webstudio', items: [
        ['Where is Kempen Webstudio based?', 'In Kasterlee, Kemelbeekstraat 16. We work for businesses across Belgium.'],
        ['Do you use templates?', 'No. Every website gets its own design, based on your trade, your customers and the feel of your business.'],
        ['Are the sample designs real clients?', 'No. They are designs with fictional names and details, showing what we can build for different sectors.'],
      ] },
      cta('en', 'Want to get to know Kempen Webstudio?'),
    ],
  },
};

// ------------------------------------------------------------------------------------------------ CONTACT
const mapFig = lang => pic('kaart', 'kaart169', lang, '(min-width: 1024px) 520px, 92vw');
const contact = {
  nl: {
    path: P.contact.nl, pageType: 'ContactPage', title: 'Contact | Kempen Webstudio, Kasterlee', desc: 'Contact Kempen Webstudio in Kasterlee: bel +32 14 71 80 80, mail info@kempenwebstudio.be of stuur een bericht. Antwoord doorgaans binnen 1 werkdag.',
    h1: 'Contact met Kempen Webstudio', crumbCur: 'Contact',
    slogan: 'Vertel kort over uw zaak, en wij nemen contact met u op. Op een bericht antwoorden wij doorgaans binnen 1 werkdag.',
    sections: [
      { t: 'cards', id: 'bereik-ons', h2: 'Zo bereikt u ons', items: [
        ['Telefoon', '<a class="nw" href="tel:+3214718080">+32 14 71 80 80</a>. Krijgt u ons niet meteen te pakken, laat dan een bericht na of stuur een e-mail.'],
        ['E-mail', '<a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a>. ' + REPLY.nl],
        ['Adres', 'Kempen Webstudio, Kemelbeekstraat 16, 2460 Kasterlee. Ondernemingsnummer BE 0897.577.919.'],
      ] },
      { t: 'raw', html: `<section aria-labelledby="bericht-t" class="sec kw-form"><div class="wrap"><p class="lbl">Contactformulier</p><h2 id="bericht-t">Stuur ons een bericht</h2><div class="kw-form-txt"><p>Vertel kort wat voor zaak u hebt en wat u zoekt: een nieuwe website, een webshop, een vernieuwing of hulp met uw vindbaarheid. Wij maken eerst een vrijblijvend voorstel, u zit nergens aan vast.</p><p>${REPLY.nl}</p></div></div></section>` },
      { t: 'band', id: 'waar', intro: ['In Kasterlee, voor heel België.', 'Overleg online, per e-mail of telefoon.'], h2: 'Waar wij zitten', lead: [`Kempen Webstudio zit in Kasterlee, in de Kempen, tussen Turnhout, Geel en Herentals. Kennismaking en overleg verlopen online, per e-mail of telefoon. Zo werken wij net zo vlot voor zaken in <a href="/website-laten-maken-antwerpen/">Antwerpen</a>, <a href="/website-laten-maken-gent/">Gent</a> of <a href="/website-laten-maken-brussel/">Brussel</a> als in de <a href="/website-laten-maken-kempen/">Kempen</a>.`, 'Kaart: © OpenStreetMap-bijdragers.'], fig: mapFig('nl') },
      { t: 'faq', id: 'faq-contact', h2: 'Veelgestelde vragen over contact', items: [
        ['Hoe snel krijg ik antwoord?', REPLY.nl + ' Bij een vraag over een nieuwe website maken wij daarna een vrijblijvend voorstel.'],
        ['Moet ik langskomen in Kasterlee?', 'Nee. Kennismaking en overleg verlopen online, per e-mail of telefoon. Wilt u liever afspreken, vermeld het gerust in uw bericht.'],
        ['Wat zet ik in mijn bericht?', 'Uw naam, uw zaak en wat u zoekt is genoeg. Hebt u al een website, vermeld dan het adres.'],
        ['Wat gebeurt er met mijn gegevens?', 'Wij gebruiken uw gegevens alleen om op uw vraag te antwoorden. Meer leest u in onze <a href="/privacyverklaring/">privacyverklaring</a>.'],
      ] },
    ],
  },
  fr: {
    path: P.contact.fr, pageType: 'ContactPage', title: 'Contact | Kempen Webstudio, studio web à Kasterlee', desc: 'Contactez Kempen Webstudio : appelez le +32 14 71 80 80, écrivez à info@kempenwebstudio.be ou via le formulaire. Réponse sous 1 jour ouvrable.',
    h1: 'Contacter Kempen Webstudio', crumbCur: 'Contact',
    slogan: 'Parlez-nous brièvement de votre entreprise et nous vous recontactons. Nous répondons généralement à un message dans un délai d’un jour ouvrable.',
    sections: [
      { t: 'cards', id: 'nous-joindre', h2: 'Comment nous joindre', items: [
        ['Téléphone', '<a class="nw" href="tel:+3214718080">+32 14 71 80 80</a>. Si vous ne nous joignez pas tout de suite, laissez un message ou envoyez un e-mail.'],
        ['E-mail', '<a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a>. ' + REPLY.fr],
        ['Adresse', 'Kempen Webstudio, Kemelbeekstraat 16, 2460 Kasterlee. Numéro d’entreprise BE 0897.577.919.'],
      ] },
      { t: 'raw', html: `<section aria-labelledby="message-t" class="sec kw-form"><div class="wrap"><p class="lbl">Formulaire de contact</p><h2 id="message-t">Envoyez-nous un message</h2><div class="kw-form-txt"><p>Dites-nous brièvement quel type d’entreprise vous avez et ce que vous cherchez : un nouveau site, une boutique en ligne, une refonte ou de l’aide pour être trouvé. Nous préparons d’abord une proposition sans engagement.</p><p>${REPLY.fr}</p></div></div></section>` },
      { t: 'band', id: 'ou', intro: ['À Kasterlee, pour toute la Belgique.', 'Suivi en ligne, par e-mail ou par téléphone.'], h2: 'Où nous trouver', lead: [`Kempen Webstudio est établi à Kasterlee, en Campine anversoise, entre Turnhout, Geel et Herentals. La prise de contact et le suivi se font en ligne, par e-mail ou par téléphone. Nous travaillons donc aussi facilement pour des entreprises à <a href="/fr/creation-site-internet-bruxelles/">Bruxelles</a>, <a href="/fr/creation-site-internet-liege/">Liège</a> ou <a href="/fr/creation-site-internet-namur/">Namur</a>.`, 'Carte : © les contributeurs d’OpenStreetMap.'], fig: mapFig('fr') },
      { t: 'faq', id: 'faq-contact', h2: 'Questions fréquentes sur le contact', items: [
        ['En combien de temps recevrai-je une réponse ?', REPLY.fr + ' Pour un nouveau site, nous préparons ensuite une proposition sans engagement.'],
        ['Dois-je me rendre à Kasterlee ?', 'Non. La prise de contact et le suivi se font en ligne, par e-mail ou par téléphone. Si vous préférez un rendez-vous, indiquez-le dans votre message.'],
        ['Que dois-je mettre dans mon message ?', 'Votre nom, votre entreprise et ce que vous cherchez suffisent. Si vous avez déjà un site, indiquez son adresse.'],
        ['Que faites-vous de mes données ?', 'Nous utilisons vos données uniquement pour répondre à votre demande. Plus d’informations dans notre <a href="/fr/politique-confidentialite/">politique de confidentialité</a>.'],
      ] },
    ],
  },
  en: {
    path: P.contact.en, pageType: 'ContactPage', title: 'Contact | Kempen Webstudio, web studio in Kasterlee', desc: 'Contact Kempen Webstudio in Kasterlee, Belgium: call +32 14 71 80 80, email info@kempenwebstudio.be or use the form. Reply within 1 working day.',
    h1: 'Contact Kempen Webstudio', crumbCur: 'Contact',
    slogan: 'Tell us briefly about your business and we will get back to you. We usually reply to a message within 1 working day.',
    sections: [
      { t: 'cards', id: 'reach-us', h2: 'How to reach us', items: [
        ['Phone', '<a class="nw" href="tel:+3214718080">+32 14 71 80 80</a>. If you cannot reach us straight away, leave a message or send an email.'],
        ['Email', '<a href="mailto:info@kempenwebstudio.be">info@kempenwebstudio.be</a>. ' + REPLY.en],
        ['Address', 'Kempen Webstudio, Kemelbeekstraat 16, 2460 Kasterlee, Belgium. Company number BE 0897.577.919.'],
      ] },
      { t: 'raw', html: `<section aria-labelledby="message-en-t" class="sec kw-form"><div class="wrap"><p class="lbl">Contact form</p><h2 id="message-en-t">Send us a message</h2><div class="kw-form-txt"><p>Tell us briefly about your business and what you are looking for: a new website, an online shop, a redesign or help getting found. We start with a no-obligation proposal.</p><p>${REPLY.en}</p></div></div></section>` },
      { t: 'band', id: 'where', intro: ['In Kasterlee, for all of Belgium.', 'Meetings online, by email or phone.'], h2: 'Where we are', lead: [`Kempen Webstudio is based in Kasterlee, in the Kempen region, between Turnhout, Geel and Herentals. Introductions and meetings take place online, by email or phone, so we work just as easily for businesses in <a href="/en/web-design-brussels/">Brussels</a> or <a href="/en/website-laten-maken-gent/">Ghent</a>.`, 'Map: © OpenStreetMap contributors.'], fig: mapFig('en') },
      { t: 'faq', id: 'faq-contact', h2: 'Frequently asked questions about contact', items: [
        ['How quickly will I get a reply?', REPLY.en],
        ['Do I need to come to Kasterlee?', 'No. Introductions and meetings take place online, by email or phone.'],
        ['What happens to my details?', 'We only use your details to answer your question. See our <a href="/en/privacyverklaring/">privacy statement</a>.'],
      ] },
    ],
  },
};

// ------------------------------------------------------------------------------------------------ SEO LATEN DOEN
const SEO_ITEMS = {
  nl: [
    ['SEO-audit, vanaf €190', 'Een rapport van maximaal 10 pagina\'s over techniek, teksten, uw bedrijfsprofiel, lokale gegevens en 3 concurrenten, met 10 werkpunten in volgorde. Kiest u binnen 60 dagen voor Lokale SEO of een pakket, dan trekken wij dit bedrag af.'],
    ['Lokale SEO, vanaf €149 per maand', 'Ongeveer 2 uur werk per maand. Wij houden uw Google Bedrijfsprofiel bij, verbeteren of voegen één pagina toe, houden uw gegevens in gidsen gelijk en sturen een kort maandverslag. Maandelijks opzegbaar.'],
    ['Google Bedrijfsprofiel, vanaf €149', 'Wij maken het profiel aan of nemen het over en vullen het volledig in, met categorieën, diensten, werkgebied, openingsuren, omschrijving, eventueel 10 van uw foto\'s en een reviewlink met QR-code. Zit al in het pakket Vakman.'],
    ['Optimalisatie bestaande pagina, vanaf €59', 'Per pagina: titel, omschrijving, koppen, beeldteksten, interne links en laadtijd van de beelden.'],
    ['Teksten voor AI-zoekmachines, vanaf €149', 'Veelgestelde vragen met duidelijke antwoorden en gestructureerde gegevens over uw zaak, op tot 5 pagina\'s.'],
    ['Vermeldingen in bedrijfsgidsen, vanaf €99', 'Uw zaak in 10 Belgische bedrijfsgidsen en vakgidsen, overal met dezelfde naam, adres en telefoon. U krijgt de lijst met logins.'],
  ],
  fr: [
    ['Audit SEO, à partir de €190', 'Un rapport de 10 pages maximum sur la technique, les textes, votre fiche d’établissement, vos données locales et 3 concurrents, avec 10 points d’action par ordre de priorité. Si vous choisissez le SEO local ou une formule dans les 60 jours, nous déduisons ce montant.'],
    ['SEO local, à partir de €149 par mois', 'Environ 2 heures de travail par mois. Nous tenons à jour votre fiche Google, améliorons ou ajoutons une page, gardons vos données identiques dans les annuaires et envoyons un court rapport mensuel. Résiliable chaque mois.'],
    ['Fiche d’établissement Google, à partir de €149', 'Nous créons ou reprenons la fiche et la complétons entièrement : catégories, services, zone, horaires, description, éventuellement 10 de vos photos et un lien d’avis avec QR code. Compris dans la formule Vakman.'],
    ['Optimisation d’une page existante, à partir de €59', 'Par page : titre, description, intertitres, textes alternatifs, liens internes et poids des images.'],
    ['Textes pour les moteurs de recherche IA, à partir de €149', 'Des questions fréquentes avec des réponses claires et des données structurées sur votre entreprise, sur jusqu’à 5 pages.'],
    ['Mentions dans les annuaires, à partir de €99', 'Votre entreprise dans 10 annuaires belges, partout avec le même nom, la même adresse et le même téléphone. Vous recevez la liste avec les identifiants.'],
  ],
  en: [
    ['SEO audit, from €190', 'A report of up to 10 pages on technology, copy, your business profile, local data and 3 competitors, with 10 action points in order of priority. If you choose Local SEO or a package within 60 days, we deduct this amount.'],
    ['Local SEO, from €149 per month', 'About 2 hours of work per month. We keep your Google Business Profile up to date, improve or add one page, keep your details consistent in directories and send a short monthly report. Cancel monthly.'],
    ['Google Business Profile, from €149', 'We create or take over the profile and fill it in completely: categories, services, area, opening hours, description, up to 10 of your photos and a review link with QR code. Included in the Vakman package.'],
    ['Optimising an existing page, from €59', 'Per page: title, description, headings, image text, internal links and image loading time.'],
    ['Copy for AI search engines, from €149', 'Frequently asked questions with clear answers and structured data about your business, on up to 5 pages.'],
    ['Business directory listings, from €99', 'Your business in 10 Belgian directories, everywhere with the same name, address and phone number. You receive the list with logins.'],
  ],
};
const seo = {
  nl: {
    path: P.seo.nl, title: 'SEO laten doen | SEO-bureau voor kmo\'s, vanaf €59', desc: 'SEO laten doen voor uw kmo: SEO-audit vanaf €190, lokale SEO vanaf €149 per maand en uw Google Bedrijfsprofiel. Duidelijke prijzen, geen lange contracten.',
    h1: 'SEO laten doen voor uw zaak', crumbCur: 'SEO laten doen',
    slogan: 'Gevonden worden in Google, Google Maps en AI-zoekmachines, met overal dezelfde gegevens en duidelijke prijzen vooraf.',
    service: { name: 'SEO en zichtbaarheid', type: 'Zoekmachineoptimalisatie', offers: false },
    sections: [
      { t: 'band', id: 'seo-intro', intro: ['Vindbaar waar uw klanten zoeken.', 'Met prijzen vooraf, maandelijks opzegbaar.'], h2: 'Een SEO-bureau voor kleine zaken', lead: [`De meeste klanten zoeken eerst in Google of op Google Maps. Wie daar niet verschijnt, bestaat voor hen niet. Wij zorgen dat uw zaak gevonden wordt op de zoekwoorden die voor u tellen, met een site die snel laadt, duidelijke teksten en dezelfde gegevens overal. Bouwen wij uw website, dan zit de basis daarvan al in elk pakket; zie <a href="/">website laten maken</a>.`, 'Ook als u al een website hebt die iemand anders bouwde, kunt u bij ons terecht voor een audit of voor lokale SEO.'] },
      { t: 'cards', id: 'seo-diensten', h2: 'Onze SEO-diensten en prijzen', side: 'Alle prijzen zijn exclusief btw.', items: SEO_ITEMS.nl },
      { t: 'prose', id: 'seo-aanpak', h2: 'Hoe wij aan uw vindbaarheid werken', html: `<p>Wij beginnen bij wat uw klanten echt intypen: uw dienst, vaak met uw gemeente of regio erbij. Elke belangrijke dienst krijgt een eigen, duidelijke pagina met een goede titel en omschrijving. Uw naam, adres en telefoon staan overal hetzelfde: op uw site, in uw Google Bedrijfsprofiel en in bedrijfsgidsen. Technisch zorgen wij voor snelle pagina's, correcte gestructureerde gegevens en een site die werkt op een gsm.</p><p>Wij beloven geen plaats 1 in Google: niemand kan dat eerlijk beloven. Wel zeggen wij vooraf welk werk wij doen, en u krijgt bij Lokale SEO elke maand een kort verslag. Meer achtergrond leest u in ons artikel over <a href="${P.gbp.nl}">een Google Bedrijfsprofiel aanmaken</a>.</p>` },
      { t: 'cards', id: 'seo-voor-wie', h2: 'Voor wie is SEO zinvol?', items: [
        ['Lokale zaken', `Kapsalons, horeca, winkels en zorgverleners die klanten uit de buurt willen. Zie bijvoorbeeld <a href="${P.kapsalon.nl}">websites voor salons</a>.`],
        ['Vakmensen met een werkgebied', `Schilders, dakwerkers en tuinaannemers die gevonden willen worden in hun regio. Zie <a href="${P.vakmensen.nl}">websites voor vakmensen</a>.`],
        ['Zaken met een bestaande site', `Uw site staat online maar levert weinig aanvragen op? Begin met een SEO-audit, of laat uw site <a href="${P.vernieuwen.nl}">vernieuwen</a>.`],
      ] },
      { t: 'faq', id: 'faq-seo', h2: 'Veelgestelde vragen over SEO laten doen', items: [
        ['Wat kost SEO laten doen?', 'Een optimalisatie van een bestaande pagina kost vanaf €59, een SEO-audit vanaf €190 en Lokale SEO vanaf €149 per maand, telkens excl. btw. Lokale SEO is maandelijks opzegbaar.'],
        ['Hoe snel zie ik resultaat?', 'Dat hangt af van uw sector, uw regio en de concurrentie. Lokale verbeteringen, zoals een volledig ingevuld Google Bedrijfsprofiel, merkt u vaak sneller dan posities op brede zoekwoorden. Wij beloven geen vaste plaats in Google.'],
        ['Kunnen jullie ook SEO doen voor een site die jullie niet bouwden?', 'Ja. Een SEO-audit, optimalisatie van bestaande pagina\'s en Lokale SEO kunnen ook voor een bestaande website.'],
        ['Wat is lokale SEO?', 'Lokale SEO zorgt dat uw zaak verschijnt wanneer iemand in uw buurt zoekt, in Google en op Google Maps. Uw Google Bedrijfsprofiel, gelijke gegevens in gidsen en duidelijke pagina\'s per dienst spelen daarbij een grote rol.'],
        ['Wat zijn teksten voor AI-zoekmachines?', 'Steeds meer mensen stellen hun vraag aan een AI-assistent. Duidelijke veelgestelde vragen en gestructureerde gegevens helpen zulke systemen om uw zaak correct te beschrijven.'],
      ] },
      cta('nl', 'Beter gevonden worden met uw zaak?'),
    ],
  },
  fr: {
    path: P.seo.fr, title: 'Référencement SEO pour PME | Dès €59 HTVA', desc: 'Référencement SEO pour votre PME : audit SEO dès €190, SEO local dès €149 par mois et fiche Google Business. Prix clairs, sans contrat de longue durée.',
    h1: 'Référencement SEO pour votre entreprise', crumbCur: 'Référencement SEO',
    slogan: 'Être trouvé dans Google, Google Maps et les moteurs de recherche IA, avec les mêmes données partout et des prix connus d’avance.',
    service: { name: 'SEO et visibilité', type: 'Référencement naturel', offers: false },
    sections: [
      { t: 'band', id: 'seo-intro', intro: ['Visible là où vos clients cherchent.', 'Prix connus d’avance, résiliable chaque mois.'], h2: 'Une agence SEO pour les petites entreprises', lead: [`La plupart des clients cherchent d’abord dans Google ou sur Google Maps. Si vous n’y apparaissez pas, vous n’existez pas pour eux. Nous faisons en sorte que votre entreprise soit trouvée sur les mots qui comptent pour vous, avec un site rapide, des textes clairs et les mêmes données partout. Si nous créons votre site, la base est comprise dans chaque formule ; voir <a href="/fr/">création de site internet</a>.`, 'Vous avez déjà un site créé par quelqu’un d’autre ? Nous pouvons quand même réaliser un audit ou votre SEO local.'] },
      { t: 'cards', id: 'seo-services', h2: 'Nos services SEO et leurs prix', side: 'Tous les prix s’entendent HTVA.', items: SEO_ITEMS.fr },
      { t: 'prose', id: 'seo-methode', h2: 'Comment nous travaillons votre visibilité', html: `<p>Nous partons de ce que vos clients tapent vraiment : votre service, souvent avec votre commune ou votre région. Chaque service important reçoit sa propre page claire, avec un bon titre et une bonne description. Votre nom, votre adresse et votre téléphone sont identiques partout : sur votre site, sur votre fiche Google et dans les annuaires. Côté technique, nous assurons des pages rapides, des données structurées correctes et un site adapté au smartphone.</p><p>Nous ne promettons pas la première place dans Google : personne ne peut le promettre honnêtement. Nous annonçons en revanche le travail que nous faisons, et avec le SEO local vous recevez chaque mois un court rapport. Plus d’informations dans notre article <a href="${P.gbp.fr}">créer une fiche Google Business</a>.</p>` },
      { t: 'faq', id: 'faq-seo', h2: 'Questions fréquentes sur le référencement SEO', items: [
        ['Combien coûte le référencement SEO ?', 'L’optimisation d’une page existante coûte à partir de €59, un audit SEO à partir de €190 et le SEO local à partir de €149 par mois, HTVA. Le SEO local est résiliable chaque mois.'],
        ['Quand verrai-je des résultats ?', 'Cela dépend de votre secteur, de votre région et de la concurrence. Les améliorations locales, comme une fiche Google complète, se remarquent souvent plus vite que des positions sur des mots très larges. Nous ne promettons pas de position fixe.'],
        ['Faites-vous du SEO pour un site que vous n’avez pas créé ?', 'Oui. L’audit SEO, l’optimisation de pages existantes et le SEO local sont aussi possibles pour un site existant.'],
        ['Qu’est-ce que le SEO local ?', 'Le SEO local fait apparaître votre entreprise quand quelqu’un cherche près de chez vous, dans Google et sur Google Maps. Votre fiche Google, des données identiques dans les annuaires et des pages claires par service y jouent un grand rôle.'],
      ] },
      cta('fr', 'Envie d’être mieux trouvé ?'),
    ],
  },
  en: {
    path: P.seo.en, title: 'SEO services for small businesses | From €59', desc: 'SEO services in Belgium: SEO audit from €190, local SEO from €149 a month and your Google Business Profile. Clear prices, no long contracts.',
    h1: 'SEO services for your business', crumbCur: 'SEO services',
    slogan: 'Be found in Google, Google Maps and AI search engines, with the same details everywhere and clear prices up front.',
    service: { name: 'SEO and visibility', type: 'Search engine optimisation', offers: false },
    sections: [
      { t: 'band', id: 'seo-intro', intro: ['Visible where your customers search.', 'Prices up front, cancel monthly.'], h2: 'An SEO agency for small businesses', lead: [`Most customers search Google or Google Maps first. If you do not show up there, you do not exist for them. We make sure your business is found for the searches that matter to you, with a fast site, clear copy and the same details everywhere. If we build your website, the basics are included in every package; see <a href="/en/">having a website built</a>.`, 'Already have a website built by someone else? We can still do an audit or your local SEO.'] },
      { t: 'cards', id: 'seo-services-en', h2: 'Our SEO services and prices', side: 'All prices exclude VAT.', items: SEO_ITEMS.en },
      { t: 'faq', id: 'faq-seo', h2: 'Frequently asked questions about SEO', items: [
        ['What do SEO services cost?', 'Optimising an existing page costs from €59, an SEO audit from €190 and Local SEO from €149 per month, excl. VAT. Local SEO can be cancelled monthly.'],
        ['How fast will I see results?', 'That depends on your sector, region and competition. Local improvements, such as a complete Google Business Profile, often show sooner than rankings for broad terms. We never promise a fixed position.'],
        ['Can you do SEO for a site you did not build?', 'Yes. The SEO audit, page optimisation and Local SEO are also available for existing websites.'],
      ] },
      cta('en', 'Want your business to be found more easily?'),
    ],
  },
};

// ------------------------------------------------------------------------------------------------ EN BRUSSELS
const brussels = {
  path: '/en/web-design-brussels/', lang: 'en', alt: { nl: '/website-laten-maken-brussel/', fr: '/fr/creation-site-internet-bruxelles/', en: '/en/web-design-brussels/' },
  title: 'Web design in Brussels | Websites from €490 excl. VAT', desc: 'Web design in Brussels for small businesses, freelancers and associations: a custom, multilingual website in English, French or Dutch. From €490 excl. VAT.',
  h1: 'Web design in Brussels', crumbCur: 'Brussels', crumbs: [[P.home.en, HOME_LABEL.en], [P.hub.en, HUB_LABEL.en]],
  slogan: 'We start with a no-obligation proposal for your business in Brussels, tailored to your customers and the languages they speak.',
  ctas: [[CTA.en, ASK.en], [P.demos.en, 'View the sample designs']], trust: TRUST.en,
  service: { name: 'Web design in Brussels', type: 'Website design', area: { '@type': 'City', name: 'Brussels' } },
  sections: [
    { t: 'band', id: 'brussels-intro', intro: ['Know what your website will be before you decide.', 'You are not committed to anything.'], h2: 'A website for a city of many languages', lead: [`Brussels is officially bilingual, and many customers prefer English. A business in Brussels often needs a website in more than one language, with the same quality in each. We build fast, accessible websites with a custom design. Kempen Webstudio is based in Kasterlee and builds <a href="/en/">websites for businesses across Belgium</a>.`, 'A no-obligation proposal shows what your website will contain and what it costs, before you decide anything.'] },
    { t: 'cards', id: 'brussels-areas', h2: 'Websites for businesses in all 19 municipalities', items: [
      ['City centre and European Quarter', 'Around the Grand-Place, the Dansaert area, the Sablon and the European Quarter, restaurants, shops and service providers work for residents, commuters and international visitors. Opening hours, location and languages need to be clear within seconds.'],
      ['Residential neighbourhoods', 'In Ixelles, Saint-Gilles, Schaerbeek, Etterbeek, Uccle, Jette, Anderlecht or the Woluwes, customers look for a business close to home. We state clearly which municipalities you serve, matching your Google Business Profile.'],
      ['Freelancers and consultants', `Many independent professionals in Brussels work for an international clientele. A calm, trustworthy site in English, with clear contact details, makes a strong first impression. See <a href="${P.vrij.en}">websites for liberal professions</a>.`],
    ] },
    { t: 'prose', id: 'brussels-business', h2: 'Doing business in Brussels: who your customers are', html: `<p>Brussels is the capital of Belgium and home to the main institutions of the European Union; NATO has its headquarters in Evere. Many people from abroad live and work here alongside French- and Dutch-speaking residents. The Brussels-Capital Region has 19 municipalities, each with its own character.</p><p>For your website, that means thinking about your customers' language. We agree in advance which languages your site needs and what that means for the price. Brussels has a low emission zone, so we make access by metro, tram and bike clear on your contact page. For support with doing business in the region, hub.brussels is the regional agency.</p>` },
    { t: 'pricing', id: 'brussels-prices', h2: 'What does a website cost in Brussels?', side: 'You pay the same prices in Brussels as everywhere in Belgium.', term: `After a short conversation you receive a written quote. All prices are in our guide <a href="${P.prijs.en}">what does a website cost in 2026</a>.` },
    { t: 'prose', id: 'brussels-live', h2: 'When will your website be live?', html: `<p>${DELIVERY.en}</p>` },
    { t: 'faq', id: 'faq-brussels', h2: 'Frequently asked questions about web design in Brussels', items: [
      ['Can you build a website in English, French and Dutch?', 'We work in English, French and Dutch; our own website is available in all three. Which languages your site needs and what that costs is agreed in your no-obligation proposal.'],
      ['Do I need to travel to Kasterlee?', 'No. Introductions and meetings take place online, by email or phone. You have one point of contact.'],
      ['What does a website cost in Brussels?', 'Start from €490, Vakman from €990 and Webshop from €1,890, one-off and excl. VAT, plus a monthly fee from €29, €49 or €79. Extra languages are agreed in advance.'],
      ['Will my website be accessible?', `We build to the web accessibility guidelines (WCAG 2.2 AA). See <a href="${P.wcag.en}">accessible website</a>.`],
    ] },
    cta('en', 'A website for your business in Brussels?', ['Also active in', [['/en/website-laten-maken-leuven/', 'Leuven'], ['/en/website-laten-maken-gent/', 'Ghent'], [P.hub.en, 'all of Belgium']]]),
  ],
};

// ------------------------------------------------------------------------------------------------ samenstellen
const mk = (lang, o, k) => ({
  lang, alt: alt3(k), crumbs: [[P.home[lang], HOME_LABEL[lang]]],
  ctas: [[CTA[lang], ASK[lang]], [P.demos[lang], { nl: 'Bekijk de voorbeeldontwerpen', fr: 'Voir les exemples de sites', en: 'View the sample designs' }[lang]]],
  trust: TRUST[lang], ...o,
  sections: o.sections.concat(k === 'contact' ? [] : []),
});
export default [
  ...['nl', 'fr', 'en'].map(l => mk(l, hub[l], 'hub')),
  ...['nl', 'fr', 'en'].map(l => mk(l, over[l], 'over')),
  ...['nl', 'fr', 'en'].map(l => mk(l, contact[l], 'contact')),
  ...['nl', 'fr', 'en'].map(l => mk(l, seo[l], 'seo')),
  brussels,
];
