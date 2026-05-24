-- Content automation queue table.
-- Postgres syntax; minor tweaks needed for MySQL/SQLite.
-- Run alongside your existing CMS migrations.

CREATE TYPE content_queue_status AS ENUM (
  'pending',
  'running',
  'generated',
  'failed',
  'skip'
);

CREATE TABLE content_queue (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now(),
  created_by              uuid REFERENCES users(id),     -- adjust to your users table

  status                  content_queue_status NOT NULL DEFAULT 'pending',

  -- Inputs (what used to live in the Google Sheet)
  topic_cluster           text NOT NULL,
  primary_keyword         text NOT NULL,
  intent                  text NOT NULL,
  secondary_keywords      text[] DEFAULT '{}',
  competitor_url_1        text,
  competitor_url_2        text,
  competitor_url_3        text,
  target_audience         text,
  notes                   text,

  -- Run metadata
  run_started_at          timestamptz,
  run_completed_at        timestamptz,
  generated_post_id       uuid REFERENCES posts(id),     -- adjust to your posts table

  -- Quality + diagnostics
  quality_score           numeric(3,2),
  quality_recommendation  text,                          -- APPROVE / APPROVE as supporting / REVIEW / DISCARD
  quality_payload         jsonb,
  last_error              text,
  run_log                 text[] DEFAULT '{}',

  -- Defense in depth: don't allow two simultaneous runs of the same row.
  CONSTRAINT content_queue_running_state_check
    CHECK (
      (status = 'running' AND run_started_at IS NOT NULL AND run_completed_at IS NULL)
      OR status <> 'running'
    )
);

CREATE INDEX content_queue_status_idx       ON content_queue (status);
CREATE INDEX content_queue_created_at_idx   ON content_queue (created_at DESC);
CREATE INDEX content_queue_primary_kw_idx   ON content_queue (lower(primary_keyword));

-- updated_at trigger (reuse whatever pattern the rest of your CMS uses).
-- If you don't already have one, here's a generic Postgres version:
CREATE OR REPLACE FUNCTION content_queue_set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER content_queue_updated_at_trg
  BEFORE UPDATE ON content_queue
  FOR EACH ROW EXECUTE FUNCTION content_queue_set_updated_at();


-- Optional: a separate "topic_clusters" table you populate up-front so the
-- admin UI dropdown stays in sync. If you'd rather hard-code the list, skip this.
CREATE TABLE topic_clusters (
  slug              text PRIMARY KEY,                    -- e.g. "flutter-testing"
  display_name      text NOT NULL,                       -- e.g. "Flutter Testing"
  hub_url           text NOT NULL,                       -- e.g. "/resources/flutter-testing/"
  description       text,
  owner_user_id     uuid REFERENCES users(id),
  created_at        timestamptz NOT NULL DEFAULT now(),
  archived_at       timestamptz
);

INSERT INTO topic_clusters (slug, display_name, hub_url, description) VALUES
  ('flutter-testing', 'Flutter Testing',     '/resources/flutter-testing/', 'Flutter app testing patterns + pitfalls'),
  ('mobile-testing',  'Mobile App Testing',  '/resources/mobile-testing/',  'Cross-cutting mobile QA'),
  ('appium',          'Appium',              '/resources/appium/',          'Appium comparisons, migrations, troubleshooting'),
  ('glossary',        'Glossary',            '/resources/glossary/',        'Short definitional pages (default: supporting tier on promote)');
