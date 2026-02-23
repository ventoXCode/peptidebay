# PeptideBay

> A chemistry-themed, static research compound database built with Astro.

[![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01?style=flat&logo=astro)](https://astro.build/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3.x-06b6d4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Data](https://img.shields.io/badge/Compounds-506-00ff9d?style=flat)](#data-pipeline)
[![Type](https://img.shields.io/badge/Type-Static%20Site-1f2937?style=flat)](#overview)

## Overview

PeptideBay is a searchable compound knowledge base focused on research-oriented data presentation.  
The UI is intentionally styled like an industrial lab panel: periodic-table cards, neon chemistry accents, and dense, scannable information blocks.

## Highlights

- `506` compounds indexed in `data/substances.json`
- `482` detailed profiles in `data/substances/*.json`
- `8` primary categories (Supplement, Peptide, Nootropic, Herb, Adaptogen, SARM, Medicine, Amino Acid)
- Fast client-side filtering/search on the database page
- Static generation with Astro for speed, SEO, and low hosting overhead
- Dedicated profile pages for each compound slug

## Tech Stack

- [Astro](https://astro.build/) for static site generation
- [Tailwind CSS](https://tailwindcss.com/) for design system implementation
- TypeScript + vanilla client JS for UI behavior
- `node-fetch` + `cheerio` for data scraping utilities

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Create production build (`dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run scrape` | Run scraper utility |

## Data Pipeline

Scraper entrypoint: `scripts/scraper.js`

```bash
# Fetch/refresh list of substances
npm run scrape -- --substances

# Fetch detailed pages for all substances
npm run scrape -- --details

# Fetch one substance by slug
npm run scrape -- --single=bpc-157

# Resume interrupted scraping
npm run scrape -- --resume
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page with featured compounds and category entry points |
| `/database` | Full searchable/filterable compound grid |
| `/substances/[slug]` | Detailed compound profile page |
| `/category/[category]` | Category-specific browse page |
| `/about` | Project/about page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Project Structure

```text
.
├── data/
│   ├── substances.json
│   └── substances/
├── public/
├── scripts/
│   └── scraper.js
├── src/
│   ├── layouts/
│   ├── pages/
│   ├── scripts/
│   └── styles/
├── DESIGN_SYSTEM.md
└── QUICK_REFERENCE.md
```

## Design Language

- Industrial dark base with chemistry-green highlights (`#00ff9d`)
- Periodic-table-inspired card system for compounds
- High-contrast typography tuned for dense information

Design docs:

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)
- [`QUICK_REFERENCE.md`](./QUICK_REFERENCE.md)

## Disclaimer

This project is for educational and research purposes only.  
It does not provide medical advice, diagnosis, or treatment guidance.

## License

ISC (see `package.json`).
