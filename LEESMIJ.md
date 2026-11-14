# Kempen Webstudio: nieuwe website (design Webstudio K)

Statische site voor www.kempenwebstudio.be, in het nieuwe design. Elke URL is volledige HTML: geen SPA en geen framework in de browser. Eén klein script (9 kB, `defer`) doet de interactieve delen.

## Gebruik

```
npm install                  # werkt zonder --legacy-peer-deps
npm run build                # dist-test/ (noindex) en dist-live/ (index,follow, sitemap, robots.txt)
npm run check                # linkcontrole, URL-lijsten, SEO, hreflang, JSON-LD (beide builds)
npm run serve                # dist-test op http://localhost:4100  (serve:live -> 4101)
npm run lighthouse           # Lighthouse mobiel + desktop op 7 paginatypes -> _lighthouse/
npm run screens              # schermafbeeldingen 1440 en 390 px per paginatype -> _screens/
node scripts/overflow.mjs    # elke pagina op horizontaal scrollen controleren (390/1440)
npm run import -- --live     # inhoud opnieuw uit ../site halen (+ verbeterde FR/EN-teksten van online)
```

**Live zetten** gebeurt alleen na Karims OK. Je publiceert dan de volledige inhoud van `dist-live/`, en niets met de hand.

## Opbouw

| Map | Inhoud |
|---|---|
| `content/` | De inhoud: alle pagina's (NL, /fr/, /en/), voorbeeldsites en beelden. Geïmporteerd uit `../site` (commit da5fea3); zie `content/_import-verslag.json`. |
| `config/live-config.json` | Robots per pagina en voorbeeldsites. Komt uit `site/_build`, zodat de logica van maak-live behouden blijft. |
| `config/sitemap-online.xml` | De online sitemap van 14-11-2026: volgorde en URL-controle. |
| `src/css/site.css` | Het design. Wordt inline in elke pagina gezet (geminificeerd 49 kB, gzip ongeveer 9 kB). |
| `src/js/site.js` | De interactie: menu, Diensten-submenu, mobiel menu, formulier, pakketkeuze, cookiekeuze, statistiek na toestemming en verschijnen bij scrollen. |
| `src/img/og-v3.jpg` | Het nieuwe deelbeeld. Je maakt het opnieuw met `node scripts/make-og.mjs`. |
| `design-bron/` | Het hero-portret uit het design. AVIF- en WebP-varianten worden bij de build gemaakt. |
| `scripts/` | `build`, `check`, `serve`, `lighthouse`, `screens`, `overflow`, `import-content`, `make-og`. |

## Wat de build doet

- **Head per pagina.** Title, description, canonical, hreflang (nl-BE/fr-BE/en/x-default), Open Graph, Twitter en alle JSON-LD komen letterlijk uit de bron. Alleen het OG-beeld is nieuw (`/assets/og-v3.jpg`; `og-v2.jpg` blijft bestaan).
- **Teksten.** Bij elke build wordt de hoofdtekst van elke pagina vergeleken met de bron. Die is woord voor woord gelijk; bij elk verschil stopt de build met een fout.
- **Header, footer en cookiemelding.** De bestaande (vertaalde) opbouw krijgt het nieuwe design: NL/FR/EN-schakelaar, Diensten-submenu, de footer met 9 steden en de Kempen-pagina's.
- **Beelden.**
  - AVIF naast elke WebP/JPG, met `<picture>`, `srcset`/`sizes` per container en kleinere varianten waar het design kleiner toont.
  - Overal width/height, lazy onder de vouw.
  - Het hero-beeld krijgt preload met `fetchpriority=high`.
- **Lettertype.** DM Sans wordt zelf gehost (latin-subset, variabel, 37 kB), met preload en een fallback met aangepaste metriek.
- **Voorbeeldsites.** De 9 fictieve klantensites worden ongewijzigd overgenomen, met dezelfde robots-waarde als live.
- **Robots en sitemap.**
  - test: `noindex,nofollow` overal en `Disallow: /`.
  - live: `index,follow` behalve wat in `live-config.json` staat (404, bedankt, privacy, cookies, voorbeeldsites).
  - De sitemap bevat 105 URL's met hreflang. Dat is exact dezelfde lijst als online.
- **Animaties.** Alleen transform en opacity. Bij "minder beweging" staat alles stil.

