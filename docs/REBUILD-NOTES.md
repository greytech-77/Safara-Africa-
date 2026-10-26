# How the current safaraafrica.com is built

Examined 20 October 2026 from the public pages and the WordPress REST index (`/wp-json/`). Nothing behind a login was accessed.

## Stack (observed)

| Layer | Evidence | Finding |
|---|---|---|
| CMS | `/wp-json/` responds; `wp-content/uploads` paths | WordPress, static front page (ID 17883), posts page ID 372 |
| Hosting | REST namespaces `onecom-plugins/v1`, `onecom-marketplace/v1`, `mcp/onecom-mcp`; `_oct_exclude_from_cache` post meta | one.com managed WordPress with its performance cache |
| Media | image URLs on `www-static.safaraafrica.com` | separate static/CDN subdomain for uploads |
| Theme | `trx_addons/v1` namespace, `cpt_layouts` template type, `portfolio` and `portfolio_group` URLs, AncoraThemes social links in the side panel | a commercial AncoraThemes (ThemeREX) theme with its `trx_addons` plugin; tours are "portfolio" items |
| Page builder | `elementor/v1`, `elementor-one/v1`, `elementor-ai/v1`, `elementor/thumbs/` image paths | Elementor (with Elementor One, AI, Image Optimizer) |
| Slider | meta generator "Slider Revolution 6.7.18", `sliderrevolution` namespace | hero is a Slider Revolution slider |
| Leads | `leadin/v1` namespace; "Book now" → `share.hsforms.com/...` | HubSpot plugin and a hosted HubSpot form |
| Itineraries | links to `itinerary.safaraafrica.com/Itinerary/Landing/{guid}` | external itinerary tool on a subdomain |
| Analytics | `monsterinsights/v1`, `google-site-kit/v1` | two analytics plugins |
| Spam | `akismet/v1` | Akismet |

## Inferred (not confirmed)

- The itinerary subdomain's URL pattern matches **Wetu** itinerary landing pages, white-labelled via DNS. Confirm with the client; the rebuild simply links out via `itineraryUrl`.
- An image named `belicia-logo-inverse.png` on the booking page suggests the theme was started from a different ThemeREX demo.

## Unknown

- Exact theme name and version (the theme's stylesheet header wasn't inspected).
- Whether HubSpot forms feed a CRM pipeline the team relies on (affects which form option to choose).

## Content inventory

- **Tours (3):** Namibia Luxury (10 days), Fly over Namibia (10 days), Namibia Classic (11 days)
- **Home sections:** hero slider, tour packages, four service types, "A journey beyond the ordinary" about block, custom-trip CTA, recent journal posts
- **Tour page:** gallery, "who is this for", description, external itinerary link, other tours, six "why Safara" points
- **Pages:** FAQs, Contact, Online Booking (demo content), `/stacked/` (theme demo)
- **Blog (4 posts):** all dated 25–28 Feb 2023, category "Tourism"
- **Contact:** Schanzen Road, Eros, Windhoek; info@safaraafrica.com; +264 81 396 3536; Mon–Fri 9–6, Sat 9–4, Sun closed

## Defects on the live site (fixed in the rebuild)

| Issue | Where | Fix |
|---|---|---|
| Theme vendor's Facebook/Twitter/Dribbble/Instagram links | slide-out panel, every page | social links come from `site.social`, hidden when empty |
| `info@website.com` placeholder | slide-out panel | removed |
| Fake New York address and +1(800) phone | /online-booking/ | page removed, redirected to /contact |
| Share-by-email link goes to `test@fwe.com` | contact page | removed |
| Call link `tel:+26481396356` doesn't match displayed number (one digit missing) | contact page | single phone setting; confirm before launch |
| "Fly over Namibia" card links to the Classic tour | home page | each tour has its own URL |
| "Top Tours" / footer "Tours" link to `/stacked/` demo page | home, footer | link to /tours; old URL redirected |
| "Book now" points to three different destinations | header variants | one "Plan your trip" action → /contact#enquire |
| Site timezone Europe/London for a Windhoek business | WP settings | hours labelled Namibia time; `site.timezone` set |
| Heavy plugin stack (Elementor + Slider Revolution + 2 analytics) | all pages | Next.js with static pages, no slider library, add one analytics tool |

## Design direction for the rebuild

- **Logo:** "Safara Africa Expeditions" script wordmark with a leaping wildebeest, used in white over photos and the footer, navy on light backgrounds.
- **Palette** from the logo and the landscape: navy `#2C4058` (headings, dark sections), deep navy `#1F2E40` (footer), salt-pan ground `#EDEEE8`, ink `#1F2A36`, gold `#9A6A17` (buttons, the single accent), sun `#C08A2E` (route dots).
- **Type:** Gloock for headlines, Karla for text, on a 1.25 modular scale.
- **Signature element:** the route line. Every journey is shown as its real sequence of stops and nights, on the hero, cards and tour pages, replacing the generic slider.
- One motion moment: the hero route draws in on load; reduced-motion users see it static.
