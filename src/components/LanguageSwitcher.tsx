import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '../i18n/LanguageContext';
import { getTranslations } from '../i18n/translations';

const LANGUAGES: { code: Language; short: string }[] = [
  { code: 'nl', short: 'NL' },
  { code: 'fr', short: 'FR' },
  { code: 'en', short: 'EN' },
];

interface LanguageSwitcherProps {
  compact?: boolean;
  fullWidth?: boolean;
}

export function LanguageSwitcher({
  compact = false,
  fullWidth = false,
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const t = getTranslations(language);

  return (
    <div
      role="group"
      aria-label={t.header.languageGroupLabel}
      className={`inline-flex items-center rounded-lg border border-[#C7C8CC] bg-[#E3E4E7]/85 p-0.5 shrink-0 ${
        fullWidth ? 'w-full justify-between' : ''
      }`}
    >
      {!compact && (
        <span
          aria-hidden="true"
          className="hidden sm:inline-flex items-center justify-center pl-2 pr-1 text-[#4C433F]"
        >
          <Globe className="w-3.5 h-3.5" />
        </span>
      )}
      <div className={`flex items-center gap-0.5 ${fullWidth ? 'w-full' : ''}`}>
        {LANGUAGES.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              aria-pressed={isActive}
              aria-label={t.header.languageNames[item.code]}
              title={t.header.languageNames[item.code]}
              className={`rounded-md font-semibold tracking-[0.04em] transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28] ${
                fullWidth ? 'flex-1 py-2 text-[12px]' : 'px-2 sm:px-2.5 min-h-[32px] text-[10.5px] sm:text-[11px]'
              } ${
                isActive
                  ? 'bg-[#121214] text-white shadow-xs'
                  : 'text-[#4C433F] hover:text-[#121214] hover:bg-white/60'
              }`}
            >
              {item.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
