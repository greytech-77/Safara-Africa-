# 01 — Codebase audit

Audited 26 October 2026. Covers all 96 tracked files except binaries (`public/*.png`, `public/*.mp4`, `src/app/*.png`), `node_modules/` and `.next/`.

Baseline: `npm run typecheck` passes, `npm run build` passes (117 static pages + 2 dynamic routes). There is no lint script and no tests. The project was not a git repo; it was initialised and committed as-is (`995425d`) before this audit.

---

## 1. Project summary

**Safara Africa** (logo: "Safara Africa Expeditions") is an Arusha-based tour operator moving from a WordPress / Elementor site to this Next.js rebuild. It was originally a Namibian business; the old site's tours and address were in Windhoek, and this rebuild repositions it as a Tanzanian operator. The rebuild hasn't launched yet.

What the website does today:

- **It's a brochure and lead-capture site.** Visitors browse sample journeys (17, mostly Tanzania, plus Kenya, Uganda and Rwanda), destination guides (4 countries, 25 parks, 16 lodges, 4 islands, 4 treks), travel styles and a small journal.
- **Its only sales action is an enquiry form.** The form is emailed to the office through Resend or forwarded to a webhook (HubSpot, Zapier and similar). The "Call", "WhatsApp" and "Plan your trip" buttons all lead to that form or to phone/WhatsApp links.
- **It has no prices, booking, payments, database or admin.** All content lives in Markdown, JSON and TypeScript files in the repo, so a developer has to edit and redeploy to change anything.
- **Much of the content is still a placeholder.** That includes the phone, WhatsApp and address, the testimonials, team names and photos, every photo (Unsplash), every price (none are set) and the day-by-day itineraries (none). Most copy is labelled `STARTER COPY`.

## 2. Tech stack

| Layer | What's used | Notes |
|---|---|---|
| Language | TypeScript 5.9 (strict) | No JS files |
| Framework | Next.js **16.4** App Router, React **19.3** | Server Components by default; 9 client components |
| Styling | Tailwind CSS **4.3** via `@tailwindcss/postcss` | Brand tokens in `src/app/globals.css` (`@theme`) |
| Fonts | `next/font/google`: Gloock, Karla, plus Fraunces and DM Sans on the homepage hero | 4 families |
| Content | Markdown + front matter (`gray-matter`, `marked`) for tours and posts; TS modules for everything else; `faqs.json` | Read at build time in `src/lib/content.ts` |
| Database | **None** | |
| Auth | **None** | No admin area |
| Payments | **None** | |
| Email / leads | Resend REST API **or** a generic webhook (`src/app/api/enquiry/route.ts`) | Set by env vars |
| Images | `next/image`; remote images from `images.unsplash.com` (placeholders) | `next.config.ts` `remotePatterns` |
| Maps | Google Maps `iframe` embed (beach pages), Google Maps search link (contact) | No API key |
| SEO | `metadata` API, `sitemap.ts`, `robots.ts`, JSON-LD (TravelAgency, TouristTrip, FAQPage, BreadcrumbList) | 301 redirects for old WordPress URLs |
| Hosting | None configured; README recommends Vercel | Current one.com shared hosting can't run Next.js |
| Lint / format / test | **None** | Only `typecheck` |
| Package manager | npm, **no lockfile** | `engines.node >= 20.9`; Node 22.22 locally |

**Environment variables** (`.env.example`, all optional; `.env` is gitignored, and no secrets are committed):

| Var | Used in | Purpose |
|---|---|---|
| `RESEND_API_KEY` | `api/enquiry/route.ts` | Send the enquiry email |
| `ENQUIRY_FROM`, `ENQUIRY_TO` | same | Sender and recipient (default `info@safaraafrica.com`) |
| `ENQUIRY_WEBHOOK_URL` | same | Alternative: POST the enquiry as JSON |

