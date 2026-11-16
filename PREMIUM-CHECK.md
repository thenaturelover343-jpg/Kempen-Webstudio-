# Premiumcontrole per paginagroep (16-11-2026)

Aanleiding (Karim): "Bekijk al de pagina's op zulke fouten, allemaal design moet overal mooi top en premium zijn zoals home".

**Werkwijze:**
- Elke paginagroep op 1440 bekeken naast de home.
- De criteria van UI UX Pro Max als toets:
  - visuele hiërarchie;
  - geen kale secties zonder beeld;
  - consistente componenten;
  - leesbare tekst en contrast (zie LEESBAARHEID.md);
  - beweging met doel, met reduced-motion;
  - geen inhoud die stilstaat waar de home beweegt.
- Daarnaast automatische controles over alle 156 pagina's: lege beeldvakken, rastergaten, tweede scrollbalk, tekstgrootte en contrast, autoplay.

## Gevonden en opgelost

| # | Paginagroep | Probleem | Oplossing |
|---|---|---|---|
| 1 | Home | Voorbeeldontwerpen, sectoren, voor/na en hero-kaart stonden stil tot je klikte | Autoplay met voortgangsbalk, pauze bij hover/focus/buiten beeld, stil bij reduced-motion |
| 2 | Home | "8+ sectoren"; horeca- en kapsalonfoto zwak | "Alle sectoren", lopende rijen met 34 sectoren, sterkere foto's |
| 3 | Home | "Werkt in heel België" kaal | Geanimeerde kaart met echte contour en provincies, 16 steden, links |
| 4 | Home | Zes ronde cirkels als "realisaties" | Showcase met screenshots in browserframes, naam, sector, link |
| 5 | Home | Werkwijze: één zwarte kaart, de rest wit | Kaarten in koper, donker, warm grijs, lichtgrijs |
| 6 | Alle pagina's | Tekst te klein en te grijs | Zie LEESBAARHEID.md: 21.683 → 0 teksten onder de norm |
| 7 | Alle pagina's | Twee scrollbalken | `overflow-x: clip` in plaats van `hidden` op de paginawrapper; getest in headed Chrome |
| 8 | Onderpagina's (diensten, sectoren, steden, kennis, juridisch) | Hero-kaart stond stil | Autoplay zoals op de home |
| 9 | Steden NL/FR/EN, sectoren, diensten | "Voorbeelden van ons werk" was alleen tekst | Showcase met drie screenshots van passende voorbeeldontwerpen (per sector gekozen), met link naar de detailpagina |
| 10 | Diensten, sectoren, kennis | "Website laten maken in uw regio" was een tekstblok vol links | Grote capsules in de sitekleuren naar de grootste steden en alle regio's |
| 11 | Kennisoverzicht | Artikelkaarten grijs op wit, zonder beeld | Kaarten met foto-thumbnail, rand en ronde pijlknop zoals op de home |
| 12 | Kennisartikelen | Alleen tekst van boven tot onder | "Lees ook" met drie artikels als beeldkaarten, plus de regio-capsules |
| 13 | Bedankt, 404 | "Verder naar": kleine pills in een groot leeg vlak | Grote capsules (tot 6 links, 3 kolommen) zoals op de home |
| 14 | Kennis, diensten, steden, home | Slot-CTA's als "Zie eerst uw eigen website", "Zien hoe uw website eruit kan zien?", "Liever meteen iets zien?" (klinkt als het oude gratis-demoverhaal) | Herschreven naar "Een website voor uw zaak?" en "Liever meteen een voorstel?" (NL/FR/EN) |
| 15 | Prijsgids | Tabelcaptions op 0,85em (13px) | 15px, tabel 16px |
| 16 | Footer (alle pagina's) | 14px grijs | 15px; openingsuren erbij |

## Nagekeken en in orde

- **Contact:** formulier, OSM-kaart, openingsuren en FAQ.
- **Over ons:** waarden als kaarten, gegevens.
- **Voorbeelddetails:** screenshot desktop en gsm, kaarten.
- **Privacy en cookies:** genummerde kaarten.
- **Prijsgids:** tabellen, onderhoud en verborgen kosten als kaarten.
- **Stadspagina's NL/FR/EN:** foto in de hero-kaart, donkere kaarten, prijskaarten.
- **Geautomatiseerd** (156 pagina's, 1440 en 390):
  - 0 lege beeldvakken;
  - 0 rastergaten;
  - geen tweede scrollbalk;
  - 0 teksten onder de leesbaarheidsnorm.

## Bewust zo gelaten

- Kennisartikelen blijven tekstartikels (lead, genummerde kaarten, donkere secties). Er komen geen verzonnen grafieken of cijfers bij.
- Juridische pagina's (privacy, cookies) blijven sober: kaarten, geen beelden.
