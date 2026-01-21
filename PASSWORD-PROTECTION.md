# Password Protection - Setup Guide

Il sito è ora protetto da password. Questo significa che i visitatori dovranno inserire una password prima di poter accedere al contenuto.

## 🔒 Come Funziona

- **Componente**: `components/PasswordGate.tsx` avvolge l'intera applicazione
- **Storage**: La password viene salvata in `sessionStorage` (persiste durante la visita)
- **Stile**: Design coordinato con il tema del matrimonio (oro/teal)
- **Sicurezza**: Adeguata per un sito di matrimonio (non è un sistema bancario!)

## ⚙️ Configurazione

### 1. Password di Default

La password di default è: **`elena-dario-2026`**

### 2. Cambiare la Password

#### Sviluppo Locale (file `.env.local`)

```env
VITE_SITE_PASSWORD=la-tua-nuova-password
```

#### Deployment su Vercel

Devi configurare la variabile d'ambiente su Vercel:

1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il tuo progetto
3. Vai su **Settings** → **Environment Variables**
4. Aggiungi una nuova variabile:
   - **Name**: `VITE_SITE_PASSWORD`
   - **Value**: `la-tua-password-segreta`
   - **Environments**: Seleziona tutti (Production, Preview, Development)
5. Clicca **Save**
6. **Redeploy** il sito per applicare le modifiche

### 3. Condividere la Password

Invia la password agli invitati via:
- **WhatsApp** ai gruppi
- **Email** con le partecipazioni
- **Messaggi privati** sui social

**Suggerimento**: Usa una password facile da ricordare come:
- `elena-e-dario-2026`
- `15maggio2026`
- `il-nostro-matrimonio`

## 🧪 Testare Localmente

1. Avvia il server di sviluppo:
```bash
npm run dev
```

2. Apri il browser su `http://localhost:3000`

3. Dovresti vedere la schermata di login

4. Inserisci la password configurata in `.env.local`

## 🚀 Deployment

### Prima del Deploy

Assicurati che `.env.local` sia nel `.gitignore` (già configurato ✅)

### Deploy su Vercel

```bash
# Deploy preview
vercel

# Deploy production
vercel --prod
```

**IMPORTANTE**: Non dimenticare di configurare `VITE_SITE_PASSWORD` nelle Environment Variables di Vercel!

## 🔐 Sicurezza

### Cosa Protegge

✅ Blocca l'accesso casuale al sito
✅ Nasconde il contenuto ai motori di ricerca
✅ Adeguato per eventi privati come matrimoni

### Cosa NON Protegge

❌ Non è sicurezza bancaria
❌ Qualcuno che conosce la password può condividerla
❌ Il codice JS è comunque scaricabile (normal per SPA)

### Per Aumentare la Sicurezza

Se vuoi una protezione più robusta:

1. **Basic Auth via Vercel**: Aggiungi in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        }
      ]
    }
  ]
}
```

2. **Vercel Pro Plan**: Password protection nativa (14€/mese)

## 📝 Personalizzazione UI

### Cambiare i Testi

Modifica `components/PasswordGate.tsx`:

```tsx
// Titolo
<h1 className="...">I Tuoi Nomi</h1>

// Messaggio
<p className="...">Il tuo messaggio personalizzato</p>

// Testo di aiuto
<p className="...">Contatta... per la password</p>
```

### Cambiare Stile

Il componente usa le stesse classi Tailwind del resto del sito:
- `bg-background`, `bg-paper` - Colori di sfondo
- `text-secondary` - Testo principale
- `border-primary` - Bordi oro
- `font-display`, `font-serif`, `font-sans` - Font

## 🐛 Troubleshooting

### La password non funziona

1. Verifica che `.env.local` abbia `VITE_SITE_PASSWORD=...`
2. Riavvia il dev server (`npm run dev`)
3. Svuota la cache del browser (Ctrl+Shift+R)
4. Controlla la console per errori

### Password non salvata tra le pagine

Questo è normale! `sessionStorage` persiste solo:
- Durante la sessione corrente
- Nella stessa scheda del browser
- Se chiudi la scheda, devi reinserire la password

### Su Vercel non chiede la password

1. Verifica di aver configurato `VITE_SITE_PASSWORD` nelle Environment Variables
2. Fai un nuovo deploy dopo aver aggiunto la variabile
3. Controlla i build logs per errori

## 💡 Alternative Gratuite

Se questa soluzione non ti basta, ecco altre opzioni:

### 1. Vercel Edge Middleware
File `middleware.ts` che verifica la password server-side.

### 2. CloudFlare Pages con Access
Protezione a livello di CDN (gratis fino a 50 utenti).

### 3. Netlify Password Protection
Simile a Vercel, include password protection nel piano gratuito.

---

**Domande?** Modifica questo file o chiedi agli sposi! 🎊
