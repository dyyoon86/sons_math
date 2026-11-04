// 3학년 2학기 6개 단원
const divExplain = (n, d) => {
  const q = Math.floor(n / d), r = n % d;
  return `${n} ÷ ${d} = <b>${q}</b>${r ? ` … <b>${r}</b>` : ''}<br>확인: ${d} × ${q}${r ? ` + ${r}` : ''} = ${n}`;
};

UNITS.push({
  id: '2-1', sem: 2, no: 1, title: '곱셈', emoji: '✖️',
  learn: [
    { t: '(세 자리 수) × (한 자리 수)', b: `<div class="ex">${col(234, 3, '×')}<div class="ex-a">= 702</div></div><p>일의 자리 4×3=12 → 2를 쓰고 1을 올려요.<br>십의 자리 3×3=9, 9+1=10 → 0을 쓰고 1을 올려요.<br>백의 자리 2×3=6, 6+1=7</p>` },
    { t: '(몇십) × (몇십)', b: `<p>30 × 40 → 3 × 4 = 12 를 계산하고 <b>0을 두 개</b> 붙여요 → <b>1200</b></p><p>(몇십몇) × (몇십)도 같아요. 23 × 30 → 23 × 3 = 69 → <b>690</b></p>` },
    { t: '(몇십몇) × (몇십몇)', b: `<p>36 × 24 는 36 × 4 와 36 × 20 으로 나눠서 더해요.</p><p>36 × 4 = 144<br>36 × 20 = 720<br>144 + 720 = <b>864</b></p><div class="ex">${col(36, 24, '×')}<div class="ex-a">= 864</div></div>` },
  ],
  tip: '두 자리×두 자리는 "일의 자리 곱하기 → 십의 자리 곱하기(한 칸 왼쪽, 0 자리) → 더하기" 3단계예요. 칸을 맞춰 쓰는 게 가장 많이 틀리는 부분이니 모눈 공책을 쓰면 좋아요. 계산 전에 "30×20이니까 600쯤" 하고 어림하게 해 주세요.',
  gen() {
    const t = R(0, 6);
    if (t <= 1) { const a = R(102, 999), b = R(2, 9); return { q: '곱셈을 해 보세요.', visual: col(a, b, '×'), layout: '{0}', answers: [a * b], hint: '일의 자리부터 곱하고 올림을 잊지 마세요.', explain: `${a} × ${b} = <b>${a * b}</b>` }; }
    if (t === 2) { const a = R(1, 9) * 10, b = R(1, 9) * 10; return { q: '곱셈을 해 보세요.', visual: `<div class="big-eq">${a} × ${b} = ?</div>`, layout: '{0}', answers: [a * b], hint: `${a / 10} × ${b / 10} 를 계산하고 0을 두 개 붙여요.`, explain: `${a / 10} × ${b / 10} = ${(a / 10) * (b / 10)} → 0 두 개 → <b>${a * b}</b>` }; }
    if (t === 3) {
      if (Math.random() < 0.5) { const a = R(11, 99), b = R(2, 9) * 10; return { q: '곱셈을 해 보세요.', visual: `<div class="big-eq">${a} × ${b} = ?</div>`, layout: '{0}', answers: [a * b], hint: `${a} × ${b / 10} 를 계산하고 0을 붙여요.`, explain: `${a} × ${b / 10} = ${a * (b / 10)} → <b>${a * b}</b>` }; }
      const a = R(2, 9), b = R(11, 99); return { q: '곱셈을 해 보세요.', visual: `<div class="big-eq">${a} × ${b} = ?</div>`, layout: '{0}', answers: [a * b], hint: `${b} × ${a} 와 같아요.`, explain: `${a} × ${b} = ${b} × ${a} = <b>${a * b}</b>` };
    }
    if (t <= 5) {
      const a = R(12, 98), b = R(12, 98), o = b % 10, ten = b - o;
      return { q: '곱셈을 해 보세요.', visual: col(a, b, '×'), layout: '{0}', answers: [a * b], hint: `${a} × ${o} 와 ${a} × ${ten} 을 따로 구해서 더해요.`, explain: `${a} × ${o} = ${a * o}<br>${a} × ${ten} = ${a * ten}<br>${a * o} + ${a * ten} = <b>${a * b}</b>` };
    }
    const a = R(12, 45), b = R(12, 30);
    const [txt, u] = pick([
      [`한 봉지에 귤이 ${a}개씩 들어 있어요. ${b}봉지에는 귤이 모두 몇 개인가요?`, '개'],
      [`한 줄에 의자가 ${a}개씩 ${b}줄 있어요. 의자는 모두 몇 개인가요?`, '개'],
      [`하루에 책을 ${a}쪽씩 ${b}일 동안 읽었어요. 모두 몇 쪽을 읽었나요?`, '쪽'],
    ]);
    return { q: txt, layout: `{0} ${u}`, answers: [a * b], hint: '"~씩 ~번"은 곱셈이에요.', explain: `${a} × ${b} = <b>${a * b}</b>` };
  },
});

