// 블록 아바타 (직접 그린 오리지널 캐릭터) + 상점 아이템
const K = '#1e293b'; // 외곽선 색

const ITEMS = {
  skin: [
    { id: 'sk_yellow', name: '노랑', price: 0, c: '#f8d34a' },
    { id: 'sk_peach', name: '살구', price: 0, c: '#f6c7a1' },
    { id: 'sk_brown', name: '갈색', price: 0, c: '#a8714a' },
    { id: 'sk_zombie', name: '좀비', price: 150, c: '#7cc576' },
    { id: 'sk_alien', name: '외계인', price: 200, c: '#7db8f0' },
    { id: 'sk_robot', name: '로봇', price: 300, c: '#b8c2cc', robot: true },
    { id: 'sk_gold', name: '황금', price: 600, c: '#ffcf3f', shine: true },
  ],
  shirt: [
    { id: 'sh_blue', name: '파랑 티', price: 0, c: '#3b82f6' },
    { id: 'sh_red', name: '빨강 티', price: 0, c: '#ef4444' },
    { id: 'sh_green', name: '초록 티', price: 40, c: '#22c55e' },
    { id: 'sh_purple', name: '보라 티', price: 60, c: '#8b5cf6' },
    { id: 'sh_bolt', name: '번개 티', price: 150, c: '#1f2937', deco: 'bolt' },
    { id: 'sh_star', name: '별 티', price: 150, c: '#0ea5e9', deco: 'star' },
    { id: 'sh_pi', name: '수학왕 티', price: 300, c: '#f97316', deco: 'pi' },
  ],
  pants: [
    { id: 'pa_black', name: '검정 바지', price: 0, c: '#334155' },
    { id: 'pa_jean', name: '청바지', price: 0, c: '#3a5a92' },
    { id: 'pa_red', name: '빨강 바지', price: 50, c: '#b91c1c' },
    { id: 'pa_white', name: '흰 바지', price: 50, c: '#e5e7eb' },
    { id: 'pa_green', name: '초록 바지', price: 50, c: '#15803d' },
  ],
  hat: [
    { id: 'h_none', name: '없음', price: 0 },
    { id: 'h_cap', name: '야구 모자', price: 60 },
    { id: 'h_party', name: '파티 모자', price: 80 },
    { id: 'h_cat', name: '고양이 귀', price: 120 },
    { id: 'h_top', name: '마술사 모자', price: 150 },
    { id: 'h_helmet', name: '기사 투구', price: 220 },
    { id: 'h_crown', name: '왕관', price: 500 },
  ],
  face: [
    { id: 'f_smile', name: '웃음', price: 0 },
    { id: 'f_wink', name: '윙크', price: 50 },
    { id: 'f_cool', name: '선글라스', price: 150 },
    { id: 'f_star', name: '별 눈', price: 200 },
  ],
  back: [
    { id: 'b_none', name: '없음', price: 0 },
    { id: 'b_cape', name: '영웅 망토', price: 120 },
    { id: 'b_jet', name: '제트팩', price: 250 },
    { id: 'b_wings', name: '천사 날개', price: 300 },
  ],
  pet: [
    { id: 'p_none', name: '없음', price: 0 },
    { id: 'p_slime', name: '슬라임', price: 200 },
    { id: 'p_dog', name: '강아지', price: 300 },
    { id: 'p_cat', name: '고양이', price: 300 },
    { id: 'p_dragon', name: '아기 드래곤', price: 700 },
  ],
};
const CATS = [['hat', '🎩 모자'], ['face', '😎 얼굴'], ['shirt', '👕 티셔츠'], ['pants', '👖 바지'], ['skin', '🎨 피부'], ['back', '🦸 등'], ['pet', '🐾 펫']];
const DEFAULT_EQ = { skin: 'sk_yellow', shirt: 'sh_blue', pants: 'pa_black', hat: 'h_none', face: 'f_smile', back: 'b_none', pet: 'p_none' };
const item = (cat, id) => ITEMS[cat].find((i) => i.id === id) || ITEMS[cat][0];

const starPts = (cx, cy, r) => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
    p.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(' ');
};
const S2 = `stroke="${K}" stroke-width="2.5" stroke-linejoin="round"`;

function drawBack(id) {
  if (id === 'b_cape') return `<path d="M36 64 L84 64 L96 132 L24 132 Z" fill="#dc2626" ${S2}/>`;
  if (id === 'b_wings') return `<path d="M36 72 C8 46 -4 72 2 98 C14 90 24 96 36 90 Z" fill="#fff" ${S2}/><path d="M84 72 C112 46 124 72 118 98 C106 90 96 96 84 90 Z" fill="#fff" ${S2}/>`;
  if (id === 'b_jet') return `<rect x="26" y="64" width="12" height="32" rx="3" fill="#94a3b8" ${S2}/><rect x="82" y="64" width="12" height="32" rx="3" fill="#94a3b8" ${S2}/><polygon points="27,97 37,97 32,114" fill="#fb923c" class="flame"/><polygon points="83,97 93,97 88,114" fill="#fb923c" class="flame"/>`;
  return '';
}

