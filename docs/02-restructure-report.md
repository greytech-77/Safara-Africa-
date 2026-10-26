# 02 — Restructure report

Completed 26 October 2026 in the working copy `safara-africa-platform/`. The original project folder `safara-africa-next/` is untouched from the Phase 1 audit commit onwards.

## Result

| Check | Result |
|---|---|
| `npm run typecheck` | ✅ passes |
| `npm run lint` | ✅ 0 errors, 8 warnings (see "Follow-ups") |
| `npm run format:check` | ✅ all files formatted |
| `npm test` | ✅ 11 tests pass (2 files) |
| `npm run build` | ✅ passes |
| Built routes vs. the original | ✅ **identical**: same 105 prerendered pages and route handlers (diff of `.next/server/app`) |
| `npm audit` | ✅ 0 vulnerabilities (now possible thanks to the lockfile) |

Commits:

| Commit | Content |
|---|---|
| `e8dbd24` | checkpoint: before phase 2 |
| `8766393` | moves (`git mv`), import fixes, tooling, tests, README |
| `0c738a2` | Prettier formatting only, kept separate so the move diff is readable |

## New tree

```
safara-africa-platform/
├── .editorconfig  .gitattributes  .nvmrc  .prettierrc  .prettierignore    (new)
├── eslint.config.mjs  vitest.config.mts  package-lock.json                 (new)
├── .env.example  .gitignore  README.md  next.config.ts  package.json  tsconfig.json  postcss.config.mjs
├── docs/                          01-codebase-audit.md, 02-restructure-report.md, REBUILD-NOTES.md
├── public/
│   ├── images/brand/              logo-navy.png, logo-white.png, wildebeest-navy.png
│   └── videos/                    hero-migration.mp4
├── tests/                         content.test.ts, enquiry-route.test.ts, stubs/empty.ts
└── src/
    ├── app/                       routes only (URLs unchanged)
    ├── components/
    │   ├── layout/                Header, HeaderShell, MegaMenu, MobileMenu, Footer, FloatingCta, Logo
    │   └── ui/                    Breadcrumb, CtaBlock, FaqList, ImageCards, JsonLd, PageHero,
    │                              MonthPicker, MonthRow, PillarArt, Reveal
    ├── features/
    │   ├── tours/components/      TourCard, TourGrid, RouteLine
    │   ├── enquiry/components/    EnquiryForm
    │   └── reviews/components/    Testimonials
    ├── config/                    site.ts, menu.ts
    ├── content/                   tours/*.md, posts/*.md, faqs.json, *.ts data
    ├── lib/                       content.ts (loaders), unsplash.ts
    ├── styles/                    globals.css
    └── types/                     content.ts
```

**Why this shape:** it follows the Next.js App Router conventions. `src/app` holds routes only; shared code sits outside `app`, reached through the existing `@/*` alias. The `features/` folders are where Phase 4 and 5 work (itineraries, pricing, bookings) will go. Empty `hooks/`, `server/` and `database/` folders weren't created; they'll appear with the first code that needs them.

## Move map (all with `git mv`, history kept)

| Old path | New path |
|---|---|
| `src/components/Header.tsx` | `src/components/layout/Header.tsx` |
| `src/components/HeaderShell.tsx` | `src/components/layout/HeaderShell.tsx` |
| `src/components/MegaMenu.tsx` | `src/components/layout/MegaMenu.tsx` |
| `src/components/MobileMenu.tsx` | `src/components/layout/MobileMenu.tsx` |
| `src/components/Footer.tsx` | `src/components/layout/Footer.tsx` |
| `src/components/FloatingCta.tsx` | `src/components/layout/FloatingCta.tsx` |
| `src/components/Logo.tsx` | `src/components/layout/Logo.tsx` |
| `src/components/Breadcrumb.tsx` | `src/components/ui/Breadcrumb.tsx` |
| `src/components/CtaBlock.tsx` | `src/components/ui/CtaBlock.tsx` |
| `src/components/FaqList.tsx` | `src/components/ui/FaqList.tsx` |
| `src/components/ImageCards.tsx` | `src/components/ui/ImageCards.tsx` |
| `src/components/JsonLd.tsx` | `src/components/ui/JsonLd.tsx` |
| `src/components/PageHero.tsx` | `src/components/ui/PageHero.tsx` |
| `src/components/MonthPicker.tsx` | `src/components/ui/MonthPicker.tsx` |
| `src/components/MonthRow.tsx` | `src/components/ui/MonthRow.tsx` |
| `src/components/PillarArt.tsx` | `src/components/ui/PillarArt.tsx` |
| `src/components/Reveal.tsx` | `src/components/ui/Reveal.tsx` |
| `src/components/TourCard.tsx` | `src/features/tours/components/TourCard.tsx` |
| `src/components/TourGrid.tsx` | `src/features/tours/components/TourGrid.tsx` |
| `src/components/RouteLine.tsx` | `src/features/tours/components/RouteLine.tsx` |
| `src/components/EnquiryForm.tsx` | `src/features/enquiry/components/EnquiryForm.tsx` |
| `src/components/Testimonials.tsx` | `src/features/reviews/components/Testimonials.tsx` |
| `src/content/unsplash.ts` | `src/lib/unsplash.ts` |
| `src/app/globals.css` | `src/styles/globals.css` |
| `public/logo-navy.png` | `public/images/brand/logo-navy.png` |
| `public/logo-white.png` | `public/images/brand/logo-white.png` |
| `public/wildebeest-navy.png` | `public/images/brand/wildebeest-navy.png` |
| `public/VQpxbxXqeeRh.mp4` | `public/videos/hero-migration.mp4` |
| Type declarations `Img`, `Stop`, `Tour`, `Post`, `Faq` in `src/lib/content.ts` and `MonthRating` in `src/content/beaches.ts` | `src/types/content.ts`; every importer now imports types from `@/types/content` |

