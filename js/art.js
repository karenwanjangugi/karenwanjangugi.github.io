/* Art engine: styles, faces, characters, collectibles, avatars and scenery. */
/* ================= ART STYLES ================= */
const STYLE={
  anthro:{stroke:'#2A2350',sw:3.5,fo:1,face:'cartoon',eye:'#1B1640',filter:'f-clay',pal:['#FFD84A','#FF8AB0','#FFA947','#86D99A','#A68CFF','#7ED6F5'],tile:(a,b)=>`linear-gradient(135deg,${a},${b})`},
  kawaii:{stroke:'#6B5A8E',sw:3,fo:1,face:'anime',eye:'#3F2F5E',filter:'f-anime',pal:['#FFB3D4','#B8DCFF','#FFE8A3','#C8F2D4','#D9C8FF','#FFD1BA'],tile:(a)=>`radial-gradient(circle,rgba(255,255,255,.8) 2.5px,transparent 3px) 0 0/20px 20px,${a}`},
  kitsch:{stroke:'#111',sw:4.5,fo:1,face:'kitsch',eye:'#111',filter:'f-pop',pal:['#FF2FA0','#FFEA00','#00E0D0','#FF6A00','#8C4BFF','#7CFF6B'],tile:(a,b)=>`radial-gradient(circle,rgba(0,0,0,.2) 2px,transparent 2.6px) 0 0/10px 10px,linear-gradient(135deg,${a},${b})`},
  graffiti:{stroke:'#0B0B0D',sw:6.5,fo:1,face:'graffiti',eye:'#0B0B0D',filter:'f-spray',pal:['#39FF14','#FF2E97','#00E5FF','#FFE600','#FF6B00','#B26BFF'],tile:(a,b)=>`radial-gradient(circle at 28% 35%,${a} 0,transparent 55%),radial-gradient(circle at 75% 70%,${b} 0,transparent 50%),#26262C`},
  gothic:{stroke:'#140E18',sw:3,fo:1,face:'gothic',eye:'#0B0710',glow:'#C84A5A',filter:'f-etch',pal:['#8A7E9E','#8E4A5A','#6E8290','#9A8C7A','#6A7A86','#A0707E'],tile:(a)=>`radial-gradient(circle at 50% 38%,${a} 0,#1A1226 74%)`},
  doodle:{stroke:'#1E1E1E',sw:3,fo:1,face:'doodle',eye:'#1E1E1E',filter:'f-ink',pal:['#FFFFFF','#F3F3F3','#FFFFFF','#ECECEC','#FFFFFF','#F6F6F6'],tile:()=>`repeating-linear-gradient(0deg,transparent 0 22px,#CFDDF3 22px 23px),#FFFEF8`},
  medieval:{stroke:'#3A2418',sw:3,fo:1,face:'medieval',eye:'#3A2418',filter:'f-illum',pal:['#C9A24B','#C8412F','#2F4F9E','#3F7F5F','#C77D8B','#D9A441'],tile:(a)=>`radial-gradient(circle at 50% 45%,#F6EBCF 0,#F6EBCF 45%,${a} 46%,${a} 100%)`},
  pixel:{stroke:'#10101F',sw:5,fo:1,face:'pixel',eye:'#10101F',pal:['#FFD23F','#FF4F79','#3EE06D','#4FC3FF','#B26BFF','#FF9F1C'],tile:(a)=>`linear-gradient(rgba(0,0,0,.12) 2px,transparent 2px) 0 0/16px 16px,linear-gradient(90deg,rgba(0,0,0,.12) 2px,transparent 2px) 0 0/16px 16px,${a}`},
  y2k:{stroke:'#4B4F7A',sw:2.5,fo:1,face:'y2k',eye:'#2A1E4A',filter:'f-gloss',pal:['#D6D9E6','#B98CFF','#EEF0F8','#FF7BD5','#A9AFC6','#D8C8FF'],tile:(a,b)=>`radial-gradient(circle at 30% 25%,#fff,transparent 40%),linear-gradient(160deg,${a},${b})`},
};
let T=STYLE.anthro, W='anthro';
const P=i=>T.pal[((i%T.pal.length)+T.pal.length)%T.pal.length];
const st=(w)=>`stroke="${T.stroke}" stroke-width="${w??T.sw}" stroke-linejoin="round" stroke-linecap="round"`;
const fl=c=>`fill="${c}" fill-opacity="${T.fo}"`;
function eye(x,y,s=1,side='L'){
  const e=T.eye;
  switch(T.face){
    case 'anime': return `<ellipse cx="${x}" cy="${y}" rx="${4.8*s}" ry="${6*s}" fill="#fff" stroke="${e}" stroke-width="1.2"/><ellipse cx="${x}" cy="${y+.6*s}" rx="${4*s}" ry="${5.2*s}" fill="#6B3E8E"/><ellipse cx="${x}" cy="${y+2.4*s}" rx="${3.2*s}" ry="${2.6*s}" fill="#D58BE8"/><ellipse cx="${x}" cy="${y+.4*s}" rx="${1.8*s}" ry="${2.6*s}" fill="#2E1640"/><ellipse cx="${x-1.6*s}" cy="${y-2.2*s}" rx="${1.7*s}" ry="${2*s}" fill="#fff"/><circle cx="${x+1.8*s}" cy="${y+2.8*s}" r="${.8*s}" fill="#fff"/><path d="M${x-5.6*s} ${y-2.6*s} Q${x} ${y-8*s} ${x+5.6*s} ${y-3.4*s}" stroke="${e}" stroke-width="${1.8*s}" fill="none" stroke-linecap="round"/>`;
    case 'kawaii': return `<ellipse cx="${x}" cy="${y}" rx="${3.4*s}" ry="${4.4*s}" fill="${e}"/><circle cx="${x-1.2*s}" cy="${y-1.8*s}" r="${1.4*s}" fill="#fff"/>`;
    case 'kitsch': {const dx=side==='L'?-2.2*s:2.4*s;return `<circle cx="${x}" cy="${y}" r="${8*s}" fill="#fff" stroke="#111" stroke-width="2.5"/><circle cx="${x+dx}" cy="${y+2.4*s}" r="${3.8*s}" fill="#111"/>`}
    case 'graffiti': return side==='L'?`<path d="M${x-4*s} ${y-4*s} L${x+4*s} ${y+4*s} M${x+4*s} ${y-4*s} L${x-4*s} ${y+4*s}" stroke="${e}" stroke-width="3.2" stroke-linecap="round"/>`:`<circle cx="${x}" cy="${y}" r="${4.2*s}" fill="${e}"/><circle cx="${x-1.3*s}" cy="${y-1.4*s}" r="${1.3*s}" fill="#fff"/>`;
    case 'gothic': return `<circle cx="${x}" cy="${y}" r="${4.2*s}" fill="#0B0710" stroke="${T.stroke}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${1.9*s}" fill="${T.glow}"/>`;
    case 'doodle': return `<circle cx="${x}" cy="${y}" r="${2.6*s}" fill="${e}"/>`;
    case 'medieval': return `<path d="M${x-5*s} ${y} Q${x} ${y-4.5*s} ${x+5*s} ${y} Q${x} ${y+3*s} ${x-5*s} ${y}Z" fill="#FBF3DC" stroke="${e}" stroke-width="1.6"/><circle cx="${x+(side==='L'?1.2:-1.2)*s}" cy="${y}" r="${1.7*s}" fill="${e}"/><path d="M${x-5*s} ${y-5*s} Q${x} ${y-8.5*s} ${x+5*s} ${y-5*s}" stroke="${e}" stroke-width="1.6" fill="none"/>`;
    case 'pixel': return `<rect x="${x-3*s}" y="${y-4*s}" width="${6*s}" height="${8*s}" fill="${e}"/><rect x="${x-2*s}" y="${y-3*s}" width="${2*s}" height="${2*s}" fill="#fff"/>`;
    case 'y2k': return `<ellipse cx="${x}" cy="${y}" rx="${4.6*s}" ry="${6*s}" fill="${e}"/><path d="M${x-1.5*s} ${y-4*s} l${.8*s} ${1.6*s} ${1.6*s} ${.8*s} -${1.6*s} ${.8*s} -${.8*s} ${1.6*s} -${.8*s} -${1.6*s} -${1.6*s} -${.8*s} ${1.6*s} -${.8*s}Z" fill="#fff"/>`;
    default: return `<circle cx="${x}" cy="${y}" r="${7*s}" fill="#fff" stroke="${e}" stroke-width="2.5"/><circle cx="${x-1*s}" cy="${y}" r="${3.2*s}" fill="${e}"/>`;
  }
}
function mouth(x,y,s=1){
  const e=T.eye;
  switch(T.face){
    case 'anime': return `<path d="M${x-2*s} ${y} q${2*s} ${1.6*s} ${4*s} 0" stroke="${e}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    case 'kawaii': return `<path d="M${x-4*s} ${y} q${2*s} ${3*s} ${4*s} 0 q${2*s} ${3*s} ${4*s} 0" stroke="${e}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'kitsch': return `<ellipse cx="${x}" cy="${y+1*s}" rx="${6*s}" ry="${3.6*s}" fill="#E0115F" stroke="#111" stroke-width="2"/>`;
    case 'graffiti': return `<path d="M${x-7*s} ${y-1*s} Q${x} ${y+9*s} ${x+7*s} ${y-1*s} Z" fill="#fff" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>`;
    case 'gothic': return `<path d="M${x-5*s} ${y} H${x+5*s} M${x-3*s} ${y-2*s} v${4*s} M${x} ${y-2*s} v${4*s} M${x+3*s} ${y-2*s} v${4*s}" stroke="${T.stroke}" stroke-width="1.2"/>`;
    case 'doodle': return `<path d="M${x-5*s} ${y} q${2*s} ${3.5*s} ${4*s} 0 t${4*s} 0" stroke="${e}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'medieval': return `<path d="M${x-4*s} ${y+1*s} Q${x} ${y-.5*s} ${x+4*s} ${y+1*s}" stroke="#8A2A22" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    case 'pixel': return `<path d="M${x-6*s} ${y} h${3*s} v${3*s} h${6*s} v-${3*s} h${3*s}" stroke="${e}" stroke-width="2.5" fill="none"/>`;
    case 'y2k': return `<path d="M${x-4*s} ${y} q${4*s} ${5*s} ${8*s} 0" stroke="${e}" stroke-width="2.5" fill="#FF8AD8" stroke-linecap="round"/>`;
    default: return `<path d="M${x-6*s} ${y} q${6*s} ${6*s} ${12*s} 0" stroke="${e}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
}
function blush(x,y,s=1){
  if(T.face==='anime') return `<ellipse cx="${x}" cy="${y}" rx="${4.5*s}" ry="${2.4*s}" fill="#FF9ACD" opacity=".6"/><path d="M${x-3*s} ${y+1*s} l${1.4*s} -${2*s} M${x} ${y+1*s} l${1.4*s} -${2*s} M${x+3*s} ${y+1*s} l${1.4*s} -${2*s}" stroke="#E0559A" stroke-width="1"/>`;
  if(T.face==='kawaii') return `<ellipse cx="${x}" cy="${y}" rx="${4.5*s}" ry="${2.6*s}" fill="#FF8FB8" opacity=".75"/>`;
  if(T.face==='cartoon'||T.face==='y2k') return `<ellipse cx="${x}" cy="${y}" rx="${4*s}" ry="${2.4*s}" fill="#FF7AA8" opacity=".45"/>`;
  if(T.face==='pixel') return `<rect x="${x-3*s}" y="${y-1.5*s}" width="${6*s}" height="${3*s}" fill="#FF4F79" opacity=".6"/>`;
  return '';
}
const face=(x1,x2,y,mx,my,s=1)=>eye(x1,y,s,'L')+eye(x2,y,s,'R')+mouth(mx,my,s)+blush(x1-8*s,my,s)+blush(x2+8*s,my,s);
const gloss=(x,y,rx,ry)=>T.gloss?`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".6"/>`:'';
function extras(w){
  if(W==='kitsch') return `<path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6Z" fill="#fff" stroke="#111" stroke-width="1.5" transform="translate(${w-20},2)"/>`;
  if(W==='kawaii') return `<path d="M0 3 C0 -1 5 -1 6 2 C7 -1 12 -1 12 3 C12 7 6 10 6 11 C6 10 0 7 0 3Z" fill="#FF7AB8" stroke="${T.stroke}" stroke-width="1.5" transform="translate(${w-18},4)"/>`;
  if(W==='y2k') return `<path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5Z" fill="#fff" transform="translate(${w-22},2)"/>`;
  return '';
}
function wrap(vb,inner){const w=+vb.split(' ')[2];const f=T.filter?` filter="url(#${T.filter})"`:'';return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><g${f}>${inner}${extras(w)}</g></svg>`}
const ART={
  crab:(c=P(1),hat=P(0))=>wrap('0 -16 120 110',`
    <path d="M20 40 Q6 30 12 14 Q24 22 22 34 M100 40 Q114 30 108 14 Q96 22 98 34" ${fl(c)} ${st()}/>
    <path d="M34 70 L20 84 M44 74 L36 88 M86 70 L100 84 M76 74 L84 88" ${st()}/>
    <ellipse cx="60" cy="56" rx="38" ry="24" ${fl(c)} ${st()}/>${gloss(46,44,12,6)}
    <path d="M48 32 V24 M72 32 V24" ${st(4)}/>
    ${eye(48,18,.9,'L')}${eye(72,18,.9,'R')}${mouth(60,58)}${blush(42,60)}${blush(78,60)}
    <path d="M36 10 Q60 -18 84 10 Z" ${fl(hat)} ${st(4)}/><rect x="30" y="8" width="60" height="7" rx="3" ${fl(hat)} ${st(3)}/>`),
  octo:(c=P(4))=>wrap('0 0 120 120',`
    <path d="M22 58 q-8 24 6 36 q8 6 4 14 M40 62 q-4 26 6 40 M60 62 q4 26 -4 40 M80 60 q6 24 -2 36 M96 56 q10 22 -2 34" stroke="${T.stroke}" stroke-width="${T.sw+6}" fill="none" stroke-linecap="round"/>
    <path d="M22 58 q-8 24 6 36 q8 6 4 14 M40 62 q-4 26 6 40 M60 62 q4 26 -4 40 M80 60 q6 24 -2 36 M96 56 q10 22 -2 34" stroke="${c}" stroke-opacity="${T.fo}" stroke-width="${Math.max(2.5,T.sw)}" fill="none" stroke-linecap="round"/>
    <path d="M20 60 Q16 10 58 8 Q100 10 96 60 Z" ${fl(c)} ${st()}/>${gloss(40,26,14,8)}
    ${face(44,72,36,58,50)}
    <rect x="66" y="64" width="44" height="30" rx="4" ${fl(W==='gothic'?'#2B1F3F':'#DDE7F2')} ${st(3.5)}/><rect x="60" y="92" width="56" height="6" rx="3" ${fl(W==='gothic'?'#1F1628':'#B7C4D6')} ${st(3)}/>
    <path d="M76 74 l-5 5 5 5 M100 74 l5 5 -5 5 M91 72 l-6 14" stroke="${P(5)}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`),
  fish:(c=P(2),f=P(1))=>wrap('0 0 130 92',`
    <path d="M12 44 Q50 4 90 44 Q50 84 12 44Z" ${fl(c)} ${st()}/>${gloss(46,28,14,6)}
    <path d="M88 44 L118 22 L114 44 L118 66Z" ${fl(f)} ${st()}/>
    <path d="M48 26 Q58 16 70 22" ${fl(f)} ${st(4)}/>
    ${eye(32,40,1,'R')}<circle cx="32" cy="40" r="11" fill="none" ${st(3)}/><path d="M21 38 L12 34" ${st(3)}/>
    ${mouth(22,54,.6)}${blush(40,52,.8)}
    <circle cx="64" cy="68" r="14" ${fl(P(0))} ${st(4)}/><text x="64" y="72.5" text-anchor="middle" font-family="DM Mono,monospace" font-size="11" font-weight="700" fill="${T.stroke}">KSh</text>`),
  jelly:(c=P(1))=>wrap('0 0 112 124',`
    <path d="M28 60 q-8 20 2 40 q6 10 -2 18 M46 60 q6 22 -2 44 M64 60 q-6 22 2 44 M80 60 q8 20 -2 40" ${st(Math.max(2.5,T.sw*.8))} fill="none"/>
    <path d="M12 54 Q12 10 52 10 Q92 10 92 54 Q82 62 72 54 Q62 62 52 54 Q42 62 32 54 Q22 62 12 54Z" ${fl(c)} ${st()}/>
    <ellipse cx="32" cy="24" rx="8" ry="4" fill="#fff" opacity=".6"/>
    ${face(40,64,36,52,46,.85)}
    <path d="M90 32 L106 8" stroke="#B9790E" stroke-width="6" stroke-linecap="round"/><path d="M104 4 q8 -2 4 10 q-6 2 -6 -6Z" ${fl(P(0))} ${st(3)}/>`),
  star:(c=P(0))=>wrap('-6 -10 128 114',`
    <path d="M50 6 L62 36 L94 38 L69 58 L78 90 L50 72 L22 90 L31 58 L6 38 L38 36Z" ${fl(c)} ${st()}/>${gloss(44,26,7,4)}
    ${face(43,59,46,51,58,.75)}
    <circle cx="96" cy="70" r="14" fill="#BFF1FF" fill-opacity=".7" ${st()}/><path d="M86 80 L72 92" stroke="#B9790E" stroke-width="7" stroke-linecap="round"/>
    <path d="M34 4 L50 -7 L66 4" ${fl(P(5))} ${st(4)}/>`),
};

/* ================= COLLECTIBLES ================= */
const S0='#1B1640';
const GEMS={
  anthro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M4 26 Q4 8 20 6 Q36 8 36 26 Z" fill="#FF9ECF" stroke="${S0}" stroke-width="2.5"/><path d="M20 26 V8 M12 26 L10 12 M28 26 L30 12" stroke="${S0}" stroke-width="1.6"/><ellipse cx="20" cy="30" rx="16" ry="6" fill="#FF7AA8" stroke="${S0}" stroke-width="2.5"/><circle cx="20" cy="26" r="7" fill="#F8F4FF" stroke="${S0}" stroke-width="2"/><circle cx="17.5" cy="23.5" r="2" fill="#fff"/></svg>`,
  kawaii:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M4 28 Q4 10 20 10 Q36 10 36 28 Q36 34 20 34 Q4 34 4 28Z" fill="#fff" stroke="#5B4A7A" stroke-width="2.5"/><path d="M8 18 Q20 12 32 18" stroke="#FF9CCB" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="15" cy="24" r="1.8" fill="#3F2F5E"/><circle cx="25" cy="24" r="1.8" fill="#3F2F5E"/><ellipse cx="11" cy="28" rx="3" ry="1.6" fill="#FF8FB8"/><ellipse cx="29" cy="28" rx="3" ry="1.6" fill="#FF8FB8"/></svg>`,
  kitsch:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="#FFD23F" stroke="#111" stroke-width="3"/><circle cx="20" cy="20" r="11" fill="none" stroke="#B8860B" stroke-width="2"/><path d="M20 11 L22.6 17 L29 17.5 L24 21.6 L25.6 28 L20 24.6 L14.4 28 L16 21.6 L11 17.5 L17.4 17Z" fill="#FF3EA5" stroke="#111" stroke-width="1.5"/></svg>`,
  graffiti:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect x="12" y="12" width="16" height="25" rx="4" fill="#FF2E97" stroke="#0B0B0D" stroke-width="2.5"/><rect x="15" y="6" width="10" height="7" rx="2" fill="#EDEDED" stroke="#0B0B0D" stroke-width="2.5"/><rect x="18" y="2" width="4" height="5" fill="#0B0B0D"/><path d="M12 22 H28" stroke="#39FF14" stroke-width="4"/><circle cx="31" cy="6" r="1.5" fill="#39FF14"/><circle cx="34" cy="3" r="1.2" fill="#39FF14"/><circle cx="35" cy="8" r="1" fill="#39FF14"/></svg>`,
  gothic:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="12" cy="20" r="8" fill="none" stroke="#C9A24B" stroke-width="3.5"/><circle cx="12" cy="20" r="3" fill="#7A1F2B"/><path d="M20 20 H37 M31 20 v6 M35 20 v5" stroke="#C9A24B" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  doodle:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#FFD23F" stroke="#1E1E1E" stroke-width="2"/><path d="M20 8 L23.5 16 L32 16.5 L25.5 22 L27.6 30 L20 25.5 L12.4 30 L14.5 22 L8 16.5 L16.5 16Z" fill="#FFF36B" stroke="#1E1E1E" stroke-width="1.8"/></svg>`,
  medieval:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M34 4 C20 6 10 16 8 30 L12 30 C14 20 22 12 34 4Z" fill="#E8C766" stroke="#3A2418" stroke-width="2"/><path d="M34 4 C28 16 20 22 12 30" stroke="#8C6420" stroke-width="1.5" fill="none"/><path d="M8 30 L5 37 L11 32Z" fill="#3A2418"/></svg>`,
  pixel:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" shape-rendering="crispEdges"><path d="M14 4 H26 V8 H30 V12 H34 V28 H30 V32 H26 V36 H14 V32 H10 V28 H6 V12 H10 V8 H14Z" fill="#FFD23F" stroke="#10101F" stroke-width="2.5"/><rect x="18" y="12" width="4" height="16" fill="#B8860B"/><rect x="12" y="12" width="3" height="8" fill="#fff"/></svg>`,
  y2k:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect x="5" y="5" width="30" height="30" rx="3" fill="#B8A6FF" stroke="#2B3F87" stroke-width="2.5"/><rect x="11" y="5" width="18" height="11" fill="#E9F2FF" stroke="#2B3F87" stroke-width="2"/><rect x="23" y="7" width="4" height="7" fill="#2B3F87"/><rect x="10" y="21" width="20" height="14" rx="1.5" fill="#fff" stroke="#2B3F87" stroke-width="2"/><path d="M13 25 H27 M13 29 H24" stroke="#FF8AD8" stroke-width="2"/></svg>`,
};

/* ================= AVATARS (Karen in each world) ================= */
function avatar(w,golden){
  let S=w==='gothic'?'#1B1640':w==='doodle'?'#1E1E1E':w==='pixel'?'#10101F':'#1B1640';
  let sk='#8A5A3B', hr='#2A1A14';
  const crown=golden?`<g stroke="${S}" stroke-width="4" stroke-linejoin="round"><path d="M104 44 L116 8 L134 32 L150 0 L166 32 L184 8 L196 44Z" fill="#FFD23F"/><circle cx="150" cy="30" r="5" fill="#FF3EA5" stroke-width="2"/><circle cx="124" cy="36" r="4" fill="#6FD3F7" stroke-width="2"/><circle cx="176" cy="36" r="4" fill="#7BD389" stroke-width="2"/></g>`:'';
  if(w==='anthro'){
    const h=golden?['#FFFFFF','#F7D6FF','#8FD8F0']:['#FFE9A3','#F2B632','#B9790E'];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -20 300 282"><defs><radialGradient id="hb" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="${h[0]}"/><stop offset=".45" stop-color="${h[1]}"/><stop offset="1" stop-color="${h[2]}"/></radialGradient><radialGradient id="hg" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#E9FBFF"/><stop offset="1" stop-color="#9FE3F7"/></radialGradient><clipPath id="wn"><circle cx="150" cy="120" r="72"/></clipPath></defs><g filter="url(#f-clay)">
      <rect x="60" y="200" width="180" height="60" rx="28" fill="url(#hb)" stroke="${S}" stroke-width="6"/><circle cx="150" cy="120" r="108" fill="url(#hb)" stroke="${S}" stroke-width="6"/><circle cx="150" cy="120" r="80" fill="${h[2]}" stroke="${S}" stroke-width="6"/>
      <g fill="${h[0]}" stroke="${S}" stroke-width="3"><circle cx="150" cy="34" r="7"/><circle cx="150" cy="206" r="7"/><circle cx="64" cy="120" r="7"/><circle cx="236" cy="120" r="7"/><circle cx="90" cy="60" r="6"/><circle cx="210" cy="60" r="6"/><circle cx="90" cy="180" r="6"/><circle cx="210" cy="180" r="6"/></g>
      <circle cx="150" cy="120" r="72" fill="url(#hg)" stroke="${S}" stroke-width="6"/>
      <g clip-path="url(#wn)"><path d="M84 150 Q76 70 150 62 Q224 70 216 150 Q214 186 150 196 Q86 186 84 150Z" fill="${hr}"/><g fill="${hr}"><circle cx="96" cy="88" r="16"/><circle cx="118" cy="68" r="17"/><circle cx="148" cy="60" r="18"/><circle cx="180" cy="66" r="17"/><circle cx="204" cy="86" r="16"/><circle cx="92" cy="118" r="14"/><circle cx="208" cy="118" r="14"/></g><ellipse cx="150" cy="132" rx="46" ry="52" fill="${sk}"/><path d="M108 104 Q130 82 160 90 Q180 94 194 110 Q176 88 150 86 Q120 86 108 104Z" fill="${hr}"/><ellipse cx="132" cy="128" rx="7" ry="9" fill="${S}"/><ellipse cx="168" cy="128" rx="7" ry="9" fill="${S}"/><circle cx="134" cy="125" r="2.5" fill="#fff"/><circle cx="170" cy="125" r="2.5" fill="#fff"/><path d="M122 114 q10 -6 18 0 M160 114 q10 -6 18 0" stroke="${S}" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="118" cy="148" rx="9" ry="5" fill="#FF7AA8" opacity=".5"/><ellipse cx="182" cy="148" rx="9" ry="5" fill="#FF7AA8" opacity=".5"/><path d="M134 156 Q150 170 166 156" stroke="${S}" stroke-width="4" fill="#fff" stroke-linecap="round"/><circle cx="104" cy="148" r="5" fill="#FFE135" stroke="${S}" stroke-width="2"/><circle cx="196" cy="148" r="5" fill="#FFE135" stroke="${S}" stroke-width="2"/></g>
      <path d="M104 78 Q120 60 146 58" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".7"/>${golden?seahorse(S):''}</g></svg>`;
  }
  const pal=STYLE[w].pal;
  S='#1B1640'; let sw=4, O='#FF9CCB', fo=1, noEar=false;
  let defs='', extra='', behind='', hairX='', eyes='', mouthA='', bl='', over='', outfit='';
  const star4=(x,y,r,f,st2)=>`<path d="M${x} ${y-r} L${x+r*.2} ${y-r*.2} L${x+r} ${y} L${x+r*.2} ${y+r*.2} L${x} ${y+r} L${x-r*.2} ${y+r*.2} L${x-r} ${y} L${x-r*.2} ${y-r*.2}Z" fill="${f}" ${st2||''}/>`;
  const stdEyes=`<ellipse cx="132" cy="146" rx="7" ry="9" fill="${S}"/><ellipse cx="168" cy="146" rx="7" ry="9" fill="${S}"/><circle cx="134" cy="143" r="2.5" fill="#fff"/><circle cx="170" cy="143" r="2.5" fill="#fff"/>`;
  switch(w){
    case 'kawaii': { /* shoujo anime */
      S='#5B3F6E'; sw=3; hr='#3B2230'; O='#F6D6F0';
      const bloss=(x,y,r)=>`<g transform="translate(${x} ${y})">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="${-r*.6}" rx="${r*.42}" ry="${r*.62}" fill="#FFC6DE" stroke="#E0559A" stroke-width="1.2" transform="rotate(${a})"/>`).join('')}<circle r="${r*.22}" fill="#FFE58F"/></g>`;
      extra=bloss(40,64,14)+bloss(262,124,12)+bloss(50,232,10)+bloss(270,236,8)+star4(248,40,10,'#FFE58F')+star4(26,150,8,'#fff','stroke="#C9A8FF" stroke-width="1.5"')+star4(284,70,6,'#C9A8FF');
      hairX=`<path d="M100 118 Q78 190 94 256 Q108 206 116 150Z M200 118 Q222 190 206 256 Q192 206 184 150Z" fill="${hr}" stroke="${S}" stroke-width="${sw}"/>
        <g stroke="#C9A8FF" stroke-width="4" fill="none" opacity=".85" stroke-linecap="round"><path d="M120 60 q-12 20 -8 40"/><path d="M150 48 q-4 22 2 40"/><path d="M182 60 q10 18 6 38"/><path d="M98 100 q-10 16 -6 34"/><path d="M96 170 q-6 30 2 60"/><path d="M204 170 q6 30 -2 60"/></g>
        <g stroke="${S}" stroke-width="2.5"><path d="M190 70 L172 58 L174 84Z M190 70 L208 58 L206 84Z" fill="#FF9CCB"/><circle cx="190" cy="70" r="6" fill="#FFC6DE"/></g>${star4(110,80,11,'#FFE58F',`stroke="${S}" stroke-width="2"`)}`;
      outfit=`<g fill="#fff" stroke="${S}" stroke-width="2">${[108,122,136,150,164,178,192].map(x=>`<circle cx="${x}" cy="${x===150?222:218}" r="10"/>`).join('')}</g><g stroke="${S}" stroke-width="2.5"><path d="M150 228 L130 218 L132 240Z M150 228 L170 218 L168 240Z" fill="#FF9CCB"/><circle cx="150" cy="228" r="6" fill="#FFC6DE"/></g>`;
      const ae=x=>`<ellipse cx="${x}" cy="150" rx="13" ry="16" fill="#fff" stroke="${S}" stroke-width="2"/><ellipse cx="${x}" cy="152" rx="11" ry="14" fill="#6B3E8E"/><ellipse cx="${x}" cy="158" rx="9" ry="7.5" fill="#D58BE8" opacity=".85"/><ellipse cx="${x}" cy="151" rx="5" ry="7" fill="#2E1640"/><ellipse cx="${x-4}" cy="144" rx="4.5" ry="5.5" fill="#fff"/><circle cx="${x+5}" cy="159" r="2.2" fill="#fff"/>${star4(x+5,144,3.4,'#fff')}<path d="M${x-15} 142 Q${x} 126 ${x+15} 139" stroke="${S}" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M${x+13} 139 l5 -4" stroke="${S}" stroke-width="2.5" stroke-linecap="round"/>`;
      eyes=ae(128)+ae(172)+`<path d="M116 126 q12 -6 22 -2 M162 124 q10 -4 22 2" stroke="${S}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
      mouthA=`<path d="M145 178 q5 4 10 0" stroke="${S}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
      bl=`<ellipse cx="114" cy="170" rx="11" ry="6" fill="#FF9ACD" opacity=".6"/><ellipse cx="186" cy="170" rx="11" ry="6" fill="#FF9ACD" opacity=".6"/><g stroke="#E0559A" stroke-width="1.6" stroke-linecap="round"><path d="M107 172 l4 -6 M113 172 l4 -6 M119 172 l4 -6 M179 172 l4 -6 M185 172 l4 -6 M191 172 l4 -6"/></g>`;
      break; }
    case 'y2k': { /* cyber-glam */
      S='#3E3A6E'; sw=3; hr='#24162A'; noEar=true;
      defs=`<linearGradient id="met" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6F7FC"/><stop offset=".4" stop-color="#AEB3C6"/><stop offset=".55" stop-color="#F0F1F8"/><stop offset="1" stop-color="#7F859C"/></linearGradient>`;
      extra=star4(42,72,36,'#E6E8F0','stroke="#9FA6BF" stroke-width="2"')+star4(262,196,30,'#D8C8FF','stroke="#9FA6BF" stroke-width="2"')+star4(252,40,16,'#fff')+`<g stroke="#B98CFF" stroke-width="1" opacity=".5">${[0,1,2,3].map(i=>`<path d="M${20+i*14} 250 H${80+i*14} M${220+i*10} 20 V${60+i*8}"/>`).join('')}</g>`;
      hairX=`<g stroke="${S}" stroke-width="${sw}"><path d="M92 40 l-10 -22 18 12 M108 26 l0 -24 12 20 M192 26 l0 -24 -12 20 M208 40 l10 -22 -18 12" fill="${hr}"/><circle cx="110" cy="54" r="30" fill="${hr}"/><circle cx="190" cy="54" r="30" fill="${hr}"/></g><g fill="#C9CCD8" stroke="${S}" stroke-width="2"><rect x="96" y="78" width="30" height="8" rx="4" transform="rotate(-20 111 82)"/><rect x="174" y="78" width="30" height="8" rx="4" transform="rotate(20 189 82)"/></g><path d="M100 40 q10 -8 20 -2 M180 38 q10 -6 20 2" stroke="#B98CFF" stroke-width="3" fill="none"/>`;
      outfit=`<path d="M52 292 Q56 214 150 208 Q244 214 248 292Z" fill="url(#met)" stroke="${S}" stroke-width="${sw}"/><path d="M110 212 L128 252 L150 222 L172 252 L190 212" fill="url(#met)" stroke="${S}" stroke-width="${sw}"/><path d="M150 226 V292" stroke="${S}" stroke-width="2" stroke-dasharray="3 3"/><path d="M70 250 q20 -8 30 10 M230 250 q-20 -8 -30 10" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/><path d="M128 204 Q150 214 172 204" stroke="#B98CFF" stroke-width="7" fill="none"/>`;
      const ye=(x,d)=>`<ellipse cx="${x}" cy="140" rx="17" ry="9" fill="#B98CFF" opacity=".75"/><path d="M${x-13} 150 Q${x} 138 ${x+13} 150 Q${x} 158 ${x-13} 150Z" fill="#fff" stroke="${S}" stroke-width="2"/><circle cx="${x}" cy="150" r="6.5" fill="#4A2A6E"/><circle cx="${x-2}" cy="147" r="2.2" fill="#fff"/><path d="M${x-14*d} 150 Q${x} 136 ${x+14*d} 149 L${x+21*d} 141" stroke="${S}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      eyes=ye(130,-1)+ye(170,1)+`<path d="M116 128 q12 -8 24 -2 M160 126 q12 -6 24 2" stroke="${S}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      mouthA=`<path d="M134 172 Q142 164 150 169 Q158 164 166 172 Q150 190 134 172Z" fill="#C24FA8" stroke="${S}" stroke-width="2"/><path d="M140 176 q6 4 12 1" stroke="#fff" stroke-width="3" opacity=".85" fill="none" stroke-linecap="round"/>`;
      bl=`<ellipse cx="114" cy="166" rx="10" ry="5" fill="#FF7BD5" opacity=".4"/><ellipse cx="186" cy="166" rx="10" ry="5" fill="#FF7BD5" opacity=".4"/>`;
      over=`<g fill="none" stroke="#C9CCD8" stroke-width="5"><circle cx="98" cy="182" r="15"/><circle cx="202" cy="182" r="15"/></g><g fill="none" stroke="#fff" stroke-width="2" opacity=".8"><path d="M88 176 a14 14 0 0 1 8 -8"/><path d="M192 176 a14 14 0 0 1 8 -8"/></g>`;
      break; }
    case 'pixel': {
      S='#10101F'; O='#3EE06D';
      behind=`<path d="M62 228 L30 292 H270 L238 228Z" fill="#E0433B" stroke="${S}" stroke-width="4"/>`;
      eyes=`<rect x="126" y="140" width="12" height="14" fill="${S}"/><rect x="162" y="140" width="12" height="14" fill="${S}"/><rect x="128" y="142" width="4" height="4" fill="#fff"/><rect x="164" y="142" width="4" height="4" fill="#fff"/>`;
      mouthA=`<path d="M136 170 h6 v6 h16 v-6 h6" stroke="${S}" stroke-width="4" fill="none"/>`; bl=`<rect x="108" y="160" width="14" height="6" fill="#FF4F79"/><rect x="178" y="160" width="14" height="6" fill="#FF4F79"/>`;
      over=`<rect x="98" y="104" width="104" height="14" fill="#FF4F79" stroke="${S}" stroke-width="4"/><path d="M202 108 l22 -8 v10 l-22 8Z M202 114 l20 10 -4 8 -16 -8Z" fill="#FF4F79" stroke="${S}" stroke-width="3"/>
        <g stroke="${S}" stroke-width="4"><rect x="60" y="224" width="46" height="24" fill="#B8BCCB"/><rect x="194" y="224" width="46" height="24" fill="#B8BCCB"/></g><rect x="66" y="228" width="12" height="6" fill="#fff"/><rect x="200" y="228" width="12" height="6" fill="#fff"/><rect x="120" y="270" width="60" height="12" fill="#8B5A2B" stroke="${S}" stroke-width="3"/><rect x="142" y="268" width="16" height="16" fill="#FFD23F" stroke="${S}" stroke-width="3"/>`;
      extra=`<rect x="40" y="60" width="8" height="8" fill="#FFD23F"/><rect x="256" y="140" width="8" height="8" fill="#FFD23F"/><rect x="52" y="160" width="6" height="6" fill="#3EE06D"/>`;
      break; }
    case 'doodle': { /* black and white ink */
      S='#1E1E1E'; sw=3.5; sk='#E6E6E6'; hr='#1E1E1E'; O='#FFFFFF';
      hairX=`<path d="M118 66 q6 -6 12 0 t12 0 M160 58 q6 -6 12 0 M96 112 q6 -6 12 0 M190 104 q6 -6 12 0" stroke="#fff" stroke-width="2.5" fill="none"/>`;
      eyes=`<ellipse cx="132" cy="146" rx="8" ry="10.5" fill="#fff" stroke="${S}" stroke-width="2.5"/><ellipse cx="168" cy="146" rx="8" ry="10.5" fill="#fff" stroke="${S}" stroke-width="2.5"/><circle cx="134" cy="149" r="4.5" fill="${S}"/><circle cx="170" cy="149" r="4.5" fill="${S}"/><path d="M120 130 q10 -8 20 -2 M160 128 q10 -6 20 2" stroke="${S}" stroke-width="3" fill="none"/>`;
      mouthA=`<path d="M132 168 Q150 188 170 166 Q150 172 132 168Z" fill="#fff" stroke="${S}" stroke-width="3"/><path d="M146 176 q4 10 10 2" fill="#fff" stroke="${S}" stroke-width="2"/>`;
      over=`<g transform="rotate(-35 212 110)"><rect x="204" y="64" width="12" height="72" fill="#fff" stroke="${S}" stroke-width="3"/><path d="M204 136 L210 150 L216 136Z" fill="#fff" stroke="${S}" stroke-width="3"/></g><path d="M112 216 L150 244 L188 216" fill="none" stroke="${S}" stroke-width="3"/><g stroke="${S}" stroke-width="1.5">${[0,1,2,3,4,5,6].map(i=>`<path d="M${196+i*7} 292 l16 -30"/>`).join('')}</g>`;
      extra=`<g stroke="${S}" stroke-width="3" fill="#fff" stroke-linejoin="round"><path d="M236 176 H270 L264 236 H242Z"/><rect x="232" y="168" width="42" height="10" rx="3"/><path d="M270 190 q16 4 10 22 q-4 8 -12 4" fill="none"/></g><g stroke="${S}" stroke-width="1.5">${[0,1,2,3,4].map(i=>`<path d="M${240+i*5} 214 l8 -18"/>`).join('')}</g><path d="M244 160 q-6 -10 2 -18 t0 -18 M258 160 q-6 -10 2 -18 t0 -18" stroke="${S}" stroke-width="2.5" fill="none"/>
        <path d="M30 40 l20 20 M40 36 l20 20 M50 32 l20 20 M34 250 q10 -10 20 0 t20 0" stroke="${S}" stroke-width="2.5" fill="none"/>`;
      break; }
    case 'gothic': { /* luxurious vampiric */
      S='#140E18'; sw=3; hr='#1A0F14'; O='#5A1426';
      behind=`<g stroke="#C9A24B" stroke-width="3" stroke-linejoin="round"><path d="M70 264 L28 98 Q74 132 104 144 L112 214Z" fill="#3A0C1C"/><path d="M230 264 L272 98 Q226 132 196 144 L188 214Z" fill="#3A0C1C"/></g><g fill="#7A1F2B"><path d="M78 246 L44 118 Q76 142 98 150 L106 212Z"/><path d="M222 246 L256 118 Q224 142 202 150 L194 212Z"/></g>`;
      outfit=`<g stroke="#C9A24B" stroke-width="3"><path d="M112 212 L142 292 H96 L74 236Z" fill="#6E1A34"/><path d="M188 212 L158 292 H204 L226 236Z" fill="#6E1A34"/></g><g fill="none" stroke="#C9A24B" stroke-width="2"><path d="M100 248 q10 -8 16 4 q-10 6 -6 16 M88 262 q8 -6 12 4"/><path d="M200 248 q-10 -8 -16 4 q10 6 6 16 M212 262 q-8 -6 -12 4"/></g>
        <g fill="#F2ECE0" stroke="${S}" stroke-width="1.5">${[[150,214,26],[138,230,16],[162,230,16],[150,244,18],[142,258,12],[158,258,12]].map(([x,y,r])=>`<path d="M${x-r} ${y} q${r/4} ${r/2} ${r/2} 0 q${r/4} ${r/2} ${r/2} 0 q${r/4} ${r/2} ${r/2} 0 q${r/4} ${r/2} ${r/2} 0 L${x} ${y-8}Z"/>`).join('')}</g><circle cx="150" cy="216" r="8" fill="#A8303F" stroke="#C9A24B" stroke-width="3"/><circle cx="147" cy="213" r="2" fill="#fff"/>`;
      const ge=(x,d)=>`<path d="M${x-12} 148 Q${x} 138 ${x+12} 146 Q${x} 154 ${x-12} 148Z" fill="#fff" stroke="${S}" stroke-width="2"/><circle cx="${x}" cy="147" r="5" fill="#5A2A6E"/><circle cx="${x-1.5}" cy="145" r="1.6" fill="#fff"/><path d="M${x-13*d} 148 L${x+16*d} 142 L${x+21*d} 136" stroke="${S}" stroke-width="3" fill="none"/>`;
      eyes=ge(132,-1)+ge(168,1)+`<path d="M116 134 L130 124 L142 130 M158 130 L170 124 L184 134" stroke="${S}" stroke-width="3" fill="none" stroke-linejoin="round"/><path d="M112 158 q6 10 16 12 M188 158 q-6 10 -16 12" stroke="#6A3A2A" stroke-width="2" fill="none" opacity=".6"/>`;
      mouthA=`<path d="M138 172 Q150 166 162 172 Q150 182 138 172Z" fill="#4A0E1E" stroke="${S}" stroke-width="2"/>`;
      extra=`${[[40,50,40],[250,70,30]].map(([x,y,s2])=>`<path transform="translate(${x} ${y}) scale(${s2/44})" d="M22 8 C18 2 10 0 0 6 C6 6 8 10 6 14 C10 10 14 12 16 16 C18 12 20 12 22 14 C24 12 26 12 28 16 C30 12 34 10 38 14 C36 10 38 6 44 6 C34 0 26 2 22 8Z" fill="#2B1F3F" stroke="#C9A24B" stroke-width="1"/>`).join('')}`;
      break; }
    case 'graffiti': {
      S='#0B0B0D'; sw=7; O='#FF2E97';
      behind=`<path d="M70 292 Q60 170 92 110 Q150 40 208 110 Q240 170 230 292Z" fill="${O}" stroke="${S}" stroke-width="${sw}"/>`;
      eyes=`<path d="M122 150 q10 -10 20 0" stroke="${S}" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="168" cy="146" rx="9" ry="11" fill="#fff" stroke="${S}" stroke-width="3"/><circle cx="170" cy="148" r="5" fill="${S}"/><circle cx="168" cy="145" r="1.8" fill="#fff"/><path d="M116 130 L142 124 M156 118 L184 126" stroke="${S}" stroke-width="6" stroke-linecap="round"/>`;
      mouthA=`<path d="M122 164 Q150 200 180 162 Q150 172 122 164Z" fill="#fff" stroke="${S}" stroke-width="4" stroke-linejoin="round"/><path d="M132 168 v8 M141 171 v12 M150 172 v13 M159 171 v12 M168 168 v9" stroke="${S}" stroke-width="2"/>`;
      over=`<path d="M100 108 Q106 58 150 56 Q194 58 200 108Z" fill="#39FF14" stroke="${S}" stroke-width="${sw}"/><path d="M110 104 Q76 102 70 118 Q94 122 112 114Z" fill="#39FF14" stroke="${S}" stroke-width="5"/><text x="140" y="94" font-family="Sedgwick Ave Display,cursive" font-size="26" fill="#FF2E97">K</text>
        <path d="M128 226 v24 M172 226 v24" stroke="#fff" stroke-width="4"/><path d="M186 58 v12 a4 4 0 0 0 8 0 v-10 M120 60 v8 a4 4 0 0 0 8 0 v-6" stroke="#39FF14" stroke-width="8" fill="none" stroke-linecap="round"/>
        <g transform="rotate(18 244 190)"><rect x="230" y="176" width="28" height="56" rx="6" fill="#00E5FF" stroke="${S}" stroke-width="5"/><rect x="236" y="164" width="16" height="14" rx="3" fill="#EDEDED" stroke="${S}" stroke-width="4"/><path d="M230 204 H258" stroke="#FFE600" stroke-width="6"/></g>`;
      extra=`<g fill="#39FF14">${[[258,140,5],[270,128,3.5],[276,146,4],[284,132,2.5],[266,116,2]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g><g fill="#FFE600">${[[30,80,6],[44,64,3],[22,110,4],[50,250,5]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g><text x="30" y="46" font-family="Sedgwick Ave Display,cursive" font-size="34" fill="#FFE600" stroke="#0B0B0D" stroke-width="1.5" transform="rotate(-12 30 46)">K!</text>`;
      break; }
    case 'medieval': {
      S='#3A2418'; sw=3; O='#2F4F9E';
      defs=`<clipPath id="shl"><path d="M52 292 Q60 216 150 210 Q240 216 248 292Z"/></clipPath><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6E3AE"/><stop offset=".5" stop-color="#C9A24B"/><stop offset="1" stop-color="#8C6420"/></linearGradient>`;
      eyes=`<path d="M122 146 Q132 138 142 146 Q132 151 122 146Z M158 146 Q168 138 178 146 Q168 151 158 146Z" fill="#FBF3DC" stroke="${S}" stroke-width="2.5"/><circle cx="134" cy="146" r="4" fill="${S}"/><circle cx="166" cy="146" r="4" fill="${S}"/><path d="M120 134 Q132 126 144 132 M156 132 Q168 126 180 134" stroke="${S}" stroke-width="3" fill="none"/>`;
      mouthA=`<path d="M140 174 Q150 170 160 174" stroke="#8A2A22" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
      over=`<g clip-path="url(#shl)" stroke="#C9A24B" stroke-width="1.6" opacity=".9">${Array.from({length:14},(_,i)=>`<path d="M${20+i*22} 300 L${100+i*22} 200 M${20+i*22} 200 L${100+i*22} 300"/>`).join('')}</g><g clip-path="url(#shl)" fill="#C8412F">${Array.from({length:8},(_,i)=>`<circle cx="${64+i*22}" cy="${i%2?262:284}" r="3"/>`).join('')}</g>
        <path d="M100 104 Q150 86 200 104" stroke="url(#gl)" stroke-width="7" fill="none"/><circle cx="150" cy="92" r="7" fill="#C8412F" stroke="#3A2418" stroke-width="2"/>
        <path d="M104 222 Q150 250 196 222" stroke="url(#gl)" stroke-width="7" fill="none"/>
        <g transform="rotate(-20 236 230)"><path d="M236 170 C250 190 252 220 238 262 C232 230 226 200 236 170Z" fill="#FBF3DC" stroke="${S}" stroke-width="2.5"/><path d="M236 176 C240 206 240 232 238 262" stroke="${S}" stroke-width="1.5" fill="none"/></g>`;
      extra=`<g fill="#C8412F" stroke="#3A2418" stroke-width="2"><path d="M34 60 q8 -14 16 0 q-8 10 -16 0Z"/><path d="M258 170 q8 -14 16 0 q-8 10 -16 0Z"/></g><g fill="#C9A24B"><circle cx="42" cy="84" r="4"/><circle cx="266" cy="194" r="4"/></g>`;
      break; }
    case 'kitsch': { /* retro pop-art */
      S='#111'; sw=4; O='#1FD6C4'; noEar=true;
      extra=`<path d="${Array.from({length:32},(_,i)=>{const a=i*Math.PI/16,r=i%2?104:146;return (i?'L':'M')+(150+Math.cos(a)*r).toFixed(1)+' '+(140+Math.sin(a)*r).toFixed(1)}).join(' ')}Z" fill="#FFEA00" stroke="#111" stroke-width="3"/>`+star4(34,52,14,'#fff','stroke="#111" stroke-width="2"')+star4(268,110,12,'#fff','stroke="#111" stroke-width="2"');
      outfit=`<path d="M126 212 L150 256 L174 212Z" fill="#FFEA00" stroke="${S}" stroke-width="3"/><g stroke="${S}" stroke-width="3.5" stroke-linejoin="round"><path d="M150 212 L106 210 L64 270 L130 238Z" fill="#FF2FA0"/><path d="M150 212 L194 210 L236 270 L170 238Z" fill="#FF2FA0"/></g><circle cx="150" cy="262" r="9" fill="#FFD23F" stroke="${S}" stroke-width="3"/>`;
      eyes=`<circle cx="130" cy="146" r="12" fill="#fff" stroke="${S}" stroke-width="3"/><circle cx="170" cy="146" r="12" fill="#fff" stroke="${S}" stroke-width="3"/><circle cx="132" cy="148" r="5.5" fill="${S}"/><circle cx="172" cy="148" r="5.5" fill="${S}"/><circle cx="130" cy="145" r="2" fill="#fff"/><circle cx="170" cy="145" r="2" fill="#fff"/><path d="M114 124 Q130 112 144 122 M156 122 Q170 112 186 124" stroke="${S}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      mouthA=`<path d="M118 164 Q150 204 184 162 Q150 172 118 164Z" fill="#fff" stroke="${S}" stroke-width="3.5" stroke-linejoin="round"/><path d="M118 164 Q150 174 184 162" stroke="${S}" stroke-width="2" fill="none"/><path d="M130 168 v10 M140 170 v14 M150 171 v15 M160 170 v14 M170 168 v11" stroke="${S}" stroke-width="2"/>`;
      bl=`<ellipse cx="110" cy="168" rx="9" ry="5" fill="#FF2FA0" opacity=".5"/><ellipse cx="190" cy="168" rx="9" ry="5" fill="#FF2FA0" opacity=".5"/>`;
      over=`<g stroke="#111" stroke-width="3.5" stroke-linejoin="round" transform="translate(0 -52) scale(1)"><path d="M110 138 C110 124 128 122 132 134 C136 122 154 124 154 138 C154 150 132 158 132 160 C132 158 110 150 110 138Z" fill="#FF2FA0"/><path d="M146 138 C146 124 164 122 168 134 C172 122 190 124 190 138 C190 150 168 158 168 160 C168 158 146 150 146 138Z" fill="#FF2FA0"/></g><path d="M118 80 q6 -4 10 0 M154 80 q6 -4 10 0" stroke="#fff" stroke-width="3" fill="none"/>
        <g fill="none" stroke="#FFD23F" stroke-width="5"><circle cx="98" cy="180" r="13"/><circle cx="202" cy="180" r="13"/></g>
        <g><rect x="222" y="206" width="16" height="50" rx="6" fill="#333" stroke="#111" stroke-width="3"/><circle cx="230" cy="200" r="14" fill="#C9C9D6" stroke="#111" stroke-width="3"/></g>`;
      break; }
  }
  const f=STYLE[w].filter?` filter="url(#${STYLE[w].filter})"`:'';
  const hair=[[150,84,48],[108,98,36],[192,98,36],[94,138,30],[206,138,30],[120,70,32],[180,70,32]];
  const shoulders=`<path d="M52 292 Q60 216 150 210 Q240 216 248 292Z" fill="${O}" fill-opacity="${fo}" stroke="${S}" stroke-width="${sw}"/>`;
  const ears=noEar?'':`<circle cx="100" cy="166" r="6" fill="${pal[0]}" stroke="${S}" stroke-width="2"/><circle cx="200" cy="166" r="6" fill="${pal[0]}" stroke="${S}" stroke-width="2"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -12 300 304"><defs>${defs}</defs><g${f}>
    ${extra}${golden?prizeBehind(w,S):''}${behind}
    <g stroke="${S}" stroke-width="${sw*2}">${hair.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${hr}"/>`).join('')}</g>
    <g>${hair.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${hr}"/>`).join('')}</g>
    ${hairX}
    ${w==='y2k'?'':shoulders}
    <rect x="134" y="186" width="32" height="30" fill="${sk}" stroke="${S}" stroke-width="${sw}"/>
    ${outfit}
    <ellipse cx="150" cy="144" rx="50" ry="56" fill="${sk}" stroke="${S}" stroke-width="${sw}"/>
    <path d="M102 128 Q116 92 150 96 Q186 92 198 128 Q182 108 150 108 Q118 108 102 128Z" fill="${hr}"/>
    ${ears}${eyes}${bl}${mouthA}${over}${golden?prizeOver(w,S):''}
  </g></svg>`;
}


/* ================= SCENERY (hero backdrop per world) ================= */
function rnd(a,b){return a+Math.random()*(b-a)}
function scenery(w){
  switch(w){
    case 'anthro': return `<div class="sun"></div><div class="cloud" style="top:36px;width:84px;animation-duration:46s;animation-delay:-12s"></div><div class="cloud" style="top:64px;width:62px;animation-duration:60s;animation-delay:-35s"></div>
      <svg class="waves" viewBox="0 0 1200 60" preserveAspectRatio="none"><path fill="#3CC4E6" d="M0 30 Q 75 0 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30 V60 H0Z"/></svg>
      <svg class="waves b" viewBox="0 0 1200 60" preserveAspectRatio="none"><path fill="#F6FDFF" d="M0 30 Q 75 10 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30 V36 Q 1050 20 900 36 T 600 36 T 300 36 T 0 36Z"/></svg><div class="rays"></div>`;
    case 'kawaii': {
      const sp=Array.from({length:22},()=>`<i class="sprinkle" style="left:${rnd(2,98)}%;top:${rnd(18,95)}%;background:${['#FF9CCB','#9EDCFF','#FFE58F','#B8F2C9','#CDB8FF'][Math.floor(rnd(0,5))]};transform:rotate(${rnd(0,180)}deg)"></i>`).join('');
      const hearts=[[8,30,34],[88,40,26],[70,82,30],[4,76,22],[46,14,20],[94,70,18]].map(([x,y,sz],i)=>`<svg class="floaty" style="left:${x}%;top:${y}%;width:${sz}px;animation-delay:${-i*1.4}s" viewBox="-12 -12 24 24">${[0,72,144,216,288].map(r=>`<ellipse cx="0" cy="-6" rx="4.2" ry="6.4" fill="#FFC6DE" stroke="#E0559A" stroke-width=".8" transform="rotate(${r})"/>`).join('')}<circle r="2.4" fill="#FFE58F"/></svg>`).join('')+`<svg style="position:absolute;right:0;top:60px;width:260px" viewBox="0 0 260 160"><path d="M260 20 C200 30 150 60 90 70 M180 44 C170 70 150 90 130 100 M120 66 C100 80 80 110 60 120" stroke="#6B4A3A" stroke-width="5" fill="none" stroke-linecap="round"/>${[[90,70],[130,100],[60,120],[170,50],[210,34],[150,62]].map(([x,y])=>`<g transform="translate(${x} ${y})">${[0,72,144,216,288].map(r=>`<ellipse cx="0" cy="-6" rx="4.5" ry="6.5" fill="#FFC6DE" stroke="#E0559A" stroke-width=".8" transform="rotate(${r})"/>`).join('')}<circle r="2.4" fill="#FFE58F"/></g>`).join('')}</svg>`;
      return `<div class="awning"></div>${sp}${hearts}`;
    }
    case 'kitsch': {
      const b=n=>Array.from({length:n},()=>'<i></i>').join('');
      return `<div class="burst"></div><div class="bulbs" style="top:14px">${b(28)}</div><div class="bulbs" style="bottom:14px">${b(28)}</div>`;
    }
    case 'graffiti': {
      const tags=[['KAREN',52,78,58,'#39FF14',-8],['K!',80,20,54,'#FF2E97',10],['QA',90,64,40,'#00E5FF',-6],['DEV',30,88,36,'#FFE600',6],['2026',44,6,28,'#B26BFF',-4]].map(([t,x,y,sz,c,r])=>`<span class="gtag" style="left:${x}%;top:${y}%;font-size:${sz}px;color:${c};transform:rotate(${r}deg);text-shadow:0 0 14px ${c}66,3px 3px 0 #0B0B0D;opacity:.55">${t}</span>`).join('');
      const slaps=[['HELLO my name is KAREN','#fff',70,56,-8],['NO BUGS','#FFE600',16,14,6],['SHIP IT','#FF2E97',50,8,-4]].map(([t,bg,x,y,r])=>`<span class="slap" style="left:${x}%;top:${y}%;background:${bg};--r:${r}deg">${t}</span>`).join('');
      return `<div class="bricks"></div>${tags}${slaps}<svg style="position:absolute;left:0;right:0;top:0;width:100%;height:60px" viewBox="0 0 1200 60" preserveAspectRatio="none"><g fill="#FF2E97" opacity=".8">${[60,210,380,520,700,860,1020,1140].map((x,i)=>`<path d="M${x} 0 h${14+i%3*6} v${18+i*5%30} a${7+i%3*3} ${7+i%3*3} 0 0 1 -${14+i%3*6} 0Z"/>`).join('')}</g></svg>`;
    }
    case 'gothic': {
      const bat=(t,d,s)=>`<div class="bat" style="top:${t}px;animation-delay:${d}s;width:${s}px"><svg viewBox="0 0 44 20"><path d="M22 8 C18 2 10 0 0 6 C6 6 8 10 6 14 C10 10 14 12 16 16 C18 12 20 12 22 14 C24 12 26 12 28 16 C30 12 34 10 38 14 C36 10 38 6 44 6 C34 0 26 2 22 8Z" fill="#07050A"/></svg></div>`;
      return `<div class="moon"></div>${bat(80,-2,44)}${bat(150,-8,30)}${bat(60,-11,36)}
        <svg class="castle" viewBox="0 0 1200 170" preserveAspectRatio="none"><path d="M0 170 V120 H60 V90 H80 V70 H90 V90 H110 V120 H200 V60 H215 V40 L230 10 L245 40 V60 H260 V120 H420 V100 H440 V80 H460 V100 H480 V120 H700 V70 H720 V50 L740 20 L760 50 V70 H780 V120 H940 V95 H960 V75 H980 V95 H1000 V120 H1100 V80 H1115 L1130 55 L1145 80 H1160 V120 H1200 V170Z" fill="#07050A"/><g fill="#FFD27A" opacity=".8"><rect x="226" y="70" width="8" height="12"/><rect x="736" y="80" width="8" height="12"/><rect x="1126" y="92" width="7" height="10"/></g></svg>`;
    }
    case 'doodle': return `<div class="spiral"></div><div class="margin"></div>
      <svg class="scribble" style="right:8%;top:30px;width:110px" viewBox="0 0 110 110" filter="url(#rough)"><circle cx="55" cy="55" r="22" fill="#FFF36B" stroke="#1E1E1E" stroke-width="3"/><g stroke="#1E1E1E" stroke-width="3" stroke-linecap="round">${Array.from({length:10},(_,i)=>{const a=i*36*Math.PI/180;return `<path d="M${55+Math.cos(a)*30} ${55+Math.sin(a)*30} L${55+Math.cos(a)*44} ${55+Math.sin(a)*44}"/>`}).join('')}</g></svg>
      <svg class="scribble" style="left:92px;top:40px;width:180px" viewBox="0 0 180 60" filter="url(#rough)"><path d="M10 40 q30 -30 60 0 t60 0 t40 -10" stroke="#FF9ECF" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
    case 'medieval': {
      const leaf=(x,y,r,c)=>`<path d="M0 0 q10 -16 20 0 q-10 12 -20 0Z" fill="${c}" stroke="#3A2418" stroke-width="1.5" transform="translate(${x} ${y}) rotate(${r})"/>`;
      let v='';for(let i=0;i<14;i++){const y=40+i*42;v+=leaf(i%2?18:4,y,i%2?30:-30,i%2?'#C8412F':'#2F4F9E')+`<circle cx="${i%2?8:26}" cy="${y+20}" r="4" fill="#C9A24B" stroke="#3A2418" stroke-width="1"/>`}
      let h='';for(let i=0;i<30;i++){const x=60+i*44;h+=leaf(x,i%2?16:4,i%2?60:120,i%2?'#3F7F5F':'#C8412F')+`<circle cx="${x+22}" cy="${i%2?8:26}" r="4" fill="#C9A24B" stroke="#3A2418" stroke-width="1"/>`}
      return `<svg class="border-vine" viewBox="0 0 1400 640" preserveAspectRatio="xMinYMin slice"><path d="M14 640 V14 H1400" fill="none" stroke="#3A2418" stroke-width="2"/><path d="M30 640 V30 H1400" fill="none" stroke="#C9A24B" stroke-width="4"/><path d="M22 640 C40 560 4 500 22 420 C40 340 4 280 22 200 C40 120 4 60 22 22 C80 40 140 4 220 22 C300 40 360 4 440 22 C520 40 580 4 660 22 C740 40 800 4 880 22 C960 40 1020 4 1100 22 C1180 40 1240 4 1320 22 C1360 30 1380 20 1400 22" fill="none" stroke="#3F7F5F" stroke-width="3"/><g transform="translate(10 0)">${v}</g><g transform="translate(0 10)">${h}</g></svg>
        <div class="marg" style="right:3%;bottom:14px;width:130px">${ART.knightsnail?ART.knightsnail(P(4)):''}</div>
        <div class="marg" style="right:16%;bottom:18px;width:84px;transform:scaleX(-1)">${ART.rabbit?ART.rabbit(P(0)):''}</div>`;
    }
    case 'pixel': {
      const tw=Array.from({length:26},()=>`<i class="twinkle" style="left:${rnd(0,100)}%;top:${rnd(0,80)}%;animation-delay:${rnd(0,1.6)}s;${Math.random()<.3?'background:#FFD23F;':''}"></i>`).join('');
      const cl=(t,d,s)=>`<svg class="pxcloud" style="top:${t}px;width:${s}px;animation-duration:${d}s;animation-delay:${-d/2}s" viewBox="0 0 40 16" shape-rendering="crispEdges"><path d="M8 4 H16 V0 H28 V4 H34 V8 H40 V16 H0 V8 H8Z" fill="#fff" opacity=".9"/></svg>`;
      return `${tw}${cl(60,50,120)}${cl(130,70,80)}<div class="ground"></div>`;
    }
    case 'y2k': {
      const orbs=[[6,20,90,'#FF9AD8'],[84,14,120,'#7FD6FF'],[74,70,70,'#B8A6FF'],[18,78,56,'#9CF2D8']].map(([x,y,s,c],i)=>`<i class="orb" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;--c:${c};animation-delay:${-i*1.7}s"></i>`).join('');
      const sp=Array.from({length:10},()=>`<svg class="spark" style="left:${rnd(2,96)}%;top:${rnd(5,90)}%;width:${rnd(14,26)}px;animation-delay:${rnd(0,1.8)}s" viewBox="0 0 16 16"><path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5Z" fill="#fff"/></svg>`).join('');
      return orbs+sp;
    }
  }
  return '';
}
