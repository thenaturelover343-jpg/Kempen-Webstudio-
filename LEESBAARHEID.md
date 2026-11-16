# Leesbaarheid: vóór en na (16-11-2026)

Aanleiding (Karim): "buiten de titels kan u zien dat bijna alle tekst klein is en niet goed zichtbaar".

**Gemeten**, niet geschat: `scripts/textaudit.mjs` leest op alle 156 pagina's (NL/FR/EN, op 1440 en 390 px) van elke zichtbare niet-titeltekst de berekende lettergrootte, de kleur, de echte achtergrond en de contrastverhouding.

## Norm

| Teksttype | Grootte | Contrast |
|---|---|---|
| Lopende tekst, intro's, FAQ-antwoorden | ≥17px desktop, ≥16px gsm, regelhoogte 1,6 | ≥4,5:1 |
| Kaarttekst, prijskaarten, lijstjes | ≥15–16px | ≥4,5:1 |
| Labels, captions, pills, knoppen | ≥13–14px (nu 15px) | ≥4,5:1 |
| Footer | ≥15px | ≥4,5:1 |
| Op donkere achtergrond | | tekst minstens even helder als rgba(255,255,255,.75) |

## Resultaat

| | Vóór | Na |
|---|---|---|
| Teksten onder de norm | **21.683** | **0** |

## Per teksttype: grootte en kleur vóór en na

| Teksttype | Vóór: grootte (aandeel) | Na: grootte | Vóór: kleur | Na: kleur |
|---|---|---|---|---|
| Lopende tekst | 16px (47%), **14px (14%)**; desktop gelijk aan gsm | 16px gsm, **17px desktop**, regelhoogte 1,6 | #4C433F op wit/lichtgrijs (in orde) | #4C433F / #121214 |
| Kaarttekst | 16px (78%), **14px** in een deel van de kaarten | 16px gsm, 17px desktop; prijsdetails 15–16px | op donkere kaarten **#B4B4BA / #929090** | op donker **#C8C8CC** (≈78% wit) |
| Labels, captions, broodkruimels | **14px (88%)**, en een paar 10,5–12px | **15px** | grijs **#929090** op zwart | #C8C8CC op donker, #4C433F op licht |
| Pills en knoppen | **14px (60%)**, enkele 12,9px | **15–16px** | grijs op zwart (#929090) | wit of #C8C8CC |
| Tussenkoppen in kaarten (o.a. FAQ-nummers) | **14px (28%)** | 15–17px | #4C433F | #4C433F |
| Footer | **14px (98%)** | **15px** (adres, links, openingsuren) | #4C433F op #F2F2F2 | #4C433F / #18181B |
| Koperkleurige accenttekst op zwart | #D47A3B (helderheid ≈54%) | **#F1A36A** (≈72%, contrast > 9:1) | | |
| Tabellen (prijsgids) | caption 0,85em (12,9–13,7px) | caption 15px, tabel 16px | | |

## Hoe het is doorgevoerd

Layout en ritme zijn ongewijzigd; alleen typografie en contrast zijn aangepast.

- **Componenten** (`src/design/*.tsx`):
  - 14px → 15px (labels, pills, footer, broodkruimels);
  - intro- en voetnootalinea's naar lopende-tekstgrootte;
  - de lijstteksten in de prijskaarten → 16px.
- **CSS** (`src/css/site.css`):
  - vanaf 1024px wordt lopende tekst van 16px 17px, behalve elementen met een eigen breakpointgrootte;
  - regelhoogte 1,6 voor alinea's en lijsten;
  - tabellen en captions groter.
- **Kleuren:**
  - #929090, #A1A1AA en #B4B4BA op donker → **#C8C8CC**;
  - #D47A3B als tekst op donker → **#F1A36A**;
  - text-white/80 → /90;
  - opacity-85 → 95.
- **Controle:** Lighthouse-toegankelijkheid blijft 100.

Opnieuw meten: `node scripts/textaudit.mjs 4101 resultaat.json` (de server moet op poort 4101 draaien).
