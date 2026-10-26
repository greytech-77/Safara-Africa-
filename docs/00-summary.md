# 00 — Summary

Work carried out 26 October 2026 on a copy of the project, `safara-africa-platform/`. The original folder `safara-africa-next/` was left exactly as it was after the Phase 1 audit commit.

## Where everything is

| Document | Content |
|---|---|
| `01-codebase-audit.md` | What the site was, stack, feature inventory, issues ranked Critical → Low |
| `02-restructure-report.md` | New folder structure, move map, tooling, build confirmation |
| `03-competitor-analysis.md` | 20 Arusha operators: ranking, site-by-site analysis, comparison matrix, market patterns |
| `04-feature-roadmap.md` | Gap analysis, MoSCoW priorities, sprint plan with acceptance criteria |
| `05-itinerary-design.md` | Itinerary page layout, mobile rules, data model, seed catalogue, fee calculation |
| `database/README.md` | The SQL version of the data model and how to switch to a database |

## What changed

**Phase 2: structure.** Files moved with `git mv`, so history is kept:
- components are split into `components/layout`, `components/ui` and `features/*`
- shared types are in `src/types`, styles in `src/styles`, brand assets in `public/images/brand`

Every built page and URL stayed identical. A lockfile, ESLint, Prettier, Vitest, `.editorconfig`, `.gitattributes`, `.nvmrc` and a `check` script were added.

**Phase 3: research.** 20 operators were ranked by verified SafariBookings ratings and checked against the TATO directory. Six to ten pages per company were analysed.
- **Biggest gaps in the market:**
  - No one offers mobile money or online deposits for safaris.
  - No one has a trip builder with live prices, a park-fee breakdown, Kilimanjaro altitude charts or a visible licence number.
  - All 20 sites had visible content errors.
- **Method limits:** the Chrome extension tools didn't load in this session, TripAdvisor blocked all automated requests (HTTP 403), and Google PageSpeed was rate-limited (HTTP 429). Pages were read with a text fetcher instead, and the report says where that limits the findings.

**Phase 4: roadmap and Must features**, each committed separately with tests:

| Feature | Fixes |
|---|---|
| Placeholder reviews hidden until real ones exist | Audit C2 |
| WhatsApp links pre-filled with the page or trip name | M9 |
| Licence/TATO/KPAP lines in the footer (appear once filled in) | M7 |
| `/privacy` and `/terms` templates, privacy note under the enquiry form | H5 |
| Deposit, balance and cancellation scale in config, shown on `/terms` and on every price table | — |
| Turnstile spam check (when keys are set) and a per-IP limit on enquiries | H6 |
| GA4 hook with a `generate_lead` event (when an ID is set) | H7 |
| Hero video no longer downloads in full on page load | H4 |
| `npm run check:launch`: fails while any placeholder that must not go live remains | C1, C3 |

**Phase 5: itinerary system.**
- **Data model:** a Zod schema validates every trip and cross-reference at build time. `database/migrations/0001_itineraries.sql` mirrors it and was test-run on Postgres (PGlite).
- **Catalogue:** 27 itineraries. That's all 14 from the brief (day trips, 3/4/5/7-day safaris, three Great Migration routes by season, Machame, Lemosho, Marangu, Meru, safari + Zanzibar) plus the 13 earlier tours, migrated with full day-by-day plans.
- **Add-ons:** 7 (Maasai village, Lake Eyasi, Mto wa Mbu, Materuni, balloon, Zanzibar extension, Stone Town).
- **Placeholders:** every price and park fee is marked **PLACEHOLDER: owner to confirm**, and the pages say so.
- **`/tours` listing:** filters by type, length, budget, month, park, experience and country. The filters are kept in the URL; every trip still shows without JavaScript.
- **`/tours/[slug]` detail page:**
  - key facts with a best-months strip
  - generated route map
  - altitude profile for treks (no competitor has one)
  - day-by-day accordion with the lodge and meals for each night
  - season × group-size price table
  - **park-fee breakdown computed from the yearly fee table** (no competitor has one)
  - inclusions and exclusions, add-ons, FAQs
  - sticky quote/WhatsApp panel, which becomes a bottom bar on phones
