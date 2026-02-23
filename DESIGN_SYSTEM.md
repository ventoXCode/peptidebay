# PeptideBay Design System

A chemistry/Breaking Bad inspired design system for research compound databases. Dark, industrial, with signature chemistry green accents.

---

## Brand Identity

**Core Concept:** Periodic table meets underground chemistry lab. Professional scientific aesthetic with an edge.

**Signature Element:** Substance cards styled like periodic table elements with glowing chemistry green accents.

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Chemistry Green** | `#00ff9d` | Primary accent, links, highlights, glows |
| **Dark Industrial** | `#0d0d0d` | Main background |
| **Charcoal** | `#1c1c1c` | Card backgrounds, panels |
| **Steel Gray** | `#3d3d3d` | Borders, secondary elements |
| **Lab White** | `#f0f0f0` | Primary text |

### Category Colors

| Category | Hex | Tailwind Class |
|----------|-----|----------------|
| Peptide | `#00ff9d` | `text-peptide` / `bg-peptide` |
| Supplement | `#ffb700` | `text-supplement` |
| Nootropic | `#00d4ff` | `text-nootropic` |
| SARM | `#e6ff00` | `text-sarm` |
| Adaptogen | `#a855f7` | `text-adaptogen` |
| Herb | `#22c55e` | `text-herb` |
| Medicine | `#ff2d2d` | `text-medicine` |
| Amino Acid | `#22c55e` | (same as Herb) |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Amber Warning | `#ffb700` | Warnings, cautions |
| Toxic Yellow | `#e6ff00` | Important highlights |
| Blood Red | `#ff2d2d` | Danger, serious warnings |

---

## Typography

### Font Stack

```css
font-family: {
  heading: 'Titillium Web', sans-serif;      /* Headlines, titles */
  substance: 'Chakra Petch', sans-serif;      /* Element symbols */
  body: 'Source Sans 3', sans-serif;          /* Body text */
  mono: 'JetBrains Mono', monospace;          /* Data, numbers */
  accent: 'Archivo Black', sans-serif;        /* Impact headers */
  handwritten: 'Caveat', cursive;             /* Lab notes style */
}
```

### Font Import

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow:wght@400;500;600;700&family=Caveat:wght@400;500;600;700&family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Source+Sans+3:wght@400;500;600;700&family=Titillium+Web:wght@400;500;600;700;900&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 (Page) | Titillium Web | 3rem - 5rem | 700 |
| H2 (Section) | Titillium Web | 1.5rem - 2rem | 700 |
| Element Symbol | Chakra Petch | 2rem - 4rem | 700 |
| Body | Source Sans 3 | 1rem - 1.125rem | 400 |
| Data/Mono | JetBrains Mono | 0.75rem - 1rem | 400 |
| Category Pills | JetBrains Mono | 0.75rem | 600 |

---

## Component Styles

### 1. Element Card (Periodic Table Cell)

The signature component - styled like a periodic table element.

```css
.element-card {
  position: relative;
  background: #1c1c1c;
  border: 1px solid #3d3d3d;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  /* Clipped corners */
  clip-path: polygon(
    0 0, 
    calc(100% - 8px) 0, 
    100% 8px, 
    100% 100%, 
    8px 100%, 
    0 calc(100% - 8px)
  );
}

.element-card:hover {
  border-color: #00ff9d;
  box-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
}

/* Left accent bar on hover */
.element-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #00ff9d;
  opacity: 0;
  transition: opacity 0.3s;
}

.element-card:hover::before {
  opacity: 1;
}
```

**HTML Structure:**
```html
<a href="/substances/bpc-157" class="element-card group" style="--cat-color: #00ff9d">
  <div class="text-xs font-mono opacity-70" style="color: var(--cat-color)">01</div>
  <div class="text-3xl font-substance font-bold text-industrial-100 group-hover:text-chem-green transition-colors my-2">
    BPC
  </div>
  <div class="text-xs text-industrial-300 truncate">BPC-157</div>
  <div class="mt-2 flex items-center justify-between">
    <span class="text-xs opacity-70" style="color: var(--cat-color)">Peptide</span>
    <span class="text-xs text-industrial-500">→</span>
  </div>
</a>
```

### 2. Industrial Panel

Container with riveted metal aesthetic.

```css
.industrial-panel {
  position: relative;
  background: #1c1c1c;
  border: 2px solid #3d3d3d;
  padding: 1.5rem;
  box-shadow: 
    inset 2px 2px 0 rgba(255, 255, 255, 0.05),
    inset -2px -2px 0 rgba(0, 0, 0, 0.3),
    4px 4px 0 rgba(0, 0, 0, 0.5);
}

/* Corner rivets */
.industrial-panel::before,
.industrial-panel::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #3d3d3d;
  border-radius: 50%;
  border: 1px solid #3d3d3d;
  box-shadow: inset 1px 1px 2px rgba(255, 255, 255, 0.2);
}

.industrial-panel::before { top: 12px; left: 12px; }
.industrial-panel::after { top: 12px; right: 12px; }
```

