async function loadConfig(){
  const override = localStorage.getItem('cfgOverride');
  if (override){ try { return JSON.parse(override); } catch {} }
  const files = ["config.json","config.example.json"];
  for (const f of files){
    try{ const r = await fetch(f,{cache:"no-store"}); if(r.ok) return await r.json(); }catch{}
  }
  return {};
}
function setText(id, val, fallback=''){ const el = document.getElementById(id); if(el) el.textContent = val || fallback; }
function applyTheme(theme){
  const t = theme || {};
  if (t.background && t.background.image){ document.documentElement.style.setProperty('--bg-image', `url('${t.background.image}')`); }
  if (t.background && typeof t.background.brightness === 'number'){ document.documentElement.style.setProperty('--bg-brightness', String(t.background.brightness)); }
  if (typeof t.background.dim === 'number') { try { document.documentElement.style.setProperty('--bg-dim', String(t.background.dim)); } catch(e){} }
  const vid = document.getElementById('bgVideo');
  if (t.background && t.background.video){ vid.src = t.background.video; vid.classList.remove('hidden'); document.body.classList.add('with-video'); }
  if (t.fonts){ if (t.fonts.heading){ document.documentElement.style.setProperty('--font-heading', t.fonts.heading); } if (t.fonts.base){ document.documentElement.style.setProperty('--font-base', t.fonts.base); } }
}
function renderRules(rules){ const ol = document.getElementById('rulesList'); ol.innerHTML=''; (rules||[]).forEach(r=>{ const li=document.createElement('li'); li.textContent=r; ol.appendChild(li); }); }
function renderFAQ(items){ const host=document.getElementById('faqList'); host.innerHTML=''; (items||[]).forEach(({q,a})=>{ const row=document.createElement('div'); row.className='qa'; row.innerHTML=`<div class="q">${q||''}</div><div class="a">${a||''}</div>`; host.appendChild(row); }); }
function renderNews(items){ const host=document.getElementById('newsList'); host.innerHTML=''; (items||[]).forEach(n=>{ const div=document.createElement('div'); div.style.padding='8px 0'; div.innerHTML=`<div style="font-weight:800">${n.title||''}</div><div style="opacity:.8">${n.date||''}</div><div>${n.body||''}</div>`; host.appendChild(div); }); }
function renderStaff(items){ const host=document.getElementById('staffList'); host.innerHTML=''; (items||[]).forEach(s=>{ const card=document.createElement('div'); card.className='staff-card'; card.innerHTML=`<div class="nick">${s.name||''}</div><div class="role">${s.role||''}</div><div class="bio">${s.bio||''}</div>`; host.appendChild(card); }); }
async function main(){
  const cfg = await loadConfig();
  applyTheme(cfg.theme);
  setText('titleFull', cfg.branding?.titleFull, 'Welcome'); setText('slogan', cfg.branding?.slogan, ''); setText('footerBrand', (cfg.branding?.titleShort||'Blocky Realm')+' ©');
  const copyBtn=document.getElementById('copyIpBtn'); copyBtn.onclick=()=>navigator.clipboard.writeText(cfg.server?.address||'server.example.com:25565');
  const d1=document.getElementById('discordBtn'); const d2=document.getElementById('discordLink'); [d1,d2].forEach(a=>{ if(a) a.href=cfg.links?.discord||'#'; });
  const w1=document.getElementById('websiteLink'); if(w1) w1.href=cfg.links?.website||'#';
  setText('statusText', `${cfg.server?.address||'server.example.com:25565'} Checking status...`);
  const shot1=document.getElementById('shot1');
  const legendEl=document.getElementById('shotLegend');
  const btnPrev=document.getElementById('galPrev');
  const btnNext=document.getElementById('galNext');
  const gallery = Array.isArray(cfg.gallery) && cfg.gallery.length ? cfg.gallery : ['assets/placeholder-1.jpg'];
  let gi = 0, timer=null;
  function show(i){
    gi = (i + gallery.length) % gallery.length;
    if (shot1){
      shot1.style.opacity = 0;
      const img = new Image();
      img.onload = ()=>{ shot1.src = img.src; shot1.style.opacity = 1; };
      img.src = gallery[gi];
    }
    if (legendEl) legendEl.textContent = `Screenshot ${gi+1}/${gallery.length}`;
  }
  function start(){ const intervalSec = Number(cfg.galleryIntervalSec||5); if(gallery.length>1 && (cfg.galleryAutoplay??true)) timer = setInterval(()=> show(gi+1), Math.max(2, intervalSec)*1000); }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }
  if (btnPrev){ btnPrev.onclick = ()=>{ stop(); show(gi-1); start(); }; }
  if (btnNext){ btnNext.onclick = ()=>{ stop(); show(gi+1); start(); }; }
  if (!(cfg.galleryShowControls??true)){ if(btnPrev) btnPrev.classList.add('hidden'); if(btnNext) btnNext.classList.add('hidden'); }
  show(0);
  start();
renderRules(cfg.sections?.rules||[]); renderFAQ(cfg.sections?.faq||[]); renderNews(cfg.sections?.news||[]); renderStaff(cfg.sections?.staff||[]);
}
main();


// === Patched: robust theme application (background image/video + fonts) ===
function applyTheme(theme){
  const t = theme || {};
  // Background image
  if (t.background && t.background.image){
    try { document.documentElement.style.setProperty('--bg-image', `url('${t.background.image}')`); } catch(e){}
  }
  // Brightness
  if (t.background && typeof t.background.brightness === 'number'){
    try { document.documentElement.style.setProperty('--bg-brightness', String(t.background.brightness)); }
  if (typeof t.background.dim === 'number') { try { document.documentElement.style.setProperty('--bg-dim', String(t.background.dim)); } catch(e){} } catch(e){}
  }
  // Background video (only if non-empty string)
  const vid = document.getElementById('bgVideo');
  const videoSrc = (t.background && typeof t.background.video === 'string') ? t.background.video.trim() : '';
  if (vid){
    if (videoSrc){
      vid.src = videoSrc;
      vid.classList.remove('hidden');
      document.body.classList.add('with-video');
    }else{
      // Ensure we don't disable background image if no video
      vid.removeAttribute('src');
      vid.classList.add('hidden');
      document.body.classList.remove('with-video');
    }
  }
  // Fonts
  if (t.fonts){
    if (t.fonts.heading){ try { document.documentElement.style.setProperty('--font-heading', t.fonts.heading); } catch(e){} }
    if (t.fonts.base){ try { document.documentElement.style.setProperty('--font-base', t.fonts.base); } catch(e){} }
  }
}
