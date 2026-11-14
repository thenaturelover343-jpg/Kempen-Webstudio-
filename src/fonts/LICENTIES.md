# Lettertypes

| Gebruik | Lettertype | Bron | Licentie |
|---|---|---|---|
| Titels (h1–h3, woordmerk, grote cijfers) | **Switzer** (variabel, 100–900), van Indian Type Foundry | `bron/Switzer-Variable.woff2`, gedownload van Fontshare (api.fontshare.com) op 14-11-2026 | ITF Free Font License: gratis, ook voor commercieel gebruik (https://www.fontshare.com/licenses/itf-ffl) |
| Tekst | **Inter Tight** (variabel) | npm `@fontsource-variable/inter-tight` | SIL Open Font License 1.1 |

- De stijlgids noemt **Neue Montreal** (Pangram Pangram) voor titels. Dat lettertype is commercieel: voor een bedrijfssite heb je een betaalde licentie nodig, en het zat niet in de repo.
- Karim koos daarom op 14-11-2026 voor **Switzer** als vervanger. Er worden geen Neue Montreal-bestanden meegeleverd.
- De build (`scripts/build.mjs`) maakt van beide een subset met precies de tekens die op de site staan (latin + latin-ext, ook voor FR). Het resultaat staat in `assets/fonts/switzer.woff2` en `assets/fonts/inter-tight.woff2`, met `font-display: swap` en een preload.