### 3. Lab Button

Industrial metal button.

```css
.btn-lab {
  padding: 0.75rem 1.5rem;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #252525;
  border: 2px solid #3d3d3d;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 
    inset 1px 1px 0 rgba(255, 255, 255, 0.1),
    inset -1px -1px 0 rgba(0, 0, 0, 0.2),
    2px 2px 0 rgba(0, 0, 0, 0.5);
}

.btn-lab:hover {
  border-color: #00ff9d;
  color: #00ff9d;
  box-shadow: 
    inset 1px 1px 0 rgba(0, 255, 157, 0.1),
    2px 2px 0 rgba(0, 0, 0, 0.5),
    0 0 15px rgba(0, 255, 157, 0.3);
}
```

### 4. Search Input

Lab equipment style search.

```css
.search-lab {
  width: 100%;
  background: #1a1a1a;
  border: 2px solid #3d3d3d;
  padding: 0.75rem 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.125rem;
  color: #f0f0f0;
  transition: all 0.2s;
}

.search-lab::placeholder {
  color: #4d4d4d;
}

.search-lab:focus {
  border-color: #00ff9d;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
}
```

### 5. Filter/Category Pills

Hazard label style pills.

```css
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(28, 28, 28, 0.5);
  border: 1px solid #3d3d3d;
  border-left-width: 4px;
  border-left-color: var(--cat-color, #3d3d3d);
  cursor: pointer;
  transition: all 0.2s;
  color: #9d9d9d;
  white-space: nowrap;
}

.filter-pill:hover {
  background: rgba(61, 61, 61, 0.5);
  color: #cdcdcd;
}

.filter-pill.active {
  color: var(--cat-color, #00ff9d);
  background: rgba(0, 255, 157, 0.1);
  border-color: var(--cat-color, #00ff9d);
  border-left-color: var(--cat-color, #00ff9d);
}

.filter-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cat-color);
  flex-shrink: 0;
}
```

### 6. LED Meter (Sentiment Bar)

```css
.led-meter {
  height: 8px;
  background: #1a1a1a;
  border-radius: 4px;
  overflow: hidden;
}

.led-meter-fill {
  height: 100%;
  background: #00ff9d;
  transition: all 0.5s;
  box-shadow: 0 0 10px currentColor;
}
```

### 7. Accordion (Lab Notebook)

```css
.accordion-lab {
  background: #1c1c1c;
  border: 1px solid #3d3d3d;
}

.accordion-lab summary {
  display: flex;
  cursor: pointer;
  padding: 1rem;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 600;
  list-style: none;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s;
}

.accordion-lab summary:hover {
  background: #252525;
}

.accordion-lab summary::after {
  content: '▸';
  color: #00ff9d;
  transition: transform 0.2s;
}

.accordion-lab[open] summary::after {
  transform: rotate(90deg);
}
```

---

## Effects & Animations

### 1. Text Glow Effect

```css
.text-glow-green {
  color: #00ff9d;
  text-shadow: 
    0 0 10px rgba(0, 255, 157, 0.5),
    0 0 20px rgba(0, 255, 157, 0.3);
}
```

### 2. Box Glow Effect

```css
.shadow-glow-green {
  box-shadow: 
    0 0 20px rgba(0, 255, 157, 0.4),
    0 0 40px rgba(0, 255, 157, 0.2);
}
```

### 3. Dissolve In Animation

```css
@keyframes dissolve-in {
  0% {
    opacity: 0;
    filter: blur(8px) saturate(0%);
    transform: scale(0.95);
  }
  50% {
    filter: blur(2px) saturate(50%);
  }
  100% {
    opacity: 1;
    filter: blur(0) saturate(100%);
    transform: scale(1);
  }
}

.animate-dissolve-in {
  animation: dissolve-in 0.6s ease-out forwards;
}
```

### 4. Pulse Glow Animation

