/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { MessageSquare } from 'lucide-react';
import type { PageRoute } from './data/webstudioData';
import { HeaderAndMenu } from './components/HeaderAndMenu';
import { Footer } from './components/Footer';
import { ChatModal } from './components/ChatModal';
import { PageTransition, ScrollProgressBar } from './components/MotionPrimitives';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { VisionPage } from './components/VisionPage';
import { SuccessToast, type ToastNotification } from './components/SuccessToast';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { getTranslations } from './i18n/translations';

function parseHashToRoute(): PageRoute {
  if (typeof window === 'undefined') return 'Home';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'services') return 'Services';
  if (hash === 'about') return 'About';
  if (hash === 'vision') return 'Vision';
  return 'Home';
}

function AppContent() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const [currentPage, setCurrentPage] = useState<PageRoute>(parseHashToRoute);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatPresetSubject, setChatPresetSubject] = useState(
    t.common.defaultPresetSubject
  );
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const showSuccessToast = (details: { title: string; description: string }) => {
    setToast({
      id: Date.now(),
      title: details.title,
      description: details.description,
    });
  };

  useEffect(() => {
    if (!chatModalOpen) {
      setChatPresetSubject(t.common.defaultPresetSubject);
    }
  }, [language, chatModalOpen, t.common.defaultPresetSubject]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(parseHashToRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    let ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.setAttribute('content', canonicalUrl);
  }, [currentPage]);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    const nextHash = `#${page.toLowerCase()}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChat = (presetSubject = t.common.defaultPresetSubject) => {
    setChatPresetSubject(presetSubject);
    setChatModalOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full hero-canvas flex flex-col justify-between overflow-x-hidden">
        <ScrollProgressBar />
        <HeaderAndMenu
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenChat={handleOpenChat}
        />

        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <PageTransition pageKey={currentPage}>
              {currentPage === 'Home' && (
                <HomePage
                  onNavigate={handleNavigate}
                  onOpenChat={handleOpenChat}
                  onSubmitSuccess={showSuccessToast}
                />
              )}
              {currentPage === 'Services' && (
                <ServicesPage
                  onNavigate={handleNavigate}
                  onOpenChat={handleOpenChat}
                />
              )}
              {currentPage === 'About' && (
                <AboutPage
                  onNavigate={handleNavigate}
                  onOpenChat={handleOpenChat}
                />
              )}
              {currentPage === 'Vision' && (
                <VisionPage
                  onNavigate={handleNavigate}
                  onOpenChat={handleOpenChat}
                />
              )}
            </PageTransition>
          </AnimatePresence>
        </main>

        <Footer onNavigate={handleNavigate} onOpenChat={handleOpenChat} />

        <AnimatePresence>
          {!chatModalOpen && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpenChat(t.common.defaultPresetSubject)}
              aria-label={t.common.floatingContactCta}
              className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 inline-flex items-center gap-2.5 rounded-full bg-[#121214] hover:bg-[#1E1E22] text-white border border-white/15 pl-2 pr-4 py-2 min-h-[46px] text-[13px] font-medium shadow-[0_14px_34px_rgba(7,7,9,0.28)] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28]"
            >
              <span className="w-8 h-8 rounded-full copper-pill-gradient flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-white" />
              </span>
              <span>{t.common.floatingContactCta}</span>
            </motion.button>
          )}
        </AnimatePresence>

        <ChatModal
          open={chatModalOpen}
          initialSubject={chatPresetSubject}
          onClose={() => setChatModalOpen(false)}
          onSubmitSuccess={showSuccessToast}
        />

        <SuccessToast toast={toast} onDismiss={() => setToast(null)} />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
