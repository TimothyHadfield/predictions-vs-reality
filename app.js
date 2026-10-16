/* ============================================================================
 * app.js — renders and wires every section of the explorer.
 * Reads the global datasets defined in data/*.js (PREDICTIONS, SECTORS,
 * OUTCOMES, FAILURE_MODES, ERAS, FORECASTS, CONFIDENCE_META).
 * ==========================================================================*/
'use strict';

const $  = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
// theme-aware sector color
const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';
const sectorColor = (key) => {
  const s = SECTORS[key];
  return isDark() ? s.colorDark : s.color;
};

/* ---- The Predictability Spectrum data (0 = clockwork, 100 = Extremistan) --- */
const SPECTRUM = [
  { pos: 4,  label: 'Eclipses & orbits', text: 'Celestial mechanics is the gold standard: we can predict a solar eclipse to the second, centuries out. Pure clockwork — no free will, no feedback loops.' },
  { pos: 20, label: 'Demographics (short-term)', text: 'Most people alive in 20 years are already born. Aging and population momentum make near-term demographics one of the most reliable social forecasts.' },
  { pos: 34, label: 'Weather (≤10 days)', text: 'Skilled and improving — modern 5-day forecasts rival 1980s 1-day forecasts. But chaos theory caps it: beyond ~2 weeks, tiny errors explode.' },
  { pos: 50, label: 'Elections', text: 'Genuinely probabilistic. Good models are well-calibrated but a “90% favorite” still loses one time in ten — which we then misremember as the model “being wrong.”' },
  { pos: 66, label: 'Technology adoption', text: 'Direction is often guessable; timing almost never. Amara’s Law rules here — we overshoot the short run and undershoot the long run.' },
  { pos: 82, label: 'Markets', text: 'Efficient enough that consistent edge is nearly impossible, and fat-tailed enough that the biggest moves are the least predictable. Deep Extremistan.' },
  { pos: 95, label: 'Geopolitics & shocks', text: 'Wars, coups, pandemics, 9/11, 2008 — the events that matter most are precisely the ones models miss. Taleb’s black swans live here. Survive them; don’t forecast them.' },
];

/* =====================================================================
 * THEME
 * ===================================================================*/
function initTheme() {
  const saved = (() => { try { return localStorage.getItem('pvr-theme'); } catch (e) { return null; } })();
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = saved || (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
  $('#themeToggle').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('pvr-theme', next); } catch (e) {}
    // repaint color-dependent sections
    renderBiasChart();
    paintSectorColors();
  });
}

/* =====================================================================
 * HERO STATS (computed from the dataset)
 * ===================================================================*/
function renderHeroStats() {
  const total = PREDICTIONS.length;
  const wrong = PREDICTIONS.filter(p => p.outcome === 'wrong').length;
  const nailed = PREDICTIONS.filter(p => p.outcome === 'nailed').length;
  const sectors = new Set(PREDICTIONS.map(p => p.sector)).size;
  const stats = [
    { num: total, cls: 'accent', label: 'famous predictions dissected' },
    { num: `${Math.round(wrong / total * 100)}%`, cls: 'crit', label: 'landed dead wrong' },
    { num: nailed, cls: 'good', label: 'improbable calls that hit' },
    { num: sectors, cls: 'accent', label: 'sectors, from sports to space' },
  ];
  const wrap = $('#heroStats');
  stats.forEach(s => {
    const n = el('div', 'stat');
    n.append(el('div', `stat-num ${s.cls}`, String(s.num)));
    n.append(el('div', 'stat-label', s.label));
    wrap.append(n);
  });
}

/* =====================================================================
 * 2 · ERA TIMELINE
 * ===================================================================*/
