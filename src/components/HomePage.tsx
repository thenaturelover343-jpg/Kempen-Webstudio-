import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
} from 'lucide-react';
import {
  getAllSectors,
  getBlogArticles,
  getClientPartners,
  getFaqItems,
  getGreatestAwards,
  getImpactStatistics,
  getPricingTiers,
  getServicesList,
  getShowcaseSlides,
  getStudioPlaces,
  getTeamMembers,
  getTestimonials,
  getWorkingProcess,
  getWorkProjects,
  type PageRoute,
} from '../data/webstudioData';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslations, type FaqTopicKey } from '../i18n/translations';
import {
  PartnerBookStoreIcon,
  PartnerCronaIcon,
  PartnerMercuryIcon,
  PartnerWagerIcon,
  PartnerZanticIcon,
  ShowcaseEmblem,
} from './BrandMarks';
import { FadeIn, SectionReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenChat: (presetSubject?: string) => void;
  onSubmitSuccess?: (details: { title: string; description: string }) => void;
}

function HeroPortraitMedia({
  className = '',
  mobile = false,
  alt,
}: {
  className?: string;
  mobile?: boolean;
  alt: string;
}) {
  const mediaMaskClass = mobile ? 'hero-video-mask-mobile' : 'hero-video-mask';

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      <img
        src="/assets/aistudio/IMG_2444_816beea5.jpeg"
        alt={alt}
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className={`absolute inset-0 block w-full h-full object-cover object-[50%_10%] brightness-[1.06] contrast-[1.03] ${mediaMaskClass}`}
      />
    </div>
  );
}

function WireframeGlobeSvg({
  dark = false,
  className = '',
}: {
  dark?: boolean;
  className?: string;
}) {
  const stroke = dark ? 'rgba(255,255,255,0.13)' : 'rgba(18,18,20,0.09)';
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="160" cy="160" r="148" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <ellipse cx="160" cy="160" rx="112" ry="148" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <ellipse cx="160" cy="160" rx="68" ry="148" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <ellipse cx="160" cy="160" rx="28" ry="148" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="12" y1="160" x2="308" y2="160" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="25" y1="100" x2="295" y2="100" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="25" y1="220" x2="295" y2="220" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="65" y1="48" x2="255" y2="48" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="65" y1="272" x2="255" y2="272" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
    </svg>
  );
}

