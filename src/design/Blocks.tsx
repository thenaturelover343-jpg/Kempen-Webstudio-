// Onderpagina's (diensten, sectoren, steden, kennis, kosten, privacy, 404 ...) uitsluitend opgebouwd met componenten
// en stijl uit het design: de hero van ServicesPage/AboutPage, de kaarten van ServicesPage (werkwijze), AboutPage
// (sectorkaarten met beeld, donkere voorbeeldkaarten, CTA-blok), de pakketkaarten, werkwijzekaarten en FAQ van de home.
// Inhoud letterlijk uit de bestaande pagina (model.mjs).
import { Fragment } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Quote } from 'lucide-react';
import { A, FadeIn, Html, Load, SectionReveal, StaggerGroup, StaggerItem, cx, sel } from './primitives';
import { FaqItem, HERO_ICONS, Steps, Tiers, split2 } from './Home';
import { ShowcaseEmblem } from './brand';

const W = 'max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10';
const strip = (h: string) => (h || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const Badge = ({ children, dark = false, light = false }: { children: any; dark?: boolean; light?: boolean }) => (
  <span className={dark ? 'inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[11.5px] font-medium text-[#D3D6DA]' : light ? 'inline-block rounded-md bg-white/75 px-3 py-1 text-[11.5px] font-medium text-[#4C433F]' : 'inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]'}>
    <span aria-hidden="true">• </span>{children}
  </span>
);
const H2 = ({ html, id, tag = 'h2', dark = false, className = '' }: { html: string; id?: string; tag?: string; dark?: boolean; className?: string }) => {
  const T = tag as any;
  return <T id={id || undefined} className={cx('text-[32px] sm:text-[44px] leading-[1.06] tracking-[-0.03em] font-normal [text-wrap:balance]', dark ? 'text-white' : 'text-[#121214]', className)} dangerouslySetInnerHTML={{ __html: html }} />;
};
const Prose = ({ html, dark = false, className = '' }: { html: string; dark?: boolean; className?: string }) => (
  <div className={cx('kw-prose kw-link text-[15px] leading-relaxed', dark ? 'text-[#D3D6DA] [&_a]:text-white [&_strong]:text-white' : 'text-[#4C433F] [&_strong]:text-[#121214]', className)} dangerouslySetInnerHTML={{ __html: html }} />
);
/** lijsten met prijzen of links in kaarten (wat-kost, voorbeeldontwerpen): opmaak in de stijl van de design-lijsten */
const LIST = '[&_.ls-l]:list-none [&_.ls-l]:pl-0 [&_.ix-l]:list-none [&_.ix-l]:pl-0 [&_.ls-l]:flex [&_.ls-l]:flex-col [&_.ls-l>li]:py-3 [&_.ls-l>li]:border-t [&_.ls-l>li]:border-[#D3D6DA] [&_.lr]:flex [&_.lr]:flex-wrap [&_.lr]:items-baseline [&_.lr]:justify-between [&_.lr]:gap-x-4 [&_.lr]:gap-y-1 [&_.lr_h4]:text-[14.5px] [&_.lr_h4]:font-medium [&_.lr_h4]:text-[#121214] [&_.lp]:text-[13px] [&_.lp]:font-medium [&_.lp]:tabular-nums [&_.lp]:text-[#9A4A1C] [&_.ld]:mt-1 [&_.ld]:text-[13px] [&_.ix-l]:flex [&_.ix-l]:flex-col [&_.ix-l>li]:flex [&_.ix-l>li]:justify-between [&_.ix-l>li]:gap-3 [&_.ix-l>li]:py-2.5 [&_.ix-l>li]:border-t [&_.ix-l>li]:border-[#D3D6DA] [&_.ix-l_a]:font-medium [&_.ix-l_a]:text-[#121214] [&_.ix-l_span]:text-[12.5px]';

function Btns({ ctas }: { ctas: any[] }) {
  if (!ctas || !ctas.length) return null;
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
      {ctas.map((c, i) => i === 0 ? (
        <A key={i} href={c.href} chat={c.href.includes('#contact')} className="kw-pop group inline-flex items-center gap-3 sm:gap-3.5 rounded-full bg-[#121214] hover:bg-[#232327] text-white pl-5 pr-1.5 py-1.5 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer max-w-full">
          <span>{c.label}</span><span className="w-8 h-8 rounded-full bg-white text-[#121214] flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"><ArrowRight className="w-3.5 h-3.5 stroke-[2]" /></span>
        </A>
      ) : (
        <A key={i} href={c.href} className="kw-pop inline-flex items-center justify-center rounded-full bg-[#4C433F] hover:bg-[#3A3330] text-white px-6 sm:px-7 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer text-center max-w-full">{c.label}</A>
      ))}
    </div>
  );
}

/** portret uit de home-hero; op onderpagina's kleiner op gsm (zelfde bestanden, dus uit de cache) */
export const PORTRAIT_SIZES_SUB = '(min-width: 1536px) 400px, (min-width: 1280px) 350px, (min-width: 1024px) 300px, 250px';
function SubPortrait() {
  const set = (e: string) => [360, 560, 760, 928].map(w => `/assets/img/hero-portret-${w}.${e} ${w}w`).join(', ');
  return (
    <div className="kw-portrait relative overflow-hidden select-none w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px] aspect-[3/4]">
      <picture>
        <source type="image/avif" srcSet={set('avif')} sizes={PORTRAIT_SIZES_SUB} />
        <img src="/assets/img/hero-portret-560.webp" srcSet={set('webp')} sizes={PORTRAIT_SIZES_SUB} width={928} height={1237} alt=""
          decoding="async" fetchPriority="high" draggable={false}
          className="kw-mask absolute inset-0 block w-full h-full object-cover object-[50%_10%] brightness-[1.06] contrast-[1.03]" />
      </picture>
    </div>
  );
}

/** hero van elke onderpagina: dezelfde opbouw en beeldtaal als de home-hero (portret, zwevende kaart, sectorlijst,
 *  WEBSTUDIO K-wordmark, donkere strip). Tekst, kruimelpad en knoppen uit de bestaande pagina. */
