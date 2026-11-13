import type { PageRoute } from '../data/webstudioData';
import type { Language } from './LanguageContext';

export type FaqTopicKey =
  | 'all'
  | 'approach'
  | 'pricing'
  | 'services'
  | 'practical'
  | 'workflow';

export interface Translations {
  common: {
    defaultPresetSubject: string;
    floatingContactCta: string;
    dismissToastAria: string;
    perMonthShort: string;
    exclVat: string;
    fromWord: string;
    oneTimeWord: string;
    perMonthFull: string;
  };
  header: {
    navAria: string;
    navPages: { label: string; route: PageRoute }[];
    belgiumRegion: string;
    menuLabel: string;
    closeMenuAria: string;
    requestProposal: string;
    timeInBelgium: string;
    languageGroupLabel: string;
    languageLabelDrawer: string;
    languageNames: Record<Language, string>;
    clockLocale: string;
    fallbackClock: string;
  };
  footer: {
    summary: string;
    cta: string;
    pagesHeading: string;
    pages: { route: PageRoute; label: string }[];
    servicesHeading: string;
    serviceLinks: string[];
    contactHeading: string;
    addressLine2: string;
    enterpriseNumber: string;
    backToTop: string;
  };
  chat: {
    brandLine: string;
    title: string;
    closeAria: string;
    sentTitle: string;
    sentBodyBeforeEmail: string;
    sentBodyBetweenEmailPhone: string;
    backToSite: string;
    namePlaceholder: string;
    businessPlaceholder: string;
    emailPlaceholder: string;
    scopeLabel: string;
    scopeOptions: string[];
    messagePlaceholder: string;
    privacyNote: string;
    errorInvalidEmail: string;
    errorShortMessage: string;
    submitButton: string;
    toastTitle: string;
    toastDescription: (name: string, email: string) => string;
  };
  home: {
    heroPortraitAlt: string;
    heroEyebrow: string;
    heroLine1: string;
    heroLine2Start: string;
    heroLine2Accent: string;
    heroLine3Start: string;
    heroLine3Accent: string;
    heroSubtitle: string;
    heroStarsAria: string;
    heroTrustStrip: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    showcaseMenuAria: string;
    showcasePrevAria: string;
    showcaseNextAria: string;
    sectorsStripTitle: string;
    barPrice: string;
    barProposal: string;
    barScroll: string;
    sec2Badge: string;
    sec2GlobeLine1: string;
    sec2GlobeLine2: string;
    sec2HeadingMain: string;
    sec2HeadingMuted: string;
    sec2ReplyNote: string;
    sec2MailAria: string;
    sec2CallAria: string;
    sec2ExamplesAria: string;
    sec2AllExamplesCta: string;
    capsule1: string;
    capsule2: string;
    capsule3Aria: string;
    capsule4: string;
    sec3Badge: string;
    sec3Title: string;
    sec3Subtitle: string;
    sec3SelectAriaPrefix: string;
    sec3NextAria: string;
    sec3ProposalForCase: string;
    sec3NotListedTitle: string;
    sec3NotListedBody: string;
    sec3CustomProposalCta: string;
    sec4Badge: string;
    sec4TitleLine1: string;
    sec4TitleLine2: string;
    sec4MoreSectorsNum: string;
    sec4MoreSectorsLabel: string;
    sec4FooterLeft: string;
    sec4FooterMid: string;
    sec4FooterRight: string;
    sec5Badge: string;
    sec5Title: string;
    sec5Cta: string;
    sec5NoteLine1: string;
    sec5NoteLine2: string;
    sec5StatButtonPrefix: string;
    sec6TopNote1: string;
    sec6TopNote2: string;
    sec6Badge: string;
    sec6TitleLine1: string;
    sec6TitleLine2: string;
    sec6Subtitle: string;
    sec6Cta: string;
    sec6VatNote: string;
    sec7Badge: string;
    sec7Title: string;
    sec7Cta: string;
    sec8Badge: string;
    sec8Title: string;
    sec8Subtitle: string;
    sec8ChoosePrefix: string;
    sec8ContractNote: string;
    sec9Badge: string;
    sec9Title: string;
    sec9Subtitle: string;
    sec9StepAriaPrefix: string;
    sec9BannerText: string;
    sec9BannerCta: string;
    sec10Badge: string;
    sec10BrandLabel: string;
    sec10RegionLabel: string;
    sec11Badge: string;
    sec11Title: string;
    sec12Badge: string;
    sec12TitleLine1: string;
    sec12TitleLine2: string;
    sec12Subtitle: string;
    sec12Cta: string;
    faqBadge: string;
    faqTitle: string;
    faqSubtitle: string;
    faqTablistAria: string;
    faqTopics: { key: FaqTopicKey; label: string }[];
    faqCardCta: string;
    faqBottomText: string;
    faqBottomCta: string;
    contactBadge: string;
    contactTitle: string;
    contactSteps: { title: string; subtitle: string }[];
    contactMailLabel: string;
    contactCallLabel: string;
    contactSentTitle: string;
    contactSentBodyBeforeEmail: string;
    contactSentBodyBetween: string;
    contactSendAnother: string;
    contactNameLabel: string;
    contactNamePlaceholder: string;
    contactBusinessLabel: string;
    contactBusinessPlaceholder: string;
    contactEmailLabel: string;
    contactEmailPlaceholder: string;
    contactTopicLabel: string;
    contactMessageLabel: string;
    contactMessagePlaceholder: string;
    contactPrivacyNote: string;
    contactSubmitButton: string;
    contactErrorEmail: string;
    contactErrorName: string;
    contactToastTitle: string;
    contactToastDescription: (name: string, email: string) => string;
  };
  services: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    chooseTrackLabel: string;
    fromPricePrefix: string;
    trackLabel: string;
    deliverablesLabel: string;
    guidePriceLabel: string;
    requestProposalCta: string;
    estimatorBadge: string;
    estimatorTitle: string;
    estimatorSubtitle: string;
    estimatorModules: { id: string; label: string; price: number; labelTime: string }[];
    estimatorSummaryLabel: string;
    estimatorOneTimeFrom: string;
    estimatorFirstStepLabel: string;
    estimatorFirstStepValue: string;
    estimatorChosenLabel: string;
    estimatorViewProcess: string;
    estimatorSubjectPrefix: string;
    packagesBadge: string;
    packagesTitle: string;
    processBadge: string;
    processTitle: string;
    priceLocale: string;
  };
  about: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImageAlt: string;
    heroImageLocation: string;
    heroStatsExamples: string;
    heroStatsSectors: string;
    heroStatsPrice: string;
    showcaseBadge: string;
    showcaseTitle: string;
    showcaseSubtitle: string;
    fictionalBusinessLabel: string;
    requestProposalArrow: string;
    sectorsBadge: string;
    sectorsTitle: string;
    sectorFilterTabs: { id: 'all' | 'founder' | 'member'; label: string }[];
    focusLabel: string;
    allSectorsTitle: string;
    sectorSubjectPrefix: string;
    principles: { number: string; title: string; body: string }[];
    bottomCtaTitle: string;
    bottomCtaPrimary: string;
    bottomCtaSecondary: string;
  };
  vision: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    theses: { num: string; heading: string; copy: string }[];
    explorerBadge: string;
    explorerTitle: string;
    explorerSubtitle: string;
    pillars: {
      id: string;
      index: string;
      title: string;
      horizon: string;
      thesis: string;
      metric: string;
    }[];
    partLabel: string;
    includedLabel: string;
    requestProposalCta: string;
    paletteBadge: string;
    paletteTitle: string;
    paletteCta: string;
    paletteSwatches: { name: string; hex: string; bg: string; text: string }[];
  };
}

