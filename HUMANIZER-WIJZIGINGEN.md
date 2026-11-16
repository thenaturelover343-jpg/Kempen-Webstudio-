# Humanizer-ronde (16-11-2026)

**Opdracht (Karim):** alle nieuwe en gewijzigde teksten door de humanizer-skill halen, in NL, FR en EN.
**Skill:** blader/humanizer v4.0.0 (26 patronen), nagelezen en geïnstalleerd in `C:\Users\GbThe\.claude\skills\humanizer`.

**Totaal:**
- 322 zinswijzigingen op 62 pagina's;
- 194 unieke zinnen, omdat gedeelde blokken op meerdere pagina's staan;
- teruggaan kan via de git-tag `voor-humanizer`.

## Wat aangepast is
- Patronen, vertaald naar Vlaams Nederlands en Belgisch Frans:
  - "niet alleen … maar ook" en "pas seulement … mais" (§1);
  - slotzinnen en losse fragmenten zoals "U zit nergens aan vast.", "Sans aucun engagement." en "Geen doorschakelen, geen ticketsysteem." (§2);
  - holle uitspraken zoals "Wie daar niet verschijnt, bestaat voor hen niet" (§3);
  - een aanloopvraag (§4);
  - drietallen zonder inhoud zoals "Duidelijk, snel en eerlijk." en "Clairs, rapides et honnêtes" (§6);
  - steeds dezelfde zinsbouw op elke stadspagina (§7): "Wij bouwen … een snelle, toegankelijke website", "in een paar seconden duidelijk", "Wij vermelden in gewone zinnen waar u werkt", "een goed vertrekpunt";
  - verkooptaal zoals "zonder verrassingen", "transparant", "showcase", "percutant" en "zonder gedoe" (§16);
  - beschrijvingen van de tekst zelf zoals "Hieronder ziet u in één oogopslag" (§25);
  - een vetgedrukt label (§19).
- Twee feitelijke correcties (§13):
  - "Persoonlijk voorstel binnen 1 werkdag" is nu "Antwoord doorgaans binnen 1 werkdag", want de site belooft een antwoord en geen voorstel binnen die tijd;
  - "Reply within 1 working day" is nu "Usually …".

## Wat bewust niet veranderd is
- Alle teksten die van de huidige live site komen. De build controleert per pagina dat ze letterlijk blijven staan.
- Feiten, prijzen, termijnen, zoekwoorden, links, titles en H1's. Geen enkele title of H1 klonk echt als AI.
- Er is niets toegevoegd of verzonnen. De v4-regel van de skill ("voeg een specifiek detail toe") is niet toegepast, omdat de projectregel "verzin geen feiten" voorgaat.
- Drie labels per voorbeeldontwerp en de capsules "Snel, Helder, Op maat" zijn vaste UI-elementen en geen lopende tekst.
- Typografische apostroffen in het Frans (’) zijn correct Frans en vallen niet onder §21.

## Voorbeelden per pagina (oud → nieuw)

## Stadspagina's

### /en/web-design-brussels/ (7 zinnen)

- **Oud:** A business in Brussels often needs a website in more than one language, with the same quality in each.
  **Nieuw:** A business in Brussels often needs a website in more than one language, and each version needs the same care.
- **Oud:** A calm, trustworthy site in English, with clear contact details, makes a strong first impression.
  **Nieuw:** For them, a calm site in English with clear contact details works well.
- **Oud:** The Brussels-Capital Region has 19 municipalities, each with its own character.
  **Nieuw:** The Brussels-Capital Region has 19 municipalities.

### /fr/creation-site-internet-bruxelles/ (17 zinnen)

- **Oud:** La Région de Bruxelles-Capitale compte 19 communes, chacune avec son caractère : des rues commerçantes du centre et de l’avenue Louise aux quartiers résidentiels d’Uccle et des Woluwe.
  **Nieuw:** La Région de Bruxelles-Capitale compte 19 communes, des rues commerçantes du centre et de l’avenue Louise aux quartiers résidentiels d’Uccle et des Woluwe.
