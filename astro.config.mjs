// @ts-check
import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://eatcodesleep.org',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/rss.xml'),
      serialize(item) {
        const url = item.url;

        if (url.endsWith('/privacy/') || url.endsWith('/terms/')) {
          item.changefreq = ChangeFreqEnum.YEARLY;
          item.priority = 0.3;
          return item;
        }

        if (/\/blog\/[^/]+\/$/.test(url)) {
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = 0.7;
          return item;
        }

        if (url.endsWith('/blog/')) {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.8;
          return item;
        }

        if (url.endsWith('/contact/') || url.endsWith('/services/') || url.endsWith('/work/')) {
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = 0.9;
          return item;
        }

        if (url === 'https://eatcodesleep.org/' || url === 'https://eatcodesleep.org') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 1;
          item.lastmod = new Date().toISOString();
          return item;
        }

        item.changefreq = ChangeFreqEnum.MONTHLY;
        item.priority = 0.6;
        return item;
      },
    }),
    react(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow ngrok (and similar) tunnels during local development
      allowedHosts: ['.ngrok-free.app', '.ngrok.app'],
    },
    build: {
      // three.js vendor chunk is ~870 kB minified by design; isolated + lazy-loaded via client:visible.
      chunkSizeWarningLimit: 1000,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: 'three', test: /node_modules[\\/](three|@react-three)[\\/]/ },
              { name: 'motion', test: /node_modules[\\/](gsap|lenis)[\\/]/ },
              { name: 'react-vendor', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            ],
          },
        },
      },
    },
  },
});
