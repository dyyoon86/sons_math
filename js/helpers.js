// 공용 도우미: 난수, 분수 표시, 세로셈, 그림(SVG)
const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[R(0, arr.length - 1)];
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = R(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const fx = (n) => Number(n.toFixed(1)).toString(); // 0.30000004 같은 오차 제거

// 분수 표시. w가 있으면 대분수
const F = (n, d, w) =>
  `<span class="mixed">${w ? `<span class="whole">${w}</span>` : ''}<span class="frac"><span>${n}</span><span>${d}</span></span></span>`;

// 세로셈 (덧셈/뺄셈/곱셈)
function col(a, b, op) {
  const A = String(a), B = String(b);
  const w = Math.max(A.length, B.length) + 1;
  const row = (s, pre = '') =>
    `<tr><td class="op">${pre}</td>${s.padStart(w, ' ').split('').map((c) => `<td>${c === ' ' ? '' : c}</td>`).join('')}</tr>`;
  return `<table class="col">${row(A)}${row(B, op)}<tr class="line"><td></td>${'<td></td>'.repeat(w)}</tr></table>`;
}

// 나눗셈 세로식:  d ) n
const ldiv = (n, d) => `<div class="ldiv"><span class="dv">${d}</span><span class="dd">${n}</span></div>`;

// 띠 그림 분수
function bar(n, k) {
  const w = 240 / n;
  let s = `<svg viewBox="0 0 250 60" class="fig bar">`;
  for (let i = 0; i < n; i++)
    s += `<rect x="${(5 + i * w).toFixed(1)}" y="10" width="${w.toFixed(1)}" height="40" class="${i < k ? 'on' : 'off'}"/>`;
  return s + '</svg>';
}

// 원 그림 분수
function pie(n, k) {
  const p = (a) => `${(60 + 50 * Math.sin(a)).toFixed(1)} ${(60 - 50 * Math.cos(a)).toFixed(1)}`;
  let s = `<svg viewBox="0 0 120 120" class="fig pie">`;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * 2 * Math.PI, a1 = ((i + 1) / n) * 2 * Math.PI;
    s += `<path d="M60 60 L${p(a0)} A50 50 0 0 1 ${p(a1)} Z" class="${i < k ? 'on' : 'off'}"/>`;
  }
  return s + '</svg>';
}

// 시계 (시, 분, 초)
function clock(h, m, sec) {
  const P = (deg, len) => {
    const a = (deg * Math.PI) / 180;
    return [(100 + len * Math.sin(a)).toFixed(1), (100 - len * Math.cos(a)).toFixed(1)];
  };
  let s = `<svg viewBox="0 0 200 200" class="fig clock"><circle cx="100" cy="100" r="92" class="face"/>`;
  for (let i = 0; i < 60; i++) {
    const [x1, y1] = P(i * 6, i % 5 ? 84 : 77), [x2, y2] = P(i * 6, 89);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${i % 5 ? 'tk' : 'tk5'}"/>`;
  }
  for (let i = 1; i <= 12; i++) {
    const [x, y] = P(i * 30, 64);
    s += `<text x="${x}" y="${(+y + 7).toFixed(1)}" class="num">${i}</text>`;
  }
  const hand = (deg, len, cls) => { const [x, y] = P(deg, len); return `<line x1="100" y1="100" x2="${x}" y2="${y}" class="${cls}"/>`; };
  s += hand(((h % 12) + m / 60) * 30, 45, 'hh') + hand(m * 6 + sec / 10, 68, 'mh') + hand(sec * 6, 80, 'sh');
  return s + `<circle cx="100" cy="100" r="5" class="pin"/></svg>`;
}

// 선분 / 반직선 / 직선 (0,1,2)
function lineFig(type) {
  const arrowR = (x) => `<polygon points="${x},60 ${x - 12},53 ${x - 12},67" class="ink"/>`;
  const arrowL = (x) => `<polygon points="${x},60 ${x + 12},53 ${x + 12},67" class="ink"/>`;
  let s = `<svg viewBox="0 0 240 100" class="fig line">`;
  if (type === 0) s += `<line x1="50" y1="60" x2="190" y2="60" class="stroke"/>`;
  if (type === 1) s += `<line x1="50" y1="60" x2="222" y2="60" class="stroke"/>${arrowR(232)}`;
  if (type === 2) s += `<line x1="18" y1="60" x2="222" y2="60" class="stroke"/>${arrowL(8)}${arrowR(232)}`;
  s += `<circle cx="50" cy="60" r="5" class="ink"/><circle cx="190" cy="60" r="5" class="ink"/>`;
  s += `<text x="50" y="40" class="lbl">ㄱ</text><text x="190" y="40" class="lbl">ㄴ</text>`;
  return s + '</svg>';
}

