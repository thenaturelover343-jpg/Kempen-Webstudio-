# On-site SEO-audit (16-11-2026)

**Vraag van Karim:** "Is alles op de site volledig SEO-gemaximaliseerd?"

**Kort antwoord:** on-site wel, met de bronnen die we nu hebben. De audit telt over 154 indexeerbare pagina's (NL, FR en EN) 0 fouten, tegenover 47 bij de start. Wat nog ontbreekt om de top 3 in te halen, kan niet via de site zelf. Dat is aan Karim (zie het laatste deel).

**Werkwijze:**
- Nieuw auditscript `scripts/seo-audit.mjs`, herhaalbaar met `node scripts/seo-audit.mjs dist-live --info`.
- Vergelijking met de concurrentie: `../seo-concurrentie-rapport-2026-11.md` en `../seo-data/volumes.csv`.
- Woordenaantallen bij de concurrenten zelf gemeten op 16-11-2026.

## 1. Wat gecontroleerd is (per pagina, alle 154 indexeerbare pagina's)

| Controle | Resultaat |
|---|---|
| Title ≤ 60 tekens, zoekwoord vooraan (NL/FR/EN) | in orde |
| Description 110–155 tekens | in orde |
| Precies één H1 met het zoekwoord | in orde |
| Kopstructuur zonder sprongen (H2 → H3) | in orde |
| Canonical = eigen URL | in orde |
| `html lang` per taal | in orde |
| hreflang: wederkerig, self-referentie, x-default; geen verwijzingen naar noindex-pagina's | in orde. Antwerpen, Brugge, Hasselt, Mechelen, Liège, Namur en Charleroi bestaan in één taal en hebben dus geen hreflang nodig |
| Sitemap | 154 URL's, allemaal indexeerbaar, met lastmod |
| Image-sitemap | 647 beelden, alle bestanden bestaan |
| robots.txt | sitemap-regel aanwezig, niets geblokkeerd |
| llms.txt | elke indexeerbare pagina staat erin |
| 404 | noindex, met capsules naar de belangrijkste pagina's |
| Schema (JSON-LD) | lokaal gecontroleerd: parse, verplichte velden, kruimelpad naar bestaande pagina's, @id-verwijzingen, ISO-datums, geen zelfverklaarde rating. Types: Organization + ProfessionalService, WebSite, WebPage, Service, Offer, FAQPage, BreadcrumbList, Article |
| Kruimelpad | zichtbaar én als schema op elke onderpagina |
| OG en Twitter | title, description, eigen deelbeeld met alt, og:url = canonical |
| Alt-teksten | op elk beeld; geen link met alleen een leeg beeld |
| Interne links | geen kapotte links, geen weespagina's, geen zwakke ankers ("lees meer", "klik hier"); elke pagina heeft inhoudelijke links naast menu en footer |
| Kannibalisatie | geen twee pagina's met dezelfde title-kern of H1 in dezelfde taal |
| Dubbele inhoud tussen stadspagina's | geen enkel paar boven 50% overlap (zie §2) |
| Dunne inhoud | geen kernpagina onder 600 woorden; overzichtspagina's en contact hebben een lagere drempel |
| E-E-A-T | over ons, contact, privacy en cookies; NAP en ondernemingsnummer BE 0897.577.919 in de footer van elke pagina; voorbeeldontwerpen zijn duidelijk als fictief gemarkeerd |
| Core Web Vitals (Lighthouse, lokaal) | mobiel en desktop 100/100/100/100, mobiel LCP 1,7–1,8 s, CLS 0, TBT ≤ 60 ms |
| Zoekwoorden uit volumes.csv | 41 van de 43 hebben een doelpagina met het zoekwoord in title, H1 of H2. Bewust niet: "création site internet gratuit" en "shopify webshop laten maken" (zie §3) |

### Woordenaantal tegenover de top 3 (hoofdtekst, zonder menu en footer)

| Onderwerp | Concurrenten (gemeten 16-11) | Kempen Webstudio, voor → na |
|---|---|---|
| Website laten maken | website-laten-maken.be 1.790 · conversal 2.271 · greenbananas 1.469 · webhero 2.283 | home 1.937 (ongewijzigd, gelijk met de top) |
| Webshop laten maken | conversal 1.531 · greenbananas 1.214 · webhero 459 | 1.215 → **1.503** |
| Prijs website | kreatix 2.459 · webhero 1.064 | 3.029 → **3.157** |
| Stadspagina's | conversal Gent 864, Antwerpen 783 · webhero Leuven 1.625 · jor-design Kempen 992 | Antwerpen 1.065 · Gent 895 · Kempen 669 → **989** · Turnhout 707 → **1.005** · Geel 609 → **903** · Herentals 629 → **901** · Mol 576 → **861** · Kasterlee 652 → **925** |

## 2. Wat verbeterd is

1. **Twitter-tags.** 38 pagina's misten `twitter:description`. De generator en de build vullen die nu altijd aan, net als `twitter:title`.
2. **Schema.**
   - FR en EN gebruikten een eigen organisatie-ID zonder adres en openingsuren. Er is nu één organisatie voor alle talen.
   - Elke kopie van die organisatie heeft adres en ondernemingsnummer.
   - De home heeft een `priceRange`.
   - Knopen binnen een `@graph` worden ook aangevuld.
