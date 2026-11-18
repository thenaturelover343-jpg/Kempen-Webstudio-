// kennis-uitbreiding.mjs (PDF Karim 18-11, punt 20): de artikels in «Uitleg» uitgebreid tot ongeveer 1.500 woorden.
// Alleen controleerbare inhoud: Belgische regels en instanties, de werkwijze en prijzen van Webstudio K. Geen verzonnen cijfers.
// Secties komen vóór «Lees ook» (aanvulling op de bestaande pagina, herhaalbaar).
import { P } from './_gemeen.mjs';
const A = (k, l, t) => `<a href="${P[k][l]}">${t}</a>`;
const PROSE = (id, h2, ps) => ({ t: 'prose', id, h2, html: ps.map(p => `<p>${p}</p>`).join('') });
const NA = 'main section[aria-labelledby="lees-ook-t"]';
const art = (key, lang, sections) => ({ path: P[key][lang], lang, aanvul: true, insert: [{ before: NA, sections }] });

const NL = [
  art('duur', 'nl', [
    PROSE('duur-domein', 'Domeinnaam, e-mail en de dag van de overstap', [
      `Hebt u al een domeinnaam, dan verhuist die mee naar de nieuwe website. Voor een .be-domein vraagt u bij uw huidige registrar een transfercode op. DNS Belgium, de organisatie achter .be, legt die werkwijze vast voor alle registrars. Met die code zet de nieuwe beheerder de overdracht in gang. Het domein blijft al die tijd op uw naam staan.`,
      `E-mail hangt vaak aan hetzelfde domein. Daarom kijken wij vooraf waar uw mailboxen staan, zodat de e-mail blijft werken als de website verhuist. Pas daarna verwijzen wij het domein naar de nieuwe site. Zo'n wijziging in de DNS is meestal binnen enkele uren overal zichtbaar, al kan het tot een dag duren voor elke internetprovider de nieuwe gegevens gebruikt.`,
      `Kiest u een nieuwe domeinnaam, dan registreren wij die op uw naam. Een .be-naam is meteen actief zodra de registratie rond is, dus dat vertraagt de planning niet.`,
    ]),
    PROSE('duur-google', 'Na de lancering: wanneer vindt Google uw site?', [
      `Online staan is iets anders dan gevonden worden. Google moet uw pagina's eerst bezoeken en opnemen. Bij een nieuwe site gebeurt dat meestal binnen enkele dagen tot enkele weken. Wij dienen de sitemap in bij Google Search Console, zodat Google weet welke pagina's er zijn. Vervangt de nieuwe site een oude, dan zetten wij doorverwijzingen van de oude adressen naar de nieuwe, zodat bestaande links en zoekresultaten blijven werken.`,
      `Lokale zoekresultaten lopen vooral via uw Google Bedrijfsprofiel. Hoe u dat profiel aanmaakt en invult, leest u in ${A('gbp', 'nl', 'Google Bedrijfsprofiel aanmaken')}. Wilt u daarna hoger komen voor zoekopdrachten in uw streek, dan kunt u ${A('seo', 'nl', 'SEO laten doen')}.`,
      `Ook na de lancering past u de site aan. Een nieuwe foto, een prijs die verandert of andere openingsuren stuurt u gewoon door. Bij de pakketten van Webstudio K zitten updates, back-ups en elke maand een aantal minuten aanpassingen in de maandprijs. Wat elk pakket kost, staat in ${A('prijs', 'nl', 'wat kost een website laten maken')}.`,
    ]),
    PROSE('duur-tips', 'Zo houdt u de planning kort', [
      `De meeste vertraging zit niet in de bouw, maar in het wachten op inhoud. Leg daarom vooraf klaar: uw logo in een goede resolutie, de lijst van uw diensten, eventuele foto's van uw zaak of uw werk, en de gegevens die verplicht op een website staan, zoals uw ondernemingsnummer. Welke gegevens dat zijn, leest u in ${A('wettelijk', 'nl', 'wettelijke vermeldingen op een website')}.`,
      `Duid één persoon aan die de teksten nakijkt en beslist. Zeker bij een vereniging of een zaak met meerdere vennoten scheelt dat dagen. Geef opmerkingen liefst in één keer door, met de pagina erbij. Zo verwerken wij alles in één ronde. Wie een webshop laat maken, rekent op 3 tot 4 weken, omdat de producten, betalingen en verzending erbij komen. Meer daarover leest u op ${A('webshop', 'nl', 'webshop laten maken')}.`,
    ]),
  ]),
  art('zelf', 'nl', [
    PROSE('zelf-tijd', 'Wat zelf bouwen echt vraagt', [
      `Een websitebouwer belooft dat u in een namiddag online staat. Een eerste versie lukt vaak ook. Het werk zit in wat daarna komt: teksten die zeggen wat u doet en voor wie, foto's die vlot laden op een gsm, een duidelijke opbouw per dienst, en de wettelijke gegevens onderaan elke pagina. Wie dat zelf doet, rekent op meerdere avonden of weekends, en daarna op vaste tijd voor onderhoud.`,
      `Denk ook aan wat een bezoeker niet ziet. Een site moet vlot laden, goed werken op elke schermgrootte en bruikbaar zijn voor mensen die een schermlezer of alleen een toetsenbord gebruiken. Voor een aantal diensten aan consumenten geldt sinds 28 juni 2025 de Europese toegankelijkheidswet, in België omgezet in het Wetboek van economisch recht. Wat dat voor uw zaak betekent, leest u op ${A('wcag', 'nl', 'toegankelijke website')}.`,
      `Kies u toch voor zelf bouwen, controleer dan of uw domeinnaam op uw eigen naam staat en of u uw site kunt meenemen als u later overstapt. Bij sommige websitebouwers kan dat niet, en dan begint u bij een overstap opnieuw.`,
    ]),
    PROSE('zelf-keuze', 'Wanneer laten maken de betere keuze is', [
      `Een website laten maken loont vooral als uw tijd beter naar uw klanten gaat, of als uw site echt iets moet opleveren: offerteaanvragen, reservaties of verkoop. Een vakman wil telefoontjes en aanvragen, een winkel wil dat bezoekers de openingsuren en de weg vinden. Een eigen ontwerp, teksten in gewone taal en een duidelijke knop naar contact maken daar het verschil.`,
      `Bij Webstudio K begint een website vanaf €490 excl. btw voor de bouw, plus een maandprijs vanaf €29 excl. btw met hosting, back-ups, updates en kleine aanpassingen. U krijgt eerst een kennismaking en een vrijblijvende offerte. Alle bedragen staan op ${A('prijs', 'nl', 'wat kost een website laten maken')}, en wat er elk jaar terugkomt, in ${A('kosten', 'nl', 'terugkerende kosten van een website')}.`,
      `Twijfelt u tussen een systeem als WordPress en een site op maat, lees dan ${A('wp', 'nl', 'WordPress of maatwerk')}. Hebt u al een site die niet meer werkt zoals u wilt, dan kunt u ook uw ${A('vernieuwen', 'nl', 'website laten vernieuwen')}.`,
    ]),
  ]),
  art('fiscaal', 'nl', [
    PROSE('fiscaal-regels', 'Welke regels er gelden', [
      `Voor de inkomstenbelasting gaat het om beroepskosten. Volgens artikel 49 van het Wetboek van de inkomstenbelastingen 1992 zijn kosten aftrekbaar als u ze maakt om uw beroepsinkomsten te verwerven of te behouden, en als u ze kunt bewijzen. Een website voor uw zaak valt daar in de regel onder. Bewaar daarom de offerte, de factuur van de bouw en de facturen van de maandprijs bij uw boekhouding.`,
      `De bouw van een website kan een kost van het jaar zijn of een investering die u over meerdere jaren afschrijft. Welke behandeling past, hangt af van het bedrag en van hoe uw zaak boekt. Dat beslist uw boekhouder. De maandprijs voor hosting, onderhoud en updates is een gewone kost van het jaar waarin u hem betaalt.`,
      `Voor de btw geldt een aparte regel. Bent u btw-plichtig, dan recupereert u in de regel de btw op de facturen voor uw website. Valt u onder de vrijstellingsregeling voor kleine ondernemingen, dan rekent u geen btw aan en kunt u de btw op uw aankopen niet recupereren. Sinds 1 januari 2025 ligt de grens voor die vrijstelling op een jaaromzet van €25.000.`,
    ]),
    PROSE('fiscaal-bronnen', 'Waar u het nakijkt', [
      `De officiële teksten en de uitleg van de administratie vindt u bij de FOD Financiën, op Fisconetplus. Daar staan het Wetboek van de inkomstenbelastingen 1992 en het Btw-wetboek, met de circulaires die erbij horen. Algemene uitleg over de btw-vrijstelling voor kleine ondernemingen staat ook op de website van de FOD Financiën.`,
      `Elke zaak is anders. Een vennootschap boekt anders dan een eenmanszaak, en een vrij beroep heeft soms eigen regels. Leg de offerte daarom voor aan uw boekhouder voor u tekent. Bij Webstudio K staan alle bedragen excl. btw op de offerte, met het eenmalige bedrag en de maandprijs apart, zodat uw boekhouder ze meteen kan verwerken.`,
      `Wat een website kost, ziet u op ${A('prijs', 'nl', 'wat kost een website laten maken')}. Welke kosten elk jaar terugkomen, leest u in ${A('kosten', 'nl', 'terugkerende kosten van een website')}. Start u net een zaak, kijk dan ook naar ${A('starters', 'nl', 'een website voor starters')}.`,
    ]),
  ]),
  art('kosten', 'nl', [
    PROSE('kosten-posten', 'De posten één voor één', [
      `Een domeinnaam betaalt u elk jaar. Voor .be loopt de registratie via een registrar, die de naam bij DNS Belgium vastlegt. Let erop dat de naam op uw eigen naam staat en niet op die van de webbouwer. Zo neemt u hem mee als u ooit overstapt.`,
      `Hosting is de plaats waar uw website staat. Daarbij horen een beveiligde verbinding (https), back-ups en updates van de software. Een site die niet onderhouden wordt, raakt na verloop van tijd onveilig of werkt niet meer goed in nieuwe browsers. Reken die zorg dus mee als vaste kost.`,
      `E-mail op uw eigen domein staat vaak los van de website. Hebt u mailboxen bij een andere dienst, dan blijft die kost apart lopen. Gebruikt u betaalde plug-ins, thema's of een betaaldienst voor een webshop, dan komen ook die kosten elk jaar of per verkoop terug.`,
    ]),
    PROSE('kosten-wk', 'Wat er bij Webstudio K in de maandprijs zit', [
      `Bij Webstudio K betaalt u na de bouw een vaste maandprijs: vanaf €29 voor Start, vanaf €49 voor Vakman en vanaf €79 voor een Webshop, telkens excl. btw. Daarin zitten hosting, back-ups, updates en elke maand een aantal minuten aanpassingen. Een pakket loopt minimaal 12 maanden en is daarna maandelijks opzegbaar. Uw domeinnaam staat altijd op uw eigen naam.`,
      `Zo weet u vooraf wat er elk jaar terugkomt, zonder losse facturen voor elke kleine wijziging. Werk dat buiten de maandprijs valt, zoals een nieuwe pagina of een extra taal, bespreken wij vooraf, met de prijs erbij. Alle bedragen staan in ${A('prijs', 'nl', 'wat kost een website laten maken')}.`,
      `Of u de kosten fiscaal kunt inbrengen, leest u in ${A('fiscaal', 'nl', 'is een website fiscaal aftrekbaar')}. Wilt u online verkopen, dan komen er kosten voor betalingen en verzending bij. Meer daarover op ${A('webshop', 'nl', 'webshop laten maken')}.`,
    ]),
  ]),
  art('wp', 'nl', [
    PROSE('wp-onderhoud', 'Onderhoud en veiligheid', [
      `WordPress is het meest gebruikte systeem voor websites. Dat heeft voordelen: veel kennis, veel uitbreidingen. Het betekent ook dat de software, het thema en elke plug-in regelmatig updates nodig hebben. Blijven die liggen, dan wordt de site kwetsbaar. Plan dus vaste tijd in voor updates en een back-up voor elke grote wijziging, of laat dat onderhoud doen.`,
      `Elke plug-in voegt code toe. Een site met veel uitbreidingen laadt trager, vooral op een gsm, en kan na een update onverwacht anders werken. Kiest u voor WordPress, houd het aantal plug-ins dan beperkt en gebruik alleen uitbreidingen die nog actief onderhouden worden.`,
    ]),
    PROSE('wp-keuze', 'Hoe u kiest', [
      `Stel uzelf drie vragen. Wilt u zelf dagelijks teksten of producten aanpassen? Dan is een beheersysteem handig. Moet de site vooral vlot laden, goed gevonden worden en weinig onderhoud vragen? Dan past een site op maat. En wie past de site aan als u het zelf niet doet: uzelf, een medewerker of een vast aanspreekpunt?`,
      `Webstudio K bouwt sites op maat, licht en volgens de richtlijnen voor toegankelijkheid (WCAG 2.2 AA). Kleine aanpassingen zitten in de maandprijs, dus u hoeft zelf geen systeem te leren. Wat dat kost, ziet u op ${A('prijs', 'nl', 'wat kost een website laten maken')}. Meer over toegankelijkheid leest u op ${A('wcag', 'nl', 'toegankelijke website')}.`,
      `Hebt u al een WordPress-site die traag of verouderd is, dan kunt u uw ${A('vernieuwen', 'nl', 'website laten vernieuwen')}. Uw domeinnaam en, waar het kan, uw bestaande adressen blijven behouden, met doorverwijzingen voor de pagina's die verhuizen.`,
    ]),
  ]),
  art('wettelijk', 'nl', [
    PROSE('wettelijk-webshop', 'Verkoopt u online? Dan gelden er extra regels', [
      `Wie aan consumenten verkoopt via een webshop, valt onder Boek VI van het Wetboek van economisch recht. U vermeldt de totale prijs met btw, de leveringskosten en de betaalmogelijkheden voor de klant bestelt. De consument heeft in de regel 14 dagen bedenktijd om af te zien van de aankoop, en u legt uit hoe dat werkt. Algemene voorwaarden horen vlot vindbaar op de site.`,
      `Sinds 28 juni 2025 geldt voor e-commerce aan consumenten ook de Europese toegankelijkheidswet, in België omgezet in het Wetboek van economisch recht. Een webshop moet dan bruikbaar zijn voor mensen met een beperking. Micro-ondernemingen die diensten leveren, met minder dan 10 werknemers en een jaaromzet of balanstotaal van maximaal €2 miljoen, zijn vrijgesteld. Meer leest u op ${A('wcag', 'nl', 'toegankelijke website')} en ${A('webshop', 'nl', 'webshop laten maken')}.`,
    ]),
    PROSE('wettelijk-bronnen', 'Waar u de regels nakijkt', [
      `De verplichte vermeldingen voor elke website staan in Boek XII van het Wetboek van economisch recht. De FOD Economie legt ze uit op zijn website. Voor privacy en cookies is de Gegevensbeschermingsautoriteit (GBA) bevoegd. Zij publiceert uitleg over de AVG en over toestemming voor cookies. Voor een gereglementeerd beroep vermeldt u ook de beroepsorde of de beroepstitel, zoals uw beroepsvereniging die oplegt.`,
      `Bij een website van Webstudio K staan uw naam, adres, ondernemingsnummer en contactgegevens onderaan elke pagina, en krijgt u een privacyverklaring en een cookiekeuze die pas statistieken laadt na toestemming. Wat er verder op een site hoort, leest u in ${A('inhoud', 'nl', 'wat moet er op een website staan')}. Een vrij beroep vindt meer op ${A('vrij', 'nl', 'een website voor een vrij beroep')}.`,
    ]),
  ]),
  art('inhoud', 'nl', [
    PROSE('inhoud-diensten', 'Een pagina per dienst, en waarom dat helpt', [
      `Zet elke belangrijke dienst op een eigen pagina, met een duidelijke titel. Een bezoeker die "badkamer renoveren" zoekt, wil meteen op die dienst uitkomen en niet op een lange lijst. Google kan zo'n pagina ook beter tonen voor de juiste zoekopdracht. Vertel op elke pagina wat de dienst inhoudt, voor wie hij is, in welke streek u werkt en hoe iemand een offerte aanvraagt.`,
      `Werkt u in meerdere gemeenten, noem ze dan in gewone zinnen, met foto's van werk in die streek. Webstudio K maakt websites voor zaken in heel België, bijvoorbeeld in ${A('hub', 'nl', 'Antwerpen, Gent en Brussel')}. Voor vakmensen, winkels en horeca zijn er aparte pagina's met wat bezoekers daar zoeken, zoals ${A('vakmensen', 'nl', 'websites voor vakmensen')} en ${A('horeca', 'nl', 'websites voor horeca')}.`,
    ]),
    PROSE('inhoud-onderhoud', 'Houd de inhoud actueel', [
      `Een website die niet klopt, kost vertrouwen. Pas uw openingsuren aan bij een vakantie of een feestdag, haal acties weg als ze voorbij zijn en zet nieuwe realisaties online. Zet dezelfde naam, hetzelfde adres en hetzelfde telefoonnummer op uw website, uw Google Bedrijfsprofiel en in bedrijvengidsen. Hoe u dat profiel invult, leest u in ${A('gbp', 'nl', 'Google Bedrijfsprofiel aanmaken')}.`,
      `Bij Webstudio K zitten kleine aanpassingen in de maandprijs. U stuurt de nieuwe tekst of foto door, en wij zetten die online. Wat dat kost, staat op ${A('prijs', 'nl', 'wat kost een website laten maken')}.`,
    ]),
  ]),
  art('gbp', 'nl', [
    PROSE('gbp-website', 'Profiel en website versterken elkaar', [
      `Uw Google Bedrijfsprofiel en uw website werken het best samen. Zet in het profiel een link naar uw website, en op uw website dezelfde naam, hetzelfde adres en hetzelfde telefoonnummer als in het profiel. Een bezoeker die via Google Maps op uw site komt, wil daar meteen uw diensten, prijzen en een manier om contact op te nemen vinden. Webstudio K bouwt sites waarop dat bovenaan staat; meer leest u op ${A('hub', 'nl', 'website laten maken in heel België')} of op ${A('seo', 'nl', 'SEO laten doen')}.`,
    ]),
  ]),
];

