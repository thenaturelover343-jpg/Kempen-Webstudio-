/* Kempen Webstudio – het enige script van de site (defer). Alleen voor de interactieve delen:
   menu, diensten-submenu, mobiel menu, header-status, verschijnen bij scrollen, contactformulier,
   pakketkeuze, cookiekeuze (statistiek pas na toestemming) en de zwevende contactknop.
   Logica overgenomen van de vorige site; teksten per taal (zoals vertaal.mjs ze zette). */
(function () {
  var d = document, h = d.documentElement, lang = (h.lang || 'nl').slice(0, 2);
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T;
  T = {
    nl: { open: 'Menu openen', close: 'Menu sluiten', name: 'Vul uw naam in.', email: 'Vul een geldig e-mailadres in.', msg: 'Vertel kort waarmee wij kunnen helpen.',
      busy: 'Bezig met versturen', send: 'Verstuur mijn aanvraag', fail: 'Versturen lukte niet. Probeer opnieuw of mail naar ', subj: 'Aanvraag via de website: ', pk: 'Ik heb interesse in het pakket ' },
    fr: { open: 'Ouvrir le menu', close: 'Fermer le menu', name: 'Veuillez saisir votre nom.', email: 'Veuillez saisir une adresse e-mail valide.', msg: 'Dites-nous brièvement comment nous pouvons vous aider.',
      busy: 'Envoi en cours', send: 'Envoyer ma demande', fail: 'L’envoi a échoué. Réessayez ou écrivez à ', subj: 'Demande via le site : ', pk: 'Je suis intéressé par la formule ' },
    en: { open: 'Open menu', close: 'Close menu', name: 'Please enter your name.', email: 'Please enter a valid email address.', msg: 'Tell us briefly how we can help.',
      busy: 'Sending', send: 'Send my request', fail: 'Sending failed. Please try again or email ', subj: 'Request via the website: ', pk: 'I am interested in the package ' }
  };
  T = T[lang] || T.nl;
  var E = 'info@kempenwebstudio.be', pre = lang === 'nl' ? '' : '/' + lang;
  h.classList.add('js');

  /* ---- mobiel menu ---- */
  var burger = d.querySelector('.burger'), mnav = d.getElementById('mnav');
  function setNav(o) {
    if (!mnav || !burger) return;
    mnav.classList.toggle('open', o); h.classList.toggle('nav-open', o);
    burger.setAttribute('aria-expanded', String(o)); burger.setAttribute('aria-label', o ? T.close : T.open);
    if (o) { var f = mnav.querySelector('a,button'); if (f) setTimeout(function () { f.focus(); }, 50); } else if (mnav.contains(d.activeElement)) burger.focus();
  }
  if (burger) burger.addEventListener('click', function () { setNav(!mnav.classList.contains('open')); });
  if (mnav) {
    mnav.addEventListener('click', function (e) { if (e.target === mnav || e.target.closest('.mnav-x') || e.target.closest('a[href*="#"]')) setNav(false); });
    mnav.addEventListener('keydown', function (e) { // focus binnen het paneel houden
      if (e.key !== 'Tab') return; var f = [].filter.call(mnav.querySelectorAll('a,button'), function (x) { return x.offsetParent; });
      if (!f.length) return; var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
    });
  }
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mnav && mnav.classList.contains('open')) setNav(false); });

  /* ---- diensten-submenu: klik, Enter, spatie of pijl omlaag opent; klik buiten of Escape sluit ---- */
  [].forEach.call(d.querySelectorAll('.nav-dd'), function (dd) {
    var a = dd.querySelector('.nav-dd-a'), p = dd.querySelector('.nav-dd-p'); if (!a || !p) return;
    a.setAttribute('role', 'button'); a.setAttribute('aria-expanded', 'false'); a.setAttribute('aria-controls', p.id);
    function set(o, f) { dd.classList.toggle('open', o); a.setAttribute('aria-expanded', String(o)); if (o && f) { var l = p.querySelector('a'); if (l) l.focus(); } }
    a.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); set(!dd.classList.contains('open')); });
    a.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); set(!dd.classList.contains('open')); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); set(true, true); }
    });
    p.addEventListener('keydown', function (e) {
      var ls = [].slice.call(p.querySelectorAll('a')), i = ls.indexOf(d.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); (ls[i + 1] || ls[0]).focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (i <= 0) a.focus(); else ls[i - 1].focus(); }
    });
    dd.addEventListener('focusout', function (e) { if (e.relatedTarget && !dd.contains(e.relatedTarget)) set(false); });
    dd.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dd.classList.contains('open')) { e.stopPropagation(); set(false); a.focus(); } });
    d.addEventListener('click', function (e) { if (!dd.contains(e.target)) set(false); });
    p.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  });
  [].forEach.call(d.querySelectorAll('.m-acc'), function (li) {
    var b = li.querySelector('.m-acc-b'); if (!b) return;
    b.addEventListener('click', function (e) { e.stopPropagation(); var o = !li.classList.contains('open'); li.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o)); });
  });

  /* ---- header: achtergrond zodra er gescrold is ---- */
  var hdr = d.querySelector('.hdr'), tick = false;
  function sc() { tick = false; if (hdr) hdr.classList.toggle('is-s', scrollY > 8); }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(sc); } }, { passive: true }); sc();

  /* ---- verschijnen bij scrollen: alleen elementen die nog onder de vouw staan ---- */
  var rv = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    [].forEach.call(rv, function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); else io.observe(el); });
  } else [].forEach.call(rv, function (el) { el.classList.add('in'); });
  h.classList.add('rv-ok');

  /* ---- zwevende contactknop: niet over de hero en niet bij het contactformulier ---- */
  var mbar = d.querySelector('.mbar'), ct = d.getElementById('contact');
  if (mbar && 'IntersectionObserver' in window) {
    var hero = d.querySelector('.hero'), inC = false, inH = true;
    var mb = function () { mbar.classList.toggle('hide', inC || inH); }; mb();
    if (ct) new IntersectionObserver(function (es) { inC = es[0].isIntersecting; mb(); }, { threshold: 0.05 }).observe(ct);
    if (hero) new IntersectionObserver(function (es) { inH = es[0].isIntersecting; mb(); }, { threshold: 0.2 }).observe(hero); else { inH = false; mb(); }
  }

  /* ---- contactformulier (web3forms; zonder geldige sleutel: mail openen) ---- */
  var f = d.getElementById('cform');
  if (f) {
    var msg = f.querySelector('.fmsg'), btn = f.querySelector('button[type=submit]'), bl = btn && btn.querySelector('.bl');
    var err = function (el, t) { var s = el.parentNode.querySelector('.ferr'); el.setAttribute('aria-invalid', t ? 'true' : 'false'); if (s) s.textContent = t || ''; };
    var okv = function (el) { var v = (el.value || '').trim(); if (!v) return false; if (el.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); return true; };
    var chk = function () {
      var bad = null, F = f.elements;
      [['naam', T.name], ['email', T.email], ['bericht', T.msg]].forEach(function (x) {
        var el = F[x[0]]; if (!el) return; var e = !okv(el); err(el, e ? x[1] : ''); if (e && !bad) bad = el;
      });
      return bad;
    };
    ['naam', 'email', 'bericht'].forEach(function (n) { var el = f.elements[n]; if (el) el.addEventListener('blur', function () { if (this.getAttribute('aria-invalid') === 'true') chk(); }); });
    [].forEach.call(f.querySelectorAll('input:not([type=hidden]):not([name=website]):not([type=checkbox]),textarea'), function (el) {
      var u = function () { el.classList.toggle('kw-ok', okv(el) && el.getAttribute('aria-invalid') !== 'true'); };
      el.addEventListener('blur', u);
      el.addEventListener('input', function () {
        if (el.getAttribute('aria-invalid') === 'true' && okv(el)) { el.setAttribute('aria-invalid', 'false'); var s = el.parentNode.querySelector('.ferr'); if (s) s.textContent = ''; }
        if (el.classList.contains('kw-ok') || el.getAttribute('aria-invalid') === 'false') u();
      });
    });
    var reset = function () { btn.disabled = false; btn.classList.remove('busy'); if (bl) bl.textContent = T.send; };
    f.addEventListener('submit', function (e) {
      e.preventDefault(); if (msg) msg.hidden = true;
      var bad = chk(); if (bad) { bad.focus(); return; }
      var data = {}; ['naam', 'zaak', 'email', 'dienst', 'bericht', 'website'].forEach(function (n) { data[n] = f.elements[n] ? (f.elements[n].value || '').trim() : ''; });
      data.pagina = location.pathname;
      btn.disabled = true; btn.classList.add('busy'); if (bl) bl.textContent = T.busy;
      var done = function () { location.href = pre + '/bedankt/'; };
      var fail = function () { reset(); if (msg) { msg.innerHTML = ''; msg.appendChild(d.createTextNode(T.fail)); var a = d.createElement('a'); a.href = 'mailto:' + E; a.textContent = E; msg.appendChild(a); msg.appendChild(d.createTextNode('.')); msg.hidden = false; } };
      var mail = function () {
        var b = 'Naam: ' + data.naam + '\nZaak: ' + (data.zaak || '-') + '\nE-mailadres: ' + data.email + '\nDienst: ' + data.dienst + '\n\n' + data.bericht;
        reset(); location.href = 'mailto:' + E + '?subject=' + encodeURIComponent(T.subj + data.dienst) + '&body=' + encodeURIComponent(b);
      };
      if (data.website || (f.elements.botcheck && f.elements.botcheck.checked)) { setTimeout(done, 500); return; }
      var K = f.elements.access_key ? (f.elements.access_key.value || '').trim() : '';
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(K)) { mail(); return; }
      var body = { access_key: K, subject: f.elements.subject ? f.elements.subject.value : 'Nieuwe aanvraag via kempenwebstudio.be', from_name: f.elements.from_name ? f.elements.from_name.value : 'Kempen Webstudio website', botcheck: false };
      for (var k in data) body[k] = data[k];
      fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
        .then(function (r) { return r.json().then(function (j) { return r.ok && j && j.success ? j : Promise.reject(); }); }).then(done).catch(fail);
    });
  }
  /* pakketknoppen vullen het bericht in */
  [].forEach.call(d.querySelectorAll('[data-pakket]'), function (a) {
    a.addEventListener('click', function () {
      var t = d.querySelector('#cform textarea[name=bericht]'), s = d.querySelector('#cform select[name=dienst]');
      if (s) s.selectedIndex = 0; if (t && !t.value) t.value = T.pk + a.getAttribute('data-pakket') + '. ';
    });
  });

  /* ---- cookiekeuze: 6 maanden onthouden; statistiek (Cloudflare Web Analytics) pas na toestemming ---- */
  function stats() {
    if (window.kwStatsOn) return; window.kwStatsOn = 1;
    var q = location.search.indexOf('intern=1') > -1; if (q) try { localStorage.setItem('kw_intern', '1'); } catch (e) {}
    var i = false; try { i = localStorage.getItem('kw_intern') === '1'; } catch (e) {}
    if (navigator.webdriver || q || i) return;
    var s = d.createElement('script'); s.defer = true; s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', '{"token":"fa38320ac1734434bdabcd2bed6cb913"}'); d.head.appendChild(s);
  }
  var ck = d.getElementById('ck');
  if (ck) {
    var K = 'kw_consent', MAX = 183 * 864e5, set = d.getElementById('ck-set'), bs = ck.querySelector('[data-ck=set]'), sS = d.getElementById('ck-s'), sM = d.getElementById('ck-m');
    var get = function () { try { var v = JSON.parse(localStorage.getItem(K) || 'null'); if (v && v.v === 1 && Date.now() - v.t < MAX) return v; } catch (e) {} return null; };
    var use = function (v) { if (v && v.s && sS) stats(); };
    var showSet = function (on) { if (set) set.hidden = !on; if (bs) { bs.hidden = on; bs.setAttribute('aria-expanded', on ? 'true' : 'false'); } };
    var open = function (full) { var c = get(); if (sS) sS.checked = !!(c && c.s); if (sM) sM.checked = !!(c && c.m); showSet(!!full); ck.hidden = false; h.classList.add('ck-on'); };
    var save = function (s, m) { var v = { v: 1, t: Date.now(), s: !!(s && sS), m: !!m }; try { localStorage.setItem(K, JSON.stringify(v)); } catch (e) {} ck.hidden = true; h.classList.remove('ck-on'); use(v); };
    ck.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ck]'); if (!b) return; var a = b.getAttribute('data-ck');
      if (a === 'all') save(1, 1); else if (a === 'none') save(0, 0); else if (a === 'save') save(sS && sS.checked, sM && sM.checked);
      else if (a === 'set') { showSet(true); (sS || sM).focus(); }
    });
    d.addEventListener('click', function (e) { var o = e.target.closest('.ck-open'); if (!o) return; e.preventDefault(); open(true); var fi = ck.querySelector('input:not([disabled])'); if (fi) fi.focus(); });
    var c = get(); if (c) use(c); else open(false);
  }
})();
