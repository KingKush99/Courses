/* Interactive DNA/Genomics Mastery App
   - Offline, no external libraries
   - Gamification: XP, Level, Streak, Badges, Daily/Weekly goals, surprises
   - In-app notifications & simple confetti
*/

const KEY = 'dnaGenomicsMastery_v2';

// ---------- Course Data (Modules) ----------
const modules = [
  {
    id:'m1', title:'DNA & Genome Structure',
    concepts:[
      'Nucleotides, base pairing (A–T, G–C), double helix geometry.',
      'Chromatin packaging: nucleosomes, histones, higher-order structure.',
      'Genes vs. alleles; genome scale and organization (introns/exons).',
      'Chromosomes, ploidy, mitochondria vs. nuclear DNA.'
    ],
    quiz:[
      {q:'Which base pairs with Guanine?', type:'mc', options:['A','T','C','U'], answer:2},
      {q:'DNA wraps around which proteins?', type:'mc', options:['Tubulin','Actin','Histones','Keratin'], answer:2},
      {q:'Exons are...', type:'mc', options:['noncoding','coding','repetitive','mitochondrial only'], answer:1},
    ]
  },
  {
    id:'m2', title:'Cell Division & Inheritance',
    concepts:[
      'Mitosis vs. meiosis; germline vs. somatic cells.',
      'Mendelian inheritance: segregation, independent assortment, pedigrees.',
      'Dominant/recessive, X-linked, incomplete dominance, epistasis.'
    ],
    quiz:[
      {q:'Which process halves chromosome number?', type:'mc', options:['Mitosis','Meiosis','Binary fission','Budding'], answer:1},
      {q:'Independent assortment occurs during...', type:'mc', options:['Prophase I','Metaphase I','Anaphase II','Telophase'], answer:1},
      {q:'X-linked traits are typically...', type:'mc', options:['Equal in all sexes','More frequent in males','Lethal in females','Only mitochondrial'], answer:1},
    ]
  },
  {
    id:'m3', title:'Genetic Variation & Mutation',
    concepts:[
      'SNPs, STRs, indels, copy-number variation; mutation vs. polymorphism.',
      'Silent/missense/nonsense; frameshifts; functional consequences.'
    ],
    quiz:[
      {q:'Most common human genomic variant?', type:'mc', options:['STR','SNP','CNV','Translocation'], answer:1},
      {q:'A stop-codon creating change is...', type:'mc', options:['Silent','Missense','Nonsense','Frameshift'], answer:2},
      {q:'Indels in coding regions often cause...', type:'mc', options:['No effect','Frameshifts','Inversions','Methylation'], answer:1},
    ]
  },
  {
    id:'m4', title:'DNA Technologies & Bioinformatics',
    concepts:[
      'PCR amplification; sequencing: Sanger vs. NGS; WGS & annotation.',
      'Alignments (BLAST), genome browsers; variant calling basics.'
    ],
    quiz:[
      {q:'PCR stands for...', type:'mc', options:['Polymerase Chain Reaction','Protein Catalysis Reaction','Pre-Cycle Replication','Poly-A Chain Reaction'], answer:0},
      {q:'Sanger vs. NGS: NGS primarily improves...', type:'mc', options:['Throughput and speed','Color depth','pH','Gel clarity'], answer:0},
      {q:'BLAST is used for...', type:'mc', options:['3D folding','Sequence alignment/search','PCR primer extension','Cloning vectors'], answer:1},
    ]
  },
  {
    id:'m5', title:'Epigenomics & Regulation',
    concepts:[
      'DNA methylation, histone modifications, chromatin remodeling.',
      'Enhancers, promoters, transcription factors; 3D genome topology.'
    ],
    quiz:[
      {q:'DNA methylation generally...', type:'mc', options:['increases expression','decreases expression','no effect','randomizes'], answer:1},
      {q:'Histone acetylation usually...', type:'mc', options:['closes chromatin','opens chromatin','degrades DNA','stops replication'], answer:1},
      {q:'Enhancers...', type:'mc', options:['are coding exons','bind TFs to modulate transcription','are rRNA only','are telomeres'], answer:1},
    ]
  },
  {
    id:'m6', title:'Medical & Forensic Applications',
    concepts:[
      'Human Genome Project; pharmacogenomics; disease risk; diagnostics.',
      'STR profiling and identity matching in forensics.'
    ],
    quiz:[
      {q:'STRs are...', type:'mc', options:['Single base changes','Short repeats','Large deletions','Transversions'], answer:1},
      {q:'Pharmacogenomics tailors...', type:'mc', options:['Drug choice/dose','Pill color','Surgery time','MRI settings'], answer:0},
      {q:'HGP first draft published...', type:'mc', options:['1990','1996','2001','2010'], answer:2},
    ]
  },
  {
    id:'m7', title:'Computational & Systems Genomics (Optional)',
    concepts:[
      'Comparative/population genomics, network-level regulation, visualization.'
    ],
    quiz:[
      {q:'Which discipline compares genomes across species?', type:'mc', options:['Proteomics','Comparative genomics','Metabolomics','Cytology'], answer:1},
      {q:'Genome visualization helps to...', type:'mc', options:['Change DNA','Interpret patterns','Degrade RNA','Run PCR'], answer:1},
      {q:'Population genomics studies...', type:'mc', options:['Single cells only','Variant frequencies across populations','Only STRs','Only mtDNA'], answer:1},
    ]
  },
];

