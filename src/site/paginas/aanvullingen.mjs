// Aanvullingen op bestaande pagina's (de pagina blijft, er komen secties en vragen bij): prijsgids 2026 en voorbeeldprojecten.
// Marktprijzen: alleen wat in het concurrentieonderzoek van 15-11-2026 op websites van Belgische bureaus te zien was.
import { P, demo } from './_gemeen.mjs';

const DEMOS = [['houtatelier-nethe', 'Houtatelier Nethe'], ['bistro-tilvaar', 'Bistro Tilvaar'], ['vennebrand', 'Vennebrand'], ['dakwerken-hoogland', 'Dakwerken Hoogland'], ['atelier-kleurwerk', 'Atelier Kleurwerk'], ['tuinzorg-varelinde', 'Tuinzorg Varelinde'], ['velours', 'Velours'], ['kapsalon-ivelien', 'Kapsalon Ivelien'], ['barbier-kolvaard', 'Barbier Kolvaard']];
const CAT = {
  nl: { 'houtatelier-nethe': 'schrijnwerker', 'bistro-tilvaar': 'bistro met online reserveren', vennebrand: 'webshop van een koffiebranderij', 'dakwerken-hoogland': 'dakwerker met offerteformulier', 'atelier-kleurwerk': 'fijnschilder', 'tuinzorg-varelinde': 'tuinbedrijf met galerij', velours: 'schoonheidssalon met afsprakenplanner', 'kapsalon-ivelien': 'kapsalon met afspraakknop', 'barbier-kolvaard': 'barbershop met online boeken' },
  fr: { 'houtatelier-nethe': 'menuisier', 'bistro-tilvaar': 'bistro avec réservation en ligne', vennebrand: 'boutique en ligne d’une torréfaction', 'dakwerken-hoogland': 'couvreur avec formulaire de devis', 'atelier-kleurwerk': 'peintre décorateur', 'tuinzorg-varelinde': 'entreprise de jardins avec galerie', velours: 'institut de beauté avec agenda', 'kapsalon-ivelien': 'salon de coiffure avec bouton rendez-vous', 'barbier-kolvaard': 'barbier avec réservation en ligne' },
  en: { 'houtatelier-nethe': 'joiner', 'bistro-tilvaar': 'bistro with online booking', vennebrand: 'online shop for a coffee roastery', 'dakwerken-hoogland': 'roofer with quote form', 'atelier-kleurwerk': 'decorator', 'tuinzorg-varelinde': 'garden company with gallery', velours: 'beauty salon with booking calendar', 'kapsalon-ivelien': 'hair salon with booking button', 'barbier-kolvaard': 'barbershop with online booking' },
};
const detail = lang => ({
  t: 'cards', id: 'elk-ontwerp', h2: { nl: 'Elk voorbeeldontwerp in detail', fr: 'Chaque exemple en détail', en: 'Each sample design in detail' }[lang],
  side: { nl: 'Doelgroep, ontwerpkeuzes, functies en schermafbeeldingen per ontwerp. Alle namen en gegevens zijn fictief.', fr: 'Public, choix de design, fonctions et captures d’écran par exemple. Tous les noms et données sont fictifs.', en: 'Audience, design choices, features and screenshots for each design. All names and details are fictional.' }[lang],
  items: DEMOS.map(([s, n]) => [`<a href="${demo(lang, s)}">${n}</a>`, { nl: 'Voorbeeldontwerp voor een ', fr: 'Exemple de design pour un ', en: 'Sample design for a ' }[lang] + CAT[lang][s] + '.']),
});

