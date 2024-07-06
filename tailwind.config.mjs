/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
      },
    },
    extend: {
      transitionDuration: {
        DEFAULT: '500ms',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        primary: '#fff064',
      },
      fontFamily: {
        primary: ['Saira', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
