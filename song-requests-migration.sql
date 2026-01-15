-- =====================================================
-- Song Requests Migration
-- Run this in Supabase SQL Editor
-- =====================================================

-- Song requests table
CREATE TABLE IF NOT EXISTS public.song_requests (
  id BIGSERIAL PRIMARY KEY,
  song_name TEXT NOT NULL,
  submitted_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.song_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to INSERT (public form)
DROP POLICY IF EXISTS "Anyone can submit song request" ON public.song_requests;
CREATE POLICY "Anyone can submit song request" ON public.song_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow anyone to READ song requests (to show recent songs)
DROP POLICY IF EXISTS "Anyone can view song requests" ON public.song_requests;
CREATE POLICY "Anyone can view song requests" ON public.song_requests
  FOR SELECT
  TO public
  USING (true);

-- Verify table was created
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema='public' AND table_name='song_requests') as column_count
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name = 'song_requests';
