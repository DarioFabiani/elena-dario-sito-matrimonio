-- Migration: Add plus one fields to guest_responses table
-- Run this in your Supabase SQL Editor

-- Add plus one columns to guest_responses table
ALTER TABLE guest_responses
ADD COLUMN IF NOT EXISTS has_plus_one BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS plus_one_name TEXT,
ADD COLUMN IF NOT EXISTS plus_one_dietary_notes TEXT;

-- Add comment for documentation
COMMENT ON COLUMN guest_responses.has_plus_one IS 'Whether the guest is bringing a plus one';
COMMENT ON COLUMN guest_responses.plus_one_name IS 'Name of the plus one guest';
COMMENT ON COLUMN guest_responses.plus_one_dietary_notes IS 'Dietary requirements for the plus one guest';

-- =====================================================
-- FIX RLS POLICIES - Allow anon role to search and respond
-- =====================================================

-- 1. Fix guests table: Allow anon users to search for their names
DROP POLICY IF EXISTS "Anyone can search guests" ON public.guests;
CREATE POLICY "Anyone can search guests" ON public.guests
  FOR SELECT
  TO anon, public
  USING (true);

-- 2. Fix guest_responses table: Allow anon to submit/update
DROP POLICY IF EXISTS "Anyone can submit response" ON public.guest_responses;
DROP POLICY IF EXISTS "Anyone can update response" ON public.guest_responses;

-- Recreate with anon role explicitly included
CREATE POLICY "Anyone can submit response" ON public.guest_responses
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

CREATE POLICY "Anyone can update response" ON public.guest_responses
  FOR UPDATE
  TO anon, public
  USING (true)
  WITH CHECK (true);

-- Also allow anon to read responses (needed for upsert to work)
DROP POLICY IF EXISTS "Anon can read responses" ON public.guest_responses;
CREATE POLICY "Anon can read responses" ON public.guest_responses
  FOR SELECT
  TO anon
  USING (true);

-- =====================================================
-- Optional: Index and View
-- =====================================================

-- Create an index for queries filtering by plus ones (optional, for reporting)
CREATE INDEX IF NOT EXISTS idx_guest_responses_has_plus_one 
ON guest_responses(has_plus_one) 
WHERE has_plus_one = TRUE;

-- Useful view for getting all attendees including plus ones (optional)
CREATE OR REPLACE VIEW all_attendees AS
SELECT 
    g.name,
    g.group_name,
    gr.dietary_notes,
    gr.transport_method,
    FALSE as is_plus_one,
    gr.submitted_at
FROM guests g
JOIN guest_responses gr ON g.id = gr.guest_id
WHERE gr.is_attending = TRUE

UNION ALL

SELECT 
    gr.plus_one_name as name,
    g.group_name,
    gr.plus_one_dietary_notes as dietary_notes,
    gr.transport_method,
    TRUE as is_plus_one,
    gr.submitted_at
FROM guests g
JOIN guest_responses gr ON g.id = gr.guest_id
WHERE gr.is_attending = TRUE 
  AND gr.has_plus_one = TRUE 
  AND gr.plus_one_name IS NOT NULL;