- **Oud:** Pour une entreprise bruxelloise, Velours (un institut avec agenda de rendez-vous) et Bistro Tilvaar (horeca avec réservation en ligne) sont de bons points de départ.
  **Nieuw:** Pour une entreprise bruxelloise, Velours (un institut avec agenda de rendez-vous) et Bistro Tilvaar (horeca avec réservation en ligne) vous donnent une bonne idée.
- **Oud:** Vous n’avez donc pas besoin de vous déplacer, et vous gardez un seul interlocuteur qui connaît votre entreprise et votre site.
  **Nieuw:** Vous ne devez pas vous déplacer et vous parlez toujours à la même personne, qui connaît votre entreprise et votre site.

### /fr/creation-site-internet-charleroi/ (9 zinnen)

- **Oud:** Pour une entreprise carolorégienne, Dakwerken Hoogland (un couvreur avec formulaire de devis) et Vennebrand (une petite boutique en ligne) sont de bons points de départ.
  **Nieuw:** Pour une entreprise carolorégienne, Dakwerken Hoogland (un couvreur avec formulaire de devis) et Vennebrand (une petite boutique en ligne) sont des exemples parlants.
- **Oud:** Charleroi change vite, et de nombreuses entreprises y démarrent ou se renouvellent.
  **Nieuw:** Charleroi change vite, et beaucoup d’entreprises y démarrent ou se relancent.
- **Oud:** Un site clair, rapide et facile à trouver aide à convaincre de nouveaux clients.
  **Nieuw:** Pour attirer de nouveaux clients, elles ont besoin d’un site rapide qu’on trouve facilement.

### /fr/creation-site-internet-liege/ (9 zinnen)

- **Oud:** Autour du Carré, de la place Saint-Lambert, d’Outremeuse et du marché de la Batte, les passants cherchent sur leur smartphone des horaires, une carte ou une boutique proche.
  **Nieuw:** Autour du Carré, de la place Saint-Lambert, d’Outremeuse et du marché de la Batte, les passants cherchent sur leur smartphone des horaires, une carte ou une boutique proche, et ils veulent la réponse vite.
- **Oud:** Pour une entreprise liégeoise, Dakwerken Hoogland (un couvreur avec formulaire de devis) et Bistro Tilvaar (horeca avec réservation en ligne) sont de bons points de départ.
  **Nieuw:** Pour une entreprise liégeoise, Dakwerken Hoogland (un couvreur avec formulaire de devis) et Bistro Tilvaar (horeca avec réservation en ligne) sont des exemples utiles.
- **Oud:** La ville est aussi universitaire, avec l’Université de Liège, et vivante, avec ses commerces, son horeca et son marché de la Batte le dimanche.
  **Nieuw:** C’est aussi une ville universitaire, avec l’Université de Liège, pleine de commerces et d’horeca, et le dimanche il y a le marché de la Batte.

### /fr/creation-site-internet-namur/ (10 zinnen)

- **Oud:** Pour une entreprise namuroise, Kapsalon Ivelien (un salon avec bouton rendez-vous) et Tuinzorg Varelinde (un jardinier) sont de bons points de départ.
  **Nieuw:** Pour une entreprise namuroise, Kapsalon Ivelien (un salon avec bouton rendez-vous) et Tuinzorg Varelinde (un jardinier) vous donnent une idée de ce qui est possible.
- **Oud:** Votre site doit donc montrer en quelques secondes qui vous êtes, ce que vous proposez et comment vous joindre.
  **Nieuw:** Votre site doit leur montrer rapidement ce que vous proposez et comment vous joindre.
- **Oud:** Namur est une ville à taille humaine où l’on se connaît, mais où les clients cherchent d’abord en ligne.
  **Nieuw:** À Namur, on se connaît vite, mais les clients regardent quand même d’abord en ligne.

### /website-laten-maken-antwerpen/ (15 zinnen)

- **Oud:** Tegelijk is Antwerpen een winkel- en uitgaansstad, met de Meir als bekendste winkelstraat, het Zuid en het Eilandje voor horeca en een sterke mode- en designscene.
  **Nieuw:** Antwerpen is ook een winkel- en uitgaansstad: de Meir is de bekendste winkelstraat, het Zuid en het Eilandje zijn de horecabuurten en de stad heeft een sterke mode- en designscene.
