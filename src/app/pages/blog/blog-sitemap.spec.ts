import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { BLOG_ARTICLES } from './articles';
import { SITE_URL } from '../../core/route-meta.service';

const SITEMAP = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8');

const SITEMAP_URLS = [...SITEMAP.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const SLUGS = BLOG_ARTICLES.map(article => article.slug);

describe('sitemap', () => {
  it('lists the blog index once', () => {
    expect(SITEMAP_URLS).toContain(`${SITE_URL}/blog/`);
  });

  it('lists every registered article exactly once', () => {
    const articleUrls = SLUGS.map(slug => `${SITE_URL}/blog/${slug}/`);

    for (const url of articleUrls) {
      expect(SITEMAP_URLS.filter(entry => entry === url)).toHaveLength(1);
    }
  });

  it('has no blog article entries that are not registered articles', () => {
    const expected = new Set([...SLUGS.map(slug => `${SITE_URL}/blog/${slug}/`), `${SITE_URL}/blog/`]);
    const unexpected = SITEMAP_URLS.filter(url => url.startsWith(`${SITE_URL}/blog/`) && !expected.has(url));

    expect(unexpected, `Unexpected blog URLs in sitemap: ${unexpected.join(', ')}`).toEqual([]);
  });

  it('keeps every registered article reachable through the sitemap', () => {
    const listed = SITEMAP_URLS.filter(url => url.startsWith(`${SITE_URL}/blog/`));
    expect(listed.length).toBe(SLUGS.length + 1);
  });

  it('uses the same trailing-slash convention the canonical URL produces', () => {
    // Sitemap URLs are the reference form: no entry may lack a trailing slash,
    // or the canonical would advertise a different URL for the same page.
    const withoutSlash = SITEMAP_URLS.filter(
      url => url.startsWith(SITE_URL) && url !== `${SITE_URL}/` && !url.endsWith('/')
    );

    expect(withoutSlash, `Sitemap URLs missing a trailing slash: ${withoutSlash.join(', ')}`).toEqual([]);
  });
});
