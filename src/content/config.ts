import { defineCollection, z } from "astro:content";

// Blog posts collection schema
const blog_collection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published_date: z.date(),
    updated_date: z.date().optional(),
    category: z.enum([
      "technology",
      "personal",
      "productivity",
      "tutorials",
      "projects",
    ]),
    featured_image: z.string().optional(),
    featured_image_alt: z.string().optional(),
    draft: z.boolean().default(false),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
  }),
});

// Export collections
export const collections = {
  blog: blog_collection,
};
