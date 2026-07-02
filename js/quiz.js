let current = 0;
let userVec = [0,0,0,0,0,0];
let answers = new Array(QUESTIONS.length).fill(null);

const screenStart = document.getElementById('screen-start');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');
const repulgueEl = document.getElementById('repulgue');

// Función única para construir la barra de progreso con dimensiones correctas
function buildRepulgue(){
  repulgueEl.innerHTML = '';
  for(let i=0; i<QUESTIONS.length; i++){
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.classList.add('fold');
    svg.id = 'fold-'+i;
    svg.setAttribute('viewBox','0 0 60 28');
    svg.setAttribute('width','26');
    svg.setAttribute('height','12');
    svg.setAttribute('preserveAspectRatio','xMidYMid meet');
    svg.innerHTML = '<use href="#empanada-icon"/>';
    repulgueEl.appendChild(svg);
  }
}
buildRepulgue();

function updateRepulgue(){
  for(let i=0; i<QUESTIONS.length; i++){
    const f = document.getElementById('fold-'+i);
    f.classList.remove('done','current');
    if(i < current) f.classList.add('done');
    if(i === current) f.classList.add('current');
  }
}

function renderQuestion(){
  screenStart.classList.add('hidden');
  screenResult.classList.add('hidden');
  screenQuiz.classList.remove('hidden');
  updateRepulgue();

  const item = QUESTIONS[current];
  document.getElementById('qcount').textContent = `Pregunta ${current+1} de ${QUESTIONS.length}`;
  document.getElementById('qtext').textContent = item.q;

  const optsWrap = document.getElementById('qoptions');
  optsWrap.innerHTML = '';
  item.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.type = 'button';
    btn.textContent = opt.t;
    if(answers[current] === idx) btn.classList.add('picked');
    btn.addEventListener('click', () => selectOption(idx));
    optsWrap.appendChild(btn);
  });

  const backBtn = document.getElementById('btn-back');
  if(current === 0){ backBtn.classList.add('hidden'); }
  else { backBtn.classList.remove('hidden'); }
}

function selectOption(idx){
  if(answers[current] !== null){
    const prevD = QUESTIONS[current].opts[answers[current]].d;
    userVec = userVec.map((v,i) => v - prevD[i]);
  }
  answers[current] = idx;
  const d = QUESTIONS[current].opts[idx].d;
  userVec = userVec.map((v,i) => v + d[i]);

  setTimeout(() => {
    if(current < QUESTIONS.length - 1){
      current++;
      renderQuestion();
    } else {
      showResult();
    }
  }, 180);
}

document.getElementById('btn-back').addEventListener('click', () => {
  if(current > 0){
    current--;
    renderQuestion();
  }
});

document.getElementById('btn-start').addEventListener('click', () => {
  current = 0;
  renderQuestion();
});

function distance(a,b){
  let sum = 0;
  for(let i=0; i<a.length; i++){ sum += (a[i]-b[i])**2; }
  return Math.sqrt(sum);
}

function showResult(){
  screenQuiz.classList.add('hidden');
  screenResult.classList.remove('hidden');

  let best = null, bestDist = Infinity;
  EMPANADAS.forEach(e => {
    const dist = distance(userVec, e.vec);
    if(dist < bestDist){ bestDist = dist; best = e; }
  });

  const maxPossibleDist = 9.5;
  let pct = Math.round(100 - (bestDist / maxPossibleDist) * 45);
  pct = Math.max(62, Math.min(99, pct));

  // Inyección de imagen dinámica
  const rImg = document.getElementById('r-img');
  rImg.src = `src/${best.img}`;
  rImg.alt = `Empanada de ${best.name}`;
  
  document.getElementById('r-name').textContent = best.name;
  document.getElementById('r-match').textContent = `${pct}% de coincidencia`;
  document.getElementById('r-desc').textContent = best.desc;

  // Acción del botón copiar
  document.getElementById('btn-copy').onclick = () => {
    const text = `Según el test, soy empanada de ${best.name} (${pct}% de coincidencia). ¿Y tú? Descúbrelo aquí:`;
    navigator.clipboard?.writeText(text).then(() => {
      const btn = document.getElementById('btn-copy');
      const original = btn.textContent;
      btn.textContent = '¡Copiado!';
      setTimeout(() => btn.textContent = original, 1500);
    });
  };

  // Enlaces de compartir dinámicos
  const shareText = `¡Me salió que soy empanada de ${best.name} (${pct}% de coincidencia) en el test definitivo! ¿Y tú qué empanada eres?`;
  const shareUrl = window.location.href;

  document.getElementById('share-wa').href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  document.getElementById('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  document.getElementById('share-tw').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  window.scrollTo({top:0, behavior:'smooth'});
}

document.getElementById('btn-restart').addEventListener('click', () => {
  current = 0;
  userVec = [0,0,0,0,0,0];
  answers = new Array(QUESTIONS.length).fill(null);
  
  // Limpia el src anterior para evitar parpadeos visuales en el próximo intento
  document.getElementById('r-img').src = ''; 
  
  screenResult.classList.add('hidden');
  screenStart.classList.remove('hidden');
  window.scrollTo({top:0, behavior:'smooth'});
});