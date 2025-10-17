# Minecraft Server Portal Template

> ⚠️ **Pracovní verze (WIP):** Tato šablona zatím **nebyla testována proti reálnému Minecraft serveru** (nemám k dispozici MC hosting). Stránka funguje jako **statický web**; část „status“ je volitelná a lze ji napojit až později přes `server.statusUrl`.

🎮 **Živé demo k vyzkoušení:** [Demo zde](https://tomashaki.github.io/minecraft-server-portal-template/)

---

## Co to umí
- **Jednostránkový (one‑page) web** pro prezentaci Minecraft serveru (název, slogan, IP, Discord).
- **Tlačítko „Copy IP“** + odkaz na **Discord**.
- **Hero galerie** se screenshoty: **autoplay** (nastavitelný interval), **‹/› ovládací tlačítka**, plynulý **fade** přechod.
- **Sekce z dat**: Rules, FAQ, News & Events, Staff – načítají se z `config.json` (bez potřeby backendu).
- **Zelené štítky** u jmen ve **Staff** (vizuálně sladěné s tlačítkem „Copy IP“).
- **Nastavitelná tmavost pozadí** (globální dim) a **jas pozadí** (brightness).
- **Sticky header & footer** – horní i spodní lišta jsou poloprůsvitné (stejný styl) a footer drží u spodního okraje.
- **Webfonty** ve stylu Minecraft (nadpis) + systémové písmo pro text.
- Připraveno pro **GitHub Pages** (čistě statický deploy).

---

## Jak funguje `admin.html`
Soubor `admin.html` je jednoduchý **Config Editor** pro vyplnění a export `config.json`. Lze ho otevřít **lokálně v prohlížeči** (dvojklik).

### Ovládací prvky
- **Apply (Preview)** – uloží aktuální nastavení do `localStorage` a umožní **okamžitý náhled** (otevři pak `index.html`).  
- **Export config.json** – stáhne hotový `config.json` (nahraj ho vedle `index.html`).  
- **Import** – načte existující `config.json` a předvyplní formulář.  
- **Clear Preview** – smaže dočasný náhled z `localStorage`.

### Co je v editoru
**Branding**
- `Title Short` – krátký název (zobrazuje se v headeru a footeru).  
- `Title Full` – velký nadpis v hero („Welcome to …“ / „Blocky Realm — Cozy Survival“).  
- `Slogan` – podnadpis (např. „Cozy survival • Low‑latency • Fair play“).

**Theme**
- `Background image` – cesta k obrázku pozadí (např. `assets/bg.png`).  
- `Video URL (optional)` – video na pozadí (volitelné).  
- `Background brightness (0–1)` – jas pozadí (1 = původní, 0.5 = poloviční).  
- `Background dim (0–1)` – **ztmavení** černou vrstvičkou (0 = žádné, 1 = úplně černé).  
- `Fonts` – nadpisové a základní písmo.

**Server**
- `Address` – IP/host:port (zobrazuje se na tlačítku i ve status řádku).  
- `Status Endpoint` – REST endpoint pro vlastní backend (volitelné). Pokud nemáš backend, vyplň nebo nech prázdné.

**Links**
- `Discord` – URL na pozvánku.  
- `Website` – vlastní web (volitelné).

**Gallery**
- `Images (one per line)` – seznam screenshotů (každý na nový řádek).  
- `Autoplay interval (sec)` – interval přepínání (minimum 2 s).  
- `Enable autoplay` – zapíná/vypíná automatické přepínání.  
- `Show ‹/› controls` – zobrazí/skrývá ruční ovladače.

**Sections (data)**
- **Rules** – každý řádek = jedna položka.  
- **FAQ** – pole objektů `[{ "q": "...", "a": "..." }, …]`.  
- **News** – pole objektů `[{ "date": "YYYY‑MM‑DD", "title": "...", "body": "..." }, …]`.  
- **Staff** – pole objektů `[{ "name": "...", "role": "...", "bio": "..." }, …]`.

> Tip: Klikni **Apply (Preview)**, otevři `index.html` a uvidíš změny hned (dokud je máš v `localStorage`). Jakmile je vše OK, dej **Export** a vygenerovaný `config.json` nahraj do produkce.

---

## Poznámky
- Pro **GitHub Pages** nepotřebuješ žádný backend ani Docker – stačí nahrát soubory (`index.html`, `styles.css`, `app.js`, `assets/`, `config.json`).  
- `server.statusUrl` je čistě **volitelný** (pro pozdější napojení na vlastní status proxy/API).  
- Pokud se ti demo po úpravách „neprobudí“, vynuceně obnov stránku **Ctrl/Cmd + Shift + R** (cache).

