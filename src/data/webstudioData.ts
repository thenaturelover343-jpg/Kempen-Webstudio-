import directorImg from '../assets/images/team_director_portrait_1794549613776.jpg';
import designerImg from '../assets/images/team_designer_portrait_1794549614407.jpg';
import strategistImg from '../assets/images/team_strategist_portrait_1794549614760.jpg';
import engineerImg from '../assets/images/team_engineer_portrait_1794549614536.jpg';
import studioDirectorImg from '../assets/images/studio_hub_director_1794549616056.jpg';
import studioInteriorImg from '../assets/images/warsaw_studio_interior_1794549617419.jpg';
import type { Language } from '../i18n/LanguageContext';
import type { FaqTopicKey } from '../i18n/translations';

export type PageRoute = 'Home' | 'Services' | 'About' | 'Vision';

export interface ShowcaseSlide {
  index: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
}

const SHOWCASE_SLIDES_BY_LANG: Record<Language, ShowcaseSlide[]> = {
  nl: [
    {
      index: '01',
      titleLine1: 'Vaste prijs',
      titleLine2: 'vooraf.',
      subtitle: 'Zonder verrassingen',
    },
    {
      index: '02',
      titleLine1: 'Snel online',
      titleLine2: 'op maat.',
      subtitle: 'Eén vast aanspreekpunt',
    },
  ],
  fr: [
    {
      index: '01',
      titleLine1: 'Prix fixe',
      titleLine2: 'd’avance.',
      subtitle: 'Sans surprises',
    },
    {
      index: '02',
      titleLine1: 'En ligne vite,',
      titleLine2: 'sur mesure.',
      subtitle: 'Un seul interlocuteur',
    },
  ],
  en: [
    {
      index: '01',
      titleLine1: 'Fixed price',
      titleLine2: 'upfront.',
      subtitle: 'No surprises',
    },
    {
      index: '02',
      titleLine1: 'Online fast,',
      titleLine2: 'tailor-made.',
      subtitle: 'Single point of contact',
    },
  ],
};

export const SHOWCASE_SLIDES = SHOWCASE_SLIDES_BY_LANG.nl;
export function getShowcaseSlides(lang: Language): ShowcaseSlide[] {
  return SHOWCASE_SLIDES_BY_LANG[lang];
}

export interface WorkProject {
  id: string;
  category: string;
  title: string;
  year: string;
  client: string;
  disciplines: string[];
  outcome: string;
  summary: string;
}

