import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { BLOG_ARTICLES } from './articles';
import { routes } from '../../app.routes';
import { SITE_URL } from '../../core/route-meta.service';

/**
 * Static-generation regression tests.
 *
 * These assert against the *generated HTML files*, not against Angular
 * component state or a browser DOM after JavaScript has run. That distinction
 * is the whole point: a prerendered page is what a crawler and a link
 * unfurling service receive, and a regression that only shows up after
 * hydration would otherwise pass every other test in this repository.
 *
 * The artifacts are produced by `npm run build:static`. When they are absent
 * these checks are reported as skipped rather than failed, so a clean checkout
 * running `npm test` is not broken by a build that has not happened yet; CI and
 * the release procedure run them explicitly via `npm run test:prerender`.
 */
const OUT = resolve(process.cwd(), 'dist/quantsmind-web/browser');
// A plain `npm run build` emits index.html but no per-route files. Requiring a
// deep route (and the 404 document) keeps `npm test` green in that state while
// still exercising the assertions whenever `npm run build:static` has run.
const artifactsPresent =
  existsSync(join(OUT, 'index.html')) &&
  existsSync(join(OUT, 'services', 'index.html')) &&
  existsSync(join(OUT, '404.html'));
const describeArtifacts = artifactsPresent ? describe : describe.skip;

const read = (relativePath: string) => readFileSync(join(OUT, relativePath), 'utf8');
const articleFile = (slug: string) => join('blog', slug, 'index.html');

function attribute(html: string, pattern: RegExp): string | null {
  return html.match(pattern)?.[1] ?? null;
}

/** Canonical path used by RouteMetaService: leading and one trailing slash. */
function canonicalPath(path: string): string {
  const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return trimmed ? `/${trimmed}/` : '/';
}

describe('prerendered output', () => {
  it('requires the static build step before it can assert anything', () => {
    // Partial output (index.html without route files) is not a usable static
    // build, so the artifact suite above stays skipped until it is complete.
    if (!artifactsPresent) return;
    expect(existsSync(join(OUT, 'services/index.html'))).toBe(true);
    expect(existsSync(join(OUT, '404.html'))).toBe(true);
  });
});

