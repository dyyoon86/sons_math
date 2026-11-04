// 3학년 1학기 6개 단원 (2022 개정 교육과정)
// 문제 형식: { q, visual?, layout, answers }  또는  { q, visual?, choices, ans }  + hint, explain
const FRAC_IN = '<span class="frac in"><span>{0}</span><span>{1}</span></span>';
const OX = (facts) => {
  const [text, isO, why] = pick(facts);
  return { q: `맞으면 O, 틀리면 X를 골라요.<div class="say">${text}</div>`, choices: ['O', 'X'], ans: isO ? 'O' : 'X', hint: '배운 뜻을 다시 떠올려 봐요.', explain: why };
};

const UNITS = [];

UNITS.push({
  id: '1-1', sem: 1, no: 1, title: '덧셈과 뺄셈', emoji: '➕',
  learn: [
    { t: '세 자리 수의 덧셈', b: `일의 자리부터 차례로 더해요. 같은 자리끼리 더한 값이 10이 넘으면 바로 윗자리로 <b>1을 받아올림</b>해요.<div class="ex">${col(456, 278, '+')}<div class="ex-a">= 734</div></div><p>일의 자리 6+8=14 → 4를 쓰고 1을 올려요.<br>십의 자리 1+5+7=13 → 3을 쓰고 1을 올려요.<br>백의 자리 1+4+2=7</p>` },
    { t: '세 자리 수의 뺄셈', b: `일의 자리부터 빼요. 뺄 수 없으면 바로 윗자리에서 <b>10을 받아내림</b>해요.<div class="ex">${col(523, 287, '-')}<div class="ex-a">= 236</div></div><p>일의 자리 3에서 7을 못 빼니까 십의 자리에서 10을 빌려 13-7=6<br>십의 자리 1에서 8을 못 빼니까 백의 자리에서 10을 빌려 11-8=3<br>백의 자리 4-2=2</p>` },
    { t: '어림하기', b: `계산하기 전에 대충 얼마쯤인지 생각해 보면 실수를 줄일 수 있어요.<p>398 + 203 → 약 400 + 200 = <b>약 600</b><br>그러니까 답이 6000이나 60이 나오면 틀린 거예요!</p>` },
  ],
  tip: '받아올림한 1을 작게 위에 써 두는 습관을 들이면 실수가 확 줄어요. 틀렸을 때는 답만 고쳐 주지 말고 "어느 자리에서 틀렸는지" 같이 찾아보세요. 계산 전에 어림을 먼저 말하게 하면 검산 습관이 생겨요.',
  gen() {
    const t = R(0, 9);
    if (t < 4) {
      let a, b;
      if (t === 0) { a = R(1, 4) * 100 + R(0, 4) * 10 + R(0, 4); b = R(1, 4) * 100 + R(0, 5) * 10 + R(0, 5); }
      else { a = R(105, 899); b = R(105, 899); }
      return { q: '덧셈을 해 보세요.', visual: col(a, b, '+'), layout: '{0}', answers: [a + b], hint: '일의 자리부터 더하고, 10이 넘으면 윗자리로 1을 올려요.', explain: `${a} + ${b} = <b>${a + b}</b>` };
    }
    if (t < 8) {
      const a = R(200, 999), b = R(101, a - 1);
      return { q: '뺄셈을 해 보세요.', visual: col(a, b, '-'), layout: '{0}', answers: [a - b], hint: '일의 자리부터 빼고, 뺄 수 없으면 윗자리에서 10을 빌려와요.', explain: `${a} - ${b} = <b>${a - b}</b><br>확인: ${a - b} + ${b} = ${a}` };
    }
    if (t === 8) {
      const a = R(120, 600), b = R(120, 600);
      const [txt, u] = pick([
        [`줄넘기를 어제 ${a}번, 오늘 ${b}번 했어요. 모두 몇 번 했나요?`, '번'],
        [`도서관에 동화책이 ${a}권, 과학책이 ${b}권 있어요. 책은 모두 몇 권인가요?`, '권'],
        [`우리 학교 남학생은 ${a}명, 여학생은 ${b}명이에요. 모두 몇 명인가요?`, '명'],
      ]);
      return { q: txt, layout: `{0} ${u}`, answers: [a + b], hint: '"모두"는 더하기예요.', explain: `${a} + ${b} = <b>${a + b}</b>` };
    }
    const a = R(300, 900), b = R(110, a - 50);
    const [txt, u] = pick([
      [`색종이 ${a}장 중에서 ${b}장을 썼어요. 남은 색종이는 몇 장인가요?`, '장'],
      [`과수원에서 사과를 ${a}개 땄어요. 그중 ${b}개를 팔았어요. 남은 사과는 몇 개인가요?`, '개'],
      [`줄넘기를 형은 ${a}번, 동생은 ${b}번 했어요. 형은 동생보다 몇 번 더 했나요?`, '번'],
    ]);
    return { q: txt, layout: `{0} ${u}`, answers: [a - b], hint: '"남은 것", "더 많은 것"은 빼기예요.', explain: `${a} - ${b} = <b>${a - b}</b>` };
  },
});