const WORK_PROJECTS_BY_LANG: Record<Language, WorkProject[]> = {
  nl: [
    {
      id: 'houtatelier-nethe',
      category: 'Schrijnwerker',
      title: 'Houtatelier Nethe',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Schrijnwerker',
      disciplines: ['Warme tinten', 'Maatwerk', 'Contactformulier'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: 'Ruimte voor materiaal en maatwerk, in warme tinten.',
    },
    {
      id: 'bistro-tilvaar',
      category: 'Horeca',
      title: 'Bistro Tilvaar',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Horeca',
      disciplines: ['Menukaart', 'Terras & groepen', 'Tafel reserveren'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: 'Kaart, terras en groepen, en online een tafel reserveren.',
    },
    {
      id: 'vennebrand',
      category: 'Webshop',
      title: 'Vennebrand',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Koffiebranderij',
      disciplines: ['Winkelmand', 'Productpagina’s', 'Veilig afrekenen'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: "Een koffiebranderij met winkelmand, productpagina's en afrekenen.",
    },
    {
      id: 'dakwerken-hoogland',
      category: 'Dakwerker',
      title: 'Dakwerken Hoogland',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Dakwerker',
      disciplines: ['Diensten op een rij', 'Werkgebied', 'Offerteformulier'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: 'Stevig en direct, met de diensten op een rij en een offerteformulier.',
    },
    {
      id: 'atelier-kleurwerk',
      category: 'Fijnschilder',
      title: 'Atelier Kleurwerk',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Fijnschilder',
      disciplines: ['Rustig palet', 'Binnen & buiten', 'Verfijnde stijl'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: 'Een kleurenpalet dat het vak zelf weerspiegelt, rustig en verfijnd.',
    },
    {
      id: 'tuinzorg-varelinde',
      category: 'Tuinonderhoud',
      title: 'Tuinzorg Varelinde',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Tuinonderhoud',
      disciplines: ['Heldere opbouw', 'Aanleg & onderhoud', 'Galerij'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: 'Een heldere opbouw van de diensten, in een frisse en natuurlijke stijl.',
    },
    {
      id: 'velours',
      category: 'Schoonheidssalon',
      title: 'Velours',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Schoonheidssalon',
      disciplines: ['Afsprakenplanner', 'Per behandeling', 'Ingetogen ontwerp'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: 'Een afsprakenplanner per behandeling, ingetogen vormgegeven.',
    },
    {
      id: 'kapsalon-ivelien',
      category: 'Kapsalon',
      title: 'Kapsalon Ivelien',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Kapsalon',
      disciplines: ['Afspraakknop', 'Lichte stijl', 'Mobielvriendelijk'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: 'De afspraak altijd binnen handbereik, op een lichte en persoonlijke site.',
    },
    {
      id: 'barbier-kolvaard',
      category: 'Barbershop',
      title: 'Barbier Kolvaard',
      year: 'Voorbeeldontwerp',
      client: 'Fictieve zaak · Barbershop',
      disciplines: ['Uitgesproken typografie', 'Donkere vlakken', 'Online boeken'],
      outcome: 'Bekijk voorbeeldontwerp',
      summary: 'Een uitgesproken typografie op donkere vlakken.',
    },
  ],
  fr: [
    {
      id: 'houtatelier-nethe',
      category: 'Menuisier',
      title: 'Houtatelier Nethe',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Menuisier',
      disciplines: ['Tons chaleureux', 'Sur mesure', 'Formulaire de contact'],
      outcome: 'Voir la maquette',
      summary: 'Un écrin dédié aux matériaux nobles et au sur-mesure, dans des tons chauds.',
    },
    {
      id: 'bistro-tilvaar',
      category: 'Horeca',
      title: 'Bistro Tilvaar',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Horeca',
      disciplines: ['Carte & menu', 'Terrasse & groupes', 'Réserver une table'],
      outcome: 'Voir la maquette',
      summary: 'Carte, terrasse, accueil de groupes et réservation de table en ligne.',
    },
    {
      id: 'vennebrand',
      category: 'Boutique en ligne',
      title: 'Vennebrand',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Torréfacteur',
      disciplines: ['Panier', 'Fiches produits', 'Paiement sécurisé'],
      outcome: 'Voir la maquette',
      summary: 'Une maison de torréfaction avec panier, fiches produits et paiement en ligne.',
    },
    {
      id: 'dakwerken-hoogland',
      category: 'Couvreur',
      title: 'Dakwerken Hoogland',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Couvreur',
      disciplines: ['Services clairs', 'Zone d’intervention', 'Demande de devis'],
      outcome: 'Voir la maquette',
      summary: 'Direct et structuré, présentant chaque prestation avec un formulaire de devis.',
    },
    {
      id: 'atelier-kleurwerk',
      category: 'Peintre décorateur',
      title: 'Atelier Kleurwerk',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Peintre',
      disciplines: ['Palette apaisante', 'Intérieur & extérieur', 'Style raffiné'],
      outcome: 'Voir la maquette',
      summary: 'Une palette chromatique qui reflète le métier, sobre et raffinée.',
    },
    {
      id: 'tuinzorg-varelinde',
      category: 'Entretien de jardins',
      title: 'Tuinzorg Varelinde',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Paysagiste',
      disciplines: ['Structure claire', 'Aménagement & entretien', 'Galerie'],
      outcome: 'Voir la maquette',
      summary: 'Une présentation claire des prestations dans un style frais et naturel.',
    },
    {
      id: 'velours',
      category: 'Institut de beauté',
      title: 'Velours',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Institut',
      disciplines: ['Agenda par soin', 'Réservation en ligne', 'Design épuré'],
      outcome: 'Voir la maquette',
      summary: 'Un outil de prise de rendez-vous par soin, tout en sobriété.',
    },
    {
      id: 'kapsalon-ivelien',
      category: 'Salon de coiffure',
      title: 'Kapsalon Ivelien',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Coiffure',
      disciplines: ['Bouton rendez-vous', 'Style lumineux', 'Adapté mobile'],
      outcome: 'Voir la maquette',
      summary: 'La prise de rendez-vous toujours à portée de main sur un site lumineux.',
    },
    {
      id: 'barbier-kolvaard',
      category: 'Barbier',
      title: 'Barbier Kolvaard',
      year: 'Maquette exemple',
      client: 'Entreprise fictive · Barbier',
      disciplines: ['Typographie affirmée', 'Surfaces sombres', 'Réservation en ligne'],
      outcome: 'Voir la maquette',
      summary: 'Une typographie marquée sur des surfaces sombres et contrastées.',
    },
  ],
  en: [
    {
      id: 'houtatelier-nethe',
      category: 'Joinery & Carpentry',
      title: 'Houtatelier Nethe',
      year: 'Design example',
      client: 'Fictional business · Carpenter',
      disciplines: ['Warm tones', 'Bespoke work', 'Contact form'],
      outcome: 'View example',
      summary: 'Space for natural materials and custom joinery, styled in warm tones.',
    },
    {
      id: 'bistro-tilvaar',
      category: 'Hospitality',
      title: 'Bistro Tilvaar',
      year: 'Design example',
      client: 'Fictional business · Bistro',
      disciplines: ['Menu showcase', 'Terrace & groups', 'Table booking'],
      outcome: 'View example',
      summary: 'Menu, terrace, group bookings and direct online table reservations.',
    },
    {
      id: 'vennebrand',
      category: 'Webshop',
      title: 'Vennebrand',
      year: 'Design example',
      client: 'Fictional business · Coffee roaster',
      disciplines: ['Shopping cart', 'Product pages', 'Secure checkout'],
      outcome: 'View example',
      summary: 'A specialty coffee roaster with cart, product pages and checkout.',
    },
    {
      id: 'dakwerken-hoogland',
      category: 'Roofing contractor',
      title: 'Dakwerken Hoogland',
      year: 'Design example',
      client: 'Fictional business · Roofer',
      disciplines: ['Service overview', 'Coverage area', 'Quote form'],
      outcome: 'View example',
      summary: 'Sturdy and straightforward, listing core services with a fast quote form.',
    },
    {
      id: 'atelier-kleurwerk',
      category: 'Fine Painter',
      title: 'Atelier Kleurwerk',
      year: 'Design example',
      client: 'Fictional business · Painter',
      disciplines: ['Calm palette', 'Interior & exterior', 'Refined style'],
      outcome: 'View example',
      summary: 'A restrained color palette reflecting the craft itself, calm and refined.',
    },
    {
      id: 'tuinzorg-varelinde',
      category: 'Garden Care',
      title: 'Tuinzorg Varelinde',
      year: 'Design example',
      client: 'Fictional business · Landscaper',
      disciplines: ['Clear structure', 'Design & upkeep', 'Gallery'],
      outcome: 'View example',
      summary: 'A clear breakdown of landscaping services in a fresh, natural layout.',
    },
    {
      id: 'velours',
      category: 'Beauty Salon',
      title: 'Velours',
      year: 'Design example',
      client: 'Fictional business · Salon',
      disciplines: ['Booking calendar', 'Per treatment', 'Understated layout'],
      outcome: 'View example',
      summary: 'An appointment planner organized by treatment with understated styling.',
    },
    {
      id: 'kapsalon-ivelien',
      category: 'Hair Salon',
      title: 'Kapsalon Ivelien',
      year: 'Design example',
      client: 'Fictional business · Hairdresser',
      disciplines: ['Booking button', 'Light aesthetic', 'Mobile friendly'],
      outcome: 'View example',
      summary: 'Online booking always within thumb reach on a light, personal site.',
    },
    {
      id: 'barbier-kolvaard',
      category: 'Barbershop',
      title: 'Barbier Kolvaard',
      year: 'Design example',
      client: 'Fictional business · Barbershop',
      disciplines: ['Bold typography', 'Dark surfaces', 'Online booking'],
      outcome: 'View example',
      summary: 'Expressive typography paired with crisp dark editorial panels.',
    },
  ],
};

export const WORK_PROJECTS = WORK_PROJECTS_BY_LANG.nl;
export function getWorkProjects(lang: Language): WorkProject[] {
  return WORK_PROJECTS_BY_LANG[lang];
}

export interface SectorHighlight {
  id: string;
  name: string;
  role: string;
  group: 'founder' | 'member';
  location: string;
  experience: string;
  bio: string;
  ctaLabel: string;
  image: string;
  specialty: string;
}

const TEAM_MEMBERS_BY_LANG: Record<Language, SectorHighlight[]> = {
  nl: [
    {
      id: 'vakmensen',
      name: 'Vakmensen',
      role: 'Website voor vakmensen',
      group: 'founder',
      location: 'Heel België',
      experience: 'Offerteaanvraag',
      bio: 'Uw werk, uw werkgebied en een vlotte offerteaanvraag.',
      ctaLabel: 'Website voor vakmensen',
      image: engineerImg,
      specialty: 'Werkgebied & vlotte offerteaanvraag',
    },
    {
      id: 'horeca',
      name: 'Horeca',
      role: 'Website voor horeca',
      group: 'founder',
      location: 'Heel België',
      experience: 'Tafel reserveren',
      bio: 'Uw kaart, openingsuren en een tafel reserveren, leesbaar op elk scherm.',
      ctaLabel: 'Website voor horeca',
      image: studioDirectorImg,
      specialty: 'Kaart, openingsuren & reservaties',
    },
    {
      id: 'kapsalons',
      name: 'Kapsalons & barbershops',
      role: 'Website voor kapsalons',
      group: 'member',
      location: 'Heel België',
      experience: 'Boekingssysteem',
      bio: "Afspraakknop, behandelingen en foto's vooraan.",
      ctaLabel: 'Website voor kapsalons',
      image: designerImg,
      specialty: "Afspraakknop, behandelingen & foto's",
    },
    {
      id: 'schilders',
      name: 'Schilders',
      role: 'Website voor schilders',
      group: 'member',
      location: 'Heel België',
      experience: 'Realisaties',
      bio: 'Binnen- en buitenwerk apart, met uw afgewerkte werven in beeld.',
      ctaLabel: 'Website voor schilders',
      image: directorImg,
      specialty: 'Binnen- & buitenwerk, afgewerkte werven',
    },
    {
      id: 'tuinaannemers',
      name: 'Tuinaannemers & hoveniers',
      role: 'Website voor tuinaannemers',
      group: 'member',
      location: 'Heel België',
      experience: 'Galerij',
      bio: 'Aanleg en onderhoud elk apart, met uw tuinen in een galerij.',
      ctaLabel: 'Website voor tuinaannemers',
      image: strategistImg,
      specialty: 'Aanleg & onderhoud in een galerij',
    },
  ],
  fr: [
    {
      id: 'vakmensen',
      name: 'Artisans & Bâtiment',
      role: 'Site web pour artisans',
      group: 'founder',
      location: 'Toute la Belgique',
      experience: 'Demande de devis',
      bio: 'Vos chantiers, votre zone d’action et une demande de devis rapide.',
      ctaLabel: 'Site web pour artisans',
      image: engineerImg,
      specialty: 'Zone d’action & demande de devis rapide',
    },
    {
      id: 'horeca',
      name: 'Horeca',
      role: 'Site web pour l’horeca',
      group: 'founder',
      location: 'Toute la Belgique',
      experience: 'Réserver une table',
      bio: 'Votre carte, vos horaires et la réservation de table, lisible sur tout écran.',
      ctaLabel: 'Site web pour l’horeca',
      image: studioDirectorImg,
      specialty: 'Carte, horaires & réservations',
    },
    {
      id: 'kapsalons',
      name: 'Coiffure & barbiers',
      role: 'Site web pour salons',
      group: 'member',
      location: 'Toute la Belgique',
      experience: 'Agenda en ligne',
      bio: 'Bouton de rendez-vous, tarifs des soins et photos mis en avant.',
      ctaLabel: 'Site web pour salons',
      image: designerImg,
      specialty: 'Bouton rendez-vous, soins & photos',
    },
    {
      id: 'schilders',
      name: 'Peintres',
      role: 'Site web pour peintres',
      group: 'member',
      location: 'Toute la Belgique',
      experience: 'Réalisations',
      bio: 'Travaux intérieurs et extérieurs séparés, avec vos chantiers en images.',
      ctaLabel: 'Site web pour peintres',
      image: directorImg,
      specialty: 'Intérieur & extérieur, réalisations finies',
    },
    {
      id: 'tuinaannemers',
      name: 'Paysagistes & jardins',
      role: 'Site web pour paysagistes',
      group: 'member',
      location: 'Toute la Belgique',
      experience: 'Galerie',
      bio: 'Création et entretien bien distincts, avec une galerie de vos jardins.',
      ctaLabel: 'Site web pour paysagistes',
      image: strategistImg,
      specialty: 'Création & entretien en galerie photo',
    },
  ],
  en: [
    {
      id: 'vakmensen',
      name: 'Trades & Contractors',
      role: 'Website for tradespeople',
      group: 'founder',
      location: 'All of Belgium',
      experience: 'Quote requests',
      bio: 'Your craft, coverage area and a quick, friction-free quote form.',
      ctaLabel: 'Website for tradespeople',
      image: engineerImg,
      specialty: 'Service area & quick quote form',
    },
    {
      id: 'horeca',
      name: 'Hospitality',
      role: 'Website for restaurants & cafés',
      group: 'founder',
      location: 'All of Belgium',
      experience: 'Table reservations',
      bio: 'Your menu, opening hours and table bookings legible on every screen.',
      ctaLabel: 'Website for hospitality',
      image: studioDirectorImg,
      specialty: 'Menu, opening hours & reservations',
    },
    {
      id: 'kapsalons',
      name: 'Hair & Barbershops',
      role: 'Website for salons',
      group: 'member',
      location: 'All of Belgium',
      experience: 'Booking system',
      bio: 'Booking button, treatment menu and photos placed front and center.',
      ctaLabel: 'Website for salons',
      image: designerImg,
      specialty: 'Booking button, treatments & photos',
    },
    {
      id: 'schilders',
      name: 'Painters & Decorators',
      role: 'Website for painters',
      group: 'member',
      location: 'All of Belgium',
      experience: 'Completed projects',
      bio: 'Interior and exterior painting separated clearly with finished project photos.',
      ctaLabel: 'Website for painters',
      image: directorImg,
      specialty: 'Interior & exterior completed work',
    },
    {
      id: 'tuinaannemers',
      name: 'Landscapers & Gardeners',
      role: 'Website for landscapers',
      group: 'member',
      location: 'All of Belgium',
      experience: 'Photo gallery',
      bio: 'Garden design and maintenance shown separately with a clear project gallery.',
      ctaLabel: 'Website for landscapers',
      image: strategistImg,
      specialty: 'Design & maintenance in one gallery',
    },
  ],
};

export const TEAM_MEMBERS = TEAM_MEMBERS_BY_LANG.nl;
export function getTeamMembers(lang: Language): SectorHighlight[] {
  return TEAM_MEMBERS_BY_LANG[lang];
}

const ALL_SECTORS_BY_LANG: Record<Language, string[]> = {
  nl: [
    'Winkels',
    'Horeca',
    'Vrije beroepen',
    'Verenigingen',
    'Vakmensen',
    'Salons',
    'Zorg en welzijn',
    'Starters',
  ],
  fr: [
    'Commerces',
    'Horeca',
    'Professions libérales',
    'Associations',
    'Artisans',
    'Salons',
    'Soins et bien-être',
    'Indépendants débutants',
  ],
  en: [
    'Retail Shops',
    'Hospitality',
    'Liberal Professions',
    'Associations',
    'Tradespeople',
    'Salons',
    'Health & Care',
    'Startups',
  ],
};

export const ALL_SECTORS = ALL_SECTORS_BY_LANG.nl;
export function getAllSectors(lang: Language): string[] {
  return ALL_SECTORS_BY_LANG[lang];
}

export interface StatisticItem {
  id: string;
  periodLabel: string;
  value: string;
  highlightText: string;
  mutedText: string;
  footnote: string;
}

const IMPACT_STATISTICS_BY_LANG: Record<Language, StatisticItem[]> = {
  nl: [
    {
      id: 'voor-google',
      periodLabel: 'Voor',
      value: '0',
      highlightText: 'eigen website:',
      mutedText: 'alleen een losse vermelding in Google',
      footnote: 'Zonder website, zonder foto’s van het werk en zonder diensten of werkgebied.',
    },
    {
      id: 'na-website',
      periodLabel: 'Na',
      value: '100%',
      highlightText: 'eigen website',
      mutedText: 'met diensten en offerteformulier',
      footnote: 'Duidelijke titels, lokale gegevens, contactformulier en belknop op elk scherm.',
    },
    {
      id: 'start-snelheid',
      periodLabel: 'Start',
      value: '5d',
      highlightText: 'online na',
      mutedText: 'uw akkoord en aanlevering van info',
      footnote: 'Vanaf €490 eenmalig + vanaf €29 per maand excl. btw.',
    },
    {
      id: 'vakman-snelheid',
      periodLabel: 'Vakman',
      value: '10d',
      highlightText: 'online met',
      mutedText: 'boekingssysteem en Google-profiel',
      footnote: 'Vanaf €990 eenmalig + vanaf €49 per maand excl. btw.',
    },
    {
      id: 'webshop-snelheid',
      periodLabel: 'Webshop',
      value: '3–4w',
      highlightText: 'volledige',
      mutedText: 'webshop tot 50 producten',
      footnote: 'Vanaf €1.890 eenmalig + vanaf €79 per maand excl. btw.',
    },
  ],
  fr: [
    {
      id: 'voor-google',
      periodLabel: 'Avant',
      value: '0',
      highlightText: 'site propre :',
      mutedText: 'seulement une fiche isolée sur Google',
      footnote: 'Sans site web, sans photos de vos réalisations, ni liste de services ou zone d’action.',
    },
    {
      id: 'na-website',
      periodLabel: 'Après',
      value: '100%',
      highlightText: 'site propre',
      mutedText: 'avec services et formulaire de devis',
      footnote: 'Titres clairs, coordonnées locales, formulaire de contact et bouton d’appel sur chaque écran.',
    },
    {
      id: 'start-snelheid',
      periodLabel: 'Start',
      value: '5j',
      highlightText: 'en ligne après',
      mutedText: 'votre accord et vos informations',
      footnote: 'À partir de €490 unique + dès €29 par mois HTVA.',
    },
    {
      id: 'vakman-snelheid',
      periodLabel: 'Artisan',
      value: '10j',
      highlightText: 'en ligne avec',
      mutedText: 'agenda de réservation et profil Google',
      footnote: 'À partir de €990 unique + dès €49 par mois HTVA.',
    },
    {
      id: 'webshop-snelheid',
      periodLabel: 'Boutique',
      value: '3–4s',
      highlightText: 'boutique',
      mutedText: 'complète jusqu’à 50 produits',
      footnote: 'À partir de €1.890 unique + dès €79 par mois HTVA.',
    },
  ],
  en: [
    {
      id: 'voor-google',
      periodLabel: 'Before',
      value: '0',
      highlightText: 'own website:',
      mutedText: 'only a standalone listing on Google',
      footnote: 'No website, no photos of your completed work and no clear services or service area.',
    },
    {
      id: 'na-website',
      periodLabel: 'After',
      value: '100%',
      highlightText: 'own website',
      mutedText: 'with services and quote form',
      footnote: 'Clear headings, local business details, contact form and call button on every screen.',
    },
    {
      id: 'start-snelheid',
      periodLabel: 'Start',
      value: '5d',
      highlightText: 'online after',
      mutedText: 'your sign-off and content delivery',
      footnote: 'From €490 one-time + from €29 per month excl. VAT.',
    },
    {
      id: 'vakman-snelheid',
      periodLabel: 'Craftsman',
      value: '10d',
      highlightText: 'online with',
      mutedText: 'booking system and Google profile',
      footnote: 'From €990 one-time + from €49 per month excl. VAT.',
    },
    {
      id: 'webshop-snelheid',
      periodLabel: 'Webshop',
      value: '3–4w',
      highlightText: 'complete',
      mutedText: 'online shop up to 50 products',
      footnote: 'From €1.890 one-time + from €79 per month excl. VAT.',
    },
  ],
};

export const IMPACT_STATISTICS = IMPACT_STATISTICS_BY_LANG.nl;
export function getImpactStatistics(lang: Language): StatisticItem[] {
  return IMPACT_STATISTICS_BY_LANG[lang];
}

export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  hashtags: string[];
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  timeline: string;
  startingPrice: string;
  outcomeMetric: string;
  featuredSurface?: boolean;
}

const SERVICES_LIST_BY_LANG: Record<Language, ServiceItem[]> = {
  nl: [
    {
      number: '01',
      id: 'webontwikkeling',
      title: 'Webontwikkeling',
      hashtags: ['#websitesopmaat', '#kleinewebshops'],
      shortDesc:
        "Websites op maat, landingspagina's, kleine webshops en onderhoud. Goed leesbaar op gsm en computer.",
      fullDesc:
        "Websites op maat, landingspagina's, kleine webshops en onderhoud. Elke website wordt eerst ontworpen voor kleine schermen, met lichte beelden en lichte code zodat uw site vlot laadt en prettig leest op elk toestel.",
      deliverables: [
        'Websites op maat',
        'Websites vernieuwen',
        "Landingspagina's",
        'Kleine webshops & Onderhoud',
      ],
      timeline: '5–10 werkdagen',
      startingPrice: '€490',
      outcomeMetric: 'website vanaf €490 excl. btw',
      featuredSurface: true,
    },
    {
      number: '02',
      id: 'seo-zichtbaarheid',
      title: 'SEO en zichtbaarheid',
      hashtags: ['#lokaleSEO', '#googlemaps'],
      shortDesc:
        'Gevonden worden in Google, Google Maps en AI-zoekmachines, met overal dezelfde gegevens.',
      fullDesc:
        'Elke website krijgt duidelijke titels en beschrijvingen, correcte lokale gegevens en een degelijke technische basis. Wilt u verder gaan, dan starten wij met een SEO-audit en werken wij aan lokale vindbaarheid.',
      deliverables: [
        'SEO-audit & Lokale SEO',
        'Google Bedrijfsprofiel',
        "Optimalisatie van bestaande pagina's",
        'Teksten voor AI-zoekmachines & Bedrijfsgidsen',
      ],
      timeline: 'Doorlopend / Audit',
      startingPrice: '€59',
      outcomeMetric: 'vanaf €59 excl. btw',
    },
    {
      number: '03',
      id: 'visuele-identiteit',
      title: 'Visuele identiteit',
      hashtags: ['#logo', '#huisstijl'],
      shortDesc:
        'Een eigen logo, vaste huisstijl en digitale sjablonen, zodat uw zaak overal herkenbaar is.',
      fullDesc:
        'Een herkenbaar gezicht voor uw onderneming, vereniging of zelfstandige activiteit. Van een strak logo en vaste kleurenschaal tot herbruikbare digitale sjablonen voor offertes en sociale media.',
      deliverables: [
        'Eigen Logo op maat',
        'Vaste Huisstijl & Kleurenpalet',
        'Typografische Richtlijnen',
        'Digitale Sjablonen',
      ],
      timeline: '1–2 weken',
      startingPrice: '€149',
      outcomeMetric: 'vanaf €149 excl. btw',
    },
    {
      number: '04',
      id: 'webtoegankelijkheid',
      title: 'Webtoegankelijkheid',
      hashtags: ['#WCAG22AA', '#toegankelijk'],
      shortDesc:
        'Een website met voldoende contrast, bediening met het toetsenbord en duidelijke formulieren, getoetst aan WCAG 2.2 AA.',
      fullDesc:
        'Wij zorgen ervoor dat uw website voor iedereen bruikbaar is: met voldoende contrast, volledige bediening met het toetsenbord, duidelijke formulieren en beschrijvingen bij beelden, getoetst aan WCAG 2.2 AA.',
      deliverables: [
        'Toegankelijkheidscontrole (WCAG 2.2 AA)',
        'Aanpassingen aan bestaande sites',
        'Toegankelijk vanaf het ontwerp',
        'Contrast-, toetsenbord- & formuliercheck',
      ],
      timeline: '1 week',
      startingPrice: '€149',
      outcomeMetric: 'controle vanaf €149 excl. btw',
    },
  ],
  fr: [
    {
      number: '01',
      id: 'webontwikkeling',
      title: 'Développement web',
      hashtags: ['#sitessurmesure', '#petitesboutiques'],
      shortDesc:
        'Sites sur mesure, pages d’atterrissage, petites boutiques en ligne et maintenance. Lisibles sur smartphone et ordinateur.',
      fullDesc:
        'Sites web sur mesure, pages d’atterrissage, petites boutiques en ligne et maintenance. Chaque site est pensé mobile-first, avec des images légères et un code soigné pour un chargement rapide sur tous les écrans.',
      deliverables: [
        'Sites web sur mesure',
        'Refonte de site existant',
        'Pages d’atterrissage',
        'Petites boutiques & Maintenance',
      ],
      timeline: '5–10 jours ouvrables',
      startingPrice: '€490',
      outcomeMetric: 'site web dès €490 HTVA',
      featuredSurface: true,
    },
    {
      number: '02',
      id: 'seo-zichtbaarheid',
      title: 'SEO et visibilité',
      hashtags: ['#SEOlocal', '#googlemaps'],
      shortDesc:
        'Être trouvé sur Google, Google Maps et les moteurs de recherche IA avec des données cohérentes partout.',
      fullDesc:
        'Chaque site intègre des titres et descriptions clairs, des données locales exactes et une base technique saine. Pour aller plus loin, nous réalisons un audit SEO et travaillons votre visibilité locale.',
      deliverables: [
        'Audit SEO & SEO local',
        'Fiche d’établissement Google',
        'Optimisation de pages existantes',
        'Contenu lisible par l’IA & Annuaires',
      ],
      timeline: 'Continu / Audit',
      startingPrice: '€59',
      outcomeMetric: 'à partir de €59 HTVA',
    },
    {
      number: '03',
      id: 'visuele-identiteit',
      title: 'Identité visuelle',
      hashtags: ['#logo', '#chartegraphique'],
      shortDesc:
        'Un logo unique, une charte graphique constante et des modèles numériques pour être reconnu partout.',
      fullDesc:
        'Une image mémorable pour votre entreprise, association ou activité d’indépendant : du logo sur mesure et de la palette de couleurs aux modèles numériques pour vos devis et réseaux sociaux.',
      deliverables: [
        'Logo sur mesure',
        'Charte graphique & Couleurs',
        'Règles typographiques',
        'Modèles numériques',
      ],
      timeline: '1–2 semaines',
      startingPrice: '€149',
      outcomeMetric: 'à partir de €149 HTVA',
    },
    {
      number: '04',
      id: 'webtoegankelijkheid',
      title: 'Accessibilité web',
      hashtags: ['#WCAG22AA', '#accessible'],
      shortDesc:
        'Un site doté d’un contraste suffisant, navigable au clavier avec des formulaires clairs, testé selon WCAG 2.2 AA.',
      fullDesc:
        'Nous veillons à ce que votre site soit utilisable par tous : contraste élevé, navigation clavier complète, formulaires explicites et textes alternatifs vérifiés selon la norme WCAG 2.2 AA.',
      deliverables: [
        'Audit d’accessibilité (WCAG 2.2 AA)',
        'Correction sur sites existants',
        'Accessibilité dès la conception',
        'Vérification contraste, clavier & formulaires',
      ],
      timeline: '1 semaine',
      startingPrice: '€149',
      outcomeMetric: 'audit dès €149 HTVA',
    },
  ],
  en: [
    {
      number: '01',
      id: 'webontwikkeling',
      title: 'Web development',
      hashtags: ['#customwebsites', '#smallwebshops'],
      shortDesc:
        'Bespoke websites, landing pages, small webshops and maintenance. Comfortable reading on phones and desktops.',
      fullDesc:
        'Bespoke websites, landing pages, small webshops and ongoing maintenance. Every site is designed mobile-first with lightweight media and clean code for rapid loading on every screen.',
      deliverables: [
        'Custom websites',
        'Website redesigns',
        'Landing pages',
        'Small webshops & Maintenance',
      ],
      timeline: '5–10 business days',
      startingPrice: '€490',
      outcomeMetric: 'website from €490 excl. VAT',
      featuredSurface: true,
    },
    {
      number: '02',
      id: 'seo-zichtbaarheid',
      title: 'SEO and visibility',
      hashtags: ['#localSEO', '#googlemaps'],
      shortDesc:
        'Get discovered in Google, Google Maps and AI search engines with consistent business details everywhere.',
      fullDesc:
        'Every website ships with clear titles and descriptions, accurate local business data and a sound technical foundation. To go further, we start with an SEO audit and strengthen local search visibility.',
      deliverables: [
        'SEO Audit & Local SEO',
        'Google Business Profile',
        'Optimization of existing pages',
        'AI-ready copy & Directories',
      ],
      timeline: 'Ongoing / Audit',
      startingPrice: '€59',
      outcomeMetric: 'from €59 excl. VAT',
    },
    {
      number: '03',
      id: 'visuele-identiteit',
      title: 'Visual identity',
      hashtags: ['#logo', '#brandstyle'],
      shortDesc:
        'Your own logo, cohesive brand palette and digital templates so your business is recognizable everywhere.',
      fullDesc:
        'A recognizable look for your company, association or independent practice. From a bespoke logo and curated palette to reusable digital templates for quotes and social posts.',
      deliverables: [
        'Custom Logo Design',
        'Brand Palette & Style',
        'Typography Guidelines',
        'Digital Templates',
      ],
      timeline: '1–2 weeks',
      startingPrice: '€149',
      outcomeMetric: 'from €149 excl. VAT',
    },
    {
      number: '04',
      id: 'webtoegankelijkheid',
      title: 'Web accessibility',
      hashtags: ['#WCAG22AA', '#accessible'],
      shortDesc:
        'Strong contrast, full keyboard navigation and clear forms tested against the WCAG 2.2 AA standard.',
      fullDesc:
        'We make sure your website works for everyone: high color contrast, full keyboard operation, clear form labels and descriptive image alternatives audited against WCAG 2.2 AA.',
      deliverables: [
        'Accessibility Audit (WCAG 2.2 AA)',
        'Upgrades for existing websites',
        'Accessible by design',
        'Contrast, keyboard & form audit',
      ],
      timeline: '1 week',
      startingPrice: '€149',
      outcomeMetric: 'audit from €149 excl. VAT',
    },
  ],
};

export const SERVICES_LIST = SERVICES_LIST_BY_LANG.nl;
export function getServicesList(lang: Language): ServiceItem[] {
  return SERVICES_LIST_BY_LANG[lang];
}

export interface StudioPlace {
  id: string;
  city: string;
  countryLabel: string;
  teamLabel: string;
  subLabel: string;
  director: string;
  address: string;
  timezone: string;
  coordinates: { x: number; y: number };
  portrait: string;
}

const STUDIO_PLACES_BY_LANG: Record<Language, StudioPlace[]> = {
  nl: [
    {
      id: 'kasterlee',
      city: 'Kasterlee & Kempen',
      countryLabel: 'Kemelbeekstraat 16, 2460 Kasterlee',
      teamLabel: 'Webstudio K',
      subLabel: 'Werkt in heel België',
      director: 'Webstudio K · Kasterlee',
      address: 'Kemelbeekstraat 16, 2460 Kasterlee',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 56, y: 30 },
      portrait: studioInteriorImg,
    },
    {
      id: 'turnhout-geel',
      city: 'Turnhout, Geel, Herentals & Mol',
      countryLabel: 'De Kempen, Antwerpen',
      teamLabel: 'Lokale ondernemers & vakmensen',
      subLabel: 'Persoonlijk per mail, telefoon of online',
      director: 'Webstudio K · Kempen',
      address: 'Regio Turnhout · Geel · Herentals · Mol',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 64, y: 42 },
      portrait: engineerImg,
    },
    {
      id: 'leuven-gent',
      city: 'Gent & Leuven',
      countryLabel: 'Vlaanderen',
      teamLabel: 'KMO’s, horeca & vrije beroepen',
      subLabel: 'Persoonlijk voorstel binnen 1 werkdag',
      director: 'Webstudio K · Vlaanderen',
      address: 'Website laten maken in Gent & Leuven',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 30, y: 46 },
      portrait: designerImg,
    },
    {
      id: 'kortrijk',
      city: 'Kortrijk & West-Vlaanderen',
      countryLabel: 'Heel België',
      teamLabel: 'Zelfstandigen & verenigingen',
      subLabel: 'Antwoord binnen 1 werkdag',
      director: 'Webstudio K · België',
      address: 'Website laten maken in Kortrijk',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 18, y: 60 },
      portrait: studioDirectorImg,
    },
  ],
  fr: [
    {
      id: 'kasterlee',
      city: 'Kasterlee & Campine',
      countryLabel: 'Kemelbeekstraat 16, 2460 Kasterlee',
      teamLabel: 'Webstudio K',
      subLabel: 'Actif dans toute la Belgique',
      director: 'Webstudio K · Kasterlee',
      address: 'Kemelbeekstraat 16, 2460 Kasterlee',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 56, y: 30 },
      portrait: studioInteriorImg,
    },
    {
      id: 'turnhout-geel',
      city: 'Turnhout, Geel, Herentals & Mol',
      countryLabel: 'Campine, Anvers',
      teamLabel: 'Entrepreneurs & artisans locaux',
      subLabel: 'Suivi personnel par e-mail, téléphone ou visio',
      director: 'Webstudio K · Campine',
      address: 'Région Turnhout · Geel · Herentals · Mol',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 64, y: 42 },
      portrait: engineerImg,
    },
    {
      id: 'leuven-gent',
      city: 'Gand & Louvain',
      countryLabel: 'Flandre & Bruxelles',
      teamLabel: 'PME, horeca & professions libérales',
      subLabel: 'Devis personnalisé sous 1 jour ouvrable',
      director: 'Webstudio K · Belgique',
      address: 'Création de site web à Gand & Louvain',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 30, y: 46 },
      portrait: designerImg,
    },
    {
      id: 'kortrijk',
      city: 'Courtrai & Flandre-Occidentale',
      countryLabel: 'Toute la Belgique',
      teamLabel: 'Indépendants & associations',
      subLabel: 'Réponse sous 1 jour ouvrable',
      director: 'Webstudio K · Belgique',
      address: 'Création de site web à Courtrai',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 18, y: 60 },
      portrait: studioDirectorImg,
    },
  ],
  en: [
    {
      id: 'kasterlee',
      city: 'Kasterlee & Campine',
      countryLabel: 'Kemelbeekstraat 16, 2460 Kasterlee',
      teamLabel: 'Webstudio K',
      subLabel: 'Serving all of Belgium',
      director: 'Webstudio K · Kasterlee',
      address: 'Kemelbeekstraat 16, 2460 Kasterlee',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 56, y: 30 },
      portrait: studioInteriorImg,
    },
    {
      id: 'turnhout-geel',
      city: 'Turnhout, Geel, Herentals & Mol',
      countryLabel: 'Campine, Antwerp',
      teamLabel: 'Local businesses & tradespeople',
      subLabel: 'Personal contact by email, phone or online',
      director: 'Webstudio K · Campine',
      address: 'Region Turnhout · Geel · Herentals · Mol',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 64, y: 42 },
      portrait: engineerImg,
    },
    {
      id: 'leuven-gent',
      city: 'Ghent & Leuven',
      countryLabel: 'Flanders & Brussels',
      teamLabel: 'SMEs, hospitality & liberal professions',
      subLabel: 'Personal proposal within 1 business day',
      director: 'Webstudio K · Belgium',
      address: 'Custom web design in Ghent & Leuven',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 30, y: 46 },
      portrait: designerImg,
    },
    {
      id: 'kortrijk',
      city: 'Kortrijk & West Flanders',
      countryLabel: 'All of Belgium',
      teamLabel: 'Sole traders & associations',
      subLabel: 'Reply within 1 business day',
      director: 'Webstudio K · Belgium',
      address: 'Custom web design in Kortrijk',
      timezone: 'CET (UTC+1)',
      coordinates: { x: 18, y: 60 },
      portrait: studioDirectorImg,
    },
  ],
};

