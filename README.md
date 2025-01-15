# Portfolio Template

This is a bilingual portfolio template built with Astro and pnpm as the package manager. It features a clean, modern design with English and Spanish versions.

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

## 🚀 Create Your Portfolio

### Using GitHub Template (Recommended)

1. Click the green "Use this template" button at the top of this repository
2. Select "Create a new repository"
3. Choose a name for your repository
   - If you want to use GitHub Pages, name it `yourusername.github.io`
4. Clone your new repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   cd YOUR-REPOSITORY
   ```

## 📥 Install and Run

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Start development server**
   ```bash
   pnpm dev
   ```
   - The site will be available at: `http://localhost:4321`

## 💼 Customize Your Portfolio

1. Replace `public/profile-og.jpg` with your photo
2. Modify data in:
   - `src/pages/index.astro` (English version)
   - `src/pages/es/index.astro` (Spanish version)
3. Adjust site settings in `src/layout.ts`

## 📁 Project Structure

```
/
├── public/
│   └── profile-og.jpg     # Profile image
├── src/
│   ├── components/
│   │   └── Header.astro # Header with Links and language switcher
│   │   └── Layout.astro   # Main layout component
│   │   └── layout.ts # Layout strings
│   ├── pages/
│   │   ├── index.astro    # English version (default)
│   │   └── es/
│   │       └── index.astro # Spanish version
│   └── layout.ts          # Site configuration
```

## 🌍 Available Languages

- English version: `/` (root URL)
- Spanish version: `/es`

## 📝 Additional Note

This project uses:

- Astro as framework
- Tailwind CSS for styling
- Lucide Icons for iconography
- TypeScript for typing

## 📝 License

Feel free to use this portfolio template for your personal projects. You can modify and adapt it as needed.

**Restrictions:**

- No commercial use allowed (you cannot sell this template or use it in commercial projects)
- Attribution is appreciated but not required