- **Oud:** Rond de Meir, de Groenplaats, het Eilandje en het Zuid zoeken voorbijgangers en bezoekers op hun gsm naar openingsuren, een menu of de dichtstbijzijnde winkel.
  **Nieuw:** Rond de Meir, de Groenplaats, het Eilandje en het Zuid zoeken voorbijgangers en bezoekers op hun gsm naar openingsuren, een menu of de dichtstbijzijnde winkel, en ze willen dat snel vinden.
- **Oud:** Voor Antwerpse zaken zijn bijvoorbeeld Bistro Tilvaar (horeca met online reserveren) en Vennebrand (een kleine webshop) een goed vertrekpunt.
  **Nieuw:** Voor Antwerpse zaken zijn bijvoorbeeld Bistro Tilvaar (horeca met online reserveren) en Vennebrand (een kleine webshop) bruikbare voorbeelden.

### /website-laten-maken-brugge/ (15 zinnen)

- **Oud:** Voor Brugse zaken zijn bijvoorbeeld Bistro Tilvaar (horeca met terras en online reserveren) en Houtatelier Nethe (een ambachtelijk atelier) een goed vertrekpunt.
  **Nieuw:** Kennismaking en overleg verlopen online, per e-mail of telefoon, met één vast aanspreekpunt.
- **Oud:** Op uw site staat dan duidelijk welke gemeenten u bedient, zonder voor elke gemeente een aparte pagina.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.
- **Oud:** Wij maken websites voor zaken in heel Brugge en de deelgemeenten, en in het Brugse Ommeland.
  **Nieuw:** Ja, in heel Brugge, de deelgemeenten en het Brugse Ommeland.

### /website-laten-maken-brussel/ (12 zinnen)

- **Oud:** Het Brussels Hoofdstedelijk Gewest telt 19 gemeenten, elk met een eigen karakter: van de winkelstraten in het centrum en rond de Louizalaan tot de rustige woonwijken in Ukkel en de Woluwes.
  **Nieuw:** Het Brussels Hoofdstedelijk Gewest telt 19 gemeenten, van de winkelstraten in het centrum en rond de Louizalaan tot de rustige woonwijken in Ukkel en de Woluwes.
- **Oud:** Voor Brusselse zaken zijn bijvoorbeeld Velours (een salon met afsprakenplanner) en Bistro Tilvaar (horeca met online reserveren) een goed vertrekpunt.
  **Nieuw:** Voor Brusselse zaken zijn bijvoorbeeld Velours (een salon met afsprakenplanner) en Bistro Tilvaar (horeca met online reserveren) goede voorbeelden.
- **Oud:** Wij vermelden in gewone zinnen in welke gemeenten u werkt, en uw gegevens komen overeen met uw Google Bedrijfsprofiel.
  **Nieuw:** Op uw site staat in welke gemeenten u werkt.

### /website-laten-maken-geel/ (1 zin)

- **Oud:** Wij zetten daarom in gewone zinnen op uw site in welke delen van Geel en in welke buurgemeenten u werkt, zonder voor elk gehucht een aparte, lege pagina te maken.
  **Nieuw:** Daarom noemen wij op uw site de delen van Geel en de buurgemeenten waar u werkt.

### /website-laten-maken-hasselt/ (14 zinnen)

- **Oud:** Voor Hasseltse zaken zijn bijvoorbeeld Vennebrand (een kleine webshop) en Velours (een schoonheidssalon met afsprakenplanner) een goed vertrekpunt.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.
- **Oud:** Werkt u vanuit Kermt, Kuringen, Stevoort, Stokrooie, Sint-Lambrechts-Herk of Wimmertingen, dan zoeken klanten op hun eigen gemeente.
  **Nieuw:** Werkt u vanuit Kermt, Kuringen, Stevoort, Stokrooie, Sint-Lambrechts-Herk of Wimmertingen, dan zoeken klanten op hun eigen deelgemeente.
- **Oud:** Met de Universiteit Hasselt en de Corda Campus in Kiewit is er ook een groeiende groep jonge bedrijven en dienstverleners.
  **Nieuw:** Rond de Universiteit Hasselt en de Corda Campus in Kiewit werken ook veel jonge bedrijven en dienstverleners.

