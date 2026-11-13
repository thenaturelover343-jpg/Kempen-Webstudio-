import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { PageRoute } from '../data/webstudioData';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslations } from '../i18n/translations';
import { FadeIn, SectionReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

interface VisionPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenChat: (presetSubject?: string) => void;
}

export function VisionPage({ onNavigate, onOpenChat }: VisionPageProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const pillars = t.vision.pillars;

  const [activePillarId, setActivePillarId] = useState(pillars[0].id);

  const activePillar =
    pillars.find((p) => p.id === activePillarId) ?? pillars[0];

  return (
    <div className="w-full overflow-x-hidden">
      <SectionReveal immediate className="hero-canvas pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeIn immediate>
            <span className="inline-block rounded-md bg-white/75 px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
              {t.vision.heroBadge}
            </span>
            <h1 className="mt-4 text-[clamp(2.3rem,5.2vw,4.3rem)] leading-[0.98] tracking-[-0.04em] font-medium text-[#121214] max-w-4xl [text-wrap:balance]">
              {t.vision.heroTitle}
            </h1>
            <p className="mt-6 text-[16px] sm:text-[18px] leading-relaxed text-[#4C433F] max-w-2xl">
              {t.vision.heroSubtitle}
            </p>
          </FadeIn>

          <StaggerGroup
            immediate
            className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {t.vision.theses.map((item) => (
              <StaggerItem key={item.num}>
                <div className="h-full rounded-[24px] bg-white/85 backdrop-blur-xs border border-[#D3D6DA] p-7 flex flex-col justify-between">
                  <span className="text-[20px] font-medium text-[#B85D28]">
                    {item.num}
                  </span>
                  <div className="mt-6">
                    <h2 className="text-[20px] font-medium tracking-[-0.02em] text-[#121214]">
                      {item.heading}
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#4C433F]">
                      {item.copy}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      {/* Dark Interactive Werkwijze Explorer */}
      <SectionReveal className="bg-[#070709] text-white py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[11.5px] font-medium text-[#D3D6DA]">
                {t.vision.explorerBadge}
              </span>
              <h2 className="mt-3 text-[32px] sm:text-[44px] leading-[1.06] tracking-[-0.03em] font-normal">
                {t.vision.explorerTitle}
              </h2>
            </div>
            <p className="text-[14.5px] text-[#929090] max-w-md">
              {t.vision.explorerSubtitle}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <FadeIn className="lg:col-span-5 flex flex-col gap-3">
              {pillars.map((pillar) => {
                const isActive = pillar.id === activePillarId;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillarId(pillar.id)}
                    className={`w-full text-left rounded-[20px] p-5 border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-[#262628] border-[#B85D28] text-white'
                        : 'bg-[#161618] border-white/10 text-[#929090] hover:text-white'
                    }`}
                  >
                    <div>
                      <span className="text-[11.5px] text-[#D47A3B] font-medium tabular-nums">
                        {pillar.index} · {pillar.horizon}
                      </span>
                      <p className="mt-1 text-[18px] font-medium">
                        {pillar.title}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-[#D47A3B] translate-x-0.5' : 'opacity-40'
                      }`}
                    />
                  </button>
                );
              })}
            </FadeIn>

            <FadeIn delay={0.08} className="lg:col-span-7 flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${language}-${activePillar.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-[28px] copper-panel-gradient p-8 sm:p-12 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[13px] text-white/80 tabular-nums">
                    <span>{t.vision.partLabel} {activePillar.index}</span>
                    <span>{activePillar.horizon}</span>
                  </div>

                  <div className="my-10">
                    <h3 className="text-[30px] sm:text-[40px] leading-[1.08] tracking-[-0.03em] font-normal text-white">
                      {activePillar.title}
                    </h3>
                    <p className="mt-5 text-[16px] sm:text-[17px] leading-relaxed text-white/90 max-w-xl">
                      {activePillar.thesis}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-[11.5px] text-white/75">
                        {t.vision.includedLabel}
                      </p>
                      <p className="text-[14px] font-medium text-white mt-0.5">
                        {activePillar.metric}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenChat(`${activePillar.title}`)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#08080A] hover:bg-black text-white px-5 min-h-[42px] text-[13px] font-medium transition-colors cursor-pointer shrink-0"
                    >
                      <span>{t.vision.requestProposalCta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </SectionReveal>

      {/* Current Palette Showcase */}
      <SectionReveal className="bg-[#FFFFFF] text-[#121214] py-20 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                {t.vision.paletteBadge}
              </span>
              <h2 className="mt-3 text-[30px] sm:text-[38px] tracking-[-0.03em] font-normal">
                {t.vision.paletteTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('Services')}
              className="inline-flex items-center gap-2 rounded-full bg-[#08080A] hover:bg-[#4C433F] text-white px-5 min-h-[42px] text-[13px] font-medium transition-colors cursor-pointer"
            >
              <span>{t.vision.paletteCta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </FadeIn>

          <StaggerGroup className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {t.vision.paletteSwatches.map((swatch) => (
              <StaggerItem key={swatch.hex}>
                <div
                  className={`rounded-[20px] p-5 min-h-[150px] flex flex-col justify-between ${swatch.bg} ${swatch.text}`}
                >
                  <span className="text-[13.5px] font-medium">{swatch.name}</span>
                  <span className="text-[12px] font-mono opacity-80">{swatch.hex}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>
    </div>
  );
}