export function HomePage({ onNavigate, onOpenChat, onSubmitSuccess }: HomePageProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const showcaseSlides = getShowcaseSlides(language);
  const workProjects = getWorkProjects(language);
  const teamMembers = getTeamMembers(language);
  const allSectors = getAllSectors(language);
  const impactStatistics = getImpactStatistics(language);
  const servicesList = getServicesList(language);
  const studioPlaces = getStudioPlaces(language);
  const pricingTiers = getPricingTiers(language);
  const workingProcess = getWorkingProcess(language);
  const clientPartners = getClientPartners(language);
  const testimonials = getTestimonials(language);
  const greatestAwards = getGreatestAwards(language);
  const blogArticles = getBlogArticles(language);
  const faqItems = getFaqItems(language);

  const [slideIndex, setSlideIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [workIndex, setWorkIndex] = useState(0);
  const [activeTeamId, setActiveTeamId] = useState(teamMembers[0].id);
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [activePlaceId, setActivePlaceId] = useState(studioPlaces[0].id);
  const [activeProcessStep, setActiveProcessStep] = useState('01');
  const [activePartnerId, setActivePartnerId] = useState(clientPartners[0].id);
  const [activeAwardId, setActiveAwardId] = useState('belgie');
  const [activeFaqTopic, setActiveFaqTopic] = useState<FaqTopicKey>('all');
  const [openFaqId, setOpenFaqId] = useState<string>('q1');

  // Inline contact form state
  const [contactName, setContactName] = useState('');
  const [contactBusiness, setContactBusiness] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState(t.chat.scopeOptions[0]);
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    setContactTopic(t.chat.scopeOptions[0]);
  }, [language, t.chat.scopeOptions]);

  const [heroCursorActive, setHeroCursorActive] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const smoothAuraX = useSpring(cursorX, { stiffness: 140, damping: 26, mass: 0.6 });
  const smoothAuraY = useSpring(cursorY, { stiffness: 140, damping: 26, mass: 0.6 });
  const smoothDotX = useSpring(cursorX, { stiffness: 360, damping: 28, mass: 0.3 });
  const smoothDotY = useSpring(cursorY, { stiffness: 360, damping: 28, mass: 0.3 });

  const rawShiftX = useTransform(normX, [-1, 1], [-12, 12]);
  const rawShiftY = useTransform(normY, [-1, 1], [-8, 8]);
  const crystalShiftX = useSpring(rawShiftX, { stiffness: 110, damping: 24 });
  const crystalShiftY = useSpring(rawShiftY, { stiffness: 110, damping: 24 });

  const handleHeroMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (!isDesktop || prefersReducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorX.set(x);
    cursorY.set(y);
    normX.set(rect.width > 0 ? ((x / rect.width) - 0.5) * 2 : 0);
    normY.set(rect.height > 0 ? ((y / rect.height) - 0.5) * 2 : 0);
    if (!heroCursorActive) setHeroCursorActive(true);
  };

  const handleHeroMouseLeave = () => {
    setHeroCursorActive(false);
    normX.set(0);
    normY.set(0);
  };

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const currentSlide = showcaseSlides[slideIndex];
  const currentWork = workProjects[workIndex];
  const activeTeamMember =
    teamMembers.find((m) => m.id === activeTeamId) ?? teamMembers[0];
  const activeStat = impactStatistics[activeStatIndex];
  const activePlace =
    studioPlaces.find((p) => p.id === activePlaceId) ?? studioPlaces[0];
  const activePartner =
    clientPartners.find((p) => p.id === activePartnerId) ?? clientPartners[0];

  const filteredFaqs =
    activeFaqTopic === 'all'
      ? faqItems
      : faqItems.filter((f) => f.topicKey === activeFaqTopic);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
      setContactError(t.home.contactErrorEmail);
      return;
    }
    if (contactName.trim().length < 2) {
      setContactError(t.home.contactErrorName);
      return;
    }
    setContactError('');
    setContactSent(true);
    onSubmitSuccess?.({
      title: t.home.contactToastTitle,
      description: t.home.contactToastDescription(
        contactName.trim(),
        contactEmail.trim()
      ),
    });
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[calc(100vh-76px)] w-full hero-canvas flex flex-col justify-between overflow-hidden"
      >
        {/* Desktop Decorative Cursor Follow Effect */}
        {isDesktop && !prefersReducedMotion && (
          <>
            <motion.div
              aria-hidden="true"
              style={{
                x: smoothAuraX,
                y: smoothAuraY,
                background:
                  'radial-gradient(circle, rgba(184,93,40,0.14) 0%, rgba(251,77,39,0.06) 36%, rgba(255,255,255,0) 70%)',
              }}
              animate={{ opacity: heroCursorActive ? 1 : 0 }}
              transition={{ duration: 0.28 }}
              className="pointer-events-none absolute top-0 left-0 z-[12] w-[360px] h-[360px] -ml-[180px] -mt-[180px] rounded-full"
            />
            <motion.div
              aria-hidden="true"
              style={{ x: smoothDotX, y: smoothDotY }}
              animate={{
                opacity: heroCursorActive ? 1 : 0,
                scale: heroCursorActive ? 1 : 0.75,
              }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute top-0 left-0 z-[25] w-6 h-6 -ml-3 -mt-3 rounded-full border border-[#B85D28]/45 bg-[#FB4D27]/10 flex items-center justify-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB4D27]/80" />
            </motion.div>
          </>
        )}
        {/* Mobile/Tablet First Viewport: Foreground Centerpiece Portrait right below Header */}
        {!isDesktop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 w-full flex items-center justify-center pt-1 pb-0 px-3"
          >
            <HeroPortraitMedia
              mobile
              alt={t.home.heroPortraitAlt}
              className="w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4]"
            />
          </motion.div>
        )}

        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 pt-2 sm:pt-6 lg:pt-12 pb-2 sm:pb-6 flex-1 flex flex-col justify-start lg:justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
            {/* Left Hero Column */}
            <div className="relative z-20 lg:col-span-5 flex flex-col items-start">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.02, ease: [0.16, 1, 0.3, 1] }}
                className="text-[13px] sm:text-[13.5px] text-[#3F3F46] font-normal tracking-[-0.01em] mb-3 sm:mb-4"
              >
                {t.home.heroEyebrow}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.85rem,8.2vw,3.1rem)] sm:text-[48px] lg:text-[46px] xl:text-[56px] 2xl:text-[64px] leading-[0.98] tracking-[-0.04em] font-medium select-text max-w-full"
              >
                <span className="block text-[#18181B]">{t.home.heroLine1}</span>
                <span className="block whitespace-nowrap">
                  <span className="text-[#18181B]">{t.home.heroLine2Start}</span>
                  <span className="headline-fade-delivering">{t.home.heroLine2Accent}</span>
                </span>
                <span className="block whitespace-nowrap">
                  <span className="text-[#18181B]">{t.home.heroLine3Start}</span>
                  <span className="headline-fade-mat">{t.home.heroLine3Accent}</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#4C433F] max-w-md lg:max-w-[380px] xl:max-w-[420px]"
              >
                {t.home.heroSubtitle}
              </motion.p>

              {/* Trust Strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 sm:gap-3.5"
              >
                <div className="flex items-center gap-1" aria-label={t.home.heroStarsAria}>
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] fill-[#9B6341] text-[#9B6341]"
                    />
                  ))}
                </div>
                <span className="text-[13px] sm:text-[13.5px] text-[#4C433F] font-normal tracking-[-0.01em]">
                  {t.home.heroTrustStrip}
                </span>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                  className="group inline-flex items-center gap-3 sm:gap-3.5 rounded-full bg-[#121214] hover:bg-[#232327] text-white pl-5 pr-1.5 py-1.5 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{t.home.heroPrimaryCta}</span>
                  <span className="w-8 h-8 rounded-full bg-white text-[#121214] flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollToSection('works-section')}
                  className="inline-flex items-center justify-center rounded-full bg-[#4C433F] hover:bg-[#3A3330] text-white px-6 sm:px-7 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {t.home.heroSecondaryCta}
                </motion.button>
              </motion.div>
            </div>

            {/* Right Hero Column */}
            <FadeIn
              immediate
              delay={0.14}
              className="relative z-20 lg:col-span-4 lg:col-start-9 flex flex-col items-stretch lg:items-end justify-between lg:min-h-[395px] pt-1 lg:pt-2"
            >
              {/* Frosted Showcase Card */}
              <div className="order-2 lg:order-1 mt-6 lg:mt-0 mx-auto lg:mx-0 w-full max-w-[360px] xl:max-w-[392px] rounded-[24px] sm:rounded-[28px] p-3 sm:p-3.5 bg-gradient-to-br from-[#C4C5C8]/90 via-[#B8B9BC]/85 to-[#ABACB0]/90 border border-white/30 flex items-stretch gap-3.5 sm:gap-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] backdrop-blur-xs">
                <div className="w-[126px] sm:w-[172px] h-[152px] sm:h-[176px] shrink-0 rounded-[18px] sm:rounded-[20px] bg-[#040405] flex items-center justify-center">
                  <ShowcaseEmblem />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-1 sm:py-1.5 pr-0.5 sm:pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#18181B] tabular-nums">
                      {currentSlide.index}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('Vision')}
                      aria-label={t.home.showcaseMenuAria}
                      className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-[#18181B]/12 hover:bg-[#18181B]/22 flex flex-col items-center justify-center gap-[2.5px] transition-colors cursor-pointer shrink-0"
                    >
                      <span className="block w-2.5 h-[1.5px] bg-[#18181B]" />
                      <span className="block w-2.5 h-[1.5px] bg-[#18181B]" />
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${language}-${currentSlide.index}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      className="my-auto pt-1 sm:pt-2"
                    >
                      <p className="text-[19px] sm:text-[22px] leading-[1.12] font-medium tracking-[-0.02em] text-[#141416]">
                        {currentSlide.titleLine1}
                        <br />
                        {currentSlide.titleLine2}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-between gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <div className="flex-1 max-w-[80px] min-w-[36px] h-[2px] bg-[#18181B]/20 relative overflow-hidden">
                      <div
                        className={`absolute top-0 h-full w-1/2 bg-[#18181B] transition-transform duration-200 ${
                          slideIndex === 0 ? 'translate-x-0' : 'translate-x-full'
                        }`}
                      />
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setSlideIndex((prev) =>
                            prev === 0 ? showcaseSlides.length - 1 : prev - 1
                          )
                        }
                        aria-label={t.home.showcasePrevAria}
                        className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-[#18181B]/12 hover:bg-[#18181B]/22 text-[#141416] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSlideIndex((prev) => (prev + 1) % showcaseSlides.length)
                        }
                        aria-label={t.home.showcaseNextAria}
                        className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-[#18181B]/15 hover:bg-[#18181B]/25 text-[#141416] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sectors Strip */}
              <div className="order-1 lg:order-2 w-full lg:max-w-[408px] mt-4 sm:mt-6 lg:mt-16 flex flex-col items-end">
                <p className="text-[13px] font-medium text-[#18181B] mb-3 text-right">
                  {t.home.sectorsStripTitle}
                </p>

                <div className="flex flex-wrap items-center justify-end gap-x-4 sm:gap-x-5 gap-y-2 text-[12px] sm:text-[12.5px] text-[#4C433F]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#18181B] whitespace-nowrap">
                    <PartnerZanticIcon />
                    <span>{allSectors[0]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#4C433F] whitespace-nowrap">
                    <PartnerBookStoreIcon />
                    <span>{allSectors[1]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#4C433F] whitespace-nowrap">
                    <PartnerWagerIcon />
                    <span>{allSectors[2]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#4C433F] whitespace-nowrap">
                    <PartnerCronaIcon />
                    <span>{allSectors[3]}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-x-4 sm:gap-x-6 gap-y-2 mt-2 text-[12px] sm:text-[12.5px] text-[#4C433F]">
                  <span className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap">
                    <PartnerMercuryIcon />
                    <span>{allSectors[4]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap">
                    <PartnerWagerIcon />
                    <span>{allSectors[5]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap">
                    <PartnerCronaIcon />
                    <span>{allSectors[6]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap">
                    <PartnerBookStoreIcon />
                    <span>{allSectors[7]}</span>
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Desktop Foreground Centerpiece Photo */}
        {isDesktop && (
          <motion.div
            aria-hidden="true"
            style={
              prefersReducedMotion
                ? undefined
                : { x: crystalShiftX, y: crystalShiftY }
            }
            className="flex pointer-events-none absolute inset-x-0 top-[10px] bottom-[95px] z-30 items-center justify-center overflow-visible"
          >
            <HeroPortraitMedia
              alt={t.home.heroPortraitAlt}
              className="w-[310px] xl:w-[370px] 2xl:w-[420px] aspect-[3/4]"
            />
          </motion.div>
        )}

        {/* Bottom Giant Wordmark + Floating Dark Bar */}
        <div className="relative w-full pt-6 sm:pt-10 pb-5 sm:pb-6 overflow-hidden">
          <div
            aria-hidden="true"
            className="relative z-[5] pointer-events-none select-none w-full flex justify-center items-end overflow-hidden leading-[0.92] px-4"
          >
            <span className="wordmark-gradient font-semibold tracking-[-0.025em] text-[12.5vw] sm:text-[12vw] lg:text-[11vw] whitespace-nowrap">
              WEBSTUDIO K
            </span>
          </div>

          <div className="relative z-[35] w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 mt-3 sm:mt-4">
            <div className="w-full rounded-2xl sm:rounded-full bg-[#121214]/95 backdrop-blur-md text-[#E4E4E7] px-5 sm:px-8 lg:px-10 min-h-[48px] sm:h-[54px] py-3 sm:py-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-4 gap-y-1.5 text-[12px] sm:text-[13px] lg:text-[13.5px] font-normal shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <span aria-hidden="true" className="text-[#E4E4E7]">•</span>
                <span>{t.home.barPrice}</span>
              </span>

              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <span aria-hidden="true" className="text-[#E4E4E7]">•</span>
                <span>{t.home.barProposal}</span>
              </span>

              <button
                type="button"
                onClick={() => scrollToSection('about-intro-section')}
                className="inline-flex items-center gap-2 whitespace-nowrap hover:text-white transition-colors cursor-pointer"
              >
                <span aria-hidden="true" className="text-[#E4E4E7]">•</span>
                <span>{t.home.barScroll}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHITE FULL-WIDTH INTRO + 4-CAPSULE ROW */}
      <SectionReveal
        id="about-intro-section"
        className="relative bg-[#FFFFFF] text-[#121214] overflow-hidden"
      >
        {/* Subtle Wireframe Globe SVG Top-Left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-12 w-[320px] h-[320px] opacity-65"
        >
          <WireframeGlobeSvg />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="contents lg:flex lg:col-span-5 lg:flex-col lg:justify-between lg:gap-20">
                <div className="order-1">
                  <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                    {t.home.sec2Badge}
                  </span>
                </div>

                <div className="order-3 lg:order-2 flex items-center gap-3.5 text-[12px] text-[#4C433F]">
                  <div className="w-8 h-8 rounded-full border border-[#D3D6DA] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-[#121214]" />
                  </div>
                  <div className="border-l border-[#D3D6DA] pl-3 leading-snug max-w-xs">
                    <p>{t.home.sec2GlobeLine1}</p>
                    <p>{t.home.sec2GlobeLine2}</p>
                  </div>
                </div>
              </div>

              <div className="order-2 lg:order-none lg:col-span-7">
                <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] leading-[1.16] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance] text-center lg:text-left">
                  {t.home.sec2HeadingMain}{' '}
                  <span className="text-[#4C433F]">
                    {t.home.sec2HeadingMuted}
                  </span>
                </h2>

                <div className="mt-8 sm:mt-10 pt-5 border-t border-[#E5E7EB]">
                  <p className="text-[11.5px] text-[#4C433F] mb-4">
                    {t.home.sec2ReplyNote}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <a
                        href="mailto:info@webstudiok.be"
                        aria-label={t.home.sec2MailAria}
                        className="w-9 h-9 rounded-full copper-pill-gradient text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href="tel:+3214718080"
                        aria-label={t.home.sec2CallAria}
                        className="w-9 h-9 rounded-full bg-[#F2F2F2] hover:bg-[#D3D6DA] text-[#4C433F] flex items-center justify-center transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => onNavigate('About')}
                        aria-label={t.home.sec2ExamplesAria}
                        className="w-9 h-9 rounded-full bg-[#F2F2F2] hover:bg-[#D3D6DA] text-[#4C433F] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate('About')}
                      className="inline-flex items-center gap-2 rounded-full border border-[#D3D6DA] bg-white hover:bg-[#F2F2F2] px-4 py-2 text-[12.5px] font-medium text-[#121214] transition-colors cursor-pointer"
                    >
                      <span>{t.home.sec2AllExamplesCta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 4-Capsule Kinetic Row */}
          <StaggerGroup className="mt-12 sm:mt-16 grid grid-cols-1 max-w-[236px] mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StaggerItem>
              <button
                type="button"
                onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                className="w-full h-[96px] sm:h-[120px] rounded-full bg-[#F2F2F2] hover:bg-[#E7E8EB] flex items-center justify-center text-[24px] sm:text-[32px] font-normal tracking-[-0.03em] text-[#121214] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                {t.home.capsule1}
              </button>
            </StaggerItem>
            <StaggerItem>
              <button
                type="button"
                onClick={() => scrollToSection('werkwijze-section')}
                className="w-full h-[96px] sm:h-[120px] rounded-full copper-capsule-gradient flex items-center justify-center text-[24px] sm:text-[32px] font-normal tracking-[-0.03em] text-white transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                {t.home.capsule2}
              </button>
            </StaggerItem>
            <StaggerItem>
              <button
                type="button"
                onClick={() => scrollToSection('works-section')}
                aria-label={t.home.capsule3Aria}
                className="w-full h-[96px] sm:h-[120px] rounded-full bg-[#050507] hover:bg-[#1B1B1E] text-white flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
              </button>
            </StaggerItem>
            <StaggerItem>
              <button
                type="button"
                onClick={() => onNavigate('Services')}
                className="w-full h-[96px] sm:h-[120px] rounded-full bg-[#D3D6DA] hover:bg-[#C3C6CB] flex items-center justify-center text-[24px] sm:text-[32px] font-normal tracking-[-0.03em] text-[#18181B] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                {t.home.capsule4}
              </button>
            </StaggerItem>
          </StaggerGroup>
        </div>

        {/* SECTION 3: VOORBEELDONTWERPEN (9 Examples) */}
        <div
          id="works-section"
          className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-6 sm:pt-10 pb-16 sm:pb-24"
        >
          <FadeIn className="text-center mb-8 sm:mb-10">
            <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
              {t.home.sec3Badge}
            </span>
            <h2 className="mt-3 text-[34px] sm:text-[46px] lg:text-[54px] leading-[1.04] tracking-[-0.035em] font-normal text-[#121214]">
              {t.home.sec3Title}
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-[14px] text-[#4C433F] leading-relaxed">
              {t.home.sec3Subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="relative rounded-[24px] sm:rounded-[32px] bg-[#050507] text-white p-7 sm:p-12 lg:p-14 min-h-[420px] sm:min-h-[480px] flex flex-col justify-between overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 text-[12px] text-[#929090] tabular-nums">
                <span>
                  0{workIndex + 1} / 0{workProjects.length} · {currentWork.category}
                </span>
                <div className="flex items-center gap-1.5">
                  {workProjects.map((proj, idx) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setWorkIndex(idx)}
                      aria-label={`${t.home.sec3SelectAriaPrefix} ${proj.title}`}
                      className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                        idx === workIndex
                          ? 'w-6 bg-[#D47A3B]'
                          : 'w-1.5 bg-white/25 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Center Emblem + Circular Arrow */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${language}-${currentWork.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="my-10 sm:my-14 flex items-center justify-center relative"
                >
                  <div className="flex items-center justify-center gap-8 sm:gap-14">
                    <span className="text-[28px] sm:text-[42px] font-semibold tracking-tight text-white text-center">
                      {currentWork.title.slice(0, 2).toUpperCase()}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setWorkIndex((prev) => (prev + 1) % workProjects.length)
                      }
                      aria-label={t.home.sec3NextAria}
                      className="w-12 h-12 rounded-full bg-[#242426] hover:bg-[#B85D28] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Quick Switcher for all 9 examples */}
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {workProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setWorkIndex(idx)}
                    className={`rounded-full px-3.5 py-1.5 text-[11.5px] transition-colors cursor-pointer ${
                      idx === workIndex
                        ? 'copper-pill-gradient text-white font-medium'
                        : 'bg-white/8 text-[#929090] hover:text-white hover:bg-white/15'
                    }`}
                  >
                    {proj.title}
                  </button>
                ))}
              </div>

              {/* Bottom Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${language}-${currentWork.id}-details`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-4 border-t border-white/10"
                >
                  <div className="max-w-md">
                    <p className="text-[11.5px] text-[#D47A3B] font-medium mb-1">
                      {currentWork.category}
                    </p>
                    <h3 className="text-[26px] sm:text-[32px] font-normal tracking-[-0.025em] text-white">
                      {currentWork.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] sm:text-[13px] leading-relaxed text-[#929090]">
                      {currentWork.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#D3D6DA]">
                    {currentWork.disciplines.map((disc) => (
                      <span
                        key={disc}
                        className="rounded-full border border-white/20 px-4 py-1.5 whitespace-nowrap"
                      >
                        {disc}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        onOpenChat(`${currentWork.title} (${currentWork.category})`)
                      }
                      className="rounded-full bg-white text-[#121214] hover:bg-[#F2F2F2] px-4 py-1.5 font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {t.home.sec3ProposalForCase}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 rounded-[20px] bg-[#F2F2F2] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[15px] font-medium text-[#121214]">
                  {t.home.sec3NotListedTitle}
                </p>
                <p className="text-[13px] text-[#4C433F] mt-0.5">
                  {t.home.sec3NotListedBody}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                className="inline-flex items-center gap-2 rounded-full bg-[#121214] hover:bg-[#27272A] text-white px-5 py-2.5 text-[12.5px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{t.home.sec3CustomProposalCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* SECTION 4: EEN PAAR SECTOREN UITGELICHT */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-6 sm:pt-12 pb-16 sm:pb-24">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Top-left Heading */}
              <div className="lg:col-span-5">
                <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                  {t.home.sec4Badge}
                </span>
                <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214]">
                  {t.home.sec4TitleLine1}
                  <br />
                  {t.home.sec4TitleLine2}
                </h2>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${language}-${activeTeamMember.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 max-w-sm"
                  >
                    <p className="text-[14px] font-medium text-[#121214]">
                      {activeTeamMember.name} ·{' '}
                      <span className="text-[#4C433F] font-normal">
                        {activeTeamMember.experience}
                      </span>
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#4C433F]">
                      {activeTeamMember.bio}
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenChat(activeTeamMember.ctaLabel)}
                      className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#B85D28] hover:text-[#121214] transition-colors cursor-pointer"
                    >
                      <span>{activeTeamMember.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Top-right 3 Portraits */}
              <div className="lg:col-span-7 grid grid-cols-3 gap-3 justify-items-center lg:flex lg:flex-wrap lg:justify-end lg:gap-6">
                {teamMembers.slice(0, 3).map((member) => {
                  const isSelected = member.id === activeTeamId;
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setActiveTeamId(member.id)}
                      className="relative group flex flex-col items-center cursor-pointer"
                    >
                      <div
                        className={`w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-[#D3D6DA] transition-transform duration-200 ${
                          isSelected ? 'scale-[1.03]' : 'opacity-90 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {isSelected ? (
                        <span className="mt-2 rounded-full copper-pill-gradient text-white text-[11px] font-medium px-3 py-1 shadow-md whitespace-nowrap">
                          {member.name}
                        </span>
                      ) : (
                        <span className="mt-2 text-[11px] sm:text-[11.5px] font-medium text-[#4C433F] text-center">
                          {member.name}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row: 2 Sectors Left + 8+ Sectors Circle Right */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 justify-items-center sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
              <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                {teamMembers.slice(3, 5).map((member) => {
                  const isSelected = member.id === activeTeamId;
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setActiveTeamId(member.id)}
                      className="relative group flex flex-col items-center cursor-pointer"
                    >
                      <div
                        className={`w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-[#D3D6DA] transition-transform duration-200 ${
                          isSelected ? 'scale-[1.03]' : 'opacity-90 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {isSelected ? (
                        <span className="mt-2 rounded-full copper-pill-gradient text-white text-[11px] font-medium px-3 py-1 shadow-md whitespace-nowrap">
                          {member.name}
                        </span>
                      ) : (
                        <span className="mt-2 text-[11px] sm:text-[11.5px] font-medium text-[#4C433F] text-center">
                          {member.name}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => onNavigate('About')}
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-[#4C433F] hover:bg-[#121214] text-white flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <span className="text-[24px] sm:text-[32px] lg:text-[34px] font-normal tabular-nums leading-none">
                  {t.home.sec4MoreSectorsNum}
                </span>
                <span className="mt-1 text-[11px] sm:text-[11.5px] opacity-90">
                  {t.home.sec4MoreSectorsLabel}
                </span>
              </button>
            </div>

            {/* Bottom Divider Labels */}
            <div className="mt-10 pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-[#4C433F]">
              <span>{t.home.sec4FooterLeft}</span>
              <span>{t.home.sec4FooterMid}</span>
              <button
                type="button"
                onClick={() => onNavigate('About')}
                className="hover:text-[#121214] transition-colors cursor-pointer"
              >
                {t.home.sec4FooterRight}
              </button>
            </div>
          </FadeIn>
        </div>

        {/* SECTION 5: VOOR EN NA */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-10 sm:pt-16 pb-20 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <FadeIn className="lg:col-span-5 flex flex-col justify-between lg:min-h-[380px]">
              <div>
                <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                  {t.home.sec5Badge}
                </span>
                <h2 className="mt-4 text-[30px] sm:text-[40px] leading-[1.06] tracking-[-0.03em] font-normal text-[#121214] [text-wrap:balance]">
                  {t.home.sec5Title}
                </h2>

                <button
                  type="button"
                  onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#08080A] hover:bg-[#232327] text-white pl-5 pr-1.5 py-1.5 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  <span>{t.home.sec5Cta}</span>
                  <span className="w-8 h-8 rounded-full bg-white text-[#08080A] flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

              <div className="mt-12 flex items-center gap-3.5 text-[11.5px] text-[#4C433F]">
                <div className="w-7 h-7 rounded-full border border-[#D3D6DA] flex items-center justify-center shrink-0">
                  <span className="w-3 h-3 rounded-full border border-[#4C433F]" />
                </div>
                <div className="border-l border-[#D3D6DA] pl-3 leading-snug">
                  <p>{t.home.sec5NoteLine1}</p>
                  <p>{t.home.sec5NoteLine2}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-7 flex lg:justify-end">
              <div className="w-full max-w-[490px] rounded-[24px] sm:rounded-[28px] copper-panel-gradient p-6 sm:p-10 flex items-center justify-center">
                <div className="w-full max-w-[320px] rounded-[20px] bg-[#050507] text-white p-6 sm:p-7 flex flex-col justify-between min-h-[340px] shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center text-[11px] font-semibold">
                      K
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStatIndex(
                          (prev) => (prev + 1) % impactStatistics.length
                        )
                      }
                      className="rounded-full border border-white/25 hover:border-white/60 px-3 py-1 text-[10.5px] text-white/90 transition-colors cursor-pointer"
                    >
                      {activeStat.periodLabel}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${language}-${activeStat.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                      className="my-auto"
                    >
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-[48px] sm:text-[56px] leading-none font-normal tracking-[-0.04em] tabular-nums">
                          {activeStat.value}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#929090]" />
                      </div>
                      <p className="mt-3 text-[14px]">
                        <span className="text-white">{activeStat.highlightText} </span>
                        <span className="text-[#929090]">{activeStat.mutedText}</span>
                      </p>
                      <p className="mt-3 text-[11px] text-[#A1A1AA] leading-relaxed">
                        {activeStat.footnote}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* 5-Segment Indicator */}
                  <div className="grid grid-cols-5 gap-1.5 pt-4">
                    {impactStatistics.map((stat, idx) => (
                      <button
                        key={stat.id}
                        type="button"
                        onClick={() => setActiveStatIndex(idx)}
                        aria-label={`${t.home.sec5StatButtonPrefix} ${stat.periodLabel}`}
                        className={`h-[2.5px] rounded-full transition-colors cursor-pointer ${
                          idx === activeStatIndex ? 'bg-white' : 'bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionReveal>

      {/* SECTION 6 & 7: DARK OBSIDIAN SECTION — DIENSTEN & WERKGEBIED BELGIË */}
      <SectionReveal className="relative bg-[#070709] text-white rounded-t-[28px] sm:rounded-t-[40px] overflow-hidden -mt-4">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 pb-16 sm:pb-24 relative">
          {/* Top-right subtle Belgium note */}
          <div className="hidden lg:flex items-center gap-2.5 justify-end text-[11.5px] text-[#929090] mb-6">
            <span className="text-right leading-tight">
              {t.home.sec6TopNote1}
              <br />
              {t.home.sec6TopNote2}
            </span>
            <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white">
              <Globe className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column */}
            <FadeIn className="lg:col-span-4 flex flex-col justify-between lg:min-h-[540px]">
              <div>
                <span className="inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[11.5px] font-medium text-[#D3D6DA]">
                  {t.home.sec6Badge}
                </span>
                <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-white">
                  {t.home.sec6TitleLine1}
                  <br />
                  {t.home.sec6TitleLine2}
                </h2>
                <p className="mt-4 text-[13.5px] leading-relaxed text-[#929090]">
                  {t.home.sec6Subtitle}
                </p>

                <button
                  type="button"
                  onClick={() => onNavigate('Services')}
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-white hover:bg-[#F2F2F2] text-[#08080A] pl-5 pr-1.5 py-1.5 min-h-[42px] text-[12.5px] font-medium transition-colors cursor-pointer"
                >
                  <span>{t.home.sec6Cta}</span>
                  <span className="w-7 h-7 rounded-full bg-[#08080A] text-white flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

              <div className="mt-12 lg:mt-0">
                <p className="text-[11.5px] text-[#929090]">
                  {t.home.sec6VatNote}
                </p>
              </div>
            </FadeIn>

            {/* Right 2x2 Asymmetric Staggered Service Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="hidden sm:block" />
              <FadeIn delay={0.05}>
                <button
                  type="button"
                  onClick={() => onNavigate('Services')}
                  className="group w-full text-left rounded-[20px] copper-panel-gradient p-6 sm:p-7 min-h-[210px] sm:min-h-[230px] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <div>
                    <h3 className="text-[18px] font-medium text-white">
                      {servicesList[0].title}
                    </h3>
                    <p className="mt-2 text-[12px] text-white/85 leading-relaxed">
                      {servicesList[0].shortDesc}
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-2 pt-6">
                    <span className="text-[56px] sm:text-[64px] leading-[0.8] font-normal tracking-[-0.04em] text-white/90 tabular-nums">
                      01.
                    </span>
                    <div className="text-right text-[11px] text-white leading-snug">
                      <p className="font-medium">{servicesList[0].outcomeMetric}</p>
                      {servicesList[0].hashtags.map((tag) => (
                        <p key={tag} className="text-white/85">{tag}</p>
                      ))}
                    </div>
                  </div>
                </button>
              </FadeIn>

              <FadeIn delay={0.1}>
                <button
                  type="button"
                  onClick={() => onNavigate('Services')}
                  className="group w-full text-left rounded-[20px] bg-[#1C1C1E] hover:bg-[#262629] border border-white/10 p-6 sm:p-7 min-h-[210px] sm:min-h-[230px] flex flex-col justify-between transition-colors duration-200 cursor-pointer"
                >
                  <div>
                    <h3 className="text-[18px] font-medium text-white">
                      {servicesList[1].title}
                    </h3>
                    <p className="mt-2 text-[12.5px] text-[#D3D6DA]/90 leading-relaxed">
                      {servicesList[1].shortDesc}
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-2 pt-6">
                    <span className="text-[56px] sm:text-[64px] leading-[0.8] font-normal tracking-[-0.04em] text-[#D47A3B] tabular-nums">
                      02.
                    </span>
                    <div className="text-right text-[11px] text-[#D3D6DA] leading-snug">
                      <p className="font-medium text-[#D47A3B]">
                        {servicesList[1].outcomeMetric}
                      </p>
                      {servicesList[1].hashtags.map((tag) => (
                        <p key={tag} className="text-[#D3D6DA]/80">{tag}</p>
                      ))}
                    </div>
                  </div>
                </button>
              </FadeIn>

              <FadeIn delay={0.14}>
                <button
                  type="button"
                  onClick={() => onNavigate('Services')}
                  className="group w-full text-left rounded-[20px] bg-[#1C1C1E] hover:bg-[#262629] border border-white/10 p-6 sm:p-7 min-h-[210px] sm:min-h-[230px] flex flex-col justify-between transition-colors duration-200 cursor-pointer"
                >
                  <div>
                    <h3 className="text-[18px] font-medium text-white">
                      {servicesList[2].title}
                    </h3>
                    <p className="mt-2 text-[12.5px] text-[#D3D6DA]/90 leading-relaxed">
                      {servicesList[2].shortDesc}
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-2 pt-6">
                    <span className="text-[56px] sm:text-[64px] leading-[0.8] font-normal tracking-[-0.04em] text-[#D47A3B] tabular-nums">
                      03.
                    </span>
                    <div className="text-right text-[11px] text-[#D3D6DA] leading-snug">
                      <p className="font-medium text-[#D47A3B]">
                        {servicesList[2].outcomeMetric}
                      </p>
                      {servicesList[2].hashtags.map((tag) => (
                        <p key={tag} className="text-[#D3D6DA]/80">{tag}</p>
                      ))}
                    </div>
                  </div>
                </button>
              </FadeIn>

              <div className="hidden sm:block" />
              <FadeIn delay={0.18}>
                <button
                  type="button"
                  onClick={() => onNavigate('Services')}
                  className="group w-full text-left rounded-[20px] bg-[#1C1C1E] hover:bg-[#262629] border border-white/10 p-6 sm:p-7 min-h-[210px] sm:min-h-[230px] flex flex-col justify-between transition-colors duration-200 cursor-pointer"
                >
                  <div>
                    <h3 className="text-[18px] font-medium text-white">
                      {servicesList[3].title}
                    </h3>
                    <p className="mt-2 text-[12.5px] text-[#D3D6DA]/90 leading-relaxed">
                      {servicesList[3].shortDesc}
                    </p>
                  </div>
                  <div className="flex items-end justify-between gap-2 pt-6">
                    <span className="text-[56px] sm:text-[64px] leading-[0.8] font-normal tracking-[-0.04em] text-[#D47A3B] tabular-nums">
                      04.
                    </span>
                    <div className="text-right text-[11px] text-[#D3D6DA] leading-snug">
                      <p className="font-medium text-[#D47A3B]">
                        {servicesList[3].outcomeMetric}
                      </p>
                      {servicesList[3].hashtags.map((tag) => (
                        <p key={tag} className="text-[#D3D6DA]/80">{tag}</p>
                      ))}
                    </div>
                  </div>
                </button>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* SECTION 7: WERKGEBIED BELGIË */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-20 sm:pb-28">
          <FadeIn className="text-center mb-10 sm:mb-12">
            <span className="inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[11.5px] font-medium text-[#D3D6DA]">
              {t.home.sec7Badge}
            </span>
            <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-white">
              {t.home.sec7Title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="relative min-h-[340px] sm:min-h-[400px] rounded-[24px] wireframe-globe-dark flex flex-col items-center justify-center p-6 overflow-hidden">
              {studioPlaces.map((place) => {
                const isActive = place.id === activePlaceId;
                return (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => setActivePlaceId(place.id)}
                    style={{
                      left: `${place.coordinates.x}%`,
                      top: `${place.coordinates.y}%`,
                    }}
                    className={`hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-transform duration-200 cursor-pointer ${
                      isActive ? 'scale-110 z-20' : 'opacity-70 hover:opacity-100 z-10'
                    }`}
                  >
                    <span
                      className={`text-[10.5px] font-medium whitespace-nowrap ${
                        isActive ? 'text-[#D47A3B]' : 'text-[#D3D6DA]'
                      }`}
                    >
                      {place.city}
                    </span>
                    <MapPin
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#D47A3B]' : 'text-white'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Center Spotlight */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${language}-${activePlace.id}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-20 flex flex-col items-center text-center max-w-[300px]"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/20 bg-[#141416] shadow-2xl">
                    <img
                      src={activePlace.portrait}
                      alt={activePlace.director}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="mt-3 text-[11px] text-[#929090]">
                    {activePlace.countryLabel}
                  </p>
                  <p className="mt-2 text-[14px] font-medium text-white leading-snug">
                    {activePlace.teamLabel}
                    <br />
                    <span className="text-[#D3D6DA] font-normal">
                      {activePlace.subLabel}
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={() => onOpenChat(`${t.home.sec7Cta} (${activePlace.city})`)}
                    className="mt-5 rounded-full copper-pill-gradient hover:opacity-90 text-white px-5 py-2 text-[11.5px] font-medium transition-opacity cursor-pointer"
                  >
                    {t.home.sec7Cta}
                  </button>
                </motion.div>
              </AnimatePresence>

              {/* Mobile Selector */}
              <div className="flex md:hidden flex-wrap justify-center gap-2 mt-6">
                {studioPlaces.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => setActivePlaceId(place.id)}
                    className={`px-3 py-1.5 rounded-full text-[11.5px] cursor-pointer ${
                      place.id === activePlaceId
                        ? 'copper-pill-gradient text-white'
                        : 'bg-[#1D1D20] text-[#D3D6DA]'
                    }`}
                  >
                    {place.city}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionReveal>

      {/* SECTION 8 & 9: WHITE ROUNDED SECTION — PAKKETTEN & WERKWIJZE */}
      <SectionReveal className="relative bg-[#FFFFFF] text-[#121214] rounded-t-[28px] sm:rounded-t-[40px] -mt-4 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 pb-16 sm:pb-24">
          {/* Pakketten */}
          <FadeIn className="text-center">
            <span className="inline-block rounded-md bg-[#B85D28]/10 border border-[#B85D28]/20 px-3 py-1 text-[11.5px] font-medium text-[#5E2A11]">
              {t.home.sec8Badge}
            </span>
            <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214]">
              {t.home.sec8Title}
            </h2>
            <p className="mt-3 text-[14px] text-[#4C433F] max-w-xl mx-auto">
              {t.home.sec8Subtitle}
            </p>
          </FadeIn>

          <StaggerGroup className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">
            {pricingTiers.map((tier) => {
              const isObsidianTier = tier.id === 'webshop';
              const isCopperTier = tier.featured;

              const cardSurface = isCopperTier
                ? 'copper-panel-gradient text-white shadow-[0_18px_40px_rgba(184,93,40,0.22)]'
                : isObsidianTier
                ? 'bg-[#070709] text-white border border-[#B85D28]/45 shadow-[0_16px_36px_rgba(7,7,9,0.14)]'
                : 'bg-[#F2F2F2] text-[#121214] border border-[#D3D6DA]';

              const badgeStyle = isCopperTier
                ? 'bg-white/15 border-white/30 text-white'
                : isObsidianTier
                ? 'bg-[#FB4D27]/15 border-[#FB4D27]/45 text-[#F1A36A]'
                : 'bg-[#B85D28]/10 border-[#B85D28]/25 text-[#5E2A11]';

              const deliveryStyle = isCopperTier
                ? 'text-white/90'
                : isObsidianTier
                ? 'text-[#D3D6DA]'
                : 'text-[#4C433F]';

              const subtitleStyle = isCopperTier
                ? 'text-white/90'
                : isObsidianTier
                ? 'text-[#D3D6DA]'
                : 'text-[#4C433F]';

              const monthlyPriceAccent = isCopperTier
                ? 'text-white'
                : isObsidianTier
                ? 'text-[#D47A3B]'
                : 'text-[#B85D28]';

              const checkWrapStyle = isCopperTier
                ? 'bg-white/20 text-white'
                : isObsidianTier
                ? 'bg-[#B85D28]/25 text-[#D47A3B]'
                : 'bg-[#B85D28]/12 text-[#B85D28]';

              const featureTextStyle = isCopperTier
                ? 'text-white/95'
                : isObsidianTier
                ? 'text-[#D3D6DA]'
                : 'text-[#4C433F]';

              const monthlyNoteStyle = isCopperTier
                ? 'text-white/85 border-white/20'
                : isObsidianTier
                ? 'text-[#D3D6DA]/90 border-white/15'
                : 'text-[#4C433F] border-[#D3D6DA]';

              const ctaStyle = isCopperTier
                ? 'bg-[#070709] hover:bg-[#18181B] text-white'
                : isObsidianTier
                ? 'copper-pill-gradient hover:opacity-90 text-white'
                : 'bg-[#4C433F] hover:bg-[#5E2A11] text-white';

              return (
                <StaggerItem key={tier.id}>
                  <div
                    className={`h-full rounded-[24px] p-7 sm:p-8 flex flex-col justify-between ${cardSurface}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`rounded-full border px-3.5 py-1 text-[11px] font-medium ${badgeStyle}`}
                        >
                          • {tier.pillLabel}
                        </span>
                        <span className={`text-[11px] ${deliveryStyle}`}>
                          {tier.deliveryTime}
                        </span>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-[28px] sm:text-[32px] leading-[1.06] tracking-[-0.03em] font-normal">
                          {tier.titleLine1}
                        </h3>
                        <p className={`mt-2 text-[13px] ${subtitleStyle}`}>
                          {tier.subtitle}
                        </p>

                        <div
                          className={`mt-5 pb-5 border-b ${
                            isCopperTier
                              ? 'border-white/20'
                              : isObsidianTier
                              ? 'border-white/15'
                              : 'border-[#D3D6DA]'
                          }`}
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="text-[12px] opacity-85">{t.common.fromWord}</span>
                            <span className="text-[36px] font-medium tabular-nums leading-none">
                              {tier.oneTimePrice}
                            </span>
                            <span className="text-[12px] opacity-85">{t.common.oneTimeWord}</span>
                          </div>
                          <p
                            className={`mt-2 text-[13px] font-medium tabular-nums ${monthlyPriceAccent}`}
                          >
                            + {t.common.fromWord} {tier.monthlyPrice}{' '}
                            <span
                              className={`font-normal ${
                                isCopperTier || isObsidianTier
                                  ? 'text-white/80'
                                  : 'text-[#4C433F]'
                              }`}
                            >
                              {t.common.perMonthFull}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <p
                          className={`text-[12px] font-semibold mb-3 ${
                            isCopperTier || isObsidianTier ? 'text-white' : 'text-[#121214]'
                          }`}
                        >
                          {tier.featuresTitle}
                        </p>
                        <ul className="flex flex-col gap-2.5 text-[12.5px] leading-snug">
                          {tier.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5">
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${checkWrapStyle}`}
                              >
                                <Check className="w-3 h-3" />
                              </span>
                              <span className={featureTextStyle}>{feat}</span>
                            </li>
                          ))}
                        </ul>
                        <p
                          className={`mt-4 pt-4 border-t text-[11.5px] leading-relaxed ${monthlyNoteStyle}`}
                        >
                          {tier.monthlyNote}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 pt-2 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          onOpenChat(
                            `${tier.titleLine1} (${tier.oneTimePrice} + ${tier.monthlyPrice}/${t.common.perMonthShort})`
                          )
                        }
                        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[12.5px] font-medium transition-all cursor-pointer ${ctaStyle}`}
                      >
                        <span>
                          {t.home.sec8ChoosePrefix} {tier.titleLine1}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <p className="mt-8 text-center text-[12.5px] text-[#4C433F] max-w-2xl mx-auto">
            {t.home.sec8ContractNote}
          </p>

          {/* SECTION 9: WERKWIJZE */}
          <div id="werkwijze-section" className="mt-20 sm:mt-24 pt-12 border-t border-[#E5E7EB]">
            <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <span className="inline-block rounded-md bg-[#B85D28]/10 border border-[#B85D28]/20 px-3 py-1 text-[11.5px] font-medium text-[#5E2A11]">
                  {t.home.sec9Badge}
                </span>
                <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance]">
                  {t.home.sec9Title}
                </h2>
              </div>
              <p className="text-[14px] text-[#4C433F] max-w-md leading-relaxed">
                {t.home.sec9Subtitle}
              </p>
            </FadeIn>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
              {workingProcess.map((item) => {
                const isActive = item.step === activeProcessStep;
                return (
                  <StaggerItem key={item.step}>
                    <div
                      onClick={() => setActiveProcessStep(item.step)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveProcessStep(item.step);
                        }
                      }}
                      className={`h-full rounded-[22px] p-6 border flex flex-col justify-between transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28] ${
                        isActive
                          ? 'bg-[#070709] text-white border-[#B85D28] shadow-[0_14px_32px_rgba(7,7,9,0.14)]'
                          : 'bg-[#F2F2F2] hover:bg-[#EAEBEC] text-[#121214] border-[#D3D6DA]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`text-[22px] font-medium tabular-nums leading-none ${
                              isActive ? 'text-[#FB4D27]' : 'text-[#B85D28]'
                            }`}
                          >
                            {item.step}.
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${
                              isActive
                                ? 'bg-white/12 text-[#F1A36A]'
                                : 'bg-white text-[#4C433F] border border-[#D3D6DA]'
                            }`}
                          >
                            {item.ctaLabel}
                          </span>
                        </div>

                        <h3
                          className={`mt-4 text-[19px] font-medium tracking-[-0.02em] ${
                            isActive ? 'text-white' : 'text-[#121214]'
                          }`}
                        >
                          {item.title}
                        </h3>

                        <p
                          className={`mt-2.5 text-[13.5px] leading-relaxed ${
                            isActive ? 'text-[#D3D6DA]' : 'text-[#4C433F]'
                          }`}
                        >
                          {item.summary}
                        </p>
                      </div>

                      <div
                        className={`mt-5 pt-4 border-t flex items-center justify-between gap-3 ${
                          isActive ? 'border-white/15' : 'border-[#D3D6DA]'
                        }`}
                      >
                        <span
                          className={`text-[12px] font-medium leading-snug ${
                            isActive ? 'text-white' : 'text-[#5E2A11]'
                          }`}
                        >
                          {item.deliverable}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenChat(`${item.title}`);
                          }}
                          aria-label={`${t.home.sec9StepAriaPrefix} ${item.step}: ${item.title}`}
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                            isActive
                              ? 'copper-pill-gradient text-white'
                              : 'bg-[#4C433F] hover:bg-[#B85D28] text-white'
                          }`}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>

            <div className="mt-6 rounded-[20px] bg-[#F2F2F2] border border-[#D3D6DA] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[13.5px] text-[#4C433F]">
                {t.home.sec9BannerText}
              </p>
              <button
                type="button"
                onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                className="inline-flex items-center gap-2 rounded-full copper-pill-gradient hover:opacity-90 text-white px-5 py-2.5 text-[12.5px] font-medium transition-opacity cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{t.home.sec9BannerCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* SECTION 10 & 11: DARK CASES STRIP + WEBSITES DIE WIJ BOUWDEN */}
      <SectionReveal className="bg-[#070709] text-white pt-16 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <FadeIn>
            <span className="inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[11.5px] font-medium text-[#D3D6DA]">
              {t.home.sec10Badge}
            </span>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-0 items-center">
              {clientPartners.map((partner) => {
                const isActive = partner.id === activePartnerId;
                return (
                  <button
                    key={partner.id}
                    type="button"
                    onClick={() => setActivePartnerId(partner.id)}
                    className={`aspect-square rounded-full border flex flex-col items-center justify-center p-4 text-center transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'border-[#B85D28] text-[#D47A3B] bg-[#B85D28]/5'
                        : 'border-white/15 text-[#929090] hover:border-white/35 hover:text-white'
                    }`}
                  >
                    {partner.id === 'belgie' && (
                      <Globe className="w-5 h-5 mb-1.5 text-white/80" />
                    )}
                    <span className="text-[12px] sm:text-[13px] font-medium leading-tight">
                      {partner.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11.5px] text-[#929090]">
              <span>{t.home.sec10BrandLabel}</span>
              <span>{activePartner.note}</span>
              <span>{t.home.sec10RegionLabel}</span>
            </div>
          </FadeIn>

          {/* SECTION 11: CASES */}
          <FadeIn delay={0.08} className="mt-14 sm:mt-16">
            <div className="rounded-[24px] sm:rounded-[32px] bg-[#FFFFFF] testimonial-grid-bg text-[#121214] p-7 sm:p-12 lg:p-14">
              <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                {t.home.sec11Badge}
              </span>
              <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214]">
                {t.home.sec11Title}
              </h2>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className={`relative rounded-[20px] p-6 sm:p-7 min-h-[290px] flex flex-col justify-between ${
                      item.dark
                        ? 'bg-[#2C2C2E] text-white'
                        : 'bg-[#F7F7F8] text-[#121214] border border-[#ECECEE]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[14px] font-semibold tracking-tight">
                        {item.brandLabel}
                      </span>
                      <img
                        src={item.avatar}
                        alt={item.author}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover object-top"
                      />
                    </div>

                    <p
                      className={`my-6 text-[13.5px] leading-relaxed ${
                        item.dark ? 'text-[#E4E4E7]' : 'text-[#4C433F]'
                      }`}
                    >
                      {item.quote}
                    </p>

                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p
                          className={`text-[11px] ${
                            item.dark ? 'text-[#D3D6DA]' : 'text-[#4C433F]'
                          }`}
                        >
                          {item.role}
                        </p>
                        <p className="text-[12px] font-medium mt-0.5">
                          {item.author}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`text-[32px] leading-none font-normal tabular-nums ${
                          item.dark ? 'text-[#D47A3B]' : 'text-[#B85D28]'
                        }`}
                      >
                        {item.number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionReveal>

      {/* SECTION 12 & 13: QUESTIONS + FAQ + CONTACT */}
      <SectionReveal className="bg-[#FFFFFF] text-[#121214] pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          {/* Center Globe & Highlights */}
          <FadeIn>
            <div className="relative min-h-[420px] sm:min-h-[480px] flex flex-col items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-55"
              >
                <div className="w-[360px] sm:w-[460px] h-[360px] sm:h-[460px]">
                  <WireframeGlobeSvg />
                </div>
              </div>

              <div className="relative z-10 text-center max-w-md mx-auto">
                <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                  {t.home.sec12Badge}
                </span>
                <h2 className="mt-3 text-[32px] sm:text-[42px] leading-[1.06] tracking-[-0.03em] font-normal text-[#121214]">
                  {t.home.sec12TitleLine1}
                  <br />
                  {t.home.sec12TitleLine2}
                </h2>
                <p className="mt-3 text-[13.5px] text-[#4C433F] leading-relaxed">
                  {t.home.sec12Subtitle}
                </p>
                <button
                  type="button"
                  onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#121214] hover:bg-[#B85D28] text-white px-5 py-2.5 text-[12.5px] font-medium transition-colors cursor-pointer"
                >
                  <span>{t.home.sec12Cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Floating Circles */}
              <div className="mt-10 lg:mt-0 grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center lg:block w-full">
                {greatestAwards.map((award) => {
                  const isActive = award.id === activeAwardId;
                  const circleStyles =
                    award.variant === 'dark'
                      ? 'bg-[#252527] text-white'
                      : award.variant === 'gray'
                      ? 'bg-[#4C433F] text-white'
                      : award.variant === 'clutch'
                      ? 'bg-[#F8F8F9] text-[#121214] border border-[#E4E4E7] shadow-md'
                      : 'bg-[#F4F4F6] text-[#121214] border border-[#ECECEE]';

                  return (
                    <div
                      key={award.id}
                      className={`lg:absolute ${award.positionClass} flex flex-col items-center`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveAwardId(award.id)}
                        className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center p-3 text-center transition-transform duration-200 hover:scale-105 cursor-pointer ${circleStyles}`}
                      >
                        <span className="text-[13.5px] font-semibold leading-tight">
                          {award.title}
                        </span>
                        <span className="mt-1 text-[10.5px] opacity-90">
                          {award.subtitle}
                        </span>
                      </button>
                      {isActive && (
                        <span className="mt-2 rounded-md bg-white border border-[#E5E7EB] shadow-sm px-2.5 py-1 text-[10.5px] font-medium text-[#121214] whitespace-nowrap">
                          {award.subtitle}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* FAQ Accordion */}
          <div id="faq-section" className="mt-20 sm:mt-24 pt-12 border-t border-[#E5E7EB]">
            <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                  {t.home.faqBadge}
                </span>
                <h2 className="mt-3 text-[32px] sm:text-[42px] leading-[1.06] tracking-[-0.03em] font-normal text-[#121214]">
                  {t.home.faqTitle}
                </h2>
                <p className="mt-2 text-[13.5px] text-[#4C433F]">
                  {t.home.faqSubtitle}
                </p>
              </div>

              <div
                role="tablist"
                aria-label={t.home.faqTablistAria}
                className="flex flex-wrap gap-2"
              >
                {t.home.faqTopics.map((topicItem) => {
                  const isTopicActive = activeFaqTopic === topicItem.key;
                  return (
                    <button
                      key={topicItem.key}
                      type="button"
                      role="tab"
                      aria-selected={isTopicActive}
                      onClick={() => {
                        setActiveFaqTopic(topicItem.key);
                        const nextList =
                          topicItem.key === 'all'
                            ? faqItems
                            : faqItems.filter((f) => f.topicKey === topicItem.key);
                        if (nextList.length > 0 && !nextList.some((f) => f.id === openFaqId)) {
                          setOpenFaqId(nextList[0].id);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-full text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28] ${
                        isTopicActive
                          ? 'bg-[#121214] text-white'
                          : 'bg-[#F2F2F2] text-[#4C433F] hover:bg-[#E7E8EB] hover:text-[#121214]'
                      }`}
                    >
                      {topicItem.label}
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            {/* 3 Quick Answer Cards */}
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {blogArticles.map((post) => (
                <StaggerItem key={post.id}>
                  <button
                    type="button"
                    onClick={() => onOpenChat(post.title)}
                    className="group w-full h-full text-left rounded-[22px] bg-[#F2F2F2] hover:bg-[#E7E8EB] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11.5px] text-[#4C433F]">
                        <span className="text-[#B85D28] font-medium">
                          {post.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{post.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-3 text-[19px] font-medium leading-snug text-[#121214] group-hover:text-[#B85D28] transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-[#4C433F]">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#121214]">
                      <span>{t.home.faqCardCta}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {/* Complete Interactive FAQ Accordion */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-start">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqId === faq.id;
                const displayIndex = String(idx + 1).padStart(2, '0');
                return (
                  <div
                    key={faq.id}
                    className={`rounded-[18px] border transition-colors duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-[#FFFFFF] border-[#B85D28]/50 shadow-[0_8px_24px_rgba(18,18,20,0.05)]'
                        : 'bg-[#F7F7F8] border-[#E5E7EB] hover:border-[#D3D6DA]'
                    }`}
                  >
                    <button
                      type="button"
                      id={`faq-trigger-${faq.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${faq.id}`}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F2F2F2]/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#B85D28]"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-medium">
                          <span className="tabular-nums text-[#4C433F]">
                            {displayIndex}.
                          </span>
                          <span aria-hidden="true" className="text-[#D3D6DA]">
                            /
                          </span>
                          <span className="text-[#B85D28]">{faq.topic}</span>
                        </div>
                        <p className="text-[14.5px] font-medium text-[#121214] mt-1 leading-snug">
                          {faq.question}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                          isOpen
                            ? 'bg-[#121214] text-white'
                            : 'bg-[#ECECEE] text-[#4C433F]'
                        }`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-trigger-${faq.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 pt-3 text-[13.5px] leading-relaxed text-[#4C433F] border-t border-[#ECECEE]">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-[20px] bg-[#F2F2F2] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[13.5px] text-[#4C433F]">
                {t.home.faqBottomText}
              </p>
              <button
                type="button"
                onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-[#121214] hover:text-[#B85D28] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{t.home.faqBottomCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Inline Contact & Proposal Form */}
          <div id="contact-section" className="mt-20 pt-14 border-t border-[#E5E7EB]">
            <div className="rounded-[28px] bg-[#070709] text-white p-7 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <span className="inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[11.5px] font-medium text-[#D3D6DA]">
                  {t.home.contactBadge}
                </span>
                <h2 className="mt-4 text-[30px] sm:text-[40px] leading-[1.06] tracking-[-0.03em] font-normal">
                  {t.home.contactTitle}
                </h2>

                <div className="mt-7 flex flex-col gap-5 text-[13.5px]">
                  {t.home.contactSteps.map((step) => (
                    <div key={step.title} className="border-l border-white/15 pl-4">
                      <p className="font-medium text-white">{step.title}</p>
                      <p className="text-[#D3D6DA] mt-0.5">{step.subtitle}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-[13px]">
                  <div>
                    <p className="text-[#929090] text-[11.5px]">
                      {t.home.contactMailLabel}
                    </p>
                    <a
                      href="mailto:info@webstudiok.be"
                      className="text-white font-medium hover:text-[#D47A3B] transition-colors"
                    >
                      info@webstudiok.be
                    </a>
                  </div>
                  <div>
                    <p className="text-[#929090] text-[11.5px]">
                      {t.home.contactCallLabel}
                    </p>
                    <a
                      href="tel:+3214718080"
                      className="text-white font-medium tabular-nums hover:text-[#D47A3B] transition-colors"
                    >
                      +32 14 71 80 80
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                {contactSent ? (
                  <div className="rounded-[22px] bg-[#161618] border border-white/10 p-8 text-center">
                    <div className="w-12 h-12 rounded-full copper-pill-gradient text-white flex items-center justify-center mx-auto mb-4">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="text-[22px] font-medium text-white">
                      {t.home.contactSentTitle}
                    </h3>
                    <p className="mt-2.5 text-[14px] text-[#D3D6DA] max-w-md mx-auto leading-relaxed">
                      {t.home.contactSentBodyBeforeEmail} ({contactEmail}).{' '}
                      {t.home.contactSentBodyBetween}{' '}
                      <span className="font-medium text-white">+32 14 71 80 80</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setContactSent(false)}
                      className="mt-6 rounded-full bg-white text-[#121214] px-5 py-2.5 text-[12.5px] font-medium cursor-pointer"
                    >
                      {t.home.contactSendAnother}
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleContactSubmit}
                    className="rounded-[22px] bg-[#161618] border border-white/10 p-6 sm:p-8 flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="home-name"
                          className="block text-[11.5px] text-[#D3D6DA] mb-1.5"
                        >
                          {t.home.contactNameLabel}
                        </label>
                        <input
                          id="home-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder={t.home.contactNamePlaceholder}
                          className="w-full rounded-xl border border-white/15 bg-[#0A0A0C] px-4 py-3 text-[14px] text-white placeholder:text-[#929090] focus:outline-none focus:border-[#D47A3B]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="home-business"
                          className="block text-[11.5px] text-[#D3D6DA] mb-1.5"
                        >
                          {t.home.contactBusinessLabel}
                        </label>
                        <input
                          id="home-business"
                          type="text"
                          value={contactBusiness}
                          onChange={(e) => setContactBusiness(e.target.value)}
                          placeholder={t.home.contactBusinessPlaceholder}
                          className="w-full rounded-xl border border-white/15 bg-[#0A0A0C] px-4 py-3 text-[14px] text-white placeholder:text-[#929090] focus:outline-none focus:border-[#D47A3B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="home-email"
                          className="block text-[11.5px] text-[#D3D6DA] mb-1.5"
                        >
                          {t.home.contactEmailLabel}
                        </label>
                        <input
                          id="home-email"
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder={t.home.contactEmailPlaceholder}
                          className="w-full rounded-xl border border-white/15 bg-[#0A0A0C] px-4 py-3 text-[14px] text-white placeholder:text-[#929090] focus:outline-none focus:border-[#D47A3B]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="home-topic"
                          className="block text-[11.5px] text-[#D3D6DA] mb-1.5"
                        >
                          {t.home.contactTopicLabel}
                        </label>
                        <select
                          id="home-topic"
                          value={contactTopic}
                          onChange={(e) => setContactTopic(e.target.value)}
                          className="w-full rounded-xl border border-white/15 bg-[#0A0A0C] px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#D47A3B]"
                        >
                          {t.chat.scopeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="home-message"
                        className="block text-[11.5px] text-[#D3D6DA] mb-1.5"
                      >
                        {t.home.contactMessageLabel}
                      </label>
                      <textarea
                        id="home-message"
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder={t.home.contactMessagePlaceholder}
                        className="w-full rounded-xl border border-white/15 bg-[#0A0A0C] px-4 py-3 text-[14px] text-white placeholder:text-[#929090] focus:outline-none focus:border-[#D47A3B]"
                      />
                    </div>

                    {contactError && (
                      <p className="text-[12.5px] text-[#FB4D27] font-medium">
                        {contactError}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <p className="text-[11.5px] text-[#929090] max-w-xs">
                        {t.home.contactPrivacyNote}
                      </p>
                      <button
                        type="submit"
                        className="rounded-full copper-pill-gradient hover:opacity-90 text-white px-6 min-h-[46px] text-[13.5px] font-medium transition-opacity cursor-pointer whitespace-nowrap"
                      >
                        {t.home.contactSubmitButton}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
