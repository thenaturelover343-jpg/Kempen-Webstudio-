# Audit 17-11-2026: verwerking

**Bron:** humanizer-audit van de testsite door Karim (185 pagina's, 291 punten).
**Terugzetten:** git-tag `voor-audit-17-11`.

**Resultaat:** alle 291 punten zijn verwerkt.
- 220 met de tekst uit het verslag.
- 70 met een eigen formulering of als schrapping. De oude tekst is weg, maar de nieuwe zin wijkt licht af, bijvoorbeeld door de regel "maximaal één keer per pagina".
- 1 met een bewuste uitzondering.

Een script controleerde per punt of het oude citaat nog op de pagina staat, in body, title, meta en JSON-LD. Van de 291 citaten staat er nog 0 op de pagina. De enige uitzondering is "tailored to your business" in de Gentse H1, die volgens het verslag zelf één keer mag blijven.

## Nieuw verloop: kennismaking → vrijblijvende offerte → bouw

- "Vrijblijvend voorstel" is overal "vrijblijvende offerte" geworden. FR: "devis sans engagement". EN: "no-obligation quote". Dat geldt voor CTA's, knoppen, formulieroptie, menu ("Werkwijze en offerte"), trust-strip, meta, JSON-LD, stappenkaarten en FAQ's.
- Weggehaald zijn alle demo-resten:
  - "U zit nergens aan vast" / "Vous n’êtes engagé à rien" / "Sans aucun engagement" / "You are under no obligation";
  - "u bekijkt het rustig / op uw gemak" en de FR- en EN-varianten;
  - "afgestemd op uw stijl";
  - "dan werken wij de site volledig af";
  - "Voir à quoi peut ressembler…".
- "U beslist pas als u de prijs kent" staat nog hoogstens één keer per pagina (NL/FR/EN gecontroleerd).
- Bijwerkingen opgeruimd: zinnen als "eerst een vrijblijvende offerte. Daarna krijgt u een schriftelijke offerte" zijn herschreven tot één offerte na een kennismaking.

## Beslist en verwerkt

- **Prijsvergelijking met andere bureaus, freelancer/bureau-tabel en FAQ 17** (NL/FR/EN prijsgids, webshop): geschrapt, ook uit de JSON-LD en de meta. In de plaats staan de eigen prijzen en "één vast aanspreekpunt, vaste pakketten en openbare prijzen" met een link naar het artikel over zelf bouwen.
- **Ranking-disclaimers** (SEO NL/FR/EN): vervangen door een zin over het werk dat gebeurt en het maandverslag.
- **"Deze punten kunt u bij elke webdesigner nagaan"** (NL/EN): nu "Bij Kempen Webstudio staan al deze punten in de offerte."

## Gedeelde blokken

- **CTA-blok:** "Na een kennismaking krijgt u een vrijblijvende offerte. U beslist pas als u de prijs kent."
- **Knoppen:** "Vraag een vrijblijvende offerte aan" / "Vrijblijvende offerte aanvragen", met FR/EN idem.
- **Trust-strip:** één zin zonder bolletjes: "Kennismaking en vrijblijvende offerte, één aanspreekpunt, prijzen vanaf €490 excl. btw." De strip is een afgeleide zin, daarom is `.hero-trust` uitgesloten van de letterlijke tekstcontrole van de build.
- **Footer:** "Open van maandag tot zaterdag, van 9 tot 20 uur. Op zondag gesloten." FR en EN volgens het verslag.
- **Kruislinkblok:** "Kempen Webstudio maakt ook webshops, een logo en huisstijl, doet SEO en vernieuwt bestaande websites." De links blijven staan, en op de pagina zelf valt de eigen link weg.
- **Home:** "5 tot 10 werkdagen". FR: "5 à 10 jours ouvrables". EN: "5 to 10 working days".
- **Voorbeeldsites:** "dan laten wij u weten of wij u kunnen helpen".

## Overige categorieën

- **17 prijsvormfouten:**
  - vijfjaarberekening met "vanaf" en "excl. btw" (NL/FR/EN);
  - dubbele komma's weg;
  - uurtarief "vanaf €60" (NL/FR/EN);
  - EN-notatie €1,890 op alle Engelse pagina's (15 bedragen).
- **"Wilt u" buiten de slot-CTA:** 0 over.
- **"jullie" in FAQ-vragen:** 0 over. Het is nu telkens "Kempen Webstudio".
- **"snel":** vlot, meteen of licht, waar het verslag dat aangeeft, ook in de labels.
- **Genderneutraal:** alle zinnen uit het verslag zijn aangepast.
- **Dubbelpunt-labels in koppen:** "Ondernemen in X:" is nu "Wie uw klanten in X zijn" (en FR/EN); "Ook nodig voor uw zaak:" en "Per pagina:" zijn weg.
- **EN "tailored":** blijft alleen één keer staan, in de Gentse H1 en de Leuvense title, zoals het verslag vraagt.

## Niet of anders verwerkt, met reden

- **Home FAQ 01 en 16 (NL/FR/EN), FR-boutique en EN-webshop:** de voorgestelde tekst bevatte "u beslist pas als u de prijs kent". Die bijzin is daar weggelaten, omdat de zin al in het slot-CTA-blok van dezelfde pagina staat. Zo blijft de regel "maximaal één keer per pagina" gerespecteerd.
- **Gentse H1 (EN):** "tailored to your business" blijft één keer staan, zoals het verslag aangeeft.
- **Bewust niet aangepast (staat niet in het verslag):**
  - de logo-ontwerpvoorstellen ("2 voorstellen", "2 propositions", "2 proposals"), want dat is een echte dienst;
  - "rustig" als ontwerpbeschrijving;
  - de fictieve teksten op de voorbeeldsites ("gratis verzending", "In deze demo");
  - de kennisartikels over een gratis Google-profiel;
  - de FAQ "Kan ik gratis een website laten maken?", die uitlegt dat het bij een bureau nooit gratis is;
  - artikeltitels met een dubbelpunt ("WordPress of maatwerk: …").
- **Beeldcontrole:** op /wat-kost-een-website/ meldt de controle op 1440 px één effen vlak. Het gaat om de donkere linkerkolom onder de kop "Wat kost een website gemiddeld…". Die sectie is inhoudelijk en qua opmaak identiek aan de versie van voor de audit (zelfde tekst, zelfde beeld). Ze staat alleen hoger op de pagina, omdat de vergelijkingstabel weg is. Een afzonderlijke run op die pagina geeft 0. Het design is niet aangepast, omdat het gelijk moest blijven.

## Technisch

- De FAQPage-JSON-LD wordt nu bij elke generatie opgebouwd uit de vragen die echt op de pagina staan (`scripts/paginas.mjs`). Daardoor blijven geschrapte vragen niet meer in de JSON-LD hangen.
- De vervangscripts per laag staan in de sessie-scratchpad. Alle wijzigingen zitten in de bronnen (`content/`, `src/site/paginas/`, `src/site/`, `src/design/`, `scripts/shell.mjs`).

## Per punt

### /
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Elke zaak een eigen gezicht. / Voor alle sectoren, ook de uwe. / Alles bij één aanspreekpunt.
  **verwerkt (tekst uit het verslag)**
- Vakmensen · Offerteaanvraag (en 5 andere koppen met ·-label)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Websites op maat · Websites vernieuwen · Landingspagina's · Kleine webshops · Onderhoud (4 zulke ·-rijen)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- 07. / Diensten Vernieuwt u ook een bestaande website?
  **verwerkt (tekst uit het verslag)**
- Wilt u later ook online verkopen, dan kan dat met het pakket Webshop.
  **verwerkt (tekst uit het verslag)**
- Wilt u verder gaan, dan starten wij met een SEO-audit en werken wij aan lokale SEO, …
  **verwerkt (tekst uit het verslag)**
- zodat uw site vlot laadt en prettig leest op elk toestel.
  **verwerkt (tekst uit het verslag)**
- Wat zit erin (label boven elke pakketlijst)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Gaat u akkoord met het voorstel, dan werken wij de site volledig af.
  **verwerkt (tekst uit het verslag)**
- Wij maken een vrijblijvend voorstel voor uw zaak. (stap 2) / H2 'Eerst een vrijblijvend voorstel. Daarna beslist u.'
  **verwerkt (tekst uit het verslag)**
- 01. Wat houdt het vrijblijvend voorstel in? / Wij maken vooraf een vrijblijvend voorstel voor uw eigen zaak. U bekijkt het rustig, en een kort antwoor…
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Hero: 'Wij maken eerst een vrijblijvend voorstel voor uw zaak. U beslist daarna of u verdergaat.'
  **verwerkt (tekst uit het verslag)**
- 16. … Kempen Webstudio maakt eerst een vrijblijvend voorstel voor uw zaak. U bekijkt het, zit nergens aan vast en beslist daarna, met de prijs vooraf.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /contact/
- 02. Hoe snel krijg ik antwoord?
  **verwerkt (tekst uit het verslag)**
- Wilt u liever afspreken, vermeld het gerust in uw bericht.
  **verwerkt (tekst uit het verslag)**

### /dakwerken-hoogland/
- …dan laten wij snel weten of wij u kunnen helpen. (2x)
  **verwerkt (tekst uit het verslag)**
- Herstellingen Lekken, losgewaaide pannen en stormschade, zo snel mogelijk vakkundig hersteld.
  **verwerkt (tekst uit het verslag)**

### /horeca-voorbeeld/
- Voor een snelle lunch, een avond met twee of een feest met de hele familie.
  **verwerkt (tekst uit het verslag)**

### /houtatelier-nethe/
- …dan laten wij snel weten of wij u kunnen helpen. (2x)
  **verwerkt (tekst uit het verslag)**

### /kennis/google-bedrijfsprofiel-aanmaken/
- Klanten zien dan in welke gemeenten hij werkt.
  **verwerkt (tekst uit het verslag)**

### /kennis/hoe-lang-duurt-website-laten-maken/
- Keurt u het voorstel goed, dan werken wij de site volledig af. / U bekijkt het rustig. / Eén persoon die het voorstel goedkeurt …
  **verwerkt (tekst uit het verslag)**

### /kennis/terugkerende-kosten-website/
- Hieronder leest u welke posten terugkomen, waar ze voor dienen en wat u daarvoor bij Kempen Webstudio betaalt.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /kennis/wat-moet-er-op-een-website-staan/
- Wilt u zien hoe uw eigen site eruit kan zien, stuur dan een korte e-mail.
  **verwerkt (tekst uit het verslag)**

### /kennis/website-laten-maken-of-zelf-bouwen/
- Hoe het website laten maken bij ons verloopt, leest u op de startpagina.
  **verwerkt (tekst uit het verslag)**
- Start kost €490 voor de bouw en zestig keer €29, samen vanaf €2.230. Vakman kost €990 … Een Webshop kost €1.890 …
  **verwerkt (tekst uit het verslag)**

### /kennis/wettelijke-vermeldingen-website/
- Wilt u zelf online verkopen met een eigen webshop, dan leest u daar meer over op onze webshoppagina.
  **verwerkt (tekst uit het verslag)**

### /kleurwerk-voorbeeld/
- …dan laten wij snel weten of wij u kunnen helpen. (2x)
  **verwerkt (tekst uit het verslag)**

### /over-ons/
- Wij maken snelle, toegankelijke websites voor kmo's, verenigingen en zelfstandigen in heel België. (meta)
  **verwerkt (tekst uit het verslag)**
- …en houden de pagina's licht zodat ze snel laden op een gsm.
  **verwerkt (tekst uit het verslag)**
- 02. Werken jullie met sjablonen?
  **verwerkt (tekst uit het verslag)**
- Wilt u verder, dan leggen wij het pakket vast in een schriftelijke offerte.
  **verwerkt (tekst uit het verslag)**
- Daarna maken wij een vrijblijvend voorstel voor uw eigen zaak: u ziet wat uw website bevat en wat ze kost. / … maken wij eerst een vrijblijvend voorst…
  **verwerkt (tekst uit het verslag)**

### /seo-laten-doen/
- Wij zorgen dat uw zaak gevonden wordt op de zoekwoorden die voor u tellen, met een site die snel laadt, …
  **verwerkt (tekst uit het verslag)**
- Technisch zorgen wij voor snelle pagina's, …
  **verwerkt (tekst uit het verslag)**
- 02. Hoe snel zie ik resultaat? / …merkt u vaak sneller dan posities op brede zoekwoorden.
  **verwerkt (tekst uit het verslag)**
- 03. Kunnen jullie ook SEO doen voor een site die jullie niet bouwden? / 06. Werken jullie als SEO-bureau ook voor zaken in Antwerpen of Gent?
  **verwerkt (tekst uit het verslag)**
- Zoekt u een SEO-bureau in Antwerpen, dan ziet u in onze pagina over Antwerpen hoe wij omgaan met districten en randgemeenten.
  **verwerkt (tekst uit het verslag)**
- Per pagina: titel, omschrijving, koppen, beeldteksten, interne links en laadtijd van de beelden.
  **verwerkt (tekst uit het verslag)**
- Uw site staat online maar levert weinig aanvragen op? Begin met een SEO-audit, of laat uw site vernieuwen.
  **verwerkt (tekst uit het verslag)**
- …kunt u bij ons terecht voor een audit of voor lokale SEO.
  **verwerkt (tekst uit het verslag)**
- Wij beloven geen plaats 1 in Google: niemand kan dat eerlijk beloven. Wel zeggen wij vooraf welk werk wij doen, …
  **verwerkt (tekst uit het verslag)**
- 02. … Wij beloven geen vaste plaats in Google.
  **verwerkt (tekst uit het verslag)**

### /toegankelijke-website/
- Wilt u uw bestaande website toegankelijk maken, dan controleren wij die en passen wij aan wat nodig is.
  **verwerkt (tekst uit het verslag)**
- Wilt u een webshop laten maken, dan houdt u er best rekening mee.
  **verwerkt (tekst uit het verslag)**
- Wilt u verder, dan lossen wij de gevonden punten op, en u kent vooraf de prijs.
  **verwerkt (tekst uit het verslag)**

### /tuin-voorbeeld/
- …dan laten wij snel weten of wij u kunnen helpen. (2x)
  **verwerkt (tekst uit het verslag)**

### /voorbeeldontwerpen/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Op deze pagina staan negen voorbeeldontwerpen, elk voor een ander vak.
  **verwerkt (tekst uit het verslag)**
- Zo weet u wat u mag verwachten als u bij ons een website laat maken.
  **verwerkt (tekst uit het verslag)**
- Wij maken dan een vrijblijvend voorstel voor uw eigen zaak, met een ontwerp dat bij u past.
  **verwerkt (tekst uit het verslag)**

### /voorbeeldontwerpen/dakwerken-hoogland/
- Zijn klanten zijn eigenaars die snel willen weten of hij hun dak kan aanpakken en wat het ongeveer kost.
  **verwerkt (tekst uit het verslag)**

### /wat-kost-een-website/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Begin klein: één duidelijke site met uw diensten, uw werkgebied en uw contactgegevens. Bij ons is dat het pakket Start, …
  **verwerkt (tekst uit het verslag)**
- Bij ons betaalt u na de bouw de maandprijs van uw pakket: op jaarbasis vanaf €348 …
  **verwerkt (tekst uit het verslag)**
- Bij ons schrijven wij de teksten na een gesprek.
  **verwerkt (tekst uit het verslag)**
- Bij ons begint een website vanaf €490 excl. btw.
  **verwerkt (tekst uit het verslag)**
- Bij ons zit het meeste daarvan in de maandprijs.
  **verwerkt (tekst uit het verslag)**
- Bij ons staat uw domeinnaam altijd op uw eigen naam.
  **verwerkt (tekst uit het verslag)**
- Bij ons zitten er minuten aanpassingen in de maandprijs.
  **verwerkt (tekst uit het verslag)**
- Wilt u vertellen wat u doet, waar u werkt en hoe klanten u bereiken, dan is dat pakket genoeg.
  **verwerkt (tekst uit het verslag)**
- Wilt u verder, dan kiest u een pakket.
  **verwerkt (tekst uit het verslag)**
- Op de websites van andere Belgische webbureaus zagen wij in november 2026 instapprijzen van ongeveer €700 tot €2.200 … Vergelijk daarom altijd wat inb…
  **verwerkt (tekst uit het verslag)**
- H2 'Zelf bouwen, een freelancer of een webbureau?' + vergelijkingstabel + 'Kempen Webstudio zit daartussen: …'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- 16. … Op websites van Belgische bureaus zagen wij in november 2026 instapprijzen van ongeveer €700 tot €2.200 …
  **verwerkt (tekst uit het verslag)**
- 17. Is een freelancer goedkoper dan een webbureau? + antwoord
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- …rekenen wij aan ons uurtarief van €60 excl. btw, …
  **verwerkt (tekst uit het verslag)**
- U bekijkt het rustig en laat ons weten of het u bevalt. / Zo weet u vooraf wat u krijgt en wat het kost en daarna beslist u.
  **verwerkt (tekst uit het verslag)**

### /webshop-laten-maken/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Een webshop die snel laadt en eenvoudig afrekent, verkoopt beter.
  **verwerkt (tekst uit het verslag)**
- Wilt u later toch online verkopen, dan stapt u over naar het pakket Webshop.
  **verwerkt (tekst uit het verslag)**
- Wilt u verder, dan krijgt u een schriftelijke offerte.
  **verwerkt (tekst uit het verslag)**
- Een professionele webshop: waar u op let (H2)
  **verwerkt (tekst uit het verslag)**
- Op websites van Belgische bureaus zagen wij in november 2026 prijzen vanaf ongeveer €5.000 voor een webshop op maat.
  **verwerkt (tekst uit het verslag)**
- 08. Wat kost een webshop laten maken bij een webbureau gemiddeld? + 'Dat verschilt sterk per bureau. Op websites van Belgische bureaus …'
  **verwerkt (tekst uit het verslag)**
- U bekijkt het rustig, zit nergens aan vast en beslist daarna, met de prijs vooraf.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /webshop-voorbeeld/
- Elke week in kleine hoeveelheden gebrand en snel bij u thuis.
  **verwerkt (tekst uit het verslag)**

### /website-horeca/
- Een gast weet dan tot wanneer hij nog kan eten en tot wanneer hij nog iets kan drinken.
  **verwerkt (tekst uit het verslag)**
- Wilt u doorgaan, dan bouwen wij uw website, met … (zelfde zin op 7 sectorpagina's)
  **verwerkt (tekst uit het verslag)**
- Daarna maken wij een vrijblijvend voorstel, afgestemd op uw kaart en uw stijl. / Wij maken een vrijblijvend voorstel op maat van uw kaart, uren en sti…
  **verwerkt (tekst uit het verslag)**

### /website-kapsalon/
- Zo eenvoudig begint u (H2) + 'Voor een sterke website hebt u niet veel nodig.'
  **verwerkt (tekst uit het verslag)**
- Kapsalon of barbershop, elk een eigen gezicht (H2)
  **verwerkt (tekst uit het verslag)**
- Op basis van dat gesprek maken wij een vrijblijvend voorstel voor uw salon. U bekijkt het rustig en laat ons kort weten wat u ervan vindt. / Wij maken…
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-antwerpen/
- Ondernemen in Antwerpen: wie uw klanten zijn (H2)
  **verwerkt (tekst uit het verslag)**
- Dezelfde prijzen als overal: Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, …
  **verwerkt (tekst uit het verslag)**
- Wilt u weten hoe wij werken en waarom? Lees meer over Kempen Webstudio of neem contact op.
  **verwerkt (tekst uit het verslag)**
- 01. Maken jullie ook websites voor zaken in de Antwerpse districten? / 05. Kunnen jullie ook een webshop maken voor mijn winkel?
  **verwerkt (tekst uit het verslag)**
- Elk van hen krijgt bij ons een snelle, toegankelijke website met een ontwerp dat voor die zaak gemaakt is.
  **verwerkt (tekst uit het verslag)**
- …en ze willen dat snel vinden.
  **verwerkt (tekst uit het verslag)**
- U weet wat uw website wordt voor u iets beslist.
  **verwerkt (tekst uit het verslag)**
- In het vrijblijvend voorstel ziet u welke pagina's uw website krijgt en wat ze kost, nog voor u iets beslist.
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-belgie/
- 01. Werken jullie echt in heel België? / 03. Maken jullie ook Franstalige websites?
  **verwerkt (tekst uit het verslag)**
- …daarna een eigen ontwerp dat snel laadt … / Een snelle, toegankelijke site (H3) / Een site die snel laadt op een gsm …
  **verwerkt (tekst uit het verslag)**
- Bij ons is dat telkens dezelfde persoon, die uw zaak kent. / Bij ons krijgt u eerst een vrijblijvend voorstel, … / Bij ons staat uw domeinnaam altijd …
  **verwerkt (tekst uit het verslag)**
- Leg de prijs naast wat erin zit. Deze punten kunt u bij elke webdesigner nagaan, ook bij ons.
  **verwerkt (tekst uit het verslag)**
- …de aanpak en de prijzen zijn dezelfde: eerst een vrijblijvend voorstel, daarna een eigen ontwerp …
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-brugge/
- Ondernemen in Brugge: wie uw klanten zijn (H2)
  **verwerkt (tekst uit het verslag)**
- 02. Maken jullie ook websites voor zaken in Sint-Andries, Assebroek of Zeebrugge?
  **verwerkt (tekst uit het verslag)**
- Wij maken daarvoor een snelle, toegankelijke site met een eigen ontwerp.
  **verwerkt (tekst uit het verslag)**
- U weet wat uw website wordt voor u iets beslist.
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-brussel/
- Ondernemen in Brussel: wie uw klanten zijn (H2)
  **verwerkt (tekst uit het verslag)**
- Dezelfde prijzen als overal: Start vanaf €490, Vakman vanaf €990 en Webshop vanaf €1.890, …
  **verwerkt (tekst uit het verslag)**
- 01. Kunnen jullie een website in het Nederlands, Frans en Engels maken? / 02. Werken jullie in alle 19 Brusselse gemeenten?
  **verwerkt (tekst uit het verslag)**
- Wij bouwen snelle, toegankelijke websites … / Hoe snel staat uw website in Brussel online? (H2)
  **verwerkt (tekst uit het verslag)**
- Een zaak in Brussel betaalt bij ons niet meer dan een zaak elders.
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-geel/
- Stappenkaart: '02. Vrijblijvend voorstel / … dat u rustig bekijkt.' + '03. Bouw / van de volledige website als u verder wilt.'
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-gent/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Ondernemen in Gent: wie uw klanten zijn (H2)
  **verwerkt (tekst uit het verslag)**
- Wie in Gent een zaak zoekt, typt vaak zijn wijk of deelgemeente mee, …
  **verwerkt (tekst uit het verslag)**
- Dat moet in een paar seconden duidelijk zijn.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Ook buiten Gent kunt u bij ons een website laten maken, overal in België.
  **verwerkt (tekst uit het verslag)**
- Zo weet u wat uw website wordt, nog voor u iets beslist. U zit nergens aan vast. / Een vrijblijvend voorstel toont wat uw website bevat en wat ze kost…
  **verwerkt (tekst uit het verslag)**
- 02. Kan ik eerst een vrijblijvend voorstel krijgen? / … U bekijkt het rustig en beslist daarna. / 01: '…dan maken wij eerst een vrijblijvend voorstel.…
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-hasselt/
- Ondernemen in Hasselt: wie uw klanten zijn (H2)
  **verwerkt (tekst uit het verslag)**
- Wilt u weten hoe wij werken en waarom? Lees meer over Kempen Webstudio of neem contact op.
  **verwerkt (tekst uit het verslag)**
- 01. Maken jullie ook websites voor zaken in Kermt, Kuringen of Stokrooie?
  **verwerkt (tekst uit het verslag)**
- Wij bouwen een snelle, toegankelijke website met een eigen ontwerp, waarop ze snel zien wat u verkoopt en waar u zit. / Hoe snel staat uw website in H…
  **verwerkt (tekst uit het verslag)**
- Volledig op afstand: een eerste gesprek online of aan de telefoon, daarna stuurt u wijzigingen per e-mail.
  **verwerkt (tekst uit het verslag)**
- Een zaak in Hasselt betaalt bij ons niet meer dan een zaak elders.
  **verwerkt (tekst uit het verslag)**
- In het vrijblijvend voorstel ziet u welke pagina's uw website krijgt en wat ze kost, nog voor u iets beslist.
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-herentals/
- Stappenkaart: '02. Vrijblijvend voorstel / … dat u rustig bekijkt.' + '03. Bouw / van de volledige website als u verder wilt.'
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-kasterlee/
- Stappenkaart: '02. Vrijblijvend voorstel / … dat u rustig bekijkt.' + '03. Bouw / van de volledige website als u verder wilt.'
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-kempen/
- Wie zoekt, typt vaak "in de buurt" of de naam van zijn eigen dorp.
  **verwerkt (tekst uit het verslag)**
- 06. Maken jullie ook websites voor verenigingen in de Kempen?
  **verwerkt (tekst uit het verslag)**
- Wilt u daarna nog beter gevonden worden in de streek, dan kan lokale SEO helpen.
  **verwerkt (tekst uit het verslag)**
- Dezelfde prijzen als overal in België: Start vanaf €490, …
  **verwerkt (tekst uit het verslag)**
- Stappenkaart: '02. Vrijblijvend voorstel / … dat u rustig bekijkt.' + '03. Bouw / van de volledige website als u verder wilt.'
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-kortrijk/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Ondernemen in Kortrijk: van vlas en meubels tot ontwerp (H2)
  **verwerkt (tekst uit het verslag)**
- Zo ziet een klant meteen of u tot bij hem werkt.
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-leuven/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Ondernemen in Leuven: universiteit, ziekenhuis en kmo's (H2)
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-mechelen/
- Ondernemen in Mechelen: wie uw klanten zijn (H2)
  **verwerkt (tekst uit het verslag)**
- 01. Maken jullie ook websites voor zaken in Muizen, Walem of Leest? / 05. Ik heb al een website. Kunnen jullie die vernieuwen?
  **verwerkt (tekst uit het verslag)**
- Voor hen bouwen wij een snelle, toegankelijke website … / 04. Hoe snel staat mijn website in Mechelen online?
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-mol/
- Wilt u meer, dan kan lokale SEO helpen.
  **verwerkt (tekst uit het verslag)**
- Stappenkaart: '02. Vrijblijvend voorstel / … dat u rustig bekijkt.' + '03. Bouw / van de volledige website als u verder wilt.'
  **verwerkt (tekst uit het verslag)**
- Wilt u zien hoe dat voor uw zaak wordt? Stuur ons een paar zinnen, dan maken wij een vrijblijvend voorstel.
  **verwerkt (tekst uit het verslag)**

### /website-laten-maken-turnhout/
- 06. Hoe snel staat mijn website in Turnhout online?
  **verwerkt (tekst uit het verslag)**
- Stappenkaart: '02. Vrijblijvend voorstel / … dat u rustig bekijkt.' + '03. Bouw / van de volledige website als u verder wilt.'
  **verwerkt (tekst uit het verslag)**

### /website-laten-vernieuwen/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- …nieuwe teksten en een snelle site, zonder te verliezen wat werkt. (meta)
  **verwerkt (tekst uit het verslag)**
- Wilt u dat wij de site daarna onderhouden, dan kan dat met los onderhoud, …
  **verwerkt (tekst uit het verslag)**
- U bekijkt het rustig en beslist daarna.
  **verwerkt (tekst uit het verslag)**

### /website-schilder/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Wie zijn huis wil laten schilderen, bekijkt eerst wat u eerder afwerkte.
  **verwerkt (tekst uit het verslag)**
- Zo herkent de bezoeker zijn eigen klus.
  **verwerkt (tekst uit het verslag)**
- Wij maken een vrijblijvend voorstel met uw diensten, uw werkgebied en een stijl die bij u past. / U bekijkt het rustig, en een kort antwoord volstaat.
  **verwerkt (tekst uit het verslag)**

### /website-starters/
- …zodat een klant weet waar hij aan toe is.
  **verwerkt (tekst uit het verslag)**
- U start of bent net gestart, en wilt een duidelijke website zonder gedoe.
  **verwerkt (tekst uit het verslag)**
- Wilt u doorgaan, dan bouwen wij uw website, met … (zelfde zin op 7 sectorpagina's)
  **verwerkt (tekst uit het verslag)**
- Daarna krijgt u een vrijblijvend voorstel, afgestemd op uw diensten en uw stijl. / Wij maken een vrijblijvend voorstel op maat van uw diensten en stij…
  **verwerkt (tekst uit het verslag)**

### /website-tuinaannemer/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- …wil weten of u in zijn buurt komt.
  **verwerkt (tekst uit het verslag)**
- In de winter bereikt ze wie zijn tuin voor het voorjaar wil laten aanleggen, …
  **verwerkt (tekst uit het verslag)**
- Zo vindt een klant met een nieuw tuinplan even makkelijk zijn weg als iemand die vast onderhoud zoekt.
  **verwerkt (tekst uit het verslag)**
- Een beeld van de kale grond naast het eindresultaat maakt het verschil zichtbaar, en alles laadt vlot op een smartphone.
  **verwerkt (tekst uit het verslag)**
- Wilt u doorgaan, dan bouwen wij uw website, met … (zelfde zin op 7 sectorpagina's)
  **verwerkt (tekst uit het verslag)**
- Wij maken een vrijblijvend voorstel met uw diensten, uw werkgebied en een stijl die bij uw tuinen past. / U kijkt ze rustig na en geeft ons een kort a…
  **verwerkt (tekst uit het verslag)**

### /website-vakmensen/
- U zit nergens aan vast.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Wie een vakman zoekt, wil in één oogopslag zien wat u doet, waar u werkt en hoe hij een offerte vraagt.
  **verwerkt (tekst uit het verslag)**
- Zo ziet de klant of u zijn werk doet.
  **verwerkt (tekst uit het verslag)**
- …zodat een klant zijn vraag meteen kan omschrijven.
  **verwerkt (tekst uit het verslag)**
- Of u nu in de stad of op het platteland werkt, wij maken websites voor vakmensen in heel België.
  **verwerkt (tekst uit het verslag)**
- Wilt u doorgaan, dan bouwen wij uw website, met … (zelfde zin op 7 sectorpagina's)
  **verwerkt (tekst uit het verslag)**
- Daarna krijgt u een vrijblijvend voorstel, afgestemd op uw diensten en uw stijl. / U bekijkt het wanneer het u past en stuurt ons een kort antwoord.
  **verwerkt (tekst uit het verslag)**

### /website-vereniging/
- Daarna maken wij een vrijblijvend voorstel, afgestemd op uw activiteiten en uw stijl. / U bekijkt het op uw gemak.
  **verwerkt (tekst uit het verslag)**

### /website-vrij-beroep/
- …wil weten of u zijn soort dossier behandelt.
  **verwerkt (tekst uit het verslag)**
- Zo leest een cliënt vooraf of hij bij u op de juiste plek zit, …
  **verwerkt (tekst uit het verslag)**
- Wilt u doorgaan, dan bouwen wij uw website, met … (zelfde zin op 7 sectorpagina's)
  **verwerkt (tekst uit het verslag)**
- Daarna krijgt u een vrijblijvend voorstel, afgestemd op uw diensten en uw stijl. / Wij maken een vrijblijvend voorstel op maat van uw diensten en stij…
  **verwerkt (tekst uit het verslag)**

### /website-winkel/
- Een klant ziet zo of hij voor zijn soort product bij u terecht kan, voor hij de verplaatsing maakt.
  **verwerkt (tekst uit het verslag)**
- Wil een klant zeker zijn dat iets er ligt, dan vraagt hij dat via het formulier of de telefoonknop, en legt u het opzij tot hij langskomt.
  **verwerkt (tekst uit het verslag)**
- Wie iets groots komt kopen, wil vooraf weten of hij vlak bij de deur kan laden.
  **verwerkt (tekst uit het verslag)**
- Wilt u online verkopen, dan past het pakket Webshop, met producten, online betalen en verzending.
  **verwerkt (tekst uit het verslag)**
- Wilt u doorgaan, dan bouwen wij uw website, met … (zelfde zin op 7 sectorpagina's)
  **verwerkt (tekst uit het verslag)**
- Daarna krijgt u een vrijblijvend voorstel, afgestemd op uw diensten en uw stijl. / Wij maken een vrijblijvend voorstel op maat van uw assortiment en s…
  **verwerkt (tekst uit het verslag)**

### /website-zorg/
- Wie voor het eerst komt, wil weten wat hij moet meebrengen en hoe lang het duurt.
  **verwerkt (tekst uit het verslag)**
- Vermeld daarom of een cliënt zijn identiteitskaart, een voorschrift of eerdere verslagen meeneemt, …
  **verwerkt (tekst uit het verslag)**
- Wilt u doorgaan, dan bouwen wij uw website, met … (zelfde zin op 7 sectorpagina's)
  **verwerkt (tekst uit het verslag)**
- Daarna krijgt u een vrijblijvend voorstel, afgestemd op uw diensten en uw stijl. / Wij maken een vrijblijvend voorstel op maat van uw behandelingen en…
  **verwerkt (tekst uit het verslag)**

### /fr/
- Si vous acceptez/approuvez la proposition, nous finalisons alors le site complètement.
  **verwerkt (tekst uit het verslag)**

### /fr/a-propos/
- …nous préparons une proposition sans engagement pour votre entreprise : vous voyez ce que contient votre site et ce qu’il coûte.
  **verwerkt (tekst uit het verslag)**

### /fr/conseils/contenu-site-internet/
- Si vous souhaitez voir à quoi peut ressembler votre propre site, envoyez alors un court e-mail …
  **verwerkt (tekst uit het verslag)**

### /fr/conseils/couts-recurrents-site-internet/
- Start coûte la première année à partir de €838,, soit €490 …
  **verwerkt (tekst uit het verslag)**

### /fr/conseils/delai-creation-site-internet/
- Si vous acceptez/approuvez la proposition, nous finalisons alors le site complètement.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/conseils/faire-creer-ou-creer-soi-meme/
- Start coûte €490 pour la réalisation et soixante fois €29,, ensemble à partir de €2.230. …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/creation-boutique-en-ligne/
- H2 'Voir à quoi peut ressembler votre boutique en ligne ?' / Vous l’examinez tranquillement, sans aucun engagement et vous décidez ensuite, …
  **verwerkt (tekst uit het verslag)**

### /fr/creation-site-internet-bruxelles/
- Entreprendre à Bruxelles : qui sont vos clients (H2)
  **verwerkt (tekst uit het verslag)**
- Découvrez nos exemples de sites.
  **verwerkt (tekst uit het verslag)**
- Découvrez qui nous sommes ou contactez-nous.
  **verwerkt (tekst uit het verslag)**
- Vous savez ce que sera votre site avant de décider. / La proposition sans engagement montre quelles pages aura votre site et ce qu’il coûte, …
  **verwerkt (tekst uit het verslag)**

### /fr/creation-site-internet-campine/
- Carte d’étape: '… que vous consultez tranquillement' + 'du site web complet si vous souhaitez poursuivre.'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/creation-site-internet-charleroi/
- Entreprendre à Charleroi : qui sont vos clients (H2)
  **verwerkt (tekst uit het verslag)**
- Découvrez nos exemples de sites.
  **verwerkt (tekst uit het verslag)**
- Vous savez ce que sera votre site avant de décider.
  **verwerkt (tekst uit het verslag)**

### /fr/creation-site-internet-courtrai/
- Entreprendre à Courtrai : du lin et des meubles au design (H2)
  **verwerkt (tekst uit het verslag)**

### /fr/creation-site-internet-gand/
- Entreprendre à Gand : qui sont vos clients (H2)
  **verwerkt (tekst uit het verslag)**
- Une proposition sans engagement montre ce que contient votre site web et ce qu’il coûte. / Vous la consultez tranquillement.
  **verwerkt (tekst uit het verslag)**

### /fr/creation-site-internet-geel/
- Carte d’étape: '… que vous consultez tranquillement' + 'du site web complet si vous souhaitez poursuivre.'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/creation-site-internet-herentals/
- Carte d’étape: '… que vous consultez tranquillement' + 'du site web complet si vous souhaitez poursuivre.'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/creation-site-internet-kasterlee/
- Carte d’étape: '… que vous consultez tranquillement' + 'du site web complet si vous souhaitez poursuivre.'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/creation-site-internet-liege/
- Entreprendre à Liège : qui sont vos clients (H2)
  **verwerkt (tekst uit het verslag)**
- Découvrez nos exemples de sites.
  **verwerkt (tekst uit het verslag)**
- Vous voyez d’abord ce que sera votre site à Liège.
  **verwerkt (tekst uit het verslag)**

### /fr/creation-site-internet-louvain/
- Entreprendre à Louvain : université, hôpital et PME (H2)
  **verwerkt (tekst uit het verslag)**

### /fr/creation-site-internet-mol/
- Envoyez-nous quelques phrases, nous établissons alors une proposition sans engagement.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Carte d’étape: '… que vous consultez tranquillement' + 'du site web complet si vous souhaitez poursuivre.'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/creation-site-internet-namur/
- Entreprendre à Namur : qui sont vos clients (H2)
  **verwerkt (tekst uit het verslag)**
- Découvrez nos exemples de sites.
  **verwerkt (tekst uit het verslag)**
- Découvrez notre approche à propos de Kempen Webstudio, ou prenez contact.
  **verwerkt (tekst uit het verslag)**
- Entièrement à distance : un premier échange en ligne ou par téléphone, puis vos modifications par e-mail.
  **verwerkt (tekst uit het verslag)**

### /fr/creation-site-internet-turnhout/
- Carte d’étape: '… que vous consultez tranquillement' + 'du site web complet si vous souhaitez poursuivre.'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/creation-site-internet/
- …d’abord une proposition sans engagement, ensuite un design propre …
  **verwerkt (tekst uit het verslag)**

### /fr/exemples-de-sites/
- Sur cette page figurent neuf exemples de design, chacun pour un métier différent. / meta 'Découvrez 9 exemples …'
  **verwerkt (tekst uit het verslag)**
- Nous établissons alors une proposition sans engagement pour votre propre entreprise, avec un design qui vous convient.
  **verwerkt (tekst uit het verslag)**

### /fr/prix-site-internet/
- Sur les sites d’autres agences web belges, nous avons relevé en novembre 2026 des prix d’entrée … Comparez donc toujours …
  **verwerkt (tekst uit het verslag)**
- H2 'Le faire soi-même, un freelance ou une agence web ?' + tableau + 'Kempen Webstudio se situe entre les deux : …'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- 16. … Sur les sites d’agences belges … Chez Kempen Webstudio, un site commence à €490 et une boutique à €1.890, HTVA.
  **verwerkt (tekst uit het verslag)**
- 17. Un freelance est-il moins cher qu’une agence ? + réponse
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- …facturé à notre tarif horaire de €60 HTVA, …
  **verwerkt (tekst uit het verslag)**
- H2 'Voir à quoi peut ressembler votre site web ?' / Vous la consultez tranquillement et vous nous dites si elle vous convient.
  **verwerkt (tekst uit het verslag)**

### /fr/referencement-seo/
- Nous ne promettons pas la première place dans Google : personne ne peut le promettre honnêtement. Nous annonçons en revanche le travail que nous faiso…
  **verwerkt (tekst uit het verslag)**
- … Nous ne promettons pas de position fixe.
  **verwerkt (tekst uit het verslag)**

### /fr/refonte-site-internet/
- Vous la consultez tranquillement.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-artisans/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-association/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-commerce/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-horeca/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-jardinier/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-jeunes-entreprises/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-peintre/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-profession-liberale/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-salon-de-coiffure/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /fr/site-internet-soins-bien-etre/
- …une proposition sans engagement, adaptée à vos services (carte, activités, style…) / Vous la consultez tranquillement …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/
- Have a website built, tailored to your business (H1)
  **verwerkt (tekst uit het verslag)**
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- If you accept the proposal, we then finish the site in full. (stap 3) / FAQ 'What does the no-obligation proposal involve?'
  **verwerkt (tekst uit het verslag)**

### /en/about-us/
- …we start with a no-obligation proposal …
  **verwerkt (tekst uit het verslag)**

### /en/kennis/
- …a no-obligation proposal, tailored to your services and your style.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/kennis/google-bedrijfsprofiel-aanmaken/
- …a no-obligation proposal, tailored to your services and your style.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/kennis/hoe-lang-duurt-website-laten-maken/
- …a no-obligation proposal, tailored to your services and your style.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- If you approve the proposal, we then finish the site in full. / You can review it at your leisure.
  **verwerkt (tekst uit het verslag)**

### /en/kennis/terugkerende-kosten-website/
- Start costs in the first year from €838,, … Vakman … from €1.578 … Webshop … from €2.838 …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/kennis/wat-moet-er-op-een-website-staan/
- If you want to see what your own site can look like, send a short email …
  **verwerkt (tekst uit het verslag)**

### /en/kennis/website-laten-maken-of-zelf-bouwen/
- Start costs €490 for the build and sixty times €29,, together from €2.230. …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/seo-services/
- … We never promise a fixed position.
  **verwerkt (tekst uit het verslag)**

### /en/voorbeeldontwerpen/
- We then prepare a no-obligation proposal for your own business, with a design that suits you.
  **verwerkt (tekst uit het verslag)**

### /en/wat-kost-een-website/
- On the websites of other Belgian web agencies we saw entry prices of roughly €700 to €2,200 … so always compare what you get: …
  **verwerkt (tekst uit het verslag)**
- H2 'DIY, a freelancer or a web agency?' + table + 'Kempen Webstudio sits in between: …'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- 16. … On Belgian agency websites we saw entry prices … With Kempen Webstudio a website starts from €490 and a shop from €1,890, excl. VAT.
  **verwerkt (tekst uit het verslag)**
- 17. Is a freelancer cheaper than an agency? + answer
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- …charged at our hourly rate of €60 excl. VAT, …
  **verwerkt (tekst uit het verslag)**
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/web-design-brussels/
- Doing business in Brussels: who your customers are (H2)
  **verwerkt (tekst uit het verslag)**
- …a no-obligation proposal, tailored to your services and your style.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- Know what your website will be before you decide. / A no-obligation proposal shows what your website will contain and what it costs …
  **verwerkt (tekst uit het verslag)**

### /en/webshop-laten-maken/
- Have an online shop built in Belgium, tailored to you (H1 + title)
  **verwerkt (tekst uit het verslag)**
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- You look at it at your leisure, you are under no obligation and then you decide, with the price known up front.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-design-belgium/
- Set the price against what is included. You can check these points with any web designer, including us.
  **verwerkt (tekst uit het verslag)**
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- …a no-obligation proposal first, then a custom design …
  **verwerkt (tekst uit het verslag)**

### /en/website-horeca/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (tekst uit het verslag)**

### /en/website-kapsalon/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-maken-geel/
- Step card: '… which you can review at your leisure' + '… of the full website if you wish to go ahead'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-maken-gent/
- Doing business in Ghent: who your customers are (H2)
  **verwerkt (tekst uit het verslag)**
- tailored to your business (5x: title, meta, H1, H2, body)
  **verwerkt, met bewuste uitzondering: "tailored to your business" blijft één keer staan in de H1 (en de daarvan afgeleide paginanaam), zoals het verslag zelf vraagt.**
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- You thus know what your website will be … / You thus see in advance what your website will be like. / A no-obligation proposal shows … / You look at i…
  **verwerkt (tekst uit het verslag)**

### /en/website-laten-maken-herentals/
- Step card: '… which you can review at your leisure' + '… of the full website if you wish to go ahead'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-maken-kasterlee/
- Step card: '… which you can review at your leisure' + '… of the full website if you wish to go ahead'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-maken-kempen/
- Step card: '… which you can review at your leisure' + '… of the full website if you wish to go ahead'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-maken-kortrijk/
- Doing business in Kortrijk: from flax and furniture to design (H2)
  **verwerkt (tekst uit het verslag)**
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-maken-leuven/
- Doing business in Leuven: university, hospital and SMEs (H2)
  **verwerkt (tekst uit het verslag)**
- tailored (5x: title, meta, H2, 2x body)
  **verwerkt (tekst uit het verslag)**
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-maken-mol/
- Step card: '… which you can review at your leisure' + '… of the full website if you wish to go ahead'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-maken-turnhout/
- Step card: '… which you can review at your leisure' + '… of the full website if you wish to go ahead'
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-laten-vernieuwen/
- €1.890 (prijskaart Webshop)
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**
- You look at it at your leisure.
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-schilder/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (tekst uit het verslag)**

### /en/website-starters/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (tekst uit het verslag)**

### /en/website-tuinaannemer/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (oude tekst weg; eigen formulering of geschrapt)**

### /en/website-vakmensen/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (tekst uit het verslag)**

### /en/website-vereniging/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (tekst uit het verslag)**

### /en/website-vrij-beroep/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (tekst uit het verslag)**

### /en/website-winkel/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (tekst uit het verslag)**

### /en/website-zorg/
- …a no-obligation proposal, tailored to your services (menu, range, style…) / You look at it at your leisure …
  **verwerkt (tekst uit het verslag)**