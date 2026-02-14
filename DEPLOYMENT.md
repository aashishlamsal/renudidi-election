# Deployment Guide - renudidi.com

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration needed
- Automatic HTTPS
- Global CDN
- Free tier generous
- Custom domain support

**Steps:**

1. **Prepare Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial DIDI campaign site"
   git remote add origin https://github.com/yourusername/renudidi.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"
   - Done! Your site is live

3. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add `renudidi.com`
   - Update DNS records as shown
   - Wait for SSL (automatic)

**Estimated Time:** 5 minutes

---

### Option 2: Cloudflare Pages

**Why Cloudflare?**
- Fast global CDN
- DDoS protection
- Free unlimited bandwidth
- Excellent performance

**Steps:**

1. **Prepare Build**
   - Your `next.config.js` is already configured for static export
   - Build command: `npm run build`
   - Output directory: `out`

2. **Deploy**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your Git repository
   - Build settings:
     ```
     Build command: npm run build
     Build output directory: out
     ```
   - Deploy

3. **Custom Domain**
   - Go to Custom domains
   - Add `renudidi.com`
   - Update nameservers if needed

**Estimated Time:** 10 minutes

---

### Option 3: Netlify

**Steps:**

1. **Build Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "out"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   - Go to https://netlify.com
   - Drag & drop `out` folder OR connect GitHub
   - Configure custom domain

**Estimated Time:** 10 minutes

---

## Pre-Deployment Checklist

### 1. Content Review
- [ ] Update all placeholder text in `content.json`
- [ ] Add actual candidate name
- [ ] Review Nepali translations
- [ ] Verify all links work

### 2. Images
- [ ] Add hero background image (`/public/images/hero-bg.jpg`)
- [ ] Add 6 impact gallery photos
- [ ] Add DIDI★ logo (`/public/logo.svg`)
- [ ] Optimize all images (use WebP/AVIF)

### 3. Metadata
- [ ] Update `app/layout.tsx` meta tags
- [ ] Add Open Graph image
- [ ] Update Twitter card
- [ ] Verify Schema.org data in `app/page.tsx`

### 4. Analytics
- [ ] Add Google Analytics ID
- [ ] Add Facebook Pixel (optional)
- [ ] Set up conversion tracking

### 5. Forms
- [ ] Configure form submission endpoint
- [ ] Set up email notifications
- [ ] Add reCAPTCHA (optional)
- [ ] Test form submissions

### 6. Testing
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on iOS and Android
- [ ] Test all breakpoints
- [ ] Check page load speed
- [ ] Verify accessibility

---

## DNS Configuration

### For renudidi.com

**Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Cloudflare Pages:**
```
Type: CNAME
Name: @
Value: renudidi.pages.dev

Type: CNAME
Name: www
Value: renudidi.pages.dev
```

---

## Performance Optimization

### Before Deployment:

1. **Optimize Images**
   ```bash
   # Use sharp or ImageOptim
   # Target: < 200KB per image
   # Format: WebP or AVIF
   ```

2. **Check Bundle Size**
   ```bash
   npm run build
   # Check .next/static size
   # Total should be < 1MB
   ```

3. **Test Load Speed**
   - Use Google PageSpeed Insights
   - Target: 90+ score on mobile
   - Core Web Vitals should be green

---

## Post-Deployment

### 1. Verify Deployment
- [ ] Visit renudidi.com
- [ ] Test all sections scroll
- [ ] Submit test form
- [ ] Check mobile view
- [ ] Verify SSL certificate

### 2. Monitor
- [ ] Set up Vercel Analytics
- [ ] Configure uptime monitoring
- [ ] Watch error logs

### 3. Share
- [ ] Post on social media
- [ ] Send to supporters
- [ ] Submit to search engines

---

## Updating Content

### Quick Updates (No Code)

1. Edit `content.json`
2. Commit and push to GitHub
3. Vercel/Cloudflare auto-deploys

### Adding Images

1. Add to `/public/images/`
2. Update component imports
3. Push to trigger rebuild

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Slow Load Times
- Check image sizes
- Enable compression
- Use CDN for static assets

### Forms Not Working
- Check CORS settings
- Verify endpoint URL
- Check network tab for errors

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---

## Cost Estimate

### Free Tier (Adequate for Campaign)
- **Vercel**: Free (100GB bandwidth)
- **Cloudflare**: Free (unlimited)
- **Netlify**: Free (100GB bandwidth)

### Paid (If Needed)
- **Vercel Pro**: $20/month (1TB bandwidth)
- **Cloudflare Pro**: $20/month (advanced features)

**Recommendation:** Start with free tier, upgrade if traffic exceeds limits.

---

**Ready to Deploy?** Follow Option 1 (Vercel) for the fastest path to production!
