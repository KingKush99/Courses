
(function(){
  if(window.__chatbotInjected) return; window.__chatbotInjected=true;
  var css = document.createElement('style');
  css.textContent = ".cb-wrap{position:fixed;left:16px;bottom:16px;z-index:5000} .cb-btn{width:56px;height:56px;border-radius:999px;background:#2a1b12;border:1px solid #ffffff33;cursor:pointer;box-shadow:0 8px 18px #0008} .cb-panel{position:fixed;left:16px;bottom:80px;width:min(380px,92vw);height:60vh;background:#100b08;border:1px solid #ffffff22;border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 12px 26px #000c} .cb-head{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#1c120c;border-bottom:1px solid #ffffff22} .cb-log{flex:1;overflow:auto;padding:10px 12px} .cb-input{display:flex;gap:6px;padding:10px;background:#140b07;border-top:1px solid #ffffff22} .cb-msg{margin:6px 0} .cb-user{color:#ffd9b3} .cb-bot{color:#d6eaff} .cb-img{max-width:100%;border-radius:8px;border:1px solid #ffffff22;margin-top:4px}";
  document.head.appendChild(css);
  var wrap=document.createElement('div'); wrap.className='cb-wrap';
  wrap.innerHTML = "<button class='cb-btn' title='Assistant'>💬</button><div class='cb-panel' id='cbPanel'><div class='cb-head'><strong>Assistant</strong><button id='cbClose' class='pill-btn'>×</button></div><div class='cb-log' id='cbLog'></div><div class='cb-input'><input id='cbText' placeholder='Type here...' style='flex:1'><input id='cbFile' type='file' accept='image/*'><button id='cbSend' class='pill-btn'>Send</button></div></div>";
  document.body.appendChild(wrap);
  var btn=wrap.querySelector('.cb-btn'), panel=wrap.querySelector('#cbPanel'), log=wrap.querySelector('#cbLog');
  var text=wrap.querySelector('#cbText'), file=wrap.querySelector('#cbFile');
  wrap.querySelector('#cbClose').onclick=function(){ panel.style.display='none'; };
  btn.onclick=function(){ panel.style.display = panel.style.display==='flex'?'none':'flex'; if(panel.style.display==='flex'){ panel.style.display='flex'; greet(); } };
  function add(role, html){ var d=document.createElement('div'); d.className='cb-msg '+(role==='user'?'cb-user':'cb-bot'); d.innerHTML=html; log.appendChild(d); log.scrollTop=log.scrollHeight; }
  function t(lang,key){ var L=msgs[lang]||msgs.en; return L[key]||msgs.en[key]; }
  function detectLang(s){
    if(/[أ-ي]/.test(s)) return 'ar';
    if(/[一-龯]/.test(s)) return 'zh';
    if(/[А-Яа-я]/.test(s)) return 'ru';
    if(/[áéíóúñ]/i.test(s) || /\b(hola|gracias)\b/i.test(s)) return 'es';
    if(/\b(bonjour|merci)\b/i.test(s)) return 'fr';
    if(/\b(hallo|danke)\b/i.test(s)) return 'de';
    if(/\b(ciao|grazie)\b/i.test(s)) return 'it';
    if(/\b(namaste|shukriya)\b/i.test(s)) return 'hi';
    if(/\b(olá|obrigado)\b/i.test(s)) return 'pt';
    return 'en';
  }
  var msgs={
    en:{hello:"👋 Welcome! I’m your Assistant. Ask me anything about the site, games, or settings. I can also chat in your language of choice!", ask:"How can I help?", uploaded:"I see your screenshot (**{name}**). Tell me what to look for and I’ll guide you."},
    es:{hello:"👋 ¡Bienvenido! Soy tu Asistente. Pregunta sobre el sitio, juegos o ajustes. ¡Puedo hablar en tu idioma!", ask:"¿En qué te ayudo?", uploaded:"Veo tu captura (**{name}**). Dime qué debo revisar y te guío."},
    fr:{hello:"👋 Bienvenue ! Je suis votre assistant. Posez vos questions sur le site, les jeux ou les réglages. Je peux répondre dans votre langue !", ask:"Que puis-je faire ?", uploaded:"Je vois votre capture (**{name}**). Dites-moi quoi vérifier et je vous guiderai."},
    zh:{hello:"👋 欢迎！我是助手。有关网站、游戏或设置的问题都可以问。我也可以用你的语言交流！", ask:"我能帮你什么？", uploaded:"我看到了你的截图（**{name}**）。请告诉我需要查看什么，我会指导你。"},
    ar:{hello:"👋 أهلاً! أنا المساعد. اسألني عن الموقع أو الألعاب أو الإعدادات. أستطيع التحدث بلغتك!", ask:"كيف أساعدك؟", uploaded:"أرى لقطة الشاشة (**{name}**). أخبرني بما تريد وسأرشدك."},
    hi:{hello:"👋 नमस्ते! मैं आपका सहायक हूँ। साइट, गेम्स या सेटिंग्स के बारे में पूछें। मैं आपकी भाषा में भी बात कर सकता हूँ!", ask:"मैं कैसे मदद करूँ?", uploaded:"मैंने आपका स्क्रीनशॉट देखा (**{name}**). बताइए क्या देखना है, मैं गाइड करूँगा."},
    pt:{hello:"👋 Olá! Sou o Assistente. Pergunte sobre o site, jogos ou configurações. Posso falar no seu idioma!", ask:"Como posso ajudar?", uploaded:"Vi sua captura (**{name}**). Diga o que analisar e eu ajudo."},
    de:{hello:"👋 Willkommen! Ich bin dein Assistent. Frag mich zu Seite, Spielen oder Einstellungen. Ich kann auch auf deiner Sprache antworten!", ask:"Womit kann ich helfen?", uploaded:"Ich sehe deinen Screenshot (**{name}**). Sag mir, worauf ich achten soll."},
    it:{hello:"👋 Ciao! Sono il tuo Assistente. Chiedimi del sito, dei giochi o delle impostazioni. Posso parlare nella tua lingua!", ask:"Come posso aiutarti?", uploaded:"Vedo il tuo screenshot (**{name}**). Dimmi cosa cercare e ti guiderò."},
    ru:{hello:"👋 Привет! Я ваш помощник. Спрашивайте о сайте, играх или настройках. Могу отвечать на вашем языке!", ask:"Чем помочь?", uploaded:"Вижу ваш скриншот (**{name}**). Скажите, что искать, и я помогу."}
  };
  function greet(){ if(window.__greeted) return; window.__greeted=true; add('bot', t('en','hello')+"<br><small>"+t('en','ask')+"</small>"); }
  function navTo(course){ try{ window.location.href = (course.indexOf('/')>-1? course : (course + '/')); }catch(e){} }
  function siteIntent(text){
    var s=text.toLowerCase();
    if(s.indexOf('open ')===0){ return {type:'nav', target:s.replace('open ','').trim()}; }
    if(s.indexOf('go to ')===0){ return {type:'nav', target:s.replace('go to ','').trim()}; }
    if(s.indexOf('progress')>-1){ 
      var keys=['chess','coding-evolution','music-maker','offensive-coordinator','quantum','rugby1','poker','books','driving'];
      var out=[]; for(var i=0;i<keys.length;i++){ var k=keys[i]; var v=localStorage.getItem('progress_'+k)||'0'; out.push(k+': '+v+'%'); }
      return {type:'say', html:'Progress →<br>'+out.join('<br>')};
    }
    if(s.indexOf('help')>-1 || s.indexOf('settings')>-1){
      return {type:'say', html:'Try: "open chess", "open rugby1", "progress", "theme dark", "theme light".'};
    }
    if(s.indexOf('theme dark')>-1){ document.documentElement.style.filter='none'; return {type:'say', html:'Theme set to dark.'}; }
    if(s.indexOf('theme light')>-1){ document.documentElement.style.filter='brightness(1.1) contrast(0.95)'; return {type:'say', html:'Theme set to light-ish.'}; }
    return null;
  }
  function onSend(){
    var v=text.value||''; var f=file.files[0]; var lang=detectLang(v);
    if(v) add('user', v);
    if(f){ var reader=new FileReader(); reader.onload=function(){ add('user', '📎 '+f.name + '<br><img src=\"'+reader.result+'\" class=\"cb-img\">'); add('bot', t(lang,'uploaded').replace('{name}', f.name)); }; reader.readAsDataURL(f); }
    var intent=siteIntent(v);
    if(intent){
      if(intent.type==='nav'){ add('bot','Opening '+intent.target+' …'); navTo(intent.target); }
      else if(intent.type==='say'){ add('bot', intent.html); }
    } else if(v){
      add('bot', t(lang,'ask'));
    }
    text.value=''; file.value='';
  }
  wrap.querySelector('#cbSend').onclick=onSend;
  text.addEventListener('keydown', function(e){ if(e.keyCode===13){ onSend(); } });
})();