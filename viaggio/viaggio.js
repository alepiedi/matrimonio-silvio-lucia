/* ==========================================================================
   Il viaggio di nozze — mappa del Giappone, filo rosso e carta d'imbarco
   ========================================================================== */
(() => {
  'use strict';

  const V = window.VIAGGIO;
  const $ = (s, el = document) => el.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stessa proiezione (Mercatore) usata per disegnare la mappa: lat/lon → coordinate del disegno 1000×1150
  const MAP = { w: 1000, h: 1150, k: 3235.5263725034697, tx: -7275.999999999992, ty: 2956.636983547075 };
  const project = (lat, lon) => {
    const rad = Math.PI / 180;
    return [MAP.tx + MAP.k * lon * rad, MAP.ty - MAP.k * Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2))];
  };
  const START = [34, 1100]; // il filo arriva "dall'Italia", in basso a sinistra

  const pinsEl = $('#pins');
  const route = $('#route');
  const list = $('#stopsList');
  let last = START;
  let activeId = null;

  $('#start').setAttribute('transform', `translate(${START[0]} ${START[1]})`);

  const fmtIban = (s) => s.replace(/\s+/g, '').toUpperCase().replace(/(.{4})/g, '$1 ').trim();
  const iban = fmtIban(V.iban || '');
  const causaleFor = (t) => `Viaggio di nozze ${V.sposi} – ${t.nome}`;

  // ---------- tappe: sulla mappa e nell'elenco ----------
  const marks = $('#marks');
  V.tappe.forEach((t, i) => {
    const [x, y] = project(t.lat, t.lon);
    t.xy = [x, y];
    const [mx, my] = t.pos || [x, y];

    // punto vero sulla mappa + linea verso il cerchio numerato (se è stato spostato)
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'mark');
    g.dataset.id = t.id;
    if (Math.hypot(mx - x, my - y) > 6) {
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', x); ln.setAttribute('y1', y); ln.setAttribute('x2', mx); ln.setAttribute('y2', my);
      g.appendChild(ln);
    }
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', x); dot.setAttribute('cy', y); dot.setAttribute('r', 6);
    g.appendChild(dot);
    marks.appendChild(g);

    const pin = document.createElement('button');
    pin.type = 'button';
    pin.className = `pin pin--${t.etichetta || 'e'}`;
    pin.style.left = `${(mx / MAP.w) * 100}%`;
    pin.style.top = `${(my / MAP.h) * 100}%`;
    pin.dataset.id = t.id;
    pin.setAttribute('aria-label', `${i + 1}. ${t.nome}: scegli questa tappa`);
    pin.innerHTML = `<span class="pin__dot">${i + 1}</span><span class="pin__label" aria-hidden="true">${t.nome}<b lang="ja">${t.kanji}</b></span>`;
    pin.addEventListener('click', () => select(t.id));
    pinsEl.appendChild(pin);

    const li = document.createElement('li');
    li.innerHTML = `<button class="stop" type="button" data-id="${t.id}"><span class="stop__n">${i + 1}</span>${t.nome} <b lang="ja">${t.kanji}</b></button>`;
    li.firstChild.addEventListener('click', () => select(t.id, true));
    list.appendChild(li);
  });

  // ---------- il filo rosso vola da una tappa all'altra ----------
  const drawThread = (from, to) => {
    route.querySelectorAll('.route-seg:not(.is-old)').forEach((s) => s.classList.add('is-old'));
    const [x1, y1] = from, [x2, y2] = to;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dist = Math.hypot(x2 - x1, y2 - y1);
    // arco verso l'alto, come una rotta aerea
    const cx = mx + (y1 - y2) * 0.18, cy = my - dist * 0.32;
    const seg = document.createElementNS(NS, 'path');
    seg.setAttribute('class', 'route-seg');
    seg.setAttribute('d', `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`);
    route.appendChild(seg);
    const len = seg.getTotalLength();
    seg.style.strokeDasharray = `${len} ${len}`;
    seg.style.strokeDashoffset = reduced ? 0 : len;
    if (!reduced) requestAnimationFrame(() => requestAnimationFrame(() => (seg.style.strokeDashoffset = 0)));
  };

  // ---------- scelta di una tappa ----------
  function select(id, fromList) {
    const t = V.tappe.find((x) => x.id === id);
    if (!t || id === activeId) return;
    drawThread(last, t.xy);
    last = t.xy;
    activeId = id;

    document.querySelectorAll('.pin, .stop, .mark').forEach((el) => {
      const on = el.dataset.id === id;
      el.classList.toggle('is-active', on);
      if (on && el.classList.contains('pin')) el.classList.add('is-visited');
    });

    $('#passTo').textContent = t.nome;
    $('#passKanji').textContent = t.kanji;
    $('#passText').textContent = t.testo;
    $('#passNames').textContent = V.sposi;
    $('#passGift').textContent = t.esperienza;
    $('#passIban').textContent = iban;
    $('#passHolder').textContent = V.intestatario;
    $('#passBank').textContent = V.banca || '';
    $('#passReason').textContent = causaleFor(t);

    const pass = $('#pass');
    $('#passEmpty').hidden = true;
    pass.hidden = false;
    pass.style.animation = 'none'; void pass.offsetWidth; pass.style.animation = ''; // riparte l'animazione d'ingresso
    history.replaceState(null, '', `#${id}`);

    // sul telefono la carta è sotto la mappa: ci si arriva da soli, dopo che il filo ha "volato"
    const r = pass.getBoundingClientRect();
    if (fromList || r.top > innerHeight * 0.75 || r.bottom < 0) {
      setTimeout(() => pass.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }), fromList ? 0 : 650);
    }
  }

  // ---------- copia IBAN e causale ----------
  const toast = $('#toast');
  let toastTimer = 0;
  const say = (msg) => {
    toast.textContent = msg; toast.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => (toast.hidden = true), 2200);
  };
  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* si prova il metodo vecchio */ }
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
    ta.remove();
    return ok;
  };
  document.querySelectorAll('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
    const what = btn.dataset.copy;
    const t = V.tappe.find((x) => x.id === activeId);
    const text = what === 'iban' ? iban.replace(/\s/g, '') : causaleFor(t);
    const ok = await copyText(text);
    say(ok ? (what === 'iban' ? 'IBAN copiato' : 'Causale copiata') : 'Tieni premuto sul testo per copiarlo');
    if (ok) { btn.classList.add('is-done'); setTimeout(() => btn.classList.remove('is-done'), 1600); }
  }));

  // un link con #kyoto apre direttamente quella tappa
  const fromHash = decodeURIComponent(location.hash.slice(1));
  if (V.tappe.some((t) => t.id === fromHash)) select(fromHash);
})();