export const STUDIO_PLACES = STUDIO_PLACES_BY_LANG.nl;
export function getStudioPlaces(lang: Language): StudioPlace[] {
  return STUDIO_PLACES_BY_LANG[lang];
}

export interface PricingTier {
  id: string;
  pillLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  oneTimePrice: string;
  monthlyPrice: string;
  deliveryTime: string;
  featured: boolean;
  featuresTitle: string;
  features: string[];
  monthlyNote: string;
}

const PRICING_TIERS_BY_LANG: Record<Language, PricingTier[]> = {
  nl: [
    {
      id: 'start',
      pillLabel: 'Start',
      titleLine1: 'Start',
      titleLine2: 'Pakket',
      subtitle: 'Een overzichtelijke, eenvoudige site.',
      oneTimePrice: '€490',
      monthlyPrice: '€29',
      deliveryTime: 'Binnen 5 werkdagen online',
      featured: false,
      featuresTitle: 'Wat zit erin',
      features: [
        'Mobielvriendelijk en beveiligd met https',
        'Contactformulier en belknop',
        'Teksten door ons geschreven na een gesprek, eventueel met uw eigen foto’s',
        'Google-basis en hulp bij uw Google Bedrijfsprofiel',
        '1 feedbackronde',
      ],
      monthlyNote:
        'In de maandprijs: Uw .be-domein, hosting, back-ups, updates en 15 minuten aanpassingen per maand.',
    },
    {
      id: 'vakman',
      pillLabel: 'Onze aanrader · Vakman',
      titleLine1: 'Vakman',
      titleLine2: 'Pakket',
      subtitle: 'Voor zaken met meer diensten of online afspraken.',
      oneTimePrice: '€990',
      monthlyPrice: '€49',
      deliveryTime: 'Binnen 10 werkdagen online',
      featured: true,
      featuresTitle: 'Alles uit Start, en daarbovenop',
      features: [
        'Veelgestelde vragen',
        'Koppeling met uw boekingssysteem',
        'Volledig ingevuld Google Bedrijfsprofiel',
        '2 feedbackrondes',
      ],
      monthlyNote:
        'In de maandprijs: Alles uit Start, met 30 minuten aanpassingen per maand en twee keer per jaar een controle van snelheid en vindbaarheid.',
    },
    {
      id: 'webshop',
      pillLabel: 'Webshop',
      titleLine1: 'Webshop',
      titleLine2: 'Pakket',
      subtitle: 'Voor wie online wil verkopen.',
      oneTimePrice: '€1.890',
      monthlyPrice: '€79',
      deliveryTime: 'In 3 tot 4 weken online',
      featured: false,
      featuresTitle: 'Alles uit Vakman, en daarbovenop',
      features: [
        'Tot 50 producten',
        'Veilig online betalen met bankkaart of kredietkaart',
        'Instellingen voor verzending en btw',
      ],
      monthlyNote: 'In de maandprijs: Alles uit Vakman.',
    },
  ],
  fr: [
    {
      id: 'start',
      pillLabel: 'Start',
      titleLine1: 'Start',
      titleLine2: 'Forfait',
      subtitle: 'Un site clair et essentiel pour démarrer.',
      oneTimePrice: '€490',
      monthlyPrice: '€29',
      deliveryTime: 'En ligne sous 5 jours ouvrables',
      featured: false,
      featuresTitle: 'Ce qui est inclus',
      features: [
        'Adapté mobile et sécurisé en https',
        'Formulaire de contact et bouton d’appel',
        'Textes rédigés par nos soins après échange, avec vos photos éventuelles',
        'Base Google et aide pour votre fiche Google',
        '1 cycle de révisions',
      ],
      monthlyNote:
        'Dans l’abonnement mensuel : Votre domaine .be, hébergement, sauvegardes, mises à jour et 15 minutes de modifications par mois.',
    },
    {
      id: 'vakman',
      pillLabel: 'Recommandé · Artisan',
      titleLine1: 'Artisan',
      titleLine2: 'Forfait',
      subtitle: 'Pour les entreprises avec plusieurs services ou prises de rendez-vous.',
      oneTimePrice: '€990',
      monthlyPrice: '€49',
      deliveryTime: 'En ligne sous 10 jours ouvrables',
      featured: true,
      featuresTitle: 'Tout le forfait Start, plus',
      features: [
        'Foire aux questions',
        'Connexion à votre système de réservation',
        'Profil d’établissement Google complété',
        '2 cycles de révisions',
      ],
      monthlyNote:
        'Dans l’abonnement mensuel : Tout Start avec 30 minutes de modifications par mois et 2 contrôles annuels de vitesse et visibilité.',
    },
    {
      id: 'webshop',
      pillLabel: 'Boutique',
      titleLine1: 'Boutique',
      titleLine2: 'Forfait',
      subtitle: 'Pour vendre vos produits en ligne.',
      oneTimePrice: '€1.890',
      monthlyPrice: '€79',
      deliveryTime: 'En ligne en 3 à 4 semaines',
      featured: false,
      featuresTitle: 'Tout le forfait Artisan, plus',
      features: [
        'Jusqu’à 50 produits',
        'Paiement sécurisé par carte bancaire ou crédit',
        'Paramétrage de la livraison et de la TVA',
      ],
      monthlyNote: 'Dans l’abonnement mensuel : Tout le forfait Artisan.',
    },
  ],
  en: [
    {
      id: 'start',
      pillLabel: 'Start',
      titleLine1: 'Start',
      titleLine2: 'Package',
      subtitle: 'A clear, straightforward website.',
      oneTimePrice: '€490',
      monthlyPrice: '€29',
      deliveryTime: 'Online in 5 business days',
      featured: false,
      featuresTitle: 'What is included',
      features: [
        'Mobile-friendly and secured with HTTPS',
        'Contact form and click-to-call button',
        'Copy written by us after a short call, paired with your own photos',
        'Google essentials and Google Business Profile setup help',
        '1 round of feedback',
      ],
      monthlyNote:
        'Monthly fee includes: Your .be domain, hosting, backups, updates and 15 minutes of edits per month.',
    },
    {
      id: 'vakman',
      pillLabel: 'Recommended · Craftsman',
      titleLine1: 'Craftsman',
      titleLine2: 'Package',
      subtitle: 'For businesses with multiple services or online bookings.',
      oneTimePrice: '€990',
      monthlyPrice: '€49',
      deliveryTime: 'Online in 10 business days',
      featured: true,
      featuresTitle: 'Everything in Start, plus',
      features: [
        'Frequently asked questions section',
        'Integration with your booking system',
        'Fully completed Google Business Profile',
        '2 rounds of feedback',
      ],
      monthlyNote:
        'Monthly fee includes: Everything in Start, plus 30 minutes of edits per month and twice-yearly speed and SEO checks.',
    },
    {
      id: 'webshop',
      pillLabel: 'Webshop',
      titleLine1: 'Webshop',
      titleLine2: 'Package',
      subtitle: 'For businesses ready to sell online.',
      oneTimePrice: '€1.890',
      monthlyPrice: '€79',
      deliveryTime: 'Online in 3 to 4 weeks',
      featured: false,
      featuresTitle: 'Everything in Craftsman, plus',
      features: [
        'Up to 50 products',
        'Secure online payments by debit or credit card',
        'Shipping and VAT configuration',
      ],
      monthlyNote: 'Monthly fee includes: Everything in Craftsman.',
    },
  ],
};