UNITS.push({
  id: '1-2', sem: 1, no: 2, title: '평면도형', emoji: '📐',
  learn: [
    { t: '선분, 반직선, 직선', b: `<div class="ex">${lineFig(0)}</div><p><b>선분 ㄱㄴ</b>: 두 점을 곧게 이은 선. 양쪽 끝이 있어요.</p><div class="ex">${lineFig(1)}</div><p><b>반직선 ㄱㄴ</b>: 한 점에서 시작해서 한쪽으로 끝없이 늘인 선. 시작점을 먼저 읽어요.</p><div class="ex">${lineFig(2)}</div><p><b>직선 ㄱㄴ</b>: 양쪽으로 끝없이 늘인 곧은 선.</p>` },
    { t: '각과 직각', b: `<p>한 점에서 그은 두 반직선으로 이루어진 도형을 <b>각</b>이라고 해요. 그 점은 <b>꼭짓점</b>, 두 반직선은 <b>변</b>이에요.</p><p>종이를 반으로 접고 한 번 더 접으면 생기는 각이 <b>직각</b>이에요. 책 모서리, 창문 모서리가 모두 직각이에요! 📏</p>` },
    { t: '직각삼각형', b: `<div class="ex">${shapeFig('rtri')}</div><p>한 각이 직각인 삼각형이 <b>직각삼각형</b>이에요. 직각이 딱 <b>1개</b> 있어요.</p>` },
    { t: '직사각형과 정사각형', b: `<div class="ex">${shapeFig('rect')}${shapeFig('square')}</div><p><b>직사각형</b>: 네 각이 모두 직각인 사각형.<br><b>정사각형</b>: 네 각이 모두 직각이고 <b>네 변의 길이도 모두 같은</b> 사각형.</p><p>정사각형은 직사각형이라고 할 수 있지만, 직사각형은 정사각형이라고 할 수 없어요.</p>` },
  ],
  tip: '집 안에서 직각 찾기 놀이를 해 보세요(책, 문, 타일). A4 종이를 두 번 접어 "직각 자"를 만들어 대 보게 하면 직각 판단이 쉬워져요. 정사각형⊂직사각형 관계는 "정사각형은 특별한 직사각형"이라고 설명하면 잘 이해해요.',
  gen() {
    const t = R(0, 4);
    if (t === 0) {
      const k = R(0, 2), names = ['선분 ㄱㄴ', '반직선 ㄱㄴ', '직선 ㄱㄴ'];
      const why = ['양쪽 끝이 점에서 끝나니까 선분이에요.', 'ㄱ에서 시작해 ㄴ 쪽으로 끝없이 늘어나니까 반직선 ㄱㄴ이에요.', '양쪽으로 끝없이 늘어나니까 직선이에요.'];
      return { q: '이 도형의 이름은 무엇일까요?', visual: lineFig(k), choices: names, ans: names[k], hint: '양 끝을 잘 보세요. 끝이 있나요, 화살표가 있나요?', explain: why[k] };
    }
    if (t === 1) {
      const kind = pick(['rect', 'square', 'rtri', 'tri']);
      const n = { rect: 4, square: 4, rtri: 1, tri: 0 }[kind];
      return { q: '이 도형에서 직각은 모두 몇 개일까요?', visual: shapeFig(kind), layout: '{0} 개', answers: [n], hint: '종이 모서리를 대 보듯이 각 꼭짓점을 하나씩 살펴봐요.', explain: { rect: '직사각형은 네 각이 모두 직각이라 4개예요.', square: '정사각형은 네 각이 모두 직각이라 4개예요.', rtri: '직각삼각형은 직각이 1개예요.', tri: '이 삼각형에는 직각이 없어요.' }[kind] };
    }
    if (t === 2) {
      const kind = pick(['rect', 'square', 'rtri']);
      const name = { rect: '직사각형', square: '정사각형', rtri: '직각삼각형' }[kind];
      return { q: '이 도형의 이름으로 가장 알맞은 것은?', visual: shapeFig(kind), choices: ['직각삼각형', '직사각형', '정사각형'], ans: name, hint: '변이 몇 개인지, 네 변의 길이가 같은지 보세요.', explain: { rect: '네 각이 직각이고, 긴 변과 짧은 변이 있어서 직사각형이에요.', square: '네 각이 직각이고 네 변의 길이가 같아서 정사각형이에요.', rtri: '한 각이 직각인 삼각형이라서 직각삼각형이에요.' }[kind] };
    }
    if (t === 3) {
      const kind = pick(['rect', 'rtri', 'tri', 'square']);
      const what = pick(['꼭짓점', '변']);
      const n = kind === 'rtri' || kind === 'tri' ? 3 : 4;
      return { q: `이 도형의 ${what}은 몇 개일까요?`, visual: shapeFig(kind), layout: '{0} 개', answers: [n], hint: what === '꼭짓점' ? '뾰족한 모서리 점을 세어 봐요.' : '곧은 선을 세어 봐요.', explain: `${n === 3 ? '삼각형' : '사각형'}은 ${what}이 ${n}개예요.` };
    }
    return OX([
      ['정사각형은 직사각형이라고 할 수 있어요.', true, '정사각형도 네 각이 모두 직각이니까 직사각형이에요.'],
      ['직사각형은 모두 정사각형이에요.', false, '직사각형은 네 변의 길이가 다를 수 있어서 정사각형이 아닐 수 있어요.'],
      ['직선은 양쪽으로 끝없이 늘어나요.', true, '직선은 양쪽 끝이 없어요.'],
      ['선분은 한쪽으로 끝없이 늘어나요.', false, '선분은 두 점을 이은 선이라 양쪽 끝이 있어요. 한쪽으로 끝없는 것은 반직선이에요.'],
      ['반직선 ㄱㄴ과 반직선 ㄴㄱ은 같아요.', false, '반직선은 시작점이 달라요. ㄱㄴ은 ㄱ에서, ㄴㄱ은 ㄴ에서 시작해요.'],
      ['직각삼각형에는 직각이 1개 있어요.', true, '직각삼각형은 한 각이 직각이에요.'],
      ['각은 한 점에서 그은 두 반직선으로 이루어져요.', true, '맞아요. 그 점을 꼭짓점이라고 해요.'],
      ['정사각형은 네 변의 길이가 모두 같아요.', true, '정사각형의 특징이에요.'],
    ]);
  },
});

