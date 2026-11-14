import type { Language } from '../i18n/LanguageContext';
import type { PageRoute } from './webstudioData';

export interface LooseServiceItem {
  id: string;
  title: string;
  price: string;
  description: string;
  linkedRoute?: PageRoute;
}

export interface LooseServiceCategory {
  id: string;
  number: string;
  title: string;
  items: LooseServiceItem[];
}

export interface PricingFactor {
  number: string;
  title: string;
  body: string;
  linkedRoute?: PageRoute;
  linkedLabel?: string;
}

export interface ServiceDetailSection {
  title: string;
  intro?: string;
  paragraphs?: string[];
  cards?: { title: string; body: string }[];
  bullets?: string[];
}

export interface ServiceDetailFaq {
  question: string;
  answer: string;
}

export interface ServiceDetailPageData {
  route: 'Webshop' | 'Vernieuwen' | 'LogoHuisstijl' | 'Toegankelijk';
  slug: string;
  breadcrumb: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  introParagraphs: string[];
  trustHighlights: string[];
  primaryCta: string;
  secondaryCta: string;
  secondaryRoute: PageRoute;
  sections: ServiceDetailSection[];
  showPackages?: boolean;
  steps?: { step: string; title: string; body: string }[];
  faqs: ServiceDetailFaq[];
  ctaTitle: string;
  ctaSubtitle: string;
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalPageData {
  route: 'Privacy' | 'Cookies';
  breadcrumb: string;
  title: string;
  subtitle: string;
  version: string;
  shortNote: string;
  sections: LegalSection[];
}

const LOOSE_SERVICES_NL: LooseServiceCategory[] = [
  {
    id: 'webontwikkeling',
    number: '01',
    title: 'Webontwikkeling',
    items: [
      {
        id: 'landingspagina',
        title: 'Landingspagina',
        price: 'Vanaf €290 excl. btw',
        description:
          'Eén gerichte pagina voor één dienst of actie, met tekst door ons geschreven, formulier of belknop, titel en omschrijving.',
      },
      {
        id: 'extra-pagina',
        title: 'Extra pagina',
        price: 'Vanaf €79 per pagina excl. btw',
        description:
          'Een extra pagina bovenop uw pakket, volledig in de stijl van uw site en met tekst door ons opgesteld.',
      },
      {
        id: 'tekst-los',
        title: 'Tekst los',
        price: 'Vanaf €69 per pagina excl. btw',
        description:
          'Wij herschrijven één pagina van uw bestaande website tot ongeveer 600 woorden in duidelijke taal.',
      },
      {
        id: 'onderhoud-los',
        title: 'Onderhoud los',
        price: 'Vanaf €29 per maand excl. btw',
        description:
          'Voor een website die wij niet bouwden: updates, wekelijkse back-up, maandelijkse controle en 15 minuten aanpassingen. Maandelijks opzegbaar.',
        linkedRoute: 'Vernieuwen',
      },
    ],
  },
  {
    id: 'seo',
    number: '02',
    title: 'SEO en zichtbaarheid',
    items: [
      {
        id: 'lokale-seo',
        title: 'Lokale SEO',
        price: 'Vanaf €149 per maand excl. btw',
        description:
          'Ongeveer 2 uur werk per maand. Wij houden uw Google Bedrijfsprofiel bij, verbeteren of voegen één pagina toe, houden uw gegevens in gidsen gelijk en sturen een kort maandverslag. Maandelijks opzegbaar.',
      },
      {
        id: 'seo-audit',
        title: 'SEO-audit',
        price: 'Vanaf €190 excl. btw',
        description:
          'Een rapport van maximaal 10 pagina’s over techniek, teksten, uw bedrijfsprofiel, lokale gegevens en 3 concurrenten, met 10 werkpunten in volgorde. Kiest u binnen 60 dagen voor Lokale SEO of een pakket, dan trekken wij dit bedrag af.',
      },
      {
        id: 'google-profiel',
        title: 'Google Bedrijfsprofiel',
        price: 'Vanaf €149 excl. btw',
        description:
          'Wij maken het profiel aan of nemen het over en vullen het volledig in, met categorieën, diensten, werkgebied, openingsuren, omschrijving, eventueel 10 van uw foto’s en een reviewlink met QR-code. Zit al in Vakman.',
        linkedRoute: 'Article:google-bedrijfsprofiel-aanmaken',
      },
      {
        id: 'optimalisatie-pagina',
        title: 'Optimalisatie bestaande pagina',
        price: 'Vanaf €59 per pagina excl. btw',
        description:
          'Wij verbeteren titel, omschrijving, koppenstructuur, beeldteksten, interne links en de laadtijd van de beelden op uw bestaande pagina.',
      },
      {
        id: 'teksten-ai',
        title: 'Teksten voor AI-zoekmachines',
        price: 'Vanaf €149 excl. btw',
        description:
          'Veelgestelde vragen met duidelijke antwoorden en gestructureerde gegevens over uw zaak, op tot 5 pagina’s.',
      },
      {
        id: 'bedrijfsgidsen',
        title: 'Vermeldingen in bedrijfsgidsen',
        price: 'Vanaf €99 excl. btw',
        description:
          'Uw zaak in 10 Belgische bedrijfsgidsen en vakgidsen, overal met dezelfde naam, adres en telefoon. U krijgt de lijst met logins.',
      },
    ],
  },
  {
    id: 'identiteit',
    number: '03',
    title: 'Visuele identiteit',
    items: [
      {
        id: 'logo',
        title: 'Logo',
        price: 'Vanaf €190 excl. btw',
        description:
          '2 ontwerpvoorstellen en 2 correctierondes. U krijgt de bestanden in SVG, PNG en PDF voor drukwerk en web.',
        linkedRoute: 'LogoHuisstijl',
      },
      {
        id: 'huisstijl',
        title: 'Huisstijl',
        price: 'Vanaf €490 excl. btw',
        description:
          'Logo, vaste kleuren, lettertypes, een korte stijlgids, een visitekaartje en een e-mailhandtekening.',
        linkedRoute: 'LogoHuisstijl',
      },
      {
        id: 'sjablonen',
        title: 'Digitale sjablonen',
        price: 'Vanaf €149 excl. btw',
        description:
          '5 sjablonen voor sociale media, een e-mailhandtekening en een offertesjabloon in uw eigen huisstijl.',
        linkedRoute: 'LogoHuisstijl',
      },
    ],
  },
  {
    id: 'toegankelijkheid',
    number: '04',
    title: 'Webtoegankelijkheid & uurtarief',
    items: [
      {
        id: 'wcag-controle',
        title: 'Toegankelijkheidscontrole (WCAG 2.2 AA)',
        price: 'Vanaf €149 excl. btw',
        description:
          'Wij testen 3 pagina’s volgens WCAG 2.2 AA op contrast, toetsenbord, formulieren en beeldteksten. U krijgt een rapport met prioriteiten.',
        linkedRoute: 'Toegankelijk',
      },
      {
        id: 'wcag-aanpassingen',
        title: 'Toegankelijkheidsaanpassingen',
        price: 'Vanaf €60 per uur excl. btw',
        description:
          'Wij lossen de gevonden punten op in uw bestaande site. Na de controle krijgt u vooraf een vaste prijs.',
        linkedRoute: 'Toegankelijk',
      },
      {
        id: 'uurtarief',
        title: 'Losse uren',
        price: 'Vanaf €60 per uur excl. btw',
        description:
          'Voor werk buiten uw pakket of buiten de maandelijkse aanpassingsminuten die in uw abonnement zitten.',
      },
    ],
  },
];

export function getLooseServices(lang: Language): LooseServiceCategory[] {
  if (lang === 'fr') {
    return [
      {
        id: 'webontwikkeling',
        number: '01',
        title: 'Développement web',
        items: [
          {
            id: 'landingspagina',
            title: 'Page d’atterrissage',
            price: 'À partir de €290 HTVA',
            description:
              'Une page dédiée à un service ou une action, avec texte rédigé par nos soins, formulaire ou bouton d’appel.',
          },
          {
            id: 'extra-pagina',
            title: 'Page supplémentaire',
            price: 'À partir de €79 par page HTVA',
            description:
              'Une page en plus de votre forfait, dans le style de votre site et avec rédaction incluse.',
          },
          {
            id: 'tekst-los',
            title: 'Rédaction de texte',
            price: 'À partir de €69 par page HTVA',
            description:
              'Réécriture d’une page existante jusqu’à environ 600 mots dans un langage clair.',
          },
          {
            id: 'onderhoud-los',
            title: 'Maintenance externe',
            price: 'À partir de €29 par mois HTVA',
            description:
              'Pour un site existant : mises à jour, sauvegarde hebdomadaire, contrôle mensuel et 15 minutes de modifications.',
            linkedRoute: 'Vernieuwen',
          },
        ],
      },
      {
        id: 'seo',
        number: '02',
        title: 'SEO et visibilité',
        items: [
          {
            id: 'lokale-seo',
            title: 'SEO local',
            price: 'À partir de €149 par mois HTVA',
            description:
              'Environ 2h de travail par mois : gestion de votre fiche Google, ajout ou amélioration d’une page, cohérence des annuaires.',
          },
          {
            id: 'seo-audit',
            title: 'Audit SEO',
            price: 'À partir de €190 HTVA',
            description:
              'Rapport jusqu’à 10 pages sur la technique, les textes, Google Maps et 3 concurrents. Déduit si vous démarrez sous 60 jours.',
          },
          {
            id: 'google-profiel',
            title: 'Fiche Google',
            price: 'À partir de €149 HTVA',
            description:
              'Création ou reprise complète avec catégories, services, horaires, 10 photos et QR-code d’avis. Inclus dans Artisan.',
            linkedRoute: 'Article:google-bedrijfsprofiel-aanmaken',
          },
          {
            id: 'optimalisatie-pagina',
            title: 'Optimisation de page',
            price: 'À partir de €59 par page HTVA',
            description:
              'Amélioration des balises, titres, textes alternatifs, liens internes et temps de chargement.',
          },
          {
            id: 'teksten-ai',
            title: 'Contenu moteurs IA',
            price: 'À partir de €149 HTVA',
            description:
              'Questions fréquentes structurées et données organisées sur jusqu’à 5 pages pour les moteurs IA.',
          },
          {
            id: 'bedrijfsgidsen',
            title: 'Annuaires belges',
            price: 'À partir de €99 HTVA',
            description:
              'Inscription de votre entreprise dans 10 annuaires belges avec des coordonnées identiques.',
          },
        ],
      },
      {
        id: 'identiteit',
        number: '03',
        title: 'Identité visuelle',
        items: [
          {
            id: 'logo',
            title: 'Logo',
            price: 'À partir de €190 HTVA',
            description:
              '2 propositions et 2 cycles de révisions. Fichiers livrés en SVG, PNG et PDF.',
            linkedRoute: 'LogoHuisstijl',
          },
          {
            id: 'huisstijl',
            title: 'Charte graphique complète',
            price: 'À partir de €490 HTVA',
            description:
              'Logo, couleurs, typographies, mini-guide, carte de visite et signature e-mail.',
            linkedRoute: 'LogoHuisstijl',
          },
          {
            id: 'sjablonen',
            title: 'Modèles numériques',
            price: 'À partir de €149 HTVA',
            description:
              '5 modèles réseaux sociaux, signature e-mail et modèle de devis à votre image.',
            linkedRoute: 'LogoHuisstijl',
          },
        ],
      },
      {
        id: 'toegankelijkheid',
        number: '04',
        title: 'Accessibilité & tarif horaire',
        items: [
          {
            id: 'wcag-controle',
            title: 'Audit d’accessibilité (WCAG 2.2 AA)',
            price: 'À partir de €149 HTVA',
            description:
              'Test de 3 pages selon WCAG 2.2 AA (contraste, clavier, formulaires, balises alt) avec rapport priorisé.',
            linkedRoute: 'Toegankelijk',
          },
          {
            id: 'wcag-aanpassingen',
            title: 'Corrections d’accessibilité',
            price: 'À partir de €60 / heure HTVA',
            description:
              'Résolution des points relevés sur votre site existant avec devis fixe préalable.',
            linkedRoute: 'Toegankelijk',
          },
          {
            id: 'uurtarief',
            title: 'Tarif horaire',
            price: 'À partir de €60 / heure HTVA',
            description:
              'Pour tout travail hors forfait ou au-delà des minutes mensuelles incluses.',
          },
        ],
      },
    ];
  }
  if (lang === 'en') {
    return [
      {
        id: 'webontwikkeling',
        number: '01',
        title: 'Web development',
        items: [
          {
            id: 'landingspagina',
            title: 'Landing page',
            price: 'From €290 excl. VAT',
            description:
              'One focused page for a specific service or campaign, including copywriting, form or call button.',
          },
          {
            id: 'extra-pagina',
            title: 'Extra page',
            price: 'From €79 per page excl. VAT',
            description:
              'An additional page matching your site design, with copy written by us.',
          },
          {
            id: 'tekst-los',
            title: 'Standalone copywriting',
            price: 'From €69 per page excl. VAT',
            description:
              'We rewrite an existing page of up to around 600 words in plain, persuasive language.',
          },
          {
            id: 'onderhoud-los',
            title: 'Standalone maintenance',
            price: 'From €29 per month excl. VAT',
            description:
              'For sites built elsewhere: updates, weekly backups, monthly checks and 15 minutes of edits.',
            linkedRoute: 'Vernieuwen',
          },
        ],
      },
      {
        id: 'seo',
        number: '02',
        title: 'SEO and visibility',
        items: [
          {
            id: 'lokale-seo',
            title: 'Local SEO',
            price: 'From €149 per month excl. VAT',
            description:
              'Approx. 2 hours/month: Google Business Profile upkeep, optimizing or adding one page, directory consistency and monthly report.',
          },
          {
            id: 'seo-audit',
            title: 'SEO audit',
            price: 'From €190 excl. VAT',
            description:
              'Report up to 10 pages covering tech, copy, local listings and 3 competitors. Credited if you start Local SEO or a package within 60 days.',
          },
          {
            id: 'google-profiel',
            title: 'Google Business Profile',
            price: 'From €149 excl. VAT',
            description:
              'Full setup or takeover with categories, services, hours, 10 photos and review QR link. Included in Craftsman.',
            linkedRoute: 'Article:google-bedrijfsprofiel-aanmaken',
          },
          {
            id: 'optimalisatie-pagina',
            title: 'Existing page optimization',
            price: 'From €59 per page excl. VAT',
            description:
              'Upgrade title, description, heading hierarchy, image alt texts, internal links and image loading speed.',
          },
          {
            id: 'teksten-ai',
            title: 'AI search copy & schema',
            price: 'From €149 excl. VAT',
            description:
              'Clear FAQ answers and structured business data across up to 5 pages.',
          },
          {
            id: 'bedrijfsgidsen',
            title: 'Belgian business directories',
            price: 'From €99 excl. VAT',
            description:
              'Consistent listings across 10 Belgian business and trade directories with full login handover.',
          },
        ],
      },
      {
        id: 'identiteit',
        number: '03',
        title: 'Visual identity',
        items: [
          {
            id: 'logo',
            title: 'Logo design',
            price: 'From €190 excl. VAT',
            description:
              '2 concepts and 2 feedback rounds. Delivered in SVG, PNG and PDF formats.',
            linkedRoute: 'LogoHuisstijl',
          },
          {
            id: 'huisstijl',
            title: 'Full brand identity',
            price: 'From €490 excl. VAT',
            description:
              'Logo, color palette, typography, concise style guide, business card and email signature.',
            linkedRoute: 'LogoHuisstijl',
          },
          {
            id: 'sjablonen',
            title: 'Digital templates',
            price: 'From €149 excl. VAT',
            description:
              '5 social media templates, email signature and quote template in your brand style.',
            linkedRoute: 'LogoHuisstijl',
          },
        ],
      },
      {
        id: 'toegankelijkheid',
        number: '04',
        title: 'Web accessibility & hourly rate',
        items: [
          {
            id: 'wcag-controle',
            title: 'Accessibility audit (WCAG 2.2 AA)',
            price: 'From €149 excl. VAT',
            description:
              'We test 3 pages against WCAG 2.2 AA for contrast, keyboard use, forms and alt text with a prioritized report.',
            linkedRoute: 'Toegankelijk',
          },
          {
            id: 'wcag-aanpassingen',
            title: 'Accessibility remediation',
            price: 'From €60 per hour excl. VAT',
            description:
              'We fix identified issues on your existing site at a fixed quote agreed upfront.',
            linkedRoute: 'Toegankelijk',
          },
          {
            id: 'uurtarief',
            title: 'Hourly rate',
            price: 'From €60 per hour excl. VAT',
            description:
              'For work outside your package or beyond your monthly included edit minutes.',
          },
        ],
      },
    ];
  }
  return LOOSE_SERVICES_NL;
}

export const PRICING_FACTORS_NL: PricingFactor[] = [
  {
    number: '01',
    title: 'Het aantal pagina’s',
    body: 'De meeste websites beginnen met een startpagina, een pagina per dienst en een contactpagina. Elke extra pagina vraagt ontwerp, tekst en controle op een klein scherm.',
  },
  {
    number: '02',
    title: 'Een eigen ontwerp of een sjabloon',
    body: 'Een eigen ontwerp vertrekt van uw vak, uw klanten en de sfeer van uw zaak. Bekijk gerust onze voorbeeldontwerpen om het verschil te zien.',
    linkedRoute: 'About',
    linkedLabel: 'Bekijk voorbeeldontwerpen',
  },
  {
    number: '03',
    title: 'Teksten en foto’s',
    body: 'De teksten schrijven wij voor u na een kort gesprek. Eigen foto’s van uw zaak kunnen, maar hoeven niet. Goede teksten leggen in gewone taal uit wat u doet.',
  },
  {
    number: '04',
    title: 'Functies op maat van uw zaak',
    body: 'Online afspraken, tafelreservaties, een formulier met bijlagen of een fotogalerij vragen elk gericht werk. Kies vooral de functies die uw klanten echt gebruiken.',
    linkedRoute: 'Sectors',
    linkedLabel: 'Bekijk sectoren',
  },
  {
    number: '05',
    title: 'Meerdere talen',
    body: 'Elke extra taal vraagt extra tekst, controle en onderhoud. Overweeg een tweede taal vooral wanneer een duidelijk deel van uw klanten die taal spreekt.',
  },
  {
    number: '06',
    title: 'Vindbaarheid vanaf de start',
    body: 'Het werk aan uw vindbaarheid doen wij al tijdens de bouw, met duidelijke titels, koppen en lokale gegevens, zodat u achteraf minder moet rechtzetten.',
  },
];

export const SERVICE_DETAIL_PAGES_NL: Record<
  'Webshop' | 'Vernieuwen' | 'LogoHuisstijl' | 'Toegankelijk',
  ServiceDetailPageData
> = {
  Webshop: {
    route: 'Webshop',
    slug: 'webshop-laten-maken',
    breadcrumb: 'Webshop laten maken',
    eyebrow: 'Webshop · Tot 50 producten',
    title: 'Webshop laten maken in België, met eerst een gratis demo',
    subtitle:
      'Verkoop uw producten online in een eigen webshop die er goed uitziet op gsm en computer.',
    introParagraphs: [
      'U krijgt tot 50 producten, veilig online betalen met bankkaart of kredietkaart en de instellingen voor verzending en btw.',
      'Wij bouwen eerst gratis een voorbeeld van uw zaak. U zit nergens aan vast en betaalt pas als u tevreden bent.',
    ],
    trustHighlights: [
      'Vanaf €1.890 eenmalig + €79/mnd excl. btw',
      'Online binnen 3 à 4 weken',
      'Tot 50 producten & Bancontact/kaart',
    ],
    primaryCta: 'Vraag uw gratis webshop-demo aan',
    secondaryCta: 'Bekijk het webshop voorbeeld',
    secondaryRoute: 'Demo:webshop-voorbeeld',
    sections: [
      {
        title: 'Wat zit er in uw webshop?',
        intro:
          'U krijgt een volledige website waarin uw aanbod klaarstaat om verkocht te worden, gecombineerd met alle info over uw zaak.',
        cards: [
          {
            title: 'Tot 50 producten',
            body: 'Elk product krijgt een eigen plaats met foto, prijs en omschrijving. Wij zetten uw producten in de webshop, eventueel met uw eigen foto’s.',
          },
          {
            title: 'Veilig online betalen',
            body: 'Uw klanten rekenen af met Bancontact, bankkaart of kredietkaart, rechtstreeks in de webshop. Transactiekosten bespreken wij vooraf.',
          },
          {
            title: 'Verzending en btw ingesteld',
            body: 'Voor uw webshop online gaat, stellen wij verzendtarieven, afhaling in de winkel en btw-regels netjes voor u in.',
          },
          {
            title: 'Alles uit Vakman inbegrepen',
            body: 'Naast uw producten krijgt u pagina’s over uw zaak, veelgestelde vragen, een bel- en contactformulier en een ingevuld Google Bedrijfsprofiel.',
          },
        ],
      },
      {
        title: 'Na de lancering: wij passen uw aanbod aan',
        intro:
          'U hoeft zelf geen producten, prijzen of voorraad bij te houden in een ingewikkeld dashboard.',
        bullets: [
          'Een nieuw product, een andere prijs of een nieuwe foto stuurt u gewoon door per e-mail.',
          'In uw maandprijs zitten 30 minuten aanpassingen per maand inbegrepen.',
          'Twee keer per jaar controleren wij de snelheid en vindbaarheid van uw webshop.',
          'Uw .be-domeinnaam, hosting, beveiliging en back-ups zitten allemaal in het maandbedrag.',
        ],
      },
    ],
    steps: [
      {
        step: '01',
        title: 'Kennismaking',
        body: 'U vertelt wat u verkoopt en hoe levering of afhaling werkt.',
      },
      {
        step: '02',
        title: 'Gratis demo',
        body: 'U bekijkt eerst gratis een ontwerpvoorstel van uw eigen winkel.',
      },
      {
        step: '03',
        title: 'Offerte & akkoord',
        body: 'U ontvangt een schriftelijke offerte met vaste prijs en planning.',
      },
      {
        step: '04',
        title: 'Producten & inrichting',
        body: 'Wij plaatsen uw producten en teksten. Binnen 3 à 4 weken klaar.',
      },
      {
        step: '05',
        title: 'Lancering',
        body: 'Uw webshop gaat live en wij blijven uw vaste aanspreekpunt.',
      },
    ],
    showPackages: true,
    faqs: [
      {
        question: 'Wat kost een webshop laten maken?',
        answer:
          'Het pakket Webshop kost vanaf €1.890 eenmalig en vanaf €79 per maand, excl. btw. Daarin zit alles uit het pakket Vakman, tot 50 producten, online betalen en verzend- en btw-instellingen.',
      },
      {
        question: 'Hoe lang duurt het om een webshop te bouwen?',
        answer:
          'Een webshop staat binnen 3 à 4 weken online na uw goedkeuring van de demo en zodra uw productinfo en foto’s binnen zijn.',
      },
      {
        question: 'Kan ik zelf producten toevoegen of prijzen wijzigen?',
        answer:
          'Dat hoeft niet: u stuurt het nieuwe product, de prijs of de foto gewoon door en wij zetten het voor u online binnen de 30 minuten aanpassingen per maand.',
      },
      {
        question: 'Is mijn webshop ook toegankelijk volgens Europese regels?',
        answer:
          'Ja. Sinds 28 juni 2025 gelden Europese regels rond toegankelijkheid (WCAG 2.2 AA) ook voor webshops. Wij bouwen uw webshop vanaf de start met hoog contrast, toetsenbordbediening en duidelijke knoppen.',
      },
    ],
    ctaTitle: 'Zien hoe uw eigen webshop eruit kan zien?',
    ctaSubtitle:
      'Vraag een gratis demo aan van uw winkel. Antwoord doorgaans binnen 1 werkdag.',
  },
  Vernieuwen: {
    route: 'Vernieuwen',
    slug: 'website-laten-vernieuwen',
    breadcrumb: 'Website laten vernieuwen',
    eyebrow: 'Vernieuwing · Opfrissen of herbouwen',
    title: 'Uw website laten vernieuwen, met eerst een gratis demo',
    subtitle:
      'Misschien is uw website jaren oud, toont ze niet goed op een gsm of klopt ze niet meer met wat u vandaag doet.',
    introParagraphs: [
      'Wij geven uw bestaande website een nieuw ontwerp en een logische opbouw, en behouden wat goed werkt.',
      'Eerst bouwen wij gratis een demo van uw nieuwe site, zodat u het verschil ziet voor u iets beslist.',
    ],
    trustHighlights: [
      'Prijzen vanaf €490 excl. btw',
      'Uw bestaande .be-domein blijft behouden',
      'Binnen 5 à 10 werkdagen vernieuwd',
    ],
    primaryCta: 'Vraag een gratis demo van uw nieuwe site',
    secondaryCta: 'Bekijk de voorbeeldontwerpen',
    secondaryRoute: 'About',
    sections: [
      {
        title: 'Wanneer is uw website aan vernieuwing toe?',
        intro: 'Herkent u twee of meer van deze signalen, dan loont een vernieuwing meer dan oplappen:',
        bullets: [
          'Op een gsm moet u inzoomen of zijwaarts scrollen om tekst te lezen.',
          'Prijzen, openingsuren of aangeboden diensten kloppen niet meer.',
          'Klanten bellen met vragen die eigenlijk meteen op de website moeten staan.',
          'De site laadt traag of toont geen beveiligd slotje (https) in de adresbalk.',
          'U geeft het webadres liever niet door omdat de site niet meer bij uw zaak past.',
          'Wie de website destijds bouwde, is niet meer bereikbaar om aanpassingen te doen.',
        ],
      },
      {
        title: 'Opfrissen of volledig vernieuwen?',
        intro: 'Niet elke website hoeft helemaal opnieuw. Wij kijken eerlijk wat het best past.',
        cards: [
          {
            title: 'Bestaande website opfrissen',
            body: 'Is de opbouw nog goed, dan kunt u losse pagina’s laten optimaliseren (vanaf €59/pagina) of laten herschrijven (vanaf €69/pagina). Los onderhoud kan vanaf €29/maand.',
          },
          {
            title: 'Volledig nieuwe website',
            body: 'Is het ontwerp verouderd of moeilijk aan te passen, dan bouwen wij een nieuw ontwerp op maat in Start (€490), Vakman (€990) of Webshop (€1.890).',
          },
          {
            title: 'Uw domeinnaam & e-mail blijven',
            body: 'Hebt u al een domeinnaam? U neemt die probleemloos mee. Het adres dat uw klanten kennen blijft exact hetzelfde en staat altijd op uw naam.',
          },
          {
            title: 'WordPress of maatwerk',
            body: 'Draait uw huidige website op WordPress en twijfelt u? Wij vergelijken eerlijk of vernieuwen op maat of verderwerken in WordPress beter past.',
          },
        ],
      },
    ],
    showPackages: true,
    faqs: [
      {
        question: 'Ben ik mijn Google-vindbaarheid kwijt bij een nieuwe website?',
        answer:
          'Nee. Wij behouden de belangrijkste URL’s of stellen nette doorverwijzingen in en verbeteren meteen de titels, structuur en laadsnelheid.',
      },
      {
        question: 'Kunnen mijn huidige foto’s en teksten mee verhuizen?',
        answer:
          'Zeker. Foto’s van uw eigen werk die u graag behoudt nemen wij mee en optimaliseren we voor snel laden. Teksten schrijven wij helder en up-to-date na een kort gesprek.',
      },
      {
        question: 'Hoe lang staat mijn site offline tijdens de vernieuwing?',
        answer:
          'Niet. Wij bouwen de nieuwe website klaar op een testomgeving en zetten haar pas over wanneer alles door u is goedgekeurd.',
      },
    ],
    ctaTitle: 'Benieuwd hoe uw vernieuwde website eruit kan zien?',
    ctaSubtitle:
      'Stuur ons het adres van uw huidige website door en ontvang vrijblijvend een voorstel.',
  },
  LogoHuisstijl: {
    route: 'LogoHuisstijl',
    slug: 'logo-en-huisstijl',
    breadcrumb: 'Logo en huisstijl',
    eyebrow: 'Visuele identiteit · Herkenbaar in alles',
    title: 'Een logo of huisstijl laten maken voor uw zaak',
    subtitle:
      'Een eigen logo, vaste huisstijlkleuren, typografie en herbruikbare digitale sjablonen zodat uw zaak overal herkenbaar is.',
    introParagraphs: [
      'Uw logo komt op uw website, uw gevel, uw bestelwagen en elke offerte die u verstuurt. Wie uw naam overal in dezelfde vorm en kleur ziet, herkent uw zaak meteen.',
      'Daarom testen wij elk ontwerp in één kleur, als klein browsericoon en op zowel een lichte als een donkere achtergrond.',
    ],
    trustHighlights: [
      'Logo vanaf €190 excl. btw',
      'Volledige huisstijl vanaf €490 excl. btw',
      'Digitale sjablonen vanaf €149 excl. btw',
    ],
    primaryCta: 'Bespreek uw logo of huisstijl',
    secondaryCta: 'Bekijk voorbeeldontwerpen',
    secondaryRoute: 'About',
    sections: [
      {
        title: 'Logo, huisstijl of digitale sjablonen',
        intro: 'Welke vorm bij u past, hangt af van wat u al hebt en waar u uw uitstraling wilt inzetten.',
        cards: [
          {
            title: 'Alleen een logo · vanaf €190',
            body: 'U krijgt 2 ontwerpvoorstellen en 2 correctierondes op uw gekozen richting. Oplevering in vectorieel SVG, PNG en drukklare PDF.',
          },
          {
            title: 'Volledige huisstijl · vanaf €490',
            body: 'Naast uw logo leggen wij uw vaste kleurenpalet en lettertypes vast in een stijlgids, inclusief ontwerp van visitekaartje en e-mailhandtekening.',
          },
          {
            title: 'Digitale sjablonen · vanaf €149',
            body: '5 sjablonen voor sociale media, een e-mailhandtekening en een offertesjabloon volledig opgemaakt in uw eigen huisstijl.',
          },
          {
            title: 'Bestaand logo opfrissen',
            body: 'Hebt u al een bekend logo dat wat gedateerd oogt? Wij werken lijn, letter en kleur bij met behoud van herkenbaarheid.',
          },
        ],
      },
      {
        title: 'Waarom een sterk logo meer doet dan mooi zijn',
        bullets: [
          'Herkenbaar op een smartphone én op een werfbord of bestelwagen.',
          'Leesbaar op kleine schaal (zoals het tabbladicoon in de browser of profielfoto).',
          'Werkt even krachtig in zwart-wit of één steunkleur op facturen en werkkledij.',
          'Direct geïntegreerd in de gratis demo van uw nieuwe website als u dat combineert.',
        ],
      },
    ],
    faqs: [
      {
        question: 'In welke bestandsformaten krijg ik mijn logo?',
        answer:
          'U ontvangt altijd SVG (schaalbaar voor groot drukwerk en belettering), transparante PNG-bestanden voor web en sociale media, en PDF voor drukkers.',
      },
      {
        question: 'Kan ik mijn logo combineren met een nieuwe website?',
        answer:
          'Ja. Als u zowel een logo als een website aanvraagt, werken wij het ontwerp meteen samen uit zodat kleuren, lettertypes en opbouw één geheel vormen.',
      },
      {
        question: 'Zit het drukwerk van visitekaartjes in de prijs?',
        answer:
          'Wij leveren de drukklare bestanden voor uw visitekaartje en e-mailhandtekening. Het fysieke drukwerk zelf bestelt u bij een drukker naar keuze (of wij geven een betrouwbaar adres door).',
      },
    ],
    ctaTitle: 'Klaar voor een herkenbaar gezicht voor uw zaak?',
    ctaSubtitle:
      'Vertel kort wat uw zaak doet en wij bezorgen u binnen 1 werkdag een voorstel.',
  },
  Toegankelijk: {
    route: 'Toegankelijk',
    slug: 'toegankelijke-website',
    breadcrumb: 'Webtoegankelijkheid',
    eyebrow: 'WCAG 2.2 AA · Bruikbaar voor iedereen',
    title: 'Een toegankelijke website laten maken, voor iedere bezoeker',
    subtitle:
      'Een toegankelijke website werkt voor iedereen — ook voor wie alleen een toetsenbord gebruikt, met een schermlezer surft of minder goed ziet.',
    introParagraphs: [
      'Elke nieuwe website die Webstudio K bouwt, toetsen wij standaard aan de internationale WCAG 2.2 AA-richtlijnen.',
      'Hebt u al een website en wilt u weten waar bezoekers vastlopen? Dan doen wij een controle van 3 pagina’s en lossen desgewenst de knelpunten op.',
    ],
    trustHighlights: [
      'Standaard WCAG 2.2 AA vanaf ontwerp',
      'Toegankelijkheidscontrole vanaf €149 excl. btw',
      'Aanpassingen vanaf €60/uur excl. btw',
    ],
    primaryCta: 'Vraag controle of advies aan',
    secondaryCta: 'Bekijk alle diensten & prijzen',
    secondaryRoute: 'Services',
    sections: [
      {
        title: 'Wat wij nakijken en bouwen volgens WCAG 2.2 AA',
        intro: 'Toegankelijkheid helpt niet alleen mensen met een beperking, maar maakt uw site overzichtelijker en sneller voor álle bezoekers.',
        cards: [
          {
            title: 'Contrast & leesbaarheid',
            body: 'Gewone tekst haalt minstens 4,5:1 contrast tegen de achtergrond. Informatie wordt nooit enkel via kleur overgebracht.',
          },
          {
            title: 'Bediening met het toetsenbord',
            body: 'Elke knop, link, menu en modal is volledig bereikbaar met de Tab-toets, met een duidelijke focus-omlijning.',
          },
          {
            title: 'Duidelijke formulieren',
            body: 'Elk invulveld heeft een zichtbaar label voor schermlezers en heldere foutmeldingen in gewone taal.',
          },
          {
            title: 'Beeldteksten & koppenstructuur',
            body: 'Foto’s krijgen zinvolle alt-beschrijvingen en koppen (H1, H2, H3) staan in een strikte, logische volgorde.',
          },
        ],
      },
      {
        title: 'Wat de Europese regels (EAA) zeggen',
        paragraphs: [
          'Sinds 28 juni 2025 gelden de Europese toegankelijkheidsregels voor diensten aan consumenten, waaronder webshops en websites waar klanten online boeken of kopen.',
          'Ook voor een kleinere onderneming die buiten de wettelijke plicht valt, levert een toegankelijke site directe winst op: niemand loopt vast op uw formulier of bestelknop.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Wat houdt een toegankelijkheidscontrole van €149 in?',
        answer:
          'Wij testen 3 representatieve pagina’s van uw bestaande website handmatig en automatisch volgens WCAG 2.2 AA en bezorgen u een helder rapport met prioriteiten.',
      },
      {
        question: 'Zit toegankelijkheid al in het Start- en Vakman-pakket?',
        answer:
          'Ja. Elke nieuwe website die wij bouwen wordt vanaf het eerste ontwerp opgebouwd met aandacht voor contrast, toetsenbordnavigatie, focusstaten en semantische HTML.',
      },
      {
        question: 'Waarom telt toegankelijkheid ook voor Google?',
        answer:
          'Een logische koppenstructuur, goede beeldteksten en snelle mobiele knoppen helpen niet alleen bezoekers met een schermlezer, maar ook zoekmachines om uw pagina beter te begrijpen.',
      },
    ],
    ctaTitle: 'Uw website laten controleren op toegankelijkheid?',
    ctaSubtitle:
      'Stuur het adres van uw site door voor een toegankelijkheidscontrole of vraag een gratis demo van een toegankelijke nieuwe site.',
  },
};

export const LEGAL_PAGES_NL: Record<'Privacy' | 'Cookies', LegalPageData> = {
  Privacy: {
    route: 'Privacy',
    breadcrumb: 'Privacyverklaring',
    title: 'Privacyverklaring',
    subtitle:
      'Hier leest u welke gegevens Webstudio K via deze website ontvangt, waarvoor wij ze gebruiken, hoe lang wij ze bewaren en welke rechten u hebt.',
    version: 'Versie 29 oktober 2026',
    shortNote: 'Kort gezegd gebruiken wij uw gegevens alleen om uw vraag te beantwoorden.',
    sections: [
      {
        id: 'verantwoordelijke',
        title: 'Wie is verantwoordelijk?',
        paragraphs: [
          'Verantwoordelijk voor de persoonsgegevens die via deze website binnenkomen is Webstudio K, Kemelbeekstraat 16, 2460 Kasterlee, België (Ondernemingsnummer BE 0897.577.919).',
          'Voor elke vraag over uw gegevens mailt u naar info@webstudiok.be.',
        ],
      },
      {
        id: 'welke-gegevens',
        title: 'Welke gegevens vragen wij in het contactformulier?',
        paragraphs: [
          'In het contactformulier vult u uw naam, de naam van uw zaak (niet verplicht), uw e-mailadres, het onderwerp waarover u een vraag hebt en uw bericht in.',
          'Mailt of belt u ons rechtstreeks, dan ontvangen wij alleen de gegevens die u ons zelf verstrekt. Wat u in interactieve voorbeeldontwerpen uitprobeert, wordt lokaal getoond en niet extern verzonden of bewaard.',
        ],
      },
      {
        id: 'doel-en-grondslag',
        title: 'Waarvoor gebruiken wij uw gegevens?',
        paragraphs: [
          'Wij gebruiken uw gegevens op basis van uw eigen verzoek als voorbereiding op een mogelijke overeenkomst (artikel 6, lid 1, b AVG) en op basis van ons gerechtvaardigd belang om vragen te beantwoorden (artikel 6, lid 1, f AVG). Wij sturen u geen ongevraagde nieuwsbrieven en verkopen of verhuren uw gegevens nooit.',
        ],
        bullets: [
          'Om uw vraag persoonlijk en inhoudelijk te beantwoorden.',
          'Om een vrijblijvende demo of voorstel voor uw website voor te bereiden en te bespreken.',
          'Om u een schriftelijke offerte te bezorgen en, als u klant wordt, de afgesproken opdracht uit te voeren.',
        ],
      },
      {
        id: 'bewaartermijn',
        title: 'Hoe lang bewaren wij uw gegevens?',
        paragraphs: [
          'Wij bewaren uw aanvraag, uw e-mail en uw gegevens tot maximaal 12 maanden na ons laatste contact. Daarna wissen wij ze. Wordt u klant, dan bewaren wij uw gegevens zolang de samenwerking loopt en daarna enkel wat wettelijk vereist is voor de boekhouding.',
        ],
      },
      {
        id: 'uw-rechten',
        title: 'Uw rechten onder de AVG / GDPR',
        paragraphs: [
          'U hebt steeds het recht om uw persoonsgegevens in te zien, te laten verbeteren, te laten wissen of de verwerking te beperken. Stuur hiervoor een bericht naar info@webstudiok.be; wij antwoorden binnen één maand.',
        ],
      },
    ],
  },
  Cookies: {
    route: 'Cookies',
    breadcrumb: 'Cookiebeleid',
    title: 'Cookiebeleid',
    subtitle:
      'Hier leest u welke cookies en lokale opslag deze website gebruikt, waarvoor ze dienen en hoe u uw keuze op elk moment aanpast.',
    version: 'Versie 29 oktober 2026',
    shortNote: 'Zonder uw toestemming bewaren wij alleen uw taal- en cookiekeuze.',
    sections: [
      {
        id: 'wat-zijn-cookies',
        title: 'Wat zijn cookies en lokale opslag?',
        paragraphs: [
          'Cookies zijn kleine tekstbestanden die een website in uw browser bewaart. Lokale opslag werkt gelijkaardig maar blijft lokaal in uw browser opgeslagen. Wij plaatsen alleen wat strikt noodzakelijk is, tenzij u zelf extra functies toestaat.',
        ],
      },
      {
        id: 'noodzakelijk',
        title: 'Noodzakelijk (altijd actief)',
        paragraphs: [
          'Deze opslag zorgt ervoor dat de website uw taalkeuze (Nederlands, Frans of Engels) en uw cookievoorkeur kan onthouden.',
        ],
        bullets: [
          'kw_consent (lokale opslag): onthoudt welke cookiekeuze u maakte (6 maanden bewaard).',
          'webstudio_lang (lokale opslag): onthoudt uw gekozen taal op de site.',
        ],
      },
      {
        id: 'statistiek',
        title: 'Statistiek (alleen na toestemming)',
        paragraphs: [
          'Anonieme bezoekstatistieken helpen ons begrijpen welke pagina’s het nuttigst zijn, zonder u over andere websites te volgen. Zonder uw uitdrukkelijke toestemming laden wij geen statistiekscript.',
        ],
      },
      {
        id: 'marketing',
        title: 'Marketingcookies',
        paragraphs: [
          'Op dit moment gebruiken wij geen marketing- of trackingcookies en tonen wij geen advertenties op deze website.',
        ],
      },
    ],
  },
};

export function getServiceDetailPage(
  route: 'Webshop' | 'Vernieuwen' | 'LogoHuisstijl' | 'Toegankelijk',
  lang: Language
): ServiceDetailPageData {
  const base = SERVICE_DETAIL_PAGES_NL[route];
  if (lang === 'nl') return base;
  if (lang === 'fr') {
    const frMap: Record<typeof route, Partial<ServiceDetailPageData>> = {
      Webshop: {
        breadcrumb: 'Créer une boutique en ligne',
        eyebrow: 'Boutique en ligne · Jusqu’à 50 produits',
        title: 'Créer votre boutique en ligne en Belgique, avec une démo gratuite',
        subtitle:
          'Vendez vos produits en ligne dans un e-shop rapide et clair sur smartphone comme sur ordinateur.',
        primaryCta: 'Demander une démo gratuite',
        secondaryCta: 'Voir l’exemple de boutique',
      },
      Vernieuwen: {
        breadcrumb: 'Refonte de site web',
        eyebrow: 'Refonte · Moderniser ou reconstruire',
        title: 'Moderniser votre site web, en commençant par une démo gratuite',
        subtitle:
          'Votre site actuel a vieilli, s’affiche mal sur mobile ou ne reflète plus votre activité ? Nous concevons une nouvelle structure claire.',
        primaryCta: 'Demander une démo de refonte',
        secondaryCta: 'Voir les exemples de sites',
      },
      LogoHuisstijl: {
        breadcrumb: 'Logo et identité visuelle',
        eyebrow: 'Identité visuelle · Cohérence partout',
        title: 'Créer un logo ou une charte graphique sur mesure',
        subtitle:
          'Un logo distinctif, une palette de couleurs cohérente et des modèles numériques pour votre entreprise.',
        primaryCta: 'Discuter de votre logo',
        secondaryCta: 'Voir les exemples de sites',
      },
      Toegankelijk: {
        breadcrumb: 'Accessibilité web',
        eyebrow: 'WCAG 2.2 AA · Utilisable par tous',
        title: 'Un site web accessible à chaque visiteur',
        subtitle:
          'Contraste suffisant, navigation complète au clavier et formulaires clairs conformes à la norme WCAG 2.2 AA.',
        primaryCta: 'Demander un audit d’accessibilité',
        secondaryCta: 'Voir services & tarifs',
      },
    };
    return { ...base, ...frMap[route] };
  }
  const enMap: Record<typeof route, Partial<ServiceDetailPageData>> = {
    Webshop: {
      breadcrumb: 'Webshop design',
      eyebrow: 'Webshop · Up to 50 products',
      title: 'Launch an online shop in Belgium, starting with a free preview',
      subtitle:
        'Sell your products online in a fast, tailored webshop designed for phones and desktops.',
      primaryCta: 'Request your free webshop preview',
      secondaryCta: 'View webshop example',
    },
    Vernieuwen: {
      breadcrumb: 'Website redesign',
      eyebrow: 'Redesign · Refresh or rebuild',
      title: 'Renew your existing website, starting with a free demo',
      subtitle:
        'If your current site looks dated, struggles on phones or no longer fits your business, we design a clear new structure.',
      primaryCta: 'Request a free redesign demo',
      secondaryCta: 'Browse design examples',
    },
    LogoHuisstijl: {
      breadcrumb: 'Logo & visual identity',
      eyebrow: 'Visual identity · Consistent everywhere',
      title: 'Bespoke logo and visual identity for your business',
      subtitle:
        'A distinctive logo, cohesive color palette, typography and reusable digital templates.',
      primaryCta: 'Discuss your logo & brand',
      secondaryCta: 'Browse design examples',
    },
    Toegankelijk: {
      breadcrumb: 'Web accessibility',
      eyebrow: 'WCAG 2.2 AA · Built for everyone',
      title: 'Build an accessible website for every visitor',
      subtitle:
        'Strong contrast, full keyboard operation and clear forms audited against WCAG 2.2 AA.',
      primaryCta: 'Request an accessibility audit',
      secondaryCta: 'View services & pricing',
    },
  };
  return { ...base, ...enMap[route] };
}
