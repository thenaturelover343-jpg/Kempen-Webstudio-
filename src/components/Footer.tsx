import { ArrowUpRight } from 'lucide-react';
import type { PageRoute } from '../data/webstudioData';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslations } from '../i18n/translations';
import { WebstudioLogoMark } from './BrandMarks';
import { FadeIn } from './MotionPrimitives';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenChat: (presetSubject?: string) => void;
}

export function Footer({ onNavigate, onOpenChat }: FooterProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F2F2F2] text-[#18181B] overflow-hidden border-t border-[#D3D6DA]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px] flex items-center justify-center opacity-50"
      >
        <div className="w-[520px] h-[520px] rounded-full border border-[#D3D6DA] wireframe-globe-light flex items-center justify-center translate-y-24">
          <div className="w-[340px] h-[340px] rounded-full border border-[#D3D6DA]" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 sm:pt-20 pb-10">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#D3D6DA]">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('Home');
                    scrollToTop();
                  }}
                  className="group inline-flex items-center gap-2.5 text-[#141416] cursor-pointer"
                >
                  <WebstudioLogoMark />
                  <span className="wordmark-gradient text-[22px] font-semibold tracking-[-0.03em]">
                    Webstudio K
                  </span>
                </button>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#4C433F]">
                  {t.footer.summary}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onOpenChat(t.common.defaultPresetSubject)}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#08080A] hover:bg-[#4C433F] text-white px-5 py-2.5 min-h-[42px] text-[13px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
                >
                  <span>{t.footer.cta}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-[14px]">
              <div>
                <p className="text-[12px] font-semibold text-[#4C433F] mb-4">
                  {t.footer.pagesHeading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {t.footer.pages.map((item) => (
                    <li key={item.route}>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate(item.route);
                          scrollToTop();
                        }}
                        className="text-[#18181B] hover:text-[#B85D28] transition-colors cursor-pointer text-left"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-[#4C433F] mb-4">
                  {t.footer.servicesHeading}
                </p>
                <ul className="flex flex-col gap-2.5 text-[#4C433F]">
                  {t.footer.serviceLinks.map((service) => (
                    <li key={service}>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('Services');
                          scrollToTop();
                        }}
                        className="hover:text-[#18181B] transition-colors cursor-pointer text-left"
                      >
                        {service}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-[#4C433F] mb-4">
                  {t.footer.contactHeading}
                </p>
                <div className="flex flex-col gap-2 text-[#4C433F]">
                  <p>Kemelbeekstraat 16</p>
                  <p>{t.footer.addressLine2}</p>
                  <a
                    href="mailto:info@webstudiok.be"
                    className="text-[#18181B] font-medium hover:text-[#B85D28] transition-colors mt-1"
                  >
                    info@webstudiok.be
                  </a>
                  <a
                    href="tel:+3214718080"
                    className="text-[13px] text-[#4C433F] hover:text-[#18181B] tabular-nums mt-0.5"
                  >
                    +32 14 71 80 80
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12.5px] text-[#4C433F]">
          <p>
            © {new Date().getFullYear()} Webstudio K · {t.footer.enterpriseNumber}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Gent</span>
            <span aria-hidden="true">·</span>
            <span>Leuven</span>
            <span aria-hidden="true">·</span>
            <span>Kortrijk</span>
            <span aria-hidden="true">·</span>
            <span>Turnhout</span>
            <span aria-hidden="true">·</span>
            <span>Geel</span>
            <span aria-hidden="true">·</span>
            <span>Herentals</span>
            <span aria-hidden="true">·</span>
            <span>Mol</span>
            <span aria-hidden="true">·</span>
            <span>Kasterlee</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="text-[#18181B] font-medium hover:text-[#B85D28] transition-colors cursor-pointer"
            >
              {t.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
