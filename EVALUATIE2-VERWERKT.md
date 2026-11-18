# Evaluatie 2 (18-11-2026): verwerking

**Bron:** evaluatie 2 van de testsite door Karim (57 regels). Daarbij hoort ook het restje "zijn gemeente" op /website-schilder/.
**Terugzetten:** git-tag `voor-evaluatie2-18-11`.

## Telling

Ik tel per pagina. Een punt in de evaluatie dat voor NL, EN en FR geldt, telt dus als drie punten.

| Onderdeel | Punten | Verwerkt | Niet verwerkt |
|---|---|---|---|
| Webshop: één offertezin per sectie (NL, EN, FR) | 3 | 3 | 0 |
| Kempen-regiopagina's: meta en werkplekzin (NL, EN, FR) | 3 | 3 | 0 |
| Kasterlee-pagina's: meta en werkplekzinnen (NL, EN, FR) | 3 | 3 | 0 |
| "KempenKempen"/"CampineCampine" en in EN overal "the Kempen" | 8 | 8 | 0 |
| "Kies uw stad" alfabetisch | 1 | 1 | 0 |
| Over ons, About us, À propos | 3 | 3 | 0 |
| Contact (NL, EN, FR) | 3 | 3 | 0 |
| Antwerpen, Mechelen | 2 | 2 | 0 |
| Brugge, Brussel, Hasselt | 3 | 3 | 0 |
| België-hub | 1 | 1 | 0 |
| EN België en Brussels | 2 | 2 | 0 |
| FR home | 1 | 1 | 0 |
| FR regio-hub | 1 | 1 | 0 |
| FR Bruxelles, Liège, Charleroi, Namur | 4 | 4 | 0 |
| Meta Kempense steden (NL Geel, Herentals, Turnhout; FR Geel, Herentals, Mol, Turnhout; EN Herentals) | 8 | 8 | 0 |
| Mol (meta) | 1 | 1 | 0 |
| Header "België · CET" (NL, FR, EN) | 3 | 3 | 0 |
| NAP in de footer (NL, EN, FR) | 3 | 3 | 0 |
| NAP zonder land op about en privacy (EN about, EN, NL, FR privacy) | 4 | 4 | 0 |
| Dubbele offertezin op sectorpagina's (6 sectoren × 3 talen) | 18 | 18 | 0 |
| Vereniging (NL, EN, FR) | 3 | 3 | 0 |
| Vernieuwen (NL, EN, FR) | 3 | 3 | 0 |
| Gent, Ghent, Gand en Liège | 4 | 4 | 0 |
| FR-zinnen over nouveaux entrepreneurs | 4 | 4 | 0 |
| Restje "zijn gemeente" (al in commit cb77a39) | 1 | 1 | 0 |
| **Totaal** | **90** | **90** | **0** |

**Nagekeken:** een script controleert op de live-build per pagina dat de oude tekst weg is en de nieuwe tekst er staat, in body, title, meta en JSON-LD. Uitkomst: 90 van 90 in orde.

## Per punt

**Webshop.** Elke sectie heeft nog één offertezin.
- Prijsblok: "Na een kort gesprek krijgt u een schriftelijke offerte." is geschrapt.
- Stap 3: "Gaat u verder, dan leggen wij het pakket en de prijs schriftelijk vast."
- Kaart "Eerst een vrijblijvende offerte": "In de offerte staan het aantal producten, de betaalmethodes en de instellingen voor verzending en btw."
- EN en FR zijn op dezelfde manier aangepast.

**Kasterlee en de Kempen als werkplek.** Alle zinnen die de studio in Kasterlee of de Kempen situeren, zijn vervangen zoals het document vraagt.
- Kempen- en Kasterlee-pagina's: "Kempen Webstudio maakt websites voor al die zaken." en "… voor zaken in alle drie de deelgemeenten." De zin "zit zelf in Kasterlee" is geschrapt.
- Over ons: title "Over Kempen Webstudio | Webstudio voor heel België". De slogan is de zin uit het document. De sectie "Waarom Kasterlee" is weg. De FAQ "Waar is Kempen Webstudio gevestigd?" werd "Voor welke regio werkt Kempen Webstudio?". Het adres staat in de NAP-lijst. EN en FR zijn op dezelfde manier aangepast.
- Contact: title "Contact | Kempen Webstudio" (EN "Contact us | …", FR "Nous contacter | …", zodat de drie titles verschillen). Teksten:
  - "Wij werken voor zaken in heel België."
  - "Kennismaking en overleg verlopen online, per e-mail of telefoon, voor zaken in Antwerpen, Gent of Brussel."
  - de H3 "Moet ik langskomen voor een gesprek?"
  - De kaart en het adres blijven.
- Stadspagina's: "Kempen Webstudio maakt websites voor zaken in heel België."
  - "Het contact blijft persoonlijk." en "Wij spreken af wanneer het u past".
  - De FAQ wordt "Moet ik langskomen voor een gesprek?" (EN "Do I need to come in for a meeting?", FR "Dois-je me déplacer pour un rendez-vous ?").