UNITS.push({
  id: '2-2', sem: 2, no: 2, title: '나눗셈', emoji: '➗',
  learn: [
    { t: '(몇십) ÷ (몇)', b: `<p>60 ÷ 3 → 6 ÷ 3 = 2 → <b>20</b></p><p>50 ÷ 2 처럼 딱 안 떨어지면 50을 40과 10으로 나눠요. 40 ÷ 2 = 20, 10 ÷ 2 = 5 → <b>25</b></p>` },
    { t: '나머지가 있는 나눗셈', b: `<p>사탕 14개를 3개씩 묶으면 4묶음이 되고 <b>2개가 남아요.</b></p><div class="ex">${items('🍬', 12, 3)}<div class="items">🍬🍬</div></div><p>14 ÷ 3 = 4 … 2 &nbsp; 4는 <b>몫</b>, 2는 <b>나머지</b>예요.</p><p>⭐ 나머지는 항상 <b>나누는 수보다 작아야</b> 해요!</p>` },
    { t: '세로로 나누기', b: `<div class="ex">${ldiv(87, 4)}</div><p>87 ÷ 4 : 높은 자리부터 나눠요.<br>8 ÷ 4 = 2 → 몫의 십의 자리 2<br>7 ÷ 4 = 1 … 3 → 몫의 일의 자리 1, 나머지 3<br>답: <b>21 … 3</b></p>` },
    { t: '맞는지 확인하기 (검산)', b: `<p><b>나누는 수 × 몫 + 나머지 = 나누어지는 수</b></p><p>87 ÷ 4 = 21 … 3 → 4 × 21 + 3 = 84 + 3 = 87 ✔️</p>` },
  ],
  tip: '나머지가 나누는 수보다 크거나 같으면 몫을 더 키워야 한다는 것을 꼭 체크하게 하세요. 답을 쓰면 매번 "나누는 수×몫+나머지"로 검산하는 습관을 들이면 스스로 틀린 걸 찾아요.',
  gen() {
    const t = R(0, 5);
    if (t === 0) {
      let n, d; do { n = R(2, 9) * 10; d = R(2, 9); } while (n % d !== 0 || n / d < 10);
      return { q: '나눗셈을 해 보세요.', visual: `<div class="big-eq">${n} ÷ ${d} = ?</div>`, layout: '{0}', answers: [n / d], hint: '10이 몇 개인지 생각하거나, 나누기 쉬운 두 수로 쪼개 봐요.', explain: divExplain(n, d) };
    }
    if (t === 1) {
      let n, d; do { n = R(24, 99); d = R(2, 9); } while (n % d !== 0 || n / d < 10);
      return { q: '나눗셈을 해 보세요.', visual: ldiv(n, d), layout: '몫: {0}', answers: [n / d], hint: '십의 자리부터 나눠요.', explain: divExplain(n, d) };
    }
    if (t === 2) {
      let n, d; do { n = R(11, 99); d = R(2, 9); } while (n % d === 0);
      return { q: '몫과 나머지를 구해 보세요.', visual: ldiv(n, d), layout: '몫: {0} &nbsp; 나머지: {1}', answers: [Math.floor(n / d), n % d], hint: '나머지는 나누는 수보다 작아야 해요.', explain: divExplain(n, d) };
    }
    if (t === 3) {
      const n = R(100, 999), d = R(2, 9);
      return { q: '몫과 나머지를 구해 보세요. (나머지가 없으면 0)', visual: ldiv(n, d), layout: '몫: {0} &nbsp; 나머지: {1}', answers: [Math.floor(n / d), n % d], hint: '백의 자리부터 차례로 나눠요.', explain: divExplain(n, d) };
    }
    if (t === 4) {
      let n, d; do { n = R(20, 99); d = R(3, 9); } while (n % d === 0);
      const [thing, u, g] = pick([['사탕', '개', '봉지'], ['연필', '자루', '묶음'], ['구슬', '개', '주머니']]);
      return { q: `${thing} ${n}${u}를 한 ${g}에 ${d}${u}씩 담으면 몇 ${g}가 되고, 몇 ${u}가 남나요?`, layout: `{0} ${g}, 남는 ${thing} {1} ${u}`, answers: [Math.floor(n / d), n % d], hint: `${n} ÷ ${d} 를 계산해요.`, explain: divExplain(n, d) };
    }
    const d = R(3, 9), q = R(4, 15), r = R(1, d - 1), n = d * q + r;
    return { q: '어떤 수를 나눈 결과를 보고 어떤 수를 구해요.', visual: `<div class="big-eq">□ ÷ ${d} = ${q} … ${r}</div>`, layout: '□ = {0}', answers: [n], hint: '나누는 수 × 몫 + 나머지 = 나누어지는 수', explain: `${d} × ${q} + ${r} = <b>${n}</b>` };
  },
});

