// Nieuwe stadspagina's (SEO-ronde 15-11-2026). Elke pagina heeft eigen lokale inhoud: economie, wijken en gemeenten,
// typische sectoren, bereikbaarheid en eigen vragen. Alleen algemeen bekende, controleerbare feiten; geen cijfers of klanten.
import { P, TRUST, ASK, CTA, DELIVERY, HOME_LABEL, HUB_LABEL, cta, demo } from './_gemeen.mjs';

const T = {
  nl: {
    intro: ['Zo weet u wat uw website wordt, nog voor u iets beslist.', 'U zit nergens aan vast.'],
    voorstel: 'Een vrijblijvend voorstel toont wat uw website bevat en wat ze kost. U kent de inhoud, de opbouw en de prijs nog voor u iets beslist.',
    samen: s => ({ t: 'prose', h2: 'Zo werken wij samen, ook op afstand', id: 'samen-' + s, html: `<p>Kempen Webstudio zit in Kasterlee, in de Kempen. Kennismaking en overleg verlopen online, per e-mail of telefoon. U hoeft dus niet langs te komen, en u hebt toch één vast aanspreekpunt dat uw zaak en uw website kent. Teksten, foto's en wijzigingen stuurt u gewoon door; wij zetten ze voor u online.</p><p>Wilt u weten hoe wij werken en waarom? Lees meer <a href="${P.over.nl}">over Kempen Webstudio</a> of neem <a href="${P.contact.nl}">contact</a> op.</p>` }),
    prijs: (stad, s) => ({ t: 'pricing', id: 'prijs-' + s, h2: `Wat kost een website laten maken in ${stad}?`, side: `U betaalt in ${stad} dezelfde prijzen als overal in België.`, term: `Na een kort gesprek krijgt u een schriftelijke offerte. U beslist pas als u de prijs kent. Alle prijzen, ook voor onderhoud en extra's, staan in onze prijsgids <a href="${P.prijs.nl}">wat kost een website laten maken in 2026</a>.` }),
    online: s => ({ t: 'prose', id: 'online-' + s, h2: 'Wanneer staat uw website online?', html: `<p>${DELIVERY.nl} Daarna stuurt u wijzigingen gewoon door, en wij passen ze aan.</p>` }),
    voorbeeld: (s, txt) => ({ t: 'prose', id: 'voorbeelden-' + s, spd: true, h2: 'Voorbeelden van ons werk', html: `<p>Bekijk onze <a href="${P.demos.nl}">voorbeeldontwerpen</a>. Dit zijn ontwerpen met fictieve namen en gegevens, zodat u ziet hoe een site voor uw sector eruit kan zien. ${txt} Uw eigen website ontwerpen wij volledig op maat van uw zaak.</p>` }),
    ctaH: stad => `Een website voor uw zaak in ${stad}?`, also: 'Ook actief in',
  },
  fr: {
    intro: ['Vous savez ce que sera votre site avant de décider quoi que ce soit.', 'Sans aucun engagement.'],
    voorstel: 'Une proposition sans engagement montre ce que contient votre site et ce qu’il coûte. Vous connaissez le contenu, la structure et le prix avant de décider.',
    samen: s => ({ t: 'prose', h2: 'Travailler ensemble, même à distance', id: 'ensemble-' + s, html: `<p>Kempen Webstudio est établi à Kasterlee, en Campine anversoise. La prise de contact et le suivi se font en ligne, par e-mail ou par téléphone. Vous n’avez donc pas besoin de vous déplacer, et vous gardez un seul interlocuteur qui connaît votre entreprise et votre site. Vous envoyez vos textes, vos photos et vos modifications, et nous les mettons en ligne pour vous.</p><p>Envie de savoir comment nous travaillons ? Découvrez <a href="${P.over.fr}">qui nous sommes</a> ou <a href="${P.contact.fr}">contactez-nous</a>.</p>` }),
    prijs: (ville, s) => ({ t: 'pricing', id: 'prix-' + s, h2: `Quel est le prix d’un site internet à ${ville} ?`, side: `À ${ville}, vous payez les mêmes prix que partout en Belgique.`, term: `Après un court entretien, vous recevez une offre écrite. Vous décidez seulement quand vous connaissez le prix. Tous les prix, aussi pour la maintenance et les options, figurent dans notre guide <a href="${P.prijs.fr}">prix d’un site internet en Belgique en 2026</a>.` }),
    online: s => ({ t: 'prose', id: 'en-ligne-' + s, h2: 'Quand votre site est-il en ligne ?', html: `<p>${DELIVERY.fr} Ensuite, vous nous envoyez simplement vos modifications et nous les appliquons.</p>` }),
    voorbeeld: (s, txt) => ({ t: 'prose', id: 'exemples-' + s, spd: true, h2: 'Exemples de notre travail', html: `<p>Découvrez nos <a href="${P.demos.fr}">exemples de sites</a>. Ce sont des designs avec des noms et des données fictifs, pour que vous voyiez à quoi peut ressembler un site pour votre secteur. ${txt} Votre propre site, nous le concevons entièrement sur mesure.</p>` }),
    ctaH: ville => `Un site internet pour votre entreprise à ${ville} ?`, also: 'Également actif à',
  },
};

function stad(lang, o) {
  const t = T[lang];
  return {
    path: o.path, lang, alt: o.alt || null, title: o.title, desc: o.desc, h1: o.h1, crumbCur: o.crumb,
    crumbs: [[P.home[lang], HOME_LABEL[lang]], [P.hub[lang], HUB_LABEL[lang]]],
    slogan: o.slogan, ctas: [[CTA[lang], ASK[lang]], [P.demos[lang], lang === 'fr' ? 'Voir les exemples de sites' : 'Bekijk de voorbeeldontwerpen']], trust: TRUST[lang],
    service: { name: o.h1, type: lang === 'fr' ? 'Création de site internet' : 'Website laten maken', area: { '@type': 'City', name: o.city } },
    sections: [
      { t: 'band', id: 'keuze-' + o.s, intro: t.intro, h2: o.bandH2, lead: [o.bandLead, t.voorstel] },
      { t: 'cards', id: 'wijken-' + o.s, h2: o.wijkenH2, items: o.wijken },
      { t: 'prose', id: 'ondernemen-' + o.s, h2: o.ondH2, html: o.ond },
      { t: 'cards', id: 'sectoren-' + o.s, h2: o.secH2, items: o.sectoren },
      t.samen(o.s), t.prijs(o.city, o.s), t.online(o.s), t.voorbeeld(o.s, o.vb),
      { t: 'faq', id: 'faq-' + o.s, h2: o.faqH2, items: o.faq },
      { ...cta(lang, t.ctaH(o.city), [t.also, o.also]), id: 'cta-' + o.s },
    ],
  };
}

const nl = (k) => P[k].nl, fr = (k) => P[k].fr;

