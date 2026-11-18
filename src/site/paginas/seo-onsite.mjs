// On-site SEO-audit 16-11-2026 (SEO-ONSITE-AUDIT.md): inhoudsdiepte waar de audit dunne pagina's of zwakke zoekwoorddekking vond.
// Alleen feiten die elders op de site staan (prijzen, termijnen, werkwijze) of algemeen bekend zijn; geen cijfers, klanten of reviews.
//  - Kempense stadspagina's (Kempen, Turnhout, Geel, Herentals, Mol, Kasterlee): prijsblok + "lokaal gevonden worden" + 2 vragen
//  - Belgiëpagina: waar u op let bij het kiezen van een webdesigner
//  - Webshop: professionele webshop, waar u op let (prijs/kosten-zoekwoorden) + vragen
//  - SEO laten doen: SEO-bureau voor Antwerpen, Gent en heel België + vraag
import { P } from './_gemeen.mjs';

const PRIJS_TERM = `Na een kort gesprek krijgt u een schriftelijke offerte. Alle prijzen, ook voor onderhoud en extra's, staan in onze <a href="${P.prijs.nl}">prijsgids voor 2026</a>.`;

const KEMPEN = [
  {
    s: 'kempen', stad: 'de Kempen', path: '/website-laten-maken-kempen/', before: 'main section#werkwijze',
    side: 'Of uw zaak nu in Turnhout, Geel of een kleiner dorp ligt: de prijzen zijn overal dezelfde.',
    h2: 'Gevonden worden in de Kempen, ook buiten uw eigen gemeente',
    html: `<p>Een Kempense zaak werkt zelden alleen voor de eigen gemeente. Een schilder uit Kasterlee rijdt naar Herentals en Turnhout, een kapsalon in Geel krijgt klanten uit Westerlo en Laakdal. Wie zoekt, typt vaak "in de buurt" of de naam van het eigen dorp. Daarom staat op uw website in welke gemeenten u werkt en wat u daar doet.</p><p>Ook uw Google Bedrijfsprofiel telt mee. Naam, adres en telefoon moeten er letterlijk hetzelfde staan als op uw website. Hoe u dat profiel aanmaakt, leest u in <a href="${P.gbp.nl}">Google Bedrijfsprofiel aanmaken</a>. Met het pakket Vakman vullen wij het volledig voor u in. Om daarna beter gevonden te worden in de streek, kan <a href="${P.seo.nl}">lokale SEO</a> helpen.</p>`,
    faq: [
      ['Wat kost een website laten maken in de Kempen?', 'U betaalt dezelfde prijzen als overal in België, met Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, plus een maandprijs vanaf €29, €49 of €79. U krijgt vooraf een vrijblijvende offerte.'],
      ['Maakt Kempen Webstudio ook websites voor verenigingen in de Kempen?', `Ja. Ook een vereniging of vzw krijgt een eigen ontwerp, met uw werking, activiteiten en contact op één duidelijke site. Meer leest u bij <a href="${P.vereniging.nl}">website voor een vereniging</a>.`],
    ],
  },
  {
    s: 'turnhout', stad: 'Turnhout', path: '/website-laten-maken-turnhout/', before: 'main section#werkwijze',
    side: 'In Turnhout betaalt u dezelfde prijzen als overal in België, vooraf gekend.',
    h2: 'Gevonden worden in Turnhout en de buurgemeenten',
    html: `<p>Turnhout is het centrum van het arrondissement, en veel klanten komen uit Oud-Turnhout, Beerse, Vosselaar of Kasterlee. Zoekt iemand een kapper, een loodgieter of een restaurant, dan staat de stad of de wijk vaak in de zoekopdracht. Daarom vermelden wij op uw website duidelijk waar u zit, waar u werkt en hoe klanten u bereiken, met parking of bushalte erbij als dat helpt.</p><p>Naam, adres, telefoon en openingsuren zijn op uw site en in uw Google Bedrijfsprofiel dezelfde, zodat Google weet dat het om één zaak gaat. Meer over het profiel leest u in <a href="${P.gbp.nl}">Google Bedrijfsprofiel aanmaken</a>; ook <a href="${P.seo.nl}">lokale SEO</a> is mogelijk.</p>`,
    faq: [
      ['Wat kost een website laten maken in Turnhout?', 'Start kost vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, met een maandprijs vanaf €29, €49 of €79. U kent de prijs voor u beslist.'],
      ['Wanneer staat mijn website in Turnhout online?', 'Start staat binnen 5 werkdagen online, Vakman binnen 10 werkdagen en een webshop in 3 tot 4 weken, vanaf uw goedkeuring en zodra wij alles hebben wat nodig is.'],
    ],
  },
  {
    s: 'geel', stad: 'Geel', path: '/website-laten-maken-geel/', before: 'main section#werkwijze',
    side: 'In Geel, in het centrum of in een gehucht, betaalt u dezelfde prijzen als overal.',
    h2: 'Gevonden worden in Geel, van het centrum tot de gehuchten',
    html: `<p>Omdat Geel zo uitgestrekt is, zoeken klanten vaak met de naam van hun gehucht of met "in de buurt". Een website die alleen "Geel" vermeldt, mist die zoekopdrachten. Daarom noemen wij op uw site de delen van Geel en de buurgemeenten waar u werkt. Een aparte, lege pagina per gehucht is daarvoor niet nodig.</p><p>Werkt u vooral voor andere bedrijven, dan krijgt uw site een duidelijke pagina per dienst, met wat u levert en aan wie, zodat een inkoper meteen ziet of u past. Uw gegevens zijn dezelfde als in uw Google Bedrijfsprofiel; hoe dat werkt, leest u in <a href="${P.gbp.nl}">Google Bedrijfsprofiel aanmaken</a>.</p>`,
    faq: [
      ['Wat kost een website laten maken in Geel?', 'Start kost vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, met een maandprijs vanaf €29, €49 of €79. U krijgt eerst een vrijblijvende offerte.'],
      ['Kan mijn website ook vacatures tonen?', 'Ja. Een pagina met vacatures is een gewone pagina op uw site. Wij bespreken in de offerte hoeveel pagina\'s u nodig hebt en wat dat kost.'],
    ],
  },
  {
    s: 'herentals', stad: 'Herentals', path: '/website-laten-maken-herentals/', before: 'main section#werkwijze',
    side: 'In Herentals, Noorderwijk of Morkhoven: overal dezelfde prijzen, vooraf gekend.',
    h2: 'Gevonden worden in Herentals, Noorderwijk en Morkhoven',
    html: `<p>Klanten zoeken een zaak in hun eigen dorp, dus wie in Noorderwijk of Morkhoven werkt, zet dat ook op de website. Op uw site staat waar u zit en in welke gemeenten rond Herentals u werkt, bijvoorbeeld Grobbendonk, Olen of Lille, als dat klopt voor uw zaak.</p><p>Een winkel of horecazaak in het centrum zet de openingsuren, de ligging en de parking vooraan, goed leesbaar op een gsm. Naam, adres en telefoon zijn dezelfde als in uw Google Bedrijfsprofiel. Lees ook <a href="${P.gbp.nl}">Google Bedrijfsprofiel aanmaken</a> of bekijk wat <a href="${P.seo.nl}">lokale SEO</a> inhoudt.</p>`,
    faq: [
      ['Wat kost een website laten maken in Herentals?', 'Start kost vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, met een maandprijs vanaf €29, €49 of €79. U kent de prijs voor u beslist.'],
      ['Kunnen klanten online bestellen bij mijn winkel?', `Ja, met het pakket Webshop verkoopt u tot 50 producten online, met veilig betalen. Meer leest u bij <a href="${P.webshop.nl}">webshop laten maken</a>.`],
    ],
  },
  {
    s: 'mol', stad: 'Mol', path: '/website-laten-maken-mol/', before: 'main section#werkwijze',
    side: 'In Mol en in de gehuchten betaalt u dezelfde prijzen als overal in België.',
    h2: 'Gevonden worden in Mol, door inwoners en bezoekers',
    html: `<p>In Mol zoeken twee soorten klanten: inwoners die een zaak in hun eigen gehucht willen, en bezoekers die de gemeente niet kennen. Voor de eersten noemen wij de delen van Mol en de buurgemeenten waar u werkt. Voor de tweeden staan de ligging, de route en uw openingsuren vooraan, ook in het seizoen.</p><p>Staan naam, adres en telefoon op uw website en in uw Google Bedrijfsprofiel hetzelfde, dan vindt men u ook op Google Maps beter. Hoe u dat profiel opzet, leest u in <a href="${P.gbp.nl}">Google Bedrijfsprofiel aanmaken</a>. Voor meer zichtbaarheid kan <a href="${P.seo.nl}">lokale SEO</a> helpen.</p>`,
    faq: [
      ['Hoe lang duurt het om een website te laten maken in Mol?', 'Start staat binnen 5 werkdagen online, Vakman binnen 10 werkdagen en een webshop in 3 tot 4 weken, vanaf uw goedkeuring en zodra wij alles hebben wat nodig is.'],
      ['Kan ik mijn seizoensuren zelf laten aanpassen?', 'U stuurt ze gewoon door, en wij passen ze aan. In uw maandprijs zitten elke maand minuten voor zulke wijzigingen.'],
    ],
  },
  {
    s: 'kasterlee', stad: 'Kasterlee', path: '/website-laten-maken-kasterlee/', before: 'main section#werkwijze',
    side: 'Ook in onze eigen gemeente betaalt u dezelfde prijzen als overal in België.',
    h2: 'Gevonden worden in Kasterlee, Lichtaart en Tielen',
    html: `<p>Klanten zijn hier zowel inwoners als dagjesmensen en vakantiegangers. Inwoners zoeken een zaak in hun eigen deelgemeente; bezoekers zoeken vanaf het fietspad of de camping wat er open is. Uw website zegt daarom of u in Kasterlee, Lichtaart of Tielen zit, met uw uren en de route bovenaan.</p><p>Uw gegevens zijn dezelfde op uw website en in uw Google Bedrijfsprofiel. Lees hoe dat werkt in <a href="${P.gbp.nl}">Google Bedrijfsprofiel aanmaken</a>, of bekijk wat <a href="${P.seo.nl}">lokale SEO</a> voor uw zaak kan doen.</p>`,
    faq: [
      ['Wat kost een website laten maken in Kasterlee?', 'Start kost vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, met een maandprijs vanaf €29, €49 of €79. U krijgt eerst een vrijblijvende offerte.'],
      ['Kan mijn website in meer dan één taal?', 'Ja. Een tweede taal vraagt extra werk; wat dat kost, staat vooraf in uw offerte.'],
    ],
  },
];

