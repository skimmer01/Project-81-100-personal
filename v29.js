/* Project 0→100 V2.9 — contextual AI-style coach */
(function(){
  function boot(){
    const f=document.getElementById('app'),d=f&&f.contentDocument,w=f&&f.contentWindow;
    if(!d||!w||d.getElementById('v29Coach'))return;
    const KEY='project0100_v4',day=()=>new Date().toISOString().slice(0,10);
    const read=()=>{try{return JSON.parse(w.localStorage.getItem(KEY)||'{}')}catch(e){return {}}};
    function snapshot(){
      const cards=[...(d.getElementById('anchorGrid')?.querySelectorAll('.anchor')||[])];
      let wolf=false,train=false,fuel=false;
      cards.forEach(c=>{const t=c.textContent.toLowerCase(),done=c.classList.contains('done')||/✓|done|2\/2|5\/5/i.test(c.textContent);if(t.includes('wolf'))wolf=done;else if(t.includes('train')||t.includes('workout'))train=done;else if(t.includes('fuel')||t.includes('meal')||t.includes('food'))fuel=done});
      const s=read(),fd=(s.fuelByDate||{})[day()]||{},water=Math.max(0,Math.min(8,Number(fd.water)||0)),clean=!!d.getElementById('v26GambleDone');
      const missions=[...(d.getElementById('missionList')?.querySelectorAll('.item')||[])].map(x=>({text:(x.querySelector('div[style*="flex"]')?.textContent||'').trim(),done:!!x.querySelector('input')?.checked})).filter(x=>x.text);
      return {wolf,train,fuel,water,waterDone:water>=8,clean,missions,score:(wolf?20:0)+(train?25:0)+(fuel?20:0)+(water>=8?15:0)+(clean?20:0),streak:Number(s.gambling||0)};
    }
    function advice(mode){
      const x=snapshot(),open=x.missions.find(m=>!m.done);
      if(mode==='simplify'){
        const moves=[]; if(!x.wolf)moves.push('Walk Wolfie'); if(!x.train)moves.push('train'); if(!x.waterDone)moves.push('finish your water'); if(open)moves.push(open.text);
        return {title:'Make today smaller.',why:'You do not need to attack everything. '+(moves.length?'Your shortest path to momentum is '+moves.slice(0,3).join(', ')+'.':'The essentials are handled. Protect the win.'),action:moves[0]||'Do something you enjoy on purpose.'};
      }
      if(mode==='push'){
        if(!x.train)return {title:'Go train now.',why:'Training is worth 25 points and it changes the energy of the whole day.',action:'Open Body and start the first exercise.'};
        if(open)return {title:'Close the mission.',why:'You already created momentum. Finish something meaningful instead of starting something new.',action:open.text};
      }
      if(mode==='surprise'){
        const pool=[{title:'Change the scenery.',why:'A quick reset can break autopilot and make the next decision easier.',action:'Go outside for 10 minutes with no scrolling.'},{title:'Create evidence.',why:'One tiny completed action beats another plan.',action:'Pick the smallest unfinished thing and finish it.'},{title:'Add some joy.',why:'Your 100 is a life, not just a productivity score.',action:'Do one thing purely because it sounds fun.'}];
        return pool[Math.floor(Math.random()*pool.length)];
      }
      if(!x.waterDone&&x.water>=5)return {title:'Finish the easy points.',why:'You are already at '+x.water+'/8 water. Close that loop before adding another task.',action:'Finish your water check.'};
      if(!x.wolf)return {title:'Take Wolfie out.',why:'It gets an anchor done, gets you moving, and changes your environment at the same time.',action:'Walk Wolfie — phone in pocket.'};
      if(!x.train)return {title:'Move your body next.',why:'Your day is at '+x.score+'/100. Training is the biggest unfinished physical lever.',action:'Tap Body and start — even 10 minutes counts as starting.'};
      if(open)return {title:'Finish, don’t add.',why:'Your essentials are moving. The best next move is one of the missions you already chose.',action:open.text};
      if(!x.clean)return {title:'Protect the streak.',why:'A clean choice is part of today’s 100 and reinforces the person you are becoming.',action:'Mark today’s clean choice when you have it locked in.'};
      return {title:'You earned some life.',why:'The board is handled. More productivity is not automatically better.',action:'Choose something fun, social, adventurous, or restful on purpose.'};
    }
    function show(mode='coach'){
      const a=advice(mode),p=d.getElementById('actionPanel'); if(!p)return;
      p.classList.add('show'); p.innerHTML='<div class="label">✨ YOUR COACH • '+mode.toUpperCase()+'</div><div class="missionText">'+a.title+'</div><div class="small" style="margin-top:9px">'+a.why+'</div><div style="margin-top:12px;padding:12px;border:1px solid #31505a;border-radius:14px;background:rgba(53,215,239,.06)"><div class="label">DO THIS NEXT</div><strong>'+a.action+'</strong></div><div class="grid2" style="margin-top:10px"><button class="btn primary" id="v29Do">Do it</button><button class="btn secondary" id="v29Again">Give me another</button></div>';
      d.getElementById('v29Do').onclick=()=>{if(/body|train|exercise/i.test(a.action))w.goView&&w.goView('bodyView');else {p.innerHTML='<div class="med">✓ GO.</div><div class="small">No more planning this one. Start the move.</div>'}};
      d.getElementById('v29Again').onclick=()=>show('surprise');
    }
    const hero=d.querySelector('.missionHero'); if(!hero)return;
    const card=d.createElement('div');card.id='v29Coach';card.className='card glow';
    card.innerHTML='<div class="row"><div><div class="label">✨ PERSONAL COACH</div><div class="med">What should I do next?</div><div class="small" style="margin-top:5px">Uses today’s score, unfinished anchors, missions and recent app state.</div></div></div><button class="btn primary" style="width:100%;margin-top:12px" id="v29Ask">✨ Coach Me</button><div class="choice"><button class="btn ghost sm" data-m="push">Push Me</button><button class="btn ghost sm" data-m="simplify">Simplify Today</button><button class="btn ghost sm" data-m="surprise">Surprise Me</button></div>';
    hero.insertAdjacentElement('afterend',card);
    d.getElementById('v29Ask').onclick=()=>show('coach');
    card.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>show(b.dataset.m));
  }
  const f=document.getElementById('app');if(f){f.addEventListener('load',()=>setTimeout(boot,500));setTimeout(boot,1200)}
})();