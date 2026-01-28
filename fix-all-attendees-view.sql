-- Migration: Update all_attendees view to support multiple plus ones via JSON
-- Run this in Supabase SQL Editor

-- 1. Ensure the JSON column exists (Safety check)
ALTER TABLE guest_responses 
ADD COLUMN IF NOT EXISTS plus_ones_json JSONB DEFAULT '[]'::jsonb;

-- 2. Recreate the view to handle both legacy single plus-one and new JSON array
DROP VIEW IF EXISTS all_attendees;

CREATE OR REPLACE VIEW all_attendees AS

-- PART 1: Main Guests (The invited person)
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

-- PART 2: Plus Ones from JSON (New Format)
-- Examples: [{"name": "Mario", "dietary_notes": "None"}, {"name": "Luigi"}]
SELECT 
    (plus_one->>'name')::text as name,
    g.group_name,
    (plus_one->>'dietary_notes')::text as dietary_notes,
    gr.transport_method,
    TRUE as is_plus_one,
    gr.submitted_at
FROM guests g
JOIN guest_responses gr ON g.id = gr.guest_id
CROSS JOIN LATERAL jsonb_array_elements(
    CASE 
        WHEN gr.plus_ones_json IS NULL THEN '[]'::jsonb
        ELSE gr.plus_ones_json::jsonb 
    END
) as plus_one
WHERE gr.is_attending = TRUE 
  AND (plus_one->>'name') IS NOT NULL 
  AND (plus_one->>'name') <> ''

UNION ALL

-- PART 3: Legacy Plus Ones (Old Format fallback)
-- Captures records that use the old columns (plus_one_name) AND have empty/null JSON
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
  AND gr.plus_one_name IS NOT NULL
  -- Only include if JSON is empty/missing to avoid duplicates with Part 2
  AND (gr.plus_ones_json IS NULL OR jsonb_array_length(gr.plus_ones_json::jsonb) = 0);
