import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { Component } from '@angular/core';

import { RouteMetaService, SITE_URL } from '../../core/route-meta.service';
import { BLOG_ARTICLES } from './articles';
import { blogArticleResolver } from './blog-article.resolver';
import { BlogArticleComponent } from './article.component';
import { BlogArticle } from './blog-article.model';

@Component({
  selector: 'qm-test-host',
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
class TestHostComponent {}

function metaContent(selector: string): string | null {
  return document.querySelector<HTMLMetaElement>(selector)?.getAttribute('content') ?? null;
}

async function configureApp(): Promise<{ router: Router; host: ComponentFixture<TestHostComponent> }> {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [
      provideRouter([
        { path: 'blog', component: TestHostComponent },
        {
          path: 'blog/:slug',
          resolve: { article: blogArticleResolver },
          component: BlogArticleComponent
        }
      ])
    ]
  }).compileComponents();

  TestBed.inject(RouteMetaService).init();
  const router = TestBed.inject(Router);
  const host = TestBed.createComponent(TestHostComponent);
  host.detectChanges();
  return { router, host };
}

describe('blogArticleResolver', () => {
  it('returns the article for a registered slug', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });

    const result = TestBed.runInInjectionContext(() =>
      blogArticleResolver(
        { paramMap: convertToParamMap({ slug: 'karkain' }) } as unknown as ActivatedRouteSnapshot,
        {} as never
      )
    );

    expect((result as BlogArticle).slug).toBe('karkain');
  });

  it('returns a redirect to the index for an unknown slug', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });

    const result = TestBed.runInInjectionContext(() =>
      blogArticleResolver(
        { paramMap: convertToParamMap({ slug: 'not-a-real-article' }) } as unknown as ActivatedRouteSnapshot,
        {} as never
      )
    );

    expect(result).toHaveProperty('redirectTo');
    expect(String((result as { redirectTo: unknown }).redirectTo)).toContain('/blog');
  });
});

describe('article navigation and metadata', () => {
  it('renders a known article and publishes its metadata', async () => {
    const { router, host } = await configureApp();
    await router.navigate(['/blog', 'karkain']);
    host.detectChanges();

    const article = BLOG_ARTICLES.find(a => a.slug === 'karkain')!;
    const text = (host.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain(article.title);
    expect(document.title).toBe(`${article.title} — QuantsMind`);
    expect(metaContent('meta[name="description"]')).toBe(article.summary);
  });

  it('derives Open Graph and Twitter tags from the same article', async () => {
    const { router, host } = await configureApp();
    await router.navigate(['/blog', 'guardmcp']);
    host.detectChanges();

    const article = BLOG_ARTICLES.find(a => a.slug === 'guardmcp')!;
    const expected = `${article.title} — QuantsMind`;

    expect(metaContent('meta[property="og:title"]')).toBe(expected);
    expect(metaContent('meta[property="og:description"]')).toBe(article.summary);
    expect(metaContent('meta[property="og:url"]')).toBe(`${SITE_URL}/blog/guardmcp/`);
    expect(metaContent('meta[name="twitter:title"]')).toBe(expected);
    expect(metaContent('meta[name="twitter:description"]')).toBe(article.summary);
  });

  it('updates metadata when navigating between two articles', async () => {
    const { router, host } = await configureApp();

    await router.navigate(['/blog', 'karkain']);
    host.detectChanges();
    const first = BLOG_ARTICLES.find(a => a.slug === 'karkain')!;
    expect(document.title).toBe(`${first.title} — QuantsMind`);

    await router.navigate(['/blog', 'vsector']);
    host.detectChanges();
    const second = BLOG_ARTICLES.find(a => a.slug === 'vsector')!;
    expect(document.title).toBe(`${second.title} — QuantsMind`);
    expect(metaContent('meta[property="og:url"]')).toBe(`${SITE_URL}/blog/vsector/`);
  });

  it('redirects an unknown slug to the index without rendering an article', async () => {
    const { router, host } = await configureApp();
    await router.navigate(['/blog', 'no-such-article']);
    host.detectChanges();

    expect(router.url).toBe('/blog');
    const text = (host.nativeElement as HTMLElement).textContent ?? '';
    expect(text).not.toContain('Article not found');
  });
});
