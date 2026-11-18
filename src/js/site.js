/* Webstudio K – het enige script van de site (defer, ~10 kB). Doet wat React/motion in het design deed, maar
   zonder framework: verschijnen bij scrollen, sliders en keuzes, FAQ (filter + accordeon), menupaneel, diensten-
   submenu, klok, voortgangsbalk, cursor-effect in de hero, contactvenster en -formulier (web3forms), cookiekeuze
   (statistiek pas na toestemming). Animaties alleen via transform/opacity; bij "minder beweging" staat alles stil. */
(function () {
  var d = document, h = d.documentElement, W = window;
  W.kwReady = 1; h.classList.add('js');
  var lang = (h.lang || 'nl').slice(0, 2), pre = lang === 'nl' ? '' : '/' + lang;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $$ = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };
  var T = {
    nl: { name: 'Vul uw naam in.', email: 'Vul een geldig e-mailadres in.', msg: 'Vertel kort waarmee wij kunnen helpen.', busy: 'Bezig met versturen', fail: 'Versturen lukte niet. Probeer opnieuw of mail naar ', subj: 'Aanvraag via de website: ', pk: 'Ik heb interesse in het pakket ' },
    fr: { name: 'Veuillez saisir votre nom.', email: 'Veuillez saisir une adresse e-mail valide.', msg: 'Dites-nous brièvement comment nous pouvons vous aider.', busy: 'Envoi en cours', fail: 'L’envoi a échoué. Réessayez ou écrivez à ', subj: 'Demande via le site : ', pk: 'Je suis intéressé par la formule ' },
    en: { name: 'Please enter your name.', email: 'Please enter a valid email address.', msg: 'Tell us briefly how we can help.', busy: 'Sending', fail: 'Sending failed. Please try again or email ', subj: 'Request via the website: ', pk: 'I am interested in the package ' }
  }[lang] || null;
  T = T || { name: '', email: '', msg: '', busy: '', fail: '', subj: '', pk: '' };
  var E = 'info@kempenwebstudio.be';

  /* ---------- verschijnen bij scrollen (FadeIn, SectionReveal, StaggerGroup) ---------- */
  var rv = $$('.kw-fade, .kw-sec, .kw-sg:not(.kw-in)');
  if ('IntersectionObserver' in W && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('kw-in'); io.unobserve(x.target); } }); }, { rootMargin: '0px 0px -32px 0px', threshold: 0 });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add('kw-in'); });

  /* ---------- keuze-elementen: [data-sel] met [data-sel-to|next|prev], [data-sel-item] (data-on/off), [data-sel-panel] ---------- */
  function swap(el, on) {
    var a = (el.getAttribute(on ? 'data-off' : 'data-on') || '').split(' '), b = (el.getAttribute(on ? 'data-on' : 'data-off') || '').split(' ');
    a.forEach(function (c) { if (c) el.classList.remove(c); }); b.forEach(function (c) { if (c) el.classList.add(c); });
  }
  $$('[data-sel]').forEach(function (g) {
    var own = function (s) { return $$(s, g).filter(function (e) { return e.closest('[data-sel]') === g; }); };
    var panels = own('[data-sel-panel]'), items = own('[data-sel-item]');
    var n = 0; panels.concat(items).forEach(function (e) { n = Math.max(n, +(e.getAttribute('data-sel-panel') || e.getAttribute('data-sel-item')) + 1); });
    var cur = 0, wrap = g.hasAttribute('data-sel-wrap');
    function set(i) {
      if (i === cur && arguments.length < 2) { return; }
      cur = (i + n) % n;
      panels.forEach(function (p) { var on = +p.getAttribute('data-sel-panel') === cur; if (on && p.hidden) { p.hidden = false; if (!reduced) { p.classList.remove('kw-swap'); void p.offsetWidth; p.classList.add('kw-swap'); } } else if (!on) p.hidden = true; });
      items.forEach(function (it) { var on = +it.getAttribute('data-sel-item') === cur; swap(it, on); if (it.hasAttribute('aria-pressed')) it.setAttribute('aria-pressed', on); });
      own('[data-sel-to]').forEach(function (b) { if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', +b.getAttribute('data-sel-to') === cur); });
    }
    g.addEventListener('click', function (e) {
      if (e.target.closest('a[href]') && !e.target.closest('[data-sel-to],[data-sel-next],[data-sel-prev]')) return;
      var t = e.target.closest('[data-sel-to],[data-sel-next],[data-sel-prev]'); if (!t || t.closest('[data-sel]') !== g) return;
      if (t.hasAttribute('data-sel-next')) set(cur + 1, 1); else if (t.hasAttribute('data-sel-prev')) set(cur - 1, 1); else set(+t.getAttribute('data-sel-to'));
    });
    g.addEventListener('keydown', function (e) {
      var t = e.target.closest('[data-sel-to][role=button]'); if (!t || (e.key !== 'Enter' && e.key !== ' ')) return; e.preventDefault(); set(+t.getAttribute('data-sel-to'));
    });
    own('[data-sel-to]').forEach(function (b) { if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', +b.getAttribute('data-sel-to') === 0); });
    /* automatisch afspelen ([data-sel-auto]=ms): rustig na elkaar, voortgangsbalk [data-sel-bar], pauze bij hover/focus
       en buiten beeld, klikken blijft kan; niets bij "minder beweging" */
    var auto = +g.getAttribute('data-sel-auto');
    if (auto && n > 1 && !reduced) {
      var paused = false, inView = false, t = 0, bars = own('[data-sel-bar]');
      var run = function () {
        clearTimeout(t); var go = !paused && inView;
        bars.forEach(function (b) { b.style.animation = 'none'; void b.offsetWidth; b.style.animation = go ? 'kw-bar ' + auto + 'ms linear forwards' : ''; });
        if (go) t = setTimeout(function () { set(cur + 1, 1); run(); }, auto);
      };
      g.addEventListener('mouseenter', function () { paused = true; run(); });
      g.addEventListener('mouseleave', function () { paused = false; run(); });
      g.addEventListener('focusin', function () { paused = true; run(); });
      g.addEventListener('focusout', function (e) { if (!e.relatedTarget || !g.contains(e.relatedTarget)) { paused = false; run(); } });
      g.addEventListener('click', function () { setTimeout(run, 0); });
      if ('IntersectionObserver' in W) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; run(); }, { threshold: 0.35 }).observe(g);
      else { inView = true; run(); }
      d.addEventListener('visibilitychange', function () { inView = !d.hidden && inView; run(); });
    }
  });

  /* ---------- FAQ: filter op onderwerp + één vraag tegelijk open ---------- */
  $$('[data-faq]').forEach(function (f) {
    var items = $$('[data-faq-item]', f), tabs = $$('[role=tab]', f);
    function open(it, on) {
      swap(it, on); it.classList.toggle('kw-open', on);
      var b = it.querySelector('button[aria-expanded]'); b.setAttribute('aria-expanded', on); swap(it.querySelector('[data-faq-ico]'), on);
    }
    items.forEach(function (it) {
      it.querySelector('button[aria-expanded]').addEventListener('click', function () {
        var was = it.classList.contains('kw-open'); items.forEach(function (o) { if (o !== it && o.classList.contains('kw-open')) open(o, false); }); open(it, !was);
      });
    });
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var topic = t.getAttribute('data-topic');
        tabs.forEach(function (o) { var on = o === t; swap(o, on); o.setAttribute('aria-selected', on); });
        var k = 0, first = null, anyOpen = false;
        items.forEach(function (it) {
          var show = !topic || it.getAttribute('data-topic') === topic; it.hidden = !show;
          if (show) { k++; it.querySelector('[data-faq-n]').textContent = (k < 10 ? '0' : '') + k + '.'; if (!first) first = it; if (it.classList.contains('kw-open')) anyOpen = true; }
        });
        if (!anyOpen && first) { items.forEach(function (o) { if (o.classList.contains('kw-open')) open(o, false); }); open(first, true); }
      });
    });
  });

  /* ---------- menupaneel (slide-over) ---------- */
  var drawer = d.querySelector('[data-drawer]'), opener = d.querySelector('[data-menu-open]'), lastFocus = null;
  function trap(box, e) {
    if (e.key !== 'Tab') return; var f = $$('a[href],button:not([disabled]),input,select,textarea', box).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return; var a = f[0], z = f[f.length - 1];
    if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
  }
  function menu(on) {
    if (!drawer) return; drawer.classList.toggle('kw-open', on); h.classList.toggle('kw-lock', on);
    if (opener) opener.setAttribute('aria-expanded', on);
    if (on) { lastFocus = d.activeElement; setTimeout(function () { var c = drawer.querySelector('[data-menu-close]:not(.kw-dim)'); c && c.focus(); }, 60); } else if (lastFocus) lastFocus.focus();
  }
  if (drawer) {
    opener && opener.addEventListener('click', function () { menu(true); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('[data-menu-close]') || e.target.closest('a[href*="#"]')) menu(false); });
    drawer.addEventListener('keydown', function (e) { trap(drawer.querySelector('.kw-panel'), e); });
    $$('[data-acc]', drawer).forEach(function (a) {
      var b = a.querySelector('[data-acc-btn]'), p = a.querySelector('.kw-acc');
      b.addEventListener('click', function () { var on = !a.classList.contains('kw-open'); a.classList.toggle('kw-open', on); p.classList.toggle('kw-open', on); b.setAttribute('aria-expanded', on); });
    });
  }

  /* ---------- diensten-submenu: klik, Enter/spatie of pijl omlaag opent; klik buiten of Escape sluit ---------- */
  $$('[data-dd]').forEach(function (dd) {
    var a = dd.querySelector('[data-dd-btn]'), p = dd.querySelector('.kw-dd'); if (!a || !p) return;
    a.setAttribute('role', 'button'); a.setAttribute('aria-expanded', 'false');
    function set(on, focus) { dd.classList.toggle('kw-dd-open', on); a.setAttribute('aria-expanded', on); if (on && focus) { var l = p.querySelector('a'); l && l.focus(); } }
    a.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); set(!dd.classList.contains('kw-dd-open')); });
    a.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); set(!dd.classList.contains('kw-dd-open')); } else if (e.key === 'ArrowDown') { e.preventDefault(); set(true, true); } });
    p.addEventListener('keydown', function (e) { var ls = $$('a', p), i = ls.indexOf(d.activeElement); if (e.key === 'ArrowDown') { e.preventDefault(); (ls[i + 1] || ls[0]).focus(); } else if (e.key === 'ArrowUp') { e.preventDefault(); if (i <= 0) a.focus(); else ls[i - 1].focus(); } });
    dd.addEventListener('focusout', function (e) { if (e.relatedTarget && !dd.contains(e.relatedTarget)) set(false); });
    dd.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dd.classList.contains('kw-dd-open')) { e.stopPropagation(); set(false); a.focus(); } });
    d.addEventListener('click', function (e) { if (!dd.contains(e.target)) set(false); });
  });

  /* ---------- klok (Europe/Brussels), zoals in de header van het design ---------- */
  var clocks = $$('[data-clock]');
  if (clocks.length) {
    var loc = { nl: 'nl-BE', fr: 'fr-BE', en: 'en-GB' }[lang] || 'nl-BE';
    var tick = function () {
      try {
        var now = new Date(), t = new Intl.DateTimeFormat(loc, { timeZone: 'Europe/Brussels', hour: '2-digit', minute: '2-digit' }).format(now),
          dt = new Intl.DateTimeFormat(loc, { timeZone: 'Europe/Brussels', day: 'numeric', month: 'short', year: 'numeric' }).format(now);
        clocks.forEach(function (c) { c.textContent = t + ', ' + dt; });
      } catch (e) { }
    };
    tick(); setInterval(tick, 30000);
  }

  /* ---------- voortgangsbalk + hero-cursor (alleen transform/opacity) ---------- */
  var bar = d.querySelector('[data-progress]'), raf = 0;
  function prog() { raf = 0; var max = h.scrollHeight - innerHeight; if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0) + ')'; }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(prog); }, { passive: true }); addEventListener('resize', prog, { passive: true }); prog();
  var hero = d.querySelector('[data-hero]');
  if (hero && fine && !reduced && matchMedia('(min-width:1024px)').matches) {
    var aura = hero.querySelector('[data-aura]'), dot = hero.querySelector('[data-dot]'), par = hero.querySelector('[data-parallax]');
    var tx = 0, ty = 0, ax = 0, ay = 0, dx = 0, dy = 0, nx = 0, ny = 0, px = 0, py = 0, run = false;
    var loop = function () {
      ax += (tx - ax) * 0.16; ay += (ty - ay) * 0.16; dx += (tx - dx) * 0.38; dy += (ty - dy) * 0.38; px += (nx * 12 - px) * 0.1; py += (ny * 8 - py) * 0.1;
      aura.style.transform = 'translate3d(' + ax + 'px,' + ay + 'px,0)'; dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
      if (par) par.style.transform = 'translate3d(' + px + 'px,' + py + 'px,0)';
      if (Math.abs(tx - ax) + Math.abs(ty - ay) + Math.abs(nx * 12 - px) > 0.3) requestAnimationFrame(loop); else run = false;
    };
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; nx = (tx / r.width - 0.5) * 2; ny = (ty / r.height - 0.5) * 2;
      aura.style.opacity = 1; dot.style.opacity = 1; if (!run) { run = true; requestAnimationFrame(loop); }
    }, { passive: true });
    hero.addEventListener('pointerleave', function () { aura.style.opacity = 0; dot.style.opacity = 0; nx = ny = 0; if (!run) { run = true; requestAnimationFrame(loop); } });
  }

  /* ---------- zachte parallax op het heroportret bij scrollen (alleen transform; niets bij "minder beweging") ---------- */
  var por = $$('.kw-portrait img'), praf = 0;
  if (por.length && !reduced) {
    var spar = function () { praf = 0; var y = Math.min(Math.max(scrollY, 0), 700) * 0.06; por.forEach(function (im) { im.style.transform = y ? 'translate3d(0,' + y.toFixed(1) + 'px,0)' : ''; }); };
    addEventListener('scroll', function () { if (!praf && scrollY < 1200) praf = requestAnimationFrame(spar); }, { passive: true });
  }

  /* ---------- tellers: bedragen tellen op zodra ze in beeld komen. De breedte ligt vast (onzichtbare eindwaarde in
     dezelfde rastercel), dus niets verschuift; schermlezers lezen de eindwaarde. Niet bij "minder beweging". ---------- */
  if ('IntersectionObserver' in W && !reduced) $$('[data-count]').forEach(function (el) {
    var txt = el.textContent, m = txt.match(/\d[\d.,]*/); if (!m) return;
    var n = +m[0].replace(/[.,]/g, ''), sep = m[0].indexOf(',') > -1 ? ',' : '.'; if (!(n > 9)) return;
    var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) return;
    var fmt = function (v) { return txt.replace(m[0], String(v).replace(/\B(?=(\d{3})+(?!\d))/g, sep)); };
    var fin = d.createElement('span'), run = d.createElement('span');
    fin.textContent = txt; fin.style.cssText = 'grid-area:1/1;opacity:0'; run.textContent = fmt(0); run.style.gridArea = '1/1'; run.setAttribute('aria-hidden', 'true');
    el.style.display = 'inline-grid'; el.textContent = ''; el.appendChild(fin); el.appendChild(run);
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; o.disconnect(); var t0 = 0;
      var step = function (t) { t0 = t0 || t; var p = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - p, 3); run.textContent = fmt(Math.round(n * e)); if (p < 1) requestAnimationFrame(step); else { el.textContent = txt; el.style.display = ''; } };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    o.observe(el);
  });

  /* ---------- contactvenster (onOpenChat in het design) ---------- */
  var modal = d.querySelector('[data-modal]'), mLast = null;
  function chat(on, subject) {
    if (!modal) return false;
    modal.classList.toggle('kw-open', on); h.classList.toggle('kw-lock', on);
    if (on) {
      mLast = d.activeElement;
      if (subject) { var t = modal.querySelector('textarea[name=bericht]'); if (t && !t.value) t.value = subject; }
      setTimeout(function () { var i = modal.querySelector('input[name=naam]'); i && i.focus(); }, 80);
    } else if (mLast) mLast.focus();
    return true;
  }
  d.addEventListener('click', function (e) {
    var a = e.target.closest('[data-chat]'); if (!a || !modal) return;
    var pk = a.getAttribute('data-pakket');
    e.preventDefault(); chat(true, pk ? T.pk + pk + '. ' : '');
  });
  if (modal) {
    modal.addEventListener('click', function (e) { if (e.target.closest('[data-chat-close]')) chat(false); });
    modal.addEventListener('keydown', function (e) { trap(modal.querySelector('[role=dialog]'), e); });
  }
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (modal && modal.classList.contains('kw-open')) chat(false); else if (drawer && drawer.classList.contains('kw-open')) menu(false);
  });

  /* ---------- zwevende knop: niet over de hero en niet bij het contactformulier ---------- */
  var fl = d.querySelector('[data-floating]'), ct = d.getElementById('contact');
  if (fl) {
    /* Karim 18-11: pas na de hero; weg zodra een CTA, het contactblok of de footer in beeld is;
       op gsm ook weg bij naar beneden scrollen (dan ligt hij niet over de tekst) en terug bij omhoog scrollen */
    var fh = d.querySelector('[data-fl-hide]'), inH = !!fh, ctas = 0, down = false, lastY = scrollY, small = matchMedia('(max-width: 1023px)');
    var upd = function () { fl.classList.toggle('kw-on', !inH && !ctas && !(small.matches && down)); };
    if ('IntersectionObserver' in W) {
      if (fh) new IntersectionObserver(function (es) { inH = es[0].isIntersecting; upd(); }).observe(fh);
      var seen = new Set(), io2 = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) seen.add(x.target); else seen.delete(x.target); }); ctas = seen.size; upd(); }, { threshold: 0.05 });
      $$('#contact, footer, section[aria-labelledby^="cta"], .ct6, [data-sel-auto] a[data-chat]').forEach(function (el) { io2.observe(el); });
      if (ct && !ct.matches('section[aria-labelledby^="cta"]')) io2.observe(ct);
    } else inH = false;
    addEventListener('scroll', function () { var y = scrollY; if (Math.abs(y - lastY) > 12) { down = y > lastY && y > 200; lastY = y; upd(); } }, { passive: true });
    upd();
  }

  /* ---------- formulieren (contact op de home + contactvenster): web3forms, terugval mailto ---------- */
  $$('form[data-kw-form]').forEach(function (f) {
    var err = f.querySelector('[data-err]'), btn = f.querySelector('button[type=submit]'), bl = btn && btn.querySelector('[data-label]'), lbl = bl ? bl.textContent : '';
    var okv = function (el) { var v = (el.value || '').trim(); if (!v) return false; if (el.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); return true; };
    var show = function (t) { if (!err) return; err.textContent = t || ''; err.hidden = !t; };
    var chk = function () {
      var bad = null, msg = '';
      [['naam', T.name], ['email', T.email], ['bericht', T.msg]].forEach(function (x) {
        var el = f.elements[x[0]]; if (!el) return; var e = !okv(el); el.setAttribute('aria-invalid', e ? 'true' : 'false'); if (e && !bad) { bad = el; msg = x[1]; }
      });
      show(msg); return bad;
    };
    ['naam', 'email', 'bericht'].forEach(function (n) { var el = f.elements[n]; el && el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true' && okv(el)) { el.setAttribute('aria-invalid', 'false'); chk(); } }); });
    var reset = function () { btn.disabled = false; btn.style.opacity = ''; if (bl) bl.textContent = lbl; };
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var bad = chk(); if (bad) { bad.focus(); return; }
      var data = {}; ['naam', 'zaak', 'email', 'dienst', 'bericht', 'website'].forEach(function (n) { data[n] = f.elements[n] ? (f.elements[n].value || '').trim() : ''; });
      data.pagina = location.pathname;
      btn.disabled = true; btn.style.opacity = '.7'; if (bl) bl.textContent = T.busy;
      var done = function () { location.href = pre === '/fr' ? '/fr/merci/' : pre + '/bedankt/'; };
      var fail = function () { reset(); if (err) { err.textContent = T.fail; var a = d.createElement('a'); a.href = 'mailto:' + E; a.textContent = E; a.style.textDecoration = 'underline'; err.appendChild(a); err.appendChild(d.createTextNode('.')); err.hidden = false; } };
      if (data.website || (f.elements.botcheck && f.elements.botcheck.checked)) { setTimeout(done, 500); return; }
      var K = f.elements.access_key ? (f.elements.access_key.value || '').trim() : '';
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(K)) {
        var b = 'Naam: ' + data.naam + '\nZaak: ' + (data.zaak || '-') + '\nE-mailadres: ' + data.email + '\nDienst: ' + data.dienst + '\n\n' + data.bericht;
        reset(); location.href = 'mailto:' + E + '?subject=' + encodeURIComponent(T.subj + data.dienst) + '&body=' + encodeURIComponent(b); return;
      }
      var body = { access_key: K, subject: f.elements.subject ? f.elements.subject.value : 'Nieuwe aanvraag via kempenwebstudio.be', from_name: f.elements.from_name ? f.elements.from_name.value : 'Webstudio K website', botcheck: false };
      for (var k in data) body[k] = data[k];
      fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
        .then(function (r) { return r.json().then(function (j) { return r.ok && j && j.success ? j : Promise.reject(); }); }).then(done).catch(fail);
    });
  });
  /* pakketknoppen die naar het formulier op de home springen, vullen het bericht in */
  $$('[data-pakket]').forEach(function (a) {
    a.addEventListener('click', function () { var t = d.querySelector('#cform textarea[name=bericht]'); if (t && !t.value) t.value = T.pk + a.getAttribute('data-pakket') + '. '; });
  });

  /* ---------- cookiekeuze: 6 maanden onthouden; statistiek (Cloudflare Web Analytics) pas na toestemming ---------- */
  function stats() {
    if (W.kwStatsOn) return; W.kwStatsOn = 1;
    var q = location.search.indexOf('intern=1') > -1; if (q) try { localStorage.setItem('kw_intern', '1'); } catch (e) { }
    var i = false; try { i = localStorage.getItem('kw_intern') === '1'; } catch (e) { }
    if (navigator.webdriver || q || i) return;
    var s = d.createElement('script'); s.defer = true; s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', '{"token":"fa38320ac1734434bdabcd2bed6cb913"}'); d.head.appendChild(s);
  }
  var ck = d.getElementById('ck');
  if (ck) {
    var K = 'kw_consent', MAX = 183 * 864e5, cset = d.getElementById('ck-set'), bs = ck.querySelector('[data-ck=set]'), sS = d.getElementById('ck-s'), sM = d.getElementById('ck-m');
    var get = function () { try { var v = JSON.parse(localStorage.getItem(K) || 'null'); if (v && v.v === 1 && Date.now() - v.t < MAX) return v; } catch (e) { } return null; };
    var use = function (v) { if (v && v.s && sS) stats(); };
    var showSet = function (on) { if (cset) cset.hidden = !on; if (bs) { bs.hidden = on; bs.setAttribute('aria-expanded', on ? 'true' : 'false'); } };
    var openCk = function (full) { var c = get(); if (sS) sS.checked = !!(c && c.s); if (sM) sM.checked = !!(c && c.m); showSet(!!full); ck.hidden = false; };
    var save = function (s, m) { var v = { v: 1, t: Date.now(), s: !!(s && sS), m: !!m }; try { localStorage.setItem(K, JSON.stringify(v)); } catch (e) { } ck.hidden = true; use(v); };
    ck.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ck]'); if (!b) return; var a = b.getAttribute('data-ck');
      if (a === 'all') save(1, 1); else if (a === 'none') save(0, 0); else if (a === 'save') save(sS && sS.checked, sM && sM.checked); else if (a === 'set') { showSet(true); (sS || sM).focus(); }
    });
    d.addEventListener('click', function (e) { var o = e.target.closest('.ck-open'); if (!o) return; e.preventDefault(); openCk(true); var fi = ck.querySelector('input:not([disabled])'); fi && fi.focus(); });
    var c = get(); if (c) use(c); else openCk(false);
  }
})();
