var burger = document.getElementById('navBurger'), links = document.getElementById('navLinks');
if(burger){ burger.addEventListener('click', function(){ links.classList.toggle('open'); }); }
if(links){
  document.addEventListener('click', function(e){
    if(e.target.closest('.nav-links a')){ links.classList.remove('open'); }
  });
}

/* Prefill commodity select on the quote page via ?prod=sunflower-oil etc. */
(function(){
  var sel=document.querySelector('select[name="commodity"]');
  if(!sel) return;
  var params=new URLSearchParams(window.location.search);
  var prod=params.get('prod');
  if(prod){ sel.value=prod; }
})();

function makeRef(prefix){
  var d=new Date();
  var ymd=String(d.getFullYear()).slice(2)+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');
  var rand=Math.random().toString(36).slice(2,6).toUpperCase();
  return prefix+'-'+ymd+'-'+rand;
}
document.querySelectorAll('form[data-form]').forEach(function(form){
  var type=form.getAttribute('data-form'), msg=form.querySelector('.form-msg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var missing=[].slice.call(form.querySelectorAll('[required]')).filter(function(f){return !f.value.trim();});
    if(missing.length){ missing[0].focus(); msg.className='form-msg err'; msg.textContent=form.getAttribute('data-msg-required')||'Please fill in all required fields before sending.'; return; }
    var ref=makeRef(type==='quote'?'RFQ':'MSG');
    msg.className='form-msg ok';
    var okTemplate = type==='quote' ? (form.getAttribute('data-msg-quote-ok')||'Request received. Your reference code is <span class="ref-code">__REF__</span>. We\'ll reply with a quote and lead time within two business days.') : (form.getAttribute('data-msg-contact-ok')||'Message sent. Your reference code is <span class="ref-code">__REF__</span>. We\'ll be in touch shortly.');
    msg.innerHTML = okTemplate.replace('__REF__', ref);
    msg.scrollIntoView({behavior:'smooth',block:'center'});
    form.reset();
  });
});
