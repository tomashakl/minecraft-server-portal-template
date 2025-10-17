// Clean, robust application script

async function loadConfig(){
  // Local preview override takes precedence
  try {
    const override = localStorage.getItem('cfgOverride');
    if (override) return JSON.parse(override);
  } catch {}
  // Try real config, then example fallback
  const files = ["config.json","config.example.json"];
  for (const f of files){
    try{
      const r = await fetch(f, {cache:"no-store"});
      if (r.ok) return await r.json();
    }catch{}
  }
  return {};
}

// small helpers
const $ = (id)=> document.getElementById(id);
function setText(id, val, fallback=''){ const el = $(id); if (el) el.textContent = (val ?? fallback) || ''; }

// THEME
function applyTheme(theme){
  const t = theme || {};
  // Background image
  if (t.background && t.background.image){
    try { document.documentElement.style.setProperty('--bg-image', `url('${t.background.image}')`); } catch(e){}
  }
  // Brightness (if used in CSS)
  if (t.background && typeof t.background.brightness === 'number'){
    try { document.documentElement.style.setProperty('--bg-brightness', String(t.background.brightness)); } catch(e){}
  }
  // Dim overlay (we use --bg-dim in CSS)
  if (t.background && typeof t.background.dim === 'number'){
    try { document.documentElement.style.setProperty('--bg-dim', String(t.background.dim)); } catch(e){}
  }
  // Optional background video
  const vid = $('bgVideo');
  if (vid){
    const hasVideo = !!(t.background && t.background.video);
    if (hasVideo){
      vid.src = t.background.video;
      vid.classList.remove('hidden');
      document.body.classList.add('with-video');
    }else{
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

// RENDERERS
function renderRules(rules){
  const list = $('rulesList'); if (!list) return;
  list.innerHTML = '';
  (rules || []).forEach(r => { const li = document.createElement('li'); li.textContent = r; list.appendChild(li); });
}
function renderFAQ(items){
  const host = $('faqList'); if (!host) return;
  host.innerHTML = '';
  (items || []).forEach(x => {
    const q = x?.q || ''; const a = x?.a || '';
    const row = document.createElement('div');
    row.className = 'faq-row';
    row.innerHTML = `<div class="q">${q}</div><div class="a">${a}</div>`;
    host.appendChild(row);
  });
}
function renderNews(items){
  const host = $('newsList'); if (!host) return;
  host.innerHTML = '';
  (items || []).forEach(n => {
    const div = document.createElement('div');
    div.className = 'news-item';
    div.innerHTML = `<div class="date">${n.date || ''}</div><div class="title">${n.title || ''}</div><div>${n.body || ''}</div>`;
    host.appendChild(div);
  });
}
function renderStaff(items){
  const host = $('staffList'); if (!host) return;
  host.innerHTML = '';
  (items || []).forEach(s => {
    const card = document.createElement('div');
    card.className = 'staff-card';
    card.innerHTML = `<div class="nick">${s.name || ''}</div><div class="role">${s.role || ''}</div><div class="bio">${s.bio || ''}</div>`;
    host.appendChild(card);
  });
}

// HERO GALLERY
function initGallery(cfg){
  const imgEl = $('shot1');
  const legend = $('shotLegend');
  const btnPrev = $('galPrev');
  const btnNext = $('galNext');

  const gallery = Array.isArray(cfg.gallery) && cfg.gallery.length ? cfg.gallery : ['assets/placeholder-1.jpg'];
  let i = 0, timer = null;

  function show(idx){
    i = (idx + gallery.length) % gallery.length;
    if (imgEl){
      imgEl.style.opacity = 0;
      const next = new Image();
      next.onload = ()=>{ imgEl.src = next.src; imgEl.style.opacity = 1; };
      next.src = gallery[i];
    }
    if (legend) legend.textContent = `Screenshot ${i+1}/${gallery.length}`;
  }
  function start(){
    const intervalSec = Math.max(2, Number(cfg.galleryIntervalSec || 5));
    if (gallery.length > 1 && (cfg.galleryAutoplay ?? true)){
      stop();
      timer = setInterval(()=> show(i+1), intervalSec * 1000);
    }
  }
  function stop(){ if (timer){ clearInterval(timer); timer = null; } }

  if (btnPrev) btnPrev.onclick = ()=>{ stop(); show(i-1); start(); };
  if (btnNext) btnNext.onclick = ()=>{ stop(); show(i+1); start(); };
  if (!(cfg.galleryShowControls ?? true)){
    if (btnPrev) btnPrev.classList.add('hidden');
    if (btnNext) btnNext.classList.add('hidden');
  }

  show(0);
  start();
}

// MAIN
async function main(){
  const cfg = await loadConfig();
  applyTheme(cfg.theme);

  // Branding + footer
  setText('titleFull', cfg.branding?.titleFull, 'Welcome to Blocky Realm');
  setText('slogan', cfg.branding?.slogan, 'Cozy survival • Low-latency • Fair play');
  setText('footerBrand', (cfg.branding?.titleShort || 'Blocky Realm') + ' ©');

  // Buttons/links
  const copyBtn = $('copyIpBtn');
  if (copyBtn){
    copyBtn.onclick = async ()=>{
      try { await navigator.clipboard.writeText(cfg.server?.address || 'server.example.com:25565'); } catch {}
    };
  }
  const aDiscord = $('discordBtn');
  if (aDiscord) aDiscord.href = cfg.links?.discord || '#';

  // Status text (static placeholder unless you wire statusUrl)
  setText('statusText', `${cfg.server?.address || 'server.example.com:25565'} Status unavailable`);

  // Gallery + content sections
  initGallery(cfg);
  renderRules(cfg.sections?.rules || []);
  renderFAQ(cfg.sections?.faq || []);
  renderNews(cfg.sections?.news || []);
  renderStaff(cfg.sections?.staff || []);
}

main();
