# Safara Africa — website (Next.js)

Next.js rebuild of [safaraafrica.com](https://www.safaraafrica.com), replacing the WordPress / Elementor / Slider Revolution site.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · content in Markdown/JSON files.

See [`docs/REBUILD-NOTES.md`](docs/REBUILD-NOTES.md) for how the current site is built and what this rebuild fixes.

## Run it

Requires Node.js 20.9 or newer (22 LTS recommended, see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # then fill in one enquiry option (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

| Script | What it does |
|---|---|
| `npm run typecheck` | TypeScript, no output |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run format` / `format:check` | Prettier |
| `npm test` | Vitest: content integrity and the enquiry API |
| `npm run check` | all of the above; run before every commit or deploy |
| `npm run check:launch` | lists placeholders that must be replaced before going live; fails until they are |

## Where things live

```
src/
  app/                      routes only (App Router); URLs follow the folders
    api/enquiry/route.ts    receives the enquiry form
    sitemap.ts, robots.ts   SEO files
  components/
    layout/                 Header, MegaMenu, MobileMenu, Footer, FloatingCta, Logo
    ui/                     shared building blocks: Breadcrumb, PageHero, ImageCards, FaqList, JsonLd, month strips…
  features/
    tours/components/       TourCard, TourGrid, RouteLine
    enquiry/components/     EnquiryForm
    reviews/components/     Testimonials
  config/
    site.ts                 business details: name, phone, email, address, hours  ← edit here first
    menu.ts                 main menu, generated from the content files
  content/
    tours/*.md              one file per journey (route, days, inclusions, photos, body text)
    posts/*.md              journal articles
    faqs.json               FAQ entries grouped by topic
    *.ts                    countries, parks, lodges, beaches, treks, travel styles, team, testimonials
  lib/                      content loaders (build fails with a clear message if a field is missing), helpers
  styles/globals.css        brand colours and type scale
  types/                    shared TypeScript types
public/
  images/brand/             logos (navy for light backgrounds, white for photos)
  videos/                   homepage hero video
tests/                      Vitest tests
docs/                       audit, restructure report, research and roadmap
```

### Adding or changing a trip

Trips are data, not code. Each one is an object in `src/content/itineraries/*.ts` with its days, the lodge for each night, meals, parks, inclusions, exclusions and a price table. The slug becomes the URL (`/tours/<slug>`).

1. Copy an existing trip in the same file (e.g. `northern-circuit-classic-7-days` in `northern-circuit.ts`) and change it.
2. Lodges are in `src/content/stays.ts`, places (with map coordinates) in `src/content/places.ts`, extras in `src/content/add-ons.ts`.
3. Prices: replace `placeholderPricing(...)` with real rows (`{ season, groupSize, perPersonUsd }`) and set `isPlaceholder: false`.
4. Run `npm test`. Any mistake (a missing lodge, a day count that doesn't match, an unknown park) fails with a message naming the trip and day.

Price seasons are in `src/content/pricing/seasons.ts`. **Park fees** are in `src/content/pricing/park-fees.ts`: add a new block for each fee year (1 July to 30 June) when TANAPA and NCAA publish new tariffs. Every trip's fee breakdown updates automatically. The same model as SQL is in `database/`, ready for a future move to a database.

### Enquiry form

The form posts to `/api/enquiry`, which delivers it one of two ways (set in `.env.local` or your host's environment settings):

- **Email via Resend:** set `RESEND_API_KEY`, `ENQUIRY_FROM` and `ENQUIRY_TO`. Verify the sending domain in Resend first.
- **Webhook:** set `ENQUIRY_WEBHOOK_URL` to forward the enquiry as JSON to HubSpot (via a workflow), Zapier, Make or similar.

In development with neither set, enquiries are printed to the terminal. In production the form shows an error instead, so nothing is silently lost.

Optional: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` (Cloudflare Turnstile) for spam protection, and `NEXT_PUBLIC_GA_ID` for Google Analytics 4, which also records a `generate_lead` event for each enquiry. See `.env.example`.

## Deploy

**Vercel** is the simplest host for Next.js: import the repo, add the environment variables, deploy. Netlify and Cloudflare also support Next.js. The one.com shared hosting used today can't run Next.js.

Old WordPress URLs (`/portfolio/namibia-luxury-tour/` and others) are permanently redirected in `next.config.ts`, so search rankings and existing links keep working.

## Before launch

Run `npm run check:launch`. It lists every placeholder that must be replaced and fails until they are. Also:

- [ ] Confirm the business name: the logo says "Safara Africa Expeditions", the old site said "Safara Africa Tours and Safaris" (`site.legalName`)
- [ ] Enter the Arusha office phone, WhatsApp, street address and TALA licence number in `src/config/site.ts`
- [ ] Confirm deposit, balance and cancellation terms (`site.booking`) and have a lawyer review `/privacy` and `/terms`
- [ ] Replace placeholder prices in `src/content/itineraries/` and park fees in `src/content/pricing/park-fees.ts`
- [ ] Confirm the lodges named in `src/content/stays.ts` are ones you book
- [ ] Add real reviews (`src/content/testimonials.ts`); the homepage section stays hidden until then
- [ ] Ask the designer for the logo as SVG to replace the PNGs in `public/images/brand/`
- [ ] Review the starter copy (marked `STARTER COPY` / `CONFIRM`)
- [ ] Replace the placeholder Unsplash photos with your own in `public/images/`, then remove `images.unsplash.com` from `next.config.ts`
- [ ] Set the enquiry delivery, Turnstile and GA4 environment variables on the host
- [ ] Add real social profile links in `site.social`
