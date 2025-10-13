import {promises as fs} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function titleCase(text) {
  return text
    .split(/\s+/)
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function normalizePath(permalink, {trailingSlash}) {
  if (!permalink) {
    return '/';
  }

  let result = permalink.startsWith('/') ? permalink : `/${permalink}`;

  if (trailingSlash) {
    if (result !== '/' && !result.endsWith('/')) {
      result += '/';
    }
  } else if (result !== '/') {
    result = result.replace(/\/+$/, '');
  }

  return result;
}

function formatList(items) {
  return items.map((item) => `- [${item.label}](${item.url})${item.note ? `: ${item.note}` : ''}`).join('\n');
}

async function loadBlogPosts(config) {
  const blogListPath = path.join(
    rootDir,
    '.docusaurus',
    'docusaurus-plugin-content-blog',
    'default',
    'blog-post-list-prop-default.json',
  );

  try {
    const raw = await fs.readFile(blogListPath, 'utf-8');
    const data = JSON.parse(raw);
    const trailingSlash = Boolean(config.trailingSlash);
    const siteBase = buildSiteBase(config);

    const posts = (data.items ?? [])
      .filter((item) => !item.unlisted)
      .map((item) => {
        const normalized = normalizePath(item.permalink, {trailingSlash});
        return {
          label: item.title,
          path: normalized,
          url: `${siteBase}${normalized}`,
        };
      });

    return posts;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function loadPageMetadata(config) {
  const pagesDir = path.join(
    rootDir,
    '.docusaurus',
    'docusaurus-plugin-content-pages',
    'default',
  );

  const trailingSlash = Boolean(config.trailingSlash);
  const metadata = new Map();

  try {
    const entries = await fs.readdir(pagesDir);
    await Promise.all(
      entries
        .filter((entry) => entry.endsWith('.json'))
        .map(async (entry) => {
          if (entry === '__plugin.json') {
            return;
          }
          const raw = await fs.readFile(path.join(pagesDir, entry), 'utf-8');
          const data = JSON.parse(raw);
          if (data.permalink && data.title) {
            metadata.set(normalizePath(data.permalink, {trailingSlash}), data.title);
          }
        }),
    );
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  return metadata;
}

async function loadRoutePaths(config) {
  const routesPath = path.join(rootDir, '.docusaurus', 'routes.js');
  const trailingSlash = Boolean(config.trailingSlash);
  const content = await fs.readFile(routesPath, 'utf-8');
  const regex = /path:\s*'([^']+)'/g;
  const paths = new Set();
  let match;
  while ((match = regex.exec(content)) !== null) {
    const routePath = match[1];
    if (routePath === '*') {
      continue;
    }
    paths.add(normalizePath(routePath, {trailingSlash}));
  }
  return Array.from(paths);
}

function derivePageLabel(pathname, metadata, config) {
  const trailingSlash = Boolean(config.trailingSlash);
  const normalized = normalizePath(pathname, {trailingSlash});
  if (normalized === '/') {
    return 'Home';
  }
  const known = new Map([
    [normalizePath('/blog/', {trailingSlash}), 'Blog'],
    [normalizePath('/blog/archive/', {trailingSlash}), 'Blog Archive'],
    [normalizePath('/blog/authors/', {trailingSlash}), 'Blog Authors'],
    [normalizePath('/blog/tags/', {trailingSlash}), 'All Blog Tags'],
  ]);

  if (known.has(normalized)) {
    return known.get(normalized);
  }

  const metaTitle = metadata.get(normalized);
  if (metaTitle) {
    return metaTitle;
  }

  const trimmed = normalized.replace(/^\/+|\/+$/g, '');
  if (!trimmed) {
    return config.title ?? 'Site';
  }

  const segments = trimmed.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  return titleCase(lastSegment.replace(/[-_]/g, ' '));
}

function buildSiteBase(config) {
  const siteUrl = (config.url ?? '').replace(/\/$/, '');
  const baseUrl = (config.baseUrl ?? '/').replace(/\/$/, '');
  return `${siteUrl}${baseUrl === '' ? '' : baseUrl}`;
}

function buildOptionalEntry(pathname, config) {
  const trailingSlash = Boolean(config.trailingSlash);
  const normalized = normalizePath(pathname, {trailingSlash});

  if (/^\/blog\/\d{4}\//.test(normalized)) {
    const year = normalized.split('/')[2];
    return {
      label: `Blog Archive ${year}`,
      path: normalized,
    };
  }

  if (/^\/blog\/page\//.test(normalized)) {
    const pageNumber = normalized.split('/')[3];
    return {
      label: `Blog Index Page ${pageNumber}`,
      path: normalized,
    };
  }

  if (/^\/blog\/tags\//.test(normalized)) {
    const rest = normalized.replace(normalizePath('/blog/tags/', {trailingSlash}), '');
    if (!rest) {
      return {
        label: 'All Blog Tags',
        path: normalized,
      };
    }
    const segments = rest.split('/').filter(Boolean);
    if (segments.length >= 1) {
      const tag = decodeURIComponent(segments[0]);
      if (segments.length === 1) {
        return {
          label: `Tag: ${titleCase(tag.replace(/[-_]/g, ' '))}`,
          path: normalized,
        };
      }
      if (segments[1] === 'page') {
        const page = segments[2] ?? segments[1];
        const pageNumber = page.replace(/[^0-9]/g, '') || page;
        return {
          label: `Tag: ${titleCase(tag.replace(/[-_]/g, ' '))} (Page ${pageNumber})`,
          path: normalized,
        };
      }
    }
  }

  return null;
}

async function main() {
  const configModule = await import(path.join(rootDir, '.docusaurus', 'docusaurus.config.mjs'));
  const siteConfig = configModule.default ?? {};
  const siteBase = buildSiteBase(siteConfig);

  const templatePath = path.join(rootDir, 'templates', 'llms.txt.tpl');
  const template = await fs.readFile(templatePath, 'utf-8');

  const [blogPosts, pageMetadata, routePaths] = await Promise.all([
    loadBlogPosts(siteConfig),
    loadPageMetadata(siteConfig),
    loadRoutePaths(siteConfig),
  ]);

  const blogPostPaths = new Set(blogPosts.map((post) => post.path));

  const pageEntries = [];
  const optionalEntries = [];

  for (const route of routePaths) {
    if (blogPostPaths.has(route)) {
      continue;
    }

    const optional = buildOptionalEntry(route, siteConfig);
    if (optional) {
      optionalEntries.push({
        ...optional,
        url: `${siteBase}${optional.path}`,
      });
      continue;
    }

    const label = derivePageLabel(route, pageMetadata, siteConfig);
    const entry = {
      label,
      path: route,
      url: `${siteBase}${route}`,
    };

    if (!pageEntries.find((item) => item.path === entry.path)) {
      pageEntries.push(entry);
    }
  }

  pageEntries.sort((a, b) => a.label.localeCompare(b.label));
  optionalEntries.sort((a, b) => a.label.localeCompare(b.label));

  const pagesList = formatList(pageEntries);
  const blogList = formatList(blogPosts.map((post) => ({label: post.label, url: post.url})));
  const optionalSection = optionalEntries.length
    ? `## Optional\n${formatList(optionalEntries)}\n`
    : '';

  const output = template
    .replace('{{pages}}', pagesList)
    .replace('{{blogPosts}}', blogList)
    .replace('{{optionalSection}}', optionalSection)
    .trimEnd()
    .concat('\n');

  const outputPath = path.join(rootDir, 'build', 'llms.txt');
  await fs.mkdir(path.dirname(outputPath), {recursive: true});
  await fs.writeFile(outputPath, output, 'utf-8');
  console.log(`Generated llms.txt with ${pageEntries.length} pages, ${blogPosts.length} blog posts, and ${optionalEntries.length} optional entries.`);
}

function handleError(error) {
  console.error('Failed to generate llms.txt:', error);
  process.exitCode = 1;
}

main().catch(handleError);
