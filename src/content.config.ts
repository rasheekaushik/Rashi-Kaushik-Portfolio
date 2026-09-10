import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * The four domains behind the cards on the home page. Frontmatter drives the
 * card; the body is the detail page a recruiter lands on.
 */
const domains = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/domains" }),
  schema: z.object({
    /** Card face. `label` may contain a newline to control the line break. */
    label: z.string(),
    /** Page <h1> and <title>, without the line break. */
    title: z.string(),
    blurb: z.string(),
    order: z.number(),

    metric: z.string().nullable().default(null),
    metricLabel: z.string().nullable().default(null),
    stack: z.string(),

    /** Light pair, then dark pair. See the note in global.css. */
    bg: z.string(),
    ink: z.string(),
    bgDark: z.string(),
    inkDark: z.string(),

    /**
     * Not rendered anywhere. Points Rashi at the claims on this page that are
     * written from general practice rather than from her résumé, so she can
     * confirm or rewrite them before anyone reads it in an interview.
     */
    verify: z.array(z.string()).default([]),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    order: z.number(),
    duration: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    outcome: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { domains, work };