## Keuzes (gemaakt zonder vraag, hier vastgelegd)

1. **Statische HTML in plaats van React.** Het template (React, Vite, Gemini, Express, "Zenrixa") is verwijderd. Het design is overgenomen in CSS op de bestaande, semantische opbouw van de pagina's. Zo blijven teksten, links, ankers en structured data op elke pagina gegarandeerd gelijk.
2. **Nieuwere FR/EN-teksten van online.** Online staan op 31 FR/EN-pagina's verbeterde vertalingen die nog niet in `site` of `site-live` zitten. Voorbeelden: "per month" i.p.v. "per maand", Ghent/Gand, Courtrai, Louvain, "nouveaux entrepreneurs", "Sans aucun engagement". Voor die pagina's is de online versie gebruikt; NL komt altijd uit `site`.
3. **Drie NL-descriptions verschillen met online** (Gent, Kortrijk, Leuven). Ik heb de versie uit `site` behouden: die is nieuwer en vermeldt "Prijzen vanaf €490 excl. btw".
4. **Naam.**
   - Overal "Kempen Webstudio": logo, titels, NAP en JSON-LD.
   - "WEBSTUDIO K" alleen als groot decoratief woordmerk in de home-hero (`aria-hidden`).
   - E-mail is info@kempenwebstudio.be (het template had een verkeerd adres).
5. **Beelden.**
   - Het portret uit het design staat alleen op de home.
   - De AI-portretten van "teamleden" en "klanten" uit het template zijn niet gebruikt, omdat ze echte klanten zouden suggereren. De sectorkaarten tonen de bestaande sectorfoto's.
6. **Iconen.** De favicon en app-iconen hebben het nieuwe logo (oranje vlak). De bestanden `kw-192.png` en `kw-512.png` uit het manifest bestaan nu ook in de build.

## Tekstwijzigingen ter goedkeuring (Karim)

De hoofdtekst is nergens gewijzigd. Deze kleine zaken zijn nieuw of anders:

1. **Menuknop (gsm).** Toont nu het woord "Menu"; vroeger alleen twee streepjes. Het woord is in NL, FR en EN hetzelfde.
2. **Zwevende knop rechtsonder.** Toont "Gratis demo aanvragen" (bestaande tekst) met een chaticoon. De belknop is op gsm een icoon met verborgen label "Bel ons".
3. **Dubbele knop op de home weggelaten.** De extra knop "Gratis demo aanvragen" (alleen gsm) onderaan de veelgestelde vragen viel samen met de zwevende knop.
4. **Woordmerk.** Groot woordmerk "WEBSTUDIO K" in de home-hero (decoratief).
5. **Foutmelding van het formulier in FR/EN.** Stond in het Nederlands; nu vertaald:
   - FR: "L’envoi a échoué. Réessayez ou écrivez à info@kempenwebstudio.be."
   - EN: "Sending failed. Please try again or email info@kempenwebstudio.be."
6. **Taalknoppen (voor schermlezers).** Het label is nu "NL – Nederlands", "FR – Français" en "EN – English".

## Open punten

1. **"of bel" staat onvertaald op 15 FR- en 15 EN-pagina's**, in de CTA "Or email … of bel …". Dat is ook zo op de huidige site. Voorstel:
   - FR: "ou appelez le"
   - EN: "or call"

   Niet aangepast, omdat de teksten woord voor woord moeten blijven. Op OK pas ik het in de bron aan.
2. **De online FR/EN-verbeteringen staan nog niet in `../vertaling`.** Draait iemand `vertaal.mjs import` in `site`, dan komen de oude fouten terug. De vertaalbestanden moeten dus eerst bijgewerkt worden.
3. **Publicatie.** `dist-live/` vervangt de volledige huidige site. Oude bestanden die geen pagina meer gebruikt, mogen weg op de server: `assets/lab4/*`, `assets/kw-fx.js`, `assets/kw-gedeeld.css`. Laat je ze staan, dan is dat ook geen probleem.
4. **Contactformulier.** Werkt via web3forms met de bestaande sleutel uit de pagina. Lokaal is alleen de validatie getest; er is niets verstuurd. Na publicatie één testaanvraag doen.
5. **Cloudflare.** Brotli en lange cache voor `/assets/fonts`, `/assets/img` en `/assets/site.*.js` worden aanbevolen. De bestandsnaam van het script bevat een hash.
