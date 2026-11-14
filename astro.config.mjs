import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site's public address. Change it here only: canonical links, the
// sitemap, robots.txt, llms.txt and structured data are all built from it.
export default defineConfig({
  site: 'https://vinay-software.vercel.app',
  integrations: [sitemap()],
});