export const PRICING_TIERS = PRICING_TIERS_BY_LANG.nl;
export function getPricingTiers(lang: Language): PricingTier[] {
  return PRICING_TIERS_BY_LANG[lang];
}

export interface ProcessStep {
  step: string;
  title: string;
  ctaLabel: string;
  summary: string;
  deliverable: string;
}

const WORKING_PROCESS_BY_LANG: Record<Language, ProcessStep[]> = {
  nl: [
    {
      step: '01',
      title: 'Kennismaking',
      ctaLabel: 'Dag 1',
      summary:
        'U vertelt kort iets over uw zaak, klanten en wensen — per e-mail, telefoon of via het formulier.',
      deliverable: 'Persoonlijk antwoord binnen 1 werkdag',
    },
    {
      step: '02',
      title: 'Voorstel & opzet',
      ctaLabel: 'Vaste prijs',
      summary:
        'U ontvangt een helder voorstel met de paginastructuur, planning en vaste totaalprijs excl. btw.',
      deliverable: 'Duidelijk overzicht vooraf, zonder verrassingen',
    },
    {
      step: '03',
      title: 'Bouw & feedback',
      ctaLabel: '5–10 werkdagen',
      summary:
        'Na uw akkoord bouwen wij uw website op maat, inclusief teksten, Google-basis en 1 tot 2 feedbackrondes.',
      deliverable: 'Geoptimaliseerd voor gsm en computer',
    },
    {
      step: '04',
      title: 'Lancering & zorg',
      ctaLabel: 'Doorlopend',
      summary:
        'Uw .be-domein en website gaan live. Daarna verzorgen wij back-ups, updates en maandelijkse aanpassingen.',
      deliverable: 'Eén vast aanspreekpunt na lancering',
    },
  ],
  fr: [
    {
      step: '01',
      title: 'Prise de contact',
      ctaLabel: 'Jour 1',
      summary:
        'Vous nous décrivez brièvement votre activité, vos clients et vos souhaits — par e-mail, téléphone ou formulaire.',
      deliverable: 'Réponse personnelle sous 1 jour ouvrable',
    },
    {
      step: '02',
      title: 'Devis & structure',
      ctaLabel: 'Prix fixe',
      summary:
        'Vous recevez une proposition claire détaillant la structure des pages, le calendrier et le tarif fixe HTVA.',
      deliverable: 'Tout est clair à l’avance, sans surprises',
    },
    {
      step: '03',
      title: 'Création & retours',
      ctaLabel: '5–10 jours ouvr.',
      summary:
        'Après votre accord, nous concevons votre site sur mesure avec rédaction des textes, base Google et 1 à 2 révisions.',
      deliverable: 'Optimisé pour mobile et ordinateur',
    },
    {
      step: '04',
      title: 'Mise en ligne & suivi',
      ctaLabel: 'Continu',
      summary:
        'Votre domaine .be et votre site sont publiés. Nous gérons ensuite sauvegardes, mises à jour et modifications mensuelles.',
      deliverable: 'Un interlocuteur unique après lancement',
    },
  ],
  en: [
    {
      step: '01',
      title: 'Introduction',
      ctaLabel: 'Day 1',
      summary:
        'Share a few details about your business, customers and goals — by email, phone or the inquiry form.',
      deliverable: 'Personal reply within 1 business day',
    },
    {
      step: '02',
      title: 'Proposal & structure',
      ctaLabel: 'Fixed price',
      summary:
        'You receive a clear proposal covering the page structure, timeline and fixed total price excl. VAT.',
      deliverable: 'Full clarity upfront, with zero surprises',
    },
    {
      step: '03',
      title: 'Build & feedback',
      ctaLabel: '5–10 bus. days',
      summary:
        'Once approved, we build your custom website including copy, Google basics and 1 to 2 feedback rounds.',
      deliverable: 'Optimized for phone and desktop',
    },
    {
      step: '04',
      title: 'Launch & care',
      ctaLabel: 'Ongoing',
      summary:
        'Your .be domain and website go live. Afterwards we handle backups, updates and monthly content edits.',
      deliverable: 'One dedicated contact after launch',
    },
  ],
};

