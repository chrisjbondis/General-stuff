---
description: Add a project showcase page for a new Chris-built app/site
---

Add a project showcase page for: $ARGUMENTS

Before writing anything, run `git log --oneline -15` and check `components/Nav.tsx` and `public/claude-training.html`'s footer — confirm this project doesn't already have a showcase page (`public/ideas/*.html`) so a previous session isn't duplicated.

Then follow the convention documented in CLAUDE.md exactly:

1. **Standalone page** at `public/ideas/<project-slug>.html`, same dark template as `public/ideas/optimisedeats.html`, `lighttools.html`, `voltagedrop.html`, `jcvdai.html`:
   - Fonts: DM Sans / DM Serif Display / DM Mono
   - Base palette: `--bg #0f1117`, `--surface #181c26`, `--border #252a38`, `--text-muted #b0b8cc` (no darker), `--text-dim #7a8299` (no darker)
   - Pick a distinct `--accent` colour not already used: green=OptimisedEats, amber=LightTools, blue=VoltageDrop, red=JCVD.ai — pick something else (e.g. purple, teal, pink)
   - Structure: back-to-home link, header (project tag / title / description / CTA buttons), then a features-or-link-card section, then footer

2. **Link style for the features section** — ask me if unclear, otherwise infer from the project:
   - If the target site has real distinct URLs for its sections (like LightTools' separate calculator pages), link straight to them as clickable link-cards
   - If it's a client-state SPA with no routing (like OptimisedEats), describe sections as feature cards instead — don't invent deep links that don't exist

3. **Add a nav tab** in `components/Nav.tsx` — follow the existing plain `<a href="/ideas/....html">` pattern (not `<Link>`, these are static files).

4. **Add a footer link** in `public/claude-training.html`'s `<footer class="footer-links">`.

5. **Update CLAUDE.md** — add the new project to the "Current projects covered" line under Project showcase pages.

6. Run `npm run build` to confirm the static export succeeds, then report back. Don't deploy or push unless asked.
