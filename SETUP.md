# Setup Guide - Elena & Dario Wedding Site

## 1. Supabase Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Name it: "elena-dario-wedding"
4. Set a strong database password (save it!)
5. Choose a region close to your guests (e.g., Europe West for Italy)
6. Wait ~2 minutes for provisioning

### Database Schema
Run this SQL in the Supabase SQL Editor:

```sql
-- Guests table
CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  family_group TEXT NOT NULL,
  is_attending BOOLEAN DEFAULT true,
  dietary_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RSVP submissions table
CREATE TABLE rsvp_submissions (
  id BIGSERIAL PRIMARY KEY,
  family_group TEXT NOT NULL UNIQUE,
  accommodation_notes TEXT,
  transport_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert guests (public RSVP form)
CREATE POLICY "Anyone can submit RSVP" ON guests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit RSVP data" ON rsvp_submissions
  FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated users (you) can read data
CREATE POLICY "Authenticated users can read guests" ON guests
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read submissions" ON rsvp_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Optional: Create a view for easier data export
CREATE VIEW guest_responses AS
SELECT 
  r.family_group,
  r.accommodation_notes,
  r.transport_notes,
  r.submitted_at,
  json_agg(
    json_build_object(
      'name', g.name,
      'is_attending', g.is_attending,
      'dietary_notes', g.dietary_notes
    )
  ) as guests
FROM rsvp_submissions r
LEFT JOIN guests g ON g.family_group = r.family_group
GROUP BY r.id, r.family_group, r.accommodation_notes, r.transport_notes, r.submitted_at
ORDER BY r.submitted_at DESC;
```

### Get API Credentials
1. In Supabase, go to Project Settings → API
2. Copy **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy **anon/public key** (starts with `eyJ...`)

### Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

## 2. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 3. Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 4. Vercel Deployment

### First Time Setup
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`
4. Follow prompts to link to your Vercel account

### Add Environment Variables in Vercel
1. Go to your project in [vercel.com](https://vercel.com)
2. Settings → Environment Variables
3. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. Redeploy: `vercel --prod`

### Continuous Deployment
- Connect your GitHub repo in Vercel dashboard
- Every push to `main` will auto-deploy
- Pull requests get preview deployments

## 5. Viewing Responses

### Option 1: Supabase Dashboard
- Go to Table Editor → `guests` and `rsvp_submissions`
- Use filters and sorting to analyze responses

### Option 2: Export to CSV
```sql
-- In Supabase SQL Editor, run then download as CSV:
SELECT * FROM guest_responses;
```

### Option 3: Build Admin Dashboard (Future)
Create a protected `/admin` route to view responses in your app.

## 6. Testing RSVP Flow

1. Go to RSVP section
2. Search for any name (no more mock database!)
3. Fill in attendance, dietary notes
4. Submit
5. Check Supabase dashboard to see the data

## Troubleshooting

**"Missing Supabase environment variables"**
- Make sure `.env.local` exists with correct values
- Restart dev server after creating `.env.local`

**RSVP submission fails**
- Check browser console for errors
- Verify RLS policies are created in Supabase
- Check Supabase logs in Dashboard → Logs

**Can't see submitted data**
- RLS policies only allow authenticated users to read
- Log into Supabase dashboard to view data
- Or create an admin login in your app

## Production Checklist

- [ ] Supabase project created and database schema applied
- [ ] Environment variables set in Vercel
- [ ] Test RSVP submission on production URL
- [ ] Set RSVP deadline in Rsvp.tsx (currently Feb 28, 2026)
- [ ] Update contact info in Logistics.tsx
- [ ] Replace placeholder images with real photos
- [ ] Test on mobile devices
- [ ] Share URL with guests!
