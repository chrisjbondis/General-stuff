@AGENTS.md

## Project brief (Google Drive)

Full project context — what's done, what's pending, content details, design decisions — is in this doc. Read it at the start of any session:
https://docs.google.com/document/d/1vQcNutZPCN3sNbbQaK9MKqoCOiqXjpCkx0OjCIC-c6E/edit

## Deployment

**Oracle Cloud is the real production host for generalstuff.com.au — not Netlify.** DNS for the domain resolves to `168.138.23.164`, the same Oracle Cloud VM that serves lighttools.com.au, voltagedrop.com.au, and optimisedeats.com. Nginx is configured there (`/etc/nginx/sites-available/generalstuff.com.au`) with SSL via Certbot, serving static files from `/var/www/generalstuff.com.au/html/`. Its `try_files $uri $uri.html $uri/ =404;` rule means extension-less paths like `/claude-training` automatically resolve to `claude-training.html` — no separate routing config needed for clean URLs.

Netlify (`generalstuff.netlify.app`) is also connected to the `main` branch and auto-deploys on push, but it is a secondary/unused target — nothing points users there, and it can lag behind `main` by a while after a push (its build queue isn't instant). Don't treat Netlify as the source of truth for "is this live" — check the actual domain.

**Deploying to Oracle is manual** (no GitHub Actions auto-deploy configured for this repo, unlike lighttools/voltagedrop):
```powershell
npm run build   # static export, output: "export" in next.config.ts, produces out/
scp -i "$env:USERPROFILE\OneDrive\Desktop\ssh-key-2026-04-21 (1).key" -r out/* ubuntu@168.138.23.164:/var/www/generalstuff.com.au/html/
```
`next.config.ts` also needs `images: { unoptimized: true }` alongside `output: "export"` — required because `app/photos/page.tsx` uses `next/image`, which doesn't work in static export without it.

- The training page lives at `public/claude-training.html`, served at both `/claude-training.html` and `/claude-training` — it IS linked in the nav as "Claude Training"
- Standalone idea pages live in `public/ideas/` and are linked from idea cards via the `link` field in `content/ideas.json`
- Always push changes to `main` — then manually build + scp to Oracle per above; don't rely on Netlify's auto-deploy to make changes actually live

## Design preferences

When writing HTML/CSS for this project, use high-contrast text values — the owner finds low-contrast muted colours hard to read. Specifically:
- `--text-muted` should be no darker than `#b0b8cc` on a dark background
- `--text-dim` should be no darker than `#7a8299` on a dark background
- Body/paragraph text should use near-white (`#d8dce8` or brighter) not grey
- Avoid using colours like `#7a8099` or `#4a5168` for any readable body text
