// 저장 데이터, 코인·레벨, 효과음, 알림
const STORE = 'sonsmath.v1';
const S = (() => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } })();
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} };
S.best = S.best || {};
S.done = S.done || 0;
if (S.coins === undefined) { S.coins = 50; S.gift = true; } // 환영 선물
S.xp = S.xp || 0;
S.owned = S.owned || [];
S.eq = Object.assign({}, DEFAULT_EQ, S.eq || {});
if (S.sound === undefined) S.sound = true;

// ---------- 레벨 ----------
const XP_PER_LV = 120;
const levelOf = (xp) => Math.floor(xp / XP_PER_LV) + 1;
const TITLES = [[1, '새싹 수학러'], [3, '계산 탐험가'], [5, '도형 수집가'], [7, '분수 기사'], [10, '곱셈 마스터'], [14, '나눗셈 대장'], [18, '수학 영웅'], [25, '전설의 수학왕']];
const titleOf = (lv) => TITLES.filter(([l]) => lv >= l).pop()[1];

const owns = (cat, id) => item(cat, id).price === 0 || S.owned.includes(id);
function earn(n) { S.coins += n; S.xp += n; save(); }

// ---------- 효과음 (Web Audio, 파일 없음) ----------
let AC = null;
function tone(freq, dur, type = 'square', when = 0, vol = 0.07) {
  if (!S.sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const t = AC.currentTime + when, o = AC.createOscillator(), g = AC.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + dur + 0.02);
  } catch (e) {}
}
const sfx = {
  correct: () => { tone(784, 0.1, 'square', 0); tone(1047, 0.18, 'square', 0.09); },
  coin: () => { tone(988, 0.07, 'square', 0, 0.05); tone(1319, 0.22, 'square', 0.07, 0.05); },
  wrong: () => { tone(196, 0.12, 'sawtooth', 0, 0.05); tone(165, 0.22, 'sawtooth', 0.11, 0.05); },
  combo: () => [659, 784, 988, 1319].forEach((f, i) => tone(f, 0.1, 'square', i * 0.06, 0.05)),
  level: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.16, 'triangle', i * 0.11, 0.09)),
  buy: () => [880, 1175, 1568].forEach((f, i) => tone(f, 0.1, 'square', i * 0.07, 0.05)),
  click: () => tone(600, 0.05, 'square', 0, 0.03),
};

// ---------- 알림 ----------
function toast(html, ms = 1800) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = html;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('out'), ms);
  setTimeout(() => t.remove(), ms + 400);
}
function floatText(html, anchor) {
  const r = (anchor || document.body).getBoundingClientRect();
  const f = document.createElement('div');
  f.className = 'floaty';
  f.innerHTML = html;
  f.style.left = `${r.left + r.width / 2}px`;
  f.style.top = `${r.top + window.scrollY}px`;
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 1100);
}