function drawHat(id) {
  switch (id) {
    case 'h_cap': return `<rect x="38" y="13" width="44" height="14" rx="6" fill="#ef4444" ${S2}/><rect x="62" y="22" width="30" height="6" rx="3" fill="#ef4444" ${S2}/>`;
    case 'h_party': return `<polygon points="46,24 60,-4 74,24" fill="#a855f7" ${S2}/><path d="M52 14 L68 14 M56 5 L64 5" stroke="#facc15" stroke-width="3"/><circle cx="60" cy="-5" r="4.5" fill="#facc15" ${S2}/>`;
    case 'h_cat': return `<polygon points="39,28 43,4 58,22" fill="#fb923c" ${S2}/><polygon points="81,28 77,4 62,22" fill="#fb923c" ${S2}/><polygon points="44,22 45,12 52,20" fill="#fda4af"/><polygon points="76,22 75,12 68,20" fill="#fda4af"/>`;
    case 'h_top': return `<rect x="34" y="18" width="52" height="6" rx="2" fill="${K}"/><rect x="44" y="-6" width="32" height="25" fill="${K}"/><rect x="44" y="11" width="32" height="5" fill="#dc2626"/>`;
    case 'h_helmet': return `<path d="M36 42 L36 27 Q60 4 84 27 L84 42 Z" fill="#cbd5e1" ${S2}/><path d="M60 8 Q74 -4 80 6" stroke="#dc2626" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="58" y="14" width="4" height="26" fill="#94a3b8"/>`;
    case 'h_crown': return `<polygon points="39,25 39,6 49,16 60,0 71,16 81,6 81,25" fill="#facc15" ${S2}/><circle cx="60" cy="18" r="3.5" fill="#ef4444"/><circle cx="47" cy="20" r="2.5" fill="#3b82f6"/><circle cx="73" cy="20" r="2.5" fill="#22c55e"/>`;
  }
  return '';
}