Code references to the moved public files (logo in `Logo.tsx`, Open Graph image and JSON-LD logo in `layout.tsx`, watermark and hero video in `page.tsx`) were updated, and each new path was checked to exist on disk.

## Archived

Nothing. Phase 1 found no unused files (every component and content module is imported), so `_archive/` wasn't created.

## Naming convention

| Kind | Convention | Example |
|---|---|---|
| React components | `PascalCase.tsx`, default export | `TourCard.tsx` |
| Other modules (lib, types, config, tests) | `kebab-case.ts` | `content.ts`, `enquiry-route.test.ts` |
| Hooks (when added) | `use-thing.ts` | |
| Variables, functions | `camelCase` | `getTours` |
| Module constants | `UPPER_SNAKE` | `OPEN_DELAY` |
| Route folders | Next.js conventions, kebab-case | `travel-styles/[slug]` |

The existing code already followed this, so no renames were needed beyond the hero video (`VQpxbxXqeeRh.mp4` → `hero-migration.mp4`).

## Secrets and environment

There are no secrets in the code (checked in Phase 1). `.env` and `.env.*` are gitignored, with `.env.example` kept as the template. No change was needed.

## Tooling added

| Tool | Version | Config |
|---|---|---|
| ESLint | 9.39 | `eslint.config.mjs`: `eslint-config-next` core-web-vitals + TypeScript. Next 16 removed `next lint`, so the script runs `eslint .` |
| Prettier | 3.9 | `.prettierrc`: single quotes, trailing commas, 140 columns (matches the existing style) |
| Vitest | 5.0 | `vitest.config.mts`: Node environment, `@` alias, `server-only` stubbed for tests |
| EditorConfig, `.gitattributes` | | LF line endings everywhere (fixes the CRLF warnings) |
| `.nvmrc` | | Node 22 |

**Scripts:** `dev`, `build`, `start`, `typecheck`, `lint`, `format`, `format:check`, `test`, and `check` (typecheck + lint + format check + tests).

**Baseline tests:**
- `tests/content.test.ts`: 17+ tours load, slugs are unique, every tour's country exists, nights fit the tour length, every lodge's park and country exist, posts are sorted newest first, and FAQs load.
- `tests/enquiry-route.test.ts`: the route rejects a missing name and an invalid email, silently accepts honeypot submissions, accepts a valid enquiry in development, and returns 503 in production with no delivery configured.

## Follow-ups (not fixed here: Phase 2 is moves only)

ESLint's React Compiler rules, new in `eslint-config-next` 16, flag effects that work today. Two rules are set to `warn` in `eslint.config.mjs` until these are refactored:

| File | Rule | Note |
|---|---|---|
| `src/components/layout/MegaMenu.tsx:31` | set-state-in-effect | Closes the menu on route change |
| `src/components/layout/MegaMenu.tsx:76` | purity | `Date.now()` inside a click handler: a false positive |
| `src/components/layout/MobileMenu.tsx:28` | set-state-in-effect | Closes the menu on route change |
| `src/components/ui/MonthPicker.tsx:11` | set-state-in-effect | Opens on the current month (audit L11) |
| `src/features/tours/components/TourGrid.tsx:20` | set-state-in-effect | Reads `?country=`; this file is rewritten in Phase 5 |
