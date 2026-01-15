<div align="center">
<h1>💍 Elena & Dario - Wedding Website</h1>
<p>Un sito elegante per celebrare il nostro matrimonio</p>
</div>

## ✨ Features

- 📜 **Single-page smooth scrolling** - Navigation fluida senza React Router
- 💌 **RSVP Form** - Raccolta conferme con Supabase backend
- 📸 **Photo Gallery** - Galleria masonry con lightbox
- 📅 **Timeline** - Programma dettagliato del giorno
- 🎨 **Design System** - Palette colori personalizzata (oro, teal, ivory)
- 📱 **Responsive** - Ottimizzato per tutti i dispositivi
- 🇮🇹 **Italiano** - Interamente in italiano

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free)
- Vercel account (free)

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

Follow the complete guide in [SETUP.md](SETUP.md) to:
1. Create Supabase project
2. Run database schema SQL
3. Get API credentials
4. Configure environment variables

### 3. Run Locally

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

### Option 1: CLI (Recommended)

```bash
npm i -g vercel
vercel login
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

## 📊 View RSVP Responses

### Supabase Dashboard
- Go to your project → Table Editor
- View `guests` and `rsvp_submissions` tables
- Export to CSV for easy analysis

### SQL Query for Full Report
```sql
SELECT * FROM guest_responses;
```

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN)
- **Backend**: Supabase (PostgreSQL + REST API)
- **Deployment**: Vercel
- **Icons**: Material Icons

## 📁 Project Structure

```
├── pages/              # Page components (Home, RSVP, Gallery, etc.)
├── lib/                # Utilities (Supabase client)
├── .github/            # GitHub configs, AI instructions
├── App.tsx             # Main app with navigation
├── index.html          # HTML entry point with Tailwind config
├── vite.config.ts      # Vite configuration
└── SETUP.md            # Complete setup guide
```

## 🎨 Customization

### Colors
Edit in [index.html](index.html) Tailwind config:
```javascript
colors: {
  primary: "#C5A059",    // Gold
  secondary: "#2C5F6D",  // Deep Teal
  background: "#FDFBF7"  // Ivory
}
```

### Content
- **Timeline**: Edit [pages/Details.tsx](pages/Details.tsx)
- **Photos**: Update `PHOTOS` array in [pages/Gallery.tsx](pages/Gallery.tsx)
- **Info**: Modify [pages/Logistics.tsx](pages/Logistics.tsx)

## 📝 AI Coding Instructions

This project includes comprehensive AI coding guidelines at [.github/copilot-instructions.md](.github/copilot-instructions.md) for:
- Architecture patterns
- Design system usage
- Component structure
- Common workflows

## 📄 License

Private project - © 2026 Elena & Dario

---

<div align="center">
Made with ❤️ for our special day
</div>