// 도형: rect, square, rtri(직각삼각형), tri(직각 없는 삼각형)
function shapeFig(kind) {
  let pts;
  if (kind === 'rect') {
    let w, h;
    do { w = R(110, 190); h = R(50, 100); } while (Math.abs(w - h) < 35);
    pts = [[120 - w / 2, 70 - h / 2], [120 + w / 2, 70 - h / 2], [120 + w / 2, 70 + h / 2], [120 - w / 2, 70 + h / 2]];
  } else if (kind === 'square') {
    const a = R(70, 110);
    pts = [[120 - a / 2, 70 - a / 2], [120 + a / 2, 70 - a / 2], [120 + a / 2, 70 + a / 2], [120 - a / 2, 70 + a / 2]];
  } else if (kind === 'rtri') {
    const w = R(90, 170), h = R(70, 110), L = 120 - w / 2, B = 70 + h / 2;
    pts = Math.random() < 0.5 ? [[L, B], [L, B - h], [L + w, B]] : [[L + w, B], [L + w, B - h], [L, B]];
  } else {
    pts = [[R(25, 45), 120], [R(195, 215), 120], [R(70, 160), R(15, 35)]];
  }
  return `<svg viewBox="0 0 240 140" class="fig shape"><polygon points="${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" class="poly"/></svg>`;
}

// 원 (반지름 표시)
function circleFig(label, isDiameter) {
  let s = `<svg viewBox="0 0 240 150" class="fig circ"><circle cx="120" cy="75" r="62" class="poly"/><circle cx="120" cy="75" r="4" class="ink"/>`;
  if (isDiameter) s += `<line x1="58" y1="75" x2="182" y2="75" class="stroke"/><text x="120" y="66" class="lbl">${label}</text>`;
  else s += `<line x1="120" y1="75" x2="182" y2="75" class="stroke"/><text x="151" y="66" class="lbl">${label}</text>`;
  return s + `<text x="112" y="96" class="lbl sm">ㅇ</text></svg>`;
}

// 같은 크기 원 k개를 이어 붙인 그림
function circlesRow(k) {
  const r = 26, W = k * 2 * r + 20;
  let s = `<svg viewBox="0 0 ${W} 90" class="fig circ">`;
  for (let i = 0; i < k; i++) s += `<circle cx="${10 + r + i * 2 * r}" cy="40" r="${r}" class="poly"/><circle cx="${10 + r + i * 2 * r}" cy="40" r="3" class="ink"/>`;
  s += `<line x1="10" y1="40" x2="${W - 10}" y2="40" class="stroke"/>`;
  s += `<text x="10" y="84" class="lbl">ㄱ</text><text x="${W - 10}" y="84" class="lbl">ㄴ</text>`;
  return s + '</svg>';
}

// 물건 그림 (나눗셈, 분수만큼 문제)
const items = (icon, n, group) => {
  if (!group) return `<div class="items">${icon.repeat(n)}</div>`;
  let s = '<div class="items grouped">';
  for (let i = 0; i < n / group; i++) s += `<span class="grp">${icon.repeat(group)}</span>`;
  return s + '</div>';
};

// 그림그래프
function picGraph(theme, vals) {
  let s = `<div class="pg"><div class="pg-title">${theme.title}</div><table>`;
  theme.cats.forEach((c, i) => {
    const v = vals[i];
    s += `<tr><th>${c}</th><td>${`<span class="big">${theme.icon}</span>`.repeat(Math.floor(v / 10))}${`<span class="small">${theme.icon}</span>`.repeat(v % 10)}</td></tr>`;
  });
  s += `</table><div class="pg-legend"><span class="big">${theme.icon}</span> 10${theme.unit} &nbsp; <span class="small">${theme.icon}</span> 1${theme.unit}</div></div>`;
  return s;
}
