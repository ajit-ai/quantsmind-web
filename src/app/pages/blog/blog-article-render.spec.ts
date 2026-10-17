import { TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BLOG_ARTICLES, articleBySlug } from './articles';
import { BlogArticleComponent } from './article.component';
import { BlogArticle } from './blog-article.model';

function renderArticle(slug: string): { component: BlogArticleComponent; host: HTMLElement } {
  const article = articleBySlug(slug);
  return renderResolved(article);
}

/** Renders the component with an explicit resolved article. */
function renderResolved(article?: BlogArticle): { component: BlogArticleComponent; host: HTMLElement } {
  const data = article ? { article } : {};

  TestBed.configureTestingModule({
    imports: [BlogArticleComponent],
    providers: [
      provideRouter([]),
      // The component reads the article from the route's resolved data.
      { provide: ActivatedRoute, useValue: { data: of(data), snapshot: { data } } }
    ]
  });

  const fixture = TestBed.createComponent(BlogArticleComponent);
  fixture.detectChanges();

  return { component: fixture.componentInstance, host: fixture.nativeElement as HTMLElement };
}

describe('BlogArticleComponent rendering', () => {
  it('renders the title, category and maturity label', () => {
    const { host } = renderArticle('karkain');
    const article = articleBySlug('karkain')!;

    expect(host.querySelector('h1')?.textContent).toContain(article.title);
    expect(host.textContent).toContain(article.category);
    expect(host.textContent).toContain(article.maturity);
  });

  it('renders every section heading as a level-2 heading', () => {
    const { host } = renderArticle('karkain');
    const article = articleBySlug('karkain')!;
    const headings = [...host.querySelectorAll('.prose__section h2')].map(h => h.textContent?.trim());

    for (const section of article.sections) {
      expect(headings).toContain(section.heading);
    }
    expect(headings).toContain('Conclusion');
  });

  it('renders paragraphs and information cards', () => {
    const { host } = renderArticle('karkain');

    expect(host.querySelectorAll('.prose__section > p').length).toBeGreaterThan(0);
    expect(host.querySelectorAll('qm-info-card').length).toBeGreaterThan(0);
  });

  it('renders code samples carried by information cards', () => {
    // Code currently lives inside cards rather than as standalone blocks, so
    // it must be asserted through the card that owns it.
    const { host } = renderArticle('karkain');
    const cardCode = host.querySelector('qm-info-card .qm-info__code-block');

    expect(cardCode?.textContent).toContain('karkain check');
  });

  it('renders a standalone code block when an article supplies one', () => {
    const synthetic: BlogArticle = {
      slug: 'synthetic', category: 'Technology', title: 'Synthetic', summary: 's',
      maturity: 'Alpha', maturityVariant: 'prototype', intro: 'i',
      sections: [{ heading: 'Code', blocks: [
        { kind: 'code', language: 'python', code: 'print(1)', caption: 'snippet' }
      ] }],
      conclusion: 'c'
    };

    const { host } = renderResolved(synthetic);
    const block = host.querySelector('.code__block');

    expect(block?.textContent).toContain('print(1)');
    expect(host.querySelector('.code__caption')?.textContent).toContain('snippet');
  });

  it('renders an unsupported block kind without throwing or emitting it', () => {
    const synthetic = {
      slug: 'synthetic', category: 'Technology', title: 'Synthetic', summary: 's',
      maturity: 'Alpha', maturityVariant: 'prototype', intro: 'i',
      sections: [{ heading: 'Odd', blocks: [{ kind: 'not-a-real-kind', text: 'ignored' }] }],
      conclusion: 'c'
    } as unknown as BlogArticle;

    const { host } = renderResolved(synthetic);
    const text = host.textContent ?? '';

    expect(text).toContain('Synthetic');
    expect(text).not.toContain('ignored');
    expect(host.querySelector('.prose__section')).not.toBeNull();
  });

  it('renders exactly one maturity information card', () => {
    const { host } = renderArticle('karkain');
    const labels = [...host.querySelectorAll('qm-info-card')]
      .map(card => card.textContent ?? '');

    expect(labels.filter(text => text.includes('Maturity and limitations')).length).toBe(1);
  });

  it('offers a back link to the index', () => {
    const { host } = renderArticle('karkain');
    const hrefs = [...host.querySelectorAll('a')].map(a => a.getAttribute('href'));

    expect(hrefs).toContain('/blog');
  });

  it('renders every related link to a registered article', () => {
    const { component } = renderArticle('karkain');
    const slugs = BLOG_ARTICLES.map(a => a.slug);
    const related = component.related();

    expect(related.length).toBeGreaterThan(0);
    for (const item of related) {
      expect(slugs).toContain(item.slug);
      expect(item.slug).not.toBe('karkain');
    }
  });

  it('renders related links that point at registered article routes', () => {
    const { host, component } = renderArticle('karkain');
    const slugs = BLOG_ARTICLES.map(a => a.slug);
    const hrefs = [...host.querySelectorAll('.related__link')]
      .map(a => a.getAttribute('href') ?? '');

    expect(hrefs.length).toBe(component.related().length);
    for (const href of hrefs) {
      expect(slugs).toContain(href.replace('/blog/', ''));
    }
  });

  it('shows a safe fallback when no article was resolved', () => {
    const { host } = renderArticle('missing');
    const text = host.textContent ?? '';

    expect(text).toContain('Article not found');
    expect(host.querySelectorAll('.prose__section')).toHaveLength(0);
  });

  it('renders every registered article without throwing', () => {
    for (const article of BLOG_ARTICLES as BlogArticle[]) {
      const { host } = renderArticle(article.slug);
      expect(host.querySelector('h1')?.textContent).toContain(article.title);
      TestBed.resetTestingModule();
    }
  });
});
