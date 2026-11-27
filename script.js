document.documentElement.classList.add('js');
(()=>{
var TEL="573136194040";
var $=(s,e)=>(e||document).querySelector(s),$$=(s,e)=>Array.prototype.slice.call((e||document).querySelectorAll(s));
var guarda=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},lee=(k,d)=>{try{var a=localStorage.getItem(k);return a===null?d:a}catch(e){return d}};
var seguro=f=>{try{f()}catch(e){window.console&&console.warn(e)}};
var RED=(()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}})();
var cop=n=>"$"+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,".");

/* CATÁLOGO: una carta por plan */
var CATS=[["todo","Todo"],["video","Video"],["musica","Música"],["deportes","Deportes"],["apps","Apps y productividad"],["juegos","Juegos"],["estudio","Estudio"],["ia","Inteligencia artificial"]];
var N3="Desde el plan de 3 meses se vincula a tu correo";
var P=[
["video","Netflix","1 mes",12000,"netflix.jpg"],
["video","Prime Video","1 mes",10000,"primevideo.png"],
["video","Disney+ Premium","1 mes",12000,"disney.jpeg"],
["video","Disney+ con ESPN","1 mes",15000,"disney.jpeg"],
["video","Paramount","1 mes",16000,"paramount.png"],
["video","HBO Platino","1 mes",10000,"hbomax.jpeg"],
["video","IPTV","1 mes",10000,"iptv.jpeg"],
["video","Jelly","1 mes",10000,null],
["video","Tele Latino","1 mes",10000,"telelatino.jpeg"],
["video","Crunchyroll","1 mes",6500,"crunchyroll.png"],
["video","Crunchyroll","12 meses",54000,"crunchyroll.png"],
["video","YouTube Premium","1 mes",14000,null],
["video","Flujo TV","30 días",15000,"flujotv.png"],
["video","Flujo TV","3 meses",45000,"flujotv.png"],
["video","Flujo TV","6 meses",75000,"flujotv.png"],
["video","Flujo TV","12 meses",150000,"flujotv.png"],
["video","Apple TV","Pantalla",12000,"appletv.png","#000","contain"],
["video","Apple TV","Pantalla, 3 meses",20000,"appletv.png","#000","contain"],
["video","Plex","1 pantalla, 30 días",6500,null],
["video","Plex","Completa, 30 días",11500,null],
["video","IPTV Smarters","1 pantalla, 30 días",10000,"iptv.jpeg"],
["video","IPTV Smarters","1 pantalla, 3 meses",20000,"iptv.jpeg"],
["video","IPTV Smarters","Completa",35000,"iptv.jpeg"],
["musica","Spotify Premium","1 mes",14000,"spotify.png"],
["musica","Spotify Premium","2 meses",22000,"spotify.png"],
["musica","Spotify Premium","3 meses",28000,"spotify.png",0,0,N3],
["musica","Spotify Premium","6 meses",40000,"spotify.png",0,0,N3],
["musica","Spotify Premium","12 meses",60000,"spotify.png",0,0,N3],
["deportes","Win Sports+","Online, 30 días",19000,"winsport.png"],
["apps","CapCut","1 mes",20000,"capcut.png","#fff","contain"],
["apps","CapCut","6 meses",65000,"capcut.png","#fff","contain"],
["apps","Canva","30 días",10000,"canva.jpeg"],
["apps","Canva","90 días",14000,"canva.jpeg"],
["apps","Office","1 año",45000,"office.png","#fff","contain"],
["juegos","Xbox Game Pass Ultimate","1 mes",60000,"xboxgamepass.jpeg"],
["juegos","Xbox Game Pass Premium","1 mes",45000,"xboxgamepass.jpeg"],
["estudio","Duolingo Pro","30 días",9000,"duolingopro.png"],
["ia","ChatGPT","30 días",17000,"chatgpt.png","#fff","contain"]
].map((a,i)=>({id:"p"+i,c:a[0],n:a[1],pl:a[2],p:a[3],img:a[4],bg:a[5],fit:a[6],nota:a[7]}));
var byId={};P.forEach(p=>byId[p.id]=p);

