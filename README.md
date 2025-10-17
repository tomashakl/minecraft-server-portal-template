# Minecraft Server Portal Template

> ⚠️ **Work-in-Progress:** This template has **not been tested against a live Minecraft server yet** (no MC hosting available on my side). It is a **fully static** website; the status line is optional and can be wired later via `server.statusUrl` if you add your own backend/proxy.

🎮 **Live demo:** <a href="https://tomashakl.github.io/minecraft-server-portal-template/" target="_blank" rel="noopener">Try the demo here</a>

---

## What it does
- **Single‑page landing site** for your Minecraft server (title, slogan, IP, Discord).
- **“Copy IP”** button + **Join Discord** link.
- **Hero gallery** with screenshots: **autoplay** (configurable interval), **‹/› controls**, smooth **fade** transition.
- **Content sections from JSON**: Rules, FAQ, News & Events, Staff — all loaded from `config.json` (no backend needed).
- **Green name badges** in **Staff** (styled to match the “Copy IP” button).
- **Adjustable background dim** and **brightness** for better readability.
- **Sticky header & footer** — both semi‑transparent (same look), footer sticks to the bottom.
- Minecraft‑style webfont for the heading + readable system font for body text.
- Ready for **GitHub Pages** (pure static deployment).

---

## How `admin.html` works
`admin.html` is a simple **Config Editor** used to fill out and export `config.json`. You can open it **locally** in your browser (double‑click).

### Controls
- **Apply (Preview)** — saves the current form to `localStorage` and enables **instant preview** (open `index.html` afterwards).  
- **Export config.json** — downloads the generated `config.json` (place it next to `index.html`).  
- **Import** — loads an existing `config.json` into the form.  
- **Clear Preview** — clears the preview config from `localStorage`.

### Form sections
**Branding**
- `Title Short` — short title (used in header & footer).  
- `Title Full` — big hero title (“Welcome to …” / “Blocky Realm — Cozy Survival”).  
- `Slogan` — subtitle line (e.g., “Cozy survival • Low‑latency • Fair play”).

**Theme**
- `Background image` — path to background image (e.g., `assets/bg.png`).  
- `Video URL (optional)` — background video (optional).  
- `Background brightness (0–1)` — image brightness (1 = original, 0.5 = half).  
- `Background dim (0–1)` — black overlay for readability (0 = none, 1 = fully black).  
- `Fonts` — heading & base fonts.

**Server**
- `Address` — host:port (shown on the page and in the status line).  
- `Status Endpoint` — REST endpoint for your own backend (optional). Leave blank if you don’t have one.

**Links**
- `Discord` — invite URL.  
- `Website` — your website (optional).

**Gallery**
- `Images (one per line)` — list of screenshots (each on a new line).  
- `Autoplay interval (sec)` — switch interval (min 2 s).  
- `Enable autoplay` — toggles automatic rotation.  
- `Show ‹/› controls` — toggles manual controls.

**Sections (data)**
- **Rules** — each line = one rule.  
- **FAQ** — array of objects: `[{ "q": "...", "a": "..." }, …]`.  
- **News** — array of objects: `[{ "date": "YYYY‑MM‑DD", "title": "...", "body": "..." }, …]`.  
- **Staff** — array of objects: `[{ "name": "...", "role": "...", "bio": "..." }, …]`.

> Tip: Use **Apply (Preview)** for instant local testing via `localStorage`. When it looks right, click **Export** and upload the generated `config.json` next to `index.html` in your repository.

---

## Notes
- For **GitHub Pages** you don’t need Docker or a backend — just upload the files (`index.html`, `styles.css`, `app.js`, `assets/`, `config.json`).  
- `server.statusUrl` is **optional** and only needed if you later add your own status proxy/API.  
- If you don’t see updates right away, force‑refresh with **Ctrl/Cmd + Shift + R** to bypass cache.

## Credits
Created and maintained by **tomashakl**.  
Background image: Pixabay (free license).
