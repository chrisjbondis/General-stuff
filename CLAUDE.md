@AGENTS.md

## Project brief (Google Drive)

Full project context — what's done, what's pending, content details, design decisions — is in this doc. Read it at the start of any session:
https://docs.google.com/document/d/1vQcNutZPCN3sNbbQaK9MKqoCOiqXjpCkx0OjCIC-c6E/edit

## Deployment

- Site is hosted on Netlify, connected to the `main` branch of `chrisjbondis/general-stuff`
- Static export mode (`output: "export"`) — builds go to `out/`, configured in `netlify.toml`
- Build takes ~8 seconds. Cache headers are already configured (no-cache HTML, immutable hashed assets)
- Do NOT spend time debugging Netlify cache lag — it's solved. If the user reports stale content, tell them to wait up to an hour for the first cache expiry, then it will be instant going forward
- The training page is a standalone file at `public/training.html`, served at `/training.html` — it is NOT linked in the nav
- Standalone idea pages live in `public/ideas/` and are linked from idea cards via the `link` field in `content/ideas.json`
- Always push changes to `main` for Netlify to pick them up

## Design preferences

When writing HTML/CSS for this project, use high-contrast text values — the owner finds low-contrast muted colours hard to read. Specifically:
- `--text-muted` should be no darker than `#b0b8cc` on a dark background
- `--text-dim` should be no darker than `#7a8299` on a dark background
- Body/paragraph text should use near-white (`#d8dce8` or brighter) not grey
- Avoid using colours like `#7a8099` or `#4a5168` for any readable body text