var ped={};
try{ped=JSON.parse(lee("us-pedido","{}"))||{};Object.keys(ped).forEach(k=>{if(!byId[k]||!(ped[k]>0))delete ped[k]})}catch(e){ped={}}
var guardaPed=()=>guarda("us-pedido",JSON.stringify(ped));
var cuenta=()=>Object.keys(ped).length;
var tAv;
function aviso(t){seguro(()=>{var e=$("#aviso");e.textContent=t;e.classList.add("ve");clearTimeout(tAv);tAv=setTimeout(()=>e.classList.remove("ve"),2300)})}
var nombreDe=p=>p.n+" ("+p.pl+")";

/* render */
var cat="todo",busca="";
function render(){
  var g=$("#grid");g.innerHTML="";
  P.forEach(p=>{
    var li=document.createElement("article");li.className="carta";li.dataset.c=p.c;li.dataset.t=(p.n+" "+p.pl).toLowerCase();
    var logo=p.img?'<div class="carta-logo" style="'+(p.bg?'--logo-bg:'+p.bg+';':'')+(p.fit?'--fit:'+p.fit:'')+'"><img src="'+p.img+'" alt="Logo de '+p.n+'" width="150" height="150" loading="lazy"></div>':'<div class="carta-logo mono" aria-hidden="true">'+p.n.charAt(0)+'</div>';
    li.innerHTML='<div class="carta-in">'+logo+'<h3></h3><p class="plan"></p>'+(p.nota?'<p class="nota"></p>':'')+'<span class="precio">'+cop(p.p)+'<small>COP</small></span><button class="add" type="button" data-id="'+p.id+'" aria-pressed="false"><svg class="mas" aria-hidden="true"><use href="#i-mas"/></svg><svg class="ok" aria-hidden="true"><use href="#i-ok"/></svg><span class="lbl">Agregar</span></button></div>';
    $("h3",li).textContent=p.n;$(".plan",li).textContent=p.pl;if(p.nota)$(".nota",li).textContent=p.nota;
    g.appendChild(li);
  });
  filtra();
}
function filtra(){
  var n=0;
  $$(".carta").forEach(c=>{var ok=(cat==="todo"||c.dataset.c===cat)&&(!busca||c.dataset.t.indexOf(busca)>-1);c.hidden=!ok;if(ok)n++});
  $("#vacio").hidden=n>0;
  $$(".f").forEach(b=>b.setAttribute("aria-pressed",b.dataset.f===cat?"true":"false"));
}
seguro(()=>{
  $("#filtros").innerHTML=CATS.map(c=>'<button class="f" type="button" data-f="'+c[0]+'" aria-pressed="false">'+c[1]+'</button>').join("");
  $("#filtros").addEventListener("click",e=>{var b=e.target.closest(".f");if(b){cat=b.dataset.f;filtra()}});
  $("#q").addEventListener("input",e=>{busca=e.target.value.trim().toLowerCase();filtra()});
  $("#grid").addEventListener("click",e=>{var b=e.target.closest(".add");if(b)alterna(b.dataset.id)});
});

