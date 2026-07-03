# Claude AI Training — Landing Page

A single-file static landing page for Chris Bond's 1:1 Claude AI training service.

## Files

- `claude-training.html` — the full landing page (HTML + inline CSS, no build step, no dependencies)

## Current state

- Contact email is set to `cbconsultmelb@gmail.com` (placeholder — update once a professional custom-domain email is set up)
- Footer links point to: optimisedeats.com, lighttools.com.au, voltagedrop.com.au, solsticelighting.com.au
- No backend, no form submission — the CTA is a `mailto:` link
- Not yet hosted anywhere; currently just a local file

## Background / context

Chris has 18 years in the lighting industry (works at Solstice Lighting, not a founder there) and has built several free tools and side projects using AI-assisted development:

- **OptimisedEats.com** — free nutrition app for AU/NZ families
- **LightTools.com.au** — free lighting calculator suite
- **VoltageDrop.com.au** — free voltage drop calculator (AS/NZS 3000)
- Share trading apps and rule-based trading systems (personal use)
- **This training service** — 1:1 sessions teaching people how to set up and use Claude effectively

## Open decisions

1. **Domain** — undecided whether this lives on a new domain, a subdomain of an existing site (e.g. `training.lighttools.com.au`), or elsewhere.
2. **Email** — Chris currently has Google AI Plus (not Workspace). Needs a proper Workspace or Zoho Mail setup to get a custom-domain email address before going live.
3. **Hosting** — not yet decided. Easiest options for a static file like this:
   - Cloudflare Pages (free)
   - Netlify (free, drag-and-drop deploy)
   - A subdomain on whatever host runs the existing Solstice/LightTools sites (likely free if already paid for)

## Possible next steps

- Swap the `mailto:` CTA for a proper contact form if a backend/hosting solution is chosen
- Add a booking tool (Calendly or similar) instead of/alongside the email CTA
- Connect a custom domain once one is decided
- Update contact email once a professional one exists
