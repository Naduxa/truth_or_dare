/* v1 — Truth or Dare 18+ mini app */
const tg = window.Telegram?.WebApp;
if (tg){ tg.expand(); tg.setHeaderColor('#0e0f12'); tg.setBackgroundColor('#0e0f12'); }

/* Наборы: можно менять под себя. По умолчанию — флирт без графичности. */
const TRUTHS = [
  "Что тебя заводит быстрее всего в партнёре?",
  "Какая твоя любимая форма нежности и где именно?",
  "Что тебе хочется попробовать, но пока не решалась?",
  "Топ-3 места для поцелуев у тебя?",
  "Расскажи о самом горячем комплименте, который тебя зацепил.",
  "Какой запах ты считаешь самым притягательным?"
];

const DARES = [
  "Скажи партнёру один дерзкий комплимент и посмотри в глаза 5 секунд.",
  "Проведи кончиками пальцев по линии шеи партнёра очень медленно.",
  "Поцелуй партнёра в любое место выше пояса (на твой выбор).",
  "Нашепчи на ушко фантазию в одном предложении.",
  "Обними крепко и не отпускай 10 секунд.",
  "Сделай 3 мягких поцелуя подряд там, где захочет партнёр."
];

/* (Опционально) Подхват пользовательских фраз из phrases.json, если положишь рядом */
let CUSTOM = null;
(async () => {
  try{
    const r = await fetch('./phrases.json?v=1', {cache:'no-store'});
    if (r.ok) CUSTOM = await r.json();
  }catch(e){}
})();
function pickTruth(){ const src = CUSTOM?.truths?.length ? CUSTOM.truths : TRUTHS; return src[Math.floor(Math.random()*src.length)]; }
function pickDare(){ const src = CUSTOM?.dares?.length ? CUSTOM.dares : DARES; return src[Math.floor(Math.random()*src.length)]; }

const choice = document.getElementById('choice');
const cardWrap = document.getElementById('cardWrap');
const cardHead = document.getElementById('cardHead');
const cardBody = document.getElementById('cardBody');
const truthBtn = document.getElementById('truthBtn');
const dareBtn = document.getElementById('dareBtn');
const nextBtn = document.getElementById('nextBtn');

function haptic(type="impact"){
  try{
    if (!tg || !tg.HapticFeedback) return;
    if (type==="impact") tg.HapticFeedback.impactOccurred("light");
    if (type==="success") tg.HapticFeedback.notificationOccurred("success");
  }catch(e){}
}

/* показать карточку выбранного типа */
function showCard(kind){
  // текст шапки
  if (kind === "truth"){ cardHead.textContent = "вопрос для тебя"; cardBody.textContent = pickTruth(); }
  else { cardHead.textContent = "сделай это"; cardBody.textContent = pickDare(); }

  // переключаем экраны
  choice.classList.add('hidden');
  cardWrap.classList.remove('hidden');
  cardWrap.classList.add('show-in');
}

/* вернуться на выбор */
function backToChoice(){
  cardWrap.classList.add('hidden');
  choice.classList.remove('hidden');
  choice.classList.add('show-in');
}

truthBtn.addEventListener('click', ()=>{ haptic("impact"); showCard("truth"); });
dareBtn.addEventListener('click', ()=>{ haptic("impact"); showCard("dare"); });
nextBtn.addEventListener('click', ()=>{ haptic("success"); backToChoice(); });