```css
@keyframes pulse-glow {
  0%, 100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.2);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### 5. Crystallize Animation

```css
@keyframes crystallize {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-3deg);
    filter: blur(4px);
  }
  30% {
    opacity: 0.5;
    transform: scale(1.02) rotate(1deg);
  }
  60% {
    transform: scale(0.98) rotate(-0.5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0);
  }
}
```

---

## Background Patterns

### 1. Hexagonal (Benzene Ring) Pattern

```css
.bg-hex-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300ff9d' fill-opacity='0.05'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
```

### 2. Smoke/Vapor Effect

```html
<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-chem-green/10 blur-[100px] rounded-full"></div>
```

### 3. Page Background

```css
body {
  background-color: #0d0d0d;
  background-image: 
    linear-gradient(to bottom, rgba(13, 13, 13, 0.95), rgba(13, 13, 13, 0.98)),
    url("data:image/svg+xml,HEXAGON_PATTERN_HERE");
}
```

---

## Layout Patterns

### 1. Substance Grid

```css
.substance-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (min-width: 640px) { grid-template-columns: repeat(3, 1fr); }
@media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }
@media (min-width: 1024px) { grid-template-columns: repeat(5, 1fr); }
@media (min-width: 1280px) { grid-template-columns: repeat(6, 1fr); }
```

### 2. Container

```css
.container {
  max-width: 80rem; /* 1280px */
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) { padding: 0 1.5rem; }
@media (min-width: 1024px) { padding: 0 2rem; }
```

---

## Icons

### Beaker/Flask Icon (Logo)

```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M9 3h6M10 3v6.5L5 19c-.7 1.3.2 3 1.8 3h10.4c1.6 0 2.5-1.7 1.8-3L14 9.5V3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 15h10" stroke-linecap="round" opacity="0.5"/>
</svg>
```

---

## Tailwind Config

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'chem': {
          green: '#00ff9d',
          amber: '#ffb700',
          yellow: '#e6ff00',
          red: '#ff2d2d',
          cyan: '#00d4ff',
          purple: '#a855f7',
          pink: '#ff0080',
          orange: '#ff6b00',
        },
        'industrial': {
          950: '#0d0d0d',
          900: '#1a1a1a',
          800: '#1c1c1c',
          700: '#252525',
          600: '#2d2d2d',
          500: '#3d3d3d',
          400: '#4d4d4d',
          300: '#6d6d6d',
          200: '#9d9d9d',
          100: '#cdcdcd',
          50: '#f0f0f0',
        },
        'category': {
          peptide: '#00ff9d',
          supplement: '#ffb700',
          nootropic: '#00d4ff',
          sarm: '#e6ff00',
          adaptogen: '#a855f7',
          glp: '#ff0080',
          racetam: '#ff6b00',
          medicine: '#ff2d2d',
          herb: '#22c55e',
          gh: '#67e8f9',
          'amino-acid': '#22c55e',
        }
      },
      fontFamily: {
        'heading': ['Titillium Web', 'sans-serif'],
        'substance': ['Chakra Petch', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'accent': ['Archivo Black', 'sans-serif'],
        'handwritten': ['Caveat', 'cursive'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 157, 0.4), 0 0 40px rgba(0, 255, 157, 0.2)',
        'glow-green-sm': '0 0 10px rgba(0, 255, 157, 0.3)',
      },
    },
  },
  plugins: [],
}
```

---

## CSS Custom Properties Pattern

Use CSS variables for dynamic category colors:

```html
<div style="--cat-color: #00ff9d">
  <span class="cat-text">Peptide</span>
</div>

<style>
  .cat-text {
    color: var(--cat-color, #6d6d6d);
  }
</style>
```

---

## Accessibility Notes

- Maintain 4.5:1 contrast ratio for text
- Chemistry green (#00ff9d) on dark (#0d0d0d) = 15.8:1 ✓
- Provide `prefers-reduced-motion` alternatives
- Use semantic HTML (headings, buttons, links)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Microcopy / Naming Conventions

| Standard | PeptideBay |
|----------|------------|
| Database | The Lab |
| Product Page | Compound Profile |
| Dosage | Formula |
| Reviews | Reaction Log |
| Related | Synthesis |
| Research Papers | Lab Notes |
| Side Effects | Warning Labels |
| User Rating | Purity Rating |
| Effective | Stable |
| Ineffective | Volatile |

---

## File Structure

```
src/
├── styles/
│   ├── global.css        # Base styles, components
│   └── animations.css    # Keyframes, animation utilities
├── components/
│   └── (use Tailwind utility classes)
└── pages/
    └── (page-level styles in <style> blocks)
```

---

## Quick Reference

**Primary Accent:** `#00ff9d` (Chemistry Green)
**Background:** `#0d0d0d` (Dark Industrial)
**Text:** `#f0f0f0` (Lab White)
**Border:** `#3d3d3d` (Steel Gray)
**Card Background:** `#1c1c1c` (Charcoal)
**Font (Headings):** Titillium Web
**Font (Symbols):** Chakra Petch
**Font (Body):** Source Sans 3
**Font (Mono):** JetBrains Mono

---

*This design system creates a distinctive chemistry lab aesthetic while maintaining readability and usability.*
