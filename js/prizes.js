/* ================= PRIZES: unique avatar upgrade per world ================= */
const PRIZES={
  anthro:['The Pearl Helmet','Your guide now dives in a shimmering pearl helmet, with Coral the seahorse tagging along.'],
  kawaii:['Bunny Ears & Star Wand','Your guide got fluffy bunny ears and a sparkly star wand. Maximum cute unlocked.'],
  kitsch:['The Grand Prize','A winner\'s sash and a (mostly) solid gold trophy. Take a bow, darling!'],
  graffiti:['Gold Chain & Neon Halo','A heavy gold K chain and a spray-painted halo. The whole route knows your name.'],
  gothic:['The Raven Familiar','A loyal raven now rides on your guide\'s shoulder, beside a blood-red amulet.'],
  doodle:['Super Karen Kit','A doodled hero mask, a flowing cape and a K on the chest. Homework can wait.'],
  medieval:['The Gilded Halo','A gleaming gold-leaf halo, and a banner proclaiming Karen the Wise.'],
  pixel:['Legendary Loot','Pixel shades, a golden sword and LV 99. Absolutely legendary.'],
  y2k:['Cyber Angel Upgrade','A holographic visor and glossy angel wings. So very 2000.'],
};
function prizeBehind(w,S){
  switch(w){
    case 'doodle': return `<path d="M64 222 Q14 250 22 300 L278 300 Q286 250 236 222Z" fill="#FF6B6B" fill-opacity=".6" stroke="${S}" stroke-width="4"/><path d="M40 270 q10 -20 20 0 M240 270 q10 -20 20 0" stroke="${S}" stroke-width="2.5" fill="none"/>`;
    case 'medieval': return `<circle cx="150" cy="128" r="112" fill="#E8C766" stroke="#3A2418" stroke-width="4"/><circle cx="150" cy="128" r="98" fill="none" stroke="#8C6420" stroke-width="2" stroke-dasharray="3 7"/><g stroke="#8C6420" stroke-width="2">${Array.from({length:24},(_,i)=>{const a=i*15*Math.PI/180;return `<path d="M${150+Math.cos(a)*100} ${128+Math.sin(a)*100} L${150+Math.cos(a)*110} ${128+Math.sin(a)*110}"/>`}).join('')}</g>`;
    case 'y2k': return `<defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#CFE3FF"/></linearGradient></defs><g fill="url(#wg)" stroke="#7B95D6" stroke-width="3"><path d="M100 210 C60 150 10 150 4 190 C20 190 30 200 24 214 C40 206 52 214 50 228 C66 220 80 228 80 240Z"/><path d="M200 210 C240 150 290 150 296 190 C280 190 270 200 276 214 C260 206 248 214 250 228 C234 220 220 228 220 240Z"/></g>`;
  }
  return '';
}
function prizeOver(w,S){
  switch(w){
    case 'kawaii': return `<g stroke="${S}" stroke-width="4"><path d="M110 70 Q150 50 190 70" fill="none" stroke="#FF9CCB" stroke-width="8"/><ellipse cx="116" cy="30" rx="16" ry="40" fill="#fff" transform="rotate(-14 116 30)"/><ellipse cx="184" cy="30" rx="16" ry="40" fill="#fff" transform="rotate(14 184 30)"/></g><ellipse cx="116" cy="32" rx="7" ry="26" fill="#FFC2DF" transform="rotate(-14 116 32)"/><ellipse cx="184" cy="32" rx="7" ry="26" fill="#FFC2DF" transform="rotate(14 184 32)"/>
      <path d="M232 280 L262 200" stroke="${S}" stroke-width="8" stroke-linecap="round"/><path d="M232 280 L262 200" stroke="#FFE58F" stroke-width="4" stroke-linecap="round"/><path d="M264 170 l7 15 16 2 -12 11 3 16 -14 -8 -14 8 3 -16 -12 -11 16 -2Z" fill="#FFE58F" stroke="${S}" stroke-width="3"/>`;
    case 'kitsch': return `<path d="M72 222 L232 292 L210 300 L60 238Z" fill="#FFD23F" stroke="#111" stroke-width="3"/><text x="0" y="0" font-family="Shrikhand,serif" font-size="17" fill="#C2127A" transform="translate(112 256) rotate(24)">WINNER</text>
      <g stroke="#111" stroke-width="3.5" stroke-linejoin="round"><path d="M222 190 H272 Q272 236 247 240 Q222 236 222 190Z" fill="#FFD23F"/><path d="M222 198 Q204 198 206 212 Q208 224 224 222 M272 198 Q290 198 288 212 Q286 224 270 222" fill="none"/><rect x="241" y="240" width="12" height="16" fill="#FFD23F"/><rect x="228" y="256" width="38" height="12" rx="3" fill="#FF3EA5"/></g><path d="M232 198 q4 18 12 24" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>
      <g>${[[40,40,'#00D1C1'],[70,100,'#FFE600'],[250,60,'#FF3EA5'],[40,180,'#9B5CFF'],[276,130,'#FFE600']].map(([x,y,c],i)=>`<rect x="${x}" y="${y}" width="12" height="6" fill="${c}" transform="rotate(${i*37} ${x} ${y})"/>`).join('')}</g>`;
    case 'graffiti': return `<ellipse cx="150" cy="26" rx="64" ry="14" fill="none" stroke="#39FF14" stroke-width="7"/><path d="M110 36 v10 a3 3 0 0 0 6 0 v-8 M184 36 v14 a3 3 0 0 0 6 0 v-12" stroke="#39FF14" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g fill="#FFD23F" stroke="#8C6420" stroke-width="2">${Array.from({length:11},(_,i)=>{const t=i/10,x=108+t*84,y=222+Math.sin(t*Math.PI)*30;return `<circle cx="${x}" cy="${y}" r="6"/>`}).join('')}<circle cx="150" cy="268" r="16"/></g><text x="150" y="275" text-anchor="middle" font-family="Sedgwick Ave Display,cursive" font-size="20" fill="#0B0B0D">K</text>`;
    case 'gothic': return `<path d="M124 222 L150 250 L176 222" fill="none" stroke="#C9A24B" stroke-width="3"/><path d="M150 244 q10 12 0 26 q-10 -14 0 -26Z" fill="#A8303F" stroke="#C9A24B" stroke-width="2.5"/>
      <g transform="translate(222 176)"><path d="M-6 44 L-10 58 M8 44 L12 58" stroke="#C9A24B" stroke-width="3"/><ellipse cx="0" cy="26" rx="26" ry="22" fill="#141018" stroke="#C9A24B" stroke-width="2.5"/><path d="M-24 24 Q-4 10 18 34 Q-4 44 -24 24Z" fill="#2B1F3F" stroke="#C9A24B" stroke-width="2"/><circle cx="16" cy="0" r="15" fill="#141018" stroke="#C9A24B" stroke-width="2.5"/><path d="M28 -2 L42 4 L28 8Z" fill="#C9A24B"/><circle cx="20" cy="-3" r="3.5" fill="#9FE8C8"/></g>`;
    case 'doodle': return `<path fill-rule="evenodd" d="M98 134 Q150 116 202 134 L206 158 Q150 172 94 158Z M118 146 a14 10 0 1 0 28 0 a14 10 0 1 0 -28 0Z M154 146 a14 10 0 1 0 28 0 a14 10 0 1 0 -28 0Z" fill="#FF6B6B" stroke="${S}" stroke-width="3"/><path d="M94 150 L70 140 M94 156 L72 166" stroke="${S}" stroke-width="3"/>
      <path d="M150 248 l8 12 14 -2 -9 11 6 13 -13 -5 -11 9 1 -14 -12 -7 14 -3Z" fill="#FFF36B" stroke="${S}" stroke-width="2.5"/><text x="150" y="274" text-anchor="middle" font-family="Caveat Brush,cursive" font-size="16" fill="${S}">K</text>`;
    case 'pixel': return `<g shape-rendering="crispEdges"><rect x="104" y="132" width="92" height="10" fill="#10101F"/><rect x="108" y="142" width="36" height="16" fill="#10101F"/><rect x="156" y="142" width="36" height="16" fill="#10101F"/><rect x="112" y="144" width="8" height="4" fill="#fff"/><rect x="160" y="144" width="8" height="4" fill="#fff"/>
      <rect x="246" y="130" width="12" height="110" fill="#FFD23F" stroke="#10101F" stroke-width="3"/><rect x="234" y="236" width="36" height="10" fill="#B26BFF" stroke="#10101F" stroke-width="3"/><rect x="246" y="246" width="12" height="26" fill="#8B5A2B" stroke="#10101F" stroke-width="3"/><rect x="250" y="136" width="4" height="90" fill="#fff" opacity=".7"/>
      <rect x="20" y="30" width="80" height="26" fill="#FF4F79" stroke="#F4F4F4" stroke-width="3"/></g><text x="60" y="49" text-anchor="middle" font-family="Press Start 2P,monospace" font-size="12" fill="#fff">LV 99</text>`;
    case 'medieval': return `<path d="M40 262 L60 250 L240 250 L260 262 L240 274 L60 274Z" fill="#F6EBCF" stroke="#3A2418" stroke-width="3"/><path d="M40 262 L20 256 L28 268 L20 280 L50 272Z M260 262 L280 256 L272 268 L280 280 L250 272Z" fill="#C8412F" stroke="#3A2418" stroke-width="2.5"/><text x="150" y="268" text-anchor="middle" font-family="Uncial Antiqua,serif" font-size="17" fill="#C8412F">Karen the Wise</text>`;
    case 'y2k': return `<defs><linearGradient id="holo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FF9AD8"/><stop offset=".35" stroke-color="#fff" stop-color="#9FF3FF"/><stop offset=".7" stop-color="#B8A6FF"/><stop offset="1" stop-color="#FFE38A"/></linearGradient></defs><path d="M92 136 Q150 118 208 136 L204 158 Q150 172 96 158Z" fill="url(#holo)" fill-opacity=".85" stroke="${S}" stroke-width="3"/><path d="M110 138 Q150 128 190 138" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>`;
  }
  return '';
}
function seahorse(S){
  return `<g transform="translate(256 120)"><path d="M0 0 C16 4 16 26 2 36 C-10 44 -8 60 6 62 C16 62 14 50 6 52" fill="none" stroke="${S}" stroke-width="16" stroke-linecap="round"/><path d="M0 0 C16 4 16 26 2 36 C-10 44 -8 60 6 62 C16 62 14 50 6 52" fill="none" stroke="#FF9ECF" stroke-width="10" stroke-linecap="round"/><path d="M-4 -8 L-24 -4" stroke="${S}" stroke-width="10" stroke-linecap="round"/><path d="M-4 -8 L-24 -4" stroke="#FF9ECF" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="-6" r="11" fill="#FF9ECF" stroke="${S}" stroke-width="3"/><circle cx="2" cy="-8" r="2.5" fill="${S}"/><path d="M12 14 l10 -4 -2 10Z" fill="#FFE135" stroke="${S}" stroke-width="2"/></g>
    <g fill="#fff">${[[30,40],[270,20],[40,200]].map(([x,y])=>`<path d="M${x} ${y-8} l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2Z"/>`).join('')}</g>`;
}
