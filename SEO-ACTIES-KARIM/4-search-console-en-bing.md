# 4. Google Search Console en Bing Webmaster Tools: stappenplan

Dit doet u **na** de publicatie van de nieuwe site. De nieuwe site staat nog niet online; dat gebeurt pas na uw OK.

## Vóór de publicatie

1. Controleer dat `npm run build` en `npm run check` 0 fouten geven.
2. Zet de volledige inhoud van `dist-live/` online, ook de bestanden `_redirects` en `_headers`.
   - De site draait achter **Cloudflare**: dat blijkt uit de response-headers `server: cloudflare` en `cf-ray`, en uit de automatische 301 naar de URL met slash.
   - Cloudflare Pages en Workers Static Assets lezen `_redirects` en `_headers` automatisch.
   - Draait de site via een eigen Worker zonder die ondersteuning, geef de regels uit `_redirects` dan in als **Bulk Redirects** in het Cloudflare-dashboard (Rules → Redirect Rules → Bulk Redirects, status 301).
   - Vangnet: op elk oud FR-pad staat in elk geval een HTML-pagina met een meta refresh en een canonical naar het nieuwe adres.
3. Test na de publicatie een paar oude FR-adressen, bijvoorbeeld:
   - `https://www.kempenwebstudio.be/fr/website-laten-maken-gent/` → moet 301 geven naar `/fr/creation-site-internet-gand/`
   - `https://www.kempenwebstudio.be/fr/kennis/` → 301 naar `/fr/conseils/`

## Google Search Console

1. Ga naar https://search.google.com/search-console en kies **Domein-property**: `kempenwebstudio.be`.
2. Verifieer via DNS. Google geeft een TXT-record. Voeg dat in Cloudflare toe onder DNS → Records → Add record (type TXT, naam `@`), en klik dan op Verifiëren.
3. **Sitemaps:** voeg `https://www.kempenwebstudio.be/sitemap.xml` toe. Ze bevat alle pagina's, met hreflang en beelden.
4. **URL-inspectie:** vraag indexering aan voor de belangrijkste nieuwe pagina's:
   - de startpagina;
   - `/wat-kost-een-website/`;
   - `/website-laten-maken-antwerpen/`;
   - `/website-laten-maken-brussel/`;
   - `/fr/creation-site-internet-bruxelles/`;
   - `/fr/creation-site-internet-liege/`;
   - `/over-ons/`;
   - `/contact/`;
   - `/seo-laten-doen/`.
5. Controleer na 1 à 2 weken in **Pagina's** of de oude FR-adressen als "Pagina met omleiding" staan. Dat is goed.
6. **Prestaties:** maak filters (Query → Aangepast, regex) om drie groepen apart te volgen:
   - NL-stad: `laten maken (in )?(antwerpen|gent|brussel|leuven|mechelen|hasselt|brugge|kortrijk|turnhout|geel|mol|herentals|kasterlee|kempen)`;
   - FR: `création|creation|site internet|site web`;
   - prijs: `prijs|kost|kosten|prix`.
7. Exporteer elke maand `queries.csv` naar `C:\Users\GbThe\KempenTeam\seo-data\`. Dan stuur ik bij op de pagina's die op positie 5–30 staan.

## Bing Webmaster Tools

1. Ga naar https://www.bing.com/webmasters. De oude site had al een Bing-verificatie (msvalidate). Controleer of die property nog bestaat.
2. Kies **Importeren uit Google Search Console**. Dat is het snelst, want sitemaps en verificatie komen mee.
3. Of handmatig: voeg de site toe, verifieer via DNS (CNAME) en dien de sitemap in.
4. Zet **IndexNow** aan als Bing het aanbiedt. Nieuwe pagina's komen dan sneller in Bing en Copilot.

## Analytics en conversies (aanrader)

Meet het aantal verzonden formulieren en kliks op het telefoonnummer, privacyvriendelijk: bijvoorbeeld Cloudflare Web Analytics, dat nu al in de CSP staat, of Plausible. GA4 kan alleen met toestemming via de cookiebanner. Zeg welke u wilt, dan bouw ik het in.
