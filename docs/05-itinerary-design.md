# 05 — Itinerary design system

How Safara Africa itineraries are modelled, priced and displayed. It builds on the patterns found in `03-competitor-analysis.md` (competitor codes as there).

## 1. Best practice observed

| Pattern | Done best by | What we take from it |
|---|---|---|
| Day-by-day with the lodge named for every night | EZT, ALT, LKA, KLA, ZOH | Every day carries a `stay` reference; no "lodge in the Serengeti" without a name |
| Lodge options per comfort tier | ALT, LKA | Each stay has a `level` (budget / mid / luxury); one itinerary can show the tier it is priced at |
| Meals per day as a structured line | KLA, OZN, SUR | `meals: { b, l, d }` per day, shown as B · L · D chips |
| Per-day logistics (drive time, km, game-drive hours) | SUR, SGT | `driveHours` per day |
| Route map | EZT, SOT, SUR, ZOH | Static map of the stops in order: every competitor that has one uses an image; ours is generated from coordinates, so it can't drift from the itinerary |
| Price grid by season × group size, single supplement | ALT, LKA, ZOH, ZAR | `pricing.rows[]` (season, group size, price per person) + `singleSupplementUsd`, with validity dates |
| Deposit terms beside the price | EZT, DUM, ZAR | Price block links to `/terms`, using the deposit % from config |
| Inclusions *and* exclusions | EZT, ALT, KOJ | Both lists required by the schema |
| Kilimanjaro altitudes per day, success rate per route | ALT (rates), KLA/PRO/ZOH (altitudes in text) | `trek` stage per day → altitude profile chart (nobody in the market has one) |
| Monthly suitability strip | SOA (Good/Better/Best), DUM (monthly table) | `bestMonths` shown as a 12-month strip on the facts bar |
| Pre-filled "request this trip" | SOT | CTA carries the trip slug to the enquiry form and the trip name to WhatsApp |
| FAQ on the itinerary page | EZT, SUR | `faqs[]` per itinerary, with FAQPage structured data |

**Mistakes we design out** (seen in 20/20 competitors): expired price tables, day counts that don't match the title, inclusions naming different lodges from the day-by-day, duplicated day text, placeholder contact details. The schema and build-time checks reject these (section 5).

## 2. Page layout: `/tours/[slug]`

```
┌──────────────────────────────────────────────────────────────┐
│ HERO photo · breadcrumb · "7 days · Mid Range · Safari"      │
│ Title                                                        │
│ Route line (Arusha → Tarangire → … stops and nights)         │
├──────────────────────────────────────────────────────────────┤
│ KEY FACTS BAR  Days | Parks | From $X pp* | Best months strip │
│                | Difficulty | Start → End                    │
├───────────────────────────────────────┬──────────────────────┤
│ Summary + highlights                  │ STICKY SIDEBAR       │
│ ROUTE MAP (SVG, numbered stops)       │  From $X pp (2 pax)  │
│ ALTITUDE PROFILE (treks only)         │  [Request a quote]   │
│ DAY-BY-DAY (accordion, Day 1 open)    │  [WhatsApp us]       │
│   Day n · title                       │  deposit note        │
│   drive time · parks                  │                      │
│   description                         │                      │
│   activities chips                    │                      │
│   ▢ Lodge card: name, level, type     │                      │
│   Meals: B · L · D                    │                      │
│ PRICES: season × group size table     │                      │
│   + single supplement + validity      │                      │
│   + park & concession fee breakdown   │                      │
│ INCLUDED | NOT INCLUDED (two columns) │                      │
│ ADD-ONS (Zanzibar, cultural)          │                      │
│ FAQs                                  │                      │
│ REVIEWS (only when real reviews exist)│                      │
├───────────────────────────────────────┴──────────────────────┤
│ Similar itineraries · closing CTA                            │
└──────────────────────────────────────────────────────────────┘
* "Placeholder: owner to confirm" label until prices are confirmed
```

**Content rules**
- The title states the length ("7-Day Northern Circuit Classic").
- The summary is at most 300 characters and is also used as the meta description.
- Each day description is 1–4 sentences.
- Lodges are named, with "or similar" added automatically.
- Prices are per person in USD for a stated group size and season.

## 3. Mobile layout

- **Hero:** shorter (60vh). The route line wraps.
- **Facts bar:** two-column grid of six facts. The month strip scrolls sideways.
- **Day-by-day:** Day 1 is open; the other days collapse into `<details>` elements, which work without JavaScript. Each day's summary line shows the day number, title and overnight place.
- **Price table:** scrolls sideways inside its container, with the season column fixed on the left. The page itself never scrolls sideways.
- **Sticky sidebar:** becomes a **bottom bar**: "Request quote" plus a WhatsApp icon. The site-wide floating Call/Enquire bar is hidden on itinerary pages, so there aren't two bars.
- **Map and altitude chart:** full-width SVG that scales to the screen, with labels kept at 12px or more.

## 4. Data model (Deliverable B)

Types and validation: `src/features/itineraries/schema.ts` (Zod). SQL equivalent: `database/migrations/0001_itineraries.sql`.

