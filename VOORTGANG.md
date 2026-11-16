# Voortgang: nieuwe website Kempen Webstudio

Laatst bijgewerkt: 16-11-2026. Branch `nieuwe-website`.

Dit bestand wordt na elke grote stap bijgewerkt. Bij een onderbreking begin je hier; de details staan in `LEESMIJ.md`.

## Stand in één zin

De site is af en gecontroleerd. Ze wacht op Karims goedkeuring (teksten uit het design en de afwijkingen) en daarna op publicatie, die hij zelf geeft.

## Af

- [x] Repo opgeruimd: het Zenrixa-template (React/Vite/Gemini/Express) is weg. `npm install` werkt zonder `--legacy-peer-deps`.
- [x] Inhoud geïmporteerd in `content/` uit `../site` (commit da5fea3).
  - FR/EN: online verbeterde vertalingen gebruikt op 31 pagina's.
  - Ontbrekende bestanden van online opgehaald: og-v2.jpg, kw-192/512.png.
- [x] Design pixelgelijk:
  - de designcomponenten (`src/design/*.tsx`) worden bij de build naar statische HTML gerenderd, met CSS van Tailwind uit dezelfde klassen;
  - `site.js` neemt de interactie over (zonder React);
  - de homepage heeft alle 13 designsecties;
  - onderpagina's zijn alleen opgebouwd uit designcomponenten (`Blocks.tsx`).
- [x] Inhoud: alle oude teksten staan op elke nieuwe pagina (de build controleert dat). Nieuwe designteksten staan in `TEKSTEN-UIT-HET-DESIGN.md`.
- [x] Stijlgids: Switzer (titels) en Inter Tight (tekst), zelf gehost als subset. Neue Montreal wordt niet meegeleverd. Licenties staan in `src/fonts/LICENTIES.md`.
- [x] SEO: title, description, canonical, hreflang, OG en JSON-LD letterlijk overgenomen. Sitemap met 105 URL's, gelijk aan online; robots zoals maak-live.
- [x] Prestaties:
  - AVIF/WebP met srcset, kleine beeldvarianten voor kleine beelden, portret bijgesneden en vooraf geladen;
  - inline CSS en `_headers` voor caching.