UNITS.push({
  id: '1-3', sem: 1, no: 3, title: '나눗셈', emoji: '➗',
  learn: [
    { t: '똑같이 나누기', b: `<p>사탕 12개를 3명에게 똑같이 나누면 한 명에게 4개씩이에요.</p><div class="ex">${items('🍬', 12, 4)}</div><p>이것을 <b>12 ÷ 3 = 4</b> 라고 써요. "12 나누기 3은 4와 같습니다."<br>12는 <b>나누어지는 수</b>, 3은 <b>나누는 수</b>, 4는 <b>몫</b>이에요.</p>` },
    { t: '묶어 세기', b: `<p>사탕 12개를 3개씩 묶으면 4묶음이 돼요.</p><div class="ex">${items('🍬', 12, 3)}</div><p>이것도 <b>12 ÷ 3 = 4</b> 예요. 12에서 3을 4번 빼면 0이 돼요.</p>` },
    { t: '곱셈과 나눗셈은 친구', b: `<p><b>3 × 4 = 12</b> 이면<br>→ 12 ÷ 3 = 4<br>→ 12 ÷ 4 = 3</p><p>그래서 나눗셈의 몫은 <b>곱셈구구</b>로 찾아요!<br>24 ÷ 6 = □ → 6 × □ = 24 → 6 × 4 = 24 → 몫은 4</p>` },
  ],
  tip: '구구단이 흔들리면 나눗셈이 안 돼요. 몫이 바로 안 나오면 "6 곱하기 몇이 24지?"처럼 곱셈으로 바꿔 묻는 연습을 해 주세요. 바둑돌이나 과자로 직접 나눠 보는 게 개념 이해에 가장 좋아요.',
  gen() {
    const d = R(2, 9), q = R(2, 9), n = d * q;
    const t = R(0, 5);
    if (t <= 1) return { q: '나눗셈의 몫을 구해 보세요.', visual: `<div class="big-eq">${n} ÷ ${d} = ?</div>`, layout: '{0}', answers: [q], hint: `${d} × □ = ${n} 에서 □를 찾아요.`, explain: `${d} × ${q} = ${n} 이니까 ${n} ÷ ${d} = <b>${q}</b>` };
    if (t === 2) return { q: '□ 안에 알맞은 수를 써요.', layout: `${d} × {0} = ${n} &nbsp;→&nbsp; ${n} ÷ ${d} = {1}`, answers: [q, q], hint: '곱셈구구에서 찾아봐요.', explain: `${d} × ${q} = ${n} 이니까 ${n} ÷ ${d} = ${q}` };
    if (t === 3) {
      const [icon, thing, u] = pick([['🍬', '사탕', '개'], ['🍪', '쿠키', '개'], ['✏️', '연필', '자루']]);
      return { q: `${thing} ${n}${u}를 ${d}명에게 똑같이 나누어 주면 한 명에게 몇 ${u}씩 줄 수 있나요?`, visual: n <= 36 ? items(icon, n) : '', layout: `{0} ${u}`, answers: [q], hint: '똑같이 나누기는 나눗셈이에요.', explain: `${n} ÷ ${d} = <b>${q}</b> (${u})` };
    }
    if (t === 4) {
      const [icon, thing, u, g] = pick([['🍓', '딸기', '개', '접시'], ['🌸', '꽃', '송이', '다발'], ['🍎', '사과', '개', '봉지']]);
      return { q: `${thing} ${n}${u}를 한 ${g}에 ${d}${u}씩 담으면 몇 ${g}가 되나요?`, visual: n <= 36 ? items(icon, n) : '', layout: `{0} ${g}`, answers: [q], hint: `${d}${u}씩 묶어 세어 봐요.`, explain: `${n} ÷ ${d} = <b>${q}</b> (${g})` };
    }
    return { q: '곱셈식을 보고 나눗셈식 두 개를 완성해요.', visual: `<div class="big-eq">${d} × ${q} = ${n}</div>`, layout: `${n} ÷ ${d} = {0} &nbsp;&nbsp; ${n} ÷ ${q} = {1}`, answers: [q, d], hint: '곱해서 나온 수를 나누면 곱했던 다른 수가 나와요.', explain: `${n} ÷ ${d} = ${q}, ${n} ÷ ${q} = ${d}` };
  },
});

