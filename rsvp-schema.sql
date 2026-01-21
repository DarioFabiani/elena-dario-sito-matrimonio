-- =====================================================
-- RSVP System Schema - Wedding Website
-- Run this in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- STEP 1: CLEAN UP OLD SCHEMA (if migrating)
-- =====================================================
-- Drop existing view first (it might exist from old schema)
DROP VIEW IF EXISTS public.guest_responses CASCADE;
DROP VIEW IF EXISTS public.rsvp_summary CASCADE;

-- Drop old tables
DROP TABLE IF EXISTS public.rsvp_submissions CASCADE;
DROP TABLE IF EXISTS public.guests CASCADE;

-- =====================================================
-- STEP 2: CREATE GUESTS TABLE - Pre-populated guest list
-- =====================================================
-- This table contains the invited guests, grouped by family/group name
CREATE TABLE public.guests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,                    -- Guest's full name (e.g., "Mario Rossi")
  group_name TEXT NOT NULL,              -- Family/group identifier (e.g., "Famiglia Rossi")
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster searches
CREATE INDEX idx_guests_group_name ON public.guests(group_name);
CREATE INDEX idx_guests_name ON public.guests(name);

-- =====================================================
-- STEP 3: CREATE GUEST_RESPONSES TABLE - RSVP responses
-- =====================================================
-- This table stores the responses for each guest
CREATE TABLE public.guest_responses (
  id BIGSERIAL PRIMARY KEY,
  guest_id BIGINT NOT NULL REFERENCES public.guests(id) ON DELETE CASCADE,
  is_attending BOOLEAN NOT NULL DEFAULT false,
  dietary_notes TEXT,                    -- Dietary requirements/allergies
  transport_method TEXT,                 -- 'car', 'train', 'other'
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(guest_id)                       -- One response per guest
);

-- Create index for faster lookups
CREATE INDEX idx_guest_responses_guest_id ON public.guest_responses(guest_id);

-- =====================================================
-- STEP 4: ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_responses ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 5: CREATE POLICIES
-- =====================================================

-- Guests: Anyone can read (to search for their invitation)
CREATE POLICY "Anyone can search guests" ON public.guests
  FOR SELECT
  TO public
  USING (true);

-- Guest Responses: Anyone can insert their response
CREATE POLICY "Anyone can submit response" ON public.guest_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Guest Responses: Anyone can update their response (in case they need to change)
CREATE POLICY "Anyone can update response" ON public.guest_responses
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Guest Responses: Authenticated users can read all responses (for admin dashboard)
CREATE POLICY "Authenticated can read responses" ON public.guest_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- =====================================================
-- STEP 6: HELPER VIEW - Complete responses with guest info
-- =====================================================
CREATE VIEW public.rsvp_summary AS
SELECT 
  g.group_name,
  g.name AS guest_name,
  gr.is_attending,
  gr.dietary_notes,
  gr.transport_method,
  gr.submitted_at,
  CASE WHEN gr.id IS NOT NULL THEN true ELSE false END AS has_responded
FROM public.guests g
LEFT JOIN public.guest_responses gr ON g.id = gr.guest_id
ORDER BY g.group_name, g.name;

-- =====================================================
-- STEP 7: INSERT YOUR GUEST LIST
-- =====================================================
-- Replace this with your actual guest list!

INSERT INTO public.guests (name, group_name) VALUES
  -- Famiglia Rossi (esempio)
  ('Mario Rossi', 'Famiglia Rossi'),
  ('Anna Rossi', 'Famiglia Rossi'),
  ('Luca Rossi', 'Famiglia Rossi'),
  
  -- Famiglia Bianchi (esempio)
  ('Giuseppe Bianchi', 'Famiglia Bianchi'),
  ('Maria Bianchi', 'Famiglia Bianchi'),
  
  -- Amici singoli (esempio)
  ('Marco Verdi', 'Amici di Dario'),
  ('Giulia Neri', 'Amici di Elena');

-- =====================================================
-- VERIFY SETUP
-- =====================================================
SELECT 
  'guests' as table_name, 
  COUNT(*) as row_count 
FROM public.guests
UNION ALL
SELECT 
  'guest_responses' as table_name, 
  COUNT(*) as row_count 
FROM public.guest_responses;
