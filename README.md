# Minecraft Server Portal Template

A universal, customizable web portal template for Minecraft (or other games) servers.  
Built with pure **HTML, CSS, and JavaScript** — no backend required.

## ✨ Features
- Visual config editor (`admin.html`) → exports `config.json`
- 2×2 grid layout (Rules, FAQ, News & Events, Staff)
- Customizable background (image/video), fonts, brightness
- Minecraft‑green checker background on Staff cards
- Works on GitHub Pages (static hosting)

## 🚀 Quick start
1. Open `admin.html`, configure content and theme.
2. Click **Apply (Preview)** to test.
3. Click **Export config.json** and place it next to `index.html`.
4. Deploy to your static host (e.g. GitHub Pages).

## 📜 License
MIT License © 2025 Tomas

_This project is not affiliated with Mojang or Microsoft. Minecraft™ is a trademark of Mojang AB._


## Live demo
- GitHub Pages: https://tomashaki.github.io/minecraft-server-portal-template/

## Quick start (GitHub Pages)
1. Upload all files to a public repo.
2. Enable **Settings → Pages → Deploy from branch → `main` / root**.
3. Edit `config.json` with your server name, IP, Discord and website links.
4. (Optional) Replace `assets/bg-pixabay-1106261.png` with your own background.
5. Done — the site will be live in a minute or two.

## Notes
- Docker / proxy files are **not** needed for GitHub Pages. This cleaned package removes them to keep things simple.
- Staff name chips (4th tile) are styled with the same green as the **Copy IP** button, as requested.

## Clean deploy on GitHub Pages (step‑by‑step)

1. **Create a new public repository** on GitHub (e.g. `minecraft-server-portal-template`). Leave it empty (no auto README).
2. **Upload the files** from this package directly to the repository root:
   - `index.html`, `styles.css`, `app.js`
   - `assets/` folder (with images)
   - `config.json` (or copy `config.example.json` and rename to `config.json`)
   - `README.md`, `LICENSE` (optional for you to keep)
3. Commit the upload.

4. **Enable GitHub Pages**:  
   Go to **Settings → Pages** → *Build and deployment* → **Source: Deploy from a branch**.  
   Choose **Branch: `main`** and **Folder: `/ (root)`**, then click **Save**.

5. **Wait 1–2 minutes.** A green banner should appear with the live URL. Open it.

6. **Configure your server details** in `config.json`:
   - `branding.titleFull` / `branding.titleShort`
   - `server.address` (e.g. `mc.example.com:25565`)
   - `links.discord`
   - (Optional) Replace `assets/bg-pixabay-1106261.png` with your own background.

7. **Force refresh** (Ctrl/Cmd+Shift+R) to see the changes.

> Notes:
> - Docker and `proxy/` are **not** needed for GitHub Pages (they were removed in this cleaned build).
> - If you don’t see updates, check that your changes are on the **main** branch and clear browser cache.
