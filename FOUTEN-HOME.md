# Fouten op de home (en het doortrekken naar alle pagina's)

Datum: 14-11-2026. Methode:
- de home sectie per sectie naast het originele design (commit 8cc9567) gelegd, op 1440 en 390 px (`scripts/compare-sections.mjs`);
- alles aangeklikt met `scripts/test-home.mjs`: cookiebanner, menu, Diensten-submenu, taalkeuze, sliders en keuzes, FAQ, contactvenster, formulier, zwevende knoppen, scrollen, beelden, links en ankers, JS-fouten (57 controles).

Bewuste afwijkingen die blijven (zie LEESMIJ): geen sterren, echte sectorfoto's in plaats van AI-portretten, echte beelden in plaats van fictieve personen (zie ronde 3), een aangevulde navigatie en footer.

## Home: gevonden en opgelost

| # | Sectie | Fout | Oplossing |
|---|---|---|---|
| 1 | Diensten | Kaarten 01–04 waren veel hoger dan in het design: elke dienst stond onder elkaar (tot 6 regels), waardoor de kaarten ongelijk werden | Diensten staan nu compact naast elkaar, gescheiden door " · " (2–3 regels, zoals de tags in het design); de tekst blijft dezelfde |
| 2 | Werkwijze | Kaarten waren leeg in vergelijking met het design: geen label rechtsboven, geen slotregel naast de pijl, geen intro rechts naast de titel | Labels (Dag 1 / Vaste prijs / 5–10 werkdagen / Doorlopend), slotregels en de intro uit het design toegevoegd, NL/FR/EN |
| 3 | Prijzen | "Wat zit erin" stond dubbel boven "Alles uit Start, en daarbovenop" | Label alleen nog voor schermlezers als er een "Alles uit…"-regel is |
| 4 | Prijzen | "In de maandprijs" stond als losse vette kop in plaats van inline | Inline met dubbelpunt, zoals in het design |
| 5 | Prijzen | "+ vanaf €29" had niet de koperkleur van het design | Bedrag koper (op koper: wit), de rest grijs |
| 6 | Cirkels | "5 werkdagen / Online binnen" las verkeerd; "Eén aanspreekpunt" had geen ondertitel; bij "Heel België" stond het adres twee keer | Ondertitels uit het design: "Start-pakket online", "Mobile-first / Snel op gsm en computer", "Eén vast aanspreekpunt" |
| 7 | Cirkels | Het label onder "Heel België" overlapte de tekst in het midden | Middentekst iets smaller op desktop |
| 8 | Hero-strip (390) | Item 2 en 3 stonden naast elkaar op één regel | Op gsm onder elkaar, zoals het design |
| 9 | FAQ | Ondertitel uit het design ontbrak | Toegevoegd ("Duidelijke antwoorden over onze aanpak, vaste prijzen en oplevering.") |

Gecontroleerd en in orde: hero (portret, cursor, parallax, kaart-slider), voorbeeldontwerpen-slider (9), sectorkiezer, voor/na-kaart, realisaties en cases, contactformulier, menupaneel, submenu, taalkeuze, cookiebanner, hovers, zwevende knoppen (pas na de hero, weg bij het formulier), geen horizontaal scrollen, alle beelden geladen, alle ankers bestaan, geen JS-fouten.

## Onderpagina's: design doorgetrokken

| # | Waar | Probleem | Oplossing |
|---|---|---|---|
| 10 | Diensten, sectoren | Een 5e werkwijzekaart stond alleen op een nieuwe rij | Raster volgt het aantal kaarten (3 / 4 / 5 naast elkaar) |
| 11 | Alle pagina's | Korte tekstsecties zagen eruit als "tekst in een sjabloon" | Korte secties staan in het lichtgrijze afgeronde paneel van de home |
| 12 | Sectoren, artikels | Lange witte tekstsecties na elkaar | De tweede wordt telkens een paneel (ritme wit/paneel/donker zoals op de home) |
| 13 | Privacy, cookies | Juridische artikels waren kale tekst met lijnen | Artikels als afgeronde kaarten (zoals de FAQ-/werkwijzekaarten) |
| 14 | 404, bedankt | Mager: enkel kleine linkjes | De vier links als capsules van de home (licht / koper / zwart / grijs) |
| 15 | Voorbeeldontwerpen | Groep van 4 ontwerpen viel uiteen in 3 + 1 | 4 naast elkaar |
| 16 | Stadspagina's (NL/FR/EN) | CTA-titel eindigde op "??" ("Een website voor uw zaak in Geel??") | Fout in de tekstregel (`config/demo-weg.json`) hersteld |
| 17 | Toegankelijkheid | De grote introzin begon met een kleine letter ("ook voor wie…") | Eerste letter van introzinnen via CSS als hoofdletter; de tekst zelf blijft gelijk |