var hBoton=()=>{};
function pinta(salta){var _t=0;
  seguro(()=>{
    var b=$("#ctz-boton"),n=cuenta();$("#ctz-n").textContent=n;
    if(salta){b.classList.remove("salta");void b.offsetWidth;b.classList.add("salta")}
    b.classList.toggle("oculto",n===0);$("#ctz-boton span").textContent=n?"Mi pedido · "+cop(total()):"Mi pedido";
  });
  $$(".add").forEach(e=>{var on=!!ped[e.dataset.id];e.setAttribute("aria-pressed",on?"true":"false");e.querySelector(".lbl").textContent=on?"Agregado":"Agregar"});
}
function alterna(id){
  if(ped[id]){delete ped[id];aviso(nombreDe(byId[id])+" salió de tu pedido")}
  else{ped[id]=1;aviso(nombreDe(byId[id])+" agregado a tu pedido")}
  guardaPed();pinta(true);try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}
}
var total=()=>Object.keys(ped).reduce((t,k)=>t+byId[k].p*ped[k],0);
function mensaje(){
  var l=[],ks=Object.keys(ped);
  if(!ks.length)l.push("Hola, Ultra Streaming. Quiero hacer un pedido.");
  else{
    l.push("Hola, Ultra Streaming. Quiero este pedido:");
    ks.forEach(k=>{var p=byId[k];l.push("• "+ped[k]+" × "+nombreDe(p)+" — "+cop(p.p*ped[k]))});
    l.push("Total: "+cop(total()));
  }
  var nom=($("#ped-nombre").value||"").trim();if(nom)l.push("Mi nombre: "+nom);
  return l.join("\n");
}
var enlace=()=>seguro(()=>{$("#ped-enviar").href="https://wa.me/"+TEL+"?text="+encodeURIComponent(mensaje())});
function pintaLista(){
  var ul=$("#ped-lista"),ks=Object.keys(ped);
  $("#ped-vacia").hidden=ks.length>0;$("#ped-total").hidden=!ks.length;ul.innerHTML="";
  ks.forEach(k=>{
    var p=byId[k],li=document.createElement("li");li.className="ctz-it";
    li.innerHTML='<b></b><div class="ctz-paso"><button type="button" data-a="-" aria-label="Menos">−</button><output></output><button type="button" data-a="+" aria-label="Más">+</button></div><div class="ctz-uni"><span></span><button type="button" class="ctz-quitar">Quitar</button></div>';
    $("b",li).textContent=p.n;var s=document.createElement("span");s.className="sub";s.textContent=p.pl;$("b",li).appendChild(s);
    var pr=$(".ctz-uni span",li),o=$("output",li),refr=()=>{o.textContent=ped[k];pr.textContent=cop(p.p*ped[k])};refr();
    li.addEventListener("click",ev=>{
      var b=ev.target.closest("button");if(!b)return;
      if(b.classList.contains("ctz-quitar")){delete ped[k];guardaPed();pintaLista();pinta(false);return}
      var a=b.dataset.a;if(a){ped[k]=Math.max(1,Math.min(20,ped[k]+(a==="+"?1:-1)));refr();guardaPed();$("#ped-suma").textContent=cop(total());enlace()}
    });
    ul.appendChild(li);
  });
  $("#ped-suma").textContent=cop(total());enlace();
}
var foco=null;
function abre(){foco=document.activeElement;pintaLista();$("#ped-velo").hidden=false;document.body.style.overflow="hidden";seguro(()=>$("#ped-cerrar").focus())}
function cierra(){$("#ped-velo").hidden=true;document.body.style.overflow="";seguro(()=>foco&&foco.focus&&foco.focus())}
seguro(()=>{
  var v=$("#ped-velo");
  $("#ctz-boton").addEventListener("click",abre);$("#ped-cerrar").addEventListener("click",cierra);
  v.addEventListener("click",e=>{if(e.target===v)cierra()});
  $("#ped-nombre").addEventListener("input",enlace);$("#ped-enviar").addEventListener("click",enlace);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!v.hidden)cierra()});
});
render();pinta(false);

/* sonido de clic: buffer decodificado desde el inicio y disparo en pointerdown (sin demora en celular) */
var SON=lee("us-son","1")!=="0",AC=null,BUF=null,AU=$("#clic-audio"),ult=0;
function ctx(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)({latencyHint:"interactive"})}catch(e){try{AC=new(window.AudioContext||window.webkitAudioContext)}catch(x){AC=null}}}return AC}
function desbloquea(){var c=ctx();if(c&&c.state!=="running"&&c.resume)try{c.resume()}catch(e){}}
function carga(){
  var c=ctx();if(!c||!AU)return;
  try{fetch(AU.getAttribute("src")).then(r=>r.arrayBuffer()).then(b=>new Promise((ok,no)=>{var p=c.decodeAudioData(b,ok,no);p&&p.then&&p.then(ok,no)})).then(b=>{BUF=b}).catch(()=>{})}catch(e){}
}
function toca(v){var c=AC;if(c&&BUF){try{var s=c.createBufferSource();s.buffer=BUF;var g=c.createGain();g.gain.value=v==null?1:v;s.connect(g);g.connect(c.destination);s.start(0);return}catch(e){}}
  if(AU){try{AU.currentTime=0;AU.volume=v==null?1:v;var p=AU.play();p&&p.catch&&p.catch(()=>{})}catch(e){}}}
