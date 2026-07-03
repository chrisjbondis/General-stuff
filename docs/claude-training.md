# Claude AI Training — Landing Page

A single-file static landing page for Chris Bond's 1:1 Claude AI training service.

## Files

- `claude-training.html` — the full landing page (HTML + inline CSS, no build step, no dependencies), served from `public/` as `/claude-training.html`

## Current state

- Contact email is `chris@generalstuff.com.au` (Zoho Mail, forwarding to Gmail)
- Footer links point to: optimisedeats.com, lighttools.com.au, voltagedrop.com.au, solsticelighting.com.au
- No backend, no form submission — the CTA is a `mailto:` link
- Linked from the site nav (`components/Nav.tsx`) and from the "four ways to use Claude" idea card, which is now blurred/gated behind it

## Background / context

Chris has 18 years in the lighting industry (works at Solstice Lighting, not a founder there) and has built several free tools and side projects using AI-assisted development:

- **OptimisedEats.com** — free nutrition app for AU/NZ families
- **LightTools.com.au** — free lighting calculator suite
- **VoltageDrop.com.au** — free voltage drop calculator (AS/NZS 3000)
- **JCVD.ai** — another built page/app
- A share tracking app, plus rule-based trading systems (personal use)
- **This training service** — 1:1 sessions teaching people how to set up and use Claude effectively

## Open decisions

1. **Hosting** — `generalstuff.com.au`'s DNS lives in VentraIP (DNS Hosting only, no server behind it yet). Considering self-hosting on Chris's Oracle Cloud (Always Free compute instance) instead of Vercel.

## Possible next steps

- Swap the `mailto:` CTA for a proper contact form once the site is actually deployed
- Add a booking tool (Calendly or similar) instead of/alongside the email CTA