function renderEras() {
  const rail = $('#eraRail');
  ERAS.forEach((era, i) => {
    const node = el('li', 'era-node');
    node.setAttribute('role', 'tab');
    node.innerHTML = `<div class="era-period">${era.period}</div><div class="era-name">${era.title}</div>`;
    node.addEventListener('click', () => selectEra(i));
    node.addEventListener('mouseenter', () => selectEra(i));
    rail.append(node);
  });
  selectEra(0);
}
function selectEra(i) {
  $$('.era-node').forEach((n, idx) => {
    n.classList.toggle('active', idx === i);
    n.setAttribute('aria-selected', String(idx === i));
  });
  const e = ERAS[i];
  $('#eraDetail').innerHTML = `
    <div class="era-detail-period">${e.period}</div>
    <h3>${e.title}</h3>
    <p>${e.method}</p>
    <div class="era-example"><strong>Case in point:</strong> ${e.example}</div>
    <p class="era-verdict">${e.verdict}</p>
    <p><a class="src-link" href="${e.source.url}" target="_blank" rel="noopener">${e.source.title}</a></p>`;
}

/* =====================================================================
 * 3 · HOPE VS DOOM (diverging bars, avg optimism per sector)
 * ===================================================================*/
function renderBiasChart() {
  const chart = $('#biasChart');
  chart.innerHTML = '';
  const rows = Object.keys(SECTORS).map(key => {
    const items = PREDICTIONS.filter(p => p.sector === key);
    if (!items.length) return null;
    const avg = items.reduce((s, p) => s + p.optimism, 0) / items.length;
    return { key, avg, n: items.length };
  }).filter(Boolean).sort((a, b) => a.avg - b.avg);

  rows.forEach(r => {
    const row = el('div', 'bias-row');
    row.append(el('div', 'bias-label', SECTORS[r.key].label));
    const track = el('div', 'bias-track');
    const pct = Math.abs(r.avg) / 2 * 50; // half-width max = 50%
    const fill = el('div', `bias-fill ${r.avg >= 0 ? 'pos' : 'neg'}`);
    fill.style.width = pct + '%';
    fill.style.background = sectorColor(r.key);
    const sign = r.avg > 0 ? '+' : '';
    fill.title = `${SECTORS[r.key].label}: average tone ${sign}${r.avg.toFixed(1)} across ${r.n} predictions ` +
                 `(${r.avg > 0.3 ? 'leans optimistic' : r.avg < -0.3 ? 'leans doom' : 'roughly neutral'})`;
    const val = el('span', 'bias-val', `${sign}${r.avg.toFixed(1)}`);
    fill.append(val);
    track.append(fill);
    row.append(track);
    chart.append(row);
  });
  // a bar too short for its number (e.g. 0.0 or +0.2 on a phone) shows the number just past
  // the bar's end instead of spilling white text onto the pale track (measure all, then mark)
  const tiny = $$('.bias-fill', chart).filter(fill => {
    const fs = getComputedStyle(fill);
    const room = fill.clientWidth - parseFloat(fs.paddingLeft) - parseFloat(fs.paddingRight);
    return $('.bias-val', fill).scrollWidth > room;
  });
  tiny.forEach(fill => fill.classList.add('tiny'));
}

/* =====================================================================
 * 4 · PREDICTABILITY SPECTRUM
 * ===================================================================*/
function renderSpectrum() {
  const track = $('#spectrumTrack');
  // stagger vertically so labels don't collide
  const offsets = [-30, 18, -14, 26, -26, 14, -20];
  SPECTRUM.forEach((d, i) => {
    const dot = el('button', 'spectrum-dot', d.label);
    dot.type = 'button';
    dot.style.left = d.pos + '%';
    dot.style.marginTop = (offsets[i % offsets.length]) + 'px';
    const show = () => {
      $$('.spectrum-dot').forEach(x => x.classList.remove('active'));
      dot.classList.add('active');
      $('#spectrumExplainer').innerHTML = `<strong>${d.label}.</strong> ${d.text}`;
    };
    dot.addEventListener('mouseenter', show);
    dot.addEventListener('focus', show);
    dot.addEventListener('click', show);
    track.append(dot);
  });
}

