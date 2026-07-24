@AGENTS.md

## Project brief (Google Drive)

Full project context — what's done, what's pending, content details, design decisions — is in this doc. Read it at the start of any session:
https://docs.google.com/document/d/10ri1O4uk_UbQ0FaYuFjqMUTGDlvQkqpIJ5mn7gIPkTE/edit

## Before starting content work

Run `git log --oneline -15` and `git status` before adding an idea post or showcase page. Sessions here run in fresh, isolated containers with no memory of other sessions, so it's possible for two sessions to work on the same topic without either knowing — this already happened once (commits `ac7743c` and `f447e76` both added a "genetics-first heart health" post ten minutes apart, the second re-touching the file the first had just created). If `content/ideas.json` or `public/ideas/` already has something close to what you're about to add, stop and flag it instead of creating a duplicate.

Prefer the slash commands `/add-idea-post` and `/add-showcase-page` (in `.claude/commands/`) for these two workflows — they include this check and encode the steps below so they don't have to be re-derived from prose each time.

## Deployment

**Oracle Cloud is the real production host for generalstuff.com.au — not Netlify.** DNS for the domain resolves to `168.138.23.164`, the same Oracle Cloud VM that serves lighttools.com.au, voltagedrop.com.au, and optimisedeats.com. Nginx is configured there (`/etc/nginx/sites-available/generalstuff.com.au`) with SSL via Certbot, serving static files from `/var/www/generalstuff.com.au/html/`. Its `try_files $uri $uri.html $uri/ =404;` rule means extension-less paths like `/claude-training` automatically resolve to `claude-training.html` — no separate routing config needed for clean URLs.

Netlify (`generalstuff.netlify.app`) is also connected to the `main` branch and auto-deploys on push, but it is a secondary/unused target — nothing points users there, and it can lag behind `main` by a while after a push (its build queue isn't instant). Don't treat Netlify as the source of truth for "is this live" — check the actual domain.

**Deploying to Oracle is automated via GitHub Actions** (`.github/workflows/deploy.yml`): every push to `main` builds and rsyncs `out/` to `/var/www/generalstuff.com.au/html/` on the Oracle VM. This pipeline is live and working as of 2026-07-20. Three repo secrets are required (all already set in GitHub → Settings → Secrets and variables → Actions):
- `ORACLE_SSH_KEY` — RSA private key content
- `ORACLE_HOST` — `168.138.23.164`
- `ORACLE_USER` — `ubuntu`

Claude sessions can't read or set repo secrets — if the pipeline breaks, check those three secrets are still present in GitHub settings.

Manual fallback (same as before, still works if you need to deploy from a local machine without waiting on CI):
```powershell
npm run build   # static export, output: "export" in next.config.ts, produces out/
scp -i "$env:USERPROFILE\OneDrive\Desktop\ssh-key-2026-04-21 (1).key" -r out/* ubuntu@168.138.23.164:/var/www/generalstuff.com.au/html/
```
`next.config.ts` also needs `images: { unoptimized: true }` alongside `output: "export"` — required because `app/photos/page.tsx` uses `next/image`, which doesn't work in static export without it.

- The training page lives at `public/claude-training.html`, served at both `/claude-training.html` and `/claude-training` — it IS linked in the nav as "Claude Training"
- Standalone idea pages live in `public/ideas/` and are linked from idea cards via the `link` field in `content/ideas.json`
- Always push changes to `main` — the GitHub Actions workflow handles the Oracle deploy from there; don't rely on Netlify's auto-deploy to make changes actually live

## Project showcase pages

**Every project Chris builds should get a showcase page here, added proactively — don't wait to be asked.** When a new app/site/tool comes up in conversation (or an existing one is mentioned that isn't listed below), give it the same treatment:

1. A standalone page at `public/ideas/<project-slug>.html` — same dark template as the existing ones (`optimisedeats.html`, `lighttools.html`, `voltagedrop.html`, `jcvdai.html`): DM Sans/DM Serif Display/DM Mono fonts, `--bg #0f1117` / `--surface #181c26` / `--border #252a38` base, with a distinct `--accent` colour per project (pick one not already used: green=OptimisedEats, amber=LightTools, blue=VoltageDrop, red=JCVD.ai). Structure: back-to-home link, header with project tag/title/description/CTA buttons, a features or link-card section, footer.
2. If the target site has real distinct URLs for its sections (like LightTools' separate calculator pages), link straight to them as clickable link-cards. If it's a client-state SPA with no routing (like OptimisedEats or a single-page app), describe sections as feature cards instead — don't invent deep links that don't exist.
3. Add a nav tab in `components/Nav.tsx` (follow the existing plain `<a>` pattern used for Claude Training/OptimisedEats/etc. — these are static files, not Next.js routes, so don't use `<Link>`).
4. Add a footer link in `public/claude-training.html`'s `<footer class="footer-links">`.
5. Build, verify in preview, then deploy per the Deployment section above and push to `main`.

Current projects covered: OptimisedEats, LightTools, VoltageDrop, JCVD.ai. Known projects not yet covered as of 2026-07-08: none outstanding — check with Chris if a new one comes up (e.g. a share-tracking app was mentioned in his bio but doesn't have its own page yet).

## Environment notes

- Chris is on **Windows (PC)**, not Mac — don't suggest Mac-only tools (e.g. `sips`) for image processing
- SSH key for Oracle is an RSA key stored on the Desktop (filename: `ssh-key-2026-04-21 (1).key`)
- `public/ideas/lighttools.html` is tracked in this repo (added 2026-07-13) — the earlier note here claiming it wasn't was stale
- Photo hosting: new photos go to Cloudinary (free tier), referenced in `photos.json` via the `url` field. Local photos go in `public/photos/` and use the `filename` field instead

## Design preferences

When writing HTML/CSS for this project, use high-contrast text values — the owner finds low-contrast muted colours hard to read. Specifically:
- `--text-muted` should be no darker than `#b0b8cc` on a dark background
- `--text-dim` should be no darker than `#7a8299` on a dark background
- Body/paragraph text should use near-white (`#d8dce8` or brighter) not grey
- Avoid using colours like `#7a8099` or `#4a5168` for any readable body text