const pages = KEMPEN.map(k => ({
  path: k.path, lang: 'nl', aanvul: true,
  insert: [{ before: k.before, sections: [
    { t: 'pricing', id: 'prijs-lokaal-' + k.s, h2: `Wat kost een website laten maken in ${k.stad}?`, side: k.side, term: k.s === 'mol' ? PRIJS_TERM.replace('Na een kort gesprek krijgt u een schriftelijke offerte. ', '') : PRIJS_TERM },
    { t: 'prose', id: 'lokaal-' + k.s, h2: k.h2, html: k.html },
  ] }],
  faqExtra: k.faq,
}));

// ------------------------------------------------------------------ België (hub)
pages.push({
  path: '/website-laten-maken-belgie/', lang: 'nl', voorFaq: [{ t: 'cards', id: 'kiezen', h2: 'Waar u op let bij het kiezen van een webdesigner', side: 'Leg de prijs naast wat erin zit. Bij Kempen Webstudio staan al deze punten in de offerte.', items: [
    ['De prijs vooraf, op papier', 'Vraag een schriftelijke offerte met het eenmalige bedrag en de maandprijs. Bij Kempen Webstudio krijgt u na een kennismaking een vrijblijvende offerte.'],
    ['Uw domeinnaam op uw eigen naam', 'Staat uw domein op naam van de webbouwer, dan kost overstappen later tijd en geld. Bij Kempen Webstudio staat uw domeinnaam altijd op uw eigen naam.'],
    ['Wat er in het onderhoud zit', 'Hosting, back-ups, updates en een aantal minuten aanpassingen per maand. Zo betaalt u niet voor elke kleine wijziging apart.'],
    ['Een vlotte, toegankelijke site', 'Een site die vlot laadt op een gsm en die iedereen kan gebruiken, ook mensen met een beperking. Wij bouwen volgens WCAG 2.2 AA.'],
    ['Eén vast aanspreekpunt', 'U wilt weten bij wie u terechtkan als er iets moet veranderen. Bij Kempen Webstudio is dat telkens dezelfde persoon, die uw zaak kent.'],
    ['De looptijd van het contract', 'Kijk hoe lang u vastzit. Onze pakketten lopen minimaal 12 maanden en zijn daarna maandelijks opzegbaar.'],
  ], after: `Meer over prijzen en verborgen kosten leest u in <a href="${P.prijs.nl}">wat kost een website laten maken</a>; wat zelf bouwen kost, in <a href="${P.zelf.nl}">website laten maken of zelf bouwen</a>.` }],
});

