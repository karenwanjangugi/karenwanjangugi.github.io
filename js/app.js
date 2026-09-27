/* ================= ENGINE ================= */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=id=>document.getElementById(id);
const root=document.documentElement;
const loadedFonts=new Set(['anthro']);
function loadFonts(k){
  if(loadedFonts.has(k)) return; loadedFonts.add(k);
  const l=document.createElement('link'); l.rel='stylesheet'; l.href=`https://fonts.googleapis.com/css2?family=${FONTS[k]}&display=swap`; document.head.appendChild(l);
}
const found={}, golden={};
ORDER.forEach(k=>{found[k]=new Set();golden[k]=false});
const sections=[...document.querySelectorAll('[data-stop]')];
let cur=-1, hintMode=false, cards=[];

/* ---------- surface textures per world ---------- */
const nz=({type='fractalNoise',f='.8',o=2,m,size=180,seed=1})=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><filter id='n' x='0' y='0' width='100%' height='100%'><feTurbulence type='${type}' baseFrequency='${f}' numOctaves='${o}' seed='${seed}' stitchTiles='stitch'/><feColorMatrix values='${m}'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`)}")`;
const DK=(a,b)=>`0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${a} 0 0 0 ${b}`, LT=(a,b)=>`0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${a} 0 0 0 ${b}`, CL=(r,g,bl,a,b)=>`0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${bl} ${a} 0 0 0 ${b}`;
const grainD=(a=.9)=>nz({f:'.9',m:DK(a,-a*.42)}), grainL=(a=.8)=>nz({f:'.9',m:LT(a,-a*.45),seed:3});
const fibers=(c='LT')=>nz({type:'turbulence',f:'0.012 0.2',o:2,size:300,seed:6,m:c==='LT'?LT(-3.2,.85):CL(.45,.3,.15,-3,.6)});
const TEX={
  anthro:{tex:[nz({type:'turbulence',f:'0.008 0.016',o:2,size:420,seed:2,m:LT(-4.2,1.05)}),grainL(.5)].join(','),op:.45,ctex:grainD(.45)},
  kawaii:{tex:[fibers(),grainD(.3),'radial-gradient(circle,rgba(255,255,255,.9) 3px,transparent 3.6px) 0 0/28px 28px'].join(','),op:.7,ctex:[fibers(),grainD(.35)].join(',')},
  kitsch:{tex:'radial-gradient(circle,#FFE600 2.2px,transparent 2.8px) 0 0/16px 16px,repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px)',op:.4,ctex:'radial-gradient(circle,rgba(0,0,0,.14) 1.3px,transparent 1.7px) 0 0/6px 6px'},
  graffiti:{tex:[grainD(1.1),nz({f:'.02',o:3,size:400,seed:8,m:DK(1.2,-.5)}),grainL(.6)].join(','),op:.55,ctex:[grainD(.8),nz({f:'1.4',o:1,seed:9,m:CL(1,.18,.6,6,-4.2)})].join(',')},
  gothic:{tex:[nz({f:'.012',o:3,size:420,seed:4,m:DK(1.3,-.55)}),grainD(.9),'radial-gradient(ellipse at 50% 40%,transparent 50%,rgba(0,0,0,.55))'].join(','),op:.8,ctex:[nz({f:'.02',o:3,size:360,seed:5,m:CL(.35,.22,.1,1.2,-.5)}),grainD(.5)].join(',')},
  doodle:{tex:['linear-gradient(#DCE6F7 1px,transparent 1px) 0 0/28px 28px','linear-gradient(90deg,#DCE6F7 1px,transparent 1px) 0 0/28px 28px',grainD(.35)].join(','),op:1,ctex:grainD(.4)},
  medieval:{tex:[nz({f:'.006',o:3,size:520,seed:12,m:CL(.45,.3,.12,1.5,-.62)}),fibers('CL'),grainD(.5),'radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(90,55,20,.35))'].join(','),op:.85,ctex:[nz({f:'.015',o:3,size:360,seed:13,m:CL(.45,.3,.12,1.4,-.6)}),grainD(.45)].join(',')},
  pixel:{tex:['radial-gradient(circle,#fff 1px,transparent 1.5px) 0 0/90px 70px','radial-gradient(circle,#FFD23F 1px,transparent 1.5px) 40px 30px/130px 110px','repeating-linear-gradient(0deg,rgba(0,0,0,.35) 0 1px,transparent 1px 3px)','repeating-conic-gradient(rgba(255,255,255,.035) 0 25%,transparent 0 50%) 0 0/4px 4px'].join(','),op:.8,ctex:'repeating-conic-gradient(rgba(255,255,255,.05) 0 25%,transparent 0 50%) 0 0/4px 4px,repeating-linear-gradient(0deg,rgba(0,0,0,.28) 0 1px,transparent 1px 3px)'},
  y2k:{tex:['linear-gradient(115deg,rgba(255,154,216,.45),rgba(159,243,255,.45) 30%,rgba(184,166,255,.45) 60%,rgba(255,227,138,.4))','radial-gradient(circle,rgba(255,255,255,.95) 1.5px,transparent 2px) 0 0/60px 60px'].join(','),op:.6,ctex:'linear-gradient(180deg,rgba(255,255,255,.75),rgba(255,255,255,0) 38%),linear-gradient(115deg,rgba(255,154,216,.16),rgba(159,243,255,.16) 50%,rgba(184,166,255,.16))'},
};
function applyTex(k){const t=TEX[k];root.style.setProperty('--tex',t.tex);root.style.setProperty('--tex-op',t.op);root.style.setProperty('--ctex',t.ctex)}
function setWorld(k){
  W=k; T=STYLE[k]; const D=WORLDS[k];
  root.setAttribute('data-world',k); root.classList.toggle('pixel-world',k==='pixel');
  loadFonts(k); applyTex(k);
  $('scene').innerHTML=scenery(k);
  [0,1,2,4,5].forEach(i=>$('e'+i).textContent=D.eb[i]);
  $('name').innerHTML=[...'KAREN'].map((l,i)=>`<span aria-hidden="true" style="animation-delay:${-i*.25}s">${l}</span>`).join('');
  $('cta1').textContent=D.cta[0]; $('cta2').textContent=D.cta[1];
  paintAvatars();
  $('crewTitle').textContent=D.crewTitle; $('crewIntro').textContent=D.crewIntro;
  $('roster').innerHTML=CREW.map((m,i)=>{const [who,art,say]=CAST[k][i];return `<article class="mate" tabindex="0"><div class="tb"><span>● ${who}</span><i></i><i></i><i></i></div><span class="say">${say}</span>
    <div class="pic" style="background:${T.tile(P(m.c),P(m.c+2))}"><div class="slot">${ART[art](P(m.c+1))}</div></div>
    <span class="who">${who}</span><span class="job">${m.job}</span><p>${m.text}</p><div class="tags">${m.tags.map(t=>`<span>${t}</span>`).join('')}</div></article>`}).join('');
  const proj=$('s3'); proj.classList.toggle('pan',D.proj==='pan');
  $('strip').innerHTML=`<div class="intro-panel"><span class="eyebrow">${D.eb[3]}</span><h2>${D.projTitle}</h2><p>${D.projIntro}</p><span class="hint">${D.hint}</span></div>`+
    PROJECTS.map((p,i)=>`<article class="chest"><div class="tb"><span>${p.slug}.exe</span><i></i><i></i><i></i></div>
      <div class="art" style="background:${T.tile(P(p.c[0]),P(p.c[1]))}"><span class="num">${D.num(i)}</span><span class="status">${p.status}</span><div class="slot">${ART[CAST[k][PROJ_ROLE[i]][1]](P(p.c[1]+2))}</div></div>
      <div><h3>${p.name}</h3><span class="kind">${p.kind}</span></div>
      <div><p>${p.text}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="plinks">${(p.links||[]).map(([l,u])=>`<a href="${u}" target="_blank" rel="noopener">${l} ↗</a>`).join('')}</div></div></article>`).join('');
  $('pathTitle').textContent=D.pathTitle;
  $('stackTrack').innerHTML=(STACK.map(n=>`<span class="chip"><i></i>${n}</span>`).join('')).repeat(2);
  $('stops').innerHTML=STOPS.map(([t,h,p])=>`<li class="stop"><span class="dot"></span><span class="tag">${t}</span><h3>${h}</h3><p>${p}</p></li>`).join('');
  $('contactTitle').textContent=D.contactTitle; $('contactText').textContent=D.contactText; $('sendBtn').textContent=D.send;
  $('foot').textContent=`${D.foot} · © 2026 Karen · ${D.title}`;
  $('trail').innerHTML=D.stops.map((t,i)=>`<a href="#${sections[i].id}"><span>${t}</span><i></i></a>`).join('');
  document.querySelectorAll('.gem').forEach(g=>{g.innerHTML=GEMS[k];g.classList.remove('got');g.hidden=found[k].has(+g.dataset.g);g.setAttribute('aria-label',`A hidden ${D.coll[0]}`)});
  $('count').textContent=`${cap(D.coll[1])} found: ${found[k].size} / 5`;
  $('portalLbl').textContent=D.title;
  $('note').hidden=true;
  cur=-1;
  if(k==='pixel') pixelate();
  buildDots(); bindDrag();
  try{localStorage.setItem('karen-world',k)}catch(e){}
  requestAnimationFrame(()=>{buildPath();onScroll()});
}
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function paintAvatars(){
  const a=avatar(W,golden[W]);
  ['avHero','avAbout','guideHead','avReward'].forEach(id=>$(id).innerHTML=a);
  if(W==='pixel') pixelate();
}
function pixelate(){
  document.querySelectorAll('.slot svg,.gem svg').forEach(svg=>{
    const vb=svg.viewBox.baseVal; if(!vb||!vb.width) return;
    const big=svg.closest('#avHero,#avAbout,#avReward');
    const cw=big?84:svg.closest('.gem')?20:52, ch=Math.round(cw*vb.height/vb.width);
    const img=new Image();
    img.onload=()=>{ if(!svg.isConnected||W!=='pixel') return;
      const c=document.createElement('canvas'); c.width=cw; c.height=ch; const x=c.getContext('2d'); x.imageSmoothingEnabled=false; x.drawImage(img,0,0,cw,ch); dither(x,cw,ch); svg.replaceWith(c); };
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(svg));
  });
}

const BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function dither(x,w,h){const d=x.getImageData(0,0,w,h),a=d.data;
  for(let y=0;y<h;y++)for(let i=0;i<w;i++){const p=(y*w+i)*4; if(a[p+3]<110){a[p+3]=0;continue} a[p+3]=255; const t=(BAYER[(y%4)*4+i%4]/16-.5)*56;
    for(let c=0;c<3;c++){a[p+c]=Math.max(0,Math.min(255,Math.round((a[p+c]+t)/64)*64))}}
  x.putImageData(d,0,0)}
/* ---------- guide ---------- */
const line=$('line'), bubble=$('bubble'), count=$('count'); let tuckT;
function say(t,ms=5500){line.textContent=t;bubble.classList.remove('pop','tuck');void bubble.offsetWidth;bubble.classList.add('pop');clearTimeout(tuckT);tuckT=setTimeout(()=>bubble.classList.add('tuck'),ms)}
$('guideHead').addEventListener('click',e=>{
  hintMode=true; burst(e.clientX,e.clientY,12); const D=WORLDS[W], n=found[W].size;
  say(n<5?`Psst! 5 ${D.coll[1]} are hidden in this world. You've found ${n}. Check the top of the page, my picture, the crew, the path and the contact card.`:`You found every ${D.coll[0]} and won ${PRIZES[W][0]}! Each world has a different prize. Go explore!`,8000);
  setTimeout(()=>hintMode=false,8000);
});
document.querySelectorAll('.gem').forEach(g=>g.addEventListener('click',e=>{
  const D=WORLDS[W]; found[W].add(+g.dataset.g); g.classList.add('got'); burst(e.clientX,e.clientY,26);
  const n=found[W].size; count.textContent=`${cap(D.coll[1])} found: ${n} / 5`;
  say(n<5?`You found a ${D.coll[0]}! ${5-n} more to go. There's a prize at the end.`:`That's all five ${D.coll[1]}! Prize time!`);
  if(n===5){ golden[W]=true; setTimeout(()=>{paintAvatars();$('rewardTitle').textContent=`Prize unlocked: ${PRIZES[W][0]}`;$('rewardDesc').textContent=`All 5 ${D.coll[1]} found! ${PRIZES[W][1]}`;$('reward').hidden=false;$('closeReward').focus()},800); }
}));
$('closeReward').addEventListener('click',()=>{$('reward').hidden=true});

