import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslations } from '../i18n/translations';

export interface ToastNotification {
  id: number;
  title: string;
  description: string;
}

interface SuccessToastProps {
  toast: ToastNotification | null;
  onDismiss: () => void;
  durationMs?: number;
}

export function SuccessToast({
  toast,
  onDismiss,
  durationMs = 5000,
}: SuccessToastProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss, durationMs]);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed top-5 right-5 sm:top-6 sm:right-6 z-[60] flex w-[calc(100vw-2.5rem)] max-w-sm justify-end"
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative w-full overflow-hidden rounded-2xl bg-[#121214]/95 backdrop-blur-md text-white border border-[#B85D28]/45 shadow-[0_18px_42px_rgba(7,7,9,0.32)] px-4 py-3.5"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-full copper-pill-gradient flex items-center justify-center shrink-0 mt-0.5"
              >
                <Check className="w-4 h-4 text-white" />
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-medium text-white leading-snug">
                  {toast.title}
                </p>
                <p className="mt-0.5 text-[12px] text-[#D3D6DA] leading-relaxed">
                  {toast.description}
                </p>
              </div>

              <button
                type="button"
                onClick={onDismiss}
                aria-label={t.common.dismissToastAria}
                className="w-7 h-7 rounded-full text-[#929090] hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: durationMs / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#5E2A11] via-[#B85D28] to-[#FB4D27]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
