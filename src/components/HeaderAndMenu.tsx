import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import type { PageRoute } from '../data/webstudioData';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslations } from '../i18n/translations';
import { ActiveNavFlower, WebstudioLogoMark } from './BrandMarks';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderAndMenuProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenChat: (presetSubject?: string) => void;
}

export function HeaderAndMenu({
  currentPage,
  onNavigate,
  onOpenChat,
}: HeaderAndMenuProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const [menuOpen, setMenuOpen] = useState(false);
  const [belgianTime, setBelgianTime] = useState('Kasterlee · 14:30');

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat(t.header.clockLocale, {
          timeZone: 'Europe/Brussels',
          hour: '2-digit',
          minute: '2-digit',
        }).format(now);
        const dateStr = new Intl.DateTimeFormat(t.header.clockLocale, {
          timeZone: 'Europe/Brussels',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(now);
        setBelgianTime(`${timeStr} · ${dateStr}`);
      } catch {
        setBelgianTime(t.header.fallbackClock);
      }
    };
    updateClock();
    const interval = window.setInterval(updateClock, 30000);
    return () => window.clearInterval(interval);
  }, [t.header.clockLocale, t.header.fallbackClock]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPage = (route: PageRoute) => {
    onNavigate(route);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="relative z-40 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-5 pb-3 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSelectPage('Home');
          }}
          className="group flex items-center gap-2 sm:gap-2.5 text-[#141416] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D28] rounded-md"
        >
          <WebstudioLogoMark />
          <span className="wordmark-gradient text-[17px] sm:text-[21px] font-semibold tracking-[-0.03em]">
            Webstudio K
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label={t.header.navAria}
          className="hidden lg:flex items-start gap-8 text-[13.5px] font-normal text-[#1F1F23]"
        >
          {t.header.navPages.map((item) => {
            const isActive = currentPage === item.route;
            return (
              <div key={item.route} className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleSelectPage(item.route)}
                  className={`inline-flex items-center gap-1 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D28] rounded-sm ${
                    isActive
                      ? 'text-[#121214] font-medium'
                      : 'text-[#4C433F] hover:text-[#121214]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-flower"
                    className="mt-1"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  >
                    <ActiveNavFlower />
                  </motion.span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Belgium Desk + Language Switcher + Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          <div className="hidden xl:flex items-center gap-4 border-l border-[#C5C6CA] pl-4">
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] text-[#4C433F] font-normal">
                {t.header.belgiumRegion}
              </span>
              <span className="text-[11px] text-[#18181B] font-medium tabular-nums mt-0.5 whitespace-nowrap">
                {belgianTime}
              </span>
            </div>
          </div>

          <LanguageSwitcher compact />

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={t.header.menuLabel}
            className="inline-flex items-center gap-2 rounded-lg border border-[#C7C8CC] bg-[#E3E4E7]/85 hover:bg-[#DADCE0] px-2.5 sm:px-4 min-h-[38px] sm:min-h-[40px] text-[11px] font-semibold tracking-[0.06em] text-[#18181B] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28]"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block w-3 h-[1.5px] bg-[#18181B]" />
              <span className="block w-3 h-[1.5px] bg-[#18181B]" />
            </span>
            <span className="hidden xs:inline sm:inline">{t.header.menuLabel}</span>
          </button>
        </div>
      </header>

      {/* Slide-Over Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex justify-end"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm bg-[#F2F2F2] h-full p-6 sm:p-8 flex flex-col justify-between border-l border-[#D3D6DA] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#D3D6DA]">
                  <div className="group flex items-center gap-2 text-[#141416]">
                    <WebstudioLogoMark />
                    <span className="wordmark-gradient text-[18px] font-semibold tracking-[-0.02em]">
                      Webstudio K
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label={t.header.closeMenuAria}
                    className="w-10 h-10 rounded-full border border-[#D3D6DA] flex items-center justify-center text-[#18181B] hover:bg-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-7 flex flex-col gap-2">
                  {t.header.navPages.map((item, idx) => {
                    const isActive = currentPage === item.route;
                    return (
                      <motion.button
                        key={item.route}
                        type="button"
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + idx * 0.04, duration: 0.3 }}
                        onClick={() => handleSelectPage(item.route)}
                        className={`flex items-center justify-between py-2.5 text-left text-[24px] font-medium tracking-tight transition-colors cursor-pointer ${
                          isActive ? 'text-[#121214]' : 'text-[#4C433F] hover:text-[#121214]'
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="text-[12px] font-normal tabular-nums text-[#4C433F]">
                            0{idx + 1}.
                          </span>
                          <span>{item.label}</span>
                        </span>
                        {isActive && <ActiveNavFlower />}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-7 pt-5 border-t border-[#D3D6DA] flex flex-col gap-3">
                  <p className="text-[11px] font-medium text-[#4C433F]">
                    {t.header.languageLabelDrawer}
                  </p>
                  <LanguageSwitcher fullWidth />
                </div>

                <div className="mt-6 pt-5 border-t border-[#D3D6DA]">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenChat(t.common.defaultPresetSubject);
                    }}
                    className="w-full inline-flex items-center justify-between rounded-full bg-[#121214] hover:opacity-90 text-white px-5 py-3 min-h-[46px] text-[13px] font-medium transition-opacity cursor-pointer"
                  >
                    <span>{t.header.requestProposal}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[#D3D6DA] flex flex-col gap-3 text-[12.5px] text-[#4C433F]">
                <div>
                  <p className="text-[10px] text-[#4C433F]">{t.header.timeInBelgium}</p>
                  <p className="text-[12px] font-medium text-[#18181B] tabular-nums mt-0.5">
                    {belgianTime}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[#18181B]">
                    Kemelbeekstraat 16, 2460 Kasterlee
                  </p>
                  <p className="mt-0.5 text-[#4C433F]">info@webstudiok.be</p>
                  <p className="mt-0.5 text-[#4C433F] tabular-nums">+32 14 71 80 80</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