- België, EN Belgium en EN Brussels, FR home, FR regio-hub, FR Bruxelles, Liège, Charleroi en Namur: verwerkt zoals in het document.
- Meta's van Geel, Herentals, Turnhout en Mol: "webdesign op maat voor uw zaak in Geel" (FR "un site sur mesure pour votre entreprise à Geel", EN "a custom design for your business in Herentals").
- "KempenKempen": de broodkruimel had een lange en een korte naam naast elkaar. De korte naam is overal weg. In EN staat nu overal "the Kempen", ook in de JSON-LD ("Kempen (Belgium)").
- "Kies uw stad": de steden staan alfabetisch, en Kasterlee heeft dezelfde stijl als de andere steden.
- Header: "België · CET" (FR "Belgique · CET", EN "Belgium · CET").

**NAP.**
- Footer: "Kemelbeekstraat 16, 2460 Kasterlee" staat apart, met daaronder "Werkt in heel België" (FR "Actif dans toute la Belgique", EN "Serving all of Belgium"). Het EN-zinnetje is dezelfde tekst als bij de kaart op de home; het document schreef geen EN-tekst voor.
- About, privacy en de EN-contactkaart: ", Belgium/België/Belgique" is weg.

**Dubbele offertezinnen.**
- Sectorpagina's: de tweede zin is nu "In de offerte staan de pagina's van uw website en de prijs." (EN "The quote lists …", FR "Le devis indique …").
- Vereniging: de zin in de slot-CTA blijft.
- Vernieuwen: de termijnzin staat alleen nog in de FAQ.
- Gent, Ghent en Gand: de zin met de stad blijft. De FAQ zegt nu wat de offerte bevat.
- Liège: "Vous recevez d'abord un devis sans engagement." is uit het FAQ-antwoord over de prijs gehaald (in `steden.mjs`).

**FR nouveaux entrepreneurs.**
- "lisez aussi ce qu'un site web pour nouveaux entrepreneurs doit contenir au début".
- Op de drie andere pagina's: "Vous démarrez tout juste ? La page site web pour nouveaux entrepreneurs explique ce que …".

## Bewust blijven staan (toegestaan volgens het document)

- **Regiopagina's** over de Kempen, Kasterlee en de Campine. Ze blijven bestaan als gewone regiopagina, met de zinnen over de streek en de klanten: het Albertkanaal, de Kempense Heuvelrug, "Een schilder uit Kasterlee rijdt naar Herentals".
- **Klantgerichte vermeldingen:** Herentals "historische hoofdstad van de Kempen", Turnhout "klanten uit … Kasterlee", /seo-laten-doen/ "… Hasselt en de Kempen", de linklijst op /website-laten-maken-belgie/ en de Limburgse Kempen.
- **De broodkruimel "Website laten maken in de Kempen"** op de Kempense stadspagina's, want die staan onder de Kempen-regiopagina.
- **De NAP met het adres**, en de kaart op de home met de pin op het adres. Bij de kaart is "vanuit Kasterlee" wel uit de beschrijving voor schermlezers gehaald.

## Extra gevonden en opgelost

1. **Gent en Ghent, band-intro:** een derde offertezin die met dezelfde woorden begon. Die werd "De offerte toont wat uw website bevat en wat ze kost …" (EN idem).
2. **/fr/prix-site-internet/:** de levertijdzin stond twee keer. De kortere is geschrapt.
3. **/en/wat-kost-een-website/:** de demorest "You review it and let us know whether it suits you." is nu "You read the quote and then decide."
4. **Title en description op lengte:** "À propos | Kempen Webstudio, studio web pour la Belgique" en een kortere description voor de Kasterlee-pagina.

## restcheck uitgebreid

`npm run restcheck` controleert nu ook:
- **Kasterlee of de Kempen als werkplek:** "vanuit Kasterlee", "webstudio uit …", "naar Kasterlee komen", "depuis/établi à Kasterlee", "studio web de Campine", "based in/from Kasterlee", "Campine anversoise", "Kasterlee, BE · CET", "Waarom Kasterlee" en dergelijke.
- **"KempenKempen" en "CampineCampine".**
- **NAP-varianten** ("2460 Kasterlee, werkt/works/actif/intervient/Belgium/België/Belgique").
- **FR-zinnen** "ce que un" en "vous lisez dans/sur notre page sur un site web".
- **"Campine" op EN-pagina's.**
- **"Kies uw stad"** moet alfabetisch staan.
- **Dubbele offertezinnen** die met dezelfde 7 woorden beginnen. De gedeelde slot-CTA telt niet mee, want dat is een goedgekeurd blok.

**Resultaat:** 0 restanten op 226 pagina's, in test en live.

## Snelle controleronde

- restcheck: 0 restanten.
- SEO: 0 fouten.
- links: 0 fouten.
- seo-audit, met de JSON-LD-validatie van het schema: 0 fouten.
- De test- en live-build zijn herbouwd.
