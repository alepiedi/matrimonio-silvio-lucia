/* ==========================================================================
   L'ULTIMA RIPETIZIONE · logica
   Legge window.FILM (config.js) e riempie la pagina.
   ========================================================================== */
(function () {
  'use strict';

  var F = window.FILM || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function num(n) { return Number(n).toLocaleString('it-IT'); }

  /* ---------- testi semplici ---------- */
  $$('[data-bind]').forEach(function (el) {
    var v = F[el.getAttribute('data-bind')];
    if (v) el.textContent = el.closest('.script') ? String(v).toUpperCase() : v;
  });
  // nella sceneggiatura il soprannome resta minuscolo
  $$('.script [data-bind="soprannome"]').forEach(function (el) { el.textContent = F.soprannome || el.textContent; });

  if ($('#briefPers') && F.persone) $('#briefPers').textContent = F.persone;
  if ($('#briefDur') && F.durata) $('#briefDur').textContent = F.durata;
  if ($('#briefWhen') && F.riprese) $('#briefWhen').textContent = F.riprese;

  /* ---------- icone della crew ---------- */
  var ICONS = {
    kettlebell: '<path d="M16 18a8 8 0 0 1 16 0" /><path d="M13 18h22l-2 4a14 14 0 1 1-18 0z" /><path d="M20 32h8" />',
    compasso: '<circle cx="24" cy="9" r="3" /><path d="M22.5 11.5 12 40M25.5 11.5 36 40M15 30h18" />',
    registro: '<rect x="9" y="7" width="30" height="34" rx="3" /><path d="M15 16h18M15 23h18M15 30h10" /><path d="M31 30h2" />',
    grafico: '<path d="M8 40h32M8 40V8" /><path d="M13 33l8-9 6 5 11-14" /><path d="M32 15h6v6" />',
    formaggio: '<path d="M7 34 24 12l17 8v14z" /><path d="M7 34h34M24 12l17 8" /><circle cx="18" cy="28" r="2" /><circle cx="30" cy="27" r="2.4" />',
    ciak: '<rect x="8" y="18" width="32" height="22" rx="2" /><path d="M8 18 38 9l2 6M16 15.5l4 5M26 12.5l4 5" />',
  };
  function icon(name) {
    return '<svg class="card__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.ciak) + '</svg>';
  }

  /* ---------- cast ---------- */
  var castGrid = $('#castGrid');
  if (castGrid && F.crew) {
    castGrid.innerHTML = F.crew.map(function (p, i) {
      var who = [p.nome, p.mestiere].filter(Boolean).join(' · ');
      return '<li class="card reveal' + (i === 0 ? ' card--lead' : '') + '">' +
        icon(p.icona) +
        '<h3 class="card__role">' + esc(p.ruolo) + '</h3>' +
        '<p class="card__who">' + esc(who) + '</p>' +
        '<p class="card__promise">' + esc(p.garanzia) + '</p></li>';
    }).join('');
  }

  /* ---------- numeri del pubblico (solo quelli compilati) ---------- */
  var P = F.pubblico || {};
  var statDefs = [
    ['followerCrew', 'follower della crew'],
    ['followerPalestra', 'follower della palestra'],
    ['iscrittiPalestra', 'iscritti in palestra'],
    ['invitatiMatrimonio', F.primaAlMatrimonio ? 'invitati alla prima visione' : null],
  ];
  var stats = statDefs.filter(function (d) { return d[1] && typeof P[d[0]] === 'number' && P[d[0]] > 0; });
  if (stats.length && $('#stats')) {
    $('#stats').innerHTML = stats.map(function (d) {
      return '<li class="reveal"><b data-count="' + P[d[0]] + '">0</b><span>' + d[1] + '</span></li>';
    }).join('');
    $('#stats').hidden = false;
  }
  if (F.primaAlMatrimonio && $('#audWedding')) {
    $('#audWedding').hidden = false;
    if (P.invitatiMatrimonio) $('#audWeddingN').textContent = ', davanti a circa ' + num(P.invitatiMatrimonio) + ' invitati';
  }

  /* ---------- set ---------- */
  if ($('#sets') && F.set) {
    $('#sets').innerHTML = F.set.map(function (s, i) {
      return '<li class="reveal" data-n="Set ' + (i + 1) + '"><h3>' + esc(s.tipo) + '</h3><p>' + esc(s.idea) + '</p></li>';
    }).join('');
  }

  /* ---------- pacchetti ---------- */
  var packs = F.pacchetti || [];
  if ($('#packs')) {
    $('#packs').innerHTML = packs.map(function (p) {
      var badge = p.posti == null ? 'Posti illimitati' : p.posti === 1 ? 'Un solo posto' : p.posti + ' posti';
      return '<li class="pack reveal' + (p.evidenza ? ' pack--star' : '') + '">' +
        '<span class="pack__badge">' + badge + '</span>' +
        '<h3 class="pack__name">' + esc(p.nome) + '</h3>' +
        '<p class="pack__value">' + esc(p.valore) + '</p>' +
        '<p class="pack__note">' + esc(p.nota || '') + '</p>' +
        '<ul>' + p.include.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<a class="btn ' + (p.evidenza ? 'btn--hot' : 'btn--ghost') + '" href="#contatti" data-pack="' + esc(p.id) + '">Voglio questo ruolo</a>' +
        '</li>';
    }).join('');
  }
  var sel = $('#packSelect');
  if (sel) {
    sel.innerHTML = packs.map(function (p) {
      return '<option value="' + esc(p.id) + '">' + esc(p.nome) + '</option>';
    }).join('') + '<option value="altro">Non lo so ancora, proponete voi</option>';
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-pack]');
    if (a && sel) sel.value = a.getAttribute('data-pack');
  });

  /* ---------- consegne e calendario ---------- */
  if ($('#deliver') && F.consegne) {
    $('#deliver').innerHTML = F.consegne.map(function (c) {
      return '<li class="reveal"><b>' + esc(c.n) + '</b><strong>' + esc(c.cosa) + '</strong><span>' + esc(c.dettaglio) + '</span></li>';
    }).join('');
  }
  if ($('#timeline') && F.calendario) {
    $('#timeline').innerHTML = F.calendario.map(function (c) {
      return '<li class="reveal"><time>' + esc(c.quando) + '</time><strong>' + esc(c.cosa) + '</strong><span>' + esc(c.dettaglio) + '</span></li>';
    }).join('');
  }

  /* ---------- conto alla rovescia del casting ---------- */
  var end = F.chiusuraCasting ? new Date(F.chiusuraCasting) : null;
  if (end && !isNaN(end) && $('#casting')) {
    var days = Math.ceil((end - Date.now()) / 864e5);
    if (days > 0) {
      $('#castingLeft').textContent = days === 1 ? '1 giorno' : days + ' giorni';
      $('#casting').hidden = false;
    }
  }

  /* ---------- ciak ---------- */
  var clapper = $('#clapper');
  var ciak = 1;
  function snap() {
    if (!clapper) return;
    clapper.classList.add('is-snap');
    setTimeout(function () { clapper.classList.remove('is-snap'); }, reduced ? 0 : 220);
  }
  if (clapper) {
    clapper.addEventListener('click', function () {
      ciak += 1;
      $('#ciakN').textContent = ciak;
      snap();
      if (navigator.vibrate) navigator.vibrate(18);
    });
    if (!reduced) setTimeout(snap, 700);
  }

  /* ---------- contatti diretti ---------- */
  var C = F.contatti || {};
  var direct = [];
  if (C.email) direct.push('<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>');
  if (C.whatsapp) direct.push('<a href="https://wa.me/' + esc(C.whatsapp) + '" target="_blank" rel="noopener">WhatsApp</a>');
  if (C.instagram) direct.push('<a href="https://instagram.com/' + esc(C.instagram) + '" target="_blank" rel="noopener">@' + esc(C.instagram) + '</a>');
  if (direct.length && $('#direct')) $('#direct').innerHTML = 'Oppure direttamente: ' + direct.join(' · ');

  /* ---------- modulo "provino" ---------- */
  var form = $('#form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var out = $('#formOut');
      var ok = true;
      $$('[required]', form).forEach(function (el) {
        var bad = !el.value.trim();
        el.setAttribute('aria-invalid', bad ? 'true' : 'false');
        if (bad && ok) { el.focus(); ok = false; }
      });
      if (!ok) { out.textContent = 'Mancano ancora un paio di battute: compilate i campi evidenziati.'; return; }

      var d = new FormData(form);
      var pack = packs.filter(function (p) { return p.id === d.get('pacchetto'); })[0];
      var subject = 'Provino · ' + (F.titolo || 'Addio al celibato') + ' · ' + d.get('azienda');
      var body = [
        'Azienda: ' + d.get('azienda'),
        'Referente: ' + d.get('nome'),
        'Recapito: ' + d.get('recapito'),
        'Ruolo: ' + (pack ? pack.nome : 'da definire'),
        '',
        d.get('messaggio') || '(nessuna nota)',
      ].join('\n');

      if (C.email) {
        location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        out.textContent = 'Si è aperta la vostra app di posta con il messaggio pronto: basta premere Invia.';
      } else if (C.whatsapp) {
        window.open('https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(subject + '\n\n' + body), '_blank', 'noopener');
        out.textContent = 'Si è aperto WhatsApp con il messaggio pronto: basta premere Invia.';
      } else {
        out.innerHTML = 'Copiate questo messaggio e mandatecelo dove preferite:<pre>' + esc(subject + '\n\n' + body) + '</pre>';
      }
    });
  }

  /* ---------- comparsa allo scroll + contatori ---------- */
  function countUp(el) {
    var target = Number(el.getAttribute('data-count'));
    if (reduced) { el.textContent = num(target); return; }
    var t0 = null;
    (function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / 1200);
      el.textContent = num(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var items = $$('.reveal, [data-count]');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        if (en.target.hasAttribute('data-count')) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) {
      el.classList.add('is-in');
      if (el.hasAttribute('data-count')) countUp(el);
    });
  }
})();
