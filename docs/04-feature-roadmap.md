# 04 — Feature roadmap and implementation plan

Inputs: `01-codebase-audit.md` (what we have) and `03-competitor-analysis.md` (what the market does). Competitor codes as in 03: ALT Altezza, EZT Easy Travel, LKA Lion King, ZOH Zohar, ZAR Zara, SOT Soul of Tanzania, SOA Shadows of Africa, OZN Ozon Light, DUM Duma Explorer, KLA Kla Adventures, KOJ Kojuu, NKO Nkollo.

## 1. Gap analysis

| # | Feature | Who does it well | Market count | We have it? |
|---|---|---|---|---|
| 1 | Day-by-day itinerary with lodge per night, meals, activities | ALT, EZT, LKA, KLA, SUR | 18/20 day-by-day; 13/20 lodge per night | ❌ No (summary + body copy only) |
| 2 | Inclusions **and** exclusions | EZT, ALT, LKA, KOJ | 12/20 | ◐ Partial (inclusions only) |
| 3 | Published "from" price | ALT, LKA, KLA, KOJ, ZAR | 9/20 | ◐ Field exists, never filled |
| 4 | Price grid by season × group size | ALT, LKA, ZOH, ZAR | 4/20 | ❌ No |
| 5 | Park & concession fee table as data, with breakdown | nobody | 0/20 | ❌ No |
| 6 | Listing filters (length, budget, park, month, style) | SOA, KLA, OZN, SOT | 5/20, none with month + park | ◐ Country tabs only |
| 7 | Route map per itinerary | SUR, EZT, SOT, ZOH | 4/20 | ◐ Route line (stops), no map |
| 8 | Kilimanjaro altitude profile + success-rate info | ALT (rates); nobody charts altitude | 0/20 charts | ❌ No |
| 9 | Great Migration month-by-month guidance | ALT, DUM, ZOH, SOA | 8/20 | ◐ Blog post + country month picker |
| 10 | WhatsApp click-to-chat with tour context | EZT, SGT (pre-filled) | 13/20 have WhatsApp | ◐ Links exist, no context, placeholder number |
| 11 | Deposit and cancellation terms published | EZT, DUM, ZAR, NKO, KOJ | 4–5/20 | ❌ No |
| 12 | Trust: licence number, TATO, KPAP, real reviews | EZT, ALT | 0/20 show a licence no. | ❌ No (placeholder reviews) |
| 13 | Privacy policy, booking terms, consent | EZT, DUM, KOJ | n/a | ❌ No |
| 14 | Zanzibar and cultural add-ons | 17/20 offer Zanzibar | 17/20 | ◐ Zanzibar trips exist; no add-on model |
| 15 | Downloadable PDF itinerary/quote | SUR, SOT, OZN | 6/20 | ❌ No |
| 16 | Safari trip builder with live estimate | nobody (SOT has a wizard, no price) | 0/20 | ❌ No |
| 17 | Quote → deposit → balance pipeline + admin | ALT (Kili deposit only) | 0/20 for safaris | ❌ No |
| 18 | Payments: card + mobile money + bank, USD & TZS | nobody offers mobile money | 0/20 | ❌ No |
| 19 | Multi-language + currency switcher | OZN, ALT | 8/20 languages, 2/20 currency | ❌ No |
| 20 | Structured data (TouristTrip + Offer, FAQ, Breadcrumb) | ALT (FAQPage) | n/a | ◐ TouristTrip without offers |
| 21 | Spam protection + analytics | n/a | n/a | ◐ Honeypot only, no analytics |
| 22 | Content-correctness guard (expired prices, placeholders) | nobody: 20/20 had errors | 0/20 | ◐ Build fails on missing fields only |

## 2. Prioritisation (MoSCoW)

Effort: S ≤ 1 day · M 2–4 days · L 1–2 weeks. Impact: **B**ookings · **T**rust · **S**EO · **O**ps.