**Third-party services contacted at runtime:** `api.resend.com`, the webhook URL, `images.unsplash.com`, `maps.google.com` (iframe), `wa.me` links, Google Fonts (self-hosted at build by `next/font`).

## 3. Folder tree

```
safara-africa-next/
├── .env.example
├── .gitignore
├── README.md
├── next.config.ts            images allow-list + WordPress redirects
├── package.json              dev / build / start / typecheck
├── postcss.config.mjs
├── tsconfig.json             strict, @/* → src/*
├── docs/
│   ├── REBUILD-NOTES.md      notes on the old WordPress site
│   └── 01-codebase-audit.md  (this file)
├── public/
│   ├── logo-navy.png, logo-white.png, wildebeest-navy.png
│   └── VQpxbxXqeeRh.mp4      6.3 MB homepage hero video
└── src/
    ├── app/                  routes (App Router)
    │   ├── page.tsx, layout.tsx, globals.css, not-found.tsx, sitemap.ts, robots.ts, icon.png, apple-icon.png
    │   ├── about/ (+ team/)
    │   ├── accommodations/[slug]/
    │   ├── api/enquiry/route.ts
    │   ├── beaches/ (+ [slug]/)
    │   ├── contact/
    │   ├── destinations/ (+ [slug]/)
    │   ├── faqs/
    │   ├── journal/ (+ [slug]/)
    │   ├── journey/ (+ [slug]/)
    │   ├── parks/[slug]/
    │   ├── tours/ (+ [slug]/)
    │   ├── travel-styles/[slug]/
    │   └── trekking/ (+ [slug]/)
    ├── components/           22 flat components (layout, UI and feature mixed together)
    ├── config/
    │   ├── site.ts           business details (name, phone, address, hours)
    │   └── menu.ts           mega-menu built from content
    ├── content/
    │   ├── tours/*.md        17 journeys
    │   ├── posts/*.md        3 journal articles
    │   ├── faqs.json
    │   └── accommodations.ts, beaches.ts, countries.ts, journeys.ts, parks.ts,
    │       team.ts, testimonials.ts, travel-styles.ts, treks.ts, unsplash.ts
    └── lib/
        └── content.ts        loads and validates tours, posts and FAQs; defines Tour/Post/Faq/Img types
```

## 4. Feature inventory

