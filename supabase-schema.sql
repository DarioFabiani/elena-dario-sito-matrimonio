-- =====================================================
-- Wedding Website Database Schema
-- Run this in Supabase SQL Editor
-- =====================================================

-- Guests table
CREATE TABLE IF NOT EXISTS public.guests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  family_group TEXT NOT NULL,
  is_attending BOOLEAN DEFAULT true,
  dietary_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RSVP submissions table
CREATE TABLE IF NOT EXISTS public.rsvp_submissions (
  id BIGSERIAL PRIMARY KEY,
  family_group TEXT NOT NULL UNIQUE,
  accommodation_notes TEXT,
  transport_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Song requests table
CREATE TABLE IF NOT EXISTS public.song_requests (
  id BIGSERIAL PRIMARY KEY,
  song_name TEXT NOT NULL,
  submitted_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.song_requests ENABLE ROW LEVEL SECURITY;

-- Policies: Allow anyone to INSERT (public RSVP form)
DROP POLICY IF EXISTS "Anyone can submit RSVP" ON public.guests;
CREATE POLICY "Anyone can submit RSVP" ON public.guests
  FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit RSVP data" ON public.rsvp_submissions;
CREATE POLICY "Anyone can submit RSVP data" ON public.rsvp_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit song request" ON public.song_requests;
CREATE POLICY "Anyone can submit song request" ON public.song_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policies: Allow anyone to READ song requests (to show recent songs)
DROP POLICY IF EXISTS "Anyone can view song requests" ON public.song_requests;
CREATE POLICY "Anyone can view song requests" ON public.song_requests
  FOR SELECT
  TO public
  USING (true);

-- Policies: Only authenticated users (you in dashboard) can read RSVP data
DROP POLICY IF EXISTS "Authenticated users can read guests" ON public.guests;
CREATE POLICY "Authenticated users can read guests" ON public.guests
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can read submissions" ON public.rsvp_submissions;
CREATE POLICY "Authenticated users can read submissions" ON public.rsvp_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: View for easy export of aggregated responses
CREATE OR REPLACE VIEW public.guest_responses AS
SELECT 
  r.family_group,
  r.accommodation_notes,
  r.transport_notes,
  r.submitted_at,
  COALESCE(
    json_agg(
      json_build_object(
        'name', g.name,
        'is_attending', g.is_attending,
        'dietary_notes', g.dietary_notes
      )
    ) FILTER (WHERE g.id IS NOT NULL),
    '[]'::json
  ) as guests
FROM public.rsvp_submissions r
LEFT JOIN public.guests g ON g.family_group = r.family_group
GROUP BY r.id, r.family_group, r.accommodation_notes, r.transport_notes, r.submitted_at
ORDER BY r.submitted_at DESC;

-- Verify tables were created
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema='public' AND table_name=t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('guests', 'rsvp_submissions', 'song_requests')
ORDER BY table_name;