const NL2 = [
  art('duur', 'nl', [PROSE('duur-fasen', 'Wat er in elke fase gebeurt', [
    `In de eerste fase leren wij uw zaak kennen: wat u doet, voor wie, in welke streek en wat uw website moet opleveren. Dat gesprek verloopt per e-mail, telefonisch of online. Daarna volgt de offerte, met de pagina's, de functies en de prijs. Pas als u die goedkeurt, begint de bouw.`,
    `Tijdens de bouw schrijven wij de teksten op basis van het gesprek en zetten wij de pagina's op, met uw foto's of passend beeld. U krijgt de site te zien voor ze online gaat en geeft uw opmerkingen door. Daarna volgen de laatste controles: werkt elk formulier, laadt de site vlot op een gsm, staan de wettelijke gegevens onderaan en kloppen de titels voor Google. Pas dan gaat de site online.`,
    `Start staat binnen 5 werkdagen online en Vakman binnen 10 werkdagen, gerekend vanaf uw goedkeuring van de offerte en het moment dat wij alles hebben wat nodig is. Voor een vereniging die eerst het bestuur laat beslissen, of voor een zaak met veel diensten, plant u best wat extra tijd in voor het nalezen. Meer over de aanpak leest u op ${A('hub', 'nl', 'website laten maken in heel België')}.`,
  ])]),
  art('zelf', 'nl', [PROSE('zelf-vragen', 'Vijf vragen voor u beslist', [
    `Hoeveel tijd hebt u echt, niet alleen voor de bouw maar ook voor het onderhoud het jaar erna? Wie schrijft de teksten, en kunt u in een paar zinnen zeggen wat u doet en voor wie? Hebt u foto's van uw werk of uw zaak, of moet u die nog maken? Staat uw domeinnaam op uw eigen naam, en kunt u de site meenemen als u later overstapt? En wat moet de site opleveren: aanvragen, reservaties, verkoop of vooral vertrouwen?`,
    `Hebt u op de meeste vragen een duidelijk antwoord en tijd over, dan kan zelf bouwen. Twijfelt u, of wilt u dat de site meteen klantgericht werkt, dan is laten maken de rustigere keuze. Een vrijblijvende offerte geeft u de prijs zwart op wit, zodat u kunt vergelijken met de tijd die zelf bouwen kost. Voor starters is er een aparte pagina: ${A('starters', 'nl', 'website voor starters')}.`,
  ])]),
  art('fiscaal', 'nl', [PROSE('fiscaal-praktijk', 'Praktisch: wat u bewaart en wanneer', [
    `Vraag een offerte met het eenmalige bedrag en de maandprijs apart, telkens excl. btw. Bewaar de goedgekeurde offerte, de factuur van de bouw en de maandelijkse of jaarlijkse facturen. Zet op elke factuur uw juiste ondernemingsnaam en ondernemingsnummer, zodat uw boekhouder de kosten zonder vragen kan verwerken.`,
    `Gebruikt u de website deels privé, bijvoorbeeld voor een hobby naast uw zaak, dan is alleen het beroepsmatige deel aftrekbaar. Dat komt zelden voor bij een bedrijfswebsite, maar het is goed om te weten. Betaalt u ook voor een domeinnaam of e-mail bij een andere dienst, bewaar die facturen dan op dezelfde plaats.`,
    `Een website is geen eenmalige uitgave. De maandprijs komt elk jaar terug als kost. Hoe die kosten opgebouwd zijn, leest u in ${A('kosten', 'nl', 'terugkerende kosten van een website')}. Voor een vrij beroep met eigen regels over reclame vindt u meer op ${A('vrij', 'nl', 'een website voor een vrij beroep')}.`,
  ])]),
  art('kosten', 'nl', [PROSE('kosten-jaar', 'Zo rekent u de kost per jaar uit', [
    `Tel voor het eerste jaar het eenmalige bedrag voor de bouw op bij twaalf keer de maandprijs. Vanaf het tweede jaar blijft alleen de maandprijs over, plus eventuele losse kosten zoals e-mail bij een andere dienst. Zo ziet u wat een website u over vijf jaar kost, en kunt u offertes eerlijk naast elkaar leggen.`,
    `Let bij een offerte op wat er in de maandprijs zit en wat apart betaald wordt. Zitten back-ups en updates erin? Hoeveel aanpassingen per maand? Wat kost een extra pagina? Staat het domein op uw naam? Hoe lang loopt het contract, en wat gebeurt er als u stopt? Een lage startprijs met veel losse kosten kan op termijn duurder uitvallen dan een vaste maandprijs.`,
    `Webstudio K zet alle bedragen vooraf op papier. U krijgt na een kennismaking een vrijblijvende offerte met het eenmalige bedrag en de maandprijs. De pakketten Start, Vakman en Webshop staan met hun prijzen op ${A('prijs', 'nl', 'wat kost een website laten maken')}, voor zaken in heel België, zoals in ${A('hub', 'nl', 'Antwerpen, Gent of Brussel')}.`,
  ])]),
  art('wp', 'nl', [PROSE('wp-praktijk', 'Wat u in de praktijk merkt', [
    `Met WordPress logt u in op een beheeromgeving en past u zelf teksten, foto's of blogberichten aan. Dat is handig als u vaak iets publiceert. Daar staat tegenover dat u zelf verantwoordelijk bent voor updates, of iemand moet betalen die dat doet, en dat een fout in een plug-in de site kan stilleggen.`,
    `Bij een site op maat is er geen beheeromgeving die u moet leren. U stuurt een wijziging door en die wordt voor u online gezet. De code bevat alleen wat de site nodig heeft, waardoor ze licht blijft en vlot laadt. Voor een zaak die af en toe iets wil aanpassen, is dat vaak eenvoudiger.`,
    `Een webshop met veel producten die u dagelijks bijwerkt, vraagt dan weer een systeem waarin u zelf producten beheert. Bespreek dus vooraf hoe vaak u iets wilt aanpassen en wie dat doet. Meer over online verkopen leest u op ${A('webshop', 'nl', 'webshop laten maken')}, en over de kosten per jaar in ${A('kosten', 'nl', 'terugkerende kosten van een website')}. Webstudio K werkt voor zaken in heel België, ook in ${A('hub', 'nl', 'Leuven, Hasselt of Brugge')}.`,
  ])]),
  art('wettelijk', 'nl', [PROSE('wettelijk-check', 'Een korte controle voor uw eigen site', [
    `Loop uw website na met deze vragen. Staan uw naam of handelsnaam, het adres van uw vestiging, een e-mailadres en uw ondernemingsnummer op elke pagina, bijvoorbeeld onderaan? Vermeldt u uw btw-nummer als u btw-plichtig bent? Is er een privacyverklaring die zegt welke gegevens u verzamelt, waarom en hoe lang? Vraagt de site toestemming voor cookies die niet strikt nodig zijn, met een duidelijke knop om te weigeren?`,
    `Verkoopt u online, kijk dan ook of de totale prijs met btw en de leveringskosten zichtbaar zijn voor de bestelling, of de bedenktijd uitgelegd staat en of de algemene voorwaarden vindbaar zijn. Ontbreekt er iets, pas het dan aan of laat het aanpassen. Bij een nieuwe website van Webstudio K zitten die vermeldingen er van bij het begin in. Wilt u een bestaande site laten nakijken en vernieuwen, lees dan ${A('vernieuwen', 'nl', 'website laten vernieuwen')}.`,
  ])]),
  art('inhoud', 'nl', [PROSE('inhoud-contact', 'Maak contact opnemen makkelijk', [
    `Zet een duidelijke knop naar contact of een offerte op elke pagina, niet alleen onderaan de startpagina. Toon uw telefoonnummer zo dat het op een gsm met één tik belt. Een kort formulier met een paar vragen werkt beter dan een lang formulier dat afschrikt. Vermeld ook binnen welke termijn u doorgaans antwoordt, zodat een bezoeker weet wat er volgt.`,
  ])]),
  art('gbp', 'nl', [PROSE('gbp-bijhouden', 'Houd het profiel bij', [
    `Pas uw openingsuren aan bij feestdagen en vakanties, zet af en toe nieuwe foto's online en antwoord op vragen van klanten. Een profiel dat leeft, geeft vertrouwen aan wie u voor het eerst vindt.`,
  ])]),
];