| Feature | Status | Where / notes |
|---|---|---|
| Tour listing | ✅ Exists | `/tours`, `TourGrid` with **country-only** filter tabs |
| Tour detail page | ⚠️ Partial | `/tours/[slug]`: hero, route line (stops and nights), summary, body copy, "Who it suits", "Included", gallery. **No day-by-day itinerary, exclusions, prices, accommodation details, map or FAQs** |
| Day-by-day itinerary | ❌ Missing | Only an `itineraryUrl` field that links to an external tool (Wetu?), and none are set |
| Prices | ⚠️ Partial | `priceFrom` field exists, but **no tour sets it**, so every card says "Price on request" |
| Seasonal / group-size pricing | ❌ Missing | |
| Park fee calculator / fee table | ❌ Missing | |
| Trip builder / price estimate | ❌ Missing | |
| Search, filters by days / budget / park / month / style | ❌ Missing | Country tabs only |
| Safari types (Journey menu) | ✅ Exists | `/journey`, `/journey/[slug]` (8 types), tours matched by `tags` |
| Destinations / countries | ✅ Exists | `/destinations/[slug]`: overview, tours, parks, lodges, experiences, month picker, FAQs |
| Park guides | ✅ Exists | `/parks/[slug]` (23 pages): highlights, best-time strip, related tours and lodges |
| Lodges | ✅ Exists | `/accommodations/[slug]` (16): starter copy about real lodges; no photos, prices or levels |
| Beaches / Zanzibar | ✅ Exists | `/beaches/[slug]` with map embed and month strip |
| Trekking (Kili, Meru, Lengai, Usambara) | ⚠️ Partial | Route comparison cards and quick facts; **no altitude profiles, success rates or per-route pages** |
| Great Migration calendar | ⚠️ Partial | Journal article plus the country month picker; no dedicated interactive calendar |
| Travel styles | ⚠️ Partial | 5 detail pages; **no `/travel-styles` index page** |
| Journal / blog | ✅ Exists | 3 Markdown posts |
| FAQs | ✅ Exists | `/faqs` (10), plus per-country and per-trek FAQs, all with FAQPage JSON-LD |
| About / team | ⚠️ Partial | Team cards are roles only, with no names or photos |
| Reviews / testimonials | ⚠️ Partial | Homepage carousel of **3 placeholder 5-star reviews**; no TripAdvisor/Google/SafariBookings integration |
| Trust badges (TALA licence, TATO, KPAP) | ❌ Missing | Footer says "A licensed tour operator" with no licence number |
| Enquiry form | ✅ Exists | `/contact#enquire`, honeypot spam trap, Resend or webhook delivery, tour preselect via `?tour=` |
| WhatsApp click-to-chat | ⚠️ Partial | Links exist, but the **number is a placeholder** and there's no pre-filled message |
| Floating mobile CTA | ✅ Exists | Call / Enquire bar |
| Quote → deposit → balance pipeline | ❌ Missing | |
| Payments (card, mobile money, bank) | ❌ Missing | |
| Admin dashboard / CMS | ❌ Missing | Content edits need a developer |
| CRM | ❌ Missing (external) | Webhook can feed HubSpot |
| PDF itinerary / quote | ❌ Missing | |
| Multi-language / currency | ❌ Missing | English only, no currency |
| Newsletter / email capture / brochure | ❌ Missing | |
| Analytics / conversion tracking | ❌ Missing | Listed in README "before launch" |
| Privacy policy / booking terms | ❌ Missing | |
| SEO basics | ✅ Exists | Metadata, canonical URLs, sitemap, robots, JSON-LD, old-URL redirects |
| Accessibility | ✅ Good | Skip link, focus-trapped mobile menu, ARIA on mega menu, reduced-motion handling, contrast-checked tokens |
| Tests / lint / CI | ❌ Missing | |

## 5. Issues

Ranked by impact on a launch. "Critical" means the site shouldn't go live with this unfixed.

### Critical

| # | Issue | File | One-line fix |
|---|---|---|---|
| C1 | Phone, WhatsApp and street address are placeholders (`+255 000 000 000`, `255000000000`, "Street address"). They appear on every page (header, footer, floating Call bar, mobile menu, contact page, team cards) and in the TravelAgency JSON-LD, so every Call and WhatsApp button is dead. | `src/config/site.ts:14-24` | Enter the real Arusha office number, WhatsApp and address; add a build-time check that fails if they still contain `000`. |
| C2 | Three invented 5-star reviews are shown on the homepage. The title says "Sample review", but the stars and "Published … on Tripadvisor" read as real. That damages trust and may break consumer-protection rules on fake reviews (UK/EU). | `src/content/testimonials.ts`, `src/app/page.tsx:116` | Hide the section until real reviews exist (render nothing when the list is empty), then add real, attributable reviews. |
| C3 | In production with no `RESEND_API_KEY` or `ENQUIRY_WEBHOOK_URL`, the enquiry API returns 503. The only conversion path fails. | `src/app/api/enquiry/route.ts:56-60` | Configure one delivery option on the host; add a startup check or health route that flags a missing config. |

### High

