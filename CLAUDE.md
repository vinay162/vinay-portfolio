# CLAUDE.md

Guidance for working in this repository. This repo is public.

## What this is

Vinay Purohit's portfolio: a static site built with Astro. Plain HTML and
CSS, no client-side JavaScript, no UI framework. Vercel deploys the `main`
branch to production at https://vinaypurohit.vercel.app.

Workflow: edit on `redesign`, run `npm run build` (it must print `OK`),
commit, fast-forward `main` to `redesign`, push both, then check the live
site. Changes go straight to production; there is no preview step.

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
  Experience, Skills, Education. Experience entries are bullet `points`
  (past-tense verbs or noun phrases, never present-tense "-s" verbs like
  "Builds", which read as third person; no full stops) with the location
  in `where`,
  shown under the date, never inside the bullets. Skills copy the
  resume's skills block word for word.
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

- `figures`: one or two real, measured results. Never pad with a status
  ("Live") or a setting ("10 min") just to fill the second slot. They show
  on the home page card and again at the top of the project page, as key
  results.
- `ongoing: true` adds an "Ongoing" pill and an accent border, for work
  still in active development.
- Text above the first `##` heading, or a `flow` diagram without a
  `## How it works` section, fails the build on purpose.

## Visitor test (run for every change or addition)

Before shipping, walk the change through as each kind of visitor and ask
what they would try: a lazy skimmer (taps titles, cards, figures), an
impatient recruiter landing on a deep link (needs resume, contact and the
way back from every page), a reader at the end of a page (needs a next
step), a cautious clicker (needs to see which links leave the site), a
phone user at 390px (no sideways scroll, no clipped text, no wasted
header lines), a keyboard or screen-reader user (visible focus, link text
that makes sense on its own), and a skeptical engineer (code, store and
demo links easy to find). Then check it in a real browser: the build,
phone and desktop screenshots, and, for anything clickable, where clicks
actually land.

Patterns already in place, so keep them working:
- Project cards open their page from anywhere on the card. The title is
  the only real link, stretched over the card with `::after`; other links
  in the card sit above it with `position: relative; z-index: 1`.
- Text links with `target="_blank"` get a ↗ from `base.css`. Add
  `class="no-arrow"` for image links.
- Resume (PDF) is in the header on every page. Project pages end with
  email, LinkedIn, GitHub and resume links.
- Tables have no minimum width, so they wrap on phones.

## Link preview image

`public/og-2.png` is generated from `scripts/og-image.html` (instructions
at the top of that file). Keep everything in the centre square, because
some apps crop it. When it changes, give it a new name (`og-3.png`) and
update `src/layouts/Base.astro`, so apps fetch the new one.

## Rules

- Every fact on the site must be true and already agreed with Vinay. Do
  not add numbers, tools or claims on your own.
- Copy is crisp and impersonal: no "I", no greetings, no slogans, no em
  dashes.
- The orange accent (`--pop`) appears only on navy bands: one main button
  per page, the email underline, the next-project underline.
- Public site: no client or employer internal data. No money figures
  (the build fails on any dollar amount), no usage counts that are not
  already public, no internal tools or processes. Engineering results
  (percentages, latency, test results) are fine.
- Outside links and the resume open in a new tab; links within the site
  do not.
- Write text containing a dollar sign with an editor, never through a
  double-quoted shell string: the shell expands it.
- The site must work with JavaScript disabled.
- Keep it accessible: real alt text, visible focus, readable contrast.
