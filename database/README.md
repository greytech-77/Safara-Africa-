# Database

The site does not need a database yet. Itineraries, stays, places, seasons, park fees and add-ons are typed data files in `src/content/`, validated against the Zod schema in `src/features/itineraries/schema.ts` on every build and test run.

`migrations/0001_itineraries.sql` is the same model for PostgreSQL 15+, ready for the move to a database. That move is planned for Sprint 4 in `docs/04-feature-roadmap.md`, together with quotes and bookings.

## When you switch

1. Create the database (Supabase or Neon) and run the migration:
   `psql "$DATABASE_URL" -f database/migrations/0001_itineraries.sql`
2. Write a one-off seed script that inserts the current content files. The Zod types map one-to-one to the tables.
3. Change `src/features/itineraries/data.ts` to read from the database. Pages read only through that module, so nothing else changes.
4. Keep the Zod validation on the way out of the database, so bad rows still fail loudly.

## Conventions

- Slugs are the primary keys and match the URLs.
- Prices and fees carry `is_placeholder` until the owner confirms them; the site labels them.
- Park fees are kept per fee year (1 July – 30 June). Add new rows each year rather than editing old ones, so past quotes can still be explained.
