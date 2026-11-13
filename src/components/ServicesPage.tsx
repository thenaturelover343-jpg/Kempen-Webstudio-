import { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import {
  getPricingTiers,
  getServicesList,
  getWorkingProcess,
  type PageRoute,
} from '../data/webstudioData';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslations } from '../i18n/translations';
import { FadeIn, SectionReveal } from './MotionPrimitives';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenChat: (presetSubject?: string) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const fastStaggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.06,
    },
  },
};

const staggeredTextVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

const staggeredCardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: EASE_OUT_EXPO },
  },
};

const SCROLL_VIEWPORT = {
  once: true,
  amount: 'some' as const,
  margin: '0px 0px -36px 0px',
};

export function ServicesPage({ onNavigate, onOpenChat }: ServicesPageProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const servicesList = getServicesList(language);
  const pricingTiers = getPricingTiers(language);
  const workingProcess = getWorkingProcess(language);
  const estimatorModules = t.services.estimatorModules;

  const [activeServiceId, setActiveServiceId] = useState(servicesList[0].id);
  const [selectedModules, setSelectedModules] = useState<string[]>(['start', 'seo']);

  const activeService =
    servicesList.find((s) => s.id === activeServiceId) ?? servicesList[0];

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const estimate = useMemo(() => {
    const chosen = estimatorModules.filter((m) => selectedModules.includes(m.id));
    const total = chosen.reduce((sum, m) => sum + m.price, 0);
    return {
      total,
      labels: chosen.map((c) => c.label).join(' + '),
    };
  }, [estimatorModules, selectedModules]);

  return (
    <div className="w-full overflow-x-hidden">
      <SectionReveal immediate className="hero-canvas pt-10 sm:pt-16 pb-16 sm:pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={staggeredTextVariants}
              className="inline-block rounded-md bg-white/75 px-3 py-1 text-[11.5px] font-medium text-[#4C433F]"
            >
              {t.services.heroBadge}
            </motion.span>
            <motion.h1
              variants={staggeredTextVariants}
              className="mt-4 text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.04em] font-medium text-[#121214] max-w-4xl [text-wrap:balance]"
            >
              {t.services.heroTitle}
            </motion.h1>
            <motion.p
              variants={staggeredTextVariants}
              className="mt-6 text-[16px] sm:text-[18px] leading-relaxed text-[#4C433F] max-w-2xl"
            >
              {t.services.heroSubtitle}
            </motion.p>
          </motion.div>
        </div>
      </SectionReveal>

      {/* Dark Interactive Service Architecture */}
      <SectionReveal className="bg-[#070709] text-white py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={SCROLL_VIEWPORT}
              className="lg:col-span-5 flex flex-col gap-3"
            >
              <motion.p
                variants={staggeredTextVariants}
                className="text-[12.5px] font-medium text-[#929090] mb-2"
              >
                {t.services.chooseTrackLabel}
              </motion.p>
              {servicesList.map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <motion.button
                    key={service.id}
                    variants={staggeredCardVariants}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full text-left rounded-[20px] p-5 border transition-colors duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-[#262628] border-[#B85D28] text-white'
                        : 'bg-[#161618] border-white/10 text-[#929090] hover:text-white hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-[13px] font-medium tabular-nums ${
                          isActive ? 'text-[#D47A3B]' : 'text-[#929090]'
                        }`}
                      >
                        {service.number}.
                      </span>
                      <span className="text-[18px] font-medium">{service.title}</span>
                    </div>
                    <span className="text-[12px] tabular-nums opacity-75">
                      {t.services.fromPricePrefix} {service.startingPrice}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>

            <FadeIn delay={0.08} className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${language}-${activeService.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                  className="rounded-[28px] bg-[#161618] border border-white/10 p-7 sm:p-10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <span className="text-[12.5px] font-medium text-[#D47A3B] tabular-nums">
                      {t.services.trackLabel} {activeService.number} · {activeService.timeline}
                    </span>
                    <span className="text-[13px] text-[#D3D6DA] tabular-nums">
                      {activeService.hashtags.join(' ')}
                    </span>
                  </div>

                  <h2 className="mt-6 text-[28px] sm:text-[36px] tracking-[-0.03em] font-normal text-white">
                    {activeService.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#929090]">
                    {activeService.fullDesc}
                  </p>

                  <div className="mt-8">
                    <p className="text-[12px] font-medium text-[#929090] mb-4">
                      {t.services.deliverablesLabel}
                    </p>
                    <motion.div
                      variants={fastStaggerContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {activeService.deliverables.map((item) => (
                        <motion.div
                          key={item}
                          variants={staggeredCardVariants}
                          whileHover={{ y: -3, scale: 1.015 }}
                          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                          className="group rounded-xl bg-[#222225] hover:bg-[#2A2A2E] border border-white/8 hover:border-[#B85D28]/55 px-4 py-3.5 flex items-start gap-2.5 text-[13.5px] text-[#E4E4E7] transition-colors duration-200 cursor-default"
                        >
                          <Check className="w-4 h-4 text-[#D47A3B] group-hover:scale-110 transition-transform duration-200 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[11.5px] text-[#929090]">
                        {t.services.guidePriceLabel}
                      </p>
                      <p className="text-[24px] font-medium tabular-nums text-white mt-0.5">
                        {activeService.outcomeMetric}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenChat(`${activeService.title} (${activeService.outcomeMetric})`)
                      }
                      className="inline-flex items-center gap-2.5 rounded-full copper-pill-gradient hover:opacity-90 text-white px-6 min-h-[46px] text-[13.5px] font-medium transition-opacity cursor-pointer"
                    >
                      <span>{t.services.requestProposalCta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </SectionReveal>

      {/* Interactive Scope & Price Estimator (Light Section) */}
      <SectionReveal className="bg-[#FFFFFF] text-[#121214] py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <motion.div
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={SCROLL_VIEWPORT}
              >
                <motion.span
                  variants={staggeredTextVariants}
                  className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]"
                >
                  {t.services.estimatorBadge}
                </motion.span>
                <motion.h2
                  variants={staggeredTextVariants}
                  className="mt-3 text-[32px] sm:text-[42px] leading-[1.06] tracking-[-0.03em] font-normal"
                >
                  {t.services.estimatorTitle}
                </motion.h2>
                <motion.p
                  variants={staggeredTextVariants}
                  className="mt-4 text-[14.5px] leading-relaxed text-[#4C433F] max-w-lg"
                >
                  {t.services.estimatorSubtitle}
                </motion.p>
              </motion.div>

              <motion.div
                variants={fastStaggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={SCROLL_VIEWPORT}
                className="mt-8 flex flex-col gap-3"
              >
                {estimatorModules.map((mod) => {
                  const active = selectedModules.includes(mod.id);
                  return (
                    <motion.button
                      key={mod.id}
                      variants={staggeredCardVariants}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                      type="button"
                      onClick={() => toggleModule(mod.id)}
                      className={`w-full rounded-[18px] px-5 py-4 border flex items-center justify-between gap-4 transition-colors duration-150 cursor-pointer ${
                        active
                          ? 'bg-[#08080A] text-white border-[#08080A] hover:border-[#B85D28]/70'
                          : 'bg-[#F2F2F2] text-[#121214] border-[#D3D6DA] hover:bg-[#E7E8EB] hover:border-[#B85D28]/45'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                            active
                              ? 'bg-[#B85D28] border-[#B85D28] text-white'
                              : 'border-[#929090]'
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5" />}
                        </span>
                        <span className="text-[14.5px] font-medium">
                          {mod.label}
                        </span>
                      </div>
                      <span className="text-[13px] tabular-nums opacity-80 whitespace-nowrap">
                        {t.services.fromPricePrefix} €{mod.price.toLocaleString(t.services.priceLocale)}
                      </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            <motion.div
              variants={staggeredCardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={SCROLL_VIEWPORT}
              className="lg:col-span-6"
            >
              <div className="rounded-[30px] copper-panel-gradient text-white p-7 sm:p-10 shadow-xl">
                <p className="text-[12.5px] font-medium text-white/80">
                  {t.services.estimatorSummaryLabel}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-6 pb-7 border-b border-white/20">
                  <div>
                    <p className="text-[12px] text-white/75">{t.services.estimatorOneTimeFrom}</p>
                    <p className="text-[36px] sm:text-[46px] font-normal tabular-nums leading-none mt-1.5">
                      €{estimate.total.toLocaleString(t.services.priceLocale)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] text-white/85">{t.services.estimatorFirstStepLabel}</p>
                    <p className="text-[28px] sm:text-[34px] font-normal leading-tight mt-1.5">
                      {t.services.estimatorFirstStepValue}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[12px] text-white/85">{t.services.estimatorChosenLabel}</p>
                  <p className="mt-1.5 text-[15px] font-medium leading-relaxed">
                    {estimate.labels}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenChat(
                        `${t.services.estimatorSubjectPrefix} €${estimate.total.toLocaleString(
                          t.services.priceLocale
                        )} (${estimate.labels})`
                      )
                    }
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#08080A] hover:bg-black text-white px-6 min-h-[46px] text-[13.5px] font-medium transition-colors cursor-pointer"
                  >
                    <span>{t.services.requestProposalCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('Vision')}
                    className="inline-flex items-center rounded-full bg-white/20 hover:bg-white/30 text-white px-6 min-h-[46px] text-[13.5px] font-medium transition-colors cursor-pointer"
                  >
                    {t.services.estimatorViewProcess}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Drie pakketten overzicht */}
          <div className="mt-20 pt-16 border-t border-[#E5E7EB]">
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={SCROLL_VIEWPORT}
              className="mb-10"
            >
              <motion.span
                variants={staggeredTextVariants}
                className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]"
              >
                {t.services.packagesBadge}
              </motion.span>
              <motion.h2
                variants={staggeredTextVariants}
                className="mt-3 text-[28px] sm:text-[36px] tracking-[-0.03em] font-normal"
              >
                {t.services.packagesTitle}
              </motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={SCROLL_VIEWPORT}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
            >
              {pricingTiers.map((tier) => {
                const isObsidianTier = tier.id === 'webshop';
                const cardClass = tier.featured
                  ? 'copper-panel-gradient text-white border-transparent shadow-[0_14px_34px_rgba(184,93,40,0.2)]'
                  : isObsidianTier
                  ? 'bg-[#070709] text-white border-[#B85D28]/45 hover:border-[#D47A3B]'
                  : 'bg-[#F2F2F2] text-[#121214] border-[#D3D6DA] hover:border-[#B85D28]/60 hover:bg-[#EAEBEC]';

                return (
                  <motion.div
                    key={tier.id}
                    variants={staggeredCardVariants}
                    whileHover={{ y: -5, scale: 1.012 }}
                    transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                    className="h-full"
                  >
                    <div
                      className={`h-full rounded-[22px] p-6 border flex flex-col justify-between transition-colors duration-200 ${cardClass}`}
                    >
                      <div>
                        <p
                          className={`text-[12px] font-medium ${
                            tier.featured
                              ? 'text-white/90'
                              : isObsidianTier
                              ? 'text-[#D47A3B]'
                              : 'text-[#B85D28]'
                          }`}
                        >
                          {tier.pillLabel}
                        </p>
                        <h3 className="mt-2 text-[22px] font-medium">
                          {tier.titleLine1} · {t.services.fromPricePrefix} {tier.oneTimePrice}
                        </h3>
                        <p
                          className={`text-[13px] mt-1 ${
                            tier.featured
                              ? 'text-white/90'
                              : isObsidianTier
                              ? 'text-[#D3D6DA]'
                              : 'text-[#4C433F]'
                          }`}
                        >
                          + {t.services.fromPricePrefix} {tier.monthlyPrice} {t.common.perMonthFull}
                        </p>
                        <p
                          className={`mt-3 text-[13px] ${
                            tier.featured
                              ? 'text-white/85'
                              : isObsidianTier
                              ? 'text-[#D3D6DA]/90'
                              : 'text-[#4C433F]'
                          }`}
                        >
                          {tier.subtitle}
                        </p>
                      </div>
                      <p
                        className={`mt-4 pt-3 border-t text-[12px] ${
                          tier.featured
                            ? 'border-white/20 text-white/90'
                            : isObsidianTier
                            ? 'border-white/15 text-[#D3D6DA]'
                            : 'border-[#D3D6DA] text-[#5E2A11] font-medium'
                        }`}
                      >
                        {tier.deliveryTime}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={SCROLL_VIEWPORT}
              className="mb-10"
            >
              <motion.span
                variants={staggeredTextVariants}
                className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]"
              >
                {t.services.processBadge}
              </motion.span>
              <motion.h2
                variants={staggeredTextVariants}
                className="mt-3 text-[28px] sm:text-[36px] tracking-[-0.03em] font-normal"
              >
                {t.services.processTitle}
              </motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={SCROLL_VIEWPORT}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {workingProcess.map((step) => (
                <motion.div
                  key={step.step}
                  variants={staggeredCardVariants}
                  whileHover={{ y: -4, scale: 1.012 }}
                  transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                  className="h-full"
                >
                  <div className="h-full rounded-[22px] bg-[#F2F2F2] hover:bg-[#EAEBEC] border border-[#D3D6DA] hover:border-[#B85D28]/60 p-6 flex flex-col justify-between transition-colors duration-200">
                    <div>
                      <div className="flex items-center justify-between text-[12px] tabular-nums">
                        <span className="font-semibold text-[#B85D28]">
                          {step.step}.
                        </span>
                        <span className="text-[#4C433F]">{step.ctaLabel}</span>
                      </div>
                      <h3 className="mt-3 text-[18px] font-medium text-[#121214]">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#4C433F]">
                        {step.summary}
                      </p>
                    </div>
                    <p className="mt-5 pt-4 border-t border-[#D3D6DA] text-[12px] font-medium text-[#121214]">
                      {step.deliverable}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
