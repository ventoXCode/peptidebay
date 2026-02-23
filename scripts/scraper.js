#!/usr/bin/env node

/**
 * PeptideBay Data Scraper
 * Scrapes compound data from dopamine.club for research purposes
 * 
 * Usage: npm run scrape
 * 
 * Options:
 *   --substances    Scrape substance list only
 *   --details       Scrape detailed info for all substances
 *   --single=slug   Scrape a single substance by slug
 *   --resume        Resume from last position (for interrupted scrapes)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const SUBSTANCES_DIR = path.join(DATA_DIR, 'substances');

// Rate limiting - be respectful to the source
const DELAY_MS = 500; // 500ms between requests
const MAX_RETRIES = 3;

// Ensure directories exist
function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(SUBSTANCES_DIR)) fs.mkdirSync(SUBSTANCES_DIR, { recursive: true });
}

// Sleep utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry
async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'PeptideBay Research Bot (contact: hello@peptidebay.shop)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error(`  Attempt ${i + 1}/${retries} failed: ${error.message}`);
      if (i < retries - 1) {
        await sleep(2000 * (i + 1)); // Exponential backoff
      } else {
        throw error;
      }
    }
  }
}

// Scrape substance list from database page
async function scrapeSubstanceList() {
  console.log('🔬 Scraping substance list from dopamine.club/database...\n');
  
  const html = await fetchWithRetry('https://dopamine.club/database');
  const $ = cheerio.load(html);
  
  const substances = [];
  
  $('.substance-card').each((_, card) => {
    const $card = $(card);
    const title = $card.attr('data-title') || '';
    const categories = ($card.attr('data-categories') || '').split(',').map(c => c.trim()).filter(Boolean);
    
    // Extract link
    const link = $card.find('a').attr('href') || '';
    const slug = link.replace('/substances/', '').replace('/', '') || title.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    if (title) {
      substances.push({
        slug,
        title,
        categories,
        url: `https://dopamine.club/substances/${slug}/`
      });
    }
  });
  
  console.log(`✅ Found ${substances.length} substances\n`);
  
  // Save to JSON
  const outputPath = path.join(DATA_DIR, 'substances.json');
  fs.writeFileSync(outputPath, JSON.stringify(substances, null, 2));
  console.log(`📁 Saved to ${outputPath}\n`);
  
  // Print category stats
  const categoryCount = {};
  substances.forEach(s => {
    s.categories.forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
  });
  
  console.log('📊 Category breakdown:');
  Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count}`);
    });
  
  return substances;
}

// Scrape detailed info for a single substance
async function scrapeSubstanceDetails(slug) {
  const url = `https://dopamine.club/substances/${slug}/`;
  console.log(`  Fetching: ${slug}`);
  
  try {
    const html = await fetchWithRetry(url);
    const $ = cheerio.load(html);
    
    // Extract data from the page
    const substance = {
      slug,
      url,
      scrapedAt: new Date().toISOString(),
      
      // Basic info
      title: $('.substance__title').text().trim() || slug,
      description: $('.substance__desc').text().trim(),
      categories: [],
      
      // Research studies
      research: [],
      
      // User sentiment
      sentiment: {
        positive: 0,
        summary: ''
      },
      
      // Effects and dosage
      effects: [],
      effectiveness: [],
      dosage: [],
      sideEffects: [],
      availability: [],
      
      // Related compounds
      related: []
    };
    
    // Extract categories
    $('.category-tags .tag').each((_, tag) => {
      const text = $(tag).text().trim();
      if (text) substance.categories.push(text);
    });
    
    // Extract research studies from accordion
    $('.accordion__item').each((_, item) => {
      const $item = $(item);
      const title = $item.find('.accordion__title').text().trim();
      const summary = $item.find('.accordion__summary').text().trim();
      const link = $item.find('.accordion__link').attr('href') || '';
      const source = $item.find('.accordion__source').text().trim();
      
      // Clean up title (remove numbering)
      const cleanTitle = title.replace(/^\d+\s*/, '');
      
      if (cleanTitle) {
        substance.research.push({
          title: cleanTitle,
          summary,
          url: link,
          source
        });
      }
    });
    
    // Extract sentiment
    const sentimentPercent = $('.sentiment__percent').text().trim();
    substance.sentiment.positive = parseInt(sentimentPercent) || 0;
    substance.sentiment.summary = $('.sentiment__summary').text().trim();
    
    // Extract insight boxes (effects, dosage, side effects, etc.)
    $('.insight-box').each((_, box) => {
      const $box = $(box);
      const header = $box.find('.insight-box__header').text().trim().toLowerCase();
      const items = [];
      
      $box.find('.insight-box__item').each((_, item) => {
        const text = $(item).text().trim();
        const strong = $(item).find('strong').text().trim();
        const rest = text.replace(strong, '').trim();
        
        items.push({
          label: strong,
          description: rest
        });
      });
      
      if (header.includes('effect') && !header.includes('side')) {
        substance.effects = items;
      } else if (header.includes('effectiveness')) {
        substance.effectiveness = items;
      } else if (header.includes('dosage') || header.includes('administration')) {
        substance.dosage = items;
      } else if (header.includes('side effect')) {
        substance.sideEffects = items;
      } else if (header.includes('availability') || header.includes('sourc')) {
        substance.availability = items;
      }
    });
    
    // Extract related compounds
    $('.related-compound-link').each((_, link) => {
      const $link = $(link);
      const name = $link.find('.related-compound-name').text().trim();
      const href = $link.attr('href') || '';
      const relatedSlug = href.replace('/substances/', '').replace('/', '');
      
      if (name) {
        substance.related.push({
          name,
          slug: relatedSlug
        });
      }
    });
    
    // Save individual substance file
    const outputPath = path.join(SUBSTANCES_DIR, `${slug}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(substance, null, 2));
    
    return substance;
    
  } catch (error) {
    console.error(`  ❌ Error scraping ${slug}: ${error.message}`);
    return null;
  }
}

// Scrape details for all substances
async function scrapeAllDetails(resume = false) {
  console.log('🔬 Scraping detailed substance information...\n');
  
  // Load substance list
  const listPath = path.join(DATA_DIR, 'substances.json');
  if (!fs.existsSync(listPath)) {
    console.log('❌ No substance list found. Run with --substances first.');
    return;
  }
  
  const substances = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  
  // Check for resume point
  let startIndex = 0;
  const progressFile = path.join(DATA_DIR, '.scrape-progress');
  
  if (resume && fs.existsSync(progressFile)) {
    startIndex = parseInt(fs.readFileSync(progressFile, 'utf8')) || 0;
    console.log(`📍 Resuming from index ${startIndex}\n`);
  }
  
  console.log(`📊 Total substances to scrape: ${substances.length - startIndex}\n`);
  
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };
  
  for (let i = startIndex; i < substances.length; i++) {
    const substance = substances[i];
    console.log(`[${i + 1}/${substances.length}] ${substance.slug}`);
    
    const result = await scrapeSubstanceDetails(substance.slug);
    
    if (result) {
      results.success++;
      console.log(`  ✅ Success\n`);
    } else {
      results.failed++;
      results.errors.push(substance.slug);
      console.log(`  ❌ Failed\n`);
    }
    
    // Save progress
    fs.writeFileSync(progressFile, String(i + 1));
    
    // Rate limiting
    if (i < substances.length - 1) {
      await sleep(DELAY_MS);
    }
  }
  
  // Clean up progress file
  if (fs.existsSync(progressFile)) {
    fs.unlinkSync(progressFile);
  }
  
  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📈 SCRAPE COMPLETE');
  console.log('='.repeat(50));
  console.log(`✅ Success: ${results.success}`);
  console.log(`❌ Failed: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log('\nFailed substances:');
    results.errors.forEach(slug => console.log(`  - ${slug}`));
  }
  
  return results;
}

// Main CLI
async function main() {
  const args = process.argv.slice(2);
  
  ensureDirs();
  
  console.log('\n🧪 PeptideBay Data Scraper\n');
  console.log('='.repeat(50) + '\n');
  
  try {
    if (args.includes('--substances')) {
      await scrapeSubstanceList();
    } else if (args.includes('--details')) {
      await scrapeAllDetails(args.includes('--resume'));
    } else if (args.find(a => a.startsWith('--single='))) {
      const slug = args.find(a => a.startsWith('--single=')).split('=')[1];
      await scrapeSubstanceDetails(slug);
    } else {
      // Default: scrape everything
      console.log('Running full scrape...\n');
      await scrapeSubstanceList();
      await scrapeAllDetails();
    }
  } catch (error) {
    console.error('\n💥 Fatal error:', error.message);
    process.exit(1);
  }
  
  console.log('\n✨ Done!\n');
}

main();
