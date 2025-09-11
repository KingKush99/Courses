
(function(){
  const store={get:(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
  const coins=(function(){let v=store.get('coins',300); return {get:()=>v, add:(d)=>{v=Math.max(0,v+d);store.set('coins',v);renderCoins();}}})();
  const themes=[
    {id:1,name:'Ember',class:'theme-1',cost:0},{id:2,name:'Sunset',class:'theme-2',cost:0},{id:3,name:'Cinder',class:'theme-3',cost:0},
    {id:4,name:'Aurora',class:'theme-4',cost:100},{id:5,name:'Ocean',class:'theme-5',cost:200},{id:6,name:'Forest',class:'theme-6',cost:400},
    {id:7,name:'Neon',class:'theme-7',cost:800},{id:8,name:'Amethyst',class:'theme-8',cost:1600},{id:9,name:'Solar',class:'theme-9',cost:3200},{id:10,name:'Obsidian',class:'theme-10',cost:6400}
  ];
  let owned=store.get('themes_owned',[1,2,3]); let active=store.get('theme_active',1);
  function applyTheme(){document.body.classList.remove(...themes.map(t=>t.class)); const t=themes.find(x=>x.id===active); if(t) document.body.classList.add(t.class);} applyTheme();

  function btn(text,cls,title){const b=document.createElement('button'); b.className='pill-btn corner '+cls; b.textContent=text; b.title=title||''; document.body.appendChild(b); return b;}
  const profileBtn=btn('👤','top-left','Profile'); const backBtn=btn('←','top-left','Back'); backBtn.style.top='60px'; backBtn.onclick=()=>{history.length>1?history.back():location.href=(window.siteHome||'../index.html')};
  const menuBtn=btn('☰','top-right','Menu'); const chatBtn=btn('💬','bot-left','Chat'); const slotsBtn=btn('🎰','bot-right','Mini Slots');

  // Drawer
  const drawer=document.createElement('div'); drawer.className='drawer'; document.body.appendChild(drawer);
  drawer.innerHTML=`
    <div class="section"><h3>Quick Actions</h3>
      <div class="menu-grid">
        <a class="btn-tile" id="theme-store">🎨 Themes</a>
        <a class="btn-tile" id="coins-tile">🪙 Coins: <span id="coin-count">0</span></a>
        <a class="btn-tile" id="bigger-text">🔎 Bigger Text</a>
        <a class="btn-tile" id="contrast">🌓 High Contrast</a>
      </div>
    </div>`;
  function renderCoins(){const c=document.getElementById('coin-count'); if(c) c.textContent=store.get('coins',0);}
  renderCoins();
  menuBtn.onclick=()=>drawer.classList.toggle('open');
  document.addEventListener('click',e=>{if(!drawer.contains(e.target)&&e.target!==menuBtn&&drawer.classList.contains('open'))drawer.classList.remove('open')});
  function openThemeStore(){
    const m=document.createElement('div'); m.className='drawer open'; m.style.width='520px'; m.style.right='340px';
    let html=`<div class="section"><h3>Theme Store</h3><div class="menu-grid" style="grid-template-columns:repeat(2,1fr)">`;
    themes.forEach(t=>{const own=owned.includes(t.id), act=(active===t.id);
      html+=`<div class="btn-tile"><div><b>${t.name}</b></div><div class="badge" style="margin:6px 0">${own?(act?'Active':'Owned'):(t.cost? t.cost+' coins':'Free')}</div><button data-id="${t.id}" class="pill-btn">${own?(act?'Using':'Equip'):(t.cost?'Buy':'Get')}</button></div>`;
    });
    html+=`</div><p class="dim" style="margin:8px 12px">First 3 themes are free. Others cost coins.</p></div>`; m.innerHTML=html;
    m.addEventListener('click',e=>{const b=e.target.closest('button[data-id]'); if(!b) return; const id=parseInt(b.dataset.id,10); const t=themes.find(x=>x.id===id);
      if(!owned.includes(id)){const have=store.get('coins',0); if(have<t.cost){b.textContent='Need '+t.cost; return;} store.set('coins', have - t.cost); owned.push(id); store.set('themes_owned',owned); renderCoins();}
      active=id; store.set('theme_active',active); applyTheme(); document.body.removeChild(m);
    });
    document.body.appendChild(m);
  }
  document.getElementById('theme-store').onclick=openThemeStore;

  // Slots
  const slots=document.createElement('div'); slots.id='slots-modal'; document.body.appendChild(slots);
  slots.innerHTML=`
    <div class="row" style="padding:10px 12px; border-bottom:1px solid var(--muted)"><b>Mini Slots</b><span class="dim" style="margin-left:auto">Coins: <span id="coins-hud">0</span></span><button id="slots-close" class="pill-btn" style="border-radius:999px">✖</button></div>
    <div class="config"><label>Reels</label><select id="reels" class="select"><option>3</option><option>4</option><option>5</option><option>6</option></select>
    <label>Bet</label><select id="bet" class="select"><option>10</option><option>25</option><option>50</option><option>100</option></select></div>
    <div class="reels" id="reel-row"></div><div class="spin-wrap" id="spin-wrap"></div>
    <div class="lever-wrap"><div class="lever-stick lever-pull" id="lever"></div><div class="lever-knob lever-pull" id="knob"></div></div>`;
  function updateCoinsHUD(){const h=document.getElementById('coins-hud'); if(h) h.textContent=store.get('coins',0); renderCoins();}
  function openSlots(){slots.classList.add('open'); buildReels(); updateCoinsHUD();} function closeSlots(){slots.classList.remove('open');}
  slotsBtn.onclick=openSlots; document.getElementById('slots-close').onclick=closeSlots;
  const symbols=['🍒','🍋','🔔','⭐','💎','7️⃣'];
  function reelEl(){const d=document.createElement('div'); d.className='reel'; d.textContent=symbols[Math.floor(Math.random()*symbols.length)]; return d;}
  function buildReels(){const row=document.getElementById('reel-row'); row.innerHTML=''; const n=parseInt(document.getElementById('reels').value,10);
    for(let i=0;i<n;i++) row.appendChild(reelEl()); const wrap=document.getElementById('spin-wrap'); wrap.innerHTML=''; const btn=document.createElement('button'); btn.className='pill-btn spin-btn'; btn.textContent='Spin'; btn.style.left='calc(50% - 36px)'; btn.style.top='-36px'; btn.onclick=spin; wrap.appendChild(btn); }
  document.getElementById('reels').addEventListener('change', buildReels);
  function spin(){ const bet=parseInt(document.getElementById('bet').value,10); let have=store.get('coins',0); if(have<bet){alert('Not enough coins.'); return;} store.set('coins', have - bet); updateCoinsHUD();
    const row=[...document.querySelectorAll('#reel-row .reel')]; let t=0; row.forEach((r,i)=>{const spins=20+Math.floor(Math.random()*10)+i*5; const it=setInterval(()=>{r.textContent=symbols[Math.floor(Math.random()*symbols.length)]; t++; if(t>spins){clearInterval(it);} }, 50+i*10);});
    setTimeout(()=>{ const vals=row.map(r=>r.textContent); let win=0; const allSame=vals.every(v=>v===vals[0]); if(allSame){win=bet*10;} else {for(let i=0;i<vals.length-2;i++){if(vals[i]===vals[i+1]&&vals[i]===vals[i+2]) win=Math.max(win, bet*4);}}
      if(win>0){store.set('coins', store.get('coins',0)+win); updateCoinsHUD();}
    }, 1800);
  }
  (function(){ let pulling=false,startY=0; const lever=document.getElementById('lever'), knob=document.getElementById('knob');
    function setAngle(y){const dy=Math.min(80,Math.max(0,y-startY)); const ang=dy*0.9; lever.style.transform=`translateZ(0) rotateX(${ang}deg)`; knob.style.transform=`translateZ(0) translateY(${dy}px)`;}
    function reset(){lever.style.transform='translateZ(0) rotateX(0deg)'; knob.style.transform='translateZ(0) translateY(0)';}
    function down(e){pulling=true; startY=(e.touches?e.touches[0].clientY:e.clientY); setAngle(startY+70);} function move(e){if(!pulling) return; setAngle(e.touches?e.touches[0].clientY:e.clientY);} function up(){if(!pulling) return; pulling=false; spin(); setTimeout(reset,300);}
    [lever,knob].forEach(el=>{el.addEventListener('mousedown',down); el.addEventListener('touchstart',down);}); window.addEventListener('mousemove',move,{passive:true}); window.addEventListener('touchmove',move,{passive:true}); window.addEventListener('mouseup',up); window.addEventListener('touchend',up);
  })();

  // Chatbot
  const chat=document.createElement('div'); chat.className='chat'; document.body.appendChild(chat);
  chat.innerHTML=`<div class="head"><b>Assistant</b><button id="chat-close" class="pill-btn" style="border-radius:999px">✖</button></div>
    <div class="log" id="chat-log"><div class="msg">👋 Welcome! I’m your Assistant. Ask me anything about the site, games, or settings. I can also chat in your language of choice!</div></div>
    <div class="entry"><input id="chat-input" class="pill-btn" style="flex:1; background:#211611; box-shadow:none; text-align:left" placeholder="Type here...">
      <select id="lang" class="select lang"><option>EN</option><option>ES</option><option>FR</option><option>DE</option><option>PT</option><option>ZH</option><option>JA</option><option>KO</option><option>AR</option><option>HI</option></select>
      <button id="cap" class="pill-btn cam-btn">📸</button><button id="send" class="pill-btn">Send</button></div>`;
  chatBtn.onclick=()=>chat.classList.toggle('open'); document.getElementById('chat-close').onclick=()=>chat.classList.remove('open');
  function pushMsg(t,you){const d=document.createElement('div'); d.className='msg'+(you?' you':''); d.textContent=t; document.getElementById('chat-log').appendChild(d); d.scrollIntoView({behavior:'smooth',block:'end'});}
  function reply(q){if(/coin|theme/i.test(q)){pushMsg("Use ☰ → Themes to buy/apply backgrounds. Coins come from 🎰 wins.",false);return;} pushMsg("Got it! I’ll remember that while you browse.",false);}
  document.getElementById('send').onclick=function(){const v=document.getElementById('chat-input').value.trim(); if(!v)return; pushMsg(v,true); document.getElementById('chat-input').value=''; reply(v);};
  document.getElementById('chat-input').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('send').click()});
  document.getElementById('cap').onclick=function(){const stage=document.getElementById('stage'); if(!stage){pushMsg("📸 Screenshots are only allowed in-game screens.",false); return;} if(!window.html2canvas){const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'; s.onload=()=>document.getElementById('cap').click(); s.onerror=()=>pushMsg("Screenshot library unavailable.",false); document.head.appendChild(s); return;} window.html2canvas(stage).then(c=>{const a=document.createElement('a'); a.href=c.toDataURL(); a.download='screenshot.png'; a.click(); pushMsg("📸 Screenshot captured from game area.",false);});};

  // Themes CSS
  const css=`
  .theme-1{ background: radial-gradient(1200px 700px at 80% 100%, #3a0d00 0%, #0e0b09 40%, #0b0908 100%) }
  .theme-2{ background: radial-gradient(1200px 700px at 80% 100%, #6b2500 0%, #120c0a 40%, #0b0908 100%) }
  .theme-3{ background: radial-gradient(1200px 700px at 80% 100%, #4b1500 0%, #0b0a08 40%, #0a0808 100%) }
  .theme-4{ background: radial-gradient(1200px 700px at 80% 100%, #00485a 0%, #001419 45%, #000b0e 100%) }
  .theme-5{ background: radial-gradient(1200px 700px at 80% 100%, #00406b 0%, #001019 45%, #00080b 100%) }
  .theme-6{ background: radial-gradient(1200px 700px at 80% 100%, #004b27 0%, #00140c 45%, #000b07 100%) }
  .theme-7{ background: radial-gradient(1200px 700px at 80% 100%, #2e006b 0%, #0e0019 45%, #07000b 100%) }
  .theme-8{ background: radial-gradient(1200px 700px at 80% 100%, #4a006b 0%, #120019 45%, #0b000e 100%) }
  .theme-9{ background: radial-gradient(1200px 700px at 80% 100%, #6b5a00 0%, #191700 45%, #0e0b00 100%) }
  .theme-10{ background: radial-gradient(1200px 700px at 80% 100%, #000000 0%, #090909 45%, #000000 100%) }`; const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  // Expose
  window.updateCoins=(d)=>{store.set('coins', Math.max(0, store.get('coins',0)+d)); renderCoins();};
  window.siteHome=(document.querySelector('a.back')?document.querySelector('a.back').getAttribute('href'):'../index.html');
})(); 
