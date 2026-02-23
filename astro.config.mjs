import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://peptidebay.shop';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true
    },
    server: {
      allowedHosts: 'all'
    }
  }
});
