# Foto's: lege beeldvakken (inventaris en stand)

Datum: 15-11-2026.

**Methode:** `scripts/slotcheck.mjs` loopt alle 107 pagina's door (NL/FR/EN, op 1440 en 390 px). Ook de verborgen slides van elke slider worden meegeteld. Het script zoekt vier soorten lege vakken:
- een embleem (de vier blokjes) in een vak van 56 px of groter;
- initialen in plaats van een beeld;
- beelden die niet laden;
- effen vlakken zonder inhoud.

Daarnaast heb ik elke pagina vergeleken met de oude site, om te zien welke beelden daar wel stonden en nu niet meer.

**Resultaat:**
- vóór: 338 meldingen;
- na: **0 lege beeldvakken op 107 pagina's**, op beide breedtes.

## Gevonden plekken

| # | Plek | Pagina's | Was | Nu |
|---|---|---|---|---|
| 1 | Zwevende hero-kaart, home | home NL/FR/EN | zwart vak met embleem | per slide een screenshot van een voorbeeldsite (Houtatelier Nethe, Kapsalon Ivelien) |
| 2 | Voorbeeldontwerpen-showcase, home | home NL/FR/EN, 9 slides | initialen ("HO", "BI", …) op zwart | echte screenshot van elk van de 9 voorbeeldsites in een browserkader |
| 3 | Kaart "Werkt in heel België", cirkel | home NL/FR/EN, 4 plaatsen | embleem in een zwarte cirkel | Kasterlee en Turnhout/Geel: het portret uit de hero; Gent & Leuven: foto van Gent; Kortrijk: foto van Kortrijk |
| 4 | Casekaarten 01–03 | home NL/FR/EN | embleem in een zwart vierkant | fragment van de echte site: koelaanhangwagenverhuur.be, taponderhoud.be, barlicious.be |
| 5 | Zwevende hero-kaart, alle onderpagina's | 104 pagina's: diensten, sectoren, steden, kennis, juridisch, 404, bedankt | zwart vak met embleem | een beeld per pagina (zie de tabel hieronder) |
| 6 | Prijskaart zonder prijs ("Per maand") | webshop-laten-maken NL/FR/EN | zwart vlak met embleem | screenshot van de voorbeeldwebshop Vennebrand |
| 7 | Beeld dat op de oude site wel stond | webshop-laten-maken (screenshot Vennebrand) | ontbrak | staat nu in de hero-kaart |
| 8 | Beeld dat op de oude site wel stond | website-vereniging (foto clublokaal) | ontbrak | staat nu in de hero-kaart |

## Beeld per onderpagina (hero-kaart)

| Pagina | Beeld |
|---|---|
| Webshop laten maken | voorbeeldwebshop Vennebrand |
| Website laten vernieuwen | voorbeeldsite Houtatelier Nethe |
| Logo en huisstijl | voorbeeldsite Barbier Kolvaard (typografie) |
| Toegankelijke website | voorbeeldsite Kapsalon Ivelien |
| Wat kost een website | voorbeeldsite Velours |
| Voorbeeldontwerpen | voorbeeldsite Bistro Tilvaar |
| Sector horeca | restaurantinterieur |
| Sector kapsalon | kapper met schaar |
| Sector schilder | schilderskwasten |
| Sector starters | laptop, notitieboek en koffie |
| Sector tuinaannemer | tuinpad tussen borders |
| Sector vakmensen | vakman met schuifmaat |
| Sector vereniging | clublokaal |
| Sector vrij beroep | praktijkruimte |
| Sector winkel | winkelinterieur |
| Sector zorg | behandelruimte |
| Stad Gent | Gent |
| Stad Kortrijk | Kortrijk |
| Stad Leuven | Leuven |
| Geel, Herentals, Kasterlee, Kempen, Mol, Turnhout | een voorbeeldsite per pagina: Tuinzorg, Dakwerken, Houtatelier, Kleurwerk, Vennebrand, Kapsalon |
| Kennis (overzicht) | laptop en notitieboek |
| Google Bedrijfsprofiel | terras van een zaak |
| Hoe lang duurt het | afsprakenplanner (Kapsalon Ivelien) |
| Terugkerende kosten | voorbeeldsite Atelier Kleurwerk |
| Wat moet er op een website | voorbeeldsite Dakwerken Hoogland |
| Fiscaal aftrekbaar | praktijkruimte met bureau |
| Laten maken of zelf bouwen | gereedschap op een werkbank |
| Wettelijke vermeldingen | voorbeeldsite Tuinzorg Varelinde |
| WordPress of maatwerk | schaaf en houtkrullen (maatwerk) |
| Privacy, cookies, bedankt, 404 | voorbeeldsites Velours, Vennebrand, Houtatelier, Barbier |

## Bewuste keuze

Voor de Kempense steden (Geel, Herentals, Kasterlee, Mol, Turnhout, Kempen) staat geen stadsfoto maar een voorbeeldsite. Daar zijn twee redenen voor:
- Er is geen eigen foto van die steden.
- Op Unsplash vond ik geen beeld waarvan de plaats zeker klopt. Een willekeurig dorpsbeeld als "Turnhout" tonen zou een verzonnen feit zijn.

Heeft Karim eigen foto's van de streek of van het atelier in Kasterlee? Dan gaan die erin door één regel in `src/site/fotos.mjs` aan te passen.

## Hoe het werkt

- `src/site/fotos.mjs` bevat per beeld de bron, de uitsnede en de alt-tekst in NL, FR en EN, en welk beeld op welke pagina staat.
- De bronbestanden staan in `src/img/foto/bron/`.
- De build maakt van elke gebruikte combinatie een AVIF en een WebP in twee breedtes (srcset), met vaste width en height (geen CLS).
- Onder de vouw laden de beelden lazy.