// Rapid-fire pool
const rapidPool = [
  'Complement of A? (T)',
  'Complement of G? (C)',
  'Define exon. (coding region)',
  'Define intron. (noncoding within genes)',
  'PCR purpose? (amplify DNA)',
  'NGS advantage? (throughput/speed)',
  'Cas9 is guided by? (gRNA)',
  'Methylation effect? (decrease expression)',
  'Forensic marker? (STR)',
  'Central dogma? (DNA→RNA→Protein)',
];

// Exam
const exam = {
  mcq:[
    { q:'Sugar in DNA is...', options:['Ribose','Deoxyribose','Glucose','Sucrose'], answer:1 },
    { q:'Base-pair bonds are...', options:['Covalent','Hydrogen','Ionic','Metallic'], answer:1 },
    { q:'Stop-codon creation is...', options:['Silent','Missense','Nonsense','Frameshift'], answer:2 },
    { q:'Which increases accessibility?', options:['Histone acetylation','DNA methylation','Chromosome condensation','Histone compaction'], answer:0 },
    { q:'CRISPR uses...', options:['Guide RNA & Cas nuclease','Ligase & helicase','Folate & B12','Operon & promoter'], answer:0 },
    { q:'NGS primarily improves...', options:['Throughput/speed','pH','Capillary action','ATP yield'], answer:0 },
    { q:'STR means...', options:['Short tandem repeat','Single transversion rate','Strong telomeric region','Short telomeric repeat'], answer:0 },
    { q:'BLAST is for...', options:['Alignment/search','Protein folding','Microscopy','CRISPR editing'], answer:0 },
    { q:'Mitosis vs meiosis halves ploidy?', options:['Mitosis','Meiosis','Both','Neither'], answer:1 },
    { q:'Mitochondrial DNA is inherited...', options:['Biparentally','Paternally','Maternally','Randomly'], answer:2 },
    { q:'Promoters are typically...', options:['Upstream of TSS','Downstream only','In exons','In telomeres'], answer:0 },
    { q:'Indel in coding often causes...', options:['Frameshift','Telomere loss','Methylation','No change'], answer:0 },
    { q:'HGP draft year...', options:['1990','1996','2001','2010'], answer:2 },
    { q:'Pharmacogenomics informs...', options:['Drug choice/dose','CT scan time','X-ray angle','Diet color'], answer:0 },
    { q:'Adenine not in DNA pairs with...', options:['U','T','G','C'], answer:1 },
    { q:'Karyotype shows...', options:['Chromosomes','Proteins','RNA isoforms','STR alleles'], answer:0 },
    { q:'Enhancers bind...', options:['tRNA','Transcription factors','Ribosomes','DNase'], answer:1 },
    { q:'Comparative genomics compares...', options:['Proteins only','Genomes across species','Lipids only','Mitosis phases'], answer:1 },
    { q:'Population genomics studies...', options:['Individual proteomes','Variant freq. across populations','Only SNP repairs','Ribosome counts'], answer:1 },
    { q:'Cas9 finds targets by...', options:['Protein motifs','Sequence complementarity','Hydrophobicity','pH'], answer:1 },
  ],
  scenarios:[
    'A promoter variant reduces transcription by 60%. Predict protein level and pathway impact.',
    'A frameshift near the start codon is detected. Predict protein length and function.',
    'Hypermethylation at a tumor suppressor promoter is observed. Predict expression and cancer risk.',
    'Duplication in CYP2D6 gene is present. Predict drug metabolism outcome.',
    'A nonsense mutation truncates a receptor’s cytoplasmic tail. Predict signaling impact.',
  ]
};