export const WORKING_PROCESS = WORKING_PROCESS_BY_LANG.nl;
export function getWorkingProcess(lang: Language): ProcessStep[] {
  return WORKING_PROCESS_BY_LANG[lang];
}

export interface ClientPartner {
  id: string;
  name: string;
  note: string;
}

const CLIENT_PARTNERS_BY_LANG: Record<Language, ClientPartner[]> = {
  nl: [
    {
      id: 'koelaanhangwagen',
      name: 'koelaanhangwagen verhuur',
      note: 'koelaanhangwagenverhuur.be · Modellen, prijzen en offerteaanvraag voor provincie Antwerpen en afhaling in Tielen',
    },
    {
      id: 'taponderhoud',
      name: 'taponderhoud',
      note: 'taponderhoud.be · Onderhoud, reiniging en herstelling van tapinstallaties met jaarabonnement of losse beurt',
    },
    {
      id: 'barlicious',
      name: 'barlicious',
      note: 'barlicious.be · Verhuur van barmateriaal, onderhoud van tapinstallaties en online drankcatering',
    },
    {
      id: 'houtatelier',
      name: 'Houtatelier Nethe',
      note: 'Voorbeeldontwerp Schrijnwerker · Ruimte voor materiaal en maatwerk, in warme tinten',
    },
    {
      id: 'bistro',
      name: 'Bistro Tilvaar',
      note: 'Voorbeeldontwerp Horeca · Kaart, terras en groepen, en online een tafel reserveren',
    },
    {
      id: 'belgie',
      name: 'HEEL BELGIË',
      note: 'Webstudio K bouwt websites voor ondernemers, verenigingen en zelfstandigen in heel België',
    },
  ],
  fr: [
    {
      id: 'koelaanhangwagen',
      name: 'koelaanhangwagen verhuur',
      note: 'koelaanhangwagenverhuur.be · Modèles, tarifs et devis pour la province d’Anvers et enlèvement à Tielen',
    },
    {
      id: 'taponderhoud',
      name: 'taponderhoud',
      note: 'taponderhoud.be · Entretien, nettoyage et réparation de pompes à bière avec contrat annuel ou intervention ponctuelle',
    },
    {
      id: 'barlicious',
      name: 'barlicious',
      note: 'barlicious.be · Location de matériel de bar, entretien de tireuses et service boissons en ligne',
    },
    {
      id: 'houtatelier',
      name: 'Houtatelier Nethe',
      note: 'Maquette Menuisier · Espace dédié aux matériaux et au sur-mesure dans des tons chaleureux',
    },
    {
      id: 'bistro',
      name: 'Bistro Tilvaar',
      note: 'Maquette Horeca · Carte, terrasse, groupes et réservation de table en ligne',
    },
    {
      id: 'belgie',
      name: 'TOUTE LA BELGIQUE',
      note: 'Webstudio K crée des sites web pour entrepreneurs, associations et indépendants dans toute la Belgique',
    },
  ],
  en: [
    {
      id: 'koelaanhangwagen',
      name: 'koelaanhangwagen verhuur',
      note: 'koelaanhangwagenverhuur.be · Models, pricing and quote requests for Antwerp province and pickup in Tielen',
    },
    {
      id: 'taponderhoud',
      name: 'taponderhoud',
      note: 'taponderhoud.be · Maintenance, cleaning and repair of draught beer systems with annual plans or single visits',
    },
    {
      id: 'barlicious',
      name: 'barlicious',
      note: 'barlicious.be · Bar equipment rental, tap maintenance and online drinks catering',
    },
    {
      id: 'houtatelier',
      name: 'Houtatelier Nethe',
      note: 'Carpenter Design Example · Space for materials and bespoke craftsmanship in warm tones',
    },
    {
      id: 'bistro',
      name: 'Bistro Tilvaar',
      note: 'Hospitality Design Example · Menu, terrace, group bookings and online table reservations',
    },
    {
      id: 'belgie',
      name: 'ALL OF BELGIUM',
      note: 'Webstudio K builds websites for businesses, associations and freelancers across Belgium',
    },
  ],
};

