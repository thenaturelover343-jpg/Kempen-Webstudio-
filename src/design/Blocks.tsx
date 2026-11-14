// Onderpagina's (diensten, sectoren, steden, kennis, kosten, privacy, 404 ...) uitsluitend opgebouwd met componenten
// en stijl uit het design: de hero van ServicesPage/AboutPage, de kaarten van ServicesPage (werkwijze), AboutPage
// (sectorkaarten met beeld, donkere voorbeeldkaarten, CTA-blok), de pakketkaarten, werkwijzekaarten en FAQ van de home.
// Inhoud letterlijk uit de bestaande pagina (model.mjs).
import { Fragment } from 'react';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { A, FadeIn, Html, SectionReveal, StaggerGroup, StaggerItem, cx } from './primitives';
import { FaqItem, Steps, Tiers } from './Home';

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

export function PageHero({ h }: { h: any }) {
  return (
    <SectionReveal immediate data-fl-hide="" aria-labelledby={h.sectionAria || undefined} className="hero-canvas pt-10 sm:pt-16 pb-14 sm:pb-20">
      <div className={W}>
        <FadeIn immediate>
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
          ) : h.tag ? <Badge light><Html html={h.tag} /></Badge> : null}
          <h1 id={h.h1id || undefined} className="mt-4 text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.04em] font-medium text-[#121214] max-w-4xl [text-wrap:balance]" dangerouslySetInnerHTML={{ __html: h.h1 }} />
          {h.slogan && <p className="mt-6 text-[16px] sm:text-[18px] leading-relaxed text-[#4C433F] max-w-2xl kw-link" dangerouslySetInnerHTML={{ __html: h.slogan }} />}
          <Btns ctas={h.ctas} />
        </FadeIn>
        {h.trust && h.trust.length > 0 && (
          <FadeIn immediate delay={0.12} className="mt-10 sm:mt-12">
            <ul className="w-full rounded-2xl sm:rounded-full bg-[#121214]/95 backdrop-blur-md text-[#E4E4E7] px-5 sm:px-8 lg:px-10 min-h-[48px] sm:h-[54px] py-3 sm:py-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-4 gap-y-1.5 text-[12px] sm:text-[13px] lg:text-[13.5px] font-normal shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
              {h.trust.map((t: string, i: number) => (
                <li key={i} className="inline-flex items-center gap-2 sm:whitespace-nowrap"><span aria-hidden="true" className="text-[#E4E4E7]">•</span><Html html={t} /></li>
              ))}
            </ul>
          </FadeIn>
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
  const n = cols || (cards.length === 4 ? 2 : cards.length === 2 ? 2 : 3);
  return (
    <StaggerGroup className={cx('grid grid-cols-1 gap-5', n === 2 ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3')}>
      {cards.map((c, i) => <StaggerItem key={i} i={i} className="h-full"><Card c={c} i={i} dark={dark} articles={articles} /></StaggerItem>)}
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

function Chips({ links, aria }: { links: any[]; aria?: string }) {
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

export function Blocks({ blocks, s }: { blocks: any[]; s: any }) {
  let prevDark = false; let n = 0; let firstCards = true;
  const out: any[] = [];
  for (const b of blocks) {
    const plainCards = b.kind === 'cards' && !b.lists && !b.articles && !b.duo;
    let dark = b.kind === 'prose' && b.spd || plainCards && b.spd;
    if (plainCards && firstCards && !prevDark) dark = true;
    if (plainCards) firstCards = false;
    if (dark && prevDark) dark = false;
    const props = { dark, afterDark: !dark && prevDark, first: n === 0 && !dark, id: b.id, aria: b.aria, k: n };
    out.push(<Fragment key={n}>{render(b, props, s)}</Fragment>);
    prevDark = dark; n++;
  }
  return <>{out}</>;
}

function render(b: any, P: any, s: any) {
  const dark = P.dark;
  switch (b.kind) {
    case 'band': return (
      <Sec {...P}>
        {b.intro.length > 0 && (
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-12 sm:mb-16">
            {b.h2 && <div className="lg:col-span-5"><H2 html={b.h2} id={b.h2id} /></div>}
            <div className={cx('lg:col-span-7', !b.h2 && 'lg:col-start-6')}>
              <p className={cx('font-title leading-[1.16] tracking-[-0.03em] font-normal text-[#121214] max-w-2xl [text-wrap:balance] kw-link', strip(b.intro.join(' ')).length > 340 ? 'text-[18px] sm:text-[20px] lg:text-[22px]' : strip(b.intro.join(' ')).length > 190 ? 'text-[20px] sm:text-[24px] lg:text-[28px]' : 'text-[24px] sm:text-[32px] lg:text-[38px]')}>
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
        {b.pre && b.pre.map((p: string, i: number) => <Prose key={i} html={p} className="max-w-3xl mt-10" />)}
        {b.cards.length > 0 && b.cards.some((c: any) => c.h) && (
          <div className="mt-12"><Grid cards={b.cards} dark={false} articles={b.cards.some((c: any) => /<a /.test(c.h))} /></div>
        )}
        {b.cards.length > 0 && !b.cards.some((c: any) => c.h) && (
          <div className="mt-12">
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {b.cards.map((c: any, i: number) => (
                <StaggerItem key={i} i={i} className={cx('h-full', i === b.cards.length - 1 && b.cards.length === 3 && 'md:col-span-3')}>
                  <div className="h-full rounded-[24px] bg-[#F2F2F2] border border-[#D3D6DA] p-7 flex flex-col">
                    <span aria-hidden="true" className="font-title text-[20px] font-medium text-[#9A4A1C]">{['I.', 'II.', 'III.', 'IV.', 'V.'][i]}</span>
                    <div className="mt-6 text-[14px] leading-relaxed text-[#4C433F] kw-prose kw-link" dangerouslySetInnerHTML={{ __html: c.body }} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        )}
        {b.extra && <div className="mt-8 text-[14.5px] leading-relaxed text-[#4C433F] kw-prose kw-link max-w-3xl" dangerouslySetInnerHTML={{ __html: b.extra.replace(/class="[^"]*"/g, '') }} />}
      </Sec>
    );
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
    case 'prose': return (
      <Sec {...P}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 items-start">
              {all.map((q: any, i: number) => <FaqItem key={i} q={q} i={i} open={i === 0} topicLabel={titled} />)}
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
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {b.items.map((d: any, i: number) => (
            <StaggerItem key={i} i={i} className="h-full">
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
        <div className="flex flex-col gap-12">
          {b.items.map((it: any, i: number) => (
            <FadeIn key={i} className="pt-4 border-t-2 border-[#121214] grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10">
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
