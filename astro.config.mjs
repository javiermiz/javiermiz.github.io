import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://javiermiz.github.io',
  output: 'static',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'en',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'lucide-react': ['lucide-react'],
          },
        },
      },
    },
  },
  experimental: {
    optimizeHoistedScript: true,
  },
});