// -------- Gamification & State ----------
const defaultState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDay: null,
  avatar: 0,
  settings: { sound:false, notif:true, confetti:true, surprise:true },
  modulesCompleted: {},
  moduleScores: {},
  drillBests: { basepair:0, mutation:0, pathway:0, rapid:0 },
  goals: { daily:[], weekly:[] },
  badges: {},
  examAnswers: {},
  examBest: null,
};
let state = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : structuredClone(defaultState);
  }catch(e){ return structuredClone(defaultState); }
}
function saveState(){ localStorage.setItem(KEY, JSON.stringify(state)); }

function addXP(amount){
  state.xp += amount;
  let up = false;
  while(state.xp >= neededXP(state.level)){
    state.xp -= neededXP(state.level);
    state.level++; up = true;
  }
  if(up){ notify(`Level up! Now level ${state.level} 🚀`); confettiBurst(); }
  updateHeaderStats(); updateProfile();
  saveState();
}
function neededXP(level){ return 100 + (level-1)*50; }

function tickStreak(){
  const today = new Date().toDateString();
  if(state.lastActiveDay !== today){
    // simplistic: if last day exists and is yesterday, continue streak; else reset
    const last = state.lastActiveDay ? new Date(state.lastActiveDay) : null;
    const yday = new Date(); yday.setDate(yday.getDate()-1);
    if(last && last.toDateString() === yday.toDateString()) state.streak++;
    else state.streak = 1;
    state.lastActiveDay = today;
    notify(`Streak: ${state.streak} 🔥`);
  }
  updateHeaderStats(); updateProfile(); saveState();
}

// -------- UI helpers & wiring --------
function $(sel){ return document.querySelector(sel); }
function el(tag, cls){ const e = document.createElement(tag); if(cls) e.className = cls; return e; }
function setTab(id){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`.tab-btn[data-tab="${id}"]`)?.classList.add('active');
}
document.querySelectorAll('.tab-btn').forEach(b=> b.addEventListener('click', ()=> setTab(b.dataset.tab)));
document.querySelectorAll('[data-tab-to]').forEach(b=> b.addEventListener('click', ()=> setTab(b.dataset.tabTo)));
$('#quickStart').addEventListener('click', ()=> setTab('modules'));

// notifications
function notify(msg){
  if(!state.settings.notif) return;
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(()=> t.classList.add('hidden'), 2400);
}

// confetti (simple CSS particles)
function confettiBurst(){
  if(!state.settings.confetti) return;
  const c = $('#confetti');
  c.innerHTML='';
  for(let i=0;i<80;i++){
    const s = el('span');
    const size = 6+Math.random()*8;
    s.style.cssText = `
      position:absolute; width:${size}px; height:${size}px; 
      background:hsl(${Math.random()*360} 90% 60%);
      top:-10px; left:${Math.random()*100}%;
      transform:translateY(0);
      animation:fall ${2+Math.random()*2}s linear forwards;
    `;
    c.appendChild(s);
  }
  c.classList.remove('hidden');
  setTimeout(()=>{ c.classList.add('hidden'); c.innerHTML=''; }, 2800);
}
const styleAnim = document.createElement('style');
styleAnim.textContent = `@keyframes fall { to { transform: translateY(110vh) rotate(720deg);} }`;
document.head.appendChild(styleAnim);

