# Fouten op de home (en het doortrekken naar alle pagina's)

Datum: 14-11-2026. Methode:
- de home sectie per sectie naast het originele design (commit 8cc9567) gelegd, op 1440 en 390 px (`scripts/compare-sections.mjs`);
- alles aangeklikt met `scripts/test-home.mjs`: cookiebanner, menu, Diensten-submenu, taalkeuze, sliders en keuzes, FAQ, contactvenster, formulier, zwevende knoppen, scrollen, beelden, links en ankers, JS-fouten (57 controles).

Bewuste afwijkingen die blijven (zie LEESMIJ): geen sterren, echte sectorfoto's in plaats van AI-portretten, het embleem in plaats van fictieve personen, een aangevulde navigatie en footer.

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
