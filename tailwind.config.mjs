/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
