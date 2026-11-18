// model.mjs: leest een pagina uit content/ (de bestaande site) en geeft een model terug waarmee de designcomponenten
// gevuld worden. Teksten blijven letterlijk (als HTML, zodat links en opmaak in zinnen behouden blijven).
import { parseHTML } from 'linkedom';
import { UI } from './ui-text.mjs';

const norm = s => (s || '').replace(/\s+/g, ' ').trim();
const inner = el => (el ? el.innerHTML.replace(/\s+/g, ' ').trim() : '');
const text = el => norm(el && el.textContent);
const link = a => (a ? { label: text(a), html: inner(a), href: a.getAttribute('href'), newTab: a.getAttribute('target') === '_blank' } : null);
const $ = (r, s) => r.querySelector(s);
const $$ = (r, s) => [...r.querySelectorAll(s)];

export function parse(html) { return parseHTML(html).document; }

// ---------------------------------------------------------------- shell (header, footer, cookies, formulier)
export function shellModel(doc, url) {
  const lang = (url.match(/^\/(fr|en)\//) || [, 'nl'])[1];
  const ui = UI[lang];
  const H = $(doc, 'header.hdr'), F = $(doc, 'footer.ftr');
  const navTop = H ? $$(H, '.nav > a').map(link) : [];
  const dd = H && $(H, '.nav-dd');
  const services = dd ? { ...link($(dd, '.nav-dd-a')), items: $$(dd, '.nav-dd-c a').map(link) } : null;
  const langs = H ? $$(H, '.hdr-r .lang a').map(a => ({ short: text(a), href: a.getAttribute('href'), hreflang: a.getAttribute('hreflang'), label: a.getAttribute('aria-label'), current: a.hasAttribute('aria-current') })) : [];
  const mob = H ? $$(H, '.m-main > li').map(li => {
    const b = $(li, '.m-acc-b'); if (b) return { label: text(b), items: $$(li, '.m-sub a').map(link) };
    return link($(li, 'a'));
  }) : [];
  const mcl = H ? $$(H, '.m-cl a').map(link) : [];
  const ctaA = H && $(H, '.hdr-cta');
  const burger = H && $(H, '.burger');
  const footer = F ? {
    summary: inner($(F, '.ftr-b p')),
    cols: $$(F, '.ftr-n').map(n => ({ title: text($(n, 'h2')), aria: n.getAttribute('aria-label'), links: $$(n, 'a').map(link) })),
    bottom: $$(F, '.ftr-bot > span').map(text),
    bottomLinks: $$(F, '.ftr-bot > a').map(link),
    cookieBtn: text($(F, '.ftr-bot .ck-open')),
  } : null;
  const ck = $(doc, '#ck');
  const cookie = ck ? {
    title: text($(ck, '#ck-t')), text: inner($(ck, '#ck-d')),
    rows: $$(ck, '.ck-row').map(r => ({ title: text($(r, 'b')), small: text($(r, 'small')), id: $(r, 'input')?.id || '', disabled: $(r, 'input')?.hasAttribute('disabled'), checked: $(r, 'input')?.hasAttribute('checked') })),
    save: text($(ck, '.ck-save')),
    buttons: $$(ck, '.ck-bs .ck-b').map(b => ({ label: text(b), act: b.getAttribute('data-ck') })),
    setLabel: text($(ck, '[data-ck=set]')),
  } : null;
  const mbar = $(doc, '.mbar');
  return {
    lang, prefix: lang === 'nl' ? '' : '/' + lang, ui, url,
    skip: text($(doc, 'a.skip')),
    logoAria: $(doc, 'header .logo')?.getAttribute('aria-label') || 'Webstudio K',
    navAria: H ? $(H, '.nav')?.getAttribute('aria-label') : '',
    langAria: H ? $(H, '.lang')?.getAttribute('aria-label') : '',
    navTop, services, langs, mob, mcl,
    cta: ctaA ? link(ctaA) : null,
    menuOpen: burger?.getAttribute('aria-label') || ui.menuOpen,
    footer, cookie,
    floating: mbar ? $$(mbar, 'a').map(link) : [],
  };
}

// contactformulier (staat op de home; de velden en teksten gebruiken we ook voor het contactvenster op elke pagina)
export function formModel(homeDoc) {
  const f = $(homeDoc, '#cform'); if (!f) return null;
  const hidden = Object.fromEntries($$(f, 'input[type=hidden]').map(i => [i.getAttribute('name'), i.getAttribute('value')]));
  const lab = name => { const el = $(f, `[name="${name}"]`); const l = el && el.closest('label'); return l ? norm([...l.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ')) : ''; };
  const ph = name => $(f, `[name="${name}"]`)?.getAttribute('placeholder') || '';
  return {
    hidden,
    labels: { naam: lab('naam'), zaak: lab('zaak'), email: lab('email'), dienst: lab('dienst'), bericht: lab('bericht'), website: lab('website') },
    ph: { naam: ph('naam'), zaak: ph('zaak'), email: ph('email'), bericht: ph('bericht') },
    options: $$(f, 'select[name=dienst] option').map(text),
    submit: text($(f, '.bl')),
    privacy: inner($(f, '.priv')),
    ok: $(homeDoc, '#fok') ? { title: text($(homeDoc, '#fok h3')), text: inner($(homeDoc, '#fok p')) } : null,
  };
}

// ---------------------------------------------------------------- hero (alle pagina's behalve home)
export function heroModel(doc) {
  const h = $(doc, 'main > section.hero'); if (!h) return null;
  const crumb = $(h, '.hero-crumb');
  return {
    crumbs: crumb ? $$(crumb, 'li').map(li => { const a = $(li, 'a'); return a ? { ...link(a), mid: li.classList.contains('hero-crumb-mid') } : { html: inner(li), label: text(li), current: true }; }) : null,
    crumbAria: crumb?.getAttribute('aria-label') || '',
    tag: !crumb && $(h, '.hero-tag') ? inner($(h, '.hero-tag')) : '',
    h1: inner($(h, 'h1')), h1id: $(h, 'h1')?.id || '',
    slogan: inner($(h, '.hero-slogan')),
    ctas: $$(h, '.hero-ctas a').map(a => ({ ...link(a), kind: a.classList.contains('btn-white') ? 'primary' : 'secondary' })),
    trust: $$(h, '.hero-trust li').map(li => inner(li)),
    sectionAria: h.getAttribute('aria-labelledby') || '',
  };
}

// ---------------------------------------------------------------- blokken (inhoud onder de hero)
const cardOf = art => {
  const head = $(art, '.svc-h');
  const h = head ? $(head, 'h2,h3,h4') : null;
  const body = art.cloneNode(true); body.querySelector('.svc-h')?.remove(); body.querySelector('.svc-i')?.remove();
  return { h: h ? inner(h) : '', htag: h ? h.tagName.toLowerCase() : 'h3', hid: h?.id || '', id: art.id || '', dark: art.classList.contains('svc-dark'), big: art.classList.contains('svc-big'), body: inner(body) };
};
const headOf = sec => {
  const sh = $(sec, ':scope > .wrap > header.sh, :scope > .wrap > .sh, :scope .steps-head');
  const h2 = sh ? $(sh, 'h2') : $(sec, ':scope > .wrap > h2, :scope > .wrap > .kw-band-intro ~ h2');
  return {
    badge: sh && $(sh, '.lbl, .eyebrow') ? text($(sh, '.lbl, .eyebrow')) : '',
    h2: h2 ? inner(h2) : '', h2id: h2?.id || '', h2tag: h2 ? h2.tagName.toLowerCase() : 'h2',
    side: sh ? $$(sh, '.sh-side > *, :scope > p.lead').map(e => e.outerHTML).join('') : '',
  };
};

export function blocksModel(doc) {
  const main = $(doc, 'main'); const out = [];
  for (const sec of [...main.children]) {
    const c = sec.classList; const id = sec.id || '';
    if (c.contains('hero')) continue;
    if (sec.tagName === 'ASIDE') continue; // mobiele dubbele knop (staat ook in de zwevende knop)
    if (c.contains('reel')) { out.push({ kind: 'shot', id, html: inner($(sec, '.sreel-in, .reel-card')), phones: $$(sec, '.reel-ph img').map(i => i.outerHTML) }); continue; }
    const wrap = $(sec, ':scope > .wrap') || $(sec, '.wrap');
    // ---- intro-band (eerste sectie onder de hero)
    if (c.contains('band')) {
      const intro = $$(sec, '.kw-band-intro > p:not(.kwb2-cta)').map(inner);
      const introBtn = $(sec, '.kw-band-intro .kwb2-cta a') ? link($(sec, '.kw-band-intro .kwb2-cta a')) : null;
      const hd = headOf(sec);
      const h2el = $(wrap, ':scope > h2') || $(wrap, ':scope > header h2');
      const br = $(wrap, '.band-r');
      out.push({
        kind: 'band', id, intro, introBtn, aria: sec.getAttribute('aria-labelledby') || '',
        h2: h2el ? inner(h2el) : hd.h2, h2id: h2el?.id || hd.h2id,
        lead: br ? $$(br, '.b-txt > p, :scope > .lead, :scope > p').filter(p => !p.closest('.b-txt') || !$(br, '.b-txt > ul, .b-txt > ol')).map(p => ({ html: inner(p), lead: p.classList.contains('lead') })) : [],
        txt: br && $(br, '.b-txt > ul, .b-txt > ol') ? inner($(br, '.b-txt')) : '',
        fig: br && $(br, '.b-fig') ? inner($(br, '.b-fig')) : '',
        figPhone: !!(br && $(br, '.pcard-ph')),
        chips: br && $(br, '.chips') ? { aria: $(br, '.chips').getAttribute('aria-label') || '', links: $$(br, '.chips a').map(link) } : null,
        prose: $(wrap, ':scope > .kw-home-prose:not(.pr-b)') ? inner($(wrap, ':scope > .kw-home-prose:not(.pr-b)')) : '',
        cards: $(wrap, ':scope > .sv-g') ? $$(wrap, ':scope > .sv-g > .svc').map(cardOf) : [],
        pre: $$(wrap, ':scope > .pr-b').filter(e => $(wrap, ':scope > .sv-g') && (e.compareDocumentPosition($(wrap, ':scope > .sv-g')) & 4)).map(inner),
        extra: $$(wrap, ':scope > .pr-b, :scope > p').filter(e => !$(wrap, ':scope > .sv-g') || !(e.compareDocumentPosition($(wrap, ':scope > .sv-g')) & 4)).map(e => e.outerHTML).join(''),
      });
      continue;
    }
    // ---- werkwijze
    if (c.contains('steps')) {
      const hd = headOf(sec);
      out.push({
        kind: 'steps', id, aria: sec.getAttribute('aria-labelledby') || '', ...hd,
        h2: inner($(sec, '.steps-head h2')), h2id: $(sec, '.steps-head h2')?.id || '',
        anchors: $$(sec, '.steps-head h2 span[id]').map(s => s.id),
        badge: text($(sec, '.steps-head .lbl')),
        items: $$(sec, '.srow').map((li, i) => ({ n: text($(li, '.srow-n')) || String(i + 1).padStart(2, '0'), h: inner($(li, 'h3')), p: inner($(li, 'p')) })),
        after: $$(sec, '.steps-after, .steps-be, .steps-note').map(e => inner(e)).join(' '),
        cta: $(sec, '.steps-cta a') ? link($(sec, '.steps-cta a')) : null,
        ctaNote: $(sec, '.steps-cta p') ? inner($(sec, '.steps-cta p')) : '',
      });
      continue;
    }
    // ---- veelgestelde vragen
    if (c.contains('fq6')) {
      const groups = $$(sec, '.fq-g').map(g => ({ title: text($(g, '.fq-gt')), items: $$(g, 'details.fq').map(d => ({ q: inner($(d, '.fq-qt')), a: inner($(d, '.fq-a')) })) }));
      const card = $(sec, '.fq6-cta');
      out.push({
        kind: 'faq', id, aria: sec.getAttribute('aria-labelledby') || '',
        badge: text($(sec, '.fq6-h .eyebrow')), h2: inner($(sec, '.fq6-h h2')), h2id: $(sec, '.fq6-h h2')?.id || '',
        groups, card: card ? { h: inner($(card, 'h3')), p: inner($(card, 'p:not(.fq6-c)')), cta: link($(card, 'a.btn')), note: inner($(card, '.fq6-c')), all: $$(card, 'p').map(inner) } : null,
      });
      continue;
    }
    // ---- call-to-action / contact
    if (c.contains('ct6')) {
      if ($(sec, '#cform')) { out.push({ kind: 'contact', id }); continue; }
      const also = $(sec, '.also-in');
      out.push({
        kind: 'cta', id, aria: sec.getAttribute('aria-labelledby') || '',
        h2: inner($(sec, '.ct6-l h2')), h2id: $(sec, '.ct6-l h2')?.id || '',
        p: $$(sec, '.ct6-p').map(inner), btn: $(sec, '.ct6-r > a.btn') ? link($(sec, '.ct6-r > a.btn')) : null,
        alt: $$(sec, '.ct6-alt').map(inner),
        also: also ? { aria: also.getAttribute('aria-label') || '', label: text($(also, '.also-lbl')), links: $$(also, 'a').map(link) } : null,
      });
      continue;
    }
    // ---- pakketten
    if (c.contains('prijzen') && $(sec, '.pk-g')) {
      const hd = headOf(sec);
      out.push({
        kind: 'pricing', id, ...hd,
        tiers: $$(sec, '.pk').map(pk => ({
          hi: pk.classList.contains('pk-hi'), badge: text($(pk, '.pk-badge')), h: inner($(pk, 'h3')), for: inner($(pk, '.pk-for')),
          from: text($(pk, '.pk-from')), amt: text($(pk, '.pk-amt b')), amtAfter: norm([...($(pk, '.pk-amt')?.childNodes || [])].filter(n => n.nodeType === 3 || (n.tagName === 'SPAN' && !n.classList.contains('pk-from'))).map(n => n.textContent).join(' ')),
          m: $$(pk, '.pk-m').map(p => ({ html: inner(p), ex: p.classList.contains('pk-ex') })),
          cta: $(pk, '.pk-cta') ? { ...link($(pk, '.pk-cta')), pakket: $(pk, '.pk-cta').getAttribute('data-pakket') } : null,
          listTitle: text($(pk, '.pk-s')), list: $$(pk, '.pk-l li').map(li => ({ html: inner(li), all: li.classList.contains('pk-all'), lt: li.classList.contains('pk-lt') })),
          mp: $(pk, '.pk-mp') ? inner($(pk, '.pk-mp')) : '',
          extra: $$(pk, ':scope > p:not(.pk-for):not(.pk-amt):not(.pk-m):not(.pk-mp):not(.pk-badge)').map(inner),
        })),
        after: $$(sec, '.pk-term, .pterms2, :scope > .wrap > p').map(e => e.outerHTML).join(''),
        terms2: $(sec, '.pterms2') ? { h: inner($(sec, '.pterms2 h3')), p: inner($(sec, '.pterms2 p')), btn: $(sec, '.pterms2 a.btn') ? link($(sec, '.pterms2 a.btn')) : null } : null,
        term: $$(sec, '.pk-term').map(inner),
      });
      continue;
    }
    // ---- voorbeeldontwerpen (raster met schermafbeeldingen)
    if (c.contains('werk') && $(sec, '.wks')) {
      const hd = headOf(sec);
      out.push({ kind: 'demos', id, ...hd,
        items: $$(sec, '.wk').map(w => ({ href: $(w, 'a.work-link').getAttribute('href'), newTab: $(w, 'a.work-link').getAttribute('target') === '_blank', img: $(w, '.wk-desk img') ? ($(w, '.wk-desk picture') || $(w, '.wk-desk img')).outerHTML : '', h: inner($(w, 'h3')), p: inner($(w, '.wk-b p')), l: inner($(w, '.wk-l')) })),
        fine: $$(sec, '.fine, .wrap > .pr-b, .wks ~ .pr-b, .wks > .pr-b').map(inner) });
      continue;
    }
    // ---- privacy / cookies: genummerde blokken
    if (c.contains('pvx')) {
      out.push({ kind: 'legal', id, items: $$(sec, '.pv-r').map(r => ({ h: inner($(r, '.pv-h')), hid: $(r, '.pv-h')?.id || '', body: inner($(r, '.pv-t')) })) });
      continue;
    }
    // ---- galerij met beeldkaarten (nieuw): li > a[href][data-foto|data-shot] met .t (titel) en .l (label)
    if (c.contains('kw-gallery')) {
      const h2 = $(sec, 'h2');
      out.push({ kind: 'gallery', id, h2: inner(h2), h2id: h2?.id || '', h2tag: 'h2', badge: text($(sec, '.lbl')), lead: $(sec, '.kw-gallery-lead') ? $(sec, '.kw-gallery-lead').outerHTML : '',
        items: $$(sec, 'li > a').map(a => ({ href: a.getAttribute('href'), foto: a.getAttribute('data-foto') || '', shot: a.getAttribute('data-shot') || '', title: text($(a, '.t')), label: text($(a, '.l')) })) });
      continue;
    }
    // ---- contactformulier op een eigen pagina (nieuw, SEO-ronde): tekst links, formulier rechts
    if (c.contains('kw-form')) {
      const h2 = $(sec, 'h2');
      out.push({ kind: 'form', id, h2: inner(h2), h2id: h2?.id || '', badge: text($(sec, '.lbl')), html: inner($(sec, '.kw-form-txt')) });
      continue;
    }
    // ---- kaarten (diensten, factoren, gemeenten, artikels ...)
    const hd = headOf(sec);
    const grid = wrap && $(wrap, ':scope > .sv-g');
    const prose = wrap && $(wrap, ':scope > .kw-home-prose, :scope > .pr-g .kw-home-prose');
    if (grid) {
      out.push({
        kind: 'cards', id, dark: c.contains('xr-d'), spd: c.contains('spd'), ...hd,
        pre: $$(wrap, ':scope > .pr-b, :scope > p, :scope > .kw-home-prose').filter(e => e.compareDocumentPosition(grid) & 4).map(e => inner(e)),
        cards: $$(grid, ':scope > .svc').map(cardOf),
        lists: $$(grid, '.ls-l').length > 0, links: $$(grid, '.ix-l').length > 0, articles: grid.classList.contains('kw31g') && $$(grid, '.svc-h h3 a').length > 0,
        duo: c.contains('duo'), muni: grid.classList.contains('sv-g-muni'), band3: grid.classList.contains('sv-g-band3'),
        after: $$(wrap, ':scope > .pr-b, :scope > p, :scope > .kw-home-prose, :scope > div:not(.sv-g):not(.sh):not(header):not(.pr-b):not(.kw-home-prose)').filter(e => e.compareDocumentPosition(grid) & 2).map(e => inner(e)),
      });
      continue;
    }
    if (prose || $(sec, '.pr-g')) {
      const fig = $(sec, '.pr-fig');
      out.push({ kind: 'prose', id, spd: c.contains('spd'), ...hd, html: prose ? inner(prose) : $$(sec, '.pr-b').map(inner).join(''), fig: fig ? inner(fig) : '', figPhone: !!(fig && $(fig, '.pcard-ph')) });
      continue;
    }
    out.push({ kind: 'raw', id, html: sec.outerHTML }); // vangnet: niets gaat verloren
  }
  return out;
}

// ---------------------------------------------------------------- home: alle stukken die het design nodig heeft
export function homeModel(doc) {
  const m = $(doc, 'main');
  const T = s => text($(m, s)), I = s => inner($(m, s));
  const band = $(m, 'section.band');
  return {
    hero: { tag: T('.hero-tag'), h1: T('h1'), h1id: $(m, 'h1').id, slogan: I('.hero-slogan'), ctas: $$(m, '.hero-ctas a').map(link), trust: $$(m, '.hero-trust li').map(text), aria: $(m, 'section.hero').getAttribute('aria-labelledby') },
    band: { h2: T('#band-title') || text($(band, 'h2')), h2id: $(band, 'h2')?.id, lead: inner($(band, '.lead')), chips: $$(band, '.chips a').map(link) },
    phones: $$(m, '.reel-ph img').map(i => i.outerHTML),
    werk: {
      id: $(m, '#werk') ? 'werk' : '', innerId: $(m, '#voorbeelden') ? 'voorbeelden' : '',
      badge: text($(m, '#werk .lbl')), h2: text($(m, '#werk h2')), h2id: $(m, '#werk h2')?.id, lead: inner($(m, '#werk .lead')),
      items: $$(m, '#werk li.case').map(li => ({ cat: text($(li, '.exc-v')), h: text($(li, 'h3')), p: inner($(li, '.exc-b > p:not(.exc-v)')), href: $(li, 'a.btn').getAttribute('href'), btn: link($(li, 'a.btn')), img: $(li, '.case-desk picture, .case-desk img')?.outerHTML || '' })),
      cta: $(m, '#werk .exc-cta') ? { h: inner($(m, '#werk .exc-cta h3')), p: inner($(m, '#werk .exc-cta p')), btn: link($(m, '#werk .exc-cta a.btn')), more: link($(m, '#werk .exc-cta a.tlink')) } : null,
    },
    steps: blocksModel(doc).find(b => b.kind === 'steps'),
    pricing: blocksModel(doc).find(b => b.kind === 'pricing'),
    vn: $(m, '#voor-na') ? {
      badge: text($(m, '#voor-na .lbl')), h2: text($(m, '#voor-na h2')), h2id: $(m, '#voor-na h2')?.id,
      q: text($(m, '.g-q')), name: text($(m, '.g-r b')), type: text($(m, '.g-r span')), reviews: text($(m, '.g-st')), btns: $$(m, '.g-b span').map(text), no: text($(m, '.g-no')),
      voor: text($(m, '.vn-voor .vtag')), na: text($(m, '.vn-na .vtag')), naHref: $(m, '.vn-na a').getAttribute('href'), naImg: ($(m, '.vn-na picture') || $(m, '.vn-na img')).outerHTML, fine: inner($(m, '#voor-na .fine')),
    } : null,
    cases: { badge: text($(m, '#cases .lbl')), h2: text($(m, '#cases h2')), h2id: $(m, '#cases h2')?.id, items: $$(m, '#cases .cs').map(cs => ({ n: text($(cs, '.cs-n')), h: inner($(cs, 'h3')), hText: text($(cs, 'h3')), p: inner($(cs, 'p')), a: link($(cs, 'p a')) })) },
    diensten: {
      badge: text($(m, '#diensten .lbl')), h2: text($(m, '#diensten h2')), h2id: $(m, '#diensten h2')?.id, lead: text($(m, '#diensten .lead')), btn: link($(m, '#diensten .sh-side a')),
      items: $$(m, '#diensten article.svc').map(a => ({ id: a.id, h: text($(a, 'h3')), d: inner($(a, '.svc-d')), price: inner($(a, '.svc-p')), priceText: text($(a, '.svc-p')), chips: $$(a, '.svc-l li').map(li => inner(li)), more: link($(a, '.svc-more a')) })),
    },
    vak: { badge: text($(m, '.vak .lbl')), h2: text($(m, '.vak h2')), h2id: $(m, '.vak h2')?.id, lead: text($(m, '.vak .lead')), items: $$(m, '.vak a.vk').map(a => ({ href: a.getAttribute('href'), img: ($(a, 'picture') || $(a, 'img')).outerHTML, imgSrc: $(a, 'img').getAttribute('src'), imgSrcset: $(a, 'img').getAttribute('srcset'), h: text($(a, 'h3')), p: inner($(a, '.vk-t p')), arr: text($(a, '.arr')) })) },
    faq: blocksModel(doc).find(b => b.kind === 'faq'),
    contact: $(m, '#contact') ? {
      eyebrow: text($(m, '#contact .eyebrow')), h2: text($(m, '#contact h2')), h2id: $(m, '#contact h2')?.id,
      steps: $$(m, '.ct6-st li').map(li => ({ b: text($(li, 'b')), s: inner($(li, 'span')) })),
      links: $$(m, '.ct6-d a').map(a => ({ href: a.getAttribute('href'), small: text($(a, 'small')), b: inner($(a, 'b')) })),
    } : null,
    anchors: $$(m, '[id]').map(e => e.id),
  };
}