UNITS.push({
  id: '1-4', sem: 1, no: 4, title: '곱셈', emoji: '✖️',
  learn: [
    { t: '(몇십) × (몇)', b: `<p>20 × 3 은 10이 2개씩 3묶음 → 10이 6개 → <b>60</b></p><p>2 × 3 = 6 을 계산하고 끝에 <b>0을 붙이면</b> 돼요!</p>` },
    { t: '(몇십몇) × (몇)', b: `<p>23 × 3 은 20 × 3 과 3 × 3 을 따로 계산해서 더해요.</p><p>20 × 3 = 60, 3 × 3 = 9 → 60 + 9 = <b>69</b></p><div class="ex">${col(23, 3, '×')}<div class="ex-a">= 69</div></div>` },
    { t: '올림이 있는 곱셈', b: `<div class="ex">${col(47, 3, '×')}<div class="ex-a">= 141</div></div><p>일의 자리 7 × 3 = 21 → 1을 쓰고 2를 올려요.<br>십의 자리 4 × 3 = 12, 올린 2를 더해 14 → 14를 써요.<br>답: <b>141</b></p>` },
  ],
  tip: '올림한 숫자를 "작게 써 두고 더하기"를 꼭 습관으로 만들어 주세요. 23×3을 "20짜리 3개 + 3짜리 3개"로 쪼개 말하게 하면 원리를 이해하고, 2학기 두 자리×두 자리 곱셈도 쉬워져요.',
  gen() {
    const t = R(0, 5);
    if (t === 0) {
      const a = R(1, 9) * 10, b = R(2, 9);
      return { q: '곱셈을 해 보세요.', visual: `<div class="big-eq">${a} × ${b} = ?</div>`, layout: '{0}', answers: [a * b], hint: `${a / 10} × ${b} 를 계산하고 0을 붙여요.`, explain: `${a / 10} × ${b} = ${(a / 10) * b} → ${a} × ${b} = <b>${a * b}</b>` };
    }
    if (t <= 4) {
      let a, b;
      if (t === 1) { b = R(2, 4); a = R(1, Math.floor(9 / b)) * 10 + R(1, Math.floor(9 / b)); } else { a = R(12, 99); b = R(2, 9); }
      const tens = Math.floor(a / 10) * 10, ones = a % 10;
      return { q: '곱셈을 해 보세요.', visual: col(a, b, '×'), layout: '{0}', answers: [a * b], hint: '일의 자리부터 곱하고, 올림한 수를 잊지 마세요.', explain: `${tens} × ${b} = ${tens * b}, ${ones} × ${b} = ${ones * b}<br>${tens * b} + ${ones * b} = <b>${a * b}</b>` };
    }
    const a = R(12, 48), b = R(3, 9);
    const [txt, u] = pick([
      [`한 상자에 초콜릿이 ${a}개씩 들어 있어요. ${b}상자에는 모두 몇 개인가요?`, '개'],
      [`색연필이 한 통에 ${a}자루씩 있어요. ${b}통에는 모두 몇 자루인가요?`, '자루'],
      [`하루에 줄넘기를 ${a}번씩 ${b}일 동안 했어요. 모두 몇 번인가요?`, '번'],
    ]);
    return { q: txt, layout: `{0} ${u}`, answers: [a * b], hint: '"~씩 ~번"은 곱셈이에요.', explain: `${a} × ${b} = <b>${a * b}</b>` };
  },
});