// sound
function beep(){
  if(!state.settings.sound) return;
  const ctx = new (window.AudioContext||window.webkitAudioContext)();
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type='sine'; o.frequency.value = 880;
  o.connect(g); g.connect(ctx.destination);
  g.gain.setValueAtTime(0.001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime+0.02);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime+0.25);
  o.start(); o.stop(ctx.currentTime+0.26);
}

// header stats
function updateHeaderStats(){
  $('#lvl').textContent = `Lv. ${state.level}`;
  $('#xp').textContent = `${state.xp} XP`;
  $('#streak').textContent = `${state.streak} 🔥`;
}

// -------- Goals (Daily/Weekly) --------
const dailyPool = [
  'Complete 1 module quiz',
  'Score 3+ in Base-Pair Reflex',
  'Answer 5 Rapid Fire questions',
  'Review concepts from 2 modules',
  'Attempt 1 scenario question',
];
const weeklyPool = [
  'Finish 4 modules',
  'Reach level 3',
  'Set a new drill personal best',
  'Score ≥ 16/20 on the exam',
];

function initGoals(){
  if(!state.goals.daily?.length){
    state.goals.daily = sample(dailyPool, 3);
  }
  if(!state.goals.weekly?.length){
    state.goals.weekly = sample(weeklyPool, 2);
  }
  renderGoals();
  saveState();
}
function sample(arr, n){
  const a=[...arr]; a.sort(()=>Math.random()-0.5); return a.slice(0, n);
}
function renderGoals(){
  const d = $('#dailyGoals'); d.innerHTML='';
  state.goals.daily.forEach((g,i)=>{
    const li = el('li');
    const cb = el('input'); cb.type='checkbox'; cb.id='dg'+i;
    cb.addEventListener('change', ()=>{
      notify(`Daily goal done: ${g}`); addXP(15); beep();
    });
    const lab = el('label'); lab.setAttribute('for', cb.id); lab.textContent = g;
    li.append(cb,lab); d.append(li);
  });
  const w = $('#weeklyGoals'); w.innerHTML='';
  state.goals.weekly.forEach((g,i)=>{
    const li = el('li');
    const cb = el('input'); cb.type='checkbox'; cb.id='wg'+i;
    cb.addEventListener('change', ()=>{
      notify(`Weekly challenge cleared: ${g}`); addXP(40); confettiBurst();
    });
    const lab = el('label'); lab.setAttribute('for', cb.id); lab.textContent = g;
    li.append(cb,lab); w.append(li);
  });
}

// -------- Surprise/Mystery --------
$('#mysteryBtn').addEventListener('click', ()=>{
  if(!state.settings.surprise){ notify('Surprises are disabled in Settings.'); return; }
  const area = $('#mysteryArea'); area.classList.remove('hidden'); area.innerHTML='';
  const q = rapidPool[Math.floor(Math.random()*rapidPool.length)];
  const p = el('p'); p.textContent = 'Surprise quiz: ' + q;
  const input = el('input'); input.placeholder='Type your answer';
  const btn = el('button'); btn.textContent='Submit'; btn.className='secondary';
  const status = el('div'); status.className='result';
  btn.addEventListener('click', ()=>{
    if((input.value||'').trim().length){
      status.textContent='🎉 +20 XP for curiosity!';
      addXP(20); confettiBurst(); beep();
    } else {
      status.textContent='Try entering something!';
    }
  });
  area.append(p,input,btn,status);
});

// -------- Modules UI --------
const moduleList = $('#moduleList');
const moduleDetail = $('#moduleDetail');
const moduleTitle = $('#moduleTitle');
const moduleConcepts = $('#moduleConcepts');
const moduleQuiz = $('#moduleQuiz');