const NL: Translations = {
  common: {
    defaultPresetSubject: 'Vrijblijvend voorstel voor mijn website',
    floatingContactCta: 'Contacteer ons',
    dismissToastAria: 'Melding sluiten',
    perMonthShort: 'mnd',
    exclVat: 'excl. btw',
    fromWord: 'vanaf',
    oneTimeWord: 'eenmalig',
    perMonthFull: 'per maand excl. btw',
  },
  header: {
    navAria: 'Hoofdmenu',
    navPages: [
      { label: 'Home', route: 'Home' },
      { label: 'Diensten', route: 'Services' },
      { label: 'Voorbeelden', route: 'About' },
      { label: 'Werkwijze', route: 'Vision' },
    ],
    belgiumRegion: 'Heel België',
    menuLabel: 'MENU',
    closeMenuAria: 'Menu sluiten',
    requestProposal: 'Voorstel aanvragen',
    timeInBelgium: 'Tijd in België',
    languageGroupLabel: 'Taalkeuze',
    languageLabelDrawer: 'Taal',
    languageNames: {
      nl: 'Nederlands',
      fr: 'Français',
      en: 'English',
    },
    clockLocale: 'nl-BE',
    fallbackClock: 'Kasterlee, BE · CET',
  },
  footer: {
    summary:
      'Websites, vindbaarheid en huisstijl voor ondernemers, verenigingen en zelfstandigen in heel België.',
    cta: 'Voorstel aanvragen',
    pagesHeading: 'Pagina’s',
    pages: [
      { route: 'Home', label: 'Home' },
      { route: 'Services', label: 'Diensten & Kosten' },
      { route: 'About', label: 'Voorbeeldontwerpen' },
      { route: 'Vision', label: 'Werkwijze & Uitleg' },
    ],
    servicesHeading: 'Diensten',
    serviceLinks: [
      'Webontwikkeling',
      'Webshop laten maken',
      'Website laten vernieuwen',
      'SEO en zichtbaarheid',
      'Visuele identiteit',
      'Webtoegankelijkheid',
    ],
    contactHeading: 'Contact',
    addressLine2: '2460 Kasterlee, werkt in heel België',
    enterpriseNumber: 'Ondernemingsnummer BE 0897.577.919',
    backToTop: 'Naar boven',
  },
  chat: {
    brandLine: 'Webstudio K · Antwoord doorgaans binnen 1 werkdag',
    title: 'Vraag uw voorstel aan',
    closeAria: 'Venster sluiten',
    sentTitle: 'Bedankt, uw aanvraag is verstuurd.',
    sentBodyBeforeEmail: 'Wij antwoorden doorgaans binnen 1 werkdag op',
    sentBodyBetweenEmailPhone: 'Voor dringende vragen belt u',
    backToSite: 'Terug naar de site',
    namePlaceholder: 'Naam',
    businessPlaceholder: 'Uw zaak',
    emailPlaceholder: 'E-mailadres',
    scopeLabel: 'Waarmee kunnen wij helpen?',
    scopeOptions: [
      'Vrijblijvend voorstel voor mijn website',
      'Nieuwe website of webshop',
      'SEO en zichtbaarheid',
      'Logo en huisstijl',
      'Webtoegankelijkheid',
      'Iets anders',
    ],
    messagePlaceholder: 'Uw vraag...',
    privacyNote:
      'Wij gebruiken uw naam, e-mailadres en bericht alleen om uw vraag te beantwoorden.',
    errorInvalidEmail: 'Vul een geldig e-mailadres in.',
    errorShortMessage: 'Geef kort aan wat uw vraag of zaak is.',
    submitButton: 'Verstuur mijn aanvraag',
    toastTitle: 'Voorstel aangevraagd',
    toastDescription: (name, email) =>
      `Bedankt${name ? ` ${name}` : ''}! Wij antwoorden binnen 1 werkdag op ${email}.`,
  },
  home: {
    heroPortraitAlt: 'Webstudio K silhouet portret met oranje vizier',
    heroEyebrow: '| Voor elke zaak, vereniging en zelfstandige',
    heroLine1: 'Website laten',
    heroLine2Start: 'maken, ',
    heroLine2Accent: 'op maat',
    heroLine3Start: 'van ',
    heroLine3Accent: 'uw zaak',
    heroSubtitle:
      'Een duidelijke website voor uw onderneming, vereniging of zelfstandige activiteit — snel online en tegen een vaste prijs vooraf.',
    heroStarsAria: 'Vaste prijs vooraf',
    heroTrustStrip: 'Prijzen vanaf €490 excl. btw · Eén aanspreekpunt',
    heroPrimaryCta: 'Vrijblijvend voorstel',
    heroSecondaryCta: 'Bekijk voorbeelden',
    showcaseMenuAria: 'Bekijk werkwijze',
    showcasePrevAria: 'Vorige dia',
    showcaseNextAria: 'Volgende dia',
    sectorsStripTitle: 'Voor elke zaak een eigen website',
    barPrice: 'Prijzen vanaf €490 excl. btw',
    barProposal: 'Vrijblijvend voorstel binnen 1 werkdag',
    barScroll: 'Naar de inhoud',
    sec2Badge: '• Voor elke zaak',
    sec2GlobeLine1: 'Elk ontwerp vertrekt van uw klanten, uw werk',
    sec2GlobeLine2: 'en de vraag die een bezoeker als eerste stelt.',
    sec2HeadingMain: 'Wij bouwen een overzichtelijke website op maat van uw zaak.',
    sec2HeadingMuted:
      'Met heldere prijzen vooraf, persoonlijke opvolging en één vast aanspreekpunt.',
    sec2ReplyNote: 'Antwoord doorgaans binnen 1 werkdag',
    sec2MailAria: 'Mail naar info@webstudiok.be',
    sec2CallAria: 'Bel +32 14 71 80 80',
    sec2ExamplesAria: 'Bekijk alle voorbeeldontwerpen',
    sec2AllExamplesCta: 'Alle voorbeeldontwerpen',
    capsule1: 'Snel',
    capsule2: 'Helder',
    capsule3Aria: 'Bekijk voorbeeldontwerpen',
    capsule4: 'Op maat',
    sec3Badge: '• Voorbeeldontwerpen',
    sec3Title: 'Elke zaak een eigen gezicht.',
    sec3Subtitle:
      'Negen voorbeeldontwerpen voor heel verschillende zaken, elk met een eigen kleur, letter en opbouw. Alle namen en gegevens zijn fictief.',
    sec3SelectAriaPrefix: 'Selecteer',
    sec3NextAria: 'Volgend voorbeeldontwerp',
    sec3ProposalForCase: 'Voorstel voor uw zaak',
    sec3NotListedTitle: 'Uw zaak er niet bij?',
    sec3NotListedBody:
      'Wij maken voor elke zaak, vereniging of zelfstandige een eigen ontwerp. Vraag een vrijblijvend voorstel aan.',
    sec3CustomProposalCta: 'Vrijblijvend voorstel',
    sec4Badge: '• Bijvoorbeeld',
    sec4TitleLine1: 'Een paar sectoren',
    sec4TitleLine2: 'uitgelicht.',
    sec4MoreSectorsNum: '8+',
    sec4MoreSectorsLabel: 'Sectoren',
    sec4FooterLeft: '• Wij werken voor elke zaak',
    sec4FooterMid: '• Voor deze sectoren leest u alvast meer',
    sec4FooterRight: '• alle voorbeelden',
    sec5Badge: '• Voor en na',
    sec5Title: 'Van een losse vermelding in Google naar een eigen website.',
    sec5Cta: 'Voorstel aanvragen',
    sec5NoteLine1: 'Dakwerken Hoogland is een fictieve zaak, gemaakt als',
    sec5NoteLine2: 'voorbeeldontwerp. Het zoekresultaat is nagebootst.',
    sec5StatButtonPrefix: 'Toon',
    sec6TopNote1: 'Vier vakgebieden, elk met duidelijke prijzen.',
    sec6TopNote2: 'Alle prijzen zijn exclusief btw.',
    sec6Badge: '• Diensten',
    sec6TitleLine1: 'Alles bij één',
    sec6TitleLine2: 'aanspreekpunt.',
    sec6Subtitle:
      'Vier vakgebieden, elk met duidelijke prijzen. Alle prijzen zijn exclusief btw.',
    sec6Cta: 'Bekijk de volledige prijslijst',
    sec6VatNote: 'Alle prijzen zijn exclusief btw.',
    sec7Badge: '• Werkgebied',
    sec7Title: 'Werkt in heel België',
    sec7Cta: 'Voorstel aanvragen',
    sec8Badge: '• Pakketten',
    sec8Title: 'Wat kost een website?',
    sec8Subtitle:
      'Drie pakketten, met vooraf duidelijk wat erin zit. Alle prijzen zijn exclusief btw.',
    sec8ChoosePrefix: 'Kies',
    sec8ContractNote:
      'Elk pakket loopt minimaal 12 maanden en is daarna maandelijks opzegbaar. Uw domeinnaam staat op uw eigen naam.',
    sec9Badge: '• Werkwijze',
    sec9Title: 'Van kennismaking tot lancering. Duidelijk geregeld vooraf.',
    sec9Subtitle:
      'Vier overzichtelijke stappen waarmee u altijd weet wat er gebeurt, wat het kost en wanneer uw nieuwe website online staat.',
    sec9StepAriaPrefix: 'Voorstel aanvragen voor stap',
    sec9BannerText:
      'Benieuwd hoe dit er voor uw zaak uitziet? Vraag vrijblijvend een voorstel aan — antwoord binnen 1 werkdag.',
    sec9BannerCta: 'Start kennismaking',
    sec10Badge: '• Realisaties & Voorbeelden',
    sec10BrandLabel: '• Webstudio K',
    sec10RegionLabel: '• Heel België',
    sec11Badge: '• Cases',
    sec11Title: 'Websites die wij bouwden',
    sec12Badge: '• Vragen',
    sec12TitleLine1: 'Liever meteen',
    sec12TitleLine2: 'iets bespreken?',
    sec12Subtitle:
      'Vraag een vrijblijvend voorstel voor uw zaak. U weet vooraf precies waar u aan toe bent.',
    sec12Cta: 'Voorstel aanvragen',
    faqBadge: '• Veelgestelde vragen',
    faqTitle: 'Veelgestelde vragen',
    faqSubtitle:
      'Duidelijke antwoorden over onze aanpak, vaste prijzen en oplevering.',
    faqTablistAria: 'Filter vragen op onderwerp',
    faqTopics: [
      { key: 'all', label: 'Alle' },
      { key: 'approach', label: 'Aanpak' },
      { key: 'pricing', label: 'Prijzen' },
      { key: 'services', label: 'Diensten' },
      { key: 'practical', label: 'Praktisch' },
      { key: 'workflow', label: 'Werkwijze en kosten' },
    ],
    faqCardCta: 'Vraag een voorstel',
    faqBottomText:
      'Staat uw vraag er niet bij? Wij antwoorden persoonlijk, doorgaans binnen 1 werkdag.',
    faqBottomCta: 'Stel uw vraag rechtstreeks',
    contactBadge: '• Contact',
    contactTitle: 'Vraag uw voorstel aan.',
    contactSteps: [
      {
        title: 'Wij lezen uw aanvraag',
        subtitle: 'en antwoorden doorgaans binnen 1 werkdag.',
      },
      {
        title: 'Kort gesprek',
        subtitle: 'per e-mail, telefoon of online, over uw zaak.',
      },
      {
        title: 'Helder voorstel',
        subtitle: 'U krijgt een vaste prijs en planning vooraf.',
      },
    ],
    contactMailLabel: 'Mail',
    contactCallLabel: 'Bel',
    contactSentTitle: 'Bedankt, uw aanvraag is verstuurd.',
    contactSentBodyBeforeEmail:
      'Wij antwoorden doorgaans binnen 1 werkdag op het e-mailadres dat u opgaf',
    contactSentBodyBetween: 'Voor dringende vragen belt u',
    contactSendAnother: 'Nieuwe aanvraag sturen',
    contactNameLabel: 'Naam',
    contactNamePlaceholder: 'Uw naam',
    contactBusinessLabel: 'Uw zaak',
    contactBusinessPlaceholder: 'Naam van uw zaak of vereniging',
    contactEmailLabel: 'E-mailadres',
    contactEmailPlaceholder: 'naam@uwzaak.be',
    contactTopicLabel: 'Waarmee kunnen wij helpen?',
    contactMessageLabel: 'Uw vraag',
    contactMessagePlaceholder: 'Vertel kort iets over uw zaak of vraag...',
    contactPrivacyNote:
      'Wij gebruiken uw naam, e-mailadres en bericht alleen om uw vraag te beantwoorden.',
    contactSubmitButton: 'Verstuur mijn aanvraag',
    contactErrorEmail: 'Vul een geldig e-mailadres in.',
    contactErrorName: 'Vul uw naam in.',
    contactToastTitle: 'Aanvraag succesvol verzonden',
    contactToastDescription: (name, email) =>
      `Bedankt ${name}! Wij antwoorden binnen 1 werkdag op ${email}.`,
  },
  services: {
    heroBadge: '• Diensten & Prijzen',
    heroTitle: 'Alles bij één aanspreekpunt.',
    heroSubtitle:
      'Vier vakgebieden en drie pakketten, elk met duidelijke prijzen vooraf. Alle prijzen zijn exclusief btw.',
    chooseTrackLabel: 'Kies een vakgebied',
    fromPricePrefix: 'vanaf',
    trackLabel: 'Vakgebied',
    deliverablesLabel: 'Onderdelen',
    guidePriceLabel: 'Richtprijs excl. btw',
    requestProposalCta: 'Voorstel aanvragen',
    estimatorBadge: '• Prijsindicatie',
    estimatorTitle: 'Stel uw aanvraag samen',
    estimatorSubtitle:
      'Combineer pakketten of losse diensten (zoals Lokale SEO vanaf €149/mnd, SEO-audit vanaf €190 of een logo vanaf €190, excl. btw).',
    estimatorModules: [
      { id: 'start', label: 'Start Website (eenmalig)', price: 490, labelTime: '5 werkdagen' },
      { id: 'vakman', label: 'Vakman Website met boekingssysteem', price: 990, labelTime: '10 werkdagen' },
      { id: 'webshop', label: 'Webshop (tot 50 producten)', price: 1890, labelTime: '3–4 weken' },
      { id: 'seo', label: 'SEO-audit & Lokale zichtbaarheid', price: 190, labelTime: '1 week' },
      { id: 'logo', label: 'Logo & Visuele identiteit', price: 190, labelTime: '1 week' },
      { id: 'wcag', label: 'Webtoegankelijkheidscontrole WCAG 2.2 AA', price: 149, labelTime: '1 week' },
    ],
    estimatorSummaryLabel: 'Indicatie eenmalig totaal (excl. btw)',
    estimatorOneTimeFrom: 'Vanaf eenmalig',
    estimatorFirstStepLabel: 'Eerste stap',
    estimatorFirstStepValue: 'Voorstel',
    estimatorChosenLabel: 'Gekozen onderdelen',
    estimatorViewProcess: 'Bekijk werkwijze',
    estimatorSubjectPrefix: 'Prijsindicatie vanaf',
    packagesBadge: '• Pakketten',
    packagesTitle: 'Start, Vakman en Webshop',
    processBadge: '• Werkwijze',
    processTitle: 'Van kennismaking tot lancering. Duidelijk geregeld vooraf.',
    priceLocale: 'nl-BE',
  },
  about: {
    heroBadge: '• Voorbeeldontwerpen',
    heroTitle: 'Elke zaak een eigen gezicht.',
    heroSubtitle:
      'Negen voorbeeldontwerpen voor heel verschillende zaken, elk met een eigen kleur, letter en opbouw. Alle namen en gegevens zijn fictief.',
    heroImageAlt: 'Webstudio K — Kasterlee, werkt in heel België',
    heroImageLocation: 'Kemelbeekstraat 16, 2460 Kasterlee · werkt in heel België',
    heroStatsExamples: '9 Voorbeeldontwerpen',
    heroStatsSectors: '8+ Sectoren',
    heroStatsPrice: 'Vanaf €490 excl. btw',
    showcaseBadge: '• Negen voorbeeldontwerpen',
    showcaseTitle: 'Voor elke zaak een eigen website',
    showcaseSubtitle:
      'Elk ontwerp vertrekt van uw klanten, uw werk en de vraag die een bezoeker als eerste stelt.',
    fictionalBusinessLabel: 'Fictieve zaak',
    requestProposalArrow: 'Voorstel aanvragen →',
    sectorsBadge: '• Sectoren',
    sectorsTitle: 'Een paar sectoren uitgelicht',
    sectorFilterTabs: [
      { id: 'all', label: 'Alle uitgelicht' },
      { id: 'founder', label: 'Vakmensen & Horeca' },
      { id: 'member', label: 'Salons, Schilders & Tuin' },
    ],
    focusLabel: 'Focus:',
    allSectorsTitle: 'Alle sectoren waarvoor wij werken',
    sectorSubjectPrefix: 'Website voor sector:',
    principles: [
      {
        number: '01',
        title: 'Helder voorstel vooraf',
        body: 'U vertelt ons kort wat uw zaak doet. Wij bezorgen u binnen 1 werkdag een duidelijk voorstel met opbouw, planning en vaste prijs.',
      },
      {
        number: '02',
        title: 'Voor elk toestel ontworpen',
        body: 'Wij ontwerpen elke website eerst voor kleine schermen, met lichte beelden en lichte code, zodat uw site vlot laadt en prettig leest.',
      },
      {
        number: '03',
        title: 'Duidelijke prijzen vooraf',
        body: 'Drie vaste pakketten en heldere prijzen per losse dienst, telkens exclusief btw. Geen verrassingen achteraf.',
      },
      {
        number: '04',
        title: 'Eén vast aanspreekpunt',
        body: 'U hoeft zelf geen teksten of updates te beheren. U laat ons weten wat er moet veranderen, en wij passen het voor u aan.',
      },
    ],
    bottomCtaTitle: 'Uw zaak er niet bij? Vraag een vrijblijvend voorstel aan.',
    bottomCtaPrimary: 'Voorstel aanvragen',
    bottomCtaSecondary: 'Bekijk diensten & prijzen',
  },
  vision: {
    heroBadge: '• Webstudio K · Werkwijze & Uitleg',
    heroTitle: 'Van kennismaking tot lancering. Duidelijk geregeld vooraf.',
    heroSubtitle:
      'Webstudio K maakt websites voor elke ondernemer, vereniging en zelfstandige in heel België. Kennismaking en overleg verlopen per e-mail, telefonisch of online.',
    theses: [
      {
        num: 'I.',
        heading: 'Duidelijk vanaf dag één.',
        copy: 'Een AI-tool kan een schets maken, maar geen afgewerkte website van uw eigen zaak met duidelijke prijzen en een aanspreekpunt na lancering.',
      },
      {
        num: 'II.',
        heading: 'U hoeft zelf niets te doen.',
        copy: 'U laat ons weten wat er moet veranderen, en wij passen het voor u aan. Bij Start zitten 15 minuten per maand in de prijs, bij Vakman en Webshop 30 minuten.',
      },
      {
        num: 'III.',
        heading: 'Uw domeinnaam blijft van u.',
        copy: 'Uw .be-domein staat altijd op uw eigen naam. Elk pakket loopt minimaal 12 maanden en is daarna maandelijks opzegbaar.',
      },
    ],
    explorerBadge: '• Van kennismaking tot lancering',
    explorerTitle: 'Hoe wij uw website bouwen',
    explorerSubtitle:
      'Vier heldere beloftes waarmee u zonder risico ziet hoe uw nieuwe website eruitziet.',
    pillars: [
      {
        id: 'voorstel-vooraf',
        index: '01',
        title: 'Helder voorstel vooraf',
        horizon: 'Stap 1 & 2',
        thesis:
          'Na een korte kennismaking ontvangt u binnen 1 werkdag een concreet voorstel met structuur, doorlooptijd en vaste prijs. Zo weet u precies waar u aan toe bent.',
        metric: 'Antwoord doorgaans binnen 1 werkdag',
      },
      {
        id: 'mobile-first',
        index: '02',
        title: 'Ontworpen voor elk scherm',
        horizon: 'Stap 3',
        thesis:
          'Wij ontwerpen elke website eerst voor kleine schermen, met lichte beelden en lichte code, zodat uw site vlot laadt en prettig leest op smartphone en computer.',
        metric: 'Start binnen 5 werkdagen online · Vakman binnen 10 werkdagen',
      },
      {
        id: 'vindbaarheid',
        index: '03',
        title: 'Google, Maps & AI-zoekmachines',
        horizon: 'SEO & Zichtbaarheid',
        thesis:
          'Elke website krijgt duidelijke titels en beschrijvingen, correcte lokale gegevens en een degelijke technische basis zodat uw zaak goed gevonden wordt.',
        metric: 'Lokale SEO & Google Bedrijfsprofiel',
      },
      {
        id: 'toegankelijk',
        index: '04',
        title: 'Webtoegankelijkheid (WCAG 2.2 AA)',
        horizon: 'Duurzaam',
        thesis:
          'Wij zorgen voor voldoende contrast, bediening met het toetsenbord, duidelijke formulieren en beschrijvingen bij beelden, getoetst aan WCAG 2.2 AA.',
        metric: 'Toegankelijk vanaf het ontwerp',
      },
    ],
    partLabel: 'Onderdeel',
    includedLabel: 'Standaard inbegrepen',
    requestProposalCta: 'Voorstel aanvragen',
    paletteBadge: '• Kleurenpalet',
    paletteTitle: 'Het Webstudio K Kleurensysteem',
    paletteCta: 'Bekijk diensten & prijzen',
    paletteSwatches: [
      { name: 'Vlamoranje', hex: '#FB4D27', bg: 'bg-[#FB4D27]', text: 'text-white' },
      { name: 'Zacht Lichtgrijs', hex: '#D3D6DA', bg: 'bg-[#D3D6DA]', text: 'text-[#121214]' },
      { name: 'Neutraal Grijs', hex: '#929090', bg: 'bg-[#929090]', text: 'text-[#121214]' },
      { name: 'Lichtgrijs', hex: '#F2F2F2', bg: 'bg-[#F2F2F2] border border-[#D3D6DA]', text: 'text-[#121214]' },
      { name: 'Donker Warmgrijs', hex: '#4C433F', bg: 'bg-[#4C433F]', text: 'text-white' },
    ],
  },
};

