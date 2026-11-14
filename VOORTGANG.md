# Voortgang: nieuwe website Kempen Webstudio

Laatst bijgewerkt: 14-11-2026, 22:00. Branch `nieuwe-website`.

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

- [x] **Motion (Motion for React) geprobeerd, niet overgenomen** (14-11, 22:00):
  - gebouwd als islands: LazyMotion + domAnimation (apart geladen chunk), m-componenten die de statische HTML hydrateren, alleen opacity/transform, niet geladen bij "minder beweging";
  - design pixelgelijk (screenshotvergelijking voor/na met scripts/diff-screens.mjs: < 0,1 % afwijkende pixels, alleen klok en zwevende knop), alle interacties werkten;
  - maar Lighthouse mobiel: home 73, dienstpagina 90, FR 75 (TBT tot 1,4 s door de React-runtime van 58 kB gz en de hydratatie) -> volgens Karims regel teruggedraaid;
  - de poging staat op branch `motion-proef` (commit ba7e89d); `nieuwe-website` gebruikt weer CSS-animaties;
  - voorstel: het `motion`-pakket zonder React (`animate`/`inView`, enkele kB) haalt wel 95+; wacht op Karims keuze.
- [x] Afbeeldingencontrole alle pagina's (scripts/imgcheck.mjs, nu bestand tegen gecrashte tabbladen): alle afbeeldingen geladen, zwevende knoppen nooit over de hero.
- [x] UI UX Pro Max als user-skill geïnstalleerd (na review) in `C:\Users\GbThe\.claude\skills\ui-ux-pro-max`.

## Bezig

- Niets. Ik wacht op Karim (zie Nog te doen).

## Nog te doen

- [ ] **Karim:** kiezen hoe Motion gebruikt wordt: zonder React (`motion` vanilla, haalt 95+) of de React-versie aanvaarden met een lagere mobiele score (73-90).

- [ ] **Karim:** de nieuwe teksten zonder demo nalezen in `TEKST-WIJZIGINGEN-DEMO.md` (en zeggen of "U betaalt pas als u tevreden bent" blijft kloppen).
- [ ] **Karim:** de teksten in `TEKSTEN-UIT-HET-DESIGN.md` goedkeuren of aanpassen.
- [ ] **Karim:** de bewuste afwijkingen goedkeuren (LEESMIJ):
  - sterren weg (geen reviews);
  - echte sectorfoto's in plaats van AI-portretten;
  - kopertekst iets donkerder voor contrast;
  - navigatie en footer aangevuld.
- [ ] **Karim:** het voorstel voor `site/_build/vertaal.mjs` beoordelen ("€… per maand" niet meer beschermen). Alleen nodig als de oude vertaalwerkwijze blijft bestaan.
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
