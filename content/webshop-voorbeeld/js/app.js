(function(){
'use strict';
var P=window.VB_P||[],BY={};P.forEach(function(p){BY[p.slug]=p});
var GR={bonen:'Bonen',filter:'Gemalen voor filter',espresso:'Gemalen voor espresso'};
var SHIP={home:{name:'Thuislevering',price:595},point:{name:'Afhaalpunt',price:450}};
var FREE=4000;
function fmt(c){var s=(Math.abs(c)/100).toFixed(2).split('.');s[0]=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,'.');return (c<0?'-':'')+'\u20ac'+s[0]+','+s[1]}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function get(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function put(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function cart(){return get('vb-cart',[]).filter(function(l){return BY[l.slug]&&l.qty>0})}
function save(c){put('vb-cart',c);ui()}
function add(slug,grind,qty){var c=cart(),id=slug+'|'+(grind||''),f=null;c.forEach(function(l){if(l.id===id)f=l});
 if(f)f.qty=Math.min(99,f.qty+qty);else c.push({id:id,slug:slug,grind:grind||'',qty:qty});save(c)}
function setQty(id,q){var c=cart();c.forEach(function(l){if(l.id===id)l.qty=Math.max(1,Math.min(99,q))});save(c)}
function rm(id){save(cart().filter(function(l){return l.id!==id}))}
function count(c){return c.reduce(function(a,l){return a+l.qty},0)}
function totals(c,method){
 var t={sub:0,rates:{},ship:0,vat:0,total:0,free:false};
 c.forEach(function(l){var p=BY[l.slug],g=p.price*l.qty;t.sub+=g;t.rates[p.vat]=(t.rates[p.vat]||0)+g});
 var m=SHIP[method||'home'];t.free=t.sub>=FREE;t.ship=c.length&&!t.free?m.price:0;
 t.total=t.sub+t.ship;t.split={};var keys=Object.keys(t.rates),rest=t.ship;
 keys.forEach(function(r,i){var s=i===keys.length-1?rest:Math.round(t.ship*t.rates[r]/t.sub);rest-=s;
  var gross=t.rates[r]+s,vat=Math.round(gross*r/(100+Number(r)));t.split[r]={gross:gross,vat:vat,ship:s};t.vat+=vat});
 t.net=t.total-t.vat;return t}
function vatRows(t){return Object.keys(t.split).sort(function(x,y){return x-y}).map(function(r){return '<dt class="vat">Waarvan btw '+r+'%</dt><dd class="vat">'+fmt(t.split[r].vat)+'</dd>'}).join('')}
/* header, sticky cart */
function ui(){var c=cart(),n=count(c),t=totals(c);
 document.querySelectorAll('[data-count]').forEach(function(e){e.textContent=n});
 var sc=document.querySelector('.scart');if(sc){var show=n>0&&!document.body.hasAttribute('data-nosc');sc.hidden=!show;document.body.classList.toggle('has-scart',show);
  sc.querySelector('[data-sc-n]').textContent=n===1?'1 artikel':n+' artikels';sc.querySelector('[data-sc-t]').textContent=fmt(t.sub)}}
/* menu */
var menu=document.getElementById('menu'),mb=document.querySelector('.mbtn'),last=null;
function openM(){last=document.activeElement;menu.hidden=false;document.documentElement.style.overflow='hidden';mb.setAttribute('aria-expanded','true');menu.querySelector('.mclose').focus()}
function closeM(){menu.hidden=true;document.documentElement.style.overflow='';mb.setAttribute('aria-expanded','false');if(last)last.focus()}
if(menu&&mb){mb.addEventListener('click',openM);menu.querySelector('.mclose').addEventListener('click',closeM);
 menu.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){menu.hidden=true;document.documentElement.style.overflow=''})});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden)closeM();
  if(e.key==='Tab'&&!menu.hidden){var f=menu.querySelectorAll('a,button'),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}})}
/* qty widget */
function qtyW(root,cb){var i=root.querySelector('input');
 root.querySelector('[data-dec]').addEventListener('click',function(){i.value=Math.max(1,(parseInt(i.value,10)||1)-1);cb&&cb(+i.value)});
 root.querySelector('[data-inc]').addEventListener('click',function(){i.value=Math.min(99,(parseInt(i.value,10)||1)+1);cb&&cb(+i.value)});
 i.addEventListener('change',function(){var v=parseInt(i.value,10);if(!(v>=1))v=1;if(v>99)v=99;i.value=v;cb&&cb(v)})}
