
(function(){
  if(window.__uiInjected) return; window.__uiInjected=true;
  function el(t,c,h){var d=document.createElement(t); if(c) d.className=c; if(h!=null) d.innerHTML=h; return d;}
  function attach(){
    var p=el('button','corner','👤'); p.id='profileBtn'; p.title='Profile';
    var h=el('button','corner','☰'); h.id='hamBtn'; h.title='Menu';
    var c=el('button','corner','💬'); c.id='chatBtn'; c.title='Assistant';
    var s=el('button','corner','🎰'); s.id='slotsBtn'; s.title='Mini Slots';
    document.body.appendChild(p); document.body.appendChild(h); document.body.appendChild(c); document.body.appendChild(s);
    p.onclick=function(){ window.location.href=(window.location.pathname.endsWith('/')?'':'./')+'profile.html'; };

    var ham=el('div','panel ham'); ham.innerHTML="<div class='head'><strong>Menu</strong><button id='hamX' class='pill-btn'>×</button></div><div class='body'>"
      +"<strong>Music</strong><br><label><input type='checkbox'> On/Off</label><br><label>Volume <select><option>Low</option><option selected>Medium</option><option>High</option><option>Mute</option></select></label><hr>"
      +"<strong>Display</strong><br><label>Theme <select><option>Dark</option><option>Light</option><option>High Contrast</option></select></label><br><label>Text Size <select><option>Default</option><option>Large</option><option>Small</option></select></label><hr>"
      +"<strong>Notifications</strong><br><label><input type='checkbox'> Sound</label> <label><input type='checkbox'> Pop-ups</label> <label>Freq <select><option>All</option><option>Major Only</option></select></label>"
      +"</div>"; document.body.appendChild(ham);
    h.onclick=function(e){e.stopPropagation(); ham.style.display=ham.style.display==='flex'?'none':'flex';};
    document.getElementById('hamX').onclick=function(){ ham.style.display='none'; };
    document.addEventListener('click', function(e){ if(ham.style.display==='flex' && !e.target.closest('.ham') && e.target!==h){ ham.style.display='none'; }});

    var cb=el('div','panel cb'); cb.innerHTML="<div class='head'><strong>Assistant</strong><button id='cbX' class='pill-btn'>×</button></div><div id='log' style='flex:1;overflow:auto;padding:10px 12px'></div><div class='body'><input id='msg' placeholder='Type here...' style='width:70%'><select id='lang'><option value='en' selected>EN</option><option>ES</option><option>FR</option><option>ZH</option><option>AR</option><option>HI</option><option>PT</option><option>DE</option><option>IT</option><option>RU</option></select><input id='img' type='file' accept='image/*'><button id='send' class='pill-btn'>Send</button></div>"; document.body.appendChild(cb);
    c.onclick=function(){ cb.style.display=cb.style.display==='flex'?'none':'flex'; if(!cb.__g){ document.getElementById('log').innerHTML+="<div>👋 Welcome! I’m your Assistant. Ask me anything about the site, games, or settings. I can also chat in your language of choice!</div>"; cb.__g=true; } };
    document.getElementById('cbX').onclick=function(){ cb.style.display='none'; };
    document.getElementById('send').onclick=function(){ var m=document.getElementById('msg').value; var f=document.getElementById('img').files[0]; if(m){ document.getElementById('log').innerHTML+='<div style=color:#ffd9b3>'+m+'</div>'; } if(f){ var r=new FileReader(); r.onload=function(){ document.getElementById('log').innerHTML+='<div>📎 '+f.name+'<br><img src='+r.result+' style=max-width:100%></div>'; }; r.readAsDataURL(f); } document.getElementById('msg').value=''; document.getElementById('img').value=''; };

    var sl=el('div','panel sl'); sl.innerHTML="<div class='head'><strong>Mini Slots</strong><button id='slX' class='pill-btn'>×</button></div><div class='body'>Reels <select id='rs'><option>3</option><option>4</option><option>5</option><option>6</option></select> • Bet <select id='bs'><option>25</option><option>50</option><option>100</option></select><div id='rwrap' style='display:flex;gap:6px;margin-top:10px'></div><button id='spin' class='pill-btn'>Spin</button></div>"; document.body.appendChild(sl);
    s.onclick=function(){ sl.style.display=sl.style.display==='flex'?'none':'flex'; build(); };
    document.getElementById('slX').onclick=function(){ sl.style.display='none'; };
    function build(){ var n=parseInt(document.getElementById('rs').value,10); var w=document.getElementById('rwrap'); w.innerHTML=''; for(var i=0;i<n;i++){ var d=el('div',null,'🍒 ⭐ 🔔 7️⃣ 💎'); d.style.border='1px solid #ffffff22'; d.style.borderRadius='8px'; d.style.padding='12px'; w.appendChild(d);} }
    document.getElementById('rs').onchange=build; build();
    document.getElementById('spin').onclick=function(){ /* simple animation stub */ };
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', attach); } else { attach(); }
})();