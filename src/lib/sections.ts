// Splits a project's rendered Markdown into sections, so the page template
// can give each "## Heading" its own band.

export interface Panel {
  title: string;
  html: string;
}

export interface Section {
  title: string;
  /** Content before any "### Sub-heading". */
  html: string;
  /** One per "### Sub-heading" in the section. */
  panels: Panel[];
}

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'" };

/** Heading text without tags or HTML entities (the template escapes it again). */
const plainText = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (entity) => ENTITIES[entity])
    .trim();

/** Tables scroll inside their own box; outside links open in a new tab. */
const finish = (html: string) =>
  html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');

function splitAt(html: string, tag: 'h2' | 'h3') {
  const open = new RegExp(`<${tag}[^>]*>`);
  const close = `</${tag}>`;
  const [before, ...chunks] = html.split(open);
  const parts = chunks.map((chunk) => {
    const end = chunk.indexOf(close);
    return { title: plainText(chunk.slice(0, end)), html: chunk.slice(end + close.length).trim() };
  });
  return { before: before.trim(), parts };
}

export function splitSections(html: string, source = 'project'): Section[] {
  const { before, parts } = splitAt(html, 'h2');
  if (before) {
    // Text above the first "## Heading" has no band to live in and would vanish.
    throw new Error(`${source}: move the text above the first "## Heading" into a section`);
  }
  return parts.map((section) => {
    const inner = splitAt(section.html, 'h3');
    return {
      title: section.title,
      html: finish(inner.before),
      panels: inner.parts.map((panel) => ({ title: panel.title, html: finish(panel.html) })),
    };
  });
}