UNITS.push({
  id: '1-5', sem: 1, no: 5, title: '길이와 시간', emoji: '⏱️',
  learn: [
    { t: '1 mm (밀리미터)', b: `<p>자에서 1 cm를 <b>10칸</b>으로 똑같이 나눈 작은 눈금 한 칸이 <b>1 mm</b>예요.</p><p><b>1 cm = 10 mm</b><br>3 cm 4 mm = 30 mm + 4 mm = <b>34 mm</b></p>` },
    { t: '1 km (킬로미터)', b: `<p>1000 m를 <b>1 km</b>라고 해요. 먼 거리를 잴 때 써요. 🚗</p><p><b>1 km = 1000 m</b><br>2 km 300 m = 2000 m + 300 m = <b>2300 m</b><br>4050 m = <b>4 km 50 m</b></p>` },
    { t: '1초', b: `<div class="ex">${clock(3, 20, 45)}</div><p>초바늘(빨간 바늘)이 작은 눈금 한 칸을 가는 시간이 <b>1초</b>예요. 초바늘이 한 바퀴 돌면 60초 = <b>1분</b>.</p><p>이 시계는 <b>3시 20분 45초</b>예요.</p>` },
    { t: '시간의 덧셈과 뺄셈', b: `<p>초는 초끼리, 분은 분끼리 계산해요.</p><p>2분 40초 + 1분 35초 = 3분 75초 → 75초 = 1분 15초 → <b>4분 15초</b></p><p>뺄 때 초가 모자라면 1분을 60초로 바꿔 와요.<br>5분 10초 - 2분 30초 = 4분 70초 - 2분 30초 = <b>2분 40초</b></p>` },
  ],
  tip: '실제 자로 연필, 지우개 길이를 "몇 cm 몇 mm"로 재 보게 하세요. 1 km는 "집에서 OO까지 정도"처럼 아는 장소로 감을 잡아 주면 좋아요. 시간 계산은 60에서 받아올림, 받아내림하는 게 핵심이에요. 10이 아니라 60이라는 걸 자주 확인해 주세요.',
  gen() {
    const t = R(0, 7);
    if (t === 0) { const a = R(1, 25), b = R(1, 9); return { q: `${a} cm ${b} mm는 몇 mm인가요?`, layout: '{0} mm', answers: [a * 10 + b], hint: '1 cm = 10 mm 예요.', explain: `${a} cm = ${a * 10} mm, ${a * 10} + ${b} = <b>${a * 10 + b} mm</b>` }; }
    if (t === 1) { let n; do { n = R(12, 309); } while (n % 10 === 0); return { q: `${n} mm는 몇 cm 몇 mm인가요?`, layout: '{0} cm {1} mm', answers: [Math.floor(n / 10), n % 10], hint: '10 mm가 1 cm예요.', explain: `${n} mm = <b>${Math.floor(n / 10)} cm ${n % 10} mm</b>` }; }
    if (t === 2) { const a = R(1, 9), b = R(1, 99) * 10; return { q: `${a} km ${b} m는 몇 m인가요?`, layout: '{0} m', answers: [a * 1000 + b], hint: '1 km = 1000 m 예요.', explain: `${a} km = ${a * 1000} m, ${a * 1000} + ${b} = <b>${a * 1000 + b} m</b>` }; }
    if (t === 3) { const n = R(1, 9) * 1000 + R(1, 99) * 10; return { q: `${n} m는 몇 km 몇 m인가요?`, layout: '{0} km {1} m', answers: [Math.floor(n / 1000), n % 1000], hint: '1000 m가 1 km예요.', explain: `${n} m = <b>${Math.floor(n / 1000)} km ${n % 1000} m</b>` }; }
    if (t <= 5) {
      const h = R(1, 12), m = R(0, 59), s = R(0, 59);
      return { q: '시계가 나타내는 시각을 써 보세요.', visual: clock(h, m, s), layout: '{0} 시 {1} 분 {2} 초', answers: [h, m, s], hint: '짧은 바늘은 시, 긴 바늘은 분, 빨간 바늘은 초예요. 작은 눈금 1칸이 1분(1초)이에요.', explain: `<b>${h}시 ${m}분 ${s}초</b>` };
    }
    if (t === 6) {
      const m1 = R(1, 9), s1 = R(15, 55), m2 = R(1, 9), s2 = R(15, 55);
      const tot = (m1 + m2) * 60 + s1 + s2;
      return { q: '시간의 합을 구해 보세요.', visual: `<div class="big-eq">${m1}분 ${s1}초 + ${m2}분 ${s2}초</div>`, layout: '{0} 분 {1} 초', answers: [Math.floor(tot / 60), tot % 60], hint: '초끼리 더해서 60초가 넘으면 1분으로 올려요.', explain: `초: ${s1} + ${s2} = ${s1 + s2}초${s1 + s2 >= 60 ? ` → 1분 ${s1 + s2 - 60}초` : ''}<br>답: <b>${Math.floor(tot / 60)}분 ${tot % 60}초</b>` };
    }
    let a, b;
    do { a = R(3, 9) * 60 + R(0, 59); b = R(1, 5) * 60 + R(0, 59); } while (a - b < 30);
    const d = a - b, A = [Math.floor(a / 60), a % 60], B = [Math.floor(b / 60), b % 60];
    return { q: '시간의 차를 구해 보세요.', visual: `<div class="big-eq">${A[0]}분 ${A[1]}초 - ${B[0]}분 ${B[1]}초</div>`, layout: '{0} 분 {1} 초', answers: [Math.floor(d / 60), d % 60], hint: '초끼리 뺄 수 없으면 1분을 60초로 바꿔 와요.', explain: `${A[1] < B[1] ? `${A[0]}분 ${A[1]}초 = ${A[0] - 1}분 ${A[1] + 60}초로 바꿔요.<br>` : ''}답: <b>${Math.floor(d / 60)}분 ${d % 60}초</b>` };
  },
});

