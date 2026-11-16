-- 0002_itinerary_day_copy.sql
-- Booking-focused itinerary copy. Mirrors the optional fields added to src/features/itineraries/schema.ts:
-- stay.benefit, itinerary_day.hook / highlight / practical / guide_tip / add_on_*, itinerary.season_note,
-- and the "Why you'll love this journey" reasons as a new list kind.

ALTER TABLE stay ADD COLUMN benefit text CHECK (char_length(benefit) <= 90);

ALTER TABLE itinerary_day
  ADD COLUMN hook                  text CHECK (char_length(hook) <= 110),
  ADD COLUMN highlight             text CHECK (char_length(highlight) <= 90),
  ADD COLUMN practical             text CHECK (char_length(practical) <= 90),
  ADD COLUMN guide_tip             text CHECK (char_length(guide_tip) <= 200),
  ADD COLUMN add_on_text           text,
  ADD COLUMN add_on_price_from_usd numeric(10, 2) CHECK (add_on_price_from_usd > 0);

ALTER TABLE itinerary ADD COLUMN season_note text CHECK (char_length(season_note) <= 220);

ALTER TYPE list_kind ADD VALUE IF NOT EXISTS 'why-love';
