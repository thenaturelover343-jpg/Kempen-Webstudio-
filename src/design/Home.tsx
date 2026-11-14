// HomePage.tsx uit het design, statisch gerenderd. Zelfde secties, opbouw en klassen; gevuld met de teksten, links en
// CTA's van de huidige startpagina van Kempen Webstudio (per taal). Interactie (slider, keuzes, tabs, accordeon,
// cursor) doet site.js via data-attributen. Teksten die alleen in het design bestaan: zie src/site/ui-text.mjs.
import { Fragment } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { PartnerBookStoreIcon, PartnerCronaIcon, PartnerMercuryIcon, PartnerWagerIcon, PartnerZanticIcon, ShowcaseEmblem } from './brand';
import { A, FadeIn, Html, Load, SectionReveal, StaggerGroup, StaggerItem, cx, sel } from './primitives';
import { ContactForm } from './Contact';
import DD from '../site/design-data.json';

const DEMO_ID: Record<string, string> = { '/houtatelier-nethe/': 'houtatelier-nethe', '/horeca-voorbeeld/': 'bistro-tilvaar', '/webshop-voorbeeld/': 'vennebrand', '/dakwerken-hoogland/': 'dakwerken-hoogland', '/kleurwerk-voorbeeld/': 'atelier-kleurwerk', '/tuin-voorbeeld/': 'tuinzorg-varelinde', '/schoonheidssalon-voorbeeld/': 'velours', '/kapsalon-voorbeeld/': 'kapsalon-ivelien', '/barbier-voorbeeld/': 'barbier-kolvaard' };
const SECTOR_ID: Record<string, string> = { 'website-vakmensen': 'vakmensen', 'website-horeca': 'horeca', 'website-kapsalon': 'kapsalons', 'website-schilder': 'schilders', 'website-tuinaannemer': 'tuinaannemers' };
const H1_SPLIT: Record<string, string[]> = {
  nl: ['Website laten', 'maken, ', 'op maat', 'van ', 'uw zaak'],
  fr: ['Faire créer', 'un site web, ', 'sur mesure', 'pour ', 'votre entreprise'],
  en: ['Have a website', 'built, ', 'tailored', 'to ', 'your business'],
};
const Badge = ({ children, dark = false, copper = false }: { children: any; dark?: boolean; copper?: boolean }) => (
  <span className={copper ? 'inline-block rounded-md bg-[#B85D28]/10 border border-[#B85D28]/20 px-3 py-1 text-[11.5px] font-medium text-[#5E2A11]'
    : dark ? 'inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[11.5px] font-medium text-[#D3D6DA]'
    : 'inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]'}><span aria-hidden="true">• </span>{children}</span>
);
/** tekst in twee regels breken zoals in het design (op de laatste spatie vóór het midden, of na een komma) */
export function split2(t: string): [string, string] {
  const s = t.trim(); const c = s.indexOf(', ');
  if (c > 0 && c < s.length - 4) return [s.slice(0, c + 1), s.slice(c + 2)];
  const mid = s.length / 2; let best = -1;
  for (let i = 0; i < s.length; i++) if (s[i] === ' ' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  return best < 0 ? [s, ''] : [s.slice(0, best), s.slice(best + 1)];
}
const lastWord = (t: string): [string, string] => { const i = t.trim().lastIndexOf(' '); return i < 0 ? [t, ''] : [t.slice(0, i), t.slice(i + 1)]; };
const sentences = (t: string) => (t.match(/[^.!?]+[.!?]+/g) || [t]).map(x => x.trim());
const initials = (t: string) => t.replace(/^(Bistro|Atelier|Kapsalon|Barbier|Tuinzorg|Dakwerken|Houtatelier)\s/, (m) => m).slice(0, 2).toUpperCase();
const sizesPortrait = '(min-width: 1536px) 420px, (min-width: 1280px) 370px, (min-width: 1024px) 310px, (min-width: 640px) 400px, 360px';

function Portrait({ alt }: { alt: string }) {
  const set = (e: string) => [360, 560, 760, 928].map(w => `/assets/img/hero-portret-${w}.${e} ${w}w`).join(', ');
  return (
    <div className="kw-portrait relative overflow-hidden select-none w-full max-w-[360px] sm:max-w-[400px] lg:max-w-none lg:w-[310px] xl:w-[370px] 2xl:w-[420px] aspect-[3/4]">
      <picture>
        <source type="image/avif" srcSet={set('avif')} sizes={sizesPortrait} />
        <img src="/assets/img/hero-portret-760.webp" srcSet={set('webp')} sizes={sizesPortrait} width={928} height={1237} alt={alt}
          decoding="async" fetchPriority="high" draggable={false}
          className="kw-mask absolute inset-0 block w-full h-full object-cover object-[50%_10%] brightness-[1.06] contrast-[1.03]" />
      </picture>
    </div>
  );
}

export function Home({ h, s, f, x }: { h: any; s: any; f: any; x: any }) {
  const L = s.lang; const ui = s.ui; const dd = (DD as any)[L];
  const [t0, t1, t2] = h.hero.trust;
  const sp = H1_SPLIT[L]; const h1ok = sp && sp.join(' ').replace(/ ,/g, ',').replace(/\s+/g, ' ').replace(/ ([,])/g, '$1') && (sp[0] + ' ' + sp[1] + sp[2] + ' ' + sp[3] + sp[4]).replace(/\s+/g, ' ').trim() === h.hero.h1;
  const demoCta = h.hero.ctas[0];
  const icons = [PartnerZanticIcon, PartnerBookStoreIcon, PartnerWagerIcon, PartnerCronaIcon, PartnerMercuryIcon, PartnerWagerIcon, PartnerCronaIcon, PartnerBookStoreIcon];
  const slides = [split2(t1), split2(t0)];
  const works = h.werk.items; const nW = works.length;
  const sectors = h.vak.items;
  const metaSent = sentences(x.metaDesc);
  const [gl1, gl2] = split2(h.band.lead.replace(/<[^>]+>/g, ''));
  const [leadA, leadB] = sentences(h.vak.lead);
  const dienstSent = sentences(h.diensten.lead);
  const faq = h.faq; const groups = faq.groups; const allFaq = groups.flatMap((g: any) => g.items.map((it: any) => ({ ...it, topic: g.title })));
  const places = x.places;
  const awards = x.awards;
  return (
    <div className="w-full overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section aria-labelledby={h.hero.h1id} data-hero="" data-fl-hide="" className="relative min-h-[calc(100vh-76px)] w-full hero-canvas flex flex-col justify-between overflow-hidden">
        <div aria-hidden="true" data-aura="" className="hidden lg:block pointer-events-none absolute top-0 left-0 z-[12] w-[360px] h-[360px] -ml-[180px] -mt-[180px] rounded-full opacity-0 transition-opacity duration-300"
          style={{ background: 'radial-gradient(circle, rgba(184,93,40,0.14) 0%, rgba(251,77,39,0.06) 36%, rgba(255,255,255,0) 70%)' }} />
        <div aria-hidden="true" data-dot="" className="hidden lg:flex pointer-events-none absolute top-0 left-0 z-[25] w-6 h-6 -ml-3 -mt-3 rounded-full border border-[#B85D28]/45 bg-[#FB4D27]/10 items-center justify-center opacity-0 transition-opacity duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FB4D27]/80" />
        </div>

        {/* portret: op gsm bovenaan in de flow, op desktop gecentreerd achter de tekst (zoals de twee varianten in het design) */}
        <Load scale duration={0.6} aria-hidden="true" data-parallax=""
          className="relative z-30 w-full flex items-center justify-center pt-1 pb-0 px-3 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-[10px] lg:bottom-[95px] lg:p-0 lg:overflow-visible">
          <Portrait alt="" />
        </Load>

        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 pt-2 sm:pt-6 lg:pt-12 pb-2 sm:pb-6 flex-1 flex flex-col justify-start lg:justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
            <div className="relative z-20 lg:col-span-5 flex flex-col items-start">
              <Load as="p" y={14} duration={0.5} delay={0.02} className="text-[13px] sm:text-[13.5px] text-[#3F3F46] font-normal tracking-[-0.01em] mb-3 sm:mb-4">
                <span aria-hidden="true">| </span>{h.hero.tag}
              </Load>
              <Load as="h1" id={h.hero.h1id} y={24} duration={0.65} delay={0.1} className="text-[clamp(1.85rem,8.2vw,3.1rem)] sm:text-[48px] lg:text-[46px] xl:text-[56px] 2xl:text-[64px] leading-[0.98] tracking-[-0.04em] font-medium select-text max-w-full">
                {h1ok ? (<>
                  <span className="block text-[#18181B]">{sp[0]}</span>{' '}
                  <span className={cx('block', L === 'nl' && 'whitespace-nowrap')}><span className="text-[#18181B]">{sp[1]}</span><span className="headline-fade-delivering">{sp[2]}</span></span>{' '}
                  <span className={cx('block', L === 'nl' && 'whitespace-nowrap')}><span className="text-[#18181B]">{sp[3]}</span><span className="headline-fade-mat">{sp[4]}</span></span>
                </>) : h.hero.h1}
              </Load>
              <Load as="p" duration={0.6} delay={0.24} className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#4C433F] max-w-md lg:max-w-[380px] xl:max-w-[420px]">
                <Html html={h.hero.slogan} />
              </Load>
              <Load y={16} duration={0.55} delay={0.34} className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 sm:gap-3.5">
                <span className="text-[13px] sm:text-[13.5px] text-[#4C433F] font-normal tracking-[-0.01em]">{t0}<span aria-hidden="true"> · </span><span className="kw-sr">, </span>{t2}</span>
              </Load>
              <Load y={16} duration={0.55} delay={0.42} className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <A href={demoCta.href} chat className="kw-pop group inline-flex items-center gap-3 sm:gap-3.5 rounded-full bg-[#121214] hover:bg-[#232327] text-white pl-5 pr-1.5 py-1.5 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0">
                  <span>{demoCta.label}</span>
                  <span className="w-8 h-8 rounded-full bg-white text-[#121214] flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5"><ArrowRight className="w-3.5 h-3.5 stroke-[2]" /></span>
                </A>
                {h.hero.ctas[1] && (
                  <A href={h.hero.ctas[1].href} className="kw-pop inline-flex items-center justify-center rounded-full bg-[#4C433F] hover:bg-[#3A3330] text-white px-6 sm:px-7 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0">
                    {h.hero.ctas[1].label}
                  </A>
                )}
              </Load>
            </div>

            <Load delay={0.14} className="relative z-20 lg:col-span-4 lg:col-start-9 flex flex-col items-stretch lg:items-end justify-between lg:min-h-[395px] pt-1 lg:pt-2">
              <div data-sel="" data-sel-wrap="" className="order-2 lg:order-1 mt-6 lg:mt-0 mx-auto lg:mx-0 w-full max-w-[360px] xl:max-w-[392px] rounded-[24px] sm:rounded-[28px] p-3 sm:p-3.5 bg-gradient-to-br from-[#C4C5C8]/90 via-[#B8B9BC]/85 to-[#ABACB0]/90 border border-white/30 flex items-stretch gap-3.5 sm:gap-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] backdrop-blur-xs">
                <div className="w-[126px] sm:w-[172px] h-[152px] sm:h-[176px] shrink-0 rounded-[18px] sm:rounded-[20px] bg-[#040405] flex items-center justify-center"><ShowcaseEmblem /></div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1 sm:py-1.5 pr-0.5 sm:pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#18181B] tabular-nums">
                      {slides.map((_, i) => <span key={i} data-sel-panel={i} hidden={i > 0}>0{i + 1}</span>)}
                    </span>
                    <a href={x.werkwijzeHref} aria-label={x.werkwijzeLabel} className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-[#18181B]/12 hover:bg-[#18181B]/22 flex flex-col items-center justify-center gap-[2.5px] transition-colors cursor-pointer shrink-0">
                      <span className="block w-2.5 h-[1.5px] bg-[#18181B]" /><span className="block w-2.5 h-[1.5px] bg-[#18181B]" />
                    </a>
                  </div>
                  <div className="my-auto pt-1 sm:pt-2" aria-live="polite">
                    {slides.map(([a, b], i) => (
                      <p key={i} data-sel-panel={i} hidden={i > 0} className="font-title text-[19px] sm:text-[22px] leading-[1.12] font-medium tracking-[-0.02em] text-[#141416]">{a}<br />{b}</p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <div className="flex-1 max-w-[80px] min-w-[36px] h-[2px] bg-[#18181B]/20 relative overflow-hidden">
                      <div data-sel-item="0" {...sel(true, 'translate-x-0', 'translate-x-full', 'absolute top-0 h-full w-1/2 bg-[#18181B] transition-transform duration-200')} />
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button type="button" data-sel-prev="" aria-label={ui.prev} className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-[#18181B]/12 hover:bg-[#18181B]/22 text-[#141416] flex items-center justify-center transition-colors cursor-pointer"><ArrowLeft className="w-3.5 h-3.5" /></button>
                      <button type="button" data-sel-next="" aria-label={ui.next} className="w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-[#18181B]/15 hover:bg-[#18181B]/25 text-[#141416] flex items-center justify-center transition-colors cursor-pointer"><ArrowRight className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>

              <nav aria-label={h.band.h2} className="order-1 lg:order-2 w-full lg:max-w-[408px] mt-4 sm:mt-6 lg:mt-16 flex flex-col items-end">
                <p id={h.band.h2id || undefined} className="text-[13px] font-medium text-[#18181B] mb-3 text-right">{h.band.h2}</p>
                {[h.band.chips.slice(0, 4), h.band.chips.slice(4, 8)].map((row: any[], r: number) => (
                  <div key={r} className={r === 0 ? 'flex flex-wrap items-center justify-end gap-x-4 sm:gap-x-5 gap-y-2 text-[12px] sm:text-[12.5px] text-[#4C433F]' : 'flex flex-wrap items-center justify-end gap-x-4 sm:gap-x-6 gap-y-2 mt-2 text-[12px] sm:text-[12.5px] text-[#4C433F]'}>
                    {row.map((c: any, i: number) => {
                      const Ico = icons[r * 4 + i];
                      return (
                        <a key={c.href} href={c.href} className={cx('inline-flex items-center gap-1.5 whitespace-nowrap hover:text-[#121214] transition-colors', r === 0 && i === 0 ? 'font-semibold text-[#18181B]' : 'font-medium text-[#4C433F]')}>
                          <Ico /><span>{c.label}</span>
                        </a>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </Load>
          </div>
        </div>

        <div className="relative w-full pt-6 sm:pt-10 pb-5 sm:pb-6 overflow-hidden">
          <div aria-hidden="true" className="relative z-[5] pointer-events-none select-none w-full flex justify-center items-end overflow-hidden leading-[0.92] px-4">
            <span className="font-title wordmark-gradient font-semibold tracking-[-0.025em] text-[12.5vw] sm:text-[12vw] lg:text-[11vw] whitespace-nowrap">WEBSTUDIO K</span>
          </div>
          <div className="relative z-[35] w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 mt-3 sm:mt-4">
            <ul className="w-full rounded-2xl sm:rounded-full bg-[#121214]/95 backdrop-blur-md text-[#E4E4E7] px-5 sm:px-8 lg:px-10 min-h-[48px] sm:h-[54px] py-3 sm:py-0 flex flex-wrap max-sm:flex-col max-sm:items-start sm:flex-nowrap items-center justify-between gap-x-4 gap-y-1.5 text-[12px] sm:text-[13px] lg:text-[13.5px] font-normal shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
              <li className="inline-flex items-center gap-2 whitespace-nowrap"><span aria-hidden="true" className="text-[#E4E4E7]">•</span><span>{t0}</span></li>
              <li className="inline-flex items-center gap-2 whitespace-nowrap"><span aria-hidden="true" className="text-[#E4E4E7]">•</span><span>{t1}</span></li>
              <li><a href="#intro" className="inline-flex items-center gap-2 whitespace-nowrap hover:text-white transition-colors cursor-pointer"><span aria-hidden="true" className="text-[#E4E4E7]">•</span><span>{s.skip}</span></a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO + 4 CAPSULES, 3: VOORBEELDONTWERPEN, 4: SECTOREN, 5: VOOR EN NA */}
      <SectionReveal id="intro" className="relative bg-[#FFFFFF] text-[#121214] overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-12 w-[320px] h-[320px] opacity-65"><Globe3 /></div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 pb-14 sm:pb-20">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="contents lg:flex lg:col-span-5 lg:flex-col lg:justify-between lg:gap-20">
                <div className="order-1"><span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[11.5px] font-medium text-[#4C433F]"><span aria-hidden="true">• </span>{ui.badgeIntro}</span></div>
                <div className="order-3 lg:order-2 flex items-center gap-3.5 text-[12px] text-[#4C433F]">
                  <div className="w-8 h-8 rounded-full border border-[#D3D6DA] flex items-center justify-center shrink-0"><Globe className="w-4 h-4 text-[#121214]" /></div>
                  <div className="border-l border-[#D3D6DA] pl-3 leading-snug max-w-xs"><p>{gl1}</p><p>{gl2}</p></div>
                </div>
              </div>
              <div className="order-2 lg:order-none lg:col-span-7">
                <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] leading-[1.16] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance] text-center lg:text-left">
                  {metaSent[0]}{' '}<span className="text-[#4C433F]">{metaSent.slice(1).join(' ')}</span>
                </h2>
                <div className="mt-8 sm:mt-10 pt-5 border-t border-[#E5E7EB]">
                  <p className="text-[11.5px] text-[#4C433F] mb-4">{x.replyNote}</p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <a href="mailto:info@kempenwebstudio.be" aria-label="info@kempenwebstudio.be" className="w-9 h-9 rounded-full copper-pill-gradient text-white flex items-center justify-center hover:opacity-90 transition-opacity"><Mail className="w-4 h-4" /></a>
                      <a href="tel:+3214718080" aria-label="+32 14 71 80 80" className="w-9 h-9 rounded-full bg-[#F2F2F2] hover:bg-[#D3D6DA] text-[#4C433F] flex items-center justify-center transition-colors"><Phone className="w-4 h-4" /></a>
                      <a href={h.werk.cta.more.href} aria-label={h.werk.cta.more.label} className="w-9 h-9 rounded-full bg-[#F2F2F2] hover:bg-[#D3D6DA] text-[#4C433F] flex items-center justify-center transition-colors cursor-pointer"><Globe className="w-4 h-4" /></a>
                    </div>
                    <a href={h.werk.cta.more.href} className="inline-flex items-center gap-2 rounded-full border border-[#D3D6DA] bg-white hover:bg-[#F2F2F2] px-4 py-2 text-[12.5px] font-medium text-[#121214] transition-colors cursor-pointer">
                      <span>{h.werk.cta.more.label}</span><ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <StaggerGroup className="mt-12 sm:mt-16 grid grid-cols-1 max-w-[236px] mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StaggerItem i={0}><A href={demoCta.href} chat className="font-title w-full h-[96px] sm:h-[120px] rounded-full bg-[#F2F2F2] hover:bg-[#E7E8EB] flex items-center justify-center text-[24px] sm:text-[32px] font-normal tracking-[-0.03em] text-[#121214] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">{ui.capsules[0]}</A></StaggerItem>
            <StaggerItem i={1}><a href="#werkwijze" className="font-title w-full h-[96px] sm:h-[120px] rounded-full copper-capsule-gradient flex items-center justify-center text-[24px] sm:text-[32px] font-normal tracking-[-0.03em] text-white transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">{ui.capsules[1]}</a></StaggerItem>
            <StaggerItem i={2}><a href="#werk" aria-label={h.werk.badge} className="w-full h-[96px] sm:h-[120px] rounded-full bg-[#050507] hover:bg-[#1B1B1E] text-white flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"><ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" /></a></StaggerItem>
            <StaggerItem i={3}><a href="#diensten" className="font-title w-full h-[96px] sm:h-[120px] rounded-full bg-[#D3D6DA] hover:bg-[#C3C6CB] flex items-center justify-center text-[24px] sm:text-[32px] font-normal tracking-[-0.03em] text-[#18181B] transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer">{ui.capsules[2]}</a></StaggerItem>
          </StaggerGroup>
        </div>

        {/* SECTION 3: VOORBEELDONTWERPEN */}
        <div id="werk" className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-6 sm:pt-10 pb-16 sm:pb-24">
          <span id="voorbeelden" />
          <FadeIn className="text-center mb-8 sm:mb-10">
            <Badge>{h.werk.badge}</Badge>
            <h2 id={h.werk.h2id} className="mt-3 text-[34px] sm:text-[46px] lg:text-[54px] leading-[1.04] tracking-[-0.035em] font-normal text-[#121214]">{h.werk.h2}</h2>
            <p className="mt-3 max-w-2xl mx-auto text-[14px] text-[#4C433F] leading-relaxed"><Html html={h.werk.lead} /></p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div data-sel="" data-sel-wrap="" className="relative rounded-[24px] sm:rounded-[32px] bg-[#050507] text-white p-7 sm:p-12 lg:p-14 min-h-[420px] sm:min-h-[480px] flex flex-col justify-between overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 text-[12px] text-[#929090] tabular-nums">
                <span>{works.map((w: any, i: number) => <span key={i} data-sel-panel={i} hidden={i > 0}>0{i + 1} / 0{nW} · {w.cat}</span>)}</span>
                <div className="flex items-center gap-1.5">
                  {works.map((w: any, i: number) => (
                    <button key={i} type="button" data-sel-to={i} aria-label={`${ui.select} ${w.h}`} {...sel(i === 0, 'w-6 bg-[#D47A3B]', 'w-1.5 bg-white/25 hover:bg-white/50', 'h-1.5 rounded-full transition-all duration-200 cursor-pointer')} data-sel-item={i} />
                  ))}
                </div>
              </div>
              <div className="my-10 sm:my-14 flex items-center justify-center relative">
                {works.map((w: any, i: number) => (
                  <div key={i} data-sel-panel={i} hidden={i > 0} className="flex items-center justify-center gap-8 sm:gap-14">
                    <span aria-hidden="true" className="font-title text-[28px] sm:text-[42px] font-semibold tracking-tight text-white text-center">{w.h.slice(0, 2).toUpperCase()}</span>
                    <a href={w.href} target="_blank" rel="noopener" aria-label={`${w.h} ${ui.newWindow}`} className="w-12 h-12 rounded-full bg-[#242426] hover:bg-[#B85D28] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0"><ArrowUpRight className="w-4 h-4" /></a>
                  </div>
                ))}
              </div>
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {works.map((w: any, i: number) => (
                  <button key={i} type="button" data-sel-to={i} data-sel-item={i} aria-label={`${ui.select} ${w.h}`} {...sel(i === 0, 'copper-pill-gradient text-white font-medium', 'bg-white/8 text-[#929090] hover:text-white hover:bg-white/15', 'rounded-full px-3.5 py-1.5 text-[11.5px] transition-colors cursor-pointer')}>{w.h}</button>
                ))}
              </div>
              {works.map((w: any, i: number) => {
                const d = dd.demos[DEMO_ID[w.href]];
                return (
                  <div key={i} data-sel-panel={i} hidden={i > 0} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-4 border-t border-white/10">
                    <div className="max-w-md">
                      <p className="text-[11.5px] text-[#D47A3B] font-medium mb-1">{w.cat}</p>
                      <h3 className="text-[26px] sm:text-[32px] font-normal tracking-[-0.025em] text-white">{w.h}</h3>
                      <p className="mt-2 text-[12.5px] sm:text-[13px] leading-relaxed text-[#929090]"><Html html={w.p} /></p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#D3D6DA]">
                      {d && d.disciplines.map((t: string) => <span key={t} className="rounded-full border border-white/20 px-4 py-1.5 whitespace-nowrap">{t}</span>)}
                      <a href={w.btn.href} target="_blank" rel="noopener" className="rounded-full bg-white text-[#121214] hover:bg-[#F2F2F2] px-4 py-1.5 font-medium transition-colors cursor-pointer whitespace-nowrap"><Html html={w.btn.html} /></a>
                    </div>
                  </div>
                );
              })}
            </div>

            {h.werk.cta && (
              <div className="mt-6 rounded-[20px] bg-[#F2F2F2] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-[15px] font-medium text-[#121214]" style={{ fontFamily: 'inherit' }}><Html html={h.werk.cta.h} /></h3>
                  <p className="text-[13px] text-[#4C433F] mt-0.5"><Html html={h.werk.cta.p} /></p>
                </div>
                <A href={h.werk.cta.btn.href} chat className="inline-flex items-center gap-2 rounded-full bg-[#121214] hover:bg-[#27272A] text-white px-5 py-2.5 text-[12.5px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0">
                  <span>{h.werk.cta.btn.label}</span><ArrowRight className="w-3.5 h-3.5" />
                </A>
              </div>
            )}
          </FadeIn>
        </div>

        {/* SECTION 4: EEN PAAR SECTOREN UITGELICHT */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-6 sm:pt-12 pb-16 sm:pb-24">
          <FadeIn>
            <div data-sel="" className="">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <Badge>{h.vak.badge}</Badge>
                  <h2 id={h.vak.h2id} className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214]">{lastWord(h.vak.h2)[0]}<br />{lastWord(h.vak.h2)[1]}</h2>
                  {sectors.map((m: any, i: number) => {
                    const d = dd.sectors[SECTOR_ID[m.href.replace(/^\/(fr|en)\//, '/').replace(/\//g, '')]];
                    return (
                      <div key={i} data-sel-panel={i} hidden={i > 0} className="mt-6 max-w-sm">
                        <h3 className="text-[14px] font-medium text-[#121214]" style={{ fontFamily: 'inherit' }}>{m.h}{d && <> · <span className="text-[#4C433F] font-normal">{d.experience}</span></>}</h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#4C433F]"><Html html={m.p} /></p>
                        <a href={m.href} className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#B85D28] hover:text-[#121214] transition-colors cursor-pointer"><span>{m.arr}</span><ArrowRight className="w-3.5 h-3.5" /></a>
                      </div>
                    );
                  })}
                </div>
                <div className="lg:col-span-7 grid grid-cols-3 gap-3 justify-items-center lg:flex lg:flex-wrap lg:justify-end lg:gap-6">
                  {sectors.slice(0, 3).map((m: any, i: number) => <SectorBtn key={i} m={m} i={i} />)}
                </div>
              </div>
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 justify-items-center sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
                <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-6">
                  {sectors.slice(3, 5).map((m: any, i: number) => <SectorBtn key={i} m={m} i={i + 3} />)}
                </div>
                <a href={h.werk.cta.more.href} className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-[#4C433F] hover:bg-[#121214] text-white flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer">
                  <span className="font-title text-[24px] sm:text-[32px] lg:text-[34px] font-normal tabular-nums leading-none">{ui.moreNum}</span>
                  <span className="mt-1 text-[11px] sm:text-[11.5px] opacity-90">{ui.moreLabel}</span>
                </a>
              </div>
            </div>
            <div className="mt-10 pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-[#4C433F]">
              <span><span aria-hidden="true">• </span>{leadA}</span>
              <span><span aria-hidden="true">• </span>{leadB}</span>
              <a href={h.werk.cta.more.href} className="hover:text-[#121214] transition-colors cursor-pointer"><span aria-hidden="true">• </span>{h.werk.cta.more.label}</a>
            </div>
          </FadeIn>
        </div>

        {/* SECTION 5: VOOR EN NA */}
        {h.vn && (
          <div id="voor-na" className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-10 sm:pt-16 pb-20 sm:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <FadeIn className="lg:col-span-5 flex flex-col justify-between lg:min-h-[380px]">
                <div>
                  <Badge>{h.vn.badge}</Badge>
                  <h2 id={h.vn.h2id} className="mt-4 text-[30px] sm:text-[40px] leading-[1.06] tracking-[-0.03em] font-normal text-[#121214] [text-wrap:balance]">{h.vn.h2}</h2>
                  <A href={demoCta.href} chat className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#08080A] hover:bg-[#232327] text-white pl-5 pr-1.5 py-1.5 min-h-[44px] text-[13px] font-medium transition-colors cursor-pointer">
                    <span>{demoCta.label}</span><span className="w-8 h-8 rounded-full bg-white text-[#08080A] flex items-center justify-center"><ArrowRight className="w-3.5 h-3.5" /></span>
                  </A>
                </div>
                <div className="mt-12 flex items-center gap-3.5 text-[11.5px] text-[#4C433F]">
                  <div className="w-7 h-7 rounded-full border border-[#D3D6DA] flex items-center justify-center shrink-0"><span className="w-3 h-3 rounded-full border border-[#4C433F]" /></div>
                  <div className="border-l border-[#D3D6DA] pl-3 leading-snug"><p><Html html={h.vn.fine} /></p></div>
                </div>
              </FadeIn>
              <FadeIn delay={0.1} className="lg:col-span-7 flex lg:justify-end">
                <div className="w-full max-w-[490px] rounded-[24px] sm:rounded-[28px] copper-panel-gradient p-6 sm:p-10 flex items-center justify-center">
                  <div data-sel="" data-sel-wrap="" className="w-full max-w-[320px] rounded-[20px] bg-[#050507] text-white p-6 sm:p-7 flex flex-col justify-between min-h-[340px] shadow-2xl">
                    <div className="flex items-center justify-between">
                      <span aria-hidden="true" className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center text-[11px] font-semibold">K</span>
                      <button type="button" data-sel-next="" className="rounded-full border border-white/25 hover:border-white/60 px-3 py-1 text-[10.5px] text-white/90 transition-colors cursor-pointer">
                        <span data-sel-panel="0">{h.vn.voor}</span><span data-sel-panel="1" hidden>{h.vn.na}</span>
                      </button>
                    </div>
                    <div className="my-auto" data-sel-panel="0">
                      <p className="text-[11px] text-[#929090] mb-2">{h.vn.q}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-title text-[34px] sm:text-[38px] leading-none font-normal tracking-[-0.04em]">{h.vn.name}</span>
                      </div>
                      <p className="mt-3 text-[14px]"><span className="text-white">{h.vn.type} </span><span className="text-[#929090]">· {h.vn.reviews}</span></p>
                      <p className="mt-2 text-[11px] text-[#929090]">{h.vn.btns.join(' · ')}</p>
                      <p className="mt-3 text-[11px] text-[#A1A1AA] leading-relaxed">{h.vn.no}</p>
                    </div>
                    <a className="my-auto block rounded-[12px] overflow-hidden mt-4" data-sel-panel="1" hidden href={h.vn.naHref} target="_blank" rel="noopener">
                      <Html html={h.vn.naImg} as="span" className="block [&_img]:w-full [&_img]:h-auto" />
                    </a>
                    <div className="grid grid-cols-2 gap-1.5 pt-4">
                      {[h.vn.voor, h.vn.na].map((lbl: string, i: number) => (
                        <button key={i} type="button" data-sel-to={i} data-sel-item={i} aria-label={`${ui.show} ${lbl}`} {...sel(i === 0, 'bg-white', 'bg-white/20 hover:bg-white/40', 'h-[2.5px] rounded-full transition-colors cursor-pointer')} />
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        )}
      </SectionReveal>

      {/* SECTION 6 & 7: DIENSTEN & WERKGEBIED */}
      <SectionReveal id="diensten" className="relative bg-[#070709] text-white rounded-t-[28px] sm:rounded-t-[40px] overflow-hidden -mt-4">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 pb-16 sm:pb-24 relative">
          <div className="hidden lg:flex items-center gap-2.5 justify-end text-[11.5px] text-[#929090] mb-6" aria-hidden="true">
            <span className="text-right leading-tight">{dienstSent[0]}<br />{dienstSent.slice(1).join(' ')}</span>
            <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-white"><Globe className="w-3.5 h-3.5" /></span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <FadeIn className="lg:col-span-4 flex flex-col justify-between lg:min-h-[540px]">
              <div>
                <Badge dark>{h.diensten.badge}</Badge>
                <h2 id={h.diensten.h2id} className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-white">{split2(h.diensten.h2)[0]}<br />{split2(h.diensten.h2)[1]}</h2>
                <p className="mt-4 text-[13.5px] leading-relaxed text-[#929090]">{h.diensten.lead}</p>
                <a href={h.diensten.btn.href} className="mt-7 inline-flex items-center gap-3 rounded-full bg-white hover:bg-[#F2F2F2] text-[#08080A] pl-5 pr-1.5 py-1.5 min-h-[42px] text-[12.5px] font-medium transition-colors cursor-pointer">
                  <span>{h.diensten.btn.label}</span><span className="w-7 h-7 rounded-full bg-[#08080A] text-white flex items-center justify-center"><ArrowRight className="w-3.5 h-3.5" /></span>
                </a>
              </div>
              <div className="mt-12 lg:mt-0"><p className="text-[11.5px] text-[#929090]">{dienstSent.slice(1).join(' ')}</p></div>
            </FadeIn>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {h.diensten.items.map((d: any, i: number) => {
                const first = i === 0;
                return (
                  <Fragment key={d.id}>{(i === 0 || i === 3) && <div className="hidden sm:block" />}
                    <FadeIn delay={0.05 + i * 0.045}>
                      <div id={d.id} className={cx('group relative w-full text-left rounded-[20px] p-6 sm:p-7 min-h-[210px] sm:min-h-[230px] flex flex-col justify-between',
                        first ? 'copper-panel-gradient transition-transform duration-200 hover:-translate-y-0.5' : 'bg-[#1C1C1E] hover:bg-[#262629] border border-white/10 transition-colors duration-200')}>
                        <a href={d.more.href} className="absolute inset-0 rounded-[20px]" aria-label={`${d.h}: ${d.more.label}`} />
                        <div>
                          <h3 className="text-[18px] font-medium text-white">{d.h}</h3>
                          <p className={first ? 'mt-2 text-[12px] text-white/90 leading-relaxed' : 'mt-2 text-[12.5px] text-[#D3D6DA]/90 leading-relaxed'}><Html html={d.d} /></p>
                        </div>
                        <div className="flex items-end justify-between gap-2 pt-6">
                          <span aria-hidden="true" className={cx('font-title text-[56px] sm:text-[64px] leading-[0.8] font-normal tracking-[-0.04em] tabular-nums', first ? 'text-white/90' : 'text-[#D47A3B]')}>0{i + 1}.</span>
                          <div className={cx('text-right text-[11px] leading-snug', first ? 'text-white' : 'text-[#D3D6DA]')}>
                            <p className={cx('font-medium', !first && 'text-[#D47A3B]')}>{d.priceText}</p>
                            {d.chips.length > 0 && <p className={cx('relative z-10 mt-0.5 ml-auto max-w-[230px] [text-wrap:balance]', first ? 'text-white/90' : 'text-[#D3D6DA]/85')}>
                              {d.chips.map((c: string, k: number) => <Fragment key={k}>{k > 0 && <span aria-hidden="true" className="opacity-60"> · </span>}<Html html={c} /></Fragment>)}
                            </p>}
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 7: WERKGEBIED */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-20 sm:pb-28">
          <FadeIn className="text-center mb-10 sm:mb-12">
            <Badge dark>{ui.badgeArea}</Badge>
            <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-white">{ui.areaTitle}</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div data-sel="" className="relative min-h-[340px] sm:min-h-[400px] rounded-[24px] wireframe-globe-dark flex flex-col items-center justify-center p-6 overflow-hidden">
              {places.map((p: any, i: number) => (
                <button key={i} type="button" data-sel-to={i} data-sel-item={i} style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  {...sel(i === 0, 'scale-110 z-20', 'opacity-70 hover:opacity-100 z-10', 'hidden md:flex absolute -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-transform duration-200 cursor-pointer')}>
                  <span {...sel(i === 0, 'text-[#D47A3B]', 'text-[#D3D6DA]', 'text-[10.5px] font-medium whitespace-nowrap')}>{p.label}</span>
                  <MapPin {...sel(i === 0, 'text-[#D47A3B]', 'text-white', 'w-4 h-4')} />
                </button>
              ))}
              {places.map((p: any, i: number) => (
                <div key={i} data-sel-panel={i} hidden={i > 0} className="relative z-20 flex flex-col items-center text-center max-w-[300px]">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/20 bg-[#141416] shadow-2xl flex items-center justify-center"><ShowcaseEmblem /></div>
                  <p className="mt-3 text-[11px] text-[#929090]">{x.address}</p>
                  <p className="mt-2 text-[14px] font-medium text-white leading-snug">Kempen Webstudio<br /><span className="text-[#D3D6DA] font-normal">{x.regionLine}</span></p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {p.links.map((l: any) => (
                      <a key={l.href} href={l.href} className="rounded-full copper-pill-gradient hover:opacity-90 text-white px-5 py-2 text-[11.5px] font-medium transition-opacity cursor-pointer">{x.cityPrefix} {l.label}</a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex md:hidden flex-wrap justify-center gap-2 mt-6">
                {places.map((p: any, i: number) => (
                  <button key={i} type="button" data-sel-to={i} data-sel-item={i} {...sel(i === 0, 'copper-pill-gradient text-white', 'bg-[#1D1D20] text-[#D3D6DA]', 'px-3 py-1.5 rounded-full text-[11.5px] cursor-pointer')}>{p.label}</button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionReveal>

      {/* SECTION 8 & 9: PAKKETTEN & WERKWIJZE */}
      <SectionReveal className="relative bg-[#FFFFFF] text-[#121214] rounded-t-[28px] sm:rounded-t-[40px] -mt-4 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-16 sm:pt-24 pb-16 sm:pb-24">
          <div id="prijzen">
            <FadeIn className="text-center">
              <Badge copper>{h.pricing.badge}</Badge>
              <h2 id={h.pricing.h2id} className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214]"><Html html={h.pricing.h2} /></h2>
              <div className="mt-3 text-[14px] text-[#4C433F] max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: h.pricing.side.replace(/class="[^"]*"/g, '') }} />
            </FadeIn>
            <Tiers tiers={h.pricing.tiers} delivery={x.delivery} />
            <div className="mt-8 text-center text-[12.5px] text-[#4C433F] max-w-2xl mx-auto kw-link">{h.pricing.term.map((t: string, i: number) => <p key={i} dangerouslySetInnerHTML={{ __html: t }} />)}</div>
          </div>

          <div id="werkwijze" className="mt-20 sm:mt-24 pt-12 border-t border-[#E5E7EB]">
            <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <Badge copper>{h.steps.badge}</Badge>
                <h2 id={h.steps.h2id} className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance]">
                  <Html html={h.steps.h2} />
                </h2>
              </div>
              {ui.stepsSub && <p className="text-[14px] text-[#4C433F] max-w-md leading-relaxed">{ui.stepsSub}</p>}
            </FadeIn>
            <Steps items={h.steps.items} chat={demoCta} ui={ui} extras={h.steps.items.length === 4} />
            <div className="mt-6 rounded-[20px] bg-[#F2F2F2] border border-[#D3D6DA] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[13.5px] text-[#4C433F]"><Html html={h.steps.ctaNote} /></p>
              {h.steps.cta && (
                <A href={h.steps.cta.href} chat className="inline-flex items-center gap-2 rounded-full copper-pill-gradient hover:opacity-90 text-white px-5 py-2.5 text-[12.5px] font-medium transition-opacity cursor-pointer whitespace-nowrap shrink-0">
                  <span>{h.steps.cta.label}</span><ArrowRight className="w-3.5 h-3.5" />
                </A>
              )}
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* SECTION 10 & 11: REALISATIES + CASES */}
      <SectionReveal className="bg-[#070709] text-white pt-16 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <FadeIn>
            <div data-sel="">
              <Badge dark>{ui.badgeReal}</Badge>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-0 items-center">
                {x.partners.map((p: any, i: number) => (
                  <button key={i} type="button" data-sel-to={i} data-sel-item={i}
                    {...sel(i === 0, 'border-[#B85D28] text-[#D47A3B] bg-[#B85D28]/5', 'border-white/15 text-[#929090] hover:border-white/35 hover:text-white', 'aspect-square rounded-full border flex flex-col items-center justify-center p-4 text-center transition-all duration-200 cursor-pointer')}>
                    {p.globe && <Globe className="w-5 h-5 mb-1.5 text-white/80" />}
                    <span className="text-[12px] sm:text-[13px] font-medium leading-tight">{p.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11.5px] text-[#929090]">
                <span><span aria-hidden="true">• </span>Kempen Webstudio</span>
                <span className="kw-link max-w-xl">{x.partners.map((p: any, i: number) => <span key={i} data-sel-panel={i} hidden={i > 0} dangerouslySetInnerHTML={{ __html: p.note }} />)}</span>
                <span><span aria-hidden="true">• </span>{ui.region}</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="mt-14 sm:mt-16">
            <div id="cases" className="rounded-[24px] sm:rounded-[32px] bg-[#FFFFFF] testimonial-grid-bg text-[#121214] p-7 sm:p-12 lg:p-14">
              <Badge>{h.cases.badge}</Badge>
              <h2 id={h.cases.h2id} className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214]">{h.cases.h2}</h2>
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                {h.cases.items.map((c: any, i: number) => {
                  const dark = i === 1;
                  return (
                    <article key={i} className={cx('relative rounded-[20px] p-6 sm:p-7 min-h-[290px] flex flex-col justify-between', dark ? 'bg-[#2C2C2E] text-white' : 'bg-[#F7F7F8] text-[#121214] border border-[#ECECEE]')}>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[14px] font-semibold tracking-tight">{c.n} · <Html html={c.h} /></h3>
                        <span aria-hidden="true" className="w-14 h-14 rounded-xl bg-[#141416] flex items-center justify-center shrink-0 [&_svg]:w-9 [&_svg]:h-9"><ShowcaseEmblem /></span>
                      </div>
                      <p className={cx('my-6 text-[13.5px] leading-relaxed kw-link', dark ? 'text-[#E4E4E7]' : 'text-[#4C433F]')}><Html html={c.p} /></p>
                      <div className="flex items-end justify-between gap-3">
                        <p className="text-[12px] font-medium mt-0.5">{c.a.label}</p>
                        <span aria-hidden="true" className={cx('font-title text-[32px] leading-none font-normal tabular-nums', dark ? 'text-[#D47A3B]' : 'text-[#B85D28]')}>{c.n}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionReveal>

      {/* SECTION 12 & 13: VRAGEN + FAQ + CONTACT */}
      <SectionReveal className="bg-[#FFFFFF] text-[#121214] pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
          <FadeIn>
            <div data-sel="" className="relative min-h-[420px] sm:min-h-[480px] flex flex-col items-center justify-center">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-55">
                <div className="w-[360px] sm:w-[460px] h-[360px] sm:h-[460px]"><Globe3 /></div>
              </div>
              <div className="relative z-10 text-center max-w-md mx-auto">
                <Badge>{faq.badge}</Badge>
                <h2 className="mt-3 text-[32px] sm:text-[42px] leading-[1.06] tracking-[-0.03em] font-normal text-[#121214]">{faq.card && lastTwo(faq.card.h.replace(/<[^>]+>/g, ''))[0]}<br />{faq.card && lastTwo(faq.card.h.replace(/<[^>]+>/g, ''))[1]}</h2>
                {faq.card && <p className="mt-3 text-[13.5px] text-[#4C433F] leading-relaxed lg:max-w-[360px] lg:mx-auto"><Html html={faq.card.p} /></p>}
                {faq.card && (
                  <A href={faq.card.cta.href} chat className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#121214] hover:bg-[#B85D28] text-white px-5 py-2.5 text-[12.5px] font-medium transition-colors cursor-pointer">
                    <span>{faq.card.cta.label}</span><ArrowRight className="w-3.5 h-3.5" />
                  </A>
                )}
              </div>
              <div className="mt-10 lg:mt-0 grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center lg:block w-full">
                {awards.map((a: any, i: number) => {
                  const st = a.variant === 'dark' ? 'bg-[#252527] text-white' : a.variant === 'gray' ? 'bg-[#4C433F] text-white' : a.variant === 'clutch' ? 'bg-[#F8F8F9] text-[#121214] border border-[#E4E4E7] shadow-md' : 'bg-[#F4F4F6] text-[#121214] border border-[#ECECEE]';
                  return (
                    <div key={i} className={`lg:absolute ${a.positionClass} flex flex-col items-center`}>
                      <button type="button" data-sel-to={i} className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center p-3 text-center transition-transform duration-200 hover:scale-105 cursor-pointer ${st}`}>
                        <span className="text-[13.5px] font-semibold leading-tight">{a.title}</span>
                        <span className="mt-1 text-[10.5px] opacity-90">{a.subtitle}</span>
                      </button>
                      <span data-sel-panel={i} hidden={a.id !== 'belgie'} aria-hidden="true" className="mt-2 rounded-md bg-white border border-[#E5E7EB] shadow-sm px-2.5 py-1 text-[10.5px] font-medium text-[#121214] whitespace-nowrap">{a.subtitle}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* FAQ */}
          <div id="vragen" className="mt-20 sm:mt-24 pt-12 border-t border-[#E5E7EB]" data-faq="">
            <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <Badge>{faq.h2.replace(/<[^>]+>/g, '')}</Badge>
                <h2 id={faq.h2id} className="mt-3 text-[32px] sm:text-[42px] leading-[1.06] tracking-[-0.03em] font-normal text-[#121214]"><Html html={faq.h2} /></h2>
                {ui.faqSub && <p className="mt-2 text-[13.5px] text-[#4C433F] max-w-md">{ui.faqSub}</p>}
              </div>
              <div role="tablist" aria-label={ui.faqFilter} className="flex flex-wrap gap-2">
                {[ui.faqAll, ...groups.map((g: any) => g.title)].map((label: string, i: number) => (
                  <button key={i} type="button" role="tab" aria-selected={i === 0 ? 'true' : 'false'} data-topic={i === 0 ? '' : label}
                    {...sel(i === 0, 'bg-[#121214] text-white', 'bg-[#F2F2F2] text-[#4C433F] hover:bg-[#E7E8EB] hover:text-[#121214]', 'px-3.5 py-2 rounded-full text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28]')}>{label}</button>
                ))}
              </div>
            </FadeIn>
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {x.articles.map((p: any, i: number) => (
                <StaggerItem key={i} i={i}>
                  <div className="group relative w-full h-full text-left rounded-[22px] bg-[#F2F2F2] hover:bg-[#E7E8EB] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200">
                    <div>
                      <div className="flex items-center gap-2 text-[11.5px] text-[#4C433F]"><span className="text-[#9A4A1C] font-medium">{x.articlesLabel}</span></div>
                      <h3 className="mt-3 text-[19px] font-medium leading-snug text-[#121214] group-hover:text-[#B85D28] transition-colors">
                        <a href={p.href} className="after:absolute after:inset-0 after:rounded-[22px]">{p.title}</a>
                      </h3>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-[#4C433F]"><Html html={p.excerpt} /></p>
                    </div>
                    <div aria-hidden="true" className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#121214]"><span>{x.articlesCta}</span><ArrowUpRight className="w-3.5 h-3.5" /></div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-start">
              {allFaq.map((q: any, i: number) => <FaqItem key={i} q={q} i={i} open={i === 0} />)}
            </div>
            {faq.card && (
              <div className="mt-6 rounded-[20px] bg-[#F2F2F2] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[13.5px] text-[#4C433F] kw-link"><Html html={faq.card.note} /></p>
                <A href={demoCta.href} chat className="inline-flex items-center gap-2 text-[13px] font-medium text-[#121214] hover:text-[#B85D28] transition-colors cursor-pointer whitespace-nowrap shrink-0"><span>{demoCta.label}</span><ArrowRight className="w-3.5 h-3.5" /></A>
              </div>
            )}
          </div>

          {/* CONTACT */}
          {h.contact && (
            <div id="contact" className="mt-20 pt-14 border-t border-[#E5E7EB]">
              <div className="rounded-[28px] bg-[#070709] text-white p-7 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5">
                  <Badge dark>{h.contact.eyebrow}</Badge>
                  <h2 id={h.contact.h2id} className="mt-4 text-[30px] sm:text-[40px] leading-[1.06] tracking-[-0.03em] font-normal">{h.contact.h2}</h2>
                  <ol className="mt-7 flex flex-col gap-5 text-[13.5px]">
                    {h.contact.steps.map((st: any) => (
                      <li key={st.b} className="border-l border-white/15 pl-4"><p className="font-medium text-white">{st.b}</p><p className="text-[#D3D6DA] mt-0.5"><Html html={st.s} /></p></li>
                    ))}
                  </ol>
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-[13px]">
                    {h.contact.links.map((l: any) => (
                      <div key={l.href}>
                        <p className="text-[#929090] text-[11.5px]">{l.small}</p>
                        <a href={l.href} className="text-white font-medium hover:text-[#D47A3B] transition-colors tabular-nums" dangerouslySetInnerHTML={{ __html: l.b }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-7"><ContactForm f={f} /></div>
              </div>
            </div>
          )}
        </div>
      </SectionReveal>
    </div>
  );
}

const lastTwo = (t: string): [string, string] => { const w = t.trim().split(' '); if (w.length < 3) return [t, '']; return [w.slice(0, -2).join(' '), w.slice(-2).join(' ')]; };

function SectorBtn({ m, i }: { m: any; i: number }) {
  return (
    <button type="button" data-sel-to={i} className="relative group flex flex-col items-center cursor-pointer">
      <div data-sel-item={i} {...sel(i === 0, 'scale-[1.03]', 'opacity-90 hover:opacity-100', 'w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-[#D3D6DA] transition-transform duration-200')}>
        <img data-small="320" src={m.imgSrc} srcSet={m.imgSrcset || undefined} sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px" alt="" width={144} height={144} loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />
      </div>
      <span data-sel-item={i} {...sel(i === 0, 'mt-2 rounded-full copper-pill-gradient text-white text-[11px] font-medium px-3 py-1 shadow-md whitespace-nowrap', 'mt-2 text-[11px] sm:text-[11.5px] font-medium text-[#4C433F] text-center')}>{m.h}</span>
    </button>
  );
}

export function Tiers({ tiers, delivery }: { tiers: any[]; delivery?: string[] }) {
  return (
    <StaggerGroup className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">
      {tiers.map((tier: any, i: number) => {
        const cop = tier.hi; const obs = !cop && i === tiers.length - 1 && tiers.length === 3;
        const surface = cop ? 'copper-panel-gradient text-white shadow-[0_18px_40px_rgba(184,93,40,0.22)]' : obs ? 'bg-[#070709] text-white border border-[#B85D28]/45 shadow-[0_16px_36px_rgba(7,7,9,0.14)]' : 'bg-[#F2F2F2] text-[#121214] border border-[#D3D6DA]';
        const badge = cop ? 'bg-white/15 border-white/30 text-white' : obs ? 'bg-[#FB4D27]/15 border-[#FB4D27]/45 text-[#F1A36A]' : 'bg-[#B85D28]/10 border-[#B85D28]/25 text-[#5E2A11]';
        const soft = cop ? 'text-white/90' : obs ? 'text-[#D3D6DA]' : 'text-[#4C433F]';
        const monthAcc = cop ? 'text-white' : obs ? 'text-[#D47A3B]' : 'text-[#9A4A1C]';
        const check = cop ? 'bg-white/20 text-white' : obs ? 'bg-[#B85D28]/25 text-[#D47A3B]' : 'bg-[#B85D28]/12 text-[#B85D28]';
        const feat = cop ? 'text-white/95' : obs ? 'text-[#D3D6DA]' : 'text-[#4C433F]';
        const note = cop ? 'text-white/85 border-white/20' : obs ? 'text-[#D3D6DA]/90 border-white/15' : 'text-[#4C433F] border-[#D3D6DA]';
        const cta = cop ? 'bg-[#070709] hover:bg-[#18181B] text-white' : obs ? 'copper-pill-gradient hover:opacity-90 text-white' : 'bg-[#4C433F] hover:bg-[#5E2A11] text-white';
        const hTxt = tier.h.replace(/<[^>]+>/g, '');
        return (
          <StaggerItem key={i} i={i}>
            <article className={`h-full rounded-[24px] p-7 sm:p-8 flex flex-col justify-between ${surface}`}>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded-full border px-3.5 py-1 text-[11px] font-medium ${badge}`}><span aria-hidden="true">• </span>{tier.badge ? <>{tier.badge}<span aria-hidden="true"> · </span><span className="kw-sr">: </span>{hTxt}</> : hTxt}</span>
                  {delivery && delivery[i] && <span className={`text-[11px] ${soft}`}>{delivery[i]}</span>}
                </div>
                <div className="mt-6">
                  <h3 className="text-[28px] sm:text-[32px] leading-[1.06] tracking-[-0.03em] font-normal"><Html html={tier.h} /></h3>
                  {tier.for && <p className={`mt-2 text-[13px] ${soft}`}><Html html={tier.for} /></p>}
                  {tier.amt && (
                    <div className={`mt-5 pb-5 border-b ${cop ? 'border-white/20' : obs ? 'border-white/15' : 'border-[#D3D6DA]'}`}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[12px] opacity-85">{tier.from}</span>
                        <span className="font-title text-[36px] font-medium tabular-nums leading-none">{tier.amt}</span>
                        <span className="text-[12px] opacity-85">{tier.amtAfter}</span>
                      </div>
                      {tier.m.map((m: any, k: number) => (
                        <p key={k} className={`mt-2 text-[13px] tabular-nums ${m.ex ? (cop || obs ? 'text-white/80' : 'text-[#4C433F]') : (cop || obs ? 'text-white/80' : 'text-[#4C433F]')} [&_em]:not-italic [&_em]:font-medium ${cop ? '[&_em]:text-white' : obs ? '[&_em]:text-[#D47A3B]' : '[&_em]:text-[#9A4A1C]'}`}><Html html={m.ex ? m.html : m.html.replace(/^([^<€]*€\s?[\d.,]+)/, '<em>$1</em>')} /></p>
                      ))}
                    </div>
                  )}
                </div>
                {tier.list.length > 0 && (
                  <div className="mt-5">
                    {tier.listTitle && <p className={`${tier.list.some((it: any) => it.all) ? 'sr' : ''} text-[12px] font-semibold mb-3 ${cop || obs ? 'text-white' : 'text-[#121214]'}`}>{tier.listTitle}</p>}
                    <ul className="flex flex-col gap-2.5 text-[12.5px] leading-snug">
                      {tier.list.map((it: any, k: number) => it.all ? (
                        <li key={k} className={`font-semibold ${cop || obs ? 'text-white' : 'text-[#121214]'}`}><Html html={it.html} /></li>
                      ) : (
                        <li key={k} className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${check}`}><Check className="w-3 h-3" /></span>
                          <span className={feat}><Html html={it.html} /></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(tier.mp || tier.extra.length > 0) && (
                  <div className={`mt-4 pt-4 border-t text-[11.5px] leading-relaxed ${note} [&_b]:font-semibold [&_b]:after:content-[':_']`}>
                    {tier.mp && <p><Html html={tier.mp} /></p>}
                    {tier.extra.map((e: string, k: number) => <p key={k} className="kw-link"><Html html={e} /></p>)}
                  </div>
                )}
              </div>
              {tier.cta && (
                <div className="mt-7 pt-2 flex items-center justify-between gap-3">
                  <A href={tier.cta.href} chat={tier.cta.href.includes('#contact')} data-pakket={tier.cta.pakket || undefined}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[12.5px] font-medium transition-all cursor-pointer ${cta}`}>
                    <span>{tier.cta.label}</span><ArrowRight className="w-3.5 h-3.5" />
                  </A>
                </div>
              )}
            </article>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}

export function Steps({ items, chat, ui, extras = false }: { items: any[]; chat: any; ui: any; extras?: boolean }) {
  return (
    <StaggerGroup data-sel="" className={cx('grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch', items.length === 3 || items.length === 6 ? 'lg:grid-cols-3' : items.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4')}>
      {items.map((it: any, i: number) => {
        const on = i === 0;
        return (
          <StaggerItem key={i} i={i}>
            <div data-sel-to={i} data-sel-item={i} role="button" tabIndex={0} aria-label={`${ui.step} ${it.n.replace(/\D/g, '') || i + 1}`}
              {...sel(on, 'bg-[#070709] text-white border-[#B85D28] shadow-[0_14px_32px_rgba(7,7,9,0.14)]', 'bg-[#F2F2F2] hover:bg-[#EAEBEC] text-[#121214] border-[#D3D6DA]', 'h-full rounded-[22px] p-6 border flex flex-col justify-between transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28]')}>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span data-sel-item={i} {...sel(on, 'text-[#FB4D27]', 'text-[#9A4A1C]', 'font-title text-[22px] font-medium tabular-nums leading-none')}>{it.n.replace(/\.$/, '')}.</span>
                  {extras && ui.stepTags?.[i] && <span data-sel-item={i} {...sel(on, 'bg-[#1D1D20] border-white/10 text-[#D3D6DA]', 'bg-white border-[#D3D6DA] text-[#4C433F]', 'rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium whitespace-nowrap')}>{ui.stepTags[i]}</span>}
                </div>
                <h3 data-sel-item={i} {...sel(on, 'text-white', 'text-[#121214]', 'mt-4 text-[19px] font-medium tracking-[-0.02em]')}><Html html={it.h} /></h3>
                <p data-sel-item={i} {...sel(on, 'text-[#D3D6DA]', 'text-[#4C433F]', 'mt-2.5 text-[13.5px] leading-relaxed')}><Html html={it.p} /></p>
              </div>
              <div data-sel-item={i} {...sel(on, 'border-white/15', 'border-[#D3D6DA]', cx('mt-5 pt-4 border-t flex items-center gap-3', extras && ui.stepNotes?.[i] ? 'justify-between' : 'justify-end'))}>
                {extras && ui.stepNotes?.[i] && <span data-sel-item={i} {...sel(on, 'text-white', 'text-[#9A4A1C]', 'text-[12px] font-medium leading-snug')}>{ui.stepNotes[i]}</span>}
                <A href={chat.href} chat aria-label={`${chat.label}: ${it.h.replace(/<[^>]+>/g, '')}`} data-sel-item={i}
                  {...sel(on, 'copper-pill-gradient text-white', 'bg-[#4C433F] hover:bg-[#B85D28] text-white', 'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer')}><ArrowRight className="w-3.5 h-3.5" /></A>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}

export function FaqItem({ q, i, open, topicLabel = true }: { q: any; i: number; open: boolean; topicLabel?: boolean }) {
  const id = `faq-${i + 1}`;
  return (
    <div data-faq-item="" data-topic={q.topic || ''} {...sel(open, 'kw-open bg-[#FFFFFF] border-[#B85D28]/50 shadow-[0_8px_24px_rgba(18,18,20,0.05)]', 'bg-[#F7F7F8] border-[#E5E7EB] hover:border-[#D3D6DA]', 'rounded-[18px] border transition-colors duration-200 overflow-hidden')}>
      <h3 className="m-0" style={{ fontFamily: 'inherit' }}>
        <button type="button" id={`${id}-t`} aria-expanded={open ? 'true' : 'false'} aria-controls={`${id}-p`}
          className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F2F2F2]/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#B85D28]">
          <span className="min-w-0 block">
            <span className="flex items-center gap-2 text-[11px] font-medium">
              <span className="tabular-nums text-[#4C433F]" data-faq-n="">{String(i + 1).padStart(2, '0')}.</span>
              {topicLabel && q.topic && <><span aria-hidden="true" className="text-[#D3D6DA]">/</span><span className="text-[#9A4A1C]">{q.topic}</span></>}
            </span>
            <span className="block text-[14.5px] font-medium text-[#121214] mt-1 leading-snug" dangerouslySetInnerHTML={{ __html: q.q }} />
          </span>
          <span aria-hidden="true" data-faq-ico="" {...sel(open, 'bg-[#121214] text-white', 'bg-[#ECECEE] text-[#4C433F]', 'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200')}>
            <ChevronDown className="w-4 h-4 kw-rot" />
          </span>
        </button>
      </h3>
      <div id={`${id}-p`} role="region" aria-labelledby={`${id}-t`} className="kw-acc">
        <div>
          <div className="px-5 pb-4 pt-3 text-[13.5px] leading-relaxed text-[#4C433F] border-t border-[#ECECEE] kw-prose kw-link" dangerouslySetInnerHTML={{ __html: q.a }} />
        </div>
      </div>
    </div>
  );
}

export function Globe3() {
  const stroke = 'rgba(18,18,20,0.09)';
  return (
    <svg viewBox="0 0 320 320" fill="none" aria-hidden="true" focusable="false">
      <circle cx="160" cy="160" r="148" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <ellipse cx="160" cy="160" rx="112" ry="148" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <ellipse cx="160" cy="160" rx="68" ry="148" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <ellipse cx="160" cy="160" rx="28" ry="148" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="12" y1="160" x2="308" y2="160" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="25" y1="100" x2="295" y2="100" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="25" y1="220" x2="295" y2="220" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="65" y1="48" x2="255" y2="48" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
      <line x1="65" y1="272" x2="255" y2="272" stroke={stroke} strokeWidth="1" strokeDasharray="3 4" />
    </svg>
  );
}