/* ---------- portal ---------- */
const portal=$('portal');
const PV=['octo','crab','jelly','star','fish','octo','jelly','crab','star'];
function openPortal(){
  ORDER.forEach(loadFonts);
  const keepT=T, keepW=W;
  $('isles').innerHTML=ORDER.map((k,i)=>{T=STYLE[k];W=k;const D=WORLDS[k];const art=ART[CAST[k][1][1]](P(i+1));
    return `<button class="isle${k===keepW?' cur':''}" type="button" data-w="${k}" style="background:${D.preview}">${k===keepW?'<span class="here">YOU ARE HERE</span>':''}
      <span class="pv">${art}</span><span style="background:rgba(10,8,30,.8);border-radius:14px;padding:10px 12px"><b style="font-family:'${D.font}',var(--mono)">${D.title}</b><small>${D.style} · ${D.tag}</small></span></button>`}).join('');
  T=keepT; W=keepW;
  portal.hidden=false; $('portalClose').focus();
}
$('portalBtn').addEventListener('click',openPortal);
$('portalClose').addEventListener('click',()=>portal.hidden=true);
portal.addEventListener('click',e=>{ if(e.target===portal) portal.hidden=true; const b=e.target.closest('.isle'); if(b){portal.hidden=true;switchWorld(b.dataset.w,e.clientX,e.clientY)} });
addEventListener('keydown',e=>{ if(e.key==='Escape'){portal.hidden=true;$('reward').hidden=true} });
function switchWorld(k,x,y){
  if(k===W) return;
  const at=Math.max(0,cur);
  root.style.setProperty('--vx',x+'px'); root.style.setProperty('--vy',y+'px');
  const go=()=>{ setWorld(k); const prev=root.style.scrollBehavior; root.style.scrollBehavior='auto'; sections[at].scrollIntoView(); root.style.scrollBehavior=prev; say(WORLDS[k].lines[at]); };
  if(document.startViewTransition && !reduce) document.startViewTransition(go); else go();
}