function drawFace(faceId, expr, skin) {
  let eyes;
  if (faceId === 'f_cool') eyes = `<rect x="44" y="33" width="14" height="9" rx="2" fill="${K}"/><rect x="62" y="33" width="14" height="9" rx="2" fill="${K}"/><rect x="57" y="35" width="6" height="2.5" fill="${K}"/><rect x="47" y="35" width="4" height="2" fill="#fff" opacity=".7"/>`;
  else if (faceId === 'f_star') eyes = `<polygon points="${starPts(52, 38, 6.5)}" fill="#facc15" stroke="${K}" stroke-width="1.5"/><polygon points="${starPts(68, 38, 6.5)}" fill="#facc15" stroke="${K}" stroke-width="1.5"/>`;
  else if (expr === 'sad') eyes = `<ellipse cx="52" cy="39" rx="3" ry="3.5" fill="${K}"/><ellipse cx="68" cy="39" rx="3" ry="3.5" fill="${K}"/><path d="M47 32 L56 34 M73 32 L64 34" stroke="${K}" stroke-width="2"/>`;
  else if (faceId === 'f_wink') eyes = `<path d="M48 39 Q52 34 56 39" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/><ellipse cx="68" cy="38" rx="3" ry="4" fill="${K}"/>`;
  else eyes = `<ellipse cx="52" cy="38" rx="3" ry="4" fill="${K}"/><ellipse cx="68" cy="38" rx="3" ry="4" fill="${K}"/><circle cx="53" cy="36.5" r="1" fill="#fff"/><circle cx="69" cy="36.5" r="1" fill="#fff"/>`;
  let mouth;
  if (expr === 'sad') mouth = `<path d="M52 52 Q60 45 68 52" stroke="${K}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  else if (expr === 'wow') mouth = `<ellipse cx="60" cy="50" rx="4" ry="5" fill="${K}"/>`;
  else mouth = `<path d="M51 47 Q60 56 69 47 Z" fill="${K}"/><path d="M55 51 Q60 54 65 51" fill="#f87171"/>`;
  const blush = expr !== 'sad' ? `<ellipse cx="46" cy="47" rx="3.5" ry="2" fill="#f87171" opacity=".35"/><ellipse cx="74" cy="47" rx="3.5" ry="2" fill="#f87171" opacity=".35"/>` : '';
  return eyes + mouth + blush;
}

function drawShirtDeco(deco) {
  if (deco === 'bolt') return `<polygon points="63,66 52,83 59,83 55,98 69,78 62,78 67,66" fill="#facc15" stroke="${K}" stroke-width="1.2"/>`;
  if (deco === 'star') return `<polygon points="${starPts(60, 81, 11)}" fill="#fff" stroke="${K}" stroke-width="1.2"/>`;
  if (deco === 'pi') return `<text x="60" y="91" text-anchor="middle" font-family="Jua, sans-serif" font-size="26" fill="#fff" stroke="${K}" stroke-width="1">π</text>`;
  return '';
}

function drawPet(id) {
  const eyes = (x1, x2, y) => `<rect x="${x1}" y="${y}" width="3.5" height="4.5" rx="1" fill="${K}"/><rect x="${x2}" y="${y}" width="3.5" height="4.5" rx="1" fill="${K}"/>`;
  switch (id) {
    case 'p_slime': return `<g class="pet"><rect x="106" y="116" width="34" height="28" rx="9" fill="#4ade80" fill-opacity=".9" ${S2}/><rect x="111" y="120" width="8" height="5" rx="2" fill="#fff" opacity=".7"/>${eyes(115, 127, 127)}<path d="M118 136 Q123 139 128 136" stroke="${K}" stroke-width="2" fill="none"/></g>`;
    case 'p_dog': return `<g class="pet"><rect x="112" y="128" width="28" height="15" rx="3" fill="#c08457" ${S2}/><rect x="104" y="108" width="26" height="23" rx="4" fill="#d4a373" ${S2}/><rect x="101" y="108" width="7" height="14" rx="2" fill="#7c4a2d" ${S2}/><rect x="126" y="108" width="7" height="14" rx="2" fill="#7c4a2d" ${S2}/>${eyes(110, 120, 115)}<rect x="114" y="123" width="6" height="4" rx="2" fill="${K}"/></g>`;
    case 'p_cat': return `<g class="pet"><polygon points="106,114 108,100 116,111" fill="#fb923c" ${S2}/><polygon points="134,114 132,100 124,111" fill="#fb923c" ${S2}/><rect x="104" y="110" width="32" height="26" rx="5" fill="#fb923c" ${S2}/><path d="M108 118 L114 118 M126 118 L132 118" stroke="#c2410c" stroke-width="2"/>${eyes(112, 125, 121)}<path d="M116 130 Q120 133 124 130" stroke="${K}" stroke-width="2" fill="none"/></g>`;
    case 'p_dragon': return `<g class="pet"><polygon points="124,118 146,104 140,128" fill="#c084fc" ${S2}/><rect x="102" y="110" width="32" height="28" rx="6" fill="#8b5cf6" ${S2}/><polygon points="106,111 109,98 114,110" fill="#facc15" ${S2}/><polygon points="130,111 127,98 122,110" fill="#facc15" ${S2}/><rect x="106" y="128" width="24" height="7" rx="3" fill="#ddd6fe"/>${eyes(110, 123, 118)}</g>`;
  }
  return '';
}

// eq: 착용 아이템, expr: happy | sad | wow
function avatarSVG(eq, expr = 'happy', withPet = true) {
  const skin = item('skin', eq.skin), shirt = item('shirt', eq.shirt), pants = item('pants', eq.pants);
  const hasPet = withPet && eq.pet && eq.pet !== 'p_none';
  const W = hasPet ? 150 : 120;
  const sc = skin.c;
  let s = `<svg viewBox="-2 -10 ${W + 2} 160" class="avsvg" xmlns="http://www.w3.org/2000/svg">`;
  s += `<ellipse cx="60" cy="145" rx="34" ry="5" fill="#000" opacity=".12"/>`;
  s += drawBack(eq.back);
  // 다리
  s += `<rect x="35" y="99" width="24" height="42" rx="2" fill="${pants.c}" ${S2}/><rect x="61" y="99" width="24" height="42" rx="2" fill="${pants.c}" ${S2}/>`;
  s += `<rect x="35" y="135" width="24" height="7" fill="${K}"/><rect x="61" y="135" width="24" height="7" fill="${K}"/>`;
  // 팔
  s += `<rect x="19" y="63" width="15" height="36" rx="3" fill="${sc}" ${S2}/><rect x="86" y="63" width="15" height="36" rx="3" fill="${sc}" ${S2}/>`;
  s += `<rect x="19" y="63" width="15" height="14" rx="3" fill="${shirt.c}" ${S2}/><rect x="86" y="63" width="15" height="14" rx="3" fill="${shirt.c}" ${S2}/>`;
  // 몸통
  s += `<rect x="34" y="62" width="52" height="40" rx="4" fill="${shirt.c}" ${S2}/>` + drawShirtDeco(shirt.deco);
  // 머리
  s += `<rect x="38" y="20" width="44" height="42" rx="9" fill="${sc}" ${S2}/>`;
  if (skin.robot) s += `<rect x="58" y="10" width="4" height="10" fill="${K}"/><circle cx="60" cy="9" r="4" fill="#ef4444" ${S2}/><rect x="34" y="34" width="5" height="12" rx="1" fill="#64748b"/><rect x="81" y="34" width="5" height="12" rx="1" fill="#64748b"/>`;
  if (skin.shine) s += `<rect x="43" y="24" width="8" height="5" rx="2" fill="#fff" opacity=".8"/><polygon points="${starPts(84, 16, 5)}" fill="#fff" class="sparkle"/>`;
  s += drawFace(eq.face, expr, sc);
  s += drawHat(eq.hat);
  if (hasPet) s += drawPet(eq.pet);
  return s + '</svg>';
}
