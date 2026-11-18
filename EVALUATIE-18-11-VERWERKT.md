# Evaluatie 18-11-2026: verwerking

**Bron:** de evaluatie van de testsite door Karim (18/11, 68 regels, crawl van 185 pagina's).
**Terugzetten:** git-tag `voor-evaluatie-18-11`.

## Telling: elk punt heeft een status

Ik tel per pagina. Als het document één punt voor "NL, EN en FR" geeft, telt elke taal als één punt.

| Onderdeel in de evaluatie | Punten | Verwerkt | Niet verwerkt |
|---|---|---|---|
| Deels verwerkt (demo-resten) | 14 | 14 | 0 |
| Dubbele zin "altijd vrijblijvend" (6 sectoren × NL/EN/FR) | 18 | 18 | 0 |
| Dezelfde offertezin twee keer op één pagina | 22 | 22 | 0 |
| Fouten na vervanging | 6 | 6 | 0 |
| Vergelijkingsadvies FR coiffure | 1 | 1 | 0 |
| Openingsuren als zin | 3 | 3 | 0 |
| Tabelcellen "–" | 3 | 3 | 0 |
| **Totaal** | **67** | **67** | **0** |

Daarnaast heb ik **12 gelijkaardige restanten** verbeterd die niet in de evaluatie staan. Ze staan hieronder onder "Extra gevonden".

Hoe het nagekeken is:
- Per punt controleert een script op de live-build of de oude tekst weg is, in body, title, meta en JSON-LD, en of de nieuwe tekst er staat. Uitkomst: 67/67 in orde.
- Daarna heb ik `npm run restcheck` uitgebreid. De resultaten staan onderaan.

## Per punt

### Deels verwerkt (demo-resten): 14

| # | Pagina | Status |
|---|---|---|
| 1 | /website-laten-vernieuwen/ | Verwerkt: "als u de offerte hebt goedgekeurd". |
| 2 | /en/website-laten-vernieuwen/ | Verwerkt: "once you have approved the quote". |
| 3 | /website-schilder/ | Verwerkt: "U leest de offerte rustig na en beslist daarna." |
| 4 | /en/website-schilder/ | Verwerkt: "You read the quote and then decide." |
| 5 | /fr/site-internet-peintre/ | Verwerkt: "Vous lisez le devis et décidez ensuite." |
| 6 | /fr/site-internet-artisans/ | Verwerkt in de stappenkaart: "Vous lisez le devis et décidez ensuite." De FAQ kreeg een eigen tekst, zie punt 37. |
| 7 | /fr/site-internet-association/ | Verwerkt: "Vous lisez le devis et décidez ensuite." |
| 8 | /fr/site-internet-commerce/ | Verwerkt in de stappenkaart. De FAQ: zie toelichting A. |
| 9 | /fr/site-internet-horeca/ | Verwerkt in de stappenkaart. De FAQ: zie toelichting A. |
| 10 | /fr/site-internet-jeunes-entreprises/ | Verwerkt in de stappenkaart. De FAQ: zie toelichting A. |
| 11 | /fr/site-internet-profession-liberale/ | Verwerkt in de stappenkaart. De FAQ: zie toelichting A. |
| 12 | /fr/site-internet-soins-bien-etre/ | Verwerkt in de stappenkaart. De FAQ: zie toelichting A. |
| 13 | /fr/creation-site-internet-herentals/ | Verwerkt: "À compter de votre approbation du devis". |
| 14 | /fr/creation-site-internet/ | Verwerkt: "Contactez-nous ou demandez directement un devis sans engagement." |

**Toelichting A.** "Vous la consultez" is overal weg. "La" verwees naar een vrouwelijk woord, terwijl "devis" mannelijk is. Op deze pagina's stond de demozin twee keer: in de stappenkaart en in de FAQ. Karims zin "Vous lisez le devis et décidez ensuite." staat nu één keer, in de stappenkaart. Anders zou er een nieuwe dubbele zin ontstaan.
- De FAQ "Comment fonctionne le devis…" luidt nu: "Après une prise de contact, vous recevez un devis sans engagement avec les pages de votre site et le prix. Ensuite, vous décidez si vous poursuivez."
- De zin "Le devis est toujours sans engagement." is daar ook weg.

### Dubbele zin "altijd vrijblijvend": 18

| # | Pagina's | Status |
|---|---|---|
| 15–20 | /website-horeca/, /website-starters/, /website-vereniging/, /website-vrij-beroep/, /website-winkel/, /website-zorg/ | Verwerkt: "De offerte is altijd vrijblijvend." is weg. |
| 21–26 | dezelfde zes pagina's in het Engels (/en/…) | Verwerkt: "The quote is always without obligation." is weg. |
| 27–32 | /fr/site-internet-association/, -commerce/, -horeca/, -jeunes-entreprises/, -profession-liberale/, -soins-bien-etre/ | Verwerkt: "Le devis est toujours sans engagement." is weg. |

Waar die zin stond:
- In de band-intro na "Kempen Webstudio maakt websites voor …". Daar staat nu alleen de eerste zin.
- In de FAQ "Hoe werkt de vrijblijvende offerte voor …?". Die FAQ herhaalde ook de zin uit de stappenkaart. Ze zegt nu wat de offerte bevat: "Na een kennismaking krijgt u een vrijblijvende offerte met de pagina's van uw website en de prijs. U leest de offerte na en beslist daarna." (EN en FR idem.)
- In de FAQ voor verenigingen ("Kan het bestuur eerst een offerte krijgen?"). Daar is alleen "U kunt de offerte doorsturen naar de andere bestuursleden." overgebleven.

### Dezelfde offertezin twee keer op één pagina: 22

| # | Pagina | Status |
|---|---|---|
| 33 | /webshop-laten-maken/ | Verwerkt. De band-intro zegt nu wat de offerte bevat: "In de offerte staan de pagina's, de functies en de prijs van uw webshop." De FAQ "Kan AI mijn webshop maken?" luidt nu: "Kempen Webstudio bouwt uw webshop op basis van een vrijblijvende offerte. Na de lancering …". De slot-CTA blijft zoals ze was. |
| 34 | /en/webshop-laten-maken/ | Verwerkt, net als het NL ("The quote lists the pages, the features and the price of your online shop."). |
| 35 | /fr/creation-boutique-en-ligne/ | Verwerkt, net als het NL ("Le devis indique les pages, les fonctions et le prix de votre boutique en ligne."). |
| 36 | /website-laten-vernieuwen/ | Verwerkt: "Eerst krijgt u een vrijblijvende offerte voor uw nieuwe site." is geschrapt. |
| 37 | /en/website-laten-vernieuwen/ | Verwerkt: "You first receive a no-obligation quote for your new site." is geschrapt. |
| 38 | /fr/refonte-site-internet/ | Verwerkt: "Vous recevez d'abord un devis sans engagement pour votre nouveau site." is geschrapt. |
| 39 | /website-vakmensen/ | Verwerkt. De slot-CTA houdt de offertezin. FAQ 05 luidt nu: "In de offerte staan uw diensten, uw werkgebied en de prijs. U leest de offerte na en beslist daarna." |
| 40 | /en/website-vakmensen/ | Verwerkt, net als het NL. |
| 41 | /fr/site-internet-artisans/ | Verwerkt, net als het NL. FAQ: "Le devis reprend vos services, votre zone d'activité et le prix. Ensuite, vous décidez si vous poursuivez." |
| 42 | /website-tuinaannemer/ | Verwerkt. De stappenkaart houdt de offertezin. In de slot-CTA is de tweede offertezin geschrapt. |
| 43 | /en/website-tuinaannemer/ | Verwerkt, net als het NL. |
| 44 | /fr/site-internet-jardinier/ | Verwerkt, net als het NL. |
| 45 | /website-kapsalon/ | Verwerkt. De tweede zin blijft ("Op basis van dat gesprek …"). "Eerst krijgt u een vrijblijvende offerte voor uw eigen salon." is geschrapt. |
| 46 | /website-laten-maken-gent/ | Verwerkt: de levertijdzin staat alleen nog in de FAQ. |
| 47 | /website-laten-maken-kortrijk/ | Verwerkt: de levertijdzin staat alleen nog in de FAQ. |
| 48 | /en/website-laten-maken-gent/ | Verwerkt: de levertijdzin staat alleen nog in de FAQ. |
| 49 | /en/website-laten-maken-kortrijk/ | Verwerkt: de levertijdzin staat alleen nog in de FAQ. |
| 50 | /fr/creation-site-internet-gand/ | Verwerkt: de levertijdzin staat alleen nog in de FAQ. |
| 51 | /fr/creation-site-internet-courtrai/ | Verwerkt: de levertijdzin staat alleen nog in de FAQ. |
| 52 | /website-laten-maken-brugge/ | Verwerkt, de langere zin blijft. Zie toelichting B. |
| 53 | /website-laten-maken-mechelen/ | Verwerkt, de langere zin blijft. Zie toelichting B. |
| 54 | /website-laten-maken-mol/ | Verwerkt. "Na een korte kennismaking krijgt u een vrijblijvende offerte." blijft. "Na een kort gesprek krijgt u een schriftelijke offerte." is uit het prijsblok van Mol gehaald (src/site/paginas/seo-onsite.mjs). |

**Toelichting B.** De korte offertezin was de hero-slogan. Een lege slogan zou het design veranderen. Daarom heeft de hero nu dezelfde soort zin als Kortrijk: "Kempen Webstudio maakt websites voor zaken in Brugge en omgeving." en "Kempen Webstudio maakt websites voor zaken in Mechelen en omgeving."

### Fouten na vervanging: 6

| # | Pagina | Status |
|---|---|---|
| 55 | /website-vereniging/ | Verwerkt, op beide plaatsen: "…een vrijblijvende offerte, die u aan het bestuur kunt voorleggen." |
| 56 | /website-horeca/ | Verwerkt: "Een gast weet dan tot wanneer de keuken open is en tot wanneer de bar open is." |
| 57 | /fr/conseils/ | Verwerkt: "adapté à vos services". |
| 58 | /fr/politique-confidentialite/ | Verwerkt: "si vous le demandez". |
| 59 | /fr/site-internet-jeunes-entreprises/ | Verwerkt: "construit des sites web pour les nouveaux entrepreneurs". Ook in de lopende tekst elders staat nu "pour les nouveaux entrepreneurs": de FAQ-vraag, de H2, de alt-tekst, de link op Louvain en drie kennisartikelen. De title, de H1, de breadcrumb en de dienstnaam in JSON-LD blijven zoals ze waren, want dat zijn labels met het zoekwoord. |
| 60 | /fr/creation-site-internet-gand/ | Verwerkt: "Kempen Webstudio crée aussi des sites web en dehors de Gand, partout en Belgique." De link blijft staan, nu op "crée aussi des sites web". |

### Vergelijkingsadvies: 1

| # | Pagina | Status |
|---|---|---|
| 61 | /fr/site-internet-salon-de-coiffure/ | Verwerkt: "Avec un devis sans engagement, vous connaissez le prix avant de décider." |

### Openingsuren als zin: 3

| # | Pagina | Status |
|---|---|---|
| 62 | /over-ons/ | Verwerkt: "Open van maandag tot zaterdag, van 9 tot 20 uur. Op zondag gesloten." |
| 63 | /fr/a-propos/ | Verwerkt, met de footerzin: "Ouvert du lundi au samedi de 9 h à 20 h, fermé le dimanche." |
| 64 | /en/about-us/ | Verwerkt, met de footerzin: "Open Monday to Saturday from 9:00 to 20:00, closed on Sunday." |

### Tabelcellen "–": 3

| # | Pagina | Status |
|---|---|---|
| 65 | /wat-kost-een-website/ | Verwerkt: "geen" in de kolom maandprijs. Dat geldt voor de landingspagina en de extra pagina, en ook voor logo en huisstijl, waar hetzelfde streepje stond. |
| 66 | /fr/prix-site-internet/ | Verwerkt: "aucun", in dezelfde drie rijen. |
| 67 | /en/wat-kost-een-website/ | Verwerkt: "none", in dezelfde drie rijen. |

## Extra gevonden: 12 gelijkaardige restanten

Deze restanten staan niet in de evaluatie. Ik vond ze met de nieuwe controles en heb ze op dezelfde manier verbeterd.

1. **/fr/refonte-site-internet/:** "lorsque vous avez approuvé la proposition" is nu "lorsque vous avez approuvé le devis". Het is dezelfde demorest als punt 1 en 2.
2. **/toegankelijke-website/ (JSON-LD):** "Vraag een voorstel aan." is nu "Vraag een vrijblijvende offerte aan."
3. **/fr/site-internet-accessible/ (JSON-LD):** "Demandez une proposition." is nu "Demandez un devis sans engagement."
4. **Home NL:** in de intro van de galerij stond dezelfde offertezin als in de FAQ-CTA. Die zin is weg uit de galerij-intro; de knop "Vrijblijvende offerte aanvragen" blijft.
5. **Home EN:** idem.
6. **Home FR:** idem.
7. **Home FR, FAQ-CTA:** "Vous préférez voir quelque chose tout de suite ?" is een demorest. Er staat nu "Vous préférez recevoir un devis tout de suite ?", zoals het NL ("Liever meteen een offerte?").
8. **/fr/creation-site-internet-namur/:** dezelfde dubbele zin als Brugge en Mechelen. Ook hier blijft de langere zin. De hero zegt nu: "Kempen Webstudio crée des sites web pour des entreprises à Namur et dans les environs."
9. **/en/website-kapsalon/:** dezelfde dubbele zin als punt 45. De band-intro herhaalde de offertezin uit de stappen en is ingekort.
10. **/fr/site-internet-salon-de-coiffure/:** idem.
11. **Schilder NL, EN en FR (FAQ "Hoe werkt de vrijblijvende offerte…"):** deze FAQ herhaalde de zin uit de stappenkaart. Hij zegt nu wat de offerte bevat. Dat telt als één restant voor drie talen.
12. **Slot-CTA van de sectorpagina's:** de CTA herhaalde de zin "Na een kennismaking krijgt u een vrijblijvende offerte voor uw website." uit de stappenkaart. Het gaat om horeca, starters, vrij beroep, winkel en zorg, in NL, EN en FR. De CTA houdt nu alleen "Beschrijf in een paar zinnen …". De knop "Vraag een vrijblijvende offerte aan" blijft. Dat telt als één restant voor 15 pagina's.

## Bewust niet aangepast

- **Logo-voorstellen:** "2 voorstellen", "ontwerpvoorstellen", "het voorstel dat u kiest" en de FR- en EN-varianten. Daar betekent "voorstel" een logo-ontwerp en geen offerte.
- **"Een voorstel" op de demosite /tuin-voorbeeld/:** dat is de tekst van de fictieve tuinaannemer zelf.
- **Anker-ID's zoals `van-voorstel-tot-prijs-t`:** ze zijn onzichtbaar. Bestaande links naar die ankers moeten blijven werken.
- **De slot-CTA "Vraag een vrijblijvende offerte aan. Na een kennismaking krijgt u …":** dat is een gedeeld blok dat al goedgekeurd is. De rest van de pagina heeft nu geen eigen offertezin meer die hetzelfde zegt.

## restcheck uitgebreid

`npm run restcheck` (scripts/restcheck.mjs) controleert nu ook:
- **dezelfde offertezin twee keer op één pagina.** Het script meldt dat ook als de ene zin het begin van de andere is, of als alleen het onderwerp verschilt ("Wij maken" of "Kempen Webstudio maakt").
- **"Vous la consultez"** in de tekst, title, meta, alt en JSON-LD.
- **"voorstel", "proposal" en "proposition" in de betekenis van offerte.** Logovoorstellen en demosites tellen niet mee.
- **"altijd vrijblijvend", "always without obligation" en "toujours sans engagement"** in de zin direct na een vrijblijvende offerte. Het script kijkt daarvoor ook over twee alinea's heen.

Ik heb het nagekeken op een testpagina met de oude fouten. Alle zes soorten worden gemeld, en de logovoorstellen niet. Op de nieuwe build: 0 restanten op 226 pagina's, in test en live.
