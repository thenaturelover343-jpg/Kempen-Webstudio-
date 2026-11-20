# Bronnen van de beelden

Datum: 15-11-2026. Er zijn **geen nieuwe foto's van Unsplash of Pexels** gedownload. Elk beeld komt uit materiaal dat Kempen Webstudio al had (zie hieronder). De bronbestanden staan in `src/img/foto/bron/`.

| Beeld (id in `src/site/fotos.mjs`) | Bronbestand | Herkomst |
|---|---|---|
| horeca, starters, vereniging, vrij, winkel, zorg | `sec-*.webp` | bestaande site, `site/assets/img/` (sectorbeelden die nu al online staan) |
| gereedschap, vakman | `vakf-vakman2`, `vakf2-vakman` | bestaande site, `site/assets/img/` |
| gent, kortrijk, leuven | `stad-*-inh-1280.webp` | bestaande site, `site/assets/img/` (stadsbeelden die nu al online staan) |
| planner | `pl-ivelien-m-700.webp` | bestaande site: screenshot van de voorbeeldsite Kapsalon Ivelien |
| kapsalon, schilder, tuin, schrijnwerk, branderij, terras | `*-foto-*.webp` | foto's uit de voorbeeldsites (`site/kapsalon-voorbeeld/img/2`, `site/kleurwerk-voorbeeld/img/4`, `site/tuin-voorbeeld/img/2`, `site/houtatelier-nethe/img/3`, `site/webshop-voorbeeld/img/branderij`, `site/horeca-voorbeeld/img/terras`) |
| vb-* (9 voorbeeldsites) | `*-m600.webp`, `*-d1000.webp` | eigen screenshots van de 9 voorbeeldsites (bestaande site, `site/assets/img/`) |
| showcase op de home | `/assets/img/*-d640/d1000/d1600.webp` | dezelfde eigen screenshots van de 9 voorbeeldsites |
| portret | `hero-portret.jpg` | het hero-beeld uit het design (`design-bron/`), al gebruikt in de hero |
| kaart (contactpagina) | `kaart-kasterlee.png` | OpenStreetMap-tegels (© OpenStreetMap-bijdragers, ODbL), gemaakt met `scripts/kaart.mjs` op 15-11-2026; speld op het centrum van Kasterlee, niet op het huisadres. De bronvermelding staat op de pagina |
| deelbeelden per pagina | `src/img/og/*.jpg` | gemaakt met `scripts/og-paginas.mjs` uit het hero-beeld en de H1 van elke pagina |
| case-koelaanhangwagen, case-taponderhoud, case-barlicious | `case-*-d.png` | screenshot van de echte klantsites op 15-11-2026 (`scripts/shoot-sites.mjs`); alleen een fragment, zonder logo of cookiebanner |

## Aandachtspunten voor Karim

- **Licenties:** voor de foto's in de voorbeeldsites en de sectorbeelden van de oude site is de oorspronkelijke bron nergens genoteerd. Ze staan nu al online en ik heb ze alleen hergebruikt. Wilt u per foto de bron (bv. Unsplash of Pexels) vastleggen? Dan hoort die hier. Ik verzin geen bron.
- **Gezichten:** er staan geen bekende personen op en geen logo's van andere merken. Het hero-portret is een gestileerd silhouet uit het design. Bij de cases is het logo van de klantsite weggesneden.
- **Cases:** het zijn echte klantsites. Kunnen die klanten bezwaar hebben tegen een fragment van hun site op uw home? Dan kan elk fragment met één regel in `src/site/fotos.mjs` weg (`CASE_FOTO`).

## Sectorcirkels op de home (18-11-2026, Karim: "professionelere, mooiere foto's")

Alle vijf onder de Unsplash License: gratis, ook voor commercieel gebruik, naamsvermelding niet verplicht. Het zijn geen Unsplash+-beelden. Ze hebben dezelfde warme kleurgrading gekregen (iets warmer, lichte desaturatie, zachte contrastcurve), uitgesneden tot 900×900 en bewaard als WebP in src/img/foto/bron/. De build maakt er AVIF en WebP van, met vaste maten.