UNITS.push({
  id: '2-3', sem: 2, no: 3, title: '원', emoji: '⭕',
  learn: [
    { t: '원의 중심과 반지름', b: `<div class="ex">${circleFig('반지름', false)}</div><p>원의 한가운데 점 ㅇ이 <b>원의 중심</b>이에요. 원의 중심과 원 위의 한 점을 이은 선분이 <b>반지름</b>이에요.</p><p>한 원에서 반지름은 <b>모두 길이가 같아요.</b></p>` },
    { t: '지름', b: `<div class="ex">${circleFig('지름', true)}</div><p>원 위의 두 점을 이은 선분이 <b>원의 중심을 지날 때</b>, 그 선분이 <b>지름</b>이에요.</p><p>⭐ <b>지름 = 반지름 × 2</b><br>지름은 원을 똑같이 둘로 나누고, 원 안에 그을 수 있는 가장 긴 선분이에요.</p>` },
    { t: '컴퍼스로 원 그리기', b: `<p>1. 원의 중심이 될 점을 찍어요.<br>2. 컴퍼스를 <b>반지름만큼</b> 벌려요.<br>3. 침을 중심에 꽂고 한 바퀴 돌려요.</p><p>반지름이 3 cm인 원 → 컴퍼스를 3 cm 벌려요.</p>` },
  ],
  tip: '컴퍼스를 직접 써 보는 게 제일 좋아요(처음엔 손잡이만 잡고 돌리기가 어려워요). "같은 원 여러 개를 이어 붙인 길이" 문제가 시험에 자주 나와요. 원 하나에 지름 하나, 그래서 지름×개수라는 것을 그림에 직접 그어 보며 설명해 주세요.',
  gen() {
    const t = R(0, 4);
    if (t === 0) { const r = R(2, 15); return { q: `반지름이 ${r} cm인 원의 지름은 몇 cm인가요?`, visual: circleFig(`${r} cm`, false), layout: '{0} cm', answers: [r * 2], hint: '지름은 반지름의 2배예요.', explain: `${r} × 2 = <b>${r * 2} cm</b>` }; }
    if (t === 1) { const d = R(2, 15) * 2; return { q: `지름이 ${d} cm인 원의 반지름은 몇 cm인가요?`, visual: circleFig(`${d} cm`, true), layout: '{0} cm', answers: [d / 2], hint: '반지름은 지름의 절반이에요.', explain: `${d} ÷ 2 = <b>${d / 2} cm</b>` }; }
    if (t === 2) {
      const k = R(2, 5), r = R(2, 8);
      return { q: `반지름이 ${r} cm인 원 ${k}개를 이어 붙였어요. 선분 ㄱㄴ의 길이는 몇 cm인가요?`, visual: circlesRow(k), layout: '{0} cm', answers: [2 * r * k], hint: `선분 ㄱㄴ은 지름 ${k}개의 길이와 같아요.`, explain: `지름 = ${r} × 2 = ${2 * r} cm<br>${2 * r} × ${k} = <b>${2 * r * k} cm</b>` };
    }
    if (t === 3) { const r = R(2, 12); return { q: `정사각형 안에 꼭 맞게 원을 그렸어요. 원의 반지름이 ${r} cm이면 정사각형의 한 변은 몇 cm인가요?`, visual: `<svg viewBox="0 0 140 140" class="fig circ"><rect x="10" y="10" width="120" height="120" class="poly"/><circle cx="70" cy="70" r="60" class="poly"/><circle cx="70" cy="70" r="3" class="ink"/><line x1="70" y1="70" x2="130" y2="70" class="stroke"/></svg>`, layout: '{0} cm', answers: [r * 2], hint: '정사각형의 한 변은 원의 지름과 같아요.', explain: `한 변 = 지름 = ${r} × 2 = <b>${r * 2} cm</b>` }; }
    return OX([
      ['한 원에서 지름은 반지름의 2배예요.', true, '지름 = 반지름 × 2 예요.'],
      ['한 원에서 반지름은 모두 길이가 같아요.', true, '원의 중심에서 원 위의 어느 점까지나 거리가 같아요.'],
      ['한 원에는 원의 중심이 여러 개 있어요.', false, '원의 중심은 딱 하나예요.'],
      ['지름은 원을 똑같이 둘로 나눠요.', true, '지름은 중심을 지나서 원을 반으로 나눠요.'],
      ['원 안에 그을 수 있는 가장 긴 선분은 반지름이에요.', false, '가장 긴 선분은 지름이에요.'],
      ['한 원에서 지름은 하나만 그을 수 있어요.', false, '지름은 셀 수 없이 많이 그을 수 있어요.'],
      ['컴퍼스는 반지름만큼 벌려서 원을 그려요.', true, '침과 연필 사이 거리가 반지름이에요.'],
    ]);
  },
});