// ------------------------------------------------------------------ prijsgids
const G = {
  nl: {
    title: 'Prijs website laten maken: wat kost een website in 2026?', desc: 'Prijs website laten maken in België in 2026: wat kost een website per type site, per maand en per jaar, met onderhoud en verborgen kosten.',
    h1: 'Wat kost een website laten maken? Prijzen in België (2026)',
    secs: [
      { t: 'table', id: 'prijsvorken', h2: 'Prijzen per type website in 2026', caption: 'Prijzen van Kempen Webstudio per type website, exclusief btw', head: ['Type website', 'Eenmalig', 'Per maand', 'Online binnen'], rows: [
        ['Eenvoudige website (Start)', 'vanaf €490', 'vanaf €29', '5 werkdagen'], ['Professionele website (Vakman)', 'vanaf €990', 'vanaf €49', '10 werkdagen'], ['Webshop tot 50 producten (Webshop)', 'vanaf €1.890', 'vanaf €79', '3 à 4 weken'],
        ['Landingspagina (één pagina)', 'vanaf €290', 'geen', 'in overleg'], ['Extra pagina', 'vanaf €79 per pagina', 'geen', 'in overleg'], ['Logo / huisstijl', 'vanaf €190 / €490', 'geen', 'in overleg']],
        before: '<p>Dit zijn onze vanaf-prijzen per type site. Het exacte bedrag staat in de schriftelijke offerte die u na een kort gesprek krijgt.</p>',
        after: `<p>Bij Kempen Webstudio kost een website vanaf €490 en een webshop vanaf €1.890 eenmalig, plus een maandprijs vanaf €29, €49 of €79, telkens excl. btw.</p><p>Bij Kempen Webstudio hebt u één vast aanspreekpunt, vaste pakketten en openbare prijzen. Meer over de afweging leest u in <a href="${P.zelf.nl}">website laten maken of zelf bouwen</a>.</p>` },
      { t: 'cards', id: 'onderhoudskosten', h2: 'Wat kost onderhoud van een website?', side: 'Met onderhoud blijft uw site veilig en up-to-date. Het meeste daarvan zit in de maandprijs van uw pakket.', items: [
        ['In de maandprijs', 'Uw .be-domein, hosting, back-ups, updates en aanpassingen: 15 minuten per maand bij Start, 30 minuten bij Vakman en Webshop, plus twee keer per jaar een controle van snelheid en vindbaarheid vanaf Vakman.'],
        ['Per jaar', 'Op jaarbasis is dat vanaf €348 voor Start, €588 voor Vakman en €948 voor Webshop, telkens excl. btw.'],
        ['Een site die wij niet bouwden', 'Met Onderhoud los, vanaf €29 per maand excl. btw: updates, een wekelijkse back-up, een maandelijkse controle en 15 minuten aanpassingen. Maandelijks opzegbaar.'],
        ['Grotere wijzigingen', `Werk dat buiten de minuten van uw pakket valt, rekenen wij aan ons uurtarief vanaf €60 excl. btw, altijd na uw akkoord. Lees ook over de <a href="${P.kosten.nl}">terugkerende kosten van een website</a>.`],
      ] },
      { t: 'cards', id: 'verborgen-kosten', h2: 'Verborgen kosten waar u op let', side: 'Vraag bij elke offerte naar deze punten. Zo ziet u wat een website echt kost.', items: [
        ['Domeinnaam op naam van de bouwer', 'Staat uw domein op naam van uw webbouwer, dan kost overstappen later geld en tijd. Bij Kempen Webstudio staat uw domeinnaam altijd op uw eigen naam.'],
        ['Licenties en plug-ins', 'Sommige sites hangen af van betalende thema\'s of plug-ins met een jaarlicentie. Vraag of die in de prijs zitten.'],
        ['Teksten en foto\'s', 'Een lage prijs gaat soms uit van teksten die u zelf aanlevert. Kempen Webstudio schrijft de teksten na een gesprek.'],
        ['Lange contracten', 'Let op de looptijd en de opzegtermijn. Onze pakketten lopen minimaal 12 maanden en zijn daarna maandelijks opzegbaar.'],
        ['Elke wijziging apart betalen', 'Zonder inbegrepen aanpassingen betaalt u voor elke kleine tekstwijziging. Bij Kempen Webstudio zitten er aanpassingsminuten in de maandprijs.'],
        ['Extra talen en functies', 'Een tweede taal, online afspraken of een webshop vragen extra werk. Wij noemen die kosten vooraf in de offerte.'],
      ] },
    ],
    faq: [
      ['Wat kost een website laten maken in België gemiddeld?', 'Dat hangt af van wat de site moet doen. Bij Kempen Webstudio begint een website vanaf €490 en een webshop vanaf €1.890, eenmalig en excl. btw.'],
      ['Wat kost een website per jaar?', 'Na de bouw betaalt u bij Kempen Webstudio de maandprijs van uw pakket, op jaarbasis vanaf €348 voor Start, €588 voor Vakman en €948 voor Webshop, excl. btw. Daarin zitten domein, hosting, back-ups, updates en aanpassingen.'],
      ['Welke verborgen kosten heeft een website?', 'Let op een domeinnaam die niet op uw naam staat, betalende licenties, teksten die u zelf moet schrijven, lange contracten en wijzigingen die u per keer betaalt.'],
      ['Kan ik gratis een website laten maken?', `Een website laten maken door een bureau is nooit gratis. Websitebouwers hebben wel gratis abonnementen, maar dan staat uw site meestal op een adres van die bouwer en niet op uw eigen domeinnaam, vaak met hun reclame erbij. Voor een zaak is een eigen .be-domein betrouwbaarder. Bij Kempen Webstudio begint een website vanaf €490 excl. btw. Wat zelf bouwen op termijn kost, leest u in <a href="${P.zelf.nl}">website laten maken of zelf bouwen</a>.`],
      ['Wat is de goedkoopste manier om een website te laten maken?', 'Begin met één duidelijke site met uw diensten, uw werkgebied en uw contactgegevens. Bij Kempen Webstudio is dat het pakket Start, vanaf €490 eenmalig en vanaf €29 per maand excl. btw. Later kunt u pagina\'s, een tweede taal of een webshop toevoegen.'],
      ['Kan ik de kosten van mijn website fiscaal inbrengen?', `Meestal wel, als beroepskost of via afschrijving. De regels leest u in ons artikel <a href="${P.fiscaal.nl}">is een website fiscaal aftrekbaar</a>.`],
    ],
  },
  fr: {
    title: 'Prix création site internet en Belgique : tarifs 2026', desc: 'Prix de la création d’un site internet en Belgique en 2026 : tarifs par type de site, par mois et par an, avec maintenance et coûts cachés.',
    h1: 'Combien coûte la création d’un site internet en Belgique (2026) ?',
    secs: [
      { t: 'table', id: 'fourchettes', h2: 'Prix par type de site en 2026', caption: 'Prix de Kempen Webstudio par type de site, HTVA', head: ['Type de site', 'Une fois', 'Par mois', 'En ligne en'], rows: [
        ['Site simple (Start)', 'à partir de €490', 'à partir de €29', '5 jours ouvrables'], ['Site professionnel (Vakman)', 'à partir de €990', 'à partir de €49', '10 jours ouvrables'], ['Boutique jusqu’à 50 produits (Webshop)', 'à partir de €1.890', 'à partir de €79', '3 à 4 semaines'],
        ['Landing page (une page)', 'à partir de €290', 'aucun', 'à convenir'], ['Page supplémentaire', 'à partir de €79 par page', 'aucun', 'à convenir'], ['Logo / identité visuelle', 'à partir de €190 / €490', 'aucun', 'à convenir']],
        before: '<p>Voici nos prix de départ par type de site. Le montant exact figure dans l’offre écrite que vous recevez après un court entretien.</p>',
        after: `<p>Chez Kempen Webstudio, un site coûte à partir de €490 et une boutique à partir de €1.890 une seule fois, plus un abonnement à partir de €29, €49 ou €79 par mois, HTVA.</p><p>Chez Kempen Webstudio, vous avez un seul interlocuteur, des formules fixes et des prix publics. Plus d’informations dans <a href="${P.zelf.fr}">faire créer ou créer soi-même</a>.</p>` },
      { t: 'cards', id: 'maintenance', h2: 'Combien coûte la maintenance d’un site ?', side: 'La maintenance garde votre site sûr et à jour. Chez nous, l’essentiel est compris dans l’abonnement mensuel.', items: [
        ['Dans l’abonnement mensuel', 'Votre domaine .be, l’hébergement, les sauvegardes, les mises à jour et des modifications : 15 minutes par mois avec Start, 30 minutes avec Vakman et Webshop, et deux contrôles par an de la vitesse et de la visibilité à partir de Vakman.'],
        ['Par an', 'Sur une année, cela fait à partir de €348 pour Start, €588 pour Vakman et €948 pour Webshop, HTVA.'],
        ['Un site que nous n’avons pas créé', 'Avec la maintenance seule, à partir de €29 par mois HTVA : mises à jour, sauvegarde hebdomadaire, contrôle mensuel et 15 minutes de modifications. Résiliable chaque mois.'],
        ['Modifications plus importantes', `Le travail au-delà des minutes de votre formule est facturé à notre tarif horaire à partir de €60 HTVA, toujours après votre accord. Voir aussi les <a href="${P.kosten.fr}">coûts récurrents d’un site internet</a>.`],
      ] },
      { t: 'cards', id: 'couts-caches', h2: 'Les coûts cachés à surveiller', side: 'Posez ces questions pour chaque offre. Vous voyez ainsi le vrai coût d’un site.', items: [
        ['Nom de domaine au nom du prestataire', 'Si votre domaine est au nom de votre prestataire, changer plus tard coûte du temps et de l’argent. Chez nous, il est toujours à votre nom.'],
        ['Licences et extensions', 'Certains sites dépendent de thèmes ou d’extensions payants avec une licence annuelle. Demandez s’ils sont compris.'],
        ['Textes et photos', 'Un prix bas suppose parfois que vous fournissez vous-même les textes. Chez nous, nous les rédigeons après un entretien.'],
        ['Contrats longs', 'Vérifiez la durée et le préavis. Nos formules durent au minimum 12 mois, ensuite elles sont résiliables chaque mois.'],
        ['Chaque modification payante', 'Sans modifications comprises, vous payez chaque petit changement. Chez nous, des minutes de modifications sont comprises dans l’abonnement.'],
        ['Langues et fonctions en plus', 'Une deuxième langue, des rendez-vous en ligne ou une boutique demandent du travail en plus. Nous indiquons ces coûts d’avance.'],
      ] },
    ],
    faq: [
      ['Combien coûte en moyenne un site internet en Belgique ?', 'Cela dépend de ce que le site doit faire. Chez Kempen Webstudio, un site coûte à partir de €490 et une boutique à partir de €1.890, une seule fois et HTVA.'],
      ['Combien coûte un site par an ?', 'Chez nous, après la création, vous payez l’abonnement de votre formule : sur une année à partir de €348 pour Start, €588 pour Vakman et €948 pour Webshop, HTVA.'],
      ['Quels sont les coûts cachés d’un site ?', 'Un domaine qui n’est pas à votre nom, des licences payantes, des textes à rédiger vous-même, des contrats longs et des modifications payées à la pièce.'],
      ['Peut-on créer un site internet gratuitement ?', `Faire créer un site par une agence n’est jamais gratuit. Les créateurs de sites proposent des formules gratuites, mais votre site se trouve alors en général sur une adresse de ce service et pas sur votre propre nom de domaine, souvent avec leur publicité. Pour une entreprise, un domaine .be à votre nom inspire plus confiance. Chez nous, un site commence dès €490 HTVA. Ce que coûte un site fait soi-même sur 5 ans, vous le lisez dans <a href="${P.zelf.fr}">créer son site soi-même ou le faire créer</a>.`],
      ['Quelle est la façon la moins chère de faire créer un site internet ?', 'Commencez simplement : un site clair avec vos services, votre zone d’intervention et vos coordonnées. Chez nous, c’est la formule Start, dès €490 en une fois et dès €29 par mois HTVA. Plus tard, vous pouvez ajouter des pages, une deuxième langue ou une boutique en ligne.'],
      ['Un site internet est-il déductible fiscalement ?', `Le plus souvent oui, comme frais professionnel ou par amortissement. Voir notre article <a href="${P.fiscaal.fr}">site internet déductible fiscalement</a>.`],
    ],
  },
  en: {
    title: 'What does a website cost in Belgium? 2026 prices', desc: 'What does a website cost in Belgium in 2026? Prices per type of site, per month and per year, with maintenance costs and hidden costs.',
    h1: 'What does it cost to have a website built in Belgium (2026)?',
    secs: [
      { t: 'table', id: 'price-ranges', h2: 'Prices per type of website in 2026', caption: 'Kempen Webstudio prices per type of website, excluding VAT', head: ['Type of website', 'One-off', 'Per month', 'Live within'], rows: [
        ['Simple website (Start)', 'from €490', 'from €29', '5 working days'], ['Professional website (Vakman)', 'from €990', 'from €49', '10 working days'], ['Online shop up to 50 products (Webshop)', 'from €1,890', 'from €79', '3 to 4 weeks'],
        ['Landing page (one page)', 'from €290', 'none', 'by agreement'], ['Extra page', 'from €79 per page', 'none', 'by agreement'], ['Logo / visual identity', 'from €190 / €490', 'none', 'by agreement']],
        before: '<p>These are our starting prices per type of site. The exact amount is in the written quote you receive after a short conversation.</p>',
        after: `<p>At Kempen Webstudio a website costs from €490 and an online shop from €1,890 one-off, plus a monthly fee from €29, €49 or €79, excl. VAT.</p><p>At Kempen Webstudio you have one point of contact, fixed packages and public prices. Read more in <a href="${P.zelf.en}">having a website built or building it yourself</a>.</p>` },
      { t: 'cards', id: 'maintenance-costs', h2: 'What does website maintenance cost?', side: 'Maintenance keeps your site secure and up to date. With us, most of it is included in the monthly fee.', items: [
        ['In the monthly fee', 'Your .be domain, hosting, backups, updates and changes: 15 minutes a month with Start, 30 minutes with Vakman and Webshop, plus a speed and findability check twice a year from Vakman.'],
        ['Per year', 'Over a year that is from €348 for Start, €588 for Vakman and €948 for Webshop, excl. VAT.'],
        ['A site we did not build', 'Maintenance only, from €29 per month excl. VAT: updates, a weekly backup, a monthly check and 15 minutes of changes. Cancel monthly.'],
        ['Larger changes', `Work beyond the minutes in your package is charged at our hourly rate from €60 excl. VAT, always after your approval. See also the <a href="${P.kosten.en}">recurring costs of a website</a>.`],
      ] },
      { t: 'cards', id: 'hidden-costs', h2: 'Hidden costs to watch out for', side: 'Ask about these points with every quote, so you see what a website really costs.', items: [
        ['Domain in the builder\'s name', 'If your domain is registered to your web builder, switching later costs time and money. With us, your domain is always in your own name.'],
        ['Licences and plugins', 'Some sites depend on paid themes or plugins with an annual licence. Ask whether they are included.'],
        ['Copy and photos', 'A low price sometimes assumes you supply the copy yourself. We write it after a conversation.'],
        ['Long contracts', 'Check the term and notice period. Our packages run for at least 12 months and can then be cancelled monthly.'],
        ['Paying for every change', 'Without included changes, you pay for every small edit. Our monthly fee includes minutes for changes.'],
        ['Extra languages and features', 'A second language, online booking or a shop take extra work. We state those costs up front.'],
      ] },
    ],
    faq: [
      ['What does a website cost in Belgium on average?', 'It depends on what the site needs to do. At Kempen Webstudio a website costs from €490 and an online shop from €1,890, one-off and excl. VAT.'],
      ['What does a website cost per year?', 'With us you pay your package\'s monthly fee after the build: from €348 a year for Start, €588 for Vakman and €948 for Webshop, excl. VAT.'],
      ['What hidden costs does a website have?', 'A domain not in your name, paid licences, copy you have to write yourself, long contracts and changes billed one by one.'],
    ],
  },
};

const pages = [];
for (const lang of ['nl', 'fr', 'en']) {
  const g = G[lang];
  pages.push({ path: P.prijs[lang], lang, aanvul: true, title: g.title, desc: g.desc, h1: g.h1, insert: [{ after: 'section#losse-diensten', sections: g.secs }], faqExtra: g.faq });
  pages.push({ path: P.demos[lang], lang, aanvul: true,
    title: { nl: 'Voorbeeldprojecten: 9 voorbeeldontwerpen van websites', fr: 'Exemples de projets : 9 designs de sites internet', en: 'Sample projects: 9 website designs' }[lang],
    desc: { nl: 'Bekijk 9 voorbeeldontwerpen van Kempen Webstudio voor horeca, vakmensen, salons en een webshop, elk met doelgroep, keuzes, functies en schermafbeeldingen.', fr: '9 exemples de design de Kempen Webstudio pour l’horeca, les artisans, les salons et une boutique, avec public, choix, fonctions et captures.', en: 'See 9 sample designs by Kempen Webstudio for hospitality, tradespeople, salons and an online shop, each with audience, choices, features and screenshots.' }[lang],
    insert: [{ after: 5, sections: [detail(lang)] }] });
}
export default pages;