### /website-laten-maken-herentals/ (2 zinnen)

- **Oud:** Wij vermelden in gewone tekst waar u zit en in welke gemeenten rond Herentals u werkt, bijvoorbeeld Grobbendonk, Olen of Lille, als dat klopt voor uw zaak.
  **Nieuw:** Op uw site staat waar u zit en in welke gemeenten rond Herentals u werkt, bijvoorbeeld Grobbendonk, Olen of Lille, als dat klopt voor uw zaak.
- **Oud:** Uw naam, adres en telefoon staan op uw website exact zoals in uw Google Bedrijfsprofiel.
  **Nieuw:** Naam, adres en telefoon zijn dezelfde als in uw Google Bedrijfsprofiel.

### /website-laten-maken-kasterlee/ (2 zinnen)

- **Oud:** Uw website vermeldt daarom in gewone zinnen of u in Kasterlee, Lichtaart of Tielen zit, en zet uw uren en de route vooraan.
  **Nieuw:** Uw website zegt daarom of u in Kasterlee, Lichtaart of Tielen zit, met uw uren en de route bovenaan.
- **Oud:** Uw naam, adres en telefoon staan exact gelijk op uw website en in uw Google Bedrijfsprofiel.
  **Nieuw:** Uw gegevens zijn dezelfde op uw website en in uw Google Bedrijfsprofiel.

### /website-laten-maken-kempen/ (2 zinnen)

- **Oud:** Daarnaast telt uw Google Bedrijfsprofiel: naam, adres en telefoon moeten er exact hetzelfde staan als op uw website.
  **Nieuw:** Naam, adres en telefoon moeten er letterlijk hetzelfde staan als op uw website.
- **Oud:** Daarom zetten wij op uw website in gewone zinnen in welke gemeenten u werkt, en welke diensten u daar aanbiedt.
  **Nieuw:** Daarom staat op uw website in welke gemeenten u werkt en wat u daar doet.

### /website-laten-maken-mechelen/ (17 zinnen)

- **Oud:** Voor Mechelse zaken zijn bijvoorbeeld Atelier Kleurwerk (een schilder) en Kapsalon Ivelien (een salon met afspraakknop) een goed vertrekpunt.
  **Nieuw:** Voor Mechelse zaken zijn bijvoorbeeld Atelier Kleurwerk (een schilder) en Kapsalon Ivelien (een salon met afspraakknop) goede voorbeelden.
- **Oud:** Een website voor een zaak in de binnenstad richt zich dus anders dan een site voor een bedrijf op een bedrijventerrein langs de ring.
  **Nieuw:** Een zaak in de binnenstad spreekt andere mensen aan dan een bedrijf op een bedrijventerrein langs de ring, en dat ziet u aan de website.
- **Oud:** Wij vermelden in gewone zinnen waar u werkt, en uw gegevens komen overeen met uw Google Bedrijfsprofiel.
  **Nieuw:** Wij zetten die deelgemeenten op uw site, gelijk aan uw Google Bedrijfsprofiel.

### /website-laten-maken-mol/ (2 zinnen)

- **Oud:** Uw naam, adres en telefoon zijn op uw website en in uw Google Bedrijfsprofiel exact gelijk, zodat u ook op Google Maps goed te vinden bent.
  **Nieuw:** Staan naam, adres en telefoon op uw website en in uw Google Bedrijfsprofiel hetzelfde, dan vindt men u ook op Google Maps beter.
- **Oud:** Voor de eersten vermelden wij in gewone zinnen in welke delen van Mol en in welke buurgemeenten u werkt.
  **Nieuw:** Voor de eersten noemen wij de delen van Mol en de buurgemeenten waar u werkt.

### /website-laten-maken-turnhout/ (2 zinnen)

- **Oud:** Uw naam, adres en telefoon staan op uw site exact zoals in uw Google Bedrijfsprofiel, en uw openingsuren zijn op beide plaatsen gelijk.
  **Nieuw:** Naam, adres, telefoon en openingsuren zijn op uw site en in uw Google Bedrijfsprofiel dezelfde, zodat Google weet dat het om één zaak gaat.

