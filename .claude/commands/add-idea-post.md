---
description: Add a new long-form idea post (article page + ideas.json card)
---

Add a new idea post about: $ARGUMENTS

This workflow applies in ALL cases: writing a new article from scratch, converting an uploaded file, or adding a pre-written HTML file. The ideas.json card is always required — never add or deploy an article page without it.

Before writing anything, run `git log --oneline -15` and `git status`. Check whether a post on this same topic already exists in `content/ideas.json` or `public/ideas/` (by title/slug, not just exact match) — this catches the case where a previous session already added it or is mid-way through. If something close already exists, stop and tell me instead of creating a duplicate or a near-duplicate.

Then:

1. **Write the article page** at `public/ideas/<slug>.html` (kebab-case slug derived from the topic). Follow the exact dark template used by existing idea posts (e.g. `public/ideas/heart-health.html`, `public/ideas/ez-water.html`, `public/ideas/sun-angle-infrared.html`):
   - Fonts: DM Sans (body), DM Serif Display (headings), DM Mono (labels/tags)
   - Palette: `--bg #0f1117`, `--surface #181c26`, `--border #252a38`, `--text #f0f1f5`, `--text-muted #b0b8cc` (no darker), `--text-dim #7a8299` (no darker) — pick any `--accent` colour, these pages don't need a colour distinct from showcase pages
   - Structure: header-tag / h1 / intro paragraph, a disclaimer box if the topic is health/finance/anything needing one, then content sections
   - Add a home/back link at the top matching the other idea posts

2. **Add a card entry to `content/ideas.json`**: increment `id` from the current highest id, write a `title` and a short `body` teaser (2-4 sentences, matching the tone of existing entries — see how `heart-health` and `ez-water` are written), relevant `tags`, today's `date` in `YYYY-MM-DD`, and `link` pointing to `/ideas/<slug>.html`. Insert it at the top of the array (entries are newest-first).

3. **Do not** touch `components/Nav.tsx` or the footer in `public/claude-training.html` — idea posts are not showcase pages and don't get nav/footer links, only the ideas.json card.

4. Run `npm run build` to confirm the static export succeeds, then report back what was added. Don't deploy or push unless asked.