UNITS.push({
  id: '1-6', sem: 1, no: 6, title: '분수와 소수', emoji: '🍕',
  learn: [
    { t: '분수', b: `<div class="ex">${bar(4, 3)}</div><p>전체를 <b>똑같이</b> 4로 나눈 것 중의 3을 ${F(3, 4)} 라고 쓰고 "4분의 3"이라고 읽어요.</p><p>아래 4는 <b>분모</b>(전체를 나눈 수), 위 3은 <b>분자</b>(색칠한 수)예요.</p>` },
    { t: '분수의 크기 비교', b: `<p><b>분모가 같으면</b> 분자가 클수록 커요.<br>${F(5, 7)} &gt; ${F(3, 7)}</p><p><b>단위분수</b>(분자가 1인 분수)는 분모가 <b>클수록 작아요!</b> 피자를 많은 사람이 나눌수록 한 조각이 작아지니까요. 🍕<br>${F(1, 3)} &gt; ${F(1, 8)}</p><div class="ex">${pie(3, 1)}${pie(8, 1)}</div>` },
    { t: '소수', b: `<p>${F(1, 10)}을 <b>0.1</b>이라 쓰고 "영 점 일"이라고 읽어요.<br>${F(7, 10)} = <b>0.7</b> (0.1이 7개)</p><p>3 cm 4 mm = <b>3.4 cm</b> (1 mm = 0.1 cm)</p>` },
    { t: '소수의 크기 비교', b: `<p>0.1이 몇 개인지 비교해요.<br>0.6은 0.1이 6개, 0.4는 0.1이 4개 → <b>0.6 &gt; 0.4</b></p>` },
  ],
  tip: '"똑같이" 나눠야 분수라는 점이 제일 중요해요. 피자, 케이크, 초콜릿 바로 실제 나눠 보며 "몇 분의 몇"을 말하게 하세요. 단위분수는 분모가 클수록 작다는 게 직관과 반대라 꼭 그림으로 확인시켜 주세요.',
  gen() {
    const t = R(0, 7);
    if (t <= 1) {
      const n = R(2, 10), k = R(1, n - 1), fig = n <= 8 && Math.random() < 0.5 ? pie(n, k) : bar(n, k);
      if (t === 0) return { q: '색칠한 부분은 전체의 얼마인가요?', visual: fig, layout: FRAC_IN, answers: [k, n], hint: '아래(분모)에는 전체 칸 수, 위(분자)에는 색칠한 칸 수를 써요.', explain: `전체 ${n}칸 중 ${k}칸 → ${F(k, n)}` };
      return { q: '색칠하지 <u>않은</u> 부분은 전체의 얼마인가요?', visual: fig, layout: FRAC_IN, answers: [n - k, n], hint: '흰 칸을 세어 봐요.', explain: `전체 ${n}칸 중 흰 칸 ${n - k}칸 → ${F(n - k, n)}` };
    }
    if (t === 2) {
      const d = R(3, 12); let a, b; do { a = R(1, d - 1); b = R(1, d - 1); } while (a === b);
      return { q: '알맞은 기호를 골라요.', visual: `<div class="big-eq">${F(a, d)} ○ ${F(b, d)}</div>`, choices: ['>', '<'], ans: a > b ? '>' : '<', hint: '분모가 같으면 분자를 비교해요.', explain: `분모가 ${d}로 같으니 분자 ${a}와 ${b}를 비교해요. ${F(a, d)} ${a > b ? '&gt;' : '&lt;'} ${F(b, d)}` };
    }
    if (t === 3) {
      let a, b; do { a = R(2, 12); b = R(2, 12); } while (a === b);
      return { q: '알맞은 기호를 골라요.', visual: `<div class="big-eq">${F(1, a)} ○ ${F(1, b)}</div>`, choices: ['>', '<'], ans: a < b ? '>' : '<', hint: '단위분수는 분모가 클수록 작아요. 피자를 생각해 봐요!', explain: `분모가 작을수록 한 조각이 커요. ${F(1, a)} ${a < b ? '&gt;' : '&lt;'} ${F(1, b)}` };
    }
    if (t === 4) { const k = R(1, 9); return { q: '소수로 나타내 보세요.', visual: `<div class="big-eq">${F(k, 10)} = ?</div>`, layout: '{0}', answers: [k / 10], hint: `${F(1, 10)} = 0.1 이에요.`, explain: `${F(k, 10)}은 0.1이 ${k}개 → <b>0.${k}</b>` }; }
    if (t === 5) { const k = R(1, 9); return { q: `0.1이 ${k}개인 수는 얼마인가요?`, layout: '{0}', answers: [k / 10], hint: '0.1이 1개면 0.1, 2개면 0.2 ...', explain: `<b>0.${k}</b>` }; }
    if (t === 6) { const a = R(1, 15), b = R(1, 9); return { q: '□ 안에 알맞은 수를 써요.', visual: `<div class="big-eq">${a} cm ${b} mm = □ cm</div>`, layout: '{0} cm', answers: [a + b / 10], hint: '1 mm = 0.1 cm 예요.', explain: `${b} mm = 0.${b} cm → <b>${a}.${b} cm</b>` }; }
    let a, b; do { a = R(1, 9); b = R(1, 9); } while (a === b);
    return { q: '알맞은 기호를 골라요.', visual: `<div class="big-eq">0.${a} ○ 0.${b}</div>`, choices: ['>', '<'], ans: a > b ? '>' : '<', hint: '0.1이 몇 개인지 비교해요.', explain: `0.${a}는 0.1이 ${a}개, 0.${b}는 0.1이 ${b}개 → 0.${a} ${a > b ? '&gt;' : '&lt;'} 0.${b}` };
  },
});
