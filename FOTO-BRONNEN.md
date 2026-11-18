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
