import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const step = z.object({
  label: z.string(),
  sub: z.string().optional(),
  // true for steps Vinay built; they are drawn in the accent colour
  mine: z.boolean().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // Position on the home page and in "next project" links
    order: z.number(),
    // One short paragraph: shown on the home card and under the page title
    summary: z.string(),
    stack: z.string(),
    note: z.string().optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })).max(3),
    links: z.array(
      z.object({
        label: z.string(), // short, for the home card: "GitHub", "Google Play"
        cta: z.string().optional(), // long, for the page button: "View code on GitHub"
        url: z.url(),
        primary: z.boolean().optional(),
      }),
    ),
    figures: z.array(z.object({ value: z.string(), label: z.string() })).length(2),
    screenshot: z
      .object({
        src: z.string(),
        alt: z.string().min(20),
        caption: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .optional(),
    flow: z
      .object({
        caption: z.string(),
        steps: z.array(z.union([step, z.object({ pair: z.array(step).length(2) })])),
      })
      .optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { projects };