function renderModules(){
  moduleList.innerHTML='';
  modules.forEach(m=>{
    const card = el('div','card');
    const h = el('h3'); h.textContent = m.title;
    const p = el('p'); p.className='muted'; p.textContent = `${m.concepts.length} key concepts • ${m.quiz.length} quiz items`;
    const meta = el('p'); meta.textContent = state.modulesCompleted[m.id] ? `✅ Completed • ${state.moduleScores[m.id]??0}/${m.quiz.length}` : 'Not started';
    const btn = el('button'); btn.className='primary'; btn.textContent = state.modulesCompleted[m.id] ? 'Review' : 'Start';
    btn.addEventListener('click', ()=> openModule(m.id));
    card.append(h,p,meta,btn);
    moduleList.append(card);
  });
}
function openModule(id){
  const m = modules.find(x=>x.id===id);
  moduleTitle.textContent = m.title;
  moduleConcepts.innerHTML = m.concepts.map(c=>`<p>• ${c}</p>`).join('');
  moduleQuiz.innerHTML='';

  m.quiz.forEach((q,i)=>{
    const qEl = el('div','q');
    const h = el('h5'); h.textContent = `Q${i+1}. ${q.q}`;
    qEl.append(h);
    q.options.forEach((opt, idx)=>{
      const idc = `${m.id}_${i}_${idx}`;
      const lab = el('label'); const inp = el('input'); inp.type='radio'; inp.name=`${m.id}_${i}`; inp.id=idc; inp.value=idx;
      lab.setAttribute('for', idc); lab.textContent = opt;
      qEl.append(inp,lab);
    });
    moduleQuiz.append(qEl);
  });

  const submit = el('button','secondary'); submit.textContent='Submit Module Quiz';
  const res = el('div','result hidden');
  submit.addEventListener('click', ()=>{
    let score = 0;
    m.quiz.forEach((q,i)=>{
      const chosen = moduleQuiz.querySelector(`input[name="${m.id}_${i}"]:checked`);
      if(chosen && Number(chosen.value)===q.answer){ score++; }
    });
    state.modulesCompleted[m.id]=true; state.moduleScores[m.id]=score;
    addXP(20 + score*5); // reward
    res.classList.remove('hidden'); res.textContent = `Score: ${score}/${m.quiz.length}`;
    renderModules(); updateProfile(); unlockBadges(); saveState();
    if(score === m.quiz.length){ notify('Perfect! +Bonus XP'); addXP(10); confettiBurst(); }
  });
  moduleQuiz.append(submit,res);

  moduleList.classList.add('hidden');
  moduleDetail.classList.remove('hidden');
}
$('#backToModules').addEventListener('click', ()=>{
  moduleDetail.classList.add('hidden');
  moduleList.classList.remove('hidden');
});

// -------- Lab Drills --------
function updateBest(key, val){
  if(val > (state.drillBests[key]||0)){
    state.drillBests[key] = val; notify(`New personal best in ${key}!`); addXP(15); confettiBurst();
    unlockBadges(); saveState();
  }
}

// Base-Pair Reflex
$('#bpStart').addEventListener('click', ()=>{
  const area = $('#bpArea'); area.classList.remove('hidden'); area.innerHTML='';
  const letters = ['A','T','G','C'];
  const prompt = el('div'); prompt.textContent='Type complement (A↔T, G↔C) and press Enter.';
  const disp = el('div'); disp.style.fontSize='28px'; disp.style.margin='8px 0';
  const input = el('input'); input.placeholder='Enter A/T/G/C'; input.maxLength=1; input.autofocus=true;
  const timer = el('div'); let time=30, score=0;
  const scoreEl = el('div'); scoreEl.textContent='Score: 0';
  area.append(prompt,disp,input,timer,scoreEl);
  let cur = letters[Math.floor(Math.random()*4)];
  disp.textContent=cur;
  const int = setInterval(()=>{
    time--; timer.textContent=`Time: ${time}s`;
    if(time<=0){
      clearInterval(int); input.disabled=true;
      area.append(finish('basepair', score));
    }
  },1000);
  input.addEventListener('keydown', e=>{
    if(e.key==='Enter'){
      const ans = (input.value||'').toUpperCase();
      const target = (c)=> c==='A'?'T': c==='T'?'A': c==='G'?'C':'G';
      if(ans===target(cur)){ score++; scoreEl.textContent=`Score: ${score}`; addXP(1); beep(); }
      input.value='';
      cur = letters[Math.floor(Math.random()*4)];
      disp.textContent=cur;
    }
  });
});

