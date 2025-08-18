---
title: "Building This Blog: A Modern Tech Stack Journey"
description: "Discover the technologies and decisions behind this minimalist blog: Astro, TypeScript, Tailwind CSS, and the journey from concept to deployment."
published_date: 2024-01-15
category: "technology"
featured_image: "/images/blog/tech-stack-cover.jpg"
featured_image_alt: "Modern web development tools and technologies"
draft: false
seo_title: "Building a Modern Blog with Astro, TypeScript & Tailwind CSS"
seo_description: "Learn how I built this minimalist blog using Astro, TypeScript, Tailwind CSS, and modern web development practices. Complete tech stack breakdown."
---

When I decided to create a new personal blog, I wanted something that would be fast, maintainable, and enjoyable to work with. After exploring various options, I settled on a modern tech stack that perfectly balances performance, developer experience, and simplicity.

## The Core Technologies

### Astro: The Foundation

**Why Astro?** After years of working with React, Vue, and other frameworks, I was drawn to Astro's unique approach to web development. Here's what sold me:

- **Zero JavaScript by default**: Pages load incredibly fast because they ship minimal JavaScript
- **Island Architecture**: I can use interactive components only where needed
- **Framework agnostic**: I can mix React, Vue, or vanilla JS components as needed
- **Built-in optimizations**: Image optimization, CSS bundling, and more out of the box

```astro
---
// Server-side logic runs at build time
import Layout from "../components/Layout.astro";
import { getCollection } from "astro:content";

const posts = await getCollection("blog");
---

<Layout title="Blog">
  <!-- This HTML is generated at build time -->
  {
    posts.map((post) => (
      <article>
        <h2>{post.data.title}</h2>
        <p>{post.data.description}</p>
      </article>
    ))
  }
</Layout>
```

### TypeScript: Type Safety & Developer Experience

TypeScript was a no-brainer for this project. The benefits are immediate:

- **Catch errors early**: No more runtime surprises from typos or wrong data types
- **Better IDE support**: Autocomplete, refactoring, and navigation work flawlessly
- **Self-documenting code**: Interfaces and types serve as living documentation

```typescript
// Clear interfaces make the code self-documenting
interface BlogPost {
  title: string;
  description: string;
  published_date: Date;
  category: "technology" | "personal" | "tutorials";
  tags?: string[];
  draft: boolean;
}

// Type-safe functions prevent bugs
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
```

### Tailwind CSS: Utility-First Styling

Tailwind CSS transformed how I approach styling:

- **Rapid development**: No context switching between HTML and CSS files
- **Consistent design system**: Built-in spacing, colors, and typography scales
- **Responsive design**: Mobile-first approach with intuitive breakpoint prefixes
- **Purging unused CSS**: Final bundle only includes used classes

```html
<!-- Responsive card component with Tailwind -->
<article
  class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
>
  <h2 class="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">
    Article Title
  </h2>
  <p class="text-gray-600 mb-4 line-clamp-2">Article description...</p>
  <div class="flex items-center justify-between">
    <span class="text-sm text-gray-500">5 min read</span>
    <time class="text-sm text-gray-500">Jan 15, 2024</time>
  </div>
</article>
```

## Architecture Decisions

### Content Collections

Astro's Content Collections provide a powerful way to manage blog posts with type safety:

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published_date: z.date(),
    category: z.enum(["technology", "personal", "tutorials"]),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

### Internationalization (i18n)

Building a bilingual blog required careful planning:

```
src/
├── content/
│   └── blog/
│       ├── en/
│       │   └── building-this-blog.md
│       └── es/
│           └── construyendo-este-blog.md
├── locales/
│   ├── en/
│   │   └── blog.json
│   └── es/
│       └── blog.json
└── pages/
    ├── index.astro (English)
    └── es/
        └── index.astro (Spanish)
```

### Component Architecture

I organized components into a clear hierarchy:

- **Templates**: Page-level components (`BlogTemplate.astro`, `CvTemplate.astro`)
- **Layout**: Site-wide layout and navigation
- **Molecules**: Reusable UI components
- **Utilities**: Helper functions and constants

## Performance Optimizations

### Build-Time Generation

Astro generates static HTML at build time, resulting in:

- **Lighthouse scores of 100**: Perfect performance, accessibility, and SEO scores
- **Fast loading times**: No JavaScript parsing or hydration delays
- **SEO-friendly**: Search engines can easily crawl and index content

### Image Optimization

Astro's built-in image optimization automatically:

- Converts images to modern formats (WebP, AVIF)
- Generates responsive image sets
- Lazy loads images below the fold
- Optimizes file sizes without quality loss

```astro
---
import { Image } from "astro:assets";
import heroImage from "../assets/hero.jpg";
---

<!-- Automatically optimized and responsive -->
<Image
  src={heroImage}
  alt="Hero image"
  width={800}
  height={400}
  format="webp"
/>
```

## Development Experience

### Hot Module Replacement (HMR)

Astro's dev server provides instant feedback:

- **Fast refresh**: Changes appear immediately in the browser
- **Preserved state**: Form inputs and scroll position remain intact
- **Error overlay**: Clear error messages with stack traces

### Type-Safe Development

The combination of TypeScript and Astro's type generation creates a robust development environment:

```typescript
// Auto-generated types from content collections
import type { CollectionEntry } from "astro:content";

type BlogPost = CollectionEntry<"blog">;

// Type-safe content queries
const posts: BlogPost[] = await getCollection("blog", ({ data }) => {
  return !data.draft; // TypeScript knows 'draft' exists
});
```

## Deployment & Hosting

### GitHub Pages

I chose GitHub Pages for its simplicity and integration:

- **Free hosting**: Perfect for personal projects
- **Automatic deployments**: Push to main branch triggers build and deploy
- **Custom domain support**: Easy to set up with DNS configuration
- **HTTPS by default**: Secure connections out of the box

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
      - uses: actions/deploy-pages@v3
        with:
          path: ./dist
```

## Lessons Learned

### What Worked Well

1. **Astro's learning curve**: Surprisingly gentle for developers familiar with modern frameworks
2. **TypeScript integration**: Seamless setup with excellent tooling support
3. **Tailwind productivity**: Faster styling without sacrificing design quality
4. **Content Collections**: Type-safe content management feels like magic

### Challenges Overcome

1. **i18n complexity**: Required careful planning for URL structure and content organization
2. **SEO considerations**: Needed to implement proper meta tags and structured data
3. **Build optimization**: Fine-tuning for maximum performance scores

### Future Improvements

- **Search functionality**: Implement client-side search with Fuse.js
- **Comment system**: Add Giscus for GitHub-based comments
- **Analytics**: Integrate privacy-focused analytics
- **RSS feed**: Auto-generate RSS for blog subscribers

## Conclusion

Building this blog with Astro, TypeScript, and Tailwind CSS has been an incredibly rewarding experience. The combination provides:

- **Excellent performance**: Fast loading times and perfect Lighthouse scores
- **Great developer experience**: Type safety, hot reloading, and intuitive APIs
- **Future-proof architecture**: Easy to maintain and extend
- **SEO optimization**: Built-in best practices for search engines

If you're considering a similar tech stack for your next project, I highly recommend giving Astro a try. The framework's focus on performance and developer experience makes it an excellent choice for content-driven sites.

---

_Want to explore the source code? Check out the [GitHub repository](https://github.com/javiermiz/javiermiz.github.io) to see how everything comes together._
