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
| case-koelaanhangwagen, case-taponderhoud, case-barlicious | `case-*-d.png` | screenshot van de echte klantsites op 15-11-2026 (`scripts/shoot-sites.mjs`); alleen een fragment, zonder logo of cookiebanner |

## Aandachtspunten voor Karim

- **Licenties:** voor de foto's in de voorbeeldsites en de sectorbeelden van de oude site is de oorspronkelijke bron nergens genoteerd. Ze staan nu al online en ik heb ze alleen hergebruikt. Wilt u per foto de bron (bv. Unsplash of Pexels) vastleggen? Dan hoort die hier. Ik verzin geen bron.
- **Gezichten:** er staan geen bekende personen op en geen logo's van andere merken. Het hero-portret is een gestileerd silhouet uit het design. Bij de cases is het logo van de klantsite weggesneden.
- **Cases:** het zijn echte klantsites. Kunnen die klanten bezwaar hebben tegen een fragment van hun site op uw home? Dan kan elk fragment met één regel in `src/site/fotos.mjs` weg (`CASE_FOTO`).
