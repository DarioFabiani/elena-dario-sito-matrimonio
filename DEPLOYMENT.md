# 🚀 Deployment Checklist

Use this checklist to deploy your wedding website to production.

## ✅ Pre-Deployment

### Supabase Setup
- [ ] Created Supabase account at [supabase.com](https://supabase.com)
- [ ] Created new project named "elena-dario-wedding"
- [ ] Ran database schema SQL (see [SETUP.md](SETUP.md#database-schema))
- [ ] Verified tables created: `guests`, `rsvp_submissions`
- [ ] Tested RLS policies are working
- [ ] Copied Supabase URL from Settings → API
- [ ] Copied anon/public key from Settings → API

### Local Testing
- [ ] Created `.env.local` with Supabase credentials
- [ ] Ran `npm install` to install dependencies
- [ ] Started dev server with `npm run dev`
- [ ] Tested RSVP form submission
- [ ] Verified data appears in Supabase dashboard
- [ ] Tested on mobile device/responsive view
- [ ] Checked all sections scroll correctly

### Content Review
- [ ] Updated wedding date in Details.tsx (currently: 30 Maggio 2026)
- [ ] Set RSVP deadline in Rsvp.tsx (currently: 28 Febbraio 2026)
- [ ] Updated venue locations in Details.tsx
- [ ] Added real photos to Gallery.tsx (replace Unsplash placeholders)
- [ ] Updated contact info in Logistics.tsx
- [ ] Reviewed all Italian text for accuracy
- [ ] Updated ceremony time if needed (currently 16:00)

## 🌐 Vercel Deployment

### First-Time Setup
- [ ] Created Vercel account at [vercel.com](https://vercel.com)
- [ ] Installed Vercel CLI: `npm i -g vercel`
- [ ] Ran `vercel login` to authenticate

### Deployment
- [ ] Ran `vercel` to create project (choose defaults)
- [ ] Added environment variables in Vercel dashboard:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Ran `vercel --prod` for production deployment
- [ ] Saved production URL: ___________________________

### Optional: GitHub Integration
- [ ] Pushed code to GitHub repository
- [ ] Connected GitHub repo in Vercel dashboard
- [ ] Verified auto-deployments work on push to main

## 🧪 Post-Deployment Testing

### Functionality
- [ ] Visited production URL
- [ ] Tested navigation scrolling
- [ ] Submitted test RSVP
- [ ] Verified test data in Supabase
- [ ] Tested gallery lightbox
- [ ] Checked all links work
- [ ] Tested on mobile device
- [ ] Tested on different browsers (Chrome, Safari, Firefox)

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images load properly
- [ ] Smooth scrolling works
- [ ] No console errors

## 📣 Launch

- [ ] Shared URL with family for testing
- [ ] Fixed any issues found
- [ ] Created save-the-date announcement
- [ ] Shared website URL with guests
- [ ] Set up email notifications for new RSVPs (optional)

## 📊 Post-Launch Monitoring

### Week 1
- [ ] Check RSVP submissions daily
- [ ] Respond to any guest questions
- [ ] Monitor for technical issues

### Ongoing
- [ ] Export guest list from Supabase weekly
- [ ] Track dietary requirements
- [ ] Follow up with non-responders
- [ ] Send reminder 1 week before RSVP deadline

## 🆘 Troubleshooting

### RSVP not submitting
1. Check browser console for errors
2. Verify Supabase credentials in Vercel
3. Check Supabase logs in Dashboard → Logs
4. Verify RLS policies allow inserts

### Environment variables not working
1. Re-deploy after adding variables: `vercel --prod`
2. Ensure variables start with `VITE_`
3. Check variables in Vercel dashboard under Settings

### Contact for help
- Supabase Docs: https://supabase.com/docs
- Vercel Support: https://vercel.com/support
- Tailwind Docs: https://tailwindcss.com/docs

---

## 🎉 Ready to Launch!

Once all checkboxes are complete, your wedding website is ready to share with guests!

**Production URL**: _________________________

**RSVP Deadline**: 28 Febbraio 2026

**Wedding Date**: 30 Maggio 2026