/* =====================================================================
 * 5 · GALLERY + FILTERS
 * ===================================================================*/
const filterState = { sector: 'all', outcome: 'all', fail: 'all' };

function renderFilters() {
  const wrap = $('#filters');

  const group = (labelText, name, options) => {
    const g = el('div', 'filter-group');
    g.append(el('span', 'fg-label', labelText));
    options.forEach(opt => {
      const chip = el('button', 'chip' + (filterState[name] === opt.value ? ' active' : ''));
      chip.type = 'button';
      if (opt.color) {
        const dot = el('span', 'dot');
        dot.style.background = opt.color;
        chip.append(dot);
      }
      chip.append(document.createTextNode(opt.label));
      chip.addEventListener('click', () => {
        filterState[name] = opt.value;
        $$('.chip', g).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderCards();
      });
      g.append(chip);
    });
    return g;
  };

  wrap.append(group('Sector', 'sector', [
    { label: 'All', value: 'all' },
    ...Object.keys(SECTORS).map(k => ({ label: SECTORS[k].label, value: k, color: sectorColor(k) })),
  ]));
  wrap.append(group('Outcome', 'outcome', [
    { label: 'All', value: 'all' },
    ...Object.keys(OUTCOMES).map(k => ({ label: OUTCOMES[k].label, value: k, color: OUTCOMES[k].color })),
  ]));
  wrap.append(group('Why it missed', 'fail', [
    { label: 'All', value: 'all' },
    ...Object.keys(FAILURE_MODES).map(k => ({ label: prettyFail(k), value: k })),
  ]));
}

