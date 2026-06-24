/* ---- Hero slideshow: built from real product photos ---- */
(function(){
  var box=document.getElementById('heroSlides'), dotwrap=document.getElementById('heroDots');
  if(!box) return;
  var order=[
    ['sunflower-oil','SF-OIL','Sonnenblumenöl'],
    ['cashew-nuts','CNUT','Cashewkerne'],
    ['garlic','GARL','Knoblauch'],
    ['sugar','SUG-45','ICUMSA 45 Zucker'],
    ['sesame','SESM','Sesamsamen']
  ];
  var slides=[], dots=[];
  order.forEach(function(it,i){
    var bg = (PHOTOS[it[0]] && PHOTOS[it[0]].length) ? "url('"+PHOTOS[it[0]][0]+"')" : sesameSVG();
    var s=document.createElement('div');
    s.className='slide'+(i===0?' on':'');
    s.style.backgroundImage=bg;
    s.innerHTML='<div class="slide-tag"><span class="c">'+it[1]+'</span><span class="n">'+it[2]+'</span></div>';
    box.insertBefore(s,dotwrap); slides.push(s);
    var d=document.createElement('button'); d.className=i===0?'on':''; d.setAttribute('aria-label',it[2]);
    d.addEventListener('click',function(){ show(i); reset(); }); dotwrap.appendChild(d); dots.push(d);
  });
  var cur=0,timer;
  function show(n){ slides[cur].classList.remove('on'); dots[cur].classList.remove('on'); cur=n; slides[cur].classList.add('on'); dots[cur].classList.add('on'); }
  function next(){ show((cur+1)%slides.length); }
  function reset(){ clearInterval(timer); timer=setInterval(next,3800); }
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) reset();
})();

/* ---- Home product carousel: one product at a time, auto-advancing ---- */
(function(){
  var track=document.getElementById('carTrack'), dotwrap=document.getElementById('carDots');
  if(!track) return;
  var products=[
    {key:'sunflower-oil',code:'SF-OIL',name:'Sonnenblumenöl',
     desc:'Raffinierte (RBD) und rohe Qualitäten, hell und neutral. Verpackt in Flexitanks, Fässern oder Flaschen für den Einzelhandel.',
     tags:['Raffiniert / Roh','Kaltgepresst','Haltbarkeit 12–18 Monate']},
    {key:'cashew-nuts',code:'CNUT',name:'Cashewkerne',
     desc:'Rohe Cashewnüsse (RCN) für Verarbeiter und sortierte weiße Kerne (W240 / W320). Sortiert und mit kontrollierter Feuchtigkeit.',
     tags:['RCN','W240 · W320','Ausbeute 48–54 lbs']},
    {key:'sugar',code:'SUG-45',name:'ICUMSA 45 Zucker',
     desc:'Raffinierter weißer Rohrzucker, hell und feinkörnig, für den Direktverzehr und die Lebensmittelindustrie.',
     tags:['ICUMSA 45','Pol ≥ 99,8°','50-kg-Säcke / Jumbo-Bags']},
    {key:'sesame',code:'SESM',name:'Sesamsamen',
     desc:'Natürlich weißer und gemischter Sesam, maschinengereinigt und sortiert. Geschälte Saat auf Anfrage erhältlich.',
     tags:['99,95% Sortex','Öl 48–52%','Geschälte Option']},
    {key:'garlic',code:'GARL',name:'Knoblauch',
     desc:'Frische ganze Knoblauchknollen, handsortiert nach Größe und in belüfteter Verpackung verschickt, um sie während des Transports zu schützen.',
     tags:['Schneeweiß','4,5–6,5 cm','Reefer 8–12 °C']}
  ];
  var slides=[], dots=[];
  products.forEach(function(p,i){
    var bg=(PHOTOS[p.key] && PHOTOS[p.key].length) ? "url('"+PHOTOS[p.key][0]+"')" : (typeof sesameSVG==='function'?sesameSVG():'');
    var slide=document.createElement('div');
    slide.className='car-slide';
    slide.innerHTML=
      '<div class="car-media" style="background-image:'+bg+'"></div>'+
      '<div class="car-info">'+
        '<div class="car-code">'+p.code+'</div>'+
        '<h3>'+p.name+'</h3>'+
        '<p>'+p.desc+'</p>'+
        '<div class="car-tags">'+p.tags.map(function(t){return '<span class="car-tag">'+t+'</span>';}).join('')+'</div>'+
        '<div class="car-actions">'+
          '<a class="btn btn-primary" href="quote.html?prod='+p.key+'">Angebot anfordern →</a>'+
          '<a class="btn btn-ghost" href="products.html">Spezifikationen ansehen</a>'+
        '</div>'+
      '</div>';
    track.appendChild(slide); slides.push(slide);
    var d=document.createElement('button'); d.setAttribute('aria-label',p.name); if(i===0) d.className='on';
    d.addEventListener('click',function(){ go(i); reset(); }); dotwrap.appendChild(d); dots.push(d);
  });
  var cur=0,timer;
  function render(){
    track.style.transform='translateX(-'+(cur*100)+'%)';
    dots.forEach(function(d,i){ d.classList.toggle('on',i===cur); });
  }
  function go(n){ cur=(n+slides.length)%slides.length; render(); }
  function next(){ go(cur+1); }
  function prev(){ go(cur-1); }
  function reset(){ clearInterval(timer); if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer=setInterval(next,4000); }
  document.getElementById('carNext').addEventListener('click',function(){ next(); reset(); });
  document.getElementById('carPrev').addEventListener('click',function(){ prev(); reset(); });
  var box=document.getElementById('prodCarousel');
  box.addEventListener('mouseenter',function(){ clearInterval(timer); });
  box.addEventListener('mouseleave',reset);
  render(); reset();
})();
