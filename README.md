# Portfolio Project

This project is built with Astro and uses pnpm as the package manager. It features a bilingual portfolio website with optimized performance, and a clean, modern design.

## 📋 Prerequisites

Before you begin, you need to install the following on your computer:

1. **Node.js**:

   - Download and install from [nodejs.org](https://nodejs.org/)
   - Recommended version: 18.x or later
   - Verify installation by running: `node --version`

2. **pnpm**:
   - Once Node.js is installed, open your terminal and run:
   ```bash
   npm install -g pnpm
   ```
   - Verify installation by running: `pnpm --version`

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd [project-folder]
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

   - The site will be available at: `http://localhost:4321`

4. **Build for production**
   ```bash
   pnpm build
   ```

## 📁 Project Structure

```
/
├── public/
│   └── profile-og.jpg     # Profile image
├── src/
│   ├── components/
│   │   └── Layout.astro   # Main layout component
│   ├── pages/
│   │   ├── index.astro    # English version (default)
│   │   └── es/
│   │       └── index.astro # Spanish version
│   └── layout.ts          # Site configuration
```

## 🌍 Localization

- English version: `/` (root URL)
- Spanish version: `/es`

## 🛠 Development

- The project uses Tailwind CSS for styling
- Font files are stored in `/public/fonts`
- Images should be placed in the `/public` directory
- Site configuration can be found in `src/layout.ts`

## 📦 Main Dependencies

- Astro
- Tailwind CSS
- Lucide Icons
- TypeScript

## 🚀 Deployment

After building (`pnpm build`), the output will be in the `dist` directory, ready to be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages

## 💡 Additional Notes

- Make sure all font files referenced in `Layout.astro` are present in the `/public/fonts` directory
- The site is optimized for performance with lazy-loaded images and responsive design
- The layout is mobile-first and fully responsive

## 📝 License

Feel free to use this portfolio template for your personal projects. You can modify and adapt it as needed.

**Restrictions:**

- No commercial use allowed (you cannot sell this template or use it in commercial projects)
- Attribution is appreciated but not required
