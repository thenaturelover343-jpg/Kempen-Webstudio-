// HeaderAndMenu.tsx uit het design, statisch: zelfde opmaak. Ingevuld met de navigatie van Kempen Webstudio
// (Diensten-submenu, Voorbeelden, Werkwijze, Kosten, Uitleg, Contact) en echte links per taal.
import { ArrowRight, ChevronDown, X } from 'lucide-react';
import { ActiveNavFlower, WebstudioLogoMark } from './brand';
import { cx } from './primitives';

type L = { label: string; href: string; html?: string; current?: boolean };

export function LanguageSwitcher({ s, compact = false, fullWidth = false }: { s: any; compact?: boolean; fullWidth?: boolean }) {
  return (
    <div role="group" aria-label={s.ui.langGroup}
      className={cx('inline-flex items-center rounded-lg border border-[#C7C8CC] bg-[#E3E4E7]/85 p-0.5 shrink-0', fullWidth && 'w-full justify-between')}>
      <div className={cx('flex items-center gap-0.5', fullWidth && 'w-full')}>
        {s.langs.map((l: any) => (
          <a key={l.short} href={l.href} hrefLang={l.hreflang} lang={l.hreflang} aria-current={l.current ? 'true' : undefined}
            aria-label={`${l.short} – ${l.label}`} title={l.label}
            className={cx('rounded-md font-semibold tracking-[0.04em] transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28] text-center',
              fullWidth ? 'flex-1 py-2 text-[12px]' : 'inline-flex items-center px-2 sm:px-2.5 min-h-[32px] text-[10.5px] sm:text-[11px]',
              l.current ? 'bg-[#121214] text-white shadow-xs' : 'text-[#4C433F] hover:text-[#121214] hover:bg-white/60')}>
            {l.short}
          </a>
        ))}
      </div>
    </div>
  );
}

const isCur = (href: string, s: any) => {
  const base = (u: string) => u.replace(/^\/(fr|en)(?=\/)/, '').split('#')[0];
  const here = base(s.url), t = base(href);
  if (!t || href.includes('#')) return false;
  if (t === '/') return here === '/';
  return here === t || (t === '/kennis/' && here.startsWith('/kennis/'));
};