const FR: Translations = {
  common: {
    defaultPresetSubject: 'Devis sans engagement pour mon site web',
    floatingContactCta: 'Contactez-nous',
    dismissToastAria: 'Fermer la notification',
    perMonthShort: 'mois',
    exclVat: 'HTVA',
    fromWord: 'à partir de',
    oneTimeWord: 'unique',
    perMonthFull: 'par mois HTVA',
  },
  header: {
    navAria: 'Menu principal',
    navPages: [
      { label: 'Accueil', route: 'Home' },
      { label: 'Services', route: 'Services' },
      { label: 'Exemples', route: 'About' },
      { label: 'Méthode', route: 'Vision' },
    ],
    belgiumRegion: 'Toute la Belgique',
    menuLabel: 'MENU',
    closeMenuAria: 'Fermer le menu',
    requestProposal: 'Demander un devis',
    timeInBelgium: 'Heure en Belgique',
    languageGroupLabel: 'Choix de langue',
    languageLabelDrawer: 'Langue',
    languageNames: {
      nl: 'Nederlands',
      fr: 'Français',
      en: 'English',
    },
    clockLocale: 'fr-BE',
    fallbackClock: 'Kasterlee, BE · CET',
  },
  footer: {
    summary:
      'Sites web, visibilité et identité visuelle pour entrepreneurs, associations et indépendants dans toute la Belgique.',
    cta: 'Demander un devis',
    pagesHeading: 'Pages',
    pages: [
      { route: 'Home', label: 'Accueil' },
      { route: 'Services', label: 'Services & Tarifs' },
      { route: 'About', label: 'Exemples de sites' },
      { route: 'Vision', label: 'Méthode & Approche' },
    ],
    servicesHeading: 'Services',
    serviceLinks: [
      'Développement web',
      'Création de boutique en ligne',
      'Refonte de site web',
      'SEO & visibilité locale',
      'Identité visuelle',
      'Accessibilité web',
    ],
    contactHeading: 'Contact',
    addressLine2: '2460 Kasterlee, actif dans toute la Belgique',
    enterpriseNumber: 'N° d’entreprise BE 0897.577.919',
    backToTop: 'Haut de page',
  },
  chat: {
    brandLine: 'Webstudio K · Réponse habituelle sous 1 jour ouvrable',
    title: 'Demandez votre devis',
    closeAria: 'Fermer la fenêtre',
    sentTitle: 'Merci, votre demande a été envoyée.',
    sentBodyBeforeEmail: 'Nous répondons généralement sous 1 jour ouvrable à',
    sentBodyBetweenEmailPhone: 'Pour toute urgence, appelez le',
    backToSite: 'Retour au site',
    namePlaceholder: 'Nom',
    businessPlaceholder: 'Votre entreprise',
    emailPlaceholder: 'Adresse e-mail',
    scopeLabel: 'Comment pouvons-nous vous aider ?',
    scopeOptions: [
      'Devis sans engagement pour mon site web',
      'Nouveau site web ou e-shop',
      'SEO et visibilité',
      'Logo et identité visuelle',
      'Accessibilité web',
      'Autre demande',
    ],
    messagePlaceholder: 'Votre question...',
    privacyNote:
      'Nous utilisons votre nom, e-mail et message uniquement pour répondre à votre demande.',
    errorInvalidEmail: 'Veuillez saisir une adresse e-mail valide.',
    errorShortMessage: 'Précisez brièvement votre activité ou question.',
    submitButton: 'Envoyer ma demande',
    toastTitle: 'Demande de devis envoyée',
    toastDescription: (name, email) =>
      `Merci${name ? ` ${name}` : ''} ! Nous répondons sous 1 jour ouvrable à ${email}.`,
  },
  home: {
    heroPortraitAlt: 'Portrait silhouette Webstudio K avec visière orange',
    heroEyebrow: '| Pour chaque entreprise, association et indépendant',
    heroLine1: 'Créer votre site',
    heroLine2Start: 'web, ',
    heroLine2Accent: 'sur mesure',
    heroLine3Start: 'pour ',
    heroLine3Accent: 'votre activité',
    heroSubtitle:
      'Un site clair pour votre entreprise, association ou activité d’indépendant — vite en ligne et à un prix fixe convenu à l’avance.',
    heroStarsAria: 'Prix fixe convenu à l’avance',
    heroTrustStrip: 'Tarifs dès €490 HTVA · Un interlocuteur unique',
    heroPrimaryCta: 'Devis sans engagement',
    heroSecondaryCta: 'Voir les exemples',
    showcaseMenuAria: 'Voir la méthode',
    showcasePrevAria: 'Diapositive précédente',
    showcaseNextAria: 'Diapositive suivante',
    sectorsStripTitle: 'Un site propre à chaque métier',
    barPrice: 'Tarifs dès €490 HTVA',
    barProposal: 'Devis sans engagement sous 1 jour ouvrable',
    barScroll: 'Voir le contenu',
    sec2Badge: '• Pour chaque activité',
    sec2GlobeLine1: 'Chaque design part de vos clients, de votre métier',
    sec2GlobeLine2: 'et de la première question que se pose un visiteur.',
    sec2HeadingMain: 'Nous concevons un site clair et structuré sur mesure.',
    sec2HeadingMuted:
      'Avec des tarifs transparents dès le départ, un suivi humain et un interlocuteur unique.',
    sec2ReplyNote: 'Réponse habituelle sous 1 jour ouvrable',
    sec2MailAria: 'Envoyer un e-mail à info@webstudiok.be',
    sec2CallAria: 'Appeler le +32 14 71 80 80',
    sec2ExamplesAria: 'Voir tous les exemples de design',
    sec2AllExamplesCta: 'Tous les exemples',
    capsule1: 'Rapide',
    capsule2: 'Clair',
    capsule3Aria: 'Voir les exemples de sites',
    capsule4: 'Sur mesure',
    sec3Badge: '• Exemples',
    sec3Title: 'À chaque entreprise son propre visage.',
    sec3Subtitle:
      'Neuf maquettes complètes pour des activités très différentes, chacune avec ses couleurs, sa typographie et sa structure. Tous les noms et données sont fictifs.',
    sec3SelectAriaPrefix: 'Sélectionner',
    sec3NextAria: 'Exemple suivant',
    sec3ProposalForCase: 'Devis pour votre activité',
    sec3NotListedTitle: 'Votre secteur n’y figure pas ?',
    sec3NotListedBody:
      'Nous créons un site sur mesure pour toute entreprise, association ou indépendant. Demandez un devis sans engagement.',
    sec3CustomProposalCta: 'Devis sans engagement',
    sec4Badge: '• Aperçu',
    sec4TitleLine1: 'Quelques secteurs',
    sec4TitleLine2: 'mis en avant.',
    sec4MoreSectorsNum: '8+',
    sec4MoreSectorsLabel: 'Secteurs',
    sec4FooterLeft: '• Nous travaillons pour toute entreprise',
    sec4FooterMid: '• Découvrez l’approche par secteur',
    sec4FooterRight: '• tous les exemples',
    sec5Badge: '• Avant et après',
    sec5Title: 'D’une simple fiche Google vers votre propre site web.',
    sec5Cta: 'Demander un devis',
    sec5NoteLine1: 'Dakwerken Hoogland est une entreprise fictive créée comme',
    sec5NoteLine2: 'exemple de conception. Le résultat de recherche est simulé.',
    sec5StatButtonPrefix: 'Afficher',
    sec6TopNote1: 'Quatre expertises, chacune avec des prix clairs.',
    sec6TopNote2: 'Tous les prix sont hors TVA.',
    sec6Badge: '• Services',
    sec6TitleLine1: 'Tout auprès d’un',
    sec6TitleLine2: 'seul interlocuteur.',
    sec6Subtitle:
      'Quatre expertises, chacune avec des tarifs clairs. Tous les prix s’entendent hors TVA.',
    sec6Cta: 'Voir la grille tarifaire complète',
    sec6VatNote: 'Tous les prix s’entendent hors TVA.',
    sec7Badge: '• Zone d’action',
    sec7Title: 'Actif dans toute la Belgique',
    sec7Cta: 'Demander un devis',
    sec8Badge: '• Forfaits',
    sec8Title: 'Combien coûte un site web ?',
    sec8Subtitle:
      'Trois formules transparentes avec tout ce qu’elles incluent à l’avance. Tous les prix sont HTVA.',
    sec8ChoosePrefix: 'Choisir',
    sec8ContractNote:
      'Chaque forfait a une durée minimale de 12 mois puis est résiliable chaque mois. Votre nom de domaine reste à votre nom.',
    sec9Badge: '• Méthode',
    sec9Title: 'De la prise de contact au lancement. Tout est défini à l’avance.',
    sec9Subtitle:
      'Quatre étapes simples pour savoir à tout moment ce qui est fait, ce que cela coûte et quand votre site sera en ligne.',
    sec9StepAriaPrefix: 'Demander un devis pour l’étape',
    sec9BannerText:
      'Envie de voir ce que cela donne pour votre entreprise ? Demandez un devis sans engagement — réponse sous 1 jour ouvrable.',
    sec9BannerCta: 'Démarrer le contact',
    sec10Badge: '• Réalisations & Exemples',
    sec10BrandLabel: '• Webstudio K',
    sec10RegionLabel: '• Toute la Belgique',
    sec11Badge: '• Projets réels',
    sec11Title: 'Des sites que nous avons construits',
    sec12Badge: '• Questions',
    sec12TitleLine1: 'Envie d’en parler',
    sec12TitleLine2: 'directement ?',
    sec12Subtitle:
      'Demandez un devis sans engagement pour votre activité. Vous savez exactement où vous allez dès le départ.',
    sec12Cta: 'Demander un devis',
    faqBadge: '• Questions fréquentes',
    faqTitle: 'Questions fréquentes',
    faqSubtitle:
      'Des réponses claires sur notre approche, nos prix fixes et les délais de mise en ligne.',
    faqTablistAria: 'Filtrer les questions par thème',
    faqTopics: [
      { key: 'all', label: 'Toutes' },
      { key: 'approach', label: 'Approche' },
      { key: 'pricing', label: 'Tarifs' },
      { key: 'services', label: 'Services' },
      { key: 'practical', label: 'Pratique' },
      { key: 'workflow', label: 'Méthode et coûts' },
    ],
    faqCardCta: 'Demander un devis',
    faqBottomText:
      'Votre question ne s’y trouve pas ? Nous répondons personnellement sous 1 jour ouvrable.',
    faqBottomCta: 'Poser votre question directement',
    contactBadge: '• Contact',
    contactTitle: 'Demandez votre devis.',
    contactSteps: [
      {
        title: 'Nous lisons votre demande',
        subtitle: 'et répondons généralement sous 1 jour ouvrable.',
      },
      {
        title: 'Bref échange',
        subtitle: 'par e-mail, téléphone ou visio à propos de votre activité.',
      },
      {
        title: 'Devis clair',
        subtitle: 'Vous recevez un prix fixe et un planning précis à l’avance.',
      },
    ],
    contactMailLabel: 'E-mail',
    contactCallLabel: 'Téléphone',
    contactSentTitle: 'Merci, votre demande a été envoyée.',
    contactSentBodyBeforeEmail:
      'Nous répondons généralement sous 1 jour ouvrable à l’adresse indiquée',
    contactSentBodyBetween: 'Pour toute demande urgente, appelez le',
    contactSendAnother: 'Envoyer une autre demande',
    contactNameLabel: 'Nom',
    contactNamePlaceholder: 'Votre nom',
    contactBusinessLabel: 'Votre activité',
    contactBusinessPlaceholder: 'Nom de votre entreprise ou association',
    contactEmailLabel: 'Adresse e-mail',
    contactEmailPlaceholder: 'nom@votreentreprise.be',
    contactTopicLabel: 'Comment pouvons-nous vous aider ?',
    contactMessageLabel: 'Votre question',
    contactMessagePlaceholder: 'Décrivez brièvement votre activité ou votre besoin...',
    contactPrivacyNote:
      'Nous utilisons votre nom, adresse e-mail et message uniquement pour vous répondre.',
    contactSubmitButton: 'Envoyer ma demande',
    contactErrorEmail: 'Veuillez saisir une adresse e-mail valide.',
    contactErrorName: 'Veuillez indiquer votre nom.',
    contactToastTitle: 'Demande envoyée avec succès',
    contactToastDescription: (name, email) =>
      `Merci ${name} ! Nous répondons sous 1 jour ouvrable à ${email}.`,
  },
  services: {
    heroBadge: '• Services & Tarifs',
    heroTitle: 'Tout auprès d’un interlocuteur unique.',
    heroSubtitle:
      'Quatre domaines d’expertise et trois forfaits, avec des prix fixés à l’avance. Tous les prix sont hors TVA.',
    chooseTrackLabel: 'Choisissez un domaine',
    fromPricePrefix: 'dès',
    trackLabel: 'Domaine',
    deliverablesLabel: 'Inclus dans l’offre',
    guidePriceLabel: 'Tarif indicatif HTVA',
    requestProposalCta: 'Demander un devis',
    estimatorBadge: '• Estimation rapide',
    estimatorTitle: 'Composez votre demande',
    estimatorSubtitle:
      'Combinez nos forfaits ou services à la carte (comme le SEO local dès €149/mois, un audit SEO dès €190 ou un logo dès €190, HTVA).',
    estimatorModules: [
      { id: 'start', label: 'Site Web Start (paiement unique)', price: 490, labelTime: '5 jours ouvrables' },
      { id: 'vakman', label: 'Site Artisan avec prise de rendez-vous', price: 990, labelTime: '10 jours ouvrables' },
      { id: 'webshop', label: 'Boutique en ligne (jusqu’à 50 produits)', price: 1890, labelTime: '3–4 semaines' },
      { id: 'seo', label: 'Audit SEO & Visibilité locale', price: 190, labelTime: '1 semaine' },
      { id: 'logo', label: 'Logo & Identité visuelle', price: 190, labelTime: '1 semaine' },
      { id: 'wcag', label: 'Audit d’accessibilité web WCAG 2.2 AA', price: 149, labelTime: '1 semaine' },
    ],
    estimatorSummaryLabel: 'Total unique estimé (HTVA)',
    estimatorOneTimeFrom: 'À partir de',
    estimatorFirstStepLabel: 'Première étape',
    estimatorFirstStepValue: 'Devis',
    estimatorChosenLabel: 'Modules sélectionnés',
    estimatorViewProcess: 'Voir la méthode',
    estimatorSubjectPrefix: 'Estimation à partir de',
    packagesBadge: '• Forfaits',
    packagesTitle: 'Start, Artisan et Boutique',
    processBadge: '• Méthode',
    processTitle: 'De la prise de contact au lancement. Tout est clair à l’avance.',
    priceLocale: 'fr-BE',
  },
  about: {
    heroBadge: '• Exemples de sites',
    heroTitle: 'À chaque entreprise son propre visage.',
    heroSubtitle:
      'Neuf maquettes complètes pour des métiers variés, chacune dotée de ses couleurs, typographies et mises en page. Tous les noms sont fictifs.',
    heroImageAlt: 'Webstudio K — Kasterlee, actif dans toute la Belgique',
    heroImageLocation: 'Kemelbeekstraat 16, 2460 Kasterlee · actif dans toute la Belgique',
    heroStatsExamples: '9 Exemples de sites',
    heroStatsSectors: '8+ Secteurs',
    heroStatsPrice: 'Dès €490 HTVA',
    showcaseBadge: '• Neuf exemples de conception',
    showcaseTitle: 'Un site sur mesure pour chaque métier',
    showcaseSubtitle:
      'Chaque maquette part de vos clients, de votre savoir-faire et de la première question du visiteur.',
    fictionalBusinessLabel: 'Entreprise fictive',
    requestProposalArrow: 'Demander un devis →',
    sectorsBadge: '• Secteurs',
    sectorsTitle: 'Quelques secteurs mis en avant',
    sectorFilterTabs: [
      { id: 'all', label: 'Tous' },
      { id: 'founder', label: 'Artisans & Horeca' },
      { id: 'member', label: 'Salons, Peintres & Jardins' },
    ],
    focusLabel: 'Priorité :',
    allSectorsTitle: 'Tous les secteurs que nous accompagnons',
    sectorSubjectPrefix: 'Site web pour le secteur :',
    principles: [
      {
        number: '01',
        title: 'Devis clair dès le départ',
        body: 'Vous décrivez brièvement votre activité. Sous 1 jour ouvrable, vous recevez une proposition complète avec structure, planning et prix fixe.',
      },
      {
        number: '02',
        title: 'Pensé pour chaque écran',
        body: 'Chaque site est d’abord conçu pour smartphone avec des images légères et un code rapide, afin d’offrir une lecture fluide partout.',
      },
      {
        number: '03',
        title: 'Tarifs connus d’avance',
        body: 'Trois formules fixes et des options à la carte transparentes, toujours hors TVA. Aucune mauvaise surprise après coup.',
      },
      {
        number: '04',
        title: 'Un interlocuteur unique',
        body: 'Vous n’avez rien à gérer techniquement. Envoyez-nous vos modifications et nous les mettons en ligne pour vous.',
      },
    ],
    bottomCtaTitle: 'Votre activité n’est pas listée ? Demandez un devis sans engagement.',
    bottomCtaPrimary: 'Demander un devis',
    bottomCtaSecondary: 'Voir services & tarifs',
  },
  vision: {
    heroBadge: '• Webstudio K · Méthode & Vision',
    heroTitle: 'De la prise de contact au lancement. Tout est défini à l’avance.',
    heroSubtitle:
      'Webstudio K réalise des sites web pour chaque entrepreneur, association et indépendant en Belgique. Les échanges se font par e-mail, téléphone ou en ligne.',
    theses: [
      {
        num: 'I.',
        heading: 'Clair dès le premier jour.',
        copy: 'Un outil d’IA peut générer une ébauche, mais pas un site fini adapté à votre entreprise avec des tarifs clairs et un vrai interlocuteur après la mise en ligne.',
      },
      {
        num: 'II.',
        heading: 'Vous n’avez rien à faire vous-même.',
        copy: 'Dites-nous ce qui doit changer et nous l’appliquons pour vous. 15 minutes de modifications par mois sont incluses dans Start, 30 minutes dans Artisan et Boutique.',
      },
      {
        num: 'III.',
        heading: 'Votre nom de domaine reste le vôtre.',
        copy: 'Votre domaine .be est toujours enregistré à votre nom. Chaque formule court sur 12 mois minimum, puis est résiliable chaque mois.',
      },
    ],
    explorerBadge: '• De la rencontre à la mise en ligne',
    explorerTitle: 'Comment nous construisons votre site',
    explorerSubtitle:
      'Quatre engagements concrets pour avancer en toute confiance vers votre nouveau site web.',
    pillars: [
      {
        id: 'voorstel-vooraf',
        index: '01',
        title: 'Devis clair avant démarrage',
        horizon: 'Étapes 1 & 2',
        thesis:
          'Après un bref échange, vous recevez sous 1 jour ouvrable un devis détaillé avec arborescence, planning et prix fixe. Vous savez exactement à quoi vous attendre.',
        metric: 'Réponse habituelle sous 1 jour ouvrable',
      },
      {
        id: 'mobile-first',
        index: '02',
        title: 'Conçu pour chaque appareil',
        horizon: 'Étape 3',
        thesis:
          'Nous concevons chaque site d’abord pour les petits écrans avec des images optimisées et un code léger, pour un chargement rapide sur mobile et ordinateur.',
        metric: 'Start en ligne en 5 jours ouvrables · Artisan en 10 jours ouvrables',
      },
      {
        id: 'vindbaarheid',
        index: '03',
        title: 'Google, Maps & moteurs IA',
        horizon: 'SEO & Visibilité',
        thesis:
          'Chaque site dispose de titres et descriptions soignés, de coordonnées locales cohérentes et d’une base technique saine pour être bien trouvé.',
        metric: 'SEO local & fiche d’établissement Google',
      },
      {
        id: 'toegankelijk',
        index: '04',
        title: 'Accessibilité web (WCAG 2.2 AA)',
        horizon: 'Durable',
        thesis:
          'Nous assurons un contraste suffisant, une navigation complète au clavier, des formulaires clairs et des alternatives textuelles conformes WCAG 2.2 AA.',
        metric: 'Accessible dès la conception',
      },
    ],
    partLabel: 'Pilier',
    includedLabel: 'Inclus d’office',
    requestProposalCta: 'Demander un devis',
    paletteBadge: '• Palette de couleurs',
    paletteTitle: 'Le système chromatique Webstudio K',
    paletteCta: 'Voir services & tarifs',
    paletteSwatches: [
      { name: 'Orange Flamme', hex: '#FB4D27', bg: 'bg-[#FB4D27]', text: 'text-white' },
      { name: 'Gris Clair Doux', hex: '#D3D6DA', bg: 'bg-[#D3D6DA]', text: 'text-[#121214]' },
      { name: 'Gris Neutre', hex: '#929090', bg: 'bg-[#929090]', text: 'text-[#121214]' },
      { name: 'Gris Perle', hex: '#F2F2F2', bg: 'bg-[#F2F2F2] border border-[#D3D6DA]', text: 'text-[#121214]' },
      { name: 'Taupe Profond', hex: '#4C433F', bg: 'bg-[#4C433F]', text: 'text-white' },
    ],
  },
};