function finish(key, score){
  const done = el('div'); done.className='result';
  updateBest(key, score);
  done.textContent = `Final: ${score} • Best: ${state.drillBests[key]}`;
  return done;
}

// Mutation Classifier
$('#mutStart').addEventListener('click', ()=>{
  const area = $('#mutArea'); area.classList.remove('hidden'); area.innerHTML='';
  const items = [
    {from:'ATG TGG TGA', to:'ATG TGA TGA', a:'nonsense'},
    {from:'GAA CCT GGG', to:'GAA CCT GGA', a:'silent'},
    {from:'ATG GAA CCT', to:'ATG GAA CCA', a:'missense'}
  ];
  let i=0, score=0;
  const q = el('div'); const input = el('input'); input.placeholder='silent / missense / nonsense';
  const btn = el('button'); btn.textContent='Submit'; btn.className='secondary';
  const status = el('div'); status.className='result';
  function render(){
    if(i>=items.length){
      area.append(finish('mutation', score));
      return;
    }
    q.innerHTML = `<div><strong>Original:</strong> ${items[i].from}</div>
                   <div><strong>Changed:</strong> ${items[i].to}</div>`;
    input.value=''; status.textContent='';
  }
  btn.addEventListener('click', ()=>{
    const a = input.value.trim().toLowerCase();
    if(a===items[i].a){ score++; status.textContent='✅'; addXP(5); beep(); }
    else status.textContent=`❌ Correct: ${items[i].a}`;
    i++; render();
  });
  area.append(q,input,btn,status); render();
});

// Pathway Mapping
$('#pathStart').addEventListener('click', ()=>{
  const area = $('#pathArea'); area.classList.remove('hidden'); area.innerHTML='';
  const items = [
    {p:'Promoter variant reduces transcription 60% → protein level?', a:'decrease'},
    {p:'Frameshift near start codon → outcome?', a:'loss of function'},
    {p:'Hypermethylation at tumor suppressor → risk?', a:'increase'}
  ];
  let i=0, score=0;
  const q = el('div'); const input = el('input'); input.placeholder='short answer';
  const btn = el('button'); btn.textContent='Submit'; btn.className='secondary';
  const status = el('div'); status.className='result';
  function render(){
    if(i>=items.length){ area.append(finish('pathway', score)); return; }
    q.textContent = items[i].p; input.value=''; status.textContent='';
  }
  btn.addEventListener('click', ()=>{
    const a = input.value.trim().toLowerCase();
    if(a.includes(items[i].a)){ score++; status.textContent='✅'; addXP(5); beep(); }
    else status.textContent=`❌ Expected concept: ${items[i].a}`;
    i++; render();
  });
  area.append(q,input,btn,status); render();
});

// Genome Browser Lite (toy viz)
$('#gbStart').addEventListener('click', ()=>{
  const area = $('#gbArea'); area.classList.remove('hidden'); area.innerHTML='';
  const canvas = document.createElement('canvas'); canvas.width=800; canvas.height=120; canvas.id='gbCanvas';
  const info = el('div'); info.className='muted'; info.textContent='Click along the chromosome to reveal features.';
  area.append(canvas,info);
  const ctx = canvas.getContext('2d');
  const genes = [
    {x:80, w:60, label:'Gene A'}, {x:210,w:80,label:'Gene B'}, {x:370,w:50,label:'TF site'}, {x:520,w:120,label:'Gene C'}, {x:690,w:50,label:'Promoter'}
  ];
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // chromosome line
    ctx.fillStyle='#29417a'; ctx.fillRect(10,55,780,10);
    // features
    genes.forEach(g=>{ ctx.fillStyle='#7dd3fc'; ctx.fillRect(g.x,45,g.w,30); });
  }
  draw();
  canvas.addEventListener('click', (e)=>{
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const hit = genes.find(g=> x>=g.x && x<=g.x+g.w);
    if(hit){ notify(`Feature: ${hit.label}`); addXP(3); beep(); }
  });
});

