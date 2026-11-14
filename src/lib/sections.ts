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

const plainText = (html: string) => html.replace(/<[^>]+>/g, '').trim();

/** Tables scroll inside their own box on narrow screens. */
const wrapTables = (html: string) =>
  html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');

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

export function splitSections(html: string): Section[] {
  return splitAt(html, 'h2').parts.map((section) => {
    const { before, parts } = splitAt(section.html, 'h3');
    return {
      title: section.title,
      html: wrapTables(before),
      panels: parts.map((panel) => ({ title: panel.title, html: wrapTables(panel.html) })),
    };
  });
}
