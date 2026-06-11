-- Add value tracking to leads for better reporting
ALTER TABLE leads ADD COLUMN IF NOT EXISTS value NUMERIC(12, 2) DEFAULT 0;

-- Update reporting logic could use this column if available.