export const CLIENT_PARTNERS = CLIENT_PARTNERS_BY_LANG.nl;
export function getClientPartners(lang: Language): ClientPartner[] {
  return CLIENT_PARTNERS_BY_LANG[lang];
}

export interface CaseItem {
  id: string;
  number: string;
  domain: string;
  brandLabel: string;
  quote: string;
  role: string;
  author: string;
  avatar: string;
  dark: boolean;
}

const TESTIMONIALS_BY_LANG: Record<Language, CaseItem[]> = {
  nl: [
    {
      id: 'c1',
      number: '01',
      domain: 'koelaanhangwagenverhuur.be',
      brandLabel: '01 · koelaanhangwagen verhuur',
      quote:
        'Op koelaanhangwagenverhuur.be huurt u een koelaanhangwagen met koelunit. De site toont de modellen, de prijzen en hoe u een offerte vraagt, met levering in de provincie Antwerpen of afhaling in Tielen.',
      role: 'Provincie Antwerpen & Tielen',
      author: 'koelaanhangwagenverhuur.be',
      avatar: engineerImg,
      dark: false,
    },
    {
      id: 'c2',
      number: '02',
      domain: 'taponderhoud.be',
      brandLabel: '02 · taponderhoud',
      quote:
        'Op taponderhoud.be vindt u onderhoud, reiniging en herstelling van tapinstallaties. De site legt de diensten uit, het werkgebied en hoe u een jaarabonnement of een losse beurt aanvraagt.',
      role: 'Onderhoud & abonnementen',
      author: 'taponderhoud.be',
      avatar: directorImg,
      dark: true,
    },
    {
      id: 'c3',
      number: '03',
      domain: 'barlicious.be',
      brandLabel: '03 · barlicious',
      quote:
        'Op barlicious.be staan verhuur van barmateriaal, onderhoud van tapinstallaties en drankcatering. Bezoekers bestellen online of vragen onderhoud of catering aan via de site.',
      role: 'Verhuur & online bestellen',
      author: 'barlicious.be',
      avatar: studioDirectorImg,
      dark: false,
    },
  ],
  fr: [
    {
      id: 'c1',
      number: '01',
      domain: 'koelaanhangwagenverhuur.be',
      brandLabel: '01 · koelaanhangwagen verhuur',
      quote:
        'Sur koelaanhangwagenverhuur.be, louez une remorque frigorifique avec groupe froid. Le site présente les modèles, les tarifs et la demande de devis avec livraison en province d’Anvers ou retrait à Tielen.',
      role: 'Province d’Anvers & Tielen',
      author: 'koelaanhangwagenverhuur.be',
      avatar: engineerImg,
      dark: false,
    },
    {
      id: 'c2',
      number: '02',
      domain: 'taponderhoud.be',
      brandLabel: '02 · taponderhoud',
      quote:
        'Sur taponderhoud.be, retrouvez l’entretien, le nettoyage et la réparation de pompes à bière. Le site explique les prestations, la zone desservie et les abonnements annuels ou interventions ponctuelles.',
      role: 'Entretien & abonnements',
      author: 'taponderhoud.be',
      avatar: directorImg,
      dark: true,
    },
    {
      id: 'c3',
      number: '03',
      domain: 'barlicious.be',
      brandLabel: '03 · barlicious',
      quote:
        'Sur barlicious.be figurent la location de matériel de bar, l’entretien de tireuses et le service traiteur boissons. Les visiteurs commandent en ligne ou demandent une intervention via le site.',
      role: 'Location & commande en ligne',
      author: 'barlicious.be',
      avatar: studioDirectorImg,
      dark: false,
    },
  ],
  en: [
    {
      id: 'c1',
      number: '01',
      domain: 'koelaanhangwagenverhuur.be',
      brandLabel: '01 · koelaanhangwagen verhuur',
      quote:
        'On koelaanhangwagenverhuur.be visitors rent refrigerated trailers with cooling units. The site clearly presents models, rates and quote requests with delivery across Antwerp or pickup in Tielen.',
      role: 'Antwerp Province & Tielen',
      author: 'koelaanhangwagenverhuur.be',
      avatar: engineerImg,
      dark: false,
    },
    {
      id: 'c2',
      number: '02',
      domain: 'taponderhoud.be',
      brandLabel: '02 · taponderhoud',
      quote:
        'On taponderhoud.be clients book maintenance, cleaning and repair for draught systems. The website explains every service, coverage area and annual plans or single service requests.',
      role: 'Maintenance & plans',
      author: 'taponderhoud.be',
      avatar: directorImg,
      dark: true,
    },
    {
      id: 'c3',
      number: '03',
      domain: 'barlicious.be',
      brandLabel: '03 · barlicious',
      quote:
        'On barlicious.be customers browse bar equipment rental, tap maintenance and beverage catering. Visitors order directly online or request maintenance and catering via the site.',
      role: 'Rental & online ordering',
      author: 'barlicious.be',
      avatar: studioDirectorImg,
      dark: false,
    },
  ],
};

export const TESTIMONIALS = TESTIMONIALS_BY_LANG.nl;
export function getTestimonials(lang: Language): CaseItem[] {
  return TESTIMONIALS_BY_LANG[lang];
}

export interface AwardItem {
  id: string;
  title: string;
  subtitle: string;
  variant: 'light' | 'dark' | 'gray' | 'clutch' | 'glass';
  positionClass: string;
}

const GREATEST_AWARDS_BY_LANG: Record<Language, AwardItem[]> = {
  nl: [
    {
      id: 'voorstel',
      title: 'Vast tarief',
      subtitle: 'Vooraf duidelijk, zonder verrassingen',
      variant: 'light',
      positionClass: 'lg:top-4 lg:left-[12%]',
    },
    {
      id: 'prijzen',
      title: 'Vanaf €490',
      subtitle: 'Duidelijke prijzen excl. btw',
      variant: 'dark',
      positionClass: 'lg:top-28 lg:left-[23%]',
    },
    {
      id: 'wcag',
      title: 'WCAG 2.2 AA',
      subtitle: 'Toegankelijk vanaf het ontwerp',
      variant: 'gray',
      positionClass: 'lg:bottom-8 lg:left-[6%]',
    },
    {
      id: 'mobiel',
      title: 'Mobile-first',
      subtitle: 'Snel op gsm en computer',
      variant: 'glass',
      positionClass: 'lg:top-10 lg:right-[11%]',
    },
    {
      id: 'belgie',
      title: 'Heel België',
      subtitle: 'Eén vast aanspreekpunt',
      variant: 'clutch',
      positionClass: 'lg:top-32 lg:right-[23%]',
    },
    {
      id: 'snel',
      title: '5 werkdagen',
      subtitle: 'Start-pakket online',
      variant: 'dark',
      positionClass: 'lg:bottom-4 lg:right-[11%]',
    },
  ],
  fr: [
    {
      id: 'voorstel',
      title: 'Prix fixe',
      subtitle: 'Clair dès le départ, sans surprise',
      variant: 'light',
      positionClass: 'lg:top-4 lg:left-[12%]',
    },
    {
      id: 'prijzen',
      title: 'Dès €490',
      subtitle: 'Tarifs transparents HTVA',
      variant: 'dark',
      positionClass: 'lg:top-28 lg:left-[23%]',
    },
    {
      id: 'wcag',
      title: 'WCAG 2.2 AA',
      subtitle: 'Accessible dès la conception',
      variant: 'gray',
      positionClass: 'lg:bottom-8 lg:left-[6%]',
    },
    {
      id: 'mobiel',
      title: 'Mobile-first',
      subtitle: 'Rapide sur smartphone et PC',
      variant: 'glass',
      positionClass: 'lg:top-10 lg:right-[11%]',
    },
    {
      id: 'belgie',
      title: 'Toute la Belgique',
      subtitle: 'Un interlocuteur unique',
      variant: 'clutch',
      positionClass: 'lg:top-32 lg:right-[23%]',
    },
    {
      id: 'snel',
      title: '5 jours ouvr.',
      subtitle: 'Forfait Start en ligne',
      variant: 'dark',
      positionClass: 'lg:bottom-4 lg:right-[11%]',
    },
  ],
  en: [
    {
      id: 'voorstel',
      title: 'Fixed pricing',
      subtitle: 'Clear upfront, zero surprises',
      variant: 'light',
      positionClass: 'lg:top-4 lg:left-[12%]',
    },
    {
      id: 'prijzen',
      title: 'From €490',
      subtitle: 'Transparent rates excl. VAT',
      variant: 'dark',
      positionClass: 'lg:top-28 lg:left-[23%]',
    },
    {
      id: 'wcag',
      title: 'WCAG 2.2 AA',
      subtitle: 'Accessible by design',
      variant: 'gray',
      positionClass: 'lg:bottom-8 lg:left-[6%]',
    },
    {
      id: 'mobiel',
      title: 'Mobile-first',
      subtitle: 'Fast on mobile and desktop',
      variant: 'glass',
      positionClass: 'lg:top-10 lg:right-[11%]',
    },
    {
      id: 'belgie',
      title: 'All of Belgium',
      subtitle: 'Single point of contact',
      variant: 'clutch',
      positionClass: 'lg:top-32 lg:right-[23%]',
    },
    {
      id: 'snel',
      title: '5 bus. days',
      subtitle: 'Start package online',
      variant: 'dark',
      positionClass: 'lg:bottom-4 lg:right-[11%]',
    },
  ],
};

export const GREATEST_AWARDS = GREATEST_AWARDS_BY_LANG.nl;
export function getGreatestAwards(lang: Language): AwardItem[] {
  return GREATEST_AWARDS_BY_LANG[lang];
}

export interface FaqCategoryHighlight {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
}

