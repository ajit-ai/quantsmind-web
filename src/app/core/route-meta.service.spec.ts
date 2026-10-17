import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { RouteMetaService, SITE_URL } from './route-meta.service';

describe('RouteMetaService.canonicalUrl', () => {
  let service: RouteMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    service = TestBed.inject(RouteMetaService);
  });

  it('keeps the site root canonical', () => {
    expect(service.canonicalUrl('/')).toBe(`${SITE_URL}/`);
  });

  it('adds the trailing slash the sitemap uses', () => {
    expect(service.canonicalUrl('/technology')).toBe(`${SITE_URL}/technology/`);
  });

  it('does not double a trailing slash that is already present', () => {
    expect(service.canonicalUrl('/technology/')).toBe(`${SITE_URL}/technology/`);
  });

  it('canonicalises a nested article path', () => {
    expect(service.canonicalUrl('/blog/karkain')).toBe(`${SITE_URL}/blog/karkain/`);
  });

  it('drops the query string', () => {
    expect(service.canonicalUrl('/blog/karkain?utm_source=x')).toBe(`${SITE_URL}/blog/karkain/`);
  });

  it('drops the fragment', () => {
    expect(service.canonicalUrl('/blog/karkain#conclusion')).toBe(`${SITE_URL}/blog/karkain/`);
  });

  it('drops both query and fragment', () => {
    expect(service.canonicalUrl('/blog/karkain?a=1#b')).toBe(`${SITE_URL}/blog/karkain/`);
  });

  it('produces an absolute URL on the configured site host', () => {
    expect(service.canonicalUrl('/labs').startsWith(`${SITE_URL}/`)).toBe(true);
  });

  it('normalises every registered article to a canonical URL', () => {
    // Guards the policy against future articles: none may produce a bare or
    // duplicated-slash URL.
    for (const slug of ['karkain', 'microquantum', 'guardmcp', 'vsector']) {
      expect(service.canonicalUrl(`/blog/${slug}`)).toBe(`${SITE_URL}/blog/${slug}/`);
    }
  });
});
