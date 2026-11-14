import type { Language } from '../i18n/LanguageContext';
import type { DemoSlug, RegionSlug, SectorSlug } from './webstudioData';

export interface SectorPageData {
  slug: SectorSlug;
  name: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  introParagraphs: string[];
  whatClientsLookForTitle: string;
  whatClientsLookForBody: string;
  features: { title: string; body: string }[];
  specialSectionTitle: string;
  specialSectionParagraphs: string[];
  recommendedPackage: 'Start' | 'Vakman' | 'Webshop';
  demoSlug?: DemoSlug;
  demoLabel?: string;
  relatedSectors: SectorSlug[];
  faqs: { question: string; answer: string }[];
}

export interface RegionPageData {
  slug: RegionSlug;
  city: string;
  regionLabel: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  introParagraphs: string[];
  localContextTitle: string;
  localContextParagraphs: string[];
  localHighlights: { title: string; body: string }[];
  nearbyRegions: RegionSlug[];
  faqs: { question: string; answer: string }[];
}

export const SECTOR_PAGES_NL: Record<SectorSlug, SectorPageData> = {
  'website-horeca': {
    slug: 'website-horeca',
    name: 'Horeca',
    breadcrumb: 'Website voor horeca',
    eyebrow: 'Horeca · Restaurants, cafés & bistro’s',
    title: 'Een website voor uw restaurant of café',
    subtitle:
      'Gasten willen uw kaart en openingsuren zien en meteen een tafel reserveren.',
    introParagraphs: [
      'Webstudio K maakt websites voor horeca die op elk scherm — vooral op de smartphone onderweg — vlot leesbaar zijn.',
      'Eerst bouwen wij gratis een demo van uw zaak, zodat u meteen ziet hoe uw menu en reservaties eruitzien.',
    ],
    whatClientsLookForTitle: 'Wat gasten als eerste willen zien',
    whatClientsLookForBody:
      'Gasten zoeken wat u serveert, wanneer u open bent, hoe zij een tafel reserveren en waar ze kunnen parkeren. Op uw website staan die antwoorden vooraan.',
    features: [
      {
        title: 'Uw kaart of menu als leesbare tekst',
        body: 'Geen onleesbare pdf-menu’s waar u op een gsm moet inzoomen: gerechten, dranken en suggesties staan overzichtelijk als echte webtekst.',
      },
      {
        title: 'Openingsuren & sluitingsdagen',
        body: 'Dagen, keukenuren en uitzonderlijke sluitingsdagen staan altijd duidelijk in beeld.',
      },
      {
        title: 'Tafel reserveren',
        body: 'In het pakket Vakman koppelen wij uw bestaande reservatiesysteem of zetten wij een overzichtelijk reservatieformulier klaar.',
      },
      {
        title: 'Bellen of route in één tik',
        body: 'Telefoonnummer, adres en routelink staan binnen duimbereik voor gasten die onderweg zoeken.',
      },
      {
        title: 'Terras, groepen & feesten',
        body: 'Aparte aandacht voor groepsmenu’s, verhuur of uw zomerterras zodat aanvragen gericht binnenkomen.',
      },
    ],
    specialSectionTitle: 'Waarom een menukaart in tekst beter werkt dan een pdf',
    specialSectionParagraphs: [
      'Een pdf op een smartphone dwingt gasten om te knijpen en te schuiven. Bovendien lezen Google en AI-zoekmachines echte webtekst op uw pagina veel beter dan een ingescande kaart.',
      'Verandert uw seizoensmenu of suggestie? U mailt de nieuwe gerechten door en wij passen uw kaart aan binnen uw maandelijkse minuten.',
    ],
    recommendedPackage: 'Vakman',
    demoSlug: 'horeca-voorbeeld',
    demoLabel: 'Bekijk het horeca-voorbeeld: Bistro Tilvaar',
    relatedSectors: ['website-winkel', 'website-kapsalon', 'website-starters'],
    faqs: [
      {
        question: 'Kan mijn bestaand reservatiesysteem gekoppeld worden?',
        answer:
          'Ja. In het pakket Vakman koppelen wij de boekingsknop of -widget van uw reservatiesysteem naadloos aan uw website.',
      },
      {
        question: 'Hoe snel worden wijzigingen aan de menukaart aangepast?',
        answer:
          'U stuurt uw nieuwe suggesties, prijzen of feestdagenuren door per mail en wij passen dit aan binnen uw maandelijkse aanpassingsminuten.',
      },
    ],
  },
  'website-winkel': {
    slug: 'website-winkel',
    name: 'Winkels',
    breadcrumb: 'Website voor winkels',
    eyebrow: 'Winkels · Lokale handel & speciaalzaken',
    title: 'Een website voor uw winkel',
    subtitle:
      'Klanten willen weten wat u verkoopt, wanneer u open bent en hoe zij bestellen of langskomen.',
    introParagraphs: [
      'Wie onderweg of in het weekend zoekt naar een speciaalzaak of lokale winkel, kijkt eerst op de smartphone of u open bent en of u het gewenste aanbod in huis hebt.',
      'U start met een duidelijke etalage-website en kunt op elk moment uitbreiden naar een volwaardige webshop.',
    ],
    whatClientsLookForTitle: 'Wat winkelklanten willen zien',
    whatClientsLookForBody:
      'Klanten zoeken uw assortiment, merken, openingsuren, parkeertips en een snelle manier om iets te reserveren of te bestellen.',
    features: [
      {
        title: 'Overzicht van uw assortiment',
        body: 'Productgroepen en sterke merken overzichtelijk gepresenteerd met korte, heldere beschrijvingen.',
      },
      {
        title: 'Openingsuren & koopzondagen',
        body: 'Altijd zichtbaar bovenaan of onderaan, inclusief speciale openingsuren tijdens feestdagen of solden.',
      },
      {
        title: 'Contact & afhalen in één tik',
        body: 'Bellen, mailen of vragen of iets op voorraad is gaat zonder drempel.',
      },
      {
        title: 'Optioneel uitbreiden naar webshop',
        body: 'Wilt u ook online verkopen en laten afrekenen? Dan sluit het pakket Webshop (tot 50 producten) naadloos aan.',
      },
      {
        title: 'Lokale vindbaarheid in Google Maps',
        body: 'Correct ingevuld Google Bedrijfsprofiel zodat buurtbewoners en bezoekers u meteen vinden.',
      },
    ],
    specialSectionTitle: 'Eerst een etalage-site of meteen een webshop?',
    specialSectionParagraphs: [
      'Veel lokale winkels starten met het pakket Start of Vakman om hun aanbod, openingsuren en bereikbaarheid scherp in beeld te brengen.',
      'Wilt u later specifieke producten, geschenkpakketten of seizoensartikelen online verkopen, dan bouwen wij uw site vlot uit naar het Webshop-pakket.',
    ],
    recommendedPackage: 'Start',
    demoSlug: 'webshop-voorbeeld',
    demoLabel: 'Bekijk het webshop-voorbeeld: Vennebrand',
    relatedSectors: ['website-horeca', 'website-starters', 'website-kapsalon'],
    faqs: [
      {
        question: 'Kan ik later mijn winkelwebsite uitbreiden met een webshop?',
        answer:
          'Zeker. U start met Start of Vakman en schakelt op elk gewenst moment over naar Webshop zonder opnieuw te moeten beginnen.',
      },
      {
        question: 'Hoe werkt online betalen in het Webshop-pakket?',
        answer:
          'Klanten betalen veilig met Bancontact, bankkaart of kredietkaart, en wij stellen verzendtarieven en btw-regels voor u in.',
      },
    ],
  },
  'website-kapsalon': {
    slug: 'website-kapsalon',
    name: 'Kapsalons & Barbershops',
    breadcrumb: 'Website voor kapsalons',
    eyebrow: 'Salons · Kappers, barbiers & schoonheid',
    title: 'Een website voor uw kapsalon of barbershop',
    subtitle:
      'De afspraakknop, uw behandelingen, beelden van uw werk en de openingsuren meteen binnen handbereik.',
    introParagraphs: [
      'De meeste bezoekers openen de website van een kapsalon, schoonheidssalon of barbier op hun smartphone tussen twee bezigheden door.',
      'Een vaste klant wil meteen een nieuw tijdslot vastleggen; een nieuwe klant kijkt eerst naar uw stijl en behandelingen.',
    ],
    whatClientsLookForTitle: 'Wat klanten zoeken op de site van een salon',
    whatClientsLookForBody:
      'Duidelijke tarieven per behandeling, foto’s die de sfeer van het salon tonen en een prominente knop om direct online een afspraak te boeken.',
    features: [
      {
        title: 'Afspraakknop op elke pagina',
        body: 'Op de smartphone altijd zichtbaar binnen duimbereik, gekoppeld aan uw bestaande boekingstool in het pakket Vakman.',
      },
      {
        title: 'Behandelingen & prijslijst',
        body: 'Overzichtelijke indeling voor snit, kleuren, balayage, baardverzorging of gelaatsverzorging met heldere vanaf-prijzen.',
      },
      {
        title: 'Sfeerbeelden van kapsels & salon',
        body: 'Scherpe foto’s die razendsnel laden en meteen het vakmanschap en de stijl van uw salon tonen.',
      },
      {
        title: 'Openingsuren & bereikbaarheid',
        body: 'Duidelijk overzicht van werkdagen, avondopening en parkeermogelijkheden in de buurt.',
      },
    ],
    specialSectionTitle: 'Uw eigen agenda blijft volledig behouden',
    specialSectionParagraphs: [
      'Gebruikt u al een agenda- of boekingssysteem zoals Salonized, Treatwell, Calendly of Optios? Wij koppelen dat rechtstreeks aan uw nieuwe site.',
      'Uw klanten blijven in uw vertrouwde boekingssysteem komen en u hoeft geen nieuwe agenda aan te leren.',
    ],
    recommendedPackage: 'Vakman',
    demoSlug: 'kapsalon-voorbeeld',
    demoLabel: 'Bekijk de salon-voorbeelden: Kapsalon Ivelien, Velours & Barbier Kolvaard',
    relatedSectors: ['website-horeca', 'website-winkel', 'website-zorg'],
    faqs: [
      {
        question: 'Werkt de afspraakknop met elk boekingssysteem?',
        answer:
          'Ja, vrijwel elk gangbaar boekingssysteem heeft een rechtstreekse boekingslink of insluitbare widget die wij netjes integreren in het Vakman-pakket.',
      },
      {
        question: 'Welke voorbeeldontwerpen zijn er voor salons?',
        answer:
          'Wij bouwden drie aparte voorbeeldontwerpen: Kapsalon Ivelien (licht & persoonlijk), Velours (schoonheidssalon) en Barbier Kolvaard (donkere barbershop-stijl).',
      },
    ],
  },
  'website-vakmensen': {
    slug: 'website-vakmensen',
    name: 'Vakmensen',
    breadcrumb: 'Website voor vakmensen',
    eyebrow: 'Vakmensen · Bouw, techniek & afwerking',
    title: 'Een website voor vakmensen, van loodgieter tot dakwerker',
    subtitle:
      'Wie een vakman zoekt, wil in één oogopslag zien wat u doet, waar u werkt en hoe hij een offerte vraagt.',
    introParagraphs: [
      'Webstudio K maakt websites voor loodgieters, elektriciens, dakwerkers, schilders, schrijnwerkers en tuinaannemers in heel België.',
      'Uw klanten bekijken uw site vaak op hun smartphone, soms met een dringend probleem in huis. Uw site zet uw diensten, werkgebied en belknop direct in beeld.',
    ],
    whatClientsLookForTitle: 'Wat potentiële klanten meteen willen weten',
    whatClientsLookForBody:
      'Doet u precies dit werk, werkt u in mijn gemeente, ziet het afgewerkte werk er verzorgd uit en hoe vraag ik vlot een offerte aan?',
    features: [
      {
        title: 'Uw diensten per type werk',
        body: 'Elke specialisatie krijgt een duidelijke omschrijving zodat klanten meteen herkennen dat u hun klus uitvoert.',
      },
      {
        title: 'Afgewerkte werven in beeld',
        body: 'Foto’s van uitgevoerde werken die scherp tonen maar licht geladen worden op mobiele netwerken.',
      },
      {
        title: 'Gericht offerteformulier',
        body: 'Klanten geven kort aan om welk werk het gaat en in welke gemeente de werf ligt, zodat u gericht kunt terugbellen.',
      },
      {
        title: 'Duidelijk werkgebied',
        body: 'De gemeenten en regio’s waar u actief bent in gewone tekst vermeld voor zowel bezoekers als Google.',
      },
    ],
    specialSectionTitle: 'Geen tijd om zelf teksten of foto’s bij te werken?',
    specialSectionParagraphs: [
      'Na een kort telefoontje of bericht schrijven wij alle teksten voor uw website in heldere taal. U hoeft zelf niet achter de computer te zitten.',
      'Hebt u een nieuwe realisatie afgewerkt? Mail of stuur de foto’s door en wij plaatsen ze voor u bij uw projecten.',
    ],
    recommendedPackage: 'Vakman',
    demoSlug: 'dakwerken-hoogland',
    demoLabel: 'Bekijk het vakman-voorbeeld: Dakwerken Hoogland & Houtatelier Nethe',
    relatedSectors: ['website-schilder', 'website-tuinaannemer', 'website-starters'],
    faqs: [
      {
        question: 'Welk pakket kiezen de meeste vakmensen?',
        answer:
          'De meeste zelfstandige vakmensen kiezen Start (€490) voor een heldere basis of Vakman (€990) wanneer zij meerdere diensten, veelgestelde vragen en een volledig Google Bedrijfsprofiel willen.',
      },
      {
        question: 'Kan ik meerdere regio’s en gemeenten vermelden?',
        answer:
          'Ja, wij verwerken uw werkgebied duidelijk in uw pagina’s en in uw Google Bedrijfsprofiel zodat klanten uit die gemeenten u vinden.',
      },
    ],
  },
  'website-zorg': {
    slug: 'website-zorg',
    name: 'Zorg & Welzijn',
    breadcrumb: 'Website voor zorg en welzijn',
    eyebrow: 'Zorg & Welzijn · Praktijken, therapeuten & coaches',
    title: 'Een website voor uw praktijk in zorg en welzijn',
    subtitle:
      'Cliënten zoeken een heldere uitleg van uw behandelingen, praktische info over een afspraak en een rustige uitstraling.',
    introParagraphs: [
      'Of u nu werkt als kinesitherapeut, logopedist, psycholoog, diëtist of coach: op uw website zoeken cliënten rust, vertrouwen en duidelijke praktische afspraken.',
      'Elke site wordt getoetst aan de WCAG 2.2 AA-toegankelijkheidsrichtlijnen zodat iedere cliënt vlot de weg vindt.',
    ],
    whatClientsLookForTitle: 'Wat cliënten vooraf willen lezen',
    whatClientsLookForBody:
      'Een menselijke uitleg bij uw aanpak, praktische info rond tarieven, terugbetaling, wachttijden en hoe een eerste kennismaking verloopt.',
    features: [
      {
        title: 'Behandelingen in toegankelijke taal',
        body: 'Uitleg zonder vakjargon zodat cliënten en verwijzers meteen begrijpen waarbij u helpt.',
      },
      {
        title: 'Tarieven, terugbetaling & voorschrift',
        body: 'Duidelijk overzicht van consultduur, tarief, eventuele mutualiteitstegemoetkoming en annuleringsvoorwaarden.',
      },
      {
        title: 'Afspraak maken of aanmelden',
        body: 'Koppeling met uw praktijkagenda in Vakman of een rustig, privacyvriendelijk contactformulier.',
      },
      {
        title: 'Toegankelijk (WCAG 2.2 AA)',
        body: 'Hoog contrast, duidelijke lettergroottes en toetsenbordbediening vanaf de basis ingebouwd.',
      },
    ],
    specialSectionTitle: 'Rust, privacy en transparantie',
    specialSectionParagraphs: [
      'In zorg en welzijn wil een bezoeker geen schreeuwerige marketing, maar kalmte en duidelijkheid. Wij stemmen kleurgebruik en typografie af op het karakter van uw praktijk.',
      'We vragen via het contactformulier alleen de strikt noodzakelijke gegevens en voorzien een duidelijke privacyverklaring.',
    ],
    recommendedPackage: 'Vakman',
    relatedSectors: ['website-vrij-beroep', 'website-kapsalon', 'website-vereniging'],
    faqs: [
      {
        question: 'Kan mijn online praktijkagenda gekoppeld worden?',
        answer:
          'Ja, in het pakket Vakman koppelen wij uw externe praktijkagenda rechtstreeks aan de afspraakknop.',
      },
      {
        question: 'Voldoet de website aan digitale toegankelijkheid?',
        answer:
          'Ja, al onze websites worden gebouwd volgens de WCAG 2.2 AA-normen voor leesbaarheid, contrast en schermlezers.',
      },
    ],
  },
  'website-vrij-beroep': {
    slug: 'website-vrij-beroep',
    name: 'Vrije beroepen',
    breadcrumb: 'Website voor vrije beroepen',
    eyebrow: 'Vrije beroepen · Adviseurs, boekhouders & architecten',
    title: 'Een website voor uw vrij beroep',
    subtitle:
      'Cliënten willen begrijpen wat u doet, voor wie u werkt en hoe zij een gesprek plannen.',
    introParagraphs: [
      'Webstudio K bouwt sobere, heldere websites voor advocaten, boekhouders, architecten, landmeters, consultants en andere vrije beroepen.',
      'Geen overbodige franje, maar overzichtelijke pagina’s, sterke leesbaarheid en alle wettelijke vermeldingen netjes op hun plaats.',
    ],
    whatClientsLookForTitle: 'Wat cliënten verwachten',
    whatClientsLookForBody:
      'Heldere uitleg bij uw expertises, een indruk van hoe een samenwerking verloopt en een directe manier om een afspraak te vragen.',
    features: [
      {
        title: 'Expertises in gewone taal',
        body: 'Elke dienst krijgt een eigen gestructureerde toelichting zonder overbodig vakjargon.',
      },
      {
        title: 'Werkwijze & eerste gesprek',
        body: 'Leg vooraf uit hoe het eerste gesprek verloopt en welke documenten een cliënt meebrengt.',
      },
      {
        title: 'Sobere, professionele vormgeving',
        body: 'Verzorgde typografie en rustige vlakken die vertrouwen uitstralen.',
      },
      {
        title: 'Wettelijke beroepsvermeldingen',
        body: 'Correcte vermelding van ondernemingsnummer, beroepstitel, orde/instituut en deontologische code.',
      },
    ],
    specialSectionTitle: 'Wettelijke vermeldingen voor gereglementeerde beroepen',
    specialSectionParagraphs: [
      'Het Wetboek van economisch recht vraagt bij gereglementeerde beroepen om bijkomende gegevens zoals uw beroepstitel, de beroepsvereniging of toezichthouder en de verwijzing naar de beroepsregels.',
      'Wij zorgen ervoor dat deze gegevens overzichtelijk in de voettekst of op een contactpagina staan, zodat uw website juridisch klopt.',
    ],
    recommendedPackage: 'Start',
    relatedSectors: ['website-zorg', 'website-starters', 'website-vakmensen'],
    faqs: [
      {
        question: 'Welke wettelijke vermeldingen plaatsen jullie op de site?',
        answer:
          'Naast naam, adres, e-mail en ondernemingsnummer vermelden wij indien van toepassing rechtsvorm, RPR, beroepsvereniging en toezichthouder.',
      },
      {
        question: 'Kunnen er meerdere vennoten of medewerkers op de website staan?',
        answer:
          'Zeker. Wij voorzien een overzichtelijke teampagina of blok met ieders specialisatie en rechtstreeks contact.',
      },
    ],
  },
  'website-vereniging': {
    slug: 'website-vereniging',
    name: 'Verenigingen & vzw’s',
    breadcrumb: 'Website voor verenigingen',
    eyebrow: 'Verenigingen · Clubs, sport, cultuur & vzw’s',
    title: 'Een website laten maken voor uw vereniging of vzw',
    subtitle:
      'Leden en nieuwe mensen willen meteen zien wat u doet, wanneer de volgende activiteit is en hoe ze lid worden.',
    introParagraphs: [
      'Webstudio K maakt overzichtelijke websites voor sportclubs, culturele verenigingen, jeugdbewegingen, hobbyclubs en vzw’s.',
      'Eerst bouwen wij gratis een demo die u zonder verplichtingen aan het volledige bestuur kunt voorstellen.',
    ],
    whatClientsLookForTitle: 'Een website die blijft werken als het bestuur wisselt',
    whatClientsLookForBody:
      'Bij veel verenigingen bouwt één vrijwilliger de website. Stopt die persoon, dan blijft de agenda van vorig jaar staan. Bij ons mailt de secretaris of voorzitter wijzigingen door en zetten wij ze online.',
    features: [
      {
        title: 'Activiteiten & kalender',
        body: 'Komende activiteiten staan bovenaan met datum, uur, locatie en korte uitleg. Voorbije activiteiten ruimen wij op.',
      },
      {
        title: 'Lid worden of inschrijven',
        body: 'Een eenvoudig formulier om lid te worden of in te schrijven voor een activiteit, eventueel met een betaalknop in Vakman.',
      },
      {
        title: 'Nieuws, verslagen & foto’s',
        body: 'U stuurt ons korte verslagen, uitslagen of foto’s van activiteiten door en wij werken ze bij.',
      },
      {
        title: 'Bestuur, lokaal & sponsors',
        body: 'Duidelijk aanspreekpunt zonder privégegevens te hoeven tonen, route naar uw lokaal/terrein en een nette sponsorplek.',
      },
    ],
    specialSectionTitle: 'Geen verloren wachtwoorden of achterstallig onderhoud meer',
    specialSectionParagraphs: [
      'In de maandprijs van Start zitten 15 minuten aanpassingen per maand, en in Vakman 30 minuten. Wisselt het bestuur van de vzw, dan geeft u ons simpelweg de nieuwe contactpersoon door.',
      'Uw .be-domeinnaam blijft steeds geregistreerd op naam van de vereniging.',
    ],
    recommendedPackage: 'Start',
    relatedSectors: ['website-starters', 'website-zorg', 'website-horeca'],
    faqs: [
      {
        question: 'Kunnen wij vooraf een demo aan het bestuur tonen?',
        answer:
          'Ja! Wij bouwen eerst een vrijblijvend voorbeeld op maat van uw vereniging zodat het hele bestuur kan meekijken voor u beslist.',
      },
      {
        question: 'Wat als onze club meerdere locaties of afdelingen heeft?',
        answer:
          'Dan krijgt elke locatie of afdeling een duidelijk eigen overzicht met trainingstijden of contactgegevens.',
      },
    ],
  },
  'website-starters': {
    slug: 'website-starters',
    name: 'Starters',
    breadcrumb: 'Website voor starters',
    eyebrow: 'Starters · Net begonnen of in opstart',
    title: 'Een website voor starters',
    subtitle:
      'U start of bent net gestart en wilt een duidelijke, betaalbare website zonder technisch gedoe.',
    introParagraphs: [
      'Als starter wilt u snel en geloofwaardig vindbaar zijn zonder duizenden euro’s uit te geven of weken te verliezen aan een zelfbouwpakket.',
      'Met het Start-pakket (€490 eenmalig + €29/maand excl. btw) staat uw website binnen 5 werkdagen online en groeit ze later probleemloos met u mee.',
    ],
    whatClientsLookForTitle: 'Wat u bij de start echt nodig hebt',
    whatClientsLookForBody:
      'Een heldere uitleg van wat u doet, voor wie, in welke streek u werkt en hoe klanten u vlot bereiken. Meer hoeft het in het begin niet te zijn.',
    features: [
      {
        title: 'Binnen 5 werkdagen online',
        body: 'Geen maandenlange trajecten: na goedkeuring van uw gratis demo zetten wij alles snel en netjes online.',
      },
      {
        title: 'Teksten door ons geschreven',
        body: 'U hoeft niet naar een leeg blad te staren; na een kort gesprek schrijven wij de teksten van uw startwebsite.',
      },
      {
        title: 'Ruimte om later te groeien',
        body: 'Extra pagina’s voegt u later toe vanaf €79/pagina, of u stapt vlot over naar Vakman of Webshop.',
      },
      {
        title: 'Google Bedrijfsprofiel-basis',
        body: 'Hulp bij het juist opzetten van uw zakelijke Google-vermelding vanaf dag één.',
      },
    ],
    specialSectionTitle: 'Ondernemingsnummer en wettelijke gegevens',
    specialSectionParagraphs: [
      'In België moet elke bedrijfswebsite verplicht uw ondernemingsnaam, vestigingsadres, e-mailadres en ondernemingsnummer (en bij een vennootschap ook rechtsvorm en RPR) vermelden.',
      'Wacht u nog op uw KBO-inschrijving bij het ondernemingsloket? Geen probleem: wij bouwen de gratis demo alvast klaar en voegen uw ondernemingsnummer toe vlak voor lancering.',
    ],
    recommendedPackage: 'Start',
    relatedSectors: ['website-vakmensen', 'website-winkel', 'website-vrij-beroep'],
    faqs: [
      {
        question: 'Kan ik al een demo aanvragen als mijn ondernemingsnummer nog niet actief is?',
        answer:
          'Zeker. We maken de gratis demo al op basis van uw plannen en zetten uw KBO- en btw-nummer in de voettekst zodra het geactiveerd is.',
      },
      {
        question: 'Is mijn website fiscaal aftrekbaar als startende ondernemer?',
        answer:
          'Ja, een zakelijke website geldt in België doorgaans als beroepskost (investering/afschrijving voor de bouw en jaarlijkse kost voor hosting/onderhoud).',
      },
    ],
  },
  'website-schilder': {
    slug: 'website-schilder',
    name: 'Schilders',
    breadcrumb: 'Website voor schilders',
    eyebrow: 'Schilders · Binnen- & buitenschilderwerk',
    title: 'Een website voor uw schildersbedrijf, met uw werk vooraan',
    subtitle:
      'Wie zijn huis wil laten schilderen, bekijkt eerst wat u eerder afwerkte.',
    introParagraphs: [
      'Een strakke gevel, een rustige living of een trappenhal die er weer fris bijligt toont meteen wat u kunt.',
      'Webstudio K maakt websites voor schilders en schildersbedrijven met uw realisaties vooraan en een vlotte offerteaanvraag.',
    ],
    whatClientsLookForTitle: 'Wat iemand zoekt die een schilder nodig heeft',
    whatClientsLookForBody:
      'Een particulier wil weten of u binnen- of buitenwerk doet, of de afwerking strak is en of u tot in zijn gemeente komt. Een aannemer let op stiptheid.',
    features: [
      {
        title: 'Binnen- & buitenschilderwerk apart',
        body: 'Muren, plafonds, ramen, deuren en gevels krijgen elk een eigen duidelijke plek.',
      },
      {
        title: 'Afgewerkte werven & voor/na-foto’s',
        body: 'Scherpe galerij van uw schilderwerk die snel laadt op smartphone en computer.',
      },
      {
        title: 'Behang, decoratie & kleuradvies',
        body: 'Aparte vermelding van vliesbehang, kalkverf, microtopping of kleuradvies aan huis.',
      },
      {
        title: 'Gerichte offerteaanvraag',
        body: 'Vraagt meteen naar binnen/buitenwerk, type woning en gemeente zodat u gericht een plaatsbezoek plant.',
      },
    ],
    specialSectionTitle: 'Particulier, nieuwbouw of renovatie',
    specialSectionParagraphs: [
      'Een gezin dat de woonkamer wil opfrissen zoekt iets anders dan een bouwheer die een nieuwbouw laat afwerken. Wij structureren uw website zodat elke klantgroep zich meteen aangesproken voelt.',
    ],
    recommendedPackage: 'Vakman',
    demoSlug: 'kleurwerk-voorbeeld',
    demoLabel: 'Bekijk het schilder-voorbeeld: Atelier Kleurwerk',
    relatedSectors: ['website-vakmensen', 'website-tuinaannemer', 'website-starters'],
    faqs: [
      {
        question: 'Kan ik later extra foto’s van nieuwe werven laten bijzetten?',
        answer:
          'Ja, u mailt de foto’s door en wij voegen ze netjes toe aan uw galerij binnen uw maandelijkse aanpassingsminuten.',
      },
    ],
  },
  'website-tuinaannemer': {
    slug: 'website-tuinaannemer',
    name: 'Tuinaannemers & hoveniers',
    breadcrumb: 'Website voor tuinaannemers',
    eyebrow: 'Tuin · Tuinaanleg, onderhoud & opritten',
    title: 'Een website voor tuinaannemers en hoveniers, van aanleg tot onderhoud',
    subtitle:
      'Wie een nieuwe tuin, terras of oprit plant, wil eerst zien wat u eerder aanlegde.',
    introParagraphs: [
      'Een tuinbedrijf krijgt doorgaans twee heel verschillende soorten aanvragen: klanten die een volledig nieuwe tuin of terras plannen, en klanten die een vast jaarlijks onderhoud of snoeiwerk zoeken.',
      'Uw website geeft elk van hen een duidelijke eigen ingang, zodat niemand verloren loopt.',
    ],
    whatClientsLookForTitle: 'Een aparte ingang voor aanleg en voor onderhoud',
    whatClientsLookForBody:
      'Wie een totaalproject plant kijkt rustig naar foto’s en uw aanpak; wie zijn haag wil laten scheren wil snel weten of u in de buurt werkt en tijd hebt.',
    features: [
      {
        title: 'Tuinaanleg & tuinontwerp',
        body: 'Van grondwerken, beplanting en gazon tot tuinverlichting, met heldere uitleg over uw werkwijze.',
      },
      {
        title: 'Terrassen, opritten & afsluitingen',
        body: 'Bestrating, houten terrassen, zwemvijvers en omheiningen overzichtelijk apart getoond.',
      },
      {
        title: 'Tuinonderhoud per seizoen',
        body: 'Snoeien, maaien, verticuteren en winterklaar maken per seizoen of via een vast onderhoudscontract.',
      },
      {
        title: 'Fotogalerij van gerealiseerde tuinen',
        body: 'Projecten van kleine stadstuin tot landelijke tuin in een lichte, snel ladende fotogalerij.',
      },
    ],
    specialSectionTitle: 'Tuinaanlegger, hovenier of tuinarchitect',
    specialSectionParagraphs: [
      'Wij stemmen de teksten af op de zoekwoorden die uw klanten zelf intypen en koppelen uw gemeenten netjes aan uw Google Bedrijfsprofiel.',
    ],
    recommendedPackage: 'Vakman',
    demoSlug: 'tuin-voorbeeld',
    demoLabel: 'Bekijk het tuin-voorbeeld: Tuinzorg Varelinde',
    relatedSectors: ['website-vakmensen', 'website-schilder', 'website-starters'],
    faqs: [
      {
        question: 'Vraagt het formulier meteen of het om aanleg of onderhoud gaat?',
        answer:
          'Ja, wij richten het offerteformulier zo in dat de klant kiest tussen aanleg, terras/oprit of onderhoud, plus grootte en gemeente.',
      },
    ],
  },
};

