/* Project 0→100 V2.7 — transparent scoring + 100 Day celebration */
(function(){
const PATCH='project0100_v27';
function boot(){
 const f=document.getElementById('app'),d=f&&f.contentDocument,w=f&&f.contentWindow;if(!d||!w)return;
 const day=()=>new Date().toISOString().slice(0,10);
 function css(){if(d.getElementById('v27style'))return;const s=d.createElement('style');s.id='v27style';s.textContent=`
 #v27ScoreNote{margin-top:7px;font-size:11px;color:#65e6a7;cursor:pointer;font-weight:800}.v27-breakdown{display:grid;gap:8px;margin-top:12px}.v27-row{display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #29313d}.v27-row:last-child{border-bottom:0}.v27-done{color:#65e6a7}.v27-left{color:#ffc86b}.v27-celebrate{text-align:center;padding:8px 0}.v27-100{font-size:44px;font-weight:950;line-height:1;margin:8px 0;background:linear-gradient(90deg,#35d7ef,#65e6a7,#ffc86b);-webkit-background-clip:text;color:transparent}.v27-sub{font-size:13px;color:#94a0ae;line-height:1.45}
 `;d.head.appendChild(s)}
 function gamblingConfirmed(){const b=d.getElementById('v26GambleDone');return !!b}
 function anchorState(){const cards=[...(d.getElementById('anchorGrid')?.querySelectorAll('.anchor')||[])];const out={wolfie:false,train:false,fuel:false};cards.forEach(c=>{const t=c.textContent.toLowerCase(),done=c.classList.contains('done')||/✓|done|2\/2|5\/5/i.test(c.textContent);if(t.includes('wolf'))out.wolfie=done;else if(t.includes('train')||t.includes('workout'))out.train=done;else if(t.includes('fuel')||t.includes('meal')||t.includes('food'))out.fuel=done});return out}
 function missionState(){const host=d.getElementById('missionList');if(!host)return {done:0,total:0};const checks=[...host.querySelectorAll('input[type="checkbox"]')];return {done:checks.filter(x=>x.checked).length,total:Math.min(3,checks.length)}}
 function calc(){const a=anchorState(),m=missionState(),g=gamblingConfirmed();const anchorPts=(a.wolfie?20:0)+(a.train?20:0)+(a.fuel?20:0);const missionPts=m.total?Math.round(20*(m.done/m.total)):20;const gamblePts=g?20:0;return {score:Math.min(100,anchorPts+missionPts+gamblePts),a,m,g,anchorPts,missionPts,gamblePts}}
 function missing(x){const z=[];if(!x.a.wolfie)z.push('Finish both Wolfie walks');if(!x.a.train)z.push('Complete today’s training');if(!x.a.fuel)z.push('Finish the fuel / food check');if(x.m.total&&x.m.done<x.m.total)z.push('Complete '+(x.m.total-x.m.done)+' remaining mission'+(x.m.total-x.m.done===1?'':'s'));if(!x.g)z.push('Confirm no gambling today');return z}
 function breakdown(){const x=calc(),p=d.getElementById('actionPanel');if(!p)return;p.classList.add('show');const miss=missing(x);p.innerHTML='<div class="label">TODAY’S SCORE</div><div class="med">'+x.score+'/100</div><div class="v27-breakdown">'+
 '<div class="v27-row"><span>🐺 Wolfie 2/2</span><strong class="'+(x.a.wolfie?'v27-done':'v27-left')+'">'+(x.a.wolfie?'20/20':'0/20')+'</strong></div>'+
 '<div class="v27-row"><span>🏋️ Train</span><strong class="'+(x.a.train?'v27-done':'v27-left')+'">'+(x.a.train?'20/20':'0/20')+'</strong></div>'+
 '<div class="v27-row"><span>🥗 Fuel Check</span><strong class="'+(x.a.fuel?'v27-done':'v27-left')+'">'+(x.a.fuel?'20/20':'0/20')+'</strong></div>'+
 '<div class="v27-row"><span>🎯 Today’s Missions</span><strong class="'+(x.missionPts===20?'v27-done':'v27-left')+'">'+x.missionPts+'/20</strong></div>'+
 '<div class="v27-row"><span>🛡️ Gambling-Free</span><strong class="'+(x.g?'v27-done':'v27-left')+'">'+x.gamblePts+'/20</strong></div></div>'+
 (miss.length?'<div class="small" style="margin-top:12px"><strong>Still available:</strong><br>'+miss.join('<br>')+'</div>':'<div class="v27-celebrate"><div class="v27-100">100 DAY</div><div class="v27-sub">You did what you said you would do. That is the whole point.</div></div>')+
 '<button class="btn primary" style="width:100%;margin-top:12px" id="v27Close">Back to Today</button>';d.getElementById('v27Close').onclick=()=>{p.classList.remove('show');p.innerHTML=''}}
 function celebrateOnce(x){if(x.score!==100)return;let state={};try{state=JSON.parse(w.localStorage.getItem(PATCH)||'{}')}catch(e){}if(state.celebrated===day())return;state.celebrated=day();w.localStorage.setItem(PATCH,JSON.stringify(state));setTimeout(breakdown,250)}
 function run(){css();const x=calc(),el=d.getElementById('score'),bar=d.getElementById('scoreBar');if(el)el.textContent=x.score;if(bar)bar.style.width=x.score+'%';if(el){let n=d.getElementById('v27ScoreNote');if(!n){n=d.createElement('div');n.id='v27ScoreNote';el.closest('.card').appendChild(n);n.onclick=breakdown}const left=100-x.score;n.textContent=x.score===100?'🔥 100 DAY — tap to see the win':'⚡ '+left+' points left — tap to see what’s missing'}celebrateOnce(x)}
 run();setInterval(run,300)
 }
 const f=document.getElementById('app');if(f){f.addEventListener('load',()=>setTimeout(boot,300));setTimeout(boot,800)}
})();