import { useState } from 'react';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import {
  getAllSectors,
  getStudioPlaces,
  getTeamMembers,
  getWorkProjects,
  STUDIO_MEDIA,
  type PageRoute,
} from '../data/webstudioData';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslations } from '../i18n/translations';
import { FadeIn, SectionReveal, StaggerGroup, StaggerItem } from './MotionPrimitives';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenChat: (presetSubject?: string) => void;
}

export function AboutPage({ onNavigate, onOpenChat }: AboutPageProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const workProjects = getWorkProjects(language);
  const teamMembers = getTeamMembers(language);
  const allSectors = getAllSectors(language);
  const studioPlaces = getStudioPlaces(language);

  const [sectorFilter, setSectorFilter] = useState<'all' | 'founder' | 'member'>('all');

  const filteredSectors = teamMembers.filter((member) => {
    if (sectorFilter === 'all') return true;
    return member.group === sectorFilter;
  });

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <SectionReveal immediate className="hero-canvas pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeIn immediate>
            <span className="inline-block rounded-md bg-white/75 px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
              {t.about.heroBadge}
            </span>
            <h1 className="mt-4 text-[clamp(2.3rem,5.2vw,4.3rem)] leading-[0.98] tracking-[-0.04em] font-medium text-[#121214] max-w-4xl [text-wrap:balance]">
              {t.about.heroTitle}
            </h1>
            <p className="mt-6 text-[16px] sm:text-[18px] leading-relaxed text-[#4C433F] max-w-2xl">
              {t.about.heroSubtitle}
            </p>
          </FadeIn>

          <FadeIn immediate delay={0.12} className="mt-10 sm:mt-14">
            <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#D3D6DA] bg-[#070709] aspect-[16/9] max-h-[540px] w-full">
              <img
                src={STUDIO_MEDIA.studioInterior}
                alt={t.about.heroImageAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div>
                  <p className="text-[12px] text-[#D47A3B] font-medium">
                    Webstudio K
                  </p>
                  <p className="text-[18px] sm:text-[22px] font-medium mt-0.5">
                    {t.about.heroImageLocation}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#D3D6DA]">
                  <span>{t.about.heroStatsExamples}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t.about.heroStatsSectors}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t.about.heroStatsPrice}</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionReveal>

      {/* Dark 9 Example Designs Showcase */}
      <SectionReveal className="bg-[#070709] text-white py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <span className="inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[11.5px] font-medium text-[#D3D6DA]">
                {t.about.showcaseBadge}
              </span>
              <h2 className="mt-3 text-[32px] sm:text-[44px] leading-[1.06] tracking-[-0.03em] font-normal">
                {t.about.showcaseTitle}
              </h2>
            </div>
            <p className="text-[14.5px] text-[#929090] max-w-md leading-relaxed">
              {t.about.showcaseSubtitle}
            </p>
          </FadeIn>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workProjects.map((proj, idx) => (
              <StaggerItem key={proj.id}>
                <div className="h-full rounded-[24px] bg-[#161618] border border-white/10 p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[12px] tabular-nums">
                      <span className="text-[#D47A3B] font-medium">
                        0{idx + 1}. {proj.category}
                      </span>
                      <span className="text-[#929090]">{t.about.fictionalBusinessLabel}</span>
                    </div>
                    <h3 className="mt-4 text-[22px] font-medium tracking-[-0.02em] text-white">
                      {proj.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[#929090]">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-[12px] text-[#D3D6DA]">
                      {proj.disciplines.join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenChat(`${proj.title} (${proj.category})`)
                      }
                      className="text-[12px] font-medium text-[#D47A3B] hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                      {t.about.requestProposalArrow}
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      {/* Light Sectoren & Werkwijze */}
      <SectionReveal className="bg-[#FFFFFF] text-[#121214] py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                {t.about.sectorsBadge}
              </span>
              <h2 className="mt-3 text-[32px] sm:text-[44px] leading-[1.06] tracking-[-0.03em] font-normal">
                {t.about.sectorsTitle}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {t.about.sectorFilterTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSectorFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-[12.5px] font-medium transition-colors cursor-pointer ${
                    sectorFilter === tab.id
                      ? 'bg-[#08080A] text-white'
                      : 'bg-[#F2F2F2] text-[#4C433F] hover:text-[#121214]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSectors.map((sector, idx) => (
              <FadeIn key={sector.id} delay={idx * 0.05}>
                <div className="rounded-[24px] bg-[#F2F2F2] border border-[#D3D6DA] p-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="aspect-[4/3] rounded-[18px] overflow-hidden bg-[#D3D6DA]">
                      <img
                        src={sector.image}
                        alt={sector.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between gap-2 text-[12px] text-[#4C433F]">
                        <span>{sector.location}</span>
                        <span>{sector.experience}</span>
                      </div>
                      <h3 className="mt-1.5 text-[20px] font-medium text-[#121214]">
                        {sector.name}
                      </h3>
                      <p className="text-[13px] font-medium text-[#B85D28]">
                        {sector.ctaLabel}
                      </p>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-[#4C433F]">
                        {sector.bio}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#D3D6DA] text-[12px] text-[#4C433F] font-medium">
                    {t.about.focusLabel} {sector.specialty}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-16 pt-12 border-t border-[#E5E7EB]">
            <p className="text-[13px] font-medium text-[#4C433F] mb-4">
              {t.about.allSectorsTitle}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {allSectors.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onOpenChat(`${t.about.sectorSubjectPrefix} ${s}`)}
                  className="rounded-full bg-[#F2F2F2] hover:bg-[#121214] hover:text-white px-4 py-2 text-[13px] font-medium text-[#121214] transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="mt-16 pt-16 border-t border-[#E5E7EB]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.about.principles.map((item, idx) => (
                <FadeIn
                  key={item.number}
                  delay={idx * 0.06}
                  className="pt-4 border-t-2 border-[#121214]"
                >
                  <p className="text-[28px] font-normal tabular-nums text-[#B85D28]">
                    {item.number}
                  </p>
                  <h3 className="mt-2 text-[17px] font-medium text-[#121214]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#4C433F]">
                    {item.body}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn className="mt-20 rounded-[28px] bg-[#070709] text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-[#D3D6DA]">
                {studioPlaces.map((p, i) => (
                  <span key={p.id} className="inline-flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <MapPin className="w-3 h-3 text-[#D47A3B]" />
                    <span>{p.city}</span>
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-[26px] sm:text-[34px] font-normal tracking-[-0.03em]">
                {t.about.bottomCtaTitle}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                className="inline-flex items-center gap-2.5 rounded-full copper-pill-gradient hover:opacity-90 text-white px-6 min-h-[46px] text-[13.5px] font-medium transition-opacity cursor-pointer"
              >
                <span>{t.about.bottomCtaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('Services')}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white px-6 min-h-[46px] text-[13.5px] font-medium transition-colors cursor-pointer"
              >
                <span>{t.about.bottomCtaSecondary}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </FadeIn>
        </div>
      </SectionReveal>
    </div>
  );
}
