-- 0001_itineraries.sql
-- Itinerary data model for PostgreSQL 15+. Mirrors the Zod schema in src/features/itineraries/schema.ts.
-- Today the catalogue is read from typed files in src/content/; this migration is ready for the move to a database
-- (see docs/04-feature-roadmap.md, Sprint 4). Apply with: psql "$DATABASE_URL" -f database/migrations/0001_itineraries.sql

BEGIN;

CREATE TYPE place_kind      AS ENUM ('city', 'park', 'lake', 'mountain', 'island', 'village', 'airport');
CREATE TYPE stay_level      AS ENUM ('mountain', 'budget', 'mid', 'luxury');
CREATE TYPE stay_type       AS ENUM ('lodge', 'tented-camp', 'mobile-camp', 'hotel', 'hut', 'campsite', 'beach-resort', 'guesthouse');
CREATE TYPE itinerary_kind  AS ENUM ('safari', 'trek', 'beach', 'combo', 'day-trip');
CREATE TYPE travel_style    AS ENUM ('Private luxury', 'Fly-in', 'Guided', 'Trekking', 'Beach');
CREATE TYPE comfort_tier    AS ENUM ('Budget', 'Mid Range', 'Luxury');
CREATE TYPE difficulty      AS ENUM ('easy', 'moderate', 'challenging', 'strenuous');
CREATE TYPE price_season    AS ENUM ('low', 'shoulder', 'high', 'peak');
CREATE TYPE fee_authority   AS ENUM ('TANAPA', 'NCAA', 'ZNZ', 'other');
CREATE TYPE fee_type        AS ENUM ('conservation', 'concession', 'camping', 'hut', 'rescue', 'crater-service');
CREATE TYPE fee_unit        AS ENUM ('person-day', 'person-night', 'person-trip', 'vehicle-entry');
CREATE TYPE residency       AS ENUM ('non-resident', 'ea-resident');
CREATE TYPE age_band        AS ENUM ('adult', 'child');
CREATE TYPE list_kind       AS ENUM ('included', 'excluded', 'highlight', 'ideal-for');
CREATE TYPE add_on_kind     AS ENUM ('beach', 'cultural', 'activity');

CREATE TABLE place (
  slug        text PRIMARY KEY CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name        text NOT NULL,
  kind        place_kind NOT NULL,
  lat         numeric(7,4) NOT NULL CHECK (lat BETWEEN -12 AND 5),
  lng         numeric(7,4) NOT NULL CHECK (lng BETWEEN 28 AND 42),
  park_slug   text                                   -- slug of a park guide page, when the place is a park
);

CREATE TABLE stay (
  slug                text PRIMARY KEY CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name                text NOT NULL,
  level               stay_level NOT NULL,
  type                stay_type NOT NULL,
  place_slug          text NOT NULL REFERENCES place(slug),
  accommodation_slug  text,                          -- lodge page, when there is one
  nightly_fee_park    text,                          -- park whose concession/camping/hut fee applies per night
  nightly_fee_type    fee_type CHECK (nightly_fee_type IN ('concession', 'camping', 'hut')),
  CHECK ((nightly_fee_park IS NULL) = (nightly_fee_type IS NULL))
);

CREATE TABLE itinerary (
  slug              text PRIMARY KEY CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title             text NOT NULL,
  summary           text NOT NULL CHECK (char_length(summary) BETWEEN 40 AND 300),
  kind              itinerary_kind NOT NULL,
  country_slug      text NOT NULL,
  travel_style      travel_style NOT NULL,
  tier              comfort_tier NOT NULL,
  difficulty        difficulty NOT NULL,
  days              smallint NOT NULL CHECK (days > 0),
  best_months       smallint[] NOT NULL CHECK (array_length(best_months, 1) >= 1 AND best_months <@ ARRAY[1,2,3,4,5,6,7,8,9,10,11,12]::smallint[]),
  styles            text[] NOT NULL DEFAULT '{}',
  hero_src          text NOT NULL,
  hero_alt          text NOT NULL,
  trek_route        text,
  trek_summit_alt_m integer CHECK (trek_summit_alt_m > 0),
  trek_success_note text,
  sort_order        smallint NOT NULL DEFAULT 99,
  draft             boolean NOT NULL DEFAULT false,
  last_reviewed     date NOT NULL,
  updated_at        timestamptz NOT NULL DEFAULT now(),
  CHECK (kind <> 'trek' OR trek_route IS NOT NULL)
);

CREATE TABLE itinerary_image (
  itinerary_slug text NOT NULL REFERENCES itinerary(slug) ON DELETE CASCADE,
  position       smallint NOT NULL,
  src            text NOT NULL,
  alt            text NOT NULL,
  PRIMARY KEY (itinerary_slug, position)
);

-- Highlights, ideal-for, inclusions and exclusions as ordered text lists.
CREATE TABLE itinerary_list_item (
  itinerary_slug text NOT NULL REFERENCES itinerary(slug) ON DELETE CASCADE,
  kind           list_kind NOT NULL,
  position       smallint NOT NULL,
  text           text NOT NULL,
  PRIMARY KEY (itinerary_slug, kind, position)
);