export function PageHero({ h, ui }: { h: any; ui?: any }) {
  const h1t = strip(h.h1);
  const cur = h.crumbs ? strip((h.crumbs.find((c: any) => c.current) || {}).html || '') : strip(h.tag || '');
  const msg = h1t.length <= 30 ? h1t : cur && cur.length <= 46 ? cur : '';
  const slides: { t: [string, string]; dup: boolean }[] = [
    ...(msg ? [{ t: split2(msg), dup: true }] : []),
    ...(h.trust || []).slice(0, 2).map((t: string) => ({ t: split2(strip(t)), dup: false })),
  ];
  const sec = h.sectors && h.sectors.chips && h.sectors.chips.length ? h.sectors : null;
  return (
    <SectionReveal immediate data-fl-hide="" aria-labelledby={h.sectionAria || undefined} className="relative hero-canvas overflow-hidden flex flex-col justify-between lg:min-h-[calc(100vh-76px)]">
      <div className={cx(W, 'w-full flex-1 flex flex-col justify-center pt-8 sm:pt-12 lg:pt-10')}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <FadeIn immediate className="relative z-20 lg:col-span-5 flex flex-col items-start">
            {h.crumbs ? (
              <nav aria-label={h.crumbAria} className="inline-block rounded-md bg-white/75 px-3 py-1 text-[11.5px] font-medium text-[#4C433F]">
                <ol className="flex flex-wrap items-center gap-x-1.5">
                  <li aria-hidden="true">•</li>
                  {h.crumbs.map((c: any, i: number) => (
                    <li key={i} className={cx('inline-flex items-center gap-x-1.5', c.mid && 'hidden sm:inline-flex')}>
                      {i > 0 && <span aria-hidden="true" className="text-[#929090]">/</span>}
                      {c.current ? <span aria-current="page" className="text-[#121214]" dangerouslySetInnerHTML={{ __html: c.html }} /> : <a href={c.href} className="hover:text-[#121214] transition-colors">{c.label}</a>}
                    </li>
                  ))}
                </ol>
              </nav>
            ) : h.tag ? <p className="text-[13px] sm:text-[13.5px] text-[#3F3F46] tracking-[-0.01em]"><span aria-hidden="true">| </span><Html html={h.tag} /></p> : null}
            <h1 id={h.h1id || undefined} className={cx('mt-4 leading-[0.98] tracking-[-0.04em] font-medium text-[#121214] [text-wrap:balance] max-w-full', h1t.length > 44 ? 'text-[clamp(2rem,8vw,2.9rem)] sm:text-[44px] lg:text-[40px] xl:text-[48px] 2xl:text-[54px]' : 'text-[clamp(2.1rem,8.6vw,3.1rem)] sm:text-[48px] lg:text-[46px] xl:text-[56px] 2xl:text-[62px]')} dangerouslySetInnerHTML={{ __html: h.h1 }} />
            {h.slogan && <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#4C433F] max-w-md xl:max-w-[440px] kw-link" dangerouslySetInnerHTML={{ __html: h.slogan }} />}
            <Btns ctas={h.ctas} />
          </FadeIn>

          {/* portret: op gsm in de flow onder de tekst, op desktop gecentreerd achter de inhoud zoals op de home */}
          <Load scale duration={0.6} aria-hidden="true" className="relative z-[15] flex justify-center -mb-24 sm:-mb-28 lg:mb-0 pointer-events-none lg:absolute lg:inset-x-0 lg:top-[6px] lg:bottom-[96px] lg:items-center lg:translate-x-[3%]">
            <SubPortrait />
          </Load>

          <Load delay={0.14} className="relative z-20 lg:col-span-4 lg:col-start-9 flex flex-col items-stretch lg:items-end gap-8 lg:gap-14 lg:pt-6">
            {slides.length > 0 && (
              <div data-sel="" data-sel-wrap="" className="mx-auto lg:mx-0 w-full max-w-[360px] xl:max-w-[392px] rounded-[24px] sm:rounded-[28px] p-3 sm:p-3.5 bg-gradient-to-br from-[#C4C5C8]/90 via-[#B8B9BC]/85 to-[#ABACB0]/90 border border-white/30 flex items-stretch gap-3.5 sm:gap-5 shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-xs">
                <div className="w-[118px] sm:w-[160px] h-[146px] sm:h-[168px] shrink-0 rounded-[18px] sm:rounded-[20px] bg-[#040405] flex items-center justify-center"><ShowcaseEmblem /></div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1 sm:py-1.5 pr-0.5 sm:pr-1">
                  <span aria-hidden="true" className="text-[11px] font-semibold text-[#18181B] tabular-nums">
                    {slides.map((_, i) => <span key={i} data-sel-panel={i} hidden={i > 0}>0{i + 1}</span>)}
                  </span>
                  <div className="my-auto pt-1 sm:pt-2" aria-live="polite">
                    {slides.map((sl, i) => (
                      <p key={i} data-sel-panel={i} hidden={i > 0} aria-hidden={sl.dup ? 'true' : undefined}
                        className={cx('font-title leading-[1.12] font-medium tracking-[-0.02em] text-[#141416]', (sl.t[0] + sl.t[1]).length > 30 ? 'text-[16px] sm:text-[18px]' : 'text-[19px] sm:text-[22px]')}>{sl.t[0]}<br />{sl.t[1]}</p>
                    ))}
                  </div>
                  {slides.length > 1 && (
                    <div className="flex items-center justify-between gap-2 sm:gap-3 pt-3 sm:pt-4">
                      <div className="flex-1 max-w-[80px] min-w-[36px] h-[2px] bg-[#18181B]/20 relative overflow-hidden">
                        {slides.map((_, i) => <div key={i} data-sel-item={i} {...sel(i === 0, 'opacity-100', 'opacity-0', 'absolute top-0 h-full bg-[#18181B] transition-opacity duration-200')} style={{ left: `${(i / slides.length) * 100}%`, width: `${100 / slides.length}%` }} />)}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button type="button" data-sel-prev="" aria-label={ui && ui.prev || '<'} className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-[#18181B]/12 hover:bg-[#18181B]/22 text-[#141416] flex items-center justify-center transition-colors cursor-pointer"><ArrowLeft className="w-3.5 h-3.5" /></button>
                        <button type="button" data-sel-next="" aria-label={ui && ui.next || '>'} className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-[#18181B]/15 hover:bg-[#18181B]/25 text-[#141416] flex items-center justify-center transition-colors cursor-pointer"><ArrowRight className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {sec && (
              <nav aria-label={strip(sec.title)} className="hidden sm:flex w-full lg:max-w-[408px] flex-col items-center lg:items-end">
                <p className="text-[13px] font-medium text-[#18181B] mb-3 lg:text-right">{strip(sec.title)}</p>
                {[sec.chips.slice(0, 4), sec.chips.slice(4, 8)].map((row: any[], r: number) => (
                  <div key={r} className={cx('flex flex-wrap items-center justify-center lg:justify-end gap-x-4 sm:gap-x-5 gap-y-2 text-[12px] sm:text-[12.5px] text-[#4C433F]', r > 0 && 'mt-2')}>
                    {row.map((c: any, i: number) => {
                      const Ico = HERO_ICONS[r * 4 + i];
                      return <a key={c.href} href={c.href} className="inline-flex items-center gap-1.5 whitespace-nowrap font-medium text-[#4C433F] hover:text-[#121214] transition-colors"><Ico /><span>{c.label}</span></a>;
                    })}
                  </div>
                ))}
              </nav>
            )}
          </Load>
        </div>
      </div>

      <div className="relative w-full pt-6 sm:pt-8 pb-5 sm:pb-6 overflow-hidden">
        <div aria-hidden="true" className="relative z-[5] pointer-events-none select-none w-full flex justify-center items-end overflow-hidden leading-[0.92] px-4">
          <span className="font-title wordmark-gradient font-semibold tracking-[-0.025em] text-[12.5vw] sm:text-[12vw] lg:text-[11vw] whitespace-nowrap">WEBSTUDIO K</span>
        </div>
        {h.trust && h.trust.length > 0 && (
          <div className={cx(W, 'relative z-[35] mt-3 sm:mt-4')}>
            <ul className="w-full rounded-2xl sm:rounded-full bg-[#121214]/95 backdrop-blur-md text-[#E4E4E7] px-5 sm:px-8 lg:px-10 min-h-[48px] sm:h-[54px] py-3 sm:py-0 flex flex-wrap max-sm:flex-col max-sm:items-start sm:flex-nowrap items-center justify-between gap-x-4 gap-y-1.5 text-[12px] sm:text-[13px] lg:text-[13.5px] font-normal shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
              {h.trust.map((t: string, i: number) => (
                <li key={i} className="inline-flex items-center gap-2 sm:whitespace-nowrap"><span aria-hidden="true" className="text-[#E4E4E7]">•</span><Html html={t} /></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SectionReveal>
  );
}

// ---------- secties ----------
function Sec({ dark, afterDark, first, children, id, aria, k }: any) {
  return (
    <SectionReveal id={id || undefined} aria-labelledby={aria || undefined}
      className={cx('relative overflow-hidden', dark ? 'bg-[#070709] text-white rounded-t-[28px] sm:rounded-t-[40px] -mt-4 py-16 sm:py-24' : cx('bg-[#FFFFFF] text-[#121214]', afterDark ? 'rounded-t-[28px] sm:rounded-t-[40px] -mt-4 pt-16 sm:pt-24 pb-14 sm:pb-20' : first ? 'pt-16 sm:pt-24 pb-14 sm:pb-20' : 'pb-14 sm:pb-20'))}>
      <div className={W}>
        {!dark && !afterDark && !first && <div aria-hidden="true" className="border-t border-[#E5E7EB] mb-14 sm:mb-20" />}
        {children}
      </div>
    </SectionReveal>
  );
}

function Head({ b, dark = false, center = false }: { b: any; dark?: boolean; center?: boolean }) {
  if (!b.h2 && !b.badge) return null;
  const side = b.side ? b.side.replace(/class="[^"]*"/g, '') : '';
  return (
    <FadeIn className={cx('mb-10 sm:mb-12', center ? 'text-center' : 'flex flex-col lg:flex-row lg:items-end justify-between gap-6')}>
      <div className={center ? 'max-w-3xl mx-auto' : ''}>
        {b.badge && <Badge dark={dark}>{b.badge}</Badge>}
        {b.h2 && <H2 html={b.h2} id={b.h2id} tag={b.h2tag} dark={dark} className={b.badge ? 'mt-3' : ''} />}
      </div>
      {side && <div className={cx('text-[14.5px] leading-relaxed max-w-md kw-link [&_.btn]:mt-4 [&_.btn]:inline-flex', dark ? 'text-[#929090]' : 'text-[#4C433F]', center && 'mx-auto mt-3')} dangerouslySetInnerHTML={{ __html: side }} />}
    </FadeIn>
  );
}

const Card = ({ c, i, dark, articles }: { c: any; i: number; dark: boolean; articles?: boolean }) => {
  const T = (c.htag || 'h3') as any;
  if (articles) return (
    <div className="group relative w-full h-full text-left rounded-[22px] bg-[#F2F2F2] hover:bg-[#E7E8EB] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200">
      <div>
        <T className="text-[19px] font-medium leading-snug text-[#121214] group-hover:text-[#B85D28] transition-colors [&_a]:after:absolute [&_a]:after:inset-0 [&_a]:after:rounded-[22px]" dangerouslySetInnerHTML={{ __html: c.h }} />
        <div className="mt-2.5 text-[13px] leading-relaxed text-[#4C433F] kw-prose" dangerouslySetInnerHTML={{ __html: c.body }} />
      </div>
      <div aria-hidden="true" className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#121214]"><ArrowUpRight className="w-3.5 h-3.5" /></div>
    </div>
  );
  if (dark || c.dark) return (
    <div id={c.id || undefined} className="h-full rounded-[24px] bg-[#161618] border border-white/10 p-7 flex flex-col">
      <span aria-hidden="true" className="text-[12px] tabular-nums text-[#D47A3B] font-medium">{String(i + 1).padStart(2, '0')}.</span>
      {c.h && <T id={c.hid || undefined} className="mt-4 text-[22px] font-medium tracking-[-0.02em] text-white" dangerouslySetInnerHTML={{ __html: c.h }} />}
      <div className={cx('mt-2.5 text-[14px] leading-relaxed text-[#B4B4BA] kw-prose kw-link [&_a]:text-white', LIST.replace(/#121214/g, '#FFFFFF').replace(/#D3D6DA/g, '#2E2E33').replace(/#9A4A1C/g, '#D47A3B'))} dangerouslySetInnerHTML={{ __html: c.body }} />
    </div>
  );
  return (
    <div id={c.id || undefined} className="h-full rounded-[22px] bg-[#F2F2F2] hover:bg-[#EAEBEC] border border-[#D3D6DA] hover:border-[#B85D28]/60 p-6 flex flex-col transition-colors duration-200">
      <span aria-hidden="true" className="text-[12px] tabular-nums font-semibold text-[#9A4A1C]">{String(i + 1).padStart(2, '0')}.</span>
      {c.h && <T id={c.hid || undefined} className="mt-3 text-[18px] font-medium text-[#121214]" dangerouslySetInnerHTML={{ __html: c.h }} />}
      <div className={cx('mt-2.5 text-[13.5px] leading-relaxed text-[#4C433F] kw-prose kw-link', LIST)} dangerouslySetInnerHTML={{ __html: c.body }} />
    </div>
  );
};

function Grid({ cards, dark, articles, cols }: { cards: any[]; dark: boolean; articles?: boolean; cols?: number }) {
  const n = cards.length;
  return (
    <StaggerGroup className={cols === 2 ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : GRID6}>
      {cards.map((c, i) => <StaggerItem key={i} i={i} className={cx('h-full', cols === 2 ? (n % 2 === 1 && i === n - 1 ? 'md:col-span-2' : '') : cx(span6(n, i), span2(n, i)))}><Card c={c} i={i} dark={dark} articles={articles} /></StaggerItem>)}
    </StaggerGroup>
  );
}

function Figure({ html, phone }: { html: string; phone?: boolean }) {
  if (!html) return null;
  return (
    <div className="w-full rounded-[24px] sm:rounded-[28px] copper-panel-gradient p-6 sm:p-10 flex items-center justify-center">
      <div className={cx('overflow-hidden shadow-2xl [&_figure]:m-0 [&_img]:w-full [&_img]:h-auto', phone ? 'w-full max-w-[260px] rounded-[34px] bg-[#050507] p-2 [&_img]:rounded-[28px]' : 'w-full rounded-[20px] bg-[#050507]')} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

const CAPS = ['bg-[#F2F2F2] hover:bg-[#E7E8EB] text-[#121214]', 'copper-pill-gradient text-white', 'bg-[#08080A] text-white', 'bg-[#D3D6DA] hover:bg-[#C7CACE] text-[#121214]'];
function Chips({ links, aria }: { links: any[]; aria?: string }) {
  if (links.length >= 2 && links.length <= 4) return (
    <nav aria-label={aria || undefined}>
      <ul className={cx('grid grid-cols-1 gap-3 sm:gap-4', links.length === 4 ? 'sm:grid-cols-2' : links.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
        {links.map((l: any, i: number) => (
          <li key={l.href + l.label}><a href={l.href} className={cx('font-title w-full h-[72px] sm:h-[88px] rounded-full flex items-center justify-center text-[20px] sm:text-[24px] font-normal tracking-[-0.03em] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28]', CAPS[i % 4])}>{l.label}</a></li>
        ))}
      </ul>
    </nav>
  );
  return (
    <nav aria-label={aria || undefined}>
      <ul className="flex flex-wrap gap-2.5">
        {links.map((l: any) => (
          <li key={l.href + l.label}><a href={l.href} className="inline-flex rounded-full bg-[#F2F2F2] hover:bg-[#121214] hover:text-white px-4 py-2 text-[13px] font-medium text-[#121214] transition-colors cursor-pointer">{l.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

// ---------- raster zonder gaten ----------
/** 6-kolommenraster op desktop: rijen van 3; een rest van 1 of 2 wordt over de volle breedte verdeeld (nooit een lege plek) */
function span6(n: number, i: number): string {
  if (n === 1) return 'lg:col-span-6';
  if (n === 2 || n === 4) return 'lg:col-span-3';
  const r = n % 3;
  if (r === 0) return 'lg:col-span-2';
  if (r === 2) return i >= n - 2 ? 'lg:col-span-3' : 'lg:col-span-2';
  return i >= n - 4 ? 'lg:col-span-3' : 'lg:col-span-2';
}
/** 2-kolommenraster op tablet: bij een oneven aantal neemt de laatste de volle breedte */
const span2 = (n: number, i: number) => (n % 2 === 1 && i === n - 1 ? 'sm:col-span-2' : '');
const GRID6 = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5';

// ---------- tekst opsplitsen in lead + alinea's ----------
/** bovenste elementen van een stuk HTML (p, ul, ol, a.btn ...); null als de opsplitsing niet zuiver is */
function topLevel(html: string): string[] | null {
  const parts = (html || '').match(/<(p|ul|ol|a|h3|h4|blockquote)\b[^>]*>[\s\S]*?<\/\1>/g) || [];
  const rest = parts.reduce((acc, p) => acc.replace(p, ''), html || '');
  return rest.trim() === '' && parts.length ? parts : null;
}
const isP = (e: string) => /^<p\b/.test(e) && !/^<p[^>]*>\s*<a [^>]*class="[^"]*btn/.test(e);
const isBtn = (e: string) => /^<a\b[^>]*class="[^"]*btn/.test(e) || /^<p[^>]*>\s*<a [^>]*class="[^"]*btn[^>]*>[\s\S]*?<\/a>\s*<\/p>$/.test(e);
const innerP = (e: string) => e.replace(/^<p\b[^>]*>/, '').replace(/<\/p>$/, '');
/** eerste zin apart (alleen als die zin geen opmaak bevat), zodat ze donker kan staan en de rest grijs */
function firstSentence(h: string): [string, string] {
  const m = h.match(/^([^<]{12,}?[.!?:])(\s+)([\s\S]+)$/);
  return m ? [m[1], m[3]] : [h, ''];
}

type Item = { html: string };
/** alinea's en lijsten groeperen: elke alinea een kaart, een lijst hoort bij de alinea ervoor */
function toItems(els: string[]): Item[] {
  const out: Item[] = [];
  for (const e of els) {
    if (/^<(ul|ol)\b/.test(e) && out.length) out[out.length - 1].html += e;
    else out.push({ html: e });
  }
  return out;
}

const LIST_DOT = '[&_ul]:list-none [&_ul]:pl-0 [&_ul]:mt-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:relative [&_li]:pl-7 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.3em] [&_li]:before:w-4 [&_li]:before:h-4 [&_li]:before:rounded-full [&_li]:before:bg-[#B85D28]/20 [&_li]:after:absolute [&_li]:after:left-[5px] [&_li]:after:top-[calc(0.3em+5px)] [&_li]:after:w-1.5 [&_li]:after:h-1.5 [&_li]:after:rounded-full [&_li]:after:bg-[#B85D28]';

/** grote lead-zin zoals de intro van de home: eerste zin donker, de rest grijs, met een koperen accentlijn */
function Lead({ html, dark, size }: { html: string; dark: boolean; size: number }) {
  const [a, b] = firstSentence(html);
  return (
    <div className="relative pl-5 sm:pl-7">
      <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-[#D47A3B] via-[#B85D28] to-[#5E2A11]" />
      <Quote aria-hidden="true" className={cx('w-6 h-6 mb-3', dark ? 'text-[#D47A3B]' : 'text-[#B85D28]')} />
      <p className={cx('font-title leading-[1.2] tracking-[-0.025em] font-normal [text-wrap:pretty] kw-link',
        size > 520 ? 'text-[18px] sm:text-[20px]' : size > 300 ? 'text-[20px] sm:text-[24px]' : 'text-[22px] sm:text-[30px]',
        dark ? 'text-white [&_a]:text-white' : 'text-[#121214]')}>
        <Html html={a} />{b && <span className={dark ? 'text-[#B4B4BA]' : 'text-[#4C433F]'}> <Html html={b} /></span>}
      </p>
    </div>
  );
}

/** genummerde kaarten (de werkwijze-/dienstkaarten van de home) voor de alinea's onder de lead */
function ParaCards({ items, dark, onPanel }: { items: Item[]; dark: boolean; onPanel?: boolean }) {
  const n = items.length;
  return (
    <StaggerGroup className={GRID6}>
      {items.map((it, i) => {
        const p = isP(it.html.split(/(?=<ul|<ol)/)[0]);
        const [a, b] = p ? firstSentence(innerP(it.html.split(/(?=<ul|<ol)/)[0])) : ['', ''];
        const lists = it.html.split(/(?=<ul|<ol)/).slice(1).join('');
        return (
          <StaggerItem key={i} i={i} className={cx('h-full', span6(n, i), span2(n, i))}>
            <div className={cx('h-full rounded-[22px] p-6 sm:p-7 flex flex-col gap-5', dark ? 'bg-[#161618] border border-white/10' : onPanel ? 'bg-white border border-[#E5E7EB]' : 'bg-[#F2F2F2] border border-[#D3D6DA]')}>
              <span aria-hidden="true" className={cx('font-title text-[40px] leading-[0.8] font-normal tracking-[-0.04em] tabular-nums', dark ? 'text-[#D47A3B]' : 'text-[#B85D28]')}>{String(i + 1).padStart(2, '0')}.</span>
              <div className={cx('text-[14.5px] leading-relaxed kw-prose kw-link max-w-[68ch]', LIST_DOT, dark ? 'text-[#B4B4BA] [&_a]:text-white [&_strong]:text-white' : 'text-[#4C433F] [&_strong]:text-[#121214]')}>
                {p ? (b ? <p><span className={cx('font-medium', dark ? 'text-white' : 'text-[#121214]')}><Html html={a} /></span> <Html html={b} /></p> : <p><Html html={a} /></p>) : <Html html={it.html.split(/(?=<ul|<ol)/)[0]} as="div" />}
                {lists && <Html html={lists} as="div" />}
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}

/** knoppen uit de tekst (a.btn) als de capsule-knop van de home */
function BtnRow({ els, dark }: { els: string[]; dark: boolean }) {
  if (!els.length) return null;
  return <div className={cx('mt-8 flex flex-wrap gap-3 [&_a]:inline-flex [&_a]:items-center [&_a]:rounded-full [&_a]:px-6 [&_a]:min-h-[46px] [&_a]:text-[13.5px] [&_a]:font-medium [&_a]:no-underline [&_p]:m-0', dark ? '[&_a]:bg-white [&_a]:!text-[#121214]' : '[&_a]:bg-[#121214] [&_a]:!text-white')} dangerouslySetInnerHTML={{ __html: els.join('') }} />;
}

/** groot sectienummer links (zoals de 01.-04. van de dienstkaarten): vult de linkerkolom onder de titel */
const BigNum = ({ n, dark }: { n: number; dark: boolean }) => n ? (
  <span aria-hidden="true" className={cx('hidden lg:block font-title text-[120px] xl:text-[150px] leading-[0.8] font-normal tracking-[-0.05em] tabular-nums select-none', dark ? 'text-[#D47A3B]/[0.28]' : 'text-[#B85D28]/[0.2]')}>{String(n).padStart(2, '0')}</span>
) : null;

/** tekstsectie: titel + groot nummer links, lead-zin rechts, overige alinea's als genummerde kaarten */
function ProseSection({ b, dark, panel }: { b: any; dark: boolean; panel: boolean }) {
  const els = topLevel(b.html);
  if (!els || b.fig) return null;
  const btns = els.filter(isBtn), body = els.filter(e => !isBtn(e));
  const first = body[0] && isP(body[0]) ? innerP(body[0]) : '';
  const items0 = toItems(first ? body.slice(1) : body);
  const solo = first && items0.length === 1 && !/<(ul|ol)/.test(items0[0].html) ? items0[0].html : '';
  const items = solo ? [] : items0;
  const onPanel = panel && !dark;
  return (
    <div className={cx(onPanel && 'rounded-[28px] bg-[#F2F2F2] border border-[#D3D6DA] p-6 sm:p-10 lg:p-12')}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        <FadeIn className="lg:col-span-5 flex flex-col justify-between gap-8">
          <div>
            {b.badge && <Badge dark={dark}>{b.badge}</Badge>}
            {b.h2 && <H2 html={b.h2} id={b.h2id} tag={b.h2tag} dark={dark} className={cx(b.badge && 'mt-3', '!text-[30px] sm:!text-[40px]')} />}
          </div>
          <BigNum n={b.num} dark={dark} />
        </FadeIn>
        <FadeIn delay={0.08} className="lg:col-span-7 flex flex-col justify-center">
          {first && <Lead html={first} dark={dark} size={strip(first).length} />}
          {solo && <div className={cx('mt-6 pl-5 sm:pl-7 text-[15px] leading-relaxed kw-link [&_strong]:font-medium', dark ? 'text-[#B4B4BA] [&_a]:text-white [&_strong]:text-white' : 'text-[#4C433F] [&_strong]:text-[#121214]')} dangerouslySetInnerHTML={{ __html: solo }} />}
          {!items.length && <BtnRow els={btns} dark={dark} />}
        </FadeIn>
      </div>
      {items.length > 0 && <div className="mt-10 sm:mt-12"><ParaCards items={items} dark={dark} onPanel={onPanel} /></div>}
      {items.length > 0 && <BtnRow els={btns} dark={dark} />}
    </div>
  );
}

export function Blocks({ blocks, s }: { blocks: any[]; s: any }) {
  let prevDark = false; let n = 0; let firstCards = true; let prevPlainProse = false; let num = 0;
  const out: any[] = [];
  for (const b of blocks) {
    const plainCards = b.kind === 'cards' && !b.lists && !b.articles && !b.duo;
    let dark = b.kind === 'prose' && b.spd || plainCards && b.spd;
    if (plainCards && firstCards && !prevDark) dark = true;
    if (plainCards) firstCards = false;
    if (dark && prevDark) dark = false;
    // ritme zoals op de home: twee witte tekstsecties na elkaar -> de tweede als lichtgrijs paneel
    if (b.kind === 'prose') { const plain = !dark && !b.fig; b.panel = plain && prevPlainProse; prevPlainProse = plain && !b.panel; } else prevPlainProse = b.kind === 'band' && !dark;
    if ((b.kind === 'prose' || b.kind === 'band') && b.h2) b.num = ++num;
    const props = { dark, afterDark: !dark && prevDark, first: n === 0 && !dark, id: b.id, aria: b.aria, k: n };
    out.push(<Fragment key={n}>{render(b, props, s)}</Fragment>);
    prevDark = dark; n++;
  }
  return <>{out}</>;
}

function render(b: any, P: any, s: any) {
  const dark = P.dark;
  switch (b.kind) {
    case 'band': {
      const romans = b.cards.length > 0 && !b.cards.some((c: any) => c.h);
      const cardsRight = romans && !b.fig && !!b.h2 && b.intro.length === 0 && !b.lead.length && !b.txt && !b.prose;
      const tail = (<>
        {b.pre && b.pre.map((p: string, i: number) => <Prose key={i} html={p} className="max-w-3xl mt-10" />)}
        {b.cards.length > 0 && b.cards.some((c: any) => c.h) && (
          <div className="mt-12"><Grid cards={b.cards} dark={false} articles={b.cards.some((c: any) => /<a /.test(c.h))} /></div>
        )}
        {romans && !cardsRight && (
          <div className="mt-12">
            {(() => { const nc = b.cards.length, ln = b.cards.map((c: any) => strip(c.body).length), longLast = nc === 3 && ln[2] > 1.8 * Math.max(ln[0], ln[1]); return (
            <StaggerGroup className={longLast ? 'grid grid-cols-1 md:grid-cols-3 gap-5' : GRID6}>
              {b.cards.map((c: any, i: number) => (
                <StaggerItem key={i} i={i} className={cx('h-full', longLast ? (i < 2 ? 'md:col-start-1' : 'md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2') : cx(span6(nc, i), span2(nc, i)))}>
                  <div className="h-full rounded-[24px] bg-[#F2F2F2] border border-[#D3D6DA] p-7 flex flex-col">
                    <span aria-hidden="true" className="font-title text-[20px] font-medium text-[#9A4A1C]">{['I.', 'II.', 'III.', 'IV.', 'V.'][i]}</span>
                    <div className="mt-6 text-[14px] leading-relaxed text-[#4C433F] kw-prose kw-link" dangerouslySetInnerHTML={{ __html: c.body }} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>); })()}
          </div>
        )}
        {b.extra && <div className="mt-8 text-[14.5px] leading-relaxed text-[#4C433F] kw-prose kw-link max-w-3xl" dangerouslySetInnerHTML={{ __html: b.extra.replace(/class="[^"]*"/g, '') }} />}
      </>);
      const nb = !b.fig && b.h2 ? topLevel([...b.lead.map((x: any) => '<p>' + x.html + '</p>'), b.txt || '', b.prose || ''].join('')) : null;
      const hasBody = b.lead.length > 0 || !!b.txt || !!b.prose;
      if (!b.fig && b.h2 && (nb || !hasBody)) {
        const els = nb || [];
        const useLead = b.intro.length === 0 && !!els[0] && isP(els[0]);
        const lead = useLead ? innerP(els[0]) : '';
        const rest0 = useLead ? els.slice(1) : els;
        const btns = rest0.filter(isBtn), items = toItems(rest0.filter(e => !isBtn(e)));
        const tail1 = items.length === 1 && !/<(ul|ol)/.test(items[0].html) ? items[0].html : '';
        const cards = tail1 ? [] : items;
        const chipsRight = !!b.chips && !cardsRight && b.intro.length === 0 && !lead && !tail1 && !b.introBtn && !btns.length && !cards.length;
        return (
          <Sec {...P}>
            <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between gap-8"><H2 html={b.h2} id={b.h2id} /><BigNum n={b.num} dark={false} /></div>
              <div className="lg:col-span-7 flex flex-col justify-center">
                {chipsRight && <Chips links={b.chips.links} aria={b.chips.aria} />}
                {cardsRight && (
                  <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {b.cards.map((c: any, i: number) => (
                      <StaggerItem key={i} i={i} className={cx('h-full', b.cards.length % 2 === 1 && i === b.cards.length - 1 && 'sm:col-span-2')}>
                        <div className="h-full rounded-[22px] bg-[#F2F2F2] border border-[#D3D6DA] p-6 sm:p-7 flex flex-col gap-4">
                          <span aria-hidden="true" className="font-title text-[28px] leading-none font-normal text-[#B85D28]">{['I.', 'II.', 'III.', 'IV.', 'V.', 'VI.'][i]}</span>
                          <div className="text-[14.5px] leading-relaxed text-[#4C433F] kw-prose kw-link" dangerouslySetInnerHTML={{ __html: c.body }} />
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                )}
                {b.intro.length > 0 ? (<div className="relative pl-5 sm:pl-7"><span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-[#D47A3B] via-[#B85D28] to-[#5E2A11]" />
              <p className={cx('font-title leading-[1.16] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance] kw-link first-letter:uppercase', strip(b.intro.join(' ')).length > 340 ? 'text-[18px] sm:text-[20px] lg:text-[22px]' : strip(b.intro.join(' ')).length > 190 ? 'text-[20px] sm:text-[24px] lg:text-[28px]' : 'text-[24px] sm:text-[32px] lg:text-[38px]')}>
                <Html html={b.intro[0]} />{b.intro.slice(1).map((t: string, i: number) => <span key={i} className="text-[#4C433F]"> <Html html={t} /></span>)}
              </p>
                </div>) : lead ? <Lead html={lead} dark={false} size={strip(lead).length} /> : null}
                {tail1 && <div className="mt-6 pl-5 sm:pl-7 text-[15px] leading-relaxed text-[#4C433F] kw-link max-w-2xl" dangerouslySetInnerHTML={{ __html: tail1 }} />}
                {b.introBtn && <div className="pl-5 sm:pl-7"><Btns ctas={[b.introBtn]} /></div>}
                <BtnRow els={btns} dark={false} />
              </div>
            </FadeIn>
            {cards.length > 0 && <div className="mt-10 sm:mt-12"><ParaCards items={cards} dark={false} /></div>}
            {b.chips && !chipsRight && <div className="mt-10 sm:mt-12"><Chips links={b.chips.links} aria={b.chips.aria} /></div>}
            {tail}
          </Sec>
        );
      }
      return (
      <Sec {...P}>
        {b.intro.length > 0 && (
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-12 sm:mb-16">
            {b.h2 && <div className="lg:col-span-5"><H2 html={b.h2} id={b.h2id} /></div>}
            <div className={cx('lg:col-span-7', !b.h2 && 'lg:col-start-6')}>
              <p className={cx('font-title leading-[1.16] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance] kw-link first-letter:uppercase', strip(b.intro.join(' ')).length > 340 ? 'text-[18px] sm:text-[20px] lg:text-[22px]' : strip(b.intro.join(' ')).length > 190 ? 'text-[20px] sm:text-[24px] lg:text-[28px]' : 'text-[24px] sm:text-[32px] lg:text-[38px]')}>
                <Html html={b.intro[0]} />{b.intro.slice(1).map((t: string, i: number) => <span key={i} className="text-[#4C433F]"> <Html html={t} /></span>)}
              </p>
              {b.introBtn && <Btns ctas={[b.introBtn]} />}
            </div>
          </FadeIn>
        )}
        <div className={cx('grid grid-cols-1 gap-10 items-start', (b.fig || b.prose || b.lead.length || b.chips) && 'lg:grid-cols-12')}>
          <FadeIn className={cx(b.fig ? 'lg:col-span-5' : 'lg:col-span-5')}>
            {b.h2 && b.intro.length === 0 && <H2 html={b.h2} id={b.h2id} />}
            {b.fig && b.lead.length > 0 && <div className="mt-6 flex flex-col gap-4">{b.lead.map((p: any, i: number) => <p key={i} className={cx('kw-link leading-relaxed', p.lead ? 'text-[16px] text-[#121214]' : 'text-[14.5px] text-[#4C433F]')} dangerouslySetInnerHTML={{ __html: p.html }} />)}</div>}
            {b.fig && b.txt && <Prose html={b.txt} className="mt-6 [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-7 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.35em] [&_li]:before:w-4 [&_li]:before:h-4 [&_li]:before:rounded-full [&_li]:before:bg-[#B85D28]/15" />}
          </FadeIn>
          {!b.fig && (b.lead.length > 0 || b.prose || b.chips) && (
            <FadeIn delay={0.08} className="lg:col-span-7 flex flex-col gap-6">
              {b.lead.map((p: any, i: number) => <p key={i} className={cx('kw-link leading-relaxed', p.lead ? 'text-[16px] sm:text-[18px] text-[#4C433F]' : 'text-[15px] text-[#4C433F]')} dangerouslySetInnerHTML={{ __html: p.html }} />)}
              {b.txt && <Prose html={b.txt} className="[&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-7 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.35em] [&_li]:before:w-4 [&_li]:before:h-4 [&_li]:before:rounded-full [&_li]:before:bg-[#B85D28]/15" />}
              {b.prose && <Prose html={b.prose} />}
              {b.chips && <Chips links={b.chips.links} aria={b.chips.aria} />}
            </FadeIn>
          )}
          {b.fig && <FadeIn delay={0.1} className="lg:col-span-7 flex lg:justify-end"><div className="w-full max-w-[640px]"><Figure html={b.fig} phone={b.figPhone} /></div></FadeIn>}
        </div>
        {tail}
      </Sec>
    ); }
    case 'cards': {
      const d = dark;
      if (b.duo) return (
        <Sec {...P}>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {b.cards.map((c: any, i: number) => (
              <StaggerItem key={i} i={i} className="h-full">
                <div className={cx('h-full rounded-[28px] p-8 sm:p-12 flex flex-col', c.dark ? 'copper-panel-gradient text-white' : 'bg-[#F2F2F2] border border-[#D3D6DA]')}>
                  <H2 html={c.h} id={c.hid} tag={c.htag} dark={c.dark} className="!text-[28px] sm:!text-[36px]" />
                  <div className={cx('mt-5 text-[15px] leading-relaxed kw-prose kw-link', c.dark ? 'text-white/90 [&_a]:text-white' : 'text-[#4C433F]')} dangerouslySetInnerHTML={{ __html: c.body }} />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Sec>
      );
      return (
        <Sec {...P}>
          <Head b={b} dark={d} />
          {b.pre.map((p: string, i: number) => <Prose key={i} html={p} dark={d} className="max-w-3xl mb-10" />)}
          <Grid cards={b.cards} dark={d} articles={b.articles} cols={b.lists ? 2 : undefined} />
          {b.after.map((p: string, i: number) => <Prose key={i} html={p} dark={d} className="max-w-3xl mt-8" />)}
        </Sec>
      );
    }
    case 'prose': { const ps = ProseSection({ b, dark, panel: !!b.panel }); if (ps) return <Sec {...P}>{ps}</Sec>; } return (
      <Sec {...P}>
        <div className={cx('grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start', !dark && !b.fig && (strip(b.html).length < 700 || b.panel) && 'rounded-[28px] bg-[#F2F2F2] border border-[#D3D6DA] p-7 sm:p-10 lg:p-12')}>
          <FadeIn className="lg:col-span-5 lg:sticky lg:top-8">
            {b.badge && <Badge dark={dark}>{b.badge}</Badge>}
            {b.h2 && <H2 html={b.h2} id={b.h2id} tag={b.h2tag} dark={dark} className={cx(b.badge && 'mt-3', '!text-[30px] sm:!text-[40px]')} />}
          </FadeIn>
          <FadeIn delay={0.08} className="lg:col-span-7 flex flex-col gap-8">
            <Prose html={b.html} dark={dark} className={cx('[&_.btn]:mt-6 [&_.btn]:inline-flex [&_.btn]:items-center [&_.btn]:rounded-full [&_.btn]:px-6 [&_.btn]:min-h-[46px] [&_.btn]:text-[13.5px] [&_.btn]:font-medium [&_.btn]:no-underline', dark ? '[&_.btn]:bg-white [&_.btn]:!text-[#121214]' : '[&_.btn]:bg-[#121214] [&_.btn]:text-white')} />
            {b.fig && <Figure html={b.fig} phone={b.figPhone} />}
          </FadeIn>
        </div>
      </Sec>
    );
    case 'steps': return (
      <Sec {...P}>
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            {b.badge && <span className="inline-block rounded-md bg-[#B85D28]/10 border border-[#B85D28]/20 px-3 py-1 text-[11.5px] font-medium text-[#5E2A11]"><span aria-hidden="true">• </span>{b.badge}</span>}
            <h2 id={b.h2id || undefined} className={cx(b.badge && 'mt-4', 'text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance]')} dangerouslySetInnerHTML={{ __html: b.h2 }} />
          </div>
        </FadeIn>
        <Steps items={b.items} chat={s.cta || s.floating[0]} ui={s.ui} />
        {(b.after || b.cta) && (
          <div className="mt-6 rounded-[20px] bg-[#F2F2F2] border border-[#D3D6DA] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[13.5px] text-[#4C433F] kw-link" dangerouslySetInnerHTML={{ __html: b.after || b.ctaNote }} />
            {b.cta && <A href={b.cta.href} chat={b.cta.href.includes('#contact')} className="inline-flex items-center gap-2 rounded-full copper-pill-gradient hover:opacity-90 text-white px-5 py-2.5 text-[12.5px] font-medium transition-opacity cursor-pointer whitespace-nowrap shrink-0"><span>{b.cta.label}</span><ArrowRight className="w-3.5 h-3.5" /></A>}
          </div>
        )}
      </Sec>
    );
    case 'pricing': return (
      <Sec {...P}>
        <Head b={b} center />
        <Tiers tiers={b.tiers} />
        {b.term.length > 0 && <div className="mt-8 text-center text-[12.5px] text-[#4C433F] max-w-2xl mx-auto kw-link">{b.term.map((t: string, i: number) => <p key={i} dangerouslySetInnerHTML={{ __html: t }} />)}</div>}
        {b.terms2 && (
          <div className="mt-6 rounded-[20px] bg-[#F2F2F2] border border-[#D3D6DA] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-[15px] font-medium text-[#121214]" style={{ fontFamily: 'inherit' }} dangerouslySetInnerHTML={{ __html: b.terms2.h }} />
              <p className="text-[13.5px] text-[#4C433F] mt-0.5 kw-link" dangerouslySetInnerHTML={{ __html: b.terms2.p }} />
            </div>
            {b.terms2.btn && <A href={b.terms2.btn.href} chat={b.terms2.btn.href.includes('#contact')} className="inline-flex items-center gap-2 rounded-full copper-pill-gradient hover:opacity-90 text-white px-5 py-2.5 text-[12.5px] font-medium transition-opacity cursor-pointer whitespace-nowrap shrink-0"><span>{b.terms2.btn.label}</span><ArrowRight className="w-3.5 h-3.5" /></A>}
          </div>
        )}
      </Sec>
    );
    case 'faq': {
      const groups = b.groups; const titled = groups.length > 1 && groups.every((g: any) => g.title);
      const all = groups.flatMap((g: any) => g.items.map((it: any) => ({ ...it, topic: titled ? g.title : '' })));
      return (
        <Sec {...P}>
          <div data-faq="">
            <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                {b.badge && <Badge>{b.badge}</Badge>}
                <h2 id={b.h2id || undefined} className={cx(b.badge && 'mt-3', 'text-[32px] sm:text-[42px] leading-[1.06] tracking-[-0.03em] font-normal text-[#121214]')} dangerouslySetInnerHTML={{ __html: b.h2 }} />
              </div>
            </FadeIn>
            <div className="flex flex-col lg:flex-row gap-3.5 items-start">
              {[all.slice(0, Math.ceil(all.length / 2)), all.slice(Math.ceil(all.length / 2))].map((col: any[], c: number) => col.length > 0 && (
                <div key={c} className="w-full lg:flex-1 min-w-0 flex flex-col gap-3.5">
                  {col.map((q: any, k: number) => { const i = c ? Math.ceil(all.length / 2) + k : k; return <FaqItem key={i} q={q} i={i} open={i === 0} topicLabel={titled} />; })}
                </div>
              ))}
            </div>
            {b.card && (
              <div className="mt-6 rounded-[20px] bg-[#F2F2F2] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-[13.5px] text-[#4C433F] kw-link">
                  {b.card.h && <h3 className="text-[15px] font-medium text-[#121214]" style={{ fontFamily: 'inherit' }} dangerouslySetInnerHTML={{ __html: b.card.h }} />}
                  {b.card.all.map((t: string, i: number) => <p key={i} className={i ? 'mt-1' : ''} dangerouslySetInnerHTML={{ __html: t }} />)}
                </div>
                {b.card.cta && <A href={b.card.cta.href} chat={b.card.cta.href.includes('#contact')} className="inline-flex items-center gap-2 text-[13px] font-medium text-[#121214] hover:text-[#B85D28] transition-colors cursor-pointer whitespace-nowrap shrink-0"><span>{b.card.cta.label}</span><ArrowRight className="w-3.5 h-3.5" /></A>}
              </div>
            )}
          </div>
        </Sec>
      );
    }
    case 'cta': return (
      <Sec {...P}>
        <FadeIn className="rounded-[28px] bg-[#070709] text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            {b.also && (
              <nav aria-label={b.also.aria || undefined} className="flex flex-wrap items-center gap-3 text-[12.5px] text-[#D3D6DA] mb-3">
                <span>{b.also.label}</span>
                {b.also.links.map((l: any) => (
                  <a key={l.href} href={l.href} className="inline-flex items-center gap-1.5 hover:text-white transition-colors"><MapPin className="w-3 h-3 text-[#D47A3B]" /><span>{l.label}</span></a>
                ))}
              </nav>
            )}
            <h2 id={b.h2id || undefined} className="text-[26px] sm:text-[34px] font-normal tracking-[-0.03em]" dangerouslySetInnerHTML={{ __html: b.h2 }} />
            {b.p.map((t: string, i: number) => <p key={i} className="mt-3 text-[15px] leading-relaxed text-[#D3D6DA] kw-link [&_a]:text-white" dangerouslySetInnerHTML={{ __html: t }} />)}
            {b.alt.map((t: string, i: number) => <p key={i} className="mt-2 text-[13px] leading-relaxed text-[#929090] kw-link [&_a]:text-white" dangerouslySetInnerHTML={{ __html: t }} />)}
          </div>
          {b.btn && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <A href={b.btn.href} chat={b.btn.href.includes('#contact')} className="inline-flex items-center gap-2.5 rounded-full copper-pill-gradient hover:opacity-90 text-white px-6 min-h-[46px] text-[13.5px] font-medium transition-opacity cursor-pointer">
                <span>{b.btn.label}</span><ArrowRight className="w-4 h-4" />
              </A>
            </div>
          )}
        </FadeIn>
      </Sec>
    );
    case 'demos': return (
      <Sec {...P}>
        <Head b={b} />
        <StaggerGroup className={b.items.length === 4 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' : GRID6}>
          {b.items.map((d: any, i: number) => (
            <StaggerItem key={i} i={i} className={cx('h-full', b.items.length !== 4 && cx(span6(b.items.length, i), span2(b.items.length, i)))}>
              <a href={d.href} target={d.newTab ? '_blank' : undefined} rel={d.newTab ? 'noopener' : undefined} className="group rounded-[24px] bg-[#F2F2F2] border border-[#D3D6DA] hover:border-[#B85D28]/60 p-5 flex flex-col justify-between h-full transition-colors">
                <div>
                  <div className="aspect-[4/3] rounded-[18px] overflow-hidden bg-[#D3D6DA] [&_picture]:block [&_picture]:h-full [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:object-top" dangerouslySetInnerHTML={{ __html: d.img }} />
                  <div className="mt-5">
                    <h3 className="text-[20px] font-medium text-[#121214]" dangerouslySetInnerHTML={{ __html: d.h }} />
                    <p className="mt-3 text-[13.5px] leading-relaxed text-[#4C433F]" dangerouslySetInnerHTML={{ __html: d.p }} />
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-[#D3D6DA] text-[13px] text-[#9A4A1C] font-medium inline-flex items-center gap-1.5"><span dangerouslySetInnerHTML={{ __html: d.l }} /><ArrowUpRight className="w-3.5 h-3.5" /></div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
        {b.fine.map((t: string, i: number) => <p key={i} className="mt-8 text-[13px] text-[#4C433F] kw-link" dangerouslySetInnerHTML={{ __html: t }} />)}
      </Sec>
    );
    case 'shot': return (
      <section className="bg-[#FFFFFF] pb-14 sm:pb-20" >
        <div className={W}>
          <FadeIn>
            <div className="relative mx-auto max-w-[1120px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#D3D6DA] bg-[#070709] max-h-[540px] w-full [&_picture]:block [&_img]:w-full [&_img]:h-auto [&_.bar]:hidden" dangerouslySetInnerHTML={{ __html: b.html }} />
          </FadeIn>
        </div>
      </section>
    );
    case 'legal': return (
      <Sec {...P}>
        <div className="flex flex-col gap-4 sm:gap-5">
          {b.items.map((it: any, i: number) => (
            <FadeIn key={i} className="rounded-[24px] bg-[#F7F7F8] border border-[#E5E7EB] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10">
              <div className="lg:col-span-4">
                <p aria-hidden="true" className="font-title text-[28px] font-normal tabular-nums text-[#9A4A1C]">{String(i + 1).padStart(2, '0')}</p>
                <h2 id={it.hid || undefined} className="mt-2 text-[19px] font-medium text-[#121214]" dangerouslySetInnerHTML={{ __html: it.h }} />
              </div>
              <Prose html={it.body} className="lg:col-span-8 text-[14.5px] [&_.pv-chips]:hidden" />
            </FadeIn>
          ))}
        </div>
      </Sec>
    );
    case 'raw': return <div  dangerouslySetInnerHTML={{ __html: b.html }} />;
    default: return null;
  }
}
