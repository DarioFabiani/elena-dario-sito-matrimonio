-- Migration: Update views to include accommodation info
-- Run this in Supabase SQL Editor

-- =====================================================
-- 1. UPDATE RSVP_SUMMARY VIEW
-- =====================================================
DROP VIEW IF EXISTS public.rsvp_summary;

CREATE VIEW public.rsvp_summary AS
SELECT 
  g.group_name,
  g.name AS guest_name,
  gr.is_attending,
  gr.dietary_notes,
  gr.transport_method,
  gr.accommodation_needs,
  gr.accommodation_days,
  gr.submitted_at,
  CASE WHEN gr.id IS NOT NULL THEN true ELSE false END AS has_responded
FROM public.guests g
LEFT JOIN public.guest_responses gr ON g.id = gr.guest_id
ORDER BY g.group_name, g.name;

-- =====================================================
-- 2. UPDATE ALL_ATTENDEES VIEW
-- =====================================================
DROP VIEW IF EXISTS public.all_attendees;

CREATE VIEW public.all_attendees AS

-- PART 1: Main Guests (The invited person)
SELECT 
    g.name,
    g.group_name,
    gr.dietary_notes,
    gr.transport_method,
    gr.accommodation_needs,
    gr.accommodation_days,
    FALSE as is_plus_one,
    gr.submitted_at
FROM guests g
JOIN guest_responses gr ON g.id = gr.guest_id
WHERE gr.is_attending = TRUE

UNION ALL

-- PART 2: Plus Ones from JSON (New Format)
SELECT 
    (plus_one->>'name')::text as name,
    g.group_name,
    (plus_one->>'dietary_notes')::text as dietary_notes,
    gr.transport_method,
    gr.accommodation_needs, -- Plus ones share the main guest's accommodation
    gr.accommodation_days,  -- Plus ones share the main guest's accommodation
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
SELECT 
    gr.plus_one_name as name,
    g.group_name,
    gr.plus_one_dietary_notes as dietary_notes,
    gr.transport_method,
    gr.accommodation_needs,
    gr.accommodation_days,
    TRUE as is_plus_one,
    gr.submitted_at
FROM guests g
JOIN guest_responses gr ON g.id = gr.guest_id
WHERE gr.is_attending = TRUE 
  AND gr.has_plus_one = TRUE 
  AND gr.plus_one_name IS NOT NULL
  AND (gr.plus_ones_json IS NULL OR jsonb_array_length(gr.plus_ones_json::jsonb) = 0);
