# Livegang-checklist (Karim 18-11-2026)

Vlak vóór en na de livegang van de nieuwe site op https://www.kempenwebstudio.be. Wordt uitgevoerd door Marie of Gusje.

## Vlak vóór de livegang

- [ ] **IndexNow-sleutelbestand plaatsen.** Marie heeft de sleutel. Zet het sleutelbestand (`<sleutel>.txt`, met de sleutel als inhoud) in de wortel van `dist-live/`, naast `robots.txt`. Toon de sleutel nergens in een chat of commitbericht.
- [ ] **De live-build publiceren.** Dat is `dist-live/`, niet de testbuild `dist-test/` (die heeft noindex).

## Direct na de livegang

- [ ] **CSP testen op live.**
  - Open de home, een stadspagina, de prijsgids, een artikel, een voorbeeldsite en het contactformulier.
  - In de browserconsole mogen geen CSP-fouten staan.
  - Hover-effecten, animaties, de tellers en het formulier (web3forms) moeten werken.
  - De header staat in `dist-live/_headers`.
- [ ] **Redirects testen.**
  - `/index.html` geeft een 301 naar `/`.
  - De oude FR-paden geven een 301, bijvoorbeeld `/fr/wat-kost-een-website/` naar `/fr/prix-site-internet/`.
  - De oude EN-paden geven een 301, bijvoorbeeld `/en/wat-kost-een-website/` naar `/en/website-cost/` en `/en/kennis/` naar `/en/guides/`.
  - De volledige lijst staat in `dist-live/_redirects`.
- [ ] **robots.txt controleren.** `https://www.kempenwebstudio.be/robots.txt` toont `Allow: /` en de Sitemap-regel.
- [ ] **Sitemap indienen.**
  - In Google Search Console en in Bing Webmaster Tools: `https://www.kempenwebstudio.be/sitemap.xml`.
  - Zet IndexNow in Bing aan als het daar aangeboden wordt.
- [ ] **Indexering opvolgen.** Kijk binnen twee weken of de home en de belangrijkste pagina's op "URL staat op Google" staan.
