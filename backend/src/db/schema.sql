CREATE TABLE IF NOT EXISTS problems (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  topic VARCHAR(100) NOT NULL,
  status VARCHAR(30) NOT NULL CHECK (status IN ('Solved', 'Revision Needed', 'Unsolved')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_problems_title
  ON problems USING gin (to_tsvector('english', title));

CREATE INDEX IF NOT EXISTS idx_problems_difficulty
  ON problems (difficulty);

CREATE INDEX IF NOT EXISTS idx_problems_topic
  ON problems (topic);

CREATE INDEX IF NOT EXISTS idx_problems_status
  ON problems (status);