| Bestand | Onderwerp | Fotograaf | Bron |
|---|---|---|---|
| sector-vakman.webp | schrijnwerker aan het werk | Ali Mkumbwa | https://unsplash.com/photos/PxlKOcj0a3Q |
| sector-horeca.webp | chef werkt een gerecht af | Alfonso Betancourt | https://unsplash.com/photos/q4nWGwVM2Vk |
| sector-kapsalon.webp | kapper knipt haar | Farhad Ibrahimzade | https://unsplash.com/photos/V2HDOQTJh3o |
| sector-schilder.webp | schilder rolt een muur | Barney Goodman | https://unsplash.com/photos/Azz07JvM-EA |
| sector-tuin.webp | tuinaannemer zet een plant | Jonathan Kemper | https://unsplash.com/photos/CbZh3kaPxrE |

## Update 20-11-2026: vernieuwde voorbeeldsites

- **Screenshots** van de 7 vernieuwde voorbeeldsites (Tuinzorg Varelinde, Barbier Kolvaard, Kapsalon Ivelien, Dakwerken Hoogland, Bistro Tilvaar, Houtatelier Nethe, Atelier Kleurwerk) zijn opnieuw gemaakt: desktop 1280×800 (d1600/d1000/d640), gsm 390×844 (m600/m360), pagina volledig geladen, zonder intro of preloader. Ook `fr-houtatelier-*`, `fr-ivelien-*` (startbeeld en fotogalerij), `pl-ivelien-*` (boekingsplanner, stap Dag) en `pl-dak-*` (offerteformulier, eerste stap) komen nu uit de nieuwe versies. Velours en Vennebrand zijn ongewijzigd.
- **kapsalon**: `kapsalon-ivelien-g2.webp` (foto uit de nieuwe Kapsalon Ivelien: kapper knipt haar met een schaar) vervangt `kapsalon-foto-2.webp` uit de oude versie.
- **terras**: de terrasfoto uit de oude horeca-voorbeeldsite bestaat niet meer in Bistro Tilvaar; het beeld gebruikt nu `sec-horeca-1400.webp` (gedekte tafels in een restaurant, bestaande site).
- **schilder, tuin, schrijnwerk**: `kleurwerk-foto-4`, `tuin-foto-2` en `houtatelier-foto-3` zijn dezelfde foto's (pixelvergelijking, alleen anders gecomprimeerd) als in de nieuwe voorbeeldsites (`kwasten.webp`, `img/d2-1400.webp`, `schaaf.webp`) en blijven.

## Update 20-11-2026 (2): controle Marieke

- **Screenshots** `barbier-voorbeeld-*` (titel past nu op gsm, ook op 360 px), `schoonheidssalon-voorbeeld-*` en `webshop-voorbeeld-*` (alle maten d1600/d1000/d640/m600/m360 en de bronnen d1000/m600; nu met «Webstudio K» in plaats van «Kempen Webstudio») zijn opnieuw gemaakt. De kaart `vb-barbier` toont nu de volledige titel (uitsnede top 400).
- **Foto's in de voorbeeldsites** (regel van Karim: geen foto's die niets met het vak te maken hebben). Alle vervangers komen van Pexels, onder de Pexels License (gratis, ook commercieel, naamsvermelding niet verplicht, geen watermerk); uitgesneden tot exact de oude maten.

