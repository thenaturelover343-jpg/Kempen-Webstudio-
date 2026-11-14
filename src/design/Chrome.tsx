// Vaste onderdelen van elke pagina: voortgangsbalk (ScrollProgressBar), zwevende contactknop (App.tsx) en
// cookiemelding. De cookiemelding bestaat niet in het design: ze volgt de stijl van SuccessToast.tsx (donkere kaart,
// koperen rand en balk), met de teksten en keuzes van de huidige site.
import { MessageSquare, Phone } from 'lucide-react';

export function ScrollProgressBar() {
  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 h-[2.5px] pointer-events-none bg-black/[0.06]">
      <div data-progress="" className="kw-prog h-full w-full origin-left bg-gradient-to-r from-[#5E2A11] via-[#B85D28] to-[#FB4D27]" />
    </div>
  );
}

export function FloatingCta({ s }: { s: any }) {
  const [demo, call] = s.floating;
  if (!demo) return null;
  return (
    <div data-floating="" className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2">
      {call && (
        <a href={call.href} aria-label={call.label}
          className="kw-pop lg:hidden inline-flex items-center justify-center rounded-full bg-[#121214] text-white border border-white/15 w-[46px] h-[46px] shadow-[0_14px_34px_rgba(7,7,9,0.28)]">
          <span className="w-8 h-8 rounded-full copper-pill-gradient flex items-center justify-center"><Phone className="w-4 h-4 text-white" /></span>
        </a>
      )}
      <a href={demo.href} data-chat=""
        className="kw-pop inline-flex items-center gap-2.5 rounded-full bg-[#121214] hover:bg-[#1E1E22] text-white border border-white/15 pl-2 pr-4 py-2 min-h-[46px] text-[13px] font-medium shadow-[0_14px_34px_rgba(7,7,9,0.28)] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28]">
        <span className="w-8 h-8 rounded-full copper-pill-gradient flex items-center justify-center shrink-0"><MessageSquare className="w-4 h-4 text-white" /></span>
        <span>{demo.label}</span>
      </a>
    </div>
  );
}

export function CookieBanner({ s }: { s: any }) {
  const c = s.cookie; if (!c) return null;
  const btn = 'min-h-[38px] rounded-full px-4 text-[12.5px] font-medium transition-colors cursor-pointer';
  return (
    <div id="ck" hidden role="region" aria-labelledby="ck-t"
      className="fixed left-3 right-3 bottom-3 sm:left-auto sm:right-6 sm:bottom-6 z-[60] sm:w-full sm:max-w-md overflow-hidden rounded-2xl bg-[#121214]/95 backdrop-blur-md text-white border border-[#B85D28]/45 shadow-[0_18px_42px_rgba(7,7,9,0.32)] px-4 py-4">
      <h2 id="ck-t" className="text-[13.5px] font-medium text-white leading-snug" style={{ fontFamily: 'inherit' }}>{c.title}</h2>
      <p id="ck-d" className="mt-1 text-[12px] text-[#D3D6DA] leading-relaxed kw-link" dangerouslySetInnerHTML={{ __html: c.text }} />
      <div id="ck-set" hidden className="mt-3 flex flex-col">
        {c.rows.map((r: any) => (
          <label key={r.title} className="flex items-center justify-between gap-4 py-2.5 border-t border-white/10 cursor-pointer">
            <span className="flex flex-col">
              <span className="text-[12.5px] font-medium text-white">{r.title}</span>
              <span className="text-[11.5px] text-[#D3D6DA]">{r.small}</span>
            </span>
            <input type="checkbox" id={r.id || undefined} defaultChecked={r.disabled || r.checked} disabled={r.disabled} className="w-4 h-4 accent-[#B85D28] shrink-0" />
          </label>
        ))}
        <button type="button" data-ck="save" className={`${btn} mt-2 self-start copper-pill-gradient text-white hover:opacity-90`}>{c.save}</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {c.buttons.map((b: any, i: number) => (
          <button key={b.act} type="button" data-ck={b.act} aria-expanded={b.act === 'set' ? 'false' : undefined}
            className={`${btn} ${i === 0 ? 'bg-white text-[#121214] hover:bg-[#F2F2F2]' : 'bg-white/10 text-white hover:bg-white/20'}`}>{b.label}</button>
        ))}
      </div>
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5E2A11] via-[#B85D28] to-[#FB4D27]" />
    </div>
  );
}
