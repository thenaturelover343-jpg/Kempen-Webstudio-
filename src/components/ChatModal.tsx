import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslations } from '../i18n/translations';

interface ChatModalProps {
  open: boolean;
  initialSubject?: string;
  onClose: () => void;
  onSubmitSuccess?: (details: { title: string; description: string }) => void;
}

export function ChatModal({
  open,
  initialSubject,
  onClose,
  onSubmitSuccess,
}: ChatModalProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const resolvedInitialSubject = initialSubject || t.chat.scopeOptions[0];

  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState(resolvedInitialSubject);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setScope(resolvedInitialSubject);
      setError('');
      setSent(false);
    }
  }, [open, resolvedInitialSubject]);

  const handleClose = () => {
    setSent(false);
    setError('');
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError(t.chat.errorInvalidEmail);
      return;
    }
    if (message.trim().length < 5) {
      setError(t.chat.errorShortMessage);
      return;
    }
    setError('');
    setSent(true);
    onSubmitSuccess?.({
      title: t.chat.toastTitle,
      description: t.chat.toastDescription(name.trim(), trimmedEmail),
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg rounded-[28px] bg-[#F2F2F2] border border-[#D3D6DA] p-6 sm:p-8 shadow-2xl text-[#18181B]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[12px] font-medium text-[#FB4D27]">
                  {t.chat.brandLine}
                </p>
                <h2 className="text-[24px] font-medium tracking-tight text-[#121214] mt-0.5">
                  {t.chat.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label={t.chat.closeAria}
                className="w-10 h-10 rounded-full border border-[#C7C8CC] flex items-center justify-center text-[#18181B] hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#121214] text-white flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-[#FB4D27]" />
                </div>
                <h3 className="text-[19px] font-medium text-[#121214]">
                  {t.chat.sentTitle}
                </h3>
                <p className="mt-2 text-[14px] text-[#52525B] max-w-sm leading-relaxed">
                  {t.chat.sentBodyBeforeEmail}{' '}
                  <span className="font-medium text-[#18181B]">{email}</span>.{' '}
                  {t.chat.sentBodyBetweenEmailPhone}{' '}
                  <span className="font-medium text-[#18181B]">+32 14 71 80 80</span>.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-[#121214] hover:bg-[#FB4D27] text-white px-6 min-h-[42px] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  {t.chat.backToSite}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.chat.namePlaceholder}
                    className="w-full rounded-xl border border-[#C9CACD] bg-white px-4 py-3 text-[14px] text-[#18181B] placeholder:text-[#5E544F] focus:outline-none focus:border-[#121214]"
                  />
                  <input
                    type="text"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder={t.chat.businessPlaceholder}
                    className="w-full rounded-xl border border-[#C9CACD] bg-white px-4 py-3 text-[14px] text-[#18181B] placeholder:text-[#5E544F] focus:outline-none focus:border-[#121214]"
                  />
                </div>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.chat.emailPlaceholder}
                  className="w-full rounded-xl border border-[#C9CACD] bg-white px-4 py-3 text-[14px] text-[#18181B] placeholder:text-[#5E544F] focus:outline-none focus:border-[#121214]"
                />

                <div>
                  <label
                    htmlFor="chat-scope"
                    className="block text-[11.5px] font-medium text-[#4C433F] mb-1.5"
                  >
                    {t.chat.scopeLabel}
                  </label>
                  <select
                    id="chat-scope"
                    value={scope || resolvedInitialSubject}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full rounded-xl border border-[#C9CACD] bg-white px-4 py-3 text-[14px] text-[#18181B] focus:outline-none focus:border-[#121214]"
                  >
                    {!t.chat.scopeOptions.includes(resolvedInitialSubject) && (
                      <option value={resolvedInitialSubject}>
                        {resolvedInitialSubject}
                      </option>
                    )}
                    {t.chat.scopeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.chat.messagePlaceholder}
                  className="w-full rounded-xl border border-[#C9CACD] bg-white px-4 py-3 text-[14px] text-[#18181B] placeholder:text-[#5E544F] focus:outline-none focus:border-[#121214]"
                />

                <p className="text-[11.5px] text-[#4C433F] leading-relaxed">
                  {t.chat.privacyNote}
                </p>

                {error && (
                  <p className="text-[12.5px] text-[#FB4D27] font-medium">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="mt-1 rounded-full bg-[#121214] hover:bg-[#FB4D27] text-white min-h-[46px] px-6 text-[13.5px] font-medium transition-colors duration-200 cursor-pointer"
                >
                  {t.chat.submitButton}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