UNITS.push({
  id: '2-4', sem: 2, no: 4, title: '분수와 소수', emoji: '🍰',
  learn: [
    { t: '묶음을 분수로', b: `<p>사과 12개를 4개씩 묶으면 3묶음이에요.</p><div class="ex">${items('🍎', 12, 4)}</div><p>8개는 3묶음 중 2묶음 → 12의 ${F(2, 3)}</p>` },
    { t: '분수만큼은 얼마?', b: `<p>12의 ${F(1, 3)} → 12를 3묶음으로 나눈 1묶음 → <b>4</b><br>12의 ${F(2, 3)} → 2묶음 → 4 × 2 = <b>8</b></p><p>⭐ 전체 ÷ 분모 × 분자</p>` },
    { t: '진분수, 가분수, 대분수', b: `<p><b>진분수</b>: 분자 &lt; 분모 &nbsp; ${F(3, 5)}<br><b>가분수</b>: 분자 ≥ 분모 &nbsp; ${F(7, 5)}, ${F(5, 5)}<br><b>대분수</b>: 자연수 + 진분수 &nbsp; ${F(2, 5, 1)}</p><p>${F(7, 5)} = ${F(5, 5)} + ${F(2, 5)} = 1 + ${F(2, 5)} = ${F(2, 5, 1)}</p>` },
    { t: '1보다 큰 소수', b: `<p>0.1이 23개 → <b>2.3</b> (이 점 삼)<br>2.3 = 2 + 0.3</p><p>소수 비교: 자연수 부분부터 비교하고, 같으면 소수 부분을 비교해요.<br>2.7 &gt; 2.4 &nbsp; 3.1 &gt; 2.9</p>` },
  ],
  tip: '"12의 2/3"은 바둑돌 12개를 실제로 3묶음으로 나눠서 2묶음을 가져가게 하면 금방 이해해요. 가분수↔대분수는 "분모만큼 모이면 1"이라는 말을 반복해 주세요. 7/5 → 5개 모이면 1, 2개 남음 → 1과 2/5.',
  gen() {
    const t = R(0, 8);
    if (t <= 1) {
      const k = t === 0 ? R(2, 6) : R(3, 6), j = t === 0 ? 1 : R(2, k - 1), g = R(2, 6), n = k * g;
      const [icon, thing] = pick([['🍎', '사과'], ['🍪', '쿠키'], ['⚽', '공'], ['🍬', '사탕']]);
      return { q: `${thing} ${n}개의 ${F(j, k)}은 몇 개인가요?`, visual: n <= 30 ? items(icon, n, g) : '', layout: '{0} 개', answers: [g * j], hint: `${n}개를 ${k}묶음으로 똑같이 나눠 봐요. 한 묶음은 몇 개일까요?`, explain: `${n} ÷ ${k} = ${g} (한 묶음)<br>${g} × ${j} = <b>${g * j}개</b>` };
    }
    if (t === 2) {
      const d = R(2, 9), w = R(1, 4), num = R(1, d - 1), p = w * d + num;
      return { q: `${F(p, d)}를 대분수로 나타내 보세요.`, layout: `<span class="mixed">{0}<span class="frac in"><span>{1}</span><span>${d}</span></span></span>`, answers: [w, num], hint: `분모 ${d}개가 모이면 1이에요. ${p}에 ${d}가 몇 번 들어가나요?`, explain: `${p} ÷ ${d} = ${w} … ${num} → ${F(num, d, w)}` };
    }
    if (t === 3) {
      const d = R(2, 9), w = R(1, 4), num = R(1, d - 1), p = w * d + num;
      return { q: `${F(num, d, w)}을 가분수로 나타내 보세요.`, layout: `<span class="frac in"><span>{0}</span><span>${d}</span></span>`, answers: [p], hint: `자연수 1 = ${F(d, d)} 예요.`, explain: `${w} = ${F(w * d, d)} → ${w * d} + ${num} = ${p} → ${F(p, d)}` };
    }
    if (t === 4) {
      const kind = R(0, 2), d = R(3, 9);
      const html = kind === 0 ? F(R(1, d - 1), d) : kind === 1 ? F(R(d, d * 2 + 2), d) : F(R(1, d - 1), d, R(1, 4));
      const names = ['진분수', '가분수', '대분수'];
      return { q: '이 분수는 어떤 분수인가요?', visual: `<div class="big-eq">${html}</div>`, choices: names, ans: names[kind], hint: '분자와 분모를 비교하고, 앞에 자연수가 있는지 봐요.', explain: ['분자가 분모보다 작아서 진분수예요.', '분자가 분모와 같거나 커서 가분수예요.', '자연수와 진분수로 되어 있어서 대분수예요.'][kind] };
    }
    if (t === 5) {
      const d = R(3, 8), w = R(1, 3), num = R(1, d - 1), mixedV = w * d + num;
      let p; do { p = R(d + 1, d * 4); } while (p % d === 0 && Math.random() < 0.5);
      const ans = p > mixedV ? '>' : p < mixedV ? '<' : '=';
      return { q: '알맞은 기호를 골라요.', visual: `<div class="big-eq">${F(p, d)} ○ ${F(num, d, w)}</div>`, choices: ['>', '<', '='], ans, hint: '대분수를 가분수로 바꿔서 분자끼리 비교해요.', explain: `${F(num, d, w)} = ${F(mixedV, d)} 이니까 ${F(p, d)} ${ans === '>' ? '&gt;' : ans === '<' ? '&lt;' : '='} ${F(num, d, w)}` };
    }
    if (t === 6) { let k; do { k = R(11, 99); } while (k % 10 === 0); return { q: `0.1이 ${k}개인 수는 얼마인가요?`, layout: '{0}', answers: [k / 10], hint: '0.1이 10개면 1이에요.', explain: `0.1이 ${k}개 → <b>${fx(k / 10)}</b>` }; }
    if (t === 7) { let k; do { k = R(11, 99); } while (k % 10 === 0); return { q: `${fx(k / 10)}은 0.1이 몇 개인가요?`, layout: '{0} 개', answers: [k], hint: '1은 0.1이 10개예요.', explain: `${Math.floor(k / 10)}은 0.1이 ${Math.floor(k / 10) * 10}개, 0.${k % 10}은 0.1이 ${k % 10}개 → <b>${k}개</b>` }; }
    let a, b; do { a = R(11, 99); b = R(11, 99); } while (a === b || a % 10 === 0 || b % 10 === 0);
    return { q: '알맞은 기호를 골라요.', visual: `<div class="big-eq">${fx(a / 10)} ○ ${fx(b / 10)}</div>`, choices: ['>', '<'], ans: a > b ? '>' : '<', hint: '자연수 부분부터 비교해요.', explain: `${fx(a / 10)} ${a > b ? '&gt;' : '&lt;'} ${fx(b / 10)}` };
  },
});