var page=document.body.getAttribute('data-page');
/* shop filter */
if(page==='shop'){var grid=document.getElementById('grid'),cards=[].slice.call(grid.children),chips=document.querySelectorAll('.chip'),sel=document.getElementById('sort'),cnt=document.getElementById('count');
 var q=new URLSearchParams(location.search),cat=q.get('cat')||'alles';if(!/^(alles|koffie|accessoires|cadeau)$/.test(cat))cat='alles';
 function apply(){var shown=0;chips.forEach(function(c){c.setAttribute('aria-pressed',String(c.dataset.cat===cat))});
  var s=sel.value,arr=cards.slice().sort(function(a,b){if(s==='laag')return a.dataset.price-b.dataset.price;if(s==='hoog')return b.dataset.price-a.dataset.price;return a.dataset.pop-b.dataset.pop});
  arr.forEach(function(c){var ok=cat==='alles'||c.dataset.cat===cat;c.hidden=!ok;if(ok)shown++;grid.appendChild(c)});
  cnt.textContent=shown===1?'1 product':shown+' producten';
  var u=new URL(location.href);if(cat==='alles')u.searchParams.delete('cat');else u.searchParams.set('cat',cat);history.replaceState(null,'',u)}
 chips.forEach(function(c){c.addEventListener('click',function(){cat=c.dataset.cat;apply()})});sel.addEventListener('change',apply);apply()}
/* product */
if(page==='product'){var f=document.getElementById('buyf'),ok=document.getElementById('added');qtyW(f.querySelector('.qty'));
 f.addEventListener('submit',function(e){e.preventDefault();var g=f.querySelector('select'),qq=parseInt(f.querySelector('.qty input').value,10)||1;
  add(f.dataset.slug,g?g.value:'',qq);var p=BY[f.dataset.slug];
  ok.innerHTML=esc(qq+' x '+p.name)+' staat in uw winkelmand. <a href="/webshop-voorbeeld/winkelmand/">Bekijk winkelmand</a>';ok.hidden=false})}
/* cart */
function lineHTML(l,editable){var p=BY[l.slug];return '<li class="line" data-id="'+esc(l.id)+'"><img src="/webshop-voorbeeld/img/'+p.slug+'-700.webp" alt="" width="96" height="120" loading="lazy">'+
 '<div><h3><a href="/webshop-voorbeeld/product/'+p.slug+'/">'+esc(p.name)+'</a></h3><p class="meta">'+esc(p.size)+(l.grind?', '+GR[l.grind].toLowerCase():'')+'. '+fmt(p.price)+' per stuk</p>'+
 (editable?'<div class="ctl"><div class="qty"><button type="button" data-dec aria-label="Eén minder">\u2212</button><input type="number" inputmode="numeric" min="1" max="99" value="'+l.qty+'" aria-label="Aantal '+esc(p.name)+'"><button type="button" data-inc aria-label="Eén meer">+</button></div><button type="button" class="rm">Verwijderen</button></div>':'<p class="meta">Aantal: '+l.qty+'</p>')+
 '</div><div class="lt">'+fmt(p.price*l.qty)+'</div></li>'}
function freeHTML(t){if(t.free)return '<p class="free">U krijgt gratis verzending.<span class="bar"><i style="width:100%"></i></span></p>';
 return '<p class="free">Nog '+fmt(FREE-t.sub)+' tot gratis verzending.<span class="bar"><i style="width:'+Math.round(t.sub/FREE*100)+'%"></i></span></p>'}
function sumHTML(t,method,btn){return '<h2>Overzicht</h2>'+freeHTML(t)+'<dl><dt>Subtotaal</dt><dd>'+fmt(t.sub)+'</dd><dt>Verzending ('+SHIP[method].name.toLowerCase()+')</dt><dd>'+(t.ship?fmt(t.ship):'Gratis')+'</dd>'+
 '<dt class="tot">Totaal incl. btw</dt><dd class="tot">'+fmt(t.total)+'</dd>'+vatRows(t)+'<dt class="vat">Totaal excl. btw</dt><dd class="vat">'+fmt(t.net)+'</dd></dl>'+(btn||'')}
