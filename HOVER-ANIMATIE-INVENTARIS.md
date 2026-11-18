# Hover en animatie: inventaris en aanvulling (18-11-2026)

**Vraag van Karim:** "Zijn er ook wel genoeg hover effects? Genoeg animatie? Ook home?"
**Terugzetten:** git-tag `voor-hover-18-11`.

De inventaris is per sectie gemaakt met een script op de live-build. Het script telt per sectie hoeveel knoppen, links, kaarten en foto's een hover- of focusstaat hebben, en welke animaties er draaien. De nieuwe effecten zijn daarna in een echte browser nagekeken met `scripts/hovertest.mjs` (12 controles, zie onderaan).

## Waarom CSS en geen Motion-componenten

De site wordt vooraf gerenderd tot statische HTML. In de browser draait er geen React, alleen `site.js` (ongeveer 16 kB, niet gecomprimeerd). Motion met LazyMotion en `m`-componenten werkt alleen als elke pagina in de browser opnieuw door React opgebouwd wordt. Dat kost al snel 60 kB JavaScript of meer, en dan haal je mobiel 95 in Lighthouse niet zeker meer.

Alles wat gevraagd werd, kan met CSS-transities en een paar regels in `site.js`, en dat is ook waar het design zelf op gebouwd is. Daarom is Motion hier niet gebruikt.

## Regels die overal gelden

- Er wordt alleen `transform` en `opacity` geanimeerd. De schaduw van een kaart zit op een pseudo-element en verschijnt via opacity. De FAQ springt in hoogte meteen open, zonder layout-animatie, en de inhoud schuift vloeiend binnen.
- Hover-effecten gelden alleen met een muis of trackpad (`@media (hover: hover) and (pointer: fine)`). Op touch blijft alles zoals het was.
- Bij "minder beweging" staat alles stil: er is geen lift, geen zoom, geen teller, geen parallax en de pijlen schuiven niet mee.
- Elk bedienbaar element krijgt een zichtbare koperen focusrand. De eigen focus-stijlen van de componenten gaan voor.

## Nieuwe bouwstenen

| Klasse of attribuut | Wat het doet | Waar |
|---|---|---|
| `kw-lift` | De kaart komt 4px omhoog en er verschijnt een zachte schaduw. | prijskaarten, cases, infokaarten, kaarten met een donkere en een lichte achtergrond |
| `kw-zoom` | De foto zoomt naar 105%, met een donkere verloop-overlay. | case-foto's, foto's in een browserkader |
| pijl-iconen | De pijl schuift 3px mee in de richting waarin hij wijst. | alle knoppen en links met een pijl, ook de slider-knoppen |
| `kw-ul` | Een onderlijn die van links openschuift. | menulinks, footerlinks |
| `data-count` | Het bedrag telt op van 0 tot de eindwaarde zodra het in beeld komt. De breedte ligt vast, dus niets verschuift, en schermlezers lezen de eindwaarde. | bedragen op de prijskaarten |
| `.kw-portrait img` | Zachte parallax bij het scrollen, tot 42px. | heroportret op de home en op alle subpagina's |
| `.kw-acc` | De FAQ-inhoud vloeit binnen met opacity en een kleine verschuiving. | alle FAQ's, het accordeon in het menupaneel |
| `.kw-dd a` | De items van het submenu schuiven na elkaar binnen. | submenu Diensten |

## Home, per sectie

| Sectie | Er was al | Oordeel vooraf | Toegevoegd |
|---|---|---|---|
| Header en menu | hover-achtergrond op menuknoppen, focusranden, submenu dat schuift en vervaagt | genoeg | onderlijn die openschuift op de menulinks; submenu-items die na elkaar binnenkomen; meeschuivende pijl |
| Hero | entree-animatie (omhoog en schaal), knoppen met `kw-pop`, cursor-aura en parallax met de muis (desktop), automatische fotoslider (6,5 s) | genoeg | zachte scroll-parallax op het portret; meeschuivende pijl in de knoppen |
| Intro "Website laten maken in België" | hover op links en knoppen, rasters die gestaffeld verschijnen | genoeg | geen |
| Negen voorbeeldontwerpen | twee automatische sliders (5,5 s en 6 s) met voortgangsbalk, hover op knoppen | genoeg | meeschuivende pijl op de vorige- en volgende-knoppen. De foto's in de slider zoomen bewust niet: ze schuiven al vanzelf door. |
| Websites per sector | lopende rijen die pauzeren bij hover, chips met hover | genoeg | geen |
| Van Google naar een eigen website | automatische slider (5 s), knoppen met hover | genoeg | meeschuivende pijl |
| Diensten | kaarten met hover (omhoog en achtergrond) | genoeg | meeschuivende pijl |
| Werkt in heel België | kaart met lijnen en pins die oplichten, steden met hover en focus | genoeg | geen |
| Wat kost een website? | alleen hover op de knoppen; de drie prijskaarten hadden niets | **mager** | lift met schaduw op de prijskaarten; bedragen die optellen (€490, €990, €1.890) |
| Werkwijze (stappen) | kaarten met hover, gestaffeld verschijnen | genoeg | meeschuivende pijl |
| Voorbeeldontwerpen in beeld | foto-zoom via `group-hover`, rand bij hover | genoeg | geen |
| Websites die wij bouwden (cases) | niets op de drie kaarten, foto's en links | **mager** | lift met schaduw op de kaart; zoom met overlay op de foto |
| FAQ | hover-rand, focusrand; openen via een hoogte-animatie | **mager** (het openen was een layout-animatie) | de inhoud vloeit binnen (opacity en verschuiving), de hoogte springt meteen open |
| Slot-CTA | knop met een opacity-hover | mager | meeschuivende pijl, focusrand |
| Footer | kleurwissel op de links | mager | onderlijn die openschuift op alle tekstlinks |

