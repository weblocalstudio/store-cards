(()=>{
const $=id=>document.getElementById(id),cv=$('cv'),ctx=cv.getContext('2d');
const IDS=['bg1','bg2','angle','seed','title','sub','font','tsize','tc','sc','pos','dscale','rot','frame','size'],CK=['shapes','shadow'];
const PRE=[['#7c5cff','#0b0b14'],['#ff4fa3','#2a0845'],['#00c6ff','#0072ff'],['#f7971e','#c0392b'],['#11998e','#0b2b26'],['#f5f5f7','#c7c7d1']];
const base=()=>({img:null,bg1:'#7c5cff',bg2:'#0b0b14',angle:145,shapes:true,seed:7,title:'Tu app, en tu bolsillo',sub:'Diseño limpio. Experiencia fluida.',font:'Inter',tsize:100,tc:'#ffffff',sc:'#d6d6ee',shadow:true,pos:'top',ty:0,dev:'iphone',ori:'p',dscale:100,rot:0,frame:'#0a0a0f',size:'1290x2796'});
let slides=[base()],cur=0,drag=null,box=[0,0],raf=0;
const S=()=>slides[cur];
const rng=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const rr=(c,x,y,w,h,r)=>{c.beginPath();c.roundRect(x,y,w,h,r)};
function wrap(c,t,mw){const o=[];let l='';for(const w of t.split(' ')){const n=l?l+' '+w:w;if(c.measureText(n).width>mw&&l){o.push(l);l=w}else l=n}o.push(l);return o}
function render(c,W,H,s){
 const a=s.angle*Math.PI/180,r=Math.hypot(W,H)/2,g=c.createLinearGradient(W/2-Math.cos(a)*r,H/2-Math.sin(a)*r,W/2+Math.cos(a)*r,H/2+Math.sin(a)*r);
 g.addColorStop(0,s.bg1);g.addColorStop(1,s.bg2);c.fillStyle=g;c.fillRect(0,0,W,H);
 if(s.shapes){const R=rng(+s.seed);for(let i=0;i<7;i++){const x=R()*W,y=R()*H,z=W*(.08+R()*.2);c.globalAlpha=.05+R()*.09;c.fillStyle='#fff';c.beginPath();
  if(i%3==0)c.arc(x,y,z,0,7);else if(i%3==1)c.roundRect(x-z,y-z,z*2,z*2,z*.4);else{c.moveTo(x,y-z);c.lineTo(x+z,y+z);c.lineTo(x-z,y+z);c.closePath()}c.fill()}c.globalAlpha=1}
 const mac=s.dev==='mac',land=mac||s.ori==='l',top=s.pos==='top',k=s.tsize/100,wide=W>H;
 const fs=Math.min(W,H)*(wide?.075:.08)*k,ss=fs*.42,mw=W*.84,F=`"${s.font}",Inter,sans-serif`;
 c.textAlign='center';c.textBaseline='top';
 c.font=`800 ${fs}px ${F}`;const tl=wrap(c,s.title,mw);c.font=`500 ${ss}px ${F}`;const sl=wrap(c,s.sub,mw);
 const th=tl.length*fs*1.1+sl.length*ss*1.35+fs*.3;let y=(top?H*.07:H-th-H*.07)+s.ty*H;const t0=y;
 c.save();if(s.shadow){c.shadowColor='#0009';c.shadowBlur=fs*.3;c.shadowOffsetY=fs*.08}
 c.fillStyle=s.tc;c.font=`800 ${fs}px ${F}`;tl.forEach(l=>{c.fillText(l,W/2,y);y+=fs*1.1});
 y+=fs*.3;c.fillStyle=s.sc;c.font=`500 ${ss}px ${F}`;sl.forEach(l=>{c.fillText(l,W/2,y);y+=ss*1.35});c.restore();
 box=[t0,t0+th];
 const R={iphone:2.17,android:2.1,ipad:1.34,mac:1.6}[s.dev],sc=s.dscale/100;let dw,dh;
 if(mac){dw=Math.min(W*.8,H*1.1*R)*sc;dh=dw/R}else if(land){dh=Math.min(H*.6,W*.6/R)*sc;dw=dh*R}else{dw=W*(s.dev==='ipad'?.8:.66)*sc;dh=dw*R}
 const free=top?H-(t0+th+H*.04):t0-H*.04;let dy=top?t0+th+H*.04:t0-H*.04-dh;
 if(land||mac)dy=top?dy:dy;
 c.save();c.translate(W/2,dy+dh/2);c.rotate(s.rot*Math.PI/180);dev(c,-dw/2,-dh/2,dw,dh,land,s);c.restore();
}
function dev(c,x,y,w,h,land,s){
 const m=Math.min(w,h),d=s.dev,rad=m*{iphone:.15,android:.09,ipad:.07,mac:.035}[d],b=m*(d==='mac'?.022:d==='ipad'?.045:.03);
 c.save();c.shadowColor='#000b';c.shadowBlur=m*.14;c.shadowOffsetY=m*.05;rr(c,x,y,w,h,rad);c.fillStyle=s.frame;c.fill();c.restore();
 c.lineWidth=m*.006;c.strokeStyle='#ffffff30';rr(c,x,y,w,h,rad);c.stroke();
 const sx=x+b,sy=y+b,sw=w-b*2,sh=h-b*2;
 c.save();rr(c,sx,sy,sw,sh,Math.max(rad-b*.6,2));c.clip();
 if(s.img){const z=Math.max(sw/s.img.width,sh/s.img.height),iw=s.img.width*z,ih=s.img.height*z;c.drawImage(s.img,sx+(sw-iw)/2,sy+(sh-ih)/2,iw,ih)}
 else{const g=c.createLinearGradient(sx,sy,sx+sw,sy+sh);g.addColorStop(0,'#1d1b3a');g.addColorStop(1,'#3a1d4f');c.fillStyle=g;c.fillRect(sx,sy,sw,sh);c.fillStyle='#ffffff88';c.font=`600 ${m*.06}px Inter`;c.textAlign='center';c.textBaseline='middle';c.fillText('Tu captura aquí',sx+sw/2,sy+sh/2)}
 c.restore();c.fillStyle='#000';c.beginPath();
 if(d==='iphone'){const iw=m*.3,ih=m*.085;land?c.roundRect(sx+m*.01,sy+sh/2-iw/2,ih,iw,ih/2):c.roundRect(sx+sw/2-iw/2,sy+m*.02,iw,ih,ih/2)}
 else if(d==='android')land?c.arc(sx+m*.035,sy+sh/2,m*.022,0,7):c.arc(sx+sw/2,sy+m*.035,m*.022,0,7);
 else if(d==='ipad')land?c.arc(x+b/2,y+h/2,m*.008,0,7):c.arc(x+w/2,y+b/2,m*.008,0,7);
 else c.roundRect(x+w/2-m*.06,sy,m*.12,m*.03,[0,0,m*.02,m*.02]);
 c.fill();
 if(d==='mac'){const g=c.createLinearGradient(0,y+h,0,y+h+h*.05);g.addColorStop(0,'#e4e4ea');g.addColorStop(1,'#9a9aa6');c.fillStyle=g;rr(c,x-w*.06,y+h-1,w*1.12,h*.045,[0,0,h*.04,h*.04]);c.fill();c.fillStyle='#0003';rr(c,x+w/2-w*.07,y+h-1,w*.14,h*.014,[0,0,h*.012,h*.012]);c.fill()}
}
const SZ={iphone:[[1320,2868,'iPhone 6.9"'],[1290,2796,'iPhone 6.9" (alt)'],[1284,2778,'iPhone 6.5"'],[1242,2688,'iPhone 6.5" (alt)'],[1206,2622,'iPhone 6.3"']],
 android:[[1080,1920,'Google Play 9:16'],[1440,2560,'Google Play QHD'],[1080,2160,'Google Play 18:9']],
 ipad:[[2064,2752,'iPad 13" (M4)'],[2048,2732,'iPad 12.9"']],
 mac:[[2880,1800,'Mac 2880×1800'],[2560,1600,'Mac 2560×1600'],[1440,900,'Mac 1440×900'],[1280,800,'Mac 1280×800']]};
const swap=s=>s.ori==='l'&&s.dev!=='mac';
const dims=s=>{const [w,h]=s.size.split('x').map(Number);return swap(s)?[h,w]:[w,h]};
function fillSizes(){const s=S(),L=SZ[s.dev];if(!L.some(o=>o[0]+'x'+o[1]===s.size))s.size=L[0][0]+'x'+L[0][1];
 $('size').innerHTML=L.map(o=>`<option value="${o[0]}x${o[1]}">${o[2]} — ${swap(s)?o[1]+'×'+o[0]:o[0]+'×'+o[1]}</option>`).join('')}
function draw(){const s=S(),[W,H]=dims(s);cv.width=W;cv.height=H;render(ctx,W,H,s);cancelAnimationFrame(raf);raf=requestAnimationFrame(thumbs)}
function thumbs(){const st=$('strip');while(st.children.length>slides.length)st.lastChild.remove();
 slides.forEach((s,i)=>{let t=st.children[i];if(!t){t=document.createElement('canvas');t.onclick=()=>{cur=i;sync();draw()};st.append(t)}
  const [W,H]=dims(s),z=240/Math.max(W,H);t.width=W*z;t.height=H*z;const c=t.getContext('2d');c.scale(z,z);render(c,W,H,s);t.className=i===cur?'on':''});}
function sync(){const s=S();fillSizes();IDS.forEach(i=>$(i).value=s[i]);CK.forEach(i=>$(i).checked=s[i]);
 document.querySelectorAll('.seg').forEach(g=>g.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.v===s[g.dataset.k])))}
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{document.querySelectorAll('.tab,.pane').forEach(e=>e.classList.remove('on'));t.classList.add('on');$('p-'+t.dataset.t).classList.add('on')});
IDS.concat(CK).forEach(i=>$(i).addEventListener('input',()=>{S()[i]=CK.includes(i)?$(i).checked:$(i).value;draw()}));
document.querySelectorAll('.seg').forEach(g=>g.onclick=e=>{const b=e.target.closest('button');if(!b)return;S()[g.dataset.k]=b.dataset.v;sync();draw()});
$('presets').innerHTML=PRE.map((p,i)=>`<button data-i="${i}" style="background:linear-gradient(135deg,${p[0]},${p[1]})" aria-label="Tema ${i+1}"></button>`).join('');
$('presets').onclick=e=>{const b=e.target.closest('button');if(!b)return;S().bg1=PRE[b.dataset.i][0];S().bg2=PRE[b.dataset.i][1];sync();draw()};
$('allbg').onclick=()=>{const s=S();slides.forEach(x=>Object.assign(x,{bg1:s.bg1,bg2:s.bg2,angle:s.angle,shapes:s.shapes,seed:s.seed}));draw()};
function addFiles(files){[...files].filter(f=>f.type.startsWith('image/')).forEach(f=>{const i=new Image();i.onload=()=>{
  if(!S().img&&slides.length===1&&cur===0)S().img=i;else{const n={...S(),img:i,ty:0};slides.push(n);cur=slides.length-1}sync();draw()};i.src=URL.createObjectURL(f)})}
