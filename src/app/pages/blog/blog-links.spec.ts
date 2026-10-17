import { routes } from '../../app.routes';
import { LabsComponent } from '../labs/labs.component';
import { BLOG_ARTICLES } from './articles/index';
import { BlogArticle } from './blog-article.model';

/**
 * Concrete routes from the route table, excluding the catch-all and the
 * parameterised patterns. A catch-all must not count as proof that a route
 * exists, or every verification link would appear valid.
 */
const ALL_PATHS = routes
  .map(route => route.path)
  .filter((path): path is string => typeof path === 'string');

const STATIC_ROUTES = new Set(
  ALL_PATHS.filter(path => path.length > 0 && !path.includes(':') && path !== '**')
);

/**
 * Routes a verification entry is allowed to point at.
 *
 * A verification destination exists so a reader can check a claim about a
 * specific project, so the blog index ('/blog') is excluded: pointing an
 * article back at the index would send the reader to a list rather than to
 * anything describing the project. The catch-all ('**') and the parameterised
 * article pattern ('blog/:slug') are excluded for the same reason — neither
 * names a project's own page, and accepting them would make almost any string
 * look valid.
 */
const VERIFICATION_ROUTES = new Set([
  'products',
  'technology',
  'labs',
  'microquantum',
  'karkain',
  'quantsmind-sdk'
]);

const SLUGS = BLOG_ARTICLES.map(article => article.slug);

/** Verification entries across every article, paired with their article. */
const VERIFICATIONS = BLOG_ARTICLES.flatMap((article: BlogArticle) =>
  (article.verification ?? []).map(entry => ({ slug: article.slug, ...entry }))
);

/** The Labs cards that point into the article library. */
const LABS_ARTICLE_CARDS = [
  { name: 'MicroQuantum', slug: 'microquantum', cta: 'Read the MicroQuantum article' },
  { name: 'Karkain', slug: 'karkain', cta: 'Read the Karkain article' },
  { name: 'QuantsMind SDK', slug: 'quantsmind-sdk', cta: 'Read the SDK article' }
] as const;

describe('blog routes', () => {
  it('serves the article index and an article detail route', () => {
    expect(STATIC_ROUTES.has('blog')).toBe(true);
    expect(ALL_PATHS).toContain('blog/:slug');
  });

  it('declares the index before the parameterised article route', () => {
    expect(ALL_PATHS.indexOf('blog')).toBeLessThan(ALL_PATHS.indexOf('blog/:slug'));
  });
});

describe('article verification destinations', () => {
  it('declares at least one verification destination overall', () => {
    expect(VERIFICATIONS.length).toBeGreaterThan(0);
  });

  it.each(VERIFICATIONS)('"$label" is an internal site-relative route', entry => {
    expect(entry.route.startsWith('/')).toBe(true);
    // '//host' and 'https://host' are absolute, not internal.
    expect(entry.route.startsWith('//')).toBe(false);
  });

  it.each(VERIFICATIONS)('"$label" resolves to a route that exists', entry => {
    const path = entry.route.replace(/^\//, '');
    expect(STATIC_ROUTES.has(path)).toBe(true);
  });

  it.each(VERIFICATIONS)('"$label" points at a page describing the project', entry => {
    const path = entry.route.replace(/^\//, '');
    expect(
      VERIFICATION_ROUTES.has(path),
      `Article "${entry.slug}" points at "${entry.route}", which is not an approved project page. ` +
      `Expected one of: ${[...VERIFICATION_ROUTES].join(', ')}.`
    ).toBe(true);
  });

  it.each(VERIFICATIONS)('"$label" contains no external URL', entry => {
    expect(entry.route).not.toMatch(/^[a-z][a-z0-9+.-]*:\/\//i);
    expect(entry.route).not.toContain('www.');
  });

  it('rejects destinations that only look valid', () => {
    // Guards the matcher itself: if these ever passed, the checks above would
    // be meaningless.
    expect(STATIC_ROUTES.has('**')).toBe(false);
    expect(STATIC_ROUTES.has('blog/:slug')).toBe(false);
    expect(VERIFICATION_ROUTES.has('blog')).toBe(false);
    expect(VERIFICATION_ROUTES.has('not-a-real-page')).toBe(false);
  });
});

describe('Labs connection cards', () => {
  const connections = new LabsComponent().connections;

  it.each(LABS_ARTICLE_CARDS)('the $name card targets /blog/$slug', card => {
    const connection = connections.find(entry => entry.name === card.name);

    expect(connection).toBeDefined();
    expect(connection!.route).toBe(`/blog/${card.slug}`);
  });

  it.each(LABS_ARTICLE_CARDS)('the $name card keeps its CTA label', card => {
    const connection = connections.find(entry => entry.name === card.name);

    expect(connection!.cta).toBe(card.cta);
  });

  it.each(LABS_ARTICLE_CARDS)('the $name card targets an article that exists', card => {
    expect(SLUGS).toContain(card.slug);
  });

  it('does not duplicate an article across the Labs cards', () => {
    const targets = connections
      .map(connection => connection.route)
      .filter(route => route.startsWith('/blog/'));

    expect(new Set(targets).size).toBe(targets.length);
  });
});