UNITS.push({
  id: '2-5', sem: 2, no: 5, title: '들이와 무게', emoji: '⚖️',
  learn: [
    { t: '들이: L와 mL', b: `<p>그릇에 담을 수 있는 양을 <b>들이</b>라고 해요. 🥛</p><p><b>1 L = 1000 mL</b> (리터, 밀리리터)<br>1 L 500 mL = 1500 mL<br>2300 mL = 2 L 300 mL</p><p>생수 큰 병은 약 2 L, 우유 작은 팩은 200 mL예요.</p>` },
    { t: '무게: kg, g, t', b: `<p><b>1 kg = 1000 g</b> (킬로그램, 그램)<br><b>1 t = 1000 kg</b> (톤)</p><p>사과 한 개는 약 300 g, 3학년 어린이는 약 30 kg, 트럭은 몇 t이에요. 🚚</p>` },
    { t: '들이와 무게의 덧셈·뺄셈', b: `<p>같은 단위끼리 계산해요. mL(g)끼리 더해서 1000이 넘으면 1 L(1 kg)로 올려요.</p><p>1 L 700 mL + 2 L 500 mL = 3 L 1200 mL = <b>4 L 200 mL</b></p><p>뺄 때 모자라면 1 L를 1000 mL로 바꿔 와요.<br>3 kg 200 g - 1 kg 500 g = 2 kg 1200 g - 1 kg 500 g = <b>1 kg 700 g</b></p>` },
  ],
  tip: '부엌이 최고의 교실이에요. 계량컵, 우유팩, 페트병에 적힌 mL를 읽어 보고, 주방 저울로 과일 무게를 어림한 뒤 재 보게 하세요. 받아올림, 받아내림 단위가 10이 아니라 1000이라는 점을 강조해 주세요.',
  gen() {
    const t = R(0, 8);
    const L = pick([['L', 'mL', '들이'], ['kg', 'g', '무게']]);
    const [big, small] = L;
    if (t <= 1) { const a = R(1, 9), b = R(1, 99) * 10; return { q: `${a} ${big} ${b} ${small}는 몇 ${small}인가요?`, layout: `{0} ${small}`, answers: [a * 1000 + b], hint: `1 ${big} = 1000 ${small} 예요.`, explain: `${a} ${big} = ${a * 1000} ${small} → ${a * 1000} + ${b} = <b>${a * 1000 + b} ${small}</b>` }; }
    if (t <= 3) { const n = R(1, 9) * 1000 + R(1, 99) * 10; return { q: `${n} ${small}는 몇 ${big} 몇 ${small}인가요?`, layout: `{0} ${big} {1} ${small}`, answers: [Math.floor(n / 1000), n % 1000], hint: `1000 ${small}가 1 ${big}예요.`, explain: `<b>${Math.floor(n / 1000)} ${big} ${n % 1000} ${small}</b>` }; }
    if (t === 4) {
      const a = R(1, 5) * 1000 + R(1, 99) * 10, b = R(1, 4) * 1000 + R(1, 99) * 10, s = a + b;
      const f = (x) => `${Math.floor(x / 1000)} ${big} ${x % 1000} ${small}`;
      return { q: '덧셈을 해 보세요.', visual: `<div class="big-eq">${f(a)} + ${f(b)}</div>`, layout: `{0} ${big} {1} ${small}`, answers: [Math.floor(s / 1000), s % 1000], hint: `${small}끼리 더해서 1000이 넘으면 1 ${big}로 올려요.`, explain: `<b>${f(s)}</b>` };
    }
    if (t === 5) {
      let a, b; do { a = R(2, 8) * 1000 + R(1, 99) * 10; b = R(1, 5) * 1000 + R(1, 99) * 10; } while (a - b < 100);
      const f = (x) => `${Math.floor(x / 1000)} ${big} ${x % 1000} ${small}`, s = a - b;
      return { q: '뺄셈을 해 보세요.', visual: `<div class="big-eq">${f(a)} - ${f(b)}</div>`, layout: `{0} ${big} {1} ${small}`, answers: [Math.floor(s / 1000), s % 1000], hint: `${small}끼리 뺄 수 없으면 1 ${big}를 1000 ${small}로 바꿔 와요.`, explain: `<b>${f(s)}</b>` };
    }
    if (t === 6) { const a = R(1, 9); return Math.random() < 0.5 ? { q: `${a} t은 몇 kg인가요?`, layout: '{0} kg', answers: [a * 1000], hint: '1 t = 1000 kg 예요.', explain: `<b>${a * 1000} kg</b>` } : { q: `${a * 1000} kg은 몇 t인가요?`, layout: '{0} t', answers: [a], hint: '1000 kg = 1 t 예요.', explain: `<b>${a} t</b>` }; }
    if (t === 7) {
      const [thing, ans, ch] = pick([
        ['생수 큰 병 한 개의 들이', '2 L', ['2 mL', '2 L', '200 L']],
        ['우유 작은 팩 한 개의 들이', '200 mL', ['200 mL', '200 L', '2 mL']],
        ['욕조에 가득 찬 물의 들이', '200 L', ['200 mL', '2 L', '200 L']],
        ['사과 한 개의 무게', '300 g', ['300 g', '300 kg', '3 t']],
        ['3학년 어린이의 몸무게', '30 kg', ['30 g', '30 kg', '30 t']],
        ['큰 트럭 한 대의 무게', '10 t', ['10 g', '10 kg', '10 t']],
        ['연필 한 자루의 무게', '5 g', ['5 g', '5 kg', '5 t']],
      ]);
      return { q: `${thing}로 가장 알맞은 것은?`, choices: ch, ans, hint: '집에 있는 물건을 떠올려 봐요.', explain: `${thing}는 약 <b>${ans}</b>예요.` };
    }
    const a = R(2, 7) * 100, b = R(2, 7) * 100;
    const [txt, u] = pick([[`물통에 물이 ${a} mL 있어요. ${b} mL를 더 부었어요. 물은 모두 몇 mL인가요?`, 'mL'], [`바구니의 무게는 ${a} g, 바구니에 담은 귤의 무게는 ${b} g이에요. 모두 몇 g인가요?`, 'g']]);
    return { q: txt, layout: `{0} ${u}`, answers: [a + b], hint: '"모두"는 더하기예요.', explain: `${a} + ${b} = <b>${a + b} ${u}</b>` };
  },
});