const BLOG_ARTICLES_BY_LANG: Record<Language, FaqCategoryHighlight[]> = {
  nl: [
    {
      id: 'faq-aanpak',
      category: 'Aanpak',
      date: 'Vrijblijvend',
      readTime: 'Binnen 1 werkdag',
      title: 'Hoe verloopt een aanvraag?',
      excerpt:
        'U vertelt kort iets over uw zaak. Binnen 1 werkdag krijgt u een helder voorstel met aanpak, doorlooptijd en vaste prijs.',
    },
    {
      id: 'faq-prijzen',
      category: 'Prijzen',
      date: 'Excl. btw',
      readTime: 'Drie vaste pakketten',
      title: 'Wat kost een website laten maken?',
      excerpt:
        'Start vanaf €490 eenmalig (+ €29/mnd), Vakman vanaf €990 (+ €49/mnd) en Webshop vanaf €1.890 (+ €79/mnd). U beslist pas als u de prijs kent.',
    },
    {
      id: 'faq-ai',
      category: 'Werkwijze',
      date: 'Persoonlijk',
      readTime: 'WCAG 2.2 AA',
      title: 'Kan een AI-tool mijn website maken?',
      excerpt:
        'Een AI-tool kan een schets maken, maar geen afgewerkte website van uw eigen zaak met duidelijke prijzen en een aanspreekpunt na lancering.',
    },
  ],
  fr: [
    {
      id: 'faq-aanpak',
      category: 'Approche',
      date: 'Sans engagement',
      readTime: 'Sous 1 jour ouvr.',
      title: 'Comment se déroule une demande ?',
      excerpt:
        'Vous présentez brièvement votre activité. Sous 1 jour ouvrable, vous recevez un devis clair avec structure, délai et prix fixe.',
    },
    {
      id: 'faq-prijzen',
      category: 'Tarifs',
      date: 'HTVA',
      readTime: 'Trois forfaits fixes',
      title: 'Combien coûte un site web ?',
      excerpt:
        'Start dès €490 (+ €29/mois), Artisan dès €990 (+ €49/mois) et Boutique dès €1.890 (+ €79/mois). Vous décidez une fois le prix connu.',
    },
    {
      id: 'faq-ai',
      category: 'Méthode',
      date: 'Personnel',
      readTime: 'WCAG 2.2 AA',
      title: 'Un outil d’IA peut-il créer mon site ?',
      excerpt:
        'Une IA peut esquisser une page, mais pas livrer un site fini adapté à votre entreprise avec des prix clairs et un suivi réel.',
    },
  ],
  en: [
    {
      id: 'faq-aanpak',
      category: 'Approach',
      date: 'No obligation',
      readTime: 'Within 1 bus. day',
      title: 'How does a request work?',
      excerpt:
        'You briefly describe your business. Within 1 business day you receive a clear proposal covering scope, timeline and fixed pricing.',
    },
    {
      id: 'faq-prijzen',
      category: 'Pricing',
      date: 'Excl. VAT',
      readTime: 'Three fixed packages',
      title: 'What does a website cost?',
      excerpt:
        'Start from €490 one-time (+ €29/mo), Craftsman from €990 (+ €49/mo) and Webshop from €1.890 (+ €79/mo). You only decide once you know the full price.',
    },
    {
      id: 'faq-ai',
      category: 'Process',
      date: 'Personal',
      readTime: 'WCAG 2.2 AA',
      title: 'Can an AI tool build my website?',
      excerpt:
        'An AI tool can make a draft, not a finished website tailored to your business with clear pricing and dedicated human support after launch.',
    },
  ],
};

export const BLOG_ARTICLES = BLOG_ARTICLES_BY_LANG.nl;
export function getBlogArticles(lang: Language): FaqCategoryHighlight[] {
  return BLOG_ARTICLES_BY_LANG[lang];
}

