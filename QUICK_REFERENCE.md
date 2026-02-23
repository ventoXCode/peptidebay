# PeptideBay Quick Reference

## Colors

```
Primary Green:  #00ff9d
Background:     #0d0d0d
Card Bg:        #1c1c1c
Border:         #3d3d3d
Text:           #f0f0f0
Muted Text:     #9d9d9d
```

## Category Colors

```
Peptide:    #00ff9d (green)
Supplement: #ffb700 (amber)
Nootropic:  #00d4ff (cyan)
SARM:       #e6ff00 (yellow)
Adaptogen:  #a855f7 (purple)
Herb:       #22c55e (green)
Medicine:   #ff2d2d (red)
Amino Acid: #22c55e (green)
```

## Fonts

```
Heading:   Titillium Web
Symbol:    Chakra Petch
Body:      Source Sans 3
Mono:      JetBrains Mono
Accent:    Archivo Black
Handwrite: Caveat
```

## Key Components

### Element Card
```html
<a class="element-card group" style="--cat-color: #00ff9d">
  <div class="text-xs font-mono opacity-70" style="color: var(--cat-color)">01</div>
  <div class="text-3xl font-substance font-bold group-hover:text-chem-green">BPC</div>
  <div class="text-xs text-industrial-300 truncate">BPC-157</div>
  <div class="text-xs opacity-70" style="color: var(--cat-color)">Peptide →</div>
</a>
```

### Filter Pill
```html
<button class="filter-pill" data-category="peptide" style="--cat-color: #00ff9d">
  <span class="filter-dot" style="background: #00ff9d"></span>
  Peptide (72)
</button>
```

### Industrial Panel
```html
<div class="industrial-panel">
  <!-- Corner rivets auto-generated -->
  Content here
</div>
```

### Lab Button
```html
<button class="btn-lab">Analyze →</button>
```

### Search Input
```html
<input class="search-lab w-full pl-12" placeholder="Search...">
```

### LED Meter
```html
<div class="led-meter">
  <div class="led-meter-fill bg-chem-green" style="width: 82%"></div>
</div>
```

## CSS Variables

```css
--cat-color: #00ff9d;  /* Category color for dynamic styling */

.cat-text {
  color: var(--cat-color, #6d6d6d);
}
```

## Animations

```css
.animate-dissolve-in    /* Fade + blur entrance */
.animate-pulse-glow     /* Breathing glow */
.animate-crystallize    /* Scale + rotate entrance */
```

## Backgrounds

```css
.bg-hex-pattern         /* Benzene ring pattern */
.bg-industrial-950      /* Dark background */
```

## Tailwind Classes Quick List

```
Text Colors:
  text-chem-green       #00ff9d
  text-chem-amber       #ffb700
  text-industrial-100   #cdcdcd
  text-industrial-400   #6d6d6d

Backgrounds:
  bg-industrial-950     #0d0d0d
  bg-industrial-800     #1c1c1c
  bg-industrial-700     #252525

Fonts:
  font-heading          Titillium Web
  font-substance        Chakra Petch
  font-body             Source Sans 3
  font-mono             JetBrains Mono

Effects:
  text-glow-green       Green text shadow
  shadow-glow-green     Box shadow glow
```

## Project Structure

```
src/
├── pages/
│   ├── index.astro           # Homepage
│   ├── database.astro        # Compound grid
│   ├── about.astro
│   ├── privacy.astro
│   ├── terms.astro
│   ├── 404.astro
│   ├── substances/[slug].astro
│   └── category/[category].astro
├── layouts/
│   └── BaseLayout.astro
├── styles/
│   ├── global.css
│   └── animations.css
└── scripts/
    └── scroll-animations.js

data/
├── substances.json           # 506 compounds list
└── substances/*.json         # Detailed data per compound
```

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
npm run scrape   # Re-scrape data from source
```