// ------------------------------------------------------------------ Webshop
pages.push({
  path: '/webshop-laten-maken/', lang: 'nl', aanvul: true,
  insert: [{ after: 'main section[aria-labelledby="na-de-lancering-t"]', sections: [{ t: 'cards', id: 'professionele-webshop', h2: 'Waar u op let bij een professionele webshop', side: 'Dit hoort bij een webshop, en het zit in ons pakket Webshop.', items: [
    ['Veilig betalen', 'Klanten betalen online met bankkaart of kredietkaart, via een betaaldienst die zij kennen.'],
    ['Btw en verzending juist ingesteld', 'Prijzen met btw en verzendkosten staan correct ingesteld voor u de webshop online zet.'],
    ['Wettelijke pagina\'s', 'Een webshop in België heeft onder meer algemene voorwaarden, informatie over het herroepingsrecht en een privacyverklaring nodig. Lees ook <a href="' + P.wettelijk.nl + '">wat er wettelijk op een website moet staan</a>.'],
    ['Vlot op een gsm', 'De meeste klanten kijken op hun gsm. Een webshop die vlot laadt en eenvoudig afrekent, verkoopt beter.'],
    ['Producten aanpassen', 'U stuurt een nieuw product, een prijs of een foto door, en wij zetten het online. Daarvoor zitten 30 minuten aanpassingen per maand in uw maandprijs.'],
    ['Een duidelijke prijs per jaar', 'Webshop kost vanaf €1.890 eenmalig en vanaf €79 per maand excl. btw, dus vanaf €948 per jaar.'],
  ], after: `Alle prijzen naast elkaar vindt u in <a href="${P.prijs.nl}">wat kost een website laten maken</a>.` }] }],
  faqExtra: [
    ['Wat kost een webshop per jaar?', 'Na de bouw betaalt u de maandprijs van het pakket Webshop, vanaf €79 per maand excl. btw. Op jaarbasis is dat vanaf €948 excl. btw, met hosting, back-ups, updates en 30 minuten aanpassingen per maand.'],
    ['Wat kost een webshop laten maken?', 'Bij Kempen Webstudio begint een webshop tot 50 producten vanaf €1.890 eenmalig en vanaf €79 per maand, excl. btw.'],
  ],
});