## Over ons, contact, SEO, hubs, webshop

### /contact/ (3 zinnen)

- **Oud:** Wij maken eerst een vrijblijvend voorstel, u zit nergens aan vast.
  **Nieuw:** Daarna maken wij een vrijblijvend voorstel voor uw zaak.
- **Oud:** Overleg online, per e-mail of telefoon.
  **Nieuw:** Overleg gebeurt online, per e-mail of telefoon.
- **Oud:** In Kasterlee, voor heel België.
  **Nieuw:** Wij zitten in Kasterlee en werken voor heel België.

### /en/ (2 zinnen)

- **Oud:** Four straightforward steps so you always know what happens next, what it costs and when your website goes live.
  **Nieuw:** At each step you know what happens and what it costs.
- **Oud:** Clear answers about our approach, fixed pricing and delivery times.
  **Nieuw:** Answers about how we work, our prices and when your site goes live.

### /en/about-us/ (6 zinnen)

- **Oud:** We build websites and online shops, help your business get found on Google, and design logos and visual identities for entrepreneurs, associations and freelancers across Belgium.
  **Nieuw:** We build websites for businesses across Belgium.
- **Oud:** That is why all our prices are public, why we start with a no-obligation proposal, and why every site gets its own design instead of a template.
  **Nieuw:** So our prices are public, we start with a no-obligation proposal and every site gets its own design instead of a template.
- **Oud:** Websites that work for your business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/contact/ (1 zin)


### /en/seo-services/ (3 zinnen)

- **Oud:** If you do not show up there, you do not exist for them.
  **Nieuw:** If you do not show up there, they usually pick someone else.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/website-design-belgium/ (9 zinnen)

- **Oud:** Wherever your business is, you get the same approach and the same prices: a no-obligation proposal first, then a custom design that loads fast and is accessible to everyone.
  **Nieuw:** Wherever your business is, the approach and the prices are the same: a no-obligation proposal first, then a custom design that loads fast and that everyone can use.
- **Oud:** For the essentials on having a website built, see our home page.
  **Nieuw:** For more about having a website built, see our home page.
- **Oud:** Each city page explains what that means for businesses there.
  **Nieuw:** The city pages explain what is different in each city.

### /fr/ (3 zinnen)

- **Oud:** Quatre étapes simples pour savoir à tout moment ce qui est fait, ce que cela coûte et quand votre site sera en ligne.
  **Nieuw:** À chaque étape, vous savez ce qui se passe et ce que cela coûte.
- **Oud:** Des réponses claires sur notre approche, nos prix fixes et les délais de mise en ligne.
  **Nieuw:** Nos réponses sur la méthode, les prix et le délai de mise en ligne.
- **Oud:** Les noms et données sont fictifs ; cliquez pour le public, les choix et les fonctions.
  **Nieuw:** Les noms et données sont fictifs ; cliquez pour voir à qui chaque site s’adresse, les choix et les fonctions.

### /fr/a-propos/ (5 zinnen)

- **Oud:** Nous créons des sites internet et des boutiques en ligne, nous aidons votre entreprise à être trouvée dans Google et nous concevons logos et identités visuelles, pour des entrepreneurs, des associations et des indépendants dans toute la Belgique.
  **Nieuw:** Nous travaillons aussi votre visibilité dans Google et concevons logos et identités visuelles.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.
- **Oud:** Des sites qui travaillent pour votre entreprise.
  **Nieuw:** Nous créons des sites pour des entreprises dans toute la Belgique.

### /fr/contact/ (1 zin)


### /fr/creation-site-internet/ (7 zinnen)

- **Oud:** Où que se trouve votre entreprise, vous bénéficiez de la même approche et des mêmes prix : d’abord une proposition sans engagement, ensuite un design propre, rapide et accessible à tous.
  **Nieuw:** Où que se trouve votre entreprise, la méthode et les prix ne changent pas : d’abord une proposition sans engagement, ensuite un design propre, rapide et accessible à tous.
- **Oud:** Sur chaque page de ville, vous découvrez ce que cela veut dire concrètement.
  **Nieuw:** Pour tout savoir sur la création de site internet, rendez-vous sur notre page d’accueil.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/referencement-seo/ (4 zinnen)