function suena(v){
  if(!SON)return;var c=ctx();
  if(c&&c.state!=="running"&&c.resume){try{var r=c.resume();r&&r.then?r.then(()=>toca(v),()=>toca(v)):toca(v)}catch(e){toca(v)}}else toca(v);
}
function clicEntrada(run){var c=ctx(),ok=false;var go=()=>{if(ok)return;ok=true;if(SON)toca();run()};
  if(SON&&c&&c.state!=="running"&&c.resume){try{var r=c.resume();r&&r.then?r.then(go,go):go();setTimeout(go,250)}catch(e){go()}}else go()}
var WB=null;
function cargaW(){var c=ctx();if(!c)return;try{fetch("whoosh.wav").then(r=>r.arrayBuffer()).then(b=>new Promise((ok,no)=>{var p=c.decodeAudioData(b,ok,no);p&&p.then&&p.then(ok,no)})).then(b=>{WB=b}).catch(()=>{})}catch(e){}}
function woosh(){if(!SON)return;var c=AC;if(!c||!WB)return;var go=()=>{try{var s=c.createBufferSource();s.buffer=WB;var g=c.createGain();g.gain.value=1;s.connect(g);g.connect(c.destination);s.start(0)}catch(e){}};if(c.state!=="running"&&c.resume){try{var r=c.resume();r&&r.then?r.then(go,go):go()}catch(e){go()}}else go()}
carga();cargaW();
["pointerdown","touchstart","keydown"].forEach(t=>window.addEventListener(t,desbloquea,{passive:true}));
var esB=e=>{var t=e.target.closest&&e.target.closest("a,button,[role=button]");return t&&t.id!=="son"&&!t.disabled&&!t.closest("#en")?t:null};
var dn=null;
document.addEventListener("pointerdown",e=>{var run=AC&&AC.state==="running";desbloquea();var t=esB(e);dn=null;if(t&&(e.pointerType!=="mouse"||e.button===0)){if(run){ult=Date.now();suena()}else dn={x:e.clientX,y:e.clientY,t:Date.now(),el:t}}},{passive:true});
document.addEventListener("pointermove",e=>{if(dn&&Math.hypot(e.clientX-dn.x,e.clientY-dn.y)>10)dn=null},{passive:true});
document.addEventListener("pointercancel",()=>{dn=null},{passive:true});
document.addEventListener("pointerup",e=>{var d=dn;dn=null;if(d&&d.el.contains(e.target)&&Date.now()-d.t<800&&Math.hypot(e.clientX-d.x,e.clientY-d.y)<=10){ult=Date.now();suena()}},{passive:true});

document.addEventListener("click",e=>{if(e.detail===0&&esB(e)&&Date.now()-ult>600)suena()});
seguro(()=>{var b=$("#son");b.setAttribute("aria-pressed",SON?"true":"false");b.addEventListener("click",()=>{SON=!SON;b.setAttribute("aria-pressed",SON?"true":"false");guarda("us-son",SON?"1":"0");if(SON)suena()})});

