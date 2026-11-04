// 화면 전환, 문제 풀기, 진도 저장
const STORE = 'sonsmath.v1';
const N = 10; // 한 번에 푸는 문제 수
const load = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } };
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} };
const S = load();
S.best = S.best || {};
S.done = S.done || 0;

const $app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const starsOf = (score) => (score >= 9 ? 3 : score >= 7 ? 2 : score >= 5 ? 1 : 0);
const starStr = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
const PRAISE = ['정답! 최고야! 🎉', '맞았어요! 👏', '대단해! 💯', '완벽해요! ⭐', '천재인데? 🤩', '잘했어요! 👍'];
const OOPS = ['아쉬워요! 한 번 더 해 볼까요? 💪', '거의 다 왔어요! 다시 생각해 봐요 🤔', '괜찮아요, 다시 도전! 🔁'];
const who = () => (S.name ? esc(S.name) : '우리');

function route() {
  const p = (location.hash.slice(1) || '/').split('/').filter(Boolean);
  if (p[0] === 'u' && UNITS.find((u) => u.id === p[1])) learnView(p[1]);
  else if (p[0] === 'q' && UNITS.find((u) => u.id === p[1])) startQuiz(p[1]);
  else if (p[0] === 'mix' && (p[1] === '1' || p[1] === '2')) startQuiz('mix' + p[1]);
  else homeView();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

// ---------- 홈 ----------
function homeView() {
  Q = null;
  const total = UNITS.reduce((s, u) => s + starsOf(S.best[u.id] || 0), 0);
  const sem = (n) => `
    <section class="sem">
      <div class="sem-head"><h2>${n}학기</h2><a class="btn ghost sm" href="#/mix/${n}">🔀 ${n}학기 전체 복습</a></div>
      <div class="grid">${UNITS.filter((u) => u.sem === n).map((u) => {
        const b = S.best[u.id];
        return `<a class="ucard" href="#/u/${u.id}">
          <span class="uemoji">${u.emoji}</span>
          <span class="uno">${u.no}단원</span>
          <span class="utitle">${u.title}</span>
          <span class="ustars ${b !== undefined ? 'got' : ''}">${starStr(starsOf(b || 0))}</span>
        </a>`;
      }).join('')}</div>
    </section>`;
  $app.innerHTML = `
    <header class="hero">
      <h1>${who()}의 수학 교실 <span class="wave">✏️</span></h1>
      <p class="sub">초등 3학년 수학 · 2022 개정 교육과정</p>
      <div class="stat"><span>⭐ 모은 별 <b>${total}</b> / ${UNITS.length * 3}</span><span>✅ 푼 문제 <b>${S.done}</b>개</span></div>
      ${S.name ? `<button class="link" id="rename">이름 바꾸기</button>` : `
      <form class="namebox" id="nameForm"><label>공부할 친구 이름</label><input id="nameIn" maxlength="10" placeholder="이름" autocomplete="off"><button class="btn primary sm">시작!</button></form>`}
    </header>
    ${sem(1)}${sem(2)}
    <footer class="foot">단원 카드를 누르면 개념을 배우고 문제를 풀 수 있어요. 10문제 중 9개 이상 맞으면 ⭐⭐⭐!</footer>`;
  const f = document.getElementById('nameForm');
  if (f) f.onsubmit = (e) => { e.preventDefault(); const v = document.getElementById('nameIn').value.trim(); if (v) { S.name = v; save(); homeView(); } };
  const rn = document.getElementById('rename');
  if (rn) rn.onclick = () => { delete S.name; save(); homeView(); };
}

// ---------- 배우기 ----------
function learnView(id) {
  Q = null;
  const u = UNITS.find((x) => x.id === id);
  const b = S.best[id];
  $app.innerHTML = `
    <div class="topbar"><a href="#/" class="back">← 처음으로</a><span>${u.sem}학기 ${u.no}단원</span></div>
    <h1 class="utitle-big">${u.emoji} ${u.title}</h1>
    ${b !== undefined ? `<p class="center muted">최고 기록 ${b}/${N} <span class="ustars got">${starStr(starsOf(b))}</span></p>` : ''}
    <div class="learn">${u.learn.map((c, i) => `<article class="lcard"><h3><span class="step">${i + 1}</span>${c.t}</h3><div class="lbody">${c.b}</div></article>`).join('')}</div>
    <details class="tip"><summary>👨‍🏫 가르쳐 주는 분을 위한 팁</summary><p>${u.tip}</p></details>
    <div class="center"><a class="btn primary big" href="#/q/${id}">✏️ 문제 풀러 가기</a></div>`;
}

// ---------- 문제 풀기 ----------
let Q = null;
function startQuiz(id) {
  let pool, title, back;
  if (id.startsWith('mix')) { const sem = +id[3]; pool = UNITS.filter((u) => u.sem === sem); title = `${sem}학기 전체 복습`; back = '#/'; }
  else { const u = UNITS.find((x) => x.id === id); pool = [u]; title = `${u.emoji} ${u.title}`; back = `#/u/${id}`; }
  const seen = new Set(), probs = [];
  for (let k = 0; probs.length < N && k < 400; k++) {
    const u = pick(pool), p = u.gen(), key = p.q + (p.visual || '') + JSON.stringify(p.answers || p.ans);
    if (seen.has(key) && k < 300) continue;
    seen.add(key);
    probs.push({ ...p, unit: u });
  }
  Q = { id, title, back, probs, i: 0, correct: 0, tries: 0, wrong: [], locked: false };
  renderQ();
}

const fill = (layout, answers) => layout.replace(/\{(\d)\}/g, (_, i) => `<b class="ansv">${fx(answers[+i])}</b>`);
const answerText = (p) => (p.choices ? `<b class="ansv">${esc(p.ans)}</b>` : fill(p.layout, p.answers));

function renderQ() {
  const p = Q.probs[Q.i];
  const area = p.choices
    ? `<div class="choices">${p.choices.map((c) => `<button class="choice" data-v="${esc(c)}">${esc(c)}</button>`).join('')}</div>`
    : `<div class="layout">${p.layout.replace(/\{(\d)\}/g, (_, i) => `<input class="ans" data-i="${i}" inputmode="decimal" autocomplete="off" aria-label="답 ${+i + 1}">`)}</div>
       <button class="btn primary" id="check">확인</button>`;
  $app.innerHTML = `
    <div class="topbar"><a href="${Q.back}" class="back">← 그만하기</a><span>${Q.title}</span></div>
    <div class="progress"><div style="width:${(Q.i / N) * 100}%"></div></div>
    <div class="qcard">
      <div class="qno">문제 ${Q.i + 1} / ${N}${Q.id.startsWith('mix') ? ` · <span class="tag">${p.unit.title}</span>` : ''}</div>
      <div class="qtext">${p.q}</div>
      ${p.visual ? `<div class="visual">${p.visual}</div>` : ''}
      <div class="answer">${area}</div>
      <div id="fb" class="fb" aria-live="polite"></div>
    </div>`;
  Q.locked = false;
  if (p.choices) {
    $app.querySelectorAll('.choice').forEach((b) => (b.onclick = () => { if (!Q.locked) judge(b.dataset.v === String(p.ans), b); }));
  } else {
    const ins = [...$app.querySelectorAll('.ans')];
    ins[0].focus();
    document.getElementById('check').onclick = () => {
      if (Q.locked) return;
      if (ins.some((x) => x.value.trim() === '')) { showFb('warn', '빈칸을 모두 채워 주세요 ✍️'); return; }
      const ok = p.answers.every((a, i) => { const v = parseFloat(ins[i].value.replace(/,/g, '').trim()); return !isNaN(v) && Math.abs(v - a) < 1e-9; });
      judge(ok);
    };
  }
}

function showFb(kind, html) {
  const fb = document.getElementById('fb');
  fb.className = `fb ${kind}`;
  fb.innerHTML = html;
}

function judge(ok, btn) {
  const p = Q.probs[Q.i];
  if (ok) {
    Q.locked = true;
    Q.correct++;
    if (btn) btn.classList.add('right');
    lockInputs();
    showFb('good', `<div class="fb-title">${pick(PRAISE)}</div><div class="fb-exp">${p.explain}</div>${nextBtn()}`);
  } else if (Q.tries === 0) {
    Q.tries = 1;
    if (btn) { btn.classList.add('wrongc'); btn.disabled = true; }
    $app.querySelectorAll('.ans').forEach((x) => x.classList.add('bad'));
    showFb('warn', `<div class="fb-title">${pick(OOPS)}</div><div class="fb-exp">💡 힌트: ${p.hint}</div>`);
  } else {
    Q.locked = true;
    if (btn) btn.classList.add('wrongc');
    $app.querySelectorAll('.choice').forEach((b) => { if (b.dataset.v === String(p.ans)) b.classList.add('right'); });
    lockInputs();
    Q.wrong.push(p);
    showFb('bad', `<div class="fb-title">정답은 ${answerText(p)} 이에요.</div><div class="fb-exp">${p.explain}</div>${nextBtn()}`);
  }
  const nb = document.getElementById('next');
  if (nb) { nb.onclick = next; nb.focus(); }
}

const nextBtn = () => `<button class="btn primary" id="next">${Q.i + 1 < N ? '다음 문제 →' : '결과 보기 🏁'}</button>`;
const lockInputs = () => { $app.querySelectorAll('.ans').forEach((x) => (x.disabled = true)); const c = document.getElementById('check'); if (c) c.remove(); };

function next() {
  S.done++;
  save();
  Q.i++;
  Q.tries = 0;
  if (Q.i >= N) resultView(); else { renderQ(); window.scrollTo(0, 0); }
}

function resultView() {
  const sc = Q.correct, st = starsOf(sc), prev = S.best[Q.id];
  const isNew = prev === undefined || sc > prev;
  if (isNew) S.best[Q.id] = sc;
  save();
  const msg = st === 3 ? `${who()} 최고! 완벽하게 이해했어요!` : st === 2 ? '아주 잘했어요! 조금만 더 하면 별 3개!' : st === 1 ? '잘했어요! 틀린 문제를 다시 보고 한 번 더 도전!' : '괜찮아요! 개념을 다시 읽고 도전해 봐요.';
  $app.innerHTML = `
    <div class="topbar"><a href="${Q.back}" class="back">← 돌아가기</a><span>${Q.title}</span></div>
    <div class="result">
      ${st === 3 ? `<div class="confetti">${'🎉⭐🎊✨'.repeat(4)}</div>` : ''}
      <div class="rstars">${starStr(st)}</div>
      <div class="rscore"><b>${sc}</b> / ${N}</div>
      <p>${msg}</p>
      ${isNew && prev !== undefined ? '<p class="newbest">🏆 최고 기록 갱신!</p>' : ''}
      <div class="rbtns">
        <button class="btn primary" id="again">🔁 다시 풀기</button>
        ${Q.id.startsWith('mix') ? '' : `<a class="btn ghost" href="#/u/${Q.id}">📖 개념 다시 보기</a>`}
        <a class="btn ghost" href="#/">🏠 처음으로</a>
      </div>
    </div>
    ${Q.wrong.length ? `<h3 class="wtitle">📝 틀린 문제 다시 보기</h3>${Q.wrong.map((p) => `
      <div class="wcard"><div class="qtext">${p.q}</div>${p.visual ? `<div class="visual sm">${p.visual}</div>` : ''}
      <div class="wans">정답: ${answerText(p)}</div><div class="fb-exp">${p.explain}</div></div>`).join('')}` : ''}`;
  const id = Q.id;
  document.getElementById('again').onclick = () => startQuiz(id);
}

// 엔터: 확인 → 다음
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' || !Q) return;
  const nb = document.getElementById('next');
  if (nb) { e.preventDefault(); nb.click(); return; }
  const cb = document.getElementById('check');
  if (cb && e.target.classList.contains('ans')) { e.preventDefault(); cb.click(); }
});

route();
