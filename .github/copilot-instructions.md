# Wedding Website - AI Coding Instructions

## Project Overview
Single-page React wedding website for Elena & Dario with smooth scroll navigation. Built with React 18 + TypeScript + Vite. No routing library—uses anchor-based scrolling with vanilla JS `scrollIntoView`.

## Architecture

### Navigation Pattern
- **Fixed Navigation**: `App.tsx` contains `<Navigation>` component that's always visible at top
- **Scroll-based Sections**: Each page component is wrapped in `<section id="...">` in App.tsx
- **Active State Tracking**: Navigation highlights current section using scroll position + 200px offset
- **Section Order**: Must match between `navItems` array and render order: `home → story → gallery → logistics → details → registry`

### Password Protection
- **PasswordGate Component**: Available in `components/PasswordGate.tsx`, currently **not mounted** in `App.tsx`
- Uses `VITE_SITE_PASSWORD` env variable (no hardcoded fallback in code)
- Session-based auth stored in `sessionStorage` under `wedding_auth` key
- Shows loading state, then either login form or children content
- To enable it, wrap the app content in `App.tsx` with `<PasswordGate>...</PasswordGate>`

### Page Structure
- All pages in `/pages` folder: `Home.tsx`, `Story.tsx`, `Gallery.tsx`, `Details.tsx`, `Logistics.tsx`, `Rsvp.tsx`, `Registry.tsx`
- Components in `/components` folder: `PasswordGate.tsx`
- Each page is a standalone component with full-screen min-height (`min-h-screen`)
- Pages handle their own internal state (e.g., RSVP form steps, gallery lightbox)
- Current `App.tsx` render flow does **not** include `Rsvp.tsx`

## Design System

### Colors (Tailwind Custom)
```javascript
primary: "#C5A059"    // Gold - primary accents
secondary: "#2C5F6D"  // Deep Teal - headers/text
tertiary: "#A4D4E3"   // Frosted Blue (less used)
background: "#FDFBF7" // Ivory - main background
paper: "#FFFDF5"      // Off-white for cards
```

### Typography
- **Headings**: `font-display` ("Great Vibes" cursive) for main titles
- **Body/Readable**: `font-serif` ("Cormorant Garamond") for paragraphs
- **UI Elements**: `font-sans` ("Montserrat") for buttons/labels
- **Material Icons**: Use `<span className="material-icons">icon_name</span>` for all icons

### Common Patterns
- **Section Headers**: Center-aligned, use `text-5xl md:text-6xl text-secondary font-display`
- **Decorative Borders**: `<div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>`
- **Animations**: Use `animate-fade-in-up` for entrance animations (defined in index.html Tailwind config)
- **Cards**: Rounded corners (`rounded-2xl` or `rounded-3xl`), shadow (`shadow-xl`), border (`border border-primary/20`)

## Key Components

### Timeline (Details.tsx)
- Vertical timeline with Material Icons in circular badges
- Grid layout: `grid-cols-[56px_1fr]` for icon column + content
- Each item has time badge, location, optional image, and description
- Icon column has connecting line via `bg-primary/30 h-full grow`

### RSVP Form (Rsvp.tsx)
- **3-step flow**: `search → form → success`
- **Real Backend**: Supabase integration for data persistence
- **Guest State**: Array of `GuestFormState` with `{ guest, isAttending, dietaryNotes, plusOnes[] }`
- **Plus Ones**: Each guest can add multiple +1s with name and dietary notes
- **Transport Options**: Collects transport method for attending guests
- **Accommodation**: Collects accommodation needs (`yes`/`no`/`unknown`) and specific days
- Family group determined by search name (searches by name parts, returns entire group)
- Upsert logic - guests can update their response
- Error handling for failed submissions with user feedback

### Gallery (Gallery.tsx)
- **Horizontal Scroll Rows**: Two rows with `flex` + `overflow-x-auto`
- Photos stored in Supabase Storage
- Lightbox opens on click (uses `selectedPhoto` state)
- ESC key closes lightbox
- **Spotify Easter Egg**: Some photos have `spotifyTrackId` - clicking triggers music via `onPlayMusic` callback
- App.tsx manages persistent Spotify player with `musicTrack` state

### Spotify Integration
- **Edge Functions** in `supabase/functions/`:
  - `search-music`: Search Spotify tracks (client credentials auth)
  - `add-track`: Add tracks to wedding playlist (refresh token auth)
- Requires Spotify API credentials as env variables:
  - `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`
  - `SPOTIFY_REFRESH_TOKEN`, `SPOTIFY_PLAYLIST_ID` (for add-track)

## Development Workflow

### Commands
```bash
npm install          # Install dependencies
npm run dev          # Dev server on port 3000 (configured in vite.config.ts)
npm run build        # Production build
npm run preview      # Preview production build
```

### Backend (Supabase)
- **Database**: PostgreSQL with `guests` and `guest_responses` tables
- **Storage**: Wedding photos hosted in Supabase Storage bucket `wedding-photos`
- **Edge Functions**: Spotify integration (`search-music`, `add-track`)
- **Authentication**: Row Level Security (RLS) for data protection
- **Client**: `lib/supabase.ts` exports configured Supabase client + TypeScript interfaces
- **Environment Variables**: 
  - `VITE_SUPABASE_URL` - Your Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` - Public anon key (safe for client-side)
  - `VITE_SITE_PASSWORD` - Site access password (optional, fallback: `elena-dario-2026`)
- See [SETUP.md](SETUP.md) for complete Supabase setup instructions

### Database Schema
```sql
-- Main tables:
guests (id, name, group_name, created_at)
guest_responses (id, guest_id, is_attending, dietary_notes, transport_method, 
                 accommodation_needs, accommodation_days[], plus_ones_json, 
                 has_plus_one, plus_one_name, plus_one_dietary_notes, submitted_at)