// ------------------------------------------------------------------ SEO laten doen
pages.push({
  path: '/seo-laten-doen/', lang: 'nl', voorFaq: [{ t: 'prose', id: 'seo-regio', h2: 'Een SEO-bureau voor Antwerpen, Gent en heel België', html: `<p>Wij werken voor zaken in heel België, van Antwerpen en Gent tot Leuven, Hasselt en de Kempen. Lokale SEO werkt overal op dezelfde manier: een volledig Google Bedrijfsprofiel, dezelfde naam, hetzelfde adres en telefoonnummer op elke plek waar uw zaak vermeld staat, en pagina's die in gewone taal zeggen wat u doet en waar. Overleg verloopt online, per e-mail of telefoon, dus het maakt niet uit waar uw zaak ligt.</p><p>Voor zaken in Antwerpen leest u op onze <a href="/website-laten-maken-antwerpen/">pagina over Antwerpen</a> hoe wij omgaan met districten en randgemeenten. Bouwen wij ook uw website, dan zit de basis-SEO er al in; lees meer over <a href="/">een website laten maken</a> of over <a href="${P.gbp.nl}">uw Google Bedrijfsprofiel</a>.</p>` }],
  faqExtra: [
    ['Werkt Kempen Webstudio als SEO-bureau ook voor zaken in Antwerpen of Gent?', 'Ja. Wij werken voor zaken in heel België. Overleg verloopt online, per e-mail of telefoon, en de prijzen zijn overal dezelfde: een SEO-audit vanaf €190, lokale SEO vanaf €149 per maand en optimalisatie van een bestaande pagina vanaf €59.'],
  ],
});