- **Oud:** Nous partons de ce que vos clients tapent vraiment : votre service, souvent avec votre commune ou votre région.
  **Nieuw:** Nous partons de ce que vos clients tapent : votre service, souvent avec votre commune ou votre région.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.
- **Oud:** Si vous n’y apparaissez pas, vous n’existez pas pour eux.
  **Nieuw:** Si vous n’y apparaissez pas, ils passent en général à quelqu’un d’autre.

### /over-ons/ (8 zinnen)

- **Oud:** Wij maken websites en webshops, zorgen dat uw zaak gevonden wordt in Google en ontwerpen logo's en huisstijlen, voor ondernemers, verenigingen en zelfstandigen in heel België.
  **Nieuw:** Wij maken websites voor zaken in heel België.
- **Oud:** De teksten op uw site schrijven wij na een gesprek, in gewone taal, zodat uw klanten meteen begrijpen wat u doet en voor wie.
  **Nieuw:** Na een gesprek schrijven wij de teksten van uw site in gewone taal.
- **Oud:** Daar kennen wij de zaken, de verenigingen en de vakmensen van dichtbij.
  **Nieuw:** De zaken en verenigingen in de streek kennen wij van dichtbij.

### /seo-laten-doen/ (6 zinnen)

- **Oud:** Duidelijke veelgestelde vragen en gestructureerde gegevens helpen zulke systemen om uw zaak correct te beschrijven.
  **Nieuw:** Met duidelijke veelgestelde vragen en gestructureerde gegevens beschrijven zulke assistenten uw zaak correcter.
- **Oud:** Wij beginnen bij wat uw klanten echt intypen: uw dienst, vaak met uw gemeente of regio erbij.
  **Nieuw:** Wij beginnen bij wat uw klanten intypen: uw dienst, vaak met uw gemeente of regio erbij.
- **Oud:** Steeds meer mensen stellen hun vraag aan een AI-assistent.
  **Nieuw:** Sommige mensen stellen hun vraag aan een AI-assistent in plaats van een zoekmachine.

### /webshop-laten-maken/ (5 zinnen)

- **Oud:** Klanten betalen online met bankkaart of kredietkaart, via een betrouwbare betaaldienst.
  **Nieuw:** Klanten betalen online met bankkaart of kredietkaart, via een betaaldienst die zij kennen.
- **Oud:** Een webshop is meer dan een paar producten online zetten.
  **Nieuw:** Producten aanpassen
- **Oud:** Dit hoort erbij, en dit zit in ons pakket.
  **Nieuw:** Dit hoort bij een webshop, en het zit in ons pakket Webshop.

### /website-laten-maken-belgie/ (8 zinnen)

- **Oud:** Waar uw zaak ook staat, u krijgt dezelfde aanpak en dezelfde prijzen: eerst een vrijblijvend voorstel, daarna een eigen ontwerp dat snel laadt en toegankelijk is voor iedereen.
  **Nieuw:** Waar uw zaak ook staat, de aanpak en de prijzen zijn dezelfde: eerst een vrijblijvend voorstel, daarna een eigen ontwerp dat snel laadt en voor iedereen bruikbaar is.
- **Oud:** Op elke stadspagina leest u wat dat concreet betekent voor zaken in die stad.
  **Nieuw:** Op de stadspagina's leest u wat er in die stad anders is.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

## Prijsgids

### /en/wat-kost-een-website/ (6 zinnen)

- **Oud:** Each price is a starting price; after a short conversation you receive a written quote with the exact amount.
  **Nieuw:** The exact amount is in the written quote you receive after a short conversation.
- **Oud:** Maintenance keeps your site secure, fast and up to date.
  **Nieuw:** Maintenance keeps your site secure and up to date.
- **Oud:** Here is what a website costs with us, by type of site.
  **Nieuw:** With us, most of it is included in the monthly fee.

### /fr/prix-site-internet/ (6 zinnen)

- **Oud:** Sur les sites d’agences web belges, nous avons relevé en novembre 2026 des prix d’entrée d’environ €700 à €2.200 pour un site, et à partir d’environ €5.000 pour une boutique sur mesure.
  **Nieuw:** La maintenance garde votre site sûr et à jour.