3. **Zoekwoorden.**
   - Prijsgids: title "Prijs website laten maken: wat kost een website in 2026?" en H1 "… Prijzen in België (2026)". Dat dekt prijs, prijzen en wat kost (samen ±650 zoekopdrachten per maand).
   - Webshop: title "Webshop laten maken | Prijs vanaf €1.890, op maat", "professionele webshop" in de description en een H2 "Prijzen en kosten".
   - FR-home: "Agence web" in de title (agence création de site internet).
   - FR-prijsgids: "Prix création site internet".
   - SEO-pagina: blok "SEO-bureau voor Antwerpen, Gent en heel België".
4. **Inhoudsdiepte, zonder verzonnen claims.**
   - Zes Kempense stadspagina's: elk een prijsblok, een eigen blok "gevonden worden in …" en 2 vragen.
   - Webshop: blok "Een professionele webshop: waar u op let" en 2 vragen (per jaar, gemiddelde marktprijs).
   - Belgiëpagina: zes kaarten "Waar u op let bij het kiezen van een webdesigner".
   - EN-hub en EN-SEO-pagina aangevuld.
5. **People also ask.** In de prijsgids (NL/FR) staan nu ook "Kan ik gratis een website laten maken?" en "Wat is de goedkoopste manier?". Het antwoord is eerlijk: bij een bureau nooit gratis, met uitleg over de beperkingen van gratis websitebouwers. Elke stadspagina heeft een prijsvraag.
6. **Dubbele inhoud.**
   - Tussen de nieuwe stadspagina's was de overlap 50–60%. Ze is nu hoogstens 44%.
   - De gedeelde blokken (samenwerken, voorstel, prijs, oplevering) hebben drie varianten met de stadsnaam erin, en de vragen zijn per stad anders geformuleerd.
   - Wat nog overlapt, is vooral het prijsblok met de drie pakketten. Dat is bewust op elke pagina gelijk.
7. **Interne links.**
   - Elke dienst-, sector- en kennispagina linkt nu inhoudelijk naar webshop, logo en huisstijl, SEO en vernieuwen.
   - EN "about us" krijgt inhoudelijke links.
   - Op de salonpagina's (NL/FR/EN) linken de namen Ivelien en Kolvaard naar hun voorbeeldpagina.
   - Sectorpagina's tonen eerst de voorbeeldontwerpen van hun eigen sector.
8. **Controles.** De autoplaytest gebruikt nu een vast hoverpunt naast de knoppen; de test was onbetrouwbaar sinds de grotere showcase. Het nieuwe auditscript staat in de repo.

Het design is ongewijzigd: alle nieuwe blokken gebruiken bestaande componenten (prijskaarten, kaarten, prose). De tekstaudit telt 0 teksten onder de norm, er zijn 0 lege beeldvakken en 0 rastergaten, en de home-test haalt 51/51.

## 3. Wat on-site niet verder kan zonder Karim

| Wat | Waarom het telt | Nodig van Karim |
|---|---|---|
| **Google-reviews en een Bedrijfsprofiel** | De top 3 heeft 64 tot 317 reviews. Dat is de grootste achterstand. | Bedrijfsprofiel aanmaken of claimen en klanten om een review vragen. Pas met echte reviews op de site mag `aggregateRating` erbij. |
| **Echte cases** | De concurrenten hebben 10 tot 69 cases met cijfers. Wij hebben 3 echte klanten, maar zonder casepagina. | Per klant akkoord, uitdaging, oplossing, resultaat en een citaat. Dan bouwen wij casepagina's met caseschema. |
| **Algemene voorwaarden** | Vertrouwenssignaal, en verplicht voor een webshop. | De echte voorwaarden. Wij verzinnen geen juridische tekst. |
| **`sameAs`-profielen** | Koppelt de entiteit aan LinkedIn, het Bedrijfsprofiel, de KBO-fiche en dergelijke. | De URL's van die profielen. Nu staat er enkel Facebook. |
| **Oprichtingsjaar, team en gezicht** | E-E-A-T. De concurrenten tonen jaren ervaring en mensen. | Wat Karim wil tonen (een gezicht hoeft niet). |
| **Shopify** ("shopify webshop laten maken", 20/maand) | Kleine zoekterm. | Bouwt Kempen Webstudio op Shopify? Zo ja, dan maken wij een sectie. |
| **Garanties** (zoals DYsign) | Sterk verkoopargument. | Alleen als Karim ze echt wil geven. |
| **Backlinks** (30–50 Belgische domeinen) | Grootste hefboom na reviews. Dat is off-site werk. | Zie `SEO-ACTIES-KARIM/`. |
| **Search Console en indexering** | Pas mogelijk na publicatie. | Karims OK om live te gaan. |

**Overgebleven waarschuwingen (geen fouten):** vijf paren stadspagina's met 37–44% overlap. Dat komt vooral door het gedeelde prijsblok. Het is aanvaardbaar, en het daalt verder zodra er echte lokale cases bij komen.