```
Place        slug, name, kind (city|park|lake|mountain|island|village|airport), lat, lng, park? (→ parks.ts slug)
Stay         slug, name, level (mountain|budget|mid|luxury), type (lodge|tented-camp|mobile-camp|hotel|hut|campsite|beach-resort),
             place → Place, accommodation? (→ /accommodations page), nightlyFee? { park, feeType }
Itinerary    slug, title, summary, kind (safari|trek|beach|combo|day-trip), country, travelStyle, tier, difficulty,
             bestMonths[1..12], styles[] (journey/trek/beach tags), hero, gallery[], highlights[], idealFor[],
             days[] → ItineraryDay, included[], excluded[], pricing? → Pricing, addOns[] → AddOn, faqs[],
             trek? { route, summitAltM, successRateNote }, order, draft, lastReviewed
ItineraryDay day (1..n), title, description, places[] → Place (last = overnight), parks[] (fee units),
             driveHours?, activities[], craterDescent?, meals {b,l,d}, stay → Stay | null,
             trek? { startAltM, maxAltM, sleepAltM, hikeHours, distanceKm }
Pricing      tier, validFrom, validTo, rows[] { season, groupSize, perPersonUsd }, singleSupplementUsd?, isPlaceholder, note?
Season       id (low|shoulder|high|peak), label, ranges[] { from MM-DD, to MM-DD }          (content/pricing/seasons.ts)
ParkFee      park, authority (TANAPA|NCAA|KINAPA|ZNZ|other), feeType (conservation|concession|camping|hut|rescue|crater-service),
             unit (person-day|person-night|person-trip|vehicle-entry), residency, age (adult|child), amountUsd,
             vatIncluded, validFrom, validTo, isPlaceholder, source                         (content/pricing/park-fees.ts)
AddOn        slug, title, kind (beach|cultural|activity), days, summary, priceFromUsd?, isPlaceholder, places[]
```

**Validation rules** (they fail tests and the build):
- `days.length` equals `days` and days are numbered 1…n.
- Every place, stay, add-on and fee-park reference exists. `country` and `styles` exist in the content files.
- Pricing rows are unique per season and group size, and `validFrom` comes before `validTo`.
- `kind: 'trek'` requires `trek` data on every mountain day.
- `bestMonths` contains unique values from 1 to 12.
- `included` and `excluded` each have at least one item.
- The summary is at most 300 characters.

**Derived values** (never stored):
- The "from" price is the lowest per-person price among currently valid rows.
- The season for a date is looked up from `seasons.ts`.
- The route (stops with nights) is grouped from the days' overnight places.
- The parks visited are the distinct park places across the days.
- The park-fee estimate is computed in `park-fees.ts` from the fee table, the days, the stays and the group (section 6).

## 5. Seed catalogue (Deliverable C)

Every price and fee is **PLACEHOLDER: owner to confirm** (`isPlaceholder: true`, shown on the page).

| Slug | Days | Kind | Notes |
|---|---|---|---|
| `tarangire-day-trip` | 1 | day-trip | from Arusha |
| `ngorongoro-crater-day-trip` | 1 | day-trip | crater descent, crater service fee |
| `tarangire-manyara-ngorongoro-3-days` | 3 | safari | |
| `serengeti-ngorongoro-4-days` | 4 | safari | |
| `tarangire-serengeti-ngorongoro-5-days` | 5 | safari | |
| `northern-circuit-classic-7-days` | 7 | safari | replaces old `tanzania-classic` |
| `great-migration-calving-8-days` | 8 | safari | Ndutu, Jan–Mar |
| `great-migration-central-serengeti-8-days` | 8 | safari | Apr–Jun, Nov–Dec |
| `great-migration-river-crossings-9-days` | 9 | safari | Northern Serengeti, Jul–Oct |
| `kilimanjaro-machame-7-days` | 7 | trek | replaces `kilimanjaro-machame` |
| `kilimanjaro-lemosho-8-days` | 8 | trek | replaces `kilimanjaro-lemosho` |
| `kilimanjaro-marangu-6-days` | 6 | trek | huts |
| `mount-meru-4-days` | 4 | trek | replaces `mount-meru-trek` |
| `safari-and-zanzibar-11-days` | 11 | combo | |
| Add-ons: `maasai-village-visit`, `lake-eyasi-hadzabe-datoga`, `mto-wa-mbu-cultural-walk`, `materuni-coffee-waterfalls`, `serengeti-balloon-safari`, `zanzibar-beach-extension`, `stone-town-and-spice-tour` | — | add-on | |
| Migrated from the old Markdown tours (13): `tanzania-luxury`, `tanzania-fly-in`, `zanzibar-beach-escape`, `zanzibar-nyerere-fly-in`, `mafia-whale-sharks`, `pemba-island-escape`, `ol-doinyo-lengai-natron`, `usambara-village-walk`, `kenya-mara-amboseli`, `kenya-samburu-mara-fly-in`, `uganda-gorillas-chimps`, `rwanda-gorilla-trek`, `rwanda-primates-akagera` | | | day-by-day written; old copy kept |

Old URLs of replaced tours redirect permanently to the new slugs (`next.config.ts`).

## 6. Park-fee breakdown: how it is calculated

For a group of *A* adults and *C* children (age 5–15) of one residency:

- **Conservation fees.** For each day, for each fee-park listed on that day, add the `person-day` fee × travellers.
- **Concession, camping and hut fees.** For each night where the stay has a `nightlyFee`, add the matching `person-night` fee × travellers.
- **Per-trip fees (rescue).** Add each `person-trip` fee once for each park in which it applies.
- **Crater service fee.** For each day with `craterDescent`, add the `vehicle-entry` fee × vehicles, where vehicles = ceil(group / 6).
- **VAT.** Fees stored without VAT get VAT added at the rate in `park-fees.ts` (placeholder).

The page shows each line, the total, the amount per person, the fee year, and the label "Fees set by TANAPA/NCAA, placeholder until confirmed".