// ------------------------------------------------------------------ EN: hub en SEO (dunne pagina's)
pages.push({
  path: P.hub.en, lang: 'en', voorFaq: [{ t: 'cards', id: 'choosing', h2: 'What to check when choosing a web designer', side: 'Set the price against what is included. At Kempen Webstudio all of these points are in the quote.', items: [
    ['The price up front, in writing', 'Ask for a written quote with the one-off amount and the monthly fee. At Kempen Webstudio you first get a no-obligation quote, after an introductory conversation.'],
    ['Your domain in your own name', 'If your domain is registered to your web builder, switching later costs time and money. With us, your domain is always in your own name.'],
    ['What maintenance includes', 'Hosting, backups, updates and a number of minutes for changes each month, so you do not pay for every small edit separately.'],
    ['A fast, accessible site', 'A site that loads quickly on a phone and that everyone can use, including people with a disability. We build to WCAG 2.2 AA.'],
    ['A single point of contact', 'You want to know who to turn to when something needs to change. With us, it is always the same person, who knows your business.'],
    ['The contract term', 'Check how long you are tied in. Our packages run for at least 12 months and can then be cancelled monthly.'],
  ], after: `Read more about prices and hidden costs in <a href="${P.prijs.en}">what a website costs</a>, and about doing it yourself in <a href="${P.zelf.en}">have a website built or DIY</a>.` }],
});
pages.push({
  path: P.seo.en, lang: 'en', voorFaq: [{ t: 'prose', id: 'seo-region', h2: 'SEO for businesses in Brussels, Antwerp, Ghent and across Belgium', html: `<p>We work for businesses across Belgium. Local SEO works the same way everywhere: a complete Google Business Profile, the same name, address and phone number wherever your business is listed, and pages that say in plain language what you do and where. Meetings take place online, by email or by phone, so it does not matter where your business is located.</p><p>If we also build your website, the basic SEO is already included. Read more about <a href="/en/">having a website built</a>, about <a href="${P.gbp.en}">creating a Google Business Profile</a> or about <a href="${P.prijs.en}">what a website costs</a>.</p>` }],
  faqExtra: [
    ['Do you also do SEO for businesses in Brussels or Antwerp?', 'Yes. We work for businesses across Belgium. Meetings take place online, by email or by phone, and the prices are the same everywhere: an SEO audit from €190, local SEO from €149 a month and optimising an existing page from €59, excl. VAT.'],
  ],
});

export default pages;
