# Voortgang: nieuwe website Kempen Webstudio

Laatst bijgewerkt: 14-11-2026, 14:30. Branch `nieuwe-website`.

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

## Bezig

- Niets. Ik wacht op Karim (zie Nog te doen).

## Nog te doen

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
3. **Teksten:** "gratis demo" (de aanpak van Kempen Webstudio) in plaats van "vrijblijvend voorstel" uit het design. Lege designvakken zijn gevuld met bestaande sitetekst; wat echt nieuw is, staat ter goedkeuring.
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