CREATE TABLE itinerary_day (
  itinerary_slug  text NOT NULL REFERENCES itinerary(slug) ON DELETE CASCADE,
  day             smallint NOT NULL CHECK (day > 0),
  title           text NOT NULL,
  description     text NOT NULL,
  drive_hours     numeric(4,1) CHECK (drive_hours > 0),
  crater_descent  boolean NOT NULL DEFAULT false,
  meal_breakfast  boolean NOT NULL,
  meal_lunch      boolean NOT NULL,
  meal_dinner     boolean NOT NULL,
  stay_slug       text REFERENCES stay(slug),       -- NULL on the last day
  activities      text[] NOT NULL DEFAULT '{}',
  fee_parks       text[] NOT NULL DEFAULT '{}',     -- parks whose daily conservation fee applies
  -- Trek stage (Kilimanjaro, Meru, Lengai)
  start_alt_m     integer CHECK (start_alt_m > 0),
  max_alt_m       integer CHECK (max_alt_m > 0),
  sleep_alt_m     integer CHECK (sleep_alt_m > 0),
  hike_hours      numeric(4,1) CHECK (hike_hours > 0),
  distance_km     numeric(5,1) CHECK (distance_km > 0),
  PRIMARY KEY (itinerary_slug, day)
);

-- Places visited on a day, in order; the last is where the night is spent.
CREATE TABLE itinerary_day_place (
  itinerary_slug text NOT NULL,
  day            smallint NOT NULL,
  position       smallint NOT NULL,
  place_slug     text NOT NULL REFERENCES place(slug),
  PRIMARY KEY (itinerary_slug, day, position),
  FOREIGN KEY (itinerary_slug, day) REFERENCES itinerary_day(itinerary_slug, day) ON DELETE CASCADE
);

CREATE TABLE price_season_range (
  season     price_season NOT NULL,
  label      text NOT NULL,
  from_md    char(5) NOT NULL CHECK (from_md ~ '^\d{2}-\d{2}$'),
  to_md      char(5) NOT NULL CHECK (to_md ~ '^\d{2}-\d{2}$'),
  priority   smallint NOT NULL,                     -- lower wins when ranges overlap (peak first)
  PRIMARY KEY (season, from_md)
);

CREATE TABLE itinerary_pricing (
  itinerary_slug        text PRIMARY KEY REFERENCES itinerary(slug) ON DELETE CASCADE,
  tier                  comfort_tier NOT NULL,
  valid_from            date NOT NULL,
  valid_to              date NOT NULL,
  single_supplement_usd numeric(10,2) CHECK (single_supplement_usd >= 0),
  is_placeholder        boolean NOT NULL DEFAULT true,
  note                  text,
  CHECK (valid_from < valid_to)
);

CREATE TABLE itinerary_price_row (
  itinerary_slug   text NOT NULL REFERENCES itinerary_pricing(itinerary_slug) ON DELETE CASCADE,
  season           price_season NOT NULL,
  group_size       smallint NOT NULL CHECK (group_size BETWEEN 1 AND 12),
  per_person_usd   numeric(10,2) NOT NULL CHECK (per_person_usd > 0),
  PRIMARY KEY (itinerary_slug, season, group_size)
);

-- Park fees are data, updated every fee year (TANAPA/NCAA years run 1 July – 30 June). Add new rows; never edit old years.
CREATE TABLE park_fee (
  id             bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  park           text NOT NULL,
  park_name      text NOT NULL,
  authority      fee_authority NOT NULL,
  fee_type       fee_type NOT NULL,
  unit           fee_unit NOT NULL,
  residency      residency NOT NULL,
  age            age_band NOT NULL,
  amount_usd     numeric(10,2) NOT NULL CHECK (amount_usd >= 0),
  vat_included   boolean NOT NULL,
  valid_from     date NOT NULL,
  valid_to       date NOT NULL,
  is_placeholder boolean NOT NULL DEFAULT true,
  CHECK (valid_from < valid_to),
  UNIQUE (park, fee_type, residency, age, valid_from)
);

CREATE TABLE add_on (
  slug            text PRIMARY KEY CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title           text NOT NULL,
  kind            add_on_kind NOT NULL,
  duration        text NOT NULL,
  summary         text NOT NULL,
  place_slugs     text[] NOT NULL,
  price_from_usd  numeric(10,2) CHECK (price_from_usd > 0),
  is_placeholder  boolean NOT NULL DEFAULT true
);

CREATE TABLE itinerary_add_on (
  itinerary_slug text NOT NULL REFERENCES itinerary(slug) ON DELETE CASCADE,
  add_on_slug    text NOT NULL REFERENCES add_on(slug),
  PRIMARY KEY (itinerary_slug, add_on_slug)
);

CREATE TABLE itinerary_faq (
  itinerary_slug text NOT NULL REFERENCES itinerary(slug) ON DELETE CASCADE,
  position       smallint NOT NULL,
  question       text NOT NULL,
  answer         text NOT NULL,
  PRIMARY KEY (itinerary_slug, position)
);

CREATE INDEX itinerary_kind_idx      ON itinerary (kind) WHERE NOT draft;
CREATE INDEX itinerary_months_idx    ON itinerary USING gin (best_months);
CREATE INDEX itinerary_styles_idx    ON itinerary USING gin (styles);
CREATE INDEX itinerary_day_stay_idx  ON itinerary_day (stay_slug);
CREATE INDEX park_fee_lookup_idx     ON park_fee (park, fee_type, residency, valid_from, valid_to);

COMMIT;