/* titular, vitral y cinta */
seguro(()=>{
  var t=$("#pt-t"),w=t.textContent.trim().split(/\s+/),n=w.length;
  t.setAttribute("aria-label",t.textContent.trim());
  t.innerHTML=w.map((a,i)=>'<span class="pal" aria-hidden="true"><span style="--i:'+i+'"'+(i>=n-3?' class="rojo"':'')+'>'+a+'</span></span>').join(" ");
});
seguro(()=>{
  ["netflix.jpg","disney.jpeg","hbomax.jpeg","primevideo.png","spotify.png","crunchyroll.png","paramount.png","canva.jpeg","xboxgamepass.jpeg"].forEach(s=>{var i=new Image();i.src=s;i.alt="";i.width=120;i.height=120;$("#vitral").appendChild(i)});
  var nombres=["Netflix","Prime Video","Disney+","Spotify","Crunchyroll","HBO","Paramount","Xbox Game Pass","Canva","ChatGPT","Office","Duolingo Pro","Apple TV","Win Sports+"],h=nombres.map(n=>"<span>"+n+"</span>").join("");
  $("#cinta").innerHTML=h+h;
});
seguro(()=>{if(RED)return;var pt=$("#pt"),q=0,ev;pt.addEventListener("pointermove",e=>{ev=e;if(q)return;q=requestAnimationFrame(()=>{q=0;var r=pt.getBoundingClientRect();pt.style.setProperty("--mx",(ev.clientX-r.left)+"px");pt.style.setProperty("--my",(ev.clientY-r.top)+"px")})},{passive:true})});

/* entrada: el sello (mantén presionado) */
function listo(){document.body.classList.add("listo")}
seguro(()=>{
  var en=$("#en"),se=$("#sello"),bt=$("#en-abrir"),sh=$("#shards"),hecho=false,down=false,p=0,last=0,raf=0;
  var fl=document.createElement("div");fl.className="destello";document.body.appendChild(fl);
  document.body.style.overflow="hidden";
  var N=8,K=360/N;
  for(var k=0;k<N;k++){
    var a0=(k*K-90+(k%2?3:-3))*Math.PI/180,a1=((k+1)*K-90)*Math.PI/180,am=(a0+a1)/2,R=62;
    var P=(a)=>(50+R*Math.cos(a)).toFixed(1)+"% "+(50+R*Math.sin(a)).toFixed(1)+"%";
    var sv=document.createElementNS("http://www.w3.org/2000/svg","svg");
    sv.setAttribute("viewBox","0 0 200 200");sv.setAttribute("class","sh");sv.setAttribute("aria-hidden","true");
    sv.style.clipPath="polygon(50% 50%,"+P(a0)+","+P(am)+","+P(a1)+")";
    var d=260+Math.random()*180;
    sv.style.setProperty("--dx",(Math.cos(am)*d).toFixed(0)+"px");sv.style.setProperty("--dy",(Math.sin(am)*d+120).toFixed(0)+"px");sv.style.setProperty("--r",((Math.random()-.5)*160).toFixed(0)+"deg");
    sv.innerHTML='<use href="#i-sello"/>';sh.appendChild(sv);
  }
  var pon=v=>{se.style.setProperty("--p",v.toFixed(3));var a=v*7;se.style.setProperty("--sx",((Math.random()-.5)*a*2).toFixed(1)+"px");se.style.setProperty("--sy",((Math.random()-.5)*a*2).toFixed(1)+"px")};
  function lazo(t){
    var dt=Math.min(.05,(t-last)/1000);last=t;
    p=Math.max(0,Math.min(1,p+(down?dt/1.1:-dt/.45)));pon(p);
    if(p>=1){entra();return}
    if(down||p>0)raf=requestAnimationFrame(lazo);else{se.style.setProperty("--sx","0px");se.style.setProperty("--sy","0px")}
  }
  function entra(){
    if(hecho)return;hecho=true;down=false;cancelAnimationFrame(raf);bt.disabled=true;
    se.style.setProperty("--p","1");se.style.setProperty("--sx","0px");se.style.setProperty("--sy","0px");
    var t=RED?[0,0,0]:[0,550,1300];
    clicEntrada(()=>{
    setTimeout(()=>{en.classList.add("roto");se.classList.add("roto");fl.classList.add("on");try{navigator.vibrate&&navigator.vibrate([40,30,90])}catch(e){}},t[0]);
    setTimeout(()=>{en.classList.add("abre");document.body.style.overflow="";woosh()},t[1]);
    setTimeout(listo,t[1]+600);
    setTimeout(()=>en.classList.add("fin"),t[2]+800);
    setTimeout(()=>{en.parentNode&&en.parentNode.removeChild(en)},t[2]+1300);
    });
  }
  se.addEventListener("pointerdown",e=>{if(hecho||RED){if(!hecho)entra();return}down=true;last=performance.now();try{se.setPointerCapture(e.pointerId)}catch(x){}try{navigator.vibrate&&navigator.vibrate(18)}catch(x){}cancelAnimationFrame(raf);raf=requestAnimationFrame(lazo)});
  ["pointerup","pointercancel"].forEach(t=>se.addEventListener(t,()=>{down=false}));
  se.addEventListener("contextmenu",e=>e.preventDefault());
  bt.addEventListener("click",entra);
  document.addEventListener("keydown",e=>{if(!hecho&&e.key==="Escape")entra()});
  setTimeout(()=>seguro(()=>bt.focus({preventScroll:true})),50);
});
if(!$("#en"))listo();

