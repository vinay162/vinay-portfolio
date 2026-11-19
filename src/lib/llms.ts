// Builds llms.txt and llms-full.txt from the same data the pages use, so
// what AI tools read can never drift from what people read.
// Layout follows https://llmstxt.org: title, summary, details, link sections.

import { getCollection, type CollectionEntry } from 'astro:content';
import { site, type Figure } from '../data/site';

type Project = CollectionEntry<'projects'>;

const figureLine = (figures: Figure[]) =>
  `Key figures: ${figures.map((figure) => `${figure.value} ${figure.label}`).join('; ')}.`;

async function publishedProjects(): Promise<Project[]> {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** Every project for the Projects list, in home-page order. */
async function projectLines(origin: URL): Promise<string[]> {
  const published = (await publishedProjects()).map((entry) => ({
    order: entry.data.order,
    title: entry.data.title,
    url: new URL(`/projects/${entry.id}/`, origin).href,
    text: `${entry.data.summary} ${figureLine(entry.data.figures)}`,
  }));
  // Projects without a page yet link to their store listing, or to the home page.
  const upcoming = site.upcoming.map((project) => ({
    order: project.order,
    title: project.title,
    url: project.links[0]?.url ?? new URL('/#projects', origin).href,
    text: `${project.summary} ${figureLine(project.figures)}`,
  }));
  return [...published, ...upcoming]
    .sort((a, b) => a.order - b.order)
    .map((project) => `- [${project.title}](${project.url}): ${project.text}`);
}

export async function buildLlmsTxt(origin: URL): Promise<string> {
  const url = (path: string) => new URL(path, origin).href;
  return [
    `# ${site.name}`,
    '',
    `> ${site.about.summary}`,
    '',
    'Key facts:',
    '',
    ...site.about.facts.map((fact) => `- ${fact}`),
    '',
    '## Projects',
    '',
    ...(await projectLines(origin)),
    '',
    '## About',
    '',
    `- [Home](${url('/')}): Summary, all projects, experience and contact details.`,
    `- [Resume (PDF)](${url(site.resumePath)}): One-page resume.`,
    '',
    '## Contact',
    '',
    `- [Email](mailto:${site.email}): ${site.email}`,
    `- [LinkedIn](${site.links.linkedin}): Professional profile.`,
    `- [GitHub](${site.links.github}): Code, including Lore.`,
    '',
    '## Optional',
    '',
    `- [Full text of this site](${url('/llms-full.txt')}): Every page as Markdown in one file.`,
    '',
  ].join('\n');
}

export async function buildLlmsFullTxt(origin: URL): Promise<string> {
  const url = (path: string) => new URL(path, origin).href;
  const projects = (await publishedProjects()).flatMap((entry) => [
    `# ${entry.data.title}`,
    '',
    `Page: ${url(`/projects/${entry.id}/`)}`,
    '',
    entry.data.summary,
    '',
    ...entry.data.facts.map((fact) => `- ${fact.label}: ${fact.value}`),
    ...entry.data.links.map((link) => `- ${link.label}: ${link.url}`),
    `- ${figureLine(entry.data.figures)}`,
    '',
    (entry.body ?? '').trim(),
    '',
    '---',
    '',
  ]);
  const upcoming = site.upcoming.flatMap((project) => [
    `# ${project.title}`,
    '',
    project.summary,
    '',
    `- Built with: ${project.stack}${project.note ? ` ${project.note}` : ''}`,
    ...project.links.map((link) => `- ${link.label}: ${link.url}`),
    `- ${figureLine(project.figures)}`,
    '',
    '---',
    '',
  ]);
  return [
    `# ${site.name}`,
    '',
    `> ${site.about.summary}`,
    '',
    ...site.about.facts.map((fact) => `- ${fact}`),
    '',
    `Contact: ${site.email}, ${site.links.linkedin}, ${site.links.github}`,
    '',
    '---',
    '',
    ...upcoming,
    ...projects,
    '# Other work',
    '',
    ...site.otherWork.map((item) => `- ${item.title}: ${item.text}`),
    '',
    '# Experience',
    '',
    ...site.experience.flatMap((item) => [
      `- ${item.when}, ${item.where}: ${item.title}`,
      ...item.points.map((point) => `  - ${point}`),
    ]),
    '',
    '# Skills',
    '',
    ...site.skills.map((item) => `- ${item.title}: ${item.text}`),
    '',
    '# Education',
    '',
    ...site.education.map((item) => `- ${item.when}, ${item.where}: ${item.title}. ${item.text}`),
    '',
  ].join('\n');
}