/* ---------- scroll: stops, pan, path ---------- */
const proj=$('s3'), strip=$('strip'), rope=$('rope');
const pathWrap=$('pathWrap'), pathBase=$('pathBase'), pathLive=$('pathLive'), svgP=$('pathSvg'); let pathLen=0;
function buildPath(){
  const wr=pathWrap.getBoundingClientRect();
  const pts=[...document.querySelectorAll('.stop .dot')].map(d=>{const r=d.getBoundingClientRect();return [r.left+r.width/2-wr.left,r.top+r.height/2-wr.top]});
  if(pts.length<2) return;
  let d=`M${pts[0][0]} ${pts[0][1]-60} L${pts[0][0]} ${pts[0][1]}`;
  for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i],my=(y0+y1)/2;d+=` C${x0} ${my} ${x1} ${my} ${x1} ${y1}`}
  svgP.setAttribute('viewBox',`0 0 ${wr.width} ${wr.height}`);
  pathBase.setAttribute('d',d); pathLive.setAttribute('d',d);
  const cs=getComputedStyle(root), pw=parseFloat(cs.getPropertyValue('--path-w'))||5;
  pathBase.setAttribute('stroke',cs.getPropertyValue('--path-base').trim()); pathLive.setAttribute('stroke',cs.getPropertyValue('--path-c').trim());
  pathLive.setAttribute('stroke-width',pw); pathLive.setAttribute('filter',W==='graffiti'?'url(#f-spray)':W==='doodle'?'url(#rough)':'');
  pathLive.setAttribute('stroke-linecap',W==='pixel'?'butt':'round');
  pathBase.setAttribute('stroke-width',pw); pathBase.setAttribute('stroke-dasharray',W==='pixel'?'10 10':'2 12');
  pathLen=pathLive.getTotalLength(); pathLive.style.strokeDasharray=pathLen;
}
function onScroll(){
  const vh=innerHeight;
  let idx=0; sections.forEach((s,i)=>{if(s.getBoundingClientRect().top<vh*.45) idx=i});
  if(idx!==cur){cur=idx; [...$('trail').children].forEach((a,i)=>{a.classList.toggle('on',i===idx);a.classList.toggle('passed',i<idx)}); if(!hintMode) say(WORLDS[W].lines[idx]);}
  if(proj.classList.contains('pan') && innerWidth>820){
    const r=proj.getBoundingClientRect(), total=proj.offsetHeight-vh, p=Math.max(0,Math.min(1,-r.top/total));
    strip.style.transform=`translateX(${-p*Math.max(0,strip.scrollWidth-innerWidth)}px)`; rope.style.width=(p*100)+'%';
  } else strip.style.transform='';
  if(pathLen){const r=pathWrap.getBoundingClientRect(), p=Math.max(0,Math.min(1,(vh*.7-r.top)/r.height)); pathLive.style.strokeDashoffset=reduce?0:pathLen*(1-p);}
}
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',()=>{buildPath();onScroll()});