- **Oud:** Chaque prix est un prix de départ ; après un court entretien, vous recevez une offre écrite avec le montant exact.
  **Nieuw:** Le montant exact figure dans l’offre écrite que vous recevez après un court entretien.
- **Oud:** Voici en un coup d’œil ce que coûte un site chez nous, par type de site.
  **Nieuw:** Voici nos prix de départ par type de site.

### /wat-kost-een-website/ (6 zinnen)

- **Oud:** Elke prijs is een vanaf-prijs; na een kort gesprek krijgt u een schriftelijke offerte met het exacte bedrag.
  **Nieuw:** Het exacte bedrag staat in de schriftelijke offerte die u na een kort gesprek krijgt.
- **Oud:** Hieronder ziet u in één oogopslag wat een website bij ons kost, per type site.
  **Nieuw:** Dit zijn onze vanaf-prijzen per type site.
- **Oud:** Onderhoud houdt uw site veilig, snel en up-to-date.
  **Nieuw:** Met onderhoud blijft uw site veilig en up-to-date.

## Voorbeelddetails

### /en/voorbeeldontwerpen/atelier-kleurwerk/ (4 zinnen)

- **Oud:** Each type of work has its own place, and the strengths (samples on your wall, covering and tidying up, a clear quote) speak to the care for finish.
  **Nieuw:** Each type of work has its own place, and the strengths (samples on your wall, covering and tidying up, a clear quote) show the care that goes into the finish.
- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/voorbeeldontwerpen/barbier-kolvaard/ (4 zinnen)

- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** Each treatment has its own block, and the strengths (no queue, finished by hand, maintenance advice) are short and punchy.
  **Nieuw:** Each treatment has its own block, and the strengths (no queue, finished by hand, maintenance advice) take only a few words.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/voorbeeldontwerpen/bistro-tilvaar/ (4 zinnen)

- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** Terrace, groups and beer and wine each have their own block, so visitors find what they need straight away.
  **Nieuw:** Terrace, groups and beer and wine each have their own block.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/voorbeeldontwerpen/dakwerken-hoogland/ (4 zinnen)

- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** The strengths (inspection with photos, itemised quote, a tidy site, one point of contact) are grouped short and concrete.
  **Nieuw:** The strengths (inspection with photos, itemised quote, a tidy site, one point of contact) are listed briefly together.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/voorbeeldontwerpen/houtatelier-nethe/ (3 zinnen)

- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/voorbeeldontwerpen/kapsalon-ivelien/ (3 zinnen)

- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/voorbeeldontwerpen/tuinzorg-varelinde/ (3 zinnen)

- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/voorbeeldontwerpen/velours/ (3 zinnen)

- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /en/voorbeeldontwerpen/vennebrand/ (3 zinnen)

- **Oud:** That is why we design every page for a small screen first: large buttons, short blocks of text and the main action always within reach.
  **Nieuw:** That is why we design every page for a small screen first, with large buttons and short blocks of text.
- **Oud:** Ask for a no-obligation proposal for your own business.
  **Nieuw:** Ask for a no-obligation proposal for your business.

