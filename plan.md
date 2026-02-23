# PeptideBay.shop - Development Plan

A comprehensive peptide and research compound information platform with dosing guidelines, research papers, and user experiences.

## Overview

**Goal:** Create a distinctive, production-grade peptide information database that stands out from generic "AI slop" aesthetics.

**Data Source:** dopamine.club/database (506 substances across multiple categories)

---

## Phase 1: Data Acquisition

### 1.1 Scrape Substance List
- **Source:** `https://dopamine.club/database`
- **Data Points:**
  - Substance name (slug)
  - Categories (Peptide, Supplement, Nootropic, SARM, Adaptogen, GLP, Racetam, Amino Acid, Medicine, Herb, GH)
- **Output:** `data/substances.json`

### 1.2 Scrape Individual Substance Pages
- **Source:** `https://dopamine.club/substances/{slug}`
- **Data Points:**
  - Title
  - Description (What is it?)
  - Category tags
  - Research studies (title, summary, URL, source)
  - User sentiment (% positive, summary)
  - Effects
  - Effectiveness notes
  - Dosage & administration guidelines
  - Side effects
  - Availability & sourcing info
  - Related compounds
- **Output:** `data/substances/{slug}.json`

### 1.3 Scraping Script
- Create a Node.js/Python scraper with rate limiting
- Respect robots.txt and add delays between requests
- Handle errors gracefully, allow resume from last position
- Store raw HTML for debugging, parsed JSON for use

---

## Phase 2: Tech Stack

### Frontend
- **Framework:** Astro (SSG for performance) or Next.js (if dynamic features needed)
- **Styling:** Tailwind CSS with custom design tokens
- **Fonts:** Distinctive typography (avoid Inter, Roboto, Arial)
- **Animations:** CSS-first, Motion library for React components

### Data Layer
- **Static Data:** JSON files generated during build
- **Search:** Client-side with Fuse.js or FlexSearch (lightweight, fast)
- **Optional:** SQLite for advanced queries if needed

### Deployment
- **Platform:** Vercel, Netlify, or Cloudflare Pages
- **Domain:** peptidebay.shop
- **SSL:** Automatic via platform

---

## Phase 3: Design System

### Aesthetic Direction
**Tone:** Breaking Bad meets scientific journal. Industrial chemistry lab aesthetic with an edge. Dark, gritty, and unapologetically bold. Think: periodic table meets underground lab meets premium research compound database.

**Key Differentiators:**
- Periodic table inspired UI elements (element cards, atomic numbers)
- Chemical formula notation and molecular structures as design motifs
- Lab equipment silhouettes (beakers, flasks, burners)
- Caution/hazard tape accents and warning labels
- Dark mode default with high-contrast chemistry green accents
- Gritty, industrial textures (concrete, metal, scratched surfaces)
- Handwritten lab notes aesthetic for certain elements

**The One Thing They'll Remember:** Substance cards styled like periodic table elements with atomic-style numbers, glowing chemistry green on dark industrial backgrounds.

### Color Palette
```
Primary Background:   Near-black industrial (#0d0d0d to #1a1a1a)
Secondary Background: Charcoal with warmth (#1c1c1c)
Chemistry Green:      Signature methylamine green (#00ff9d) - THE accent
Amber Warning:        Caution amber (#ffb700) - for warnings, side effects
Toxic Yellow:         Hazard yellow (#e6ff00) - for important highlights
Blood Red:            Danger red (#ff2d2d) - for serious warnings
Cool White:           Lab coat white (#f0f0f0) - for text contrast
Muted Gray:           Steel gray (#3d3d3d) - for borders, secondary text
```

### Typography
```
Headings:         Titillium Web or Rajdhani (technical, industrial feel)
Substance Names:  Chakra Petch (futuristic, chemical)
Body:             Source Sans 3 or Barlow (clean, readable)
Data/Numbers:     JetBrains Mono or Fira Code (scientific precision)
Accent/Labels:    Archivo Black for impact headers
Handwritten:      Caveat or Permanent Marker for "lab notes" style elements
```