// Rapid Fire
$('#rfStart').addEventListener('click', ()=>{
  const area = $('#rfArea'); area.classList.remove('hidden'); area.innerHTML='';
  let time=60, idx=0, score=0;
  const q=el('div'); const input=el('input'); input.placeholder='Type answer'; input.autofocus=true;
  const meta=el('div'); const btn=el('button'); btn.textContent='Submit'; btn.className='secondary';
  const status=el('div'); status.className='result';
  function show(){ q.textContent = rapidPool[idx % rapidPool.length]; }
  const timer=setInterval(()=>{
    time--; meta.textContent=`Time: ${time}s • Score: ${score}`;
    if(time<=0){
      clearInterval(timer); btn.disabled=true; input.disabled=true;
      status.textContent=`Final: ${score}`; updateBest('rapid', score);
    }
  },1000);
  btn.addEventListener('click', ()=>{
    if((input.value||'').trim().length){ score++; addXP(1); beep(); }
    input.value=''; idx++; show();
  });
  area.append(q,input,btn,meta,status); show();
});

// -------- Exam --------
const examContainer = $('#examContainer');
function renderExam(){
  examContainer.innerHTML='';
  const mcWrap = el('div','card'); mcWrap.innerHTML='<h3>Multiple Choice (20)</h3>';
  exam.mcq.forEach((it,i)=>{
    const q = el('div','q'); const h = el('h5'); h.textContent = `Q${i+1}. ${it.q}`; q.append(h);
    it.options.forEach((op,idx)=>{
      const id = `ex_${i}_${idx}`;
      const inp = el('input'); inp.type='radio'; inp.name=`ex_${i}`; inp.id=id; inp.value=idx;
      if(state.examAnswers[`q${i}`]===idx) inp.checked = true;
      const lab = el('label'); lab.setAttribute('for',id); lab.textContent=op;
      inp.addEventListener('change', ()=>{ state.examAnswers[`q${i}`]=idx; saveState(); });
      q.append(inp,lab);
    });
    mcWrap.append(q);
  });
  examContainer.append(mcWrap);

  const scWrap = el('div','card'); scWrap.innerHTML='<h3>Scenarios (Short Answer)</h3>';
  exam.scenarios.forEach((s,i)=>{
    const wrap = el('div','q'); const h = el('h5'); h.textContent = `S${i+1}. ${s}`;
    const ta = el('textarea'); ta.rows=3; ta.placeholder='Your analysis...';
    const key = `s${i}`; ta.value = state.examAnswers[key] || '';
    ta.addEventListener('input', ()=>{ state.examAnswers[key]=ta.value; saveState(); });
    wrap.append(h,ta); scWrap.append(wrap);
  });
  examContainer.append(scWrap);
}
renderExam();

$('#gradeExam').addEventListener('click', ()=>{
  let score=0;
  exam.mcq.forEach((it,i)=>{
    const chosen = document.querySelector(`input[name="ex_${i}"]:checked`);
    if(chosen && Number(chosen.value)===it.answer) score++;
  });
  const percent = Math.round(score/exam.mcq.length*100);
  $('#examResult').classList.remove('hidden');
  $('#examResult').textContent = `MCQ: ${score}/${exam.mcq.length} (${percent}%)`;
  addXP(score); // 1 XP per correct
  if(state.examBest===null || score>state.examBest){ state.examBest = score; notify('New exam personal best!'); confettiBurst(); unlockBadges(); }
  saveState();
});
$('#resetExam').addEventListener('click', ()=>{
  if(confirm('Clear all exam answers?')){
    state.examAnswers = {}; saveState(); renderExam(); notify('Exam answers cleared.');
  }
});

