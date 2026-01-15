# Wedding Website - AI Coding Instructions

## Project Overview
Single-page React wedding website for Elena & Dario with smooth scroll navigation. Built with React 18 + TypeScript + Vite. No routing library—uses anchor-based scrolling with vanilla JS `scrollIntoView`.

## Architecture

### Navigation Pattern
- **Fixed Navigation**: `App.tsx` contains `<Navigation>` component that's always visible at top
- **Scroll-based Sections**: Each page component is wrapped in `<section id="...">` in App.tsx
- **Active State Tracking**: Navigation highlights current section using scroll position + 200px offset
- **Section Order**: Must match between `navItems` array and render order: `home → story → gallery → details → logistics → rsvp → registry`

### Page Structure
- All pages in `/pages` folder: `Home.tsx`, `Story.tsx`, `Gallery.tsx`, `Details.tsx`, `Logistics.tsx`, `Rsvp.tsx`, `Registry.tsx`
- Each page is a standalone component with full-screen min-height (`min-h-screen`)
- Pages handle their own internal state (e.g., RSVP form steps, gallery lightbox)

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
- **Guest State**: Array of `{ name, isAttending, dietaryNotes }`
- Allows multiple guests per submission with individual attendance toggles
- Family group determined by search name
- Error handling for failed submissions with user feedback

### Gallery (Gallery.tsx)
- Masonry-style grid with `auto-rows-[300px]`
- Some items span 2 columns: `md:col-span-2` (items at index 1, 4)
- Lightbox opens on click (uses `selectedImage` state)
- ESC key closes lightbox

## Development Workflow

### Commands
```bash
npm install          # Install dependencies
npm run dev          # Dev server on port 3000 (configured in vite.config.ts)
npm run build        # Production build
npm run preview      # Preview production build
```

### Backend (Supabase)
- **Database**: PostgreSQL with `guests` and `rsvp_submissions` tables
- **Authentication**: Row Level Security (RLS) for data protection
- **Client**: `lib/supabase.ts` exports configured Supabase client
- **Environment Variables**: 
  - `VITE_SUPABASE_URL` - Your Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` - Public anon key (safe for client-side)
- See [SETUP.md](SETUP.md) for complete Supabase setup instructions

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
- Image URLs are external (Googleusercontent, Unsplash) - no local assets folder
- Italian language throughout (labels, placeholders, content)
