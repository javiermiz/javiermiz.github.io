import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  site: "https://javiermiz.github.io",
  output: "static",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  },
  build: {
    inlineStylesheets: "auto",
  },
});