if(page==='cart'){var box=document.getElementById('cartbox');
 function render(){var c=cart();if(!c.length){box.innerHTML='<div class="empty"><p>Uw winkelmand is leeg.</p><a class="btn" href="/webshop-voorbeeld/winkel/">Naar de winkel</a></div>';return}
  var t=totals(c,'home');box.innerHTML='<div class="cartg"><ul class="lines">'+c.map(function(l){return lineHTML(l,true)}).join('')+'</ul><aside class="sum" aria-label="Overzicht">'+sumHTML(t,'home','<a class="btn full" href="/webshop-voorbeeld/afrekenen/">Afrekenen</a><p class="note">Verzendkosten zijn berekend voor thuislevering. Bij het afrekenen kunt u ook een afhaalpunt kiezen.</p>')+'</aside></div>';
  box.querySelectorAll('.line').forEach(function(li){var id=li.dataset.id;qtyW(li.querySelector('.qty'),function(v){setQty(id,v);render();var n=box.querySelector('.line[data-id="'+id.replace(/"/g,'')+'"] input');if(n)n.focus()});
   li.querySelector('.rm').addEventListener('click',function(){rm(id);render();var h=document.querySelector('h1');h.setAttribute('tabindex','-1');h.focus()})})}
 render()}
/* checkout */
var RULES={naam:[/\S+\s+\S+/,'Vul uw voor- en achternaam in.'],email:[/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,'Vul een geldig e-mailadres in, bijvoorbeeld naam@voorbeeld.be.'],
 tel:[/^$|^[+0-9][0-9 ()\/.\-]{7,}$/,'Vul een geldig telefoonnummer in, of laat het veld leeg.'],straat:[/\S+.*\d/,'Vul straat en huisnummer in.'],
 postcode:[/^[1-9]\d{3}$/,'Vul een Belgische postcode van 4 cijfers in.'],gemeente:[/\S{2,}/,'Vul uw gemeente in.']};
if(page==='checkout'){var c=cart(),cf=document.getElementById('cof'),side=document.getElementById('cosum');
 if(!c.length){document.getElementById('cobox').innerHTML='<div class="empty"><p>Uw winkelmand is leeg. Voeg eerst iets toe.</p><a class="btn" href="/webshop-voorbeeld/winkel/">Naar de winkel</a></div>'}
 else{var pend=get('vb-pending',null),qs=new URLSearchParams(location.search),al=document.getElementById('coalert');
  if(pend&&pend.customer){Object.keys(pend.customer).forEach(function(k){var el=cf.elements[k];if(el)el.value=pend.customer[k]});
   if(pend.method)cf.querySelector('input[name=lever][value='+pend.method+']').checked=true;if(pend.pay)cf.querySelector('input[name=betaal][value='+pend.pay+']').checked=true}
  if(qs.get('betaling')){al.textContent=qs.get('betaling')==='mislukt'?'De testbetaling is mislukt. Er is niets afgeschreven. U kunt het opnieuw proberen.':'U hebt de testbetaling geannuleerd. Uw winkelmand is bewaard.';al.hidden=false}
  function meth(){return cf.querySelector('input[name=lever]:checked').value}
  function rs(){var t=totals(c,meth());side.innerHTML='<ul class="mini">'+c.map(function(l){var p=BY[l.slug];return '<li><span>'+l.qty+' x '+esc(p.name)+(l.grind?' ('+GR[l.grind].toLowerCase()+')':'')+'</span><span>'+fmt(p.price*l.qty)+'</span></li>'}).join('')+'</ul>'+sumHTML(t,meth());
   cf.querySelectorAll('[data-sp]').forEach(function(e){e.textContent=t.free?'Gratis':fmt(SHIP[e.dataset.sp].price)})}
  cf.querySelectorAll('input[name=lever]').forEach(function(r){r.addEventListener('change',rs)});rs();
  function check(el){var r=RULES[el.name],e=document.getElementById('e-'+el.name);if(!r)return true;var v=el.value.trim(),ok=r[0].test(v);
   if(!v&&el.name!=='tel')ok=false;el.setAttribute('aria-invalid',String(!ok));e.textContent=ok?'':r[1];return ok}
  Object.keys(RULES).forEach(function(k){var el=cf.elements[k];el.addEventListener('blur',function(){if(el.value||el.getAttribute('aria-invalid'))check(el)});el.addEventListener('input',function(){if(el.getAttribute('aria-invalid')==='true')check(el)})});
  var ak=cf.elements.akkoord;ak.addEventListener('change',function(){if(ak.checked)document.getElementById('e-akkoord').textContent=''});
  cf.addEventListener('submit',function(e){e.preventDefault();var bad=[];Object.keys(RULES).forEach(function(k){if(!check(cf.elements[k]))bad.push(cf.elements[k])});
   if(!ak.checked){document.getElementById('e-akkoord').textContent='Ga akkoord met de voorwaarden om verder te gaan.';bad.push(ak)}
   if(bad.length){al.textContent=bad.length===1?'Er is 1 veld dat u nog moet aanvullen.':'Er zijn '+bad.length+' velden die u nog moet aanvullen.';al.hidden=false;bad[0].focus();return}
   var cu={};['naam','email','tel','straat','postcode','gemeente'].forEach(function(k){cu[k]=cf.elements[k].value.trim()});
   put('vb-pending',{customer:cu,method:meth(),pay:cf.querySelector('input[name=betaal]:checked').value});location.href='/webshop-voorbeeld/betalen/'})}}
/* simulated payment */
var PAYN={bancontact:'Bancontact',kaart:'Kaart (Visa of Mastercard)',payconiq:'Payconiq by Bancontact'};
if(page==='pay'){var pd=get('vb-pending',null),c2=cart(),pb=document.getElementById('paybox');
 if(!pd||!c2.length){pb.innerHTML='<div class="bd"><p>Er staat geen bestelling klaar om te betalen.</p><a class="btn" href="/webshop-voorbeeld/winkel/">Naar de winkel</a></div>'}
 else{var t2=totals(c2,pd.method);document.getElementById('pamt').textContent=fmt(t2.total);document.getElementById('pmeth').textContent=PAYN[pd.pay];
  document.getElementById('pok').addEventListener('click',function(){var d=new Date(),nr='VB-'+String(d.getFullYear()).slice(2)+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2)+'-'+Math.floor(1000+Math.random()*9000);
   put('vb-last',{nr:nr,date:d.toISOString(),lines:c2,t:t2,customer:pd.customer,method:pd.method,pay:pd.pay});localStorage.removeItem('vb-cart');localStorage.removeItem('vb-pending');location.href='/webshop-voorbeeld/bestelling/'});
  document.getElementById('pno').addEventListener('click',function(){location.href='/webshop-voorbeeld/afrekenen/?betaling=mislukt'});
  document.getElementById('pcancel').addEventListener('click',function(){location.href='/webshop-voorbeeld/afrekenen/?betaling=geannuleerd'})}}
/* confirmation */
if(page==='done'){var o=get('vb-last',null),db=document.getElementById('donebox');
 if(!o){db.innerHTML='<h1>Geen bestelling gevonden</h1><p>Er is in deze browser nog geen demo-bestelling afgerond.</p><a class="btn" href="/webshop-voorbeeld/winkel/">Naar de winkel</a>'}
 else{var cu2=o.customer,dt=new Date(o.date);
  db.innerHTML='<span class="badge">Testbestelling geslaagd</span><h1>Bedankt voor uw bestelling</h1><p class="lead">Bestelnummer <b>'+esc(o.nr)+'</b>, geplaatst op '+dt.toLocaleDateString('nl-BE',{day:'numeric',month:'long',year:'numeric'})+'. In een echte webshop krijgt u nu een bevestiging per e-mail op '+esc(cu2.email)+'. In deze demo wordt niets verstuurd en niets geleverd.</p>'+
  '<div class="box"><h2>Uw bestelling</h2><ul class="lines">'+o.lines.filter(function(l){return BY[l.slug]}).map(function(l){return lineHTML(l,false)}).join('')+'</ul><div class="sum" style="position:static;border:0;padding:16px 0 0">'+sumHTML(o.t,o.method).replace('<h2>Overzicht</h2>','').replace(/<p class="free">[\s\S]*?<\/p>/,'')+'</div></div>'+
  '<div class="box"><h2>Levering en betaling</h2><p>'+esc(cu2.naam)+'<br>'+esc(cu2.straat)+'<br>'+esc(cu2.postcode)+' '+esc(cu2.gemeente)+'<br>België</p><p>'+SHIP[o.method].name+(o.method==='point'?' (u kiest het afhaalpunt in de verzendmail)':'')+'. Levering binnen 1 tot 3 werkdagen.<br>Betaald met '+PAYN[o.pay]+' (testbetaling).</p></div>'+
  '<p style="margin-top:28px"><a class="btn" href="/webshop-voorbeeld/winkel/">Verder winkelen</a></p>'}}
ui();window.addEventListener('storage',ui);
})();
