/* ==========================================================================
   Silvio & Lucia — "Il filo rosso"
   ========================================================================== */
(() => {
  'use strict';

  const W = window.WEDDING;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TZ = 'Europe/Rome';

  const weddingDate = new Date(W.data);
  const fmt = (opts) => new Intl.DateTimeFormat('it-IT', { timeZone: TZ, ...opts }).format(weddingDate);

  /* ------------------------------------------------------------------
     Dati dalla configurazione
     ------------------------------------------------------------------ */
  function bindConfig() {
    const pad = (n) => String(n).padStart(2, '0');
    const giorno = fmt({ day: 'numeric' });
    const meseNum = pad(fmt({ month: 'numeric' }));
    const anno = fmt({ year: 'numeric' });
    const entro = new Date(W.rsvp.entro + 'T12:00:00');

    const values = {
      lui: W.lui,
      lei: W.lei,
      anno,
      giorno,
      settimana: fmt({ weekday: 'long' }),
      mese: fmt({ month: 'long' }),
      dataLunga: fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      dataPunti: `${pad(giorno)} · ${meseNum} · ${anno}`,
      timbro: `${giorno} ${fmt({ month: 'short' }).replace('.', '').toUpperCase()} ${anno}`,
      ora: fmt({ hour: '2-digit', minute: '2-digit' }),
      serial: `${pad(giorno)}${meseNum}${anno.slice(2)}`,
      saluti: W.luogo.saluti,
      luogoNome: W.luogo.nome,
      indirizzo: W.luogo.indirizzo,
      entro: new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }).format(entro),
    };

    $$('[data-bind]').forEach((el) => {
      const v = values[el.dataset.bind];
      if (v != null) el.textContent = v;
    });
    $$('[data-bind-href="maps"]').forEach((a) => (a.href = W.luogo.maps));

    document.title = `${W.lui} & ${W.lei} · Save the Date`;
    $$('.seal__half').forEach((h) => (h.dataset.mono = `${W.lui[0]}${W.lei[0]}`));
    // assegnato direttamente (una variabile CSS risolverebbe il percorso rispetto al file CSS)
    if (W.luogo.foto) $('.pc-city').style.backgroundImage = `url("${new URL(W.luogo.foto, location.href).href}")`;

    // parola più lunga → riduco un po' il font della cartolina
    const len = W.luogo.saluti.length;
    if (len > 8) $('.pc-city').style.fontSize = `min(${(88 / len).toFixed(1)}vw, ${(62 / len).toFixed(2)}rem)`;
  }

  /* ------------------------------------------------------------------
     Divide i nomi in lettere per l'animazione d'ingresso
     ------------------------------------------------------------------ */
  function splitLetters() {
    $$('[data-split]').forEach((el) => {
      const text = el.textContent;
      el.setAttribute('aria-label', text);
      el.innerHTML = [...text]
        .map((c, i) => `<span class="ch" aria-hidden="true" style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`)
        .join('');
    });
  }

  /* ------------------------------------------------------------------
     0. Busta: tieni premuto il sigillo
     ------------------------------------------------------------------ */
  function intro(onOpen) {
    const introEl = $('#intro');
    const seal = $('#seal');
    const ring = $('#sealRing');
    const hint = $('#introHint');
    const DURATION = reduced ? 1 : 1150;
    let start = 0, progress = 0, holding = false, opened = false, raf = 0, tapTimer = 0;

    const render = () => {
      ring.style.strokeDashoffset = String(1 - progress);
      const shake = holding ? progress * 3 : 0;
      seal.style.transform = `scale(${1 + progress * 0.1}) translate(${(Math.random() - .5) * shake}px, ${(Math.random() - .5) * shake}px)`;
    };

    const tick = (now) => {
      if (holding) {
        progress = clamp((now - start) / DURATION, 0, 1);
        if (progress >= 1) return open();
      } else {
        progress = Math.max(0, progress - 0.04);
      }
      render();
      if (holding || progress > 0) raf = requestAnimationFrame(tick);
    };

    const press = (e) => {
      if (opened || holding) return;
      e && e.preventDefault();
      holding = true;
      start = performance.now() - progress * DURATION;
      introEl.classList.add('is-holding');
      tapTimer = setTimeout(() => (tapTimer = 0), 250);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const release = () => {
      if (!holding || opened) return;
      holding = false;
      introEl.classList.remove('is-holding');
      if (tapTimer) { // è stato un tocco veloce: spiego cosa fare
        hint.textContent = 'Tieni premuto ancora un po’…';
        hint.classList.remove('is-nudge'); void hint.offsetWidth; hint.classList.add('is-nudge');
      }
      raf = requestAnimationFrame(tick);
    };

    function open() {
      opened = true; holding = false;
      cancelAnimationFrame(raf);
      seal.style.transform = '';
      navigator.vibrate && navigator.vibrate([18, 40, 30]);
      introEl.classList.add('is-opening');
      setTimeout(() => {
        document.body.classList.remove('is-locked');
        document.body.classList.add('is-open');
        window.scrollTo(0, 0);
        onOpen();
      }, 750);
      setTimeout(() => introEl.remove(), 2400);
    }

    seal.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    seal.addEventListener('contextmenu', (e) => e.preventDefault());
    seal.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) press(e); });
    seal.addEventListener('keyup', (e) => { if (e.key === 'Enter' || e.key === ' ') release(); });
    seal.focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------
     Polvere dorata nell'hero
     ------------------------------------------------------------------ */
  function dust() {
    const cvs = $('#dust');
    const ctx = cvs.getContext('2d');
    const hero = $('.hero');
    let w, h, dpr, parts = [], visible = true;

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      cvs.width = w * dpr; cvs.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(clamp(w * h / 16000, 30, 90));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.8 + .4,
        vy: -(Math.random() * .25 + .05), vx: (Math.random() - .5) * .15,
        a: Math.random() * .6 + .2, p: Math.random() * Math.PI * 2,
      }));
    };

    const loop = (t) => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (const q of parts) {
          q.x += q.vx + Math.sin(t / 2000 + q.p) * .12;
          q.y += q.vy;
          if (q.y < -5) { q.y = h + 5; q.x = Math.random() * w; }
          const tw = .5 + .5 * Math.sin(t / 700 + q.p * 3);
          ctx.globalAlpha = q.a * tw;
          ctx.fillStyle = '#b8914f';
          ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, 6.283); ctx.fill();
        }
      }
      requestAnimationFrame(loop);
    };

    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);
    addEventListener('resize', resize);
    resize();
    if (!reduced) requestAnimationFrame(loop);
  }

  /* ------------------------------------------------------------------
     2. Leggenda: le parole si accendono scorrendo
     ------------------------------------------------------------------ */
  function legend() {
    const el = $('#legendText');
    const HL = /^(filo|rosso|invisibile|mai|seguitelo)/i;
    el.innerHTML = el.textContent
      .split(/\s+/)
      .map((w) => `<span class="w${HL.test(w) ? ' hl' : ''}">${w}</span>`)
      .join(' ');
    const words = $$('.w', el);

    return () => {
      const r = el.getBoundingClientRect();
      const vh = innerHeight;
      const p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.25), 0, 1);
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
  }

  /* ------------------------------------------------------------------
     3. Camera oscura: foto appese al filo
     ------------------------------------------------------------------ */
  function gallery() {
    const line = $('#line');
    line.innerHTML = W.foto.map((f, i) => `
      <figure class="photo" style="--r:${((i * 37) % 7) - 3}">
        <div class="photo__hang">
          <div class="photo__sway">
            <span class="clip" aria-hidden="true"></span>
            <div class="photo__frame">
              <div class="photo__img"><img src="${f.src}" alt="${f.didascalia || ''}" loading="lazy" decoding="async"></div>
              <figcaption>${f.didascalia || ''}</figcaption>
            </div>
          </div>
        </div>
      </figure>`).join('');

    const photos = $$('.photo', line).map((el) => ({
      el,
      sway: $('.photo__sway', el),
      angle: ((Math.random() - .5) * 4),
      vel: 0,
      rest: (Math.random() - .5) * 3,
      visible: false,
    }));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const p = photos.find((q) => q.el === e.target);
        p.visible = e.isIntersecting;
        if (e.intersectionRatio > .45 && !p.el.classList.contains('is-developed')) {
          p.el.classList.add('is-developed');
          p.vel += (Math.random() - .5) * 2;
        }
      });
    }, { threshold: [0, .45] });
    photos.forEach((p) => {
      io.observe(p.el);
      p.el.addEventListener('pointerdown', () => (p.vel += (Math.random() > .5 ? 1 : -1) * (2 + Math.random() * 2)));
    });

    // fisica del dondolio: la velocità di scroll "spinge" le foto
    let lastY = scrollY, push = 0;
    return () => {
      if (reduced) return;
      const dy = scrollY - lastY; lastY = scrollY;
      push += (clamp(dy, -60, 60) - push) * 0.2;
      for (const p of photos) {
        if (!p.visible) continue;
        const force = -push * 0.035 - (p.angle - p.rest) * 0.035;
        p.vel = (p.vel + force) * 0.94;
        p.angle = clamp(p.angle + p.vel, -28, 28);
        p.sway.style.transform = `rotate(${p.angle.toFixed(2)}deg)`;
      }
    };
  }

  /* Punti del filo lungo le file di foto (a zig-zag, con la curva del bucato) */
  function galleryPoints(line, mainRect) {
    const photos = $$('.photo', line);
    if (!photos.length) return [];
    const lr = line.getBoundingClientRect();
    const left = lr.left - mainRect.left + 4;
    const right = lr.right - mainRect.left - 4;

    // raggruppa per riga (offsetTop non risente delle trasformazioni)
    const rows = [];
    photos.forEach((ph) => {
      const top = ph.offsetTop;
      let row = rows.find((r) => Math.abs(r.top - top) < 10);
      if (!row) rows.push((row = { top, items: [] }));
      row.items.push(ph);
    });

    const lineTop = lr.top - mainRect.top;
    const pts = [];
    const sag = clamp((right - left) * 0.06, 24, 70);
    const bend = clamp((right - left) * 0.03, 14, 36); // raggio delle curve a fine riga
    rows.forEach((row, ri) => {
      const y = lineTop + row.top - 2;
      const fromRight = ri % 2 === 0; // la prima riga arriva da destra
      if (ri > 0) { // curva morbida verso la riga successiva
        const prevY = lineTop + rows[ri - 1].top - 2;
        const x = fromRight ? right + bend : left - bend;
        pts.push([x, prevY + (y - prevY) * 0.5]);
      }
      const n = Math.max(6, Math.round((right - left) / 50));
      for (let k = 0; k <= n; k++) {
        const t = fromRight ? 1 - k / n : k / n;
        pts.push([left + (right - left) * t, y + 4 * t * (1 - t) * sag]);
      }
      // abbassa ogni foto sulla curva
      row.items.forEach((ph) => {
        const cx = lr.left - mainRect.left + ph.offsetLeft + ph.offsetWidth / 2;
        const t = clamp((cx - left) / (right - left), 0, 1);
        ph.style.setProperty('--sag', `${(4 * t * (1 - t) * sag).toFixed(1)}px`);
      });
    });
    // uscita: scende lungo il lato dove finisce l'ultima riga
    const last = rows[rows.length - 1];
    const endsRight = (rows.length - 1) % 2 === 1;
    const lastBottom = lineTop + last.top + Math.max(...last.items.map((ph) => ph.offsetHeight));
    pts.push([endsRight ? right + bend : left - bend, lastBottom + 60]);
    return pts;
  }

  /* ------------------------------------------------------------------
     IL FILO ROSSO
     ------------------------------------------------------------------ */
  function thread() {
    const main = $('#main');
    const svg = $('#thread');
    const paths = ['#threadShadow', '#threadBase', '#threadTwist'].map((s) => $(s));
    const mask = $('#threadMaskPath');
    const tip = $('#threadTip');
    let xs = [], ys = [], ls = [], maxY = [], total = 1, drawn = 0, target = 0, ready = false;

    function collect() {
      const mr = main.getBoundingClientRect();
      const pts = [];
      $$('[data-thread], [data-thread-gallery]').forEach((el) => {
        if (el.hasAttribute('data-thread-gallery')) return pts.push(...galleryPoints(el, mr));
        const r = el.getBoundingClientRect();
        el.dataset.thread.split(';').forEach((p) => {
          const [fx, fy] = p.split(',').map(Number);
          pts.push([r.left - mr.left + fx * r.width, r.top - mr.top + fy * r.height]);
        });
      });
      return pts;
    }

    function build() {
      const pts = collect();
      if (pts.length < 2) return;
      const H = main.offsetHeight;
      svg.setAttribute('height', H);
      svg.setAttribute('width', main.clientWidth);
      svg.style.height = H + 'px';

      // Catmull-Rom → Bézier, campionando la lunghezza
      let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
      xs = [pts[0][0]]; ys = [pts[0][1]]; ls = [0];
      let len = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
        const steps = 14;
        for (let s = 1; s <= steps; s++) {
          const t = s / steps, u = 1 - t;
          const x = u * u * u * p1[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p2[0];
          const y = u * u * u * p1[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p2[1];
          len += Math.hypot(x - xs[xs.length - 1], y - ys[ys.length - 1]);
          xs.push(x); ys.push(y); ls.push(len);
        }
      }
      total = len;
      maxY = [];
      ys.reduce((m, y, i) => (maxY[i] = Math.max(m, y)), -Infinity);

      paths.forEach((p) => p.setAttribute('d', d));
      mask.setAttribute('d', d);
      mask.setAttribute('pathLength', total.toFixed(1));
      mask.style.strokeDasharray = `${total} ${total + 10}`;
      ready = true;
      update(true);
    }

    function targetFor() {
      const doc = document.documentElement;
      if (scrollY + innerHeight >= doc.scrollHeight - 4) return total;
      const mainTop = main.getBoundingClientRect().top + scrollY;
      const tipY = scrollY + innerHeight * 0.62 - mainTop;
      // primo campione oltre la "linea di lettura"
      let lo = 0, hi = maxY.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (maxY[m] > tipY) hi = m; else lo = m + 1; }
      return ls[lo];
    }

    function pointAt(l) {
      let lo = 0, hi = ls.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (ls[m] >= l) hi = m; else lo = m + 1; }
      return [xs[lo], ys[lo]];
    }

    function update(snap) {
      if (!ready || !document.body.classList.contains('is-open')) return;
      target = reduced ? total : targetFor();
      drawn = snap === true && reduced ? target : drawn + (target - drawn) * 0.1;
      if (Math.abs(target - drawn) < .5) drawn = target;
      mask.style.strokeDashoffset = (total - drawn).toFixed(1);
      const [x, y] = pointAt(drawn);
      tip.setAttribute('cx', x.toFixed(1));
      tip.setAttribute('cy', y.toFixed(1));
      document.body.classList.toggle('is-threaded-end', drawn > total - 2);
    }

    let t;
    const schedule = () => { clearTimeout(t); t = setTimeout(build, 120); };
    new ResizeObserver(schedule).observe(main);
    addEventListener('resize', schedule);
    document.fonts && document.fonts.ready.then(schedule);
    return { build, update };
  }

  /* ------------------------------------------------------------------
     Chicchi di riso (al posto dei coriandoli)
     ------------------------------------------------------------------ */
  const Rice = (() => {
    const cvs = $('#rice');
    const ctx = cvs.getContext('2d');
    let parts = [], running = false, dpr = 1;

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      cvs.width = innerWidth * dpr; cvs.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    addEventListener('resize', resize); resize();

    const loop = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts = parts.filter((p) => p.y < innerHeight + 30 && p.life-- > 0);
      for (const p of parts) {
        p.vy += 0.32; p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.shadowColor = 'rgba(80,50,20,.35)'; ctx.shadowBlur = 2; ctx.shadowOffsetY = 1;
        ctx.beginPath(); ctx.ellipse(0, 0, p.s * 1.9, p.s * .75, 0, 0, 6.283); ctx.fill();
        ctx.restore();
      }
      if (parts.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
    };

    return (x, y, n = 150, extra = {}) => {
      if (reduced) return;
      const colors = ['#fffdf5', '#fbf3df', '#f5ecd6', '#ffffff'];
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - .5) * (extra.spread || 2.2);
        const sp = 7 + Math.random() * (extra.power || 13);
        parts.push({
          x: x + (Math.random() - .5) * 30, y: y + (Math.random() - .5) * 20,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          rot: Math.random() * 6.28, vr: (Math.random() - .5) * .4,
          s: 1.6 + Math.random() * 1.6,
          c: Math.random() < .08 ? '#d42a3c' : colors[i % colors.length],
          life: 260,
        });
      }
      if (!running) { running = true; requestAnimationFrame(loop); }
    };
  })();

  /* ------------------------------------------------------------------
     4. Gratta & Sposa
     ------------------------------------------------------------------ */
  function scratchCards(onWin) {
    const ticket = $('#ticket');
    const spots = $$('[data-spot]');
    let done = 0;

    const finish = (spot) => {
      if (spot.classList.contains('is-done')) return;
      spot.classList.add('is-done');
      const r = spot.getBoundingClientRect();
      Rice(r.left + r.width / 2, r.top + r.height / 2, 24, { power: 6, spread: 3 });
      if (++done === spots.length) setTimeout(win, 450);
    };

    const win = () => {
      ticket.classList.add('is-won');
      const r = ticket.getBoundingClientRect();
      Rice(r.left + r.width * .2, r.top + r.height * .6, 120);
      Rice(r.left + r.width * .8, r.top + r.height * .6, 120);
      navigator.vibrate && navigator.vibrate([30, 60, 30, 60, 80]);
      $('#revealAll').hidden = true;
      onWin();
    };

    spots.forEach((spot) => {
      const cvs = $('canvas', spot);
      const ctx = cvs.getContext('2d', { willReadFrequently: true });
      let w, h, dpr, down = false, last = null, moves = 0;

      const paint = () => {
        dpr = Math.min(devicePixelRatio || 1, 2);
        w = spot.clientWidth; h = spot.clientHeight;
        cvs.width = w * dpr; cvs.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, '#d9d9d6'); g.addColorStop(.35, '#b8b8b4');
        g.addColorStop(.5, '#ecece8'); g.addColorStop(.7, '#a9a9a4'); g.addColorStop(1, '#cfcfca');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < w * h / 18; i++) { // grana metallica
          ctx.fillStyle = `rgba(${Math.random() < .5 ? '255,255,255' : '0,0,0'},${Math.random() * .12})`;
          ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
        }
        ctx.fillStyle = 'rgba(90,90,85,.55)';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.font = `700 ${Math.round(w * .13)}px "Courier Prime", monospace`;
        ctx.fillText('GRATTA', w / 2, h / 2 - w * .06);
        ctx.font = `italic ${Math.round(w * .16)}px "Pinyon Script", cursive`;
        ctx.fillStyle = 'rgba(125,13,27,.55)';
        ctx.fillText('qui', w / 2, h / 2 + w * .12);
      };

      const pos = (e) => {
        const r = cvs.getBoundingClientRect();
        return [(e.clientX - r.left) * (w / r.width), (e.clientY - r.top) * (h / r.height)];
      };

      const scratch = (p) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.lineWidth = w * .2;
        ctx.beginPath();
        ctx.moveTo(...(last || p)); ctx.lineTo(...p); ctx.stroke();
        last = p;
        if (++moves % 6 === 0) check();
      };

      const check = () => {
        const data = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
        let clear = 0, n = 0;
        for (let i = 3; i < data.length; i += 4 * 12) { n++; if (data[i] < 40) clear++; }
        if (clear / n > .52) finish(spot);
      };

      cvs.addEventListener('pointerdown', (e) => { down = true; last = null; cvs.setPointerCapture(e.pointerId); scratch(pos(e)); });
      cvs.addEventListener('pointermove', (e) => { if (down) scratch(pos(e)); });
      const up = () => { down = false; last = null; };
      cvs.addEventListener('pointerup', up);
      cvs.addEventListener('pointercancel', up);

      paint();
      document.fonts && document.fonts.ready.then(() => { if (!spot.classList.contains('is-done')) paint(); });
    });

    $('#revealAll').addEventListener('click', () => spots.forEach((s, i) => setTimeout(() => finish(s), i * 250)));
  }

  /* ------------------------------------------------------------------
     5. Countdown + calendario
     ------------------------------------------------------------------ */
  function countdown() {
    const els = { d: $('#cdD'), h: $('#cdH'), m: $('#cdM'), s: $('#cdS') };
    const tick = () => {
      let diff = Math.max(0, weddingDate - Date.now());
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const m = Math.floor(diff / 6e4); diff -= m * 6e4;
      const s = Math.floor(diff / 1e3);
      els.d.textContent = d;
      els.h.textContent = String(h).padStart(2, '0');
      els.m.textContent = String(m).padStart(2, '0');
      els.s.textContent = String(s).padStart(2, '0');
    };
    tick(); setInterval(tick, 1000);
    if (weddingDate < Date.now()) $('.countdown .kicker').textContent = 'Sposi!';
  }

  function calendar() {
    const start = weddingDate;
    const end = new Date(start.getTime() + (W.durataOre || 8) * 36e5);
    const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const title = `Matrimonio di ${W.lui} & ${W.lei}`;
    const place = `${W.luogo.nome}, ${W.luogo.indirizzo}`;
    const details = `Save the date! Conferma la tua presenza su ${location.href.split('#')[0]}`;

    $('#gcal').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + `&text=${encodeURIComponent(title)}&dates=${stamp(start)}/${stamp(end)}`
      + `&details=${encodeURIComponent(details)}&location=${encodeURIComponent(place)}`;

    $('#ics').addEventListener('click', () => {
      const esc = (s) => s.replace(/([,;\\])/g, '\\$1');
      const ics = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Silvio e Lucia//Save the date//IT', 'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:${stamp(start)}-matrimonio@silvio-lucia`,
        `DTSTAMP:${stamp(new Date())}`,
        `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
        `SUMMARY:${esc(title)}`, `LOCATION:${esc(place)}`, `DESCRIPTION:${esc(details)}`,
        'BEGIN:VALARM', 'TRIGGER:-P7D', 'ACTION:DISPLAY', `DESCRIPTION:${esc(title)}`, 'END:VALARM',
        'END:VEVENT', 'END:VCALENDAR',
      ].join('\r\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
      a.download = `matrimonio-${W.lui}-${W.lei}.ics`.toLowerCase();
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });
  }

  /* ------------------------------------------------------------------
     6. Cartolina
     ------------------------------------------------------------------ */
  function postcard() {
    const pc = $('#postcard');
    const flip = () => {
      const on = pc.classList.toggle('is-flipped');
      pc.setAttribute('aria-pressed', String(on));
    };
    pc.addEventListener('click', (e) => { if (!e.target.closest('a')) flip(); });
    pc.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  }

  /* ------------------------------------------------------------------
     7. RSVP
     ------------------------------------------------------------------ */
  function rsvp() {
    const form = $('#rsvpForm');
    const ifYes = $('#ifYes');
    const err = $('#rsvpError');
    const btn = $('#rsvpSend');
    const done = $('#rsvpDone');
    const KEY = 'sl-rsvp';

    try { if (localStorage.getItem(KEY)) $('#rsvpAlready').hidden = false; } catch (_) { /* niente storage */ }

    form.addEventListener('change', (e) => {
      if (e.target.name === 'partecipa') ifYes.classList.toggle('is-open', e.target.value === 'si');
      if (e.target.closest('.field')) e.target.closest('.field').classList.remove('is-invalid');
    });
    form.addEventListener('input', (e) => e.target.closest('.field') && e.target.closest('.field').classList.remove('is-invalid'));

    const showError = (msg) => { err.textContent = msg; err.hidden = false; };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.hidden = true;
      const fd = new FormData(form);
      if (fd.get('_gotcha')) return;

      const answer = fd.get('partecipa');
      let ok = true;
      if (!answer) { showError('Prima di tutto: ci sarai o no? Timbra una delle due risposte.'); ok = false; }
      ['nome', 'contatto'].forEach((n) => {
        if (!String(fd.get(n) || '').trim()) { form.elements[n].closest('.field').classList.add('is-invalid'); ok = false; }
      });
      if (!ok) { if (err.hidden) showError('Mancano nome e contatto.'); return; }

      const payload = {
        partecipa: answer === 'si' ? 'Sì' : 'No',
        nome: fd.get('nome').trim(),
        contatto: fd.get('contatto').trim(),
        ospiti: answer === 'si' ? fd.get('ospiti') : '0',
        accompagnatori: answer === 'si' ? fd.get('accompagnatori') : '',
        allergie: answer === 'si' ? fd.get('allergie') : '',
        messaggio: fd.get('messaggio'),
        inviato: new Date().toLocaleString('it-IT', { timeZone: TZ }),
      };

      btn.disabled = true;
      btn.textContent = 'Spedizione in corso…';
      try {
        if (W.rsvp.endpoint) {
          const gas = /script\.google(usercontent)?\.com/.test(W.rsvp.endpoint);
          const res = await fetch(W.rsvp.endpoint, {
            method: 'POST',
            mode: gas ? 'no-cors' : 'cors',
            headers: gas ? undefined : { Accept: 'application/json' },
            body: new URLSearchParams(payload),
          });
          if (!gas && !res.ok) throw new Error('HTTP ' + res.status);
        } else if (W.rsvp.email) {
          const body = Object.entries(payload).map(([k, v]) => `${k}: ${v || '-'}`).join('\n');
          location.href = `mailto:${W.rsvp.email}?subject=${encodeURIComponent(`RSVP ${W.lui} & ${W.lei} — ${payload.nome}`)}&body=${encodeURIComponent(body)}`;
        } else {
          console.warn('[RSVP] Nessun endpoint configurato in assets/js/config.js — risposta non inviata:', payload);
        }
        try { localStorage.setItem(KEY, JSON.stringify(payload)); } catch (_) { /* ok */ }
        sent(answer === 'si', payload.nome.split(' ')[0]);
      } catch (ex) {
        console.error(ex);
        showError('Ops, il postino si è perso. Riprova tra un attimo o scrivici direttamente.');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Spedisci la risposta';
      }
    });

    function sent(yes, nome) {
      form.classList.add('is-sent');
      navigator.vibrate && navigator.vibrate(40);
      setTimeout(() => form.classList.add('is-flying'), 1300);
      setTimeout(() => {
        done.style.minHeight = form.offsetHeight + 'px'; // il filo rosso non cambia strada
        form.hidden = true;
        form.classList.remove('is-sent', 'is-flying');
        $('#rsvpDoneBig').textContent = yes ? 'Evviva!' : 'Ci mancherai';
        $('#rsvpDoneText').textContent = yes
          ? `Grazie ${nome}! Da adesso il filo rosso passa anche da te. Ci vediamo il ${fmt({ day: 'numeric', month: 'long' })}.`
          : `Grazie ${nome} per avercelo fatto sapere. Brinderemo anche alla tua salute!`;
        done.hidden = false;
        if (yes) {
          const r = done.getBoundingClientRect();
          Rice(innerWidth * .25, r.top + 40, 110);
          Rice(innerWidth * .75, r.top + 40, 110);
        }
      }, 2300);
    }

    $('#rsvpAgain').addEventListener('click', () => {
      done.hidden = true;
      form.hidden = false;
      $('#rsvpAlready').hidden = false;
      form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  }

  /* ------------------------------------------------------------------
     Comparse allo scroll
     ------------------------------------------------------------------ */
  function reveals() {
    const targets = [...$$('.section-head, .ticket, .postcard, .letter, .cd, .finale__names')];
    targets.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((el) => io.observe(el));

    const knot = $('#knot');
    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) { knot.classList.add('is-tied'); obs.disconnect(); }
    }, { threshold: .8 }).observe(knot);
  }

  /* ------------------------------------------------------------------
     Avvio
     ------------------------------------------------------------------ */
  function init() {
    bindConfig();
    splitLetters();
    const legendUpdate = legend();
    const swayUpdate = gallery();
    const T = thread();
    dust();
    scratchCards(() => $('#countdown').classList.remove('is-locked'));
    countdown();
    calendar();
    postcard();
    rsvp();
    reveals();

    const loop = () => {
      legendUpdate();
      swayUpdate();
      T.update();
      requestAnimationFrame(loop);
    };

    intro(() => {
      T.build();
      requestAnimationFrame(loop);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
