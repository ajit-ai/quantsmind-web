import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QmContainerComponent } from '../../shared/components/qm-container/qm-container.component';
import { QmSectionComponent }   from '../../shared/components/qm-section/qm-section.component';
import { QmBadgeComponent }     from '../../shared/components/qm-badge/qm-badge.component';

import { ArticleCategory, BlogArticle, ARTICLE_CATEGORIES } from './blog-article.model';
import { BLOG_ARTICLES } from './articles';

type CategoryFilter = ArticleCategory | 'All';

/** One filterable block of the index: a heading plus its preview cards. */
interface ArticleGroup {
  category: ArticleCategory;
  blurb: string;
  articles: BlogArticle[];
}

@Component({
    selector: 'app-blog',
    imports: [RouterModule, QmContainerComponent, QmSectionComponent, QmBadgeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- HERO -->
    <section class="page-hero surface-subtle">
      <qm-container>
        <span class="eyebrow">BLOG</span>
        <h1>Articles</h1>
        <p class="lead">
          Long-form technical writing about the software QuantsMind builds: the
          technologies in the ecosystem, the research carried out in Labs, and the
          products that come out of them. Each article states what a project does
          today, how it does it, and where it is still incomplete.
        </p>
      </qm-container>
    </section>

    <!-- FILTERS -->
    <qm-section surface="white" size="sm" ariaLabel="Filter articles by category">
      <qm-container>
        <div class="filters" role="group" aria-label="Article categories">
          @for (option of filterOptions; track option.value) {
            <button type="button" class="filters__btn" [class.filters__btn--on]="selected() === option.value"
              [attr.aria-pressed]="selected() === option.value"
              (click)="select(option.value)">
              {{ option.label }}
              <span class="filters__count">{{ countFor(option.value) }}</span>
            </button>
          }
        </div>
      </qm-container>
    </qm-section>

    <!-- INDEX -->
    <qm-section surface="canvas" ariaLabel="Article index">
      <qm-container>
        @for (group of visibleGroups(); track group.category) {
          <section class="group" [attr.aria-label]="group.category + ' articles'">
            <div class="group__head">
              <h2 class="group__title">{{ group.category }}</h2>
              <p class="group__blurb">{{ group.blurb }}</p>
            </div>

            <div class="grid">
              @for (article of group.articles; track article.slug) {
                <article class="card">
                  <div class="card__top">
                    <span class="card__category">{{ article.category }}</span>
                    <qm-badge [variant]="article.maturityVariant">{{ article.maturity }}</qm-badge>
                  </div>
                  <h3 class="card__title">
                    <a [routerLink]="['/blog', article.slug]" class="card__link">{{ article.title }}</a>
                  </h3>
                  <p class="card__summary">{{ article.summary }}</p>
                  <span class="card__cta" aria-hidden="true">Read article</span>
                </article>
              }
            </div>
          </section>
        }
      </qm-container>
    </qm-section>
    `,
    styles: [`
    /* ── HERO ──────────────────────────────────────────── */
    .page-hero { padding: 64px 0 48px; border-bottom: 1px solid var(--color-border); }
    @media (min-width: 768px) { .page-hero { padding: 88px 0 64px; } }
    .page-hero h1 { max-width: 720px; margin: 0 0 20px; }
    .page-hero .lead { max-width: 700px; margin: 0; }
    .eyebrow {
      display: inline-block; font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: var(--color-accent); margin-bottom: 16px;
    }
    .lead { font-size: 18px; line-height: 1.7; color: var(--color-text-secondary); }

    /* ── FILTERS ───────────────────────────────────────── */
    .filters { display: flex; flex-wrap: wrap; gap: 10px; }
    .filters__btn {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: inherit; font-size: 14px; font-weight: 500;
      color: var(--color-text-secondary);
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 9999px;
      padding: 9px 18px;
      cursor: pointer;
      transition: color 200ms ease, border-color 200ms ease, background 200ms ease;
    }
    .filters__btn:hover { border-color: var(--card-border-hi); color: var(--color-accent); }
    .filters__btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
    .filters__btn--on {
      color: var(--color-accent-dark);
      background: var(--color-accent-subtle);
      border-color: var(--color-accent-muted);
      font-weight: 600;
    }
    .filters__count {
      font-size: 12px; font-weight: 600;
      color: var(--color-text-muted);
      background: var(--color-surface-subtle);
      border-radius: 9999px; padding: 1px 8px;
    }
    .filters__btn--on .filters__count { background: var(--color-surface); color: var(--color-accent-dark); }

    /* ── GROUPS ────────────────────────────────────────── */
    .group { margin-bottom: 56px; }
    .group:last-child { margin-bottom: 0; }
    .group__head { max-width: 720px; margin-bottom: 28px; }
    .group__title {
      font-size: clamp(22px, 2.6vw, 28px); font-weight: 700;
      letter-spacing: -0.01em; color: var(--color-text-primary);
      margin: 0 0 8px;
    }
    .group__blurb {
      margin: 0; font-size: 15px; line-height: 1.7;
      color: var(--color-text-secondary);
    }

    /* ── CARD GRID ─────────────────────────────────────── */
    .grid {
      display: grid; grid-template-columns: 1fr; gap: 24px;
      min-width: 0;
    }
    @media (min-width: 640px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }

    .card {
      position: relative;
      display: flex; flex-direction: column; gap: 12px;
      min-width: 0;
      padding: 28px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--card-shadow);
      transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
    }
    .card:hover {
      border-color: var(--card-border-hi);
      box-shadow: var(--card-shadow-hi);
      transform: translateY(-2px);
    }
    .card:focus-within {
      border-color: var(--card-border-hi);
      box-shadow: var(--card-shadow-hi);
    }
    .card__top {
      display: flex; align-items: center; justify-content: space-between;
      gap: 10px; flex-wrap: wrap;
      min-width: 0;
    }
    .card__top > * { min-width: 0; max-width: 100%; }
    /* The shared QmBadge defaults to white-space: nowrap. On the index cards
       the maturity labels are long phrases, so allow wrapping and breaking
       inside the badge without changing its text or article-detail styling. */
    ::ng-deep .card__top .qm-badge {
      white-space: normal !important;
      overflow-wrap: anywhere;
    }
    .card__category {
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: var(--color-accent);
    }
    .card__title { margin: 0; font-size: 19px; font-weight: 600; line-height: 1.35; }
    .card__link { color: inherit; text-decoration: none; }
    /* Stretched link keeps the whole card clickable while the maturity
       badge remains a separate, non-interactive element. */
    .card__link::after {
      content: ''; position: absolute; inset: 0;
      border-radius: var(--radius-lg);
    }
    .card__link:hover { color: var(--color-accent); }
    .card__link:focus-visible {
      outline: 2px solid var(--color-accent); outline-offset: 3px; border-radius: 4px;
    }
    .card__summary {
      margin: 0; flex: 1;
      font-size: 14.5px; line-height: 1.7;
      color: var(--color-text-secondary);
      text-wrap: pretty;
    }
    .card__cta {
      font-size: 13px; font-weight: 500; color: var(--color-accent);
      margin-top: 4px;
    }

    @media (prefers-reduced-motion: reduce) {
      .card, .filters__btn { transition: none; }
      .card:hover { transform: none; }
    }
    `]
})
export class BlogComponent {
  readonly filterOptions: { value: CategoryFilter; label: string }[] = [
    { value: 'All', label: 'All articles' },
    ...ARTICLE_CATEGORIES.map(category => ({ value: category as CategoryFilter, label: category }))
  ];

  private readonly articles: BlogArticle[] = BLOG_ARTICLES;

  /** Short framing line shown above each category's cards. */
  private readonly blurbs: Record<ArticleCategory, string> = {
    'Products':
      'Applications delivered from the ecosystem, written up with their real ' +
      'operational scope and their current availability.',
    'Technology':
      'Languages, databases, SDKs and security libraries, described through their ' +
      'architecture and their verified release state.',
    'Labs':
      'Research code and feasibility studies, where the limitations are as much a ' +
      'part of the subject as the implementation.'
  };

  selected = signal<CategoryFilter>('All');

  /** Groups shown for the current filter, preserving category order. */
  visibleGroups = computed<ArticleGroup[]>(() => {
    const selected = this.selected();
    return ARTICLE_CATEGORIES
      .map(category => ({
        category,
        blurb: this.blurbs[category],
        articles: this.articles.filter(article =>
          article.category === category && (selected === 'All' || selected === category))
      }))
      .filter(group => group.articles.length > 0);
  });

  /** Article count shown beside each filter chip. */
  countFor(filter: CategoryFilter): number {
    return filter === 'All'
      ? this.articles.length
      : this.articles.filter(article => article.category === filter).length;
  }

  select(filter: CategoryFilter): void {
    this.selected.set(filter);
  }
}
