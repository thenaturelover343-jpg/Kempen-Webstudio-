// Footer.tsx uit het design, statisch. Ingevuld met de footer van Kempen Webstudio: Diensten, Sectoren, Pagina's,
// Contact, en onderaan de 9 plaatsen (Website laten maken in ...) als links.
import { ArrowUpRight } from 'lucide-react';
import { WebstudioLogoMark } from './brand';
import { FadeIn } from './primitives';

export function Footer({ s, cta }: { s: any; cta: { label: string; href: string } }) {
  const f = s.footer; if (!f) return null;
  const home = s.mob.find((m: any) => !m.items);
  const cols = f.cols.filter((c: any) => !/Website laten maken in|Faire créer un site web à|Have a website built in/i.test(c.title));
  const cities = f.cols.find((c: any) => /Website laten maken in|Faire créer un site web à|Have a website built in/i.test(c.title));
  const [copy, kbo, address, hours] = f.bottom;
  return (
    <footer className="relative bg-[#F2F2F2] text-[#18181B] overflow-hidden border-t border-[#D3D6DA]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[340px] flex items-center justify-center opacity-50">
        <div className="w-[520px] h-[520px] rounded-full border border-[#D3D6DA] wireframe-globe-light flex items-center justify-center translate-y-24">
          <div className="w-[340px] h-[340px] rounded-full border border-[#D3D6DA]" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 sm:pt-20 pb-10">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#D3D6DA]">
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div>
                <a href={home.href} aria-label={`Webstudio K – ${s.logoAria}`} className="group inline-flex items-center gap-2.5 text-[#141416] cursor-pointer">
                  <WebstudioLogoMark />
                  <span aria-hidden="true" className="font-title wordmark-gradient text-[22px] font-semibold tracking-[-0.03em]">Webstudio K</span>
                </a>
                <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-[#4C433F]" dangerouslySetInnerHTML={{ __html: f.summary }} />
              </div>
              <div>
                <a href={cta.href} data-chat=""
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#08080A] hover:bg-[#4C433F] text-white px-5 py-2.5 min-h-[42px] text-[15px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap">
                  <span>{cta.label}</span><ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-[15px]">
              {cols.map((c: any, ci: number) => (
                <nav key={c.title} aria-label={c.aria || c.title}>
                  <h2 className="text-[15px] font-semibold text-[#4C433F] mb-4" style={{ fontFamily: 'inherit' }}>{c.title}</h2>
                  <ul className={ci === 0 ? 'flex flex-col gap-2.5' : 'flex flex-col gap-2.5 text-[#4C433F]'}>
                    {c.links.map((l: any) => (
                      <li key={l.href + l.label}>
                        <a href={l.href} className={l.href.startsWith('mailto:') ? 'kw-ul text-[#18181B] font-medium hover:text-[#B85D28] transition-colors break-all' : ci === 0 ? 'kw-ul text-[#18181B] hover:text-[#B85D28] transition-colors' : 'kw-ul hover:text-[#18181B] transition-colors'}
                          dangerouslySetInnerHTML={{ __html: l.html }} />
                      </li>
                    ))}
                    {/Pagina|Pages/i.test(c.title) && f.cookieBtn && (
                      <li><button type="button" className="ck-open hover:text-[#18181B] transition-colors cursor-pointer text-left">{f.cookieBtn}</button></li>
                    )}
                    {/Contact/i.test(c.title) && address && <li className="text-[#4C433F]">{address}</li>}
                    {/Contact/i.test(c.title) && address && s.ui && s.ui.areaTitle && <li className="text-[#4C433F]">{s.ui.areaTitle}</li>}
                    {/Contact/i.test(c.title) && hours && <li className="text-[#4C433F]">{hours}</li>}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[15px] text-[#4C433F]">
          <p>{copy} · {kbo}</p>
          <nav aria-label={cities ? cities.title : ''} className="flex flex-wrap items-center gap-3">
            {cities && cities.links.map((l: any, i: number) => (
              <span key={l.href} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                <a href={l.href} title={`${cities.title} ${l.label}`} className="kw-ul hover:text-[#18181B] transition-colors">{l.label}</a>
              </span>
            ))}
            <span aria-hidden="true">·</span>
            <a href="#top" className="kw-ul text-[#18181B] font-medium hover:text-[#B85D28] transition-colors cursor-pointer">{s.ui.backToTop}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
