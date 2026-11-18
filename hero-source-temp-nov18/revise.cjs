const fs=require('node:fs'),path=require('node:path'),sharp=require(path.join(process.execPath,'../../node_modules/sharp'));
const A='images/top-hero/',T='hero-source-temp-nov18/', manifest=A+'layer-crops.json', doc=JSON.parse(fs.readFileSync(manifest)), C=doc.layers;
const html=fs.readFileSync('examples/hero-layers.html','utf8').split('class="hex-hero-scene"')[1].split('class="hex-hero-bottom-illustrations')[0],css=fs.readFileSync('css/hex_pc.css','utf8'), items=Array.from(html.matchAll(/<img class="([^"]+)" src="([^"]+)"/g));
const W=1220,H=470, limit=(x,a,b)=>Math.max(a,Math.min(b,x)), lum=(r,g,b)=>.25*r+.55*g+.20*b;
async function layers(){let entries=[];for(const [,cls,n] of items){let x,y,w,h;const c=C[n];if(c){x=10+.4*c.x;y=-162.3+.4*c.y;w=.4*c.width;h=.4*c.height;}else{const s=css.split('.'+cls.split(' ').at(-1)+'{')[1].split('}')[0],v=k=>parseFloat(s.split('--hex-sprite-'+k+':')[1])/100,m=await sharp(A+n).metadata();w=1500*v('width');h=w*m.height/m.width;x=1500*v('x')-140;y=927*(1-v('bottom'))-255-h;}
entries.push({name:n,input:await sharp(fs.readFileSync(A+n)).resize(Math.round(w),Math.round(h),{fit:'fill'}).png().toBuffer(),left:Math.round(x),top:Math.round(y)});}return entries;}
(async()=>{const entries=await layers(), owner=Buffer.alloc(W*H);
for(const [id,e] of entries.entries()){const {data,info}=await sharp(e.input).ensureAlpha().raw().toBuffer({resolveWithObject:true});for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>50)owner[(e.top+y)*W+e.left+x]=id+1;}
const {data:ref,info:R}=await sharp(T+'reference.png').removeAlpha().raw().toBuffer({resolveWithObject:true});
const grain=await sharp(T+'grain.png').resize(512,512,{fit:'fill'}).greyscale().raw().toBuffer();
for(const [id,e] of entries.entries()){const n=e.name,c=C[n];if(!c||n==='drawing.webp')continue;
const d=await sharp(fs.readFileSync(A+n)).ensureAlpha().raw().toBuffer(), w=c.width,h=c.height;
for(let y=0;y<h;y++)for(let x=0;x<w;x++){let k=(y*w+x)*4;if(!d[k+3])continue;
const X=10+.4*(c.x+x),Y=-162.3+.4*(c.y+y), at=Math.round(Y)*W+Math.round(X);
const r=d[k],g=d[k+1],b=d[k+2],L=lum(r,g,b);
let target=[r,g,b];if(owner[at]===id+1){
 const u=Math.round(X*R.width/W),v=Math.round(Y*R.height/H);
 let best=1e8,idx=-1;
 for(const [dx,dy] of [[0,0],[-2,0],[2,0],[0,-2],[0,2],[-5,-3],[5,-3],[-5,3],[5,3],[-9,0],[9,0],[0,-8],[0,8]]){
 const j=3*(limit(v+dy,0,R.height-1)*R.width+limit(u+dx,0,R.width-1));const a=ref[j],B=ref[j+1],D=ref[j+2],vL=lum(a,B,D);
 if(D-a>27||B-a>16||a-D>62&&r-b<25)continue;
 const score=(Math.max(0,Math.abs(vL-L)-25))**2+.55*((a-B)-(r-g))**2+.45*((B-D)-(g-b))**2+7*(dx*dx+dy*dy);
 if(score<best){best=score;idx=j;}
 }
 if(idx>=0){const mix=.90/(1+best/1800);target=target.map((v,i)=>v+(ref[idx+i]-v)*mix);}
}
const roof=n==='house.webp'&&y<235&&L<105&&Math.max(r,g,b)-Math.min(r,g,b)<18;
const grainValue=grain[(y%512)*512+x%512]-grain[((y+5)%512)*512+(x+5)%512];
for(let i=0;i<3;i++)d[k+i]=limit(Math.round(target[i]+limit(grainValue,-30,30)*(roof?.35:.08)),0,255);
}
let result=await sharp(d,{raw:{width:w,height:h,channels:4}}).png().toBuffer();
if(n==='plinth.webp'){const pad=55,bottom=72;
const mask=await sharp(result).extractChannel(3).png().toBuffer();
const blurred=await sharp(mask).extend({left:pad,right:pad,top:0,bottom,background:'#000'}).blur(19).greyscale().raw().toBuffer();
const extW=w+2*pad,extH=h+bottom,shadow=Buffer.alloc(extW*extH*4);
for(let y=17;y<extH;y++)for(let x=0;x<extW-8;x++){let k=4*(y*extW+x);shadow[k]=62;shadow[k+1]=83;shadow[k+2]=99;shadow[k+3]=Math.round(.28*blurred[(y-17)*extW+x+8]);}
for(const [cx,cy,rx] of [[339,381,11],[374,388,13],[422,392,8]]){const sx=(cx-10)/.4-c.x+pad,sy=(cy+162.3)/.4-c.y;for(let py=Math.max(0,Math.floor(sy-22));py<Math.min(extH,sy+23);py++)for(let px=Math.max(0,Math.floor(sx-3*rx/.4));px<Math.min(extW,sx+3*rx/.4);px++){const k=4*(py*extW+px);const a=50*Math.exp(-.5*(((px-sx)*.4/rx)**2+((py-sy)/7)**2));shadow[k+3]=Math.min(255,Math.round(shadow[k+3]+a));}}
result=await sharp(shadow,{raw:{width:extW,height:extH,channels:4}}).composite([{input:result,left:pad,top:0}]).png().toBuffer();
c.x-=pad;c.width=extW;c.height=extH;
}
fs.writeFileSync(T+n,await sharp(result).webp({lossless:true,effort:5}).toBuffer());}
for(const n of Object.keys(C))if(n!=='drawing.webp')fs.copyFileSync(T+n,A+n);
fs.writeFileSync(manifest,JSON.stringify(doc,null,2)+'\n');
for(const file of ['js/hex.js','docs/hero-gpu-check.html']){let s=fs.readFileSync(file,'utf8');if(!s.includes('x:135,y:755,width:2750,height:768'))throw Error('plinth registration');fs.writeFileSync(file,s.replace('x:135,y:755,width:2750,height:768','x:80,y:755,width:2860,height:840').replace('20261118-diorama-2','20261118-diorama-3'));}
const after=await layers();await sharp({create:{width:W,height:H,channels:3,background:'#cbdcf1'}}).composite(after.map(({input,left,top})=>({input,left,top}))).png().toFile('docs/hero-diorama-preview.png');
})().catch(e=>{console.error(e);process.exitCode=1;});


