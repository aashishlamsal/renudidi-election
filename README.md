# DIDI Campaign Website - renudidi.com

A high-energy, viral-ready political campaign landing page built with Next.js, Tailwind CSS, and Framer Motion.

## 🎯 Features

- **Bilingual Support**: Nepali (primary) + English (secondary)
- **Modern Design**: Bold communist theme with red-star motifs and gold accents
- **Performance Optimized**: Loads under 2 seconds on mid-range mobile devices
- **Fully Responsive**: Mobile-first design with desktop enhancements
- **Accessible**: WCAG AA compliant with proper focus states and semantic HTML
- **SEO Ready**: Proper meta tags, Open Graph, and Schema.org markup

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

The site will be available at `http://localhost:3000`

## 📁 Project Structure

```
renudidi-campaign/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── components/
│   ├── Header.tsx           # Sticky navigation header
│   ├── Hero.tsx             # Hero section with floating stars
│   ├── WhyDidi.tsx          # Why DIDI explanation section
│   ├── DidiAcronym.tsx      # DIDI acronym breakdown cards
│   ├── ImpactGallery.tsx    # Image gallery with lightbox
│   ├── Manifesto.tsx        # Manifesto teaser with pillars
│   ├── JoinMovement.tsx     # Conversion form section
│   ├── Footer.tsx           # Footer with links
│   ├── FloatingBadge.tsx    # Floating DIDI badge (desktop)
│   └── MobileStickyCTA.tsx  # Sticky CTA (mobile)
├── content.json             # Bilingual content data
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🎨 Design System

### Colors

- **Primary Red**: `#FF0000` (didi-red)
- **Accent Gold**: `#FFC700` (didi-gold)
- **Ink Black**: `#0B0B0F` (didi-black)
- **Soft Gray**: `#F4F4F6` (didi-gray)
- **White**: `#FFFFFF`

### Typography

- **English**: Inter (400, 500, 600, 700, 800, 900)
- **Nepali**: Noto Sans Devanagari (400, 500, 600, 700, 800, 900)

### Spacing System

Based on 8pt grid system with consistent section rhythm.

## 📝 Content Management

All content is managed through `content.json`. To update text:

1. Open `content.json`
2. Find the section you want to update
3. Edit both `ne` (Nepali) and `en` (English) values
4. Save and rebuild

Example:
```json
{
  "hero": {
    "headline": {
      "ne": "नेपालकी दिदी",
      "en": "DIDI of Nepal's New Generation Leadership"
    }
  }
}
```

## 🖼️ Adding Images

### Hero Background
Replace placeholder with actual rally photo:
1. Add image to `/public/images/hero-bg.jpg`
2. Update Hero.tsx background style

### Impact Gallery
Add photos to `/public/images/gallery/`:
1. Name files: `impact-1.jpg`, `impact-2.jpg`, etc.
2. Update ImpactGallery.tsx to load actual images

### Logo
Add DIDI★ logo to `/public/logo.svg`

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Deploy!

Vercel will automatically:
- Build your Next.js app
- Optimize images and assets
- Deploy to global CDN
- Provide custom domain support

### Deploy to Cloudflare Pages

1. Push code to GitHub
2. Go to Cloudflare Pages dashboard
3. Create new project
4. Connect to your repository
5. Build settings:
   - Build command: `npm run build`
   - Output directory: `out`
6. Deploy!

### Manual Deployment

```bash
# Build static export
npm run build

# The 'out' directory contains your static site
# Upload to any static hosting service
```

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Lazy loading implemented
- **CSS**: Tailwind purges unused styles
- **Animations**: Framer Motion with reduced motion support
- **Fonts**: Google Fonts optimized with preconnect

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Focus states on interactive elements
- Alt text for images (add when images are added)
- ARIA labels where needed
- Keyboard navigation support

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Changing Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'didi-red': '#FF0000',     // Change to your red
  'didi-gold': '#FFC700',    // Change to your gold
  'didi-black': '#0B0B0F',   // Change to your black
}
```

### Adding Sections

1. Create new component in `/components/`
2. Import in `app/page.tsx`
3. Add content to `content.json`

### Modifying Animations

Edit component files or `globals.css` for custom animations.

## 📊 Analytics Setup

Add your analytics code to `app/layout.tsx`:

```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Add Google Analytics, Facebook Pixel, etc. */}
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🔒 Environment Variables

Create `.env.local` for sensitive data:
```
NEXT_PUBLIC_FORM_ENDPOINT=https://...
NEXT_PUBLIC_ANALYTICS_ID=...
```

## 🐛 Troubleshooting

### Build Errors
- Check Node.js version (18+)
- Delete `node_modules` and `.next`, reinstall
- Clear npm cache: `npm cache clean --force`

### Styling Issues
- Rebuild Tailwind: `npm run dev`
- Check browser console for errors

## 📄 License

© 2025 renudidi.com - All Rights Reserved

## 🤝 Support

For technical support or questions:
- Email: tech@renudidi.com
- Issues: Create GitHub issue

---

Built with ❤️ and ★ for the DIDI Movement