$('drop2').onclick=$('add').onclick=()=>$('file').click();$('file').onchange=e=>{addFiles(e.target.files);e.target.value=''};
[$('drop'),$('drop2')].forEach(z=>{['dragover','dragenter'].forEach(v=>z.addEventListener(v,e=>{e.preventDefault();z.classList.add('over')}));['dragleave','drop'].forEach(v=>z.addEventListener(v,()=>z.classList.remove('over')));z.addEventListener('drop',e=>{e.preventDefault();addFiles(e.dataTransfer.files)})});
$('dup').onclick=()=>{slides.splice(cur+1,0,{...S()});cur++;sync();draw()};
$('del').onclick=()=>{if(slides.length===1){slides[0]=base()}else{slides.splice(cur,1);cur=Math.max(0,cur-1)}sync();draw()};
const mv=d=>{const j=cur+d;if(j<0||j>=slides.length)return;[slides[cur],slides[j]]=[slides[j],slides[cur]];cur=j;draw()};
$('left').onclick=()=>mv(-1);$('right').onclick=()=>mv(1);
cv.onpointerdown=e=>{const r=cv.getBoundingClientRect(),y=(e.clientY-r.top)/r.height*cv.height;if(y>=box[0]-60&&y<=box[1]+60){drag=[e.clientY,S().ty];cv.setPointerCapture(e.pointerId);cv.style.cursor='grabbing'}};
cv.onpointermove=e=>{if(drag){S().ty=drag[1]+(e.clientY-drag[0])/cv.getBoundingClientRect().height;draw()}};
cv.onpointerup=()=>{drag=null;cv.style.cursor='grab'};
document.addEventListener('keydown',e=>{if(/INPUT|SELECT/.test(e.target.tagName))return;if(e.key==='ArrowLeft'&&cur>0){cur--;sync();draw()}if(e.key==='ArrowRight'&&cur<slides.length-1){cur++;sync();draw()}});
const fmt=()=>$('fmt').value,ext=()=>fmt()==='jpeg'?'jpg':'png';
const blob=(c,t)=>new Promise(r=>c.toBlob(r,t==='jpeg'?'image/jpeg':'image/png',.95));
async function shot(s){const [W,H]=dims(s),o=document.createElement('canvas');o.width=W;o.height=H;render(o.getContext('2d'),W,H,s);return blob(o,fmt())}
const save=(b,n)=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2e3)};
function fav(n,full){const o=document.createElement('canvas');o.width=o.height=n;const c=o.getContext('2d'),g=c.createLinearGradient(0,0,n,n);g.addColorStop(0,S().bg1);g.addColorStop(1,'#ff4fa3');c.fillStyle=g;c.beginPath();c.roundRect(0,0,n,n,full?0:n*.22);c.fill();c.fillStyle='#fff';c.beginPath();c.roundRect(n*.3,n*.2,n*.4,n*.6,n*.07);c.fill();return o}
$('dl').onclick=async()=>save(await shot(S()),`store-card-${cur+1}.${ext()}`);
$('zip').onclick=async()=>{const z=new JSZip(),sl=z.folder('slides'),f=z.folder('favicons');
 for(let i=0;i<slides.length;i++)sl.file(`${String(i+1).padStart(2,'0')}-${slides[i].dev}.${ext()}`,await shot(slides[i]));
 for(const [n,s,full] of [['favicon-16x16',16],['favicon-32x32',32],['apple-touch-icon',180,1],['android-chrome-192x192',192],['android-chrome-512x512',512]])f.file(n+'.png',await blob(fav(s,full)));
 f.file('site.webmanifest',JSON.stringify({name:'Store Cards',icons:[192,512].map(s=>({src:`android-chrome-${s}x${s}.png`,sizes:`${s}x${s}`,type:'image/png'})),theme_color:'#0b0b14',display:'standalone'},null,2));
 save(await z.generateAsync({type:'blob'}),'store-cards.zip')};
sync();document.fonts.ready.then(draw);draw();
})();
