CREATE TABLE IF NOT EXISTS poll_votes (
  id BIGSERIAL PRIMARY KEY,
  poll_key TEXT NOT NULL,
  voter_token TEXT NOT NULL,
  choice TEXT NOT NULL CHECK (choice IN ('yes','no')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (poll_key, voter_token)
);

CREATE INDEX IF NOT EXISTS poll_votes_poll_key_idx ON poll_votes (poll_key);