### Visual Elements

**Textures:**
- Concrete/metal grain overlays
- Scratched surface patterns
- Subtle noise/grain throughout
- Grid lines (like graph paper/lab notebook)

**Decorative Motifs:**
- Periodic table cell styling for substance cards
- Molecular structure SVG decorations
- Hexagonal shapes (benzene rings)
- Chemical bond lines as dividers
- Bunsen burner flame silhouettes
- Beaker/flask shapes for loading states
- Caution tape patterns for warning sections
- Handwritten chemical equations as background decoration

**Effects:**
- Glowing green accents (subtle neon glow)
- Glass/transparency effects (lab glass)
- Smoke/vapor effects on hero
- Flickering effects (like lab lights)
- Chemical reaction animations on hover
- Elements that "crystallize" on scroll

### UI Components Styling

**Substance Cards:**
- Periodic table cell design
- Substance symbol in large bold (like element abbreviation)
- Atomic-style number (could be substance ID or category code)
- Category color stripe on left edge
- Hover: glow effect, slight scale, molecule animation

**Category Tags:**
- Pill-shaped with chemical hazard label styling
- Color-coded by category type
- Small molecular hexagon icon

**Buttons:**
- Industrial, chunky feel
- Slight bevel/emboss like metal
- Chemistry green glow on hover
- Hazard stripe pattern for destructive actions

**Search Bar:**
- Styled like lab equipment input
- Glowing green border on focus
- Magnifying glass with flask icon

**Accordions (Research Papers):**
- Lab notebook tab styling
- Handwritten-style numbering
- "Top Secret" folder aesthetic for closed state

**Data Boxes (Dosage, Effects, etc.):**
- Metal panel aesthetic with rivets
- LED display style for numbers
- Caution tape headers for warnings

---

## Phase 4: Site Architecture

### Pages

#### Home (`/`)
- Hero with compelling value proposition
- Featured peptides carousel
- Category quick-nav
- Latest research highlights
- Search bar (prominent)

#### Database (`/database`)
- Full substance grid with filters
- Category pills (Peptide, Supplement, Nootropic, etc.)
- Search with instant results
- Sort options (alphabetical, popularity, recent)
- Grid/List view toggle

#### Substance Detail (`/substances/{slug}`)
- Breadcrumb navigation
- Title + share buttons
- Quick stats bar (category, sentiment score)
- Sections:
  - What is it? (description)
  - Research & Studies (accordion)
  - User Reviews & Experiences (sentiment bar)
  - Benefits, Dosage & Side Effects (card grid)
  - Related Compounds
  - Community Reviews (optional - requires backend)

#### Category Pages (`/category/{category}`)
- Filtered view of substances
- Category description
- Related categories

#### About (`/about`)
- Mission statement
- Data sources
- Disclaimer (IMPORTANT for legal protection)

#### Search (`/search?q={query}`)
- Search results page
- Filters and sorting

---

## Phase 5: Component Library

### Core Components
```
/components
  /layout
    Header.astro
    Footer.astro
    Navigation.astro
  /substance
    SubstanceCard.astro
    SubstanceGrid.astro
    ResearchAccordion.astro
    InsightBox.astro
    SentimentBar.astro
    RelatedCompounds.astro
  /ui
    SearchBar.astro
    FilterPills.astro
    Button.astro
    Badge.astro
    Card.astro
  /sections
    Hero.astro
    FeaturedPeptides.astro
    CategoryNav.astro
```

---

## Phase 6: Features