| Voorbeeldsite | Bestand | Oud | Nieuw | Fotograaf | Bron |
|---|---|---|---|---|---|
| Tuinzorg Varelinde | img/d4-1400.webp, img/d4-800.webp | park met wandelpad en oude bomen | gazon wordt gemaaid met een duwmaaier | Magic K | https://www.pexels.com/photo/a-person-mowing-the-lawn-6728926/ |
| Dakwerken Hoogland | img/woning.webp | bakstenen woning (geen werk) | dakwerkers hijsen latten naar een donker dak | hans middendorp | https://www.pexels.com/photo/men-working-on-the-roof-8576025/ |
| Dakwerken Hoogland | img/dorp.webp | luchtfoto van een dorp | dakwerker op een hoogwerker aan een bakstenen gevel | Gundula Vogel | https://www.pexels.com/photo/roofer-performing-maintenance-on-red-brick-building-31762405/ |
| Atelier Kleurwerk | img/zetel(-sm).webp | woonkamer met zetel | schilders in een woonkamer, stoel afgedekt | Blue Bird | https://www.pexels.com/photo/couple-doing-house-renovations-7217957/ |
| Atelier Kleurwerk | img/eetruimte(-sm).webp | witte eetruimte | schilder op een ladder zet een grondlaag | Ksenia Chernaya | https://www.pexels.com/photo/faceless-house-painter-undercoating-wall-in-bright-room-5691471/ |
| Atelier Kleurwerk | img/woonkamer(-sm).webp | woonkamer met visgraatparket | schilders zetten plafond en muren in de verf | Tima Miroshnichenko | https://www.pexels.com/photo/couple-painting-the-room-6474482/ |

## Update 20-11-2026 (3): Atelier Kleurwerk, vakmannen en behang

Na de hercontrole van Marieke: de foto's `zetel` en `woonkamer` in «Uit het atelier» lazen als een koppel dat zelf klust, en dienstkaart 03 «Behangwerken» toonde een verfroller. Vervangers van Pexels, onder de Pexels License (gratis, ook commercieel, naamsvermelding niet verplicht, geen watermerk), op volle grootte nagekeken en uitgesneden tot exact de oude maten (zetel 1400×930 / 800×531, woonkamer 1400×934 / 800×534). Kaart 03 heeft nu een eigen bestand `behang-sm.webp` (800×534); `woonkamer-sm.webp` wordt alleen nog in de galerij gebruikt. De screenshots `kleurwerk-voorbeeld-*` tonen alleen de hero en zijn dus niet gewijzigd.

| Bestand | Oud | Nieuw | Fotograaf | Bron |
|---|---|---|---|---|
| img/zetel.webp, img/zetel-sm.webp | koppel schildert een woonkamer (Pexels 7217957) | schilder in grijze overall en stofmasker spuit de wanden van een afgedekte kamer | Tima Miroshnichenko | https://www.pexels.com/photo/man-in-black-jacket-and-black-pants-wearing-white-helmet-6474300/ |
| img/woonkamer.webp, img/woonkamer-sm.webp | koppel schildert een kamer (Pexels 6474482) | schilder in grijze overall spuit de bovenkant van de muur, ruimte afgeplakt en afgedekt met folie (uitsnede rechts) | Tima Miroshnichenko | https://www.pexels.com/photo/a-man-in-gray-suit-painting-a-house-6474199/ |
| img/behang-sm.webp (nieuw, kaart 03 Behangwerken; was woonkamer-sm.webp) | verfroller (woonkamer-sm) | een baan behang wordt tegen de muur gezet en aangestreken (uitsnede) | Nataliya Vaitkevich | https://www.pexels.com/photo/back-view-of-a-woman-standing-on-a-table-near-the-wall-5641766/ |

## Update 20-11-2026 (4): Atelier Kleurwerk, behangfoto kaart 03

Marieke keurde `zetel` en `woonkamer` goed, maar `behang-sm.webp` (Pexels 5641766) las als doe-het-zelf. Vervangen door een **eigen AI-beeld** (door ons gegenereerd, geen watermerk, geen rechten van derden): een vakman in grijze overall strijkt behang aan met een behangborstel. Bron 1152×864, uitsnede x 100–1150 / y 0–700 (3:2), geëxporteerd als `img/behang-sm.webp` 800×534. Alleen gebruikt op dienstkaart 03 «Behangwerken» (decoratief, alt leeg); de kaartuitsnede (object-cover, midden) houdt man, borstel en muur in beeld op 390 en 1280, object-position bleef ongewijzigd.
