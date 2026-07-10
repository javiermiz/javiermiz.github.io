import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  site: "https://javiermiz.github.io",
  output: "static",
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
