/* ---- Hero slideshow: built from real product photos ---- */
(function(){
  var box=document.getElementById('heroSlides'), dotwrap=document.getElementById('heroDots');
  if(!box) return;
  var order=[
    ['sunflower-oil','SF-OIL','Aceite de Girasol'],
    ['cashew-nuts','CNUT','Anacardos'],
    ['garlic','GARL','Ajo'],
    ['sugar','SUG-45','Azúcar ICUMSA 45'],
    ['sesame','SESM','Semillas de Sésamo']
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
    {key:'sunflower-oil',code:'SF-OIL',name:'Aceite de Girasol',
     desc:'Grados refinado (RBD) y crudo, ligero y neutro. Envasado en flexitanques, bidones o botellas para minoristas.',
     tags:['Refinado / Crudo','Prensado en frío','Vida útil 12–18 meses']},
    {key:'cashew-nuts',code:'CNUT',name:'Anacardos',
     desc:'Anacardos crudos (RCN) para procesadores y anacardos blancos enteros graduados (W240 / W320). Clasificados y con humedad controlada.',
     tags:['RCN','W240 · W320','Rendimiento 48–54 lbs']},
    {key:'sugar',code:'SUG-45',name:'Azúcar ICUMSA 45',
     desc:'Azúcar de caña refinada blanca, brillante y de grano fino, para consumo directo y la industria alimentaria.',
     tags:['ICUMSA 45','Pol ≥ 99.8°','Sacos 50 kg / big bags']},
    {key:'sesame',code:'SESM',name:'Semillas de Sésamo',
     desc:'Sésamo blanco natural y mixto, limpiado a máquina y clasificado por sortex. Semilla pelada disponible a pedido.',
     tags:['Sortex 99.95%','Aceite 48–52%','Opción pelada']},
    {key:'garlic',code:'GARL',name:'Ajo',
     desc:'Bulbos de ajo frescos enteros, clasificados a mano por tamaño y enviados en empaque ventilado para protegerlos durante el tránsito.',
     tags:['Blanco nieve','4,5–6,5 cm','Reefer 8–12 °C']}
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
          '<a class="btn btn-primary" href="quote.html?prod='+p.key+'">Solicitar Cotización →</a>'+
          '<a class="btn btn-ghost" href="products.html">Ver especificaciones</a>'+
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
