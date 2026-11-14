# CLAUDE.md

Guidance for working in this repository. This repo is public.

## What this is

Vinay Purohit's portfolio: a static site built with Astro. Plain HTML and
CSS, no client-side JavaScript, no UI framework. Vercel deploys the `main`
branch to production and builds a preview for every other branch.

## Commands

```bash
npm run dev      # local dev server
npm run build    # build to dist/, then run scripts/check-dist.mjs
npm run preview  # serve the built site
npm run check    # run the dist checks on their own
```

`npm run build` fails if the checks fail. Do not bypass them.

## Where things live

- `astro.config.mjs`: the site's public address (`site`). Change it here only.
- `src/styles/tokens.css`: every colour and the typeface. No hex values
  anywhere else.
- `src/styles/base.css`: shared foundations (bands, buttons, type).
- `src/data/site.ts`: name, role, intro, contact links, Other work,
  Experience.
- `src/content/projects/*.md`: one file per project. The header block
  holds the summary, links, figures and diagram steps; the body holds the
  sections (`## Problem`, `## How it works`, `## Key decisions`,
  `## Results`).
- `src/pages/projects/[slug].astro`: the project page template.
- `scripts/check-dist.mjs`: build checks (banned words, broken links,
  metadata, page-specific content).

## Adding a project

Add one Markdown file to `src/content/projects/` following `lore.md`. Set
`order` to place it. It appears on the home page, gets its own page, and
is added to `llms.txt` and the sitemap automatically.

## Rules

- Every fact on the site must be true and already agreed with Vinay. Do
  not add numbers, tools or claims on your own.
- Copy is crisp and impersonal: no "I", no greetings, no slogans, no em
  dashes.
- The orange accent (`--pop`) appears only on navy bands: one main button
  per page, the email underline, the next-project underline.
- The site must work with JavaScript disabled.
- Keep it accessible: real alt text, visible focus, readable contrast.
