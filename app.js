// Lightweight data-driven portal
async function loadConfig(){
  // Allow local preview override
  try{
    const raw = localStorage.getItem('cfgOverride');
    if(raw){ return JSON.parse(raw); }
  }catch(e){}
  const res = await fetch('config.json').catch(()=>null);
  if(!res || !res.ok){
    const fallback = await fetch('config.example.json');
    return fallback.json();
  }
  return res.json();
}

function setText(id, val, fallback=''){
  const el = document.getElementById(id);
  if(el) el.textContent = val ?? fallback;
}

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return [...document.querySelectorAll(sel)]; }

function gallerySetup(images){
  const imgEl = document.getElementById('galleryImg');
  const dots = document.getElementById('galleryDots');
  if(!images || !images.length){ return; }
  let idx = 0;
  images.forEach((_,i)=>{
    const b = document.createElement('button');
    b.addEventListener('click',()=>{ idx=i; render(); });
    dots.appendChild(b);
  });
  function render(){
    imgEl.src = images[idx];
    $all('#galleryDots button').forEach((b,i)=> b.classList.toggle('active', i===idx));
  }
  setInterval(()=>{ idx=(idx+1)%images.length; render(); }, 5000);
  render();
}

function renderRules(rules){
  const list = document.getElementById('rulesList');
  list.innerHTML = '';
  (rules||[]).forEach(r=>{
    const li = document.createElement('li');
    li.textContent = r;
    list.appendChild(li);
  });
}

function renderFAQ(faq){
  const host = document.getElementById('faqList');
  host.innerHTML='';
  (faq||[]).forEach(item=>{
    const div = document.createElement('div');
    div.className='item';
    div.innerHTML = `<div class="q">${item.q}</div><div class="a">${item.a}</div>`;
    host.appendChild(div);
  });
}

function renderStaff(staff){
  const grid = document.getElementById('staffGrid');
  grid.innerHTML='';
  (staff||[]).forEach(s=>{
    const card = document.createElement('div');
    card.className='staff-card';
    card.innerHTML = `<div class="nick">${s.nick}</div><div class="role">${s.role}</div><div class="bio">${s.bio||''}</div>`;
    grid.appendChild(card);
  });
}

function renderNews(items){
  const host = document.getElementById('newsList');
  if(!host) return;
  host.innerHTML = '';
  (items||[]).forEach(n=>{
    const div = document.createElement('div');
    div.className = 'news-item';
    const date = n.date ? `<div class="meta">${n.date}</div>` : '';
    const link = n.link ? ` — <a href="${n.link}" target="_blank" rel="noopener">more</a>` : '';
    div.innerHTML = `<div class="title">${n.title||'Untitled'}</div>${date}<div class="body">${n.body||''}${link}</div>`;
    host.appendChild(div);
  });
}

async function fetchStatus(endpoint){
  // Expected response shape: { online: boolean, players: { online, max }, motd: string }
  try{
    const r = await fetch(endpoint, { cache: 'no-store' });
    if(!r.ok) throw new Error('Bad response');
    return r.json();
  }catch(e){
    return null;
  }
}

function setStatusUI(st){
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  if(!st){
    dot.classList.remove('online'); dot.classList.add('offline');
    text.textContent = 'Status unavailable';
    return;
  }
  if(st.online){
    dot.classList.remove('offline'); dot.classList.add('online');
    const cnt = st.players?.online ?? 0;
    const max = st.players?.max ?? '?';
    const motd = st.motd ? ` • ${st.motd}` : '';
    text.textContent = `Online — ${cnt}/${max}${motd}`;
  }else{
    dot.classList.remove('online'); dot.classList.add('offline');
    text.textContent = 'Offline';
  }
}

async function main(){
  const cfg = await loadConfig();

  document.title = cfg.branding?.titleShort || 'Minecraft Server Portal';
  setText('brandTitle', cfg.branding?.titleShort || 'Blocky Realm');
  setText('heroTitle', cfg.branding?.titleFull || 'Welcome to Blocky Realm');
  setText('heroSubtitle', cfg.branding?.slogan || 'Cozy survival • Low-latency • Fair play');
  setText('serverAddress', cfg.server?.address || 'server.example.com:25565');
  setText('siteTitle', cfg.branding?.titleShort || 'Minecraft Server Portal');
  document.getElementById('footerYear').textContent = new Date().getFullYear();
  setText('footerBrand', cfg.branding?.titleFull || 'Blocky Realm');

  applyTheme(cfg.theme);

  const copyBtn = document.getElementById('copyIpBtn');
  copyBtn.addEventListener('click', async ()=>{
    const ip = cfg.server?.address || 'server.example.com:25565';
    try{ await navigator.clipboard.writeText(ip); copyBtn.textContent='Copied!'; setTimeout(()=>copyBtn.textContent='Copy IP',1500);}catch{}
  });

  const disc = document.getElementById('discordBtn');
  disc.href = cfg.social?.discord || '#';

  // Gallery
  gallerySetup(cfg.sections?.gallery?.images || ['assets/placeholder-1.jpg']);

  // Rules / FAQ / Staff / News
  renderRules(cfg.sections?.rules || []);
  renderFAQ(cfg.sections?.faq || []);
  renderStaff(cfg.sections?.staff || []);
  renderExtra(cfg.sections?.extra?.bullets || []);
  renderNews(cfg.sections?.news || []);

  // Map
  if(cfg.sections?.map?.url){
    document.getElementById('mapLink').classList.remove('hidden');
    document.getElementById('map').classList.remove('hidden');
    const mapIframe = document.getElementById('mapIframe');
    mapIframe.src = cfg.sections.map.url;
    document.getElementById('mapLink').href = '#map';
    let visible = true;
    document.getElementById('mapToggleBtn').addEventListener('click', ()=>{
      visible = !visible;
      mapIframe.style.display = visible ? 'block' : 'none';
    });
  }

  // Status
  if(cfg.server?.statusEndpoint){
    const st = await fetchStatus(cfg.server.statusEndpoint);
    setStatusUI(st);
  }else{
    setStatusUI(null);
  }

  // Social
  if(cfg.social?.discord) document.getElementById('socialDiscord').href = cfg.social.discord;
  if(cfg.social?.website){
    const a = document.getElementById('socialWebsite');
    a.href = cfg.social.website;
    a.classList.remove('hidden');
  }
}

main();


function applyTheme(theme){
  const t = theme || {};
  // Background image
  if (t.background && t.background.image){
    const url = t.background.image;
    document.documentElement.style.setProperty('--bg-image', `url('${url}')`);
  }
  // Brightness (for video)
  if (t.background && typeof t.background.brightness === 'number'){
    document.documentElement.style.setProperty('--bg-brightness', String(t.background.brightness));
  }
  // Video
  const vid = document.getElementById('bgVideo');
  if (t.background && t.background.video){
    try{
      vid.src = t.background.video;
      vid.classList.remove('hidden');
      document.body.classList.add('with-video');
    }catch{}
  }
  // Fonts (pre-approved safe fonts)
  if (t.fonts){
    if (t.fonts.heading){
      document.documentElement.style.setProperty('--font-heading', t.fonts.heading);
    }
    if (t.fonts.base){
      document.documentElement.style.setProperty('--font-base', t.fonts.base);
    }
  }
}


function renderExtra(bullets){
  const host = document.getElementById('extraBullets');
  if(!host) return;
  host.innerHTML = '';
  (bullets||[]).forEach(t=>{
    const li = document.createElement('li');
    li.textContent = t;
    host.appendChild(li);
  });
}