| # | Feature | MoSCoW | Effort | Impact | Notes |
|---|---|---|---|---|---|
| 1 | Itinerary data model + day-by-day detail page | **Must** | L | B S | Phase 5 |
| 2 | Inclusions + exclusions | **Must** | S | B T | part of #1 |
| 3–4 | Pricing: seasons × group size, "from" price, validity dates | **Must** | M | B T | expired prices hidden automatically |
| 5 | Park-fee table (yearly data) + per-trip fee breakdown | **Must** | M | T O | the gap nobody fills |
| 6 | Listing filters (type, length, budget, park, month, style) | **Must** | M | B S | URL-shareable |
| 7 | Route map per itinerary | **Must** | S | B | SVG from coordinates, no map API key |
| 8 | Kilimanjaro altitude profile + route facts | **Must** | S | B S | part of the itinerary page |
| 10 | WhatsApp with pre-filled tour/page context | **Must** | S | B | |
| 11 | Deposit/cancellation terms page | **Must** | S | T | template, owner to confirm |
| 12 | Trust block (licence no., TATO, KPAP) + hide fake reviews | **Must** | S | T | C2 from audit |
| 13 | Privacy policy, terms, consent line | **Must** | S | T O | legal review needed |
| 21 | Turnstile spam check (when key set) + analytics (when ID set) | **Must** | S | O | needs owner keys to go live |
| 22 | Launch check: placeholders, expired prices | **Must** | S | T | `npm run check:launch` |
| 14 | Add-ons (Zanzibar, cultural) in the model | **Should** | S | B | model + data now; selector UI later |
| 9 | Interactive migration calendar page | **Should** | M | S | data from itineraries + parks |
| 20 | TouristTrip + Offer structured data | **Should** | S | S | offers only when prices are confirmed |
| 15 | PDF itinerary / quote | **Should** | M | B | server-side render |
| 16 | Trip builder with live estimate | **Should** | L | B | differentiator, reuses #3–5 |
| 17 | Quote → deposit → balance pipeline + admin dashboard | **Should** | L | O B | needs database + auth |
| 18 | Payments (card + mobile money + bank) | **Should** | L | B | needs merchant account |
| 19 | Languages (DE, FR, ES) + currency (USD/EUR/GBP/TZS) | **Could** | L | B S | after content is final |
| — | Live chat, newsletter, brochure download | **Could** | S–M | B | |
| — | Instant booking without a consultant | **Won't (now)** | — | — | tailor-made sales need a human; deposit-after-quote covers it |
| — | Building our own review platform | **Won't** | — | — | embed TripAdvisor/SafariBookings/Google instead |

**Decision taken for this phase:** all **Must** items that don't need an external account are built now (sections 4–5). The **Should/Could** items need owner decisions or accounts (database, payment merchant, translators). They're planned below but **not** built until you approve them.

## 3. Architecture decision for the data model

| Option | Pros | Cons |
|---|---|---|
| **A. Typed data files + Zod validation (built now)** | No hosting cost; fully static pages (fast, cheap); validation fails the build on bad data; versioned in git | Edits need a developer or a git-based CMS |
| B. Postgres (Supabase/Neon) + Drizzle | Owner can edit prices and fees in a table UI; needed anyway for quotes and bookings | Needs an account, credentials and hosting decisions |

**Built:** option A, with the SQL migration for option B written alongside (`database/migrations/0001_itineraries.sql`). The schema mirrors the Zod types one-to-one. Moving to a database in Sprint 4 means writing a loader, not redesigning the model. Pages read through one module (`src/features/itineraries/data.ts`), so the switch touches one file.

## 4. Implementation plan by sprint

### Sprint 0: hygiene and trust (✅ built in this phase)