### /fr/exemples-de-sites/atelier-kleurwerk/ (4 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Chaque type de travaux a sa place, et les atouts (échantillons sur votre mur, protection et nettoyage, un devis clair) parlent du soin de la finition.
  **Nieuw:** Chaque type de travaux a sa place, et les atouts (échantillons sur votre mur, protection et nettoyage, un devis clair) montrent le soin apporté à la finition.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/exemples-de-sites/barbier-kolvaard/ (4 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Chaque prestation a son bloc, et les atouts (pas de file d’attente, finition à la main, conseils d’entretien) sont formulés de façon courte et percutante.
  **Nieuw:** Chaque prestation a son bloc, et les atouts (pas de file d’attente, finition à la main, conseils d’entretien) tiennent en quelques mots.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/exemples-de-sites/bistro-tilvaar/ (4 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Terrasse, groupes et bières et vins ont chacun leur bloc, pour que les visiteurs trouvent tout de suite ce qu’ils cherchent.
  **Nieuw:** Terrasse, groupes et bières et vins ont chacun leur bloc.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/exemples-de-sites/dakwerken-hoogland/ (3 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/exemples-de-sites/houtatelier-nethe/ (3 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/exemples-de-sites/kapsalon-ivelien/ (3 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/exemples-de-sites/tuinzorg-varelinde/ (3 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/exemples-de-sites/velours/ (3 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /fr/exemples-de-sites/vennebrand/ (3 zinnen)

- **Oud:** Nous concevons donc chaque page d’abord pour un petit écran : de grands boutons, des blocs de texte courts et l’action principale toujours à portée de main.
  **Nieuw:** Nous concevons donc chaque page d’abord pour un petit écran, avec de grands boutons et des blocs de texte courts.
- **Oud:** Demandez une proposition sans engagement pour votre propre entreprise.
  **Nieuw:** Demandez une proposition sans engagement pour votre entreprise.

### /voorbeeldontwerpen/atelier-kleurwerk/ (4 zinnen)

- **Oud:** Elk soort werk krijgt een eigen plaats, en de troeven (stalen op uw muur, afdekken en opruimen, een heldere offerte) spreken de zorg voor afwerking aan.
  **Nieuw:** Elk soort werk krijgt een eigen plaats, en de troeven (stalen op uw muur, afdekken en opruimen, een duidelijke offerte) tonen hoeveel zorg naar de afwerking gaat.
- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

### /voorbeeldontwerpen/barbier-kolvaard/ (4 zinnen)

- **Oud:** Elke behandeling heeft een eigen blok, en de troeven (geen wachtrij, met de hand afgewerkt, advies over onderhoud) staan kort en stevig geformuleerd.
  **Nieuw:** Elke behandeling heeft een eigen blok, en de troeven (geen wachtrij, met de hand afgewerkt, advies over onderhoud) staan er in een paar woorden.
- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

### /voorbeeldontwerpen/bistro-tilvaar/ (4 zinnen)

- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Terras, groepen en bier en wijn hebben elk een eigen blok, zodat bezoekers meteen vinden wat ze zoeken.
  **Nieuw:** Terras, groepen en bier en wijn hebben elk een eigen blok.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

### /voorbeeldontwerpen/dakwerken-hoogland/ (3 zinnen)

- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

### /voorbeeldontwerpen/houtatelier-nethe/ (5 zinnen)

- **Oud:** De diensten staan overzichtelijk naast elkaar, en vier vaste troeven (eerst een tekening, houtstalen in de hand, gemaakt in het eigen atelier, plaatsing door de maker) leggen uit waarom klanten voor dit atelier kiezen.
  **Nieuw:** De diensten staan naast elkaar.
- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

### /voorbeeldontwerpen/kapsalon-ivelien/ (3 zinnen)

- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

### /voorbeeldontwerpen/tuinzorg-varelinde/ (5 zinnen)

- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Een fris, groen ontwerp met een heldere opbouw: onderhoud, snoeien, rooien en aanleg volgen elkaar logisch op.
  **Nieuw:** Een fris, groen ontwerp waarin onderhoud, snoeien, rooien en aanleg elkaar opvolgen.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

### /voorbeeldontwerpen/velours/ (3 zinnen)

- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

### /voorbeeldontwerpen/vennebrand/ (3 zinnen)

- **Oud:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm: grote knoppen, korte blokken tekst en de belangrijkste actie altijd binnen bereik.
  **Nieuw:** Daarom ontwerpen wij elke pagina eerst voor een klein scherm, met grote knoppen en korte blokken tekst.
- **Oud:** Vraag een vrijblijvend voorstel aan voor uw eigen zaak.
  **Nieuw:** Vraag een vrijblijvend voorstel aan voor uw zaak.

## Home (designteksten)

### // (2 zinnen)

- **Oud:** Vier overzichtelijke stappen waarmee u altijd weet wat er gebeurt, wat het kost en wanneer uw nieuwe website online staat.
  **Nieuw:** Bij elke stap weet u wat er gebeurt en wat het kost.
- **Oud:** Duidelijke antwoorden over onze aanpak, vaste prijzen en oplevering.
  **Nieuw:** Antwoorden over onze aanpak, de prijzen en wanneer uw site online staat.