### Must-Have (MVP)
- [ ] Full substance database with 506 entries
- [ ] Search functionality (client-side)
- [ ] Category filtering
- [ ] Individual substance pages with all data
- [ ] Responsive design
- [ SEO optimization (meta tags, structured data)
- [ ] Dark/light mode toggle

### Nice-to-Have (v2)
- [ ] Comparison tool (compare 2-3 substances)
- [ ] Dosage calculator
- [ ] Bookmark/favorites (localStorage)
- [ ] Print-friendly substance profiles
- [ ] Newsletter signup
- [ ] Advanced search with filters

### Future Considerations
- [ ] User accounts and reviews (requires backend)
- [ ] API for developers
- [ ] Mobile app (PWA)
- [ ] AI-powered recommendations

---

## Phase 7: Legal & Compliance

### Disclaimers (CRITICAL)
- Not medical advice
- Research compounds not approved for human use
- Consult healthcare professionals
- Data for educational purposes only

### Required Pages
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Medical Disclaimer
- [ ] About (with data sources)

---

## Phase 8: Development Workflow

### Sprint 1: Foundation
1. Set up Astro project with Tailwind
2. Create scraper script
3. Scrape all substance data
4. Design system setup (colors, typography, components)

### Sprint 2: Core Pages
1. Build layout components (Header, Footer)
2. Create Home page
3. Build Database page with filtering
4. Create Substance detail page template

### Sprint 3: Polish & Launch
1. Add animations and micro-interactions
2. SEO optimization
3. Performance optimization
4. Deploy to production
5. Configure domain (peptidebay.shop)

---

## Technical Considerations

### Performance
- Static generation for all pages
- Lazy loading for images
- Code splitting per page
- Optimized fonts (subset, preload)
- Image optimization (WebP, AVIF)

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

### SEO
- Structured data (JSON-LD)
- Open Graph tags
- Sitemap generation
- Robots.txt
- Canonical URLs

---

## File Structure

```
peptidebay.shop/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro          # Industrial header with logo
│   │   │   ├── Footer.astro          # Lab notebook style footer
│   │   │   └── Navigation.astro      # Nav with category "elements"
│   │   ├── substance/
│   │   │   ├── SubstanceCard.astro   # Periodic table cell design
│   │   │   ├── SubstanceGrid.astro   # Periodic table layout grid
│   │   │   ├── ResearchAccordion.astro # Lab folder styling
│   │   │   ├── InsightBox.astro      # Metal panel with rivets
│   │   │   ├── SentimentBar.astro    # LED meter styling
│   │   │   └── RelatedCompounds.astro # Chain reaction layout
│   │   ├── ui/
│   │   │   ├── SearchBar.astro       # Lab equipment input
│   │   │   ├── FilterPills.astro     # Hazard label styling
│   │   │   ├── Button.astro          # Industrial metal button
│   │   │   ├── Badge.astro           # Periodic tile mini
│   │   │   └── Card.astro            # Base card component
│   │   └── sections/
│   │       ├── Hero.astro            # Smoke/vapor, molecular bg
│   │       ├── FeaturedPeptides.astro # Carousel with glow
│   │       └── CategoryNav.astro     # Periodic table nav
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── database.astro
│   │   ├── substances/
│   │   │   └── [slug].astro
│   │   ├── category/
│   │   │   └── [category].astro
│   │   ├── about.astro
│   │   └── search.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── animations.css            # Glow, flicker, crystallize
│   └── scripts/
│       └── search.js
├── data/
│   ├── substances.json
│   └── substances/
│       ├── bpc-157.json
│       ├── tb-500.json
│       └── ...
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── textures/                 # Grain, scratches, concrete
│   │   ├── icons/                    # Flask, molecule, beaker
│   │   └── decorations/              # Molecular structures SVG
│   └── favicon.svg                   # Beaker or molecule icon
├── scripts/
│   └── scraper.js
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Chemistry/Breaking Bad Design Details

### Naming & Microcopy (Themed)
- "The Lab" → Database page title
- "Compound Profile" → Substance page header
- "Formula" → Dosage information
- "Reaction Log" → User reviews section
- "Synthesis" → Related compounds
- "Lab Notes" → Research papers
- "Warning Labels" → Side effects
- "Purity Rating" → User sentiment
- "Stable" / "Volatile" → Effectiveness indicators

### Periodic Table Card Design
```
┌─────────────────┐
│  15            │  ← Category number (like atomic number)
│      Peptide   │  ← Category name (small)
│                │
│      BPC       │  ← Symbol (large, bold, centered)
│                │
│   BPC-157      │  ← Full name (smaller)
│  82% ✓         │  ← Sentiment indicator
└─────────────────┘
```

### Color Coding by Category
```
Peptide:     Chemistry Green (#00ff9d)
Supplement:  Amber (#ffb700)
Nootropic:   Cyan (#00d4ff)
SARM:        Toxic Yellow (#e6ff00)
Adaptogen:   Purple (#a855f7)
GLP:         Hot Pink (#ff0080)
Racetam:     Orange (#ff6b00)
Medicine:    Red (#ff2d2d)
Herb:        Forest Green (#22c55e)
GH:          Ice Blue (#67e8f9)
```

### Animation Concepts
- **Page Load:** Elements fade in like compounds dissolving
- **Card Hover:** Glow pulse, molecular bonds animate
- **Category Filter:** Elements rearrange like chemical reaction
- **Search Results:** Results "precipitate" in (crystallize effect)
- **Accordion Open:** Like opening a lab notebook
- **Scroll:** Parallax molecular background
- **Loading States:** Beaker filling animation

### Background Concepts
- Dark gradient with subtle molecular structure watermark
- Scrolling hexagonal benzene ring pattern
- Smoke/vapor effect at top of pages
- Scratched metal texture overlay
- Grid paper pattern for data sections

---

## Success Metrics

- Page load < 2s
- Lighthouse score > 90
- All 506 substances indexed
- Search works instantly (< 100ms)
- Mobile-first responsive
- **Distinctive design** - "Periodic table of peptides" memorable concept
- Chemistry green (#00ff9d) becomes recognizable brand color
- Dark mode default with high contrast
- Animations feel like chemical reactions, not generic UI

---

## Visual Inspiration

**Breaking Bad Aesthetic:**
- Periodic table visual language
- Industrial/lab equipment styling
- Green glow effects (methylamine green)
- Caution/hazard tape patterns
- Dark, gritty, high contrast

**Chemistry References:**
- Molecular structures (benzene rings, bonds)
- Periodic table cell layouts
- Chemical formulas and notation
- Lab glass and equipment shapes
- Crystallization patterns

**Don't Do:**
- Don't reference drugs/illegal activities
- Don't use "meth" terminology
- Keep it scientific and professional
- Focus on research compound aesthetic

---

## Questions to Resolve

1. **Framework:** Astro (static) vs Next.js (dynamic)?
2. **Reviews:** Include community reviews feature? (requires auth/backend)
3. **Search:** Client-side only or integrate Algolia/Meilisearch?
4. **Updates:** How often to re-scrape dopamine.club?
5. **Monetization:** Ads, affiliate links, premium features?

---

## Next Steps (Sprint 2 - COMPLETE ✅)

1. **✅ Scrape detailed data** for all 506 substances:
   ```bash
   npm run scrape -- --details
   ```
   (This will take ~4-5 minutes with rate limiting)
   - 482 substances scraped successfully
   - 24 failed due to URL slug issues

2. **✅ Add animations** - Glow effects, crystallize, dissolve-in

3. **✅ Create additional pages** - Privacy, Terms, 404, Category pages

4. **Ready for Deploy** - Vercel/Netlify/Cloudflare Pages

---

## Build Stats

- **Total Pages:** 523
- **Build Time:** ~2 seconds
- **Substances:** 482 with detailed data
- **Categories:** 11 category pages
- **Sitemap:** Auto-generated

---

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
npm run scrape   # Re-scrape data
```