| Task | Files | Data changes | Acceptance criteria |
|---|---|---|---|
| Hide placeholder reviews | `src/content/testimonials.ts`, `src/app/page.tsx` | `sample: true` flag on testimonials | Homepage shows no review section while every review is a sample; adding one real review shows the section |
| Trust details in config | `src/config/site.ts`, `src/components/layout/Footer.tsx` | `site.licences` (TALA no., TATO no., KPAP) | Footer shows each item only when filled |
| WhatsApp helper with context | `src/lib/whatsapp.ts`, CTA components | none | Every WhatsApp link opens with a message naming the page or tour |
| Privacy, terms, booking conditions | `src/app/privacy/`, `src/app/terms/`, enquiry form consent line, footer links | none | Pages build, are in the sitemap, are linked from the footer and form; marked for legal review |
| Spam protection | `src/app/api/enquiry/route.ts`, `src/lib/turnstile.ts`, form | env `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | With keys set the token is verified (tested); without keys the honeypot still works |
| Analytics hook | `src/components/layout/Analytics.tsx` | env `NEXT_PUBLIC_GA_ID` | Nothing loads without the ID; with it, GA4 loads and fires `generate_lead` on enquiry success |
| Launch check | `scripts/check-launch.ts`, `package.json` | none | `npm run check:launch` fails while phone, WhatsApp, address or licence are placeholders, or any published price is expired |
| Hero video weight | `src/app/page.tsx` | none | Video uses `preload="metadata"`; the photo stays the LCP element |

### Sprint 1: itinerary model, catalogue and pages (✅ built, Phase 5)

| Task | Files | Data changes | Acceptance criteria |
|---|---|---|---|
| Zod schema + types | `src/features/itineraries/schema.ts` | Itinerary, Day, Stay, PriceTable, Season, ParkFee, AddOn, Place | Invalid data fails `npm test` and `npm run build` with a clear message |
| SQL migration | `database/migrations/0001_itineraries.sql` | same tables in Postgres | Runs cleanly on Postgres 15+ |
| Seed catalogue | `src/content/itineraries/*.ts`, `stays.ts`, `places.ts`, `add-ons.ts`, `src/content/pricing/*.ts` | ~30 itineraries (brief list + migrated existing tours), all prices `isPlaceholder: true` | Every brief itinerary exists; every price shows a "to be confirmed" note |
| Data access + derived values | `src/features/itineraries/data.ts`, `pricing.ts`, `park-fees.ts` | none | From-price, season lookup, fee estimate covered by tests |
| Listing with filters | `src/app/tours/page.tsx`, `features/itineraries/components/ItineraryFilters.tsx` | none | Filter by type, length, budget, park, month, style; state lives in the URL; works with JS off (shows all) |
| Detail page | `src/app/tours/[slug]/page.tsx` + components | none | Layout in `05-itinerary-design.md`; Lighthouse-friendly (static, no client JS except filters, accordion and sticky bar) |
| Old Markdown tours | moved to `_archive/` after migration | none | Every old slug still resolves; no route is lost |

### Sprint 2: Should items, part 1 (needs your go-ahead)

| Task | Files | Data changes | Acceptance criteria |
|---|---|---|---|
| Interactive migration calendar `/great-migration` | `src/app/great-migration/page.tsx`, `features/migration/` | `migration.ts` month → area, events, matching itineraries | 12 months, each linking to fitting itineraries |
| Add-on selector on enquiry | `EnquiryForm`, enquiry API | `addOns` field | Chosen add-ons arrive in the email or webhook |
| PDF itinerary | `src/app/tours/[slug]/pdf/route.ts` (`@react-pdf/renderer`) | none | Downloads a branded PDF of the same data, under 1 MB |
| TouristTrip `offers` | detail page | none | Only emitted for non-placeholder prices; passes Google's Rich Results test |

### Sprint 3: trip builder (differentiator)
- **Builder:** `/plan` with steps for parks/regions, days per park, lodge level, group size and month, then a live estimate. The estimate uses the stay-level nightly bands, vehicle and guide day rates, and the park-fee table; all are new data in `src/content/pricing/builder-rates.ts`.
- **Output:** "Send this plan" pre-fills the enquiry with a structured summary.
- **Acceptance:** the estimate matches the hand calculations in the tests; the fees used are visible to the traveller; a "placeholder" banner shows until rates are confirmed.

### Sprint 4: quote → deposit → balance pipeline + admin (needs a database)
- **Stack:** Supabase (Postgres + Auth + Storage) and Drizzle, re-using migration `0001` and adding `0002_bookings.sql`.
- **Tables:** `enquiry`, `quote` (versioned line items, valid-until), `booking` (status: quoted → accepted → deposit_paid → balance_due → paid → travelled), `payment`, `traveller`.
- **Admin (`/admin`, staff-only login):**
  - enquiry inbox
  - quote builder (start from an itinerary, edit lines)
  - send a quote link
  - see payments
  - automatic reminders for balance due (`depositPercent` and `balanceDueDays` from terms config)
- **Acceptance:** a test enquiry can go through to "deposit paid" in staging.

### Sprint 5: payments
- **Providers:** a Tanzanian aggregator covering **card + M-Pesa + Tigo Pesa (Mixx by Yas) + Airtel Money**. Candidates: Pesapal (used by OZN and NKO), DPO Pay (logo seen on PRO), Selcom, AzamPay. The owner picks one after comparing fees and settlement currency. Bank transfer shows as invoice instructions.
- **Currency:** quotes in USD. Mobile money is charged in TZS at a stored daily rate shown on the invoice.
- **Webhooks:** the provider's callback updates `payment` and `booking`, and checks signatures.
- **Acceptance:** sandbox payments in each method mark the deposit paid; refunds are documented.

### Sprint 6: languages and currency (Could)
- **Languages:** `next-intl` with `/de`, `/fr`, `/es` prefixes, `hreflang`, translated itinerary fields (`title`, `summary`, `days[].title/description`) and a professional translation workflow.
- **Currency:** a display switcher for USD/EUR/GBP/TZS using a daily rate. Bookings still settle in USD.

## 5. What the owner must provide

| Item | Needed for |
|---|---|
| Real phone, WhatsApp, office address | launch (audit C1) |
| TALA licence number, TATO membership number, KPAP status | trust block |
| Confirmed prices per itinerary (season × group size) and 2026/27 park fees | replace placeholders |
| Deposit %, balance due days, cancellation scale | terms page |
| Lawyer review of privacy and terms | launch |
| Real reviews (or TripAdvisor/SafariBookings widget code) | trust |
| Cloudflare Turnstile keys, GA4 measurement ID | spam protection, analytics |
| Choice of database and payment provider | Sprints 4–5 |
