// HomePage.tsx uit het design, statisch gerenderd. Zelfde secties, opbouw en klassen; gevuld met de teksten, links en
// CTA's van de huidige startpagina van Webstudio K (per taal). Interactie (slider, keuzes, tabs, accordeon,
// cursor) doet site.js via data-attributen. Teksten die alleen in het design bestaan: zie src/site/ui-text.mjs.
import { Fragment } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Foto } from './Foto';
import BEKAART from '../site/belgie-kaart.json';
import { baseOf } from '../site/slugs.mjs';
import { P as PAD } from '../site/paginas/_gemeen.mjs';
import { CASE_FOTO, PLAATS_FOTO } from '../site/fotos.mjs';
import { PartnerBookStoreIcon, PartnerCronaIcon, PartnerMercuryIcon, PartnerWagerIcon, PartnerZanticIcon, ShowcaseEmblem } from './brand';
import { A, FadeIn, Html, Load, SectionReveal, StaggerGroup, StaggerItem, cx, sel } from './primitives';
import { ContactForm } from './Contact';
import DD from '../site/design-data.json';
/** trust-strip als één zin zonder bolletjes (audit 17-11) */
const trustLine = (trust: string[]) => { const t = trust.map(x => x.replace(/<[^>]+>/g, '').trim()); const lc1 = (x: string) => /^E[eé]n\s/.test(x) ? "één" + x.slice(3) : x.charAt(0).toLowerCase() + x.slice(1); return t.length >= 3 ? `${t[1]}, ${lc1(t[2])}, ${lc1(t[0])}.` : t.join(', ') + '.'; };