function prettyFail(k) {
  return k.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function matchFilters(p) {
  if (filterState.sector !== 'all' && p.sector !== filterState.sector) return false;
  if (filterState.outcome !== 'all' && p.outcome !== filterState.outcome) return false;
  if (filterState.fail !== 'all' && p.failureMode !== filterState.fail) return false;
  return true;
}

function renderCards() {
  const wrap = $('#cards');
  wrap.innerHTML = '';
  const list = PREDICTIONS.filter(matchFilters);
  $('#resultCount').textContent =
    `Showing ${list.length} of ${PREDICTIONS.length} predictions`;
  if (!list.length) {
    wrap.append(el('p', 'chart-note', 'No predictions match that combination — try widening a filter.'));
    return;
  }
  list.forEach(p => wrap.append(buildCard(p)));
}

function buildCard(p) {
  const c = el('div', 'card card-anim');
  c.style.setProperty('--card-accent', sectorColor(p.sector));
  const oc = OUTCOMES[p.outcome];

  const top = el('div', 'card-top');
  top.append(el('span', 'card-sector', SECTORS[p.sector].label));
  const outcome = el('span', 'card-outcome');
  outcome.style.color = oc.color;
  outcome.innerHTML = `${oc.symbol} ${oc.label}`;
  top.append(outcome);
  c.append(top);

  c.append(el('div', 'card-claim', p.claim));
  c.append(el('div', 'card-who', p.who));
  c.append(el('div', 'card-meta',
    `<span>Predicted ${p.yearMade}</span>` +
    (p.targetYear ? `<span>· for ${p.targetYear}</span>` : '')));
  c.append(el('div', 'card-reality', `<strong>Reality:</strong> ${p.reality}`));

  if (p.failureMode) {
    c.append(el('div', 'card-fail',
      `<b>${prettyFail(p.failureMode)}:</b> ${FAILURE_MODES[p.failureMode]}`));
  }
  c.append(el('div', 'card-src',
    `<a class="src-link" href="${p.source.url}" target="_blank" rel="noopener">${p.source.title}</a>`));
  return c;
}

/* =====================================================================
 * 6 · PREDICT-FIRST GAME
 * ===================================================================*/
const gameState = { order: [], idx: 0, score: 0, answered: 0 };

function startGame() {
  // deterministic-but-varied shuffle: rotate by dataset size, interleave
  const pool = PREDICTIONS.filter(p => p.outcome === 'nailed' || p.outcome === 'wrong' || p.outcome === 'partial');
  gameState.order = interleave(pool);
  gameState.idx = 0; gameState.score = 0; gameState.answered = 0;
  renderGame();
}
// spread sectors/outcomes apart without Math.random (unavailable here)
function interleave(arr) {
  const step = arr.length > 6 ? 7 : 3;
  const out = [], seen = new Set();
  let i = 0;
  while (out.length < arr.length) {
    if (!seen.has(i % arr.length)) { seen.add(i % arr.length); out.push(arr[i % arr.length]); }
    i += step;
    if (i > arr.length * step + arr.length) break;
  }
  // safety: append any missed
  arr.forEach((p, idx) => { if (!seen.has(idx)) out.push(p); });
  return out;
}

function renderGame() {
  const board = $('#gameBoard');
  board.innerHTML = '';

  const bar = el('div', 'game-scorebar');
  bar.innerHTML = `<span>Question <b>${Math.min(gameState.idx + 1, gameState.order.length)}</b> / ${gameState.order.length}</span>` +
                  `<span>Calibration: <b>${gameState.answered ? Math.round(gameState.score / gameState.answered * 100) : 0}%</b></span>`;
  board.append(bar);

  if (gameState.idx >= gameState.order.length) { renderGameDone(board); return; }

  const p = gameState.order[gameState.idx];
  const card = el('div', 'game-card');
  card.style.setProperty('--card-accent', sectorColor(p.sector));
  card.append(el('div', 'game-sector', SECTORS[p.sector].label + ' · ' + p.yearMade));
  card.append(el('div', 'game-claim', p.claim));
  card.append(el('div', 'game-who', '— ' + p.who));
  card.append(el('div', 'game-prompt', 'Did this come true?'));

  const choices = el('div', 'game-choices');
  const cameBtn = el('button', 'game-btn came', 'Came true ✓');
  const missBtn = el('button', 'game-btn missed', 'Got it wrong ✗');
  cameBtn.type = missBtn.type = 'button';
  cameBtn.addEventListener('click', () => answer(p, true, card));
  missBtn.addEventListener('click', () => answer(p, false, card));
  choices.append(cameBtn, missBtn);
  card.append(choices);
  board.append(card);
}

function answer(p, guessCame, card) {
  // "nailed" = came true; "wrong"/"partial" = did not (fully) come true
  const actuallyCame = p.outcome === 'nailed';
  const correct = guessCame === actuallyCame;
  gameState.answered++;
  if (correct) gameState.score++;

  $$('.game-btn', card).forEach(b => b.disabled = true);
  const reveal = el('div', 'game-reveal');
  reveal.append(el('div', `game-verdict ${correct ? 'right' : 'wrong'}`,
    correct ? '✓ You called it right' : '✗ Hindsight is 20/20 — this one fooled you'));
  const oc = OUTCOMES[p.outcome];
  reveal.append(el('div', 'game-reality',
    `<strong style="color:${oc.color}">${oc.label}.</strong> ${p.reality}` +
    (p.failureMode ? `<br><br><em>Why: ${FAILURE_MODES[p.failureMode]}</em>` : '') +
    `<br><br><a class="src-link" href="${p.source.url}" target="_blank" rel="noopener">${p.source.title}</a>`));
  const next = el('button', 'game-next', gameState.idx + 1 >= gameState.order.length ? 'See your result →' : 'Next prediction →');
  next.type = 'button';
  next.addEventListener('click', () => { gameState.idx++; renderGame(); $('#game').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  reveal.append(next);
  card.append(reveal);

  // update scorebar
  $('.game-scorebar').innerHTML =
    `<span>Question <b>${gameState.idx + 1}</b> / ${gameState.order.length}</span>` +
    `<span>Calibration: <b>${Math.round(gameState.score / gameState.answered * 100)}%</b></span>`;
}

function renderGameDone(board) {
  const pct = gameState.answered ? Math.round(gameState.score / gameState.answered * 100) : 0;
  let verdict;
  if (pct >= 80) verdict = 'Superforecaster material — you saw through the hindsight fog.';
  else if (pct >= 60) verdict = 'Better than most pundits, honestly.';
  else if (pct >= 40) verdict = 'Right about coin-flip odds — exactly Tetlock’s point about experts.';
  else verdict = 'The future is humbling. You’re in good company with the professionals.';
  const done = el('div', 'game-done');
  done.innerHTML = `<div class="big">${pct}%</div>` +
    `<p>${gameState.score} of ${gameState.answered} called correctly.</p>` +
    `<p style="color:var(--ink-2)">${verdict}</p>`;
  const again = el('button', 'game-next', 'Play again');
  again.type = 'button';
  again.addEventListener('click', startGame);
  done.append(again);
  board.append(done);
}

/* =====================================================================
 * 7 · FORECAST HORIZON
 * ===================================================================*/
function renderHorizon() {
  const grid = $('#horizonGrid');
  FORECASTS.forEach(f => {
    const conf = CONFIDENCE_META[f.confidence];
    const card = el('div', 'horizon-card');
    card.style.setProperty('--card-accent', sectorColor(f.sector));
    card.innerHTML = `
      <div class="horizon-top">
        <span class="horizon-year">by ${f.horizon}</span>
        <span class="horizon-sector">${SECTORS[f.sector].label}</span>
      </div>
      <div class="horizon-headline">${f.headline}</div>
      <div class="horizon-detail">${f.detail}</div>
      <div class="horizon-conf">
        <div class="conf-bar"><div class="conf-fill" style="width:${conf.width * 100}%;background:${conf.color}"></div></div>
        <span class="conf-label" style="color:${conf.color}">${conf.label}</span>
      </div>
      <div class="horizon-note">${f.note}</div>
      <div class="horizon-src"><a class="src-link" href="${f.source.url}" target="_blank" rel="noopener">${f.source.title}</a></div>`;
    grid.append(card);
  });
}

/* =====================================================================
 * 8 · SOURCES (dedup across all datasets)
 * ===================================================================*/
function renderSources() {
  const list = $('#sourceList');
  const seen = new Map();
  const add = (tag, src) => { if (src && src.url && !seen.has(src.url)) seen.set(src.url, { tag, ...src }); };
  PREDICTIONS.forEach(p => add(SECTORS[p.sector].label, p.source));
  ERAS.forEach(e => add('History', e.source));
  FORECASTS.forEach(f => add('Forecast', f.source));
  [...seen.values()].sort((a, b) => a.tag.localeCompare(b.tag)).forEach(s => {
    const li = el('li');
    li.innerHTML = `<span class="s-tag">${s.tag}</span><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a>`;
    list.append(li);
  });
}

/* =====================================================================
 * Repaint the sector-colored bits after a theme flip
 * ===================================================================*/
function paintSectorColors() {
  // filters: rebuild to recolor dots
  $('#filters').innerHTML = '';
  renderFilters();
  renderCards();
  // forecast cards carry a sector accent too
  $('#horizonGrid').innerHTML = '';
  renderHorizon();
}

/* =====================================================================
 * BOOT
 * ===================================================================*/
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderHeroStats();
  renderEras();
  renderBiasChart();
  renderSpectrum();
  renderFilters();
  renderCards();
  startGame();
  renderHorizon();
  renderSources();
  // re-check which bias-bar numbers fit when the width changes (phone rotation)
  let lastW = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastW) { lastW = window.innerWidth; renderBiasChart(); }
  });
});