## Per paginatype

Een paar dingen gelden voor alle types:
- De header, de hero met de entree-animatie, de FAQ, de slot-CTA en de footer zijn dezelfde componenten als op de home, met dezelfde aanvullingen.
- Elke sectie verscheen al bij het scrollen (`kw-sec`, `kw-fade`), en rasters verschijnen gestaffeld (`kw-sg`). Dat was genoeg.

| Paginatype (getest op) | Er was al | Oordeel vooraf | Toegevoegd |
|---|---|---|---|
| Dienst (/webshop-laten-maken/) | stappenkaarten en aandachtspunten met hover, voorbeeldgalerij met foto-zoom | mager: de kaarten "Wat zit er in uw webshop?" en de prijskaarten hadden niets | lift op de infokaarten en de prijskaarten, teller op de bedragen, scroll-parallax in de hero, meeschuivende pijlen, dikkere onderlijn op tekstlinks bij hover |
| Stad (/website-laten-maken-antwerpen/) | sectorkaarten met hover, galerij met zoom | mager: de kaarten "Webdesign in …" en de wijken hadden niets | lift op alle kaarten, teller op de prijskaarten, scroll-parallax in de hero |
| Sector (/website-winkel/) | stappen met hover | mager: de 5 kaarten "Wat uw website bevat" en de foto's hadden niets | lift op de kaarten, zoom op de foto in het browserkader, scroll-parallax in de hero |
| Kennis (/kennis/hoe-lang-duurt-website-laten-maken/) | stappenkaarten met hover, "Lees ook" met foto-zoom | genoeg | scroll-parallax in de hero, dikkere onderlijn op tekstlinks, meeschuivende pijlen |
| Prijsgids (/wat-kost-een-website/) | kaarten voor losse diensten en kosten met hover | mager: pakketkaarten en onderhoudskaarten hadden niets | lift op alle kaarten, bedragen die optellen, scroll-parallax in de hero |
| Over ons | gegevenskaarten met hover | mager: de kaarten "Wie wij zijn" en "Waar wij voor staan" hadden niets | lift op de kaarten, scroll-parallax in de hero |
| Contact | formulierknop met hover | mager: de 5 contactkaarten hadden niets | lift op de contactkaarten, scroll-parallax in de hero, focusranden |
| Voorbeelddetails (/voorbeeldontwerpen/bistro-tilvaar/) | FAQ en knoppen | mager: de kaarten "Ontwerp en functie" en "Op de gsm" hadden niets | lift op de kaarten, zoom op de schermbeelden in het browserkader, scroll-parallax in de hero |

## Controle

- **`scripts/hovertest.mjs`, in een echte browser, 12 controles: allemaal in orde.**
  - Kaart: lift en schaduw.
  - Foto: zoom.
  - Pijl: schuift mee.
  - Onderlijn in de footer en in het menu.
  - Teller: telt op met vaste breedte, en de eindwaarde klopt.
  - FAQ: vloeit open.
  - Submenu: items komen gestaffeld binnen.
  - Hero: parallax.
  - Minder beweging: geen lift en geen teller.
  - Touch: geen hover-regels.
- **Layout-verschuiving bij de teller en bij het openen van de FAQ:** 0.
- **Lighthouse, 13 pagina's mobiel en desktop:**
  - performance: mobiel 99 tot 100, desktop 100;
  - toegankelijkheid, best practices en SEO: 100;
  - CLS: 0 overal.
- **Home:** 51/51 controles in orde.
- **Andere controles:**
  - autoplay: in orde;
  - horizontaal scrollen: nergens;
  - gaten in de opmaak: geen;
  - tekstaudit: 0;
  - restcheck: 0;
  - SEO: 0;
  - links: 0.