| # | Issue | File | One-line fix |
|---|---|---|---|
| H1 | **No lockfile.** Every `npm install` can resolve different versions (`next ^16`, `marked ^16`…). Builds aren't reproducible and `npm audit` can't run. | repo root | Run `npm install` to generate `package-lock.json` and commit it. |
| H2 | **No lint, formatter or tests**, so there's no safety net for the restructure in Phase 2 or for new features. | `package.json` | Add ESLint (`eslint-config-next`), Prettier, Vitest + Testing Library, and `lint`/`test` scripts. |
| H3 | No tour has a price or a day-by-day itinerary, so all 17 say "Price on request" and give no daily plan. Travellers comparing operators on SafariBookings and TripAdvisor expect both. (Detail in Phases 3 to 5.) | `src/content/tours/*.md`, `src/lib/content.ts:13-33` | Extend the tour model with days, accommodation and price seasons (Phase 5). |
| H4 | The homepage hero autoplays a **6.3 MB MP4** with `preload="auto"` on a 120svh section. That's slow and expensive on mobile data, which matters for safari shoppers on the go. | `src/app/page.tsx:41`, `public/VQpxbxXqeeRh.mp4` | Compress to ≤1.5 MB (720p H.264/WebM), use `preload="metadata"`, skip the video on small screens or with Save-Data on, and give it a descriptive file name. |
| H5 | No privacy policy, terms or booking conditions. The enquiry form collects name, email, phone, country and travel plans with no privacy notice. GDPR applies to EU and UK clients (a core market), and you'll need booking terms before taking deposits. | `src/components/EnquiryForm.tsx` | Add `/privacy` and `/terms` pages, a consent line under the form, and footer links. |
| H6 | The enquiry API has no rate limiting or bot protection beyond a honeypot, so it's open to spam floods that would also burn the Resend quota. | `src/app/api/enquiry/route.ts` | Add Cloudflare Turnstile (free) or a per-IP rate limit (e.g. Upstash or the Vercel firewall). |
| H7 | No analytics or conversion tracking, so there's no way to measure which tours or channels produce enquiries. | `src/app/layout.tsx` | Add one tool (GA4 or Plausible/Vercel Analytics) and fire an event on enquiry success and WhatsApp clicks. |

### Medium

| # | Issue | File | One-line fix |
|---|---|---|---|
| M1 | Content cross-references are unchecked strings: a tour's `country`, `tags` and `route[].place` and a lodge's `park` are matched by name. A typo silently drops a tour from park, journey or country pages. | `src/lib/content.ts`, `src/content/*.ts` | Validate them with a schema (Zod) at build time against the known slugs. |
| M2 | `need()` only checks a field is present, not its type. `days: "eight"` or a malformed `route` would build and render wrongly. | `src/lib/content.ts:55-60` | Same Zod schema as M1. |
| M3 | `TourGrid` is a client component and receives full `Tour` objects, **including the rendered HTML body**, for every tour. That bloats the RSC payload on `/tours` and every page that lists tours. | `src/components/TourGrid.tsx`, all callers | Pass a slim `TourCardData` (slug, title, days, tier, style, route, hero, priceFrom). |
| M4 | The homepage loads two extra font families (Fraunces, DM Sans), with a comment saying they're stand-ins for a competitor's (Jacada) licensed fonts. That's extra weight, and copying a competitor's look is a brand risk. | `src/app/page.tsx:15-17` | Use the brand fonts (Gloock/Karla) or choose your own; remove the competitor reference. |
| M5 | No security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame-ancestors). | `next.config.ts` | Add `headers()` with a baseline policy. |
| M6 | All photos are hot-linked Unsplash placeholders, and lodge pages name real luxury properties (Four Seasons, &Beyond, One&Only…) with placeholder photos and unconfirmed details. | `src/content/*.ts`, `tours/*.md` | Replace them with your own or licensed photos in `public/images/`; keep only lodges you actually contract. |
| M7 | No trust signals: no TALA licence number, TATO membership, insurance or KPAP partner badge. These are table stakes for Arusha operators (to be confirmed in Phase 3). | `src/components/Footer.tsx`, `/about` | Add a licence and membership block to the footer and about page. |
| M8 | The `/contact` route is server-rendered on every request only because it reads `?tour=`. | `src/app/contact/page.tsx:15-17` | Read the param in the client form (`useSearchParams`) so the page can be static. |
| M9 | WhatsApp links have no pre-filled text, so the team can't tell which page or tour the lead came from. | `CtaBlock.tsx`, `Footer.tsx`, `MobileMenu.tsx`, `contact/page.tsx` | Add a `whatsappLink(message)` helper and pass the tour or page name. |
| M10 | 22 components sit in one flat folder, mixing layout (Header, Footer), UI (Breadcrumb, FaqList) and feature components (TourCard, EnquiryForm). Types live in `lib/content.ts` and in each content file. | `src/components/`, `src/lib/content.ts` | Phase 2 restructure. |

