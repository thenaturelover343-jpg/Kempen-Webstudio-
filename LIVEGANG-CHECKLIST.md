# Livegang-checklist (bijgewerkt 18-11-2026)

Voor de livegang van de nieuwe site op https://www.kempenwebstudio.be, uit te voeren door Gusje of Marie. **De site gaat pas live na Karims eigen OK.**

## Eindcontrole 18-11 (lokaal, op dist-live)

Alles in orde:
- **Indexering:** index,follow op 154 pagina's. Noindex alleen op 404, bedankt, privacy/cookies en de voorbeeldsites.
- **Canonicals en sitemap:** alle canonicals naar https://www.kempenwebstudio.be. De sitemap telt 154 adressen en bevat alleen indexeerbare pagina's.
- **robots.txt:** Allow, met de AI-zoekrobots en de Sitemap-regel.
- **Redirects:** 50 FR- en 50 EN-oude paden plus /index.html, zonder ketens.
- **Schema en hreflang:** het schema is geldig (seo-audit 0 fouten), hreflang is wederkerig.
- **CSP:** lokaal in de browser getest op 10 pagina's (`node scripts/golive.mjs`): 0 schendingen, 0 console-errors.
- **Contactformulier:** de web3forms-sleutel is aanwezig, en na verzending volgt de bedanktpagina.
- **Cookies:** de cookiebanner verschijnt, en statistiek laadt pas na toestemming.
- **Lighthouse (home, stad, prijsgids, kennis, contact):** 99 tot 100 op alle onderdelen, CLS 0 tot 0,001.
- **Opmaak:** geen horizontaal scrollen en geen gaten op 390 en 1440 px, tekstaudit 0, home 51/51.

## 1. Bouwen (op de eigen pc, uit een verse clone)

```
git clone https://github.com/thenaturelover343-jpg/Kempen-Webstudio- kw
cd kw
git checkout nieuwe-website
npm ci
npm run build:live
```

De map om te publiceren is **`dist-live/`**. Gebruik niet `dist-test/`, want daar staat overal noindex.

## 2. IndexNow-sleutel (van Marie)

Zet het sleutelbestand in de wortel van `dist-live/`, naast `robots.txt`:
- de bestandsnaam is `<sleutel>.txt`;
- de inhoud is alleen de sleutel.

Zet de sleutel niet in git, niet in een chat en niet in een commitbericht.

## 3. Huidige live-versie bewaren (rollback-plan)

- In het Cloudflare-dashboard, project van www.kempenwebstudio.be (Workers & Pages), tab **Deployments**: noteer de huidige productie-deployment. Cloudflare bewaart oude deployments, en met **Rollback to this deployment** staat de vorige site binnen een minuut terug.
- Bewaar daarnaast een lokale kopie van de huidige live-site. De map `site-live/` in KempenTeam is die kopie; zet er een zip met de datum naast.
- Noteer de huidige DNS-records van www en de root, alleen ter controle. De livegang verandert de DNS niet, alleen de deployment.

## 4. Publiceren op Cloudflare

- **Via het dashboard:**
  1. Ga naar Workers & Pages, het project van www.kempenwebstudio.be, en kies **Create deployment** (Direct Upload).
  2. Upload de map `dist-live/` en kies de productie-branch.
- **Of met de command line:** `npx wrangler pages deploy dist-live --project-name <projectnaam> --branch <productiebranch>`. Wrangler vraagt dan zelf om in te loggen.
- `_headers` (met de CSP) en `_redirects` staan al in `dist-live/` en worden door Cloudflare Pages automatisch toegepast.

## 5. Direct na de livegang controleren

- [ ] **Home:** https://www.kempenwebstudio.be laadt de nieuwe home.
- [ ] **Bron van de home:** toont `<meta name="robots" content="index,follow">` en `<link rel="canonical" href="https://www.kempenwebstudio.be/">`.
- [ ] **robots.txt:** https://www.kempenwebstudio.be/robots.txt toont `Allow: /` en de Sitemap-regel. Ook /sitemap.xml en /llms.txt laden.
- [ ] **IndexNow-sleutel:** het bestand laadt op www.
- [ ] **CSP:**
  - Op home, een stadspagina, de prijsgids, een artikel, een voorbeeldsite en contact staan geen CSP-fouten in de console (F12).
  - Hover-effecten, tellers, sliders en het menu werken.
  - In de response-headers van een pagina staat `Content-Security-Policy`.
- [ ] **Redirects:**
  - `/index.html` geeft een 301 naar `/`.
  - `/fr/wat-kost-een-website/` geeft een 301 naar `/fr/prix-site-internet/`.
  - `/en/wat-kost-een-website/` geeft een 301 naar `/en/website-cost/`.
  - `/en/over-ons/` geeft een 301 naar `/en/about-us/`.
  - Een oude URL uit Google geeft geen 404.
- [ ] **Contactformulier:** één echte testaanvraag sturen, daarna komt de bedanktpagina en de mail aan bij info@kempenwebstudio.be.
- [ ] **Cookies:** de cookiebanner verschijnt. Pas na "Alles accepteren" laadt `static.cloudflareinsights.com` (tab Netwerk).
- [ ] **Zoekmachines:**
  - Sitemap indienen in Google Search Console en Bing Webmaster Tools.
  - IndexNow in Bing aanzetten als het aangeboden wordt.
- [ ] **Na twee weken:** in Search Console nagaan of de home en de belangrijkste pagina's op "URL staat op Google" staan.

## Bij problemen

Zet in Cloudflare de vorige deployment terug met **Rollback to this deployment** (stap 3). Meld daarna wat er misliep.
