# Safara Africa — website (Next.js)

Next.js rebuild of [safaraafrica.com](https://www.safaraafrica.com), replacing the WordPress / Elementor / Slider Revolution site.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · content in Markdown/JSON files.

See [`docs/REBUILD-NOTES.md`](docs/REBUILD-NOTES.md) for how the current site is built and what this rebuild fixes.

## Run it

Requires Node.js 20.9 or newer (22 LTS recommended).

```bash
npm install
cp .env.example .env.local   # then fill in one enquiry option (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Where things live

```
src/
  config/site.ts            business details: name, phone, email, address, hours, nav  ← edit here first
  content/
    tours/*.md              one file per journey (route, days, inclusions, photos, body text)
    posts/*.md              journal articles
    faqs.json               FAQ entries grouped by topic
  lib/content.ts            reads the content files; build fails with a clear message if a field is missing
  components/               Header, Footer, Logo, TourCard, RouteLine, EnquiryForm, JsonLd
  app/
    page.tsx                homepage
    tours/                  /tours and /tours/[slug]
    journal/                /journal and /journal/[slug]
    faqs/, contact/         FAQs, contact + enquiry form
    api/enquiry/route.ts    receives the enquiry form
    sitemap.ts, robots.ts   SEO files
    globals.css             brand colours and type scale
public/
  logo-white.png            logo for dark/photo backgrounds
  logo-navy.png             logo for light backgrounds
```

### Adding a tour

Copy `src/content/tours/tanzania-classic.md` and rename it. The file name becomes the URL (`zanzibar-beach.md` → `/tours/zanzibar-beach`). List the `route` stops in travel order: they draw the route line on cards and tour pages. Put the external itinerary link in `itineraryUrl` to show the "day-by-day itinerary" button.

### Enquiry form

The form posts to `/api/enquiry`, which delivers it one of two ways (set in `.env.local` or your host's environment settings):

- **Email via Resend:** set `RESEND_API_KEY`, `ENQUIRY_FROM` and `ENQUIRY_TO`. Verify the sending domain in Resend first.
- **Webhook:** set `ENQUIRY_WEBHOOK_URL` to forward the enquiry as JSON to HubSpot (via a workflow), Zapier, Make or similar.

In development with neither set, enquiries are printed to the terminal. In production the form shows an error instead, so nothing is silently lost.

## Deploy

**Vercel** is the simplest host for Next.js: import the repo, add the environment variables, deploy. Netlify and Cloudflare also support Next.js. The one.com shared hosting used today can't run Next.js.

Old WordPress URLs (`/portfolio/namibia-luxury-tour/` and others) are permanently redirected in `next.config.ts`, so search rankings and existing links keep working.

## Before launch

- [ ] Confirm the business name: the logo says "Safara Africa Expeditions", the old site said "Safara Africa Tours and Safaris" (`site.legalName`)
- [ ] Enter the Arusha office phone, WhatsApp and street address in `src/config/site.ts` (currently placeholders)
- [ ] Ask the designer for the logo as SVG to replace the PNGs in `public/`
- [ ] Review the starter Tanzania copy for tours, destinations, travel styles, FAQs and journal articles (marked `CONTENT NOTE` / `STARTER COPY`)
- [ ] Replace the placeholder Unsplash photos with your own in `public/images/`, then remove `images.unsplash.com` from `next.config.ts`
- [ ] Choose and configure the enquiry delivery option
- [ ] Add real social profile links in `site.social`
- [ ] Add one analytics tool (e.g. `@vercel/analytics` or GA4)
- [ ] Get the itinerary links for the Classic and Fly-in tours
- [ ] Review tour copy with the client