// Frans: smalle harde spatie vóór : ? ; ! zoals elders op de site
const FRP = (id, h2, ps) => PROSE(id, h2.replace(/ ([:?;!])/g, ' $1'), ps.map(p => p.replace(/ ([:?;!])(?=\s|$)/g, ' $1')));
const FR = [
  art('duur', 'fr', [
    FRP('duur-domein', 'Nom de domaine, e-mail et jour du passage', [
      `Si vous avez déjà un nom de domaine, il suit le nouveau site. Pour un domaine .be, vous demandez un code de transfert à votre registrar actuel. DNS Belgium, l’organisation qui gère le .be, fixe cette procédure pour tous les registrars. Avec ce code, le nouveau gestionnaire lance le transfert. Le domaine reste à votre nom pendant toute l’opération.`,
      `L’e-mail dépend souvent du même domaine. Nous vérifions donc d’abord où se trouvent vos boîtes mail, pour que l’e-mail continue de fonctionner quand le site change d’adresse. Ensuite seulement, nous dirigeons le domaine vers le nouveau site. Une modification DNS est en général visible partout en quelques heures, mais il faut parfois jusqu’à une journée avant que chaque fournisseur d’accès utilise les nouvelles données.`,
      `Si vous choisissez un nouveau nom de domaine, nous l’enregistrons à votre nom. Un nom en .be est actif dès que l’enregistrement est terminé, ce qui ne retarde pas le planning.`,
    ]),
    FRP('duur-google', 'Après la mise en ligne : quand Google trouve-t-il votre site ?', [
      `Être en ligne n’est pas la même chose qu’être trouvé. Google doit d’abord visiter et enregistrer vos pages. Pour un nouveau site, cela prend en général de quelques jours à quelques semaines. Nous envoyons le plan du site (sitemap) à Google Search Console, pour que Google sache quelles pages existent. Si le nouveau site remplace un ancien, nous plaçons des redirections des anciennes adresses vers les nouvelles, pour que les liens et les résultats existants continuent de fonctionner.`,
      `Les résultats locaux passent surtout par votre fiche Google Business Profile. Comment la créer et la remplir, vous le lisez dans ${A('gbp', 'fr', 'créer une fiche Google Business Profile')}. Pour monter ensuite dans les recherches de votre région, voyez notre page ${A('seo', 'fr', 'référencement SEO')}.`,
      `Après la mise en ligne, le site évolue. Une nouvelle photo, un prix qui change ou d’autres horaires : vous nous les envoyez. Les formules de Webstudio K comprennent les mises à jour, les sauvegardes et chaque mois quelques minutes de modifications. Le prix de chaque formule figure sur ${A('prijs', 'fr', 'prix d’un site internet')}.`,
    ]),
    FRP('duur-tips', 'Comment garder un planning court', [
      `Le retard vient rarement de la réalisation, mais de l’attente du contenu. Préparez donc votre logo en bonne résolution, la liste de vos services, éventuellement des photos de votre entreprise ou de votre travail, et les données obligatoires sur un site, comme votre numéro d’entreprise. Lesquelles, vous le lisez dans ${A('wettelijk', 'fr', 'mentions légales d’un site internet')}.`,
      `Désignez une seule personne qui relit les textes et décide. Pour une association ou une entreprise avec plusieurs associés, cela fait gagner des jours. Envoyez vos remarques de préférence en une fois, avec la page concernée. Nous traitons alors tout en un seul passage. Pour une boutique en ligne, comptez 3 à 4 semaines, car les produits, les paiements et l’expédition s’ajoutent. Plus d’infos sur ${A('webshop', 'fr', 'création de boutique en ligne')}.`,
    ]),
    FRP('duur-fasen', 'Ce qui se passe à chaque étape', [
      `D’abord, nous apprenons à connaître votre entreprise : ce que vous faites, pour qui, dans quelle région et ce que votre site doit apporter. Cet échange se fait par e-mail, par téléphone ou en ligne. Vient ensuite le devis, avec les pages, les fonctions et le prix. La réalisation ne commence qu’après votre accord.`,
      `Pendant la réalisation, nous rédigeons les textes à partir de l’échange et construisons les pages, avec vos photos ou des images adaptées. Vous voyez le site avant sa mise en ligne et transmettez vos remarques. Suivent les derniers contrôles : chaque formulaire fonctionne-t-il, le site se charge-t-il bien sur smartphone, les mentions légales sont-elles en bas de page, les titres sont-ils corrects pour Google ? Ensuite seulement, le site passe en ligne.`,
      `Start est en ligne sous 5 jours ouvrables et Vakman sous 10 jours ouvrables, à compter de votre accord sur le devis et du moment où nous avons tout le nécessaire. Notre approche est détaillée sur ${A('hub', 'fr', 'création de site internet dans toute la Belgique')}.`,
    ]),
  ]),
  art('zelf', 'fr', [
    FRP('zelf-tijd', 'Ce que demande vraiment un site fait soi-même', [
      `Un outil de création promet un site en un après-midi, et une première version est souvent possible. Le travail vient après : des textes qui disent ce que vous faites et pour qui, des photos qui se chargent bien sur smartphone, une structure claire par service et les mentions légales en bas de chaque page. Comptez plusieurs soirées ou week-ends, puis du temps fixe pour l’entretien.`,
      `Pensez aussi à ce que le visiteur ne voit pas. Un site doit se charger sans attente, s’afficher sur toutes les tailles d’écran et rester utilisable avec un lecteur d’écran ou un clavier seul. Pour certains services aux consommateurs, la loi européenne sur l’accessibilité s’applique depuis le 28 juin 2025, transposée en Belgique dans le Code de droit économique. Plus d’infos sur ${A('wcag', 'fr', 'site internet accessible')}.`,
      `Si vous choisissez de le faire vous-même, vérifiez que le nom de domaine est à votre nom et que vous pouvez emporter votre site si vous changez plus tard. Certains outils ne le permettent pas.`,
    ]),
    FRP('zelf-keuze', 'Quand faire créer son site est le meilleur choix', [
      `Faire créer son site est surtout utile quand votre temps est mieux investi auprès de vos clients, ou quand le site doit vraiment rapporter : demandes de devis, réservations ou ventes. Un artisan veut des appels et des demandes, un commerce veut que les visiteurs trouvent les horaires et le chemin. Un design propre, des textes simples et un bouton de contact clair font la différence.`,
      `Chez Webstudio K, un site commence à €490 HTVA pour la réalisation, plus un abonnement à partir de €29 HTVA par mois avec hébergement, sauvegardes, mises à jour et petites modifications. Vous avez d’abord une prise de contact et un devis sans engagement. Tous les montants figurent sur ${A('prijs', 'fr', 'prix d’un site internet')}, et les coûts annuels dans ${A('kosten', 'fr', 'coûts récurrents d’un site web')}.`,
      `Vous hésitez entre WordPress et un site sur mesure ? Lisez ${A('wp', 'fr', 'WordPress ou sur mesure')}. Votre site actuel ne vous convient plus ? Pensez à une ${A('vernieuwen', 'fr', 'refonte de site internet')}.`,
    ]),
    FRP('zelf-vragen', 'Cinq questions avant de décider', [
      `De combien de temps disposez-vous vraiment, pour la création mais aussi pour l’entretien l’année suivante ? Qui écrit les textes ? Avez-vous des photos de votre travail ? Le nom de domaine est-il à votre nom ? Et que doit apporter le site : des demandes, des réservations, des ventes ou surtout de la confiance ?`,
      `Si vous avez une réponse claire à la plupart de ces questions et du temps, le faire vous-même est possible. Sinon, faire créer votre site est le choix le plus serein. Un devis sans engagement vous donne le prix noir sur blanc. Pour les nouveaux entrepreneurs, voyez aussi ${A('starters', 'fr', 'site web pour nouveaux entrepreneurs')}.`,
    ]),
  ]),
  art('fiscaal', 'fr', [
    FRP('fiscaal-regels', 'Les règles qui s’appliquent', [
      `Pour l’impôt sur les revenus, il s’agit de frais professionnels. Selon l’article 49 du Code des impôts sur les revenus 1992, des frais sont déductibles s’ils sont faits pour acquérir ou conserver des revenus professionnels et si vous pouvez les justifier. Un site web pour votre entreprise entre en règle générale dans ce cadre. Conservez donc le devis, la facture de réalisation et les factures de l’abonnement avec votre comptabilité.`,
      `La création d’un site peut être une charge de l’année ou un investissement amorti sur plusieurs années. Le traitement dépend du montant et de la façon dont votre entreprise tient ses comptes. C’est votre comptable qui décide. L’abonnement pour l’hébergement, l’entretien et les mises à jour est une charge normale de l’année où vous le payez.`,
      `Pour la TVA, une règle distincte s’applique. Si vous êtes assujetti à la TVA, vous récupérez en règle générale la TVA sur les factures de votre site. Si vous relevez du régime de franchise des petites entreprises, vous ne facturez pas de TVA et ne pouvez pas récupérer la TVA sur vos achats. Depuis le 1er janvier 2025, le seuil de cette franchise est fixé à un chiffre d’affaires annuel de €25.000.`,
    ]),
    FRP('fiscaal-bronnen', 'Où vérifier', [
      `Les textes officiels et les explications de l’administration se trouvent au SPF Finances, sur Fisconetplus : le Code des impôts sur les revenus 1992 et le Code de la TVA, avec les circulaires. Le site du SPF Finances explique aussi la franchise de TVA pour les petites entreprises.`,
      `Chaque entreprise est différente. Une société ne comptabilise pas comme une entreprise individuelle, et une profession libérale a parfois ses propres règles. Montrez donc le devis à votre comptable avant de signer. Chez Webstudio K, tous les montants figurent HTVA sur le devis, avec la réalisation et l’abonnement séparés.`,
      `Le coût d’un site figure sur ${A('prijs', 'fr', 'prix d’un site internet')}, et les frais annuels dans ${A('kosten', 'fr', 'coûts récurrents d’un site web')}. Vous démarrez ? Voyez aussi ${A('starters', 'fr', 'site web pour nouveaux entrepreneurs')}.`,
    ]),
    FRP('fiscaal-praktijk', 'En pratique : ce que vous conservez', [
      `Demandez un devis avec la réalisation et l’abonnement séparés, chaque fois HTVA. Conservez le devis approuvé, la facture de réalisation et les factures mensuelles ou annuelles, avec le nom et le numéro d’entreprise corrects. Votre comptable peut ainsi les traiter sans questions.`,
      `Si vous utilisez le site en partie à titre privé, seule la part professionnelle est déductible. C’est rare pour un site d’entreprise, mais bon à savoir. Gardez aussi au même endroit les factures d’un nom de domaine ou d’un e-mail chez un autre service. Pour une profession libérale avec des règles propres sur la publicité, voyez ${A('vrij', 'fr', 'site internet pour professions libérales')}.`,
    ]),
  ]),
  art('kosten', 'fr', [
    FRP('kosten-posten', 'Les postes un par un', [
      `Le nom de domaine se paie chaque année. Pour un .be, l’enregistrement passe par un registrar, qui l’inscrit auprès de DNS Belgium. Veillez à ce que le nom soit à votre nom, et non à celui du créateur du site, pour pouvoir l’emporter si vous changez.`,
      `L’hébergement est l’endroit où se trouve votre site. Il comprend une connexion sécurisée (https), des sauvegardes et les mises à jour du logiciel. Un site non entretenu devient à terme vulnérable ou fonctionne moins bien dans les nouveaux navigateurs. Comptez donc cet entretien comme un coût fixe.`,
      `L’e-mail sur votre domaine est souvent séparé du site. Les extensions payantes, les thèmes ou un service de paiement pour une boutique en ligne reviennent aussi chaque année ou par vente.`,
    ]),
    FRP('kosten-wk', 'Ce que comprend l’abonnement chez Webstudio K', [
      `Après la réalisation, vous payez un abonnement fixe : à partir de €29 pour Start, €49 pour Vakman et €79 pour une Webshop, chaque fois HTVA. Il comprend l’hébergement, les sauvegardes, les mises à jour et chaque mois quelques minutes de modifications. Une formule dure au minimum 12 mois, ensuite elle est résiliable chaque mois. Votre nom de domaine est toujours à votre nom.`,
      `Vous savez ainsi d’avance ce qui revient chaque année, sans facture séparée pour chaque petite modification. Un travail hors abonnement, comme une nouvelle page ou une langue en plus, est discuté au préalable, avec le prix. Tous les montants figurent sur ${A('prijs', 'fr', 'prix d’un site internet')}.`,
      `La déductibilité est expliquée dans ${A('fiscaal', 'fr', 'un site web est-il fiscalement déductible')}. Pour vendre en ligne, des frais de paiement et d’expédition s’ajoutent : voyez ${A('webshop', 'fr', 'création de boutique en ligne')}.`,
    ]),
    FRP('kosten-jaar', 'Calculer le coût par an', [
      `Pour la première année, additionnez la réalisation et douze fois l’abonnement. À partir de la deuxième année, il reste l’abonnement, plus d’éventuels frais séparés comme un e-mail chez un autre service. Vous voyez ainsi le coût sur cinq ans et pouvez comparer des devis honnêtement.`,
      `Dans un devis, regardez ce que contient l’abonnement et ce qui se paie à part : sauvegardes et mises à jour, nombre de modifications par mois, prix d’une page en plus, domaine à votre nom, durée du contrat et conditions d’arrêt. Webstudio K travaille pour des entreprises dans toute la Belgique, par exemple à ${A('hub', 'fr', 'Bruxelles, Liège ou Namur')}.`,
    ]),
  ]),
  art('wp', 'fr', [
    FRP('wp-onderhoud', 'Entretien et sécurité', [
      `WordPress est le système le plus utilisé pour les sites web, avec beaucoup de connaissances et d’extensions disponibles. Cela signifie aussi que le logiciel, le thème et chaque extension demandent des mises à jour régulières. Si elles attendent, le site devient vulnérable. Prévoyez donc du temps fixe pour les mises à jour et une sauvegarde avant chaque grand changement, ou confiez cet entretien.`,
      `Chaque extension ajoute du code. Un site avec beaucoup d’extensions se charge plus lentement, surtout sur smartphone, et peut changer de comportement après une mise à jour. Si vous choisissez WordPress, limitez le nombre d’extensions et n’utilisez que des extensions encore activement maintenues.`,
    ]),
    FRP('wp-keuze', 'Comment choisir', [
      `Posez-vous trois questions. Voulez-vous modifier vous-même chaque jour des textes ou des produits ? Un système de gestion est alors pratique. Le site doit-il surtout être léger, être bien trouvé et demander peu d’entretien ? Un site sur mesure convient alors. Et qui modifie le site si vous ne le faites pas ?`,
      `Webstudio K crée des sites sur mesure, légers et conformes aux règles d’accessibilité (WCAG 2.2 AA). Les petites modifications sont comprises dans l’abonnement, vous n’avez donc aucun système à apprendre. Le prix figure sur ${A('prijs', 'fr', 'prix d’un site internet')}, et l’accessibilité est expliquée sur ${A('wcag', 'fr', 'site internet accessible')}.`,
      `Votre site WordPress est lent ou dépassé ? Une ${A('vernieuwen', 'fr', 'refonte de site internet')} garde votre nom de domaine et, quand c’est possible, vos adresses, avec des redirections pour les pages qui changent.`,
    ]),
    FRP('wp-praktijk', 'Ce que vous remarquez au quotidien', [
      `Avec WordPress, vous vous connectez à une interface de gestion et modifiez vous-même textes, photos ou articles. C’est pratique si vous publiez souvent. En contrepartie, vous êtes responsable des mises à jour, ou vous payez quelqu’un pour cela, et une erreur dans une extension peut bloquer le site.`,
      `Avec un site sur mesure, il n’y a pas d’interface à apprendre : vous envoyez une modification et elle est mise en ligne pour vous. Le code ne contient que ce dont le site a besoin. Une boutique avec beaucoup de produits mis à jour chaque jour demande en revanche un système de gestion des produits. Plus d’infos sur ${A('webshop', 'fr', 'création de boutique en ligne')} et ${A('kosten', 'fr', 'coûts récurrents d’un site web')}.`,
    ]),
  ]),
  art('wettelijk', 'fr', [
    FRP('wettelijk-webshop', 'Vous vendez en ligne ? Des règles supplémentaires s’appliquent', [
      `Qui vend à des consommateurs via une boutique en ligne relève du Livre VI du Code de droit économique. Vous indiquez le prix total TVA comprise, les frais de livraison et les moyens de paiement avant la commande. Le consommateur dispose en règle générale de 14 jours pour renoncer à l’achat, et vous expliquez comment cela fonctionne. Les conditions générales doivent être faciles à trouver.`,
      `Depuis le 28 juin 2025, la loi européenne sur l’accessibilité s’applique aussi au commerce en ligne vers les consommateurs, transposée en Belgique dans le Code de droit économique. Les micro-entreprises qui fournissent des services, avec moins de 10 personnes et un chiffre d’affaires annuel ou un total du bilan de €2 millions maximum, en sont exemptées. Plus d’infos sur ${A('wcag', 'fr', 'site internet accessible')} et ${A('webshop', 'fr', 'création de boutique en ligne')}.`,
    ]),
    FRP('wettelijk-bronnen', 'Où vérifier les règles', [
      `Les mentions obligatoires de tout site figurent au Livre XII du Code de droit économique. Le SPF Économie les explique sur son site. Pour la vie privée et les cookies, l’Autorité de protection des données (APD) est compétente et publie des explications sur le RGPD et le consentement aux cookies. Pour une profession réglementée, mentionnez aussi l’ordre ou le titre professionnel.`,
      `Sur un site de Webstudio K, votre nom, adresse, numéro d’entreprise et coordonnées figurent en bas de chaque page, avec une politique de confidentialité et un choix de cookies qui ne charge les statistiques qu’après consentement. Ce qui doit encore figurer sur un site : ${A('inhoud', 'fr', 'contenu d’un site internet')}.`,
    ]),
    FRP('wettelijk-check', 'Un contrôle de votre site en quelques questions', [
      `Votre nom ou dénomination, l’adresse de l’établissement, une adresse e-mail et le numéro d’entreprise figurent-ils sur chaque page ? Le numéro de TVA si vous êtes assujetti ? Une politique de confidentialité qui dit quelles données vous collectez, pourquoi et combien de temps ? Un choix de cookies avec un bouton clair pour refuser ?`,
      `Si vous vendez en ligne, vérifiez aussi le prix total et les frais de livraison avant la commande, le délai de rétractation et les conditions générales. Sur un nouveau site de Webstudio K, ces mentions sont prévues dès le départ. Pour faire vérifier et renouveler un site existant, voyez ${A('vernieuwen', 'fr', 'refonte de site internet')}.`,
    ]),
  ]),
  art('inhoud', 'fr', [
    FRP('inhoud-contact', 'Facilitez la prise de contact', [
      `Placez un bouton clair vers le contact ou le devis sur chaque page. Affichez votre numéro de téléphone pour qu’il appelle en un geste sur smartphone. Un formulaire court fonctionne mieux qu’un long. Indiquez aussi dans quel délai vous répondez en général.`,
    ]),
  ]),
];
const EN = [
  art('duur', 'en', [
    PROSE('duur-domein', 'Domain name, email and the day of the switch', [
      `If you already have a domain name, it moves to the new website. For a .be domain, you ask your current registrar for a transfer code. DNS Belgium, the organisation behind .be, sets this procedure for all registrars. With that code the new provider starts the transfer, and the domain stays in your name throughout.`,
      `Email often runs on the same domain. So we first check where your mailboxes are, so email keeps working when the website moves. Only then do we point the domain to the new site. A DNS change is usually visible everywhere within a few hours, although it can take up to a day before every internet provider uses the new details.`,
      `If you choose a new domain name, we register it in your name. A .be name is active as soon as the registration is complete, so it does not delay the schedule.`,
    ]),
    PROSE('duur-google', 'After launch: when does Google find your site?', [
      `Being online is not the same as being found. Google first has to visit and index your pages. For a new site this usually takes from a few days to a few weeks. We submit the sitemap in Google Search Console, so Google knows which pages exist. If the new site replaces an old one, we redirect the old addresses to the new ones, so existing links and search results keep working.`,
      `Local results mostly come through your Google Business Profile. How to create and complete it is explained in ${A('gbp', 'en', 'create a Google Business Profile')}. To rank higher in your area afterwards, see ${A('seo', 'en', 'SEO services')}.`,
      `After launch your site keeps changing. A new photo, a price change or different opening hours: you simply send them to us. The Webstudio K packages include updates, backups and a number of minutes of changes each month. The price of each package is on ${A('prijs', 'en', 'website cost')}.`,
    ]),
    PROSE('duur-tips', 'How to keep the schedule short', [
      `Most delays come from waiting for content, not from the build. Prepare your logo in good resolution, the list of your services, photos of your business or work if you have them, and the details a website must show, such as your company number. Which details those are is explained in ${A('wettelijk', 'en', 'legal information on a website in Belgium')}.`,
      `Appoint one person who reviews the copy and decides. For an association or a business with several partners, that saves days. Send your comments in one go, with the page they refer to, so everything is handled in one round. An online shop takes 3 to 4 weeks, because products, payments and shipping are added. More on ${A('webshop', 'en', 'online shop design')}.`,
    ]),
    PROSE('duur-fasen', 'What happens in each phase', [
      `First we get to know your business: what you do, for whom, in which area and what your website needs to achieve. That conversation takes place by email, phone or online. Then comes the quote, with the pages, the features and the price. The build only starts once you approve it.`,
      `During the build we write the copy based on our conversation and set up the pages, with your photos or suitable images. You see the site before it goes live and send your comments. Then come the final checks: does every form work, does the site load well on a phone, are the legal details at the bottom, are the titles right for Google? Only then does the site go live.`,
      `Start goes online within 5 working days and Vakman within 10 working days, counted from your approval of the quote and the moment we have everything needed. Our approach is explained on ${A('hub', 'en', 'website design across Belgium')}.`,
    ]),
  ]),
  art('zelf', 'en', [
    PROSE('zelf-tijd', 'What building it yourself really takes', [
      `A website builder promises you can be online in an afternoon, and a first version often works. The real work comes after: copy that says what you do and for whom, photos that load well on a phone, a clear structure per service and the legal details at the bottom of each page. Expect several evenings or weekends, and then regular time for maintenance.`,
      `Think about what visitors do not see, too. A site has to load without delay, work on every screen size and stay usable for people who use a screen reader or only a keyboard. For a number of services to consumers, the European Accessibility Act has applied since 28 June 2025, implemented in Belgium in the Code of Economic Law. More on ${A('wcag', 'en', 'accessible website')}.`,
      `If you do build it yourself, check that the domain name is in your own name and that you can take your site with you if you switch later. Some builders do not allow that.`,
    ]),
    PROSE('zelf-keuze', 'When having it built is the better choice', [
      `Having a website built pays off mainly when your time is better spent on customers, or when the site has to deliver: quote requests, bookings or sales. A tradesperson wants calls and requests, a shop wants visitors to find opening hours and directions. A design of its own, copy in plain language and a clear contact button make the difference.`,
      `At Webstudio K a website starts from €490 excl. VAT for the build, plus a monthly fee from €29 excl. VAT with hosting, backups, updates and small changes. You first get an introductory conversation and a no-obligation quote. All amounts are on ${A('prijs', 'en', 'website cost')}, and the yearly costs in ${A('kosten', 'en', 'recurring website costs')}.`,
      `Torn between WordPress and a custom site? Read ${A('wp', 'en', 'WordPress or a custom website')}. Is your current site no longer working for you? Consider a ${A('vernieuwen', 'en', 'website redesign')}.`,
    ]),
    PROSE('zelf-vragen', 'Five questions before you decide', [
      `How much time do you really have, for the build and for maintenance the year after? Who writes the copy? Do you have photos of your work? Is the domain name in your name? And what should the site deliver: requests, bookings, sales or mainly trust?`,
      `If you have a clear answer to most of these and time to spare, building it yourself can work. If not, having it built is the calmer choice. A no-obligation quote gives you the price in writing. For new businesses, see ${A('starters', 'en', 'a website for startups')}.`,
    ]),
  ]),
  art('fiscaal', 'en', [
    PROSE('fiscaal-regels', 'Which rules apply', [
      `For income tax, this is about business expenses. Under article 49 of the 1992 Income Tax Code, expenses are deductible if you incur them to acquire or keep business income and if you can prove them. A website for your business generally falls under this. Keep the quote, the invoice for the build and the invoices for the monthly fee with your accounts.`,
      `Building a website can be an expense of the year or an investment you depreciate over several years. Which treatment fits depends on the amount and on how your business keeps its accounts. Your accountant decides. The monthly fee for hosting, maintenance and updates is a normal expense of the year in which you pay it.`,
      `VAT follows a separate rule. If you are VAT-registered, you can generally recover the VAT on the invoices for your website. If you use the small business VAT exemption, you do not charge VAT and cannot recover VAT on your purchases. Since 1 January 2025 the threshold for that exemption is an annual turnover of €25,000.`,
    ]),
    PROSE('fiscaal-bronnen', 'Where to check', [
      `The official texts and the tax administration's guidance are published by the FPS Finance on Fisconetplus: the 1992 Income Tax Code and the VAT Code, with the related circulars. The FPS Finance website also explains the VAT exemption for small businesses.`,
      `Every business is different. A company keeps its accounts differently from a sole trader, and some liberal professions have their own rules. So show the quote to your accountant before you sign. At Webstudio K all amounts on the quote are excl. VAT, with the build and the monthly fee listed separately.`,
      `What a website costs is on ${A('prijs', 'en', 'website cost')}, and the yearly costs in ${A('kosten', 'en', 'recurring website costs')}. Just starting out? See ${A('starters', 'en', 'a website for startups')}.`,
    ]),
    PROSE('fiscaal-praktijk', 'In practice: what to keep', [
      `Ask for a quote with the build and the monthly fee listed separately, excl. VAT. Keep the approved quote, the invoice for the build and the monthly or yearly invoices, with your correct company name and number, so your accountant can process them without questions.`,
      `If you use the site partly for private purposes, only the business share is deductible. That is rare for a business website, but good to know. Keep invoices for a domain name or email from another service in the same place. For a liberal profession with its own advertising rules, see ${A('vrij', 'en', 'a website for liberal professions')}.`,
    ]),
  ]),
  art('kosten', 'en', [
    PROSE('kosten-posten', 'The items one by one', [
      `You pay for a domain name every year. For .be, registration runs through a registrar, which records the name with DNS Belgium. Make sure the name is in your own name, not the web builder's, so you can take it with you if you ever switch.`,
      `Hosting is where your website lives. It includes a secure connection (https), backups and software updates. A site that is not maintained becomes vulnerable over time or stops working well in new browsers, so count that care as a fixed cost.`,
      `Email on your own domain is often separate from the website. Paid plugins, themes or a payment service for an online shop also come back every year or per sale.`,
    ]),
    PROSE('kosten-wk', 'What the Webstudio K monthly fee includes', [
      `After the build you pay a fixed monthly fee: from €29 for Start, from €49 for Vakman and from €79 for a Webshop, all excl. VAT. It includes hosting, backups, updates and a number of minutes of changes each month. A package runs for at least 12 months and can then be cancelled monthly. Your domain name is always in your own name.`,
      `So you know in advance what comes back every year, without separate invoices for every small change. Work outside the monthly fee, such as a new page or an extra language, is agreed in advance, with the price. All amounts are on ${A('prijs', 'en', 'website cost')}.`,
      `Whether the costs are tax-deductible is explained in ${A('fiscaal', 'en', 'is a website tax-deductible in Belgium')}. Selling online adds payment and shipping costs: see ${A('webshop', 'en', 'online shop design')}.`,
    ]),
    PROSE('kosten-jaar', 'How to work out the cost per year', [
      `For the first year, add the one-off build to twelve times the monthly fee. From the second year, only the monthly fee remains, plus any separate costs such as email from another service. That shows you the cost over five years and lets you compare quotes fairly.`,
      `In a quote, check what the monthly fee includes and what is paid separately: backups and updates, how many changes per month, the price of an extra page, whether the domain is in your name, the contract term and what happens if you stop. Webstudio K works for businesses across Belgium, for example in ${A('hub', 'en', 'Brussels, Ghent or Antwerp')}.`,
    ]),
  ]),
  art('wp', 'en', [
    PROSE('wp-onderhoud', 'Maintenance and security', [
      `WordPress is the most widely used system for websites, with a lot of knowledge and extensions available. It also means the software, the theme and every plugin need regular updates. If they are left, the site becomes vulnerable. Plan regular time for updates and a backup before every major change, or have that maintenance done for you.`,
      `Every plugin adds code. A site with many extensions loads more slowly, especially on a phone, and can behave differently after an update. If you choose WordPress, keep the number of plugins limited and only use extensions that are still actively maintained.`,
    ]),
    PROSE('wp-keuze', 'How to choose', [
      `Ask yourself three questions. Do you want to edit copy or products yourself every day? Then a content management system is useful. Does the site mainly need to be light, be found well and need little maintenance? Then a custom site fits. And who edits the site if you do not?`,
      `Webstudio K builds custom sites, light and in line with the accessibility guidelines (WCAG 2.2 AA). Small changes are included in the monthly fee, so you do not need to learn a system. The price is on ${A('prijs', 'en', 'website cost')}, and accessibility is explained on ${A('wcag', 'en', 'accessible website')}.`,
      `Is your WordPress site slow or outdated? A ${A('vernieuwen', 'en', 'website redesign')} keeps your domain name and, where possible, your addresses, with redirects for the pages that move.`,
    ]),
    PROSE('wp-praktijk', 'What you notice in practice', [
      `With WordPress you log in to an admin area and edit copy, photos or blog posts yourself. That is handy if you publish often. In return you are responsible for updates, or you pay someone to do them, and an error in a plugin can take the site down.`,
      `With a custom site there is no admin area to learn: you send a change and it is put online for you. The code contains only what the site needs. An online shop with many products updated daily does need a system to manage products. More on ${A('webshop', 'en', 'online shop design')} and ${A('kosten', 'en', 'recurring website costs')}.`,
    ]),
  ]),
  art('wettelijk', 'en', [
    PROSE('wettelijk-webshop', 'Selling online? Extra rules apply', [
      `If you sell to consumers through an online shop, Book VI of the Code of Economic Law applies. You show the total price including VAT, the delivery costs and the payment options before the order. Consumers generally have 14 days to withdraw from the purchase, and you explain how that works. Terms and conditions must be easy to find.`,
      `Since 28 June 2025 the European Accessibility Act also applies to e-commerce aimed at consumers, implemented in Belgium in the Code of Economic Law. Micro-enterprises providing services, with fewer than 10 staff and an annual turnover or balance sheet total of no more than €2 million, are exempt. More on ${A('wcag', 'en', 'accessible website')} and ${A('webshop', 'en', 'online shop design')}.`,
    ]),
    PROSE('wettelijk-bronnen', 'Where to check the rules', [
      `The mandatory details for every website are set out in Book XII of the Code of Economic Law, and the FPS Economy explains them on its website. For privacy and cookies, the Data Protection Authority (GBA/APD) is responsible and publishes guidance on the GDPR and on cookie consent. For a regulated profession, also state the professional body or title.`,
      `On a Webstudio K website, your name, address, company number and contact details are at the bottom of every page, with a privacy statement and a cookie choice that only loads statistics after consent. What else belongs on a site: ${A('inhoud', 'en', 'what to put on a website')}.`,
    ]),
    PROSE('wettelijk-check', 'A short check of your own site', [
      `Are your name or trading name, the address of your establishment, an email address and your company number on every page? Your VAT number if you are registered? A privacy statement saying which data you collect, why and for how long? A cookie choice with a clear button to refuse?`,
      `If you sell online, also check the total price and delivery costs before the order, the withdrawal period and the terms and conditions. A new Webstudio K website includes these details from the start. To have an existing site checked and renewed, see ${A('vernieuwen', 'en', 'website redesign')}.`,
    ]),
  ]),
  art('inhoud', 'en', [
    PROSE('inhoud-diensten', 'A page per service, and why it helps', [
      `Put each important service on a page of its own, with a clear title. A visitor searching for "bathroom renovation" wants to land on that service straight away, not on a long list. Google can also show such a page for the right search. On each page, say what the service involves, who it is for, where you work and how to request a quote.`,
      `If you work in several municipalities, name them in plain sentences, with photos of work in that area. Webstudio K builds websites for businesses across Belgium, for example in ${A('hub', 'en', 'Brussels, Ghent and Antwerp')}. There are separate pages for tradespeople, shops and hospitality, such as ${A('vakmensen', 'en', 'websites for tradespeople')}.`,
    ]),
  ]),
  art('gbp', 'en', [
    PROSE('gbp-website', 'Profile and website work together', [
      `Your Google Business Profile and your website work best together. Link to your website in the profile, and show the same name, address and phone number on your website as in the profile. A visitor arriving from Google Maps wants to find your services, prices and a way to get in touch straight away. More on ${A('hub', 'en', 'website design across Belgium')} or ${A('seo', 'en', 'SEO services')}.`,
    ]),
  ]),
];

export default [...NL, ...NL2, ...FR, ...EN];
