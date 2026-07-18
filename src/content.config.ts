import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCategories = [
  'AI',
  'Software Development',
  'Automation',
  'Cloud',
  'Architecture',
  'Product',
  'Engineering',
  'Frontend',
  'Artificial Intelligence',
  'Software Architecture',
] as const;

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('EatCodeSleep'),
    category: z.enum(blogCategories),
    tags: z.array(z.string()).default([]),
    readingTime: z.string(),
    coverImage: z.string().optional(),
    coverVariant: z
      .enum(['ai', 'architecture', 'automation', 'engineering', 'cloud', 'frontend', 'product'])
      .default('engineering'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
