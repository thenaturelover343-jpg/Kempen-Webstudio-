// Korte teksten die alleen in het design bestaan (labels, knoppen voor schermlezers, klok ...).
// Bron: src/i18n/translations.ts van het design (NL/FR/EN), aangepast aan Kempen Webstudio
// (vanaf 14-11-2026 "vrijblijvend voorstel", geen gratis demo meer). Alles wat inhoud is, komt uit de bestaande site (model.mjs).
// Elke tekst hier staat ook in LEESMIJ.md bij "teksten ter goedkeuring".
export const UI = {
  nl: {
    region: 'Heel België', timeIn: 'Tijd in België', language: 'Taal', langGroup: 'Taalkeuze', menu: 'MENU',
    menuOpen: 'Menu openen', menuClose: 'Menu sluiten', clockLocale: 'nl-BE', clockFallback: 'Kasterlee, BE · CET',
    backToTop: 'Naar boven', chatClose: 'Venster sluiten', chatBrand: 'Antwoord doorgaans binnen 1 werkdag',
    badgeIntro: 'Voor elke zaak', badgeArea: 'Werkgebied', badgeReal: 'Realisaties & Voorbeelden', faqAll: 'Alle',
    capsules: ['Snel', 'Helder', 'Op maat'], moreNum: '8+', moreLabel: 'Sectoren', areaTitle: 'Werkt in heel België',
    prev: 'Vorige', next: 'Volgende', select: 'Selecteer', nextDemo: 'Volgend voorbeeldontwerp', show: 'Toon',
    faqFilter: 'Filter vragen op onderwerp', step: 'Stap', open: 'Openen', newWindow: '(opent in een nieuw venster)',
    sectorsMore: 'Sectoren',
    stepTags: ['Dag 1', 'Vaste prijs', '5–10 werkdagen', 'Doorlopend'],
    stepNotes: ['Persoonlijk antwoord binnen 1 werkdag', 'Duidelijk overzicht vooraf, zonder verrassingen', 'Geoptimaliseerd voor gsm en computer', 'Eén vast aanspreekpunt na lancering'],
    stepsSub: 'Vier overzichtelijke stappen waarmee u altijd weet wat er gebeurt, wat het kost en wanneer uw nieuwe website online staat.',
    faqSub: 'Duidelijke antwoorden over onze aanpak, vaste prijzen en oplevering.',
  },
  fr: {
    region: 'Toute la Belgique', timeIn: 'Heure en Belgique', language: 'Langue', langGroup: 'Choix de langue', menu: 'MENU',
    menuOpen: 'Ouvrir le menu', menuClose: 'Fermer le menu', clockLocale: 'fr-BE', clockFallback: 'Kasterlee, BE · CET',
    backToTop: 'Haut de page', chatClose: 'Fermer la fenêtre', chatBrand: 'Réponse habituelle sous 1 jour ouvrable',
    badgeIntro: 'Pour chaque activité', badgeArea: 'Zone d’action', badgeReal: 'Réalisations & Exemples', faqAll: 'Toutes',
    capsules: ['Rapide', 'Clair', 'Sur mesure'], moreNum: '8+', moreLabel: 'Secteurs', areaTitle: 'Actif dans toute la Belgique',
    prev: 'Précédent', next: 'Suivant', select: 'Sélectionner', nextDemo: 'Exemple suivant', show: 'Afficher',
    faqFilter: 'Filtrer les questions par sujet', step: 'Étape', open: 'Ouvrir', newWindow: '(s’ouvre dans une nouvelle fenêtre)',
    sectorsMore: 'Secteurs',
    stepTags: ['Jour 1', 'Prix fixe', '5–10 jours ouvr.', 'Continu'],
    stepNotes: ['Réponse personnelle sous 1 jour ouvrable', 'Tout est clair à l’avance, sans surprises', 'Optimisé pour mobile et ordinateur', 'Un interlocuteur unique après lancement'],
    stepsSub: 'Quatre étapes simples pour savoir à tout moment ce qui est fait, ce que cela coûte et quand votre site sera en ligne.',
    faqSub: 'Des réponses claires sur notre approche, nos prix fixes et les délais de mise en ligne.',
  },
  en: {
    region: 'All of Belgium', timeIn: 'Time in Belgium', language: 'Language', langGroup: 'Language selector', menu: 'MENU',
    menuOpen: 'Open menu', menuClose: 'Close menu', clockLocale: 'en-GB', clockFallback: 'Kasterlee, BE · CET',
    backToTop: 'Back to top', chatClose: 'Close dialog', chatBrand: 'Reply usually within 1 business day',
    badgeIntro: 'For every business', badgeArea: 'Service Area', badgeReal: 'Work & Examples', faqAll: 'All',
    capsules: ['Fast', 'Clear', 'Tailored'], moreNum: '8+', moreLabel: 'Sectors', areaTitle: 'Serving all of Belgium',
    prev: 'Previous', next: 'Next', select: 'Select', nextDemo: 'Next sample design', show: 'Show',
    faqFilter: 'Filter questions by topic', step: 'Step', open: 'Open', newWindow: '(opens in a new window)',
    sectorsMore: 'Sectors',
    stepTags: ['Day 1', 'Fixed price', '5–10 bus. days', 'Ongoing'],
    stepNotes: ['Personal reply within 1 business day', 'Full clarity upfront, with zero surprises', 'Optimized for phone and desktop', 'One dedicated contact after launch'],
    stepsSub: 'Four straightforward steps so you always know what happens next, what it costs and when your website goes live.',
    faqSub: 'Clear answers about our approach, fixed pricing and delivery times.',
  },
};
