// 화면 전환: 홈, 배우기, 문제 풀기, 결과, 상점
const N = 10; // 한 번에 푸는 문제 수
const $app = document.getElementById('app');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const starsOf = (score) => (score >= 9 ? 3 : score >= 7 ? 2 : score >= 5 ? 1 : 0);
const starStr = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);
const who = () => (S.name ? esc(S.name) : '모험가');
const PRAISE = ['정답! 최고야!', '맞았어! 대박!', '천재인데?!', '완벽해!', '역시 나야!', '쉽다 쉬워!'];
const OOPS = ['앗! 다시 해 보자!', '으앗, 아깝다!', '괜찮아, 한 번 더!'];
const CHEER = ['할 수 있어! 💪', '이번 문제도 가 보자!', '집중! 집중!', '천천히 생각해 봐!', '이건 쉬울걸?', '같이 풀어 보자!'];

function route() {
  const p = (location.hash.slice(1) || '/').split('/').filter(Boolean);
  if (p[0] === 'u' && UNITS.find((u) => u.id === p[1])) learnView(p[1]);
  else if (p[0] === 'q' && UNITS.find((u) => u.id === p[1])) startQuiz(p[1]);
  else if (p[0] === 'mix' && (p[1] === '1' || p[1] === '2')) startQuiz('mix' + p[1]);
  else if (p[0] === 'shop') shopView();
  else homeView();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

// ---------- 상단 HUD ----------
function hud() {
  const lv = levelOf(S.xp), pct = ((S.xp % XP_PER_LV) / XP_PER_LV) * 100;
  return `<div class="hud">
    <a href="#/" class="hud-me"><span class="hud-av">${avatarSVG(S.eq, 'happy', false)}</span>
      <span class="hud-info"><b>${who()}</b><span class="lv">Lv.${lv} ${titleOf(lv)}</span><span class="xpbar"><i style="width:${pct}%"></i></span></span></a>
    <span class="coin-pill" id="coins">🪙 <b>${S.coins}</b></span>
    <a href="#/shop" class="hud-btn shop">🛒<span>상점</span></a>
    <button class="hud-btn" id="snd" title="소리">${S.sound ? '🔊' : '🔇'}</button>
  </div>`;
}
function bindHud() {
  const b = document.getElementById('snd');
  if (b) b.onclick = () => { S.sound = !S.sound; save(); b.textContent = S.sound ? '🔊' : '🔇'; sfx.click(); };
}

// ---------- 홈 ----------
function homeView() {
  Q = null;
  const total = UNITS.reduce((s, u) => s + starsOf(S.best[u.id] || 0), 0);
  const greet = !S.name ? '안녕! 나는 너의 수학 아바타야. 이름을 지어 줘!' : S.gift ? `${who()}! 환영 선물로 🪙50 코인을 줄게! 상점에서 꾸며 봐!` : pick([`${who()}! 오늘은 어떤 스테이지에 도전할까?`, '문제를 맞히면 코인을 모을 수 있어!', '코인으로 왕관이랑 드래곤 펫을 살 수 있대!', `별을 ${total}개 모았어! 더 모아 보자!`]);
  const sem = (n) => `
    <section class="world">
      <div class="world-head"><h2>🌍 월드 ${n} <small>${n}학기</small></h2><a class="gbtn yellow sm" href="#/mix/${n}">⚔️ 보스전 (전체 복습)</a></div>
      <div class="grid">${UNITS.filter((u) => u.sem === n).map((u) => {
        const b = S.best[u.id], st = starsOf(b || 0);
        return `<a class="stage ${st === 3 ? 'clear' : ''}" href="#/u/${u.id}">
          <span class="stage-no">STAGE ${u.id}</span>
          ${st === 3 ? '<span class="crown">👑</span>' : ''}
          <span class="uemoji">${u.emoji}</span>
          <span class="utitle">${u.title}</span>
          <span class="ustars ${b !== undefined ? 'got' : ''}">${starStr(st)}</span>
        </a>`;
      }).join('')}</div>
    </section>`;
  $app.innerHTML = `
    ${hud()}
    <header class="hero">
      <div class="hero-av av-idle">${avatarSVG(S.eq, 'happy')}</div>
      <div class="bubble">${greet}</div>
      ${S.name ? '' : `<form class="namebox" id="nameForm"><input id="nameIn" maxlength="10" placeholder="내 이름" autocomplete="off"><button class="gbtn green sm">결정!</button></form>`}
      <div class="stat"><span>⭐ <b>${total}</b>/${UNITS.length * 3}</span><span>✅ 푼 문제 <b>${S.done}</b></span></div>
    </header>
    ${sem(1)}${sem(2)}
    <footer class="foot">${S.name ? '<button class="link" id="rename">이름 바꾸기</button> · ' : ''}10문제 중 9개 이상 맞히면 ⭐⭐⭐ + 보너스 코인!</footer>`;
  bindHud();
  const f = document.getElementById('nameForm');
  if (f) f.onsubmit = (e) => { e.preventDefault(); const v = document.getElementById('nameIn').value.trim(); if (v) { S.name = v; save(); sfx.buy(); homeView(); } };
  const rn = document.getElementById('rename');
  if (rn) rn.onclick = () => { const v = prompt('새 이름', S.name); if (v && v.trim()) { S.name = v.trim().slice(0, 10); save(); homeView(); } };
  if (S.gift && S.name) { S.gift = false; save(); }
}

// ---------- 배우기 ----------
function learnView(id) {
  Q = null;
  const u = UNITS.find((x) => x.id === id);
  const b = S.best[id];
  $app.innerHTML = `
    ${hud()}
    <div class="topbar"><a href="#/" class="back">← 월드 맵</a><span class="stage-no">STAGE ${u.id}</span></div>
    <h1 class="utitle-big">${u.emoji} ${u.title}</h1>
    ${b !== undefined ? `<p class="center muted">최고 기록 ${b}/${N} <span class="ustars got">${starStr(starsOf(b))}</span></p>` : ''}
    <div class="guide"><div class="mini-av">${avatarSVG(S.eq, 'wow', false)}</div><div class="bubble left">먼저 개념을 같이 알아보자! 다 읽으면 아래에서 문제 풀기 시작!</div></div>
    <div class="learn">${u.learn.map((c, i) => `<article class="lcard"><h3><span class="step">${i + 1}</span>${c.t}</h3><div class="lbody">${c.b}</div></article>`).join('')}</div>
    <details class="tip"><summary>👨‍🏫 가르쳐 주는 분을 위한 팁</summary><p>${u.tip}</p></details>
    <div class="center"><a class="gbtn green big" href="#/q/${id}">⚔️ 스테이지 시작!</a></div>`;
  bindHud();
}

// ---------- 문제 풀기 ----------
let Q = null;
function startQuiz(id) {
  let pool, title, back;
  if (id.startsWith('mix')) { const sem = +id[3]; pool = UNITS.filter((u) => u.sem === sem); title = `⚔️ 월드 ${sem} 보스전`; back = '#/'; }
  else { const u = UNITS.find((x) => x.id === id); pool = [u]; title = `STAGE ${u.id} ${u.title}`; back = `#/u/${id}`; }
  const seen = new Set(), probs = [];
  for (let k = 0; probs.length < N && k < 400; k++) {
    const u = pick(pool), p = u.gen(), key = p.q + (p.visual || '') + JSON.stringify(p.answers || p.ans);
    if (seen.has(key) && k < 300) continue;
    seen.add(key);
    probs.push({ ...p, unit: u });
  }
  Q = { id, title, back, probs, i: 0, correct: 0, tries: 0, wrong: [], locked: false, streak: 0, bestStreak: 0, earned: 0, lv0: levelOf(S.xp) };
  renderQ();
}

const fill = (layout, answers) => layout.replace(/\{(\d)\}/g, (_, i) => `<b class="ansv">${fx(answers[+i])}</b>`);
const answerText = (p) => (p.choices ? `<b class="ansv">${esc(p.ans)}</b>` : fill(p.layout, p.answers));

function setBuddy(expr, text, anim) {
  const b = document.getElementById('buddy');
  if (!b) return;
  b.querySelector('.buddy-av').innerHTML = avatarSVG(S.eq, expr);
  b.querySelector('.bubble').innerHTML = text;
  const av = b.querySelector('.buddy-av');
  av.classList.remove('jump', 'shake');
  void av.offsetWidth;
  if (anim) av.classList.add(anim);
}
function updateCoins() {
  const c = document.getElementById('coins');
  if (c) { c.querySelector('b').textContent = S.coins; c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
}

function renderQ() {
  const p = Q.probs[Q.i];
  const area = p.choices
    ? `<div class="choices">${p.choices.map((c) => `<button class="choice" data-v="${esc(c)}">${esc(c)}</button>`).join('')}</div>`
    : `<div class="layout">${p.layout.replace(/\{(\d)\}/g, (_, i) => `<input class="ans" data-i="${i}" inputmode="decimal" autocomplete="off" aria-label="답 ${+i + 1}">`)}</div>
       <button class="gbtn green" id="check">확인!</button>`;
  $app.innerHTML = `
    <div class="qbar">
      <a href="${Q.back}" class="back">✕</a>
      <div class="progress"><div style="width:${(Q.i / N) * 100}%"></div><span>${Q.i + 1} / ${N}</span></div>
      ${Q.streak >= 2 ? `<span class="streak">🔥${Q.streak}</span>` : ''}
      <span class="coin-pill" id="coins">🪙 <b>${S.coins}</b></span>
    </div>
    <div class="buddy" id="buddy"><div class="buddy-av">${avatarSVG(S.eq, 'happy')}</div><div class="bubble left">${pick(CHEER)}</div></div>
    <div class="qcard">
      <div class="qno">${Q.title}${Q.id.startsWith('mix') ? ` · <span class="tag">${p.unit.title}</span>` : ''}</div>
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
    ins[0].focus({ preventScroll: true });
    document.getElementById('check').onclick = () => {
      if (Q.locked) return;
      if (ins.some((x) => x.value.trim() === '')) { setBuddy('wow', '빈칸을 모두 채워 줘! ✍️'); return; }
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
    const first = Q.tries === 0;
    let gain = first ? 10 : 5;
    Q.streak = first ? Q.streak + 1 : 0;
    Q.bestStreak = Math.max(Q.bestStreak, Q.streak);
    const combo = first && Q.streak >= 3 && Q.streak % 3 === 0;
    if (combo) gain += 10;
    earn(gain);
    Q.earned += gain;
    if (btn) btn.classList.add('right');
    lockInputs();
    sfx.correct();
    setTimeout(sfx.coin, 220);
    if (combo) { setTimeout(sfx.combo, 450); toast(`🔥 ${Q.streak}연속 정답! 보너스 🪙10`); }
    setBuddy('happy', pick(PRAISE) + (combo ? ` 🔥${Q.streak}콤보!` : ''), 'jump');
    floatText(`+${gain} 🪙`, document.getElementById('coins'));
    updateCoins();
    showFb('good', `<div class="fb-title ok">✅ 정답! +${gain} 🪙</div><div class="fb-exp">${p.explain}</div>${nextBtn()}`);
  } else if (Q.tries === 0) {
    Q.tries = 1;
    Q.streak = 0;
    sfx.wrong();
    if (btn) { btn.classList.add('wrongc'); btn.disabled = true; }
    $app.querySelectorAll('.ans').forEach((x) => x.classList.add('bad'));
    setBuddy('sad', pick(OOPS), 'shake');
    showFb('warn', `<div class="fb-exp">💡 힌트: ${p.hint}</div>`);
  } else {
    Q.locked = true;
    sfx.wrong();
    if (btn) btn.classList.add('wrongc');
    $app.querySelectorAll('.choice').forEach((b) => { if (b.dataset.v === String(p.ans)) b.classList.add('right'); });
    lockInputs();
    Q.wrong.push(p);
    setBuddy('sad', '괜찮아! 풀이를 보고 기억하자 📒', 'shake');
    showFb('bad', `<div class="fb-title">정답은 ${answerText(p)}</div><div class="fb-exp">${p.explain}</div>${nextBtn()}`);
  }
  const nb = document.getElementById('next');
  if (nb) { nb.onclick = next; nb.focus({ preventScroll: true }); }
}

const nextBtn = () => `<button class="gbtn green" id="next">${Q.i + 1 < N ? '다음 문제 →' : '결과 보기 🏁'}</button>`;
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
  const bonus = [0, 5, 15, 30][st];
  if (bonus) earn(bonus);
  save();
  const lv = levelOf(S.xp), lvUp = lv > Q.lv0;
  const msg = st === 3 ? `스테이지 클리어! ${who()} 최고야!` : st === 2 ? '잘했어! 조금만 더 하면 별 3개!' : st === 1 ? '좋아! 틀린 문제 보고 다시 도전!' : '괜찮아! 개념 보고 다시 해 보자!';
  $app.innerHTML = `
    ${hud()}
    <div class="result">
      ${st === 3 ? `<div class="confetti">${'🎉⭐🎊✨'.repeat(4)}</div>` : ''}
      <div class="res-av ${st >= 2 ? 'av-cheer' : ''}">${avatarSVG(S.eq, st >= 1 ? 'happy' : 'sad')}</div>
      <div class="bubble">${msg}</div>
      <div class="rstars">${starStr(st)}</div>
      <div class="rscore"><b>${sc}</b> / ${N}</div>
      <div class="loot">
        <div>🪙 문제 코인 <b>+${Q.earned}</b></div>
        ${bonus ? `<div>⭐ 별 보너스 <b>+${bonus}</b></div>` : ''}
        ${Q.bestStreak >= 3 ? `<div>🔥 최고 콤보 <b>${Q.bestStreak}연속</b></div>` : ''}
        ${isNew && prev !== undefined ? '<div>🏆 <b>최고 기록 갱신!</b></div>' : ''}
      </div>
      ${lvUp ? `<div class="levelup">🎉 레벨 업! <b>Lv.${lv}</b> ${titleOf(lv)}</div>` : ''}
      <div class="rbtns">
        <button class="gbtn green" id="again">🔁 다시 도전</button>
        <a class="gbtn yellow" href="#/shop">🛒 상점 가기</a>
        ${Q.id.startsWith('mix') ? '' : `<a class="gbtn white" href="#/u/${Q.id}">📖 개념 보기</a>`}
        <a class="gbtn white" href="#/">🗺️ 월드 맵</a>
      </div>
    </div>
    ${Q.wrong.length ? `<h3 class="wtitle">📝 틀린 문제 다시 보기</h3>${Q.wrong.map((p) => `
      <div class="wcard"><div class="qtext">${p.q}</div>${p.visual ? `<div class="visual">${p.visual}</div>` : ''}
      <div class="wans">정답: ${answerText(p)}</div><div class="fb-exp">${p.explain}</div></div>`).join('')}` : ''}`;
  bindHud();
  if (lvUp) setTimeout(sfx.level, 200); else if (st >= 2) setTimeout(sfx.combo, 200);
  const id = Q.id;
  document.getElementById('again').onclick = () => startQuiz(id);
}

// ---------- 상점 ----------
let shopCat = 'hat';
let tryOn = null; // 미리 입어 보는 중인 {cat, id}
function shopView() {
  Q = null;
  const preview = Object.assign({}, S.eq, tryOn ? { [tryOn.cat]: tryOn.id } : {});
  const cards = ITEMS[shopCat].map((it) => {
    const own = owns(shopCat, it.id), on = S.eq[shopCat] === it.id, trying = tryOn && tryOn.id === it.id;
    const pv = Object.assign({}, S.eq, { [shopCat]: it.id });
    let action;
    if (on) action = '<span class="tagon">착용 중</span>';
    else if (own) action = `<button class="gbtn green sm" data-act="equip" data-id="${it.id}">입기</button>`;
    else if (trying) action = `<button class="gbtn yellow sm" data-act="buy" data-id="${it.id}" ${S.coins < it.price ? 'disabled' : ''}>🪙${it.price} 사기</button>`;
    else action = `<button class="gbtn white sm" data-act="try" data-id="${it.id}">👀 입어 보기</button>`;
    return `<div class="icard ${on ? 'on' : ''} ${trying ? 'trying' : ''}">
      <div class="ipv">${avatarSVG(pv, 'happy', shopCat === 'pet')}</div>
      <div class="iname">${it.name}</div>
      <div class="iprice">${own ? '✔ 보유' : `🪙 ${it.price}`}</div>
      ${action}
    </div>`;
  }).join('');
  $app.innerHTML = `
    ${hud()}
    <div class="topbar"><a href="#/" class="back">← 월드 맵</a><span>🛒 아바타 상점</span></div>
    <div class="shop-top">
      <div class="shop-av av-idle">${avatarSVG(preview, tryOn ? 'wow' : 'happy')}</div>
      <div class="bubble">${tryOn ? (owns(tryOn.cat, tryOn.id) ? '' : S.coins >= item(tryOn.cat, tryOn.id).price ? '오, 이거 멋진데? 살까? 😍' : `코인이 ${item(tryOn.cat, tryOn.id).price - S.coins}개 더 필요해! 문제 풀러 가자! 💪`) : '코인으로 나를 꾸며 줘! 먼저 입어 보고 살 수 있어.'}</div>
    </div>
    <div class="tabs">${CATS.map(([c, l]) => `<button class="tab ${c === shopCat ? 'on' : ''}" data-cat="${c}">${l}</button>`).join('')}</div>
    <div class="igrid">${cards}</div>`;
  bindHud();
  $app.querySelectorAll('.tab').forEach((b) => (b.onclick = () => { shopCat = b.dataset.cat; tryOn = null; sfx.click(); shopView(); }));
  $app.querySelectorAll('[data-act]').forEach((b) => (b.onclick = () => {
    const id = b.dataset.id, it = item(shopCat, id);
    if (b.dataset.act === 'try') { tryOn = { cat: shopCat, id }; sfx.click(); }
    else if (b.dataset.act === 'equip') { S.eq[shopCat] = id; tryOn = null; save(); sfx.click(); }
    else if (b.dataset.act === 'buy' && S.coins >= it.price) {
      S.coins -= it.price; S.owned.push(id); S.eq[shopCat] = id; tryOn = null; save(); sfx.buy();
      toast(`🎉 ${it.name} 획득!`);
    }
    shopView();
  }));
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
