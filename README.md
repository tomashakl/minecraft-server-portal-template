# Minecraft Server Portal – V2 (Static + Optional Proxy)

A lightweight, **non-infringing**, stylized website template for a Minecraft server/community.

- Pure **HTML/CSS/JS** (static) — easy to host on GitHub Pages or any static hosting.
- **Admin Config Form** (`admin.html`) – edit values in a form, preview via `localStorage`, export/import `config.json`.
- **News & Events** section (JSON-driven).
- **Live Map** (Dynmap/BlueMap/etc.) with a **Toggle** button.
- **Status Proxy** (optional, Node.js) for CORS-safe server status at `/api/status`.

## Quick Start
1. Open `admin.html`, fill in values, click **Apply (Preview)**, then **Export config.json** and upload it next to `index.html`.
2. Put your screenshots into `/assets` and reference them in the form (Gallery).
3. (Optional) Run the proxy:
   ```bash
   cd proxy
   npm install
   UPSTREAM_STATUS_URL="https://your-upstream/status" node server.js
   # It will expose http://localhost:8080/api/status
   ```

### Docker Compose (optional)
```bash
# From project root
UPSTREAM_STATUS_URL="https://your-upstream/status" docker compose up --build
# Static site -> http://localhost:8088
# Proxy      -> http://localhost:8089/api/status
```

## Status Endpoint
The site expects simple JSON at your proxy `/api/status`:
```json
{
  "online": true,
  "players": { "online": 5, "max": 40 },
  "motd": "Welcome!"
}
```

## License
MIT — see `LICENSE`.