export default [
  // ------------------------------------------------------------------ ANTWERPEN
  stad('nl', {
    s: 'antwerpen', city: 'Antwerpen', path: '/website-laten-maken-antwerpen/', crumb: 'Antwerpen',
    title: 'Website laten maken in Antwerpen | Webdesign vanaf €490',
    desc: 'Website laten maken in Antwerpen: webdesign op maat voor uw zaak in de stad of een district, met eerst een vrijblijvend voorstel. Vanaf €490 excl. btw.',
    h1: 'Website laten maken in Antwerpen',
    slogan: 'Wij maken eerst een vrijblijvend voorstel voor uw zaak in Antwerpen, afgestemd op uw klanten en uw district.',
    bandH2: 'Webdesign in Antwerpen, op maat van uw zaak',
    bandLead: `In Antwerpen wil elke zaak op haar eigen manier gevonden worden: de bakker op de hoek, de schilder die in heel de provincie werkt, het advocatenkantoor op het Zuid. Wij bouwen voor elk van hen een snelle, toegankelijke website met een eigen ontwerp, geen sjabloon. Kempen Webstudio werkt vanuit Kasterlee, in dezelfde provincie, en maakt <a href="/">websites voor zaken in heel België</a>.`,
    wijkenH2: 'Websites voor zaken in de stad, de districten en de rand',
    wijken: [
      ['In de binnenstad en op het Zuid', `Rond de Meir, de Groenplaats, het Eilandje en het Zuid zoeken voorbijgangers en bezoekers op hun gsm naar openingsuren, een menu of de dichtstbijzijnde winkel. Dat moet in een paar seconden duidelijk zijn. Meer daarover bij <a href="${nl('horeca')}">websites voor horeca</a> en <a href="${nl('winkel')}">websites voor winkels</a>.`],
      ['In de districten', `Werkt u vanuit Berchem, Borgerhout, Deurne, Merksem, Ekeren, Hoboken, Wilrijk of Berendrecht-Zandvliet-Lillo, dan zoeken klanten vaak op hun district. Wij vermelden in gewone zinnen waar u werkt, en uw adres en werkgebied komen overeen met uw Google Bedrijfsprofiel. Zie ook <a href="${nl('vakmensen')}">websites voor vakmensen</a>.`],
      ['In de randgemeenten', `Veel ondernemers werken voor klanten in Antwerpen maar zitten in Schoten, Brasschaat, Kapellen, Edegem, Mortsel, Kontich of Zwijndrecht. Op uw site staat dan duidelijk welke gemeenten u bedient, in gewone tekst en zonder voor elke gemeente een aparte, lege pagina.`],
    ],
    ondH2: 'Ondernemen in Antwerpen: wie uw klanten zijn',
    ond: `<p>Antwerpen is de grootste stad van Vlaanderen en heeft een van de grootste havens van Europa. Rond de haven, de chemie en de logistiek werken veel bedrijven vooral voor andere bedrijven. Tegelijk is Antwerpen een winkel- en uitgaansstad, met de Meir als bekendste winkelstraat, het Zuid en het Eilandje voor horeca en een sterke mode- en designscene. In de diamantwijk naast het Centraal Station draait een internationale handel. Een website voor een dienstverlener in de havenzone vraagt dus een andere aanpak dan een site voor een koffiebar in Borgerhout.</p><p>Antwerpenaren zoeken vaak met hun district of buurt erbij, of kijken op de kaart wat het dichtst bij ligt. Wij zetten uw adres, werkgebied en openingsuren in gewone tekst op uw site, met dezelfde gegevens als in uw Google Bedrijfsprofiel. Antwerpen heeft een lage-emissiezone; komen klanten met de wagen, dan zetten wij bereikbaarheid met tram, fiets en parkings duidelijk op de contactpagina.</p>`,
    secH2: 'Sectoren waarvoor wij in Antwerpen websites maken',
    sectoren: [
      ['Horeca en winkels', `Kaart, openingsuren, terras en reserveren, of uw aanbod en de weg naar uw winkel. Zie <a href="${nl('horeca')}">horeca</a> en <a href="${nl('winkel')}">winkels</a>.`],
      ['Vrije beroepen en dienstverleners', `Advocaten, boekhouders, architecten en consultants hebben een rustige, betrouwbare site nodig met duidelijke contactgegevens. Zie <a href="${nl('vrij')}">vrije beroepen</a>.`],
      ['Vakmensen in de stad en de rand', `Schilders, dakwerkers en installateurs met een duidelijk werkgebied en een offerteformulier. Zie <a href="${nl('vakmensen')}">vakmensen</a> en <a href="${nl('schilder')}">schilders</a>.`],
    ],
    vb: `Voor Antwerpse zaken zijn bijvoorbeeld <a href="${demo('nl', 'bistro-tilvaar')}">Bistro Tilvaar</a> (horeca met online reserveren) en <a href="${demo('nl', 'vennebrand')}">Vennebrand</a> (een kleine webshop) een goed vertrekpunt.`,
    faqH2: 'Veelgestelde vragen over een website in Antwerpen',
    faq: [
      ['Maken jullie ook websites voor zaken in de Antwerpse districten?', 'Ja. Wij maken websites voor zaken in heel Antwerpen, van de binnenstad tot Berchem, Deurne, Merksem, Wilrijk of Hoboken, en ook in de randgemeenten. Op uw site vermelden wij in gewone zinnen waar u werkt.'],
      ['Moet ik naar Kasterlee komen?', 'Nee. Kennismaking en overleg verlopen online, per e-mail of telefoon. U hebt wel één vast aanspreekpunt dat uw zaak kent.'],
      ['Wat kost een website laten maken in Antwerpen?', 'Dezelfde prijzen als overal: Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, plus een maandprijs vanaf €29, €49 of €79. U krijgt vooraf een vrijblijvend voorstel.'],
      ['Hoe vinden klanten in Antwerpen mijn zaak?', 'Mensen zoeken vaak op een dienst met hun district of buurt erbij. Daarom staan uw diensten, uw werkgebied en uw openingsuren in gewone tekst op uw site, gelijk aan uw Google Bedrijfsprofiel. Met het pakket Vakman vullen wij dat profiel ook volledig in.'],
      ['Kunnen jullie ook een webshop maken voor mijn winkel?', `Ja. Met het pakket Webshop verkoopt u tot 50 producten online, met veilig betalen met bankkaart of kredietkaart. Meer leest u bij <a href="${nl('webshop')}">webshop laten maken</a>.`],
    ],
    also: [['/website-laten-maken-mechelen/', 'Mechelen'], ['/website-laten-maken-brussel/', 'Brussel'], ['/website-laten-maken-gent/', 'Gent'], ['/website-laten-maken-kempen/', 'de Kempen'], [nl('hub'), 'heel België']],
  }),

  // ------------------------------------------------------------------ BRUSSEL
  stad('nl', {
    s: 'brussel', city: 'Brussel', path: '/website-laten-maken-brussel/', crumb: 'Brussel',
    alt: { nl: '/website-laten-maken-brussel/', fr: '/fr/creation-site-internet-bruxelles/', en: '/en/web-design-brussels/' },
    title: 'Website laten maken in Brussel | Webdesign vanaf €490',
    desc: 'Website laten maken in Brussel: webdesign op maat voor uw zaak in een van de 19 gemeenten, in het Nederlands, Frans of Engels. Vanaf €490 excl. btw.',
    h1: 'Website laten maken in Brussel',
    slogan: 'Wij maken eerst een vrijblijvend voorstel voor uw zaak in Brussel, afgestemd op uw klanten en de talen die zij spreken.',
    bandH2: 'Webdesign in Brussel, voor een stad met veel talen',
    bandLead: `Brussel is tweetalig, en veel klanten spreken bovendien Engels. Een Brusselse zaak heeft dus vaak een website in meer dan één taal nodig, met dezelfde kwaliteit in elke taal. Wij bouwen snelle, toegankelijke websites met een eigen ontwerp. Kempen Webstudio werkt vanuit Kasterlee en maakt <a href="/">websites voor zaken in heel België</a>.`,
    wijkenH2: 'Websites voor zaken in de 19 Brusselse gemeenten',
    wijken: [
      ['In het centrum en de Europese wijk', `Rond de Grote Markt, de Dansaertwijk, de Zavel en de Europese wijk werken horeca, winkels en dienstverleners voor bewoners, pendelaars en internationale bezoekers. Openingsuren, ligging en talen moeten in een paar seconden duidelijk zijn. Zie ook <a href="${nl('horeca')}">websites voor horeca</a>.`],
      ['In de woonwijken', `In Elsene, Sint-Gillis, Schaarbeek, Etterbeek, Ukkel, Jette, Anderlecht of de Woluwes zoeken klanten een zaak in hun eigen buurt. Wij vermelden in gewone zinnen in welke gemeenten u werkt, en uw gegevens komen overeen met uw Google Bedrijfsprofiel.`],
      ['Voor de Vlaamse Rand', `Zit u in Zaventem, Vilvoorde, Dilbeek, Grimbergen of een andere gemeente rond Brussel en werkt u in de stad, dan staat op uw site duidelijk welke gemeenten u bedient. Zie ook <a href="${nl('vakmensen')}">websites voor vakmensen</a>.`],
    ],
    ondH2: 'Ondernemen in Brussel: wie uw klanten zijn',
    ond: `<p>Brussel is de hoofdstad van België en de zetel van de belangrijkste Europese instellingen; de NAVO heeft haar hoofdkwartier in Evere. Daardoor wonen en werken er veel mensen uit het buitenland, naast Franstalige en Nederlandstalige Brusselaars. Het Brussels Hoofdstedelijk Gewest telt 19 gemeenten, elk met een eigen karakter: van de winkelstraten in het centrum en rond de Louizalaan tot de rustige woonwijken in Ukkel en de Woluwes.</p><p>Voor uw website betekent dat: denk na over de taal van uw klanten. Een kapsalon in Schaarbeek heeft misschien een Franstalige site met een Nederlandse versie nodig, een consultant in de Europese wijk eerder een Engelstalige. Wij bespreken vooraf welke talen nodig zijn en wat dat voor de prijs betekent. Brussel heeft een lage-emissiezone en veel autoluwe straten; daarom zetten wij bereikbaarheid met metro, tram en fiets duidelijk op uw contactpagina. Voor ondersteuning bij het ondernemen in het gewest kunt u terecht bij hub.brussels.</p>`,
    secH2: 'Sectoren waarvoor wij in Brussel websites maken',
    sectoren: [
      ['Horeca en winkels', `Een meertalige kaart, openingsuren en de weg naar uw zaak. Zie <a href="${nl('horeca')}">horeca</a> en <a href="${nl('winkel')}">winkels</a>.`],
      ['Vrije beroepen en consultants', `Advocaten, vertalers, therapeuten en adviseurs met een internationale klantenkring. Zie <a href="${nl('vrij')}">vrije beroepen</a> en <a href="${nl('zorg')}">zorg en welzijn</a>.`],
      ['Verenigingen en starters', `Een duidelijke site voor een vzw, een buurtinitiatief of een nieuwe zaak. Zie <a href="${nl('vereniging')}">verenigingen</a> en <a href="${nl('starters')}">starters</a>.`],
    ],
    vb: `Voor Brusselse zaken zijn bijvoorbeeld <a href="${demo('nl', 'velours')}">Velours</a> (een salon met afsprakenplanner) en <a href="${demo('nl', 'bistro-tilvaar')}">Bistro Tilvaar</a> (horeca met online reserveren) een goed vertrekpunt.`,
    faqH2: 'Veelgestelde vragen over een website in Brussel',
    faq: [
      ['Kunnen jullie een website in het Nederlands, Frans en Engels maken?', 'Wij werken in het Nederlands, het Frans en het Engels; onze eigen website staat in die drie talen. Welke talen uw site nodig heeft en wat dat kost, bespreken wij vooraf in uw vrijblijvend voorstel.'],
      ['Werken jullie in alle 19 Brusselse gemeenten?', 'Ja. Wij maken websites voor zaken in heel Brussel en in de gemeenten rond de stad. Op uw site vermelden wij in gewone zinnen waar u werkt.'],
      ['Moet ik voor een gesprek naar Kasterlee komen?', 'Nee. Kennismaking en overleg verlopen online, per e-mail of telefoon. U hebt één vast aanspreekpunt.'],
      ['Wat kost een website laten maken in Brussel?', 'Dezelfde prijzen als overal: Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, plus een maandprijs vanaf €29, €49 of €79. Extra talen bespreken wij vooraf.'],
      ['Is mijn website toegankelijk voor iedereen?', `Wij bouwen volgens de richtlijnen voor webtoegankelijkheid (WCAG 2.2 AA), zodat ook mensen met een beperking uw site kunnen gebruiken. Meer bij <a href="${nl('wcag')}">toegankelijke website</a>.`],
    ],
    also: [['/website-laten-maken-leuven/', 'Leuven'], ['/website-laten-maken-mechelen/', 'Mechelen'], ['/website-laten-maken-antwerpen/', 'Antwerpen'], ['/website-laten-maken-gent/', 'Gent'], [nl('hub'), 'heel België']],
  }),

  // ------------------------------------------------------------------ MECHELEN
  stad('nl', {
    s: 'mechelen', city: 'Mechelen', path: '/website-laten-maken-mechelen/', crumb: 'Mechelen',
    title: 'Website laten maken in Mechelen | Webdesign vanaf €490',
    desc: 'Website laten maken in Mechelen: webdesign op maat voor uw zaak in de stad, Muizen, Walem of Leest, met eerst een vrijblijvend voorstel. Vanaf €490.',
    h1: 'Website laten maken in Mechelen',
    slogan: 'Wij maken eerst een vrijblijvend voorstel voor uw zaak in Mechelen, afgestemd op uw diensten en uw klanten.',
    bandH2: 'Webdesign in Mechelen, op maat van uw zaak',
    bandLead: `Mechelen ligt midden tussen Antwerpen en Brussel. Veel Mechelse zaken werken dus voor klanten uit de stad zelf én uit de ruime regio. Wij bouwen voor hen een snelle, toegankelijke website met een eigen ontwerp. Kempen Webstudio werkt vanuit Kasterlee, in dezelfde provincie, en maakt <a href="/">websites voor zaken in heel België</a>.`,
    wijkenH2: 'Websites voor zaken in de stad en de deelgemeenten',
    wijken: [
      ['In de binnenstad', `Rond de Grote Markt, de IJzerenleen, de Bruul en de Vismarkt komen bewoners, winkelend publiek en dagjesmensen. Zij zoeken op hun gsm naar openingsuren, een menu of uw aanbod. Zie ook <a href="${nl('horeca')}">websites voor horeca</a> en <a href="${nl('winkel')}">websites voor winkels</a>.`],
      ['In de deelgemeenten', `Werkt u vanuit Walem, Heffen, Leest, Hombeek of Muizen, dan telt een duidelijk werkgebied. Wij vermelden in gewone zinnen waar u werkt, en uw gegevens komen overeen met uw Google Bedrijfsprofiel. Zie ook <a href="${nl('vakmensen')}">websites voor vakmensen</a>.`],
      ['In de regio', `Veel Mechelse vakmensen en dienstverleners werken ook in Bonheiden, Sint-Katelijne-Waver, Willebroek, Duffel of Zemst. Op uw site staat dan duidelijk welke gemeenten u bedient, zonder voor elke gemeente een aparte pagina.`],
    ],
    ondH2: 'Ondernemen in Mechelen: wie uw klanten zijn',
    ond: `<p>Mechelen is een compacte centrumstad met een historische binnenstad rond de Sint-Romboutstoren en een sterke winkel- en horecakern. Door de ligging aan de E19 en het spoor tussen Antwerpen en Brussel trekt de stad veel bedrijven en pendelaars aan. Met Technopolis en dierenpark Planckendael in Muizen komen er ook veel gezinnen op bezoek. Een website voor een zaak in de binnenstad richt zich dus anders dan een site voor een bedrijf op een bedrijventerrein langs de ring.</p><p>Wie in Mechelen een zaak zoekt, typt vaak de stad of de deelgemeente mee, of kijkt op de kaart wat het dichtst bij ligt. Daarom staan uw adres, uw werkgebied en uw openingsuren in gewone tekst op uw site, gelijk aan uw Google Bedrijfsprofiel. Is uw zaak lastig bereikbaar met de auto, dan zetten wij parkeren en bereikbaarheid met trein en fiets vooraan.</p>`,
    secH2: 'Sectoren waarvoor wij in Mechelen websites maken',
    sectoren: [
      ['Winkels en horeca', `Uw aanbod, openingsuren en de weg naar uw zaak in de binnenstad. Zie <a href="${nl('winkel')}">winkels</a> en <a href="${nl('horeca')}">horeca</a>.`],
      ['Vakmensen', `Schilders, tuinaannemers en installateurs met een duidelijk werkgebied en een offerteformulier. Zie <a href="${nl('schilder')}">schilders</a> en <a href="${nl('tuin')}">tuinaannemers</a>.`],
      ['Zorg en vrije beroepen', `Kinesisten, therapeuten en adviseurs met een rustige site en duidelijke afspraakmogelijkheden. Zie <a href="${nl('zorg')}">zorg en welzijn</a> en <a href="${nl('vrij')}">vrije beroepen</a>.`],
    ],
    vb: `Voor Mechelse zaken zijn bijvoorbeeld <a href="${demo('nl', 'atelier-kleurwerk')}">Atelier Kleurwerk</a> (een schilder) en <a href="${demo('nl', 'kapsalon-ivelien')}">Kapsalon Ivelien</a> (een salon met afspraakknop) een goed vertrekpunt.`,
    faqH2: 'Veelgestelde vragen over een website in Mechelen',
    faq: [
      ['Maken jullie ook websites voor zaken in Muizen, Walem of Leest?', 'Ja. Wij maken websites voor zaken in heel Mechelen en de deelgemeenten, en ook in de gemeenten rond de stad. Op uw site vermelden wij in gewone zinnen waar u werkt.'],
      ['Moet ik naar Kasterlee komen?', 'Nee. Kennismaking en overleg verlopen online, per e-mail of telefoon. U hebt één vast aanspreekpunt.'],
      ['Wat kost een website laten maken in Mechelen?', 'Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, plus een maandprijs vanaf €29, €49 of €79. U krijgt vooraf een vrijblijvend voorstel.'],
      ['Hoe snel staat mijn website in Mechelen online?', 'Reken op 5 werkdagen voor Start, 10 werkdagen voor Vakman en 3 tot 4 weken voor een Webshop, vanaf uw goedkeuring en zodra wij alles hebben wat nodig is.'],
      ['Ik heb al een website. Kunnen jullie die vernieuwen?', `Ja. Wij bouwen uw site opnieuw op, met een eigen ontwerp en zonder dat bestaande pagina's verloren gaan. Meer bij <a href="${nl('vernieuwen')}">website laten vernieuwen</a>.`],
    ],
    also: [['/website-laten-maken-antwerpen/', 'Antwerpen'], ['/website-laten-maken-brussel/', 'Brussel'], ['/website-laten-maken-leuven/', 'Leuven'], ['/website-laten-maken-kempen/', 'de Kempen'], [nl('hub'), 'heel België']],
  }),

  // ------------------------------------------------------------------ HASSELT
  stad('nl', {
    s: 'hasselt', city: 'Hasselt', path: '/website-laten-maken-hasselt/', crumb: 'Hasselt',
    title: 'Website laten maken in Hasselt | Webdesign vanaf €490',
    desc: 'Website laten maken in Hasselt: webdesign op maat voor uw zaak in de stad, Kermt, Kuringen of Stokrooie, met eerst een vrijblijvend voorstel. Vanaf €490.',
    h1: 'Website laten maken in Hasselt',
    slogan: 'Wij maken eerst een vrijblijvend voorstel voor uw zaak in Hasselt, afgestemd op uw diensten en uw klanten.',
    bandH2: 'Webdesign in Hasselt, op maat van uw zaak',
    bandLead: `Hasselt is de hoofdstad van Limburg en een echte winkelstad. Veel klanten komen van buiten de stad en beslissen op hun gsm waar ze naartoe gaan. Wij bouwen een snelle, toegankelijke website met een eigen ontwerp, zodat uw zaak die keuze makkelijk maakt. Kempen Webstudio werkt vanuit Kasterlee en maakt <a href="/">websites voor zaken in heel België</a>.`,
    wijkenH2: 'Websites voor zaken in de stad en de deelgemeenten',
    wijken: [
      ['In het centrum', `Binnen de groene boulevard, rond de Grote Markt, de Hoogstraat en de Demerstraat, draait veel om winkels, mode en horeca. Openingsuren, aanbod en ligging moeten in een paar seconden duidelijk zijn. Zie ook <a href="${nl('winkel')}">websites voor winkels</a>.`],
      ['In de deelgemeenten', `Werkt u vanuit Kermt, Kuringen, Stevoort, Stokrooie, Sint-Lambrechts-Herk of Wimmertingen, dan zoeken klanten op hun eigen gemeente. Wij vermelden in gewone zinnen waar u werkt, gelijk aan uw Google Bedrijfsprofiel. Zie ook <a href="${nl('vakmensen')}">websites voor vakmensen</a>.`],
      ['In de regio', `Veel Hasseltse ondernemers werken ook in Genk, Diepenbeek, Zonhoven, Herk-de-Stad of Lummen. Op uw site staat dan duidelijk welke gemeenten u bedient, zonder voor elke gemeente een aparte pagina.`],
    ],
    ondH2: 'Ondernemen in Hasselt: wie uw klanten zijn',
    ond: `<p>Hasselt is het bestuurlijke en commerciële centrum van Limburg. De stad staat bekend om haar winkelstraten en mode, om jenever, met het Jenevermuseum en de jaarlijkse Jeneverfeesten, en om de Japanse Tuin. Met de Universiteit Hasselt en de Corda Campus in Kiewit is er ook een groeiende groep jonge bedrijven en dienstverleners. Een website voor een modezaak in het centrum vraagt dus een andere aanpak dan een site voor een IT-dienstverlener of een vakman in Kuringen.</p><p>Wie in Hasselt een zaak zoekt, kijkt vaak op de kaart wat het dichtst bij ligt of typt de deelgemeente mee. Wij zetten uw adres, werkgebied en openingsuren in gewone tekst op uw site, met dezelfde gegevens als in uw Google Bedrijfsprofiel. Komen veel klanten met de wagen, dan zetten wij parkeren en de weg naar uw zaak duidelijk op de contactpagina.</p>`,
    secH2: 'Sectoren waarvoor wij in Hasselt websites maken',
    sectoren: [
      ['Winkels en mode', `Uw collectie, openingsuren en de weg naar uw winkel, of meteen een kleine webshop. Zie <a href="${nl('winkel')}">winkels</a> en <a href="${nl('webshop')}">webshop laten maken</a>.`],
      ['Horeca', `Kaart, terras, groepen en reserveren. Zie <a href="${nl('horeca')}">websites voor horeca</a>.`],
      ['Salons en zorg', `Kapsalons, schoonheidssalons en therapeuten met een afspraakknop. Zie <a href="${nl('kapsalon')}">salons</a> en <a href="${nl('zorg')}">zorg en welzijn</a>.`],
    ],
    vb: `Voor Hasseltse zaken zijn bijvoorbeeld <a href="${demo('nl', 'vennebrand')}">Vennebrand</a> (een kleine webshop) en <a href="${demo('nl', 'velours')}">Velours</a> (een schoonheidssalon met afsprakenplanner) een goed vertrekpunt.`,
    faqH2: 'Veelgestelde vragen over een website in Hasselt',
    faq: [
      ['Maken jullie ook websites voor zaken in Kermt, Kuringen of Stokrooie?', 'Ja. Wij maken websites voor zaken in heel Hasselt en de deelgemeenten, en ook in de gemeenten rond de stad. Op uw site vermelden wij in gewone zinnen waar u werkt.'],
      ['Moet ik naar Kasterlee komen?', 'Nee. Kennismaking en overleg verlopen online, per e-mail of telefoon. U hebt één vast aanspreekpunt.'],
      ['Wat kost een website laten maken in Hasselt?', 'Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, plus een maandprijs vanaf €29, €49 of €79. U krijgt vooraf een vrijblijvend voorstel.'],
      ['Kan ik ook online verkopen?', `Ja. Met het pakket Webshop verkoopt u tot 50 producten online, met veilig betalen met bankkaart of kredietkaart. Meer bij <a href="${nl('webshop')}">webshop laten maken</a>.`],
      ['Kunnen klanten online een afspraak maken?', 'Ja. Vanaf het pakket Vakman koppelen wij uw website aan uw boekingssysteem, zodat klanten zelf een moment kiezen.'],
    ],
    also: [['/website-laten-maken-leuven/', 'Leuven'], ['/website-laten-maken-kempen/', 'de Kempen'], ['/website-laten-maken-mol/', 'Mol'], ['/website-laten-maken-antwerpen/', 'Antwerpen'], [nl('hub'), 'heel België']],
  }),

  // ------------------------------------------------------------------ BRUGGE
  stad('nl', {
    s: 'brugge', city: 'Brugge', path: '/website-laten-maken-brugge/', crumb: 'Brugge',
    title: 'Website laten maken in Brugge | Webdesign vanaf €490',
    desc: 'Website laten maken in Brugge: webdesign op maat voor uw zaak in de binnenstad, Sint-Andries, Assebroek of Zeebrugge, met een vrijblijvend voorstel.',
    h1: 'Website laten maken in Brugge',
    slogan: 'Wij maken eerst een vrijblijvend voorstel voor uw zaak in Brugge, afgestemd op bewoners én bezoekers.',
    bandH2: 'Webdesign in Brugge, voor bewoners en bezoekers',
    bandLead: `In Brugge heeft een zaak vaak twee soorten klanten: Bruggelingen uit de buurt en bezoekers uit binnen- en buitenland. Uw website moet voor allebei werken, op de gsm en in meer dan één taal als dat nodig is. Wij bouwen snelle, toegankelijke websites met een eigen ontwerp. Kempen Webstudio werkt vanuit Kasterlee en maakt <a href="/">websites voor zaken in heel België</a>.`,
    wijkenH2: 'Websites voor zaken in de stad en de deelgemeenten',
    wijken: [
      ['In de binnenstad', `Rond de Markt, de Burg, de Steenstraat en de reien lopen veel bezoekers die op hun gsm naar een restaurant, een winkel of een B&B zoeken. Openingsuren, talen en ligging moeten meteen duidelijk zijn. Zie ook <a href="${nl('horeca')}">websites voor horeca</a> en <a href="${nl('winkel')}">websites voor winkels</a>.`],
      ['In de deelgemeenten', `Werkt u vanuit Sint-Andries, Sint-Michiels, Sint-Kruis, Assebroek, Koolkerke, Dudzele, Lissewege of Zeebrugge, dan zoeken klanten vaak op hun eigen deelgemeente. Wij vermelden in gewone zinnen waar u werkt, gelijk aan uw Google Bedrijfsprofiel. Zie ook <a href="${nl('vakmensen')}">websites voor vakmensen</a>.`],
      ['In het Brugse Ommeland', `Veel ondernemers werken ook in Oostkamp, Beernem, Zedelgem, Jabbeke of Damme. Op uw site staat dan duidelijk welke gemeenten u bedient, zonder voor elke gemeente een aparte pagina.`],
    ],
    ondH2: 'Ondernemen in Brugge: wie uw klanten zijn',
    ond: `<p>De historische binnenstad van Brugge staat op de werelderfgoedlijst van UNESCO en trekt het hele jaar door bezoekers. Horeca, logies, winkels en ambachten leven voor een groot deel van die bezoekers. Tegelijk is Brugge de hoofdstad van West-Vlaanderen, met in Zeebrugge een haven die sinds 2022 samen met Antwerpen één havenbedrijf vormt. Daar werken veel bedrijven vooral voor andere bedrijven. Een website voor een B&B aan de reien vraagt dus een andere aanpak dan een site voor een logistiek bedrijf in de achterhaven.</p><p>Voor zaken die van bezoekers leven, zetten wij de praktische informatie vooraan: openingsuren, ligging, bereikbaarheid met trein en fiets, en waar nodig een Engelse of Franse versie. Voor zaken die vooral voor Bruggelingen werken, staan uw werkgebied en uw contactgegevens in gewone tekst op uw site, gelijk aan uw Google Bedrijfsprofiel.</p>`,
    secH2: 'Sectoren waarvoor wij in Brugge websites maken',
    sectoren: [
      ['Horeca en logies', `Kaart, openingsuren, reserveren en praktische info voor bezoekers. Zie <a href="${nl('horeca')}">websites voor horeca</a>.`],
      ['Winkels en ambachten', `Uw aanbod en de weg naar uw zaak, of een kleine webshop voor wie al naar huis is. Zie <a href="${nl('winkel')}">winkels</a> en <a href="${nl('webshop')}">webshop laten maken</a>.`],
      ['Vakmensen en vrije beroepen', `Een duidelijk werkgebied en een offerteformulier, of een rustige site voor een kantoor. Zie <a href="${nl('vakmensen')}">vakmensen</a> en <a href="${nl('vrij')}">vrije beroepen</a>.`],
    ],
    vb: `Voor Brugse zaken zijn bijvoorbeeld <a href="${demo('nl', 'bistro-tilvaar')}">Bistro Tilvaar</a> (horeca met terras en online reserveren) en <a href="${demo('nl', 'houtatelier-nethe')}">Houtatelier Nethe</a> (een ambachtelijk atelier) een goed vertrekpunt.`,
    faqH2: 'Veelgestelde vragen over een website in Brugge',
    faq: [
      ['Kan mijn website ook in het Engels of Frans?', 'Wij werken in het Nederlands, het Frans en het Engels. Welke talen uw site nodig heeft en wat dat kost, bespreken wij vooraf in uw vrijblijvend voorstel.'],
      ['Maken jullie ook websites voor zaken in Sint-Andries, Assebroek of Zeebrugge?', 'Ja. Wij maken websites voor zaken in heel Brugge en de deelgemeenten, en in het Brugse Ommeland. Op uw site vermelden wij in gewone zinnen waar u werkt.'],
      ['Moet ik naar Kasterlee komen?', 'Nee. Kennismaking en overleg verlopen online, per e-mail of telefoon. U hebt één vast aanspreekpunt.'],
      ['Wat kost een website laten maken in Brugge?', 'Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, telkens eenmalig en excl. btw, plus een maandprijs vanaf €29, €49 of €79. Extra talen bespreken wij vooraf.'],
      ['Kunnen gasten online reserveren?', 'Ja. Vanaf het pakket Vakman koppelen wij uw website aan uw reservatie- of boekingssysteem.'],
    ],
    also: [['/website-laten-maken-gent/', 'Gent'], ['/website-laten-maken-kortrijk/', 'Kortrijk'], ['/website-laten-maken-brussel/', 'Brussel'], ['/website-laten-maken-antwerpen/', 'Antwerpen'], [nl('hub'), 'heel België']],
  }),

  // ------------------------------------------------------------------ FR BRUXELLES
  stad('fr', {
    s: 'bruxelles', city: 'Bruxelles', path: '/fr/creation-site-internet-bruxelles/', crumb: 'Bruxelles',
    alt: { nl: '/website-laten-maken-brussel/', fr: '/fr/creation-site-internet-bruxelles/', en: '/en/web-design-brussels/' },
    title: 'Création site internet Bruxelles | Dès €490 HTVA',
    desc: 'Création de site internet à Bruxelles : un site sur mesure pour votre entreprise dans l’une des 19 communes, en français, néerlandais ou anglais. Dès €490.',
    h1: 'Création de site internet à Bruxelles',
    slogan: 'Nous préparons d’abord une proposition sans engagement pour votre entreprise à Bruxelles, adaptée à vos clients et aux langues qu’ils parlent.',
    bandH2: 'Créer un site web à Bruxelles, une ville aux nombreuses langues',
    bandLead: `Bruxelles est bilingue, et beaucoup de clients parlent aussi anglais. Une entreprise bruxelloise a donc souvent besoin d’un site en plusieurs langues, avec la même qualité dans chacune. Nous créons des sites rapides et accessibles, avec un design propre à votre entreprise. Kempen Webstudio est établi à Kasterlee et réalise la <a href="/fr/">création de sites internet dans toute la Belgique</a>.`,
    wijkenH2: 'Des sites pour les entreprises des 19 communes',
    wijken: [
      ['Au centre et dans le quartier européen', `Autour de la Grand-Place, du quartier Dansaert, du Sablon et du quartier européen, l’horeca, les commerces et les prestataires travaillent pour les habitants, les navetteurs et les visiteurs internationaux. Horaires, adresse et langues doivent être clairs en quelques secondes. Voir aussi <a href="${fr('horeca')}">sites internet pour l’horeca</a>.`],
      ['Dans les quartiers', `À Ixelles, Saint-Gilles, Schaerbeek, Etterbeek, Uccle, Jette, Anderlecht ou dans les Woluwe, les clients cherchent une adresse dans leur propre quartier. Nous indiquons en phrases simples dans quelles communes vous travaillez, en accord avec votre fiche Google Business.`],
      ['En périphérie', `Vous êtes établi à Zaventem, Vilvorde, Dilbeek, Waterloo ou Wavre et vous travaillez à Bruxelles ? Votre site indique clairement les communes que vous desservez. Voir aussi <a href="${fr('vakmensen')}">sites internet pour les artisans</a>.`],
    ],
    ondH2: 'Entreprendre à Bruxelles : qui sont vos clients',
    ond: `<p>Bruxelles est la capitale de la Belgique et le siège des principales institutions européennes ; l’OTAN a son quartier général à Evere. Beaucoup de personnes venues de l’étranger y vivent et y travaillent, aux côtés des Bruxellois francophones et néerlandophones. La Région de Bruxelles-Capitale compte 19 communes, chacune avec son caractère : des rues commerçantes du centre et de l’avenue Louise aux quartiers résidentiels d’Uccle et des Woluwe.</p><p>Pour votre site, cela veut dire : pensez à la langue de vos clients. Un salon de coiffure à Schaerbeek a peut-être besoin d’un site en français avec une version néerlandaise, un consultant du quartier européen plutôt d’un site en anglais. Nous discutons d’avance des langues nécessaires et de leur impact sur le prix. Bruxelles a une zone de basses émissions et de nombreuses rues apaisées ; nous indiquons donc clairement l’accès en métro, en tram et à vélo sur votre page de contact. Pour l’accompagnement des entreprises dans la Région, vous pouvez vous adresser à hub.brussels.</p>`,
    secH2: 'Secteurs pour lesquels nous créons des sites à Bruxelles',
    sectoren: [
      ['Horeca et commerces', `Une carte multilingue, vos horaires et le chemin vers votre adresse. Voir <a href="${fr('horeca')}">horeca</a> et <a href="${fr('winkel')}">commerces</a>.`],
      ['Professions libérales et consultants', `Avocats, traducteurs, thérapeutes et conseillers avec une clientèle internationale. Voir <a href="${fr('vrij')}">professions libérales</a> et <a href="${fr('zorg')}">soins et bien-être</a>.`],
      ['Associations et jeunes entreprises', `Un site clair pour une ASBL, une initiative de quartier ou une nouvelle entreprise. Voir <a href="${fr('vereniging')}">associations</a> et <a href="${fr('starters')}">jeunes entreprises</a>.`],
    ],
    vb: `Pour une entreprise bruxelloise, <a href="${demo('fr', 'velours')}">Velours</a> (un institut avec agenda de rendez-vous) et <a href="${demo('fr', 'bistro-tilvaar')}">Bistro Tilvaar</a> (horeca avec réservation en ligne) sont de bons points de départ.`,
    faqH2: 'Questions fréquentes sur un site internet à Bruxelles',
    faq: [
      ['Pouvez-vous créer un site en français, néerlandais et anglais ?', 'Nous travaillons en français, en néerlandais et en anglais ; notre propre site existe dans ces trois langues. Les langues nécessaires et leur coût sont discutés d’avance dans votre proposition sans engagement.'],
      ['Travaillez-vous dans les 19 communes bruxelloises ?', 'Oui. Nous créons des sites pour des entreprises dans tout Bruxelles et dans les communes voisines. Votre site indique en phrases simples où vous travaillez.'],
      ['Dois-je me rendre à Kasterlee ?', 'Non. La prise de contact et le suivi se font en ligne, par e-mail ou par téléphone. Vous avez un seul interlocuteur.'],
      ['Quel est le prix d’un site internet à Bruxelles ?', 'Les mêmes prix que partout : Start à partir de €490, Vakman à partir de €990 et Webshop à partir de €1.890, chaque fois en une fois et HTVA, plus un abonnement mensuel à partir de €29, €49 ou €79. Les langues supplémentaires sont discutées d’avance.'],
      ['Mon site sera-t-il accessible à tous ?', `Nous suivons les règles d’accessibilité numérique (WCAG 2.2 AA), pour que les personnes en situation de handicap puissent aussi utiliser votre site. Voir <a href="${fr('wcag')}">site internet accessible</a>.`],
    ],
    also: [['/fr/creation-site-internet-liege/', 'Liège'], ['/fr/creation-site-internet-namur/', 'Namur'], ['/fr/creation-site-internet-charleroi/', 'Charleroi'], ['/fr/creation-site-internet-louvain/', 'Louvain'], [fr('hub'), 'toute la Belgique']],
  }),

  // ------------------------------------------------------------------ FR LIÈGE
  stad('fr', {
    s: 'liege', city: 'Liège', path: '/fr/creation-site-internet-liege/', crumb: 'Liège',
    title: 'Création site internet Liège | Dès €490 HTVA',
    desc: 'Création de site internet à Liège : un site sur mesure pour votre entreprise au centre, à Seraing, Herstal ou Ans, avec une proposition sans engagement.',
    h1: 'Création de site internet à Liège',
    slogan: 'Nous préparons d’abord une proposition sans engagement pour votre entreprise à Liège, adaptée à vos services et à vos clients.',
    bandH2: 'Créer un site web à Liège, sur mesure pour votre entreprise',
    bandLead: `À Liège, chaque entreprise veut être trouvée à sa façon : le commerce du Carré, l’artisan qui travaille dans toute la province, le cabinet près de la gare des Guillemins. Nous créons pour chacun un site rapide et accessible, avec un design propre et sans modèle tout fait. Kempen Webstudio réalise la <a href="/fr/">création de sites internet dans toute la Belgique</a>.`,
    wijkenH2: 'Des sites pour les entreprises de la ville et de l’agglomération',
    wijken: [
      ['Au centre-ville', `Autour du Carré, de la place Saint-Lambert, d’Outremeuse et du marché de la Batte, les passants cherchent sur leur smartphone des horaires, une carte ou une boutique proche. Cela doit être clair en quelques secondes. Voir <a href="${fr('horeca')}">sites pour l’horeca</a> et <a href="${fr('winkel')}">sites pour les commerces</a>.`],
      ['Dans l’agglomération', `Vous travaillez depuis Seraing, Herstal, Ans, Saint-Nicolas, Flémalle ou Chaudfontaine ? Vos clients cherchent souvent par commune. Nous indiquons en phrases simples où vous travaillez, en accord avec votre fiche Google Business. Voir aussi <a href="${fr('vakmensen')}">sites pour les artisans</a>.`],
      ['Dans la province', `Beaucoup d’indépendants liégeois travaillent aussi à Verviers, Huy, Waremme ou en Ardenne. Votre site indique clairement les communes desservies, sans une page vide pour chacune.`],
    ],
    ondH2: 'Entreprendre à Liège : qui sont vos clients',
    ond: `<p>Liège est la principale ville de l’est de la Belgique, avec une longue histoire industrielle et un port fluvial parmi les plus importants d’Europe. Liège Airport est un aéroport de fret important, et autour de la logistique et de l’industrie, beaucoup d’entreprises travaillent surtout pour d’autres entreprises. La ville est aussi universitaire, avec l’Université de Liège, et vivante, avec ses commerces, son horeca et son marché de la Batte le dimanche. Un site pour une brasserie d’Outremeuse demande donc une autre approche qu’un site pour une entreprise de services dans un zoning.</p><p>Les Liégeois cherchent souvent avec leur quartier ou leur commune, ou regardent la carte pour trouver l’adresse la plus proche. Nous plaçons votre adresse, votre zone d’intervention et vos horaires en texte clair sur votre site, avec les mêmes données que votre fiche Google Business. Si vos clients viennent en train, nous indiquons l’accès depuis la gare de Liège-Guillemins.</p>`,
    secH2: 'Secteurs pour lesquels nous créons des sites à Liège',
    sectoren: [
      ['Horeca et commerces', `Carte, horaires, terrasse et réservation, ou votre offre et le chemin vers votre boutique. Voir <a href="${fr('horeca')}">horeca</a> et <a href="${fr('winkel')}">commerces</a>.`],
      ['Artisans', `Peintres, couvreurs, menuisiers et jardiniers avec une zone d’intervention claire et un formulaire de devis. Voir <a href="${fr('vakmensen')}">artisans</a> et <a href="${fr('schilder')}">peintres</a>.`],
      ['Professions libérales', `Un site sobre et fiable pour un cabinet, un bureau ou un thérapeute. Voir <a href="${fr('vrij')}">professions libérales</a>.`],
    ],
    vb: `Pour une entreprise liégeoise, <a href="${demo('fr', 'dakwerken-hoogland')}">Dakwerken Hoogland</a> (un couvreur avec formulaire de devis) et <a href="${demo('fr', 'bistro-tilvaar')}">Bistro Tilvaar</a> (horeca avec réservation en ligne) sont de bons points de départ.`,
    faqH2: 'Questions fréquentes sur un site internet à Liège',
    faq: [
      ['Créez-vous aussi des sites pour Seraing, Herstal ou Ans ?', 'Oui. Nous créons des sites pour des entreprises dans tout Liège, dans l’agglomération et dans la province. Votre site indique en phrases simples où vous travaillez.'],
      ['Dois-je me rendre à Kasterlee ?', 'Non. La prise de contact et le suivi se font en ligne, par e-mail ou par téléphone. Vous avez un seul interlocuteur.'],
      ['Quel est le prix d’un site internet à Liège ?', 'Start à partir de €490, Vakman à partir de €990 et Webshop à partir de €1.890, chaque fois en une fois et HTVA, plus un abonnement mensuel à partir de €29, €49 ou €79. Vous recevez d’abord une proposition sans engagement.'],
      ['En combien de temps mon site est-il en ligne ?', 'Comptez 5 jours ouvrables pour Start, 10 jours ouvrables pour Vakman et 3 à 4 semaines pour une Webshop, à partir de votre accord et dès que nous avons tout ce qu’il faut.'],
      ['Pouvez-vous refaire mon site actuel ?', `Oui. Nous reconstruisons votre site avec un design propre, sans perdre vos pages existantes. Voir <a href="${fr('vernieuwen')}">refonte de site internet</a>.`],
    ],
    also: [['/fr/creation-site-internet-namur/', 'Namur'], ['/fr/creation-site-internet-bruxelles/', 'Bruxelles'], ['/fr/creation-site-internet-charleroi/', 'Charleroi'], [fr('hub'), 'toute la Belgique']],
  }),

  // ------------------------------------------------------------------ FR NAMUR
  stad('fr', {
    s: 'namur', city: 'Namur', path: '/fr/creation-site-internet-namur/', crumb: 'Namur',
    title: 'Création site internet Namur | Dès €490 HTVA',
    desc: 'Création de site internet à Namur : un site sur mesure pour votre entreprise au centre, à Jambes ou à Wépion, avec une proposition sans engagement.',
    h1: 'Création de site internet à Namur',
    slogan: 'Nous préparons d’abord une proposition sans engagement pour votre entreprise à Namur, adaptée à vos services et à vos clients.',
    bandH2: 'Créer un site web à Namur, sur mesure pour votre entreprise',
    bandLead: `Namur est une ville à taille humaine où l’on se connaît, mais où les clients cherchent d’abord en ligne. Votre site doit donc montrer en quelques secondes qui vous êtes, ce que vous proposez et comment vous joindre. Nous créons des sites rapides et accessibles, avec un design propre. Kempen Webstudio réalise la <a href="/fr/">création de sites internet dans toute la Belgique</a>.`,
    wijkenH2: 'Des sites pour les entreprises de la ville et des sections',
    wijken: [
      ['Au centre-ville', `Entre la gare, la rue de Fer, la place d’Armes et le pied de la citadelle, les commerces et l’horeca accueillent habitants, étudiants et visiteurs. Horaires, offre et adresse doivent être clairs tout de suite. Voir <a href="${fr('winkel')}">sites pour les commerces</a> et <a href="${fr('horeca')}">sites pour l’horeca</a>.`],
      ['Dans les sections', `Vous travaillez depuis Jambes, Salzinnes, Saint-Servais, Bouge, Erpent ou Wépion ? Vos clients cherchent souvent par quartier. Nous indiquons en phrases simples où vous travaillez, en accord avec votre fiche Google Business. Voir aussi <a href="${fr('vakmensen')}">sites pour les artisans</a>.`],
      ['Dans la province', `Beaucoup d’indépendants namurois travaillent aussi à Gembloux, Dinant, Andenne ou Fosses-la-Ville. Votre site indique clairement les communes desservies, sans une page vide pour chacune.`],
    ],
    ondH2: 'Entreprendre à Namur : qui sont vos clients',
    ond: `<p>Namur est la capitale de la Wallonie : le Parlement et le Gouvernement wallons y siègent, et de nombreuses administrations y travaillent. La ville se trouve au confluent de la Sambre et de la Meuse, sous sa citadelle, et attire beaucoup de visiteurs. Avec l’Université de Namur et les hautes écoles, elle compte aussi une importante population étudiante. Un site pour un restaurant du centre demande donc une autre approche qu’un site pour un consultant qui travaille avec les administrations, ou pour un producteur de Wépion.</p><p>Les Namurois cherchent souvent avec leur section ou leur quartier, ou consultent la carte. Nous plaçons votre adresse, votre zone d’intervention et vos horaires en texte clair sur votre site, avec les mêmes données que votre fiche Google Business. Pour une adresse au centre, nous indiquons aussi l’accès depuis la gare et les parkings proches.</p>`,
    secH2: 'Secteurs pour lesquels nous créons des sites à Namur',
    sectoren: [
      ['Commerces et horeca', `Votre offre, vos horaires et le chemin vers votre adresse. Voir <a href="${fr('winkel')}">commerces</a> et <a href="${fr('horeca')}">horeca</a>.`],
      ['Professions libérales et conseil', `Un site sobre pour un cabinet, un bureau d’études ou un consultant. Voir <a href="${fr('vrij')}">professions libérales</a>.`],
      ['Soins, salons et associations', `Thérapeutes, salons de coiffure et ASBL avec une prise de rendez-vous ou un contact simple. Voir <a href="${fr('zorg')}">soins et bien-être</a> et <a href="${fr('vereniging')}">associations</a>.`],
    ],
    vb: `Pour une entreprise namuroise, <a href="${demo('fr', 'kapsalon-ivelien')}">Kapsalon Ivelien</a> (un salon avec bouton rendez-vous) et <a href="${demo('fr', 'tuinzorg-varelinde')}">Tuinzorg Varelinde</a> (un jardinier) sont de bons points de départ.`,
    faqH2: 'Questions fréquentes sur un site internet à Namur',
    faq: [
      ['Créez-vous aussi des sites pour Jambes ou Salzinnes ?', 'Oui. Nous créons des sites pour des entreprises dans tout Namur, dans ses sections et dans la province. Votre site indique en phrases simples où vous travaillez.'],
      ['Dois-je me rendre à Kasterlee ?', 'Non. La prise de contact et le suivi se font en ligne, par e-mail ou par téléphone. Vous avez un seul interlocuteur.'],
      ['Quel est le prix d’un site internet à Namur ?', 'Start à partir de €490, Vakman à partir de €990 et Webshop à partir de €1.890, chaque fois en une fois et HTVA, plus un abonnement mensuel à partir de €29, €49 ou €79. Vous recevez d’abord une proposition sans engagement.'],
      ['Mes clients peuvent-ils prendre rendez-vous en ligne ?', 'Oui. À partir de la formule Vakman, nous relions votre site à votre système de réservation, pour que vos clients choisissent eux-mêmes un moment.'],
      ['Un site internet est-il déductible fiscalement ?', `En règle générale, les frais d’un site professionnel sont déductibles. Nous l’expliquons en détail dans notre article <a href="${fr('fiscaal')}">site internet déductible fiscalement</a>.`],
    ],
    also: [['/fr/creation-site-internet-liege/', 'Liège'], ['/fr/creation-site-internet-charleroi/', 'Charleroi'], ['/fr/creation-site-internet-bruxelles/', 'Bruxelles'], [fr('hub'), 'toute la Belgique']],
  }),

  // ------------------------------------------------------------------ FR CHARLEROI
  stad('fr', {
    s: 'charleroi', city: 'Charleroi', path: '/fr/creation-site-internet-charleroi/', crumb: 'Charleroi',
    title: 'Création site internet Charleroi | Dès €490 HTVA',
    desc: 'Création de site internet à Charleroi : un site sur mesure pour votre entreprise au centre, à Gosselies ou Marcinelle. Proposition sans engagement.',
    h1: 'Création de site internet à Charleroi',
    slogan: 'Nous préparons d’abord une proposition sans engagement pour votre entreprise à Charleroi, adaptée à vos services et à vos clients.',
    bandH2: 'Créer un site web à Charleroi, sur mesure pour votre entreprise',
    bandLead: `Charleroi change vite, et de nombreuses entreprises y démarrent ou se renouvellent. Un site clair, rapide et facile à trouver aide à convaincre de nouveaux clients. Nous créons des sites accessibles avec un design propre, sans modèle tout fait. Kempen Webstudio réalise la <a href="/fr/">création de sites internet dans toute la Belgique</a>.`,
    wijkenH2: 'Des sites pour les entreprises de la ville et des sections',
    wijken: [
      ['À la Ville Haute et la Ville Basse', `Autour de la place Charles II, de la Ville Basse et du centre commercial Rive Gauche, commerces et horeca accueillent habitants et navetteurs. Horaires, offre et adresse doivent être clairs en quelques secondes. Voir <a href="${fr('winkel')}">sites pour les commerces</a> et <a href="${fr('horeca')}">sites pour l’horeca</a>.`],
      ['Dans les sections', `Vous travaillez depuis Gosselies, Jumet, Marcinelle, Montignies-sur-Sambre, Marchienne-au-Pont ou Couillet ? Vos clients cherchent souvent par section. Nous indiquons en phrases simples où vous travaillez, en accord avec votre fiche Google Business. Voir aussi <a href="${fr('vakmensen')}">sites pour les artisans</a>.`],
      ['Dans la région', `Beaucoup d’indépendants carolos travaillent aussi à Châtelet, Fleurus, Fontaine-l’Évêque ou Courcelles. Votre site indique clairement les communes desservies, sans une page vide pour chacune.`],
    ],
    ondH2: 'Entreprendre à Charleroi : qui sont vos clients',
    ond: `<p>Charleroi est la plus grande ville de Wallonie. Son passé industriel, lié au charbon et à l’acier, fait place à de nouvelles activités : l’Aéropôle de Gosselies accueille des entreprises technologiques et de biotechnologie, et l’aéroport de Brussels South Charleroi attire des voyageurs de tout le pays. Le centre-ville a été largement rénové, avec de nouveaux commerces et lieux de sortie. Un site pour un indépendant qui démarre à Marcinelle demande donc une autre approche qu’un site pour une entreprise de services qui travaille pour l’industrie.</p><p>Les Carolos cherchent souvent avec leur section ou consultent la carte pour trouver l’adresse la plus proche. Nous plaçons votre adresse, votre zone d’intervention et vos horaires en texte clair sur votre site, avec les mêmes données que votre fiche Google Business, et nous indiquons l’accès en métro léger, en bus ou en voiture quand c’est utile.</p>`,
    secH2: 'Secteurs pour lesquels nous créons des sites à Charleroi',
    sectoren: [
      ['Artisans et entreprises de services', `Une zone d’intervention claire et un formulaire de devis. Voir <a href="${fr('vakmensen')}">artisans</a> et <a href="${fr('tuin')}">jardiniers</a>.`],
      ['Commerces et horeca', `Votre offre, vos horaires et votre adresse, ou une petite boutique en ligne. Voir <a href="${fr('winkel')}">commerces</a> et <a href="${fr('webshop')}">création de boutique en ligne</a>.`],
      ['Jeunes entreprises', `Un premier site clair et abordable pour démarrer. Voir <a href="${fr('starters')}">jeunes entreprises</a>.`],
    ],
    vb: `Pour une entreprise carolorégienne, <a href="${demo('fr', 'dakwerken-hoogland')}">Dakwerken Hoogland</a> (un couvreur avec formulaire de devis) et <a href="${demo('fr', 'vennebrand')}">Vennebrand</a> (une petite boutique en ligne) sont de bons points de départ.`,
    faqH2: 'Questions fréquentes sur un site internet à Charleroi',
    faq: [
      ['Créez-vous aussi des sites pour Gosselies, Jumet ou Marcinelle ?', 'Oui. Nous créons des sites pour des entreprises dans tout Charleroi, dans ses sections et dans la région. Votre site indique en phrases simples où vous travaillez.'],
      ['Dois-je me rendre à Kasterlee ?', 'Non. La prise de contact et le suivi se font en ligne, par e-mail ou par téléphone. Vous avez un seul interlocuteur.'],
      ['Quel est le prix d’un site internet à Charleroi ?', 'Start à partir de €490, Vakman à partir de €990 et Webshop à partir de €1.890, chaque fois en une fois et HTVA, plus un abonnement mensuel à partir de €29, €49 ou €79. Vous recevez d’abord une proposition sans engagement.'],
      ['Je démarre mon activité. Quelle formule choisir ?', `Pour démarrer, la formule Start suffit souvent : un site qui fonctionne sur smartphone et ordinateur, avec formulaire de contact et bouton d’appel. Voir <a href="${fr('starters')}">site internet pour jeunes entreprises</a>.`],
      ['Puis-je vendre en ligne ?', `Oui. Avec la formule Webshop, vous vendez jusqu’à 50 produits en ligne, avec paiement sécurisé par carte bancaire ou carte de crédit. Voir <a href="${fr('webshop')}">création de boutique en ligne</a>.`],
    ],
    also: [['/fr/creation-site-internet-namur/', 'Namur'], ['/fr/creation-site-internet-bruxelles/', 'Bruxelles'], ['/fr/creation-site-internet-liege/', 'Liège'], [fr('hub'), 'toute la Belgique']],
  }),
];
