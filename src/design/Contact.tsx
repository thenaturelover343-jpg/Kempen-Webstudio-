// Contactformulier (home, sectie "Contact") en contactvenster (ChatModal) uit het design, statisch.
// Velden, teksten en verzending (web3forms, met mailto als terugval) zijn die van de bestaande site; site.js doet de rest.
import { Check, X } from 'lucide-react';

const Hidden = ({ f }: { f: any }) => (
  <>
    {Object.entries(f.hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v as string} />)}
    <label className="kw-sr" aria-hidden="true">{f.labels.website}<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    <input className="kw-sr" type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" />
  </>
);

/** donker formulier (home) */
export function ContactForm({ f, idp = 'home' }: { f: any; idp?: string }) {
  const inp = 'w-full rounded-xl border border-white/15 bg-[#0A0A0C] px-4 py-3 text-[15px] text-white placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#D47A3B] aria-[invalid=true]:border-[#FB4D27]';
  const lab = 'block text-[15px] text-[#D3D6DA] mb-1.5';
  return (
    <form id="cform" data-kw-form="" noValidate action="https://api.web3forms.com/submit" method="post"
      className="rounded-[22px] bg-[#161618] border border-white/10 p-6 sm:p-8 flex flex-col gap-4">
      <Hidden f={f} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${idp}-name`} className={lab}>{f.labels.naam}</label>
          <input id={`${idp}-name`} name="naam" type="text" required autoComplete="name" placeholder={f.ph.naam} className={inp} />
        </div>
        <div>
          <label htmlFor={`${idp}-business`} className={lab}>{f.labels.zaak}</label>
          <input id={`${idp}-business`} name="zaak" type="text" autoComplete="organization" placeholder={f.ph.zaak} className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${idp}-email`} className={lab}>{f.labels.email}</label>
          <input id={`${idp}-email`} name="email" type="email" required autoComplete="email" placeholder={f.ph.email} className={inp} />
        </div>
        <div>
          <label htmlFor={`${idp}-topic`} className={lab}>{f.labels.dienst}</label>
          <select id={`${idp}-topic`} name="dienst" className="w-full rounded-xl border border-white/15 bg-[#0A0A0C] px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[#D47A3B]">
            {f.options.map((o: string) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${idp}-message`} className={lab}>{f.labels.bericht}</label>
        <textarea id={`${idp}-message`} name="bericht" rows={3} required placeholder={f.ph.bericht} className={inp} />
      </div>
      <p className="text-[16px] text-[#FB4D27] font-medium" data-err="" role="alert" hidden></p>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <p className="text-[16px] text-[#C8C8CC] max-w-xs kw-link" dangerouslySetInnerHTML={{ __html: f.privacy }} />
        <button type="submit" className="rounded-full copper-pill-gradient hover:opacity-90 text-white px-6 min-h-[46px] text-[15px] font-medium transition-opacity cursor-pointer whitespace-nowrap">
          <span data-label="">{f.submit}</span>
        </button>
      </div>
    </form>
  );
}

/** contactvenster (opent bij elke "Vrijblijvend voorstel aanvragen"-knop, zoals onOpenChat in het design) */
export function ChatModal({ f, s, title }: { f: any; s: any; title: string }) {
  const inp = 'w-full rounded-xl border border-[#C9CACD] bg-white px-4 py-3 text-[15px] text-[#18181B] placeholder:text-[#5E544F] focus:outline-none focus:border-[#121214] aria-[invalid=true]:border-[#FB4D27]';
  return (
    <div id="kw-chat" className="kw-modal fixed inset-0 z-50 flex items-center justify-center p-4" data-modal="">
      <div className="kw-dim absolute inset-0 bg-black/45 backdrop-blur-xs" data-chat-close="" />
      <div role="dialog" aria-modal="true" aria-labelledby="kw-chat-t"
        className="kw-card relative w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[28px] bg-[#F2F2F2] border border-[#D3D6DA] p-6 sm:p-8 shadow-2xl text-[#18181B]">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[16px] font-medium text-[#FB4D27]">{s.ui.chatBrand}</p>
            <h2 id="kw-chat-t" className="text-[24px] font-medium tracking-tight text-[#121214] mt-0.5">{title}</h2>
          </div>
          <button type="button" data-chat-close="" aria-label={s.ui.chatClose}
            className="w-10 h-10 rounded-full border border-[#C7C8CC] flex items-center justify-center text-[#18181B] hover:bg-white transition-colors cursor-pointer shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form data-kw-form="" noValidate action="https://api.web3forms.com/submit" method="post" className="flex flex-col gap-3.5">
          <Hidden f={f} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <label className="block"><span className="kw-sr">{f.labels.naam}</span><input type="text" name="naam" required autoComplete="name" placeholder={f.labels.naam} className={inp} /></label>
            <label className="block"><span className="kw-sr">{f.labels.zaak}</span><input type="text" name="zaak" autoComplete="organization" placeholder={f.labels.zaak} className={inp} /></label>
          </div>
          <label className="block"><span className="kw-sr">{f.labels.email}</span><input type="email" name="email" required autoComplete="email" placeholder={f.labels.email} className={inp} /></label>
          <div>
            <label htmlFor="chat-scope" className="block text-[16px] font-medium text-[#4C433F] mb-1.5">{f.labels.dienst}</label>
            <select id="chat-scope" name="dienst" className="w-full rounded-xl border border-[#C9CACD] bg-white px-4 py-3 text-[15px] text-[#18181B] focus:outline-none focus:border-[#121214]">
              {f.options.map((o: string) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <label className="block"><span className="kw-sr">{f.labels.bericht}</span><textarea name="bericht" required rows={3} placeholder={f.ph.bericht} className={inp} /></label>
          <p className="text-[16px] text-[#4C433F] leading-relaxed kw-link" dangerouslySetInnerHTML={{ __html: f.privacy }} />
          <p className="text-[16px] text-[#FB4D27] font-medium" data-err="" role="alert" hidden></p>
          <button type="submit" className="mt-1 rounded-full bg-[#121214] hover:bg-[#FB4D27] text-white min-h-[46px] px-6 text-[15px] font-medium transition-colors duration-200 cursor-pointer">
            <span data-label="">{f.submit}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export { Check };
