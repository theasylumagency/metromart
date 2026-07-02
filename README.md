# MetroMart — Presentation Site

Next.js one-pager for the MetroMart decision call. Trilingual (EN / KA / RU), light & dark themes, live AI Catalog Pilot demo, presenter-mode Core Web Vitals.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production

```bash
npm run build
npm start
```

Deploys anywhere Next.js runs (Vercel, or the same server as metromart.theasylum.agency).

## AI demo (Claude API)

Copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`. Without a key (or on any API error) the demo silently falls back to pre-generated trilingual examples — it can never fail on the call.

## Theme (light / dark)

- All colors are CSS variables (`app/globals.css` — `:root` = light, `.dark` = dark). Tailwind tokens map onto them, so components never hardcode colors.
- Initial theme: saved choice → otherwise system preference (applied pre-paint, no flash).
- First visit only: a small toast tells the visitor their system preference was matched and offers to switch. Manual toggle (sun/moon) lives in the nav.

## Core Web Vitals (presenter mode)

Hidden by default. Activate with `?vitals=1` in the URL, or triple-click the MetroMart logo. Shows live LCP / CLS / INP / TTFB with traffic-light grading; collapsible pill, ✕ hides it again (remembered). Use it when YOU want the demo moment — it never appears for regular visitors.

## Structure

- `lib/translations.js` — all copy in EN/KA/RU. Edit text here only.
- `lib/i18n.jsx` — locale context; persists choice, syncs `<html lang>`.
- `lib/theme.jsx` — theme context + system detection + toast state.
- `components/` — one component per section + `ThemeToast`, `VitalsWidget`.
- `app/api/generate/route.js` — server route for the AI demo (key never reaches the browser).

## Call-time notes

- The **Decisions** section (07) is an interactive checklist — use it as the live agenda during the call.
- The language switcher and the theme system are themselves demos of what ships with the store.
- The product card in section 03 is interactive — hover and click "Add to cart".
- Before the call: open with `?vitals=1` once on the venue network to sanity-check the numbers you'll show.