export interface FaqItem {
  id: string;
  topicKey: Exclude<FaqTopicKey, 'all'>;
  topic: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS_BY_LANG: Record<Language, FaqItem[]> = {
  nl: [
    {
      id: 'q1',
      topicKey: 'approach',
      topic: 'Aanpak',
      question: 'Hoe verloopt een aanvraag bij Webstudio K?',
      answer:
        'U neemt contact op per e-mail, telefoon of via het formulier. We bespreken kort uw zaak en wensen, en u ontvangt een duidelijk voorstel met vaste prijs en planning voordat we starten.',
    },
    {
      id: 'q2',
      topicKey: 'approach',
      topic: 'Aanpak',
      question: 'Voor welke zaken maakt Webstudio K websites?',
      answer:
        'Webstudio K maakt websites voor elke ondernemer, vereniging en zelfstandige in België, bijvoorbeeld een winkel, een horecazaak, een vrij beroep, een kapsalon of een vakman zoals een schilder of dakwerker.',
    },
    {
      id: 'q3',
      topicKey: 'approach',
      topic: 'Aanpak',
      question: 'Voor welke regio werkt Webstudio K?',
      answer:
        'Wij werken voor ondernemers, verenigingen en zelfstandigen in heel België. Kennismaking en overleg verlopen per e-mail, telefonisch of online.',
    },
    {
      id: 'q4',
      topicKey: 'pricing',
      topic: 'Prijzen',
      question: 'Wat kost een website laten maken?',
      answer:
        'Wij werken met drie pakketten. Start kost vanaf €490 eenmalig en vanaf €29 per maand, excl. btw. Vakman kost vanaf €990 eenmalig en vanaf €49 per maand, excl. btw. Webshop kost vanaf €1.890 eenmalig en vanaf €79 per maand, excl. btw. Losse diensten hebben ook een duidelijke prijs, bijvoorbeeld Lokale SEO vanaf €149 per maand, excl. btw, een SEO-audit vanaf €190, excl. btw, en een logo vanaf €190, excl. btw. U beslist pas als u de prijs kent.',
    },
    {
      id: 'q5',
      topicKey: 'pricing',
      topic: 'Prijzen',
      question: 'Kan mijn website later groeien?',
      answer:
        'U kunt later pagina’s toevoegen of overstappen naar een groter pakket. Een extra pagina kost vanaf €79, excl. btw, in de stijl van uw site en met tekst door ons. Wilt u later ook online verkopen, dan kan dat met het pakket Webshop.',
    },
    {
      id: 'q6',
      topicKey: 'services',
      topic: 'Diensten',
      question: 'Welke diensten biedt Webstudio K aan?',
      answer:
        'Wij maken websites op maat, landingspagina’s en kleine webshops, en verzorgen het onderhoud. Daarnaast helpen wij met SEO en zichtbaarheid, een logo en huisstijl en webtoegankelijkheid. Elke dienst heeft een duidelijke prijs, excl. btw.',
    },
    {
      id: 'q7',
      topicKey: 'services',
      topic: 'Diensten',
      question: 'Vernieuwt u ook een bestaande website?',
      answer:
        'Ja. Wij geven uw bestaande website een nieuw ontwerp en een logische opbouw, en behouden wat goed werkt. Wij begeleiden u ook bij de overstap.',
    },
    {
      id: 'q8',
      topicKey: 'services',
      topic: 'Diensten',
      question: 'Helpt mijn website om gevonden te worden in zoekmachines?',
      answer:
        'Elke website krijgt duidelijke titels en beschrijvingen, correcte lokale gegevens en een degelijke technische basis. Wilt u verder gaan, dan starten wij met een SEO-audit en werken wij aan lokale SEO, optimalisatie van uw pagina’s, teksten die ook AI-zoekmachines goed begrijpen en vermeldingen in bedrijfsgidsen.',
    },
    {
      id: 'q9',
      topicKey: 'services',
      topic: 'Diensten',
      question: 'Kunnen klanten via mijn website een afspraak boeken?',
      answer:
        'Ja. In het pakket Vakman koppelen wij uw website aan uw boekingssysteem, zodat klanten vanaf elke pagina vlot een afspraak maken. In het pakket Start staat op elke pagina een duidelijke knop om te bellen of te mailen.',
    },
    {
      id: 'q10',
      topicKey: 'services',
      topic: 'Diensten',
      question: 'Is mijn website ook bruikbaar voor mensen met een beperking?',
      answer:
        'Daar zorgen wij voor met voldoende contrast, bediening met het toetsenbord, duidelijke formulieren en beschrijvingen bij beelden, getoetst aan WCAG 2.2 AA. Wij controleren ook bestaande websites op toegankelijkheid.',
    },
    {
      id: 'q11',
      topicKey: 'practical',
      topic: 'Praktisch',
      question: 'Werkt mijn website ook goed op een smartphone?',
      answer:
        'Ja. Wij ontwerpen elke website eerst voor kleine schermen, met lichte beelden en lichte code, zodat uw site vlot laadt en prettig leest op elk toestel.',
    },
    {
      id: 'q12',
      topicKey: 'practical',
      topic: 'Praktisch',
      question: 'Hoe neem ik contact op met Webstudio K?',
      answer:
        'Mail naar info@webstudiok.be, bel +32 14 71 80 80 of gebruik het formulier op deze pagina. Wij antwoorden persoonlijk.',
    },
    {
      id: 'q13',
      topicKey: 'workflow',
      topic: 'Werkwijze en kosten',
      question: 'Hoe lang duurt het om een website te laten maken?',
      answer:
        'Start staat binnen 5 werkdagen online, Vakman binnen 10 werkdagen en een Webshop in 3 tot 4 weken, vanaf het moment dat u het voorstel goedkeurt en wij alles hebben wat nodig is, zoals uw logo en eventueel uw foto’s. De planning voor een webshop hangt af van het aantal producten.',
    },
    {
      id: 'q14',
      topicKey: 'workflow',
      topic: 'Werkwijze en kosten',
      question: 'Kan ik zelf teksten aanpassen?',
      answer:
        'U hoeft zelf niets te doen. U laat ons weten wat er moet veranderen, en wij passen het voor u aan. Bij Start zitten 15 minuten aanpassingen per maand in de prijs, bij Vakman en Webshop 30 minuten.',
    },
    {
      id: 'q15',
      topicKey: 'workflow',
      topic: 'Werkwijze en kosten',
      question: 'Welke kosten komen elke maand terug?',
      answer:
        'Elke maand betaalt u vanaf €29 (Start), vanaf €49 (Vakman) of vanaf €79 (Webshop), excl. btw. Daarin zitten uw .be-domein, hosting, back-ups, updates en aanpassingsminuten, 15 minuten bij Start en 30 minuten bij Vakman en Webshop. Vakman en Webshop krijgen twee keer per jaar een controle van snelheid en vindbaarheid. Elk pakket loopt minimaal 12 maanden en is daarna maandelijks opzegbaar.',
    },
    {
      id: 'q16',
      topicKey: 'workflow',
      topic: 'Werkwijze en kosten',
      question: 'Kan een AI-tool mijn website maken?',
      answer:
        'Een AI-tool kan een schets maken, maar geen afgewerkte website van uw eigen zaak, met duidelijke prijzen en een aanspreekpunt na lancering. Webstudio K maakt vooraf een helder voorstel op maat, bouwt uw site volledig af en blijft beschikbaar na lancering. Toegankelijkheid en Google-basis zitten in elk pakket.',
    },
  ],
  fr: [
    {
      id: 'q1',
      topicKey: 'approach',
      topic: 'Approche',
      question: 'Comment se déroule une demande chez Webstudio K ?',
      answer:
        'Vous nous contactez par e-mail, téléphone ou via le formulaire. Nous échangeons brièvement sur votre activité et vos besoins, puis vous recevez un devis clair à prix fixe avec calendrier avant tout démarrage.',
    },
    {
      id: 'q2',
      topicKey: 'approach',
      topic: 'Approche',
      question: 'Pour quels types d’activités Webstudio K crée-t-il des sites ?',
      answer:
        'Webstudio K réalise des sites web pour chaque entrepreneur, association et indépendant en Belgique : commerce, établissement horeca, profession libérale, salon de coiffure ou artisan comme peintre ou couvreur.',
    },
    {
      id: 'q3',
      topicKey: 'approach',
      topic: 'Approche',
      question: 'Dans quelle région travaillez-vous ?',
      answer:
        'Nous accompagnons des entrepreneurs, associations et indépendants dans toute la Belgique. Les échanges se déroulent par e-mail, téléphone ou en ligne.',
    },
    {
      id: 'q4',
      topicKey: 'pricing',
      topic: 'Tarifs',
      question: 'Combien coûte la création d’un site web ?',
      answer:
        'Nous proposons trois formules : Start à partir de €490 unique et €29/mois HTVA, Artisan dès €990 unique et €49/mois HTVA, et Boutique dès €1.890 unique et €79/mois HTVA. Les services à la carte ont aussi un prix fixe : SEO local dès €149/mois, audit SEO dès €190 et logo dès €190 HTVA.',
    },
    {
      id: 'q5',
      topicKey: 'pricing',
      topic: 'Tarifs',
      question: 'Mon site peut-il évoluer par la suite ?',
      answer:
        'Oui, vous pouvez ajouter des pages ou passer à une formule supérieure à tout moment. Une page supplémentaire coûte dès €79 HTVA, dans le style de votre site et avec rédaction incluse.',
    },
    {
      id: 'q6',
      topicKey: 'services',
      topic: 'Services',
      question: 'Quels services propose Webstudio K ?',
      answer:
        'Nous réalisons des sites sur mesure, pages d’atterrissage, petites boutiques en ligne et assurons la maintenance. Nous vous aidons aussi pour le SEO local, le logo, la charte graphique et l’accessibilité web, toujours à prix clair HTVA.',
    },
    {
      id: 'q7',
      topicKey: 'services',
      topic: 'Services',
      question: 'Faites-vous aussi la refonte de sites existants ?',
      answer:
        'Oui. Nous offrons un nouveau design et une structure logique à votre site existant tout en conservant ce qui fonctionne, et nous vous accompagnons lors de la migration.',
    },
    {
      id: 'q8',
      topicKey: 'services',
      topic: 'Services',
      question: 'Mon site sera-t-il bien référencé sur Google ?',
      answer:
        'Chaque site bénéficie de balises claires, de coordonnées locales cohérentes et d’une base technique saine. Pour aller plus loin, nous démarrons par un audit SEO et travaillons le SEO local et l’optimisation pour les moteurs IA.',
    },
    {
      id: 'q9',
      topicKey: 'services',
      topic: 'Services',
      question: 'Mes clients peuvent-ils prendre rendez-vous sur le site ?',
      answer:
        'Oui. Dans le forfait Artisan, nous connectons votre site à votre système de réservation. Dans le forfait Start, un bouton clair d’appel ou d’e-mail est présent sur chaque page.',
    },
    {
      id: 'q10',
      topicKey: 'services',
      topic: 'Services',
      question: 'Mon site est-il accessible aux personnes en situation de handicap ?',
      answer:
        'Oui, nous veillons au contraste, à la navigation clavier, à la clarté des formulaires et aux descriptions d’images conformément au standard WCAG 2.2 AA.',
    },
    {
      id: 'q11',
      topicKey: 'practical',
      topic: 'Pratique',
      question: 'Mon site fonctionnera-t-il bien sur smartphone ?',
      answer:
        'Oui. Chaque site est conçu d’abord pour les petits écrans avec des images optimisées et un code léger, garantissant rapidité et confort de lecture sur tous les appareils.',
    },
    {
      id: 'q12',
      topicKey: 'practical',
      topic: 'Pratique',
      question: 'Comment contacter Webstudio K ?',
      answer:
        'Écrivez à info@webstudiok.be, appelez le +32 14 71 80 80 ou utilisez le formulaire de cette page. Nous répondons personnellement.',
    },
    {
      id: 'q13',
      topicKey: 'workflow',
      topic: 'Méthode et coûts',
      question: 'Combien de temps faut-il pour créer un site ?',
      answer:
        'Le forfait Start est en ligne sous 5 jours ouvrables, Artisan sous 10 jours ouvrables et une Boutique en 3 à 4 semaines après validation du devis et réception de vos éléments (logo, photos éventuelles).',
    },
    {
      id: 'q14',
      topicKey: 'workflow',
      topic: 'Méthode et coûts',
      question: 'Puis-je modifier les textes moi-même ?',
      answer:
        'Vous n’avez rien à gérer techniquement. Envoyez-nous vos changements et nous les appliquons : 15 minutes par mois sont comprises dans Start, 30 minutes dans Artisan et Boutique.',
    },
    {
      id: 'q15',
      topicKey: 'workflow',
      topic: 'Méthode et coûts',
      question: 'Quels sont les frais mensuels récurrents ?',
      answer:
        'À partir de €29 (Start), €49 (Artisan) ou €79 (Boutique) par mois HTVA, incluant votre domaine .be, l’hébergement, les sauvegardes, les mises à jour et le temps de modification. Engagement minimum de 12 mois, puis résiliable mensuellement.',
    },
    {
      id: 'q16',
      topicKey: 'workflow',
      topic: 'Méthode et coûts',
      question: 'Un outil d’IA peut-il créer mon site web ?',
      answer:
        'Un outil d’IA peut générer une maquette rapide, mais pas un site professionnel complet adapté à votre activité avec des tarifs clairs et un interlocuteur fiable après la mise en ligne.',
    },
  ],
  en: [
    {
      id: 'q1',
      topicKey: 'approach',
      topic: 'Approach',
      question: 'How does an inquiry work at Webstudio K?',
      answer:
        'Reach out via email, phone or the contact form. We briefly discuss your business and goals, and you receive a clear proposal with fixed pricing and timeline before anything begins.',
    },
    {
      id: 'q2',
      topicKey: 'approach',
      topic: 'Approach',
      question: 'Which businesses does Webstudio K build websites for?',
      answer:
        'Webstudio K creates websites for businesses, associations and sole traders across Belgium — from retail shops, hospitality and liberal professions to salons and skilled trades such as painters and roofers.',
    },
    {
      id: 'q3',
      topicKey: 'approach',
      topic: 'Approach',
      question: 'Which region do you serve?',
      answer:
        'We work for entrepreneurs, associations and freelancers across all of Belgium. Introductions and collaboration happen seamlessly via email, phone or online.',
    },
    {
      id: 'q4',
      topicKey: 'pricing',
      topic: 'Pricing',
      question: 'How much does a website cost?',
      answer:
        'We offer three fixed packages: Start from €490 one-time (+ €29/mo), Craftsman from €990 (+ €49/mo) and Webshop from €1.890 (+ €79/mo), excl. VAT. Standalone services also have fixed rates, such as Local SEO from €149/mo, an SEO audit from €190 and a logo from €190 excl. VAT.',
    },
    {
      id: 'q5',
      topicKey: 'pricing',
      topic: 'Pricing',
      question: 'Can my website grow later on?',
      answer:
        'Yes. You can add extra pages anytime or upgrade to a larger package. Additional pages start at €79 excl. VAT, matched to your layout with copywritten text included.',
    },
    {
      id: 'q6',
      topicKey: 'services',
      topic: 'Services',
      question: 'Which services does Webstudio K offer?',
      answer:
        'We build bespoke websites, landing pages and small webshops including maintenance. We also handle local SEO, logos and visual identity, and WCAG 2.2 AA web accessibility — always with transparent pricing excl. VAT.',
    },
    {
      id: 'q7',
      topicKey: 'services',
      topic: 'Services',
      question: 'Do you also redesign existing websites?',
      answer:
        'Yes. We give existing sites a fresh design and logical structure while keeping what already works well, guiding you smoothly through the transition.',
    },
    {
      id: 'q8',
      topicKey: 'services',
      topic: 'Services',
      question: 'Will my website help customers find me on Google?',
      answer:
        'Every site includes clear headings, descriptions, consistent local details and a clean technical base. If you want to go further, we run an SEO audit and strengthen local visibility for Google and AI search.',
    },
    {
      id: 'q9',
      topicKey: 'services',
      topic: 'Services',
      question: 'Can clients book appointments directly on my website?',
      answer:
        'Yes. In the Craftsman package we connect your site to your booking system so visitors can book from any page. The Start package features clear call and email buttons throughout.',
    },
    {
      id: 'q10',
      topicKey: 'services',
      topic: 'Services',
      question: 'Is my website usable for people with disabilities?',
      answer:
        'Yes. We ensure sufficient contrast, full keyboard operation, clear form labels and descriptive alt texts tested against WCAG 2.2 AA, and we also audit existing websites.',
    },
    {
      id: 'q11',
      topicKey: 'practical',
      topic: 'Practical',
      question: 'Does my website work smoothly on smartphones?',
      answer:
        'Yes. We design mobile-first with lightweight images and fast code so your website loads quickly and reads comfortably on every phone and desktop screen.',
    },
    {
      id: 'q12',
      topicKey: 'practical',
      topic: 'Practical',
      question: 'How do I get in touch with Webstudio K?',
      answer:
        'Email info@webstudiok.be, call +32 14 71 80 80 or fill out the form on this page. We respond personally.',
    },
    {
      id: 'q13',
      topicKey: 'workflow',
      topic: 'Workflow & costs',
      question: 'How long does it take to build a website?',
      answer:
        'Start goes live within 5 business days, Craftsman within 10 business days and a Webshop within 3 to 4 weeks once you approve the proposal and share essentials like your logo and optional photos.',
    },
    {
      id: 'q14',
      topicKey: 'workflow',
      topic: 'Workflow & costs',
      question: 'Can I update text on my website myself?',
      answer:
        'You don’t have to lift a finger. Let us know what needs changing and we update it for you — Start includes 15 minutes of edits per month, while Craftsman and Webshop include 30 minutes.',
    },
    {
      id: 'q15',
      topicKey: 'workflow',
      topic: 'Workflow & costs',
      question: 'What are the recurring monthly costs?',
      answer:
        'Monthly care starts at €29 (Start), €49 (Craftsman) or €79 (Webshop) excl. VAT. It covers your .be domain, hosting, backups, updates and monthly edits. Craftsman and Webshop also include twice-yearly speed and SEO checks. Minimum term is 12 months, cancellable monthly afterwards.',
    },
    {
      id: 'q16',
      topicKey: 'workflow',
      topic: 'Workflow & costs',
      question: 'Can an AI tool create my website instead?',
      answer:
        'An AI tool can generate a quick rough draft, not a complete website tailored to your business with transparent pricing and a human contact after launch. Every Webstudio K site ships ready with accessibility and Google essentials built in.',
    },
  ],
};

export const FAQ_ITEMS = FAQ_ITEMS_BY_LANG.nl;
export function getFaqItems(lang: Language): FaqItem[] {
  return FAQ_ITEMS_BY_LANG[lang];
}

export const STUDIO_MEDIA = {
  studioInterior: studioInteriorImg,
  studioDirector: studioDirectorImg,
};