De nieuwe designteksten (labels en slotregels van de werkwijze, de FAQ-ondertitel) staan automatisch in `TEKSTEN-UIT-HET-DESIGN.md` (ter goedkeuring).

## Ronde 2 (15-11-2026, na Karims controle van de final-screenshots)

| # | Waar | Probleem (Karim) | Oplossing |
|---|---|---|---|
| 18 | Home, diensten | Groot leeg zwart vlak links onder de titel, "Alle prijzen zijn exclusief btw" verloren onderaan, kaart 01 hoger en kaart 04 alleen rechts | Titel links en introtekst + knop rechts op één rij; de vier dienstkaarten daaronder in één rij van vier, even hoog, nummers op dezelfde lijn (op tablet 2 × 2). De dubbele losse btw-regel is weg (de zin staat al in de intro) |
| 19 | Home, "Werkt in heel België" | Label "Kasterlee & Kempen" viel achter de logocirkel | Labels verplaatst (Kasterlee boven-rechts van de cirkel, de rest verder naar buiten); nagemeten op 820, 1100 en 1440 px: geen overlap |
| 20 | Hero van elke onderpagina | Alleen tekst op grijs met een lege rechterhelft | Zelfde opbouw als de home-hero: het portret (gecentreerd achter de inhoud, op gsm onder de knoppen), de zwevende kaart rechts met een paginaspecifieke boodschap (de paginanaam, bv. "Webshop laten maken" of "Website laten maken in Geel", daarna de troeven van de pagina), de sectorlijst, de grote WEBSTUDIO K-wordmark en de donkere strip; zelfde hoogte (schermvullend) |
| 21 | Lange tekstsecties (kennisartikels, diensten, sectoren, steden) | Lege linkerkolom met alleen een titel, daarnaast een muur van tekst | Nieuwe tekstsectie met home-componenten: links de titel met een groot koperkleurig sectienummer, rechts de eerste alinea als grote lead-zin (eerste zin donker, rest grijs) met koperen accentlijn en aanhalingsteken; de volgende alinea's als genummerde kaarten (01., 02. …) met de eerste zin vet. Wit, lichtgrijs paneel en donker wisselen af (nooit twee panelen na elkaar) |
| 22 | Stadspagina's | Kaarten I en II lieten de derde plek leeg | Kaarten I–III staan rechts naast de titel: I en II naast elkaar, III eronder over de volle breedte |
| 23 | Alle paginatypes | Zelfde soort gaten elders | Nieuw `scripts/gapcheck.mjs` meet op elke pagina elk raster en elke 2-koloms indeling. Gevonden en opgelost: FAQ's met een oneven aantal vragen (nu twee kolommen, eerste helft links), voorbeeldontwerpen met 2 ontwerpen in 3 kolommen (nu raster volgens het aantal), 5 werkwijzestappen op tablet (laatste over de volle breedte), lege kolom op de bedanktpagina (links nu naast de titel), prijskaart zonder prijs en knop (onderaan het embleemvlak van de hero-kaart). Resultaat: 0 gaten op 820, 1100 en 1440 px |

Algemene regel in de code (`Blocks.tsx`): een raster verdeelt een onvolledige laatste rij altijd over de volle breedte (`span6`/`span2`), zodat er nergens nog een lege plek kan ontstaan.

## Ronde 3 (15-11-2026): foto's overal

| # | Waar | Probleem (Karim) | Oplossing |
|---|---|---|---|
| 24 | Home en alle 104 onderpagina's | Zwarte vakken met alleen het embleem, initialen ("HO") in de voorbeeldontwerpen, embleem in de kaartcirkel en bij de cases | Elk vak gevuld met een passend beeld: screenshots van de 9 voorbeeldsites, de bestaande sector- en stadsfoto's, foto's uit de voorbeeldsites, fragmenten van de 3 klantsites. Inventaris in `FOTOS-TODO.md`, herkomst in `FOTO-BRONNEN.md` |
| 25 | Webshop, vereniging | Beeld dat op de oude site stond, ontbrak | Staat nu in de hero-kaart |
| 26 | Controle | Geen automatische controle op lege beeldvakken | Nieuw `scripts/slotcheck.mjs` (embleemvakken, initialen, niet geladen beelden, lege vlakken, ook in verborgen slides): 0 op 107 pagina's, 1440 en 390 px |