const PG_THEMES = [
  { title: '마을별 사과 생산량', cats: ['가 마을', '나 마을', '다 마을', '라 마을'], icon: '🍎', unit: '상자', item: '사과 생산량' },
  { title: '학년별 우유 신청 학생 수', cats: ['1학년', '2학년', '3학년', '4학년'], icon: '🥛', unit: '명', item: '신청 학생' },
  { title: '좋아하는 운동별 학생 수', cats: ['축구', '야구', '농구', '수영'], icon: '🙋', unit: '명', item: '학생' },
  { title: '과수원별 귤 수확량', cats: ['해님', '달님', '별님', '구름'], icon: '🍊', unit: '상자', item: '귤 수확량' },
];

UNITS.push({
  id: '2-6', sem: 2, no: 6, title: '그림그래프', emoji: '📊',
  learn: [
    { t: '그림그래프란?', b: `<p>알고 싶은 수를 <b>그림</b>으로 나타낸 그래프예요. 큰 그림과 작은 그림으로 수를 나타내요.</p>${picGraph(PG_THEMES[0], [32, 25, 41, 18])}<p>가 마을: 큰 그림 3개(30) + 작은 그림 2개(2) = <b>32상자</b></p>` },
    { t: '그림그래프 읽기', b: `<p>1. 큰 그림, 작은 그림이 각각 얼마를 나타내는지 먼저 봐요.<br>2. 큰 그림이 많을수록 수가 커요.<br>3. 가장 많은 것, 가장 적은 것을 한눈에 알 수 있어요.</p><p>위 그래프에서 가장 많은 곳: <b>다 마을(41)</b><br>가장 적은 곳: <b>라 마을(18)</b></p>` },
    { t: '그림그래프 그리기', b: `<p>1. 조사한 내용을 표로 정리해요.<br>2. 그림을 몇 가지로 나타낼지 정해요 (10, 1).<br>3. 각 수를 큰 그림, 작은 그림으로 나타내요.<br>4. 제목을 써요.</p>` },
  ],
  tip: '가족이 좋아하는 과일, 이번 주 날씨 같은 것을 직접 조사해서 그림그래프를 그려 보면 재미있어해요. 큰 그림=10, 작은 그림=1 약속을 먼저 확인하게 하는 습관이 중요해요.',
  gen() {
    const th = pick(PG_THEMES);
    const vals = []; while (vals.length < 4) { const v = R(11, 58); if (!vals.includes(v)) vals.push(v); }
    const vis = picGraph(th, vals), t = R(0, 4);
    if (t <= 1) { const i = R(0, 3); return { q: `${th.cats[i]}의 ${th.item}은 몇 ${th.unit}인가요?`, visual: vis, layout: `{0} ${th.unit}`, answers: [vals[i]], hint: '큰 그림은 10, 작은 그림은 1이에요.', explain: `큰 그림 ${Math.floor(vals[i] / 10)}개 = ${Math.floor(vals[i] / 10) * 10}, 작은 그림 ${vals[i] % 10}개 = ${vals[i] % 10} → <b>${vals[i]}${th.unit}</b>` }; }
    const mx = vals.indexOf(Math.max(...vals)), mn = vals.indexOf(Math.min(...vals));
    if (t === 2) { const most = Math.random() < 0.5; const i = most ? mx : mn; return { q: `${th.item}이 가장 ${most ? '많은' : '적은'} 곳은 어디인가요?`, visual: vis, choices: th.cats, ans: th.cats[i], hint: '큰 그림 수부터 비교해요.', explain: `<b>${th.cats[i]}</b> (${vals[i]}${th.unit})` }; }
    if (t === 3) { const s = vals.reduce((a, b) => a + b, 0); return { q: `${th.item}은 모두 몇 ${th.unit}인가요?`, visual: vis, layout: `{0} ${th.unit}`, answers: [s], hint: '각각 몇인지 구해서 모두 더해요.', explain: `${vals.join(' + ')} = <b>${s}${th.unit}</b>` }; }
    return { q: `가장 많은 곳은 가장 적은 곳보다 몇 ${th.unit} 더 많나요?`, visual: vis, layout: `{0} ${th.unit}`, answers: [vals[mx] - vals[mn]], hint: '가장 많은 수와 가장 적은 수를 찾아서 빼요.', explain: `${th.cats[mx]} ${vals[mx]} - ${th.cats[mn]} ${vals[mn]} = <b>${vals[mx] - vals[mn]}${th.unit}</b>` };
  },
});