// -------- Achievements --------
const BADGES = [
  {id:'starter', name:'Genome Rookie', rule:()=> true, desc:'Opened the course.'},
  {id:'module3', name:'Module Sprint', rule:()=> countCompleted()>=3, desc:'Complete 3 modules.'},
  {id:'perfect', name:'Perfect Recall', rule:()=> Object.keys(state.moduleScores).some(k=> state.moduleScores[k]===3), desc:'Perfect score on a module quiz.'},
  {id:'streak3', name:'Hot Streak', rule:()=> state.streak>=3, desc:'3-day streak.'},
  {id:'drill10', name:'Reflex Ace', rule:()=> state.drillBests.basepair>=10, desc:'Score 10+ in Base-Pair Reflex.'},
  {id:'exam16', name:'Genomics Strategist', rule:()=> (state.examBest??0)>=16, desc:'Score ≥ 16/20 on exam.'},
];
function unlockBadges(){
  BADGES.forEach(b=>{
    if(b.rule() && !state.badges[b.id]){
      state.badges[b.id] = true;
      notify(`Badge unlocked: ${b.name} 🏅`); confettiBurst(); beep(); addXP(25);
    }
  });
  renderBadges(); saveState();
}
function renderBadges(){
  const g = $('#badgeGrid'); g.innerHTML='';
  BADGES.forEach(b=>{
    const card = el('div','badge'+(state.badges[b.id]?'':' locked'));
    const t = el('h4'); t.textContent = b.name;
    const p = el('p'); p.textContent = b.desc;
    card.append(t,p); g.append(card);
  });
}
function countCompleted(){
  return Object.keys(state.modulesCompleted).filter(k=>state.modulesCompleted[k]).length;
}

// -------- Profile & Settings --------
const avatars = ['🙂','🧬','🧪','🧠','🔬','📈','👩‍🔬','👨‍🔬','🧫','🧯','🧷','🧲','🔭','🧻','🛰️','🧰','⚗️','🧪','🧯','🧠'];
function initProfile(){
  const sel = $('#avatar'); sel.innerHTML='';
  avatars.forEach((a,i)=>{
    const opt = document.createElement('option'); opt.value=i; opt.textContent=a; sel.append(opt);
  });
  sel.value = state.avatar; $('#avatarPreview').textContent = avatars[state.avatar];
  sel.addEventListener('change', ()=>{ state.avatar = Number(sel.value); $('#avatarPreview').textContent = avatars[state.avatar]; saveState(); });
  updateProfile();
}
function updateProfile(){
  $('#pLevel').textContent = state.level;
  $('#pXP').textContent = state.xp;
  $('#pStreak').textContent = state.streak;
  $('#pModules').textContent = countCompleted();
  updateHeaderStats();
}

function initSettings(){
  $('#soundToggle').checked = state.settings.sound;
  $('#notifToggle').checked = state.settings.notif;
  $('#confettiToggle').checked = state.settings.confetti;
  $('#surpriseToggle').checked = state.settings.surprise;
  $('#soundToggle').addEventListener('change', e=>{ state.settings.sound=e.target.checked; saveState(); });
  $('#notifToggle').addEventListener('change', e=>{ state.settings.notif=e.target.checked; saveState(); });
  $('#confettiToggle').addEventListener('change', e=>{ state.settings.confetti=e.target.checked; saveState(); });
  $('#surpriseToggle').addEventListener('change', e=>{ state.settings.surprise=e.target.checked; saveState(); });

  $('#exportBtn').addEventListener('click', ()=>{
    const box = $('#progressBox'); box.classList.remove('hidden');
    box.value = JSON.stringify(state, null, 2); box.select();
    notify('Progress exported. Copy the JSON.');
  });
  $('#importBtn').addEventListener('click', ()=>{
    const box = $('#progressBox');
    try{
      const data = JSON.parse(box.value);
      state = data; saveState(); notify('Progress imported.'); confettiBurst();
      renderAll();
    }catch(e){ alert('Invalid JSON.'); }
  });
  $('#resetProgress').addEventListener('click', ()=>{
    if(confirm('Reset ALL progress?')){
      state = structuredClone(defaultState); saveState(); renderAll(); notify('Progress reset.');
    }
  });
}

// ---------- Render & Init ----------
function renderAll(){
  renderModules(); renderBadges(); renderExam(); updateProfile(); updateHeaderStats(); renderGoals();
}
initGoals(); initProfile(); initSettings(); renderAll(); tickStreak(); unlockBadges();