export const REGION_PAGES_NL: Record<RegionSlug, RegionPageData> = {
  'website-laten-maken-kempen': {
    slug: 'website-laten-maken-kempen',
    city: 'De Kempen',
    regionLabel: 'Kempen & provincie Antwerpen',
    breadcrumb: 'Website laten maken in de Kempen',
    eyebrow: 'Regio · Turnhout, Geel, Herentals, Mol & Kasterlee',
    title: 'Website laten maken in de Kempen',
    subtitle:
      'Voor u iets beslist, bouwen wij gratis een demo van uw eigen zaak, zodat u ziet hoe uw website eruit zal zien.',
    introParagraphs: [
      'In de Kempen zitten sterke kmo’s op bedrijventerreinen langs het Albertkanaal, vakmensen die van dorp tot dorp rijden, winkels in de stadskernen en zaken die leven van fietsers en bezoekers.',
      'Webstudio K werkt vanuit Kasterlee en bouwt websites op maat voor ondernemers in de hele Kempen en heel België.',
    ],
    localContextTitle: 'Vijf Kempense gemeenten, elk met een eigen type zaken',
    localContextParagraphs: [
      'Elke gemeente heeft zijn eigen dynamiek: van de winkelstraten in Turnhout en bedrijventerreinen in Geel tot de toeristische zaken in Kasterlee en Mol.',
      'Met duidelijke lokale teksten, correcte openingsuren en een sterk Google Bedrijfsprofiel zorgen wij dat klanten uit uw eigen streek u meteen vinden.',
    ],
    localHighlights: [
      {
        title: 'Turnhout',
        body: 'Winkelhart rond de Grote Markt en Gasthuisstraat, grafische sector en bedrijven op Zevendonk.',
      },
      {
        title: 'Geel',
        body: 'Bedrijventerreinen langs het Albertkanaal (Geel-Punt, Winkelomheide) en lokale vakmensen in alle deelgemeenten.',
      },
      {
        title: 'Herentals',
        body: 'Historische hoofdstad van de Kempen met centrumwinkels, horeca en diensten tot in Noorderwijk en Morkhoven.',
      },
      {
        title: 'Mol & Kasterlee',
        body: 'Toerisme rond het Zilvermeer, Lichtaart, Tielen en de Kempense Heuvelrug, naast kmo’s en horeca.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-kasterlee',
      'website-laten-maken-turnhout',
      'website-laten-maken-geel',
      'website-laten-maken-herentals',
      'website-laten-maken-mol',
    ],
    faqs: [
      {
        question: 'Komen jullie langs of verloopt alles online?',
        answer:
          'Kennismaking en overleg verlopen vlot per e-mail, telefonisch of online — zo verliest u geen tijd in het verkeer en ontvangt u binnen 1 werkdag een gratis demo.',
      },
      {
        question: 'Zijn de prijzen overal in de Kempen en België gelijk?',
        answer:
          'Ja. Onze vaste pakketten (Start €490, Vakman €990, Webshop €1.890 excl. btw) gelden overal zonder reiskosten of verrassingen.',
      },
    ],
  },
  'website-laten-maken-turnhout': {
    slug: 'website-laten-maken-turnhout',
    city: 'Turnhout',
    regionLabel: 'Kempen · Arrondissement Turnhout',
    breadcrumb: 'Turnhout',
    eyebrow: 'Turnhout · Grote Markt, Gasthuisstraat & Zevendonk',
    title: 'Website laten maken in Turnhout',
    subtitle:
      'Webstudio K bouwt eerst gratis een demo van uw eigen zaak, zodat u rustig bekijkt hoe uw site werkt op gsm en computer.',
    introParagraphs: [
      'Een winkel in de Gasthuisstraat, een vrij beroep in Schorvoort of een kmo op bedrijventerrein Zevendonk vraagt telkens iets anders van een website.',
      'Wij zorgen voor een ontwerp dat past bij uw specifieke Turnhoutse doelgroep en uw lokale vindbaarheid versterkt.',
    ],
    localContextTitle: 'Winkelen rond de Grote Markt en ondernemen op Zevendonk',
    localContextParagraphs: [
      'Wie winkelt in het centrum van Turnhout beslist vaak onderweg op de smartphone: bent u vandaag open, hebt u wat ik zoek en waar kan ik parkeren?',
      'Voor makers, drukkers en B2B-bedrijven op de industriezones draait alles dan weer om een helder overzicht van uw capaciteit, certificaten en een directe offerteaanvraag.',
    ],
    localHighlights: [
      {
        title: 'Centrum & Gasthuisstraat',
        body: 'Openingsuren, acties, koopzondagen en bereikbaarheid meteen vooraan op mobiel.',
      },
      {
        title: 'Bedrijventerrein Zevendonk',
        body: 'Overzichtelijke B2B-sites die inkopers en partners snel overtuigen.',
      },
      {
        title: 'Google Maps in Groot-Turnhout',
        body: 'Consistente gegevens voor Turnhout en buurgemeenten zoals Oud-Turnhout, Vosselaar en Beerse.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-kempen',
      'website-laten-maken-kasterlee',
      'website-laten-maken-geel',
      'website-laten-maken-herentals',
    ],
    faqs: [
      {
        question: 'Hoe snel staat mijn website voor mijn zaak in Turnhout online?',
        answer:
          'Met het pakket Start staat uw website binnen 5 werkdagen online na goedkeuring van uw demo; met Vakman binnen 10 werkdagen.',
      },
    ],
  },
  'website-laten-maken-geel': {
    slug: 'website-laten-maken-geel',
    city: 'Geel',
    regionLabel: 'Kempen · Geel & deelgemeenten',
    breadcrumb: 'Geel',
    eyebrow: 'Geel · Albertkanaal, Geel-Punt, Larum & Ten Aard',
    title: 'Website laten maken in Geel',
    subtitle:
      'Webstudio K maakt de website die bij uw Geelse zaak past, te beginnen met een gratis demo vooraf.',
    introParagraphs: [
      'Geel combineert grote bedrijventerreinen tussen de E313 en het Albertkanaal met een uitgebreid netwerk van gehuchten zoals Ten Aard, Larum, Bel en Winkelomheide.',
      'Of u nu levert aan andere bedrijven of werkt als zelfstandig vakman of praktijk in het centrum: wij bouwen uw website op maat.',
    ],
    localContextTitle: 'Bedrijven langs het Albertkanaal & vakmensen in de gehuchten',
    localContextParagraphs: [
      'Een technische kmo op Geel-Punt wil een inkoper of projectleider binnen dertig seconden tonen welke diensten en capaciteit u biedt.',
      'Een bakker, kinesist of dakwerker in Larum of Ten Aard wil vooral dat buurtbewoners meteen kunnen bellen, mailen of een afspraak maken.',
    ],
    localHighlights: [
      {
        title: 'B2B langs Geel-Punt & Kleine Nete',
        body: 'Heldere dienstenpagina’s, realisaties en offerteformulieren zonder overbodige omwegen.',
      },
      {
        title: 'Lokale handel & vrije beroepen',
        body: 'Studentenstad en handelscentrum rond de Markt en Pas goed bereikbaar voor iedere bezoeker.',
      },
      {
        title: 'Eén vast aanspreekpunt',
        body: 'U hoeft zelf geen tijd te verliezen aan updates of tekstwijzigingen; wij regelen het voor u.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-kempen',
      'website-laten-maken-mol',
      'website-laten-maken-herentals',
      'website-laten-maken-kasterlee',
    ],
    faqs: [
      {
        question: 'Maakt u ook websites voor B2B-bedrijven op de industriezone?',
        answer:
          'Ja. Wij schrijven duidelijke teksten voor uw technische diensten, machinepark of sectoren en zetten uw contactgegevens prominent bovenaan.',
      },
    ],
  },
  'website-laten-maken-herentals': {
    slug: 'website-laten-maken-herentals',
    city: 'Herentals',
    regionLabel: 'Kempen · Herentals, Noorderwijk & Morkhoven',
    breadcrumb: 'Herentals',
    eyebrow: 'Herentals · Centrum, Noorderwijk & Morkhoven',
    title: 'Website laten maken in Herentals',
    subtitle:
      'Bij Webstudio K ziet u eerst gratis een demo van uw eigen zaak in Herentals.',
    introParagraphs: [
      'Herentals is het historische hart van de Kempen met een bruisend winkel- en horecacentrum, plus de dorpen Noorderwijk en Morkhoven en de bedrijvigheid langs de Netevallei.',
      'Een winkel op de Grote Markt of in de Bovenrij heeft een andere website nodig dan een aannemer of praktijk vanuit Morkhoven.',
    ],
    localContextTitle: 'Een winkelhart met horeca én sterke vakmensen errond',
    localContextParagraphs: [
      'Bezoekers uit de omliggende gemeenten kijken op hun smartphone vooraf of uw zaak open is en hoe ze reserveren of parkeren.',
      'Wij zorgen ervoor dat openingsuren, kaart of dienstenpagina’s razendsnel openen en perfect leesbaar zijn.',
    ],
    localHighlights: [
      {
        title: 'Winkels & horeca in het centrum',
        body: 'Leesbare menukaarten, reservatieknoppen en actuele openingsuren op elk scherm.',
      },
      {
        title: 'Noorderwijk, Morkhoven & Netevallei',
        body: 'Lokale zichtbaarheid voor zelfstandigen, zorgpraktijken en vakmensen in heel Groot-Herentals.',
      },
      {
        title: 'Vaste prijzen vooraf',
        body: 'Vanaf €490 eenmalig en €29/maand excl. btw, inclusief .be-domein en hosting.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-kempen',
      'website-laten-maken-geel',
      'website-laten-maken-kasterlee',
      'website-laten-maken-turnhout',
    ],
    faqs: [
      {
        question: 'Zit mijn .be-domeinnaam in het pakket inbegrepen?',
        answer:
          'Ja, uw .be-domeinnaam, hosting, beveiliging (HTTPS) en back-ups zitten steeds in het maandelijkse bedrag.',
      },
    ],
  },
  'website-laten-maken-mol': {
    slug: 'website-laten-maken-mol',
    city: 'Mol',
    regionLabel: 'Kempen · Mol & twaalf gehuchten',
    breadcrumb: 'Mol',
    eyebrow: 'Mol · Centrum, Zilvermeer & gehuchten',
    title: 'Website laten maken in Mol',
    subtitle:
      'Webstudio K maakt de website voor uw zaak in Mol, en u krijgt eerst gratis een demo te zien.',
    introParagraphs: [
      'Mol is een uitgestrekte gemeente met twaalf gehuchten waar toerisme, recreatie, handel en technische bedrijven hand in hand gaan.',
      'Of u nu gasten van het Zilvermeer en vakantieparken ontvangt of als lokale vakman in Achterbos, Millegem of Rauw actief bent: uw website wijst elke bezoeker vlot de weg.',
    ],
    localContextTitle: 'Zaken die leven van toeristen én lokale klanten',
    localContextParagraphs: [
      'Wie vanaf de camping, het strand of een fietsroute zoekt op de gsm, wil in vijf seconden zien of u vandaag open bent, wat op de kaart staat en waar u precies ligt.',
      'Voor vaste inwoners van Mol toont uw site dan weer uw volledige dienstenaanbod, tarieven en openingsuren.',
    ],
    localHighlights: [
      {
        title: 'Horeca, fietsverhuur & verblijf',
        body: 'Mobielvriendelijke kaarten, reservatieformulieren en duidelijke routelinks.',
      },
      {
        title: 'Lokale diensten in alle 12 gehuchten',
        body: 'Duidelijke vermelding van uw werkgebied rond Mol, Dessel, Balen en Retie.',
      },
      {
        title: 'Geen zorgen over onderhoud',
        body: 'Wij houden uw site technisch up-to-date en voeren uw aanpassingen maandelijks uit.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-kempen',
      'website-laten-maken-geel',
      'website-laten-maken-kasterlee',
      'website-laten-maken-turnhout',
    ],
    faqs: [
      {
        question: 'Kan ik seizoensuren (zomer/winter) makkelijk laten aanpassen?',
        answer:
          'Ja, stuur ons een kort mailtje zodra uw zomer- of winteruren ingaan en wij zetten het dezelfde werkdag nog online.',
      },
    ],
  },
  'website-laten-maken-kasterlee': {
    slug: 'website-laten-maken-kasterlee',
    city: 'Kasterlee',
    regionLabel: 'Thuisbasis · Kasterlee, Lichtaart & Tielen',
    breadcrumb: 'Kasterlee',
    eyebrow: 'Thuisbasis · Kasterlee, Lichtaart & Tielen',
    title: 'Website laten maken in Kasterlee',
    subtitle:
      'Webstudio K werkt vanuit Kasterlee (Kemelbeekstraat 16) en bouwt eerst gratis een demo van uw eigen zaak.',
    introParagraphs: [
      'Kasterlee, Lichtaart en Tielen vormen samen een ondernemende gemeente waar toerisme, gastronomie, lokale handel, landbouw en sterke kmo’s elkaar versterken.',
      'Als erkende toeristische gemeente kennen winkels en horeca hier flexibele openingsuren — des te belangrijker dat wandelaars, fietsers en gezinnen meteen op hun gsm zien wanneer u open bent.',
    ],
    localContextTitle: 'Vanuit Kasterlee voor Kasterlee, Lichtaart en Tielen',
    localContextParagraphs: [
      'Of u nu een bistro runt aan de Kempense Heuvelrug, een zaak hebt rond Bobbejaanland in Lichtaart of een vakbedrijf leidt in Tielen: wij kennen de streek door en door.',
      'U krijgt één aanspreekpunt uit eigen gemeente, heldere prijzen vanaf €490 excl. btw en eerst een vrijblijvende voorbeeldsite.',
    ],
    localHighlights: [
      {
        title: 'Toerisme & horeca',
        body: 'Openingsuren, menukaarten en reservaties geoptimaliseerd voor bezoekers onderweg.',
      },
      {
        title: 'Kasterlee, Lichtaart & Tielen',
        body: 'Persoonlijk contact met een webstudio gevestigd op Kemelbeekstraat 16, 2460 Kasterlee.',
      },
      {
        title: 'Ook voor verenigingen & vakmensen',
        body: 'Van lokale clubs tot schrijnwerkers, schilders en tuinaanleggers.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-kempen',
      'website-laten-maken-turnhout',
      'website-laten-maken-geel',
      'website-laten-maken-herentals',
    ],
    faqs: [
      {
        question: 'Kan ik vanuit Kasterlee eerst vrijblijvend kennismaken?',
        answer:
          'Uiteraard. Neem contact op via info@webstudiok.be of +32 14 71 80 80 en wij bezorgen u doorgaans binnen 1 werkdag een voorstel.',
      },
    ],
  },
  'website-laten-maken-gent': {
    slug: 'website-laten-maken-gent',
    city: 'Gent',
    regionLabel: 'Oost-Vlaanderen · Gent & deelgemeenten',
    breadcrumb: 'Gent',
    eyebrow: 'Gent · Centrum, Sint-Amandsberg, Gentbrugge & Mariakerke',
    title: 'Website laten maken in Gent, en eerst zelf de demo zien',
    subtitle:
      'Wij bouwen eerst gratis een demo van uw eigen zaak in Gent, met uw naam en uw diensten.',
    introParagraphs: [
      'Zo ziet u hoe uw website wordt, nog voor u iets beslist. Ook vanuit de Kempen werkt Webstudio K dagelijks voor ondernemers, horeca, vrije beroepen en winkels in heel Gent en Oost-Vlaanderen.',
      'Kennismaking en feedback verlopen vlot per e-mail, telefoon of videocall — efficiënt en zonder verloren verplaatsingstijd.',
    ],
    localContextTitle: 'Websites voor zaken in de stad en de deelgemeenten',
    localContextParagraphs: [
      'Een horecazaak of winkel in het centrum van Gent wordt meestal bekeken door bezoekers die onderweg hun smartphone bovenhalen: zij willen uw kaart, openingsuren en locatie.',
      'Een zelfstandige, praktijk of aannemer in Drongen, Oostakker, Wondelgem of Ledeberg wil vooral duidelijkheid over het werkgebied, de diensten en een vlotte offerte- of afspraakaanvraag.',
    ],
    localHighlights: [
      {
        title: 'Centrum & buurten',
        body: 'Snel ladende mobiele websites met duidelijke bel-, route- en boekingsknoppen.',
      },
      {
        title: 'Deelgemeenten & rand',
        body: 'Sterke lokale vindbaarheid op wijk- en gemeenteniveau in Groot-Gent.',
      },
      {
        title: 'Vaste prijzen in heel België',
        body: 'Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890 excl. btw.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-kortrijk',
      'website-laten-maken-leuven',
      'website-laten-maken-kempen',
    ],
    faqs: [
      {
        question: 'Hoe verloopt de samenwerking als Webstudio K niet in Gent gevestigd is?',
        answer:
          'Heel vlot: een kort telefonisch of online gesprek volstaat. U bekijkt uw gratis demo online op gsm en computer, en daarna hebt u één vast aanspreekpunt.',
      },
    ],
  },
  'website-laten-maken-leuven': {
    slug: 'website-laten-maken-leuven',
    city: 'Leuven',
    regionLabel: 'Vlaams-Brabant · Leuven, Heverlee & Kessel-Lo',
    breadcrumb: 'Leuven',
    eyebrow: 'Leuven · Centrum, Heverlee, Kessel-Lo & Wijgmaal',
    title: 'Webdesign voor ondernemers in Leuven',
    subtitle:
      'Bij goed webdesign zien bezoekers op hun gsm meteen wat u doet en hoe ze u bereiken.',
    introParagraphs: [
      'Webstudio K maakt websites voor zaken in Leuven en alle deelgemeenten zoals Heverlee, Kessel-Lo, Wilsele en Wijgmaal.',
      'Eerst bouwen wij gratis een demo op maat van uw onderneming, praktijk of handelszaak. U zit nergens aan vast.',
    ],
    localContextTitle: 'Wat goed webdesign voor uw Leuvense zaak betekent',
    localContextParagraphs: [
      'Wie in Leuven een website laat bouwen, wil vooral dat bezoekers zonder zoeken vinden wat ze nodig hebben: van afspraakmogelijkheden voor vrije beroepen en zorgpraktijken tot snelle informatie voor lokale winkels en horeca.',
      'Wij combineren een eigen ontwerp met heldere, zelf geschreven teksten en een solide technische basis voor Google.',
    ],
    localHighlights: [
      {
        title: 'Een eigen ontwerp',
        body: 'Afgestemd op uw kleuren, diensten en toon — geen dertien-in-een-dozijn sjabloon.',
      },
      {
        title: 'Gemaakt voor de smartphone',
        body: 'Leesbare tekst en ruime knoppen voor studenten, inwoners en bezoekers onderweg.',
      },
      {
        title: 'Volledige ontzorging',
        body: 'Inclusief hosting, .be-domein, beveiliging en maandelijkse tekstaanpassingen.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-gent',
      'website-laten-maken-kempen',
      'website-laten-maken-kortrijk',
    ],
    faqs: [
      {
        question: 'Kan mijn Leuvense zaak ook tweetalig (NL/EN) op de website?',
        answer:
          'Zeker. Zeker in Leuven kan Engels voor een deel van uw cliënteel zinvol zijn; wij bespreken dit helder vooraf in de offerte.',
      },
    ],
  },
  'website-laten-maken-kortrijk': {
    slug: 'website-laten-maken-kortrijk',
    city: 'Kortrijk',
    regionLabel: 'West-Vlaanderen · Kortrijk & Zuid-West-Vlaanderen',
    breadcrumb: 'Kortrijk',
    eyebrow: 'Kortrijk · Centrum, Kuurne, Harelbeke & Marke',
    title: 'Een website voor uw zaak in Kortrijk en omgeving',
    subtitle:
      'Webstudio K maakt websites voor ondernemers, vakmensen en winkels in Kortrijk en heel West-Vlaanderen.',
    introParagraphs: [
      'Of u nu een zaak hebt in het centrum van Kortrijk, in Marke, Bissegem, Heule of een omliggende gemeente: u krijgt dezelfde persoonlijke service en transparante prijzen als elders in België.',
      'Eerst bouwen wij gratis een demo van uw eigen zaak, zodat u vooraf ziet wat het wordt.',
    ],
    localContextTitle: 'Duidelijke prijzen, ook in Kortrijk',
    localContextParagraphs: [
      'U kiest tussen Start (vanaf €490 + €29/mnd), Vakman (vanaf €990 + €49/mnd) of Webshop (vanaf €1.890 + €79/mnd), telkens excl. btw.',
      'In elk maandpakket zitten uw .be-domeinnaam, snelle hosting, back-ups, updates en vaste minuten voor aanpassingen inbegrepen.',
    ],
    localHighlights: [
      {
        title: 'Voor kmo’s, bouw & winkels',
        body: 'Sterke regionale presentatie in Zuid-West-Vlaanderen met duidelijke offerteformulieren.',
      },
      {
        title: 'Vaste oplevertijd',
        body: 'Start binnen 5 werkdagen online, Vakman binnen 10 werkdagen na uw akkoord.',
      },
      {
        title: 'Eén vast aanspreekpunt',
        body: 'Wijzigen openingsuren of komt er een nieuwe foto bij? Eén mailtje volstaat.',
      },
    ],
    nearbyRegions: [
      'website-laten-maken-gent',
      'website-laten-maken-leuven',
      'website-laten-maken-kempen',
    ],
    faqs: [
      {
        question: 'Werken jullie ook voor zaken buiten Kortrijk in West-Vlaanderen?',
        answer:
          'Ja, wij bouwen websites voor ondernemers in heel West-Vlaanderen en de rest van België, zonder extra verplaatsingskosten.',
      },
    ],
  },
};

export function getAllSectorPages(lang: Language): SectorPageData[] {
  const list = Object.values(SECTOR_PAGES_NL);
  if (lang === 'nl') return list;
  // Provide clean localized labels while keeping full structured content
  const namesFr: Record<SectorSlug, string> = {
    'website-horeca': 'Horeca & Restaurants',
    'website-winkel': 'Commerces locaux',
    'website-kapsalon': 'Salons de coiffure & Barbiers',
    'website-vakmensen': 'Artisans & Bâtiment',
    'website-zorg': 'Soins & Bien-être',
    'website-vrij-beroep': 'Professions libérales',
    'website-vereniging': 'Associations & ASBL',
    'website-starters': 'Indépendants débutants',
    'website-schilder': 'Peintres & Décorateurs',
    'website-tuinaannemer': 'Paysagistes & Jardins',
  };
  const namesEn: Record<SectorSlug, string> = {
    'website-horeca': 'Hospitality & Restaurants',
    'website-winkel': 'Retail Shops',
    'website-kapsalon': 'Hair Salons & Barbershops',
    'website-vakmensen': 'Trades & Contractors',
    'website-zorg': 'Health & Care Practices',
    'website-vrij-beroep': 'Liberal Professions',
    'website-vereniging': 'Associations & Non-profits',
    'website-starters': 'Startups & New Businesses',
    'website-schilder': 'Painters & Decorators',
    'website-tuinaannemer': 'Landscapers & Gardeners',
  };
  return list.map((item) => ({
    ...item,
    name: lang === 'fr' ? namesFr[item.slug] : namesEn[item.slug],
    breadcrumb: lang === 'fr' ? namesFr[item.slug] : namesEn[item.slug],
  }));
}

export function getSectorPage(slug: SectorSlug, lang: Language): SectorPageData {
  const found = getAllSectorPages(lang).find((s) => s.slug === slug);
  return found ?? SECTOR_PAGES_NL['website-horeca'];
}

export function getAllRegionPages(): RegionPageData[] {
  return Object.values(REGION_PAGES_NL);
}

export function getRegionPage(slug: RegionSlug): RegionPageData {
  return REGION_PAGES_NL[slug] ?? REGION_PAGES_NL['website-laten-maken-kempen'];
}