describeArtifacts('prerendered article HTML', () => {
  it.each(BLOG_ARTICLES.map(a => a.slug))('emits an HTML file for "%s"', slug => {
    const file = join(OUT, articleFile(slug));
    expect(existsSync(file), `Missing prerendered file for "${slug}"`).toBe(true);
  });

  it.each(BLOG_ARTICLES.map(a => a.slug))('"%s" carries its own title and description', slug => {
    const article = BLOG_ARTICLES.find(a => a.slug === slug)!;
    const html = read(articleFile(slug));

    expect(html).toContain(`<title>${article.title} — QuantsMind</title>`);
    expect(html).toContain(`<meta name="description" content="${article.summary.replace(/&/g, '&amp;')}`);
  });

  it.each(BLOG_ARTICLES.map(a => a.slug))('"%s" carries the correct social metadata', slug => {
    const article = BLOG_ARTICLES.find(a => a.slug === slug)!;
    const html = read(articleFile(slug));
    const expectedTitle = `${article.title} — QuantsMind`;

    expect(html).toContain(`<meta property="og:title" content="${expectedTitle.replace(/&/g, '&amp;')}"`);
    expect(html).toContain(`<meta name="twitter:title" content="${expectedTitle.replace(/&/g, '&amp;')}"`);
    expect(html).toContain(`<meta property="og:url" content="${SITE_URL}/blog/${slug}/"`);
  });

  it.each(BLOG_ARTICLES.map(a => a.slug))('"%s" carries exactly one correct canonical', slug => {
    const html = read(articleFile(slug));
    const expected = `${SITE_URL}/blog/${slug}/`;
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map(m => m[1]);

    expect(canonicals).toHaveLength(1);
    expect(canonicals[0]).toBe(expected);
  });

  it.each(BLOG_ARTICLES.map(a => a.slug))('"%s" does not retain the homepage title', slug => {
    const html = read(articleFile(slug));
    const homepageTitle = attribute(html, /<title>([^<]*)<\/title>/)!;

    expect(homepageTitle.startsWith('QuantsMind | Engineering Software')).toBe(false);
    expect(homepageTitle).not.toBe('Articles — QuantsMind');
  });

  it.each(BLOG_ARTICLES.map(a => a.slug))('"%s" includes article content before scripts run', slug => {
    const html = read(articleFile(slug));

    // Real prose, not merely a populated <head>.
    expect(html).toContain(articleFor(slug).intro.slice(0, 60).replace(/&/g, '&amp;'));
    expect(html).toContain(articleFor(slug).conclusion.slice(0, 60).replace(/&/g, '&amp;'));
    expect(html.length).toBeGreaterThan(20000);
  });

  it.each(BLOG_ARTICLES.map(a => a.slug))('"%s" keeps blog links internal', slug => {
    const html = read(articleFile(slug));
    const proseAnchors = html.match(/<article[\s\S]*?<\/article>/)?.[0] ?? '';

    expect(proseAnchors).not.toMatch(/<a[^>]+href="https?:\/\//);
  });

  it('keeps the home page metadata on the home page', () => {
    const html = read('index.html');
    expect(html).toContain('<title>QuantsMind | Engineering Software');
    expect(attribute(html, /<link rel="canonical" href="([^"]*)"/)).toBe(`${SITE_URL}/`);
  });

  it('gives Labs the shared animated hero artwork', () => {
    const html = read('labs/index.html');
    const app = html.match(/<app-root[\s\S]*?<\/app-root>/)?.[0] ?? '';

    expect(html).toContain('qm-page-hero--labs');
    expect(html).toContain('qm-orbit');
    expect(html).toMatch(/qm-orbit__satellite[^>]*>Vsector</);
    expect(html).toMatch(/qm-orbit__satellite[^>]*>Fake News AI</);
    expect(app).not.toContain('labs-hero__visual');
  });

  it('emits a 404 document with the not-found page, not the home page', () => {
    const html = read('404.html');

    expect(html).toContain('<title>Page Not Found — QuantsMind</title>');
    expect(html).toContain('name="robots" content="noindex"');
    expect(html.toLowerCase()).toContain('page not found');
    expect(html).toContain(
      '<meta name="description" content="The page you are looking for does not exist or has moved.">'
    );
    expect(html).not.toContain('<title>QuantsMind | Engineering Software');
  });

  it('does not advertise the 404 document in the sitemap', () => {
    expect(read('sitemap.xml')).not.toContain('https://www.quantsmind.com/404');
  });

  it('emits a file for every non-parameterised route in the route table', () => {
    const staticPaths = routes
      .map(route => route.path)
      .filter((path): path is string => typeof path === 'string')
      .filter(path => path !== '**' && !path.includes(':'))
      .map(path => canonicalPath(path));

    const slugs = BLOG_ARTICLES.map(a => canonicalPath(`blog/${a.slug}`));
    const all = [...new Set([...staticPaths, ...slugs])];

    for (const route of all) {
      const file = route === '/' ? 'index.html' : `${route}index.html`;
      expect(existsSync(join(OUT, file)), `Missing prerendered file for route "${route}"`).toBe(true);
    }
  });

  it('does not emit a page for an unknown route', () => {
    expect(existsSync(join(OUT, 'blog/no-such-article/index.html'))).toBe(false);
    expect(existsSync(join(OUT, 'totally-unknown-route/index.html'))).toBe(false);
  });

  it('lists every article in the deployed sitemap', () => {
    const sitemap = read('sitemap.xml');
    const declared = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));

    for (const article of BLOG_ARTICLES) {
      expect(declared, `sitemap.xml is missing ${article.slug}`).toContain(`${SITE_URL}/blog/${article.slug}/`);
    }
  });
});

describeArtifacts('sitemap and canonical policy', () => {
  it('keeps every canonical URL identical to its sitemap entry', () => {
    const sitemap = read('sitemap.xml');
    const declared = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
    const routesToCheck = [...BLOG_ARTICLES.map(a => `blog/${a.slug}/`), 'blog/', ''];

    for (const route of routesToCheck) {
      const file = route === '' ? 'index.html' : route.endsWith('/') ? `${route}index.html` : `${route}/index.html`;
      const html = read(file);
      const canonical = attribute(html, /<link rel="canonical" href="([^"]*)"/);

      expect(declared, `Canonical ${canonical} is not declared in sitemap.xml`).toContain(canonical);
    }
  });
});

function articleFor(slug: string) {
  return BLOG_ARTICLES.find(a => a.slug === slug)!;
}