- [x] Tekstcorrectie "of bel" (15 FR- en 15 EN-pagina's), via `config/tekstcorrecties.json`; wordt bij elke import opnieuw toegepast.
- [x] Controles (eerste volledige run 14-11, 13:45):

  | Controle | Resultaat |
  |---|---|
  | `check.mjs` (beide builds) | 0 fouten |
  | URL's | 105/105 |
  | Horizontaal scrollen | nergens |
  | Lighthouse mobiel | 99–100 / 100 / 100 / 100 |
  | Lighthouse desktop | 100 / 100 / 100 / 100 |
  | CLS | 0 |

- [x] Screenshots per paginatype in `_screens/` (1440 en 390 px), plus de vergelijking design ↔ site.
- [x] Documentatie: `LEESMIJ.md`, regel in `../logboek.md`.
- [x] Laatste controleronde (14-11, 14:30):
  - alle screenshots nagekeken;
  - opgelost: dubbel kruimelpad ("KempenKempen"), een dubbele zin op het kennisoverzicht, twee donkere secties na elkaar, een donkere knop op een donkere achtergrond;
  - getest met het toetsenbord: skiplink, contactvenster (focus, validatie, Escape, focus terug) en menu's;
  - alle controles opnieuw: 0 fouten, 105/105 URL's, nergens horizontaal scrollen, Lighthouse mobiel 99–100/100/100/100 en desktop 100/100/100/100, CLS 0.

- [x] Correcties na Karims screenshotcontrole (14-11, 20:30):
  - sectorcirkels "Schilders"/"Tuinaannemers" waren lazy-load tijdens de screenshot (foto's laden wel): `screens.mjs` scrolt nu door de pagina; nieuw `scripts/imgcheck.mjs` controleert alle 107 pagina's op 1440/390 (alle afbeeldingen geladen);
  - zwevende knoppen pas zichtbaar na de hero (elke pagina), met veilige ruimte onderaan (iPhone); imgcheck bevestigt: op 390 nooit over de hero;
  - "Naar de inhoud" in de donkere strip is het derde item uit het originele design (`barScroll`), geen lekkende skiplink; de echte skiplink blijft verborgen tot focus;
  - dienstpagina's: de sectietitel staat nu links naast de introtekst (geen leeg vlak);
  - check 0 fouten, nergens horizontaal scrollen, Lighthouse mobiel en desktop 100/100/100/100, CLS 0.

- [x] **Geen gratis demo meer** (beslissing Karim, 14-11, 22:00):
  - alle verwijzingen weg uit NL/FR/EN: titels, H1, meta, OG, JSON-LD (FAQ), CTA's, zwevende knoppen, formulier, bedanktpagina, OG-beeld (nu `og-v4.jpg`, "Website laten maken, op maat van uw zaak");
  - CTA: "Vrijblijvend voorstel aanvragen" / "Demander une proposition sans engagement" / "Request a no-obligation proposal"; home-H1 "Website laten maken, op maat van uw zaak" (zoals het originele design);
  - regels in `config/demo-weg.json`, toegepast door `scripts/apply-demo-weg.mjs` (ook na elke import); oud -> nieuw per URL in `TEKST-WIJZIGINGEN-DEMO.md`;
  - SEO: hoofdzoekwoorden behouden; NL-titles <= 60 en NL-descriptions <= 155; geen enkele tekst langer geworden boven de grens.

- [x] **Motion (Motion for React): gepauzeerd op vraag van Karim** (14-11, 23:15: "laat dit met rust"):
  - `nieuwe-website` blijft zonder Motion (CSS-animaties, zoals commit b5de40f; daarna alleen hulpscripts, commit 9ab4a58);
  - de proef staat op branch `motion-proef` (commit ba7e89d) en wordt niet gemerged: islands met LazyMotion + domAnimation (apart geladen), m-componenten, alleen opacity/transform, niet geladen bij "minder beweging"; design pixelgelijk (< 0,1 % afwijkende pixels);
  - metingen van die proef: een eerste, koude Lighthouse-run gaf mobiel 73/90/75, maar dezelfde koude meting gaf ook zonder Motion 72 op home (meetruis). Met opwarmmeting, twee keer: home, dienst en FR mobiel 100, CLS 0, linkcheck 0 fouten. Extra JS: 58 kB gz (+31 kB gz features, later geladen);
  - de opdracht "Motion mooier laten aanvoelen" (micro-interacties, menu-overgangen, parallax, UI UX Pro Max) is niet uitgevoerd.
- [x] Afbeeldingencontrole alle pagina's (scripts/imgcheck.mjs, nu bestand tegen gecrashte tabbladen): alle afbeeldingen geladen, zwevende knoppen nooit over de hero.
- [x] UI UX Pro Max als user-skill geïnstalleerd (na review) in `C:\Users\GbThe\.claude\skills\ui-ux-pro-max`.

- [x] **Home foutloos en design doorgetrokken naar alle pagina's** (15-11-2026; details in `FOUTEN-HOME.md`):
  - home sectie per sectie vergeleken met het originele design (8cc9567) op 1440/390 (`scripts/compare-sections.mjs`) en alles aangeklikt (`scripts/test-home.mjs`, 57/57 in orde);
  - opgelost op de home: dienstkaarten compact, werkwijzekaarten met labels en slotregels uit het design, prijskaarten (dubbele kop, maandprijs), cirkels, hero-strip op gsm, FAQ-ondertitel;
  - onderpagina's: werkwijzeraster volgt het aantal stappen, korte tekst en elke tweede lange tekstsectie in het lichtgrijze paneel, juridische artikels als kaarten, 404/bedankt met de capsules van de home, 4 voorbeeldontwerpen naast elkaar, "??" in de stads-CTA hersteld, introzinnen met hoofdletter;
  - controles: tekstcontrole (alle oude teksten aanwezig), linkcheck/SEO 0 fouten, 105/105 URL's, geen "demo", Lighthouse mobiel home 99 / dienst 100 / FR 99, CLS 0.

- [x] **Ronde 2 na Karims controle van de final-screenshots** (15-11-2026, details in `FOUTEN-HOME.md` #18–23):
  - home: dienstkaarten in één evenwichtige rij van vier (geen leeg vlak, geen losse kaart); kaartlabel "Kasterlee & Kempen" niet meer achter de logocirkel;
  - elke onderpagina-hero heeft nu de opbouw van de home-hero: portret, zwevende kaart met paginaspecifieke boodschap, sectorlijst, WEBSTUDIO K-wordmark, donkere strip, schermvullend;
  - lange tekstsecties: groot sectienummer links, lead-zin met koperen accent rechts, overige alinea's als genummerde kaarten; wit, paneel en donker wisselen af;
  - geen gaten meer in rasters: nieuwe controle `scripts/gapcheck.mjs` (alle pagina's, 820/1100/1440 px: 0 gaten, 0 lege kolommen);
  - UI UX Pro Max gebruikt als controle (typeschaal, geen vaste hoogtes rond tekst, regellengte max. ~68 tekens);
  - controles: tekstcontrole OK, linkcheck/SEO 0 fouten, 105/105 URL's, geen zichtbare "demo" (alleen bestaande ankernamen), test-home 57/57, beelden en zwevende knoppen OK op alle pagina's (1440 en 390), Lighthouse mobiel home 98 / dienst 100 / stad 100 / kennis 100 / FR 100, desktop 100, CLS 0;
  - `http://localhost:5050` (Python-server op `dist-live`) toont de nieuwe build.

- [x] **Ronde 3: foto's overal** (15-11-2026, details in `FOTOS-TODO.md`, `FOTO-BRONNEN.md`, `FOUTEN-HOME.md` #24–26):
  - alle lege beeldvakken gevuld (vóór 338 meldingen, nu 0 op 107 pagina's, 1440 en 390): zwevende hero-kaart op home en 104 onderpagina's (beeld per pagina), echte screenshots van de 9 voorbeeldsites in de showcase (geen initialen meer), beeld in de kaartcirkel, fragmenten van de 3 klantsites bij de cases, beeldvak in de webshop-prijskaart;
  - alleen bestaande beelden gebruikt (oude site, voorbeeldsites, eigen screenshots); geen downloads van Unsplash/Pexels nodig; licentiebron van de oude foto's staat nergens genoteerd (zie FOTO-BRONNEN);
  - beelden via `src/site/fotos.mjs` + build: AVIF en WebP, srcset, width/height, lazy, alt-tekst NL/FR/EN;
  - nieuwe controle `scripts/slotcheck.mjs`;
  - eindcontrole: linkcheck/SEO 0 fouten (105/105 URL's), beeldcontrole 0 problemen (1440 en 390), slotcheck 0, test-home 57/57, geen zichtbare "demo", Lighthouse mobiel home 100 / dienst 100 / sector 99 / stad 100 / kennis 100 / FR 99 / EN 100, desktop 100, CLS 0;
  - open punten in VOORTGANG/FOUTEN-HOME: technisch niets meer; wat overblijft zijn Karims beslissingen (zie Nog te doen).

- [x] **SEO-ronde** (15/16-11-2026, op basis van `../seo-concurrentie-rapport-2026-11.md` en `../seo-data/` queries.csv + volumes.csv):
  - **Nieuwe stadspagina's** met eigen lokale inhoud (economie, wijken/gemeenten, sectoren, bereikbaarheid, eigen FAQ): NL Antwerpen, Brussel, Mechelen, Hasselt, Brugge; FR Bruxelles, Liège, Namur, Charleroi; EN Brussels. Regio-hub per taal (`/website-laten-maken-belgie/`, `/fr/creation-site-internet/`, `/en/website-design-belgium/`). In footer, hub, sitemap en hreflang (Brussel NL/FR/EN onderling).
  - **FR-slugs:** 37 FR-pagina's op Franse URL's (`src/site/slugs.mjs`), alle links/canonicals/hreflang/sitemap bijgewerkt, 301's in `dist-live/_redirects` (host = Cloudflare) + HTML-vangnet op elk oud pad. FR-titels en H1's op "création site internet".
  - **Nieuwe pagina's (NL/FR/EN):** Over ons (zonder naam of gezicht), Contact (NAP, formulier, statische OSM-kaart van Kasterlee, antwoordtermijn), SEO laten doen (zoekvolume "seo bureau"), detailpagina per voorbeeldontwerp (9 x 3, duidelijk fictief, CreativeWork-schema); voorbeeldontwerpen-overzicht linkt naar de details. Geen cases (Karim: "nog geen cases").
  - **Prijsgids 2026** (NL/FR/EN): tabel prijzen per type site, marktprijzen (eigen onderzoek nov. 2026), vergelijking zelf bouwen/freelancer/bureau, onderhoudskosten, verborgen kosten, extra FAQ (FAQPage).
  - **Technische SEO:** titles ≤60 en descriptions ≤155 op elke pagina, hoofdzoekwoord vooraan (GSC-pagina's op positie 40-90 versterkt: schilder, kapper/kapsalon/schoonheidssalon, Leuven/webbureau, Kempen/webdesign, Mol, webshop, vernieuwen, vereniging; "webdesign" in home en steden); één H1; Organization+ProfessionalService met areaServed België + 16 steden, contactPoint en talen; Service per dienst; FAQPage; BreadcrumbList; Article met datum (zonder zichtbare datum); WebSite; eigen OG-beeld per pagina (164); image-sitemap; hreflang per pagina in de sitemap; `llms.txt`; interne links van alle dienst-, sector- en kennispagina's naar home, prijsgids, hub en steden; menu/footer met Contact, Over ons, SEO en steden.
  - **SEO-ACTIES-KARIM/**: Bedrijfsprofiel-teksten, reviewverzoek (mail/WhatsApp NL/FR), citaties met URL, Search Console/Bing-stappenplan, backlinklijst.
  - Werkwijze: `npm run paginas` (generator `scripts/paginas.mjs` uit `src/site/paginas/*.mjs`, `scripts/shell.mjs` voor menu/footer, `scripts/og-paginas.mjs` voor deelbeelden) en daarna `npm run build`.
  - Eindcontrole: linkcheck/SEO 0 fouten (test en live, 154 URL's in de sitemap), seocheck 0, redirects in orde (37 oude paden, geen ketens, geen interne links naar oude paden), beeldcontrole 0 problemen (156 pagina's, 1440 en 390), lege beeldvakken 0, rastergaten 0, test-home 57/57, geen zichtbare "demo", Lighthouse mobiel 99-100 (home 99, alle andere 100; ook Antwerpen, prijsgids, contact, voorbeelddetail, Liège, over ons), desktop 100, CLS 0. `http://localhost:5050` toont de nieuwe build.

- [x] **16-11-2026:** prijsgids-screenshot gecorrigeerd (de twee vlakken bevatten echte beelden; het screenshot-script wachtte niet op lazy beelden), beeldcontrole uitgebreid met pixelcontrole op grote effen vlakken en lege kaders (`scripts/slotcheck.mjs`), openingsuren doorgevoerd.

- [x] **Feedback Karim 16-11-2026** (terugzetpunt: git-tag `voor-feedback-karim-16-11`):
  1. Voorbeeldontwerpen, voor/na, sectoren en de hero-kaarten (home en onderpagina's) spelen vanzelf af (5-6,5 s, zachte overgang, voortgangsbalk), pauze bij hover/focus en buiten beeld, klikken blijft; stil bij "minder beweging" (`site.js`, `[data-sel-auto]`; test `scripts/autoplaytest.mjs`).
  2. Sectoren: "Alle sectoren" in de cirkel, nieuwe titel en label (NL/FR/EN), twee lopende rijen met 34 sectoren (gelinkt waar een sectorpagina bestaat); horeca- en kapsalonfoto vervangen door het zonnige terras en de kapper met schaar.
  3. Leesbaarheid: 183 tekstgroottes opgetrokken (`scripts/leesbaar.mjs`): lopende tekst minstens 16px, tussenkoppen 17px, labels/knoppen 14px; Lighthouse-toegankelijkheid 100.
  4. Voor/na wisselt vanzelf (5 s), pauze bij hover.
  5. Werkgebied: geanimeerde kaart van België (inline SVG, echte contour en provincies uit Eurostat GISCO NUTS 2021, `scripts/belgie-kaart.mjs`), 16 steden die na elkaar oplichten met pulserende ringen en lijnen vanuit Kasterlee, link naar de stadspagina per taal, stedenlijst ernaast.
  6. Alle formuleringen "pas betalen als u tevreden bent"/"gratis demo" weg in NL/FR/EN, ook in meta en JSON-LD en verborgen ankers (`scripts/geen-gratis.mjs`); werkwijze: "Eerst een vrijblijvend voorstel. Daarna beslist u."; werkwijzekaarten in koper, donker, warm grijs en lichtgrijs.
  7. De 6 cirkels onder "Realisaties & Voorbeelden" vervangen door een showcase met screenshots in browserframes, naam, sector en link naar de detailpagina (kwamen alleen op de home voor).
  8. Dubbele scrollbalk: oorzaak `overflow-x: hidden` op de paginawrapper (maakt er een scrollcontainer van); nu `overflow-x: clip`. Getest in headed Chrome op alle 156 pagina's (`scripts/scrollcheck.mjs`): alleen het document scrollt.
  - Controles: linkcheck/SEO 0 fouten, seocheck 0, redirects in orde, lege beeldvakken 0 (1440 en 390), rastergaten 0, test-home 51/51, autoplaytest in orde, geen "demo"/"gratis"/"tevreden" over ons aanbod, Lighthouse mobiel 99-100, CLS 0.

## Bezig

- Niets. Ik wacht op Karim (zie Nog te doen).

## Nog te doen

- [ ] **Motion:** gepauzeerd op vraag van Karim; pas hervatten als hij dat vraagt (branch `motion-proef`).

- [ ] **Karim:** de nieuwe teksten zonder demo nalezen in `TEKST-WIJZIGINGEN-DEMO.md` (en zeggen of "U betaalt pas als u tevreden bent" blijft kloppen).
- [ ] **Karim:** de teksten in `TEKSTEN-UIT-HET-DESIGN.md` goedkeuren of aanpassen (nu ook de werkwijzelabels en -slotregels en de FAQ-ondertitel).
- [ ] **Karim:** de bewuste afwijkingen goedkeuren (LEESMIJ):
  - sterren weg (geen reviews);
  - echte sectorfoto's in plaats van AI-portretten;
  - echte beelden in alle vroegere embleemvakken, ook fragmenten van de 3 klantsites bij de cases (zie `FOTO-BRONNEN.md`);
  - kopertekst iets donkerder voor contrast;
  - navigatie en footer aangevuld.
- [ ] **Karim:** het voorstel voor `site/_build/vertaal.mjs` beoordelen ("€… per maand" niet meer beschermen). Alleen nodig als de oude vertaalwerkwijze blijft bestaan.
- [ ] **Karim:** de acties in `SEO-ACTIES-KARIM/` (Bedrijfsprofiel, reviews, gidsen, Search Console/Bing na publicatie, backlinks) en de profiel-URL's voor sameAs. Antwoorden van 16-11 verwerkt: openingsuren ma-za 09:00-20:00 (Contact, Over ons, footer, schema, llms.txt), geen eigen foto's, "Websites die wij bouwden" blijft.
- [ ] **Karim:** de nieuwe pagina's, titels en FR-adressen nalezen.
- [ ] **Na Karims OK:** de volledige inhoud van `dist-live/` publiceren (`npm run build` en `npm run check` vooraf). Daarna één testaanvraag via het formulier doen en de oude bestanden op de server opruimen (`assets/lab4/*`, `assets/kw-fx.js`, `assets/kw-gedeeld.css`).

## Belangrijke keuzes (met reden)

1. **Design via SSR van de echte componenten**, niet nagebouwd. Alleen zo blijft het pixelgelijk (eis van Karim). React draait alleen tijdens de build.
2. **`content/` in de repo is de bron** (snapshot van `site`, met FR/EN van online), zodat de build zelfstandig werkt. `site`, `site-live` en `vertaling` worden nooit aangepast.
3. **Teksten:** sinds 14-11 "vrijblijvend voorstel" (gratis demo geschrapt door Karim). Lege designvakken zijn gevuld met bestaande sitetekst; wat echt nieuw is, staat ter goedkeuring.
4. **NL-descriptions** van Gent, Kortrijk en Leuven: de versie uit `site` gehouden (nieuwer, met prijs).
5. **Formulier:** web3forms met de bestaande sleutel, met mailto als terugval. Na verzenden volgt een doorverwijzing naar `/bedankt/` (zoals nu).
6. **Geen URL-wijzigingen**, dus geen redirects nodig. De 9 voorbeeldsites worden ongewijzigd overgenomen.

## Werkwijze bij hervatten

```
cd kw-webstudio-k
npm install
npm run build && npm run check
node scripts/overflow.mjs && npm run lighthouse && npm run screens
```

- Het originele design als referentie: `git worktree add .cache/design-app 8cc9567`, daarin `npm i --legacy-peer-deps && npx vite --port 3001`. Daarna `node scripts/compare-design.mjs http://localhost:3001 http://localhost:4100`.
- Commits: identiteit "Kempen Webstudio", met de Co-Authored-By-regel. Werk dit bestand bij en commit het mee na elke grote stap.