const DEMO_ID: Record<string, string> = { '/houtatelier-nethe/': 'houtatelier-nethe', '/horeca-voorbeeld/': 'bistro-tilvaar', '/webshop-voorbeeld/': 'vennebrand', '/dakwerken-hoogland/': 'dakwerken-hoogland', '/kleurwerk-voorbeeld/': 'atelier-kleurwerk', '/tuin-voorbeeld/': 'tuinzorg-varelinde', '/schoonheidssalon-voorbeeld/': 'velours', '/kapsalon-voorbeeld/': 'kapsalon-ivelien', '/barbier-voorbeeld/': 'barbier-kolvaard' };
const SECTOR_ID: Record<string, string> = { 'website-vakmensen': 'vakmensen', 'website-horeca': 'horeca', 'website-kapsalon': 'kapsalons', 'website-schilder': 'schilders', 'website-tuinaannemer': 'tuinaannemers' };
const H1_SPLIT: Record<string, string[]> = {
  nl: ['Website laten', 'maken, ', 'op maat', 'van ', 'uw zaak'],
  fr: ['Création de', 'site internet, ', 'sur mesure', 'pour ', 'votre entreprise'],
  en: ['Have a website', 'built ', 'for', '', 'your business'],
};
const Badge = ({ children, dark = false, copper = false }: { children: any; dark?: boolean; copper?: boolean }) => (
  <span className={copper ? 'inline-block rounded-md bg-[#B85D28]/10 border border-[#B85D28]/20 px-3 py-1 text-[15px] font-medium text-[#5E2A11]'
    : dark ? 'inline-block rounded-md bg-[#1D1D20] px-3 py-1 text-[15px] font-medium text-[#D3D6DA]'
    : 'inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[15px] font-medium text-[#4C433F]'}>{children}</span>
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
const HERO_FOTO = ['vb-houtatelier', 'vb-kapsalon'];
const shot = (href: string) => href.replace(/^\/(fr\/|en\/)?|\/$/g, '');
const REAL_H: Record<string, string> = { nl: 'Voorbeeldontwerpen in beeld', fr: 'Nos exemples de sites en images', en: 'Our sample designs at a glance' };
const REAL_P: Record<string, string> = { nl: 'Zes van onze voorbeeldontwerpen, elk voor een andere sector. Namen en gegevens zijn fictief; klik door voor de doelgroep, de keuzes en de functies.', fr: 'Six de nos exemples de design, chacun pour un autre secteur. Les noms et données sont fictifs ; cliquez pour voir à qui chaque site s’adresse, les choix et les fonctions.', en: 'Six of our sample designs, each for a different sector. Names and details are fictional; click through for the audience, choices and features.' };
const SHOT_ALT: Record<string, string> = { nl: 'Schermafbeelding van het voorbeeldontwerp', fr: 'Capture d’écran de l’exemple de design', en: 'Screenshot of the sample design' };
const initials = (t: string) => t.replace(/^(Bistro|Atelier|Kapsalon|Barbier|Tuinzorg|Dakwerken|Houtatelier)\s/, (m) => m).slice(0, 2).toUpperCase();
const sizesPortrait = '(min-width: 1536px) 420px, (min-width: 1280px) 370px, (min-width: 1024px) 310px, (min-width: 640px) 400px, 360px';

export function Portrait({ alt }: { alt: string }) {
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

export const HERO_ICONS = [PartnerZanticIcon, PartnerBookStoreIcon, PartnerWagerIcon, PartnerCronaIcon, PartnerMercuryIcon, PartnerWagerIcon, PartnerCronaIcon, PartnerBookStoreIcon];

export function Home({ h, s, f, x }: { h: any; s: any; f: any; x: any }) {
  const L = s.lang; const ui = s.ui; const dd = (DD as any)[L];
  const [t0, t1, t2] = h.hero.trust;
  const sp = H1_SPLIT[L]; const h1ok = sp && sp.join(' ').replace(/ ,/g, ',').replace(/\s+/g, ' ').replace(/ ([,])/g, '$1') && (sp[0] + ' ' + sp[1] + sp[2] + ' ' + sp[3] + sp[4]).replace(/\s+/g, ' ').trim() === h.hero.h1;
  const demoCta = h.hero.ctas[0];
  const icons = HERO_ICONS;
  const slides = [split2(t1), split2(t0)];
  const works = h.werk.items; const nW = works.length;
  const sectors = h.vak.items;
  const metaSent = sentences(x.metaDesc);
  const [gl1, gl2] = split2(h.band.lead.replace(/<[^>]+>/g, ''));
  const [leadA] = sentences(h.vak.lead);
  const dienstSent = sentences(h.diensten.lead);
  const faq = h.faq; const groups = faq.groups; const allFaq = groups.flatMap((g: any) => g.items.map((it: any) => ({ ...it, topic: g.title })));
  const places = x.places;
  const awards = x.awards;
  return (
    <div className="w-full overflow-x-clip">
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
              <Load as="p" y={14} duration={0.5} delay={0.02} className="text-[16px] sm:text-[16px] text-[#3F3F46] font-normal tracking-[-0.01em] mb-3 sm:mb-4">
                <span aria-hidden="true">| </span>{h.hero.tag}
              </Load>
              <Load as="h1" id={h.hero.h1id} y={24} duration={0.65} delay={0.1} className="text-[clamp(1.85rem,8.2vw,3.1rem)] sm:text-[48px] lg:text-[46px] xl:text-[56px] 2xl:text-[64px] leading-[0.98] tracking-[-0.04em] font-medium select-text max-w-full">
                {h1ok ? (<>
                  <span className="block text-[#18181B]">{sp[0]}</span>{' '}
                  <span className={cx('block', L === 'nl' && 'whitespace-nowrap')}><span className="text-[#18181B]">{sp[1]}</span><span className="headline-fade-delivering">{sp[2]}</span></span>{' '}
                  <span className={cx('block', L === 'nl' && 'whitespace-nowrap')}><span className="text-[#18181B]">{sp[3]}</span><span className="headline-fade-mat">{sp[4]}</span></span>
                </>) : h.hero.h1}
              </Load>
              <Load as="p" duration={0.6} delay={0.24} className="mt-4 sm:mt-5 text-[16px] sm:text-[17px] leading-relaxed text-[#4C433F] max-w-md lg:max-w-[380px] xl:max-w-[420px]">
                <Html html={h.hero.slogan} />
              </Load>
              <Load y={16} duration={0.55} delay={0.34} className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 sm:gap-3.5">
                <span className="text-[15px] sm:text-[15px] text-[#4C433F] font-normal tracking-[-0.01em]">{t0}</span><span className="text-[15px] sm:text-[15px] text-[#4C433F] font-normal tracking-[-0.01em]">{t2}</span>
              </Load>
              <Load y={16} duration={0.55} delay={0.42} className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <A href={demoCta.href} chat className="kw-pop group inline-flex items-center gap-3 sm:gap-3.5 rounded-full bg-[#121214] hover:bg-[#232327] text-white pl-5 pr-1.5 py-1.5 min-h-[44px] text-[15px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0">
                  <span>{demoCta.label}</span>
                  <span className="w-8 h-8 rounded-full bg-white text-[#121214] flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5"><ArrowRight className="w-3.5 h-3.5 stroke-[2]" /></span>
                </A>
                {h.hero.ctas[1] && (
                  <A href={h.hero.ctas[1].href} className="kw-pop inline-flex items-center justify-center rounded-full bg-[#4C433F] hover:bg-[#3A3330] text-white px-6 sm:px-7 min-h-[44px] text-[15px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0">
                    {h.hero.ctas[1].label}
                  </A>
                )}
              </Load>
            </div>

            <Load delay={0.14} className="relative z-20 lg:col-span-4 lg:col-start-9 flex flex-col items-stretch lg:items-end justify-between lg:min-h-[395px] pt-1 lg:pt-2">
              <div data-sel="" data-sel-wrap="" data-sel-auto="6500" className="order-2 lg:order-1 mt-6 lg:mt-0 mx-auto lg:mx-0 w-full max-w-[360px] xl:max-w-[392px] rounded-[24px] sm:rounded-[28px] p-3 sm:p-3.5 bg-gradient-to-br from-[#C4C5C8]/90 via-[#B8B9BC]/85 to-[#ABACB0]/90 border border-white/30 flex items-stretch gap-3.5 sm:gap-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] backdrop-blur-xs">
                <div className="relative overflow-hidden w-[126px] sm:w-[172px] h-[152px] sm:h-[176px] shrink-0 rounded-[18px] sm:rounded-[20px] bg-[#040405]">
                  {slides.map((_, i) => <div key={i} data-sel-panel={i} hidden={i > 0} className="absolute inset-0"><Foto id={HERO_FOTO[i % HERO_FOTO.length]} vorm="kaart" lang={L} sizes="(min-width: 640px) 172px, 126px" className="absolute inset-0 block w-full h-full object-contain object-center" /></div>)}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1 sm:py-1.5 pr-0.5 sm:pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-semibold text-[#18181B] tabular-nums">
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
                <p id={h.band.h2id || undefined} className="text-[16px] font-medium text-[#18181B] mb-3 text-right">{h.band.h2}</p>
                {[h.band.chips.slice(0, 4), h.band.chips.slice(4, 8)].map((row: any[], r: number) => (
                  <div key={r} className={r === 0 ? 'flex flex-wrap items-center justify-end gap-x-4 sm:gap-x-5 gap-y-2 text-[15px] sm:text-[15px] text-[#4C433F]' : 'flex flex-wrap items-center justify-end gap-x-4 sm:gap-x-6 gap-y-2 mt-2 text-[15px] sm:text-[15px] text-[#4C433F]'}>
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
            <ul className="w-full rounded-2xl sm:rounded-full bg-[#121214]/95 backdrop-blur-md text-[#E4E4E7] px-5 sm:px-8 lg:px-10 min-h-[48px] sm:h-[54px] py-3 sm:py-0 flex flex-wrap max-sm:flex-col max-sm:items-start sm:flex-nowrap items-center justify-between gap-x-4 gap-y-1.5 text-[15px] sm:text-[15px] lg:text-[15px] font-normal shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
              <li className="sm:whitespace-nowrap">{trustLine(h.hero.trust)}</li>
              <li><a href="#intro" className="inline-flex items-center gap-2 whitespace-nowrap hover:text-white transition-colors cursor-pointer"><span>{s.skip}</span></a></li>
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
                <div className="order-1"><span className="inline-block rounded-md bg-[#F2F2F2] px-3 py-1 text-[15px] font-medium text-[#4C433F]">{ui.badgeIntro}</span></div>
                <div className="order-3 lg:order-2 flex items-center gap-3.5 text-[16px] text-[#4C433F]">
                  <div className="w-8 h-8 rounded-full border border-[#D3D6DA] flex items-center justify-center shrink-0"><Globe className="w-4 h-4 text-[#121214]" /></div>
                  <div className="border-l border-[#D3D6DA] pl-3 leading-snug max-w-xs"><p>{gl1}</p><p>{gl2}</p></div>
                </div>
              </div>
              <div className="order-2 lg:order-none lg:col-span-7">
                <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] leading-[1.16] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance] text-center lg:text-left">
                  {metaSent[0]}{' '}<span className="text-[#4C433F]">{metaSent.slice(1).join(' ')}</span>
                </h2>
                <div className="mt-8 sm:mt-10 pt-5 border-t border-[#E5E7EB]">
                  <p className="text-[16px] text-[#4C433F] mb-4">{x.replyNote}</p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <a href="mailto:info@kempenwebstudio.be" aria-label="info@kempenwebstudio.be" className="w-9 h-9 rounded-full copper-pill-gradient text-white flex items-center justify-center hover:opacity-90 transition-opacity"><Mail className="w-4 h-4" /></a>
                      <a href="tel:+3214718080" aria-label="+32 14 71 80 80" className="w-9 h-9 rounded-full bg-[#F2F2F2] hover:bg-[#D3D6DA] text-[#4C433F] flex items-center justify-center transition-colors"><Phone className="w-4 h-4" /></a>
                      <a href={h.werk.cta.more.href} aria-label={h.werk.cta.more.label} className="w-9 h-9 rounded-full bg-[#F2F2F2] hover:bg-[#D3D6DA] text-[#4C433F] flex items-center justify-center transition-colors cursor-pointer"><Globe className="w-4 h-4" /></a>
                    </div>
                    <a href={h.werk.cta.more.href} className="inline-flex items-center gap-2 rounded-full border border-[#D3D6DA] bg-white hover:bg-[#F2F2F2] px-4 py-2 text-[15px] font-medium text-[#121214] transition-colors cursor-pointer">
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
            <p className="mt-3 max-w-2xl mx-auto text-[16px] text-[#4C433F] leading-relaxed"><Html html={h.werk.lead} /></p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div data-sel="" data-sel-wrap="" data-sel-auto="5500" aria-roledescription="carrousel" className="relative rounded-[24px] sm:rounded-[32px] bg-[#050507] text-white p-7 sm:p-12 lg:p-14 min-h-[420px] sm:min-h-[480px] flex flex-col justify-between overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 text-[15px] text-[#C8C8CC] tabular-nums">
                <span>{works.map((w: any, i: number) => <span key={i} data-sel-panel={i} hidden={i > 0}>0{i + 1} / 0{nW}<span className="ml-3">{w.cat}</span></span>)}</span>
                <div className="flex items-center gap-1.5">
                  {works.map((w: any, i: number) => (
                    <button key={i} type="button" data-sel-to={i} aria-label={`${ui.select} ${w.h}`} {...sel(i === 0, 'w-6 bg-[#D47A3B]', 'w-1.5 bg-white/25 hover:bg-white/50', 'h-1.5 rounded-full transition-all duration-200 cursor-pointer')} data-sel-item={i} />
                  ))}
                </div>
              </div>
              <div aria-hidden="true" className="mt-4 h-[3px] rounded-full bg-white/10 overflow-hidden"><div data-sel-bar="" className="h-full w-full bg-[#D47A3B]" /></div>
              <div className="my-10 sm:my-14 flex items-center justify-center relative">
                {works.map((w: any, i: number) => (
                  <div key={i} data-sel-panel={i} hidden={i > 0} className="flex items-center justify-center gap-8 sm:gap-14">
                    <div className="w-[240px] sm:w-[460px] lg:w-[680px] xl:w-[760px] rounded-[12px] sm:rounded-[16px] overflow-hidden bg-[#1B1B1E] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                      <div aria-hidden="true" className="flex items-center gap-1.5 px-3 h-6 sm:h-7 bg-[#242426]"><span className="w-2 h-2 rounded-full bg-white/25" /><span className="w-2 h-2 rounded-full bg-white/25" /><span className="w-2 h-2 rounded-full bg-[#D47A3B]/80" /></div>
                      <img src={`/assets/img/${shot(w.href)}-d640.webp`} srcSet={`/assets/img/${shot(w.href)}-d640.webp 640w, /assets/img/${shot(w.href)}-d1000.webp 1000w, /assets/img/${shot(w.href)}-d1600.webp 1600w`} sizes="(min-width: 1280px) 760px, (min-width: 1024px) 680px, (min-width: 640px) 460px, 240px" width={1600} height={1000} loading="lazy" decoding="async" alt={`${SHOT_ALT[L] || SHOT_ALT.nl} ${w.h}`} className="block w-full h-auto aspect-[16/10] object-cover object-top" />
                    </div>
                    <a href={w.href} target="_blank" rel="noopener" aria-label={`${w.h} ${ui.newWindow}`} className="w-12 h-12 rounded-full bg-[#242426] hover:bg-[#B85D28] text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0"><ArrowUpRight className="w-4 h-4" /></a>
                  </div>
                ))}
              </div>
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {works.map((w: any, i: number) => (
                  <button key={i} type="button" data-sel-to={i} data-sel-item={i} aria-label={`${ui.select} ${w.h}`} {...sel(i === 0, 'copper-pill-gradient text-white font-medium', 'bg-white/8 text-[#C8C8CC] hover:text-white hover:bg-white/15', 'rounded-full px-3.5 py-1.5 text-[15px] transition-colors cursor-pointer')}>{w.h}</button>
                ))}
              </div>
              {works.map((w: any, i: number) => {
                const d = dd.demos[DEMO_ID[w.href]];
                return (
                  <div key={i} data-sel-panel={i} hidden={i > 0} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-4 border-t border-white/10">
                    <div className="max-w-md">
                      <p className="text-[16px] text-[#F1A36A] font-medium mb-1">{w.cat}</p>
                      <h3 className="text-[26px] sm:text-[32px] font-normal tracking-[-0.025em] text-white">{w.h}</h3>
                      <p className="mt-2 text-[16px] sm:text-[16px] leading-relaxed text-[#C8C8CC]"><Html html={w.p} /></p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[15px] text-[#D3D6DA]">
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
                  <h3 className="text-[17px] font-medium text-[#121214]" style={{ fontFamily: 'inherit' }}><Html html={h.werk.cta.h} /></h3>
                  <p className="text-[16px] text-[#4C433F] mt-0.5"><Html html={h.werk.cta.p} /></p>
                </div>
                <A href={h.werk.cta.btn.href} chat className="inline-flex items-center gap-2 rounded-full bg-[#121214] hover:bg-[#27272A] text-white px-5 py-2.5 text-[15px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0">
                  <span>{h.werk.cta.btn.label}</span><ArrowRight className="w-3.5 h-3.5" />
                </A>
              </div>
            )}
          </FadeIn>
        </div>

        {/* SECTION 4: EEN PAAR SECTOREN UITGELICHT */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-6 sm:pt-12 pb-16 sm:pb-24">
          <FadeIn>
            <div data-sel="" data-sel-wrap="" data-sel-auto="6000" className="">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <Badge>{h.vak.badge}</Badge>
                  <h2 id={h.vak.h2id} className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214] [text-wrap:balance]">{h.vak.h2}</h2>
                  {sectors.map((m: any, i: number) => {
                    const d = dd.sectors[SECTOR_ID[baseOf(m.href).replace(/\//g, '')]];
                    return (
                      <div key={i} data-sel-panel={i} hidden={i > 0} className="mt-6 max-w-sm">
                        <h3 className="text-[17px] font-medium text-[#121214]" style={{ fontFamily: 'inherit' }}>{m.h}</h3>
                        <p className="mt-1.5 text-[16px] leading-relaxed text-[#4C433F]"><Html html={m.p} /></p>
                        <a href={m.href} className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#B85D28] hover:text-[#121214] transition-colors cursor-pointer"><span>{m.arr}</span><ArrowRight className="w-3.5 h-3.5" /></a>
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
                  <span className="mt-1 text-[15px] sm:text-[15px] opacity-90">{ui.moreLabel}</span>
                </a>
              </div>
            </div>
            <SectorMarquee lang={L} />
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
                  <A href={demoCta.href} chat className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#08080A] hover:bg-[#232327] text-white pl-5 pr-1.5 py-1.5 min-h-[44px] text-[15px] font-medium transition-colors cursor-pointer">
                    <span>{demoCta.label}</span><span className="w-8 h-8 rounded-full bg-white text-[#08080A] flex items-center justify-center"><ArrowRight className="w-3.5 h-3.5" /></span>
                  </A>
                </div>
                <div className="mt-12 flex items-center gap-3.5 text-[16px] text-[#4C433F]">
                  <div className="w-7 h-7 rounded-full border border-[#D3D6DA] flex items-center justify-center shrink-0"><span className="w-3 h-3 rounded-full border border-[#4C433F]" /></div>
                  <div className="border-l border-[#D3D6DA] pl-3 leading-snug"><p><Html html={h.vn.fine} /></p></div>
                </div>
              </FadeIn>
              <FadeIn delay={0.1} className="lg:col-span-7 flex lg:justify-end">
                <div className="w-full max-w-[490px] rounded-[24px] sm:rounded-[28px] copper-panel-gradient p-6 sm:p-10 flex items-center justify-center">
                  <div data-sel="" data-sel-wrap="" data-sel-auto="5000" className="w-full max-w-[320px] rounded-[20px] bg-[#050507] text-white p-6 sm:p-7 flex flex-col justify-between min-h-[340px] shadow-2xl">
                    <div className="flex items-center justify-between">
                      <span aria-hidden="true" className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center text-[15px] font-semibold">K</span>
                      <button type="button" data-sel-next="" className="rounded-full border border-white/25 hover:border-white/60 px-3 py-1 text-[15px] text-white/90 transition-colors cursor-pointer">
                        <span data-sel-panel="0">{h.vn.voor}</span><span data-sel-panel="1" hidden>{h.vn.na}</span>
                      </button>
                    </div>
                    <div className="my-auto" data-sel-panel="0">
                      <p className="text-[16px] text-[#C8C8CC] mb-2">{h.vn.q}</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-title text-[34px] sm:text-[38px] leading-none font-normal tracking-[-0.04em]">{h.vn.name}</span>
                      </div>
                      <p className="mt-3 text-[16px]"><span className="text-white">{h.vn.type} </span><span className="text-[#C8C8CC]">{h.vn.reviews}</span></p>
                      <p className="mt-2 text-[16px] text-[#C8C8CC]">{h.vn.btns.join(', ')}</p>
                      <p className="mt-3 text-[16px] text-[#C8C8CC] leading-relaxed">{h.vn.no}</p>
                    </div>
                    <a className="my-auto block rounded-[12px] overflow-hidden mt-4" data-sel-panel="1" hidden href={h.vn.naHref} target="_blank" rel="noopener">
                      <Html html={h.vn.naImg} as="span" className="block [&_img]:w-full [&_img]:h-auto" />
                    </a>
                    <div aria-hidden="true" className="mt-4 h-[3px] rounded-full bg-white/10 overflow-hidden"><div data-sel-bar="" className="h-full w-full bg-[#D47A3B]" /></div>
                    <div className="grid grid-cols-2 gap-1.5 pt-3">
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
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 sm:mb-12">
            <div className="lg:col-span-6">
              <Badge dark>{h.diensten.badge}</Badge>
              <h2 id={h.diensten.h2id} className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-white">{split2(h.diensten.h2)[0]}<br />{split2(h.diensten.h2)[1]}</h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-start lg:items-end lg:text-right">
              <p className="text-[16px] leading-relaxed text-[#C8C8CC] max-w-md">{h.diensten.lead}</p>
              <a href={h.diensten.btn.href} className="mt-5 inline-flex items-center gap-3 rounded-full bg-white hover:bg-[#F2F2F2] text-[#08080A] pl-5 pr-1.5 py-1.5 min-h-[42px] text-[15px] font-medium transition-colors cursor-pointer">
                <span>{h.diensten.btn.label}</span><span className="w-7 h-7 rounded-full bg-[#08080A] text-white flex items-center justify-center"><ArrowRight className="w-3.5 h-3.5" /></span>
              </a>
            </div>
          </FadeIn>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {h.diensten.items.map((d: any, i: number) => {
                // Karim 18-11: meer kleur uit de stijlgids; kaarten wisselen af (koper, lichtgrijs, warm grijs, wit), tekst telkens AA
                const V = [
                  { box: 'copper-panel-gradient', h: 'text-white', p: 'text-white/90', num: 'text-white/90', line: 'text-white border-white/25', price: '', chips: 'text-white/90' },
                  { box: 'bg-[#F2F2F2]', h: 'text-[#121214]', p: 'text-[#4C433F]', num: 'text-[#B85D28]', line: 'text-[#4C433F] border-[#D3D6DA]', price: 'text-[#9A4A1C]', chips: 'text-[#4C433F]' },
                  { box: 'bg-[#4C433F]', h: 'text-white', p: 'text-[#E4E4E7]', num: 'text-[#F7C59F]', line: 'text-[#E4E4E7] border-white/20', price: 'text-[#F7C59F]', chips: 'text-[#E4E4E7]' },
                  { box: 'bg-white', h: 'text-[#121214]', p: 'text-[#4C433F]', num: 'text-[#B85D28]', line: 'text-[#4C433F] border-[#E5E7EB]', price: 'text-[#9A4A1C]', chips: 'text-[#4C433F]' },
                ][i % 4];
                return (
                  <Fragment key={d.id}>
                    <FadeIn delay={0.05 + i * 0.045} className="h-full">
                      <div id={d.id} className={cx('group kw-lift relative w-full h-full text-left rounded-[20px] p-6 sm:p-7 min-h-[230px] sm:min-h-[300px] flex flex-col justify-between', V.box)}>
                        <a href={d.more.href} className="absolute inset-0 rounded-[20px]" aria-label={`${d.h}: ${d.more.label}`} />
                        <div>
                          <h3 className={cx('text-[18px] font-medium', V.h)}>{d.h}</h3>
                          <p className={cx('mt-2 text-[16px] leading-relaxed', V.p)}><Html html={d.d} /></p>
                        </div>
                        <div className="flex flex-col gap-4 pt-6">
                          <span aria-hidden="true" className={cx('font-title text-[56px] sm:text-[64px] leading-[0.8] font-normal tracking-[-0.04em] tabular-nums', V.num)}>0{i + 1}.</span>
                          <div className={cx('text-[16px] leading-snug border-t pt-3 lg:min-h-[76px]', V.line)}>
                            <p className={cx('font-medium', V.price)}>{d.priceText}</p>
                            {d.chips.length > 0 && <p className={cx('relative z-10 mt-0.5 [text-wrap:pretty]', V.chips)}>
                              {d.chips.map((c: string, k: number) => <Fragment key={k}>{k > 0 && ', '}<Html html={c} /></Fragment>)}
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

        {/* SECTION 7: WERKGEBIED: geanimeerde kaart van België (echte contour en provincies, inline SVG) */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-20 sm:pb-28">
          <FadeIn className="text-center mb-10 sm:mb-12">
            <Badge dark>{ui.badgeArea}</Badge>
            <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-white">{ui.areaTitle}</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <BelgiumMap lang={L} x={x} />
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
              <div className="mt-3 text-[16px] leading-relaxed text-[#4C433F] max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: h.pricing.side.replace(/class="[^"]*"/g, '') }} />
            </FadeIn>
            <Tiers tiers={h.pricing.tiers} delivery={x.delivery} />
            <div className="mt-8 text-center text-[16px] leading-relaxed text-[#4C433F] max-w-2xl mx-auto kw-link">{h.pricing.term.map((t: string, i: number) => <p key={i} dangerouslySetInnerHTML={{ __html: t }} />)}</div>
          </div>

          <div id="werkwijze" className="mt-20 sm:mt-24 pt-12 border-t border-[#E5E7EB]">
            <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <Badge copper>{h.steps.badge}</Badge>
                <h2 id={h.steps.h2id} className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance]">
                  <Html html={h.steps.h2} />
                </h2>
              </div>
              {ui.stepsSub && <p className="text-[16px] text-[#4C433F] max-w-md leading-relaxed">{ui.stepsSub}</p>}
            </FadeIn>
            <Steps items={h.steps.items} chat={demoCta} ui={ui} extras={h.steps.items.length === 4} />
            <div className="mt-6 rounded-[20px] bg-[#F2F2F2] border border-[#D3D6DA] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[16px] text-[#4C433F]"><Html html={h.steps.ctaNote} /></p>
              {h.steps.cta && (
                <A href={h.steps.cta.href} chat className="inline-flex items-center gap-2 rounded-full copper-pill-gradient hover:opacity-90 text-white px-5 py-2.5 text-[15px] font-medium transition-opacity cursor-pointer whitespace-nowrap shrink-0">
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
            <div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  <Badge dark>{ui.badgeReal}</Badge>
                  <h2 className="mt-4 text-[34px] sm:text-[44px] leading-[1.04] tracking-[-0.03em] font-normal text-white">{REAL_H[L] || REAL_H.nl}</h2>
                  <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[#D3D6DA]">{REAL_P[L] || REAL_P.nl}</p>
                </div>
                <a href={h.werk.cta.more.href} className="self-start lg:self-auto inline-flex items-center gap-3 rounded-full bg-white hover:bg-[#F2F2F2] text-[#08080A] pl-5 pr-1.5 py-1.5 min-h-[46px] text-[15px] font-medium transition-colors cursor-pointer">
                  <span>{h.werk.cta.more.label}</span><span className="w-8 h-8 rounded-full bg-[#08080A] text-white flex items-center justify-center"><ArrowRight className="w-4 h-4" /></span>
                </a>
              </div>
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {works.slice(0, 6).map((w: any, i: number) => {
                  const id = DEMO_ID[w.href]; const detail = id ? (PAD as any).demos[L] + id + '/' : w.href; const sh = shot(w.href);
                  return (
                    <li key={i}>
                      <a href={detail} className="group block h-full rounded-[22px] bg-[#141416] border border-white/10 hover:border-[#B85D28]/60 p-3 sm:p-3.5 transition-colors cursor-pointer">
                        <div className="rounded-[14px] overflow-hidden bg-[#1B1B1E] border border-white/10">
                          <div aria-hidden="true" className="flex items-center gap-1.5 px-3 h-7 bg-[#242426]"><span className="w-2 h-2 rounded-full bg-white/25" /><span className="w-2 h-2 rounded-full bg-white/25" /><span className="w-2 h-2 rounded-full bg-[#D47A3B]/80" /></div>
                          <img src={`/assets/img/${sh}-d640.webp`} srcSet={`/assets/img/${sh}-d640.webp 640w, /assets/img/${sh}-d1000.webp 1000w`} sizes="(min-width: 1024px) 420px, (min-width: 640px) 46vw, 92vw" width={1600} height={1000} loading="lazy" decoding="async" alt={`${SHOT_ALT[L] || SHOT_ALT.nl} ${w.h}`} className="block w-full h-auto aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
                        </div>
                        <div className="px-2 pt-4 pb-2 flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[16px] font-medium text-[#F1A36A]">{w.cat}</p>
                            <h3 className="mt-1 text-[21px] font-medium tracking-[-0.02em] text-white">{w.h}</h3>
                          </div>
                          <span aria-hidden="true" className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#B85D28] text-white flex items-center justify-center shrink-0 transition-colors"><ArrowUpRight className="w-4 h-4" /></span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
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
                    <article key={i} className={cx('kw-lift group relative rounded-[20px] p-6 sm:p-7 min-h-[290px] flex flex-col justify-between', dark ? 'bg-[#2C2C2E] text-white' : 'bg-[#F7F7F8] text-[#121214] border border-[#ECECEE]')}>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[17px] font-semibold tracking-tight"><span className="tabular-nums mr-2">{c.n}</span><Html html={c.h} /></h3>
                        <span className="kw-zoom relative w-14 h-14 rounded-xl overflow-hidden bg-[#141416] shrink-0">{CASE_FOTO[i] ? <Foto id={CASE_FOTO[i]} vorm="mini" lang={L} sizes="56px" className="absolute inset-0 block w-full h-full object-cover" /> : <ShowcaseEmblem />}</span>
                      </div>
                      <p className={cx('my-6 text-[16px] leading-relaxed kw-link', dark ? 'text-[#E4E4E7]' : 'text-[#4C433F]')}><Html html={c.p} /></p>
                      <div className="flex items-end justify-between gap-3">
                        <p className="text-[16px] font-medium mt-0.5">{c.a.label}</p>
                        <span aria-hidden="true" className={cx('font-title text-[32px] leading-none font-normal tabular-nums', dark ? 'text-[#F1A36A]' : 'text-[#B85D28]')}>{c.n}</span>
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
                {faq.card && <p className="mt-3 text-[16px] text-[#4C433F] leading-relaxed lg:max-w-[360px] lg:mx-auto"><Html html={faq.card.p} /></p>}
                {faq.card && (
                  <A href={faq.card.cta.href} chat className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#121214] hover:bg-[#B85D28] text-white px-5 py-2.5 text-[15px] font-medium transition-colors cursor-pointer">
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
                        <span className="text-[15px] font-semibold leading-tight">{a.title}</span>
                        <span className="mt-1 text-[15px] opacity-90">{a.subtitle}</span>
                      </button>
                      <span data-sel-panel={i} hidden={a.id !== 'belgie'} aria-hidden="true" className="mt-2 rounded-md bg-white border border-[#E5E7EB] shadow-sm px-2.5 py-1 text-[15px] font-medium text-[#121214] whitespace-nowrap">{a.subtitle}</span>
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
                {ui.faqSub && <p className="mt-2 text-[16px] text-[#4C433F] max-w-md">{ui.faqSub}</p>}
              </div>
              <div role="tablist" aria-label={ui.faqFilter} className="flex flex-wrap gap-2">
                {[ui.faqAll, ...groups.map((g: any) => g.title)].map((label: string, i: number) => (
                  <button key={i} type="button" role="tab" aria-selected={i === 0 ? 'true' : 'false'} data-topic={i === 0 ? '' : label}
                    {...sel(i === 0, 'bg-[#121214] text-white', 'bg-[#F2F2F2] text-[#4C433F] hover:bg-[#E7E8EB] hover:text-[#121214]', 'px-3.5 py-2 rounded-full text-[15px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D28]')}>{label}</button>
                ))}
              </div>
            </FadeIn>
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {x.articles.map((p: any, i: number) => (
                <StaggerItem key={i} i={i}>
                  <div className="group relative w-full h-full text-left rounded-[22px] bg-[#F2F2F2] hover:bg-[#E7E8EB] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200">
                    <div>
                      <div className="flex items-center gap-2 text-[15px] text-[#4C433F]"><span className="text-[#9A4A1C] font-medium">{x.articlesLabel}</span></div>
                      <h3 className="mt-3 text-[19px] font-medium leading-snug text-[#121214] group-hover:text-[#B85D28] transition-colors">
                        <a href={p.href} className="after:absolute after:inset-0 after:rounded-[22px]">{p.title}</a>
                      </h3>
                      <p className="mt-2.5 text-[16px] leading-relaxed text-[#4C433F]"><Html html={p.excerpt} /></p>
                    </div>
                    <div aria-hidden="true" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#121214]"><span>{x.articlesCta}</span><ArrowUpRight className="w-3.5 h-3.5" /></div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-start">
              {allFaq.map((q: any, i: number) => <FaqItem key={i} q={q} i={i} open={i === 0} />)}
            </div>
            {faq.card && (
              <div className="mt-6 rounded-[20px] bg-[#F2F2F2] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[16px] text-[#4C433F] kw-link"><Html html={faq.card.note} /></p>
                <A href={demoCta.href} chat className="inline-flex items-center gap-2 text-[15px] font-medium text-[#121214] hover:text-[#B85D28] transition-colors cursor-pointer whitespace-nowrap shrink-0"><span>{demoCta.label}</span><ArrowRight className="w-3.5 h-3.5" /></A>
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
                  <ol className="mt-7 flex flex-col gap-5 text-[15px]">
                    {h.contact.steps.map((st: any) => (
                      <li key={st.b} className="border-l border-white/15 pl-4"><p className="font-medium text-white">{st.b}</p><p className="text-[#D3D6DA] mt-0.5"><Html html={st.s} /></p></li>
                    ))}
                  </ol>
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-[15px]">
                    {h.contact.links.map((l: any) => (
                      <div key={l.href}>
                        <p className="text-[#C8C8CC] text-[16px]">{l.small}</p>
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

// ---------------------------------------------------------------- kaart van België (Karim 16-11: "te kaal")
// Echte contour en provincies (Eurostat GISCO NUTS 2021, zie scripts/belgie-kaart.mjs), pins die na elkaar oplichten,
// pulserende ringen, lijnen vanuit Kasterlee, link naar de stadspagina. Alleen CSS-animatie; stil bij "minder beweging".
const MAP_NAME: Record<string, Record<string, string>> = {
  fr: { antwerpen: 'Anvers', mechelen: 'Malines', gent: 'Gand', leuven: 'Louvain', brussel: 'Bruxelles', kortrijk: 'Courtrai', brugge: 'Bruges', liege: 'Liège', namur: 'Namur' },
  en: { antwerpen: 'Antwerp', gent: 'Ghent', brussel: 'Brussels', brugge: 'Bruges', liege: 'Liège', namur: 'Namur' },
};
const NL_CITY: Record<string, string> = { kasterlee: 'kasterlee', turnhout: 'turnhout', geel: 'geel', mol: 'mol', herentals: 'herentals', antwerpen: 'antwerpen', mechelen: 'mechelen', gent: 'gent', leuven: 'leuven', brussel: 'brussel', kortrijk: 'kortrijk', brugge: 'brugge', hasselt: 'hasselt' };
const FR_CITY: Record<string, string> = { kasterlee: 'kasterlee', turnhout: 'turnhout', geel: 'geel', mol: 'mol', herentals: 'herentals', gent: 'gand', leuven: 'louvain', brussel: 'bruxelles', kortrijk: 'courtrai', liege: 'liege', namur: 'namur', charleroi: 'charleroi' };
const EN_CITY: Record<string, string> = { kasterlee: '/en/web-design-kasterlee/', turnhout: '/en/web-design-turnhout/', geel: '/en/web-design-geel/', mol: '/en/web-design-mol/', herentals: '/en/web-design-herentals/', gent: '/en/web-design-ghent/', leuven: '/en/web-design-leuven/', kortrijk: '/en/web-design-kortrijk/', brussel: '/en/web-design-brussels/' };
function cityHref(k: string, lang: string) {
  const nl = NL_CITY[k] ? `/website-laten-maken-${NL_CITY[k]}/` : '', fr = FR_CITY[k] ? `/fr/creation-site-internet-${FR_CITY[k]}/` : '';
  if (lang === 'fr') return fr || nl;
  if (lang === 'en') return EN_CITY[k] || nl || fr;
  return nl || fr;
}
// labelpositie per stad (de Kempense steden liggen dicht bij elkaar)
const LBL: Record<string, [number, number, string]> = { turnhout: [0, -12, 'middle'], geel: [3, 22, 'middle'], mol: [9, 6, 'start'], herentals: [-9, 12, 'end'], antwerpen: [-9, 4, 'end'], mechelen: [-9, 5, 'end'], gent: [9, 4, 'start'], leuven: [9, 5, 'start'], brussel: [-9, 5, 'end'], kortrijk: [9, 5, 'start'], brugge: [9, 4, 'start'], hasselt: [9, 5, 'start'], liege: [9, 5, 'start'], namur: [9, 5, 'start'], charleroi: [-9, 5, 'end'] };
const MAP_TXT: Record<string, { aria: string; list: string; src: string }> = {
  nl: { aria: 'Kaart van België met de steden waar wij websites maken', list: 'Kies uw stad', src: 'Grenzen: © EuroGeographics' },
  fr: { aria: 'Carte de la Belgique avec les villes où nous créons des sites', list: 'Choisissez votre ville', src: 'Limites : © EuroGeographics' },
  en: { aria: 'Map of Belgium with the cities where we build websites', list: 'Choose your city', src: 'Boundaries: © EuroGeographics' },
};
function BelgiumMap({ lang, x }: { lang: string; x: any }) {
  const M: any = BEKAART; const home = M.cities.find((c: any) => c.k === 'kasterlee');
  const name = (c: any) => (MAP_NAME[lang] || {})[c.k] || c.n; const t = MAP_TXT[lang] || MAP_TXT.nl;
  const others = M.cities.filter((c: any) => c.k !== 'kasterlee');
  return (
    <div className="relative rounded-[24px] wireframe-globe-dark p-5 sm:p-8 lg:p-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-8">
          <svg viewBox={`0 0 ${M.w} ${M.h}`} className="kw-map w-full h-auto" role="img" aria-label={t.aria}>
            <defs><radialGradient id="kw-map-glow"><stop offset="0" stopColor="#D47A3B" stopOpacity=".35" /><stop offset="1" stopColor="#D47A3B" stopOpacity="0" /></radialGradient></defs>
            {M.provinces.map((p: any) => <path key={p.id} d={p.d} className="kw-map-prov"><title>{p.name}</title></path>)}
            <circle cx={home.x} cy={home.y} r="80" fill="url(#kw-map-glow)" className="kw-map-glow" />
            {others.map((c: any, i: number) => {
              const mx = (home.x + c.x) / 2, my = (home.y + c.y) / 2 - Math.hypot(c.x - home.x, c.y - home.y) * 0.18;
              return <path key={'l' + c.k} d={`M${home.x},${home.y} Q${mx.toFixed(1)},${my.toFixed(1)} ${c.x},${c.y}`} pathLength={1} className="kw-map-line" style={{ animationDelay: `${(i * 0.55).toFixed(2)}s` }} />;
            })}
            {others.map((c: any, i: number) => {
              const [dx, dy, a] = LBL[c.k] || [9, 4, 'start'];
              return (
                <a key={c.k} href={cityHref(c.k, lang)} className="kw-map-city" aria-label={`${x.cityPrefix} ${name(c)}`}>
                  <circle cx={c.x} cy={c.y} r="9" className="kw-map-ring" style={{ animationDelay: `${(i * 0.55).toFixed(2)}s` }} />
                  <circle cx={c.x} cy={c.y} r="3.8" className="kw-map-pin" style={{ animationDelay: `${(i * 0.55).toFixed(2)}s` }} />
                  <text x={c.x + dx} y={c.y + dy} textAnchor={a} className="kw-map-lbl">{name(c)}</text>
                </a>
              );
            })}
            <a href={cityHref('kasterlee', lang)} className="kw-map-city kw-map-home" aria-label={`${x.cityPrefix} Kasterlee`}>
              <circle cx={home.x} cy={home.y} r="12" className="kw-map-ring kw-map-ring-home" />
              <circle cx={home.x} cy={home.y} r="6" className="kw-map-pin kw-map-pin-home" />
              <text x={home.x + 10} y={home.y - 8} textAnchor="start" className="kw-map-lbl kw-map-lbl-home">Kasterlee</text>
            </a>
          </svg>
          <p className="mt-2 text-[16px] text-[#C8C8CC]">{t.src}</p>
        </div>
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-white/20 bg-[#141416] shadow-2xl shrink-0"><Foto id="portret" vorm="cirkel" lang={lang} sizes="96px" className="absolute inset-0 block w-full h-full object-cover" /></div>
            <div>
              <p className="text-[18px] font-medium text-white leading-snug">Webstudio K</p>
              <p className="text-[16px] text-[#D3D6DA]">{x.address}</p>
              <p className="text-[16px] text-[#F1A36A]">{x.regionLine}</p>
            </div>
          </div>
          <p className="mt-7 text-[16px] font-medium text-[#D3D6DA]">{t.list}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[...M.cities].sort((p: any, q: any) => name(p).localeCompare(name(q), lang)).map((c: any) => (
              <li key={c.k}><a href={cityHref(c.k, lang)} className={cx('inline-flex rounded-full px-4 py-2 text-[15px] font-medium transition-colors cursor-pointer', 'bg-white/10 text-white hover:bg-[#B85D28]')}>{name(c)}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// "Wij doen alle sectoren" (Karim): een greep uit de sectoren, als twee lopende rijen; waar een sectorpagina bestaat, linkt het label
const ALLE: Record<string, [string, string | null][]> = {
  nl: [['Horeca', 'horeca'], ['Winkels', 'winkel'], ['Kapsalons', 'kapsalon'], ['Schoonheidssalons', 'kapsalon'], ['Barbiers', 'kapsalon'], ['Vakmensen', 'vakmensen'], ['Schilders', 'schilder'], ['Dakwerkers', 'vakmensen'], ['Loodgieters', 'vakmensen'], ['Elektriciens', 'vakmensen'], ['Tuinaannemers', 'tuin'], ['Schrijnwerkers', 'vakmensen'], ['Bouwbedrijven', 'vakmensen'], ['Vrije beroepen', 'vrij'], ['Advocaten', 'vrij'], ['Boekhouders', 'vrij'], ['Architecten', 'vrij'], ['Kinesisten', 'zorg'], ['Therapeuten', 'zorg'], ['Zorg en welzijn', 'zorg'], ['Verenigingen', 'vereniging'], ['Sportclubs', 'vereniging'], ['Starters', 'starters'], ['Webshops', 'webshop'], ["B&B's", null], ['Bakkers', null], ['Slagers', null], ['Fotografen', null], ['Coaches', null], ['Garages', null], ['Rijscholen', null], ['Cateraars', null], ['Verhuurbedrijven', null], ['Eventbureaus', null]],
  fr: [['Horeca', 'horeca'], ['Commerces', 'winkel'], ['Salons de coiffure', 'kapsalon'], ['Instituts de beauté', 'kapsalon'], ['Barbiers', 'kapsalon'], ['Artisans', 'vakmensen'], ['Peintres', 'schilder'], ['Couvreurs', 'vakmensen'], ['Plombiers', 'vakmensen'], ['Électriciens', 'vakmensen'], ['Jardiniers', 'tuin'], ['Menuisiers', 'vakmensen'], ['Entreprises de construction', 'vakmensen'], ['Professions libérales', 'vrij'], ['Avocats', 'vrij'], ['Comptables', 'vrij'], ['Architectes', 'vrij'], ['Kinés', 'zorg'], ['Thérapeutes', 'zorg'], ['Soins et bien-être', 'zorg'], ['Associations', 'vereniging'], ['Clubs sportifs', 'vereniging'], ['Jeunes entreprises', 'starters'], ['Boutiques en ligne', 'webshop'], ["Chambres d'hôtes", null], ['Boulangeries', null], ['Boucheries', null], ['Photographes', null], ['Coachs', null], ['Garages', null], ['Auto-écoles', null], ['Traiteurs', null], ['Location', null], ['Événementiel', null]],
  en: [['Hospitality', 'horeca'], ['Shops', 'winkel'], ['Hair salons', 'kapsalon'], ['Beauty salons', 'kapsalon'], ['Barbers', 'kapsalon'], ['Tradespeople', 'vakmensen'], ['Painters', 'schilder'], ['Roofers', 'vakmensen'], ['Plumbers', 'vakmensen'], ['Electricians', 'vakmensen'], ['Garden contractors', 'tuin'], ['Joiners', 'vakmensen'], ['Builders', 'vakmensen'], ['Liberal professions', 'vrij'], ['Lawyers', 'vrij'], ['Accountants', 'vrij'], ['Architects', 'vrij'], ['Physiotherapists', 'zorg'], ['Therapists', 'zorg'], ['Care and wellbeing', 'zorg'], ['Associations', 'vereniging'], ['Sports clubs', 'vereniging'], ['Start-ups', 'starters'], ['Online shops', 'webshop'], ['B&Bs', null], ['Bakers', null], ['Butchers', null], ['Photographers', null], ['Coaches', null], ['Garages', null], ['Driving schools', null], ['Caterers', null], ['Rental companies', null], ['Event agencies', null]],
};
function SectorMarquee({ lang }: { lang: string }) {
  const all = ALLE[lang] || ALLE.nl; const half = Math.ceil(all.length / 2);
  const chip = ([l, k]: [string, string | null], j: number, dup: boolean) => {
    const cls = 'shrink-0 inline-flex items-center rounded-full border px-5 py-2.5 text-[15px] font-medium whitespace-nowrap transition-colors';
    return k ? <a key={j} href={(PAD as any)[k][lang]} tabIndex={dup ? -1 : undefined} className={cx(cls, 'border-[#D3D6DA] bg-white text-[#121214] hover:bg-[#121214] hover:text-white hover:border-[#121214]')}>{l}</a>
      : <span key={j} className={cx(cls, 'border-[#E5E7EB] bg-[#F2F2F2] text-[#4C433F]')}>{l}</span>;
  };
  return (
    <div className="kw-marquee mt-10 flex flex-col gap-3" aria-label={{ nl: 'Sectoren waarvoor wij websites maken', fr: 'Secteurs pour lesquels nous créons des sites', en: 'Sectors we build websites for' }[lang]} role="region">
      {[all.slice(0, half), all.slice(half)].map((row, r) => (
        <div key={r} className="kw-mq-row overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className={cx('kw-mq-track flex w-max', r === 1 && 'kw-mq-rev')}>
            <div className="flex flex-wrap gap-3 pr-3">{row.map((x, j) => chip(x, j, false))}</div>
            <div aria-hidden="true" className="kw-mq-dup flex gap-3 pr-3">{row.map((x, j) => chip(x, j, true))}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const SECTOR_FOTO: Record<string, string> = { '/website-vakmensen/': 'sector-vakman', '/website-horeca/': 'sector-horeca', '/website-kapsalon/': 'sector-kapsalon', '/website-schilder/': 'sector-schilder', '/website-tuinaannemer/': 'sector-tuin' };
function SectorBtn({ m, i }: { m: any; i: number }) {
  const fid = SECTOR_FOTO[baseOf(m.href)];
  return (
    <button type="button" data-sel-to={i} className="relative group flex flex-col items-center cursor-pointer">
      <div data-sel-item={i} {...sel(i === 0, 'scale-[1.03]', 'opacity-90 hover:opacity-100', 'w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-[#D3D6DA] transition-transform duration-200')}>
        {fid ? <Foto id={fid} vorm="cirkel" decorative sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px" className="w-full h-full object-cover" />
          : <img data-small="320" src={m.imgSrc} srcSet={m.imgSrcset || undefined} sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px" alt="" width={144} height={144} loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />}
      </div>
      <span data-sel-item={i} {...sel(i === 0, 'mt-2 rounded-full copper-pill-gradient text-white text-[15px] font-medium px-3 py-1 shadow-md whitespace-nowrap', 'mt-2 text-[15px] sm:text-[15px] font-medium text-[#4C433F] text-center')}>{m.h}</span>
    </button>
  );
}

export function Tiers({ tiers, delivery }: { tiers: any[]; delivery?: string[] }) {
  return (
    <StaggerGroup className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">
      {tiers.map((tier: any, i: number) => {
        const cop = tier.hi; const obs = !cop && i === tiers.length - 1 && tiers.length === 3;
        const surface = cop ? 'copper-panel-gradient text-white shadow-[0_18px_40px_rgba(184,93,40,0.22)]' : obs ? 'bg-[#4C433F] text-white border border-white/10 shadow-[0_16px_36px_rgba(7,7,9,0.14)]' : 'bg-[#F2F2F2] text-[#121214] border border-[#D3D6DA]';
        const badge = cop ? 'bg-white/15 border-white/30 text-white' : obs ? 'bg-[#FB4D27]/15 border-[#FB4D27]/45 text-[#F7C59F]' : 'bg-[#B85D28]/10 border-[#B85D28]/25 text-[#5E2A11]';
        const soft = cop ? 'text-white/90' : obs ? 'text-[#D3D6DA]' : 'text-[#4C433F]';
        const monthAcc = cop ? 'text-white' : obs ? 'text-[#F7C59F]' : 'text-[#9A4A1C]';
        const check = cop ? 'bg-white/20 text-white' : obs ? 'bg-[#B85D28]/25 text-[#F7C59F]' : 'bg-[#B85D28]/12 text-[#B85D28]';
        const feat = cop ? 'text-white/95' : obs ? 'text-[#D3D6DA]' : 'text-[#4C433F]';
        const note = cop ? 'text-white/85 border-white/20' : obs ? 'text-[#D3D6DA]/90 border-white/15' : 'text-[#4C433F] border-[#D3D6DA]';
        const cta = cop ? 'bg-[#070709] hover:bg-[#18181B] text-white' : obs ? 'copper-pill-gradient hover:opacity-90 text-white' : 'bg-[#4C433F] hover:bg-[#5E2A11] text-white';
        const hTxt = tier.h.replace(/<[^>]+>/g, '');
        return (
          <StaggerItem key={i} i={i}>
            <article className={`kw-lift h-full rounded-[24px] p-7 sm:p-8 flex flex-col justify-between ${surface}`}>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`rounded-full border px-3.5 py-1 text-[15px] font-medium whitespace-nowrap ${badge}`}>{tier.badge || hTxt}</span>
                  {delivery && delivery[i] && <span className={`text-[15px] ${soft}`}>{delivery[i]}</span>}
                </div>
                <div className="mt-6">
                  <h3 className="text-[28px] sm:text-[32px] leading-[1.06] tracking-[-0.03em] font-normal"><Html html={tier.h} /></h3>
                  {tier.for && <p className={`mt-2 text-[16px] ${soft}`}><Html html={tier.for} /></p>}
                  {tier.amt && (
                    <div className={`mt-5 pb-5 border-b ${cop ? 'border-white/20' : obs ? 'border-white/15' : 'border-[#D3D6DA]'}`}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[15px] opacity-95">{tier.from}</span>
                        <span data-count="" className="font-title text-[36px] font-medium tabular-nums leading-none">{tier.amt}</span>
                        <span className="text-[15px] opacity-95">{tier.amtAfter}</span>
                      </div>
                      {tier.m.map((m: any, k: number) => (
                        <p key={k} className={`mt-2 text-[16px] tabular-nums ${m.ex ? (cop || obs ? 'text-white/90' : 'text-[#4C433F]') : (cop || obs ? 'text-white/90' : 'text-[#4C433F]')} [&_em]:not-italic [&_em]:font-medium ${cop ? '[&_em]:text-white' : obs ? '[&_em]:text-[#F7C59F]' : '[&_em]:text-[#9A4A1C]'}`}><Html html={m.ex ? m.html : m.html.replace(/^([^<€]*€\s?[\d.,]+)/, '<em>$1</em>')} /></p>
                      ))}
                    </div>
                  )}
                </div>
                {tier.list.length > 0 && (
                  <div className="mt-5">
                    {tier.listTitle && <p className={`${tier.list.some((it: any) => it.all) ? 'sr' : ''} text-[16px] font-semibold mb-3 ${cop || obs ? 'text-white' : 'text-[#121214]'}`}>{tier.listTitle}</p>}
                    <ul className="flex flex-col gap-2.5 text-[16px] leading-snug">
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
                  <div className={`mt-4 pt-4 border-t text-[16px] leading-relaxed ${note} [&_b]:font-semibold [&_b]:after:content-[':_']`}>
                    {tier.mp && <p><Html html={tier.mp} /></p>}
                    {tier.extra.map((e: string, k: number) => <p key={k} className="kw-link"><Html html={e} /></p>)}
                  </div>
                )}
              </div>
              {!tier.cta && !tier.amt && (
                <div aria-hidden="true" className={`relative overflow-hidden mt-7 h-[132px] rounded-[18px] flex items-center justify-center ${obs || cop ? 'bg-black/30' : 'bg-[#040405]'}`}><Foto id="vb-webshop-breed" vorm="breed" decorative sizes="(min-width: 1024px) 305px, calc(100vw - 80px)" className="absolute inset-0 block w-full h-full object-cover object-top" /></div>
              )}
              {tier.cta && (
                <div className="mt-7 pt-2 flex items-center justify-between gap-3">
                  <A href={tier.cta.href} chat={tier.cta.href.includes('#contact')} data-pakket={tier.cta.pakket || undefined}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-all cursor-pointer ${cta}`}>
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

// werkwijzekaarten in de sitekleuren (Karim 16-11): Flame Orange-gradient, donker, warm grijs, lichtgrijs, en zo verder
const STEP_THEMES = [
  { box: 'copper-panel-gradient text-white border-transparent shadow-[0_14px_32px_rgba(184,93,40,0.22)]', n: 'text-white', tag: 'bg-white/15 border-white/30 text-white', p: 'text-white/90', line: 'border-white/25', note: 'text-white', btn: 'bg-white text-[#121214] hover:bg-[#121214] hover:text-white' },
  { box: 'bg-[#070709] text-white border-[#B85D28]/50 shadow-[0_14px_32px_rgba(7,7,9,0.14)]', n: 'text-[#FB4D27]', tag: 'bg-[#1D1D20] border-white/10 text-[#E4E4E7]', p: 'text-[#E4E4E7]', line: 'border-white/15', note: 'text-[#F1A36A]', btn: 'copper-pill-gradient text-white' },
  { box: 'bg-[#4C433F] text-white border-transparent', n: 'text-[#F1A36A]', tag: 'bg-white/10 border-white/20 text-white', p: 'text-white/90', line: 'border-white/20', note: 'text-white', btn: 'bg-white text-[#121214] hover:bg-[#B85D28] hover:text-white' },
  { box: 'bg-[#F2F2F2] text-[#121214] border-[#D3D6DA]', n: 'text-[#9A4A1C]', tag: 'bg-white border-[#D3D6DA] text-[#4C433F]', p: 'text-[#4C433F]', line: 'border-[#D3D6DA]', note: 'text-[#9A4A1C]', btn: 'bg-[#121214] hover:bg-[#B85D28] text-white' },
];
export function Steps({ items, chat, ui, extras = false }: { items: any[]; chat: any; ui: any; extras?: boolean }) {
  return (
    <StaggerGroup className={cx('grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-stretch', items.length === 3 || items.length === 6 ? 'lg:grid-cols-3' : items.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4')}>
      {items.map((it: any, i: number) => {
        const t = STEP_THEMES[i % STEP_THEMES.length];
        return (
          <StaggerItem key={i} i={i} className={cx(items.length % 2 === 1 && i === items.length - 1 && 'sm:col-span-2 lg:col-span-1')}>
            <div className={cx('h-full rounded-[22px] p-6 sm:p-7 border flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5', t.box)}>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className={cx('font-title text-[26px] font-medium tabular-nums leading-none', t.n)}>{it.n.replace(/\.$/, '')}.</span>
                  {extras && ui.stepTags?.[i] && <span className={cx('rounded-full border px-3 py-1 text-[15px] font-medium whitespace-nowrap', t.tag)}>{ui.stepTags[i]}</span>}
                </div>
                <h3 className="mt-4 text-[21px] font-medium tracking-[-0.02em]"><Html html={it.h} /></h3>
                <p className={cx('mt-2.5 text-[16px] leading-relaxed', t.p)}><Html html={it.p} /></p>
              </div>
              <div className={cx('mt-5 pt-4 border-t flex items-center gap-3', t.line, extras && ui.stepNotes?.[i] ? 'justify-between' : 'justify-end')}>
                {extras && ui.stepNotes?.[i] && <span className={cx('text-[15px] font-medium leading-snug', t.note)}>{ui.stepNotes[i]}</span>}
                <A href={chat.href} chat aria-label={`${chat.label}: ${it.h.replace(/<[^>]+>/g, '')}`}
                  className={cx('w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer', t.btn)}><ArrowRight className="w-4 h-4" /></A>
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
            <span className="flex items-center gap-2 text-[15px] font-medium">
              <span className="tabular-nums text-[#4C433F]" data-faq-n="">{String(i + 1).padStart(2, '0')}.</span>
              {topicLabel && q.topic && <><span aria-hidden="true" className="text-[#D3D6DA]">/</span><span className="text-[#9A4A1C]">{q.topic}</span></>}
            </span>
            <span className="block text-[16px] font-medium text-[#121214] mt-1 leading-snug" dangerouslySetInnerHTML={{ __html: q.q }} />
          </span>
          <span aria-hidden="true" data-faq-ico="" {...sel(open, 'bg-[#121214] text-white', 'bg-[#ECECEE] text-[#4C433F]', 'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200')}>
            <ChevronDown className="w-4 h-4 kw-rot" />
          </span>
        </button>
      </h3>
      <div id={`${id}-p`} role="region" aria-labelledby={`${id}-t`} className="kw-acc">
        <div>
          <div className="px-5 pb-4 pt-3 text-[16px] leading-relaxed text-[#4C433F] border-t border-[#ECECEE] kw-prose kw-link" dangerouslySetInnerHTML={{ __html: q.a }} />
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