/* ---------- mobile swipe dots (pan worlds) ---------- */
const dots=$('swipeDots');
function buildDots(){
  const panels=[...strip.children];
  dots.innerHTML=panels.map((_,i)=>`<button type="button" aria-label="Go to panel ${i+1}"></button>`).join('')+'<span>Swipe →</span>';
  const btns=[...dots.querySelectorAll('button')];
  btns.forEach((b,i)=>b.addEventListener('click',()=>strip.scrollTo({left:panels[i].offsetLeft-20,behavior:reduce?'auto':'smooth'})));
  const sync=()=>{const c=strip.scrollLeft+strip.clientWidth/2;let k=0;panels.forEach((p,i)=>{if(p.offsetLeft<=c)k=i});btns.forEach((b,i)=>b.classList.toggle('on',i===k));dots.querySelector('span').hidden=k>0};
  strip.onscroll=sync; sync();
}

/* ---------- Y2K draggable windows ---------- */
function bindDrag(){
  if(W!=='y2k') return; let z=5;
  document.querySelectorAll('.chest .tb').forEach(tb=>{
    const win=tb.parentElement; let sx,sy,ox=0,oy=0,drag=false;
    tb.addEventListener('pointerdown',e=>{ if(innerWidth<=820) return; drag=true; sx=e.clientX; sy=e.clientY; const m=(win.style.translate||'0px 0px').split(' '); ox=parseFloat(m[0])||0; oy=parseFloat(m[1])||0; win.style.zIndex=++z; tb.setPointerCapture(e.pointerId); tb.style.cursor='grabbing'; });
    tb.addEventListener('pointermove',e=>{ if(!drag) return; win.style.translate=`${ox+e.clientX-sx}px ${oy+e.clientY-sy}px`; });
    tb.addEventListener('pointerup',()=>{drag=false;tb.style.cursor=''});
  });
}

/* ---------- contact ---------- */
const cs=$('s5'), lure=$('lure');
cs.addEventListener('pointermove',e=>{const r=cs.getBoundingClientRect();lure.style.left=(e.clientX-r.left)+'px';lure.style.top=(e.clientY-r.top)+'px'});
const copy=$('copy'), email=$('email');
const sel=el=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r)};
copy.addEventListener('click',()=>{try{navigator.clipboard.writeText(email.textContent).then(()=>{copy.textContent='Copied!';setTimeout(()=>copy.textContent='Copy',1500)},()=>{sel(email);copy.textContent='Selected'})}catch(e){sel(email);copy.textContent='Selected'}});
const form=$('form'), note=$('note');

form.addEventListener('submit',async e=>{
  e.preventDefault();

  const formData=new FormData(form);

  try{
    const response=await fetch('https://formspree.io/f/mgavprke',{
      method:'POST',
      body:formData,
      headers:{
        'Accept':'application/json'
      }
    });

    if(response.ok){
      note.hidden=false;
      note.innerHTML='<b>Message sent!</b> Thanks for reaching out — I\'ll get back to you soon.';
      form.reset();

      const r=form.getBoundingClientRect();
      burst(r.left+r.width/2,r.bottom-40,30);
      say("Sent my way! I'll write back soon.");
    }else{
      note.hidden=false;
      note.innerHTML='<b>Something went wrong.</b> Please try again or email me directly.';
    }
  }catch(err){
    note.hidden=false;
    note.innerHTML='<b>Something went wrong.</b> Please check your connection and try again.';
  }
});