### Low

| # | Issue | File | One-line fix |
|---|---|---|---|
| L1 | Duplicate `unsplash` helper with a different signature. | `src/content/travel-styles.ts:17` vs `src/content/unsplash.ts` | Use the shared helper. |
| L2 | The FAQ accordion markup is duplicated instead of reusing `FaqList`. | `src/app/faqs/page.tsx:42-50` vs `src/components/FaqList.tsx` | Reuse `FaqList` (adapt it to the `question`/`answer` shape). |
| L3 | The tick-icon SVG is copied three times; the month labels are defined twice. | `accommodations/[slug]`, `beaches/[slug]`, `parks/[slug]`; `MonthPicker.tsx:5`, `MonthRow.tsx:3` | Extract a `TickIcon` and a shared `MONTHS` constant. |
| L4 | No `/travel-styles` index page, although the menu marks `/travel-styles` as a section. | `src/config/menu.ts:110` | Add an index page (or link the section to `/journey`). |
| L5 | Many hard-coded colours (`text-[#dce2e6]`, `text-[#c7d0d8]`, `#f4f5f0` …) bypass the theme tokens. | across `app/` and `components/` | Add `--color-mist`, `--color-cloud` etc. to `@theme`. |
| L6 | Line endings are mixed (git warns LF→CRLF on every file). | repo | Add `.gitattributes` (`* text=auto eol=lf`) and `.editorconfig`. |
| L7 | No `error.tsx` boundary. A runtime error shows Next's default page. | `src/app/` | Add a branded `error.tsx`. |
| L8 | `dangerouslySetInnerHTML` renders Markdown HTML. That's safe while authors are trusted developers, but it becomes a risk if a CMS is added. | `tours/[slug]/page.tsx:68`, `journal/[slug]/page.tsx:43` | Sanitise (e.g. `sanitize-html`) when content gets non-developer authors. |
| L9 | Sitemap entries have no `lastModified` except posts. | `src/app/sitemap.ts` | Add dates where known. |
| L10 | No `.nvmrc`; Node version only in `engines`. | repo | Add `.nvmrc` with `22`. |
| L11 | `MonthPicker` renders January, then jumps to the current month after hydration (a visible flicker). | `src/components/MonthPicker.tsx:10-11` | Acceptable; or render the current month server-side with `suppressHydrationWarning`. |

**Not found:** hard-coded secrets, injection or XSS paths from user input (the enquiry email HTML is escaped, JSON-LD escapes `<`), broken internal links (checked all `href`s against routes), or dead code (every component and content module is imported).

## 6. How to run this project

Requires Node.js ≥ 20.9 (22 LTS recommended).

```bash
npm install                    # no lockfile yet: see H1
cp .env.example .env.local     # optional in dev: without it, enquiries are printed to the terminal
npm run dev                    # http://localhost:3000
npm run typecheck              # TypeScript only
npm run build && npm start     # production build and server
```

- **Add or change a tour:** edit `src/content/tours/<slug>.md` (the file name becomes the URL).
- **Change business details:** edit `src/config/site.ts`.
- **Change destination, park, lodge, trek or travel-style copy:** edit `src/content/*.ts`.
- **Deploy:** Vercel (or Netlify/Cloudflare) with the enquiry env vars set. The current one.com hosting can't run it.