- **Other improvements:**
  - Park and lodge pages now match trips by slug rather than place name (audit M1).
  - Lodge pages list the trips that stay there.
  - Tour grids no longer send tour data to the browser (M3).
  - Expired price tables are hidden automatically.
- **Old content:** the old Markdown tours were moved to `_archive/` (see `_archive/README.md`). The four replaced URLs redirect permanently.

## Verification (final state)

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ |
| `npm run lint` | ✅ 0 errors, 6 warnings (pre-existing effect patterns flagged by the new React Compiler rules; listed in `02-restructure-report.md`) |
| `npm run format:check` | ✅ |
| `npm test` | ✅ 46 tests: content integrity, itinerary catalogue, pricing, park fees, filters, enquiry API, spam guard, booking terms, reviews, launch check |
| `npm run build` | ✅ 114 static pages |
| Pages in a real browser (headless Chrome, 390 px and 1366 px) | ✅ no sideways scrolling on the pages checked; two layout bugs found this way were fixed |
| `npm audit` | ✅ 0 vulnerabilities |
| `npm run check:launch` | ❌ fails, as intended, until the owner replaces the placeholders below |

## What you need to do

| # | Item | Where |
|---|---|---|
| 1 | Real phone, WhatsApp, office address, **TALA licence number** (and TATO number, KPAP status) | `src/config/site.ts` |
| 2 | Confirm deposit %, balance days and cancellation scale; set `isPlaceholder: false` | `src/config/site.ts` → `booking` |
| 3 | Lawyer review of the privacy policy and booking terms | `/privacy`, `/terms` |
| 4 | Real prices per trip (season × group size) and current **TANAPA/NCAA fees** | `src/content/itineraries/*.ts`, `src/content/pricing/park-fees.ts` |
| 5 | Confirm the lodges named are ones you contract; adjust the price seasons | `src/content/stays.ts`, `src/content/pricing/seasons.ts` |
| 6 | Publish your own Kilimanjaro summit records and porter-welfare details (FAQ text marked CONFIRM) | `src/content/itineraries/mountains.ts` |
| 7 | Real reviews, with permission | `src/content/testimonials.ts` |
| 8 | Own photos to replace the Unsplash placeholders | `public/images/` |
| 9 | Accounts and keys: Resend **or** a CRM webhook, Cloudflare Turnstile, GA4 | host environment variables (see `.env.example`) |
| 10 | Hosting: Vercel (or Netlify/Cloudflare). The current one.com hosting can't run Next.js | — |

Run `npm run check:launch` until it says "Ready to launch".

## Still on the roadmap (needs your decision)

Each is planned in `04-feature-roadmap.md` with files, data changes and acceptance criteria:

| Sprint | Feature | Needs from you |
|---|---|---|
| 2 | Interactive Great Migration calendar, add-on selector in the enquiry form, PDF itinerary, TouristTrip `offers` (already wired; switches on when prices are confirmed) | go-ahead |
| 3 | Safari trip builder with a live estimate (differentiator) | confirmed rates for vehicles, guides and lodges |
| 4 | Quote → deposit → balance pipeline with a staff dashboard | database choice (Supabase recommended) |
| 5 | Payments: card + M-Pesa / Mixx by Yas / Airtel Money + bank transfer, USD and TZS (no competitor offers mobile money) | merchant account with a Tanzanian aggregator (Pesapal, DPO Pay, Selcom or AzamPay) |
| 6 | German, French and Spanish, plus a currency switcher | translator, final English copy |

**Also open:**
- **Lint warnings:** refactor the six React Compiler warnings (MegaMenu, MobileMenu, MonthPicker effects).
- **Hero video:** compress it to about 1.5 MB (it still weighs 6.3 MB on disk).
- **Logo:** replace the PNG logo with an SVG.
