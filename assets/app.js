
(function(){
  if(window.__uiInjected) return; window.__uiInjected = true;

  function el(tag, cls, html){ var d=document.createElement(tag); if(cls) d.className=cls; if(html!=null) d.innerHTML=html; return d; }
  function attachCorners(){
    // Buttons
    var profile = el('button','corner','👤'); profile.id='profileBtn'; profile.title='Profile';
    var ham = el('button','corner','☰'); ham.id='hamBtn'; ham.title='Menu';
    var chat = el('button','corner','💬'); chat.id='chatBtn'; chat.title='Assistant';
    var slots = el('button','corner','🎰'); slots.id='slotsBtn'; slots.title='Mini Slots';
    document.body.appendChild(profile); document.body.appendChild(ham); document.body.appendChild(chat); document.body.appendChild(slots);

    // Profile click
    profile.onclick=function(){ window.location.href = (window.location.pathname.endsWith('/')?'':'./') + 'profile.html'; };

    // Hamburger panel
    var hamPanel = el('div','ham-panel'); hamPanel.innerHTML = ""
      + "<div class='ham-head'>Quick Menu</div>"
      + "<div class='ham-body'>"
      + " <div class='ham-section'><strong>Music</strong><div class='ham-sub'>"
      + "  <label><input type='checkbox' id='musOn'> Toggle On/Off</label><br>"
      + "  <label>Volume: <select id='vol'><option>Low</option><option selected>Medium</option><option>High</option><option>Mute</option></select></label><br>"
      + "  <label>Track: <select id='trk'><option>Default</option><option>Arcade</option><option>Chill</option><option>Custom Upload</option></select></label>"
      + " </div></div>"
      + " <div class='ham-section'><strong>Display</strong><div class='ham-sub'>"
      + "  <label>Theme: <select id='theme'><option>Dark</option><option>Light</option><option>High Contrast</option></select></label><br>"
      + "  <label>Text Size: <select id='tsz'><option>Default</option><option>Large</option><option>Small</option></select></label>"
      + " </div></div>"
      + " <div class='ham-section'><strong>Notifications</strong><div class='ham-sub'>"
      + "  <label><input type='checkbox' id='snd'> Sound Alerts</label><br>"
      + "  <label><input type='checkbox' id='pop'> Pop-ups</label><br>"
      + "  <label>Frequency: <select id='freq'><option>All</option><option>Major Only</option></select></label>"
      + " </div></div>"
      + "</div>";
    document.body.appendChild(hamPanel);
    ham.onclick=function(){ hamPanel.style.display = hamPanel.style.display==='flex' ? 'none' : 'flex'; hamPanel.style.display='flex'; };
    document.addEventListener('click', function(e){ if(hamPanel.style.display==='flex'){ if(!e.target.closest('.ham-panel') && e.target!==ham){ hamPanel.style.display='none'; } }});

    // Chatbot panel (starts English)
    var cbPanel = el('div','cb-panel'); cbPanel.innerHTML = ""
      + "<div class='cb-head'><strong>Assistant</strong><button id='cbClose' class='pill-btn'>×</button></div>"
      + "<div class='cb-log' id='cbLog'></div>"
      + "<div class='cb-input'><input id='cbText' placeholder='Type here...' style='flex:1'>"
      + "<select id='cbLang'><option value='en' selected>EN</option><option value='es'>ES</option><option value='fr'>FR</option><option value='zh'>ZH</option><option value='ar'>AR</option><option value='hi'>HI</option><option value='pt'>PT</option><option value='de'>DE</option><option value='it'>IT</option><option value='ru'>RU</option></select>"
      + "<input id='cbFile' type='file' accept='image/*'><button id='cbSend' class='pill-btn'>Send</button></div>";
    document.body.appendChild(cbPanel);
    var cbOpen=false;
    function cbT(l,k){ var m={
      en:{hello:"👋 Welcome! I’m your Assistant. Ask me anything about the site, games, or settings. I can also chat in your language of choice!", ask:"How can I help?", uploaded:"I see your screenshot (**{name}**). Tell me what to look for and I’ll guide you."},
      es:{hello:"👋 ¡Bienvenido! Soy tu Asistente.", ask:"¿En qué te ayudo?", uploaded:"Veo tu captura (**{name}**)."},
      fr:{hello:"👋 Bienvenue ! Je suis votre assistant.", ask:"Que puis-je faire ?", uploaded:"Je vois votre capture (**{name}**)."},
      zh:{hello:"👋 欢迎！我是助手。", ask:"我能帮你什么？", uploaded:"我看到了你的截图（**{name}**）。"},
      ar:{hello:"👋 أهلاً! أنا المساعد.", ask:"كيف أساعدك؟", uploaded:"أرى لقطة الشاشة (**{name}**)."},
      hi:{hello:"👋 नमस्ते! मैं आपका सहायक हूँ.", ask:"मैं कैसे मदद करूँ?", uploaded:"मैंने आपका स्क्रीनशॉट देखा (**{name}**)"},
      pt:{hello:"👋 Olá! Sou o Assistente.", ask:"Como posso ajudar?", uploaded:"Vi sua captura (**{name}**)."},
      de:{hello:"👋 Willkommen! Ich bin dein Assistent.", ask:"Womit kann ich helfen?", uploaded:"Ich sehe deinen Screenshot (**{name}**)."},
      it:{hello:"👋 Ciao! Sono il tuo Assistente.", ask:"Come posso aiutarti?", uploaded:"Vedo il tuo screenshot (**{name}**)."},
      ru:{hello:"👋 Привет! Я ваш помощник.", ask:"Чем помочь?", uploaded:"Вижу ваш скриншот (**{name}**)."}
    }; return (m[l]||m.en)[k]; }
    function cbAdd(role, html){ var d=el('div','cb-msg '+(role==='user'?'cb-user':'cb-bot'), html); document.getElementById('cbLog').appendChild(d); var log=document.getElementById('cbLog'); log.scrollTop=log.scrollHeight; }
    function cbGreet(){ var lang=document.getElementById('cbLang').value; cbAdd('bot', cbT(lang,'hello')+"<br><small>"+cbT(lang,'ask')+"</small>"); }
    document.getElementById('cbClose').onclick=function(){ cbPanel.style.display='none'; };
    document.getElementById('chatBtn').onclick=function(){ cbPanel.style.display = cbPanel.style.display==='flex'?'none':'flex'; if(cbPanel.style.display==='flex'&&!cbOpen){ cbOpen=true; cbGreet(); } };
    document.getElementById('cbSend').onclick=function(){ var lang=document.getElementById('cbLang').value; var v=document.getElementById('cbText').value; var f=document.getElementById('cbFile').files[0]; if(v){ cbAdd('user', v); } if(f){ var r=new FileReader(); r.onload=function(){ cbAdd('user','📎 '+f.name+'<br><img src=\"'+r.result+'\" class=\"cb-img\">'); cbAdd('bot', cbT(lang,'uploaded').replace('{name}', f.name)); }; r.readAsDataURL(f); } if(v&&!/open|progress|theme/i.test(v)){ cbAdd('bot', cbT(lang,'ask')); } document.getElementById('cbText').value=''; document.getElementById('cbFile').value=''; };

    // Slots panel (3-6 reels, 25/50/100 coins), lever
    var slotsPanel = el('div','slots-panel'); slotsPanel.innerHTML = ""
      + "<div class='slots-head'><strong>Mini Slots</strong><button id='slotsClose' class='pill-btn'>×</button></div>"
      + "<div class='slots-body'>"
      + " <div class='machine'>"
      + "   <div class='reels' id='reels'></div>"
      + "   <div class='lever' title='Pull me'><div class='knob' id='leverKnob'></div></div>"
      + " </div>"
      + " <div class='slots-controls'>"
      + "   <div class='sel'>Reels: <select id='reelSel'><option>3</option><option>4</option><option>5</option><option>6</option></select></div>"
      + "   <div class='sel'>Bet: <select id='betSel'><option>25</option><option>50</option><option>100</option></select></div>"
      + "   <button id='spinBtn' class='pill-btn'>Spin</button>"
      + " </div>"
      + "</div>";
    document.body.appendChild(slotsPanel);
    document.getElementById('slotsClose').onclick=function(){ slotsPanel.style.display='none'; };
    document.getElementById('slotsBtn').onclick=function(){ slotsPanel.style.display = slotsPanel.style.display==='flex'?'none':'flex'; if(slotsPanel.style.display==='flex'){ buildReels(); } };
    function buildReels(){ var r=document.getElementById('reels'); r.innerHTML=''; var n=parseInt(document.getElementById('reelSel').value,10); for(var i=0;i<n;i++){ var col=el('div','reel'); col.innerHTML = ['🍒','🍋','⭐','🔔','7️⃣','🍀','💎'].map(function(s){ return '<div>'+s+'</div>'; }).join(''); r.appendChild(col); } }
    document.getElementById('reelSel').onchange=buildReels; buildReels();

    function spin(){
      var cols=document.querySelectorAll('.reel'); for(var i=0;i<cols.length;i++){ (function(col){
        col.style.transition='none'; col.style.transform='translateY(0)';
        setTimeout(function(){ col.style.transition='transform 1s ease-out'; var dist = (100 + Math.random()*300)|0; col.style.transform='translateY(' + (-dist) + 'px)'; }, 10);
      })(cols[i]); }
      // Cursor change on lever pull handled below
    }
    document.getElementById('spinBtn').onclick=spin;

    // Lever mechanics
    var knob=document.getElementById('leverKnob'); var pulling=false, startY=0;
    knob.onmousedown=function(e){ pulling=true; startY=e.clientY; document.body.style.cursor='grabbing'; };
    document.addEventListener('mousemove',function(e){ if(!pulling) return; var dy = Math.max(0, Math.min(80, e.clientY - startY)); knob.style.bottom = (8 - dy) + 'px'; });
    document.addEventListener('mouseup',function(e){ if(!pulling) return; pulling=false; document.body.style.cursor='default'; // release -> spin and reset
      spin(); setTimeout(function(){ knob.style.bottom='8px'; }, 400);
    });
  }

  // Inject only once DOM ready
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', attachCorners); } else { attachCorners(); }
})();