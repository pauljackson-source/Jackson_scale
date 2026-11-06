(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
setTimeout(function(){$("#ld").classList.add("x")},900);
// backdrop
var cv=$("#fx"),cx=cv.getContext("2d"),W,H,P=[],pl=[],rp=[],mx=0,my=0,tx=0,ty=0,ly=0,vel=0,T=0;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;mx=tx=W/2;my=ty=H/2}rs();addEventListener("resize",rs);
for(var i=0;i<(innerWidth<700?60:130);i++)P.push({x:Math.random(),y:Math.random(),z:.2+Math.random()*.8,vx:(Math.random()-.5)*.0002,vy:(Math.random()-.5)*.0002});
addEventListener("pointermove",function(e){tx=e.clientX;ty=e.clientY});
addEventListener("pointerdown",function(e){rp.push({x:e.clientX,y:e.clientY,r:0})});
function gp(p){return [p.x*W+(mx-W/2)*p.z*.06,p.y*H+(my-H/2)*p.z*.06]}
(function d(){T++;mx+=(tx-mx)*.08;my+=(ty-my)*.08;vel=vel*.9+(scrollY-ly)*.1;ly=scrollY;
cx.clearRect(0,0,W,H);cx.globalAlpha=1;
// perspective floor
var hz=H*.68,vx=W/2+(mx-W/2)*.15;cx.lineWidth=1;
for(var i=-14;i<=14;i++){cx.strokeStyle="rgba(47,134,255,"+(.16-Math.abs(i)*.008)+")";cx.beginPath();cx.moveTo(vx,hz);cx.lineTo(vx+i*W*.18,H);cx.stroke()}
for(var k=0;k<12;k++){var f=((k+T*.012)%12)/12,y=hz+(H-hz)*f*f;cx.strokeStyle="rgba(0,229,255,"+(.05+f*.2)+")";cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke()}
var g=cx.createLinearGradient(0,hz-60,0,hz+20);g.addColorStop(0,"transparent");g.addColorStop(.6,"rgba(255,46,77,.12)");g.addColorStop(1,"transparent");cx.fillStyle=g;cx.fillRect(0,hz-60,W,80);
// particles + links
var S=P.map(function(p){p.x+=p.vx;p.y+=p.vy-vel*.00004*p.z;if(p.x<0)p.x=1;if(p.x>1)p.x=0;if(p.y<0)p.y=1;if(p.y>1)p.y=0;return gp(p)});
for(var i=0;i<P.length;i++){var a=S[i],z=P[i].z,st=Math.min(Math.abs(vel)*z*1.4,60);
cx.globalAlpha=.35+z*.55;cx.strokeStyle=cx.fillStyle=i%9?"#00e5ff":"#ff2e4d";
if(st>2){cx.lineWidth=z*1.6;cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(a[0],a[1]-Math.sign(vel)*st);cx.stroke()}
cx.beginPath();cx.arc(a[0],a[1],z*1.8,0,6.3);cx.fill();
for(var j=i+1;j<P.length;j++){var b=S[j],dx=a[0]-b[0],dy=a[1]-b[1],dd=dx*dx+dy*dy;if(dd<15000){cx.globalAlpha=.2*(1-dd/15000);cx.strokeStyle="#2f86ff";cx.lineWidth=1;cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(b[0],b[1]);cx.stroke();
if(Math.random()<.0004&&pl.length<14)pl.push({a:a,b:b,t:0})}}
var mdx=a[0]-mx,mdy=a[1]-my;if(mdx*mdx+mdy*mdy<30000){cx.globalAlpha=.5;cx.strokeStyle="#ff2e4d";cx.lineWidth=1;cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(mx,my);cx.stroke()}}
// energy pulses
pl=pl.filter(function(q){q.t+=.03;var x=q.a[0]+(q.b[0]-q.a[0])*q.t,y=q.a[1]+(q.b[1]-q.a[1])*q.t;cx.globalAlpha=1-q.t*.5;cx.fillStyle="#fff";cx.shadowColor="#00e5ff";cx.shadowBlur=14;cx.beginPath();cx.arc(x,y,2.5,0,6.3);cx.fill();cx.shadowBlur=0;return q.t<1});
// click shockwaves
rp=rp.filter(function(r){r.r+=7;cx.globalAlpha=Math.max(0,1-r.r/300);cx.strokeStyle="#ff2e4d";cx.lineWidth=2;cx.beginPath();cx.arc(r.x,r.y,r.r,0,6.3);cx.stroke();return r.r<300});
// cursor glow
var cg=cx.createRadialGradient(mx,my,0,mx,my,160);cg.addColorStop(0,"rgba(0,229,255,.14)");cg.addColorStop(1,"transparent");cx.globalAlpha=1;cx.fillStyle=cg;cx.fillRect(mx-160,my-160,320,320);
$("#bgl").style.transform="rotate("+(T*.05+scrollY*.08)+"deg) scale("+(1+Math.sin(T*.01)*.04)+")";
requestAnimationFrame(d)})();
// progress bar
addEventListener("scroll",function(){var h=document.documentElement;$("#bar").style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+"%"});
// reveal + counters
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("v");io.unobserve(e.target)}})},{threshold:.15});
$$(".rv").forEach(function(el,i){el.style.transitionDelay=(i%3)*.12+"s";io.observe(el)});
$$("[data-n]").forEach(function(el){var t=+el.dataset.n,s=el.dataset.s||"+",k=0;var iv=setInterval(function(){k+=Math.ceil(t/40);if(k>=t){k=t;clearInterval(iv)}el.textContent=k+s},40)});
// live readout
var rd=$("#rd");setInterval(function(){rd.textContent=(12.4+Math.random()*.02).toFixed(3)},300);
// 3D tilt + card glow
var sc=$("#sc");addEventListener("pointermove",function(e){var x=(e.clientX/innerWidth-.5)*20,y=(e.clientY/innerHeight-.5)*-20;sc.style.transform="rotateY("+x+"deg) rotateX("+y+"deg)"});
$$(".card").forEach(function(c){c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})});
// tabs
$$(".tab").forEach(function(t){t.onclick=function(){$$(".tab").forEach(function(x){x.classList.remove("on")});$$(".pg").forEach(function(x){x.classList.remove("on")});t.classList.add("on");$("#"+t.dataset.t).classList.add("on")}});
// chat
function tc(){$("#cb").classList.toggle("on")}$("#cbt").onclick=tc;$("#ai").onclick=tc;
// form -> whatsapp
$("#sd").onclick=function(){var t="Hello Jackson Scale,%0AName: "+encodeURIComponent($("#n").value)+"%0AEmail: "+encodeURIComponent($("#e").value)+"%0ACompany: "+encodeURIComponent($("#c").value)+"%0A"+encodeURIComponent($("#m").value);open("https://wa.me/919688106228?text="+t,"_blank")};
// theme
$("#tg").onclick=function(){var r=document.documentElement;r.dataset.theme=r.dataset.theme==="light"?"dark":"light"};
})();
