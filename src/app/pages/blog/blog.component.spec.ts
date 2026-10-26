import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BLOG_ARTICLES } from './articles';

describe('BlogComponent index', () => {
  function render() {
    TestBed.configureTestingModule({
      imports: [BlogComponent],
      providers: [provideRouter([])]
    });
    const fixture = TestBed.createComponent(BlogComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders one card and maturity badge per registered article', () => {
    const host = render();
    const badges = host.querySelectorAll('qm-badge');

    expect(badges.length).toBe(BLOG_ARTICLES.length);
    for (const article of BLOG_ARTICLES) {
      expect(host.textContent).toContain(article.maturity);
      expect(host.textContent).toContain(article.title);
    }
  });

  it('renders a clickable card link for every registered article', () => {
    const host = render();
    const links = [...host.querySelectorAll('a.card__link')];

    expect(links.length).toBe(BLOG_ARTICLES.length);
    for (const article of BLOG_ARTICLES) {
      expect(links.some(link => link.getAttribute('href') === `/blog/${article.slug}`)).toBe(true);
    }
  });
});