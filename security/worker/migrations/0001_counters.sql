-- All counters start at zero; import trusted starting totals BEFORE switching the live site.
CREATE TABLE IF NOT EXISTS counters (
  slug TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0),
  likes INTEGER NOT NULL DEFAULT 0 CHECK (likes >= 0)
);
CREATE TABLE IF NOT EXISTS view_events (
  slug TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  last_at INTEGER NOT NULL,
  PRIMARY KEY(slug, fingerprint)
);
CREATE TABLE IF NOT EXISTS like_events (
  slug TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY(slug, fingerprint)
);
CREATE TABLE IF NOT EXISTS rate_buckets (
  bucket_key TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  hits INTEGER NOT NULL CHECK(hits >= 0),
  PRIMARY KEY(bucket_key, window_start)
);
CREATE INDEX IF NOT EXISTS idx_rate_buckets_time ON rate_buckets(window_start);
