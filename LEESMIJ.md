# Kempen Webstudio: nieuwe website (design Webstudio K)

Statische site voor www.kempenwebstudio.be in het design van Webstudio K. Elke URL is volledige HTML: geen SPA en geen React in de browser. Eén klein script (13 kB, `defer`) doet de interactie.

## Gebruik

```
npm install                  # werkt zonder --legacy-peer-deps
npm run build                # dist-test/ (noindex) en dist-live/ (index,follow, sitemap, robots.txt, _headers)
npm run check                # linkcontrole incl. ankers, URL-lijsten, SEO, hreflang, JSON-LD (beide builds)
npm run serve                # dist-test op http://localhost:4100   (serve:live -> 4101)
npm run lighthouse           # Lighthouse mobiel + desktop op 7 paginatypes -> _lighthouse/
npm run screens              # volledige schermafbeeldingen 1440 en 390 px per paginatype -> _screens/
node scripts/overflow.mjs    # elke pagina op horizontaal scrollen controleren (390/1440)
node scripts/compare-design.mjs http://localhost:3001 http://localhost:4100   # origineel design naast de site -> _screens/vergelijking-*
npm run import -- --live     # inhoud opnieuw uit ../site halen (+ verbeterde FR/EN-teksten van online, + tekstcorrecties)
```

**Live zetten** gebeurt alleen na Karims OK. Je publiceert dan de volledige inhoud van `dist-live/`, en niets met de hand.

## Hoe het werkt

- **Design pixelgelijk.**
  - De componenten van het design (React/Tailwind uit commit 8cc9567) staan in `src/design/*.tsx`, met dezelfde opmaak en klassen.
  - Bij de build worden ze met React naar HTML gerenderd. React draait alleen tijdens de build.
  - Tailwind genereert de CSS uit dezelfde klassen. `src/css/site.css` is de `index.css` van het design, plus de fonts en de statische animaties.
- **Animaties.** motion/react is vervangen door CSS-klassen (fade, stagger, sectie, laden) en `site.js`. Alles gebeurt met transform/opacity, en bij "minder beweging" staat alles stil.
- **Interacties** in `site.js`:
  - sliders en keuzes (hero-kaart, 9 voorbeeldontwerpen, sectoren, voor/na, werkgebied, realisaties, cirkels);
  - de FAQ (filter op onderwerp en accordeon);
  - menupaneel, Diensten-submenu, klok (Europe/Brussels), voortgangsbalk en cursoreffect in de hero;
  - het contactvenster (elke "Gratis demo aanvragen"-knop) en het formulier (web3forms, met mailto als terugval);
  - de cookiekeuze, met statistiek pas na toestemming.
- **Inhoud.**
  - `src/site/model.mjs` leest elke pagina uit `content/` (NL/FR/EN) en vult er de designcomponenten mee.
  - Teksten blijven letterlijk (als HTML, dus links en opmaak in zinnen blijven behouden).
  - Onderpagina's zijn uitsluitend opgebouwd uit designcomponenten (`src/design/Blocks.tsx`):
    - de hero van de dienstenpagina;
    - de kaarten van werkwijze en voorbeelden;
    - de pakketkaarten, werkwijzekaarten en FAQ van de home;
    - het donkere CTA-blok en de sectorkaarten met beeld.
- **Controle bij elke build.** Elke tekst van de oude pagina moet op de nieuwe pagina staan; anders stopt de build. Tekst die alleen uit het design komt, staat in `TEKSTEN-UIT-HET-DESIGN.md`.
- **SEO per pagina.** Title, description, canonical, hreflang (nl-BE/fr-BE/en/x-default), Open Graph en alle JSON-LD blijven letterlijk. Het OG-beeld is nieuw (`/assets/og-v3.jpg`).
- **Robots en sitemap** werken zoals maak-live:
  - test: `noindex,nofollow` en `Disallow: /`;
  - live: volgens `config/live-config.json`;
  - de sitemap bevat exact dezelfde 105 URL's als online, met hreflang.
- **Voorbeeldsites.** De 9 fictieve klantensites worden ongewijzigd overgenomen.

## Stijlgids (14-11-2026): controle

| Onderdeel | Stijlgids | Design-repo vóór | Nu |
|---|---|---|---|
| Titels | Neue Montreal | DM Sans (Google Fonts) | **Switzer** (open vervanger, keuze Karim), zelf gehost |
| Tekst | Inter Tight | DM Sans / Plus Jakarta Sans | **Inter Tight**, zelf gehost |
| Kleuren | #FB4D27, #D3D6DA, #929090, #F2F2F2, #4C433F, zwart | precies deze 5 + koper #B85D28/#5E2A11/#D47A3B + obsidiaan #070709 | ongewijzigd (koper en obsidiaan zijn deel van het design, maar staan niet in de gids) |