/* ---------- particles per world ---------- */
const cv=$('fx'), cx=cv.getContext('2d'); let Wd,Ht; const ps=[];
function size(){const d=Math.min(devicePixelRatio||1,2);Wd=innerWidth;Ht=innerHeight;cv.width=Wd*d;cv.height=Ht*d;cx.setTransform(d,0,0,d,0,0)}
size(); addEventListener('resize',size);
const FALL={petal:1,confetti:1,gold:1};
function add(x,y,big){const f=WORLDS[W].fx, down=FALL[f];ps.push({x,y,r:(big?3:2)+Math.random()*(big?7:4),vy:(down?-1:1)*(.5+Math.random()*1.4),vx:(Math.random()-.5)*(f==='spray'?1.6:.4),ph:Math.random()*6,rot:Math.random()*6,c:P(Math.floor(Math.random()*6)),life:1})}
function burst(x,y,n){if(reduce)return;for(let i=0;i<n;i++)add(x+(Math.random()-.5)*50,y+(Math.random()-.5)*40,true)}
let last=0; addEventListener('pointermove',e=>{const t=performance.now();if(t-last>55){last=t;add(e.clientX,e.clientY,false)}});
function drawP(p){
  const f=WORLDS[W].fx, x=p.x+Math.sin(p.ph)*2.2, y=p.y, r=p.r;
  cx.save(); cx.translate(x,y);
  switch(f){
    case 'bubble': cx.beginPath();cx.arc(0,0,r,0,7);cx.strokeStyle='rgba(246,253,255,.8)';cx.lineWidth=1.6;cx.stroke();cx.fillStyle='rgba(191,241,255,.14)';cx.fill();cx.beginPath();cx.arc(-r*.35,-r*.35,r*.25,0,7);cx.fillStyle='#fff';cx.fill();break;
    case 'heart': cx.scale(r/6,r/6);cx.beginPath();cx.moveTo(0,3);cx.bezierCurveTo(-6,-2,-3,-7,0,-3);cx.bezierCurveTo(3,-7,6,-2,0,3);cx.fillStyle=p.c;cx.globalAlpha=.85;cx.fill();break;
    case 'confetti': cx.rotate(p.rot);cx.fillStyle=p.c;cx.fillRect(-r/2,-r/4,r,r/2);break;
    case 'spray': cx.beginPath();cx.arc(0,0,r*.45,0,7);cx.fillStyle=p.c;cx.globalAlpha=.8;cx.fill();break;
    case 'ember': cx.beginPath();cx.arc(0,0,r*.35,0,7);cx.fillStyle=Math.random()<.5?'#FFB347':'#C9A24B';cx.shadowColor='#FFB347';cx.shadowBlur=8;cx.globalAlpha=.9;cx.fill();break;
    case 'ink': cx.rotate(p.rot);cx.strokeStyle='#1E1E1E';cx.lineWidth=1.6;cx.beginPath();cx.moveTo(-r*.6,0);cx.lineTo(r*.6,0);cx.moveTo(0,-r*.6);cx.lineTo(0,r*.6);cx.stroke();break;
    case 'petal': cx.rotate(p.rot);cx.beginPath();cx.ellipse(0,0,r*.9,r*.45,0,0,7);cx.fillStyle=Math.random()<.02?p.c:(p.c);cx.globalAlpha=.8;cx.fill();break;
    case 'gold': {cx.rotate(p.rot);const s=r*.9;cx.fillStyle=Math.sin(p.ph*3)>0?'#E8C766':'#C9A24B';cx.globalAlpha=.9;cx.fillRect(-s/2,-s/3,s,s*.66);break}
    case 'pixel': {const s=Math.max(3,Math.round(r*.8));cx.fillStyle=p.c;cx.fillRect(Math.round(-s/2),Math.round(-s/2),s,s);break}
    case 'sparkle': {cx.rotate(p.rot*.2);const s=r;cx.beginPath();cx.moveTo(0,-s);cx.lineTo(s*.25,-s*.25);cx.lineTo(s,0);cx.lineTo(s*.25,s*.25);cx.lineTo(0,s);cx.lineTo(-s*.25,s*.25);cx.lineTo(-s,0);cx.lineTo(-s*.25,-s*.25);cx.closePath();cx.fillStyle=Math.random()<.5?'#fff':'#FF9AD8';cx.fill();break}
  }
  cx.restore();
}
function tick(){
  cx.clearRect(0,0,Wd,Ht);
  const f=WORLDS[W].fx;
  if(Math.random()<.07){ if(FALL[f]) add(Math.random()*Wd,-10,false); else add(Math.random()*Wd,Ht+10,false); }
  for(let i=ps.length-1;i>=0;i--){const p=ps[i];p.y-=p.vy;p.x+=p.vx;p.ph+=.05;p.rot+=.04;
    if(p.y<-30||p.y>Ht+30||ps.length>220){ps.splice(i,1);continue} drawP(p)}
  requestAnimationFrame(tick);
}
if(!reduce) tick();

/* ---------- boot ---------- */
let start='anthro';
const h=location.hash.slice(1); if(WORLDS[h]) start=h;
else { try{const s=localStorage.getItem('karen-world'); if(s&&WORLDS[s]) start=s}catch(e){} }
setWorld(start);
addEventListener('hashchange',()=>{const h=location.hash.slice(1); if(WORLDS[h]) switchWorld(h,innerWidth/2,innerHeight/2)});
(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>{buildPath();onScroll()});
