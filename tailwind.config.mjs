/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        // Primary font for UI elements (Inter)
        sans: [
          "var(--font-primary)",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],

        // Article/content font (Georgia)
        serif: ["var(--font-article)", "Georgia", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