/* aparición al hacer scroll, luz en cartas, progreso */
seguro(()=>{
  var els=$$(".cab,.filtros,.buscar,.pasos li,.ct-grid>*,.carta");
  els.forEach((e,i)=>{e.classList.add("rev");if(e.classList.contains("carta"))e.style.setProperty("--d",(i%4)*70+"ms")});
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("vis"));return}
  var io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("vis");io.unobserve(x.target)}}),{rootMargin:"0px 0px -6% 0px",threshold:.05});
  els.forEach(e=>io.observe(e));
  $("#grid").addEventListener("pointermove",e=>{var c=e.target.closest(".carta-in");if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty("--x",(e.clientX-r.left)+"px");c.style.setProperty("--y",(e.clientY-r.top)+"px")},{passive:true});
});
seguro(()=>{var b=document.createElement("div");b.className="prog";b.id="prog";$("#hd").appendChild(b)});

/* menú */
seguro(()=>{
  var m=$("#menu"),ab=$("#menu-abrir"),ce=$("#menu-cerrar");
  var o=()=>{m.hidden=false;ab.setAttribute("aria-expanded","true");document.body.style.overflow="hidden";seguro(()=>ce.focus())};
  var c=()=>{m.hidden=true;ab.setAttribute("aria-expanded","false");document.body.style.overflow=""};
  ab.addEventListener("click",o);ce.addEventListener("click",c);
  $$("a",m).forEach(a=>a.addEventListener("click",c));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!m.hidden)c()});
});

/* scroll */
var IDS=["#inicio","#catalogo","#como-pedir","#contacto"],tick=false;
function alScroll(){
  tick=false;var y=window.scrollY,h=window.innerHeight,tope=document.documentElement.scrollHeight-h;
  $("#hd").classList.toggle("fijo",y>40);var pg=$("#prog");if(pg)pg.style.setProperty("--sp",(y/Math.max(1,tope)).toFixed(4));
  var a=IDS[0];IDS.forEach(id=>{var s=$(id);if(s&&id!=="#inicio"&&s.getBoundingClientRect().top<h*.4)a=id});
  if(tope>0&&y>=tope-4)a=IDS[IDS.length-1];
  $$("#hd-nav a,#menu nav a").forEach(l=>{var on=l.getAttribute("href")===a;l.classList.toggle("act",on);on?l.setAttribute("aria-current","true"):l.removeAttribute("aria-current")});
}
window.addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(alScroll)}},{passive:true});
seguro(alScroll);

/* compartir */
seguro(()=>{
  $("#comp").addEventListener("click",()=>{
    var u=location.href,ok=()=>aviso("Enlace copiado"),res=()=>{try{var t=document.createElement("textarea");t.value=u;t.style.cssText="position:fixed;opacity:0";document.body.appendChild(t);t.select();document.execCommand("copy");document.body.removeChild(t);ok()}catch(e){aviso(u)}};
    try{navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(u).then(ok,res):res()}catch(e){res()}
  });
  $("#anio").textContent=new Date().getFullYear();
});
})();