```

### Deployment (Vercel)
- Optimized for Vercel deployment with zero configuration
- Environment variables must be set in Vercel dashboard
- Automatic deployments on push to main branch (if GitHub connected)
- Commands: `vercel` (preview) or `vercel --prod` (production)

### TypeScript Config
- Path alias: `@/*` maps to project root (not actively used in current code)
- Target: ES2022
- React JSX transform enabled

## Adding New Features

### New Section
1. Create `pages/NewSection.tsx` component
2. Add to `App.tsx`: 
   - Import component
   - Add `<section id="newsection">` wrapper
   - Insert in correct scroll order
3. Update `navItems` array in `Navigation` component
4. Update `sections` array in `handleScroll` useEffect (same order!)

### Styling New Components
- Start with `bg-background min-h-screen py-24` for full sections
- Use decorative top border pattern for consistency
- Apply `animate-fade-in-up` to headers/cards
- Use semantic HTML with Tailwind classes (no CSS files)
- Prefer `flex` and `grid` over absolute positioning except for decorative elements

## Common Gotchas
- Navigation active state breaks if section order differs between `navItems`, `sections` array, and render order
- Smooth scroll requires actual DOM element IDs matching navigation hrefs
- Material Icons need full CDN link in index.html (already included)
- Photos are hosted in Supabase Storage bucket (URLs contain `supabase.co/storage/v1/object/public/wedding-photos/`)
- Italian language throughout (labels, placeholders, content)
- Gallery photos with `spotifyTrackId` trigger music player when clicked
- Password gate uses sessionStorage - user must re-enter password after closing browser

## Repository Hygiene (Keep / Remove / Ignore)

### Keep Tracked
- Source code and configs (`App.tsx`, `/pages`, `/components`, `/lib`, `tailwind.config.js`, `vite.config.ts`)
- SQL migrations in project root (`*-migration.sql`, `rsvp-schema.sql`, `update-views-accommodation.sql`)
- Documentation files (`README.md`, `SETUP.md`, `DEPLOYMENT.md`, `PASSWORD-PROTECTION.md`)

### Never Commit
- `.env.local` (already ignored)
- Build artifacts (`dist/`)
- Dependencies (`node_modules/`)
- Local logs (`*.log`)

### Existing Ignore Rules
- `.gitignore` already covers: `node_modules`, `dist`, `.env*.local`, `*.local`, logs
- `.vercelignore` already covers local/build noise for deploy packaging

### Practical Cleanup (Local Workspace)
- Safe to delete local `dist/` anytime (rebuild with `npm run build`)
- Safe to delete local logs
- Keep `.env.local` local-only; rotate values if it was ever shared externally

## Security Notes and Hardening

### Current Risk Profile
- `VITE_SITE_PASSWORD` is client-side only protection and is visible in bundled frontend code by design
- Supabase anon key is public by design, so data protection depends on strict RLS policies
- Spotify edge functions currently allow CORS `*` and have no app-level auth/rate limiting

### Recommended Hardening
1. Prefer real access control at edge/CDN level (Vercel Authentication, Cloudflare Access, or middleware with signed cookie) over client-only password gate.
2. Restrict Supabase RLS to least privilege for `guests` and `guest_responses`; verify no broad `SELECT` policy leaks all guests.
3. Add rate limiting to RSVP search and Spotify edge functions to reduce abuse.
4. For edge functions, replace `Access-Control-Allow-Origin: *` with your production domain list.
5. Add security headers in `vercel.json`: at minimum `X-Frame-Options`, `Referrer-Policy`, `X-Content-Type-Options`, and a tailored `Content-Security-Policy`.
6. Run `npm audit` periodically and update vulnerable transitive dependencies (`npm audit fix` found 1 moderate issue in `ws`).

## YouTube Live Streaming Integration

### Recommended UX
- Add a dedicated `live` section/page only visible near event date/time
- Show countdown before stream starts
- When offline/fallback, show a message plus direct YouTube link

### Embed Approach (Simple and Reliable)
- Use iframe embed format:
  `https://www.youtube.com/embed/{VIDEO_ID}?autoplay=1&modestbranding=1&rel=0`
- Example React block:

```tsx
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&modestbranding=1&rel=0"
  title="Live Wedding Stream"
  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
  allowFullScreen
  className="w-full aspect-video rounded-2xl border border-primary/20 shadow-xl"
/>
```

### YouTube Configuration Checklist
1. In YouTube Studio, schedule livestream and copy `VIDEO_ID`.
2. Ensure embed is allowed for the video/channel.
3. Keep stream visibility as needed (Public/Unlisted). For private guests, prefer unlisted + external access control.
4. If site uses CSP, allow `https://www.youtube.com` and `https://www.youtube-nocookie.com` for `frame-src`.

### Privacy/Security Considerations
- If guest privacy is important, avoid exposing the link too early and gate the section with real server-side auth.
- Do not put YouTube API keys in frontend unless strictly needed; if needed, proxy via edge function.
