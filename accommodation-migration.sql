-- Migration: Add accommodation fields to guest_responses table
-- Run this in your Supabase SQL Editor

-- Add accommodation columns to guest_responses table
ALTER TABLE guest_responses
ADD COLUMN IF NOT EXISTS accommodation_needs TEXT, -- 'yes', 'no', 'unknown'
ADD COLUMN IF NOT EXISTS accommodation_days JSONB; -- Array of days: ['friday', 'saturday', 'sunday', 'monday']

-- Add comment for documentation
COMMENT ON COLUMN guest_responses.accommodation_needs IS 'Whether the guest needs accommodation (yes, no, unknown)';
COMMENT ON COLUMN guest_responses.accommodation_days IS 'JSON array of days the guest needs accommodation';
