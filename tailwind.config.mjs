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
        DEFAULT: '300ms',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        background: {
          DEFAULT: '#f7f7f5',
        },
        dark: {
          DEFAULT: '#2B2117',
        },
        primary: {
          DEFAULT: '#2294B1',
          dark: '#000d6c',
          light: '#85d5e9',
        },
        secondary: {
          DEFAULT: '#DD34D1',
        },
      },
      fontFamily: {
        primary: ['Saira', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
