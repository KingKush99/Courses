
(function(){
  if(window.__uiInjected) return; window.__uiInjected=true;

  function ready(fn){
    if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', fn); }
    else { fn(); }
  }
  function el(t,attrs,html){ var d=document.createElement(t); if(attrs){ for(var k in attrs){ if(k==='class') d.className=attrs[k]; else d.setAttribute(k, attrs[k]); } } if(html!=null) d.innerHTML=html; return d; }

  function attachCorners(){
    // Ensure body exists
    if(!document.body){ setTimeout(attachCorners, 30); return; }
    if(document.getElementById('profileBtn')) return; // already added

    // Corner buttons
    var p=el('button',{id:'profileBtn',class:'corner',title:'Profile'},'👤');
    var h=el('button',{id:'hamBtn',class:'corner',title:'Menu'},'☰');
    var c=el('button',{id:'chatBtn',class:'corner',title:'Assistant'},'💬');
    var s=el('button',{id:'slotsBtn',class:'corner',title:'Mini Slots'},'🎰');
    document.body.appendChild(p); document.body.appendChild(h); document.body.appendChild(c); document.body.appendChild(s);

    // Panels
    var ham=el('div',{class:'panel ham',id:'hamPanel'}, "<div class='head'><strong>Menu</strong><button id='hamX' class='pill-btn'>×</button></div><div class='body'>"
      +"<div class='group'><strong>Music</strong>"
      +"<label><input id='mu_on' type='checkbox'> Toggle</label>"
      +"<label>Volume <select id='mu_vol'><option>Low</option><option selected>Medium</option><option>High</option><option>Mute</option></select></label>"
      +"<label>Track <select id='mu_track'><option>Default</option><option>Arcade</option><option>Chill</option><option>Custom Upload</option></select></label></div>"
      +"<div class='group'><strong>Display</strong>"
      +"<label>Theme <select id='disp_theme'><option>Dark</option><option>Light</option><option>High Contrast</option></select></label>"
      +"<label>Text Size <select id='disp_text'><option>Default</option><option>Large</option><option>Small</option></select></label></div>"
      +"<div class='group'><strong>Notifications</strong>"
      +"<label><input id='ntf_sound' type='checkbox'> Sound Alerts</label>"
      +"<label><input id='ntf_popup' type='checkbox'> Pop‑ups</label>"
      +"<label>Frequency <select id='ntf_freq'><option>All</option><option>Major Only</option></select></label></div>"
      +"</div>");
    document.body.appendChild(ham);

    var cb=el('div',{class:'panel cb',id:'chatPanel'}, "<div class='head'><strong>Assistant</strong><button id='cbX' class='pill-btn'>×</button></div>"
      +"<div id='log'></div>"
      +"<div class='body row'>"
      +"<input id='msg' type='text' placeholder='Type here…'>"
      +"<select id='lang'><option value='en'>EN</option><option value='es'>ES</option><option value='fr'>FR</option><option value='zh'>ZH</option><option value='ar'>AR</option><option value='hi'>HI</option><option value='pt'>PT</option><option value='de'>DE</option><option value='it'>IT</option><option value='ru'>RU</option></select>"
      +"<input id='img' type='file' accept='image/*'>"
      +"<button id='send' class='pill-btn'>Send</button>"
      +"</div>");
    document.body.appendChild(cb);

    var sl=el('div',{class:'panel sl',id:'slotPanel'}, "<div class='head'><strong>Mini Slots</strong><button id='slX' class='pill-btn'>×</button></div>"
      +"<div class='body'>"
      +"<div class='opts'>Reels <select id='rs'><option>3</option><option>4</option><option>5</option><option>6</option></select> Bet <select id='bs'><option>10</option><option>25</option><option>50</option><option>100</option></select></div>"
      +"<div class='slot-wrap'>"
      +"  <div style='display:flex;flex-direction:column;gap:8px'>"
      +"    <div id='rwrap' class='reels'></div>"
      +"    <div><button id='spin' class='pill-btn'>Spin</button></div>"
      +"  </div>"
      +"  <div class='lever-area' id='leverA'><div class='lever-stick'></div><div class='lever-knob' id='leverK'></div></div>"
      +"</div>"
      +"</div>");
    document.body.appendChild(sl);

    // Button handlers
    p.onclick=function(){ var here=location.pathname; var root = here.endsWith('/')? './profile.html':'./profile.html'; location.href=root; };
    h.onclick=function(e){ e.stopPropagation(); ham.style.display = ham.style.display==='flex'?'none':'flex'; };
    c.onclick=function(e){ e.stopPropagation(); cb.style.display = cb.style.display==='flex'?'none':'flex'; if(!cb.__g){ var log=document.getElementById('log'); log.innerHTML+="<div>👋 Welcome! I’m your Assistant. Ask me anything about the site, games, or settings. I can also chat in your language of choice!</div>"; cb.__g=true; } };
    s.onclick=function(e){ e.stopPropagation(); sl.style.display = sl.style.display==='flex'?'none':'flex'; buildReels(); };

    document.getElementById('hamX').onclick=function(){ ham.style.display='none'; };
    document.getElementById('cbX').onclick=function(){ cb.style.display='none'; };
    document.getElementById('slX').onclick=function(){ sl.style.display='none'; };
    document.addEventListener('click', function(e){
      if(ham.style.display==='flex' && !e.target.closest('.ham') && e.target!==h) ham.style.display='none';
      if(cb.style.display==='flex' && !e.target.closest('.cb') && e.target!==c) cb.style.display='none';
      if(sl.style.display==='flex' && !e.target.closest('.sl') && e.target!==s) sl.style.display='none';
    });

    // Chatbot minimal logic (multilingual echo + image preview)
    function respond(text, lang){
      var dict={
        en:"I can help with site navigation, courses, settings, and mini‑games.",
        es:"Puedo ayudar con la navegación, cursos, ajustes y minijuegos.",
        fr:"Je peux aider avec la navigation, les cours, les réglages et les mini‑jeux.",
        zh:"我可以帮助网站导航、课程、设置和小游戏。",
        ar:"أستطيع المساعدة في التصفح والدورات والإعدادات والألعاب الصغيرة.",
        hi:"मैं साइट नेविगेशन, पाठ्यक्रम, सेटिंग्स और मिनी‑गेम्स में मदद कर सकता/सकती हूँ।",
        pt:"Posso ajudar com navegação, cursos, configurações e mini‑jogos.",
        de:"Ich helfe bei Navigation, Kursen, Einstellungen und Minispielen.",
        it:"Posso aiutare con navigazione, corsi, impostazioni e mini‑giochi.",
        ru:"Я могу помочь с навигацией, курсами, настройками и мини‑играми."
      };
      return dict[lang] || dict.en;
    }
    var sendBtn=document.getElementById('send');
    sendBtn.onclick=function(){
      var log=document.getElementById('log');
      var m=document.getElementById('msg').value.trim();
      var lang=document.getElementById('lang').value||'en';
      var f=document.getElementById('img').files[0];
      if(m){ log.innerHTML+='<div style="color:#ffd9b3">🧑 '+m+'</div>'; }
      if(f){ var r=new FileReader(); r.onload=function(){ log.innerHTML+='<div>📎 '+f.name+'<br><img src="'+r.result+'" style="max-width:100%"></div>'; log.scrollTop=log.scrollHeight; }; r.readAsDataURL(f); }
      var reply=respond(m, lang);
      setTimeout(function(){ log.innerHTML+='<div>🤖 '+reply+'</div>'; log.scrollTop=log.scrollHeight; }, 200);
      document.getElementById('msg').value=''; document.getElementById('img').value='';
    };

    // Slots
    var rsSel=document.getElementById('rs'), bsSel=document.getElementById('bs'), rwrap=document.getElementById('rwrap');
    function buildReels(){
      var n=parseInt(rsSel.value,10); rwrap.innerHTML='';
      for(var i=0;i<n;i++){ rwrap.appendChild(el('div',{class:'reel'},'🍒')); }
    }
    rsSel.onchange=buildReels; buildReels();

    function spinOnce(){
      var syms=['🍒','⭐','🔔','7️⃣','💎','🍋','🍀']; var reels=rwrap.querySelectorAll('.reel');
      var idx=0; function tick(){
        for(var i=0;i<reels.length;i++){ reels[i].textContent = syms[(Math.floor(Math.random()*syms.length))]; }
        idx++; if(idx<18){ requestAnimationFrame(tick); } else { /* end */ }
      } tick();
    }
    document.getElementById('spin').onclick=function(){ spinOnce(); };

    // Lever drag
    var leverA=document.getElementById('leverA'), knob=document.getElementById('leverK');
    var dragging=false, startY=0, startBottom=16;
    knob.addEventListener('mousedown', function(e){ dragging=true; leverA.classList.add('drag'); startY=e.clientY; e.preventDefault(); });
    document.addEventListener('mousemove', function(e){
      if(!dragging) return;
      var dy = Math.min(80, Math.max(0, e.clientY-startY));
      knob.style.bottom = (startBottom - 0 + dy) + 'px';
    });
    document.addEventListener('mouseup', function(e){
      if(!dragging) return; dragging=false; leverA.classList.remove('drag');
      spinOnce();
      // auto return
      knob.style.transition='bottom .25s ease-out'; knob.style.bottom=startBottom+'px';
      setTimeout(function(){ knob.style.transition=''; }, 260);
    });
  }

  // Home page: vertical buttons + reorder + columns under the buttons
  function enhanceHome(){
    var grid=document.getElementById('courseGrid'); if(!grid) return;
    var container = grid.closest('div'); if(!container) return;
    var root=document.querySelector('main .wrap')||document.body;
    // Apply saved columns
    var cols=localStorage.getItem('home_cols')||'1'; document.body.classList.remove('cols-1','cols-2','cols-4'); document.body.classList.add('cols-'+cols);
    // Reorder from storage
    var order = (localStorage.getItem('home_order')||'').split(',').filter(Boolean);
    if(order.length){
      var map={}; var nodes=grid.querySelectorAll('a.pill-link'); nodes.forEach(function(n){ map[n.getAttribute('href')]=n; });
      order.forEach(function(href){ if(map[href]) grid.appendChild(map[href]); });
    }
    // Columns selector UNDER the buttons
    var controls = el('div',{class:'controls'},"Columns: <select id='colsel'><option value='1'>1</option><option value='2'>2</option><option value='4'>4</option></select>");
    grid.insertAdjacentElement('afterend', controls);
    var colsel=document.getElementById('colsel'); colsel.value=cols;
    colsel.onchange=function(){ var v=this.value; document.body.classList.remove('cols-1','cols-2','cols-4'); document.body.classList.add('cols-'+v); localStorage.setItem('home_cols', v); };

    // Drag & drop within grid
    var drag=null;
    grid.querySelectorAll('a.pill-link').forEach(function(btn){
      btn.setAttribute('draggable','true');
      btn.addEventListener('dragstart', function(e){ drag=btn; btn.classList.add('drag-ghost'); });
      btn.addEventListener('dragend', function(e){ btn.classList.remove('drag-ghost'); drag=null;
        // save order
        var hrefs=[].map.call(grid.querySelectorAll('a.pill-link'), function(n){ return n.getAttribute('href'); });
        localStorage.setItem('home_order', hrefs.join(','));
      });
      btn.addEventListener('dragover', function(e){ e.preventDefault(); if(!drag || drag===btn) return;
        var r=btn.getBoundingClientRect(); grid.insertBefore(drag, (e.clientY-r.top) > r.height/2 ? btn.nextSibling : btn);
      });
    });
  }

  ready(function(){ attachCorners(); enhanceHome(); });
})();