export function Header({ s }: { s: any }) {
  const home = s.mob.find((m: any) => !m.items) as L; // eerste item = Home / Accueil
  const items: (L & { dd?: boolean })[] = [
    { label: home.label, href: home.href },
    ...(s.services ? [{ label: s.services.label, href: s.services.href, dd: true }] : []),
    ...s.navTop,
  ];
  const ddActive = s.services && s.services.items.some((i: L) => isCur(i.href, s));
  return (
    <>
      <header className="relative z-40 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-5 pb-3 flex items-center justify-between gap-2 sm:gap-6">
        <a href={home.href} aria-label={`Webstudio K – ${s.logoAria}`}
          className="group flex items-center gap-2 sm:gap-2.5 text-[#141416] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D28] rounded-md">
          <WebstudioLogoMark />
          <span aria-hidden="true" className="font-title wordmark-gradient text-[17px] sm:text-[21px] font-semibold tracking-[-0.03em]">Webstudio K</span>
        </a>

        <nav aria-label={s.navAria} className="hidden lg:flex items-start gap-6 xl:gap-8 text-[13.5px] font-normal text-[#1F1F23]">
          {items.map((item) => {
            const active = item.dd ? ddActive : isCur(item.href, s);
            if (item.dd) return (
              <div key="dd" className="relative flex flex-col items-center" data-dd="">
                <a href={item.href} data-dd-btn="" aria-controls="kw-dd-diensten"
                  className={cx('inline-flex items-center gap-1 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D28] rounded-sm',
                    active ? 'text-[#121214] font-medium' : 'text-[#4C433F] hover:text-[#121214]')}>
                  <span>{item.label}</span><ChevronDown className="w-3.5 h-3.5 kw-rot" aria-hidden="true" />
                </a>
                {active && <span className="mt-1"><ActiveNavFlower /></span>}
                <div id="kw-dd-diensten" className="kw-dd absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                  <div className="w-[270px] rounded-[20px] bg-[#F2F2F2] border border-[#D3D6DA] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex flex-col">
                    {s.services.items.map((i: L) => (
                      <a key={i.href + i.label} href={i.href} aria-current={isCur(i.href, s) ? 'page' : undefined}
                        className="flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] text-[#18181B] hover:bg-white transition-colors">
                        <span>{i.label}</span><ArrowRight className="w-3.5 h-3.5 text-[#4C433F]" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
            return (
              <div key={item.href + item.label} className="relative flex flex-col items-center">
                <a href={item.href} aria-current={active ? 'page' : undefined}
                  className={cx('inline-flex items-center gap-1 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D28] rounded-sm',
                    active ? 'text-[#121214] font-medium' : 'text-[#4C433F] hover:text-[#121214]')}>
                  <span>{item.label}</span>
                </a>
                {active && <span className="mt-1"><ActiveNavFlower /></span>}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          <div className="hidden xl:flex items-center gap-4 border-l border-[#C5C6CA] pl-4">
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] text-[#4C433F] font-normal">{s.ui.region}</span>
              <span className="text-[11px] text-[#18181B] font-medium tabular-nums mt-0.5 whitespace-nowrap min-w-[112px]" data-clock="">{s.ui.clockFallback}</span>
            </div>
          </div>
          <LanguageSwitcher s={s} compact />
          <button type="button" data-menu-open="" aria-label={s.menuOpen} aria-expanded="false" aria-controls="kw-menu"
            className="inline-flex items-center gap-2 rounded-lg border border-[#C7C8CC] bg-[#E3E4E7]/85 hover:bg-[#DADCE0] px-2.5 sm:px-4 min-h-[38px] sm:min-h-[40px] text-[11px] font-semibold tracking-[0.06em] text-[#18181B] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28]">
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block w-3 h-[1.5px] bg-[#18181B]" />
              <span className="block w-3 h-[1.5px] bg-[#18181B]" />
            </span>
            <span className="hidden xs:inline sm:inline">{s.ui.menu}</span>
          </button>
        </div>
      </header>

      {/* menupaneel (slide-over) */}
      <div id="kw-menu" className="kw-drawer fixed inset-0 z-50 flex justify-end" data-drawer="">
        <div className="kw-dim absolute inset-0 bg-black/35 backdrop-blur-xs" data-menu-close="" />
        <div role="dialog" aria-modal="true" aria-label={s.navAria}
          className="kw-panel relative w-full max-w-sm bg-[#F2F2F2] h-full p-6 sm:p-8 flex flex-col justify-between border-l border-[#D3D6DA] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-[#D3D6DA]">
              <div className="group flex items-center gap-2 text-[#141416]">
                <WebstudioLogoMark />
                <span className="font-title wordmark-gradient text-[18px] font-semibold tracking-[-0.02em]">Webstudio K</span>
              </div>
              <button type="button" data-menu-close="" aria-label={s.ui.menuClose}
                className="w-10 h-10 rounded-full border border-[#D3D6DA] flex items-center justify-center text-[#18181B] hover:bg-white transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav aria-label={s.navAria} className="mt-7 flex flex-col gap-2">
              {s.mob.map((item: any, idx: number) => {
                const num = <span className="text-[12px] font-normal tabular-nums text-[#4C433F]">0{idx + 1}.</span>;
                if (item.items) return (
                  <div key="acc" className="kw-di" style={{ ['--i' as any]: idx }} data-acc="">
                    <button type="button" aria-expanded="false" aria-controls="kw-m-diensten" data-acc-btn=""
                      className="w-full flex items-center justify-between py-2.5 text-left text-[24px] font-medium tracking-tight transition-colors cursor-pointer text-[#4C433F] hover:text-[#121214]">
                      <span className="inline-flex items-center gap-3">{num}<span>{item.label}</span></span>
                      <ChevronDown className="w-5 h-5 kw-rot" aria-hidden="true" />
                    </button>
                    <div id="kw-m-diensten" className="kw-acc">
                      <div>
                        <div className="flex flex-col gap-0.5 pb-2 pl-9">
                          {item.items.map((i: L) => (
                            <a key={i.href + i.label} href={i.href} className="py-1.5 text-[15px] text-[#4C433F] hover:text-[#121214] transition-colors">{i.label}</a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
                const active = isCur(item.href, s);
                return (
                  <a key={item.href + item.label} href={item.href} aria-current={active ? 'page' : undefined} style={{ ['--i' as any]: idx }}
                    className={cx('kw-di flex items-center justify-between py-2.5 text-left text-[24px] font-medium tracking-tight transition-colors cursor-pointer',
                      active ? 'text-[#121214]' : 'text-[#4C433F] hover:text-[#121214]')}>
                    <span className="inline-flex items-center gap-3">{num}<span>{item.label}</span></span>
                    {active && <ActiveNavFlower />}
                  </a>
                );
              })}
            </nav>

            <div className="mt-7 pt-5 border-t border-[#D3D6DA] flex flex-col gap-3">
              <p className="text-[11px] font-medium text-[#4C433F]">{s.ui.language}</p>
              <LanguageSwitcher s={s} fullWidth />
            </div>

            {s.mcl[0] && (
              <div className="mt-6 pt-5 border-t border-[#D3D6DA]">
                <a href={s.mcl[0].href} data-chat=""
                  className="w-full inline-flex items-center justify-between rounded-full bg-[#121214] hover:opacity-90 text-white px-5 py-3 min-h-[46px] text-[13px] font-medium transition-opacity cursor-pointer">
                  <span>{s.mcl[0].label}</span><ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          <div className="pt-6 mt-8 border-t border-[#D3D6DA] flex flex-col gap-3 text-[12.5px] text-[#4C433F]">
            <div>
              <p className="text-[10px] text-[#4C433F]">{s.ui.timeIn}</p>
              <p className="text-[12px] font-medium text-[#18181B] tabular-nums mt-0.5" data-clock="">{s.ui.clockFallback}</p>
            </div>
            <div>
              <p className="font-medium text-[#18181B]">Kemelbeekstraat 16, 2460 Kasterlee</p>
              {s.mcl.slice(1).map((a: L) => (
                <p key={a.href} className="mt-0.5"><a href={a.href} className="text-[#4C433F] hover:text-[#121214] tabular-nums">{a.label}</a></p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