const EN: Translations = {
  common: {
    defaultPresetSubject: 'No-obligation website proposal',
    floatingContactCta: 'Contact us',
    dismissToastAria: 'Close notification',
    perMonthShort: 'mo',
    exclVat: 'excl. VAT',
    fromWord: 'from',
    oneTimeWord: 'one-time',
    perMonthFull: 'per month excl. VAT',
  },
  header: {
    navAria: 'Main navigation',
    navPages: [
      { label: 'Home', route: 'Home' },
      { label: 'Services', route: 'Services' },
      { label: 'Examples', route: 'About' },
      { label: 'Approach', route: 'Vision' },
    ],
    belgiumRegion: 'All of Belgium',
    menuLabel: 'MENU',
    closeMenuAria: 'Close menu',
    requestProposal: 'Request a proposal',
    timeInBelgium: 'Time in Belgium',
    languageGroupLabel: 'Language selector',
    languageLabelDrawer: 'Language',
    languageNames: {
      nl: 'Nederlands',
      fr: 'Français',
      en: 'English',
    },
    clockLocale: 'en-GB',
    fallbackClock: 'Kasterlee, BE · CET',
  },
  footer: {
    summary:
      'Websites, local search visibility and visual identity for businesses, associations and sole traders across Belgium.',
    cta: 'Request a proposal',
    pagesHeading: 'Pages',
    pages: [
      { route: 'Home', label: 'Home' },
      { route: 'Services', label: 'Services & Pricing' },
      { route: 'About', label: 'Design Examples' },
      { route: 'Vision', label: 'Approach & Guide' },
    ],
    servicesHeading: 'Services',
    serviceLinks: [
      'Web development',
      'Online shop design',
      'Website redesign',
      'SEO & visibility',
      'Visual identity',
      'Web accessibility',
    ],
    contactHeading: 'Contact',
    addressLine2: '2460 Kasterlee, serving all of Belgium',
    enterpriseNumber: 'Enterprise No. BE 0897.577.919',
    backToTop: 'Back to top',
  },
  chat: {
    brandLine: 'Webstudio K · Reply usually within 1 business day',
    title: 'Request your proposal',
    closeAria: 'Close dialog',
    sentTitle: 'Thank you, your request has been sent.',
    sentBodyBeforeEmail: 'We usually reply within 1 business day at',
    sentBodyBetweenEmailPhone: 'For urgent questions, please call',
    backToSite: 'Back to the site',
    namePlaceholder: 'Name',
    businessPlaceholder: 'Your business',
    emailPlaceholder: 'Email address',
    scopeLabel: 'How can we help you?',
    scopeOptions: [
      'No-obligation website proposal',
      'New website or webshop',
      'SEO and visibility',
      'Logo and visual identity',
      'Web accessibility',
      'Something else',
    ],
    messagePlaceholder: 'Your question...',
    privacyNote:
      'We only use your name, email address and message to answer your inquiry.',
    errorInvalidEmail: 'Please enter a valid email address.',
    errorShortMessage: 'Briefly tell us about your business or question.',
    submitButton: 'Send my request',
    toastTitle: 'Proposal requested',
    toastDescription: (name, email) =>
      `Thank you${name ? ` ${name}` : ''}! We will reply within 1 business day to ${email}.`,
  },
  home: {
    heroPortraitAlt: 'Webstudio K silhouette portrait with orange visor',
    heroEyebrow: '| For every business, association and freelancer',
    heroLine1: 'Custom website',
    heroLine2Start: 'built, ',
    heroLine2Accent: 'tailored',
    heroLine3Start: 'to ',
    heroLine3Accent: 'your business',
    heroSubtitle:
      'A clear website for your business, association or independent practice — launched quickly at a fixed upfront price.',
    heroStarsAria: 'Fixed upfront pricing',
    heroTrustStrip: 'Starting from €490 excl. VAT · Single point of contact',
    heroPrimaryCta: 'Free proposal',
    heroSecondaryCta: 'View examples',
    showcaseMenuAria: 'View approach',
    showcasePrevAria: 'Previous slide',
    showcaseNextAria: 'Next slide',
    sectorsStripTitle: 'A dedicated website for every trade',
    barPrice: 'Prices from €490 excl. VAT',
    barProposal: 'Free proposal within 1 business day',
    barScroll: 'Explore content',
    sec2Badge: '• For every business',
    sec2GlobeLine1: 'Every design starts from your customers, your craft',
    sec2GlobeLine2: 'and the very first question a visitor asks.',
    sec2HeadingMain: 'We build a well-structured website tailored to your business.',
    sec2HeadingMuted:
      'With transparent pricing upfront, personal follow-up and one dedicated contact.',
    sec2ReplyNote: 'Reply usually within 1 business day',
    sec2MailAria: 'Email info@webstudiok.be',
    sec2CallAria: 'Call +32 14 71 80 80',
    sec2ExamplesAria: 'Browse all design examples',
    sec2AllExamplesCta: 'All design examples',
    capsule1: 'Fast',
    capsule2: 'Clear',
    capsule3Aria: 'View design examples',
    capsule4: 'Tailored',
    sec3Badge: '• Design Examples',
    sec3Title: 'A distinct look for every trade.',
    sec3Subtitle:
      'Nine example designs for very different businesses, each with its own palette, typography and layout. All names and details are fictional.',
    sec3SelectAriaPrefix: 'Select',
    sec3NextAria: 'Next design example',
    sec3ProposalForCase: 'Proposal for your business',
    sec3NotListedTitle: 'Don’t see your trade?',
    sec3NotListedBody:
      'We craft a bespoke design for every business, association or sole trader. Ask for a free, no-obligation proposal.',
    sec3CustomProposalCta: 'Free proposal',
    sec4Badge: '• Featured',
    sec4TitleLine1: 'A few sectors',
    sec4TitleLine2: 'highlighted.',
    sec4MoreSectorsNum: '8+',
    sec4MoreSectorsLabel: 'Sectors',
    sec4FooterLeft: '• Built for every business',
    sec4FooterMid: '• Explore sector-specific details',
    sec4FooterRight: '• all examples',
    sec5Badge: '• Before & After',
    sec5Title: 'From a plain Google listing to your own website.',
    sec5Cta: 'Request a proposal',
    sec5NoteLine1: 'Dakwerken Hoogland is a fictional business created as a',
    sec5NoteLine2: 'design example. The search listing is simulated.',
    sec5StatButtonPrefix: 'Show',
    sec6TopNote1: 'Four disciplines, each with transparent pricing.',
    sec6TopNote2: 'All prices are exclusive of VAT.',
    sec6Badge: '• Services',
    sec6TitleLine1: 'Everything with one',
    sec6TitleLine2: 'point of contact.',
    sec6Subtitle:
      'Four disciplines, each with transparent pricing. All prices exclude VAT.',
    sec6Cta: 'View the full price list',
    sec6VatNote: 'All prices exclude VAT.',
    sec7Badge: '• Service Area',
    sec7Title: 'Serving all of Belgium',
    sec7Cta: 'Request a proposal',
    sec8Badge: '• Packages',
    sec8Title: 'What does a website cost?',
    sec8Subtitle:
      'Three packages with everything clearly included upfront. All prices exclude VAT.',
    sec8ChoosePrefix: 'Choose',
    sec8ContractNote:
      'Each package has a 12-month minimum term and is cancellable monthly thereafter. Your domain name remains registered in your name.',
    sec9Badge: '• Process',
    sec9Title: 'From first call to launch. Clearly settled upfront.',
    sec9Subtitle:
      'Four straightforward steps so you always know what happens next, what it costs and when your website goes live.',
    sec9StepAriaPrefix: 'Request proposal for step',
    sec9BannerText:
      'Curious how this looks for your business? Request a free proposal — reply within 1 business day.',
    sec9BannerCta: 'Start conversation',
    sec10Badge: '• Live Sites & Examples',
    sec10BrandLabel: '• Webstudio K',
    sec10RegionLabel: '• All of Belgium',
    sec11Badge: '• Client Work',
    sec11Title: 'Websites we have built',
    sec12Badge: '• Questions',
    sec12TitleLine1: 'Prefer to discuss',
    sec12TitleLine2: 'right away?',
    sec12Subtitle:
      'Ask for a no-obligation proposal tailored to your business. You know the exact scope and price upfront.',
    sec12Cta: 'Request a proposal',
    faqBadge: '• FAQ',
    faqTitle: 'Frequently asked questions',
    faqSubtitle:
      'Clear answers about our approach, fixed pricing and delivery times.',
    faqTablistAria: 'Filter questions by topic',
    faqTopics: [
      { key: 'all', label: 'All' },
      { key: 'approach', label: 'Approach' },
      { key: 'pricing', label: 'Pricing' },
      { key: 'services', label: 'Services' },
      { key: 'practical', label: 'Practical' },
      { key: 'workflow', label: 'Workflow & costs' },
    ],
    faqCardCta: 'Request a proposal',
    faqBottomText:
      'Question not listed here? We respond personally, usually within 1 business day.',
    faqBottomCta: 'Ask your question directly',
    contactBadge: '• Contact',
    contactTitle: 'Request your proposal.',
    contactSteps: [
      {
        title: 'We review your request',
        subtitle: 'and usually reply within 1 business day.',
      },
      {
        title: 'Brief chat',
        subtitle: 'by email, phone or online about your business.',
      },
      {
        title: 'Clear proposal',
        subtitle: 'You receive a fixed price and timeline upfront.',
      },
    ],
    contactMailLabel: 'Email',
    contactCallLabel: 'Call',
    contactSentTitle: 'Thank you, your request has been sent.',
    contactSentBodyBeforeEmail:
      'We usually reply within 1 business day to the email address you provided',
    contactSentBodyBetween: 'For urgent matters please call',
    contactSendAnother: 'Send another request',
    contactNameLabel: 'Name',
    contactNamePlaceholder: 'Your name',
    contactBusinessLabel: 'Your business',
    contactBusinessPlaceholder: 'Name of your company or association',
    contactEmailLabel: 'Email address',
    contactEmailPlaceholder: 'name@yourbusiness.be',
    contactTopicLabel: 'How can we help?',
    contactMessageLabel: 'Your question',
    contactMessagePlaceholder: 'Tell us briefly about your business or request...',
    contactPrivacyNote:
      'We only use your name, email address and message to answer your request.',
    contactSubmitButton: 'Send my request',
    contactErrorEmail: 'Please enter a valid email address.',
    contactErrorName: 'Please enter your name.',
    contactToastTitle: 'Request sent successfully',
    contactToastDescription: (name, email) =>
      `Thank you ${name}! We will reply within 1 business day to ${email}.`,
  },
  services: {
    heroBadge: '• Services & Pricing',
    heroTitle: 'Everything with one point of contact.',
    heroSubtitle:
      'Four disciplines and three packages, each with clear pricing upfront. All prices exclude VAT.',
    chooseTrackLabel: 'Select a service area',
    fromPricePrefix: 'from',
    trackLabel: 'Service',
    deliverablesLabel: 'Included deliverables',
    guidePriceLabel: 'Starting price excl. VAT',
    requestProposalCta: 'Request a proposal',
    estimatorBadge: '• Price Estimate',
    estimatorTitle: 'Build your estimate',
    estimatorSubtitle:
      'Combine packages or standalone services (such as Local SEO from €149/mo, an SEO audit from €190 or a logo from €190, excl. VAT).',
    estimatorModules: [
      { id: 'start', label: 'Start Website (one-time)', price: 490, labelTime: '5 business days' },
      { id: 'vakman', label: 'Craftsman Website with booking system', price: 990, labelTime: '10 business days' },
      { id: 'webshop', label: 'Webshop (up to 50 products)', price: 1890, labelTime: '3–4 weeks' },
      { id: 'seo', label: 'SEO Audit & Local Visibility', price: 190, labelTime: '1 week' },
      { id: 'logo', label: 'Logo & Visual Identity', price: 190, labelTime: '1 week' },
      { id: 'wcag', label: 'Web Accessibility Audit WCAG 2.2 AA', price: 149, labelTime: '1 week' },
    ],
    estimatorSummaryLabel: 'Estimated one-time total (excl. VAT)',
    estimatorOneTimeFrom: 'One-time from',
    estimatorFirstStepLabel: 'First step',
    estimatorFirstStepValue: 'Proposal',
    estimatorChosenLabel: 'Selected modules',
    estimatorViewProcess: 'View approach',
    estimatorSubjectPrefix: 'Estimate from',
    packagesBadge: '• Packages',
    packagesTitle: 'Start, Craftsman and Webshop',
    processBadge: '• Process',
    processTitle: 'From first call to launch. Clearly settled upfront.',
    priceLocale: 'en-BE',
  },
  about: {
    heroBadge: '• Design Examples',
    heroTitle: 'A distinct look for every trade.',
    heroSubtitle:
      'Nine example designs for very different businesses, each with its own palette, typography and structure. All business names are fictional.',
    heroImageAlt: 'Webstudio K — Kasterlee, serving all of Belgium',
    heroImageLocation: 'Kemelbeekstraat 16, 2460 Kasterlee · serving all of Belgium',
    heroStatsExamples: '9 Design Examples',
    heroStatsSectors: '8+ Sectors',
    heroStatsPrice: 'From €490 excl. VAT',
    showcaseBadge: '• Nine example concepts',
    showcaseTitle: 'A custom website for every trade',
    showcaseSubtitle:
      'Each concept starts from your customers, your craft and the first question a visitor asks.',
    fictionalBusinessLabel: 'Fictional business',
    requestProposalArrow: 'Request proposal →',
    sectorsBadge: '• Sectors',
    sectorsTitle: 'A few sectors highlighted',
    sectorFilterTabs: [
      { id: 'all', label: 'All featured' },
      { id: 'founder', label: 'Trades & Hospitality' },
      { id: 'member', label: 'Salons, Painters & Garden' },
    ],
    focusLabel: 'Focus:',
    allSectorsTitle: 'All sectors we build for',
    sectorSubjectPrefix: 'Website for sector:',
    principles: [
      {
        number: '01',
        title: 'Clear proposal upfront',
        body: 'Tell us briefly what your business does. Within 1 business day you receive a clear proposal with structure, timeline and fixed pricing.',
      },
      {
        number: '02',
        title: 'Designed for every device',
        body: 'We design every website mobile-first with lightweight imagery and clean code so your site loads fast and reads effortlessly.',
      },
      {
        number: '03',
        title: 'Transparent upfront pricing',
        body: 'Three fixed packages and clear pricing for standalone services, always excluding VAT. No hidden costs afterwards.',
      },
      {
        number: '04',
        title: 'Single point of contact',
        body: 'You never have to manage copy or updates yourself. Simply tell us what needs changing and we take care of it.',
      },
    ],
    bottomCtaTitle: 'Don’t see your trade? Request a free proposal.',
    bottomCtaPrimary: 'Request a proposal',
    bottomCtaSecondary: 'View services & pricing',
  },
  vision: {
    heroBadge: '• Webstudio K · Approach & Guide',
    heroTitle: 'From first call to launch. Clearly settled upfront.',
    heroSubtitle:
      'Webstudio K builds websites for businesses, associations and sole traders across Belgium. Consultations take place smoothly by email, phone or online.',
    theses: [
      {
        num: 'I.',
        heading: 'Clear from day one.',
        copy: 'An AI tool can produce a rough draft, not a finished website tailored to your business with clear pricing and dedicated support after launch.',
      },
      {
        num: 'II.',
        heading: 'No technical hassle for you.',
        copy: 'Tell us what needs updating and we handle it for you. Start includes 15 minutes of monthly updates; Craftsman and Webshop include 30 minutes.',
      },
      {
        num: 'III.',
        heading: 'Your domain name stays yours.',
        copy: 'Your .be domain is always registered in your own name. Every package has a 12-month minimum term and is cancellable monthly thereafter.',
      },
    ],
    explorerBadge: '• From first call to launch',
    explorerTitle: 'How we build your website',
    explorerSubtitle:
      'Four concrete commitments so you know exactly how your new website takes shape without any risk.',
    pillars: [
      {
        id: 'voorstel-vooraf',
        index: '01',
        title: 'Clear proposal upfront',
        horizon: 'Steps 1 & 2',
        thesis:
          'After a short introduction you receive a concrete proposal within 1 business day detailing structure, turnaround and fixed price.',
        metric: 'Reply usually within 1 business day',
      },
      {
        id: 'mobile-first',
        index: '02',
        title: 'Crafted for every screen',
        horizon: 'Step 3',
        thesis:
          'We design every site mobile-first with lightweight media and clean code so pages load rapidly and read comfortably on phones and desktops.',
        metric: 'Start online in 5 business days · Craftsman in 10 business days',
      },
      {
        id: 'vindbaarheid',
        index: '03',
        title: 'Google, Maps & AI search',
        horizon: 'SEO & Visibility',
        thesis:
          'Every website ships with clear titles, meta descriptions, accurate local business data and a solid technical foundation for discoverability.',
        metric: 'Local SEO & Google Business Profile',
      },
      {
        id: 'toegankelijk',
        index: '04',
        title: 'Web accessibility (WCAG 2.2 AA)',
        horizon: 'Sustainable',
        thesis:
          'We ensure strong color contrast, full keyboard navigation, clear form labels and image descriptions tested against WCAG 2.2 AA.',
        metric: 'Accessible by design',
      },
    ],
    partLabel: 'Pillar',
    includedLabel: 'Included by default',
    requestProposalCta: 'Request a proposal',
    paletteBadge: '• Color Palette',
    paletteTitle: 'The Webstudio K Color System',
    paletteCta: 'View services & pricing',
    paletteSwatches: [
      { name: 'Flame Orange', hex: '#FB4D27', bg: 'bg-[#FB4D27]', text: 'text-white' },
      { name: 'Soft Light Gray', hex: '#D3D6DA', bg: 'bg-[#D3D6DA]', text: 'text-[#121214]' },
      { name: 'Neutral Gray', hex: '#929090', bg: 'bg-[#929090]', text: 'text-[#121214]' },
      { name: 'Light Surface', hex: '#F2F2F2', bg: 'bg-[#F2F2F2] border border-[#D3D6DA]', text: 'text-[#121214]' },
      { name: 'Deep Warm Gray', hex: '#4C433F', bg: 'bg-[#4C433F]', text: 'text-white' },
    ],
  },
};

const TRANSLATIONS: Record<Language, Translations> = {
  nl: NL,
  fr: FR,
  en: EN,
};

export function getTranslations(language: Language): Translations {
  return TRANSLATIONS[language];
}