- **Fontafstelling.** Switzer is iets breder en zwaarder dan DM Sans. Titels krijgen daarom gewicht 380/470/560 (in plaats van 400/500/600) en −0,012em extra letterafstand. Zo blijven breedte en kleur zo dicht mogelijk bij het design.
- **Licentie.** Zie `src/fonts/LICENTIES.md`. Neue Montreal is commercieel en wordt niet meegeleverd. Switzer valt onder de ITF Free Font License (gratis, ook commercieel); Inter Tight onder de OFL.
- **Tegenstrijdigheid in de stijlgids.** De gids is op één punt tegenstrijdig: bij Neue Montreal staat "Usage: Body Text" en bij Inter Tight "Title/Captions". Gevolgd is Karims bericht: titels in Neue Montreal (nu Switzer), tekst in Inter Tight.

## Bewuste afwijkingen van het design (klein, met reden)

1. **Sterren in de hero weggelaten** (5 sterren naast "Prijzen vanaf €490"). Die suggereren klantbeoordelingen, en die zijn er nog niet (CLAUDE.md regel 4: geen verzonnen reviews).
2. **Echte foto's in plaats van AI-portretten.**
   - De ronde sectorportretten tonen de bestaande sectorfoto's van de site.
   - Op de werkgebiedkaart en bij de cases staat het merkembleem in plaats van een (fictieve) persoon.
3. **Contrast (WCAG AA).** Koperkleurige tekst #B85D28 op lichtgrijs (#F2F2F2/#F7F7F8) wordt #9A4A1C waar de tekst klein is: FAQ-onderwerp, prijs per maand, stapnummers, prijslijsten. Op wit en op donker blijft de designkleur.
4. **Navigatie aangevuld.**
   - Bovenaan: Home, Diensten (submenu), Voorbeelden, Werkwijze, Kosten, Uitleg, Contact.
   - De footer heeft 4 kolommen (Diensten, Sectoren, Pagina's, Contact), met onderaan de 9 plaatsen als links.
5. **Hero-kaart** (Vaste prijs vooraf / Snel online): toont nu "Gratis demo, zonder verplichting" en "Prijzen vanaf €490 excl. btw" (tekst van de site).
6. **Formulier.** Na verzenden stuurt het formulier door naar `/bedankt/` (zoals nu), in plaats van een melding op de pagina. De oude verborgen statusmeldingen vervallen daardoor.
7. **Homepage.**
   - De drie telefoonafbeeldingen (oude "reel") en de knop "Gratis demo aanvragen" die op gsm dubbel stond, staan niet meer op de home.
   - De Google-zoekresultaat-nabootsing is vervangen door de voor/na-kaart van het design. De teksten ervan blijven.

## Teksten

- **Woord voor woord.** Alle bestaande teksten staan op de nieuwe pagina's; de build controleert dat.
- **Nieuw uit het design.** Labels, klok, "Naar boven", de capsules "Snel/Helder/Op maat", de kenmerken per voorbeeldontwerp, de regio's op de kaart en dergelijke. Ze staan allemaal in **`TEKSTEN-UIT-HET-DESIGN.md`** (ter goedkeuring). De FR/EN-versies komen uit de vertalingen in het design.
- **Online FR/EN gebruikt.** Op 31 FR/EN-pagina's staan online verbeterde vertalingen (per month, Gand, Courtrai …). Die zijn gebruikt; NL komt uit `site`.
- **Correcties** (`config/tekstcorrecties.json`, ook na elke nieuwe import): het onvertaalde "of bel" is op 15 FR-pagina's "ou appelez le" en op 15 EN-pagina's "or call" geworden.

## Open punten

1. **vertaal.mjs.** Een deel van de online FR/EN-verbeteringen zit in tekst die `site/_build/vertaal.mjs` beschermt en dus nooit vertaalt (bv. "€29 per maand" via de PROTECT-regel `€… (eenmalig|per maand)`). Daardoor kan `../vertaling` die fouten niet herstellen. `site/` en `../vertaling` zijn niet aangepast.
   - Voorstel: in vertaal.mjs "eenmalig/per maand" niet meer mee beschermen.
   - Voor de nieuwe site is `content/` in deze repo de bron; werk teksten daar bij (of herimporteer met `--live`).
2. **Contactformulier.** Lokaal zijn validatie, ingevuld pakket, contactvenster en foutmelding getest; er is niets verstuurd. Na publicatie één testaanvraag doen.
3. **Publicatie.** `dist-live/` vervangt de volledige huidige site. Op de server mogen daarna weg: `assets/lab4/*`, `assets/kw-fx.js`, `assets/kw-gedeeld.css`. `_headers` geldt voor Cloudflare Pages/Netlify (lange cache voor fonts, script en beelden).
4. **Goedkeuring nodig** van de teksten in `TEKSTEN-UIT-HET-DESIGN.md` en van de afwijkingen hierboven.
